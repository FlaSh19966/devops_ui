<template>
  <div>
    <div class="dash-cont">
      <div class="spinner" id="spinner" v-show="spinnerOn"></div>
      <div class="container-fluid">
        <div class="card dash-card">
          <div
            class="card-act card-header d-block d-sm-flex flex-wrap justify-content-between"
          >
            <!-- <button type="button" @click="toggle" >Fullscreen</button> -->
            <h4 class="mb-sm-0 mr-3">{{tlt('improve_predict_heading')}}</h4>
            <div class="radio my-auto">
              <label>
                <input
                  type="radio"
                  v-model="filter_status"
                  value="Success"
                  id="filter_status_success"
                />
                <span class="icn" id="filter_portal_user_radio"></span>
                {{tlt('improve_predict_success_label')}}
              </label>
              <label>
                <input
                  type="radio"
                  v-model="filter_status"
                  value="Failure"
                  id="filter_status_failure"
                />
                <span class="icn"></span> {{tlt('improve_predict_failure_label')}}
              </label>
            </div>
            <i
              class="fa fa-expand ml-auto mr-3 mt-auto mb-auto"
              @click="toggle"
              aria-hidden="true"
              v-if="!fullscreen"
            ></i>
            <i
              class="fa fa-compress ml-auto mr-3 mt-auto mb-auto"
              @click="toggle"
              aria-hidden="true"
              v-if="fullscreen"
              title="Toggle Fullscreen"
            ></i>
            <!-- <button
              type="submit"
              class="darkblue-btn"
                data-toggle="modal"
              data-target="#file_upload"
            >  -->
            <button :style="chk_cbx_crsr('style') || show_model_progress('style')"
              :title="chk_cbx_crsr('title') || show_model_progress('title')"
              :disabled="show_no_questions_message || intent_model_inprogress == true"
              id="train_and_test_btn" class="darkblue-btn"
              @click="train_and_test_model">
              <i class="fa fa-spinner fa-spin" v-show="intent_model_inprogress"></i>
              {{tlt('train_and_test_btn')}}
            </button>
          </div>
          <div class="card-body" id="page">
            <!-- <div class="dropdown ml-auto" style="z-index:1000000"> -->
            <!-- <i class="fa fa-filter dropdown-toggle" aria-hidden="true" data-toggle="dropdown"></i> -->
            <!-- <ul class="dropdown-menu ">
                        <table style="width: 100%;">
                            <tr
                            v-for="(status,index) in status_list"
                            :key="index"
                            >
                            <td style="display:flex;width: auto; text-align:center"
                            >
                                <input
                                v-model="selected_statuslist"
                                type="checkbox"
                                :id="status.replace(/\s/g,'')+'_checkbox'"
                                :value="status"
                                style="margin-top: auto;margin-bottom: auto;"
                                >
                                <label
                                :for="status.replace(/\s/g,'')+'_checkbox'"
                                :title="status"
                                style="margin: auto;"
                                >
                                {{status}}</label>
                            </td>
                            </tr>
                        </table>
                        </ul> -->
            <!-- </div> -->
            <div class="dropdown">
              <div class="table-box">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">{{tlt('improve_predict_question')}}</th>
                      <th scope="col">{{tlt('improve_predict_expect_intent')}}</th>
                      <th scope="col">{{tlt('improve_predict_intent')}}</th>
                      <th scope="col">{{tlt('improve_predict_confidence')}}</th>
                      <!-- <th scope="col" style="min-height: 63px;">Status</th> -->
                      <!-- <th
                        scope="col"
                        style="
                          display: flex;
                          min-height: 63px;
                          margin-top: auto;
                        "
                      >
                        <div class="mt-auto d-flex">
                          Status
                          <i
                            class="fa fa-filter"
                            aria-hidden="true"
                            data-toggle="dropdown"
                            style="cursor: pointer"
                          ></i>
                          <ul
                            class="dropdown-menu p-0"
                            style="margin-top: 0.6rem"
                          >
                            <table style="width: 100%">
                              <tr
                                v-for="(status, index) in status_list"
                                :key="index"
                              >
                                <td
                                  style="
                                    display: flex;
                                    width: auto;
                                    text-align: center;
                                  "
                                >
                                  <input
                                    v-model="selected_statuslist"
                                    type="checkbox"
                                    :id="
                                      status.replace(/\s/g, '') + '_checkbox'
                                    "
                                    :value="status"
                                    style="
                                      margin-top: auto;
                                      margin-bottom: auto;
                                    "
                                  />
                                  <label
                                    :for="
                                      status.replace(/\s/g, '') + '_checkbox'
                                    "
                                    :title="status"
                                    style="margin: auto"
                                  >
                                    {{ status }}</label
                                  >
                                </td>
                              </tr>
                            </table>
                          </ul>
                        </div>
                      </th> -->
                      <th scope="col">{{tlt('improve_label')}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="show_no_questions_message">
                      <td colspan="7" style="text-align: center">
                        {{tlt('improve_predict_no_question_available')}}
                        <i style="cursor: pointer" @click="get_questions_list">
                          <b> {{tlt('improve_predict_no_question_available_text2')}} </b>
                        </i>
                        {{tlt('improve_predict_no_question_available_text3')}}
                      </td>
                    </tr>
                    <tr
                      v-for="(question, index) in questions_list"
                      :key="index"
                    >
                      <td>{{ index + 1 }}</td>
                      <td>{{ question.Question }}</td>
                      <td>{{ question.ExpectedIntent }}</td>
                      <td>{{ question.ResultIntent }}</td>
                      <td style="text-align: center">
                        {{ question.PredictionConfidence }}%
                      </td>
                      <!-- <td>{{ question.Status }}</td> -->
                      <td class="text-center">
                        <!-- <button class="darkblue-btn" data-toggle="modal" data-target="#myModal" @click="open_modal_for_intent(index)">
                          Train
                        </button> -->
                        <button
                          class="save_node_button"
                          data-toggle="modal"
                          data-target="#myModal"
                          @click="open_modal_for_intent(index)"
                          style="height: 29px; padding: 0px 10px"
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
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="pagin-table" style="margin-top: 2%; margin-bottom: 4%">
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li class="page-item">
                <a
                  class="page-link"
                  href="#"
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
                class="page-item"
                :class="{ active: page === page_no }"
                v-for="(page, index) in page_array"
                :key="index"
              >
                <a
                  v-if="page == '...s' || page == '...l'"
                  class="page-link"
                  href="#"
                  @click="page_require(page)"
                  >...</a
                >
                <a
                  v-if="page != '...s' && page != '...l'"
                  class="page-link"
                  href="#"
                  @click="page_require(page)"
                  >{{ page }}</a
                >
                <!-- <a class="page-link" href="#" @click="page_require(page)">{{page}}</a> -->
              </li>

              <li class="page-item">
                <a
                  class="page-link"
                  href="#"
                  @click="page_require(page_no + 1)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8.667"
                    height="15.204"
                    viewBox="0 0 8.667 15.204"
                  >
                    <g
                      id="arrow-point-to-right"
                      transform="translate(-97.139 0)"
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
            </ul>
          </nav>
        </div>
        <div
          id="myModal"
          class="modal fade dash-modal"
          role="dialog"
          data-backdrop="static"
          data-keyboard="false"
        >
          <div class="modal-dialog modal-lg">
            <!-- Modal content-->
            <div class="modal-content" style="width: 135%; margin-left: -17%">
              <form >
                <div class="modal-header" style="width: 808px">
                  <h5 class="modal-title">
                    {{tlt('train_model_add_qs_for_intent_label')}}
                    <!-- {{current_selected_intent}} -->
                  </h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <img src="/img/close-icn.png" alt />
                  </button>
                </div>
                <div class="modal-body py-3 px-3" style="width: 808px">
                  <!-- <p>Some text in the modal.</p> -->
                  <div class="form-group">
                    <label for="text">{{tlt('train_model_add_qs_for_intent_label')}}</label>
                    <multiselect
                      v-model="current_selected_intent"
                      :options="intent_list"
                      :searchable="true"
                      :close-on-select="true"
                      :show-labels="false"
                    >
                      <span>{{ current_selected_intent }}</span>
                    </multiselect>
                  </div>
                  <div class="form-group" style="margin-bottom: 4px">
                    <label> {{tlt('train_model_add_qs_label')}} </label>
                    <button
                      class="save_node_button"
                      @click="add_question"
                      type="button"
                      style="height: 29px; padding: 0px 10px"
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
                        />
                      </svg>
                    </button>
                  </div>
                  <div
                    style="display: flex; margin-top: 2%"
                    v-for="(
                      question, index
                    ) in current_selected_intent_questions"
                    :key="index"
                  >
                    <input
                      type="text"
                      class="form-control"
                      style="height: 40px !important; padding-left: 12px"
                      v-model="question.question"
                      required
                      :placeholder="tlt('add_question')"
                    />
                    <button
                      class="save_node_button"
                      style="
                        margin-left: 3%;
                        height: 39px;
                        padding: 0px 10px;
                        background: #f23d3d;
                        border: solid 1px #f23d3d;
                      "
                      @click="delete_question(index)"
                      type="button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                      >
                        <path
                          id="trash-can-outline"
                          d="M8.375,3v.778H4V5.333h.875V15.444A1.661,1.661,0,0,0,6.625,17h8.75a1.661,1.661,0,0,0,1.75-1.556V5.333H18V3.778H13.625V3H8.375M6.625,5.333h8.75V15.444H6.625V5.333m1.75,1.556v7h1.75v-7H8.375m3.5,0v7h1.75v-7Z"
                          transform="translate(-4 -3)"
                          fill="#fff"
                        />
                      </svg>
                    </button>
                  </div>
                  <div class="btn-wrap text-right mx-0 mt-3 mb-0 px-0 pt-3 pb-0">
                    <button
                      type="button"
                      class="btn btn-link"
                      data-dismiss="modal"
                    >
                      {{tlt('train_model_cancel_btn')}}
                    </button>
                    <button type="submit" class="darkblue-btn" @click.prevent="save_questions_for_intent" id="traintest_save_btn">
                      {{tlt('train_model_save_btn')}}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div
          class="modal fade dash-modal"
          id="file_upload"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
          data-backdrop="static"
          data-keyboard="false"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <div class="modal-head d-flex align-items-center">
                  <div class="head-icn">
                    <img src="/img/msg-blue.png" alt />
                  </div>
                  <h3>Upload CSV Files</h3>
                </div>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  @click="clear_file_details"
                >
                  <img src="/img/close-icn.png" alt />
                </button>
                <form @submit.prevent="file_submit">
                  <div class="form-group">
                    <div class="custom-file">
                      <input
                        type="file"
                        accept=".csv"
                        class="custom-file-input"
                        id="inputGroupFile01"
                        @change="fileinput"
                        aria-describedby="inputGroupFileAddon01"
                      />
                      <label
                        style="font-weight: 400; line-height: 15px"
                        class="custom-file-label form-control"
                        for="file"
                        >{{ file_label }}</label
                      >
                    </div>
                  </div>
                  <div class="btn-wrap text-right">
                    <a href="#" @click="download_sample">
                      Download Sample CSV
                      <i class="fa fa-spinner fa-spin" v-show="spinnerOn"></i>
                    </a>
                    <button
                      type="button"
                      class="btn btn-link"
                      data-dismiss="modal"
                      @click="clear_file_details"
                    >
                      Cancel
                    </button>
                    <button type="submit" class="darkblue-btn">Submit</button>
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
import api_calls from "@/portal/api_calls";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import Multiselect from "vue-multiselect";
import { freeze_portal,show_subscription_expired_swal , close_modal} from "@/portal/mixins";

