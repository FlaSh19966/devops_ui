<template>
  <div>
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <div class="dash-cont">
      <div class="container-fluid">
        <div class="card dash-card">
          <div
            class="card-header d-block d-sm-flex flex-wrap justify-content-between"
          >
            <h4 class="mb-sm-0">Define API Endpoints</h4>
            <div class="card-act d-flex flex-wrap">
              <button class="darkblue-btn" @click="train_intent_model">
                Train The Model
              </button>
              <a
                href="#"
                class="darkblue-btn"
                data-toggle="modal"
                data-target="#configapimodal"
                id="add_api_btn"
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
                Add API
              </a>
              <a
                href="javascript:void(0)"
                class="red-btn"
                @click="delete_selected"
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
          </div>
          <div class="card-body">
            <div class="table-box">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col" style="width: 1%">
                        <div class="form-check checkbox checkbox-success">
                          <label class="form-check-label">
                            <input
                              id="selectall"
                              class="form-check-input"
                              @change="selected_list('all')"
                              type="checkbox"
                              value
                              required
                            />
                            <span class="icn"></span>
                          </label>
                        </div>
                      </th>
                      <th scope="col" style="width: 5%">ACTION</th>
                      <th scope="col" style="width: 45%">QUESTIONS</th>
                      <th scope="col" style="width: 15%">INTENT</th>
                      <th scope="col" style="width: 1%">URLS</th>
                      <th scope="col" style="width: 5%">METHOD</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(api, index) in api_list" :key="index">
                      <th scope="row">
                        <div class="form-check checkbox checkbox-success">
                          <label class="form-check-label">
                            <input
                              class="form-check-input"
                              @change="selected_list(index)"
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
                          href="#"
                          @click="edit_api(index)"
                          data-toggle="modal"
                          data-target="#configapimodal"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15.392"
                            height="15.392"
                            viewBox="0 0 15.392 15.392"
                            data-toggle="modal"
                            data-target="#exampleModalCenter"
                          >
                            <path
                              id="square-edit-outline"
                              d="M4.71,3A1.7,1.7,0,0,0,3,4.71V16.682a1.71,1.71,0,0,0,1.71,1.71H16.682a1.71,1.71,0,0,0,1.71-1.71V10.7h-1.71v5.986H4.71V4.71H10.7V3H4.71m10.928.855a.591.591,0,0,0-.41.171L14.185,5.061,16.322,7.2l1.043-1.035a.578.578,0,0,0,0-.812L16.04,4.026a.571.571,0,0,0-.4-.171M13.578,5.668l-6.3,6.311v2.138H9.413l6.3-6.311Z"
                              transform="translate(-3 -3)"
                              fill="#9499ae"
                            />
                          </svg>
                        </a>
                        <a href="#" @click="delete_individual(index)">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="13.682"
                            height="15.392"
                            viewBox="0 0 13.682 15.392"
                          >
                            <path
                              d="M8.276,3v.855H4v1.71h.855V16.682a1.71,1.71,0,0,0,1.71,1.71h8.551a1.71,1.71,0,0,0,1.71-1.71V5.565h.855V3.855H13.406V3H8.276M6.565,5.565h8.551V16.682H6.565V5.565m1.71,1.71v7.7h1.71v-7.7H8.276m3.42,0v7.7h1.71v-7.7Z"
                              transform="translate(-4 -3)"
                              fill="#f23d3d"
                            />
                          </svg>
                        </a>
                      </td>
                      <td>{{ api.question }}</td>
                      <td>{{ api.intent }}</td>

                      <td
                        data-tooltip="tooltip"
                        data-placement="bottom"
                        :title="api.url"
                      >
                        <a href="#">{...}</a>
                      </td>
                      <td>{{ api.method }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="pagin-table">
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
                      :class="'page-item ' + pagination_class(page_number)"
                      v-for="page_number in total_pages"
                      :key="page_number"
                    >
                      <a
                        class="page-link"
                        href="#"
                        @click="page_require(page_number)"
                        >{{ page_number }}</a
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
    </div>
    <div
      class="modal fade dash-modal"
      id="configapimodal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="configapimodaltitle"
      aria-hidden="true"
      data-backdrop="static"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt />
              </div>
              <h3>Define API Endpoints</h3>
            </div>
            <h6 v-show="current_step == 1">Request JSON</h6>
            <h6 v-show="current_step == 2">Request JSON Parameters</h6>
            <h6 v-show="current_step == 3">Response JSON</h6>
            <br />
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              @click="clear_fields"
              aria-label="Close"
            >
              <img src="/static/img/close-icn.png" alt />
            </button>
            <div class="form-group" v-if="current_step == 1">
              <label>Questions</label>
              <input
                id="add_api_question"
                type="text"
                class="form-control"
                v-model="question"
                placeholder="Enter Questions"
              />
            </div>
            <div class="form-group" v-if="current_step == 1">
              <label>Select Intent</label>
              <multiselect
                :disabled="isEdit"
                v-model="intents"
                :searchable="true"
                :close-on-select="true"
                :show-labels="false"
                :options="intentlist"
              >
                <span>{{ intents }}</span>
              </multiselect>
            </div>
            <div class="form-group" v-if="current_step == 1">
              <label>URL</label>
              <input
                type="text"
                class="form-control"
                v-model="url"
                id="add_api_url"
                placeholder="Enter URL Here"
              />
            </div>
            <div class="form-group" v-if="current_step == 1">
              <label>Method</label>
              <div class="radio" style="margin-left: 32%">
                <label>
                  <input
                    type="radio"
                    class="form-control"
                    id="configapi_post"
                    v-model="api_method"
                    value="POST"
                  />
                  <span class="icn" id="configapi_post_icn"></span> POST
                </label>
                <label>
                  <input type="radio" v-model="api_method" value="GET" />
                  <span class="icn"></span> GET
                </label>
              </div>
            </div>
            <div class="form-group" v-if="current_step == 1">
              <label>Request JSON</label>
              <span style="margin-left: 8px">
                <svg
                  data-tooltip="tooltip"
                  data-placement="bottom"
                  title="Help"
                  data-toggle="modal"
                  data-target="#configapimodal4"
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
                id="configapi_req_json"
                :class="'form-control ' + json_request_class"
                placeholder="Request JSON data here..."
                rows="5"
                v-model="show_json_request_data"
              ></textarea>
            </div>
            <div class="form-group" v-if="current_step == 1">
              <label>Request JSON Editable</label>
              <div class="radio" style="margin-left: 32%">
                <label>
                  <input
                    type="radio"
                    class="form-control"
                    v-model="request_json_editable"
                    value="True"
                    id="configapi_true1"
                    @change="change_total_steps"
                  />
                  <span class="icn" id="configapi_true_icn"></span> True
                </label>
                <label>
                  <input
                    type="radio"
                    class="form-control"
                    v-model="request_json_editable"
                    value="False"
                    @change="change_total_steps"
                  />
                  <span class="icn"></span> False
                </label>
              </div>
            </div>
            <div
              class="form-group"
              v-show="request_json_editable == 'True' && current_step == 1"
            >
              <label>Request JSON Parameters</label>
              <textarea
                id="input_from_user_id"
                class="form-control"
                v-model="editable_values"
                placeholder="Mention all the request json parameters here, the values which will be given by the users. Multiple parameters to be separated by ';'"
                rows="5"
              ></textarea>
            </div>
            <div class="form-group" v-if="current_step == 3">
              <label>End User Message</label>
              <div class="radio" style="margin-left: 32%">
                <label>
                  <input
                    type="radio"
                    v-model="enduser_msg_type"
                    :disabled="isEdit"
                    value="Through_API"
                    id="eu_msg_radio"
                  />
                  <span class="icn" id="eu_thru_api"></span> Through API
                </label>
                <label>
                  <input
                    type="radio"
                    v-model="enduser_msg_type"
                    value="Custom"
                  />
                  <span class="icn"></span> Custom
                </label>
              </div>
            </div>
            <div
              class="form-group"
              v-show="enduser_msg_type == 'Through_API' && current_step == 3"
            >
              <label>Response JSON</label>
              <span style="margin-left: 8px">
                <svg
                  data-tooltip="tooltip"
                  data-placement="bottom"
                  title="Help"
                  data-toggle="modal"
                  data-target="#configapimodal2"
                  fill="#273679"
                  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:cc="http://creativecommons.org/ns#"
                  xmlns:dc="http://purl.org/dc/elements/1.1/"
                  height="24"
                  width="24"
                  version="1.1"
                  @click="show_block('up')"
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
                id="configapi_res_json"
                :class="'form-control ' + json_response_class"
                placeholder="Response JSON data here..."
                rows="5"
                v-model="show_json_response_data"
              ></textarea>
            </div>
            <div
              class="form-group"
              v-show="enduser_msg_type == 'Through_API' && current_step == 3"
            >
              <label>Response JSON parameter sent to end user</label>
              <textarea
                class="form-control"
                v-model="successful_message"
                placeholder="Mention the response json parameter here, the value of which will be sent to the user..."
                rows="3"
                id="response_key_json_id"
              ></textarea>
            </div>
            <div
              class="form-group"
              v-show="enduser_msg_type == 'Custom' && current_step == 3"
            >
              <label>Message to end user</label>
              <input
                id="configapi_end_user_msg"
                class="form-control"
                placeholder="Message to end user...type here"
                v-model="end_user_message"
              />
            </div>

            <div
              class="form-group"
              v-show="enduser_msg_type == 'Through_API' && current_step == 3"
            >
              <label>Response JSON Editable</label>
              <div class="radio" style="margin-left: 32%">
                <label>
                  <input
                    type="radio"
                    class="form-control"
                    v-model="response_json_editable"
                    value="True"
                    id="configapi_true2"
                  />
                  <span class="icn" id="configapi_true_icn2"></span> True
                </label>
                <label>
                  <input
                    type="radio"
                    class="form-control"
                    v-model="response_json_editable"
                    value="False"
                  />
                  <span class="icn"></span> False
                </label>
              </div>
            </div>
            <div
              class="form-group"
              v-show="
                response_json_editable == 'True' &&
                enduser_msg_type == 'Through_API' &&
                current_step == 3
              "
            >
              <label>Message With Response JSON Parameter</label>
              <span style="margin-left: 8px">
                <svg
                  data-tooltip="tooltip"
                  data-placement="bottom"
                  title="Help"
                  data-toggle="modal"
                  data-target="#configapimodal_json_editable"
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
                class="form-control"
                v-model="response_key_edit_message"
                placeholder="Please enter the custom message with response json parameter which will sent to enduser"
                rows="3"
                id="msg_reponse_key"
              ></textarea>
            </div>
            <div class="form-group" v-show="current_step == 3">
              <label>Message to User upon API failure</label>
              <textarea
                class="form-control"
                v-model="unsuccessful_message"
                placeholder="Message on API failure...type here"
                rows="3"
                id="api_failure"
              ></textarea>
            </div>
            <!-- <div class="form-group" v-show="current_step==2">
                <label>Task Name</label>
                <input
                  class="form-control"
                  v-model="task_name"
                  placeholder="Enter the task name ..."
                >
            </div>-->
            <div class="row" v-show="current_step == 2">
              <div class="col-md-3">
                <div class="form-group">Input Value</div>
              </div>
              <div class="col-md-9" v-if="api_method == 'POST'">
                Question to be asked by the chatbot
              </div>
              <div class="col-md-9" v-else-if="api_method == 'GET'">
                Select the tags
              </div>
            </div>
            <div
              class="row"
              v-for="(input, index) in task_input_values"
              :key="index"
              v-show="current_step == 2"
            >
              <div class="col-md-3">
                <div class="form-group">{{ input.key_name }}</div>
              </div>
              <div class="col-md-9">
                <div class="row">
                  <div class="col-md-9">
                    <div class="form-group">
                      <input
                        class="form-control"
                        id="subject_input"
                        v-model="task_input_values[index].input_text"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group" v-show="api_method == 'GET'">
                  <select class="form-control" v-model="input.input_text">
                    <option value>Select A Value</option>
                    <option
                      v-for="(value, index) in post_method_request_list"
                      :value="value"
                      :key="index"
                    >
                      {{ value }}
                    </option>
                  </select>
                </div>
              </div>
              <!-- <div class="row" v-show="current_step==2 && api_method=='POST'">
                <div class="col-md-4">
                  <div class="radio" style="margin-left: 32%;">
                    <label>
                      <input
                        type="radio"
                        class="form-control"
                        value="from_entity"
                        v-model="task_from"
                      />
                      <span class="icn"></span> From Entity
                    </label>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <select class="form-control" v-model="input.dropdown_value">
                      <option value>Select a value</option>
                      <option
                        v-for="(value, index) in post_method_request_list"
                        :value="value"
                        :key="index"
                      >{{value}}</option>
                    </select>
                  </div>
                </div>
              </div>-->
            </div>
            <div class="btn-wrap text-right">
              <button
                style="float: left"
                class="darkblue-btn"
                id="previousAPI"
                v-show="current_step > 1"
                @click="change_total_steps(current_step)"
              >
                Previous
              </button>
              <button
                type="button"
                class="btn btn-link"
                id="cancelAPI"
                data-dismiss="modal"
                @click="clear_fields"
              >
                Cancel
              </button>
              <button
                class="darkblue-btn"
                id="nextAPI"
                v-show="
                  current_step != total_steps &&
                  !(current_step == 3 && request_json_editable == 'False')
                "
                @click="add_api(current_step)"
              >
                Next
              </button>
              <button
                class="darkblue-btn"
                id="saveAPI"
                v-show="
                  current_step == total_steps ||
                  (current_step == 3 && request_json_editable == 'False')
                "
                @click="add_api(current_step)"
              >
                Save
              </button>
            </div>
            <div class="text-center">
              <template v-for="dot in total_steps">
                <span :key="dot" :class="dot_class(dot)"></span>&nbsp;
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade dash-modal"
      id="configapimodal2"
      tabindex="-1"
      role="dialog"
      aria-labelledby="configapimodaltitle"
      aria-hidden="true"
      data-backdrop="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body" style="width: fit-content">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt />
              </div>
              <h3>Help</h3>
            </div>
            <div>
              <div>
                <h6 class="hclass6">
                  To show the message as is from the API, it can be configured
                  as follows:
                </h6>
                <label>Response JSON</label>
                <textarea
                  disabled
                  id="configapi_req_json"
                  :class="'form-control ' + json_request_class"
                  placeholder="response"
                  rows="5"
                  v-model="response_json_case_1"
                  style="color: black"
                ></textarea>
              </div>
              <br />
              <div class="form-group">
                <label>Response JSON parameter sent to end user</label>
                <textarea
                  disabled
                  class="form-control"
                  rows="1"
                  style="color: black"
                >
message</textarea
                >
              </div>
              <h6 class="hclass6">
                So in this case, the value of message key would be
                <span style="font-weight: 450"
                  >'Your appointment has been scheduled'</span
                >
              </h6>
              <br />
            </div>
            <br />
            <br />

            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <img src="/static/img/close-icn.png" alt />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade dash-modal"
      id="configapimodal_json_editable"
      tabindex="-1"
      role="dialog"
      aria-labelledby="configapimodaltitle"
      aria-hidden="true"
      data-backdrop="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body" style="width: fit-content">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt />
              </div>
              <h3>Help</h3>
            </div>
            <div>
              <div>
                <h6 class="hclass6">
                  This example show how we can use the various output parameters
                  from the API to modify the user message
                </h6>
                <label>Response JSON</label>
                <textarea
                  disabled
                  id="configapi_req_json"
                  :class="'form-control ' + json_request_class"
                  placeholder="response"
                  rows="6"
                  v-model="response_json_case_11"
                  style="color: black"
                ></textarea>
              </div>
              <br />
              <div class="form-group">
                <label>Response JSON parameter sent to end user</label>
                <textarea
                  disabled
                  class="form-control"
                  rows="1"
                  style="color: black"
                >
count</textarea
                >
              </div>
              <div class="form-group">
                <label>Message With Response JSON Parameter</label>
                <textarea
                  disabled
                  class="form-control"
                  style="color: black"
                  rows="1"
                >
You have {count} appointments</textarea
                >
              </div>

              <br />
              <h6 class="hclass6">
                <span class="noteclass">Note:-</span> The Response sent to end
                user is
                <span style="font-weight: 450">You have 8 appointments</span>
              </h6>
              <br />
            </div>

            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <img src="/static/img/close-icn.png" alt />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade dash-modal"
      id="configapimodal4"
      tabindex="-1"
      role="dialog"
      aria-labelledby="configapimodal4title"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body" style="width: fit-content">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/static/img/msg-blue.png" alt />
              </div>
              <h3>Help</h3>
            </div>
            <div>
              <h6>Example 1:</h6>
              <h6 class="hclass6">
                Below is the json, where the values for companyid, email and
                role are set from the session. The values for subject and
                description are obtained from the user.
              </h6>
              <div>
                <label>Request JSON</label>
                <textarea
                  disabled
                  id="configapi_req_json"
                  :class="'form-control ' + json_request_class"
                  placeholder="Request JSON data here..."
                  rows="7"
                  v-model="request_json_case_1"
                  style="color: black"
                ></textarea>
              </div>

              <br />
              <div>
                <label>Request JSON Editable</label>
                <br />
                <div class="radio" style="padding-left: 15%">
                  <label>
                    <input disabled type="radio" checked />
                    <span class="icn" id="configapi_true_icn"></span> True
                  </label>
                  <label>
                    <input disabled type="radio" />
                    <span class="icn"></span> False
                  </label>
                </div>
              </div>
              <div>
                <label>Request JSON Parameters</label>
                <input
                  disabled
                  class="form-control"
                  v-model="input_from_user_case_1"
                  style="color: black"
                />
              </div>
            </div>
            <br />
            <br />
            <div>
              <h6>Example 2 :</h6>
              <h6 class="hclass6">
                This example shows how we map the parameters from json that we
                need from users. In the below json, if we need the inputs from
                the user for say parameter "nickname". This has to be mapped as
                "user,info,nickname" in the "Request JSON Parameters" field.
              </h6>
              <div>
                <label>Request JSON</label>
                <textarea
                  disabled
                  id="configapi_req_json"
                  :class="'form-control ' + json_request_class"
                  placeholder="Request JSON data here..."
                  rows="23"
                  v-model="request_json_case_2"
                  style="color: black"
                ></textarea>
              </div>
              <br />
              <div>
                <label>Request JSON Editable</label>
                <br />
                <div class="radio" style="padding-left: 15%">
                  <label>
                    <input type="radio" disabled checked />
                    <span class="icn" id="configapi_true_icn"></span> True
                  </label>
                  <label>
                    <input type="radio" disabled />
                    <span class="icn"></span> False
                  </label>
                </div>
              </div>
              <div>
                <label>Request JSON Parameters</label>
                <input
                  disabled
                  class="form-control"
                  v-model="input_from_user_case_2"
                  style="color: black"
                />
              </div>
            </div>
            <div>
              <br />
              <br />
              <div class="input-group">
                <h6>Example 3 :</h6>
                <h6 class="hclass6">
                  Whenever the request json parameters are set from session or
                  cookies or some source and not from the user input, in such
                  cases check "False" at Request JSON Editable
                </h6>
              </div>

              <div>
                <label>Request JSON</label>
                <textarea
                  disabled
                  id="configapi_req_json"
                  :class="'form-control ' + json_request_class"
                  placeholder="Request JSON data here..."
                  rows="5"
                  v-model="request_json_case_3"
                  style="color: black"
                ></textarea>
              </div>
              <br />
              <div>
                <label>Request JSON Editable</label>
                <br />
                <div class="radio" style="padding-left: 15%">
                  <label>
                    <input type="radio" disabled />
                    <span class="icn" id="configapi_true_icn"></span> True
                  </label>
                  <label>
                    <input type="radio" disabled checked />
                    <span class="icn"></span> False
                  </label>
                </div>
              </div>
              <br />
              <!-- <h6 class="hclass6">
                <span class="noteclass">Note:-</span>Chatbot will take all the json keys from session , cookies, etc.
              </h6>-->
            </div>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <img src="/static/img/close-icn.png" alt />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

  <script>
import axios from "axios";
import Swal from "sweetalert2";
import { setTimeout } from "timers";
import api_calls from "@/portal/api_calls";
import Multiselect from "vue-multiselect";

export default {
  name: "config-api",
  components: {
    Multiselect,
  },
  data() {
    return {
      show_or_block: false,
      intentlist: [],
      question: "",
      url: "",
      name: null,
      api_list: [],
      companyname: null,
      companyid: null,
      index: null,
      total_pages: "",
      show_json_request_data: "",
      show_json_response_data: "",
      successful_message: "",
      json_request_data: [],
      json_response_data: [],
      type: null,
      task_from: "",
      entity_list: [],
      post_method_request_list: [],
      post_method_request_value: "",
      api_method: null,
      response_key_edit_message: "",
      enduser_msg_type: null,
      unsuccessful_message: null,
      request_json_editable: null,
      response_json_editable: null,
      end_user_message: null,
      editable_values: "",
      checked_list: [],
      isEdit: false,
      intents: "",
      page_no: 1,
      per_page: 10,
      spinnerOn: false,
      user_role: this.$session.get("UserInformation").role,
      request_json_case_1: `{
          "companyid": "<Company_ID>",
          "email": "<Email>",
          "role": "<Role>",
          "subject": " ",
          "description": " "
}`,

      input_from_user_case_1: "subject;description",
      request_json_case_2: `{
	"user": {
		"companyid": "<Company_ID>",
    "email": "<Email>",
    "role": "<Role>",
		"info": {
			"nickname": ""
		}
	},
	"searchparameter": {
		"status": "",
		"orderby": "",
		"fromdate": "01/01/2018",
		"count": 10,
		"searchtext": "",
		"typeofvisit": "ALL",
		"sortorder": "appointment",
		"startindex": "1",
		"endindex": "10",
		"todate": "08/06/2018"
	}

}`,
      input_from_user_case_2:
        "user,info,nickname;searchparameter,fromdate;searchparameter,todate",
      request_json_case_3: `{ 
          "companyid":"session.get('companyid')",
          "email":"session.get('email')",
          "role":"session.get('role')" 
}`,
      response_json_case_1: `{
  'message':'Your appointment has been scheduled',
  'username':'Cense',
  'email':'user@cense.ai'
}`,
      response_json_case_11: `{
  'message':'API executed successfully',
  'count':'8'
  'username':'Cense',
  'email':'user@cense.ai'
}`,
      current_step: 1,
      total_steps: 2,
      // task_name: "",
      task_input_values: [],
    };
  },
  created() {
    if (
      !this.$session.has("CompanyId") &&
      this.$session.get("UserInformation").role == "SuperAdmin"
    ) {
      toastr.warning("Please select a company name from the dropdown");
    } else if (this.user_role == "SuperAdmin") {
      this.companyid = this.$session.get("CompanyId");
      this.companyname = this.$session.get("CompanyName");
    } else {
      this.companyid = this.$session.get("UserInformation").company_id;
      this.companyname = this.$session.get("UserInformation").company_name;
    }
    axios
      .get(api_calls.get_ner_tags(), {
        params: {
          company_name: this.companyname,
          company_id: this.companyid,
          email: this.$session.get("UserInformation").email,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens,
        },
        headers: {
          Authorization: `Bearer ${this.$session.get("at")}`,
        },
      })
      .then((response) => {
        this.entity_list = response.data;
        this.post_method_request_list = response.data;
      })
      .catch((e) => {
        if (
          e.response.status === 410 ||
          e.response.status === 440 ||
          e.response.status === 409
        ) {
          this.$root.$emit("Session_Expired", e.response.data);
        }
      });
    axios
      .post(
        api_calls.get_list_link(),
        {
          company_name: this.companyname,
          company_id: this.companyid,
          email: this.$session.get("UserInformation").email,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens,
        },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          },
        }
      )
      .then((response) => {
        this.api_list_update(response.data);
      })
      .catch((e) => {
        if (
          e.response.status === 410 ||
          e.response.status === 440 ||
          e.response.status === 409
        ) {
          this.$root.$emit("Session_Expired", e.response.data);
        }
      });
    axios
      .post(
        api_calls.show_intents_url(),
        {
          company_name: this.companyname,
          company_id: this.companyid,
          email: this.$session.get("UserInformation").email,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens,
          subscription: this.$session.get("UserInformation").subscription,
          showintent: "True",
        },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          },
        }
      )
      .then((response) => {
        for (var i in response.data) {
          this.intentlist.push(
            response.data[i].replace(this.companyid + "_", "")
          );
        }
      })
      .catch((e) => {
        if (
          e.response.status === 410 ||
          e.response.status === 440 ||
          e.response.status === 409
        ) {
          this.$root.$emit("Session_Expired", e.response.data);
        }
      });
  },
  mounted() {
    $('[data-tooltip="tooltip"]').tooltip();
    var vm = this;
    $("#selectall").click(function () {
      if ($(this).is(":checked")) {
        $("input:checkbox").prop("checked", true);
      } else {
        vm.checked_list = [];
        $("input:checkbox").prop("checked", false);
      }
    });
    var vm = this;
    $("#configapimodal4").on("shown.bs.modal", function (e) {
      $("#configapimodal").css("opacity", "-0.5");
    });
    $("#configapimodal4").on("hidden.bs.modal", function (e) {
      $("#configapimodal").css("opacity", "1");
    });
    $("#configapimodal2").on("shown.bs.modal", function (e) {
      $("#configapimodal").css("opacity", "-0.5");
    });
    $("#configapimodal2").on("hidden.bs.modal", function (e) {
      $("#configapimodal").css("opacity", "1");
    });
    $("#configapimodal_json_editable").on("shown.bs.modal", function (e) {
      $("#configapimodal").css("opacity", "-0.5");
    });
    $("#configapimodal_json_editable").on("hidden.bs.modal", function (e) {
      $("#configapimodal").css("opacity", "1");
    });
  },
  methods: {
    change_total_steps(step_value) {
      if (event.target.value == "True") {
        this.total_steps = 3;
      } else if (event.target.value == "False") {
        this.total_steps = 2;
      } else if (step_value == 3 && this.request_json_editable == "False") {
        this.current_step = 1;
      } else if (step_value > 1 && this.request_json_editable == "True") {
        this.current_step -= 1;
      }
    },
    req_json() {
      try {
        JSON.parse(this.show_json_request_data);
      } catch (e) {
        return false;
      }
      return true;
    },
    train_intent_model() {
      Swal({
        title: "Are You Sure?",
        text: "You want to Train The Model?",
        type: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Confirm!",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.value) {
          axios
            .post(
              api_calls.train_conversation_models(),
              {
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                subscription: this.$session.get("UserInformation").subscription,
                company_details: {
                  company_name: this.companyname,
                  company_id: this.companyid,
                },
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              if (response.data.MSG_CODE === 4046) {
                toastr.success(response.data.MSG);
              } else if (response.data.MSG_CODE === 1034) {
                toastr.error(response.data.MSG);
              } else {
                toastr.error("Internal Server Error");
              }
            })
            .catch((e) => {
              if (
                e.response.status === 410 ||
                e.response.status === 440 ||
                e.response.status === 409
              ) {
                this.$root.$emit("Session_Expired", e.response.data);
              }
            });
        }
      });
    },
    delete_api(intentlist) {
      event.preventDefault();
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete!!",
      }).then((result) => {
        if (result.value) {
          this.spinnerOn = true;
          axios
            .post(
              api_calls.delete_api_url(),
              {
                company_id: this.companyid,
                company_name: this.companyname,
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                intent_list: intentlist,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.spinnerOn = false;
              if (response.data == "Query Executed Successfully") {
                toastr.success("APIs have been deleted successfully");
                setTimeout(() => {
                  this.$router.go();
                }, 2000);
              }
            })
            .catch((e) => {
              if (
                e.response.status === 410 ||
                e.response.status === 440 ||
                e.response.status === 409
              ) {
                this.$root.$emit("Session_Expired", e.response.data);
              }
            });
        }
      });
    },
    delete_individual(index) {
      let intentlist = [];
      intentlist.push(this.companyid + "_" + this.api_list[index].intent);
      this.delete_api(intentlist);
    },
    delete_selected() {
      let intentlist = [];
      if (this.checked_list.length == 0) {
        Swal.fire({
          title:"No endpoint selected!",
          text:"",
          type:"error",
          timer:2000,
        });
      } else {
        for (var i in this.checked_list) {
          intentlist.push(this.companyid + "_" + this.checked_list[i].intent);
        }
        this.delete_api(intentlist);
      }
    },
    edit_api(index) {
      this.isEdit = true;
      this.question = this.api_list[index].question;
      this.intents = this.api_list[index].intent;
      this.api_method = this.api_list[index].method;
      this.editable_values = this.api_list[index].editable_values;
      this.request_json_editable = this.api_list[index].editable;
      if (this.request_json_editable == "True") {
        this.total_steps = 3;
      }
      this.url = this.api_list[index].url;
      this.show_json_request_data = this.api_list[index].req_json;
      this.show_json_response_data = this.api_list[index].resp_json;
      this.enduser_msg_type = this.api_list[index].message_type;
      this.end_user_message = this.api_list[index].end_user_message;
      this.successful_message = this.api_list[index].response_key;
      this.response_json_editable = this.api_list[index].response_key_editable;
      this.response_key_edit_message = this.api_list[
        index
      ].response_key_message;
      this.unsuccessful_message = this.api_list[
        index
      ].response_key_unsuccessful;
      // this.task_name = this.api_list[index].task_name;
      for (var i in this.api_list[index].tasks_list) {
        this.task_input_values.push({
          key_name: this.api_list[index].tasks_list[i].RawSlotName,
          input_text: this.api_list[index].tasks_list[i].Text,
          dropdown_value: "",
        });
      }
    },
    selected_list(index) {
      if (index == "all") {
        if (event.target.checked == true) this.checked_list = this.c;
        else if (event.target.checked == false) this.checked_list = [];
      } else {
        if (event.target.checked == true) {
          let val_index = this.checked_list.indexOf(this.api_list[index]);
          var temp = this.api_list[index];
          if (val_index == -1) {
            this.checked_list.push(temp);
          }
        } else if (event.target.checked == false) {
          var selectall = document.querySelector("#selectall");
          if (selectall.checked == true) {
            selectall.checked = false;
          }
          var temp = this.checked_list.filter((api_list) => {
            return api_list.api_list !== index;
          });
          this.checked_list = temp;
        }
      }
    },
    add_api(current_step) {
      event.preventDefault();
      if (current_step == 1) {
        if (
          this.question == "" ||
          this.url == "" ||
          this.api_method == null ||
          this.intents == "" ||
          this.request_json_editable == null ||
          (this.request_json_editable == "True" && this.editable_values == "")
        ) {
          toastr.error("Please enter all the required values");
        } else if (this.req_json() == false) {
          toastr.error("Your Request JSON is invalid.");
        } else {
          if (this.request_json_editable == "True" && !this.isEdit) {
            var csv = this.editable_values.split(";");
            var input_value;
            this.task_input_values = [];
            for (var i in csv) {
              let temp_list = csv[i].split(",");
              input_value = temp_list[temp_list.length - 1];
              this.task_input_values.push({
                key_name: input_value,
                input_text: "",
              });
            }
            this.total_steps = 3;
          }
          if (this.request_json_editable == "True") {
            this.current_step += 1;
          } else {
            this.current_step = 3;
          }
        }
      } else if (current_step == 2) {
        let empty_vars = [];
        for (var i in this.task_input_values) {
          if (this.task_input_values[i].input_text == "") {
            empty_vars.push(this.task_input_values[i]);
          }
        }
        if (empty_vars.length == 0) {
          this.current_step += 1;
        } else {
          toastr.error("Please enter all the values.");
        }
      }
      if (current_step == 3) {
        var existing_intent_list = this.api_list.filter((api) => {
          return api.intent == this.intents;
        });
        var post_method_data, get_method_data;
        post_method_data = {};
        if (this.api_method == "POST" && this.task_from == "from_entity") {
          for (var i in this.task_input_values) {
            post_method_data[this.task_input_values[i].key_name] = {
              from_text: true,
              from_entity:
                this.task_input_values[i].dropdown_value != "" ? true : false,
              entity: this.task_input_values[i].dropdown_value,
              intent: this.companyid + "_" + this.api_list[i].intent,
              not_intent: null,
            };
          }
        }
        if (this.api_method == "GET") {
          get_method_data = {};
          for (var i in this.task_input_values) {
            get_method_data[this.task_input_values[i].key_name] = {
              Entity: this.task_input_values[i].input_text,
              Slot: null,
            };
          }
        }
        if (existing_intent_list.length > 0 && !this.isEdit) {
          toastr.error(
            "The intent already exists. Please try with another intent"
          );
        } else if (
          (this.end_user_message != "" ||
            this.enduser_msg_type == "Through_API") &&
          (this.response_json_editable != null ||
            this.enduser_msg_type == "Custom") &&
          this.enduser_msg_type != null &&
          this.successful_message != null &&
          (this.show_json_response_data != "" ||
            this.enduser_msg_type == "Custom")
        ) {
          if (this.$session.get("UserInformation").subscription == "Silver") {
            Swal({
              type: "error",
              text:
                "You're not avail to use this service, due to your subscription plan. Kindly upgrade your plan.",
              timer:3000,            
            }).then((result) => {
              if (result.value) {
                this.$router.go();
              }
            });
          } else {
            this.spinnerOn = true;
            let tasks = {};
            if (
              (this.request_json_editable == "True" &&
                this.task_input_values.length > 0) ||
              this.request_json_editable == "False"
            ) {
              for (var i in this.task_input_values) {
                var temp = [];
                temp.push({
                  Type: "Ask",
                  Text: this.task_input_values[i].input_text,
                });
                tasks[this.task_input_values[i].key_name] = temp;
              }
              axios
                .post(
                  api_calls.add_config_api_url(),
                  {
                    company_name: this.companyname,
                    company_id: this.companyid,
                    question: this.question,
                    request_json_key_mapping: get_method_data,
                    url: this.url,
                    intent: this.companyid + "_" + this.intents,
                    requestjson: this.show_json_request_data,
                    api_method: this.api_method,
                    end_user_message: this.end_user_message,
                    msg_type: this.enduser_msg_type,
                    responsekey: this.successful_message,
                    api_edit: this.request_json_editable,
                    api_editable_value:
                      this.request_json_editable == "True"
                        ? this.editable_values
                        : "",
                    responsejson:
                      this.enduser_msg_type == "Through_API"
                        ? this.show_json_response_data
                        : "",
                    response_msg_editable: this.response_json_editable,
                    response_msg_editable_value:
                      this.response_json_editable == "True"
                        ? this.response_key_edit_message
                        : "",
                    slot_mapping_data: post_method_data,
                    unsuccessful_msg: this.unsuccessful_message,
                    license_key: this.$session.get("UserInformation")
                      .license_key,
                    email: this.$session.get("UserInformation").email,
                    token: this.$session.get("UserInformation").tokens,
                    task_details: tasks,
                    subscription: this.$session.get("UserInformation").subscription,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${this.$session.get("at")}`,
                    },
                  }
                )
                .then((response) => {
                  this.spinnerOn = false;
                  if (response.data.Msg == "Json added") {
                    toastr.success("Your API has been added successfully");
                    setTimeout(() => {
                      this.$router.go();
                    }, 2500);
                  } else if (response.data.Msg == "Json updated") {
                    toastr.success("Your API has been updated successfully");
                    setTimeout(() => {
                      this.$router.go();
                    }, 2500);
                  } else if (response.data.Msg == "Internal Server Error") {
                    Swal({
                      type: "error",
                      text:
                        "There was an internal server error. Please try again.",
                      timer:2500,
                    });
                  } else if (response.data.Msg == "Endpoint limit exceed") {
                    Swal({
                      type: "error",
                      text:
                        "Your Limit has been exceeded, Kindly upgrade your plan",
                      timer:2500,
                    }).then((result) => {
                      if (result.value) {
                        this.$router.go();
                      }
                    });
                  }
                })
                .catch((e) => {
                  if (
                    e.response.status === 410 ||
                    e.response.status === 440 ||
                    e.response.status === 409
                  ) {
                    this.$root.$emit("Session_Expired", e.response.data);
                  }
                });

              // axios
              //   .post(api_calls.task_list_url(), {
              //     company_id: this.companyid,
              //     company_name: this.companyname,
              //     email: this.$session.get("UserInformation").email,
              //     license_key: this.$session.get("UserInformation").license_key,
              //     token: this.$session.get("UserInformation").tokens,
              //     intent: this.intents,
              //     task_details: tasks,
              //     // task_name: this.task_name
              //   }, {
              //   headers: {
              //     Authorization: `Bearer ${this.$session.get("at")}`,
              //   }
              // })
              //   .then(response => {
              //     this.spinnerOn = false;
              //     if (response.data == "Task Added") {
              //       toastr.success("Your task has been added successfully");
              //       $("#configapimodal").modal("hide");
              //       setTimeout(() => {
              //         this.$router.go();
              //       }, 2500);
              //     }
              // })
              //   .catch((e) => {
              //   if (
              //     e.response.status === 410 ||
              //     e.response.status === 440 ||
              //     e.response.status === 409
              //   ) {
              //     this.$root.$emit("Session_Expired", e.response.data);
              //   }
              // });
            } else if (
              this.request_json_editable == "False" &&
              this.task_input_values.length > 0
            ) {
              this.spinnerOn = false;
              var intents = [];
              intents.push(this.companyid + "_" + this.intents);
              if (this.task_input_values.length > 0) {
                axios
                  .delete(
                    api_calls.task_list_url(),
                    {
                      data: {
                        intents: intents,
                        company_name: this.companyname,
                        company_id: this.companyid,
                        email: this.$session.get("UserInformation").email,
                        license_key: this.$session.get("UserInformation")
                          .license_key,
                        token: this.$session.get("UserInformation").tokens,
                        subscription: this.$session.get("UserInformation")
                          .subscription,
                      },
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${this.$session.get("at")}`,
                      },
                    }
                  )
                  .then((response) => {
                    if (response.data == "Task(s) Deleted") {
                      Swal.fire({
                        title:"Deleted!",
                        text:"Your task(s) have been deleted.",
                        type:"success",
                        timer:2000,
                      });
                      setTimeout(() => {
                        this.$router.go();
                      }, 2500);
                    }
                  })
                  .catch((e) => {
                    if (
                      e.response.status === 410 ||
                      e.response.status === 440 ||
                      e.response.status === 409
                    ) {
                      this.$root.$emit("Session_Expired", e.response.data);
                    }
                  });
              }
            } else {
              this.spinnerOn = false;
              setTimeout(() => {
                this.$router.go();
              }, 2500);
            }
          }
        } else {
          toastr.error("Please enter all the required values");
        }
      }
    },
    clear_fields() {
      this.question = "";
      this.intents = "";
      this.api_method = null;
      this.editable_values = "";
      this.request_json_editable = null;
      this.url = "";
      this.show_json_request_data = "";
      this.show_json_response_data = "";
      this.end_user_message = "";
      this.isEdit = false;
      this.enduser_msg_type = null;
      this.response_json_editable = null;
      this.response_key_edit_message = null;
      this.unsuccessful_message = null;
      this.current_step = 1;
      this.total_steps = 2;
      this.task_input_values = [];
      // this.task_name = "";
    },
    api_list_update(message) {
      for (var i in message) {
        this.api_list.push({
          intent: i.replace(this.companyid + "_", ""),
          message: message[i].MSG,
          method: message[i].METHOD,
          req_json: message[i].RequestJson,
          resp_json: message[i].ResponseJson,
          url: message[i].URL,
          editable_values: message[i].ValuesToEdit,
          question: message[i].Question,
          editable: message[i].isEdit,
          message_type: message[i].Msg_type,
          end_user_message: message[i].MessageToEndUser,
          response_key: message[i].ResponseKeyToEndUser,
          response_key_editable: message[i].ResponseKeyEditable,
          response_key_message: message[i].ResponseKeyMessageToEndUser,
          response_key_unsuccessful: message[i].UnSuccessfulMessage,
          task_name: message[i].Tasks != undefined ? message[i].TaskName : "",
          tasks_list:
            message[i].Tasks != undefined ? message[i].Tasks.Utterances : [],
        });
      }
    },
    json_request_class() {
      try {
        JSON.parse(this.json_request_data[this.index]);
      } catch (e) {
        return "is-invalid";
      }
      return "is-valid";
    },
    json_response_class() {
      try {
        JSON.parse(this.json_response_data[this.index]);
      } catch (e) {
        return "is-invalid";
      }
      return "is-valid";
    },
    show_block(value) {
      if (value == "up") {
        this.show_or_block = false;
      } else if (value == "down") {
        this.show_or_block = true;
      }
    },
    dot_class(step) {
      if (
        step == this.current_step ||
        (step == this.total_steps &&
          this.current_step == 3 &&
          this.request_json_editable == "False")
      ) {
        return "dot success";
      } else {
        return "dot";
      }
    },
  },
};
</script>
<style  src="vue-multiselect/dist/vue-multiselect.min.css">
</style>
  <style scoped>
.modal {
  overflow-y: auto;
}
.hclass6 {
  font-weight: 100;
}
.noteclass {
  font-weight: 600;
}
.dot {
  height: 10px;
  width: 10px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
}
.dot.success {
  background-color: #273679;
}
@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(359deg);
  }
}
@-moz-keyframes rotation {
  from {
    -moz-transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(359deg);
  }
}
@-o-keyframes rotation {
  from {
    -o-transform: rotate(0deg);
  }
  to {
    -o-transform: rotate(359deg);
  }
}
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
