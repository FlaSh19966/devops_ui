<template>
  <div>
    <div class="modal-body">
      <div class="modal-head d-flex align-items-center">
        <h3>{{ tlt("whatsapp_setting") }}</h3>
      </div>
      <button
        type="button"
        class="close"
        data-dismiss="modal"
        aria-label="Close"
      >
        <img src="/img/close-icn.png" alt />
      </button>
      <div>
        <div>
          <!-- <h4>{{tlt('connect_facebook_msg')}}</h4> -->
          <h4 v-if="this.whatsapp_details_status != 'success'">Create a WhatsApp Business profile</h4>
          <div v-if="this.whatsapp_details_status != ''" class="alert alert-warning" role="alert">
            {{this.whatsapp_details_status}} : {{this.whatsapp_details_status_message}}
          </div>
          <form>
            <div class="form-group mb-2">
              <label><b>WhatsApp Business profile display name</b></label>
              <p>
                (This is the name of your business that is shown to customers in
                the WhatsApp app.
                <a
                  target="_blank"
                  href="https://developers.facebook.com/docs/whatsapp/display-name"
                  >Learn more</a
                >)
              </p>
              <input
                class="form-control"
                type="text"
                placeholder="Ex. Business Name"
                v-model="whatsapp_display_name"
                :disabled="
                  whatsapp_details_status == 'In-progress' ? true : false
                "
                required
              />
            </div>

            <div class="form-group mb-2">
              <label><b>Category</b></label>
              <multiselect
                v-model="whatsapp_business_category"
                :options="category_list"
                :searchable="false"
                :close-on-select="true"
                :show-labels="false"
                :disabled="
                  whatsapp_details_status == 'In-progress' || whatsapp_details_status == 'display_name_error' ? true : false
                "
                placeholder="Business type"
              ></multiselect>
            </div>

            <div class="form-group mb-2">
              <label><b>Business descripton</b></label>
              <textarea
                class="form-control"
                v-model="whatsapp_business_description"
                :disabled="
                  whatsapp_details_status == 'In-progress' || whatsapp_details_status == 'display_name_error' ? true : false
                "
                rows="3"
                maxlength="512"
                style="
                  padding-right: 61px;
                  margin-top: 0px;
                  margin-bottom: 0px;
                  height: 87px;
                "
                placeholder="Tell us about your business"
              ></textarea>
            </div>
            <div class="form-group mb-2">
              <label><b>Add a phone number for WhatsApp </b></label>
              <p>
                (This is the number people will see when they chat with you. Use
                a number that's not been registered on WhatsApp.
                <a
                  target="_blank"
                  href="https://www.facebook.com/business/help/353293243562513"
                  >Learn more</a
                >)
              </p>
              <vue-phone-number-input
                v-model="whatsapp_business_number"
                default-country-code="IN"
                :disabled="
                  whatsapp_details_status == 'In-progress' || whatsapp_details_status == 'display_name_error' ? true : false
                "
                @update="whatsapp_business_phoneNumber_check = $event"
              >
              </vue-phone-number-input>
            </div>
            <div class="form-group mb-2">
              <label><b>Add your contact number</b></label>
              <p>
                (This number will be used by our support team to get in touch
                with you related to whatsapp integration.)
              </p>
              <vue-phone-number-input
                v-model="business_contact_number"
                default-country-code="IN"
                :disabled="
                  whatsapp_details_status == 'In-progress' || whatsapp_details_status == 'display_name_error' ? true : false
                "
                @update="business_contact_phoneNumber_check = $event"
              >
              </vue-phone-number-input>
            </div>
            <div
              v-if="whatsapp_details_status != 'In-progress'"
              class="btn-wrap mt-0 border-top-0"
              style="text-align: end"
            >
              <button type="submit" class="darkblue-btn ml-0"  @click.prevent="submit_details" id="whatsapp_save_btn">
                {{ tlt("save_btn") }}
              </button>
            </div>
          </form>
          <!-- <div id="login" class="fb-button" @click="checkLoginState()">
            <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 118 222">
                <path id="f" d="M75.41,220.31V120.5h33.5l5-38.9H75.41V56.78c0-11.26,3.13-18.93,19.27-18.93h20.6V3a275.33,275.33,0,0,0-30-1.53c-29.7,0-50,18.13-50,51.41V81.61H1.66v38.9H35.24v99.8Z" style="fill: #fff"></path>
                </svg>
            </div> 
            <span>{{tlt('connect_whatsapp')}}</span>
            </div> 
            <div style="display:none;" @click="facebookLogout()" id="logout" class="logout-button"><span>{{tlt('logout_btn')}}</span></div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import api_calls from "@/portal/api_calls";
