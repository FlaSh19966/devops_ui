<template>
  <div class="chat-master" id="app">
    <div class="chat-wrap">
      <div class="chat-head">
        <div class="media">
          <img
            :src="chat_widget.logo"
            style="height: 25px;width: 64px;margin-top: 5px"
            class="rounded "
            alt="..."
          >
          <div class="media-body" style="margin-left:10px">
            <h5 class="mt-0" style="color:#00ff00">Online</h5>
            <p>If you have any questions, I'm here to help!</p>
          </div>
        </div>
      </div>
      <div class="chat-body">
        <div class="chat-inner"></div>
        <div class="chat-inner" v-for="(single, item) in chat" :key="item" id="chat">
          <div class="chat-row sender">
            <div class="chat">{{ single.sent }}</div>
            <div class="chat-his d-flex justify-content-between">
              <span class="time">{{ single.time }}</span>
              <span class="del-note delivered">Delivered</span>
            </div>
          </div>
          <div class="chat-row receiver">
            <div class="chat">{{ single.received }}</div>
          </div>
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
          <img src="/static/images/Cense_powered_by.png" style="height:20px">
        </span>
      </div>
      <div class="chat-txt" style="width:100%">
        <div class="input-group mb-0">
          <input
            type="text"
            class="form-control"
            v-model="message_ToSend"
            @keyup.enter="insertMessage"
            @input="button_fill"
            placeholder="Type your message here ..."
          >
          <div class="input-group-append">
            <button class="btn" type="button" id="button-addon2" @click="insertMessage">
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
</template>

<script>
import swal from "sweetalert2";
import axios from "axios";
export default {
  name: "open-chatbot",
  data() {
    return {
      d: null,
      h: null,
      m: null,
      i: 0,
      chat: [],
      chat_widget: {
        logo: "/img/Cense_powered_by.png",
        title: ""
      },
      messageToSend: "",
      user_role: this.$session.get("UserInformation").role,
      companyid: this.$session.get("UserInformation").company_id,
      companyname: this.$session.get("UserInformation").company_name,
      bot_response_token_value: this.$session.get("BotToken"),
      telephone_number: "",
      access_token: null,
      expires_in: null,
      refresh_token: null,
      phone_number_validity: /[0-9]{10,11}$/,
      refreshed_or_closed: false,
      bot_response_token: process.env.BOT_RESPONSE_TOKEN,
      chatbot_service_index: process.env.CHATBOT_SERVICE_INDEX,
      telephone_call_url: process.env.CALL_SUPPORT_URL
    };
  },
  computed: {
    validNumber() {
      if (this.phone_number_validity.test(this.telephone_number)) {
        return true;
      } else {
        return false;
      }
    },
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
    var chat_name = "BotResponseMessages";
    if (this.user_role == "SuperAdmin") {
      if (this.$session.has("CompanyId")) {
        this.companyid = this.$session.get("CompanyId");
        this.companyname = this.$session.get("CompanyName");
      } else {
        this.companyid = this.$session.get("UserInformation").company_id;
        this.companyname = this.$session.get("UserInformation").company_name;
      }
    }
    if (this.$session.has(chat_name + this.companyname)) {
      var chat = this.$session.get(chat_name + this.companyname);
      for (var i in chat) {
        this.chat.push(chat[i]);
      }
    }
    if (
      !this.$session.has("CompanyId") &&
      this.$session.get("UserInformation").role == "SuperAdmin"
    ) {
      toastr.warning("Please select a company name from the dropdown");
    } else {
      if (!this.$session.has("BotToken")) {
        axios
          .post(this.bot_response_token, {
            license_key: this.$session.get("UserInformation").license_key,
            username: this.$session.get("UserInformation").email
          })
          .then(response => {
            this.bot_response_token_value = response.data.data;
            this.$session.set("BotToken", this.bot_response_token_value);
          });
      } else if (this.$session.has("BotToken")) {
        this.bot_response_token_value = this.$session.get("BotToken");
      }
      axios
        .get(
          "https://identityserverstaging.codearray.tech/Token/GetToken?clientid=GreenYourBillsTest&clientsecret=secret&username=lawuser&password=Abcd@6789"
        )
        .then(response => {
          var access_token = response.data.Json;
          this.access_token = access_token.access_token;
          this.expires_in = access_token.expires_in;
          this.refresh_token = access_token.refresh_token;
          this.call_token_refresh();
        });
    }
  },
  methods: {
    call_token_refresh() {
      setInterval(() => {
        axios
          .get(
            "https://identityserverstaging.codearray.tech/Token/GetToken?clientid=GreenYourBillsTest&clientsecret=secret&username=lawuser&password=Abcd@6789"
          )
          .then(response => {
            var access_token = response.data.Json;
            this.expires_in = access_token.expires_in;
            this.access_token = access_token.access_token;
          });
      }, (this.expires_in - 10) * 1000);
    },
    phone_call() {
      if (this.validNumber) {
        this.call_api();
      } else {
        var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
      }
    },
    call_api() {
      if (this.telephone_call == "") {
        swal({
          type: "error",
          text: "Please enter a valid number here",
          timer:2000,
        });
      } else {
        axios
          .post(this.telephone_call_url, {
            company_id: this.$session.get("UserInformation").company_id,
            company_name: this.$session.get("UserInformation").company_name,
            username: this.$session.get("UserInformation").email,
            token: this.bot_response_token_value,
            phonenumber: this.telephone_number
          })
          .then(response => {
            if (response.data.message == "Call incoming!") {
              swal({
                type: "success",
                text: "Our support team will connect with you soon",
                timer:2000,
              });
              this.telephone_number = "";
            }
          });
      }
    },
    insertMessage() {
      if (this.messageToSend == "") {
        return false;
      } else if (
        !this.$session.has("CompanyId") &&
        this.$session.get("UserInformation").role == "SuperAdmin"
      ) {
        toastr.warning("Please select a company name from the dropdown");
      } else {
        this.chat.push({ msg: this.messageToSend, response: "" });
        this.messageToSend = "";
        axios
          .post(this.chatbot_service_index, {
            license_key: this.$session.get("UserInformation").license_key,
            token: this.bot_response_token_value,
            chat: this.chat[this.chat.length - 1].msg,
            source: "Web",
            CompanyId: "Co00023",
            username: this.$session.get("UserInformation").email,
            company_id: this.companyid,
            company_name: this.companyname,
            role: "Admin",
            access_token: this.access_token,
            refreshed_or_closed: this.refreshed_or_closed
          })
          .then(response => {
            this.chat[this.chat.length - 1].response = response.data[0];
            var chat_name = "BotResponseMessages" + this.companyname;
            this.$session.set(chat_name, this.chat);
            this.update_scrollbar();
          });
      }
    },
    update_scrollbar() {
      setTimeout(() => {
        document.querySelector(".typing-indicator").style.display = "none";
      }, 1000);
      setTimeout(() => {
        document.querySelector(".chat-body").scrollTop =
          document.querySelector(".chat-body").scrollHeight -
          document.querySelector(".chat-body").lastChild.scrollHeight;
      }, 1000);
    },
    button_fill() {
      document.querySelector("svg").style.fill = "#273679";
      if (this.to_send == "") {
        document.querySelector("svg").style.fill = "#8a8a8a63";
      }
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
