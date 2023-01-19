<template>
  <div>
    <top-navbar
      v-if="$route.name != 'Workflow' && $route.name != 'OpenBot'"
    ></top-navbar>
    <!-- <div class="dash-cont"> -->
    <div class="container" style="margin-top: 5rem">
      <div
      class="spinner"
      id="spinner"
      v-show="spinnerOn != undefined && spinnerOn == true"
    ></div>
      <div class="row"> 
        <div class="col-sm-8 ml-auto mr-auto">
          <div class="d-flex">
            <div>
            <h3>Hello Cense Admin,</h3>
            <p>Please select the account into which you want to login:</p>   
            </div>
            <div class="search-container ml-auto">
              <!-- <form action="" class="form-search"> -->
                <input type="text" name="search" class="input-field"
                    id="search_bar" 
                  v-model.trim="searchQuery" 
                  placeholder="Search here">
                <a
                  type="button"
                  v-if="isVisibleSearchClear"
                  class="btn bg-transparent mt-auto mb-auto py-0 btn-submit"
                  @click="clear_search_name"
                  >
                  <img src="/img/close-icn.png" alt />
                </a>
              <!-- </form> -->
            </div>
          </div>
          <table class="table" style="border: 1px solid #e6e6e6">
            <!-- <thead>
              <tr>
                <th>#</th>
                <th>Company Name</th>
                <th>Email</th>
                <th>Login</th>
              </tr>
            </thead> -->
            <tbody>
              <tr>
                <th>#</th>
                <th>Company Name</th>
                <th>Email</th>
                <th>Login</th>
              </tr>
              <tr
                v-for="(account, index) in resultQuery"
                :key="index"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ account.CompanyName }}</td>
                <td>{{ account.Email }}</td>
                <td>
                  <!-- <button class="btn btn-primary"> Login </button> -->
                  <!-- <input type="radio" name="abcd" id="1234fd" style="cursor:pointer;" /> -->
                  <a href="javascript: void(0)" @click="login_account(index)"
                    >Go</a
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import TopNavbar from "../Layout/TopNavbar.vue";
import Swal from "sweetalert2";
import axios from "axios";
import api_calls from "@/portal/api_calls.js";
import moment from "moment";
import { bus } from "@/portal/main";
import sidebaritems from "../Layout/SideBarItem";
import Cookies from "js-cookie";

