<template>
  <div>
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <div class="dash-cont">
      <div class="container-fluid">
        <div class="card dash-card">
          <div class="card-header d-block d-sm-flex flex-wrap justify-content-between">
            <h4 class="mb-sm-0">Tickets</h4>
            <div class="card-act d-flex flex-wrap" style="margin-left:-10%">
              <div class="form-group" style="width:15%;margin-left:auto">
                <input
                  class="form-control"
                  style="height: 34px;"
                  placeholder="From Date"
                  type="text"
                  id="from_datepicker"
                  v-model="from_date.string_value"
                  autocomplete="off"
                />
              </div>
              <div class="form-group" style="width:15%">
                <input
                  class="form-control"
                  id="to_datepicker"
                  style="height: 34px;"
                  type="text"
                  placeholder="To Date"
                  v-model="to_date.string_value"
                  autocomplete="off"
                />
              </div>
              <div class="form-group">
                <select
                  @change="ticket_status"
                  v-model="sort_status"
                  class="form-control"
                  style="height: 34px;"
                  id="select_status"
                >
                  <option value>Sort by Status</option>
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                  <option value="In Progress">In Progress</option>
                </select>
              </div>

              <div class="form-group">
                <select
                  @change="ticket_status"
                  class="form-control"
                  style="height: 34px;"
                  v-model="selected_user"
                  id="select_created_by"
                >
                  <option value>Created By</option>
                  <option v-for="(user,index) in created_by_users" :key="index">{{user}}</option>
                </select>
              </div>
              <a
                href="#"
                class="darkblue-btn"
                data-toggle="modal"
                data-target="#ticketmodal"
                style="height: 33px;"
                id="add_ticket_btn"
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
                Add Ticket
              </a>
              <a
                href="#"
                class="red-btn"
                style="height: 34px;"
                v-show="user_role=='SuperAdmin'"
                @click="delete_selected"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                  <path
                    id="trash-can-outline"
                    d="M8.375,3v.778H4V5.333h.875V15.444A1.661,1.661,0,0,0,6.625,17h8.75a1.661,1.661,0,0,0,1.75-1.556V5.333H18V3.778H13.625V3H8.375M6.625,5.333h8.75V15.444H6.625V5.333m1.75,1.556v7h1.75v-7H8.375m3.5,0v7h1.75v-7Z"
                    transform="translate(-4 -3)"
                    fill="#fff"
                  />
                </svg>
                Delete
              </a>
            </div>
          </div>
          <div class="card-body">
            <div class="table-box">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col" v-show="user_role=='SuperAdmin'">
                        <div class="form-check checkbox checkbox-success">
                          <label class="form-check-label">
                            <input
                              class="form-check-input"
                              @change="selected_tickets('all')"
                              id="selectall"
                              type="checkbox"
                            />
                            <span class="icn"></span>
                          </label>
                        </div>
                      </th>
                      <th scope="col" style="width: 5%;">ACTION</th>
                      <th scope="col" style="width: 14%;">TICKET NUMBER</th>
                      <th scope="col" style="width:11%;">TICKET DATE</th>
                      <th scope="col" style="width: 11%;">CREATED BY</th>
                      <th scope="col">TICKET DESCRIPTION</th>
                      <th scope="col" style="width: 14%;">UPLOADED FILES</th>
                      <th scope="col" style="width: 13%;">TICKET STATUS</th>
                      <th scope="col" v-show="user_role=='SuperAdmin'">TICKET PROGRESS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(ticket, index) in tickets_list" :key="index">
                      <th scope="row" v-show="user_role=='SuperAdmin'">
                        <div class="form-check checkbox checkbox-success">
                          <label class="form-check-label">
                            <input
                              class="form-check-input"
                              @change="selected_tickets(index)"
                              type="checkbox"
                            />
                            <span class="icn"></span>
                          </label>
                        </div>
                      </th>
                      <td class="action">
                        <a href="#" @click="ticket_edit(index)">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15.392"
                            height="15.392"
                            viewBox="0 0 15.392 15.392"
                            data-toggle="modal"
                            data-target="#ticketmodal"
                            id="edit_history_icn"
                          >
                            <path
                              id="square-edit-outline"
                              d="M4.71,3A1.7,1.7,0,0,0,3,4.71V16.682a1.71,1.71,0,0,0,1.71,1.71H16.682a1.71,1.71,0,0,0,1.71-1.71V10.7h-1.71v5.986H4.71V4.71H10.7V3H4.71m10.928.855a.591.591,0,0,0-.41.171L14.185,5.061,16.322,7.2l1.043-1.035a.578.578,0,0,0,0-.812L16.04,4.026a.571.571,0,0,0-.4-.171M13.578,5.668l-6.3,6.311v2.138H9.413l6.3-6.311Z"
                              transform="translate(-3 -3)"
                              fill="#9499ae"
                            />
                          </svg>
                        </a>
                        <a href="#" @click="ticket_history(index)">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="24"
                            viewBox="0 0 24 24"
                            data-toggle="modal"
                            data-target="#tickethistorymodel"
                            id="ticket_history_id"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"
                            />
                          </svg>
                        </a>
                      </td>
                      <td>{{ticket.Number}}</td>
                      <td>{{ticket.CreatedDate}}</td>
                      <td>{{ticket.CreatedBy}}</td>
                      <td
                        data-toggle="tooltip"
                        data-placement="bottom"
                        :title="ticket.Description[0]"
                      >{{ticket.Description[0]}}</td>
                      <td>
                        <a
                          :href="ticket.Fileurl[0]"
                          v-show="ticket.Fileurl[0]!=='null'"
                        >Download File</a>
                        <span v-show="ticket.Fileurl[0]==='null'">No File Attached</span>
                      </td>
                      <td>{{ticket.Status}}</td>
                      <td v-show="user_role=='SuperAdmin'">
                        <div class="form-group">
                          <select
                            @change="ticket_progress_changed(index)"
                            class="form-control"
                            style="padding-left: 2%;"
                          >
                            <option value>Select a value</option>
                            <option value="Open">Open</option>
                            <option value="Closed">Closed</option>
                            <option value="In Progress">In Progress</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div
          class="modal fade dash-modal"
          id="ticketmodal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="ticketmodalTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <div class="modal-head d-flex align-items-center">
                  <div class="head-icn">
                    <img src="/img/msg-blue.png" alt />
                  </div>
                  <h3 v-show="!isEdit">Add Ticket</h3>
                  <h3 v-show="isEdit">Edit Ticket</h3>
                </div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <img src="/img/close-icn.png" alt />
                </button>
                <form @submit="ticket_submit">
                  <div class="form-group" v-show="isEdit">
                    <label>Ticket Number</label>
                    <input
                      disabled
                      v-model="var_ticket_number"
                      class="form-control"
                      placeholder="Ticket Number"
                    />
                  </div>
                  <div class="form-group">
                    <label>Select Issue</label>
                    <select v-model="issue" class="form-control" id="select_issue_ticket">
                      <option value disabled>Select an Issue</option>
                      <option value="Issue in Portal">Issue in Portal</option>
                      <option value="Issue in Mobile SDK">Issue in Mobile SDK</option>
                      <option value="Issue in Web Widget">Issue in Web Widget</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label>Enter Description</label>
                    <textarea
                      id="description_ticket"
                      v-model="issue_description"
                      class="form-control"
                      placeholder="Description"
                      rows="5"
                    ></textarea>
                  </div>
                  <div class="form-group" style="line-height:30px">
                    <label>Upload a file</label>
                    <div class="custom-file">
                      <input
                        id="file_ticket"
                        class="custom-file-input form-control"
                        @change="fileinput"
                        type="file"
                      />
                      <label
                        style="font-weight:400"
                        class="custom-file-label form-control"
                        for="file"
                      >{{file_label}}</label>
                    </div>
                  </div>
                  <div class="btn-wrap text-right">
                    <button type="button" class="btn btn-link" data-dismiss="modal">Cancel</button>
                    <button type="submit" class="darkblue-btn" id="save_ticket">Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <!-- <div
          class="modal fade dash-modal"
          id="ticketmodal_edit"
          tabindex="-1"
          role="dialog"
          aria-labelledby="ticketmodalTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <div class="modal-head d-flex align-items-center">
                  <div class="head-icn">
                    <img src="/img/msg-blue.png" alt>
                  </div>
                  <h3>Edit Ticket</h3>
                </div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <img src="/img/close-icn.png" alt>
                </button>
                <form>
                  <div class="form-group">
                    <label>Ticket Number</label>
                    <textarea
                      disabled
                      v-model="var_ticket_number"
                      class="form-control"
                      placeholder="Ticket Number"
                      rows="1"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label>Select Issue</label>
                    <select v-model="issue" disabled class="form-control">
                      <option value disabled>Select an Issue</option>
                      <option value="Issue in Portal">Issue in Portal</option>
                      <option value="Issue in Mobile SDK">Issue in Mobile SDK</option>
                      <option value="Issue in Web Widget">Issue in Web Widget</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label>Enter Description</label>
                    <textarea
                      v-model="edit_issue_description"
                      class="form-control"
                      placeholder="Description"
                      rows="5"
                    ></textarea>
                  </div>

                  <div class="form-group">
                    <label>Upload a file</label>
                    <div class="custom-file">
                      <input
                        id="edit_file_ticket"
                        class="custom-file-input form-control"
                        @change="edit_fileinput"
                        type="file"
                      >
                      <label
                        style="font-weight:400"
                        class="custom-file-label form-control"
                        for="file"
                      >{{edit_file_label}}</label>
                    </div>
                  </div>
                  <div class="btn-wrap text-right">
                    <button type="button" class="btn btn-link" data-dismiss="modal">Cancel</button>
                    <button type="submit" class="darkblue-btn">Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>-->

        <div
          class="modal fade dash-modal"
          id="tickethistorymodel"
          tabindex="-1"
          role="dialog"
          aria-labelledby="chathistorymodeltitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content" style="margin-left: -220px;width: 204%;">
              <div class="modal-body" style="width: 1150px;">
                <div class="modal-head d-flex align-items-center">
                  <img class="head-icn" src="/img/user-blue.png" alt />
                  <h5>History for Ticket Number: {{hist_response_ticket_num}}</h5>
                </div>
                <div>
                  <button class="close" data-dismiss="modal" aria-label="Close" id="close_history">
                    <img src="/img/close-icn.png" alt />
                  </button>
                  <div>
                    <div class="table-box">
                      <div class="table-responsive">
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col" style="width:20%">DESCRIPTIONS</th>
                              <th scope="col" style="width:18%">DATE</th>
                              <th scope="col">ROLE</th>
                              <th scope="col" style="width:20%">USERNAME</th>
                              <th scope="col">UPLOADED FILE</th>
                            </tr>
                          </thead>

                          <tr
                            v-for="(descrip, index) in hist_response_ticket_description"
                            :key="index"
                          >
                            <td>
                              <tr>{{hist_response_ticket_description[index]}}</tr>
                            </td>
                            <td>
                              <tr
                                v-show="hist_response_ticket_date[index]!=null"
                              >{{hist_response_ticket_date[index]}}</tr>
                              <tr
                                v-show="hist_response_ticket_date[index]==null"
                              >{{hist_response_created_by}}</tr>
                            </td>
                            <td>
                              <tr>{{hist_response_ticket_role[index]}}</tr>
                            </td>
                            <td>
                              <tr>{{hist_response_ticket_email[index]}}</tr>
                            </td>
                            <td>
                              <tr>
                                <a
                                  :href="hist_response_ticket_filename[index]"
                                  v-show="hist_response_ticket_filename[index]!=='null'"
                                >Download File</a>
                                <span
                                  v-show="hist_response_ticket_filename[index]==='null'"
                                >No File Attached</span>
                              </tr>
                            </td>
                          </tr>
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
          id="name_edit"
          tabindex="-1"
          role="dialog"
          aria-labelledby="ticketmodalTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <div class="modal-head d-flex align-items-center">
                  <div class="head-icn">
                    <img src="/img/msg-blue.png" alt />
                  </div>
                  <h3>Edit Name</h3>
                </div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <img src="/img/close-icn.png" alt />
                </button>
                <form @submit="edit_profile">
                  <div class="form-group">
                    <label>First Name</label>
                    <input class="form-control" type="text" v-model="first_name" />
                  </div>
                  <div class="form-group">
                    <label>Last Name</label>
                    <input class="form-control" type="text" v-model="last_name" />
                  </div>
                  <div class="btn-wrap text-right">
                    <button type="button" class="btn btn-link" data-dismiss="modal">Cancel</button>
                    <button type="submit" class="darkblue-btn">Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="pagin-table" style="margin-top:2%;margin-bottom:4%">
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li class="page-item">
                <a class="page-link" href="#" @click="page_require(page_no-1)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8.667"
                    height="15.204"
                    viewBox="0 0 8.667 15.204"
                  >
                    <g id="arrow-point-to-left" transform="translate(105.806 15.204) rotate(180)">
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
                :class="'page-item '+pagination_class(page_number)"
                v-for="page_number in total_pages"
                :key="page_number"
              >
                <a class="page-link" href="#" @click="page_require(page_number)">{{page_number}}</a>
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
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import api_calls from "@/portal/api_calls";
import { setTimeout, setInterval } from "timers";
import Swal from "sweetalert2";
import $ from "jquery"
import 'jquery-ui/ui/widgets/datepicker.js';
import 'jquery-ui/themes/base/all.css'

