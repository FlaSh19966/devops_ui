<template>
  <div class="dash-cont">
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <div id="intent_page">
      <div class="card dash-card">
        <div
          class="
            card-header
            d-block d-sm-flex
            flex-wrap
            justify-content-between
          "
        >
          <h4 class="mb-sm-0">{{tlt('objective_heading')}}</h4>
          <div class="card-act d-flex flex-wrap">
            <input
              class="form-control search-bar"
              id="search_bar_id"
              :placeholder="tlt('search_here')"
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
              href="javascript:void(0)"
              class="darkblue-btn"
              @click="isEditIntent ? verify_changes() : search_intent()"
              id="search_btn_id"
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
              :class="intent_core_model_inprogress === true ? 'disabled_btn' : ''"
              data-target="#intentmodel"
              id="add_intent_btn"
              title="Add new objective"
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
              {{tlt('add_objective_btn_name')}}
            </a>
            <a
              href="#"
              class="darkblue-btn"
              :class="intent_core_model_inprogress === true ? 'disabled_btn' : ''"
              title="Upload File"
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
            <button id="train_model_btn" class="darkblue-btn"
               @click="isEditIntent ? verify_changes() : train_model()"
               :disabled="intent_core_model_inprogress == true"
               :style="show_model_progress('style')"
               :title="show_model_progress('title')">
               <i class="fa fa-spinner fa-spin" v-show="intent_core_model_inprogress"></i>
                {{tlt('train_model_btn_name')}}
            </button>
            <a
              href="javascript:void(0)"
              class="red-btn"
              :class="intent_core_model_inprogress === true ? 'disabled_btn' : ''"
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
              {{tlt('delete_btn_name')}}
            </a>
          </div>
        </div>
        <div class="card-body" id="page">
          <div class="col-sm-12 d-flex px-0" v-show="intentlist.length > 0">
            <div class="col-sm-4 pl-0" v-show="intentlist.length > 0">
              <div class="table-box">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">
                          <div class="form-check checkbox checkbox-success">
                            <label
                              class="form-check-label"
                            >
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
                        <th scope="col" class="text-left">{{tlt('objective_header')}}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(intents, index) in intentlist"
                        :key="index"
                        :class="check_current_intent(index)"
                      >
                        <th scope="col">
                          <div class="form-check checkbox-success">
                            <label
                              class="form-check-label checkbox checkbox-success"
                            >
                              <input
                                class="form-check-input"
                                type="checkbox"
                                :id="'intent_checkbox_' + intents.Intent"
                                @change="selected_intents(intents.Intent)"
                              />
                              <span class="icn"></span>
                            </label>
                          </div>
                        </th>
                        <td
                          style="cursor: pointer"
                          @click="
                            isEditIntent
                              ? verify_changes()
                              : show_intents(index)
                          "
                          :title="intents.Intent"
                        >
                          <template>
                            <p style="margin-bottom: 0">
                              {{ intents.Intent }}
                            </p>
                          </template>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div
              class="col-sm-8 pr-0"
              id="edit-intent-box"
              v-show="intentlist.length > 0"
            >
              <div style="border: 1px solid #dbe2e8">
                <div class="col-sm-12">
                  <div style="color: #414141" class="d-flex">
                    <h5><p class="mt-2 mb-0">{{tlt('objective_details_header')}}</p></h5>
                    <span
                      @click="edit_intent_details"
                      v-html="pencil_svg"
                      class="ml-auto mr-2 mt-2"
                      id="edit-intent-cursor"
                      style="cursor: pointer"
                    ></span>
                  </div>
                </div>
                <hr />
                <!-- <EDIT INTENT/SHOW INTENT> -->
                <div class="col-sm-12" style="margin-bottom: 1rem">
                  <h5>
                    <p class="mt-2 mb-0" style="color: #414141">
                      {{tlt('objective_name_label')}}
                    </p>
                  </h5>
                  <h6 class="pl-1" style="font-weight: 400" v-if="isEditIntent">
                    {{tlt('objective_name_text')}}
                  </h6>
                  <div v-if="!isEditIntent" style="padding-left: 20px">
                    <p>{{ current_selected_intent }}</p>
                    <!-- <span v-html="current_intent_response"></span> -->
                  </div>
                  <template v-else-if="isEditIntent">
                    <input
                      align="right"
                      class="form-control edit mb-3"
                      autocomplete="off"
                      :placeholder="tlt('enter_objective')"
                      id="enter_intent_id_edit"
                      maxlength="25"
                      v-on:keyup="enterintentid_edit"
                      v-model="current_selected_intent"
                      @keydown="intent_name_check_special_characters($event)"
                    />
                    <span v-show="intent_already_exists_edit" style="color: red"
                      >{{tlt('objective_name_condition_label')}}</span
                    >
                  </template>
                  <hr />
                  <div>
                    <h5>
                      <p class="mt-2 mb-0" style="color: #414141">
                        {{tlt('objective_desc_label')}}
                      </p>
                    </h5>
                    <div v-if="!isEditIntent" style="padding-left: 20px">
                      <p>{{ selected_intent_description }}</p>
                    </div>
                    <template v-else>
                      <input
                        align="right"
                        class="form-control edit"
                        :placeholder="tlt('add_desc_objective')"
                        id="enter_intent_description_id_edit"
                        v-model="selected_intent_description"
                      />
                    </template>
                  </div>
                </div>
                <!-- <hr /> -->
                <div
                  class="col-sm-12"
                  style="padding-left: 15px !important"
                >
                   <hr />
                  <h5>
                    <p class="mt-2 mb-0" style="color: #414141">{{tlt('user_example_label')}}</p>
                  </h5>
                  <!-- <p class="">{{ current_selected_intent }}</p> -->
                  <template v-if="!isEditIntent">
                    <div
                      class="ScrollStyle"
                      style=""
                    >
                      <div
                        v-for="(
                          new_question, index
                        ) in selected_intent_questions"
                        :key="index"
                      >
                        <li
                          style="
                            padding-left: 0rem;
                            list-style-position: inside;
                          "
                        >
                          {{ selected_intent_questions[index] }}
                        </li>
                        <!-- <p>{{ selected_intent_questions }}</p> -->
                      </div>
                    </div>
                  </template>

                  <template v-else>
                    <div style="display: block; margin-bottom: 1rem">
                      <label
                        style="
                          float: left !important;
                          margin-top: 5px !important;
                        "
                        >{{tlt('user_example_text')}}.</label
                      >
                      <div
                        class="dash-modal card-act"
                        style="
                          text-align: end !important;
                          margin-top: -10px !important;
                          margin-bottom: 6px !important;
                        "
                      >
                        <div
                          class="btn-wrap mt-0 py-0 border-top-0"
                          style=""
                        >
                          <button
                            id="add_question_button"
                            class="darkblue-btn"
                            style="padding: 5px 10px"
                            @click="add_to_questions_list('add')"
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
                          </button>
                          <button
                            type="submit"
                            class="darkblue-btn"
                            id="res_n_int_save"
                            @click="edit_intent()"
                          >
                            {{tlt('objective_save_btn')}}
                          </button>
                        </div>
                      </div>
                      <div
                        class="ScrollStyle"
                        style=""
                      >
                        <div
                          v-for="(
                            new_question, index
                          ) in selected_intent_questions"
                          :key="index"
                          class="form-group"
                          style="display: flex"
                        >
                          <input
                            type="text"
                            v-model.trim="selected_intent_questions[index]"
                            class="form-control edit"
                            :placeholder="tlt('user_example_here')"
                            :id="`enter_question_id_${index}`"
                          />
                          <span
                            v-if="selected_intent_questions.length > 1"
                            style="cursor: pointer"
                            class="my-auto ml-2 mr-0"
                            @click="add_to_questions_list('remove', index)"
                          >
                            <i style="font-size: 16px" class="fa">&#xf00d;</i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </template>
                  <!-- <hr/> -->
                </div>
                <div class="modal-footer" v-if="isEditIntent">
                  <div class="dash-modal card-act">
                    <div class="btn-wrap text-right mt-0 py-0 border-top-0">
                      <button
                        type="button"
                        class="btn btn-link"
                        data-dismiss="modal"
                        @click="edit_intent_details"
                      >
                        {{tlt('objective_cancel_btn')}}
                      </button>
                      <button
                        type="submit"
                        class="darkblue-btn"
                        id="res_n_int_save"
                        @click="edit_intent()"
                      >
                        {{tlt('objective_save_btn1')}}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-show="intentlist.length === 0 && !spinnerOn">
            <p class="text-center">
              <strong>
                {{tlt('objective_page_layout_text')}}</strong
              >
            </p>
          </div>
          <div
            class="pagin-table"
            style="margin-top: 2%"
            v-show="intentlist.length > 0"
          >
            <nav aria-label="Page navigation example">
              <ul class="pagination justify-content-center">
                <li class="page-item">
                  <a
                    class="page-link"
                    href="#"
                    @click="
                      isEditIntent
                        ? verify_changes()
                        : page_require(page_no - 1)
                    "
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
                    @click="
                      isEditIntent ? verify_changes() : page_require(pageno)
                    "
                    >...</a
                  >
                  <a
                    v-if="pageno != '...s' && pageno != '...l'"
                    class="page-link"
                    href="#"
                    @click="
                      isEditIntent ? verify_changes() : page_require(pageno)
                    "
                    >{{ pageno }}</a
                  >
                </li>
                <li class="page-item">
                  <a
                    class="page-link"
                    href="#"
                    @click="
                      isEditIntent
                        ? verify_changes()
                        : page_require(page_no + 1)
                    "
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
    <div
      id="intentmodel"
      class="modal fade dash-modal"
      role="dialog"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt />
              </div>
              <h3>{{tlt('add_objective_model_header')}}</h3>
              <button type="button" class="close" data-dismiss="modal">
                <img src="/img/close-icn.png" alt />
              </button>
            </div>
            <div class="form-group">
              <h5 class="heading">{{tlt('objective_model_obj_label')}}</h5>
              <label class="form-text text-muted"
                >{{tlt('objective_model_object_text')}}</label
              >
              <input
                type="text"
                v-model.trim="new_intents"
                class="form-control"
                :placeholder="tlt('enter_objective')"
                maxlength="25"
                id="enter_intent_id"
                v-on:keyup="enterintentid()"
                @keydown="intent_name_check_special_characters($event)"
              />
              <span v-show="intent_already_exists" style="color: red"
                >{{tlt('objective_model_obj_condition_label')}}</span
              >
            </div>
            <div class="form-group">
              <h5 class="heading">{{tlt('objective_model_desc_label')}}</h5>
              <textarea
                v-model="new_intent_description"
                id="enter_intent_description_id"
                :placeholder="tlt('add_desc_objective')"
                class="form-control py-2 px-3"
                type="text"
                rows="2"
              ></textarea>
            </div>
            <div class="form-group">
              <button
                id="add_question_button"
                class="darkblue-btn"
                style="padding: 5px 10px; float: right"
                @click="add_to_questions_list('add')"
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
              </button>
              <h5 class="heading">{{tlt('objective_model_user_example_label')}}</h5>
              <label class="pr-5 form-text text-muted">
                {{tlt('objective_model_user_example_text')}}<br />
                {{tlt('objective_model_user_example_help_text')}}
              </label>
            </div>
            <div
              v-for="(new_question, index) in add_questions_list"
              :key="index"
              class="form-group"
              style="display: flex"
            >
              <input
                type="text"
                v-model.trim="add_questions_list[index]"
                class="form-control pl-3"
                :placeholder="tlt('user_example_here')"
                :id="`enter_question_id_${index}`"
              />
              <span
                v-if="add_questions_list.length > 1"
                style="cursor: pointer"
                class="my-auto ml-2 mr-0"
                @click="add_to_questions_list('remove', index)"
              >
                <i style="font-size: 16px" class="fa">&#xf00d;</i>
              </span>
            </div>
          </div>
          <div class="modal-footer">
            <div class="btn-wrap card-act text-right mt-0 py-0 border-top-0">
              <button
                type="button"
                class="btn btn-link"
                data-dismiss="modal"
                @click="empty_variable"
              >
                {{tlt('add_objective_cancel_btn')}}
              </button>
              <button
                type="submit"
                class="darkblue-btn"
                id="res_n_int_save"
                @click="save_intent_user_example()"
              >
                {{tlt('add_objective_save_btn')}}
              </button>
            </div>
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
              <h3>{{tlt('upload_file_label')}}</h3>
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
            <form >
              <div class="form-group">
                <div class="custom-file">
                  <input
                    type="file"
                    accept=".csv"
                    class="custom-file-input"
                    @change="fileinput_csv"
                    id="inputGroupFilecsv"
                    aria-describedby="inputGroupFileAddoncsv"
                  />
                  <label
                    style="font-weight: 400; line-height: 15px"
                    class="custom-file-label form-control"
                    for="file"
                    >{{ file_label_csv }}</label
                  >
                </div>
              </div>
              <div class="btn-wrap text-right">
                <a href="#" @click="download_sample_file" id="sample_csv">
                  {{tlt('download_sample_file_label')}}
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
                  {{tlt('upload_file_cancel_btn')}}
                </button>
                <button type="submit" id="upload_file_btn" class="darkblue-btn" @click="file_submit">{{tlt('upload_file_submit_btn')}}</button>
              </div>
            </form>
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
import Template from "../Template.vue";
import { VueEditor } from "vue2-editor";
import { freeze_portal,show_subscription_expired_swal , close_modal } from "@/portal/mixins";
export default {
  components: { Template, VueEditor },
  name: "intents_component",
  mixins: [freeze_portal,show_subscription_expired_swal , close_modal],
  data() {
    return {
      pencil_svg:
        ' <svg xmlns="http://www.w3.org/2000/svg" width="15.546" height="15.461" viewBox="0 0 15.546 15.461"><defs><style>.a{fill:#9e9e9e;}</style></defs><g transform="translate(-747.888 -356.769)"><path class="a" d="M759.416,356.769a2.358,2.358,0,0,1,1.777.662c.534.513,1.072,1.025,1.567,1.575a2.3,2.3,0,0,1-.071,3.325c-2.736,2.76-5.494,5.5-8.238,8.251a1.381,1.381,0,0,1-.758.288c-.719.174-1.429.379-2.144.572-.932.251-1.862.5-2.795.751-.6.158-.989-.213-.832-.807q.689-2.595,1.406-5.182a1.164,1.164,0,0,1,.289-.487q4.091-4.107,8.2-8.2A2.265,2.265,0,0,1,759.416,356.769Zm-1.989,2.956-6.54,6.538,3.025,3.024,6.538-6.537Zm4.023,2.165c.118-.135.225-.269.343-.392a1.134,1.134,0,0,0,0-1.734c-.46-.466-.926-.925-1.388-1.39a1.166,1.166,0,0,0-.861-.368c-.578,0-.881.4-1.214.76Zm-12.084,8.863,3.2-.863-2.337-2.331Z" transform="translate(0)"/><path class="a" d="M813.942,422.6l-.789-.8,3.821-3.819.784.8Z" transform="translate(-59.648 -55.947)"/></g></svg>',
      spinnerOn: false,
      new_intent_description: "",
      intent_already_exists: false,
      intent_already_exists_edit: false,
      page_no: 1,
      per_page: 15,
      page_array: [],
      total_pages: null,
      number_of_rows: null,
      checked_list: [],
      isVisibleSearchClear: false,
      new_intents: "",
      add_questions_list: [""],
      old_intent_name: "",
      old_question_list: [],
      intentlist: [],
      companyname: "",
      companyid: "",
      search_name: "",
      isEditIntent: false,
      selected_intent_description: "",
      is_search_active: false,
      selected_intent_questions: [""],
      current_selected_intent: "",
      current_selected_intent_index: 0,
      intent_core_model_inprogress: false,
      spinnerOnFileDownload: false,
      file_label_csv: "Choose file",
    };
  },
  created() {
    if (this.$session.get("UserInformation").role == "SuperAdmin") {
      this.companyid = this.$session.get("CompanyId");
      this.companyname = this.$session.get("CompanyName");
    } else {
      this.companyid = this.$session.get("UserInformation").company_id;
      this.companyname = this.$session.get("UserInformation").company_name;
    }
    this.load_intent();
    this.check_intent_core_model_status();
  },
  mounted() {
    setTimeout(() => {
      this.freeze_portal();
    }, 1000);
    this.$root.$on("intents_componentDisabled", (data) => {
      if(data===true){
        this.show_subscription_expired_swal();
      }
    });
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
    $("#intentmodel").on("hidden.bs.modal", function (e) {
      vm.empty_variable();
    });
    $('a[data-target="#intentmodel"]').on("click", function () {
      if (vm.isEditIntent == true) {
        vm.verify_changes();
      } else {
        vm.empty_variable();
        $("#intentmodel").modal("show");
      }
    });
    this.$root.$on("send_model_status", data =>{
      if (data == true){
        this.check_intent_core_model_status();
      }
    });
  },
  watch: {
    search_name() {
      if (this.search_name === "") {
        this.load_intent();
        this.isVisibleSearchClear = false;
      } else if (this.search_name !== "") {
        this.isVisibleSearchClear = true;
      }
    },
    new_intents(val) {
      this.new_intents = val.replace(/[^a-zA-Z0-9_ ]/g, "");
    },
    current_selected_intent(val) {
      this.current_selected_intent = val.replace(/[^a-zA-Z0-9_ ]/g, "");
    },
  },
  methods: {
    verify_changes() {
      Swal({
        title: this.tlt('intent_swal_alert_msg1'),
        text: this.tlt('intent_swal_changes_in_objective_msg'),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.tlt('intent_swal_save_btn'),
        cancelButtonText: this.tlt('intent_swal_cancel_btn'),
      }).then((result) => {
        if (result.value) {
          this.edit_intent();
        } else {
          this.show_intents(this.current_selected_intent_index);
          this.isEditIntent = false;
        }
      });
    },
    callsearch() {
      if (event.keyCode === 13) {
        if (this.isEditIntent) {
          this.verify_changes();
        } else {
          this.search_intent();
        }
      }
    },
    search_intent(current_selected_intent_index) {
      if (this.search_name != "") {
        $("input:checkbox").prop("checked", false);
        this.checked_list = [];
        this.spinnerOn = true;
        axios
          .post(
            api_calls.form_automation_save_intent_example(),
            {
              company_id: this.companyid,
              company_name: this.companyname,
              license_key: this.$session.get("UserInformation").license_key,
              email: this.$session.get("UserInformation").email,
              token: this.$session.get("UserInformation").tokens,
              subscription: "Platinum",
              is_search: true,
              search_key: this.search_name,
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
            if (response.data.message.MSG_CODE == this.api_status_code.EMPTY_DATA_MODELS.MSG_CODE) {
              Swal({
                text: this.tlt('intent_search_no_result_found_msg'),
                toast: true,
                position: "top-end",
                type: "warning",
                showConfirmButton: false,
                timer: 2000,
              });
            } else if (
             response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE_MODELS.MSG_CODE
            ) {
              this.intentlist = [];
              this.page_no = 1;
              if (response.data.message.MSG_CODE != this.api_status_code.TOKEN_INVALID_0001_MODELS.MSG_CODE) {
              this.total_pages = response.data.pagination.total_page
                this.intentlist = response.data.data.ResponseList;
                for (var i = 0; i < this.intentlist.length; i++) {
                  this.intentlist[i].Intent = this.intentlist[i].Intent;
                }
                if (this.intentlist.length > 0) {
                  this.is_search_active = true;
                  if (Boolean(current_selected_intent_index)) {
                    this.show_intents(current_selected_intent_index);
                  } else {
                    this.show_intents(0);
                  }
                }
                this.setpagination(this.page_no);
              }
            } else if (response.data == "Internal Server Error") {
              Swal({
                text: this.tlt('intent_search_internal_server_msg1'),
                toast: true,
                position: "top-end",
                type: "warning",
                showConfirmButton: false,
                timer: 2000,
              });
              this.load_intent();
            } else {
              Swal({
                text: this.tlt('intent_search_internal_server_msg2'),
                toast: true,
                position: "top-end",
                type: "warning",
                showConfirmButton: false,
                timer: 2000,
              });
              this.load_intent();
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
      } else {
        Swal({
          text: this.tlt('intent_search_data_for_search_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    },
    check_current_intent(index) {
      var return_var = "";
      if (
        this.intentlist[index].Intent == this.current_selected_intent_highlight
      ) {
        return_var += "current-active-intent";
      }
      return return_var;
    },
    clear_search_name() {
      this.search_name = "";
    },
    add_to_questions_list(type, index) {
      if (!this.isEditIntent) {
        if (type == "add") {
          this.add_questions_list.unshift("");
        } else if (type == "remove") {
          this.add_questions_list.splice(index, 1);
        }
      } else {
        if (type == "add") {
          this.selected_intent_questions.unshift("");
        } else if (type == "remove") {
          this.selected_intent_questions.splice(index, 1);
        }
      }
    },
    show_intents(index) {
      this.isEditIntent = false;
      var clone_selected_intent = JSON.parse(
        JSON.stringify(this.intentlist[index])
      );
      this.current_selected_intent_index = index;
      this.current_selected_intent = clone_selected_intent.Intent;
      this.current_selected_intent_highlight = clone_selected_intent.Intent;
      this.selected_intent_questions = clone_selected_intent.Questions;
      this.old_question_list = this.selected_intent_questions;
      this.selected_intent_description =
        clone_selected_intent.IntentDescription;
      this.old_intent_name = this.current_selected_intent;
    },
    // This is for checking while entering a intent name if it already exists or not
    enterintentid() {
      let intent_search_key = this.new_intents;
      axios
        .post(
          api_calls.intent_question_response(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            subscription: this.$session.get("UserInformation").subscription,
            is_intent_search: true,
            intent_search_key: this.new_intents,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          if (
            response.data.message.MSG_CODE == this.api_status_code.INTENT_NAME_NOT_EXISTS_MODELS.MSG_CODE &&
            this.new_intents === intent_search_key
          ) {
            this.intent_already_exists = false;
            document.getElementById("enter_intent_id").style.border = null;
            if (this.new_intents != "") {
              document.getElementById("enter_intent_id").style.border =
                "1px solid #00f000";
            }
          } else if (
           response.data.message.MSG_CODE == this.api_status_code.DUPLICATE_INTENT_4011_MODELS.MSG_CODE &&
            this.new_intents === intent_search_key
          ) {
            this.intent_already_exists = true;
            document.getElementById("enter_intent_id").style.border =
              "1px solid red";
          }
        })
        .catch((e) => {
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409 ||
            e.response.status === 401
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    // This is for checking while editing and entering a objective name if it already exists or not
    enterintentid_edit() {
      axios
        .post(
          api_calls.intent_question_response(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            subscription: this.$session.get("UserInformation").subscription,
            is_intent_search: true,
            intent_search_key: this.current_selected_intent,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          if (response.data.message.MSG_CODE == this.api_status_code.INTENT_NAME_NOT_EXISTS_MODELS.MSG_CODE) {
            this.intent_already_exists_edit = false;
            document.getElementById("enter_intent_id_edit").style.border = null;
            if (this.current_selected_intent != "") {
              document.getElementById("enter_intent_id_edit").style.border =
                "1px solid #00f000";
            }
          } else if ( response.data.message.MSG_CODE == this.api_status_code.DUPLICATE_INTENT_4011_MODELS.MSG_CODE) {
            if (this.old_intent_name == this.current_selected_intent) {
              this.intent_already_exists_edit = false;
              document.getElementById("enter_intent_id_edit").style.border =
                null;
            } else {
              this.intent_already_exists_edit = true;
              document.getElementById("enter_intent_id_edit").style.border =
                "1px solid red";
            }
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
    edit_intent_details() {
      if (!this.isEditIntent) {
        this.isEditIntent = true;
      } else {
        this.isEditIntent = false;
      }
      return;
    },
    delete_selected() {
      if (this.checked_list.length == 0) {
        Swal({
          type: "warning",
          text: this.tlt('intent_no_objective_select_msg'),
          timer: 2000,
        });
      } else if (this.checked_list.length > 0) {
        var new_intent_list = [];
        for (var i in this.checked_list) {
          new_intent_list.push(this.checked_list[i]);
        }
        Swal.fire({
          title: this.tlt('intent_swal_alert_msg2'),
          text: this.tlt('intent_no_revert_msg'),
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: this.tlt('intent_swal_delete_btn'),
        }).then((result) => {
          if (result.value) {
            this.spinnerOn = true;
            axios
              .post(
                api_calls.intent_question_response(),
                {
                  intent_list: new_intent_list,
                  is_delete: true,
                  company_name: this.companyname,
                  company_id: this.companyid,
                  email: this.$session.get("UserInformation").email,
                  license_key: this.$session.get("UserInformation").license_key,
                  token: this.$session.get("UserInformation").tokens,
                  subscription: "Platinum",
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.$session.get("at")}`,
                  },
                }
              )
              .then((response) => {
                this.spinnerOn = false;
          
                if (response.data.message.MSG_CODE == this.api_status_code.INTENTS_DELETED_SUCCESS_MODELS.MSG_CODE) {
                  Swal({
                    type: "success",
                    text: this.tlt('intent_objective_is_deleted_msg'),
                    timer: 2000,
                  }).then((result) => {});
                  if (
                    this.checked_list.length === this.intentlist.length &&
                    this.page_no > 1
                  ) {
                    this.page_no = this.page_no - 1;
                  }
                } else if (
                  response.data.message.MSG_CODE == this.api_status_code.INTENT_USED_IN_DIALOG_DELETED_SUCCESSFULLY_MODELS.MSG_CODE
                ) {
                  Swal({
                    type: "info",
                    text: this.tlt('intent_modify_dialog_node_msg'),
                    timer: 8000,
                  });
                  if (
                    this.checked_list.length === this.intentlist.length &&
                    this.page_no > 1
                  ) {
                    this.page_no = this.page_no - 1;
                  }
                } else if ( response.data.message.MSG_CODE == this.api_status_code.NOTHING_TO_DELETE_MODELS.MSG_CODE) {
                  Swal({
                    type: "warning",
                    text: this.tlt('intent_no_objective_selected_msg'),
                    timer: 2500,
                  });
                } else if (
                 response.data.message.MSG_CODE == this.api_status_code.INTENT_DELETED_TRAIN_MODEL_MODELS.MSG_CODE
                ) {
                  Swal({
                    type: "info",
                    text: this.tlt('intent_trained_objetive_deleted_msg1'),
                    timer: 3000,
                  });
                  if (
                    this.checked_list.length === this.intentlist.length &&
                    this.page_no > 1
                  ) {
                    this.page_no = this.page_no - 1;
                  }
                } else if (
                 response.data.message.MSG_CODE == this.api_status_code.TRAINED_INTENT_AND_INTENT_USED_IN_DIALOG_DELETED_SUCCESSFULLY_MODELS.MSG_CODE
                ) {
                  Swal({
                    type: "info",
                    text: this.tlt('intent_trained_objetive_deleted_msg2'),
                    timer: 10000,
                  });
                  if (
                    this.checked_list.length === this.intentlist.length &&
                    this.page_no > 1
                  ) {
                    this.page_no = this.page_no - 1;
                  }
                } else {
                  Swal({
                    type: "error",
                    text: this.tlt('intent_delete_internal_server_msg'),
                    timer: 2000,
                  });
                  // this.load_intent();
                }
                this.checked_list = [];
                $("input:checkbox").prop("checked", false);
                this.load_intent();
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
                this.load_intent();
              });
          }
        });
      }
    },
    edit_intent() {
      if (this.old_intent_name == this.current_selected_intent) {
        var intent_to_send = null;
      } else {
        var intent_to_send = this.old_intent_name;
      }
      if (this.intent_already_exists_edit) {
        toastr.error(this.tlt('intent_edit_objective_name_exist_msg'));
        window.scrollTo(0, 0);
        return;
      }
      if (this.current_selected_intent == "") {
        Swal({
          text: this.tlt('intent_edit_enter_objective_name_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      }
      if (this.selected_intent_questions.length > 0) {
        for (let i = 0; i < this.selected_intent_questions.length; i++) {
          if (
            this.selected_intent_questions[i] === "" ||
            this.selected_intent_questions[i] === null
          ) {
            // toastr.error("Questions cannot be blank");
            Swal({
              text: this.tlt('intent_edit_qs_blank_msg'),
              toast: true,
              position: "top-end",
              type: "warning",
              showConfirmButton: false,
              timer: 2500,
            });
            return;
          }
        }
      }
      this.spinnerOn = true;
      axios
        .post(
          api_calls.form_automation_save_intent_example(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            edit_intent: true,
            old_intent_name: intent_to_send,
            old_question_list: this.old_question_list,
            intent: this.current_selected_intent,
            intent_description: this.selected_intent_description,
            question_list: this.selected_intent_questions,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          this.spinnerOn = false;
          if (response.data.message.MSG_CODE == this.api_status_code.INTENT_QUESTION_EDITED_MODELS.MSG_CODE) {
            Swal({
              text: this.tlt('intent_edited_successful_msg'),
              type: "success",
              timer: 3500,
              title: this.tlt('intent_edit_swal_success_msg'),
              toast: true,
              position: "top-right",
              showConfirmButton: false,
            });
            if (this.is_search_active === true) {
              this.search_intent(this.current_selected_intent_index);
            } else {
              this.load_intent(this.current_selected_intent_index);
            }
          } else if (
           response.data.message.MSG_CODE == this.api_status_code.USED_INTENT_QUESTION_EDITED_MODELS.MSG_CODE
          ) {
            Swal({
              type: "info",
              text: this.tlt('intent_edit_modify_dialog_node_msg'),
              allowOutsideClick: false,
              allowEscapeKey: false,
              timer: 7500,
            }).then((result) => {
              if (this.is_search_active === true) {
                this.search_intent(this.current_selected_intent_index);
              } else {
                this.load_intent(this.current_selected_intent_index);
              }
            });
          } else if (
             response.data.message.MSG_CODE == this.api_status_code.INTENT_QUESTION_NOT_EDITED_MODELS.MSG_CODE
          ) {
            Swal({
              type: "error",
              text: this.tlt('intent_edit_internal_server_msg1'),
              timer: 2500,
            });
          } else {
            Swal({
              type: "error",
              text: this.tlt('intent_edit_internal_server_msg2'),
              timer: 2500,
            });
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
          } else {
            Swal({
              type: "error",
              text: this.tlt('intent_edit_internal_server_msg3'),
              timer: 2500,
            });
          }
        });
    },
    show_model_progress(index){
      if(this.intent_core_model_inprogress == true){
         if (index == 'style'){
            return "cursor: not-allowed";
          }
          else if(index == 'title'){
            return "Training in Progress (This process might take around 30 mins to finish) ";
          }
      }
      else{
        return null;
      }
    },
    check_intent_core_model_status(){
      this.model_status = this.$session.get("ModelStatus");
      if (this.model_status == "No Failure"){
        this.intent_core_model_inprogress = false;
      }
      else if(Boolean(this.model_status.intent_model) === true
      || Boolean(this.model_status.dialogue_model) === true)
      {
        if(this.model_status.intent_model == "InProgress" || this.model_status.dialogue_model == "InProgress"){
          this.intent_core_model_inprogress = true;
      }
      else{
        this.intent_core_model_inprogress = false;
      }
      }
      else{
        this.intent_core_model_inprogress = false; 
      }
    },
    train_model() {
      Swal({
        title: this.tlt('intent_train_model_swal_msg'),
        text: this.tlt('intent_train_the_model_msg'),
        type: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.tlt('intent_train_swal_confirm_msg'),
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.value) {
          this.spinnerOn = true;
          axios
            .post(
              api_calls.train_model(),
              {
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                subscription: this.$session.get("UserInformation").subscription,
                company_name: this.companyname,
                company_id: this.companyid,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.spinnerOn = false;
              this.want_status = true;
              this.$root.$emit("want_model_status",this.want_status);
              this.check_intent_core_model_status();
              if ( response.data.message.MSG_CODE == this.api_status_code.INTENT_AND_CORE_MODEL_BEING_TRAINED_PREMIUM_MODELS.MSG_CODE) {
                toastr.success(response.data.message.MSG);
              } else if (response.data.message.MSG_CODE == this.api_status_code.TRAINING_LIMIT_EXCEED_MODELS.MSG_CODE) {
                toastr.error(response.data.message.MSG);
              } else {
                toastr.error(this.tlt('intent_train_internal_server_msg'));
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
    selected_intents(Intent) {
      if (Intent == "all") {
        if (event.target.checked) {
          this.checked_list = [];
          this.checked_list = this.intentlist.map((item) => {
            return item.Intent;
          });
          $("input:checkbox").prop("checked", false);
          for (let i = 0; i < this.checked_list.length; i++) {
            $("#intent_checkbox_" + this.checked_list[i]).prop("checked", true);
            $("#selectall").prop("checked", true);
          }
        } else if (!event.target.checked) {
          this.checked_list = [];
        }
      } else {
        if (event.target.checked == true) {
          let val_index = this.checked_list.filter((intents) => {
            return intents.Intent == Intent;
          });
          if (val_index.length == 0) {
            this.checked_list.push(Intent);
          }
        } else if (event.target.checked == false) {
          var selectall = document.querySelector("#selectall");
          if (selectall.checked == true) {
            selectall.checked = false;
          }
          let temp = this.checked_list.filter((intents) => {
            return intents != Intent;
          });
          this.checked_list = temp;
        }
      }
    },
    intent_name_check_special_characters(e) {
      if (/^[^a-zA-Z0-9_ ]*$/.test(e.key)) {
        e.preventDefault();
      }
    },
    load_intent(current_selected_intent_index) {
      // this.intentlist = [];
      this.is_search_active = false;
      this.search_name = "";
      $("input:checkbox").prop("checked", false);
      this.checked_list = [];
      this.spinnerOn = true;
      axios
        .post(
          api_calls.form_automation_save_intent_example(),
          {
            is_get: true,
            company_name: this.companyname,
            company_id: this.companyid,
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
          this.spinnerOn = false;
          if (response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE_MODELS.MSG_CODE) {
           
            this.total_pages = response.data.pagination.total_page
            this.intentlist = response.data.data.data;
            if (this.intentlist.length > 0) {
              if (Boolean(current_selected_intent_index)) {
                this.show_intents(current_selected_intent_index);
              } else {
                this.show_intents(0);
              }
            }
          }
          this.setpagination(this.page_no);
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
    },
    page_require(page) {
      $("input:checkbox").prop("checked", false);
      this.checked_list = [];
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
              api_calls.form_automation_save_intent_example(),
              {
                intent: this.new_intents,
                company_name: this.companyname,
                company_id: this.companyid,
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                subscription: "Platinum",
                is_get: true,
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
              this.intentlist = response.data.data.data;
              if (this.intentlist.length > 0) {
                this.show_intents(0);
              }
              this.setpagination(this.page_no);
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
        } else {
          $("input:checkbox").prop("checked", false);
          if (this.pageno == "...s") {
            this.page_no = Math.ceil((1 + this.page_no) / 2);
          } else if (this.pageno == "...l") {
            this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
          } else {
            this.page_no = this.pageno;
          }
          this.spinnerOn = true;
          axios
            .post(
              api_calls.form_automation_save_intent_example(),
              {
                company_id: this.$session.get("UserInformation").company_id,
                company_name: this.$session.get("UserInformation").company_name,
                license_key: this.$session.get("UserInformation").license_key,
                email: this.$session.get("UserInformation").email,
                token: this.$session.get("UserInformation").tokens,
                subscription: "Platinum",
                is_search: true,
                search_key: this.search_name,
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
            if (response.data.message.MSG_CODE == this.api_status_code.EMPTY_DATA_MODELS.MSG_CODE) {
              Swal({
                text: this.tlt('intent_page_no_result_msg'),
                toast: true,
                position: "top-end",
                type: "warning",
                showConfirmButton: false,
                timer: 2000,
              });
            } else if (
              
              response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE_MODELS.MSG_CODE
            ) {
              this.intentlist = [];
              if ( response.data.message.MSG_CODE != this.api_status_code.TOKEN_INVALID_0001_MODELS.MSG_CODE) {
                
                this.total_pages = response.data.pagination.total_page
                this.intentlist = response.data.data.ResponseList;
                for (var i = 0; i < this.intentlist.length; i++) {
                  this.intentlist[i].Intent = this.intentlist[i].Intent;
                }
                if (this.intentlist.length > 0) {
                  this.is_search_active = true;
                  this.show_intents(0);
                }
                this.setpagination(this.page_no);
              }
            } else if (response.data.message.MSG_CODE != this.api_status_code.INTERNAL_SERVER_ERROR_MODELS.MSG_CODE ) {
              Swal({
                text: this.tlt('intent_internal_server_msg4'),
                toast: true,
                position: "top-end",
                type: "warning",
                showConfirmButton: false,
                timer: 2000,
              });
              this.load_intent();
            } else {
              Swal({
                text: this.tlt('intent_internal_server_msg5'),
                toast: true,
                position: "top-end",
                type: "warning",
                showConfirmButton: false,
                timer: 2000,
              });
              this.load_intent();
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
    save_intent_user_example() {
      if (this.intent_already_exists) {
        Swal({
          text: this.tlt('intent_objective_name_exist_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 4500,
        });
        return;
      }
      if (this.new_intents == "") {
        Swal({
          text: this.tlt('intent_enter_objective_name_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 3500,
        });
        return;
      }
      if (this.add_questions_list.length > 0) {
        for (let i = 0; i < this.add_questions_list.length; i++) {
          if (
            this.add_questions_list[i] === "" ||
            this.add_questions_list[i] === null
          ) {
            Swal({
              text: this.tlt('intent_type_user_example_msg'),
              toast: true,
              position: "top-end",
              type: "warning",
              showConfirmButton: false,
              timer: 35000,
            });
            return;
          }
        }
      }
      Swal({
        text: this.tlt('intent_submit_your_details_msg'),
        type: "info",
        toast: true,
        showConfirmButton: false,
      });
      axios
        .post(
          api_calls.form_automation_save_intent_example(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            is_save: true,
            intent: this.new_intents,
            intent_description: this.new_intent_description,
            question_list: this.add_questions_list,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          this.spinnerOn = false;
          if (response.data.message.MSG_CODE == this.api_status_code.ADDED_SUCCESSFULLY_0002_MODELS.MSG_CODE ) {
            Swal({
              text: this.tlt('intent_example_saved_msg'),
              type: "success",
              timer: 3500,
              title: this.tlt('intent_swal_success_msg'),
              toast: true,
              position: "top-right",
              showConfirmButton: false,
            });
            $("#intentmodel").modal("hide");
            this.empty_variable();
            this.load_intent();
          } else if (response.data.message.MSG_CODE == this.api_status_code.INTENT_NOT_SAVED_MODELS.MSG_CODE ) {
            Swal({
              type: "error",
              text: this.tlt('intent_save_internal_server_msg1'),
              timer: 2500,
            });
          } else {
            Swal({
              type: "error",
              text: this.tlt('intent_save_internal_server_msg2'),
              timer: 2500,
            });
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
          } else {
            Swal({
              type: "error",
              text: this.tlt('intent_save_internal_server_msg3'),
              timer: 2500,
            });
          }
        });
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
    empty_variable() {
      this.new_intents = "";
      this.new_intent_description = "";
      this.intent_already_exists = false;
      this.intent_already_exists_edit = false;
      this.intents = this.intentlist[0];
      this.new_intents = "";
      this.add_questions_list = [""];
      this.isEditIntent = false;
      document.getElementById("enter_intent_id").style.border = "";
      $("input:checkbox").prop("checked", false);
    },
    file_submit() {
      event.preventDefault();
      if ($("#inputGroupFilecsv").val() == '') {
        Swal.fire({
          title: this.tlt('intent_input_field_empty_msg'),
          text: this.tlt('intent_upload_file_msg'),
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
      }
      var user_details = {
        email: this.$session.get("UserInformation").email,
        token: this.$session.get("UserInformation").tokens,
        company_name: this.companyname,
        company_id: this.companyid,
        license_key: this.$session.get("UserInformation").license_key,
        is_form_intents: true,
      };
      var json = JSON.stringify(user_details);
      var blob = new Blob([json], {
        type: "application/json",
      });
      if (this.file_label_csv == "Choose file") {
      } else {
        const fd = new FormData();
        fd.append(
          "file",
          this.file_content_csv,
          this.companyname + "ObjectiveFile.csv"
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
            if (response.data.message.MSG_CODE == this.api_status_code.FILE_UPLOAD_MODELS.MSG_CODE) {
              Swal({
                title: this.tlt('intent_file_uploaded_msg'),
                type: "success",
                showConfirmButton: false,
                timer: 2000,
              });
            } else if (response.data.message.MSG_CODE == this.api_status_code.INCORRECT_FILE_FORMAT_MODELS.MSG_CODE) {
              Swal({
                title: this.tlt('intent_incorrect_file_format_msg'),
                type: "warning",
                text:
            this.tlt('intent_download_sample_file_msg1'),
                // timer: 4000,
              });
            } else if (response.data.message.MSG_CODE == this.api_status_code.INVALID_FILE_TYPE_MODELS.MSG_CODE) {
              Swal({
                title: this.tlt('intent_file_type_not_support_msg'),
                type: "warning",
                text:
            this.tlt('intent_download_sample_file_msg1'),
                // timer: 4000,
              });
            } else {
              Swal({
                title: this.tlt('intent_error_occurred_msg1'),
                type: "error",
              });
            }
            this.file_label_csv = "Choose file";
            document.getElementById("inputGroupFilecsv").value = "";
            this.load_intent();
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
          this.close_modal('upload_file_btn')
      }
    },
    download_sample_file() {
      event.preventDefault();
      this.spinnerOnFileDownload = true;
      axios({
        method: "post",
        url: api_calls.file_download(),
        responseType: "blob",
        data: {
          sample_file: "objective",
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
          $("#file_upload").modal("hide");
          this.spinnerOnFileDownload = false;
          // if (response.data.message.MSG_CODE === this.api_status_code.EMPTY_DATA_MODELS.MSG_CODE) {
          //   Swal({
          //     title: this.tlt('intent_error_occurred_msg2'),
          //     type: "error",
          //     timer: 2500,
          //   });
          // } else {
          if(response.data != null){
            var url = window.URL.createObjectURL(new Blob([response.data]));
            var link = document.createElement("a");
            link.href = url;
            // console.log(this.companyname)
            link.setAttribute("download", this.companyname + "ObjectiveFile.csv");
            document.body.appendChild(link);
            link.click();
          // }
          } else {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              type: "error",
              timer: 2500
            })
          }
        })
        .catch((e) => {
          this.spinnerOnFileDownload = false;
          Swal({
            title: this.tlt('intent_error_occurred_msg3'),
            type: "error",
            timer: 2500,
          });
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
        this.close_modal('sample_csv')
    },
    fileinput_csv() {
      this.file_label_csv = event.target.files[0].name;
      this.file_content_csv = event.target.files[0];
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
            is_form_intents: true,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          if(response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE.MSG_CODE){
            var a = window.document.createElement("a");
            a.href = response.data.data.CSV_URL;
            a.download = true;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          } else {
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                type: "error",
                timer: 2500
              })
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
  },
};
</script>

<style scoped>
.modal-lg {
  max-width: 800px !important;
}
textarea {
  resize: none !important;
}
.dash-cont {
  margin-left: 0px;
  padding-top: 0px;
}
.ScrollStyle {
  min-height: 0px;
  max-height: 250px;
  overflow-y: auto;
}
.ScrollStyle thead th {
  top: 0;
  position: sticky;
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
.table-box tbody tr:hover td,
.table-box tbody tr:hover th {
  background: #ececec;
}
.edit {
  line-height: 16px;
  padding: 10px 15px;
}
.current-active-intent {
  background: rgba(0, 0, 0, 0.1);
}
#add_question_button:hover {
  background: #273679;
}
hr {
  margin-top: 0;
}
.edit-column {
  height: 29px !important;
}
.modal {
  overflow-y: auto;
}
.hclass6 {
  font-weight: 100;
}
.noteclass {
  font-weight: 600;
}
.dot {
  height: 10px;
  width: 10px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
}
.disabled_btn{
  pointer-events: none;
  opacity: 0.5;

  
}

.dot.success {
  background-color: #273679;
}
@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(359deg);
  }
}
@-moz-keyframes rotation {
  from {
    -moz-transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(359deg);
  }
}
@-o-keyframes rotation {
  from {
    -o-transform: rotate(0deg);
  }
  to {
    -o-transform: rotate(359deg);
  }
}
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>

