<template>
  <div>
      <div class="spinner" id="spinner" v-show="spinnerOn"></div>
      <div class="dash-modal container-fluid py-0 px-0 mx-0 my-0">
        <div class="modal-content py-0 px-0 mx-0 my-0">
          <div class="modal-head text-center  py-0 px-0 mx-0 my-0">
              <h5 class="py-1 px-0 mx-0 my-0">{{tlt('valuable_suggestion_header')}}</h5>
              <hr class="py-0 px-0 mx-0 my-0">
          </div>
          <div class="modal-body my-0 mx-0 pt-2 pb-0 px-2">
            <form @submit.prevent="add_feedbacks">
                <div
                  class="form-group mx-0 my-0 px-0 py-0"
                >
                  <textarea
                    type="text"
                    rows="19"
                    v-model.trim="add_feedbacks_text"
                    class="form-control mx-0 my-0 px-2 py-2"
                    :placeholder="tlt('enter_suggestion')"
                    :id="`enter_feedback_id`"
                  />
                </div>
                <!-- <hr class="mx-0 my-2 px-0 py-0"> -->
                <div class="form-group d-flex mb-1">
                  <label class="mb-2 ml-2 mt-2 font-weight-bold col-2 text-center pt-1">{{tlt('upload_attachment_label')}}</label>
                  <input type="file" id="upload_file" multiple class="form-control" @change="Upload_files">
                </div>
              <div class="btn-wrap text-right mx-0 mt-2 mb-0 px-0 py-0">
                <button
                  type="button"
                  class="btn btn-link btn-cancel mt-2"
                  @click="clear_fields"
                >
                  {{tlt('feedback_page_cancel_btn')}}
                </button>
                <button type="submit" class="darkblue-btn mt-2" id="save_feedback">
                  {{tlt('feedback_page_submit_btn')}}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";
import api_calls from "@/portal/api_calls";
import { setTimeout } from "timers";
export default {
  name: "Feedback",
  data() {
    return {
      spinnerOn: false,
      checked_list: [],
      total_pages: null,
      page_no: 1,
      per_page: 20,
      new_feedback_list: [],
      new_feedbacks_text: "",
      feedbacklist: [],
      companyname: "",
      companyid: "",
      number_of_rows: null,
      edit: "False",
      old_feedback_data: "",
      new_feedback_data: "",
      search_name: "",
      page_array: [],
      add_feedbacks_text: "",
      isGlobalEdit: false,
      global_feedbacks_edit_list: [],
      show_no_feedbacks_message: false,
      isInsert: false,
      isShow: false,
      feedback: "",
      new_feedback: "",
      old_feedback: "",
      isEdit: false,
      feedback_list: "",
      isDelete: "",
      searchstring: "",
      attachment_files: null,
      new_attachment_files:[],
      list_attachments_name:[],
    };
  },
  created() {
    if (this.$session.get("UserInformation").role == "SuperAdmin") {
      if (this.$session.has("CompanyId")) {
        this.companyid = this.$session.get("CompanyId");
        this.companyname = this.$session.get("CompanyName");
      } else {
        this.companyid = this.$session.get("UserInformation").company_id;
        this.companyname = this.$session.get("UserInformation").company_name;
        toastr.warning(this.tlt('feedback_select_company_name_msg'));
      }
    } else {
      this.companyid = this.$session.get("UserInformation").company_id;
      this.companyname = this.$session.get("UserInformation").company_name;
    }
  },
  mounted() {
    this.clear_fields();
  },
  methods: {
    clear_fields(){
      this.add_feedbacks_text="";
      this.attachment_files = '';
      this.new_attachment_files = [];
      this.list_attachments_name = []
    },
    add_feedbacks() {
        if (this.add_feedbacks_text === ""){
            toastr.error(this.tlt('feedback_enter_feedback_msg'));
        }
        else{
            event.preventDefault();
            var user_details ={
              company_name: this.companyname,
              company_id: this.companyid,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              subscription: this.$session.get("UserInformation").subscription,
              feedback: this.add_feedbacks_text,
              // feedback: "",
              isInsert: true,
              // page_no: this.page_no,
              // per_page: this.per_page,
              // showfeedback: "False",
              files_list: this.list_attachments_name,
            };
            var json = JSON.stringify(user_details);
            var blob = new Blob([json], {
              type: "application/json",
            });
            const fd = new FormData();
            for (let j=0 ;j<this.new_attachment_files.length;j++){
                fd.append(
                  this.list_attachments_name[j],
                  this.new_attachment_files[j]
                  );                
            }
            fd.append("json", blob);
            this.spinnerOn = true;
            axios
              .post(
                api_calls.feedback_url(),fd,
                {
                  headers: {
                    Authorization: `Bearer ${this.$session.get("at")}`,
                  },
                }
              )
              .then((response) => {
                this.spinnerOn = false;
                let input_field = document.getElementById("upload_file");
                input_field.value = "";
                if (response.data.message.MSG_CODE === this.api_status_code.FEEDBACK_ADDED_SUCCESSFULLY_1080.MSG_CODE) {
                  Swal({
                    type: "success",
                    text: this.tlt('feedback_sent_successful_msg'),
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    timer:2000,
                  })
                  this.clear_fields();
                }
                else if(response.data.message.MSG_CODE === this.api_status_code.FEEDBACK_ALREADY_EXISTS.MSG_CODE){
                  this.clear_fields();
                  Swal({
                    type:"error",
                    text:this.tlt('feedback_already_exists_msg'),
                    timer:2000,
                  })
                }else if(response.data.message.MSG_CODE === this.api_status_code.IMG_DUPLICATE.MSG_CODE){
                  this.clear_fields();
                  Swal({
                    type:"warning",
                    text:this.tlt('feedback_img_uploaded_msg'),
                    timer:3000,
                  })
                }
                else {
                  Swal({
                    // title: this.tlt('billing_error_occurred_msg9'),
                    title: response.data.message.MSG_CODE,
                    text: response.data.message.MSG,
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 2500,
                    type: "error"
                  });
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
            // this.spinnerOn = false;
          }
    },
    Upload_files(e) {
      this.list_attachments_name = [];
      this.new_attachment_files = [];
      let selectedFiles = e.target.files;
      if(selectedFiles.length>5){
        Swal({
          text: this.tlt('feedback_file_attachment_msg'),
          toast: true,
          position: "top-end",
          type: "error",
          showConfirmButton: false,
          timer: 3000
        });
        let input_field = document.getElementById("upload_file");
        input_field.value = "";
        this.clear_fields()
        return false
        
      }
      for (let i=0 ;i<selectedFiles.length;i++){
        this.new_attachment_files.push(selectedFiles[i]);
      }
      for (let j=0 ;j<this.new_attachment_files.length;j++){
        if (this.new_attachment_files[j].size > 2097152) {
          Swal({
            text: this.tlt('feedback_img_size_msg'),
            toast: true,
            position: "top-end",
            type: "error",
            showConfirmButton: false,
            timer: 2000
          });
          let input_field = document.getElementById("upload_file");
          input_field.value = "";
        }
        this.list_attachments_name.push(this.new_attachment_files[j].name)
      }
    },
  },
};
</script>
<style scoped>
.btn-cancel{
    margin-top: 2px !important;
    /* border: 1px solid; */
    padding-bottom: 3px;
    padding-top: 5px;
    margin-bottom: 4px;
}
/* tr td {
  height: 50px;
}
.edit-column {
  height: 29px !important;
} */
</style>
