<template>
  <div>
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <div class="dash-cont">
      <div class="container-fluid">
        <div class="card dash-card">
          <div
            class="card-header d-block d-sm-flex flex-wrap justify-content-between"
          >
            <h4 class="mb-sm-0">{{tlt('role_list_heading')}}</h4>

            <div class="card-act d-flex flex-wrap">
              <!-- for search -harsh -->
              <!-- <div> -->
                <input
                  class="form-control search-bar"
                  id="search_bar"
                  :placeholder="tlt('search_here')"
                  v-model.trim="search_name"
                  v-on:keyup="callsearch"
                />
                <a type="button" v-if="isVisibleSearchClear" class="btn bg-transparent mt-auto mb-auto py-0" @click="clear_search_name" style="margin-left: -40px; z-index: 10;">
                  <img src="/img/close-icn.png" alt />
                </a>
                <!-- <span id="clear" class="fa fa-times-circle"></span> -->
              <!-- </div> -->
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
                data-toggle="modal"
                data-target="#usermodel"
                id="add_role_btn"
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
                {{tlt('role_list_add_role_btn')}}
              </a>
              <a
                href="javascript:void(0)"
                class="red-btn"
                @click="delete_multiple_role"
                id="delete_role"
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
                {{tlt('role_list_delete_btn')}}
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
                          <label
                            class="form-check-label checkbox checkbox-success"
                          >
                            <input
                              class="form-check-input"
                              id="selectall"
                              type="checkbox"
                              @click="check_list_array('all')"
                            />
                            <span class="icn"></span>
                          </label>
                        </div>
                      </th>
                      <th scope="col" style="width: 10%">{{tlt('role_list_action')}}</th>
                      <th scope="col">{{tlt('role_list_user_type')}}</th>
                      <th scope="col">{{tlt('role_list_role_name')}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(role, index) in role_name" :key="index">
                      <th scope="col">
                        <div class="form-check checkbox-success">
                          <label
                            class="form-check-label checkbox checkbox-success"
                          >
                            <input
                              class="form-check-input"
                              type="checkbox"
                              @change="check_list_array(index)"
                            />
                            <span class="icn"></span>
                          </label>
                        </div>
                      </th>

                      <td class="action">
                        <a href="#" id="edit_role_id">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15.392"
                            height="15.392"
                            viewBox="0 0 15.392 15.392"
                            data-toggle="modal"
                            style="cursor: pointer"
                            data-target="#usermodel"
                            @click="edit_role(index)"
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
                          @click="delete_role(index)"
                          id="single_delete_role_id"
                        >
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
                      <td>{{ user_type_list[index] }}</td>
                      <td>{{ role }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-if="role_name.length == 0" style="text-align: center;">No role is available currently. Please add role in order to continue.</div>
              <!-- <div class="pagin-table">
              <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                  <li class="page-item">
                    <a class="page-link" href="#" @click="page_change(page_no-1)">
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
                    :class="'page-item '+ pagination_class(index)"
                    v-for="(pageno, index) in total_pages"
                    :key="index"
                  >
                    <a class="page-link" href="#" @click="page_change(pageno)">{{pageno}}</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#" @click="page_change(page_no+1)">
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
            </div>-->

              <div class="pagin-table" style="margin: 0">
                <nav aria-label="Page navigation example">
                  <ul class="pagination justify-content-center">
                    <li class="page-item">
                      <a
                        class="page-link"
                        href="#"
                        @click="page_change(page_no - 1)"
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
                        @click="page_change(pageno)"
                        >...</a
                      >
                      <a
                        v-if="pageno != '...s' && pageno != '...l'"
                        class="page-link"
                        href="#"
                        @click="page_change(pageno)"
                        >{{ pageno }}</a
                      >
                    </li>
                    <li class="page-item">
                      <a
                        class="page-link"
                        href="#"
                        @click="page_change(page_no + 1)"
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
                id="usermodel"
                tabindex="-1"
                role="dialog"
                aria-labelledby="usermodeltitle"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-body">
                      <div class="modal-head d-flex align-items-center">
                        <div class="head-icn">
                          <img src="/img/user-blue.png" alt />
                        </div>
                        <h3>{{tlt('role_list_model_role_header')}}</h3>
                      </div>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <img src="/img/close-icn.png" alt />
                      </button>
                      <form >
                        <div class="radio" style="margin-left: 25%">
                          <label>
                            <input
                              type="radio"
                              v-model="user_type"
                              id="portal_user"
                              value="Portal User"
                              :disabled="this.add_edit == 'false'"
                            />
                            <span class="icn" id="portal_user_radio"></span>
                            {{tlt('role_list_model_portal_label')}}
                          </label>
                          <label>
                            <input
                              type="radio"
                              v-model="user_type"
                              value="Bot User"
                              :disabled="this.add_edit == 'false'"
                            />
                            <span class="icn" id="bot_user_radio"></span> {{tlt('role_list_model_bot_label')}}
                          </label>
                        </div>
                        <div class="form-group" style="padding-top: 10px">
                          <input
                            id="add_role_text"
                            type="text"
                            class="form-control"
                            :placeholder="tlt('enter_role')"
                            v-model.trim="role_names"
                          />
                        </div>
                        <span style="color: #ff0000"></span>
                        <div class="btn-wrap text-right">
                          <button
                            type="button"
                            class="btn btn-link"
                            data-dismiss="modal"
                          >
                            {{tlt('role_list_cancel_btn')}}
                          </button>
                          <button type="submit" class="darkblue-btn" @click="add_roles" id="save_and_close_btn">
                            {{tlt('role_list_save_close_btn')}}
                          </button>
                        </div>
                      </form>
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
import api_calls from "@/portal/api_calls";
import { close_modal } from "@/portal/mixins";

export default {
    mixins: [close_modal],

  data() {
    return {
      checkedUser:false,
      checked_list: [],
      role_names: "",
      delete_list: [],
      role_name: [],
      user_type_list: [],
      user_type: "Portal User",
      page_no: 1,
      per_page: 10,
      total_pages: 0,
      add_edit: "true",
      old_role_name: "",
      delete_list: [],
      //harsh
      page_array: [],
      search_name: "",
      spinnerOn: false,
      isVisibleSearchClear: false,
    };
  },
  mounted() {
    var vm = this;
    $("#selectall").click(function () {
      if ($(this).is(":checked")) {
        $("input:checkbox").prop("checked", true);
      } else {
        vm.checked_list = [];
        $("input:checkbox").prop("checked", false);
      }
    });
    $("#usermodel").on("hidden.bs.modal", function (e) {
      vm.add_edit = "true";
      vm.user_type = "Portal User";
      vm.role_names = "";
    });
  },
  created() {
  this.load_role();
  },
  watch:{
        search_name(){
          if (this.search_name === ""){
          this.load_role();
          this.isVisibleSearchClear = false;
          }
          else if (this.search_name !== ""){
            this.isVisibleSearchClear = true;
          }
        },
  },
  methods: {
    clear_search_name(){
      this.search_name = "";
    },
    load_role(){
      this.spinnerOn=true;
      this.checked_list = [];
      this.delete_list = [];
      this.add_edit= "true";
      $("input:checkbox").prop("checked", false);
      axios
      .post(
        api_calls.main_role_url(),
        {
          company_id: this.$session.get("UserInformation").company_id,
          company_name: this.$session.get("UserInformation").company_name,
          license_key: this.$session.get("UserInformation").license_key,
          email: this.$session.get("UserInformation").email,
          token: this.$session.get("UserInformation").tokens,
          page_no: this.page_no,
          per_page: this.per_page,
          isShow: true,
        },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          },
        }
      )
      .then((response) => {
        this.spinnerOn=false;
        if (response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE.MSG_CODE){
          this.organize_roles(response.data);
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
            position:"top-end",
            showConfirmButton: false,  
          });  
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
    check_list_array(index) {
      if (index == "all") {
        this.checked_list = [];
        var role_length = this.role_name.length;
        for (var i = 0; i < role_length; i++) {
          this.checked_list.push(i);
        }
      } else {
        if (event.target.checked == true) {
          if (!this.checked_list.includes(index)) {
            this.checked_list.push(index);
          }
        } else if (event.target.checked == false) {
          var selectall = document.querySelector("#selectall");
          if (selectall.checked == true) {
            selectall.checked = false;
          }
          var temp = this.checked_list.filter((role) => {
            return role !== index;
          });
          this.checked_list = temp;
        }
      }
    },
    edit_role(index) {
      this.old_role_name = this.role_name[index];
      this.role_names = this.role_name[index];
      this.user_type = this.user_type_list[index];
      this.add_edit = "false";
    },
    delete_role(index) {
      this.delete_list = [];
      this.delete_list.push(this.role_name[index]);
      (this.role_names = this.role_name[index]),
        (this.user_type = this.user_type_list[index]);
      Swal.fire({
        title: this.tlt('add_role_delete_swal_alert_msg'),
        text: this.tlt('add_role_no_revert_msg'),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.tlt('add_role_swal_delete_msg'),
      }).then((result) => {
          if(result.dismiss ==='cancel'){
            this.delete_list = [];
          }else if (result.value) {
          axios
            .post(
              api_calls.main_role_url(),
              {
                company_id: this.$session.get("UserInformation").company_id,
                company_name: this.$session.get("UserInformation").company_name,
                license_key: this.$session.get("UserInformation").license_key,
                email: this.$session.get("UserInformation").email,
                token: this.$session.get("UserInformation").tokens,
                delete_roles: [
                  {
                    Role: this.role_names,
                    UserType: this.user_type,
                  },
                ],
                isDelete: true,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.delete_list = [];
              if (response.data.message.MSG_CODE == this.api_status_code.USER_ROLES_DELETED_SUCCESSFULLY_2002.MSG_CODE) {
                Swal.fire({
                  title: this.tlt('add_role_swal_deleted_msg'),
                  text: this.tlt('add_role_your_role_deleted_msg'),
                  type:"success",
                  timer:2000,
                });
                if((this.role_name.length === 1 && 
                  this.delete_list.length === 1) &&
                  this.page_no > 1){
                    this.page_no = this.page_no - 1;
                }
                this.load_role();
              } else if (response.data.message.MSG_CODE == this.api_status_code.USER_EXIST.MSG_CODE) {
                Swal({
                  type: "error",
                  text: this.tlt('add_role_user_exist_given_role_msg'),
                  timer:2500,
                });
                this.load_role()
              } else if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
                Swal({
                  type: "error",
                  text: this.tlt('add_role_internal_server_msg'),
                  timer:3000,     
                });
              }
            })
            .catch((e) => {
              this.delete_list = [];
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
    delete_multiple_role() {
      this.delete_list = [];
      var len = this.checked_list.length;
      for (var i = 0; i < len; i++) {
        var index = this.checked_list[i];
        this.delete_list.push({
          Role: this.role_name[index],
          UserType: this.user_type_list[index],
        });
      }
      if (this.delete_list.length != 0) {
        Swal.fire({
          title: this.tlt('add_role_swal_delete_msg'),
          text: this.tlt('add_role_no_revert_msg2'),
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: this.tlt('add_role_swal_delete_msg2'),
        }).then((result) => {
          if(result.dismiss ==='cancel'){
            this.delete_list = [];
          }else if (result.value) {
            this.spinnerOn = true;
            axios
              .post(
                api_calls.main_role_url(),
                {
                  company_id: this.$session.get("UserInformation").company_id,
                  company_name: this.$session.get("UserInformation")
                    .company_name,
                  license_key: this.$session.get("UserInformation").license_key,
                  email: this.$session.get("UserInformation").email,
                  token: this.$session.get("UserInformation").tokens,
                  delete_roles: this.delete_list,
                  isDelete: true,
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.$session.get("at")}`,
                  },
                }
              )
              .then((response) => {
                this.spinnerOn = false;
                this.checked_list = [];
                this.delete_list = [];
                if (response.data.message.MSG_CODE == this.api_status_code.USER_ROLES_DELETED_SUCCESSFULLY_2002.MSG_CODE) {
                  Swal.fire({
                  title: this.tlt('add_role_swal_deleted_msg2'),
                  text: this.tlt('add_role_your_role_deleted_msg2'),
                  type:"success",
                  timer:2000,
                  });
                  if(this.delete_list.length === this.role_name.length && 
                    this.page_no >1){
                      this.page_no = this.page_no - 1;
                  }
                  this.load_role();
                } else if (response.data.message.MSG_CODE == this.api_status_code.USER_EXIST.MSG_CODE) {
                  this.spinnerOn = false;
                  this.checked_list = [];
                  Swal({
                  type: "error",
                  text: this.tlt('add_role_user_exist_given_role_msg2'),
                  timer:2500,
                  });
                  this.load_role();
                }
              })
              .catch((e) => {
                this.delete_list = [];
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
      } else {
        Swal.fire({
          title: this.tlt('add_role_no_role_selected_msg'),
          text:"",
          type:"error",
          timer:2000,
        });
      }
    },
    add_roles() {
      event.preventDefault();
      if (this.add_edit == "true") {
        if (this.user_type === null) {
          toastr.error(this.tlt('add_role_select_user_type_msg'));
        } else if (this.role_names == "") {
          toastr.error(this.tlt('add_role_enter_role_msg'));
        } else if (this.role_names.toLocaleLowerCase() == "admin") {
          toastr.error(this.tlt('add_role_cannot_add_role_msg'));
        } else if (this.role_names.toLocaleLowerCase() == "superadmincense") {
          toastr.error(this.tlt('add_role_cannot_add_role_super_admin_msg'));
        } else {
          if (this.user_type == "Portal User"){
            this.role_names=this.role_names.toLocaleLowerCase().includes("support")? "support agent": this.role_names;
          }
          axios
            .post(
              api_calls.main_role_url(),
              {
                company_id: this.$session.get("UserInformation").company_id,
                company_name: this.$session.get("UserInformation").company_name,
                license_key: this.$session.get("UserInformation").license_key,
                email: this.$session.get("UserInformation").email,
                token: this.$session.get("UserInformation").tokens,
                user_type: this.user_type,
                role_name: this.role_names,
                isInsert: true,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              if(
                response.data.message.MSG_CODE != this.api_status_code.USER_ROLE_SET_ALREADY_EXISTS_2002.MSG_CODE &&
                response.data.message.MSG_CODE != this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE &&
                response.data.message.MSG_CODE != this.api_status_code.EMPTY_DATA.MSG_CODE &&
                response.data.message.MSG_CODE != this.api_status_code.SUPER_ADMIN_EXISTS_ERROR.MSG_CODE)
              {
                if(response.data.message.MSG_CODE == this.api_status_code.USER_ROLE_SET_SUCCESSFULLY_2002.MSG_CODE) {
                  Swal({ 
                    text: this.tlt('add_role_added_successful_msg'),
                    type: "success",
                    timer:2000, 
                    });
                  
                this.load_role();
                }
              }else if (response.data.message.MSG_CODE == this.api_status_code.USER_ROLE_SET_ALREADY_EXISTS_2002.MSG_CODE) {
                Swal({ 
                  text: this.tlt('add_role_already_exists_msg'),
                  type: "warning",
                  timer:2000, 
                });
                
                this.load_role();
              }else if (response.data.message.MSG_CODE == this.api_status_code.SUPER_ADMIN_EXISTS_ERROR.MSG_CODE) {
                Swal({ 
                  text: this.tlt('add_role_super_admin_role_cannot_add_msg'),
                  type: "warning",
                  timer:2000, 
                });
                
                this.load_role();
              }else if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
                Swal({
                  type: "error",
                  text: this.tlt('add_role_internal_server_msg'),
                  timer:3000,     
                });
                
                this.load_role();
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
            this.close_modal('save_and_close_btn')
        }
      }else if (this.add_edit == "false") {
        if (this.role_names == "") {
          toastr.error(this.tlt('add_role_enter_role_msg2'));
        } else if (this.role_names.toLocaleLowerCase() == "admin") {
          toastr.error(this.tlt('add_role_cannot_add_role_msg2'));
        } else if (this.role_names.toLocaleLowerCase() == "superadmincense") {
          toastr.error(this.tlt('add_role_cannot_add_role_super_admin_msg2'));
        }
        else {
          if (this.user_type == "Portal User"){
            this.role_names=this.role_names.toLocaleLowerCase().includes("support")? "support agent": this.role_names;
          }
          axios
            .post(
              api_calls.main_role_url(),
              {
                company_id: this.$session.get("UserInformation").company_id,
                company_name: this.$session.get("UserInformation").company_name,
                license_key: this.$session.get("UserInformation").license_key,
                email: this.$session.get("UserInformation").email,
                token: this.$session.get("UserInformation").tokens,
                user_type: this.user_type,
                role_name: this.role_names,
                old_role_name: this.old_role_name,
                isEdit: true,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.add_edit = "true";
              if(
                response.data.message.MSG_CODE != this.api_status_code.USER_ROLE_SET_ALREADY_EXISTS_2002.MSG_CODE &&
                response.data.message.MSG_CODE != this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE &&
                response.data.message.MSG_CODE != this.api_status_code.EMPTY_DATA.MSG_CODE  &&
                response.data.message.MSG_CODE != this.api_status_code.SUPER_ADMIN_EXISTS_ERROR.MSG_CODE)
              {
                if (response.data.message.MSG_CODE == this.api_status_code.USER_ROLE_EDITED_SUCCESSFULLY_2002.MSG_CODE) {
                  Swal({ 
                    text: this.tlt('add_role_edited_successful_msg'),
                    type: "success",
                    timer:2000, 
                    });
                  
                this.load_role();
                
                }  
              }else if (response.data.message.MSG_CODE == this.api_status_code.USER_ROLE_SET_ALREADY_EXISTS_2002.MSG_CODE) {
                Swal({ 
                  text: this.tlt('add_role_already_exists_msg2'),
                  type: "warning",
                  timer:2000, 
                });
                
                this.load_role();
                
              }else if (response.data.message.MSG_CODE == this.api_status_code.SUPER_ADMIN_EXISTS_ERROR.MSG_CODE) {
                Swal({ 
                  text: this.tlt('add_role_super_admin_msg2'),
                  type: "warning",
                  timer:2000, 
                });
                
                this.load_role();
                
              }else if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE){
                Swal({
                  type: "error",
                  text: this.tlt('add_role_internal_server_msg2'),
                  timer:3000,     
                });
                
                this.load_role();
                
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
            this.close_modal('save_and_close_btn')
          }
      }else if (this.user_type == null) {
      toastr.error(this.tlt('add_role_select_user_type_msg2'));
      }
    },
    page_change(pageno) {
      this.checked_list = [];
      this.delete_list = [];
      this.add_edit= "true";
      $("input:checkbox").prop("checked", false);
      if (pageno == 0 || pageno == this.total_pages + 1) {
      } else {
        if (this.search_name == "") {
          if (pageno == "...s") {
            this.page_no = Math.ceil((1 + this.page_no) / 2);
          } else if (pageno == "...l") {
            this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
          } else {
            this.page_no = pageno;
          }
          this.spinnerOn = true;
          axios
            .post(
              api_calls.main_role_url(),
              {
                company_id: this.$session.get("UserInformation").company_id,
                company_name: this.$session.get("UserInformation").company_name,
                license_key: this.$session.get("UserInformation").license_key,
                email: this.$session.get("UserInformation").email,
                token: this.$session.get("UserInformation").tokens,
                page_no: this.page_no,
                per_page: this.per_page,
                isShow: true,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.spinnerOn = false;
              if (response.data.message.MSG_CODE != this.api_status_code.EMPTY_DATA.MSG_CODE ) {
                this.organize_roles(response.data);
              }else if (response.data.message.MSG_CODE == this.api_status_code.EMPTY_DATA.MSG_CODE) {
                toastr.error(this.tlt('add_role_no_role_found_msg'));
                this.load_role();
              }else if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
                toastr.error(this.tlt('add_role_internal_server_msg3'));
                this.load_role();
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
          if (pageno == "...s") {
            this.page_no = Math.ceil((1 + this.page_no) / 2);
          } else if (pageno == "...l") {
            this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
          } else {
            this.page_no = pageno;
          }
          this.spinnerOn = true;
          axios
            .post(
              api_calls.main_role_url(),
              {
                company_id: this.$session.get("UserInformation").company_id,
                company_name: this.$session.get("UserInformation").company_name,
                license_key: this.$session.get("UserInformation").license_key,
                email: this.$session.get("UserInformation").email,
                token: this.$session.get("UserInformation").tokens,
                page_no: this.page_no,
                per_page: this.per_page,
                issearch: true,
                searchstring: this.search_name,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.spinnerOn = false;
              if (response.data.message.MSG_CODE != this.api_status_code.EMPTY_DATA.MSG_CODE ) {
                this.organize_roles(response.data);
              }
            })
            .catch((e) => {
              if (
                e.response.status === 410 ||
                e.response.status === 440 ||
                e.response.status === 409
              ) {
                this.$root.$emit("Session_Expired", e.response.data);
              } else if (response.data.message.MSG_CODE == this.api_status_code.EMPTY_DATA.MSG_CODE) {
                toastr.error(this.tlt('add_role_no_role_found_msg'));
                this.load_role();
              } else if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
                toastr.error(this.tlt('add_role_internal_server_msg3'));
                this.load_role();
              }
            });
        }
      }
    },
    organize_roles(roles_list) {
      // this.number_of_rows = roles_list.number_of_rows;
      this.role_name = [];
      this.user_type_list = [];
      this.total_pages = roles_list.pagination.total_page == undefined ? 0 : roles_list.pagination.total_page;
      var portal_len = roles_list.data.Portal.length;
      for (var i = 0; i < portal_len; i++) {
        this.user_type_list.push("Portal User");
        this.role_name.push(roles_list.data.Portal[i]);
      }
      var bot_len = roles_list.data.Bot.length;
      for (var i = 0; i < bot_len; i++) {
        this.user_type_list.push("Bot User");
        this.role_name.push(roles_list.data.Bot[i]);
      }
      this.setpagination(this.page_no);
    },
    pagination_class(index) {
      if (index == this.page_no) {
        return " active";
      } else {
        return "";
      }
    },
    callsearch() {
      if (event.keyCode === 13) {
        this.search_product();
      }
    },
    search_product() {
      if (this.search_name != "") {
        this.checked_list = [];
        this.delete_list = [];
        this.add_edit= "true";
        $("input:checkbox").prop("checked", false);
        this.spinnerOn = true;
        axios
          .post(
            api_calls.main_role_url(),
            {
              company_id: this.$session.get("UserInformation").company_id,
              company_name: this.$session.get("UserInformation").company_name,
              license_key: this.$session.get("UserInformation").license_key,
              email: this.$session.get("UserInformation").email,
              token: this.$session.get("UserInformation").tokens,
              issearch: true,
              searchstring: this.search_name,
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
            this.show_loader = false;
            if (
              response.data.message.MSG_CODE != this.api_status_code.EMPTY_DATA.MSG_CODE &&
              response.data.message.MSG_CODE != this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE
            ) {
              this.page_no = 1;
              this.organize_roles(response.data);
            } else if (response.data.message.MSG_CODE == this.api_status_code.EMPTY_DATA.MSG_CODE) {
              toastr.error(this.tlt('add_role_no_role_found_msg'));
              this.load_role();
            } else if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
              toastr.error(this.tlt('add_role_internal_server_msg3'));
              this.load_role();
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
       else {
        toastr.error(this.tlt('add_role_data_for_search_msg'));
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