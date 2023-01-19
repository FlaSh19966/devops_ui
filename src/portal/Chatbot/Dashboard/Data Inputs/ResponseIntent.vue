<template>
  <!-- TODO Remove the company_id prefix for intents -->
  <div class="dash-cont">
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <div class="container-fluid">
      <div class="card dash-card">
        <div
          class="card-header d-block d-sm-flex flex-wrap justify-content-between"
        >
          <h4 class="mb-sm-0">Responses</h4>
          <div class="card-act d-flex flex-wrap">
            <!-- for search -harsh -->
            <input
              class="form-control search-bar"
              id="search_bar"
              placeholder="Search here"
              v-on:keyup="callsearch"
              v-model="search_name"
            />
            <a
              href="#"
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

            <!-- <button type="submit" class="darkblue-btn" @click="notify_superadmin">Train The Model</button> -->
            <button class="darkblue-btn" @click="train_conversation_model">
              Train The Model
            </button>
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
            <!-- <button type="submit" class="darkblue-btn" @click="download_csv">Do</button> -->
            <a
              href="#"
              @click="add_edit = 'true'"
              class="darkblue-btn"
              data-toggle="modal"
              data-target="#exampleModalCenter"
              id="res_add_quesn_btn"
              title="Add Responses"
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
              href="javascript:void(0)"
              title="Delete"
              class="red-btn"
              @click="delete_selected"
              id="delete_response"
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
                    <th scope="col" style="width: 1%">
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
                    <th scope="col" style="width: 1%">ACTION</th>
                    <th scope="col">RESPONSE</th>
                    <th scope="col" style="width: 1%">INTENT</th>
                    <th scope="col" style="width: 1%">SOURCES</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(row, index) in show_superadmin_data"
                    :key="index"
                    id="list-group"
                  >
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
                      <a href="#" @click="edit_question(index)">
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
                        @click="delete_question(index)"
                        id="single_delete_question_id"
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
                    <!-- <td>{{row.question}}</td> -->
                    <td
                      data-toggle="tooltip"
                      data-placement="bottom"
                      :title="row.response"
                      v-html="row.short"
                    >
                      {{ row.short }}
                      <span v-show="row.short != row.response">...</span>
                    </td>
                    <td>{{ row.intent }}</td>
                    <td>{{ row.source }}</td>
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
                @click="empty_variable"
              >
                <img src="/img/close-icn.png" alt />
              </button>
              <form @submit="file_submit">
                <div class="form-group">
                  <div class="custom-file">
                    <input
                      type="file"
                      accept=".csv"
                      class="custom-file-input"
                      @change="fileinput"
                      id="inputGroupFile01"
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
                  <a href="#" @click="download_sample_file">
                    Download Sample CSV File
                    <i
                      class="fa fa-spinner fa-spin"
                      v-show="spinnerOnFileDownload"
                    ></i>
                  </a>
                  <button
                    type="button"
                    class="btn btn-link"
                    @click="empty_variable"
                    data-dismiss="modal"
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
                <h3>Add Responses</h3>
              </div>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="empty_variable"
              >
                <img src="/img/close-icn.png" alt />
              </button>
              <form @submit="add_edit_question">
                <div class="form-group">
                  <span>Response with Image :</span>
                  <div>
                    <center>
                      <div class="radio" style="margin-bottom: 3%">
                        <label>
                          <input
                            type="radio"
                            v-model="image_response"
                            value="Yes"
                          />
                          <span class="icn"></span> Yes
                        </label>
                        <label>
                          <input
                            type="radio"
                            v-model="image_response"
                            value="No"
                          />
                          <span class="icn"></span> No
                        </label>
                      </div>
                    </center>
                    <div
                      class="custom-file"
                      v-show="image_response == 'Yes'"
                      style="margin-bottom: 5%"
                    >
                      <input
                        type="file"
                        accept="image/x-png, image/gif, image/jpeg"
                        class="custom-file-input"
                        @change="fileinput2"
                        aria-describedby="inputGroupFileAddon01"
                      />
                      <label
                        style="font-weight: 400; line-height: 15px"
                        class="custom-file-label form-control"
                        for="file"
                        >{{ file_label2 }}</label
                      >
                    </div>
                  </div>
                  <div class="form-group">
                    <span>Response with Video :</span>
                    <div>
                      <center>
                        <div class="radio" style="margin-bottom: 3%">
                          <label>
                            <input
                              type="radio"
                              id="res_video_type"
                              v-model="video_response"
                              value="Yes"
                            />
                            <span class="icn" id="res_video_icn"></span> Yes
                          </label>
                          <label>
                            <input
                              type="radio"
                              v-model="video_response"
                              value="No"
                            />
                            <span class="icn"></span> No
                          </label>
                        </div>
                      </center>
                    </div>
                    <div
                      v-show="video_response == 'Yes'"
                      style="margin-bottom: 5%"
                    >
                      <input
                        id="res_video_url"
                        type="url"
                        class="form-control"
                        placeholder="Enter only URL"
                        v-model="video_link"
                        @change="embedded_change"
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <div id="editor" style="height: 150px"></div>
                  </div>
                </div>

                <div class="form-group">
                  <label>Select Intent</label>
                  <multiselect
                    v-model="intents"
                    id="res_n_int_intent"
                    :disabled="add_edit == 'false'"
                    :options="intentlist"
                    :searchable="true"
                    :close-on-select="true"
                    :show-labels="false"
                    style="width: auto; border: none"
                  >
                    <span>{{ intents }}</span>
                  </multiselect>
                </div>
                <div class="form-group">
                  <label>Select Source</label>
                  <select
                    class="form-control"
                    v-model="source"
                    id="res_n_int_source"
                  >
                    <option
                      v-for="(option, index) in options"
                      :key="index"
                      :value="option"
                    >
                      {{ option }}
                    </option>
                  </select>
                </div>
                <div class="btn-wrap text-right">
                  <button
                    type="button"
                    class="btn btn-link"
                    data-dismiss="modal"
                    @click="empty_variable"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="darkblue-btn"
                    id="res_n_int_save"
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
              :class="'page-item ' + pagination_class(page_number)"
              v-for="page_number in page_array"
              :key="page_number"
            >
              <a
                v-if="page_number == '...s' || page_number == '...l'"
                class="page-link"
                href="#"
                @click="page_require(page_number)"
                >...</a
              >
              <a
                v-if="page_number != '...s' && page_number != '...l'"
                class="page-link"
                href="#"
                @click="page_require(page_number)"
                >{{ page_number }}</a
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
  </div>
