<template>
  <div class="dash-cont">
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <div class="container-fluid">
      <div class="card dash-card">
        <div class="card-header d-block d-sm-flex flex-wrap justify-content-between">
          <h4 class="mb-sm-0">PDF to HTML Converter</h4>
          <div class="card-act d-flex flex-wrap">
            <a
              href="#"
              class="darkblue-btn"
              data-toggle="modal"
              data-target="#PDF_Upload"
              id="upload_file"
              title="Upload File"
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
            </a>
            <!-- <a href="javascript:void(0)" title="Delete" class="red-btn" id="delete_file">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                <path
                  id="trash-can-outline"
                  d="M8.375,3v.778H4V5.333h.875V15.444A1.661,1.661,0,0,0,6.625,17h8.75a1.661,1.661,0,0,0,1.75-1.556V5.333H18V3.778H13.625V3H8.375M6.625,5.333h8.75V15.444H6.625V5.333m1.75,1.556v7h1.75v-7H8.375m3.5,0v7h1.75v-7Z"
                  transform="translate(-4 -3)"
                  fill="#fff"
                />
              </svg>
            </a>-->
          </div>
        </div>
        <div class="card-body">
          <div class="table-box">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col" style="width: 0.1%;">
                      <div class="form-check checkbox checkbox-success">
                        <label class="form-check-label">
                          <input
                            class="form-check-input checkbox checkbox-success"
                            @change="contact_select('all')"
                            type="checkbox"
                            id="selectall"
                          />
                          <span class="icn"></span>
                        </label>
                      </div>
                    </th>
                    <!-- <th scope="col" style="width: 1%;">ACTION</th> -->
                    <th scope="col" style="width: 20%;">FILE NAME</th>
                    <th scope="col" style="width: 5%;">DOWNLOAD</th>
                    <!-- <th scope="col">LOCATION</th> -->
                    <!-- <th scope="col" style="width: 8%;">CALL HISTORY</th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(file, index) in files_list" :key="index">
                    <!-- <th scope="row">
                              <div class="form-check checkbox checkbox-success">
                                <label class="form-check-label">
                                  <input
                                    class="form-check-input checkbox checkbox-success"
                                    @change="contact_select(index)"
                                    type="checkbox"
                                    value
                                    required
                                  />
                                  <span class="icn"></span>
                                </label>
                              </div>
                    </th>-->
                    <!-- <td class="action">
                    </td>-->
                    <td>{{file.File_Name}}</td>
                    <td>
                      <a :href="file.url">{{file.File_Name}}</a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- <div class="pagin-table" style="margin-top:2%">
                        <nav aria-label="Page navigation example">
                          <ul class="pagination justify-content-center" style="margin-bottom:2%">
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
                              :class="'page-item '+pagination_class(pageno)"
                              v-for="pageno in total_pages"
                              :key="pageno"
                            >
                              <a class="page-link" href="#" @click="page_require(pageno)">{{pageno}}</a>
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
              </div>-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade dash-modal"
      id="PDF_Upload"
      tabindex="-1"
      role="dialog"
      aria-labelledby="PDF_UploadTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt />
              </div>
              <h3>Upload PDF</h3>
            </div>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <img src="/img/close-icn.png" alt />
            </button>
            <form @submit="file_submit">
              <div class="form-group">
                <div class="custom-file">
                  <input
                    type="file"
                    accept=".pdf"
                    class="custom-file-input"
                    @change="fileinput"
                    id="inputGroupFile01"
                  />
                  <label
                    style="font-weight:400;line-height: 15px;"
                    class="custom-file-label form-control"
                    for="file"
                  >{{file_label}}</label>
                </div>
              </div>
              <button
                type="submit"
                id="widget_title_save"
                style="width: 100px;height: 35px;text-align: center;font-size: 13px;margin-left: auto;font-weight: bold;background: #273679;
                      border: solid 1px #273679;cursor: pointer;border-radius: 4px;color: #fff;margin-top: 2%"
              >Save</button>
            </form>
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
export default {
  name: "pdf-html",
  data() {
    return {
      spinnerOn: false,
      file_label: "Choose file",
      file_content: "",
      companyname: null,
      companyid: null,
      files_list: [],
      page_no: 1
    };
  },
  created() {
    if (
      !this.$session.has("CompanyId") &&
      this.$session.get("UserInformation").role == "SuperAdmin"
    ) {
      toastr.warning("Please select a company name from the dropdown");
    } else if (this.user_role == "SuperAdmin") {
      if (this.$session.has("CompanyId")) {
        this.companyid = this.$session.get("CompanyId");
        this.companyname = this.$session.get("CompanyName");
      } else {
        this.companyid = this.$session.get("UserInformation").company_id;
        this.companyname = this.$session.get("UserInformation").company_name;
      }
    } else {
      this.companyid = this.$session.get("UserInformation").company_id;
      this.companyname = this.$session.get("UserInformation").company_name;
    }
  },
  mounted() {
    var vm = this;
    $("#selectall").click(function() {
      if ($(this).is(":checked")) {
        // $('div:input').prop('checked',true);
        $("input:checkbox").prop("checked", true);
      } else {
        vm.checked_list = [];
        $("input:checkbox").prop("checked", false);
      }
    });
  },
  methods: {
    file_submit() {
      event.preventDefault();
      var user_details = {
        email: this.$session.get("UserInformation").email,
        token: this.$session.get("UserInformation").tokens,
        companyname: this.companyname,
        companyid: this.companyid,
        license_key: this.$session.get("UserInformation").license_key
      };
      var json = JSON.stringify(user_details);
      var blob = new Blob([json], {
        type: "application/json"
      });
      if (this.file_label == "Choose file") {
      } else {
        const fd = new FormData();
        fd.append("file", this.file_content, this.file_label);
        fd.append("json", blob);
        axios.post(api_calls.pdf_to_convert_url(), fd, {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          }
        }).then(response => {
          $("#PDF_Upload").modal("hide");
          if (response.data == "Internal Server Error") {
            toastr.error("Internal Server Error");
          } else if (
            response.data.status != undefined &&
            response.data.status == "Success"
          ) {
            toastr.success("File converted to HTML successfully.");
          }
        });
        //   $("#file_upload").modal("hide");
      }
    },
    fileinput() {
      let vm = this;
      let files = event.target.files || event.dataTransfer.files;
      if (!files.length) return;
      this.file_label = files[0].name;
      if (files[0].type != "application/pdf") {
        Swal({
          type: "error",
          text: "Only PDF files can be uploaded.",
          timer:2000,
        });
        this.file_label = "Choose file";
      } else {
        this.file_content = event.target.files[0];
      }
    },
    page_require(page_number) {},
    pagination_class(index) {
      if (index == this.page_no) {
        return " active";
      } else {
        return "";
      }
    }
  }
};
</script>