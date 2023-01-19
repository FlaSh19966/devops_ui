<template>
  <div>
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <div class="dash-cont">
      <div class="container-fluid">
        <div class="card dash-card">
          <div class="card-header d-block d-sm-flex flex-wrap">
            <h4 class="mb-sm-0">{{tlt('admin_ticket_tickets_page_title')}}</h4>
            <div class="radio"
              style="margin-left: 1.5rem;margin-top: 2px;">
              <label>
                <input
                  type="radio"
                  v-model="filter_status"
                  value="AllTickets"
                  id="filter_status_success"
                />
                <span class="icn" id="filter_portal_user_radio"></span>
                {{tlt('admin_ticket_all_ticket_label')}}
              </label>
              <label>
                <input
                  type="radio"
                  v-model="filter_status"
                  value="CompanyTickets"
                  id="filter_status_failure"
                />
                <span class="icn"></span> {{tlt('admin_ticket_company_label')}}
              </label>
            </div>
            <div class="form-group" v-if="filter_status === 'AllTickets'"
              style="margin-left: auto;">
                <select
                  @change="get_ticket_details"
                  v-model="sort_status"
                  class="form-control"
                  style="height: 34px; padding: 5px;"
                  id="select_status"
                >
                  <option disabled value=''>{{tlt('status_label')}}</option>
                  <option value="All">{{tlt('admin_ticket_dropdown_all_label')}}</option>
                  <option value="Open">{{tlt('admin_ticket_dropdown_open_label')}}</option>
                  <option value="Closed">{{tlt('admin_ticket_dropdown_closed')}}</option>
                </select>
            </div>
          </div>
          <div class="card-body">
            <div class="table-box">
              <div class="table-responsive" v-show="Boolean(tickets_list.length > 0
              || tickets_list.length != undefined)">
                <table class="table" v-if="filter_status === 'AllTickets'">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">{{tlt('admin_ticket_company_name_label')}}</th>
                      <th scope="col">{{tlt('admin_ticket_issue_name_label')}}</th>
                      <th scope="col">{{tlt('admin_ticket_created_date_label')}}</th>
                      <th scope="col">{{tlt('admin_ticket_status_label')}}</th>
                      <th scope="col">{{tlt('admin_ticket_details_label')}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(ticket, index) in tickets_list" :key="index">
                      <td>{{index+1}}</td>
                      <td>{{ticket.CompanyName}}</td>
                      <td
                      :title="ticket.TicketIssue" 
                      style="cursor: pointer;">
                        {{trim_ticket_issue(ticket.TicketIssue)}}
                      </td>
                      <td class="text-center">{{format_date(ticket.CreatedDate)}}</td>
                      <td
                        class="text-center"
                        :style="ticket.CurrentStatus === 'Open' ? 
                        'color: #ff1a1a; font-weight: bold;':
                        'color: #064; font-weight: bold;'">
                        {{ticket.CurrentStatus}}
                      </td>
                      <td class="text-center" style="cursor: pointer;">
                        <a
                          class="view-model"
                          href="#"
                          data-toggle="modal"
                          data-target="#ticketModelDetails"
                          @click="open_comment_model(index, null)"
                        >{{tlt('view_label')}}
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="table" v-if="filter_status === 'CompanyTickets'">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">{{tlt('company_level_company_name_label')}}</th>
                      <th scope="col" v-show="!is_collapse">{{tlt('company_level_open_label')}}</th>
                      <th scope="col" v-show="!is_collapse">{{tlt('company_level_closed')}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in company_list" :key="index">
                      <td>{{index+1}}</td>
                      <td style="text-align: -webkit-center;">
                        <tr class="d-block text-center">
                          <a
                            class="btn btn-primaryy border-0"
                            data-toggle="collapse"
                            :href="'#collapseExample__' + index"
                            role="button"
                            style="color: #273679;"
                            aria-expanded="false"
                            :aria-controls="'collapseExample__' + index"
                            @click="check_collapse(index), get_company_tickets(item.CompanyName, item.CompanyId)"
                          >
                            {{item.CompanyName}}</a> 
                        </tr>
                        <tr :id="'collapseExample__' + index"
                         class="collapse"
                         data-parent="table">
                          <div>
                            <div class="table-box">
                              <select
                                v-show="is_collapse"
                                @change="get_company_tickets(item.CompanyName, item.CompanyId)"
                                v-model="sort_company_status"
                                class="form-control"
                                style="height: 34px; padding: 5px;margin: 3px 0px;
                                  width: 90px;margin-left: auto;margin-bottom: 0.5rem;"
                                id="select_status"
                              >
                                <option disabled value=''>Status</option>
                                <option value="All">{{tlt('company_level_dropdown_all_label')}}</option>
                                <option value="Open">{{tlt('company_level_dropdown_open_label')}}</option>
                                <option value="Closed">{{tlt('company_level_dropdown_closed')}}</option>
                              </select>
                              <div class="table-responsive" v-show="Boolean(company_tickets_list.length > 0
                                || company_tickets_list.length != undefined)">
                                <table class="table">
                                  <thead>
                                    <tr>
                                      <th scope="col">#</th>
                                      <th scope="col">{{tlt('company_level_t_number_label')}}</th>
                                      <th scope="col">{{tlt('company_level_t_issue_label')}}</th>
                                      <th scope="col">{{tlt('company_level_t_date_label')}}</th>
                                      <th scope="col">{{tlt('company_level_t_status_label')}}</th>
                                      <th scope="col">{{tlt('company_level_t_details_label')}}</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr v-for="(ticket, index1) in company_tickets_list" :key="index1">
                                      <td>{{index1+1}}</td>
                                      <td>{{ticket.TicketNumber}}</td>
                                      <td
                                      :title="ticket.TicketIssue" 
                                      style="cursor: pointer;">
                                        {{trim_ticket_issue(ticket.TicketIssue)}}
                                      </td>
                                      <td class="text-center">{{format_date(ticket.CreatedDate)}}</td>
                                      <td
                                        class="text-center"
                                        :style="ticket.CurrentStatus === 'Open' ? 
                                        'color: #ff1a1a; font-weight: bold;':
                                        'color: #064; font-weight: bold;'">
                                        {{ticket.CurrentStatus}}
                                      </td>
                                      <td class="text-center" style="cursor: pointer;">
                                        <a
                                          class="view-model"
                                          href="#"
                                          data-toggle="modal"
                                          data-target="#ticketModelDetails"
                                          @click="open_comment_model(index1, 'Company_tickets')"
                                        >{{tlt('view_label')}}
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div v-show="Boolean(company_tickets_list.length === 0) && !spinnerOn">
                                <p class="text-center">
                                  <strong>
                                    {{tlt('company_level_no_tickets_label')}}.</strong
                                  >
                                </p>
                              </div> 
                            </div>
                            <div v-if="company_tickets_list.length !== 0" class="pagin-table" style="margin-top: 2%; margin-bottom: 4%">
                              <nav aria-label="Page navigation example">
                                <ul class="pagination justify-content-center">
                                  <li class="page-item">
                                    <a
                                      class="page-link"
                                      href="#"
                                      @click="page_require(page_no - 1)"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="8.667"
                                        height="15.204"
                                        viewBox="0 0 8.667 15.204"
                                      >
                                        <g
                                          id="arrow-point-to-left"
                                          transform="translate(105.806 15.204) rotate(180)"
                                        >
                                          <path
                                            id="Path_1136"
                                            data-name="Path 1136"
                                            d="M105.493,8.354l-6.537,6.537a1.065,1.065,0,1,1-1.506-1.506L103.235,7.6,97.45,1.817A1.065,1.065,0,0,1,98.956.312l6.537,6.537a1.065,1.065,0,0,1,0,1.505Z"
                                            transform="translate(0 0)"
                                            fill="#9499ae"
                                          />
                                        </g>
                                      </svg>
                                    </a>
                                  </li>
                                  <li
                                    class="page-item"
                                    :class="{ active: page === page_no }"
                                    v-for="(page, index) in page_array"
                                    :key="index"
                                  >
                                    <a
                                      v-if="page == '...s' || page == '...l'"
                                      class="page-link"
                                      href="#"
                                      @click="page_require(page)"
                                      >...</a
                                    >
                                    <a
                                      v-if="page != '...s' && page != '...l'"
                                      class="page-link"
                                      href="#"
                                      @click="page_require(page)"
                                      >{{ page }}</a
                                    >
                                    <!-- <a class="page-link" href="#" @click="page_require(page)">{{page}}</a> -->
                                  </li>

                                  <li class="page-item">
                                    <a
                                      class="page-link"
                                      href="#"
                                      @click="page_require(page_no + 1)"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="8.667"
                                        height="15.204"
                                        viewBox="0 0 8.667 15.204"
                                      >
                                        <g
                                          id="arrow-point-to-right"
                                          transform="translate(-97.139 0)"
                                        >
                                          <path
                                            id="Path_1136"
                                            data-name="Path 1136"
                                            d="M105.493,8.354l-6.537,6.537a1.065,1.065,0,1,1-1.506-1.506L103.235,7.6,97.45,1.817A1.065,1.065,0,0,1,98.956.312l6.537,6.537a1.065,1.065,0,0,1,0,1.505Z"
                                            transform="translate(0 0)"
                                            fill="#9499ae"
                                          />
                                        </g>
                                      </svg>
                                    </a>
                                  </li>
                                </ul>
                              </nav>
                            </div>
                          </div> 
                        </tr>
                      </td>
                      <td v-show="!is_collapse">{{item.Open}}</td>
                      <td v-show="!is_collapse">{{item.Closed}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-show="Boolean(tickets_list.length === 0) && !spinnerOn">
                <p class="text-center">
                  <strong>
                    {{tlt('admin_ticket_no_tickets_label')}}.</strong
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="pagin-table" style="margin-top: 2%; margin-bottom: 4%">
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li class="page-item">
                <a
                  class="page-link"
                  href="#"
                  @click="page_require(page_no - 1)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8.667"
                    height="15.204"
                    viewBox="0 0 8.667 15.204"
                  >
                    <g
                      id="arrow-point-to-left"
                      transform="translate(105.806 15.204) rotate(180)"
                    >
                      <path
                        id="Path_1136"
                        data-name="Path 1136"
                        d="M105.493,8.354l-6.537,6.537a1.065,1.065,0,1,1-1.506-1.506L103.235,7.6,97.45,1.817A1.065,1.065,0,0,1,98.956.312l6.537,6.537a1.065,1.065,0,0,1,0,1.505Z"
                        transform="translate(0 0)"
                        fill="#9499ae"
                      />
                    </g>
                  </svg>
                </a>
              </li>
              <li
                class="page-item"
                :class="{ active: page === page_no }"
                v-for="(page, index) in page_array"
                :key="index"
              >
                <a
                  v-if="page == '...s' || page == '...l'"
                  class="page-link"
                  href="#"
                  @click="page_require(page)"
                  >...</a
                >
                <a
                  v-if="page != '...s' && page != '...l'"
                  class="page-link"
                  href="#"
                  @click="page_require(page)"
                  >{{ page }}</a
                >
                <!-- <a class="page-link" href="#" @click="page_require(page)">{{page}}</a> -->
              </li>

              <li class="page-item">
                <a
                  class="page-link"
                  href="#"
                  @click="page_require(page_no + 1)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8.667"
                    height="15.204"
                    viewBox="0 0 8.667 15.204"
                  >
                    <g
                      id="arrow-point-to-right"
                      transform="translate(-97.139 0)"
                    >
                      <path
                        id="Path_1136"
                        data-name="Path 1136"
                        d="M105.493,8.354l-6.537,6.537a1.065,1.065,0,1,1-1.506-1.506L103.235,7.6,97.45,1.817A1.065,1.065,0,0,1,98.956.312l6.537,6.537a1.065,1.065,0,0,1,0,1.505Z"
                        transform="translate(0 0)"
                        fill="#9499ae"
                      />
                    </g>
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div
          class="modal fade dash-modal"
          id="ticketModelDetails"
          tabindex="-1"
          role="dialog"
          data-backdrop="static"
        >
      <div
        class="modal-dialog modal-lg"
        role="document"
      >
        <div class="modal-content" style="width: 135%; margin-left: -17%">
          <div class="modal-header modal-head d-flex align-items-center"
          style="margin: 0rem;">
              <div class="head-icn">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="info-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                 class="svg-inline--fa fa-info-circle fa-w-16 fa-3x">
                 <path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"
                class="" style="color: #273679;"></path></svg>
              </div>
            <h3 class="modal-title">{{tlt('admin_ticket_model_details_label')}}</h3>
            <button
              type="button"
              class="close"
              @click="empty_variable"
              data-dismiss="modal"
              style="padding-top: 1px;"
              aria-label="Close"
            >
              <img src="/img/close-icn.png" alt />
            </button>
          </div>
          <div class="modal-body py-2 px-3" style="width: 808px">
           <div class="form-group">
            <div class="row" style="margin-left: 0px; margin-right: 0px;">
              <div class="col-md-4 pl-2" style="font-weight: bold;">
                {{tlt('admin_ticket_model_number_label')}}  :
              </div>
              <div class="col-md-8">
                {{current_selected_ticket_number}}
              </div>
              <div class="col-md-4 pl-2" style="font-weight: bold;padding-top:5px;padding-bottom:5px;">
                {{tlt('admin_ticket_model_issue_label')}}  :
              </div>
              <div class="col-md-8" :title="ticket_issue_name" style="padding-top:5px;padding-bottom:5px;cursor: pointer;">
                {{ticket_issue_name}}
              </div>
              <div class="col-md-4 pl-2" style="font-weight: bold;">
                {{tlt('admin_ticket_model_desc_label')}}  :
              </div>
              <div class="col-md-8"
              :title="ticket_description" style="cursor: pointer;">
                {{trim_ticket_description(ticket_description)}}
              </div>
              <div class="col-md-4 pl-2" style="font-weight: bold;padding-top:5px;">
                {{tlt('admin_ticket_model_status_label')}} :
              </div>
              <div class="col-md-8 d-flex mb-2">
              <div
                v-if="!isEditTicketStatus"
                :style="ticket_status === 'Open' ? 
                'color: #ff1a1a; border-radius: 4px;padding-top:5px;': 
                'color: #064; border-radius: 4px;padding-top:5px;'" 
              >
                <b>{{ticket_status}}</b>
              </div>
              <div v-if="isEditTicketStatus">
                <select
                  v-model="current_ticket_status"
                  class="form-control"
                  style="height: 34px; padding: 5px;"
                  id="select_status"
                >
                  <option disabled value=''>Status</option>
                  <option value="Open">{{tlt('open_status')}}</option>
                  <option value="Closed">{{tlt('close_status')}}</option>
                </select>
              </div>
              <div style="margin-top: 3px;margin-left: 2rem;">
                <span
                  @click="edit_ticket_status"
                  v-html="pencil_svg"
                  title="Edit Status"
                  class="ml-auto mr-2 mt-2"
                  style="cursor: pointer;"
                  v-if="is_super_admin"
                ></span>
              </div>
              <button
                v-if="isEditTicketStatus"
                type="submit"
                class="darkblue-btn"
                id="save_btn res_n_int_save"
                style="margin-left: 1rem;height: 32px;padding-top: 5px;"
                @click="save_ticket_status()"
              >
                {{tlt('save_btn')}}
              </button>
              </div>
              <div class="col-md-4 pl-2" style="font-weight: bold;padding-top:5px;">
                Assignee :
              </div>
              <div class="col-md-8 d-flex">
              <div
                v-if="!is_Edit_Status"
              >
                <b>{{assigned_developer}}</b>
              </div>
              <div v-if="is_Edit_Status || assigned_developer == undefined">
                <select
                  v-model="assigned_developer"
                  class="form-control"
                  style="height: 34px; padding: 5px;"
                  id="select_status"
                  placeholder="Assign a Developer"
                >
                  <option disabled selected value=''>Assign a Developer</option>
                  <option v-for="(dev, index) in developers_list"
                    :value="dev"
                    :key="index">{{dev}}</option>
                </select>
              </div>
              <div style="margin-left: 2rem;">
                <span
                  @click="edit_assign_status"
                  v-html="pencil_svg"
                  title="Edit Status"
                  class="ml-auto mr-2 mt-2"
                  style="cursor: pointer;"
                  v-if="is_super_admin"
                ></span>
              </div>
              <button
                v-if="is_Edit_Status || assigned_developer  && is_super_admin"
                type="submit"
                class="darkblue-btn"
                id="save_btn res_n_int_save"
                data-dismiss="modal"

                style="margin-left: 1rem;height: 32px;padding-top: 5px;"
                @click="save_ticket_status()"
              >
                {{tlt('save_btn')}}
              </button>
              </div>
            </div>
            </div>
            <!-- <p>Some text in the modal.</p> -->
            <!-- @change="fileinput_csv" -->
            <div v-if="current_ticket_status === 'Closed' && isEditTicketStatus">
              <div class="form-group" style="margin-bottom: 4px;">
                <h6 style="margin-left: 0.5rem;font-size: 1.2rem;">{{tlt('add_solution_label')}}</h6>
              </div>
              <div
              class="text-right card-act"
              style="display: flex; margin-top: 0px; margin-bottom: 8px;padding: 15px 0 0;"
              >
                <input
                  type="text"
                  class="form-control input-comment-section"
                  v-model.trim="send_solution_text"
                  placeholder="Add your solution...."
                />
                  <button 
                    type="button"
                    class="darkblue-btn"
                    id="btn_send_id"
                    :disabled="is_send_btn_enable == false"
                    @click="send_solution"
                    style="margin-left: 10px; height: 38px;"
                    :style="
                      is_send_btn_enable
                        ? ''
                        : 'background: rgb(187, 187, 187) !important;border: 1px solid rgb(229, 229, 229) !important;'
                    "
                  >{{tlt('admin_ticket_solution_label')}}</button>
               </div>
            </div>
            <!-- <div class="row" style="margin-left: 0rem;" v-if="!isEditTicketStatus && ticket_solution !== ''">
              <div class="col-md-4" style="margin-bottom: 4px;font-weight: bold;padding-top:5px;">
               Solution :
              </div>
              <div class="col-md-8" style="padding-top:5px;padding-bottom:5px;padding-left: 12px;">
                {{ticket_solution}}
              </div>
            </div> -->
            <div class="form-group d-flex" style="margin-bottom: 4px;margin-top: 1rem;">
              <h6 v-if="!is_internal_comment" style="margin-left: 0.5rem;font-size: 1.2rem;">{{tlt('admin_ticket_model_comments_label')}}</h6>
              <h6 v-else style="margin-left: 0.5rem;font-size: 1.2rem;">Internal Comments</h6>
              <p v-if="!is_internal_comment" class="ml-auto" style="cursor: pointer" @click="switch_to_internal_comments()">switch to internal comments</p>
              <p v-else class="ml-auto" style="cursor: pointer" @click="switch_to_internal_comments()">switch to customer comments</p>
            </div>
            <div class="form-group" style="margin-bottom: 4px">
              <div class="form-group mx-0 my-0 px-0 py-0">
                <div
                  v-if="(comments_list.length != 0) && !is_internal_comment"
                  class="chat-body ScrollStyle"
                  style="height: 65vh; overflow-y: auto"
                >
                  <div
                    class="chat-inner"
                    style="position: relative;"
                    v-for="(comment, index) in comments_list"
                    :key="index"
                  >
                    <div
                      v-if="comment.IsSuperAdmin === true"
                    >
                      <div class="d-flex">
                        <i
                          class="fas fa-user-circle mr-3 fa-2x"
                          style="color: darkgrey !important;"
                        ></i>
                        <label
                          style="text-align: justify !important; margin-top: 4px !important;"
                        >
                          <strong><b>{{tlt('admin_ticket_cense_team_label')}}</b></strong>
                        </label>
                      </div>
                      <div class="custom-button-box ml-5">
                        <p style="color: #404040; margin-bottom: 0px;">
                          {{ comment.Comment }}
                        </p>
                        <span
                          class="img-container"
                          v-if="comment.image_url != null"
                        >
                          <a
                            href="#"
                            data-toggle="modal"
                            data-target="#viewImageModal"
                            @click="open_image_model(index)"
                          >
                            {{tlt('admin_ticket_attached_img')}}</a
                          >
                        </span>
                        <!-- <span
                          style="display: block; font-size: 12px; color:#808080;"
                          ><strong>admin </strong></span
                        > -->
                        <label class="form-text text-muted comment-box_date"
                        style="font-size: 12px; margin-top: 6px;">{{ date_formating(comment.Date) }}
                        </label>
                      </div>
                      <!-- <img v-if="comment.image_url != null" :src="comment.image_url" class="center-block p-0 m-0" style="height:140px; width:140px;"/> -->
                    </div>
                    <div v-else>
                      <div class="d-flex">
                        <i
                          class="fas fa-user-circle mr-3 fa-2x"
                          style="color: darkgrey !important;"
                        ></i>
                        <label
                          style="text-align: justify !important; margin-top: 4px !important;"
                        >
                          <strong><b>{{comment.Email}}</b></strong>
                        </label>
                      </div>
                      <div class="custom-button-box ml-5">
                        <p style="color: #404040; margin-bottom: 0px;">
                          {{ comment.Comment }}
                        </p>
                        <span
                          class="img-container"
                          v-if="comment.image_url != null"
                        >
                          <a
                            href="#"
                            data-toggle="modal"
                            data-target="#viewImageModal"
                            style="font-size: 15px;"
                            @click="open_image_model(index)"
                          >
                            {{tlt('admin_ticket_attached_img')}}</a
                          >
                        </span>
                        <!-- <span
                          style="display: block; font-size: 12px; color:#808080;"
                          ><strong> {{ comment.Email }} </strong></span
                        > -->
                        <label class="form-text text-muted comment-box_date"
                                style="font-size: 12px; margin-top: 6px;">
                          {{ date_formating(comment.Date) }}
                        </label>
                      </div>
                      <!-- <img v-if="comment.image_url != null" :src="comment.image_url" class="center-block p-0 m-0" style="height:140px; width:140px;"/> -->
                    </div>
                    <!-- <p>{{ Comment.IsSuperAdmin }}</p> -->
                  </div>
                </div>
                <div v-else-if="internal_comments_list != undefined && is_internal_comment"
                  class="chat-body ScrollStyle"
                  style="height: 65vh; overflow-y: auto"
                >
                  <div
                    class="chat-inner"
                    style="position: relative;"
                    v-for="(comment, index) in internal_comments_list"
                    :key="index"
                  >
                    <div
                      v-if="comment.IsSuperAdmin === true"
                    >
                      <div class="d-flex">
                        <i
                          class="fas fa-user-circle mr-3 fa-2x"
                          style="color: darkgrey !important;"
                        ></i>
                        <label
                          style="text-align: justify !important; margin-top: 4px !important;"
                        >
                          <strong><b>{{tlt('admin_ticket_cense_team_label')}}</b></strong>
                        </label>
                      </div>
                      <div class="custom-button-box ml-5">
                        <p style="color: #404040; margin-bottom: 0px;">
                          {{ comment.Comment }}
                        </p>
                        <span
                          class="img-container"
                          v-if="comment.image_url != null"
                        >
                          <a
                            href="#"
                            data-toggle="modal"
                            data-target="#viewImageModal"
                            @click="open_image_model(index)"
                          >
                            {{tlt('admin_ticket_attached_img')}}</a
                          >
                        </span>
                        <!-- <span
                          style="display: block; font-size: 12px; color:#808080;"
                          ><strong>admin </strong></span
                        > -->
                        <label class="form-text text-muted comment-box_date"
                        style="font-size: 12px; margin-top: 6px;">{{ date_formating(comment.Date) }}
                        </label>
                      </div>
                      <!-- <img v-if="comment.image_url != null" :src="comment.image_url" class="center-block p-0 m-0" style="height:140px; width:140px;"/> -->
                    </div>
                    <div v-else>
                      <div class="d-flex">
                        <i
                          class="fas fa-user-circle mr-3 fa-2x"
                          style="color: darkgrey !important;"
                        ></i>
                        <label
                          style="text-align: justify !important; margin-top: 4px !important;"
                        >
                          <strong><b>{{comment.Email}}</b></strong>
                        </label>
                      </div>
                      <div class="custom-button-box ml-5">
                        <p style="color: #404040; margin-bottom: 0px;">
                          {{ comment.Comment }}
                        </p>
                        <span
                          class="img-container"
                          v-if="comment.image_url != null"
                        >
                          <a
                            href="#"
                            data-toggle="modal"
                            data-target="#viewImageModal"
                            style="font-size: 15px;"
                            @click="open_image_model(index)"
                          >
                            {{tlt('admin_ticket_attached_img')}}</a
                          >
                        </span>
                        <!-- <span
                          style="display: block; font-size: 12px; color:#808080;"
                          ><strong> {{ comment.Email }} </strong></span
                        > -->
                        <label class="form-text text-muted comment-box_date"
                                style="font-size: 12px; margin-top: 6px;">
                          {{ date_formating(comment.Date) }}
                        </label>
                      </div>
                      <!-- <img v-if="comment.image_url != null" :src="comment.image_url" class="center-block p-0 m-0" style="height:140px; width:140px;"/> -->
                    </div>
                    <!-- <p>{{ Comment.IsSuperAdmin }}</p> -->
                  </div>
                </div>
                <div style="padding-left: 10px; margin: 8px 0px;"
                v-else>
                  <p>{{tlt('admin_ticket_model_no_comments_label')}} ...</p>
                </div>
              </div>
            </div>
            <div
              class="text-right card-act"
              style="display: flex; margin-top: 0px; margin-bottom: 8px; border-top: solid 1px #EAEAEA; padding: 15px 0 0;"
            >
              <input
                type="text"
                v-if="is_internal_comment"
                class="form-control input-comment-section"
                v-model="new_internal_comment"
                placeholder="Type your comment here ..."
              />
              <input
                type="text"
                v-else
                :disabled="!is_super_admin"
                class="form-control input-comment-section"
                v-model="new_ticket_comment"
                placeholder="Type your comment here ..."
              />
              <label for="files" class="btn" style="padding: 0px;" :style="!is_super_admin ? 'display: none' : ''">
                <!-- src="/img/icons8_attachfile.png" -->
                <!-- class="img_icon_comment" -->
                <i
                  id="image_file"
                  class="fa fa-paperclip img_icon_comment" aria-hidden="true"
                  :title="new_image_name === '' ? 'Upload New Image' : new_image_name"
                  style="cursor: pointer;"                  
                  :style="new_image_name ?
                   'color: #4000ff !important; font-size: 20px;'
                    : ''
                "
                  alt="attachment"
                  width="18px;"
                  height="18px;">
              </i></label>
              <!-- :disabled="is_send_btn_enable == false" -->
              <!-- :style="new_image_name ? 'border: 0.5px solid blue; color: green;':''" -->
              <input
                type="file"
                id="files"
                accept="image/png, image/jpg, image/jpeg"
                @change="Upload_image_file"
                
                style="display: none;"
              />
              <!-- <button
                      type="button"
                      class="btn btn-link"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button> -->
              <button 
                type="button"
                class="darkblue-btn"
                id="btn_send_id"
                :disabled="is_send_btn_enable == false"
                @click="is_internal_comment == true ? send_internal_ticket_comments() : send_ticket_comments()"
                style="margin-left: 10px; height: 38px;"
                :style="
                  is_send_btn_enable
                    ? ''
                    : 'background: rgb(187, 187, 187) !important;border: 1px solid rgb(229, 229, 229) !important;'
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style="fill: #fff; margin-top: -2px;"
                  width="40"
                  height="25"
                  viewBox="0 0 24 24"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
              </button>
            </div>
            <div
                class="image_name"
                :disabled="is_send_btn_enable == false"
                :style="
                  is_send_btn_enable
                    ? ''
                    : 'background: rgb(187, 187, 187) !important;border: 1px solid rgb(229, 229, 229) !important;'
                "
                v-if="new_image_name != ''"
              >
                <!-- style="bottom: 0px; margin-left: 16px;" -->
                <!-- {{ new_image_name }} -->
            </div>
            <div class="user_img" style="margin-top: 4px;"></div>
          </div>
        </div>
      </div>
    </div>
    <div
      id="viewImageModal"
      class="modal fade dash-modal"
      role="dialog"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content" 
        style="margin-left: auto; margin-right: auto;">
          <div class="modal-header" style="justify-content: center; padding: 0.5rem;">
            <h5 class="modal-title">
              {{tlt('img_label')}}
            </h5>
            <button
              type="button"
              class="close close-img-btn"
              style="top: 11px; right: 12px;"
              data-dismiss="modal"
              aria-label="Close"
            >
              <img src="/img/close-icn.png" alt />
            </button>
          </div>
          <div
            class="modal-body"
          >
            <img
              v-if="images_in_current_comment != ''"
              :src="images_in_current_comment"
              class="center-block p-0 m-0"
              style="height:auto; width:100%;"
            />
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import api_calls from "@/portal/api_calls";
import Swal from "sweetalert2";
import moment from "moment";
import { close_modal} from "@/portal/mixins";

export default {
      mixins: [
    close_modal
  ],
  data() {
    return {
      pencil_svg:
        ' <svg xmlns="http://www.w3.org/2000/svg" width="15.546" height="15.461" viewBox="0 0 15.546 15.461"><defs><style>.a{fill:#9e9e9e;}</style></defs><g transform="translate(-747.888 -356.769)"><path class="a" d="M759.416,356.769a2.358,2.358,0,0,1,1.777.662c.534.513,1.072,1.025,1.567,1.575a2.3,2.3,0,0,1-.071,3.325c-2.736,2.76-5.494,5.5-8.238,8.251a1.381,1.381,0,0,1-.758.288c-.719.174-1.429.379-2.144.572-.932.251-1.862.5-2.795.751-.6.158-.989-.213-.832-.807q.689-2.595,1.406-5.182a1.164,1.164,0,0,1,.289-.487q4.091-4.107,8.2-8.2A2.265,2.265,0,0,1,759.416,356.769Zm-1.989,2.956-6.54,6.538,3.025,3.024,6.538-6.537Zm4.023,2.165c.118-.135.225-.269.343-.392a1.134,1.134,0,0,0,0-1.734c-.46-.466-.926-.925-1.388-1.39a1.166,1.166,0,0,0-.861-.368c-.578,0-.881.4-1.214.76Zm-12.084,8.863,3.2-.863-2.337-2.331Z" transform="translate(0)"/><path class="a" d="M813.942,422.6l-.789-.8,3.821-3.819.784.8Z" transform="translate(-59.648 -55.947)"/></g></svg>',
      filter_status: 'AllTickets',
      spinnerOn: false,
      page_no: 1,
      per_page: 20,
      total_pages: null,
      number_of_rows: null,
      tickets_list: [],
      sort_status: 'All',
      company_list: [],
      page_array: [],
      User_comments: [],
      comments_list: [],
      comment_item_list: [],
      ticket_number: "",
      current_selected_ticket_number: "",
      ticket_description: "",
      new_ticket_comment: "",
      current_image_url: "",
      // current_image_name: "",
      current_image_name_in_comment:"",
      images_in_current_comment: "",
      new_image_name: "",
      new_image_file: "",
      image_file: "",
      send_solution_text: "",
      ticket_issue_name: "",
      ticket_status: "",
      ticket_solution: "",
      is_status: null,
      current_status: "",
      is_status_closed: false,
      search_key: "",
      isEditTicketStatus: false,
      is_Edit_Status: false,
      current_ticket_status: "",
      company_tickets_list: [],
      sort_company_status: 'All',
      is_collapse: false,
      send_by_company: false,
      req_comp_id: "",
      req_comp_name: "",
      ticket_company_id:"",
      ticket_company_name:"",
      isVisibleSearchClear: false,
      is_super_admin: false,
      is_developer: false,
      developers_list: [],
      assigned_developer: "",
      new_internal_comment: "",
      is_internal_comment: false,
      internal_comments_list: []
    };
  },
  computed: {
    is_send_btn_enable() {
      if (Boolean(this.send_solution_text || this.new_image_name || this.new_ticket_comment || this.new_internal_comment)) {
        return true;
      } else {
        return false;
      }
    },
    is_reopen_btn_enable() {
      if (Boolean(this.new_ticket_comment || this.new_image_name)) {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {
    if (
      !this.$session.has("CompanyId") &&
      this.$session.get("UserInformation").role == "SuperAdmin"
    ) {
      toastr.warning(this.tlt('select_company_name_msg2'));
    } else if (this.user_role == "SuperAdmin") {
      if (this.$session.has("CompanyId")) {
        this.companyid = this.$session.get("CompanyId");
        this.companyname = this.$session.get("CompanyName");
      } else {
        this.companyid = this.$session.get("UserInformation").company_id;
        this.companyname = this.$session.get("UserInformation").company_name;
      }
    } else {
      this.companyid = this.$session.get("UserInformation").company_id;
      this.companyname = this.$session.get("UserInformation").company_name;
    }
    this.get_ticket_details();
  },
  watch: {
    filter_status(){
      this.page_no = 1;
      this.per_page = 20;
      this.is_collapse = false;
      if(this.filter_status ===  'AllTickets'){
        this.get_ticket_details();  
      }else{
        this.get_company_list();
      }
    },
  },
  methods : {
    switch_to_internal_comments() {
      if (!this.is_internal_comment) {
        this.is_internal_comment = true;
      } else {
        this.is_internal_comment = false;
      }
      return;
    },
    check_collapse(index) {
      if ($('#collapseExample__' + index).is('.collapse.show') === false) {
        this.is_collapse = true;
      } else {
        this.is_collapse = false;
        this.sort_company_status = 'All';
      }
    },
    trim_ticket_issue(val1) {
      if (val1.length > 50) {
        let str1 = val1.substring(0, 50) + "....";
        return str1;
      }
      return val1;
    },
    trim_ticket_description(des_name){
      if(des_name.length > 60){
        let ticket_des_name = des_name.substring(0,50) + "...";
        return ticket_des_name;
      }
      return des_name;
    },
    date_formating(sub_date) {
      return moment(sub_date).format("D MMM YYYY HH:mm a");
    },
    format_date(date) {
      if(date == null) {
        return "N/A"
      }
      return moment(date).format("Do MMM YYYY");
    },
    edit_ticket_status() {
      if (!this.isEditTicketStatus) {
        this.isEditTicketStatus = true;
      } else {
        this.isEditTicketStatus = false;
        // this.load_intent();
      }
      return;
    },
    edit_assign_status() {
      if (!this.is_Edit_Status) {
        this.is_Edit_Status = true;
      } else {
        this.is_Edit_Status = false;
      }
      return;
    },
    save_ticket_status() {

      this.spinnerOn = true;
      if (this.current_ticket_status === "") {
        this.current_ticket_status = this.current_status;

      }
        axios
          .post(
            api_calls.support_ticket(),
            {
              company_name: this.companyname,
              company_id: this.companyid,
              is_edit: true,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              response: {
                ticket_number: this.current_selected_ticket_number,
                update_status: this.current_ticket_status,
                solution: null,
                ticket_company_id: this.ticket_company_id == "" ? this.req_comp_id : this.ticket_company_id,
                ticket_company_name:this.ticket_company_name == "" ? this.req_comp_name : this.ticket_company_name,
                assign_to:this.assigned_developer 
              }
              // pageno: this.page_no,
              // perpage: this.per_page,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`
              }
            }
          )
          .then(response => {
            this.spinnerOn = false;
            if (this.api_status_code.TICKET_UPDATED.MSG_CODE == response.data.message.MSG_CODE) {
              Swal({
                type: "success",
                text: this.tlt('admin_ticket_status_updated'),
                timer: 2500
              });
              this.empty_variable();
              $("#ticketModelDetails").modal("hide");
              if (this.send_by_company === true) {
                this.get_company_tickets(this.req_comp_name, this.req_comp_id);
              } else {
                this.get_ticket_details();
              }
            } else if(this.api_status_code.UNSUCCESSFUL_DB_OPERATION.MSG_CODE == response.data.message.MSG_CODE){
                Swal({
                text: response.data.message.MSG,
                type: "error",
                timer: 3000,
              });
              $("#ticketModelDetails").modal("hide");
              if (this.send_by_company === true) {
                this.get_company_tickets(this.req_comp_name, this.req_comp_id);
              } else {
                this.get_ticket_details();
              }
              this.empty_variable();
            } else if(this.api_status_code.UNSUCCESSFUL_DB_QUERY.MSG_CODE == response.data.message.MSG_CODE){
              Swal({
                type: "error",
                text: response.data.message.MSG,
                timer: 2500,
              });
              if (this.send_by_company === true) {
                this.get_company_tickets(this.req_comp_name, this.req_comp_id);
              } else {
                this.get_ticket_details();
              }
              this.empty_variable();
              $("#ticketModelDetails").modal("hide");
                //$("#ticketModelDetails").modal("hide");
                //this.empty_variable();
            } else {
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                type: "error"
              })
               this.empty_variable();
              $("#ticketModelDetails").modal("hide");
              if (this.send_by_company === true) {
                this.get_company_tickets(this.req_comp_name, this.req_comp_id);
              } else {
                this.get_ticket_details();
              }
            }
          })
          .catch(e => {
            this.spinnerOn = false;
            if (
              e.response.status === 410 ||
              e.response.status === 440 ||
              e.response.status === 409
            ) {
              this.$root.$emit("Session_Expired", e.response.data);
            } else {
              Swal({
                type: "error",
                text: this.tlt('admin_ticket_internal_server2'),
                timer: 2500
              });
            }
          });
          
              this.close_modal('res_n_int_save')
          
    },
    open_comment_model(index, key) {
      if (key === null) {
        this.comments_list = [];
        this.internal_comments_list = [];
        this.comments_list = Boolean(this.tickets_list[index].Comments)
          ? this.tickets_list[index].Comments
          : [];
        this.current_selected_ticket_number = this.tickets_list[
          index
        ].TicketNumber;
        this.ticket_company_id = this.tickets_list[index].CompanyId;
        this.ticket_company_name = this.tickets_list[index].CompanyName;
        this.ticket_description = this.tickets_list[index].Description;
        this.ticket_issue_name = this.tickets_list[index].TicketIssue;
        this.ticket_status = this.tickets_list[index].CurrentStatus;
        this.internal_comments_list = this.tickets_list[index].InternalComments;
        this.assigned_developer = this.tickets_list[index].AssignedTo;
        if (this.tickets_list[index].Solution !== undefined) {
          this.ticket_solution = this.tickets_list[index].Solution;
        } else {
          this.ticket_solution = "";
        }
        if(this.ticket_status === "Closed")
        {
          this.is_status_closed = true;
        }else{
          this.is_status_closed = false;
        }
        this.current_status = this.tickets_list[index].CurrentStatus;
        this.send_by_company = false;
      }  
      else if (key === 'Company_tickets') {
        this.comments_list = [];
        this.internal_comments_list = [];
        this.comments_list = Boolean(this.company_tickets_list[index].Comments)
          ? this.company_tickets_list[index].Comments
          : [];
        this.current_selected_ticket_number = this.company_tickets_list[
          index
        ].TicketNumber;
        this.ticket_description = this.company_tickets_list[index].Description;
        this.ticket_issue_name = this.company_tickets_list[index].TicketIssue;
        this.ticket_status = this.company_tickets_list[index].CurrentStatus;
        this.assigned_developer = this.company_tickets_list[index].AssignedTo;
        this.internal_comments_list = this.company_tickets_list[index].InternalComments;
        this.req_comp_id = this.company_tickets_list[index].CompanyId;
        this.req_comp_name = this.company_tickets_list[index].CompanyName;
        if (this.company_tickets_list[index].Solution !== undefined) {
          this.ticket_solution = this.company_tickets_list[index].Solution;
        } else {
          this.ticket_solution = "";
        }
        if(this.ticket_status === "Closed")
        {
          this.is_status_closed = true;
        }else{
          this.is_status_closed = false;
        }
        this.current_status = this.company_tickets_list[index].CurrentStatus;
        this.send_by_company = true;
      }
    },
    get_ticket_details() {
      this.spinnerOn = true;
      axios
      .post(api_calls.support_ticket(), {
        company_name: this.companyname,
        company_id: this.companyid,
        email: this.$session.get("UserInformation").email,
        filter_by: this.sort_status,
        is_get: true,
        per_page: this.per_page,
        page_no: this.page_no
      },
      {
        headers: {
          Authorization: `Bearer ${this.$session.get("at")}`,
        },
      })
      .then(response => {
        this.spinnerOn = false;
        if (this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE == response.data.message.MSG_CODE) {
          toastr.error(
            this.tlt('admin_ticket_internal_server3')
          );
        } else if (this.api_status_code.DATA_AVAILABLE.MSG_CODE == response.data.message.MSG_CODE){
          this.number_of_rows = response.data.pagination.total_data;
          this.total_pages = response.data.pagination.total_page;
          this.tickets_list = response.data.data.Ticket;
          this.setpagination(this.page_no);
          this.is_developer = response.data.data.IsDeveloper === undefined ? false : true;
          this.developers_list = response.data.data.DevelopersList;
          this.is_super_admin = response.data.data.IsSuperAdmin === undefined ? false : true;
        } else if (this.api_status_code.NO_EXISTING_TICKET.MSG_CODE == response.data.message.MSG_CODE) {
          this.tickets_list = [];
        }  else {
          Swal({
            title: response.data.message.MSG_CODE,
            text: response.data.message.MSG,
            showCancelButton: false,
            showConfirmButton: false,
            type: "error"
          })
        }
      })
      .catch((e) => {
          // console.log(e);
          this.spinnerOn = false;
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          } else {
            Swal({
              type: "error",
              text: this.tlt('admin_ticket_internal_server4'),
              timer: 2500,
            });
          }
        });
    },
    send_solution(){
      if(this.send_solution_text != "" && this.current_ticket_status === 'Closed'){
        this.spinnerOn = true;
        axios
          .post(
            api_calls.support_ticket(),
            {
              company_name: this.companyname,
              company_id: this.companyid,
              is_edit: true,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              response: {
                ticket_number: this.current_selected_ticket_number,
                solution: this.send_solution_text,
                update_status: this.current_ticket_status,
                ticket_company_id: this.ticket_company_id == "" ? this.req_comp_id : this.ticket_company_id,
                ticket_company_name:this.ticket_company_name == "" ? this.req_comp_id : this.ticket_company_name,
              }
              // pageno: this.page_no,
              // perpage: this.per_page,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`
              }
            }
          )
          .then(response => {
            this.spinnerOn = false;
            if (this.api_status_code.TICKET_UPDATED.MSG_CODE == response.data.message.MSG_CODE) {
              Swal({
                type: "success",
                text: this.tlt('admin_ticket_status_updated1'),
                timer: 2500
              }).then(result => {
                if (this.send_by_company === true) {
                this.get_company_tickets(this.req_comp_name, this.req_comp_id);
              } else {
                this.get_ticket_details();
              }
                $("#ticketModelDetails").modal("hide");
                this.empty_variable();
              });
            } else if (this.api_status_code.IMG_DUPLICATE.MSG_CODE == response.data.message.MSG_CODE) {
              Swal({
                text:
                  this.tlt('admin_ticket_img_already_found'),
                type: "error",
                timer: 3000,
              });
            } else if(this.api_status_code.UNSUCCESSFUL_DB_OPERATION.MSG_CODE == response.data.message.MSG_CODE){
                Swal({
                text:
                  this.tlt('admin_ticket_error_occurred3'),
                type: "error",
                timer: 3000,
              });
                this.empty_variable();
                $("#ticketModelDetails").modal("hide");
            } else if(this.api_status_code.UNSUCCESSFUL_DB_QUERY.MSG_CODE == response.data.message.MSG_CODE){
              Swal({
                type: "error",
                text: response.data.message.MSG,
                timer: 2500,
              });
                //$("#ticketModelDetails").modal("hide");
                //this.empty_variable();
            } else {
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                type: "error"
              })
            }
          })
          .catch(e => {
            this.spinnerOn = false;
            if (
              e.response.status === 410 ||
              e.response.status === 440 ||
              e.response.status === 409
            ) {
              this.$root.$emit("Session_Expired", e.response.data);
            } else {
              $("#ticketModelDetails").modal("hide");
              Swal({
                type: "error",
                text: this.tlt('admin_ticket_internal_server6'),
                timer: 2500
              });
            }
          });
          this.close_modal('btn_send_id')
      }else{
      }

    },
    open_image_model(index) {
      if (!this.is_internal_comment && this.comments_list[index].image_url != null) {
        this.images_in_current_comment = this.comments_list[index].image_url;
        this.current_image_name_in_comment = this.comments_list[index].image_name;
      } else if (this.is_internal_comment && this.internal_comments_list[index].image_url != null) {
        this.images_in_current_comment = this.internal_comments_list[index].image_url;
        this.current_image_name_in_comment = this.internal_comments_list[index].image_name;
      }
    },
    Upload_image_file(event) {
      let files = event.target.files[0];
      if (files.size > 2097152) {
        Swal({
          text: this.tlt('admin_ticket_upload_img'),
          toast: true,
          position: "top-end",
          type: "error",
          showConfirmButton: false,
          timer: 10000,
        });
        return;
      }
      this.new_image_name = event.target.files[0].name;
      this.new_image_file = event.target.files[0].type;

      if (this.new_image_name != this.current_image_name_in_comment) {
      }
      if (this.new_image_file == "image/png") {
        this.createImage(files, this.new_image_file);
      } else if (this.new_image_file == "image/jpeg") {
        this.createImage(files, this.new_image_file);
      } else if (this.new_image_file == "image/jpg") {
        this.createImage(files, this.new_image_file);
      } else {
        Swal({
          type: "error",
          text: this.tlt('admin_ticket_select_img_type'),
          timer: 2500
        });
      }
    },
    createImage(file, type) {
      let reader = new FileReader();
      reader.onload = e => {
        this.image_file = e.target.result.split("base64,")[1];
      };
      reader.readAsDataURL(file);
    },
    send_internal_ticket_comments() {
      if (
        this.new_internal_comment != "" ||
        (this.new_image_name != "" && this.new_image_file != "")
      ) {
        Swal({
          text: this.tlt('admin_ticket_adding_your_comment'),
          type: "info",
          toast: true,
          showConfirmButton: false
        });
        this.spinnerOn = true;
        axios
          .post(
            api_calls.support_ticket(),
            {
              company_name: this.companyname,
              company_id: this.companyid,
              is_edit: true,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              response: {
                ticket_number: this.current_selected_ticket_number,
                update_status: this.current_ticket_status ? this.current_ticket_status : null,
                new_internal_comment: this.new_internal_comment ? this.new_internal_comment : null,
                ticket_img_name: this.new_image_name ? this.new_image_name : null,
                ticket_img_file: this.image_file ? this.image_file : null,
                ticket_company_id: this.ticket_company_id == "" ? this.req_comp_id : this.ticket_company_id,
                ticket_company_name:this.ticket_company_name == "" ? this.req_comp_name : this.ticket_company_name,
              }
              // pageno: this.page_no,
              // perpage: this.per_page,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`
              }
            }
          )
          .then(response => {
            this.spinnerOn = false;
            if (this.api_status_code.TICKET_UPDATED.MSG_CODE == response.data.message.MSG_CODE) {
              Swal({
                type: "success",
                text: this.tlt('admin_ticket_comments_added'),
                timer: 2500
              }).then(result => {
                this.empty_variable();
               $("#ticketModelDetails").modal("hide");
              
              // $('body').removeClass('modal-open');
              // $('.modal-backdrop').remove();
                if (this.send_by_company === true) {
                this.get_company_tickets(this.req_comp_name, this.req_comp_id);
              } else {
                this.get_ticket_details();
              }
              });
            } else if (this.api_status_code.IMG_DUPLICATE.MSG_CODE == response.data.message.MSG_CODE) {
              Swal({
                text:
                  this.tlt('admin_ticket_img_already_found1'),
                type: "error",
                timer: 3000,
              });
            } else if(this.api_status_code.UNSUCCESSFUL_DB_QUERY.MSG_CODE == response.data.message.MSG_CODE){
              Swal({
                type: "error",
                text: response.data.message.MSG,
                timer: 2500,
              });
              //$("#ticketModelDetails").modal("hide");
              //this.empty_variable();
            }
             else {
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                type: "error"
              })
            }
          })
          .catch(e => {
            this.spinnerOn = false;
            if (
              e.response.status === 410 ||
              e.response.status === 440 ||
              e.response.status === 409
            ) {
              this.$root.$emit("Session_Expired", e.response.data);
            } else {
              $("#ticketModelDetails").modal("hide");
              Swal({
                type: "error",
                text: this.tlt('admin_ticket_internal_server8'),
                timer: 2500
              });
            }
          });
          this.close_modal('btn_send_id')
      }
    },
    send_ticket_comments() {
      if (
        this.new_ticket_comment != "" ||
        (this.new_image_name != "" && this.new_image_file != "")
      ) {
        Swal({
          text: this.tlt('admin_ticket_adding_your_comment'),
          type: "info",
          toast: true,
          showConfirmButton: false
        });
        this.spinnerOn = true;
        axios
          .post(
            api_calls.support_ticket(),
            {
              company_name: this.companyname,
              company_id: this.companyid,
              is_edit: true,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              response: {
                ticket_number: this.current_selected_ticket_number,
                update_status: this.current_ticket_status ? this.current_ticket_status : null,
                new_comment: this.new_ticket_comment
                  ? this.new_ticket_comment
                  : null,
                ticket_img_name: this.new_image_name ? this.new_image_name : null,
                ticket_img_file: this.image_file ? this.image_file : null,
                ticket_company_id: this.ticket_company_id == "" ? this.req_comp_id : this.ticket_company_id,
                ticket_company_name:this.ticket_company_name == "" ? this.req_comp_name : this.ticket_company_name,
              }
              // pageno: this.page_no,
              // perpage: this.per_page,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`
              }
            }
          )
          .then(response => {
            this.spinnerOn = false;
            if (this.api_status_code.TICKET_UPDATED.MSG_CODE == response.data.message.MSG_CODE) {
              Swal({
                type: "success",
                text: this.tlt('admin_ticket_comments_added'),
                timer: 2500
              }).then(result => {
                this.empty_variable();
               $("#ticketModelDetails").modal("hide");
              
              // $('body').removeClass('modal-open');
              // $('.modal-backdrop').remove();
                if (this.send_by_company === true) {
                this.get_company_tickets(this.req_comp_name, this.req_comp_id);
              } else {
                this.get_ticket_details();
              }
              });
            } else if (this.api_status_code.IMG_DUPLICATE.MSG_CODE == response.data.message.MSG_CODE) {
              Swal({
                text:
                  this.tlt('admin_ticket_img_already_found1'),
                type: "error",
                timer: 3000,
              });
            } else if(this.api_status_code.UNSUCCESSFUL_DB_QUERY.MSG_CODE == response.data.message.MSG_CODE){
              Swal({
                type: "error",
                text: this.tlt('admin_ticket_error_occurred5'),
                timer: 2500,
              });
              //$("#ticketModelDetails").modal("hide");
              //this.empty_variable();
            }
             else {
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                type: "error"
              })
            }
          })
          .catch(e => {
            this.spinnerOn = false;
            if (
              e.response.status === 410 ||
              e.response.status === 440 ||
              e.response.status === 409
            ) {
              this.$root.$emit("Session_Expired", e.response.data);
            } else {
              $("#ticketModelDetails").modal("hide");
              Swal({
                type: "error",
                text: this.tlt('admin_ticket_internal_server8'),
                timer: 2500
              });
            }
          });
          this.close_modal('btn_send_id')
      }
    },
    empty_variable() {
      this.comments_list = [""];
      this.internal_comments_list = [""]
      this.comment_item_list = [""];
      this.new_ticket_comment = "";
      this.new_internal_comment = "";
      this.send_solution_text = "";
      this.new_image_name = "";
      this.new_image_file = "";
      this.file_content2 = "";
      this.isEditTicketStatus = false;
      this.is_Edit_Status = false;
      this.assigned_developer = "";
      this.current_ticket_status = "";
      this.ticket_company_id = '';
      this.ticket_company_name = '';
    },
    get_company_list() {
      this.spinnerOn = true;
      axios
      .post(api_calls.support_ticket(), {
        company_name: this.companyname,
        company_id: this.companyid,
        email: this.$session.get("UserInformation").email,
        sort_by_company: true,
        is_get: true,
        per_page: this.per_page,
        page_no: this.page_no
      },
      {
        headers: {
          Authorization: `Bearer ${this.$session.get("at")}`,
        },
      })
      .then(response => {
        this.spinnerOn = false;
        if (this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE == response.data.message.MSG_CODE) {
          toastr.error(
            this.tlt('admin_ticket_internal_server9')
          );
        } else if(this.api_status_code.DATA_AVAILABLE.MSG_CODE == response.data.message.MSG_CODE){
          this.number_of_rows = response.data.pagination.total_data;
          this.total_pages = response.data.pagination.total_page;
          this.company_list = response.data.data.ResponseList;
          this.setpagination(this.page_no);
        } else {
          Swal({
            title: response.data.message.MSG_CODE,
            text: response.data.message.MSG,
            showCancelButton: false,
            showConfirmButton: false,
            type: "error"
          })
        }
      })
      .catch((e) => {
          // console.log(e);
          this.spinnerOn = false;
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          } else {
            Swal({
              type: "error",
              text: this.tlt('admin_ticket_internal_server_msg1'),
              timer: 2500,
            });
          }
        });
    },
    get_company_tickets(key1, key2) {
      this.req_comp_name = key1;
      this.req_comp_id = key2;
      this.spinnerOn = true;
      axios
      .post(api_calls.support_ticket(), {
        company_name: this.companyname,
        company_id: this.companyid,
        email: this.$session.get("UserInformation").email,
        filter_by: this.sort_company_status,
        req_company_name: key1,
        req_company_id: key2,
        is_get: true,
        per_page: this.per_page,
        page_no: this.page_no
      },
      {
        headers: {
          Authorization: `Bearer ${this.$session.get("at")}`,
        },
      })
      .then(response => {
        this.spinnerOn = false;
        if (this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE == response.data.message.MSG_CODE) {
          toastr.error(
            this.tlt('admin_ticket_internal_server_msg2')
          );
        } else if (this.api_status_code.DATA_AVAILABLE.MSG_CODE == response.data.message.MSG_CODE) {
          // this.req_comp_id = "";
          // this.req_comp_name = "";
          this.number_of_rows = response.data.pagination.total_data;
          this.total_pages = response.data.pagination.total_page;
          this.company_tickets_list = response.data.data.Ticket;
          this.setpagination(this.page_no);
        } else if (this.api_status_code.NO_EXISTING_TICKET.MSG_CODE == response.data.message.MSG_CODE) {
          this.company_tickets_list = [];
        } else {
          Swal({
            title: response.data.message.MSG_CODE,
            text: response.data.message.MSG,
            showCancelButton: false,
            showConfirmButton: false,
            type: "error"
          })
        }
      })
      .catch((e) => {
          // console.log(e);
          this.spinnerOn = false;
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          } else {
            Swal({
              type: "error",
              text: this.tlt('admin_ticket_internal_server_msg3'),
              timer: 2500,
            });
          }
        });
    },
    page_require(page) {
      if (page == 0 || page == this.total_pages + 1) {
        event.preventDefault();
      } else {
        if (page == "...s") {
          this.page_no = Math.ceil((1 + this.page_no) / 2);
        } else if (page == "...l") {
          this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
        } else {
          this.page_no = page;
        }
        this.spinnerOn = true;
        if (this.filter_status === 'AllTickets'){
          this.get_ticket_details();
        } else if(this.is_collapse) {
          this.get_company_tickets(this.req_comp_name, this.req_comp_id);
        } else {
          this.get_company_list(); 
        }
      }
    },
    setpagination(page_no) {
      this.page_array = [];
      if (this.total_pages <= 7) {
        for (let i = 0; i < this.total_pages; i++) {
          this.page_array.push(i + 1);
        }
      } else if (page_no == 1) {
        for (let i = 0; i < 4; i++) {
          this.page_array.push(i + 1);
        }
        this.page_array.push("...l");
        this.page_array.push(this.total_pages);
      } else if (page_no == this.total_pages) {
        this.page_array.push(1);
        this.page_array.push("...s");
        for (let i = this.total_pages - 4; i < this.total_pages; i++) {
          this.page_array.push(i + 1);
        }
      } else if (page_no <= 4) {
        for (let i = 0; i < page_no + 3; i++) {
          this.page_array.push(i + 1);
        }
        this.page_array.push("...l");
        this.page_array.push(this.total_pages);
      } else if (page_no >= this.total_pages - 4) {
        this.page_array.push(1);
        this.page_array.push("...s");
        for (let i = page_no - 4; i < this.total_pages; i++) {
          this.page_array.push(i + 1);
        }
      } else {
        this.page_array.push(1);
        this.page_array.push("...s");
        for (let i = page_no - 3; i <= page_no + 3; i++) {
          this.page_array.push(i);
        }
        this.page_array.push("...l");
        this.page_array.push(this.total_pages);
      }
    },
  },
}
</script>

