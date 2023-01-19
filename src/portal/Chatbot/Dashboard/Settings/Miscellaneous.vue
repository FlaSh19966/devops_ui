<template>
  <div class="dash-cont">
    <div class="spinner" id="spinner" v-show="big_spinner"></div>
    <div class="container-fluid">
      <div class="card dash-card">
        <div
          class="
            card-header
            d-block d-sm-flex
            flex-wrap
            justify-content-between
          "
        ></div>
        <div class="card-body" style="margin-top: -2%">
          <ul class="nav nav-tabs mb-3" id="myTab" role="tablist" :style="top_navbar_disable()">
            <li class="nav-item">
              <a
                class="nav-link pl-4 pr-4 active"
                id="others-tab"
                data-toggle="tab"
                href="#others"
                role="tab"
                aria-controls="others"
                aria-selected="true"
                @click="view_component_name = 'others'"
                >{{tlt('general_tab_name')}}</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link pl-4 pr-4"
                id="integrations-tab"
                data-toggle="tab"
                href="#integrations"
                role="tab"
                aria-controls="integrations"
                aria-selected="false"
                @click="view_component_name = 'integrations'"
                >{{tlt('integration_tab_name')}}</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link pl-4 pr-4"
                id="models-tab"
                data-toggle="tab"
                href="#models"
                role="tab"
                aria-controls="models"
                aria-selected="false"
                @click="view_component_name = 'models'"
                >{{tlt('models_tab_name')}}</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link pl-4 pr-4"
                id="accounts-tab"
                data-toggle="tab"
                href="#accounts"
                role="tab"
                aria-controls="accounts"
                aria-selected="false"
                @click="view_component_name = 'accounts'"
                >{{tlt('accounts_tab_name')}}</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link pl-4 pr-4"
                id="suggestions-tab"
                data-toggle="tab"
                href="#suggestions"
                role="tab"
                aria-controls="suggestions"
                aria-selected="false"
                @click="view_component_name = 'suggestions'"
                >{{tlt('suggestions_tab_name')}}</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link pl-4 pr-4"
                id="social-media"
                data-toggle="tab"
                href="#socialmedia"
                role="tab"
                aria-controls="socialmedia"
                aria-selected="false"
                @click="view_component_name = 'socialmedia'"
                >{{tlt('social_media_tab_name')}}</a
              >
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div
              class="tab-pane fade"
              id="accounts"
              role="tabpanel"
              aria-labelledby="accounts-tab"
            >
              <template v-if="view_component_name === 'accounts'">
                <billing />
              </template>
            </div>
            <div
              class="tab-pane fade"
              id="suggestions"
              role="tabpanel"
              aria-labelledby="suggestions-tab"
            >
              <template v-if="view_component_name === 'suggestions'">
                <feedback />
              </template>
            </div>
            <div
              class="tab-pane fade"
              id="integrations"
              role="tabpanel"
              aria-labelledby="integrations-tab"
            >
              <template v-if="view_component_name === 'integrations'">
                <integration-layout />
              </template>
            </div>
            <div
              class="tab-pane fade"
              id="socialmedia"
              role="tabpanel"
              aria-labelledby="social-media"
            >
              <template v-if="view_component_name === 'socialmedia'">
                <social-media-links />
              </template>
            </div>
            <div
              class="tab-pane fade active show"
              id="others"
              role="tabpanel"
              aria-labelledby="others-tab"
            >
              <template v-if="view_component_name === 'others'">
                <general-tab />
              </template>
            </div>

            <div
              class="tab-pane fade"
              id="models"
              role="tabpanel"
              aria-labelledby="models-tab"
            >
              <template v-if="view_component_name === 'models'">
                <models-tab />
              </template>
              
            </div>
            <div class="row">
              <div class="col-md-7"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import JsonExcel from "vue-json-excel";
import axios from "axios";
import Swal from "sweetalert2";
import { setTimeout } from "timers";
import api_calls from "@/portal/api_calls";
import Multiselect from "vue-multiselect";
import VoerroTagsInput from "@voerro/vue-tagsinput";
import "@voerro/vue-tagsinput/dist/style.css";
import moment from "moment";
import Billing from "../Account/Billing.vue";
import swal from "sweetalert2";
import Feedback from "./Feedback.vue";
import ModelsTab from "./ModelsTab.vue";
import GeneralTab from "./GeneralTab.vue";
import IntegrationLayout from "../Integrations/IntegrationLayout.vue";
import { freeze_portal,show_subscription_expired_swal } from "@/portal/mixins";
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import SocialMediaLinks from "../Integrations/SocialMediaLinks.vue";
import { bus } from "@/portal/main";

