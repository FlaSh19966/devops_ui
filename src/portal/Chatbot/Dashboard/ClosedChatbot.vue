<template>
  <div>
    <div class="chat-master" id="app">
      <div class="chat-wrap">
        <div class="chat-head">
          <div class="media">
            <img
              :src="chat_widget.logo"
              style="height: 50px;width: 95px;margin-top: 5px"
              class="rounded "
              alt="..."
            >
            <div class="media-body" style="margin-left:10px">
              <p
                style="font-size: 16px;font-weight: bold;margin-top: 17px;"
              >How may I help you today?</p>
            </div>
          </div>
        </div>
        <div class="chat-body">
          <div class="chat-inner" v-for="(single, item) in chat" :key="item" id="chat">
            <div class="typewriter" v-if="single.popup !=null">
              <span
                class="chat"
                style="color:black; font-size: 14px;font-weight:bold;border: 0px;"
                v-html="popup_msg"
              ></span>
            </div>

            <div
              v-if="single.is_leaf_note=='leaf'"
              style="float:right;margin-bottom:10px;margin-left:30px;"
              class="chat-row prompt"
            >
              <span
                class="chat"
                style="background:#273679;font-size:14px;word-break: break-word"
              >{{ single.bot_response }}</span>
            </div>
            <div v-if="single.flavor_text !=null">
              <span>{{single.flavor_text}}</span>
            </div>

            <div class="chat-row prompt-title" v-if="single.title!=null">
              <div class="chat">{{ single.title }}</div>
            </div>
            <template v-if="single.is_leaf_note==false">
              <div style="display:none"></div>

              <div
                class="chat-row prompt"
                @click="click_prompt"
                v-for="(prompt, index) in single.bot_response"
                :key="index"
              >
                <div
                  @click="show_popup"
                  style="cursor:pointer;"
                  :value="single.level"
                  class="chat"
                >{{ prompt }}</div>
              </div>
            </template>

            <template v-if="single.is_leaf_note==true">
              <!-- <div class="chat-body" style="height:100px"> -->
              <div class="chat-inner">
                <div
                  class="chat-row prompt"
                  style="margin-right: 10px;margin-left: -5px;"
                  v-for="(sub_response, index) in single.bot_response"
                  :key="index"
                >
                  <div style="width:69%;" v-for="(value,key) in sub_response" :key="key">
                    <div
                      @click="sub_leaf_node_call"
                      style="cursor:pointer;"
                      class="chat"
                      v-if="key==='Text'"
                    >{{value}}</div>
                  </div>
                </div>
                <div class="plyr__video-embed" id="player" v-if="show && demourlbind" style="ma">
                  <iframe :src="demourl[0]" allowfullscreen allowtransparency allow="autoplay"></iframe>
                </div>
                <div
                  class="plyr__video-embed"
                  id="player"
                  v-if="show && demourlbind"
                  style="ma;margin-top:10px "
                >
                  <iframe :src="demourl[1]" allowfullscreen allowtransparency allow="autoplay"></iframe>
                </div>
                <div
                  class="plyr__video-embed"
                  id="player"
                  v-if="show && reviewsurlbind"
                  style="ma;margin-top:10px "
                >
                  <iframe :src="reviewsurl" allowfullscreen allowtransparency allow="autoplay"></iframe>
                </div>
              </div>
              <!-- </div> -->
            </template>
          </div>
        </div>

        <div class="chat-footer">
          <div class="typing-indicator" style="display:none">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span class="powered-by">
            Powered by &nbsp;
            <img src="/img/Cense_powered_by.png" style="height:20px">
          </span>
        </div>
        <div class="chat-txt">
          <div class="input-group mb-0">
            <input
              type="text"
              class="form-control"
              v-model="to_send"
              @keyup.enter="send_message"
              @input="button_fill"
              placeholder="Type your message here ..."
            >
            <div class="input-group-append">
              <button class="btn" type="button" id="button-addon2" @click="send_message">
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
    </div>
  </div>
</template>

<script>
import axios from "axios";
import fingerprint from "@/portal/components/fingerprint";
import $ from "jquery";

