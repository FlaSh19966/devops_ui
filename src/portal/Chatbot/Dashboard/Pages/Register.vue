<template>
  <div style="background-color: #F6F9FF">
    <div
      class="spinner"
      v-show="spinnerOn"
    ></div>
    <div class="log-wrap d-flex align-items-center">
      <div class="container" style="margin-top: 50px; padding: 0px 20px;">
        <div class="log-blk" style="box-shadow: 0px 1px 22px #00000014; border-radius: 27px">
          <div class="row no-gutters">
            <div class="col-lg-6 order-lg-2">
              <div
                class="title-sec d-flex align-items-center"
              >
                <div
                  class="inner-title"
                  style="max-width: 380px; height: 100%"
                >
                  <div class="sec-logo" style="margin: 15px 0 80px;">
                    <img
                      style="width: 100%; padding: 0px 70px 0px;"
                      src="/img/logonew.png"
                      alt
                    />
                  </div>
                  <h2 style="margin: 0 0 10px;">{{tlt('register_get_started_header')}} !</h2>
                  <p style="opacity: 0.9; font-size: 16px; margin: 0 0 45px;">
                    {{tlt('register_overview_of_cense_text1', 'code')}} {{tlt('register_overview_of_cense_text2', 'code')}}
                    {{tlt('register_overview_of_cense_text3', 'code')}}
                  </p>
                  <!-- <u>
                    <a href="https://cense.ai/pricing" style="color: #fff;">Subscription Package</a>
                  </u>-->
                  <br />
                  <button
                    href="javascript: void(0)"
                    class="white-btn"
                    style="width: 170px;"
                    :style="disable_login ? {cursor :'not-allowed'} : {cursor: 'pointer'}"
                    :disabled="disable_login"
                    :title="disable_login ? 'You need to first Sign up with prefilled details' : ''"
                    @click="$router.push({name: 'Login'})"
                  >{{tlt('login_btn', 'code')}}</button>
                  <br />
                </div>
              </div>
            </div>
            <div class="col-lg-6 order-lg-1">
              <div class="log-sec d-flex align-items-center" style="padding: 20px 70px;">
                <div class="log-frm">
                  <h2 style="margin-bottom: 10px;">{{tlt('sign_up_btn', 'code')}}</h2>
                  <form @submit.prevent="create">
                    <!-- <div class="radio">
                      <label>
                        <input
                          type="radio"
                          @change="toggle_domain"
                          value="Customer"
                          v-model="user.registration_type"
                        />
                        <span class="icn"></span> Customer
                      </label>
                      <label>
                        <input
                          type="radio"
                          @change="toggle_domain"
                          value="Partner"
                          :disabled="input_disable"
                          v-model="user.registration_type"
                        />
                        <span class="icn"></span> Partner
                      </label>
                    </div> -->
                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control company"
                          style="border-radius: 29px; padding: 3px 10px 3px 43px; font-size: 15px;"
                          id="exampleFormControlInput1"
                          :placeholder="tlt('full_name_label', 'code')"
                          v-model.trim="user.full_name"
                          :class="{invalid:is_submitting && !user.full_name.trim()}" 
                        />
                      </div>
                      <!-- <div class="form-group pl-2">
                        <input
                          type="text"
                          class="form-control company"
                          style="border-radius: 29px; padding: 3px 10px 3px 43px; font-size: 15px;"
                          placeholder="Last Name"
                          v-model.trim="user.last_name"
                          :class="{invalid:is_submitting && !user.last_name.trim()}"
                        />
                      </div> -->
                    <div class="form-group">
                      <input
                        id="CompanyName"
                        type="text"
                        v-model.trim="user.company_name"
                        class="form-control company"
                        :placeholder="tlt('company_name_label', 'code')"
                        style="border-radius: 29px; padding: 3px 30px 3px 43px; font-size: 15px;"
                        :disabled="retail_redirect_with_prefill"
                        :class="{invalid:is_submitting && !user.company_name.trim()}"
                      />
                    </div>
                    <div
                      class="form-group"
                      id="domain_input"
                    >
                      <select
                        v-model.trim="user.domain"
                        class="form-control domain custom-select"
                        id="select_domain_input"
                        style="border-radius: 29px; padding: 3px 30px 3px 43px; font-size: 15px;"
                        :disabled="retail_redirect_with_prefill"
                        :class="{invalid:is_submitting && !user.domain.trim()}"
                      >
                        <option value disabled >{{tlt('select_domain', 'code')}}</option>
                        <option
                          :value="company_name.value"
                          v-for="company_name in companies"
                          :key="company_name.option"
                        >{{ company_name.option }}</option>
                      </select>
                    </div>

                    <div class="form-group">
                      <input
                        id="hostname"
                        type="text"
                        v-model.trim="user.host_name"
                        :disabled="retail_redirect_with_prefill"
                        class="form-control key"
                        @keyup="check_field_validation('hostname', 'validHost')"
                        :placeholder="tlt('website_url', 'code')"
                        style="border-radius: 29px; padding: 3px 30px 3px 43px; font-size: 15px;"
                        :class="{invalid:is_submitting && !user.host_name.trim()}"
                        />
                    </div>

                    <!-- <div class="form-group">
                      <input
                        type="text"
                        style="display:none; border-radius: 29px;"
                        v-model="user.license_key"
                        disabled
                        class="form-control key"
                        placeholder="License Key"
                      />
                    </div> -->
                    <div class="form-group">
                      <input
                        type="email"
                        v-model.trim="user.email"
                        :disabled="input_disable || retail_redirect_with_prefill || user.login_source == 'SSO'"
                        class="form-control email"
                        :placeholder="tlt('email_label', 'code')"
                        id="input_email"
                        @keyup="check_field_validation('input_email', 'validEmail')"
                        style="border-radius: 29px; padding: 3px 30px 3px 43px; font-size: 15px;"
                        :class="{invalid:is_submitting && !user.email.trim()}"/>
                    </div>
                    <div class="form-group" id="register_phone_number">
                      <vue-phone-number-input
                        v-model="user.phone"
                        :no-use-browser-locale="true"
                        color="#53b9d0"
                        valid-color="#ccc"
                        :border-radius="29"
                        @update="phoneNumber = $event"
                      >
                      </vue-phone-number-input>
                    </div>
                    <div class="form-group" id="referral_code"
                      v-show="is_referral_code"
                    >
                      <input
                        type="text"
                        :disabled="!is_referral_code"
                        class="form-control key"
                        v-model="user.referral_code_portal"
                        :placeholder="tlt('referral_code', 'code')"
                        style="border-radius: 29px; padding: 3px 30px 3px 43px; font-size: 15px;"
                      />
                    </div>
                    <div class="mb-2" style="text-align:end" v-show="!is_referral_code">
                      <a href="javascript:void(0)" @click="is_referral_code = true">{{tlt('referral_code_text','code')}}</a>
                    </div>
                    <!-- <div class="form-group" v-if="user.login_source != 'SSO'">
                      <input
                        type="password"
                        id="form_password"
                        v-model.trim="user.password"
                        class="form-control pass"
                        placeholder="Password"
                        style="border-radius: 29px; padding: 3px 30px 3px 43px; font-size: 15px;"
                        :class="{invalid:is_submitting && !user.password.trim()}"/>
                      <a
                        href="#"
                        @click="password_toggle_1"
                        class="view-pass"
                        style="top: 7px;"
                      >
                        <img
                          src="/img/eye-icn.png"
                          alt
                        />
                      </a>
                    </div> -->
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
                      >A special character</p>
                      <p
                        id="length"
                        class="invalid"
                        style="margin-left: 10%;"
                      >Minimum 8 characters</p>
                    </div> -->
                    <!-- <password-validator
                      :testpassword="user.password"
                      @correctPassword="check_password"
                      style="padding: 0px;"
                    ></password-validator> -->
                    <!-- <div class="form-group" style="margin-top: 15px;" v-if="user.login_source != 'SSO'">
                      <input
                        v-model.trim="confirm_password"
                        type="password"
                        class="form-control pass"
                        placeholder="Confirm password"
                        id="confirm_password"
                        style="border-radius: 29px; padding: 3px 30px 3px 43px; font-size: 15px;"
                        :class="{invalid:is_submitting && !confirm_password.trim()}"
                      />
                      <div
                        class="is-invalid"
                        style="color:red; margin-left: 4px; font-size: 16px; opacity: 0.7; font-weight: 300;"
                        v-if="validConfirmPassword!=true && confirm_password!=''"
                      >{{ validConfirmPassword }}</div>
                      <a
                        href="#"
                        @click="password_toggle_2"
                        class="view-pass"
                        style="top: 7px;"
                      >
                        <img
                          src="/img/eye-icn.png"
                          alt
                        />
                      </a>
                    </div> -->
                    <!-- <br> -->
                    <p v-show="retail_redirect_with_prefill">
                      {{tlt('register_page_user_exist_alert_text', 'code')}} <a href="mailto:hello@cense.ai?subject=Retail Account Duplication&body=Hello! %0D%0A I have already registered on Cense Portal for my retail Company ____________ with Email ID ________________ prior to installation of the app from App Store. %0D%0A Kindly Get Back to me for resolution"> here </a>
                    <!-- <br> -->
                    </p>
                    <!-- <br> -->
                    <vue-recaptcha
                      ref="recaptcha"
                      :sitekey="site_key"
                      @verify="onCaptchaVerified"
                      @expired="captcha_reset"
                     ></vue-recaptcha>
                    <div class="form-group mt-1">
                      <label class="text-muted">* {{tlt('cense_bot_warning_msg', 'code')}}</label>
                    </div>
                    <!-- <div class="btn-wrap" style="margin-top: 40px;"> -->
                    <div class="btn-wrap" style="margin-top: 25px; margin-bottom: 5px;">
                      <button
                        type="submit"
                        class="darkblue-btn"
                        style="padding: 0px;
                              height: 40px;
                              width: 170px;
                              font: normal normal 600 16px/27px Poppins;"
                      >{{tlt('sign_up_btn', 'code')}}</button>

                    </div>
                    <div class="action-btns">
                      <div
                      class="
                        position-relative
                        d-flex
                        align-items-center
                        justify-content-center
                        mt-4
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
                          src="@/portal/assets/img/google-icon.svg"
                          alt="google"
                          class="me-3"
                        />
                        <span class="pl-3">{{tlt('register_page_connect_google_link', 'code')}}</span>
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
    <footer>
      <p style="margin-top: 20px; text-align: center;">
        Ⓒ {{new Date().getFullYear()}} {{tlt('all_rights_reserved_msg', 'code')}}
        <a href="https://cense.ai/privacy-policy">{{tlt('policy_msg','code')}}</a>
              <!-- <img src="@/portal/assets/img/flags/US.png" alt="" class="ml-1 c-p" @click="change_locale_language('en')"> -->
              <!-- <img src="@/portal/assets/img/flags/ES.png" height="17px" width="23px" alt="" class="ml-1 c-p" @click="change_locale_language('es')"> -->
              <!-- <img src="@/portal/assets/img/flags/PT.png" height="17px" width="23px" alt="" class="ml-1 c-p" @click="change_locale_language('pt')"> -->
      </p>
    </footer>
    </div>
      </div>
    </div>
  </div>
