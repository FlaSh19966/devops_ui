<template>
  <div class="dash-cont">
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <div class="container-fluid">
      <div class="card dash-card">
        <div class="dash-card card-header d-flex m-0">
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
            id="check_balance_btn"
            href="#"
            class="darkblue-btn"
            data-toggle="modal"
            @click="check_addons_balance"
            title="Check your SMS credits"
          >
            {{tlt('sms_check_balance_btn')}}
          </a>
          <a
            id="send_sms_btn1"
            href="#"
            class="darkblue-btn"
            title="Send SMS"
            v-show="disable_btn_expired"
            @click="show_subscription_expired_swal"
          >
            {{tlt('send_sms_expiry_btn')}}
          </a>
          <a
            id="send_sms_btn"
            href="#"
            class="darkblue-btn"
            data-toggle="modal"
            data-target="#sendsms"
            title="Send SMS"
            v-show="templatelist.length > 0 && is_notification_template === false && !disable_btn_expired"
          >
            {{tlt('send_sms_btn')}}
          </a>
          <a
            id="add_template_btn"
            href="#"
            class="darkblue-btn"
            v-if="disable_btn_expired"
            title="Add new Template"
            @click="empty_variable"
          >
            {{tlt('sms_add_template_expiry_btn')}}
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
            {{tlt('sms_add_template_btn')}}
          </a>
          <a
            href="javascript:void(0)"
            class="red-btn"
            id="delete_intent"
            @click="delete_template"
          >
            {{tlt('sms_delete_btn')}}
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
                      {{tlt('sms_template_header')}}
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
                    <span class="mt-2 mb-0">{{tlt('sms_template_details_header')}}</span>
                    <a
                      class="ml-auto mt-2 mb-0"
                      href="javascript:void(0)"
                      title="Click Here for Preview"
                      style="color: rgb(39, 54, 121)"
                      @click="preview_template('old')"
                      data-toggle="modal"
                    >
                      <p
                        class="labe1"
                        style="margin-right: 1rem; font-size: 1.25rem"
                      >
                        {{tlt('sms_preview_btn')}}
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
                    {{tlt('sms_template_name_label')}}
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
                    >{{tlt('template_name_exist_msg')}}</span
                  >
                </div>
              </div>
              <div
                class="col-sm-12"
                style="margin-bottom: 1rem"
              >
                <h5>
                  <p class="mt-2 mb-0" style="color: #414141">{{tlt('sms_template_body_label')}}</p>
                </h5>
                <div style="padding-left: 20px">
                  <p>{{ current_template.template_body }}</p>
                </div>
              </div>
              <div
                class="col-sm-12"
                style="margin-bottom: 1rem"
              >
                <h5>
                  <p class="mt-2 mb-0" style="color: #414141">{{tlt('sms_template_example_label')}}</p>
                </h5>
                <div style="padding-left: 20px">
                  <p>{{ current_template.template_example }}</p>
                </div>
              </div>
              <div class="col-sm-12"
                style="margin-bottom: 1rem">
                <h5>
                  <p class="mt-2 mb-0" style="color: #414141">{{tlt('sms_template_variable_header')}}</p>
                </h5>
                  <table v-if="!isEditTemplate" style="width: 100%;">
                    <tbody>
                      <tr style="border: 1px solid black;">
                      <th class="col-sm-4" style="text-align: center; border: 1px solid black;">
                        {{tlt('sms_template_variable_label')}}
                      </th>
                      <th class="col-sm-8" style="text-align: center; border: 1px solid black;">
                        {{tlt('sms_template_values_label')}}
                      </th>
                      </tr>
                      <tr
                        v-for="(item, i) in current_template.variable_list"
                        :key="i"
                        style="border: 1px solid black;"
                      >
                      <td v-for="(value, a) in item"
                        :key="a" style="border: 1px solid black;">
                        {{a}}
                      </td>
                      <td v-for="(value, b) in item"
                          :key="b" style="border: 1px solid black;">
                        {{current_template.variable_list[i][b]}}
                      </td>
                      </tr>
                    </tbody>
                  </table>
                  <table v-else style="width: 100%;">
                    <tbody>
                      <tr>
                      <th class="col-sm-4" style="text-align: center;">
                        {{tlt('sms_model_variable_label')}}
                      </th>
                      <th class="col-sm-8" style="text-align: center;">
                        {{tlt('sms_model_values_label')}}
                      </th>
                      </tr>
                      <tr
                        v-for="(item, j) in current_template.variable_list"
                        :key="j"
                      >
                      <td v-for="(value, c) in item"
                          :key="c">
                        {{c}}
                      </td>
                      <td>
                        <input class="form-control" 
                          type="text"
                          v-for="(value, d) in item"
                          :key="d" 
                          v-model="current_template.variable_list[j][d]" 
                          style="
                            width: 100%;
                            height: 25px;
                            margin-left: 10px;
                            padding: 0px 10px;
                          "
                          :title="d == 'customer_name'? 'Customers Name will be picked from customers list while sending SMS':''"
                          :disabled="d == 'customer_name'"
                        >
                      </td>
                      </tr>
                    </tbody>
                  </table>
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
                      {{tlt('sms_model_cancel_btn')}}
                    </button>
                    <button
                      type="submit"
                      class="darkblue-btn"
                      id="res_n_int_save"
                      @click="edit_template()"
                    >
                      {{tlt('sms_model_save_btn')}}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-12 d-flex px-0 py-5" v-else-if="search_name == ''">
          <h4 class="mx-auto">
            {{tlt('sms_msg_no_template_present')}}
          </h4>
        </div>
        <div class="col-sm-12 d-flex px-0 py-5" v-else-if="templatelist.length == 0 && search_name != ''">
          <h4 class="mx-auto">
            {{tlt('sms_msg_no_template_not_found')}}
          </h4>
        </div>
        <div class="pagin-table pb-3" v-if="templatelist.length > 0" style="margin-top: 2%">
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
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt />
              </div>
              <h3>{{tlt('sms_model_add_template_header')}}</h3>
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
                <p class="mt-2 mb-0" style="color: #414141">{{tlt('sms_model_name_label')}}</p>
              </h5>
              <div>
                <input
                  id="template_name_add_id"
                  type="text"
                  v-model.trim="template_name"
                  v-on:keyup="validate_template_name"                    
                  class="form-control"
                  style="padding: 0.375rem 0.75rem"
                  :placeholder="tlt('template_name_label')"
                />
                <span
                  v-show="template_name_already_exist"
                  style="color: red"
                  >{{tlt('template_name_exist_msg')}}</span
                >
              </div>
            </div>
            <div class="form-group">
                <h5>
                  <p class="mt-2 mb-0" style="color: #414141">{{tlt('sms_model_promotional_template_header')}}</p>
                </h5>
              <div class="container">
                <div class="row">
              <div class="col-6" v-for="(template, index) in default_templatelist"
                          :key="index">
                <label style="cursor: pointer;">
                  <input
                    v-model="choosen_template"
                    @change="preview_template_data = ''"
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
            <h5>
              <p class="mt-2 mb-0" style="color: #414141">{{tlt('sms_model_template_example_label')}}</p>
            </h5>
            <p v-if="choosen_template != null">{{choosen_template.template_example}}</p>
            <p v-else>{{tlt('sms_model_select_a_template_text')}}</p>
            </div>
            <div v-if="choosen_template != null">
            <div class="form-group">
              <h5>
                <p class="mt-2 mb-0" style="color: #414141">Template Body</p>
              </h5>
              <div style="padding-left: 15px">
                <p>{{ choosen_template.template_body }}</p>
              </div>
            </div>
            <div v-if="preview_template_data != ''" class="form-group">
              <h5>
                <p class="mt-2 mb-0" style="color: #414141">Template Preview</p>
              </h5>
              <div style="padding-left: 15px">
                <p>{{ preview_template_data }}</p>
              </div>
            </div>
            <div class="form-group">
              <h5>
                <p class="mt-2 mb-0" style="color: #414141">{{tlt('template_variable_label')}}</p>
              </h5>
                 <table>
                   <tbody>
                    <tr>
                    <th style="text-align: center;">
                      {{tlt('sms_model_variable_label1')}}
                    </th>
                    <th style="text-align: center;">
                      {{tlt('sms_model_values_label1')}}
                    </th>
                    </tr>
                    <tr
                      v-for="(item, k) in choosen_template.variable_list"
                      :key="k"
                    >
                   
                    <td v-for="(value, e) in item"
                    :key="e">
                      {{e}}:
                    </td>
                    <td>
                      <input class="form-control" 
                         type="text"
                         @keyup="preview_template('new')"
                         v-for="(value, f) in item"
                          :key="f"
                         v-model="choosen_template.variable_list[k][f]" 
                         style="
                          width: 100%;
                          height: 25px;
                          margin-left: 10px;
                        "
                        :title="f == 'customer_name'? 'Customers Name will be picked from customers list while sending SMS':''"
                        :disabled="f == 'customer_name'"
                      >
                    </td>
                    </tr>
                   </tbody>
                 </table>
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
                {{tlt('sms_model_cancel_btn')}}
              </button>
              <!-- <button
                v-show="current_step == 1 && Boolean(choosen_template) != false"
                type="button"
                class="darkblue-btn"
                @click="change_step(2)"
              >
                Next
              </button>
              <button
                v-show="current_step == 2"
                type="button"
                class="darkblue-btn"
                @click="change_step(1)"
              >
                Back
              </button> -->
              <!-- <button
                v-show="current_step == 2"
                type="button"
                class="darkblue-btn"
                @click="preview_template('new')"
              >
                Preview
              </button> -->
              <button
                type="submit"
                class="darkblue-btn"
                id="res_n_int_save"
                data-dismiss=""
                @click="save_template()"
              >
                {{tlt('sms_model_add_btn')}}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      id="sendsms"
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
              <h3>{{tlt('sms_template_model_send_header')}}</h3>
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
                <p class="mt-2 mb-0" style="color: #414141">{{tlt('sms_template_model_name_label')}}</p>
              </h5>
              <div style="padding-left: 20px">
                <p>{{ current_template.template_name }}</p>
              </div>
            </div>
            <div class="form-group">
              <div class="d-flex">
                <h5>
                  <p class="mt-2 mb-0" style="color: #414141">{{tlt('sms_template_model_sendto_label')}}</p>
                </h5>
                <span
                  v-if="!send_sms_all_customer"
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
                    title="you can also specify name while adding new number in this way (+91 9999999999,John Doe), note this would only work in the case where you add new number."
                  >
                  </i>
                </span>
              </div>
              <div class="radio my-auto" style="padding-left: 20px">
                <label>
                  <input
                    type="radio"
                    v-model="send_sms_all_customer"
                    :value="true"
                    id="send_sms_all_customer_true_id"
                  />
                  <span class="icn" id="filter_portal_user_radio"></span>
                  {{tlt('sms_template_model_all_cust_label')}}
                </label>
                <label>
                  <input
                    type="radio"
                    v-model="send_sms_all_customer"
                    :value="false"
                    id="send_sms_all_customer_false_id"
                  />
                  <span class="icn"></span>
                  {{tlt('sms_template_model_specific_cust_label')}}
                </label>
              </div>
            </div>
            <div class="form-group" v-if="!send_sms_all_customer">
              <label>
                {{tlt('sms_template_model_add_customer_text')}}
              </label>
              <div class="d-flex mb-3">
                <input 
                  class="form-control"
                  type="text"
                  :placeholder="tlt('customer_name')" 
                  v-model="add_customer_name"
                  style="width: 12rem; margin-right: 9px;"
                 >
                <vue-phone-number-input 
                  v-model="add_customer_contact_number" 
                  :no-use-browser-locale="true"
                  @update="phoneNumber = $event"
                >
                </vue-phone-number-input>
                <button
                  id="alternate_product_name_add_btn"
                  class="darkblue-btn ml-2"
                  @click="add_customer"
                >
                  {{tlt('sms_model_add_btn')}}
                </button>
              </div>
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
                :placeholder="tlt('customer_numer')"
                :max-height="400"
                label="customer_name"
                track-by="phone"
                open-direction="below"
              >
                <!-- <span>{{ selected_role }}</span> -->
              </multiselect>
            </div>
            <div class="form-group">
              <h5>
                <p class="mt-2 mb-0" style="color: #414141">{{tlt('sms_template_model_body_label')}}</p>
              </h5>
              <div style="padding-left: 20px">
                <p>{{ current_template.template_body }}</p>
              </div>
            </div>
            <div class="form-group">
              <h5>
                <p class="mt-2 mb-0" style="color: #414141">{{tlt('sms_template_model_variables_header')}}</p>
              </h5>
              <table>
                <tbody>
                <tr>
                <th style="text-align: center;">
                  {{tlt('sms_template_model_variable_label')}}
                </th>
                <th style="text-align: center;">
                  {{tlt('sms_template_model_values_label')}}
                </th>
                </tr>
                <tr
                  v-for="(item, l) in current_template.variable_list"
                  :key="l"
                >
                <td class="col-4" v-for="(value, g) in item"
                    :key="g">
                  {{g}}
                </td>
                <td class="col-8">
                  <input class="form-control" 
                      type="text"
                      v-for="(value, h) in item"
                      :key="h" 
                      v-model="current_template.variable_list[l][h]"
                      style="
                      width: 100%;
                      height: 25px;
                      margin-left: 10px;
                    "
                    :title="h == 'customer_name'? 'Customers Name will be picked from customers list while sending SMS':''"
                    :disabled="h == 'customer_name'"
                  >
                </td>
                </tr>
                </tbody>
              </table>
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
                {{tlt('sms_model_cancel_btn')}}
              </button>
              <button
                type="submit"
                class="darkblue-btn"
                id="save_sms_button"
                @click="send_sms()"
              >
                {{tlt('sms_model_send_btn')}}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="preview_template_visible"
      role="dialog"
      aria-labelledby="preview_template_visible"
      aria-hidden="true"
      style="z-index: 2000;"
    >
      <div
        class="modal-dialog modal-dialog-centered modal"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <i style='font-size:24px; padding-right: 10px; padding-top: 3px;' class='far'>&#xf27a;</i>
            <h5 class="modal-title">
              {{tlt('sms_model_preview_header')}} 
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
            <textarea class="text-area" disabled name="msg" v-model="preview_template_data"></textarea>
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
            <h5 class="modal-title">
              {{tlt('sms_model_add_on_header')}} 
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
            <div>
            </div>
            <p v-show="credits_balance != null"
              v-html="credits_balance"> &nbsp; &nbsp;
            </p>
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
import { freeze_portal,show_subscription_expired_swal , close_modal } from "@/portal/mixins";
import Multiselect from "vue-multiselect";
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';


