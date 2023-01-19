<template>
  <div>
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <div class="dash-cont">
      <div class="container-fluid">
        <div class="card dash-card">
          <div class="card-header d-block d-sm-flex flex-wrap justify-content-between">
            <h4 class="mb-sm-0">Bot Tasks Assignment</h4>
            <div class="card-act d-flex flex-wrap" style="margin-left:-10%">
              <a
                href="#"
                class="darkblue-btn"
                data-toggle="modal"
                data-target="#ticketmodal"
                style="height: 33px;"
                id="add_ticket_btn"
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
                  ></path>
                </svg>
                Add Developer
              </a>
              <!-- <a
                href="#"
                class="red-btn"
                style="height: 34px;"
                v-show="user_role=='SuperAdmin'"
                @click="delete_selected"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                  <path
                    id="trash-can-outline"
                    d="M8.375,3v.778H4V5.333h.875V15.444A1.661,1.661,0,0,0,6.625,17h8.75a1.661,1.661,0,0,0,1.75-1.556V5.333H18V3.778H13.625V3H8.375M6.625,5.333h8.75V15.444H6.625V5.333m1.75,1.556v7h1.75v-7H8.375m3.5,0v7h1.75v-7Z"
                    transform="translate(-4 -3)"
                    fill="#fff"
                  ></path>
                </svg>
                Delete
              </a>-->
            </div>
          </div>
          <div class="card-body">
            <div class="table-box">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">TASK NAME</th>
                      <th scope="col">INTENT</th>
                      <th scope="col">COMPANY NAME</th>
                      <th scope="col" v-show="user_role=='SuperAdmin'">ASSIGNED TO SUPERADMIN</th>
                      <th scope="col">ASSIGNED TO</th>
                      <th scope="col">ESTIMATED DATE</th>
                      <th scope="col">STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(tasks,index) in tasks_array" :key="index">
                      <td @click="taskname_method(index)"><a href="#" data-toggle="modal" data-target="#configapimodal">{{tasks.TaskName}}</a></td>
                      <td>{{tasks.Intent}}</td>
                      <td>{{tasks.CompanyName}}</td>
                      <td  v-show="user_role=='SuperAdmin'">
                        <div class="form-group">
                          <select
                            class="form-control"
                            v-model="selected_user"
                            @change="param_change(index)"
                            id="select_created_by"
                          >
                            <option value>Assigned To</option>
                            <option v-for="(user,index1) in created_by_users" :key="index1">{{user}}</option>
                          </select>
                        </div>
                      </td>
                      <td>{{tasks.AssignedTo}}</td>
                      <td>
                        <div class="form-group date" v-show="user_role=='SuperAdmin'">
                          <input
                            class="form-control date-picker"
                            type="date"
                            @change="param_change(index)"
                            placeholder="Select date"
                            v-model="date_string"
                          >
                        </div>
                        <div v-show="user_role!='SuperAdmin'">{{tasks.ETA}}</div>
                      </td>
                      <td>open</td>
                    </tr>
                  </tbody>
                </table>
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
                <img src="/img/msg-blue.png" alt>
              </div>
              <h3>Define API Endpoints</h3>
            </div>
            <h6 v-show="current_step==1">Request JSON</h6>
            <h6 v-show="current_step==2">Request JSON Parameters</h6>
            <h6 v-show="current_step==3">Response JSON</h6>
            <br>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              @click="clear_fields"
              aria-label="Close"
            >
              <img src="/img/close-icn.png" alt>
            </button>
            <form>
              <div class="form-group" v-if="current_step==1">
                <label>Questions</label>
                <input
                  disabled
                  id="add_api_question"
                  type="text"
                  class="form-control"
                  placeholder="Enter Questions"
                  v-model="api_endpoints_show.Question"
                >
              </div>
              <div class="form-group" v-if="current_step==1">
                <label>Select Intent</label>
                <input disabled
                  type="text"
                  class="form-control"
                  v-model="current_intent"
                >
                <!-- <select class="form-control" :disabled="isEdit">
                  <option>Select Intent</option>
                  <option disabled
                    v-for="(intent, index) in tasks_array_intent"
                    :key="index"
                  >{{intent}}</option>
                </select> -->
              </div>
              <div class="form-group" v-if="current_step==1">
                <label>URL</label>
                <input disabled
                  type="text"
                  class="form-control"
                  v-model="api_endpoints_show.URL"
                >
              </div>
              <div class="form-group" v-if="current_step==1">
                <label>Method</label>
                <div class="radio" style="margin-left: 32%;">
                  <label>
                  <input disabled
                  type="radio"
                  class="form-control"
                  v-model="api_endpoints_show.METHOD"
                >
                  </label>
                  <!-- <label>
                    <input type="radio" v-model="api_method" value="GET">
                    <span class="icn"></span> GET
                  </label> -->
                </div>
              </div>
              <div class="form-group" v-if="current_step==1">
                <label>Request JSON</label>
                <!-- <span style="margin-left: 8px;">
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
                      ></path>
                      <path
                        d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z"
                        transform="translate(0 1028.4)"
                        fill="#273679"
                      ></path>
                      <path
                        d="m12 1035.4c-1.727-0.1-3.4306 1.1-3.8438 2.8-0.0403 0.3-0.0546 0.4-0.1562 1.2h2c-0.0526-1.3 1.306-2.3 2.5-2 1.021 0.3 1.763 1.5 1.406 2.5-0.294 0.6-0.998 1-1.562 1.4-0.577 0.5-1.074 1.1-1.313 1.8-0.039 0.4-0.034 0.8-0.031 1.3h2v-1c0.172-0.7 0.688-1.1 1.25-1.4 0.634-0.3 1.087-0.8 1.406-1.4 0.543-1 0.454-2.2-0.125-3.1-0.705-1.3-2.067-2.2-3.531-2.1zm0 10c-0.552 0-1 0.4-1 1 0 0.5 0.448 1 1 1s1-0.5 1-1c0-0.6-0.448-1-1-1z"
                        fill="#2980b9"
                      ></path>
                      <path
                        d="m12 6c-1.727-0.0274-3.4306 1.1749-3.8438 2.875-0.0403 0.2941-0.0546 0.3281-0.1562 1.125h2c-0.0526-1.2477 1.306-2.289 2.5-1.9375 1.021 0.2374 1.763 1.4281 1.406 2.4375-0.294 0.684-0.998 0.992-1.562 1.406-0.577 0.482-1.074 1.094-1.313 1.813-0.039 0.42-0.034 0.859-0.031 1.281h2v-1c0.172-0.624 0.688-1.042 1.25-1.312 0.634-0.312 1.087-0.835 1.406-1.469 0.543-0.974 0.454-2.1746-0.125-3.094-0.705-1.2699-2.067-2.1438-3.531-2.125zm0 10c-0.552 0-1 0.448-1 1s0.448 1 1 1 1-0.448 1-1-0.448-1-1-1z"
                        transform="translate(0 1028.4)"
                        fill="#ecf0f1"
                      ></path>
                    </g>
                  </svg>
                </span> -->
                <textarea disabled
                class="form-control"
                  id="configapi_req_json"
                  placeholder="Request JSON data here..."
                  rows="5"
                  v-model="api_endpoints_show.RequestJson"
                ></textarea>
              </div>
              <div class="form-group" v-if="current_step==1">
                <label>Request JSON Editable</label>
                <div class="radio" style="margin-left: 32%;">
                  <label>
                    <input disabled
                      type="radio"
                      class="form-control"
                      v-model="request_json_editable"
                       value="True"
                      id="configapi_true1"
                    >
                    <span class="icn" id="configapi_true_icn"></span> True
                  </label>
                  <label>
                    <input disabled
                      type="radio"
                      class="form-control"
                      v-model="request_json_editable"
                       value="False"
                      @change="change_total_steps"
                    >
                    <span class="icn"></span> False
                  </label>
                </div>
              </div>
              <div class="form-group" v-show="request_json_editable=='True' && current_step==1">
                <label>Request JSON Parameters</label>
                <textarea disabled
                  id="input_from_user_id"
                  class="form-control"
                  v-model="api_endpoints_show.ValuesToEdit"
                  placeholder="Mention all the request json parameters here, the values which will be given by the users. Multiple parameters to be separated by ';'"
                  rows="5"
                ></textarea>
              </div>
              <div class="form-group" v-if="current_step==3">
                <label>End User Message</label>
                <div class="radio" style="margin-left: 32%;">
                  <label>
                    <input disabled
                      type="radio"
                      v-model="api_endpoints_show.MessageToEndUser"
                      value="Through_API"
                      id="eu_msg_radio"
                    >
                    <span class="icn" id="eu_thru_api"></span> Through API
                  </label>
                  <label>
                    <input disabled type="radio" v-model="api_endpoints_show.Msg_type" value="Custom">
                    <span class="icn"></span> Custom
                  </label>
                </div>
              </div>
              <div class="form-group" v-show="current_step==3">
                <label>Response JSON</label>
                <!-- <span style="margin-left: 8px;">
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
                      ></path>
                      <path
                        d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z"
                        transform="translate(0 1028.4)"
                        fill="#273679"
                      ></path>
                      <path
                        d="m12 1035.4c-1.727-0.1-3.4306 1.1-3.8438 2.8-0.0403 0.3-0.0546 0.4-0.1562 1.2h2c-0.0526-1.3 1.306-2.3 2.5-2 1.021 0.3 1.763 1.5 1.406 2.5-0.294 0.6-0.998 1-1.562 1.4-0.577 0.5-1.074 1.1-1.313 1.8-0.039 0.4-0.034 0.8-0.031 1.3h2v-1c0.172-0.7 0.688-1.1 1.25-1.4 0.634-0.3 1.087-0.8 1.406-1.4 0.543-1 0.454-2.2-0.125-3.1-0.705-1.3-2.067-2.2-3.531-2.1zm0 10c-0.552 0-1 0.4-1 1 0 0.5 0.448 1 1 1s1-0.5 1-1c0-0.6-0.448-1-1-1z"
                        fill="#2980b9"
                      ></path>
                      <path
                        d="m12 6c-1.727-0.0274-3.4306 1.1749-3.8438 2.875-0.0403 0.2941-0.0546 0.3281-0.1562 1.125h2c-0.0526-1.2477 1.306-2.289 2.5-1.9375 1.021 0.2374 1.763 1.4281 1.406 2.4375-0.294 0.684-0.998 0.992-1.562 1.406-0.577 0.482-1.074 1.094-1.313 1.813-0.039 0.42-0.034 0.859-0.031 1.281h2v-1c0.172-0.624 0.688-1.042 1.25-1.312 0.634-0.312 1.087-0.835 1.406-1.469 0.543-0.974 0.454-2.1746-0.125-3.094-0.705-1.2699-2.067-2.1438-3.531-2.125zm0 10c-0.552 0-1 0.448-1 1s0.448 1 1 1 1-0.448 1-1-0.448-1-1-1z"
                        transform="translate(0 1028.4)"
                        fill="#ecf0f1"
                      ></path>
                    </g>
                  </svg>
                </span> -->
                <textarea disabled
                  id="configapi_res_json"
                  class='form-control'
                  placeholder="Response JSON data here..."
                  rows="5"
                  v-model="api_endpoints_show.ResponseJson"
                ></textarea>
              </div>
              <div class="form-group" v-show="current_step==3">
                <label>Response JSON parameter sent to end user</label>
                <textarea disabled
                  class="form-control"
                  v-model="api_endpoints_show.ResponseKeyToEndUser"
                  placeholder="Mention the response json parameter here, the value of which will be sent to the user..."
                  rows="3"
                  id="response_key_json_id"
                ></textarea>
              </div>
              <div class="form-group" v-show="current_step==3">
                <label>Message to end user</label>
                <input
                  id="configapi_end_user_msg"
                  class="form-control"
                  placeholder="Message to end user...type here"
                  v-model="api_endpoints_show.MessageToEndUser"
                >
              </div>

              <div class="form-group" v-show="current_step==3">
                <label>Response JSON Editable</label>
                <div class="radio" style="margin-left: 32%;">
                  <label>
                    <input
                      type="radio"
                      class="form-control"
                      v-model="api_endpoints_show.ResponseKeyEditable"
                      value="True"
                      id="configapi_true2"
                    >
                    <span class="icn" id="configapi_true_icn2"></span> True
                  </label>
                  <label>
                    <input
                      type="radio"
                      class="form-control"
                      value="False"
                    >
                    <span class="icn"></span> False
                  </label>
                </div>
              </div>
              <div
                class="form-group"
                v-show="current_step==3"
              >
                <label>Message With Response JSON Parameter</label>
                <!-- <span style="margin-left: 8px;">
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
                      ></path>
                      <path
                        d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z"
                        transform="translate(0 1028.4)"
                        fill="#273679"
                      ></path>
                      <path
                        d="m12 1035.4c-1.727-0.1-3.4306 1.1-3.8438 2.8-0.0403 0.3-0.0546 0.4-0.1562 1.2h2c-0.0526-1.3 1.306-2.3 2.5-2 1.021 0.3 1.763 1.5 1.406 2.5-0.294 0.6-0.998 1-1.562 1.4-0.577 0.5-1.074 1.1-1.313 1.8-0.039 0.4-0.034 0.8-0.031 1.3h2v-1c0.172-0.7 0.688-1.1 1.25-1.4 0.634-0.3 1.087-0.8 1.406-1.4 0.543-1 0.454-2.2-0.125-3.1-0.705-1.3-2.067-2.2-3.531-2.1zm0 10c-0.552 0-1 0.4-1 1 0 0.5 0.448 1 1 1s1-0.5 1-1c0-0.6-0.448-1-1-1z"
                        fill="#2980b9"
                      ></path>
                      <path
                        d="m12 6c-1.727-0.0274-3.4306 1.1749-3.8438 2.875-0.0403 0.2941-0.0546 0.3281-0.1562 1.125h2c-0.0526-1.2477 1.306-2.289 2.5-1.9375 1.021 0.2374 1.763 1.4281 1.406 2.4375-0.294 0.684-0.998 0.992-1.562 1.406-0.577 0.482-1.074 1.094-1.313 1.813-0.039 0.42-0.034 0.859-0.031 1.281h2v-1c0.172-0.624 0.688-1.042 1.25-1.312 0.634-0.312 1.087-0.835 1.406-1.469 0.543-0.974 0.454-2.1746-0.125-3.094-0.705-1.2699-2.067-2.1438-3.531-2.125zm0 10c-0.552 0-1 0.448-1 1s0.448 1 1 1 1-0.448 1-1-0.448-1-1-1z"
                        transform="translate(0 1028.4)"
                        fill="#ecf0f1"
                      ></path>
                    </g>
                  </svg>
                </span> -->
                <textarea disabled
                  class="form-control"
                  v-model="api_endpoints_show.ResponseKeyMessageToEndUser"
                  placeholder="Please enter the custom message with response json parameter which will sent to enduser"
                  rows="3"
                  id="msg_reponse_key"
                ></textarea>
              </div>
              <div class="form-group" v-show="current_step==3">
                <label>Message to User upon API failure</label>
                <textarea disabled
                  class="form-control"
                  v-model="api_endpoints_show.UnSuccessfulMessage"
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
              </div> -->
              <div class="row" v-show="current_step==2">
                <div class="col-md-3">
                  <div class="form-group">Input Value</div>
                </div>
                <div class="col-md-9">Question to be asked by the chatbot</div>
              </div>
              <div
                class="row"
                v-for="(input, index) in task_input_values"
                :key="index"
                v-show="current_step==2"
              >
                <div class="col-md-3">
                  <div class="form-group">{{input.key_name}}</div>
                </div>
                <div class="col-md-9">
                  <div class="form-group">
                    <input type="text" class="form-control" id="subject_input" v-model="input.input_text">
                  </div>
                </div>
              </div>
            </form>
            <div class="btn-wrap text-right">
              <button
                style="float:left"
                class="darkblue-btn"
                v-show="current_step>1"
                @click="change_total_steps(current_step)"
              >Previous</button>
              <button
                type="button"
                class="btn btn-link"
                data-dismiss="modal"
                @click="clear_fields"
              >Cancel</button>
              <button
                class="darkblue-btn"
                @click="add_api(current_step)"
              >Next</button>
            </div>
            <div class="text-center">
              <!-- <template v-for="dot in total_steps">
                <span :class="dot_class(dot)"></span>&nbsp;
              </template> -->
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
          <div class="modal-body" style="width: fit-content;">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt>
              </div>
              <h3>Help</h3>
            </div>
            <div>
              <div>
                <h6
                  class="hclass6"
                >To show the message as is from the API, it can be configured as follows:</h6>
                <label>Response JSON</label>
                <textarea
                  disabled
                  id="configapi_req_json"
                  placeholder="response"
                  rows="5"
                  style="color:black"
                ></textarea>
              </div>
              <br>
              <div class="form-group">
                <label>Response JSON parameter sent to end user</label>
                <textarea disabled class="form-control" rows="1" style="color:black">message</textarea>
              </div>
              <h6 class="hclass6">
                So in this case, the value of message key would be
                <span
                  style="font-weight: 450;"
                >'Your appointment has been scheduled'</span>
              </h6>
              <br>
            </div>
            <br>
            <br>

            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <img src="/img/close-icn.png" alt>
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
          <div class="modal-body" style="width: fit-content;">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt>
              </div>
              <h3>Help</h3>
            </div>
            <div>
              <div>
                <h6
                  class="hclass6"
                >This example show how we can use the various output parameters from the API to modify the user message</h6>
                <label>Response JSON</label>
                <textarea
                  disabled
                  id="configapi_req_json"
                  placeholder="response"
                  rows="6"
                  style="color:black"
                ></textarea>
              </div>
              <br>
              <div class="form-group">
                <label>Response JSON parameter sent to end user</label>
                <textarea disabled class="form-control" rows="1" style="color:black">count</textarea>
              </div>
              <div class="form-group">
                <label>Message With Response JSON Parameter</label>
                <textarea disabled class="form-control" style="color:black" rows="1">You have {count} appointments</textarea>
              </div>

              <br>
              <h6 class="hclass6">
                <span class="noteclass">Note:-</span> The Response sent to end user is
                <span
                  style="font-weight:450"
                >You have 8 appointments</span>
              </h6>
              <br>
            </div>

            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <img src="/img/close-icn.png" alt>
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
          <div class="modal-body" style="width: fit-content;">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt>
              </div>
              <h3>Help</h3>
            </div>
            <div>
              <h6>Example 1:</h6>
              <h6 class="hclass6">
                Below is the json, where the values for companyid, email and role are set from the session.
                The values for subject and description are obtained from the user.
              </h6>
              <div>
                <label>Request JSON</label>
                <textarea
                  disabled
                  id="configapi_req_json"
                  placeholder="Request JSON data here..."
                  rows="7"
                  style="color:black"
                ></textarea>
              </div>

              <br>
              <div>
                <label>Request JSON Editable</label>
                <br>
                <div class="radio" style="padding-left: 15%;">
                  <label>
                    <input disabled type="radio" checked>
                    <span class="icn" id="configapi_true_icn"></span> True
                  </label>
                  <label>
                    <input disabled type="radio">
                    <span class="icn"></span> False
                  </label>
                </div>
              </div>
              <div>
                <label>Request JSON Parameters</label>
                <input
                  disabled
                  class="form-control"
                  style="color:black"
                >
              </div>
            </div>
            <br>
            <br>
            <div>
              <h6>Example 2 :</h6>
              <h6 class="hclass6">
                This example shows how we map the parameters from json that we need from users.
                In the below json, if we need the inputs from the user for say parameter "nickname".
                This has to be mapped as "user,info,nickname" in the "Request JSON Parameters" field.
              </h6>
              <div>
                <label>Request JSON</label>
                <textarea
                  disabled
                  id="configapi_req_json"
                  placeholder="Request JSON data here..."
                  rows="23"
                  style="color:black"
                ></textarea>
              </div>
              <br>
              <div>
                <label>Request JSON Editable</label>
                <br>
                <div class="radio" style="padding-left: 15%;">
                  <label>
                    <input type="radio" disabled checked>
                    <span class="icn" id="configapi_true_icn"></span> True
                  </label>
                  <label>
                    <input type="radio" disabled>
                    <span class="icn"></span> False
                  </label>
                </div>
              </div>
              <div>
                <label>Request JSON Parameters</label>
                <input
                  disabled
                  class="form-control"
                  style="color:black"
                >
              </div>
            </div>
            <div>
              <br>
              <br>
              <div class="input-group">
                <h6>Example 3 :</h6>
                <h6
                  class="hclass6"
                >Whenever the request json parameters are set from session or cookies or some source and not from the user input, in such cases check "False" at Request JSON Editable</h6>
              </div>

              <div>
                <label>Request JSON</label>
                <textarea
                  disabled
                  id="configapi_req_json"
                  placeholder="Request JSON data here..."
                  rows="5"
                  style="color:black"
                ></textarea>
              </div>
              <br>
              <div>
                <label>Request JSON Editable</label>
                <br>
                <div class="radio" style="padding-left: 15%;">
                  <label>
                    <input type="radio" disabled>
                    <span class="icn" id="configapi_true_icn"></span> True
                  </label>
                  <label>
                    <input type="radio" disabled checked>
                    <span class="icn"></span> False
                  </label>
                </div>
              </div>
              <br>
              <!-- <h6 class="hclass6">
                <span class="noteclass">Note:-</span>Chatbot will take all the json keys from session , cookies, etc.
              </h6>-->
            </div>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <img src="/img/close-icn.png" alt>
            </button>
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
import $ from "jquery"
import 'jquery-ui/ui/widgets/datepicker.js';
export default {
  data() {
    return {
      user_role: this.$session.get("UserInformation").role,
      spinnerOn: false,
      selected_user: "",
      created_by_users: [],
      tasks_array: [],
      date_string: null,
      tasks_array_intent: [],
      tasks_array_companyname: [],
      tasks_array_taskname: [],
      tasks_array_config: [],
      tasks_array_assignto: [],
      tasks_array_eta: [],
      current_step: 1,
      api_config_var:'',
      api_endpoints_show:[],
      request_json_editable: null,
      current_intent:''
    };
  },
  created() {
    axios
      .post(api_calls.get_users_list(), {
        company_name: this.$session.get("UserInformation").company_name,
        company_id: this.$session.get("UserInformation").company_id,
        email: this.$session.get("UserInformation").email,
        license_key: this.$session.get("UserInformation").license_key,
        token: this.$session.get("UserInformation").tokens,
        role: this.$session.get("UserInformation").role,
        isShow: true
      },
      {
        headers: {
          Authorization: `Bearer ${this.$session.get("at")}`,
        },
      })
      .then(response => {
        this.created_by_users = response.data;
        this.selected_user = "";
      });
    axios
      .post(api_calls.all_task_url(), {
        company_name: this.$session.get("UserInformation").company_name,
        company_id: this.$session.get("UserInformation").company_id,
        email: this.$session.get("UserInformation").email,
        license_key: this.$session.get("UserInformation").license_key,
        token: this.$session.get("UserInformation").tokens
      },{
        headers: {
          Authorization: `Bearer ${this.$session.get("at")}`,
        },
      })
      .then(response => {
        this.tasks_array = response.data.Tasks;
        console.log(this.tasks_array)
        for (var i = 0; i < this.tasks_array.length; i++) {
          this.tasks_array_intent.push(this.tasks_array[i].Intent);
          this.tasks_array_companyname.push(this.tasks_array[i].CompanyName);
          this.tasks_array_taskname.push(this.tasks_array[i].TaskName);
          this.tasks_array_config.push(this.tasks_array[i].API_Configuration);
          this.tasks_array_assignto.push(this.tasks_array[i].AssignedTo);
          this.tasks_array_eta.push(this.tasks_array[i].ETA);
        }
      });
  },
  mounted() {
    var vm = this;
    $(".date-picker").datepicker({
      dateFormat: "dd-mm-yy",
      onClose: (dateText, inst) => {
        console.log(dateText)
        vm.date_string = dateText;
      },
      onSelect: function(dateText, inst) {
        console.log(dateText)
        vm.date_string = dateText;
      }
    });
  },
  methods: {
    param_change(index) {
      axios
        .post(api_calls.assign_task_url(), {
          company_name: this.$session.get("UserInformation").company_name ,
          company_id: this.$session.get("UserInformation").company_id,
          email: this.$session.get("UserInformation").email,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens,
          dev_email: this.selected_user,
          task_name: this.tasks_array_taskname[index],
          intent: this.tasks_array_intent[index],
          eta: this.date_string
        },{
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          }
        })
        .then(response => {
          if(response.data == "Query Executed Successfully"){
            toastr.success("Data changed successfully");
            this.$router.go();
          }
        });
    },
    clear_fields() {
      this.$router.go();
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
      this.response_key_edit_message = null;
      this.unsuccessful_message = null;
      this.current_step = 1;
      // this.task_name = "";
    },
    taskname_method(index) {
   this.api_endpoints_show=this.tasks_array_config[index];
   console.log(this.api_endpoints_show)
   this.current_intent = this.tasks_array_intent[index]
   if(this.api_endpoints_show.isEdit=="False")
   {
     this.request_json_editable='False'
   }
  else{
     this.request_json_editable='True'
  }
    },
    add_api(current_step) {
      event.preventDefault();
      this.current_step += 1;
    },
    change_total_steps(current_step) {
      event.preventDefault();
      this.current_step -= 1;
    },
  }
};
</script>