<template>
  <!-- TODO Remove the company_id prefix for intents -->
  <div class="dash-cont">
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <div class="container-fluid">
      <div class="card dash-card">
        <div
          class="card-header d-block d-sm-flex flex-wrap justify-content-between"
        >
          <h4 class="mb-sm-0">Questions</h4>
          <div class="card-act d-flex flex-wrap">
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
              href="#"
              class="darkblue-btn"
              @click="search_product"
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
              title="Upload Files"
              data-toggle="modal"
              data-target="#file_upload"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 13.997"
              >
                <path
                  d="M8.6939946595428,-0.014074647685589529 H1.8307534193786577 a1.7158103100410358,1.38733287383954 0 0 0 -1.7158103100410358,1.38733287383954 v11.09866299071632 a1.7158103100410358,1.38733287383954 0 0 0 1.7158103100410358,1.38733287383954 h10.294861860246215 a1.7158103100410358,1.38733287383954 0 0 0 1.7158103100410358,-1.38733287383954 V4.147923973833031 l-5.147430930123107,-4.16199862151862 zm-0.42895257751025956,9.71133011687678 v2.08099931075931 h-2.5737154650615537 v-2.08099931075931 H3.5465637294196934 l3.4316206200820716,-2.77466574767908 l3.4316206200820716,2.77466574767908 h-2.1447628875512947 zM7.836089504522283,4.841590410752801 V1.0264250076940657 L12.554567857135131,4.841590410752801 H7.836089504522283 z"
                  id="svg_1"
                  class
                  fill="#fff"
                />
              </svg>
            </a>
            <a
              href="#"
              class="darkblue-btn"
              @click="download_csv"
              title="Download CSV File"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="14"
                height="14"
              >
                <path
                  d="M8.124046569796448,3.7048888423811563 V-0.0004725085692590319 H0.8684480275323758 C0.385950724471816,-0.0004725085692590319 -0.0022237975393094665,0.29105224477757613 -0.0022237975393094665,0.6534147886572829 v12.641821079713173 c0,0.3623625438797103 0.3881745220111289,0.6538872972265442 0.8706718250716886,0.6538872972265442 h12.18940555100364 c0.4824973030605619,0 0.8706718250716886,-0.2915247533468346 0.8706718250716886,-0.6538872972265442 V4.358776139607697 H8.994718394868137 c-0.47886950378942883,0 -0.8706718250716886,-0.2942492837519449 -0.8706718250716886,-0.6538872972265442 zm2.773452542780442,5.758567464241761 l-3.497924057225508,2.6073755976908415 c-0.24124865153028063,0.18009145977781071 -0.6308742932498614,0.18009145977781071 -0.872122944780142,0 l-3.497924057225508,-2.6073755976908415 C2.661306427325829,9.189096094828278 2.9196057354304337,8.718024787784655 3.437655471348084,8.718024787784655 H5.802255036271947 v-2.1796243240884783 c0,-0.24084848781177734 0.2597504278130543,-0.4359248648176966 0.5804478833811269,-0.4359248648176966 h1.1608957667622521 c0.3206974555680725,0 0.5804478833811269,0.1950763770059196 0.5804478833811269,0.4359248648176966 v2.1796243240884783 h2.3645995649238625 c0.5180497359176551,0 0.7763490440222554,0.47107130704362293 0.4088529778565816,0.7454315188382611 zM13.674579454628462,2.86028441679687 L10.122963968190199,0.1902446197884852 c-0.16325096720094195,-0.12260386822997718 -0.38454672273999646,-0.1907171283577423 -0.6167258760924463,-0.1907171283577423 H9.284942336558702 v3.4873989185415644 h4.643583067049007 v-0.16619635471174685 c0,-0.1716454155219681 -0.09069498177830096,-0.33784177023371487 -0.2539459489792431,-0.46044563846369135 z"
                  fill="#fff"
                />
              </svg>
            </a>
            <a
              href="#"
              class="darkblue-btn"
              data-toggle="modal"
              data-target="#exampleModalCenter"
              id="add_quesn_btn"
              title="Add Questions"
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
              class="darkblue-btn"
              id="save_edit"
              v-if="isGlobalEdit"
              @click="submit_question"
            >
              Save
            </a>
            <a
              href="javascript:void(0)"
              class="red-btn"
              @click="delete_selected"
              id="delete_question"
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
                            @change="selected_questions('all')"
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
                        id="global_edit_question_icn"
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
                    <th scope="col">QUESTION</th>
                    <th scope="col" style="width: 20%">INTENT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(question, index) in questionslist" :key="index">
                    <th scope="row">
                      <div class="form-check checkbox checkbox-success">
                        <label class="form-check-label">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            @change="selected_questions(index)"
                          />
                          <span class="icn"></span>
                        </label>
                      </div>
                    </th>
                    <td class="action">
                      <a href="#" @click="edit_question(question)">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15.392"
                          height="15.392"
                          viewBox="0 0 15.392 15.392"
                          data-toggle="modal"
                          data-target="#exampleModalCenter"
                          id="edit_quesn_btn"
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
                        id="single_delete_question_id"
                        @click="delete_questions(question)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="13.682"
                          height="15.392"
                          viewBox="0 0 13.682 15.392"
                        >
                          <path
                            id="trash-can-outline"
                            d="M8.276,3v.855H4v1.71h.855V16.682a1.71,1.71,0,0,0,1.71,1.71h8.551a1.71,1.71,0,0,0,1.71-1.71V5.565h.855V3.855H13.406V3H8.276M6.565,5.565h8.551V16.682H6.565V5.565m1.71,1.71v7.7h1.71v-7.7H8.276m3.42,0v7.7h1.71v-7.7Z"
                            transform="translate(-4 -3)"
                            fill="#f23d3d"
                          />
                        </svg>
                      </a>
                    </td>
                    <td
                      data-toggle="tooltip"
                      data-placement="bottom"
                      :title="question.question"
                    >
                      <template v-if="!isGlobalEdit">{{
                        question.question
                      }}</template>
                      <template v-else-if="isGlobalEdit">
                        <input
                          class="w-100 form-control edit-column"
                          placeholder="Question"
                          v-model="global_edit_questions_list[index].question"
                      /></template>
                    </td>
                    <td>
                      <template v-if="!isGlobalEdit">{{
                        question.intent
                      }}</template>
                      <template v-else-if="isGlobalEdit">
                        <multiselect
                          v-model="global_edit_questions_list[index].intent"
                          :id="'intent' + index"
                          :options="intentlist"
                          :searchable="true"
                          :close-on-select="true"
                          :show-labels="false"
                        >
                          <span>{{
                            global_edit_questions_list[index].intent
                          }}</span>
                        </multiselect>
                      </template>
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
        id="file_upload"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
        data-backdrop="static"
        data-keyboard="false"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <div class="modal-head d-flex align-items-center">
                <div class="head-icn">
                  <img src="/img/msg-blue.png" alt />
                </div>
                <h3>Upload CSV Files</h3>
              </div>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="clear_file_details"
              >
                <img src="/img/close-icn.png" alt />
              </button>
              <form @submit.prevent="file_submit">
                <div class="form-group">
                  <div class="custom-file">
                    <input
                      type="file"
                      accept=".csv"
                      class="custom-file-input"
                      id="inputGroupFile01"
                      @change="fileinput"
                      aria-describedby="inputGroupFileAddon01"
                    />
                    <label
                      style="font-weight: 400; line-height: 15px"
                      class="custom-file-label form-control"
                      for="file"
                      >{{ file_label }}</label
                    >
                  </div>
                </div>
                <div class="btn-wrap text-right">
                  <a href="#" @click="download_sample">
                    Download Sample Add Questions CSV
                    <i class="fa fa-spinner fa-spin" v-show="spinnerOn"></i>
                  </a>
                  <button
                    type="button"
                    class="btn btn-link"
                    data-dismiss="modal"
                    @click="clear_file_details"
                  >
                    Cancel
                  </button>
                  <button type="submit" class="darkblue-btn">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade dash-modal"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <div class="modal-head d-flex align-items-center">
                <div class="head-icn">
                  <img src="/img/msg-blue.png" alt />
                </div>
                <h3>Add Question</h3>
              </div>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <img src="/img/close-icn.png" alt />
              </button>
              <form @submit.prevent="submit_question">
                <div class="form-group">
                  <label>Your Question</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter your question"
                    v-model.trim="input_fields.question"
                    id="add_question_question"
                  />
                </div>
                <div class="form-group">
                  <label>Select Intent</label>
                  <multiselect
                    v-model="input_fields.intent"
                    id="res_n_int_intent"
                    :options="intentlist"
                    :searchable="true"
                    :close-on-select="true"
                    :show-labels="false"
                  >
                    <span>{{ input_fields.intent }}</span>
                  </multiselect>
                </div>
                <div class="btn-wrap text-right">
                  <button
                    type="button"
                    class="btn btn-link"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="darkblue-btn"
                    id="add_quesn_save"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="pagin-table" style="margin-top: 2%; margin-bottom: 4%">
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
              class="page-item"
              :class="{ active: page === page_no }"
              v-for="(page, index) in page_array"
              :key="index"
            >
              <a
                v-if="page == '...s' || page == '...l'"
                class="page-link"
                href="#"
                @click="page_require(page)"
                >...</a
              >
              <a
                v-if="page != '...s' && page != '...l'"
                class="page-link"
                href="#"
                @click="page_require(page)"
                >{{ page }}</a
              >
              <!-- <a class="page-link" href="#" @click="page_require(page)">{{page}}</a> -->
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
  </div>
