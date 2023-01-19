<template>
  <div>
    <div class="dash-cont">
      <div class="spinner" id="spinner" v-show="spinnerOn"></div>
      <div class="container-fluid" id="dashboard-chart">
        <div class="card dash-card">
          <div
            class="card-header d-flex flex-wrap justify-content-between pb-0"
          >
            <h3 class="mab-3 mb-md-0">
              {{tlt('welcome_text')}} {{ $session.get("UserFirstName") }}
            </h3>
            <!-- <span
              style="
                margin-bottom: 5px !important;
                color: #0645ad;
                cursor: pointer;
              "
            >
              <i
                class="fa fa-info-circle"
                aria-hidden="true"
                style="font-size: 22px"
                title="start your page tour."
                @click="start_tour"
              >
              </i>
            </span> -->
          </div>
          <ul
            class="list-group mb-2"
            style="width: auto"
            :style="display_list_dynamic_class()"
          >
            <li
              class="list-group-item"
              :class="list_group_dynamic_class(row.entity)"
              v-for="(row, index) in display_list"
              :key="index"
            >
              <span v-html="row.message">

              </span>
              <!-- {{ row.message }} -->
              <a href="#" style="float: right" @click="go_to_page(row.entity)">
                {{ row.click_text }}</a
              >
            </li>
          </ul>
        </div>
        <div class="card dash-card">
          <div class="card-header d-flex flex-wrap justify-content-between">
            <h4 class="mab-3 mb-md-0">{{tlt('chatbot_request_response_label')}}</h4>
            <div class="card-act d-flex flex-wrap">
              <div class="form-group mb-0">
                <select
                  class="form-control"
                  @change="bar_chart_dropdown"
                  id="exampleFormControlSelect1"
                >
                  <option value="Monthly billing cycle">{{tlt('dashboard_billing_cycle')}}</option>
                  <option value="Last 7 days">{{tlt('dashboard_last_seven')}}</option>
                  <option value="Last 30 days">{{tlt('dashboard_last_30')}}</option>
                  <option value="Last 3 months">{{tlt('dashboard_last_3_month')}}</option>
                  <option value="Last 9 months">{{tlt('dashboard_last_9_month')}}</option>
                  <option value="Last 12 months">{{tlt('dashboard_last_12_month')}}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="chart-box">
              <request-chart
                :Successful="API_data.Successful"
                :Total="API_data.Total"
                :Unsuccessful="API_data.Unsuccessful"
                :labels="API_data.labels"
                :scaleLabel="bar_chart_dropdown_value_show"
                :scaleLabelY="this.tlt('dashboard_chart_yaxis')"
                :labelSuccessfulResponse ="this.tlt('dashboard_chart_sucrespon')"
                :labelTotalRequests ="this.tlt('dashboard_chart_totlreq')"
                :labelUnsuccessfulResponse ="this.tlt('dashboard_chart_unsucrespon')"
              ></request-chart>
            </div>
          </div>
        </div>
        <div v-show="whatsapp_subscription">
          <div class="card dash-card">
            <div class="card-header d-flex justify-content-between">
              <h4 class="mab-3 mb-md-0">{{tlt('dashboard_monthly_usage')}}</h4>
                <div class="form-group mb-0"  v-show="this.monthly_usage_data.length > 0">
                  <select
                    class="form-control  pt-1 pr-3 pb-1 pl-3"
                    id="exampleFormControlSelect1"
                    @change="line_chart_dropdown"
                  >
                    <option value="all">{{tlt('dashboard_monthly_all')}}</option>
                    <option value="free">{{tlt('dashboard_monthly_free')}}</option>
                    <option value="paid">{{tlt('dashboard_monthly_paid')}}</option>
                  </select>
                </div>
            </div>
            <div v-if="not_enough_data === false && this.monthly_usage_data.length>0">
              <line-chart v-bind="line_chart_props_monthly_usage"></line-chart>
            </div>
            <div v-else >
              <div v-if="not_enough_data === true " style="text-align: center;">
                  <h5 class="mab-3 mb-md-0 pb-4">{{tlt('dashboard_monthly_nodata')}}</h5>
              </div>
              <div v-else style="text-align: center;">
                  <h5 class="mab-3 mb-md-0 pb-4">{{tlt('dashboard_monthly_notengdata')}}</h5>
              </div>
            </div>
          </div>
          <div class="card dash-card">
            <div class="card-header  d-flex justify-content-between">
              <h4 class="mab-3 mb-md-0">{{tlt('dashboard_appro_charge')}}</h4>
              <div class="form-group mb-0" v-if="list_of_year.length > 0">
                <select
                  class="form-control pt-1 pr-3 pb-1 pl-3"
                  id="exampleFormControlSelect1"
                  @change="line_chart_year_dropdown"
                >
                  <option v-for="(year,index) in list_of_year"
                  :key="index"
                  >{{year}}</option>
                </select>
              </div>
            </div>
            <div v-if="pricing_data.length>0">
            <line-chart v-bind="line_chart_props_approx_charge"></line-chart>
            </div>
            <div v-else >
              <div v-if="not_enough_data === true " style="text-align: center;">
                  <h5 class="mab-3 mb-md-0 pb-4">{{tlt('dashboard_monthly_nodata')}}</h5>
              </div>
              <div v-else style="text-align: center;">
                  <h5 class="mab-3 mb-md-0 pb-4">{{tlt('dashboard_appro_charge_noenoughdata')}}</h5>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="card dash-card">
          <div class="card-header d-flex flex-wrap justify-content-between">
            <h4 class="mab-3 mb-md-0">Chatbot Billing Parameters</h4>
            <div class="card-act d-flex flex-wrap">
              <div class="form-group mb-0">
                <select
                  class="form-control"
                  v-model="bar_chart2_dropdown_value"
                  @change="graph_2_bar_chart_dropdown"
                  id="exampleFormControlSelect"
                >
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 3 months</option>
                  <option>Last 9 months</option>
                  <option>Last 12 months</option>
                </select>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="chart-box">
              <billing-chart
                :CallsCount="this.Second_chart.CallCount"
                :MsgExchange="this.Second_chart.MsgExchange"
                :TasksExecuted="this.Second_chart.TaskExecution"
                :labels="this.Second_chart.labels"
                :scaleLabel="this.bar_chart2_dropdown_value"
              ></billing-chart>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <div
      class="modal fade dash-modal"
      id="store_config"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt />
              </div>
              <h3>{{tlt('dashboard_store_config')}}</h3>
            </div>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <img src="/img/close-icn.png" alt />
            </button>
            <div class="col-sm-12">
               <div class="form-group mb-0">
                  <div></div>
                  <label
                    class="mb-sm-6 mt-3"
                    style="margin-top: 0.3rem !important;"
                  ><strong>{{tlt('shop_base_currency_label')}}</strong></label
                  >
                  <div class="form-group mb-0">
                    <multiselect
                      v-model="currency_code"
                      :options="currency_list"
                      :searchable="true"
                      :close-on-select="true"
                      :taggable="false"
                      :multiple="false"
                      :placeholder="tlt('shop_currency')"
                      :max-height="200"
                      track-by="display_name"
                      label="display_name"
                      :allow-empty="false"
                    >
                      <!-- <span>{{ currency_name}}</span> -->
                    </multiselect>
                  </div>
                  <hr style="margin-top: 1.9rem !important;" />
                  <div>
                    <label
                    class="mb-sm-6 mt-4"
                    style="margin-top: 0.3rem !important;"
                    ><strong>{{tlt('contact_us_email_label')}}</strong>
                    </label><br/>
                    <label>
                      {{tlt('email_for_customer_label')}}
                    </label>
                    <input
                      v-model.trim="contact_us_email"
                      type="email"
                      class="form-control"
                      :placeholder="tlt('enter_email')"
                      style="padding: 8px;margin-bottom: 1rem;border-radius: 12px !important"
                      required
                    />
                    <div
                      class="is-invalid"
                      style="color:red; padding-bottom:15px;"
                      v-if="validEmail!=true && contact_us_email!=''"
                    >
                      {{ validEmail }}
                    </div>
                  </div>
                  <div
                  class="card-act btn-wrap text-right mt-0 pt-0 pb-3 border-top-0"
                  style="margin-left: 2rem;margin-bottom: 0.4rem"
                  >
                  <button
                    type="submit"
                    style="display: text-center !important;"
                    class="darkblue-btn mt-3"
                    @click="configure_product_settings()"
                  >
                    {{tlt('save_btn')}}
                  </button>
                </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade dash-modal"
      id="bot_language_setup"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt />
              </div>
              <h3>{{tlt('chatbot_default_heading')}}</h3>
            </div>
            <div class="col-sm-12">
               <div class="form-group mb-0">
                  <label
                    class="mb-sm-6 mt-3"
                    style="margin-top: 0.3rem !important;"
                  ><strong>{{tlt('chatbot_default_lang')}}</strong></label
                  >
                  <div class="form-group mb-0">
                    <multiselect
                      v-model="language_code"
                      :options="country_list"
                      :searchable="true"
                      :close-on-select="true"
                      :taggable="false"
                      :multiple="false"
                      :placeholder="tlt('Country')"
                      :max-height="200"
                      track-by="display_name"
                      label="display_name"
                      :allow-empty="false"
                    >
                    </multiselect>
                  </div>
                  <div
                  class="card-act btn-wrap text-right mt-3 pt-0 pb-3 border-top-0"
                  style="margin-left: 2rem;margin-bottom: 0.4rem"
                  >
                  <button
                    id="save_language_chatbot_btn"
                    type="submit"
                    style="display: text-center !important;"
                    class="darkblue-btn "
                    @click="save_language_chatbot()"
                  >
                    {{tlt('save_btn')}}
                  </button>
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
import { bus } from "@/portal/main";
import api_calls from "@/portal/api_calls";
import RequestChart from "@/portal/components/RequestChart.vue";
import AreaChart from "@/portal/components/AreaChart.vue";
import BillingChart from "@/portal/components/BillingChart.vue";
import swal from 'sweetalert2';
import Multiselect from "vue-multiselect";
import currency from "@/portal/components/Currency";
import LineChart from "@/portal/components/LineChart";
import {  close_modal } from "@/portal/mixins";

