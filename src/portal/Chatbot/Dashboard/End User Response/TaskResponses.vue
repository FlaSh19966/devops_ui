<template>
  <div>
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <div class="dash-cont">
      <div class="container-fluid">
        <div class="card dash-card">
          <div
            class="card-header d-block d-sm-flex flex-wrap justify-content-between"
          >
            <h4 class="mb-sm-0">{{tlt('chat_history_heading')}}</h4>
            <div class="card-act d-flex">
              <!-- <div class="form-group">
                <select id="select_coversation_action" v-model="selected" class="form-control" @change="view_action()">
                  <option
                    v-for="(actions,index) in action_stats"
                    :key="index"
                    :value="actions.Name"
                  >{{ actions.Name }}</option>
                </select>
              </div>-->
              <!-- <input
                class="form-control search-bar"
                id="search_bar"
                placeholder="Search here"
                v-model="searchstring"
                @keydown.enter="search_chat"
              />
              <a type="button" v-if="isVisibleSearchClear" class="btn bg-transparent mt-auto mb-auto py-0" @click="clear_searchstring" style="margin-left: -40px; z-index: 10;">
                <img src="/img/close-icn.png" alt />
              </a>
              <a
                href="javascript:void(0)"
                class="darkblue-btn"
                @click="search_chat"
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
              </a> -->
              <div class="form-group mb-0">
                <select
                  class="form-control"
                  @change="load_task_responses"
                  v-model="filter_chat_history"
                  id="exampleFormControlSelect1"
                >
                  <option value="Last 7 days">{{tlt('chat_history_last_7')}}</option>
                  <option value="Last 30 days">{{tlt('chat_history_last_30')}}</option>
                  <option value="Last 3 months">{{tlt('chat_history_3_month')}}</option>
                  <option value="Last 9 months">{{tlt('chat_history_9_month')}}</option>
                  <option value="Last 12 months">{{tlt('chat_history_12_month')}}</option>
                  <option value="All">{{tlt('chat_history_all_option')}}</option>
                </select>
              </div>
              <!-- <input class="form-control search-bar" placeholder="Search here" v-model="searchstring" v-on:keyup="callsearch">
              <a href="javascript:void(0)" class="darkblue-btn" @click="search_chat">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14">
                  <path d="M13.809011327100071,12.965505435601472 L9.30910012117823,8.49330664854199 C10.007392079586584,7.596111589605521 10.38512817619458,6.499157170138106 10.38512817619458,5.345374656726532 c0,-1.3810948891881802 -0.5423458634784514,-2.676086605733705 -1.523073527148749,-3.6524965835014083 c-0.9807276636702976,-0.9764099777677033 -2.287209392305289,-1.5136937750578685 -3.6751296371814526,-1.5136937750578685 s-2.6944019735111544,0.5390058607430178 -3.6751296371814526,1.5136937750578685 C0.5293349766245179,2.667565987539975 -0.011278152465820316,3.9642797675383576 -0.011278152465820316,5.345374656726532 c0,1.3793728257353273 0.5423458634784514,2.6778086691865575 1.523073527148749,3.6524965835014083 C2.492523038353222,9.974281217995648 3.7972720326001044,10.51156501528581 5.18692501186438,10.51156501528581 c1.160932040033745,0 2.2629511108717475,-0.37540983272197437 3.165705727077092,-1.0676793407689171 l4.499911205921844,4.470476723606628 a0.1420842198250257,0.14120920313395363 0 0 0 0.20099718902076805,0 l0.7554721932159904,-0.7490976019910955 a0.1420842198250257,0.14120920313395363 0 0 0 0,-0.19975936053095905 zM7.931576282630728,8.073123166045836 C7.196896902072058,8.80155600660269 6.2231001759542055,9.20279679111746 5.18692501186438,9.20279679111746 s-2.0099718902076775,-0.4012407845147706 -2.744651270766347,-1.1296736250716286 C1.709327094927478,7.342968262036121 1.3055999824978375,6.37516860153268 1.3055999824978375,5.345374656726532 s0.4037271124296458,-1.99931566876244 1.1366737586002036,-2.727748509319298 C3.1769531216567026,1.8891933068503817 4.150749847774562,1.4879525223356067 5.18692501186438,1.4879525223356067 s2.0117046245957884,0.3995187210619175 2.744651270766347,1.1296736250716286 S9.06825004123093,4.315580711920385 9.06825004123093,5.345374656726532 s-0.4037271124296458,1.99931566876244 -1.1366737586002036,2.727748509319298 z" 
                  fill="#fff"/>
              </svg>
              </a>-->
            </div>
          </div>
          <div class="card-body">
            <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link pl-5 pr-5"
                  id="portal_user-tab"
                  data-toggle="tab"
                  href="#portal_user"
                  role="tab"
                  aria-controls="portal_user"
                  @click="view_component_name = 'portal_user'"
                  >{{tlt('chat_history_portal_user')}}</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link pl-5 pr-5"
                  id="bot_user-tab"
                  data-toggle="tab"
                  href="#bot_user"
                  role="tab"
                  aria-controls="bot_user"
                  @click="view_component_name = 'bot_user'"
                  >{{tlt('chat_history_bot_user')}}</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link pl-5 pr-5"
                  id="bot_user-tab"
                  data-toggle="tab"
                  href="#live_user"
                  role="tab"
                  aria-controls="bot_user"
                  @click="view_component_name = 'agent_user'"
                  >Live Chat</a
                >
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade"
                id="portal_user"
                role="tabpanel"
                aria-labelledby="portal_user-tab"
              >
                <template v-if="view_component_name === 'portal_user'">
                  <!-- <div class="table-box">
                    <div
                      v-if="selected != 'general_chat_history'"
                      class="table-responsive"
                      style="min-height: 349px"
                    >
                      <table class="table">
                        <thead>
                          <tr>
                            
                            <th
                              scope="col"
                              style="width: 25%; text-align: center"
                            >
                              USER NAME
                            </th>
                            <th
                              scope="col"
                              style="width: 20%; text-align: center"
                            >
                              NAME OF TASK
                            </th>
                            <th
                              scope="col"
                              style="width: 20%; text-align: center"
                            >
                              DATE
                            </th>
                            <th
                              scope="col"
                              style="width: 20%; text-align: center"
                            >
                              TIME
                            </th>
                          </tr>
                        </thead>
                        <tr
                          v-for="(user, index) in user_action_stats"
                          :key="index"
                        >
                          <template
                            v-if="
                              user.username != 'Test User' &&
                              user.username != '' &&
                              Boolean(user.username)
                            "
                          >
                            <td style="text-align: center">
                              {{ user.username }}
                            </td>
                            <td>
                              <tr
                                v-for="(action, chat_index) in user.action_list"
                                :key="chat_index"
                              >
                                <td style="width: 50%; text-align: center">
                                  <a
                                    href="javascript:void(0)"
                                    data-toggle="modal"
                                    data-target="#conversation_model"
                                    @click="
                                      chat_conversation(index, chat_index)
                                    "
                                    >{{ action.name }}</a
                                  >
                                </td>
                              </tr>
                            </td>
                            <td style="text-align: center">
                              <tr
                                v-for="(action, chat_index) in user.action_list"
                                :key="chat_index"
                              >
                                <td style="width: 10%">{{ action.date }}</td>
                              </tr>
                            </td>
                            <td style="text-align: center">
                              <tr
                                v-for="(action, chat_index) in user.action_list"
                                :key="chat_index"
                              >
                                <td style="width: 10%">{{ action.time }}</td>
                              </tr>
                            </td>
                          </template>
                        </tr>
                      </table>
                    </div>

                    <div
                      v-if="selected == 'general_chat_history'"
                      class="table-responsive"
                      style="min-height: 349px"
                    >
                      <table class="table">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              style="width: 25%; text-align: center"
                            >
                              USER NAME
                            </th>
                            <th
                              scope="col"
                              style="width: 25%; text-align: center"
                            >
                              UNIQUE ID
                            </th>
                            <th
                              scope="col"
                              style="width: 25%; text-align: center"
                            >
                              PHONE NUMBER
                            </th>
                            <th
                              scope="col"
                              style="width: 25%; text-align: center"
                            >
                              VIEW CHAT
                            </th>
                          </tr>
                        </thead>
                        <tr
                          v-for="(user, index) in user_action_stats"
                          :key="index"
                        >
                          <template
                            v-if="
                              user.username != 'Test User' &&
                              user.username != '' &&
                              Boolean(user.username)
                            "
                          >
                            <td class="text-center">{{ user.username }}</td>
                            <td class="text-center">{{ user.useremail }}</td>
                            <td class="text-center">
                              {{ user.userphonenumber }}
                            </td>
                            <td style="width: 50%; text-align: center">
                              <a
                                href="javascript:void(0)"
                                data-toggle="modal"
                                data-target="#conversation_model1"
                                @click="chat_date(index)"
                                style="text-align: center"
                                >View Chat History</a
                              >
                            </td>
                          </template>
                        </tr>
                      </table>
                    </div>

                    <div class="pagin-table" style="margin-top: 2%">
                      <nav aria-label="Page navigation example">
                        <ul class="pagination justify-content-center">
                          <li class="page-item">
                            <a
                              class="page-link"
                              href="javascript:void(0)"
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
                              href="javascript:void(0)"
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
                              href="javascript:void(0)"
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
                    <div
                      v-if="selected != 'general_chat_history'"
                      class="modal fade dash-modal"
                      id="conversation_model"
                      tabindex="-1"
                      role="dialog"
                      aria-labelledby="conversation_model"
                      aria-hidden="true"
                      style="margin-left: -1%"
                    >
                      <div
                        class="modal-dialog modal-dialog-centered"
                        role="document"
                      >
                        <div class="modal-content">
                          <div class="modal-body">
                            <div class="modal-head d-flex align-items-center">
                              <div class="head-icn">
                                <img src="/img/user-blue.png" alt />
                              </div>
                              <h3>Chat History</h3>
                            </div>
                            <button
                              type="button"
                              class="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <img src="/img/close-icn.png" alt />
                            </button>
                            <div>
                              <div
                                v-for="(user, index) in user_reply"
                                :key="index"
                              >
                                <span class="d-flex">
                                  <h5>{{ current_user }}: &nbsp;</h5>
                                  <p>{{ user }}</p>
                                </span>
                                <span style="display: flex">
                                  <h5>Bot: &nbsp;</h5>
                                  <p>{{ bot_reply[index] }}</p>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> -->
                <portal-user-chat-history />
                </template>
              </div>
              <div
                class="tab-pane fade"
                id="bot_user"
                role="tabpanel"
                aria-labelledby="bot_user-tab"
              >
                <template v-if="view_component_name === 'bot_user'">
                  <!-- <div class="table-box">
                    <div
                      v-if="selected != 'general_chat_history'"
                      class="table-responsive"
                      style="min-height: 349px"
                    >
                      <table class="table">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              style="width: 25%; text-align: center"
                            >
                              USER NAME
                            </th>
                            <th
                              scope="col"
                              style="width: 20%; text-align: center"
                            >
                              NAME OF TASK
                            </th>
                            <th
                              scope="col"
                              style="width: 20%; text-align: center"
                            >
                              DATE
                            </th>
                            <th
                              scope="col"
                              style="width: 20%; text-align: center"
                            >
                              TIME
                            </th>
                          </tr>
                        </thead>
                        <tr
                          v-for="(user, index) in user_action_stats"
                          :key="index"
                        >
                          <template
                            v-if="
                              user.username == 'Test User' ||
                              user.username == ''
                            "
                          >
                            <td style="text-align: center">
                              {{ user.username }}
                            </td>
                            <td>
                              <tr
                                v-for="(action, chat_index) in user.action_list"
                                :key="chat_index"
                              >
                                <td style="width: 50%; text-align: center">
                                  <a
                                    href="javascript:void(0)"
                                    data-toggle="modal"
                                    data-target="#conversation_model"
                                    @click="
                                      chat_conversation(index, chat_index)
                                    "
                                    >{{ action.name }}</a
                                  >
                                </td>
                              </tr>
                            </td>
                            <td style="text-align: center">
                              <tr
                                v-for="(action, chat_index) in user.action_list"
                                :key="chat_index"
                              >
                                <td style="width: 10%">{{ action.date }}</td>
                              </tr>
                            </td>
                            <td style="text-align: center">
                              <tr
                                v-for="(action, chat_index) in user.action_list"
                                :key="chat_index"
                              >
                                <td style="width: 10%">{{ action.time }}</td>
                              </tr>
                            </td>
                          </template>
                        </tr>
                      </table>
                    </div>

                    <div
                      v-if="selected == 'general_chat_history'"
                      class="table-responsive"
                      style="min-height: 349px"
                    >
                      <table class="table">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              style="width: 25%; text-align: center"
                            >
                              USER NAME
                            </th>
                            <th
                              scope="col"
                              style="width: 25%; text-align: center"
                            >
                              UNIQUE ID
                            </th>
                            <th
                              scope="col"
                              style="width: 25%; text-align: center"
                            >
                              PHONE NUMBER
                            </th>
                            <th
                              scope="col"
                              style="width: 25%; text-align: center"
                            >
                              VIEW CHAT
                            </th>
                          </tr>
                        </thead>
                        <tr
                          v-for="(user, index) in user_action_stats"
                          :key="index"
                        >
                          <template
                            v-if="
                              user.username == 'Test User' ||
                              user.username == ''
                            "
                          >
                            <td class="text-center">{{ user.username }}</td>
                            <td class="text-center">{{ user.useremail }}</td>
                            <td class="text-center">
                              {{ user.userphonenumber }}
                            </td>
                            <td style="width: 50%; text-align: center">
                              <a
                                href="javascript:void(0)"
                                data-toggle="modal"
                                data-target="#conversation_model1"
                                @click="chat_date(index)"
                                style="text-align: center"
                                >View Chat History</a
                              >
                            </td>
                          </template>
                          
                        </tr>
                      </table>
                    </div>

                    <div class="pagin-table" style="margin-top: 2%">
                      <nav aria-label="Page navigation example">
                        <ul class="pagination justify-content-center">
                          <li class="page-item">
                            <a
                              class="page-link"
                              href="javascript:void(0)"
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
                              href="javascript:void(0)"
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
                              href="javascript:void(0)"
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
                    <div
                      v-if="selected != 'general_chat_history'"
                      class="modal fade dash-modal"
                      id="conversation_model"
                      tabindex="-1"
                      role="dialog"
                      aria-labelledby="conversation_model"
                      aria-hidden="true"
                      style="margin-left: -1%"
                    >
                      <div
                        class="modal-dialog modal-dialog-centered"
                        role="document"
                      >
                        <div class="modal-content">
                          <div class="modal-body">
                            <div class="modal-head d-flex align-items-center">
                              <div class="head-icn">
                                <img src="/img/user-blue.png" alt />
                              </div>
                              <h3>Chat History</h3>
                            </div>
                            <button
                              type="button"
                              class="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <img src="/img/close-icn.png" alt />
                            </button>
                            <div>
                              <div
                                v-for="(user, index) in user_reply"
                                :key="index"
                              >
                                <span class="d-flex">
                                  <h5>{{ current_user }}: &nbsp;</h5>
                                  <p>{{ user }}</p>
                                </span>
                                <span style="display: flex">
                                  <h5>Bot: &nbsp;</h5>
                                  <p>{{ bot_reply[index] }}</p>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> -->
                <bot-user-chat-history />
                </template>
              </div>
              <div
                class="tab-pane fade"
                id="live_user"
                role="tabpanel"
                aria-labelledby="bot_user-tab"
              >
                <template v-if="view_component_name === 'agent_user'">
                <live-chat-history />
                </template>
              </div>
            </div>
          </div>

          <!-- <div
            v-if="selected == 'general_chat_history'"
            class="modal fade dash-modal"
            id="conversation_model1"
            tabindex="-1"
            role="dialog"
            aria-labelledby="conversation_model1"
            aria-hidden="true"
            style="margin-left: -1%"
          >
            <div
              class="modal-dialog modal-dialog-centered"
              role="document"
              style="max-width: 60%"
            >
              <div class="modal-content">
                <div class="modal-body">
                  <div class="modal-head d-flex align-items-center">
                    <div class="head-icn">
                      <img src="/img/user-blue.png" alt />
                    </div>
                    <h3>Chat History</h3>
                  </div>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <img src="/img/close-icn.png" alt />
                  </button>
                  <div>
                  <div class="form-group">
                    <label>Select Time Range</label>
                    <multiselect
                      v-model="selected_date"
                      id="select_coversation_date"
                      :options="chat_dates"
                      :searchable="true"
                      :close-on-select="true"
                      :show-labels="false"
                      :allow-empty="false"
                      @select="chat_conversation"
                      placeholder="Select Time Range"
                      :disabled-selected="false"
                      :hide-selected="false"
                      :max-height="200"
                    >
                      <span>{{ selected_date }}</span>
                    </multiselect>
                  </div>
                    <p></p>
                    <div style="text-align:justify" v-for="(user, index) in chatDetails" :key="index">
                      <span v-if="user.UserQuery != ''" style="display: flex">
                        <h5 style="float:left;width:4%">Q:</h5>
                        <p style="word-break: break-all">
                          {{ user.UserQuery }}
                        </p>
                      </span>
                      <div v-if="user.UserQuery != '' || checkintent(index)">
                        <span
                          v-for="(bot, index2) in user.BOTResponse"
                          :key="index2"
                          style="display: flex"
                        >
                          <h5
                            v-if="bot.img != undefined || bot.text != undefined"
                            style="float:left;width:4%">
                            A:
                          </h5>
                          <p style="float:left;width:100%" v-if="bot.text != undefined" v-html="bot.text"></p>
                          <div style="float:left;width:100%" v-if="bot.img != undefined">
                            <img :src="bot.img" />
                          </div>

                          <div
                            class="buy-products"
                            style="display: flex; overflow: auto hidden; float:left;width:100% "
                            @mousewheel="scroll_div"
                            v-if="bot.products != undefined"
                          >
                            <div
                              class="image-container"
                              v-for="(product, index1) in bot.products"
                              :key="index1"
                            >
                              <img :src="product.img" class="image-box" />
                              <p>{{ product.product }}</p>
                              <p>{{ product.price }}</p>
                            </div>
                          </div>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import Multiselect from "vue-multiselect";
