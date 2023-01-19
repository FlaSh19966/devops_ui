<template>
  <div>
    <div class="group_chat_btn">
      <a href="javascript:void(0)" @click="load_widget">My Chat</a>
    </div>
    <div class="chatbox_cover" id="chatbot_main" style="display:none">
      <div class="row">
        <div class="col-lg-4">
          <div
            class="left_groupsection"
            style="overflow:hidden"
            @mouseenter="menu_scroll('enter')"
            @mouseleave="menu_scroll('leave')"
          >
            <h3>Chats</h3>

            <div class="group_section" v-show="groups.length>0">
              <div class="headingdivhere">
                <h4>Group Chats</h4>
              </div>
              <ul>
                <li v-for="(group, index) in groups" :key="index">
                  <a
                    id="group_select_id"
                    href="javascript:void(0);"
                    @click="select_conversation('group_chat', group.group_name, index)"
                  >
                    <img src="/img/user.png">
                    {{group.group_name}}
                    <span
                      class="badge badge-success"
                      v-show="group.unread!=0"
                    >{{group.unread}}</span>
                  </a>
                </li>
              </ul>
            </div>
            <div class="group_section directmassagesection">
              <div class="headingdivhere">
                <h4>
                  Direct Messages
                  <a
                    href="#"
                    class="darkblue-btn"
                    data-toggle="modal"
                    data-target="#direct_chat_modal"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="13.997"
                      viewBox="0 0 14 13.997"
                    >
                      <path
                        id="Union_13"
                        data-name="Union 13"
                        d="M-12684,2058v-5h-5a1,1,0,0,1-1-1,1,1,0,0,1,1-1h5v-5a1,1,0,0,1,1-1,1,1,0,0,1,1,1v5h5a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-5v5a1,1,0,0,1-1,1A1,1,0,0,1-12684,2058Z"
                        transform="translate(12690.001 -2045.002)"
                        fill="#fff"
                      ></path>
                    </svg>
                    <span>Chat</span>
                  </a>
                </h4>
              </div>
              <ul>
                <li v-for="(user, index) in direct_conversations" :key="index">
                  <a
                    href="javascript:void(0);"
                    @click="select_conversation('direct_chat', user.name, index)"
                  >
                    <img src="/img/user.png">
                    {{user.name}}
                    <span
                      class="badge badge-success"
                      v-show="user.unread!=0"
                      style="font-size:70%"
                    >{{user.unread}}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="topfillupusername">
            <div class="row">
              <div
                class="col-lg-1"
                v-show="conversation_name!=='Select a conversation to get started'"
              >
                <img src="/img/user.png">
              </div>
              <div class="col-lg-11">
                <h6>{{conversation_name}}</h6>
              </div>
            </div>
          </div>
          <div class="message_here_display" style="overflow-y:auto" @scroll="scroll_previous_chats">
            <div
              v-for="(chat_text, index) in chat"
              :key="index"
              v-show="chat_text.group==conversation_name"
            >
              <div class="chat-row sender" v-show="chat_text.sent=='True'">
                <div class="chat">{{ chat_text.msg }}</div>
                <div class="chat-his justify-content-between">
                  <span class="time">{{ chat_text.time }}</span>
                  <span class="del-note delivered">Delivered</span>
                </div>
              </div>
              <div class="chat-row receiver" v-show="chat_text.received=='True'">
                <div class="chat-his justify-content-left">
                  <span
                    class="del-note delivered"
                    style="padding-left:10px;color:#000"
                  >{{chat_text.sent_by}}</span>
                </div>
                <div class="chat">{{ chat_text.msg }}</div>
                <div class="chat-his justify-content-between">
                  <span class="time" style="color:#000">{{ chat_text.time }}</span>
                  <span class="del-note delivered">Delivered</span>
                </div>
              </div>
            </div>
          </div>
          <div class="messagetype_box">
            <input
              id="enter_message_id"
              type="text"
              placeholder="Type your message here..."
              @keyup.enter="send_message"
              v-model="chat_message"
              @input="button_fill"
            >
            <button class="btn" type="button" id="button-addon3" @click="send_message">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style="fill:#8a8a8a63"
                width="40"
                height="25"
                viewBox="0 0 24 24"
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                <path d="M0 0h24v24H0z" fill="none"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade dash-modal"
      id="direct_chat_modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="direct_chat_modal_title"
      aria-hidden="true"
      style="z-index: 10000;"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt>
              </div>
              <h3>Users</h3>
            </div>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <img src="/img/close-icn.png" alt>
            </button>
            <form @submit="create_new_peer_peer_chat">
              <div class="form-group">
                <multiselect
                  :close-on-select="false"
                  :taggable="true"
                  :multiple="true"
                  :options="users_list"
                  placeholder="Select Users"
                  track-by="user"
                  label="user"
                  v-model="selected_users"
                ></multiselect>
              </div>
              <div class="btn-wrap text-right">
                <button type="button" class="btn btn-link" data-dismiss="modal">Cancel</button>
                <button type="submit" class="darkblue-btn">Chat</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api_calls from "@/portal/api_calls";
