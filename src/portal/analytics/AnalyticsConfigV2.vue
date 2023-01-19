<template>
<div>
    <div class="spinner" id="spinner" v-show="spinnerOn" style="z-index:100"></div>
    <div class="card-body" style="padding:0">
        <div v-if="!show_dataset_settings && !show_database_dataset_settings"> 
            <div style="text-align:end">
                <button style="margin-right:1%" class="btn btn-primary" @click="open_settings_for_dataset(null)"> Add File </button>
                <button class="btn btn-primary" @click="open_settings_for_database_dataset(null)"> Add DB </button>
            </div>
            <table class="table" style="border: 1px solid #dbe2e8;margin-top:1%" v-if="datasets.length>0">
                <tr>
                    <th style="text-align:left;width:50%">Dataset Name </th>
                    <th style="text-align:left">Uploaded On</th>
                    <th style="text-align:center">Edit</th>
                </tr>
                <tr v-if="datasets.length==0">
                    <td colspan="2" style="text-align:center"> It seems you dont have any datasets! Kindly Add a Dataset to Begin. </td>
                </tr>
                <tr v-for="(dataset, index) in datasets" :key="index">
                    <td style="text-align:left"> {{dataset.data_name}} </td>
                    <td style="text-align:left"> {{format_date(dataset.uploaded_at)}} </td>
                    <td style="text-align:center">  <i class="fa fa-cog" aria-hidden="true" @click="open_settings_for_dataset(index)" style="cursor:pointer"></i> </td>
                </tr>
            </table>    
        </div>
        <!-- <transition name="fade" mode="in-out"> -->
        <div v-if="show_dataset_settings" style="transition: visibility 0s linear 300ms, opacity 300ms;">
            <div style="margin-bottom:2%" v-if="is_dataset_editable" ><i class="fa fa-chevron-left fa-lg" aria-hidden="true" @click="show_dataset_settings = !show_dataset_settings" style="cursor:pointer" > Back</i> <span> </span> </div>
            <div style="margin-bottom:2%" v-else><i class="fa fa-chevron-left fa-lg" aria-hidden="true" @click="show_dataset_settings = !show_dataset_settings " style="cursor:pointer"> Back</i>  </div>
            <div class="table-box">
            <div class="table-responsive">
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
                  <b v-if="is_dataset_editable">Uploaded File</b>
                  <b v-else>Upload File</b>
                  <!-- </a> -->
                  <div
                    id="collapseExample"
                    class="col-sm-12"
                    style="padding: 0.3rem;display:flex"
                  >
                    <div class="custom-file col-sm-6">
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
                    <div class="col-sm-6" style="display:flex">
                      <div class="col-sm-4" style="margin-top:1%">
                      <label style="padding-left:10px;float:right">Name of Dataset</label>
                      </div>
                      <div class="col-sm-8">
                      <input
                        id="dataset_name"
                        type="text"
                        v-model="dataset_name"
                        style="padding-left:8px;margin-left: 3%;height: 40px !important;"
                        class="form-control"
                        required
                      />
                      </div>
                    </div>
                    <!-- <div class="col-sm-2" style="display:flex">
                      <button
                        style="height:40px"
                        class="btn btn-primary"
                        type="submit"
                      >Upload File</button>
                    </div> -->
                  </div>
                  <div class="col-sm-3" style="margin-top:1%">
                      <button v-if="!is_dataset_editable"
                        style="height:40px"
                        class="darkblue-btn"
                        type="submit"
                        id="upload_file"
                      >Upload File</button>
                    </div>
                </form>
              </div>
              <div v-if="is_file_uploaded">
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
                    <div id="collapseExamples__1" class="col-sm-12" style="padding:0">
                      <form @submit="editcolumns()">
                        <div
                          style="display:flex;margin-bottom: 1%;margin-top: 1%;padding:0"
                          v-for="(column,index) in columns "
                          :key="index"
                          class="col-sm-12"
                        >
                          <div class="col-sm-2">
                          <label>Original Name</label>
                          </div>
                          <div class="col-sm-4">
                          <input
                            class="form-control"
                            v-model="column.name"
                            disabled
                            type="text"
                            style="padding-left:12px;margin-left: 3%;height: 40px !important;"
                          />
                          </div>
                          <div class="col-sm-2">
                          <label style="padding-left:9px;">New Name</label>
                          </div>
                          <div class="col-sm-4" style="display: contents;">

                          <input
                            class="form-control"
                            :id="'input'+index"
                            v-model="column.newname"
                            type="text"
                            style="padding-left:12px;margin-left: 3%;height: 40px !important;"
                          />
                          </div>
                        </div>
                        <button type="submit" class="darkblue-btn" style="margin:2%">Save Column Names</button>
                      </form>
                    </div>
                  </tr>
                </table>
              </div>
              <div v-if="is_file_uploaded && iscolumnsnamechanged">
                <table class="table">
                  <tr>
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
                        height="14"
                        viewBox="0 0 14 16"
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
                    <div
                      class="col-sm-12"
                      style="display: flex;margin-top: 2%;margin-left:0;padding-left:0"
                      v-for="(metric,index) in metrics"
                      :key="index"
                    >
                      <div class="col-sm-5">
                        <label>Name</label>
                        <input
                          type="text"
                          class="form-control"
                          style="height: 40px !important;padding-left:12px;"
                          v-model="metric.name"
                          required
                        />
                      </div>
                      <div class="col-sm-3">
                        <label>Operation</label>
                        <!-- <select
                          type="text"
                          class="form-control"
                          v-model="metric.operation"
                          required
                          style="padding-left:12px;margin-left: 3%;height: 40px !important;"
                        >
                          <option value="SUM" selected>SUMMATION</option>
                          <option value="AVG">AVERAGE</option>
                          <option value="COUNT">COUNT</option>
                          <option value="NUNIQUE">NUNIQUE</option>
                        </select> -->
                        <multiselect
                        :close-on-select="true"
                        :taggable="false"
                        :multiple="false"
                        :options="metric_operation_options"
                        v-model="metric.operation"
                        >
                        </multiselect>
                      </div>
                      <div class="col-sm-4">
                        <label>Column</label>
                        <!-- <select
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
                        </select> -->
                        <div style="display:flex">
                        <multiselect
                        :close-on-select="true"
                        :taggable="false"
                        :multiple="false"
                        :options="Object.values(newcolumns)"
                        v-model="metric.column"
                        >
                        </multiselect>
                          <button
                          class="save_node_button"
                          style="margin-left: 3%;height: 39px;padding-top: 0px;padding-left: 10px;padding-right: 10px;padding-bottom: 0px;background: #F23D3D;border: solid 1px #F23D3D;"
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
                    </div>
                    <button
                      v-if="metrics.length > 0"
                      @click="addmetrics()"
                      class="darkblue-btn"
                      style="margin:2%"
                    >Save Metrics</button>
                  </tr>
                </table>
              </div>
                  <div v-if="is_file_uploaded && iscolumnsnamechanged && ismetricssaved">  
                    <i
                    class="fa fa-chevron-down rotate"
                    style="margin-right:15px; margin-top:1%"
                    ></i>
                    <b>Define Worksheet Details</b>
                   <div id="table-scroll" class="table-scroll"  style="border: 1px solid #dbe2e8;">
                     <table class="table" id="worksheet_details">
                       <thead>
                       <tr style="text-align:left">
                          <th style="text-align:left;width:8%">COLUMN NAME</th>
                            <th style="text-align:left">DATA TYPE</th>
                            <th>COLUMN TYPE</th>
                            <th>AGGREGATION</th>
                            <th>CURRENCY FORMAT</th>
                            <th>INDEX TYPE</th>
                            <th>ENTITY CATEGORY</th>
                            <th>ADDITIVE</th>
                            <th>HIDDEN</th>
                            <th>NLP SEARCH ENABLED</th>
                            <th>SYNONYMS</th>
                       </tr>
                       </thead>
                       <tbody>
                       <tr v-for="(column,index) in newcolumnscomplete "
                          :key="index">
                          <!-- {{column}} -->
                        <td style="text-align:left;width:5%"> {{column.newname}} </td>
                        <td style="text-align:left"> {{column.data_type}} </td>
                        <td style="text-align:center">
                            <select
                              class="form-control"
                              :id="'to_'+index"
                              v-model="column.column_type"
                              style="padding:0"
                            >
                              <option value="Metric">Metric</option>
                              <option value="Attribute">Attribute</option>
                            </select>
                        </td>
                        
                        <td>
                           <select
                              class="form-control"
                              :id="'aggregation'+index"
                              v-model="column.aggregation"
                              style="padding:0"
                            >
                              <option value="None" >None</option>
                              <option value="SUM">SUM</option>
                              <option value="AVG">AVG</option>
                              <!-- <option v-for="(agg_option,index2) in aggregation_options" :key="index2" :value="agg_option">
                                {{agg_option}}
                              </option> -->
                            </select>
                        </td>
                        <td style="text-align:center;"> <p @click="open_currency_format_modal(index)"> {{((column.currency_format === null)? "None" : column.currency_format)}} </p> </td>
                        <td>
                          <select
                           v-model="column.index_type"
                           class="form-control"
                           style="padding:0">
                            <option value="NOT INDEXED">NOT INDEXED</option>
                            <option value="DEFAULT">DEFAULT</option>
                          </select>
                        </td>
                        <td>
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
                        <td style="text-align:center">
                        <label class="switch">
                            <input type="checkbox" v-model="column.additive" >
                            <span class="slider round" style="border-radius: 50px;"></span>
                        </label>  
                        </td>
                        <td style="text-align:center">
                        <label class="switch">
                            <input type="checkbox" v-model="column.hidden" >
                            <span class="slider round" style="border-radius: 50px;">
                            </span>
                        </label>  
                        </td>
                        <td style="text-align:center">
                        <label class="switch">
                            <input type="checkbox" v-model="column.nlp_search_enabled" >
                            <span class="slider round" style="border-radius: 50px;"></span>
                        </label>  
                        </td>
                        <td> 
                        <input 
                          class="form-control" 
                          type="text" 
                          placeholder="Type to edit"
                          v-model="column.synonyms"
                          style="height: 40px !important;padding-left:12px;"
                          >  
                        </td>
                       </tr>
                       </tbody>
                     </table>
                     </div>
                      <button
                        style="margin-top:2%"
                          @click="save_column_data()"
                          class="darkblue-btn"
                      >Save Column Details</button>
                  </div>
                  <button
                    style="margin-top:1%"
                    v-if="is_file_uploaded && iscolumnsnamechanged && ismetricssaved"
                    @click="finalsave()"
                    class="darkblue-btn"
                  >Final Save</button>
            </div>
          </div>
        </div>
        <!-- </transition> -->
        <div v-if="show_database_dataset_settings">
          <div style="margin-bottom:2%"><i class="fa fa-chevron-left fa-lg" aria-hidden="true" @click="show_database_dataset_settings = !show_database_dataset_settings;show_database_dataset_settings_details = false" style="cursor:pointer"> Back</i>  </div>
          <div class="row" v-if="!show_database_dataset_settings_details">
            <div class="image-block col-sm-3 shadow" style="text-align:center;margin:1%" @click="open_database_dataset_modal('postgres')">
              <img :src="postgres_icon_path" height="150px" width="150px" alt="">
              <!-- <p> POSTGRESQL </p> -->
            </div>
            <div class="image-block col-sm-3 shadow"  style="cursor:not-allowed;text-align:center;margin:1%;background: #ececec;" @click="open_database_dataset_modal('mysql')" disabled>
              <img :src="mysql_icon_path" height="150px" width="175px" alt="" >
              <!-- <p> MYSQL </p> -->
            </div>
          </div>
          <!-- <div id="addDatabaseDatasetModal" class="modal fade" role="dialog" data-backdrop="static">
            <div class="modal-dialog"> -->

              <!-- Modal content-->
              <!-- <div class="modal-content"> -->
                <!-- <div class="modal-header">
                  <button type="button" class="close" @click="change_currency_format('close')">&times;</button>
                </div> -->
            <transition name="fade" mode="out-in">
              <div class="row" v-if="show_database_dataset_settings_details">
                <div class="col-sm-12" style="display:flex">
                <div class="col-sm-2"></div>
                <div class="col-sm-7">
                <div class="card">
                 <div class="card-body">
                  <form @submit="add_dataset_details">
                <!-- <div class="modal-body"> -->
                  <div style="text-align:center;margin:1%">
                  <img :src="current_dataset_database_icon" height="150px" width="150px" alt="">
                  <button type="button" class="close" @click="show_database_dataset_settings_details = !show_database_dataset_settings_details">&times;</button>
                  </div>
                    <div class="form-group">
                      <label for="dataset_id">Dataset ID</label>
                      <input type="text" class="form-control" style="height: 40px !important;padding-left:12px;" v-model="database_dataset_id" disabled>
                    </div>
                    <div class="form-group">
                      <label for="dataset_id">Dataset Name</label>
                      <input type="text" class="form-control" style="height: 40px !important;padding-left:12px;" v-model="database_dataset_name" required >
                    </div>
                    <div class="form-group">
                      <label for="dataset_id">Dataset Schema Name</label>
                      <input type="text" class="form-control" style="height: 40px !important;padding-left:12px;" v-model="database_schema_name">
                    </div>
                    <div class="form-group">
                      <label for="dataset_id">Dataset Username</label>
                      <input type="text" class="form-control" style="height: 40px !important;padding-left:12px;" v-model="database_username" required>
                    </div>
                    <div class="form-group">
                      <label for="dataset_id">Dataset Password</label>
                      <input type="text" class="form-control" style="height: 40px !important;padding-left:12px;" v-model="database_password" required >
                    </div>
                    <div style="display:flex; margin:1%">
                    <div class="radio" >
                      <label style="vertical-align: text-top;">
                        <input type="radio" value="JDBC" name="database_dataset_connection_type" v-model="database_dataset_connection_type"/>
                        <span
                          class="icn"
                          id="radio"
                        ></span>
                        JDBC Connection String
                      </label>
                   </div>
                  <div class="radio" style="margin-left:2%">
                      <label style="vertical-align: text-top;">
                        <input type="radio" value="host_port" name="database_dataset_connection_type" v-model="database_dataset_connection_type"/>
                        <span
                          class="icn"
                          id="radio"
                        ></span>
                        Host, Port, DB Name
                      </label>
                   </div>
                   </div>
                  <transition name="fade" mode="out-in">
                    <div style="margin-top:2%" class="form-group" v-if="database_dataset_connection_type === 'JDBC'">
                      <label for="dataset_id">Dataset JDBC Connection String</label>
                      <input type="text" class="form-control" style="height: 40px !important;padding-left:12px;" v-model="database_jdbc_connection_string" required>
                    </div>
                  </transition>
                  <transition name="fade" mode="out-in">
                    <div style="margin-top:2%" v-if="database_dataset_connection_type === 'host_port'">
                    <div class="form-group">
                      <label for="dataset_id">Dataset Host</label>
                      <input type="text" class="form-control" style="height: 40px !important;padding-left:12px;" v-model="database_host" required>
                    </div>
                    <div class="form-group">
                      <label for="dataset_id">Dataset Port</label>
                      <input type="text" class="form-control" style="height: 40px !important;padding-left:12px;" v-model="database_port" required>
                    </div>
                    <div class="form-group">
                      <label for="dataset_id">Dataset DB Name</label>
                      <input type="text" class="form-control" style="height: 40px !important;padding-left:12px;" v-model="database_db_name" required>
                    </div>
                    </div>
                  </transition>
                <!-- </div> -->
                <div class="modal-footer">
                  <button type="submit" class="btn btn-primary">Submit</button>
                  <button type="button" class="btn btn-primary" @click="show_database_dataset_settings_details = !show_database_dataset_settings_details">Cancel</button>
                </div>
                </form>
                </div>
                </div>
                </div>  
                </div>
              </div>
            </transition> 
              <!-- </div> -->

            <!-- </div>
          </div>   -->
        </div>
       <!--Currency Format Modal -->
        <div id="currencyFormatModal" class="modal fade" role="dialog" data-backdrop="static">
          <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Specify Currency Type</h4>
                <button type="button" class="close" @click="change_currency_format('close')">&times;</button>
              </div>
              <div class="modal-body">
                  <!-- <input type="radio" id="None" name="gender" value="None">
                  <label for="None">None</label><br>
                  <input type="radio" id="Specific" name="gender" value="Specific">
                  <label for="Custom">Specify ISO Code</label><br> -->
                  <div class="radio" >
                      <label style="vertical-align: text-top;">
                        <input
                          type="radio"
                          value="None"
                          name="currency_format"    
                          v-model="currency_format_modal"

                        />
                        <span
                          class="icn"
                          id="radio"
                        ></span>
                        None
                      </label>

                   </div>
                   <div style="display:flex"> 
                  <!-- <table>
                    <td> -->
                    
                   <div class="radio" >
                      <label style="vertical-align: text-top;">
                        <input
                          type="radio"
                          value="Specific"
                          name="currency_format"
                          v-model="currency_format_modal"
                        />
                        <span
                          class="icn"
                          id="radio"
                        ></span>
                        Specify ISO Code
                        
                      </label>
                       
                   </div>
                   <!-- </td>
                   <td> -->
                   <multiselect
                   class="country"
                      :close-on-select="true"
                      :taggable="false"
                      :multiple="false"
                      :options="country_codes"
                      placeholder="Select Country Code"
                      v-model="country_iso_code"
                      :disabled="is_country_codes_dropdown_disabled"
                    ></multiselect>
                   <!-- </td>
                    </table> -->
                   </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" @click="change_currency_format('save')">Save</button>
                <button type="button" class="btn btn-default" @click="change_currency_format('close')">Close</button>
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
import moment from "moment";
import swal from 'sweetalert2';