</template>
<script>
import swal from "sweetalert2";
import axios from "axios";
import api_calls from "@/portal/api_calls";
import PasswordValidator from "../Pages/PasswordValidator.vue";
import VueRecaptcha from 'vue-recaptcha';
import VuePhoneNumberInput from "vue-phone-number-input";
export default {
  components: {
    PasswordValidator,
    VueRecaptcha,
    VuePhoneNumberInput
  },
  data () {
    return {
      user: {
        full_name: "",
        company_name: "",
        email: "",
        phone: '',
        password: "",
        domain: "",
        services: "",
        host_name: "",
        referral_code_portal: "",
        registration_type: "Customer",
        license_key:
          Math.random()
            .toString(36)
            .substring(2, 15) +
          Math.random()
            .toString(36)
            .substring(2, 15),
        referral_id: "null",
        subscription: null,
        date: "",
        reCaptcha_token: null,
        retail_framework: null,
        shopify_app_installed: false,
        login_source: "PORTAL",
        sso_source: null,
        sso_token: null,
      },
      phoneNumber: null,
      correct_password: false,
      companies: [],
      unique: false,
      input_disable: false,
      spinnerOn: false,
      reg_pwd: /^(?!.*\\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@!%*?&$^()+~|'{}:;.?~_+=<>/-])[A-Za-z\d#@!%*?&$^()+~|'{}:;.?~_+=<>/-]{8,}/,
      // reg_email:/^([\w.]+@(?!google\.com)(?!gmail\.com)(?!yahoo\.com)(?!hotmail\.com)(?!mail\.ru)(?!yandex\.ru)(?!mail\.com)([\w-]+.)+[\w-]{2,4})?$/,
      reg_email: /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/,
      reg_host: /^[-a-zA-Z0-9@:%._\+~#=\/\/]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/,
      subscription_type: /subscription=([a-zA-Z])$/g,
      confirm_password: "",
      myInput: document.getElementById("form_password"),
      letter: document.getElementById("letter"),
      capital: document.getElementById("capital"),
      number: document.getElementById("number"),
      special: document.getElementById("special"),
      array: [],
      site_key: process.env.VUE_APP_CAPTCHA_SITE_KEY,
      retail_redirect_with_prefill: false,
      disable_login: false,
      is_submitting: false,
      is_referral_code: false,
    };
  },
  mounted(){
    this.user.referral_code_portal = this.$route.query.referral_code;
    if (this.user.referral_code_portal !== undefined && this.user.referral_code_portal !== null && this.user.referral_code_portal !== '' ) {
      this.is_referral_code = true; 
    }
  },
  computed: {
    validEmail () {
      if (this.reg_email.test(this.user.email)) {
        return true;
      } else {
        return false;
      }
    },
    valid_cname () {
      if (this.user.company_name != "") {
        return true;
      } else {
        return false;
      }
    },
    validPassword () {
      if (this.reg_pwd.test(this.user.password) ||
        this.user.login_source == "SSO") {
        return true;
      } else {
        return this.tlt('register_password_validation');
      }
    },
    validConfirmPassword () {
      if (this.confirm_password == this.user.password ||
        this.user.login_source == "SSO") {
        return true;
      } else {
        return this.tlt('pwd_do_not_match');
      }
    },
    validHost() {
      if (this.reg_host.test(this.user.host_name) && this.user.host_name != '') {
        return true;
      } else {
        return false;
      }
    },
    validCaptchaToken(){
      // if(this.user.reCaptcha_token !== null){
        return true;
      // } else {
      //   return false;
      // }
    },
    valid_fullname () {
      if (this.user.full_name != "") {
        return true;
      } else {
        return false;
      }
    },
    valid_domain () {
      if (this.user.domain!= "") {
        return true;
      } else {
        return false;
      }
    },
    valid_confirm_pass () {
      if (this.confirm_password!= "" || this.user.login_source === 'SSO') {
        return true;
      } else {
        return false;
      }
    },
    // service_types() {
    //   if (this.chatbot_check && this.voice_system_check) {
    //     (this.user.services = "Chatbot"), "Voice System";
    //   } else if (this.chatbot_check) {
    //     this.user.services = "Chatbot";
    //   } else if (this.voice_system_check) {
    //     this.user.services = "Voice System";
    //   } else {
    //     this.user.services = "";
    //   }
    // }
  },
  created () {
    axios.get(api_calls.domain_url()).then(response => {
      if (response.data.message.MSG_CODE === this.api_status_code.DOMAIN_LIST_SENT.MSG_CODE) {
        this.companies = [];
        for (var i in response.data.data) {
          if (response.data.data[i].value == "Retail" || response.data.data[i].value == "Other"){
            this.companies.push(response.data.data[i]);
          }
        }
      }else if (response.data.message.MSG_CODE === this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
          toastr.error(this.tlt('search_product_internal_server_msg1'));
      }else {
        Swal({
          title: response.data.message.MSG_CODE,
          text: response.data.message.MSG,
          showCancelButton: false,
          showConfirmButton: false,
          type: "error"
        })
      }
  });
    let 
    host_name = this.$route.query.shop_host_name,
    email = this.$route.query.shop_admin_email,
    user_name = this.$route.query.shop_user_name,
    domain = this.$route.query.shop_domain,
    company_name = this.$route.query.shop_company_name;
    // console.log(host_name, email, user_name, domain, company_name);
    if(Boolean(host_name)&& Boolean(user_name) && Boolean(email) && Boolean(domain) && Boolean(company_name)){
      this.user.host_name = host_name;
      this.user.email = email;
      this.user.full_name = user_name;
      // this.user.last_name = user_name.split(" ")[1] || "";
      this.user.company_name = company_name;
      this.user.domain = domain;
      this.retail_redirect_with_prefill = true;
      this.disable_login = true;
      this.user.retail_framework = 'Shopify';
      this.user.shopify_app_installed = true;
    } 
  },
  methods: {
    onCaptchaVerified(token){
      this.user.reCaptcha_token = token;
    },
    captcha_reset(){
      this.user.reCaptcha_token = null;
      this.$refs.recaptcha.reset();
    },
    check_password(correctPassword) {
      this.correct_password = correctPassword;
    },
    password_toggle_1 (event) {
      event.preventDefault();
      var password = document.getElementById("form_password");
      if (password.type == "text") {
        password.type = "password";
      } else if (password.type == "password") {
        password.type = "text";
      }
    },
    password_toggle_2 (event) {
      event.preventDefault();
      var confirm = document.getElementById("confirm_password");
      if (confirm.type == "text") {
        confirm.type = "password";
      } else if (confirm.type == "password") {
        confirm.type = "text";
      }
    },
    toggle_domain (event) {
      if (event.target.value == "Customer") {
        document.getElementById("domain_input").style.display = "";
      } else if (event.target.value == "Partner") {
        document.getElementById("domain_input").style.display = "none";
      }
    },
    create () {
      this.is_submitting = true
      if (
        this.validEmail &&
        this.valid_cname &&
        this.user.registration_type != null &&
        // this.correct_password == true &&
        this.validHost == true && 
        this.validCaptchaToken === true &&
        this.valid_fullname && 
        this.valid_domain && 
        Boolean(this.phoneNumber) &&
          this.phoneNumber.isValid == true
        //  &&
        // this.valid_confirm_pass &&
        // ((this.user.password === this.confirm_password ) || this.user.login_source == 'SSO')
      ) {
        this.call_api();
      }
      else if (!this.valid_fullname) {
        swal({
          type: "warning",
          text: this.tlt('name_is_req_label') ,
          showConfirmButton: false,
          timer: 2000
        });
      }
      // else if (!this.valid_lastname) {
      //   swal({
      //     type: "warning",
      //     html: "<b>Last Name is required</b>",
      //     showConfirmButton: false,
      //     timer: 2000
      //   });
      // } 
      else if (!this.valid_cname) {
        swal({
          type: "warning",
          text: this.tlt('company_name_is_req_label'),
          showConfirmButton: false,
          timer: 2000
        });
      }else if (!this.valid_domain) {
        swal({
          type: "warning",
          text: this.tlt('valid_domain_label'),
          showConfirmButton: false,
          timer: 2000
        });
      }else if (!this.validHost) {
        this.user.host_name = '';
        swal({
          type: "warning",
          text: this.tlt('valid_website_url'),
          showConfirmButton: false,
          timer: 2000
        });
      }else if (!this.validEmail) {
        this.user.email = '';
        swal({
          type: "warning",
          text: this.tlt('valid_company_email_msg'),
          showConfirmButton: false,
          timer: 2000
        });
      }else if (!Boolean(this.phoneNumber)) {
        this.user.phone = '';
        swal({
          type: "warning",
          html: "<b>"+this.tlt('product_config_phone_no_msg')+"</b>",
          showConfirmButton: false,
          timer: 2000
        });
      }
      else if (Boolean(this.phoneNumber) &&
            this.phoneNumber.isValid != true) {
        this.user.phone = '';
        swal({
          type: "warning",
          html: "<b>"+this.tlt('product_config_phone_no_msg')+"</b>",
          showConfirmButton: false,
          timer: 2000
        });
      } else if (this.user.password == "" && this.user.login_source != "SSO") {
        swal({
          type: "warning",
          text: this.tlt('pwd_field_label'),
          showConfirmButton: false,
          timer: 2000
        });
      }else if (!this.correct_password) {
        this.user.password ='';
        swal({
          type: "warning",
          text: this.tlt('incorrect_pwd_pattern_label'),
          showConfirmButton: false,
          timer: 2000
        });
      }else if (this.confirm_password == "" && this.user.login_source != 'SSO') {
        swal({
          type: "warning",
          text: this.tlt('confirm_pwd_field_label'),
          showConfirmButton: false,
          timer: 2000
        });
      }
      else if (this.user.registration_type == null) {
        toastr.error(this.tlt('select_type_registration'));
      } 
      else if(this.validCaptchaToken !== true) {
        swal({
          type: "error",
          text: this.tlt('i_am_not_robot_msg'),
          showConfirmButton: false,
          timer: 2000
        })
      }else if (this.user.password !== this.confirm_password) {
        swal({
          type: "warning",
          title: this.tlt('incorrect_pwd_label'),
          text: this.tlt('pwd_confirm_pwd_label'),
          showConfirmButton: false,
          timer: 2000
        });
      }
    },
    call_api () {
      this.is_submitting = false;
      var link = window.location.search;
      // this.user.subscription = link.replace("?subscription=", "") == '' ? null : link.replace("?subscription=", "");
      this.spinnerOn = true;
      var d = new Date();
      this.user.date = d;
      this.user.phone = 
        (Boolean(this.phoneNumber) &&
        this.phoneNumber.isValid == true)
        ? this.phoneNumber.formattedNumber
        : ''
      axios
        .post(api_calls.register(), this.user)
        .then(response => {
          this.captcha_reset();
          this.spinnerOn = false;
          if (response.data.message.MSG_CODE === this.api_status_code.REGISTRATION_SUCCESSFUL_1012.MSG_CODE) {
            swal({
              text:
                this.tlt('account_created_msg'),
              type: "success",
            })
            .then((result)=>{
              if(result.value === true){
                this.$router.push("/bot/login");
              }
            })
            this.disable_login = false;
            this.retail_redirect_with_prefill = false;
          } else if (response.data.message.MSG_CODE === this.api_status_code.DUPLICATE_COMPANY.MSG_CODE) {
            swal({
              type: "error",
              text:
                this.tlt('company_already_registered'),
              timer:3000,
            });
            return;
          } else if (response.data.message.MSG_CODE === this.api_status_code.SSO_SERVER_ERROR.MSG_CODE) {
            swal({
              type: "error",
              text:
                this.tlt('some_error_please_try_again','code'),
              timer:3000,
              title: this.tlt('register_error_with_sso'),    
            });
            return;
          } else if (response.data.message.MSG_CODE === this.api_status_code.DUPLICATE_EMAIL_1015.MSG_CODE) {
            swal({
              type: "error",
              text:
                this.tlt('email_already_registered'),
              timer:3000,
            });
          } else if (response.data.message.MSG_CODE === this.api_status_code.REGISTRATION_UNSUCCESSFUL_1013.MSG_CODE) {
            swal({
              type: "error",
              text: this.tlt('registration_unsuccess'),
              timer:2500,
            });
            return;
          } else if (response.data.message.MSG_CODE === this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
            swal({
              type: "error",
              text: this.tlt('some_error_please_try_again', 'code'),
              timer:2500,
            });
            return;
          } else if(response.data.message.MSG_CODE === this.api_status_code.CAPTCHA_VERIFICATION_FAILED.MSG_CODE){
            swal({
              type: "error",
              text: this.tlt('i_am_not_robot_msg'),
              timer:2500,
            })
            return;
          } else {
            swal({
              type: "error",
              text: this.tlt('some_error_please_try_again', 'code'),
              showConfirmButton: false,
              timer: 2000
            });
            return;
          }
          setTimeout(() => {
            this.user.email = "";
            this.user.company_name = "";
            this.user.password = "";
            this.user.domain = "";
            this.user.host_name = "";
            this.confirm_password = "";
            this.user.full_name = "";
            // this.user.last_name = "";
            this.user.sso_source = null;
            this.user.sso_token = null;
            this.user.referral_code_portal = '';
            this.user.login_source = "PORTAL";
          }, 100);
        })
        .catch(e => {
          swal({
            type: "error",
            text: this.tlt('some_error_please_try_again','code'),
            showConfirmButton: false,
            timer: 2000
          });
          this.spinnerOn = false;
        });
    },
    check_field_validation(v_model, computed_validation){
      let res = this[computed_validation];
      (res) ? $(`#${v_model}`).removeClass("form-control-error") :  $(`#${v_model}`).addClass("form-control-error");
    },
    async loginWithGoogle() {
      // this.$auth.loginWith("google");
      // this.$auth.loginWith('google', { params: { prompt: "select_account" } })
      this.user.sso_token = null;
      this.user.email = "";
      this.user.company_name = "";
      this.user.password = "";
      this.user.domain = "";
      this.host_name = "";
      this.confirm_password = "";
      this.user.full_name = "";
      this.user.referral_code_portal = "";
      // this.user.last_name = "";
      const googleUser = await this.$gAuth.signIn();
      const google_keys = Object.keys(googleUser);
      let profile = googleUser.getBasicProfile();
      const keys = Object.keys(profile);
      this.user.full_name = profile[keys[2]] + profile[keys[3]];
      // this.user.last_name = profile[keys[3]];
      this.user.email = profile[keys[5]];
      this.user.sso_token =
        googleUser[google_keys[1]].id_token !== undefined
          ? googleUser[google_keys[1]].id_token
          : googleUser[google_keys[2]].id_token;
      this.user.login_source = "SSO";
      this.user.sso_source = "google";

      // console.log(user_email);
    },
    reset_data() {
      this.user.full_name = "";
    },
  },
  beforeMount () {
    var referral_id = this.$route.query.company_id
    var invitee = this.$route.query.invitee
    var token = this.$route.query.token
    if (referral_id && invitee && token) {
      invitee = invitee.replace(/%40/, "@");
      this.user.referral_id = referral_id;
      this.user.registration_type = "Customer";
      this.user.email = invitee;
      this.input_disable = true;
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
    width: 200px;
    padding: 0px;
    height: 40px;
    width: 40%;
    font: 600 16px / 27px Poppins;
}
.form-group {
  height: 35px;
  margin-bottom: 0px 0px 10px;
}
.darkblue-btn {
  font: normal normal 600 18px/27px Poppins;
  border-radius: 30px;
  width: 50%;
  height: 45px;
  margin-left: 72px;
}
.white-btn {
  font: normal normal 600 18px/27px Poppins;
  color: #0E2A64;
  width: 10%;
}

.log-sec h2{
  font: normal normal 600 28px/53px Poppins;
  color: #0E2A64;
  opacity: 1;
}
.log-sec p{
  opacity: 1;
}

#message {
  display: none;
  background: #fff;
  color: #000;
  position: relative;
  padding: 20px;
  margin-top: 10px;
}

.valid {
  color: green;
}

.valid:before {
  position: relative;
  left: -35px;
  content: "✔";
}

/* Add a red text color and an "x" when the requirements are wrong */
/* .invalid {
  color: red;
} */

.invalid:before {
  position: relative;
  left: -35px;
  content: "✖";
}
.is-invalid {
  color: red;
}
.is-invalid:before {
  position: relative;
  content: "✖";
  margin-right: 32px;
  left : 11px;
}
.form-control:disabled {
  background-color: #e9ecef !important;
}
.invalid{
  border-color: red;
}
.form-control-error {
  border-color: red;

}
input:invalid {
  border-color: red;
}
.google-btn{
  font: 600 16px / 27px Poppins;
  /* color: #fff !important;
  background: #273679 !important;
  border: solid 1px #273679; */
}
</style>