Vue.component("downloadExcel", JsonExcel);
export default {
  name: "MiscellaneousPage",
  mixins: [freeze_portal, show_subscription_expired_swal],
  components: {
    Multiselect,
    "tags-input": VoerroTagsInput,
    Billing,
    Feedback,
    IntegrationLayout,
    VuePhoneNumberInput,
    SocialMediaLinks,
    GeneralTab,
    ModelsTab
  },
  data() {
    return {
      view_component_name: "others",
      // start_greetings: "",
      // end_greetings: "",
      title: "",
      image_file: null,
      file_label: "Choose file",
      sender: null,
      subject: null,
      email_body: null,
      companyid: null,
      companyname: null,
      multiple_language_list: [],
      phoneNumber: null,
      contact_us_phone_number: null,
      contact_us_email: "",
      email_validity:
        /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/,
      is_retail: false,
      old_image_name: null,
      spinnerOn1: false,
      spinnerOn2: false,
      big_spinner: false,
      trained_dialogue_models: null,
      trained_intent_models: null,
      current_license_key: this.$session.get("UserInformation").license_key,
      trained_ner_models: null,
      disable_btn_expired:false,
      retail_web_framework : this.$session.get("retail_web_framework"),
      email_details : null,
      email_disable : false,
      verification_status: null,
      reset_icon_path: require("@/portal/assets/img/reset_icon.svg"),
      disable_sidebar: false,
    };
  },
  created() {
    if (this.$session.get("UserInformation").role == "SuperAdmin") {
      this.companyid = this.$session.get("CompanyId");
      this.companyname = this.$session.get("CompanyName");
    } else {
      this.companyid = this.$session.get("UserInformation").company_id;
      this.companyname = this.$session.get("UserInformation").company_name;
    }
    // axios
    //   .post(
    //     api_calls.twilio_greetings(),
    //     {
    //       company_name: this.companyname,
    //       company_id: this.companyid,
    //       email: this.$session.get("UserInformation").email,
    //       license_key: this.$session.get("UserInformation").license_key,
    //       token: this.$session.get("UserInformation").tokens,
    //       isShow: true
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${this.$session.get("at")}`
    //       }
    //     }
    //   )
    //   .then(response => {
    //     this.start_greetings = response.data.greeting;
    //     this.end_greetings = response.data.busy;
    //   })
    //   .catch(e => {
    //     if (
    //       e.response.status === 410 ||
    //       e.response.status === 440 ||
    //       e.response.status === 409
    //     ) {
    //       this.$root.$emit("Session_Expired", e.response.data);
    //     }
    //   });
  },
  mounted() {
    this.$session.set("CurrentActiveTabForHelp", this.view_component_name)
    if (this.$session.get("SettingTopnavbarDisable") == true) {
      this.disable_sidebar = true;
    }else{
      this.disable_sidebar = false;
    }
    //console.log(this.view_component_name,"comp name");
      bus.$on("CurrentActiveTab", (data) => {
        if(data === this.$route.fullPath) {
          //console.log("Hello",this.$route);
          return this.view_component_name;
          // bus.$emit("CurrrentActiveTabResponse", this.view_component_name)
        }
      });
    // if(this.is_retail != true){
    //   this.load_product_settings();
    // }
    let bot_templates_data = this.$session.get("BotTemplates");
    if (bot_templates_data != undefined){
      for (let i = 0; i < bot_templates_data.length; i++) {
        if (
          bot_templates_data[i].domain === "Retail" &&
          bot_templates_data[i].subscribed === true
        ) {
          this.is_retail = true;
        }
      }
    }
    setTimeout(() => {
      this.freeze_portal();
    }, 1000);
    this.$root.$on("MiscellaneousPageDisabled", (data) => {
      if(data===true){
        this.disable_btn_expired = true;
      }
    });
    this.$root.$on("accountPage", (data) => {
      if(data===true){
         $("#accounts-tab").click();
        this.view_component_name = "accounts";
      }
    });
    // this.initialize_tooltips();
    var vm = this;
    // this.get_trained_dialogue_models();
    // this.get_trained_intent_models();
    // this.get_trained_ner_models();
    // this.get_company_logo();
  
    if (this.$route.params.Subscription === true) {
      $("#accounts-tab").click();
      this.view_component_name = "accounts";
      this.$root.$emit("change_sidebar_main_menu", "Settings");
    }
    this.retail_web_framework = this.$session.get("retail_web_framework");
    if (this.$route.query.Subscription == "true") {
      $("#accounts-tab").click();
      this.view_component_name = "accounts";
    }
  },
  computed: {
  //   validEmail() {
  //     if (this.contact_us_email != null) {
  //       if (this.email_validity.test(this.contact_us_email)) {
  //         return true;
  //       } else {
  //         return this.tlt('other_enter_valid_email_msg');
  //       }
  //     }
  // }
},
  watch: {
    view_component_name(newVal) {
        this.$session.set("CurrentActiveTabForHelp", newVal)
      },
    bot_background_type(newVal, oldVal) {
      if (newVal === "none") {
        this.file_label_3 = "Choose File";
        this.image_file_3 = null;
        this.is_bg_image_changed = true;
        // this.old_image_name_3 = null;
        document.getElementById("inputGroupFile03").value = "";
      }
    },
    // email_details() {
    //   if (this.email_details == null || this.email_details == "") {
    //     this.email_disable = false;
    //   }
    // }
  },
  methods: {
    generateUUID() {
      // Public Domain/MIT
      var d = new Date().getTime(); //Timestamp
      var d2 =
        (performance && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = Math.random() * 16; //random number between 0 and 16
          if (d > 0) {
            //Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
          } else {
            //Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
          }
          return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      );
    },
    // trim_model_name(val1) {
    //   if (val1.length > 6) {
    //     let str1 = val1.substring(0, 3) + "...";
    //     return str1;
    //   }
    //   return val1;
    // },
    // load_product_settings() {
    //   this.big_spinner = true;
    //   axios
    //     .post(
    //       api_calls.product_settings(),
    //       {
    //         company_name: this.companyname,
    //         company_id: this.companyid,
    //         email: this.$session.get("UserInformation").email,
    //         license_key: this.$session.get("UserInformation").license_key,
    //         token: this.$session.get("UserInformation").tokens,
    //         is_get: true,
    //       },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${this.$session.get("at")}`,
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       if (response.data.message.MSG_CODE === this.api_status_code.DATA_AVAILABLE.MSG_CODE){
    //         this.big_spinner = false; 
    //         var webframework = this.retail_web_framework;
    //         if (webframework === null || webframework === undefined ){
    //           webframework = undefined;
    //         }
    //         if (
    //           response.data.message.MSG_CODE != this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE &&
    //           response.data.message.MSG_CODE != this.api_status_code.EMPTY_DATA.MSG_CODE
    //         ) {
    //           this.contact_us_email = webframework === undefined ? response.data.data.details.contact_help_email : response.data.data[webframework + '_details'].contact_help_email;
    //           this.contact_us_phone_number = webframework === undefined  ? response.data.data.details.contact_us_phone_number: response.data.data[webframework + '_details'].contact_us_phone_number;
    //           this.email_details = webframework === undefined ? response.data.data.details.sender_email : response.data.data[webframework + '_details'].sender_email;
    //           this.email_verification_status();
    //         }
    //       }else {
    //         Swal({
    //           title: response.data.message.MSG_CODE,
    //           text: response.data.message.MSG,
    //           showCancelButton: false,
    //           showConfirmButton: false,
    //           timer: 2500,
    //           type: "error"
    //         })
    //       }
    //     })
    //     .catch((e) => {
    //       this.big_spinner = false;
    //       toastr.error(this.tlt('other_error_occur_msg'));
    //       if (
    //         e.response.status === 410 ||
    //         e.response.status === 440 ||
    //         e.response.status === 409
    //       ) {
    //         this.$root.$emit("Session_Expired", e.response.data);
    //       }
    //     });
    // },
    // get_company_logo() {
    //   axios
    //     .post(
    //       api_calls.upload_company_logo(),
    //       {
    //         company_name: this.companyname,
    //         company_id: this.companyid,
    //         email: this.$session.get("UserInformation").email,
    //         license_key: this.$session.get("UserInformation").license_key,
    //         token: this.$session.get("UserInformation").tokens,
    //         is_get: true,
    //       },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${this.$session.get("at")}`,
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       if(response.data.message.MSG_CODE === this.api_status_code.COMPANY_IMAGE_URL_RECEIVED.MSG_CODE){
    //         this.file_label = response.data.data.company_image_url
    //           .split("/")
    //           .reverse()[0];
    //         this.file_label = decodeURI(this.file_label);
    //         this.old_image_name = this.file_label;
    //         if (this.file_label == "") {
    //           this.file_label = "Choose file";
    //         }
    //       }else if (response.data.message.MSG_CODE === this.api_status_code.DATA_NOT_FOUND.MSG_CODE){

    //       }else {
    //         Swal({
    //           title: response.data.message.MSG_CODE,
    //           text: response.data.message.MSG,
    //           showCancelButton: false,
    //           showConfirmButton: false,
    //           timer: 2500,
    //           type: "error"
    //         })
    //       }
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //       this.file_label = "Choose file";
    //       document.getElementById("input_company_file").value = "";
    //       if (
    //         e.response.status === 410 ||
    //         e.response.status === 440 ||
    //         e.response.status === 409
    //       ) {
    //         this.$root.$emit("Session_Expired", e.response.data);
    //       }
    //     });
    // },
    // upload_company_logo_file() {
    //   if (
    //     this.file_label == this.old_image_name ||
    //     document.getElementById("input_company_file").value == ""
    //   ) {
    //     swal({
    //       text: this.tlt('other_select_file_msg'),
    //       type: "error",
    //       timer: 2500,
    //     });
    //   } else {
    //     this.big_spinner = true;
    //     axios
    //       .post(
    //         api_calls.upload_company_logo(),
    //         {
    //           company_id: this.$session.get("UserInformation").company_id,
    //           company_name: this.$session.get("UserInformation").company_name,
    //           email: this.$session.get("UserInformation").email,
    //           license_key: this.$session.get("UserInformation").license_key,
    //           token: this.$session.get("UserInformation").tokens,
    //           image_name: this.file_label,
    //           company_logo_file: this.image_file,
    //           is_image_edit:
    //             this.file_label != this.old_image_name ? true : false,
    //           old_image_name:
    //             this.old_image_name == "Choose File"
    //               ? null
    //               : this.old_image_name,
    //         },
    //         {
    //           headers: {
    //             Authorization: `Bearer ${this.$session.get("at")}`,
    //           },
    //         }
    //       )
    //       .then((response) => {
    //         this.big_spinner = false;
    //         this.get_company_logo();
    //         if (response.data.message.MSG_CODE === this.api_status_code.IMG_DUPLICATE.MSG_CODE) {
    //           document.getElementById("input_company_file").value = "";
    //           // toastr.error(
    //           //   "Image already found. Please upload another image or rename it."
    //           // );
    //           swal({
    //             text: this.tlt('other_img_already_found_msg'),
    //             type: "error",
    //             timer: 3000,
    //           });
    //         } else if (
    //           response.data.message.MSG_CODE === this.api_status_code.COMPANY_LOGO_UPDATED.MSG_CODE
    //         ) {
    //           swal({
    //             text: this.tlt('other_logo_upload_successful_msg'),
    //             type: "success",
    //             timer: 2500,
    //           });
    //         } else {
    //           document.getElementById("input_company_file").value = "";
    //           swal({
    //             title: response.data.message.MSG_CODE,
    //             text: response.data.message.MSG,
    //             showCancelButton: false,
    //             showConfirmButton: false,
    //             timer: 2500,
    //             type: "error"
    //           });
    //         }
    //       })
    //       .catch((e) => {
    //         swal({
    //           text: this.tlt('other_error_occur_msg3'),
    //           type: "error",
    //           timer: 2500,
    //         });
    //         this.get_company_logo();
    //         this.big_spinner = false;
    //         if (
    //           e.response.status === 410 ||
    //           e.response.status === 440 ||
    //           e.response.status === 409
    //         ) {
    //           this.$root.$emit("Session_Expired", e.response.data);
    //         }
    //       });
    //   }
    // },
    // configure_product_settings() {
    //   event.preventDefault();
    //   if (this.validEmail != true && !Boolean(this.phoneNumber) ) {
    //     swal({
    //       text: this.tlt('other_valid_email_or_number_msg'),
    //       type: "warning",
    //       timer: 3000,
    //     });
    //     return;
    //   }
    //   // if (!Boolean(this.phoneNumber)) {
    //   //   swal({
    //   //     text: "Please enter a valid Phone Number",
    //   //     type: "warning",
    //   //     timer: 3000,
    //   //   });
    //   //   return;
    //   // else if (this.phoneNumber.isValid != true) {
    //   //   swal({
    //   //     text: "Please enter a valid Phone Number",
    //   //     type: "warning",
    //   //     timer: 3000,
    //   //   });
    //   //   return;
    //   // }
    //   this.big_spinner = true;
    //   axios
    //     .post(
    //       api_calls.product_settings(),
    //       {
    //         company_name: this.companyname,
    //         company_id: this.companyid,
    //         email: this.$session.get("UserInformation").email,
    //         license_key: this.$session.get("UserInformation").license_key,
    //         token: this.$session.get("UserInformation").tokens,
    //         is_email_required: true,
    //         email_required: {
    //           contact_help_email: this.contact_us_email,
    //           contact_us_phone_number: (Boolean(this.phoneNumber) && this.phoneNumber.isValid == true) ? this.phoneNumber.formattedNumber : null,
    //         },
    //       },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${this.$session.get("at")}`,
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       this.big_spinner = false;
    //       if (response.data.message.MSG_CODE === this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE) {
    //         swal({
    //           text: this.tlt('other_changes_saved_msg'),
    //           type: "success",
    //           timer: 4000,
    //         });
    //         this.empty_variable();
    //         this.load_product_settings();
    //       } else {
    //         swal({
    //           title: response.data.message.MSG_CODE,
    //           text: response.data.message.MSG,
    //           showCancelButton: false,
    //           showConfirmButton: false,
    //           timer: 2500,
    //           type: "error"
    //         });
    //       }
    //     })
    //     .catch((e) => {
    //       this.big_spinner = false;
    //       toastr.error(this.tlt('other_error_occur_msg4'));
    //       if (
    //         e.response.status === 410 ||
    //         e.response.status === 440 ||
    //         e.response.status === 409
    //       ) {
    //         this.$root.$emit("Session_Expired", e.response.data);
    //       }
    //     });
    // },
    button_class(index) {
      if (this.multiple_language_list.length != 0) {
        if (this.multiple_language_list[index].Enabled == true) {
          return "button_enabled";
        } else if (this.multiple_language_list[index].Enabled == false) {
          return "button_disabled";
        }
      } else {
        return "button_disabled";
      }
    },
    multiple_language_style() {},
    multiple_language_api(language, index) {
      let button_class;
      if (language != "all") {
        button_class = document.getElementById(language + "_button").classList;
        if (button_class.contains("button_disabled")) {
          button_class.remove("button_disabled");
          button_class.add("button_enabled");
          this.multiple_language_list[index].Enabled = true;
          this.language_support_api();
        } else if (button_class.contains("button_enabled")) {
          button_class.remove("button_enabled");
          button_class.add("button_disabled");
          this.multiple_language_list[index].Enabled = false;
          this.language_support_api();
        }
      } else if (language == "all") {
        if (event.target.checked) {
          document
            .getElementById("english_button")
            .classList.add("button_enabled");
          document
            .getElementById("english_button")
            .classList.remove("button_disabled");
          document
            .getElementById("hindi_button")
            .classList.add("button_enabled");
          document
            .getElementById("hindi_button")
            .classList.remove("button_disabled");
          if (
            this.multiple_language_list[0].Enabled &&
            this.multiple_language_list[1].Enabled
          ) {
          } else {
            for (var i in this.multiple_language_list) {
              this.multiple_language_list[i].Enabled = true;
            }
            this.language_support_api();
          }
        } else if (!event.target.checked) {
          document
            .getElementById("english_button")
            .classList.remove("button_enabled");
          document
            .getElementById("english_button")
            .classList.add("button_disabled");
          document
            .getElementById("hindi_button")
            .classList.remove("button_enabled");
          document
            .getElementById("hindi_button")
            .classList.add("button_disabled");
          if (
            !this.multiple_language_list[0].Enabled &&
            !this.multiple_language_list[1].Enabled
          ) {
          } else {
            for (var i in this.multiple_language_list) {
              this.multiple_language_list[i].Enabled = false;
            }
            this.language_support_api();
          }
        }
      }
    },
    // select_trained_dialogue_model(index) {
    //   if(!this.disable_btn_expired){
    //     let call_api = true;
    //     for (let i = 0; i < this.trained_dialogue_models.length; i++) {
    //       if (this.trained_dialogue_models[index].active) {
    //         call_api = false;
    //         break;
    //       }
    //     }
    //     if (call_api) {
    //       Swal.fire({
    //         title: this.tlt('trained_dialog_swal_alert_msg'),
    //         text:
    //           this.tlt('trained_dialog_swal_set_msg') +
    //           this.tlt('trained_dialog_swal_companyname_msg') +
    //           " V" +
    //           (this.tlt('trained_dialog_model_swal_msg').length - index) +
    //           this.tlt('trained_dialog_current_model_msg'),
    //         type: "question",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: this.tlt('trained_dialog_swal_confirm_msg'),
    //         allowOutsideClick: false,
    //         allowEscapeKey: false,
    //       }).then((result) => {
    //         if (result.value) {
    //           this.$root.$emit("DashboardSidebarDisable",true);
    //           this.$session.set("SettingTopnavbarDisable",true);
    //           this.disable_sidebar = true;
    //           this.big_spinner = true;
    //           // Swal.fire({
    //           //   text: "Please wait while we submit your request",
    //           //   toast: true,
    //           //   type: "info",
    //           //   showCancelButton: false,
    //           //   showConfirmButton: false,
    //           // });
    //           axios
    //             .post(
    //               api_calls.revert_models(),
    //               {
    //                 email: this.$session.get("UserInformation").email,
    //                 license_key: this.$session.get("UserInformation").license_key,
    //                 token: this.$session.get("UserInformation").tokens,
    //                 subscription:
    //                   this.$session.get("UserInformation").subscription,
    //                 company_details: {
    //                   company_id: this.$session.get("UserInformation").company_id,
    //                   company_name:
    //                     this.$session.get("UserInformation").company_name,
    //                 },
    //                 model_file: this.trained_dialogue_models[index].FileName,
    //               },
    //               {
    //                 headers: {
    //                   Authorization: `Bearer ${this.$session.get("at")}`,
    //                 },
    //               }
    //             )
    //             .then((response) => {
    //               this.big_spinner = false;
    //               this.disable_sidebar = false;
    //               this.$root.$emit("DashboardSidebarDisable",false);
    //               this.$session.set("SettingTopnavbarDisable",false);
    //               if (response.data.message.MSG_CODE === this.api_status_code.UPDATED_CORE.MSG_CODE) {
    //                 Swal.fire({
    //                   title: this.tlt('trained_dialog_model_updated_msg'),
    //                   type: "success",
    //                   allowOutsideClick: false,
    //                   allowEscapeKey: false,
    //                   timer: 2000,
    //                 })
    //                 this.get_trained_dialogue_models();
    //               } else {
    //                 Swal.fire({
    //                   title: response.data.message.MSG_CODE,
    //                   text: response.data.message.MSG,
    //                   showCancelButton: false,
    //                   showConfirmButton: false,
    //                   timer: 2500,
    //                   type: "error"
    //                 });
    //               }
    //               // console.log(response);
    //             })
    //             .catch((e) => {
    //               this.big_spinner = false;
    //               this.disable_sidebar = false;
    //               this.$root.$emit("DashboardSidebarDisable",false);
    //               this.$session.set("SettingTopnavbarDisable",false);
    //               if (
    //                 e.response.status === 410 ||
    //                 e.response.status === 440 ||
    //                 e.response.status === 409
    //               ) {
    //                 this.$root.$emit("Session_Expired", e.response.data);
    //               }
    //             });
    //         }
    //       });
    //     }
    //   }else{
    //     this.show_subscription_expired_swal(true);
    //   }
    // },  
    // select_trained_intent_model(index) {
    //   if(!this.disable_btn_expired){
    //     let call_api = true;
    //     for (let i = 0; i < this.trained_intent_models.length; i++) {
    //       if (this.trained_intent_models[index].active) {
    //         call_api = false;
    //         break;
    //       }
    //     }
    //     if (call_api) {
    //       Swal.fire({
    //         title: this.tlt('trained_intent_swal_alert_msg'),
    //         text:
    //           this.tlt('trained_intent_swal_set_msg') +
    //           this.tlt('trained_intent_swal_companyname_msg') +
    //           " V" +
    //           (this.tlt('trained_intent_model_swal_msg').length - index) +
    //           this.tlt('trained_intent_current_model_msg'),
    //         type: "question",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: this.tlt('trained_intent_swal_confirm_msg'),
    //         allowOutsideClick: false,
    //         allowEscapeKey: false,
    //       }).then((result) => {
    //         if (result.value) {
    //           this.disable_sidebar = true;
    //           this.$root.$emit("DashboardSidebarDisable",true);
    //           this.$session.set("SettingTopnavbarDisable",true);
    //           this.big_spinner = true;
    //           // Swal.fire({
    //           //   text: "Please wait while we submit your request",
    //           //   toast: true,
    //           //   type: "info",
    //           //   showCancelButton: false,
    //           //   showConfirmButton: false,
    //           // });
    //           axios
    //             .post(
    //               api_calls.train_intent_model(),
    //               {
    //                 company_name: this.companyname,
    //                 company_id: this.companyid,
    //                 email: this.$session.get("UserInformation").email,
    //                 license_key: this.$session.get("UserInformation").license_key,
    //                 token: this.$session.get("UserInformation").tokens,
    //                 FileName: this.trained_intent_models[index].FileName,
    //                 isChangeModelVersion: true,
    //               },
    //               {
    //                 headers: {
    //                   Authorization: `Bearer ${this.$session.get("at")}`,
    //                 },
    //               }
    //             )
    //             .then((response) => {
    //               this.big_spinner = false;
    //               this.disable_sidebar = false;
    //               this.$root.$emit("DashboardSidebarDisable",false);
    //               this.$session.set("SettingTopnavbarDisable",false);
    //               if (response.data.message.MSG_CODE === this.api_status_code.MODEL_UPDATED_MODELS.MSG_CODE) {
    //                 this.get_trained_intent_models();
    //                 Swal.fire({
    //                   title: this.tlt('trained_intent_model_updated_msg'),
    //                   type: "success",
    //                   allowOutsideClick: false,
    //                   allowEscapeKey: false,
    //                   timer: 2000,
    //                 });
    //               } else {
    //                 Swal.fire({
    //                   title: response.data.message.MSG_CODE,
    //                   text: response.data.message.MSG,
    //                   showCancelButton: false,
    //                   showConfirmButton: false,
    //                   type: "error"
    //                 });
    //               }
    //               // console.log(response);
    //             })
    //             .catch((e) => {
    //               console.log(e)
    //               this.big_spinner = false;
    //               this.disable_sidebar = false;
    //               this.$root.$emit("DashboardSidebarDisable",false);
    //               this.$session.set("SettingTopnavbarDisable",false);
    //               if (
    //                 e.response.status === 410 ||
    //                 e.response.status === 440 ||
    //                 e.response.status === 409
    //               ) {
    //                 this.$root.$emit("Session_Expired", e.response.data);
    //               }
    //             });
    //         }
    //       });
    //     }
    //   }else{
    //     this.show_subscription_expired_swal(true);
    //   }
    // },
    // select_trained_ner_model(index) {
    //   if(!this.disable_btn_expired){
    //     let call_api = true;
    //     for (let i = 0; i < this.trained_ner_models.length; i++) {
    //       if (this.trained_ner_models[index].active) {
    //         call_api = false;
    //         break;
    //       }
    //     }
    //     if (call_api) {
    //       Swal.fire({
    //         title: this.tlt('trained_ner_swal_alert_msg'),
    //         text:
    //           this.tlt('trained_ner_swal_set_msg') +
    //           this.tlt('trained_ner_swal_companyname_msg') +
    //           " V" +
    //           (this.tlt('trained_ner_model_swal_msg').length - index) +
    //           this.tlt('trained_ner_current_model_msg'),
    //         type: "question",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: this.tlt('trained_ner_swal_confirm_msg'),
    //         allowOutsideClick: false,
    //         allowEscapeKey: false,
    //       }).then((result) => {
    //         if (result.value) {
    //           this.$root.$emit("DashboardSidebarDisable",true);
    //           this.$session.set("SettingTopnavbarDisable",true);
    //           this.disable_sidebar = true;
    //           this.big_spinner = true;
    //           // Swal.fire({
    //           //   text: "Please wait while we submit your request",
    //           //   toast: true,
    //           //   type: "info",
    //           //   showCancelButton: false,
    //           //   showConfirmButton: false,
    //           // });
    //           axios
    //             .post(
    //               api_calls.revert_ner_models(),
    //               {
    //                 company_name: this.companyname,
    //                 company_id: this.companyid,
    //                 email: this.$session.get("UserInformation").email,
    //                 license_key: this.$session.get("UserInformation").license_key,
    //                 token: this.$session.get("UserInformation").tokens,
    //                 company_details: {
    //                   company_id: this.companyid,
    //                   company_name: this.companyname,
    //                 },
    //                 model_file: this.trained_ner_models[index].FileName,
    //               },
    //               {
    //                 headers: {
    //                   Authorization: `Bearer ${this.$session.get("at")}`,
    //                 },
    //               }
    //             )
    //             .then((response) => {
    //               this.disable_sidebar = false;
    //               this.$root.$emit("DashboardSidebarDisable",true);
    //               this.$session.set("SettingTopnavbarDisable",true);
    //               this.big_spinner = false;
    //               if (response.data.message.MSG_CODE === this.api_status_code.REVERT_SUCCESSFUL_MODELS.MSG_CODE) {
    //                 Swal.fire({
    //                   title: this.tlt('trained_ner_model_updated_msg'),
    //                   type: "success",
    //                   allowOutsideClick: false,
    //                   allowEscapeKey: false,
    //                   timer: 2000,
    //                 }).then((result_success) => {
    //                   // if (result_success.value) {
    //                   this.big_spinner = true;
    //                   this.get_trained_ner_models();
    //                   // }
    //                 });
    //               } else {
    //                 Swal.fire({
    //                   title: response.data.message.MSG_CODE,
    //                   text: response.data.message.MSG,
    //                   showCancelButton: false,
    //                   showConfirmButton: false,
    //                   type: "error",
    //                   timer: 2500
    //                 });
    //               }
    //               // console.log(response);
    //             })
    //             .catch((e) => {
    //               this.big_spinner = false;
    //               this.disable_sidebar = false;
    //               this.$root.$emit("DashboardSidebarDisable",true);
    //               this.$session.set("SettingTopnavbarDisable",true);
    //               if (
    //                 e.response.status === 410 ||
    //                 e.response.status === 440 ||
    //                 e.response.status === 409
    //               ) {
    //                 this.$root.$emit("Session_Expired", e.response.data);
    //               }
    //             });
    //         }
    //       });
    //     }
    //   }else{
    //     this.show_subscription_expired_swal(true);
    //   }
    // },
    // get_trained_dialogue_models() {
    //   this.big_spinner = true;
    //   axios
    //     .post(
    //       api_calls.use_model(),
    //       {
    //         email: this.$session.get("UserInformation").email,
    //         token: this.$session.get("UserInformation").tokens,
    //         company_name: this.$session.get("UserInformation").company_name,
    //         company_id: this.$session.get("UserInformation").company_id,
    //         license_key: this.$session.get("UserInformation").license_key,
    //         isShow: true,
    //       },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${this.$session.get("at")}`,
    //         },
    //       }
    //     )
    //     .then(({ data }) => {
    //       this.big_spinner = false;
    //       if (data.message.MSG_CODE === this.api_status_code.SUCCESSFUL_DB_QUERY_CORE.MSG_CODE) {
    //         this.trained_dialogue_models = data.data.models.map((model) => {
    //           model.created_at = moment
    //             .unix(model.created_at)
    //             .format("Do MMM YY");
    //           return model;
    //         });      
    //       }else {
    //         Swal({
    //           title:data.message.MSG_CODE,
    //           text:data.message.MSG,
    //           showCancelButton: false,
    //           showConfirmButton: false,
    //           timer: 2500,
    //           type: "error"
    //         })
    //       }

    //     })
    //     .catch((e) => {
    //       console.log(e);
    //       this.big_spinner = false;
    //       if (
    //         e.response.status === 410 ||
    //         e.response.status === 440 ||
    //         e.response.status === 409
    //       ) {
    //         this.$root.$emit("Session_Expired", e.response.data);
    //       }
    //     });
    // },
    // get_trained_ner_models() {
    //   this.big_spinner = true;
    //   axios
    //     .get(
    //       api_calls.revert_ner_models(),
    //       {
    //         params: {
    //           email: this.$session.get("UserInformation").email,
    //           token: this.$session.get("UserInformation").tokens,
    //           company_name: this.$session.get("UserInformation").company_name,
    //           company_id: this.$session.get("UserInformation").company_id,
    //           license_key: this.$session.get("UserInformation").license_key,
    //           revert_company_id:
    //             this.$session.get("UserInformation").company_id,
    //           revert_company_name:
    //             this.$session.get("UserInformation").company_name,
    //           isShow: true,
    //         },
    //       },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${this.$session.get("at")}`,
    //         },
    //       }
    //     )
    //     .then(({ data }) => {
    //       this.big_spinner = false;
    //       if (data.message.MSG_CODE === this.api_status_code.DATA_AVAILABLE_MODELS.MSG_CODE) {
    //         this.trained_ner_models = data.data.model_data.map((model) => {
    //           model.created_at = moment(
    //             model.created_at,
    //             "YYYYMMDDHHmmss"
    //           ).format("Do MMM YY");
    //           return model;
    //         });       
    //       }else if (data.message.MSG_CODE === this.api_status_code.EMPTY_DATA_MODELS.MSG_CODE){

    //       }
    //       else{
    //         Swal({
    //           title:data.message.MSG_CODE,
    //           text:data.message.MSG,
    //           showCancelButton: false,
    //           showConfirmButton: false,
    //           timer: 2500,
    //           type: "error"
    //         })           
    //       }
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //       this.big_spinner = false;
    //       if (
    //         e.response.status === 410 ||
    //         e.response.status === 440 ||
    //         e.response.status === 409
    //       ) {
    //         this.$root.$emit("Session_Expired", e.response.data);
    //       }
    //     });
    // },
    // get_trained_intent_models() {
    //   this.big_spinner = true;
    //   axios
    //     .post(
    //       api_calls.train_intent_model(),
    //       {
    //         company_name: this.companyname,
    //         company_id: this.companyid,
    //         email: this.$session.get("UserInformation").email,
    //         license_key: this.$session.get("UserInformation").license_key,
    //         token: this.$session.get("UserInformation").tokens,
    //         isGetModels: true,
    //       },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${this.$session.get("at")}`,
    //         },
    //       }
    //     )
    //     .then(({ data }) => {
    //       this.big_spinner = false;
    //       if (data.message.MSG_CODE === this.api_status_code.DATA_AVAILABLE_MODELS.MSG_CODE) {
    //         this.trained_intent_models = data.data.models.map((model) => {
    //           model.created_at = moment(
    //             model.created_at,
    //             "YYYYMMDDHHmmss"
    //           ).format("Do MMM YY");
    //           return model;
    //         }); 
    //       } else {
    //         Swal({
    //           title:response.data.message.MSG_CODE,
    //           text:response.data.message.MSG,
    //           showCancelButton: false,
    //           showConfirmButton: false,
    //           timer: 2500,
    //           type: "error"
    //         })
    //     }
    //       // console.log(response.data);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //       this.big_spinner = false;
    //       if (
    //         e.response.status === 410 ||
    //         e.response.status === 440 ||
    //         e.response.status === 409
    //       ) {
    //         this.$root.$emit("Session_Expired", e.response.data);
    //       }
    //     });
    // },
    // add_mail() {
    //   event.preventDefault();
    //   axios
    //     .post(
    //       api_calls.notify_superadmin_url(),
    //       {
    //         company_name: this.companyname,
    //         company_id: this.companyid,
    //         sendto: this.sender,
    //         email: this.$session.get("UserInformation").email,
    //         body: this.email_body,
    //         subject: this.subject,
    //         bindemail: "False",
    //         license_key: this.$session.get("UserInformation").license_key,
    //         token: this.$session.get("UserInformation").tokens
    //       },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${this.$session.get("at")}`
    //         }
    //       }
    //     )
    //     .then(response => {
    //       toastr.success(response.data);
    //     })
    //     .catch(e => {
    //       if (
    //         e.response.status === 410 ||
    //         e.response.status === 440 ||
    //         e.response.status === 409
    //       ) {
    //         this.$root.$emit("Session_Expired", e.response.data);
    //       }
    //     });
    // },
    language_support_api() {
      axios
        .post(api_calls.multiple_language_support_url(), {
          company_name: this.companyname,
          company_id: this.companyid,
          email: this.$session.get("UserInformation").email,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens,
          language_support: this.multiple_language_list,
        })
        .then((response) => {
          if (response.data.message.MSG_CODE != this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE) {
          } else {
            this.$router.go();
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              timer: 2500,
              type: "error"
            })
          }
        });
    },
    // fileinput(e) {
    //   let files = e.target.files || e.dataTransfer.files;
    //   if (files[0].size > 2097152) {
    //     swal({
    //       text: this.tlt('other_upload_company_logo_msg'),
    //       toast: true,
    //       position: "top-end",
    //       type: "error",
    //       showConfirmButton: false,
    //       timer: 10000,
    //     });
    //     return;
    //   }
    //   if (files[0].type === "image/png" || files[0].type === "image/jpeg") {
    //     if (!files.length) return;
    //     this.old_image_name = this.file_label;
    //     this.file_label = files[0].name;
    //     this.createImage(files[0]);
    //   } else {
    //     swal({
    //       text: this.tlt('other_select_img_type_msg'),
    //       type: "error",
    //       timer: 2500,
    //     });
    //   }
    // },
    // createImage(file, type) {
    //   let reader = new FileReader();

    //   reader.onload = (e) => {
    //     this.image_file = e.target.result.split("base64,")[1];
    //   };
    //   reader.readAsDataURL(file);
    // },
    // download_sdk(data_type) {
    //   if (data_type == "license_key") {
    //     this.spinnerOn1 = true;
    //     axios({
    //       method: "post",
    //       url: api_calls.get_license_key(),
    //       responseType: "blob",
    //       data: {
    //         company_id: this.$session.get("UserInformation").company_id,
    //         company_name: this.$session.get("UserInformation").company_name,
    //         license_key: this.$session.get("UserInformation").license_key,
    //         token: this.$session.get("UserInformation").tokens,
    //         email: this.$session.get("UserInformation").email,
    //       },
    //       headers: {
    //         Authorization: `Bearer ${this.$session.get("at")}`,
    //       },
    //     })
    //       .then((response) => {
    //         var url = window.URL.createObjectURL(new Blob([response.data]));
    //         var link = document.createElement("a");
    //         link.href = url;
    //         link.setAttribute("download", data_type + ".txt");
    //         document.body.appendChild(link);
    //         link.click();
    //         this.spinnerOn1 = false;
    //       })
    //       .catch((e) => {
    //         if (
    //           e.response.status === 410 ||
    //           e.response.status === 440 ||
    //           e.response.status === 409
    //         ) {
    //           this.$root.$emit("Session_Expired", e.response.data);
    //         }
    //       });
    //   } else {
    //     this.spinnerOn2 = true;
    //     axios({
    //       method: "post",
    //       url: api_calls.file_download_url(),
    //       responseType: "blob",
    //       data: {
    //         download_sdk_type: data_type,
    //         company_id: this.$session.get("UserInformation").company_id,
    //         company_name: this.$session.get("UserInformation").company_name,
    //         license_key: this.$session.get("UserInformation").license_key,
    //         token: this.$session.get("UserInformation").tokens,
    //         email: this.$session.get("UserInformation").email,
    //       },
    //       headers: {
    //         Authorization: `Bearer ${this.$session.get("at")}`,
    //       },
    //     })
    //       .then((response) => {
    //         this.spinnerOn2 = false;
    //         if (response.data.message.MSG_CODE === this.api_status_code.STATUS_SUCCESS.MSG_CODE) {
    //           toastr.error(
    //             this.tlt('other_internal_error_msg1')
    //           );
    //         } else {
    //           var url = window.URL.createObjectURL(new Blob([response.data]));
    //           var link = document.createElement("a");
    //           link.href = url;
    //           link.setAttribute("download", data_type + "_SDK.zip");
    //           document.body.appendChild(link);
    //           link.click();
    //         }
    //       })
    //       .catch((e) => {
    //         this.spinnerOn2 = false;
    //         toastr.error(
    //           this.tlt('other_internal_error_msg2')
    //         );
    //         if (
    //           e.response.status === 410 ||
    //           e.response.status === 440 ||
    //           e.response.status === 409
    //         ) {
    //           this.$root.$emit("Session_Expired", e.response.data);
    //         }
    //       });
    //   }
    // },
    copy_widget_code() {
      this.$refs.widget_textarea.select();
      document.execCommand("copy");
      $("#copy_code_tooltip").tooltip("show");
      setTimeout(() => {
        $("#copy_code_tooltip").tooltip("dispose");
        this.initialize_tooltips();
      }, 5000);
    },
    copy_uuid_code() {
      this.$refs.uuid_textarea1.select();
      this.$refs.uuid_textarea2.select();
      document.execCommand("copy");
      setTimeout(() => {
        $("#copy_code_tooltip").tooltip("dispose");
        this.initialize_tooltips();
      }, 5000);
    },
    // initialize_tooltips() {
    //   $('[data-tooltip="tooltip"]').tooltip({
    //     trigger: "manual",
    //   });
    // },
    // copy_license_key() {
    //   this.$refs.license_key_textarea.select();
    //   this.$refs.license_key_textarea.setSelectionRange(0, 99999);
    //   document.execCommand("copy");
    //   $("#copy_licnse_key_tooltip").tooltip("show");
    //   setTimeout(() => {
    //     $("#copy_licnse_key_tooltip").tooltip("dispose");
    //     this.initialize_tooltips();
    //   }, 5000);
    // },
    // configure_sender_email(value){
    //   if (value == "email") {
    //     Swal.fire({
    //       title: this.tlt('other_configure_email_swal_msg'),
    //       text:
    //         this.tlt('other_verification_link_msg'),
    //       type: "question",
    //       showCancelButton: true,
    //       confirmButtonColor: "#3085d6",
    //       cancelButtonColor: "#d33",
    //       confirmButtonText: this.tlt('other_swal_proceed_msg')
    //     }).then(result => {
    //       if (result.value) {
    //         this.big_spinner = true;
    //         axios
    //           .post(
    //             api_calls.product_settings(),
    //             {
    //               company_name: this.companyname,
    //               company_id: this.companyid,
    //               email: this.$session.get("UserInformation").email,
    //               license_key: this.$session.get("UserInformation").license_key,
    //               token: this.$session.get("UserInformation").tokens,
    //               is_email: true,
    //               email_id: this.email_details
    //             },
    //             {
    //               headers: {
    //                 Authorization: `Bearer ${this.$session.get("at")}`
    //               }
    //             }
    //           )
    //           .then(response => {
    //             this.big_spinner = false;
    //             if (response.data.message.MSG_CODE != this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE) {
    //               swal({
    //                 text:
    //                   this.tlt('other_email_send_to_msg') +
    //                   " " +
    //                   this.tlt('other_user_email_details_msg') +
    //                   this.tlt('other_check_your_email_msg'),
    //                 type: "success",
    //                 title: this.tlt('other_success_swal_btn1'),
    //                 allowOutsideClick: false,
    //                 allowEscapeKey: false
    //               });
    //               this.email_disable = true;
    //               this.email_verification_status();
    //               this.load_product_settings();
    //             } else {
    //               swal({
    //                 title: response.data.message.MSG_CODE,
    //                 text: response.data.message.MSG,
    //                 showCancelButton: false,
    //                 showConfirmButton: false,
    //                 timer: 2500,
    //                 type: "error"
    //               });
    //             }
    //           })
    //           .catch(e => {
    //             this.big_spinner = false;
    //             toastr.error(this.tlt('other_error_occur_msg'));
    //             if (
    //               e.response.status === 410 ||
    //               e.response.status === 440 ||
    //               e.response.status === 409
    //             ) {
    //               this.$root.$emit("Session_Expired", e.response.data);
    //             }
    //           });
    //       }
    //     });
    //   }else if (value == "email_remove") {
    //     Swal.fire({
    //       title: this.tlt('other_swal_alert_msg1'),
    //       text:
    //         this.tlt('other_removed_saved_email_msg'),
    //       type: "question",
    //       showCancelButton: true,
    //       confirmButtonColor: "#3085d6",
    //       cancelButtonColor: "#d33",
    //       confirmButtonText: this.tlt('other_swal_remove_msg')
    //     }).then(result => {
    //       if (result.value) {
    //         this.big_spinner = true;
    //         axios
    //           .post(
    //             api_calls.product_settings(),
    //             {
    //               company_name: this.companyname,
    //               company_id: this.companyid,
    //               email: this.$session.get("UserInformation").email,
    //               license_key: this.$session.get("UserInformation").license_key,
    //               token: this.$session.get("UserInformation").tokens,
    //               is_remove_email: true,
    //               email_id: this.email_details
    //             },
    //             {
    //               headers: {
    //                 Authorization: `Bearer ${this.$session.get("at")}`
    //               }
    //             }
    //           )
    //           .then(response => {
    //             this.big_spinner = false;
    //             if (response.data.message.MSG_CODE != this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE) {
    //               swal({
    //                 text: this.tlt('other_email_removed_swal_msg'),
    //                 type: "success",
    //                 timer: 5000,
    //                 title: this.tlt('other_success_swal_btn2')
    //               });
    //               this.email_disable = false;
    //               this.email_details = null;
    //               this.empty_variable();
    //               this.load_product_settings();
    //             } else {
    //               swal({
    //                 title: response.data.message.MSG_CODE,
    //                 text: response.data.message.MSG,
    //                 showCancelButton: false,
    //                 showConfirmButton: false,
    //                 timer: 2500,
    //                 type: "error"
    //               });
    //             }
    //           })
    //           .catch(e => {
    //             this.big_spinner = false;
    //             toastr.error(this.tlt('other_error_occur_msg2'));
    //             if (
    //               e.response.status === 410 ||
    //               e.response.status === 440 ||
    //               e.response.status === 409
    //             ) {
    //               this.$root.$emit("Session_Expired", e.response.data);
    //             }
    //           });
    //       }
    //     });
    //   } 
    // },
    // email_verification_status() {
    //   if (this.email_details != null && this.email_details != "") {
    //     this.email_disable = true;
    //     this.big_spinner = true;
    //     axios
    //       .post(
    //         api_calls.product_settings(),
    //         {
    //           company_name: this.companyname,
    //           company_id: this.companyid,
    //           email: this.$session.get("UserInformation").email,
    //           license_key: this.$session.get("UserInformation").license_key,
    //           token: this.$session.get("UserInformation").tokens,
    //           is_email_verification_status: true,
    //           email_id: this.email_details
    //         },
    //         {
    //           headers: {
    //             Authorization: `Bearer ${this.$session.get("at")}`
    //           }
    //         }
    //       )
    //       .then(response => {
    //         this.big_spinner = false;
    //         if (
    //           response.data.message.MSG_CODE != this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE &&
    //           response.data.message.MSG_CODE != this.api_status_code.NO_DATA_AVAILABLE.MSG_CODE
    //         ) {
    //           var status = response.data.data.verification_status;
    //           this.verification_status =
    //             status == "Success"
    //               ? "Success"
    //               : status == "Pending"
    //               ? this.tlt('other_pending_verify_email_msg')
    //               : status +
    //                 this.tlt('other_link_expired_msg');
    //         }else {
    //           Swal({
    //             title: response.data.message.MSG_CODE,
    //             text: response.data.message.MSG,
    //             showCancelButton: false,
    //             showConfirmButton: false,
    //             timer: 2500,
    //             type: "error"
    //           })
    //         }
    //       })
    //       .catch(e => {
    //         this.big_spinner = false;
    //         if (
    //           e.response.status === 410 ||
    //           e.response.status === 440 ||
    //           e.response.status === 409
    //         ) {
    //           this.$root.$emit("Session_Expired", e.response.data);
    //         }
    //       });
    //   }
    // },
    top_navbar_disable(){
      if (this.disable_sidebar === true) {
        return 'pointer-events:none;'    
      }else{
        return ''
      }
    }
  },
};
</script>
<style>
.third-party-logo {
  width: 150px;
  height: 75px;
  object-fit: contain;
}
.form-control.tags-input {
  padding: 5px !important;
}
.tags-input-badge {
  line-height: 1.5 !important;
}
.tags-input-remove:before,
.tags-input-remove:after {
  background: #9799ae !important;
}
</style>

