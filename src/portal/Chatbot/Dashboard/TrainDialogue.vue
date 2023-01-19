<template>
  <div>
    <div class="spinner" v-show="spinnerOn" id="spinner"></div>
    <div class="dash-cont">
      <div class="container-fluid">
        <div class="card dash-card">
          <div class="card-body" id="page">
            <div class="table-box">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col" style="width: 10%">COMPANY NAME</th>
                      <th scope="col">LOCATION</th>
                      <th scope="col">REPORT</th>
                      <th scope="col">TRAIN</th>
                      <th scope="col">DATE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(model, index) in model_data" :key="index">
                      <td>{{ model.company_id }}</td>
                      <td>{{ model.location }}</td>
                      <td style="text-align: center">
                        <a
                          href="#"
                          data-toggle="modal"
                          data-target="#report_id"
                          @click="report_open(index)"
                          >Click</a
                        >
                      </td>
                      <td>
                        <div class="card-act" style="text-align: center">
                          <a
                            href="#"
                            class="darkblue-btn"
                            @click="model_open(index)"
                            >Train Model</a
                          >
                          <a
                            href="#"
                            class="red-btn"
                            data-toggle="modal"
                            data-target="#revert_id"
                            style="margin-left: 5%"
                            @click="revert_open(index)"
                            >Revert</a
                          >
                        </div>
                      </td>
                      <td>01-08-2019</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade dash-modal"
      id="revert_id"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt />
              </div>
              <h3>Revert the Model</h3>
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
              <div>
                <div class="table-box">
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col" style="width: 25%">MODEL NAME</th>
                          <th scope="col">TIME</th>
                          <th scope="col" style="width: 10%"></th>
                        </tr>
                      </thead>
                      <tbody v-for="(type, index) in revert_info" :key="index">
                        <td>{{ type.model_name }}</td>
                        <td>{{ type.time }}</td>
                        <td>
                          <center>
                            <div class="card-act d-flex flex-wrap">
                              <a
                                href="#"
                                class="red-btn"
                                @click="revert_model(index)"
                                >Revert</a
                              >
                            </div>
                          </center>
                        </td>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade dash-modal"
      id="report_id"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt />
              </div>
              <h3>Report</h3>
            </div>
            <div>
              <div class="table-box">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col" style="width: 25%">PRECISION</th>
                        <th scope="col">F1</th>
                        <th scope="col">ACCURACY</th>
                      </tr>
                    </thead>
                    <tbody>
                      <td>{{ report_display_precision }}</td>
                      <td>{{ report_display_f1 }}</td>
                      <td>{{ report_display_accuracy }}</td>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <img src="/img/close-icn.png" alt />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="pagin-table" style="margin-top: 2%">
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item">
            <a class="page-link" href="#">
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
          <li>
            <a class="page-link" href="#"></a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
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
</template>
<script>
import api_calls from "@/portal/api_calls";
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "TrainDialogue",
  data() {
    return {
      companyid: "",
      location: "",
      model_data: [],
      report_display_report: "",
      report_display_precision: "",
      report_display_f1: "",
      report_display_accuracy: "",
      revert_info: [],
      company_name: "",
      company_id: "",
      spinnerOn: false,
    };
  },
  created() {
    axios
      .get(api_calls.get_company_models(), {
        params: {
          company_name: this.$session.get("UserInformation").company_name,
          company_id: this.$session.get("UserInformation").company_id,
          email: this.$session.get("UserInformation").email,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens,
          subscription: this.$session.get("UserInformation").subscription,
        },
      })
      .then((response) => {
        this.model_data = response.data.company_data;
      });
  },
  methods: {
    report_open(index) {
      console.log(this.model_data[index]);
      this.report_display_precision = this.model_data[
        index
      ].model_data.report.precision;
      // this.report_display_precision = this.model_data[index].model_data.report.precision;
      this.report_display_f1 = this.model_data[index].model_data.report.f1;
      this.report_display_accuracy = this.model_data[
        index
      ].model_data.report.accuracy;
    },
    model_open(index) {
      axios
        .post(api_calls.train_conversation_models(), {
          company_name: this.$session.get("UserInformation").company_name,
          company_id: this.$session.get("UserInformation").company_id,
          email: this.$session.get("UserInformation").email,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens,
          subscription: this.$session.get("UserInformation").subscription,
          company_details: {
            company_name: this.model_data[index].company_name,
            company_id: this.model_data[index].company_id,
          },
        })
        .then((response) => {
          if (response.data.MSG_CODE === 4046) {
            toastr.success(response.data.MSG);
          } else if (response.data.MSG_CODE === 1034) {
            toastr.error(response.data.MSG);
          } else {
            toastr.error("Internal Server Error");
          }
        });
    },
    revert_open(index) {
      this.company_name = this.model_data[index].company_name;
      this.company_id = this.model_data[index].company_id;
      axios
        .get(api_calls.revert_models(), {
          params: {
            company_name: this.$session.get("UserInformation").company_name,
            company_id: this.$session.get("UserInformation").company_id,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            subscription: this.$session.get("UserInformation").subscription,
            revert_company_name: this.model_data[index].company_name,
            revert_company_id: this.model_data[index].company_id,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.revert_info = response.data.model_data;
          // this.revert_info_name = this.revert_info[index].model_name
          // this.revert_info_time = this.revert_info[index].time
        });
    },
    revert_model(index) {
      axios
        .post(api_calls.revert_models(), {
          company_name: this.$session.get("UserInformation").company_name,
          company_id: this.$session.get("UserInformation").company_id,
          email: this.$session.get("UserInformation").email,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens,
          subscription: this.$session.get("UserInformation").subscription,
          company_details: {
            company_id: this.company_id,
            company_name: this.company_name,
          },
          model_file: this.revert_info[index].model_name,
        })
        .then((response) => {
          console.log(response.data);
        });
    },
  },
};
</script>
<style>
#page {
  padding: 25px 25px 20px;
}
</style>

