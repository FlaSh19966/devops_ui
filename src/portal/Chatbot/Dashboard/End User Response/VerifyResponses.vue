<template>
  <div class="dash-cont">
    <div class="container-fluid">
      <!-- <div class="dash-wrap slim"> -->
      <div class="card dash-card">
        <div
          class="card-header d-block d-sm-flex flex-wrap justify-content-between"
        >
          <h4 class="mb-sm-0">{{tlt('verify_response_heading')}}</h4>
          <div class="card-act d-flex flex-wrap">
            <input
              class="form-control search-bar"
              id="search_bar"
              :placeholder="tlt('search_here')"
              v-model.trim="search_name"
              @keydown.enter="search_question"
            />
            <a type="button" v-if="isVisibleSearchClear" class="btn bg-transparent mt-auto mb-auto py-0" @click="clear_search_name" style="margin-left: -40px; z-index: 10;">
              <img src="/img/close-icn.png" alt />
            </a>
            <a
              href="#"
              class="darkblue-btn"
              @click="search_question"
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
            <button
              id="verify_response_train_model_btn"
              type="submit"
              v-if="!show_sync_button"
              :disabled="intent_model_inprogress == true"
              :style="show_model_progress('style')"
              :title="show_model_progress('title')"
              @click="train_intent_model"
              class="darkblue-btn">
              <i class="fa fa-spinner fa-spin" v-show="intent_model_inprogress"></i>
              {{tlt('verify_response_train_model_btn')}}
            </button>
            <button
              v-else
              class="darkblue-btn ml-3" @click="syn_unsearchable_product">
              {{tlt('verify_response_sync_btn')}}
            </button>
            <button id="verify_response_save_btn" type="submit" class="darkblue-btn" @click="add_questions" >
              {{tlt('save_btn')}}
            </button>
            <a
              href="javascript:void(0)"
              class="red-btn"
              :class="intent_model_inprogress === true ? 'disabled_btn' : ''"
              @click="delete_multiple"
              id="delete_role"
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
              {{tlt('verify_response_delete_btn')}}
            </a>
          </div>
        </div>
        <div class="card-body" id="page">
          <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
            <li class="nav-item">
              <a
                class="nav-link pl-5 pr-5"
                id="user_responses-tab"
                data-toggle="tab"
                href="#user_responses"
                role="tab"
                aria-controls="user_responses"
                @click="view_component_name = 'user_responses'"
                >{{tlt('verify_response_user_response')}}</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link pl-5 pr-5"
                id="unanswered_questions-tab"
                data-toggle="tab"
                href="#unanswered_questions"
                role="tab"
                aria-controls="unanswered_questions"
                @click="view_component_name = 'unanswered_questions'"
                >{{tlt('verify_response_unanswered')}}</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link pl-5 pr-5"
                id="unsearchable_product-tab"
                data-toggle="tab"
                href="#unsearchable_product"
                role="tab"
                aria-controls="unsearchable_product"
                @click="view_component_name = 'unsearchable_product'"
                >{{tlt('verify_response_unsearchable_product')}}</a
              >
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div
              class="tab-pane fade"
              id="unanswered_questions"
              role="tabpanel"
              aria-labelledby="unanswered_questions-tab"
            >
              <template v-if="view_component_name === 'unanswered_questions'">
                <!-- <div class="table-box">
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
                                  @change="question_selected('all')"
                                />
                                <span class="icn"></span>
                              </label>
                            </div>
                          </th>
                          <th scope="col" style="width: 5%">ACTION</th>
                          <th scope="col">QUESTIONS</th>
                          <th scope="col">INTENT</th>
                          <th scope="col" style="width: 2%">SOURCES</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(row, index) in unanswered_list"
                          :key="index"
                          id="list-group"
                        >
                          <template v-if="row.user_response === null">
                            <th scope="col">
                              <div class="form-check checkbox checkbox-success">
                                <label class="form-check-label">
                                  <input
                                    class="form-check-input"
                                    @change="question_selected(index)"
                                    type="checkbox"
                                  />
                                  <span class="icn"></span>
                                </label>
                              </div>
                            </th>
                            <td class="action">
                              <a href="#" @click="edit_item(index)">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="15.392"
                                  height="15.392"
                                  viewBox="0 0 15.392 15.392"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
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
                                    id="trash-can-outline"
                                    d="M8.276,3v.855H4v1.71h.855V16.682a1.71,1.71,0,0,0,1.71,1.71h8.551a1.71,1.71,0,0,0,1.71-1.71V5.565h.855V3.855H13.406V3H8.276M6.565,5.565h8.551V16.682H6.565V5.565m1.71,1.71v7.7h1.71v-7.7H8.276m3.42,0v7.7h1.71v-7.7Z"
                                    transform="translate(-4 -3)"
                                    fill="#f23d3d"
                                  />
                                </svg>
                              </a>
                            </td>
                            <td>{{ row.question }}</td>
                            <td>
                              <div class="form-group">
                                <multiselect
                                  v-model="row.intent"
                                  :searchable="true"
                                  :close-on-select="true"
                                  :show-labels="false"
                                  :options="intent_list"
                                >
                                  <span>{{ row.intent }}</span>
                                </multiselect>
                              </div>
                            </td>
                            <td>{{ row.source }}</td>
                          </template>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="pagin-table" style="margin-top: 2%">
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
                </div> -->
                <unanswered-responses />
              </template>
            </div>
            <div
              class="tab-pane fade"
              id="user_responses"
              role="tabpanel"
              aria-labelledby="user_responses-tab"
            >
              <template v-if="view_component_name === 'user_responses'">
                <!-- <div class="table-box">
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
                                  @change="question_selected('all')"
                                />
                                <span class="icn"></span>
                              </label>
                            </div>
                          </th>
                          <th scope="col" style="width: 5%">ACTION</th>
                          <th scope="col">QUESTIONS</th>
                          <th scope="col">INTENT</th>
                          <th scope="col" style="width: 2%">SOURCES</th>
                          <th scope="col">USER RESPONSES</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(row, index) in unanswered_list"
                          :key="index"
                          id="list-group"
                        >
                          <template v-if="row.user_response !== null">
                            <th scope="col">
                              <div class="form-check checkbox checkbox-success">
                                <label class="form-check-label">
                                  <input
                                    class="form-check-input"
                                    @change="question_selected(index)"
                                    type="checkbox"
                                  />
                                  <span class="icn"></span>
                                </label>
                              </div>
                            </th>
                            <td class="action">
                              <a href="#" @click="edit_item(index)">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="15.392"
                                  height="15.392"
                                  viewBox="0 0 15.392 15.392"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
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
                                    id="trash-can-outline"
                                    d="M8.276,3v.855H4v1.71h.855V16.682a1.71,1.71,0,0,0,1.71,1.71h8.551a1.71,1.71,0,0,0,1.71-1.71V5.565h.855V3.855H13.406V3H8.276M6.565,5.565h8.551V16.682H6.565V5.565m1.71,1.71v7.7h1.71v-7.7H8.276m3.42,0v7.7h1.71v-7.7Z"
                                    transform="translate(-4 -3)"
                                    fill="#f23d3d"
                                  />
                                </svg>
                              </a>
                            </td>
                            <td>{{ row.question }}</td>
                            <td>
                              <div class="form-group">
                                <multiselect
                                  v-model="row.intent"
                                  :searchable="true"
                                  :close-on-select="true"
                                  :show-labels="false"
                                  :options="intent_list"
                                >
                                  <span>{{ row.intent }}</span>
                                </multiselect>
                              </div>
                            </td>
                            <td>{{ row.source }}</td>
                            <td class="text-center">
                              <img
                                :src="thumbs_down_icon"
                                v-if="row.user_feedback == 'dislike'"
                              />
                              <img
                                :src="thumbs_up_icon"
                                v-else-if="row.user_feedback == 'like'"
                              />
                            </td>
                          </template>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="pagin-table" style="margin-top: 2%">
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
                </div> -->
                <unanswered-feedback />
              </template>
            </div>
            <div
              class="tab-pane fade"
              id="unsearchable_product"
              role="tabpanel"
              aria-labelledby="unsearchable_product-tab"
            >
              <template v-if="view_component_name === 'unsearchable_product'">
                <unsearchable-product/>
              </template>
            </div>       
          </div>
        </div>
      </div>
      <!-- <div
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
                <h3>Add Unanswered Question</h3>
              </div>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <img src="/img/close-icn.png" alt />
              </button>
              <form @submit="submit_question">
                <div class="form-group">
                  <label>Your Question</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter your question"
                    v-model="old_question"
                    id="add_question_question"
                  />
                </div>
                <div class="form-group">
                  <label>Select Intent</label>
                  <multiselect
                    v-model="old_intent"
                    id="qus_n_int_intent"
                    :options="intent_list"
                    :searchable="true"
                    :close-on-select="true"
                    :show-labels="false"
                  >
                    <span>{{ old_intent }}</span>
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
      </div> -->

      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";
