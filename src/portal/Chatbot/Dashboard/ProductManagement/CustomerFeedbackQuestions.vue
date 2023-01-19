<template>
<div>
  <div class="row justify-content-center">
    <div class="card col-sm-12" style="min-height: 80vh;">
        <!-- <div class="table-responsive" v-if="spinnerOn"></div>
          <div class="table-responsive" v-if="product_names_list.length === 0"></div> -->
        <div
          class="table-responsive"
          style="overflow-x: unset;"
        >
        <div class="d-flex card-act px-0 pt-3">
          <h5 style="padding-top: 3px;">{{tlt('customer_feedback_manage_web_label')}}</h5>
        <button
          id="customer_feedback_add_questions_btn"
          class="darkblue-btn d-block ml-auto"
          style="padding: 6px 12px;"
          data-toggle="modal"
          data-target="#sendsms"
          title="Manage Questions"
        >
          {{tlt('customer_feedback_manage_qs_btn')}}
        </button>
        <!-- <button
          id="customer_feedback_save_all_btn"
          class="darkblue-btn d-block ml-auto"
          style="padding: 6px 12px;"
          @click="save_customer_feedback_questions"
        >
          SAVE ALL
        </button> -->
          </div>
          <hr>
          
          <div v-if="show_graphs && graph_data.length > 0" style="display:flex; flex-wrap:wrap;">
            <div v-for="(result, index ) in graph_data" :key="index" class="graphs-width-flex">
              <div>
            <span>Q - {{result.question}}</span>
            <new-pie
              :data="result.answers"
              :xKey="bar_chart_xKey"
              :yKey="bar_chart_yKey"
              :currency_key="``"
              :idempotency_key="index.toString()"
            />
            </div>
            </div>
          </div>
          <div v-else>
            <h6 class="text-center">
               {{tlt('customer_feedback_no_response_text')}} 
            </h6>
          </div>
          <!-- <div>
            <span>(You can define questions here to which the user can answer with a yes/no to give feedback)</span>
          </div>
          <hr />
          <div class="card-act d-flex pt-3 p-0">
            <input
              type="text"
              v-model="question"
              class="form-control"
              placeholder="Add another question"
              @keyup.enter="check_is_edit"
            />
            <button
              id="customer_feedback_add_btn"
              class="darkblue-btn ml-2"
              @click="add_question"
              v-if="!is_edit_question"
            >
              ADD
            </button>
            <button
              id="customer_feedback_edit_btn"
              class="darkblue-btn ml-2"
              @click="save_edit_question"
              v-if="is_edit_question"
            >
              EDIT
            </button>
          </div>
          <div class="mt-3 px-0 pt-3">
            <h5>Questions List</h5>
            <div style="border-bottom: 1px solid #e3e2e5"></div>
            <div
              v-for="(questions, index) in question_list"
              :key="index"
              class="py-2 d-flex"
              :class="check_current_edit_question(index, null)"
            >
              <span> {{ questions }} </span>
              <span
                class="ml-auto c-p edit-delete-span"
                @click="edit_question(index)"
              >
                <img
                  :src="require('@/portal/assets/img/edit-pencil-from-xd.svg')"
                  alt="Edit"
                />
              </span>
              <span
                class="ml-2 c-p edit-delete-span"
                @click="delete_question(index)"
              >
                <img
                  :src="require('@/portal/assets/img/delete-from-xd.svg')"
                  alt="Delete"
                />
              </span>
            </div>
          </div> -->
        </div>
      </div>
    </div>
     <div
      id="sendsms"
      class="modal fade dash-modal"
      role="dialog"
    >
      <!-- data-keyboard="false"
      data-backdrop="static" -->
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt />
              </div>
              <h3>{{tlt('customer_feedback_model_question_header')}}</h3>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
              >
                <img src="/img/close-icn.png" alt />
              </button>
            </div>
            <div class="card-act p-0">
            <h5>{{tlt('customer_feedback_model_add_qs_label')}}</h5>
            <h6 class="mb-0">{{tlt('customer_feedback_model_question_label')}}</h6>
            <input
              type="text"
              v-model="question"
              class="form-control"
              :placeholder="tlt('add_question_label')"
              @keyup.enter="check_is_edit"
            />
            <h6 class="mb-0 mt-2">{{tlt('customer_feedback_model_options_label')}} <span style="font-weight:200">{{tlt('customer_feedback_model_options_help_text')}}</span> <span style="font-weight:400"> (*Press "Enter" key every time when you add a tag)</span></h6>
            <tags-input
              v-model="question_options"
              wrapper-class="form-control"
              :limit="5"
              :placeholder="tlt(`Type and Enter'`)"
              class="tag-input-class"
              id="tag-input-field"
            ></tags-input>
            <button
              id="customer_feedback_add_btn"
              class="darkblue-btn mt-3"
              @click="add_question"
              v-if="!is_edit_question"
            >
              {{tlt('customer_feedback_add_btn')}}
            </button>
            <button
              id="customer_feedback_edit_btn"
              class="darkblue-btn mt-3"
              @click="save_edit_question"
              v-if="is_edit_question"
            >
              {{tlt('customer_feedback_edit_btn')}}
            </button>

          </div>
          <hr>
          <h5>{{tlt('customer_feedback_model_active_qs_label')}}</h5>
            <div
              v-for="(questions, index) in question_list"
              :key="index"
              class="py-2 d-flex"
              :class="check_current_edit_question(index, null)"
            >
              <div>
              <span>{{tlt('customer_feedback_question_label')}}: {{ questions.question }} </span>
              <br>
              <span>{{tlt('customer_feedback_option_label')}}: {{questions.options.map((item) => item.value).toString()  }}</span>
            </div>
              <span
                class="ml-auto c-p edit-delete-span"
                @click="edit_question(index)"
              >
                <img
                  :src="require('@/portal/assets/img/edit-pencil-from-xd.svg')"
                  alt="Edit"
                />
              </span>
              <span
                class="ml-2 c-p edit-delete-span"
                @click="delete_question(index)"
              >
                <img
                  :src="require('@/portal/assets/img/delete-from-xd.svg')"
                  alt="Delete"
                />
              </span>
            </div>
          </div>
          <div class="modal-footer">
            <div class="btn-wrap text-right mt-0 py-0 border-top-0">
              <button
                type="button"
                class="btn btn-link"
                data-dismiss="modal"
              >
                {{tlt('customer_feedback_cancel_btn')}}
              </button>
              <button
                type="buttton"
                class="darkblue-btn"
                id="customer_feedback_questions_save"
                @click="save_customer_feedback_questions"
              >
                {{tlt('customer_feedback_save_all_btn')}}
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
import api_calls from "@/portal/api_calls.js";
import Swal from "sweetalert2";
import { freeze_portal } from "@/portal/mixins";
import NewPie from "@/portal/analytics/components/NewPieChart.vue"
import VoerroTagsInput from '@voerro/vue-tagsinput';


