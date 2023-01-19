<template>
  <div :style="cssProps">
    <div
      class="modal fade dash-modal"
      id="intentmodal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="intentmodeltitle"
      aria-hidden="true"
      style="z-index: 10000"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt />
              </div>
              <h3>{{tlt('edit_intent_label')}}</h3>
            </div>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <img src="/img/close-icn.png" alt />
            </button>
            <form @submit="edit_submit">
              <div class="form-group">
                <label><h5>{{tlt('intent_name')}}</h5></label>
                <select class="form-control" v-model="intent">
                  <option value>{{tlt('select_intent_option')}}</option>
                  <option
                    v-for="(intent_, index) in intent_list"
                    :key="index"
                    :value="intent_"
                  >
                    {{ intent_ }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <h5>{{tlt('response_label')}}:</h5>
                <div class="ql-snow">
                  <div class="ql-editor p-0" style="min-height: 0px">
                    <!-- <span v-html="selected_intent_response"></span> -->
                    <div
                      v-for="(
                        new_response, index
                      ) in intent_response"
                      :key="index"
                    >
                      <li class=" mt-3">
                        <div class=""
                          style="
                            display: inline-block;
                          "
                          v-html="intent_response[index]"
                        ></div>
                        <!-- {{ selected_intent_response[index] }} -->
                      </li>
                    </div>
                  </div>
                </div>
              </div>
              <div class="btn-wrap text-right">
                <button type="button" class="btn btn-link" data-dismiss="modal">
                  {{tlt('cancel_btn')}}
                </button>
                <button type="submit" id="edit_save_btn" class="darkblue-btn">{{tlt('save_btn')}}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="dash-cont">
      <div class="container-fluid">
        <div class="card dash-card"> -->
    <div
      class="card-header d-block d-sm-flex flex-wrap justify-content-between"
    ></div>
    <div class="card-body">
      <div class="row">
        <div class="card-act col" style="margin-left: 2%; width: min-content">
          <div>
            {{tlt('bot_intent_text')}}
          </div>
          <button
            id="checkbot_response_train_model_btn"
            type="submit"
            class="darkblue-btn"
            style="width: 230px; margin-top: 40%"
            @click="train_intent_model"
            :disabled="intent_core_model_inprogress == true"
            :style="show_model_progress('style')"
            :title="show_model_progress('title')"
          >
            {{tlt('train_model_btn')}} 
            <i class="fa fa-spinner fa-spin" v-show="intent_core_model_inprogress"></i>
          </button>
        </div>
        <div class="col"></div>
        <div class="col">
          <div class="chat-master" id="app">
            <div
              class="chat-wrap chat-wrap1"
              :style="chat_bot_background_image"
              style="
                margin: 0 auto;
                z-index: 0;
                min-width: 450px;
              "
            >
              <div class="chat-head">
                <div class="media media2">
                  <img
                    :src="chat_widget.logo"
                    :style="chat_widget.style"
                    class="rounded"
                    alt="..."
                    style="max-width: 100%"
                  />
                  <!-- <div class="media-body" style="margin-left: 10px">
                    <p
                      style="
                        font-size: 16px;
                        font-weight: bold;
                        margin-top: 6px;
                      "
                    >
                      {{ chat_widget.title }}
                    </p>
                  </div> -->
                </div>
              </div>
              <div class="chat-body chat-body1">
                <div
                  class="chat-inner"
                  v-for="(single, item) in chat"
                  :key="item"
                  id="chat"
                >
                  <div class="typewriter" v-if="single.popup != null">
                    <span
                      class="chat"
                      style="
                        color: black;
                        font-size: 14px;
                        font-weight: bold;
                        border: 0px;
                      "
                      v-html="popup_msg"
                    ></span>
                  </div>
                  <div v-if="single.sending" class="chat-row sender">
                    <div class="chat">{{ single.sent }}</div>
                    <!-- <div class="chat-his" v-if="single.time != null">
                      <span class="time" style="color: #000">{{ single.time }}</span>
                      <span class="del-note delivered">Delivered</span>
                    </div> -->
                  </div>
                  <div v-if="single.receiving" class="chat-row receiver">
                    <div class="d-flex" style="position: relative;">
                      <div class="bot-img" :style="bot_img_icon"></div>
                      <div
                        v-if="Boolean(single.received) == true"
                        class="chat"
                      >
                        <strong>{{tlt('intent_label')}}</strong>: {{ single.received }}<br>
                        <strong>{{tlt('predict_confidence_label')}}</strong>: {{ single.confidence}}%
                        <div v-for="(entity, item) in single.Entities" :key="item" style="margin-bottom: 0.5rem">
                         <ul>
                           <li style="max-height: 1rem;font-weight: 100">
                             <strong>{{tlt('entity_label')}}</strong>: {{ entity.entity }}
                           </li>
                           <li style="max-height: 1rem;font-weight: 100"><strong>{{tlt('value_label')}}</strong>: {{ entity.value }}</li>
                         </ul>
                        </div>
                      </div>
                      <a
                        class="#"
                        data-toggle="modal"
                        data-target="#intentmodal"
                        @click="intent_fields(item)"
                        style="padding-left: 8px"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15.392"
                          height="15.392"
                          viewBox="0 0 15.392 15.392"
                        >
                          <path
                            id="square-edit-outline"
                            d="M4.71,3A1.7,1.7,0,0,0,3,4.71V16.682a1.71,1.71,0,0,0,1.71,1.71H16.682a1.71,1.71,0,0,0,1.71-1.71V10.7h-1.71v5.986H4.71V4.71H10.7V3H4.71m10.928.855a.591.591,0,0,0-.41.171L14.185,5.061,16.322,7.2l1.043-1.035a.578.578,0,0,0,0-.812L16.04,4.026a.571.571,0,0,0-.4-.171M13.578,5.668l-6.3,6.311v2.138H9.413l6.3-6.311Z"
                            transform="translate(-3 -3)"
                            fill="#9499ae"
                          />
                        </svg>
                      </a>
                    </div>
                    <!-- <div class="chat-his" v-if="single.time != null">
                    <span class="time" style="color: #000">{{ single.time }}</span>
                    </div> -->
                  </div>
                </div>
              </div>

              <div class="chat-footer">
                <div class="typing-indicator" style="display: none">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div class="chat-txt" style="width: 100%">
                <div class="input-group mb-0">
                  <input
                    type="text"
                    class="form-control"
                    v-model="to_send"
                    @keyup.enter="send_message"
                    @input="button_fill"
                    :placeholder="tlt('type_msg_here')"
                    id="text_chat_enter"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn"
                      type="button"
                      id="button-addon2"
                      @click="send_message"
                    >
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
              <div class="chat-cense-footer">
                <span 
                  v-show="this.chat_widget.is_powered_by_cense"
                  class="powered-by">
                  Powered by &nbsp;
                  <a href="https://cense.ai" target="_blank"
                    title="click here to visit"
                    class="open_cense_website"><img src="/img/cense_image.png" style="height: 20px"/></a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