//import page_guide from "@/portal/mixins/pageguide.js";
export default {
  //mixins: [page_guide],
  props: {},
    mixins: [ close_modal],
  components: {
    RequestChart,
    AreaChart,
    BillingChart,
    Multiselect,
    LineChart,
  },
  mounted(){
    this.retail_web_framework = this.$session.get("retail_web_framework");
    for (var i = 0; i < currency.length; i++) {
      this.currency_list.push({
        display_name:
          currency[i].emoji +
          " " +
          currency[i].currency_code +
          " - " +
          currency[i].currency_name,
        value: currency[i].currency_code
      });
    }
    var currentTime = new Date()
    this.current_year = currentTime.getFullYear();
    if(this.whatsapp_subscription == true){
     this.get_metrics_data();
     this.get_metrics_price_data();
    }
    let check_domain = this.$session.get("UserInformation").domain;
    let is_set_default_language = this.$session.get("UserInformation").is_set_default_language;
      if(is_set_default_language == true ){
        $("#bot_language_setup").modal('show');
      }
    this.$root.$on('call_dashboard_details', (data) => {
      if (data === true) {
        this.dashboard_details();
        this.bar_chart_dropdown(this.bar_chart_dropdown_value);
      }
    });
  },
  created() {
    if (
      !this.$session.has("CompanyId") &&
      this.$session.has("UserInformation").role &&
      this.$session.get("UserInformation").role == "SuperAdmin"
    ) {
      toastr.warning(this.tlt('select_company_name_label'));
    }
    if (this.user_role == "SuperAdmin") {
      if (this.$session.has("CompanyId")) {
        this.companyid = this.$session.get("CompanyId");
        this.companyname = this.$session.get("CompanyName");
      }
    } else {
      this.companyid = this.$session.has("UserInformation")
        ? this.$session.get("UserInformation").company_id
        : "";
      this.companyname = this.$session.has("UserInformation")
        ? this.$session.get("UserInformation").company_name
        : "";
    }
    this.whatsapp_subscription = this.$session.get("whatsapp_subscription");
    this.dashboard_details();
    // axios
    //   .post(
    //     api_calls.billing_usage_url(),
    //     {
    //       company_name: this.companyname,
    //       company_id: this.companyid,
    //       email: this.$session.get("UserInformation").email,
    //       token: this.$session.get("UserInformation").tokens,
    //       load_data_by: "Last 7 days",
    //       license_key: this.$session.get("UserInformation").license_key,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${this.$session.get("at")}`,
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     this.Second_chart.labels = [];
    //     this.Second_chart.CallCount = [];
    //     this.Second_chart.MsgExchange = [];
    //     this.Second_chart.TaskExecution = [];
    //     if (response.data == "No Data available") {
    //       bus.$emit(
    //         "chart is updated",
    //         "True",
    //         [],
    //         [],
    //         [],
    //         [],
    //         this.bar_chart2_dropdown_value
    //       );
    //     } else {
    //       for (var i in response.data) {
    //         this.Second_chart.labels.push(i);
    //         this.Second_chart.CallCount.push(response.data[i].CallCount);
    //         this.Second_chart.MsgExchange.push(response.data[i].MsgExchange);
    //         this.Second_chart.TaskExecution.push(
    //           response.data[i].TaskExecution
    //         );
    //       }
    //       bus.$emit(
    //         "billing chart is updated",
    //         "True",
    //         this.Second_chart.CallCount,
    //         this.Second_chart.MsgExchange,
    //         this.Second_chart.TaskExecution,
    //         this.Second_chart.labels,
    //         this.bar_chart2_dropdown_value
    //       );
    //     }
    //   })
    //   .catch((e) => {
    //     if (
    //       e.response.status === 410 ||
    //       e.response.status === 440 ||
    //       e.response.status === 409
    //     ) {
    //       this.$root.$emit("Session_Expired", e.response.data);
    //     }
    //   });
    axios
      .post(
        api_calls.dashboard_chart_url(),
        {
          company_name: this.companyname,
          company_id: this.companyid,
          email: this.$session.get("UserInformation").email,
          token: this.$session.get("UserInformation").tokens,
          load_data_by: "Monthly billing cycle",
          license_key: this.$session.get("UserInformation").license_key,
        },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          },
        }
      )
      .then((response) => {
        if (response.data.message.MSG_CODE == this.api_status_code.BILLING_CHART.MSG_CODE) {
          this.update_chart_data(response.data.data);
        }else if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
          toastr.error(this.tlt('add_role_internal_server_msg3'));
        }else {
          Swal({
            title: response.data.message.MSG_CODE,
            text: response.data.message.MSG,
            showCancelButton: false,
            showConfirmButton: false,
            type: "error",
            toast:true,
            timer:2500
          })
          return;
        }
      })
      .catch((e) => {
        console.log(e);
        if (
          e.response.status === 410 ||
          e.response.status === 440 ||
          e.response.status === 409
        ) {
          this.$root.$emit("Session_Expired", e.response.data);
        }
      });
  },
  updated() {
    bus.$on("company attributes updated", (data) => {
      if (data == "True") {
        bus.$emit("send company attributes");
      }
    });
    bus.$on("company name and company id", (data1, data2) => {
      this.$router.go();
    });
  },
  computed:{
    validEmail () {
      if(this.contact_us_email != null){
        if (this.email_validity.test(this.contact_us_email)) {
          return true;
        } else {
          return this.tlt('valid_email_addr_label');
        }
      }
    },
    line_chart_props_monthly_usage(){
      return {
        xAxisLabel: 'Timeline',
        yAxisLabel: 'Value',
        xKey: 'date',
        yKey: 'value',
        interval: 'day',
        data: this.monthly_usage_data
      }
    },
    line_chart_props_approx_charge(){
      return {
        xAxisLabel: 'Timeline',
        yAxisLabel: 'price ($)',
        xKey: 'date',
        yKey: 'value',
        interval: 'day',
        data: this.pricing_data
      }
    }
  },
  data() {
    return {
      show: false,
      bar_chart_dropdown_value: "Monthly billing cycle",
      bar_chart_dropdown_value_show: "Monthly billing cycle",
      bar_chart2_dropdown_value: "Last 7 days",
      companyname: null,
      companyid: null,
      permission_list: [],
      API_data: {
        labels: [],
        Successful: [],
        Total: [],
        Unsuccessful: [],
        xAxisLabel: "",
      },
      Second_chart: {
        labels: [],
        CallCount: [],
        MsgExchange: [],
        TaskExecution: [],
      },
      Concurrent_Users_Data: {
        labels: [],
        data: [],
      },
      concurrent_users_month: "",
      user_role: this.$session.has("UserInformation")
        ? this.$session.get("UserInformation").role
        : "",
      intent_count: 53,
      intent_count_display: 0,
      display_list: [],
      primary_item_entities_list: ["Intents", "Questions", "Responses", "Training"],
      danger_item_entities_list: [
        "Verify Responses Unanswered",
        "Verify Bot Response",
        "Products",
        "Synonyms",
        "Accounts"
      ],
      info_item_entities_list: [],
      success_item_info_list: ["Check Bot Response","Bot Configuration"],
      item_list_order: ["danger_item_entities_list", "success_item_info_list", "primary_item_entities_list"],
      spinnerOn: false,
      retail_web_framework:this.$session.get("retail_web_framework"),
      currency_code: "",
      currency_list: [],
      email_validity: /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/,
      contact_us_email:'',
      monthly_usage_data:[],
      pricing_data:[],
      line_chart_dropdown_value :'all',
      list_of_year: [],
      price_chart_dropdown_value:'',
      current_year: '',
      whatsapp_subscription:false,
      not_enough_data: false,
      is_bot_lang_set : false,
      country_list: [
        {
          display_name: "🇺🇸 English",
          value: "en",
          lang: "english"
        },
        // {
        //   display_name: "🇪🇸 Spanish",
        //   value: "es",
        //   lang: "spanish"
        // },
        {
          display_name: "🇮🇳 Hindi",
          value: "hi",
          lang : "hindi"
        },
        {
          display_name: "🇵🇹 Portuguese",
          value: "pt",
          lang : "portuguese"
        }
      ],
      language_code: null
      //tour_guide_icon: require("@/portal/assets/img/info_icon.svg"),
    };
  },
  methods: {
    // graph_2_bar_chart_dropdown() {
    //   this.bar_chart2_dropdown_value = event.target.value;
    //   // console.log(this.bar_chart2_dropdown_value)
    //   axios
    //     .post(
    //       api_calls.billing_usage_url(),
    //       {
    //         company_name: this.$session.get("UserInformation").company_name,
    //         company_id: this.$session.get("UserInformation").company_id,
    //         email: this.$session.get("UserInformation").email,
    //         token: this.$session.get("UserInformation").tokens,
    //         load_data_by: this.bar_chart2_dropdown_value,
    //         license_key: this.$session.get("UserInformation").license_key,
    //       },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${this.$session.get("at")}`,
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       this.Second_chart.labels = [];
    //       this.Second_chart.CallCount = [];
    //       this.Second_chart.MsgExchange = [];
    //       this.Second_chart.TaskExecution = [];
    //       if (response.data == "No Data available") {
    //       } else {
    //         for (var i in response.data) {
    //           this.Second_chart.labels.push(i);
    //           this.Second_chart.CallCount.push(response.data[i].CallCount);
    //           this.Second_chart.MsgExchange.push(response.data[i].MsgExchange);
    //           this.Second_chart.TaskExecution.push(
    //             response.data[i].TaskExecution
    //           );
    //         }
    //       }
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
    bar_chart_dropdown(val) {
      if (typeof(val) == 'object'){
        this.bar_chart_dropdown_value = event.target.value;
      }else{
        this.bar_chart_dropdown_value = val
      }
      axios
        .post(
          api_calls.dashboard_chart_url(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            token: this.$session.get("UserInformation").tokens,
            load_data_by: this.bar_chart_dropdown_value,
            license_key: this.$session.get("UserInformation").license_key,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          if (response.data.message.MSG_CODE == this.api_status_code.BILLING_CHART.MSG_CODE) {
            this.update_chart_data(response.data.data);
          }else {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              toast: true,
              position: "top-end",
              type: "error"
            })
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
    update_chart_data(message) {
      this.API_data.labels = [];
      this.API_data.Successful = [];
      this.API_data.Total = [];
      this.API_data.Unsuccessful = [];
      if( this.bar_chart_dropdown_value == 'Monthly billing cycle'){
         this.bar_chart_dropdown_value_show = this.tlt('dashboard_billing_cycle');
      }else if ( this.bar_chart_dropdown_value == 'Last 7 days'){
         this.bar_chart_dropdown_value_show = this.tlt('dashboard_last_seven');
      }else if ( this.bar_chart_dropdown_value == 'Last 30 days'){
         this.bar_chart_dropdown_value_show = this.tlt('dashboard_last_30');
      }else if ( this.bar_chart_dropdown_value == 'Last 3 months'){
        this.bar_chart_dropdown_value_show = this.tlt('dashboard_last_3_month');
      }else if ( this.bar_chart_dropdown_value == 'Last 9 months'){
        this.bar_chart_dropdown_value_show = this.tlt('dashboard_last_9_month');
      }else {
        this.bar_chart_dropdown_value_show = this.tlt('dashboard_last_12_month');
      }
      if (message == "No Data available") {
      } else {
        for (var i in message) {
          this.API_data.labels.push(i);
          this.API_data.Successful.push(message[i].Successful);
          this.API_data.Total.push(message[i].Total);
          this.API_data.Unsuccessful.push(message[i].Unsuccessful);
        }
      }
    },
    go_to_page(page_name) {
      if (page_name == "Verify Responses Unanswered") {
        this.$router.push({
          name: "Verify Bot Response",
          params: { modal_open_switch_tab: false },
        });
      } else if(page_name == "Synonyms"){
        swal({
          title: this.tlt('dashboard_swal_alert_msg'),
          text: this.tlt('dashboard_train_model_msg'),
          type: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: this.tlt('dashboard_swal_confirm_msg'),
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.value) {
            this.spinnerOn = true;
            axios
              .post(
                api_calls.train_intent_ner_model(),
                {
                  email: this.$session.get("UserInformation").email,
                  license_key: this.$session.get("UserInformation").license_key,
                  token: this.$session.get("UserInformation").tokens,
                  subscription: this.$session.get("UserInformation").subscription,
                  company_name: this.$session.get("UserInformation").company_name,
                  company_id: this.$session.get("UserInformation").company_id,
                  update_model: true,
                  update_model_status: true
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.$session.get("at")}`,
                  },
                }
              )
              .then((response) => {
                this.spinnerOn = false;
                this.$root.$emit("want_model_status",true);
                
                  Swal({
                    title: response.data.message.MSG_CODE,
                    text: response.data.message.MSG,
                    showCancelButton: false,
                    showConfirmButton: false,
                    
                  })

                if(response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE){
                  toastr.error(this.tlt('dashboard_internal_server_msg'));
                }
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
                toastr.error(this.tlt('some_error_please_try_again','code'));
              });
          }
        });
      } else if (page_name == "Products"){
          $("#store_config").modal('show');
          this.load_product_settings();
      }
      else if (page_name=="Accounts"){
        this.$router.push({
          name: 'Settings',params:{Subscription:true}
        })
      }
      else {
        this.$router.push({
          name: page_name,
          params: { modal_open_switch_tab: true },
        });
      }
    },
    intents_count_function() {
      let startTimestamp = null;
      let duration = 2000;
      let end = this.intent_count;
      let start = 0;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        this.intent_count_display = Math.floor(
          progress * (end - start) + start
        );
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    },
    list_group_dynamic_class(row) {
      if (this.primary_item_entities_list.includes(row)) {
        return "list-group-item-primary";
      } else if (this.danger_item_entities_list.includes(row)) {
        return "list-group-item-danger";
      } else if (this.info_item_entities_list.includes(row)) {
        return "list-group-item-info";
      } else if (this.success_item_info_list.includes(row)) {
        return "list-group-item-success";
      }
    },
    list_group_dynamic_type(row) {
      /**
        * @param- row determines which list grou pit belongs to.
        * @returns- the respective list item colour prefixed with alphabet for easy sorting as per our requirement
      */
      if (this.primary_item_entities_list.includes(row)) {
        return "d-primary";
      } else if (this.danger_item_entities_list.includes(row)) {
        return "a-danger";
      } else if (this.info_item_entities_list.includes(row)) {
        return "b-info";
      } else if (this.success_item_info_list.includes(row)) {
        return "c-success";
      }
    },
    display_list_dynamic_class() {
      if (this.display_list.length > 0) {
        return "padding: 20px 25px;";
      } else {
        return "padding: 10px 25px;";
      }
    },
    configure_product_settings() {
      if(this.validEmail != true){
        swal({
          text: this.tlt('dashboard_valid_email_text'),
          type: "warning",
          timer: 3000
        });
        return
      }
      if(this.currency_code == ''){
        swal({
          text: this.tlt('dashboard_base_currency_text'),
          type: "warning",
          timer: 3000
        });
        return
      }else {
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
                contact_help_email:this.contact_us_email,
                base_currency: this.currency_code,
                "shop_settings_saved": true
              }
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`
              }
            }
          )
          .then(response => {
            this.big_spinner = false;
             $("#store_config").modal('hide');
            if (response.data.message.MSG_CODE == this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE) {
              swal({
                text: this.tlt('dashboard_changes_saved_text'),
                type: "success",
                timer: 4000
              });
              this.empty_variable();
              this.dashboard_details();
            } else if(response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE){
              swal({
                text: this.tlt('dashboard_internal_server_error'),
                type: "error",
                timer: 2000,
                showCancelButton: false,
                showConfirmButton: false,
              });
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
          .catch(e => {
            this.big_spinner = false;
            toastr.error(this.tlt('some_error_occurred_msg', 'code'));
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
    empty_variable() {
      this.contact_us_email = '';
      this.email_required = false;
      this.currency_code = "";
    },
    dashboard_details(){
    this.spinnerOn = true;
    axios
      .post(
        api_calls.dashboard_bot_details_count(),
        {
          company_name: this.companyname,
          company_id: this.companyid,
          email: this.$session.get("UserInformation").email,
          token: this.$session.get("UserInformation").tokens,
          license_key: this.$session.get("UserInformation").license_key,
          portal_lang: this.$session.get("PreferredLanguage"),
          is_get: true,
        },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          },
        }
      )
      .then((response) => {
        this.spinnerOn = false;
        this.display_list = [];
        this.permission_list = [];
        for (var i in this.$session.get("ChatbotMenu")) {
          this.permission_list.push(
            this.$session.get("ChatbotMenu")[i].main_menu.name
          );
          for (var j in this.$session.get("ChatbotMenu")[i].sub_menu_list) {
            this.permission_list.push(
              this.$session.get("ChatbotMenu")[i].sub_menu_list[j].name
            );
          }
        }
        if (response.data.data.Status === "Success") {
          var verify_bot_response = false,
          store_settings = false;
          for (var n in this.permission_list) {
            if (this.permission_list[n] == "Verify Bot Response") {
              verify_bot_response = true;
            }
            if(this.permission_list[n] === "Store"){
              store_settings = true;
            }
          }
          for (var i in response.data.data.data) {
            let pushed = false;
            for (var j in this.permission_list) {
              if (response.data.data.data[i].entity == this.permission_list[j]) {
                response.data.data.data[i].list_belong = this.list_group_dynamic_type(response.data.data.data[i].entity)
                this.display_list.push(response.data.data.data[i]);
                pushed = true;
              }
              if (
                verify_bot_response == true &&
                response.data.data.data[i].entity == "Verify Responses Unanswered"
              ) {
                pushed = true;
                response.data.data.data[i].list_belong = this.list_group_dynamic_type(response.data.data.data[i].entity)
                this.display_list.push(response.data.data.data[i]);
                verify_bot_response = false;
              }
              if (
                store_settings == true &&
                response.data.data.data[i].entity == "Products"
              ) {
                pushed = true;
                response.data.data.data[i].list_belong = this.list_group_dynamic_type(response.data.data.data[i].entity)
                this.display_list.push(response.data.data.data[i]);
                store_settings = false;
              }
            }
            if(!pushed){
              if(response.data.data.data[i].entity === "Training"){
                response.data.data.data[i].list_belong = this.list_group_dynamic_type(response.data.data.data[i].entity)
                this.display_list.push(response.data.data.data[i])
                pushed = true;
              }
            }
            if(!pushed){
              if(response.data.data.data[i].entity === "Synonyms"){
                response.data.data.data[i].list_belong = this.list_group_dynamic_type(response.data.data.data[i].entity)
                this.display_list.push(response.data.data.data[i])
                pushed = true;
              }
            }
            if(!pushed){
              if(response.data.data.data[i].entity === "Accounts"){
                response.data.data.data[i].list_belong = this.list_group_dynamic_type(response.data.data.data[i].entity)
                this.display_list.push(response.data.data.data[i])
                pushed = true;
              }
            }

          }
          this.display_list.sort((a,b) => (a.list_belong > b.list_belong) ? 1 : -1 )
        }else {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              toast: true,
              position: "top-end",
              type: "error"
            })
          }
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
    },
    load_product_settings() {
      this.contact_us_email = '';
      this.email_required = false;
      this.currency_code = "";
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
            is_get: true
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`
            }
          }
        )
        .then(response => {
          this.big_spinner = false;
          var webframework = this.retail_web_framework;
          if (
            
            response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE.MSG_CODE 
          ) {
            this.contact_us_email = response.data.data[webframework + '_details'].contact_help_email;
            this.email_required =
              response.data.data[webframework + '_details'].order_retrieval_only_email_required;
            this.currency_code =
              response.data.data[webframework + '_details'].base_currency;
          } else if(response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE){
            toastr.error(this.tlt('dashboard_internal_server_msg1'));
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
        .catch(e => {
          this.big_spinner = false;
          toastr.error(this.tlt('some_error_occurred_msg','code'));
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    get_metrics_data(){
       axios
        .post(
          api_calls.whatsapp_metrics(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            is_get:this.line_chart_dropdown_value,
            is_get_conversation_metrics:true,
            year: this.current_year
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
           if (response.data.message.MSG_CODE == this.api_status_code.INSUFFICIENT_WHATSAPP_METRICS_DATA.MSG_CODE) {
                        this.not_enough_data = true;

            this.monthly_usage_data = [];
          }else if (response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE.MSG_CODE){
            this.monthly_usage_data =response.data.data.data;

            this.not_enough_data = false;
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
    get_metrics_price_data(){
       axios
        .post(
          api_calls.whatsapp_metrics(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            is_get:'price',
            is_get_conversation_metrics:true,
            year: this.current_year
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          if (response.data.message.MSG_CODE == this.api_status_code.INSUFFICIENT_WHATSAPP_METRICS_DATA.MSG_CODE) {
            this.pricing_data= [];
            this.pricing_data = [];
            this.not_enough_data = true;
          }else if (response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE.MSG_CODE){
      
            this.pricing_data = response.data.data.data;
            this.list_of_year = response.data.data.years;
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
    line_chart_dropdown(){
      this.line_chart_dropdown_value = event.target.value;
      this.get_metrics_data();
    },
    line_chart_year_dropdown(){
      this.current_year = event.target.value;
      this.get_metrics_price_data();
      this.get_metrics_data();
    },
    save_language_chatbot(){
      if(this.language_code == null){
         swal({
          text: "Please select language",
          type: "warning",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000
        });
        return
      }
      let language = this.language_code.lang;
      let lang_code = this.language_code.value;
      axios.
        post(
          api_calls.portal_language_data(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            token: this.$session.get("UserInformation").tokens,
            license_key: this.$session.get("UserInformation").license_key,
            chatbot_language_code:lang_code,
            chatbot_language: language,
            save_chatbot_language: true,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          if(response.data.message.MSG_CODE == this.api_status_code.LANGUAGE_UPDATED.MSG_CODE){
            swal({
              text: "Bot Language Update Successfully",
              type: "success",
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000
            });
            let userinfo = this.$session.get("UserInformation");
            userinfo["is_set_default_language"] = false;
            userinfo["chatbot_language"] = language;
            userinfo["chatbot_language_code"] = lang_code;
            this.$session.set("UserInformation", userinfo);
          }else if(response.data.message.MSG_CODE == this.api_status_code.UNSUCCESSFUL_DB_OPERATION.MSG_CODE){
             swal({
              text: "Unable to update Bot Language",
              type: "error",
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000
            });
          }else {
            swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              toast: true,
              position: "top-end",
              type: "error"
            });
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
        this.close_modal('save_language_chatbot_btn')
    }
  },
};
</script>

<style scoped>
.dash-card .card-body {
  min-height: fit-content;
}
a {
  color: black;
}
a:hover {
  color: #4024da;
}
</style>
<style>
.multiselect__tags {
  min-height: 42px !important;
}
</style>
