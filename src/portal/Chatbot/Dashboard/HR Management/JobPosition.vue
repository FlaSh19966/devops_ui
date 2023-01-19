<template>
  <div>
    <div class="dash-cont">
      <div class="spinner" id="spinner" v-show="spinnerOn"></div>
      <div class="container-fluid">
        <div class="card dash-card">
          <div
            class="
              card-header
              d-block d-sm-flex
              flex-wrap
              justify-content-between
            "
          >
            <h4 class="mb-sm-0">Job Positions</h4>
            <div class="card-act d-flex flex-wrap">
              <!-- for search -harsh -->
              <input
                class="form-control search-bar"
                id="search_bar"
                placeholder="Search here"
                v-model="search_name"
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
                @click="search_position()"
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
                id="add_intent_btn"
                title="Add new Intent"
                @click="add_position_open_modal()"
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
                Create Position
              </a>
              <a href="javascript:void(0)" class="red-btn" id="delete_intent" @click="delete_position()">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                >
                  <path
                    d="M8.375,3v.778H4V5.333h.875V15.444A1.661,1.661,0,0,0,6.625,17h8.75a1.661,1.661,0,0,0,1.75-1.556V5.333H18V3.778H13.625V3H8.375M6.625,5.333h8.75V15.444H6.625V5.333m1.75,1.556v7h1.75v-7H8.375m3.5,0v7h1.75v-7Z"
                    transform="translate(-4 -3)"
                    fill="#fff"
                  />
                </svg>
                Delete
              </a>
            </div>
          </div>
          <div class="card-body" id="page">
            <div
              class="col-sm-12 d-flex px-0"
              v-show="job_positions.length > 0"
            >
              <div class="col-sm-4 pl-0" v-show="job_positions.length > 0">
                <div class="table-box">
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">
                            <div class="form-check checkbox checkbox-success">
                              <label class="form-check-label">
                                <input
                                  class="form-check-input"
                                  id="selectall"
                                  type="checkbox"
                                  @change="selected_position('all')"
                                />
                                <span class="icn"></span>
                              </label>
                            </div>
                          </th>
                          <th scope="col" class="text-left">Job Position</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(positions, index) in job_positions"
                          :key="index"
                          :class="check_current_position(index)"
                        >
                          <td scope="col">
                            <div class="form-check checkbox checkbox-success">
                              <label class="form-check-label">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  :id='index'
                                  @change="
                                    selected_position(positions.PositionName)
                                  "
                                />
                                <span class="icn"></span>
                              </label>
                            </div>
                          </td>
                          <td
                            style="cursor: pointer"
                            @click="show_positions(index)"
                            :title="positions.PositionName"
                          >
                            <template>
                              <p style="margin-bottom: 0">
                                {{ positions.PositionName }}
                              </p>
                            </template>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div
                class="col-sm-8 pr-0"
                id="edit-intent-box"
                v-show="job_positions.length > 0"
              >
                <div style="border: 1px solid #dbe2e8">
                  <div class="col-sm-12">
                    <div style="color: #414141" class="d-flex">
                      <h5><p class="mt-2 mb-0">Position Details</p></h5>
                      <span
                        @click="edit_position_details"
                        v-html="pencil_svg"
                        class="ml-auto mr-2 mt-2"
                        id="edit-intent-cursor"
                        style="cursor: pointer"
                      ></span>
                    </div>
                  </div>
                  <hr style="margin-top: 0;"/>
                  <!-- <EDIT INTENT/SHOW INTENT> -->
                  <div class="col-sm-12" style="margin-bottom: 1rem">
                    <div v-if="current_selected_position">
                    <h5>
                      <p class="mt-2 mb-0" style="color: #414141">
                        Position Name
                      </p>
                    </h5>
                    <h6
                      class="pl-1"
                      style="font-weight: 400"
                      v-if="isEditPosition"
                    >
                      (Only Alphabets, Numbers and _ allowed. No special
                      characters)
                    </h6>
                    <div v-if="!isEditPosition" style="padding-left: 20px">
                      <p>{{ current_selected_position.PositionName }}</p>
                      <!-- <span v-html="current_intent_response"></span> -->
                    </div>
                    <template v-else-if="isEditPosition">
                      <input
                        align="right"
                        class="form-control edit"
                        autocomplete="off"
                        placeholder="Enter Intent"
                        id="enter_intent_id_edit"
                        v-model="current_selected_position_highlight"
                      />                      
                    </template>
                      <h5>
                        <p class="mt-2 mb-0" style="color: #414141">
                          Position Description
                        </p>
                      </h5>
                      <div v-if="!isEditPosition" style="padding-left: 20px">
                        <p>{{ current_selected_position.PositionDetails.position_description }}</p>
                      </div>
                      <template v-else>
                        <input
                          align="right"
                          class="form-control edit"
                          placeholder="Add description to this intent"
                          id="enter_intent_description_id_edit"
                          v-model="selected_position_description"
                        />
                      </template>
                      <hr />
                      <div
                        class="col-sm-12 p-0"
                      >
                        <div class="d-flex">
                          <h5>
                            <p class="mt-2 mb-0" style="color: #414141">Requirement form</p>
                          </h5>
                          <div class="d-flex ml-auto" v-if="!isEditPosition">
                            <label
                              class="mt-2"
                              style="font-weight: 500;"
                              >Hiring Status : </label
                            >
                            <label v-if="is_hiring" class="mt-2" style="margin-left: 10px;">
                              Opened
                            </label>
                            <label v-else class="mt-2" style="margin-left: 10px;">
                              Closed
                            </label>
                          </div>
                          <div class="d-flex ml-auto" v-if="isEditPosition">
                            <label
                              class="mt-2"
                              style="font-weight: 500;"
                              >Hiring Status : </label
                            >
                            <label class="switch mt-2" style="margin-top:0px;">
                              <input
                                type="checkbox"
                                @click="change_hiring_status"
                                v-model="is_hiring"
                                id="is_display_banner_on_landing_id"
                              />
                              <span
                                class="slider round"
                                style="border-radius: 50px;"
                              ></span>
                            </label>
                          </div>
                        </div>
                        <div class="requirement-form" v-if="!isEditPosition">
                          <div v-for="(question, index) in current_selected_position.PositionDetails.requirement_form"
                          :key="index">
                            <div class="form-group mb-2" style="display: flex; font-size: 18px;">
                            <div class="pr-2">{{index + 1}}.</div>
                            <p style="text-transform: capitalize; margin-bottom: 0;">
                              {{question.key_name}} 
                            </p>
                            </div>
                            <div class="d-flex">
                              <p class="pl-4 mb-2" style="font-weight: 500;" > Question Type : </p>
                              <p class="pl-2 mb-2" style="text-transform: capitalize;" >{{question.type}} </p>
                            </div>
                            <div class="form-group pl-4 mb-0" v-if="question.type == 'choice' || question.type == 'multichoice'">
                              <div class="d-flex">
                                <p style="font-weight: 500;">Options : </p>
                                <div
                                  v-for="(option, num) in question.options"
                                  :key="num">
                                  <p class="pl-2"> {{option}}, </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div v-else class="requirement-form">
                          <div
                            class="custom-button-box"
                            v-for="(new_question, index) in selected_position_form_list"
                            :key="index"
                          > 
                            <p style="text-transform: capitalize; font-weight: 500;">
                              Question Type : {{new_question.type}}
                            </p>
                            <div class="form-group" style="display: flex">
                              <div class="pr-2 pt-2">{{index + 1}}</div>
                              <input
                                type="text"
                                v-model.trim="selected_position_form_list[index].key_name"
                                class="form-control edit pl-3"
                                placeholder="Enter Question"
                              />
                              <span
                                v-if="selected_position_form_list.length > 1 && selected_position_form_list[index].type != 'email'"
                                style="cursor: pointer"
                                class="my-auto ml-2 mr-0"
                                @click="add_to_form_list('remove', index)"
                              >
                                <i style="font-size: 16px" class="fa">&#xf00d;</i>
                              </span>
                            </div>
                            <div class="form-group pl-3" v-if="selected_position_form_list[index].type == 'choice' || selected_position_form_list[index].type == 'multichoice'">
                              <p style="font-weight: 500;">
                                Options :
                              </p>
                              <div class="row" style="padding: 0px 10px;">
                              <div
                                v-for="(option, num) in selected_position_form_list[index].options"
                                :key="num">
                                <input
                                  class="form-control edit"
                                  style="width: 170px; margin-left: 5px; padding: 10px 24px 10px 12px;"
                                  placeholder="Add Option"
                                  v-model="selected_position_form_list[index].options[num]"
                                />
                                <a
                                  type="button"
                                  class="btn bg-transparent mt-auto mb-auto py-0"
                                  @click="remove_option(index, num, selected_position_form_list[index].options[num])"
                                  style="position: relative; left: 140px; bottom: 34px;"
                                >
                                  <img src="/img/close-icn.png" alt />
                                </a>
                              </div>
                              <button
                                  id="add_question_button"
                                  class="darkblue-btn"
                                  style="padding: 5px 10px; margin: 5px; height: 32px;"
                                  @click="add_option(index)"
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
                                </button>
                              </div>
                            </div>    
                          </div>
                          <label>Select Type of Question to Add</label>
                          <div class="form-group d-flex">
                            <button
                              id="add_question_button"
                              class="darkblue-btn"
                              style="padding: 5px 10px; margin-left: 5px"
                              @click="add_to_form_list('add', 'text')"
                            >
                              Text
                            </button>
                            <button
                              id="add_question_button"
                              class="darkblue-btn"
                              style="padding: 5px 10px; margin-left: 5px"
                              @click="add_to_form_list('add', 'number')"
                            >
                              Numeric
                            </button>
                            <button
                              id="add_question_button"
                              class="darkblue-btn"
                              style="padding: 5px 10px; margin-left: 5px"
                              @click="add_to_form_list('add', 'choice')"
                            >
                              Choice
                            </button>
                            <button
                              id="add_question_button"
                              class="darkblue-btn"
                              style="padding: 5px 10px; margin-left: 5px"
                              @click="add_to_form_list('add', 'multichoice')"
                            >
                              Multi-choice
                            </button>
                            <button
                              id="add_question_button"
                              class="darkblue-btn"
                              style="padding: 5px 10px; margin-left: 5px"
                              @click="add_to_form_list('add', 'file')"
                            >
                              File
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="modal-footer" v-if="isEditPosition">
                    <div class="dash-modal card-act">
                      <div class="btn-wrap text-right mt-0 py-0 border-top-0">
                        <button
                          type="button"
                          class="btn btn-link"
                          data-dismiss="modal"
                          @click="edit_position_details"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          class="darkblue-btn"
                          id="res_n_int_save"
                          @click="edit_position()"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="job_positions.length === 0 && !spinnerOn">
              <p class="text-center">
                <strong>
                  You currently have 0 Job positions opened. Please create to
                  continue.</strong
                >
              </p>
            </div>
            <div
              class="pagin-table"
              style="margin-top: 2%"
              v-show="job_positions.length > 0"
            >
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
                    <a
                      v-if="pageno != '...s' && pageno != '...l'"
                      class="page-link"
                      href="#"
                      @click="page_require(pageno)"
                      >{{ pageno }}</a
                    >
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
      </div>
    </div>
    <!-- Modal -->
    <!-- SAVE NEW INTENT -->
    <div
      id="create_position_model"
      class="modal fade dash-modal"
      role="dialog"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog" style="max-width: 800px !important;">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt />
              </div>
              <h3>Job Position</h3>
              <button type="button" class="close" data-dismiss="modal">
                <img src="/img/close-icn.png" alt />
              </button>
            </div>
            <div class="form-group">
              <label style="font-weight: 500;"
                >Position
                <span class="pl-1"
                  >(Only Alphabets, Numbers and _ allowed. No special
                  characters)</span
                ></label
              >
              <input
                type="text"
                v-model="new_position_name"
                class="form-control"
                placeholder="Enter Job Positon Name"
                id="enter_intent_id"
              />
            </div>
            <div class="form-group">
              <label style="font-weight: 500;">Description</label>
              <textarea
                style="resize: none"
                type="text"
                v-model="new_position_description"
                class="form-control"
                placeholder="Enter Job Positon Description"
                id="enter_intent_id"
                rows="5"
              />
            </div>
            <div class="d-flex" style="display: block; margin-bottom: 2px">
              <label style="font-weight: 500;"
                >Create Requirement Form / Questions that candidate should
                fill</label
              >
              <label
                class="ml-auto"
                >Hiring Status</label
              >
              <label class="switch" style="margin-top:0px;">
                <input
                  type="checkbox"
                  @click="change_hiring_status"
                  v-model="is_hiring"
                  id="is_display_banner_on_landing_id"
                />
                <span
                  class="slider round"
                  style="border-radius: 50px;"
                ></span>
              </label>
            </div>
            <div
              class="custom-button-box"
              v-for="(new_question, index) in add_form_list"
              :key="index"
            > 
              <p style="text-transform: capitalize; font-weight: 500;">
                Question Type : {{new_question.type}}
              </p>
              <div class="form-group" style="display: flex">
                <div class="pr-2 pt-2">{{index + 1}}</div>
                <input
                  type="text"
                  v-model.trim="add_form_list[index].key_name"
                  class="form-control pl-3"
                  placeholder="Enter Question"
                />
                <span
                  v-if="add_form_list.length > 1 && add_form_list[index].type != 'email'"
                  style="cursor: pointer"
                  class="my-auto ml-2 mr-0"
                  @click="add_to_form_list('remove', index)"
                >
                  <i style="font-size: 16px" class="fa">&#xf00d;</i>
                </span>
              </div>
              <div class="form-group" v-if="add_form_list[index].type == 'choice' || add_form_list[index].type == 'multichoice'">
                <p style="font-weight: 500;">
                  Options :
                </p>
                <div class="row" style="padding: 0px 10px;">
                <div
                  v-for="(option, num) in add_form_list[index].options"
                  :key="num">
                  <input
                    class="form-control"
                    style="width: 170px; margin-left: 5px; padding: 10px 24px 10px 12px;"
                    placeholder="Add Option"
                    v-model="add_form_list[index].options[num]"
                  />
                  <a
                    type="button"
                    class="btn bg-transparent mt-auto mb-auto py-0"
                    @click="remove_option(index, num, add_form_list[index].options[num])"
                    style="position: relative; left: 140px; bottom: 34px;"
                  >
                    <img src="/img/close-icn.png" alt />
                  </a>
                </div>
                <button
                    id="add_question_button"
                    class="darkblue-btn"
                    style="padding: 5px 10px; margin: 5px; height: 32px;"
                    @click="add_option(index)"
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
                  </button>
                </div>
              </div>    
            </div>
            <label>Select Type of Question to Add</label>
            <div class="form-group d-flex">
              <button
                id="add_question_button"
                class="darkblue-btn"
                style="padding: 5px 10px; margin-left: 5px"
                @click="add_to_form_list('add', 'text')"
              >
                Text
              </button>
              <button
                id="add_question_button"
                class="darkblue-btn"
                style="padding: 5px 10px; margin-left: 5px"
                @click="add_to_form_list('add', 'number')"
              >
                Numeric
              </button>
              <button
                id="add_question_button"
                class="darkblue-btn"
                style="padding: 5px 10px; margin-left: 5px"
                @click="add_to_form_list('add', 'choice')"
              >
                Choice
              </button>
              <button
                id="add_question_button"
                class="darkblue-btn"
                style="padding: 5px 10px; margin-left: 5px"
                @click="add_to_form_list('add', 'multichoice')"
              >
                Multi-choice
              </button>
              <button
                id="add_question_button"
                class="darkblue-btn"
                style="padding: 5px 10px; margin-left: 5px"
                @click="add_to_form_list('add', 'file')"
              >
                File
              </button>
            </div>
          </div>
          <div class="modal-footer">
            <div class="btn-wrap card-act text-right mt-0 py-0 border-top-0">
              <button
                type="button"
                class="btn btn-link"
                data-dismiss="modal"
                @click="empty_variable()"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="darkblue-btn"
                id="res_n_int_save"
                @click="create_position()"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import api_calls from "@/portal/api_calls";
