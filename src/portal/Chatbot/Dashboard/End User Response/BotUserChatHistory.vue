<template>
  <div class="table-box">
    <div class="spinner" id="spinner" v-show="show_loader"></div>
    <div
      v-if="selected != 'general_chat_history'"
      class="table-responsive"
      style="min-height: 349px"
    >
      <table class="table">
        <thead>
          <tr>
            <!-- <th scope="col">
                                <div class="form-check checkbox checkbox-success">
                                    <label class="form-check-label">
                                        <input class="form-check-input checkbox-success" type="checkbox" id="selectall">
                                        <span class="icn"></span>
                                    </label>
                                </div>
        </th>-->
            <th scope="col" style="width: 25%; text-align: center">
              USER NAME
            </th>
            <th scope="col" style="width: 20%; text-align: center">
              NAME OF TASK
            </th>
            <th scope="col" style="width: 20%; text-align: center">
              LAST INTERACTED ON
            </th>
            <th scope="col" style="width: 20%; text-align: center">
              TIME
            </th>
          </tr>
        </thead>
        <tr
          v-for="(user, index) in user_action_stats"
          :key="index"
          v-show="!show_loader"
        >
          <template v-if="user.username == 'Bot User' || user.username == ''">
            <td style="text-align: center">
              {{ user.username }}
            </td>
            <td>
              <tr
                v-for="(action, chat_index) in user.action_list"
                :key="chat_index"
              >
                <td style="width: 50%; text-align: center">
                  <a
                    href="javascript:void(0)"
                    data-toggle="modal"
                    data-target="#conversation_model"
                    @click="chat_conversation(index, chat_index)"
                    >{{ action.name }}</a
                  >
                </td>
              </tr>
            </td>

            <td style="text-align: center">
              <tr
                v-for="(action, chat_index) in user.action_list"
                :key="chat_index"
              >
                <td style="width: 10%">{{ action.date }}</td>
              </tr>
            </td>

            <td style="text-align: center">
              <tr
                v-for="(action, chat_index) in user.action_list"
                :key="chat_index"
              >
                <td style="width: 10%">{{ action.time }}</td>
              </tr>
            </td>
          </template>
        </tr>
      </table>
    </div>

    <!-- for general_chat_history -->
    <div
      v-if="selected == 'general_chat_history'"
      class="table-responsive"
      style="min-height: 349px"
    >
      <table class="table">
        <thead>
          <tr>
            <!-- <th
                  scope="col"
                  style="width: 20%; text-align: center"
              >
                  USER NAME
              </th> -->
            <th scope="col" style="width: 30%; text-align: center">
              {{ tlt("bot_user_unique_id_label") }}
            </th>
            <!-- <th
                  scope="col"
                  style="width: 20%; text-align: center"
              >
                  PHONE NUMBER
              </th> -->
            <th scope="col" style="width: 30%; text-align: center;">
              {{ tlt("bot_user_interacted_label") }}
            </th>
            <th scope="col" style="width: 40%; text-align: center">
              {{ tlt("bot_user_view_chat_label") }}
            </th>
            <!-- <th scope="col" style="width: 20%;text-align: center;">NAME OF TASK</th>
          <th scope="col" style="width: 20%;text-align: center;">DATE</th>
          <th scope="col" style="width: 20%;text-align: center;">TIME</th>-->
          </tr>
        </thead>
        <tr
          v-for="(user, index) in user_action_stats"
          :key="index"
          v-show="!show_loader"
        >
          <template>
            <!-- <td class="text-center">{{ user.username }}</td> -->
            <td class="text-center">{{ user.userid }}</td>
            <!-- <td class="text-center">{{ user.userphonenumber }}</td> -->
            <td class="text-center">
              {{ format_date_in_local_timezone(user.date) }}
            </td>
            <td style="width: 50%; text-align: center">
              <a
                href="javascript:void(0)"
                data-toggle="modal"
                data-target="#conversation_model1"
                @click="chat_date(index)"
                style="text-align: center"
                >{{ tlt("chat_history_bot_view_history") }}</a
              >
            </td>
          </template>
          <!-- <a
                href="javascript:void(0)"
                data-toggle="modal"
                data-target="#conversation_model1"
        >{{action.name}}</a>-->

          <!-- <td>
            <tr v-for="(action,chat_index) in user.action_list" :key="chat_index">
            <td style="width: 50%;text-align: center;">
                <a
                href="javascript:void(0)"
                data-toggle="modal"
                data-target="#conversation_model"
                @click="chat_conversation(index,chat_index)"
                >{{action.name}}</a>
            </td>
            </tr>
        </td>
        <td style="text-align:center;">
            <tr v-for="(action,chat_index) in user.action_list" :key="chat_index">
            <td style="width: 10%;">{{action.date}}</td>
            </tr>
        </td>
        <td style="text-align:center;">
            <tr v-for="(action,chat_index) in user.action_list" :key="chat_index">
            <td style="width: 10%;">{{action.time}}</td>
            </tr>
        </td>-->
        </tr>
      </table>
    </div>

    <div class="pagin-table" style="margin-top: 2%">
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item">
            <a
              class="page-link"
              href="javascript:void(0)"
              @click="page_require(page_no - 1)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8.667"
                height="15.204"
                viewBox="0 0 8.667 15.204"
              >
                <g
                  id="arrow-point-to-left"
                  transform="translate(105.806 15.204) rotate(180)"
                >
                  <path
                    id="Path_1136"
                    data-name="Path 1136"
                    d="M105.493,8.354l-6.537,6.537a1.065,1.065,0,1,1-1.506-1.506L103.235,7.6,97.45,1.817A1.065,1.065,0,0,1,98.956.312l6.537,6.537a1.065,1.065,0,0,1,0,1.505Z"
                    transform="translate(0 0)"
                    fill="#9499ae"
                  />
                </g>
              </svg>
            </a>
          </li>
          <li
            :class="'page-item ' + pagination_class(pageno)"
            v-for="pageno in page_array"
            :key="pageno"
          >
            <a
              v-if="pageno == '...s' || pageno == '...l'"
              class="page-link"
              href="javascript:void(0)"
              @click="page_require(pageno)"
              >...</a
            >
            <a
              v-if="pageno != '...s' && pageno != '...l'"
              class="page-link"
              href="#"
              @click="page_require(pageno)"
              >{{ pageno }}</a
            >
          </li>
          <li class="page-item">
            <a
              class="page-link"
              href="javascript:void(0)"
              @click="page_require(page_no + 1)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8.667"
                height="15.204"
                viewBox="0 0 8.667 15.204"
              >
                <g id="arrow-point-to-right" transform="translate(-97.139 0)">
                  <path
                    id="Path_1136"
                    data-name="Path 1136"
                    d="M105.493,8.354l-6.537,6.537a1.065,1.065,0,1,1-1.506-1.506L103.235,7.6,97.45,1.817A1.065,1.065,0,0,1,98.956.312l6.537,6.537a1.065,1.065,0,0,1,0,1.505Z"
                    transform="translate(0 0)"
                    fill="#9499ae"
                  />
                </g>
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <div
      v-if="selected != 'general_chat_history'"
      class="modal fade dash-modal"
      id="conversation_model"
      tabindex="-1"
      role="dialog"
      aria-labelledby="conversation_model"
      aria-hidden="true"
      style="margin-left: -1%"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/user-blue.png" alt />
              </div>
              <h3>{{ tlt("chat_history_header") }}</h3>
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
              <div v-for="(user, index) in user_reply" :key="index">
                <span class="d-flex">
                  <h5>{{ current_user }}: &nbsp;</h5>
                  <p>{{ user }}</p>
                </span>
                <span style="display: flex">
                  <h5>Bot: &nbsp;</h5>
                  <p>{{ bot_reply[index] }}</p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="selected == 'general_chat_history'"
      class="modal fade dash-modal"
      id="conversation_model1"
      tabindex="-1"
      role="dialog"
      aria-labelledby="conversation_model1"
      aria-hidden="true"
      style="margin-left: -1%"
    >
      <div
        class="modal-dialog modal-dialog-centered"
        role="document"
        style="max-width: 60%"
      >
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/user-blue.png" alt />
              </div>
              <h3>{{ tlt("chat_history_header") }}</h3>
            </div>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <img src="/img/close-icn.png" alt />
            </button>
            <!-- <button type="button" class="close" data-dismiss="modal" @click="close_modal">&times;</button> -->
            <div>
              <!-- <div>
                      <select
                        id="select_coversation_date"
                        v-model="selected_date"
                        class="form-control"
                        @change="chat_conversation"
                      >
                        <option
                          v-for="(date, index) in chat_dates"
                          :key="index"
                          :value="date"
                        >
                          {{ date }}
                        </option>
                      </select>
                    </div> -->
              <div class="form-group">
                <label>{{ tlt("time_range_label") }}</label>
                <multiselect
                  v-model="selected_date"
                  id="select_coversation_date"
                  :options="chat_dates"
                  :searchable="true"
                  :close-on-select="true"
                  :show-labels="false"
                  :allow-empty="false"
                  @input="chat_conversation"
                  :placeholder="tlt('select_time')"
                  :disabled-selected="false"
                  :hide-selected="false"
                  :max-height="200"
                >
                  <span>{{ selected_date }}</span>
                </multiselect>
              </div>
              <div v-show="chatDetails.length == 0">
                <content-loader
                  viewBox="0 0 180 360"
                  :speed="5"
                  primaryColor="#f3f3f3"
                  secondaryColor="#ecebeb"
                >
                  <rect x="40" y="3" rx="4" ry="4" width="350" height="14" />
                  <rect x="2" y="3" rx="4" ry="4" width="35" height="14" />
                  <rect x="40" y="23" rx="4" ry="4" width="350" height="14" />
                  <rect x="2" y="23" rx="4" ry="4" width="35" height="14" />
                  <rect x="40" y="45" rx="4" ry="4" width="350" height="14" />
                  <rect x="2" y="45" rx="4" ry="4" width="35" height="14" />
                  <rect x="40" y="66" rx="4" ry="4" width="350" height="14" />
                  <rect x="2" y="66" rx="4" ry="4" width="35" height="14" />
                  <rect x="40" y="88" rx="4" ry="4" width="350" height="14" />
                  <rect x="2" y="88 " rx="4" ry="4" width="35" height="14" />
                  <rect x="40" y="108" rx="4" ry="4" width="350" height="14" />
                  <rect x="2" y="108" rx="4" ry="4" width="35" height="14" />
                </content-loader>
              </div>
              <p></p>
              <div
                style="text-align:justify"
                v-for="(user, index) in chatDetails"
                :key="index"
              >
                <span
                  v-if="user.UserQuery != ''"
                  class="py-0 my-0"
                  style="display: flex; height-0%;"
                >
                  <h5
                    class="py-0 mt-2 mb-0"
                    style="float:left;width:3%; height:0%;"
                  >
                    Q:
                  </h5>
                  <p
                    class="py-0 mb-0"
                    style="word-break: break-all; margin-top:11px;"
                  >
                    {{ user.UserQuery }}
                  </p>
                </span>
                <div v-if="user.UserQuery != '' || checkintent(index)">
                  <span
                    v-for="(bot, index2) in user.BOTResponse"
                    :key="index2"
                    :style="check_bot_offers(user.BOTResponse)"
                  >
                    <h5
                      v-if="
                        bot.img != undefined ||
                          bot.text != undefined ||
                          bot.products != undefined ||
                          bot.offers != undefined ||
                          bot.template == 'utter_default' ||
                          bot.contact_us_email != undefined ||
                          bot.contact_us_phone_number != undefined ||
                          bot.buttons != undefined
                      "
                      class="py-0 mt-0 mb-0"
                      style="float:left;width:3%; margin-bottom:0px;!important"
                    >
                      A:
                    </h5>
                    <!-- <p style="margin-top:2px; margin-bottom:0px; width:100%" 
                            v-if="bot.contact_us_email != undefined"
                          >Please feel free to reachout to us at : <span v-html="bot.contact_us_email"></span></p> -->
                    <div
                      v-if="Boolean(bot.buttons) === true && bot.text == ''"
                      style="width: max-content;"
                    >
                      <strong
                        v-if="
                          Boolean(bot.buttons) === true &&
                            bot.buttons.length > 0 &&
                            bot.text == ''
                        "
                        style="color: dimgray;"
                      >
                        Options :</strong
                      >
                      <span
                        v-for="(button, index3) in bot.buttons"
                        :key="index3"
                        style="border: 1px solid #cccccc; cursor: default; padding: 2px;
                                      margin-right: 5px; background: #f2f2f2; border-radius: 5px;"
                      >
                        <span class="p-0 mb-1"> {{ button.title }}</span>
                      </span>
                    </div>
                    <p
                      style="margin-top:2px; margin-bottom:0px; width:100%"
                      v-if="bot.contact_us_email != undefined"
                      v-html="
                        messaging_platform_formating(bot.contact_us_email) +
                          messaging_platform_formating_number(
                            bot.contact_us_phone_number
                          )
                      "
                    ></p>
                    <p
                      style="margin-top:2px; margin-bottom:0px; width:100%"
                      v-if="bot.message != undefined"
                      v-html="confusion_message_formating(bot.message)"
                    ></p>
                    <div>
                      <p
                        style="margin-top:2px; margin-bottom:0px; width:100%;"
                        v-if="bot.text != undefined && bot.text != ''"
                        v-html="bot.text"
                      ></p>
                      <span v-if="bot.video != undefined && bot.video != ''"
                        ><a :href="bot.video" target="blank"
                          >Attach Video</a
                        ></span
                      >
                    </div>
                    <div
                      v-for="(offer, index4) in bot.offers"
                      :key="index4"
                      style="width:100%; margin-bottom:0px; padding-left:1.7rem"
                      class="pb-0"
                    >
                      <span
                        v-html="offer.offer"
                        v-if="bot.offers != undefined"
                      ></span>
                    </div>
                    <div
                      style="float:left;width:100%"
                      v-if="bot.img != undefined && bot.img != ''"
                    >
                      <img :src="bot.img" />
                    </div>
                    <div
                      style="height:140px; width:140px;position:relative"
                      v-if="bot.image != undefined && bot.image != ''"
                    >
                      <img
                        style="position:absolute;height:inherit"
                        :src="bot.image"
                      />
                    </div>

                    <!-- <p v-if="bot.intent!=undefined" >{{bot.intent}}</p> -->
                    <div
                      class="buy-products"
                      style="display: flex; overflow: auto hidden; float:left;width:100% "
                      @mousewheel="scroll_div"
                      v-if="bot.products != undefined"
                    >
                      <div
                        class="image-container"
                        v-for="(product, index1) in product_variation(
                          bot.products.products_list
                        )"
                        :key="index1"
                      >
                       <span v-if="bot.img != undefined && bot.img != ''" >                        <img
                          :src="check_image_type(product.img_url)"
                          class="center-block p-0 m-0"
                          style="height:140px; width:140px;"
                        /></span>
                        <p class="p-0 mb-1">{{ product.title }}</p>
                        <p class="p-0 mb-1">{{ product.price }}</p>
                        <!-- <p class="buy-now" @click="generate_payment(product.price)">Buy Now</p> -->
                      </div>
                    </div>
                  </span>
                </div>
                <!-- Showing Products -->
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
import api_calls from "@/portal/api_calls";
import Multiselect from "vue-multiselect";
import moment from "moment";
import { ContentLoader } from "vue-content-loader";
import swal from "sweetalert2";

