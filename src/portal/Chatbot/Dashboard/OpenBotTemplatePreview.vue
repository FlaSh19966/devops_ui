<template>
  <div>
    <div id="popover_content" class="d-none">
      <input
        class="form-control"
        style="height: 30px;padding-left:10px;padding-right:10px"
        type="text"
        v-model="phone_number"
        @keydown.enter="call_api"
      />
    </div>
    <div
      class="modal fade dash-modal"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
      id="add_schedule"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-body">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt />
              </div>
              <h3>Add Schedule</h3>
            </div>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <img src="/img/close-icn.png" alt />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="dash-cont">
      <div class="container-fluid">
        <div class="card dash-card">
          <div class="card-header d-block d-sm-flex flex-wrap justify-content-between"></div>
          <div
            :class="{'card-body d-block d-flex':$route.name!='Direct Response Bot','card-body':$route.name=='Direct Response Bot'}"
          >
            <div
              style="width:25%"
              v-if="$route.name!='Direct Response Bot'"
            >
            <!-- Here administrator can check how the bot responds to the end users questions. -->
            </div>
            <!--Add style="margin:0 auto" in below div to shift the chat bot a little right-->
            <div class="chat-master" id="app">
              <div
                class="chat-wrap"
                style="margin-right:auto;margin-left:auto;z-index:0;min-width:450px;position:sticky"
                v-bind:class="{'chat-wrap2': isexchange,'chat-wrap1':!isexchange}"
              >
                <div class="chat-head">
                  <div class="media" v-bind:class="{'media1': isexchange,'media2':!isexchange}">
                    <img
                      src="https://storage.cense.ai/gogyb/cense_image.png"
                      style="margin-top: 5px; height: 30px; width: auto;"
                      class="rounded "
                      alt="..."
                    />
                    <div class="media-body" style="margin-left:10px">
                      <p
                        style="font-size: 15px;font-weight: bold;margin-top: 6px;text-align:center"
                      >How may I help you?</p>
                      <!-- <svg
                    data-toggle="popover"
                    data-placement="bottom"
                    data-content
                    title="Enter your phone number and hit Enter"
                    xmlns="http://www.w3.org/2000/svg"
                    style="float: right;margin-top: -10%;"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path
                      fill="#283879"
                      d="M19.23 15.26l-2.54-.29c-.61-.07-1.21.14-1.64.57l-1.84 1.84c-2.83-1.44-5.15-3.75-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52c-.12-1.01-.97-1.77-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z"
                    ></path>
                      </svg>-->
                    </div>
                  </div>
                </div>
                <div style="position:absolute;z-index:1000;top:80%;left:93%" class="bounce">
                  <img src="/img/down-arrow.png" v-if="to_scroll" />
                </div>
                <div
                  class="chat-body"
                  @scroll="scroll_down"
                  v-bind:class="{'chat-body2': isexchange,'chat-body1':!isexchange}"
                  >
                  <div
                    class="chat-inner"
                    v-for="(single, item) in chat"
                    :key="item"
                  >
                    <div class="typewriter" v-if="single.popup !=null">
                      <span
                        class="chat"
                        style="color:black; font-size: 14px;font-weight:bold;border: 0px;"
                        v-html="popup_msg"
                      ></span>
                    </div>
                    <div
                      class="chat-row receiver"
                      v-if="single.url!=undefined && single.receiving==false"
                    >
                      <span class="chat" style="width: max-content">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#273679"
                            d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"
                          />
                          <path d="M0 0h24v24H0z" fill="none" />
                        </svg>
                        <a
                          href="#"
                          target="_blank"
                        >
                          <span>
                            {{single.file_name}}
                            &nbsp;
                          </span>
                          <i class="fa fa-download" aria-hidden="true"></i>
                        </a>
                      </span>
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
                    <!-- <template v-if="single.is_table==true">
                  <div class="chat-row prompt">
                    <span style="margin-left:2%">
                      {{single.table_title}}
                      <br />
                    </span>
                    <div class="chat" style="width:96%;margin-left: 2%;margin-top:2%">
                      <div v-if="isexchange">
                        <div
                          class="row"
                          v-for="(currency, index) in single.table_list"
                          :key="index"
                          style="margin-bottom:10px;margin-left:0;width:100%;box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2);background-color: #fbfbfb;border-radius:4px;height:30px;align-items:center;color: 3d3d3d;"
                        >
                          <div class="column" style="align:center;width: 5%;padding-left:1.5%">
                            <img
                              style="align:center;opacity:4.5;height:20px;color:#2b3184;vertical-align:top;"
                              :src="'../../../img/ForeignExchange/'+currency.currency_title+'.png'"
                            />
                          </div>
                          <div
                            class="column"
                            v-show="currency.type=='TR'"
                            style="padding-left:5%;width: 65%;color:black"
                          >{{currency.currency_title}}</div>
                          <div
                            class="column"
                            v-show="currency.type=='TR'"
                            style="width:20%;text-align:right;color:black"
                          >{{currency.currency_value}}</div>
                        </div>
                      </div>

                      <table v-if="!isexchange">
                        <tr
                          v-for="(currency, index) in single.table_list"
                          :key="index"
                          style="line-height: 9.5px;"
                        >
                          <th
                            v-show="currency.type=='THEAD'"
                            style="text-align: left;width: auto;"
                          >{{currency.country_name}}</th>
                          <th
                            v-show="currency.type=='THEAD'"
                            style="text-align: left"
                          >{{currency.currency_name}}</th>
                          <td
                            v-show="currency.type=='TR'"
                            style="font-weight: bolder;"
                          >{{currency.currency_title}}</td>
                          <td
                            v-show="currency.type=='TR'"
                            style="font-weight: bolder;"
                          >{{currency.currency_value}}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                    </template>-->
                    <template v-if="single.is_leaf_note==false">
                      <div
                        class="chat-row prompt"
                        v-for="(prompt, index) in single.bot_response"
                        :key="index"
                      >
                        <div
                          style="cursor:pointer;"
                          :value="single.level"
                          class="chat"
                        >{{ prompt }}</div>
                      </div>
                    </template>
                    <template v-if="single.is_leaf_note==true">
                      <div class="chat-inner">
                        <div
                          class="chat-row prompt"
                          style="margin-right: 10px;margin-left: -5px;"
                          v-for="(sub_response, index) in single.bot_response"
                          :key="index"
                        >
                          <div style="width:69%;" v-for="(value,key) in sub_response" :key="key">
                            <div
                              style="cursor:pointer;"
                              class="chat"
                              v-if="key==='Text'"
                            >{{value}}</div>
                          </div>
                        </div>
                        <div
                          class="plyr__video-embed"
                          id="player"
                          v-if="show && demourlbind"
                          style="ma"
                        >
                          <iframe
                            :src="demourl[0]"
                            allowfullscreen
                            allowtransparency
                            allow="autoplay"
                          ></iframe>
                        </div>
                        <div
                          class="plyr__video-embed"
                          id="player"
                          v-if="show && demourlbind"
                          style="ma;margin-top:10px "
                        >
                          <iframe
                            :src="demourl[1]"
                            allowfullscreen
                            allowtransparency
                            allow="autoplay"
                          ></iframe>
                        </div>
                        <div
                          class="plyr__video-embed"
                          id="player"
                          v-if="show && reviewsurlbind"
                          style="ma;margin-top:10px "
                        >
                          <iframe
                            :src="reviewsurl"
                            allowfullscreen
                            allowtransparency
                            allow="autoplay"
                          ></iframe>
                        </div>
                      </div>
                      <!-- </div> -->
                    </template>
                    <div
                      class="buy-products"
                      style="display:flex;overflow:auto hidden"
                      @mousewheel="scroll_div"
                      v-if="single.isproduct"
                    >
                      <div
                        class="image-container"
                        v-for="(product, index) in single.elements.products"
                        :key="index"
                      >
                        <img :src="product['Product Image Url']" class="image-box" />
                        <p>{{product['Product Name']}}</p>
                        <p>{{product['UnitPrice']}}</p>
                        <p
                          class="buy-now"
                        >Buy Now</p>
                      </div>
                    </div>
                    <template v-if="single.conversation_only">
                      <div v-if="single.sending" class="chat-row sender">
                        <div class="chat">{{ single.sent }}</div>
                        <div class="chat-his" v-if="single.time!=null">
                          <span class="time" style="color:#000">{{ single.time }}</span>
                          <span class="del-note delivered">Delivered</span>
                        </div>
                      </div>
                      <div v-if="single.receiving" class="chat-row receiver">
                        <div
                          v-if="single.received!=''&&single.received!=undefined"
                          class="chat"
                          v-html="single.received"
                          :id="'chat'+item"
                        >{{single.received}}</div>
                        <br v-if="single.image!=null" />
                        <img
                          v-if="single.image!=null"
                          :src="single.image"
                          style="margin-top: 4%;height: 40vh;width: 40vh"
                        />
                        <div v-if="single.custom_buttons" class="d-block d-flex flex-wrap">
                          <button
                            class="btn custom-buttons"
                            v-for="(button, index) in single.buttons_list"
                            :key="index"
                            :id="'chat'+item"
                          >{{button.title}}</button>
                        </div>
                        <!-- Apply logic here -->
                        <div v-if="single.is_multiselect">
                          <multiselect
                            :close-on-select="false"
                            :taggable="true"
                            :multiple="true"
                            :options="single.multiselect_values"
                            :placeholder="single.placeholder"
                            track-by="value"
                            :group-select="true"
                            label="title"
                            v-model="selected_indication"
                            @input="adddropdownvalue"
                          ></multiselect>
                        </div>
                        <!-- <div v-if="single.is_table">
                      <div class="row" style="margin-bottom:10px;margin-left:0;width:100%;box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2);background-color: #fbfbfb;border-radius:4px;height:30px;align-items:center;color: 3d3d3d;">
                        <div class="column" style="align:center;opacity:4.5;height:20px;color:#2b3184;vertical-align:top;" v-for="(head, index1) in single.col_list" :key="index1">
                          {{head}}
                        </div>
                      </div>
                      <div class="row" style="margin-bottom:10px;margin-left:0;width:100%;box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2);background-color: #fbfbfb;border-radius:4px;height:30px;align-items:center;color: 3d3d3d;" v-for="(value, index2) in single.table_value" :key="index2">
                        <div class="column" style="align:center;opacity:4.5;height:20px;color:#2b3184;vertical-align:top;" v-for="(head, index3) in single.col_list" :key="index3">
                          {{value[head]}}
                        </div>
                      </div>
                        </div>-->
                        <table
                          v-if="single.is_table"
                          style="margin-left: 2%;margin-top:2%;font-size: 14px;font-weight: 300;background-color:#fff"
                          class="table"
                        >
                          <tr>
                            <th v-for="(head, index1) in single.col_list" :key="index1">{{head}}</th>
                          </tr>
                          <tr v-for="(value, index2) in single.table_value" :key="index2">
                            <td
                              v-for="(head, index3) in single.col_list"
                              :key="index3"
                            >{{value[head]}}</td>
                          </tr>
                        </table>
                        <!-- <div v-if="single.is_table">
                      <div  class="row">
                          <div  class="column"
                                v-for="(value,index2)in single.row_list"
                                :key="index2">
                                {{value}}
                          </div>
                      </div>
                      <div  class="row"
                            v-for="(key, index) in single.row_list"
                            :key="index">
                            <div  class="column"
                                  v-for="(value,index2)in key"
                                  :key="index2">
                                  {{value}}
                            </div>

                      </div>
                        </div>-->
                        <div
                          class="plyr__video-embed"
                          id="player"
                          v-for="(video, index) in single.videos"
                          :key="index"
                          style="ma"
                        >
                          <iframe :src="video" allowfullscreen allowtransparency allow="autoplay"></iframe>
                        </div>
                        <div class="chat-his" v-if="single.time!=null">
                          <span class="time">{{ single.time }}</span>
                          <!-- <span class="del-note delivered" v-show="single.time!=undefined">Delivered</span> -->
                        </div>
                      </div>
                    </template>
                  </div>
                </div>

                <div
                  v-if="isexchange"
                  class="row"
                  style="margin-left:auto;margin-right:auto;width:100%"
                     >
                    <!-- <button @click="ForeignExchangeConversion" id="XYZ" class="FE_button">
                    <img
                    src="../../../img/ForeignExchange/ui-12.png"
                    style="height:14px"
                    alt="Warning!"
                    />
                    Exchange Rate
                    </button>-->
                    <!-- <button @click="FXPaymentMode" class="FE_button">
                    <img
                    src="../../../img/ForeignExchange/ui-11.png"
                    style="height:14px"
                    alt="Warning!"
                    />
                    Payment
                    </button>-->
                    <!-- <button @click="FXTrackingParcel" class="FE_button">
                            <img
                            src="../../../img/ForeignExchange/ui-13.png"
                            style="height:14px"
                            alt="Warning!"
                            />
                            Track My Parcel
                    </button>-->
                </div>

                <div class="chat-footer">
                  <div class="typing-indicator" style="display:none">
                    <p
                      style="font-size:13px;font-weight:300"
                      v-show="is_typing && live_chat_on"
                    >Support Agent is typing</p>
                    <p
                      style="font-size:13px;font-weight:300;margin-left: 5%;"
                      v-show="!is_typing"
                    >typing</p>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span class="powered-by">
                    Powered by &nbsp;
                    <img src="/img/cense_image.png" style="height:20px" />
                  </span>
                </div>
                <div class="chat-txt">
                  <div class="input-group mb-0">
                    <input
                      :id="isexchange?'response_bot_text':''"
                      type="text"
                      class="form-control"
                      v-model="to_send"
                      @keyup.enter="send_message"
                      @input="button_fill"
                      :disabled="refreshed_or_closed"
                      placeholder="Type your message here ..."
                    />
                    <!-- <div class="input-group-append">
                          <button
                            class="btn voice-button"
                            type="button"
                            :disabled="!live_chat_on"
                            @click="start_video_call"
                          >
                            <i class="fas fa-video" style="margin-right:5px"></i>
                          </button>
                    </div>-->
                    <div class="input-group-append">
                      <button
                        class="btn voice-button"
                        type="button"
                        :disabled="refreshed_or_closed"
                      >
                        <i class="fa fa-microphone" id="microphone"></i>
                      </button>
                    </div>
                    <div class="input-group-append">
                      <button
                        class="btn"
                        type="button"
                        :id="{'button_addon2':isexchange}"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          id="send_button"
                          style="fill:#8a8a8a63"
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
</template>