export default {
  data() {
    return {
      hist_response_ticket_num: "",
      hist_response_ticket_issue: "",
      hist_response_ticket_description: [],
      hist_response_ticket_email: [],
      hist_response_ticket_role: [],
      hist_response_ticket_date: [],
      hist_response_ticket_status: "",
      hist_response_ticket_filename: [],
      hist_response_created_by: "",
      edit_issue_description: "",
      var_ticket_number: "",
      sort_status: "",
      selected_user: "",
      file_label: "Choose file",
      edit_file_label: "Choose file",
      issue: "",
      issue_description: "",
      old_file_name: "",
      edit_old_file_name: "",
      image_edit: false,
      img_file: "",
      edit_img_file: "",
      companyname: null,
      companyid: null,
      spinnerOn: false,
      page_no: 1,
      per_page: 10,
      total_pages: null,
      number_of_rows: null,
      created_by_users: [],
      tickets_list: [],
      checked_list: [],
      from_date: {
        string_value: "",
        object: null
      },
      to_date: {
        string_value: "",
        object: null
      },
      first_name: "",
      last_name: "",
      isEdit: false,
      user_role: this.$session.get("UserInformation").role
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
    axios
      .post(api_calls.get_ticket_status_url(), {
        company_name: this.companyname,
        company_id: this.companyid,
        email: this.$session.get("UserInformation").email,
        license_key: this.$session.get("UserInformation").license_key,
        token: this.$session.get("UserInformation").tokens,
        per_page: this.per_page,
        page_no: this.page_no
      },
      {
        headers: {
          Authorization: `Bearer ${this.$session.get("at")}`,
        },
      })
      .then(response => {
        if (response.data == "Internal Server Error") {
          toastr.error(
            "There was an internal server error. Please try again."
          );
        } else {
          this.number_of_rows = response.data.number_of_rows;
          this.total_pages = Math.ceil(this.number_of_rows / this.per_page);
          this.tickets_list = response.data.Tickets;
          for (var i in this.tickets_list) {
            this.tickets_list[i].short_description = this.tickets_list[
              i
            ].Description[0].slice(0, 10);
          }
        }
      });
    axios
      .post(api_calls.get_users_list(), {
        company_name: this.companyname,
        company_id: this.companyid,
        email: this.$session.get("UserInformation").email,
        license_key: this.$session.get("UserInformation").license_key,
        role: this.$session.get("UserInformation").role,
        token: this.$session.get("UserInformation").tokens,
        isShow: true
      })
      .then(response => {
        this.created_by_users = response.data;
        this.selected_user = "";
      });
  },
  mounted() {
    var vm = this;
    $("#from_datepicker").datepicker({
      dateFormat: "dd-mm-yy",
      // onClose: (dateText, inst) => {
      //   vm.from_date.object = inst;
      //   if (vm.date_condition() == true) {
      //     vm.ticket_status();
      //   } else {
      //     toastr.error("From Date should be lesser than the To Date.");
      //   }
      // },
      onSelect: function(dateText, inst) {
        vm.from_date.object = inst;
        vm.from_date.string_value = dateText;
        if (vm.date_condition() == true) {
          vm.ticket_status();
        } else {
          toastr.error("From Date should be lesser than the To Date.");
        }
      }
    });
    $("#to_datepicker").datepicker({
      dateFormat: "dd-mm-yy",
      // onClose: (dateText, inst) => {
      //   vm.to_date.object = inst;
      //   if (vm.date_condition() == true) {
      //     vm.ticket_status();
      //   } else {
      //     toastr.error("From Date should be lesser than the To Date.");
      //   }
      //   console.log('to');
      // },
      onSelect: function(dateText, inst) {
        vm.to_date.object = inst;
        vm.to_date.string_value = dateText;
        if (vm.date_condition() == true) {
          vm.ticket_status();
        } else {
          toastr.error("From Date should be lesser than the To Date.");
        }
      }
    });
    $("#ticketmodal").on("hidden.bs.modal", function(e) {
      vm.clear_fields();
    });
    $("#selectall").click(function() {
      if ($(this).is(":checked")) {
        $("input:checkbox").prop("checked", true);
      } else {
        vm.checked_list = [];
        $("input:checkbox").prop("checked", false);
      }
    });
    if (this.$route.params.raise_ticket == "True") {
      $("#ticketmodal").modal("show");
    }
  },
  methods: {
    ticket_history(index) {
      axios
        .post(api_calls.get_ticket_history(), {
          company_name: this.companyname,
          company_id: this.companyid,
          ticket_number: this.tickets_list[index].Number,
          user_role: this.$session.get("UserInformation").role,
          email: this.$session.get("UserInformation").email,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens
        },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          },
        })
        .then(response => {
          if (response.data == "Internal Server Error") {
            $("#tickethistorymodel").modal("hide");
            toastr.error(
              "There was an internal server error. Please try again later."
            );
          } else {
            this.hist_response_ticket_num = response.data.TicketNumber;
            this.hist_response_ticket_issue = response.data.TicketIssue;
            this.hist_response_ticket_date = response.data.UpdatedDate;
            this.hist_response_ticket_role = response.data.Role;
            this.hist_response_ticket_email = response.data.UpdatedBy;
            this.hist_response_ticket_status = response.data.Status;
            this.hist_response_created_by = response.data.CreatedDate;
            this.hist_response_ticket_description = response.data.Description;
            this.hist_response_ticket_filename = response.data.fileurl;
          }
        });
    },
    ticket_edit(index) {
      this.var_ticket_number = this.tickets_list[index].Number;
      this.issue_description = this.tickets_list[index].Description[0];
      this.old_file_name = this.tickets_list[index].Fileurl.slice(-1)[0].slice(
        62
      );
      this.issue = this.tickets_list[index].Issue;
      this.isEdit = true;
    },
    edit_profile() {
      if (this.first_name == "" || this.last_name == "") {
        toastr.error("Please enter all the fields.");
      } else {
        this.spinnerOn = true;
        axios
          .post(api_calls.edit_profile_url(), {
            company_id: this.$session.get("UserInformation").company_id,
            company_name: this.$session.get("UserInformation").company_name,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            first_name: this.first_name,
            last_name: this.last_name,
            country_name: this.$session.get("UserInformation").country_name,
            phone_number: this.$session.get("UserInformation").phone_no
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          })
          .then(response => {
            if (response.data == "Profile Updated") {
              toastr.success("Your profile has been updated successfully.");
              this.$session.set("UserFirstName", this.first_name);
              this.$session.set("UserLastName", this.last_name);
            }
            $("#name_edit").modal("hide");
            $("#ticketmodal").modal("show");
          });
      }
    },
    date_condition() {
      var from_object = this.from_date.object;
      var to_object = this.to_date.object;
      console.log(this.from_date);
      console.log(this.to_date);
      if (from_object !== null && to_object !== null) {
        if (to_object.currentYear > from_object.currentYear) {
          return true;
        } else if (to_object.currentYear == from_object.currentYear) {
          if (to_object.currentMonth > from_object.currentMonth) {
            return true;
          } else if (to_object.currentMonth == from_object.currentMonth) {
            if (
              Number(to_object.currentDay) >= Number(from_object.currentDay)
            ) {
              return true;
            } else return false;
          } else return false;
        } else return false;
      } else if (from_object === null && to_object === null) {
        return true;
      } else return false;
    },
    // ticket_status() {
    //   if (this.sort_status == "" && this.selected_user !== "") {
    //     console.log('1');
    //     axios
    //       .post(api_calls.get_ticket_status_url(), {
    //         from_date: null,
    //         to_date: null,
    //         status: null,
    //         sort: false,
    //         company_name: this.companyname,
    //         company_id: this.companyid,
    //         per_page: this.per_page,
    //         email: this.$session.get("UserInformation").email,
    //         license_key: this.$session.get("UserInformation").license_key,
    //         token: this.$session.get("UserInformation").tokens,
    //         user_role_email: this.selected_user
    //       })
    //       .then(response => {
    //         this.tickets_list = response.data.Tickets;
    //         this.number_of_rows = response.data.number_of_rows;
    //         this.total_pages = Math.ceil(this.number_of_rows / this.per_page);
    //         for (var i in this.tickets_list) {
    //           this.tickets_list[i].short_description = this.tickets_list[
    //             i
    //           ].Description[0].slice(0, 10);
    //         }
    //         this.spinnerOn = false;
    //       });
    //   } else if (this.sort_status !== "" && this.selected_user == "") {
    //     console.log('2');
    //     axios
    //       .post(api_calls.get_ticket_status_url(), {
    //         from_date: null,
    //         to_date: null,
    //         status: this.sort_status,
    //         sort: false,
    //         company_name: this.companyname,
    //         company_id: this.companyid,
    //         per_page: this.per_page,
    //         email: this.$session.get("UserInformation").email,
    //         license_key: this.$session.get("UserInformation").license_key,
    //         token: this.$session.get("UserInformation").tokens,
    //         user_role_email: null
    //       })
    //       .then(response => {
    //         this.tickets_list = response.data.Tickets;
    //         this.number_of_rows = response.data.number_of_rows;
    //         this.total_pages = Math.ceil(this.number_of_rows / this.per_page);
    //         for (var i in this.tickets_list) {
    //           this.tickets_list[i].short_description = this.tickets_list[
    //             i
    //           ].Description[0].slice(0, 10);
    //         }
    //         this.spinnerOn = false;
    //       });
    //   } else if (this.sort_status !== "" && this.selected_user !== "") {
    //     console.log('3');
    //     axios
    //       .post(api_calls.get_ticket_status_url(), {
    //         from_date: null,
    //         to_date: null,
    //         status: this.sort_status,
    //         sort: false,
    //         company_name: this.companyname,
    //         company_id: this.companyid,
    //         per_page: this.per_page,
    //         email: this.$session.get("UserInformation").email,
    //         license_key: this.$session.get("UserInformation").license_key,
    //         token: this.$session.get("UserInformation").tokens,
    //         user_role_email: this.selected_user
    //       })
    //       .then(response => {
    //         this.tickets_list = response.data.Tickets;
    //         this.number_of_rows = response.data.number_of_rows;
    //         this.total_pages = Math.ceil(this.number_of_rows / this.per_page);
    //         for (var i in this.tickets_list) {
    //           this.tickets_list[i].short_description = this.tickets_list[
    //             i
    //           ].Description[0].slice(0, 10);
    //         }
    //         this.spinnerOn = false;
    //       });
    //   } else if (
    //     this.date_condition() == false &&
    //     this.sort_status == "" &&
    //     this.selected_user == ""
    //   ) {
    //     console.log('4');
    //     axios
    //       .post(api_calls.get_ticket_status_url(), {
    //         company_name: this.companyname,
    //         company_id: this.companyid,
    //         email: this.$session.get("UserInformation").email,
    //         license_key: this.$session.get("UserInformation").license_key,
    //         token: this.$session.get("UserInformation").tokens,
    //         per_page: this.per_page,
    //         page_no: this.page_no
    //       })
    //       .then(response => {
    //         this.spinnerOn = false;
    //         if (response.data == "Internal Server Error") {
    //           toastr.error(
    //             "There was an internal server error. Please try again."
    //           );
    //         } else {
    //           this.number_of_rows = response.data.number_of_rows;
    //           this.total_pages = Math.ceil(this.number_of_rows / this.per_page);
    //           this.tickets_list = response.data.Tickets;
    //           for (var i in this.tickets_list) {
    //             this.tickets_list[i].short_description = this.tickets_list[
    //               i
    //             ].Description[0].slice(0, 10);
    //           }
    //         }
    //       });
    //   } else if (
    //     this.date_condition() == true &&
    //     this.sort_status == "" &&
    //     this.selected_user !== ""
    //   ) {
    //     console.log('5');
    //     var from_object = new Date(
    //       this.from_date.object.selectedYear,
    //       this.from_date.object.selectedMonth,
    //       Number(this.from_date.object.selectedDay) + 1
    //     );
    //     var to_object = new Date(
    //       this.to_date.object.selectedYear,
    //       this.to_date.object.selectedMonth,
    //       Number(this.to_date.object.selectedDay) + 1
    //     );
    //     axios
    //       .post(api_calls.get_ticket_status_url(), {
    //         from_date: from_object,
    //         to_date: to_object,
    //         status: null,
    //         sort: true,
    //         company_name: this.companyname,
    //         company_id: this.companyid,
    //         per_page: this.per_page,
    //         email: this.$session.get("UserInformation").email,
    //         license_key: this.$session.get("UserInformation").license_key,
    //         token: this.$session.get("UserInformation").tokens,
    //         user_role_email: this.selected_user
    //       })
    //       .then(response => {
    //         this.tickets_list = response.data.Tickets;
    //         this.number_of_rows = response.data.number_of_rows;
    //         this.total_pages = Math.ceil(this.number_of_rows / this.per_page);
    //         for (var i in this.tickets_list) {
    //           this.tickets_list[i].short_description = this.tickets_list[
    //             i
    //           ].Description[0].slice(0, 10);
    //         }
    //         this.spinnerOn = false;
    //       });
    //   } else if (
    //     this.date_condition() == true &&
    //     this.sort_status !== "" &&
    //     this.selected_user == ""
    //   ) {
    //     console.log('6');
    //     var from_object = new Date(
    //       this.from_date.object.selectedYear,
    //       this.from_date.object.selectedMonth,
    //       Number(this.from_date.object.selectedDay) + 1
    //     );
    //     var to_object = new Date(
    //       this.to_date.object.selectedYear,
    //       this.to_date.object.selectedMonth,
    //       Number(this.to_date.object.selectedDay) + 1
    //     );
    //     axios
    //       .post(api_calls.get_ticket_status_url(), {
    //         from_date: from_object,
    //         to_date: to_object,
    //         status: this.sort_status,
    //         sort: true,
    //         company_name: this.companyname,
    //         company_id: this.companyid,
    //         per_page: this.per_page,
    //         email: this.$session.get("UserInformation").email,
    //         license_key: this.$session.get("UserInformation").license_key,
    //         token: this.$session.get("UserInformation").tokens,
    //         user_role_email: null
    //       })
    //       .then(response => {
    //         this.tickets_list = response.data.Tickets;
    //         this.number_of_rows = response.data.number_of_rows;
    //         this.total_pages = Math.ceil(this.number_of_rows / this.per_page);
    //         for (var i in this.tickets_list) {
    //           this.tickets_list[i].short_description = this.tickets_list[
    //             i
    //           ].Description[0].slice(0, 10);
    //         }
    //         this.spinnerOn = false;
    //       });
    //   } else if (
    //     this.date_condition() == true &&
    //     this.sort_status == "" &&
    //     this.selected_user == ""
    //   ) {
    //     console.log('7');
    //     var from_object = new Date(
    //       this.from_date.object.selectedYear,
    //       this.from_date.object.selectedMonth,
    //       Number(this.from_date.object.selectedDay) + 1
    //     );
    //     var to_object = new Date(
    //       this.to_date.object.selectedYear,
    //       this.to_date.object.selectedMonth,
    //       Number(this.to_date.object.selectedDay) + 1
    //     );
    //     axios
    //       .post(api_calls.get_ticket_status_url(), {
    //         from_date: from_object,
    //         to_date: to_object,
    //         status: this.sort_status,
    //         sort: true,
    //         company_name: this.companyname,
    //         company_id: this.companyid,
    //         per_page: this.per_page,
    //         email: this.$session.get("UserInformation").email,
    //         license_key: this.$session.get("UserInformation").license_key,
    //         token: this.$session.get("UserInformation").tokens,
    //         user_role_email: this.selected_user
    //       })
    //       .then(response => {
    //         this.tickets_list = response.data.Tickets;
    //         this.number_of_rows = response.data.number_of_rows;
    //         this.total_pages = Math.ceil(this.number_of_rows / this.per_page);
    //         for (var i in this.tickets_list) {
    //           this.tickets_list[i].short_description = this.tickets_list[
    //             i
    //           ].Description[0].slice(0, 10);
    //         }
    //         this.spinnerOn = false;
    //       });
    //   }
    // },


    //harsh
    ticket_status(){
      var issort = false;
      var isselecteduser = null;
      var issortstatus = null;
      var isto_date = null;
      var isfrom_date = null;
      if(this.date_condition() == true && this.from_date.object!=null){
        issort = true;
        isfrom_date = new Date(
          this.from_date.object.selectedYear,
          this.from_date.object.selectedMonth,
          Number(this.from_date.object.selectedDay) + 1
        );
        isto_date = new Date(
          this.to_date.object.selectedYear,
          this.to_date.object.selectedMonth,
          Number(this.to_date.object.selectedDay) + 1
        );
      }
      if(this.selected_user!=""){
        isselecteduser = this.selected_user;
      }
      if(this.sort_status!=""){
        issortstatus = this.sort_status;
      }
      axios
      .post(api_calls.get_ticket_status_url(), {
        from_date: isfrom_date,
        to_date: isto_date,
        status: issortstatus,
        sort: issort,
        company_name: this.companyname,
        company_id: this.companyid,
        per_page: this.per_page,
        email: this.$session.get("UserInformation").email,
        license_key: this.$session.get("UserInformation").license_key,
        token: this.$session.get("UserInformation").tokens,
        user_role_email: isselecteduser
      },
      {
        headers: {
          Authorization: `Bearer ${this.$session.get("at")}`,
        },
      })
      .then(response => {
        this.tickets_list = response.data.Tickets;
        this.number_of_rows = response.data.number_of_rows;
        this.total_pages = Math.ceil(this.number_of_rows / this.per_page);
        for (var i in this.tickets_list) {
          this.tickets_list[i].short_description = this.tickets_list[
            i
          ].Description[0].slice(0, 10);
        }
        this.spinnerOn = false;
      });
    },
    //
    selected_tickets(index) {
      if (index == "all") {
        if (event.target.checked) {
          this.checked_list = this.tickets_list;
        } else if (!event.target.checked) {
          this.checked_list = [];
        }
      } else {
        if (event.target.checked == true) {
          let val_index = this.checked_list.indexOf(this.tickets_list[index]);
          var temp = this.tickets_list[index];
          if (val_index == -1) {
            this.checked_list.push(temp);
          }
        } else if (event.target.checked == false) {
          var selectall = document.querySelector("#selectall");
          if (selectall.checked == true) {
            selectall.checked = false;
          }
          var temp = this.checked_list.filter(tickets_list => {
            return tickets_list.tickets_list !== index;
          });
          this.checked_list = temp;
        }
      }
    },
    ticket_progress_changed(index) {
      var status = event.target.value;
      axios
        .post(api_calls.update_ticket_status_url(), {
          company_name: this.companyname,
          company_id: this.companyid,
          email: this.$session.get("UserInformation").email,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens,
          ticket_status: status,
          ticket_number: this.tickets_list[index].Number
        },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          },
        })
        .then(response => {
          if (response.data == "Query Executed Successfully") {
            toastr.success("Ticket status updated successfully");
            this.ticket_status = status;
            setTimeout(() => {
              this.$router.go();
            }, 2500);
          }
        });
    },
    delete_single(index) {
      event.preventDefault();
      var ticketlist = [];
      var imglist = [];
      ticketlist.push(this.tickets_list[index].Number);
      imglist.push(this.tickets_list[index].Fileurl);
      this.delete_ticket_api(ticketlist, imglist);
    },
    delete_selected() {
      event.preventDefault();
      var ticketlist = [];
      var imglist = [];
      for (var i in this.checked_list) {
        ticketlist.push(this.checked_list[i].Number);
        imglist.push(this.checked_list[i].Fileurl);
      }
      this.delete_ticket_api(ticketlist, imglist);
    },
    delete_ticket_api(ticketlist, imglist) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete!!"
      }).then(result => {
        if (result.value) {
          axios
            .post(api_calls.delete_ticket_url(), {
              company_name: this.companyname,
              company_id: this.companyid,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              ticket_number: ticketlist,
              image_url: imglist
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            })
            .then(response => {
              if (response.data == "Query Executed Successfully") {
                toastr.success("Ticket deleted successfully");
                setTimeout(() => {
                  this.$router.go();
                }, 2500);
              } else if (response.data == "Internal Server Error") {
                toastr.error(
                  "There was an internal server error. Please try again."
                );
                this.spinnerOn = false;
              }
            })
            .catch(e => {
              this.spinnerOn = false;
            });
        }
      });
    },
    ticket_number() {
      var random_num = Math.floor(1000000 + Math.random() * 9000000);
      var company = this.companyname.slice(0, 1).toUpperCase();
      return company + "_" + random_num;
    },
    ticket_submit() {
      event.preventDefault();
      if (this.issue == "" || this.issue_description == "") {
        toastr.error("Please describe the issue you are facing...");
      } else {
        this.spinnerOn = true;
        if (
          (this.$session.get("UserInformation").first_name != null &&
            this.$session.get("UserInformation").last_name != null) ||
          this.$session.has("UserFirstName")
        ) {
          var name;
          if (this.$session.get("UserInformation").first_name != null) {
            name =
              this.$session.get("UserInformation").first_name +
              " " +
              this.$session.get("UserInformation").last_name;
          } else if (this.$session.has("UserFirstName")) {
            name =
              this.$session.get("UserFirstName") +
              " " +
              this.$session.get("UserLastName");
          }
          axios
            .post(api_calls.add_ticket_url(), {
              username: name,
              company_name: this.companyname,
              company_id: this.companyid,
              user_role: this.$session.get("UserInformation").role,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              ticket_issue: this.issue,
              ticket_number:
                this.isEdit == true
                  ? this.var_ticket_number
                  : this.ticket_number(),
              description: this.issue_description,
              file_content: this.img_file,
              file_name:
                this.file_label == "Choose file" ? null : this.file_label,
              isEdit: this.isEdit
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            })
            .then(response => {
              if (response.data == "Query Executed Successfully") {
                if (this.isEdit) {
                  toastr.success("Your ticket has been edited successfully.");
                } else if (!this.isEdit) {
                  toastr.success("Your ticket has been added successfully.");
                }
                this.clear_fields();
                setTimeout(() => {
                  this.$router.go();
                }, 2500);
                $("#ticketmodal").modal("hide");
              } else if (response.data == "Duplicate image") {
                toastr.error(
                  "The file name already exists. Please rename your file."
                );
                $("#ticketmodal").modal("hide");
              } else if (response.data == "Internal Server Error") {
                toastr.error(
                  "There is an internal server error. Please try later."
                );
                $("#ticketmodal").modal("hide");
              }
            });
        } else {
          $("#ticketmodal").modal("hide");
          $("#name_edit").modal("show");
        }
      }
    },
    fileinput(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (this.file_label != "Choose file") {
        this.old_file_name = this.file_label;
        this.image_edit = true;
      }
      if (!files.length) return;
      this.file_label = files[0].name;
      this.createImage(files[0]);
    },
    edit_fileinput(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (this.edit_file_label != "Choose file") {
        this.edit_old_file_name = this.edit_file_label;
        alert(this.edit_old_file_name);
        this.image_edit = true;
      }
      if (!files.length) return;
      this.edit_file_label = files[0].name;
      this.createImage(files[0]);
    },
    createImage(file, type) {
      let reader = new FileReader();
      reader.onload = e => {
        this.img_file = e.target.result.split("base64,")[1];
        this.edit_img_file = e.target.result.split("base64,")[1];
      };
      reader.readAsDataURL(file);
    },
    clear_fields() {
      this.img_file = "";
      this.file_label = "Choose file";
      this.issue = "";
      this.issue_description = "";
      this.spinnerOn = false;
      this.isEdit = false;
    },
    page_require(page) {
      event.preventDefault();
      if (page == 0 || page == this.total_pages + 1) {
      } else {
        $("input:checkbox").prop("checked", false);
        this.page_no = page;
        axios
          .post(api_calls.get_ticket_status_url(), {
            company_name: this.companyname,
            email: this.$session.get("UserInformation").email,
            company_id: this.companyid,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            page_no: this.page_no,
            per_page: this.per_page
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          })
          .then(response => {
            this.tickets_list = response.data.Tickets;
            for (var i in this.tickets_list) {
              this.tickets_list[i].short_description = this.tickets_list[
                i
              ].Description[0].slice(0, 10);
            }
          });
      }
    },
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

<style scoped>
</style>

