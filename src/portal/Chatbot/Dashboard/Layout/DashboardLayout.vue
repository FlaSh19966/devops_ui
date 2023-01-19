<template>
  <body class="dashboard">
    <div
      class="dash-wrap"
      id="main_dashboard"
      v-if="setup_api_call_response_received"
    >
      <top-navbar
        v-if="$route.name != 'Workflow' && $route.name != 'OpenBot' && $route.name !='WhatsApp Chat NewPage'"
      ></top-navbar>
      <div v-if="!is_retail">
        <side-bar :style="sidebar_disable()"
          v-if="$route.name != 'Workflow' && $route.name != 'OpenBot' && $route.name !='WhatsApp Chat NewPage'" 
          :key="sidebar_key"
        ></side-bar>
        <zoom-center-transition :duration="200" mode="out-in">
          <div
            class="dash-cont"
            v-bind:class="{ 'dash-cont1': $route.name == 'Workflow' || $route.name == 'WhatsApp Chat NewPage'}"
          >
            <router-view></router-view>
          </div>
        </zoom-center-transition>
      </div>
      <div v-else>
        <setup></setup>
      </div>
    </div>
  </body>
</template>
<script>
import TopNavbar from "./TopNavbar.vue";
import SideBar from "./SideBar.vue";
import swal from "sweetalert2";
import { SlideYDownTransition, ZoomCenterTransition } from "vue2-transitions";
import axios from "axios";
import api_calls from "@/portal/api_calls";
import { setTimeout } from "timers";
import { bus } from "@/portal/main";
import Setup from "./Setup.vue";
import moment from "moment";

