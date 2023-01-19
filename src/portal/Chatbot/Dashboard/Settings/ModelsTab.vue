<template>
  <div>
    <div class="spinner" id="spinner" v-show="big_spinner"></div>
    <div class="card dash-card">
      <div
        id="trained_intent_models_radio"
        class="col-sm-12 d-flex mt-4"
        style="padding-left: 0px"
      >
        <div
          class="col-sm-4"
          style="border-right: 1px solid rgb(234, 234, 234);"
        >
          <div style="width: auto">
            <h5 class="mb-sm-0 text-center" style="">
              {{ tlt("intent_model_header") }}
            </h5>
            <div class="table-box text-center">
              <div
                class="table-responsive"
                v-if="
                  Boolean(trained_intent_models) &&
                  trained_intent_models.length > 0
                "
              >
                <table
                  class="table"
                  style="border: 1px solid #dbe2e8; margin-top: 1%"
                >
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col" style="text-align: left">
                      {{ tlt("intent_model_name_label") }}
                    </th>
                    <th scope="col" style="text-align: left">
                      {{ tlt("intent_trained_on_label") }}
                    </th>
                    <th scope="col" style="text-align: center">
                      {{ tlt("intent_in_use_label") }}
                    </th>
                    <!-- <th
                            scope="col"
                            style="text-align: center; width: 14%"
                          >
                            Use
                          </th> -->
                  </tr>
                  <tr
                    v-for="(model, index) in trained_intent_models"
                    :key="index"
                  >
                    <td>{{ index + 1 }}</td>
                    <td
                      :title="
                        companyname +
                        ' V' +
                        (trained_intent_models.length - index)
                      "
                      style="text-align: left; cursor: pointer"
                    >
                      <!-- {{ companyname }} V{{
                                trained_intent_models.length - index
                              }} -->
                      {{ trim_model_name(companyname) }}V{{
                        trained_intent_models.length - index
                      }}
                    </td>
                    <td style="text-align: left">
                      {{ model.created_at }}
                    </td>
                    <td class="text-center">
                      <div
                        class="radio"
                        @click="select_trained_intent_model(index)"
                      >
                        <label style="vertical-align: text-top">
                          <input
                            type="radio"
                            :checked="model.active"
                            :name="index + 'intent'"
                            disabled
                          />
                          <span class="icn" id="radio_intent"></span>
                        </label>
                      </div>
                    </td>
                    <!-- <td>
                            <button
                              :disabled="model.active"
                              class="darkblue-btn"
                              @click="select_trained_intent_model(index)"
                            >
                              Use
                            </button>
                          </td> -->
                  </tr>
                </table>
              </div>
              <h6
                class="mt-3"
                v-else-if="
                  Boolean(trained_intent_models) &&
                  trained_intent_models.length === 0
                  && big_spinner == false
                "
              >
                {{ tlt("no_trained_intent_text") }}
              </h6>
            </div>
          </div>
        </div>
        <div
          class="col-sm-4"
          style="border-right: 1px solid rgb(234, 234, 234)"
        >
          <div style="width: auto">
            <h5 class="mb-sm-0 text-center" style="">
              {{ tlt("dialog_model_header") }}
            </h5>
            <div class="table-box" style="text-align: center">
              <div
                class="table-responsive"
                v-if="
                  Boolean(trained_dialogue_models) &&
                  trained_dialogue_models.length > 0
                "
              >
                <table
                  class="table"
                  style="border: 1px solid #dbe2e8; margin-top: 1%"
                >
                  <tr>
                    <th scope="col" style="text-align: left">#</th>
                    <th scope="col" style="text-align: left">
                      {{ tlt("dialog_model_name_label") }}
                    </th>
                    <th scope="col" style="text-align: left">
                      {{ tlt("dialog_trained_on_label") }}
                    </th>
                    <th scope="col" style="text-align: center">
                      {{ tlt("dialog_in_use_label") }}
                    </th>
                    <!-- <th
                            scope="col"
                            style="text-align: center; width: 14%"
                          >
                            Use
                          </th> -->
                  </tr>
                  <tr
                    v-for="(model, index) in trained_dialogue_models"
                    :key="index"
                  >
                    <td>{{ index + 1 }}</td>
                    <td
                      :title="
                        companyname +
                        ' V' +
                        (trained_dialogue_models.length - index)
                      "
                      style="cursor: pointer"
                    >
                      {{ trim_model_name(companyname) }}V{{
                        trained_dialogue_models.length - index
                      }}
                    </td>
                    <td>{{ model.created_at }}</td>
                    <td class="text-center">
                      <div
                        class="radio"
                        @click="select_trained_dialogue_model(index)"
                      >
                        <label style="vertical-align: text-top">
                          <input
                            type="radio"
                            :checked="model.active"
                            :name="index + 'dialogue'"
                            disabled
                          />
                          <span class="icn" :id="index + 'radio'"></span>
                        </label>
                      </div>
                    </td>
                    <!-- <td>
                            <button
                              :disabled="model.active"
                              class="darkblue-btn"
                              @click="select_trained_dialogue_model(index)"
                            >
                              Use
                            </button>
                          </td> -->
                  </tr>
                </table>
              </div>
              <h6
                class="mt-3"
                v-else-if="
                  Boolean(trained_dialogue_models) &&
                  trained_dialogue_models.length === 0
                  && big_spinner == false
                "
              >
                {{ tlt("no_trained_dialog_text") }}
              </h6>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div style="width: auto">
            <h5 class="mb-sm-0 text-center" style="">
              {{ tlt("ner_model_header") }}
            </h5>
            <div class="table-box" style="text-align: center">
              <div
                class="table-responsive"
                v-if="
                  Boolean(trained_ner_models) && trained_ner_models.length > 0
                "
              >
                <table
                  class="table"
                  style="border: 1px solid #dbe2e8; margin-top: 1%"
                >
                  <tr>
                    <th scope="col" style="text-align: left">#</th>
                    <th scope="col" style="text-align: left">
                      {{ tlt("ner_model_name_label") }}
                    </th>
                    <th scope="col" style="text-align: left">
                      {{ tlt("ner_trained_on_label") }}
                    </th>
                    <th scope="col" style="text-align: center">
                      {{ tlt("ner_in_use_label") }}
                    </th>
                    <!-- <th
                            scope="col"
                            style="text-align: center; width: 14%"
                          >
                            Use
                          </th> -->
                  </tr>
                  <tr v-for="(model, index) in trained_ner_models" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td
                      :title="
                        companyname + ' V' + (trained_ner_models.length - index)
                      "
                      style="cursor: pointer"
                    >
                      {{ trim_model_name(companyname) }}V{{
                        trained_ner_models.length - index
                      }}
                    </td>
                    <td>{{ model.created_at }}</td>
                    <td class="text-center">
                      <div
                        class="radio"
                        @click="select_trained_ner_model(index)"
                      >
                        <label style="vertical-align: text-top">
                          <input
                            type="radio"
                            :checked="model.active"
                            :name="index + 'ner'"
                            disabled
                          />
                          <span class="icn" :id="index + 'radio'"></span>
                        </label>
                      </div>
                    </td>
                    <!-- <td>
                            <button
                              :disabled="model.active"
                              class="darkblue-btn"
                              @click="select_trained_dialogue_model(index)"
                            >
                              Use
                            </button>
                          </td> -->
                  </tr>
                </table>
              </div>
              <h6
                class="mt-3"
                v-else-if="
                  Boolean(trained_ner_models) && trained_ner_models.length === 0
                  && big_spinner == false
                "
              >
                {{ tlt("no_trained_ner_text") }}
              </h6>
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
import moment from "moment";
import { freeze_portal,show_subscription_expired_swal } from "@/portal/mixins";

