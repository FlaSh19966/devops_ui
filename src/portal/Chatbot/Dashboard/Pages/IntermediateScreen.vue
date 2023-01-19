<template>
  <div class="log-wrap d-flex align-items-center">
    <div
      class="spinner"
      v-show="spinnerOn"
    ></div>
    <div class="container" style="min-width: 35%">
      <div class="log-blk" style="margin-top: 20px">
        <div class="row no-gutters">
          <div class="col-lg-12">
            <div
              v-if="containsKey('notify_candidate')"
              class="log-sec d-flex align-items-center"
            >
              <div class="log-frm">
                <img
                  src="/img/cense_image.png"
                  alt=""
                  style="width: 100%; padding: 0px 70px"
                />
              </div>
              <div class="log-frm" style="text-align: center; max-width: 100%">
                <p v-html="message"></p>
              </div>
            </div>
            <div
              v-if="containsKey('schedule_appointment')"
              class="log-sec align-items-center"
            >
              <div
                class="log-frm"
                style="margin-bottom: 20px; text-align: center"
              >
                <img
                  v-if="company_logo"
                  :src="company_logo"
                  alt=""
                  style="width: 70%; padding: 0px 70px"
                />
                <img
                  v-else
                  src="/img/cense_image.png"
                  alt=""
                  style="width: 100%; padding: 0px 70px"
                />
              </div>
              <div
                class="log-frm"
                style="text-align: center; max-width: 100%; margin-bottom: 20px"
              >
                <p style="font-size: 20px; font-weight: 600">
                  Congratulations {{ query_string.name }} you have been
                  shortlisted for your applied position
                  {{ query_string.position }}.
                  <br />
                  Please select date &#38; time for interview
                </p>
              </div>
              <div
                class="form-group create-schedule-input d-flex"
                style="justify-content: center"
              >
                <input
                  type="text"
                  v-model="query_string.name"
                  class="form-control required"
                  placeholder="Candidate Name"
                  disabled
                />
                <!-- <div
                  class="required-box "
                  :class="{'disabled':edit_scheduling}"
                >
                  <span class="required-text">*</span>
                </div> -->
              </div>
              <div
                class="form-group create-schedule-input d-flex"
                style="justify-content: center"
              >
                <input
                  v-model="query_string.candidate_email"
                  class="form-control"
                  placeholder="Candidate Email"
                  disabled
                />
              </div>
              <div
                class="form-group create-schedule-input d-flex"
                style="justify-content: center"
              >
                <input
                  type="text"
                  v-model="query_string.contact_number"
                  class="form-control"
                  placeholder="Contact Number"
                  disabled
                />
              </div>
              <!-- <div class="log-frm" style="text-align:center; max-width: 100%; margin-bottom: 10px;">
                <p>Selected Date : {{selected_date}}</p>
              </div> -->
              <div
                style="text-align: center; margin-bottom: 10px"
              >
              <p style="font-size: 20px; font-weight: 600">
                  Select a Date &#38; Time
                </p>
              </div>
              <div class="form-group row" style="justify-content: center;">
              
                <date-picker
                  class="form-group ml-0"
                  v-model="selected_date"
                  format="YYYY-MM-DD"
                  @change="get_hr_schedule"
                  placeholder="Select date"
                  :disabled-date="disabledBeforeToday"
                  type="date"
                  :inline="true"
                ></date-picker>
              <div
                class="form-group create-schedule-input d-flex"
                style="justify-content: center; height: 280px"
              >
                <div class="timeslot-main" style="width: 100%; overflow-y: scroll;">
                  <div
                    class="times"
                    style="
                      padding-right: 5px;
                      overflow: auto;
                    "
                  >
                    <div
                      class="spot-list"
                      style="
                        overflow: hidden;
                        white-space: nowrap;
                        -webkit-user-select: none;
                        -ms-user-select: none;
                        user-select: none;
                      "
                    >
                      <div
                        class="list-item"
                        style="margin-bottom: 10px; font-size: 16px"
                        v-for="(time, index) in time_slots"
                        :key="index"
                      >
                        <button
                          class="time-btn"
                          :class="time == selected_time ? 'time-active' : ''"
                          @click="select_timeslot(time)"
                        >
                          {{ time }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- <select
                  v-model="selected_time"
                  class="form-control"
                  placeholder=""
                  required
                >
                  <option v-if="time_slots.length > 0" selected value>
                    Select Time Slot
                  </option>
                  <option v-else selected value>No Time Slot Availabe</option>
                  <option
                    :value="time"
                    v-for="(time, index) in time_slots"
                    :key="index"
                  >
                    {{ time }}
                  </option>
                </select> -->
              </div> 
              </div>
              <div class="btn-wrap d-flex justify-content-between">
                <button
                  @click="confirm_appointment"
                  class="darkblue-btn ml-auto mr-auto text-uppercase"
                  style="width: auto"
                >
                  Book an interview
                </button>
              </div>
            </div>
            <div v-if="containsKey('application_form')"
              class="log-sec align-items-center">
              <div v-if="!is_submit">
                <div class="col-sm-12 form-group mb-0">
                  <p style=" color: #1454c7 !important; font-weight: bold !important; font-size: 25px !important;
                    height: 3rem !important;text-align: center;width: 99%;">
                    Application form</p>
                </div>
                <div class="col-sm-12 form-group" style="border:1px solid rgb(178 206 235)!important;border-radius:12px;">
                  <form @submit.prevent="save_application_form" >
                    <div v-for="(requirement, index) in requirement_form"
                        :key="index"
                    >
                      <div class="form-group" v-if="requirement.type === 'text'">
                        <label class="font-weight-bold text-md">{{requirement.key_name}}</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Enter your name"
                          v-model="requirement.key_value"
                        >
                      </div>
                      <div class="form-group" v-if="requirement.type === 'email'">
                        <label class="font-weight-bold text-md">{{requirement.key_name}}</label>
                        <input
                          type="email"
                          class="form-control"
                          placeholder="Enter your Email"
                          v-model="requirement.key_value"
                        >
                      </div>
                      <div id = "radio-bttn" class="align-items-center form-group mb-2" v-if="requirement.type === 'choice'">
                        <label class="mr-3 align-items-center font-weight-bold">{{requirement.key_name}}</label>
                        <div v-for="(option,indx) in requirement.options"
                            :key="indx" class="mr-2" style="position: relative;bottom:2px;">
                          <input
                            type="radio"
                            value= option
                            class=""
                            style="position: relative;top: 2px;"
                            placeholder="Enter your Email"
                            v-model="selected_options.key_value"
                            name="available_option"
                            @click="select_radio_button(indx,requirement)"
                          >
                        <label class="ml-2"> {{option}} </label>
                        </div>
                      </div>
                      <div class="form-group" v-if="requirement.type === 'number'">
                        <label class="font-weight-bold text-md">{{requirement.key_name}}</label>
                        <input
                          type="number"
                          placeholder="Year of experience"
                          v-model="requirement.key_value"
                          value="0"
                          id="year-exp"
                          style="box-shadow: none;border: solid 1px #DBE2E8;font-size: 16px;
                                line-height: 30px;height: auto;outline: none;color: #9499AE;font-weight: 400;
                                background-position: 15px 10px !important;width: 20 %;padding-left: 10px;margin-left: 10px;}" 
                          min="0"
                        >
                      </div>
                      <div  id ="multi-choice" class="form-group  align-items-center" v-if="requirement.type === 'multichoice'">
                        <label class="font-weight-bold text-md">{{requirement.key_name}}</label>
                          <div v-for="(option,indx) in requirement.options"
                            :key="indx"
                          >
                            <div class="form-check checkbox checkbox-success d-flex align-items-center mb-2" id="single-option">
                              <label class="">
                                <input
                                  class=""
                                  type="checkbox"
                                  @change="selected_options(indx,requirement)"
                                >
                                <span class="icn"></span>
                              </label>
                              <span class="mb-1" style="position: relative;">{{option}}</span>
                            </div>
                          </div>
                      </div>
                      <div class="form-group d-flex mb-1 " v-if="requirement.type== 'file'">
                        <label class="mt-3 pl-0 font-weight-bold text-md">{{requirement.key_name}}</label>
                        <input type="file" id="upload_file" class="form-control pl-2" style="margin-left: 1.5rem;" @change="upload_files">
                      </div>                  
                    </div>
                    <div style ="text-align: center;" >
                      <button type="submit" class="col-sm-2  mt-4 ml-3 pt-2 pl-2 pr-2 mb-2" id="save-bttn"
                      style="width: 13%;background: #1454c7!important;font-size: 14px; color: #fff; background: #1454c7; border: solid 1px #273679; padding: 6px 15px; 
                      font-weight: 400; line-height: 20px; display: inline-block; border-radius: 4px; cursor: pointer;">
                      Save</button>  
                    </div>
                  </form>
                </div>
              </div>
              <div class="col-sm-12 form-group mb-0" v-else>
                <p style=" color: #1454c7 !important; font-weight: bold !important; font-size: 25px !important;
                  height: 3rem !important;text-align: center;width: 99%;">
                  Thank you!!!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import api_calls from "@/portal/api_calls";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import "../../../../../public/css/segoe-ui.css";
