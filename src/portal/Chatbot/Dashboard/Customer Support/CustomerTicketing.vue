<template>
  <div>
    <div class="dash-cont">
      <div class="spinner" id="spinner" v-show="spinnerOn"></div>
      <div class="container-fluid">
        <div class="card dash-card">
          <div
            class="card-header d-block d-sm-flex flex-wrap justify-content-between"
          >
            <h4 class="mb-sm-0">{{tlt('customer_page_ticket_title')}}</h4>
            <div class="card-act d-flex">
              <input
                class="form-control search-bar"
                id="search_bar"
                :placeholder="tlt('search_here')"
                v-model.trim="search_key"
                v-on:keyup="callsearch"
              />
              <a
                type="button"
                v-if="isVisibleSearchClear"
                class="btn bg-transparent mt-auto mb-auto py-0"
                @click="clear_search_name"
                style="margin-left: -40px; z-index: 10"
              >
                <img src="/img/close-icn.png" alt />
              </a>
              <a
                href="javascript:void(0)"
                class="darkblue-btn"
                @click="search_ticket()"
                id="search_btn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="14"
                  height="14"
                >
                  <path
                    d="M13.809011327100071,12.965505435601472 L9.30910012117823,8.49330664854199 C10.007392079586584,7.596111589605521 10.38512817619458,6.499157170138106 10.38512817619458,5.345374656726532 c0,-1.3810948891881802 -0.5423458634784514,-2.676086605733705 -1.523073527148749,-3.6524965835014083 c-0.9807276636702976,-0.9764099777677033 -2.287209392305289,-1.5136937750578685 -3.6751296371814526,-1.5136937750578685 s-2.6944019735111544,0.5390058607430178 -3.6751296371814526,1.5136937750578685 C0.5293349766245179,2.667565987539975 -0.011278152465820316,3.9642797675383576 -0.011278152465820316,5.345374656726532 c0,1.3793728257353273 0.5423458634784514,2.6778086691865575 1.523073527148749,3.6524965835014083 C2.492523038353222,9.974281217995648 3.7972720326001044,10.51156501528581 5.18692501186438,10.51156501528581 c1.160932040033745,0 2.2629511108717475,-0.37540983272197437 3.165705727077092,-1.0676793407689171 l4.499911205921844,4.470476723606628 a0.1420842198250257,0.14120920313395363 0 0 0 0.20099718902076805,0 l0.7554721932159904,-0.7490976019910955 a0.1420842198250257,0.14120920313395363 0 0 0 0,-0.19975936053095905 zM7.931576282630728,8.073123166045836 C7.196896902072058,8.80155600660269 6.2231001759542055,9.20279679111746 5.18692501186438,9.20279679111746 s-2.0099718902076775,-0.4012407845147706 -2.744651270766347,-1.1296736250716286 C1.709327094927478,7.342968262036121 1.3055999824978375,6.37516860153268 1.3055999824978375,5.345374656726532 s0.4037271124296458,-1.99931566876244 1.1366737586002036,-2.727748509319298 C3.1769531216567026,1.8891933068503817 4.150749847774562,1.4879525223356067 5.18692501186438,1.4879525223356067 s2.0117046245957884,0.3995187210619175 2.744651270766347,1.1296736250716286 S9.06825004123093,4.315580711920385 9.06825004123093,5.345374656726532 s-0.4037271124296458,1.99931566876244 -1.1366737586002036,2.727748509319298 z"
                    fill="#fff"
                  />
                </svg>
              </a>
              <a
                href="#"
                class="darkblue-btn"
                data-target="#ticketmodal"
                data-toggle="modal"
                id="add_ticket_btn"
                title="Add new ticket"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="13.997"
                  viewBox="0 0 14 13.997"
                >
                  <path
                    id="Union_13"
                    data-name="Union 13"
                    d="M-12684,2058v-5h-5a1,1,0,0,1-1-1,1,1,0,0,1,1-1h5v-5a1,1,0,0,1,1-1,1,1,0,0,1,1,1v5h5a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-5v5a1,1,0,0,1-1,1A1,1,0,0,1-12684,2058Z"
                    transform="translate(12690.001 -2045.002)"
                    fill="#fff"
                  />
                </svg>
                {{tlt('customer_page_add_ticket_btn')}}
              </a>
              <div class="form-group mb-0">
                <select
                  class="form-control"
                  v-model="show_ticket_status"
                  @change="ticket_status_dropdown"
                  id="select_ticket_status"
                >
                  <option value="Open">{{tlt('ticket_dropdown_open_label')}}</option>
                  <option value="Closed">{{tlt('ticket_dropdown_closed')}}</option>
                  <option value="All">{{tlt('ticket_dropdown_all')}}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="card-body" id="page">
            <div
              class="table-box"
              v-show="
                Boolean(
                  ticket_list.length > 0 || ticket_list.length != undefined
                )
              "
            >
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <!-- <th scope="col">
                        <div class="form-check checkbox checkbox-success">
                          <label class="form-check-label">
                            <input
                              class="form-check-input"
                              @change="selected_tickets('all')"
                              id="selectall"
                              type="checkbox"
                            />
                            <span class="icn"></span>
                          </label>
                        </div>
                      </th> -->
                      <th scope="col" style="width: 5%;">#</th>
                      <th scope="col" style="width: 15%;">{{tlt('customer_page_ticket_issue_label')}}</th>
                      <!-- <th scope="col">DESCRIPTION</th> -->
                      <th scope="col" style="width: 18%">{{tlt('customer_page_ticket_date_label')}}</th>
                      <th scope="col" style="width: 15%;">{{tlt('customer_page_curr_status_label')}}</th>
                      <th scope="col" style="width: 15%;">
                        {{tlt('customer_page_comments_label')}}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(ticket, index) in ticket_list" :key="index">
                      <td class="text-center">{{ index + 1 }}</td>
                      <td
                        :title="ticket.TicketIssue.length > 40 ? ticket.TicketIssue :''"
                        style="cursor: pointer;"
                        class="ticket_issue_data"
                      >
                        {{ trim_ticket_issue_name(ticket.TicketIssue) }}
                      </td>
                      <!-- <td
                        :title="ticket.Description"
                        style="cursor: pointer;"
                        class="ticket_issue_data"
                      >
                        {{ trim_ticket_description(ticket.Description) }}
                      </td> -->
                      <td class="text-center">{{ date_formating(ticket.CreatedDate) }}</td>
                      <td
                        class="text-center"
                        :style="
                          ticket.CurrentStatus === 'Open'
                            ? 'color: #ff1a1a; font-weight: bold;'
                            : 'color: #064; font-weight: bold;'
                        "
                      >
                        {{ ticket.CurrentStatus }}
                      </td>
                      <td class="text-center">
                        <a
                          class="view-model"
                          href="#"
                          data-toggle="modal"
                          data-target="#myModal"
                          @click="open_comment_model(index)"
                          style="height: 29px; padding: 0px 10px"
                        >
                          <!-- @click="open_modal_for_intent(index)" -->
                          <!-- <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="13.997"
                            viewBox="0 0 14 13.997"
                          >
                            <path
                              id="Union_13"
                              data-name="Union 13"
                              d="M-12684,2058v-5h-5a1,1,0,0,1-1-1,1,1,0,0,1,1-1h5v-5a1,1,0,0,1,1-1,1,1,0,0,1,1,1v5h5a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-5v5a1,1,0,0,1-1,1A1,1,0,0,1-12684,2058Z"
                              transform="translate(12690.001 -2045.002)"
                              fill="#fff"
                            />
                          </svg> -->
                          {{tlt('view_btn')}}
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div v-show="Boolean(ticket_list.length === 0) && !spinnerOn">
              <p class="text-center">
                <strong>
                  {{tlt('customer_page_no_ticket_label')}}.</strong
                >
              </p>
            </div>
          </div>
        </div>
        <div class="pagin-table" style="margin-top:2%;margin-bottom:4%">
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
                :class="'page-item ' + pagination_class(pageno)"
                v-for="pageno in page_array"
                :key="pageno"
              >
                <a
                  v-if="pageno == '...s' || pageno == '...l'"
                  class="page-link"
                  href="#"
                  @click="page_require(pageno)"
                  >...</a
                >
                <a v-else class="page-link" href="#" @click="page_require(pageno)">{{
                  pageno
                }}</a>
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
    </div>
    <div
      id="myModal"
      class="modal fade dash-modal"
      role="dialog"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-lg">
        <!-- Modal content-->
        <div class="modal-content" style="width: 135%; margin-left: -17%">
          <div
            class="modal-header"
            style="width: 808px; padding: 20px; display: block; padding-bottom: 5px;
            margin-top: 0.2rem;"
          >
          <div style="justify-content: left;">
            <h5 class="span_issue_name">
              {{tlt('t_view_model_issue_name_label')}}:
            </h5>

            <div class="ScrollStyle issue_name_div" style="width: 80%;">
              <p
                v-if="ticket_issue_name != ''"
                class="para_issue_name"
                style=""
              >
                {{ ticket_issue_name }}
              </p>
            </div>

            <div style="margin-left: 3.5rem; position: absolute; top: 1.4rem; right: 4rem;">
              <h5 style="font-size: 17px; font-weight: 500; line-height: 1.5;">
                {{tlt('t_view_model_comments_label')}}:
                <span
                  v-if="ticket_status != ''"
                  class="status_in_comment"
                  :style="
                    ticket_status === 'Open'
                      ? 'color: #ff1a1a; border-radius: 4px;'
                      : 'color: #064; border-radius: 4px;'
                  "
                  ><b>{{ ticket_status }}</b></span
                >
              </h5>
            </div>
          </div>
            <div class="description_in_viewmodal"
                  style="margin-top: 10px;">
                <h5 class="description_heading" style="margin-bottom: 0px;">{{tlt('t_view_model_ticket_desc_label')}}:</h5>
                <div class="ScrollStyle">
                <p 
                  id="ticket_description_id"
                  class="form-control description_in_comment_model"
                  v-if="current_ticket_description != ''"
                >{{ current_ticket_description }}</p>
                </div>
            </div>
            <div class="comment_heading"><h5>{{tlt('t_view_model_comment_label')}}:</h5></div>
            <button
              type="button"
              class="close"
              id="btn-close-comment"
              style="position: absolute !important; top: 20px !important;"
              data-dismiss="modal"
              aria-label="Close"
              @click="empty_variable"
            >
              <img src="/img/close-icn.png" alt />
            </button>
          </div>
          <div class="modal-body py-2 px-3" style="width: 808px">
            <div class="form-group" style="margin-bottom: 4px;">
              <div class="form-group mx-0 my-0 px-0 py-0">
                <div 
                  v-if="Comments_list.length != ''"
                  class="chat-body ScrollStyle"
                  style="height: 35vh !important; overflow-y: auto"
                >
                  <div
                    class="chat-inner"
                    style="position: relative;"
                    v-for="(comment, index) in Comments_list"
                    :key="index"
                  >
                    <div v-if="comment.IsSuperAdmin === true">
                      <div class="d-flex">
                        <i
                          class="fas fa-user-circle mr-3 fa-2x"
                          style="color: darkgrey !important;"
                        ></i>
                        <label
                          style="text-align: justify !important; margin-top: 4px !important;"
                        >
                          <strong><b>{{tlt('cense_team_label')}}</b></strong>
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
                            {{tlt('attached_img_label')}}</a
                          >
                        </span>
                        <label
                          class="form-text text-muted comment-box_date"
                          style="font-size: 12px; margin-top: 6px;"
                          >{{ date_formating(comment.Date) }}
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
                          <strong
                            ><b>{{ comment.Email }}</b></strong
                          >
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
                            {{tlt('attached_img_label')}}</a
                          >
                        </span>
                        <label
                          class="form-text text-muted comment-box_date"
                          style="font-size: 12px; margin-top: 6px;"
                        >
                          {{ date_formating(comment.Date) }}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div style="padding-left: 10px; margin: 8px 0px;" v-else>
                  <p>{{tlt('t_view_model_no_comments')}} ...</p>
                </div>
              </div>
            </div>
            <div
              class="text-right card-act"
              style="display: flex; margin-top: 0px; margin-bottom: 8px; border-top: solid 1px #EAEAEA; padding: 15px 0 0;"
            >
              <input
                type="text"
                class="form-control input-comment-section"
                v-model.trim="new_ticket_comment"
                :placeholder="tlt('type_comment_label')"
              />
              <label for="files" class="btn" style="padding: 0px;">
                <i
                  id="image_file"
                  class="fa fa-paperclip img_icon_comment"
                  aria-hidden="true"
                  :title="new_image_name"
                  style="cursor: pointer;"
                  :style="
                    new_image_name
                      ? 'color: #4000ff !important; font-size: 20px;'
                      : ''
                  "
                  alt="attachment"
                  width="18px;"
                  height="18px;"
                >
                </i
              ></label>
              <input
                type="file"
                id="files"
                accept="image/png, image/jpg, image/jpeg"
                @change="Upload_image_file"
                style="display: none;"
              />
              <button
                v-show="is_status_closed"
                type="button"
                class="darkblue-btn"
                id="btn-reopen"
                @click="reopen_comment"
                :disabled="is_reopen_btn_enable == false"
                :style="
                  is_reopen_btn_enable
                    ? ''
                    : 'background: rgb(187, 187, 187) !important;border: 1px solid rgb(229, 229, 229) !important; height: 35px;'
                "
              >
                {{tlt('reopen_btn')}}
              </button>
              <button
                v-show="!is_status_closed"
                type="button"
                class="darkblue-btn"
                id="btn_send_id"
                :disabled="is_send_btn_enable == false"
                @click="Send_ticket_comments"
                data-dismiss=""
                style="margin-left: 10px; height: 35px;"
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
                  : 'background: rgb(187, 187, 187) !important;'
              "
            >
            <!-- border: 1px solid rgb(229, 229, 229) !important; -->
              <!-- style="bottom: 0px; margin-left: 16px;" -->
              <!-- {{ new_image_name }} -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade dash-modal"
      id="ticketmodal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="ticketmodalTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt />
              </div>
              <h3>{{tlt('ticket_model_add_ticket_header')}}</h3>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                style="top: 35px;"
              >
                <img src="/img/close-icn.png" alt />
              </button>
            </div>

            <form >
              <div class="form-group">
                <label>{{tlt('ticket_model_title_label')}}</label>
                <input
                  type="text"
                  id="issue_ticket"
                  class="form-control"
                  v-model.trim="issue_name"
                  :placeholder="tlt('ticket_title')"
                  required
                  maxlength="100"
                />
              </div>

              <div class="form-group">
                <label>{{tlt('ticket_model_desc_label')}}</label>

                <textarea
                  id="description_ticket"
                  v-model.trim="issue_description"
                  class="form-control"
                  :placeholder="tlt('enter_description')"
                  required
                  rows="5"
                ></textarea>
              </div>
              <div class="form-group" style="line-height:30px">
                <label>{{tlt('ticket_model_upload_file')}}</label>
                <div class="custom-file">
                  <input
                    id="file_ticket"
                    class="custom-file-input form-control"
                    @change="fileinput"
                    type="file"
                  />
                  <label
                    style="font-weight:400; padding: 15px;"
                    class="custom-file-label form-control"
                    for="file"
                    >{{ file_label }}</label
                  >
                </div>
              </div>
              <div class="form-group">
                <label>{{tlt('ticket_model_comments_label')}}</label>
                <input
                  type="text"
                  id="ticket_comment"
                  v-model.trim="issue_comment"
                  class="form-control"
                  :placeholder="tlt('enter_comments')"
                />
              </div>
              <div class="btn-wrap text-right">
                <button
                  type="button"
                  class="btn btn-link"
                  data-dismiss=""
                  @click="clear_fields"
                >
                  {{tlt('cancel_btn')}}
                </button>
                <button type="submit" class="darkblue-btn" id="save_ticket" data-dismiss="" @click="ticket_submit">
                  {{tlt('save_btn')}}
                </button>
              </div>
            </form>
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
        <div
          class="modal-content"
          style="margin-left: auto; margin-right: auto;"
        >
          <div
            class="modal-header"
            style="justify-content: center; padding: 0.5rem;"
          >
            <h5 class="modal-title">
              {{tlt('image_label')}}
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
          <div class="modal-body">
            <img
              v-if="Images_in_current_comment != ''"
              :src="Images_in_current_comment"
              class="center-block p-0 m-0"
              style="height:auto; width:100%;"
            />
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
import {  close_modal } from "@/portal/mixins";
export default {
    mixins: [ close_modal],
  data() {
    return {
      companyname: null,
      companyid: null,
      spinnerOn: false,
      ticket_list: [],
      page_no: 1,
      per_page: 20,
      page_array: [],
      total_pages: null,
      number_of_rows: null,
      isEdit: false,
      Comments_list: [],
      comment_item_list: [],
      ticket_number: "",
      current_selected_ticket_number: "",
      new_ticket_comment: "",
      current_image_name_in_comment: "",
      Images_in_current_comment: "",
      new_image_name: "",
      new_image_file: "",
      image_file: "",
      ticket_issue_name: "",
      ticket_status: "",
      issue_name: "",
      issue_description: "",
      issue_comment: "",
      file_label: "Choose file",
      is_status: null,
      show_ticket_status: "Open",
      current_status: "",
      is_status_closed: false,
      current_ticket_description: "",
      search_key: "",
      isVisibleSearchClear: false
    };
  },
  computed: {
    is_send_btn_enable() {
      if (Boolean(this.new_ticket_comment || this.new_image_name)) {
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
    }
  },
  watch: {
    search_key() {
      if (this.search_key === "") {
        this.ticket_status_dropdown();
        this.isVisibleSearchClear = false;
      } else if (this.search_key !== "") {
        this.isVisibleSearchClear = true;
      }
    }
  },
  created() {
    if (
      !this.$session.has("CompanyId") &&
      this.$session.get("UserInformation").role == "SuperAdmin"
    ) {
      toastr.warning(this.tlt('select_company_name_msg1'));
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
  },
  mounted() {
    // $('.modal').on('hidden.bs.modal', function(){
    //   $("[data-dismiss=modal]").trigger({ type: "click" });
    // });
    this.ticket_status_dropdown();
  },

  methods: {
    ticket_status_dropdown() {
      if (this.show_ticket_status != "") {
        this.is_status = this.show_ticket_status;
      }
      this.ticket_list = [];
      this.page_no = 1;
      this.spinnerOn = true;
      axios
        .post(
          api_calls.support_ticket(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            is_get: true,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            filter_by: this.is_status,
            page_no: 1,
            per_page: this.per_page
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`
            }
          }
        )
        .then(response => {
          this.spinnerOn = false;
          if (
            this.api_status_code.DATA_AVAILABLE.MSG_CODE == response.data.message.MSG_CODE &&
            response.data.data.Ticket != undefined
          ) {
            this.number_of_rows = response.data.pagination.total_data;
            this.total_pages = response.data.pagination.total_page;
            this.ticket_list = response.data.data.Ticket;
            this.page_no = 1;

          } else if (this.api_status_code.NO_EXISTING_TICKET.MSG_CODE == response.data.message.MSG_CODE) {
            Swal({
              text: this.tlt('customer_ticket_no_ticket_found'),
              toast: true,
              position: "top-end",
              type: "warning",
              showConfirmButton: false,
              timer: 2500,
            });
          } 
          else if (this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE == response.data.message.MSG_CODE) {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              type: "error",
              timer: 2500
            })
          } else {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              type: "error"
            })
          }
          this.setpagination(this.page_no);
        })
        .catch(e => {
          this.spinnerOn = false;
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    trim_ticket_issue_name(name) {
      if (name.length > 40) {
        let string_name = name.substring(0, 30) + "...";
        return string_name;
      }
      return name;
    },
    // trim_ticket_description(des_name) {
    //   if (des_name.length > 60) {
    //     let ticket_des_name = des_name.substring(0, 50) + "...";
    //     return ticket_des_name;
    //   }
    //   return des_name;
    // },
    date_formating(sub_date) {
      return moment(sub_date).format("D MMM YYYY HH:mm a");
    },

    clear_search_name() {
      this.search_key = "";
    },
    open_comment_model(index) {
      this.Comments_list = [];
      this.Comments_list = Boolean(this.ticket_list[index].Comments)
        ? this.ticket_list[index].Comments
        : [];
      this.current_selected_ticket_number = this.ticket_list[
        index
      ].TicketNumber;
      this.ticket_issue_name = this.ticket_list[index].TicketIssue;
      this.ticket_status = this.ticket_list[index].CurrentStatus;
      this.current_ticket_description = this.ticket_list[index].Description;
      if (this.ticket_status === "Closed") {
        this.is_status_closed = true;
      } else {
        this.is_status_closed = false;
      }
      //this.current_image_name = this.Comments_list[index].image_name;
      this.current_status = this.ticket_list[index].CurrentStatus;
    },

    reopen_comment() {
      if (this.new_ticket_comment != "") {
        this.spinnerOn = true;
        axios
          .post(
            api_calls.support_ticket(),
            {
              company_name: this.companyname,
              company_id: this.companyid,
              is_edit: true,
              reopen: true,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              response: {
                ticket_number: this.current_selected_ticket_number,
                new_comment: this.new_ticket_comment,
                ticket_img_name: this.new_image_name
                  ? this.new_image_name
                  : null,
                ticket_img_file: this.image_file ? this.image_file : null
              }
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
                text: this.tlt('customer_ticket_status_updated'),
                timer: 2500
              }).then(result => {
                this.empty_variable();
                $("#myModal").modal("hide");
                if(this.search_key != ""){
                  this.search_key = "";
                }
                this.ticket_status_dropdown();
              });
            } else if (this.api_status_code.IMG_DUPLICATE.MSG_CODE == response.data.message.MSG_CODE) {
              Swal({
                text:
                  this.tlt('customer_ticket_img_already_found'),
                type: "error",
                timer: 3000
              });
            } else if (this.api_status_code.UNSUCCESSFUL_DB_QUERY.MSG_CODE == response.data.message.MSG_CODE) {
              Swal({
                text: this.tlt('customer_ticket_error_occurred2'),
                type: "error",
                timer: 3000
              });
              this.empty_variable();
              $("#myModal").modal("hide");
            } else if (this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE == response.data.message.MSG_CODE) {
              Swal({
                type: "error",
                text: this.tlt('customer_ticket_internal_server_msg2'),
                timer: 2500
              });
              //$("#myModal").modal("hide");
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
              this.empty_variable();
              $("#myModal").modal("hide");
              Swal({
                type: "error",
                text: this.tlt('customer_ticket_internal_server_msg3'),
                timer: 2500
              });
            }
          });
      } else {
      }
    },
    open_image_model(index) {
      if (this.Comments_list[index].image_url != null) {
        this.Images_in_current_comment = this.Comments_list[index].image_url;
        this.current_image_name_in_comment = this.Comments_list[
          index
        ].image_name;
      }
    },
    Upload_image_file(event) {
      let files = event.target.files || e.dataTransfer.files;
      if (files[0].size > 2097152) {
        Swal({
          text: this.tlt('customer_ticket_upload_img_msg'),
          toast: true,
          position: "top-end",
          type: "error",
          showConfirmButton: false,
          timer: 10000
        });
        return;
      }
      this.new_image_name = event.target.files[0].name;
      this.new_image_file = event.target.files[0].type;

      if (this.new_image_name != this.current_image_name_in_comment) {
      }
      if (this.new_image_file == "image/png") {
        this.createImage(files[0]);
      } else if (this.new_image_file == "image/jpeg") {
        this.createImage(files[0]);
      } else if (this.new_image_file == "image/jpg") {
        this.createImage(files[0]);
      } else {
        Swal({
          type: "error",
          text: this.tlt('customer_ticket_select_img_type'),
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

    Send_ticket_comments() {
      if(this.new_ticket_comment == "") {
        Swal({
          text: this.tlt('customer_ticket_add_comment_warning'),
          type: "warning",
          position: "top-end",
          toast: true,
          showConfirmButton: false,
          timer: 2500
        });
        return;
      } else if((this.new_image_name == "" && this.new_image_file != "") || (this.new_image_name != "" && this.new_image_file == "")) {
        Swal({
          text: this.tlt('customer_ticket_attach_image_comment_warning'),
          type: "warning",
          position: "top-end",
          toast: true,
          showConfirmButton: false,
          timer: 2500
        });
        return;
      }
      if (
        this.new_ticket_comment != "" ||
        (this.new_image_name != "" && this.new_image_file != "")
      ) {
        
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
                new_comment: this.new_ticket_comment
                  ? this.new_ticket_comment
                  : null,
                ticket_img_name: this.new_image_name
                  ? this.new_image_name
                  : null,
                ticket_img_file: this.image_file ? this.image_file : null
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
                text: this.tlt('customer_ticket_comment_added'),
                timer: 2500
              }).then(result => {
                this.empty_variable();
                // $("#btn-close-comment").click();
                if(this.search_key != ""){
                  this.search_key = "";
                }
                // $('body').removeClass('modal-open');
                // $('.modal-backdrop').remove();
                this.ticket_status_dropdown();
              });
            } else if (this.api_status_code.IMG_DUPLICATE.MSG_CODE == response.data.message.MSG_CODE) {
              Swal({
                text:
                  this.tlt('customer_ticket_img_already_found'),
                type: "error",
                timer: 3000
              });
            } else if (this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE == response.data.message.MSG_CODE) {
              Swal({
                type: "error",
                text: this.tlt('customer_ticket_internal_server_msg4'),
                timer: 2500
              });
              //$("#myModal").modal("hide");
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
              this.empty_variable();
              $("#myModal").modal("hide");
              Swal({
                type: "error",
                text: this.tlt('customer_ticket_internal_server_msg5'),
                timer: 2500
              });
            }
          });
          //  let btn = document.getElementById('btn_send_id');
          //  console.log(btn)
          //     btn.setAttribute("data-dismiss" , "modal");
          //     // $(`#${id}`).attr("data-dismiss","modal"); 
          //     console.log('attached' )
          //     setTimeout(()=>{
          //         // $(`#${id}`).attr("data-dismiss","modal"); 
          //         btn.removeAttribute("data-dismiss");
          //         console.log('removed') 
                  
          //     },0)
          this.close_modal('btn_send_id')
      }
    },
    ticket_submit() {
      event.preventDefault();
      if (this.issue_name == "") {
        toastr.warning(this.tlt('customer_ticket_enter_name'));
      } else if (this.issue_description == "") {
        toastr.warning(this.tlt('customer_ticket_brief_description'));
      } else {
        this.spinnerOn = true;
        // Swal({
        //   text: this.tlt('customer_ticket_submit_ticket_detail'),
        //   type: "info",
        //   toast: true,
        //   showConfirmButton: false
        // });
        axios
          .post(
            api_calls.support_ticket(),
            {
              company_name: this.companyname,
              company_id: this.companyid,
              is_save: true,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              response: {
                ticket_img_name:
                  this.file_label == "Choose file" ? null : this.file_label,
                ticket_img_file: this.img_file ? this.img_file : null,
                new_comment: this.issue_comment ? this.issue_comment : null,
                ticket_issue: this.issue_name,
                description: this.issue_description
              }
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`
              }
            }
          )
          .then(response => {
            this.spinnerOn = false;
            if (this.api_status_code.TICKET_CREATED.MSG_CODE == response.data.message.MSG_CODE) {
              Swal({
                text: this.tlt('customer_ticket_added_successful'),
                type: "success",
                timer: 2500
              });
              this.clear_fields();
              this.ticket_status_dropdown();
            } else if (this.api_status_code.IMG_DUPLICATE.MSG_CODE == response.data.message.MSG_CODE) {
              Swal({
                text:
                  this.tlt('customer_ticket_img_already_found1'),
                type: "error",
                timer: 3000
              });
            } else if (this.api_status_code.UNSUCCESSFUL_DB_QUERY.MSG_CODE == response.data.message.MSG_CODE) {
              Swal({
                text: this.tlt('customer_ticket_error_occurred1'),
                type: "error",
                timer: 3000
              });
              this.clear_fields();
              
            } else if (this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE == response.data.message.MSG_CODE) {
              Swal({
                type: "error",
                text: this.tlt('customer_ticket_internal_server_msg6'),
                timer: 2500
              });
              
              //$("#ticketmodal").modal("hide");
              //this.clear_fields();
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
              Swal({
                type: "error",
                text: this.tlt('customer_ticket_internal_server_msg7'),
                timer: 2500
              });
              this.clear_fields();
              
            }
          });
          // console.log("--------------------------------")
          // let btn =document.getElementById('save_ticket');
          // console.log(btn)
          //     btn.setAttribute("data-dismiss" , "modal");
          //     // $(`#${id}`).attr("data-dismiss","modal"); 
          //     console.log('attached' )
          //     setTimeout(()=>{
          //         // $(`#${id}`).attr("data-dismiss","modal"); 
          //         btn.removeAttribute("data-dismiss");
          //         console.log('removed') 
                  
          //     },0)
          this.close_modal('save_ticket')
      }
    },
    callsearch() {
      if (event.keyCode === 13) {
        if (this.isEditIntent) {
          this.verify_changes();
        } else {
          this.search_ticket();
        }
      }
    },
    search_ticket() {
      if (this.search_key != "") {
        this.spinnerOn = true;
        axios
          .post(
            api_calls.support_ticket(),
            {
              company_name: this.companyname,
              company_id: this.companyid,
              is_search: true,
              search_key: this.search_key,
              filter_by: this.is_status,
              page_no: 1,
              per_page: this.per_page
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`
              }
            }
          )
          .then(response => {
            this.spinnerOn = false;
            if (this.api_status_code.DATA_AVAILABLE.MSG_CODE == response.data.message.MSG_CODE) {
              this.ticket_list = [];
              this.page_no = 1;
              this.number_of_rows = response.data.pagination.total_data;
              this.total_pages = response.data.pagination.total_page;
              this.ticket_list = response.data.data.ResponseList;
              this.setpagination(this.page_no);
            } else if (this.api_status_code.MISSING_SEARCH_KEY.MSG_CODE == response.data.message.MSG_CODE) {
              Swal({
                type: "error",
                text: this.tlt('customer_ticket_search_msg'),
                timer: 2500
              });
            } else if (this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE == response.data.message.MSG_CODE) {
              Swal({
                type: "error",
                text: this.tlt('customer_ticket_error_occurred3'),
                timer: 2500
              });
              this.ticket_status_dropdown();
            } else if (this.api_status_code.EMPTY_DATA.MSG_CODE == response.data.message.MSG_CODE) {
              Swal({
                text: this.tlt('customer_ticket_no_result_found'),
                toast: true,
                position: "top-end",
                type: "warning",
                showConfirmButton: false,
                timer: 2000
              });
            } else if (this.api_status_code.NO_DATA_AVAILABLE.MSG_CODE == response.data.message.MSG_CODE) {
              Swal({
                text: response.data.message.MSG,
                toast: true,
                position: "top-end",
                type: "info",
                showConfirmButton: false,
                timer: 2000
              });
            } else {
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                type: "error",
                timer: 2500
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
            }
          });
      } else {
        Swal({
          text: this.tlt('customer_ticket_type_something_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500
        });
      }
    },
    page_require(page) {
      if (page == 0 || page == this.total_pages + 1) {
      } else {
        if (this.search_key == "") {
          if (page == "...s") {
            this.page_no = Math.ceil((1 + this.page_no) / 2);
          } else if (page == "...l") {
            this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
          } else {
            this.page_no = page;
          }
          this.spinnerOn = true;
          axios
            .post(
              api_calls.support_ticket(),
              {
                company_name: this.companyname,
                company_id: this.companyid,
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                subscription: this.$session.get("UserInformation").subscription,
                is_get: true,
                filter_by: this.is_status,
                page_no: this.page_no,
                per_page: this.per_page
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`
                }
              }
            )
            .then(response => {
              this.spinnerOn = false;
              if (this.api_status_code.DATA_AVAILABLE.MSG_CODE == response.data.message.MSG_CODE) {
                this.number_of_rows = response.data.pagination.total_data;
                this.total_pages = response.data.pagination.total_page;
                this.ticket_list = response.data.data.Ticket;
              } else if (this.api_status_code.NO_DATA_AVAILABLE.MSG_CODE == response.data.message.MSG_CODE) {
                 Swal({
                  text: this.tlt('customer_ticket_no_ticket_found1'),
                  toast: true,
                  position: "top-end",
                  type: "info",
                  showConfirmButton: false,
                  timer: 2500,
                });
              } else if (this.api_status_code.EMPTY_DATA.MSG_CODE == response.data.message.MSG_CODE) {
                Swal({
                  type: "warning",
                  toast: true,
                  position: "top-end",
                  text: this.tlt('customer_ticket_no_ticket_found2'),
                  showConfirmButton: false,
                  timer: 2500
                });
              } else if (this.api_status_code.MISSING_SEARCH_KEY.MSG_CODE == response.data.message.MSG_CODE) {
                Swal({
                  type: "warning",
                  text: this.tlt('customer_ticket_no_ticket_found3'),
                  timer: 2500
                });
              } else if (this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE == response.data.message.MSG_CODE) {
              Swal({
                type: "error",
                text: this.tlt('customer_ticket_internal_server_msg6'),
                timer: 2500
              });
              } else {
                Swal({
                  title: response.data.message.MSG_CODE,
                  text: response.data.message.MSG,
                  showCancelButton: false,
                  showConfirmButton: false,
                  type: "error",
                  timer: 2500
                })
              }
              this.setpagination(this.page_no);
            })
            .catch(e => {
              this.spinnerOn = false;
              if (
                e.response.status === 410 ||
                e.response.status === 440 ||
                e.response.status === 409
              ) {
                this.$root.$emit("Session_Expired", e.response.data);
              }
            });
        } else {
          if (this.pageno == "...s") {
            this.page_no = Math.ceil((1 + this.page_no) / 2);
          } else if (this.pageno == "...l") {
            this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
          } else {
            this.page_no = this.pageno;
          }
          this.spinnerOn = true;
          axios
            .post(
              api_calls.support_ticket(),
              {
                company_name: this.companyname,
                company_id: this.companyid,
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                subscription: this.$session.get("UserInformation").subscription,
                is_get: true,
                filter_by: this.is_status,
                page_no: this.page_no,
                per_page: this.per_page
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`
                }
              }
            )
            .then(response => {
              this.spinnerOn = false;
              if (this.api_status_code.DATA_AVAILABLE.MSG_CODE == response.data.message.MSG_CODE) {
                this.number_of_rows = response.data.pagination.total_data;
                this.total_pages = response.data.pagination.total_page;
                this.ticket_list = response.data.data.Ticket;  
              } else if (this.api_status_code.NO_DATA_AVAILABLE.MSG_CODE == response.data.message.MSG_CODE) {
                Swal({
                  text: this.tlt('customer_ticket_no_ticket_found4'),
                  toast: true,
                  position: "top-end",
                  type: "info",
                  showConfirmButton: false,
                  timer: 2500,
                });

              } else if (this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE == response.data.message.MSG_CODE) {
                Swal({
                  type: "error",
                  text: this.tlt('customer_ticket_internal_server_msg6'),
                  timer: 2500
                });
              } else {
                Swal({
                  title: response.data.message.MSG_CODE,
                  text: response.data.message.MSG,
                  showCancelButton: false,
                  showConfirmButton: false,
                  type: "error",
                  timer: 2500
                })
              }
              this.setpagination(this.page_no);
            })
            .catch(e => {
              this.spinnerOn = false;
              if (
                e.response.status === 410 ||
                e.response.status === 440 ||
                e.response.status === 409
              ) {
                this.$root.$emit("Session_Expired", e.response.data);
              }
            });
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
    pagination_class(index) {
      if (index == this.page_no) {
        return " active";
      } else {
        return "";
      }
    },
    fileinput(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (files[0].size > 2097152) {
        Swal({
          text: this.tlt('customer_ticket_upload_img_ms2'),
          toast: true,
          position: "top-end",
          type: "error",
          showConfirmButton: false,
          timer: 10000
        });
        return;
      } 
      if (files[0].type === "image/png" || files[0].type === "image/jpeg") {
        if (!files.length) return;
        this.old_image_name = this.file_label;
        this.file_label = files[0].name;
        this.new_image_file = files[0].type;
        this.createImage1(files[0]);
      } else {
        toastr.error(this.tlt('customer_ticket_select_img_type2'));
      }
    },
    createImage1(file, type) {
      let reader = new FileReader();
      reader.onload = e => {
        this.img_file = e.target.result.split("base64,")[1];
      };
      reader.readAsDataURL(file);
    },

    clear_fields() {
      this.img_file = "";
      this.file_label = "Choose file";
      this.issue_comment = "";
      this.issue_name = "";
      this.issue_description = "";
    },
    empty_variable() {
      // this.search_key = "";
      this.Comments_list = [""];
      this.comment_item_list = [""];
      this.new_ticket_comment = "";
      this.new_image_name = "";
      this.new_image_file = "";
      this.file_content2 = "";
    }
  }
};
</script>

<style scoped>
.ticket_issue_data {
  /* display: inline-block; */
  width: 180px;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
}

.main-container {
  width: 100%;
  height: 300px;
  border: 1px solid;
}
textarea.form-control {
  resize: none;
  overflow-y: auto;
}
.view-model {
  color: #494d69;
  font-weight: 500;
}

.view-model:hover {
  color: #606060;
}

.save_node_button {
  font-size: 14px;
  color: #fff;
  background: #273679;
  border: 1px solid #273679;
  padding: 6px 15px;
  font-weight: 400;
  line-height: 20px;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}

.custom-file {
  position: relative;
  display: inline-block;
  width: 100%;
  height: calc(2.25rem + 2px);
  margin-bottom: 0;
  margin-top: 10px;
}

.input-comment-section {
  height: 35px !important;
  padding-left: 14px;
  padding-right: 40px;
  font-size: 13px;
  color: #494d69;
}

.dash-modal .close {
  top: 20px;
  opacity: 0.5;
}

.img_icon_comment {
  cursor: pointer;
  position: relative;
  right: 34px;
  top: 5px;
  margin-right: -22px;
  transform: rotate(136deg);
}
.form-group label {
  margin: 0 0 0px;
  font-size: 14px;
  line-height: 4px;
}
.custom-button-box {
  /* border: 0.5px solid #ccc; */
  padding-bottom: 0px !important;
  padding: 1rem;
  margin-top: -26px;
}
.ml-5,
.mx-5 {
  margin-left: 1.5rem !important;
}

.fa-2x {
  font-size: 1.6em;
}
.comment-box_date {
  position: absolute;
  margin-top: 6px;
  top: 4px;
  right: 2rem;
}

.status_in_comment b {
  border-radius: 4px;
}

.card-act .darkblue-btn {
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
}
.reopen-comment {
  margin-left: 6px;
}

.span_issue_name {
  margin-bottom: 0.2rem;
  margin-left: 7px;
  /* font-size: 20px;
  color: #494D69; */
}
.para_issue_name {
  margin-bottom: 0.2rem;
  margin-left: 7px;
  font-size: 17px;
  line-height: 1.5;
  color: rgb(64, 64, 64);
}
.description_in_comment_model{
    border: none;
    /* width: 80%; */
    color: rgb(64, 64, 64);
    padding: 0px 5px;
    padding-left: 0px;
    line-height: 1.5;
}
.comment_heading{
  margin-top: 10px;
    margin-left: 6px;
    /* font-weight: 500;
    font-size: 20px;
    color: #494D69; */
}
.description_in_viewmodal{
  margin-left: 6px;  
  font-weight: 500;
}
.issue_name_div{
  min-height: 0px !important;
  max-height: 54px !important;
  overflow-y: auto !important;
}
div.chat-body{
  min-height: 35vh;
  max-height: 40vh;
  width: auto;
}
.ScrollStyle {
  min-height: 0px;
  max-height: 74px;
  width: 80%;
  overflow-y: auto;
  overflow-x: hidden;
  /* border: 1px solid #e3e2e5; */
}

.ScrollStyle::-webkit-scrollbar {
  max-height: 10px;
  width: 7px;
  height: 7px;
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
 #myModal.modal{
    overflow-y: auto !important;
}
</style>