import PortalUserChatHistory from "./PortalUserChatHistory.vue";
import BotUserChatHistory from "./BotUserChatHistory.vue";
import LiveChatHistory from "./LiveChatHistory.vue";
export default {
  components: {
    // Multiselect,
    PortalUserChatHistory,
    BotUserChatHistory,
    LiveChatHistory
  },
  data() {
    return {
      number_of_rows: "",
      total_pages: 0,
      page_no: 1,
      per_page: 10,
      user_list: [],
      user_reply: [],
      bot_reply: [],
      chatDetails: [],
      action_stats: [],
      user_action_stats: [],
      current_user: "",
      timestamp: "",
      sender_id: [],
      selected: "general_chat_history",
      selected_date: "",
      selected_index: null,
      chat_dates: [],
      companyname: this.$session.get("UserInformation").company_name,
      companyid: this.$session.get("UserInformation").company_id,
      issearch: false,
      searchstring: "",
      spinnerOn: false,
      view_component_name: "portal_user",
      // fingerprintregex:/^[0-9]{10}$/,
      fingerprintregex: /^[0-9-+\/\s]{9,}$/,
      page_array: [],
      isVisibleSearchClear: false,
      show_loader: false,
      filter_chat_history: "Last 7 days",
    };
  },
  mounted() {
    $("#selectall").click(function () {
      if ($(this).is(":checked")) {
        $("input:checkbox").prop("checked", true);
      } else {
        $("input:checkbox").prop("checked", false);
      }
    });
    $("#portal_user-tab").click();
    // if (this.$route.params.modal_open_switch_tab) {
    //   this.view_component_name = "bot_user";
    //   $("#bot_user-tab").click();
    // }
  },
  created() {
    this.load_task_responses();
    this.$session.set("filter_chat_history", this.tlt('chat_history_default_7_day'));
  },
  watch: {
    view_component_name(newVal, oldVal) {
      this.searchstring = "";
    },
    searchstring(){
      if (this.searchstring ===""){
        this.load_task_responses();
        this.isVisibleSearchClear = false;
      }else if(this.searchstring !==""){
        this.isVisibleSearchClear = true;
      }
    },
  },
  methods: {
    clear_searchstring(){
      this.searchstring = "";
    },
    load_task_responses(){
      this.show_loader = false;
      this.checked_list = [];
      this.searchstring = "";
      this.$session.set("filter_chat_history", this.filter_chat_history);
      if (this.view_component_name === "portal_user") {
        this.$root.$emit("load_portal_user_chat_history", true);
      } else if (this.view_component_name === "bot_user") {
        this.$root.$emit("load_bot_user_chat_history", true);
      } else if (this.view_component_name === "agent_user") {
        this.$root.$emit("load_live_chat_history", true);
      }
    //   axios
    //   .post(
    //     api_calls.action_stats_url(),
    //     {
    //       companyname: this.companyname,
    //       companyid: this.companyid,
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
    //     this.action_stats = response.data.action_stats;
    //     this.action_stats.push({
    //       Hits: 1,
    //       Name: "general_chat_history",
    //     });
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
    // axios
    //   .post(
    //     api_calls.general_chat_history(),
    //     {
    //       companyname: this.companyname,
    //       companyid: this.companyid,
    //       email: this.$session.get("UserInformation").email,
    //       license_key: this.$session.get("UserInformation").license_key,
    //       token: this.$session.get("UserInformation").tokens,
    //       isshow: true,
    //       action: "general_chat_history",
    //       pageno: this.page_no,
    //       perpage: this.per_page,
    //       issearch: this.issearch,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${this.$session.get("at")}`,
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     this.user_action_stats = [];
    //     for (let i = 0; i < response.data.chatHistory.length; i++) {
    //       // console.log(
    //       //   this.fingerprintregex.test(response.data.chatHistory[i]._id.User)
    //       // );
    //       if (
    //         this.fingerprintregex.test(response.data.chatHistory[i]._id.User)
    //       ) {
    //         this.user_action_stats.push({
    //           useremail: response.data.chatHistory[i].Email,
    //           userphonenumber: response.data.chatHistory[i].PhoneNumber,
    //           username: response.data.chatHistory[i].UserName,
    //           userid: response.data.chatHistory[i]._id.User,
    //         });
    //         // console.log(this.user_action_stats, response.data.chatHistory[i]);
    //       } else {
    //         this.user_action_stats.push({
    //           useremail: response.data.chatHistory[i]._id.User,
    //           userphonenumber: response.data.chatHistory[i].PhoneNumber,
    //           username: response.data.chatHistory[i].UserName,
    //           userid: response.data.chatHistory[i]._id.User,
    //         });
    //       }
    //       // this.user_action_stats.push({
    //       //     useremail : response.data.chatHistory[i]._id.User,
    //       //     userphonenumber : response.data.chatHistory[i].PhoneNumber,
    //       //     username : response.data.chatHistory[i].UserName,
    //       // });
    //     }
    //     this.total_pages = response.data.PageCount;
    //     this.setpagination(this.page_no);
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
    // page_require(page_no) {
    //   if (this.selected != "general_chat_history") {
    //     // console.log(this.total_pages, page_no);
    //     if (page_no == 0 || page_no == this.total_pages + 1) {
    //     } else {
    //       // this.page_no = page_no;
    //       if (page == "...s") {
    //         this.page_no = Math.ceil((1 + this.page_no) / 2);
    //       } else if (page == "...l") {
    //         this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
    //       } else {
    //         this.page_no = page;
    //       }
    //       // this.spinnerOn = true;
    //       axios
    //         .post(
    //           api_calls.action_usage_stats_url(),
    //           {
    //             companyname: this.companyname,
    //             companyid: this.companyid,
    //             email: this.$session.get("UserInformation").email,
    //             license_key: this.$session.get("UserInformation").license_key,
    //             token: this.$session.get("UserInformation").tokens,
    //             // action: this.action_stats[index].Name,
    //             action: this.selected,
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
    //           // this.spinnerOn = false;
    //           // this.user_list = [];
    //           // for (var i in response.data[0]) {
    //           //   this.intentlist.push({
    //           //     intent: response.data[0][i],
    //           //     email: response.data[1][i],
    //           //     created: response.data[2][i]
    //           //   });
    //           // }
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
    //   } else {
    //     if (page_no == 0 || page_no == this.total_pages + 1) {
    //     } else {
    //       if (page_no == "...s") {
    //         this.page_no = Math.ceil((1 + this.page_no) / 2);
    //       } else if (page_no == "...l") {
    //         this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
    //       } else {
    //         this.page_no = page_no;
    //       }
    //       // this.page_no = page_no;
    //       this.spinnerOn = true;
    //       axios
    //         .post(
    //           api_calls.general_chat_history(),
    //           {
    //             companyname: this.companyname,
    //             companyid: this.companyid,
    //             email: this.$session.get("UserInformation").email,
    //             license_key: this.$session.get("UserInformation").license_key,
    //             token: this.$session.get("UserInformation").tokens,
    //             isshow: true,
    //             action: this.selected,
    //             pageno: this.page_no,
    //             perpage: this.per_page,
    //             issearch: this.issearch,
    //           },
    //           {
    //             headers: {
    //               Authorization: `Bearer ${this.$session.get("at")}`,
    //             },
    //           }
    //         )
    //         .then((response) => {
    //           this.spinnerOn = false;
    //           this.user_action_stats = [];
    //           for (let i = 0; i < response.data.chatHistory.length; i++) {
    //             if (
    //               this.fingerprintregex.test(
    //                 response.data.chatHistory[i]._id.User
    //               )
    //             ) {
    //               this.user_action_stats.push({
    //                 useremail: response.data.chatHistory[i].Email,
    //                 userphonenumber: response.data.chatHistory[i].PhoneNumber,
    //                 username: response.data.chatHistory[i].UserName,
    //                 userid: response.data.chatHistory[i]._id.User,
    //               });
    //             } else {
    //               this.user_action_stats.push({
    //                 useremail: response.data.chatHistory[i]._id.User,
    //                 userphonenumber: response.data.chatHistory[i].PhoneNumber,
    //                 username: response.data.chatHistory[i].UserName,
    //                 userid: response.data.chatHistory[i]._id.User,
    //               });
    //             }
    //             // this.user_action_stats.push({
    //             //     useremail : response.data.chatHistory[i]._id.User,
    //             //     userphonenumber : response.data.chatHistory[i].PhoneNumber,
    //             //     username : response.data.chatHistory[i].UserName,
    //             // });
    //           }
    //           this.total_pages = response.data.PageCount;
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
    //     }
    //   }
    // },
    // pagination_class(index) {
    //   if (index == this.page_no) {
    //     return " active";
    //   } else {
    //     return "";
    //   }
    // },
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
    // view_action() {
    //   var action_name = event.target.value;
    //   this.selected = action_name;
    //   this.searchstring = "";
    //   if (action_name != "general_chat_history") {
    //     this.spinnerOn = true;
    //     axios
    //       .post(
    //         api_calls.action_usage_stats_url(),
    //         {
    //           companyname: this.companyname,
    //           companyid: this.companyid,
    //           email: this.$session.get("UserInformation").email,
    //           license_key: this.$session.get("UserInformation").license_key,
    //           token: this.$session.get("UserInformation").tokens,
    //           action: action_name,
    //           page_no: 1,
    //           per_page: this.per_page,
    //         },
    //         {
    //           headers: {
    //             Authorization: `Bearer ${this.$session.get("at")}`,
    //           },
    //         }
    //       )
    //       .then((response) => {
    //         this.spinnerOn = false;
    //         this.number_of_rows = response.data.number_of_rows;
    //         this.total_pages = Math.ceil(this.number_of_rows / this.per_page);
    //         this.user_action_stats = [];
    //         for (var i in response.data.users) {
    //           if (response.data.users[i].action_hits != 0) {
    //             let action_history = [];
    //             for (var j in response.data.users[i].action_hits) {
    //               action_history.push(response.data.users[i].action_hits[j]);
    //             }
    //             this.user_action_stats.push({
    //               username: response.data.users[i].username,
    //               action_list: action_history,
    //               sender_id: response.data.users[i].sender_id,
    //             });
    //           }
    //         }
    //       })
    //       .catch((e) => {
    //         if (
    //           e.response.status === 410 ||
    //           e.response.status === 440 ||
    //           e.response.status === 409
    //         ) {
    //           this.$root.$emit("Session_Expired", e.response.data);
    //         }
    //       });
    //   } else {
    //     this.spinnerOn = true;
    //     axios
    //       .post(
    //         api_calls.general_chat_history(),
    //         {
    //           companyname: this.companyname,
    //           companyid: this.companyid,
    //           email: this.$session.get("UserInformation").email,
    //           license_key: this.$session.get("UserInformation").license_key,
    //           token: this.$session.get("UserInformation").tokens,
    //           isshow: true,
    //           action: action_name,
    //           pageno: this.page_no,
    //           perpage: this.per_page,
    //           issearch: this.issearch,
    //         },
    //         {
    //           headers: {
    //             Authorization: `Bearer ${this.$session.get("at")}`,
    //           },
    //         }
    //       )
    //       .then((response) => {
    //         this.spinnerOn = false;
    //         this.user_action_stats = [];
    //         for (let i = 0; i < response.data.chatHistory.length; i++) {
    //           this.user_action_stats.push({
    //             useremail: response.data.chatHistory[i]._id.User,
    //             userphonenumber: response.data.chatHistory[i].PhoneNumber,
    //             username: response.data.chatHistory[i].UserName,
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
    //         }
    //       });
    //   }
    // },
    // scroll_div() {
    //   var doc = document.querySelector(".buy-products");
    //   if (event.deltaX > event.deltaY) {
    //     doc.scrollLeft += 10;
    //   } else if (event.deltaX < event.deltaY) {
    //     doc.scrollLeft -= 10;
    //   }
    // },
    // checkintent(index) {
    //   if (this.chatDetails[index - 1] != undefined) {
    //     if (this.chatDetails[index - 1].BOTResponse[0] != undefined) {
    //       if (this.chatDetails[index - 1].BOTResponse[0].intent != undefined) {
    //         return true;
    //       }
    //     }
    //   }
    //   return false;
    // },
    // chat_date(index) {
    //   this.sender_id = this.user_action_stats[index].userid;
    //   this.spinnerOn = true;
    //   axios
    //     .post(
    //       api_calls.general_chat_history(),
    //       {
    //         companyname: this.companyname,
    //         companyid: this.companyid,
    //         email: this.$session.get("UserInformation").email,
    //         license_key: this.$session.get("UserInformation").license_key,
    //         token: this.$session.get("UserInformation").tokens,
    //         username: this.sender_id,
    //         isshowdates: true,
    //         issearch: this.issearch,
    //         searchstring: this.searchstring,
    //       },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${this.$session.get("at")}`,
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       this.spinnerOn = false;
    //       this.chat_dates = response.data.Dates;
    //       this.selected_date =
    //         response.data.Dates[response.data.Dates.length - 1];
    //       this.chat_dates.reverse();
    //       // console.log(this.selected_index);
    //       this.selected_index = index;
    //       this.chat_conversation(index);
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
    // chat_conversation(index, chat_index) {
    //   // console.log(index, chat_index);
    //   if (this.selected != "general_chat_history") {
    //     this.sender_id = this.user_action_stats[index].userid;
    //     this.spinnerOn = true;
    //     axios
    //       .post(
    //         api_calls.conversation_stats_url(),
    //         {
    //           companyname: this.companyname,
    //           companyid: this.companyid,
    //           email: this.$session.get("UserInformation").email,
    //           license_key: this.$session.get("UserInformation").license_key,
    //           token: this.$session.get("UserInformation").tokens,
    //           sender_id: this.user_action_stats[index].sender_id,
    //           action_timestamp: this.user_action_stats[index].action_list[
    //             chat_index
    //           ].timestamp,
    //         },
    //         {
    //           headers: {
    //             Authorization: `Bearer ${this.$session.get("at")}`,
    //           },
    //         }
    //       )
    //       .then((response) => {
    //         this.spinnerOn = false;
    //         this.user_reply = [];
    //         this.bot_reply = [];
    //         if (response.data != null) {
    //           this.current_user = response.data.user_conversations.username;
    //           for (var i in response.data.user_conversations.interactions) {
    //             if (
    //               response.data.user_conversations.interactions[i].user !=
    //               undefined
    //             ) {
    //               this.user_reply.push(
    //                 response.data.user_conversations.interactions[i].user
    //               );
    //             } else if (
    //               response.data.user_conversations.interactions[i].bot !=
    //               undefined
    //             ) {
    //               this.bot_reply.push(
    //                 response.data.user_conversations.interactions[i].bot
    //               );
    //             }
    //           }
    //           $("#conversation_model1 :input").prop("disabled", true);
    //         } else {
    //           toastr.error("No Chats Available");
    //           $("#conversation_model1").modal("hide");
    //         }
    //         $("#conversation_model1 :input").prop("disabled", true);
    //       })
    //       .catch((e) => {
    //         if (
    //           e.response.status === 410 ||
    //           e.response.status === 440 ||
    //           e.response.status === 409
    //         ) {
    //           this.$root.$emit("Session_Expired", e.response.data);
    //         }
    //       });
    //   } else {
    //     this.spinnerOn = true;
    //     axios
    //       .post(
    //         api_calls.general_chat_history(),
    //         {
    //           companyname: this.companyname,
    //           companyid: this.companyid,
    //           email: this.$session.get("UserInformation").email,
    //           license_key: this.$session.get("UserInformation").license_key,
    //           token: this.$session.get("UserInformation").tokens,
    //           username: this.sender_id,
    //           isshowchatdetails: true,
    //           date: this.selected_date,
    //           issearch: this.issearch,
    //           searchstring: this.searchstring,
    //         },
    //         {
    //           headers: {
    //             Authorization: `Bearer ${this.$session.get("at")}`,
    //           },
    //         }
    //       )
    //       .then((response) => {
    //         // console.log(this.selected_index, this.user_action_stats);
    //         this.spinnerOn = false;
    //         this.user_reply = [];
    //         this.bot_reply = [];
    //         if (response.data != null) {
    //           this.current_user = this.user_action_stats[
    //             this.selected_index
    //           ].useremail;
    //           this.chatDetails = response.data.chatDetails;
    //         }
    //         // setTimeout(() => {
    //         //   $("#conversation_model1 :input").prop("disabled", true);
    //         //   $("#conversation_model1 :button").prop("disabled", false);
    //         // }, 500);
    //       })
    //       .catch((e) => {
    //         if (
    //           e.response.status === 410 ||
    //           e.response.status === 440 ||
    //           e.response.status === 409
    //         ) {
    //           this.$root.$emit("Session_Expired", e.response.data);
    //         }
    //       });
    //   }
    // },
    search_chat() {
      if (this.view_component_name === "portal_user") {
        this.$root.$emit("search_portal_user_chat_history", this.searchstring);
      } else if (this.view_component_name === "bot_user") {
        this.$root.$emit("search_bot_user_chat_history", this.searchstring);
      } 
    //   if (this.searchstring != "") {
    //     // this.spinnerOn = true;
    //     this.page_no = 1;
    //     (this.issearch = true), (this.spinnerOn = true);
    //     axios
    //       .post(
    //         api_calls.general_chat_history(),
    //         {
    //           companyname: this.companyname,
    //           companyid: this.companyid,
    //           email: this.$session.get("UserInformation").email,
    //           license_key: this.$session.get("UserInformation").license_key,
    //           token: this.$session.get("UserInformation").tokens,
    //           isshow: true,
    //           action: "general_chat_history",
    //           pageno: this.page_no,
    //           perpage: this.per_page,
    //           issearch: this.issearch,
    //           searchstring: this.searchstring,
    //         },
    //         {
    //           headers: {
    //             Authorization: `Bearer ${this.$session.get("at")}`,
    //           },
    //         }
    //       )
    //       .then((response) => {
    //         this.spinnerOn = false;
    //         this.user_action_stats = [];
    //         if (response.data.MSG == "No Results Found") {
    //           this.total_pages = 0;
    //         } else {
    //           for (let i = 0; i < response.data.chatHistory.length; i++) {
    //             this.user_action_stats.push({
    //               username: response.data.chatHistory[i],
    //             });
    //           }
    //           this.total_pages = response.data.PageCount;
    //           this.setpagination(this.page_no);
    //         }
    //       })
    //       .catch((e) => {
    //         if (
    //           e.response.status === 410 ||
    //           e.response.status === 440 ||
    //           e.response.status === 409
    //         ) {
    //           this.$root.$emit("Session_Expired", e.response.data);
    //         }
    //       });
    //   } else {
    //     toastr.error("Enter proper data for searching");
    //   }
    },
    // close_modal() {
    //   $("#conversation_model1").modal("hide");
    // },
  },
};
</script>

<style scoped>
.table td,
.table th {
  vertical-align: middle;
}
.view-pass {
  position: initial;
  right: 15px;
  top: 15px;
}
img {
  max-width: 100%;
  max-height: 100%;
}
/* .image-container {
  background: #fff;
  border: #fff 1px solid;
  border-radius: 5px 5px 5px 5px;
  margin-left: 5%;
  height: 180px;
}*/
.image-container > p {
  font-size: 15px;
  text-align: center;
}
.search-bar {
  height: 32px;
}
.darkblue-btn {
  height: 32px;
  margin-left: 10px;
}
</style>