export default {
  name: "SuperAdminIntermediateScreen",
  data() {
    return {
      searchQuery: null,
      super_admin_login_data: [],
      is_super_admin: true,
      super_admin_chosen_account_data: null,
      spinnerOn: false,
      retail_web_framework: null,
      isVisibleSearchClear: false
    };
  },
  computed: {
    resultQuery(){
      if(this.searchQuery){
      return this.super_admin_login_data.filter((item)=>{
        return this.searchQuery.toLowerCase().split(' ').every(v => item.CompanyName.toLowerCase().includes(v) ||
        item.Email.toLowerCase().includes(v))
      })
      }else{
        return this.super_admin_login_data;
      }
    },

  },

  watch:{
  searchQuery() {
      if (this.searchQuery === '' || this.searchQuery === null) {
        this.isVisibleSearchClear = false;
      } else if (this.searchQuery != null || this.searchQuery !='') {
        this.isVisibleSearchClear = true;
      }
    },
  },
  components: {
    TopNavbar,
  },
  mounted() {
    // console.log(this.$route.params);
    if (Boolean(this.$route.params)) {
      this.super_admin_login_data = this.$route.params.data;
    } else {
      this.$router.push({
        name: "Login",
      });
    }
  },
  methods: {
    login_account(index) { 
      Swal({
        type: "question",
        text: `Are you sure you want to login into the account of ${this.resultQuery[index].Email} which belongs to ${this.resultQuery[index].CompanyName}`,
      }).then((result) => {
        // console.log(result.value);
        if (result.value) {
          this.spinnerOn = true;
          // console.log(`Login into ${this.super_admin_login_data[index].Email}`);
          axios
            .post(
              api_calls.super_admin_login(),
              {
                email: this.resultQuery[index].Email,
                date: moment().toISOString(),
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              if (response.data.message.MSG_CODE === this.api_status_code.LOGIN_SUCCESSFUL.MSG_CODE){
                this.super_admin_chosen_account_data = response.data.data;
                this.retail_web_framework = response.data.data.retail_web_framework;
                // this.$root.$emit("super_admin_login", data);
                this.signout_api();
              }else if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
                Swal({
                  type: "error",
                  text: this.tlt('add_role_internal_server_msg'),
                  timer:3000,     
                });
              }
              else {
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
              console.log(e);
            });
        }
      });
    },
    clear_search_name() {
      this.searchQuery = null;
    },

    signout_api() {
      bus.$emit("Logout has been clicked", "True");
      this.spinnerOn = true;
      axios
        .post(
          api_calls.clear_access_token_url(),
          {
            company_name: this.$session.get("UserInformation").company_name,
            company_id: this.$session.get("UserInformation").company_id,
            license_key: this.$session.get("UserInformation").license_key,
            email: this.$session.get("UserInformation").email,
            token: this.$session.get("UserInformation").tokens,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then(() => {
          this.execute_signout();
        })
        .catch(() => {
          this.execute_signout();
        });
    },
    execute_signout() {
      axios
        .post(
          api_calls.signout_url(),
          {
            company_name: this.$session.get("UserInformation").company_name,
            company_id: this.$session.get("UserInformation").company_id,
            license_key: this.$session.get("UserInformation").license_key,
            email: this.$session.get("UserInformation").email,
            token: this.$session.get("UserInformation").tokens,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("rt")}`,
            },
          }
        )
        .then((response) => {
          if (
            response.data.message.MSG_CODE == this.api_status_code.USER_LOGGED_OUT_1032.MSG_CODE ||
            response.data.message.MSG_CODE == this.api_status_code.TOKEN_INVALID_0001.MSG_CODE ||
            response.data.message.MSG_CODE == this.api_status_code.INVALID_CREDENTIALS_0005.MSG_CODE
          ) {
            this.$session.destroy();
            this.$session.set("retail_web_framework", this.retail_web_framework);
            this.spinnerOn = false;
            this.$root.$emit("Clear_Refresh_Token_Interval", {
              clear_interval: true,
            });
            bus.$emit("Logged out", "True");
            bus.$emit("Disable the bot chat now", "True", "Loggedout");
            this.redir(this.super_admin_chosen_account_data);
          } else {
            this.spinnerOn = false;
            this.redir(this.super_admin_chosen_account_data);
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              type: "success"
            })
          }
        })
        .catch(() => {
          this.$session.destroy();
          this.spinnerOn = false;
          bus.$emit("Logged out", "True");
          bus.$emit("Disable the bot chat now", "True", "Loggedout");
          this.redir(this.super_admin_chosen_account_data);
        });
    },
    redir(message) {
      // console.log("redir");
      if (message == "Email hasn't been verified.") {
        swal({
          html:
            "<h6>Your account has not been validated for login.<br>Please visit your e-mail</h6>",
          timer: 3000,
          type: "error",
        });
        document.getElementById("body").style.opacity = "1";
        $('button[type="submit"]').prop("disabled", false);
      } else if (message == "Internal Server Error") {
        swal({
          type: "error",
          html:
            "<h6>There was an internal server error. Please try again.</h6>",
          timer: 2500,
        });
        document.getElementById("body").style.opacity = "1";
        $('button[type="submit"]').prop("disabled", false);
      } else if (message == "User has not been approved yet.") {
        swal({
          type: "warning",
          html:
            "<h6>Your registration has not been approved or it has been declined by Admin. Kindly check your mail</h6>",
          timer: 3000,
        });
        document.getElementById("body").style.opacity = "1";
        $('button[type="submit"]').prop("disabled", false);
      } else if (message == "You are already logged in!") {
        swal({
          type: "error",
          html: "<h6>This user is already logged in</h6>",
          timer: 2000,
        });
        document.getElementById("body").style.opacity = "1";
        $('button[type="submit"]').prop("disabled", false);
      } else if (message == "Invalid Credentials") {
        swal({
          type: "error",
          html: "<h6>Invalid Credentials!</h6>",
          showConfirmButton: false,
          timer: 2000,
        });
        document.getElementById("body").style.opacity = "1";
        $('button[type="submit"]').prop("disabled", false);
      } else if (message == "API LIMIT EXCEEDED") {
        swal({
          type: "error",
          html:
            "<h6>Your monthly api requests has exceeded. Please Upgrade your plans to login</h6>",
          timer: 3000,
        });
        document.getElementById("body").style.opacity = "1";
        $('button[type="submit"]').prop("disabled", false);
      } else if (message.MSG == "Password should be Renewed") {
        swal({
          type: "error",
          html:
            "<h6>Your password has been expired. Please Renew your password</h6>",
          timer: 2500,
        });
        document.getElementById("body").style.opacity = "1";
        $('button[type="submit"]').prop("disabled", false);
      } else if(Boolean(message.is_super_admin_login)){
        this.$router.push({
          name: "SuperAdminIntermediateScreen",
          params: {
            data: message.all_users_list
          }
        });
        this.$session.start();
        this.$session.set("UserInformation", message.userinformation);
        this.$session.set("at", message.userinformation.access_token);
        this.$session.set("rt", message.userinformation.refresh_token);
        this.$session.set('whatsapp_subscription',message.userinformation.whatsapp_subscription)
      } else if (this.login_type == "Bot") {
        Cookies.remove("login_type");
        Cookies.set("login_type", this.login_type, { expires: 365 });
        this.$session.start();
        this.$session.set("UserInformation", message.userinformation);
        this.$session.set("at", message.userinformation.access_token);
        this.$session.set("rt", message.userinformation.refresh_token);
        this.$session.set('whatsapp_subscription',message.userinformation.whatsapp_subscription)
        this.check_template_subscription('push_direct_response_bot');
        // this.$router.push("/bot/directresponsebot");
      } else if (message.MSG == "User Is Locked") {
        swal({
          type: "error",
          html: "<h6>This user has been locked</h6>",
          timer: 2000,
        });
        document.getElementById("body").style.opacity = "1";
        $('button[type="submit"]').prop("disabled", false);
      } else {
        Cookies.remove("login_type");
        Cookies.set("login_type", this.login_type, { expires: 365 });
        this.$session.start();
        this.$session.set("UserInformation", message.userinformation);
        this.$session.set('whatsapp_subscription',message.userinformation.whatsapp_subscription)
        if(this.is_super_admin){
          axios
            .post(api_calls.super_admin_bot_login(), {
              license_key: this.$session.get("UserInformation").license_key,
              username: this.$session.get("UserInformation").email,
            })
            .then((response) => {
              if (this.api_status_code.STATUS_SUCCESS_CORE.MSG_CODE === response.data.message.MSG_CODE){
                this.$session.set("BotToken", response.data.data);
                this.$session.remove("TemporaryBotToken");
                bus.$emit("Token changed", "True");
              }
            });
        } else {
            axios
            .post(api_calls.bot_response_token(), {
              license_key: this.$session.get("UserInformation").license_key,
              username: this.$session.get("UserInformation").email,
            })
            .then((response) => {
              if (this.api_status_code.STATUS_SUCCESS_CORE.MSG_CODE === response.data.message.MSG_CODE){
                this.$session.set("BotToken", response.data.data);
                this.$session.remove("TemporaryBotToken");
                bus.$emit("Token changed", "True");
              }
            });
        }
        this.$session.set("UserFirstName", message.userinformation.first_name);
        this.$session.set("UserLastName", message.userinformation.last_name);
        this.$session.set("rt", message.userinformation.refresh_token);
        this.$session.set("at", message.userinformation.access_token);
        this.$session.set("RestrictionList", message.restriction_list);
        document.cookie =
          "company_id=" + this.$session.get("UserInformation").company_id;
        document.getElementById("spinner").style.opacity = "1";
        this.check_template_subscription(null);
        // setTimeout(() => {
        this.update_menu_list(message.menubind);
        // }, 100);
      }
    },
    check_template_subscription(param) {
      axios
        .get(api_calls.open_bot_template_subscription_api(), {
          params: {
            company_name: this.$session.get("UserInformation").company_name,
            company_id: this.$session.get("UserInformation").company_id,
          },
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          },
        })
        .then(({data}) => {
          // console.log(data , "superadmin")
                 
          if(data.message.MSG_CODE === this.api_status_code.SUCCESSFUL_DB_QUERY_MODELS.MSG_CODE){
            this.$session.set("BotTemplates", data.data.templates)
            if(param === 'push_direct_response_bot'){
              this.$router.push("/bot/directresponsebot");
            }
          } else {
            if(param === 'push_direct_response_bot'){
              this.$router.push("/bot/directresponsebot");
            }
          }
        }).catch((e)=> {
          if(param === 'push_direct_response_bot'){
              this.$router.push("/bot/directresponsebot");
            }
          console.log(e);
        });
        this.$session.set("is_super_admin", true);
    },
    update_menu_list(message) {
      let menu = {};
      let main_menu_list = message.filter(
        (arr) => arr.IsMasterMenu == true && arr.Enabled == true
      );
      let main_menu_list_filtered = [];
      let sub_menu_list = message.filter(
        (arr) =>
          arr.HasSubMenus == false &&
          arr.Enabled == true &&
          arr.IsSubMenu == true
      );

      for (let i = 0, n = main_menu_list.length; i < n; i += 1) {
        let menuFilter = sidebaritems.filter((sidebar) => {
          return (
            sidebar.name === main_menu_list[i].MenuItem &&
            Boolean(sidebar.svg_html)
          );
        });
        if (menuFilter.length > 0) {
          main_menu_list_filtered.push(menuFilter[0]);
          menu[menuFilter[0].name] = {
            main_menu: menuFilter[0],
            sub_menu_list: [],
          };
        }
      }
      try {
        for (let i = 0, n = sub_menu_list.length; i < n; i += 1) {
          for (var j in sidebaritems) {
            if (
              sidebaritems[j].name === sub_menu_list[i].MenuItem &&
              Boolean(sidebaritems[j].page_path && sidebaritems[j].master_menu === sub_menu_list[i].MasterMenu)
            ) {
              // console.log(sidebaritems[j].name)
              menu[sub_menu_list[i].MasterMenu].sub_menu_list.push(
                sidebaritems[j]
              );
            }
          }
        }
      } catch (e) {
        console.log(e);
        // debugger;
      }
      menu = Object.values(menu);

      // for (let i = 0, n = message.length; i < n; i += 1) {
      //   if (message[i].Enabled && message[i].IsMasterMenu) {
      //     let menuFilter = sidebaritems.filter((sidebar) => {
      //       return (
      //         sidebar.name === message[i].MenuItem && Boolean(sidebar.svg_html)
      //       );
      //     });
      //     if (menuFilter.length > 0) {
      //       main_menu = menuFilter[0];
      //     }
      //   } else if (
      //     message[i].HasSubMenus == false &&
      //     message[i].Enabled &&
      //     message[i].IsSubMenu &&
      //     Object.keys(main_menu).length > 0
      //   ) {
      //     for (var j in sidebaritems) {
      //       if (
      //         sidebaritems[j].name === message[i].MenuItem &&
      //         Boolean(sidebaritems[j].page_path)
      //       ) {
      //         submenus.push(sidebaritems[j]);
      //       }
      //     }
      //   }
      //   if (
      //     i == n - 1 ||
      //     (message[i].IsMasterMenu == true &&
      //       message[i].HasSubMenus === false &&
      //       !Boolean(message[i].IsSubMenu) &&
      //       message[i].Enabled)
      //   ) {
      //     menu.push({
      //       main_menu: main_menu,
      //       sub_menu_list: submenus,
      //     });
      //     main_menu = [];
      //     submenus = [];
      //   } else if (
      //     i < n - 1 &&
      //     message[i + 1].IsMasterMenu &&
      //     (!Boolean(message[i + 1].IsSubMenu) ||
      //       message[i + 1].HasSubMenus == true) &&
      //     Object.keys(main_menu).length > 0
      //   ) {
      //     menu.push({
      //       main_menu: main_menu,
      //       sub_menu_list: submenus,
      //     });
      //     main_menu = [];
      //     submenus = [];
      //   }
      // }
      this.$session.set("ChatbotMenu", menu);
      this.$router.push("/bot/dashboard");
    }
  },
};
</script>

<style scoped>
    .search-container{
      float: right;
    }

    .form-search{
      position:absolute;
      top: 2px;
      right: 91px;
      border: none;
    }

    .input-field{
      border: solid 1px #DBE2E8;
      height: 34px;
      width: 300px;
      border-radius: .25rem;
    }

    input[type=text]{
      /* background-color: #f8f8f8;
      padding-left: 6px; */
      padding: 10px 15px;
      display: inline-block;
      font-size: 14px;
      font-weight: 400;
      background: #fff;
      color: #9499AE;
      outline: none;
    }

    .btn-submit{
      border:none;
      position: absolute;
      line-height: 30px;
      margin: 0px;
      padding: 0 10px;
      top: 0;
      right: 18px;
      cursor: pointer;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }

@media screen and (max-width:991px) {
  .form-search{
    right: -71px;
  }
  
}
@media screen and (max-width:767px) {
  .form-search{
    right: -12rem;
  }
  
}
@media screen and (min-width: 431px) and (max-width:576px) {
  .form-search{
    right: -2rem;
  }
}

@media screen and (max-width:430px) {
  .form-search{
    right: -8rem;
  }
}
@media screen and (max-width:375px) {
  .form-search{
    right: -11rem;
  }  
}

@media screen and (max-width:320px) {
  .form-search{
    right: -14.3rem;
  }
}
</style>