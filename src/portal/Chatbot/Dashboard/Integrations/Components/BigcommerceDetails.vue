<template>
  <div :style="setup_css" class="dash-modal">
    <div class="modal-head align-items-center m-0">
      <!-- <div class="head-icn" v-if="from_setup == false">
        <img src="/img/user-blue.png" alt />
      </div> -->
      <h3 style="text-align:center" v-if="from_setup == false">{{tlt('bigcommerce_setting_header')}}</h3>
      <button
        v-if="from_setup == false"
        type="button"
        class="close"
        data-dismiss="modal"
        style="float: right"
      >
        <img src="/img/close-icn.png" alt />
      </button>
    </div>
    <div class="modal-head d-flex align-items-center m-0">
      <h5 v-if="bigcommerce_details_saved" style="width:100%">
        {{tlt('bigcommerce_setting_sync_status_label')}}:
        <strong style="color: #273679">
          {{ bigcommerce_sync_status }}
          <i
            class="fa fa-spinner fa-spin"
            v-show="bigcommerce_sync_status === 'In-Progress'"
          ></i>
        </strong>
        <i class="fa fa-refresh"></i>
        <span
          v-html="refresh_icon_svg"
          @click="check_bigcommerce_status"
          :style="from_setup == true ? 'float: right;': ''"
          style="cursor: pointer"
          id="refresh_span"
        ></span>
      </h5>
    </div>
    <div class="slide-right" v-if="bigcommerce_details_saved">
      <h5 v-show="bigcommerce_sync_status === 'In-Progress' && from_setup"
        style="font-weight: 500;">
        {{tlt('bigcommerce_setting_setup_process_label')}}.
      </h5>
    </div>
    <div class="progress-sync" v-if="bigcommerce_details_saved">
      <step-progress
        :steps="bigcommerce_sync_steps"
        :current-step="bigcommerce_sync_current_step"
        icon-class="fa fa-check"
        :active-color="'#273679'"
        :passive-color="progress_passive_color"
        :passive-thickness="3"
        :active-thickness="3"
        :line-thickness="4"
      ></step-progress>
    </div>
    <h5>
      {{ bigcommerce_store_details_text }}
      <!-- <span
        @click="edit_bigcommerce_details"
        v-html="pencil_svg"
        class="ml-auto"
        style="cursor: pointer; float: right"
        title="Edit Details"
      ></span> -->
      <span @click="bigcommerce_help" v-if="!bigcommerce_details_saved" 
      style="cursor: pointer; padding-left: 10px; font-size: 18px; color: #0645AD;">
        {{tlt('setup_help_btn')}}
        <a title="Help" target="_blank" style="cursor: pointer;"> 
          <i
            class="fa fa-info-circle"
            aria-hidden="true"
            style="font-size: 16px"
          >
          </i>
        <!-- <svg
          data-tooltip="tooltip"
          data-placement="bottom"
          xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:cc="http://creativecommons.org/ns#"
          xmlns:dc="http://purl.org/dc/elements/1.1/"
          height="24"
          width="24"
          version="1.1"
        >
          <g transform="translate(0 -1028.4)">
            <path
              d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z"
              transform="translate(0 1029.4)"
              fill="#2980b9"
            />
            <path
              d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z"
              transform="translate(0 1028.4)"
              fill="#273679"
            />
            <path
              d="m12 1035.4c-1.727-0.1-3.4306 1.1-3.8438 2.8-0.0403 0.3-0.0546 0.4-0.1562 1.2h2c-0.0526-1.3 1.306-2.3 2.5-2 1.021 0.3 1.763 1.5 1.406 2.5-0.294 0.6-0.998 1-1.562 1.4-0.577 0.5-1.074 1.1-1.313 1.8-0.039 0.4-0.034 0.8-0.031 1.3h2v-1c0.172-0.7 0.688-1.1 1.25-1.4 0.634-0.3 1.087-0.8 1.406-1.4 0.543-1 0.454-2.2-0.125-3.1-0.705-1.3-2.067-2.2-3.531-2.1zm0 10c-0.552 0-1 0.4-1 1 0 0.5 0.448 1 1 1s1-0.5 1-1c0-0.6-0.448-1-1-1z"
              fill="#2980b9"
            />
            <path
              d="m12 6c-1.727-0.0274-3.4306 1.1749-3.8438 2.875-0.0403 0.2941-0.0546 0.3281-0.1562 1.125h2c-0.0526-1.2477 1.306-2.289 2.5-1.9375 1.021 0.2374 1.763 1.4281 1.406 2.4375-0.294 0.684-0.998 0.992-1.562 1.406-0.577 0.482-1.074 1.094-1.313 1.813-0.039 0.42-0.034 0.859-0.031 1.281h2v-1c0.172-0.624 0.688-1.042 1.25-1.312 0.634-0.312 1.087-0.835 1.406-1.469 0.543-0.974 0.454-2.1746-0.125-3.094-0.705-1.2699-2.067-2.1438-3.531-2.125zm0 10c-0.552 0-1 0.448-1 1s0.448 1 1 1 1-0.448 1-1-0.448-1-1-1z"
              transform="translate(0 1028.4)"
              fill="#ecf0f1"
            />
          </g>
        </svg>-->
        </a> 
      </span>
    </h5>
    <ol class="pl-0 mt-2">
      <form @submit.prevent="submit_bigcommerce_form">
        <div class="form-group mb-2">
          <label> {{tlt('bigcommerce_setting_shop_url_label')}}: </label>
          <input
            class="form-control"
            type="text"
            placeholder="Ex. https://mybigcommerce.com"
            v-model="bigcommerce_shop_url"
            :disabled="bigcommerce_details_saved || !from_setup"
            required
          />
        </div>

        <div class="form-group mb-2">
          <label> {{tlt('bigcommerce_setting_access_token_label')}}: </label>
          <input
            class="form-control"
            type="text"
            v-model="bigcommerce_access_token"
            :disabled="bigcommerce_details_saved || !from_setup"
            required
          />
        </div>

        <div class="form-group mb-2">
          <label> {{tlt('bigcommerce_setting_api_url_label')}}: </label>
          <input
            class="form-control"
            type="text"
            placeholder="Ex. https://api.bigcommerce.com/stores/qwert/v3/"
            v-model="bigcommerce_api_url"
            :disabled="bigcommerce_details_saved || !from_setup"
            required
          />
        </div>

        <div class="btn-wrap text-left mt-0 pt-0 border-top-0">
          <button
            type="submit"
            class="darkblue-btn ml-0"
            id="copy_code_tooltip"
            data-toggle="tooltip"
            data-placement="top"
            v-if="!bigcommerce_details_saved"
            :disabled="!from_setup"
          >
            {{tlt('save_btn')}}
          </button>
        </div>
      </form>
    </ol>
    <div>
      <h6 v-if="bigcommerce_details_saved" style="width:100%">
        {{tlt('bigcommerce_setting_sync_status_finish_label')}}:
        <strong style="color: #273679">
          {{ bigcommerce_sync_status }}
          <i
            class="fa fa-spinner fa-spin"
            v-show="bigcommerce_sync_status === 'In-Progress'"
          ></i>
        </strong>
      </h6>
    </div>
  </div>
