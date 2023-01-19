<template>
  <div>
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <div class="dash-cont">
      <div class="container-fluid">
        <div class="card dash-card">
          <div
            class="card-header d-block d-sm-flex flex-wrap justify-content-between"
          >
            <h4 class="mb-sm-0">Email List</h4>
            <div class="card-act d-flex flex-wrap">
              <input
                class="form-control search-bar"
                placeholder="Search here"
                v-model="search_name"
                v-on:keyup="callsearch"
              />
              <a href="#" class="darkblue-btn" @click="search_template">
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

              <a
                href="#"
                class="darkblue-btn"
                data-toggle="modal"
                data-target="#usermodel"
                id="add_email_btn"
                title="Add Email Template"
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
              <a
                href="#"
                class="red-btn"
                title="Delete"
                @click="delete_selected"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                >
                  <path
                    d="M8.375,3v.778H4V5.333h.875V15.444A1.661,1.661,0,0,0,6.625,17h8.75a1.661,1.661,0,0,0,1.75-1.556V5.333H18V3.778H13.625V3H8.375M6.625,5.333h8.75V15.444H6.625V5.333m1.75,1.556v7h1.75v-7H8.375m3.5,0v7h1.75v-7Z"
                    transform="translate(-4 -3)"
                    fill="#fff"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div class="card-body">
            <div class="table-box">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">
                        <div class="form-check checkbox checkbox-success">
                          <label class="form-check-label">
                            <input
                              class="form-check-input"
                              id="selectall"
                              type="checkbox"
                              @change="email_selected('all')"
                            />
                            <span class="icn" style="margin-left: 15%"></span>
                          </label>
                        </div>
                      </th>
                      <th scope="col" style="width: 2%">ACTION</th>
                      <th scope="col">INTENT NAME</th>
                      <th scope="col">TEMPLATE NAME</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, index) in list" :key="index">
                      <th scope="row">
                        <div class="checkbox checkbox-success">
                          <label class="checkbox-success">
                            <input
                              class="form-check-input checkbox-success"
                              @change="email_selected(index)"
                              type="checkbox"
                            />
                            <span
                              class="icn"
                              style="margin-top: -45%; margin-left: 15%"
                            ></span>
                          </label>
                        </div>
                      </th>
                      <td class="action">
                        <a
                          class="#"
                          @click="edit_mail(index)"
                          data-toggle="modal"
                          data-target="#usermodel"
                          style="cursor: pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15.392"
                            height="15.392"
                            viewBox="0 0 15.392 15.392"
                          >
                            <path
                              id="square-edit-outline"
                              d="M4.71,3A1.7,1.7,0,0,0,3,4.71V16.682a1.71,1.71,0,0,0,1.71,1.71H16.682a1.71,1.71,0,0,0,1.71-1.71V10.7h-1.71v5.986H4.71V4.71H10.7V3H4.71m10.928.855a.591.591,0,0,0-.41.171L14.185,5.061,16.322,7.2l1.043-1.035a.578.578,0,0,0,0-.812L16.04,4.026a.571.571,0,0,0-.4-.171M13.578,5.668l-6.3,6.311v2.138H9.413l6.3-6.311Z"
                              transform="translate(-3 -3)"
                              fill="#9499ae"
                            />
                          </svg>
                        </a>
                        <a href="#" @click="delete_single(index)">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="13.682"
                            height="15.392"
                            viewBox="0 0 13.682 15.392"
                          >
                            <path
                              d="M8.276,3v.855H4v1.71h.855V16.682a1.71,1.71,0,0,0,1.71,1.71h8.551a1.71,1.71,0,0,0,1.71-1.71V5.565h.855V3.855H13.406V3H8.276M6.565,5.565h8.551V16.682H6.565V5.565m1.71,1.71v7.7h1.71v-7.7H8.276m3.42,0v7.7h1.71v-7.7Z"
                              transform="translate(-4 -3)"
                              fill="#f23d3d"
                            />
                          </svg>
                        </a>
                      </td>
                      <td>{{ row.intent }}</td>
                      <td>{{ row.template_name }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="pagin-table">
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
                    <!-- <li class="page-item active"> -->
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
                        >{{ pageno }}</a
                      >
                      <!-- <a class="page-link" href="#" @click="page_require(pageno)">{{pageno}}</a> -->
                    </li>
                    <!-- <a class="page-link" href="#">1</a> -->
                    <!-- </li> -->
                    <li class="page-item">
                      <a class="page-link" href="#">
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
              <div
                class="modal fade dash-modal"
                id="usermodel"
                tabindex="-1"
                role="dialog"
                aria-labelledby="usermodeltitle"
                aria-hidden="true"
                data-backdrop="static"
              >
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-body">
                      <div class="modal-head d-flex align-items-center">
                        <div class="head-icn">
                          <img src="/img/user-blue.png" alt />
                        </div>
                        <h3>Add Email Template</h3>
                      </div>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        @click="clear_fields"
                      >
                        <img src="/img/close-icn.png" alt />
                      </button>
                      <form @submit="add_mail">
                        <div class="form-group">
                          <label>Select Intent</label>
                          <multiselect
                            id="intent_select_email"
                            v-model="intent"
                            :options="intent_list"
                            :searchable="true"
                            :close-on-select="true"
                            :show-labels="false"
                          >
                            <span>{{ intent }}</span>
                          </multiselect>
                        </div>
                        <div class="form-group">
                          <label>Template Name</label>
                          <input
                            type="text"
                            class="form-control"
                            v-model="template_name"
                            placeholder="Enter Template Name"
                            id="email_template_name"
                          />
                        </div>
                        <div class="form-group">
                          <label>Send To</label>
                          <div class="tag-input">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Send to"
                              data-role="tagsinput"
                              v-model="sender_list"
                              id="email_send_to"
                            />
                          </div>
                        </div>
                        <div class="form-group">
                          <label>Subject</label>
                          <input
                            type="text"
                            class="form-control"
                            v-model="subject"
                            placeholder="Enter Subject Name"
                            id="email_subject"
                          />
                        </div>
                        <div class="form-group">
                          <label>Body</label>
                          <span style="margin-left: 8px">
                            <svg
                              class="question-mark"
                              data-tooltip="tooltip"
                              data-placement="bottom"
                              title="Help"
                              data-toggle="modal"
                              data-target="#info_email"
                              fill="#273679"
                              xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:cc="http://creativecommons.org/ns#"
                              xmlns:dc="http://purl.org/dc/elements/1.1/"
                              height="24"
                              width="24"
                              version="1.1"
                            >
                              <g transform="translate(0 -1028.4)">
                                <path
                                  d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z"
                                  transform="translate(0 1029.4)"
                                  fill="#2980b9"
                                />
                                <path
                                  d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z"
                                  transform="translate(0 1028.4)"
                                  fill="#273679"
                                />
                                <path
                                  d="m12 1035.4c-1.727-0.1-3.4306 1.1-3.8438 2.8-0.0403 0.3-0.0546 0.4-0.1562 1.2h2c-0.0526-1.3 1.306-2.3 2.5-2 1.021 0.3 1.763 1.5 1.406 2.5-0.294 0.6-0.998 1-1.562 1.4-0.577 0.5-1.074 1.1-1.313 1.8-0.039 0.4-0.034 0.8-0.031 1.3h2v-1c0.172-0.7 0.688-1.1 1.25-1.4 0.634-0.3 1.087-0.8 1.406-1.4 0.543-1 0.454-2.2-0.125-3.1-0.705-1.3-2.067-2.2-3.531-2.1zm0 10c-0.552 0-1 0.4-1 1 0 0.5 0.448 1 1 1s1-0.5 1-1c0-0.6-0.448-1-1-1z"
                                  fill="#2980b9"
                                />
                                <path
                                  d="m12 6c-1.727-0.0274-3.4306 1.1749-3.8438 2.875-0.0403 0.2941-0.0546 0.3281-0.1562 1.125h2c-0.0526-1.2477 1.306-2.289 2.5-1.9375 1.021 0.2374 1.763 1.4281 1.406 2.4375-0.294 0.684-0.998 0.992-1.562 1.406-0.577 0.482-1.074 1.094-1.313 1.813-0.039 0.42-0.034 0.859-0.031 1.281h2v-1c0.172-0.624 0.688-1.042 1.25-1.312 0.634-0.312 1.087-0.835 1.406-1.469 0.543-0.974 0.454-2.1746-0.125-3.094-0.705-1.2699-2.067-2.1438-3.531-2.125zm0 10c-0.552 0-1 0.448-1 1s0.448 1 1 1 1-0.448 1-1-0.448-1-1-1z"
                                  transform="translate(0 1028.4)"
                                  fill="#ecf0f1"
                                />
                              </g>
                            </svg>
                          </span>
                          <textarea
                            id="email_body_template"
                            class="form-control"
                            placeholder="Body"
                            v-model="email_body"
                            rows="5"
                          ></textarea>
                        </div>
                        <div class="btn-wrap text-right">
                          <button
                            type="button"
                            class="btn btn-link"
                            data-dismiss="modal"
                            @click="clear_fields"
                          >
                            {{tlt('template_model_cancel_btn')}}
                          </button>
                          <button
                            type="submit"
                            class="darkblue-btn"
                            id="email_template_save"
                          >
                            {{tlt('template_model_save_btn')}}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="modal fade dash-modal"
                id="info_email"
                tabindex="-1"
                role="dialog"
                aria-labelledby="configapimodaltitle"
                aria-hidden="true"
                data-backdrop="true"
              >
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div
                    class="modal-content"
                    style="width: 220%; margin-left: -40%"
                  >
                    <div class="modal-body" style="width: 1150px">
                      <div class="modal-head d-flex align-items-center">
                        <div class="head-icn">
                          <img src="/img/msg-blue.png" alt />
                        </div>
                        <h3>Help</h3>
                      </div>
                      <div>
                        <h6>
                          If you want to know the enduser name, who activated
                          the intent then just add
                          <span>{{ username }}</span> like this in email
                          body/subject
                        </h6>
                      </div>
                      <div>
                        <div>
                          <br />
                          <label>Body</label>
                          <textarea
                            disabled
                            id="configapi_req_json"
                            class="form-control"
                            placeholder="response"
                            rows="10"
                            style="color: black"
                            v-model="body_content"
                          ></textarea>
                        </div>
                        <br />
                      </div>
                      <br />
                      <br />
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";
import Swal from "sweetalert2";
import { setTimeout } from "timers";
import api_calls from "@/portal/api_calls";
import Multiselect from "vue-multiselect";
export default {
  name: "email",
  components: {
    Multiselect,
  },
  data() {
    return {
      read: false,
      template_name: "",
      list: [],
      sender_list: "",
      subject: "",
      email_body: "",
      companyname: null,
      companyid: null,
      spinnerOn: false,
      user_role: this.$session.get("UserInformation").role,
      intent_list: [],
      selected_intent_list: [],
      full_intent_list: [],
      intent: "",
      checked_list: [],
      page_no: 1,
      total_pages: 1,
      per_page: 10,
      number_of_rows: null,
      show_loader: false,
      page_array: [],
      search_name: "",
      reg_email: /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/,
      username: "{username}",
      body_content: `Hi {username},
        You are receiving this email because you (or someone else) have requested to reset the password of {username} account.
        Please click on the following link, or paste this into your browser to complete the process:
        https://cense.ai/#someramdomlink:ad9V9HG:43bbe2ef-9741-473f-8cc2-845cff5f1420
        If you did not request this, please ignore this email and your password will remain unchanged.

        Regards,
        Admin`,
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
    if (this.user_role != "SuperAdmin") {
      axios
        .post(
          api_calls.show_template_url(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            isEdit: "False",
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            page_no: this.page_no,
            per_page: this.per_page,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          this.total_pages = response.data[2];
          for (var i in response.data[0]) {
            this.list.push({
              template_name: response.data[0][i],
              intent: response.data[1][i].replace(this.companyid + "_", ""),
            });
          }
          this.setpagination(this.page_no);
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
    } else if (this.user_role == "SuperAdmin") {
      if (
        !this.$session.has("CompanyId") &&
        this.$session.get("UserInformation").role == "SuperAdmin"
      ) {
        toastr.warning(this.tlt('select_company_name_msg2'));
      } else {
        axios
          .post(
            api_calls.show_template_url(),
            {
              company_name: this.companyname,
              company_id: this.companyid,
              isEdit: "False",
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              page_no: this.page_no,
              per_page: this.per_page,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            this.total_pages = response.data[2];
            for (var i in response.data[0]) {
              this.list.push({
                template_name: response.data[0][i],
                intent: response.data[1][i].replace(this.companyid + "_", ""),
              });
            }
            this.setpagination(this.page_no);
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
      }
    }
    axios
      .post(
        api_calls.get_unanswered_url(),
        {
          company_id: this.companyid,
          company_name: this.companyname,
          isDropdown: "True",
          email: this.$session.get("UserInformation").email,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens,
        },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          },
        }
      )
      .then((response) => {
        // console.log(response.data,response.data[0],response.data[1]);
        for (var i in response.data[0]) {
          this.full_intent_list.push(
            response.data[0][i].replace(this.companyid + "_", "")
          );
        }
        for (var i in response.data[1]) {
          this.selected_intent_list.push(
            response.data[1][i].replace(this.companyid + "_", "")
          );
        }
        this.intent_list = this.selected_intent_list;
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
  },
  mounted() {
    $('[data-tooltip="tooltip"]').tooltip();
    var vm = this;
    $("#selectall").click(function () {
      if ($(this).is(":checked")) {
        // $('div:input').prop('checked',true);
        $("input:checkbox").prop("checked", true);
      } else {
        vm.checked_list = [];
        $("input:checkbox").prop("checked", false);
      }
    });
    $("#info_email").on("shown.bs.modal", function (e) {
      // $("#usermodel").css("opacity", "-0.5");
      $("#usermodel").modal("hide");
    });
    $("#info_email").on("hidden.bs.modal", function (e) {
      // $("#usermodel").css("opacity", "1");
      $("#usermodel").modal("hide");
    });
  },
  methods: {
    email_selected(value) {
      if (value == "all") {
        if (event.target.checked) {
          this.checked_list = this.list;
        } else if (!event.target.checked) {
          this.checked_list = [];
        }
      } else {
        if (event.target.checked) {
          let val_index = this.checked_list.indexOf(this.list[index]);
          var temp = this.list[index];
          if (val_index == -1) {
            this.checked_list.push(temp);
          }
        } else if (!event.target.checked) {
          var selectall = document.querySelector("#selectall");
          if (selectall.checked == true) {
            selectall.checked = false;
          }
          var temp = this.checked_list.filter((list) => {
            return list.list !== index;
          });
          this.checked_list = temp;
        }
      }
    },
    delete_selected() {
      var intentlist = [];
      if (this.checked_list.length == 0) {
        Swal.fire({
          title:"No email selected!",
          text:"",
          type:"error",
          timer:2000,
          });
      } else if (this.checked_list.length > 0) {
        for (var i in this.checked_list) {
          intentlist.push(this.companyid + "_" + this.checked_list[i].intent);
        }
        this.spinnerOn = true;
        this.delete_mail_api(intentlist);
      }
    },
    delete_single(index) {
      var intentlist = [];
      intentlist.push(this.list[index].intent);
      this.spinnerOn = true;
      this.delete_mail_api(intentlist);
    },
    delete_mail_api(intentlist) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete!!",
      }).then((result) => {
        if (result.value) {
          axios
            .post(
              api_calls.delete_email_url(),
              {
                company_id: this.companyid,
                company_name: this.companyname,
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                intent_name: intentlist,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.spinnerOn = false;
              if (response.data == "Query Executed Successfully") {
                toastr.success("Your email(s) have been deleted successfully");
                setTimeout(() => {
                  this.$router.go();
                }, 2500);
              } else if (response.data == "Internal Server Error") {
                toastr.error(
                  "There was an internal server error. Please try again."
                );
              }
            })
            .catch((e) => {
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
      });
    },
    clear_fields() {
      this.sender_list = "";
      this.template_name = "";
      this.subject = "";
      this.email_body = "";
      this.read = false;
      this.intent = "";
      this.intent_list = this.selected_intent_list;
      document.getElementById("intent_select_email").disabled = false;
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
    page_require(page) {
      if (page == 0 || page == this.total_pages + 1) {
      } else {
        $("input:checkbox").prop("checked", false);
        if (page == "...s") {
          this.page_no = Math.ceil((1 + this.page_no) / 2);
        } else if (page == "...l") {
          this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
        } else {
          this.page_no = page;
        }
        if (this.search_name == "") {
          // console.log(page);
          if (this.user_role != "SuperAdmin") {
            axios
              .post(
                api_calls.show_template_url(),
                {
                  company_name: this.companyname,
                  company_id: this.companyid,
                  isEdit: "False",
                  email: this.$session.get("UserInformation").email,
                  license_key: this.$session.get("UserInformation").license_key,
                  token: this.$session.get("UserInformation").tokens,
                  page_no: this.page_no,
                  per_page: this.per_page,
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.$session.get("at")}`,
                  },
                }
              )
              .then((response) => {
                this.total_pages = response.data[2];
                this.list = [];
                for (var i in response.data[0]) {
                  this.list.push({
                    template_name: response.data[0][i],
                    intent: response.data[1][i].replace(
                      this.companyid + "_",
                      ""
                    ),
                  });
                }
                this.setpagination(this.page_no);
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
          } else if (this.user_role == "SuperAdmin") {
            if (
              !this.$session.has("CompanyId") &&
              this.$session.get("UserInformation").role == "SuperAdmin"
            ) {
              toastr.warning("Please select a company name from the dropdown");
            } else {
              axios
                .post(
                  api_calls.show_template_url(),
                  {
                    company_name: this.companyname,
                    company_id: this.companyid,
                    isEdit: "False",
                    email: this.$session.get("UserInformation").email,
                    license_key: this.$session.get("UserInformation")
                      .license_key,
                    token: this.$session.get("UserInformation").tokens,
                    page_no: this.page_no,
                    per_page: this.per_page,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${this.$session.get("at")}`,
                    },
                  }
                )
                .then((response) => {
                  this.total_pages = response.data[2];
                  this.list = [];
                  for (var i in response.data[0]) {
                    this.list.push({
                      template_name: response.data[0][i],
                      intent: response.data[1][i].replace(
                        this.companyid + "_",
                        ""
                      ),
                    });
                  }
                  this.setpagination(this.page_no);
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
            }
          }
        } else {
          if (this.user_role != "SuperAdmin") {
            axios
              .post(
                api_calls.show_template_url(),
                {
                  company_id: this.$session.get("UserInformation").company_id,
                  company_name: this.$session.get("UserInformation")
                    .company_name,
                  license_key: this.$session.get("UserInformation").license_key,
                  email: this.$session.get("UserInformation").email,
                  token: this.$session.get("UserInformation").tokens,
                  issearch: true,
                  key: this.search_name,
                  per_page: this.per_page,
                  page_no: page,
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.$session.get("at")}`,
                  },
                }
              )
              .then((response) => {
                this.spinnerOn = false;
                if (response.data[1] != undefined) {
                  this.page_no = page;
                  this.total_pages = response.data[1].PageCount;
                  this.list = [];
                  for (var i in response.data[0].templates) {
                    this.list.push({
                      template_name:
                        response.data[0].templates[i].v.TemplateName,
                      intent: response.data[0].templates[i].k.replace(
                        this.companyid + "_",
                        ""
                      ),
                    });
                  }
                  this.setpagination(this.page_no);
                } else {
                  toastr.error("Intrnal Server Error");
                  setTimeout(() => {
                    this.$router.go();
                  }, 2500);
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
          } else if (this.user_role == "SuperAdmin") {
            if (
              !this.$session.has("CompanyId") &&
              this.$session.get("UserInformation").role == "SuperAdmin"
            ) {
              toastr.warning(this.tlt('select_company_name_msg2'));
            } else {
              axios
                .post(
                  api_calls.show_template_url(),
                  {
                    company_id: this.$session.get("UserInformation").company_id,
                    company_name: this.$session.get("UserInformation")
                      .company_name,
                    license_key: this.$session.get("UserInformation")
                      .license_key,
                    email: this.$session.get("UserInformation").email,
                    token: this.$session.get("UserInformation").tokens,
                    issearch: true,
                    key: this.search_name,
                    per_page: this.per_page,
                    page_no: page,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${this.$session.get("at")}`,
                    },
                  }
                )
                .then((response) => {
                  this.spinnerOn = false;
                  if (response.data[1] != undefined) {
                    this.page_no = page;
                    this.total_pages = response.data[1].PageCount;
                    this.list = [];
                    for (var i in response.data[0].templates) {
                      this.list.push({
                        template_name:
                          response.data[0].templates[i].v.TemplateName,
                        intent: response.data[0].templates[i].k.replace(
                          this.companyid + "_",
                          ""
                        ),
                      });
                    }
                    this.setpagination(this.page_no);
                  } else {
                    toastr.error("Intrnal Server Error");
                    setTimeout(() => {
                      this.$router.go();
                    }, 2500);
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
            }
          }
        }
      }
    },
    pagination_class(index) {
      if (index == this.page_no) {
        return " active";
      } else {
        return "";
      }
    },
    callsearch() {
      if (event.keyCode === 13) {
        this.search_template();
      }
    },
    search_template() {
      if (this.search_by != "") {
        if (this.search_name != "") {
          this.show_loader = true;
          axios
            .post(
              api_calls.show_template_url(),
              {
                company_name: this.companyname,
                company_id: this.companyid,
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                issearch: true,
                // searchby: this.search_by,
                key: this.search_name,
                per_page: this.per_page,
                page_no: 1,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.show_loader = false;
              if (response.data[1] != undefined) {
                this.page_no = 1;
                this.total_pages = response.data[1].PageCount;
                this.list = [];
                for (var i in response.data[0].templates) {
                  this.list.push({
                    template_name: response.data[0].templates[i].v.TemplateName,
                    intent: response.data[0].templates[i].k.replace(
                      this.companyid + "_",
                      ""
                    ),
                  });
                }
                this.setpagination(this.page_no);
              } else if (response.data.MSG == "No Templates Found") {
                toastr.error("No Template Found");
                setTimeout(() => {
                  this.$router.go();
                }, 2500);
              } else {
                toastr.error("Intrnal Server Error");
                setTimeout(() => {
                  this.$router.go();
                }, 2500);
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
        } else {
          toastr.error("Enter proper data for searching");
        }
      } else {
        toastr.error("Select header for searching");
      }
    },
    add_mail() {
      event.preventDefault();
      var edit = "this.read==true" ? "True" : "False";
      if (
        this.template_name == "" ||
        this.sender_list == "" ||
        this.email_body == "" ||
        this.subject == "" ||
        this.intent == ""
      ) {
        toastr.error("Please enter the required fields");
      } else {
        this.show_loader = true;
        axios
          .post(
            api_calls.email_send_url(),
            {
              company_name: this.companyname,
              company_id: this.companyid,
              email: this.$session.get("UserInformation").email,
              senderlist: this.sender_list,
              subject: this.subject,
              templatename: this.template_name,
              emailbody: this.email_body,
              intent: this.companyid + "_" + this.intent,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            if (
              response.data == "template added successfully" &&
              edit == "False"
            ) {
              swal({
                text: "Email template has been added successfully",
                timer:2500,
              });
              this.list = [];
              axios
                .post(
                  api_calls.show_template_url(),
                  {
                    company_name: this.companyname,
                    company_id: this.companyid,
                    isEdit: "False",
                    email: this.$session.get("UserInformation").email,
                    license_key: this.$session.get("UserInformation")
                      .license_key,
                    token: this.$session.get("UserInformation").tokens,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${this.$session.get("at")}`,
                    },
                  }
                )
                .then((response) => {
                  for (var i in response.data[0]) {
                    this.list.push({
                      template_name: response.data[0][i],
                      intent: response.data[1][i].replace(
                        this.companyid + "_",
                        ""
                      ),
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
            } else if (
              response.data == "template added successfully" &&
              edit == "True"
            ) {
              toastr.success(
                "Your email template has been successfully updated"
              );
              this.list = [];
              axios
                .post(
                  api_calls.show_template_url(),
                  {
                    company_name: this.companyname,
                    company_id: this.companyid,
                    isEdit: "False",
                    email: this.$session.get("UserInformation").email,
                    license_key: this.$session.get("UserInformation")
                      .license_key,
                    token: this.$session.get("UserInformation").tokens,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${this.$session.get("at")}`,
                    },
                  }
                )
                .then((response) => {
                  for (var i in response.data[0]) {
                    this.list.push({
                      template_name: response.data[0][i],
                      intent: response.data[1][i].replace(
                        this.companyid + "_",
                        ""
                      ),
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
            } else if (response.data.includes("E11000 duplicate key error")) {
              swal({
                type: "warning",
                text:
                  "Template already exists. Please try with another template name",
                timer:3000,
              });
            } else {
              swal({
                type: "error",
                text: "Your template has not been added",
                timer:2500,
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
      }
      $("#usermodel").modal("hide");
      this.sender_list = "";
      this.template_name = "";
      this.subject = "";
      this.email_body = "";
      this.read = false;
      this.intent = "";
      setTimeout(() => {
        this.show_loader = false;
      }, 3000);
    },
    edit_mail(index) {
      if (
        !this.$session.has("CompanyId") &&
        this.$session.get("UserInformation").role == "SuperAdmin"
      ) {
        toastr.warning("Please select a company name from the dropdown");
      } else {
        axios
          .post(
            api_calls.show_template_url(),
            {
              company_name: this.companyname,
              company_id: this.companyid,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              isEdit: "True",
              intent: this.companyid + "_" + this.list[index].intent,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            this.template_name = response.data.templatename;
            this.subject = response.data.subject;
            this.email_body = response.data.body;
            this.intent = response.data.intent.replace(
              this.companyid + "_",
              ""
            );
            this.sender_list = response.data.sender;
            this.read = true;
            document.getElementById("intent_select_email").disabled = true;
            this.intent_list = this.full_intent_list;
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
      }
    },
  },
};
</script>

<style  src="vue-multiselect/dist/vue-multiselect.min.css">
</style>