</template>

<script>
import swal from "sweetalert2";
import axios from "axios";
import Swal from "sweetalert2";
import { setTimeout } from "timers";
import api_calls from "@/portal/api_calls";
import Multiselect from "vue-multiselect";
import moment from "moment";
export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      show_superadmin_data: [],
      add_superadmin_data: [],
      intentlist: [],
      source: "Web",
      options: [],
      checked_list: [],
      intents: "",
      page_no: 1,
      per_page: 20,
      total_pages: null,
      number_of_rows: null,
      response: "",
      add_edit: "false",
      file_label: "Choose file",
      file_label2: "Choose file",
      companyname: null,
      companyid: null,
      spinnerOn: false,
      file_content: "",
      file_content2: "",
      image_response: "No",
      video_response: "No",
      file_type: "",
      image_urls: [],
      image_url: "",
      name_file: "",
      temp_file_name: "",
      image_edit: false,
      quill: "",
      user_role: this.$session.get("UserInformation").role,
      video_link: "",
      embd_link: "",
      video_url: [],
      search_name: "",
      page_array: [],
      spinnerOnFileDownload: false,
      // select_list: ['Response','Intent','Sources'],
      // search_by: '',
    };
  },
  created() {
    if (
      !this.$session.has("CompanyId") &&
      this.$session.get("UserInformation").role == "SuperAdmin"
    ) {
      toastr.warning(this.tlt('select_company_name_msg2'));
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
    this.load_questions_response();
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
        for (var i in response.data) {
          this.intentlist.push(
            response.data[i].replace(this.companyid + "_", "")
          );
        }
        this.intents = this.intentlist[0];
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
    var vm = this;
    $("#exampleModalCenter").on("hidden.bs.modal", function (e) {
      vm.empty_variable();
    });

    this.quill = new Quill("#editor", {
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          [{ font: [] }],
          ["bold", "italic", "underline"],
          ["code-block", "link"],
          [{ align: [] }],
          [{ color: [] }, { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
        ],
      },
      theme: "snow",
      placeholder: "Response",
    });
    this.quill.on("text-change", () => {
      this.$emit(
        "input",
        this.quill.getText() ? this.quill.root.innerHTML : ""
      );
      this.response = this.quill.getText() ? this.quill.root.innerHTML : "";
    });
    if(this.$route.params.modal_open_switch_tab){
      $("#exampleModalCenter").modal("show");
    }
  },
  methods: {
    load_questions_response() {
      this.spinnerOn = true;
      axios
        .post(
          api_calls.load_question_response_url(),
          {
            role: this.user_role,
            company_name: this.companyname,
            email: this.$session.get("UserInformation").email,
            company_id: this.companyid,
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
          this.total_pages = response.data.pagecount;
          this.update_qns(response.data);
          this.image_urls = response.data.show_intent_field.image_url;
          this.video_urls = response.data.show_intent_field.video_url;
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
      axios
        .get(api_calls.source_list_url(), {
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          },
        })
        .then((response) => {
          this.options = response.data;
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
    download_csv() {
      axios
        .post(
          api_calls.question_response_csv(),
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
    embedded_change() {
      var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      var match = this.video_link.match(regExp);

      if (match && match[2].length == 11) {
        // console.log(match[2]);
      } else {
        return "error";
      }
      this.embd_link = "https://www.youtube.com/embed/" + match[2];
      // console.log(this.embd_link);
    },
    download_sample_file() {
      event.preventDefault();
      this.spinnerOnFileDownload = true;
      axios({
        method: "post",
        url: api_calls.file_download(),
        responseType: "blob",
        data: {
          sample_file: "True",
          company_id: this.$session.get("UserInformation").company_id,
          company_name: this.$session.get("UserInformation").company_name,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens,
          email: this.$session.get("UserInformation").email,
        },
        headers: {
          Authorization: `Bearer ${this.$session.get("at")}`,
        },
      })
        .then((response) => {
          // swal(
          //   "Please don't edit the file name",
          //   "You clicked the button!",
          //   "error"
          // );
          var url = window.URL.createObjectURL(new Blob([response.data]));
          var link = document.createElement("a");
          link.href = url;
          // console.log(this.companyname)
          link.setAttribute("download", this.companyname + "IntentFile.csv");
          document.body.appendChild(link);
          link.click();
          $("#file_upload").modal("hide");
          this.spinnerOnFileDownload = false;
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
    fileinput() {
      this.file_label = event.target.files[0].name;
      var file_name = this.companyname + "IntentFile.csv";
      if (this.file_label != file_name) {
        Swal({
          type: "error",
          text:
            "Users need to download the Intent File from 'Upload CSV Files' pop-up. Changes to this file will be accepted by the system.",
          timer:3000,
        });
        this.file_label = "Choose file";
      } else {
        this.file_content = event.target.files[0];
      }
    },
    fileinput2(event) {
      let files = event.target.files[0];
      this.file_label2 = event.target.files[0].name;
      this.file_type = event.target.files[0].type;
      // console.log(files)
      // console.log(event.target.files[0])
      if (this.file_label2 != this.temp_file_name) {
        this.image_edit = true;
      }
      if (this.file_type == "image/png") {
        this.createImage(files, this.file_type);
      } else if (this.file_type == "image/jpeg") {
        this.createImage(files, this.file_type);
      } else {
        Swal({
          type: "error",
          text: "Users need to upload only jpeg/png files",
          timer:2500,
        });
        this.file_label2 = "Choose file";
      }
    },
    createImage(file, type) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.file_content2 = e.target.result.split("base64,")[1];
      };
      reader.readAsDataURL(file);
    },
    file_submit() {
      event.preventDefault();
      var user_details = {
        email: this.$session.get("UserInformation").email,
        token: this.$session.get("UserInformation").tokens,
        company_name: this.companyname,
        company_id: this.companyid,
        license_key: this.$session.get("UserInformation").license_key,
      };
      var json = JSON.stringify(user_details);
      var blob = new Blob([json], {
        type: "application/json",
      });
      if (this.file_label == "Choose file") {
      } else {
        const fd = new FormData();
        fd.append(
          "file",
          this.file_content,
          this.companyname + "IntentFile.csv"
        );
        fd.append("json", blob);
        $("#file_upload").modal("hide");
        this.spinnerOn = true;
        axios
          .post(api_calls.upload_file_url(), fd, {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          })
          .then((response) => {
            this.spinnerOn = false;
            if (response.data == "file uploaded successfully") {
              swal({
                title: "File uploaded successfully",
                type: "success",
                timer:2000,
              }).then((result) => {
                if (result.value) {
                  // $('#file_upload').modal('hide');
                  // this.$router.go();
                  this.load_questions_response();
                }
              });
            } else {
              swal({
                title: "Some Error Occurred",
                type: "error",
                timer:2000,
              }).then((result) => {
                // $('#file_upload').modal('hide');
                this.file_label = "Choose file";
                document.getElementById("inputGroupFile01").value = "";
                this.load_questions_response();
              });
            }
            // $("#file_upload").modal("hide");
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
    selected_questions(index) {
      // debugger;
      if (index == "all") {
        if (event.target.checked) {
          this.checked_list = this.show_superadmin_data;
        } else if (!event.target.checked) {
          this.checked_list = [];
        }
      } else {
        if (event.target.checked == true) {
          let val_index = this.checked_list.indexOf(
            this.show_superadmin_data[index]
          );
          var temp = this.show_superadmin_data[index];
          if (val_index == -1) {
            this.checked_list.push(temp);
          }
        } else if (event.target.checked == false) {
          var selectall = document.querySelector("#selectall");
          if (selectall.checked == true) {
            selectall.checked = false;
          }
          var temp = this.checked_list.filter((question) => {
            return question.question !== index;
          });
          this.checked_list = temp;
        }
      }
    },
    delete_selected() {
      // debugger;
      if (this.checked_list.length == 0) {
        Swal({
          type: "error",
          text: "No response selected!!",
          timer:2000,
        });
      } else {
        let questionlist = [],
          responselist = [],
          intentlist = [],
          sourcelist = [];
        for (var i in this.checked_list) {
          questionlist.push(this.checked_list[i].question);
          responselist.push(this.checked_list[i].response);
          sourcelist.push(this.checked_list[i].source);
          intentlist.push(this.companyid + "_" + this.checked_list[i].intent);
        }
        this.delete_qns_api(questionlist, responselist, sourcelist, intentlist);
      }
    },
    delete_question(index) {
      let questionlist = [],
        responselist = [],
        intentlist = [],
        sourcelist = [];
      questionlist.push(this.show_superadmin_data[index].question);
      // console.log(this.show_superadmin_data[index].question);
      responselist.push(this.show_superadmin_data[index].response);
      sourcelist.push(this.show_superadmin_data[index].source);
      intentlist.push(
        this.companyid + "_" + this.show_superadmin_data[index].intent
      );
      this.delete_qns_api(questionlist, responselist, sourcelist, intentlist);
    },
    callsearch() {
      if (event.keyCode === 13) {
        this.search_intent();
      }
    },
    search_intent() {
      // if(this.search_by!=''){
      if (this.search_name != "") {
        this.spinnerOn = true;
        axios
          .post(
            api_calls.add_response_intent_url(),
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
              this.show_superadmin_data = [];
              this.number_of_rows = response.data.ResponseList.length;
              this.total_pages = response.data.pagecount;
              for (let i = 0; i < response.data.ResponseList.length; i++) {
                this.show_superadmin_data.push({
                  response: response.data.ResponseList[i].Response,
                  source: response.data.ResponseList[i].Source,
                  intent: response.data.ResponseList[i].Intent.replace(
                    this.companyid + "_",
                    ""
                  ),
                  short: response.data.ResponseList[i].Response.slice(
                    0,
                    70
                  ).replace(/(<([^>]+)>)/g, ""),
                });
              }
              this.setpagination(this.page_no);
            } else if (response.data.MSG == "No Results Found") {
              toastr.error("No Response Found");
              // setTimeout(() => {
              //   this.$router.go();
              // }, 2500);
              this.load_questions_response();
            } else {
              toastr.error("Internal Server Error");
              // setTimeout(() => {
              //   this.$router.go();
              // }, 2500);
              this.load_questions_response();
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
    empty_variable() {
      // event.preventDefault();
      this.response = "";
      // this.$emit(
      //   "input",
      //    ""
      // );
      this.quill.setText("");
      this.source = "Web";
      this.intents = this.intentlist[0];
      this.file_label = "Choose file";
      this.image_url = "";
      this.image_response = "No";
      (this.video_link = ""), (this.embd_link = "");
      this.file_label = "Choose file";
      this.file_content = "";
      document.getElementById("inputGroupFile01").value = "";
    },
    train_conversation_model() {
      Swal({
        title: "Are You Sure?",
        text: "You want to Train The Model?",
        type: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Confirm!",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.value) {
          axios
            .post(
              api_calls.train_conversation_models(),
              {
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                subscription: this.$session.get("UserInformation").subscription,
                company_details: {
                  company_name: this.companyname,
                  company_id: this.companyid,
                },
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              if (response.data.MSG_CODE === 4046) {
                toastr.success(response.data.MSG);
              } else if (response.data.MSG_CODE === 1034) {
                toastr.error(response.data.MSG);
              } else {
                toastr.error("Internal Server Error");
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
    notify_superadmin() {
      event.preventDefault();
      if (this.show_superadmin_data.length >= 10) {
        axios
          .post(
            api_calls.notify_superadmin_url(),
            {
              company_name: this.companyname,
              company_id: this.companyid,
              email: this.$session.get("UserInformation").email,
              token: this.$session.get("UserInformation").tokens,
              license_key: this.$session.get("UserInformation").license_key,
              subject: "Notification to train the bot",
              body:
                this.companyname +
                "has requested to train the model to improve intent accuracy",
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            if (response.data.Msg == "A mail has been sent to your email") {
              toastr.success("The Model has been marked to be trained.");
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
        toastr.error("You must have minimum 10 questions to train your model");
      }
    },
    delete_qns_api(questionlist, responselist, sourcelist, intentlist) {
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
              api_calls.multiple_delete_url(),
              {
                questions_list: questionlist,
                response_list: responselist,
                company_name: this.companyname,
                company_id: this.companyid,
                source_list: sourcelist,
                token: this.$session.get("UserInformation").tokens,
                license_key: this.$session.get("UserInformation").license_key,
                subscription: this.$session.get("UserInformation").subscription,
                email: this.$session.get("UserInformation").email,
                intent_list: intentlist,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              if (response.data == "Query Executed Successfully") {
                this.checked_list = [];
                Swal({
                  title: "Deleted!",
                  type: "success",
                  text: "Your response has been deleted.",
                  timer:2000,
                });
                this.spinnerOn = true;
                setTimeout(() => {
                  $("input:checkbox").prop("checked", false);
                  // this.$router.go();
                  this.load_questions_response();
                }, 2500);
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
              }
            });
        }
      });
    },
    update_qns(message) {
      this.show_superadmin_data = [];
      this.number_of_rows =
        message.show_intent_field.intent_questionlist.length;
      // this.total_pages = Math.ceil(this.number_of_rows / this.per_page);
      var questionlist, responselist, sourcelist;
      var show_questionlist,
        show_responselist,
        show_sourcelist,
        show_intentlist;
      // show_imagelist;
      // if (this.user_role == "SuperAdmin" || this.user_role == "Admin") {
      show_questionlist = message.show_intent_field.intent_questionlist;
      show_responselist = message.show_intent_field.intent_responselist;
      show_sourcelist = message.show_intent_field.intent_sourcelist;
      show_intentlist = message.show_intent_field.intent_intentlist;
      // show_imagelist = message.show_intent_field.image_url;
      for (var i in questionlist) {
        this.add_superadmin_data.push({
          question: questionlist[i],
          response: responselist[i],
          source: sourcelist[i],
          intent: "",
          // image:show_imagelist[i]
        });
      }
      for (var i in show_questionlist) {
        this.show_superadmin_data.push({
          question: show_questionlist[i],
          response: show_responselist[i],
          source: show_sourcelist[i],
          intent: show_intentlist[i].replace(this.companyid + "_", ""),
          short: show_responselist[i].slice(0, 70).replace(/(<([^>]+)>)/g, ""),
        });
      }
      // }
    },
    edit_question(index) {
      this.quill.root.innerHTML = this.show_superadmin_data[index].response;
      this.source = this.show_superadmin_data[index].source;
      this.intents = this.show_superadmin_data[index].intent;
      if (this.image_urls[index] != null) {
        this.image_url = this.image_urls[index];
        this.image_response = "Yes";
        this.name_file = this.image_urls[index].split("/");
        this.temp_file_name = this.name_file[this.name_file.length - 1];
        this.file_label2 = this.temp_file_name;
      } else {
        this.image_response = "No";
      }
      if (this.video_url[index] != undefined && this.video_url[index] != "") {
        this.video_link = this.video_urls[index];
        this.video_response = "Yes";
      } else {
        this.video_response = "No";
      }
      this.add_edit = "false";
    },
    add_edit_question() {
      event.preventDefault();
      var existing_intents = this.show_superadmin_data.filter((question) => {
        return question.intent == this.intents;
      });
      if (this.add_edit == "true") {
        if (this.response == "") {
          toastr.warning("Please enter a valid response");
        } else if (this.user_options == true) {
          toastr.warning("Please select a valid option");
        } else if (this.intents == true) {
          toastr.warning("Please enter a valid intent");
        } else if (existing_intents.length > 0) {
          toastr.warning(
            "This intent has been already added. Please try using another intent."
          );
        } else if (this.file_label2 == "Choose file") {
          $("#exampleModalCenter").modal("hide");
          this.spinnerOn = true;
          axios
            .post(
              api_calls.add_response_intent_url(),
              {
                response: this.response,
                source: this.source,
                intent: this.companyid + "_" + this.intents,
                company_name: this.companyname,
                company_id: this.companyid,
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                subscription: this.$session.get("UserInformation").subscription,
                file_name: null,
                file_data: null,
                video_link: this.embd_link,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.response = "";
              this.source = "";
              this.intents = "";
              var response_api = response.data;
              if (response_api == "Added Successfully") {
                swal({
                  text:
                    "All your questions and responses have been added successfully!!",
                  type: "success",
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                  timer:2500,
                }).then((response) => {
                  if (response.value) {
                    this.load_questions_response();
                    // this.$router.go();
                  }
                });
              } else if (response.data.Msg == "Intent already exist") {
                swal({
                  text:
                    "This Intent is already used, kindly use any other Intent",
                  type: "error",
                  timer:2500,
                });
                setTimeout(() => {
                  this.load_questions_response();
                  // this.$router.go();
                  this.empty_variable();
                }, 1500);
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
          $("#exampleModalCenter").modal("hide");
          this.spinnerOn = true;
          axios
            .post(
              api_calls.add_response_intent_url(),
              {
                response: this.response,
                source: this.source,
                intent: this.companyid + "_" + this.intents,
                company_name: this.companyname,
                company_id: this.companyid,
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                subscription: this.$session.get("UserInformation").subscription,
                file_name: this.file_label2,
                file_data: this.file_content2,
                video_link: this.embd_link,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              var response_api = response.data;
              if (response_api == "Added Successfully") {
                swal({
                  text:
                    "All your questions and responses have been added successfully!!",
                  type: "success",
                  timer:2000,
                });
                setTimeout(() => {
                  this.load_questions_response();
                  // this.$router.go();
                }, 1500);
              } else if (response_api == "Duplicate image") {
                swal({
                  text: "Filename already exist kindly rename the file",
                  type: "error",
                  timer:2500,
                });
                setTimeout(() => {
                  this.load_questions_response();
                  // this.$router.go();
                }, 1500);
              } else if (response.data.Msg == "Intent already exist") {
                swal({
                  text:
                    "This Intent is already used, kindly use any other Intent",
                  type: "error",
                  timer:2500,
                });
                setTimeout(() => {
                  this.load_questions_response();
                  // this.$router.go();
                }, 1500);
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
          this.response = "";
          this.source = "";
          this.intents = "";
          this.file_label2 = "Choose file";
          this.file_content2 = "";
          this.video_link = "";
        }
      } else if (this.add_edit == "false") {
        if (this.response == "") {
          toastr.warning("Please enter a valid response");
        } else if (this.user_options == true) {
          toastr.warning("Please select a valid option");
        } else if (this.intents == true) {
          toastr.warning("Please enter a valid intent");
        } else {
          $("#exampleModalCenter").modal("hide");
          this.spinnerOn = true;
          axios
            .post(
              api_calls.edit_question_url(),
              {
                isDelete: "False",
                response: this.response,
                source: this.source,
                intent: this.companyid + "_" + this.intents,
                company_name: this.companyname,
                company_id: this.companyid,
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                subscription: this.$session.get("UserInformation").subscription,
                old_image_name: this.temp_file_name,
                new_image_name: this.file_label2,
                image_edit: this.image_edit,
                image_blob: this.file_content2,
                video_link: this.embd_link,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.spinnerOn = false;
              if (response.data.Msg == "Query Executed Successfully") {
                // toastr.success("Your Information Updated Successfully!!");
                swal({
                  text: "Your Information Updated Successfully!!",
                  type: "success",
                  timer:2000,
                });
                setTimeout(() => {
                  this.load_questions_response();
                  // this.$router.go();
                }, 1500);
                // $(document).ready(function () {
                //   $(".modal-content").css("display", "none");
                //   location.reload();
                // });
              } else if (response.data.Msg == "Duplicate image") {
                swal({
                  text: "Filename already exist kindly rename the file",
                  type: "error",
                  timer:2500,
                });
                setTimeout(() => {
                  // this.$router.go();
                  this.load_questions_response();
                  $("#file_upload").modal("hide");
                }, 1500);
              } else {
                toastr.error("Your Information has not been Updated!!");
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
    pagination_class(index) {
      if (index == this.page_no) {
        return " active";
      } else {
        return "";
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
    page_require(page) {
      if (page == 0 || page == this.total_pages + 1) {
        event.preventDefault();
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
          // this.page_no = page;
          axios
            .post(
              api_calls.load_question_response_url(),
              {
                role: this.user_role,
                company_name: this.companyname,
                email: this.$session.get("UserInformation").email,
                company_id: this.companyid,
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
              this.total_pages = response.data.pagecount;
              this.update_qns(response.data);
              this.image_urls = response.data.show_intent_field.image_url;
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
          this.spinnerOn = true;
          $("input:checkbox").prop("checked", false);
          // this.page_no = page;
          if (page == "...s") {
            this.page_no = Math.ceil((1 + this.page_no) / 2);
          } else if (page == "...l") {
            this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
          } else {
            this.page_no = page;
          }
          axios
            .post(
              api_calls.add_response_intent_url(),
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
              this.spinnerOn = false;
              if (response.data.pagecount != undefined) {
                this.show_superadmin_data = [];
                this.number_of_rows = response.data.ResponseList.length;
                this.total_pages = response.data.pagecount;
                for (let i = 0; i < response.data.ResponseList.length; i++) {
                  this.show_superadmin_data.push({
                    response: response.data.ResponseList[i].Response,
                    source: response.data.ResponseList[i].Source,
                    intent: response.data.ResponseList[i].Intent.replace(
                      this.companyid + "_",
                      ""
                    ),
                    short: response.data.ResponseList[i].Response.slice(
                      0,
                      70
                    ).replace(/(<([^>]+)>)/g, ""),
                  });
                }
                this.setpagination(this.page_no);
              } else {
                toastr.error("Intrnal Server Error");
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
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css">
.multiselect {
  width: auto;
}
.multiselect__tags {
  border: none;
}
</style>
