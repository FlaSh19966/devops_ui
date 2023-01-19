<template>
  <div class="">
    <div class="spinner" id="spinner" v-show="big_spinner"></div>
    <!-- <div class="container-fluid"> -->
      <!-- <div class="card dash-card"> -->
    <div
      class="card-header d-block d-sm-flex flex-wrap justify-content-between"
    >
      <div class="col-sm-12">
        <h4 class="mb-sm-0">{{tlt('messenger_framework_header')}}</h4>
      </div>
    </div>
    <!-- <div class="card-body container"> -->
    <div class="col-sm-12">
      <div class="row m-0 p-0">
        <div class="col-sm-3 p-3" >
          <div class="card border-1" id="facebook_messenger_img">
            <a
              href="javascript:void(0)"
              class="mx-auto"
              data-toggle="modal"
              data-target="#messaging_framework_card_modal"
              @click="website_name = 'Messenger'"
            >
              <img
                :src="require('@/portal/assets/img/messenger-logo.png')"
                class="third-party-logo"
                style="height: 100px !important"
              />
            </a>
          </div>
        </div>
        <i id ="check_btn_facebook_messenger"></i>
        <div class="col-sm-3 p-3" >
          <div class="card border-1" id="whatsapp_img">
            <a
              href="javascript:void(0)"
              class="mx-auto"
              data-toggle="modal"
              data-target="#messaging_framework_card_modal"
              @click="website_name = 'Whatsapp'"
            >
              <img
                :src="require('@/portal/assets/img/WhatsApp-Logo-PNG6.png')"
                class="third-party-logo"
                style="height: 100px !important"
              />
            </a>
          </div>
        </div>
        <i id ="check_btn_whatsapp"></i>
      </div>
    </div>
    <div
      class="modal fade dash-modal"
      id="messaging_framework_card_modal"
      role="dialog"
      aria-labelledby="widget_code_modaltitle"
      data-keyboard="false"
      aria-hidden="true"
      data-backdrop="static"
    >
      <div v-if="website_name == 'Whatsapp'" class="modal-dialog modal-dialog-centered" role="document" style="max-width: 800px;">
        <div class="modal-content">
          <template v-if="website_name == 'Whatsapp'">
            <whats-app></whats-app>
          </template>
        </div>
      </div>
      <div v-if="website_name == 'Messenger'" class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <template v-if="website_name == 'Messenger'">
            <facebook-messenger></facebook-messenger>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import api_calls from "@/portal/api_calls";
import FacebookMessenger from "./Components/FacebookMessengerDetails.vue";
import WhatsApp from "./Components/WhatsappDetails.vue";

export default {
  name: "MessagingFrameworks",
  components: {
    FacebookMessenger,
    WhatsApp
  },
  data() {
    return {
      big_spinner: false,
      website_name: "",
      widget_code: "",
      company_name: this.$session.get("UserInformation").company_name,
      company_id: this.$session.get("UserInformation").company_id,
      fb_access_token: "",
      fb_user_id: "",
      user_access_token: null,
      fb_page_data: [],
      fb_saved_page_data: []
      // fb_messaging_url_regex: /[(m.me)\/?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i,
    };
  },
  watch: {
    fb_page_enabled(newVal) {
      // console.log(newVal);
      // console.log(this[webs + "_data"].is_visible_on_bot);
    },
  },
  mounted() {    
    this.get_integration_details();
    this.$root.$on("messenger_framework_integrated",(data, framework) => {
      if (data == true && framework == "whatsapp_request_form"){
        document.getElementById("whatsapp_img").style.border = "1px solid #273679";
        document.getElementById("whatsapp_img").style.borderRadius = "0.4rem";
        document.getElementById("check_btn_whatsapp").innerHTML = `<i class="fa fa-check-circle" aria-hidden="true" style="color:#273679;margin-left: -1.0rem;margin-top:4px"></i>`;
      }else if (data == true && framework == "facebook_details"){
        document.getElementById("facebook_messenger_img").style.border = "1px solid #273679";
        document.getElementById("facebook_messenger_img").style.borderRadius = "0.4rem";
        document.getElementById("check_btn_facebook_messenger").innerHTML = `<i class="fa fa-check-circle" aria-hidden="true" style="color:#273679;margin-left: -1.0rem;margin-top:4px"></i>`;
      }
    })
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
          if (data.message.MSG_CODE != this.api_status_code.STATUS_SUCCESS.MSG_CODE) {
            if ("facebook_details" in data.data && data.data.facebook_details.length != 0) {
              var is_integrated = true;
              this.$root.$emit('messenger_framework_integrated',is_integrated, "facebook_details");
            }
            if ("whatsapp_request_form" in data.data && data.data.whatsapp_details.length != 0){
              var is_integrated = true;
              this.$root.$emit('messenger_framework_integrated',is_integrated, "whatsapp_request_form");
            }
          }
          else if (this.api_status_code.EMPTY_DATA.MSG_CODE == data.message.MSG_CODE) {

          }
          else {
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
  transition: all .3s;
}
.fb-connect-btn:active {
  opacity: .5!important;
}
.fb-connect-btn:hover {
  opacity: .8!important;
}
.fb-button {
  width: 45%;
  display: flex;
  background: #3b5998;
  color: #fff;
  padding: 10px 20px;
  border-radius: 10px;
  -webkit-transition: opacity .3s;
  transition: opacity .3s;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-backface-visibility: hidden;
  cursor: pointer;
  -webkit-transition: all .3s;
  transition: all .3s;
}
.fb-button:active {
  opacity: .5!important;
}
.fb-button:hover {
  opacity: .8!important;
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
  -webkit-transition: all .3s;
  transition: all .3s;
}
.logout-button:active {
  opacity: .5!important;
}
.logout-button:hover {
  opacity: .8!important;
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
.col-sm-3{
  max-width: 24%;
}
.row {
    display: flex;
    flex-wrap: wrap;
    margin-right: -2px;
    margin-left: 15px;
}
</style>