export default {
  name: "dashboard-layout",
  data() {
    return {
      spinnerOn: false,
      display_list: this.$session.has("ChatbotMenu")
        ? this.$session.get("ChatbotMenu")
        : [],
      user_role: this.$session.has("UserInformation")
        ? this.$session.get("UserInformation").role
        : "",
      refresh_token_api_on: false,
      jwt_token_interval: null,
      models_status_interval: null,
      is_retail: false,
      send_status: true,
      setup_api_call_response_received: false,
      expiry_day_date_mapping: {
        0: "within a day",
        1: "in a day",
        2: "in 2 days",
        3: "in 3 days",
        4: "in 4 days",
        5: "in 5 days",
        6: "in 6 days",
        7: "in a week"
      },
      sidebar_key: 0,
      disable_sidebar: false,
      is_free_trial:false,
    };
  },
  components: {
    TopNavbar,
    SideBar,
    SlideYDownTransition,
    ZoomCenterTransition,
    Setup
  },
  created() {
    if (this.$session.has("UserInformation")) {
      this.jwt_token_interval = window.setInterval(() => {
        axios
          .post(
            api_calls.refresh_token_url(),
            {},
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("rt")}`
              }
            }
          )
          .then(response => {
            this.$session.set("at", response.data.data.access_token);
          })
          .catch(() => {
            this.$session.destroy();
            clearInterval(this.jwt_token_interval);
            clearInterval(this.models_status_interval);
            this.models_status_interval = null;
            this.jwt_token_interval = null;
            this.$router.push("/bot/login");
          });
      }, 14 * 60 * 1000);
      axios
        .post(
          api_calls.token_verification_url(),
          {
            token: this.$session.get("UserInformation").tokens,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`
            }
          }
        )
        .then(response => {
          if (
            response.data.message.MSG_CODE == this.api_status_code.TOKEN_INVALID_0001.MSG_CODE ||
            response.data.message.MSG_CODE == this.api_status_code.INVALID_CREDENTIALS_0005.MSG_CODE
          ) {
            swal({
              type: "error",
              text:
                this.tlt('layout_dashboard_loggedin_again', 'code'),
              allowOutsideClick: false
            }).then(result => {
              if (result.value) {
                setTimeout(() => {
                  this.$session.destroy();
                  clearInterval(this.jwt_token_interval);
                  this.$router.push("/bot/login");
                }, 500);
              }
            });
          } else if (response.data.message.MSG_CODE == this.api_status_code.SESSION_TOKEN_VALID.MSG_CODE) {
          }
        })
        .catch(e => {
          this.$session.destroy();
          clearInterval(this.jwt_token_interval);
          this.jwt_token_interval = null;
          this.$router.push("/bot/login");
          console.log(e);
        });
    }
    if (this.$session.has("UserInformation")) {
      bus.$emit("You can enable bot chat now", "True");
    }
    let valid_to = this.$session.get("UserInformation").valid_to,
      date_seven_days_ago = new Date(),
      current_day = new Date();
    date_seven_days_ago.setDate(date_seven_days_ago.getDate() - 7);
    let is_validity_expiring_soon = this.dateCheckExpiry(
      date_seven_days_ago,
      current_day,
      valid_to
    );
    let start = moment(current_day),
      end = moment(valid_to),
      days_remaining = end.diff(start, "days");
    var subscripton_status = this.$session.get("UserInformation").subscription_status;
    let user_expiry_informed = Boolean(this.$session.get("UserExpiryInformed"));
    if (
      days_remaining in Object.keys(this.expiry_day_date_mapping) &&
      !user_expiry_informed && subscripton_status != "active"
    ) {
      swal({
        type: "warning",
        text: this.tlt('layout_dashboard_trial_period_expire', 'code') + ` ${this.expiry_day_date_mapping[days_remaining]},` + this.tlt('layout_dashboard_upgrade_plan_text', 'code') + this.tlt('layout_dashboard_upgrade_plan_text2', 'code'),
        showCancelButton: true,
        confirmButtonColor:'#3085d6',
        confirmButtonText: this.tlt('layout_dashboard_subscribe_now', 'code'),
        cancelButtonText: this.tlt('layout_dashboard_later_btn', 'code'),
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (result.value == true)
        {
          this.$router.push({name: 'Settings',params:{Subscription:true}});     
        }
        })
      this.$session.set("UserExpiryInformed", true);
    } 
    if (days_remaining < 0 && !user_expiry_informed) {
      swal({
        type: "warning",
        text: this.tlt('layout_dashboard_trial_period_expire1', 'code'),
        showCancelButton: true,
        confirmButtonColor:'#3085d6',
        confirmButtonText: this.tlt('layout_dashboard_subscribe_now', 'code'),
        cancelButtonText: this.tlt('layout_dashboard_later_btn', 'code'),
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (result.value == true)
        {
          this.$router.push({name: 'Settings',params:{Subscription:true}});     
        }
        })
      this.$session.set("UserExpiryInformed", true);
    }
    if (this.$session.has("UserInformation")) {
      this.check_model_status();
      this.models_status_interval = window.setInterval(() => {
        this.check_model_status();
      }, 10 * 60 * 1000);
    } 
  },
  beforeCreate() {
    if(this.$route.params.is_shopify_billing_redirect === true) {
      swal({
        title: "Thank You!!",
        html: `Your Subscription of Cense App with Shopify is now Active.! \n Continue browsing through our portal for making your bot more interactive.!!`,
        showCancelButton: false,
        type: "success",
        allowOutsideClick: false,
        allowEscapeKey: false
      })
    }
    if(this.$route.params.stripe_payment_redirect === true) {
      if(this.$route.params.payment_response_data === 'Success'){
        if (this.$route.params.payment_type === 'subscription'){
          swal({
            title: "Thank You!!",
            html: "Your Subscription of Cense App is now Active.! \n Continue browsing through our portal for making your bot more interactive.!!",
            showCancelButton: false,
            type: "success",
            allowOutsideClick: false,
            allowEscapeKey: false
          })
        }
        else if(this.$route.params.payment_type === 'payment'){
          swal({
            title: "Thank You!!",
            text: "Your Add on is now Active.! \n Continue browsing through our portal for making your bot more interactive.!!",
            showCancelButton: false,
            type: "success",
            allowOutsideClick: false,
            allowEscapeKey: false
          })
        }
      } else if(this.$route.params.payment_response_data === 'Failure') {
        swal({
          title: "Oops!!",
          html: `<div style="text-align:left"> It seems there was some error in processing your payment request! <br> If you think this was a mistake, please reach out to us at <a href="mailto:support@cense.ai?subject=Payment Failure Dispute${Boolean(this.$route.params.payment_response_cense_reference_id) === true ? `:CensePayment#${this.$route.params.payment_response_cense_reference_id}` : null}>support@cense.ai</a>. <br> <br> ${Boolean(this.$route.params.payment_response_cense_reference_id) === true ? `Please note the reference ID<b>CensePayment#${this.$route.params.payment_response_cense_reference_id} </b> for all further communication regarding this payment`: null} </div>`,
          showCancelButton: false,
          type: "error",
          allowOutsideClick: false,
          allowEscapeKey: false
        })
      }
    }
    let subscription = this.$session.get("UserInformation").subscription;
    let subscription_status = this.$session.get("UserInformation").subscription_status;
    if(subscription == 'Free' && subscription_status != 'freetrial'){
      this.is_free_trial = this.$route.params.is_free_trial;
      this.$router.push("/bot/subscription-renewal");
    }
    try {
      axios
        .post(
          api_calls.setup_status(),
          {
            company_name: this.$session.get("UserInformation").company_name,
            company_id: this.$session.get("UserInformation").company_id,
            update: false
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`
            }
          }
        )
        .then((response) => {
          if (response.data.message.MSG_CODE == this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE) {
            if (response.data.data.is_completed == false) {
              this.is_retail = true;
            } else {
              this.is_retail = false;

            }
          } else if(response.data.message.MSG_CODE == this.api_status_code.EMPTY_DATA.MSG_CODE) {
            this.is_retail = false;
          } else {
            this.is_retail = false;
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              type: "error"
            })
          }
          this.setup_api_call_response_received = true;
        })
        .catch(e => {
         console.log(e)
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
            setTimeout(() => {
              this.setup_api_call_response_received = false;
              axios
                .post(
                  api_calls.setup_status(),
                  {
                    company_name: this.$session.get("UserInformation").company_name,
                    company_id: this.$session.get("UserInformation").company_id,
                    update: false
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${this.$session.get("at")}`
                    }
                  }
                )
                .then(response => {
                  
                  this.spinnerOn = false;
                  if (response.data.message.MSG_CODE == this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE) {
                    if (response.data.data.is_completed == false) {
                      this.is_retail = true;
                    } else {
                      this.is_retail = false;
                
                    }
                  } else if(response.data.message.MSG_CODE == this.api_status_code.EMPTY_DATA.MSG_CODE) {
                    this.is_retail = false;
                  } else {
                    this.is_retail = false;
                    Swal({
                      title: response.data.message.MSG_CODE,
                      text: response.data.message.MSG,
                      showCancelButton: false,
                      showConfirmButton: false,
                      type: "error"
                    })
                  }
                  this.setup_api_call_response_received = true;
                }
                ).catch(e=>{
                  console.log(e)
                });
            }, 100);
          }
          this.setup_api_call_response_received = true;
        });
      if (!this.$session.has("UserInformation")) {
        this.$router.push("/bot/login");
      } else if (!this.$session.has("ChatbotMenu")) {
        if (this.$route.name != "Direct Response Bot") {
          this.$router.push("/bot/directresponsebot");
        }
      }
      var menu = this.$session.get("ChatbotMenu");
      for (var i in menu) {
        var matched = false;
        if (menu[i].sub_menu_list.length == 0) {
          if (menu[i].main_menu.name === this.$route.name) {
            matched = true;
          }
        } else if (menu[i].sub_menu_list.length > 0) {
          for (var j in menu[i].sub_menu_list) {
            if (
              menu[i].sub_menu_list[j].name === this.$route.name ||
              this.$route.name === "Workflow" ||
              this.$route.name === "Test Closed Bot" || this.$route.name === "WhatsApp Chat NewPage" || this.$route.name === 'Subscription Renewal'
            ) {
              matched = true;
            }
          }
        }
        if (matched) {
          break;
        } else if (i == menu.length - 1 && matched == false) {
          this.$router.push("/bot/dashboard");
        }
      }
    } catch (error) {
      if (!this.$session.has("UserInformation")) {
        this.$router.push("/bot/login");
      }
    }
  },
  mounted() {
    this.$root.$on("Session_Expired", data => {
      if (data.message.MSG === "You are logged in on another device.") {
        swal
          .fire({
            type: "error",
            title: this.tlt('layout_dashboard_swal_oops2', 'code'),
            text:
              this.tlt('layout_dashboard_logged_again','code'),
            allowOutsideClick: false
          })
          .then(result => {
            if (result.value) {
              setTimeout(() => {
                this.$root.$emit("sign_out");
              }, 500);
            }
          });
      } else if (data.msg === "Permissions Updated") {
        this.$session.set("permissions", data.permissions);
        this.getToken();
      } else if (!this.refresh_token_api_on) {
        this.refresh_token_api_on = true;
        this.getToken();
      }
    });

    this.$root.$on("Clear_Refresh_Token_Interval", data => {
      if (data.clear_interval) {
        clearInterval(this.jwt_token_interval);
        this.jwt_token_interval = null;
      }
    });
    let is_first_login = this.$session.get("UserInformation").show_portal_guide;
    if (Boolean(is_first_login)) {
      // this.$root.$emit("show_tour_guide", true);
    }
    this.$root.$on("want_model_status", data =>{
      if (data == true){
        this.check_model_status();
      }
    })
    this.$root.$on("SideBarMenuUpdated", (data) => {
      if (data === true){
        this.sidebar_key +=1;
      }
    });
    if (this.$session.get("SettingTopnavbarDisable") == true) {
      this.disable_sidebar = true;
    }else{
       this.disable_sidebar = false;
    }
    this.$root.$on("DashboardSidebarDisable", (data) => {
      if(data===true){
        this.disable_sidebar = true;
      }else{
         this.disable_sidebar = false;
      }
    });
  },
  methods: {
    getToken() {
      axios
        .post(
          api_calls.refresh_token_url(),
          {},
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("rt")}`
            }
          }
        )
        .then(response => {
          this.refresh_token_api_on = false;
          this.$session.set("at", response.data.data.access_token);
        })
        .catch(() => {
          this.$session.destroy();
          this.$router.push("/bot/login");
        });
    },
    dateCheckExpiry(from, to, check) {
      var fDate, lDate, cDate;
      fDate = Date.parse(from);
      lDate = Date.parse(to);
      cDate = Date.parse(check);
      if (cDate <= lDate && cDate >= fDate) {
        return true;
      }
      return false;
    },
    check_model_status(){
      axios
          .post(
            api_calls.models_training_status(),
            {
              company_id: this.$session.get("UserInformation").company_id,
              company_name: this.$session.get("UserInformation").company_name,
              is_get: true
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            // this.$session.set("at", response.data.access_token);
            if(response.data.message.MSG_CODE == this.api_status_code.EMPTY_DATA.MSG_CODE){
              this.$session.set("ModelStatus", response.data.data.model_status);
            }
            else if(response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE.MSG_CODE){
              this.$session.set("ModelStatus", response.data.data.model_status);
            }
            else{
              this.$session.set("ModelStatus", {});
            }
            this.$root.$emit("send_model_status",this.send_status);
          })
          .catch((e) => {
            this.$session.set("ModelStatus", {});
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    sidebar_disable(){
      if (this.disable_sidebar === true) {
        return 'pointer-events:none;'    
      }else{
        return ''
      }
    }
  }
};
</script>
<style lang="scss">
.dash-cont1 {
  margin-left: 0px !important;
  padding: 0px !important;
}
</style>