</template>

<script>
import { bus } from "@/portal/main";
import axios from "axios";
import api_calls from "@/portal/api_calls";
import Swal from "sweetalert2";
import StepProgress from "vue-step-progress";
import "@/portal/assets/css/stepprogress.css";

export default {
  name: "BigcommerceDetails",
  data() {
    return {
      big_spinner: false,
      widget_code: "",
      bigcommerce_shop_url: "",
      bigcommerce_access_token: "",
      bigcommerce_api_url: "",
      // bigcommerce_consumer_secret: "",
      // bigcommerce_consumer_key: "",
      companyname: this.$session.get("UserInformation").company_name,
      companyid: this.$session.get("UserInformation").company_id,
      bigcommerce_details_saved: false,
      pencil_svg:
        ' <svg xmlns="http://www.w3.org/2000/svg" width="15.546" height="15.461" viewBox="0 0 15.546 15.461"><defs><style>.a{fill:#9e9e9e;}</style></defs><g transform="translate(-747.888 -356.769)"><path class="a" d="M759.416,356.769a2.358,2.358,0,0,1,1.777.662c.534.513,1.072,1.025,1.567,1.575a2.3,2.3,0,0,1-.071,3.325c-2.736,2.76-5.494,5.5-8.238,8.251a1.381,1.381,0,0,1-.758.288c-.719.174-1.429.379-2.144.572-.932.251-1.862.5-2.795.751-.6.158-.989-.213-.832-.807q.689-2.595,1.406-5.182a1.164,1.164,0,0,1,.289-.487q4.091-4.107,8.2-8.2A2.265,2.265,0,0,1,759.416,356.769Zm-1.989,2.956-6.54,6.538,3.025,3.024,6.538-6.537Zm4.023,2.165c.118-.135.225-.269.343-.392a1.134,1.134,0,0,0,0-1.734c-.46-.466-.926-.925-1.388-1.39a1.166,1.166,0,0,0-.861-.368c-.578,0-.881.4-1.214.76Zm-12.084,8.863,3.2-.863-2.337-2.331Z" transform="translate(0)"/><path class="a" d="M813.942,422.6l-.789-.8,3.821-3.819.784.8Z" transform="translate(-59.648 -55.947)"/></g></svg>',
      bigcommerce_sync_steps: [
        "Gathering Products",
        "Generating NER Data",
        "Generating Intent Data",
        "Conversation Bot Training",
        "Completed",
      ],
      bigcommerce_sync_current_step: 0,
      refresh_icon_svg:
        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="18.23px" height="18.23px" viewBox="0 0 500.23 500.23" style="enable-background:new 0 0 187.23 487.23;" xml:space="preserve"><defs><style>.abc{fill:#9e9e9e;}</style></defs><g>	<g>		<path class="abc" d="M55.323,203.641c15.664,0,29.813-9.405,35.872-23.854c25.017-59.604,83.842-101.61,152.42-101.61    c37.797,0,72.449,12.955,100.23,34.442l-21.775,3.371c-7.438,1.153-13.224,7.054-14.232,14.512    c-1.01,7.454,3.008,14.686,9.867,17.768l119.746,53.872c5.249,2.357,11.33,1.904,16.168-1.205    c4.83-3.114,7.764-8.458,7.796-14.208l0.621-131.943c0.042-7.506-4.851-14.144-12.024-16.332    c-7.185-2.188-14.947,0.589-19.104,6.837l-16.505,24.805C370.398,26.778,310.1,0,243.615,0C142.806,0,56.133,61.562,19.167,149.06    c-5.134,12.128-3.84,26.015,3.429,36.987C29.865,197.023,42.152,203.641,55.323,203.641z"/>		<path  class="abc" d="M464.635,301.184c-7.27-10.977-19.558-17.594-32.728-17.594c-15.664,0-29.813,9.405-35.872,23.854    c-25.018,59.604-83.843,101.61-152.42,101.61c-37.798,0-72.45-12.955-100.232-34.442l21.776-3.369    c7.437-1.153,13.223-7.055,14.233-14.514c1.009-7.453-3.008-14.686-9.867-17.768L49.779,285.089    c-5.25-2.356-11.33-1.905-16.169,1.205c-4.829,3.114-7.764,8.458-7.795,14.207l-0.622,131.943    c-0.042,7.506,4.85,14.144,12.024,16.332c7.185,2.188,14.948-0.59,19.104-6.839l16.505-24.805    c44.004,43.32,104.303,70.098,170.788,70.098c100.811,0,187.481-61.561,224.446-149.059    C473.197,326.043,471.903,312.157,464.635,301.184z"/>	</g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>',
      spinnerOnRefresh: false,
      progress_passive_color: "#dbdbdb",
      retail_bot_template_id: null,
      is_integrated: false
    };
  },
  props: {
    from_setup: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    bigcommerce_details_saved() {
      bus.$emit("bigcommerce_details_saved", this.bigcommerce_details_saved);
    },
  },
  components: {
    "step-progress": StepProgress,
  },
  computed: {
    setup_css() {
      if (this.from_setup == true) {
        return {
          "--modal-head-margin-bottom": "20px",
          "--progress-sync-margin-bottom": "10%",
          "--form-control-padding-left": "15px",
        };
      }
    },
    bigcommerce_store_details_text() {
      if (this.bigcommerce_details_saved) {
        return  this.tlt('bigcommerce_details_text');
      } else {
        return this.tlt('bigcommerce_enter_details_text');
      }
    },
    bigcommerce_sync_status() {
      var status;
      if (this.bigcommerce_sync_current_step < this.bigcommerce_sync_steps.length) {
        status = "In-Progress";
        this.$emit("bigcommerce_sync_status", status);
        bus.$emit("bigcommerce_sync_status", status);
        return "In-Progress";
      } else {
        status = "Sync Finished";
        this.$emit("bigcommerce_sync_status", status);
        bus.$emit("bigcommerce_sync_status", status);
        return "Sync Finished";
      }
    },
  },
  mounted() {
    this.check_bigcommerce_status();
    this.set_interval_check();
    this.get_integration_details();
    $('[data-toggle="popover"]').popover();
    this.widget_code = `<link href="https://resource.cense.ai/css/app.css" rel="stylesheet"> <bot-chat></bot-chat> <script src="https://resource.cense.ai/js/app.js"><\/script> <script>var widget=GenerateWidget({source:'Web',license_key:'${
      this.$session.get("UserInformation").license_key
    }'})<\/script>`.toString();
    let bot_templates_data = this.$session.get("BotTemplates");
    for (let i = 0; i < bot_templates_data.length; i++) {
      if (
        bot_templates_data[i].domain === "Retail" &&
        bot_templates_data[i].subscribed === true
      ) {
        this.retail_bot_template_id = bot_templates_data[i].template_id;
        break;
      }
    }
  },
  methods: {
    set_interval_check(){
      setInterval(this.check_bigcommerce_status ,60000);
    },
    bigcommerce_help(){
      let routeData = this.$router.resolve({name: 'bigcommercehelp'});
      window.open(routeData.href, '_blank');
    },
    get_integration_details() {
      this.big_spinner = true;
      axios
        .post(
          api_calls.chatbot_integration_details(),
          {
            is_get: true,
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          this.big_spinner = false;
          if (response.data.message.MSG_CODE === this.api_status_code.DATA_AVAILABLE.MSG_CODE) {
            if ("bigcommerce_details" in response.data.data) {
              this.bigcommerce_shop_url =
                response.data.data.bigcommerce_details.bigcommerce_shop_url;
              this.bigcommerce_api_url =
                response.data.data.bigcommerce_details.bigcommerce_api_url;
              this.bigcommerce_access_token =
                response.data.data.bigcommerce_details.bigcommerce_access_token;
              this.bigcommerce_details_saved = true;
              this.is_integrated = true;
              this.$root.$emit('framework_integrated',this.is_integrated, "bigcommerce");
            }
          }else if(response.data.message.MSG_CODE === this.api_status_code.EMPTY_DATA.MSG_CODE){

          }else {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              toast: true,
              position: "top-end",
              timer: 2500,
              type: "error"
            });
          }
        })
        .catch((e) => {
          this.big_spinner = false;
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.is_integrated = false;
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    submit_bigcommerce_form() {
      var domain_name = "https://";
      if (!this.bigcommerce_shop_url.includes(domain_name)) {
        Swal.fire({
          text:
            this.tlt('bigcommerce_enter_domain_name'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      }
      if (this.bigcommerce_api_url == "") {
        Swal.fire({
          text:
            this.tlt('bigcommerce_enter_api_url'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      }
      if (this.bigcommerce_access_token == "") {
        Swal.fire({
          text:
            this.tlt('bigcommerce_enter_access_token'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      }
      Swal.fire({
        text: this.tlt('bigcommerce_submit_your_details'),
        type: "info",
        toast: true,
        showConfirmButton: false,
      });
      axios
        .post(
          api_calls.chatbot_integration_details(),
          {
            company_name: this.$session.get("UserInformation").company_name,
            company_id: this.$session.get("UserInformation").company_id,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            is_bigcommerce: true,
            is_save: true,
            bigcommerce_shop_url: this.bigcommerce_shop_url,
            bigcommerce_access_token: this.bigcommerce_access_token,
            bigcommerce_api_url: this.bigcommerce_api_url,
            template_id: this.retail_bot_template_id,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          if (response.data.message.MSG_CODE === this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE) {
            this.$session.set("retail_web_framework", "bigcommerce");
            $("#widget_code_modal").modal("hide");
            Swal.fire({
              title: this.tlt('bigcommerce_credential_verified'),
              text:
                this.tlt('bigcommerce_product_sync_process'),
              type: "success",
              timer: 7000,
            }).then(() => {
              this.get_integration_details();
              this.check_bigcommerce_status();
            });
          } else if (response.data.message.MSG_CODE === this.api_status_code.SHOP_NOT_FOUND.MSG_CODE) {
            Swal.fire({
              title: this.tlt('bigcommerce_oops1'),
              text:
                this.tlt('woo_issue_with_credential'),
              type: "error",
            });
          } else if (response.data.message.MSG_CODE === this.api_status_code.BIGCOMMERCE_INVALID_ACCESS_TOKEN.MSG_CODE) {
            Swal.fire({
              title: this.tlt('bigcommerce_oops2'),
              text:
                this.tlt('bigcommerce_issue_with_credential'),
              type: "error",
            });
          }
          else if(response.data.message.MSG_CODE === this.api_status_code.SHOP_NO_PRODUCTS.MSG_CODE) {
            Swal.fire({
              title: this.tlt('bigcommerce_oops4'),
              text:
                this.tlt('bigcommerce_one_product_ahead'),
              type: "error",
            });
          } else {
            Swal.fire({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                type: "error"
            });
          }
        })
        .catch((e) => {
          Swal.fire({
            title: this.tlt('bigcommerce_error_occurred2'),
            type: "error",
          });
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    check_bigcommerce_status() {
      this.big_spinner = true;
      this.spinnerOnRefresh = true;
      axios
        .post(
          api_calls.automation_notification(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          this.big_spinner = false;
          this.spinnerOnRefresh = false;
          this.bigcommerce_sync_current_step = 0;
          if (response.data.message.MSG_CODE === this.api_status_code.SENDING_EMAIL.MSG_CODE) {
            if (response.data.data.Completed == true) {
              for (let i = 0; i <= 5; i++) {
                setTimeout(() => {
                  this.bigcommerce_sync_current_step += 1;
                }, 84 * i * 10);
              }
            } else {
              if (
                response.data.data.Status == "Started" ||
                response.data.data.Status == "Gathering Products List"
              ) {
                this.bigcommerce_sync_current_step = 0;
              } else if (response.data.data.Status == "Generating NER Data") {
                for (let i = 0; i <= 1; i++) {
                  setTimeout(() => {
                    this.bigcommerce_sync_current_step += 1;
                  }, 84 * i * 10);
                }
              } else if (
                response.data.data.Status == "Generating Intent Data"
              ) {
                for (let i = 0; i <= 2; i++) {
                  setTimeout(() => {
                    this.bigcommerce_sync_current_step += 1;
                  }, 84 * i * 10);
                }
              } else if (
                response.data.data.Status == "Conversation Bot Training"
              ) {
                for (let i = 0; i < 3; i++) {
                  setTimeout(() => {
                    this.bigcommerce_sync_current_step += 1;
                  }, 84 * i * 10);
                }
              } else if (response.data.data.Status == "Completed") {
                for (let i = 0; i <= 5; i++) {
                  setTimeout(() => {
                    this.bigcommerce_sync_current_step += 1;
                  }, 84 * i * 10);
                }
              }
            }
          }else if (response.data.message.MSG_CODE === this.api_status_code.NO_DATA_AVAILABLE.MSG_CODE){
   
          }else{
            Swal({
              title:response.data.message.MSG_CODE,
              text:response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              timer: 2500,
              type: "info",
              toast:true
            })
          }
          // }, 1000);
        })
        .catch((e) => {
          this.big_spinner = false;
          this.spinnerOnRefresh = false;
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
  },
};
</script>

<style scoped>
.modal-head {
  padding-bottom: var(--modal-head-margin-bottom);
}
.progress-sync {
  margin-bottom: var(--progress-sync-margin-bottom, 10%);
}
.form-control {
  padding-left: var(--form-control-padding-left, 10px);
}
.slide-right {
   width: 100%;
   overflow: hidden;
}
.slide-right h5 {
   animation: 2s slide-right;
   animation-delay: 0s;
}
@keyframes slide-right {
    from {
       margin-left: -500px;
    }

    to {
       margin-left: 0%;
    }
 }
</style>