export default {
  name: "SmsTemplatePage",
  components: {
    VueEditor,
    Multiselect,
    VuePhoneNumberInput,
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
      is_sms: false,
      is_email: true,
      save_subject: "",
      is_publish_sms: true,
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
      preview_template_data: "",
      template_name_already_exist: false,
      edit_template_name_already_exist: false,
      page_array: [],
      send_sms_all_customer: true,
      customers_list: [],
      specific_customer_list: [],
      disable_btn_expired: false,
      // current_step: 1,
      choosen_template: null,
      isVisibleSearchClear: false,
      search_name: "",
      add_customer_contact_number: null,
      add_customer_name: null,
      phoneNumber: null,
      credits_balance: null
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
  },
  mounted() {
    setTimeout(() => {
      this.freeze_portal();
    }, 2000);
     this.$root.$on("SmsTemplatePageDisabled", (data) =>{
      if(data===true){
        this.disable_btn_expired = true;
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
  },
  methods: {
    add_customer() {
      if(this.phoneNumber.isValid == true && this.add_customer_name != "") {
        this.customers_list.push(
          {
            'phone': this.phoneNumber.formattedNumber,
            'country': this.phoneNumber.countryCode,
            'customer_name': this.add_customer_name
          }
        )
        this.specific_customer_list.push(
          {
            'phone': this.phoneNumber.formattedNumber,
            'country': this.phoneNumber.countryCode,
            'customer_name': this.add_customer_name
          }
        )
        this.add_customer_name = "";
      } else {
        Swal({
          text: this.tlt('sms_template_valid_phone_no'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    },
    check_addons_balance() {
      axios.post(
        api_calls.check_addons_balance(),
        {
          company_name: this.companyname,
          company_id: this.companyid,
          check_balance: true
        },
        {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
      )
      .then((response) =>{
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
      if (this.search_name != ""){
        this.spinnerOn = true;
        axios
          .post(
            api_calls.template_promotional_sms(),
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
            if (this.api_status_code.NO_SMS_TEMPLATE_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
              this.templatelist = [];
              return;
            } else if (this.api_status_code.TEMPLATE_SEARCH_RESULT_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
              this.templatelist = response.data.data.templates;
              if (this.templatelist.length > 0) {
                this.show_template(0);
              }
              this.number_of_rows = response.data.pagination.total_data == undefined ? 0 : response.data.pagination.total_data;
              this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
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
      if (this.template_name == ""){
        Swal({
          text: this.tlt('sms_template_name_blank_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      } 
      if(this.choosen_template == null){
        Swal({
          text: "Please select the template",
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      }
      if(this.choosen_template != null){
        var check = false;
        for(var i in this.choosen_template.variable_list) {
          if (this.choosen_template.variable_list[i] == ""){
            check = true
          }
        }
        if (check) {
          Swal({
          text: this.tlt('sms_template_values_cannot_blank'),
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
        this.spinnerOn = true;
        var template_details = {
          template_name: this.template_name,
          parent_template_id: this.choosen_template.template_id,
          template_body: this.choosen_template.template_body,
          variable_list: this.choosen_template.variable_list,
          template_example: this.choosen_template.template_example
        }
        axios
        .post(
          api_calls.template_promotional_sms(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            is_save: true,
            is_notification: this.is_notification_template,
            template_details: template_details
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          this.spinnerOn = false;
          if (this.api_status_code.SUCCESSFUL_DB_QUERY_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
            $("#addtemplatemodel").modal("hide");
            Swal({
              type: "success",
              text: this.tlt('template_data_added_msg'),
              timer: 2500,
            }).then((result) => {
              this.empty_variable();
              this.load_templates();
            });
            this.isEditTemplate = false;
          } else if (this.api_status_code.UNSUCCESSFUL_DB_QUERY.MSG_CODE == response.data.message.MSG_CODE) {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              type: "error"
            })
            this.isEditTemplate = false;
            return;
          } else {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              type: "error"
            })
            this.isEditTemplate = false;
            return;
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
          this.close_modal('res_n_int_save')
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
      if (this.current_template.template_name == ""){
        Swal({
          text: this.tlt('sms_edit_template_name_blank_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      } 
      if(this.current_template != null){
        var check = false;
        for(var i in this.current_template.variable_list) {
          if (this.current_template.variable_list[i] == ""){
            check = true
          }
        }
        if (check) {
          Swal({
          text: this.tlt('sms_edit_template_values_cannot_blank'),
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
          parent_template_id: this.current_template.parent_template_id,
          template_id: this.current_template.template_id,
          template_body: this.current_template.template_body,
          variable_list: this.current_template.variable_list,
          template_example: this.current_template.template_example
        }
        axios
        .post(
          api_calls.template_promotional_sms(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            template_details: template_details,
            template_id: this.current_template.template_id,
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
          if (this.api_status_code.SUCCESSFUL_DB_QUERY_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
            $("#addtemplatemodel").modal("hide");
            Swal({
              type: "success",
              text: this.tlt('template_data_edit_msg'),
              timer: 2500,
            }).then((result) => {
              this.empty_variable();
              this.load_templates();
            });
            this.isEditTemplate = false;
          } else if (this.api_status_code.UNSUCCESSFUL_DB_QUERY.MSG_CODE == response.data.message.MSG_CODE) {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              type: "error"
            })
            this.isEditTemplate = false;
          } else {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              type: "error"
            })
            this.isEditTemplate = false;
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
    // change_step(val) {
    //   if (val == 2 && Boolean(this.choosen_template) != false){
    //     this.current_step = 2
    //   }else if(val == 1) {
    //     this.current_step = 1
    //   } else {
    //     Swal({
    //       text: this.tlt('select_template_msg'),
    //       toast: true,
    //       position: "top-end",
    //       type: "warning",
    //       showConfirmButton: false,
    //       timer: 2500,
    //     });
    //   }
    // },
    load_customer_list() {
      this.spinnerOn = true;
      axios
        .post(
          api_calls.template_promotional_sms(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
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
            this.customers_list = response.data.data.customer_list;
          } else if (this.api_status_code.NO_CUSTOMER_DATA_AVAILABLE_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
            this.customers_list = [];
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
    send_sms() {
      if(!this.disable_btn_expired){
        axios.post(
        api_calls.template_promotional_sms(),
        {
          company_name: this.companyname,
          company_id: this.companyid,
          email: this.$session.get("UserInformation").email,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens,
          subscription: this.$session.get("UserInformation").subscription,
          is_notification: this.is_notification_template,
          template_id: this.current_template.template_id,
          send_sms_all_customer: this.send_sms_all_customer, 
          specific_customers_list: this.specific_customer_list,
          send_sms: true
        },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          },
        }
      )
      .then((response) =>{
        if (this.api_status_code.SMS_TEMPLATE_NOT_FOUND_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
          Swal({
              title: this.tlt('send_sms_credit1'),
              text: this.tlt('no_credits_left_msg'),
              type: "warning",
              showConfirmButton: false,
              timer: 2500,
            });
            
        } else if (this.api_status_code.NO_CUSTOMER_DATA_AVAILABLE_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
          Swal({
            title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              type: "info",
              toast: true
          })
          
        } else if (this.api_status_code.NON_US_SMS_CREDITS_EXCEEDS_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
            Swal({
              title: this.tlt('send_sms_credit1'),
              text: this.tlt('no_credits_left_msg'),
              type: "warning",
              showConfirmButton: true,
              timer: 4000,
            });
            
        } else if (this.api_status_code.SENDING_SMS_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
            Swal({
              title: this.tlt('sms_is_sent_msg'),
              type: "success",
              showConfirmButton: true,
              timer: 2500,
            });
            this.empty_variable();
        
        } else if (this.api_status_code.US_SMS_CREDITS_EXCEEDS_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              type: "warning",
              showConfirmButton: false,
              timer: 4000,
            });
            
        } else {
          Swal({
            title: response.data.message.MSG_CODE,
            text: response.data.message.MSG,
            showCancelButton: false,
            showConfirmButton: true,
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

      
      }else{
        this.show_subscription_expired_swal();
      }
        this.close_modal('save_sms_button')
    },
    validate_template_name() {
      axios.post(
        api_calls.template_promotional_sms(),
        {
          company_name: this.companyname,
          company_id: this.companyid,
          email: this.$session.get("UserInformation").email,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens,
          subscription: this.$session.get("UserInformation").subscription,
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
      .then((response) =>{
        if (this.api_status_code.SMS_TEMPLATE_NAME_DOES_NOT_EXISTS_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
            this.template_name_already_exist = false;
            document.getElementById("template_name_add_id").style.border =null;
            if(this.template_name != ""){
              // document.getElementById("template_name_add_id").style.border =
              // "1px solid green";
            }
          } else if (this.api_status_code.SMS_TEMPLATE_NAME_EXISTS_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
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
        api_calls.template_promotional_sms(),
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
      .then((response) =>{
        if (this.api_status_code.SMS_TEMPLATE_NAME_DOES_NOT_EXISTS_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
          this.edit_template_name_already_exist = false;
          document.getElementById("edit_template_name_id").style.border =null;
          if(this.current_template.template_name != ""){
            // document.getElementById("edit_template_name_id").style.border =
            // "1px solid #00f000";
          }
        } else if (this.api_status_code.SMS_TEMPLATE_NAME_EXISTS_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
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
    preview_template(val) {
      this.spinnerOn = true;
      if (val == "old") {
        var template_body = this.current_template.template_body
        var variables_list = this.current_template.variable_list
      } else if (val == "new") {
        var template_body = this.choosen_template.template_body
        var variables_list = this.choosen_template.variable_list
      }
      axios
      .post(
        api_calls.template_promotional_sms(),
        {
          company_id: this.company_id,
          company_name: this.company_name,
          is_notification: this.is_notification_template,
          is_preview: true,
          template_body: template_body,
          variables_list: variables_list
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
          this.preview_template_data = response.data.data.body;
          if(val == "old"){
            $("#preview_template_visible").modal("show");
          }
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
        return this.tlt('send_bulk_msg');
      } else {
        return this.tlt('email_to_specific_customer');
      }
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
    delete_template() {
      if(this.checked_list.length < 1){
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
          api_calls.template_promotional_sms(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            is_notification: this.is_notification_template,
            is_delete: true,
            template_list: this.checked_list
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          this.spinnerOn = false;
          this.load_templates();
          this.empty_variable();
          this.checked_list = [];
          if (this.api_status_code.SUCCESSFUL_DB_QUERY_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
            Swal({
              text: this.tlt('template_deleted_msg'),
              type: "success",
              showConfirmButton: false,
              timer: 2500,
            });
            return;
          } else if (this.api_status_code.UNSUCCESSFUL_DB_QUERY_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
            Swal({
              text: this.tlt('sms_internal_server'),
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

      // Get default templates
      this.spinnerOn = true;
      axios
        .post(
          api_calls.template_promotional_sms(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            is_notification: this.is_notification_template,
            is_get_default_templates: true
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
            this.default_templatelist = [];
            if (this.api_status_code.STATUS_SUCCESS_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
              this.default_templatelist = response.data.data.default_templates;
              return;
            } else if (this.api_status_code.NO_DEFAULT_SMS_TEMPLATE_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
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
            this.isEditTemplate = false;
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

      // Get Saved Templates
      axios
        .post(
          api_calls.template_promotional_sms(),
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
          this.templatelist = [];
          this.number_of_rows = response.data.pagination.total_data == undefined ? 0 : response.data.pagination.total_data;
          this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
          if (this.api_status_code.NO_SMS_TEMPLATE_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
            this.templatelist = [];
            return;
          } else if(this.api_status_code.TEMPLATE_SEARCH_RESULT_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
            this.templatelist = response.data.data.templates;
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
              api_calls.template_promotional_sms(),
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
              this.number_of_rows = response.data.pagination.total_data == undefined ? 0 : response.data.pagination.total_data;
              this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
              if (this.api_status_code.NO_SMS_TEMPLATE_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
                this.templatelist = [];
                return;
              } else if(this.api_status_code.TEMPLATE_SEARCH_RESULT_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
                this.templatelist = response.data.data.templates;
                if (this.templatelist.length > 0) {
                  this.current_template = this.templatelist[0];
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
        }else {
          if (page == "...s") {
            this.page_no = Math.ceil((1 + this.page_no) / 2);
          } else if (page == "...l") {
            this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
          } else {
            this.page_no = page;
          }
          $("input:checkbox").prop("checked", false);
          axios
          .post(
            api_calls.template_promotional_sms(),
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
            if (this.api_status_code.NO_SMS_TEMPLATE_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
              this.templatelist = [];
              return;
            } else if (this.api_status_code.TEMPLATE_SEARCH_RESULT_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
              this.templatelist = response.data.data.templates;
              if (this.templatelist.length > 0) {
                this.show_template(0);
              }
              this.number_of_rows = response.data.pagination.total_data == undefined ? 0 : response.data.pagination.total_data;
              this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
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
      this.current_template = JSON.parse(JSON.stringify(this.templatelist[index]));
      this.old_template_name = this.current_template.template_name;
      this.current_template_index = index;
      this.isEditTemplate = false;
    },
    empty_variable() {
      if(!this.disable_btn_expired) {
        this.choosen_template = null;
        this.current_step = 1;
        this.specific_customer_list = [];
        this.save_sms = "";
        this.template_name = "";
        this.old_template_name = "";
        this.template_name_already_exist = false;
        document.getElementById("template_name_add_id").style.border = null;
      }else {
        this.show_subscription_expired_swal();
      }
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

<style scoped>
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
.table-responsive {
  height: 75vh;
  overflow-y: auto;
  border: 1px solid #e3e2e5;
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

</style>