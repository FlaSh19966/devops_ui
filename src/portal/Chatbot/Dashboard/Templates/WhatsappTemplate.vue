<template>
  <div class="dash-cont">
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <div class="container-fluid">
      <div class="card dash-card">
        <div class="dash-card card-header d-flex m-0">
          <div class="card-act col-sm-4 pr-3 pl-0 d-flex">
            <input
              class="form-control mr-auto"
              style="padding: 0px 15px; height: 36px !important"
              id="search_bar_id"
              :placeholder="tlt('search_template')"
              v-model.trim="search_name"
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
          </div>
          <div class="card-act ml-auto d-flex flex-wrap">
            <!-- <a
              id="check_balance_btn"
              href="#"
              class="darkblue-btn"
              data-toggle="checkbalance"
              style="font-size: 15px; margin-right: 10px"
              @click="check_addons_balance"
              title="Check your whatsapp credits"
            >
              Check Balance
            </a> -->
            <a
              href="javascript:void(0)"
              class="darkblue-btn `"
              id="custom_template"
              style="font-size: 15px"
              data-toggle="modal"
              data-target="#addcustomtemplate"
              @click="empty_variable"
            >
              {{tlt('custom_template_btn')}}
            </a>
            <a
              id="send_template_btn"
              href="#"
              class="darkblue-btn"
              data-toggle="modal"
              data-target="#sendtemplate"
              title="Send Template"
              v-show="
                templatelist.length > 0 &&
                is_notification_template === false &&
                !disable_btn_expired
              "
            >
              {{tlt('publish_template_btn')}}
            </a>
            <a
              id="add_template_btn"
              href="#"
              class="darkblue-btn"
              v-if="disable_btn_expired"
              title="Add new Template"
              @click="empty_variable"
            >
              {{tlt('add_template_btn')}}
            </a>
            <a
              id="add_template_btn"
              v-else
              href="#"
              class="darkblue-btn"
              data-toggle="modal"
              data-target="#addtemplatemodel"
              title="Add new Template"
              @click="empty_variable"
            >
              {{tlt('add_template_btn')}}
            </a>
            <a
              href="javascript:void(0)"
              class="red-btn"
              id="delete_intent"
              style="font-size: 15px"
              @click="delete_template"
            >
              {{tlt('delete_btn')}}
            </a>
          </div>
        </div>
        <div class="card-body py-0" id="page">
          <div class="col-sm-12 d-flex px-0" v-if="templatelist.length > 0">
            <div class="col-sm-4 pl-0" style="height: 80vh; overflow-y: auto">
              <div class="table-box">
                <div class="table-responsive">
                  <table class="table" style="overflow-y: auto">
                    <thead>
                      <!-- <tr> -->
                      <th scope="row">
                        <div class="form-check checkbox checkbox-success">
                          <label class="form-check-label">
                            <input
                              class="form-check-input"
                              id="selectall"
                              type="checkbox"
                              @change="selected_templates('all')"
                            />
                            <span class="icn"></span>
                          </label>
                        </div>
                      </th>
                      <th
                        scope="row"
                        class="text-left"
                        style="
                          font: normal normal normal 16px/22px Roboto;
                          letter-spacing: 0px;
                          color: #414141;
                        "
                      >
                        {{tlt('template_label')}}
                      </th>
                      <!-- </tr> -->
                    </thead>
                    <tbody>
                      <tr
                        v-for="(template, index) in templatelist"
                        :key="index"
                        :class="check_current_template_active(index)"
                      >
                        <td scope="row">
                          <div class="form-check checkbox checkbox-success">
                            <label class="form-check-label">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                :id="index"
                                @change="
                                  selected_templates(template.template_id)
                                "
                              />
                              <span class="icn"></span>
                            </label>
                          </div>
                        </td>
                        <td
                          style="cursor: pointer"
                          @click="show_template(index)"
                          :title="template.template_name"
                        >
                          <template>
                            <p style="margin-bottom: 0">
                              {{ template.template_name }}
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
              style="overflow-y: auto"
              v-if="templatelist.length > 0"
            >
              <div style="border: 1px solid #dbe2e8">
                <div class="col-sm-12">
                  <div style="color: #414141" class="d-flex">
                    <h5 class="pt-2">{{tlt('template_details_label')}}</h5>
                    <span
                      @click="edit_template_details"
                      v-html="pencil_svg"
                      class="ml-auto mr-2 mt-2"
                      style="cursor: pointer"
                    ></span>
                  </div>
                </div>
                <hr style="margin-top: 0" />
                <div class="col-sm-12" style="margin-bottom: 1rem">
                  <h5>
                    <p class="mt-2 mb-0" style="color: #414141">
                      {{tlt('template_name_label')}}
                    </p>
                  </h5>
                  <div v-if="!isEditTemplate" style="padding-left: 20px">
                    <p>{{ current_template.template_name }}</p>
                  </div>
                  <div v-else>
                    <input
                      id="edit_template_name_id"
                      type="text"
                      v-model.trim="current_template.template_name"
                      v-on:keyup="validate_edit_template_name"
                      class="form-control edit"
                      style="padding: 0.375rem 0.75rem"
                      :placeholder="tlt('template_name_label')"
                    />
                    <span
                      v-show="edit_template_name_already_exist"
                      style="color: red"
                      >{{tlt('template_name_exist_msg')}}</span
                    >
                  </div>
                </div>
                <div class="col-sm-12" style="margin-bottom: 1rem">
                  <div v-if="isEditTemplate" style="width: 100%">
                    <h5>
                      <p class="mt-2 mb-0" style="color: #414141">
                        {{tlt('template_variable_label')}}
                      </p>
                    </h5>
                    <!-- <div v-for="(variable, index) in current_template.variable_dict" :key="index"> -->
                    <div v-if="current_template.variable_dict['HEADER']">
                      <p class="template-input-title">
                        {{
                          current_template.variable_dict["HEADER"]
                            .component_name
                        }}
                      </p>
                      <input
                        :placeholder="
                          current_template.variable_dict['HEADER'].type ==
                          'IMAGE'
                            ? tlt('current_temp_img_url_path')
                            : tlt('current_temp_header_text')
                        "
                        class="form-control edit"
                        type="text"
                        v-model="current_template.variable_dict['HEADER'].url"
                      />
                    </div>
                    <div v-if="current_template.variable_dict['BODY']">
                      <div
                        v-for="(body_var, name, itr) in current_template
                          .variable_dict['BODY'].variables"
                        :key="itr"
                      >
                        <p class="template-input-title">
                          {{
                            current_template.variable_dict["BODY"]
                              .component_name
                          }}
                          : {{ name }}
                        </p>
                        <input
                          :placeholder="tlt('current_temp_body_text')"
                          class="form-control edit"
                          type="text"
                          v-model="
                            current_template.variable_dict['BODY'].variables[
                              name
                            ]
                          "
                        />
                      </div>
                    </div>
                    <div v-if="current_template.variable_dict['BUTTONS']">
                      <div
                        v-for="(btn, name, itr) in current_template
                          .variable_dict['BUTTONS'].buttons_list"
                        :key="itr"
                      >
                        <div v-if="btn.type == 'URL'">
                          <p class="template-input-title">
                            {{
                              current_template.variable_dict["BUTTONS"]
                                .component_name
                            }}
                            : {1}
                          </p>
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <span
                                class="input-group-text"
                                id="basic-addon3"
                                >{{ btn.base_url }}</span
                              >
                            </div>
                            <input
                              type="text"
                              class="form-control edit"
                              v-model="btn.variables['1']"
                              :placeholder="tlt('url_path')"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- </div> -->
                  </div>
                  <div class="col-sm-12 p-0">
                    <h5>
                      <p class="my-3 mb-0" style="color: #414141">
                        {{tlt('template_preview_label')}}
                      </p>
                    </h5>
                    <div
                      v-if="Boolean(preview_template_data)"
                      class="cards"
                      style="width: 50%; margin: 0 auto"
                    >
                      <!-- <div
                        v-for="(comp, name, index) in preview_template_data"
                        :key="index"
                      > -->
                      <div v-if="Boolean(preview_template_data['HEADER'])">
                        <div
                          v-if="preview_template_data['HEADER'].type == 'IMAGE'"
                        >
                          <img
                            :src="preview_template_data['HEADER'].body"
                            width="100%"
                          />
                        </div>
                        <div v-else>
                          <p>{{ preview_template_data["HEADER"].body }}</p>
                        </div>
                      </div>
                      <div
                        class="mt-4"
                        v-if="Boolean(preview_template_data['BODY'])"
                      >
                        <label
                          v-if="preview_template_data['BODY'].type == 'text'"
                          style="line-height: 1.5"
                        >
                          {{ preview_template_data["BODY"].body }}
                        </label>
                      </div>
                      <div v-if="Boolean(preview_template_data['FOOTER'])">
                        <span
                          v-if="preview_template_data['FOOTER'].type == 'text'"
                          style="
                            font-size: 10px;
                            line-height: 1.5;
                            font-weight: 300;
                          "
                        >
                          {{ preview_template_data["FOOTER"].body }}
                        </span>
                      </div>
                      <!-- </div> -->
                    </div>
                    <div
                      v-if="
                        Boolean(preview_template_data) &&
                        Boolean(preview_template_data['BUTTON'])
                      "
                    >
                      <div
                        v-for="(btn, index1) in preview_template_data['BUTTON']
                          .body"
                        :key="index1"
                      >
                        <div
                          v-if="btn['type'] === 'QUICK_REPLY'"
                          class="preview-button-div"
                          style="width: 50%; margin: 0 auto"
                        >
                          <button
                            color="rgba(11,103,170,1)"
                            class="btn preview-button"
                          >
                            <span color="rgba(11,103,170,1)" class=""
                              >{{ btn["text"] }}
                            </span>
                          </button>
                        </div>
                        <div
                          v-else-if="btn['type'] === 'URL'"
                          class="preview-button-div"
                          style="width: 50%; margin: 0 auto"
                        >
                          <a
                            :href="btn.url"
                            target="_blank"
                            class="btn preview-button"
                          >
                            <span color="#0b67aa" class=""
                              ><svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="17"
                                height="17"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#0b67aa"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="mr-2"
                              >
                                <path
                                  d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                                ></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line
                                  x1="10"
                                  y1="14"
                                  x2="21"
                                  y2="3"
                                ></line></svg>{{ btn["text"] }}</span
                            >
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer" v-if="isEditTemplate">
                  <div class="dash-modal">
                    <div class="btn-wrap text-right mt-0 py-0 border-top-0">
                      <button
                        type="button"
                        class="btn btn-link"
                        style="border-radius: 0"
                        data-dismiss="modal"
                        @click="edit_template_details"
                      >
                        {{tlt('cancel_btn')}}
                      </button>
                      <button
                        type="submit"
                        class="darkblue-btn"
                        id="res_n_int_save"
                        @click="edit_template()"
                      >
                        {{tlt('save_btn')}}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-12 d-flex px-0 py-5" v-else-if="search_name == ''">
            <h4 class="mx-auto">
              {{tlt('no_template_added_msg')}}
            </h4>
          </div>
          <div
            class="col-sm-12 d-flex px-0 py-5"
            v-else-if="templatelist.length == 0 && search_name != ''"
          >
            <h4 class="mx-auto">Searched Template not found.</h4>
          </div>
          <div
            class="pagin-table pb-3"
            v-if="templatelist.length > 0"
            style="margin-top: 2%"
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
    <div
      id="addtemplatemodel"
      class="modal fade dash-modal"
      role="dialog"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt />
              </div>
              <h3>{{tlt('add_template_header')}}</h3>
              <button
                type="button"
                class="close"
                @click="empty_variable"
                data-dismiss="modal"
              >
                <img src="/img/close-icn.png" alt />
              </button>
            </div>
            <div class="form-group">
              <h5 class="heading">{{tlt('template_name_label')}}</h5>
              <div class="ml-3">
                <input
                  id="template_name_add_id"
                  type="text"
                  v-model.trim="template_name"
                  v-on:keyup="validate_template_name"
                  class="form-control"
                  :placeholder="tlt('template_name_label')"
                />
                <span v-show="template_name_already_exist" style="color: red"
                  >{{tlt('template_name_already_exist_msg')}}</span
                >
              </div>
            </div>
            <div class="form-group">
              <h5 class="heading">{{tlt('promotional_template_label')}}</h5>
              <div class="container">
                <div class="row">
                  <div
                    class="col-3 radio my-auto"
                    v-for="(template, index) in default_templatelist"
                    :key="index"
                  >
                    <label>
                      <input
                        v-model="choosen_template"
                        type="radio"
                        id="template_radio_id"
                        :value="template"
                        required
                      />
                      <span class="icn" id="template_radio_icon_id"></span>
                      {{ template.template_name }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="choosen_template != null">
              <div class="form-group">
                <div class="col-sm-12 p-0 d-flex">
                  <div
                    v-if="Boolean(choosen_template)"
                    class="col-sm-7 p-0 pr-3"
                  >
                    <h5 class="heading mb-2">{{tlt('template_variable_label')}}</h5>
                    <!-- <div v-for="(variable, index) in choosen_template.variable_list" :key="index"> -->
                    <div
                      v-if="Boolean(choosen_template.variable_dict['HEADER'])"
                    >
                      <p class="template-input-title">
                        {{
                          choosen_template.variable_dict["HEADER"]
                            .component_name
                        }}
                      </p>
                      <input
                        :placeholder="
                          choosen_template.variable_dict['HEADER'].type ==
                          'IMAGE'
                            ? tlt('current_temp_img_url_path')
                            : tlt('current_temp_header_text')
                        "
                        class="form-control"
                        type="text"
                        v-model="choosen_template.variable_dict['HEADER'].url"
                      />
                    </div>
                    <div v-if="Boolean(choosen_template.variable_dict['BODY'])">
                      <div
                        v-for="(body_var, name, itr) in choosen_template
                          .variable_dict['BODY'].variables"
                        :key="itr"
                      >
                        <p class="template-input-title">
                          {{
                            choosen_template.variable_dict["BODY"]
                              .component_name
                          }}
                          : {{ name }}
                        </p>
                        <input
                          :placeholder="tlt('current_temp_body_text')"
                          class="form-control"
                          type="text"
                          v-model="
                            choosen_template.variable_dict['BODY'].variables[
                              name
                            ]
                          "
                        />
                      </div>
                    </div>
                    <div
                      v-if="Boolean(choosen_template.variable_dict['BUTTONS'])"
                    >
                      <div
                        v-for="(btn, name, itr) in choosen_template
                          .variable_dict['BUTTONS'].buttons_list"
                        :key="itr"
                      >
                        <div v-if="btn.type == 'URL'">
                          <p class="template-input-title">
                            {{
                              choosen_template.variable_dict["BUTTONS"]
                                .component_name
                            }}
                            : {1}
                          </p>
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <span
                                class="input-group-text"
                                id="basic-addon3"
                                >{{ btn.base_url }}</span
                              >
                            </div>
                            <input
                              type="text"
                              class="form-control"
                              v-model="btn.variables['1']"
                              :placeholder="tlt('url_path')"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- </div> -->
                  </div>
                  <div class="col-sm-5 p-0 pl-3">
                    <h5 class="sub_heading mb-4">{{tlt('preview_label')}}</h5>
                    <div v-if="Boolean(preview_template_data)">
                      <div class="cards">
                        <!-- <div
                        v-for="(comp, name, index) in preview_template_data"
                        :key="index"
                      > -->
                        <div v-if="Boolean(preview_template_data['HEADER'])">
                          <div
                            v-if="
                              preview_template_data['HEADER'].type == 'IMAGE'
                            "
                          >
                            <img
                              :src="preview_template_data['HEADER'].body"
                              width="100%"
                            />
                          </div>
                          <div v-else>
                            <p>{{ preview_template_data["HEADER"].body }}</p>
                          </div>
                        </div>
                        <div
                          class="mt-4"
                          v-if="Boolean(preview_template_data['BODY'])"
                        >
                          <label
                            v-if="preview_template_data['BODY'].type == 'text'"
                            style="line-height: 1.5"
                          >
                            {{ preview_template_data["BODY"].body }}
                          </label>
                        </div>
                        <div v-if="Boolean(preview_template_data['FOOTER'])">
                          <span
                            v-if="
                              preview_template_data['FOOTER'].type == 'text'
                            "
                            style="
                              font-size: 10px;
                              line-height: 1.5;
                              font-weight: 300;
                            "
                          >
                            {{ preview_template_data["FOOTER"].body }}
                          </span>
                        </div>
                        <!-- </div> -->
                      </div>
                      <div v-if="Boolean(preview_template_data['BUTTON'])">
                        <div
                          v-for="(btn, index1) in preview_template_data[
                            'BUTTON'
                          ].body"
                          :key="index1"
                        >
                          <div
                            v-if="btn['type'] === 'QUICK_REPLY'"
                            class="preview-button-div"
                          >
                            <button
                              color="rgba(11,103,170,1)"
                              class="btn preview-button"
                            >
                              <span color="rgba(11,103,170,1)" class=""
                                >{{ btn["text"] }}
                              </span>
                            </button>
                          </div>
                          <div
                            v-else-if="btn['type'] === 'URL'"
                            class="preview-button-div"
                          >
                            <a
                              :href="btn.url"
                              target="_blank"
                              class="btn preview-button"
                            >
                              <span color="#0b67aa" class=""
                                ><svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="17"
                                  height="17"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#0b67aa"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  class="mr-2"
                                >
                                  <path
                                    d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                                  ></path>
                                  <polyline points="15 3 21 3 21 9"></polyline>
                                  <line
                                    x1="10"
                                    y1="14"
                                    x2="21"
                                    y2="3"
                                  ></line></svg>{{ btn["text"] }}</span
                              >
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="btn-wrap text-right mt-0 py-0 border-top-0">
              <button
                type="button"
                class="btn btn-link"
                data-dismiss="modal"
                @click="empty_variable()"
              >
                {{tlt('cancel_btn')}}
              </button>
              <button
                type="submit"
                class="darkblue-btn"
                id="res_n_int_save"
                @click="save_template()"
              >
                {{tlt('save_btn')}}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      id="sendtemplate"
      class="modal fade dash-modal"
      role="dialog"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt />
              </div>
              <h3>{{tlt('send_template_header')}}</h3>
              <button
                type="button"
                class="close"
                @click="empty_variable"
                data-dismiss="modal"
              >
                <img src="/img/close-icn.png" alt />
              </button>
            </div>
            <div class="form-group">
              <h5>
                <p class="mt-2 mb-0" style="color: #414141">{{tlt('template_name_label')}}</p>
              </h5>
              <div style="padding-left: 20px">
                <p>{{ current_template.template_name }}</p>
              </div>
            </div>
            <div class="form-group m-0">
              <div class="d-flex">
                <h5>
                  <p class="mb-0" style="color: #414141">{{tlt('send_template_label')}}</p>
                </h5>
              </div>
            </div>
            <div style="padding-left: 20px" class="radio my-auto">
                <label>
                  <input
                    type="radio"
                    v-model="send_to"
                    value="all"
                    id="send_sms_all_customer_true_id"
                  />
                  <span class="icn" id="filter_portal_user_radio"></span>
                  {{tlt('sms_template_model_all_cust_label')}}
                </label>
                <label>
                  <input
                    type="radio"
                    v-model="send_to"
                    value="specific"
                    id="send_sms_all_customer_false_id"
                  />
                  <span class="icn"></span>
                  {{tlt('sms_template_model_specific_cust_label')}}
                </label>
                <label>
                  <input
                    type="radio"
                    v-model="send_to"
                    value="broadcast"
                    id="send_sms_all_customer_false_id"
                  />
                  <span class="icn"></span>
                  {{tlt('Broadcast')}}
                </label>
              </div>
            <div style="padding-left: 20px" class="form-group" v-if="send_to === 'specific'">
              <label>
                {{tlt('add_new_customer_text')}}
              </label>
              <div class="d-flex mb-3">
                <vue-phone-number-input
                  v-model="add_customer_contact_number"
                  :only-countries="cont"
                  style="width:-webkit-fill-available !important"
                  default-country-code="IN"
                  @update="phoneNumber = $event"
                >
                </vue-phone-number-input>
                <button
                  id="alternate_product_name_add_btn"
                  class="darkblue-btn ml-2"
                  @click="add_customer"
                >
                  {{tlt('add_btn')}}
                </button>
              </div>
              <div id="list_id">
                <multiselect
                  v-model="specific_contact_list"
                  :options="contacts_list"
                  id="specific_contact_list_id"
                  :searchable="true"
                  @search-change="search_customer_list"
                  :hide-selected="true"
                  :close-on-select="false"
                  :multiple="true"
                  :taggable="true"
                  tag-position="top"
                  tag-placeholder="Add this as new number"
                  placeholder="Search customer number"
                  :max-height="400"
                  label="profile_name"
                  track-by="whatsapp_phone_number"
                  open-direction="top"
                >
                  <!-- <span>{{ selected_role }}</span> -->
                </multiselect>
              </div>
            </div>
            <div style="padding-left: 20px" class="form-group mt-3" v-if="send_to==='broadcast'">
              <div id="broadcast_list_id">
                <multiselect
                  v-model="select_broadcast_list"
                  :options="broadcast_list"
                  id="select_broadcast_id"
                  :searchable="true"
                  @search-change="search_broadcast(($event, search_broadcast_name = $event))"
                  :hide-selected="true"
                  :close-on-select="false"
                  :multiple="true"
                  :taggable="true"
                  placeholder="Search broadcast"
                  :max-height="400"
                  label="name"
                  track-by="id"
                  open-direction="up"
                >
                </multiselect>
            </div>
            </div>
            <div class="form-group">
              <h5>
                <p class="mt-2 mb-0" style="color: #414141">{{tlt('template_preview_label')}}</p>
              </h5>
              <div v-if="Boolean(preview_template_data)">
                <div class="cards" style="width: 50%; margin: 0px auto">
                  <!-- <div
                  v-for="(comp, name, index) in preview_template_data"
                  :key="index"
                > -->
                  <div v-if="Boolean(preview_template_data['HEADER'])">
                    <div v-if="preview_template_data['HEADER'].type == 'IMAGE'">
                      <img
                        :src="preview_template_data['HEADER'].body"
                        width="100%"
                      />
                    </div>
                    <div v-else>
                      <p>{{ preview_template_data["HEADER"].body }}</p>
                    </div>
                  </div>
                  <div
                    class="mt-4"
                    v-if="Boolean(preview_template_data['BODY'])"
                  >
                    <label
                      v-if="preview_template_data['BODY'].type == 'text'"
                      style="line-height: 1.5"
                    >
                      {{ preview_template_data["BODY"].body }}
                    </label>
                  </div>
                  <div v-if="Boolean(preview_template_data['FOOTER'])">
                    <span
                      v-if="preview_template_data['FOOTER'].type == 'text'"
                      style="
                        font-size: 10px;
                        line-height: 1.5;
                        font-weight: 300;
                      "
                    >
                      {{ preview_template_data["FOOTER"].body }}
                    </span>
                  </div>
                  <!-- </div> -->
                </div>
                <div v-if="Boolean(preview_template_data['BUTTON'])">
                  <div
                    v-for="(btn, index1) in preview_template_data['BUTTON']
                      .body"
                    :key="index1"
                  >
                    <div
                      v-if="btn['type'] === 'QUICK_REPLY'"
                      class="preview-button-div"
                      style="width: 50%; margin: 0px auto"
                    >
                      <button
                        color="rgba(11,103,170,1)"
                        class="btn preview-button"
                      >
                        <span color="rgba(11,103,170,1)" class=""
                          >{{ btn["text"] }}
                        </span>
                      </button>
                    </div>
                    <div
                      v-else-if="btn['type'] === 'URL'"
                      class="preview-button-div"
                      style="width: 50%; margin: 0px auto"
                    >
                      <a
                        :href="btn.url"
                        target="_blank"
                        class="btn preview-button"
                      >
                        <span color="#0b67aa" class=""
                          ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="17"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#0b67aa"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="mr-2"
                          >
                            <path
                              d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                            ></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line></svg>{{ btn["text"] }}</span
                        >
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="btn-wrap text-right mt-0 py-0 border-top-0">
              <button
                type="button"
                class="btn btn-link"
                data-dismiss="modal"
                @click="empty_variable"
              >
                {{tlt('cancel_btn')}}
              </button>
              <button
                type="submit"
                class="darkblue-btn"
                id="send_template"
                @click="send_template()"
              >
                {{tlt('send_btn')}}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="checkbalance"
      role="dialog"
      aria-labelledby="checkbalance"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-centered modal"
        role="document"
        style="max-width: 600px !important"
      >
        <div class="modal-content">
          <div class="modal-header">
            <!-- <i style='font-size:24px; padding-right: 10px; padding-top: 3px;' class='far'>&#xf27a;</i> -->
            <h5 class="modal-title">Your Add-ons Balance</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <img src="/img/close-icn.png" alt />
            </button>
          </div>
          <div class="modal-body">
            <div></div>
            <p v-show="credits_balance != null" v-html="credits_balance">
              &nbsp; &nbsp;
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      id="addcustomtemplate"
      class="modal fade dash-modal"
      role="dialog"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt />
              </div>
              <h3>{{tlt('custom_template_btn')}}</h3>
              <button
                type="button"
                class="close"
                @click="empty_variable"
                data-dismiss="modal"
              >
                <img src="/img/close-icn.png" alt />
              </button>
            </div>
            <div class="form-group">
              <h5 class="heading">{{tlt('template_name_label')}}</h5>
              <div class="ml-3">
                <input
                  id="template_name_add_id"
                  type="text"
                  v-model.trim="template_name"
                  v-on:keyup="validate_template_name"
                  class="form-control"
                  :placeholder="tlt('template_name_label')"
                />
                <span v-show="template_name_already_exist" style="color: red"
                  >{{tlt('template_name_already_exist_msg')}}</span          
                >
              </div>
            </div>
            <div class="form-group">
              <!-- <h5 class="heading">{{tlt('promotional_template_label')}}</h5> -->
              <h5 class="heading">{{tlt('custom_temp_body')}}</h5>
              <div class="container">
                <div class="row">
                  <div
                    class="col-sm-12 input_text_box"
                  >
                    <textarea 
                      class="input form-control"
                      v-model="custom_text_box_content"
                      id="custom_text_box"
                      :placeholder="tlt('custom_template_body')"
                      @keydown="expand_textbox('#custom_text_box')"  
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group"> 
              <!-- <h5 class="heading">{{tlt('promotional_template_label')}}</h5> -->
              <h5 class="heading">{{tlt('custom_temp_media_option')}}</h5>
                <div class="radio ml-4 mb-2 ">
                  <label
                    style="vertical-align: text-top; font-size: 17px"
                  >
                    {{tlt('custom_temp_media_option_img')}}
                    <input
                      type="radio"
                      value="image"
                      v-model="custom_template_option"
                    />
                    <span class="icn" id="display_product_type_id"></span>
                  </label>
                  <label
                    style="vertical-align: text-top; font-size: 17px"
                  >
                     {{tlt('custom_temp_media_option_vid')}}
                    <input
                      type="radio"
                      value="video"
                      v-model="custom_template_option"
                    />
                    <span class="icn" id="display_product_type_id"></span>
                  </label>
                </div>
                <div v-if="custom_template_option != ''" 
                  class="radio ml-4 mb-2">
                  <label
                  class="ml-0"
                    style="vertical-align: text-top; font-size: 17px"
                  >
                    {{tlt('custom_temp_media_option_file')}}
                    <input
                      type="radio"
                      value="file"
                      v-model="custom_template_type"
                    />
                    <span class="icn" id="display_product_type_id"></span>
                  </label>
                  <label
                    style="vertical-align: text-top; font-size: 17px"
                  >
                    {{tlt('custom_temp_media_option_url')}}
                    <input
                      type="radio"
                      value="url"
                      v-model="custom_template_type"
                    />
                    <span class="icn" id="display_product_type_id"></span>
                  </label>
                </div>
                <div class="container">
                  <div class="col-sm-12">
                    <label v-if="custom_template_option === 'image'"
                        >({{tlt('custom_temp_label_img')}})</label>
                      <label v-show="custom_template_option ==='video'"
                        >({{tlt('custom_temp_label_vid')}})
                      </label>
                    <div v-show="custom_template_option == 'image'">
                      <div v-if="custom_template_type == 'file'"> 
                        <input
                          type="file"
                          class="form-control mt-1"
                          @change ="upload_image_custom_temp"
                          :placeholder="tlt('enter_website_url')"
                          style="padding: 5px"
                          id="customimagefile"
                          :disabled="disable_btn_expired"
                        />
                      </div>
                      <div v-else> 
                        <input
                        type="text"
                        v-model.trim="custom_template_img_url"
                        class="form-control input-tag"
                        :placeholder="tlt('img_url')"
                        style="
                          width: 100% !important;
                          padding: 0.375rem 0.5rem;
                        "
                         />
                        <p
                          v-show="
                            check_img_url(custom_template_img_url) ===
                              false && Boolean(custom_template_img_url)
                          "
                          style="
                            color: red !important;
                            margin-bottom: 0px !important;
                            padding-top: 8px !important;
                          "
                        >
                          {{tlt('custom_temp_image_condition_text')}}
                        </p>
                      </div>
                    </div>
                    <div v-show="custom_template_option == 'video'">
                      <div v-if="custom_template_type == 'file'"> 
                        <input
                          type="file"
                          class="form-control mt-1"
                          accept="video/mp4"
                          id="customvideofile"
                          @change ="upload_video_custom_temp"
                          :placeholder="tlt('enter_website_url')"
                          style="padding: 5px"
                          :disabled="disable_btn_expired"
                        />
                      </div>
                      <div v-else>
                        <input
                        type="text"
                        v-model.trim="custom_template_video_url"
                        class="form-control input-tag"
                        :placeholder="tlt('video_url')"
                        style="
                          width: 100% !important;
                          padding: 0.375rem 0.5rem;
                        "
                         />
                        <p
                          v-show="
                            check_video_url(custom_template_video_url) ===
                              false && Boolean(custom_template_video_url)
                          "
                          style="
                            color: red !important;
                            margin-bottom: 0px !important;
                            padding-top: 8px !important;
                          "
                        >
                          {{tlt('card_response_video_condition_text')}}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="btn-wrap text-right mt-0 py-0 border-top-0">
              <button
                type="button"
                class="btn btn-link"
                data-dismiss="modal"
                @click="empty_variable()"
              >
                {{tlt('cancel_btn')}}
              </button>
              <button
                type="submit"
                class="darkblue-btn"
                id="custom_template_save"
                @click="save_custome_template()"
              >
                {{tlt('save_btn')}}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import axios from "axios";