import axios from "axios";
import { bus } from "@/portal/main";
import Multiselect from "vue-multiselect";
import { Socket } from "phoenix-socket";
import {generate_time} from "@/portal/mixins"

export default {
  data() {
    return {
      chat: [],
      groups: [],
      direct_conversations: [],
      chat_message: "",
      selected_users: [],
      conversation_name: "Select a conversation to get started",
      channels: [],
      socket_url: "ws://staging.cense.ai:4000/socket",
      users_list: [],
      conversation_type: "",
      message_channel: null,
      socket: null,
      company_name: "",
      company_id: ""
    };
  },
  components: {
    Multiselect
  },
  mixins: [generate_time],
  created() {
    if (this.$session.has("GroupChatLoginToken")) {
      if (
        !this.$session.has("CompanyId") &&
        this.$session.get("UserInformation").role == "SuperAdmin"
      ) {
        toastr.warning("Please select a company name from the dropdown");
      }
      if (this.$session.get("UserInformation").role == "SuperAdmin") {
        if (this.$session.has("CompanyId")) {
          this.companyid = this.$session.get("CompanyId");
          this.companyname = this.$session.get("CompanyName");
        } else {
          toastr.warning("Please select a company name from the dropdown");
        }
      } else {
        this.companyid = this.$session.get("UserInformation").company_id;
        this.companyname = this.$session.get("UserInformation").company_name;
      }
      axios
        .get(api_calls.chat_user_get_groups_url(), {
          params: {
            username: this.$session.get("UserInformation").email,
            token: this.$session.get("GroupChatLoginToken")
          }
        })
        .then(response => {
          if (response.data.error == "you need to log in") {
          } else {
            for (var i in response.data) {
              if (response.data[i].includes("|")) {
                var temp = response.data[i].split("|", 2);
                if (this.$session.get("UserInformation").email == temp[0]) {
                  this.direct_conversations.push({ name: temp[1], unread: 0 });
                } else if (
                  this.$session.get("UserInformation").email == temp[1]
                ) {
                  this.direct_conversations.push({ name: temp[0], unread: 0 });
                }
              } else {
                this.groups.push({
                  group_name: response.data[i],
                  unread: 0
                });
              }
              axios
                .get(api_calls.chat_previous_history(), {
                  params: {
                    token: this.$session.get("GroupChatLoginToken"),
                    group_name: response.data[i],
                    from: 0,
                    to: 9
                  }
                })
                .then(res => {
                  for (var j in res.data.messages) {
                    var temp = res.data.messages[j].group_name.split("|", 2);
                    var group_name = res.data.messages[j].group_name.replace(
                      "groups:",
                      ""
                    );
                    if (this.$session.get("UserInformation").email == temp[0]) {
                      group_name = temp[1];
                    } else if (
                      this.$session.get("UserInformation").email == temp[1]
                    ) {
                      group_name = temp[0];
                    }
                    this.chat.push({
                      received:
                        res.data.messages[j].member_id ==
                        this.$session.get("UserInformation").email
                          ? "False"
                          : "True",
                      sent:
                        res.data.messages[j].member_id ==
                        this.$session.get("UserInformation").email
                          ? "True"
                          : "False",
                      msg: res.data.messages[j].message,
                      sent_by: res.data.messages[j].member_id,
                      // time: this.generate_time,
                      group: group_name
                    });
                  }
                });
              this.connect_groups(response.data[i]);
            }
          }
        });
    }
    if (this.$session.has("UserInformation")) {
      axios
        .post(api_calls.load_users_url(), {
          company_id: this.$session.get("UserInformation").company_id,
          company_name: this.$session.get("UserInformation").company_name,
          license_key: this.$session.get("UserInformation").license_key,
          email: this.$session.get("UserInformation").email,
          token: this.$session.get("UserInformation").tokens,
          page_no: 1,
          per_page: 5
        },{
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          },
        })
        .then(response => {
          for (var i in response.data[0]) {
            this.users_list.push({
              user: response.data[0][i]
            });
          }
        });
    }
  },
  mounted() {
    bus.$on("get group members now", data => {
      if (data == "True" && this.groups.length == 0) {
        var chatbot_main = document.querySelector("#chatbot_main");
        chatbot_main.style.display = "none";
        if (this.$session.has("GroupChatLoginToken")) {
          axios
            .get(api_calls.chat_user_get_groups_url(), {
              params: {
                username: this.$session.get("UserInformation").email,
                token: this.$session.get("GroupChatLoginToken")
              }
            })
            .then(response => {
              if (response.data.error == "you need to log in") {
              } else {
                for (var i in response.data) {
                  if (response.data[i].includes("|")) {
                    var temp = response.data[i].split("|", 2);
                    if (this.$session.get("UserInformation").email == temp[0]) {
                      this.direct_conversations.push({
                        name: temp[1],
                        unread: 0
                      });
                    } else if (
                      this.$session.get("UserInformation").email == temp[1]
                    ) {
                      this.direct_conversations.push({
                        name: temp[0],
                        unread: 0
                      });
                    }
                  } else {
                    this.groups.push({
                      group_name: response.data[i],
                      unread: 0
                    });
                  }
                  axios
                    .get(api_calls.chat_previous_history(), {
                      params: {
                        token: this.$session.get("GroupChatLoginToken"),
                        group_name: response.data[i],
                        from: 0,
                        to: 9
                      }
                    })
                    .then(res => {
                      for (var j in res.data.messages) {
                        var temp = res.data.messages[j].group_name.split(
                          "|",
                          2
                        );
                        var group_name = res.data.messages[
                          j
                        ].group_name.replace("groups:", "");
                        if (
                          this.$session.get("UserInformation").email == temp[0]
                        ) {
                          group_name = temp[1];
                        } else if (
                          this.$session.get("UserInformation").email == temp[1]
                        ) {
                          group_name = temp[0];
                        }
                        this.chat.push({
                          received:
                            res.data.messages[j].member_id ==
                            this.$session.get("UserInformation").email
                              ? "False"
                              : "True",
                          sent:
                            res.data.messages[j].member_id ==
                            this.$session.get("UserInformation").email
                              ? "True"
                              : "False",
                          msg: res.data.messages[j].message,
                          sent_by: res.data.messages[j].member_id,
                          // time: this.generate_time,
                          group: group_name
                        });
                      }
                    });
                  this.connect_groups(response.data[i]);
                }
              }
            });
        }
      }
      if (data == "True" && this.users_list.length == 0) {
        axios
          .post(api_calls.load_users_url(), {
            company_id: this.companyid,
            company_name: this.companyname,
            license_key: this.$session.get("UserInformation").license_key,
            email: this.$session.get("UserInformation").email,
            token: this.$session.get("UserInformation").tokens,
            page_no: 1,
            per_page: 5
          },{
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          },
          })
          .then(response => {
            for (var i in response.data[0]) {
              this.users_list.push({
                user: response.data[0][i]
              });
            }
          });
      }
    });
    bus.$on("Disable the bot chat now", (data1, data2) => {
      if (data1 == "True" && data2 != "Loggedout") {
        var chatbot_main = document.querySelector("#chatbot_main");
        chatbot_main.style.display = "none";
      }
    });
    bus.$on("destroy bot chat", data => {
      if (data == "True") {
        var chatbot_main = document.querySelector("#chatbot_main");
        chatbot_main.style.display = "none";
        this.chat_message = "";
        this.chat = [];
        this.groups = [];
        this.direct_conversations = [];
      }
    });
  },
  methods: {
    scroll_previous_chats() {
      var conv_type = "";
      if (this.conversation_type == "group_chat") {
        conv_type = this.conversation_name;
      } else if (this.conversation_type == "direct_chat") {
        conv_type =
          this.$session.get("UserInformation").email +
          "|" +
          this.conversation_name;
      }
      var chat_list = this.chat.filter(chat => {
        return chat.group == this.conversation_name;
      });
      if (event.target.scrollTop == 0) {
        axios
          .get(api_calls.chat_previous_history(), {
            params: {
              token: this.$session.get("GroupChatLoginToken"),
              group_name: conv_type,
              from: chat_list.length,
              to: Number(chat_list.length) + 10
            }
          })
          .then(res => {
            for (var j in res.data.messages) {
              var temp = res.data.messages[j].group_name.split("|", 2);
              var group_name = res.data.messages[j].group_name.replace(
                "groups:",
                ""
              );
              if (this.$session.get("UserInformation").email == temp[0]) {
                group_name = temp[1];
              } else if (
                this.$session.get("UserInformation").email == temp[1]
              ) {
                group_name = temp[0];
              }
              this.chat.unshift({
                received:
                  res.data.messages[j].member_id ==
                  this.$session.get("UserInformation").email
                    ? "False"
                    : "True",
                sent:
                  res.data.messages[j].member_id ==
                  this.$session.get("UserInformation").email
                    ? "True"
                    : "False",
                msg: res.data.messages[j].message,
                sent_by: res.data.messages[j].member_id,
                // time: this.generate_time,
                group: group_name
              });
            }
          });
      }
    },
    create_new_peer_peer_chat() {
      event.preventDefault();
      if (this.selected_users.length == 0) {
        toastr.error("Please select a user to create a chat.");
      } else {
        for (var user_index in this.selected_users) {
          axios
            .post(api_calls.create_peer_peer_chat(), {
              token: this.$session.get("GroupChatLoginToken"),
              with: this.selected_users[user_index].user
            })
            .then(response => {
              if (response.data.created) {
                toastr.success("Your chat has been added successfully");
                if (user_index == this.selected_users.length - 1) {
                  $("#direct_chat_modal").modal("hide");
                }
                axios
                  .get(api_calls.chat_user_get_groups_url(), {
                    params: {
                      username: this.$session.get("UserInformation").email,
                      token: this.$session.get("GroupChatLoginToken")
                    }
                  })
                  .then(resp => {
                    if (resp.data.error == "you need to log in") {
                    } else {
                      this.groups = [];
                      this.direct_conversations = [];
                      for (var i in resp.data) {
                        if (resp.data[i].includes("|")) {
                          var temp = resp.data[i].split("|", 2);
                          if (
                            this.$session.get("UserInformation").email ==
                            temp[0]
                          ) {
                            this.direct_conversations.push({
                              name: temp[1],
                              unread: 0
                            });
                          } else if (
                            this.$session.get("UserInformation").email ==
                            temp[1]
                          ) {
                            this.direct_conversations.push({
                              name: temp[0],
                              unread: 0
                            });
                          }
                        } else {
                          this.groups.push({
                            group_name: resp.data[i],
                            unread: 0
                          });
                        }
                        if (!this.channels.includes({ topic: resp.data[i] })) {
                          this.connect_groups(resp.data[i]);
                        }
                      }
                    }
                  });
              } else if (response.data.error == "") {
                toastr.error("There was an error while creating the group.");
                $("#direct_chat_modal").modal("hide");
              }
            });
        }
      }
    },
    button_fill() {
      var to_send = event.target.value;
      document.querySelector("svg").style.fill = "#273679";
      if (to_send == "") {
        document.querySelector("svg").style.fill = "#8a8a8a63";
      }
    },
    connect_groups(topic) {
      if (this.socket === null) {
        this.socket = new Socket(VUE_APP_LIVE_CHAT_WEBSOCKET_ENDPOINT, {
          params: {
            username: this.$session.get("UserInformation").email,
            token: this.$session.get("UserInformation").tokens
          }
        });
        this.socket.connect();
      }
      this.channels.push({
        topic: topic
      });
      var index = this.channels.length - 1;
      this.channels[index].channel = this.socket.channel("groups:" + topic);
      this.channels[index].channel.join();
      this.channels[index].channel.on("new_chat_message", res => {
        if (res.sender != this.$session.get("UserInformation").email) {
          var temp = topic.split("|", 2);
          var group_name = this.channels[index].topic.replace("groups:", "");
          if (this.$session.get("UserInformation").email == temp[0]) {
            group_name = temp[1];
          } else if (this.$session.get("UserInformation").email == temp[1]) {
            group_name = temp[0];
          }
          if (temp.length == 1 && this.conversation_name !== temp) {
            for (var i in this.groups) {
              if (this.groups[i].group_name == group_name) {
                this.groups[i].unread += 1;
              }
            }
          } else if (temp.length == 2) {
            for (var i in this.direct_conversations) {
              if (
                this.direct_conversations[i].name == group_name &&
                this.conversation_name !== group_name
              ) {
                this.direct_conversations[i].unread += 1;
              }
            }
          }
          this.chat.push({
            received: "True",
            msg: res.message,
            sent_by: res.sender,
            time: this.generate_time,
            group: group_name
          });
          this.update_scrollbar();
        }
      });
    },
    menu_scroll(type) {
      if (type == "enter") {
        document.querySelector(".left_groupsection").style.overflowY = "auto";
      } else if (type == "leave") {
        document.querySelector(".left_groupsection").style.overflowY = "hidden";
      }
    },
    chat_scroll(type) {
      if (type == "enter") {
        document.querySelector(".message_here_display").style.overflowY =
          "auto";
      } else if (type == "leave") {
        document.querySelector(".message_here_display").style.overflowY =
          "hidden";
      }
    },
    load_widget() {
      event.preventDefault();
      var chatbot_main = document.querySelector("#chatbot_main");
      if (chatbot_main.style.display == "none") {
        bus.$emit("bot chat is enabled", "True");
        chatbot_main.style.display = "block";
      } else if (chatbot_main.style.display == "block") {
        chatbot_main.style.display = "none";
      }
    },
    select_conversation(type, name, index) {
      this.conversation_name = name;
      if (this.socket !== null) {
        if (type == "group_chat") {
          this.chat_message = "";
          this.groups[index].unread = 0;
          this.update_scrollbar();
        } else if (type == "direct_chat") {
          this.chat_message = "";
          this.direct_conversations[index].unread = 0;
          this.update_scrollbar();
        }
        this.conversation_type = type;
      }
    },
    indicate_typing() {
      var send_message = this.socket.channel(
        "groups:" + this.conversation_name
      );
      send_message.join();
      send_message.push("started_typing");
    },
    send_message() {
      if (
        this.chat_message !== "" &&
        this.conversation_name !== "Select a conversation to get started"
      ) {
        this.chat.push({
          sent: "True",
          msg: this.chat_message,
          time: this.generate_time,
          group: this.conversation_name
        });
        for (var i in this.channels) {
          if (this.channels[i].channel.topic.includes(this.conversation_name)) {
            this.channels[i].channel.push("new_chat_message", {
              message: this.chat_message
            });
            break;
          }
        }
        this.update_scrollbar();
        this.chat_message = "";
      }
    },
    update_scrollbar() {
      setTimeout(() => {
        document.querySelector(
          ".message_here_display"
        ).scrollTop = document.querySelector(
          ".message_here_display"
        ).scrollHeight;
      }, 200);
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>
<style scoped>
.bot-chat-act {
  background: #283879;
  border-radius: 10px;
  width: 100px;
  height: 40px;
  color: #fff;
  position: fixed;
  bottom: 15px;
  right: 130px;
  z-index: 1111;
}
.message_here_display::-webkit-scrollbar {
  max-height: 20px;
  width: 8px;
  border-radius: 10px;
}

/* Track */
.message_here_display::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

/* Handle */
.message_here_display::-webkit-scrollbar-thumb {
  background: #7d7d7d;
  border-radius: 10px;
}

/* Handle on hover */
.message_here_display::-webkit-scrollbar-thumb:hover {
  background: #555;
  border-radius: 10px;
}
.left_groupsection::-webkit-scrollbar {
  max-height: 20px;
  width: 8px;
  border-radius: 10px;
}

/* Track */
.left_groupsection::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

/* Handle */
.left_groupsection::-webkit-scrollbar-thumb {
  background: #7d7d7d;
  border-radius: 10px;
}

/* Handle on hover */
.left_groupsection::-webkit-scrollbar-thumb:hover {
  background: #555;
  border-radius: 10px;
}
.sender .chat {
  color: #fff;
  transform: scale(0);
  transform-origin: 0 0;
  animation: bounce 500ms linear both;
  border-radius: 5px;
  padding: 5px 8px;
  width: fit-content;
  margin-left: auto;
  margin-right: 5%;
}
.receiver .chat {
  color: #fff;
  transform: scale(0);
  transform-origin: 0 0;
  animation: bounce 500ms linear both;
  border-radius: 5px;
  padding: 5px 8px;
  width: fit-content;
  margin-left: 1%;
}
.sender > .chat-his.justify-content-between {
  margin-right: 5%;
}
.receiver > .chat-his.justify-content-between {
  margin-left: 1%;
}
.receiver {
  color: #000;
  text-align: left;
  margin-top: 3%;
}
.sender {
  color: #fff;
  margin-left: 50%;
  text-align: right;
  margin-top: 3%;
}
.chat-row:not(:first-child) {
  margin: 10px 0;
}
.headingdivhere > h4 .darkblue-btn {
  padding: 6px 15px !important;
  background: #273679 !important;
  float: right !important;
  margin-top: -3% !important;
  font-size: 14px !important;
}
.headingdivhere > h4 .darkblue-btn:hover {
  background: #273679 !important;
  color: #fff;
}
.multiselect__option[data-select="Press enter to select"] > span {
  margin-left: 10%;
}

</style>