export default {
  name: "CustomerFeedbackQuestionsPage",
  mixins: [freeze_portal],
  components: {
    "new-pie": NewPie,
    'tags-input': VoerroTagsInput
  },
  data() {
    return {
      spinnerOn: false,
      company_id: this.$session.get("UserInformation").company_id,
      company_name: this.$session.get("UserInformation").company_name,
      question: "",
      question_list: [],
      is_edit_question: false,
      current_edit_index: null,
      disable_btn_expired: false,
      show_graphs: false,
      barChartData: [],
      bar_chart_xKey: "key",
      bar_chart_yKey: "value",
      question_options: [],
      graph_data : [],
      show_max_limit_reached_msg: false
    };
  },
  watch: {
    question_list(){
      // console.log("UPDATE",this.question_list);
    }
  },
  mounted() {
    this.get_customer_feedback_questions();
    this.get_customer_feedback_responses()
    setTimeout(() => {
      this.freeze_portal();
    }, 3000);
    this.$root.$on("CustomerFeedbackQuestionsPageDisabled", (data) =>{
      if(data===true){
        this.disable_btn_expired = true;
      }
    });

  },
  methods: {
    check_is_edit() {
      return this.is_edit_question
        ? this.save_edit_question
        : this.add_question;
    },
    add_question() {
      if(!this.disable_btn_expired){
      if (this.question_list.length > 9) {
        Swal({
          text: this.tlt('customer_feedback_add_question_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      }
      if (Boolean(this.question) === true) {
        this.question_list.push({
        question: this.question,     
        options:  JSON.parse(JSON.stringify(this.question_options))
        });
        
        this.question_options = [];
        this.question = null;
      }}else {
        this.show_subscription_expired_swal()
      }
    },
    delete_question(index) {
      this.question_list.splice(index, 1);
    },
    edit_question(index) {
      if (!this.is_edit_question) {
        this.question = this.question_list[
          index
        ].question;
        this.question_options = this.question_list[
          index
        ].options;
        this.current_edit_index = index;
        this.is_edit_question = true;
      } else {
        this.reset_edit();
      }
    },
    save_edit_question() {
      if(!this.disable_btn_expired){
        this.question_options = this.question_options.map((item) => {
          item.key = Boolean(item.key) == false ? this.generateUUID() : item.key;
          return item;

        })
      this.question_list[
        this.current_edit_index
      ].question = this.question;
      this.question_list[
        this.current_edit_index
      ].options = this.question_options;
      this.reset_edit();
      }else{
        this.show_subscription_expired_swal()
      }
    },
    reset_edit() {
      this.is_edit_question = false;
      this.current_edit_index = null;
      this.question = null;
      this.question_options = [];
    },
    check_current_edit_question(index, tag) {
      if (Boolean(this.is_edit_question) === true) {
        if (tag === "span") {
          return "not-current-edit-synonym-span";
        } else {
          return this.current_edit_index === index
            ? "current-edit-synonym"
            : "not-current-edit-synonym";
        }
      } else {
        return "not-editing-synonyms";
      }
    },
    save_customer_feedback_questions() {
      if (!this.disable_btn_expired){
      axios
        .post(
          api_calls.customer_feedback_questions(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            license_key: this.$session.get("UserInformation").license_key,
            questions: this.question_list,
            is_save: true,
            token: this.$session.get("UserInformation").tokens
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then(({ data }) => { 
          if (data.message.MSG_CODE == this.api_status_code.SUCCESSFUL_DB_QUERY_MODELS.MSG_CODE) {
            Swal({
              type: "success",
              text: this.tlt('customer_feedback_qs_saved_msg'),
              timer: 2500,
            }).then((result) => {
                this.get_customer_feedback_questions();
            });
          }else {
              Swal({
              type: "error",
              text: this.tlt('customer_feedback_server_failure_msg'),
              timer: 2500,
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
          }
        });
      }else {
        this.show_subscription_expired_swal()
      }
    },
    get_customer_feedback_questions() {
        this.question_list = [];
      axios
        .post(
          api_calls.customer_feedback_questions(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            license_key: this.$session.get("UserInformation").license_key,
            is_get: true,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then(({ data }) => {
          if (data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE_MODELS.MSG_CODE) {
            if (data.data.data.length > 0) {
                this.question_list = data.data.data;         

              //  this.question_list =  this.question_list.map((item) => {
                  // let question = item;
                  // item = {};
                  // item.question = question;
                  // item.options = [
                  //   {key: this.generateUUID(),
                  //   value: 'Yes'
                  //   },
                  //   {key: this.generateUUID(),
                  //   value: 'No'
                  //   },
                  //   ];
                  // return item;
                // })
            }
          }
          else if (data.message.MSG_CODE == this.api_status_code.EMPTY_DATA_MODELS.MSG_CODE){
            
          }else if (data.message.MSG_CODE == this.api_status_code.UNSUCCESSFUL_DB_OPERATION_MODELS.MSG_CODE){
            
          }
          else{
            Swal({
              title: data.message.MSG_CODE,
              text: data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              type: "error",
              timer:2500
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
          }
        });
    },
    get_customer_feedback_responses() {
      axios
        .post(
          api_calls.customer_feedback_questions(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            license_key: this.$session.get("UserInformation").license_key,
            is_get_responses: true,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        ).then(({ data }) => {     
          if(data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE_MODELS.MSG_CODE){
            let data = data.data.data;
            let result = [];
            for (const property in data) {
              const counts = {};
              for (var i = 0; i < data[property].length; i++) {
                counts[data[property][i]] = 1 + (counts[data[property][i]] || 0);
              };
              let question_data = {
                question: property,
                answers: []
              }
              for (const k in counts) {
                let obj = {};
                obj.key = k;
                obj.value = counts[k];
                question_data.answers.push(obj);
              }
              result.push(question_data);
            }
            this.graph_data = result;
            this.show_graphs = true;
          }else if(data.message.MSG_CODE == this.api_status_code.EMPTY_DATA_MODELS.MSG_CODE){
      
          }else if(data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR_MODELS.MSG_CODE){
            Swal({
              title: data.message.MSG_CODE,
              text: data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              type: "error"
            })          
          }else{
            Swal({
              title: data.message.MSG_CODE,
              text: data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              type: "error"
            })
          }
        }).catch((e) => {
          console.log(e)
        })
    },
    generateUUID() {
      // Public Domain/MIT
      var d = new Date().getTime(); //Timestamp
      var d2 =
          (performance && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
          c
      ) {
          var r = Math.random() * 16; //random number between 0 and 16
          if (d > 0) {
          //Use timestamp until depleted
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
          } else {
          //Use microseconds since page-load if supported
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
          }
          return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      });
    },
  },
};
</script>

<style scoped>
.modal-xl {
  max-width: 800px !important;
}
.not-current-edit-synonym {
  opacity: 0.2;
  pointer-events: none;
}
.not-editing-synonyms {
  border-bottom: 1px solid #e3e2e5;
}
.current-edit-synonym {
  transform: scale(1.02);
  border: 3px solid #27397b;
  z-index: 2;
  background: #dddddd;
  padding: 0.5rem;
} 
hr {
  margin: 0.5em 0em ;
}
.graphs-width-flex {
  flex: 24%;
}
</style>
<style>
.form-control.tags-input {
height: 38px;
padding: 10px 15px !important;
}

</style>
<style src="@voerro/vue-tagsinput/dist/style.css"></style>