<script>
import axios from "axios";
import fingerprint from "@/portal/components/fingerprint";
import { bus } from "@/portal/main";
import api_calls from "@/portal/api_calls";
import { Socket } from "phoenix-socket";
import { setTimeout, setInterval } from "timers";
import Recorder from "@/portal/components/recorder";
import Multiselect from "vue-multiselect";
import debounce from "vue-debounce/src/debounce";
import country_code from "../Dashboard/country_code_data.json";

export default {
    components: {
        Multiselect
    },
    data() {
    return {
      companyid: this.$session.get("UserInformation").company_id,
      companyname: this.$session.get("UserInformation").company_name,
      popup_msg:
        "You can type ‘Restart”  at </br>any  time to get back</br> to the Main Menu",
      refreshed_or_closed: true,
      qus_ans: "answers",
      to_send: "",
      cense_enquiry: false,
      is_typing: false,
      user_name: "",
      show: false,
      chat: [],
      fingerprint: null,
      bot_response_token_value: this.$session.get("ResponseBotToken")
        ? this.$session.get("ResponseBotToken")
        : "",
      first_click: false,
      level: 0,
      recognition: null,
      json_data: {
        create_appointment:
          '{"User": {"Physician": {"ID": "DT000000000000000237"},"UserName":"ac","ID":"US000000000000000138","Account": {"ID": "CO00023"},"Token": "Z1rSGGm0XpMWjt3giAErPPWZ84TQN9FsFMBLsU+/LAu6yualMg6EP2bsrwZjLPwm3j4DpPcGc5LcIp3NjgfUsA==","Specialty": {"ID": "PG000000000000000141", "Name": "AC", "Code": "AC"},"Domain": "gogreenbills.com"},"Appointment": {"Date": "08/30/2018", "IsJSONNote": 0, "Patient": {"CaseID": ""}}}',
        visits_finalized:
          '{"User": {"Physician": {"ID": "DT000000000000011886"},"UserName": "ch","ID": "US000000000000000143","Account":{"ID":"CO00023"},"Token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiYXZkaHV0IiwiZXhwIjoxNTI5NDgyNjYzfQ.v1c0HbuWuZXXpJfDrXVc1HPVuffbnGcLqkpg0zm6AoQ","Specialty": {"ID": "PG000000000000000142","Code": "ch"},"Domain": "greenyourbills.com"},"SearchParameters": {"Status": "","OrderBy": "","FromDate": "01/01/2018","Count": "10","SearchText": "","TypeOfVisit": "ALL","SortOrder": "appointment","StartIndex": "1","EndIndex": "10","ToDate": "08/06/2018"}}',
        appointments_count:
          '{"User": {"Physician": {"ID": "DT000000000000011886"},"UserName": "ch","ID": "US000000000000000143","Account":{"ID":"CO00023"},"Token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiYXZkaHV0IiwiZXhwIjoxNTI5NDgyNjYzfQ.v1c0HbuWuZXXpJfDrXVc1HPVuffbnGcLqkpg0zm6AoQ","Specialty": {"ID": "PG000000000000000142","Code": "ch"},"Domain": "greenyourbills.com"},"SearchParameters": {"Status": "","OrderBy": "","FromDate": "01/01/2018","Count": "10","SearchText": "","TypeOfVisit": "ALL","SortOrder": "appointment","StartIndex": "1","EndIndex": "10","ToDate": "08/06/2018"}}',
        create_ticket:
          '{"AccountName":null,"CallbackPhone":"","CompanyID":"CO00023","Description":"De","DomainName":null,"EmailCC":"abhay.w@codearray.tech","EmailDefault":"manish.y@codearray.tech","Priority":"3","PriorityID":0,"RaisedBy":"lawuser","Status":0,"StatusCode":null,"StatusText":null,"SType":"WP","Subject":"De","SubType":"SAMD-P","TicketID":0,"TicketNumber":null,"Type":0,"TypeText":"Website Problem","listFiles1":["chq1.pdf"]}',
        get_report: '{"companyId": "CO00023"}'
      },
      phone_number: "",
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
        title: "",
        style: ""
      },
      selected_date: "",
      selected_time: "",
      reason_of_visit: "",
      patient_name: "",
      visitor_number: "",
      full_time_slots: [],
      time_slots: [],
      TODAY_DATE: "",
      channel: null,
      chat_socket: null,
      voice_socket: null,
      live_chat_on: false,
      live_chat_token: null,
      chat_group_name: null,
      to_scroll: false,
      form_payload: null,
      refresh_time: 0,
      phone_number_validity: /[0-9]{10,11}$/,
      empty_string_validity: /^$/,
      //harsh
      isexchange: false,
      currencyexchange_list: null,
      selected_indication: [],
      res: {},
      isclosedboton: false,
      isformon: false,
      form_name: null,
      lastclosedbotinputnode: null,
      closed_form_reply_data: null,
      selectednodeid:null,
      bot_name: null,
      bot_type: null,
      iffirsttime: true,
      isemail: false,
      is_phone_number: false,
      is_text_area :false,
      conversation_id : "",
      structure : null,
    };
  },
  mounted () {
       if(this.$route.params.botdata==undefined){
        this.$router.push({
          name: 'Template',
        });
      } else {
      this.structure=this.$route.params.botdata.structure;
      }
      this.insert_bot_data();
    //   console.log(this.structure);

    //   this.chat.push({
    //           receiving: true,
    //           received: "Is there anything else I can help you with?",
    //           conversation_only: true,
    //           time: this.generate_time()
    //         });
  },
  methods : {
    insert_bot_data(){
        setTimeout(() => {
         for(let i = 0; i < this.structure.length; i+= 1 ){
             setTimeout(() => {

          if(this.structure[i].event == "bot"){
            //   setTimeout(() => {
            //     document.querySelector(".typing-indicator").style.display = "block";
            //   }, 1000);

            // document.querySelector(".typing-indicator").style.display = "block";
            // setTimeout(() => {
            this.chat.push({
              receiving: true,
              received: this.structure[i].text,
              conversation_only: true,
              time: this.generate_time()
            });
            // document.querySelector(".typing-indicator").style.display = "none";
            // }, 1200);
          }
          if(this.structure[i].event == "user"){
            // document.querySelector(".typing-indicator").style.display = "block";
            // setTimeout(() => {
            this.chat.push({
                sent: this.structure[i].text,
                sending: true,
                time: this.generate_time(),
                conversation_only: true,
                delivered: true,
                dropdown: ""
            });
            // document.querySelector(".typing-indicator").style.display = "none";
            // }, 3000);
          }
                $(".chat-body").animate(
            {
              scrollTop: 0.75 * $(".chat-body").prop("scrollHeight")
            },
            1500
          );

             }, i* 1400);
        }

      }, 2000);
    },
    generate_time() {
      let d = new Date();
      let h, m, type;
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
      if (m < 10) {
        m = 0 + String(m);
      }
      return h + ":" + m + type;
        },    scroll_down() {
      if (
        document.querySelector(".chat-body").scrollHeight -
          document.querySelector(".chat-body").scrollTop -
          $(".chat-his")
            .last()
            .height() <=
        document.querySelector(".chat-body").clientHeight
      ) {
        this.to_scroll = false;
      } else {
        this.to_scroll = true;
      }
    },
    getdata(){
      if(!this.isformon){
        var queryString = $("#chat"+(this.lastclosedbotinputnode-1)+" :input").serializeArray();
        this.to_send='';
        for(let i=0;i<queryString.length;i++){
          if(i==0){
            this.to_send=queryString[i].value;
          } else {
            this.to_send=this.to_send + "," + queryString[i].value;
          }
        }
      }
      this.button_fill();
    },
    button_fill() {
      if (this.isexchange) {
        if (this.to_send == "") {
          document.querySelector("#send_button").style.fill = "#8a8a8a63";
        } else if (this.to_send != "") {
          if (this.live_chat_on) {
            this.channel.push("started_typing");
            this.stop_typing(this);
          }
          document.querySelector("#send_button").style.fill = "#fdcf38";
        }
      } else if (!this.isexchange) {
        if (this.to_send == "") {
          document.querySelector("#send_button").style.fill = "#8a8a8a63";
        } else if (this.to_send != "") {
          if (this.live_chat_on) {
            this.channel.push("started_typing");
            this.stop_typing(this);
          }
          document.querySelector("#send_button").style.fill = "#273679";
        }
      }
    },
  }
}
</script>

