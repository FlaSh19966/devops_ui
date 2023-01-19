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
            <form @submit="fix_appointment">
              <div class="form-group">
                <input class="form-control" v-model="patient_name" placeholder="Patient Name" />
              </div>
              <div class="form-group">
                <input
                  class="form-control"
                  v-model="reason_of_visit"
                  placeholder="Reason for visit"
                />
              </div>
              <div class="form-group">
                <input
                  class="form-control"
                  v-model="visitor_number"
                  type="text"
                  pattern="[789][0-9]{9}"
                  placeholder="Phone Number"
                />
              </div>
              <div class="form-group">
                <select v-model="selected_time" class="form-control">
                  <option value>---Select Time Slot---</option>
                  <option v-for="(time, index) in time_slots" :key="index">{{time}}</option>
                </select>
              </div>
              <div class="btn-wrap text-right">
                <button type="button" class="btn btn-link" data-dismiss="modal">Cancel</button>
                <button type="submit" class="darkblue-btn">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="dash-cont">
      <div class="container-fluid">
        <div class="card dash-card">
          <div class="card-header d-block d-sm-flex flex-wrap justify-content-between"></div>
          <!-- <i class="fa fa-times" aria-hidden="true"></i> -->
          <div
            :class="{'card-body d-block d-flex':$route.name!='Direct Response Bot','card-body':$route.name=='Direct Response Bot'}"
          >
          <!-- <i @click="go_to_design_bots_page" style="cursor:pointer" class="fa fa-times" aria-hidden="true"></i> -->

            <div class="group_chat_btn" v-if="live_chat_on">
              <a href="javascript:void(0)" @click="disconnect_support_chat">Stop Chat</a>
            </div>
            <div
              style="width:25%"
              v-if="$route.name!='Direct Response Bot'"
            >
            <!-- Here administrator can check how the bot responds to the end users questions. -->
            </div>
            <!--Add style="margin:0 auto" in below div to shift the chat bot a little right-->
          <i @click="go_to_design_bots_page" style="cursor:pointer;margin-right:1%" class="fa fa-times" aria-hidden="true"></i>

            <div class="chat-master" id="app">
              <div
                class="chat-wrap"
                style="margin-right:auto;margin-left:auto;z-index:0;min-width:450px;position:sticky"
                v-bind:class="{'chat-wrap2': isexchange,'chat-wrap1':!isexchange}"
              >
                <div class="chat-head">
                  <div class="media" v-bind:class="{'media1': isexchange,'media2':!isexchange}">
                    <img
                      :src="chat_widget.logo"
                      :style="chat_widget.style"
                      class="rounded "
                      alt="..."
                    />
                    <div class="media-body" style="margin-left:10px">
                      <p
                        style="font-size: 15px;font-weight: bold;margin-top: 6px;text-align:center"
                        v-if="chat_widget!=undefined"
                      >{{chat_widget.title}}</p>
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
                          @click="download_pdf(single.url, single.file_name)"
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
                        @click="click_prompt(prompt)"
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
                          @click="generate_payment(product['UnitPrice'],product['Product Name'])"
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
                          @click="getdata"
                        >{{single.received}}</div>
                        <br v-if="single.image!=null" />
                        <img
                          v-if="single.image!=null"
                          :src="single.image"
                          style="margin-top: 4%;height: 40vh;width: 40vh"
                        />
                        <div v-if="single.show_buttons && single.support_buttons">
                          <button class="btn custom-buttons" @click="call_support('Yes')">Yes</button>
                          <button class="btn custom-buttons" @click="call_support('No')">No</button>
                        </div>
                        <div v-if="single.custom_buttons" class="d-block d-flex flex-wrap">
                          <button
                            class="btn custom-buttons"
                            @click="send_message('is_button', button, item)"
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
                    <!-- <div class="input-group-append">
                      <button
                        class="btn voice-button"
                        type="button"
                        @click="voice_communication"
                        :disabled="refreshed_or_closed"
                      >
                        <i class="fa fa-microphone" id="microphone"></i>
                      </button>
                    </div> -->
                    <div class="input-group-append">
                      <button
                        class="btn"
                        type="button"
                        :id="{'button_addon2':isexchange}"
                        @click="send_message"
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
import Scrollbar from "smooth-scrollbar";
import Multiselect from "vue-multiselect";
import debounce from "vue-debounce/src/debounce";
import country_code from "../Dashboard/country_code_data.json";
import CountryCodes from "../Dashboard/CountryCodes.json";

