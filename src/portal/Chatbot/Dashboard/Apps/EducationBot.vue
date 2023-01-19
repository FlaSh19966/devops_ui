<template>
  <div>
    <div class="dash-cont">
      <div class="spinner" id="spinner" v-show="spinnerOn"></div>
      <div class="container-fluid">
        <div class="card dash-card">
          <div
            class="card-header d-block d-sm-flex flex-wrap justify-content-between"
          ></div>
          <div class="card-body">
            <h5>Upload a PDF to get started</h5>
            <div class="container">
              <div class="row">
                <div class="col-sm-12 pl-0">
                  <div class="col-sm-4 pl-0">
                    <form id="filedata" @submit.prevent="upload_file">
                      <div>
                        <!-- <input type="file" name="pdf_uploaded" id="pdf_uploaded"> -->
                        <input
                          @change="getFile($event)"
                          accept=".pdf"
                          type="file"
                          class="custom-file-input"
                          id="inputGroupFile01"
                        />
                        <label
                          class="custom-file-label"
                          for="inputGroupFile01"
                          placeholder="Choose File"
                          style="overflow: hidden; white-space: nowrap"
                          >{{ file_label }}</label
                        >
                      </div>
                    </form>
                    <div class="mt-2">
                      <button
                        class="btn darkblue-btn"
                        type="submit"
                        v-show="is_file_uploaded"
                        @click="upload_file"
                      >
                        Upload
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
import swal from "sweetalert2";
import api_calls from "@/portal/api_calls.js";
import axios from "axios";
export default {
  name: "EducationBot",
  data() {
    return {
      spinnerOn: false,
      file_label: "Choose file",
      is_file_uploaded: false,
      file: null,
    };
  },
  methods: {
    getFile(e) {
      e.preventDefault();
      const file = e.target.files[0];
      this.file_label = file.name;
      // console.log(file);
      if (file.type != "application/pdf") {
        swal({
          type: "error",
          text: "Only PDF files can be uploaded.",
          timer: 3500,
        });
        this.file_label = "Choose file";
      } else {
        this.file = e.target.files[0];
        this.is_file_uploaded = true;
      }
    },
    upload_file() {
      // let filename = "";
      let filedata = "";
      const reader = new FileReader();
      let filename = this.file.name;
      reader.readAsDataURL(this.file);
      reader.onloadstart = () => {
        // this.$root.$emit('show_loader', true);
        this.spinnerOn = true;
      };
      reader.onload = () => {
        // this.$root.$emit('show_loader', true);
        filedata = reader.result.split("base64,")[1];
      };
      reader.onloadend = () => {
        this.spinnerOn = false;
        var user_details = {
          email: this.$session.get("UserInformation").email,
          token: this.$session.get("UserInformation").tokens,
          company_name: this.$session.get("UserInformation").company_name,
          company_id: this.$session.get("UserInformation").company_id,
          license_key: this.$session.get("UserInformation").license_key,
        };
        var json = JSON.stringify(user_details);
        var blob = new Blob([json], {
          type: "application/json",
        });
        const fd = new FormData();
        fd.append("file", this.file, filename);
        fd.append("json", blob);
        this.spinnerOn = true;
        // console.log(fd);
        axios
          .post(api_calls.faq_pdf_maker(), fd)
          .then(({ data }) => {
            console.log(data);
            if (data === "file uploaded successfully") {
              swal({
                title: "File Processed Successfully",
                type: "success",
                text:
                  "Please proceed to Intents page under Data Inputs and click on 'Train Model' after you are done with uploading all the PDFs.",
              });
            } else {
              swal({
                title: "Some Error Occurred. Please Try Again",
                type: "error",
              });
            }
            this.spinnerOn = false;
            this.reset_file_input();
          })
          .catch((err) => {
            this.spinnerOn = false;
            swal({
              title: "Some Error Occurred. Please Try Again",
              type: "error",
            });
            this.reset_file_input();
            console.log(err);
          });
      };
    },
    reset_file_input() {
      this.file_label = "Choose file";
      this.is_file_uploaded = false;
      this.file = null;
      this.spinnerOn = false;
      document.getElementById("inputGroupFile01").value = "";
    },
  },
};
</script>

<style>
</style>