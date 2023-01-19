<template>
  <div class="dash-cont">
    <div class="spinner" id="spinner" v-show="big_spinner"></div>
    <div class="container-fluid">
      <div class="card dash-card">
        <div class="card-header d-block d-sm-flex flex-wrap justify-content-between"></div>
        <div class="card-body" style="margin-top:-2%">
          <div class="row">
            <div class="col-md-5" style="border-right: solid 1px #EAEAEA;">
              <h5 class="mb-sm-0" style="margin-top: 20px;margin-left:10px">Communication Settings</h5>
              <br />
              <div class="form-group">
                <label style="font-weight: 500;margin-left: 4%;">Support Call Settings</label>
                <div class="form-group">
                  <form @submit="save_greetings">
                    <br />
                    <div class="form-group" style="margin-top:-5%">
                      <label style="margin-left: 7%;">Greetings when the User calls Support Team</label>
                      <span style="margin-left: 8px;">
                        <svg
                          data-toggle="modal"
                          data-target="#miss_call_start"
                          data-tooltip="tooltip"
                          data-placement="bottom"
                          title="Help"
                          class="question-mark"
                          fill="#273679"
                          xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:cc="http://creativecommons.org/ns#"
                          xmlns:dc="http://purl.org/dc/elements/1.1/"
                          height="24"
                          width="24"
                          version="1.1"
                        >
                          <g transform="translate(0 -1028.4)">
                            <path
                              d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z"
                              transform="translate(0 1029.4)"
                              fill="#2980b9"
                            />
                            <path
                              d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z"
                              transform="translate(0 1028.4)"
                              fill="#273679"
                            />
                            <path
                              d="m12 1035.4c-1.727-0.1-3.4306 1.1-3.8438 2.8-0.0403 0.3-0.0546 0.4-0.1562 1.2h2c-0.0526-1.3 1.306-2.3 2.5-2 1.021 0.3 1.763 1.5 1.406 2.5-0.294 0.6-0.998 1-1.562 1.4-0.577 0.5-1.074 1.1-1.313 1.8-0.039 0.4-0.034 0.8-0.031 1.3h2v-1c0.172-0.7 0.688-1.1 1.25-1.4 0.634-0.3 1.087-0.8 1.406-1.4 0.543-1 0.454-2.2-0.125-3.1-0.705-1.3-2.067-2.2-3.531-2.1zm0 10c-0.552 0-1 0.4-1 1 0 0.5 0.448 1 1 1s1-0.5 1-1c0-0.6-0.448-1-1-1z"
                              fill="#2980b9"
                            />
                            <path
                              d="m12 6c-1.727-0.0274-3.4306 1.1749-3.8438 2.875-0.0403 0.2941-0.0546 0.3281-0.1562 1.125h2c-0.0526-1.2477 1.306-2.289 2.5-1.9375 1.021 0.2374 1.763 1.4281 1.406 2.4375-0.294 0.684-0.998 0.992-1.562 1.406-0.577 0.482-1.074 1.094-1.313 1.813-0.039 0.42-0.034 0.859-0.031 1.281h2v-1c0.172-0.624 0.688-1.042 1.25-1.312 0.634-0.312 1.087-0.835 1.406-1.469 0.543-0.974 0.454-2.1746-0.125-3.094-0.705-1.2699-2.067-2.1438-3.531-2.125zm0 10c-0.552 0-1 0.448-1 1s0.448 1 1 1 1-0.448 1-1-0.448-1-1-1z"
                              transform="translate(0 1028.4)"
                              fill="#ecf0f1"
                            />
                          </g>
                        </svg>
                      </span>
                      <textarea
                        v-model="start_greetings"
                        id="start_greetings_support"
                        type="text"
                        class="form-control"
                        placeholder="Enter Text ..."
                        style="padding: 6px 6px 6px 6px;width:90%;margin-left: 6%;height: 90px;"
                      ></textarea>
                      <label
                        style="margin-left: 7%;margin-top: 4%"
                      >Greetings in case Support Team is busy</label>
                      <textarea
                        v-model="end_greetings"
                        id="end_greetings_support"
                        type="text"
                        class="form-control"
                        placeholder="Enter Text ..."
                        style="padding: 6px 6px 6px 6px;width:90%;margin-left: 6%;height: 90px;"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      id="greetings_save"
                      style="width: 100px;height: 35px;text-align: center;font-size: 13px;margin-left: 33px;font-weight: bold;background: #273679;
                border: solid 1px #273679;cursor: pointer;border-radius: 4px;color: #fff;"
                    >Save</button>
                  </form>
                </div>
              </div>
              <div>
                <form @submit="sms_settings">
                  <div class="form-group" style="margin-top: 5%;">
                    <label style="font-weight: 500;margin-left: 4%;">SMS Settings</label>
                    <span style="margin-left: 8px;">
                      <svg
                        class="question-mark"
                        data-tooltip="tooltip"
                        data-placement="bottom"
                        title="Help"
                        data-toggle="modal"
                        data-target="#miss_sms"
                        fill="#273679"
                        xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:cc="http://creativecommons.org/ns#"
                        xmlns:dc="http://purl.org/dc/elements/1.1/"
                        height="24"
                        width="24"
                        version="1.1"
                      >
                        <g transform="translate(0 -1028.4)">
                          <path
                            d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z"
                            transform="translate(0 1029.4)"
                            fill="#2980b9"
                          />
                          <path
                            d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z"
                            transform="translate(0 1028.4)"
                            fill="#273679"
                          />
                          <path
                            d="m12 1035.4c-1.727-0.1-3.4306 1.1-3.8438 2.8-0.0403 0.3-0.0546 0.4-0.1562 1.2h2c-0.0526-1.3 1.306-2.3 2.5-2 1.021 0.3 1.763 1.5 1.406 2.5-0.294 0.6-0.998 1-1.562 1.4-0.577 0.5-1.074 1.1-1.313 1.8-0.039 0.4-0.034 0.8-0.031 1.3h2v-1c0.172-0.7 0.688-1.1 1.25-1.4 0.634-0.3 1.087-0.8 1.406-1.4 0.543-1 0.454-2.2-0.125-3.1-0.705-1.3-2.067-2.2-3.531-2.1zm0 10c-0.552 0-1 0.4-1 1 0 0.5 0.448 1 1 1s1-0.5 1-1c0-0.6-0.448-1-1-1z"
                            fill="#2980b9"
                          />
                          <path
                            d="m12 6c-1.727-0.0274-3.4306 1.1749-3.8438 2.875-0.0403 0.2941-0.0546 0.3281-0.1562 1.125h2c-0.0526-1.2477 1.306-2.289 2.5-1.9375 1.021 0.2374 1.763 1.4281 1.406 2.4375-0.294 0.684-0.998 0.992-1.562 1.406-0.577 0.482-1.074 1.094-1.313 1.813-0.039 0.42-0.034 0.859-0.031 1.281h2v-1c0.172-0.624 0.688-1.042 1.25-1.312 0.634-0.312 1.087-0.835 1.406-1.469 0.543-0.974 0.454-2.1746-0.125-3.094-0.705-1.2699-2.067-2.1438-3.531-2.125zm0 10c-0.552 0-1 0.448-1 1s0.448 1 1 1 1-0.448 1-1-0.448-1-1-1z"
                            transform="translate(0 1028.4)"
                            fill="#ecf0f1"
                          />
                        </g>
                      </svg>
                    </span>
                    <textarea
                      style="padding: 15px 25px 15px 15px;width:90%;margin-left: 5%;"
                      id="sms_settings_text"
                      v-model="sms_text"
                      class="form-control"
                      rows="3"
                      placeholder="Enter your text for OTP here..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    id="save_sms"
                    style="width: 100px;height: 35px;text-align: center;font-size: 13px;margin-left: 33px;font-weight: bold;background: #273679;
                border: solid 1px #273679;cursor: pointer;border-radius: 4px;color: #fff;"
                  >Save</button>
                </form>
              </div>
            </div>
            <div class="col-md-7">
              <div class="card dash-card" style="width: 100%;">
                <div class="card-header d-block d-sm-flex flex-wrap justify-content-between">
                  <div class="card-act d-flex flex-wrap" style="width: 100%;">
                    <h5 class="mb-sm-0">Support Team Contacts</h5>
                    <a
                      href="#"
                      class="darkblue-btn"
                      style="margin-left: auto;"
                      data-toggle="modal"
                      data-target="#add_number_modal"
                      id="support_team_add_num"
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
                      Add Number
                    </a>
                    <a
                      href="javascript:void(0)"
                      class="red-btn"
                      @click="delete_multiple_support_number"
                    >
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
                  <div class="table-box" style="margin-top:23px;margin-left:10px;width: 100%;">
                    <div class="table-responsive">
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col" style="width: 1%;">
                              <div class="form-check checkbox checkbox-success">
                                <label class="form-check-label">
                                  <input
                                    class="form-check-input checkbox checkbox-success"
                                    @change="contact_select('all')"
                                    type="checkbox"
                                    id="selectall"
                                  />
                                  <span class="icn"></span>
                                </label>
                              </div>
                            </th>
                            <th scope="col" style="width: 1%;">ACTION</th>
                            <th scope="col" style="width: 20%;">NAME</th>
                            <th scope="col" style="width: 5%;">NUMBER</th>
                            <!-- <th scope="col">LOCATION</th> -->
                            <!-- <th scope="col" style="width: 8%;">CALL HISTORY</th> -->
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(contact_info, index) in support_numbers_list" :key="index">
                            <th scope="row">
                              <div class="form-check checkbox checkbox-success">
                                <label class="form-check-label">
                                  <input
                                    class="form-check-input checkbox checkbox-success"
                                    @change="contact_select(index)"
                                    type="checkbox"
                                    value
                                    required
                                  />
                                  <span class="icn"></span>
                                </label>
                              </div>
                            </th>
                            <td class="action">
                              <a
                                class="#"
                                @click="edit_support_number(index)"
                                data-toggle="modal"
                                data-target="#add_number_modal"
                                style="cursor: pointer"
                                id="edit_add_num"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="15.392"
                                  height="15.392"
                                  viewBox="0 0 15.392 15.392"
                                >
                                  <path
                                    id="square-edit-outline"
                                    d="M4.71,3A1.7,1.7,0,0,0,3,4.71V16.682a1.71,1.71,0,0,0,1.71,1.71H16.682a1.71,1.71,0,0,0,1.71-1.71V10.7h-1.71v5.986H4.71V4.71H10.7V3H4.71m10.928.855a.591.591,0,0,0-.41.171L14.185,5.061,16.322,7.2l1.043-1.035a.578.578,0,0,0,0-.812L16.04,4.026a.571.571,0,0,0-.4-.171M13.578,5.668l-6.3,6.311v2.138H9.413l6.3-6.311Z"
                                    transform="translate(-3 -3)"
                                    fill="#9499ae"
                                  />
                                </svg>
                              </a>
                              <a
                                href="#"
                                class="trash"
                                @click="delete_support_number(index)"
                                id="single_delete_miscellaneous_id"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="13.682"
                                  height="15.392"
                                  viewBox="0 0 13.682 15.392"
                                >
                                  <path
                                    id="trash-can-outline"
                                    d="M8.276,3v.855H4v1.71h.855V16.682a1.71,1.71,0,0,0,1.71,1.71h8.551a1.71,1.71,0,0,0,1.71-1.71V5.565h.855V3.855H13.406V3H8.276M6.565,5.565h8.551V16.682H6.565V5.565m1.71,1.71v7.7h1.71v-7.7H8.276m3.42,0v7.7h1.71v-7.7Z"
                                    transform="translate(-4 -3)"
                                    fill="#f23d3d"
                                  />
                                </svg>
                              </a>
                            </td>
                            <td>{{contact_info.Name}}</td>
                            <td>{{contact_info.ContactNumber}}</td>
                            <!-- <td>
                              <button
                                type="submit"
                                data-toggle="modal"
                                data-target="#chathistorymodel"
                                id="logs_button"
                                @click="support_modal(index)"
                                style="width: 70px;height: 29px;text-align: center;font-size: 13px;font-weight: bold;background: #273679;
                                border: solid 1px #273679;cursor: pointer;border-radius: 4px;color: #fff;margin-left: 20%;"
                              >Logs</button>
                            </td>-->
                          </tr>
                        </tbody>
                      </table>
                      <div class="pagin-table" style="margin-top:2%">
                        <nav aria-label="Page navigation example">
                          <ul class="pagination justify-content-center" style="margin-bottom:2%">
                            <li class="page-item">
                              <a class="page-link" href="#" @click="page_require(page_no-1)">
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
                              :class="'page-item '+pagination_class(pageno)"
                              v-for="pageno in total_pages"
                              :key="pageno"
                            >
                              <a class="page-link" href="#" @click="page_require(pageno)">{{pageno}}</a>
                            </li>
                            <li class="page-item">
                              <a class="page-link" href="#" @click="page_require(page_no+1)">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="8.667"
                                  height="15.204"
                                  viewBox="0 0 8.667 15.204"
                                >
                                  <g id="arrow-point-to-right" transform="translate(-97.139 0)">
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
                    class="modal fade dash-modal"
                    id="add_number_modal"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="add_number_modal_title"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-dialog-centered" role="document">
                      <div class="modal-content">
                        <div class="modal-body">
                          <div class="modal-head d-flex align-items-center">
                            <div class="head-icn">
                              <img src="/img/user-blue.png" alt />
                            </div>
                            <h3>Add Number</h3>
                          </div>
                          <button class="close" data-dismiss="modal" aria-label="Close">
                            <img src="/img/close-icn.png" alt />
                          </button>
                          <form @submit="submit_numbers">
                            <div class="form-group">
                              Name
                              <input
                                id="support_num_names"
                                v-model="contact_names"
                                class="form-control"
                                placeholder="Enter Name"
                              />
                            </div>
                            <div class="form-group">
                              Country
                              <multiselect
                                v-model="country_name"
                                id="select_country_name_misc"
                                :options="country_list"
                                :searchable="true"
                                :close-on-select="true"
                                :show-labels="false"
                                track-by="name"
                                placeholder="---Select Country Name---"
                                label="name"
                              ></multiselect>
                            </div>
                            <div class="form-group">
                              Contact Number
                              <input
                                v-model="contact_numbers"
                                id="form_password"
                                class="form-control"
                                placeholder="Enter Contact number"
                              />
                            </div>
                            <div class="btn-wrap text-right">
                              <button
                                class="btn btn-link"
                                @click="empty_variable"
                                data-dismiss="modal"
                              >Cancel</button>
                              <button
                                type="submit"
                                value="submit"
                                class="darkblue-btn"
                                id="save_add_num"
                              >Save</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="modal fade dash-modal"
                    id="languagemodel"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="languagemodeltitle"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-dialog-centered" role="document">
                      <div class="modal-content">
                        <div class="modal-body">
                          <div class="modal-head d-flex align-items-center">
                            <div class="head-icn">
                              <img src="/img/user-blue.png" alt />
                            </div>
                            <h3>Add Language</h3>
                          </div>
                          <button class="close" data-dismiss="modal" aria-label="Close">
                            <img src="/img/close-icn.png" alt />
                          </button>
                          <form>
                            <div class="form-group">
                              Language
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Enter Language"
                              />
                            </div>

                            <div class="btn-wrap text-right">
                              <button
                                class="btn btn-link"
                                @click="empty_variable"
                                data-dismiss="modal"
                              >Cancel</button>
                              <button type="submit" class="darkblue-btn">Save</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="modal fade dash-modal"
                    id="chathistorymodel"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="chathistorymodeltitle"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-dialog-centered" role="document">
                      <div class="modal-content" style="margin-left: -220px;width: 204%;">
                        <div class="modal-body" style="width: 1150px;">
                          <div class="modal-head d-flex align-items-center">
                            <img class="head-icn" src="/img/user-blue.png" alt />
                            <h5>Call History for {{call_history_name}}</h5>
                          </div>
                          <div>
                            <div class="form-group">
                              <div class="table-box">
                                <div class="table-responsive">
                                  <table class="table">
                                    <thead>
                                      <tr>
                                        <th id="h_jan" scope="col" value="1">January</th>
                                        <th id="h_feb" scope="col" value="2">February</th>
                                        <th id="h_mar" scope="col" value="3">March</th>
                                        <!-- <th id="h_apr" scope="col" style="background-color: rgb(39, 54, 121);" value=4>April</th> -->
                                        <th id="h_apr" scope="col" value="4">April</th>
                                        <th id="h_may" scope="col" value="5">May</th>
                                        <th id="h_jun" scope="col" value="6">June</th>
                                        <th id="h_jul" scope="col" value="7">July</th>
                                        <th id="h_aug" scope="col" value="8">August</th>
                                        <th id="h_sep" scope="col" value="9">September</th>
                                        <th id="h_oct" scope="col" value="10">October</th>
                                        <th id="h_nov" scope="col" value="11">November</th>
                                        <th id="h_dec" scope="col" value="12">December</th>
                                      </tr>
                                    </thead>
                                  </table>
                                </div>
                              </div>
                            </div>
                            <button
                              class="close"
                              data-dismiss="modal"
                              aria-label="Close"
                              id="close_logs"
                            >
                              <img src="/img/close-icn.png" alt />
                            </button>
                            <div class="form-group">
                              <div class="table-box">
                                <div class="table-responsive">
                                  <table class="table">
                                    <thead>
                                      <tr>
                                        <th scope="col" style="width:30%">CALLER NUMBER</th>
                                        <th scope="col" style="width:14%">DATE</th>
                                        <th scope="col" style="width:11%">START TIME</th>
                                        <th scope="col" style="width:11%">END TIME</th>
                                        <th scope="col" style="width:13.8%">CALL DURATION(sec)</th>
                                      </tr>
                                    </thead>
                                    <tr
                                      v-for="(contact_history, index) in call_history_list"
                                      :key="index"
                                    >
                                      <td>{{contact_history.caller}}</td>
                                      <td>{{contact_history.date}}</td>
                                      <td>{{contact_history.start_time}}</td>
                                      <td>{{contact_history.end_time}}</td>
                                      <td>{{contact_history.duration}}</td>
                                    </tr>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="button">
                            <!-- <button type="submit" @click="table_to_csv"
                                style="width: 140px;height: 35px;text-align: center;font-size: 13px;font-weight: bold;background: #273679;
                            border: solid 1px #273679;cursor: pointer;border-radius: 4px;color: #fff;"
                            >Download as CSV</button>-->

                            <download-excel
                              class="darkblue-btn1"
                              :data="call_history_list"
                              type="csv"
                              name="Call History.xls"
                            >Download to Excel</download-excel>
                          </div>
                          <div class="pagin-table" style="margin-top:2%">
                            <nav aria-label="Page navigation example">
                              <ul
                                class="pagination justify-content-center"
                                style="margin-bottom:2%"
                              >
                                <li class="page-item">
                                  <a
                                    class="page-link"
                                    href="#"
                                    @click="call_history_page_require(page_no-1)"
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
                                  :class="'page-item '+pagination_class(pageno)"
                                  v-for="pageno in call_history_total_pages"
                                  :key="pageno"
                                >
                                  <a
                                    class="page-link"
                                    href="#"
                                    @click="call_history_page_require(pageno)"
                                  >{{pageno}}</a>
                                </li>
                                <li class="page-item">
                                  <a
                                    class="page-link"
                                    href="#"
                                    @click="call_history_page_require(page_no+1)"
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
                  <div
                    class="modal fade dash-modal"
                    id="miss_sms"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="configapimodaltitle"
                    aria-hidden="true"
                    data-backdrop="true"
                  >
                    <div class="modal-dialog modal-dialog-centered" role="document">
                      <div class="modal-content" style="width: 105%;">
                        <div class="modal-body" style="width: 600px;">
                          <div class="modal-head d-flex align-items-center">
                            <div class="head-icn">
                              <img src="/img/msg-blue.png" alt />
                            </div>
                            <h3>Help</h3>
                          </div>
                          <div>
                            <h6
                              class="hclass6"
                            >Here you can set the OTP message which will be sent to the user through Chatbot</h6>
                          </div>
                          <div>
                            <div>
                              <br />
                              <label>SMS Settings</label>
                              <textarea
                                disabled
                                id="configapi_req_json"
                                class="form-control"
                                placeholder="response"
                                rows="2"
                                style="color:black"
                                v-model="start_sms_greetings"
                              ></textarea>
                            </div>
                          </div>
                          <br />
                          <h6 class="hclass6">
                            In Place of
                            <span style="font-weight:450">{OTP}</span>, there will be a numerical value sent to the end user
                          </h6>
                          <br />
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <img src="/img/close-icn.png" alt />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="modal fade dash-modal"
                    id="miss_call_start"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="configapimodaltitle"
                    aria-hidden="true"
                    data-backdrop="true"
                  >
                    <div class="modal-dialog modal-dialog-centered" role="document">
                      <div class="modal-content" style="width: 110%;">
                        <div class="modal-body" style="width: 600px;">
                          <div class="modal-head d-flex align-items-center">
                            <div class="head-icn">
                              <img src="/img/msg-blue.png" alt />
                            </div>
                            <h3>Help</h3>
                          </div>
                          <div>
                            <h6>This is a message to end user while connecting to the support agent</h6>
                          </div>
                          <div>
                            <div>
                              <br />
                              <label>Call Starting Greetings</label>
                              <textarea
                                disabled
                                id="configapi_req_json"
                                class="form-control"
                                placeholder="response"
                                rows="3"
                                style="color:black"
                                v-model="call_start_greetings"
                              ></textarea>
                            </div>
                          </div>
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <img src="/img/close-icn.png" alt />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade dash-modal"
      id="miss_call_start"
      tabindex="-1"
      role="dialog"
      aria-labelledby="configapimodaltitle"
      aria-hidden="true"
      data-backdrop="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content" style="width: 110%;">
          <div class="modal-body" style="width: 600px;">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt />
              </div>
              <h3>Help</h3>
            </div>
            <div>
              <h6>This is a message to end user while connecting to the support agent</h6>
            </div>
            <div>
              <div>
                <br />
                <label>Call Starting Greetings</label>
                <textarea
                  disabled
                  id="configapi_req_json"
                  class="form-control"
                  placeholder="response"
                  rows="3"
                  style="color:black"
                  v-model="call_start_greetings"
                ></textarea>
              </div>
            </div>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <img src="/img/close-icn.png" alt />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade dash-modal"
      id="miss_sms"
      tabindex="-1"
      role="dialog"
      aria-labelledby="configapimodaltitle"
      aria-hidden="true"
      data-backdrop="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content" style="width: 105%;">
          <div class="modal-body" style="width: 600px;">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt />
              </div>
              <h3>Help</h3>
            </div>
            <div>
              <h6
                class="hclass6"
              >Here you can set the OTP message which will be sent to the user through Chatbot</h6>
            </div>
            <div>
              <div>
                <br />
                <label>SMS Settings</label>
                <textarea
                  disabled
                  id="configapi_req_json"
                  class="form-control"
                  placeholder="response"
                  rows="2"
                  style="color:black"
                  v-model="start_sms_greetings"
                ></textarea>
              </div>
            </div>
            <br />
            <h6 class="hclass6">
              In Place of
              <span style="font-weight:450">{OTP}</span>, there will be a numerical value sent to the end user
            </h6>
            <br />
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <img src="/img/close-icn.png" alt />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import JsonExcel from "vue-json-excel";
import countries from "@/portal/components/Countries";
import axios from "axios";
import Swal from "sweetalert2";
import { setTimeout } from "timers";
import api_calls from "@/portal/api_calls";
import Multiselect from "vue-multiselect";