export default {
  components: {
    Multiselect,
    ContentLoader
  },
  data() {
    return {
      number_of_rows: "",
      total_pages: 0,
      page_no: 1,
      per_page: 15,
      user_list: [],
      user_reply: [],
      bot_reply: [],
      chatDetails: [],
      action_stats: [],
      user_action_stats: [],
      current_user: "",
      timestamp: "",
      sender_id: [],
      selected: "general_chat_history",
      selected_date: "",
      selected_index: null,
      chat_dates: [],
      companyname: this.$session.get("UserInformation").company_name,
      companyid: this.$session.get("UserInformation").company_id,
      issearch: false,
      searchstring: "",
      spinnerOn: false,
      view_component_name: "portal_user",
      // fingerprintregex:/^[0-9]{10}$/,
      fingerprintregex: /^[0-9-+\/\s]{9,}$/,
      page_array: [],
      show_loader: false,
      contact_help_email: null,
      retail_web_framework: this.$session.get("retail_web_framework"),
      filter_chat_history: this.$session.get("filter_chat_history")
    };
  },
  mounted() {
    this.retail_web_framework = this.$session.get("retail_web_framework");
    $("#selectall").click(function() {
      if ($(this).is(":checked")) {
        $("input:checkbox").prop("checked", true);
      } else {
        $("input:checkbox").prop("checked", false);
      }
    });
    this.$root.$on("search_bot_user_chat_history", data => {
      this.searchstring = data;
      this.search_chat();
      // this.search_question();
    });
    this.$root.$on("load_bot_user_chat_history", data => {
      this.load_bot_user_chat_history();
    });
  },
  beforeDestroy() {
    this.$root.$off("search_bot_user_chat_history");
    this.$root.$off("load_bot_user_chat_history");
  },
  created() {
    this.load_product_settings();
    this.load_bot_user_chat_history();
  },
  methods: {
    format_date_in_local_timezone(date) {
      var testDateUtc = moment.utc(date);
      var localDate = moment(testDateUtc)
        .local()
        .toDate();
      // note: do not format time below to show hour and minute because "View Chat History" show all message of that date not specific hour-minute time.
      localDate = moment(localDate).format("ddd MMM D YYYY");
      return localDate.toString();
    },
    messaging_platform_formating(message) {
      return "Please feel free to reachout to us at : " + message;
    },
    messaging_platform_formating_number(message) {
      if (message != null) {
        return " or call us at :" + message;
      } else {
        return "";
      }
    },
    confusion_message_formating(message) {
      return message.split("{email}").join(this.contact_help_email);
    },
    load_product_settings() {
      this.show_loader = true;
      axios
        .post(
          api_calls.product_settings(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            is_get: true
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`
            }
          }
        )
        .then(response => {
          ////console.logresponse)
          var webframework = this.retail_web_framework;
          if(webframework){
            if (
            response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE.MSG_CODE 
          ) {
            this.contact_help_email = webframework === undefined ? response.data.data.details.contact_help_email:
              response.data.data[webframework + "_details"].contact_help_email;
          }
          // else {
          //   toastr.error("Internal Server Error");
          // }
          }else{
            if (
           
            response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE.MSG_CODE 
          ) {
            this.contact_help_email =
              response.data.data.details.contact_help_email;
          }
          // else {
          //   toastr.error("Internal Server Error");
          // }
          }
          
        })
        .catch(e => {
          this.show_loader = false;
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    check_image_type(image) {
      if (typeof image == "string") {
        return image;
      } else {
        return image.src;
      }
    },
    load_bot_user_chat_history() {
      this.page_no = 1;
      this.checked_list = [];
      this.searchstring = "";
      this.action_stats = [];
      this.user_action_stats = [];
      this.show_loader = true;
      axios
        .post(
          api_calls.action_stats_url(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`
            }
          }
        )
        .then(response => {
                    ////console.logresponse)

          this.action_stats = response.data.data.action_stats;
          this.action_stats.push({
            Hits: 1,
            Name: "general_chat_history"
          });
        })
        .catch(e => {
          this.show_loader = false;
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
      this.show_loader = true;
      axios
        .post(
          api_calls.general_chat_history(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            isshow: true,
            action: "general_chat_history",
            filter_chat_history: this.$session.get("filter_chat_history"),
            pageno: this.page_no,
            perpage: this.per_page,
            issearch: this.issearch
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`
            }
          }
        )
        .then(response => {
                    //console.logresponse , "chatttttttttttt")

          this.show_loader = false;
          this.user_action_stats = [];
          if(response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE.MSG_CODE){
              for (let i = 0; i < response.data.data.chatHistory.length; i++) {
                ////console.logresponse.data.data.chatHistory)
              // ////console.log
              //   this.fingerprintregex.test(response.data.data.chatHistory[i]._id.User)
              // );
              if (
                this.fingerprintregex.test(response.data.data.chatHistory[i]._id.User)
              ) {
                this.user_action_stats.push({
                  useremail: response.data.data.chatHistory[i].Email,
                  userphonenumber: response.data.data.chatHistory[i].PhoneNumber,
                  username:
                    response.data.data.chatHistory[i].UserName == null
                      ? "Guest user"
                      : response.data.data.chatHistory[i].UserName,
                  userid: response.data.data.chatHistory[i]._id.User,
                  date: response.data.data.chatHistory[i].Date
                });
                // ////console.logthis.user_action_stats, response.data.data.chatHistory[i]);
              } else {
                this.user_action_stats.push({
                  useremail: response.data.data.chatHistory[i]._id.User,
                  userphonenumber: response.data.data.chatHistory[i].PhoneNumber,
                  username:
                    response.data.data.chatHistory[i].UserName == null
                      ? "Guest user"
                      : response.data.data.chatHistory[i].UserName,
                  userid: response.data.data.chatHistory[i]._id.User,
                  date: response.data.data.chatHistory[i].Date
                });
              }
              // this.user_action_stats.push({
              //     useremail : response.data.data.chatHistory[i]._id.User,
              //     userphonenumber : response.data.data.chatHistory[i].PhoneNumber,
              //     username : response.data.data.chatHistory[i].UserName,
              // });
            }
          }else if(response.data.message.MSG_CODE == this.api_status_code.NO_DATA_AVAILABLE.MSG_CODE){
            swal({
                        text: response.data.message.MSG,
                        showCancelButton: false,
                        showConfirmButton: false,
                        type: "info",
                        toast:true,
                        position:"top-end",
                        timer:2500                       
                    });
          }else if(response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE){
            swal({
                        text: response.data.message.MSG,
                        toast: true,
                        showCancelButton: false,
                        showConfirmButton: false,
                        type: "error",
                       
                    });
          }
          //console.logresponse.data.pagination.total_data)
          this.number_of_rows = response.data.pagination.total_data == undefined ? 0 : response.data.pagination.total_data;
          this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
          this.setpagination(this.page_no);
          //console.logthis.total_pages)

        })
        .catch(e => {
          ////console.loge)
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
          this.show_loader = false;
        });
    },
    page_require(page_no) {
      this.show_loader = true;
  //console.log"clicked" , this.selected)
      if (this.selected != "general_chat_history") {
        // ////console.logthis.total_pages, page_no);

        if (page_no == 0 || page_no == this.total_pages + 1) {
         
        } else {
          // this.page_no = page_no;
          if (page == "...s") {
            this.page_no = Math.ceil((1 + this.page_no) / 2);
          } else if (page == "...l") {
            this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
          } else {
            this.page_no = page;
          }
          // this.spinnerOn = true;
          axios
            .post(
              api_calls.action_usage_stats_url(),
              {
                company_name: this.companyname,
                company_id: this.companyid,
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                // action: this.action_stats[index].Name,
                action: this.selected,
                page_no: this.page_no,
                per_page: this.per_page
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`
                }
              }
            )
            .then(response => {
                        ////console.logresponse)

              // this.spinnerOn = false;
              // this.user_list = [];
              // for (var i in response.data[0]) {
              //   this.intentlist.push({
              //     intent: response.data[0][i],
              //     email: response.data[1][i],
              //     created: response.data[2][i]
              //   });
              // }
            })
            .catch(e => {
              if (
                e.response.status === 410 ||
                e.response.status === 440 ||
                e.response.status === 409
              ) {
                this.$root.$emit("Session_Expired", e.response.data);
              }
            });
        }
      } else {
        if (page_no == 0 || page_no == this.total_pages + 1) {
          this.load_bot_user_chat_history();
        }
         else {
          if (page_no == "...s") {
            this.page_no = Math.ceil((1 + this.page_no) / 2);
          } else if (page_no == "...l") {
            this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
          } else {
            this.page_no = page_no;
          }
          // this.page_no = page_no;
          this.show_loader = true;
          axios
            .post(
              api_calls.general_chat_history(),
              {
                company_name: this.companyname,
                company_id: this.companyid,
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                isshow: true,
                action: this.selected,
                filter_chat_history: this.$session.get("filter_chat_history"),
                pageno: this.page_no,
                perpage: this.per_page,
                issearch: this.issearch
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`
                }
              }
            )
            .then(response => {
                        ////console.logresponse)

              this.show_loader = false;
              this.user_action_stats = [];
              for (let i = 0; i < response.data.data.chatHistory.length; i++) {
                ////console.logresponse.data.data.chatHistory)
                if (
                  this.fingerprintregex.test(
                    response.data.data.chatHistory[i]._id.User
                  )
                ) {
                  this.user_action_stats.push({
                    useremail: response.data.data.chatHistory[i].Email,
                    userphonenumber: response.data.data.chatHistory[i].PhoneNumber,
                    username: response.data.data.chatHistory[i].UserName,
                    userid: response.data.data.chatHistory[i]._id.User,
                    date: response.data.data.chatHistory[i].Date
                  });
                } else {
                  this.user_action_stats.push({
                    useremail: response.data.data.chatHistory[i]._id.User,
                    userphonenumber: response.data.data.chatHistory[i].PhoneNumber,
                    username: response.data.data.chatHistory[i].UserName,
                    userid: response.data.data.chatHistory[i]._id.User,
                    date: response.data.data.chatHistory[i].Date
                  });
                }
                // this.user_action_stats.push({
                //     useremail : response.data.data.chatHistory[i]._id.User,
                //     userphonenumber : response.data.data.chatHistory[i].PhoneNumber,
                //     username : response.data.data.chatHistory[i].UserName,
                // });
              }

              //console.logresponse.data.pagination.total_data)
          this.number_of_rows = response.data.pagination.total_data == undefined ? 0 : response.data.pagination.total_data;
          this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
          this.setpagination(this.page_no);
            })
            .catch(e => {
              ////console.loge)
              if (
                e.response.status === 410 ||
                e.response.status === 440 ||
                e.response.status === 409
              ) {
                this.$root.$emit("Session_Expired", e.response.data);
              }
            });
        }
      }
    },
    pagination_class(index) {
      if (index == this.page_no) {
        return " active";
      } else {
        return "";
      }
    },
    setpagination(page_no) {
      this.page_array = [];
      if (this.total_pages <= 7) {
        for (let i = 0; i < this.total_pages; i++) {
          this.page_array.push(i + 1);
        }
      } else if (page_no == 1) {
        for (let i = 0; i < 4; i++) {
          this.page_array.push(i + 1);
        }
        this.page_array.push("...l");
        this.page_array.push(this.total_pages);
      } else if (page_no == this.total_pages) {
        this.page_array.push(1);
        this.page_array.push("...s");
        for (let i = this.total_pages - 4; i < this.total_pages; i++) {
          this.page_array.push(i + 1);
        }
      } else if (page_no <= 4) {
        for (let i = 0; i < page_no + 3; i++) {
          this.page_array.push(i + 1);
        }
        this.page_array.push("...l");
        this.page_array.push(this.total_pages);
      } else if (page_no >= this.total_pages - 4) {
        this.page_array.push(1);
        this.page_array.push("...s");
        for (let i = page_no - 4; i < this.total_pages; i++) {
          this.page_array.push(i + 1);
        }
      } else {
        this.page_array.push(1);
        this.page_array.push("...s");
        for (let i = page_no - 3; i <= page_no + 3; i++) {
          this.page_array.push(i);
        }
        this.page_array.push("...l");
        this.page_array.push(this.total_pages);
      }
    },
    // view_action() {
    //   var action_name = event.target.value;
    //   this.selected = action_name;
    //   this.searchstring = "";
    //   if (action_name != "general_chat_history") {
    //     this.spinnerOn = true;
    //     axios
    //       .post(
    //         api_calls.action_usage_stats_url(),
    //         {
    //           companyname: this.companyname,
    //           companyid: this.companyid,
    //           email: this.$session.get("UserInformation").email,
    //           license_key: this.$session.get("UserInformation").license_key,
    //           token: this.$session.get("UserInformation").tokens,
    //           action: action_name,
    //           page_no: 1,
    //           per_page: this.per_page,
    //         },
    //         {
    //           headers: {
    //             Authorization: `Bearer ${this.$session.get("at")}`,
    //           },
    //         }
    //       )
    //       .then((response) => {
    //         this.spinnerOn = false;
    //         this.number_of_rows = response.data.number_of_rows;
    //         this.total_pages = Math.ceil(this.number_of_rows / this.per_page);
    //         this.user_action_stats = [];
    //         for (var i in response.data.users) {
    //           if (response.data.users[i].action_hits != 0) {
    //             let action_history = [];
    //             for (var j in response.data.users[i].action_hits) {
    //               action_history.push(response.data.users[i].action_hits[j]);
    //             }
    //             this.user_action_stats.push({
    //               username: response.data.users[i].username,
    //               action_list: action_history,
    //               sender_id: response.data.users[i].sender_id,
    //             });
    //           }
    //         }
    //       })
    //       .catch((e) => {
    //         if (
    //           e.response.status === 410 ||
    //           e.response.status === 440 ||
    //           e.response.status === 409
    //         ) {
    //           this.$root.$emit("Session_Expired", e.response.data);
    //         }
    //       });
    //   } else {
    //     this.spinnerOn = true;
    //     axios
    //       .post(
    //         api_calls.general_chat_history(),
    //         {
    //           companyname: this.companyname,
    //           companyid: this.companyid,
    //           email: this.$session.get("UserInformation").email,
    //           license_key: this.$session.get("UserInformation").license_key,
    //           token: this.$session.get("UserInformation").tokens,
    //           isshow: true,
    //           action: action_name,
    //           pageno: this.page_no,
    //           perpage: this.per_page,
    //           issearch: this.issearch,
    //         },
    //         {
    //           headers: {
    //             Authorization: `Bearer ${this.$session.get("at")}`,
    //           },
    //         }
    //       )
    //       .then((response) => {
    //         this.spinnerOn = false;
    //         this.user_action_stats = [];
    //         for (let i = 0; i < response.data.data.chatHistory.length; i++) {
    //           this.user_action_stats.push({
    //             useremail: response.data.data.chatHistory[i]._id.User,
    //             userphonenumber: response.data.data.chatHistory[i].PhoneNumber,
    //             username: response.data.data.chatHistory[i].UserName,
    //           });
    //         }
    //       })
    //       .catch((e) => {
    //         if (
    //           e.response.status === 410 ||
    //           e.response.status === 440 ||
    //           e.response.status === 409
    //         ) {
    //           this.$root.$emit("Session_Expired", e.response.data);
    //         }
    //       });
    //   }
    // },
    scroll_div() {
      var doc = document.querySelector(".buy-products");
      if (event.deltaX > event.deltaY) {
        doc.scrollLeft += 10;
      } else if (event.deltaX < event.deltaY) {
        doc.scrollLeft -= 10;
      }
    },
    checkintent(index) {
      if (this.chatDetails[index - 1] != undefined) {
        if (this.chatDetails[index - 1].BOTResponse[0] != undefined) {
          if (this.chatDetails[index - 1].BOTResponse[0].intent != undefined) {
            return true;
          }
        }
      }
      return false;
    },
    chat_date(index) {
      this.chatDetails = [];
      this.sender_id = this.user_action_stats[index].userid;
      this.spinnerOn = true;
      axios
        .post(
          api_calls.general_chat_history(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            username: this.sender_id,
            isshowdates: true,
            issearch: this.issearch,
            searchstring: this.searchstring
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`
            }
          }
        )
        .then(response => {
                    ////console.logresponse)

          this.spinnerOn = false;
          this.chat_dates = response.data.data.Dates;
          this.selected_date =
            response.data.data.Dates[response.data.data.Dates.length - 1];
          this.chat_dates.reverse();
          // ////console.logthis.selected_index);
          this.selected_index = index;
          this.chat_conversation(index);
        })
        .catch(e => {
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    chat_conversation(index, chat_index) {
      // ////console.logindex, chat_index);
      if (this.selected != "general_chat_history") {
        this.sender_id = this.user_action_stats[index].userid;
        this.spinnerOn = true;
        axios
          .post(
            api_calls.conversation_stats_url(),
            {
              company_name: this.companyname,
              company_id: this.companyid,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              sender_id: this.user_action_stats[index].sender_id,
              action_timestamp: this.user_action_stats[index].action_list[
                chat_index
              ].timestamp
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`
              }
            }
          )
          .then(response => {
                      ////console.logresponse)

            this.spinnerOn = false;
            this.user_reply = [];
            this.bot_reply = [];
            if (response.data != null) {
              this.current_user = response.data.data.user_conversations.username;
              for (var i in response.data.data.user_conversations.interactions) {
                if (
                  response.data.data.user_conversations.interactions[i].user !=
                  undefined
                ) {
                  this.user_reply.push(
                    response.data.data.user_conversations.interactions[i].user
                  );
                } else if (
                  response.data.data.user_conversations.interactions[i].bot !=
                  undefined
                ) {
                  this.bot_reply.push(
                    response.data.data.user_conversations.interactions[i].bot
                  );
                }
              }
              $("#conversation_model1 :input").prop("disabled", true);
            } else {
              toastr.error(this.tlt("bot_user_no_chats_msg"));
              $("#conversation_model1").modal("hide");
            }
            $("#conversation_model1 :input").prop("disabled", true);
          })
          .catch(e => {
            if (
              e.response.status === 410 ||
              e.response.status === 440 ||
              e.response.status === 409
            ) {
              this.$root.$emit("Session_Expired", e.response.data);
            }
          });
      } else {
        this.chatDetails = [];
        this.spinnerOn = true;
        axios
          .post(
            api_calls.general_chat_history(),
            {
              company_name: this.companyname,
              company_id: this.companyid,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              username: this.sender_id,
              isshowchatdetails: true,
              date: this.selected_date,
              issearch: this.issearch,
              searchstring: this.searchstring
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`
              }
            }
          )
          .then(response => {
            ////console.logresponse);
            this.spinnerOn = false;
            this.user_reply = [];
            this.bot_reply = [];
            if (response.data.data != null) {
              this.current_user = this.user_action_stats[
                this.selected_index
              ].useremail;
              this.chatDetails = response.data.data.chatDetails;
              let offers_index = null;
              for (var i = 0; i < this.chatDetails.length; i++) {
                for (
                  let j = 0;
                  j < this.chatDetails[i].BOTResponse.length;
                  j++
                ) {
                  if (
                    this.chatDetails[i].BOTResponse[j]
                      .shopify_fetch_customer_id == true &&
                    this.chatDetails[i].BOTResponse[j].text == null &&
                    this.chatDetails[i].UserQuery === "Promotional offers"
                  ) {
                    offers_index = i;
                  }
                }
                if (offers_index != null) {
                  delete this.chatDetails[offers_index];
                }
                offers_index = null;
              }
              const new_arr = this.chatDetails.filter(a => a);
              this.chatDetails = new_arr;
            }
            // setTimeout(() => {
            //   $("#conversation_model1 :input").prop("disabled", true);
            //   $("#conversation_model1 :button").prop("disabled", false);
            // }, 500);
          })
          .catch(e => {
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
    product_variation(products_list) {
      for (var i in products_list) {
        products_list[i].order_qty = 1;
        products_list[i].buy_qty = 1;
        if (
          products_list[i].variations &&
          products_list[i].variations.length > 0
        ) {
          products_list[i].id = products_list[i].variations[0].id;
          products_list[i].img_url =
            products_list[i].variations[0].img_url === null
              ? products_list[i].img_url
              : products_list[i].variations[0].img_url;
          products_list[i].permalink = products_list[i].variations[0].permalink;
          products_list[i].variant_title =
            products_list[i].variations[0].variant_title;
          products_list[i].stock_quantity =
            products_list[i].variations[0].stock_quantity;
          products_list[i].stock_status =
            products_list[i].variations[0].stock_status;
          products_list[i].price = products_list[i].variations[0].price;
          products_list[i].regular_price =
            products_list[i].variations[0].regular_price;
        }
      }
      return products_list;
    },
    search_chat() {
      if (this.searchstring != "") {
        // this.spinnerOn = true;
        this.page_no = 1;
        (this.issearch = true), (this.spinnerOn = true);
        axios
          .post(
            api_calls.general_chat_history(),
            {
              company_name: this.companyname,
              company_id: this.companyid,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              isshow: true,
              action: "general_chat_history",
              pageno: this.page_no,
              perpage: this.per_page,
              issearch: this.issearch,
              searchstring: this.searchstring
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`
              }
            }
          )
          .then(response => {
                      ////console.logresponse)

            this.spinnerOn = false;
            this.user_action_stats = [];
            if (
           
            response.data.message.MSG_CODE == this.api_status_code.EMPTY_DATA.MSG_CODE 
            ) {
                              ////console.logresponse.data.data.chatHistory)

              for (let i = 0; i < response.data.data.chatHistory.length; i++) {
                this.user_action_stats.push({
                  username: response.data.data.chatHistory[i]
                });
              }
               //console.logresponse.data.pagination.total_data)
          this.number_of_rows = response.data.pagination.total_data == undefined ? 0 : response.data.pagination.total_data;
          this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
          this.setpagination(this.page_no);
             
            } else if (response.data.message.MSG_CODE ==  this.api_status_code.EMPTY_DATA.MSG_CODE 
) {
              toastr.error(this.tlt("bot_user_no_result_found_msg"));
            } else if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE ) {
              toastr.error(this.tlt("bot_user_internal_server_msg1"));
              this.load_bot_user_chat_history();
            } else {
              toastr.error(this.tlt("bot_user_internal_server_msg2"));
              this.load_bot_user_chat_history();
            }
            
          })
          .catch(e => {
            if (
              e.response.status === 410 ||
              e.response.status === 440 ||
              e.response.status === 409
            ) {
              this.$root.$emit("Session_Expired", e.response.data);
            }
          });
      } else {
        toastr.error(this.tlt("bot_user_data_for_search_msg"));
      }
    },
    close_modal() {
      $("#conversation_model1").modal("hide");
    },
    check_bot_offers(bot_reponse) {
      let result_bot = bot_reponse.filter(item => {
        return Boolean(item.offers) === true;
      });
      if (result_bot.length > 0) {
        return "display :block";
      }
      return "display : flex";
    }
  }
};
</script>

<style scoped>
.table td,
.table th {
  vertical-align: middle;
}
.view-pass {
  position: initial;
  right: 15px;
  top: 15px;
}
img {
  max-width: 100%;
  max-height: 100%;
}
.image-container {
  /* background: #fff;
  border: #fff 1px solid;
  border-radius: 5px 5px 5px 5px; */
  margin: 5px;
  /* height: 180px; */
}
.image-container {
  font-size: 15px;
  text-align: center;
}
.search-bar {
  height: 32px;
}
.darkblue-btn {
  height: 32px;
  margin-left: 10px;
}
</style>
