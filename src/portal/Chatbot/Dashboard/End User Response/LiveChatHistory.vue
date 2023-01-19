<template>
  <div class="table-box">
    
    <div
      class="table-responsive"
      style="min-height: 349px"
    >
     <div class="spinner" id="spinner" v-show="show_loader"></div>
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
              {{ tlt("portal_user_unique_id") }}
            </th>
            <!-- <th
                    scope="col"
                    style="width: 20%; text-align: center"
                >
                    PHONE NUMBER
                </th> -->
            <th scope="col" style="width: 30%; text-align: center;">
              {{ tlt("portal_user_interacted") }}
            </th>
            <th scope="col" style="width: 40%; text-align: center">
              {{ tlt("portal_user_view_chat") }}
            </th>
            <!-- <th scope="col" style="width: 20%;text-align: center;">NAME OF TASK</th>
            <th scope="col" style="width: 20%;text-align: center;">DATE</th>
            <th scope="col" style="width: 20%;text-align: center;">TIME</th>-->
          </tr>
        </thead>
        <!-- <tr
          v-for="(user, index) in user_action_stats"
          :key="index"
        >
            <td style="text-align: center">
              {{ user.group_name }}
            </td>

            <td style="text-align: center">
              {{ user.last_interacted_on }}
            </td>

            <td style="text-align: center">
              Click here
            </td>
        </tr> -->
        <tr
          v-for="(user, index) in user_action_stats"
          :key="index"
          v-show="!show_loader"
        >
          <template>
            <!-- <td class="text-center">{{ user.username }}</td> -->
            <td class="text-center"> {{ user.agent_full_name }}</td>
            <!-- <td class="text-center">{{ user.userphonenumber }}</td> -->
            <td class="text-center">
              {{ format_date_in_local_timezone(user.last_interacted_on) }}
            </td>
            <td style="width: 50%; text-align: center">
              <a
                href="javascript:void(0)"
                data-toggle="modal"
                data-target="#conversation_model1"
                @click="chat_date(index)"
                style="text-align: center"
                >{{ tlt("view_chat_label") }}</a
              >
            </td>
          </template>
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
                    <rect
                      x="40"
                      y="108"
                      rx="4"
                      ry="4"
                      width="350"
                      height="14"
                    />
                    <rect x="2" y="108" rx="4" ry="4" width="35" height="14" />
                  </content-loader>
                </div>
              </div>
              <div v-if="chatDetails.length > 0">
              <h5 style="display:inline-block">{{this.tlt('support_agent')}} - </h5> 
              <p style="display:inline-block;font-size: 18px;color:#494D69">{{fullName}}</p> 
               </div>
              <div
                style="text-align:justify"
                v-for="(data, index) in chatDetails"
                :key="index"
              >
                <span
                  v-if="data.sent_by != ''|| data.sent_by != null"
                  class="py-0 my-0"
                  style="display: flex; height:0%;"
                >
                  <h6
                    class="py-0 mt-2 mb-0 mr-0"
                    style="float:left;width:20%; height:0%;"
                  >
                    {{data.sent_by === "support_agent"?"Support agent":"Customer"}}:
                  </h6>
                  <p
                    class="py-0 mb-0 mt-2"
                  style="float:right;width:70%; height:0%;"
                  >
                  {{ data.message }}
                  </p>
                </span>
                
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
import Swal from "sweetalert2";
import moment from "moment";
import { ContentLoader } from "vue-content-loader";



