<template>
  <div>
    <div class="dash-cont">
      <div class="container-fluid">
        <div class="card dash-card" style="margin-left: -10%; margin-top: -2%">
          <div class="card-body" id="page">
            <div class="table-box">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col" style="width: 10%">COMPANY NAME</th>
                      <th scope="col">LOCATION</th>
                      <th scope="col">CURRENT MODEL</th>
                      <th scope="col">METRICS</th>
                      <th scope="col">ACCURACY</th>
                      <th scope="col">LOSS</th>
                      <th scope="col">TRAIN</th>
                      <!-- <th scope="col">DATE</th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(model, index) in model_data" :key="index">
                      <td>{{ model.company_id }}</td>
                      <td>
                        <a :href="model.location" download>Download</a>
                      </td>
                      <td>
                        <span
                          v-if="model.current_model != undefined"
                          href="javascript: void(0)"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          :title="model.current_model"
                          >{{ model.current_model.slice(0, 10) }}...</span
                        >
                        <span v-else>No data</span>
                      </td>
                      <td>
                        <a
                          href="#"
                          data-toggle="modal"
                          data-target="#metrics_modal"
                          @click="report_open(index)"
                          >Click</a
                        >
                      </td>
                      <td>
                        <span v-if="model.model_data != undefined">{{
                          model.model_data.loss.toFixed(3)
                        }}</span>
                        <span v-else>No data</span>
                      </td>
                      <td>
                        <span v-if="model.model_data != undefined">{{
                          model.model_data.accuracy.toFixed(2)
                        }}</span>
                        <span v-else>No data</span>
                      </td>
                      <td>
                        <div class="card-act d-flex flex-wrap">
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
                      <!-- <td>01-08-2019</td> -->
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
                          <th scope="col" style="width: 10%">ACTION</th>
                        </tr>
                      </thead>
                      <tbody v-for="(type, index) in revert_info" :key="index">
                        <td>{{ type.model_name }}</td>
                        <td>{{ type.time }}</td>
                        <td>
                          <center v-if="type.model_name != 'No data'">
                            <div class="card-act d-flex flex-wrap">
                              <a
                                href="javascript: void(0)"
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
      id="metrics_modal"
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
              <h3>Metrics</h3>
            </div>
            <div>
              <div class="table-box">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col" style="width: 25%">ACCURACY</th>
                        <th scope="col">LOSS</th>
                        <th scope="col">VALIDATION ACCURACY</th>
                        <th scope="col">VALIDATION LOSS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(accuracy, index) in accuracy_metrics"
                        :key="index"
                      >
                        <td>
                          <span v-if="accuracy_metrics[index] != 'No data'">{{
                            accuracy_metrics[index].toFixed(4)
                          }}</span>
                          <span v-else>{{ accuracy_metrics[index] }}</span>
                        </td>
                        <td>
                          <span v-if="loss_metrics[index] != 'No data'">{{
                            loss_metrics[index].toFixed(4)
                          }}</span>
                          <span v-else>{{ loss_metrics[index] }}</span>
                        </td>
                        <td>
                          <span
                            v-if="
                              validation_accuracy_metrics[index] != 'No data'
                            "
                            >{{
                              validation_accuracy_metrics[index].toFixed(4)
                            }}</span
                          >
                          <span v-else>{{
                            validation_accuracy_metrics[index]
                          }}</span>
                        </td>
                        <td>
                          <span
                            v-if="validation_loss_metrics[index] != 'No data'"
                            >{{
                              validation_loss_metrics[index].toFixed(4)
                            }}</span
                          >
                          <span v-else>{{
                            validation_loss_metrics[index]
                          }}</span>
                        </td>
                      </tr>
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
  name: "TrainNERModel",
  data() {
    return {
      companyid: "",
      location: "",
      model_data: [],
      accuracy_metrics: [],
      loss_metrics: [],
      validation_accuracy_metrics: [],
      validation_loss_metrics: [],
      revert_info: [],
      company_name: "",
      company_id: "",
    };
  },
  created() {
    axios
      .get(api_calls.get_company_ner_models(), {
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
        if (response.data == "Internal Server Error") {
          toastr.error("Internal Server Error");
        } else {
          this.model_data = response.data.company_data;
        }
      });
  },
  mounted() {
    $('[data-toggle="tooltip"]').tooltip();
  },
  methods: {
    report_open(index) {
      if (this.model_data[index].model_data != undefined) {
        this.accuracy_metrics = this.model_data[index].model_data.metrics.acc;
        this.loss_metrics = this.model_data[index].model_data.metrics.loss;
        this.validation_accuracy_metrics = this.model_data[
          index
        ].model_data.metrics.val_acc;
        this.validation_loss_metrics = this.model_data[
          index
        ].model_data.metrics.val_loss;
      } else {
        this.accuracy_metrics = ["No data"];
        this.loss_metrics = ["No data"];
        this.validation_accuracy_metrics = ["No data"];
        this.validation_loss_metrics = ["No data"];
      }
    },
    model_open(index) {
      axios
        .post(api_calls.train_ner_models(), {
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
          // epochs: 100,
          // batch_size: 64
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
        .get(api_calls.revert_ner_models(), {
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
          this.revert_info = response.data.model_data;
          if (this.revert_info.length == 0) {
            this.revert_info.push({
              model_name: "No data",
              time: "No data",
            });
          }
        });
    },
    revert_model(index) {
      axios
        .post(api_calls.revert_ner_models(), {
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
          $("#revert_id").modal("hide");
          if (response.data == "Revert Successful") {
            toastr.success("Model has been reverted successfully.");
          } else if (response.data == "Internal Server Error") {
            toastr.error("Internal Server Error");
          }
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