<style>
.radio label {
    margin-bottom: 0.3rem !important;
}
i[aria-expanded="true"] {
  color: #192765;
  text-align: center;
}
.dash-modal .close {
  top: 0px !important;
  position: inherit !important;
}
i:hover {
  color: #192765;
}
.table thead th {
  vertical-align: bottom;
  border-bottom: 0px;
}
.comment-box_date{
  position: absolute;
  margin-top: 6px;
  top: 4px;
  right: 2rem;
}
.img_icon_comment {
  cursor: pointer;
  position: relative;
  right: 34px;
  top: 5px;
  margin-right: -22px;
  transform: rotate(136deg);
}
.status_in_comment b{
  /* padding: 2px 10px 2px; */
  border-radius: 4px;
}
.ScrollStyle {
  /* height: 200px; */
  min-height: 0px;
  max-height: 250px;
  overflow-y: auto;
  /* border: 1px solid #e3e2e5; */
}
.ScrollStyle thead th {
  top: 0;
  position: sticky;
}
.ScrollStyle::-webkit-scrollbar {
  max-height: 10px;
  width: 7px;
  height: 12px;
  border-radius: 10px;
  overflow-x: hidden;
}
.ScrollStyle::-webkit-scrollbar-track {
  background: #ffffff;
  border-radius: 10px;
}
.ScrollStyle::-webkit-scrollbar-thumb {
  background: #27397b;
  border-radius: 10px;
}
.ScrollStyle::-webkit-scrollbar-thumb:hover {
  background: #19295f;
  border-radius: 10px;
}
.card-act .darkblue-btn{
  font-size: 14px;
    color: #fff;
    background: #273679;
    border: solid 1px #273679;
    padding: 5px 15px;
    font-weight: 400;
    line-height: 20px;
    display: inline-block;
    border-radius: 4px;
    cursor: pointer;
    height: 32px;
    /* margin-top: 1px; */
}
</style>