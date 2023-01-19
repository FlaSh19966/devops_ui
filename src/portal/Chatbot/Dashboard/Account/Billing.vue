<template>
  <div>
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <!-- <div class="dash-cont"> -->
    <div class="card dash-card">
      <div v-if="!show_subscription "  >
        <div class="card-header flex-wrap justify-content-between">
          <h4 class="mb-0">{{tlt('subscribe_plan_header')}}</h4>
          <p v-if="stripe_subscription_plans_details.subscription_type === 'Free'">
            {{tlt('subscribe_plan_help_text')}}
          </p> 
        </div>
        <div style="padding-left: 25px"  v-if="retail_shopify_company">
          <div class="row mb-2">
            <div class="col-sm-4">
              <span> {{tlt('select_plan_label')}} </span>
              <multiselect
                track-by="name"
                label="label"
                :options="retail_shopify_subscription_plans_custom_currency"
                v-model="retail_plan_current"
                :searchable="false"
                :allow-empty="false"
                @input="check_retail_plan"
                :placeholder="tlt('select_plan')"
                :show-labels="false"
              ></multiselect>
              <span>
                <!-- {{ current_retail_plan_charges }} -->
              </span>
            </div>
            <div class="col-sm-4">
              <span> {{tlt('select_billing_cycle_label')}} </span> 
              <multiselect
                :options="retail_payment_types"
                v-model="retail_payment_type"
                :searchable="false"
                :allow-empty="false"
                :show-labels="false"
                :disabled="check_retail_payment_type_disabled"
                :placeholder="retail_payment_placeholder"
              >
              </multiselect>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-sm-12" style="margin:4px 0px;">
              <button
                type="button"
                class="darkblue-btn"
                style="padding: 6px 15px"
                @click="subscribe_retail_plan()"
              >
                {{tlt('subscribe_btn_label')}}
              </button>
               <button
                  @click="show_subscription=!show_subscription"       
                  type="button"
                  class="red-btn"                  
                  style="padding: 6px 15px"
                >
                  {{tlt('go_back_btn_label')}}
            </button>
            </div>
          </div>
        </div>
        <div style="padding-left: 25px" v-else>
            <div class="row mb-2">
            <div class="col-sm-4">
              <span> {{tlt('select_plan1_label')}} </span>
              <multiselect
                :options="first_step"
                v-model="retail_plan_current"
                :searchable="false"
                :allow-empty="false"
                @input="check_retail_plan"
                :placeholder="tlt('select_plan')"
                :show-labels="false"
              ></multiselect>
              <span>
                <!-- {{ current_retail_plan_charges }} -->
              </span>
            </div>
            <div class="col-sm-4">
              <span> {{tlt('select_billing_cycle1_label')}} </span>
              <multiselect
                label="label"
                :options="second_step"
                v-model="retail_payment_type"
                :searchable="false"
                :allow-empty="false"
                :disabled="check_retail_payment_type_disabled"
                :placeholder="retail_payment_placeholder"
              >
              </multiselect>
            </div>
          </div>
            <div class="row mb-2">
              <div class="col-sm-12" style="margin:4px 0px;">
                <button
                  type="button"
                  class="darkblue-btn"
                  style="padding: 6px 15px"
                  @click="submit_stripe_checkout"
                >
                  {{tlt('subscribe_btn1_label')}}
                </button>
                <button
                  @click="show_subscription=!show_subscription"       
                  type="button"
                  class="red-btn"                  
                  style="padding: 6px 15px"
                >
                  {{tlt('go_back_btn1_label')}}
                </button>
              </div>
          </div>
        </div>
      </div>
      <div v-show="show_subscription" style="margin:10px">
        <div style="margin:10px;margin-left: 27">
          <h4 class="mb-0">{{tlt('subscription_plan_header')}}</h4>
          <br>
          <p> {{tlt('current_subscribe_plan_text')}} <strong>{{stripe_subscription_plans_details.subscription_type}}</strong> &nbsp; &nbsp;
             <span v-if="hide_button !=='Free'">{{tlt('current_subscribe_plan_text2')}} <strong>{{get_subscription_valid_till(stripe_subscription_plans_details.subscription_valid_till)}}.</strong></span>
             <span v-else>{{tlt('current_subscribe_plan_text3')}} <strong>{{get_subscription_valid_till(stripe_subscription_plans_details.subscription_valid_till)}}.</strong></span>
          </p>
          <button
            type="button"
            class="darkblue-btn"
            style="padding: 6px 15px"
            @click="show_subscription = !show_subscription"
            v-if="stripe_subscription_plans_details.subscription_type !== 'Premium'"
          >
             {{tlt('upgrade_btn_label')}}
          </button>
          <button
            type="button"
            class="darkblue-btn"
            style="padding: 6px 15px"
            @click="show_subscription = !show_subscription"
            v-else
          >
            {{tlt('downgrade_btn_label')}}
          </button>
          <button
            v-if="hide_button !=='Free'"
            type="button"
            class="red-btn"
            style="padding: 6px 15px"
            @click="show_swal_notification"
          >
            {{tlt('cancel_btn_label')}}
          </button>
        </div>
      </div>
    </div>
    <div class="card dash-card" v-if="stripe_addon_plans.length > 0 ">
      <div style="margin:10px">
        <div style="margin:10px;margin-left: 27">
          <h4 class="mb-0">{{tlt('purchase_addons_header')}}</h4>
          <br>

          <p v-if="credits_balance != null">

            {{tlt('current_sms_credit_text')}} <strong> {{tlt('current_sms_credit_text2')}} : {{credits_balance["us"]}} | {{tlt('current_sms_credit_text3')}}
              : {{credits_balance.non_us}}
            </strong>
          </p>
            <div class="row mb-2">
            <div class="col-sm-4">
              <span> {{tlt('select_addon_label')}} </span>
              <multiselect
                label="Type"
                :options="stripe_addon_plans"
                 v-model="selected_addon_plan"
                :placeholder="tlt('select_one')"
              ></multiselect>
              <!-- <span>
                {{ current_retail_plan_charges }}
              </span> -->
            </div>
            <div class="col-sm-4">
              <span> {{tlt('select_option_label')}} </span>
              <multiselect
                label="label"
                :options="second_step_addon_plans"
                v-model="selected_addon_type"
                :placeholder="tlt('select_one')"
              ></multiselect>
              <!-- <span>
                {{ current_retail_plan_charges }}
              </span> -->
            </div>
          </div>
          <button
            type="button"
            class="darkblue-btn"
            style="padding: 6px 15px"
            @click="submit_stripe_addon_checkout"
          >
            {{tlt('purchase_btn_label')}}
          </button>
        </div>
      </div>
    </div>
    <div class="container-fluid" id="dashboard-chart" style="padding: 0">
      <div class="card dash-card">
        <div class="card-header d-flex flex-wrap justify-content-between">
          <h4>{{tlt('cost_for_month_header')}} {{ concurrent_users_month }}</h4>
          <div class="card-act"></div>
        </div>
        <div class="card-body">
          <div class="chart-box">
            <area-chart
              :labels="Concurrent_Users_Data.labels"
              :data="Concurrent_Users_Data.data"
            ></area-chart>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade dash-modal"
      id="countrymodal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="countrymodaltitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt style="width: auto" />
              </div>
              <h6>
                {{tlt('company_registered_msg')}}
              </h6>
            </div>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <img src="/img/close-icn.png" alt />
            </button>
            <form @submit.prevent="call_payment('country_selected')">
              <div class="form-group">
                <!-- <select class="form-control" v-model="country_name">
                  <option
                    :value="country.code"
                    v-for="(country, index) in country_list"
                    :key="index"
                  >
                    {{ country.name }}
                  </option>
                </select>{{this.country_name}} -->
                <multiselect
                  v-model="country_name"
                  :options="country_list"
                  :searchable="true"
                  :close-on-select="true"
                  :taggable="false"
                  :multiple="false"
                  :placeholder="tlt('country_name_label')"
                  :max-height="200"
                  track-by="code"
                  label="name"
                >
                  <!-- <span>{{ country_name }}</span> -->
                </multiselect>
              </div>
              <div class="btn-wrap text-right">
                <button
                  type="button"
                  @click="country_name = ''"
                  class="btn btn-link"
                  data-dismiss="modal"
                >
                  {{tlt('cancel_btn')}}
                </button>
                <button type="submit" class="darkblue-btn">{{tlt('save_btn')}}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import countries from "@/portal/components/Countries";