export default {
  name: "AnalyticsConfigV2",
  components: {
    Multiselect,
  },
  data() {
    return {
      spinnerOn: false,
      columns: [],
      metrics: [],
      file_label: "Choose file",
      is_file_uploaded: false,
      newcolumns: [],
      iscolumnsnamechanged: false,
      object_name: "",
      metricsdata: [],
      ismetricssaved: false,
      dataset_name: "",
      file: null,
      newcolumnscomplete: [],
      column_details: {},
      is_dataset_editable: false,
      datasets:[],
      show_dataset_settings: false,
      // country_codes:["AFN","EUR","ALL","DZD","USD","EUR","AOA","XCD","XCD","ARS","AMD","AWG","AUD","EUR","AZN","BSD","BHD","BDT","BBD","BYN","EUR","BZD","XOF","BMD","INR","BTN","BOB","BOV","USD","BAM","BWP","NOK","BRL","USD","BND","BGN","XOF","BIF","CVE","KHR","XAF","CAD","KYD","XAF","XAF","CLP","CLF","CNY","AUD","AUD","COP","COU","KMF","CDF","XAF","NZD","CRC","XOF","HRK","CUP","CUC","ANG","EUR","CZK","DKK","DJF","XCD","DOP","USD","EGP","SVC","USD","XAF","ERN","EUR","ETB","EUR","FKP","DKK","FJD","EUR","EUR","EUR","XPF","EUR","XAF","GMD","GEL","EUR","GHS","GIP","EUR","DKK","XCD","EUR","USD","GTQ","GBP","GNF","XOF","GYD","HTG","USD","AUD","EUR","HNL","HKD","HUF","ISK","INR","IDR","XDR","IRR","IQD","EUR","GBP","ILS","EUR","JMD","JPY","GBP","JOD","KZT","KES","AUD","KPW","KRW","KWD","KGS","LAK","EUR","LBP","LSL","ZAR","LRD","LYD","CHF","EUR","EUR","MOP","MKD","MGA","MWK","MYR","MVR","XOF","EUR","USD","EUR","MRO","MUR","EUR","XUA","MXN","MXV","USD","MDL","EUR","MNT","EUR","XCD","MAD","MZN","MMK","NAD","ZAR","AUD","NPR","EUR","XPF","NZD","NIO","XOF","NGN","NZD","AUD","USD","NOK","OMR","PKR","USD","","PAB","USD","PGK","PYG","PEN","PHP","NZD","PLN","EUR","USD","QAR","EUR","RON","RUB","RWF","EUR","SHP","XCD","XCD","EUR","EUR","XCD","WST","EUR","STD","SAR","XOF","RSD","SCR","SLL","SGD","ANG","XSU","EUR","EUR","SBD","SOS","ZAR","","SSP","EUR","LKR","SDG","SRD","NOK","SZL","SEK","CHF","CHE","CHW","SYP","TWD","TJS","TZS","THB","USD","XOF","NZD","TOP","TTD","TND","TRY","TMT","USD","AUD","UGX","UAH","AED","GBP","USD","USD","USN","UYU","UYI","UZS","VUV","VEF","VND","USD","USD","XPF","MAD","YER","ZMW","ZWL","XBA","XBB","XBC","XBD","XTS","XXX","XAU","XPD","XPT","XAG","AFA","FIM","ALK","ADP","ESP","FRF","AOK","AON","AOR","ARA","ARP","ARY","RUR","ATS","AYM","AZM","RUR","BYR","BYB","RUR","BEC","BEF","BEL","BOP","BAD","BRB","BRC","BRE","BRN","BRR","BGJ","BGK","BGL","BUK","CNX","HRD","HRK","CYP","CSJ","CSK","ECS","ECV","GQE","EEK","XEU","FIM","FRF","FRF","FRF","GEK","RUR","DDM","DEM","GHC","GHP","GRD","FRF","GNE","GNS","GWE","GWP","ITL","ISJ","IEP","ILP","ILR","ITL","RUR","RUR","LAJ","LVL","LVR","LSM","ZAL","LTL","LTT","LUC","LUF","LUL","MGF","MWK","MVQ","MLF","MTL","MTP","FRF","FRF","MXP","RUR","FRF","MZE","MZM","NLG","ANG","NIC","PEN","PEH","PEI","PES","PLZ","PTE","FRF","ROK","RON","ROL","RUR","FRF","FRF","FRF","ITL","CSD","EUR","SKK","SIT","ZAL","SDG","RHD","ESA","ESB","ESP","SDD","SDP","SRG","CHC","RUR","TJR","IDR","TPE","TRL","TRY","RUR","TMM","UGS","UGW","UAK","SUR","USS","UYN","UYP","RUR","VEB","VEF","VEF","VNC","YDD","YUD","YUM","YUN","ZRN","ZRZ","ZMK","ZWC","ZWD","ZWD","ZWN","ZWR","XFO","XRE","XFU"], 
      country_iso_code: null,
      currency_format_modal: '',
      is_country_codes_dropdown_disabled: true,
      current_column_index: null,
      aggregation_options: [null, "SUM","AVG"],
      sample: "",
      country_codes: ["ALL","AFN","ARS","AWG","AUD","AZN","BSD","BBD","BYR","BZD","BMD","BOB","BAM","BWP","BGN","BRL","BND","KHR","CAD","KYD","CLP","CNY","COP","CRC","HRK","CUP","CZK","DKK","DOP","EGP","SVC","EEK","EUR","FKP","FJD","GEL","GHC","GIP","GTQ","GGP","GYD","HNL","HKD","HUF","ISK","INR","IDR","IRR","IMP","ILS","JMD","JPY","JEP","KZT","KPW","KRW","KGS","LAK","LVL","LBP","LRD","LTL","MKD","MYR","MUR","MXN","MNT","MZN","NAD","NPR","ANG","NZD","NIO","NGN","NOK","OMR","PKR","PAB","PYG","PEN","PHP","PLN","QAR","RON","RUB","SHP","SAR","RSD","SCR","SGD","SBD","SOS","ZAR","LKR","SEK","CHF","SRD","SYP","TWD","THB","TTD","TRL","TVD","UAH","GBP","USD","UYU","UZS","VEF","VND","YER","ZWD"],
      metric_operation_options: ['SUM', 'AVG', 'COUNT', 'NUNIQUE'],
      old_worksheet_details: {},
      postgres_icon_path: require('@/portal/assets/img/postgres_icon.png'),
      // mysql_icon_path: require('@/portal/assets/img/mysql_icon.png'),
      mysql_icon_path: require('@/portal/assets/img/logo-mysql.png'),
      show_database_dataset_settings: false,
      database_dataset_id: null,
      database_dataset_name: null,
      database_schema_name: null,
      database_jdbc_connection_string: null,
      database_host: null,
      database_port: null,
      database_username: null,
      database_password: null,
      database_db_name: null,
      show_database_dataset_settings_details: false,
      current_dataset_database_icon: null,
      isShowing_test: false,
      show_database_options: true,
      database_dataset_connection_type: 'JDBC',

      
    };
  },
  mounted() {
    this.get_dataset_list();
    // this.postgres_icon_path = require('@/portal/assets/img/postgres_icon.png')
  },
  methods: {
    open_settings_for_dataset(index){
      // console.log(index);
      if(index === null){
          this.show_dataset_settings = true;
      } else {
        // console.log(this.datasets[index])
          this.old_worksheet_details = this.datasets[index].old_worksheet_details;
          this.is_dataset_editable = true;
          this.file_label = this.datasets[index].file_name;
          $("#inputGroupFile01").prop("disabled", true);
          $("#dataset_name").prop("disabled", true);
          this.dataset_name = this.datasets[index].data_name;
          $("#upload_file").hide();
          // console.log(response.data.data_sources[0].worksheet_details.column_details);


          for (let [key, value] of Object.entries(this.datasets[index].worksheet_details.column_rename_map)) {
              this.columns.push({
                  name: key,
                  newname: value,
              });
          }
          this.is_file_uploaded = true;
          var metrics_len = this.datasets[index].worksheet_details.metrics.length; 
          for(let i = 0; i < metrics_len ; i++) {
              this.metrics.push({
                  name: this.datasets[index].worksheet_details.metrics[i].name,
                  column: this.datasets[index].worksheet_details.metrics[i].column,
                  operation: this.datasets[index].worksheet_details.metrics[i].operation,
              })
          }
          // debugger;
          // console.log(this.metrics);
          for (let i = 0; i < this.metrics.length; i++) {
              this.metricsdata.push({
              name: this.metrics[i].name,
              column: this.metrics[i].column,
              operation: this.metrics[i].operation,
              // on: [this.metrics[i].column1, this.metrics[i].column2]
              });
          }
          var object = this.columns.reduce(
              (obj, item) => Object.assign(obj, { [item.name]: item.newname }),
              {}
          );

          for (let [key, value] of Object.entries(this.datasets[index].worksheet_details.column_details)) {
              for (let i = 0; i < this.columns.length; i++) {
                  if(this.columns[i].newname === key) {
                      // console.log(value.currency_format);
                      this.columns[i].data_type = value.datatype; 
                      this.newcolumnscomplete.push({
                      name: this.columns[i].name,
                      newname: this.columns[i].newname,
                      data_type : value.datatype,
                      column_type: value.column_type,
                      additive: value.additive,
                      aggregation: ((value.aggregation === null) ? value.aggregation = "None" : value.aggregation = value.aggregation ),
                      hidden:value.hidden,
                      nlp_search_enabled: value.nlp_search_enabled,
                      synonyms: (value.synonyms ? undefined : "" ),
                      index_type: value.index_type,
                      entity_category:value.entity_category,
                      currency_format: ((value.currency_format === undefined) ? null : value.currency_format)
                      });
                  }
                  // break;
              } 
          }  
            // console.log(this.newcolumnscomplete);

              // console.log
          var array = {}; 
          var worksheet_details = {};
          for(let i = 0; i < this.newcolumnscomplete.length; i++){
          var temp = this.newcolumnscomplete[i];
          // console.log(temp.currency_format)
          // temp.synonyms = temp.synonyms.replace(/,/g, '>>');
          worksheet_details[temp.newname] = {
              "datatype": `${temp.data_type}`,
              "column_type": `${temp.column_type}`,
              "additive": temp.additive,
              "aggregation": temp.aggregation,
              "hidden" : temp.hidden,
              "nlp_search_enabled": temp.nlp_search_enabled,
              "index_type": `${temp.index_type}`,
              "synonyms": `${temp.synonyms}`,
              "entity_category":`${temp.entity_category}`,
              "currency_format":temp.currency_format
              }
          // temp.synonyms = temp.synonyms.replace(/>> /g, ',');
          }
          // console.log(worksheet_details);
          this.column_details = Object.assign(worksheet_details);
          // console.log(this.newcolumnscomplete,this.column_details);
          this.newcolumns = object;
          this.iscolumnsnamechanged = true;
          this.ismetricssaved = true;
          this.spinnerOn = false;
          this.show_dataset_settings = true;
          setTimeout(() => {
          $("#inputGroupFile01").prop("disabled", true);
          $("#dataset_name").prop("disabled", true);
          }, 100);
          
      }
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
    editvalue(index) {
      document.getElementById("input" + index).disabled = !document.getElementById("input" + index).disabled;
    },
    getFile(e) {
      e.preventDefault();
      let filename = "";
      let filedata = "";
      const file = e.target.files[0];
      this.file_label = file.name;
      // console.log(file);
      if (file.type != "text/csv") {
          Swal({
          type: "error",
          text: "Only CSV files can be uploaded.",
          timer:2500,
          });
          this.file_label = "Choose file";
      } else {
          this.file = e.target.files[0];
      }
    },
    addmetricvalue() {
      event.preventDefault();
      this.metrics.push({
          name: null,
          operation: "SUM",
          column: null,
      });
    },
    deleteheader(valueindex) {
      this.metrics.splice(valueindex, 1);
    },
    editcolumns() {
      event.preventDefault();
      var validation_success = true;
      for(let i = 0; i < this.columns.length; i++) {
        if(this.columns[i].newname === '' || this.columns[i].newname.split(' ').join('') === ''){
          toastr.error("You cannot set column names Empty");
          validation_success = false;
          break;
        }
      }
      if(validation_success){
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
              // debugger;
              // console.log(this.columns)
              // console.log(this.column_details);
            // this.newcolumns = this.columns
            var newcolumnsdata = [];
            if(!this.is_dataset_editable){
                for (let i = 0; i < this.columns.length; i++) {
                  // console.log(this.columns[i])
                    newcolumnsdata.push({
                    name: this.columns[i].name,
                    newname: this.columns[i].newname,
                    data_type : this.columns[i].data_type,
                    column_type: "Metric",
                    additive: false,
                    aggregation: "None",
                    hidden:false,
                    nlp_search_enabled: false,
                    synonyms: "",
                    index_type: "DEFAULT",
                    entity_category: "PERSON",
                    currency_format: "None"
                });
                }
            } else {
              for (let [key,value] of Object.entries(this.column_details)){
                // console.log(key, value)
                for (let i = 0; i < this.columns.length; i++) {
                  if (this.columns[i].name === key){
                  newcolumnsdata.push({
                    name: this.columns[i].name,
                    newname: this.columns[i].newname,
                    data_type : this.columns[i].data_type,
                    column_type: value.column_type,
                    additive: value.additive,
                    aggregation: value.aggregation,
                    hidden: value.hidden,
                    nlp_search_enabled: value.nlp_search_enabled,
                    synonyms: value.synonyms,
                    index_type: value.index_type,
                    entity_category: value.entity_category,
                    currency_format: value.currency_format 
                  });
                  }
                }
              }
                // for (let i = 0; i < this.columns.length; i++) {
                //   newcolumnsdata.push({
                //     name: this.columns[i].name,
                //     newname: this.columns[i].newname,
                //     data_type : this.columns[i].data_type,
                //     column_type: this.columns[i].column_type,
                //     additive: this.columns[i].additive,
                //     aggregation: this.columns[i].aggregation,
                //     hidden: this.columns[i].hidden,
                //     nlp_search_enabled: this.columns[i].nlp_search_enabled,
                //     synonyms: this.columns[i].synonyms,
                //     index_type: this.columns[i].index_type,
                //     entity_category: this.columns[i].entity_category,
                //     currency_format: this.columns[i].currency_format 
                //   });
                // }
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
      }
    },
    addmetrics() {
      event.preventDefault();
      var validation_success = true,
      metrics_name_list = []
      // console.log(metrics_name_list)
      // for(let i = 0;i < this.metrics.length; i++) {
      //   if((this.metrics[i].name === null || this.metrics[i].name === '' || this.metrics[i].name.split(' ').join('') === '' ) || (this.metrics[i].column === null) || (this.metrics[i].operation === null)){
      //   metrics_name_list.push(this.metrics[i].name)
      //   }
      // }
      for(let i = 0;i < this.metrics.length; i++) {
        // console.log(this.metrics[i]);
        if((this.metrics[i].name === null || this.metrics[i].name === '' || this.metrics[i].name.split(' ').join('') === '' ) || (this.metrics[i].column === null) || (this.metrics[i].operation === null)){
          toastr.error("Please Fill in all the values for the metrics");
          validation_success = false;
          // break;
        }
        // else{
        //   metrics_name_list.push(this.metrics[i].name);
        // }
        // console.log(metrics_name_list)
        // if(metrics_name_list.length > 1 && validation_success === true && metrics_name_list.includes(this.metrics[i].name)){
        //   console.log(i);
        //   toastr.error("Two metric names cannot be same");
        //   validation_success = false;
        //   // break;
        // }
      }
      if(validation_success){
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
      }
    },
    finalsave() {
      Swal.fire({
          title: "Are you sure?",
          type: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Confirm!",
          allowOutsideClick: false
      }).then(result => {
          if (result.value) {
      this.spinnerOn = true;
      if(!this.is_dataset_editable){
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
          worksheet_details: this.column_details,
          })
          .then(response => {
          this.spinnerOn = false;
          if (response.data.status == "Success") {
              Swal.fire({
              title: "Data Processed Successfully",
              type: "success",
              allowOutsideClick: false,
              timer:2000,

              }).then(result_success => {
                if(result_success.value){
                  this.get_dataset_list();
                  this.show_dataset_settings = false;
                  this.$router.go();
                }
              })
              // this.get_dataset_list();
              // this.show_dataset_settings = false;
              // this.$router.go()
          } else {
              Swal.fire({
              title: "Some Error Occurred, Please Try Again!",
              type: "error",
              timer:2500,
              });
          }
          // console.log(response);
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
      } else {
          // var worksheet_details = this.column_details;
          // var column_rename_map = this.newcolumns;
          // var metrics = this.metricsdata
          // console.log(this.column_details)
          var worksheet_details = {};
          worksheet_details.column_details = this.column_details;
          worksheet_details.column_rename_map = this.newcolumns;
          worksheet_details.metrics = this.metricsdata;
          axios
          .post(api_calls.bi_data_sheet_details(), {
          company_name: this.$session.get("UserInformation").company_name,
          company_id: this.$session.get("UserInformation").company_id,
          email: this.$session.get("UserInformation").email,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens,
          dataset_name: this.dataset_name,
          worksheet_details: worksheet_details,
          old_worksheet_details: this.old_worksheet_details
          })
          .then(response => {
          this.spinnerOn = false;
          if(response.data.message === "WORKSHEET DETAILS UPDATED"){
            Swal.fire({
              title: "Data Updated Successfully",
              type: "success",
              allowOutsideClick: false
              }).then(result_success => {
                if(result_success.value){
                  this.get_dataset_list();
                  this.show_dataset_settings = false;
                  this.$router.go()
                }
              })
          } else {
              Swal.fire({
              title: "Some Error Occurred, Please Try Again!",
              type: "error",
              timer:2500,
              });
          }
          }).catch(err => {
          this.spinnerOn = false;
          Swal.fire({
              title: "Some Error Occurred, Please Try Again!",
              type: "error",
              timer:2500,
          });
          console.log(err);
          });
        }
          }
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
          // console.log(fd);
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
              // console.log(err,"wEeeee");
          });
      };
    },
    save_column_data(){ 
      // console.log(this.newcolumnscomplete);
      // for (let i = 0; i < this.newcolumnscomplete.length; i++){
      //   // console.log(this.newcolumnscomplete[i].synonyms)
      //   if(this.newcolumnscomplete[i].synonyms != "" || this.newcolumnscomplete[i].synonyms.split(' ').join('') != "" ||this.newcolumnscomplete[i].synonyms != undefined ){
      //     console.log(this.newcolumnscomplete[i].synonyms)
      //   }
      // }
      Swal.fire({
          title: "Are you sure?",
          text: " You want to add these worksheet details?",
          type: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Confirm!"
      })
      .then(result => {
        if(result.value) {
          var array = {}; 
          var worksheet_details = {};
          for(let i = 0; i < this.newcolumnscomplete.length; i++){
          var temp = this.newcolumnscomplete[i];
          // console.log(temp);
          ((temp.aggregation === "None")? temp.aggregation = null : temp.aggregation = temp.aggregation)
          if (temp.synonyms !== undefined) {
            temp.synonyms = temp.synonyms.replace(/,/g, '>>');
          }
          worksheet_details[temp.newname] = {
              "datatype": `${temp.data_type}`,
              "column_type": `${temp.column_type}`,
              "additive": temp.additive,
              "aggregation": temp.aggregation,
              "hidden" : temp.hidden,
              "nlp_search_enabled": temp.nlp_search_enabled,
              "index_type": `${temp.index_type}`,
              "synonyms": `${temp.synonyms}`,
              "entity_category":`${temp.entity_category}`,
              "currency_format":temp.currency_format
            }
          if (temp.synonyms !== undefined) {
            temp.synonyms = temp.synonyms.replace(/>> /g, ',');
          }
          ((temp.aggregation === null)? temp.aggregation = "None" : temp.aggregation = temp.aggregation)
          }
          // console.log(worksheet_details);
          this.column_details = Object.assign(worksheet_details);
          // console.log(this.column_details);
        }
      });
      // console.log(worksheet_details);
    },
    get_dataset_list(){
      this.spinnerOn = true;
      axios
      .get(api_calls.bi_data_sheet_details(), {
        params : {
        email: this.$session.get("UserInformation").email,
        token: this.$session.get("UserInformation").tokens,
        company_name: this.$session.get("UserInformation").company_name,
        company_id: this.$session.get("UserInformation").company_id,
        license_key: this.$session.get("UserInformation").license_key,
        // dataset_name: "Fruithut v1",
        // dataset_name: "Drug Trial Data",
        }
      }).then(response => {
        this.spinnerOn = false;
        this.datasets = response.data.data_sources;
        for(let i = 0; i <response.data.data_sources.length; i++){
          response.data.data_sources[i].old_worksheet_details = response.data.data_sources[i].worksheet_details;
        }
      }).catch(err => {
        this.spinnerOn = false;
        toastr.error("Some Error Occurred, Please Try Again");
      })
    },
    format_date(date){
      // return moment(date).format("YYYY MMMM DD")
      return moment(date).format("dddd, MMMM Do YYYY")
    },
    open_currency_format_modal(index){
      if(this.newcolumnscomplete[index].currency_format === null){
        this.currency_format_modal = "None";
        this.current_column_index = index;
      } else {
        this.current_column_index = index;
        this.currency_format_modal = "Specific";
        this.country_iso_code = this.newcolumnscomplete[index].currency_format;
      }
      $("#currencyFormatModal").modal("show")
    },
    change_currency_format(operation){
      if( operation === 'close') {
        $("#currencyFormatModal").modal("hide");
        this.country_iso_code = null;
      } 
      if(operation === 'save'){
        if(this.currency_format_modal === "None"){
          this.newcolumnscomplete[this.current_column_index].currency_format = null;
          this.current_column_index = null;
          $("#currencyFormatModal").modal("hide");
          this.country_iso_code = null;
        }
        else {
          if(this.country_iso_code === null){
            toastr.error("Please Select an ISO Code")
          } else {
            this.newcolumnscomplete[this.current_column_index].currency_format = this.country_iso_code;
            this.current_column_index = null;
            $("#currencyFormatModal").modal("hide");
            this.country_iso_code = null;
          }
        }

      }
    },
    open_settings_for_database_dataset(index){
      this.show_dataset_settings = false;
      this.show_database_dataset_settings = true;
    },
    open_database_dataset_modal(database){
      this.show_database_dataset_settings_details = false;
      if(database === 'postgres'){
        this.current_dataset_database_icon = this.postgres_icon_path
      }
      if(database === 'mysql'){
        this.current_dataset_database_icon = this.mysql_icon_path
      }

      this.database_dataset_id = this.generateUUID()
      this.show_database_dataset_settings_details = true;
    },
    add_dataset_details(){
      event.preventDefault();
      swal.fire({
        title: "Are you sure?",
        text: 'You want to integrate with this Database?',
        type: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Confirm!",
        allowOutsideClick: false
      })
      .then(result => {
        if (result.value) {
          this.spinnerOn = true;
          axios.post(api_calls.bi_db_integration(),{
            email: this.$session.get("UserInformation").email,
            token: this.$session.get("UserInformation").tokens,
            company_name: this.$session.get("UserInformation").company_name,
            company_id: this.$session.get("UserInformation").company_id,
            license_key: this.$session.get("UserInformation").license_key,
            rdbms_name: 'postgresql',
            dataset_id: this.database_dataset_id,
            dataset_name: this.database_dataset_name,
            schema_name: this.database_schema_name,
            jdbc_connection_string: this.database_jdbc_connection_string,
            username: this.database_username,
            password: this.database_password
          }).then(response =>{
            this.spinnerOn = false;
            if (response.data.message === 'DB INTEGRATION DETAILS SAVED'){
              Swal.fire({
              title: "DB Integration Successful",
              type: "success",
              allowOutsideClick: false
              }).then(result_success => {
                if(result_success.value){
                  this.get_dataset_list();
                  this.show_database_dataset_settings = false;
                  this.$router.go()
                }
              });
            } else {
              Swal.fire({
                title: "Some Error Occurred, Please Try Again!",
                type: "error",
                timer:2500,
              });
            }
            // console.log(response)
          }).catch(error => {
            this.spinnerOn = false;
            // toastr.error("Some Error Occurred. Please Try Again")
            Swal.fire({
              title: "Some Error Occurred, Please Try Again!",
              type: "error",
              timer:2500,
            });
          });
        }
      });
    }
  },
  watch: {
    show_dataset_settings(newVal, oldVal){
      if (newVal) {
        // console.log('kjhgvfcdxd');
      }
      else {
        this.columns = [];
        this.metrics = [];
        this.file_label = "Choose file";
        this.is_file_uploaded = false;
        this.newcolumns = [];
        this.iscolumnsnamechanged = false;
        this.object_name = "";
        this.metricsdata = [];
        this.ismetricssaved = false;
        this.dataset_name = "";
        this.file = null;
        this.newcolumnscomplete = [];
        this.column_details = {};
        this.is_dataset_editable = false;
      }
    },
    currency_format_modal(newVal, oldVal){
      if(newVal === "None") {
        this.is_country_codes_dropdown_disabled = true
        this.country_iso_code = null
      }
      if(newVal === "Specific") {
        this.is_country_codes_dropdown_disabled = false
      }
    },
    database_dataset_connection_type(newVal, oldVal){
      if (newVal === 'JDBC'){
        this.database_host = null;
        this.database_port = null;
        this.database_db_name = null;
      }
      if (newVal === 'host_port'){
        this.database_jdbc_connection_string = null;
      }
    },
    show_database_dataset_settings_details(newVal, oldVal){
      if (newVal === false){
        this.database_dataset_name = null;
        this.database_schema_name = null;
        this.database_username = null;
        this.database_password = null;
        this.database_jdbc_connection_string = null;
        this.database_host = null;
        this.database_port = null;
        this.database_db_name = null;
      }

    }
  },
}
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
  margin-left: 0 !important;
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
.multiselect.country{
  width: 60% !important;
  margin-left: 6%;
}
.table tbody td{
  background: #F7F8FB;
  border-color: #DBE2E8;
  border-width: 1px;
  font-size: 14px;
  color: #9499AE;
  font-weight: 400;
  border-top: 1px solid #dee2e6;
  border-left: solid 1px #DBE2E8;
}
.table-scroll {
  position: relative;
  width:100%;
  z-index: 1;
  overflow: auto !important;
  height: 480px;
}
#worksheet_details {
  width: 100%;
  min-width: 1500px;
  margin: auto;
  border-collapse: separate;
  border-spacing: 0;
}

