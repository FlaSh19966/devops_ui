<template>
  <div>
    <div id="body" class="log-wrap d-flex align-items-center">
      <div class="spinner" id="spinner" v-show="mainspinnerOn"></div>
    <!-- <div id="body" class="log-wrap d-flex align-items-center"> -->
      <div class="container" id="login_card" style="padding: 50px 50px 0px">
        <div class="log-blk" style="border-radius: 20px; box-shadow: 0px 1px 22px #00000014">
          <div class="row no-gutters">
            <div class="col-lg-6" :class="login_card_height">
              <!-- <div class="title-sec d-flex align-items-center"> -->
              <div class="title-sec d-flex">
                <div class="inner-title">
                  <div class="sec-logo">
                    <img src="/img/logonew.png" style="width: 100%; padding: 0px 70px 0px;" alt />
                  </div>
                  <h2>{{tlt('login_page_welcome_back_label','code')}}!</h2>
                  <p style="margin-bottom: 50px; opacity: 0.9;"
                  :style="(is_language === 'pt')? 'width:112%; margin-left: -20px;':''">{{tlt('login_page_cense_tagline1','code')}} {{tlt('login_page_cense_tagline2', 'code')}}</p>
                  <a href="javascript: void(0)" @click="$router.push({name: 'Register'})" class="white-btn" style="padding: 5px 20px;
    width: 50%;
    height: 40px;">{{tlt('sign_up_btn', 'code')}}</a>
                  <!-- <a href="https://website.cense.ai/register" class="white-btn"
                    >Sign Up</a
                  > -->
                  <!-- {{tlt('sign_up_btn', 'code')}} -->
                </div>
              </div>
            </div>
            <div class="col-lg-6" :class="login_card_height">
              <!-- <div class="log-sec d-flex align-items-center"> -->
              <div class="log-sec d-flex">
                <div class="log-frm">
                  <h2>{{tlt('login_btn', 'code')}}</h2>
                  <br />
                  <center>
                    <div class="radio" style="margin-bottom: 30px;">
                      <label style="margin-right: 65px;">
                        <input
                          type="radio"
                          value="Portal"
                          v-model="login_type"
                        />
                        <span class="icn"></span> {{tlt('login_page_portal_option', 'code')}}
                      </label>
                      <label>
                        <input type="radio" value="Bot" v-model="login_type" />
                        <span class="icn"></span> {{tlt('login_page_bot_option', 'code')}}
                      </label>
                    </div>
                  </center>
                  <form @submit.prevent="create" style="padding: 0px 10px 0px;">
                    <div class="form-group" style="margin-top: 30px">
                      <!-- <img class="view-fail" src="/img/email-icn.png" alt /> -->
                      <input
                        type="email"
                        v-model="user.email"
                        class="form-control email"
                        :placeholder="tlt('email_text', 'code')"
                        id="login_username"
                        required
                        style="border-radius: 29px; padding: 3px 30px 3px 43px; font-size: 15px;"
                        :class="{invalid:is_submitting && !user.email.trim()}"
                      />
                    </div>
                    <div class="form-group" style="margin-bottom: 5px;">
                        <!-- <img class="view-fail" src="/img/lock-icn.png" alt /> -->
                      <input
                        type="password"
                        v-model="user.password"
                        id="form_password"
                        class="form-control pass"
                        :placeholder="tlt('pwd_label', 'code')"
                        style="border-radius: 29px; padding:3px 0px 3px 43px; font-size: 15px;"
                        :class="{invalid:is_submitting && !user.password.trim()}"                       
                      />
                      <a
                        href="javascript:void(0)"
                        @click="password_toggle"
                        class="view-pass"
                        style="top: 7px;"
                      >
                        <img src="/img/eye-icn.png" alt />
                      </a>
                    </div>
                    <div class="checkbox" style="margin-right: 15px;">
                      <a
                        href="#"
                        class="forgot"
                        data-toggle="modal"
                        data-target="#usermodal"
                        >{{tlt('login_page_forgot_pwd_label', 'code')}}?</a
                      >
                    </div>
                    <div class="btn-wrap">
                      <button type="submit" style="width: max-content; min-width:170px; padding: 0px 20px; height: 40px" 
                      class="darkblue-btn">
                        <span style="font: normal normal 600 17px/27px Poppins">
                          <!-- {{tlt('login_btn', 'code')}} -->
                          {{tlt('login_btn', 'code')}}
                          <i
                            class="fa fa-spinner fa-spin"
                            id="spinner"
                            v-if="login_button_spinner"
                          ></i>
                        </span>
                      </button>
                      <div class="text-center" v-if="(allowed_attempts_remaining!=null && allowed_attempts_remaining > 0)">
                        <span style="color: red; font-size:14px;">
                          {{tlt('you_have' ,'code')}} {{allowed_attempts_remaining}} {{tlt('attempt' ,'code')}}{{(allowed_attempts_remaining > 1) ? 's': ''}} {{tlt('account_locked', 'code')}}
                        </span>
                      </div>
                    <div class="text-center" v-if="is_user_locked">
                      <span style="color: red; font-size:14px;">
                       {{tlt('too_many_attempt','code')}} {{user_locked_date_allowed}}. <a href="mailto:support@cense.ai?subject=Help%20Required%20-%20Cense%20Portal%20Account%20Locked" class="ctct-us" > {{tlt('contact_us_link')}}</a> {{tlt('alert_msg', 'code')}}
                      </span>
                    </div>
                    <span class="divider-bar"></span>
                      <h6
                        class="
                          text-center
                          divider-text
                          mb-0
                          mt-2
                        "
                      >
                        Or
                      </h6>
                      <a
                        @click="loginWithGoogle()"
                        class="
                          btn
                          google-btn
                          bg-white
                          d-block d-flex
                          align-items-center
                          text-decoration-none
                          justify-content-center
                        "
                      >
                        <img
                          src="@/portal/assets/img/google-icon.svg"
                          alt="google"
                          class="me-3"
                          width="28rem"
                        />
                        <span>{{tlt('login_page_google_login_link', 'code')}}</span>
                      </a>
                      <!-- <div class="action-btns">
                      <div
                      class="
                        position-relative
                        d-flex
                        align-items-center
                        justify-content-center
                        mt-4
                        py-4
                      "
                    >
                      <span class="divider-bar"></span>
                      <h6
                        class="
                          position-absolute
                          text-center
                          divider-text
                          bg-light
                          mb-0
                        "
                      >
                        Or
                      </h6>
                    </div>
                      <a
                        @click="loginWithGoogle()"
                        class="
                          btn
                          google-btn
                          bg-white
                          shadow-sm
                          mt-4
                          d-block d-flex
                          align-items-center
                          text-decoration-none
                          justify-content-center
                        "
                      >
                        <img
                          src="/assets/img/google-icon.svg"
                          alt="google"
                          class="me-3"
                        />
                        <span>Connect with Google</span>
                      </a>
                    </div> -->
                    
                    </div>
                   
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <footer>
            <div style="margin-top: 50px; text-align: center;">
              Ⓒ {{ new Date().getFullYear() }} {{tlt('all_rights_reserved_msg','code')}}
              <a href="https://cense.ai/privacy-policy">{{tlt('policy_msg','code')}}</a>
              <img
                src="@/portal/assets/img/flags/US.png"
                alt=""
                class="ml-1 c-p"
                title="English"
                @click="change_locale_language('en')"
              />
              <img
                src="@/portal/assets/img/flags/india.png"
                alt=""
                height="23px"
                width="23px"
                class="ml-1 c-p"
                title="Hindi"
                @click="change_locale_language('hi')"
              />
              <!-- <div class="vl ml-1" style="display: inline;"></div>
              <img
                src="@/portal/assets/img/flags/ES.png"
                height="17px"
                width="23px"
                alt=""
                class="ml-1 c-p"
                title="spanish"
                @click="change_locale_language('es')"
              /> -->
              <!-- <div class="vl ml-1" style="display: inline;"></div> -->
              <img
                src="@/portal/assets/img/flags/PT.png"
                height="17px"
                width="23px"
                alt=""
                class="ml-1 c-p"
                title="Portuguese"
                @click="change_locale_language('pt')"
              />
            </div>
          </footer>
        </div>
      </div>
      <div
        class="modal fade dash-modal"
        id="usermodal"
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
                <h3>{{tlt('login_page_forgot_pwd_header', 'code')}}</h3>
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
              <form @submit="forgot_password">
                <div class="form-group">
                  <label>{{tlt('forgot_pwd_model_email_label' ,'code')}}</label>
                  <input
                    id="email_forgot_pwd"
                    type="email"
                    class="form-control"
                    v-model="forgot_password_email"
                    :placeholder="tlt('enter_email_text', 'code')"
                    @input="email_validate"
                  />
                </div>
                <div
                  style="color: red"
                  v-if="show_validation_string && forgot_password_email != ''"
                >
                  {{tlt('forgot_pwd_model_email_condition_label', 'code')}}
                </div>
                <div class="btn-wrap text-right">
                  <button
                    type="button"
                    class="btn btn-link"
                    data-dismiss="modal"
                    @click="clear_fields"
                  >
                    {{tlt('forgot_pwd_model_cancel_btn', 'code')}}
                  </button>
                  <button type="submit" class="darkblue-btn" style="width: 20%;">{{tlt('forgot_pwd_model_send_btn' ,'code')}}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import swal from "sweetalert2";