export default {
  name: "closed-chatbot",
  data() {
    return {
      popup_msg:
        "You can type ‘Restart”  at </br>any  time to get back</br> to the Main Menu",
      refreshed_or_closed: false,
      qus_ans: "answers",
      to_send: "",
      cense_enquiry: false,
      show: false,
      chat: [],
      fingerprint: null,
      prompt_url: process.env.PROMPT_URL,
      clickable_url: process.env.CLICKABLE_URL,
      first_click: false,
      level: 0,
      stop: true,
      demourlbind: false,
      reviewsurlbind: false,
      reviewsurl: "https://www.youtube.com/embed/paAeW86eQZ4",
      demourl: [
        "https://www.youtube.com/embed/videoseries?KcrJm9UxW3s&index=13&list=PL_jXlih8dgkTE8CrPpiWcA9KxQeKHZAnt&t=0s",
        "https://www.youtube.com/embed/videoseries?qzS2qINI6IM&list=PL_jXlih8dgkRu5ddGXAGqZ4uLLkoJzCj8&index=2"
      ],
      chat_widget: {
        logo: "",
        title: ""
      }
    };
  },

  mounted: function() {
    this.show = false;
  },
  computed: {
    generate_time() {
      var d = new Date();
      var h, m, type;
      if (d.getHours() > 12) {
        h = d.getHours() % 12;
        type = " pm";
      } else if (d.getHours() < 12) {
        h = d.getHours();
        type = " am";
      } else if (d.getHours() == 12) {
        h = d.getHours();
        type = " pm";
      }
      m = d.getMinutes();
      return h + ":" + m + type;
    }
  },

  created() {
    this.refreshed_or_closed = true;
    this.chat_widget.logo = "/img/robomate_logo.png";
    axios
      .post(this.clickable_url, {
        username: "cense",
        token: "",
        chat: "/personal_details",
        source: "",
        user_id: "",
        company_id: this.$session.get("UserInformation").company_id,
        company_name: this.$session.get("UserInformation").company_name,
        data: "",
        role: "",
        access_token: "",
        refreshed_or_closed: this.refreshed_or_closed
      })
      .then(response => {
        this.refreshed_or_closed = false;
      });
    axios
      .post(this.prompt_url, {
        uid: "cense", //this.fingerprint
        company_id: this.$session.get("UserInformation").company_id,
        chat: ""
      })
      .then(response => {
        console.log(response.data);
        this.chat.push(response.data);
        this.first_click = true;
        this.level = response.data.level;
        console.log(this.level);
      })
      .catch(e => {});
  },
  methods: {
    beforeEnter: function(el) {
      el.style.opacity = 0;
    },
    enter: function(el, done) {
      var vm = this;
      Velocity(
        el,
        { opacity: 1 },
        {
          duration: this.fadeInDuration,
          complete: function() {
            done();
            if (!vm.stop) vm.show = false;
          }
        }
      );
    },
    leave: function(el, done) {
      var vm = this;
      Velocity(
        el,
        { opacity: 0 },
        {
          duration: this.fadeOutDuration,
          complete: function() {
            done();
            vm.show = true;
          }
        }
      );
    },
    show_popup() {
      this.show = false;
      this.stop = false;
    },
    sub_leaf_node_call() {
      var divclick = event.target.innerText;
      if (divclick == "Watch Demo Video") {
        this.demourlbind = true;
        this.reviewsurlbind = false;
      } else if (divclick == "User Reviews/Testimonials") {
        this.reviewsurlbind = true;
        this.demourlbind = false;
      }
      if (
        divclick == "Watch Demo Video" ||
        divclick == "User Reviews/Testimonials"
      ) {
        this.show = !this.show;
        setTimeout(() => {
          document.querySelector(".typing-indicator").style.display = "none";
        }, 500);
        document.querySelector(".typing-indicator").style.display = "block";
      } else if (divclick == "Buy Tutorial") {
        console.log(this.refreshed_or_closed);
        this.cense_enquiry = true;
        axios
          .post(this.clickable_url, {
            username: "cense",
            token: "",
            chat: "/personal_details",
            source: "",
            user_id: "",
            company_id: this.$session.get("UserInformation").company_id,
            company_name: this.$session.get("UserInformation").company_name,
            data: "",
            role: "",
            access_token: "",
            refreshed_or_closed: ""
          })
          .then(response => {
            var msg = {
              bot_response: response.data,
              flavor_text: null,
              is_leaf_note: false,
              level: 0,
              popup: null,
              title: null
            };
            this.chat.push(msg);
            setTimeout(() => {
              document.querySelector(".typing-indicator").style.display =
                "none";
            }, 500);
            document.querySelector(".typing-indicator").style.display = "block";
          });
      }
    },
    send_message() {
      if (this.to_send == "Restart" || this.to_send == "restart") {
        console.log(this.to_send);
        axios
          .post(this.prompt_url, {
            uid: "cense", //this.fingerprint
            company_id: this.$session.get("UserInformation").company_id,
            chat: ""
          })
          .then(response => {
            console.log(response.data);
            this.chat.push(response.data);
            this.first_click = true;
            this.level = response.data.level;
            console.log(this.level);
            this.update_scrollbar();
          });
        setTimeout(() => {
          document.querySelector(".typing-indicator").style.display = "none";
        }, 500);
        document.querySelector(".typing-indicator").style.display = "block";
      }
      if (this.cense_enquiry == true) {
        console.log(this.refreshed_or_closed);
        var send_msg = {
          bot_response: this.to_send,
          flavor_text: null,
          is_leaf_note: "leaf",
          level: 0,
          popup: null,
          title: null
        };
        this.chat.push(send_msg);
        axios
          .post(this.clickable_url, {
            username: "cense",
            token: "",
            chat: "/personal_details",
            source: "",
            user_id: "",
            company_id: this.$session.get("UserInformation").company_id,
            company_name: this.$session.get("UserInformation").company_name,
            data: "",
            role: "",
            access_token: "",
            refreshed_or_closed: ""
          })
          .then(response => {
            var msg = {
              bot_response: response.data,
              flavor_text: null,
              is_leaf_note: false,
              level: 0,
              popup: null,
              title: null
            };
            this.chat.push(msg);
            setTimeout(() => {
              document.querySelector(".typing-indicator").style.display =
                "none";
            }, 500);
            document.querySelector(".typing-indicator").style.display = "block";
            this.refreshed_or_closed = false;
            // console.log()
          });
      }
      document.querySelector(".typing-indicator").style.display = "block";
      if (this.to_send != "" && this.to_send != null) {
        axios
          .post(this.prompt_url, {
            uid: "cense",
            company_id: this.$session.get("UserInformation").company_id,
            chat: this.to_send
          })
          .then(response => {
            console.log(response.data);
          });
      }
      this.to_send = "";
    },
    click_prompt(type) {
      var divclickpopup = event.target.innerText;

      setTimeout(() => {
        document.querySelector(".typing-indicator").style.display = "none";
      }, 500);
      document.querySelector(".typing-indicator").style.display = "block";

      if (type != "collapsible") {
        axios
          .post(this.prompt_url, {
            uid: "cense",
            company_id: this.$session.get("UserInformation").company_id,
            chat: event.target.innerText,
            level: event.target.attributes.value.nodeValue
          })
          .then(response => {
            if (response.data.collapsible == true) {
              this.create_chat(response.data);
              this.update_scrollbar();
            } else {
              this.chat.push(response.data);
              this.level = response.data.level;
              this.update_scrollbar();
            }
          });
      } else if (type == "collapsible") {
        console.log("this is the level check 2");
        console.log(this.level);
        axios
          .post(this.prompt_url, {
            uid: "cense",
            company_id: this.$session.get("UserInformation").company_id,
            chat: ""
          })
          .then(response => {
            this.chat.push(response.data);
          });
      }
    },
    button_fill() {
      document.querySelector("svg").style.fill = "#273679";
      if (this.to_send == "") {
        document.querySelector("svg").style.fill = "#8a8a8a63";
      }
    },
    create_chat(message) {
      this.chat.push(message);
    },
    update_scrollbar(type) {
      setTimeout(() => {
        document.querySelector(".typing-indicator").style.display = "none";
      }, 1000);
      setTimeout(() => {
        document.querySelector(".chat-body").scrollTop =
          document.querySelector(".chat-body").scrollHeight -
          document.querySelector(".chat-body").lastChild.scrollHeight;
      }, 1000);
    }
  }
};
</script>

<style scoped>
svg :hover {
  fill: #273679;
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
.toast-message {
  margin-top: 1000px;
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
.toast-container {
  margin-left: 800px;
}
.typewriter span {
  color: #fff;
  font-family: monospace;
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: 0.15em solid orange; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: 0.15em; /* Adjust as needed */
  animation: typing 3.5s steps(30, end), blink-caret 0.5s step-end infinite;
}

/* The typing effect */
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: orange;
  }
}
</style>
