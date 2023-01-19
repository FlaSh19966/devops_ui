<template>
  <div>
    <div class="modal-body">
        <div class="modal-head d-flex align-items-center">
        <h3>{{tlt('messenger_setting_header')}}</h3>
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
            <h4>{{tlt('connect_fb_account')}}</h4>
            <div class="d-flex">
            <div id="login" class="fb-button" @click="checkLoginState()">
            <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 118 222">
                <path id="f" d="M75.41,220.31V120.5h33.5l5-38.9H75.41V56.78c0-11.26,3.13-18.93,19.27-18.93h20.6V3a275.33,275.33,0,0,0-30-1.53c-29.7,0-50,18.13-50,51.41V81.61H1.66v38.9H35.24v99.8Z" style="fill: #fff"></path>
                </svg>
            </div> 
            <span>{{tlt('connect_facebook')}}</span>
            </div>
            <div style="display:none;" @click="facebookLogout()" id="logout" class="logout-button"><span>{{tlt('logout_btn')}}</span></div>
            </div>
        <div v-show="Boolean(fb_page_data.length)">
            <div class="col-sm-12 p-0">
            <h4 class="mt-2">{{tlt('connect_pages')}}</h4>
            <div v-for="(page, index) in fb_page_data"
                :key="index">
                <div class="messenger-pages d-flex">
                    <div>
                    {{page.name}}
                    </div>
                    <div style="margin-left: auto;">
                    <button class="fb-connect-btn" @click="page_connect_fb(page)">{{tlt('connect_btn')}}</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div v-show="Boolean(fb_saved_page_data.length)">
            <div class="col-sm-12 p-0">
            <h4 class="mt-2">{{tlt('connect_pages')}}</h4>
            <div v-for="(page, index) in fb_saved_page_data"
                :key="index">
                <div class="messenger-pages d-flex">
                    <div>
                    {{page.fb_page_name}}
                    </div>
                    <label class="switch mb-0 mt-0 mr-2" style="margin-left: auto;">
                    <input
                        type="checkbox"
                        v-model="page.fb_page_enabled"
                        @click="edit_fb_page(index)"
                        id="email_required_id"
                    />
                    <span
                        class="slider round"
                        style="border-radius: 50px"
                    ></span>
                    </label>
                    <!-- <div style="margin-left: auto;"> -->
                    <span class="delete-cart-item" @click="delete_fb_page(page)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13.682" height="15.392" viewBox="0 0 13.682 15.392"><path data-v-0f909d54="" d="M8.276,3v.855H4v1.71h.855V16.682a1.71,1.71,0,0,0,1.71,1.71h8.551a1.71,1.71,0,0,0,1.71-1.71V5.565h.855V3.855H13.406V3H8.276M6.565,5.565h8.551V16.682H6.565V5.565m1.71,1.71v7.7h1.71v-7.7H8.276m3.42,0v7.7h1.71v-7.7Z" transform="translate(-4 -3)" fill="#f23d3d"></path></svg>
                    </span>
                    <!-- </div> -->
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
import Swal from "sweetalert2";
import api_calls from "@/portal/api_calls";