<style scoped>
.table td,
.table th {
  padding: 0.5rem !important;
}
.stop-chat {
  width: 100%;
}
.chat-footer > a {
  color: #283879 !important;
}
.chat-his > .time {
  color: #000;
}
.buy-now {
  font-weight: 800;
  color: #283879;
  font-size: 12px;
  cursor: pointer;
  margin-top: -5%;
}
.image-box {
  height: 90px;
  width: 100px;
  margin-top: 6%;
}
.buy-products {
  height: 180px;
}
.image-container {
  background: #fff;
  border: #fff 1px solid;
  border-radius: 5px 5px 5px 5px;
  margin-left: 5%;
  height: 180px;
}
.image-container > p {
  font-size: 10px;
  text-align: center;
}
.chat-row.sender > .chat,
.chat-row.receiver > .chat {
  font-weight: 450;
}
.chat-body {
  overflow-y: auto;
}
.chat-body .chat-row.receiver p,
.chat-body .chat-row.receiver a {
  width: 50%;
}
.chat-row.receiver > .chat {
  background-color: #fff;
  color: #000;
}
button.custom-buttons {
  background: #1daae1;
  min-width: 101px;
  color: white;
  font-size: 13px;
  border-radius: 50px;
  margin-top: 5%;
  margin-left: auto;
  margin-right: auto;
}
div::-webkit-scrollbar {
  max-height: 20px;
  width: 6px;
  height: 2px;
  border-radius: 10px;
}
.bounce {
  animation: bounce 4s infinite;
}
.fa.fa-microphone {
  color: #8a8a8a63;
  font-size: 24px;
}
.fas.fa-video {
  color: #8a8a8a63;
  font-size: 18px;
}
.fa.fa-microphone :hover {
  color: red;
}
#microphone.voice-on {
  animation-name: flicker;
  animation-duration: 0.7s;
  animation-iteration-count: infinite;

  -webkit-animation-name: flicker;
  -webkit-animation-duration: 0.7s;
  -webkit-animation-iteration-count: infinite;
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