/* .table-wrap {
  position: relative;
} */
/* #worksheet_details th,
#worksheet_details td {
  padding: 5px 10px;
  border: 1px solid #000;
  background: #fff;
  vertical-align: top;
} */
.table-scroll tbody {
  overflow-y: scroll;
}
.table-scroll thead th {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 9999999;
  background-color: #d7ddea;
}
#table-scroll::-webkit-scrollbar {
    max-height: 10px;
    width: 7px;
    height: 7px;
    border-radius: 10px;
    overflow-x: hidden;
}
#table-scroll::-webkit-scrollbar {
    max-height: 10px;
    width: 7px;
    height: 7px;
    border-radius: 10px;
    overflow-x: hidden;
}
#table-scroll::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}
#table-scroll::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 10px;
}
#table-scroll::-webkit-scrollbar-thumb:hover {
    background: #555;
    border-radius: 10px;
}
/*
.table-scroll tfoot,
.table-scroll tfoot th,
.table-scroll tfoot td {
  position: -webkit-sticky;
  position: sticky;
  bottom: 0;
  background: #666;
  color: #fff;
  z-index:4;
}

.table-scroll th:first-child {
  position: -webkit-sticky;
  position: sticky;
  left: 0;
  z-index: 2;
  background: #ccc;
}
.table-scroll thead th:first-child,
.table-scroll tfoot th:first-child {
  z-index: 5;
} */

.shadow {
  cursor: pointer;
  -webkit-box-shadow: 3px 3px 5px 6px #ccc;  /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */
  -moz-box-shadow:    3px 3px 5px 6px #ccc;  /* Firefox 3.5 - 3.6 */
  box-shadow:         3px 3px 5px 6px #ccc;  /* Opera 10.5, IE 9, Firefox 4+, Chrome 6+, iOS 5 */
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.45s ease-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}


</style>