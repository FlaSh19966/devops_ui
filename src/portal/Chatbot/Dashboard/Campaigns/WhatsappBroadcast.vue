<template>
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
          <h4 class="mb-sm-0">{{ tlt("Whatsapp Broadcast") }}</h4>
          <div class="card-act d-flex flex-wrap">
            <input
              class="form-control search-bar"
              id="search_bar_id"
              :placeholder="tlt('Search broadcast here')"
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
              {{ tlt("Publish Broadcast") }}
            </a>
            <a
              id="add_template_btn"
              href="#"
              class="darkblue-btn"
              v-if="disable_btn_expired"
              title="Add new Broadcast"
              @click="empty_variable"
            >
              {{ tlt("Create Broadcast") }}
            </a>
            <a
              id="add_template_btn"
              v-else
              href="#"
              class="darkblue-btn"
              data-toggle="modal"
              data-target="#addbroadcastmodel"
              title="Add new Broadcast"
              @click="empty_variable"
            >
              {{ tlt("Create Broadcast") }}
            </a>
            <a
              href="javascript:void(0)"
              class="red-btn"
              id="delete_broadcast"
              style="font-size: 15px"
              @click="delete_broadcast"
            >
              {{ tlt("delete_btn") }}
            </a>
          </div>
        </div>
        <div class="card-body py-0" id="page">
          <div class="col-sm-12 d-flex px-0" v-if="broadcast_list.length > 0">
            <div class="col-sm-4 pl-0" style="height: 80vh; overflow-y: auto">
              <div class="table-box">
                <div class="table-responsive">
                  <table class="table" style="overflow-y: auto">
                    <thead>
                      <th scope="row">
                        <div class="form-check checkbox checkbox-success">
                          <label class="form-check-label">
                            <input
                              class="form-check-input"
                              id="selectall"
                              type="checkbox"
                              @change="selected_broadcast('all')"
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
                        {{ tlt("Broadcasts") }}
                      </th>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(broadcast, index) in broadcast_list"
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
                                @change="selected_broadcast(broadcast.id)"
                              />
                              <span class="icn"></span>
                            </label>
                          </div>
                        </td>
                        <td
                          style="cursor: pointer"
                          @click="show_broadcast(index)"
                          :title="broadcast.name"
                        >
                          <template>
                            <p style="margin-bottom: 0">
                              {{ broadcast.name }}
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
              v-if="broadcast_list.length > 0"
            >
              <div style="border: 1px solid #dbe2e8">
                <div class="col-sm-12">
                  <div style="color: #414141" class="d-flex">
                    <h5 class="pt-2">{{ tlt("Broadcast Details") }}</h5>
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
                      {{ tlt("Broadcast Name") }}
                    </p>
                  </h5>
                  <div v-if="!isEditBroadcast" style="padding-left: 20px">
                    <p>{{ current_broadcast.name }}</p>
                  </div>
                  <div v-else>
                    <input
                      id="edit_template_name_id"
                      type="text"
                      v-model.trim="current_broadcast.name"
                      v-on:keyup="validate_edit_broadcast_name"
                      class="form-control edit"
                      style="padding: 0.375rem 0.75rem"
                      :placeholder="tlt('Campaign Name')"
                    />
                    <span
                      v-show="edit_broadcast_name_already_exist"
                      style="color: red"
                      >{{
                        tlt("A Broadcast with this name already exists.")
                      }}</span
                    >
                  </div>
                </div>
                <div class="col-sm-12" style="margin-bottom: 1rem">
                  <h5>
                    <p class="mt-2 mb-0" style="color: #414141">
                      {{ tlt("Contacts") }}
                    </p>
                  </h5>
                  <div v-if="!isEditBroadcast" style="padding-left: 20px">
                    <div
                      class="d-flex"
                      style="
                        width: 100%;
                        background: #f7f8fb;
                        border: solid 1px #dbe2e8;
                      "
                    >
                      <div class="col-sm-3 p-0" style="width: 16%">
                        <p
                          class="p-2"
                          style="
                            margin: 0px;
                            width: 84%;
                            font: normal normal normal 16px/22px Roboto;
                            letter-spacing: 0px;
                            color: #414141;
                          "
                        >
                          {{ tlt("NAME") }}
                        </p>
                      </div>
                      <div class="col-sm-9 p-0">
                        <p
                        class="p-2"
                          style="
                            margin: 0px;
                            width: 84%;
                            font: normal normal normal 16px/22px Roboto;
                            letter-spacing: 0px;
                            color: #414141;
                          "
                        >
                          {{ tlt("NUMBER") }}
                        </p>
                      </div>
                    </div>
                    <div class="ScrollStyle">
                      <table
                        class="table table-bordered table-sm"
                        cellspacing="0"
                        width="100%"
                        id="dtVerticalScrollExample"
                      >
                        <tbody>
                          <tr
                            v-for="(
                              contact, index
                            ) in current_broadcast.contacts"
                            :key="index"
                          >
                            <td class="col-sm-3 px-2">{{ contact.profile_name }}</td>
                            <td class="col-sm-9 px-2">
                              {{ contact.whatsapp_phone_number }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div id="list_id" v-else>
                    <multiselect
                      v-model="current_broadcast.contacts"
                      :options="contacts_list"
                      id="current_broadcast_list_id"
                      :searchable="true"
                      @search-change="search_customer_list($event, search_customer = $event)"
                      :max-height="400"
                      :multiple="true"
                      :custom-label="nameWithNumber"
                      placeholder="Search Name or number"
                      track-by="whatsapp_phone_number"
                      open-direction="top"
                    >
                    </multiselect>
                  </div>
                </div>
                <div class="modal-footer" v-if="isEditBroadcast">
                  <div class="dash-modal">
                    <div class="btn-wrap text-right mt-0 py-0 border-top-0">
                      <button
                        type="button"
                        class="btn btn-link"
                        style="border-radius: 0"
                        data-dismiss="modal"
                        @click="edit_template_details"
                      >
                        {{ tlt("cancel_btn") }}
                      </button>
                      <button
                        type="submit"
                        class="darkblue-btn"
                        id="res_n_int_save"
                        @click="edit_broadcast()"
                      >
                        {{ tlt("save_btn") }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-12 d-flex px-0 py-5" v-else-if="search_name == ''">
            <h4 class="mx-auto">
              {{
                tlt(
                  "Looks like you don't have any broadcasts added. Let's begin by clicking on Create Broadcast."
                )
              }}
            </h4>
          </div>
          <div
            class="col-sm-12 d-flex px-0 py-5"
            v-else-if="broadcast_list.length == 0 && search_name != ''"
          >
            <h4 class="mx-auto">{{ tlt("Searched Broadcast not found.") }}</h4>
          </div>
          <div
            class="pagin-table pb-3"
            v-if="broadcast_list.length > 0"
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
      id="addbroadcastmodel"
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
              <h3>{{ tlt("Create Broadcast") }}</h3>
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
              <h5 class="heading">{{ tlt("Broadcat Name") }}</h5>
              <div class="ml-3">
                <input
                  id="template_name_add_id"
                  type="text"
                  v-model.trim="name"
                  v-on:keyup="validate_broadcast_name"
                  class="form-control"
                  :placeholder="tlt('Broadcast Name')"
                />
                <span
                  v-show="broadcast_name_already_exist"
                  style="color: red"
                  >{{ tlt("Broadcast with this name already exists") }}</span
                >
              </div>
            </div>
            <div class="form-group">
              <h5 class="heading"></h5>
              <div id="list_id" class="ml-3">
                <multiselect
                  v-model="select_customer_list"
                  :options="contacts_list"
                  id="contact_list_id"
                  :searchable="true"
                  @search-change="search_customer_list($event, search_customer = $event)"
                  :close-on-select="false"
                  :multiple="true"
                  :taggable="true"
                  tag-position="top"
                  :placeholder="tlt('Search name or number')"
                  :max-height="600"
                  :custom-label="nameWithNumber"
                  track-by="whatsapp_phone_number"
                  open-direction="top"
                >
                </multiselect>
              </div>
            </div>
            <div class="form-group"></div>
          </div>
          <div class="modal-footer">
            <div class="btn-wrap text-right mt-0 py-0 border-top-0">
              <button
                type="button"
                class="btn btn-link"
                data-dismiss="modal"
                @click="empty_variable()"
              >
                {{ tlt("cancel_btn") }}
              </button>
              <button
                type="submit"
                class="darkblue-btn"
                id="res_n_int_save"
                @click="save_template()"
              >
                {{ tlt("save_btn") }}
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
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt />
              </div>
              <h3>{{ tlt("Publish Broadcast") }}</h3>
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
                <p class="mt-2 mb-0" style="color: #414141">
                  {{ tlt("Campaign Name") }}
                </p>
              </h5>
              <div style="padding-left: 20px">
                <p>{{ current_broadcast.name }}</p>
              </div>
            </div>
            <div class="form-group m-0">
              <div class="d-flex">
                <h5>
                  <p class="mb-0" style="color: #414141">
                    {{ tlt("Select template") }}
                  </p>
                </h5>
              </div>
            </div>
            <div id="template_list_id" class="form-group">
                <multiselect
                  v-model="select_template_list"
                  :options="templatelist"
                  id="select_template_id"
                  :searchable="true"
                  @search-change="search_template(($event, search_template_name = $event))"
                  :hide-selected="true"
                  :close-on-select="false"
                  :multiple="true"
                  :taggable="true"
                  placeholder="Search template"
                  :max-height="400"
                  label="template_name"
                  track-by="template_id"
                  open-direction="up"
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
                {{ tlt("cancel_btn") }}
              </button>
              <button
                type="submit"
                class="darkblue-btn"
                id="send_broadcast"
                @click="send_broadcast()"
              >
                {{ tlt("send_btn") }}
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
import {
  freeze_portal,
  show_subscription_expired_swal,
  close_modal,
} from "@/portal/mixins";
import Multiselect from "vue-multiselect";
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";

export default {
  name: "WhatsappBroadcastPage",
  components: {
    VueEditor,
    Multiselect,
    VuePhoneNumberInput,
  },
  mixins: [freeze_portal, show_subscription_expired_swal, close_modal],
  data() {
    return {
      broadcast_list: [],
      search_template_name: '',
      select_template_list:[],
      pencil_svg:
        ' <svg xmlns="http://www.w3.org/2000/svg" width="15.546" height="15.461" viewBox="0 0 15.546 15.461"><defs><style>.a{fill:#9e9e9e;}</style></defs><g transform="translate(-747.888 -356.769)"><path class="a" d="M759.416,356.769a2.358,2.358,0,0,1,1.777.662c.534.513,1.072,1.025,1.567,1.575a2.3,2.3,0,0,1-.071,3.325c-2.736,2.76-5.494,5.5-8.238,8.251a1.381,1.381,0,0,1-.758.288c-.719.174-1.429.379-2.144.572-.932.251-1.862.5-2.795.751-.6.158-.989-.213-.832-.807q.689-2.595,1.406-5.182a1.164,1.164,0,0,1,.289-.487q4.091-4.107,8.2-8.2A2.265,2.265,0,0,1,759.416,356.769Zm-1.989,2.956-6.54,6.538,3.025,3.024,6.538-6.537Zm4.023,2.165c.118-.135.225-.269.343-.392a1.134,1.134,0,0,0,0-1.734c-.46-.466-.926-.925-1.388-1.39a1.166,1.166,0,0,0-.861-.368c-.578,0-.881.4-1.214.76Zm-12.084,8.863,3.2-.863-2.337-2.331Z" transform="translate(0)"/><path class="a" d="M813.942,422.6l-.789-.8,3.821-3.819.784.8Z" transform="translate(-59.648 -55.947)"/></g></svg>',
      company_id: this.$session.get("UserInformation").company_id,
      company_name: this.$session.get("UserInformation").company_name,
      spinnerOn: false,
      name: "",
      templatelist: [],
      checked_list: [],
      current_broadcast: {},
      old_broadcast_name: "",
      current_broadcast_highlight_name: "",
      isEditBroadcast: false,
      number_of_rows: null,
      total_pages: null,
      page_no: 1,
      per_page: 10,
      broadcast_name_already_exist: false,
      edit_broadcast_name_already_exist: false,
      page_array: [],
      contacts_list: [],
      select_customer_list: [],
      contacts_list_pagination: 1,
      contacts_list_search_pagination: 1,
      template_list_pagination: 1,
      template_list_search_pagination: 1,
      contacts_list_pagination_count: 0,
      contacts_list_search_pagination_count: 0,
      template_list_pagination_count: 0,
      template_list_search_pagination_count: 0,
      search_customer: "",
      disable_btn_expired: false,
      isVisibleSearchClear: false,
      search_name: "",
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
        this.get_data();
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
    this.get_data();
    //   if (this.is_notification_template === false) {
    this.load_customer_list();
    this.get_template_data();
    //   }
    var vm = this;
    $("#selectall").click(function () {
      this.isEditBroadcast = false;
      if ($(this).is(":checked")) {
        $("input:checkbox").prop("checked", true);
      } else {
        vm.checked_list = [];
        $("input:checkbox").prop("checked", false);
      }
    });
    const el = document.querySelector("#list_id");
    el.onwheel = this.handleWheel;
    const el1 = document.querySelector("#template_list_id");
    el1.onwheel = this.handleWheel_template;
  },
  methods: {
    nameWithNumber({ profile_name, whatsapp_phone_number }) {
      return `${profile_name} : ${whatsapp_phone_number}`;
    },
    handleWheel(event, data, func) {
      if (event.deltaY > 0) {
        if(this.search_customer != ""){
          if (
            this.contacts_list_search_pagination < this.contacts_list_search_pagination_count
          ){
            this.contacts_list_search_pagination += 1;
            this.search_customer_list(this.search_customer, 'scroll');
          }
        }else if (
          this.contacts_list_pagination < this.contacts_list_pagination_count
        ) {
          this.contacts_list_pagination += 1;
          this.load_customer_list('scroll');
        }
      }
    },
    handleWheel_template(event, data, func) {
      if (event.deltaY > 0) {
        if(this.search_template_name != ""){
          if (
            this.template_list_search_pagination < this.template_list_search_pagination_count
          ){
            this.template_list_search_pagination += 1;
            this.search_template(this.search_template_name, 'scroll');
          }
        }else if (
          this.template_list_pagination < this.template_list_pagination_count
        ) {
          this.template_list_pagination += 1;
          this.get_template_data('scroll');
        }
      }
    },
    clear_search_name() {
      this.search_name = "";
    },
    callsearch() {
      if (this.search_name != "") {
        this.spinnerOn = true;
        axios
          .post(
            api_calls.whatsapp_broadcasts(),
            {
              company_id: this.company_id,
              company_name: this.company_name,
              is_search: true,
              page_no: 1,
              per_page: this.per_page,
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
            this.broadcast_list = [];
            if (
              this.api_status_code.DATA_AVAILABLE.MSG_CODE ===
              response.data.message.MSG_CODE
            ) {
              this.broadcast_list = response.data.data.broadcasts;
              if (this.broadcast_list.length > 0) {
                this.show_broadcast(0);
              }
              this.number_of_rows = response.data.pagination.total_data;
              this.total_pages = response.data.pagination.total_page;
              this.setpagination(1);
            } else if (
              this.api_status_code.NO_DATA_AVAILABLE.MSG_CODE ===
              response.data.message.MSG_CODE
            ) {
              this.broadcast_list = [];
              return;
            } else {
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                type: "error",
              });
            }
            this.isEditBroadcast = false;
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
    save_template() {
      if (this.name == "") {
        Swal({
          text: this.tlt("Broadcast name cannot be blank."),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      }
      if (this.select_customer_list.length < 2) {
        Swal({
          text: this.tlt("Minimum two contacts required to create a broadcast."),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      }
      if (this.broadcast_name_already_exist == true) {
        return;
      }
      this.spinnerOn = true;
      axios
        .post(
          api_calls.whatsapp_broadcasts(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            is_save: true,
            broadcast: {
              id: this.create_UUID(),
              name: this.name,
              contacts: this.select_customer_list,
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
          if (
            this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE ===
            response.data.message.MSG_CODE
          ) {
            $("#addbroadcastmodel").modal("hide");
            Swal({
              type: "success",
              text: this.tlt("Broadcast data added successfully"),
              timer: 2500,
            }).then((result) => {
              this.empty_variable();
              this.get_data();
            });
          } else if (
            this.api_status_code.INSUFFICIENT_WHATSAPP_BROADCAST_INFORMATION.MSG_CODE ===
            response.data.message.MSG_CODE
          ) {
            Swal({
              type: "warning",
              text: this.tlt("Minimum two contacts required to create a broadcast"),
              timer: 2500,
            });
          } else {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              type: "error",
            });
          }
          this.isEditBroadcast = false;
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
      this.close_modal("res_n_int_save");
    },
    edit_template_details() {
      if (!this.isEditBroadcast) {
        this.isEditBroadcast = true;
      } else {
        this.isEditBroadcast = false;
        this.get_data();
        this.edit_broadcast_name_already_exist = false;
      }
    },
    edit_broadcast() {
      if (this.current_broadcast.name == "") {
        Swal({
          text: this.tlt("Broadcast name cannot be blank"),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      }
      if (this.current_broadcast.contacts.length < 2) {
        Swal({
          text: this.tlt("Minimum two contacts required for a broadcast."),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      }
      if (this.edit_broadcast_name_already_exist == true) {
        return;
      }
      this.spinnerOn = true;
      axios
        .post(
          api_calls.whatsapp_broadcasts(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            is_edit: true,
            broadcast: {
              id: this.current_broadcast.id,
              name: this.current_broadcast.name,
              contacts: this.current_broadcast.contacts,
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
          if (
            response.data.message.MSG_CODE ===
            this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE
          ) {
            $("#addbroadcastmodel").modal("hide");
            Swal({
              type: "success",
              text: this.tlt("Broadcast data edited successfully"),
              timer: 2500,
            }).then((result) => {
              this.empty_variable();
              this.get_data();
            });
          } else if (
            response.data.message.MSG_CODE ==
            this.api_status_code.INSUFFICIENT_WHATSAPP_BROADCAST_INFORMATION.MSG_CODE
          ) {
            Swal({
              type: "error",
              text: this.tlt("Minimum two contacts required for a broadcast"),
              timer: 2500,
            });
          } else {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              type: "error",
            });
          }
          this.isEditBroadcast = false;
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
    load_customer_list(type) {
      if(type !== 'scroll'){
        this.contacts_list_pagination = 1;
      }
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
          if(type !== 'scroll'){
            this.contacts_list = [];
          }
          if (
            response.data.message.MSG_CODE ===
            this.api_status_code.DATA_AVAILABLE.MSG_CODE
          ) {
            for (var i in response.data.data.contacts_list) {
              this.contacts_list.push(response.data.data.contacts_list[i]);
            }
            this.contacts_list_pagination_count =
              response.data.pagination.total_page;
          } else if (
            response.data.message.MSG_CODE ===
            this.api_status_code.NO_CONTACTS_DATA_AVAILABLE.MSG_CODE
          ) {
            this.contacts_list = [];
          } else {
            Swal({
              text: this.tlt("some_error_msg"),
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
    search_customer_list(query, type) {
      if (query != "") {
        if(type !== 'scroll'){
          this.contacts_list_search_pagination = 1;
        }
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
              page_no: this.contacts_list_search_pagination,
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
              this.contacts_list = [];
            }
            if (
              response.data.message.MSG_CODE ===
              this.api_status_code.DATA_AVAILABLE.MSG_CODE
            ) {
              for (var i in response.data.data.contacts_list) {
                this.contacts_list.push(response.data.data.contacts_list[i]);
              }
              this.contacts_list_search_pagination_count =
                response.data.pagination.total_page;
            } else if (
              response.data.message.MSG_CODE ===
              this.api_status_code.NO_CONTACTS_DATA_AVAILABLE.MSG_CODE
            ) {
              this.contacts_list = [];
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
      } else {
        this.load_customer_list();
      }
    },
    send_broadcast() {
      var list = [];
      if (this.select_template_list.length != 0) {
        for (var i in this.select_template_list) {
          list.push(this.select_template_list[i].template_id);
        }
      } else {
        Swal({
          title: this.tlt("Please select atleast one template"),
          type: "warning",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
        });
        return;
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
              publish_template: true,
              send_to: 'broadcast',
              broadcast_ids: [this.current_broadcast.id],
              template_id: list,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            if (
              this.api_status_code.EMPTY_CONTACT_LIST.MSG_CODE ===
              response.data.message.MSG_CODE
            ) {
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                type: "error",
              });
              return;
            } else if (
              this.api_status_code.WHATSAPP_MEDIA_SEND_FAILURE.MSG_CODE ===
              response.data.message.MSG_CODE
            ) {
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                type: "error",
              });
              return;
            } else if (
              this.api_status_code.WHATSAPP_USER_LIMIT_REACHED.MSG_CODE ===
              response.data.message.MSG_CODE
            ) {
              Swal({
                title: this.tlt("tier_specific_user_limit_reached"),
                text: this.tlt("tier_specific_user_limit_reached_msg"),
                type: "warning",
                showConfirmButton: false,
                timer: 4000,
              });
              return;
            } else if (
              this.api_status_code.MESSAGE_SENDING_LIMIT_REACHED.MSG_CODE ===
              response.data.message.MSG_CODE
            ) {
              Swal({
                type: "warning",
                text: "Message Sending Limit Reached",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                confirmButtonText: this.tlt("email_temp_swal_upgrade_now_msg"),
                cancelButtonText: this.tlt("email_temp_swal_upgrade_later_msg"),
                cancelButtonColor: "#d33",
              }).then((result) => {
                if (result.value == true) {
                  this.$router.push({
                    name: "Settings",
                    params: { Subscription: true },
                  });
                }
              });
              return;
            } else if (
              this.api_status_code.SENDING_TEMPLATE.MSG_CODE ===
              response.data.message.MSG_CODE
            ) {
              Swal({
                title: this.tlt("send_template_sent_msg"),
                type: "success",
                showConfirmButton: false,
                timer: 2500,
              });
              this.empty_variable();
              $("#sendtemplate").modal("hide");
            } else {
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                type: "error",
              });
              return;
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
        this.close_modal("send_broadcast");
      } else {
        this.show_subscription_expired_swal();
      }
    },
    validate_broadcast_name() {
      axios
        .post(
          api_calls.whatsapp_broadcasts(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            is_unique: true,
            broadcast_name: this.name,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          if (
            this.api_status_code.STATUS_SUCCESS.MSG_CODE ===
            response.data.message.MSG_CODE
          ) {
            this.broadcast_name_already_exist = false;
            document.getElementById("template_name_add_id").style.border = null;
            if (this.name != "") {
              // document.getElementById("template_name_add_id").style.border =
              // "1px solid green";
            }
          } else if (
            this.api_status_code.DATA_ALREADY_EXIST.MSG_CODE ===
            response.data.message.MSG_CODE
          ) {
            this.broadcast_name_already_exist = true;
            document.getElementById("template_name_add_id").style.border =
              "1px solid red";
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
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    validate_edit_broadcast_name() {
      axios
        .post(
          api_calls.whatsapp_broadcasts(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            subscription: this.$session.get("UserInformation").subscription,
            is_unique: true,
            broadcast_name: this.current_broadcast.name,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          if (
            this.api_status_code.STATUS_SUCCESS.MSG_CODE ===
            response.data.message.MSG_CODE
          ) {
            this.edit_broadcast_name_already_exist = false;
            document.getElementById("edit_template_name_id").style.border =
              null;
            if (this.current_broadcast.name != "") {
              // document.getElementById("edit_template_name_id").style.border =
              // "1px solid #00f000";
            }
          } else if (
            this.api_status_code.DATA_ALREADY_EXIST.MSG_CODE ===
            response.data.message.MSG_CODE
          ) {
            if (this.old_broadcast_name == this.current_broadcast.name) {
              this.edit_broadcast_name_already_exist = false;
              document.getElementById("edit_template_name_id").style.border =
                null;
            } else {
              this.edit_broadcast_name_already_exist = true;
              document.getElementById("edit_template_name_id").style.border =
                "1px solid red";
            }
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
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    selected_broadcast(value) {
      if (value == "all") {
        if (event.target.checked) {
          this.checked_list = [];
          for (var i in this.broadcast_list) {
            this.checked_list.push(this.broadcast_list[i].id);
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
          var temp = this.checked_list.filter((id) => {
            return id != value;
          });
          this.checked_list = temp;
        }
      }
    },
    delete_broadcast() {
      if (this.checked_list.length < 1) {
        Swal({
          text: this.tlt("Select atleast one template to delete."),
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
          api_calls.whatsapp_broadcasts(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            is_notification: this.is_notification_template,
            is_delete: true,
            broadcast_ids: this.checked_list,
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
          this.get_data();
          if (
            response.data.message.MSG_CODE ===
            this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE
          ) {
            this.checked_list = [];
            Swal({
              text: this.tlt("Broadcast Deleted Successfully"),
              type: "success",
              showConfirmButton: false,
              timer: 2500,
            });
            $("input:checkbox").prop("checked", false);
            return;
          } else if (
            response.data.message.MSG_CODE ==
            this.api_status_code.UNSUCCESSFUL_DB_OPERATION.MSG_CODE
          ) {
            this.checked_list = [];
            Swal({
              text: this.tlt("query_executed_msg"),
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
              type: "error",
            });
            $("input:checkbox").prop("checked", false);
          }
          this.isEditBroadcast = false;
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
    get_template_data(type){
      if(type !=='scroll'){
        this.template_list_pagination = 1;
      }
      axios
        .post(
          api_calls.whatsapp_template(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            is_get: true,
            is_notification: this.is_notification_template,
            page_no: 5,
            per_page: this.template_list_pagination,
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
            this.templatelist = [];
          }
          if (
            response.data.message.MSG_CODE ===
            this.api_status_code.DATA_AVAILABLE.MSG_CODE
          ) {
            for (var i in response.data.data.templates) {
              this.templatelist.push(response.data.data.templates[i]);
            }
            this.template_list_pagination_count =
              response.data.pagination.total_page;
          } else if (
            response.data.message.MSG_CODE ===
            this.api_status_code.NO_WHATSAPP_TEMPLATE.MSG_CODE
          ) {
            this.templatelist = [];
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
    get_data() {
      this.current_broadcast = {};
      // Get Saved Templates
      this.spinnerOn = true;
      axios
        .post(
          api_calls.whatsapp_broadcasts(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
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
          if (
            response.data.message.MSG_CODE ===
            this.api_status_code.DATA_AVAILABLE.MSG_CODE
          ) {
            this.broadcast_list = [];
            this.broadcast_list = response.data.data.broadcasts;
            this.number_of_rows = response.data.pagination.total_data;
            this.total_pages = response.data.pagination.total_page;
            if (this.broadcast_list.length > 0) {
              this.show_broadcast(0);
            }
            this.setpagination(this.page_no);

            this.isEditBroadcast = false;
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
    search_template(query, type){
      if(query != ""){
        if(type !== 'scroll'){
          this.template_list_search_pagination = 1;
        }
        axios
          .post(
            api_calls.whatsapp_template(),
            {
              company_id: this.company_id,
              company_name: this.company_name,
              is_search: true,
              page_no: this.template_list_search_pagination,
              per_page: this.per_page,
              is_notification: this.is_notification_template,
              search_key: query,
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
              this.templatelist = [];
            }
            if (
              this.api_status_code.DATA_AVAILABLE.MSG_CODE ===
              response.data.message.MSG_CODE
            ) {
              for (var i in response.data.data.templates) {
                this.templatelist.push(response.data.data.templates[i]);
              }
              this.template_list_search_pagination_count =
                response.data.pagination.total_page;
            } else if (
              this.api_status_code.NO_WHATSAPP_TEMPLATE.MSG_CODE ===
              response.data.message.MSG_CODE
            ) {
              this.templatelist = [];
              return;
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
      }else{
        this.get_template_data();
      }
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
              api_calls.whatsapp_broadcasts(),
              {
                company_id: this.company_id,
                company_name: this.company_name,
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
              if (
                response.data.message.MSG_CODE ===
                this.api_status_code.DATA_AVAILABLE.MSG_CODE
              ) {
                this.broadcast_list = [];
                this.broadcast_list = response.data.data.broadcasts;
                this.number_of_rows = response.data.pagination.total_data;
                this.total_pages = response.data.pagination.total_page;
                if (this.broadcast_list.length > 0) {
                  this.show_broadcast(0);
                }
                this.setpagination(this.page_no);

                this.isEditBroadcast = false;
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
              this.broadcast_list = [];
              this.isEditBroadcast = false;
              if (
                this.api_status_code.DATA_AVAILABLE.MSG_CODE ===
                response.data.message.MSG_CODE
              ) {
                this.broadcast_list = response.data.data.broadcasts;
                if (this.broadcast_list.length > 0) {
                  this.show_broadcast(0);
                }
                this.number_of_rows = response.data.pagination.total_data;
                this.total_pages = response.data.pagination.total_page;
                this.setpagination(1);
              } else if (
                this.api_status_code.NO_WHATSAPP_TEMPLATE.MSG_CODE ===
                response.data.message.MSG_CODE
              ) {
                this.broadcast_list = [];
                return;
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
    show_broadcast(index) {
      this.current_broadcast = JSON.parse(
        JSON.stringify(this.broadcast_list[index])
      );
      this.old_broadcast_name = this.current_broadcast.name;
      this.current_broadcast_highlight_name = this.current_broadcast.name;
      this.current_broadcast_index = index;
      this.isEditBroadcast = false;
    },
    empty_variable() {
      if (!this.disable_btn_expired) {
        this.select_customer_list = [];
        this.name = "";
        this.old_broadcast_name = "";
        this.current_broadcast = {};
        this.current_broadcast_highlight_name = ""
        this.broadcast_name_already_exist = false;
        document.getElementById("template_name_add_id").style.border = null;
      } else {
        this.show_subscription_expired_swal();
      }
    },
    check_current_template_active(index) {
      // console.table(index, this.broadcast_list[index], this.current_broadcast);
      if (Boolean(this.broadcast_list[index]) === true) {
        return this.broadcast_list[index].name === this.current_broadcast_highlight_name
          ? "current-active-template"
          : null;
      }
    },
  },
};
</script>
  
  <style scoped>
#contact_table {
  min-height: 10px !important;
  overflow-y: scroll !important;
}
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
.template-input-title {
  margin-top: 1rem;
  margin-bottom: 0rem;
}
.input_text_box textarea {
  outline: 0 !important;
  /* border-width:2px !important;
    border-color: #47a884 !important; */
  padding: 10px 15px !important;
  resize: none !important;
  width: 100% !important;
  height: 180px !important;
  overflow: hidden !important;
  line-height: 20px !important;
}
.ScrollStyle {
  min-height: 0px;
  max-height: 510px;
  overflow-y: auto;
  /* border: 1px solid #e3e2e5; */
}
.ScrollStyle thead th {
  top: 0;
  position: sticky;
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
</style>