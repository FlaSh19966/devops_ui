<template>
    <div>
        <div class="spinner" id="spinner" v-show="spinnerOn"></div>
        <div class="dash-cont">
            <div class="container-fluid">
                <div class="card dash-card">
                    <div class="card-header d-block d-sm-flex flex-wrap justify-content-between">
                      <div class="d-flex justify-content-start">
                        <h4 class="mb-sm-0">{{tlt('moniter_reports_page_title')}}</h4>
                        <div class="radio"
                          style="margin-right: 5rem; margin-top: 2px; margin-left: 10px;">
                          <label>
                            <input
                              type="radio"
                              v-model="filter_status"
                              value="company"
                              id="filter_status_success"
                            />
                            <span class="icn" id="filter_portal_user_radio"></span>
                            {{tlt('reports_all_company_label')}}
                          </label>
                          <label>
                            <input
                              type="radio"
                              v-model="filter_status"
                              value="cronjob"
                              id="filter_status_failure"
                            />
                            <span class="icn"></span> {{tlt('reports_cronjob_label')}}
                          </label>
                        </div>
                      </div>
                      <div class="card-act d-flex">
                        <input
                            class="form-control search-bar"
                            id="search_bar"
                            :placeholder="tlt('search_here')"
                            style="height: 34px;"
                            v-model.trim="search_company_details"
                        />
                        <!-- v-on:keyup="callsearch" -->
                        <a
                            type="button"
                            v-if="isVisibleSearchClear"
                            class="btn bg-transparent mb-auto py-0"
                            @click="clear_search_name"
                            style="margin-left: -40px; z-index: 10; margin-top: 5px;"
                        >
                            <img src="/img/close-icn.png" alt />
                        </a>
                        <a
                            href="javascript:void(0)"
                            class="darkblue-btn"
                            id="search_btn"
                            @click="search_monitor_reports()"
                            style="margin-right: 10px; height: 34px; margin-left: 10px;"
                        >
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            width="14"
                            height="14"
                            >
                            <path
                                d="M13.809011327100071,12.965505435601472 L9.30910012117823,8.49330664854199 C10.007392079586584,7.596111589605521 10.38512817619458,6.499157170138106 10.38512817619458,5.345374656726532 c0,-1.3810948891881802 -0.5423458634784514,-2.676086605733705 -1.523073527148749,-3.6524965835014083 c-0.9807276636702976,-0.9764099777677033 -2.287209392305289,-1.5136937750578685 -3.6751296371814526,-1.5136937750578685 s-2.6944019735111544,0.5390058607430178 -3.6751296371814526,1.5136937750578685 C0.5293349766245179,2.667565987539975 -0.011278152465820316,3.9642797675383576 -0.011278152465820316,5.345374656726532 c0,1.3793728257353273 0.5423458634784514,2.6778086691865575 1.523073527148749,3.6524965835014083 C2.492523038353222,9.974281217995648 3.7972720326001044,10.51156501528581 5.18692501186438,10.51156501528581 c1.160932040033745,0 2.2629511108717475,-0.37540983272197437 3.165705727077092,-1.0676793407689171 l4.499911205921844,4.470476723606628 a0.1420842198250257,0.14120920313395363 0 0 0 0.20099718902076805,0 l0.7554721932159904,-0.7490976019910955 a0.1420842198250257,0.14120920313395363 0 0 0 0,-0.19975936053095905 zM7.931576282630728,8.073123166045836 C7.196896902072058,8.80155600660269 6.2231001759542055,9.20279679111746 5.18692501186438,9.20279679111746 s-2.0099718902076775,-0.4012407845147706 -2.744651270766347,-1.1296736250716286 C1.709327094927478,7.342968262036121 1.3055999824978375,6.37516860153268 1.3055999824978375,5.345374656726532 s0.4037271124296458,-1.99931566876244 1.1366737586002036,-2.727748509319298 C3.1769531216567026,1.8891933068503817 4.150749847774562,1.4879525223356067 5.18692501186438,1.4879525223356067 s2.0117046245957884,0.3995187210619175 2.744651270766347,1.1296736250716286 S9.06825004123093,4.315580711920385 9.06825004123093,5.345374656726532 s-0.4037271124296458,1.99931566876244 -1.1366737586002036,2.727748509319298 z"
                                fill="#fff"
                            />
                            </svg>
                        </a>
                        <date-picker
                            class="form-group ml-0"
                            v-model="selected_date"
                            format="YYYY-MM-DD"
                            type="date"
                            @change="get_summary_report()"
                            :clearable="false"
                            :placeholder="date_formating(selected_date)"
                            style="margin-right: 10px; margin-bottom: 0px;"
                        ></date-picker>
                        <div class="form-group"
                          v-if="filter_status === 'company'"
                            style="margin-left: auto;">
                              <select
                                class="form-control"
                                v-model="show_status"
                                @change="get_summary_report()"
                                style="height: 34px; padding: 5px;"
                                id="select_status"
                              >
                                <option value="failed">{{tlt('company_model_dropdown_failed')}}</option>
                                <option value="all">{{tlt('company_model_dropdown_all_label')}}</option>
                                <option value="success">{{tlt('company_model_dropdown_success')}}</option>
                              </select>
                        </div>
                        <div class="form-group"
                          v-if="filter_status === 'cronjob'"
                            style="margin-left: auto;">
                              <select
                                class="form-control"
                                v-model="show_status"
                                @change="get_cronjob_list()"
                                style="height: 34px; padding: 5px;"
                                id="select_status"
                              >
                                <option value="failed">{{tlt('cronjob_dropdown_failed')}}</option>
                                <option value="all">{{tlt('cronjob_dropdown_all_label')}}</option>
                                <option value="success">{{tlt('cronjob_dropdown_success')}}</option>
                              </select>
                        </div>
                      </div>
                    </div>
                    <div class="card-body">
                        <div class="table-box"
                            v-show="
                                Boolean(
                                summary_list.length > 0 || summary_list.length != undefined
                                )">
                            <div class="table-responsive" 
                            >
                              <table class="table" v-if="filter_status === 'company'"
                                style="width: 100%; margin-left: auto; margin-right: auto;
                                    ">
                                <thead>
                                    <tr>
                                    <th scope="col" style="width: 10%;">#</th>
                                    <th scope="col" style="width: 25%;">{{tlt('reports_companies_th')}}</th>
                                    <th scope="col" style="width: 10%;">{{tlt('reports_total_cronjob_th')}}</th>
                                    <th scope="col" style="width: 10%;">{{tlt('reports_status_th')}}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                  <tr v-for="(summary_report,index) in summary_list"
                                      :key="index">
                                      <td class="text-center">{{index + 1}}</td>
                                      <td class="">{{summary_report.company_name}}</td>
                                      <td class="text-center">{{summary_report.total_cronjob_count}}</td>
                                      <td class="text-center"
                                          v-if="summary_report.status === 'success'">
                                          <img src="/img/pass.png" width="20px" alt="">
                                          <a
                                          class="cron-model"
                                          href="#"
                                          style="margin-left: 20px;"
                                          data-toggle="modal"
                                          data-target="#cronjobviewmodel"
                                          @click="cronjob_infomodel(index)"
                                          >{{tlt('daily_reports_view_btn')}}
                                          </a>
                                      </td>
                                      
                                      <td class="text-center" v-else>
                                          <img src="/img/fail.png" width="20px" alt=""/>
                                          <a
                                          class="cron-model"
                                          href="#"
                                          style="margin-left: 20px;"
                                          data-toggle="modal"
                                          data-target="#cronjobviewmodel"
                                          @click="cronjob_infomodel(index)"
                                          >{{tlt('daily_reports_view_btn')}}
                                          </a>
                                      </td>
                                  </tr>
                                </tbody>
                              </table>
                                <!-- CRONJOB TABLE -->
                              <table class="table" v-if="filter_status === 'cronjob'"
                                style="width: 100%; margin-left: auto; margin-right: auto;
                                    ">
                                <thead>
                                    <tr>
                                      <th scope="col" style="width: 10%;">#</th>
                                      <th scope="col" style="width: 50%;">{{tlt('cronjob_name_th')}}</th>
                                      <th scope="col">{{tlt('cronjob_status_th')}}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                  <tr v-for="(crons,index1) in summary_list"
                                      :key="index1">
                                      <td class="text-center">{{index1 + 1}}</td>
                                      <td class="">{{crons.cronjob_name}}</td>
                                      <td class="text-center"
                                          v-if="crons.status === 'success'">
                                          <img src="/img/pass.png" width="20px" alt="">
                                          <a
                                          class="company-model"
                                          href="#"
                                          style="margin-left: 20px;"
                                          data-toggle="modal"
                                          data-target="#companyviewmodel"
                                          @click="company_infomodel(index1)"
                                          >{{tlt('daily_reports_view_btn')}}
                                          </a>
                                      </td>
                                      
                                      <td class="text-center" v-else>
                                          <img src="/img/fail.png" width="20px" alt=""/>
                                          <a
                                          class="company-model"
                                          href="#"
                                          style="margin-left: 20px;"
                                          data-toggle="modal"
                                          data-target="#companyviewmodel"
                                          @click="company_infomodel(index1)"
                                          >{{tlt('daily_reports_view_btn')}}
                                          </a>
                                      </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div v-show="Boolean(summary_list.length === 0) && !spinnerOn">
                                <p class="text-center">
                                    <strong>
                                    {{tlt('reports_no_cronjob_data_label')}}.</strong
                                    >
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pagin-table" style="margin-top:2%;margin-bottom:4%">
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                    <li class="page-item">
                        <a
                        class="page-link"
                        href="#"
                        @click="page_require(page_no - 1)"
                        >
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
                        :class="'page-item ' + pagination_class(pageno)"
                        v-for="pageno in page_array"
                        :key="pageno"
                    >
                        <a
                        v-if="pageno == '...s' || pageno == '...l'"
                        class="page-link"
                        href="#"
                        @click="page_require(pageno)"
                        >...</a
                        >
                        <a 
                        v-if="pageno != '...s' && pageno != '...l'"
                        class="page-link" 
                        href="#" 
                        @click="page_require(pageno)"
                        >{{ pageno }}</a>
                    </li>
                    <li class="page-item">
                        <a
                        class="page-link"
                        href="#"
                        @click="page_require(page_no + 1)"
                        >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="8.667"
                            height="15.204"
                            viewBox="0 0 8.667 15.204"
                        >
                            <g
                            id="arrow-point-to-right"
                            transform="translate(-97.139 0)"
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
                    </ul>
                </nav>
                </div>
            </div>
        </div>
        <div
            id="cronjobviewmodel"
            class="modal fade dash-modal"
            role="dialog"
            data-backdrop="static"
            data-keyboard="false"
        >
            <div class="modal-dialog modal-lg">
                <!-- Modal content-->
                <div class="modal-content" style="width: 177%; margin-left: -34%">
                    <div
                        class="modal-header"
                        style="width: 1054px; padding: 20px;"
                    >
                    <div style="display: flex;">
                        <h5 style="margin-bottom: 0px; font-weight: 500;">{{tlt('company_model_c_name_label')}}:</h5>
                    <p
                        v-if="name_of_company != ''"
                        class="company_in_model"
                    >
                        {{ name_of_company }}
                    </p>
                    </div>
                    <button
                        type="button"
                        class="close"
                        style="top: 20px;"
                        id="btn-close-comment"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <img src="/img/close-icn.png" alt />
                    </button>    
                    </div>
                    <div class="modal-body py-2 px-3" style="width: 1054px">
                    <table class="table">
                    <thead class="company-wise-th">
                        <tr>
                        <th scope="col" class="theading">#</th>
                        <th scope="col" class="theading" style="width: 20%;">{{tlt('company_model_cronjob_name_th')}}</th>
                        <th scope="col" class="theading">{{tlt('company_model_status_th')}}</th>
                        <th scope="col" class="theading" style="">{{tlt('company_model_exception_th')}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(cronjob, index1) in cronjob_list"
                            :key="index1">
                            <td>{{index1+1}}</td>
                            {{cronjob.total_cronjob}}
                            <td>{{cronjob.cron_name}}</td>
                            <td 
                              :style="cronjob.cron_status == 'success'? 'color: green;':'color: red;'
                              ">{{cronjob.cron_status}}</td>
                            <td>{{cronjob.cron_exception}}</td>
                        </tr>
                    </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
        <div
            id="companyviewmodel"
            class="modal fade dash-modal"
            role="dialog"
            data-backdrop="static"
            data-keyboard="false"
        >
            <div class="modal-dialog modal-lg">
                <!-- Modal content-->
                <div class="modal-content" style="width: 177%; margin-left: -34%">
                    <div
                        class="modal-header"
                        style="width: 1054px; padding: 20px;"
                    >
                    <div style="display: flex;">
                        <h5 style="margin-bottom: 0px; font-weight: 500;">{{tlt('cronjob_model_cronjob_name_label')}}:</h5>
                    <p
                        v-if="cronjob_name != ''"
                        class="company_in_model"
                    >
                        {{ cronjob_name }}
                    </p>
                    </div>
                    <button
                        type="button"
                        class="close"
                        style="top: 20px;"
                        id="btn-close-comment"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <img src="/img/close-icn.png" alt />
                    </button>    
                    </div>
                    <div class="modal-body py-2 px-3" style="width: 1054px">
                    <table class="table">
                    <thead class="company-wise-th">
                        <tr>
                        <th scope="col" class="theading">#</th>
                        <th scope="col" class="theading" style="width: 20%;">{{tlt('cronjob_model_company_name_th')}}</th>
                        <th scope="col" class="theading">{{tlt('cronjob_model_status_th')}}</th>
                        <th scope="col" class="theading" style="">{{tlt('cronjob_model_exception_th')}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(company, index2) in crons_company_list" 
                        :key="index2">
                            <td>{{index2+1}}</td>
                            <td>{{company.company_name}}</td>
                            <td 
                              :style="company.status == 'success'? 'color: green;':'color: red;'
                              ">{{company.status}}</td>
                            <td>{{company.exception}}</td>
                        </tr>
                    </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import api_calls from "@/portal/api_calls";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import Swal from "sweetalert2";
import moment from "moment";

export default {
  components:{
      DatePicker
  },
  data(){
      return{
      companyname: null,
      companyid: null,
      spinnerOn: false,
      page_no: 1,
      per_page: 10,
      page_array: [],
      total_pages: null,
      number_of_rows: null,
      summary_list: [],
      cronjob_list: [],
      cron_name_list: [],
      summary_date: "",
      name_of_company: "",
      cronjob_name: "",
      current_selected_date: "",
      selected_date : new Date().toISOString(),
      search_company_details: "",
      isVisibleSearchClear: false,
      show_status: "all",
      filter_status: "company",
      is_level_status: null,
      crons_company_list: [],
      }
  },
  watch: {
    search_company_details() {
      if (this.search_company_details === "") {
        this.get_summary_report();
        this.isVisibleSearchClear = false;
      } else if (this.search_company_details !== "") {
        this.isVisibleSearchClear = true;
      }
    },
    filter_status(){
      this.search_company_details = "";
      if(this.filter_status ===  'company'){
        this.get_summary_report();  
      }else{
        this.get_cronjob_list();
      }
    },
  },
  created() {
  if (
      !this.$session.has("CompanyId") &&
      this.$session.get("UserInformation").role == "SuperAdmin"
  ) {
      toastr.warning(this.tlt('select_company_name_msg'));
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
      this.get_summary_report();
  },

  methods:{
    date_formating(curr_date) {
        return moment(curr_date).format("YYYY-MM-DD");
    },
    clear_search_name() {
    this.search_company_details = "";
    },
    get_summary_report(){
        if (this.show_status != "") {
        this.is_level_status = this.show_status;
        }
        this.summary_list = [];
        this.current_selected_date = this.date_formating(this.selected_date);
        this.page_no = 1;
        this.spinnerOn = true;
        axios
            .post(
            api_calls.cronjob_summary(),
            {
                summary_date: this.current_selected_date !== ''? this.current_selected_date : selected_date,
                license_key: this.$session.get("UserInformation").license_key,
                level: this.filter_status,
                filter:this.is_level_status,
                is_search: true,
                search: this.search_company_details,
                page_no: 1,
                per_page: this.per_page,
            },
            {
                headers: {
                    Authorization: `Bearer ${this.$session.get("at")}`
                }
            }
            )
            .then(response => {
            this.spinnerOn = false;
            // changes in api response handling(msg_code added in condition)
              if (this.api_status_code.DATA_AVAILABLE.MSG_CODE == response.data.message.MSG_CODE) {
                  this.number_of_rows = response.data.pagination.total_data;
                  this.total_pages = response.data.pagination.total_page;
                  this.summary_list = response.data.data.summary;
                  this.page_no = 1;
              } else if(this.api_status_code.NO_DATA_AVAILABLE.MSG_CODE == response.data.message.MSG_CODE){
                  Swal({
                      text: this.tlt('daily_report_no_data_available'),
                      toast: true,
                      position: "top-end",
                      type: "info",
                      showConfirmButton: false,
                      timer: 2500,
                  });
              } 
              else if(this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE == response.data.message.MSG_CODE){
                  Swal({
                  type: "error",
                  text: this.tlt('daily_report_internal_server_error_msg1'),
                  timer: 2500
                  });
              } else {
                  Swal({
                    title: response.data.message.MSG_CODE,
                    text: response.data.message.MSG,
                    showCancelButton: false,
                    showConfirmButton: false,
                    type: "error"
                  })
                }
              this.setpagination(this.page_no);
            })
            .catch(e => {
            this.spinnerOn = false;
            console.log(e);
            if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
            ) {
                Swal({
                type: "error",
                text: this.tlt('daily_report_internal_server_error_msg2'),
                timer: 2500
            });
            }
        });
    },
    get_cronjob_list(){
      if (this.show_status != "") {
      this.is_level_status = this.show_status;
      }
      this.summary_list = [];
      this.current_selected_date = this.date_formating(this.selected_date);
      this.page_no = 1;
      this.spinnerOn = true;
      axios
          .post(
          api_calls.cronjob_summary(),
          {
              summary_date: this.current_selected_date !== ''? this.current_selected_date : selected_date,
              level: this.filter_status,
              filter: this.is_level_status,
              is_search: true,
              search: this.search_company_details,
              page_no: 1,
              per_page: this.per_page,
          },
          {
              headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`
              }
          }
          )
          .then(response => {
          this.spinnerOn = false;
            // changes in api response handling(msg_code added in condition)
            if (this.api_status_code.DATA_AVAILABLE.MSG_CODE == response.data.message.MSG_CODE) {
                this.number_of_rows = response.data.pagination.total_data;
                this.total_pages = response.data.pagination.total_page;
                this.summary_list = response.data.data.summary;
                for(let i=0;i<this.summary_list.length; i++){
                  this.crons_company_list = this.summary_list[i].cron_info;
                }
                this.page_no = 1;
            } else if(this.api_status_code.NO_DATA_AVAILABLE.MSG_CODE == response.data.message.MSG_CODE){
                Swal({
                    text: this.tlt('daily_report_no_data_available2'),
                    toast: true,
                    position: "top-end",
                    type: "info",
                    showConfirmButton: false,
                    timer: 2500,
                });
            } else if(this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE == response.data.message.MSG_CODE){
                Swal({
                type: "error",
                text: this.tlt('daily_report_internal_server_error_msg3'),
                timer: 2500
                });
            } else {
                Swal({
                  title: response.data.message.MSG_CODE,
                  text: response.data.message.MSG,
                  showCancelButton: false,
                  showConfirmButton: false,
                  type: "error"
                })
              }
            this.setpagination(this.page_no);
          })
          .catch(e => {
          this.spinnerOn = false;
          if (
          e.response.status === 410 ||
          e.response.status === 440 ||
          e.response.status === 409
          ) {
              Swal({
              type: "error",
              text: this.tlt('daily_report_internal_server_error_msg4'),
              timer: 2500
          });
          }
      });
    },
    cronjob_infomodel(index){
      this.cronjob_list = [];
      this.cronjob_list = Boolean(this.summary_list[index].cron_info)
      ? this.summary_list[index].cron_info
      : [];

      this.name_of_company = this.summary_list[index].company_name;
    },
    company_infomodel(index1){
      this.crons_company_list = [];
      this.crons_company_list = Boolean(this.summary_list[index1].cron_info)
      ? this.summary_list[index1].cron_info
      : [];

      this.cronjob_name = this.summary_list[index1].cronjob_name;
    },
    // callsearch() {
    // if (event.keyCode === 13) {
    //   if(this.filter_status === 'company'){
    //     this.search_monitor_reports();
    //     }
    //   }else{
    //     this.search_monitor_reports();
    //   }
    // },
    search_monitor_reports() {
      if (this.search_company_details != "") {
        this.spinnerOn = true;
        axios
        .post(
            api_calls.cronjob_summary(),
            {
            is_search: true,
            search: this.search_company_details,
            summary_date: this.current_selected_date !== ''? this.current_selected_date : selected_date,
            level: this.filter_status,
            filter: this.is_level_status,
            page_no: 1,
            per_page: this.per_page
            },
            {
            headers: {
                Authorization: `Bearer ${this.$session.get("at")}`
            }
            }
        )
        .then(response => {
            this.spinnerOn = false;
            // changes in api response handling(msg_code added in condition)
            if (this.api_status_code.DATA_AVAILABLE.MSG_CODE == response.data.message.MSG_CODE) {
                this.summary_list = [];
                this.page_no = 1;
                this.number_of_rows = response.data.pagination.total_data;
                this.total_pages = response.data.pagination.total_page;
                this.summary_list = response.data.data.summary;
                this.setpagination(this.page_no);
            } else if (this.api_status_code.NO_DATA_AVAILABLE.MSG_CODE == response.data.message.MSG_CODE) {
                Swal({
                    text: this.tlt('no_result_found_msg'),
                    toast: true,
                    position: "top-end",
                    type: "info",
                    showConfirmButton: false,
                    timer: 2000
                });
                this.summary_list = "";
            } else if (this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE == response.data.message.MSG_CODE) {
                Swal({
                    type: "error",
                    text: this.tlt('daily_report_internal_server_error_msg5'),
                    timer: 2500
                });
                this.get_summary_report();
            } else {
                Swal({
                  title: response.data.message.MSG_CODE,
                  text: response.data.message.MSG,
                  showCancelButton: false,
                  showConfirmButton: false,
                  type: "error"
                })
              }
        })
        .catch(e => {
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
      // else {
      //     Swal({
      //     text: "Please type something in the search bar",
      //     toast: true,
      //     position: "top-end",
      //     type: "warning",
      //     showConfirmButton: false,
      //     timer: 2500
      //     });
      // }
    },
    page_require(page) {
      if (page == 0 || page == this.total_pages + 1) {
      } else {
        if (this.search_company_details == "") {
          if (page == "...s") {
            this.page_no = Math.ceil((1 + this.page_no) / 2);
          } else if (page == "...l") {
            this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
          } else {
            this.page_no = page;
          }
          this.spinnerOn = true;
          axios
            .post(
              api_calls.cronjob_summary(),
              {
                summary_date: this.current_selected_date !== ''? this.current_selected_date : selected_date,
                filter: this.is_level_status,
                level: this.filter_status,
                page_no: this.page_no,
                per_page: this.per_page
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`
                }
              }
            )
            .then(response => {
              this.spinnerOn = false;
              // changes in api response handling(msg_code added in condition)
              if (this.api_status_code.DATA_AVAILABLE.MSG_CODE == response.data.message.MSG_CODE) {
                this.number_of_rows = response.data.pagination.total_data;
                this.total_pages = response.data.pagination.total_page;
                this.summary_list = response.data.data.summary;
              } else if (this.api_status_code.NO_DATA_AVAILABLE.MSG_CODE == response.data.message.MSG_CODE) {
                 Swal({
                    text: this.tlt('daily_report_no_data_available3'),
                    toast: true,
                    position: "top-end",
                    type: "info",
                    showConfirmButton: false,
                    timer: 2500,
                });
              } else {
                  Swal({
                    title: response.data.message.MSG_CODE,
                    text: response.data.message.MSG,
                    showCancelButton: false,
                    showConfirmButton: false,
                    type: "error"
                  })
                }
              this.setpagination(this.page_no);
            })
            .catch(e => {
              this.spinnerOn = false;
              if (
                e.response.status === 410 ||
                e.response.status === 440 ||
                e.response.status === 409
              ) {
                this.$root.$emit("Session_Expired", e.response.data);
              }
            });
        } else {
          this.page_no = page;
          this.spinnerOn = true;
          axios
            .post(
              api_calls.cronjob_summary(),
              {
                is_search: true,
                search: this.search_company_details,
                summary_date: this.current_selected_date !== ''? this.current_selected_date : selected_date,
                filter: this.is_level_status,
                level: this.filter_status,
                page_no: this.page_no,
                per_page: this.per_page
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`
                }
              }
            )
            .then(response => {
              this.spinnerOn = false;
              // changes in api response handling(msg_code added in condition)
              if (this.api_status_code.DATA_AVAILABLE.MSG_CODE == response.data.message.MSG_CODE) {
                this.number_of_rows = response.data.pagination.total_data;
                this.total_pages = response.data.pagination.total_page;
                this.summary_list = response.data.data.summary;  
              } else if (this.api_status_code.NO_DATA_AVAILABLE.MSG_CODE == response.data.message.MSG_CODE) {
                Swal({
                    text: this.tlt('daily_report_no_data_available4'),
                    toast: true,
                    position: "top-end",
                    type: "info",
                    showConfirmButton: false,
                    timer: 2500,
                });
              } else {
                Swal({
                  title: response.data.message.MSG_CODE,
                  text: response.data.message.MSG,
                  showCancelButton: false,
                  showConfirmButton: false,
                  type: "error"
                })
              }
              this.setpagination(this.page_no);
            })
            .catch(e => {
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
      }
    },
    setpagination(page_no) {
      this.page_array = [];
      if (this.total_pages <= 7) {
        for (let i = 0; i < this.total_pages; i++) {
          this.page_array.push(i + 1);
        }
      } else if (page_no == 1) {
        for (let i = 0; i < 4; i++) {
          this.page_array.push(i + 1);
        }
        this.page_array.push("...l");
        this.page_array.push(this.total_pages);
      } else if (page_no == this.total_pages) {
        this.page_array.push(1);
        this.page_array.push("...s");
        for (let i = this.total_pages - 4; i < this.total_pages; i++) {
          this.page_array.push(i + 1);
        }
      } else if (page_no <= 4) {
        for (let i = 0; i < page_no + 3; i++) {
          this.page_array.push(i + 1);
        }
        this.page_array.push("...l");
        this.page_array.push(this.total_pages);
      } else if (page_no >= this.total_pages - 4) {
        this.page_array.push(1);
        this.page_array.push("...s");
        for (let i = page_no - 4; i < this.total_pages; i++) {
          this.page_array.push(i + 1);
        }
      } else {
        this.page_array.push(1);
        this.page_array.push("...s");
        for (let i = page_no - 3; i <= page_no + 3; i++) {
          this.page_array.push(i);
        }
        this.page_array.push("...l");
        this.page_array.push(this.total_pages);
      }
    },
    pagination_class(index) {
      if (index == this.page_no) {
        return " active";
      } else {
        return "";
      }
    },
  }
};
</script>
<style scoped>

.dash-card .card-body.company-table{
  min-height: 50vh;
  min-width: 77vw;
  margin-left: -2rem;
  margin-top: 10px;
}
.company_in_model{
  margin-left: 8px;
  margin-bottom: 0px;
  font-size: 18px;
}
/* .body-color{
   background-color: dimgray; 
} */
.company-wise-th{
  color: #272b2f;
  background: #f7f8fb;
}
tr th.theading{
  font-weight: 500;
}
.table-box thead.head-color{
  background-color: white;
}
.btn-primaryy:visited,
.btn-primaryy:focus{
  font-weight: bold;
}
.ScrollStyle {
  min-height: 0px;
  max-height: 378px;
  /* width: 80%; */
  overflow-y: auto;
  overflow-x: hidden;
  /* border: 1px solid #e3e2e5; */
}

.ScrollStyle::-webkit-scrollbar {
  max-height: 10px;
  width: 7px;
  height: 7px;
  border-radius: 10px;
  overflow-x: hidden;
}
.ScrollStyle::-webkit-scrollbar-track {
  background: #ffffff;
  border-radius: 10px;
}
.ScrollStyle::-webkit-scrollbar-thumb {
  background: #27397b;
  border-radius: 10px;
}
.ScrollStyle::-webkit-scrollbar-thumb:hover {
  background: #19295f;
  border-radius: 10px;
}

</style>
