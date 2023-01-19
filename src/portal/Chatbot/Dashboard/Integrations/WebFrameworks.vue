<template>
  <div class="">
    <div class="spinner" id="spinner" v-show="big_spinner"></div>
    <!-- <div class="container-fluid"> -->
      <!-- <div class="card dash-card"> -->
        <div
          class="card-header d-block d-sm-flex flex-wrap justify-content-between"
        >
          <div class="col-sm-12">
            <h4 class="mb-sm-0" style="display: inline;">{{tlt('web_framework_header')}}</h4>
            <button
              v-if="is_retail == false" 
              @click="change_company_domain()"
              class="domain-link-style"
            >{{tlt('switch_retail_domain_btn')}}</button>
          </div>
        </div>
        <!-- <div class="card-body"> -->
        <div class="col-sm-12">
          <!-- <div class="table-box"> -->
            <!-- <div class="table-responsive container" style="overflow-x: visible; margin: 15px !important;"> -->
              <div class="row m-0 p-0">
                <div class="col-sm-3 p-3" v-show="is_retail">
                  <div class="card border-1" id ="shopify_img"
                  :style="retail_web_framework != 'shopify' ? 'background-color: #f4f4f4; margin-bottom: 10px;' : ''">
                    <a
                      href="javascript:void(0)"
                      class="mx-auto"
                      data-toggle="modal"
                      :data-target="retail_web_framework == 'shopify' ? '#widget_code_modal' : ''"
                      @click="website_name = 'Shopify'"
                      :style=" retail_web_framework != 'shopify' ? 'cursor: not-allowed' : '' "
                    >
                      <img
                        :src="require('@/portal/assets/img/shopify-logo.png')"
                        class="third-party-logo"
                        style="height: 100px !important"
                      />
                    </a>
                  </div>
                </div>
                <i v-show="is_retail" id ="check_btn_shopify"></i>
                <div class="col-sm-3 p-3" v-show="is_retail">
                  <div class="card border-1" id ="woocommerce_img"
                  :style="retail_web_framework != 'woocommerce' ? 'background-color: #f4f4f4; margin-bottom: 10px;' : ''">
                    <a
                      href="javascript:void(0)"
                      class="mx-auto"
                      data-toggle="modal"
                      :data-target="retail_web_framework == 'woocommerce' ? '#widget_code_modal' : ''"
                      @click="website_name = 'Woocommerce'"
                      :style=" retail_web_framework != 'woocommerce' ? 'cursor: not-allowed' : '' "
                    >
                      <img
                        :src="require('@/portal/assets/img/woocommerce-logo.png')"
                        class="third-party-logo"
                        style="height: 100px !important"
                      />
                    </a>
                  </div>
                </div>
                <i v-show="is_retail" id ="check_btn_woocommerce"></i>
                <div class="col-sm-3 p-3" v-show="is_retail">
                  <div class="card border-1" id ="magento_img"
                  :style="retail_web_framework != 'magento' ? 'background-color: #f4f4f4; margin-bottom: 10px;' : ''">
                    <a
                      href="javascript:void(0)"
                      class="mx-auto"
                      data-toggle="modal"
                      :data-target="retail_web_framework == 'magento' ? '#widget_code_modal' : ''"
                      @click="website_name = 'Magento'"
                      :style=" retail_web_framework != 'magento' ? 'cursor: not-allowed' : '' "
                    >
                      <img
                        :src="require('@/portal/assets/img/magento-logo.png')"
                        class="third-party-logo"
                        style="height: 100px !important"
                      />
                    </a>
                  </div>
                </div>
                <i v-show="is_retail" id ="check_btn_magento"></i>
                <div class="col-sm-3 p-3" v-show="is_retail">
                  <div class="card border-1" id ="bigcommerce_img"
                  :style="retail_web_framework != 'bigcommerce' ? 'background-color: #f4f4f4; margin-bottom: 10px;' : ''">
                    <a
                      href="javascript:void(0)"
                      class="mx-auto"
                      data-toggle="modal"
                      :data-target="retail_web_framework == 'bigcommerce' ? '#widget_code_modal' : ''"
                      @click="website_name = 'Bigcommerce'"
                      :style=" retail_web_framework != 'bigcommerce' ? 'cursor: not-allowed' : '' "
                    >
                      <img
                        :src="require('@/portal/assets/img/bigcommerce-logo.png')"
                        class="third-party-logo"
                        style="height: 100px !important"
                      />
                    </a>
                  </div>
                </div>
                <i v-show="is_retail" id ="check_btn_bigcommerce"></i>
                <div class="col-sm-3 p-3">
                  <div class="card border-1">
                    <a
                      href="javascript:void(0)"
                      class="mx-auto"
                      data-toggle="modal"
                      data-target="#widget_code_modal"
                      @click="website_name = 'Squarespace'"
                    >
                      <img
                        src="/img/squarespace-logo.png"
                        class="third-party-logo"
                        style="    
                          height: 80px !important;
                          margin-top: 10px !important;
                          margin-bottom: 10px !important;"
                      />
                    </a>
                  </div>
                </div>
                <div class="col-sm-3 p-3">
                  <div class="card border-1">
                    <a
                      href="javascript:void(0)"
                      class="mx-auto"
                      data-toggle="modal"
                      data-target="#widget_code_modal"
                      @click="website_name = 'Weebly'"
                    >
                      <img
                        :src="require('@/portal/assets/img/Weebly_logo.png')"
                        class="third-party-logo"
                        style="height: 100px !important"
                      />
                    </a>
                  </div>
                </div>
                <div class="col-sm-3 p-3">
                  <div class="card border-1">
                    <a
                      href="javascript:void(0)"
                      class="mx-auto"
                      data-toggle="modal"
                      data-target="#widget_code_modal"
                      @click="website_name = 'Wix'"
                    >
                      <img
                        :src="require('@/portal/assets/img/Wix-logo.png')"
                        class="third-party-logo"
                        style="height: 100px !important"
                      />
                    </a>                   
                  </div>
                </div>
                <div class="col-sm-3 p-3">
                  <div class="card border-1">
                    <!-- target="_blank" -->
                    <a
                      href="https://cense.ai/integrations/wordpress"
                      class="mx-auto"
                      target="_blank"
                    >
                      <img
                        :src="require('@/portal/assets/img/WordPress_logo.png')"
                        class="third-party-logo"
                        style="height: 100px !important"
                      />
                    </a>
                  </div>
                </div>
              </div>
            <!-- </div> -->
          <!-- </div> -->
        </div>
      <!-- </div> -->
      <div
        class="modal fade dash-modal"
        id="widget_code_modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="widget_code_modaltitle"
        aria-hidden="true"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div
          class="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-body">
              <div v-if="website_name != 'Shopify' && website_name != 'Woocommerce' && website_name != 'Magento' && website_name != 'Bigcommerce'" class="modal-head d-flex align-items-center">
                <div class="head-icn">
                  <img src="/img/user-blue.png" alt />
                </div>
                <h3>{{ website_name }} {{tlt('social_media_setting')}}</h3>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  style="float: right"
                >
                  <img src="/img/close-icn.png" alt />
                </button>
              </div>

              <template v-if="website_name == 'Shopify'">
                <shopify-details></shopify-details>
              </template>
              <template v-if="website_name == 'Woocommerce'">
                <woocommerce-details></woocommerce-details>
              </template>
              <template v-if="website_name == 'Magento'">
                <magento-details></magento-details>
              </template>
              <template v-if="website_name == 'Bigcommerce'">
                <bigcommerce-details></bigcommerce-details>
              </template>
              <detail-guides :website_name="website_name"></detail-guides>
            </div>
          </div>
        </div>
      </div>
    <!-- </div> -->
  </div>