import Swal from "sweetalert2";
import api_calls from "@/portal/api_calls";
import { freeze_portal, show_subscription_expired_swal , close_modal } from "@/portal/mixins";
import Multiselect from "vue-multiselect";
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";

export default {
  name: "WhatsappTemplatePage",
  components: {
    VueEditor,
    Multiselect,
    VuePhoneNumberInput,
  },
  mixins: [freeze_portal, show_subscription_expired_swal , close_modal],
  data() {
    return {
      cont: ["IN"],
      pencil_svg:
        ' <svg xmlns="http://www.w3.org/2000/svg" width="15.546" height="15.461" viewBox="0 0 15.546 15.461"><defs><style>.a{fill:#9e9e9e;}</style></defs><g transform="translate(-747.888 -356.769)"><path class="a" d="M759.416,356.769a2.358,2.358,0,0,1,1.777.662c.534.513,1.072,1.025,1.567,1.575a2.3,2.3,0,0,1-.071,3.325c-2.736,2.76-5.494,5.5-8.238,8.251a1.381,1.381,0,0,1-.758.288c-.719.174-1.429.379-2.144.572-.932.251-1.862.5-2.795.751-.6.158-.989-.213-.832-.807q.689-2.595,1.406-5.182a1.164,1.164,0,0,1,.289-.487q4.091-4.107,8.2-8.2A2.265,2.265,0,0,1,759.416,356.769Zm-1.989,2.956-6.54,6.538,3.025,3.024,6.538-6.537Zm4.023,2.165c.118-.135.225-.269.343-.392a1.134,1.134,0,0,0,0-1.734c-.46-.466-.926-.925-1.388-1.39a1.166,1.166,0,0,0-.861-.368c-.578,0-.881.4-1.214.76Zm-12.084,8.863,3.2-.863-2.337-2.331Z" transform="translate(0)"/><path class="a" d="M813.942,422.6l-.789-.8,3.821-3.819.784.8Z" transform="translate(-59.648 -55.947)"/></g></svg>',
      company_id: this.$session.get("UserInformation").company_id,
      company_name: this.$session.get("UserInformation").company_name,
      spinnerOn: false,
      template_name: "",
      save_subject: "",
      is_publish_template: true,
      verification_status: null,
      default_templatelist: [],
      templatelist: [],
      checked_list: [],
      current_template: [],
      old_template_name: "",
      isEditTemplate: false,
      number_of_rows: null,
      total_pages: null,
      page_no: 1,
      per_page: 10,
      preview_template_data: null,
      preview_template_data1: {
        HEADER: {
          type: "IMAGE",
          body: "https://storage.cense.ai/codearray/cense_website_static_assets/retail/AvailableDiscounts.svg",
        },
        BODY: {
          type: "text",
          body: "Hello WOrld",
        },
        FOOTER: {
          type: "text",
          body: "World, hello !",
        },
        BUTTON: {
          body: [
            {
              type: "URL",
              label: "Know more",
              body: "https://test.com",
            },
            {
              type: "URL",
              label: "Know more",
              body: "https://test.com",
            },
          ],
        },
      },
      template_name_already_exist: false,
      edit_template_name_already_exist: false,
      page_array: [],
      send_template_all_customer: true,
      contacts_list: [],
      contacts_list_pagination: 1,
      contacts_list_pagination_count: 0,
      broadcast_list_search_pagination: 1,
      broadcast_list_search_pagination_count: 0,
      broadcast_list_pagination: 1,
      broadcast_list_pagination_count: 0,
      search_broadcast_name: "",
      broadcast_list: [],
      select_broadcast_list: [],
      search_customer: "",
      specific_contact_list: [],
      disable_btn_expired: false,
      choosen_template: null,
      isVisibleSearchClear: false,
      search_name: "",
      add_customer_contact_number: null,
      add_customer_name: null,
      phoneNumber: null,
      credits_balance: null,
      send_to: 'specific',
      custom_template_type: 'file',
      reg_video_url:
        /https:\/\/[(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/i,
      reg_image:
        /(https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg|.jpeg|.gif)(\?[^\s[",><]*)?/,
      custom_template_name: '',
      custom_text_box_content: '',
      custom_template_option:'',
      custom_template_img_file:null,
      custom_template_img_file_name:'',
      custom_template_video_file:null,
      custom_template_video_file_name:'',
      custom_template_img_url: '',
      custom_template_video_url:''
    };
  },
  props: {
    is_notification_template: Boolean,
  },
  created() {
    if (this.$session.get("UserInformation").role == "SuperAdmin") {
      this.companyid = this.$session.get("CompanyId");
      this.companyname = this.$session.get("CompanyName");
    } else {
      this.companyid = this.$session.get("UserInformation").company_id;
      this.companyname = this.$session.get("UserInformation").company_name;
    }
  },
  watch: {
    search_name() {
      if (this.search_name === "") {
        this.load_templates();
        this.isVisibleSearchClear = false;
      } else if (this.search_name !== "") {
        this.isVisibleSearchClear = true;
      }
    },
    choosen_template: {
      handler(val, oldVal) {
        if (this.choosen_template != null) {
          this.preview_template("new");
        }
      },
      deep: true,
    },
    current_template: {
      handler(val, oldVal) {
        if (this.current_template.length != 0) {
          this.preview_template("old");
        }
      },
      deep: true,
    },
  },
  mounted() {
    setTimeout(() => {
      this.freeze_portal();
    }, 2000);
    this.load_templates();
    if (this.is_notification_template === false) {
      this.load_customer_list();
      this.get_broadcast();
    }
    var vm = this;
    $("#selectall").click(function () {
      this.isEditTemplate = false;
      if ($(this).is(":checked")) {
        $("input:checkbox").prop("checked", true);
      } else {
        vm.checked_list = [];
        $("input:checkbox").prop("checked", false);
      }
    });
    const el = document.querySelector("#list_id");
    el.onwheel = this.handleWheel;
    const el1 = document.querySelector("#broadcast_list_id");
    el1.onwheel = this.handleWheel_broadcast;
  },
  methods: {
    handleWheel_broadcast(event, data, func) {
      if (event.deltaY > 0) {
        if(this.search_broadcast_name != ""){
          if (
            this.broadcast_list_search_pagination < this.broadcast_list_search_pagination_count
          ){
            this.broadcast_list_search_pagination += 1;
            this.search_broadcast(this.search_broadcast_name, 'scroll');
          }
        }else if (
          this.broadcast_list_pagination < this.broadcast_list_pagination_count
        ) {
          this.broadcast_list_pagination += 1;
          this.get_broadcast('scroll');
        }
      }
    },
    handleWheel(event, data, func) {
      if (event.deltaY > 0) {
        if(this.contacts_list_pagination < this.contacts_list_pagination_count) {
          this.contacts_list_pagination += 1;
          this.load_customer_list();
        }else if(this.search_customer != "") {
          this.search_customer_list();
        }
      }
    },
    get_broadcast(type){
      if(type !=='scroll'){
        this.broadcast_list_pagination = 1;
      }
      axios
        .post(
          api_calls.whatsapp_broadcasts(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            is_get: true,
            page_no: this.broadcast_list_pagination,
            per_page: this.page_no,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          this.spinnerOn = false;
          if(type !== 'scroll'){
            this.broadcast_list = [];
          }
          if (
            response.data.message.MSG_CODE ===
            this.api_status_code.DATA_AVAILABLE.MSG_CODE
          ) {
            for (var i in response.data.data.broadcasts) {
              this.broadcast_list.push(response.data.data.broadcasts[i]);
            }
            this.broadcast_list_pagination_count =
              response.data.pagination.total_page;
          } else if (
            response.data.message.MSG_CODE ===
            this.api_status_code.NO_DATA_AVAILABLE.MSG_CODE
          ) {
            this.broadcast_list = [];
          } else {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              type: "error",
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
    search_broadcast(query, type){
      if(query != ""){
        if(type !== 'scroll'){
          this.broadcast_list_search_pagination = 1;
        }
        axios
          .post(
            api_calls.whatsapp_broadcasts(),
            {
              company_id: this.company_id,
              company_name: this.company_name,
              is_search: true,
              page_no: this.broadcast_list_search_pagination,
              search_key: query,
              per_page: this.page_no,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            this.spinnerOn = false;
            if(type !== 'scroll'){
              this.broadcast_list = [];
            }
            if (
              response.data.message.MSG_CODE ===
              this.api_status_code.DATA_AVAILABLE.MSG_CODE
            ) {
              for (var i in response.data.data.broadcasts) {
                this.broadcast_list.push(response.data.data.broadcasts[i]);
              }
              this.broadcast_list_search_pagination_count =
                response.data.pagination.total_page;
            } else if (
              response.data.message.MSG_CODE ===
              this.api_status_code.NO_WHATSAPP_TEMPLATE.MSG_CODE
            ) {
              this.broadcast_list = [];
            } else {
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                type: "error",
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
      }else {
        this.get_broadcast();
      }
    },
    add_customer() {
      if (this.phoneNumber != null && this.phoneNumber.isValid == true) {
        this.contacts_list.push({
          whatsapp_phone_number: this.phoneNumber.formattedNumber,
           profile_name: this.phoneNumber.formattedNumber,
        });
        this.specific_contact_list.push({
           whatsapp_phone_number: this.phoneNumber.formattedNumber,
            profile_name: this.phoneNumber.formattedNumber,
        });
      } else {
        Swal({
          text: "Please enter a valid phone number",
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    },
    check_addons_balance() {
      axios
        .post(
          api_calls.check_addons_balance(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            check_balance: true,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          if (this.api_status_code.CHECK_BALANCE.MSG_CODE === response.data.message.MSG_CODE) {
            var template_count = response.data.data.credits.sms_count;
            this.credits_balance =
            "Your current SMS credits are <strong> for US region :" +
            template_count.us +
            " | for Non-US region: " +
            template_count.non_us +
            "</strong>";
            $("#checkbalance").modal("show");
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
      if (this.search_name != "") {
        this.spinnerOn = true;
        axios
          .post(
            api_calls.whatsapp_template(),
            {
              company_id: this.company_id,
              company_name: this.company_name,
              is_search: true,
              page_no: 1,
              per_page: this.per_page,
              is_notification: this.is_notification_template,
              search_key: this.search_name,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            this.spinnerOn = false;
            this.templatelist = [];
            if(this.api_status_code.DATA_AVAILABLE.MSG_CODE === response.data.message.MSG_CODE) {
              this.templatelist = response.data.templates;
              if (this.templatelist.length > 0) {
                this.show_template(0);
              }
              this.number_of_rows = response.data.pagination.total_data;
              this.total_pages = response.data.pagination.total_page;
              this.setpagination(1);
            } else if(this.api_status_code.NO_WHATSAPP_TEMPLATE.MSG_CODE === response.data.message.MSG_CODE) {
                this.templatelist = [];
                return;
            } else {
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                type: "error"
              })
            }
            this.isEditTemplate = false;
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
    },
    save_template() {
      if (this.template_name == "") {
        Swal({
          text: this.tlt('template_name_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      }
      if (this.choosen_template != null) {
        var check = false;
        for (var i in this.choosen_template.variable_list) {
          if (this.choosen_template.variable_list[i] == "") {
            check = true;
          }
        }
        if (check) {
          Swal({
            text: this.tlt('variable_value_msg'),
            toast: true,
            position: "top-end",
            type: "warning",
            showConfirmButton: false,
            timer: 2500,
          });
          return;
        }
      }
      if (this.template_name_already_exist == true) {
        return;
      }
      var template_details = {
        template_name: this.template_name,
        parent_template_id: this.choosen_template.template_id,
        variable_dict: this.choosen_template.variable_dict,
      };
      // return;
      this.spinnerOn = true;
      axios
        .post(
          api_calls.whatsapp_template(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            is_save: true,
            is_notification: this.is_notification_template,
            template_details: template_details,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          this.spinnerOn = false;
          if (this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE === response.data.message.MSG_CODE) {
            $("#addtemplatemodel").modal("hide");
            Swal({
              type: "success",
              text: this.tlt('template_data_added'),
              timer: 2500,
            }).then((result) => {
              this.empty_variable();
              this.load_templates();
            });
          } else if (
            this.api_status_code.PARENT_TEMPLATE_NOT_FOUND.MSG_CODE === response.data.message.MSG_CODE
          ) {
            Swal({
              type: "error",
              text: this.tlt('parent_template_not_found'),
              timer: 2500,
            });
          } else if (this.api_status_code.UNSUCCESSFUL_DB_OPERATION.MSG_CODE === response.data.message.MSG_CODE) {
            Swal({
              type: "error",
              text: this.tlt('db_operation_unsuccess'),
              timer: 2500,
            });
          } else if (
            this.api_status_code.TEMPLATE_DETAILS_MISSING.MSG_CODE === response.data.message.MSG_CODE
          ) {
            Swal({
              type: "warning",
              text: this.tlt('template_detail_missing'),
              timer: 2500,
            });
          } else {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              type: "error"
            })
          }
          this.isEditTemplate = false;
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
        this.close_modal('res_n_int_save');
    },
    edit_template_details() {
      if (!this.isEditTemplate) {
        this.isEditTemplate = true;
      } else {
        this.isEditTemplate = false;
        this.load_templates();
        this.edit_template_name_already_exist = false;
      }
    },
    edit_template() {
      if (this.current_template.template_name == "") {
        Swal({
          text: this.tlt('edit_template_name_blank'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      }
      if (this.current_template != null) {
        var check = false;
        for (var i in this.current_template.variable_dict) {
          if (this.current_template.variable_dict[i] == "") {
            check = true;
          }
        }
        if (check) {
          Swal({
            text: this.tlt('edit_template_value_empty_msg'),
            toast: true,
            position: "top-end",
            type: "warning",
            showConfirmButton: false,
            timer: 2500,
          });
          return;
        }
      }
      if (this.edit_template_name_already_exist == true) {
        return;
      }
      this.spinnerOn = true;
      var template_details = {
        template_name: this.current_template.template_name,
        template_id: this.current_template.template_id,
        variable_dict: this.current_template.variable_dict,
      };
      axios
        .post(
          api_calls.whatsapp_template(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            template_details: template_details,
            is_edit: true,
            is_notification: this.is_notification_template,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          this.spinnerOn = false;
          if (response.data.message.MSG_CODE === this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE) {
            $("#addtemplatemodel").modal("hide");
            Swal({
              type: "success",
              text: this.tlt('edit_template_data_edited'),
              timer: 2500,
            }).then((result) => {
              this.empty_variable();
              this.load_templates();
            });
          } else if(response.data.message.MSG_CODE == this.api_status_code.SELECTED_TEMPLATE_NOT_FOUND.MSG_CODE) {
            Swal({
              type: "error",
              text: this.tlt('edit_template_selected_template'),
              timer: 2500,
            });
          } else if(response.data.message.MSG_CODE == this.api_status_code.UNSUCCESSFUL_DB_OPERATION.MSG_CODE)  {
            Swal({
              type: "error",
              text: this.tlt('edit_template_operation_unsuccessful'),
              timer: 2500,
            });
          } else if(response.data.message.MSG_CODE == this.api_status_code.TEMPLATE_DETAILS_MISSING.MSG_CODE) {
            Swal({
              type: "error",
              text: this.tlt('edit_template_detail_missing'),
              timer: 2500,
            });
          } else {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              type: "error"
            })
          }
          this.isEditTemplate = false;
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
    load_customer_list() {
      this.spinnerOn = true;
      axios
        .post(
          api_calls.whatsapp_template(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            get_contacts_list: true,
            per_page: 5,
            page_no: this.contacts_list_pagination,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          this.spinnerOn = false;
          if (response.data.message.MSG_CODE === this.api_status_code.DATA_AVAILABLE.MSG_CODE) {
            for(var i in response.data.contacts_list) {
              this.contacts_list.push(response.data.data.contacts_list[i]);
            }
            this.contacts_list_pagination_count = response.data.pagination.total_page;
          } else if (response.data.message.MSG_CODE === this.api_status_code.NO_CONTACTS_DATA_AVAILABLE.MSG_CODE) {
            this.contacts_list = [];
          } else {
            Swal({
              text: this.tlt('some_error_msg'),
              type: "error",
              showConfirmButton: false,
              timer: 2500,
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
    search_customer_list(query) {
      if (query != "") {
        this.spinnerOn = true;
        axios
        .post(
          api_calls.whatsapp_template(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            get_contacts_list: true,
            search_key: query,
            per_page: 5,
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
          this.contacts_list = [];
          this.spinnerOn = false;
          if (response.data.message.MSG_CODE === this.api_status_code.DATA_AVAILABLE.MSG_CODE) {
            for(var i in response.data.contacts_list) {
              this.contacts_list.push(response.data.data.contacts_list[i]);
            }
            this.contacts_list_pagination_count = response.data.pagination.total_page;
          } else if (response.data.message.MSG_CODE === this.api_status_code.NO_CONTACTS_DATA_AVAILABLE.MSG_CODE) {
            this.contacts_list = [];
          } else {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              type: "info",
              toast: true
            })
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
        this.contacts_list_pagination = 1;
        this.contacts_list = [];
        this.load_customer_list();
      }
    },
    send_template() {
      var list = [];
      var select_list = [];
      if(this.send_to === 'specific') {
        if (this.specific_contact_list.length != 0) {
          for (var i in this.specific_contact_list) {
            list.push(this.specific_contact_list[i].whatsapp_phone_number);
          }
        } else {
          Swal({
            title: this.tlt('send_template_select_contact'),
            type: "warning",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
          });
          return;
        }
      }
      if(this.send_to === 'broadcast') {
        if (this.select_broadcast_list.length != 0) {
          for (var i in this.select_broadcast_list) {
            select_list.push(this.select_broadcast_list[i].id);
          }
        } else {
          Swal({
            title: this.tlt('Select atleast one broadcast'),
            type: "warning",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
          });
          return;
        }
      }
      if (!this.disable_btn_expired) {
        axios
          .post(
            api_calls.whatsapp_template(),
            {
              company_name: this.companyname,
              company_id: this.companyid,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              subscription: this.$session.get("UserInformation").subscription,
              is_notification: this.is_notification_template,
              template_id: this.send_to === 'broadcast' ?  [this.current_template.template_id] : this.current_template.template_id,
              contacts_list: list,
              broadcast_ids: select_list,
              publish_template: true,
              send_to: this.send_to
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            if(this.api_status_code.EMPTY_CONTACT_LIST.MSG_CODE === response.data.message.MSG_CODE) {
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                type: "error"
              })
              return;
            
            }else if(this.api_status_code.WHATSAPP_MEDIA_SEND_FAILURE.MSG_CODE === response.data.message.MSG_CODE) {
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                type: "error"
              })
              return;
            } else if (this.api_status_code.WHATSAPP_USER_LIMIT_REACHED.MSG_CODE === response.data.message.MSG_CODE) {
                Swal({
                  title: this.tlt('tier_specific_user_limit_reached'),
                  text: this.tlt('tier_specific_user_limit_reached_msg'),
                  type: "warning",
                  showConfirmButton: false,
                  timer: 4000,
                });
                return
            } else if (this.api_status_code.MESSAGE_SENDING_LIMIT_REACHED.MSG_CODE === response.data.message.MSG_CODE) {
                Swal({
                  type: "warning",
                  text: "Message Sending Limit Reached",
                  showCancelButton: true,
                  confirmButtonColor:'#3085d6',
                  confirmButtonText: this.tlt('email_temp_swal_upgrade_now_msg'),
                  cancelButtonText: this.tlt('email_temp_swal_upgrade_later_msg'),
                  cancelButtonColor: '#d33',
                }).then((result) => {
                    if (result.value == true)
                    {
                      this.$router.push({name: 'Settings',params:{Subscription:true}});     
                    }
                  });
                  return
            }else if (this.api_status_code.SENDING_TEMPLATE.MSG_CODE === response.data.message.MSG_CODE) {
              Swal({
                title: this.tlt('send_template_sent_msg'),
                type: "success",
                showConfirmButton: false,
                timer: 2500,
              });
              this.empty_variable();
              $("#sendtemplate").modal("hide");
            } else if (this.api_status_code.WHATSAPP_OPT_OUT_CONTACTS.MSG_CODE === response.data.message.MSG_CODE) {
          Swal({
              text: this.tlt('All_contacts_have_opted_out_of_getting_templates'),
            type: "eroor",
            showConfirmButton: false,
              timer: 4000,
            });
            this.empty_variable();
              $("#sendtemplate").modal("hide");
        }else {
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                type: "error"
              })
              return
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
        //  let btn =document.getElementById("send_template");
        //       btn.setAttribute("data-dismiss" , "modal");
        //       // $(`#${id}`).attr("data-dismiss","modal"); 
        //       console.log('attached' )
        //       setTimeout(()=>{
        //           // $(`#${id}`).attr("data-dismiss","modal"); 
        //           btn.removeAttribute("data-dismiss");
        //           console.log('removed') 
        //       },100)
        this.close_modal("send_template");
      } else {
        this.show_subscription_expired_swal();
      }
    },
    validate_template_name() {
      axios
        .post(
          api_calls.whatsapp_template(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            is_template_name_exists: true,
            is_notification: this.is_notification_template,
            template_name: this.template_name,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          if (
            this.api_status_code.WHATSAPP_TEMPLATE_NAME_DOES_NOT_EXISTS.MSG_CODE === response.data.message.MSG_CODE
          ) {
            this.template_name_already_exist = false;
            document.getElementById("template_name_add_id").style.border = null;
            if (this.template_name != "") {
              // document.getElementById("template_name_add_id").style.border =
              // "1px solid green";
            }
          } else if (
            this.api_status_code.WHATSAPP_TEMPLATE_NAME_EXISTS.MSG_CODE === response.data.message.MSG_CODE
          ) {
            this.template_name_already_exist = true;
            document.getElementById("template_name_add_id").style.border =
              "1px solid red";
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
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    validate_edit_template_name() {
      axios
        .post(
          api_calls.whatsapp_template(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            subscription: this.$session.get("UserInformation").subscription,
            is_template_name_exists: true,
            is_notification: this.is_notification_template,
            template_name: this.current_template.template_name,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          if (
            this.api_status_code.WHATSAPP_TEMPLATE_NAME_DOES_NOT_EXISTS.MSG_CODE === response.data.message.MSG_CODE
          ) {
            this.edit_template_name_already_exist = false;
            document.getElementById("edit_template_name_id").style.border =
              null;
            if (this.current_template.template_name != "") {
              // document.getElementById("edit_template_name_id").style.border =
              // "1px solid #00f000";
            }
          } else if (
            this.api_status_code.WHATSAPP_TEMPLATE_NAME_EXISTS.MSG_CODE === response.data.message.MSG_CODE
          ) {
            if (this.old_template_name == this.current_template.template_name) {
              this.edit_template_name_already_exist = false;
              document.getElementById("edit_template_name_id").style.border =
                null;
            } else {
              this.edit_template_name_already_exist = true;
              document.getElementById("edit_template_name_id").style.border =
                "1px solid red";
            } 
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
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    preview_template(val) {
      this.spinnerOn = true;
      if (val == "old") {
        var template_id = this.current_template.template_id;
        var variable_dict = this.current_template.variable_dict;
        var is_parent_template = false;
      } else if (val == "new") {
        var template_id = this.choosen_template.template_id;
        var variable_dict = this.choosen_template.variable_dict;
        var is_parent_template = true;
      }
      if (template_id != undefined) {
        axios
          .post(
            api_calls.whatsapp_template(),
            {
              company_id: this.company_id,
              company_name: this.company_name,
              is_notification: this.is_notification_template,
              is_preview: true,
              is_parent_template: is_parent_template,
              template_id: template_id,
              variable_dict: variable_dict,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            this.spinnerOn = false;
            if (this.api_status_code.DATA_AVAILABLE.MSG_CODE === response.data.message.MSG_CODE){
              this.preview_template_data = response.data.data.body;
              // $("#preview_template_visible").modal("show");
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
    },
    send_email_confirm_prompt_text(all_customer) {
      if (all_customer) {
        return this.tlt('send_bulk_msg');
      } else {
        return this.tlt('email_to_specific_customer');
      }
    },
    selected_templates(value) {
      if (value == "all") {
        if (event.target.checked) {
          this.checked_list = [];
          for (var i in this.templatelist) {
            this.checked_list.push(this.templatelist[i].template_id);
          }
          $("input:checkbox").prop("checked", false);
          for (let i = 0; i < this.checked_list.length; i++) {
            $("#" + [i]).prop("checked", true);
            $("#selectall").prop("checked", true);
          }
        } else if (!event.target.checked) {
          this.checked_list = [];
          $("input:checkbox").prop("checked", false);
        }
      } else {
        if (event.target.checked) {
          this.checked_list.push(value);
        } else if (!event.target.checked) {
          var selectall = document.querySelector("#selectall");
          if (selectall.checked) {
            selectall.checked = false;
          }
          var temp = this.checked_list.filter((templates_id) => {
            return templates_id != value;
          });
          this.checked_list = temp;
        }
      }
    },
    delete_template() {
      if (this.checked_list.length < 1) {
        Swal({
          text: this.tlt('select_one_template'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      }
      this.spinnerOn = true;
      axios
        .post(
          api_calls.whatsapp_template(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            is_notification: this.is_notification_template,
            is_delete: true,
            template_list: this.checked_list,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          this.spinnerOn = false;
          this.empty_variable();
          this.load_templates();
          if (response.data.message.MSG_CODE === this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE) {
            this.checked_list = [];
              Swal({
                text: this.tlt('template_deleted_msg'),
                type: "success",
                showConfirmButton: false,
                timer: 2500,
              });
              $("input:checkbox").prop("checked", false);
              return;
          } else if(response.data.message.MSG_CODE == this.api_status_code.UNSUCCESSFUL_DB_OPERATION.MSG_CODE) {
            this.checked_list = [];
            Swal({
              text: this.tlt('query_executed_msg'),
              type: "error",
              showConfirmButton: false,
              timer: 2500,
            });
          } else {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              type: "error"
            })
            $("input:checkbox").prop("checked", false);
          }
          this.isEditTemplate = false;
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
    load_templates() {
      this.current_template = {};
      // Get default templates
      this.spinnerOn = true;
      axios
        .post(
          api_calls.whatsapp_template(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            is_notification: this.is_notification_template,
            is_get_default_templates: true,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          this.spinnerOn = false;
          if (this.api_status_code.DATA_AVAILABLE.MSG_CODE === response.data.message.MSG_CODE){
            this.default_templatelist = response.data.data.default_templates;
          } else if(this.api_status_code.NO_DEFAULT_WHATSAPP_TEMPLATE.MSG_CODE === response.data.message.MSG_CODE) {
            this.default_templatelist = [];
          } else {
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                type: "error"
              })
          }
          this.isEditTemplate = false;
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

      // Get Saved Templates
      axios
        .post(
          api_calls.whatsapp_template(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            is_get: true,
            is_notification: this.is_notification_template,
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
          if (response.data.message.MSG_CODE === this.api_status_code.DATA_AVAILABLE.MSG_CODE) {
            this.templatelist = [];
            this.templatelist = response.data.data.templates;
            this.number_of_rows = response.data.pagination.total_data;
            this.total_pages = response.data.pagination.total_page;
            if (this.templatelist.length > 0) {
              this.show_template(0);
            }
            this.setpagination(this.page_no);
           
            this.isEditTemplate = false;
          } else if(response.data.message.MSG_CODE === this.api_status_code.NO_WHATSAPP_TEMPLATE.MSG_CODE) {
            this.templatelist = [];
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
              api_calls.whatsapp_template(),
              {
                company_id: this.company_id,
                company_name: this.company_name,
                is_get: true,
                is_notification: this.is_notification_template,
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
              if (response.data.message.MSG_CODE === this.api_status_code.DATA_AVAILABLE.MSG_CODE) {
                this.templatelist = [];
                this.templatelist = response.data.data.templates;
                this.number_of_rows = response.data.pagination.total_data;
                this.total_pages = response.data.pagination.total_page;
                if (this.templatelist.length > 0) {
                  this.show_template(0);
                }
                this.setpagination(this.page_no);
              
                this.isEditTemplate = false;
              } else if(response.data.message.MSG_CODE === this.api_status_code.NO_WHATSAPP_TEMPLATE.MSG_CODE) {
                this.templatelist = [];
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
              api_calls.whatsapp_template(),
              {
                company_id: this.company_id,
                company_name: this.company_name,
                is_search: true,
                page_no: this.page_no,
                per_page: this.per_page,
                is_notification: this.is_notification_template,
                search_key: this.search_name,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.spinnerOn = false;
              this.templatelist = [];
              this.isEditTemplate = false;
              if(this.api_status_code.DATA_AVAILABLE.MSG_CODE === response.data.message.MSG_CODE) {
                this.templatelist = response.data.templates;
                if (this.templatelist.length > 0) {
                  this.show_template(0);
                }
                this.number_of_rows = response.data.pagination.total_data;
                this.total_pages = response.data.pagination.total_page;
                this.setpagination(1);
              } else if(this.api_status_code.NO_WHATSAPP_TEMPLATE.MSG_CODE === response.data.message.MSG_CODE) {
                  this.templatelist = [];
                  return;
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
    show_template(index) {
      this.current_template = JSON.parse(
        JSON.stringify(this.templatelist[index])
      );
      this.old_template_name = this.current_template.template_name;
      this.current_template_index = index;
      this.isEditTemplate = false;
      this.preview_template("old");
    },
    empty_variable() {
      if (!this.disable_btn_expired) {
        this.choosen_template = null;
        this.specific_contact_list = [];
        this.template_name = "";
        this.old_template_name = "";
        this.custom_template_type = 'file';
        this.custom_template_name = "";
        this.custom_text_box_content = "";
        this.custom_template_option ="";
        this.custom_template_img_file = null;
        this.custom_template_img_file_name = "";
        this.custom_template_video_file =null;
        this.custom_template_video_file_name ="";
        this.custom_template_img_url = "";
        this.custom_template_video_url ="";
        if ( document.getElementById("customimagefile") != null && document.getElementById("customimagefile").value != ""){
          document.getElementById("customimagefile").value = "" ;
        }
        if(document.getElementById("customvideofile") != null && document.getElementById("customvideofile").value != ""){
          document.getElementById("customvideofile").value = "" ;
        }
        if (this.current_template.length != 0) {
          this.preview_template("old");
        } else {
          this.preview_template_data = null;
        }
        this.template_name_already_exist = false;
        document.getElementById("template_name_add_id").style.border = null;
      } else {
        this.show_subscription_expired_swal();
      }
    },
    check_current_template_active(index) {
      // console.table(index, this.templatelist[index], this.current_template);
      if (Boolean(this.templatelist[index]) === true) {
        return this.templatelist[index].template_name ===
          this.current_template.template_name
          ? "current-active-template"
          : null;
      }
    },
    expand_textbox(id,key){
      var textarea = document.querySelector(id);
      textarea.addEventListener('keydown', e =>{
        let scroll_height =e.target.scrollHeight;
        textarea.style.height = `${scroll_height}px`
      });
    },
    upload_image_custom_temp(e){      
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      if (files[0].size > 2097152) {
        swal({
          text: "Upload image with size less than 2MB",
          toast: true,
          position: "top-end",
          type: "error",
          showConfirmButton: false,
          timer: 10000,
        });
        return;
      }
      if (files[0].type === "image/png" || files[0].type === "image/jpeg") {
        this.custom_template_img_file_name =files[0].name;
        this.create_image(files[0]);
      } else {
        toastr.error("Please Select an Image of type PNG or JPEG");
      }   
    },
    upload_video_custom_temp(e){      
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      if (files[0].size > 2097152) {
        swal({
          text: "Upload image with size less than 2MB",
          toast: true,
          position: "top-end",
          type: "error",
          showConfirmButton: false,
          timer: 10000,
        });
        return;
      }
      if (files[0].type === "video/mp4") {
        this.custom_template_video_file_name = files[0].name;
        this.create_video(files[0]);
      } else {
        toastr.error("Please Select an Video of type MP4upload_image_custom_temp");
      }   
    },
    create_image(file, type) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.custom_template_img_file = e.target.result.split("base64,")[1];
      };
      reader.readAsDataURL(file);
    },
    create_video(file, type) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.custom_template_video_file = e.target.result.split("base64,")[1];
      };
      reader.readAsDataURL(file);
    },
    check_video_url(url) {
      if (this.reg_video_url.test(url) === true) {
        return true;
      } else {
        return false;
      }
    },
    check_img_url(url){
      if (this.reg_image.test(url) === true) {
        return true;
      } else {
        return false;
      }
    },
    save_custome_template(){
      if (this.template_name == "") {
        Swal({
          text: this.tlt('template_name_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 3000,
        });
        return;
      }
      if (this.custom_text_box_content == ""|| this.custom_text_box_content.length ==0) {
        Swal({
          text: 'Template body can not be empty',
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 3000,
        });
        return;
      }
      if (this.custom_template_img_file == null && this.custom_template_video_file == null && 
          this.custom_template_option !="" && this.custom_template_type == 'file') {
        Swal({
          text: 'Please choose a file',
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 3000,
        });
        return;
      }
      if (this.custom_template_img_url == "" && this.custom_template_video_url == ""&&
          this.custom_template_option !="" && this.custom_template_type != 'file') {
        Swal({
          text: 'Please enter valid url',
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 3000,
        });
        return;
      }
      if(this.custom_template_type == 'url'){
        let is_video_url_valid = this.check_video_url(this.custom_template_video_url);
        let is_img_url_valid =this.check_img_url(this.custom_template_img_url);
        if(is_video_url_valid != true && is_img_url_valid != true){
          Swal({
            text: 'Please enter valid url',
            toast: true,
            position: "top-end",
            type: "warning",
            showConfirmButton: false,
            timer: 3000,
          });
          return
        }
      } 
      var template_details ={
        is_file_type:this.custom_template_option,
        is_file: this.custom_template_type == "file"? true:false,
        template_name : this.template_name,
        template_body:this.custom_text_box_content,
        custom_template_img_file : this.custom_template_img_file,
        custom_template_img_file_name : this.custom_template_img_file_name,
        custom_template_video_file:this.custom_template_video_file,
        custom_template_video_file_name: this.custom_template_video_file_name,
        custom_template_img_url:this.custom_template_img_url,
        custom_template_video_url:this.custom_template_video_url
      }
      console.log(this.custom_template_img_file , template_details)

      this.spinnerOn = true;
      axios
        .post(
          api_calls.whatsapp_template(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            is_custom_template: true,
            template_details: template_details,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          this.spinnerOn = false;
          $("#addcustomtemplate").modal("hide");
          if(this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE === response.data.message.MSG_CODE) {
            Swal({
              type: "success",
              text: this.tlt('template_data_added'),
              timer: 2500,
            }).then((result) => {
              this.empty_variable();
              this.load_templates();
            });
            return
          } else if(this.api_status_code.UNSUCCESSFUL_DB_QUERY.MSG_CODE === response.data.message.MSG_CODE) {
            Swal({
              type: "error",
              text: this.tlt('db_operation_unsuccess'),
              timer: 2500,
            });
            return
          } else if(this.api_status_code.TEMPLATE_DETAILS_MISSING.MSG_CODE === response.data.message.MSG_CODE) {
            Swal({
              type: "warning",
              text: this.tlt('template_detail_missing'),
              timer: 2500,
            });
            return
          } else {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              type: "error"
            })
            return
          }
          this.isEditTemplate = false;
        })
        .catch((e) => {
          this.spinnerOn = false;
          $("#addcustomtemplate").modal("hide");
          this.empty_variable();
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
        this.close_modal("custom_template_save");
    },
  },
};
</script>

<style scoped>
.edit {
  line-height: 16px;
  padding: 10px 15px;
}
.custom-box {
  border: 0.5px solid #ccc;
  padding: 10px !important;
}
.table-responsive {
  min-height: 0px !important;
  height: unset !important;
  overflow-y: unset !important;
  border: 1px solid #e3e2e5 !important;
}
.current-active-template {
  background: rgba(0, 0, 0, 0.1);
}
.modal-xl {
  max-width: 1140px;
  min-height: 1140px;
}
.table-box tbody tr:hover td,
.table-box tbody tr:hover th {
  background: #ececec;
}
.table th {
  border-top: none;
}
.table-responsive thead th {
  top: 0;
  position: sticky;
}
.table-responsive::-webkit-scrollbar {
  max-height: 10px;
  width: 7px;
  height: 7px;
  border-radius: 10px;
  overflow-x: hidden;
}
.table-responsive::-webkit-scrollbar-track {
  background: #ffffff;
  border-radius: 10px;
}
.table-responsive::-webkit-scrollbar-thumb {
  background: #27397b;
  border-radius: 10px;
}
.table-responsive::-webkit-scrollbar-thumb:hover {
  background: #19295f;
  border-radius: 10px;
}
.text-area {
  padding: 15px;
  width: 100%;
  margin: 5px 0 22px 0;
  border: none;
  background: #f1f1f1;
  resize: none;
  min-height: 150px;
}
.modal {
  overflow-y: auto;
}
.heading {
  color: #414141 !important;
}
.sub_heading {
  font-size: 16px !important;
  font-weight: 500 !important;
}
.cards {
  background: rgb(255, 255, 255);
  border-radius: 6px;
  position: relative;
  padding: 28px;
  min-height: 175px;
  box-shadow: 0px 2px 8px rgba(12, 12, 13, 0.1);
}
.preview-button-div {
  display: grid;
  gap: 4px;
  margin-top: 4px;
  grid-auto-columns: minmax(50%, 100%);
}
.preview-button {
  background: rgb(255, 255, 255);
  border-radius: 6px;
  position: relative;
  box-shadow: 0px 2px 8px rgba(12, 12, 13, 0.1);
  color: #0b67aa;
}
.template-input-title {
  margin-top: 1rem;
  margin-bottom: 0rem;
}
.input_text_box textarea {
  outline: 0 !important;
  /* border-width:2px !important;
  border-color: #47a884 !important; */
  padding:10px 15px !important;
  resize: none !important;
  width: 100% !important;
  height: 180px !important;
  overflow: hidden !important;
  line-height: 20px !important;
}
</style>