import Swal from "sweetalert2";
import api_calls from "@/portal/api_calls";
import { setTimeout } from "timers";
import Multiselect from "vue-multiselect";
import unansweredResponses from "./VerifyResponsesUnanswered.vue";
import unansweredFeedback from "./VerifyResponsesUserFeedback.vue";
import unsearchableProduct from "./VerifyResponsesUnsearchableProduct.vue";
import { freeze_portal, show_subscription_expired_swal } from "@/portal/mixins";

export default {
  name: "VerifyResponsePage",
  mixins: [
    freeze_portal,
    show_subscription_expired_swal
  ],
  components: {
    Multiselect,
    unansweredResponses,
    unansweredFeedback,
    unsearchableProduct
  },
  data() {
    return {
      unanswered_list: [],
      user_role: this.$session.get("UserInformation").role,
      companyname: this.$session.get("UserInformation").company_name,
      companyid: this.$session.get("UserInformation").company_id,
      intent_list: [],
      checked_list: [],
      intentlist: "",
      per_page: 10,
      page_no: 1,
      total_pages: 0,
      show_loader: false,
      number_of_rows: null,
      search_name: "",
      page_array: [],
      old_question: "",
      old_intent: "",
      new_intent_list: [],
      old_data: { question: null, intent: null },
      thumbs_down_icon: require("@/portal/assets/img/Group 61.svg"),
      thumbs_up_icon: require("@/portal/assets/img/Group 71.svg"),
      view_component_name: "user_responses",
      isVisibleSearchClear: false,
      intent_model_inprogress: false,
      want_status: true,
      disable_btn_expired: false,
      show_sync_button: false
    };
  },
  mounted() {
    setTimeout(() => {
      this.freeze_portal();
    }, 1000);   
    this.$root.$on("VerifyResponsePageDisabled", (data) =>{
      if(data===true){
        this.disable_btn_expired = true;
      }
    })
    var vm = this;
    $("#selectall").click(function () {
      if ($(this).is(":checked")) {
        $("input:checkbox").prop("checked", true);
      } else {
        vm.checked_list = [];
        $("input:checkbox").prop("checked", false);
      }
    });
    // $("#unanswered_questions-tab").click();
    $("#user_responses-tab").click();
    if (this.$route.params.modal_open_switch_tab === false) {
      // this.view_component_name = "user_responses";
      // $("#user_responses-tab").click();
      $("#unanswered_questions-tab").click();
      this.view_component_name = "unanswered_questions";
      // $("#unsearchable_product-tab").click();
      // this.view_component_name = "unsearchable_product";
    }
    if(this.$route.query.switch === 'true'){
      this.view_component_name = "user_responses";
      $("#user_responses-tab").click();
      $("#unsearchable_product-tab").click();
    }
    this.$root.$emit('change_sidebar_main_menu', 'Training Hub');
    this.$root.$on("send_model_status", data =>{
      if (data == true){
        this.check_intent_model_status();
      }
    })
    this.$root.$on("show_sync_button", (data) => {
      if(data === true){
        this.show_sync_button =true;
      }
      });
    this.check_intent_model_status();
  },
  created() {
    this.load_verify_responses();
  },
  methods: {
      clear_search_name(){
      this.search_name = "";
    },
    check_intent_model_status(){
    this.model_status = this.$session.get("ModelStatus");
    if (this.model_status == "No Failure"){
    this.intent_model_inprogress = false;
    }
    else if (Boolean(this.model_status.intent_model) === true)
    {
     if(this.model_status.intent_model == "InProgress"){
       this.intent_model_inprogress = true;
     }
     else{
       this.intent_model_inprogress = false;
     }
    }
    else{
      this.intent_model_inprogress = false; 
    }
    },
    show_model_progress(index){
      if(this.intent_model_inprogress == true){
         if (index == 'style'){
            return "cursor: not-allowed";
          }
          else if(index == 'title'){
              return this.tlt('verify_response_training_in_progress_msg');
          }
      }
      else{
        return null;
      }
    },
    load_verify_responses(){
    this.show_loader = true;
    this.checked_list = [];
    this.search_name = "";
    if (this.user_role == "SuperAdmin") {
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
    if (this.view_component_name === "unanswered_questions") {
        this.$root.$emit("load_verify_responses_unanswered", true);
      } else if (this.view_component_name === "user_responses") {
        this.$root.$emit("load_verify_responses_user_feedback", true);
      } else if (this.view_component_name === "unsearchable_product") {
        this.$root.$emit("load_verify_responses_user_feedback", true);
      }
    // if (this.companyname !== undefined) {
    //   axios
    //     .post(
    //       api_calls.get_unanswered_url(),
    //       {
    //         companyname: this.companyname,
    //         companyid: this.companyid,
    //         email: this.$session.get("UserInformation").email,
    //         isDelete: "False",
    //         license_key: this.$session.get("UserInformation").license_key,
    //         token: this.$session.get("UserInformation").tokens,
    //         page_no: this.page_no,
    //         per_page: this.per_page,
    //       },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${this.$session.get("at")}`,
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       this.number_of_rows = response.data[0].length;
    //       this.total_pages = response.data[4].pagecount;
    //       var data = response.data;
    //       for (var i in data[0]) {
    //         let temp_int = "";
    //         if (Boolean(data[2][i])) {
    //           temp_int = data[2][i].replace(this.companyid + "_", "");
    //         }
    //         this.unanswered_list.push({
    //           question: data[0][i],
    //           intent: temp_int,
    //           source: data[1][i],
    //           user_response: data[2][i],
    //           user_feedback: data[3][i],
    //           edit: false,
    //         });
    //       }
    //       this.setpagination(this.page_no);
    //       this.show_loader = false;
    //     })
    //     .catch((e) => {
    //       if (
    //         e.response.status === 410 ||
    //         e.response.status === 440 ||
    //         e.response.status === 409
    //       ) {
    //         this.$root.$emit("Session_Expired", e.response.data);
    //       } else {
    //         toastr.error(e.message);
    //       }
    //       this.show_loader = false;
    //     });
    // }
    // axios
    //   .post(
    //     api_calls.get_unanswered_url(),
    //     {
    //       companyid: this.companyid,
    //       companyname: this.companyname,
    //       isDropdown: "True",
    //       email: this.$session.get("UserInformation").email,
    //       license_key: this.$session.get("UserInformation").license_key,
    //       token: this.$session.get("UserInformation").tokens,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${this.$session.get("at")}`,
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     for (var i in response.data[0]) {
    //       this.intent_list.push(
    //         response.data[0][i].replace(this.companyid + "_", "")
    //       );
    //       this.new_intent_list.push(
    //         response.data[0][i].replace(this.companyid + "_", "")
    //       );
    //     }
    //   })
    //   .catch((e) => {
    //     if (
    //       e.response.status === 410 ||
    //       e.response.status === 440 ||
    //       e.response.status === 409
    //     ) {
    //       this.$root.$emit("Session_Expired", e.response.data);
    //     }
    //   });
    },
    train_intent_model() {
      if(!this.disable_btn_expired){
         event.preventDefault();
      // if (this.unanswered_list.length >= 1) {
        Swal({
          title: this.tlt('verify_resp_swal_alert_msg'),
          text: this.tlt('verify_resp_train_model_msg'),
          type: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: this.tlt('verify_resp_swal_confirm_msg'),
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.value) {
            axios
              .post(
                api_calls.train_intent_model(),
                {
                  company_id: this.$session.get("UserInformation").company_id,
                  company_name: this.$session.get("UserInformation")
                    .company_name,
                  email: this.$session.get("UserInformation").email,
                  license_key: this.$session.get("UserInformation").license_key,
                  token: this.$session.get("UserInformation").tokens,
                  epochs: 100,
                  update_model: true,
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.$session.get("at")}`,
                  },
                }
              )
              .then((response) => {
                this.want_status = true;
                this.$root.$emit("want_model_status",this.want_status);
              this.check_intent_model_status();
                if (response.data.message.MSG_CODE == this.api_status_code.CORE_MODEL_IS_BEING_TRAINED.MSG_CODE) {
                  toastr.success(response.data.message.MSG);
                }else if (response.data.message.MSG_CODE == this.api_status_code.INTENT_MODEL_BEING_TRAINED_PREMIUM.MSG_CODE) {
                  toastr.success(response.data.message.MSG);
                } else if (response.data.message.MSG_CODE == this.api_status_code.TRAINING_LIMIT_EXCEED.MSG_CODE) {
                  toastr.error(response.data.message.MSG);
                }else {
                  this.big_spinner = false;
                    Swal({
                    title: response.data.message.MSG_CODE,
                    text: response.data.message.MSG,
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 2500,
                    type: "error"
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
        });}else{
          this.show_subscription_expired_swal();
        }
      // } else {
      //   toastr.error("You must have atleast one question to train your model");
      // }
    },
    search_question() {
      if (this.view_component_name === "unanswered_questions") {
        this.$root.$emit("search_unanswered", this.search_name);
      } else if (this.view_component_name === "user_responses") {
        this.$root.$emit("search_user_responses", this.search_name);
      }else if (this.view_component_name === "unsearchable_product") {
        this.$root.$emit("search_user_responses", this.search_name);
      }
      // if(this.search_by!=''){
      // console.log("hey");
      // if (this.search_name != "") {
      //   this.spinnerOn = true;
      //   axios
      //     .post(
      //       api_calls.get_unanswered_url(),
      //       {
      //         companyid: this.$session.get("UserInformation").company_id,
      //         companyname: this.$session.get("UserInformation").company_name,
      //         license_key: this.$session.get("UserInformation").license_key,
      //         email: this.$session.get("UserInformation").email,
      //         token: this.$session.get("UserInformation").tokens,
      //         issearch: true,
      //         // searchby: this.search_by,
      //         key: this.search_name,
      //         per_page: this.per_page,
      //         page_no: 1,
      //       },
      //       {
      //         headers: {
      //           Authorization: `Bearer ${this.$session.get("at")}`,
      //         },
      //       }
      //     )
      //     .then((response) => {
      //       this.spinnerOn = false;
      //       if (response.data.MSG == "No Questions Found") {
      //         toastr.error("No Question Found");
      //         setTimeout(() => {
      //           this.$router.go();
      //         }, 2500);
      //       } else if (response.data[4].pagecount != undefined) {
      //         this.page_no = 1;
      //         this.unanswered_list = [];
      //         this.number_of_rows = response.data[0].length;
      //         this.total_pages = response.data[4].pagecount;
      //         var data = response.data;
      //         for (var i in response.data[0]) {
      //           this.unanswered_list.push({
      //             question: response.data[0][i],
      //             intent: "",
      //             source: response.data[1][i],
      //             user_response: data[2][i],
      //             user_feedback: data[3][i],
      //             edit: false,
      //           });
      //         }
      //         this.setpagination(this.page_no);
      //       }
      //       // else if (response.data.MSG == "No Questions Found") {
      //       //   toastr.error("No Question Found");
      //       //   setTimeout(() => {
      //       //     this.$router.go();
      //       //   }, 2500);
      //       // }
      //       else {
      //         toastr.error("Internal Server Error");
      //         // setTimeout(() => {
      //         //     this.$router.go();
      //         //   }, 2500);
      //       }
      //     })
      //     .catch((e) => {
      //       if (
      //         e.response.status === 410 ||
      //         e.response.status === 440 ||
      //         e.response.status === 409
      //       ) {
      //         this.$root.$emit("Session_Expired", e.response.data);
      //       }
      //     });
      // } else {
      //   toastr.error("Enter proper data for searching");
      // }
      // }else{
      //   toastr.error("Select header for searching");
      // }
    },
    // setpagination(page_no) {
    //   this.page_array = [];
    //   if (this.total_pages <= 7) {
    //     for (let i = 0; i < this.total_pages; i++) {
    //       this.page_array.push(i + 1);
    //     }
    //   } else if (page_no == 1) {
    //     for (let i = 0; i < 4; i++) {
    //       this.page_array.push(i + 1);
    //     }
    //     this.page_array.push("...l");
    //     this.page_array.push(this.total_pages);
    //   } else if (page_no == this.total_pages) {
    //     this.page_array.push(1);
    //     this.page_array.push("...s");
    //     for (let i = this.total_pages - 4; i < this.total_pages; i++) {
    //       this.page_array.push(i + 1);
    //     }
    //   } else if (page_no <= 4) {
    //     for (let i = 0; i < page_no + 3; i++) {
    //       this.page_array.push(i + 1);
    //     }
    //     this.page_array.push("...l");
    //     this.page_array.push(this.total_pages);
    //   } else if (page_no >= this.total_pages - 4) {
    //     this.page_array.push(1);
    //     this.page_array.push("...s");
    //     for (let i = page_no - 4; i < this.total_pages; i++) {
    //       this.page_array.push(i + 1);
    //     }
    //   } else {
    //     this.page_array.push(1);
    //     this.page_array.push("...s");
    //     for (let i = page_no - 3; i <= page_no + 3; i++) {
    //       this.page_array.push(i);
    //     }
    //     this.page_array.push("...l");
    //     this.page_array.push(this.total_pages);
    //   }
    // },
    // page_require(page) {
    //   if (page == 0 || page == this.total_pages + 1) {
    //   } else {
    //     $("input:checkbox").prop("checked", false);
    //     if (page == "...s") {
    //       this.page_no = Math.ceil((1 + this.page_no) / 2);
    //     } else if (page == "...l") {
    //       this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
    //     } else {
    //       this.page_no = page;
    //     }
    //     if (this.search_name == "") {
    //       axios
    //         .post(
    //           api_calls.get_unanswered_url(),
    //           {
    //             companyname: this.companyname,
    //             companyid: this.companyid,
    //             email: this.$session.get("UserInformation").email,
    //             license_key: this.$session.get("UserInformation").license_key,
    //             token: this.$session.get("UserInformation").tokens,
    //             subscription: this.$session.get("UserInformation").subscription,
    //             isDelete: "False",
    //             page_no: this.page_no,
    //             per_page: this.per_page,
    //           },
    //           {
    //             headers: {
    //               Authorization: `Bearer ${this.$session.get("at")}`,
    //             },
    //           }
    //         )
    //         .then((response) => {
    //           this.unanswered_list = [];
    //           for (var i in response.data[0]) {
    //             this.unanswered_list.push({
    //               question: response.data[0][i],
    //               intent: "",
    //               source: response.data[1][i],
    //               user_response: response.data[2][i],
    //               user_feedback: response.data[3][i],
    //               edit: false,
    //             });
    //           }
    //           this.setpagination(this.page_no);
    //         })
    //         .catch((e) => {
    //           if (
    //             e.response.status === 410 ||
    //             e.response.status === 440 ||
    //             e.response.status === 409
    //           ) {
    //             this.$root.$emit("Session_Expired", e.response.data);
    //           }
    //         });
    //     } else {
    //       axios
    //         .post(
    //           api_calls.get_unanswered_url(),
    //           {
    //             companyid: this.$session.get("UserInformation").company_id,
    //             companyname: this.$session.get("UserInformation").company_name,
    //             license_key: this.$session.get("UserInformation").license_key,
    //             email: this.$session.get("UserInformation").email,
    //             token: this.$session.get("UserInformation").tokens,
    //             issearch: true,
    //             // searchby: this.search_by,
    //             key: this.search_name,
    //             per_page: this.per_page,
    //             page_no: page,
    //           },
    //           {
    //             headers: {
    //               Authorization: `Bearer ${this.$session.get("at")}`,
    //             },
    //           }
    //         )
    //         .then((response) => {
    //           this.spinnerOn = false;
    //           if (response.data[4].pagecount != undefined) {
    //             this.page_no = page;
    //             this.unanswered_list = [];
    //             this.number_of_rows = response.data[0].length;
    //             this.total_pages = response.data[4].pagecount;
    //             var data = response.data;
    //             for (var i in response.data[0]) {
    //               this.unanswered_list.push({
    //                 question: response.data[0][i],
    //                 intent: "",
    //                 source: response.data[1][i],
    //                 user_response: response.data[2][i],
    //                 user_feedback: response.data[3][i],
    //                 edit: false,
    //               });
    //             }
    //             this.setpagination(this.page_no);
    //           } else {
    //             toastr.error("Internal Server Error");
    //             // setTimeout(() => {
    //             //   this.$router.go();
    //             // }, 2500);
    //             this.load_verify_responses();
    //           }
    //         })
    //         .catch((e) => {
    //           if (
    //             e.response.status === 410 ||
    //             e.response.status === 440 ||
    //             e.response.status === 409
    //           ) {
    //             this.$root.$emit("Session_Expired", e.response.data);
    //           }
    //         });
    //     }
    //   }
    // },
    // page_change(page_no) {
    //   axios
    //     .post(
    //       api_calls.get_unanswered_url(),
    //       {
    //         companyname: this.companyname,
    //         companyid: this.companyid,
    //         email: this.$session.get("UserInformation").email,
    //         license_key: this.$session.get("UserInformation").license_key,
    //         token: this.$session.get("UserInformation").tokens,
    //         subscription: this.$session.get("UserInformation").subscription,
    //         page_no: this.page_no,
    //         per_page: this.per_page,
    //       },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${this.$session.get("at")}`,
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       this.number_of_rows = response.data[3].number_of_rows;
    //       this.total_pages = Math.ceil(this.number_of_rows / this.per_page);
    //       for (var i in response.data[0]) {
    //         this.unanswered_list.push({
    //           question: response.data[0][i],
    //           intent: "",
    //           source: response.data[1][i],
    //           user_response: response.data[2][i],
    //           user_feedback: response.data[3][i],
    //           edit: false,
    //         });
    //       }
    //     })
    //     .catch((e) => {
    //       if (
    //         e.response.status === 410 ||
    //         e.response.status === 440 ||
    //         e.response.status === 409
    //       ) {
    //         this.$root.$emit("Session_Expired", e.response.data);
    //       }
    //     });
    // },
    // question_selected(value) {
    //   if (event.target.checked) {
    //     if (value == "all") {
    //       for (var i in this.unanswered_list) {
    //         this.checked_list.push(this.unanswered_list[i]);
    //       }
    //     } else {
    //       this.checked_list.push(this.unanswered_list[value]);
    //     }
    //   } else if (!event.target.checked) {
    //     if (value != "all") {
    //       var selectall = document.querySelector("#selectall");
    //       if (selectall.checked) {
    //         selectall.checked = false;
    //       }
    //       var temp = this.checked_list.filter((question) => {
    //         return question.question !== value;
    //       });
    //       this.checked_list = temp;
    //     }
    //   }
    // },
    // delete_single(index) {
    //   let questionlist = [];
    //   Swal.fire({
    //     title: "Are you sure?",
    //     text: " You want to Delete this Question?",
    //     type: "question",
    //     showCancelButton: true,
    //     confirmButtonColor: "#3085d6",
    //     cancelButtonColor: "#d33",
    //     confirmButtonText: "Yes, Confirm!",
    //   }).then((result) => {
    //     // console.log(result.value);
    //     if (result.value) {
    //       // console.log("deleted");
    //       questionlist.push(this.unanswered_list[index].question);
    //       this.delete_questions_api(questionlist);
    //     }
    //   });
    // },
    delete_multiple() {
      if (this.view_component_name === "unanswered_questions") {
        this.$root.$emit("delete_multiple_unanswered", true);
      } else if (this.view_component_name === "user_responses") {
        this.$root.$emit("delete_multiple_user_responses", true);
      }
      // if (this.checked_list.length == 0) {
      //   Swal.fire("No question selected!", "", "error");
      // } else if (this.checked_list.length > 0) {
      //   let questionlist = [];
      //   Swal.fire({
      //     title: "Are you sure?",
      //     text: " You want to Delete this Questions?",
      //     type: "question",
      //     showCancelButton: true,
      //     confirmButtonColor: "#3085d6",
      //     cancelButtonColor: "#d33",
      //     confirmButtonText: "Yes, Confirm!",
      //   }).then((result) => {
      //     if (result.value) {
      //       for (var i in this.checked_list) {
      //         questionlist.push(this.checked_list[i].question);
      //       }
      //       this.delete_questions_api(questionlist);
      //     }
      //   });
      // }
    },
    // delete_questions_api(questionlist) {
    //   axios
    //     .post(
    //       api_calls.get_unanswered_url(),
    //       {
    //         companyid: this.companyid,
    //         companyname: this.companyname,
    //         questionlist: questionlist,
    //         isDelete: "True",
    //         email: this.$session.get("UserInformation").email,
    //         license_key: this.$session.get("UserInformation").license_key,
    //         token: this.$session.get("UserInformation").tokens,
    //       },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${this.$session.get("at")}`,
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       if (response.data == "Deleted Successfully") {
    //         // console.log("deleted successfully");
    //         this.checked_list = [];
    //         this.number_of_rows = response.data[2].number_of_rows;
    //         this.total_pages = Math.ceil(this.number_of_rows / this.per_page);
    //         toastr.success("Deleted Successfully");
    //         // setTimeout(() => {
    //         //   this.$router.go();
    //         // }, 1500);
    //         this.load_verify_responses();
    //       }
    //       this.show_loader = false;
    //     })
    //     .catch((e) => {
    //       if (
    //         e.response.status === 410 ||
    //         e.response.status === 440 ||
    //         e.response.status === 409
    //       ) {
    //         this.$root.$emit("Session_Expired", e.response.data);
    //       } else {
    //         toastr.error(e.message);
    //       }
    //       this.show_loader = false;
    //     });
    // },
    // edit_item(index) {
    //   this.unanswered_list[index].edit = !this.unanswered_list[index].edit;
    //   this.old_question = this.unanswered_list[index].question;
    //   this.old_intent = this.unanswered_list[index].intent;
    //   this.old_data.question = this.old_question;
    //   this.old_data.intent = this.companyid + "_" + this.old_intent;
    //   // this.question = question.question;
    //   // this.intent = question.intent;
    //   // console.log(this.old_data);
    //   // console.log(this.old_question);
    // },
    add_questions() {
      if(!this.disable_btn_expired){
      if (this.view_component_name === "unanswered_questions") {
        this.$root.$emit("add_questions_unanswered", true);
      } else if (this.view_component_name === "user_responses") {
        this.$root.$emit("add_questions_user_responses", true);
      }}else{
        this.show_subscription_expired_swal();
      }
      // this.show_loader = true;
      // var questionlist = [];
      // var temp_list = [];
      // var empty = this.unanswered_list.filter((unanswered) => {
      //   return unanswered.intent == "";
      // });
      // for (var i in this.unanswered_list) {
      //   if (this.unanswered_list[i].intent != "") {
      //     temp_list.push(
      //       this.unanswered_list[i].question,
      //       this.companyid + "_" + this.unanswered_list[i].intent
      //     );
      //     questionlist.push(temp_list);
      //   }
      //   temp_list = [];
      // }
      // if (questionlist.length > 0) {
      //   axios
      //     .post(
      //       api_calls.get_unanswered_url(),
      //       {
      //         companyname: this.companyname,
      //         companyid: this.companyid,
      //         isAdd: "True",
      //         questionintent: questionlist,
      //         email: this.$session.get("UserInformation").email,
      //         license_key: this.$session.get("UserInformation").license_key,
      //         token: this.$session.get("UserInformation").tokens,
      //       },
      //       {
      //         headers: {
      //           Authorization: `Bearer ${this.$session.get("at")}`,
      //         },
      //       }
      //     )
      //     .then((response) => {
      //       if (response.data == "Added Successfully") {
      //         swal({
      //           text: "Added Successfully",
      //           type: "success",
      //         });
      //         this.$router.go();
      //       }
      //     })
      //     .catch((e) => {
      //       if (
      //         e.response.status === 410 ||
      //         e.response.status === 440 ||
      //         e.response.status === 409
      //       ) {
      //         this.$root.$emit("Session_Expired", e.response.data);
      //       }
      //     });
      // } else {
      //   toastr.error("No question to add. Please add some questions.");
      // }
      // this.show_loader = false;
    },
    // pagination_class(index) {
    //   if (index == this.page_no) {
    //     return " active";
    //   } else {
    //     return "";
    //   }
    // },
    // submit_question() {
    //   // console.log("submit");
    //   // console.log("question", this.old_question);
    //   // console.log("intent", this.old_intent);
    //   // console.log("intent", this.isedit);
    //   event.preventDefault();
    //   if (this.old_question == "" || this.old_intent == "") {
    //     toastr.error("Please enter all the fields.");
    //   } else {
    //     this.show_loader = true;
    //     axios
    //       .post(
    //         api_calls.get_unanswered_url(),
    //         {
    //           is_Edit: "True",
    //           question: this.old_question,
    //           intent: this.companyid + "_" + this.old_intent,
    //           companyname: this.companyname,
    //           companyid: this.companyid,
    //           old_question_data: this.old_data,
    //           email: this.$session.get("UserInformation").email,
    //           license_key: this.$session.get("UserInformation").license_key,
    //           token: this.$session.get("UserInformation").tokens,
    //           subscription: this.$session.get("UserInformation").subscription,
    //         },
    //         {
    //           headers: {
    //             Authorization: `Bearer ${this.$session.get("at")}`,
    //           },
    //         }
    //       )
    //       .then((response) => {
    //         this.show_loader = false;
    //         if (response.data == "Internal Server Error") {
    //           toastr.error("Internal Server Error");
    //         } else if (response.data == "Query Executed Successfully") {
    //           Swal({
    //             type: "success",
    //             text: "Your question has been edited successfully",
    //             timer:2000,
    //           }).then((result) => {
    //             if (result.value) {
    //               // this.$router.go();
    //               this.load_verify_responses();
    //             }
    //           });
    //         } else if (response.data == "Question Intent Updated") {
    //           Swal({
    //             type: "success",
    //             text: "Your question has been updated successfully",
    //             timer:2000,
    //           }).then((result) => {
    //             if (result.value) {
    //               // this.$router.go();
    //               this.load_verify_responses();
    //             }
    //           });
    //         }
    //       })
    //       .catch((e) => {
    //         if (
    //           e.response.status === 410 ||
    //           e.response.status === 440 ||
    //           e.response.status === 409
    //         ) {
    //           this.$root.$emit("Session_Expired", e.response.data);
    //         } else {
    //           toastr.error("Internal Server Error");
    //         }
    //       });
    //   }
    // },
    syn_unsearchable_product(){
      this.$root.$emit("sync_unserach_prodcut", true);
    }
  },
  watch: {
    view_component_name(newVal, oldVal) {
      this.show_sync_button =false;
      this.search_name = "";
    },
    search_name(){
      if (this.search_name === ""){
      this.load_verify_responses();
      this.isVisibleSearchClear = false;
      }
      else if (this.search_name !== ""){
        this.isVisibleSearchClear = true;
      }
    },
  },
};
</script>
<style  src="vue-multiselect/dist/vue-multiselect.min.css">
</style>

<style scoped>
#multiselect_td {
  border: none;
  width: auto;
}
.disabled_btn{
  pointer-events: none;
  opacity: 0.5;

  
}

</style>