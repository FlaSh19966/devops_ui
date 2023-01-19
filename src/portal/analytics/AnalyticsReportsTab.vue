<template>
  <div>
    <div class="spinner" id="spinner" v-show="spinnerOn" style="z-index:100"></div>
    <div class="card-body" style="padding:0">
      <div>
        <div class="col-sm-12" style="padding-right:0">
          <table
            v-if="reports_list.length > 0"
            class="table"
            style="border: 1px solid #dbe2e8;margin-top:1%;min-width:50rem"
          >
            <tr style="text-align:left">
              <th>Report Name</th>
              <th style="text-align:center">View</th>
              <th style="text-align:center">Download</th>
              <th style="text-align:center">Delete</th>
            </tr>
            <tr v-for="(report,index) in reports_list " :key="index">
              <td style="width:80%">{{report.title}}</td>
              <td
                style="text-align:center"
                v-if="!report.is_report_ready"
                @click="check_report_status(index)"
              >
                <span style="cursor:pointer" v-html="refresh_icon_svg"></span>
              </td>
              <td style="text-align:center" v-else>
                <i
                  style="cursor:pointer"
                  class="fa fa-eye"
                  aria-hidden="true"
                  @click="get_report_url(index,'view')"
                ></i>
              </td>
              <td
                style="text-align:center"
                v-if="!report.is_report_ready"
                @click="check_report_status(index)"
              >
                <span v-html="refresh_icon_svg"></span>
              </td>
              <td style="text-align:center" v-else>
                <i
                  style="cursor:pointer"
                  class="fa fa-download"
                  aria-hidden="true"
                  @click="get_report_url(index,'download')"
                ></i>
              </td>
              <td style="text-align:center;">
                <i
                  @click="delete_report(index)"
                  style="cursor:pointer"
                  class="fa fa-trash"
                  aria-hidden="true"
                ></i>
              </td>
            </tr>
          </table>
          <table
            v-else
            class="table"
            style="border: 1px solid #dbe2e8;margin-top:1%;min-width:50rem"
          >
            <tr style="text-align:left">
              <th style="width:60%">Report Name</th>
              <th style="text-align:center">View</th>
              <th style="text-align:center">Download</th>
              <th style="text-align:center">Delete</th>
            </tr>
            <tr>
              <td colspan="4" style="text-align:center;">
                <b>No Reports Yet</b>
              </td>
            </tr>
          </table>
          <!-- <p v-else> No Reports Yet </p> -->
        </div>
      </div>
      <div class="modal fade" id="viewReportModal" v-if="reports_list.length > 0">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
              <h4 class="modal-title">
                Preview of Report:
                {{reports_list[current_viewed_report].title}}
              </h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">
              <iframe
                v-if="reports_list[current_viewed_report].file_url_to_be_displayed"
                :src="reports_list[current_viewed_report].file_url_to_be_displayed"
                width="100%"
                height="600px"
              />
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
import Multiselect from "vue-multiselect";
export default {
  name: "AnalyticsReportsTab",
  data() {
    return {
      spinnerOn: false,
      reports_list: [],
    };
  },
  mounted() {
    this.get_reports_list();
  },
  methods: {
    get_reports_list() {
      this.spinnerOn = true;
      axios
        .get(api_calls.bi_list_reports(), {
          params: {
            per_page: 10,
            page_no: 1,
            email: this.$session.get("UserInformation").email,
            token: this.$session.get("UserInformation").tokens,
            company_name: this.$session.get("UserInformation").company_name,
            company_id: this.$session.get("UserInformation").company_id,
          },
        })
        .then((response) => {
          this.spinnerOn = false;
          if (response.data.status === "Ok") {
            this.reports_list = response.data.msg.reports;
            this.current_viewed_report = 0;
          } else {
            Swal.fire({
              title: "Some Error Occurred",
              text:
                "The List of Reports is not available now. Please Try Again Later",
              type: "error",
              timer:3000,
              showConfirmButton: true,
            }).then((result) => {
              setTimeout(() => {
                this.show_reports_list = false;
              }, 200);
            });
          }
          // console.log(response);
        })
        .catch((err) => {
          this.spinnerOn = false;
          Swal.fire({
            title: "Some Error Occurred",
            text:
              "The List of Reports is not available now. Please Try Again Later",
            type: "error",
            timer:3000,
            showConfirmButton: true,
          }).then((result) => {
            setTimeout(() => {
              this.show_reports_list = false;
            }, 200);
          });
        });
    },
    get_report_url(index, action) {
      if (action === "download") {
        this.spinnerOn = true;
        axios
          .post(
            api_calls.bi_download_report(),
            {
              file_name: this.reports_list[index].file_url,
              email: this.$session.get("UserInformation").email,
              token: this.$session.get("UserInformation").tokens,
              company_name: this.$session.get("UserInformation").company_name,
              company_id: this.$session.get("UserInformation").company_id,
            },
            {
              responseType: "blob",
            }
          )
          .then((resp) => {
            this.spinnerOn = false;
            // if(resp.data.status === 'ok'){
            const url = window.URL.createObjectURL(new Blob([resp.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
              "download",
              this.reports_list[index].title + ".pdf"
            );
            document.body.appendChild(link);
            link.click();
            // } else {
            // Swal.fire({
            //   title: 'Some Error Occurred',
            //   text: 'The List of Reports is not available now. Please Try Again Later',
            //   type: 'error',
            //   showConfirmButton: true,
            //   timer:3000
            // })
            // }
          });
      } else if (action === "view") {
        this.spinnerOn = true;
        axios
          .post(api_calls.bi_get_report_url(), {
            file_name: this.reports_list[index].file_url,
            email: this.$session.get("UserInformation").email,
            token: this.$session.get("UserInformation").tokens,
            company_name: this.$session.get("UserInformation").company_name,
            company_id: this.$session.get("UserInformation").company_id,
          })
          .then((response) => {
            this.spinnerOn = false;
            this.reports_list[index].file_url_to_be_displayed =
              response.data.msg.url;
            this.current_viewed_report = index;
            $("#viewReportModal").modal("show");
          });
      }
    },
    delete_report(index) {
      Swal.fire({
        title: "Are you sure?",
        text: `You want to Delete the Report: ${this.reports_list[index].title}?`,
        type: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Confirm!",
      }).then((result) => {
        if (result.value) {
          // Swal({
          //   text: 'Please wait while we are processing your request...',
          //   type: 'info',
          //   toast: true,
          //   showConfirmButton: false,
          // });
          this.spinnerOn = true;
          axios
            .post(api_calls.bi_delete_report(), {
              email: this.$session.get("UserInformation").email,
              token: this.$session.get("UserInformation").tokens,
              company_name: this.$session.get("UserInformation").company_name,
              company_id: this.$session.get("UserInformation").company_id,
              report_name: this.reports_list[index].title,
              id: this.reports_list[index].id,
            })
            .then((response) => {
              this.spinnerOn = false;
              if (
                response.data.msg === "Record deleted successfully" &&
                response.data.status === "Ok"
              ) {
                this.get_reports_list();
                Swal({
                  text: "Your Report is Deleted Successfully",
                  type: "success",
                  toast: true,
                  showConfirmButton: false,
                  timer: 2000,
                });
              } else {
                this.spinnerOn = false;
                Swal({
                  text: "Some Error Occurred. Please Try Again",
                  type: "error",
                  toast: true,
                  showConfirmButton: false,
                  timer: 2500,
                });
              }
            })
            .catch((error) => {
              this.spinnerOn = false;
              Swal({
                text: "Some Error Occurred. Please Try Again",
                type: "error",
                toast: true,
                showConfirmButton: false,
                timer: 2500,
              });
            });
        }
      });
    },
  },
};
</script>