<template>
  <!-- TODO Remove the company_id prefix for intents -->
  <div>
    <div class="dash-cont">
      <div class="spinner" id="spinner" v-show="spinnerOn"></div>
      <div class="container-fluid">
        <div class="card dash-card">
          <div
            class="card-header d-block d-sm-flex flex-wrap justify-content-between"
          >
            <h4 class="mb-sm-0">Intents</h4>
            <div class="card-act d-flex flex-wrap">
              <!-- for search -harsh -->
              <input
                class="form-control search-bar"
                id="search_bar"
                placeholder="Search here"
                v-model="search_name"
                v-on:keyup="callsearch"
              />
              <a type="button" v-if="isVisibleSearchClear" class="btn bg-transparent mt-auto mb-auto py-0" @click="clear_search_name" style="margin-left: -40px; z-index: 10;">
                <img src="/img/close-icn.png" alt />
              </a>
              <a
                href="javascript:void(0)"
                class="darkblue-btn"
                @click="search_intent"
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
              <a
                href="#"
                class="darkblue-btn"
                data-toggle="modal"
                data-target="#intentmodel"
                id="add_intent_btn"
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
                Add Intent
              </a>
              <a
                href="#"
                class="darkblue-btn"
                id="save_edit"
                v-if="isGlobalEdit"
                @click="add_intents"
              >
                Save
              </a>
              <a
                href="javascript:void(0)"
                class="red-btn"
                @click="delete_selected"
                id="delete_intent"
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
                Delete
              </a>
            </div>
          </div>
          <div class="card-body" id="page">
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
                              @change="selected_intents('all')"
                            />
                            <span class="icn"></span>
                          </label>
                        </div>
                      </th>
                      <th
                        scope="col"
                        style="
                          width: auto;
                          display: flex;
                          justify-content: space-evenly;
                        "
                      >
                        ACTION
                        <a
                          href="#"
                          @click="isGlobalEdit = !isGlobalEdit"
                          id="global_edit_intent_icn"
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
                      </th>
                      <th scope="col">INTENT</th>
                      <th scope="col">EMAIL ADDRESS</th>
                      <th scope="col">CREATED ON</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(intents, index) in intentlist" :key="index">
                      <th scope="col">
                        <div class="form-check checkbox-success">
                          <label
                            class="form-check-label checkbox checkbox-success"
                          >
                            <input
                              class="form-check-input"
                              type="checkbox"
                              @change="selected_intents(intents.intent)"
                            />
                            <span class="icn"></span>
                          </label>
                        </div>
                      </th>
                      <td class="action">
                        <a
                          href="#"
                          @click="edit_intent(index)"
                          id="edit_intent_icn"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15.392"
                            height="15.392"
                            viewBox="0 0 15.392 15.392"
                            data-toggle="modal"
                            data-target="#intentmodel"
                          >
                            <path
                              id="square-edit-outline"
                              d="M4.71,3A1.7,1.7,0,0,0,3,4.71V16.682a1.71,1.71,0,0,0,1.71,1.71H16.682a1.71,1.71,0,0,0,1.71-1.71V10.7h-1.71v5.986H4.71V4.71H10.7V3H4.71m10.928.855a.591.591,0,0,0-.41.171L14.185,5.061,16.322,7.2l1.043-1.035a.578.578,0,0,0,0-.812L16.04,4.026a.571.571,0,0,0-.4-.171M13.578,5.668l-6.3,6.311v2.138H9.413l6.3-6.311Z"
                              transform="translate(-3 -3)"
                              fill="#9499ae"
                            />
                          </svg>
                        </a>
                        <a
                          href="#"
                          @click="delete_intent(index)"
                          id="single_delete_intent_id"
                        >
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
                      <td>
                        <template v-if="!isGlobalEdit">{{
                          intents.intent
                        }}</template>
                        <template v-else-if="isGlobalEdit">
                          <input
                            class="w-100 form-control edit-column"
                            placeholder="Intent"
                            v-model="global_intents_edit_list[index]"
                        /></template>
                      </td>
                      <td class="text-center">{{ intents.email }}</td>
                      <td class="text-center">{{ intents.created }}</td>
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
      id="intentmodel"
      tabindex="-1"
      role="dialog"
      aria-labelledby="intentmodeltitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt />
              </div>
              <h3>Add Intent</h3>
            </div>
            <button
              type="button"
              @click="clear_fields"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <img src="/img/close-icn.png" alt />
            </button>
            <form @submit.prevent="add_intents">
              <div v-if="edit == 'False'">
                <label>Add Intent</label>
                <div
                  v-for="(newintents, index) in add_intents_list"
                  :key="index"
                  class="form-group"
                >
                  <span
                    v-if="index != 0"
                    style="float: right; cursor: pointer"
                    @click="add_to_intent_list('remove', index)"
                  >
                    <i style="font-size: 16px" class="fa">&#xf00d;</i>
                  </span>
                  <input
                    type="text"
                    v-model.trim="add_intents_list[index]"
                    class="form-control"
                    placeholder="Enter intent"
                    :id="`enter_intent_id_${index}`"
                  />
                </div>
              </div>
              <div v-if="edit == 'True'" class="form-group">
                <label>Add Intent</label>
                <input
                  type="text"
                  v-model.trim="new_intents"
                  class="form-control"
                  placeholder="Enter intent"
                  id="enter_intent_id"
                />
              </div>
              <div
                v-if="edit == 'False'"
                class="form-group"
                style="float: left"
              >
                <a
                  href="#"
                  class="darkblue-btn"
                  style="padding: 5px 10px"
                  @click="add_to_intent_list('add')"
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
                  Add Intent
                </a>
              </div>
              <br />
              <div class="btn-wrap text-right">
                <button
                  type="button"
                  class="btn btn-link"
                  @click="clear_fields"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" class="darkblue-btn" id="save_intent">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="pagin-table" style="margin-top: 2%">
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item">
            <a class="page-link" href="#" @click="page_require(page_no - 1)">
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
            <a class="page-link" href="#" @click="page_require(page_no + 1)">
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
import axios from "axios";
import Swal from "sweetalert2";
import api_calls from "@/portal/api_calls";
import { setTimeout } from "timers";
export default {
  name: "add-intent",
  data() {
    return {
      isVisibleSearchClear:false,
      spinnerOn: false,
      checked_list: [],
      total_pages: null,
      page_no: 1,
      per_page: 20,
      new_intent_list: [],
      new_intents: "",
      intentlist: [],
      companyname: "",
      companyid: "",
      number_of_rows: null,
      edit: "False",
      old_intent_data: [],
      new_intent_data: [],
      search_name: "",
      page_array: [],
      add_intents_list: [""],
      isGlobalEdit: false,
      global_intents_edit_list: [],
      // search_by: '',
      // searchby: '',
    };
  },
  watch: {
    isGlobalEdit(newVal) {
      if (Boolean(newVal)) {
        this.global_intents_edit_list = this.intentlist.map(
          ({ intent }) => intent
        );
      }
    },
  },
  created() {
    if (this.$session.get("UserInformation").role == "SuperAdmin") {
      if (this.$session.has("CompanyId")) {
        this.companyid = this.$session.get("CompanyId");
        this.companyname = this.$session.get("CompanyName");
      } else {
        this.companyid = this.$session.get("UserInformation").company_id;
        this.companyname = this.$session.get("UserInformation").company_name;
        toastr.warning(this.tlt('select_company_name_text'));
      }
    } else {
      this.companyid = this.$session.get("UserInformation").company_id;
      this.companyname = this.$session.get("UserInformation").company_name;
    }
    this.load_intents();
  },
  mounted() {
    var vm = this;
    $("#selectall").click(function () {
      if ($(this).is(":checked")) {
        $("input:checkbox").prop("checked", true);
      } else {
        $("input:checkbox").prop("checked", false);
        vm.checked_list = [];
      }
    });
    $("#intentmodel").on("hidden.bs.modal", function (e) {
      $("input:checkbox").prop("checked", false);
      vm.checked_list = [];
    });
    if(this.$route.params.modal_open_switch_tab){
      $("#intentmodel").modal("show");
    }
    // $("#from_datepicker").datepicker({
    //   dateFormat: "yy-mm-dd",
    //   onClose: (dateText, inst) => {
    //     this.search_name=dateText;
    //   },
    //   onSelect: function(dateText, inst) {
    //   }
    // });
  },
  watch:{
        search_name(){
          if (this.search_name === ""){
          this.load_intents();
          this.isVisibleSearchClear = false;
          }
          else if (this.search_name !== ""){
            this.isVisibleSearchClear = true;
          }
        },
  },
  methods: {
    clear_search_name(){
      this.search_name = "";
    },
    load_intents() {
      this.spinnerOn = true;
      this.intentlist = [];
      axios
        .post(
          api_calls.add_intent_url(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            subscription: this.$session.get("UserInformation").subscription,
            showintent: "True",
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
          this.spinnerOn = false;
          if (response.data != "token invalid") {
            this.number_of_rows = response.data[3].number_of_rows;
            this.total_pages = Math.ceil(this.number_of_rows / this.per_page);
            for (var i in response.data[0]) {
              this.intentlist.push({
                intent: response.data[0][i].replace(`${this.companyid}_`, ""),
                email: response.data[1][i],
                created: response.data[2][i],
              });
            }
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
    },
    callsearch() {
      if (event.keyCode === 13) {
        this.search_intent();
      }
    },
    search_intent() {
      if (this.search_name != "") {
        this.spinnerOn = true;
        axios
          .post(
            api_calls.add_intent_url(),
            {
              company_id: this.$session.get("UserInformation").company_id,
              company_name: this.$session.get("UserInformation").company_name,
              license_key: this.$session.get("UserInformation").license_key,
              email: this.$session.get("UserInformation").email,
              token: this.$session.get("UserInformation").tokens,
              issearch: true,
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
            this.spinnerOn = false;
            if (
              response.data.MSG != "Internal Server Error" &&
              response.data.MSG != "No Intents Found"
            ) {
              this.intentlist = [];
              this.page_no = 1;
              if (response.data != "token invalid") {
                this.number_of_rows = response.data.intentlist.length;
                this.total_pages = response.data.pagecount;
                for (let i = 0; i < response.data.intentlist.length; i++) {
                  this.intentlist.push({
                    intent: response.data.intentlist[i].Intent.replace(
                      this.companyid + "_",
                      ""
                    ),
                    email: response.data.intentlist[i].CreatedBy,
                    created: response.data.intentlist[i].CreatedDate,
                  });
                }
                this.setpagination(this.page_no);
              }
            } else if (response.data.MSG == "No Intents Found") {
              toastr.error("No intent found");
            } else if (response.data.MSG == "Intrnal Server Error") {
              toastr.error("Intrnal Server Error");
              // setTimeout(() => {
              //   this.$router.go();
              // }, 2500);
              this.load_intents();
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
    },
    selected_intents(intent) {
      if (intent == "all") {
        if (event.target.checked) {
          var temp = this.intentlist;
          this.checked_list = temp;
        } else if (!event.target.checked) {
          this.checked_list = [];
        }
      } else {
        if (event.target.checked == true) {
          let val_index = this.checked_list.filter((intents) => {
            return intents.intent == intent;
          });
          if (val_index.length == 0) {
            this.checked_list.push(intent);
          }
        } else if (event.target.checked == false) {
          var selectall = document.querySelector("#selectall");
          if (selectall.checked == true) {
            selectall.checked = false;
          }
          let temp = this.checked_list.filter((intents) => {
            return intents != intent;
          });
          this.checked_list = temp;
        }
      }
    },
    page_change(page_no) {
      this.spinnerOn = true;
      axios
        .post(
          api_calls.add_intent_url(),
          {
            intent: this.companyid + "_" + this.new_intents,
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            subscription: this.$session.get("UserInformation").subscription,
            showintent: "True",
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
          this.spinnerOn = false;
          this.number_of_rows = response.data[3].number_of_rows;
          for (var i in response.data[0]) {
            this.intentlist.push({
              intent: response.data[0][i].replace(this.companyid + "_", ""),
              email: response.data[1][i],
              created: response.data[2][i],
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
    edit_intent(index) {
      this.new_intents = this.intentlist[index].intent;
      this.old_intent_data.push(
        `${this.companyid}_${this.intentlist[index].intent}`
      );
      this.edit = "True";
    },
    delete_selected() {
      if (this.checked_list.length == 0) {
        Swal.fire("No intent selected!", "", "error");
      } else if (this.checked_list.length > 0) {
        for (var i in this.checked_list) {
          this.new_intent_list.push(
            this.companyid + "_" + this.checked_list[i]
          );
        }
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
            this.spinnerOn = true;
            axios
              .post(
                api_calls.delete_intent_url(),
                {
                  intent_list: this.new_intent_list,
                  company_name: this.companyname,
                  company_id: this.companyid,
                  email: this.$session.get("UserInformation").email,
                  license_key: this.$session.get("UserInformation").license_key,
                  token: this.$session.get("UserInformation").tokens,
                  subscription: this.$session.get("UserInformation")
                    .subscription,
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.$session.get("at")}`,
                  },
                }
              )
              .then((response) => {
                this.spinnerOn = false;
                if (response.data == "INTENTS DELETED") {
                  Swal({
                    type: "success",
                    text: "Your Intent(s) have been deleted.",
                    timer:2000,
                  }).then((result) => {
                    if (result.value) {
                      this.load_intents();
                    }
                  });
                } else if (response.data == "Nothing to delete!") {
                  toastr.error(
                    "You have not selected any intent to be deleted."
                  );
                } else if (
                  response.data ==
                  "Trained intent deletion is currently disabled!"
                ) {
                  toastr.error(
                    "Deletion of trained/configured intent is disabled. A Codearray Admin will get in contact with you"
                  );
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
        });
      }
    },
    delete_intent(index) {
      this.new_intent_list[0] =
        this.companyid + "_" + this.intentlist[index].intent;
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          this.spinnerOn = true;
          axios
            .post(
              api_calls.delete_intent_url(),
              {
                intent_list: this.new_intent_list,
                company_name: this.companyname,
                company_id: this.companyid,
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                subscription: this.$session.get("UserInformation").subscription,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.spinnerOn = false;
              if (response.data == "INTENTS DELETED") {
                Swal({
                  type: "success",
                  text: "Your Intent(s) have been deleted.",
                  timer:2000,
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                }).then((result) => {
                  if (result.value) {
                    this.load_intents();
                  }
                });
              } else if (
                response.data ==
                "Trained intent deletion is currently disabled!"
              ) {
                toastr.error(
                  "Deletion of trained/configured intent is disabled. A Codearray Admin will get in contact with you"
                );
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
      });
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
          axios
            .post(
              api_calls.add_intent_url(),
              {
                intent: this.new_intents,
                company_name: this.companyname,
                company_id: this.companyid,
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                subscription: this.$session.get("UserInformation").subscription,
                showintent: "True",
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
              this.spinnerOn = false;
              this.intentlist = [];
              for (var i in response.data[0]) {
                this.intentlist.push({
                  intent: response.data[0][i].replace(this.companyid + "_", ""),
                  email: response.data[1][i],
                  created: response.data[2][i],
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
        } else {
          // if(this.search_by=='Email Address'){
          //   this.searchby='CreatedBy';
          // }
          // else{
          //   this.searchby=this.search_by;
          // }
          $("input:checkbox").prop("checked", false);
          if (pageno == "...s") {
            this.page_no = Math.ceil((1 + this.page_no) / 2);
          } else if (pageno == "...l") {
            this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
          } else {
            this.page_no = pageno;
          }
          this.spinnerOn = true;
          axios
            .post(
              api_calls.add_intent_url(),
              {
                company_id: this.$session.get("UserInformation").company_id,
                company_name: this.$session.get("UserInformation").company_name,
                license_key: this.$session.get("UserInformation").license_key,
                email: this.$session.get("UserInformation").email,
                token: this.$session.get("UserInformation").tokens,
                issearch: true,
                // searchby: this.searchby,
                key: this.search_name,
                per_page: this.per_page,
                page_no: this.page_no,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.spinnerOn = false;
              this.intentlist = [];
              if (response.data.intentlist.length) {
                if (response.data != "token invalid") {
                  this.number_of_rows = response.data.intentlist.length;
                  this.total_pages = response.data.pagecount;
                  for (let i = 0; i < response.data.intentlist.length; i++) {
                    this.intentlist.push({
                      intent: response.data.intentlist[i].Intent.replace(
                        this.companyid + "_",
                        ""
                      ),
                      email: response.data.intentlist[i].CreatedBy,
                      created: response.data.intentlist[i].CreatedDate,
                    });
                  }
                  this.setpagination(this.page_no);
                }
              } else if (response.data.MSG == "No Intents Found") {
                toastr.error("No intent found");
              } else if (response.data.MSG == "Intrnal Server Error") {
                toastr.error("Internal Server Error");
                // setTimeout(() => {
                //   this.$router.go();
                // }, 2500);
                this.load_intents();
              } else {
                toastr.error("Internal Server Error");
                // setTimeout(() => {
                //   this.$router.go();
                // }, 2500);
                this.load_intents();
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
    },
    add_intents() {
      if (this.isGlobalEdit) {
        this.spinnerOn = true;
        var result1 = [];
        var result2 = [];
        var intents_map = this.intentlist.map(({ intent }) => intent);

        for (var i = 0; i < intents_map.length; i++) {
          if (this.global_intents_edit_list.indexOf(intents_map[i]) === -1) {
            result1.push(intents_map[i]);
          }
        }

        for (i = 0; i < this.global_intents_edit_list.length; i++) {
          if (intents_map.indexOf(this.global_intents_edit_list[i]) === -1) {
            result2.push(this.global_intents_edit_list[i]);
          }
        }

        if (result2.some((val, i) => result2.indexOf(val) !== i)) {
          toastr.error(
            "You have entered some intents more than once, ensure unique values"
          );
        } else {
          let old_intent_data = result1.map(
            (intent) => `${this.companyid}_${intent}`
          );
          let new_intent_data = result2.map(
            (intent) => `${this.companyid}_${intent}`
          );

          this.edit_intent_api(old_intent_data, new_intent_data);
        }
      } else if (this.edit == "False") {
        if (this.add_intents_list.includes("")) {
          toastr.error("Please Enter the Intent");
        } else {
          // this.spinnerOn = true;
          this.new_intent_list = this.add_intents_list.map(
            (intent) => `${this.companyid}_${intent}`
          );
          this.spinnerOn = true;
          axios
            .post(
              api_calls.add_intent_url(),
              {
                intent: this.new_intent_list,
                company_name: this.companyname,
                company_id: this.companyid,
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                subscription: this.$session.get("UserInformation").subscription,
                showintent: "False",
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.new_intent_list = [];
              this.add_intents_list = [""];
              this.spinnerOn = false;
              if (response.data == "User Role Set") {
                Swal({
                  type: "success",
                  text: "Feedback added successfully",
                  timer:2000,
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                }).then((result) => {
                  if (result.value) {
                    this.load_intents();
                  }
                });
              } else if (response.data.status == "Failure") {
                var myhtml = document.createElement("div");
                var p = document.createElement("p");
                p.style.textAlign = "center";
                // p.style.marginLeft = '5%';
                p.innerHTML = "The following intent(s) already exist:";
                myhtml.appendChild(p);
                var ul = document.createElement("ul");
                ul.style.marginLeft = "10%";
                ul.setAttribute("id", "proList");
                var productList = response.data.failed_intents;
                productList = productList.map((intent) =>
                  intent.split(this.companyid + "_").pop()
                );
                myhtml.appendChild(ul);
                productList.forEach(renderProductList);
                function renderProductList(element, index, arr) {
                  var li = document.createElement("li");
                  li.setAttribute("class", "item");
                  ul.appendChild(li);
                  li.innerHTML = li.innerHTML + element;
                }
                ul.style.listStyle = "initial";
                ul.style.textAlign = "left";
                if (response.data.failed_intents.length > 0) {
                  Swal({
                    html: myhtml,
                    type: "warning",
                    // title: "The following intents already exist:"
                  });
                } else {
                  Swal({
                    type: "warning",
                    title: "The following intents already exist:",
                    timer:2500,
                  });
                }
              } else if (response.data.status == "Error") {
                Swal({
                  type: "error",
                  text: "There was an internal server error. Please try again.",
                  timer:2500,
                });
              } else if (response.data == "Question Limit Already Exceeded!") {
                Swal({
                  type: "warning",
                  text:
                    "Your capacity to add questions has exceeded. Please upgrade your plans.",
                  timer:3000,
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
          // this.spinnerOn = false;
          $("#intentmodel").modal("hide");
        }
      } else if (this.edit == "True") {
        if (this.new_intents == "") {
          Swal({
            text: "Please enter the required fields",
            type: "warning",
            timer:2500,
          });
        } else {
          this.new_intent_data.push(`${this.companyid}_${this.new_intents}`);
          this.edit_intent_api(this.old_intent_data, this.new_intent_data);
        }
      }
    },
    edit_intent_api(old_intent_data, new_intent_data) {
      this.spinnerOn = true;
      $("#intentmodel").modal("hide");
      axios
        .post(
          api_calls.add_intent_url(),
          {
            old_intent_data: old_intent_data,
            new_intent_data: new_intent_data,
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            subscription: this.$session.get("UserInformation").subscription,
            editintent: "True",
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          this.spinnerOn = false;
          this.edit == "False";
          this.isGlobalEdit = false;
          // $("#intentmodel").modal("hide");
          // response.data.message == "Failed to edit intent(s)" ||
          this.clear_fields();
          console.log(response.data.failed_intents);       
          if (response.data.status == "Failure") {
            Swal({
              type: "error",
              text: "Intent(s) are not updated, due to some technical issues.",
              timer:2500,
            });
          } else if (response.data.status == "Success") {
            Swal({
              type: "success",
              text: "Intent(s) Updated Successfully",
              allowOutsideClick: false,
              allowEscapeKey: false,
            }).then((result) => {
              if (result.value) {
                // this.$router.go();
                this.load_intents();
              }
            });
          } else if (response.data.message == "Internal Server Error") {
            Swal({
              type: "error",
              text: "There was an internal server error. Please try again.",
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
    },
    clear_fields() {
      this.new_intents = [];
      this.new_intent_data = [];
      this.old_intent_data = [];
      this.add_intents_list = [""];
      this.edit = "False";
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
    // resetpagenumber(){
    //   this.page_no=1;
    // },
    pagination_class(index) {
      if (index == this.page_no) {
        return " active";
      } else {
        return "";
      }
    },
    add_to_intent_list(type, index) {
      if (type == "add") {
        this.add_intents_list.push("");
      } else if (type == "remove") {
        this.add_intents_list.splice(index, 1);
      }
    },
  },
};
</script>
<style scoped>
tr td {
  height: 50px;
}
.edit-column {
  height: 29px !important;
}
</style>
