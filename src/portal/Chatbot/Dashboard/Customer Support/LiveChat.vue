<template>
  <div class="dash-cont">
    <div class="container-fluid">
      <div class="card dash-card">
        <div class="card-body p-0">
          <div class="d-flex" style="border-bottom: 1px solid #dbe2e8">
            <div class="col-md-3" style="border-right: 1px solid #dbe2e8">
              <div style="display: flex">
                <!-- <span
                  class="user-img text-center"
                  style="font-size: x-large; margin-bottom: 5px"
                  >{{ first_name[0] }}{{ last_name[0] }}</span
                > -->
                <!-- <h4 style="margin-top: 3%; margin-left: 5%">
                  {{ first_name }}&nbsp;
                </h4> -->
                <h4 style="margin-top: 3%;">{{tlt('livechat_online_customers')}}</h4>
              </div>
            </div>
            <div class="col-md-9">
              <div class="card-act d-flex flex-wrap" style="margin-top: 1%">
                <h4 class="mb-sm-0" v-if="Boolean(current_user.username)">{{ current_user.username }}</h4>
                <h4 class="mb-sm-0" v-else-if="current_user.username == ''">{{tlt('livechat_select_customer')}}</h4>
                <h4 class="mb-sm-0" v-else>{{tlt('livechat_select_customer')}}</h4>
                <div class="ml-auto" v-show="user_list.length">
                <a
                  href="#"
                  class="ml-auto"
                  style="color: red;"
                  v-if="current_user.state == 'joined'"
                  @click="disconnect_support_chat"
                  >{{tlt('livechat_stop_chat')}}</a
                >
                <a
                  href="#"
                  class="ml-auto"
                  style="color: black;"
                  v-else-if="current_user.state == 'ended'"
                  >{{tlt('livechat_end_chat')}}</a
                >
                <a
                  href="#"
                  class="ml-auto"
                  @click="join_customer(current_user)"
                  v-else-if="current_user.state == 'waiting'"
                  >{{tlt('livechat_join_chat')}}</a
                >
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex">
            <div class="col-sm-3 p-0" style="border-right: 1px solid #dbe2e8">
              <ul class="navbar-nav flex-column" style="width: 100%">
                <div v-for="(user, index) in user_list"
                  :key="index">
                <li
                  class="nav-item"
                  v-if="user.agent_username == agent_username || user.agent_username == null"
                  style="cursor: pointer"
                  :class="check_current_active_user(index)"
                  @click="select_user(user)"
                >
                  <a
                    class="d-flex"
                    href="#"
                    role="button"
                  >
                    <template v-if="user.username == ''">
                      <p style="color: black; margin: 0;">{{tlt('livechat_user')}}</p> 
                    </template>
                    <template v-else-if="user.username != ''">
                      <p style="color: black; margin: 0;">{{user.username}}</p> 
                    </template>
                    <span
                      href="#"
                      v-if="user.is_connected == false"
                      class="ml-auto"
                      @click="select_user(user) ,join_customer(user)"
                    >
                      {{tlt('livechat_join_chat')}}
                    </span>
                    <span
                      v-if="user.state == 'ended'"
                      class="ml-auto"
                      style="color: black;"
                    >
                      {{tlt('livechat_end_chat')}}
                    </span>
                  </a>
                </li>
                </div>
              </ul>
            </div>
            <div class="col-md-9" id="chat">
              <div class="chat-master">
                <div class="chat-body" style="height: 65vh; overflow-y: auto">
                  <div
                    class="chat-inner"
                    v-for="(chat, item) in chat_list"
                    :key="item"
                    v-show="chat.current_channel == current_user.channel_name"
                  >
                    <div class="chat-row sender" v-if="chat.sent">
                      <div class="chat" v-html="chat.text"></div>
                      <div class="chat-his justify-content-between" style="position: unset !important; margin-top: unset !important;">
                        <span class="time" style="color: #000">{{
                          chat.time
                        }}</span>
                        <span class="del-note delivered">{{tlt('livechat_delivered')}}</span>
                      </div>
                    </div>
                    <div class="chat-row receiver" v-if="chat.received">
                      <div class="chat" v-html="chat.text"></div>
                      <div class="chat-his justify-content-between" style="position: unset !important; margin-top: unset !important;">
                        <span class="time" style="color: #000">{{
                          chat.time
                        }}</span>
                        <span class="del-note delivered">{{tlt('livechat_delivered')}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="chat-footer" style="margin-bottom: 20px">
                  <div
                    class="typing-indicator"
                    style="margin-left: 10px"
                    v-show="is_typing_indicator_on"
                  >
                    <p style="font-size: 13px; font-weight: 300">
                      {{ msg_sender }} {{tlt('livechat_typing')}}
                    </p>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div
                  class="chat-footer"
                  style="
                    border-top: solid 1px #dbe2e8;
                    border-radius: 0 0 0 0;
                    overflow: hidden;
                  "
                >
                  <div class="chat-txt">
                    <div class="input-group mb-0">
                      <input
                        type="text"
                        class="form-control"
                        :placeholder="tlt('livechat_type_placeholder')"
                        v-model="to_send"
                        @keypress.enter="send_message"
                      />
                      <div class="input-group-append">
                        <button class="btn" type="button" @click="send_message">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            style="fill: #8a8a8a63"
                            width="40"
                            height="25"
                            viewBox="0 0 24 24"
                          >
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                            <path d="M0 0h24v24H0z" fill="none" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
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
import swal from "sweetalert2";
import { Socket } from "phoenix-socket";
import { setInterval } from "timers";
import debounce from "vue-debounce/dist/debounce.min.js";
import { generate_time } from "@/portal/mixins";
import { freeze_portal,show_subscription_expired_swal } from "@/portal/mixins";

export default {
  name: "LiveChatPage",
  data() {
    return {
      user_list: [],
      current_user: {},
      current_channel: "",
      first_name: this.$session.has("UserFirstName")
        ? this.$session.get("UserFirstName")
        : this.$session.get("UserInformation").first_name,
      last_name: this.$session.has("UserLastName")
        ? this.$session.get("UserLastName")
        : this.$session.get("UserInformation").last_name,
      agent_username: this.$session.get("UserInformation").email,
      chat_list: [],
      to_send: "",
      ch: null,
      message: null,
      user_channels: {},
      socket: null,
      msg_sender: "",
      delay: 10000,
      is_typing_indicator_on: false,
      disable_btn_expired : false,
      // user_list: [{"channel_name":"customers_groups:dhs6bennkl","username":"Vimleshh","is_connected":false,"agent_username":null,"agent_role":null,"state":"waiting"},{"channel_name":"customers_groups:hemzastnhe","username":"Akshay","is_connected":false,"agent_username":null,"agent_role":null,"state":"waiting"}]
    };
  },
  watch: {
    to_send(newVal) {
      this.button_fill();
    },
  },
  mixins: [generate_time,freeze_portal],
  mounted() {
    setTimeout(() => {
      this.freeze_portal();
    }, 1000);
    this.$root.$on("LiveChatPageDisabled", (data) => {
      if(data===true){
        this.disable_btn_expired = true;
      }
    });
    setTimeout(() => {
      if (!this.disable_btn_expired) {
      // this.socket = new Socket(process.env.VUE_APP_LIVE_CHAT_WEBSOCKET_ENDPOINT, {
      // params: {
      //   username: this.$session.get("UserInformation").email,
      //   token: this.$session.get("UserInformation").tokens,
      //   role: this.$session.get("UserInformation").role,
      // },
      // });
      this.socket = new Socket(process.env.VUE_APP_LIVE_CHAT_WEBSOCKET_ENDPOINT, {
      params: {
        jwt: this.$session.get("at"),
        company_name: this.$session.get("UserInformation").company_name,
        company_id: this.$session.get("UserInformation").company_id,
        email: this.$session.get("UserInformation").email,
        first_name: this.$session.get("UserInformation").first_name,
        last_name: this.$session.get("UserInformation").last_name,
      },
      });
      this.socket.connect();
      this.ch = this.socket.channel(
        "companies:" + this.$session.get("UserInformation").company_id
      );
      this.ch.join();

      this.ch.on('new_name', (res) => {
        var check = this.user_list.some(obj => obj.channel_name === res.topic)
        var index = this.user_list.findIndex(obj => obj.channel_name === res.topic);
        if(check) this.user_list[index].username = res.name;
      })
      this.ch.on("customer_needs_support_agent", (res) => { 
        var temp = res;
        for (var i in temp.metas) {
          var channel_group = temp.customer_chat_group;
          var check = this.user_list.some(obj => obj.channel_name === channel_group)
          // this.user_channels[channel_group] = this.socket.channel(res.customer_chat_group);
          if (check) {
            var index = this.user_list.findIndex(obj => obj.channel_name === channel_group);
            if (Boolean(temp.metas[i].user_info.is_customer) && temp.metas.length == 1) {
              this.user_list[index].is_connected = false;
              this.user_list[index].agent_role = null;
              this.user_list[index].agent_username = null;
              this.user_list[index].state == "ended" ? "ended" : "waiting";
            } else {
              this.user_list[index].is_connected = true;
              this.user_list[index].agent_role = temp.metas[i].user_info.role;
              this.user_list[index].agent_username = temp.metas[i].user_info.username;
              this.user_list[index].state == "ended" ? "ended" : "joined";
            }
          } else {
            this.user_list.push({
              "channel_name": channel_group,
              "username": "",
              "is_connected": false,
              "agent_username": null,
              "agent_role": null,
              "state": "waiting"
            })
            this.user_channels[channel_group] = this.socket.channel(
              channel_group
            );
          }
        }
      })

      // this.ch.on("customer_needs_support_agent", (res) => {
      // console.log("customer_needs_support_agent", res);
      // this.user_list.push({
      //   channel_name: res.customer_chat_group,
      //   username: "",
      //   is_connected: false
      // });
      // this.current_user = res.customer_chat_group;
      // this.current_user = "Customer";
      // this.current_channel = res.customer_chat_group;
      // this.user_channels[res.customer_chat_group] = this.socket.channel(
      //   res.customer_chat_group
      // );
      // this.message = this.socket.channel(res.customer_chat_group);

      // this.user_channels[res.customer_chat_group].on("started_typing",
      //   (typing_response) => {
      //     if (res.customer_chat_group == this.current_user.channel_name) {
      //       if (typing_response.sender != "support_agent") {
      //         var name = this.user_list.filter((user) => {
      //           return user.channel_name == res.customer_chat_group;
      //         });
      //         if (name[0].username == "") {
      //           this.msg_sender = typing_response.sender;
      //         } else {
      //           this.msg_sender = name[0].username;
      //         }
      //       }
      //       this.is_typing_indicator_on = true;
      //     }
      //   }
      // );
      // this.user_channels[res.customer_chat_group].on("stopped_typing", () => {
      //   this.is_typing_indicator_on = false;
      // });
      // this.user_channels[res.customer_chat_group].on("new_chat_message",
      //   (response) => {
      //     if (response.sender == "customer") {
      //       this.chat_list.push({
      //         received: true,
      //         text: response.message,
      //         current_channel: res.customer_chat_group,
      //         time: this.generate_time(),
      //       });
      //       this.update_scrollbar();
      //       this.no_response(this);
      //     }
      //   }
      // );
      // // this.user_channels[res.customer_chat_group].on("new_name", (resp) => {
      // //   for (let i = 0, n = this.user_list.length; i < n; i++) {
      // //     if (this.user_list[i].channel_name == res.customer_chat_group) {
      // //       this.user_list[i].username = resp.name;
      // //     }
      // //   }
      // //   this.current_user = resp.name;
      // //   this.no_response(this);
      // // });
      // this.user_channels[res.customer_chat_group].on("stopped_chat", (resp) => {
      //   this.chat_list.push({
      //     received: true,
      //     text: resp.name + resp.message,
      //     current_channel: resp.topic,
      //     time: this.generate_time(),
      //   });
      //   this.update_scrollbar();
      //   swal({
      //     text: resp.name + resp.message,
      //     toast: true,
      //     showConfirmButton: false,
      //     position: "top-end",
      //     type: "info",
      //     timer: 5000,
      //   });
      //   var index = this.user_list.findIndex(obj => obj.channel_name === resp.topic);
      //   this.user_list[index].agent_username = this.agent_username;
      //   this.user_list[index].is_connected = true;
      //   this.user_list[index].state = "ended";
      //   // toastr.info(resp.name + " " + resp.message);
      //   // this.user_list = this.user_list.filter((user) => {
      //   //   return user.username != resp.name;
      //   // });
      //   // this.chat_list = this.chat_list.filter((chat) => {
      //   //   return chat.current_channel != this.current_channel;
      //   // });
      //   // this.current_user = this.first_name;
      // });

      // this.user_channels[res.customer_chat_group].join();
    // });

    // this.ch.on("customer_needs_support_agent", (res) => {
    //   console.log("customer_needs_support_agent", res);
    // });
    }else {
      swal({
        type: "warning",
        text: `You are on free trial please, kindly upgrade your plan to use this feature`,
        showCancelButton: true,
        confirmButtonColor:'#3085d6',
        confirmButtonText: 'Subscribe Now',
        cancelButtonText: 'Later',
        cancelButtonColor: '#d33',
      }).then((result) => {
      if (result.value == true)
      {
        this.$router.push({name: 'Settings',params:{Subscription:true}});
      }else{
        this.$router.push("/bot/dashboard");
        this.$root.$emit("change_sidebar_main_menu", "Dashboard");
        }
      })
    }
    },1000);
  },
  beforeDestroy(){
    if (!this.disable_btn_expired) {
    this.ch.leave();
    //disconnect all customer when SA navigates to other page
      for (const property in this.user_channels) {
      this.user_channels[property].push("stopped_chat", {
          name: "Support Agent",
          message: " has ended this conversation.",
          });
            this.user_channels[property].leave();
      }
    this.socket.disconnect(); 
    }
  },
  methods: {
    join_customer(res) {
      this.user_channels[res.channel_name].join();
      var index = this.user_list.findIndex(obj => obj.channel_name === res.channel_name);
      this.user_list[index].agent_username = this.agent_username;
      this.user_list[index].is_connected = true;
      this.user_list[index].state = "joined";
      // this.user_channels[res.channel_name] = this.socket.channel(
      //   res.channel_name
      // );
      
      this.user_channels[res.channel_name].on("started_typing",
        (typing_response) => {
          if (res.channel_name == this.current_user.channel_name) {
            if (typing_response.sender != "support_agent") {
              var name = this.user_list.filter((user) => {
                return user.channel_name == res.channel_name;
              });
              if (name[0].username == "") {
                this.msg_sender = typing_response.sender;
              } else {
                this.msg_sender = name[0].username;
              }
            }
            this.is_typing_indicator_on = true;
          }
        }
      );
      this.user_channels[res.channel_name].on("stopped_typing", () => {
        this.is_typing_indicator_on = false;
      });
      this.user_channels[res.channel_name].on("new_chat_message",
        (response) => {
          if (response.sender == "customer") {
            this.chat_list.push({
              received: true,
              text: response.message,
              current_channel: res.channel_name,
              time: this.generate_time(),
            });
            this.update_scrollbar();
            this.no_response(this);
          }
        }
      );
      this.user_channels[res.channel_name].on("stopped_chat", (resp) => {
        this.chat_list.push({
          received: true,
          text: resp.name + resp.message,
          current_channel: resp.topic,
          time: this.generate_time(),
        });
        this.update_scrollbar();
        swal({
          text: resp.name + resp.message,
          toast: true,
          showConfirmButton: false,
          position: "top-end",
          type: "info",
          timer: 5000,
        });
        var index = this.user_list.findIndex(obj => obj.channel_name === resp.topic);
        this.user_list[index].agent_username = this.agent_username;
        this.user_list[index].is_connected = true;
        this.user_list[index].state = "ended";
      });
    },
    button_fill() {
      document.querySelector("svg").style.fill = "#273679";
      if (this.to_send == "") {
        document.querySelector("svg").style.fill = "#8a8a8a63";
      } else if (this.to_send != "") {
        this.user_channels[this.current_user.channel_name].push("started_typing");
      }
      this.stop_typing(this);
    },
    stop_typing: debounce(function (vm) {
      vm.user_channels[vm.current_user.channel_name].push("stopped_typing");
    }, 5000),
    no_response: debounce(function (vm) {
      vm.user_channels[vm.current_user.channel_name].push("no_response", {
        sender: "sender",
      });
    }, 10000),
    send_message() {
      if (this.to_send != "" && this.user_list.length > 0) {
        this.chat_list.push({
          sent: true,
          text: this.to_send,
          time: this.generate_time(),
          current_channel: this.current_user.channel_name,
        });
        this.user_channels[this.current_user.channel_name].push("new_chat_message", {
          message: this.to_send,
        });
        this.to_send = "";
        this.no_response(this);
        this.update_scrollbar();
      }
    },
    disconnect_support_chat() {
      this.user_channels[this.current_user.channel_name].push("stopped_chat", {
        name: "Support Agent",
        message: " has ended this conversation.",
      });
      this.user_channels[this.current_user.channel_name].leave();
      // this.user_list = this.user_list.filter((user) => {
      //   return user.channel_name != this.current_user.channel_name;
      // });

      var index = this.user_list.findIndex(obj => obj.channel_name === this.current_user.channel_name);
      this.user_list[index].agent_username = this.agent_username;
      this.user_list[index].is_connected = true;
      this.user_list[index].state = "ended";
      // this.current_user = this.first_name;
    },
    update_scrollbar() {
      setTimeout(() => {
        this.is_typing_indicator_on = false;
      }, 1500);
      setTimeout(() => {
        document.querySelector(".chat-body").scrollTop = document.querySelector(
          ".chat-body"
        ).scrollHeight;
      }, 200);
    },
    // user_list_class(channelname) {
      // if (channelname == this.current_channel) {
      //   return "nav-link active";
      // } else {
      //   return "nav-link inactive";
      // }
    // },
    select_user(user) {
      this.current_user = user;
      this.update_scrollbar();
    },
    check_current_active_user(index) {
      if (Boolean(this.current_user) === true) {
        return this.current_user.channel_name ===
          this.user_list[index].channel_name
          ? "current-active-user"
          : null;
      }
    },
  },
};
</script>
<style scoped>
/* ul {
  list-style-type: none;
  padding: 0;
  border: 1px solid #ddd;
} */

li {
  padding: 8px 16px;
  border-bottom: 1px solid #ddd;
}

/* ul li:last-child {
  border-bottom: none
}
ul li:first-child {
  border-top: none
} */
.current-active-user {
  background: rgba(0, 0, 0, 0.1);
}
.darkblue-btn {
  padding: 10px 6px;
  font-size: 12px;
}
.nav-link.inactive {
  text-align: center;
  border: 1px solid #fff;
}
.nav-link.active {
  border: 1px solid #293978;
  text-align: center;
}
/* .nav-item :hover {
  border: 1px solid #293978;
} */
.user-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: solid 1px #293978;
  display: inline-block;
  overflow: hidden;
  vertical-align: middle;
}
.chat {
  transform: scale(0);
  transform-origin: 0 0;
  animation: bounce 500ms linear both;
  border-radius: 5px;
  padding: 5px 8px;
  width: fit-content;
}
.receiver .chat {
  color: #000 !important;
  text-align: left;
  /* margin-top: 3%; */
}
.sender {
  color: #fff;
  margin-left: 50%;
  text-align: right;
  margin-top: 3%;
}
.sender .chat {
  background: #293978;
}
.chat-row:not(:first-child) {
  margin: 10px 0;
}
#chat,
.chat-txt input {
  background-image: url(/img/sdk-background.png);
}
div::-webkit-scrollbar {
  max-height: 20px;
  width: 6px;
  border-radius: 10px;
}

/* Track */
div::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

/* Handle */
div::-webkit-scrollbar-thumb {
  background: #7d7d7d;
  border-radius: 10px;
}

/* Handle on hover */
div::-webkit-scrollbar-thumb:hover {
  background: #555;
  border-radius: 10px;
}
</style>