export default {
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
      groupnames:[],
      chatgroupname:"",
      fullName:"",
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
      is_portal_user: true,
      contact_help_email: null,
      retail_web_framework: this.$session.get("retail_web_framework"),
      filter_chat_history: this.$session.get("filter_chat_history")
    };
  },
    components: {
    ContentLoader
  },
  created() {
    this.load_live_chat_history();
  },
  mounted() {
    this.$root.$on("load_live_chat_history", data => {
      this.load_live_chat_history();
    });
  },
  beforeDestroy() {
    this.$root.$off("load_live_chat_history");
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
    load_live_chat_history() {
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
            is_live_chat: true,
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
        .then((response) => {
          console.log(response)
          this.show_loader = false;
          console.log(this.api_status_code.DATA_AVAILABLE.MSG_CODE , response.data.message.MSG_CODE)
          this.user_action_stats = [];
          if(this.api_status_code.DATA_AVAILABLE.MSG_CODE == response.data.message.MSG_CODE){
            this.user_action_stats = response.data.data.output;
          } else if(this.api_status_code.NO_DATA_AVAILABLE.MSG_CODE == response.data.message.MSG_CODE){
              Swal({
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                toast: true,
                position: "top-end",
                type: "info",
                timer: 2500
              })
          }
          else {
          Swal({
            title: response.data.message.MSG_CODE,
            text: response.data.message.MSG,
            showCancelButton: false,
            showConfirmButton: false,
            type: "error",
            timer: 3000
          })
          }
          this.number_of_rows = response.data.pagination.total_data == undefined ? 0 : response.data.pagination.total_data;
          this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
          this.setpagination(this.page_no);
        })
        .catch(e => {
          console.log(e)
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
                isshowchatdetails: true,
                is_live_chat: true,
                group_name:this.user_action_stats[index].group_name,
                
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`
                }
              }
            )
            .then(response => {
              this.spinnerOn = false;
              if(this.api_status_code.DATA_AVAILABLE.MSG_CODE == response.data.message.MSG_CODE){
                this.chatDetails = response.data.data.output
                this.fullName = this.chatDetails[0].agent_full_name
                
              } else if(this.api_status_code.NO_DATA_AVAILABLE.MSG_CODE == response.data.message.MSG_CODE){
                Swal({
                  title: response.data.message.MSG_CODE,
                  text: response.data.message.MSG,
                  toast: true,
                  showCancelButton: false,
                  showConfirmButton: false,
                  type: "info",
                  timer: 2500
                })
              }
              else {
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
     page_require(page_no) {

        if (page_no == 0 || page_no == this.total_pages + 1) {
        } else {
          if (page_no == "...s") {
            this.page_no = Math.ceil((1 + this.page_no) / 2);
          } else if (page_no == "...l") {
            this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
          } else {
            this.page_no = page_no;
          }
          // this.page_no = page_no;
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
                isshow: true,
                is_live_chat: true,
                action: this.selected,
                filter_chat_history: this.$session.get("filter_chat_history"),
                pageno: this.page_no,
                perpage: this.per_page,
                issearch: this.issearch,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`
                }
              }
            )
            .then(response => {
              this.user_action_stats = [];
              this.spinnerOn = false;
              // this.user_action_stats = [];
              // for (let i = 0; i < response.data.data.chatHistory.length; i++) {
              //   if (
              //     this.fingerprintregex.test(
              //       response.data.data.chatHistory[i]._id.User
              //     )
              //   ) {
              //     this.user_action_stats.push({
              //       useremail: response.data.data.chatHistory[i].Email,
              //       userphonenumber: response.data.data.chatHistory[i].PhoneNumber,
              //       username: response.data.data.chatHistory[i].UserName,
              //       userid: response.data.data.chatHistory[i]._id.User,
              //       date: response.data.data.chatHistory[i].Date
              //     });
              //   } else {
              //     this.user_action_stats.push({
              //       useremail: response.data.data.chatHistory[i]._id.User,
              //       userphonenumber: response.data.data.chatHistory[i].PhoneNumber,
              //       username: response.data.data.chatHistory[i].UserName,
              //       userid: response.data.data.chatHistory[i]._id.User,
              //       date: response.data.data.chatHistory[i].Date
              //     });
              //   }
              //   // this.user_action_stats.push({
              //   //     useremail : response.data.chatHistory[i]._id.User,
              //   //     userphonenumber : response.data.chatHistory[i].PhoneNumber,
              //   //     username : response.data.chatHistory[i].UserName,
              //   // });
              // }
               if(this.api_status_code.DATA_AVAILABLE.MSG_CODE == response.data.message.MSG_CODE){
                this.user_action_stats = response.data.data.output
              } else if(this.api_status_code.NO_DATA_AVAILABLE.MSG_CODE == response.data.message.MSG_CODE){
                Swal({
                  title: response.data.message.MSG_CODE,
                  text: response.data.message.MSG,
                  toast: true,
                  showCancelButton: false,
                  showConfirmButton: false,
                  type: "info",
                  timer: 2500
                })
              }
              else {
                Swal({
                  title: response.data.message.MSG_CODE,
                  text: response.data.message.MSG,
                  showCancelButton: false,
                  showConfirmButton: false,
                  type: "error",
                  timer: 2500
                })
              }
              
              this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
              this.setpagination(this.page_no);
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
      
    }
  },
     
}

</script>

<style>

</style>
