<template>
  <div>
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <div class="dash-cont">
      <div class="container-fluid">
        <div class="card dash-card">
          <div
            class="
              card-header
              d-block d-sm-flex
              flex-wrap
            "
            style="padding: 20px 22px"
          >
            <a v-if="Boolean(selected_position)" @click="get_position_details()" class="page-link"><svg xmlns="http://www.w3.org/2000/svg" width="8.667" height="15.204" viewBox="0 0 8.667 15.204"><g data-v-3e7314fe="" id="arrow-point-to-left" transform="translate(105.806 15.204) rotate(180)"><path data-v-3e7314fe="" id="Path_1136" data-name="Path 1136" d="M105.493,8.354l-6.537,6.537a1.065,1.065,0,1,1-1.506-1.506L103.235,7.6,97.45,1.817A1.065,1.065,0,0,1,98.956.312l6.537,6.537a1.065,1.065,0,0,1,0,1.505Z" transform="translate(0 0)" fill="#9499ae"></path></g></svg></a>
            <h3 v-if="Boolean(selected_position)" style="margin: 2px 15px;">
              Candidate list for {{ selected_position.position_name }}
            </h3>
            <h3 v-else class="mb-sm-0" style="margin: 2px 15px;">
              Positions
            </h3>
            <div
              class="ml-auto card-act d-flex m-0"
              v-if="candidates_list.length > 0 || positions_list.length > 0"
            >
              <input
                class="form-control search-bar"
                id="search_bar"
                placeholder="Search here"
                v-model.trim="search_name"
                v-on:keyup="callsearch"
              />
              <a
                type="button"
                v-if="isVisibleSearchClear"
                class="btn bg-transparent mt-auto mb-auto py-0"
                @click="clear_search_name"
                style="margin-left: -40px; z-index: 10"
              >
                <img src="/img/close-icn.png" alt />
              </a>
              <a
                href="#"
                class="darkblue-btn"
                @click="callsearch"
                id="search_btn"
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
            </div>
          </div>
          <div class="card-body">
            <div class="table-box" v-if="Boolean(selected_position) && candidates_list.length > 0">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">
                        <div class="form-check checkbox checkbox-success">
                          <label
                            class="form-check-label checkbox checkbox-success"
                          >
                            <input
                              class="form-check-input"
                              id="selectall"
                              type="checkbox"
                              @click="check_list_array('all')"
                            />
                            <span class="icn"></span>
                          </label>
                        </div>
                      </th>
                      <th scope="col" v-for="(col_name, index) in candidates_list[0].CandidateDetails" :key="index">
                        {{col_name.key_name}}
                      </th>
                      <!-- <th scope="col" style="width: 10%">ACTION</th> -->
                    </tr>
                  </thead>
                  <tbody v-for="(candidate, index) in candidates_list" :key="index">
                    <tr>
                      <th scope="col">
                        <div class="form-check checkbox-success">
                          <label
                            class="form-check-label checkbox checkbox-success"
                          >
                            <input
                              class="form-check-input"
                              type="checkbox"
                              @change="check_list_array(index)"
                            />
                            <span class="icn"></span>
                          </label>
                        </div>
                      </th>
                      <td v-for="(detail, index) in candidate.CandidateDetails" :key="index">
                        <div v-if="detail.key_name == 'resume'">
                          Hii
                        </div>
                        {{detail.key_value}}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="card col-sm-12" v-if="!Boolean(selected_position)">
              <div class="row m-0 p-0">
                <div v-for="(position, index) in positions_list" :key="index">
                  <div class="col-sm-12 p-3">
                    <div
                      class="card border-1"
                      style="padding: 12px 12px 12px 0; height: 135px"
                    >
                      <a
                        href="javascript:void(0)"
                        class="mx-auto"
                        data-toggle="modal"
                        data-target="#widget_code_modal"
                        @click="selected_position = position; get_candidates_details()"
                      >
                        <div class="d-flex">
                          <h1
                            class="p-2"
                            style="
                              font-size: 70px;
                              width: 93px;
                              text-align: center;
                              margin-top: 0px;
                            "
                          >
                            {{ position.Count.New }}
                          </h1>
                          <div style="padding-top: 18px; width: 135px">
                            <h4 style="margin-bottom: 0">
                              {{ position.position_name }}
                            </h4>
                            <p>
                              ( {{ position.Count.total_count }} Candidates )
                            </p>
                          </div>
                          <div>
                            <vc-donut 
                              :sections="sections"
                              :size="100" unit="px" :thickness="30"
                              >Basic donut</vc-donut>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="positions_list.length == 0 && !Boolean(selected_position)">
              <p class="text-center mt-5">
                <strong>
                  You currently have 0 Job positions opened. Please create to
                  continue.</strong
                >
              </p>
            </div>
            <div v-if="Boolean(selected_position) && candidates_list.length == 0">
              <p class="text-center mt-5">
                <strong>
                  No data Available</strong
                >
              </p>
            </div>
            <div
              class="pagin-table"
              style="margin-top: 2%"
              v-if="
              positions_list.length > 0 || candidates_list.length > 0"
            >
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
                      >{{ pageno }}</a
                    >
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
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import api_calls from "@/portal/api_calls";
import Vue from 'vue'
import Donut from 'vue-css-donut-chart';
import 'vue-css-donut-chart/dist/vcdonut.css';
Vue.use(Donut);

