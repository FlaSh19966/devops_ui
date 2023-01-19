<template>
  <div>
    <div class="spinner" v-show="spinnerOn" id="spinner"></div>
    <div class="dash-cont">
      <div class="container-fluid">
        <div class="card dash-card">
          <div
            class="card-header d-block d-sm-flex flex-wrap justify-content-between"
          >
            <h4 class="mb-sm-0">Tasks</h4>
            <div class="card-act d-flex flex-wrap">
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
                href="#"
                class="darkblue-btn"
                @click="search_product"
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
                @click="add_task()"
                data-toggle="modal"
                data-target="#taskmodal"
                id="task_add_btn"
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
                Add Tasks
              </a>
              <a
                href="javascript:void(0)"
                class="red-btn"
                @click="delete_selected"
                id="delete_task"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                >
                  <path
                    id="trash-can-outline"
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
                      <th scope="col">
                        <div class="form-check checkbox checkbox-success">
                          <label class="form-check-label">
                            <input
                              id="selectall"
                              class="form-check-input"
                              @change="selected_tasks('all')"
                              type="checkbox"
                              value
                              required
                            />
                            <span class="icn"></span>
                          </label>
                        </div>
                      </th>
                      <th scope="col" style="width: 2%">ACTION</th>
                      <th scope="col">TASK NAME</th>
                      <th scope="col">TYPE</th>
                      <th scope="col">INTENT</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(task, index) in task_list" :key="index">
                      <th scope="row">
                        <div class="form-check checkbox checkbox-success">
                          <label class="form-check-label">
                            <input
                              class="form-check-input"
                              @change="selected_tasks(index)"
                              type="checkbox"
                            />
                            <span class="icn"></span>
                          </label>
                        </div>
                      </th>
                      <td class="action">
                        <a
                          class="#"
                          style="cursor: pointer"
                          @click="openpreview(index)"
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
                          @click="delete_single(index)"
                          id="single_delete_task_id"
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
                      <td>{{ task.TaskName }}</td>
                      <td>
                        {{ task.Task_Type }}
                        <!-- <tr
                          v-for="(description, desc_index) in task.Task_Description"
                          :key="desc_index"
                        >
                          <td style="border-color: #fff;width:auto">{{ description.Text }}</td>
                        </tr> -->
                      </td>
                      <td>{{ task.Intent }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                class="modal fade dash-modal"
                id="taskmodal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="intentmodeltitle"
                aria-hidden="true"
                data-backdrop="static"
                data-keyboard="false">
              >
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-body">
                      <div class="modal-head d-flex align-items-center">
                        <div class="head-icn">
                          <img src="/img/msg-blue.png" alt />
                        </div>
                        <h3>Tasks</h3>
                        <!-- <a
                          v-if="!isEdit"
                          style="margin-left: 10px"
                          class="#"
                          @click="edit_modal"
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
                        </a> -->
                      </div>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        @click="clear_fields"
                      >
                        <img src="/img/close-icn.png" alt />
                      </button>
                      <form @submit.prevent="add_edit_tasks">
                        <div class="radio" style="margin-left: 25%">
                          <label>
                            <input
                              :disabled="isEdit || preview"
                              type="radio"
                              v-model="task_type"
                              id="portal_user"
                              value="Default"
                            />
                            <span class="icn" id="portal_user_radio"></span>
                            Questions
                          </label>
                          <label>
                            <input
                              :disabled="isEdit || preview"
                              type="radio"
                              v-model="task_type"
                              value="Email"
                            />
                            <span class="icn" id="bot_user_radio"></span> Email
                          </label>
                          <!-- <label>
                            <input
                              :disabled="isEdit || preview"
                              type="radio"
                              v-model="task_type"
                              value="SMS"
                            />
                            <span class="icn" id="bot_user_radio"></span> SMS
                          </label> -->
                        </div>
                        <div class="form-group">
                          <label>Task Name</label>
                          <input
                            id="task_name_id"
                            class="form-control"
                            type="text"
                            v-model="input_list.task_name"
                            :disabled="isEdit || preview"
                            placeholder="Enter the task name..."
                          />
                        </div>
                        <div class="form-group">
                          <label>Select Intent</label>
                          <multiselect
                            id="select_role_name"
                            @change="intent_selected_api"
                            v-model="input_list.intent"
                            :searchable="true"
                            :close-on-select="true"
                            :show-labels="false"
                            :options="intentlist"
                            :disabled="preview"
                          >
                            <span>{{ input_list.intent }}</span>
                          </multiselect>
                        </div>
                        <div v-if="task_type == 'Email'" class="form-group">
                          <div class="d-flex justify-space-between">
                            <label>Send To:</label>
                            <div
                              style="position: absolute; right: 0px"
                              class="form-check checkbox checkbox-success d-flex"
                            >
                              <label
                                title="User interacting with the bot"
                                class="form-check-label"
                              >
                                <input
                                  class="form-check-input"
                                  :disabled="preview"
                                  type="checkbox"
                                  value="User"
                                  @click="send_msg_to_user"
                                  v-model="email_to_user"
                                />
                                <span class="icn"></span>
                              </label>
                              <div>End User</div>
                              <!-- <label class="checkbox-inline">
                                <input :disabled="preview" type="checkbox" value="Custom" @click="send_msg_to_custom_user" v-model="add_customs_email">Custom
                              </label> -->
                            </div>
                          </div>
                          <div
                            style="margin-bottom: 10px"
                            v-if="add_customs_email"
                          >
                            <input
                              :disabled="preview"
                              class="form-control"
                              v-model="new_custom_email"
                              type="text"
                              placeholder="Add Email"
                              @keydown.tab="add_email('add')"
                            />
                          </div>
                          <div
                            v-if="
                              (add_customs_email && custom_emails.length > 0) ||
                              email_to_user
                            "
                            style="padding-bottom: 0px"
                          >
                            <div
                              v-for="(email, index) in custom_emails"
                              :key="index"
                              class="bootstrap-tagsinput"
                              style="margin-bottom: 10px"
                            >
                              <span class="badge">
                                {{ email }}
                                <span
                                  data-role="remove"
                                  @click="add_email('remove', index)"
                                ></span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div v-if="task_type == 'Email'">
                          Subject
                          <input
                            :disabled="preview"
                            style="margin: 0 0 15px"
                            class="form-control"
                            type="text"
                            v-model="email_title"
                            placeholder="Enter Email Subject here"
                          />
                          Body
                          <span style="margin-left: 8px">
                            <svg
                              class="question-mark"
                              data-tooltip="tooltip"
                              data-placement="bottom"
                              title="Help"
                              data-toggle="modal"
                              data-target="#info_email"
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
                            :disabled="preview"
                            rows="4"
                            cols="50"
                            style="
                              resize: none;
                              overflow-y: auto;
                              margin: 0 0 15px;
                            "
                            class="form-control"
                            type="text"
                            v-model="email_body"
                            placeholder="Enter email body here"
                            @keyup="checkforemailvariables"
                          ></textarea>
                          <div v-if="email_variables.length > 0">
                            Variables:
                            <div
                              v-for="(variable, index) in email_variables"
                              :key="index"
                            >
                              {{ variable.variable_name }}
                              <input
                                :disabled="preview"
                                class="form-control"
                                v-model="
                                  email_variables[index].variable_description
                                "
                                type="text"
                                placeholder="Description"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div v-if="task_type == 'SMS'" class="form-group">
                          <div style="display: flex">
                            <label>Send To:</label>
                            <div
                              style="
                                position: absolute;
                                right: 0px;
                                display: flex;
                              "
                              class="form-check checkbox checkbox-success"
                            >
                              <label
                                title="User interacting with the bot"
                                class="form-check-label"
                              >
                                <input
                                  class="form-check-input"
                                  :disabled="preview"
                                  type="checkbox"
                                  value="User"
                                  @click="send_sms_to_user"
                                  v-model="sms_to_user"
                                />
                                <span class="icn"></span>
                              </label>
                              <div>End User</div>
                              <!-- <label class="checkbox-inline">
                                <input :disabled="preview" type="checkbox" value="Custom" @click="send_sms_to_custom_user" v-model="add_customs_number">Custom
                              </label> -->
                            </div>
                          </div>
                          <div
                            style="margin-bottom: 10px"
                            v-if="add_customs_number"
                          >
                            <input
                              :disabled="preview"
                              class="form-control"
                              v-model="new_custom_number"
                              type="text"
                              placeholder="Add Number"
                              @keyup="add_number('add')"
                            />
                          </div>
                          <div
                            v-if="
                              (add_customs_number &&
                                custom_number.length > 0) ||
                              sms_to_user
                            "
                            style="padding-bottom: 0px"
                          >
                            <div
                              v-if="sms_to_user"
                              class="bootstrap-tagsinput"
                              style="margin-bottom: 10px"
                            >
                              <span class="badge"> User </span>
                            </div>
                            <div
                              v-for="(number, index) in custom_number"
                              :key="index"
                              class="bootstrap-tagsinput"
                              style="margin-bottom: 10px"
                            >
                              <span class="badge">
                                {{ number }}
                                <span
                                  data-role="remove"
                                  @click="add_number('remove', index)"
                                ></span>
                              </span>
                            </div>
                          </div>
                          Body
                          <span style="margin-left: 8px">
                            <svg
                              class="question-mark"
                              data-tooltip="tooltip"
                              data-placement="bottom"
                              title="Help"
                              data-toggle="modal"
                              data-target="#info_email"
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
                            :disabled="preview"
                            rows="4"
                            cols="50"
                            style="
                              resize: none;
                              overflow-y: auto;
                              margin: 0 0 15px;
                            "
                            class="form-control"
                            type="text"
                            v-model="sms_body"
                            placeholder="Enter sms message here"
                            @keyup="checkforsmsvariables"
                          ></textarea>
                          <div v-if="sms_varibles.length > 0">
                            Variables:
                            <div
                              v-for="(variable, index) in sms_varibles"
                              :key="index"
                            >
                              {{ variable.variable_name }}
                              <input
                                :disabled="preview"
                                class="form-control"
                                v-model="
                                  sms_varibles[index].variable_description
                                "
                                type="text"
                                placeholder="Description"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div class="row"></div>
                        <br />
                        <div v-if="task_type == 'Default'" class="form-group">
                          <label>Questions to be asked to the user</label>
                          <br />
                          <br />Question Number 1
                          <input
                            :disabled="preview"
                            class="form-control"
                            type="text"
                            placeholder="Enter the Question..."
                            v-model="input_list.question"
                          />
                        </div>
                        <div v-if="task_type == 'Default'">
                          <div
                            class="form-group"
                            v-for="(question, index) in questions_list"
                            :key="index"
                          >
                            Question Number {{ index + 2 }}
                            <span
                              style="float: right; cursor: pointer"
                              @click="add_question('remove', index)"
                            >
                              <i style="font-size: 16px" class="fa">&#xf00d;</i>
                            </span>
                            <input
                              :disabled="preview"
                              class="form-control"
                              type="text"
                              v-model.trim="question.Text"
                              placeholder="Enter the Question..."
                            />
                          </div>
                        </div>

                        <div
                          v-if="task_type == 'Default'"
                          class="form-group"
                          style="float: left"
                        >
                          <a
                            href="#"
                            class="darkblue-btn"
                            style="padding: 5px 10px"
                            @click="add_question('add')"
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
                            Add Question
                          </a>
                        </div>
                        <br />
                        <!-- <div class="row" v-for="(input, index) in input_list.fields" :key="index">
                          <div class="col-md-3">
                            <div class="form-group">{{input.title}}</div>
                          </div>
                          <div class="col-md-9">
                            <div class="form-group">
                              <input type="text" class="form-control" v-model="input.value">
                            </div>
                          </div>
                        </div>-->
                        <div class="btn-wrap text-right">
                          <button
                            type="button"
                            @click="clear_fields"
                            class="btn btn-link"
                            data-dismiss="modal"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            id="add_task_save"
                            class="darkblue-btn"
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
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
                      :class="{
                        'page-item active': pageno === page_no,
                        'page-item': pageno !== page_no,
                      }"
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
                      <!-- <a class="page-link" href="#" @click="page_require(pageno)">{{pageno}}</a> -->
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
                id="info_email"
                tabindex="-1"
                role="dialog"
                aria-labelledby="configapimodaltitle"
                aria-hidden="true"
                data-backdrop="true"
              >
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div
                    class="modal-content"
                    style="width: 220%; margin-left: -35%"
                  >
                    <div class="modal-body" style="width: 1000px">
                      <div class="modal-head d-flex align-items-center">
                        <div class="head-icn">
                          <img src="/img/msg-blue.png" alt />
                        </div>
                        <h3>Help</h3>
                      </div>
                      <div>
                        <h6>
                          If you want to add variables you can add them using
                          the following syntax
                          {{ variable }} in the email body.
                        </h6>
                      </div>
                      <div>
                        <div>
                          <br />
                          <label
                            >For Example, If you want to use the user's name in
                            the email you can write it in the following
                            manner:</label
                          >
                          <textarea
                            disabled
                            id="configapi_req_json"
                            class="form-control"
                            placeholder="response"
                            rows="10"
                            style="color: black"
                            v-model="body_content"
                          ></textarea>
                        </div>
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
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { setTimeout } from "timers";
import api_calls from "@/portal/api_calls";
import Multiselect from "vue-multiselect";
import { tsObjectKeyword } from "@babel/types";
import { freeze_portal,show_subscription_expired_swal } from "@/portal/mixins";

