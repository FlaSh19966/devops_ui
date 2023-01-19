<template>
  <div>
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <div class="card dash-modal" style="border: none;" id="webhook_page">
      <div
        class="card-header px-0 d-block d-sm-flex flex-wrap justify-content-between"
      >
        <h4 class="mb-sm-0">{{tlt('webhook_page_title')}}</h4>
        <!-- <p>
  Specify the request URL for an external API you want to be able to invoke from dialog nodes. We will call this URL when configured to do so from a dialog node.
      </p> -->
        <div class="card-act d-flex flex-wrap">
          <input
            class="form-control search-bar"
            id="search_bar_id"
            :placeholder="tlt('search_here')"
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
            @click="isEditWebhook ? verify_changes() : search_webhook()"
            id="search_btn_id"
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
            id="add_entity_btn"
            data-target="#webhookmodal"
            title="Add new Webhook"
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
            {{tlt('webhook_add_webhook_btn')}}
          </a>
          <a
            href="javascript:void(0)"
            class="red-btn"
            @click="delete_selected"
            id="delete_entity_id"
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
            {{tlt('webhook_delete_btn')}}
          </a>
        </div>
      </div>
      <div class="card-body px-0 pt-0" id="page">
        <div class="col-sm-12 d-flex px-0" v-if="!no_webhooks_present">
          <div class="col-sm-4 pl-0">
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
                              @change="selected_webhook('all')"
                            />
                            <span class="icn"></span>
                          </label>
                        </div>
                      </th>
                      <th scope="col" class="text-left">{{tlt('webhooks_header')}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(webhook, index) in webhooks_list"
                      :key="index"
                      :class="check_current_webhook(index)"
                    >
                      <th scope="col">
                        <div class="form-check checkbox-success">
                          <label
                            class="form-check-label checkbox checkbox-success"
                          >
                            <input
                              class="form-check-input"
                              type="checkbox"
                              :id="'webhook_checkbox_' + index"
                              @change="selected_webhook(webhook.id)"
                            />
                            <span class="icn"></span>
                          </label>
                        </div>
                      </th>
                      <td
                        style="cursor: pointer"
                        @click="isEditWebhook ? verify_changes() : show_webhook(index)"
                        :title="webhook.name"
                      >
                        <template>
                          <p style="margin-bottom: 0">
                            {{ webhook.name }}
                          </p>
                        </template>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-sm-8 pr-0">
            <div style="border: 1px solid #dbe2e8">
              <div class="col-sm-12">
                <div style="color: #414141" class="d-flex">
                  <h5><p class="mt-2 mb-0">{{tlt('webhook_details_header')}}</p></h5>
                  <span
                    @click="edit_webhook_details"
                    v-html="pencil_svg"
                    class="ml-auto mr-2 mt-2"
                    style="cursor: pointer;"
                    title="Edit"
                  ></span>
                </div>
              </div>
              <hr class="mt-0">
              <div class="col-sm-12" style="margin-bottom: 1rem">
                <h5 class="mb-2">{{tlt('webhook_name_label')}}</h5>
                <div v-if="!isEditWebhook" style="padding-left: 20px">
                  <p>{{ current_selected_webhook.name }}</p>
                </div>
                <div v-else-if="isEditWebhook">
                  <input
                    style="padding: 0.375rem 0.75rem"
                    align="right"
                    class="form-control"
                    :placeholder="tlt('enter_webhook_name')"
                    id="enter_webhook_edit_id"
                    v-on:keyup="check_webhook_name_edit"
                    @keydown="webhook_name_check_special_characters($event)"
                    v-model="webhook_name"
                  />
                  <span
                    v-show="webhook_already_exists" 
                    style="color: red"
                    >{{tlt('webhook_name_already_exist')}}</span
                  >
                </div>
                <hr />
                <h5 class="mb-2">{{tlt('webhook_url_label')}}</h5>
                <div v-if="!isEditWebhook" style="padding-left: 20px">
                  <p>{{ current_selected_webhook.url }}</p>
                </div>
                <div v-else>
                  <input
                    type="text"
                    v-model="webhook_url"
                    class="form-control"
                    style="padding: 0.375rem 0.75rem"
                    title="Your app URL for webhook request (ex. https://us-south.functions.cloud.ibm.com/api/v1/web/myapp/HelloWorld.json)"
                    :placeholder="tlt('app_url_eg')"
                  />
                  <span
                    v-show="validURL(webhook_url) == false && webhook_url != ''"
                    style="color: red; display: initial !important"
                    >{{tlt('webhook_valid_webhook_url')}}</span
                  >
                </div>
                <hr />
                <div v-if="!isEditWebhook">
                  <div class="d-flex">
                    <h5 class="mb-2">{{tlt('webhook_http_method_label')}}:</h5>
                    <p class="pl-3" style="padding-top: 2px;">
                      {{ current_selected_webhook.http_method }}
                    </p>
                  </div>
                </div>
                <div v-else>
                  <h6 class="mb-2">{{tlt('webhook_set_http_label')}}</h6>
                  <select
                    class="form-control"
                    v-model="http_method"
                    style="width: 20%; padding: 0.375rem 0.75rem"
                    :placeholder="tlt('select_response')"
                    id="res_n_int_source"
                  >
                    <option
                      v-for="(option, index) in http_method_types"
                      :key="index"
                      :value="option"
                    >
                      {{ option }}
                    </option>
                  </select>
                </div>
                <div v-if="!isEditWebhook">
                <div v-if="current_selected_webhook_headers">
                  <hr />
                  <h5 class="mb-4">{{tlt('webhook_headers_label')}}</h5>
                  <table class="table" style="border: 1px solid black">
                    <thead>
                      <tr style="border: 1px">
                        <td
                          scope="col"
                          style="
                            text-align: center;
                            border: 1px solid black;
                          "
                        >
                          <strong>{{tlt('webhook_header_name_label')}}</strong>
                        </td>
                        <td
                          scope="col"
                          style="
                            text-align: center;
                            border: 1px solid black;
                          "
                        >
                          <strong>{{tlt('webhook_header_value_label')}}</strong>
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(header, index) in current_selected_webhook.headers_list"
                        :key="index"
                        id="list-group"
                        style="border: 1px"
                      >
                        <td
                          scope="row"
                          style="
                            text-align: center;
                            border: 1px solid black;
                          "
                        >
                          {{ header.header_type }}
                        </td>
                        <td
                          style="
                            text-align: center;
                            border: 1px solid black;
                          "
                        >
                          <span 
                            v-if="header.header_type ==='Authorization' 
                              && typeof(header.header_values) === 'object'"
                          >
                            {{header.header_values.auth_type}}
                            <span style="margin-left: 12px; color: #0645AD;"
                              class="my-auto"
                            >
                              <i
                                class="fa fa-info-circle"
                                aria-hidden="true"
                                style="font-size: 16px"
                                title="Click on edit to see and modify all values"
                              >
                              </i>
                            </span>
                          </span>
                          <span v-else>
                            {{ header.header_values }}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  </div>
                </div>
                <div v-if="isEditWebhook">
                  <hr />
                  <h5>{{tlt('webhook_on_edit_headers_label')}}</h5>
                  <label class="form-text text-muted">{{tlt('webhook_on_edit_headers_text')}}
                  </label>
                  <div
                    class="col-sm-12 custom-button-box p-3 pr-1 mt-0 mb-3"
                    v-for="(header, index) in headers_list"
                    :key="index"
                  >
                    <div class="d-flex">
                      <h6>{{tlt('webhook_on_edit_header_label')}} {{index + 1}}</h6>
                      <i
                        style="cursor: pointer; font-size: 16px; float: right"
                        class="fa ml-auto mr-1"
                        title="Remove"
                        @click="add_to_headers_list('remove', index)"
                      >
                        &#xf1f8;
                      </i>
                    </div>
                    <div class="d-flex">
                      <div class="col-sm-6 p-0">
                        <multiselect
                          id="select_header_id"
                          v-model="header.header_type"
                          :close-on-select="true"
                          :options="header_types_list"
                          :placeholder="tlt('select_type')"
                          :show-labels="false"
                          open-direction="top"
                          :max-height="200"
                          @input="webhook_header_type_change(header.header_type, index)"
                        >
                        </multiselect>
                      </div>
                      <div
                        v-if="header.header_type != 'Authorization'"
                        class="col-sm-6 p-0 pl-3"
                      >
                        <input
                          class="form-control"
                          style="width: 100%; padding: 0.375rem 0.5rem"
                          :placeholder="tlt('enter_value')"
                          type="text"
                          v-model="header.header_values"
                        />
                      </div>
                      <div 
                        v-else
                        class="col-sm-6 p-0 pl-3"
                      >
                        <div>
                          <multiselect
                            id="select_auth_type_id"
                            v-model="header.header_values.auth_type"
                            :close-on-select="true"
                            :options="auth_types_list"
                            :placeholder="tlt('authorization_type')"
                            :show-labels="false"
                            open-direction="top"
                            :max-height="200"
                            @input="webhook_header_auth_type_change(header.header_values.auth_type, index)"
                          >
                          </multiselect>
                        </div>
                      </div>
                    </div>
                    <div v-if="header.header_type == 'Authorization'">
                      <hr>
                      <div class="col-sm-12 p-0 d-flex" v-if="header.header_values.auth_type === 'Bearer Token'">
                        <label class="col-sm-3 p-0 my-auto"> Token </label>
                        <div class="col-sm-9 p-0">
                          <input
                            class="form-control "
                            style="width: 100%; padding: 0.375rem 0.5rem"
                            :placeholder="tlt('token')"
                            type="text"
                            @input="set_auth_value(index)"
                            v-model="header.header_values.auth_value"
                          />
                        </div>
                      </div>
                      <div class="col-sm-12 p-0 d-flex" v-else-if="header.header_values.auth_type === 'Basic Auth'">
                        <table style="width: 100%;">
                          <tbody>
                            <tr>
                              <td >Username</td>
                              <td>
                                <input class="form-control  my-1" 
                                  type="text" 
                                  @input="set_auth_value(index)"
                                  v-model="header.header_values.auth_value.Username"
                                  style="width: 100%;padding: 0.375rem 0.5rem"
                                  :placeholder="tlt('username')"
                                >
                              </td>
                            </tr>
                            <tr >
                              <td >Password</td>
                              <td>
                                <input class="form-control my-1" 
                                  type="Password"
                                  id="form_password_edit_id"
                                  @input="set_auth_value(index)"
                                  v-model="header.header_values.auth_value.Password"
                                  style="width: 100%;padding: 0.375rem 0.5rem"
                                  :placeholder="tlt('password')"
                                >
                              </td>
                              <a
                                href="javascript:void(0)"
                                @click="password_toggle('form_password_edit_id')"
                                class="view-pass"
                              >
                                <img src="/img/eye-icn.png" alt />
                              </a>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="mt-3" v-else-if="header.header_values.auth_type === 'Custom Token'">
                        <table style="width: 100%;">
                          <tbody>
                            <tr>
                              <td >{{tlt('webhook_on_edit_token_url_label')}}</td>
                              <td>
                                <input class="form-control  my-1" 
                                  type="text" 
                                  @input="set_auth_value(index)"
                                  v-model="header.header_values.auth_value.token_url"
                                  style="width: 100%;padding: 0.375rem 0.5rem"
                                  :placeholder="tlt('token_url')"
                                >
                                <span
                                  v-show="validURL(header.header_values.auth_value.token_url) == false && (Boolean(header.header_values.auth_value.token_url))"
                                  style="color: red; display: initial !important"
                                  >{{tlt('valid_token_url_msg')}}</span
                                >
                              </td>
                            </tr>
                            <tr>
                              <td >{{tlt('webhook_on_edit_jsondata_label')}}</td>
                              <td>
                                <textarea
                                  :class="'edit form-control ' + json_data_class(index)"
                                  :placeholder="tlt('json_data')"
                                  rows="5"
                                  @input="set_auth_value(index)"
                                  v-model="header.header_values.auth_value.json_data"
                                ></textarea>
                              </td>
                            </tr>
                          </tbody>
                      </table>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex">
                    <p style="margin-top: 6px; margin-bottom: 5px">
                      {{tlt('webhook_on_edit_add_header_label')}}
                    </p>
                    <button
                      class="add_button_style"
                        @click="add_to_headers_list('add')"
                    >
                      <img src="/img/black_plus.png" alt="" />
                    </button>
                  </div>
                  <div class="modal-footer">
                    <div class="dash-modal">
                    <div class="btn-wrap card-act text-right mt-0 py-0 border-top-0">
                      <button
                        type="button"
                        class="btn btn-link"
                        data-dismiss="modal"
                        @click="edit_webhook_details"
                      >
                        {{tlt('webhook_on_edit_cancel_btn')}}
                      </button>
                      <button
                        type="submit"
                        class="darkblue-btn"
                        id="res_n_int_save"
                        @click="save_webhook()"
                      >
                        {{tlt('webhook_on_edit_save_btn')}}
                      </button>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p class="text-center" style="padding-top: 50px;">
            <strong>
              {{tlt('webhook_no_data_added')}}</strong
            >
          </p>
        </div>
        <div
          class="pagin-table"
          style="margin-top: 2%"
          v-show="webhooks_list.length > 0"
        >
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li class="page-item">
                <a
                  class="page-link"
                  href="#"
                  @click="isEditWebhook ? verify_changes() : page_require(page_no - 1)"
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
                  @click="isEditWebhook ? verify_changes() : page_require(pageno)"
                  >...</a
                >
                <a
                  v-if="pageno != '...s' && pageno != '...l'"
                  class="page-link"
                  href="#"
                  @click="isEditWebhook ? verify_changes() : page_require(pageno)"
                  >{{ pageno }}</a
                >
              </li>
              <li class="page-item">
                <a
                  class="page-link"
                  href="#"
                  @click="isEditWebhook ? verify_changes() : page_require(page_no + 1)"
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
      class="modal fade dash-modal"
      id="webhookmodal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content p-2">
          <div class="modal-body">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt />
              </div>
              <h3>{{tlt('webhook_model_details_header')}}</h3>
              <button @click="empty_variable()"
                type="button" 
                class="close" 
                data-dismiss="modal"
              >
                <img src="/img/close-icn.png" alt />
              </button>
            </div>
            <h5 class="heading">{{tlt('webhook_model_webhook_name_label')}}</h5>
            <input
              type="text"
              v-model="webhook_name"
              class="form-control"
              style="padding: 0.375rem 0.75rem"
              :placeholder="tlt('enter_webhook_name')"
              id="enter_webhook_id"
              v-on:keyup="check_webhook_name"
              @keydown="webhook_name_check_special_characters($event)"
            />
            <span
              v-show="webhook_already_exists" 
              style="color: red"
              >{{tlt('webhook_model_name_already_exist')}}</span
            >
            <br />
            <h5 class="heading">{{tlt('webhook_model_url_label')}}</h5>
            <input
              type="text"
              v-model="webhook_url"
              class="form-control"
              style="padding: 0.375rem 0.75rem"
              title="Your app URL for webhook request (ex. https://us-south.functions.cloud.ibm.com/api/v1/web/myapp/HelloWorld.json)"
              :placeholder="tlt('app_url_eg')"
            />
            <span
              v-show="validURL(webhook_url) == false && webhook_url != ''"
              style="color: red; display: initial !important"
              >{{tlt('webhook_model_valid_webhook_url')}}</span
            >
            <br />
            <h5 class="heading">{{tlt('webhook_model_set_http_label')}}</h5>
            <select
              class="form-control "
              v-model="http_method"
              style="width: 100%; padding: 0.375rem 0.5rem"
              :placeholder="tlt('select_response')"
              id="res_n_int_source"
            >
              <option
                v-for="(option, index) in http_method_types"
                :key="index"
                :value="option"
              >
                {{ option }}
              </option>
            </select>
            <br />
            <h5 class="heading">{{tlt('webhook_model_headers_label')}}</h5>
            <label class="form-text text-muted">{{tlt('webhook_model_add_header_text')}}
            </label>
            <div
              class="col-sm-12 custom-button-box p-3 pr-1 mt-0 mb-3"
              v-for="(header, index) in headers_list"
              :key="index"
            >
              <div class="d-flex">
                <h6>{{tlt('webhook_model_add_header_btn_text')}} {{index + 1}}</h6>
                <i
                  style="cursor: pointer; font-size: 16px; float: right"
                  class="fa ml-auto mr-1"
                  title="Remove"
                  @click="add_to_headers_list('remove', index)"
                >
                  &#xf1f8;
                </i>
              </div>
              <div class="d-flex">
                <div class="col-sm-6 p-0">
                  <multiselect
                    id="select_header_id"
                    v-model="header.header_type"
                    :close-on-select="true"
                    :options="header_types_list"
                    :placeholder="tlt('select_type')"
                    :show-labels="false"
                    open-direction="top"
                    :max-height="200"
                    @input="webhook_header_type_change(header.header_type, index)"
                  >
                  </multiselect>
                </div>
                <div
                  v-if="header.header_type != 'Authorization'"
                  class="col-sm-6 p-0 pl-3"
                >
                  <input
                    class="form-control "
                    style="width: 100%; padding: 0.375rem 0.5rem"
                    :placeholder="tlt('enter_value')"
                    type="text"
                    v-model="header.header_values"
                  />
                </div>
                <div 
                  v-else
                  class="col-sm-6 p-0 pl-3"
                >
                  <div>
                    <multiselect
                      id="select_auth_type_id"
                      v-model="header.header_values.auth_type"
                      :close-on-select="true"
                      :options="auth_types_list"
                      :placeholder="tlt('authorization_type')"
                      :show-labels="false"
                      open-direction="top"
                      :max-height="200"
                      @input="webhook_header_auth_type_change(header.header_values.auth_type, index)"
                    >
                    </multiselect>
                  </div>
                </div>
              </div>
              <div v-if="header.header_type == 'Authorization'">
                <hr>
                <div class="col-sm-12 p-0 d-flex" v-if="header.header_values.auth_type === 'Bearer Token'">
                  <label class="col-sm-3 p-0 my-auto"> {{tlt('webhook_token_label')}} </label>
                  <div class="col-sm-9 p-0">
                    <input
                      class="form-control "
                      style="width: 100%; padding: 0.375rem 0.5rem"
                      :placeholder="tlt('token')"
                      type="text"
                      @input="set_auth_value(index)"
                      v-model="header.header_values.auth_value"
                    />
                  </div>
                </div>
                <div class="col-sm-12 p-0 d-flex" v-else-if="header.header_values.auth_type === 'Basic Auth'">
                  <table style="width: 100%;">
                    <tbody>
                      <tr>
                        <td >{{tlt('webhook_username_url')}}</td>
                        <td>
                          <input class="form-control  my-1" 
                            type="text" 
                            @input="set_auth_value(index)"
                            v-model="header.header_values.auth_value.Username"
                            style="width: 100%;padding: 0.375rem 0.5rem"
                            :placeholder="tlt('username')"
                          >
                        </td>
                      </tr>
                      <tr >
                        <td >{{tlt('webhook_password_url')}}</td>
                        <td>
                          <input class="form-control my-1" 
                            type="Password"
                            id="form_password_id"
                            @input="set_auth_value(index)"
                            v-model="header.header_values.auth_value.Password"
                            style="width: 100%;padding: 0.375rem 0.5rem"
                            :placeholder="tlt('password')"
                          >
                        </td>
                        <a
                          href="javascript:void(0)"
                          @click="password_toggle('form_password_id')"
                          class="view-pass"
                        >
                          <img src="/img/eye-icn.png" alt />
                        </a>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="mt-3" v-else-if="header.header_values.auth_type === 'Custom Token'">
                  <table style="width: 100%;">
                    <tbody>
                      <tr>
                        <td >{{tlt('webhook_model_details_header')}}</td>
                        <td>
                          <input class="form-control  my-1" 
                            type="text" 
                            @input="set_auth_value(index)"
                            v-model="header.header_values.auth_value.token_url"
                            style="width: 100%;padding: 0.375rem 0.5rem"
                            :placeholder="tlt('token_url')"
                          >
                          <span
                            v-show="validURL(header.header_values.auth_value.token_url) == false && (Boolean(header.header_values.auth_value.token_url))"
                            style="color: red; display: initial !important"
                          >{{tlt('webhook_valid_token_url')}}</span
                          >
                        </td>
                      </tr>
                      <tr>
                        <td >{{tlt('webhook_model_details_header')}}</td>
                        <td>
                          <textarea
                            :class="'edit form-control ' + json_data_class(index)"
                            :placeholder="tlt('json_data')"
                            rows="5"
                            @input="set_auth_value(index)"
                            v-model="header.header_values.auth_value.json_data"
                          ></textarea>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="d-flex">
              <p style="margin-top: 6px; margin-bottom: 5px">
                {{tlt('webhook_model_add_header_btn')}}
              </p>
              <button
                class="add_button_style"
                  @click="add_to_headers_list('add')"
              >
                <img src="/img/black_plus.png" alt="" />
              </button>
            </div>
          </div>
          <div class="modal-footer">
            <div class="dash-modal">
              <div class="btn-wrap card-act text-right mt-0 py-0 border-top-0">
                <button
                  type="button"
                  class="btn btn-link"
                  data-dismiss="modal"
                  @click="empty_variable()"
                >
                  {{tlt('webhook_cancel_btn')}}
                </button>
                <button
                  type="submit"
                  class="darkblue-btn"
                  id="res_n_int_save"
                  @click="save_webhook()"
                >
                  {{tlt('webhook_save_btn')}}
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
import Swal from "sweetalert2";
import Multiselect from "vue-multiselect";
import { freeze_portal,show_subscription_expired_swal } from "@/portal/mixins";
export default {
  components: {
    Multiselect,
  },
  name: "webhook_component",
  mixins: [freeze_portal,show_subscription_expired_swal],
  data() {
    return {
      pencil_svg:
        '<svg xmlns="http://www.w3.org/2000/svg" width="15.546" height="15.461" viewBox="0 0 15.546 15.461"><defs><style>.a{fill:#9e9e9e;}</style></defs><g transform="translate(-747.888 -356.769)"><path class="a" d="M759.416,356.769a2.358,2.358,0,0,1,1.777.662c.534.513,1.072,1.025,1.567,1.575a2.3,2.3,0,0,1-.071,3.325c-2.736,2.76-5.494,5.5-8.238,8.251a1.381,1.381,0,0,1-.758.288c-.719.174-1.429.379-2.144.572-.932.251-1.862.5-2.795.751-.6.158-.989-.213-.832-.807q.689-2.595,1.406-5.182a1.164,1.164,0,0,1,.289-.487q4.091-4.107,8.2-8.2A2.265,2.265,0,0,1,759.416,356.769Zm-1.989,2.956-6.54,6.538,3.025,3.024,6.538-6.537Zm4.023,2.165c.118-.135.225-.269.343-.392a1.134,1.134,0,0,0,0-1.734c-.46-.466-.926-.925-1.388-1.39a1.166,1.166,0,0,0-.861-.368c-.578,0-.881.4-1.214.76Zm-12.084,8.863,3.2-.863-2.337-2.331Z" transform="translate(0)"/><path class="a" d="M813.942,422.6l-.789-.8,3.821-3.819.784.8Z" transform="translate(-59.648 -55.947)"/></g></svg>',
      isVisibleSearchClear: false,
      isEditWebhook: false,
      companyid: "",
      companyname: "",
      checked_list: [],
      search_name: "",
      webhooks_list: [],
      webhooks_names_list: [],
      webhook_already_exists: false,
      page_no: 1,
      per_page: 15,
      number_of_rows: null,
      page_array: [],
      pageno: "",
      total_pages: null,
      current_selected_webhook: [],
      current_selected_webhook_highlight: "",
      spinnerOn: false,
      webhook_name: "",
      webhook_id: "",
      webhook_url: "",
      http_method: "GET",
      http_method_types: ["GET", "POST"],
      headers_list: [],
      header_types_list: [
        "Accept",
        "Accept-Datetime",
        "Accept-Language",
        "Cookie",
        "From",
        "Authorization",
        "Warning",
        "User-Agent",
        "Host",
        "Referer",
        "Pragma",
      ],
      auth_types_list:[
        "Bearer Token",
        "Basic Auth",
        "Custom Token"
      ],
      no_webhooks_present: false,
      reg_url:
        /https:\/\/[(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/i,
    };
  },
  watch: {
    webhook_name(val){
      this.webhook_name = val.replace(/[^a-zA-Z0-9_ ]/g, "");
    },
    search_name() {
      if (this.search_name === "") {
        this.load_webhook();
        this.isVisibleSearchClear = false;
      } else if (this.search_name !== "") {
        this.isVisibleSearchClear = true;
      }
    },
  },
  created() {
    if (this.$session.get("UserInformation").role == "SuperAdmin") {
      if (this.$session.has("CompanyId")) {
        this.companyid = this.$session.get("CompanyId");
        this.companyname = this.$session.get("CompanyName");
      } else {
        this.companyid = this.$session.get("UserInformation").company_id;
        this.companyname = this.$session.get("UserInformation").company_name;
        toastr.warning("Please select a company name from the dropdown");
      }
    } else {
      this.companyid = this.$session.get("UserInformation").company_id;
      this.companyname = this.$session.get("UserInformation").company_name;
    }
    this.load_webhook();
  },
  mounted() {
    setTimeout(() => {
      this.freeze_portal();
    }, 1000);
     this.$root.$on("webhook_componentDisabled", (data) => {
      if(data===true){
        this.show_subscription_expired_swal();
      }
    });
    var vm = this;
    $("#selectall").click(function () {
      if ($(this).is(":checked")) {
        // $('div:input').prop('checked',true);
        $("input:checkbox").prop("checked", true);
      } else {
        vm.checked_list = [];
        $("input:checkbox").prop("checked", false);
      }
    });
    $('a[data-target="#webhookmodal"]').on('click' , function () {
      if(vm.isEditWebhook == true){
        vm.verify_changes();
      }else{
        vm.empty_variable();
        $("#webhookmodal").modal('show');
      }
    });
  },
  computed:{
    current_selected_webhook_headers(){
      if(typeof(this.current_selected_webhook) === 'object'){
        if(Object.keys(this.current_selected_webhook).length >0){
          if (Object.keys(this.current_selected_webhook.headers_list).length >0){
            return true
          }
        }else{
          return false
        }
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.isEditWebhook) {
      this.verify_changes();
    } else {
      next();
    }
  },
  methods: {
    validURL(url) {
      if (this.reg_url.test(url)) {
        return true;
      } else {
        return false;
      }
    },
    password_toggle(id) {
      var password = document.getElementById(id);
      if (password.type == "text") {
        password.type = "password";
      } else if (password.type == "password") {
        password.type = "text";
      }
    },
    webhook_name_check_special_characters(e){
      if (/^[^a-zA-Z0-9_ ]*$/.test(e.key)) {
        e.preventDefault();
      }
    },
    verify_changes() {
      Swal({
        title: this.tlt('webhook_are_u_sure_msg'),
        text: this.tlt('webhook_changes_in_webhook_msg'),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.tlt('verify_changes_save_btn'),
        cancelButtonText: this.tlt('verify_changes_cancel_btn'),
      }).then((result) => {
        if (result.value) {
          // console.log("if true");
          this.save_webhook();
        }else{
          // console.log("else false");
          this.isEditWebhook = false;
        }
      });
    },
    check_webhook_name() {
      if (this.webhooks_names_list.includes(this.webhook_name)){
        this.webhook_already_exists = true;
      }else {
        this.webhook_already_exists = false;
      }
      axios
        .post(
          api_calls.form_automation_webhook_details(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            subscription: this.$session.get("UserInformation").subscription,
            is_exist: true,
            webhook_name: this.webhook_name,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          if (response.data.message.MSG_CODE === this.api_status_code.NOT_EXISTS_MODELS.MSG_CODE) {
            this.webhook_already_exists = false;
            document.getElementById("enter_webhook_id").style.border = null;
            if(this.webhook_name != ""){
              document.getElementById("enter_webhook_id").style.border =
              "1px solid #00f000";
            }
          } else if (response.data.message.MSG_CODE === this.api_status_code.ALREADY_EXISTS_MODELS.MSG_CODE) {
            this.webhook_already_exists = true;
            document.getElementById("enter_webhook_id").style.border =
            "1px solid red";
          }else {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              timer: 2500,
              type: "error"
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
    },
    check_webhook_name_edit() {
      axios
        .post(
          api_calls.form_automation_webhook_details(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            subscription: this.$session.get("UserInformation").subscription,
            is_exist: true,
            webhook_name: this.webhook_name,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          if (response.data.message.MSG_CODE === this.api_status_code.NOT_EXISTS_MODELS.MSG_CODE) {
            this.webhook_already_exists = false;
            document.getElementById("enter_webhook_edit_id").style.border = null;
            if(this.webhook_name != ""){
              document.getElementById("enter_webhook_edit_id").style.border =
              "1px solid #00f000";
            }
          } else if (response.data.message.MSG_CODE === this.api_status_code.ALREADY_EXISTS_MODELS.MSG_CODE) {
            if (this.current_selected_webhook.name == this.webhook_name){
              this.webhook_already_exists = false;
              document.getElementById("enter_webhook_edit_id").style.border =null;  
            } else {
              this.webhook_already_exists = true;
              document.getElementById("enter_webhook_edit_id").style.border =
              "1px solid red";
            }
          }else {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              timer: 2500,
              type: "error"
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
    },
    clear_search_name() {
      this.search_name = "";
    },
    callsearch() {
      if (event.keyCode === 13) {
        if(this.isEditWebhook){
          this.verify_changes()
        }else{
          this.search_webhook();
        }
      }
    },
    search_webhook() {
      if (this.search_name != "") {
        $("input:checkbox").prop("checked", false);
        this.checked_list = [];
        this.spinnerOn = true;
        axios
          .post(
            api_calls.form_automation_webhook_details(),
            {
              company_id: this.companyid,
              company_name: this.companyname,
              license_key: this.$session.get("UserInformation").license_key,
              email: this.$session.get("UserInformation").email,
              token: this.$session.get("UserInformation").tokens,
              subscription: "Platinum",
              is_search: true,
              search_term: this.search_name,
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
            if (response.data.message.MSG_CODE === this.api_status_code.WEBHOOK_DETAILS_RECEIVED_MODELS.MSG_CODE) {
              this.webhooks_list = [];
              this.number_of_rows = response.data.pagination.total_data == undefined ? 0 : response.data.pagination.total_data;
              this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
              for (var i in response.data.data.webhook[0].webhook) {
                this.webhooks_list.push(response.data.data.webhook[0].webhook[i]);
              }
              this.show_webhook(0);
              this.setpagination(this.page_no);
              this.no_webhooks_present = false;
            } else if (response.data.message.MSG_CODE === this.api_status_code.SEARCH_WEBHOOK_NOT_FOUND_MODELS.MSG_CODE) {
              Swal({
                type: "warning",
                text: this.tlt('webhook_not_found'),
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
              });
            } else {
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                timer: 2500,
                type: "error"
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
      } else {
        Swal({
          text: this.tlt('webhook_field_cannot_empty_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    },
    edit_webhook_details() {
      if (!this.isEditWebhook) {
        this.webhook_name = this.current_selected_webhook.name;
        this.webhook_id = this.current_selected_webhook.id;
        this.webhook_url = this.current_selected_webhook.url;
        this.http_method = this.current_selected_webhook.http_method;
        this.headers_list = this.current_selected_webhook.headers_list;
        this.isEditWebhook = true;
      } else {
        this.isEditWebhook = false;
        this.empty_variable();
        this.load_webhook();
      }
    },
    check_current_webhook(index) {
      var return_var = "";
      if (
        this.webhooks_list[index].id == this.current_selected_webhook_highlight
      ) {
        return_var += "current-active-webhook";
      }
      return return_var;
    },
    show_webhook(index) {
      this.isEditWebhook = false;
      this.current_selected_webhook = this.webhooks_list[index];
      this.current_selected_webhook_highlight = this.webhooks_list[index].id;
    },
    load_webhook() {
      $("input:checkbox").prop("checked", false);
      this.checked_list = [];
      this.spinnerOn = true;
      axios
        .post(api_calls.form_automation_webhook_details(), {
          company_id: this.companyid,
          company_name: this.companyname,
          is_get: true,
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
          this.webhooks_list = [];
          if (response.data.message.MSG_CODE === this.api_status_code.WEBHOOK_DETAILS_RECEIVED_MODELS.MSG_CODE) {
            this.number_of_rows = response.data.pagination.total_data == undefined ? 0 : response.data.pagination.total_data;
            this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
            // this.webhooks_list = response.data.webhook[0].webhook;
            for (var i in response.data.data.webhook[0].webhook) {
              this.webhooks_list.push(response.data.data.webhook[0].webhook[i]);
            }
            this.webhooks_names_list = response.data.data.webhook_names;
            this.show_webhook(0);
            this.setpagination(this.page_no);
            this.no_webhooks_present = false;
          } else if (response.data.message.MSG_CODE === this.api_status_code.WEBHOOK_DETAILS_NOT_EXISTS_MODELS.MSG_CODE) {
            this.no_webhooks_present = true;
            this.webhooks_list = []
          } else {
            Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                timer: 2500,
                type: "error"
            });
            this.load_webhook();
          }
        })
        .catch((e) => {
          console.log(e);
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
    create_UUID() {
      var dt = new Date().getTime();
      var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (dt + Math.random() * 16) % 16 | 0;
          dt = Math.floor(dt / 16);
          return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      );
      return uuid;
    },
    add_to_headers_list(func, index) {  
      if (func == "add") {
        this.headers_list.push({
          header_type: "",
          header_values: "",
        });
      } else if (func == "remove") {
        this.headers_list.splice(index, 1);
      }
    },
    webhook_header_type_change(header_type, index){
      this.headers_list[index].header_values = "";
      if(header_type == 'Authorization'){
        this.headers_list[index].header_values = {};
      }
    },
    webhook_header_auth_type_change(auth_type, index){
      this.headers_list[index].header_values.auth_value = {}
      if(auth_type === 'Bearer Token'){
        this.headers_list[index].header_values.auth_value = "";
      }
    },
    set_auth_value(index){
      var vm = this;
      vm.$set(vm.headers_list, index, vm.headers_list[index]);
    },
    delete_selected() {
      this.spinnerOn = true;
      if (this.checked_list.length > 0) {
        axios
          .post(api_calls.form_automation_webhook_details(), {
            company_id: this.$session.get("UserInformation").company_id,
            company_name: this.$session.get("UserInformation").company_name,
            is_delete: true,
            webhook_id: this.checked_list,
          },
          {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          },
        }
        )
          .then((response) => {
            this.checked_list = [];
            this.spinnerOn = false;
            if (response.data.message.MSG_CODE === this.api_status_code.SUCCESSFUL_DB_QUERY_MODELS.MSG_CODE) {
              Swal({
                type: "success",
                text: this.tlt('webhook_delete_successful_msg'),
                timer: 3000,
              });
            } else if (response.data.message.MSG_CODE === this.api_status_code.UNSUCCESSFUL_DB_OPERATION_MODELS.MSG_CODE) {
              Swal({
                type: "error",
                text: this.tlt('webhook_internal_server_msg2'),
                timer: 3000,
              });
            } else if (response.data.message.MSG_CODE === this.api_status_code.NO_WEBHOOK_DATA_MODELS.MSG_CODE) {
              Swal({
                type: "error",
                text: this.tlt('webhook_internal_server_msg3'),
                timer: 3000,
              });
            }else {
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                timer: 2500,
                type: "error"
                });
            }
            this.load_webhook();
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
      this.spinnerOn = false;
        Swal({
          type: "warning",
          text: this.tlt('webhook_one_webhook_to_delete'),
          timer: 3000,
        });
      }
    },
    save_webhook() {
      // Need to change logic if Multiple Webhook details are accepted
      if (this.webhook_id == "") {
        this.webhook_id = this.create_UUID();
      }
      if (this.webhook_name == "" || this.webhook_already_exists) {
        Swal({
          text: this.tlt('unique_webhook_name_msg'),
          type: "warning",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 4000,
        });
        return;
      }
      if (!this.validURL(this.webhook_url)) {
        Swal({
          text: this.tlt('add_correct_url_msg'),
          type: "warning",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 4000,
        });
        return;
      }
      if(Boolean(this.headers_list.length > 0)){
        for (let index = 0; index < this.headers_list.length; index++) {
          const header_temp = this.headers_list[index];
          if(Boolean(header_temp.header_type =='')){
            Swal({
              text: this.tlt('select_header_type_msg'),
              type: "warning",
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 4000,
            });
            return;
          }
          if(header_temp.header_type !='Authorization' && Boolean(header_temp.header_values === '')){
            Swal({
              text: this.tlt('select_header_value_msg'),
              type: "warning",
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 4000,
            });
            return;
          }
          if(header_temp.header_type =='Authorization'){
            if(!Boolean(header_temp.header_values.auth_type)){
              Swal({
                text: this.tlt('select_auth_type_msg'),
                type: "warning",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 4000,
              });
              return;
              
            }
            if(header_temp.header_values.auth_type === 'Bearer Token' &&
              Boolean(header_temp.header_values.auth_value === '')){
                Swal({
                  text: this.tlt('enter_token_value_msg'),
                  type: "warning",
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 4000,
                });
                return;
            }else if(header_temp.header_values.auth_type === 'Basic Auth'){
              if(!Boolean(header_temp.header_values.auth_value.Username)){
                Swal({
                  text: this.tlt('enter_enter_auth_username_msg'),
                  type: "warning",
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 4000,
                });
                return;
              }
              if(!Boolean(header_temp.header_values.auth_value.Password)){
                Swal({
                  text: this.tlt('enter_auth_password_msg'),
                  type: "warning",
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 4000,
                });
                return;
              }

            }else if(header_temp.header_values.auth_type === 'Custom Token'){
              if(!Boolean(this.validURL(header_temp.header_values.auth_value.token_url))){
                Swal({
                  text: this.tlt('valid_token_url_msg'),
                  type: "warning",
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 4000,
                });
                return;
              }
              if(!Boolean(header_temp.header_values.auth_value.json_data)){
                Swal({
                  text: this.tlt('enter_json_data_msg'),
                  type: "warning",
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 4000,
                });
                return;
              }else if(this.json_data_class(index) === 'is-invalid'){
                Swal({
                  text: this.tlt('valid_json_data_msg'),
                  type: "warning",
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 4000,
                });
                return;
              }
            }
          }
        }
      }
      Swal({
        text: this.tlt('webhook_submit_your_details'),
        type: "info",
        toast: true,
        showConfirmButton: false,
      });
      this.spinnerOn = true;
      var webhook_details = {};
      webhook_details.id = this.webhook_id;
      webhook_details.name = this.webhook_name.replace(/\s+/g, "_").toLocaleLowerCase();
      webhook_details.url = this.webhook_url;
      webhook_details.http_method = this.http_method;
      webhook_details.headers_list = this.headers_list;
      axios
        .post(api_calls.form_automation_webhook_details(), {
          company_id: this.$session.get("UserInformation").company_id,
          company_name: this.$session.get("UserInformation").company_name,
          is_save: true,
          webhook_details: webhook_details,
        },
        {
        headers: {
          Authorization: `Bearer ${this.$session.get("at")}`,
        },
      }
      )
        .then((response) => {
          this.spinnerOn = false;
          if (response.data.message.MSG_CODE === this.api_status_code.WEBHOOK_DETAILS_SAVED_MODELS.MSG_CODE ) {
            Swal({
              type: "success",
              text: this.tlt('webhook_detail_saved'),
              timer: 3000,
            });
            if(!this.isEditWebhook){
              $("#webhookmodal").modal("hide");
            }
            this.load_webhook();
          } else if ( response.data.message.MSG_CODE === this.api_status_code.WEBHOOK_NOT_SAVED_MODELS.MSG_CODE
          ) {
            Swal({
              type: "error",
              text: this.tlt('webhook_internal_server_msg4'),
              timer: 3000,
            });
          }else {
            Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                timer: 2500,
                type: "error"
            });
            this.load_webhook();
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
    page_require(page) {
      $("input:checkbox").prop("checked", false);
      this.checked_list = [];
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
              api_calls.form_automation_webhook_details(),
              {
                company_name: this.companyname,
                company_id: this.companyid,
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                subscription: this.$session.get("UserInformation").subscription,
                is_get: true,
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
              this.webhooks_list = [];
              if (
                response.data.message.MSG_CODE === this.api_status_code.WEBHOOK_DETAILS_RECEIVED_MODELS.MSG_CODE
              ) {
                this.webhooks_list = [];
                this.number_of_rows = response.data.pagination.total_data == undefined ? 0 : response.data.pagination.total_data;
                this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page; 
                for (var i in response.data.data.webhook[0].webhook) {
                  this.webhooks_list.push(response.data.data.webhook[0].webhook[i]);
                }
                this.show_webhook(0);
                this.webhooks_names_list = response.data.data.webhook;
                this.setpagination(this.page_no);
                this.no_webhooks_present = false;
              } else if (
                response.data.message.MSG_CODE === this.api_status_code.WEBHOOK_DETAILS_NOT_EXISTS_MODELS.MSG_CODE
              ) {
                // add swal here
              } else {
                Swal({
                  type: "error",
                  text: this.tlt('webhook_internal_server_msg5'),
                  timer: 2000,
                });
                this.load_webhook();
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
          $("input:checkbox").prop("checked", false);
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
              api_calls.form_automation_webhook_details(),
              {
                company_id: this.$session.get("UserInformation").company_id,
                company_name: this.$session.get("UserInformation").company_name,
                license_key: this.$session.get("UserInformation").license_key,
                email: this.$session.get("UserInformation").email,
                token: this.$session.get("UserInformation").tokens,
                subscription: "Platinum",
                is_search: true,
                search_term: this.search_name,
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
              this.spinnerOn = false;
              this.webhooks_list = [];
              if (
                response.data.message.MSG_CODE === this.api_status_code.WEBHOOK_DETAILS_RECEIVED_MODELS.MSG_CODE
              ) {
                this.number_of_rows = response.data.pagination.total_data == undefined ? 0 : response.data.pagination.total_data;
                this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
                for (var i in response.data.data.webhook[0].webhook) {
                  this.webhooks_list.push(response.data.data.webhook[0].webhook[i]);
                }
                this.show_webhook(0);
                this.webhooks_names_list = response.data.data.webhook;
                this.setpagination(this.page_no);
              } else if (response.data.message.MSG_CODE === this.api_status_code.SEARCH_WEBHOOK_NOT_FOUND_MODELS.MSG_CODE) {
                Swal({
                  type: "warning",
                  text: this.tlt('webhook_not_found1'),
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 3000,
                });
              } else {
                Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                timer: 2500,
                type: "error"
                });
                this.load_webhook();
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
    pagination_class(index) {
      if (index == this.page_no) {
        return " active";
      } else {
        return "";
      }
    },
    selected_webhook(webhook_id) {
      if (webhook_id == "all") {
        this.checked_list = [];
        if (event.target.checked) {
          var temp = [];
          temp = this.webhooks_list.map((item) => {
            return item.id;
          });
          this.checked_list = temp;
          $("input:checkbox").prop("checked", false);
          for (let i = 0; i < this.checked_list.length; i++) {
            $("#webhook_checkbox_" + [i]).prop("checked", true);
            $("#selectall").prop("checked", true);
          }
        } else if (!event.target.checked) {
          this.checked_list = [];
        }
      } else {
        if (event.target.checked == true) {
          let val_index = this.checked_list.filter((webhook) => {
            return webhook.webhook_id == webhook_id;
          });
          if (val_index.length == 0) {
            this.checked_list.push(webhook_id);
          }
        } else if (event.target.checked == false) {
          var selectall = document.querySelector("#selectall");
          if (selectall.checked == true) {
            selectall.checked = false;
          }
          let temp = this.checked_list.filter((webhook) => {
            return webhook != webhook_id;
          });
          this.checked_list = temp;
        }
      }
    },
    json_data_class(index) {
      if(Boolean(this.headers_list[index].header_values.auth_value.json_data)){
        try {
          JSON.parse(this.headers_list[index].header_values.auth_value.json_data);
        } catch (e) {
          return "is-invalid";
        }
      }
    },
    empty_variable() {
      if(this.isEditWebhook){
        this.edit_webhook_details();
        document.getElementById("enter_webhook_edit_id").style.border = null;
      }
      this.webhook_already_exists = false;
      document.getElementById("enter_webhook_id").style.border = null;
      this.webhook_id = "";
      this.webhook_name = "";
      this.webhook_url = "";
      this.http_method = "GET";
      this.http_method_types = ["GET", "POST"];
      this.headers_list = [];
      this.header_types_list = [
        "Accept",
        "Accept-Datetime",
        "Accept-Language",
        "Cookie",
        "From",
        "Authorization",
        "Warning",
        "User-Agent",
        "Host",
        "Referer",
        "Pragma",
      ];
    },
  },
};
</script>

<style scoped>
.current-active-webhook {
  background: rgba(0, 0, 0, 0.1);
}
.modal-lg {
  max-width: 900px !important;
}
.heading {
  color: #414141 !important;
}
.sub_heading {
  font-size: 16px !important;
  font-weight: 500 !important;
}
.add_button_style{
  cursor: pointer;
  border: none;
  background: transparent 0% 0% no-repeat padding-box;
}
.custom-button-box {
  border: 0.5px solid #ccc;
}
.view-pass {
  right: 10px !important;
  top: 52px !important;
}
#webhookmodal{
  overflow-y: auto !important;
}
.add_response_button {
  font-size: 14px;
  color: rgb(10, 10, 10);
  background: #fff;
  border: 1px solid #dbe2e8;
  font-weight: 400;
  line-height: 20px;
  /* display: inline-block; */
  border-radius: 5px;
  cursor: pointer;
  float: right;
}
.input-tag {
  top: 248px;
  left: 508px;
  width: 405px;
  height: 41px;
  border: 1px solid #dbe2e8;
  border-radius: 5px;
  opacity: 1;
  font-size: 14px;
  padding: 10px 15px 10px 20px;
}
.table-box tbody tr:hover td,
.table-box tbody tr:hover th {
  background: #ececec;
}
</style>