import moment from "moment";
import fingerprint from "@/portal/components/fingerprint";

export default {
  components: {
    DatePicker,
  },
  data() {
    return {
      query_string: null,
      message: "",
      selected_date: new Date().toISOString(),
      curr_date: new Date().toISOString(),
      selected_time: "",
      time_slots: [],
      company_logo: null,
      minimum_notice_days: 1,
      meeting_days_range: "",
      selected_files: '',
      reg_email: /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/,
      requirement_form: [],
      position_description: '',
      is_submit : false,
      spinnerOn :false
    };
  },
  watch: {
    // selected_date(val) {
    //   this.get_hr_schedule();
    // }
  },
  created() {
    this.query_string = this.$route.query;
  },
  mounted() {
    this.get_form_data();
    // http://localhost:8080/bot/intermediate-screen?schedule_appointment=true&company_id=wootest127672&company_name=WooTest1&candidate_email=akshaybadhe%40ternaengg.ac.in&position=Python&contact_number=9869533907&name=Akshay%20Badhe
    if (
      Boolean(this.query_string) &&
      this.query_string.notify_candidate == "true"
    ) {
      this.hr_send_email();
    } else if (
      Boolean(this.query_string) &&
      this.query_string.schedule_appointment == "true"
    ) {
      this.get_hr_schedule();
    } else if(
      Boolean(this.query_string) &&
      this.query_string.application_form == "true"
    ) {
      this.get_form_data();
    }
    axios
      .post(api_calls.hr_get_schedule_appointment(), {
        company_name: this.query_string.company_name,
        company_id: this.query_string.company_id,
        get_scheduling_info: true,
      })
      .then((response) => {
        if (response.data != null) {
          this.company_logo = response.data.company_logo;
          this.minimum_notice_days = response.data.minimum_notice_days;
          this.meeting_days_range = response.data.meeting_days_range;
        } else {
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
  methods: {
    select_timeslot(val) {
      var vm = this;
      console.log(val);
      vm.selected_time = val;
    },
    containsKey(key) {
      return Object.keys(this.query_string).includes(key);
    },
    disabledBeforeToday(date) {
      console.log(date);
      const today = new Date();
      const range = new Date();
      today.setDate(today.getDate() + this.minimum_notice_days);
      range.setDate(range.getDate() + this.meeting_days_range);
      return date < today || date > range;
    },
    get_hr_schedule() {
      axios
        .post(api_calls.hr_get_schedule_appointment(), {
          company_name: this.query_string.company_name,
          company_id: this.query_string.company_id,
          Date: moment(this.selected_date).format("YYYY-MM-DD"),
          appointment_date: moment(this.selected_date).format("YYYY-MM-DD"),
        })
        .then((response) => {
          if (response.data != null) {
            if (response.data.msg == "Please update your scheduler settings") {
              toastr.error("Please update your scheduler settings");
              Swal.fire({
                title: "Please update your scheduler settings",
                type: "info",
                timer: 3000,
              }).then((result) => {});
            } else if (response.data.msg == "Internal Server Error") {
              Swal.fire({
                title: "Internal Server Error",
                type: "error",
                timer: 3000,
              }).then((result) => {});
            } else {
              this.time_slots = response.data.available_time_slots;
            }
          } else {
            this.message =
              'Some error occured, please contact us at <a href="mailto:support@cense.ai">support@cense.ai</a>';
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
    confirm_appointment() {
      if (this.selected_time == "") {
        Swal.fire({
          title: "Please Select a time slot",
          type: "warning",
          timer: 3000,
        });
        return;
      }
      Swal.fire({
        title: "Are you sure?",
        text:
          "You have selected this " +
          moment(this.selected_date).format("YYYY-MM-DD") +
          " date and " +
          this.selected_time +
          " this time slot for interview.",
        type: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Confirm!",
      }).then((result) => {
        if (result.value) {
          axios
            .post(api_calls.hr_schedule_appointment(), {
              company_name: this.query_string.company_name,
              company_id: this.query_string.company_id,
              Date: moment(this.selected_date).format("YYYY-MM-DD"),
              appointment_date: moment(this.selected_date).format("YYYY-MM-DD"),
              candidate_email: this.query_string.candidate_email,
              candidate_name: this.query_string.name,
              candidate_contact_number: this.query_string.contact_number,
              candidate_visit_date: moment(this.selected_date).format(
                "YYYY-MM-D"
              ),
              candidate_visit_slot: this.selected_time,
              candidate_position: this.query_string.position,
            })
            .then((response) => {
              if (
                response.data.msg != undefined &&
                response.data.msg == "Appointment Added Successfully"
              ) {
                Swal.fire({
                  title:
                    "Interview appointment booked successfully " +
                    this.query_string.name,
                  type: "success",
                  timer: 3000,
                });
              } else if (response.data.msg == "Internal Server Error") {
                Swal.fire({
                  title: "Internal Server Error",
                  type: "error",
                  timer: 3000,
                });
              } else if (
                response.data.msg == "Token Invalid" ||
                "Interview already schedule"
              ) {
                Swal.fire({
                  title: "Link Expired",
                  type: "warning",
                  timer: 3000,
                });
              } else {
                this.message =
                  'Some error occured, please contact us at <a href="mailto:support@cense.ai">support@cense.ai</a>';
              }
            })
            .catch((e) => {
              // this.insert_variable('quill', this.slot_variable);
              this.spinnerOn = false;
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
    },
    hr_send_email() {
      axios
        .post(api_calls.hr_bot_notify_candidate(), this.query_string)
        .then((response) => {
          if (response.data.MSG == "Email is being sent to candidate") {
            Swal.fire({
              title:
                "Email Sent Successfully to Candidate " +
                this.query_string.name,
              type: "success",
              timer: 3000,
            }).then((result) => {});
            this.message =
              "Email Sent Successfully to Candidate, close this window.";
          } else if (
            response.data.MSG == "Please upgrade your plan to send emails"
          ) {
            Swal.fire({
              title: "Please upgrade your plan to send emails",
              type: "error",
              timer: 3000,
            }).then((result) => {});
            this.message = "Please upgrade your plan to send emails.";
          } else if (
            response.data.MSG ==
            "You have reached the Quota allotted for sending emails"
          ) {
            Swal.fire({
              title: "You have reached the Quota allotted for sending emails",
              type: "warning",
              timer: 3000,
            }).then((result) => {});
            this.message =
              "You have reached the Quota allotted for sending emails. Please get a Email Add On.";
          } else if (response.data.MSG == "Already Notified") {
            Swal.fire({
              title: "Already Notified to this candidate",
              type: "info",
              timer: 3000,
            }).then((result) => {});
            this.message = "Already Notified to this candidate";
          } else if (response.data.MSG == "Internal Server Error") {
            Swal.fire({
              title: "Internal Server Error",
              type: "error",
              timer: 3000,
            }).then((result) => {});
            this.message =
              'Some error occured, please contact us at <a href="mailto:support@cense.ai">support@cense.ai</a>';
          } else {
            this.message =
              'Some error occured, please contact us at <a href="mailto:support@cense.ai">support@cense.ai</a>';
          }
        })
        .catch((e) => {
          // this.insert_variable('quill', this.slot_variable);
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
    selected_options(index,list_options){
      if(event.target.checked == true){
        list_options.key_value.push(list_options.options[index])
      }else{
        list_options.key_value.splice(index,1);
      }
    },
    select_radio_button(index,requirement){
      requirement.key_value = requirement.options[index];
    },
    upload_files(e){
      this.selected_files = e.target.files;
      if(this.selected_files.length > 0){
        if (this.selected_files[0].size > 5097152) {
          Swal({
            text: "Upload image with size should be less than 2MB",
            toast: true,
            position: "top-end",
            type: "error",
            showConfirmButton: false,
            timer: 2000
          });
          this.selected_files ='';
        }
      }else{
        this.selected_files ='';
      }
    },
    save_application_form(){
      let email_value = '';
      for( let i =0; i<this.requirement_form.length; i++){
        if(this.requirement_form[i].type == 'file' && this.selected_files != ''){
          this.requirement_form[i].key_value.push(this.selected_files[0].name);        
        }
        if (this.requirement_form[i].key_value == '' || this.requirement_form[i].key_value == [] || this.requirement_form[i].key_value == {}||
            this.requirement_form[i].key_value == null
        ){
            Swal({
            text: "Please fill all given field",
            toast: true,
            position: "top-end",
            type: "error",
            showConfirmButton: false,
            timer: 2000
          });
          return
        }
        if(this.requirement_form[i].type == 'email'){
          email_value = this.requirement_form[i].key_value;
           if (!this.reg_email.test(email_value)){
           Swal({
            text: "Please entre valid email",
            toast: true,
            position: "top-end",
            type: "error",
            showConfirmButton: false,
            timer: 2000
            });
            return
           }
        }
      }
      var user_details ={
        company_name: this.query_string.companyname,
        company_id: this.query_string.companyid,
        position_name:this.query_string.positionname,
        candidate_email : email_value,
        requirement_form:this.requirement_form,
        is_save:true
      };
      var json = JSON.stringify(user_details);
      var blob = new Blob([json], {
        type: "application/json",
      });
      const fd = new FormData();
      for (let j=0 ;j<this.selected_files.length;j++){
        fd.append(
          this.selected_files[j].name,
          this.selected_files[j]
        )
      }
      fd.append("json", blob);
      this.spinnerOn = true;
      axios
      .post(
        api_calls.hr_requirement_form(),fd
      )
      .then((response)=>{
        this.spinnerOn = false;
        this.requirement_form = [];
        this.is_submit = true;
        if (
          response.data.msg != undefined &&
          response.data.msg == "Application Added Successfully"
        ) {
          Swal.fire({
            title:
              "Form Submitted Successfully",
            type: "success",
            timer: 3000,
          });
        } else if (response.data.msg == "Internal Server Error") {
          Swal.fire({
            title: "Internal Server Error",
            type: "error",
            timer: 3000,
          });
        } else if (
          response.data.msg =="Candidate application already exists"
        ) {
          Swal.fire({
            title: "Candidate application already exists",
            type: "warning",
            timer: 3000,
          });
        } else {
          this.message =
            'Some error occured, please contact us at <a href="mailto:support@cense.ai">support@cense.ai</a>';
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
    get_form_data(){
      var user_details ={
        company_name: this.query_string.companyname,
        company_id: this.query_string.companyid,
        position_name:this.query_string.positionname,
        is_get:true,
      };
      var json = JSON.stringify(user_details);
      var blob = new Blob([json], {
        type: "application/json",
      });
      const fd = new FormData();
      fd.append("json", blob);
      this.spinnerOn = true;
      axios 
        .post(
          api_calls.hr_requirement_form(),fd
        )
        .then((response)=>{
          this.spinnerOn = false;
          this.position_description = response.data.position_description;
          this.requirement_form = response.data.requirement_form;
          for(let j =0 ;j<this.requirement_form.length ;j++){
            if(this.requirement_form[j].type != 'multichoice' && this.requirement_form[j].type !='file'){
              this.requirement_form[j]['key_value']= '';
            }else{
              this.requirement_form[j]['key_value']= [];
            }
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
  },
};
</script>

<style scoped>
.timeslot-main::-webkit-scrollbar {
  max-height: 10px;
  width: 7px;
  height: 7px;
  border-radius: 10px;
  overflow-x: hidden;
}
.timeslot-main::-webkit-scrollbar-track {
  background: #ffffff;
  border-radius: 10px;
}
.timeslot-main::-webkit-scrollbar-thumb {
  background: #7d7d7d;
  border-radius: 10px;
}
.timeslot-main::-webkit-scrollbar-thumb:hover {
  background: #7d7d7d;
  border-radius: 10px;
}
.time-btn {
  width: 100%;
  height: 40px;
  background: white;
  color: var(--primary-color, rgb(0, 105, 255));
  border: 3px solid
    var(
      --primary-color-level2,
      rgba(0, 105, 255, 0.5)
    );

  position: relative;
  padding: 0px 10px;
  font-weight: 700;
  vertical-align: top;
  border-radius: 4px;
  transition: all 0.3s ease;
  transition-property: width, transform;
}
.time-btn:hover {
  border-color: var(--primary-color, rgb(0, 105, 255));
  border-width: 3px;
}
.time-active {
  border-color: var(--primary-color, rgb(0, 105, 255));
  background-color: rgb(0, 105, 255);
  color: white;
  border-width: 3px;
}
/* .time-active {

} */
.form-group {
  padding: 5px 15px 5px 15px;
}
.form-control {
  font-size: 16px;
  padding: 5px 15px 5px 30px;
}
@media (max-width:450px) {
  #save-bttn {
    width: 30% !important;
  }
  #single-option{
    padding-left: 0 !important;
  }
}
@media (min-width:451px) {
  #multi-choice {
    display: flex !important;
  }
  #radio-bttn {
    display: flex !important;
  }
  #single-option{
    padding-left: 20px !important;
  }
}
@media (max-width:380px) {
  #year-exp{
    padding-left: 5px !important;
    margin-left: 0 !important;
  }
}
</style>
<style>
</style>