export default {
  name: "JobPosition",
  data() {
    return {
      pencil_svg:
        ' <svg xmlns="http://www.w3.org/2000/svg" width="15.546" height="15.461" viewBox="0 0 15.546 15.461"><defs><style>.a{fill:#9e9e9e;}</style></defs><g transform="translate(-747.888 -356.769)"><path class="a" d="M759.416,356.769a2.358,2.358,0,0,1,1.777.662c.534.513,1.072,1.025,1.567,1.575a2.3,2.3,0,0,1-.071,3.325c-2.736,2.76-5.494,5.5-8.238,8.251a1.381,1.381,0,0,1-.758.288c-.719.174-1.429.379-2.144.572-.932.251-1.862.5-2.795.751-.6.158-.989-.213-.832-.807q.689-2.595,1.406-5.182a1.164,1.164,0,0,1,.289-.487q4.091-4.107,8.2-8.2A2.265,2.265,0,0,1,759.416,356.769Zm-1.989,2.956-6.54,6.538,3.025,3.024,6.538-6.537Zm4.023,2.165c.118-.135.225-.269.343-.392a1.134,1.134,0,0,0,0-1.734c-.46-.466-.926-.925-1.388-1.39a1.166,1.166,0,0,0-.861-.368c-.578,0-.881.4-1.214.76Zm-12.084,8.863,3.2-.863-2.337-2.331Z" transform="translate(0)"/><path class="a" d="M813.942,422.6l-.789-.8,3.821-3.819.784.8Z" transform="translate(-59.648 -55.947)"/></g></svg>',
      point_circle_svg:
        '<svg data-v-8cb8d9fe="" data-tooltip="tooltip" data-placement="bottom" title="" data-toggle="modal" data-target="#configapimodal4" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" height="24" width="24" version="1.1" data-original-title="Help"><g data-v-8cb8d9fe="" transform="translate(0 -1028.4)"><path data-v-8cb8d9fe="" d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z" transform="translate(0 1029.4)" fill="#2980b9"></path><path data-v-8cb8d9fe="" d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z" transform="translate(0 1028.4)" fill="#273679"></path></g></svg>',
      spinnerOn: false,
      total_pages: null,
      page_no: 1,
      per_page: 15,
      page_array: [],
      isVisibleSearchClear: false,
      company_name: this.$session.get("UserInformation").company_name,
      company_id: this.$session.get("UserInformation").company_id,
      number_of_rows: null,
      search_name: "",
      options: [],
      checked_list: [],
      current_selected_position: "",
      current_selected_position_index: 0,
      current_selected_position_highlight: "",
      selected_position_form_list: [""],
      selected_position_description: "",
      isEditPosition: false,
      add_form_list: [{ key_name: "Candidate Email", type: "email" }],
      new_position_name: "",
      new_position_description: "",
      is_hiring: false,
      job_positions: [],
    };
  },
  watch: {
    search_name() {
      if (this.search_name === "") {
        this.get_positions();
        this.isVisibleSearchClear = false;
      } else if (this.search_name !== "") {
        this.isVisibleSearchClear = true;
      }
    },
  },
  mounted() {
    this.get_positions();
  },
  methods: {
    callsearch() {
      if (event.keyCode === 13) {
        this.search_position();
      }
    },
    clear_search_name() {
      this.search_name = "";
    },
    search_position () {
      if (this.search_name != "") {
        $("input:checkbox").prop("checked", false);
        this.checked_list = [];
        this.spinnerOn = true;
        axios
          .post(
            api_calls.hr_position_details(),
            {
              company_id: this.company_id,
              company_name: this.company_name,
              is_search: true,
              search_key: this.search_name,
              per_page: this.per_page,
              page_no: 1,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            this.spinnerOn = false;
            if (response.data != "" &&
            response.data != null &&
            response.data != "Internal server Error" &&
            (!response.data.errors)
            ) {
              this.number_of_rows = response.data.count;
              this.total_pages = Math.ceil(
                this.number_of_rows / this.per_page
              );
              this.job_positions = response.data.data;
              this.show_positions(0);
              this.setpagination(this.page_no);
            } else if (response.data.MSG === "No Results Found") 
            {
              Swal({
                text: "No Results Found",
                toast: true,
                position: "top-end",
                type: "warning",
                showConfirmButton: false,
                timer: 2000,
              });
            }
          else {
            Swal({
              text: "Internal Server Error",
              toast: true,
              position: "top-end",
              type: "warning",
              showConfirmButton: false,
              timer: 2000,
            });
            this.get_positions();
          }
        })
        .catch((e) => {
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
          text: "Enter proper data for searching",
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    },
    change_hiring_status () {
      if (this.is_hiring) {
        this.is_hiring = false;
      }else {
        this.is_hiring = true;
      }
    },
    selected_position (value) {
      console.log(value);
      if(value == "all"){
        if (event.target.checked) {
          this.checked_list = [];
            for (var i in this.job_positions) {
              this.checked_list.push(this.job_positions[i].PositionName);
          }
          $("input:checkbox").prop("checked", false);
          for(let i = 0; i < this.checked_list.length; i++){
            $("#"+[i]).prop("checked", true);
            $("#selectall").prop("checked", true);
          }
        }else if (!event.target.checked){
          this.checked_list = [];
          $("input:checkbox").prop("checked", false);
        }
      }else{
        if (event.target.checked) {
          this.checked_list.push(value);
        } else if (!event.target.checked){
          var selectall = document.querySelector("#selectall");
          if (selectall.checked) {
            selectall.checked = false;
          }
          var temp = this.checked_list.filter((PositionName) => {
            return PositionName != PositionName;
          });
          this.checked_list = temp;
        }
      }
      console.log(this.checked_list);
    },
    show_positions(index) {
      this.isEditPosition = false;
      this.current_selected_position = this.job_positions[index];
      this.old_position_name = this.current_selected_position.PositionName;
      this.current_selected_position_highlight = this.current_selected_position.PositionName;
      this.selected_position_description = this.current_selected_position.PositionDetails.position_description;
      this.selected_position_form_list = this.current_selected_position.PositionDetails.requirement_form;
      this.current_selected_position_index = index;
      this.is_hiring = this.current_selected_position.is_hiring;
    },
    delete_position() {
      console.log("Delete", this.checked_list);
      axios
        .post(
          api_calls.hr_position_details(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            is_delete: true,
            position_list: this.checked_list
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          this.spinnerOn = false;
          console.log(response);
          this.checked_list = [];
          $("input:checkbox").prop("checked", false);
          this.get_positions();
        })
        .catch((e) => {
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
    get_positions() {
      this.spinnerOn = true;
      axios
        .post(
          api_calls.hr_position_details(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            is_get: true,
            page_no: 1,
            per_page: this.per_page
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          this.spinnerOn = false;
          this.job_positions = [];
          if (response.data != "" &&
            response.data != null &&
            response.data != "Internal server Error" &&
            (!response.data.errors)
          ) {
            this.number_of_rows = response.data.count;
            this.total_pages = Math.ceil(
              this.number_of_rows / this.per_page
            );
            this.job_positions = response.data.data;
            this.show_positions(0);
            this.setpagination(this.page_no);
          } else {
            this.job_positions = null;
          }
        })
        .catch((e) => {
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
    edit_position () {
      if (this.current_selected_position_highlight == "" || this.selected_position_description == "") {
        Swal({
          type: "warning",
          text: "Fields cannot be empty",
          timer: 2000,
        });
        return;
      }
      var temp = {
        requirement_form: this.selected_position_form_list,
        position_description: this.selected_position_description
      }
      axios
        .post(
          api_calls.hr_position_details(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            position_name: this.current_selected_position_highlight,
            old_position_name: this.old_position_name,
            is_edit: true,
            position_details: temp,
            is_hiring: this.is_hiring
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          this.spinnerOn = false;
          if (response.data.MSG == "Query Executed Successfully" 
          ) {
            Swal({
              type: "success",
              text: "Position Edited Successfully",
              timer: 2000,
            });
          } else if (response.data.MSG == "Query Executed UnSuccessfully") {
            Swal({
              type: "error",
              text: "Some error occurred",
              timer: 2000,
            });
          } else {
            Swal({
              type: "error",
              text: "Internal server error",
              timer: 2000,
            });
          }
          this.isEditPosition = false;
          this.get_positions();
        })
        .catch((e) => {
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
    create_position() {
      if (this.new_position_name == "" || this.new_position_description == "") {
        Swal({
          type: "warning",
          text: "Fields cannot be empty",
          timer: 2000,
        });
        return;
      }
      var temp = {
        requirement_form: this.add_form_list,
        position_description: this.new_position_description
      }
      axios
        .post(
          api_calls.hr_position_details(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            license_key: this.$session.get("UserInformation").license_key,
            email: this.$session.get("UserInformation").email,
            token: this.$session.get("UserInformation").tokens,
            position_name: this.new_position_name,
            is_save: true,
            position_details: temp,
            is_hiring: this.is_hiring
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          this.spinnerOn = false;
          if ( response.data.MSG == 'Document inserted' &&
            response.data != "" &&
            response.data != null &&
            response.data != "Internal server Error") 
          {
            Swal({
              type: "success",
              text: "Job Position Created",
              timer: 2000,
            });
            this.number_of_rows = response.data.pagecount;
            this.total_pages = Math.ceil(
              this.number_of_rows / this.per_page
            );
            $("#create_position_model").modal("hide");
            this.empty_variable();
            this.setpagination(this.page_no);
            this.get_positions();
          }
          else if (response.data.MSG == "Position already exists") {
            Swal({
              type: "warning",
              text: "Position already exists",
              timer: 2000,
            });
          } else if (response.data.MSG == "Internal Server Error") {
            Swal({
              type: "error",
              text: "Internal Server Error",
              timer: 2000,
            });
          } else {
            Swal({
              type: "error",
              text: "Internal Server Error",
              timer: 2000,
            });
          }
        })
        .catch((e) => {
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
    add_option(index) {
      if (!this.isEditPosition) {
        this.add_form_list[index].options.push("");
      }else {
        this.selected_position_form_list[index].options.push("");
      }
    },
    remove_option(index, num){
      if (!this.isEditPosition) {
        this.add_form_list[index].options.splice(num, 1);
      }else {
        this.selected_position_form_list[index].options.splice(num, 1);
      }
    },
    add_to_form_list(option, inortyp) {
      if (!this.isEditPosition) {
        if (option == "add") {
          if (inortyp == "text") {
            this.add_form_list.push({
              key_name: "",
              type: "text",
            });
          }
          if (inortyp == "number") {
            this.add_form_list.push({
              key_name: "",
              type: "number",
            });
          }
          if (inortyp == "choice") {
            this.add_form_list.push({
              key_name: "",
              type: "choice",
              options: [],
            });
          }
          if (inortyp == "multichoice") {
            this.add_form_list.push({
              key_name: "",
              type: "multichoice",
              options: [],
            });
          }
          if (inortyp == "file") {
            this.add_form_list.push({
              key_name: "",
              type: "file",
            });
          }
        } else if (option == "remove") {
          this.add_form_list.splice(inortyp, 1);
        }
      } else {
        if (option == "add") {
          if (inortyp == "text") {
            this.selected_position_form_list.push({
              key_name: "",
              type: "text",
            });
          }
          if (inortyp == "number") {
            this.selected_position_form_list.push({
              key_name: "",
              type: "number",
            });
          }
          if (inortyp == "choice") {
            this.selected_position_form_list.push({
              key_name: "",
              type: "choice",
              options: [],
            });
          }
          if (inortyp == "multichoice") {
            this.selected_position_form_list.push({
              key_name: "",
              type: "multichoice",
              options: [],
            });
          }
          if (inortyp == "file") {
            this.selected_position_form_list.push({
              key_name: "",
              type: "file",
            });
          }
        } else if (option == "remove") {
          this.selected_position_form_list.splice(inortyp, 1);
        }
      }
    },
    add_position_open_modal() {
      this.isEditPosition = false;
      $("#create_position_model").modal("show");
    },
    edit_position_details() {
      if (!this.isEditPosition) {
        this.isEditPosition = true;
      } else {
        this.isEditPosition = false;
      }
      return;
    },
    empty_variable() {
      this.new_position_name = "";
      this.new_position_description = "";
      this.add_form_list = [];
      this.isEditPosition = false;
      $("#create_position_model").modal("hide");
    },
    page_require(page) {
      if (page == 0 || page == this.total_pages + 1) {
      } else {
        if (this.search_name == "") {
          if (page == "...s") {
          this.page_no = Math.ceil((1 + this.page_no) / 2);
        } else if (page == "...l") {
          this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
        } else {
          this.page_no = page;
        }
        $("input:checkbox").prop("checked", false);
        this.spinnerOn = true;
        axios
          .post(
            api_calls.hr_position_details(),
            {
              company_id: this.company_id,
              company_name: this.company_name,
              is_get: true,
              page_no: this.page_no,
              per_page: 10
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            this.spinnerOn = false;
            this.job_positions = [];
            if (response.data != "" &&
              response.data != null &&
              response.data != "Internal server Error" &&
              (!response.data.errors)
            ) {
              this.number_of_rows = response.data.count;
              this.total_pages = Math.ceil(
                this.number_of_rows / this.per_page
              );
              this.job_positions = response.data.data;
              this.show_positions(0);
              this.setpagination(this.page_no);
            } else {
              this.job_positions = null;
            }
          })
          .catch((e) => {
            this.spinnerOn = false;
            if (
              e.response.status === 410 ||
              e.response.status === 440 ||
              e.response.status === 409
            ) {
              this.$root.$emit("Session_Expired", e.response.data);
            }
          });
        }else {
          if (page == "...s") {
          this.page_no = Math.ceil((1 + this.page_no) / 2);
        } else if (page == "...l") {
          this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
        } else {
          this.page_no = page;
        }
        $("input:checkbox").prop("checked", false);
        this.spinnerOn = true;
        axios
          .post(
            api_calls.hr_position_details(),
            {
              company_id: this.company_id,
              company_name: this.company_name,
              is_search: true,
              search_key: this.search_name,
              page_no: this.page_no,
              per_page: this.per_page,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            this.spinnerOn = false;
            if (response.data != null) {
              if (response.data === "DB OPERATION UNSUCCESSFUL") {
                this.job_positions = [];
                return;
              }
              this.job_positions = response.data.data;
              if (this.job_positions.length > 0) {
                this.current_selected_position = this.job_positions[0];
              }
              this.isEditPosition = false;
            }
            this.setpagination(this.page_no);
          })
          .catch((e) => {
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
    check_current_position(index) {
      var return_var = "";
      if (this.job_positions[index].PositionName == this.current_selected_position_highlight) {
        return_var += "current-active-position";
      }
      return return_var;
    }
  },
};
</script>

<style scoped>
.requirement-form {
  height: 300px;
  overflow-x: hidden;
  overflow-y: scroll;
}
.requirement-form::-webkit-scrollbar {
  max-height: 10px;
  width: 7px;
  height: 7px;
  border-radius: 10px;
  overflow-x: hidden;
}
.requirement-form::-webkit-scrollbar-track {
  background: #ffffff;
  border-radius: 10px;
}
.requirement-form::-webkit-scrollbar-thumb {
  background: #7d7d7d;
  border-radius: 10px;
}
.requirement-form::-webkit-scrollbar-thumb:hover {
  background: #7d7d7d;
  border-radius: 10px;
}
.custom-button-box {
  border: 0.5px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
.edit {
  line-height: 16px;
  padding: 10px 15px;
}
.current-active-position {
  background: rgba(0, 0, 0, 0.1);
}

</style>