import sidebaritems from "../Layout/SideBarItem";
import { setTimeout } from "timers";
import api_calls from "@/portal/api_calls";
import { bus } from "@/portal/main";
import Cookies from "js-cookie";
import moment from "moment";
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
        date: "",
        login_source : "PORTAL",
        sso_source : null,
      },
      open_modal: false,
      forgot_password_email: "",
      is_language: this.$session.get("PreferredLanguage"),
      reg_email: /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/,
      show_validation_string: false,
      login_type: "Portal",
      is_super_admin: false,
      open_bot_api_response_received: false,
      login_button_spinner: false,
      is_submitting: false,
      allowed_attempts_remaining: null,
      is_user_locked: false,
      user_locked_date_allowed: null,
      mainspinnerOn: false,
      is_free_trial_expire : false,
      
    };
  },
  beforeCreate() {
    if(this.$session.has("UserInformation") && Boolean(this.$route.query.is_shopify_billing_redirect)){
      this.$router.push({
        name: "Dashboard",
        params: {
          is_shopify_billing_redirect: true
        }
      });
    }
    else if (
      this.$session.has("UserInformation") &&
      !(Boolean(this.$route.query.email) && Boolean(this.$route.query.token))
    ) {
      this.$router.push("/bot/dashboard");
    }
  },
  created() {
    let l_type = Cookies.get("login_type");
    if ((l_type !== undefined) && (l_type !== "undefined") ) {
      this.login_type = Cookies.get("login_type");
    } 
    if(this.login_type == undefined) {
      this.login_type = "Portal"
    }
  },
  beforeMount() {
    var email = this.$route.query.email;
    var token_id = this.$route.query.token;
    if (email && token_id) {
      this.$router.replace("login");
      axios
        .post(api_calls.validate_login(), {
          email: email,
          token: token_id,
        })
        .then((response) => {
          if (response.data == "Email already verified") {
            swal({
              text:
                this.tlt('link_expired_msg', 'code'),
            });
          } else if (response.data == "Email verification successful") {
            swal({
              type: "success",
              text:
                this.tlt('login_email_verify_success', 'code'),
              timer: 3000,
            });
          } else if (response.data == "User Doesn't Exist") {
            swal({
              text: this.tlt('login_user_not_exist', 'code'),
              type: "error",
              timer: 2000,
            });
          }
        });
    }
  },
  methods: {
    email_validate() {
      if (this.reg_email.test(this.forgot_password_email)) {
        this.show_validation_string = false;
      } else {
        this.show_validation_string = true;
      }
    },
    //  toggle_domain(event) {
    //   if (event.target.value == "Portal") {
    //     document.getElementById("domain_input").style.display = "";
    //   } else if (event.target.value == "Bot") {
    //     document.getElementById("domain_input").style.display = "none";
    //   }},
    clear_fields() {
      this.forgot_password = "";
      $("#usermodal").modal("hide");
      this.user.email = "";
      this.user.password = "";

    },
    forgot_password() {
      event.preventDefault();
      if (
        this.show_validation_string == false &&
        this.forgot_password_email != ""
      ) {
        swal({
          toast: true,
          text: this.tlt('login_submit_your_details', 'code'),
          showConfirmButton: false,
          type: "info",
          timer: 2500
        });
        axios
          .post(api_calls.forgot_password(), {
            email: this.forgot_password_email,
          })
          .then((response) => {
            if (response.data.includes("email address")) {
              swal({
                text: this.tlt('registered_email_check', 'code'),
                type: "error",
              });
            } else if (response.data == "A mail has been sent to your email") {
              swal({
                text:
                  this.tlt('login_reset_password', 'code'),
                timer: 3000,
              });
              $("#usermodal").modal("hide");
            } else {
              swal({
                text: this.tlt('some_error_occurred_msg', 'code'),
                timer: 2500,
              });
              $("#usermodal").modal("hide");
            }
          });
      }
    },
    password_toggle() {
      var password = document.getElementById("form_password");
      if (password.type == "text") {
        password.type = "password";
      } else if (password.type == "password") {
        password.type = "text";
      }
    },
    create() {
      this.is_submitting = true;
      if (this.user.name == "" || this.user.password == "") {
        swal({
          type: "warning",
          title: this.tlt('login_enter_email_pwd_msg', 'code'),
          timer: 2500,
        });
      } else {
        this.is_submitting = false;
        this.login_button_spinner = true;
        // document.getElementById("spinner").style.opacity = "1";
        $('button[type="submit"]').prop("disabled", true);
        this.call_api();
      }
    },
    redir(data) {
      // if (!this.is_super_admin){
        let reset_fields = true;
        this.login_button_spinner = false;
        // document.getElementById("spinner").style.opacity = "0";
        document.getElementById("body").style.opacity = "0.5";
      // } 
      if (data.message.MSG_CODE == this.api_status_code.EMAIL_NOT_VERIFIED_1023.MSG_CODE) {
        swal({
          html:
            this.tlt('login_account_validated', 'code')+'<br>'+this.tlt('login_check_email_details', 'code'),
          type: "error",
        });
        document.getElementById("body").style.opacity = "1";
        $('button[type="submit"]').prop("disabled", false);
      } else if(data.message.MSG_CODE == this.api_status_code.USER_HAS_BEEN_LOCKED.MSG_CODE) {
        reset_fields = false;
         swal({
          text:
            this.tlt('login_account_got_locked', 'code'),
          type: "error",
        });
        document.getElementById("body").style.opacity = "1";
        $('button[type="submit"]').prop("disabled", false);   
      } else if (data.message.MSG_CODE  == this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
        swal({
          type: "error",
          html:
            this.tlt('login_internal_server_msg', 'code'),
        });
        document.getElementById("body").style.opacity = "1";
        $('button[type="submit"]').prop("disabled", false);
      } else if (data.message.MSG_CODE  == this.api_status_code.USER_NOT_APPROVED_1019.MSG_CODE) {
        swal({
          type: "warning",
          html:
            this.tlt('registration_declined_msg', 'code'),
          timer: 3000,
        });
        document.getElementById("body").style.opacity = "1";
        $('button[type="submit"]').prop("disabled", false);
      } else if (data.message.MSG_CODE  == this.api_status_code.USER_ALREADY_LOGGED_IN_1021.MSG_CODE) {
        swal({
          type: "error",
          html: this.tlt('user_already_logged', 'code'),
          timer: 2000,
        });
        document.getElementById("body").style.opacity = "1";
        $('button[type="submit"]').prop("disabled", false);
      } else if (data.message.MSG_CODE  == this.api_status_code.INVALID_CREDENTIALS_0005.MSG_CODE) {
        reset_fields = false;
        if(!isNaN(data.message.allowed_attempts)){
          this.allowed_attempts_remaining = data.message.allowed_attempts;
          swal({
            type: "error",
            html: this.tlt('login_invalid_credentials1', 'code'),
            text: this.tlt('you_have_msg', 'code')+` ${this.allowed_attempts_remaining} `+this.tlt('account_get_locked_msg', 'code'),
            showConfirmButton: true,
          });
        } else {
          swal({
            type: "error",
            html: this.tlt('login_invalid_credentials1', 'code'),
            showConfirmButton: true,
          });
        }
        document.getElementById("body").style.opacity = "1";
        $('button[type="submit"]').prop("disabled", false);
      } else if (data.message.MSG_CODE  == this.api_status_code.API_RATE_LIMIT_EXCEEDED.MSG_CODE) {
        swal({
          type: "error",
          html:
            this.tlt('login_monthly_api_exceed', 'code'),
          timer: 3000,
        });
        document.getElementById("body").style.opacity = "1";
        $('button[type="submit"]').prop("disabled", false);
      } else if (data.message.MSG_CODE  == this.api_status_code.RENEW_PASSWORD.MSG_CODE) {
        swal({
          type: "error",
          html:
            this.tlt('login_renew_password', 'code'),
          timer: 2500,
        });
        document.getElementById("body").style.opacity = "1";
        $('button[type="submit"]').prop("disabled", false);
      } else if(Boolean(data.data.is_super_admin_login)){
        this.$router.push({
          name: "SuperAdminIntermediateScreen",
          params: {
            data: data.data.all_users_list
          }
        });
        this.$session.start();
        this.$session.set("UserInformation", data.data.userinformation);
        this.$session.set("at", data.data.userinformation.access_token);
        this.$session.set("rt", data.data.userinformation.refresh_token);
      } else if (this.login_type == "Bot") {
        Cookies.remove("login_type");
        Cookies.set("login_type", this.login_type, { expires: 365 });
        this.$session.start();
        this.$session.set("UserInformation", data.data.userinformation);
        this.$session.set("at", data.data.userinformation.access_token);
        this.$session.set("rt", data.data.userinformation.refresh_token);
        this.check_template_subscription('push_direct_response_bot');
        // this.$router.push("/bot/directresponsebot");
      } else if (data.message.MSG_CODE  == this.api_status_code.USER_IS_LOCKED.MSG_CODE) {
        reset_fields = false;
        if(data.data.locked_at != null && data.data.locked_at != undefined){
          this.is_user_locked = true;
          // this.user_locked_date_allowed = moment(moment(new Date(message.locked_at)).add(1, 'd')).format("MMM Do, h:mm a");
          this.user_locked_date_allowed = moment(moment(new Date(data.data.locked_at)).add(1, 'd')).calendar();
        }
        swal({
          type: "error",
          title: this.tlt('login_account_locked', 'code'),
          html: this.tlt('user_account_locked_msg', 'code')+ ` ${this.user_locked_date_allowed}. <a href="mailto:support@cense.ai?subject=Help%20Required%20-%20Cense%20Portal%20Account%20Locked" class="ctct-us">`+this.tlt('contact_us_link')+`</a> `+this.tlt('alert_msg1', 'code'),
        });
        document.getElementById("body").style.opacity = "1";
        $('button[type="submit"]').prop("disabled", false);
      } else if (data.message.MSG_CODE  == this.api_status_code.REGISTER_AND_LOGIN_SOURCE_DONT_MATCH.MSG_CODE) {
        swal({
          type: "error",
          title: this.tlt('login_source_different_msg', 'code'),
          html: this.tlt('account_registered_msg', 'code')+` ${data.message.register_source}. `+this.tlt('alert_msg2', 'code'),
        });
        document.getElementById("body").style.opacity = "1";
        $('button[type="submit"]').prop("disabled", false);

      } else if (data.message.MSG_CODE  == this.api_status_code.SSO_SERVER_ERROR.MSG_CODE) {
        swal({
          type: "error",
          title: this.tlt('login_error_with_sso', 'code'),
          html: this.tlt('some_error_please_try_again', 'code'),
        });
        document.getElementById("body").style.opacity = "1";
        $('button[type="submit"]').prop("disabled", false);

      }
      else {
        Cookies.remove("login_type");
        Cookies.set("login_type", this.login_type, { expires: 365 });
        this.$session.start();
        this.$session.set("UserInformation", data.data.userinformation);
        if (data.data.userinformation.subscription == 'Free' && data.data.userinformation.subscription_status != 'freetrial') {
            this.is_free_trial_expire = true ;
        }
        this.$session.set('whatsapp_subscription',data.data.userinformation.whatsapp_subscription)
        this.$session.set("retail_web_framework", data.data.retail_web_framework);
        axios
          .post(api_calls.bot_response_token(), {
            license_key: this.$session.get("UserInformation").license_key,
            username: this.$session.get("UserInformation").email,
          })
          .then((response) => {
            if (this.api_status_code.STATUS_SUCCESS_CORE.MSG_CODE === response.data.message.MSG_CODE){
              this.$session.set("BotToken", response.data.data);
              this.$session.remove("TemporaryBotToken");
              bus.$emit("Token changed", "True");
            }
          });
        this.$session.set("UserFirstName", data.data.userinformation.first_name);
        this.$session.set("UserLastName", data.data.userinformation.last_name);
        this.$session.set("rt", data.data.userinformation.refresh_token);
        this.$session.set("at", data.data.userinformation.access_token);
        this.$session.set("RestrictionList", data.data.restriction_list);
        document.cookie =
          "company_id=" + this.$session.get("UserInformation").company_id;
        document.cookie =
          "company_name=" + this.$session.get("UserInformation").company_name;
        document.cookie = 
          "company_email=" + this.$session.get("UserInformation").email; 
        this.login_button_spinner = true;
        // document.getElementById("spinner").style.opacity = "1";
        this.check_template_subscription(null, data.data.menubind);
        // setTimeout(() => {
        // this.update_menu_list(message.menubind);
        // }, 100);
      }
      if(reset_fields){
        this.user.email = "";
      }
      this.user.password = "";
      this.user.login_source = "PORTAL";
      this.user.sso_source = null;
    },
    check_template_subscription(param, menu) {
      axios
        .get(api_calls.open_bot_template_subscription_api(), {
          params: {
            company_name: this.$session.get("UserInformation").company_name,
            company_id: this.$session.get("UserInformation").company_id,
          },
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          },
        })
        .then(({data}) => {
          this.open_bot_api_response_received = true;
          if (param === null){
            this.update_menu_list(menu);
          }
          if(data.message.MSG_CODE === this.api_status_code.SUCCESSFUL_DB_QUERY_MODELS.MSG_CODE){
            this.$session.set("BotTemplates", data.data.templates)
            if(param === 'push_direct_response_bot'){
              this.$router.push({
               name: "Direct Response Bot",
               params: {
                 reload: true
               }
              });
            }
          } else {
            if(param === 'push_direct_response_bot'){
              this.$router.push({
               name: "Direct Response Bot",
               params: {
                 reload: true
               }
              });
            }
          }
        }).catch((e)=> {
          this.open_bot_api_response_received = true;
          if (param === null){
            this.update_menu_list(menu);
          }
          if(param === 'push_direct_response_bot'){
              this.$router.push({
               name: "Direct Response Bot",
               params: {
                 reload: true
               }
              });
            }
          console.log(e);
        });
    },
    call_api() {
      this.user.date = moment().toISOString();
      this.allowed_attempts_remaining = 0;
      this.is_user_locked = false;
      this.user_locked_date_allowed = null;
      axios
        .post(api_calls.login(), this.user)
        .then((response) => {
          this.redir(response.data);
          this.mainspinnerOn = false;
        })
        .catch((e) => {
          console.log(e)
          this.login_button_spinner = false;
          // document.getElementById("spinner").style.opacity = "0";
          $('button[type="submit"]').prop("disabled", false);
          document.getElementById("body").style.opacity = "1";
        // $('button[type="submit"]').prop("disabled", false);
          swal({
            html: this.tlt('some_error_occurred_msg','code')+'<br>'+this.tlt('please_try_again_msg','code'),
            type: "error",
            showConfirmButton: false,
            timer: 2500,
          });
          // toastr.error("There is an internal server error.");
        });
    },
    update_menu_list(message) {
      let menu = {};
      let main_menu_list = message.filter(
        (arr) => arr.IsMasterMenu == true && arr.Enabled == true
      );
      let main_menu_list_filtered = [];
      let sub_menu_list = message.filter(
        (arr) =>
          arr.HasSubMenus == false &&
          arr.Enabled == true &&
          arr.IsSubMenu == true
      );

      for (let i = 0, n = main_menu_list.length; i < n; i += 1) {
        let menuFilter = sidebaritems.filter((sidebar) => {
          return (
            sidebar.name === main_menu_list[i].MenuItem &&
            Boolean(sidebar.svg_html)
          );
        });
        if (menuFilter.length > 0) {
          main_menu_list_filtered.push(menuFilter[0]);
          menu[menuFilter[0].name] = {
            main_menu: menuFilter[0],
            sub_menu_list: [],
          };
        }
      }
      try {
        for (let i = 0, n = sub_menu_list.length; i < n; i += 1) {
          for (var j in sidebaritems) {
            if (
              sidebaritems[j].name === sub_menu_list[i].MenuItem &&
              Boolean(sidebaritems[j].page_path && sidebaritems[j].master_menu === sub_menu_list[i].MasterMenu)
            ) {
              menu[sub_menu_list[i].MasterMenu].sub_menu_list.push(
                sidebaritems[j]
              );
            }
          }
        }
      } catch (e) {
        console.log(e);
        // debugger;
      }
      menu = Object.values(menu);

      // for (let i = 0, n = message.length; i < n; i += 1) {
      //   if (message[i].Enabled && message[i].IsMasterMenu) {
      //     let menuFilter = sidebaritems.filter((sidebar) => {
      //       return (
      //         sidebar.name === message[i].MenuItem && Boolean(sidebar.svg_html)
      //       );
      //     });
      //     if (menuFilter.length > 0) {
      //       main_menu = menuFilter[0];
      //     }
      //   } else if (
      //     message[i].HasSubMenus == false &&
      //     message[i].Enabled &&
      //     message[i].IsSubMenu &&
      //     Object.keys(main_menu).length > 0
      //   ) {
      //     for (var j in sidebaritems) {
      //       if (
      //         sidebaritems[j].name === message[i].MenuItem &&
      //         Boolean(sidebaritems[j].page_path)
      //       ) {
      //         submenus.push(sidebaritems[j]);
      //       }
      //     }
      //   }
      //   if (
      //     i == n - 1 ||
      //     (message[i].IsMasterMenu == true &&
      //       message[i].HasSubMenus === false &&
      //       !Boolean(message[i].IsSubMenu) &&
      //       message[i].Enabled)
      //   ) {
      //     menu.push({
      //       main_menu: main_menu,
      //       sub_menu_list: submenus,
      //     });
      //     main_menu = [];
      //     submenus = [];
      //   } else if (
      //     i < n - 1 &&
      //     message[i + 1].IsMasterMenu &&
      //     (!Boolean(message[i + 1].IsSubMenu) ||
      //       message[i + 1].HasSubMenus == true) &&
      //     Object.keys(main_menu).length > 0
      //   ) {
      //     menu.push({
      //       main_menu: main_menu,
      //       sub_menu_list: submenus,
      //     });
      //     main_menu = [];
      //     submenus = [];
      //   }
      // }
      this.$session.set("ChatbotMenu", menu);
      // while (!this.open_bot_api_response_received){
        // this.$router.push("/bot/dashboard");
        this.$router.push({
          name: "Dashboard",
          params: {
            is_free_trial:this.is_free_trial_expire
          }
        });
      // }
    },
    async loginWithGoogle() {
      try {
        // first
        // console.log("first")
        const googleUser = await this.$gAuth.signIn();
        const google_keys = Object.keys(googleUser);
        let profile = googleUser.getBasicProfile();
        const keys = Object.keys(profile);
        // console.log(googleUser);
        // console.log(profile);
        const sso_token = googleUser[google_keys[1]].id_token !== undefined
            ? googleUser[google_keys[1]].id_token
            : googleUser[google_keys[2]].id_token;
        this.user.login_source = "SSO";
        this.user.sso_source = "google";
        this.user.sso_token = sso_token;
        this.user.email = profile[keys[5]];
        // console.log(this.user);
        this.mainspinnerOn = true;
        this.call_api();
      } 
      catch (error) {
        this.mainspinnerOn = false;
        console.log(error);
      }
    },
  },
  computed: {
    login_card_height(){
      if((this.is_user_locked === true) || (this.allowed_attempts_remaining!=null && this.allowed_attempts_remaining > 0)) {
        return "login-card-tall"
      }
      return "login-card-default"
    }
  }
};
</script>
<style >
 .custom-select.is-valid, .form-control.is-valid, .was-validated .custom-select:valid, .was-validated .form-control:valid {
    border-color: #53b9d0;
}
</style>
<style scoped>
.vl {
  border-left: 1px solid #bbb;
  font-size: 15px;
}
@media (min-width: 992px){
  .container {
    max-width: 960px;
}
}
@media (min-width: 1200px){
  .container {
    max-width: 960px;
}
}
.title-sec .white-btn {
  text-transform: initial;
  min-width: 170px;
}
.title-sec p {
  font: normal normal normal 17px/27px Poppins;
  opacity: 0.7;
  font-weight: 300;
}
.white-btn {
  font: normal normal 600 16px/27px Poppins;
  color: #0E2A64;
}
.darkblue-btn {
  border-radius: 30px;
  width: 50%;
  margin: auto;
}
.log-sec{
    padding: 50px;
    position: relative;
    height: 100%;
}
.log-sec h2{
  font: normal normal 600 28px/53px Poppins;
  color: #0E2A64;
  margin: 10px 0px 0px;
}
.form-group, .log-wrap form .radio {
    margin: 0px 15px 15px;
}
.radio label {
  font-size: 16px;
}

.view-fail {
  position: absolute;
  left: 12px;
  top: 12px;
  display: block;
}

.view-fail img {
  width: 26px;
  display: block;
}

.forgot {
  font: normal normal normal 13px/20px Poppins;
}
.invalid{
  border-color: red;
}
.ctct-us{
  color: red;
  text-decoration: underline;
}
.login-card-tall {
  height: 510px
}
.login-card-default {
  height: 450px;
}
</style>