import fingerprint from "@/portal/components/fingerprint";
import api_calls from "@/portal/api_calls";
import { generate_time, freeze_portal } from "@/portal/mixins";
import Swal from "sweetalert2";

export default {
  name: "chatscreen",
  mixins: [generate_time, freeze_portal],
  data() {
    return {
      open_modal: false,
      chat: [],
      intent: "",
      intent_value: "",
      to_send: "",
      intent_list: [],
      index: null,
      new_questions: 0,
      // chat_widget: {
      //   logo: "",
      //   title: "",
      //   style: "margin-top: 5px;height:30px;width:60px",
      // },
      chat_widget: {
        logo: "",
        title: "",
        style: "",
        bot_theme: "",
        button_theme: "",
        user_response_bg_color: "",
        button_alignment: "",
        bot_icon: "",
        bot_background_image: "",
        button_horizontal_spacing: "3",
        button_vertical_spacing: "5",
        header_background: "",
        is_powered_by_cense: true,
      },
      user_role: this.$session.get("UserInformation").role,
      companyid: this.$session.get("UserInformation").company_id,
      companyname: this.$session.get("UserInformation").company_name,
      intent_response: "",
      responses_map: {},
      want_status: true,
      disable_btn_expired:false,
      intent_core_model_inprogress: false,
    };
  },
  // mounted() {
  //   console.log("HELOOOOOOOO/*  */")
  //   // this.freeze_portal();
  //   // // console.log("companyid", this.companyid);
  //   // this.show = false;
  // },
  props: {
    isTextToBot: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    cssProps() {
      let botAttributes = {
        head_color: this.chat_widget.header_background,
      };
      if (this.companyid === "retailigence84926") {
        botAttributes.head_color = this.chat_widget.bot_theme;
      } else if (this.isexchange) {
        return {
          "--bot-head-color": "#fff",
          "--bot-sender-color": "#2b3184",
          "--bot-button-color": "#fdcf38",
          "--bot-link-color": "#2b3184",
          "--user-response-bg-color": "#273679",
          "--bot-button-background": "#1daae1",
          "--bot-buttons-alignment": "center",
          "--bot-buttons-vertical-spacing": "5%",
          "--bot-buttons-horizontal-spacing": "3%",
        };
      }
      return {
        "--bot-head-color": botAttributes.head_color,
        "--bot-sender-color": this.chat_widget.bot_theme,
        "--bot-button-color": this.chat_widget.bot_theme,
        "--bot-link-color": this.chat_widget.bot_theme,
        "--user-response-bg-color": this.chat_widget.user_response_bg_color,
        "--bot-button-background": this.chat_widget.button_theme,
        "--bot-buttons-alignment": this.chat_widget.button_alignment.value,
        "--bot-buttons-vertical-spacing": `${this.chat_widget.button_vertical_spacing}%`,
        "--bot-buttons-horizontal-spacing": `${this.chat_widget.button_horizontal_spacing}%`,
      };
    },
    bot_img_icon() {
      return {
        "background-image": `url(${this.chat_widget.bot_icon})`,
      };
    },
    chat_bot_background_image() {
      return {
        "background-image": `url(${this.chat_widget.bot_background_image})`,
      };
    },
    // cssProps() {
    //   if (this.companyid === "retailigence84926") {
    //     return {
    //       "--bot-head-color": "#990000d1",
    //       "--bot-sender-color": "#990000d1",
    //       "--bot-button-color": "#990000d1",
    //       "--bot-link-color": "#990000d1",
    //     };
    //   }
    //   return {
    //     "--bot-head-color": "#FFFFFF",
    //     "--bot-sender-color": "#273679",
    //     "--bot-button-color": "#273679",
    //     "--bot-link-color": "#273679",
    //   };
    // },
  },
  watch: {
    intent(newVal) {
      if (newVal !== "No_intent") {
        this.intent_response = this.responses_map[newVal];
      }
    },
  },
  created() {
    axios
      .post(
        api_calls.get_unanswered_url(),
        {
          company_id: this.companyid,
          company_name: this.companyname,
          isDropdown: "True",
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
      .then((response) => {
        // for (var i in response.data[0]) {
        //   this.intent_list.push(
        //     response.data[0][i].replace(this.companyid + "_", "")
        //   );
        // }
        for (var i in response.data.data[0]) {
          this.intent_list.push(
            response.data.data[0][i]
          );
        }
        axios
          .post(
            api_calls.load_question_response_url(),
            {
              role: this.user_role,
              company_name: this.companyname,
              email: this.$session.get("UserInformation").email,
              company_id: this.companyid,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              page_no: 1,
              per_page: this.intent_list.length,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((res) => {
            if(res.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE.MSG_CODE){
              let intentsList = res.data.data.show_intent_field.intent_intentlist;
              let intentResponses =
                res.data.data.show_intent_field.intent_responselist;
              for (let i = 0, n = intentResponses.length; i < n; i += 1) {
                this.responses_map[
                  intentsList[i].replace(`${this.companyid}_`, "")
                ] = intentResponses[i];
              }
            } else if(res.data.message.MSG_CODE == this.api_status_code.EMPTY_DATA.MSG_CODE){
                Swal({
                  title: response.data.message.MSG_CODE,
                  text: response.data.message.MSG,
                  showCancelButton: false,
                  showConfirmButton: false,
                  type: "error",
                  timer: 2500
                })
            } else {
                Swal({
                  title: response.data.message.MSG_CODE,
                  text: response.data.message.MSG,
                  showCancelButton: false,
                  showConfirmButton: false,
                  type: "error",
                  timer: 2500
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
      })
      .catch((e) => {
        if (
          (Boolean(e.response)) && (
          e.response.status === 410 ||
          e.response.status === 440 ||
          e.response.status === 409)
        ) {
          this.$root.$emit("Session_Expired", e.response.data);
        }
      });
    // if (!this.$session.has("ChatBotImageParameters")) {
      axios
      .post(
        api_calls.get_widget_settings(),
        {
          company_name: this.companyname,
          company_id: this.companyid,
          email: this.$session.get("UserInformation").email,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens,
          isShow: true,
        },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          },
        }
      )
      .then((response) => {
        if(this.api_status_code.DATA_AVAILABLE.MSG_CODE == response.data.message.MSG_CODE){

        this.chat_widget.title = response.data.data.Title;
        this.chat_widget.logo = response.data.data.ImageUrl;
        this.chat_widget.button_theme = response.data.data.ButtonTheme;
        this.chat_widget.bot_theme = response.data.data.BotTheme;
        this.chat_widget.user_response_bg_color = response.data.data.UserResponseBgColor === undefined ?
                                                  this.chat_widget.user_response_bg_color : response.data.data.UserResponseBgColor;
        this.chat_widget.button_alignment = response.data.data.BotStyling;
        this.chat_widget.bot_icon = response.data.data.BotImageUrl;
        this.chat_widget.button_vertical_spacing =
          response.data.data.ButtonStyling.vertical;
        this.chat_widget.button_horizontal_spacing =
          response.data.data.ButtonStyling.horizontal;
        this.chat_widget.bot_background_image = response.data.data.BgImageUrl;
        this.chat_widget.header_background = response.data.data.HeaderTheme;
        this.chat_widget.is_powered_by_cense = response.data.data.IsPoweredByCense === undefined ? 
                                                this.chat_widget.is_powered_by_cense : response.data.data.IsPoweredByCense;
        }
        if (this.chat_widget.button_alignment === undefined) {
          this.chat_widget.button_alignment = "flex-end";
        }
        if (this.chat_widget.bot_icon === undefined) {
          this.chat_widget.bot_icon = "/img/Bot_img.png";
        }
        this.$session.set("ChatBotImageParameters", this.chat_widget);
        let styling_value = response.data.data.HeaderStyling.value;
        let temp_string = "";
        if (styling_value === "left") {
          temp_string = "margin-left: 0;margin-right: auto;";
        } else if (styling_value === "right") {
          temp_string = "margin-left: auto;margin-right: 0;";
        } else if (styling_value === "center") {
          temp_string = "margin-left: auto;margin-right: auto;";
        } else {
          temp_string = "margin-left: auto;margin-right: auto;";
        }
        this.chat_widget.style =
          "margin-top: 5px;height:30px;width:auto;max-width:100% !important;" +
          temp_string;
      })
      .catch((e) => {
        if (e.response) {
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        } else {
          if (this.$session.get("UserInformation").company_name == "gogyb") {
            this.chat_widget.style =
              "margin-top: 5px;height:30px;width:60px;margin-left: auto;margin-right: auto;";
            this.chat_widget.logo = "/img/cense_image.png";
            this.chat_widget.bot_icon = "/img/Bot_img.png";
            this.chat_widget.button_vertical_spacing = "5";
            this.chat_widget.button_horizontal_spacing = "3";
            this.chat_widget.bot_background_image = "";
            this.chat_widget.header_background = "#ffffff";
            this.chat_widget.button_theme = "#1daae1";
            this.chat_widget.bot_theme = "#273679";
            this.chat_widget.user_response_bg_color = "#273679";
          } else if (
            this.$session.get("UserInformation").company_name == "MT Care"
          ) {
            this.chat_widget.logo = "/img/robomate_logo.png";
            this.chat_widget.style =
              "margin-top: 5px;height:50px;width:95px;margin-left: auto;margin-right: auto;";
            this.chat_widget.bot_icon = "/img/Bot_img.png";
            this.chat_widget.button_vertical_spacing = "5";
            this.chat_widget.button_horizontal_spacing = "3";
            this.chat_widget.bot_background_image = "";
            this.chat_widget.header_background = "#ffffff";
            this.chat_widget.button_theme = "#1daae1";
            this.chat_widget.bot_theme = "#273679";
            this.chat_widget.user_response_bg_color = "#273679";
          } else {
            this.chat_widget.logo = "/img/cense_image.png";
            this.chat_widget.style =
              "margin-top: 5px;height:30px;width:60px;margin-left: auto;margin-right: auto;";
            this.chat_widget.bot_icon = "/img/Bot_img.png";
            this.chat_widget.button_vertical_spacing = "5";
            this.chat_widget.button_horizontal_spacing = "3";
            this.chat_widget.bot_background_image = "";
            this.chat_widget.header_background = "#ffffff";
            this.chat_widget.button_theme = "#1daae1";
            this.chat_widget.bot_theme = "#273679";
            this.chat_widget.user_response_bg_color = "#273679";
          }
          this.$session.set("ChatBotImageParameters", this.chat_widget);
        }
      });
    // } else {
    //   this.chat_widget = this.$session.get("ChatBotImageParameters");
    //   this.chat_widget.style = "margin-top: 5px;height:30px;width:auto";
    // }
    this.check_intent_core_model_status();
  },
  mounted() {
    setTimeout(() => {
      this.freeze_portal();
    }, 1000);
      
  //   // // console.log("companyid", this.companyid);
     this.$root.$on("chatscreenDisabled", (data) =>{
      if(data===true){
        this.disable_btn_expired = true;
      }
    })
      this.show = false;
      this.$root.$on("send_model_status", data =>{
      if (data == true){
        this.check_intent_core_model_status();
      }
    })
  },
  methods: {
    check_intent_core_model_status(){
      var model_status = this.$session.get("ModelStatus");
      if (model_status == "No Failure"){
      this.intent_core_model_inprogress = false;
      }
      else if(Boolean(model_status.intent_model) === true
        || Boolean(model_status.dialogue_model) === true)
        {
        if(model_status.intent_model == "InProgress" || model_status.dialogue_model == "InProgress"){
          this.intent_core_model_inprogress = true;
        }
        else{
          this.intent_core_model_inprogress = false;
        }
      }
      else{
        this.intent_core_model_inprogress = false; 
      }
    },
    show_model_progress(index){
      if(this.intent_core_model_inprogress == true){
         if (index == 'style'){
            return "cursor: not-allowed";
          }
          else if(index == 'title'){
              return this.tlt('alter_training_progress_msg');
          }
      }
      else{
        return null;
      }
    },
    show_popup() {
      this.show = false;
      this.stop = false;
    },
    send_message() {
      this.chat.push({
        sending: true,
        sent: this.to_send,
        time: this.generate_time(),
      });
      document.querySelector(".typing-indicator").style.display = "block";
      if (this.to_send != "" && this.to_send != null) {
        axios
          .post(
            api_calls.chat_url(),
            {
              company_id: this.$session.get("UserInformation").company_id,
              company_name: this.$session.get("UserInformation").company_name,
              token: this.$session.get("UserInformation").tokens,
              license_key: this.$session.get("UserInformation").license_key,
              email: this.$session.get("UserInformation").email,
              question: this.to_send,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            if (response.data.message.MSG_CODE == this.api_status_code.EMPTY_DATA_MODELS.MSG_CODE) {
              this.update_scrollbar();
            } else if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR_MODELS.MSG_CODE) {
              this.update_scrollbar();
            } else if(response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE_MODELS.MSG_CODE){
              this.chat.push({
                receiving: true,
                time: this.generate_time(),
                // received: response.data.Msg.Intent.replace(
                //   this.companyid + "_",
                //   ""
                // ),
                received: response.data.data.Intent,
                Entities: response.data.data.Entities,
                confidence: response.data.data.Intent_value
              });
              // this.intent_value = response.data.Msg.Intent.replace(
              //   this.companyid + "_",
              //   ""
              // );  
              this.intent_value = response.data.data.Intent;
              this.update_scrollbar();
            }else {
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                type: "error",
                timer: 2500
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
          .post(api_calls.prompt_url(), {
            uid: "cense",
            companyid: this.$session.get("UserInformation").company_id,
            chat: event.target.innerText,
            level: event.target.attributes.value.nodeValue,
          })
          .then((response) => {
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
        axios
          .post(api_calls.prompt_url(), {
            uid: "cense",
            companyid: this.$session.get("UserInformation").company_id,
            chat: "",
          })
          .then((response) => {
            this.chat.push(response.data);
          });
      }
    },
    intent_fields(index) {
      this.index = index;
      this.intent = this.chat[index].received;
      if (this.chat[index].received == "No_intent") {
        this.intent = "";
      }
    },
    edit_submit() {
      event.preventDefault();
      if (this.intent == "" || this.intent_value == "") {
        toastr.error(this.tlt('enter_value_msg'));
      } else if (
        !this.$session.has("CompanyId") &&
        this.$session.get("UserInformation").role == "SuperAdmin"
      ) {
        toastr.warning(this.tlt('intent_page_select_company_msg'));
      } else {
        axios
          .post(
            api_calls.edit_intent_url(),
            {
              company_name: this.$session.get("UserInformation").company_name,
              company_id: this.$session.get("UserInformation").company_id,
              question: this.chat[this.index - 1].sent,
              // editintent: this.companyid + "_" + this.intent,
              // intentvalue: this.companyid + "_" + this.intent_value,
              editintent: this.intent,
              intentvalue: this.intent_value,
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
          .then((response) => {
            this.new_questions += 1;
            var chat_name = "ChatMessage" + this.companyname;
            if (response.data.message.MSG_CODE == this.api_status_code.INTENT_EDIT_SUCCESS_3000_MODELS.MSG_CODE) {
              toastr.success(this.tlt('values_updated_msg'));
              this.$session.set(chat_name, this.meta);
            } else {
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                type: "error",
                timer: 2500
              })
            }
            this.chat[this.index].received = this.intent;
            $("#intentmodal").modal("hide");
          })
          .catch((e) => {
            if (
              e.response.status === 410 ||
              e.response.status === 440 ||
              e.response.status === 409
            ) {
              this.$root.$emit("Session_Expired", e.response.data);
            }
            $("#intentmodal").modal("hide");
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
    },
    train_intent_model() {
      if(!this.disable_btn_expired){
      event.preventDefault();
      if (this.new_questions < 1) {
        toastr.error(this.tlt('edit_one_question_msg'));
      } else if (this.new_questions >= 1) {
        Swal({
          title: this.tlt('swal_alert_msg'),
          text: this.tlt('train_model_msg'),
          type: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: this.tlt('confirm_msg'),
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.value) {
            axios
              .post(
                api_calls.train_intent_model(),
                {
                  company_id: this.$session.get("UserInformation").company_id,
                  company_name: this.$session.get("UserInformation")
                    .company_name,
                  email: this.$session.get("UserInformation").email,
                  license_key: this.$session.get("UserInformation").license_key,
                  token: this.$session.get("UserInformation").tokens,
                  epochs: 100,
                  update_model: true,
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.$session.get("at")}`,
                  },
                }
              )
              .then((response) => {
                if (response.data.MSG_CODE === 4046) {
                  toastr.success(response.data.MSG);
                  this.want_status = true;
                  this.$root.$emit("want_model_status",this.want_status);
                  this.check_intent_core_model_status();
                } else if(response.data.MSG_CODE === 1034) {
                  toastr.error(response.data.MSG);
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
        });
      }
      }else{
        this.show_subscription_expired_swal();
      }
    },
  },
};
</script>
<style>
.bot-img {
  /* background-image: url(/img/Bot_img.png); */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 23px;
  height: 23px;
  border-radius: 100%;
}
</style>
<style scoped>
.chat-cense-footer {
  color: #999b9a;
  border-radius: 0 0 15px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  width: 100%;
  font-size: .75rem;
  line-height: 1.25rem;
  opacity: .9;
  text-decoration: none;
}
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

/*harsh*/
.chat-body1 {
  max-height: 300px;
  min-height: 70vh;
}

.chat-wrap1 {
  min-width: 320px;
  max-width: 320px;
}
/* .media2 {
  background: #fff;
} */

.receiver .chat {
  color: #000 !important;
  margin-left: 30px;
}
</style>