export default {
  name: "MiscellaneousPage",
  mixins: [freeze_portal, show_subscription_expired_swal],
  data() {
    return {
      big_spinner: false,
      companyid: this.$session.get("UserInformation").company_id,
      companyname: this.$session.get("UserInformation").company_name,
      trained_dialogue_models: [],
      trained_intent_models: [],
      current_license_key: this.$session.get("UserInformation").license_key,
      trained_ner_models: [],
      disable_btn_expired: false,
      retail_web_framework: this.$session.get("retail_web_framework"),
    };
  },
  created() {
    this.get_trained_dialogue_models();
    this.get_trained_intent_models();
    this.get_trained_ner_models();
    setTimeout(() => {
      this.freeze_portal();
    }, 1000);
    this.$root.$on("MiscellaneousPageDisabled", (data) => {
      if(data===true){
        this.disable_btn_expired = true;
      }
    });
  },
  methods: {
    trim_model_name(val1) {
      if (val1.length > 6) {
        let str1 = val1.substring(0, 3) + "...";
        return str1;
      }
      return val1;
    },
    get_trained_intent_models() {
      this.big_spinner = true;
      axios
        .post(
          api_calls.train_intent_model(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            isGetModels: true,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then(({ data }) => {
          this.big_spinner = false;
          if (data.message.MSG_CODE === this.api_status_code.DATA_AVAILABLE_MODELS.MSG_CODE) {
            this.trained_intent_models = data.data.models.map((model) => {
              model.created_at = moment(
                model.created_at,
                "YYYYMMDDHHmmss"
              ).format("Do MMM YY");
              return model;
            }); 
          } else {
            Swal({
              title:response.data.message.MSG_CODE,
              text:response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              timer: 2500,
              type: "error"
            })
        }
          // console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
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
    get_trained_dialogue_models() {
      this.big_spinner = true;
      axios
        .post(
          api_calls.use_model(),
          {
            email: this.$session.get("UserInformation").email,
            token: this.$session.get("UserInformation").tokens,
            company_name: this.$session.get("UserInformation").company_name,
            company_id: this.$session.get("UserInformation").company_id,
            license_key: this.$session.get("UserInformation").license_key,
            isShow: true,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then(({ data }) => {
          this.big_spinner = false;
          if (data.message.MSG_CODE === this.api_status_code.SUCCESSFUL_DB_QUERY_CORE.MSG_CODE) {
            this.trained_dialogue_models = data.data.models.map((model) => {
              model.created_at = moment
                .unix(model.created_at)
                .format("Do MMM YY");
              return model;
            });      
          }else if (data.message.MSG_CODE === this.api_status_code.EMPTY_DATA_MODELS.MSG_CODE){

          }else {
            Swal({
              title:data.message.MSG_CODE,
              text:data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              toast: true,
              position: 'top-end',
              timer: 2500,
              type: "error"
            })
          }

        })
        .catch((e) => {
          console.log(e);
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
    get_trained_ner_models() {
      this.big_spinner = true;
      axios
        .get(
          api_calls.revert_ner_models(),
          {
            params: {
              email: this.$session.get("UserInformation").email,
              token: this.$session.get("UserInformation").tokens,
              company_name: this.$session.get("UserInformation").company_name,
              company_id: this.$session.get("UserInformation").company_id,
              license_key: this.$session.get("UserInformation").license_key,
              revert_company_id:
                this.$session.get("UserInformation").company_id,
              revert_company_name:
                this.$session.get("UserInformation").company_name,
              isShow: true,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then(({ data }) => {
          this.big_spinner = false;
          if (data.message.MSG_CODE === this.api_status_code.DATA_AVAILABLE_MODELS.MSG_CODE) {
            this.trained_ner_models = data.data.model_data.map((model) => {
              model.created_at = moment(
                model.created_at,
                "YYYYMMDDHHmmss"
              ).format("Do MMM YY");
              return model;
            });       
          }else if (data.message.MSG_CODE === this.api_status_code.EMPTY_DATA_MODELS.MSG_CODE){

          }
          else{
            Swal({
              title:data.message.MSG_CODE,
              text:data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              toast: true,
              position: 'top-end',
              timer: 2500,
              type: "error"
            })           
          }
        })
        .catch((e) => {
          console.log(e);
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
    select_trained_intent_model(index) {
      if(!this.disable_btn_expired){
        let call_api = true;
        for (let i = 0; i < this.trained_intent_models.length; i++) {
          if (this.trained_intent_models[index].active) {
            call_api = false;
            break;
          }
        }
        if (call_api) {
          Swal.fire({
            title: this.tlt('trained_intent_swal_alert_msg'),
            text:
              this.tlt('trained_intent_swal_set_msg') +
              this.tlt('trained_intent_swal_companyname_msg') +
              " V" +
              (this.tlt('trained_intent_model_swal_msg').length - index) +
              this.tlt('trained_intent_current_model_msg'),
            type: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: this.tlt('trained_intent_swal_confirm_msg'),
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then((result) => {
            if (result.value) {
              this.disable_sidebar = true;
              this.$root.$emit("DashboardSidebarDisable",true);
              this.$session.set("SettingTopnavbarDisable",true);
              this.big_spinner = true;
              // Swal.fire({
              //   text: "Please wait while we submit your request",
              //   toast: true,
              //   type: "info",
              //   showCancelButton: false,
              //   showConfirmButton: false,
              // });
              axios
                .post(
                  api_calls.train_intent_model(),
                  {
                    company_name: this.companyname,
                    company_id: this.companyid,
                    email: this.$session.get("UserInformation").email,
                    license_key: this.$session.get("UserInformation").license_key,
                    token: this.$session.get("UserInformation").tokens,
                    FileName: this.trained_intent_models[index].FileName,
                    isChangeModelVersion: true,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${this.$session.get("at")}`,
                    },
                  }
                )
                .then((response) => {
                  this.big_spinner = false;
                  this.disable_sidebar = false;
                  this.$root.$emit("DashboardSidebarDisable",false);
                  this.$session.set("SettingTopnavbarDisable",false);
                  if (response.data.message.MSG_CODE === this.api_status_code.MODEL_UPDATED_MODELS.MSG_CODE) {
                    this.get_trained_intent_models();
                    Swal.fire({
                      title: this.tlt('trained_intent_model_updated_msg'),
                      type: "success",
                      allowOutsideClick: false,
                      allowEscapeKey: false,
                      timer: 2000,
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
                  // console.log(response);
                })
                .catch((e) => {
                  console.log(e)
                  this.big_spinner = false;
                  this.disable_sidebar = false;
                  this.$root.$emit("DashboardSidebarDisable",false);
                  this.$session.set("SettingTopnavbarDisable",false);
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
      }else{
        this.show_subscription_expired_swal(true);
      }
    },
    select_trained_dialogue_model(index) {
      if(!this.disable_btn_expired){
        let call_api = true;
        for (let i = 0; i < this.trained_dialogue_models.length; i++) {
          if (this.trained_dialogue_models[index].active) {
            call_api = false;
            break;
          }
        }
        if (call_api) {
          Swal.fire({
            title: this.tlt('trained_dialog_swal_alert_msg'),
            text:
              this.tlt('trained_dialog_swal_set_msg') +
              this.tlt('trained_dialog_swal_companyname_msg') +
              " V" +
              (this.tlt('trained_dialog_model_swal_msg').length - index) +
              this.tlt('trained_dialog_current_model_msg'),
            type: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: this.tlt('trained_dialog_swal_confirm_msg'),
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then((result) => {
            if (result.value) {
              this.$root.$emit("DashboardSidebarDisable",true);
              this.$session.set("SettingTopnavbarDisable",true);
              this.disable_sidebar = true;
              this.big_spinner = true;
              // Swal.fire({
              //   text: "Please wait while we submit your request",
              //   toast: true,
              //   type: "info",
              //   showCancelButton: false,
              //   showConfirmButton: false,
              // });
              axios
                .post(
                  api_calls.revert_models(),
                  {
                    email: this.$session.get("UserInformation").email,
                    license_key: this.$session.get("UserInformation").license_key,
                    token: this.$session.get("UserInformation").tokens,
                    subscription:
                      this.$session.get("UserInformation").subscription,
                    company_details: {
                      company_id: this.$session.get("UserInformation").company_id,
                      company_name:
                        this.$session.get("UserInformation").company_name,
                    },
                    model_file: this.trained_dialogue_models[index].FileName,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${this.$session.get("at")}`,
                    },
                  }
                )
                .then((response) => {
                  this.big_spinner = false;
                  this.disable_sidebar = false;
                  this.$root.$emit("DashboardSidebarDisable",false);
                  this.$session.set("SettingTopnavbarDisable",false);
                  if (response.data.message.MSG_CODE === this.api_status_code.UPDATED_CORE.MSG_CODE) {
                    Swal.fire({
                      title: this.tlt('trained_dialog_model_updated_msg'),
                      type: "success",
                      allowOutsideClick: false,
                      allowEscapeKey: false,
                      timer: 2000,
                    })
                    this.get_trained_dialogue_models();
                  } else {
                    Swal.fire({
                      title: response.data.message.MSG_CODE,
                      text: response.data.message.MSG,
                      showCancelButton: false,
                      showConfirmButton: false,
                      timer: 2500,
                      type: "error"
                    });
                  }
                  // console.log(response);
                })
                .catch((e) => {
                  this.big_spinner = false;
                  this.disable_sidebar = false;
                  this.$root.$emit("DashboardSidebarDisable",false);
                  this.$session.set("SettingTopnavbarDisable",false);
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
      }else{
        this.show_subscription_expired_swal(true);
      }
    },
    select_trained_ner_model(index) {
      if(!this.disable_btn_expired){
        let call_api = true;
        for (let i = 0; i < this.trained_ner_models.length; i++) {
          if (this.trained_ner_models[index].active) {
            call_api = false;
            break;
          }
        }
        if (call_api) {
          Swal.fire({
            title: this.tlt('trained_ner_swal_alert_msg'),
            text:
              this.tlt('trained_ner_swal_set_msg') +
              this.tlt('trained_ner_swal_companyname_msg') +
              " V" +
              (this.tlt('trained_ner_model_swal_msg').length - index) +
              this.tlt('trained_ner_current_model_msg'),
            type: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: this.tlt('trained_ner_swal_confirm_msg'),
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then((result) => {
            if (result.value) {
              this.$root.$emit("DashboardSidebarDisable",true);
              this.$session.set("SettingTopnavbarDisable",true);
              this.disable_sidebar = true;
              this.big_spinner = true;
              // Swal.fire({
              //   text: "Please wait while we submit your request",
              //   toast: true,
              //   type: "info",
              //   showCancelButton: false,
              //   showConfirmButton: false,
              // });
              axios
                .post(
                  api_calls.revert_ner_models(),
                  {
                    company_name: this.companyname,
                    company_id: this.companyid,
                    email: this.$session.get("UserInformation").email,
                    license_key: this.$session.get("UserInformation").license_key,
                    token: this.$session.get("UserInformation").tokens,
                    company_details: {
                      company_id: this.companyid,
                      company_name: this.companyname,
                    },
                    model_file: this.trained_ner_models[index].FileName,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${this.$session.get("at")}`,
                    },
                  }
                )
                .then((response) => {
                  this.disable_sidebar = false;
                  this.$root.$emit("DashboardSidebarDisable",true);
                  this.$session.set("SettingTopnavbarDisable",true);
                  this.big_spinner = false;
                  if (response.data.message.MSG_CODE === this.api_status_code.REVERT_SUCCESSFUL_MODELS.MSG_CODE) {
                    Swal.fire({
                      title: this.tlt('trained_ner_model_updated_msg'),
                      type: "success",
                      allowOutsideClick: false,
                      allowEscapeKey: false,
                      timer: 2000,
                    }).then((result_success) => {
                      // if (result_success.value) {
                      this.big_spinner = true;
                      this.get_trained_ner_models();
                      // }
                    });
                  } else {
                    Swal.fire({
                      title: response.data.message.MSG_CODE,
                      text: response.data.message.MSG,
                      showCancelButton: false,
                      showConfirmButton: false,
                      type: "error",
                      timer: 2500
                    });
                  }
                  // console.log(response);
                })
                .catch((e) => {
                  this.big_spinner = false;
                  this.disable_sidebar = false;
                  this.$root.$emit("DashboardSidebarDisable",true);
                  this.$session.set("SettingTopnavbarDisable",true);
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
      }else{
        this.show_subscription_expired_swal(true);
      }
    },
  },
};
</script>

<style>
</style>