export default {
  name: "closed-form-response-bot",
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
      is_phone_number_otp : false,
      name_element_for_event_listener: null,
      is_phone_number_err_msg: false,
    };
  },
  created() {
    this.conversation_id = this.generateUUID();
    this.$session.start();
    this.$session.set("conversation_id", this.conversation_id);
    // console.log(country_code);
    // console.log(JSON.parse(country_code));
    if (this.$session.has("BotResponse_Conversation")) {
      // this.chat = this.$session.get("BotResponse_Conversation");
    }
    if (!this.$session.has("ChatBotImageParameters")) {
      axios
        .post(api_calls.widget_setting_url(), {
          company_name: this.companyname,
          company_id: this.companyid,
          email: this.$session.get("UserInformation").email,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens,
          isShow: true
        },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          },
        })
        .then(response => {
          this.chat_widget.title = response.data.WidgetTitle;
          this.chat_widget.logo = response.data.ImageUrl;
          this.$session.set("ChatBotImageParameters", this.chat_widget);
          this.chat_widget.style = "margin-top: 5px;height:30px;width:auto";
        })
        .catch(e => {
          if (this.$session.get("UserInformation").company_name == "gogyb") {
            this.chat_widget.style = "margin-top: 5px;height:30px;width:60px";
            this.chat_widget.logo = "/img/cense_image.png";
          } else if (
            this.$session.get("UserInformation").company_name == "MT Care"
          ) {
            this.chat_widget.logo = "/img/robomate_logo.png";
            this.chat_widget.style = "margin-top: 5px;height:50px;width:95px";
          } else {
            this.chat_widget.logo = "/img/cense_image.png";
            this.chat_widget.style = "margin-top: 5px;height:30px;width:60px";
          }
          this.$session.set("ChatBotImageParameters", this.chat_widget);
        });
    } else {
      this.chat_widget = this.$session.get("ChatBotImageParameters");
      this.chat_widget.style = "margin-top: 5px;height:30px;width:auto";
    }
    if (!this.$session.has("ResponseBotToken")) {
      axios
        .post(api_calls.bot_response_token(), {
          license_key: this.$session.get("UserInformation").license_key,
          username: this.$session.get("UserInformation").email
        })
        .then(response => {
          this.$session.set("ResponseBotToken", response.data.data);
          this.bot_response_token_value = response.data.data;
          this.refresh_chatbot();
        });
    } else {
      this.refresh_chatbot();
    }
    //harsh
    if (
      this.$session.get("UserInformation").license_key ==
      ".eJxTcssvSs1Mz6tIzkjMS081NDexNIQKKUDFMkpKCoqt9PXLy8v10lBU6yXn5-olluobGRha6hqY6xqYKBgaWBkZW5ma6hmbm5gYmSoBAGa9Hp0.XR3Tuw.X77F_7LDtOLp2Vt9snFDSo31nTw"
    ) {
      this.isexchange = true;
    }
    var d = new Date();
    axios
      .post(api_calls.bot_user_data(), {
        license_key: this.$session.get("UserInformation").license_key,
        tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
        datetime: d.toISOString(),
        username: this.$session.get("UserInformation").email,
        source: "Web",
        token: this.bot_response_token_value,
        role: this.$session.get("UserInformation").role
      })
      .then(response => {});
      if(this.$route.params.botdata==undefined){
        this.$router.push({
          name: 'Dashboard',
        });
      } else {
        this.bot_name=this.$route.params.botdata.bot_name;
        this.bot_type=this.$route.params.botdata.bot_type;
        // axios
        //   .post(api_calls.closed_form_response_api(),{
        //     license_key: this.$session.get("UserInformation").license_key,
        //     uid: "closed_form_user",
        //     chat: null,
        //     node_selected: null,
        //     bot_name: this.bot_name,
        //   })
        //   .then(response=>{
        //     if(response.data.error==undefined){
        //       this.closed_bot_chat(response.data);
        //       this.isclosedboton=true;
        //     }
        //   });
      }
  },
  mounted() {
    CountryCodes.sort(function(a, b) {
      if(a.code < b.code) { return -1; }
      if(a.code > b.code) { return 1; }
      return 0;
    });

    this.show = false;
    if (this.$route.name == "Train the Bot") {
      $(".chat-wrap").css("right", "auto");
    }
    if (this.$route.name == "Direct Response Bot") {
      $(".chat-wrap").css("marginTop", "5%");
    }
    $('[data-toggle="popover"]')
      .popover({
        html: true,
        content: $("#popover_content")
      })
      .on("show.bs.popover", function() {
        $("#popover_content").addClass("d-block");
      })
      .on("hide.bs.popover", function() {
        $("#popover_content").addClass("d-none");
      });
    $("#popover_content").css("zIndex", 9999);
    bus.$on("Logout has been clicked", data => {
      if (data == "True") {
        $('[data-toggle="popover"]').popover("hide");
      }
    });
    window.SpeechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition;
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;


  },
  updated() {
    this.submit_custom_form();
    if(this.isclosedboton&&this.isformon){
      this.submit_closed_form_data();
    }
  },
  methods: {
    generateUUID() { // Public Domain/MIT
            var d = new Date().getTime();//Timestamp
            var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16;//random number between 0 and 16
                if(d > 0){//Use timestamp until depleted
                    r = (d + r)%16 | 0;
                    d = Math.floor(d/16);
                } else {//Use microseconds since page-load if supported
                    r = (d2 + r)%16 | 0;
                    d2 = Math.floor(d2/16);
                }
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
    },
    voice_communication() {
      if (/Chromium/i.test(navigator.userAgent)) {
        this.call_cloud_api();
      } else if (window.SpeechRecognition != undefined) {
        this.recognition = new window.SpeechRecognition();
        document.querySelector("#microphone").classList.add("voice-on");
        this.recognition.onresult = e => {
          const speechToText = e.results[0][0].transcript;
        };
        this.recognition.onend = function() {
          document.querySelector("#microphone").classList.remove("voice-on");
          //Again – give the user feedback that you are not listening anymore. If you wish to achieve continuous recognition – you can write a script to start the recognizer again here.
        };
        var vm = this;
        this.recognition.onresult = function(event) {
          if (typeof event.results === "undefined") {
            //Something is wrong…
            this.recognition.stop();
            return;
          }
          for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              //Final results
              vm.to_send = event.results[i][0].transcript;
              console.log("final results: " + event.results[i][0].transcript); //Of course – here is the place to do useful things with the results.
            } else {
              //i.e. interim...
              console.log("interim results: " + event.results[i][0].transcript); //You can use these results to give the user near real time experience.
            }
          } //end for loop
        };
        this.recognition.start();
      } else {
        this.call_cloud_api();
      }
    },
    call_cloud_api() {
      document.querySelector("#microphone").classList.add("voice-on");
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      var buffer_list, buffer_i32;
      var recorder = new Recorder(audioContext, {
        // An array of 255 Numbers
        // You can use this to visualize the audio stream
        // If you use react, check out react-wave-stream
        onAnalysed: data => {}
      });

      var voice_channel,
        wav_parameters,
        recBuffers = [],
        recLength,
        meta_data;
      var vm = this;
      axios.get(api_calls.voice_channel_api()).then(response => {
        this.voice_socket = new Socket(process.env.VUE_APP_LIVE_CHAT_WEBSOCKET_ENDPOINT, {
          params: {
            company: this.$session.get("UserInformation").company_name,
            voice_channel_name: response.data.voice_channel_name,
            token: response.data.token,
            is_voice: true
          }
        });
        this.voice_socket.connect();

        voice_channel = this.voice_socket.channel(
          "voice_to_text:" + response.data.voice_channel_name
        );
        voice_channel.join();
      });

      let blob = null;

      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(stream => {
          recorder.init(stream);
          startRecording();
        })
        .catch(err => console.log("Uh oh... unable to get stream...", err));

      function startRecording() {
        recorder.start();
        setTimeout(() => {
          stopRecording();
        }, 4000);
      }

      function stopRecording() {
        recorder.stop().then(({ blob, buffer }) => {
          // buffer_list = buffer[0];
          var reader = new FileReader();
          reader.readAsArrayBuffer(blob);
          reader.onloadend = () => {
            buffer_list = reader.result;
            var temp = new Uint8Array(buffer_list);
            wav_parameters = wav_file_processing_read_parameters(temp);
            init_encoder(buffer_list);
          };
          // Recorder.download(blob, "my-file");
          // buffer is an AudioBuffer
        });
      }

      function init_encoder(data) {
        var arrayBuffer = new Uint8Array(data);

        var encData = [];
        var result = encodeFlac(arrayBuffer, encData);
        // console.log("encoded data array: ", encData);

        if (result.error) {
          console.error("Conversion failed!!");
        }

        var metaData = result.metaData;

        if (!result.error) {
          //using data-util.js utility function(s)
          var blob_download = exportFlacFile(encData, metaData);
          // var down_file = URL.createObjectURL(blob_download);
          // let file = document.createElement("a");
          // file.href = down_file;
          // file.download = "output.flac";
          // file.click()
          var reader = new FileReader();
          reader.readAsDataURL(blob_download);
          reader.onloadend = function() {
            var reader_string = reader.result.split("base64,")[1];
            voice_channel.push("voice_packets_sent", { stream: reader_string });
            voice_channel.on("voice_to_text_reply", data => {
              document
                .querySelector("#microphone")
                .classList.remove("voice-on");
              if (data.text.results != undefined) {
                vm.to_send = data.text.results[0].alternatives[0].transcript;
              } else {
                toastr.error(
                  "We could not recognize your voice. Please try again or type in."
                );
              }
              vm.button_fill();
            });
          };
        }
      }

      function encodeFlac(binData, recBuffers) {
        var ui8_data = new Uint8Array(binData);
        var sample_rate = 0,
          channels = 0,
          bps = 0,
          total_samples = 0,
          block_align,
          position = 0,
          recLength = 0,
          meta_data;

        /**
         *  records/saves the output data of libflac-encode method
         */
        function write_callback_fn(buffer, bytes, samples, current_frame) {
          recBuffers.push(buffer);
          recLength += bytes;
          // recLength += buffer.byteLength;
        }

        function metadata_callback_fn(data) {
          meta_data = data;
        }

        // check: is file a compatible wav-file?
        if (wav_file_processing_check_wav_format(ui8_data) == false) {
          return { error: "Wrong WAV file format", status: 0 };
        }

        // get WAV/PCM parameters from data / file
        var wav_parameters = wav_file_processing_read_parameters(ui8_data);
        var tot_samples = 0;
        var compression_level = 5;
        var flac_ok = 1;
        var is_verify = true;

        var flac_encoder = Flac.create_libflac_encoder(
          wav_parameters.sample_rate,
          wav_parameters.channels,
          wav_parameters.bps,
          compression_level,
          tot_samples,
          is_verify
        );
        if (flac_encoder != 0) {
          var init_status = Flac.init_encoder_stream(
            flac_encoder,
            write_callback_fn,
            metadata_callback_fn,
            0
          );
          flac_ok &= init_status == 0;
        } else {
          var msg = "Error initializing the decoder.";
          console.error(msg);
          return { error: msg, status: 1 };
        }

        // convert the PCM-Data to the appropriate format for the libflac library methods (32-bit array of samples)
        // creates a new array (32-bit) and stores the 16-bit data of the wav-file as 32-bit data
        var buffer_i32 = wav_file_processing_convert_16bitdata_to32bitdata(
          ui8_data.buffer
        );

        var flac_return = Flac.FLAC__stream_encoder_process_interleaved(
          flac_encoder,
          buffer_i32,
          buffer_i32.length / wav_parameters.channels
        );

        if (flac_return != true) {
          console.log(
            "Error: FLAC__stream_encoder_process_interleaved returned false. " +
              flac_return
          );
        }

        flac_ok &= Flac.FLAC__stream_encoder_finish(flac_encoder);

        Flac.FLAC__stream_encoder_delete(flac_encoder);

        return { metaData: meta_data, status: flac_ok };
      }

      function wav_file_processing_check_wav_format(ui8_data) {
        // check: is file a compatible wav-file?
        if (
          ui8_data.length < 44 ||
          String.fromCharCode.apply(null, ui8_data.subarray(0, 4)) != "RIFF" ||
          String.fromCharCode.apply(null, ui8_data.subarray(8, 16)) !=
            "WAVEfmt " ||
          String.fromCharCode.apply(null, ui8_data.subarray(36, 40)) != "data"
        ) {
          console.log("ERROR: wrong format for wav-file.");
          return false;
        }
        return true;
      }

      /**
       *  checks if the given ui8_data (ui8array) is of a flac-file
       */
      function flac_file_processing_check_flac_format(ui8_data) {
        // check: is file a compatible flac-file?
        if (
          ui8_data.length < 42 ||
          String.fromCharCode.apply(null, ui8_data.subarray(0, 4)) != "fLaC"
        ) {
          console.log("ERROR: wrong format for flac-file.");
          return false;
        }
        var view = new DataView(ui8_data.buffer);
        //check last 7 bits of 4th byte for meta-data BLOCK type: must be STREAMINFO (0)
        if ((view.getUint8(4) & 0x7f) != 0) {
          console.log("ERROR: wrong format for flac-file.");
          return false;
        }

        return true;
      }

      function wav_file_processing_read_parameters(ui8_data) {
        var sample_rate = 0,
          channels = 0,
          bps = 0,
          total_samples = 0,
          block_align;

        // get WAV/PCM parameters from data / file
        sample_rate =
          (((((ui8_data[27] << 8) | ui8_data[26]) << 8) | ui8_data[25]) << 8) |
          ui8_data[24];
        channels = ui8_data[22];
        bps = ui8_data[34];
        block_align = ui8_data[32];
        total_samples =
          ((((((ui8_data[43] << 8) | ui8_data[42]) << 8) | ui8_data[41]) << 8) |
            ui8_data[40]) /
          block_align;

        return {
          sample_rate: sample_rate,
          channels: channels,
          bps: bps,
          total_samples: total_samples,
          block_align: block_align
        };
      }

      /**
       *  converts the PCM data of the wav file (each sample stored as 16 bit value) into
       *  a format expected by the libflac-encoder method (each sample stored as 32 bit value in a 32-bit array)
       */
      function wav_file_processing_convert_16bitdata_to32bitdata(arraybuffer) {
        // convert the PCM-Data to the appropriate format for the libflac library methods (32-bit array of samples)
        // creates a new array (32-bit) and stores the 16-bit data of the wav-file as 32-bit data
        var ab_i16 = new DataView(arraybuffer, 44);
        var buf_length = ab_i16.byteLength;
        var buf32_length = buf_length / 2;
        var buffer_i32 = new Uint32Array(buf32_length);
        var view = new DataView(buffer_i32.buffer);
        var index = 0;
        for (var j = 0; j < buf_length; j += 2) {
          view.setInt32(index, ab_i16.getInt16(j, true), true);
          index += 4;
        }
        return buffer_i32;
      }

      function exportFlacFile(recBuffers, metaData) {
        var recLength = getLength(recBuffers);
        if (metaData) {
          addFLACMetaData(recBuffers, metaData);
        }
        //convert buffers into one single buffer
        var samples = mergeBuffers(recBuffers, recLength);
        var the_blob = new Blob([samples]);
        return the_blob;
      }

      function getLength(recBuffers) {
        //get length
        var recLength = 0;
        for (var i = recBuffers.length - 1; i >= 0; --i) {
          recLength += recBuffers[i].byteLength;
        }
        return recLength;
      }

      function addFLACMetaData(chunks, metadata) {
        var offset = 4;
        var data = chunks[0]; //1st data chunk should contain FLAC identifier "fLaC"
        if (
          data.length < 4 ||
          String.fromCharCode.apply(null, data.subarray(0, 4)) != "fLaC"
        ) {
          console.error(
            "Unknown data format: cannot add additional FLAC meta data to header"
          );
          return;
        }

        //first chunk only contains the flac identifier string?
        if (data.length == 4) {
          data = chunks[1]; //get 2nd data chunk which should contain STREAMINFO meta-data block (and probably more)
          offset = 0;
        }

        var view = new DataView(data.buffer);

        //NOTE by default, the encoder writes a 2nd meta-data block (type VORBIS_COMMENT) with encoder/version info -> do not set "is last" to TRUE for first one
        //	// write "is last meta data block" & type STREAMINFO type (0) as little endian combined uint1 & uint7 -> uint8:
        //	var isLast = 1;//1 bit
        //	var streamInfoType = 0;//7 bit
        //	view.setUint8(0 + offset, isLast << 7 | streamInfoType, true);//8 bit

        // block-header: STREAMINFO type, block length -> already set

        // block-content: min_blocksize, min_blocksize -> already set

        // write min_framesize as little endian uint24:
        view.setUint8(8 + offset, metadata.min_framesize >> 16, true); //24 bit
        view.setUint8(9 + offset, metadata.min_framesize >> 8, true); //24 bit
        view.setUint8(10 + offset, metadata.min_framesize, true); //24 bit

        // write max_framesize as little endian uint24:
        view.setUint8(11 + offset, metadata.max_framesize >> 16, true); //24 bit
        view.setUint8(12 + offset, metadata.max_framesize >> 8, true); //24 bit
        view.setUint8(13 + offset, metadata.max_framesize, true); //24 bit

        // block-content: sampleRate, channels, bitsPerSample -> already set

        // write total_samples as little endian uint36:
        //TODO set last 4 bits to half of the value in index 17
        view.setUint8(18 + offset, metadata.total_samples >> 24, true); //36 bit
        view.setUint8(19 + offset, metadata.total_samples >> 16, true); //36 bit
        view.setUint8(20 + offset, metadata.total_samples >> 8, true); //36 bit
        view.setUint8(21, metadata.total_samples, true); //36 bit

        writeMd5(view, 22 + offset, metadata.md5sum); //16 * 8 bit
      }

      function mergeBuffers(channelBuffer, recordingLength) {
        var result = new Uint8Array(recordingLength);
        var offset = 0;
        var lng = channelBuffer.length;
        for (var i = 0; i < lng; i++) {
          var buffer = channelBuffer[i];
          result.set(buffer, offset);
          offset += buffer.length;
        }
        return result;
      }

      function writeMd5(view, offset, str) {
        var index;
        for (var i = 0; i < str.length / 2; ++i) {
          index = i * 2;
          view.setUint8(
            i + offset,
            parseInt(str.substring(index, index + 2), 16)
          );
        }
      }
    },
    start_video_call() {},
    refresh_chatbot(type) {
      this.refreshed_or_closed = true;
      // debugger;
      axios
        .post(api_calls.chatbot_response_cense(), {
          license_key: this.$session.get("UserInformation").license_key,
          token: this.bot_response_token_value,
          username: this.$session.get("UserInformation").email,
          source: "Web",
          chat: "",
          data: "",
          user_id: "",
          role: this.$session.get("UserInformation").role,
          refreshed_or_closed: this.refreshed_or_closed
        })
        .then(resp => {
          this.refreshed_or_closed = false;
          if(this.iffirsttime){
            this.iffirsttime=false;
            document.querySelector(".typing-indicator").style.display = "block";
            axios
            .post(api_calls.closed_form_response_api(),{
              license_key: this.$session.get("UserInformation").license_key,
              uid: this.$session.get("UserInformation").email,
              chat: null,
              node_selected: null,
              bot_name: this.bot_name,
              conversation_id : this.conversation_id,
            })
            .then(response=>{
              // console.log(response.data.error);
              if(response.data.error==undefined){
                // console.log('gaya');
                document.querySelector(".typing-indicator").style.display = "none";
                this.closed_bot_chat(response.data);
                this.isclosedboton=true;
              } else {
                document.querySelector(".typing-indicator").style.display = "none";
              }
            });
          }
          if (type == "support") {
            this.chat.push({
              receiving: true,
              received: "Is there anything else I can help you with?",
              conversation_only: true,
              time: this.generate_time()
            });
          }
          if (
            this.companyid == "CustomerHappiness95185" ||
            this.companyid == "3x5ive99534" ||
            this.companyid == "Foreignxchange17491" ||
            this.companyid == "clinicaltrials81352"
          ) {
            axios
              .post(api_calls.chatbot_response_cense(), {
                chat: "/welcome_message",
                token: this.bot_response_token_value,
                username: this.$session.get("UserInformation").email,
                source: "Web",
                user_id: "",
                license_key: this.$session.get("UserInformation").license_key,
                data: "",
                role: this.$session.get("UserInformation").role,
                refreshed_or_closed: false
              })
              .then(response => {
                this.push_msg(response, response.data.responses);
              });
          }
          axios
            .post(api_calls.prompt_url(), {
              uid: "cense", //this.fingerprint
              company_id: this.$session.get("UserInformation").company_id,
              license_key: this.$session.get("UserInformation").license_key,
              chat: ""
            })
            .then(response => {
              if (response.data != "NO CLOSED FORM BOT") {
                if (
                  response.data.extras != null &&
                  response.data.extras[0].Type == "TABLE"
                ) {
                  this.create_chat(response.data, "istable");
                } else if (response.data.return == "PROMPTS") {
                  this.create_chat(response.data, "isprompt");
                }
              }
            })
            .catch(e => {});
        });
    },
    download_pdf(url, file_name) {
      event.preventDefault();
      var link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file_name);
      document.body.appendChild(link);
      link.click();
    },
    scroll_div() {
      var doc = document.querySelector(".buy-products");
      if (event.deltaX > event.deltaY) {
        doc.scrollLeft += 10;
      } else if (event.deltaX < event.deltaY) {
        doc.scrollLeft -= 10;
      }
    },
    call_support(type) {
      if (type == "Yes") {
        axios
          .post(api_calls.chatbot_response_cense(), {
            license_key: this.$session.get("UserInformation").license_key,
            token: this.bot_response_token_value,
            username: this.$session.get("UserInformation").email,
            source: "Web",
            chat: "/call_support",
            token: this.bot_response_token_value,
            role: this.$session.get("UserInformation").role,
            refreshed_or_closed: this.refreshed_or_closed
          })
          .then(resp => {
            this.chat.push({
              conversation_only: true,
              receiving: true,
              received: resp.data.responses[0].text,
              time: this.generate_time()
            });
            this.$session.set("BotResponse_Conversation", this.chat);
            this.update_scrollbar("upto_end", "response");
          });
      } else if (type == "No") {
        this.chat.push(this.chat[0]);
        this.chat.push(this.chat[1]);
        this.update_scrollbar("upto_end", "response");
        // this.refresh_chatbot("support");
      }
    },
    parse(string) {
      return string.replace(/{{.*?}}/g, match => {
        var today = new Date();
        var dd = today.getDate();

        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) {
          dd = "0" + dd;
        }

        if (mm < 10) {
          mm = "0" + mm;
        }
        today = dd + "-" + mm + "-" + yyyy;
        var expression = match.slice(2, -2);
        this.$data[expression] = today;
        return this.$data[expression];
      });
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
    },
    call_api() {
      event.preventDefault();
      if (this.phone_number_validity.test(this.phone_number)) {
        axios
          .post(api_calls.call_support_url(), {
            company_id: this.companyid,
            company_name: this.companyname,
            phonenumber: this.phone_number,
            token: this.bot_response_token_value,
            username: this.$session.get("UserInformation").email
          })
          .then(response => {
            if (response.data.message == "Call incoming!") {
              toastr.success("We will get in touch with you soon. Thanks");
            }
          });
      } else {
        toastr.error("Please Enter a valid phone number");
      }
    },
    show_popup() {
      this.show = false;
      this.stop = false;
    },
    sub_leaf_node_call(type) {
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
        this.update_scrollbar();
        setTimeout(() => {
          document.querySelector(".typing-indicator").style.display = "none";
        }, 1000);
      } else if (divclick == "Buy Tutorial") {
        this.cense_enquiry = true;
        axios
          .post(api_calls.chatbot_response_cense(), {
            username: this.$session.get("UserInformation").email,
            token: this.bot_response_token_value,
            chat: "/personal_details",
            source: "Web",
            license_key: this.$session.get("UserInformation").license_key,
            role: this.$session.get("UserInformation").role,
            refreshed_or_closed: ""
          })
          .then(response => {
            var msg = {
              received: response.data.responses[0].text,
              conversation_only: true,
              receiving: true,
              time: this.generate_time()
            };
            this.chat.push(msg);
            this.update_scrollbar();
            setTimeout(() => {
              document.querySelector(".typing-indicator").style.display =
                "none";
            }, 1000);
            this.$session.set("BotResponse_Conversation", this.chat);
          });
      }
    },
    ticket_number() {
      var random_num = Math.floor(1000000 + Math.random() * 9000000);
      var company = this.companyname.slice(0, 1).toUpperCase();
      return company + "_" + random_num;
    },
    send_message(type, message, to_be_displayed) {
      //harsh
      // debugger;
      event.preventDefault();
      if (this.selected_indication[0] != undefined) {
        type = "is_prompt";
        to_be_displayed = this.to_send;
        this.to_send =
          this.selected_indication[0].value.split("{")[0] +
          JSON.stringify(this.res);
        this.selected_indication = [];
      }
      if(this.isclosedboton&&type!='is_button'){
        this.refreshed_or_closed=true;
        this.submit_closed_form_data();
      } else if (type == "is_button") {
        $("#response_bot_text").prop("disabled", false);
        if (
          message.value == "isdisabled" &&
          this.companyid == "clinicaltrials81352" &&
          message.title == "No"
        ) {
        } else if(this.isclosedboton){
          this.submit_closed_form_data(type,message);
        } else {
          let index = to_be_displayed;
          document.querySelector(".typing-indicator").style.display = "block";
          this.chat.push({
            sent: message.title,
            sending: true,
            time: this.generate_time(),
            conversation_only: true,
            delivered: true,
            dropdown: ""
          });
          this.update_scrollbar("upto_end", "sender");
          axios
            .post(api_calls.chatbot_response_cense(), {
              chat: message.value,
              token: this.bot_response_token_value,
              username: this.$session.get("UserInformation").email,
              source: "Web",
              license_key: this.$session.get("UserInformation").license_key,
              role: this.$session.get("UserInformation").role,
              refreshed_or_closed: this.refreshed_or_closed
            })
            .then(response => {
              if (this.chat[index].removable == true) {
                this.chat.splice(index, 1);
              }
              this.response_handling(response);
            });
        }
      } else if (type == "is_prompt") {
        document.querySelector(".typing-indicator").style.display = "block";
        this.chat.push({
          sent: to_be_displayed,
          sending: true,
          time: this.generate_time(),
          conversation_only: true,
          delivered: true
        });
        this.update_scrollbar("upto_end", "sender");
        axios
          .post(api_calls.chatbot_response_cense(), {
            // host: this.user_data.host,
            role: this.$session.get("UserInformation").role,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.bot_response_token_value,
            username: this.$session.get("UserInformation").email,
            source: "Web",
            chat: this.to_send
          })
          .then(response => {
            this.response_handling(response);
            this.ex1();
          });
      } else if (this.to_send == "Restart" || this.to_send == "restart") {
        axios
          .post(api_calls.prompt_url(), {
            uid: "cense", //this.fingerprint
            company_id: this.$session.get("UserInformation").company_id,
            license_key: this.$session.get("UserInformation").license_key,
            chat: ""
          })
          .then(response => {
            this.chat.push(response.data);
            this.update_scrollbar("upto_end", "response");
            this.$session.set("BotResponse_Conversation", this.chat);
            this.first_click = true;
            this.level = response.data.level;
          })
          .catch(e => {});
      } else if (
        this.cense_enquiry == true &&
        this.to_send != "" &&
        this.to_send != null &&
        !/^\s*$/.test(this.to_send)
      ) {
        document.querySelector(".typing-indicator").style.display = "block";
        var send_msg = {
          sent: this.to_send,
          conversation_only: true,
          sending: true,
          time: this.generate_time()
        };
        this.chat.push(send_msg);
        this.$session.set("BotResponse_Conversation", this.chat);
        this.update_scrollbar("upto_end");
        axios
          .post(api_calls.chatbot_response_cense(), {
            username: this.$session.get("UserInformation").email,
            token: this.bot_response_token_value,
            chat: "/personal_details",
            source: "Web",
            user_id: "",
            company_id: "CO00023",
            data: "",
            role: this.$session.get("UserInformation").role,
            refreshed_or_closed: "",
            license_key: this.$session.get("UserInformation").license_key
          })
          .then(response => {
            var msg = {
              received: response.data.responses[0].text,
              conversation_only: true,
              receiving: true,
              time: this.generate_time()
            };
            this.chat.push(msg);
            this.$session.set("BotResponse_Conversation", this.chat);
            this.refreshed_or_closed = false;
            this.update_scrollbar("upto_end", "response");
          })
          .catch(e => {
            document.querySelector(".typing-indicator").style.display = "none";
          });
      } else if (this.live_chat_on) {
        if (this.user_name == "") {
          this.channel.push("new_name", { name: this.to_send });
          this.user_name = this.to_send;
          this.update_scrollbar("upto_end", "response");
        } else {
          this.channel.push("new_chat_message", { message: this.to_send });
          this.update_scrollbar("upto_end", "response");
        }
        this.chat.push({
          sent: this.to_send,
          sending: true,
          conversation_only: true,
          time: this.generate_time()
        });
        this.$session.set("BotResponse_Conversation", this.chat);
        this.update_scrollbar("upto_end", "sender");
      } else if (
        this.to_send != "" &&
        this.to_send != null &&
        this.cense_enquiry != true
      ) {
        this.chat.push({
          conversation_only: true,
          sending: true,
          sent: this.to_send,
          time: this.generate_time()
        });
        this.$session.set("BotResponse_Conversation", this.chat);
        this.update_scrollbar("upto_end", "sender");
        axios
          .post(api_calls.chatbot_response_cense(), {
            license_key: this.$session.get("UserInformation").license_key,
            token: this.bot_response_token_value,
            username: this.$session.get("UserInformation").email,
            source: "Web",
            chat: this.to_send,
            token: this.bot_response_token_value,
            role: this.$session.get("UserInformation").role,
            refreshed_or_closed: this.refreshed_or_closed
          })
          .then(response => {
            this.response_handling(response);
          })
          .catch(e => {
            this.update_scrollbar("upto_end", "response");
          });
      }
      this.to_send = "";
      this.button_fill();
    },
    initiate_support_chat() {
      this.chat.push({
        receiving: true,
        received: "Sorry I am not getting your question",
        conversation_only: true
      });
      this.chat.push({
        receiving: true,
        received: "Would you like to talk with support team?",
        conversation_only: true,
        show_buttons: true,
        support_buttons: true,
        time: this.generate_time()
      });
      this.update_scrollbar("upto_end", "response");
    },
    disconnect_support_chat() {
      this.channel.push("stopped_chat", {
        name: this.user_name,
        message: " has ended the conversation."
      });
      this.channel.leave();
      this.chat_socket.disconnect();
      this.live_chat_on = false;
    },
    chat_response_error() {
      this.chat.push({
        conversation_only: true,
        receiving: true,
        received: "Sorry I'm not getting your question",
        time: this.generate_time()
      });
      this.$session.set("BotResponse_Conversation", this.chat);
      this.update_scrollbar("upto_end", "response");
    },
    send_request_json(message) {
      axios
        .post(api_calls.chatbot_response_cense(), {
          license_key: this.$session.get("UserInformation").license_key,
          token: this.bot_response_token_value,
          username: this.$session.get("UserInformation").email,
          token: this.bot_response_token_value,
          role: this.$session.get("UserInformation").role,
          refreshed_or_closed: this.refreshed_or_closed,
          chat: "",
          source: "Web",
          data: this.json_data[message.responses[0].intent]
        })
        .then(resp => {
          this.chat.push({
            conversation_only: true,
            receiving: true,
            received:
              resp.data.responses.length == 0
                ? "Sorry I'm not getting your question"
                : resp.data.responses[0].text,
            time: this.generate_time(),
            image:
              resp.data.responses[0].img == ""
                ? null
                : resp.data.responses[0].img
          });
          this.$session.set("BotResponse_Conversation", this.chat);
          this.update_scrollbar("upto_end", "response");
        });
    },
    response_handling(response, type) {
      var i = 0;
      var delay =
        response.data.responses[i].text != undefined &&
        response.data.responses[i].text.length > 10
          ? 2000
          : 500;
      var vm = this;
      document.querySelector(".typing-indicator").style.display = "block";
      setTimeout(() => {
        handle_response();
      }, delay);
      function handle_response() {
        setTimeout(() => {
          document.querySelector(".typing-indicator").style.display = "none";
          if (response.data == null || response.data.responses.length == 0) {
            vm.chat_response_error();
          } else if (
            response.data.responses[i].request_json != undefined &&
            response.data.responses[i].request_json == true
          ) {
            if (response.data.responses[i].text != null) {
              vm.chat.push({
                conversation_only: true,
                receiving: true,
                received: response.data.responses[i].text,
                time: vm.generate_time(),
                image: response.data.responses[i].img,
                video: response.data.responses[i].video
              });
              vm.$session.set("BotResponse_Conversation", vm.chat);
              vm.update_scrollbar("upto_end", "response");
            }
            if (response.data.responses[i].intent == "gogyb450_create_ticket") {
              var name;
              if (vm.$session.get("UserInformation").first_name != null) {
                name =
                  vm.$session.get("UserInformation").first_name +
                  " " +
                  vm.$session.get("UserInformation").last_name;
              } else if (vm.$session.has("UserFirstName")) {
                name =
                  vm.$session.get("UserFirstName") +
                  " " +
                  vm.$session.get("UserLastName");
              }
              var payload = {
                username: name,
                company_name: vm.companyname,
                company_id: vm.companyid,
                user_role: vm.$session.get("UserInformation").role,
                email: vm.$session.get("UserInformation").email,
                license_key: vm.$session.get("UserInformation").license_key,
                token: vm.$session.get("UserInformation").tokens,
                ticket_issue: "",
                ticket_number: vm.ticket_number(),
                description: "",
                file_content: null,
                file_name: null,
                isEdit: false
              };
              payload = JSON.stringify(payload);
              axios
                .post(api_calls.chatbot_response_cense(), {
                  license_key: vm.$session.get("UserInformation").license_key,
                  token: vm.bot_response_token_value,
                  username: vm.$session.get("UserInformation").email,
                  token: vm.bot_response_token_value,
                  role: vm.$session.get("UserInformation").role,
                  refreshed_or_closed: vm.refreshed_or_closed,
                  chat: "",
                  source: "Web",
                  data: payload
                })
                .then(resp => {
                  vm.chat.push({
                    conversation_only: true,
                    receiving: true,
                    received:
                      resp.data.responses.length == 0
                        ? "Sorry I'm not getting your question"
                        : resp.data.responses[i].text,
                    time: vm.generate_time(),
                    image: resp.data.responses[i].img,
                    video:
                      resp.data.responses[i].video != null
                        ? resp.data.responses[i].video
                        : null
                  });
                  vm.$session.set("BotResponse_Conversation", vm.chat);
                  vm.update_scrollbar("upto_end", "response");
                });
            } else if (
              response.data.responses[i].intent == "create_appointment"
            ) {
              let today_date = new Date();
              axios
                .post(api_calls.schedule_appointment_url(), {
                  company_name: vm.companyname,
                  company_id: vm.companyid,
                  Date:
                    today_date.getFullYear() +
                    "-" +
                    (today_date.getMonth() < 9
                      ? "0" + (today_date.getMonth() + 1)
                      : today_date.getMonth() + 1) +
                    "-" +
                    today_date.getDate() //Month object document it
                  // Date: start_time,
                })
                .then(response => {
                  // this.time_slots = this.full_time_slots;
                  // if (response.data.Slot != undefined) {
                  //   if (response.data.Slot.length > 0) {
                  //     let index;
                  //     for (var i in response.data.Slot) {
                  //       index = this.time_slots.indexOf(response.data.Slot[i]);
                  //       if (index != -1) {
                  //         this.time_slots.splice(index, 1);
                  //       }
                  //     }
                  //   } else {
                  //   }
                  // }
                })
                .catch(e => {
                  // console.log(e);
                });
            } else {
              vm.send_request_json(response.data);
            }
          } else if (
            response.data.responses[i].return_intent != undefined &&
            response.data.responses[i].return_intent == true
          ) {
            axios
              .post(api_calls.chatbot_response_cense(), {
                license_key: vm.$session.get("UserInformation").license_key,
                token: vm.bot_response_token_value,
                username: vm.$session.get("UserInformation").email,
                token: vm.bot_response_token_value,
                role: vm.$session.get("UserInformation").role,
                refreshed_or_closed: vm.refreshed_or_closed,
                chat: "/" + response.data.responses[i].intent,
                source: "Web"
              })
              .then(response => {
                vm.handle_response(response);
              });
          } else if (
            vm.companyid == "3x5ive99534" &&
            response.data.responses[i].intent != undefined &&
            response.data.responses[i].intent == "confusion"
          ) {
            vm.confusion_message("/need_help");
          } else if (response.data.responses[i].buttons != undefined) {
            vm.load_buttons(response.data.responses[i], i);
          } else if (response.data.responses[i].custom != undefined) {
            //CHange  the condition here
            if (
              response.data.responses[i].custom.type != undefined &&
              response.data.responses[i].custom.type == "multiselect_dropdown"
            ) {
              vm.multiselect_load(response.data.responses[i], i);
            } else if (
              response.data.responses[i].custom.type != undefined &&
              response.data.responses[i].custom.type == "table"
            ) {
              vm.load_table(response.data.responses[i], i);
            }
          }
          //this one for foreignxchange
          else if (
            response.data.responses[i].text != undefined &&
            (response.data.responses[i].text.toLowerCase() ==
              "sorry i am not getting your question" ||
              response.data.responses[i].text.toLowerCase() ==
                "is there anything i can help you with?")
          ) {
            if (
              vm.$session.get("UserInformation").license_key ==
                ".eJxTcssvSs1Mz6tIzkjMS081NDexNIQKKUDFMkpKCoqt9PXLy8v10lBU6yXn5-olluobGRha6hqY6xqYKBgaWBkZW5ma6hmbm5gYmSoBAGa9Hp0.XR3Tuw.X77F_7LDtOLp2Vt9snFDSo31nTw" ||
              vm.$session.get("UserInformation").license_key ==
                ".eJxTci4tLsnPTS3ySCwoyMxLLS62NDW0MIWJKsCFM0pKCoqt9PXLy8v1kjOKE_USU_WNDAwtdQ3MdQ2NFAwNrYDIxFzPxMTS0tJICQBjZxux.XShq8w.Pgo5cmKwMQFnYUsscpojwEqDXQw"
            ) {
              vm.initiate_support_chat();
            } else {
              vm.chat.push({
                receiving: true,
                received: "Sorry I am not getting your question",
                conversation_only: true,
                time: vm.generate_time()
              });
              vm.update_scrollbar("upto_end", "response");
            }
          } else {
            var msg = {
              conversation_only: true,
              time:
                i == response.data.responses.length - 1
                  ? vm.generate_time()
                  : null
            };
            if (response.data.responses.length == 0) {
              msg.received = "Sorry we are not getting your question.";
              msg.receiving = true;
            } else if (
              response.data.responses[i].text != undefined &&
              response.data.responses[i].text.includes(".pdf")
            ) {
              vm.display_pdf_chat(response.data.responses[i].text);
            } else if (
              response.data.responses[i].text != undefined &&
              !response.data.responses[i].text.includes(
                "Download your manifest here"
              )
            ) {
              msg.received = response.data.responses[i].text;
              msg.receiving = true;
              msg.image = response.data.responses[i].img;
              msg.videos =
                response.data.responses[i].video == null
                  ? []
                  : response.data.responses[i].video;
              vm.chat.push(msg);
              if (i == 0) {
                setTimeout(() => {
                  vm.to_scroll = true;
                  if (
                    $(".chat-body")
                      .children()
                      .last()
                      .height() /
                      $(".chat-body").height() <
                    0.5
                  ) {
                    $(".chat-body").animate(
                      {
                        scrollTop: $(".chat-body").prop("scrollHeight")
                      },
                      1500
                    );
                  } else if (
                    $(".receiver")
                      .last()
                      .parent()
                      .height() /
                      $(".chat-body").height() >
                      0.5 &&
                    $(".receiver")
                      .last()
                      .parent()
                      .height() /
                      $(".chat-body").height() <
                      0.6
                  ) {
                    $(".chat-body").animate(
                      {
                        scrollTop: 0.9 * $(".chat-body").prop("scrollHeight")
                      },
                      1500
                    );
                  } else {
                    $(".chat-body").animate(
                      {
                        scrollTop: 0.75 * $(".chat-body").prop("scrollHeight")
                      },
                      1500
                    );
                  }
                }, 1000);
              }
              if (
                $(".chat-body").height() -
                  $(".chat-body").prop("scrollHeight") !=
                0
              ) {
                vm.to_scroll = true;
              }
            } else if (response.data.responses[i].intent == "chat_support") {
              msg.receiving = true;
              msg.received =
                "I am connecting you to one of our support agents. Please wait for a while.";
              vm.update_scrollbar("upto_end", "response");
              vm.chat.push(msg);
              vm.chat.push({
                receiving: true,
                received: "What's your name?",
                conversation_only: true,
                time: vm.generate_time()
              });
              vm.update_scrollbar("upto_end", "response");
              axios.get(api_calls.chat_group_api()).then(response => {
                vm.chat_group_name = response.data.chat_group_name;
                vm.live_chat_token = response.data.token;
                vm.live_chat_on = true;
                vm.chat_socket = new Socket(process.env.VUE_APP_LIVE_CHAT_WEBSOCKET_ENDPOINT, {
                  params: {
                    company: vm.$session.get("UserInformation").company_name,
                    chat_group_name: vm.chat_group_name,
                    token: vm.live_chat_token
                  }
                });
                vm.chat_socket.connect();
                vm.channel = vm.chat_socket.channel(
                  "customers_groups:" + vm.chat_group_name
                );
                vm.channel.join();
                vm.channel.push("customer_needs_support_agent");
                vm.channel.on("new_chat_message", res => {
                  if (res.sender != "customer") {
                    vm.chat.push({
                      receiving: true,
                      received: res.message,
                      time: vm.generate_time(),
                      conversation_only: true
                    });
                  }
                  vm.update_scrollbar("upto_end", "response");
                });
                vm.channel.on("stopped_chat", res => {
                  vm.chat.push({
                    conversation_only: true,
                    receiving: true,
                    received: "Support agent " + res.message,
                    time: this.generate_time()
                  });
                  vm.live_chat_on = false;
                  vm.update_scrollbar("upto_end", "response");
                });
                vm.channel.on("started_typing", res => {
                  vm.is_typing = true;
                  document.querySelector(".typing-indicator").style.display =
                    "block";
                });
                vm.channel.on("stopped_typing", res => {
                  vm.is_typing = false;
                  document.querySelector(".typing-indicator").style.display =
                    "none";
                });
              });
            } else if (
              response.data.responses[i].text != undefined &&
              (response.data.responses[i].text.includes(
                "Download your manifest here"
              ) ||
                response.data.responses[i].text.includes(/.pdf/))
            ) {
              vm.display_pdf_chat(response.data.responses[i]);
            } else if (response.data.responses[i].products.length > 0) {
              vm.display_products_chat(response.data.responses[i]);
            }
          }
          if (i < response.data.responses.length - 1) {
            i += 1;
            document.querySelector(".typing-indicator").style.display = "block";
            delay =
              response.data.responses[i].text != undefined &&
              response.data.responses[i].text.length > 10
                ? 2000
                : 500;
            handle_response();
          }
        }, delay);
      }
    },
    push_msg(responses, response) {
      var index = 0;
      var vm = this;
      var delay = response[index].text.length > 10 ? 2000 : 500;
      push_chat(response[index], delay);
      this.refreshed_or_closed = true;
      function push_chat(msg, time_delay) {
        document.querySelector(".typing-indicator").style.display = "block";
        setTimeout(() => {
          document.querySelector(".typing-indicator").style.display = "none";

          if (responses.data.responses[index].buttons != undefined) {
            vm.load_buttons(
              responses.data.responses[index],
              "is_button",
              "welcome_message"
            );
          } else {
            vm.chat.push({
              conversation_only: true,
              receiving: true,
              received: msg.text,
              time:
                index == response.length - 1 ? vm.generate_time() : undefined
            });
          }

          $(".time")
            .last()
            .css("display", "none");
          setTimeout(() => {
            $(".time")
              .last()
              .css("display", "block");

            if (index < response.length - 1) {
              index += 1;
              delay = response[index].text.length > 10 ? 2000 : 500;
              push_chat(response[index], delay);
            } else {
              // console.log('1');
              vm.refreshed_or_closed = false;
            }
          }, 500);
        }, time_delay);
      }
    },
    confusion_message(msg_string) {
      axios
        .post(api_calls.chatbot_response_cense(), {
          chat: msg_string,
          token: this.bot_response_token_value,
          username: this.$session.get("UserInformation").email,
          source: "Web",
          user_id: "",
          license_key: this.$session.get("UserInformation").license_key,
          data: "",
          role: this.$session.get("UserInformation").role,
          refreshed_or_closed: false
        })
        .then(response => {
          this.response_handling(response);
        });
    },
    fix_appointment() {
      event.preventDefault();
    },
    display_products_chat(message) {
      var msg = {
        conversation_only: true,
        time: this.generate_time()
      };
      msg.isproduct = true;
      msg.elements = message;
      this.chat.push(msg);
      this.$session.set("BotResponse_Conversation", this.chat);
      this.update_scrollbar("upto_end", "response");
    },
    display_pdf_chat(message) {
      var msg = {
        conversation_only: true,
        time: this.generate_time()
      };
      if (message.includes("Download your manifest here ")) {
        var temp = message.split("Download your manifest here ");
        msg.url = temp[1];
        msg.receiving = false;
        msg.file_name = message.split(/^.*[\\\/]/)[1];
        this.chat.push(msg);
        this.$session.set("BotResponse_Conversation", this.chat);
        this.update_scrollbar("upto_end", "response");
      } else {
        let url = message.match(
          /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/g
        )[0];
        msg.url = url;
        msg.receiving = false;
        msg.file_name = url.split(/^.*[\\\/]/)[1];
        this.chat.push(msg);
        this.$session.set("BotResponse_Conversation", this.chat);
        this.update_scrollbar("upto_end", "response");
      }
    },
    generate_payment(price, name) {
      var vm = this;
      var options = {
        key: "rzp_test_SnDTaPnncfliDt",
        amount: price * 100,
        company_id: this.$session.get("UserInformation").company_id,
        company_name: this.$session.get("UserInformation").company_name,
        name: "Cense AI",
        currency: "INR",
        description: "Instill Intelligence",
        image: "/img/cense_image.png", // COMPANY LOGO
        handler: function(response) {
          var contact = $('#contact[type="tel"]').value;
          var email = $('#email[type="email"]').value;
          vm.paymentid = response.razorpay_payment_id;

          if (transfer_account != null) {
            vm.transfer_payment(transfer_account, price * 100, "INR", name);
          }
        },
        prefill: {
          name: "", // pass customer name
          email: "", // customer email
          contact: "" //customer phone no.
        },
        notes: {
          address: "address" //customer address
        },
        theme: {
          color: "#283777" // screen color
        }
      };
      var rzp1 = new Razorpay(options);
      rzp1.open();
      event.preventDefault();
    },
    transfer_payment(account, amount, currency, name) {
      axios
        .post("https://api.razorpay.com/1/transfers", {
          auth: {
            rzp_test_SnDTaPnncfliDt: "llxEKbgABH8Lx4XApex9cGzj"
          },
          data: {
            account: account,
            amount: amount,
            currency: currency
          }
        })
        .then(response => {
          // if(this.user_data.api_key!='') {
          this.shopify_order_create(name);
          // }
        });
    },
    shopify_order_create(name) {},
    click_prompt(type) {
      this.live_chat_on = false;
      var divclickpopup = event.target.innerText;
      setTimeout(() => {
        document.querySelector(".typing-indicator").style.display = "none";
      }, 500);
      document.querySelector(".typing-indicator").style.display = "block";
      if (type != "collapsible") {
        axios
          .post(api_calls.prompt_url(), {
            uid: "cense",
            company_id: this.$session.get("UserInformation").company_id,
            license_key: this.$session.get("UserInformation").license_key,
            chat: event.target.innerText,
            level: event.target.attributes.value.nodeValue
          })
          .then(response => {
            if (response.data.collapsible == true) {
              this.create_chat(response.data, "isprompt");
              document.querySelector(".typing-indicator").style.display =
                "none";
            } else if (
              response.data.extras != undefined &&
              response.data.extras[0].Type == "TABLE"
            ) {
              this.create_chat(response.data, "istable");
              document.querySelector(".typing-indicator").style.display =
                "none";
            } else {
              if (response.data != "Oops! Something went wrong!") {
                this.create_chat(response.data, "isprompt");
                document.querySelector(".typing-indicator").style.display =
                  "none";
              } else if (response.data == "Oops! Something went wrong!") {
                this.chat.push(response.data);
                this.$session.set("BotResponse_Conversation", this.chat);
                this.update_scrollbar();
                document.querySelector(".typing-indicator").style.display =
                  "none";
              }
            }
          });
      } else if (type == "collapsible") {
        axios
          .post(api_calls.prompt_url(), {
            uid: "cense",
            company_id: this.$session.get("UserInformation").company_id,
            license_key: this.$session.get("UserInformation").license_key,
            chat: ""
          })
          .then(response => {
            this.chat.push(response.data);
            this.update_scrollbar("upto_end", "response");
            this.$session.set("BotResponse_Conversation", this.chat);
          });
      }
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
    stop_typing: debounce(vm => {
      vm.channel.push("stopped_typing");
    }, 5000),
    scroll_down() {
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
    load_buttons(message, index, type) {
      var msg = {
        conversation_only: true,
        buttons_list: [],
        button_prefix: message.prefix,
        custom_buttons: true,
        receiving: true,
        received: message.text,
        time: this.generate_time(),
        removable: type == "welcome_message" ? false : true
      };
      if (message.buttons.length == 3) {
        if (
          message.buttons[0].title == "Exchange Rate" &&
          message.buttons[1].title == "Track My Parcel" &&
          message.buttons[2].title == "Call Helpdesk"
        ) {
          msg.removable = false;
        }
      }
      if (
        message.text == "Would you like to share your name and number?" &&
        this.isexchange
      ) {
        $("#response_bot_text").prop("disabled", true);
      }
      for (var i in message.buttons) {
        if (msg.button_prefix != null) {
          msg.buttons_list.push({
            title: message.buttons[i].title,
            value: msg.button_prefix + message.buttons[i].value
          });
        } else {
          msg.buttons_list.push({
            title: message.buttons[i].title,
            value: message.buttons[i].value
          });
        }
        if (
          msg.buttons_list[i].title == "No" &&
          message.text != "Can I help you with anything else?" &&
          this.companyid == "clinicaltrials81352"
        ) {
          msg.buttons_list[i].value = "isdisabled";
        }
      }
      setTimeout(() => {
        this.chat.push(msg);
        if (index == "is_button" || index == 0) {
          setTimeout(() => {
            if (
              $(".chat-body")
                .children()
                .last()
                .height() /
                $(".chat-body").height() <
              0.5
            ) {
              $(".chat-body").animate(
                {
                  scrollTop: $(".chat-body").prop("scrollHeight")
                },
                1500
              );
            } else {
              $(".chat-body").animate(
                {
                  scrollTop: $(".chat-body").prop("scrollTop") + 50
                },
                1500
              );
            }
          }, 1000);
        } else {
          this.to_scroll = true;
        }
        this.$session.set("BotResponse_Conversation", this.chat);
      }, 2500);
    },
    multiselect_load(message, index) {
      var msg = {
        conversation_only: true,
        multiselect_values: message.custom.values,
        placeholder: message.custom.placeholder,
        is_multiselect: true,
        receiving: true,
        received: message.text,
        time: this.generate_time()
      };
      this.chat.push(msg);
    },
    load_table(message, index) {
      let msg = {
        conversation_only: true,
        col_list: Object.keys(message.custom.values[0]),
        table_value: message.custom.values,
        receiving: true,
        received: message.text,
        is_table: true,
        time: this.generate_time()
      };

      setTimeout(() => {
        this.chat.push(msg);
        if (index == 0) {
          setTimeout(() => {
            if (
              $(".chat-body")
                .children()
                .last()
                .height() /
                $(".chat-body").height() <
              0.5
            ) {
              $(".chat-body").animate(
                {
                  scrollTop: $(".chat-body").prop("scrollHeight")
                },
                1500
              );
            } else {
              $(".chat-body").animate(
                {
                  scrollTop: 0.7 * $(".chat-body").prop("scrollHeight")
                },
                1500
              );
            }
          }, 1000);
        } else {
          $(".chat-body").animate(
            {
              scrollTop: $(".chat-body").prop("scrollTop") + 100
            },
            1500
          );
          this.to_scroll = true;
        }
      }, 2500);
    },
    create_chat(message, type) {
      var currency_list = [];
      if (type == "istable") {
        axios
          .get("https://api.exchangeratesapi.io/latest", {
            params: {
              base: "AUD"
            }
          })
          .then(response => {
            for (var i in message.extras[0].TABLE) {
              if (message.extras[0].TABLE[i].PROP == "TR") {
                currency_list.push({
                  currency_title: message.extras[0].TABLE[i].TD,
                  currency_value: parseFloat(
                    Math.round(
                      response.data.rates[message.extras[0].TABLE[i]["TD_1"]] *
                        100
                    ) / 100
                  ).toFixed(4),
                  type: "TR"
                });
              } else if (
                message.extras[0].TABLE[i].PROP == "THEAD" &&
                !this.isexchange
              ) {
                currency_list.push({
                  country_name: message.extras[0].TABLE[i].TD,
                  currency_name: message.extras[0].TABLE[i].TD_1,
                  type: "THEAD"
                });
              }
            }
            ///
            this.currencyexchange_list = currency_list;
            ///
            this.chat.push({
              is_table: true,
              table_title: this.parse(message.title),
              table_list: currency_list
            });
            this.update_scrollbar();
            setTimeout(() => {
              document.querySelector(".typing-indicator").style.display =
                "none";
            }, 1000);
          });
      } else if (type == "isprompt") {
        if (message.level > 0) {
          this.chat.push(message);
          this.$session.set("BotResponse_Conversation", this.chat);
          this.level = message.level;
          this.update_scrollbar("upto_end", "response");
        } else {
          this.chat.push(message);
          this.first_click = true;
          this.level = message.level;
          this.update_scrollbar("upto_end", "response");
        }
      } else {
        this.chat.push(message);
      }
      this.$session.set("BotResponse_Conversation", this.chat);
    },
    submit_custom_form() {
      if (document.querySelector("#details_form") != null) {
        var element = document.querySelector("#details_form");
        element.addEventListener("submit", event => {
          event.preventDefault();
          // actual logic, e.g. validate the form
          var queryString = $("#details_form").serializeArray();
          if (this.form_payload == null) {
            this.form_payload = {};
            for (var i in queryString) {
              this.form_payload[queryString[i].name] = queryString[i].value;
            }
            axios
              .post(api_calls.bot_user_data(), {
                license_key: this.$session.get("UserInformation").license_key,
                data: this.form_payload,
                token: this.bot_response_token_value,
                username: this.$session.get("UserInformation").email,
                source: "Web",
                token: this.bot_response_token_value,
                role: this.$session.get("UserInformation").role
              })
              .then(response => {
                if (response.data == "Bot User Data Saved Successfully") {
                  $("#details_form :input").prop("disabled", true);
                  $("#details_form :button").prop("disabled", true);
                  this.update_scrollbar("upto_end", "response");
                  axios
                    .post(api_calls.chatbot_response_cense(), {
                      chat: "/details_form",
                      token: this.bot_response_token_value,
                      username: this.$session.get("UserInformation").email,
                      source: "Web",
                      user_id: "",
                      license_key: this.$session.get("UserInformation")
                        .license_key,
                      Details: JSON.stringify(this.form_payload),
                      role: this.$session.get("UserInformation").role,
                      refreshed_or_closed: false
                    })
                    .then(resp => {
                      this.response_handling(resp);
                      $(".chat-body").animate(
                        { scrollTop: $(".chat-body").prop("scrollHeight") },
                        1000
                      );
                    });
                }
              })
              .catch(e => {
                // console.log(e);
              });
          }
        });
      }
    },
    update_scrollbar(type, isresponse, iswelcome, delay_value) {
      var scroll_delay = iswelcome == "is_welcome" ? delay_value : 2000;
      document.querySelector(".typing-indicator").style.display = "block";
      if (isresponse == "response") {
        setTimeout(() => {
          document.querySelector(".typing-indicator").style.display = "none";
        }, scroll_delay);
      } else if (isresponse == "sender") {
        $(".chat-body").animate(
          {
            scrollTop: $(".chat-body").prop("scrollHeight")
          },
          750
        );
      }
      if (isresponse != "sender") {
        if (type == "upto_end") {
          setTimeout(() => {
            if (
              $(".chat-body").prop("scrollTop") <
              $(".chat-body").prop("scrollHeight")
            ) {
              if (
                $(".receiver")
                  .last()
                  .parent()
                  .height() /
                  $(".chat-body").height() >
                0.5
              ) {
                $(".chat-body").animate(
                  {
                    scrollTop: 0.75 * $(".chat-body").prop("scrollHeight")
                  },
                  1500
                );
                this.to_scroll = true;
              }
            } else if (
              $(".receiver")
                .last()
                .parent()
                .height() /
                $(".chat-body").height() <
              0.5
            ) {
              $(".chat-body").animate(
                {
                  scrollTop: $(".chat-body").prop("scrollHeight")
                },
                scroll_delay
              );
            }
          }, scroll_delay);
        } else {
          setTimeout(() => {
            document.querySelector(".chat-body").scrollTop =
              document.querySelector(".chat-body").scrollHeight -
              document.querySelector(".chat-body").lastChild.scrollHeight;
          }, 1000);
        }
      }
    },
    FXPaymentMode() {
      this.to_send = "/Foreignxchange17491_payment_mode";
      this.send_message(
        "is_prompt",
        "/Foreignxchange17491_payment_mode",
        "Payment"
      );
    },
    FXTrackingParcel() {
      this.to_send = "/Foreignxchange17491_tracking_parcel";
      this.send_message(
        "is_prompt",
        "/Foreignxchange17491_tracking_parcel",
        "Track My Parcel"
      );
    },
    // ForeignExchangeConversion() {
    //   this.to_send = "/Foreignxchange17491_exchange_rate";
    //   this.send_message(
    //     "is_prompt",
    //     "/Foreignxchange17491_exchange_rate",
    //     "Exchange Rate"
    //   );
    // },
    ForeignExchangeConversion() {
      // this.to_send = "/Foreignxchange17491_exchange_rate";
      this.to_send = '/Foreignxchange17491_exchange_rate{"BUY_OR_SELL": "BUY"}';
      this.send_message(
        "is_prompt",
        '/Foreignxchange17491_exchange_rate{"BUY_OR_SELL": "BUY"}',
        "Exchange Rate"
      );
    },

    ex1() {
      setTimeout(() => {
        if (document.getElementById("r1") != null) {
          $("#l1").val(1);
          for (let i = 0; i < this.currencyexchange_list.length; i++) {
            $("#country").append(
              `<option value="${this.currencyexchange_list[i].currency_value}">${this.currencyexchange_list[i].currency_title}</option>`
            );
          }
          $("#r1").text(document.getElementById("country").value);
          // document.getElementById("r1").addEventListener("keyup", function() {
          //   var x = document.getElementById("r1").innerText;
          //   var con = document.getElementById("country").value;
          //   x = x / con;
          //   x = x.toFixed(4);
          //   $("#l1").val(x);
          // });
          document.getElementById("l1").addEventListener("keyup", function() {
            var x = document.getElementById("l1").value;
            var con = document.getElementById("country").value;
            x = x * con;
            x = x.toFixed(4);
            $("#r1").text(x);
          });
          $(document).on("change", "#country", function() {
            // document.getElementById("country").addEventListener("keyup", function(){
            var x = document.getElementById("l1").value;
            var con = document.getElementById("country").value;
            x = x * con;
            x = x.toFixed(4);
            $("#r1").text(x);
          });
        }
      }, 100);
    },
    adddropdownvalue() {
      if (this.selected_indication[0] != undefined) {
        this.to_send = "";
        this.res = {};
        for (let i = 0; i < this.selected_indication.length; i++) {
          if (i == 0) {
            this.to_send = this.selected_indication[i].title;
          } else {
            this.to_send =
              this.to_send + ", " + this.selected_indication[i].title;
          }
          if (
            this.res[this.selected_indication[i].value.split('"')[1]] ==
            undefined
          ) {
            this.res[
              this.selected_indication[i].value.split('"')[1]
            ] = this.selected_indication[i].value.split('"')[3];
          } else {
            this.res[this.selected_indication[i].value.split('"')[1]] =
              this.res[this.selected_indication[i].value.split('"')[1]] +
              "," +
              this.selected_indication[i].value.split('"')[3];
          }
        }
        this.button_fill();
      } else {
        this.to_send = "";
        this.res = [];
      }
      this.button_fill();
    },
    closed_bot_chat(message,type){
      // debugger;
      // console.log(message);
      this.refreshed_or_closed=true;
      // lastclosedbotinputnode
      if(message.nodes[message.nodes.length-1].node_type=="header"&&message.nodes[message.nodes.length-1].node_type!=null&&!this.empty_string_validity.test(message.nodes[message.nodes.length-1].node_type)){
        if(message.nodes[message.nodes.length-1].title=="Display Message"){
          message.nodes[message.nodes.length-1].title=null;
        }
        this.chat.push({
          receiving: true,
          received: message.nodes[message.nodes.length-1].title,
          conversation_only: true,
          time: null
        });
      }

        // console.log(message.nodes.length);
      for(let i=0;i<message.nodes.length-1;i+= 1){
        // console.log(message.nodes);
        if(message.nodes[i].node_type=="node"&&message.nodes[i].ui_element.element_type=="button"&&!message.nodes[i].part_of_form){
          var msg = {
            conversation_only: true,
            buttons_list: [],
            button_prefix: null,
            custom_buttons: true,
            receiving: true,
            time: null,
            removable: type == "welcome_message" ? false : true
          };
          while(message.nodes[i].ui_element!=undefined){
            if(message.nodes[i].ui_element.element_type=="button"){
              msg.buttons_list.push({
                title: message.nodes[i].ui_element.button,
                value: message.nodes[i].ui_element.payload,
                id: message.nodes[i].node_id,
                node: message.nodes[i]
              });
            }
            // msg.buttons_list.push({
            //   title: message.nodes[i].ui_element.buttons,
            //   value: message.nodes[i].ui_element.payload,
            // });
            i++;
          }
          i--;
          this.chat.push(msg);
        } else if(message.nodes[i].node_type=="node"&&message.nodes[i].ui_element.element_type=="text_box"&&!message.nodes[i].part_of_form){
          this.chat.push({
            receiving: true,
            conversation_only: true,
            time: null,
            received: message.nodes[i].ui_element.message,
          });
          // var msg = {
          //   conversation_only: true,
          //   buttons_list: [],
          //   button_prefix: null,
          //   custom_buttons: true,
          //   receiving: true,
          //   received: '<input type="text" placeholder="'+message.nodes[i].ui_element.placeholder+'"name="closed_bot_node_'+i+'">',
          //   time: null,
          //   removable: type == "welcome_message" ? false : true
          // };
          this.refreshed_or_closed = false;
          // console.log('2');
          // this.chat.push(msg);
        } else if(message.nodes[i].node_type=="node"&&message.nodes[i].ui_element.element_type=="text_area"&&!message.nodes[i].part_of_form){
          var msg = {
            conversation_only: true,
            buttons_list: [],
            button_prefix: null,
            custom_buttons: true,
            receiving: true,
            // received: '<input type="text" placeholder="'+message.nodes[i].ui_element.placeholder+'"name="closed_bot_node_'+i+'">',
            received: '<textarea class="form-control" rows="4" cols="150"style="padding-left:12px;resize:none;overflow-y:auto;min-height:30px" placeholder="'+message.nodes[i].ui_element.placeholder+'"name="closed_bot_node_'+i+'"></textarea>',
            time: null,
            removable: type == "welcome_message" ? false : true
          };
          this.name_element_for_event_listener = "closed_bot_node_"+i;
          // msg.buttons_list.push({
          //     title: 'Submit',
          //     value: 'Submit',
          //   });
          this.chat.push({
            receiving: true,
            received: message.nodes[i].ui_element.message,
            conversation_only: true,
            time: null
          });
          this.chat.push(msg);
          this.is_text_area = true;
        } else if(message.nodes[i].node_type=="node"&&message.nodes[i].ui_element.element_type=="email"&&!message.nodes[i].part_of_form){
          this.isemail = true;
          // if(message.nodes[i].validation_successful == false){
          // this.chat.push({
          //   receiving: true,
          //   received: message.nodes[i].ui_element.error_msg,
          //   conversation_only: true,
          //   time: null
          // });
          // this.refreshed_or_closed = false;
          // }
          //  if(!message.nodes[i].validation_successful){
            this.chat.push({
              receiving: true,
              received: message.nodes[i].ui_element.message,
              conversation_only: true,
              time: null
            });
            this.refreshed_or_closed = false;
          //  }
          // var msg = {
          //   conversation_only: true,
          //   buttons_list: [],
          //   button_prefix: null,
          //   custom_buttons: true,
          //   receiving: true,
          //   received: '<input type="email" placeholder="'+message.nodes[i].ui_element.message+'"name="closed_bot_node_'+i+'">',
          //   time: null,
          //   removable: type == "welcome_message" ? false : true
          // };
          // // msg.buttons_list.push({
          // //     title: 'Submit',
          // //     value: 'Submit',
          // //   });
          // this.chat.push(msg);
        } else if(message.nodes[i].node_type=="node"&&message.nodes[i].ui_element.element_type=="phone_number"&&!message.nodes[i].part_of_form){
          this.is_phone_number = true;
          // if(message.nodes[i].validation_successful == false){
          // this.chat.push({
          //   receiving: true,
          //   received: message.nodes[i].ui_element.error_msg,
          //   conversation_only: true,
          //   time: null
          // });
          // this.refreshed_or_closed = false;
          // }
           this.chat.push({
            receiving: true,
            conversation_only: true,
            time: null,
            received: message.nodes[i].ui_element.message,
          });

          var msg = {
            receiving: true,
            conversation_only: true,
            time: null,
            received: '<div style="display:flex"> <select name="countrycode" class="form-control" style="padding-left:6px !important;padding-right:6px !important; width:40%;height:50px !important;"  >',
            // received: '',
          }
          // var dropdown = [];
            const data = CountryCodes;
            let option;
            for (let i = 0; i < data.length; i++) {
              // option = document.createElement('option');
              // option.text = data[i].country_code;
              // option.value = data[i].calling_code;
              // // dropdown.add(option);
              // msg.received=msg.received + option;
              msg.received= msg.received+'<option value= '+data[i].dial_code+'>'+data[i].code + "("+ data[i].dial_code +")" + '</option>'
            }
            msg.received=msg.received+'</select>';
            msg.received = msg.received + '<input type="text" class="form-control" style="padding-left:12px !important; height:50px !important;" autocomplete="off" name="phonenumber" id= "phonenumber" name="closed_bot_node_'+i+'">  </div>'
            // console.log(msg);
            this.chat.push(msg);
          // this.chat.push({
          // receiving: true,
          // received: message.nodes[i].ui_element.message,
          // conversation_only: true,
          // time: null
          // });
          this.refreshed_or_closed = true;
          this.name_element_for_event_listener = "phonenumber";
          // var msg = {
          //   conversation_only: true,
          //   buttons_list: [],
          //   button_prefix: null,
          //   custom_buttons: true,
          //   receiving: true,
          //   received: '<input type="email" placeholder="'+message.nodes[i].ui_element.message+'"name="closed_bot_node_'+i+'">',
          //   time: null,
          //   removable: type == "welcome_message" ? false : true
          // };
          // // msg.buttons_list.push({
          // //     title: 'Submit',
          // //     value: 'Submit',
          // //   });
          // this.chat.push(msg);
        } else if(message.nodes[i].node_type=="node"&&message.nodes[i].ui_element.element_type=="hyperlink"&&!message.nodes[i].part_of_form){
          this.chat.push({
            receiving: true,
            conversation_only: true,
            time: null,
            received: '<a href="'+message.nodes[i].ui_element.hyperlink+'" target="_blank">'+message.nodes[i].ui_element.hyperlink+'</a>',
          });
        } else if(message.nodes[i].node_type=="node"&&message.nodes[i].ui_element.element_type=="radio_buttons"&&!message.nodes[i].part_of_form){
           var msg = {
            receiving: true,
            conversation_only: true,
            time: null,
            received: '',
          }
          this.chat.push({
              receiving: true,
              received: message.nodes[i].ui_element.message,
              conversation_only: true,
              time: null
          });
          // msg.received = message.nodes[i].ui_element.message;
          for(let j=0;j<message.nodes[i].ui_element.radio_buttons.length;j++){
            msg.received=msg.received+'<input type="radio" name="'+message.nodes[i].node_id+'" value="'+message.nodes[i].ui_element.radio_buttons[j].title+'">'+message.nodes[i].ui_element.radio_buttons[j].title+'<br>';
          }
          this.chat.push(msg);
        } else if(message.nodes[i].node_type=="node"&&message.nodes[i].ui_element.element_type=="check_box"&&!message.nodes[i].part_of_form){
          var msg = {
            receiving: true,
            conversation_only: true,
            time: null,
            received: '',
          }
          this.chat.push({
              receiving: true,
              received: message.nodes[i].ui_element.message,
              conversation_only: true,
              time: null
          });
          for(let j=0;j<message.nodes[i].ui_element.values.length;j++){
            msg.received=msg.received+'<input type="checkbox" name="'+message.nodes[i].node_id+'" value="'+message.nodes[i].ui_element.values[j].title+'">'+message.nodes[i].ui_element.values[j].title+'<br>';
          }
          this.chat.push(msg);
        } else if(message.nodes[i].node_type=="node"&&message.nodes[i].ui_element.element_type=="dropdown"&&!message.nodes[i].part_of_form){
          var msg = {
            receiving: true,
            conversation_only: true,
            time: null,
            received: '<select name="'+message.nodes[i].node_id+'" class="form-control" ><option value disabled="disabled">'+message.nodes[i].ui_element.message+'</option>',
            // received: '',
          }

          for(let j=0;j<message.nodes[i].ui_element.dropdown.length;j++){
            msg.received=msg.received+'<option>'+message.nodes[i].ui_element.dropdown[j].title+'</option>';
          }
          msg.received=msg.received+'</select>';
          this.chat.push(msg);
        } else if(message.nodes[i].node_type=="node"&&message.nodes[i].ui_element.element_type=="image"&&!message.nodes[i].part_of_form){
          this.chat.push({
            receiving: true,
            conversation_only: true,
            time: null,
            received: '<img width="210px" height="140px" src="'+message.nodes[i].ui_element.image+'">',
          });
        } else if(message.nodes[i].node_type=="node"&&message.nodes[i].ui_element.element_type=="video"&&!message.nodes[i].part_of_form){
          this.chat.push({
            receiving: true,
            conversation_only: true,
            time: null,
            received: '<iframe width="210px" height="140px" src="'+message.nodes[i].ui_element.video+'"</iframe>',
          });
        } else if(message.nodes[i].node_type=="node"&&message.nodes[i].ui_element.element_type=="message"&&!message.nodes[i].part_of_form){
          this.chat.push({
            receiving: true,
            conversation_only: true,
            time: null,
            received: message.nodes[i].ui_element.message,
          });
        } else if(message.nodes[i].node_type=="node"){
          var msg = {
            receiving: true,
            conversation_only: true,
            time: null,
            received: '',
          }
          var form='<form id="'+message.nodes[i].form_name.replace(' ','_')+'">';
          while(message.nodes[i].part_of_form){
            // form=form+'<br>'
            if(message.nodes[i].node_type=="node"&&message.nodes[i].ui_element.element_type=="text_box"){
              form=form+'<div class="form-group">';
              form=form+'<p style="margin-bottom:0px;font-weight:450;font-size:15px;">'+message.nodes[i].header+'</p>';
              form=form+'<input name="'+message.nodes[i].header+'" class="form-control" style="padding-left:10px !important" type="text" placeholder="'+message.nodes[i].ui_element.placeholder+'"name="closed_bot_node_'+i+'">';
              form=form+'</div>';

            } else if(message.nodes[i].node_type=="node"&&message.nodes[i].ui_element.element_type=="dropdown"){
              form=form+'<div class="form-group">';
              form=form+'<p style="margin-bottom:0px;font-weight:450;font-size:15px;">'+message.nodes[i].header+'</p>';
              form=form+'<select name="'+message.nodes[i].header+'" class="form-control" >'
              for(let j=0;j<message.nodes[i].ui_element.dropdown.length;j++){
                form=form+'<option>'+message.nodes[i].ui_element.dropdown[j].title+'</option>';
              }
              form=form+'</select>';
              form=form+'</div>';
            } else if(message.nodes[i].node_type=="node"&&message.nodes[i].ui_element.element_type=="check_box"){
              form=form+'<div class="form-group">';
              form=form+'<p style="margin-bottom:0px;font-weight:450;font-size:15px;">'+message.nodes[i].header+'</p>';
              for(let j=0;j<message.nodes[i].ui_element.values.length;j++){
                form=form+'<input type="checkbox" name="'+message.nodes[i].header+'" value="'+message.nodes[i].ui_element.values[j].title+'">'+message.nodes[i].ui_element.values[j].title+'<br>';
              }
              form=form+'</div>';
            } else if(message.nodes[i].node_type=="node"&&message.nodes[i].ui_element.element_type=="radio_buttons"){
              form=form+'<div class="form-group">';
              form=form+'<p style="margin-bottom:0px;font-weight:450;font-size:15px;">'+message.nodes[i].header+'</p>';
              for(let j=0;j<message.nodes[i].ui_element.radio_buttons.length;j++){
                form=form+'<input type="radio" name="'+message.nodes[i].header+'" value="'+message.nodes[i].ui_element.radio_buttons[j].title+'">'+message.nodes[i].ui_element.radio_buttons[j].title+'<br>';
              }
              form=form+'</div>';
            }
            // form=form+'<br>'
            i++
          }
          i--;
          form = form+'<button type="submit" class="btn btn-primary">Submit</button></form>'
          this.isformon=true;
          this.form_name=message.nodes[i].form_name.replace(' ','_');
          msg.received=form;
          this.chat.push(msg);
          this.submit_closed_form_data();
        }
        this.chat.push({
          receiving: true,
          conversation_only: true,
          time: this.generate_time(),
          received: null,
        });
        if(message.nodes[i].ui_element.element_type!='message'&&message.nodes[i].ui_element.element_type!='image'&&message.nodes[i].ui_element.element_type!='video'&&message.nodes[i].ui_element.element_type!='button'&&message.nodes[i].ui_element.element_type!='hyperlink'){
          this.lastclosedbotinputnode=this.chat.length-1;
          this.selectednodeid=message.nodes[i];
        }
        if(message.nodes[i].ui_element.element_type=='button'){
          this.lastclosedbotinputnode=this.chat.length-2;
          this.selectednodeid=message.nodes[i];
        }
        if(message.nodes[i].is_leaf){
          this.isclosedboton=false;
          this.refreshed_or_closed=false;
          this.refreshed_or_closed=true;
        }
      }
      setTimeout(() => {
        var vm = this;
        vm.to_scroll = true;
        if (
          $(".chat-body")
            .children()
            .last()
            .height() /
            $(".chat-body").height() <
          0.5
        ) {
          $(".chat-body").animate(
            {
              scrollTop: $(".chat-body").prop("scrollHeight")
            },
            1500
          );
        } else if (
          $(".receiver")
            .last()
            .parent()
            .height() /
            $(".chat-body").height() >
            0.5 &&
          $(".receiver")
            .last()
            .parent()
            .height() /
            $(".chat-body").height() <
            0.6
        ) {
          $(".chat-body").animate(
            {
              scrollTop: 0.9 * $(".chat-body").prop("scrollHeight")
            },
            1500
          );
        } else {
          $(".chat-body").animate(
            {
              scrollTop: 0.75 * $(".chat-body").prop("scrollHeight")
            },
            1500
          );
        }
        if($(".chat-body").scrollTop()==0){
          this.to_scroll=false;
        }
        // console.log($('[name='+vm.name_element_for_event_listener+']'))
        if(vm.name_element_for_event_listener != null){
          $('[name='+vm.name_element_for_event_listener+']')[0].addEventListener('keyup', vm.append_message_to_chatbox)
        }
      }, 1000);
    },
    submit_closed_form_data(type,message){
      // debugger;
      // console.log(type, 'Hello Harsh');
      if (document.querySelector("#chat"+(this.lastclosedbotinputnode-1)) != null&&type=='is_button'&&message.title=="Submit"){
        var element = document.querySelector("#chat"+(this.lastclosedbotinputnode+1));
        var queryString = $("#chat"+(this.lastclosedbotinputnode-1)+" :input").serializeArray();
        if(this.closed_form_reply_data==null){
          document.querySelector(".typing-indicator").style.display = "block";
          this.closed_form_reply_data={};
          for (var i in queryString) {
            this.closed_form_reply_data[queryString[i].name] = queryString[i].value;
          }
          for (var i in queryString) {
            this.closed_form_reply_data.queryString[i].name.push(queryString[i].value);;
          }
          axios
            .post(api_calls.closed_form_response_api(),{
              license_key: this.$session.get("UserInformation").license_key,
              uid: this.$session.get("UserInformation").email,
              chat: this.closed_form_reply_data,
              node_selected: this.selectednodeid,
              bot_name: this.bot_name,
              conversation_id : this.conversation_id,
            })
            .then(response=>{
              document.querySelector(".typing-indicator").style.display = "none";
              this.closed_form_reply_data=null;
              this.closed_bot_chat(response.data);
            });
        }
      } else if(type=='is_button'){
        this.refreshed_or_closed = true;
        this.chat.push({
          sent: message.title,
          sending: true,
          time: this.generate_time(),
          conversation_only: true,
          delivered: true,
          dropdown: ""
        });
        document.querySelector(".typing-indicator").style.display = "block";
        axios
          .post(api_calls.closed_form_response_api(),{
            license_key: this.$session.get("UserInformation").license_key,
            uid: this.$session.get("UserInformation").email,
            chat: message.title,
            // node_selected: {node_id: message.id},
            node_selected:  message.node,
            conversation_id : this.conversation_id,
            bot_name: this.bot_name,
          })
          .then(response=>{
            document.querySelector(".typing-indicator").style.display = "none";
            this.closed_form_reply_data=null;
            this.closed_bot_chat(response.data);
          });
      } else if(type==undefined&&!this.isformon && !this.isemail &&!this.is_phone_number && this.is_text_area){
        this.disable_name_element_for_event_listener();
        // $('[name='+this.name_element_for_event_listener+']').attr("disabled", 'disabled')
        // this.name_element_for_event_listener = null;
        var element = document.querySelector("#chat"+(this.lastclosedbotinputnode+1));
        var queryString = $("#chat"+(this.lastclosedbotinputnode-1)+" :input").serializeArray();
        if(this.closed_form_reply_data==null){
          document.querySelector(".typing-indicator").style.display = "block";
          this.closed_form_reply_data={};
          for (var i in queryString) {
            this.closed_form_reply_data[queryString[i].name] = [];
          }
          for (var i in queryString) {
            this.closed_form_reply_data[queryString[i].name].push(queryString[i].value);;
          }
          this.chat.push({
            sent: this.to_send,
            sending: true,
            time: this.generate_time(),
            conversation_only: true,
            delivered: true,
            dropdown: ""
          });
          axios
            .post(api_calls.closed_form_response_api(),{
              license_key: this.$session.get("UserInformation").license_key,
              uid: this.$session.get("UserInformation").email,
              chat: this.to_send,
              node_selected: this.selectednodeid,
              conversation_id : this.conversation_id,
              bot_name: this.bot_name,
            })
            .then(response=>{
              document.querySelector(".typing-indicator").style.display = "none";
              this.closed_form_reply_data=null;
              this.closed_bot_chat(response.data);
            });
        }
      } else if(type==undefined&&this.isformon && !this.isemail &&!this.is_phone_number){
        if(document.querySelector("#"+this.form_name)!=null){
          var element = document.querySelector("#"+this.form_name);
          element.addEventListener("submit", event => {
            event.preventDefault();
            var queryString = $("#"+this.form_name).serializeArray();
            if (this.closed_form_reply_data == null) {
              document.querySelector(".typing-indicator").style.display = "block";
              this.closed_form_reply_data = {};
              for (var i in queryString) {
                this.closed_form_reply_data[queryString[i].name] = [];
              }
              for (var i in queryString) {
                this.closed_form_reply_data[queryString[i].name].push(queryString[i].value);;
              }
              axios
                .post(api_calls.closed_form_response_api(),{
                  license_key: this.$session.get("UserInformation").license_key,
                  uid: this.$session.get("UserInformation").email,
                  chat: this.closed_form_reply_data,
                  node_selected: this.selectednodeid,
                  conversation_id : this.conversation_id,
                  bot_name: this.bot_name,
                })
                .then(response=>{
                  document.querySelector(".typing-indicator").style.display = "none";
                  $("#"+this.form_name+" :input").prop("disabled", true);
                  // console.log("#"+this.form_name+":input");
                  this.closed_form_reply_data=null;
                  this.closed_bot_chat(response.data);
                });
            }
          });
        }
      } else if(type==undefined&&this.isemail){
        // alert(this.to_send);
        if(document.querySelector("#chat"+(this.lastclosedbotinputnode-1)) != null){
          this.chat.push({
          sent: this.to_send,
          sending: true,
          time: this.generate_time(),
          conversation_only: true,
          delivered: true,
          dropdown: ""
        });

          var element = document.querySelector("#chat"+(this.lastclosedbotinputnode+1));
          var queryString = $("#chat"+(this.lastclosedbotinputnode-1)+" :input").serializeArray();
          var x = this.lastclosedbotinputnode-1
          // if(this.closed_form_reply_data==null){
            document.querySelector(".typing-indicator").style.display = "block";
            this.closed_form_reply_data={};
            axios
              .post(api_calls.closed_form_response_api(),{
                license_key: this.$session.get("UserInformation").license_key,
                uid: this.$session.get("UserInformation").email,
                chat: this.to_send,
                node_selected: this.selectednodeid,
                conversation_id : this.conversation_id,
                bot_name: this.bot_name,
              })
              .then(response=>{
                var error_variable = null;
                document.querySelector(".typing-indicator").style.display = "none";
                  for(let i=0; i<response.data.nodes.length - 1 ; i += 1){
                     if(response.data.nodes[i].validation_successful != undefined &&  response.data.nodes[i].validation_successful == false ){
                       error_variable = i;
                           this.chat.push({
                        receiving: true,
                        received: response.data.nodes[i].ui_element.error_msg,
                        conversation_only: true,
                        time: null
                      });
                      this.refreshed_or_closed = false;
                     }
                  }
                 if(error_variable == null){
                  this.closed_form_reply_data=null;
                  this.isemail = false
                  this.closed_bot_chat(response.data);
                 }

              });
        }
      }else if(type==undefined&&this.is_phone_number){
        if(document.querySelector("#chat"+(this.lastclosedbotinputnode-1)) != null){
          if(this.is_phone_number_otp == true){
            var dts = this.to_send;
            this.chat.push({
              sent: this.to_send,
              sending: true,
              time: this.generate_time(),
              conversation_only: true,
              delivered: true,
              dropdown: ""
            });
          }
          else {
              console.log(this.lastclosedbotinputnode);
              if(this.is_phone_number_err_msg){
              var x = $("#chat"+(this.lastclosedbotinputnode-1)+" :input").serializeArray();
              console.log("if loop");
              console.log(this.lastclosedbotinputnode);
              }
              else {
              console.log("else loop");
              var x = $("#chat"+(this.lastclosedbotinputnode-1)+" :input").serializeArray();
              }
              console.log(x);
              var dts = x[0].value + x[1].value;
              this.chat.push({
              sent: dts,
              sending: true,
              time: this.generate_time(),
              conversation_only: true,
              delivered: true,
              dropdown: ""
            });
          }
          // this.disable_name_element_for_event_listener();
          // var element = document.querySelector("#chat"+(this.lastclosedbotinputnode+1));
          // var queryString = $("#chat"+(this.lastclosedbotinputnode-1)+" :input").serializeArray();
          // if(this.closed_form_reply_data==null){
            document.querySelector(".typing-indicator").style.display = "block";
            this.closed_form_reply_data={};
            axios
              .post(api_calls.closed_form_response_api(),{
                license_key: this.$session.get("UserInformation").license_key,
                uid: this.$session.get("UserInformation").email,
                chat:dts,
                node_selected: this.selectednodeid,
                conversation_id : this.conversation_id,
                bot_name: this.bot_name,
              })
              .then(response=>{
                // console.log(this.chat);
                this.to_send = "";
                var error_variable = null;
                document.querySelector(".typing-indicator").style.display = "none";
                for(let i=0; i<response.data.nodes.length - 1 ; i += 1){
                     if(response.data.nodes[i].ui_element.validate == "phone_number" && response.data.nodes[i].validation_successful != undefined &&  response.data.nodes[i].validation_successful == false ){
                      this.is_phone_number_err_msg = true;
                      this.closed_form_reply_data=null;
                       error_variable = i;
                       console.log(response.data);
                      //  this.selectednodeid = response.data.nodes;
                           this.chat.push({
                        receiving: true,
                        received: response.data.nodes[i].ui_element.error_msg,
                        conversation_only: true,
                        time: null
                      });
                          var msg = {
                    receiving: true,
                    conversation_only: true,
                    time: null,
                    received: '<div style="display:flex"> <select name="countrycode" class="form-control" style="padding-left:6px !important;padding-right:6px !important; width:40%;height:50px !important;"  >',
                    // received: '',
                  }
                  console.log("reached here")
                  // var dropdown = [];
                    this.disable_name_element_for_event_listener();
                    const data = CountryCodes;
                    let option;
                    for (let i = 0; i < data.length; i++) {
                      // option = document.createElement('option');
                      // option.text = data[i].country_code;
                      // option.value = data[i].calling_code;
                      // // dropdown.add(option);
                      // msg.received=msg.received + option;
                      msg.received= msg.received+'<option value= '+data[i].dial_code+'>'+data[i].code + "("+ data[i].dial_code +")" + '</option>'
                    }
                    msg.received=msg.received+'</select>';
                    msg.received = msg.received + '<input type="text" class="form-control" style="padding-left:12px !important; height:50px !important;" autocomplete="off" name="phonenumber" id= "phonenumber" name="closed_bot_node_'+i+'">  </div>'
                    // console.log(msg);
                    this.chat.push(msg);
                  // this.chat.push({
                  // receiving: true,
                  // received: message.nodes[i].ui_element.message,
                  // conversation_only: true,
                  // time: null
                  // });
                  // this.disable_name_element_for_event_listener();

                  
                  this.refreshed_or_closed = true;
                  if(this.name_element_for_event_listener!= null){
                    $('[name='+this.name_element_for_event_listener+']').off('keyup', vm.append_message_to_chatbox)
                  }
                  this.name_element_for_event_listener = "phonenumber";
                  var vm = this;
                  this.lastclosedbotinputnode=this.chat.length;
                  console.log(this.lastclosedbotinputnode);
                  var len = $('[name='+vm.name_element_for_event_listener+']').length;
                  setTimeout(() => {
                    // if(vm.name_element_for_event_listener != null){
                    //   console.log($('[name='+vm.name_element_for_event_listener+']'))
                    //   if($('[name='+vm.name_element_for_event_listener+']').length>1){
                    //       console.log($('[name='+vm.name_element_for_event_listener+']')[len])
                          $('[name='+vm.name_element_for_event_listener+']')[len].addEventListener('keyup', vm.append_message_to_chatbox)
                      // }else {
                        $('[name='+vm.name_element_for_event_listener+']')[0].addEventListener('keyup', vm.append_message_to_chatbox)
                      // }
                    // }
                  }, 2000);
                      this.refreshed_or_closed = true;
                     } else if(response.data.nodes[i].ui_element.validate != undefined &&  response.data.nodes[i].ui_element.validate == "otp" && response.data.nodes[i].validation_successful == true ){
                        this.closed_form_reply_data=null;
                        this.selectednodeid = response.data.nodes[i];
                        error_variable = i;
                        this.is_phone_number_otp = true;
                        this.chat.push({
                        receiving: true,
                        received: response.data.nodes[i].ui_element.otp_question_label,
                        conversation_only: true,
                        time: null
                      });
                     } else if(response.data.nodes[i].ui_element.validate != undefined && response.data.nodes[i].ui_element.validate == "otp" && response.data.nodes[i].validation_successful == false  ){
                        this.closed_form_reply_data=null;
                        this.selectednodeid = response.data.nodes[i];
                        error_variable = i;
                        this.chat.push({
                        receiving: true,
                        received: response.data.nodes[i].ui_element.incorrect_otp_msg,
                        conversation_only: true,
                        time: null
                      });
                     }
                    this.refreshed_or_closed = false;
                    console.log("reached here2")
                  }
                if(error_variable == null){
                  this.closed_form_reply_data=null;
                  this.disable_name_element_for_event_listener();
                  // setTimeout(() => {
                    this.is_phone_number = false;
                  // }, 1);
                  this.closed_bot_chat(response.data);
                }
              });
          // }
        }
      } else if(type==undefined&&!this.isformon && !this.isemail &&!this.is_phone_number && !this.is_text_area){
         this.chat.push({
          sent: this.to_send,
          sending: true,
          time: this.generate_time(),
          conversation_only: true,
          delivered: true,
          dropdown: ""
        });
          axios
            .post(api_calls.closed_form_response_api(),{
              license_key: this.$session.get("UserInformation").license_key,
              uid: this.$session.get("UserInformation").email,
              chat: this.to_send,
              node_selected: this.selectednodeid,
              conversation_id : this.conversation_id,
              bot_name: this.bot_name,
            })
            .then(response=>{
              document.querySelector(".typing-indicator").style.display = "none";
              this.closed_form_reply_data=null;
              this.closed_bot_chat(response.data);
            });
      }
    },
    getdata(){
      if(!this.isformon && !this.is_phone_number){
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
    append_message_to_chatbox(){
      console.log(this.name_element_for_event_listener, this.is_phone_number);
      
      console.log($('[name='+this.name_element_for_event_listener+']'));
      if(this.is_text_area){
        this.to_send = $('[name='+this.name_element_for_event_listener+']')[0].value;
        this.button_fill();
      }
      if(this.is_phone_number){
        var len = $('[name='+this.name_element_for_event_listener+']').length;
        this.to_send = $('[name='+this.name_element_for_event_listener+']')[len-1].value;      
        }
    },
    disable_name_element_for_event_listener(){
      // console.log("We are here disabled function")
      $('[name='+this.name_element_for_event_listener+']').attr("disabled", 'disabled')
        // $('[name='+this.name_element_for_event_listener+']').remove();
      this.name_element_for_event_listener = null;
      if(this.is_phone_number){
        $('[name=countrycode]').attr("disabled", 'disabled')
        // $('[name=countrycode]').remove();
      }
    },
    go_to_design_bots_page(){
      this.$router.push('/bot/designbot')
    }

    //sell function for foreign exchange
    // ex2() {
    //   setTimeout(() => {
    //     if (document.getElementById("r2") != null) {
    //       $("#l2").val(1);
    //       for (let i = 0; i < this.currencyexchange_list.length; i++) {
    //         $("#country2").append(
    //           `<option value="${this.currencyexchange_list[i].currency_value}">${this.currencyexchange_list[i].currency_title}</option>`
    //         );
    //       }
    //       $("#r2").val(document.getElementById("country2").value);
    //       document.getElementById("r2").addEventListener("keyup", function() {
    //         var x = document.getElementById("r2").value;
    //         var con = document.getElementById("country2").value;
    //         x = x / con;
    //         x = x.toFixed(4);
    //         $("#l2").val(x);
    //       });
    //       document.getElementById("l2").addEventListener("keyup", function() {
    //         var x = document.getElementById("l2").value;
    //         var con = document.getElementById("country2").value;
    //         x = x * con;
    //         x = x.toFixed(4);
    //         $("#r2").val(x);
    //       });
    //       $(document).on("change", "#country2", function() {
    //         // document.getElementById("country2").addEventListener("keyup", function(){
    //         var x = document.getElementById("l2").value;
    //         var con = document.getElementById("country2").value;
    //         x = x * con;
    //         x = x.toFixed(4);
    //         $("#r2").val(x);
    //       });
    //     }
    //   }, 3000);
    // }
  }
};
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
.chat-row.sender > .chat {
  background-color: #283879;
  color: #fff;
  font-weight: 450;
}
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

#details_form .form-group,
#details_form .form-group input {
  width: 25vw !important;
}

#details_form,
#details_form .form-group,
#details_form .form-group input {
  box-sizing: content-box !important;
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
  background: #fff !important;
  color: #2b3184 !important;
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

.sender .chat {
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