export default {
  name: "AddTaskPage",
  mixins: [
    freeze_portal,
    show_subscription_expired_swal,
  ],
  components: {
    Multiselect,
  },
  data() {
    return {
      input_list: {
        task_name: "",
        intent: "",
        fields: [],
        question: "",
        question_id: "",
      },
      total_pages: 1,
      per_page: 10,
      page_no: 1,
      question_text: false,
      question_entered: "",
      intentlist: [],
      task_list: [],
      original_intent_list: [],
      checked_list: [],
      isEdit: false,
      questions_list: [],
      // harsh
      search_name: "",
      page_array: [],
      task_type: "Default",
      task_types: ["Email", "SMS", "Default"],
      email_to_user: true,
      add_customs_email: true,
      new_custom_email: null,
      custom_emails: [],
      email_title: null,
      email_body: null,
      email_variables: [],
      sms_to_user: true,
      add_customs_number: true,
      new_custom_number: null,
      custom_number: [],
      sms_body: null,
      sms_varibles: [],
      selected_task: null,
      spinnerOn: false,
      isVisibleSearchClear: false,
      disable_btn_expired:false,
      // ----
      companyid:
        this.$session.get("UserInformation").role == "SuperAdmin"
          ? this.$session.get("CompanyId")
          : this.$session.get("UserInformation").company_id,
      companyname:
        this.$session.get("UserInformation").role == "SuperAdmin"
          ? this.$session.get("CompanyName")
          : this.$session.get("UserInformation").company_name,
      variable: "{{name}}",
      preview: false,
      delete_task_ids: [],
      body_content: `Hi {{name}},
        You are receiving this email because you (or someone else) have requested to reset the password of {{name}} account.
        Please click on the following link, or paste this into your browser to complete the process:
        https://cense.ai/change-password
        If you did not request this, please ignore this email and your password will remain unchanged.

        Regards,
        Admin`,
    };
  },
  created() {
    this.load_task();
  },
  mounted() {
    setTimeout(() => {
      this.freeze_portal();
    }, 1000);
    this.$root.$on("NerTrainingPageDisabled", (data) =>{
      if(data===true){
        this.disable_btn_expired = true;
      }
    })
    var vm = this;
    $("#taskmodal").on("hidden.bs.modal", function (e) {
      vm.clear_fields();
    });
    $("#selectall").click(function () {
      if ($(this).is(":checked")) {
        // $('div:input').prop('checked',true);
        $("input:checkbox").prop("checked", true);
      } else {
        vm.checked_list = [];
        $("input:checkbox").prop("checked", false);
      }
    });
  },
  watch: {
    search_name() {
      if (this.search_name === "") {
        this.load_task();
        this.isVisibleSearchClear = false;
      } else if (this.search_name !== "") {
        this.isVisibleSearchClear = true;
      }
    },
  },
  methods: {
    add_task(){
      if(!this.disable_btn_expired){
        $("#taskmodal").modal('show')
      } else {
        this.show_subscription_expired_swal();
      }
    },
    clear_search_name() {
      this.search_name = "";
    },
    load_task() {
      if (
        !this.$session.has("CompanyId") &&
        this.$session.get("UserInformation").role == "SuperAdmin"
      ) {
        toastr.warning("Please select a company name from the dropdown");
      } else {
        this.companyid = this.$session.get("UserInformation").company_id;
        this.companyname = this.$session.get("UserInformation").company_name;
      }
      axios
        .post(
          api_calls.show_intent_url(),
          {
            company_id: this.companyid,
            company_name: this.companyname,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            get_intents: true,
            showintent: "True",
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          // for (var i in response.data) {
          //   this.intentlist.push(
          //     response.data[i].replace(this.companyid + "_", "")
          //   );
          // }
          for (var i in response.data) {
            this.intentlist.push(
              response.data[i]
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
      axios
        .post(
          api_calls.open_form_tasks(),
          {
            company_id: this.companyid,
            company_name: this.companyname,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            isShow: true,
            per_page: this.per_page,
            page_no: this.page_no,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          // console.log("MAiN LIST", response.data.TasksList);
          this.task_list = [];
          for (var i in response.data.TasksList) {
            if (response.data.TasksList[i].TaskType == "default") {
              let desc = [];
              for (var j in response.data.TasksList[i].Utterances) {
                desc.push({
                  QuestionId: response.data.TasksList[i].Utterances[j].SlotName,
                  Text: response.data.TasksList[i].Utterances[j].Text,
                });
              }
              if (desc.length != 0) {
                this.task_list.push({
                  Intent: response.data.TasksList[i].Intent,
                  TaskName: response.data.TasksList[i].TaskName,
                  Task_Description: desc,
                  Task_Id: response.data.TasksList[i].TaskID,
                  Task_Type: response.data.TasksList[i].TaskType,
                });
              }
            } else if (response.data.TasksList[i].TaskType == "Email") {
              this.task_list.push({
                Intent: "None",
                // Intent: response.data.TasksList[i].Intent,
                TaskName: response.data.TasksList[i].TaskName,
                Task_Description: response.data.TasksList[i].TaskDetails,
                Task_Id: response.data.TasksList[i].TaskID,
                Task_Type: response.data.TasksList[i].TaskType,
              });
            } else if (response.data.TasksList[i].TaskType == "SMS") {
              this.task_list.push({
                Intent: "None",
                // Intent: response.data.TasksList[i].Intent,
                TaskName: response.data.TasksList[i].TaskName,
                Task_Description: response.data.TasksList[i].TaskDetails,
                Task_Id: response.data.TasksList[i].TaskID,
                Task_Type: response.data.TasksList[i].TaskType,
              });
            } else if (response.data.TasksList[i]) {
              let desc = [];
              for (var j in response.data.TasksList[i].Utterances) {
                desc.push({
                  QuestionId: response.data.TasksList[i].Utterances[j].SlotName,
                  Text: response.data.TasksList[i].Utterances[j].Text,
                });
              }
              if (desc.length != 0) {
                this.task_list.push({
                  Intent: response.data.TasksList[i].Intent,
                  TaskName: response.data.TasksList[i].TaskName,
                  Task_Description: desc,
                  Task_Id: response.data.TasksList[i].TaskID,
                  Task_Type: response.data.TasksList[i].TaskType,
                });
                // console.log("task id");
                // console.log(response.data.TasksList[i].TaskID)
              }
            }
          }
          this.original_intent_list = this.task_list;
          // console.log(this.original_intent_list);
          // for (var i in response.data.TasksList) {
          //   let desc = [];
          //   for (var j in response.data.TasksList[i].Utterances) {
          //     desc.push({
          //       Text: response.data.TasksList[i].Utterances[j].Text
          //     });
          //   }
          //   if (desc.length != 0) {
          //     this.task_list.push({
          //       Intent: response.data.TasksList[i].Intent,
          //       TaskName: response.data.TasksList[i].TaskName,
          //       Task_Description: desc,
          //       Task_Id: response.data.TasksList[i].TaskID,
          //       Task_Type: response.data.TasksList[i].TaskType,
          //     });
          //   }
          // }
          this.total_pages = response.data.pagecount;
          this.setpagination(this.page_no);
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
    add_question(type, index) {
      if (type == "add") {
        if (this.isEdit == true){
          var count = this.questions_list.length + 2;          
          this.questions_list.push({
          Text: "",
          QuestionId: "Question_Number_" + count + "_" + new Date().getTime() ,
        });
          count = count + 1;
        }
        else {
        this.questions_list.push({
          Text: "",
        });
        }
      } else if (type == "remove") {
        this.questions_list.splice(index, 1);
      }
    },
    add_email(type, index) {
      if (type == "add") {
        this.custom_emails.push(this.new_custom_email);
        this.new_custom_email = null;
      } else if (type == "remove") {
        this.custom_emails.splice(index, 1);
      }
    },
    add_number(type, index) {
      if (type == "add" && event.keyCode === 13) {
        this.custom_number.push(this.new_custom_number);
        this.new_custom_number = null;
      } else if (type == "remove") {
        this.custom_number.splice(index, 1);
      }
    },
    intent_selected_api() {},
    edit_modal() {
      event.preventDefault();
      var index = this.selected_task;
      this.isEdit = true;
      this.preview = false;
      // this.task_type = Boolean(this.task_list[index].Task_Type)
      //   ? this.task_list[index].Task_Type
      //   : "Default"
      // this.input_list.intent = this.task_list[index].Intent;
      // this.input_list.task_name = this.task_list[index].TaskName;
      // this.input_list.question = this.task_list[index].Task_Description[0].Text;
      // this.task_list[index].Task_Description.splice(0, 1);
      // for (var j in this.task_list[index].Task_Description) {
      //   this.questions_list.push(this.task_list[index].Task_Description[j]);
      // }
    },
    selected_tasks(index) {
      if (index == "all") {
        if (event.target.checked) {
          this.checked_list = this.task_list;
        } else if (!event.target.checked) {
          this.checked_list = [];
        }
      } else {
        if (event.target.checked == true) {
          this.checked_list.push(index);
        } else if (event.target.checked == false) {
          let val_index = this.checked_list.indexOf(index);
          this.checked_list.splice(val_index, 1);
        }
      }
    },
    add_edit_tasks() {
      if (this.task_type == "Default") {
        var empty_questions = this.questions_list.filter((question) => {
          return question.Text == "";
        });
        if (
          this.empty_fields_check() &&
          (this.questions_list.length == 0 || empty_questions.length == 0)
        ) {
          // this.input_list.fields.push({
          //   Text: this.input_list.question
          // });
          // for (var i in this.questions_list) {
          //   this.input_list.fields.push(this.questions_list[i]);
          // }
          if (this.isEdit == true) {
            var edit_object = {};
            var edit_slot_mapping_data = {};
            let i = 1;
            var taskquestion = [];
            taskquestion.push({
              Type: "Ask",
              Text: this.input_list.question,
            });
            edit_object[this.input_list.question_id] =
              taskquestion[0];
            edit_slot_mapping_data[this.input_list.question_id] = {
              from_text: true,
              from_entity: false,
              intent: true,
              not_intent: false,
            };
            for (i = 2; i < this.questions_list.length + 2; i++) {
              taskquestion.push({
                Type: "Ask",
                Text: this.questions_list[i - 2].Text,
              });
              edit_object[this.questions_list[i-2].QuestionId] =
                taskquestion[i - 1];
              edit_slot_mapping_data[this.questions_list[i-2].QuestionId] = {
                from_text: true,
                from_entity: false,
                intent: true,
                not_intent: false,
              };
            }
            // console.log("This is the EDIT object", edit_object);
            axios
              .put(
                api_calls.task_list_url(),
                {
                  company_id: this.companyid,
                  company_name: this.companyname,
                  email: this.$session.get("UserInformation").email,
                  license_key: this.$session.get("UserInformation").license_key,
                  token: this.$session.get("UserInformation").tokens,
                  intent: this.input_list.intent,
                  task_details: edit_object,
                  task_id: this.task_list[this.selected_task].Task_Id,
                  task_type: "Default",
                  // task_details: this.input_list.fields
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.$session.get("at")}`,
                  },
                }
              )
              .then((response) => {
                if (response.data == "Task Edit") {
                  Swal({
                    text:
                      "The saved changes would be reflected once the model is trained.",
                    showConfirmButton: true,
                    timer: 3000,
                  }).then((result) => {
                    if (result.value) {
                      this.load_task();
                    }
                  });
                } else if (response.data == "Internal Server Error") {
                  toastr.error("Internal Server Error");
                }
                $("#taskmodal").modal("hide");
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
          } else if (this.isEdit == false) {
            var object = {};
        var slot_mapping_data = {};
            let i = 1;
          var taskquestion = [];
          taskquestion.push({
            Type: "Ask",
            Text: this.input_list.question,
          });
          var unique_key = new Date().getTime() ;
          object["Question_Number_1" + "_" + unique_key] = taskquestion[0];
          slot_mapping_data["Question_Number_1" + "_" + unique_key] = {
            from_text: true,
            from_entity: false,
            intent: true,
            not_intent: false,
          };
          for (i = 2; i < this.questions_list.length + 2; i++) {
            taskquestion.push({
              Type: "Ask",
              Text: this.questions_list[i - 2].Text,
            });
            var unique_key_2 = new Date().getTime() ; 
            object["Question_Number_" + i + "_" + unique_key_2] =
              taskquestion[i - 1];
            slot_mapping_data["Question_Number_" + i + "_" + unique_key_2] = {
              from_text: true,
              from_entity: false,
              intent: true,
              not_intent: false,
            };
          }
          // console.log("This is the object", object);
            axios
              .post(
                api_calls.task_list_url(),
                {
                  company_id: this.companyid,
                  company_name: this.companyname,
                  email: this.$session.get("UserInformation").email,
                  license_key: this.$session.get("UserInformation").license_key,
                  token: this.$session.get("UserInformation").tokens,
                  intent: this.input_list.intent,
                  task_details: object,
                  // task_details: this.input_list.fields,
                  slot_mapping_data: slot_mapping_data,
                  task_name: this.input_list.task_name,
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.$session.get("at")}`,
                  },
                }
              )
              .then((response) => {
                if (response.data == "Task Added") {
                  toastr.success("Your task has been added successfully");
                  $("#taskmodal").modal("hide");
                  setTimeout(() => {
                    // this.$router.go();
                    this.load_task();
                  }, 2500);
                } else if (response.data == "Internal Server Error") {
                  toastr.error("Internal Server Error");
                }
                $("#taskmodal").modal("hide");
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
          toastr.error("Please enter all the required fields.");
        }
      } else if (this.task_type == "Email") {
        var object = {};
        var allok = true;
        if (
          this.email_title == null ||
          this.email_title == "" ||
          this.email_body == null ||
          this.email_body == ""
        ) {
          allok = false;
        }
        // if(this.add_customs_email&&this.custom_emails.length==0){
        //   allok = false;
        // }
        if (this.input_list.task_name == "") {
          allok = false;
        }
        if (this.email_variables.length > 0) {
          for (let i = 0; i < this.email_variables.length; i++) {
            if (
              this.email_variables[i].variable_description == "" ||
              this.email_variables[i].variable_description == null ||
              this.email_variables[i].variable_description == " "
            ) {
              allok = false;
            }
          }
        }
        if (allok) {
          object["subject"] = this.email_title;
          object["body"] = this.email_body;
          object["user_email"] = this.email_to_user;
          object["custom_emails"] = this.custom_emails;
          object["email_variables"] = this.email_variables;

          if (this.isEdit == false) {
            axios
              .post(
                api_calls.open_form_tasks(),
                {
                  company_id: this.companyid,
                  company_name: this.companyname,
                  email: this.$session.get("UserInformation").email,
                  license_key: this.$session.get("UserInformation").license_key,
                  token: this.$session.get("UserInformation").tokens,
                  intent: this.input_list.intent,
                  task_name: this.input_list.task_name,
                  task_type: "Email",
                  task_details: object,
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.$session.get("at")}`,
                  },
                }
              )
              .then((response) => {
                if ((response.data = "Task Added")) {
                  toastr.success("Your task has been added successfully");
                  $("#taskmodal").modal("hide");
                  setTimeout(() => {
                    // this.$router.go();
                    this.load_task();
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
          } else if (this.isEdit == true) {
            axios
              .put(
                api_calls.open_form_tasks(),
                {
                  company_id: this.companyid,
                  company_name: this.companyname,
                  email: this.$session.get("UserInformation").email,
                  license_key: this.$session.get("UserInformation").license_key,
                  token: this.$session.get("UserInformation").tokens,
                  intent: this.input_list.intent,
                  task_name: this.input_list.task_name,
                  task_type: "Email",
                  task_details: object,
                  task_id: this.task_list[this.selected_task].Task_Id,
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.$session.get("at")}`,
                  },
                }
              )
              .then((response) => {
                if ((response.data = "Task Edit")) {
                  toastr.success("Your task has been edited successfully");
                  $("#taskmodal").modal("hide");
                  setTimeout(() => {
                    // this.$router.go();
                    this.load_task();
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
          toastr.error("Please enter all the required fields.");
        }
      } else if (this.task_type == "SMS") {
        var object = {};
        var allok = true;
        if (this.sms_body == null || this.sms_body == "") {
          allok = false;
        }
        // if(this.add_customs_number&&this.custom_number.length==0){
        //   allok = false;
        // }
        if (this.input_list.task_name == "") {
          allok = false;
        }
        if (this.sms_varibles.length > 0) {
          for (let i = 0; i < this.sms_varibles.length; i++) {
            if (
              this.sms_varibles[i].variable_description == "" ||
              this.sms_varibles[i].variable_description == null ||
              this.sms_varibles[i].variable_description == " "
            ) {
              allok = false;
            }
          }
        }
        if (allok) {
          object["body"] = this.sms_body;
          object["user_number"] = this.sms_to_user;
          object["custom_numbers"] = this.custom_number;
          object["sms_variables"] = this.sms_varibles;

          if (this.isEdit == false) {
            axios
              .post(
                api_calls.open_form_tasks(),
                {
                  company_id: this.companyid,
                  company_name: this.companyname,
                  email: this.$session.get("UserInformation").email,
                  license_key: this.$session.get("UserInformation").license_key,
                  token: this.$session.get("UserInformation").tokens,
                  task_name: this.input_list.task_name,
                  task_type: "SMS",
                  task_details: object,
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.$session.get("at")}`,
                  },
                }
              )
              .then((response) => {
                if ((response.data = "Task Added")) {
                  toastr.success("Your task has been added successfully");
                  $("#taskmodal").modal("hide");
                  setTimeout(() => {
                    // this.$router.go();
                    this.load_task();
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
          } else if (this.isEdit == true) {
            axios
              .put(
                api_calls.open_form_tasks(),
                {
                  company_id: this.companyid,
                  company_name: this.companyname,
                  email: this.$session.get("UserInformation").email,
                  license_key: this.$session.get("UserInformation").license_key,
                  token: this.$session.get("UserInformation").tokens,
                  task_name: this.input_list.task_name,
                  task_type: "SMS",
                  task_details: object,
                  task_id: this.task_list[this.selected_task].Task_Id,
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.$session.get("at")}`,
                  },
                }
              )
              .then((response) => {
                if ((response.data = "Task Edit")) {
                  toastr.success("Your task has been edited successfully");
                  $("#taskmodal").modal("hide");
                  setTimeout(() => {
                    // this.$router.go();
                    this.load_task();
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
        }
      }
    },
    delete_selected() {
      if (this.checked_list.length == 0) {
        Swal.fire({
          title: "No task selected!",
          text: "",
          type: "error",
          timer: 2000,
        });
      } else {
        this.delete_task_ids = [];
        for (let i = 0; i < this.checked_list.length; i++) {
          // console.log('delete task');
          // console.log(i.Task_Id);
          this.delete_task_ids.push(
            this.task_list[this.checked_list[i]].Task_Id
          );
        }
        // console.log(this.delete_task_ids);
        this.delete_tasks_api();
        // let questionlist = [],delete_task_ids
        //   responselist = [],
        //   intentlist = [],
        //   sourcelist = [];
        // for (var i in this.checked_list) {
        //   questionlist.push(this.checked_list[i].question);
        //   responselist.push(this.checked_list[i].response);
        //   sourcelist.push(this.checked_list[i].source);
        //   intentlist.push(this.checked_list[i].intent);
        // }
        // this.delete_tasks_api(questionlist, responselist, sourcelist, intentlist);
      }
    },
    delete_single(index) {
      // let intents = [];
      // intents.push(this.task_list[index].Intent);
      // console.log(index);
      this.delete_task_ids = [];
      this.delete_task_ids.push(this.task_list[index].Task_Id);
      // console.log(this.delete_task_ids);
      this.delete_tasks_api();
      // console.log("delete single")
      // console.log(this.task_list[index].Task_Id)
    },
    delete_tasks_api() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          this.spinnerOn = true;
          axios
            .delete(
              api_calls.open_form_tasks(),
              {
                params: {
                  company_id: this.$session.get("UserInformation").company_id,
                  company_name: this.$session.get("UserInformation")
                    .company_name,
                  license_key: this.$session.get("UserInformation").license_key,
                  email: this.$session.get("UserInformation").email,
                  token: this.$session.get("UserInformation").tokens,
                  task_ids: this.delete_task_ids,
                },
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.spinnerOn = false;
              if (response.data.status == "Failure") {
                toastr.error("Failed to delete task.");
              } else if (response.data.status == "Success") {
                toastr.success("Task was deleted successfully");
                setTimeout(() => {
                  // this.$router.go();
                  this.load_task();
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
          // axios
          //   .delete(api_calls.task_list_url(), {
          //     data: {
          //       intents: intents,
          //       company_name: this.companyname,
          //       company_id: this.companyid,
          //       email: this.$session.get("UserInformation").email,
          //       license_key: this.$session.get("UserInformation").license_key,
          //       token: this.$session.get("UserInformation").tokens,
          //       subscription: this.$session.get("UserInformation").subscription
          //     }
          //   }, {
          //   headers: {
          //     Authorization: `Bearer ${this.$session.get("at")}`,
          //   },
          // })
          //   .then(response => {
          //     if (response.data == "Task(s) Deleted") {
          //       Swal.fire(
          //         "Deleted!",
          //         "Your task(s) have been deleted.",
          //         "success"
          //       );
          //       setTimeout(() => {
          //         this.$router.go();
          //       }, 2500);
          //     }
          //   })
          // .catch((e) => {
          //     if (
          //       e.response.status === 410 ||
          //       e.response.status === 440 ||
          //       e.response.status === 409
          //     ) {
          //       this.$root.$emit("Session_Expired", e.response.data);
          //     }
          //   });
        }
      });
    },
    empty_fields_check() {
      if (
        this.input_list.intent == "" ||
        this.input_list.task_name == "" ||
        this.input_list.question == ""
      ) {
        toastr.error("Please enter all the fields");
        return false;
      } else {
        return true;
        // for (var i in this.input_list.fields) {
        //   if (
        //     this.input_list.task_name == "" ||
        //     this.input_list.intent == "" ||
        //     this.input_list.question == ""
        //   ) {
        //     toastr.error("Please enter all the fields");
        //     return false;
        //   } else if (this.input_list.fields[i].value == "") {
        //     toastr.error("Please enter all the fields");
        //     return false;
        //   } else if (
        //     i == this.input_list.fields.length - 1 &&
        //     this.input_list.fields[i].value != ""
        //   ) {
        //     return true;
        //   }
        // }
      }
    },
    clear_fields() {
      this.input_list.intent = "";
      this.input_list.task_name = "";
      this.input_list.fields = [];
      this.input_list.question = "";
      this.questions_list = [];
      this.isEdit = false;
      this.preview = false;
      this.question_text = false;
      this.task_list[this.selected_task] = this.original_intent_list[
        this.selected_task
      ];
    },
    callsearch() {
      if (event.keyCode === 13) {
        this.search_product();
      }
    },
    search_product() {
      // if(this.search_by!=''){
      if (this.search_name != "") {
        this.spinnerOn = true;
        axios
          .post(
            api_calls.task_list_url(),
            {
              company_id: this.$session.get("UserInformation").company_id,
              company_name: this.$session.get("UserInformation").company_name,
              license_key: this.$session.get("UserInformation").license_key,
              email: this.$session.get("UserInformation").email,
              token: this.$session.get("UserInformation").tokens,
              issearch: true,
              // searchby: this.search_by,
              key: this.search_name,
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
            if (response.data.pagecount != undefined) {
              this.page_no = 1;
              this.task_list = [];
              this.original_intent_list = response.data.TasksList;
              for (var i in response.data.TasksList) {
                let desc = [];
                for (var j in response.data.TasksList[i].Utterances) {
                  desc.push({
                    Text: response.data.TasksList[i].Utterances[j].Text,
                  });
                }
                if (desc.length != 0) {
                  this.task_list.push({
                    Intent: response.data.TasksList[i].Intent,
                    TaskName: response.data.TasksList[i].TaskName,
                    Task_Description: desc,
                  });
                }
              }
              this.total_pages = response.data.pagecount;
              this.setpagination(this.page_no);
            } else if (response.data.MSG == "No Tasks Found") {
              toastr.error("No Task Found");
              setTimeout(() => {
                // this.$router.go();
                this.load_task();
              }, 2500);
            } else {
              toastr.error("Intrnal Server Error");
              setTimeout(() => {
                // this.$router.go();
                this.load_task();
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
      } else {
        toastr.error("Enter proper data for searching");
      }
      // }else{
      //   toastr.error("Select header for searching");
      // }
    },
    page_require(page) {
      if (page == 0 || page == this.total_pages + 1) {
        event.preventDefault();
      } else {
        if (this.search_name == "") {
          $("input:checkbox").prop("checked", false);
          if (page == "...s") {
            this.page_no = Math.ceil((1 + this.page_no) / 2);
          } else if (page == "...l") {
            this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
          } else {
            this.page_no = page;
          }
          axios
            .post(
              api_calls.task_list_url(),
              {
                company_id: this.companyid,
                company_name: this.companyname,
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                isShow: true,
                per_page: this.per_page,
                page_no: this.page_no,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.task_list = [];
              this.original_intent_list = response.data.TasksList;
              for (var i in response.data.TasksList) {
                let desc = [];
                for (var j in response.data.TasksList[i].Utterances) {
                  desc.push({
                    Text: response.data.TasksList[i].Utterances[j].Text,
                  });
                }
                if (desc.length != 0) {
                  this.task_list.push({
                    Intent: response.data.TasksList[i].Intent,
                    TaskName: response.data.TasksList[i].TaskName,
                    Task_Description: desc,
                  });
                }
              }
              this.total_pages = response.data.pagecount;
              this.setpagination(this.page_no);
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
        } else {
          $("input:checkbox").prop("checked", false);
          if (pageno == "...s") {
            this.page_no = Math.ceil((1 + this.page_no) / 2);
          } else if (pageno == "...l") {
            this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
          } else {
            this.page_no = pageno;
          }
          axios
            .post(
              api_calls.task_list_url(),
              {
                company_id: this.$session.get("UserInformation").company_id,
                company_name: this.$session.get("UserInformation").company_name,
                license_key: this.$session.get("UserInformation").license_key,
                email: this.$session.get("UserInformation").email,
                token: this.$session.get("UserInformation").tokens,
                issearch: true,
                // searchby: this.search_by,
                key: this.search_name,
                per_page: this.per_page,
                page_no: page,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              if (response.data.pagecount != undefined) {
                this.page_no = page;
                this.task_list = [];
                this.original_intent_list = response.data.TasksList;
                for (var i in response.data.TasksList) {
                  let desc = [];
                  for (var j in response.data.TasksList[i].Utterances) {
                    desc.push({
                      Text: response.data.TasksList[i].Utterances[j].Text,
                    });
                  }
                  if (desc.length != 0) {
                    this.task_list.push({
                      Intent: response.data.TasksList[i].Intent,
                      TaskName: response.data.TasksList[i].TaskName,
                      Task_Description: desc,
                    });
                  }
                }
                this.total_pages = response.data.pagecount;
                this.setpagination(this.page_no);
              } else {
                toastr.error("Intrnal Server Error");
                setTimeout(() => {
                  // this.$router.go();
                  this.load_task();
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
    send_msg_to_user() {
      if (
        this.add_customs_email ||
        (!this.add_customs_email && !this.email_to_user)
      ) {
        this.email_to_user = !this.email_to_user;
      } else if (!this.add_customs_email && this.email_to_user) {
        event.preventDefault();
        toastr.error("Please select atleast one type of recipient");
      }
    },
    send_msg_to_custom_user() {
      if (
        this.email_to_user ||
        (!this.add_customs_email && !this.email_to_user)
      ) {
        this.add_customs_email = !this.add_customs_email;
      } else if (this.add_customs_email && !this.email_to_user) {
        event.preventDefault();
        toastr.error("Please select atleast one type of recipient");
      }
    },
    send_sms_to_user() {
      if (
        this.add_customs_number ||
        (!this.add_customs_number && !this.sms_to_user)
      ) {
        this.sms_to_user = !this.sms_to_user;
      } else if (!this.add_customs_number && this.sms_to_user) {
        event.preventDefault();
        toastr.error("Please select atleast one type of recipient");
      }
    },
    send_sms_to_custom_user() {
      if (this.sms_to_user || (!this.add_customs_number && !this.sms_to_user)) {
        this.add_customs_number = !this.add_customs_number;
      } else if (this.add_customs_number && !this.sms_to_user) {
        event.preventDefault();
        toastr.error("Please select atleast one type of recipient");
      }
    },
    checkforemailvariables() {
      var arrStr1 = this.email_body.split("{{");
      var arrStr2 = [];
      var new_var_list = [];
      var new_var_action = [];
      for (let i = 1; i < arrStr1.length; i++) {
        if (arrStr1[i].includes("}}")) {
          arrStr2.push(arrStr1[i].split("}}")[0]);
          if (new_var_list.indexOf(arrStr1[i].split("}}")[0]) == -1) {
            new_var_list.push(arrStr1[i].split("}}")[0]);
            new_var_action.push("add");
          }
        }
      }
      for (let i = 0; i < this.email_variables.length; i++) {
        if (new_var_list.indexOf(this.email_variables[i].variable_name) > -1) {
          new_var_action[
            new_var_list.indexOf(this.email_variables[i].variable_name)
          ] = "keep";
        } else if (
          new_var_list.indexOf(this.email_variables[i].variable_name) == -1
        ) {
          new_var_list.push(this.email_variables[i].variable_name);
          new_var_action.push("remove");
        }
      }
      for (let i = 0; i < new_var_list.length; i++) {
        if (new_var_action[i] == "add") {
          this.email_variables.push({
            variable_name: new_var_list[i],
            variable_description: null,
          });
        } else if (new_var_action[i] == "remove") {
          for (let j = 0; j < this.email_variables.length; j++) {
            if (this.email_variables[j].variable_name == new_var_list[i]) {
              this.email_variables.splice(j, 1);
            }
          }
        }
      }
    },
    checkforsmsvariables() {
      // sms_varibles
      var arrStr1 = this.sms_body.split("{{");
      var arrStr2 = [];
      var new_var_list = [];
      var new_var_action = [];
      for (let i = 1; i < arrStr1.length; i++) {
        if (arrStr1[i].includes("}}")) {
          arrStr2.push(arrStr1[i].split("}}")[0]);
          if (new_var_list.indexOf(arrStr1[i].split("}}")[0]) == -1) {
            new_var_list.push(arrStr1[i].split("}}")[0]);
            new_var_action.push("add");
          }
        }
      }
      for (let i = 0; i < this.sms_varibles.length; i++) {
        if (new_var_list.indexOf(this.sms_varibles[i].variable_name) > -1) {
          new_var_action[
            new_var_list.indexOf(this.sms_varibles[i].variable_name)
          ] = "keep";
        } else if (
          new_var_list.indexOf(this.sms_varibles[i].variable_name) == -1
        ) {
          new_var_list.push(this.sms_varibles[i].variable_name);
          new_var_action.push("remove");
        }
      }
      for (let i = 0; i < new_var_list.length; i++) {
        if (new_var_action[i] == "add") {
          this.sms_varibles.push({
            variable_name: new_var_list[i],
            variable_description: null,
          });
        } else if (new_var_action[i] == "remove") {
          for (let j = 0; j < this.sms_varibles.length; j++) {
            if (this.sms_varibles[j].variable_name == new_var_list[i]) {
              this.sms_varibles.splice(j, 1);
            }
          }
        }
      }
    },
    openpreview(index) {
      $("#taskmodal").modal("show");
      this.task_type = this.task_list[index].Task_Type;
      // this.preview = true;
      this.isEdit = true;
      this.preview = false;
      this.selected_task = index;
      this.input_list.task_name = this.task_list[index].TaskName;
      if (
        this.task_list[index].Task_Type == "default" ||
        !Boolean(this.task_list[index].Task_Type)
      ) {
        this.task_type = "Default";
        this.input_list.intent = this.task_list[index].Intent;
        this.input_list.question = this.task_list[
          index
        ].Task_Description[0].Text;
        this.input_list.question_id = this.task_list[
          index
        ].Task_Description[0].QuestionId;
        for (
          var j = 1;
          j < this.task_list[index].Task_Description.length;
          j++
        ) {
          this.questions_list.push(this.task_list[index].Task_Description[j]);
        }
      } else if (this.task_list[index].Task_Type == "Email") {
        // this.custom_emails = this.getdatasobs(this.task_list[index].Task_Description.custom_emails);
        // this.custom_emails = this.task_list[index].Task_Description.custom_emails;
        // console.log(this.custom_emails);
        this.custom_emails = [];
        for (
          let i = 0;
          i < this.task_list[index].Task_Description.custom_emails.length;
          i++
        ) {
          this.custom_emails.push(
            this.task_list[index].Task_Description.custom_emails[i]
          );
        }
        this.email_title = this.task_list[index].Task_Description.subject;
        this.email_body = this.task_list[index].Task_Description.body;
        this.email_variables = [];
        for (var i in this.task_list[index].Task_Description.email_variables) {
          this.email_variables.push({
            variable_name: this.task_list[index].Task_Description
              .email_variables[i].variable_name,
            variable_description: this.task_list[index].Task_Description
              .email_variables[i].variable_description,
          });
        }
      } else if (this.task_list[index].Task_Type == "SMS") {
        this.custom_number = [];
        for (
          let i = 0;
          i < this.task_list[index].Task_Description.custom_numbers.length;
          i++
        ) {
          this.custom_number.push(
            this.task_list[index].Task_Description.custom_numbers[i]
          );
        }
        this.sms_body = this.task_list[index].Task_Description.body;
        this.sms_varibles = [];
        for (var i in this.task_list[index].Task_Description.sms_variables) {
          this.sms_varibles.push({
            variable_name: this.task_list[index].Task_Description.sms_variables[
              i
            ].variable_name,
            variable_description: this.task_list[index].Task_Description
              .sms_variables[i].variable_description,
          });
        }
      }
      // this.isEdit = true;
      // this.task_type = this.task_list[index].Task_Type;
      // this.preview = true;
      // this.selected_task = index;
      // this.task_type = 'Default';
      // this.input_list.intent = this.task_list[index].Intent;
      // this.input_list.task_name = this.task_list[index].TaskName;
      // this.input_list.question = this.task_list[index].Task_Description[0].Text;
      // this.task_list[index].Task_Description.splice(0, 1);
      // for (var j=1;j<this.task_list[index].Task_Description.length;j++) {
      //   this.questions_list.push(this.task_list[index].Task_Description[j]);
      // }
      // console.log(this.task_list[index]);
    },
    // getdatasobs(data){
    //   var x;
    //   console.log(data,x);
    //   x=data;
    //   console.log(data,x);
    //   return x;
    // },
  },
};
</script>

<style  src="vue-multiselect/dist/vue-multiselect.min.css">
</style>

<style scoped>
td > tr > td {
  border-color: #ffffff;
}
td > tr > td :hover {
  border-color: #f7f8fb;
}
.modal {
  overflow: scroll !important;
}
</style>
