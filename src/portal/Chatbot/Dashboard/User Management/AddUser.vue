<template>
  <div class="dash-cont">
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <div class="container-fluid">
      <div class="card dash-card">
        <div
          class="card-header d-block d-sm-flex flex-wrap justify-content-between"
        >
          <h4 class="mb-sm-0">{{tlt('user_list_heading')}}</h4>

          <div class="card-act d-flex flex-wrap">
            <!-- for search -harsh -->
            <input
              class="form-control search-bar"
              id="search_bar"
              :placeholder="tlt('search_here')"
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
              id="add_user_btn"
              @click="open_usermodel()"
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
              {{tlt('user_list_add_user_btn')}}
            </a>
            <a
              href="javascript:void(0)"
              class="red-btn"
              @click="delete_user('all')"
              id="delete_user"
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
              {{tlt('user_list_delete_btn')}}
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
                            @change="check_list_array($event, 'all')"
                          />
                          <span class="icn"></span>
                        </label>
                      </div>
                    </th>
                    <th scope="col" style="width: 50px">{{tlt('user_list_action_label')}}</th>
                    <th scope="col">{{tlt('user_list_role_name_label')}}</th>
                    <th scope="col">{{tlt('user_list_email_label')}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(user, index) in users" :key="index">
                    <th scope="row">
                      <div class="form-check checkbox-success">
                        <label
                          class="form-check-label checkbox checkbox-success"
                        >
                          <input
                            class="form-check-input"
                            type="checkbox"
                            @change="check_list_array($event, index)"
                          />
                          <span class="icn"></span>
                        </label>
                      </div>
                    </th>
                    <td class="action">
                      <a
                        href="#"
                        @click="delete_user(index)"
                        id="single_delete_user_id"
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
                    <td>{{ user.role }}</td>
                    <td>{{ user.email }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-if="users.length == 0" style="text-align: center;">No User data is available currently. Please add User Data.</div>
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
              id="usermodel"
              tabindex="-1"
              role="dialog"
              aria-labelledby="usermodeltitle"
              aria-hidden="true"
              data-keyboard="false"
              data-backdrop="static"
            >
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-body">
                    <div class="modal-head d-flex align-items-center">
                      <div class="head-icn">
                        <img src="/img/user-blue.png" alt />
                      </div>
                      <h3>{{tlt('user_list_model_user_header')}}</h3>
                    </div>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <img src="/img/close-icn.png" alt />
                    </button>
                    <form @submit="add_user">
                      <div class="form-group">
                        <label>{{tlt('user_list_model_role_name_label')}}</label>
                        <!-- <select v-model="selected_role" class="form-control" id="select_role_name"  @change="show_field">
                          <option value disabled>Select Role Name</option>
                          <option v-for="(role, index) in portal_roles" :key="index">{{role.role}}</option>
                        </select> -->
                        <multiselect
                          id="role_select"
                          :close-on-select="true"
                          :taggable="false"
                          :multiple="false"
                          :options="roles_dropwdown"
                          :placeholder="tlt('select_role')"
                          v-model="selected_role"
                          group-values="list"
                          group-label="title"
                          :group-select="false"
                          track-by="name"
                          label="name"
                          @select="show_field"
                        >
                        </multiselect>
                      </div>

                      <div class="form-group" v-if="show_email_field">
                        <input
                          v-model="email"
                          style="padding: 14px 8px 14px 50px"
                          type="email"
                          class="form-control email"
                          :placeholder="tlt('email_text')"
                          id="form_email"
                        />
                      </div>
                      <!-- <div class="form-group" v-if="show_password_field">
                        <input
                          v-model="password"
                          style="padding: 14px 8px 14px 50px"
                          type="password"
                          id="form_password"
                          class="form-control pass"
                          placeholder="Password"
                          autocomplete="new-password"
                        />
                        <a href="#" @click="password_toggle" class="view-pass">
                          <img src="/img/eye-icn.png" alt />
                        </a>
                      </div> -->
                      <!-- <span
                        style="color: #ff0000"
                        v-if="validPassword != true && password != ''"
                        >{{ validPassword }}</span
                      > -->

                      <!-- <password-validator
                        :testpassword="password"
                        @correctPassword="checkpassword"
                        style="padding: 0px"
                      ></password-validator> -->

                      <!-- <div id="message">
                      <h6>Password must contain the following:</h6>
                      <p
                        id="letter"
                        class="invalid"
                        style="margin-left: 10%;"
                      >A lower case letter</p>
                      <p
                        id="capital"
                        class="invalid"
                        style="margin-left: 10%;"
                      >A capital (uppercase) letter</p>
                      <p
                        id="number"
                        class="invalid"
                        style="margin-left: 10%;"
                      >A number</p>
                      <p
                        id="special"
                        class="invalid"
                        style="margin-left: 10%;"
                      >A special character( # @ ! % * ? & $ )</p>
                      <p
                        id="length"
                        class="invalid"
                        style="margin-left: 10%;"
                      >Minimum 8 characters</p>
                    </div> -->
                      <div class="btn-wrap text-right">
                        <button
                          type="button"
                          class="btn btn-link"
                          data-dismiss="modal"
                        >
                          {{tlt('user_list_cancel_btn')}}
                        </button>
                        <button type="submit" class="darkblue-btn">
                          {{tlt('user_list_save_close_btn')}}
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
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import api_calls from "@/portal/api_calls";
import Multiselect from "vue-multiselect";
import PasswordValidator from "../Pages/PasswordValidator.vue";
export default {
  name: "add-user",
  components: {
    Multiselect,
    PasswordValidator,
  },
  data() {
    return {
      isVisibleSearchClear: false,
      portal_roles: [],
      correct_password: false,
      selected_role: "",
      checked_list: [],
      emaillist: [],
      password: "",
      email: "",
      per_page: 10,
      total_pages: null,
      number_of_rows: null,
      page_no: 1,
      companyname: "",
      companyid: "",
      users: [],
      roles: [],
      role: "",
      reg_email: /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/,
      reg_pwd: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@!%*?&$])[A-Za-z\d#@!%*?&$]{8,}/,
      show_loader: false,
      //harsh
      page_array: [],
      search_name: "",
      spinnerOn: false,
      show_email_field: false,
      show_password_field: false,
      roles_dropwdown: [
        {
          title: "Portal Role",
          list: [],
        },
        {
          title: "Bot Role",
          list: [],
        },
      ],
      role_selected: null,
      role_type_selected: null,
      // letter: document.getElementById("letter"),
      // capital: document.getElementById("capital"),
      // number: document.getElementById("number"),
      // special: document.getElementById("special"),
      // array: [],
    };
  },
  computed: {
    validPassword() {
      if (this.reg_pwd.test(this.password)) {
        return true;
      } else {
        return this.tlt('user_list_pwd_condition');
      }
    },
    validEmail() {
      if (this.reg_email.test(this.email)) {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {
    this.load_user();
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
    $("#usermodel").on("hidden.bs.modal", () => {
      vm.clear_fields();
      // vm.role_selected = null;
      // vm.role_type_selected = null;
    });
    // this.$root.$on("correctPassword", (value) => {
    //   console.log(value);
    //   this.correct_password = value;
    // });
  },
  watch: {
    search_name() {
      if (this.search_name === "") {
        this.load_user();
        this.isVisibleSearchClear = false;
      } else if (this.search_name !== "") {
        this.isVisibleSearchClear = true;
      }
    },
  },
  _methods: {
    open_usermodel(){
        if(this.portal_roles.length > 0) {
          $("#usermodel").modal("show");
        }
        else{
          Swal.fire({
            text:this.tlt('add_user_no_roles_added_msg'),
            type: "warning",
            showConfirmButton: true,
            timer: 6000,
          });
        }
    },
    checkpassword(correctPassword) {
      this.correct_password = correctPassword;
    },
    // check_value () {

    //   if (this.password != "") {
    //     document.getElementById("message").style.display = "block";
    //   } else {
    //     document.getElementById("message").style.display = "none";
    //   }
    //   var lowerCaseLetters = /[a-z]/g;
    //   if (this.password.match(lowerCaseLetters)) {
    //     letter.classList.remove("invalid");
    //     letter.classList.add("valid");
    //     this.array[0] = 1;
    //   } else {
    //     letter.classList.remove("valid");
    //     letter.classList.add("invalid");
    //     this.array[0] = 0;
    //   }

    //   // Validate capital letters
    //   var upperCaseLetters = /[A-Z]/g;
    //   if (this.password.match(upperCaseLetters)) {
    //     capital.classList.remove("invalid");
    //     capital.classList.add("valid");
    //     this.array[1] = 1;
    //   } else {
    //     capital.classList.remove("valid");
    //     capital.classList.add("invalid");
    //     this.array[1] = 0;
    //   }

    //   // Validate numbers
    //   var numbers = /[0-9]/g;
    //   if (this.password.match(numbers)) {
    //     number.classList.remove("invalid");
    //     number.classList.add("valid");
    //     this.array[2] = 1;
    //   } else {
    //     number.classList.remove("valid");
    //     number.classList.add("invalid");
    //     this.array[2] = 0;
    //   }

    //   // Special Character
    //   var specials = /[#@!%*?&$]/g;
    //   if (this.password.match(specials)) {
    //     special.classList.remove("invalid");
    //     special.classList.add("valid");
    //     this.array[3] = 1;
    //   } else {
    //     special.classList.remove("valid");
    //     special.classList.add("invalid");
    //     this.array[3] = 0;
    //   }
    //   // Validate length
    //   if (this.password.length >= 8) {
    //     var length = document.getElementById("length");
    //     length.classList.remove("invalid");
    //     length.classList.add("valid");
    //     this.array[4] = 1;
    //   } else {
    //     var length = document.getElementById("length");
    //     length.classList.remove("valid");
    //     length.classList.add("invalid");
    //     this.array[4] = 0;
    //   }
    //   var sum = this.array[0] + this.array[1] + this.array[2] + this.array[3] + this.array[4];
    //   if (sum == 5 || sum == 0) {
    //     document.getElementById("message").style.display = "none";
    //   } else {
    //     document.getElementById("message").style.display = "block";
    //   }
    // },
    clear_search_name() {
      this.search_name = "";
    },
    load_user() {
      this.spinnerOn = true;
      this.checked_list = [];
      this.emaillist = [];
      this.role_selected = null;
      this.portal_roles = [];
      this.roles_dropwdown = [
        {
          title: "Portal Role",
          list: [],
        },
        {
          title: "Bot Role",
          list: [],
        },
      ];
      this.selected_role = "";
      $("input:checkbox").prop("checked", false);
      if (
        !this.$session.has("CompanyId") &&
        this.$session.get("UserInformation").role == "SuperAdmin"
      ) {
        toastr.warning(this.tlt('add_user_load_user_select_company'));
      }
      if (this.$session.get("UserInformation").role == "SuperAdmin") {
        if (this.$session.has("CompanyId")) {
          this.companyid = this.$session.get("CompanyId");
          this.companyname = this.$session.get("CompanyName");
        } else {
          toastr.warning(this.tlt('add_user_load_user_select_company2'));
        }
      } else {
        this.companyid = this.$session.get("UserInformation").company_id;
        this.companyname = this.$session.get("UserInformation").company_name;
      }
      axios
        .post(
          api_calls.load_users_url(),
          {
            company_id: this.companyid,
            company_name: this.companyname,
            license_key: this.$session.get("UserInformation").license_key,
            email: this.$session.get("UserInformation").email,
            token: this.$session.get("UserInformation").tokens,
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
          if (response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE.MSG_CODE) {
            this.number_of_rows = response.data.pagination.total_data == undefined ? 0 : response.data.pagination.total_data;
            this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
            this.update_users(response.data.data.Email, response.data.data.Role);
            this.setpagination(this.page_no);           
          } else if (response.data.message.MSG_CODE == this.api_status_code.EMPTY_DATA.MSG_CODE){
              Swal({
                text: response.data.message.MSG,
                toast: true,
                position: 'top-end',
                showCancelButton: false,
                showConfirmButton: false,
                type: "warning",
                timer:2500
              })
          }
          else{
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              type: "error",
              timer:2500
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
          api_calls.main_role_url(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            isShow: true,
            per_page: 1000,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
            // portal_roles = [];
            if (response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE.MSG_CODE) {          
              if (response.data.data.Portal.length > 0) {
                for (let i = 0; i < response.data.data.Portal.length; i++) {
                  // console.log(portal_roles);
                  this.portal_roles.push({
                    // role: [{
                    //   rolename: response.data.Portal[i]
                    //   }],
                    role: response.data.data.Portal[i],
                    type: "Portal",
                  });  
                }
              }
              if (response.data.data.Bot.length > 0) {
                for (let i = 0; i < response.data.data.Bot.length; i++) {
                  this.portal_roles.push({
                    // role: [{
                    //   rolename:response.data.Bot[i]
                    // }],
                    role: response.data.data.Bot[i],
                    type: "Bot",
                  });
                }
              } 
              for (let i = 0; i < this.portal_roles.length; i++) {
              if (this.portal_roles[i].type === "Portal") {
                  for (let j = 0; j < this.roles_dropwdown.length; j++) {
                    if (this.roles_dropwdown[j].title === "Portal Role") {
                      this.roles_dropwdown[j].list.push({
                        name: this.portal_roles[i].role,
                        type: "Portal User",
                      }); 
                    }
                  }
                }
                if (this.portal_roles[i].type === "Bot") {
                  for (let j = 0; j < this.roles_dropwdown.length; j++) {
                    if (this.roles_dropwdown[j].title === "Bot Role") {
                      this.roles_dropwdown[j].list.push({
                        name: this.portal_roles[i].role,
                        type: "Bot User",
                      });
                    }
                  }
                }
              } 
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
    },
    pagination_class(index) {
      if (index == this.page_no) {
        return " active";
      } else {
        return "";
      }
    },
    check_list_array(e, index) {
      if (index == "all") {
        if (e.target.checked == true) {
          this.checked_list = this.users.map((user) => {
            return user.email;
          });
        } else if (e.target.checked == false) {
          this.checked_list = [];
        }
      } else {
        if (e.target.checked == true) {
          let val_index = this.checked_list.indexOf(this.users[index].email);
          var temp = this.users[index].email;
          if (val_index == -1) {
            this.checked_list.push(temp);
          }
        } else if (e.target.checked == false) {
          var selectall = document.querySelector("#selectall");
          selectall.checked = false;
          let userIndex = this.checked_list.indexOf(this.users[index].email);
          this.checked_list.splice(userIndex, 1);
        }
      }
    },
    delete_user(index) {
      this.emaillist = [];
      if (index == "all") {
        if (this.checked_list.length == 0) {
          Swal.fire({
            title: this.tlt('add_user_no_user_select_msg'),
            text: "",
            type: "error",
            timer: 2000,
          });
        } else if (this.checked_list.length > 0) {
          for (let i = 0, n = this.checked_list.length; i < n; i++) {
            this.emaillist.push(this.checked_list[i]);
          }
          this.delete_user_api();
        }
      } else {
        this.emaillist.push(this.users[index].email);
        this.delete_user_api();
      }
    },
    delete_user_api() {
      Swal.fire({
        title: this.tlt('add_user_swal_alert_msg'),
        text: this.tlt('add_user_no_revert_msg'),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.tlt('add_user_swal_delete_msg'),
      }).then((result) => {
        // this.spinnerOn=true;
          if(result.dismiss ==='cancel'){
            this.emaillist = [];
          }else if (result.value) {
          axios
            .post(
              api_calls.delete_user_url(),
              {
                emaillist: this.emaillist,
                company_name: this.companyname,
                company_id: this.companyid,
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
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
              var userlist = [];
              for (var i in this.emaillist) {
                userlist.push({
                  username: this.emaillist[i].email,
                });
              }
              // axios
              //   .post(api_calls.users_list_sync(), {
              //     delete: userlist,
              //   })
              //   .then((response) => {
              //     // console.log(response.data);
              //   });

              if (response.data.message.MSG_CODE == this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE) {
                toastr.success(this.tlt('add_user_deleted_successful_msg'));
                if(((this.emaillist.length === 1 && this.users.length === 1) ||
                  (this.emaillist.length === this.users.length)) && 
                    this.page_no >1){
                      this.page_no = this.page_no - 1;
                  }
              }else if(response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
                toastr.error(this.tlt('search_product_internal_server_msg1'));
                this.load_user();
              }  
              this.checked_list = [];
              this.emaillist = [];
              this.load_user();
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
    password_toggle(event) {
      event.preventDefault();
      var password = document.getElementById("form_password");
      if (password.type == "text") {
        password.type = "password";
      } else if (password.type == "password") {
        password.type = "text";
      }
    },
    update_users(message1, message2) {
      if (message1 == null || message2 == null) {
      } else {
        this.users = [];
        for (var i in message1) {
          this.users.push({
            email: message1[i],
            role: message2[i],
          });
        }
      }
    },
    page_require(page_no) {
      $("input:checkbox").prop("checked", false);
      this.checked_list = [];
      this.emaillist = [];
      if (page_no == 0 || page_no == this.total_pages + 1) {
        event.preventDefault();
      } else if (this.search_name != "") {
        if (page_no == "...s") {
          this.page_no = Math.ceil((1 + this.page_no) / 2);
        } else if (page_no == "...l") {
          this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
        }else{
          this.page_no = page_no;
        }
        this.spinnerOn = true;
        axios
          .post(
            api_calls.load_users_url(),
            {
              company_name: this.companyname,
              company_id: this.companyid,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
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
            this.spinnerOn = false;
            if (
                response.data.message.MSG_CODE != this.api_status_code.USER_ROLE_SET_ALREADY_EXISTS_2002.MSG_CODE &&
                response.data.message.MSG_CODE != this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE &&
                response.data.message.MSG_CODE != this.api_status_code.EMPTY_DATA.MSG_CODE  &&
                response.data.message.MSG_CODE != this.api_status_code.SUPER_ADMIN_EXISTS_ERROR.MSG_CODE
            ){
            if (response.data. data.Email.length != 0) {
                this.number_of_rows = response.data.pagination.total_data == undefined ? 0 : response.data.pagination.total_data;
                this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
              this.users = [];
              for (var i = 0; i < this.number_of_rows; i++) {
                this.users.push({
                    email: response.data.data[i].Email,
                    role: response.data.data[i].Role,
                });
              }
              this.page_no = page_no;
              this.setpagination(this.page_no);
            }
            }  else if (response.data.message.MSG_CODE == this.api_status_code.EMPTY_DATA.MSG_CODE) {
              toastr.error(this.tlt('add_user_no_user_found_msg'));
              this.load_user();
            } else if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
              toastr.error(this.tlt('search_product_internal_server_msg1'));
              this.load_user();
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
      } else {
        $("input:checkbox").prop("checked", false);
        if (page_no == "...s") {
          this.page_no = Math.ceil((1 + this.page_no) / 2);
        } else if (page_no == "...l") {
          this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
        } else {
          this.page_no = page_no;
        }
        this.spinnerOn = true;
        axios
          .post(
            api_calls.load_users_url(),
            {
              intent: this.new_intents,
              company_name: this.companyname,
              company_id: this.companyid,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              subscription: this.$session.get("UserInformation").subscription,
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
            if (response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE.MSG_CODE) {
              this.number_of_rows = response.data.pagination.total_data == undefined ? 0 : response.data.pagination.total_data;
              this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
              this.update_users(response.data.data.Email, response.data.data.Role);
              this.setpagination(this.page_no);
            }else{
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                type: "error",
                timer:2500
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
    },
    // role_submit_api() {
    //   axios
    //     .post(
    //       api_calls.role_url(),
    //       {
    //         company_id: this.companyid,
    //         company_name: this.companyname,
    //         superadmincompany_name: this.$session.get("UserInformation")
    //           .company_name,
    //         superadmincompany_id: this.$session.get("UserInformation")
    //           .company_id,
    //         role: this.$session.get("UserInformation").role,
    //         email: this.$session.get("UserInformation").email,
    //         license_key: this.$session.get("UserInformation").license_key,
    //         token: this.$session.get("UserInformation").tokens,
    //       },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${this.$session.get("at")}`,
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       this.roles = response.data.rolelist;
    //     })
    //     .catch((e) => {
    //       if (
    //         e.response.status === 410 ||
    //         e.response.status === 440 ||
    //         e.response.status === 409
    //       ) {
    //         this.$root.$emit("Session_Expired", e.response.data);
    //       }
    //     });
    // },
    add_user() {
      event.preventDefault();
      if (this.email == "" || this.validEmail != true) {
        toastr.error(this.tlt('add_user_enter_valid_email_msg'));
      }
      // else if(this.show_password_field&&
      //   (this.password==""||this.validPassword!=true)) {
      //   toastr.error("Please Enter a Valid Password");
      // }
      // else if(this.portal_roles.type === "Bot"){
      //   if (this.email == "" || this.validEmail != true) {
      //       toastr.error("Please Enter a Valid Email");
      // }
      // }
      // else if (this.correct_password == false && this.role_type_selected === "Portal User") {
      //   toastr.error("Please Enter a Valid Password");
      // } 
      else if (this.selected_role == "") {
        toastr.error(this.tlt('add_user_select_role_name_msg'));
      } else {
        this.show_loader = true;
        this.spinnerOn = true;
        $("#usermodel").modal("hide");
        var current_date = new Date();
        // if(this.role_type_selected === "Portal User")
        axios
          .post(
            api_calls.add_user_url(),
            {
              role: this.role_selected,
              staffemail: this.email,
              email: this.$session.get("UserInformation").email,
              password: this.password,
              company_id: this.companyid,
              company_name: this.companyname,
              domain: this.$session.get("UserInformation").domain,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              date: current_date,
              user_type: this.role_type_selected,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            this.spinnerOn = false;
            // this.role_selected = null;
            // var response_api = response.data;
            if (response.data.message.MSG_CODE == this.api_status_code.NEW_USER_REGISTERED_SUCCESS_2004.MSG_CODE) {
              Swal({
                title: this.tlt('add_user_added_successful_msg'),
                type: "success",
                text:
                  this.tlt('add_user_user_verification_msg'),
              });
            } else if (response.data.message.MSG_CODE == this.api_status_code.DUPLICATE_EMAIL_1015.MSG_CODE) {
              Swal({
                type: "error",
                text:
                  this.tlt('add_user_email_already_registered_msg'),
              });
            } else if (response.data.message.MSG_CODE == this.api_status_code.CHAT_AGENT_LIMIT_REACHED.MSG_CODE) {
              Swal({
                type: "warning",
                text: this.tlt('add_user_upgrade_plan_for_live_chat_msg'),
                timer: 3000
              });
            } else if (response.data.message.MSG_CODE == this.api_status_code.EMAIL_REGISTERED_WITH_OTHER_COMPANY.MSG_CODE) {
              Swal({
                type: "error",
                text: this.tlt('user_registered_with_other_company'),
                timer: 3000
              });
            } else if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
                Swal({
                  type: "error",
                  text: this.tlt('add_role_internal_server_msg'),
                  timer:3000,     
                });
             } else if (response.data.message.MSG_CODE == this.api_status_code.EMAIL_REGISTERED_WITH_OTHER_COMPANY.MSG_CODE) {
                Swal({
                  type: "error",
                  text: response.data.message.MSG,
                  timer:3000,     
                });
             }
             else {
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                type: "error",
                timer: 2500
              })
            }
            this.load_user();
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
    clear_fields() {
      this.email = "";
      this.password = "";
      this.selected_role = "";
    },
    callsearch() {
      if (event.keyCode === 13) {
        this.search_product();
      }
    },
    search_product() {
      if (this.search_name != "") {
        $("input:checkbox").prop("checked", false);
        this.checked_list = [];
        this.emaillist = [];
        this.spinnerOn = true;
        axios
          .post(
            api_calls.load_users_url(),
            {
              company_name: this.companyname,
              company_id: this.companyid,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
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
                response.data.message.MSG_CODE != this.api_status_code.USER_ROLE_SET_ALREADY_EXISTS_2002.MSG_CODE &&
                response.data.message.MSG_CODE != this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE &&
                response.data.message.MSG_CODE != this.api_status_code.EMPTY_DATA.MSG_CODE  &&
                response.data.message.MSG_CODE != this.api_status_code.SUPER_ADMIN_EXISTS_ERROR.MSG_CODE
            ) {
              // response.data.data.Email.length != 0
              if (response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE.MSG_CODE) {
                this.number_of_rows = response.data.pagination.total_data == undefined ? 0 : response.data.pagination.total_data;
                this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
                this.users = [];
                for (var i = 0; i < this.number_of_rows; i++) {
                  this.users.push({
                    email: response.data.data[i].Email,
                    role: response.data.data[i].Role,
                  });
                }
                this.page_no = 1;
                this.setpagination(this.page_no);
              }
            } else if (response.data.message.MSG_CODE == this.api_status_code.EMPTY_DATA.MSG_CODE) {
              toastr.error(this.tlt('add_user_no_user_found_msg'));
              this.load_user();
            } else if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
              toastr.error(this.tlt('search_product_internal_server_msg1'));
              this.load_user();
            } else {
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                type: "error",
                timer: 2500
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
      } else {
        toastr.error(this.tlt('add_user_data_for_search_msg'));
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
    show_field(selectedOption, id) {
      // console.log(selectedOption);
      this.role_selected = selectedOption.name;
      this.role_type_selected = selectedOption.type;
      this.show_email_field = false;
      this.show_password_field = false;
      for (let i = 0; i < this.portal_roles.length; i++) {
        if (this.portal_roles[i].role === selectedOption.name) {
          if (this.portal_roles[i].type === "Bot") {
            this.show_email_field = true;
          } else if (this.portal_roles[i].type === "Portal") {
            this.show_email_field = true;
            this.show_password_field = true;
          }
        }
      }
    },
  },
  get methods() {
    return this._methods;
  },
  set methods(value) {
    this._methods = value;
  },
};
</script>

<style lang="scss" scoped>
.swal-size {
  height: 20px !important;
}
.pass.form-control,
.email.form-control {
  background-position: 8px 50% !important;
}
.view-pass {
  top: 10px;
}
// #message {
//   display: none;
//   background: #fff;
//   color: #000;
//   position: relative;
//   padding: 20px;
//   margin-top: 10px;
// }

// .valid {
//   color: green;
// }

// .valid:before {
//   position: relative;
//   left: -35px;
//   content: "✔";
// }

// /* Add a red text color and an "x" when the requirements are wrong */
// .invalid {
//   color: red;
// }

// .invalid:before {
//   position: relative;
//   left: -35px;
//   content: "✖";
// }
// .is-invalid {
//   color: red;
// }
</style>

