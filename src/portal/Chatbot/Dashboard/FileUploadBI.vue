<template>
  <div class="dash-cont">
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <div class="container-fluid">
      <div class="card dash-card">
        <div class="card-header d-block d-sm-flex flex-wrap justify-content-between">
          <h4 class="mb-sm-0">Upload and Process File</h4>
        </div>
        <div class="card-body">
          <!-- <div class="col-md-3" style="padding: 0.3rem;">
            <div class="custom-file">
              <form id="filedata">
                <input
                  @change="getFile($event)"
                  accept=".csv"
                  type="file"
                  class="custom-file-input"
                  id="inputGroupFile01"
                />
                <label
                  class="custom-file-label"
                  for="inputGroupFile01"
                  placeholder="Choose File"
                >Click Here</label>
              </form>
            </div>
          </div>-->
          <div class="table-box">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <div>
                      <form id="filedata" @submit="uploadfile">
                        <!-- <a
                      class="btn btn-primaryy border-0"
                      data-toggle="collapse"
                      href="#collapseExample"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                      style="display:flex;color: black;padding-left: 0px;"
                        >-->
                        <i
                          class="fa fa-chevron-down rotate"
                          style="margin-right:15px; margin-top:1%"
                        ></i>
                        <b>Upload File</b>
                        <!-- </a> -->
                        <div
                          id="collapseExample"
                          class="col-md-12"
                          style="padding: 0.3rem;display:flex"
                        >
                          <div class="custom-file col-md-6">
                            <input
                              @change="getFile($event)"
                              accept=".csv"
                              type="file"
                              class="custom-file-input"
                              id="inputGroupFile01"
                            />
                            <label
                              class="custom-file-label"
                              for="inputGroupFile01"
                              placeholder="Choose File"
                            >{{file_label}}</label>
                          </div>
                          <div class="col-md-6" style="display:flex">
                            <label style="padding-left:10px">Name of Dataset</label>
                            <input
                              id="dataset_name"
                              type="text"
                              v-model="dataset_name"
                              style="padding-left:8px;margin-left: 3%;height: 40px !important;"
                              class="form-control"
                              required
                            />
                          </div>
                          <!-- <div class="col-md-2" style="display:flex">
                            <button
                              style="height:40px"
                              class="btn btn-primary"
                              type="submit"
                            >Upload File</button>
                          </div> -->
                        </div>
                        <div class="col-md-3" style="margin-top:1%">
                            <button
                              style="height:40px"
                              class="darkblue-btn"
                              type="submit"
                            >Upload File</button>
                          </div>
                      </form>
                    </div>
                  </tr>
                  <tr v-if="is_file_uploaded">
                    <table class="table">
                      <!-- <thead></thead>
                      <tbody></tbody>-->
                      <tr>
                        <!-- <a
                          class="btn btn-primaryy border-0"
                          data-toggle="collapse"
                          href="#collapseExamples__1"
                          role="button"
                          aria-expanded="false"
                          aria-controls="collapseExamples__1"
                          style="display:flex;color: black;padding-left: 0px;"
                        >-->
                        <i
                          class="fa fa-chevron-down rotate"
                          style="margin-right:15px; margin-top:1%"
                        ></i>
                        <b>Change Column Names</b>
                        <!-- </a> -->
                        <div id="collapseExamples__1" class="col-md-12">
                          <form @submit="editcolumns()">
                            <div
                              style="display:flex"
                              v-for="(column,index) in columns "
                              :key="index"
                              class="col-md-12"
                            >
                              <label>Original Name</label>
                              <input
                                class="form-control"
                                v-model="column.name"
                                disabled
                                type="text"
                                style="padding-left:12px;margin-left: 3%;height: 40px !important;"
                              />
                              <label style="padding-left:9px;">New Name</label>
                              <input
                                class="form-control"
                                :id="'input'+index"
                                v-model="column.newname"
                                disabled
                                type="text"
                                style="padding-left:12px;margin-left: 3%;height: 40px !important;"
                              />
                              <a @click="editvalue(index)" style="padding-left:10px;">
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
                            </div>
                            <button type="submit" class="darkblue-btn">Save</button>
                          </form>
                        </div>
                      </tr>
                    </table>
                  </tr>
                  <tr v-if="is_file_uploaded && iscolumnsnamechanged">
                    <table class="table">
                      <!-- <thead></thead>
                      <tbody></tbody>-->
                      <tr>
                        <!-- <a
                          class="btn btn-primaryy border-0"
                          data-toggle="collapse"
                          href="#collapseExamples__2"
                          role="button"
                          aria-expanded="false"
                          aria-controls="collapseExamples__2"
                          style="display:flex;color: black;padding-left: 0px;"
                        >-->
                        <i
                          class="fa fa-chevron-down rotate"
                          style="margin-right:15px; margin-top:1%"
                        ></i>
                        <b>Define Column Metrics</b>
                        <button
                          class="save_node_button"
                          @click="addmetricvalue()"
                          style="height: 29px;padding-top: 0px;padding-left: 10px;padding-right: 10px;padding-bottom: 0px;margin-left:15px;float: none;"
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
                        <!-- </a> -->

                        <!-- <form id="test"> -->
                        <div
                          class="col-md-12"
                          style="display: flex;margin-top: 2%;"
                          v-for="(metric,index) in metrics"
                          :key="index"
                        >
                          <div class="col-md-2">
                            <label>Name</label>
                            <input
                              type="text"
                              class="form-control"
                              style="height: 40px !important;padding-left:12px;"
                              v-model="metric.name"
                              required
                            />
                          </div>
                          <div class="col-md-2">
                            <label>Operation</label>
                            <select
                              type="text"
                              class="form-control"
                              v-model="metric.operation"
                              required
                              style="padding-left:12px;margin-left: 3%;height: 40px !important;"
                            >
                              <!-- <option disabled value="null" selected>---Select Operation---</option> -->
                              <option value="SUM" selected>SUMMATION</option>
                              <option value="AVG">AVERAGE</option>
                              <option value="COUNT">COUNT</option>
                              <option value="NUNIQUE">NUNIQUE</option>
                            </select>
                          </div>
                          <div class="col-md-3">
                            <label>Column</label>
                            <select
                              type="text"
                              class="form-control"
                              v-model="metric.column"
                              required
                              style="padding-left:12px;margin-left: 3%;height: 40px !important;"
                            >
                              <option
                                v-for="(column, index) in newcolumns"
                                :value="column"
                                :key="index"
                              >{{column}}</option>
                            </select>

                            <!-- <label>To be Performed On:</label>
                            <select
                              type="text"
                              class="form-control"
                              v-model="metric.column1"
                              required
                              style="padding-left:12px;margin-left: 3%;height: 40px !important;"
                            >
                              <option
                                v-for="(column, index) in newcolumns"
                                :value="column"
                                :key="index"
                              >{{column}}</option>
                            </select> -->
                          </div>
                          <div class="col-md-3">
                            <!-- <label>With</label>
                            <select
                              type="text"
                              class="form-control"
                              v-model="metric.column2"
                              required
                              style="padding-left:12px;margin-left: 3%;height: 40px !important;"
                            >
                              <option
                                v-for="(column, index) in newcolumns"
                                :value="column"
                                :key="index"
                              >{{column}}</option>
                            </select> -->

                            <!-- </div> -->
                          </div>
                          <div class="col-md-1">
                            <button
                              class="save_node_button"
                              style="margin-top:60%;margin-left: 3%;height: 39px;padding-top: 0px;padding-left: 10px;padding-right: 10px;padding-bottom: 0px;background: #F23D3D;border: solid 1px #F23D3D;"
                              @click="deleteheader(index)"
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
                        </div>
                        <button
                          v-if="metrics.length > 0"
                          @click="addmetrics()"
                          class="darkblue-btn"
                          style="margin-top:1%"
                        >Save</button>
                        <!-- </form> -->
                        <!-- <div id="collapseExamples__2" class="col-md-8 collapse">
                          <div style="display:flex" v-for="(column,index) in columns " :key="index">
                            <label>Original Name</label>
                            <input class="form-control" type="text" />
                            <label>New Name</label>
                            <input class="form-control" type="text" />
                          </div>
                        </div>-->
                      </tr>
                    </table>
                  </tr>
                   <tr v-if="is_file_uploaded && iscolumnsnamechanged && ismetricssaved">
                     <!-- <tr> -->
                      <i
                      class="fa fa-chevron-down rotate"
                      style="margin-right:15px; margin-top:1%"
                      ></i>
                      <b>Define Worksheet Details</b>
                     <table class="table" style="border-bottom: 1px solid #dbe2e8;">
                       <tr style="text-align:center">
                         <td>COLUMN NAME</td>
                         <!-- <td>DESCRIPTION</td> -->
                         <td>DATA TYPE</td>
                         <td>COLUMN TYPE</td>
                         <td>AGGREGATION</td>
                         <td>INDEX TYPE</td>
                         <td>ENTITY CATEGORY</td>
                         <td>ADDITIVE</td>
                         <td>HIDDEN</td>
                         <td>NLP SEARCH ENABLED</td>
                         <td>SYNONYMS</td>
                       </tr>
                       <tr v-for="(column,index) in newcolumnscomplete "
                          :key="index">
                        <td style="width:12%"> {{column.newname}} </td>
                        <td style="width:7%"> {{column.data_type}} </td>
                        <td style="width:10%">
                          <!-- <div class="form-group select-id-to" style="margin:0"> -->
                            <select
                              class="form-control"
                              :id="'to_'+index"
                              v-model="column.column_type"
                              style="padding:0"
                            >
                              <option value="Metric">Metric</option>
                              <option value="Attribute">Attribute</option>
                            </select>
                          <!-- </div> -->
                        </td>
                        
                        <td style="width:1%">
                          <!-- <div class="form-group select-id-to" style="margin:0"> -->
                           <select
                              class="form-control"
                              :id="'aggregation'+index"
                              v-model="column.aggregation"
                              style="padding:0"
                            >
                              <option value="SUM">SUM</option>
                              <option value="AVG">AVG</option>
                            </select>
                          <!-- </div> -->
                        </td>
                        <td style="width:14%">
                          <select
                           v-model="column.index_type"
                           class="form-control"
                           style="padding:0">
                            <option value="NOT INDEXED">NOT INDEXED</option>
                            <option value="DEFAULT">DEFAULT</option>
                          </select>
                        </td>
                        <td style="width:14%">
                          <select
                           v-model="column.entity_category"
                           class="form-control"
                           style="padding:0">
                            <option value="PERSON">PERSON</option>
                            <option value="PLACE">PLACE</option>
                            <option value="TIME">TIME</option>
                            <option value="PRODUCT">PRODUCT	</option>
                            <option value="ZIP_CODE">ZIP_CODE</option>
                            <option value="LAT_LONG">LAT_LONG</option>
                            <option value="COMPANY_ORG">COMPANY_ORG</option>
                            <option value="NUM_TYPES">NUM_TYPES</option>
                          </select>
                        </td>
                        <td style="width:6%;text-align:center">
                        <label class="switch">
                            <input type="checkbox" v-model="column.additive" >
                            <span class="slider round" style="border-radius: 50px;"></span>
                        </label>  
                        </td>
                         <!-- </td> -->
                        <td style="width:6%;text-align:center">
                        <label class="switch">
                            <input type="checkbox" v-model="column.hidden" >
                            <span class="slider round" style="border-radius: 50px;">
                            </span>
                        </label>  
                        </td>
                        <td style="width:10%;text-align:center">
                        <label class="switch">
                            <input type="checkbox" v-model="column.nlp_search_enabled" >
                            <span class="slider round" style="border-radius: 50px;"></span>
                        </label>  
                        </td>
                        <td style="width:15%"> 
                        <input 
                          class="form-control" 
                          type="text" 
                          placeholder="Type to edit"
                          v-model="column.synonyms"
                          style="height: 40px !important;padding-left:12px;"
                          >  
                        </td>
                        
                        
                       </tr>
                     </table>
                        <button
                          @click="save_column_data()"
                          class="darkblue-btn"
                        >Save Column Details</button>
                   </tr>
                </thead>
                <tbody>
                  <button
                    style="margin-top:1%"
                    v-if="is_file_uploaded && iscolumnsnamechanged && ismetricssaved"
                    @click="finalsave()"
                    class="darkblue-btn"
                  >Final Save</button>
                </tbody>
              </table>
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
  data() {
    return {
      show_loader: false,
      spinnerOn: false,
      columns: [],
      metrics: [],
      file_label: "Choose file",
      is_file_uploaded: false,
      newcolumns: [],
      iscolumnsnamechanged: false,
      object_name: "",
      metricsdata: "",
      ismetricssaved: false,
      dataset_name: "",
      file: null,
      newcolumnscomplete: [],
      column_details: {},
    };
  },
  methods: {
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
    editvalue(index) {
      document.getElementById(
        "input" + index
      ).disabled = !document.getElementById("input" + index).disabled;
    },
    getFile(e) {
      e.preventDefault();
      let filename = "";
      let filedata = "";
      const file = e.target.files[0];
      this.file_label = file.name;
      console.log(file);
      if (file.type != "text/csv") {
        Swal({
          type: "error",
          text: "Only CSV files can be uploaded.",
          timer:2000,
        });
        this.file_label = "Choose file";
      } else {
        this.file = e.target.files[0];
        // const reader = new FileReader();
        // filename = file.name;
        // reader.readAsDataURL(file);
        // reader.onloadstart = () => {
        //   // this.$root.$emit('show_loader', true);
        // };
        // reader.onload = () => {
        //   // this.$root.$emit('show_loader', true);
        //   filedata = reader.result.split("base64,")[1];
        // };
        // reader.onloadend = () => {
        //   var x = filedata.split("base64,")[1];
        //   var temp_uuid = "";
        //   temp_uuid = this.generateUUID();
        //   var user_details = {
        //     email: this.$session.get("UserInformation").email,
        //     token: this.$session.get("UserInformation").tokens,
        //     company_name: this.$session.get("UserInformation").company_name,
        //     company_id: this.$session.get("UserInformation").company_id,
        //     license_key: this.$session.get("UserInformation").license_key,
        //     idempotency_key: temp_uuid,
        //     dataset_name: this.dataset_name
        //   };
        //   var json = JSON.stringify(user_details);
        //   var blob = new Blob([json], {
        //     type: "application/json"
        //   });
        //   const fd = new FormData();
        //   fd.append("file", file, filename);
        //   fd.append("json", blob);
        //   this.spinnerOn = true;
        //   axios
        //     .post(api_calls.bi_upload_file(), fd)
        //     .then(response => {
        //       if (response.data.status == "Success") {
        //         for (
        //           let i = 0;
        //           i < response.data.file_details.columns.length;
        //           i++
        //         ) {
        //           this.columns.push({
        //             name: response.data.file_details.columns[i],
        //             newname: response.data.file_details.columns[i]
        //           });
        //         }
        //         //   this.columns = response.data.file_details.columns;
        //         this.spinnerOn = false;
        //         this.is_file_uploaded = true;
        //         this.object_name = response.data.file_details.object_name;
        //         Swal.fire({
        //           title: "File Uploaded Successfully",
        //           type: "success"
        //         });
        //       } else if (response.data.status != "Success") {
        //         this.file_label = "Choose file";
        //         this.spinnerOn = false;
        //         Swal.fire({
        //           title: "Some Error Occurred, Please Try Again!",
        //           type: "error"
        //         });
        //         // setTimeout(() => {
        //         // $router.go();
        //         // }, 1000);
        //       }
        //     })
        //     .catch(err => {
        //       this.file_label = "Choose file";
        //       this.spinnerOn = false;
        //       Swal.fire({
        //         title: "Some Error Occurred, Please Try Again!",
        //         type: "error"
        //       });
        //       // console.log(err);
        //     });
        // };
      }
      // reader.onloadend = () => {
      //   this.$root.$emit('hide_loader', true);
      // };
    },
    addmetricvalue() {
      event.preventDefault();
      // debugger;
      this.metrics.push({
        name: null,
        operation: "null",
        // column1: null,
        // column2: null,
        column: null,
      });
      //   console.log(this.metrics);
    },
    deleteheader(valueindex) {
      // console.log(valueindex,this.selectednode);
      this.metrics.splice(valueindex, 1);
      // this.value.splice(valueindex, 1);
    },
    editcolumns() {
      event.preventDefault();
      Swal.fire({
        title: "Are you sure?",
        text: " You want to Edit the Columns?",
        type: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Confirm!"
      }).then(result => {
        if (result.value) {
          // this.newcolumns = this.columns
          var newcolumnsdata = [];
          for (let i = 0; i < this.columns.length; i++) {
            newcolumnsdata.push({
              name: this.columns[i].name,
              newname: this.columns[i].newname,
              data_type : this.columns[i].data_type,
              column_type: "Metric",
              additive: false,
              aggregation: "SUM",
              hidden:false,
              nlp_search_enabled: false,
              synonyms: "",
              index_type: "DEFAULT"
            });
          }
          // console.log(newcolumnsdata);
          var object = newcolumnsdata.reduce(
            (obj, item) => Object.assign(obj, { [item.name]: item.newname }),
            {}
          );
          // console.log(object);
          this.newcolumns = object;
          this.newcolumnscomplete = newcolumnsdata;
          this.iscolumnsnamechanged = true;
        }
      });
    },
    addmetrics() {
      event.preventDefault();
      Swal.fire({
        title: "Are you sure?",
        text: " You want to add these metrics?",
        type: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Confirm!"
      }).then(result => {
        if (result.value) {
          this.metricsdata = [];
          for (let i = 0; i < this.metrics.length; i++) {
            this.metricsdata.push({
              name: this.metrics[i].name,
              column: this.metrics[i].column,
              operation: this.metrics[i].operation,
              // on: [this.metrics[i].column1, this.metrics[i].column2]
            });
          }
          this.ismetricssaved = true;
        }
        // console.log(this.metricsdata);
      });
    },
    finalsave() {
      // console.log(this.newcolumns);
      // console.log(this.metrics);
      this.spinnerOn = true;
      axios
        .post(api_calls.bi_process_data(), {
          company_name: this.$session.get("UserInformation").company_name,
          company_id: this.$session.get("UserInformation").company_id,
          email: this.$session.get("UserInformation").email,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens,
          object_name: this.object_name,
          column_rename_mapping: this.newcolumns,
          dataset_name: this.dataset_name,
          metrics: this.metricsdata,
          worksheet_details: this.column_details
        })
        .then(response => {
          this.spinnerOn = false;
          if (response.data.status == "Success") {
            Swal.fire({
              title: "Data Processed Successfully",
              type: "success",
              timer:2000,
            });
          } else {
            Swal.fire({
              title: "Some Error Occurred, Please Try Again!",
              type: "error",
              timer:2500,
            });
          }
          console.log(response);
        })
        .catch(err => {
          this.spinnerOn = false;
          Swal.fire({
            title: "Some Error Occurred, Please Try Again!",
            type: "error",
            timer:2500,
          });
          console.log(err);
        });
    },
    uploadfile() {
      event.preventDefault();
      // console.log(this.dataset_name);
      // console.log(this.file);
      let filename = "";
      let filedata = "";
      const reader = new FileReader();
      filename = this.file.name;
      reader.readAsDataURL(this.file);
      reader.onloadstart = () => {
        // this.$root.$emit('show_loader', true);
      };
      reader.onload = () => {
        // this.$root.$emit('show_loader', true);
        filedata = reader.result.split("base64,")[1];
      };
      reader.onloadend = () => {
        var x = filedata.split("base64,")[1];
        var temp_uuid = "";
        temp_uuid = this.generateUUID();
        var user_details = {
          email: this.$session.get("UserInformation").email,
          token: this.$session.get("UserInformation").tokens,
          company_name: this.$session.get("UserInformation").company_name,
          company_id: this.$session.get("UserInformation").company_id,
          license_key: this.$session.get("UserInformation").license_key,
          idempotency_key: temp_uuid,
          dataset_name: this.dataset_name
        };
        var json = JSON.stringify(user_details);
        var blob = new Blob([json], {
          type: "application/json"
        });
        const fd = new FormData();
        fd.append("file", this.file, filename);
        fd.append("json", blob);
        this.spinnerOn = true;
        console.log(fd);
        axios
          .post(api_calls.bi_upload_file(), fd)
          .then(response => {
            if (response.data.status == "Success") {
              for (
                let i = 0;
                i < response.data.file_details.columns.length;
                i++
              ) {
                this.columns.push({
                  name: response.data.file_details.columns[i],
                  newname: response.data.file_details.columns[i],
                  
                });
              
              }
                  for(let k= 0; k< this.columns.length; k ++){
                    for (let [key, value] of Object.entries(response.data.file_details.data_types)) {
                    if(key == this.columns[k].name){
                      this.columns[k].data_type =  value
                    }
                    }
                  }
                // console.log(this.columns);
              //   this.columns = response.data.file_details.columns;
              this.spinnerOn = false;
              this.is_file_uploaded = true;
              this.object_name = response.data.file_details.object_name;
              Swal.fire({
                title: "File Uploaded Successfully",
                type: "success",
                timer:2000,
              });
            } else if (response.data.status != "Success") {
              this.file_label = "Choose file";
              this.spinnerOn = false;
              Swal.fire({
                title: "Some Error Occurred, Please Try Again!",
                type: "error",
                timer:2500,
              });
              // setTimeout(() => {
              // $router.go();
              // }, 1000);
            }
          })
          .catch(err => {
            this.file_label = "Choose file";
            this.spinnerOn = false;
            Swal.fire({
              title: "Some Error Occurred, Please Try Again!",
              type: "error",
              timer:2500,
            });
            console.log(err,"wEeeee");
          });
      };
    },
    save_column_data(){ 
      // console.log(this.newcolumnscomplete);
       Swal.fire({
        title: "Are you sure?",
        text: " You want to add these worksheet details?",
        type: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Confirm!"
      }).then(result => {
      if (result.value) {
        var array = {}; 
        var worksheet_details = {};
        for(let i = 0; i < this.newcolumnscomplete.length; i++){
        var temp = this.newcolumnscomplete[i];
        temp.synonyms = temp.synonyms.replace(/,/g, '>>');
        worksheet_details[temp.newname] = {
            "datatype": `${temp.data_type}`,
            "column_type": `${temp.column_type}`,
            "additive": temp.additive,
            "aggregation": `${temp.aggregation}`,
            "hidden" : temp.hidden,
            "nlp_search_enabled": temp.nlp_search_enabled,
            "index_type": `${temp.index_type}`,
            "synonyms": `${temp.synonyms}`,
            "entity_category":`${temp.entity_category}`
            }
        temp.synonyms = temp.synonyms.replace(/>> /g, ',');
        }
        console.log(worksheet_details);
        this.column_details = Object.assign(worksheet_details);
      }
      });

        // console.log(worksheet_details);
        // console.log(this.column_details);
    }
  },
  mounted() {
    // var columns = [];
    // var respcolumns = ["TICKET","UNITS","PRICE","REFERENCE","CODE","NAME","PRICEBUY","PRICESELL","DATENEW","PAYMENT","TOTAL","TRANSID","CATEGORY","Sales"]
    // var dtypes = {"TICKET":"str","UNITS":"float64","PRICE":"float64","REFERENCE":"int64","CODE":"float64","NAME":"str","PRICEBUY":"float64","PRICESELL":"float64","DATENEW":"str","PAYMENT":"str","TOTAL":"float64","TRANSID":"str","CATEGORY":"str","Sales":"float64"}
    // for (let i = 0;i < respcolumns.length;i++) {
    //             this.columns.push({
    //               name: respcolumns[i],
    //               newname: respcolumns[i]
    //             });
    //           }
    //     for(let k= 0; k< this.columns.length; k ++){
    //                 for (let [key, value] of Object.entries(dtypes)) {
    //                   // console.log(`${key}: ${value}, ${columns[k].name  }`);
    //                 if(key == this.columns[k].name){
    //                   this.columns[k].data_type =  value
    //                 }
    //                 }
    //               }
    //               var newcolumnsdata = [];
    //       for (let i = 0; i < this.columns.length; i++) {
    //         newcolumnsdata.push({
    //           name: this.columns[i].name,
    //           newname: this.columns[i].newname,
    //           data_type : this.columns[i].data_type,
    //           column_type: "Metric",
    //           additive: false,
    //           aggregation: "SUM",
    //           hidden:false,
    //           nlp_search_enabled: false,
    //           synonyms: "",
    //           index_type: "DEFAULT",
    //           entity_category: "PERSON",
    //           currency_format: "NONE",
    //         });
    //       }
    //       // console.log(newcolumnsdata);
    //       var object = newcolumnsdata.reduce(
    //         (obj, item) => Object.assign(obj, { [item.name]: item.newname }),
    //         {}
    //       );
    //       // console.log(object);
    //       this.newcolumns = object;
    //       this.newcolumnscomplete = newcolumnsdata;
    //               // console.log(this.newcolumnscomplete);
  }
};
</script>
<style scoped>
.table td,
.table th {
  padding: 0.5rem !important;
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
.switch {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
  /* margin-left: 10px; */
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 12px;
  width: 12px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
  border-radius: 20px;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
  border-radius: 20px;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(17px);
}

Rounded sliders
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

</style>