export default {
  name: "Recruitment",
  data() {
    return {
      company_id: this.$session.get("UserInformation").company_id,
      company_name: this.$session.get("UserInformation").company_name,
      sections: [
          { label: 'Red section', value: 25, color: 'red' },
          { label: 'Green section', value: 25, color: 'green' },
          { label: 'Blue section', value: 25, color: 'blue' }
        ],
      selected_position: null,
      positions_list: [],
      selected_candidate: null,
      candidates_list: [],
      checked_list: [],
      page_no: 1,
      per_page: 10,
      total_pages: 0,
      page_array: [],
      search_name: "",
      spinnerOn: false,
      isVisibleSearchClear: false,
    };
  },
  watch: {
    search_name() {
      if (this.search_name === "") {
        if(Boolean(this.selected_position)) {
          this.get_candidates_details();
        }else {
          this.get_position_details();
        }
        this.isVisibleSearchClear = false;
      } else if (this.search_name !== "") {
        this.isVisibleSearchClear = true;
      }
    },
  },
  created() {
    this.get_position_details();
    // company_id = request.json.get('company_id', None)
    // company_name = request.json.get('company_name', None)
    // is_get = request.json.get('is_get', False)
    // get_all_positions = request.json.get('get_all_positions', False)
    // req_position = request.json.get('required_position', None)
    // filter_by = request.json.get('filter_by', ['All'])
    // page_no = request.json.get('page_no', 1)
    // per_page = request.json.get('per_page', 10)
  },
  mounted() {
    var vm = this;
    $("#selectall").click(function () {
      if ($(this).is(":checked")) {
        $("input:checkbox").prop("checked", true);
      } else {
        vm.checked_list = [];
        $("input:checkbox").prop("checked", false);
      }
    });
  },
  methods: {
    clear_search_name() {
      this.search_name = "";
    },
    get_candidates_details() {
      this.spinnerOn = true;
      this.checked_list = [];
      this.positions_list = [];
      $("input:checkbox").prop("checked", false);
      axios
        .post(
          api_calls.hr_candidate_details(),
          {
            company_id: this.$session.get("UserInformation").company_id,
            company_name: this.$session.get("UserInformation").company_name,
            page_no: 1,
            per_page: this.per_page,
            is_get: true,
            required_position: this.selected_position.position_name,
            filter_by: ["All"],
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          console.log("Selected position candidates data", response);
          this.spinnerOn = false;
          if (
            response.data != "" &&
            response.data != null &&
            response.data != "Internal server Error"
          ) {
            this.number_of_rows = response.data.count;
            this.total_pages = Math.ceil(
              this.number_of_rows / this.per_page
            );
            this.setpagination(this.page_no);
            this.candidates_list = response.data.data
          } else {
            Swal({
              type: "error",
              text: "Internal Server Error",
              timer: 2000,
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
    },
    get_position_details() {
      this.empty_variables();
      this.spinnerOn = true;
      axios
        .post(
          api_calls.hr_candidate_details(),
          {
            company_id: this.$session.get("UserInformation").company_id,
            company_name: this.$session.get("UserInformation").company_name,
            page_no: 1,
            per_page: 6,
            is_get: true,
            get_all_positions: true,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          console.log("All Position data", response);
          this.spinnerOn = false;
          if (
            response.data != "" &&
            response.data != null &&
            response.data != "Internal server Error"
          ) {
            this.number_of_rows = response.data.count;
            this.total_pages = Math.ceil(
              this.number_of_rows / this.per_page
            );
            this.setpagination(this.page_no);
            this.positions_list = response.data.data;
          } else {
            Swal({
              type: "error",
              text: "Internal Server Error",
              timer: 2000,
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
    },
    check_list_array(index) {
      if (index == "all") {
        this.checked_list = [];
        var role_length = this.role_name.length;
        for (var i = 0; i < role_length; i++) {
          this.checked_list.push(i);
        }
      } else {
        if (event.target.checked == true) {
          if (!this.checked_list.includes(index)) {
            this.checked_list.push(index);
          }
        } else if (event.target.checked == false) {
          var selectall = document.querySelector("#selectall");
          if (selectall.checked == true) {
            selectall.checked = false;
          }
          var temp = this.checked_list.filter((role) => {
            return role !== index;
          });
          this.checked_list = temp;
        }
      }
    },
    page_require(page) {
      if (page == 0 || page == this.total_pages + 1) {
      } else {
        if (this.search_name == "") {
          if (page == "...s") {
          this.page_no = Math.ceil((1 + this.page_no) / 2);
          } else if (page == "...l") {
            this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
          } else {
            this.page_no = page;
          }
          $("input:checkbox").prop("checked", false);
          this.spinnerOn = true;
          this.checked_list = [];
          if(Boolean(this.selected_position)) {
            axios
            .post(
              api_calls.hr_candidate_details(),
              {
                company_id: this.company_id,
                company_name: this.company_name,
                is_get: true,
                page_no: this.page_no,
                per_page: 10,
                required_position: this.selected_position.position_name,
                filter_by: ["All"],
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.spinnerOn = false;
              this.candidates_list = [];
              if (response.data != "" &&
                response.data != null &&
                response.data != "Internal server Error" &&
                (!response.data.errors)
              ) {
                this.number_of_rows = response.data.count;
                this.total_pages = Math.ceil(
                  this.number_of_rows / this.per_page
                );
                this.candidates_list = response.data.data;
                this.setpagination(this.page_no);
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
          }else {
            axios
            .post(
              api_calls.hr_candidate_details(),
              {
                company_id: this.company_id,
                company_name: this.company_name,
                is_get: true,
                get_all_positions: true,
                page_no: this.page_no,
                per_page: 6,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.spinnerOn = false;
              this.positions_list = [];
              if (response.data != "" &&
                response.data != null &&
                response.data != "Internal server Error" &&
                (!response.data.errors)
              ) {
                this.number_of_rows = response.data.count;
                this.total_pages = Math.ceil(
                  this.number_of_rows / 6
                );
                this.positions_list = response.data.data;
                this.setpagination(this.page_no);
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
        }else {
          if (page == "...s") {
            this.page_no = Math.ceil((1 + this.page_no) / 2);
          } else if (page == "...l") {
            this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
          } else {
            this.page_no = page;
          }
          $("input:checkbox").prop("checked", false);
          this.spinnerOn = true;
          this.checked_list = [];
          if(Boolean(this.selected_position)) {
            axios
            .post(
              api_calls.hr_candidate_details(),
              {
                company_id: this.company_id,
                company_name: this.company_name,
                is_search: true,
                search_key: this.search_name,
                page_no: this.page_no,
                per_page: 10,
                required_position: this.selected_position.position_name,
                filter_by: ["All"],
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.spinnerOn = false;
              this.candidates_list = [];
              if (response.data != "" &&
                response.data != null &&
                response.data != "Internal server Error" &&
                (!response.data.errors)
              ) {
                this.number_of_rows = response.data.count;
                this.total_pages = Math.ceil(
                  this.number_of_rows / this.per_page
                );
                this.candidates_list = response.data.data;
                this.setpagination(this.page_no);
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
          }else {
            axios
            .post(
              api_calls.hr_candidate_details(),
              {
                company_id: this.company_id,
                company_name: this.company_name,
                is_get: true,
                is_search: true,
                search_key: this.search_name,
                get_all_positions: true,
                page_no: this.page_no,
                per_page: 6,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.spinnerOn = false;
              this.positions_list = [];
              if (response.data != "" &&
                response.data != null &&
                response.data != "Internal server Error" &&
                (!response.data.errors)
              ) {
                this.number_of_rows = response.data.count;
                this.total_pages = Math.ceil(
                  this.number_of_rows / 6
                );
                this.positions_list = response.data.data;
                this.setpagination(this.page_no);
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
    callsearch() {
      // if (event.keyCode === 13) {
        if (Boolean(this.selected_position)) {
          this.search_candidate();
        }else {
          this.search_position();
        }
      // }
    },
    search_position() {
      if (this.search_name != "") {
        this.spinnerOn = true;
        axios
          .post(
            api_calls.hr_candidate_details(),
            {
              company_id: this.$session.get("UserInformation").company_id,
              company_name: this.$session.get("UserInformation").company_name,
              is_search: true,
              search_key: this.search_name,
              get_all_positions: true,
              per_page: 6,
              page_no: 1,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            this.spinnerOn = false;
            console.log("Candidate search", response);
            if (
              response.data != null &&
              response.data != "Internal server Error" &&
              (!response.data.errors)
            ) {
              this.number_of_rows = response.data.count;
              this.total_pages = Math.ceil(
                this.number_of_rows / 6
              );
              this.setpagination(this.page_no);
              this.positions_list = response.data.data;
            } else if (response.data.MSG == "Internal Server Error") {
              Swal({
                text: "Internal Server Error",
                toast: true,
                position: "top-end",
                type: "warning",
                showConfirmButton: false,
                timer: 2000,
              });
            } else {
              Swal({
                text: "Internal Server Error",
                toast: true,
                position: "top-end",
                type: "error",
                showConfirmButton: false,
                timer: 2000,
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
      } else {
        Swal({
          text: "Enter proper data for searching",
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },
    search_candidate() {
      if (this.search_name != "") {
        this.checked_list = [];
        $("input:checkbox").prop("checked", false);
        this.spinnerOn = true;
        axios
          .post(
            api_calls.hr_candidate_details(),
            {
              company_id: this.$session.get("UserInformation").company_id,
              company_name: this.$session.get("UserInformation").company_name,
              is_search: true,
              search_key: this.search_name,
              required_position: this.selected_position.position_name,
              filter_by: ["All"],
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
            this.spinnerOn = false;
            console.log("Candidate search", response);
            if (
              response.data != null &&
              response.data != "Internal server Error" &&
              (!response.data.errors)
            ) {
              this.number_of_rows = response.data.count;
              this.total_pages = Math.ceil(
                this.number_of_rows / this.per_page
              );
              this.setpagination(this.page_no);
              this.candidates_list = response.data.data;
            } else if (response.data.MSG == "Internal Server Error") {
              Swal({
                text: "Internal Server Error",
                toast: true,
                position: "top-end",
                type: "warning",
                showConfirmButton: false,
                timer: 2000,
              });
            } else {
              Swal({
                text: "Internal Server Error",
                toast: true,
                position: "top-end",
                type: "error",
                showConfirmButton: false,
                timer: 2000,
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
      } else {
        Swal({
          text: "Enter proper data for searching",
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },
    empty_variables() {
      this.candidates_list = [];
      this.checked_list = [];
      $("input:checkbox").prop("checked", false);
      this.selected_position = null;
      this.positions_list = [];
      this.selected_candidate = null;
      this.search_name = "";
    }
  },
};
</script>
<style scoped>
.previous {
  background-color: #f1f1f1;
  color: black;
}
.round {
  border-radius: 50%;
}
</style>