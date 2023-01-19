<template>
  <div>
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <div class="dash-cont">
      <div class="container-fluid">
        <div class="card dash-card">
          <div
            class="card-header d-block d-sm-flex flex-wrap justify-content-between"
          > 
            <div class="d-sm-flex justify-content-start">
              <h4 class="mb-sm-0 mr-3">{{tlt('permission_page_title')}}</h4>
              <div class="radio my-auto">
                <label>
                  <input
                    type="radio"
                    v-model="filter_user_type"
                    value="Portal"
                    id="filter_portal_box"
                  />
                  <span class="icn" id="filter_portal_user_radio"></span>
                  {{tlt('permission_page_portal_label')}}
                </label>
                <label>
                  <input
                    type="radio"
                    v-model="filter_user_type"
                    value="Bot"
                    id="filter_bot_box"
                  />
                  <span class="icn"></span> {{tlt('permission_page_bot_label')}}
                </label>
              </div>
            </div>
            <div class="card-act d-flex flex-wrap justify-content-end">
              <!-- <a href="#" class="red-btn" @click="delete_selected">
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

              <!-- for search -harsh -->
              <!-- <input
                class="form-control search-bar"
                id="search_bar"
                placeholder="Search here"
                v-model="search_name"
                v-on:keyup="callsearch"
              />
              <a type="button" v-if="isVisibleSearchClear" class="btn bg-transparent mt-auto mb-auto py-0" 
                @click="clear_search_name" style="margin-left: -40px; z-index: 10;">
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
              </a> -->

              <a
                href="#"
                class="darkblue-btn"
                data-toggle="modal"
                @click="role_modal('open')"
                id="add_permissions_btn"
                v-if = "isShow_portal_roles == false"
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
                {{tlt('add_permission_btn')}}
              </a>
            </div>
          </div>
          <div class="card-body">
            <div class="table-box">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <!-- <th scope="col">
                        <div class="form-check checkbox checkbox-success">
                          <label class="form-check-label">
                            <input
                              id="selectall"
                              class="form-check-input"
                              @change="selected_roles('all')"
                              type="checkbox"
                              value
                              required
                            />
                            <span class="icn"></span>
                          </label>
                        </div>
                      </th> -->
                      <th scope="col" style="width: 7%">{{tlt('portal_user_action_header')}}</th>
                      <th scope="col">{{tlt('portal_user_role_name_header')}}</th>
                      <th scope="col">{{tlt('portal_user_user_type_header')}}</th>
                      <th scope="col" class="w-50">{{tlt('portal_user_permissions_header')}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="page_no == 1 && isShow_portal_roles == true">
                      <!-- <th scope="row">
                        <div class="form-check checkbox checkbox-success">
                          <label class="form-check-label">
                            <input class="form-check-input" type="checkbox" />
                            <span class="icn"></span>
                          </label>
                        </div>
                      </th> -->
                      <td class="action"></td>
                      <td>{{tlt('portal_user_admin_label')}}</td>
                      <td>{{tlt('portal_user_type_label')}}</td>
                      <td>{{tlt('portal_user_text')}}</td>
                    </tr>

                    <tr v-for="(role, index) in roles" :key="index">
                      <!-- <th scope="row">
                        <div class="form-check checkbox checkbox-success">
                          <label class="form-check-label">
                            <input
                              class="form-check-input"
                              @change="selected_roles(index)"
                              :id="'check_' + index"
                              type="checkbox"
                            />
                            <span class="icn"></span>
                          </label>
                        </div>
                      </th> -->
                      <td class="action">
                        <a
                          class="#"
                          id="edit_btn"
                          style="cursor: pointer"
                          data-toggle="modal"
                          @click="edit_modal(index)"
                          data-target="#intentmodal"
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
                        <!-- <a href="#" class="trash" @click="delete_role(index)">
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
                            ></path>
                          </svg>
                        </a>-->
                      </td>
                      <td>{{ role.user_role }}</td>
                      <td>{{ role.user }}</td>
                      <td>
                        <span
                          class="multiselect__tag"
                          v-for="(permission, index) in role.permissions"
                          :key="index"
                          >{{ permission }} &nbsp;</span
                        >
                        <span
                          v-show="
                            role.permissions.length == 0 &&
                            role.user == 'Portal User'
                          "
                          >Please enable access of portal menu to this
                          role.</span
                        >
                        <span
                          v-show="
                            role.permissions.length == 0 &&
                            role.user == 'Bot User'
                          "
                          >Please enable the task which will be accessible by
                          this bot user.</span
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                class="modal fade dash-modal"
                id="intentmodal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="intentmodeltitle"
                aria-hidden="true"
                data-keyboard="false"
                data-backdrop="static"
              >
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-body">
                      <div class="modal-head d-flex align-items-center">
                        <div class="head-icn">
                          <img src="/img/msg-blue.png" alt />
                        </div>
                        <h3>{{tlt('permission_model_header')}}</h3>
                      </div>
                      <!-- <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        @click="clear_fields"
                        aria-label="Close"
                      >
                        <img src="/static/img/close-icn.png" alt>
                      </button>-->
                      <button
                        @click="clear_fields"
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <img src="/img/close-icn.png" alt />
                      </button>
                      <div class="radio" style="margin-left: 25%">
                        <label
                        :style="user_type === 'Portal'? 
                          '':'cursor: not-allowed'">
                          <input
                            type="radio"
                            @change="role_modal('toggle')"
                            v-model="user_type"
                            value="Portal"
                            id="portal_box"
                            :disabled="this.user_type_change != true"
                          />
                          <span class="icn" id="portal_user_radio"
                          :style="user_type === 'Portal'? 
                          '':'background: rgb(244 244 244); cursor: not-allowed'"></span>
                          {{tlt('permission_model_portal_user_label')}}
                        </label>
                        <label
                        :style="user_type === 'Bot'? 
                          '':'cursor: not-allowed'">
                          <input
                            type="radio"
                            @change="role_modal('toggle')"
                            id="bot_box"
                            v-model="user_type"
                            value="Bot"
                            :disabled="this.user_type_change != true"
                          />
                          <span class="icn"
                          :style="user_type === 'Bot'? 
                          '':'background: rgb(244 244 244); cursor: not-allowed'"></span> {{tlt('permission_model_bot_user_label')}}
                        </label>
                      </div>
                      <form  id="permissions_form">
                        <div
                          class="form-group"
                          v-if="user_type == 'Bot' && bot_roles.length > 0"
                        >
                          <label>{{tlt('permission_model_role_name_label')}}</label>
                          <!-- <select
                            v-model="selected_role"
                            class="form-control"
                            id="select_role_name"
                          >
                            <option value disabled>Select Role Name</option>
                            <option
                              v-for="(role, index) in bot_roles"
                              :key="index"
                            >
                              {{ role.role }}
                            </option>
                          </select> -->
                          <multiselect
                            v-model="selected_role"
                            :options="bot_roles"
                            id="select_role_name"
                            :searchable="true"
                            :close-on-select="true"
                            :taggable="false"
                            :multiple="false"
                            :placeholder="tlt('select_role_msg')"
                            :max-height="200"
                            :disabled="this.select_role_name_disable ==true"
                          >
                          <!-- <span>{{ selected_role }}</span> -->
                          </multiselect>
                        </div>
                        <div
                          class="form-group"
                          v-if="
                            user_type == 'Portal' && portal_roles.length > 0
                          "
                        >
                          <label>{{tlt('permission_model_portal_role_label')}}</label>
                          <!-- <select
                            v-model="selected_role"
                            class="form-control"
                            id="select_role_name"
                          >
                            <option value disabled>Select Role Name</option>
                            <option
                              v-for="(role, index) in portal_roles"
                              :key="index"
                            >
                              {{ role.role }}
                            </option>
                          </select> -->
                          <multiselect
                            v-model="selected_role"
                            :options="portal_roles"
                            id="select_role_name"
                            :searchable="true"
                            :close-on-select="true"
                            :taggable="false"
                            :multiple="false"
                            :placeholder="tlt('select_role_msg')"
                            :max-height="200"
                            :disabled="this.select_role_name_disable ==true"
                          >
                          <!-- <span>{{ selected_role }}</span> -->
                          </multiselect>
                        </div>
                        <div
                          class="form-group"
                          v-if="check_portal_bot_role_length"
                        >
                          <label>{{ permissions_title }}</label>
                          <multiselect
                            id="role_select"
                            :close-on-select="false"
                            v-if="user_type == 'Portal'"
                            :taggable="true"
                            :multiple="true"
                            :options="permissions_list"
                            :placeholder="tlt('select_permission')"
                            group-values="menu_list"
                            group-label="title"
                            :group-select="true"
                            track-by="sub_menu"
                            label="sub_menu"
                            v-model="selected_permissions"
                            @remove="remove_selected_permission"
                          >
                            <template slot="option" slot-scope="props">
                              <span
                                v-show="props.option.$groupLabel === undefined"
                              >
                                <!-- <svg
                                  :style="svg_enable(props.option.sub_menu)"
                                  xmlns="http://www.w3.org/2000/svg"
                                  style="fill:#fff;position: relative"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M0 0h24v24H0z" fill="#41b883"></path>
                                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                                </svg>-->
                                {{ props.option.sub_menu }}
                              </span>
                              <span
                                v-show="props.option.sub_menu === undefined"
                                >{{ props.option.$groupLabel }}</span
                              >
                            </template>
                            <!-- <template
                              slot="option"
                              slot-scope="props"
                            ></template>-->
                          </multiselect>
                          <multiselect
                            :close-on-select="false"
                            v-if="user_type == 'Bot'"
                            :taggable="true"
                            :multiple="true"
                            :options="permissions_list"
                            :placeholder="tlt('select_permission')"
                            track-by="permissions"
                            label="to_be_displayed"
                            group-label="Type"
                            group-values="Details"
                            :group-select="true"
                            v-model="selected_permissions"
                          ></multiselect>
                        </div>
                        <div class="btn-wrap text-right">
                          <button
                            type="button"
                            @click="clear_fields"
                            class="btn btn-link"
                            data-dismiss="modal"
                          >
                            {{tlt('permission_page_edit_cancel_btn')}}
                          </button>
                          <button
                            id="save_permissions"
                            type="submit"
                            class="darkblue-btn"
                            @click.prevent="save_role"
                          >
                            {{tlt('save_btn')}}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div class="pagin-table" style="margin: 0">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Multiselect from "vue-multiselect";
import Swal from "sweetalert2";
import { setTimeout } from "timers";
import sidebaritems from "../Layout/SideBarItem";
import api_calls from "@/portal/api_calls";
import { close_modal } from "@/portal/mixins";


export default {
  name: "permissions",
  components: {
    Multiselect,
  },
    mixins: [close_modal],

  data() {
    return {
      user: [],
      roles: [],
      page_no: 1,
      per_page: 10,
      selected_role: "",
      selected_permissions: [],
      role_list: [],
      complete_role_list: [],
      permissions_list: [],
      portal_permissions_list: [],
      bot_permissions_list: [],
      intentlist: [],
      checked_list: [],
      number_of_rows: null,
      total_pages: null,
      user_type: "Portal",
      menu_list_from_api: null,
      spinnerOn: false,
      companyid:
        this.$session.get("UserInformation").role == "SuperAdmin"
          ? this.$session.get("CompanyId")
          : this.$session.get("UserInformation").company_id,
      companyname:
        this.$session.get("UserInformation").role == "SuperAdmin"
          ? this.$session.get("CompanyName")
          : this.$session.get("UserInformation").company_name,
      user_role: this.$session.get("UserInformation").role,
      //harsh
      page_array: [],
      search_name: "",
      portal_roles: [],
      bot_roles: [],
      isShow_portal_roles: true,
      isShow_bot_roles: false,
      isVisibleSearchClear: false,
      select_role_name_disable: false,
      filter_user_type: "Portal",
      user_type_change: true, 
    };
  },
  computed: {
    permissions_title() {
      if (this.user_type == "Portal") {
        return this.tlt('portal_menu_label');
      } else if (this.user_type == "Bot") {
        return this.tlt('bot_intent_label');
      }
    },
    check_portal_bot_role_length() {
      if (this.user_type == "Portal" && this.portal_roles.length > 0) {
        return true;
      } else if (this.user_type == "Portal" && this.portal_roles.length == 0) {
        return false;
      } else if (this.user_type == "Bot" && this.bot_roles.length > 0) {
        return true;
      } else if (this.user_type == "Bot" && this.bot_roles.length == 0) {
        //console.log("emplty bot")
        return false;
      }
    },
  },
  created() {
    this.load_permission();
  },
  mounted() {
    var vm = this;
    // //console.log(this.page_no);
    $("#selectall").click(function () {
      if ($(this).is(":checked")) {
        // $('div:input').prop('checked',true);
        $("input:checkbox").prop("checked", true);
      } else {
        vm.checked_list = [];
        $("input:checkbox").prop("checked", false);
      }
    });
    $("#intentmodal").on("hidden.bs.modal", function (e) {
      vm.clear_fields();
      // vm.user_type = "Portal";
      vm.user_type_change = true
      vm.select_role_name_disable = false
    });
    $("select .form-control").on("click", function () {});
  },
  watch:{
        search_name(){
          if (this.search_name === ""){
          this.load_permission();
          this.isVisibleSearchClear = false;
          }
          else if (this.search_name !== ""){
            this.isVisibleSearchClear = true;
          }
        },
        filter_user_type(){
          if(this.filter_user_type == "Portal"){
            this.isShow_portal_roles = true;
            this.isShow_bot_roles = false;
            this.user_type = "Portal"
            this.load_permission()
          }else if( this.filter_user_type == "Bot"){
            this.isShow_bot_roles = true;
            this.isShow_portal_roles = false;
            this.user_type = "Bot"
            this.load_permission();
          }
        },
  },
  methods: {
    clear_search_name(){
      this.search_name = "";
    },
    remove_selected_permission(removedOption, id){
      if (removedOption.sub_menu == "Dashboard"){
        toastr.warning(this.tlt('permission_cannot_remove_select_msg'));
        this.add_selected_permission(removedOption.sub_menu);
      }
    },
    add_selected_permission(removedOption){
      this.selected_permissions.unshift({
        sub_menu: removedOption,
      })
    },
    load_permission(){
      this.spinnerOn = true;
      this.roles = [];
      this.portal_roles = [];
      this.bot_roles = [];
      this.permissions_list =[];
      this.selected_permissions = [];
      this.intentlist = []
      this.bot_permissions_list = [];
      this.portal_permissions_list = [];
      $("input:checkbox").prop("checked", false);
      if (
        !this.$session.has("CompanyId") &&
        this.$session.get("UserInformation").role == "SuperAdmin"
      ) {
        toastr.warning(this.tlt('permission_select_company_name_msg'));
      } else {
        this.companyid = this.$session.get("UserInformation").company_id;
        this.companyname = this.$session.get("UserInformation").company_name;
      }
      if (this.companyname !== undefined) {
        axios
          .post(
            api_calls.role_url(),
            {
              company_id: this.companyid,
              company_name: this.companyname,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              isShow: true,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            // //console.log(response,"-->load permissions")
            if (response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE.MSG_CODE){
            this.number_of_rows = response.data.pagination.total_data == undefined ? 0 : response.data.pagination.total_data;
            this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
            this.update_list(response.data.data);
            }
            else if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
          Swal({
            type: "error",
            text: this.tlt('add_role_internal_server_msg'),
            timer:3000,     
          });
        }else if (response.data.message.MSG_CODE == this.api_status_code.EMPTY_DATA.MSG_CODE) {
          Swal({
            type: "info",
            text: this.tlt('no_data_text'),
            timer:3000,  
            toast:true,
            position:"top-end",
            showConfirmButton: false,   
          });  
        }else {
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
        axios
          .post(
            api_calls.portal_permissions_url(),
            {
              company_id: this.companyid,
              company_name: this.companyname,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              isDropdown: true,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            //console.log(response.data.data[0].Bot.length,"-->permission url")
            if (response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE.MSG_CODE){
              this.complete_role_list = response.data.data;
              if (response.data.data[0].Portal.length > 0) {
                for (let i = 0; i < response.data.data[0].Portal.length; i++) {
                  this.portal_roles.push(
                    response.data.data[0].Portal[i]
                  );
                }
              }
              if (response.data.data[0].Bot.length > 0) {
                for (let i = 0; i < response.data.data[0].Bot.length; i++) {
                  this.bot_roles.push(
                    response.data.data[0].Bot[i]
                  );
                }
              }
            }
          else if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
            Swal({
              type: "error",
              text: this.tlt('add_role_internal_server_msg'),
              timer:3000,     
            });
          }
          else if (response.data.message.MSG_CODE == this.api_status_code.EMPTY_DATA.MSG_CODE) {
            Swal({
              type: "info",
              text: this.tlt('no_data_text'),
              timer:3000, 
              toast:true,
              position: "top-end",
              showConfirmButton: false,
            });  
          }else {
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
        axios
          .post(
            api_calls.portal_permissions_url(),
            {
              company_id: this.companyid,
              company_name: this.companyname,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              isGetMenu: true,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            if (response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE.MSG_CODE){
              this.menu_list_from_api = response.data.data.Menu;
            let message = response.data.data.Menu;
            // //console.log(message);
            let menu = {};
            let main_menu_list = message.filter((arr) => (arr.IsMasterMenu == true) && (arr.Enabled == true));
            let main_menu_list_filtered = []
            let sub_menu_list = message.filter((arr) => (arr.HasSubMenus == false) && (arr.Enabled == true) && (arr.IsSubMenu == true));

            for (let i =0, n = main_menu_list.length; i < n; i += 1) {
              let menuFilter = sidebaritems.filter((sidebar) => {
                  return (
                    sidebar.name === main_menu_list[i].MenuItem && Boolean(sidebar.svg_html)
                  );
                });
              if (menuFilter.length > 0) {
                  main_menu_list_filtered.push(menuFilter[0]);
                  menu[menuFilter[0].name] = {
                    title: menuFilter[0].name,
                    menu_list: []
                  }
                  if (main_menu_list[i].HasSubMenus == false){
                      menu[menuFilter[0].name].menu_list.push({
                        sub_menu: menuFilter[0].name
                      });
                  }
              }
            }
            try {
              for(let i = 0, n = sub_menu_list.length; i < n; i += 1){
                for (var j in sidebaritems) {
                  if (
                    (sidebaritems[j].name === sub_menu_list[i].MenuItem) &&
                  (Boolean(sidebaritems[j].page_path && sidebaritems[j].master_menu === sub_menu_list[i].MasterMenu))
                ) {
                  // //console.log(sidebaritems[j].name)
                  let temp_var = {
                    sub_menu: sidebaritems[j].name
                  }
                  menu[sub_menu_list[i].MasterMenu].menu_list.push(temp_var)
                }

                }
              }
            } catch(e) {
              // //console.log(e);
              // debugger;
            }
            menu = Object.values(menu)
            // //console.log(menu);
            // menu = [];
            // var title = [];
            // var submenus = [];
            // for (let i = 0, n = response.data.Menu.length; i < n; i += 1) {
            //   if (
            //     response.data.Menu[i].HasSubMenus == false &&
            //     response.data.Menu[i].IsMasterMenu
            //   ) {
            //     for (var j in sidebaritems) {
            //       if (sidebaritems[j].name === response.data.Menu[i].MenuItem) {
            //         title = sidebaritems[j].name;
            //         submenus.push({
            //           sub_menu: sidebaritems[j].name,
            //         });
            //         if (response.data.Menu[i].Enabled) {
            //           this.selected_permissions.push({
            //             sub_menu: sidebaritems[j].name,
            //           });
            //         }
            //       }
            //     }
            //   } else if (
            //     response.data.Menu[i].HasSubMenus == true &&
            //     response.data.Menu[i].IsMasterMenu
            //   ) {
            //     for (var j in sidebaritems) {
            //       if (sidebaritems[j].name === response.data.Menu[i].MenuItem) {
            //         title = sidebaritems[j].name;
            //       }
            //     }
            //   } else if (
            //     response.data.Menu[i].HasSubMenus == false &&
            //     response.data.Menu[i].IsSubMenu
            //   ) {
            //     for (var j in sidebaritems) {
            //       if (sidebaritems[j].name === response.data.Menu[i].MenuItem) {
            //         if (response.data.Menu[i].Enabled) {
            //           this.selected_permissions.push({
            //             sub_menu: sidebaritems[j].name,
            //           });
            //         }
            //         submenus.push({
            //           sub_menu: sidebaritems[j].name,
            //         });
            //       }
            //     }
            //   }
            //   if (i === n - 1) {
            //     menu.push({
            //       title: title,
            //       menu_list: submenus,
            //     });
            //     title = [];
            //     submenus = [];
            //   } else if (
            //     i < n - 1 &&
            //     response.data.Menu[i + 1].HasSubMenus == true &&
            //     response.data.Menu[i + 1].IsMasterMenu
            //   ) {
            //     menu.push({
            //       title: title,
            //       menu_list: submenus,
            //     });
            //     title = [];
            //     submenus = [];
            //   }
            // }
            // //console.log(menu);
            this.portal_permissions_list = menu;
            }
          else if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
            Swal({
              type: "error",
              text: this.tlt('add_role_internal_server_msg'),
              timer:3000,     
            });
          }
          else if (response.data.message.MSG_CODE == this.api_status_code.EMPTY_DATA.MSG_CODE) {
            Swal({
              type: "info",
              text: this.tlt('no_data_text'),
              timer:3000, 
              toast:true,
              position: "top-end",
              showConfirmButton: false,    
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
            // //console.log(response,"portal permissions url")
            
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
      axios
        .post(
          api_calls.get_task_list(),
          {
            company_id: this.companyid,
            company_name: this.companyname,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            isGetMenu: true,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          if (response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE.MSG_CODE){
              // //console.log(response,"get task list")
            for (var i in response.data.data) {
              this.bot_permissions_list.push({
                permissions: response.data.data[i],
                to_be_displayed: response.data.data[i],
              });
            }
            for (let i = 0; i < this.bot_permissions_list.length; i++) {
              this.bot_permissions_list[
                i
              ].to_be_displayed = this.bot_permissions_list[i].to_be_displayed
                .replace(/_/g, " ")
                .toLowerCase()
                .split(" ")
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(" ");
              this.bot_permissions_list[
                i
              ].to_be_displayed = this.bot_permissions_list[
                i
              ].to_be_displayed.replace(/Form/g, "");
            }
            this.update_bot_roles();
          }
          else if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
            Swal({
              type: "error",
              text: this.tlt('add_role_internal_server_msg'),
              timer:3000,     
            });
          }
          else if (response.data.message.MSG_CODE == this.api_status_code.EMPTY_DATA.MSG_CODE) {
            Swal({
              type: "info",
            text: this.tlt('no_data_text'),
            timer:3000,  
            toast:true,
            position:"top-end",
            showConfirmButton: false,   
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
          //console.log(e);
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
      if(this.filter_user_type == "Portal"){
        axios
          .post(
            api_calls.portal_permissions_url(),
            {
              company_id: this.companyid,
              company_name: this.companyname,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              isShow: this.isShow_portal_roles,
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
            if (response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE.MSG_CODE){
              // //console.log(response , "portal permissions url")
              
              this.roles = [];
              var list = response.data.data.RolePermissionData;
              for (var i in list) {
                var permissions = list[i].Menu.filter((menulist) => {
                  if (menulist.Enabled && !menulist.HasSubMenus) {
                    return menulist.MenuItem;
                  }
                });
                var perm_list = [];
                for (var j in permissions) {
                  perm_list.push(permissions[j].MenuItem);
                }
                this.roles.push({
                  user_role: list[i].Role,
                  user: list[i].UserType,
                  permissions: perm_list,
                });
              }
              this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
              this.setpagination(1);
            }
          else if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
            Swal({
              type: "error",
              text: this.tlt('add_role_internal_server_msg'),
              timer:3000,     
            });
          }
          else if (response.data.message.MSG_CODE == this.api_status_code.EMPTY_DATA.MSG_CODE) {
            Swal({
              type: "info",
              text: this.tlt('no_data_text'),
              timer:3000, 
              toast:true,
              position: "top-end",
              showConfirmButton: false,   
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
            if (
              e.response.status === 410 ||
              e.response.status === 440 ||
              e.response.status === 409
            ) {
              this.$root.$emit("Session_Expired", e.response.data);
            }
          });
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
        .then((response) => 
          {
              if (response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE.MSG_CODE){
                // //console.log(response , "portal permissions url")
                // //console.log(response,"show intent url")
                for (var i in response.data.data) {
                  this.intentlist.push({
                    // permissions: response.data[i].replace(this.companyid + "_", ""),
                    // to_be_displayed: response.data[i].replace(this.companyid + "_", ""),
                    permissions: response.data.data[i],
                    to_be_displayed: response.data.data[i],
                  });
                }
              }
            else if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
              Swal({
                type: "error",
                text: this.tlt('add_role_internal_server_msg'),
                timer:3000,     
              });
            }
            else if (response.data.message.MSG_CODE == this.api_status_code.EMPTY_DATA.MSG_CODE) {
              Swal({
                type: "info",
            text: this.tlt('no_data_text'),
            timer:3000,  
            toast:true,
            position:"top-end",
            showConfirmButton: false,   
              });  
            }  else {
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
            console.log(e)
            if (
              e.response.status === 410 ||
              e.response.status === 440 ||
              e.response.status === 409
            ) {
              this.$root.$emit("Session_Expired", e.response.data);
            }
          });
      },
    svg_enable(value) {
      for (var i in this.selected_role) {
        if (this.selected_role[i].sub_menu == value) {
          return;
        } else {
          return "display:none";
        }
      }
    },
    selected_roles(index) {
      if (index == "all") {
        if (event.target.checked) {
          var temp = this.roles;
          this.checked_list = temp;
        } else if (!event.target.checked) {
          this.checked_list = [];
        }
      } else {
        if (event.target.checked == true) {
          let val_index = this.checked_list.indexOf(this.roles[index]);
          var temp = this.roles[index];
          if (val_index == -1) {
            this.checked_list.push(temp);
          }
        } else if (event.target.checked == false) {
          var selectall = document.querySelector("#selectall");
          if (selectall.checked == true) {
            selectall.checked = false;
          }
          var temp = this.checked_list.filter((roles) => {
            return role.role !== index;
          });
          this.checked_list = temp;
        }
      }
    },
    role_modal(type) {
      event.preventDefault();
      // debugger;
      // if(type == 'toggle'){
      if (this.user_type === null) {
        // toastr.error("Please select either of the User Types");
      } else {
        this.role_list = this.complete_role_list[this.user_type];
      }
      if (this.user_type == "Portal") {
        if (this.portal_roles.length > 0) {
          this.role_list = this.complete_role_list["Portal"];
          this.permissions_list = this.portal_permissions_list;
        } else {
          toastr.error(this.tlt('permission_no_roles_portal_type_msg'));
        }
      } else if (this.user_type == "Bot") {
        if (this.bot_roles.length > 0) {
          this.role_list = this.complete_role_list["Bot"];
          this.permissions_list = [
            {
              Type: "Actions",
              Details: this.bot_permissions_list,
            },
            {
              Type: "Intents",
              Details: this.intentlist,
            },
          ];
          this.selected_permissions = "";
        } else {
          Swal.fire({
            text: this.tlt('permission_no_roles_bot_type_msg'),
            type: "warning",
            showConfirmButton: true,
            timer: 6000,
          });
          // toastr.warning("No Roles Added for Bot User Type. Please Add a Role from the 'Roles' Page to continue adding Permissions.");
        }
      }
      
      if (type == "open") {
        this.selected_role = "";
        this.selected_permissions = [];
        this.user_type_change = false;
        // if (this.portal_roles.length > 0 || this.bot_roles.length > 0) {
        if (this.bot_roles.length > 0) {
          // this.clear_fields()
          $("#intentmodal").modal("show");
        } else {
          // toastr.error(
          //   "Please Add a Role from the 'Roles' Page to continue adding Permissions"
          // );
        }
      }
    },
    delete_selected() {
      event.preventDefault();
      let rolelist = [],
        restrictionlist = [];
      for (var i in this.roles) {
        rolelist.push(this.roles[index].role);
        restrictionlist.push(this.roles[index].permissions);
      }
      this.delete_qns_api(rolelist, restrictionlist);
    },
    delete_role(index) {
      event.preventDefault();
    },
    edit_modal(index) {
      this.user_type_change = false;
      this.select_role_name_disable = true;
      document.querySelector("#portal_box").disabled = true;
      document.querySelector("#bot_box").disabled = true;
      this.selected_role = this.roles[index].user_role;
      // //console.log(this.roles[index].user_role);
      this.user_type = this.roles[index].user.replace(" User", "");
      this.selected_permissions = [];
      if (this.user_type == "Bot") {
        // this.permissions_list = this.bot_permissions_list;
        this.permissions_list = [
          {
            Type: "Actions",
            Details: this.bot_permissions_list,
          },
          {
            Type: "Intents",
            Details: this.intentlist,
          },
        ];
      } else if (this.user_type == "Portal") {
        this.permissions_list = this.portal_permissions_list;
      }
      for (var j in this.roles[index].permissions) {
        if (this.user_type == "Bot") {
          this.selected_permissions.push({
            permissions: this.roles[index].original_permissions[j],
            to_be_displayed: this.roles[index].permissions[j],
          });
        } else if (this.user_type == "Portal") {
          this.selected_permissions.push({
            sub_menu: this.roles[index].permissions[j],
          });
        }
      }
      this.role_list = this.complete_role_list[this.user_type];
    },
    page_require(page) {
      if (page == 0 || page == this.total_pages + 1) {
        event.preventDefault();
      } else {
        if (this.search_name == "") {
          if (this.filter_user_type == "Portal"){
            if (page == "...s") {
              this.page_no = Math.ceil((1 + this.page_no) / 2);
            } else if (page == "...l") {
              this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
            } else {
              this.page_no = page;
            }
            $("input:checkbox").prop("checked", false);
            // this.page_no = page;
            this.spinnerOn = true;
              axios
                .post(
                  api_calls.portal_permissions_url(),
                  {
                    role: this.user_role,
                    company_name: this.companyname,
                    email: this.$session.get("UserInformation").email,
                    company_id: this.companyid,
                    license_key: this.$session.get("UserInformation").license_key,
                    token: this.$session.get("UserInformation").tokens,
                    isShow: this.isShow_portal_roles,
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
                  if (response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE.MSG_CODE){
            // //console.log(response , "portal perm")
                 
                  this.number_of_rows = response.data.pagination.total_data == undefined ? 0 : response.data.pagination.total_data;
                  this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
                  this.setpagination(this.page_no);
                  var list = response.data.data.RolePermissionData;
                  this.roles = [];
                  for (var i in list) {
                    var permissions = list[i].Menu.filter((menulist) => {
                      if (menulist.Enabled && !menulist.HasSubMenus) {
                        return menulist.MenuItem;
                      }
                    });
                    var perm_list = [];
                    for (var j in permissions) {
                      perm_list.push(permissions[j].MenuItem);
                    }
                    this.roles.push({
                      user_role: list[i].Role,
                      user: list[i].UserType,
                      permissions: perm_list,
                    });
                  }
                  this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
                  this.setpagination(this.page_no);
            }
            else if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
          Swal({
            type: "error",
            text: this.tlt('add_role_internal_server_msg'),
            timer:3000,     
          });
        }else if (response.data.message.MSG_CODE == this.api_status_code.EMPTY_DATA.MSG_CODE) {
          Swal({
            type: "info",
              text: this.tlt('no_data_text'),
              timer:3000, 
              toast:true,
              position: "top-end",
              showConfirmButton: false,    
          });  
        }else {
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
          } else if (this.filter_user_type == "Bot") {
            if (page == "...s") {
              this.page_no = Math.ceil((1 + this.page_no) / 2);
            } else if (page == "...l") {
              this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
            } else {
              this.page_no = page;
            }
            axios
              .post(
                api_calls.add_edit_bot_role(),
                {
                  company_id: this.companyid,
                  company_name: this.companyname,
                  email: this.$session.get("UserInformation").email,
                  license_key: this.$session.get("UserInformation").license_key,
                  token: this.$session.get("UserInformation").tokens,
                  isShow: this.isShow_bot_roles,
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
                 if (response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE.MSG_CODE){
            
                this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
                this.setpagination(this.page_no);
                this.roles = [];
                for (var i in response.data.data.BotRolePermissionData) {
                  // let botRoles = this.bot_roles.map(({ role }) => {
                  //   return role;
                  // });
                  // if (botRoles.includes(i)) {
                  if (this.bot_roles.includes(i)) {
                    this.roles.push({
                      user: "Bot User",
                      user_role: `${i}`,
                      input_enable: true,
                      permissions: response.data.data.BotRolePermissionData[i].map((res) => {
                        return res
                          .replace(/_/g, " ")
                          .toLowerCase()
                          .split(" ")
                          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                          .join(" ");
                      }),
                      original_permissions: response.data.data.BotRolePermissionData[i],
                    });
                  }
                }
                this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
                this.setpagination(this.page_no);
            }
            else if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
          Swal({
            type: "error",
            text: this.tlt('add_role_internal_server_msg'),
            timer:3000,     
          });
        }else if (response.data.message.MSG_CODE == this.api_status_code.EMPTY_DATA.MSG_CODE) {
          Swal({
            type: "info",
            text: this.tlt('no_data_text'),
            timer:3000,  
            toast:true,
            position:"top-end",
            showConfirmButton: false, 
          });  
        }else {
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
          }
        } else {
          if (page == "...s") {
            this.page_no = Math.ceil((1 + this.page_no) / 2);
          } else if (page == "...l") {
            this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
          } else {
            this.page_no = page;
          }
          this.spinnerOn = true;
          axios
            .post(
              api_calls.portal_permissions_url(),
              {
                company_id: this.$session.get("UserInformation").company_id,
                company_name: this.$session.get("UserInformation").company_name,
                license_key: this.$session.get("UserInformation").license_key,
                email: this.$session.get("UserInformation").email,
                token: this.$session.get("UserInformation").tokens,
                issearch: true,
                key: this.search_name,
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
              // //console.log("permission" , response)
              this.spinnerOn = false;
              if (
                response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE.MSG_CODE
              ) {
                var list = response.data.data.RolePermissionData;
                this.number_of_rows = response.data.pagination.total_data == undefined ? 0 : response.data.pagination.total_data;
                this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
                this.setpagination(this.page_no);
                this.roles = [];
                for (var i in list) {
                  var permissions = list[i].Menu.filter((menulist) => {
                    if (menulist.Enabled && !menulist.HasSubMenus) {
                      return menulist.MenuItem;
                    }
                  });
                  var perm_list = [];
                  for (var j in permissions) {
                    perm_list.push(permissions[j].MenuItem);
                  }
                  this.roles.push({
                    user_role: list[i].Role,
                    user: list[i].UserType,
                    permissions: perm_list,
                  });
                }
              }else if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
          Swal({
            type: "error",
            text: this.tlt('add_role_internal_server_msg'),
            timer:3000,     
          });
        }else if (response.data.message.MSG_CODE == this.api_status_code.EMPTY_DATA.MSG_CODE) {
          Swal({
            type: "info",
              text: this.tlt('no_data_text'),
              timer:3000, 
              toast:true,
              position: "top-end",
              showConfirmButton: false,   
          });  
        }else {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              type: "error"
            })
          }
              // else if(response.data.MSG=='No Results Found'){
              //   toastr.error("No role found");
              //   setTimeout(() => {
              //       this.$router.go();
              //     }, 2500);
              // }
              // else if(response.data.MSG=='Intrnal Server Error'){
              //   toastr.error("Intrnal Server Error");
              //   setTimeout(() => {
              //       this.$router.go();
              //     }, 2500);
              // }
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
    save_role() {
      if (this.selected_role == "" || this.selected_permissions.length == 0) {
      } else if (this.selected_role == "Admin") {
        this.clear_fields();
      } else if (this.user_type == "Portal") {
        var selected_menu = [];
        for (var i in this.selected_permissions) {
          selected_menu.push(this.selected_permissions[i].sub_menu);
        }
        for (var i in this.menu_list_from_api) {
          if (selected_menu.includes(this.menu_list_from_api[i].MenuItem))
            this.menu_list_from_api[i].Enabled = true;
          else this.menu_list_from_api[i].Enabled = false;
        }
        axios
          .post(
            api_calls.portal_permissions_url(),
            {
              company_id: this.companyid,
              company_name: this.companyname,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              isEdit: true,
              role_name: this.selected_role,
              user_type: this.user_type + " User",
              menu: this.menu_list_from_api,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
          Swal({
            type: "error",
            text: this.tlt('add_role_internal_server_msg'),
            timer:3000,     
          });
        }else if (response.data.message.MSG_CODE == this.api_status_code.EMPTY_DATA.MSG_CODE) {
          Swal({
            type: "info",
              text: this.tlt('no_data_text'),
              timer:3000, 
              toast:true,
              position: "top-end",
              showConfirmButton: false,    
          });  
        }
          else if (response.data.message.MSG_CODE == this.api_status_code.USER_ROLE_EDITED_SUCCESSFULLY_2002.MSG_CODE) {
              toastr.success(this.tlt('permission_updated_for_login_msg1'));
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
            $("#intentmodal").modal("hide");
            this.load_permission();
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
          this.close_modal('save_permissions')
      } else if (this.user_type == "Bot") {
        var selected_menu = [];
        for (var i in this.selected_permissions) {
          selected_menu.push(this.selected_permissions[i].permissions);
        }
        axios
          .post(
            api_calls.add_edit_bot_role(),
            {
              company_id: this.companyid,
              company_name: this.companyname,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              bot_role_name: this.selected_role,
              permission_list: selected_menu,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            if (response.data.message.MSG_CODE == this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE) {
              toastr.success(this.tlt('permission_updated_for_login_msg2'));
              this.load_permission();
            } else if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
              toastr.error(this.tlt('permission_internal_server_msg'));
            }
            else if (response.data.message.MSG_CODE == this.api_status_code.EMPTY_DATA.MSG_CODE) {
          Swal({
            type: "info",
            text: this.tlt('no_data_text'),
            timer:3000,  
            toast:true,
            position:"top-end",
            showConfirmButton: false,   
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
            $("#intentmodal").modal("hide");
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
          this.close_modal('save_permissions')
      }
    },
    edit_restrictions(index) {
      if (this.roles[index].user != "") {
        this.roles[index].input_enable = !this.roles[index].input_enable;
      }
      this.edit = true;
    },
    update_list(response) {
      // this.roles = [];
      var input;
      // //console.log(response,'responses');
      // console.log(response)
      if (response.restrictionlist[0] != null) {
      for (var i in response.restrictionlist) {
        if (response.restrictionlist[i] == "") {
          input = true;
        } else {
          input = false;
        }
        this.roles.push({
          user: response.restrictionlist[i],
          role: response.rolelist[i],
          input_enable: input,
        });
      }
      }
    },
    update_bot_roles() {
      if (this.filter_user_type == "Bot"){
        axios
          .post(
            api_calls.add_edit_bot_role(),
            {
              company_id: this.companyid,
              company_name: this.companyname,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              isShow: this.isShow_bot_roles,
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
            if (response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE.MSG_CODE){
             
            this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
            this.setpagination(this.page_no);
            for (var i in response.data.data.BotRolePermissionData) {
              // let botRoles = this.bot_roles.map(({ role }) => {
              //   return role;
              // });
              // if (botRoles.includes(i)) {
              if (this.bot_roles.includes(i)) {
                this.roles.push({
                  user: "Bot User",
                  user_role: `${i}`,
                  input_enable: true,
                  permissions: response.data.data.BotRolePermissionData[i].map((res) => {
                    return res
                      .replace(/_/g, " ")
                      .toLowerCase()
                      .split(" ")
                      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                      .join(" ");
                  }),
                  original_permissions: response.data.data.BotRolePermissionData[i],
                });
              }
            }
            this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
            this.setpagination(this.page_no);
            }
            else if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
          Swal({
            type: "error",
            text: this.tlt('add_role_internal_server_msg'),
            timer:3000,     
          });
        }else if (response.data.message.MSG_CODE == this.api_status_code.EMPTY_DATA.MSG_CODE) {
          Swal({
            type: "info",
            text: this.tlt('no_data_text'),
            timer:3000,  
            toast:true,
            position:"top-end",
            showConfirmButton: false,
          });  

        }else {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              type: "error"
            })
          }
          this.spinnerOn = false;
            this.number_of_rows = response.data.pagination.total_data == undefined ? 0 : response.data.pagination.total_data;
            this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
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
      }
    },
    pagination_class(index) {
      if (index == this.page_no) {
        return " active";
      } else {
        return "";
      }
    },
    clear_fields() {
      document.querySelector("#portal_box").disabled = false;
      document.querySelector("#bot_box").disabled = false;
      this.selected_role = "";
      this.selected_permissions = [];
      $("#intentmodal").modal("hide");
    },
    callsearch() {
      if (event.keyCode === 13) {
        this.search_product();
      }
    },
    search_product() {
      if (this.search_name != "") {
        this.spinnerOn = true;
        axios
          .post(
            api_calls.portal_permissions_url(),
            {
              company_id: this.$session.get("UserInformation").company_id,
              company_name: this.$session.get("UserInformation").company_name,
              license_key: this.$session.get("UserInformation").license_key,
              email: this.$session.get("UserInformation").email,
              token: this.$session.get("UserInformation").tokens,
              issearch: true,
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
            if (
              response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE.MSG_CODE
            ) {
              var list = response.data.data.RolePermissionData;
              this.number_of_rows = response.data.pagination.total_data == undefined ? 0 : response.data.pagination.total_data;
              this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
              this.page_no = 1;
              this.setpagination(this.page_no);
              this.roles = [];
              for (var i in list) {
                var permissions = list[i].Menu.filter((menulist) => {
                  if (menulist.Enabled && !menulist.HasSubMenus) {
                    return menulist.MenuItem;
                  }
                });
                var perm_list = [];
                for (var j in permissions) {
                  perm_list.push(permissions[j].MenuItem);
                }
                this.roles.push({
                  user_role: list[i].Role,
                  user: list[i].UserType,
                  permissions: perm_list,
                });
              }
            } else if (response.data.message.MSG_CODE == this.api_status_code.EMPTY_DATA.MSG_CODE) {
              Swal({
              text: this.tlt("permission_no_role_found_msg"),
              toast: true,
              position: "top-end",
              showCancelButton: false,
              showConfirmButton: false,
              type: "error"
            })
              
              this.load_permission();
            } else if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
              Swal({
              text: this.tlt("permission_internal_server_msg2"),
              toast: true,
              position: "top-end",
              showCancelButton: false,
              showConfirmButton: false,
              type: "error"
            }
            
            )
            
         
              this.load_permission();
            }
            else {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              type: "error"
            })
            this.load_permission();
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
        toastr.error(this.tlt('permission_data_for_search_msg'));
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
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>
<style scoped>
td > .multiselect__tag {
  padding: 4px 9px 4px 10px;
}
.multiselect__option[data-select="Press enter to select"] > span {
  margin-left: 10%;
}
/* #select_role_name{
    width: 105%;
    margin-left: -2%;
} */
.radio label {
    margin-top: .3rem !important;
  }
</style>
<style>
.multiselect__option--group {
  background: #273679 !important;
  color: #e7eaec !important;
  text-align: center;
  font-weight: bold;

}
</style>

