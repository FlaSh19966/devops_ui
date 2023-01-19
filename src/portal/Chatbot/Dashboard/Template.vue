<template>
     <div class="dash-cont">
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <div class="container-fluid">
      <div class="card dash-card">
        <div class="card-header d-block d-sm-flex flex-wrap justify-content-between">
          <h4 class="mb-sm-0">Template List</h4>
        </div>
        <!-- <ul class="nav nav-tabs">
            <li class="active"><a data-toggle="tab" href="#home">Home</a></li>
            <li><a data-toggle="tab" href="#menu1">Menu 1</a></li>
            <li><a data-toggle="tab" href="#menu2">Menu 2</a></li>
        </ul>

        <div class="tab-content">
          <div id="home" class="tab-pane fade in active">
            <h3>HOME</h3>
            <p>Some content.</p>
          </div>
          <div id="menu1" class="tab-pane fade">
            <h3>Menu 1</h3>
            <p>Some content in menu 1.</p>
          </div>
          <div id="menu2" class="tab-pane fade">
            <h3>Menu 2</h3>
            <p>Some content in menu 2.</p>
          </div>
        </div> -->

        <div class="card-body">
          <div class="table-box">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">
                      <div class="form-check checkbox checkbox-success">
                        <label class="form-check-label checkbox checkbox-success">
                          <input
                            class="form-check-input"
                            id="selectall"
                            type="checkbox"
                          />
                          <span class="icn"></span>
                        </label>
                      </div>
                    </th>
                    <th scope="col">Action</th>
                    <th scope="col">Template name</th>
                    <th scope="col">Domain</th>
                    <th scope="col">Subscribe to Template</th>
                    <th scope="col">Check Template</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(template,index) in templates" :key="index">
                    <th scope="row">
                      <div class="form-check checkbox-success">
                        <label class="form-check-label checkbox checkbox-success">
                          <input
                            class="form-check-input"
                            type="checkbox"
                          />
                          <span class="icn"></span>
                        </label>
                      </div>
                    </th>
                    <td class="action" style="text-align:center">
                      <a href="#" @click="delete_bot(index)" id="single_delete_user_id">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="13.682"
                          height="15.392"
                          viewBox="0 0 13.682 15.392"
                        >
                          <path
                            d="M8.276,3v.855H4v1.71h.855V16.682a1.71,1.71,0,0,0,1.71,1.71h8.551a1.71,1.71,0,0,0,1.71-1.71V5.565h.855V3.855H13.406V3H8.276M6.565,5.565h8.551V16.682H6.565V5.565m1.71,1.71v7.7h1.71v-7.7H8.276m3.42,0v7.7h1.71v-7.7Z"
                            transform="translate(-4 -3)"
                            fill="#f23d3d"
                          />
                        </svg>
                      </a>
                       <a href="#" @click="edit_bot(index)" id="edit_role_id">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15.392"
                          height="15.392"
                          viewBox="0 0 15.392 15.392"
                          style="cursor:pointer"

                        >
                          <path
                            id="square-edit-outline"
                            d="M4.71,3A1.7,1.7,0,0,0,3,4.71V16.682a1.71,1.71,0,0,0,1.71,1.71H16.682a1.71,1.71,0,0,0,1.71-1.71V10.7h-1.71v5.986H4.71V4.71H10.7V3H4.71m10.928.855a.591.591,0,0,0-.41.171L14.185,5.061,16.322,7.2l1.043-1.035a.578.578,0,0,0,0-.812L16.04,4.026a.571.571,0,0,0-.4-.171M13.578,5.668l-6.3,6.311v2.138H9.413l6.3-6.311Z"
                            transform="translate(-3 -3)"
                            fill="#9499ae"
                          />
                        </svg>
                       </a>
                    </td>
                    <td style="text-align:center">{{template.template_name}}</td>
                    <td style="text-align:center"> {{template.domain}} </td>
                    <td style="display:flex;text-align:centermargin: 0.2rem" >
                        <div
                          class="radio"
                          style="text-align:center;margin-left:25%"
                        >
                          <label style="vertical-align: text-top;">
                              Yes
                            <input
                              type="radio"
                              v-model="template.subscribed_val"
                              :name="template.template_name"
                              value="Subscribe"
                              @change="subscribetemplate(index)"
                            />
                            <span
                              class="icn"
                              id="radio"
                            ></span>
                          </label>
                        </div>
                        <div
                          class="radio"
                          style="text-align:center; margin-left:3%"
                        >
                          <label style="vertical-align: text-top;">
                          No
                            <input
                              type="radio"
                              v-model="template.subscribed_val"
                              :name="template.template_name"
                              @change="subscribetemplate(index)"
                              value="DontSubscribe"
                            />
                            <span
                              class="icn"
                              id="radio"
                            ></span>
                          </label>
                        </div>
                    </td>
                    <td style="text-align:center"><a href="javascript:void(0)" @click="route_to_preview(index)">Preview</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="pagin-table">
              <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                  <li class="page-item">
                    <a class="page-link" href="#" @click="page_require(page_no-1)">
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
                    :class="'page-item '+ pagination_class(pageno)"
                    v-for="pageno in page_array"
                    :key="pageno"
                  >
                    <a
                      v-if="pageno=='...s'||pageno=='...l'"
                      class="page-link"
                      href="#"
                      @click="page_require(pageno)"
                    >...</a>
                    <a
                      v-if="pageno!='...s'&&pageno!='...l'"
                      class="page-link"
                      href="#"
                      @click="page_require(pageno)"
                    >{{pageno}}</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#" @click="page_require(page_no+1)">
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


          </div>
         </div>
           <div
                class="modal fade"
                id="editbotmodel"
                tabindex="-1"
                role="dialog"
                aria-labelledby="patientdatamodeltitle"
                aria-hidden="true"
                v-if="is_edit"
                >
                 <!-- data-keyboard="false"
                data-backdrop="static" -->
                <div class="modal-dialog modal-lg vertical-align-center">
                    <div class="modal-content">
                    <div class="modal-body">
                        <div class="modal-head d-flex align-items-center">
                        <h3 style="margin-left: 20%;"> Edit Template - {{templates[editindex].template_name}} </h3>
                        </div>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <img
                                src="/img/close-icn.png"
                                alt
                            />
                        </button>
                        <form @submit="edittemplate(editindex)">
                          <div class="chat-master" id="app">
                              <div
                                  class="chat-wrap chat-wrap1"
                                  style="margin-right:auto;margin-left:auto;z-index:0;min-width:100%;position:sticky"
                                >
                                <div class="chat-head">
                                  <div class="media media2" >
                                      <img
                                      src="https://storage.cense.ai/gogyb/cense_image.png"
                                      style="margin-top: 5px; height: 30px; width: auto;"
                                      class="rounded "
                                      alt="..."
                                      />
                                      <div class="media-body" style="margin-left:10px">
                                      <!-- <p
                                          style="font-size: 15px;font-weight: bold;margin-top: 6px;text-align:center"
                                      >
                                      How may I help you?
                                      </p> -->
                                       <select
                                          v-model="selected_question"
                                          class="form-control"
                                          @change="addquestion()"
                                          >
                                          <!-- <option :value="scheduled_time"  selected> {{scheduled_time}} </option> -->
                                          <option value disabled >Select A Question after which you want to insert your question</option>
                                          <option
                                            v-for="(question, index) in botquestions"
                                            :value="question.value"
                                            :key="index"
                                          >{{question.text}}</option>
                                        </select>
                                      </div>
                                  </div>
                                </div>

                                <div style="position:absolute;z-index:1000;top:80%;left:93%" class="bounce">
                                        <img src="/static/img/down-arrow.png" v-if="to_scroll" />
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
                                          <template v-if="single.conversation_only">
                                            <div v-if="single.sending" class="chat-row sender">
                                              <!-- <div > -->
                                                 <input class="chat" type="text" disabled v-model="single.text">
                                               <!-- {{ single.sent }} -->
                                               <!-- </div> -->
                                              <div class="chat-his" v-if="single.time!=null">
                                                <span class="time" style="color:#000">{{ single.time }}</span>
                                                <span class="del-note delivered">Delivered</span>
                                              </div>
                                            </div>
                                            <div v-if="single.receiving" class="chat-row receiver">
                                              <!-- <div
                                                v-if="single.text!=''&&single.text!=undefined"
                                                class="chat"
                                                v-html="single.text"
                                                :id="'chat'+item"
                                              >
                                              {{single.text}}
                                              </div> -->
                                              <div
                                                v-if="single.text!=''&&single.text!=undefined"
                                                class="chat"
                                                :id="'chat'+item"
                                                style="width:100%;background-color: rgb(1,1,0,0);"
                                              >
                                              <input
                                               type="text"
                                               class="form-control"
                                               :id="'chatinput'+item"
                                               disabled
                                               style="width:100%"
                                               v-model="single.text"
                                               >
                                              <a @click="editvalue(item)">
                                                 <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="15.392"
                                                  height="15.392"
                                                  >
                                                  <path
                                                    id="square-edit-outline"
                                                    d="M4.71,3A1.7,1.7,0,0,0,3,4.71V16.682a1.71,1.71,0,0,0,1.71,1.71H16.682a1.71,1.71,0,0,0,1.71-1.71V10.7h-1.71v5.986H4.71V4.71H10.7V3H4.71m10.928.855a.591.591,0,0,0-.41.171L14.185,5.061,16.322,7.2l1.043-1.035a.578.578,0,0,0,0-.812L16.04,4.026a.571.571,0,0,0-.4-.171M13.578,5.668l-6.3,6.311v2.138H9.413l6.3-6.311Z"
                                                    transform="translate(-3 -3)"
                                                    fill="#9499ae"
                                                  />
                                                </svg>
                                              </a>
                                              <a @click="deletequestion(item)">
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="13.682"
                                                  height="15.392"
                                                  viewBox="0 0 13.682 15.392"
                                                >
                                                  <path
                                                    d="M8.276,3v.855H4v1.71h.855V16.682a1.71,1.71,0,0,0,1.71,1.71h8.551a1.71,1.71,0,0,0,1.71-1.71V5.565h.855V3.855H13.406V3H8.276M6.565,5.565h8.551V16.682H6.565V5.565m1.71,1.71v7.7h1.71v-7.7H8.276m3.42,0v7.7h1.71v-7.7Z"
                                                    transform="translate(-4 -3)"
                                                    fill="#f23d3d"
                                                  />
                                                </svg>
                                              </a>
                                              </div>
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
                                              <!-- <div
                                                class="plyr__video-embed"
                                                id="player"
                                                v-for="(video, index) in single.videos"
                                                :key="index"
                                                style="ma"
                                              >
                                                <iframe :src="video" allowfullscreen allowtransparency allow="autoplay"></iframe>
                                              </div> -->
                                              <div class="chat-his" v-if="single.time!=null">
                                                <span class="time">{{ single.time }}</span>
                                                <!-- <span class="del-note delivered" v-show="single.time!=undefined">Delivered</span> -->
                                              </div>
                                            </div>
                                          </template>
                                        </div>
                                  </div>



                                <div class="chat-footer">
                                  <div class="typing-indicator" style="display:none">
                                    <p
                                      style="font-size:13px;font-weight:300;margin-left: 5%;"
                                    >typing</p>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                  </div>
                                  <span class="powered-by">
                                    Powered by &nbsp;
                                    <img src="/static/img/cense_image.png" style="height:20px" />
                                  </span>
                                </div>

                                <div class="chat-txt">
                                  <div class="input-group mb-0">
                                    <input
                                      type="text"
                                      class="form-control"
                                      disabled
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
                                        disabled
                                      >
                                        <i class="fa fa-microphone" id="microphone"></i>
                                      </button>
                                    </div>
                                    <div class="input-group-append">
                                      <button
                                        class="btn"
                                        type="button"
                                        id="button_addon2"
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
                          <div class="btn-wrap text-right">
                              <button
                              type="submit"
                              class="darkblue-btn"
                              >Save</button>
                          </div>
                        </form>
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
import Swal from "sweetalert2";
import api_calls from "@/portal/api_calls";
export default {
  name: "add-user",
  data() {
    return {
      subscribe_status: "",
      template_name: "",
      template_structure: [],
      portal_roles: [],
      selected_role: "",
      check_list: [],
      emaillist: [],
      password: "",
      email: "",
      per_page: 10,
      total_pages: null,
      number_of_rows: null,
      page_no: 1,
      companyname: "",
      companyid: "",
      users: [],
      roles: [],
      role: "",
      reg_email: /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/,
      reg_pwd: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{8,}/,
      show_loader: false,
      //harsh
      page_array: [],
      search_name: "",
      spinnerOn: false,
      templates : [],
      editindex : null,
      is_edit : false,
      chat: [],
      to_scroll: false,
      isexchange: false,
      editable: false,
      botquestions: [],
      selected_question : "",
      temp_structure: [],
      admintemplates: [],
      censetemplates:[],
    };
  },
  created() {
      this.spinnerOn = true;
      axios
        .get(api_calls.get_open_bot_template(), {
            params :{
                company_name: this.$session.get("UserInformation").company_name,
                company_id: this.$session.get("UserInformation").company_id,
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens
            },
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            }
        }).then(response => {
            if(response.data.status === "Success") {
                this.censetemplates = response.data.templates;
                axios
              .get(api_calls.post_open_bot_template(), {
                params :{
                  company_name: this.$session.get("UserInformation").company_name,
                      company_id: this.$session.get("UserInformation").company_id,
                      email: this.$session.get("UserInformation").email,
                      license_key: this.$session.get("UserInformation").license_key,
                      token: this.$session.get("UserInformation").tokens
                },
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }).then(response => {
                this.admintemplates = response.data.templates;
                this.spinnerOn = false;
                this.filtertemplates();
                // console.log(response);
              });
            }
            console.log(response);
        });

  },
  mounted() {
   $("#editbotmodel").on("hidden.bs.modal", () => {
      // debugger;
      alert("Hi");
     this.chat = [];
     this.botquestions = [];
      // vm.visit_reason = "";
      // vm.visitor_symptoms = "";
      // vm.visitor_number = "";
      // vm.selected_time = "";
      // vm.isEdit = false;
      // vm.selected_schedule_id = "";
      // vm.selected_schedule_visit_slot = "";
      // vm.isRescheduletime = false;
    });
  },
  methods: {
    route_to_preview(index) {
        this.$router.push({
        name: 'Open Bot Template Preview',
        params: {botdata:{structure:this.templates[index].structure}},
      });
    },
    edittemplate(editindex){
        event.preventDefault();
        Swal
        .fire({
          title: "Are you sure?",
          text: " You want to Edit the Template?",
          type: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Confirm!"
        })
        .then( result => {
          if(result.value){
            // debugger;
            // this.spinnerOn = true;
              // console.log(this.chat);
              // console.log("Hi", this.chat);
              var structure = [];
              for(let i = 0; i< this.chat.length; i++){
                if(this.chat[i].event == "bot"){
                  structure.push({
                    event: "bot",
                    text: this.chat[i].text,
                    data: this.chat[i].data,
                    metadata: this.chat[i].metadata,
                  });
                }
                if(this.chat[i].event == "user"){
                  structure.push({
                    event: "user",
                    text: this.chat[i].text,
                  });
                }
              }
              if(this.templates[editindex].template_type == 'admin'){
                var template_id_api = this.templates[editindex].final_template_id;
                var cense_template_id_api = this.templates[editindex].cense_template_id;
                axios
                .post(api_calls.post_open_bot_template(), {
                    company_name: this.$session.get("UserInformation").company_name,
                    company_id: this.$session.get("UserInformation").company_id,
                    email: this.$session.get("UserInformation").email,
                    license_key: this.$session.get("UserInformation").license_key,
                    token: this.$session.get("UserInformation").tokens,
                    domain: this.templates[editindex].domain,
                    template_id: template_id_api,
                    template_name: this.templates[editindex].template_name,
                    description: this.templates[editindex].description,
                    structure: structure,
                    cense_template_id: cense_template_id_api,
                },{
                  headers: {
                    Authorization: `Bearer ${this.$session.get("at")}`,
                  },
                })
                .then(response => {
                  // if()
                    if(response.data.status == "Success"){
                     setTimeout(() => {
                        this.$router.go();
                        }, 1000);
                     Swal
                        .fire({
                          title: "Template Edited Successfully",
                          type: "success",
                          time:2000,
                        });

                    } else if(response.data.status == "Failure"){
                      Swal
                        .fire({
                          title: "Some Error Occurred, Please Try Again!",
                          type: "error",
                          time:2500
                        });
                        // setTimeout(() => {
                          // $router.go();
                        // }, 1000);
                    }
                });
              }
              else if(this.templates[editindex].template_type == 'cense'){
                var template_id_api = null;
                var cense_template_id_api = this.templates[editindex].template_id;
                axios
                .post(api_calls.post_open_bot_template(), {
                    company_name: this.$session.get("UserInformation").company_name,
                    company_id: this.$session.get("UserInformation").company_id,
                    email: this.$session.get("UserInformation").email,
                    license_key: this.$session.get("UserInformation").license_key,
                    token: this.$session.get("UserInformation").tokens,
                    domain: this.templates[editindex].domain,
                    template_id: null,
                    template_name: this.templates[editindex].template_name,
                    description: this.templates[editindex].description,
                    structure: structure,
                    cense_template_id: cense_template_id_api,
                },{
                  headers: {
                    Authorization: `Bearer ${this.$session.get("at")}`,
                  },
                })
                .then(response => {
                  // if()
                    if(response.data.status == "Success"){
                          setTimeout(() => {
                         this.$router.go;
                        }, 1000);
                      Swal
                        .fire({
                          title: "Template Edited Successfully",
                          type: "success",
                          timer:2000,
                        });

                    } else if(response.data.status == "Failure"){
                      Swal
                        .fire({
                          title: "Some Error Occurred, Please Try Again!",
                          type: "error",
                          timer:2500,
                        });
                        // setTimeout(() => {
                          // $router.go();
                        // }, 1000);
                    }
                });
              }
              // var templatename = this.templates[editindex].template_name

            }
          });
        // console.log(structure);

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
    edit_bot(index) {
      this.spinnerOn = true;
        setTimeout(() => {
           $('#editbotmodel').modal('show');
            this.spinnerOn = false;
        }, 600);
        this.is_edit = true;
        this.chat=[];
        this.botquestions = [];
        this.editindex = index;
        for(let i = 0; i < this.templates[index].structure.length; i+= 1 ){
          if(this.templates[index].structure[i].event == "bot"){
            this.chat.push({
              receiving: true,
              text: this.templates[index].structure[i].text,
              conversation_only: true,
              time: this.generate_time(),
              event: "bot",
              data : this.templates[index].structure[i].data,
              metadata : this.templates[index].structure[i].metadata
              // domain: templates[index].domain,
              // template_id: templates[index].template_id,
              // template_name: templates[index].template_name,
            });
            this.botquestions.push({
              value: i,
              text: this.templates[index].structure[i].text
            })
          }
          if(this.templates[index].structure[i].event == "user"){
            this.chat.push({
                text: this.templates[index].structure[i].text,
                sending: true,
                time: this.generate_time(),
                conversation_only: true,
                delivered: true,
                dropdown: "",
                event: "user"
            });
          }
          // console.log('i',i);
        }
        this.temp_structure = this.chat;
        // console.log(this.editindex);
        // $('#editbotmodel').modal('show');
    },
    editvalue(index) {
      document.getElementById("chatinput" + index).disabled = !document.getElementById("chatinput" + index).disabled;
    },
    addquestion(){
      var editindex = this.editindex;
      var index = this.selected_question;
      // console.log(index);
      if(index == 'a') {
        toastr.error("Kindly Select a Question");
      }
      else {
      this.chat = [];
      this.botquestions = [];
      for(var i=0; i<=index;i++){
        if(this.templates[editindex].structure[i].event == "bot"){
            this.chat.push({
              receiving: true,
              text: this.templates[editindex].structure[i].text,
              conversation_only: true,
              time: this.generate_time(),
              event: "bot",
              data : this.templates[editindex].structure[i].data,
              metadata : this.templates[editindex].structure[i].metadata
            });
            this.botquestions.push({
              value: i,
              text: this.templates[editindex].structure[i].text
            })
          }
          if(this.templates[editindex].structure[i].event == "user"){
            this.chat.push({
                text: this.templates[editindex].structure[i].text,
                sending: true,
                time: this.generate_time(),
                conversation_only: true,
                delivered: true,
                dropdown: "",
              event: "user"
            });
          }
      }
      this.chat.push({
        receiving: true,
        text: '     ',
        conversation_only: true,
        time: this.generate_time(),
        event: "bot",
        data : this.templates[editindex].structure[i].data,
        metadata : this.templates[editindex].structure[i].metadata
      });
      var c = (index+2);
      i = null;
      // console.log(c);
      for(var i=c; i<=this.templates[editindex].structure.length; i++ ){
        if(this.templates[editindex].structure[i-1].event == "bot"){
          this.chat.push({
            receiving: true,
            text: this.templates[editindex].structure[i-1].text,
            conversation_only: true,
            time: this.generate_time(),
            event: "bot",
            data : this.templates[editindex].structure[i-1].data,
            metadata : this.templates[editindex].structure[i-1].metadata
          });
          this.botquestions.push({
            value: i-2,
            text: this.templates[editindex].structure[i-1].text
          })
        }
        if(this.templates[editindex].structure[i-1].event == "user"){
          this.chat.push({
              text: this.templates[editindex].structure[i-1].text,
              sending: true,
              time: this.generate_time(),
              conversation_only: true,
              delivered: true,
              dropdown: "",
              event: "user"

          });
        }
      }
      this.temp_structure = this.chat;
      document.getElementById("chatinput" + (index+1)).disabled = false;
      }
    },
    deletequestion(index) {
      console.log(this.temp_structure);
      this.chat = [];
      this.botquestions = [];
      // console.log(this.temp_structure);
      var editindex = this.editindex;
       for(var i=0; i<index;i++){
          if(this.temp_structure[i].event == "bot"){
            this.chat.push({
              receiving: true,
              text: this.temp_structure[i].text,
              conversation_only: true,
              time: this.generate_time(),
              event: "bot",
              data : this.temp_structure[i].data,
              metadata : this.temp_structure[i].metadata
            });
            this.botquestions.push({
              value: i,
              text: this.temp_structure[i].text
            })
          }
          if(this.temp_structure[i].event == "user"){
            this.chat.push({
                text: this.temp_structure[i].text,
                sending: true,
                time: this.generate_time(),
                conversation_only: true,
                delivered: true,
                dropdown: "",
                event: "user"
            });
          }
       }
       i = null;
      var c = index +1;
      for(var i=c; i<this.temp_structure.length; i++ ){
        if(this.temp_structure[i].event == "bot"){
          this.chat.push({
            receiving: true,
            text: this.temp_structure[i].text,
            conversation_only: true,
            time: this.generate_time(),
            event: "bot",
            data : this.temp_structure[i].data,
            metadata : this.temp_structure[i].metadata
          });
          this.botquestions.push({
            value: i,
            text: this.temp_structure[i].text
          })
        }
        if(this.temp_structure[i].event == "user"){
          this.chat.push({
              text: this.temp_structure[i].text,
              sending: true,
              time: this.generate_time(),
              conversation_only: true,
              delivered: true,
              dropdown: "",
              event: "user"
          });
        }
      }
      this.temp_structure = this.chat;
    },
    filtertemplates() {
      console.log(this.censetemplates,'cense');
      console.log(this.admintemplates, 'admin');
      // if(this.admintemplates.length > 0){
        for(let i = 0; i<this.censetemplates.length; i += 1){
          if(this.admintemplates.length == 0){
            this.censetemplates[i]['final_template_id'] = this.censetemplates[i].template_id;
            this.censetemplates[i]['template_type'] = 'cense';
            // this.censetemplates[i]['subscribed'] = false;
            if(this.censetemplates[i].subscribed == false){
                this.censetemplates[i]['subscribed_val'] = "DontSubscribe";
            }
            else if(this.censetemplates[i].subscribed == true){
                this.censetemplates[i]['subscribed_val'] = "Subscribe";
            }
            this.templates.push(this.censetemplates[i]);
          } else {
          for(let j=0; j<this.admintemplates.length; j += 1){
            if(((this.admintemplates[j].cense_template_id != null || this.admintemplates[j].cense_template_id != undefined)) && (this.admintemplates[j].cense_template_id == this.censetemplates[i].template_id)){
              this.admintemplates[j]['final_template_id'] = this.admintemplates[j].template_id;
              this.admintemplates[j]['template_type'] = 'admin';
              if(this.admintemplates[j].subscribed == false){
                this.admintemplates[j]['subscribed_val'] = "DontSubscribe";
              }
              else if(this.admintemplates[j].subscribed == true){
                this.admintemplates[j]['subscribed_val'] = "Subscribe";
              }
              this.templates.push(this.admintemplates[j]);
            } else if(((this.admintemplates[j].cense_template_id != null || this.admintemplates[j].cense_template_id != undefined))){
              this.censetemplates[i]['final_template_id'] = this.censetemplates[i].template_id;
              if(this.censetemplates[i].subscribed == false){
                this.censetemplates[i]['subscribed_val'] = "DontSubscribe";
              }
              else if(this.censetemplates[i].subscribed == true){
                this.censetemplates[i]['subscribed_val'] = "Subscribe";
              }
              // this.censetemplates[i]['subscribed'] = false;
              this.censetemplates[i]['template_type'] = 'cense';
              this.templates.push(this.censetemplates[i]);
            }
          }
         }
        }
      // } else {
      //   for(let i = 0; i<this.censetemplates.length; i += 1){
      //     this.templates = this.censetemplates;
      //   }
      // }
      console.log(this.templates);
    },
    delete_bot(index) {
      if(this.templates[index].template_type == 'cense'){
        toastr.error("You Cannot Delete SuperAdmin Templates");
      }
      else if(this.templates[index].template_type != 'cense'){
      Swal.fire({
          title: "Are you sure?",
          text: " You want to Delete this Template?",
          type: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Confirm!"
      })
         .then( result => {
            if(result){
               axios
                .delete(api_calls.post_open_bot_template(), {
                  params : {
                    company_name: this.$session.get("UserInformation").company_name,
                    company_id: this.$session.get("UserInformation").company_id,
                    email: this.$session.get("UserInformation").email,
                    license_key: this.$session.get("UserInformation").license_key,
                    token: this.$session.get("UserInformation").tokens,
                    template_id: this.templates[index].final_template_id
                  },
                  headers: {
                    Authorization: `Bearer ${this.$session.get("at")}`,
                  },
                })
                .then(response => {
                  if(response.data.status == "Success" && response.data.message == "Query Executed Successfully"){
                    setTimeout(() => {
                      this.$router.go;
                    }, 1100);
                      Swal.fire({
                        title: "Deleted",
                        type: "success",
                        timer:2000,
                      });
                  } else {
                    setTimeout(() => {
                      this.$router.go;
                    }, 1100);
                      Swal.fire({
                        title: "Some Error Occurred.Please Try Again",
                        type: "error",
                        timer:2500,
                      });
                  }
                });
            }
         });
       }
    },
    subscribetemplate(index){
      // debugger;
      var x = this.templates[index].subscribed;
      // var y = document.getElementsByName(this.templates[index].template_id).value;
      if(this.templates[index].subscribed_val == "Subscribe"){
         Swal.fire({
          title: "Are you sure?",
          text: " You want to subscribe to this template?",
          type: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Confirm!"
        })
         .then( result => {
            if(result){
                if(this.templates[index].template_type == 'admin'){
                var template_id_api = this.templates[index].final_template_id;
                var template_type = 'custom';
                // var cense_template_id_api = this.templates[index].cense_template_id;
                }  else if(this.templates[index].template_type == 'cense'){
                var template_id_api = this.templates[index].final_template_id;
                var template_type = 'cense';
                //  var cense_template_id_api = this.templates[index].template_id;
                }
              axios
                .post(api_calls.open_bot_template_subscription(), {
                    company_name: this.$session.get("UserInformation").company_name,
                    company_id: this.$session.get("UserInformation").company_id,
                    email: this.$session.get("UserInformation").email,
                    license_key: this.$session.get("UserInformation").license_key,
                    token: this.$session.get("UserInformation").tokens,
                    template_id: template_id_api,
                    set_subscription : true,
                    subscribed: true,
                    template_type: template_type
                })
                .then(response => {
                  console.log(response);
                });
            }
         });
      }
      else if(this.templates[index].subscribed_val == "DontSubscribe"){
       Swal.fire({
          title: "Are you sure?",
          text: " You don't want to subscribe to this template?",
          type: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Confirm!"
        })
         .then( result => {
            if(result){
               if(this.templates[index].template_type == 'admin'){
                var template_id_api = this.templates[index].final_template_id;
                var cense_template_id_api = this.templates[index].cense_template_id;
                var template_type = 'custom';
                }  else if(this.templates[index].template_type == 'cense'){
                var cense_template_id_api = this.templates[index].final_template_id;
                var template_id_api = this.templates[index].final_template_id;
                var template_type = 'cense';
                }
              axios
                .post(api_calls.open_bot_template_subscription(), {
                    company_name: this.$session.get("UserInformation").company_name,
                    company_id: this.$session.get("UserInformation").company_id,
                    email: this.$session.get("UserInformation").email,
                    license_key: this.$session.get("UserInformation").license_key,
                    token: this.$session.get("UserInformation").tokens,
                    template_id: template_id_api,
                    set_subscription : true,
                    subscribed: false,
                    template_type: template_type
                })
                .then(response => {
                  console.log(response);
                });
            }
         });
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
