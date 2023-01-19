<template>
  <div>
    <div class="card dash-card">
      <div
        class="tab-pane fade active show"
        id="others"
        role="tabpanel"
        aria-labelledby="others-tab"
      >
        <div class="col-sm-12 d-flex mt-5">
          <div
            class="col-sm-6"
            style="
              border-right: 1px solid rgb(234, 234, 234);
              margin-bottom: 1rem;
            "
          >
            <div style="width: auto">
              <h5 class="mb-sm-0" style="display: inline">
                {{ tlt("license_key_label") }}
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
              <!-- <a
                      href="#"
                      style="font-size: 16px; margin-left: 5%"
                      @click="download_sdk('license_key')"
                      >Download Here</a
                    >
                    <i class="fa fa-spinner fa-spin" v-show="spinnerOn1"></i> -->
            </div>
            <textarea
              class="form-control"
              ref="license_key_textarea"
              name="license_key"
              id="license_key"
              v-model="current_license_key"
              readonly
              style="width: 100%; padding: 10px 15px"
              rows="3"
            ></textarea>
            <!-- <div contenteditable="true">{{current_license_key}} </div> -->
          </div>
          <div class="col-sm-6">
            <h5 class="mb-sm-0">
              {{ tlt("download_bot_label") }}
              <i class="fa fa-spinner fa-spin" v-show="spinnerOn2"></i>
            </h5>
            <a
              id="download_sdk_android"
              href="#"
              style="margin-top: 2%; margin-left: 3%"
              class="darkblue-btn1"
              @click="download_sdk('Android')"
            >
              <svg
                style="fill: #fff"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0z" fill="#273679" />
                <path
                  d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"
                />
              </svg>
              <span style="margin-left: 3%">{{
                tlt("download_on_android_label")
              }}</span>
            </a>
            <a
              href="#"
              class="darkblue-btn1"
              @click="download_sdk('Ios')"
              id="download_sdk_IOS"
            >
              <svg
                style="fill: #fff; margin-left: -10px; margin-top: -1px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 170 170"
                width="24"
                version="1.1"
                height="24"
              >
                <path d="M0 0h24v24H0z" fill="#273679" />
                <path
                  d="m150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.197-2.12-9.973-3.17-14.34-3.17-4.58 0-9.492 1.05-14.746 3.17-5.262 2.13-9.501 3.24-12.742 3.35-4.929 0.21-9.842-1.96-14.746-6.52-3.13-2.73-7.045-7.41-11.735-14.04-5.032-7.08-9.169-15.29-12.41-24.65-3.471-10.11-5.211-19.9-5.211-29.378 0-10.857 2.346-20.221 7.045-28.068 3.693-6.303 8.606-11.275 14.755-14.925s12.793-5.51 19.948-5.629c3.915 0 9.049 1.211 15.429 3.591 6.362 2.388 10.447 3.599 12.238 3.599 1.339 0 5.877-1.416 13.57-4.239 7.275-2.618 13.415-3.702 18.445-3.275 13.63 1.1 23.87 6.473 30.68 16.153-12.19 7.386-18.22 17.731-18.1 31.002 0.11 10.337 3.86 18.939 11.23 25.769 3.34 3.17 7.07 5.62 11.22 7.36-0.9 2.61-1.85 5.11-2.86 7.51zm-31.26-123.01c0 8.1021-2.96 15.667-8.86 22.669-7.12 8.324-15.732 13.134-25.071 12.375-0.119-0.972-0.188-1.995-0.188-3.07 0-7.778 3.386-16.102 9.399-22.908 3.002-3.446 6.82-6.3113 11.45-8.597 4.62-2.2516 8.99-3.4968 13.1-3.71 0.12 1.0831 0.17 2.1663 0.17 3.2409z"
                />
              </svg>
              <span style="margin-left: 3%">{{
                tlt("download_on_ios_label")
              }}</span>
            </a>

            <a
              href="https://cense.ai/documentation/docs_web"
              class="darkblue-btn1"
              id="download_sdk_web"
              target="_blank"
            >
              <svg
                style="fill: #fff; margin-left: -10px; margin-top: -1px"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0z" fill="#273679" />
                <path
                  d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7l-2 3v1h8v-1l-2-3h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H3V4h18v10z"
                />
              </svg>
              <span style="margin-left: 4%">{{
                tlt("download_on_web_label")
              }}</span>
            </a>
          </div>
        </div>
        <hr />
        <div class="col-sm-12 d-flex">
          <div class="form-group col-sm-6">
            <label
              style="
                margin-top: 1rem;
                font-size: 1.21rem;
                font-weight: 500;
                font-family: 'Fira Sans', sans-serif;
              "
              >{{ tlt("upload_logo_text") }}</label
            >
            <label class="form-text text-muted">
              {{ tlt("upload_logo_help_text") }}</label
            >
            <div class="custom-file">
              <input
                type="file"
                class="custom-file-input"
                @change="fileinput"
                id="input_company_file"
              />
              <label
                style="
                  font-weight: 400;
                  padding-left: 15px;
                  overflow: hidden;
                  white-space: nowrap;
                  line-height: 10px;
                  width: 97%;
                "
                class="custom-file-label form-control"
                for="file"
                >{{ file_label }}</label
              >
            </div>
            <div class="card-act btn-wrap mt-3 pt-3 pb-3">
              <button class="darkblue-btn" @click="upload_company_logo_file">
                {{ tlt("other_upload_logo_btn") }}
              </button>
            </div>
            <hr />
            <div class="form-group" v-show="!is_retail">
              <form @submit.prevent="configure_sender_email('email')">
                <div class="form-group">
                  <label
                    ><strong
                      style="
                        font-size: 1.21rem;
                        font-weight: 500;
                        font-family: 'Fira Sans', sans-serif;
                      "
                      >{{ tlt("sender_email_label") }}</strong
                    ></label
                  >
                  <label> {{ tlt("sender_email_text") }}</label>
                  <input
                    v-model="email_details"
                    type="email"
                    class="form-control mt-2"
                    :placeholder="tlt('enter_email_label')"
                    style="padding: 5px"
                    :disabled="email_disable == true || disable_btn_expired"
                    required
                  />
                </div>
                <div>
                  <p class="label1" v-if="email_disable == true">
                    <strong>{{ tlt("verify_status_label") }}:</strong>
                    <span
                      :style="
                        verification_status == 'Success'
                          ? 'color:#9acd32'
                          : 'color:#d9534f'
                      "
                    >
                      {{ verification_status }} </span
                    >&nbsp;
                    <img
                      title="Check Email Verification Status"
                      :src="reset_icon_path"
                      alt=""
                      style="float: inherit; cursor: pointer; padding-left: 5px"
                      @click="load_product_settings()"
                    />
                  </p>
                </div>
                <div class="dash-modal">
                  <div
                    class="
                      card-act
                      btn-wrap
                      text-right
                      mt-0
                      pt-0
                      pb-3
                      border-top-0
                    "
                  >
                    <button
                      id="product_setting_email_remove_btn"
                      type="button"
                      class="btn btn-danger"
                      style="display: text-center !important"
                      v-if="email_disable == true"
                      @click="configure_sender_email('email_remove')"
                    >
                      {{ tlt("setting_remove_btn") }}
                    </button>
                    <button
                      id="product_setting_email_save_btn"
                      type="submit"
                      style="display: inherit !important"
                      class="darkblue-btn"
                      v-else
                    >
                      {{ tlt("setting_save_btn") }}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="form-group contact-info col-sm-6" v-show="!is_retail">
            <label
              class="mb-sm-6 mt-4"
              style="
                margin-top: 1.1rem !important;
                font-family: 'Fira Sans', sans-serif;
                font-size: 1.2rem;
                font-weight: 500;
              "
              ><strong style="font-weight: 500">{{
                tlt("contact_email_label")
              }}</strong> </label
            ><br />
            <label> {{ tlt("contact_email_note") }} </label>
            <input
              v-model.trim="contact_us_email"
              type="email"
              class="form-control"
              :placeholder="tlt('enter_email')"
              style="padding: 5px"
              required
            />
            <div
              class="is-invalid"
              style="color: red; padding-top: 5px"
              v-if="validEmail != true && contact_us_email != ''"
            >
              {{ validEmail }}
            </div>
            <hr style="" />
            <label
              class="mb-sm-6 mt-4"
              style="
                margin-top: 0.3rem !important;
                font-family: 'Fira Sans', sans-serif;
                font-size: 1.2rem;
                font-weight: 500;
              "
              ><strong style="font-weight: 500">{{
                tlt("contact_phone_no_label")
              }}</strong> </label
            ><br />
            <label>
              {{ tlt("contact_phone_no_note") }}
            </label>
            <vue-phone-number-input
              style="margin-bottom: 1.1rem"
              v-model="contact_us_phone_number"
              :no-use-browser-locale="true"
              @update="phoneNumber = $event"
            >
            </vue-phone-number-input>
            <hr />
            <div
              class="card-act btn-wrap mt-2 pt-0 pb-3 border-top-0"
              style="margin-bottom: 0.4rem"
            >
              <button
                type="submit"
                style="display: text-center !important"
                class="darkblue-btn"
                @click="configure_product_settings"
              >
                {{ tlt("setting_save_btn1") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import axios from "axios";
import Swal from "sweetalert2";
import api_calls from "@/portal/api_calls";
import { freeze_portal,show_subscription_expired_swal } from "@/portal/mixins";

export default {
  name: "MiscellaneousPage",
  components: {
    VuePhoneNumberInput,
  },
  mixins: [freeze_portal, show_subscription_expired_swal],
  data() {
    return {
      email_details: null,
      email_disable: false,
      companyid: this.$session.get("UserInformation").company_id,
      companyname: this.$session.get("UserInformation").company_name,
      file_label: "Choose file",
      current_license_key: this.$session.get("UserInformation").license_key,
      spinnerOn1: false,
      spinnerOn2: false,
      old_image_name: null,
      disable_btn_expired: false,
      verification_status: null,
      reset_icon_path: require("@/portal/assets/img/reset_icon.svg"),
      is_retail: false,
      contact_us_phone_number: null,
      retail_web_framework : this.$session.get("retail_web_framework"),
      phoneNumber: null,
      contact_us_email: "",
      email_validity:
        /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/,
    };
  },
  created() {
    let bot_templates_data = this.$session.get("BotTemplates");
    for (let i = 0; i < bot_templates_data.length; i++) {
      if (
        bot_templates_data[i].domain === "Retail" &&
        bot_templates_data[i].subscribed === true
      ) {
        this.is_retail = true;
      }
    }
    setTimeout(() => {
      this.freeze_portal();
    }, 1000);
    this.$root.$on("MiscellaneousPageDisabled", (data) => {
      if (data === true) {
        this.disable_btn_expired = true;
      }
    });
  },
  mounted() {
    if (this.is_retail == true) {
      this.load_product_settings();
    }
    this.get_company_logo();
  },
  computed: {
    validEmail() {
      if (this.contact_us_email != null) {
        if (this.email_validity.test(this.contact_us_email)) {
          return true;
        } else {
          return this.tlt("other_enter_valid_email_msg");
        }
      }
    },
  },
  methods: {
    configure_product_settings() {
      event.preventDefault();
      if (this.validEmail != true && !Boolean(this.phoneNumber) ) {
        Swal({
          text: this.tlt('other_valid_email_or_number_msg'),
          type: "warning",
          timer: 3000,
        });
        return;
      }
      // if (!Boolean(this.phoneNumber)) {
      //   Swal({
      //     text: "Please enter a valid Phone Number",
      //     type: "warning",
      //     timer: 3000,
      //   });
      //   return;
      // else if (this.phoneNumber.isValid != true) {
      //   Swal({
      //     text: "Please enter a valid Phone Number",
      //     type: "warning",
      //     timer: 3000,
      //   });
      //   return;
      // }
      this.big_spinner = true;
      axios
        .post(
          api_calls.product_settings(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            is_email_required: true,
            email_required: {
              contact_help_email: this.contact_us_email,
              contact_us_phone_number: (Boolean(this.phoneNumber) && this.phoneNumber.isValid == true) ? this.phoneNumber.formattedNumber : null,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          this.big_spinner = false;
          if (response.data.message.MSG_CODE === this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE) {
            Swal({
              text: this.tlt('other_changes_saved_msg'),
              type: "success",
              timer: 4000,
            });
            this.empty_variable();
            this.load_product_settings();
          } else {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              timer: 2500,
              type: "error"
            });
          }
        })
        .catch((e) => {
          this.big_spinner = false;
          toastr.error(this.tlt('other_error_occur_msg4'));
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    load_product_settings() {
      this.big_spinner = true;
      axios
        .post(
          api_calls.product_settings(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            is_get: true,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          if (
            response.data.message.MSG_CODE ===
            this.api_status_code.DATA_AVAILABLE.MSG_CODE
          ) {
            this.big_spinner = false;
            var webframework = this.retail_web_framework;
            if (webframework === null || webframework === undefined) {
              webframework = undefined;
            }
            if (
              response.data.message.MSG_CODE !=
                this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE &&
              response.data.message.MSG_CODE !=
                this.api_status_code.EMPTY_DATA.MSG_CODE
            ) {
              this.contact_us_email =
                webframework === undefined
                  ? response.data.data.details.contact_help_email
                  : response.data.data[webframework + "_details"]
                      .contact_help_email;
              this.contact_us_phone_number =
                webframework === undefined
                  ? response.data.data.details.contact_us_phone_number
                  : response.data.data[webframework + "_details"]
                      .contact_us_phone_number;
              this.email_details =
                webframework === undefined
                  ? response.data.data.details.sender_email
                  : response.data.data[webframework + "_details"].sender_email;
              this.email_verification_status();
            }
          } else {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              timer: 2500,
              type: "error",
            });
          }
        })
        .catch((e) => {
          this.big_spinner = false;
          toastr.error(this.tlt("other_error_occur_msg"));
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    email_verification_status() {
      if (this.email_details != null && this.email_details != "") {
        this.email_disable = true;
        this.big_spinner = true;
        axios
          .post(
            api_calls.product_settings(),
            {
              company_name: this.companyname,
              company_id: this.companyid,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              is_email_verification_status: true,
              email_id: this.email_details,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            this.big_spinner = false;
            if (
              response.data.message.MSG_CODE !=
                this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE &&
              response.data.message.MSG_CODE !=
                this.api_status_code.NO_DATA_AVAILABLE.MSG_CODE
            ) {
              var status = response.data.data.verification_status;
              this.verification_status =
                status == "Success"
                  ? "Success"
                  : status == "Pending"
                  ? this.tlt("other_pending_verify_email_msg")
                  : status + this.tlt("other_link_expired_msg");
            } else {
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                timer: 2500,
                type: "error",
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
              this.$root.$emit("Session_Expired", e.response.data);
            }
          });
      }
    },
    initialize_tooltips() {
      $('[data-tooltip="tooltip"]').tooltip({
        trigger: "manual",
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
    fileinput(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (files[0].size > 2097152) {
        Swal({
          text: this.tlt("other_upload_company_logo_msg"),
          toast: true,
          position: "top-end",
          type: "error",
          showConfirmButton: false,
          timer: 10000,
        });
        return;
      }
      if (files[0].type === "image/png" || files[0].type === "image/jpeg") {
        if (!files.length) return;
        this.old_image_name = this.file_label;
        this.file_label = files[0].name;
        this.createImage(files[0]);
      } else {
        Swal({
          text: this.tlt("other_select_img_type_msg"),
          type: "error",
          timer: 2500,
        });
      }
    },
    createImage(file, type) {
      let reader = new FileReader();

      reader.onload = (e) => {
        this.image_file = e.target.result.split("base64,")[1];
      };
      reader.readAsDataURL(file);
    },
    get_company_logo() {
      axios
        .post(
          api_calls.upload_company_logo(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            is_get: true,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          if (
            response.data.message.MSG_CODE ===
            this.api_status_code.COMPANY_IMAGE_URL_RECEIVED.MSG_CODE
          ) {
            this.file_label = response.data.data.company_image_url
              .split("/")
              .reverse()[0];
            this.file_label = decodeURI(this.file_label);
            this.old_image_name = this.file_label;
            if (this.file_label == "") {
              this.file_label = "Choose file";
            }
          } else if (
            response.data.message.MSG_CODE ===
            this.api_status_code.DATA_NOT_FOUND.MSG_CODE
          ) {
          } else {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              timer: 2500,
              type: "error",
            });
          }
        })
        .catch((e) => {
          console.log(e);
          this.file_label = "Choose file";
          document.getElementById("input_company_file").value = "";
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    upload_company_logo_file() {
      if (
        this.file_label == this.old_image_name ||
        document.getElementById("input_company_file").value == ""
      ) {
        Swal({
          text: this.tlt("other_select_file_msg"),
          type: "error",
          timer: 2500,
        });
      } else {
        this.big_spinner = true;
        axios
          .post(
            api_calls.upload_company_logo(),
            {
              company_id: this.$session.get("UserInformation").company_id,
              company_name: this.$session.get("UserInformation").company_name,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              image_name: this.file_label,
              company_logo_file: this.image_file,
              is_image_edit:
                this.file_label != this.old_image_name ? true : false,
              old_image_name:
                this.old_image_name == "Choose File"
                  ? null
                  : this.old_image_name,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            this.big_spinner = false;
            this.get_company_logo();
            if (
              response.data.message.MSG_CODE ===
              this.api_status_code.IMG_DUPLICATE.MSG_CODE
            ) {
              document.getElementById("input_company_file").value = "";
              // toastr.error(
              //   "Image already found. Please upload another image or rename it."
              // );
              Swal({
                text: this.tlt("other_img_already_found_msg"),
                type: "error",
                timer: 3000,
              });
            } else if (
              response.data.message.MSG_CODE ===
              this.api_status_code.COMPANY_LOGO_UPDATED.MSG_CODE
            ) {
              Swal({
                text: this.tlt("other_logo_upload_successful_msg"),
                type: "success",
                timer: 2500,
              });
            } else {
              document.getElementById("input_company_file").value = "";
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                timer: 2500,
                type: "error",
              });
            }
          })
          .catch((e) => {
            Swal({
              text: this.tlt("other_error_occur_msg3"),
              type: "error",
              timer: 2500,
            });
            this.get_company_logo();
            this.big_spinner = false;
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
    download_sdk(data_type) {
      if (data_type == "license_key") {
        this.spinnerOn1 = true;
        axios({
          method: "post",
          url: api_calls.get_license_key(),
          responseType: "blob",
          data: {
            company_id: this.$session.get("UserInformation").company_id,
            company_name: this.$session.get("UserInformation").company_name,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            email: this.$session.get("UserInformation").email,
          },
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          },
        })
          .then((response) => {
            var url = window.URL.createObjectURL(new Blob([response.data]));
            var link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", data_type + ".txt");
            document.body.appendChild(link);
            link.click();
            this.spinnerOn1 = false;
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
        this.spinnerOn2 = true;
        axios({
          method: "post",
          url: api_calls.file_download_url(),
          responseType: "blob",
          data: {
            download_sdk_type: data_type,
            company_id: this.$session.get("UserInformation").company_id,
            company_name: this.$session.get("UserInformation").company_name,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            email: this.$session.get("UserInformation").email,
          },
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          },
        })
          .then((response) => {
            this.spinnerOn2 = false;
            // if (
            //   response.data.message.MSG_CODE ===
            //   this.api_status_code.STATUS_SUCCESS.MSG_CODE
            // ) {
              // toastr.error(this.tlt("other_internal_error_msg1"));
            if (response.data.message.MSG_CODE ===
              this.api_status_code.INVALID_PARAMETER.MSG_CODE) {
                Swal({
                  text: this.tlt("other_error_occur_msg3"),
                  type: "error",
                  timer: 2500,
                  toast: true,
                  position: "top-end",
                });
            }else if(response.data.message.MSG_CODE ===
              this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
                Swal({
                  text: this.tlt("other_error_occur_msg3"),
                  type: "error",
                  toast: true,
                  position: "top-end",
                  timer: 2500,
                });
            }else {
              var url = window.URL.createObjectURL(new Blob([response.data]));
              var link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", data_type + "_SDK.zip");
              document.body.appendChild(link);
              link.click();
            }
          })
          .catch((e) => {
            this.spinnerOn2 = false;
            toastr.error(this.tlt("other_internal_error_msg2"));
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
    configure_sender_email(value) {
      if (value == "email") {
        Swal.fire({
          title: this.tlt("other_configure_email_swal_msg"),
          text: this.tlt("other_verification_link_msg"),
          type: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: this.tlt("other_swal_proceed_msg"),
        }).then((result) => {
          if (result.value) {
            this.big_spinner = true;
            axios
              .post(
                api_calls.product_settings(),
                {
                  company_name: this.companyname,
                  company_id: this.companyid,
                  email: this.$session.get("UserInformation").email,
                  license_key: this.$session.get("UserInformation").license_key,
                  token: this.$session.get("UserInformation").tokens,
                  is_email: true,
                  email_id: this.email_details,
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.$session.get("at")}`,
                  },
                }
              )
              .then((response) => {
                this.big_spinner = false;
                if (
                  response.data.message.MSG_CODE ==
                  this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE
                ) {
                  Swal({
                    text:
                      this.tlt("other_email_send_to_msg") +
                      " " +
                      this.tlt("other_user_email_details_msg") +
                      this.tlt("other_check_your_email_msg"),
                    type: "success",
                    title: this.tlt("other_success_swal_btn1"),
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                  });
                  this.email_disable = true;
                  this.email_verification_status();
                  this.load_product_settings();
                } else {
                  Swal({
                    title: response.data.message.MSG_CODE,
                    text: response.data.message.MSG,
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 2500,
                    type: "error",
                  });
                }
              })
              .catch((e) => {
                this.big_spinner = false;
                toastr.error(this.tlt("other_error_occur_msg"));
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
      } else if (value == "email_remove") {
        Swal.fire({
          title: this.tlt("other_swal_alert_msg1"),
          text: this.tlt("other_removed_saved_email_msg"),
          type: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: this.tlt("other_swal_remove_msg"),
        }).then((result) => {
          if (result.value) {
            this.big_spinner = true;
            axios
              .post(
                api_calls.product_settings(),
                {
                  company_name: this.companyname,
                  company_id: this.companyid,
                  email: this.$session.get("UserInformation").email,
                  license_key: this.$session.get("UserInformation").license_key,
                  token: this.$session.get("UserInformation").tokens,
                  is_remove_email: true,
                  email_id: this.email_details,
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.$session.get("at")}`,
                  },
                }
              )
              .then((response) => {
                this.big_spinner = false;
                if (
                  response.data.message.MSG_CODE !=
                  this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE
                ) {
                  Swal({
                    text: this.tlt("other_email_removed_swal_msg"),
                    type: "success",
                    timer: 5000,
                    title: this.tlt("other_success_swal_btn2"),
                  });
                  this.email_disable = false;
                  this.email_details = null;
                  this.empty_variable();
                  this.load_product_settings();
                } else {
                  Swal({
                    title: response.data.message.MSG_CODE,
                    text: response.data.message.MSG,
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 2500,
                    type: "error",
                  });
                }
              })
              .catch((e) => {
                this.big_spinner = false;
                toastr.error(this.tlt("other_error_occur_msg2"));
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
      }
    },
  },
};
</script>

<style scoped>
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
</style>