import Multiselect from "vue-multiselect";
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
import {close_modal } from "@/portal/mixins";


export default {
  name: "MessagingFrameworks",
  components: {
    Multiselect,
    VuePhoneNumberInput,
  },
    mixins: [close_modal],
  data() {
    return {
      big_spinner: false,
      company_name: this.$session.get("UserInformation").company_name,
      company_id: this.$session.get("UserInformation").company_id,
      fb_access_token: "",
      fb_user_id: "",
      user_access_token: null,
      whatsapp_business_ids_data: [],
      whatsapp_business_ids: [],
      waba_id: null,
      whatsapp_display_name: "",
      whatsapp_business_category: "",
      category_list: [
        "Automotive",
        "Beauty and Salon",
        "Clothing and Apparel",
        "Education",
        "Entertainment",
        "Event Planning and Service",
        "Finance and Banking",
        "Food and Grocery",
        "Public Service",
        "Hotel and Lodging",
        "Medical and Health",
        "Non-profit",
        "Professional Services",
        "Shopping and Retail",
        "Travel and Transportation",
        "Restaurant",
        "Other",
      ],
      whatsapp_business_description: "",
      whatsapp_business_number: null,
      whatsapp_business_phoneNumber_check: null,
      business_contact_number: null,
      business_contact_phoneNumber_check: null,
      whatsapp_business_details: [],
      whatsapp_details_status: "",
      whatsapp_details_status_message: "",
    };
  },
  mounted() {
    this.get_integration_details();
  },
  methods: {
    get_integration_details() {
      this.big_spinner = true;
      axios
        .post(
          api_calls.chatbot_integration_details(),
          {
            is_get: true,
            company_name: this.company_name,
            company_id: this.company_id,
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
        .then(({ data }) => {
          this.big_spinner = false;
          if (data.message.MSG_CODE === this.api_status_code.DATA_AVAILABLE.MSG_CODE) {
            if ('whatsapp_request_form' in data.data) {
              // for (var i in data.data.whatsapp_details) {
                this.whatsapp_details_status =
                  data.data.whatsapp_request_form["status"];
                this.whatsapp_details_status_message =
                  data.data.whatsapp_request_form["status_message"];
                (this.whatsapp_display_name =
                  data.data.whatsapp_request_form[
                    "whatsapp_display_name"
                  ]),
                  (this.whatsapp_business_category =
                    data.data.whatsapp_request_form[
                      "whatsapp_business_category"
                    ]),
                  (this.whatsapp_business_description =
                    data.data.whatsapp_request_form[
                      "whatsapp_business_description"
                    ]),
                  (this.whatsapp_business_number =
                    data.data.whatsapp_request_form[
                      "whatsapp_business_number"
                    ]),
                  (this.business_contact_number =
                    data.data.whatsapp_request_form[
                      "business_contact_number"
                    ]);
              // }
              // this.fb_saved_page_data.is_visible_on_bot === true ? this.fb_saved_page_data.is_integrated = true :
              //                                                 this.fb_saved_page_data.is_integrated = false;
            }
          }else if(response.data.message.MSG_CODE === this.api_status_code.EMPTY_DATA.MSG_CODE){

          }else {
            Swal({
              title:data.message.MSG_CODE,
              text:data.message.MSG,
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
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    checkLoginState() {
      var vm = this;
      FB.getLoginStatus(function (response) {
        vm.statusChangeCallback(response);
      });
    },
    statusChangeCallback(response) {
      if (response.status === "connected") {
        this.fb_access_token = response.authResponse.accessToken;
        this.fb_user_id = response.authResponse.userID;
        $("#login").hide();
        $("#logout").show();
        this.fetchUserProfile();
      } else {
        this.facebookLoginByDialog();
      }
    },
    facebookLogout() {
      var vm = this;
      $("#logout").hide();
      $("#login").show();
      $("#status").empty();
      FB.logout(function (response) {
        // vm.statusChangeCallback(response);
      });
      this.fb_page_data = [];
      this.fb_access_token = "";
      this.fb_user_id = "";
      this.get_integration_details();
      this.whatsapp_business_ids = [];
      this.whatsapp_business_ids_data = [];
    },
    facebookLoginByDialog() {
      var vm = this;
      FB.login(
        function (response) {
          vm.statusChangeCallback(response);
        },
        {
          scope:
            "public_profile,whatsapp_business_management,business_management,whatsapp_business_messaging",
          // extras: {
          //   feature: 'whatsapp_embedded_signup',
          // }
        }
      );
    },
    submit_details() {
      if (this.whatsapp_display_name == "") {
        Swal({
          text: "Display name cannot be blank",
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2000,
        });
        return;
      } else if (this.whatsapp_business_category == "") {
        Swal({
          text: "Select your business category",
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2000,
        });
        return;
      } else if (this.whatsapp_business_description == "") {
        Swal({
          text: "Tell us about your business description",
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2000,
        });
        return;
      }
      if (
        this.whatsapp_business_phoneNumber_check.isValid == true &&
        this.business_contact_phoneNumber_check.isValid == true
      ) {
        this.whatsapp_business_details = {
          whatsapp_display_name: this.whatsapp_display_name,
          whatsapp_business_category: this.whatsapp_business_category,
          whatsapp_business_description: this.whatsapp_business_description,
          whatsapp_business_number:
            this.whatsapp_business_phoneNumber_check.formattedNumber,
          business_contact_number:
            this.business_contact_phoneNumber_check.formattedNumber,
          status_message:
            "We have notified our team, we will get in touch with you shortly.",
          status: "In-progress",
        };
        // 'integration_success'
        // 'display_name_error'
        axios
          .post(
            api_calls.chatbot_integration_details(),
            {
              company_name: this.$session.get("UserInformation").company_name,
              company_id: this.$session.get("UserInformation").company_id,
              wa_is_third_party: false,
              whatsapp_business_details: this.whatsapp_business_details,
              is_messaging_platform: false,
              is_whatsapp_request: true,
              is_save: true,
              email: this.$session.get("UserInformation").email,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            if (response.data.message.MSG_CODE === this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE) {
              Swal.fire({
                title: "Whatsapp Integration Successfully",
                type: "success",
                timer: 2500,
              });
              this.get_integration_details();
            } else if (response.data.message.MSG_CODE === this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
              Swal.fire({
                title: "Internal Server Error",
                type: "error",
                timer: 2500,
              });
            } else if (response.data.message.MSG_CODE === this.api_status_code.UNSUCCESSFUL_DB_OPERATION.MSG_CODE) {
              Swal.fire({
                type: "error",
                timer: 2500,
                text: response.data.message.MSG,
              });
            }else {
              Swal.fire({
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
            this.spinnerOn = false;
            if (
              e.response.status === 410 ||
              e.response.status === 440 ||
              e.response.status === 409
            ) {
              this.$root.$emit("Session_Expired", e.response.data);
            }
          });
          this.close_modal('whatsapp_save_btn')
      }
    },
    fetchUserProfile() {
      var vm = this;
      var access_token = this.fb_access_token;
      var fb_wp_system_access_token =
        process.env.VUE_APP_FB_WP_SYSTEM_ACCESS_TOKEN;
      var temp_waba = null;
      var system_user_id = null;

      var path1 =
        "/debug_token?input_token=" +
        access_token +
        "&access_token=" +
        fb_wp_system_access_token;
      FB.api(path1, function (data) {
        temp_waba = data.data;
        for (var i in temp_waba.granular_scopes) {
          if (
            temp_waba.granular_scopes[i].scope == "whatsapp_business_management"
          ) {
            vm.whatsapp_business_ids = temp_waba.granular_scopes[i].target_ids;
          }
        }
      });

      setTimeout(() => {
        // var path3 = '/427396211603679/system_users?access_token=' + fb_wp_system_access_token;
        // FB.api(path3, function(data) {
        //   console.log("Path 3", data.data);
        //   system_user_id = data.data[0].id;
        //   console.log("system_user_id", data.data);

        //   for(var i in vm.whatsapp_business_ids) {
        //     console.log("reache here");
        //     var path4 = '/'+ vm.whatsapp_business_ids[i] + '/assigned_users?user=' + system_user_id + '&tasks=[MANAGE]&access_token=' + fb_wp_system_access_token;
        //     FB.api(path4, function(data) {
        //       console.log("Path 4", data);
        //     })
        //   }
        // })
        for (var i in vm.whatsapp_business_ids) {
          var waba_id = vm.whatsapp_business_ids[i];
          var path2 =
            "/" + waba_id + "/phone_numbers?access_token=" + access_token;
          FB.api(path2, function (data) {
            vm.whatsapp_business_ids_data.push({
              [waba_id]: data.data[0],
            });
            vm.submit_details();
          });
        }
      }, 2000);
    },
  },
};
</script>
<style scoped>
.delete-cart-item {
  cursor: pointer;
}
.delete-cart-item svg :hover {
  color: #f23d3d !important;
  fill: #f23d3d !important;
}
.fb-connect-btn {
  background: #006cff;
  border: 1px solid #006cff;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s;
}
.fb-connect-btn:active {
  opacity: 0.5 !important;
}
.fb-connect-btn:hover {
  opacity: 0.8 !important;
}
.fb-button {
  width: 45%;
  display: flex;
  background: #25d366;
  color: #fff;
  padding: 10px 20px;
  border-radius: 10px;
  -webkit-transition: opacity 0.3s;
  transition: opacity 0.3s;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-backface-visibility: hidden;
  cursor: pointer;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
.fb-button:active {
  opacity: 0.5 !important;
}
.fb-button:hover {
  opacity: 0.8 !important;
}
.fb-button .icon {
  margin-right: 10px;
  width: 15px;
  height: 25px;
}
.fb-button .icon svg {
  max-width: 100%;
  max-height: 100%;
  -o-object-fit: contain;
  object-fit: contain;
}
.logout-button {
  margin-left: auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 10px 20px;
  border-radius: 20px;
  background: #f0f4f7;
  color: #9ba6b3;
  width: 96px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-backface-visibility: hidden;
  cursor: pointer;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
.logout-button:active {
  opacity: 0.5 !important;
}
.logout-button:hover {
  opacity: 0.8 !important;
}
.messenger-pages {
  width: 100%;
  background: #f7f7f8;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  /* -webkit-box-align: center; */
  -ms-flex-align: center;
  align-items: center;
  padding: 10px 15px;
  border-radius: 4px;
  margin-bottom: 10px;
}
.third-party-logo {
  width: 150px;
  height: 75px;
  object-fit: contain;
}
.msg__span {
  padding-left: 1rem;
}
.card-act .red-btn {
  font-size: 14px;
  color: #fff;
  background: #f23d3d;
  border: solid 1px #f23d3d;
  padding: 5px 20px;
  font-weight: 400;
  line-height: 20px;
  display: inline-block;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}
.switch {
  margin-left: 1rem;
}
.col-sm-3 {
  max-width: 24%;
}
.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -2px;
  margin-left: 15px;
}
</style>