import axios from "axios";
import { bus } from "@/portal/main";
import api_calls from "@/portal/api_calls";
import AreaChart from "@/portal/components/AreaChart.vue";
import Multiselect from "vue-multiselect";
// import { StripeCheckout } from "@vue-stripe/vue-stripe";
import moment from "moment";
import { update_sidebar_menu, update_restriction_list} from "@/portal/mixins";

export default {
  name: "Billing",
  components: {
    AreaChart,
    Multiselect,
    // StripeCheckout,
  },
  mixins: [
    update_sidebar_menu,
    update_restriction_list
  ],
  data() {
    return {
      select_subscription_plan: ["Silver", "Gold", "Plantinum", "Enterprise"],
      selected_subscription: "",
      subscription_id: "",
      plan_id: "",
      customer_id: "",
      plan_period: ["Monthly", "Yearly"],
      selected_period: "",
      order_id: "",
      amount: "",
      pay_success_data: {},
      subscription_btn_disable: false,
      country_list: countries,
      paymentid: "",
      barChart: "",
      backgroundColor: ["#e67e22", "#16a085", "#2980b9"],
      labels: [
        "Exchange of Messages",
        "Execution of Tasks",
        "Audio/Video Interaction",
        "Storage",
      ],
      companyid: null,
      companyname: null,
      country_name: "",
      payment_currency: "",
      value_currency_top_up: "",
      value_currency_subscription: "",
      INR: [3500, 7000, 14000, 35000],
      USD: [50, 100, 200, 500],
      common_currency: [],
      currency_amount: null,
      top_up_amount: null,
      piechart_data: [],
      user_role: this.$session.get("UserInformation").role,
      concurrent_users_month: "",
      Concurrent_Users_Data: {
        labels: [],
        data: [],
      },
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
      invoice_details: [],
      invoice_details_copy: [],
      total_year: [],
      year_selected: "",
      spinnerOn: false,
      //harsh
      common_currency2: [],
      INR2: [3500, 7000, 14000, 35000],
      USD2: [100, 300, 500],
      retail_shopify_company: false,
      // addon_plans: [
      //   {
      //       "Type": "SmsAddOn",
      //       "Price": 15.0,
      //       "Service": "SMS",
      //       "PriceOptions": [
      //           {
      //               "price": 15.0,
      //               "currency": "usd",
      //               "id": "12425648325414353413235234134",
      //               "type": "us",
      //               "count": 1000,
      //               "key": "sms_count.add_on.us",
      //               "label": "$15 (1000 sms for US region)"
      //           },
      //           {
      //               "price": 15.0,
      //               "currency": "usd",
      //               "id": "12425648325414353413235234134",
      //               "type": "non_us",
      //               "count": 500,
      //               "key": "sms_count.add_on.non_us",
      //               "label": "$15 (500 sms for Non-US region)"
      //           }
      //       ],
      //       "Options": [
      //           {
      //               "type": "us",
      //               "count": 1000
      //           },
      //           {
      //               "type": "non_us",
      //               "count": 500
      //           }
      //       ],
      //       "IsActive": true,
      //       "IsAddOn": true
      //   },
      //   {
      //       "Type": "ConversationAddOn",
      //       "Service": "WhatsappConversation",
      //       "PriceOptions": [
      //           {
      //               "price": 29.0,
      //               "currency": "usd",
      //               "id": "12425648325414353413235234134",
      //               "type": "conversations",
      //               "count": 2000,
      //               "key": "whatsapp_conversations_count.add_on",
      //               "label": "$29 (2000 conversations)"
      //           },
      //           {
      //               "price": 2000.0,
      //               "currency": "inr",
      //               "id": "12425648325414363452920845234",
      //               "type": "conversations",
      //               "count": 2000,
      //               "key": "whatsapp_conversations_count.add_on",
      //               "label": "₹2000 (2000 conversations)"
      //           }
      //       ],
      //       "IsActive": true,
      //       "IsAddOn": true
      //   }
      // ],

      // plans: [
      // {
      //     "Type" : "Starter",
      //     "IsActive" : true,
      //     "PriceOptions" : [ 
      //         {
      //             "price" : 29.0,
      //             "currency" : "usd",
      //             "price_id" : "price_1JzZy2GTZ7JdmVusyUqjOtj7",
      //             "nickname" : "Starter-Test",
      //             "label" : "$29/month",
      //             "type" : "monthly"
      //         }, 
      //         {
      //             "price" : 2000.0,
      //             "currency" : "inr",
      //             "price_id" : "price_1KdYOPGTZ7JdmVusDYtT3ry8",
      //             "nickname" : "Starter-Test-INR",
      //             "label" : "₹2000/month",
      //             "type" : "monthly"
      //         }, 
      //         {
      //             "price" : 290.0,
      //             "currency" : "usd",
      //             "price_id" : "price_1K28jJGTZ7JdmVusaHhK4tOF",
      //             "nickname" : "Starter-Test-Yearly",
      //             "label" : "$290/yearly",
      //             "type" : "yearly"
      //         }, 
      //         {
      //             "price" : 20000.0,
      //             "currency" : "inr",
      //             "price_id" : "price_1KdYT4GTZ7JdmVusY4nETGHH",
      //             "nickname" : "Starter-Test-Yearly-INR",
      //             "label" : "₹20000/yearly",
      //             "type" : "yearly"
      //         }
      //     ],    
      // },
      // {
      //     "Type" : "Premium",
      //     "PriceOptions" : [ 
      //         {
      //             "price" : 99.0,
      //             "currency" : "usd",
      //             "price_id" : "price_1JzZyjGTZ7JdmVus2KHdL8XE",
      //             "nickname" : "Premium-Test",
      //             "label" : "$99/month",
      //             "type" : "monthly"
      //         }, 
      //         {
      //             "price" : 7000.0,
      //             "currency" : "inr",
      //             "price_id" : "price_1KdYSEGTZ7JdmVusZwKTAUV6",
      //             "nickname" : "Premium-Test-INR",
      //             "label" : "₹7000/month",
      //             "type" : "monthly"
      //         }, 
      //         {
      //             "price" : 990.0,
      //             "currency" : "usd",
      //             "price_id" : "price_1K28hTGTZ7JdmVus1wWct9PT",
      //             "nickname" : "Premium-Test-Yearly",
      //             "label" : "$990/year",
      //             "type" : "yearly"
      //         }, 
      //         {
      //             "price" : 70000.0,
      //             "currency" : "inr",
      //             "price_id" : "price_1KdYTZGTZ7JdmVusSJIcEGnz",
      //             "nickname" : "Premium-Test-Yearly-INR",
      //             "label" : "₹70000/year",
      //             "type" : "yearly"
      //         }
      //     ],
      // }],
      retail_shopify_subscription_plans: [
        // {
        //   name: "Free",
        //   is_chargeable: false,
        // },
        {
          name: "Starter",
          label:"Starter ($29/month or $290/year)",
          is_chargeable: true,
          monthly_charge: 29,
          annual_charge: {
            per_month_effective: 24.17,
            actual_charge: 290,
          },
          currency: "usd"
        },
        {
          name: "Premium",
          label: "Premium ($99/month or $990/year)", 
          is_chargeable: true,
          monthly_charge: 99,
          annual_charge: {
            per_month_effective: 82.5,
            actual_charge: 990,
          },
          currency: "usd"
        },
        {
          name: "Starter",
          label:"Starter (₹2000/month or ₹20000/year)",
          is_chargeable: true,
          monthly_charge: 2000,
          annual_charge: {
            per_month_effective: 24.17,
            actual_charge: 20000,
          },
           currency: "inr"
        },
        {
          name: "Premium",
          label: "Premium (₹7000/month or ₹70000/year)", 
          is_chargeable: true,
          monthly_charge: 7000,
          annual_charge: {
            per_month_effective: 82.5,
            actual_charge: 70000,
          },
          currency: "inr"
        },
        {
          name: "WhatsApp",
          label: "WhatsApp ($29/month)", 
          is_chargeable: true,
          monthly_charge: 29,
          currency: "usd"
        },
        {
          name: "WhatsApp",
          label: "WhatsApp (₹2000/month)", 
          is_chargeable: true,
          monthly_charge: 2000,
          currency: "inr"
        },
      ],
      retail_plan_current: null,
      payment_types: ["Annual", "Monthly"],
      retail_payment_type: null,
      stripe_subscription_plans: null,
      stripe_subscription_plans_details: {},
      stripe_addon_plans: [],
      show_subscription:false,
      selected_addon_plan: null,
      hide_button:'Free',
      credits_balance: null,
      retail_web_framework: this.$session.get("retail_web_framework"),
      shop_base_currency: 'usd',
      acceptable_shop_base_currencies: ['INR', 'USD', 'inr', 'usd'],
      stripe_addon_type: [],
      selected_addon_type: null,
    };
  },
  created() { 
    this.retail_web_framework = this.$session.get("retail_web_framework");
    this.country_list = countries;
    if (
      !this.$session.has("CompanyId") &&
      this.$session.get("UserInformation").role == "SuperAdmin"
    ) {
      toastr.warning(tlt('billing_select_company_name_msg'));
    }
    if (this.user_role == "SuperAdmin") {
      if (this.$session.has("CompanyId")) {
        this.companyid = this.$session.get("CompanyId");
        this.companyname = this.$session.get("CompanyName");
      } else {
        this.companyid = this.$session.get("UserInformation").company_id;
        this.companyname = this.$session.get("UserInformation").company_name;
      }
    } else {
      this.companyid = this.$session.get("UserInformation").company_id;
      this.companyname = this.$session.get("UserInformation").company_name;
    }
    if (
      this.$session.get("UserInformation").country_name == "" &&
      !this.$session.has("country_name")
    ) {
    } else {
      axios
        .get(api_calls.billing_invoice(), {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          },
        })
        .then((response) => {
          if (response.data.message.MSG_CODE === this.api_status_code.DATA_AVAILABLE.MSG_CODE) {
              this.total_year = response.data.data.YearList;
              this.year_selected = this.total_year[0];         
          }else {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              timer: 2500,
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
      axios
        .post(
          api_calls.billing_invoice(),
          {
            company_id: this.$session.get("UserInformation").company_id,
            company_name: this.$session.get("UserInformation").company_name,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            download_file: false,
            year: this.year_selected,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          if (response.data.message.MSG_CODE === this.api_status_code.DATA_AVAILABLE.MSG_CODE) {
              this.invoice_details = response.data.data.Bucket_list;
              for (var i = 0; i < this.invoice_details.length; i++) {
                this.invoice_details_copy[i] = this.invoice_details[i].slice(8);
              }
          }else {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              timer: 2500,
              type: "error"
            })
          }
          // console.log(this.invoice_details_copy);
        })
        .catch((e) => {
          console.log(e,'rr');
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    }
    let is_shopify = this.retail_web_framework;
    if (Boolean(is_shopify) && is_shopify === "shopify") {
      this.retail_shopify_company = true;
    }
    this.get_shop_base_currency();
    this.check_addons_balance();
  },
   watch: {
    selected_addon_plan(){
      this.stripe_addon_type = [];
      this.selected_addon_type= null;
      if(this.selected_addon_plan !== null){
        this.stripe_addon_type = this.selected_addon_plan.Options;
      }
    }
  },
  mounted() { 

    this.get_plans_from_db(); // Get plans from db
    this.get_addon_details(); // Get Add Ons from cense db
    this.get_current_subscription_details(); // get subscription details from cense_db
    if (
      this.$session.get("UserInformation").country_name == "" &&
      !this.$session.has("country_name")
    ) {
      $("#countrymodal")
        .modal({
          backdrop: "static",
        })
        .on("hidden.bs.modal", (e) => {
          if (!this.$session.has("country_name")) {
            $("#countrymodal").modal("hide");
            this.$router.push("/bot/dashboard");
            this.$root.$emit("change_sidebar_main_menu", "Dashboard");
          }
        });
    }
  },
  computed: {
    check_retail_payment_type_disabled() {
      if (
        Boolean(this.retail_plan_current) &&
        this.retail_plan_current.is_chargeable === false
      ) {
        return true;
      }
      return false;
    },
    retail_payment_placeholder() {
      if (this.check_retail_payment_type_disabled) {
        return this.tlt('no_billing_cycle_msg');
      }
      return this.tlt('pick_one_msg');
    },
    current_retail_plan_charges() {
      // if(this.retail_shopify_company) {
      return Boolean(this.retail_plan_current)
        ? this.retail_plan_current.is_chargeable
          ? `$${this.retail_plan_current.monthly_charge}/month  or $${this.retail_plan_current.annual_charge.per_month_effective}/month billed at $${this.retail_plan_current.annual_charge.actual_charge} once per year`
          : null
        : null;
      // } else {
      //   return Boolean(this.retail_plan_current)
      //   ? this.retail_plan_current.is_chargeable
      //     ? `$${this.retail_plan_current.monthly_charge}/month`
      //     : null
      //   : null;
      // }
    },
    check_retail_shopify_form_validations() {
      if (
        this.retail_plan_current !== null &&
        this.retail_payment_type !== null
      ) {
        return true;
      } else if (
        this.retail_plan_current !== null &&
        this.retail_payment_type == null &&
        this.retail_plan_current.is_chargeable === false
      ) {
        return true;
      }
      return false;
    },
    first_step() {
      if(this.stripe_subscription_plans) {
        return this.stripe_subscription_plans.filter(plans => plans.Type !== 'Free').map(plans => plans.Type);
      }else {
        return [];
      }
    },
    retail_shopify_subscription_plans_custom_currency(){
      if(this.stripe_subscription_plans_details.subscription_type !== 'Premium'){
        return this.retail_shopify_subscription_plans.filter((item) => item.currency === this.shop_base_currency)
      }else {
        return this.retail_shopify_subscription_plans.filter((item) => (item.currency === this.shop_base_currency && (item.name === "Starter" || item.name === "WhatsApp") ) )
      }
    },
    // retail_shopify_subscription_plans_check_currentplan(){
    //   if(this.stripe_subscription_plans_details.subscription_type !== 'Premium'){
    //     return this.retail_shopify_subscription_plans
    //   }else{
    //     return this.retail_shopify_subscription_plans.filter((item) =>  item.name === "Starter")
    //   }
    // },
    second_step(){
      var temp = []
      if(this.stripe_subscription_plans && this.retail_plan_current) {
        temp = this.stripe_subscription_plans.filter(plans => plans.Type == this.retail_plan_current);
        var sorted =  (temp[0].PriceOptions).filter(abc =>  abc.currency === this.shop_base_currency);
        return sorted;
      }
      return temp;
    },
    first_step_addon_plans(){
      if(this.stripe_addon_plans) {
        return this.stripe_addon_plans.map(plans => plans.Type);
      }
    },
    second_step_addon_plans(){
      // console.log("selected_addon_plan",this.selected_addon_plan);
      if(this.selected_addon_plan) {
        var check = this.selected_addon_plan['PriceOptions'].filter(plan => plan.currency == this.shop_base_currency);
        return check;
      }
      return [];
    },
    retail_payment_types(){
     
      if (this.retail_plan_current == null) {
        return this.payment_types;
      }else if (this.retail_plan_current.name == this.stripe_subscription_plans_details.subscription_type) {
         let sub_type = this.stripe_subscription_plans_details.subscription_period == 'Yearly'?'Annual': 'Monthly'
        return this.payment_types.filter((item)=> item != sub_type); 
      }else if (this.retail_plan_current.name == 'WhatsApp'){
        return this.payment_types.filter((item)=> item != 'Annual');
      } else {
        return this.payment_types;
      }
    }
  },
  methods: {
  // nameWithLang ({ type, count }) {
  //   return `${type} ${this.selected_addon_plan.Service}[${count}]`
  // },
  // namewithPrice({name,Price}){
  //   return `${name} ($${Price})`
  // },
  show_swal_notification(){
      Swal.fire({
          title: this.tlt('billing_swal_alert_msg'),
          text: this.tlt('billing_unsubscribe_plan_msg'),
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: this.tlt('billing_swal_yes_btn')
      }).then((result) => {
        if (result.value == true) {
          this.update_subscription_plan_free()
          Swal.fire(
           this.tlt('billing_swal_unsubscribed_msg'),
           this.tlt('billing_subscribe_cancel_msg'),
            'success'
          )
        }
      })
  },
  get_subscription_valid_till(sub_date){
      return moment.utc(sub_date).format("Do MMMM YYYY");
  },
  update_subscription_plan_free(){
       axios
        .post(
          api_calls.stripe_payment_gateway(),
          {
            company_id: this.companyid,
            company_name: this.companyname,
            unsubscribe_plan: true,    
            email: this.$session.get("UserInformation").email
          }
        )
        .then((response) => {
          if (response.data.message.MSG_CODE === this.api_status_code.DATA_AVAILABLE.MSG_CODE)
          {
            let message = response.data.data.UserMenu;
            this.update_sidebar_menu(message);
            this.$root.$emit("SideBarMenuUpdated", true);
            //  console.log("update successfully")
            this.update_restriction_list(response.data.data.RestrictionList, response.data.data.SubscribedPlan)
            this.get_current_subscription_details()
            this.$router.push("/bot/subscription-renewal");
          } else {
            Swal({
              // title: this.tlt('billing_error_occurred_msg9'),
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
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
  },
  get_plans_from_db() {
    this.spinnerOn = true;
      axios
        .post(api_calls.stripe_payment_gateway(), {
          company_id: this.companyid,
          company_name: this.companyname,
          get_plans_from_db: true,
        })
        .then((response) => {
          if (response.data.message.MSG_CODE === this.api_status_code.DATA_AVAILABLE.MSG_CODE)
          {
            this.spinnerOn = false;
            this.stripe_subscription_plans = response.data.data;
            this.show_subscription = true;
          } else {
            this.stripe_subscription_plans_details = [];
          }
        })
        .catch((e) => {
          this.spinnerOn = false;
          Swal.fire({
            title: this.tlt('billing_error_occurred_msg2'),
            type: "error",
          });
        });
  },
  get_current_subscription_details() {
    this.spinnerOn = true;
      axios
        .post(api_calls.stripe_payment_gateway(), {
          company_id: this.companyid,
          company_name: this.companyname,
          get_active_plan: true,
        })
        .then((response) => {
          if (response.data.message.MSG_CODE === this.api_status_code.DATA_AVAILABLE.MSG_CODE)
          {
            this.spinnerOn = false;
            this.stripe_subscription_plans_details = response.data.data.Data.current_subscription;
            this.hide_button = response.data.data.Data.current_subscription.subscription_type;
            this.show_subscription = true;
          } else {
            this.stripe_subscription_plans_details = [];
              Swal({
              title:response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              timer: 2500,
              type: "error"
            });
          }
        })
        .catch((e) => {
          this.spinnerOn = false;
          console.log(e ,'eee');
          Swal.fire({
            title: this.tlt('billing_error_occurred_msg2'),
            type: "error",
          });
        });
  },
  // get_current_subscription() {
  //   axios
  //     .post(api_calls.razorpay_communcation(), {
  //       company_id: this.companyid,
  //       company_name: this.companyname,
  //       is_get: true,
  //     })
  //     .then((response) => {
  //       // console.log("CURRENT PLAN DETAILS",response);
  //       if (response.data == null) {
  //         this.subscription_btn_disable = true;
  //         Swal({
  //           title: this.tlt('billing_no_active_subscription_msg1'),
  //           type: "error",
  //           toast: true,
  //           showConfirmButton: false,
  //           timer: 2000,
  //         });
  //       } else if (response.data.MSG == "Current Subscription Plan") {
  //         this.selected_subscription =
  //           response.data.subscription.subscription_type;
  //         this.selected_period = response.data.subscription.period;
  //         this.customer_id = response.data.customer_id;
  //         this.subscription_btn_disable = false;
  //       } else if (response.data.MSG == "No Active Subscription plan found") {
  //         this.customer_id = response.data.customer_id;
  //         Swal({
  //           title: this.tlt('billing_no_active_subscription_msg2'),
  //           type: "warning",
  //           toast: true,
  //           showConfirmButton: false,
  //           timer: 2000,
  //         });
  //         this.subscription_btn_disable = true;
  //       }
  //     })
  //     .catch((e) => {
  //       this.spinnerOn = false;
  //       if (
  //         e.response.status === 410 ||
  //         e.response.status === 440 ||
  //         e.response.status === 409
  //       ) {
  //         this.$root.$emit("Session_Expired", e.response.data);
  //       }
  //     });
  // },
  check_addons_balance() {
    this.spinnerOn = true;
    axios.post(
      api_calls.check_addons_balance(),
      {
        company_name: this.companyname,
        company_id: this.companyid,
        check_balance: true
      },
      {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          },
        }
    )
    .then((response) =>{
      // console.log(response);
      this.spinnerOn = false;
      if(response.data.message.MSG_CODE === this.api_status_code.CHECK_BALANCE.MSG_CODE){
        if(Boolean(response.data.data.credits.sms_count) == true) {
          var sms_count = response.data.data.credits.sms_count;
          this.credits_balance = sms_count;
          // this.credits_balance = this.tlt('current_sms_credit_text') + "<strong> "+ this.tlt('current_sms_credit_text2') + ": " + sms_count.us + " | " + this.tlt('current_sms_credit_text3') + ": " + sms_count.non_us + "</strong>"
        }else {
          Swal.fire({
            title: response.data.message.MSG_CODE,
            text: response.data.message.MSG,
            showCancelButton: false,
            showConfirmButton: false,
            type: "error"
          });
        }
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
  get_addon_details() {
    axios
      .post(api_calls.stripe_payment_gateway(), {
        get_add_ons: true,
      })
      .then((response) => {
        if (response.data.message.MSG_CODE === this.api_status_code.NO_ADD_ONS_FOUND.MSG_CODE) {
          this.stripe_addon_plans = [];
          return;
        }else if (response.data.message.MSG_CODE === this.api_status_code.DATA_AVAILABLE.MSG_CODE){ 
          if (Boolean(response.data.data) != false ) {
            this.stripe_addon_plans = response.data.data;
          }
      }  else {
          Swal({
            title:response.data.message.MSG_CODE,
            text:response.data.message.MSG,
            showCancelButton: false,
            showConfirmButton: false,
            timer: 2500,
            type: "error"
          })
        }
      })
      .catch((e) => {
        console.log(e);
        Swal.fire({
          title: this.tlt('billing_error_occurred_msg3'),
          type: "error",
        });
      });
  },
  // get_subscription_details() {
  //   axios
  //     .post(api_calls.stripe_payment_gateway(), {
  //       company_id: this.companyid,
  //       company_name: this.companyname,
  //       get_plans: true,
  //     })
  //     .then((response) => {
  //       // console.log(response.data);
  //       if (
  //         response.data.Status === "Success" &&
  //         response.data.Data.data.length > 0
  //       ) {
  //         this.stripe_subscription_plans = response.data.Data.data;
  //       } else {
  //         this.stripe_subscription_plans = [];
  //       }
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       Swal.fire({
  //         title: this.tlt('billing_error_occurred_msg4'),
  //         type: "error",
  //       });
  //     });
  // },
  cancel_subscription() {
    axios
      .post(api_calls.razorpay_communcation(), {
        is_cancel: true,
        subscription_id: this.subscription_id,
      })
      .then((response) => {
        if (response.data.message.MSG_CODE === this.api_status_code.SUBSCRIPTION_CANCEL_SUCCESS.MSG_CODE) {
          this.subscription_btn_disable = true;
        } else {
          Swal({
            title: this.tlt('billing_internal_server_msg1'),
            type: "error",
            showConfirmButton: false,
            timer: 2000,
          });
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
  create_customer() {
    if (this.selected_subscription == "" || this.selected_period == "") {
      Swal({
        type: "info",
        text: this.tlt('billing_subscribe_plan_period_msg'),
        toast: true,
        position: "top-right",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    var period = this.selected_period.toLowerCase();
    for (var i in this.subscription_plans) {
      if (period == this.subscription_plans[i].period) {
        if (
          this.selected_subscription == this.subscription_plans[i].item.name
        ) {
          this.plan_id = this.subscription_plans[i].id;
          // console.log("PLAN NAME:", this.subscription_plans[i].item.name);
          // console.log("PLAN ID:", this.subscription_plans[i].id);
        }
      }
    }
    if (this.plan_id == "") {
      Swal({
        title: this.tlt('billing_plan_not_found_msg'),
        type: "error",
        text: this.tlt('billing_contact_cense_admin_msg'),
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    if (this.customer_id == "") {
      var cust_data = {
        name: this.companyname,
        contact: "",
        email: this.$session.get("UserInformation").email,
        notes: { Extra: "Details related to customer" },
      };
      axios
        .post(api_calls.razorpay_communcation(), {
          company_id: this.companyid,
          company_name: this.companyname,
          create_customer_id: true,
          data: cust_data,
        })
        .then((response) => {
          if (data.message.MSG_CODE === this.api_status_code.STATUS_SUCCESS.MSG_CODE) {
            var customer_detail = response.data.data.Customer_Detail;
            this.customer_id = response.data.data.Customer_Detail.id;
            // console.log("customer id",this.customer_id);
            this.create_subscription(this.plan_id, this.customer_id);
          } else {
            Swal({
              title: this.tlt('billing_internal_server_msg2'),
              type: "error",
              text: this.tlt('billing_error_creating_cust_id_msg'),
              timer: 2000,
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
    } else {
      this.create_subscription(this.plan_id, this.customer_id);
    }
  },
  create_subscription(plan_id, customer_id) {
    var sub_data = {
      plan_id: plan_id,
      customer_id: customer_id,
    };
    axios
      .post(api_calls.razorpay_communcation(), {
        create_subscription: true,
        data: sub_data,
      })
      .then((response) => {
        if (response.data.message.MSG_CODE === this.api_status_code.STATUS_SUCCESS.MSG_CODE ) {
          this.subscription_id = response.data.data.Subscription_Detail.id;
          // console.log("Subscription id", response);
          this.start_payment(this.subscription_id);
        } else {
          Swal({
            title: this.tlt('billing_internal_server_msg3'),
            type: "error",
            text: this.tlt('billing_error_creating_subscription_msg'),
            timer: 2000,
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
  },
  start_payment(subscription_id) {
    var vm = this;
    // start_payment(){
    //   var vm = this;
    //   var data = {
    //     order_amount: 50000,
    //     order_currency: 'INR',
    //     order_receipt: 'order_rcptid_11',
    //     payment_capture: 1,
    //     notes: {'Shipping address': 'Bommanahalli, Bangalore'}
    //   }
    //   axios.
    //     post(
    //       api_calls.razorpay_communcation(),
    //       {
    //         generate_order_id: true,
    //         data: data
    //       }).then((response) => {
    //       if(response.data.MSG == "Order ID created"){
    //         console.log(response.data.Order_Detail);
    //         vm.order_id = response.data.Order_Detail.id;
    //         vm.amount = response.data.Order_Detail.amount;
    //         console.log("reached");
    var options = {
      key: process.env.VUE_APP_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      subscription_id: subscription_id, // You dont need amount/currency/order_id when submitting subscription id
      // "amount": this.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      // "currency": "INR",
      name: "Cense AI",
      description: "Test Transaction",
      image: require("@/portal/assets/img/cense_logo.png"),
      // "order_id": this.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        // console.log("FINAL PAY", response);
        var razorpay_payment_id = response.razorpay_payment_id;
        // var razorpay_order_id = response.razorpay_order_id;
        var razorpay_subscription_id = response.razorpay_subscription_id;
        var razorpay_signature = response.razorpay_signature;
        vm.pay_success_data = {};
        vm.pay_success_data = {
          razorpay_payment_id: razorpay_payment_id,
          // razorpay_order_id: razorpay_order_id,
          razorpay_subscription_id: razorpay_subscription_id,
          razorpay_signature: razorpay_signature,
          razorpay_customer_id: vm.customer_id,
          // order_id: this.order_id,
          subscription_status: "active",
          subscription_id: vm.subscription_id,
          plan_id: vm.plan_id,
          subscription_type: vm.selected_subscription,
          subscription_period: vm.selected_period,
        };
        // console.log("PAYMENT SUCCESS DATA",vm.pay_success_data);
        if (Object.keys(vm.pay_success_data).length != 0) {
          vm.add_details_to_server(vm.pay_success_data);
        } else {
          // console.log("Transaction did not succeed");
        }
      },
      // "prefill": {
      //     "name": "Gaurav Kumar",
      //     "email": "gaurav.kumar@example.com",
      //     "contact": "+919876543210"
      // },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      // console.log("error", response);
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    // }
    // })
    // .catch((e) => {
    //   this.spinnerOn = false;
    //     if (
    //       e.response.status === 410 ||
    //       e.response.status === 440 ||
    //       e.response.status === 409
    //     ) {
    //       this.$root.$emit("Session_Expired", e.response.data);
    //     }
    //   });
  },
  add_details_to_server(data) {
    if (data != null) {
      axios
        .post(api_calls.razorpay_communcation(), {
          company_id: this.companyid,
          company_name: this.companyname,
          verify_subscription: true,
          data: data,
        })
        .then((response) => {
          if (response.data.message.MSG_CODE === this.api_status_code.SUBSCRIPTION_VERIFICATION_SUCCESS.MSG_CODE) {
            Swal({
              title: this.tlt('billing_subscription_register_msg'),
              type: "success",
              timer: 2000,
            });
            this.pay_success_data = {};
            this.subscription_btn_disable = false;
          } else {
            Swal({
              title: this.tlt('billing_internal_server_msg4'),
              type: "error",
              text: this.tlt('billing_error_occur_subscription_msg'),
              toast: true,
              timer: 2000,
            });
            this.pay_success_data = {};
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
  // toggle_change(value) {
  //   if (value == "INR") {
  //     this.common_currency = this.INR;
  //   } else {
  //     this.common_currency = this.USD;
  //   }
  //   if (value == "INR") {
  //     this.common_currency2 = this.INR2;
  //   } else {
  //     this.common_currency2 = this.USD2;
  //   }
  // },
  download_invoice(num) {
    this.spinnerOn = true;
    axios({
      method: "post",
      url: api_calls.billing_invoice(),
      responseType: "blob",
      data: {
        company_id: this.$session.get("UserInformation").company_id,
        company_name: this.$session.get("UserInformation").company_name,
        email: this.$session.get("UserInformation").email,
        license_key: this.$session.get("UserInformation").license_key,
        token: this.$session.get("UserInformation").tokens,
        download_file: true,
        file_name: this.invoice_details[num],
      },
      headers: {
        Authorization: `Bearer ${this.$session.get("at")}`,
      },
    })
      .then((response) => {
        this.spinnerOn = false;
        if (response.data.message.MSG_CODE === this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
          this.spinnerOn = false;
          toastr.error(
            this.tlt('billing_download_invoice_msg')
          );
        } else {
          this.spinnerOn = false;
          var url = window.URL.createObjectURL(new Blob([response.data.data]));
          var link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Ashish" + ".pdf");
          document.body.appendChild(link);
          link.click();
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
  call_payment(type) {
    var d = new Date();
    // console.log(d);
    var vm = this;
    var options = {};
    if (type == "country_selected") {
      if (this.country_name.code == "") {
        alert(this.tlt('billing_select_country_msg'));
      } else {
        this.spinnerOn = true;
        axios
          .post(
            api_calls.edit_profile_url(),
            {
              company_id: this.$session.get("UserInformation").company_id,
              company_name: this.$session.get("UserInformation").company_name,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              first_name: this.$session.get("UserInformation").first_name,
              last_name: this.$session.get("UserInformation").last_name,
              country_name: this.country_name.code,
              phone_number: this.$session.get("UserInformation").phone_no,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            this.spinnerOn = false;
            if (response.data.message.MSG_CODE === this.api_status_code.PROFILE_UPDATED.MSG_CODE ) {
              //   Swal({
              //   title: "Updated Successfully!!",
              //   type: "success",
              //   text: "Your profile has been updated successfully.",
              //   timer:2000,
              // });
              toastr.success(this.tlt('billing_profile_updated_msg'));
              this.$session.set("country_name", this.country_name.code);
              setTimeout(() => {
                this.$router.go();
              }, 2500);
            }
            $("#countrymodal").modal("hide");
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
    } else if (event.target.innerText == "Pay") {
      if (this.value_currency_top_up == "") {
        toastr.error(this.tlt('billing_select_amount_msg1'));
      } else if (this.payment_currency == "INR") {
        this.value_currency_top_up = this.value_currency_top_up.slice(2, -10);
        this.currency_amount = this.value_currency_top_up * 118;
        this.top_up_amount = this.value_currency_top_up;
        if (this.payment_currency == "INR") {
          this.top_up_amount /= 70;
        }
        pay_amount(this.currency_amount, this.payment_currency, "Top Up");
      } else {
        this.value_currency_top_up = this.value_currency_top_up.slice(2);
        this.currency_amount = this.value_currency_top_up * 100;
        this.top_up_amount = this.value_currency_top_up;

        pay_amount(this.currency_amount, this.payment_currency, "Top Up");
      }
    } else if (event.target.innerText == "Subscribe") {
      this.spinnerOn = true;
      if (this.value_currency_subscription == "") {
        toastr.error(this.tlt('billing_select_amount_msg2'));
      } else if (this.payment_currency == "INR") {
        this.value_currency_subscription =
          this.value_currency_subscription.slice(2, -10);
        this.currency_amount = this.value_currency_subscription * 118;
        this.top_up_amount = this.value_currency_subscription;
        if (this.payment_currency == "INR") {
          this.top_up_amount /= 70;
        }
        axios
          .post(
            api_calls.billing_subscription_url(),
            {
              company_id: this.$session.get("UserInformation").company_id,
              company_name: this.$session.get("UserInformation").company_name,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              PlanAmount: this.top_up_amount,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            if (response.data.SubscriptionId) {
              pay_amount(response.data.SubscriptionId, "", "Subscribe");
            } else if (response.data.Error) {
              toastr.error(response.data.Error);
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
        this.value_currency_subscription =
          this.value_currency_subscription.slice(2);
        this.currency_amount = this.value_currency_subscription * 100;
        this.top_up_amount = this.value_currency_subscription;
        this.spinnerOn = true;
        axios
          .post(
            api_calls.billing_subscription_url(),
            {
              company_id: this.$session.get("UserInformation").company_id,
              company_botname: this.$session.get("UserInformation").company_name,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              PlanAmount: this.currency_amount,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            this.spinnerOn = false;
            if (response.data.SubscriptionId) {
              pay_amount(response.data.SubscriptionId, "", "Subscribe");
            } else if (response.data.Error) {
              toastr.error(response.data.Error);
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
    }
    function pay_amount(amount, currency_type, payment_type) {
      if (payment_type == "Subscribe") {
        options = {
          key: "rzp_test_SnDTaPnncfliDt",
          subscription_id: amount, //This is actually subscription ID
          // subscription_card_change: 1,
          name: "Cense AI",
          description: "Instill Intelligence",
          image: "/img/cense_image.png", // COMPANY LOGO
          handler: function (response) {
            // console.log(response.razorpay_payment_id);
            // var contact = $('#contact[type="tel"]').value;
            // var email = $('#email[type="email"]').value;
            vm.paymentid = response.razorpay_payment_id;
            vm.value_currency_subscription = "";
          },
          prefill: {
            name: "", // pass customer name
            email: "", // customer email
            contact: "", //customer phone no.
          },
          notes: {
            address: "address", //customer address
          },
          theme: {
            color: "#283777", // screen color
          },
        };
        load_checkout();
      } else if (payment_type == "Pay") {
        options = {
          key: "rzp_test_SnDTaPnncfliDt",
          amount: amount, // Example: 2000 paise = INR 20
          currency: currency_type,
          name: "Cense AI",
          description: "Instill Intelligence",
          image: "/img/cense_image.png", // COMPANY LOGO

          handler: function (response) {
            // console.log(response.razorpay_payment_id);
            var contact = $('#contact[type="tel"]').value;
            var email = $('#email[type="email"]').value;
            vm.paymentid = response.razorpay_payment_id;
            vm.value_currency_top_up = "";
          },
          prefill: {
            name: "", // pass customer name
            email: "", // customer email
            contact: "", //customer phone no.
          },
          notes: {
            address: "address", //customer address
          },
          theme: {
            color: "#283777", // screen color
          },
        };
        load_checkout();
      }
    }
    function load_checkout() {
      var rzp1 = new Razorpay(options);
      rzp1.open();
      event.preventDefault();
    }
  },
  check_retail_plan(value, id) {
    this.retail_payment_type = null;
  },
  subscribe_retail_plan() {
    // let subscription_data = {
    //   subscription_plan: this.retail_plan_current,
    //   billing_cycle: this.retail_payment_type,
    // };
    if (this.check_retail_shopify_form_validations) {
      this.spinnerOn = true;
      axios
        .post(api_calls.subscribe_shopify_billing(), {
          subscription_plan: this.retail_plan_current,
          billing_cycle: this.retail_payment_type,
          company_id: this.companyid,
          company_name: this.companyname,
          is_paid_plan: this.retail_plan_current.is_chargeable,
          email: this.$session.get("UserInformation").email,
        })
        .then((response) => {
          this.spinnerOn = false;
          if (response.data.message.MSG_CODE === this.api_status_code.STATUS_SUCCESS_MODELS.MSG_CODE) {
            if (this.retail_payment_type == "Annual") {
              if (
                Boolean(response.data.data) &&
                Boolean(response.data.data.data.appSubscriptionCreate)
              ) {
                Swal({
                  title:
                    this.tlt('billing_redirect_shopify_merchant_msg'),
                  toast: true,
                  showCancelButton: false,
                  type: "info",
                  showConfirmButton: false,
                });
                setTimeout(() => {
                  window.location =
                    response.data.data.data.appSubscriptionCreate.confirmationUrl;
                }, 1000);
                this.$root.$emit("DashboardSidebarDisable",false);
                this.$session.set("SettingTopnavbarDisable",false);
              }
            } else if (this.retail_payment_type == "Monthly") {
              if (Boolean(response.data.data.confirmation_url)) {
                // Swal({
                //   title: "Please wait while we redirect You to the Shopify Merchant UI!",
                //   toast: true,
                //   type: "info",
                //   showCancelButton: false,
                //   showConfirmButton: false
                // })
                this.$root.$emit("DashboardSidebarDisable",false);
                this.$session.set("SettingTopnavbarDisable",false);
                setTimeout(() => {
                  window.location = response.data.data.confirmation_url;
                }, 1000);
              } else {
                Swal({
                  title: this.tlt('billing_error_occurred_msg5'),
                  text: this.tlt('billing_swal_try_again_msg1'),
                  type: "error",
                  showCancelButton: false,
                });
              }
            } else if (this.retail_plan_current.is_chargeable === false) {
              Swal({
                title: this.tlt('billing_swal_success_msg'),
                type: "success",
                text: this.tlt('billing_subscribe_free_plan_msg'),
              });
            }
          }else {
            Swal.fire({
              title:response.data.message.MSG_CODE,
              text:response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              timer: 2500,
              type: "error"
            });
          }
        })
        .catch((e) => {
          this.spinnerOn = false;
          console.log(e);
          Swal({
            title: this.tlt('billing_error_occurred_msg6'),
            text: this.tlt('billing_swal_try_again_msg2'),
            type: "error",
            showCancelButton: false,
          });
        });
    } else {
      Swal({
        title: this.tlt('billing_select_all_required_value_msg'),
        type: "error",
        toast: true,
        showCancelButton: false,
        showConfirmButton: false,
        timer:3000
      });
    }
  },
  submit_stripe_checkout() {
    if(this.retail_plan_current !== null && this.retail_payment_type !== null){
      // let chosen_plan_data = this.retail_payment_type==="Monthly" || this.retail_plan_current.name==="WhatsApp" ? this.stripe_subscription_plans.find((item => (item.amount/100 === this.retail_plan_current.monthly_charge) && (item.currency === this.shop_base_currency)))  : this.stripe_subscription_plans.find((item => (item.amount/100 === this.retail_plan_current.annual_charge.actual_charge) &&  (item.currency === this.shop_base_currency))) 
      // console.log("retail_payment_type",this.retail_payment_type);
      
      var chosen_plan_data = {
        "plan_name" : this.retail_plan_current,
        "type": this.retail_payment_type.type,
        "nickname" : this.retail_payment_type.nickname,
        "price" : this.retail_payment_type.price,
        "currency": this.retail_payment_type.currency,
        "id": this.retail_payment_type.price_id
      }
      this.spinnerOn = true;
      axios
        .post(api_calls.stripe_payment_gateway(), {
          generate_new_request: true,
          chosen_plan_data: chosen_plan_data,
          company_id: this.companyid,
          company_name: this.companyname,
          request_type: "Plan",
          email: this.$session.get("UserInformation").email,
        })
        .then((response) => {
          this.spinnerOn = false;
          if (response.data.message.MSG_CODE === this.api_status_code.DATA_AVAILABLE.MSG_CODE) {
            window.location = response.data.data;
             this.$root.$emit("DashboardSidebarDisable",false);
             this.$session.set("SettingTopnavbarDisable",false);
          } else {
            Swal({
              // title: this.tlt('billing_error_occurred_msg7'),
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              timer: 2500,
              type: "error"
            });
          }
          // console.log(response.data);
        })
        .catch((e) => {
          this.spinnerOn = false;
          console.log(e);
          Swal({
            title: this.tlt('billing_error_occurred_msg8'),
            type: "error",
          });
        });
    }else {
      Swal({
        title: this.tlt('billing_select_all_field_msg'),
        type: "error",
        showCancelButton: false
      });
    }
  },
  submit_stripe_addon_checkout() {
    if(this.selected_addon_type === null ||this.selected_addon_plan === null ){
    Swal({
        title: this.tlt('billing_select_all_field_msg1'),
        type: "error",
      });
      return;
    }

    var chosen_plan_data = {
      "plan_name" : this.selected_addon_plan.Type ,
      "price" : this.selected_addon_type.price,
      "currency": this.selected_addon_type.currency,
      "id": this.selected_addon_type.price_id
    }

    this.spinnerOn = true;
      axios
        .post(api_calls.stripe_payment_gateway(), {
          generate_new_request: true,
          chosen_plan_data: chosen_plan_data,
          company_id: this.companyid,
          company_name: this.companyname,
          request_type: "AddOn"
        })
        .then((response) => {
          this.spinnerOn = false;
          if (response.data.message.MSG_CODE === this.api_status_code.DATA_AVAILABLE.MSG_CODE) {
            window.location = response.data.data;
          } else {
            Swal({
              // title: this.tlt('billing_error_occurred_msg9'),
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              timer: 2500,
              type: "error"
            });
          }
          // console.log(response.data);
        })
        .catch((e) => {
          this.spinnerOn = false;
          console.log(e);
          Swal({
            title: this.tlt('billing_error_occurred_msg10'),
            type: "error",
          });
        });
  },
  get_shop_base_currency(){
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
      ).then((response) => {
        let web_framework = this.retail_web_framework;
        if (
            response.data.message.MSG_CODE != this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE &&
            response.data.message.MSG_CODE != this.api_status_code.NO_DATA_AVAILABLE.MSG_CODE
        ) {
          this.shop_base_currency = response.data.data[web_framework + '_details'].base_currency.value;
          this.shop_base_currency = this.acceptable_shop_base_currencies.includes(this.shop_base_currency) ?  this.shop_base_currency.toLowerCase() : 'usd'
        }
      }).catch((e) => {
        this.shop_base_currency = 'usd';
      })
  },
  },
};
</script>
<style scoped>
.red-btn{
    font-size: 14px;
    color: #fff;
    background: #F23D3D;;
    border: solid 1px #F23D3D;;
    padding: 6px 15px;
    font-weight: 400;
    line-height: 20px;
    display: inline-block;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 18px

}
.red-btn:hover {
  background: none;
  color: #273679;
}

.dash-card .card-body {
  min-height: fit-content;
}
.col-lg-2 {
  width: 100%;
  margin-bottom: 1%;
}
#year_select_id {
  padding: 5px 5px 5px 5px;
}
#payment_btn {
  margin-left: auto;
  width: auto;
  text-align: center;
  padding: 6px 15px;
}
.table td,
.table th {
  vertical-align: baseline;
}
</style>

<style>
/* .multiselect__tags {
  min-height: 38px !important;
  max-height: 42px !important;
  height: 42px;
} */
</style>