</template>

<script>
import axios from "axios";
import api_calls from "@/portal/api_calls";
import "vue-step-progress/dist/main.css";
import ShopifyDetails from "./Components/ShopifyDetails.vue";
import WoocommerceDetails from "./Components/WoocommerceDetails.vue";
import MagentoDetails from "./Components/MagentoDetails.vue";
import BigcommerceDetails from "../Integrations/Components/BigcommerceDetails.vue";
import DetailGuides from './Components/DetailGuides.vue';
import Swal from "sweetalert2";

export default {
  name: "WebFrameworks",
  components: {
    ShopifyDetails,
    WoocommerceDetails,
    MagentoDetails,
    DetailGuides,
    BigcommerceDetails
  },
  data() {
    return {
      big_spinner: false,
      website_name: "",
      widget_code: "",
      widget_shopify_code: "",
      widget_bigcommerce_code: "",
      widget_general_code: "",
      is_retail: false,
      retail_web_framework: null
    };
  },
  mounted() {
    let bot_templates_data = this.$session.get("BotTemplates");
    for (let i = 0; i < bot_templates_data.length; i++) {
      if (
        bot_templates_data[i].domain === "Retail" &&
        bot_templates_data[i].subscribed === true
      ){
        this.is_retail = true;
      }
    }

    this.initialize_tooltips();
    this.get_integration_details();
    this.widget_general_code = `<link href="https://resource.cense.ai/css/app.css" rel="stylesheet"> <bot-chat></bot-chat> <script src="https://resource.cense.ai/js/app.js"><\/script> <script>var widget=GenerateWidget({source:'Web',license_key:'${
      this.$session.get("UserInformation").license_key
    }'})<\/script>`.toString();
    
    this.widget_shopify_code = `<link href="https://resource.cense.ai/css/app.css" rel="stylesheet"> <bot-chat></bot-chat> <script src="https://resource.cense.ai/js/app.js"><\/script> <script src="https://resource.cense.ai/js/shopify.js"><\/script> <script>var widget=GenerateWidget({source:'Web',license_key:'${
      this.$session.get("UserInformation").license_key
    }'})<\/script>`.toString();
    this.widget_bigcommerce_code = 
      `<script src="https://staging.cense.ai/bot-widget/js/app.js"><\/script><script>var widget=GenerateWidget({source:'Web',license_key:'${
        this.$session.get("UserInformation").license_key}'})<\/script><script>
        var head  = document.getElementsByTagName('head')[0];
        var link  = document.createElement('link');
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = 'https://staging.cense.ai/bot-widget/css/app.css';
        head.appendChild(link);
        var elem = document.createElement('bot-chat');
        document.body.appendChild(elem);
      <\/script>`.toString();
    this.widget_code = this.widget_shopify_code;
    this.$root.$on("framework_integrated",(data, framework) => {
      if (data == true && framework == "shopify"){
        document.getElementById("shopify_img").style.border = "1px solid #273679";
        document.getElementById("shopify_img").style.borderRadius = "0.4rem";
        document.getElementById("check_btn_shopify").innerHTML = `<i class="fa fa-check-circle" aria-hidden="true" style="color:#273679;margin-left: -1.0rem;margin-top:4px"></i>`;
      }else if (data == true && framework == "woocommerce"){
        document.getElementById("woocommerce_img").style.border = "1px solid #273679";
        document.getElementById("woocommerce_img").style.borderRadius = "0.4rem";
        document.getElementById("check_btn_woocommerce").innerHTML = `<i class="fa fa-check-circle" aria-hidden="true" style="color:#273679;margin-left: -1.0rem;margin-top:4px"></i>`;
      }else if (data == true && framework == "magento"){
        document.getElementById("magento_img").style.border = "1px solid #273679";
        document.getElementById("magento_img").style.borderRadius = "0.4rem";
        document.getElementById("check_btn_magento").innerHTML = `<i class="fa fa-check-circle" aria-hidden="true" style="color:#273679;margin-left: -1.0rem;margin-top:4px"></i>`;
      }else if (data == true && framework == "bigcommerce"){
        document.getElementById("bigcommerce_img").style.border = "1px solid #273679";
        document.getElementById("bigcommerce_img").style.borderRadius = "0.4rem";
        document.getElementById("check_btn_bigcommerce").innerHTML = `<i class="fa fa-check-circle" aria-hidden="true" style="color:#273679;margin-left: -1.0rem;margin-top:4px"></i>`;
      }
    })
  },
  watch: {
    website_name(newVal){
      if(newVal === "Shopify"){
        this.widget_code = this.widget_shopify_code;
      } else if(newVal === "Bigcommerce") {
        this.widget_code = this.widget_bigcommerce_code;
      } else {
        this.widget_code = this.widget_general_code;
      }
    }
  },
  methods: {
    get_integration_details() {
      this.big_spinner = true;
      axios
        .post(
          api_calls.chatbot_integration_details(),
          {
            is_get: true,
            company_name: this.$session.get("UserInformation").company_name,
            company_id: this.$session.get("UserInformation").company_id,
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
          this.retail_web_framework = response.data.data.retail_web_framework;
          if (response.data.message.MSG_CODE === this.api_status_code.DATA_AVAILABLE.MSG_CODE) {
            if ("shopify_details" in response.data.data) {
              var is_integrated = true;
              this.$root.$emit('framework_integrated',is_integrated, "shopify");
            }else if ("woocommerce_details" in response.data.data){
              var is_integrated = true;
              this.$root.$emit('framework_integrated',is_integrated, "woocommerce");
            }else if ("magento_details" in response.data.data){
              var is_integrated = true;
              this.$root.$emit('framework_integrated',is_integrated, "magento");
            }else if ("bigcommerce_details" in response.data.data){
              var is_integrated = true;
              this.$root.$emit('framework_integrated',is_integrated, "bigcommerce");
            }
          }else if (this.api_status_code.EMPTY_DATA.MSG_CODE == response.data.message.MSG_CODE) {

          }
          else {
            Swal({
              title:response.data.message.MSG_CODE,
              text:response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              toast: true,
              position: "top-end",
              timer: 2500,
              type: "error"
            })
          }
        })
        .catch((e) => {
          this.big_spinner = false;
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    change_company_domain(){
      if(this.is_retail === false){
        Swal({
          type: "question",
          title: this.tlt('web_framework_swal_alert_msg'),
          html: this.tlt('web_framework_switch_retail_company_msg'),
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          confirmButtonText: this.tlt('web_framework_swal_proceed_btn'),
          cancelButtonText: this.tlt('web_framework_swal_cancel_btn'),
          cancelButtonColor: '#ff1a1a',
        }).then((result)=> {
          if(result.value == true){
              this.big_spinner = true;
              axios.post(api_calls.convert_to_retail(),
              {
                company_name: this.$session.get("UserInformation").company_name,
                company_id: this.$session.get("UserInformation").company_id,
                email: this.$session.get("UserInformation").email,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`
                }
              } 
            ).then((response)=>{
              this.big_spinner = false;
              if(response.data.message.MSG_CODE === this.api_status_code.REGISTRATION_SUCCESSFUL_1012.MSG_CODE){
                Swal({
                  type: "success",
                  text: this.tlt('web_framework_redirect_to_setup_msg'),
                  showConfirmButton: true,
                });
                this.$session.set("ChatbotMenu", response.data.data.UserMenu);
                this.$session.set("RestrictionList", response.data.data.RestrictServiceList);
                this.$session.set("BotTemplates", response.data.data.templates);
                this.$router.push("/bot/dashboard");
              } else if(response.data.message.MSG_CODE === this.api_status_code.USER_DOES_NOT_EXIST_1027.MSG_CODE){
                  Swal({
                    type: "warning",
                    text: this.tlt('web_framework_account_do_not_exist_msg'),
                    timer: 3500      
                  });
              } else if(response.data.message.MSG_CODE === this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE){
                  Swal({
                    type: "error",
                    text: this.tlt('web_framework_internal_server_msg1'),
                    timer: 2500
                  });
                }else {
                  Swal({
                    title:response.data.message.MSG_CODE,
                    text:response.data.message.MSG,
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 2500,
                    type: "error"
                  })
                }
            }).catch(e => {
                this.spinnerOn = false;
              if (
                e.response.status === 410 ||
                e.response.status === 440 ||
                e.response.status === 409
              ) {
                this.$root.$emit("Session_Expired", e.response.data);
              } else {
                Swal({
                  type: "error",
                  text: this.tlt('web_framework_internal_server_msg2'),
                  timer: 2500
                });
              }
            })
          }
        });
      }
    },
    copy_widget_code() {
      this.$refs.widget_textarea.select();
      document.execCommand("copy");
      $("#copy_code_tooltip").tooltip("show");
      setTimeout(() => {
        $("#copy_code_tooltip").tooltip("dispose");
        this.initialize_tooltips();
      }, 5000);
    },
    initialize_tooltips() {
      $('[data-tooltip="tooltip"]').tooltip({
        trigger: "manual",
      });
    },
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
/* .step-progress__step--active .step-progress__step-label,
.step-progress__step--active span {
  padding: 0 1rem;
}
.step-progress__step--valid .step-progress__step-label:first-child {
  margin: 0 1rem;
} */
.step-progress__step-label {
  white-space: normal;
}
</style>

<style scoped>
#refresh_span svg path {
  fill: #9e9e9e;
}
.domain-link-style{
  float: right;
  color: white !important;
  background: #273679;
  border: 1px solid #273679;
  font-size: 14px;
  border-radius: 4px;
  padding: 6px 15px;
}
.domain-link-style:hover{
  cursor: pointer;
  background: #fff;
  color: #273679 !important;
  border: 1px solid #273679;
}
@media (min-width: 768px) {
  .dash-modal .modal-dialog {
    max-width: 1030px;
  }
}
@media (max-width: 1400px) {
  .miscellaneous-custom-file-input {
    padding: 15px 25px 15px 60px;
  } 
}
.col-sm-3{
  max-width: 24%;
}
/* .vr {
  border-left: 1px solid #E9E9E9;
  margin-top: 5%;
  margin-bottom: 5%; */
/* } */
.hclass6 {
  font-weight: 100;
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
</style>

<style  src="vue-multiselect/dist/vue-multiselect.min.css">
</style>