Vue.component("downloadExcel", JsonExcel);
export default {
  data() {
    return {
      sms_text: "",
      start_greetings: "",
      end_greetings: "",
      big_spinner: false,
      total_pages: null,
      number_of_rows: null,
      page_no: 1,
      per_page: 5,
      country_list: countries,
      user_role: this.$session.get("UserInformation").role,
      checked_list: [],
      companyid: "",
      companyname: "",
      call_history_name: "",
      support_numbers_list: [],
      contact_numbers: "",
      contact_names: "",
      country_name: {
        code: "",
        name: "--Select Country Name--"
      },

      old_contact_data: {
        ContactNumber: "",
        CountryCode: "",
        Name: ""
      },
      new_contact_data: {
        ContactNumber: "",
        CountryCode: "",
        Name: ""
      },
      call_history_list: [],
      call_history_number_of_rows: "",
      call_history_total_pages: 0,
      call_history_per_page: 10,
      start_sms_greetings: `Thank you for registering with Cense AI. Your otp is {OTP}.`,
      call_start_greetings: `This call is from {company name}, please hold on while we connect you with our respresentative.`,
      countryname: [],
      contactnumbers: [],
      contactnames: [],
      phone_number_validity: /[0-9]{9,11}$/,
      contact_edit_number: "false",
    };
  },
  components: {
    Multiselect
  },
  created() {
    if (
      !this.$session.has("CompanyId") &&
      this.$session.get("UserInformation").role == "SuperAdmin"
    ) {
      toastr.warning("Please select a company name from the dropdown");
      axios
        .post(api_calls.load_support_url(), {
          company_name: this.companyname,
          company_id: this.companyid,
          show_superadmin: "True",
          email: this.$session.get("UserInformation").email,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens,
          isShow: "True"
        },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          },
        })
        .then(response => {
          this.number_of_rows = response.data[1].number_of_rows;
          this.total_pages = Math.ceil(this.number_of_rows / this.per_page);
          this.support_numbers_list = response.data[0];
        });
    } else if (this.$session.get("UserInformation").role == "SuperAdmin") {
      this.companyid = this.$session.get("CompanyId");
      this.companyname = this.$session.get("CompanyName");
    } else {
      this.companyid = this.$session.get("UserInformation").company_id;
      this.companyname = this.$session.get("UserInformation").company_name;
    }
    if (
      this.$session.has("CompanyId") ||
      this.$session.get("UserInformation").role != "SuperAdmin"
    ) {
      axios
        .post(api_calls.load_support_url(), {
          company_id: this.companyid,
          company_name: this.companyname,
          email: this.$session.get("UserInformation").email,
          token: this.$session.get("UserInformation").tokens,
          license_key: this.$session.get("UserInformation").license_key,
          page_no: this.page_no,
          per_page: this.per_page,
          isShow: "True"
        },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          },
        })
        .then(response => {
          this.number_of_rows = response.data[1].number_of_rows;
          this.total_pages = Math.ceil(this.number_of_rows / this.per_page);
          this.support_numbers_list = response.data[0];
        });
    }
    axios
      .post(api_calls.twilio_greetings(), {
        company_name: this.companyname,
        company_id: this.companyid,
        email: this.$session.get("UserInformation").email,
        license_key: this.$session.get("UserInformation").license_key,
        token: this.$session.get("UserInformation").tokens,
        isShow: true
      })
      .then(response => {
        this.start_greetings = response.data.greeting;
        this.end_greetings = response.data.busy;
      });
  },
  methods: {
    save_greetings() {
      event.preventDefault();
      axios
        .post(api_calls.twilio_greetings(), {
          company_name: this.companyname,
          company_id: this.companyid,
          email: this.$session.get("UserInformation").email,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens,
          isEdit: true,
          greeting: this.start_greetings,
          busy: this.end_greetings
        },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          },
        })
        .then(response => {
          if (response.data == "Call Messages Updated") {
            toastr.success("Call Greetings Updated Successfully");
            setTimeout(() => {
              this.$router.go();
            }, 1000);
          }
          if (response.data == "Query Executed Successfully") {
            toastr.success("SMS message saved succesfully");
          }
        });
    },
    sms_settings() {
      event.preventDefault();
      axios
        .post(api_calls.sms_settings(), {
          company_name: this.companyname,
          company_id: this.companyid,
          email: this.$session.get("UserInformation").email,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens,
          smstext: this.sms_text
        },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          },
        })
        .then(response => {
          if (response.data == "Query Executed Successfully") {
            toastr.success("SMS message saved succesfully");
          }
        });
    },
    delete_support_number(index) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete!!"
      }).then(result => {
        if (result.value) {
          axios
            .post(api_calls.add_support_url(), {
              company_id: this.companyid,
              company_name: this.companyname,
              email: this.$session.get("UserInformation").email,
              token: this.$session.get("UserInformation").tokens,
              license_key: this.$session.get("UserInformation").license_key,
              ContactNumber: this.checked_list,
              isDelete: "True",
              contacts: [
                {
                  Name: this.support_numbers_list[index].Name,
                  ContactNumber: this.support_numbers_list[index].ContactNumber
                }
              ]
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            })
            .then(response => {
              if (response.data == "CONTACTS DELETED") {
                toastr.success("Contact Deleted Successfully");
                setTimeout(() => {
                  this.$router.go();
                }, 1000);
              }
            });
        }
      });
    },
    delete_multiple_support_number() {
      if (this.checked_list.length == 0) {
        Swal.fire({
                title:"No number selected!",
                text:"",
                type:"error",
                timer:2000,
                });
      } else if (this.checked_list.length > 0) {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete!!"
        }).then(result => {
          if (result.value) {
            axios
              .post(api_calls.add_support_url(), {
                company_id: this.companyid,
                company_name: this.companyname,
                email: this.$session.get("UserInformation").email,
                token: this.$session.get("UserInformation").tokens,
                license_key: this.$session.get("UserInformation").license_key,
                isDelete: "True",
                contacts: this.checked_list
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              })
              .then(response => {
                if (response.data == "CONTACTS DELETED") {
                  toastr.success("Contact Deleted Successfully");
                  setTimeout(() => {
                    this.$router.go();
                  }, 1000);
                }
              });
          }
        });
      }
    },
    support_modal(index) {
      this.call_history_name = this.support_numbers_list[index].Name;
      this.call_history_list = [];
      if (
        this.$session.get("UserInformation").role == "SuperAdmin" &&
        !this.$session.has("CompanyId")
      ) {
        axios
          .post(api_calls.get_call_log_url(), {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            supportnumber: this.support_numbers_list[index].ContactNumber,
            page_no: 1,
            super_admin_log: true,
            per_page: this.per_page
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          })
          .then(response => {
            this.call_history_number_of_rows = response.data[1].number_of_rows;
            this.call_history_total_pages = Math.ceil(
              this.call_history_number_of_rows / this.call_history_per_page
            );
            this.caller_history_list = response.data[0];
            for (var i in this.caller_history_list) {
              this.call_history_list.push(this.caller_history_list[i]);
            }
          });
      } else {
        axios
          .post(api_calls.get_call_log_url(), {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            supportnumber: this.support_numbers_list[index].ContactNumber,
            page_no: 1,
            per_page: this.per_page
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          })
          .then(response => {
            this.call_history_number_of_rows = response.data[1].number_of_rows;
            this.call_history_total_pages = Math.ceil(
              this.call_history_number_of_rows / this.call_history_per_page
            );
            this.caller_history_list = response.data[0];
            for (var i in this.caller_history_list) {
              this.call_history_list.push(this.caller_history_list[i]);
            }
            var call_history_length = this.call_history_list.length;
            for (var i = 0; i <= call_history_length; i++) {
              this.call_history_list[i].caller_name = this.support_numbers_list[
                index
              ].Name;
              if (this.call_history_list[i].duration == "0") {
                this.call_history_list[i].duration = "Missed Call";
              }
            }
            for (var i = 0; i <= call_history_length; i++) {
              this.call_history_list[i].caller_name = this.support_numbers_list[
                index
              ].Name;
            }
          });

        var d = new Date();
        var n = d.getMonth();
        // document.getElementById("demo").innerHTML = n;
        this.current_month = n + 1;
        switch (this.current_month) {
          case 1:
            document.getElementById("#h_jan").style.backgroundColor = "#273679";
            break;
          case 2:
            document.getElementById("h_feb").style.backgroundColor = "#273679";
            break;
          case 3:
            document.getElementById("h_mar").style.backgroundColor = "#273679";
            break;
          case 4:
            document.getElementById("h_apr").style.backgroundColor = "#273679";
            break;
          case 5:
            document.getElementById("h_may").style.backgroundColor = "#273679";
            break;
          case 6:
            document.getElementById("h_jun").style.backgroundColor = "#273679";
            break;
          case 7:
            document.getElementById("h_jul").style.backgroundColor = "#273679";
            break;
          case 8:
            document.getElementById("h_aug").style.backgroundColor = "#273679";
            break;
          case 9:
            document.getElementById("h_sep").style.backgroundColor = "#273679";
            break;
          case 10:
            document.getElementById("h_oct").style.backgroundColor = "#273679";
            break;
          case 11:
            document.getElementById("h_nov").style.backgroundColor = "#273679";
            break;
          case 12:
            document.getElementById("h_dec").style.backgroundColor = "#273679";
        }
      }
    },
    call_history_page_require(page_number) {
      this.caller_history_list = [];
      axios
        .post(api_calls.get_call_log_url(), {
          company_name: this.companyname,
          company_id: this.companyid,
          email: this.$session.get("UserInformation").email,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens,
          supportnumber: this.support_numbers_list[index].ContactNumber,
          page_no: page_number,
          per_page: this.per_page
        },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          },
        })
        .then(response => {
          this.caller_history_list = response.data[0];
          for (var i in this.caller_history_list) {
            this.call_history_list.push(this.caller_history_list[i]);
          }
        });
      this.to_number = this.support_numbers_list[index].Name;
    },
    submit_numbers() {
      event.preventDefault();
      if (
        this.contact_names == "" ||
        this.contact_numbers == "" ||
        this.country_name.code == ""
      ) {
        toastr.error("Please enter the blank fields");
      } else if (!this.check_number_validity()) {
        toastr.error(
          "Please enter a valid phone number or try adding number without spaces"
        );
      } else {
        this.contactnumbers.push(this.contact_numbers.replace(/[^0-9]/g, ""));
        this.countryname.push(this.country_name);
        this.contactnames.push(this.contact_names);
        if (this.contact_edit_number == "false") {
          this.big_spinner = true;
          axios
            .post(api_calls.add_support_url(), {
              company_id: this.companyid,
              company_name: this.companyname,
              email: this.$session.get("UserInformation").email,
              token: this.$session.get("UserInformation").tokens,
              license_key: this.$session.get("UserInformation").license_key,
              isInsert: "True",
              contacts: [
                {
                  Name: this.contact_names,
                  ContactNumber: this.contact_numbers,
                  CountryCode: this.country_name.code
                }
              ]
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            })
            .then(response => {
              this.big_spinner = false;
              if (response.data.Msg == "Contacts added successfully") {
                toastr.success("Contacts added successfully");
                $("#add_number_modal").modal("hide");
                setTimeout(() => {
                  this.$router.go();
                }, 2500);
              } else if (response.data == "INSERT DUPLICATE CONTACT") {
                toastr.error(
                  "Please Try with another contact number.This contact number is already exist"
                );
              } else if (response.data.Msg == "Invalid contact number") {
                toastr.error("The contact number you provided is invalid.");
              }
            });
        } else if (this.contact_edit_number == "true") {
          this.big_spinner = true;
          this.new_contact_data.ContactNumber = this.contact_numbers;
          this.new_contact_data.CountryCode = this.country_name.code;
          this.new_contact_data.Name = this.contact_names;
          axios
            .post(api_calls.add_support_url(), {
              company_id: this.companyid,
              company_name: this.companyname,
              email: this.$session.get("UserInformation").email,
              token: this.$session.get("UserInformation").tokens,
              license_key: this.$session.get("UserInformation").license_key,
              old_contact_data: this.old_contact_data,
              new_contact_data: this.new_contact_data,
              isEdit: "True"
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            })
            .then(response => {
              this.big_spinner = false;
              if (response.data == "Contact Updated Successfully") {
                toastr.success("Contacts updated successfully");
                $("#add_number_modal").modal("hide");
                setTimeout(() => {
                  this.$router.go();
                }, 2500);
              }
            });
        }
      }
    },
    empty_variable() {
      this.contact_names = "";
      this.contact_numbers = "";
      this.country_name.code = "";
      this.country_name.name = "--Select Country Name--";
    },
    pagination_class(index) {
      if (index == this.page_no) {
        return " active";
      } else {
        return "";
      }
    },
    edit_support_number(index) {
      this.contact_names = this.support_numbers_list[index].Name;
      this.contact_numbers = this.support_numbers_list[index].ContactNumber;
      this.country_name.code = this.support_numbers_list[index].CountryCode;
      this.old_contact_data.ContactNumber = this.contact_numbers;
      this.old_contact_data.CountryCode = this.country_name.code;
      this.old_contact_data.Name = this.contact_names;
      this.contact_edit_number = "true";
      //harsh
      let select_country = this.country_list.filter(country => {
        return country.code == this.country_name.code;
      });
      this.country_name.name = select_country[0].name;
    },
    check_number_validity() {
      var phone_num = this.contact_numbers.replace(/[^0-9]/g, "");
      if (this.phone_number_validity.test(phone_num)) {
        return true;
      } else {
        return false;
      }
    },
    contact_select(index) {
      if (index == "all") {
        if (event.target.checked) {
          this.checked_list = this.support_numbers_list;
        } else if (!event.target.checked) {
          this.checked_list = [];
        }
      } else {
        if (event.target.checked == true) {
          let val_index = this.checked_list.indexOf(
            this.support_numbers_list[index]
          );
          var temp = this.support_numbers_list[index];
          if (val_index == -1) {
            this.checked_list.push(temp);
          }
        } else if (event.target.checked == false) {
          var selectall = document.querySelector("#selectall");
          if (selectall.checked == true) {
            selectall.checked = false;
          }
          var temp = this.checked_list.filter(support_numbers_list => {
            return support_numbers_list.support_numbers_list !== index;
          });
          this.checked_list = temp;
        }
      }
    },
  }
};
</script>

<style>
</style>