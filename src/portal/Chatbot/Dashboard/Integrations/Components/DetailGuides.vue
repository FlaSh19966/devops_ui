<template>
  <div>
    <div class="spinner" id="spinner" v-show="big_spinner"></div>
    <div
      v-if="
        (shopify_details_saved &&
          shopify_sync_status === 'Sync Finished' &&
          website_name == 'Shopify' &&
          !is_shopify_public_app_for_company) ||
          (website_name !== 'Shopify' && website_name !== 'Magento' && website_name != 'Bigcommerce' )
      "
    >
      <h5>{{tlt('detail_guide')}}:</h5>
      <ol class="pl-3">
        <li v-if="website_name == 'Woocommerce'">
          {{tlt('woocommerce_key_label')}}:
          <i
            class="far fa-copy"
            style="cursor: pointer"
            id="copy_licnse_key_tooltip"
            data-toggle="tooltip"
            data-placement="top"
            title="Copied to clipboard!"
            @click="copy_license_key"
          ></i> 
           <textarea
            class="form-control"
            ref="license_key_textarea"
            name="license_key"
            id="license_key"
            v-model="$session.get('UserInformation').license_key"
            readonly
            style="width: 80%; padding: 10px 15px"
            rows="3"
          ></textarea>
        </li>
        <li class="mb-2" v-else>
          {{tlt('woocommerce_copy_label')}}
          <div class="form-group mb-2 mr-5">
            <textarea
              class="form-control"
              v-model="widget_code"
              rows="7"
              ref="widget_textarea"
              readonly
            ></textarea>
          </div>
          <div class="btn-wrap text-left mt-0 pt-0">
            <button
              type="click"
              class="darkblue-btn ml-0"
              id="copy_code_tooltip"
              data-toggle="tooltip"
              data-placement="top"
              title="Copied to clipboard!"
              @click="copy_widget_code"
            >
              Copy
            </button>
          </div>
        </li>
        <li>
          <template v-if="website_name == 'Shopify'">
            {{tlt('shopify_steps_guide')}}
            <a href="https://cense.ai/integrations/shopify" target="_blank"
              >{{tlt('shopify_steps_guide_here')}}</a
            >
          </template>
          <template v-if="website_name == 'Woocommerce'">
            {{tlt('woocommerce_steps_guide')}}
            <a href="https://cense.ai/integrations/wordpress" target="_blank"
              >{{tlt('woocommerce_steps_guide_here')}}</a
            >
          </template>
          <template v-if="website_name == 'Magento'">
            {{tlt('magento_steps_guide')}}
            <a href="https://cense.ai/integrations/magento" target="_blank"
              >{{tlt('magento_steps_guide_here')}}</a
            >
          </template>
          <template v-if="website_name == 'Squarespace'">
            {{tlt('Squarespace_steps_guide')}}
            <a href="https://cense.ai/documentation/squarespace" target="_blank"
              >{{tlt('Squarespace_steps_guide_here')}}</a
            >
          </template>
          <template v-if="website_name == 'Weebly'">
            {{tlt('Weebly_steps_guide')}}
            <a href="https://cense.ai/documentation/weebly" target="_blank"
              >{{tlt('Weebly_steps_guide_here')}}</a
            >
          </template>
          <template v-if="website_name == 'Wix'">
            {{tlt('Wix_steps_guide')}}
            <a href="https://cense.ai/documentation/wix" target="_blank"
              >{{tlt('Wix_steps_guide_here')}}</a
            >
          </template>
          <template v-if="website_name == 'Bigcommerce'">
            {{tlt('Bigcommerce_steps_guide')}}
            <a href="https://cense.ai/documentation/bigcommerce" target="_blank"
              >{{tlt('Bigcommerce_steps_guide_here')}}</a
            >
          </template>
        </li>
      </ol>
    </div>
    <div
      v-if="
        shopify_details_saved &&
        shopify_sync_status === 'Sync Finished' &&
        website_name == 'Shopify' &&
        is_shopify_public_app_for_company
      "
      style="margin-bottom: 1rem"
    >

      <h4>Add Widget to Store Website</h4>
      <!-- <p>
          (This will add the cense widget to your online store's website. You can do this anytime later as well.)
        </p>
        <button class="darkblue-btn ml-0" @click="add_widget_to_store" v-if="!Boolean(is_widget_added_to_website.added)">
          Add Widget
        </button>  
        <div v-else>
          <p>
            Widget Code Added to Your Website! <i class="fa fa-check" aria-hidden="true"></i>
          </p>
        </div> -->
      Follow these steps to activate the Cense Widget on your website:
      <ol>
        <li>
          From your Shopify admin, go to <strong>Online Store</strong> &gt;
          <strong>Themes</strong>.
        </li>
        <li>
          Find the theme that you want to edit, and then click
          <strong>Customize</strong>.
        </li>
        <li>Click <strong>Theme settings</strong>.</li>
        <li>Click the <strong>App embeds</strong> tab.</li>
        <li>
          You will see the <strong> Cense AI Assistant </strong> embed.
        </li>
        <li>
          Click on the expand icon besides the name of the App to open its settings where
          you'll have to enter <strong>License Key</strong>.
        </li>
        <li>
          Copy the <strong>License Key</strong> from below and paste it in the
          text box.
        </li>
        <li>
          To activate the Cense AI Assistant on your store website, click the
          <strong> toggle </strong> to activate it.
        </li>
        <li>
          You can deactivate the Cense AI Assistant on your store website anytime you wish, you just have to click the
          <strong> toggle </strong> again to deactivate it.
        </li>
      </ol>
      <div class="col-sm-8">
        <div style="width: auto">
          <h5 class="mb-sm-0" style="display: inline">
            License Key
            <i
              class="far fa-copy"
              style="cursor: pointer"
              id="copy_licnse_key_tooltip"
              data-toggle="tooltip"
              data-placement="top"
              title="Copied to clipboard!"
              @click="copy_license_key"
            ></i>
          </h5>
        </div>
        <textarea
          class="form-control"
          ref="license_key_textarea"
          name="license_key"
          id="license_key"
          v-model="current_license_key"
          readonly
          style="width: 100%; padding: 10px 15px"
          rows="4"
        ></textarea>
      </div>
    </div>
    <div
      v-if="
        magento_details_saved &&
        magento_sync_status === 'Sync Finished' &&
        website_name == 'Magento'
      "
      style="margin-bottom: 1rem"
    >
      <h4>{{tlt('magento_setting_add_cense_header')}}</h4>
      {{tlt('magento_setting_activate_bot_text')}}:
      <ol>
        <li>
          {{tlt('magento_setting_instruct_one')}}
          <ol>
          <li>{{tlt('magento_setting_instruct_two')}}</li>
          <li>{{tlt('magento_setting_instruct_three')}}</li>
          </ol>
        </li>
        <li>
          {{tlt('magento_setting_instruct_four')}}
        </li>
        <li>{{tlt('magento_setting_instruct_five')}} <strong>{{tlt('magento_setting_instruct_six')}}</strong> {{tlt('magento_setting_instruct_seven')}}</li>
        <li>{{tlt('magento_setting_instruct_eight')}}</li>
      </ol>
      <div class="col-sm-8">
        <div style="width: auto">
          <h5 class="mb-sm-0" style="display: inline">
            {{tlt('magento_setting_license_key_header')}}
            <i
              class="far fa-copy"
              style="cursor: pointer"
              id="copy_licnse_key_tooltip"
              data-toggle="tooltip"
              data-placement="top"
              title="Copied to clipboard!"
              @click="copy_license_key"
            ></i>
          </h5>
        </div>
        <textarea
          class="form-control"
          ref="license_key_textarea"
          name="license_key"
          id="license_key"
          v-model="current_license_key"
          readonly
          style="width: 100%; padding: 10px 15px"
          rows="4"
        ></textarea>
      </div>
    </div>
    <div
      v-if="
        bigcommerce_details_saved &&
        bigcommerce_sync_status === 'Sync Finished' &&
        website_name == 'Bigcommerce'
      "
      style="margin-bottom: 1rem"
    >
      <h4>BigCommerce</h4>
      <!-- {{tlt('bigcommerce_setting_instruct_header')}}: -->
      <ol>
        <li v-html="tlt('bigcommerce_setting_instruct_one')">
        </li>
        <li v-html="tlt('bigcommerce_setting_instruct_two')">
        </li>
        <li v-html="tlt('bigcommerce_setting_instruct_three')">
        </li>
        <li v-html="tlt('bigcommerce_setting_instruct_four')">
        </li>
        <li v-html="tlt('bigcommerce_setting_instruct_five')">
        </li>
        <li v-html="tlt('bigcommerce_setting_instruct_six')">
        </li>
        <li v-html="tlt('bigcommerce_setting_instruct_seven')">
        </li>
        <li v-html="tlt('bigcommerce_setting_instruct_eight')">
        </li>
      </ol>
      <div class="col-sm-8">
        <div class="form-group mb-2 mr-5">
          <textarea
            class="form-control"
            v-model="widget_code"
            style="padding: 15px 25px 15px 25px;"
            rows="4"
            ref="widget_textarea"
            readonly
          ></textarea>
        </div>
        <div class="btn-wrap text-left mt-0 pt-0">
          <button
            type="click"
            class="darkblue-btn ml-0"
            id="copy_code_tooltip"
            data-toggle="tooltip"
            data-placement="top"
            title="Copied to clipboard!"
            @click="copy_widget_code"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { bus } from "@/portal/main";
import axios from "axios";
import api_calls from "@/portal/api_calls";
import swal from "sweetalert2";
export default {
  name: "ShopifyDetails",
  data() {
    return {
      shopify_sync_status: "",
      shopify_details_saved: "",
      woocommerce_sync_status: "",
      woocommerce_details_saved: "",
      magento_sync_status: "",
      magento_details_saved: "",
      bigcommerce_sync_status: "",
      bigcommerce_details_saved: "",
      widget_code: "",
      widget_shopify_code: "",
      widget_bigcommerce_code: "",
      widget_general_code: "",
      companyname: this.$session.get("UserInformation").company_name,
      companyid: this.$session.get("UserInformation").company_id,
      is_shopify_public_app_for_company: false,
      big_spinner: false,
      is_widget_added_to_website: null,
      retail_web_framework: "",
      current_license_key: this.$session.get("UserInformation").license_key,
    };
  },
  props: {
    website_name: {
      type: String,
      default: "",
    },
  },
  mounted() {
    this.get_integration_details();
    this.initialize_tooltips();
    this.widget_general_code =
      `<link href="https://resource.cense.ai/css/app.css" rel="stylesheet"> <bot-chat></bot-chat> <script src="https://resource.cense.ai/js/app.js"><\/script> <script>var widget=GenerateWidget({source:'Web',license_key:'${
        this.$session.get("UserInformation").license_key
      }'})<\/script>`.toString();
    this.widget_shopify_code =
      `<link href="https://resource.cense.ai/css/app.css" rel="stylesheet"> <bot-chat></bot-chat> <script src="https://resource.cense.ai/js/app.js"><\/script> <script src="https://resource.cense.ai/js/shopify.js"><\/script> <script>var widget=GenerateWidget({source:'Web',license_key:'${
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
    bus.$on("shopify_sync_status", (data) => {
      if (this.shopify_sync_status !== "Sync Finished") {
        this.shopify_sync_status = data;
      }
    });
    bus.$on("shopify_details_saved", (data) => {
      this.shopify_details_saved = data;
    });
  },
  watch: {
    website_name(newVal) {
      if (newVal === "Shopify") {
        this.widget_code = this.widget_shopify_code;
      } else if(newVal === "Bigcommerce") {
        this.widget_code = this.widget_bigcommerce_code;
      } else {
        this.widget_code = this.widget_general_code;
      }
    },
  },
  methods: {
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
            this.retail_web_framework = response.data.data.retail_web_framework;
            this.$session.set("retail_web_framework", this.retail_web_framework);
            if (this.retail_web_framework == "shopify") {
              if (response.data.data.shopify_details !== null) {
                this.is_shopify_public_app_for_company =
                  response.data.data.shopify_details.shopify_public_app_installed;
                this.is_widget_added_to_website =
                  response.data.data.shopify_details.widget_on_website || false;
                  this.shopify_sync_status = "Sync Finished";
                  this.shopify_details_saved = true;
              }
            }else if (this.retail_web_framework == "woocommerce"){
              this.woocommerce_sync_status = "Sync Finished";
              this.woocommerce_details_saved = true;
            }else if (this.retail_web_framework == "magento"){
              this.magento_sync_status = "Sync Finished";
              this.magento_details_saved = true;
            }else if (this.retail_web_framework == "bigcommerce"){
              this.bigcommerce_sync_status = "Sync Finished";
              this.bigcommerce_details_saved = true;
              this.widget_code = this.widget_bigcommerce_code;
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
    add_widget_to_store() {
      swal({
        title: "Are you sure",
        type: "question",
        text: "This action will add the Cense Chatbot Widget to your Online Store.",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Add!!",
      }).then((result) => {
        if (result.value) {
          this.big_spinner = true;
          axios
            .post(
              api_calls.add_widget_code_to_shopify_store(),
              {
                company_id: this.companyid,
                company_name: this.companyname,
                license_key: this.$session.get("UserInformation").license_key,
                is_add: true,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.big_spinner = false;
              if (response.data.message.MSG_CODE === this.api_status_code.STATUS_SUCCESS.MSG_CODE) {
                this.get_integration_details();
                swal({
                  title: "Added Successfully!!",
                  text: "The Widget Code has been added to your store!!",
                  showCancelButton: false,
                  type: "success",
                });
              } else {
                this.get_integration_details();
                swal({
                  type: "error",
                  title: "Some Error Occurred!!",
                  showCancelButton: false,
                  html: `<p> We encountered an error while adding the code to your website. Please try again. If this error persits, kindly contact admin 
                at <a href="mailto:hello@cense.ai">hello@cense.ai</a> for further help.</p>`,
                });
              }
            })
            .catch((e) => {
              this.big_spinner = false;
              if (Boolean(e.response)) {
                if (
                  e.response.status === 410 ||
                  e.response.status === 440 ||
                  e.response.status === 409
                ) {
                  this.$root.$emit("Session_Expired", e.response.data);
                }
                swal({
                  type: "error",
                  title: "Some Error Occurred!!",
                  showCancelButton: false,
                  html: `Please try again.`,
                });
              } else {
                swal({
                  type: "error",
                  title: "Some Error Occurred!!",
                  showCancelButton: false,
                  html: `<p> We encountered an error while adding the code to your website. Please try again. If this error persits, kindly contact admin 
                at <a href="mailto:hello@cense.ai">hello@cense.ai</a> for further help.</p>`,
                });
              }
            });
        }
      });
    },
    copy_license_key() {
      this.$refs.license_key_textarea.select();
      this.$refs.license_key_textarea.setSelectionRange(0, 99999);
      document.execCommand("copy");
      $("#copy_licnse_key_tooltip").tooltip("show");
      setTimeout(() => {
        $("#copy_licnse_key_tooltip").tooltip("dispose");
        this.initialize_tooltips();
      }, 5000);
    },
  },
};
</script>