</template>

<script>
import axios from "axios";
import api_calls from "@/portal/api_calls";
import Swal from "sweetalert2";
import Multiselect from "vue-multiselect";
import swal from "sweetalert2";
export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      intentlist: [],
      input_fields: {
        intent: "",
        question: "",
      },
      intent: "",
      question: "",
      isEdit: false,
      isGlobalEdit: false,
      global_edit_questions_list: [],
      questionslist: [],
      page_no: 1,
      number_of_rows: 0,
      total_pages: 1,
      per_page: 20,
      checked_list: [],
      spinnerOn: false,
      companyid: null,
      companyname: null,
      user_role: null,
      file_label: "Choose file",
      file_content: "",
      csv_file: "",
      // search_by: '',
      search_name: "",
      page_array: [],
      old_question_data: [],
      new_question_data: [],
      isVisibleSearchClear:false,
      // select_list: ['Question','Intent'],
    };
  },
  watch: {
    isGlobalEdit(newVal) {
      if (Boolean(newVal)) {
        this.global_edit_questions_list = this.questionslist.map(
          ({ question, intent }) => ({ question, intent })
        );
      } else {
        this.global_edit_questions_list = [];
      }
    },
    search_name(){
      if (this.search_name === ""){
      this.get_questions_list();
      this.isVisibleSearchClear = false;
      }
      else if (this.search_name !== ""){
        this.isVisibleSearchClear = true;
      }
    },
  },
  created() {
    this.user_role = this.$session.get("UserInformation").role;
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
      .post(
        api_calls.show_intent_url(),
        {
          company_name: this.companyname,
          company_id: this.companyid,
          email: this.$session.get("UserInformation").email,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens,
          subscription: this.$session.get("UserInformation").subscription,
          showintent: "True",
        },
        {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          },
        }
      )
      .then((response) => {
        if (response.data == "Internal Server Error") {
          toastr.error("Internal Server Error");
        } else {
          for (var i in response.data) {
            this.intentlist.push(
              response.data[i].replace(this.companyid + "_", "")
            );
          }
          this.input_fields.intent = this.intentlist[0];
        }
      })
      .catch((e) => {
        if (
          e.response.status === 410 ||
          e.response.status === 440 ||
          e.response.status === 409
        ) {
          this.$root.$emit("Session_Expired", e.response.data);
        } else {
          toastr.error("Internal Server Error");
        }
      });
    this.get_questions_list();
  },
  mounted() {
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
    $('[data-toggle="tooltip"]').tooltip();
    $("#exampleModalCenter").on("hidden.bs.modal", function (e) {
      vm.clear_fields();
      $("input:checkbox").prop("checked", false);
    });
    if(this.$route.params.modal_open_switch_tab){
      $("#exampleModalCenter").modal("show");
    }
  },
  methods: {
    clear_search_name(){
      this.search_name = "";
    },
    download_csv() {
      axios
        .post(
          api_calls.question_intent_csv(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
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
          var a = window.document.createElement("a");
          a.href = response.data.CSV_URL;
          a.download = true;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
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
    download_sample() {
      event.preventDefault();
      this.spinnerOn = true;
      axios({
        method: "post",
        url: api_calls.file_download(),
        responseType: "blob",
        data: {
          company_id: this.$session.get("UserInformation").company_id,
          company_name: this.$session.get("UserInformation").company_name,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens,
          email: this.$session.get("UserInformation").email,
          sample_file: "False",
        },
        headers: {
          Authorization: `Bearer ${this.$session.get("at")}`,
        },
      })
        .then((response) => {
          var url = window.URL.createObjectURL(new Blob([response.data]));
          var link = document.createElement("a");
          link.href = url;
          // console.log(this.companyname);
          link.setAttribute(
            "download",
            this.companyname + "QuestionIntent.csv"
          );
          document.body.appendChild(link);
          link.click();
          this.spinnerOn = false;
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
        this.search_product();
      }
    },
    search_product() {
      // if(this.search_by!=''){
      if (this.search_name != "") {
        this.spinnerOn = true;
        axios
          .post(
            api_calls.add_question_url(),
            {
              company_id: this.$session.get("UserInformation").company_id,
              company_name: this.$session.get("UserInformation").company_name,
              license_key: this.$session.get("UserInformation").license_key,
              email: this.$session.get("UserInformation").email,
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
            this.spinnerOn = false;
            if (response.data.pagecount != undefined) {
              this.page_no = 1;
              this.questionslist = [];
              this.number_of_rows = response.data.QuestionsList.length;
              this.total_pages = response.data.pagecount;
              for (let i = 0; i < response.data.QuestionsList.length; i++) {
                this.questionslist.push({
                  question: response.data.QuestionsList[i].Question,
                  intent: response.data.QuestionsList[i].Intent.replace(
                    this.companyid + "_",
                    ""
                  ),
                });
              }
              this.setpagination(this.page_no);
            } else if (response.data.MSG == "No Results Found") {
              toastr.error("No Results Found");
            } else {
              setTimeout(() => {
                toastr.error("Internal Server Error");
                // this.$router.go();
                this.get_questions_list();
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
      // }else{
      //   toastr.error("Select header for searching");
      // }
    },
    clear_fields() {
      this.isEdit = false;
      this.input_fields = this.$options.data().input_fields;
    },
    edit_question(question) {
      this.isEdit = true;
      this.old_question_data.push({
        question: question.question,
        intent: this.companyid + "_" + question.intent,
      });
      this.input_fields.question = question.question;
      this.input_fields.intent = question.intent;
    },
    selected_questions(index) {
      if (index == "all") {
        if (event.target.checked) {
          this.checked_list = this.questionslist;
        } else if (!event.target.checked) {
          this.checked_list = [];
        }
      } else {
        if (event.target.checked == true) {
          let val_index = this.checked_list.indexOf(this.questionslist[index]);
          var temp = this.questionslist[index];
          if (val_index == -1) {
            this.checked_list.push(temp);
          }
        } else if (event.target.checked == false) {
          var selectall = document.querySelector("#selectall");
          if (selectall.checked == true) {
            selectall.checked = false;
          }
          var temp = this.checked_list.filter((question) => {
            return question.question !== this.questionslist[index].question;
          });
          this.checked_list = temp;
        }
      }
    },
    submit_question() {
      this.new_question_data.push({
        question: this.input_fields.question,
        intent: `${this.companyid}_${this.input_fields.intent}`,
      });
      if (this.isGlobalEdit) {
        this.spinnerOn = true;
        var vm = this;
        var questions_map = this.questionslist.map(({ question, intent }) => ({
          question,
          intent,
        }));

        //Find values that are in result1 but not in result2
        var uniqueResultOne = questions_map
          .filter(function (obj) {
            return !vm.global_edit_questions_list.some(function (obj2) {
              return obj.question == obj2.question && obj.intent == obj2.intent;
            });
          })
          .map(({ question, intent }) => ({
            question,
            intent: `${vm.companyid}_${intent}`,
          }));

        //Find values that are in result2 but not in result1
        var uniqueResultTwo = vm.global_edit_questions_list
          .filter(function (obj) {
            return !questions_map.some(function (obj2) {
              return obj.question == obj2.question && obj.intent == obj2.intent;
            });
          })
          .map(({ question, intent }) => ({
            question,
            intent: `${vm.companyid}_${intent}`,
          }));

        this.edit_question_api(uniqueResultOne, uniqueResultTwo);
      } else if (
        this.input_fields.question == "" ||
        this.input_fields.intent == ""
      ) {
        toastr.error("Please enter all the fields.");
      } else if (this.isEdit) {
        this.edit_question_api(this.old_question_data, this.new_question_data);
      } else {
        $("#exampleModalCenter").modal("hide");
        this.spinnerOn = true;
        axios
          .post(
            api_calls.add_question_url(),
            {
              edit_intent: this.isEdit,
              company_name: this.companyname,
              company_id: this.companyid,
              new_question_data: this.new_question_data,
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
            this.input_fields = this.$options.data().input_fields;
            this.old_question_data = this.$options.data().old_question_data;
            this.new_question_data = this.$options.data().new_question_data;
            if (response.data == "Internal Server Error") {
              // toastr.error("Internal Server Error");
              Swal({
                type: "error",
                text: "There was an internal server error. Please try again.",
              });
            } else if (response.data.status == "Success") {
              Swal({
                type: "success",
                text: "Your question has been added successfully",
                allowOutsideClick: false,
                allowEscapeKey: false,
              }).then((result) => {
                if (result.value) {
                  this.get_questions_list();
                  // this.$router.go();
                }
              });
            } else if (response.data.status == "Failure") {
              Swal({
                type: "warning",
                text: "The questions already exist.",
              });
            } else if (response.data.status == "Error") {
              Swal({
                type: "error",
                text: "There was an internal server error. Please try again.",
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
            } else {
              Swal({
                type: "error",
                text: "There was an internal server error. Please try again.",
              });
              // toastr.error("Internal Server Error");
            }
          });
      }
    },
    edit_question_api(old_question_data, new_question_data) {
      $("#exampleModalCenter").modal("hide");
      this.spinnerOn = true;
      axios
        .post(
          api_calls.add_question_url(),
          {
            edit_intent: true,
            company_name: this.companyname,
            company_id: this.companyid,
            old_question_data: old_question_data,
            new_question_data: new_question_data,
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
          this.isEdit = false;
          this.isGlobalEdit = false;
          if (response.data == "Internal Server Error") {
            // toastr.error("Internal Server Error");
            Swal({
              type: "error",
              text: "There was an Internal Server Error. Please try again.",
            });
          } else if (response.data.status == "Success") {
            Swal({
              type: "success",
              text: "Question(s) updated successfully",
              allowOutsideClick: false,
              allowEscapeKey: false,
            }).then((result) => {
              if (result.value) {
                // this.$router.go()
                this.get_questions_list();
              }
            });
          } else if (response.data.status == "Failure") {
            Swal({
              type: "warning",
              text: "The questions already exist.",
            });
          } else if (response.data.status == "Error") {
            Swal({
              type: "error",
              text: "There was an internal server error. Please try again.",
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
          } else {
            // toastr.error("Internal Server Error");
            Swal({
              type: "error",
              text: "There was an internal server error. Please try again.",
            });
          }
        });
    },
    delete_selected() {
      if (this.checked_list.length == 0) {
        Swal.fire("No question selected!", "", "error");
      } else if (this.checked_list.length > 0) {
        let questionlist = [],
          intentlist = [];
        for (var i in this.checked_list) {
          questionlist.push(this.checked_list[i].question);
          intentlist.push(this.companyid + "_" + this.checked_list[i].intent);
        }
        this.delete_qns_api(questionlist, intentlist);
      }
    },
    delete_questions(question) {
      let questionlist = [],
        intentlist = [];
      questionlist.push(question.question);
      intentlist.push(this.companyid + "_" + question.intent);
      this.delete_qns_api(questionlist, intentlist);
    },
    delete_qns_api(questionlist, intentlist) {
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
          $("input:checkbox").prop("checked", false);
          this.spinnerOn = true;
          axios
            .post(
              api_calls.delete_question_intent_url(),
              {
                questionlist: questionlist,
                company_name: this.companyname,
                company_id: this.companyid,
                intentlist: intentlist,
                token: this.$session.get("UserInformation").tokens,
                license_key: this.$session.get("UserInformation").license_key,
                subscription: this.$session.get("UserInformation").subscription,
                email: this.$session.get("UserInformation").email,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.spinnerOn = false;
              if (response.data == "Internal Server Error") {
                toastr.error("Internal Server Error");
              } else if (response.data == "Query Executed Successfully") {
                Swal({
                  type: "success",
                  title: "Deleted!",
                  text: "Your question has been deleted.",
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                }).then((res) => {
                  if (res.value) {
                    // this.$router.go();
                    this.get_questions_list();
                  }
                });
              } else {
                toastr.error("Questions not deleted!!");
              }
            })
            .catch((e) => {
              if (
                e.response.status === 410 ||
                e.response.status === 440 ||
                e.response.status === 409
              ) {
                this.$root.$emit("Session_Expired", e.response.data);
              } else {
                toastr.error("Internal Server Error");
              }
            });
        } else {
          $("input:checkbox").prop("checked", false);
        }
      });
    },
    update_questions(message) {
      this.questionslist = [];
      this.total_pages = message.pagecount;
      this.number_of_rows =
        message.show_intent_field.intent_questionlist.length;
      for (var i in message.show_intent_field.intent_questionlist) {
        this.questionslist.push({
          question: message.show_intent_field.intent_questionlist[i],
          intent: message.show_intent_field.intent_intentlist[i].replace(
            this.companyid + "_",
            ""
          ),
        });
      }
    },
    page_require(page) {
      if (page == 0 || page == this.total_pages + 1) {
        event.preventDefault();
      } else {
        if (this.search_name == "") {
          $("input:checkbox").prop("checked", false);
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
              api_calls.load_question_intent_url(),
              {
                company_name: this.companyname,
                email: this.$session.get("UserInformation").email,
                company_id: this.companyid,
                subscription: this.$session.get("UserInformation").subscription,
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
              this.spinnerOn = false;
              this.update_questions(response.data);
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
          $("input:checkbox").prop("checked", false);
          if (page == "...s") {
            this.page_no = Math.ceil((1 + this.page_no) / 2);
          } else if (page == "...l") {
            this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
          } else {
            this.page_no = page;
          }
          axios
            .post(
              api_calls.add_question_url(),
              {
                company_id: this.$session.get("UserInformation").company_id,
                company_name: this.$session.get("UserInformation").company_name,
                license_key: this.$session.get("UserInformation").license_key,
                email: this.$session.get("UserInformation").email,
                token: this.$session.get("UserInformation").tokens,
                issearch: true,
                // searchby: this.search_by,
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
              this.setpagination(this.page_no);
              this.spinnerOn = false;
              if (response.data.pagecount != undefined) {
                this.questionslist = [];
                this.number_of_rows = response.data.QuestionsList.length;
                this.total_pages = response.data.pagecount;
                for (let i = 0; i < response.data.QuestionsList.length; i++) {
                  this.questionslist.push({
                    question: response.data.QuestionsList[i].Question,
                    intent: response.data.QuestionsList[i].Intent.replace(
                      this.companyid + "_",
                      ""
                    ),
                  });
                }
              } else {
                toastr.error("Intrnal Server Error");
                setTimeout(() => {
                  // this.$router.go();
                  this.get_questions_list();
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
    fileinput() {
      if (event.target.files[0].type != "text/csv") {
        Swal({
          type: "error",
          text: "Upload only .csv file",
        }).then((result) => {
          this.file_label = "Choose file";
          this.file_content = "";
        });
      } else if (event.target.files[0].size > 1000000) {
        Swal({
          type: "error",
          text: "Upload file of size less than 1MB",
        }).then((result) => {
          this.file_label = "Choose file";
          this.file_content = "";
        });
      } else {
        this.file_label = event.target.files[0].name;
        var file_name = this.companyname + "IntentFile.csv";
        this.file_content = event.target.files[0];
        this.createCSV(this.file_content);
      }
    },
    createCSV(file, type) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.csv_file = e.target.result.split("base64,")[1];
      };
      reader.readAsDataURL(file);
    },
    file_submit() {
      $("#file_upload").modal("hide");
      this.spinnerOn = true;
      axios
        .post(
          api_calls.upload_question_intent(),
          {
            email: this.$session.get("UserInformation").email,
            token: this.$session.get("UserInformation").tokens,
            company_name: this.$session.get("UserInformation").company_name,
            company_id: this.$session.get("UserInformation").company_id,
            license_key: this.$session.get("UserInformation").license_key,
            file_name: this.file_label,
            file_data: this.csv_file,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          this.spinnerOn = false;
          if (response.data.Msg == "Invalid Header") {
            Swal({
              type: "error",
              text:
                "Please keep the headers of Sample file & Uploaded file same",
            }).then((res) => {
              this.file_label = "Choose file";
              this.file_content = "";
              document.getElementById("inputGroupFile01").value = "";
              // this.$router.go();
              this.get_questions_list();
            });
          } else if (response.data.Msg == "Error while uploading") {
            Swal({
              type: "error",
              text: "There was some error while uploading the file",
            }).then((res) => {
              this.file_label = "Choose file";
              this.file_content = "";
              document.getElementById("inputGroupFile01").value = "";
              // this.$router.go();
              this.get_questions_list();
            });
          } else if (response.data.Msg == "file uploaded successfully") {
            Swal({
              type: "success",
              text: "File Uploaded Successfully",
            }).then((res) => {
              this.file_label = "Choose file";
              this.file_content = "";
              document.getElementById("inputGroupFile01").value = "";
              // this.$router.go();
              this.get_questions_list();
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
    get_questions_list() {
      this.spinnerOn = true;
      axios
        .post(
          api_calls.load_question_intent_url(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            subscription: this.$session.get("UserInformation").subscription,
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
          if (response.data == "Internal Server Error") {
            toastr.error("Internal Server Error");
          } else {
            this.update_questions(response.data);
            this.setpagination(this.page_no);
          }
        })
        .catch((e) => {
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          } else {
            toastr.error("Internal Server Error");
          }
        });
    },
    clear_file_details() {
      this.file_label = "Choose file";
      this.file_content = "";
      document.getElementById("inputGroupFile01").value = "";
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>
<style scoped>
.multiselect__tags {
  border: 1px solid #dbe2e8;
}
tr td {
  height: 50px;
}
.edit-column {
  height: 29px !important;
}
</style>