export default {
  name: "TrainTestBotPage",
  mixins: [
    freeze_portal,
    show_subscription_expired_swal,
    close_modal
  ],
  data() {
    return {
      filter_status:"Failure",
      spinnerOn: false,
      questions_list: [],
      intent_list: [],
      current_selected_intent: null,
      selected_question_index: null,
      current_selected_intent_questions: [],
      status_list: ["Success", "Failure"],
      selected_statuslist: ["Failure"],
      company_id: null,
      company_name: null,
      file_label: "Choose file",
      file_content: "",
      page_no: 1,
      number_of_rows: 0,
      total_pages: 1,
      per_page: 20,
      page_array: [],
      show_no_questions_message: false,
      intent_model_inprogress: false,
      want_status: true,
      fullscreen: false,
      disable_btn_expired: false,
    };
  },
  components: {
    Multiselect,
  },
  mounted() {
    setTimeout(() => {
      this.freeze_portal();
    }, 1000);
    
    this.$root.$on("TrainTestBotPageDisabled", (data) =>{
      if(data===true){
        this.disable_btn_expired = true;
      }
    })

    // this.company_id = this.$session.get("UserInformation").company_id;
    if (
      !this.$session.has("CompanyId") &&
      this.$session.get("UserInformation").role == "SuperAdmin"
    ) {
      toastr.warning(this.tlt('select_company_name_label'));
    } else if (this.user_role == "SuperAdmin") {
      if (this.$session.has("CompanyId")) {
        this.company_id = this.$session.get("CompanyId");
        this.company_name = this.$session.get("CompanyName");
      } else {
        this.company_id = this.$session.get("UserInformation").company_id;
        this.company_name = this.$session.get("UserInformation").company_name;
      }
    } else {
      this.company_id = this.$session.get("UserInformation").company_id;
      this.company_name = this.$session.get("UserInformation").company_name;
    }
    var vm = this;
    $(".dropdown").on("hide.bs.dropdown", function (event) {
      // var x = $(event.relatedTarget).text(); // Get the text of the element
      // alert(x);
      // console.log(vm.selected_statuslist);
    });
    $("#myModal").on("hidden.bs.modal", () => {
      vm.current_selected_intent = null;
    });
    this.$root.$on("send_model_status", data =>{
      if (data == true){
        this.check_intent_model_status();
      }
    })
    this.get_intents_list();
    this.initialize_questions_for_intent();
    this.get_questions_list();
    this.check_intent_model_status();
  },
  methods: {
    chk_cbx_crsr(index){
      if(this.show_no_questions_message){
        if(index == 'style'){
          return "cursor: not-allowed";
        }else if(index == 'title'){
          return this.tlt('train_bot_no_failure_data_msg');
        }
      }else{
        return null;
      }
    },
    check_intent_model_status(){
    this.model_status = this.$session.get("ModelStatus");
    if (this.model_status == "No Failure"){
    this.intent_model_inprogress = false;
    }
    else if (Boolean(this.model_status.intent_model) === true){
     if(this.model_status.intent_model == "InProgress"){
       this.intent_model_inprogress = true;
     }
     else{
       this.intent_model_inprogress = false;
     }
    }
    else{
      this.intent_model_inprogress = false; 
    }
    },
    show_model_progress(index){
      if(this.intent_model_inprogress == true){
         if (index == 'style'){
            return "cursor: not-allowed";
          }
          else if(index == 'title'){
              return this.tlt('train_bot_training_in_progress_msg');
          }
      }
      else{
        return null;
      }
    },
    get_questions_list() {
      this.show_no_questions_message = false;
      this.spinnerOn = true;
      this.questions_list = [];
      axios
        .get(api_calls.test_intent_model(), {
          params: {
            company_name: this.company_name,
            company_id: this.company_id,
            new_question_data: this.new_question_data,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            status: this.selected_statuslist,
            pageno: this.page_no,
            perpage: this.per_page,
          },
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          },
        })
        .then((response) => {
          this.spinnerOn = false;
          if (this.api_status_code.SUCCESSFUL_DB_QUERY_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
            if (response.data.data.length === 0) {
              this.show_no_questions_message = true;
            }
            this.total_pages = response.data.pagination.total_page;
            this.questions_list = response.data.data;
            this.setpagination(this.page_no);
          } else {
            // Swal({
            //   type: "error",
            //   text: this.tlt('train_bot_internal_server_msg1'),
            //   timer: 2500,
            // });
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
          // console.log(e);
          this.spinnerOn = false;
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          } else {
            Swal({
              type: "error",
              text: this.tlt('train_bot_internal_server_msg2'),
              timer: 2500,
            });
          }
        });
    },
    open_modal_for_intent(index) {
      this.current_selected_intent = this.questions_list[index].ExpectedIntent;
      this.selected_question_index = index;
      for (let i = 0; i < this.current_selected_intent_questions.length; i++) {
        this.current_selected_intent_questions[
          i
        ].intent = `${this.company_id}_${this.current_selected_intent}`;
      }
      // $("#myModal").modal("show");
    },
    add_question() {
      this.current_selected_intent_questions.unshift({
        question: null,
        intent: `${this.company_id}_${this.current_selected_intent}`,
      });
    },
    delete_question(index) {
      if (this.current_selected_intent_questions.length > 1) {
        this.current_selected_intent_questions.splice(index, 1);
      } else {
        swal({
          type: "warning",
          text: this.tlt('train_bot_one_qs_to_be_added_msg'),
          toast: true,
          position: "top-right",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    },
    get_intents_list() {
      axios
        .post(
          api_calls.get_unanswered_url(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
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
          if(this.api_status_code.DATA_AVAILABLE.MSG_CODE == response.data.message.MSG_CODE){
            for (var i in response.data.data[0]) {
              this.intent_list.push(
                response.data.data[0][i].replace(this.company_id + "_", "")
              );
            }
          }else  if(this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE == response.data.message.MSG_CODE){
            toastr.error(this.tlt('add_role_internal_server_msg3'));
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
        .catch((e) => {
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    save_questions_for_intent() {
      if (Boolean(this.selected_question_index)) {
        this.current_selected_intent_questions.push({
          question: this.questions_list[this.selected_question_index].Question,
          intent: `${this.company_id}_${this.current_selected_intent}`,
        });
      }
      let questions_list = this.current_selected_intent_questions.filter(
        (question) => {
          return Boolean(question.question);
        }
      );
      $("#myModal").modal("hide");
      this.spinnerOn = true;
      axios
        .post(
          api_calls.add_question_url(),
          {
            edit_intent: false,
            company_name: this.company_name,
            company_id: this.company_id,
            new_question_data: questions_list,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            subscription: this.$session.get("UserInformation").subscription,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          this.spinnerOn = false;
          this.initialize_questions_for_intent();
          if (this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE == response.data.message.MSG_CODE) {
            Swal({
              type: "error",
              text: this.tlt('train_bot_internal_server_msg3'),
              timer: 2500,
            });
          } else if (this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE == response.data.message.MSG_CODE) {
            Swal({
              type: "success",
              text: this.tlt('train_bot_qs_added_msg'),
              allowOutsideClick: false,
              allowEscapeKey: false,
              timer: 2500,
            }).then((result) => {
              if (result.value) {
                this.get_questions_list();
              }
            });
          } else if (this.api_status_code.QUESTION_EDIT_FAILED.MSG_CODE == response.data.message.MSG_CODE) {
            Swal({
              type: "warning",
              text: this.tlt('train_bot_qs_already_exist_msg'),
              timer: 2000,
            });
          } else if (this.api_status_code.QUESTION_EDIT_FAILED.MSG_CODE == response.data.message.MSG_CODE) {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              type: "warning",
              timer: 2500
            })
          } else if (this.api_status_code.EDIT_QUESTION_INTENT.MSG_CODE == response.data.message.MSG_CODE) {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              type: "success",
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
          this.spinnerOn = false;
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          } else {
            Swal({
              type: "error",
              text: this.tlt('train_bot_internal_server_msg5'),
              timer: 2500,
            });
          }
        });
        this.close_modal('traintest_save_btn')
    },
    initialize_questions_for_intent() {
      this.current_selected_intent_questions = [
        {
          question: null,
        },
        {
          question: null,
        },
        {
          question: null,
        },
        {
          question: null,
        },
        {
          question: null,
        },
      ];
    },
    download_sample() {
      axios
        .post(
          api_calls.question_intent_csv(),
          {
            company_name: this.company_name,
            company_id: this.company_id,
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
          // window.open(response.data.CSV_URL, "_blank");
          if(this.api_status_code.DATA_AVAILABLE.MSG_CODE == response.data.message.MSG_CODE){
            var a = window.document.createElement("a");
            a.href = response.data.CSV_URL;
            a.download = true;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          } else if(this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE == response.data.message.MSG_CODE){
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
    },
    clear_file_details() {
      this.file_label = "Choose file";
      this.file_content = "";
      document.getElementById("inputGroupFile01").value = "";
    },
    fileinput() {
      this.file_label = event.target.files[0].name;
      // var file_name = this.companyname + "IntentFile.csv";
      // if (this.file_label != file_name) {
      //   Swal({
      //     type: "error",
      //     text:
      //       "Users need to download the Intent File from 'Upload CSV Files' pop-up. Changes to this file will be accepted by the system.",
      //   });
      //   this.file_label = "Choose file";
      // } else {
      this.file_content = event.target.files[0];
      // }
    },
    file_submit() {
      event.preventDefault();
      var user_details = {
        email: this.$session.get("UserInformation").email,
        token: this.$session.get("UserInformation").tokens,
        company_name: this.company_name,
        company_id: this.company_id,
        license_key: this.$session.get("UserInformation").license_key,
      };
      var json = JSON.stringify(user_details);
      var blob = new Blob([json], {
        type: "application/json",
      });
      if (this.file_label == "Choose file") {
      } else {
        const fd = new FormData();
        fd.append(
          "file",
          this.file_content,
          this.company_name + "QuestionsFile.csv"
        );
        fd.append("json", blob);
        $("#file_upload").modal("hide");
        this.spinnerOn = true;
        axios
          .post(api_calls.test_intent_model(), fd, {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          })
          .then((response) => {
            this.spinnerOn = false;
            if (response.data.Msg == "Results would be available soon") {
              swal({
                title: this.tlt('train_bot_file_submit_msg'),
                type: "success",
                timer: 2500,
              }).then((result) => {
                if (result.value) {
                  // $('#file_upload').modal('hide');
                  // this.$router.go();
                  // this.load_questions_response();
                }
              });
            } else {
              swal({
                title: this.tlt('train_bot_error_occur_msg1'),
                type: "error",
                timer: 2000,
              }).then((result) => {
                // $('#file_upload').modal('hide');
                this.file_label = "Choose file";
                document.getElementById("inputGroupFile01").value = "";
                this.load_questions_response();
              });
            }
            // $("#file_upload").modal("hide");
          })
          .catch((e) => {
            // console.log(e);
            if (
              e.response.status === 410 ||
              e.response.status === 440 ||
              e.response.status === 409
            ) {
              this.$root.$emit("Session_Expired", e.response.data);
            } else {
              Swal({
                title: this.tlt('train_bot_error_occur_msg2'),
                type: "error",
                timer: 2000,
              }).then((result) => {
                // $('#file_upload').modal('hide');
                this.file_label = "Choose file";
                document.getElementById("inputGroupFile01").value = "";
                this.load_questions_response();
              });
            }
          });
      }
    },
    page_require(page) {
      if (page == 0 || page == this.total_pages + 1) {
        event.preventDefault();
      } else {
        if (page == "...s") {
          this.page_no = Math.ceil((1 + this.page_no) / 2);
        } else if (page == "...l") {
          this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
        } else {
          this.page_no = page;
        }
        this.spinnerOn = true;
        this.get_questions_list();
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
    toggle() {
      // this.$fullscreen.toggle((document.body), {
      this.$fullscreen.toggle(this.$el.querySelector(".dash-cont"), {
        wrap: false,
        callback: this.fullscreenChange,
      });
    },
    fullscreenChange(fullscreen) {
      this.fullscreen = fullscreen;
    },
    train_and_test_model() {
      if(!this.disable_btn_expired){
      Swal({
        title: this.tlt('train_bot_swal_alert_msg'),
        text: this.tlt('train_bot_swal_train_model_msg2'),
        type: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.tlt('train_bot_swal_confirm_msg'),
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.value) {
          this.spinnerOn = true;
          axios
            .post(
              api_calls.train_intent_model(),
              {
                email: this.$session.get("UserInformation").email,
                token: this.$session.get("UserInformation").tokens,
                company_name: this.company_name,
                company_id: this.company_id,
                license_key: this.$session.get("UserInformation").license_key,
                test_model: true,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.spinnerOn = false;
              this.want_status = true;
              this.$root.$emit("want_model_status",this.want_status);
              this.check_intent_model_status();
              if (response.data.message.MSG_CODE == 20000091) {
                swal({
                  title: this.tlt('train_bot_result_avail_msg'),
                  text: response.data.MSG,
                  type: "success",
                  timer: 3500,
                }).then((result) => {
                  if (result.value) {
                    // $('#file_upload').modal('hide');
                    // this.$router.go();
                    // this.load_questions_response();
                  }
                });
              } 
              // else if (response.data.MSG_CODE === 1034) {
              //   swal({
              //     title: this.tlt('train_bot_model_error_occur_msg1'),
              //     text: response.data.MSG,
              //     type: "error",
              //     timer: 3000,
              //   }).then((result) => {
              //     if (result.value) {
              //       // $('#file_upload').modal('hide');
              //       // this.$router.go();
              //       // this.load_questions_response();
              //     }
              //   });
              // } 
              else {
                Swal({
                  title: response.data.message.MSG_CODE,
                  text: response.data.message.MSG,
                  showCancelButton: false,
                  showConfirmButton: false,
                  type: "error",
                  timer: 2500
                }).then((result) => {
                  // $('#file_upload').modal('hide');
                  this.file_label = "Choose file";
                  document.getElementById("inputGroupFile01").value = "";
                  this.load_questions_response();
                });
              }
              // $("#file_upload").modal("hide");
            })
            .catch((e) => {
              // console.log(e);
              if (
                e.response.status === 410 ||
                e.response.status === 440 ||
                e.response.status === 409
              ) {
                this.$root.$emit("Session_Expired", e.response.data);
              } else {
                Swal({
                  title: this.tlt('train_bot_model_error_occur_msg3'),
                  type: "error",
                  timer: 2000,
                }).then((result) => {
                  // $('#file_upload').modal('hide');
                  this.file_label = "Choose file";
                  document.getElementById("inputGroupFile01").value = "";
                  this.load_questions_response();
                });
              }
            });
        }
      });}else{
        this.show_subscription_expired_swal()
      }
    },
  },
  watch: {
    filter_status(){
      if(this.filter_status ===  'Failure'){
        this.selected_statuslist = ["Failure"];
      }else{
        this.selected_statuslist = ["Success"];
      }
      this.page_no = 1;
      this.per_page = 20;
    },
    selected_statuslist(newVal, oldVal) {
      if (newVal.length === 0) {
        setTimeout(() => {
          this.selected_statuslist = ["Success", "Failure"];
          this.get_questions_list();
        }, 200);
      } else {
        this.get_questions_list();
      }
    },
    current_selected_intent(newVal, oldVal) {
      if (Boolean(oldVal) && Boolean(newVal)) {
        for (
          let i = 0, n = this.current_selected_intent_questions.length;
          i < n;
          i++
        ) {
          this.current_selected_intent_questions[
            i
          ].intent = `${this.company_id}_${this.current_selected_intent}`;
        }
      }
    },
  },
};
</script>

<style scoped>
.radio label {
    margin-bottom: 0.3rem !important;
}
.dash-wrap .dropdown-toggle::after {
  display: none;
}
i[aria-expanded="true"] {
  color: #192765;
  text-align: center;
}
.dash-modal .close {
  top: 0px !important;
  position: inherit !important;
}
i:hover {
  color: #192765;
}
.fa-expand:hover {
  transform: scale(1.2);
}
.fa-compress:hover {
  transform: scale(1.2);
}
.save_node_button {
  font-size: 14px;
  color: #fff;
  background: #273679;
  border: solid 1px #273679;
  padding: 6px 15px;
  font-weight: 400;
  line-height: 20px;
  /* display: inline-block; */
  border-radius: 4px;
  cursor: pointer;
  float: right;
}
.table thead th {
  vertical-align: bottom;
  border-bottom: 0px;
}
.fullscreen {
  overflow: auto;
}
</style>
