<template>
  <div :class="is_notification_template === true ? '':'dash-cont'" >
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <div :class="is_notification_template === true ? 'container-fluid p-0' : 'container-fluid'" id="email_page">
      <div class="card dash-card" style="border: 0">
        <div class="card dash-card">
          <div
            class="
              card-header
              d-block d-sm-flex
              flex-wrap
              justify-content-between
            "
          >
            <div class="card-act col-sm-4 pr-2 pl-0 d-flex">
            <input
                class="form-control mr-auto"
                style="padding: 0px 15px; height: 36px !important;"
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
              <a
                id="send_email_btn"
                href="#"
                class="darkblue-btn"
                data-toggle="modal"
                data-target=""
                title="Send Email"
                v-if="templatelist.length > 0 && is_notification_template === false"
                @click="email_verification_status()"
              >
                {{tlt('mailer_page_send_email_btn')}}
              </a>
              <a
                id="add_template_btn"
                href="#"
                class="darkblue-btn"
                v-if="disable_btn_expired"
                title="Add new Template"
                @click="empty_variable"
              >
                {{tlt('mailer_page_add_template_btn_expired')}}
              </a>
              <a
                id="add_template_btn"
                href="#"
                v-else
                class="darkblue-btn"
                data-toggle="modal"
                data-target="#templatemodel"
                title="Add new Template"
                @click="empty_variable"
              >
                {{tlt('mailer_page_add_template_btn')}}
              </a>
              <a
                href="javascript:void(0)"
                class="red-btn"
                @click="delete_selected"
                id="delete_intent"
              >
                {{tlt('mailer_page_delete_btn')}}
              </a>
            </div>
          </div>
          <div
            class="modal fade"
            id="preview_template_visible"
            role="dialog"
            aria-labelledby="preview_template_visible"
            aria-hidden="true"
          >
            <div
              class="modal-dialog modal-dialog-centered modal-lg"
              role="document"
            >
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">
                    {{tlt('template_email_review_text')}}
                  </h5>
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
                  <div v-html="preview_template_data"></div>
                </div>
              </div>
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
                        <th scope="col">
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
                          scope="col"
                          class="text-left"
                          style="
                            font: normal normal normal 16px/22px Roboto;
                            letter-spacing: 0px;
                            color: #414141;
                          "
                        >
                          {{tlt('template_header')}}
                        </th>
                        <!-- </tr> -->
                      </thead>
                      <tbody>
                        <tr
                          v-for="(template, index) in templatelist"
                          :key="index"
                          :class="check_current_template_active(index)"
                        >
                          <td scope="col">
                            <div class="form-check checkbox checkbox-success">
                              <label class="form-check-label">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  :id='index'
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
                    <div style="color: #414141" class="">
                      <h5 class="mb-0 pt-2 d-flex">
                        <span class="mt-2 mb-0">{{tlt('template_details_header')}}</span>
                        <a
                          class="ml-auto mt-2 mb-0"
                          href="javascript:void(0)"
                          title="Click Here for Preview"
                          style="color: rgb(39, 54, 121)"
                          @click="preview_template"
                          data-toggle="modal"
                        >
                          <p
                            class="labe1"
                            style="margin-right: 1rem; font-size: 1.25rem"
                          >
                            {{tlt('mailer_page_preview_btn')}}
                          </p></a
                        >
                        <span
                          @click="edit_template_details"
                          v-html="pencil_svg"
                          class="mr-2 mt-2"
                          style="cursor: pointer"
                        ></span>
                      </h5>
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
                        class="form-control"
                        style="padding: 0.375rem 0.75rem"
                        :placeholder="tlt('template_name_label')"
                      />
                      <span
                        v-show="edit_template_name_already_exist"
                        style="color: red"
                        >{{tlt('template_name_exist')}}</span
                      >
                    </div>
                  </div>
                  <div class="col-sm-12" style="margin-bottom: 1rem">
                    <h5>
                      <p class="mt-2 mb-0" style="color: #414141">
                        {{tlt('email_subject_label')}}
                      </p>
                    </h5>
                    <div v-if="!isEditTemplate" style="padding-left: 20px">
                      <p>{{ current_template.subject }}</p>
                    </div>
                    <div v-else>
                      <input
                        type="text"
                        v-model.trim="current_template.subject"
                        class="form-control"
                        style="padding: 0.375rem 0.75rem"
                        :placeholder="tlt('email_subject')"
                      />
                    </div>
                  </div>
                  <div
                    v-if="!isEditTemplate && current_template.email != null"
                    class="col-sm-12"
                    style="margin-bottom: 1rem"
                  >
                    <h5>
                      <p class="mt-2 mb-0" style="color: #414141">{{tlt('email_body_label')}}</p>
                    </h5>
                    <div style="padding-left: 20px">
                      <span v-html="current_template.email"></span>
                    </div>
                  </div>
                  <div
                    v-else-if="is_edit_email && isEditTemplate"
                    class="col-sm-12"
                    style="margin-bottom: 1rem"
                  >
                    <h5>
                      <p class="mt-2 mb-0" style="color: #414141">{{tlt('email_body_label')}}</p>
                    </h5>
                    <!-- <div>
                      <vue-editor
                        v-model="current_template.email"
                        :editorToolbar="customToolbar"
                      ></vue-editor>
                    </div> -->
                    <div id="edit_editor_temp" v-if="!Boolean(current_template.is_html_body)" class="form-group">
                      <div id="edit_editor"></div>
                    </div>
                    <div v-if="current_template.is_html_body">
                      <textarea name="" v-model="current_template.email" id="" rows="8" style="width: 100%;"></textarea>
                    </div>
                  </div>
                  <div
                    v-if="
                      !isEditTemplate &&
                      Boolean(current_template.template_image_name) === true &&
                      Boolean(current_template.image_redirect_url) === true
                    "
                    class="col-sm-12"
                    style="margin-bottom: 1rem"
                  >
                    <h5>
                      <p class="mt-2 mb-0" style="color: #414141">{{tlt('image_name_label')}}</p>
                    </h5>
                    <div style="padding-left: 20px">
                      <p>{{ current_template.template_image_name }}</p>
                    </div>
                    <h5>
                      <p class="mt-2 mb-0" style="color: #414141">
                        {{tlt('image_redirect_label')}}
                      </p>
                    </h5>
                    <p>
                      {{tlt('redirected_link_text')}}
                    </p>
                    <div style="padding-left: 20px">
                      <p>{{ current_template.image_redirect_url }}</p>
                    </div>
                  </div>
                  <div
                    v-else-if="isEditTemplate && !Boolean(current_template.is_html_body)"
                    class="col-sm-12"
                    style="margin-bottom: 1rem"
                  >
                    <h5>
                      {{tlt('add_img_in_email_label')}}<label
                        style="
                          font-size: 17px;
                          font-weight: 400;
                          padding-left: 0.3rem;
                        "
                      >
                        {{tlt('image_desc_label')}}
                      </label>
                    </h5>

                    <div style="display: flex; margin: 1%">
                      <div class="radio">
                        <label style="vertical-align: text-top">
                          <input
                            type="radio"
                            value="yes"
                            name="is_edit_image_needed"
                            v-model="is_edit_image_needed"
                          />
                          <span class="icn" id="radio"></span>
                          {{tlt('img_in_email_yes_label')}}
                        </label>
                      </div>
                      <div class="radio" style="margin-left: 2%">
                        <label style="vertical-align: text-top">
                          <input
                            type="radio"
                            value="none"
                            name="is_edit_image_needed"
                            v-model="is_edit_image_needed"
                          />
                          <span class="icn" id="radio"></span>
                          {{tlt('img_in_email_no_label')}}
                        </label>
                      </div>
                    </div>
                    <div
                      class="custom-file"
                      v-if="is_edit_image_needed == 'yes'"
                      style="margin-bottom: 1rem"
                    >
                      <input
                        type="file"
                        class="custom-file-input"
                        @change="fileinput2"
                        id="inputFile2"
                      />
                      <label
                        style="
                          font-weight: 400;
                          line-height: 10px;
                          padding-left: 15px;
                        "
                        class="custom-file-label form-control"
                        for="file"
                        >{{ edited_file_label }}</label
                      >
                    </div>
                    <div v-if="is_edit_image_needed == 'yes'">
                      <h5>{{tlt('image_redirect_url_label')}}</h5>
                      <label>
                        {{tlt('redirected_url_link_text')}}
                      </label>
                      <input
                        type="text"
                        v-model="edit_img_redirect_url"
                        class="form-control"
                        style="padding: 0.375rem 0.75rem"
                        :placeholder="tlt('url_example')"
                      />
                    </div>
                  </div>

                  <div
                    v-if="!isEditTemplate && current_template.sms != null"
                    class="col-sm-12"
                    style="margin-bottom: 1rem"
                  >
                    <h5>
                      <p class="mt-2 mb-0" style="color: #414141">SMS</p>
                    </h5>
                    <div style="padding-left: 20px">
                      <p>{{ current_template.sms }}</p>
                    </div>
                  </div>
                  <div
                    v-else-if="is_edit_sms && isEditTemplate"
                    class="col-sm-12"
                    style="margin-bottom: 1rem"
                  >
                    <h5>
                      <p class="mt-2 mb-0" style="color: #414141">SMS</p>
                    </h5>
                    <div>
                      <textarea
                        maxlength="160"
                        class="form-control"
                        style="padding: 0.375rem 0.75rem"
                        v-model="current_template.sms"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      >
                      </textarea>
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
                          {{tlt('product_config_mailer_cancel_btn')}}
                        </button>
                        <button
                          type="submit"
                          class="darkblue-btn"
                          id="res_n_int_save"
                          @click="edit_template()"
                        >
                          {{tlt('product_config_mailer_save_btn')}}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-12 d-flex px-0 py-5" v-else-if="!spinnerOn">
              <h4 class="mx-auto">
                {{tlt('no_template_data_text')}}
              </h4>
            </div>
            <div class="pagin-table pb-3" style="margin-top: 2%" v-if="templatelist.length > 0">
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
    <div
      id="sendemail"
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
              <h3>{{tlt('email_model_sender_email_header')}}</h3>
              <button
                type="button"
                class="close close_btn"
                @click="empty_variable"
                data-dismiss="modal"
              >
                <img src="/img/close-icn.png" alt />
              </button>
            </div>
            <div class="form-group">
              <h5>
                <p class="mt-2 mb-0" style="color: #414141">{{tlt('email_model_template_name_header')}}</p>
              </h5>
              <div style="padding-left: 20px">
                <p>{{ current_template.template_name }}</p>
              </div>
            </div>
            <div class="form-group">
              <div class="d-flex">
                <h5>
                  <p class="mt-2 mb-0" style="color: #414141">{{tlt('email_model_send_email_header')}}</p>
                </h5>
                <span
                  v-if="!send_email_all_customer"
                  style="
                    margin-left: 12px;
                    margin-top: 10px !important;
                    color: #0645ad;
                  "
                >
                  <i
                    class="fa fa-info-circle"
                    aria-hidden="true"
                    style="font-size: 16px"
                    title="you can also specify name while adding new email in this way (john.d@mail.com,John Doe), note this would only work in the case where you add new email."
                  >
                  </i>
                </span>
              </div>
              <div class="radio my-auto" style="padding-left: 20px">
                <label>
                  <input
                    type="radio"
                    v-model="send_email_all_customer"
                    :value="true"
                    id="send_email_all_customer_true_id"
                  />
                  <span class="icn" id="filter_portal_user_radio"></span>
                  {{tlt('email_model_all_customer_label')}}
                </label>
                <label>
                  <input
                    type="radio"
                    v-model="send_email_all_customer"
                    :value="false"
                    id="send_email_all_customer_false_id"
                  />
                  <span class="icn"></span>
                  {{tlt('email_model_specific_customer_label')}}
                </label>
              </div>
            </div>
            <div class="form-group" v-if="!send_email_all_customer">
              <multiselect
                v-model="specific_customer_list"
                :options="customers_list"
                id="specific_customer_list_id"
                :searchable="true"
                :close-on-select="false"
                :multiple="true"
                :taggable="true"
                tag-position="top"
                tag-placeholder="Add this as new email"
                :placeholder="tlt('search_customer_email')"
                :max-height="400"
                label="email"
                track-by="email"
                open-direction="below"
                @tag="addTag"
              >
                <!-- <span>{{ selected_role }}</span> -->
              </multiselect>
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
                {{tlt('template_model_cancel_btn')}}
              </button>
              <button
                type="submit"
                class="darkblue-btn"
                id="res_n_int_save"
                @click="send_email()"
              >
               {{tlt('send_btn')}} 
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      id="templatemodel"
      class="modal fade dash-modal"
      role="dialog"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt />
              </div>
              <h3>{{tlt('template_model_header')}}</h3>
              <button type="button" class="close" data-dismiss="modal">
                <img src="/img/close-icn.png" alt />
              </button>
            </div>
            <div class="form-group">
              <label>{{tlt('template_model_name_label')}}</label>
              <input
                id="template_name_add_id"
                type="text"
                v-on:keyup="validate_template_name"
                v-model.trim="template_name"
                class="form-control"
                :placeholder="tlt('template_name_label')"
              />
              <span v-show="template_name_already_exist" style="color: red"
                >{{tlt('template_model_name_text')}}</span
              >
            </div>
            <div class="form-group">
              <label>{{tlt('template_model_email_sub_label')}}</label>
              <input
                type="text"
                v-model="email_subject"
                class="form-control"
                :placeholder="tlt('email_subject')"
              />
            </div>
            <div class="form-group" v-show="is_email">
              <div class="d-flex">
                <label
                  style="
                    margin-top: 2px !important;
                    margin-bottom: 7px !important;
                  "
                  >{{tlt('template_model_email_body_label')}}</label
                >
                <span
                  style="
                    margin-left: 12px;
                    margin-bottom: 5px !important;
                    color: #0645ad;
                  "
                >
                  <i
                    class="fa fa-info-circle"
                    aria-hidden="true"
                    style="font-size: 16px"
                    title="To Display customer full name in email body use {full_name} and for customer first name use {first_name}. (Example Hi {full_name} would display Hi FirstName LastName)."
                  >
                  </i>
                </span>
                 <label
                  class="ml-auto"
                  style="
                    margin-top: 2px !important;
                    margin-right: 10px;
                    margin-bottom: 7px !important;
                  "
                  >{{tlt('html_body_label')}}</label
                >
                <label class="switch col-sm-1" style="margin-top:0px;">
                  <input
                    type="checkbox"
                    @click="change_body_format"
                    v-model="is_html_body"
                    id="is_display_banner_on_landing_id"
                  />
                  <span
                    class="slider round"
                    style="border-radius: 50px;"
                  ></span>
                </label>
              </div>
              <!-- <vue-editor
                v-model="save_email"
                :editorToolbar="customToolbar"
              ></vue-editor> -->
              <div v-if="!is_html_body" class="form-group">
                <div id="editor"></div>
              </div>
              <div v-if="is_html_body">
                <textarea name="" v-model="save_email" id="" rows="8" style="width: 100%;"></textarea>
              </div>
            </div>
            <div v-if="!is_html_body" class="form-group">
              <label>{{tlt('template_model_add_img_label')}}</label>
              <label style="padding-left: 0.3rem">
                {{tlt('template_model_add_img_text')}}
              </label>
              <div style="display: flex; margin: 1%">
                <div class="radio">
                  <label style="vertical-align: text-top">
                    <input
                      type="radio"
                      value="yes"
                      name="is_image_needed"
                      v-model="is_image_needed"
                    />
                    <span class="icn" id="radio"></span>
                    Yes
                  </label>
                </div>
                <div class="radio" style="margin-left: 2%">
                  <label style="vertical-align: text-top">
                    <input
                      type="radio"
                      value="none"
                      name="is_image_needed"
                      v-model="is_image_needed"
                    />
                    <span class="icn" id="radio"></span>
                    No
                  </label>
                </div>
              </div>
              <div class="custom-file" v-if="is_image_needed == 'yes'">
                <input
                  type="file"
                  class="custom-file-input"
                  @change="fileinput1"
                  id="inputFile"
                />
                <label
                  style="
                    font-weight: 400;
                    line-height: 20px;
                    padding-left: 15px;
                  "
                  class="custom-file-label form-control"
                  for="file"
                  >{{ file_label }}</label
                >
              </div>
            </div>
            <div class="form-group" v-if="is_image_needed == 'yes' && !is_html_body">
              <label>{{tlt('template_model_image_url_label')}}</label>
              <label>
                {{tlt('template_model_redirected_link_text')}}
              </label>
              <input
                type="text"
                v-model="img_redirect_url"
                class="form-control"
                :placeholder="tlt('url_example')"
              />
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
                {{tlt('template_model_cancel_btn')}}
              </button>
              <button
                type="submit"
                class="darkblue-btn "
                id="save_template_btn"
                data-dismiss=""
                @click="save_template()"
              >
                {{tlt('template_model_save_btn')}}
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
import swal from "sweetalert2";
import Swal from "sweetalert2";
import api_calls from "@/portal/api_calls";
import { freeze_portal,show_subscription_expired_swal , close_modal} from "@/portal/mixins";
import Multiselect from "vue-multiselect";