/* Harsh */
.chat-head .media .media-body p {
  font-weight: bold;
  color: #b0b7d1;
}
#response_bot_text {
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 100px;
}
#button_addon2 {
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 100px;
}
.prompt .chat {
  background: #fff;
}
p {
  font-family: Arial, Helvetica, sans-serif;
}

.chat-footer p {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Noto Color Emoji";
}

.btn:focus,
.btn:active:focus {
  outline: none !important;
  box-shadow: none;
  -webkit-box-shadow: none;
}

/**/
.form-control {
  line-height: 20px;
  font-size: 13px;
  color: #494d69;
  /* padding: 10px 0 10px 15px; */
  border-radius: 10px;
  border: none;
  height: auto;
  font-weight: 300;
}

.chat-txt input {
  border-top-left-radius: 0;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}
.country,
.country2 {
  margin-left: 2%;
  height: 20px;
}
.media1 {
  background: #2b3184;
}
.media2 {
  background: #fff;
}
.chat-wrap1 {
  min-width: 320px;
  max-width: 320px;
}
.chat-wrap2 {
  min-width: 415px;
  max-width: 415px;
}
.chat-body1 {
  max-height: 300px;
  min-height: 70vh;
}
.chat-body2 {
  min-height: 70vh;
  max-height: 400px;
}