export default {
  name: "MessagingFrameworks",
  components: {
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
    // this.checkLoginState();
  },
  methods: {
    update_data() {
      for(var i in this.fb_saved_page_data){
        for(var j in this.fb_page_data){
          if(this.fb_saved_page_data[i].fb_page_id == this.fb_page_data[j].id){
            this.fb_page_data.splice(j, 1);
          }
        }
      }
    },
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
            this.fb_saved_page_data = [];
            if (
              Boolean(data.data.facebook_details.length)
            ) {
              for (var i in data.data.facebook_details) {
                var temp = {};
                temp = {
                  fb_access_token: data.data.facebook_details[i].fb_access_token,
                  fb_page_id:  data.data.facebook_details[i].fb_page_id,
                  fb_page_name:  data.data.facebook_details[i].fb_page_name,
                  fb_verify_token:  data.data.facebook_details[i].fb_verify_token,
                  fb_page_enabled:  data.data.facebook_details[i].enabled,
                }
                this.fb_saved_page_data.push(temp);
              }
              // this.fb_saved_page_data.is_visible_on_bot === true ? this.fb_saved_page_data.is_integrated = true :
              //                                                 this.fb_saved_page_data.is_integrated = false;
            }
            this.update_data();
          }else if(data.message.MSG_CODE === this.api_status_code.EMPTY_DATA.MSG_CODE) {   }
          else {
            swal({
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
    page_connect_fb(page){
      if(page != null) {
        axios.post(api_calls.chatbot_integration_details(),{
          // fb_verify_token : ,
          company_name: this.company_name,
          company_id: this.company_id,
          email: this.$session.get("UserInformation").email,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens,
          fb_page_name: page.name,
          fb_access_token : page.access_token,
          fb_page_id : page.id,
          fb_page_enabled: true,
          is_save: true,
          is_facebook: true, 
          is_messaging_platform: false
        },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          },
        }
        )
        .then((response) => {
           if (response.data.message.MSG_CODE == this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE) {
            Swal.fire({
              title: this.tlt('facebook_connect_msg'),
              type: "success",
              timer: 2500,
            });
            var path = "/" + page.id + "/subscribed_apps?access_token=" + page.access_token;
            // console.log("POST", path);
            FB.api(
              path,
              'POST',
              {"subscribed_fields":"messages"},
              function(response) {
                  console.log("Subscription", response);
              }
            );
            this.get_integration_details();
          } else if (response.data.message.MSG_CODE === this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
            Swal.fire({
              title: this.tlt('facebook_internal_server_msg'),
              type: "error",
              timer: 2500,
            });
          }else {
            swal({
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
    edit_fb_page(index){
      var vm = this;
      this.fb_saved_page_data[index].fb_page_enabled == false ? this.fb_saved_page_data[index].fb_page_enabled = true : this.fb_saved_page_data[index].fb_page_enabled = false; 
      if(index != null) {
        axios.post(api_calls.chatbot_integration_details(),{
          company_name: this.company_name,
          company_id: this.company_id,
          email: this.$session.get("UserInformation").email,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens,
          fb_page_id : this.fb_saved_page_data[index].fb_page_id,
          is_edit: true,
          is_facebook: true,
          fb_page_enabled: this.fb_saved_page_data[index].fb_page_enabled
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
              title: this.tlt('facebook_edited_msg'),
              type: "success",
              timer: 2500,
            });
            if(!Boolean(this.fb_saved_page_data[index].fb_page_enabled)) {
              var path = "/" + vm.fb_saved_page_data[index].fb_page_id + "/subscribed_apps?access_token=" + vm.fb_saved_page_data[index].fb_access_token;
              // console.log("Path", path);
              FB.api(
                path,
                'DELETE',
                {},
                function(response) {
                    console.log("DELETE", response);
                }
              );
            } else {
              var path = "/" + vm.fb_saved_page_data[index].fb_page_id + "/subscribed_apps?access_token=" + vm.fb_saved_page_data[index].fb_access_token;
              // console.log("POST", path);
              FB.api(
                path,
                'POST',
                {"subscribed_fields":"messages"},
                function(response) {
                    console.log("Subscription", response);
                }
              );
            }
            this.get_integration_details();
          } else if (response.data.message.MSG_CODE === this.api_status_code.FACEBOOK_PAGE_ID_DOESNT_EXISTS.MSG_CODE) {
            Swal.fire({
              title: this.tlt('page_id_not_exist'),
              type: "warning",
              timer: 2500,
            });
          } else if (response.data.message.MSG_CODE === this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
            Swal.fire({
              title: this.tlt('facebook_internal_server_msg'),
              type: "error",
              timer: 2500,
            });
          }else {
            swal({
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
    delete_fb_page(page){
      if(page != null) {
        axios.post(api_calls.chatbot_integration_details(),{
          company_name: this.company_name,
          company_id: this.company_id,
          email: this.$session.get("UserInformation").email,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens,
          fb_page_id : page.fb_page_id,
          is_delete: true,
          is_facebook: true, 
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
              title: this.tlt('facebook_edited_msg'),
              type: "success",
              timer: 2500,
            });
            var path = "/" + page.fb_page_id + "/subscribed_apps?access_token=" + page.fb_access_token;
            // console.log("Path", path);
            FB.api(
              path,
              'DELETE',
              {},
              function(response) {
                  console.log("DELETE", response);
              }
            );
            this.get_integration_details();
          } else if (response.data.message.MSG_CODE === this.api_status_code.FACEBOOK_PAGE_ID_DOESNT_EXISTS.MSG_CODE) {
            Swal.fire({
              title: this.tlt('page_id_not_exist'),
              type: "warning",
              timer: 2500,
            });
          } else if (response.data.message.MSG_CODE === this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
            Swal.fire({
              title: this.tlt('facebook_internal_server_msg'),
              type: "error",
              timer: 2500,
            });
          }else {
            swal({
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
    checkLoginState() {
      var vm = this;
      FB.getLoginStatus(function(response) {
        vm.statusChangeCallback(response);
      });
    },
    statusChangeCallback(response) {
      console.log("Messenger login1", response);
      if(response.status === "connected")
      {
        this.fb_access_token = response.authResponse.accessToken;
        this.fb_user_id = response.authResponse.userID;
        $("#login").hide();
        $("#logout").show(); 
        this.fetchUserProfile();
      }
      else{
          this.facebookLoginByDialog();
      }
    },
    facebookLogout() {
      var vm = this;
      $("#logout").hide();
      $("#login").show();
      $("#status").empty();
      FB.logout(function(response) {
        // vm.statusChangeCallback(response);
      });
      this.fb_page_data = [];
      this.fb_access_token = "";
      this.fb_user_id = "";
      this.get_integration_details();
    },
    facebookLoginByDialog() {
      var vm = this;
      FB.login(function(response) {        
          vm.statusChangeCallback(response);
      }, {scope: 'public_profile,pages_manage_metadata,pages_show_list,pages_messaging,pages_read_engagement'});
    },
    fetchUserProfile() {
      var vm = this;
      var user_id = this.fb_user_id;
      var access_token = this.fb_access_token;
      var app_id = process.env.VUE_APP_FB_APP_ID;
      var app_secret = process.env.VUE_APP_FB_APP_SECRET;
      // var client_token = process.env.VUE_APP_FB_CLIENT_TOKEN;

      // FB.api('/me', function(response) {
      //   console.log(JSON.stringify(response));
      // });
      
      // FB.api('/me?fields=id,name,email,gender,birthday', function(response) {
      //   console.log('Successful login for: ' + response.name);
      // });

      var path1 = '/oauth/access_token?grant_type=fb_exchange_token&client_id=' + app_id + '&client_secret=' + app_secret + '&fb_exchange_token=' + access_token;
      FB.api(path1, function(response) {
        // console.log("Path 1", JSON.stringify(response));
        vm.user_access_token = response.access_token;
      })

      setTimeout(() => {
        var path2 = '/'+user_id+'?fields=id,name,email,picture&access_token='+this.user_access_token;
        FB.api(path2, function(data) {
          // console.log("Path 2", JSON.stringify(data))
        });

        var path3 = '/'+user_id+'/accounts?fields=name,access_token&access_token='+this.user_access_token;
        FB.api(path3, function(data) {
          // console.log("Path 3", JSON.stringify(data.data))
          vm.fb_page_data = data.data;
          vm.update_data();
        }); 
      }, 2000);
      
    },
    // testAPI() {
    //   console.log('Welcome!  Fetching your information.... ');
    //   FB.api('/me', function(response) {
    //     console.log('Successful login for: ' + response.name);
    //     console.log(response);
    //   });
    // }
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