<style scoped>
@media (max-width: 1400px) {
  .miscellaneous-custom-file-input {
    padding: 15px 25px 15px 60px;
  }
}
/* .vr {
  border-left: 1px solid #E9E9E9;
  margin-top: 5%;
  margin-bottom: 5%; */
/* } */
.hclass6 {
  font-weight: 100;
}

.contact-info {
  padding-left: 0px;
}
.darkblue-btn1 {
  margin-left: 3%;
  font-size: 14px;
  color: #fff;
  background: #273679;
  border: solid 1px #273679;
  padding: 9px 18px;
  font-weight: 400;
  line-height: 20px;
  display: inline-block;
  border-radius: 4px;
  cursor: pointer;
  width: 30%;
  text-align: center;
}
.button_disabled {
  border: 2px solid rgb(230, 230, 230);
  background: rgb(247, 248, 251);
}
.button_disabled svg {
  opacity: 0;
}
.button_enabled {
  border: 1px solid rgb(39, 54, 121);
  background: rgb(247, 248, 251);
}
.button_enabled svg {
  opacity: 1;
}
.custom-file > input::-webkit-input-placeholder {
  margin-left: 200px;
}
#select_country_name_misc {
  color: #9499ae;
}
.save_node_button {
  font-size: 14px;
  color: #fff;
  background: #273679;
  border: solid 1px #273679;
  padding: 6px 15px;
  font-weight: 400;
  line-height: 20px;
  /* display: inline-block; */
  border-radius: 4px;
  cursor: pointer;
  float: right;
}
.custom-file {
  min-height: 40px !important;
}
@media (max-width: 1400px) {
  .custom-file-label {
    padding: 15px 25px 15px 15px !important;
  }
}

.custom-button-box {
  border: 0.5px solid #ccc;
}

.table-box td,
.table-box th {
  padding: 5px !important;
  font-size: 14px !important;
  width: 0px !important;
}
.table-box td:first-child,
.table-box th:first-child {
  text-align: left !important;
  width: 0px !important;
}
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