export default {
  name: "EmailTemplatePage",
  components: {
    VueEditor,
    Multiselect,
  },
  mixins: [freeze_portal,show_subscription_expired_swal , close_modal],
  data() {
    return {
      pencil_svg:
        ' <svg xmlns="http://www.w3.org/2000/svg" width="15.546" height="15.461" viewBox="0 0 15.546 15.461"><defs><style>.a{fill:#9e9e9e;}</style></defs><g transform="translate(-747.888 -356.769)"><path class="a" d="M759.416,356.769a2.358,2.358,0,0,1,1.777.662c.534.513,1.072,1.025,1.567,1.575a2.3,2.3,0,0,1-.071,3.325c-2.736,2.76-5.494,5.5-8.238,8.251a1.381,1.381,0,0,1-.758.288c-.719.174-1.429.379-2.144.572-.932.251-1.862.5-2.795.751-.6.158-.989-.213-.832-.807q.689-2.595,1.406-5.182a1.164,1.164,0,0,1,.289-.487q4.091-4.107,8.2-8.2A2.265,2.265,0,0,1,759.416,356.769Zm-1.989,2.956-6.54,6.538,3.025,3.024,6.538-6.537Zm4.023,2.165c.118-.135.225-.269.343-.392a1.134,1.134,0,0,0,0-1.734c-.46-.466-.926-.925-1.388-1.39a1.166,1.166,0,0,0-.861-.368c-.578,0-.881.4-1.214.76Zm-12.084,8.863,3.2-.863-2.337-2.331Z" transform="translate(0)"/><path class="a" d="M813.942,422.6l-.789-.8,3.821-3.819.784.8Z" transform="translate(-59.648 -55.947)"/></g></svg>',
      company_id: this.$session.get("UserInformation").company_id,
      company_name: this.$session.get("UserInformation").company_name,
      spinnerOn: false,
      template_name: "",
      save_sms: "",
      save_email: "",
      is_sms: false,
      is_email: true,
      save_subject: "",
      is_publish_email: true,
      is_publish_sms: true,
      is_edit_sms: false,
      is_edit_email: true,
      verification_status: null,
      templatelist: [],
      checked_list: [],
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
      ],
      quill: "",
      quill_edit: "",
      is_html_body: false,
      slot_variable:{},
      current_template: [],
      old_template_name: "",
      isEditTemplate: false,
      number_of_rows: null,
      total_pages: null,
      page_no: 1,
      per_page: 10,
      image_file: null,
      image_file_2: null,
      is_image_needed: "none",
      is_edit_image_needed: "none",
      email_subject: "",
      reg_url:
        /https:\/\/[(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/i,
      is_edit_reg_url:
        /https:\/\/[(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/i,
      img_redirect_url: "",
      edit_img_redirect_url: "",
      file_label: "Choose file",
      edited_file_label: "Choose file",
      preview_template_data: "",
      template_name_already_exist: false,
      edit_template_name_already_exist: false,
      page_array: [],
      send_email_all_customer: true,
      customers_list: [],
      specific_customer_list: [],
      disable_btn_expired: false,
      email_reg:
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      search_name: "",
      isVisibleSearchClear: false,
    };
  },
  props: {
    is_notification_template: Boolean,
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
    // is_notification_template() {
    //   console.log(this.is_notification_template);
    // },
  },
  computed: {
    validURL() {
      if (this.reg_url.test(this.img_redirect_url)) {
        return true;
      } else {
        return false;
      }
    },
    valid_edit_URL() {
      if (this.is_edit_reg_url.test(this.edit_img_redirect_url)) {
        return true;
      } else {
        return false;
      }
    },
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
  mounted() {
    setTimeout(() => {
      this.freeze_portal();
    }, 1000);
     this.$root.$on("EmailTemplatePageDisabled", (data) =>{
      if(data===true){
        this.disable_btn_expired = true;
        this.show_subscription_expired_swal();
      }
    })
    this.load_templates();
    if (this.is_notification_template === false){
      this.load_customer_list();
    }
    var vm = this;
    $("#selectall").click(function () {
      this.isEditTemplate = false;
      this.is_sms = false;
      this.is_email = true;
      if ($(this).is(":checked")) {
        $("input:checkbox").prop("checked", true);
      } else {
        vm.checked_list = [];
        $("input:checkbox").prop("checked", false);
      }
    });
    this.editor();
    if (this.is_notification_template === true){
      this.load_slot_variable();
    }
  },
  methods: {
    clear_search_name() {
      this.search_name = "";
    },
    callsearch() {
      if (this.search_name != ""){
        this.spinnerOn = true;
        axios
          .post(
            api_calls.template_promotional_email(),
            {
              company_id: this.company_id,
              company_name: this.company_name,
              is_search: true,
              page_no: 1,
              per_page: this.per_page,
              is_notification: this.is_notification_template,
              search_key: this.search_name
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
            this.number_of_rows = response.data.pagination.total_data == undefined ? 0 : response.data.pagination.total_data;
            this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
            if (this.api_status_code.TEMPLATE_DOES_NOT_EXISTS_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
              this.templatelist = [];
              return;
            } else if (this.api_status_code.TEMPLATE_SEARCH_RESULT_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
              this.templatelist = response.data.data.template_search;
              if (this.templatelist.length > 0) {
                this.show_template(0);
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
            this.isEditTemplate = false;
            this.setpagination(1);
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
    load_slot_variable(){
      this.spinnerOn = true;
      axios
        .post(
          api_calls.form_automation_dialog_tree(),
          {
            company_id: this.$session.get("UserInformation").company_id,
            company_name: this.$session.get("UserInformation").company_name,
            is_get_slot_variable: true,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          this.spinnerOn = false;
          if (this.api_status_code.DATA_AVAILABLE_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
            this.slot_variable = {};
            for (let index = 0; index < response.data.data.slots_list.length; index++) {
              const element = response.data.data.slots_list[index];
              this.slot_variable[element] = '{' + element + '}';
            }
          // this.insert_variable('quill', this.slot_variable);
          } else if(this.api_status_code.NO_SLOTS_FOUND_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              type: "error"
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
        })
        .catch((e) => {
          // this.insert_variable('quill', this.slot_variable);
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
    editor(){
      this.quill = new Quill("#editor", {
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            ["link"],
            [{ align: [] }],
            [{ color: [] }, { background: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
          ],
        },
        theme: "snow",
      });
      this.quill.on("text-change", () => {
        this.$emit(
          "input",
          this.quill.getText() ? this.quill.root.innerHTML : ""
        );
        this.save_email = this.quill.getText() ? this.quill.root.innerHTML : "";
      });
      if(this.is_notification_template) {
        this.insert_variable('quill', this.slot_variable);
      }
    },
    edit_editor(){
      this.quill_edit = new Quill("#edit_editor", {
      modules: {
        toolbar: [
          ["bold", "italic", "underline"],
          ["link"],
          [{ align: [] }],
          [{ color: [] }, { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
        ],
      },
      theme: "snow",
    });
    this.quill_edit.on("text-change", () => {
      this.$emit(
        "input",
        this.quill_edit.getText() ? this.quill_edit.root.innerHTML : ""
      );
      this.current_template.email = this.quill_edit.getText() ? this.quill_edit.root.innerHTML : "";
    });
    this.quill_edit.root.innerHTML = this.current_template.email;
    this.insert_variable('quill_edit', this.slot_variable);
    },
    insert_variable(val, slot_variable){
      if (this.is_notification_template === true){
        const dropDownItems = {
        'No slot variable': '',
        }
        const myDropDown = new QuillToolbarDropDown({
            label: "Insert Variable",
            rememberSelection: false,
            id: "dropdown_id"
        })
        if(Object.entries(slot_variable).length === 0 && slot_variable.constructor === Object){
          myDropDown.setItems(dropDownItems);
        }else {
          myDropDown.setItems(slot_variable);
        }
        myDropDown.onSelect = function(label, value, quill) {
            const { index, length } = quill.selection.savedRange
            quill.deleteText(index, length)
            quill.insertText(index, value)
            quill.setSelection(index + value.length)
        }
        myDropDown.attach(this.quill)
        if (val === 'quill_edit'){
          myDropDown.attach(this.quill_edit)
        }
      }
    },
    addTag(newTag) {
      var tag_list = [];
      tag_list = newTag.split(",");
      if (tag_list.length > 2) {
        swal({
          text: this.tlt('email_temp_add_valid_tag_msg'),
          type: "warning",
          showConfirmButton: true,
          timer: 4500,
        });
        return;
      } else {
        var email = tag_list[0];
        var customer_name = Boolean(tag_list[1]) ? tag_list[1] : " ";
        if (!this.email_reg.test(email)) {
          swal({
            text: this.tlt('email_temp_valid_email_addr_msg'),
            type: "warning",
            showConfirmButton: true,
            timer: 4500,
          });
          return;
        }
      }
      const tag = {
        customer_name: customer_name,
        email: email,
      };
      this.customers_list.push(tag);
      this.specific_customer_list.push(tag);
    },
    load_customer_list() {
      this.spinnerOn = true;
      axios
        .post(
          api_calls.send_offer_to_customers(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            get_customers_list: true,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          this.spinnerOn = false;
          if (this.api_status_code.STATUS_SUCCESS_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
            this.customers_list = response.data.data.customers_list;
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
    email_verification_status() {
      if(!this.disable_btn_expired){
      this.spinnerOn = true;
      axios
        .post(
          api_calls.product_settings(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            is_email_verification_status: true,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          this.spinnerOn = false;
          if (
            this.api_status_code.DATA_AVAILABLE.MSG_CODE == response.data.message.MSG_CODE
          ) {
            this.verification_status = response.data.data.verification_status;
            // console.log(this.verification_status);
            if (this.verification_status == "Success") {
              // if (!document.getElementById("publish_template_btn").disabled) {
              $("#sendemail").modal("show");
              this.load_customer_list();
              // }
            } else {
              swal({
                text: this.tlt('email_temp_not_config_instruction_msg'),
                type: "error",
                showConfirmButton: true,
                timer: 13000,
              });
            }
          } else if(this.api_status_code.EMAIL_NOT_CONFIGURED.MSG_CODE == response.data.message.MSG_CODE) {
            swal({
                text: this.tlt('email_temp_not_config_instruction_msg1'),
                type: "warning",
                showConfirmButton: true,
                timer: 13000,
              });
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
        .catch((e) => {
          this.spinnerOn = false;
          toastr.error(this.tlt('email_temp_not_config_error_occur_msg'));
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
      }else{
        this.show_subscription_expired_swal();
      }
    },
    validate_template_name() {
      axios.post(
        api_calls.template_promotional_email(),
        {
           company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            subscription: this.$session.get("UserInformation").subscription,
            is_template_present: true,
            is_notification: this.is_notification_template,
            template_name: this.template_name,
        },
        {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
      )
      .then((response) =>{
        if (this.api_status_code.NOT_EXISTS_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
            this.template_name_already_exist = false;
            document.getElementById("template_name_add_id").style.border =null;
            if(this.template_name != ""){
              document.getElementById("template_name_add_id").style.border =
              "1px solid #00f000";
            }
        } else if (this.api_status_code.ALREADY_EXISTS_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
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
      axios.post(
        api_calls.template_promotional_email(),
        {
           company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            subscription: this.$session.get("UserInformation").subscription,
            is_template_present: true,
            is_notification: this.is_notification_template,
            template_name: this.current_template.template_name,
        },
        {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
      )
      .then((response) =>{
        if (this.api_status_code.NOT_EXISTS_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
            this.edit_template_name_already_exist = false;
            document.getElementById("edit_template_name_id").style.border =null;
            if(this.current_template.template_name != ""){
              document.getElementById("edit_template_name_id").style.border =
              "1px solid #00f000";
            }
          } else if (this.api_status_code.ALREADY_EXISTS_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
            if (this.old_template_name == this.current_template.template_name){
              this.edit_template_name_already_exist = false;
              document.getElementById("edit_template_name_id").style.border =null;
            }else{
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
    preview_template() {
      this.spinnerOn = true;
      axios
        .post(
          api_calls.template_promotional_email(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            is_preview: true,
            template_id: this.current_template.template_id,
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
          if (this.api_status_code.TEMPLATE_RECEIVED_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
            this.preview_template_data = response.data.data.Template;
            $("#preview_template_visible").modal("show");
          } else if(this.api_status_code.TEMPLATE_DOES_NOT_EXISTS_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              type: "error"
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
    send_email_confirm_prompt_text(all_customer) {
      if (all_customer) {
        return this.tlt('email_temp_send_bulk_email_msg');
      } else {
        return this.tlt('email_temp_send_specific_customer_msg');
      }
    },
    send_email() {
      if (!this.send_email_all_customer) {
        if(!Boolean(this.specific_customer_list.length > 0)){
          swal({
          text: this.tlt('email_temp_select_one_email_msg'),
          type: "warning",
          timer: 5000,
        });
        return
        }
      }
      Swal.fire({
        title:this.send_email_confirm_prompt_text(this.send_email_all_customer),
        text: this.tlt('email_temp_swal_confirm_msg'),
        showCancelButton: true,
        type:'warning',
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.tlt('email_temp_swal_yes_msg'),
      }).then((result) => {
        if (result.value) {
          $("#sendemail").modal("hide");
          this.spinnerOn = true;
          axios
            .post(
              api_calls.send_offer_to_customers(),
              {
                company_id: this.company_id,
                company_name: this.company_name,
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                send_email: true,
                send_email_all_customer: this.send_email_all_customer,
                specific_customer_list:
                  this.send_email_all_customer != true
                    ? this.specific_customer_list
                    : [],
                template_id: this.current_template.template_id,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.spinnerOn = false;
              if (this.api_status_code.SENDING_EMAIL_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
                // this.save_subject = "";
                // $("#publishtemplatemodel").modal("hide");
                swal({
                  text: this.tlt('email_temp_sent_successful_msg'),
                  type: "success",
                  timer: 5000,
                  title: this.tlt('email_temp_swal_success_msg'),
                }).then((result) => {
                  $("#sendemail").modal("hide");
                  this.empty_variable();
                });
              } else if(this.api_status_code.UPGRADE_PLAN_TO_SEND_EMAIL_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
                  swal({
                    type: "warning",
                    text: this.tlt('email_temp_upgrade_plan_msg'),
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
      });
    },
    selected_templates(value) {
      if(value == "all"){
        if (event.target.checked) {
          this.checked_list = [];
            for (var i in this.templatelist) {
              this.checked_list.push(this.templatelist[i].template_id);
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
          var temp = this.checked_list.filter((templates_id) => {
            return templates_id != value;
          });
          this.checked_list = temp;
        }
      }
    },
    load_templates() {
      this.spinnerOn = true;
      axios
        .post(
          api_calls.template_promotional_email(),
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
          if(this.api_status_code.STATUS_SUCCESS_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
              this.number_of_rows = response.data.pagination.total_data == undefined ? 0 : response.data.pagination.total_data;
              this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
              this.templatelist = response.data.data;
              if (this.templatelist.length > 0) {
                // this.current_template = this.templatelist[0];
                this.show_template(0);
              }
              this.isEditTemplate = false;
          } else if(this.api_status_code.UNSUCCESSFUL_DB_OPERATION_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
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
    },
    fileinput1(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (files[0].type === "image/png" || files[0].type === "image/jpeg") {
        if (!files.length) return;
        this.file_label = files[0].name;
        this.createImage(files[0]);
      } else {
        swal({
          text: this.tlt('email_temp_image_type_msg1'),
          type: "error",
          timer: 2500,
        });
      }
    },
    createImage(file, type) {
      let reader = new FileReader();

      reader.onload = (e) => {
        this.image_file = e.target.result.split("base64,")[1];
      };
      reader.readAsDataURL(file);
    },
    fileinput2(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (files[0].type === "image/png" || files[0].type === "image/jpeg") {
        if (!files.length) return;
        this.old_edited_image_name = this.edited_file_label;
        this.edited_file_label = files[0].name;
        this.createImage2(files[0]);
      } else {
        swal({
          text: this.tlt('email_temp_image_type_msg2'),
          type: "error",
          timer: 2500,
        });
      }
    },
    createImage2(file, type) {
      let reader = new FileReader();

      reader.onload = (e) => {
        this.image_file_2 = e.target.result.split("base64,")[1];
      };
      reader.readAsDataURL(file);
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
              api_calls.template_promotional_email(),
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
              if(this.api_status_code.STATUS_SUCCESS_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
              this.number_of_rows = response.data.pagination.total_data == undefined ? 0 : response.data.pagination.total_data;
              this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
              this.templatelist = response.data.data;
              if (this.templatelist.length > 0) {
                  this.current_template = this.templatelist[0];
                }
              this.isEditTemplate = false;
              } else if(this.api_status_code.UNSUCCESSFUL_DB_OPERATION_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
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
                api_calls.template_promotional_email(),
                {
                  company_id: this.company_id,
                  company_name: this.company_name,
                  is_search: true,
                  page_no: this.page_no,
                  per_page: this.per_page,
                  is_notification: this.is_notification_template,
                  search_key: this.search_name
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
                this.number_of_rows = response.data.pagination.total_data == undefined ? 0 : response.data.pagination.total_data;
                this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
                if (this.api_status_code.TEMPLATE_DOES_NOT_EXISTS_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
                  this.templatelist = [];
                  return;
                } else if (this.api_status_code.TEMPLATE_SEARCH_RESULT_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
                  this.templatelist = response.data.data.template_search;
                  if (this.templatelist.length > 0) {
                    this.show_template(0);
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
                this.isEditTemplate = false;
                this.setpagination(1);
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
    save_template() {
      if (this.template_name == "") {
        Swal({
          text: this.tlt('email_model_template_name_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      } else if (this.template_name_already_exist == true) {
        Swal({
          text: this.tlt('email_model_name_exist_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      } else if (this.email_subject == "") {
        Swal({
          text: this.tlt('email_model_enter_subject_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      } else if (this.is_sms == true && this.save_sms == "") {
        Swal({
          text: this.tlt('email_model_enter_sms_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      } else if (this.is_email == true && this.save_email == "") {
        Swal({
          text: this.tlt('email_model_enter_email_body_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      } else if (this.is_email == false && this.is_sms == false) {
        Swal({
          text: this.tlt('email_model_select_option_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      } else if (
        this.is_image_needed == "yes" &&
        document.getElementById("inputFile").value == ""
      ) {
        Swal({
          text: this.tlt('email_model_choose_img_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      } else if (this.is_image_needed == "yes" && !this.validURL) {
        Swal({
          text: this.tlt('email_model_valid_url_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      } else {
        if (this.is_html_body) this.is_image_needed = 'none';
        var uuid = this.create_UUID();
        axios
              .post(
                api_calls.template_promotional_email(),
                {
                  company_id: this.company_id,
                  company_name: this.company_name,
                  is_save: true,
                  is_notification: this.is_notification_template,
                  template_id: uuid,
                  template_name: this.template_name,
                  save_email: this.is_email == true ? this.save_email : null,
                  save_sms: this.is_sms == true ? this.save_sms : null,
                  email_subject: this.email_subject,
                  email_img_file:
                    this.is_image_needed === "none" ? null : this.image_file,
                  email_img_name: this.file_label,
                  email_img_link: this.img_redirect_url,
                  is_html_body: this.is_html_body
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.$session.get("at")}`,
                  },
                }
              )
              .then((response) => {
                if (this.api_status_code.SUCCESSFUL_DB_QUERY_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
                  Swal({
                    type: "success",
                    text: this.tlt('email_model_data_added_successful_msg'),
                    timer: 2500,
                  }).then((result) => {
                    this.empty_variable();
                    this.load_templates();
                    
                  });
                } else if (this.api_status_code.IMG_DUPLICATE_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
                  Swal({
                    type: "error",
                    text: this.tlt('email_model_img_already_found_msg'),
                    timer: 2500,
                  });
                  this.empty_variable();
                  this.load_templates();
                  return;
                } else if (this.api_status_code.UNSUCCESSFUL_DB_OPERATION_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
                  Swal({
                    title: response.data.message.MSG_CODE,
                    text: response.data.message.MSG,
                    showCancelButton: false,
                    showConfirmButton: false,
                    type: "error"
                  })
                  this.empty_variable();
                  this.load_templates();
                  return;
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
              })
              .catch((e) => {
                Swal({
                  type: "error",
                  text: this.tlt('email_model_error_occur_msg2'),
                  timer: 2500,
                });
                if (
                  e.response.status === 410 ||
                  e.response.status === 440 ||
                  e.response.status === 409
                ) {
                  this.$root.$emit("Session_Expired", e.response.data);
                }
              });
              this.close_modal("save_template_btn");
              
        // Swal.fire({
        //   title: this.tlt('email_model_swal_alert_msg'),
        //   text: this.tlt('email_model_add_current_template_msg'),
        //   type: "question",
        //   showCancelButton: true,
        //   confirmButtonColor: "#3085d6",
        //   cancelButtonColor: "#d33",
        //   confirmButtonText: this.tlt('email_model_swal_confirm_msg'),
        // }).then((result) => {
        //   if (result.value) {
        //     Swal({
        //       text: this.tlt('email_model_submit_details_msg'),
        //       type: "info",
        //       toast: true,
        //       showConfirmButton: false,
        //     });
            
         
              
          }
          
         
     
      
    },
    edit_template() {
      if (this.current_template.template_name == "") {
        Swal({
          text: this.tlt('email_edit_template_name_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      } else if (this.edit_template_name_already_exist == true) {
        Swal({
          text: this.tlt('email_edit_name_already_exist_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      } else if (this.current_template.subject == "") {
        Swal({
          text: this.tlt('email_edit_enter_subject_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      } else if (
        this.is_edit_sms == true &&
        (this.current_template.sms == null || this.current_template.sms == "")
      ) {
        Swal({
          text: this.tlt('email_edit_enter_sms_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      } else if (
        this.is_edit_email == true &&
        (this.current_template.email == null ||
          this.current_template.email == "")
      ) {
        Swal({
          text: this.tlt('email_edit_enter_email_body_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      } else if (this.is_edit_email == false && this.is_edit_sms == false) {
        Swal({
          text: this.tlt('email_edit_select_option_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      } else if (this.is_edit_image_needed == "yes" && !this.valid_edit_URL) {
        Swal({
          text: this.tlt('email_edit_valid_url_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      } else if (
        this.is_edit_image_needed == "yes" &&
        this.edited_file_label == "Choose file" &&
        document.getElementById("inputFile2").value == ""
      ) {
        Swal({
          text: this.tlt('email_edit_choose_img_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      } else {
        if (this.is_html_body) this.is_edit_image_needed = 'none';
        Swal({
          text: this.tlt('email_edit_submit_details_msg'),
          type: "info",
          toast: true,
          showConfirmButton: false,
        });
        axios
          .post(
            api_calls.template_promotional_email(),
            {
              company_id: this.company_id,
              company_name: this.company_name,
              is_edit: true,
              is_notification: this.is_notification_template,
              template_id: this.current_template.template_id,
              template_name: this.current_template.template_name,
              email_subject: this.current_template.subject,
              save_email:
                this.is_edit_email == true ? this.current_template.email : null,
              save_sms:
                this.is_edit_sms == true ? this.current_template.sms : null,
              email_img_file:
                this.is_edit_image_needed === "none" ? null : this.image_file_2,
              email_img_name:
                this.is_edit_image_needed === "none"
                  ? null
                  : this.edited_file_label,
              email_img_link:
                this.is_edit_image_needed === "none"
                  ? null
                  : this.edit_img_redirect_url,
              is_image_edit:
                this.edited_file_label != this.old_edited_image_name
                  ? true
                  : false,
              is_image_present:
                this.is_edit_image_needed === "none" ? false : true,
              old_image:
                this.old_edited_image_name == "Choose File"
                  ? null
                  : this.old_edited_image_name,
              is_html_body: this.current_template.is_html_body
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            if (this.api_status_code.SUCCESSFUL_DB_QUERY_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
              Swal({
                type: "success",
                text: this.tlt('email_edit_data_edit_successful_msg'),
                timer: 2500,
              }).then((result) => {
                this.load_templates();
              });
            } else if (this.api_status_code.IMG_DUPLICATE_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
              document.getElementById("inputFile2").value = "";
              swal({
                text: this.tlt('email_edit_img_already_found_msg'),
                type: "error",
                timer: 3000,
              });
            } else if (this.api_status_code.UNSUCCESSFUL_DB_OPERATION_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                type: "error"
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
          })
          .catch((e) => {
            if (
              e.response.status === 410 ||
              e.response.status === 440 ||
              e.response.status === 409
            ) {
              this.$root.$emit("Session_Expired", e.response.data);
            }
            Swal({
              type: "error",
              text: this.tlt('email_edit_error_occur_msg2'),
              timer: 2500,
            });
          });
      }
    },
    delete_selected() {
      if (this.checked_list.length == 0) {
        Swal.fire({
          title: this.tlt('email_temp_no_template_select_msg'),
          text: "",
          type: "error",
          timer: 2000,
        });
      } else {
        Swal.fire({
          title: this.tlt('email_temp_swal_alert_msg2'),
          text: this.tlt('email_temp_swal_delete_current_template_msg'),
          type: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: this.tlt('email_temp_swal_confirm_msg'),
        }).then((result) => {
          if (result.value) {
            this.delete_templates(this.checked_list);
          }
        });
      }
    },
    delete_templates(checked_list) {
      this.spinnerOn = true;
      axios
        .post(
          api_calls.template_promotional_email(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            is_delete: true,
            template_list: checked_list,
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
          if (this.api_status_code.DELETED_SUCCESSFULLY_0004_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
            Swal({
              type: "success",
              text: this.tlt('email_temp_data_deleted_msg'),
              timer: 2500,
            }).then((result) => {
              this.checked_list = [];
              $("input:checkbox").prop("checked", false);
              this.load_templates();
            });
          } else if (this.api_status_code.UNSUCCESSFUL_DB_OPERATION_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
            Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                type: "error"
              })
          } else if (this.api_status_code.NOTHING_TO_DELETE_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
            Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                type: "error"
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
    show_template(index) {
      if (this.isEditTemplate) {
        this.edit_template_details();
      }
      this.current_template = JSON.parse(JSON.stringify(this.templatelist[index]));
      this.old_template_name = this.current_template.template_name;
      this.current_template_index = index;
      if (Boolean(this.current_template.template_image_name) === true) {
        this.is_edit_image_needed = "yes";
      } else {
        this.is_edit_image_needed = "none";
      }
      if (this.templatelist[index].email != null) {
        this.is_edit_email = true;
      } else {
        this.is_edit_email = false;
      }
      if (this.templatelist[index].sms != null) {
        this.is_edit_sms = true;
      } else {
        this.is_edit_sms = false;
      }
      if (Boolean(this.current_template.template_image_name) === true) {
        this.edited_file_label = this.current_template.template_image_name;
        this.old_edited_image_name = this.edited_file_label;
        this.edit_img_redirect_url = this.current_template.image_redirect_url;
        if (this.edited_file_label == "") {
          this.edited_file_label = "Choose file";
        }
      } else {
        this.edited_file_label = "Choose file";
        this.old_edited_image_name = this.edited_file_label;
        this.edit_img_redirect_url = "";
      }
    },
    empty_variable() {
      if(!this.disable_btn_expired){
        this.send_email_all_customer = true;
        this.quill.setText("");
        this.customers_list = [];
        this.specific_customer_list = [];
        this.save_sms = "";
        this.is_html_body = false;
        this.save_email = "";
        this.template_name = "";
        this.old_template_name = "";
        this.is_email = true;
        this.is_sms = false;
        this.save_subject = "";
        this.is_publish_email = true;
        this.verification_status = null;
        this.file_label = "Choose file";
        this.img_redirect_url = "";
        this.email_subject = "";
        this.is_image_needed = "none";
        this.template_name_already_exist = false;
        document.getElementById("template_name_add_id").style.border = null;
      }else {
        this.show_subscription_expired_swal();
      }
    
    },
    edit_template_details() {
      if (!this.isEditTemplate) {
        this.isEditTemplate = true;
        setTimeout(() => {
          this.edit_editor();
        }, 1000);
      } else {
        if(!this.current_template.is_html_body){
          var elements = document.getElementById('edit_editor_temp');
          elements.removeChild(elements.firstElementChild)
        }
        this.isEditTemplate = false;
        this.load_templates();
        this.edit_template_name_already_exist = false;
      }
    },
    change_body_format(){
        if(!this.is_html_body) {
          this.is_html_body = true;
          this.save_email = "";
          // const element = document.getElementById("editor");
          // element.remove();
        }else {
          this.is_html_body = false;
          this.save_email = "";
            setTimeout(() => {
              this.editor();
            }, 500);
        }
      // }, 1000);
    },
    check_current_template_active(index) {
      // console.table(index, this.templatelist[index], this.current_template);
      if (Boolean(this.templatelist[index]) === true) {
        return this.templatelist[index].template_name ===
          this.old_template_name
          ? "current-active-template"
          : null;
      }
    },
  },
};
</script>
<style>
.ql-picker-options {
  max-height: 200px !important;
  overflow: auto !important;
}
.ql-dropdown_id{
  background: lightgray !important;
}
.ql-snow .ql-picker.ql-expanded .ql-picker-label {
    color: #000 !important;
    z-index: 2;
}
.ql-container{
  min-height: 150px !important;
}
.ql-editor{
    min-height:150px !important;
}
</style>
<style scoped>

.close_btn{
  position: absolute !important;
  top: 30px !important;
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
textarea {
  resize: none;
}
/* .table-responsive {
  height: 80vh;
  overflow-y: auto;
  border: 1px solid #e3e2e5;
} */
/* .table-responsive thead th {
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
} */
</style>