.receiver .chat {
  font-size: 14px !important;
  font-weight: 300 !important;
}

.FE_button {
  width: 33%;
  cursor: pointer;
  margin-left: 2%;
  font-size: 13px;
  margin-bottom: 0;
  background-color: white;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0px 1px 5px 0px;
  height: 26px;
}
.FE_button img {
  vertical-align: sub;
}

.FE_button :active {
  background-color: #1eaae1;
  color: #fff;
}
.FE_button :active img {
  color: #fff;
}

.chat-act1 {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1111;
}

.chat-act1 a {
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  /* background: #273679 url(../../../img/ForeignExchange/ui-15.png) center /
    cover no-repeat; */
  background: #273679 url(../../../../public/img/ForeignExchange/ui-15.png) center /
    cover no-repeat;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}
.chat-act1.active a img {
  width: 100%;
}
.chat-act1 a.active {
  -webkit-animation-delay: 0;
  -webkit-animation-duration: 0.5s;
  /* -webkit-animation-name: rotation-rl; */
  -webkit-animation-fill-mode: forwards;
  -moz-animation-delay: 0;
  -moz-animation-duration: 0.5s;
  /* -moz-animation-name: rotation-rl; */
  -moz-animation-fill-mode: forwards;
  animation-delay: 0;
  animation-duration: 0.5s;
  /* animation-name: rotation-rl; */
  animation-fill-mode: forwards;
}
.chat-act1 a.inactive {
  -webkit-animation-delay: 0;
  -webkit-animation-duration: 0.5s;
  /* -webkit-animation-name: rotation-lr; */
  -webkit-animation-fill-mode: forwards;
  -moz-animation-delay: 0;
  -moz-animation-duration: 0.5s;
  /* -moz-animation-name: rotation-lr; */
  -moz-animation-fill-mode: forwards;
  animation-delay: 0;
  animation-duration: 0.5s;
  /* animation-name: rotation-lr; */
  animation-fill-mode: forwards;
}
@media (max-width: 991px) {
  .chat-act1 {
    bottom: 15px;
    right: 15px;
  }
  .chat-act1 a {
    width: 50px;
    height: 50px;
  }
}
/* v-bind:class="{'chat-act1': isexchange,'chat-act': !isexchange}"  */

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

@keyframes flicker {
  from {
    color: red;
  }
  to {
    color: #8a8a8a63;
  }
}
@-webkit-keyframes flicker {
  from {
    color: red;
  }
  to {
    color: #8a8a8a63;
  }
}
@-moz-keyframes flicker {
  from {
    color: red;
  }
  to {
    color: #8a8a8a63;
  }
}
@-o-keyframes flicker {
  from {
    color: red;
  }
  to {
    color: #8a8a8a63;
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-180%);
  }
  60% {
    transform: translateY(-90%);
  }
}
@-webkit-keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    -webkit-transform: translateY(0);
  }
  40% {
    -webkit-transform: translateY(-200%);
  }
  60% {
    -webkit-transform: translateY(-100%);
  }
}
@-moz-keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    -moz-transform: translateY(0);
  }
  40% {
    -moz-transform: translateY(-200%);
  }
  60% {
    -moz-transform: translateY(-100%);
  }
}
@-o-keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    -o-transform: translateY(0);
  }
  40% {
    -o-transform: translateY(-200%);
  }
  60% {
    -o-transform: translateY(-100%);
  }
}
</style>
