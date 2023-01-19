<template>
  <div>
    <div class="dash-cont">
      <div class="spinner" id="spinner" v-show="spinnerOn"></div>
      <div class="container-fluid">
        <div class="card dash-card">
          <div
            class="card-header d-block d-sm-flex flex-wrap justify-content-between"
          >
            <h4 class="mb-sm-0">{{tlt('intent_page_title')}}</h4>
            <div class="card-act d-flex flex-wrap">
              <!-- for search -harsh -->
              <input
                class="form-control search-bar"
                id="search_bar"
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
                :class="intent_core_model_inprogress === true ? 'disabled_btn' : ''"
                id="add_intent_btn"
                title="Add new Intent"
                @click="add_variant_open_modal()"
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
                {{tlt('intent_page_add_intent_btn')}}
              </a>
              <a
                href="#"
                class="darkblue-btn"
                 :class="intent_core_model_inprogress === true ? 'disabled_btn' : ''"
                title="Upload File"
                data-toggle="modal"
                @click="upload_file_open_modal"
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
                {{tlt('intent_page_train_model_btn')}}
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
                {{tlt('intent_page_delete_btn')}}
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
                              <label class="form-check-label" :style="chk_cbx_crsr('all')">
                                <input
                                  class="form-check-input"
                                  id="selectall"
                                  type="checkbox"
                                  @change="selected_intents('all')"
                                  :disabled="check_select_all_intents_cbx_disabled"
                                />
                                <span class="icn" v-if="check_select_all_intents_cbx_disabled" style="background:#bbb; border:solid 1px #e5e5e5;"></span>
                                <span class="icn" v-else></span>
                              </label>
                            </div>
                          </th>
                          <th scope="col" class="text-left">{{tlt('intent_table_header')}}</th>
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
                                class="form-check-label checkbox checkbox-success" :style="chk_cbx_crsr(intents.Intent)"
                              >
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  :id="'intent_checkbox_'+intents.Intent"
                                  @change="selected_intents(intents.Intent)"
                                  :disabled="
                                    default_retail_intents.includes(
                                      intents.Intent
                                    )
                                  "
                                />
                                <span class="icn" v-if="default_retail_intents.includes(intents.Intent)" style="background:#bbb; border:solid 1px #e5e5e5;"></span>
                                <span class="icn" v-else></span>
                              </label>
                            </div>
                          </th>
                          <td
                            style="cursor: pointer"
                            @click="isEditIntent ? verify_changes() : show_intents(index)"
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
              <div class="col-sm-8 pr-0" id="edit-intent-box" v-show="intentlist.length > 0">
                <div style="border: 1px solid #dbe2e8">
                  <div class="col-sm-12">
                    <div style="color: #414141" class="d-flex">
                      <h5><p class="mt-2 mb-0">{{tlt('intent_page_detail_header')}}</p></h5>
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
                        {{tlt('intent_page_name_label')}} 
                      </p>
                    </h5>
                    <h6 class="pl-1" style="font-weight: 400;" v-if="isEditIntent">{{tlt('intent_page_name_desc_label')}}</h6>
                    <div v-if="!isEditIntent" style="padding-left: 20px">
                      <p>{{ current_selected_intent }}</p>
                      <!-- <span v-html="current_intent_response"></span> -->
                    </div>
                    <template v-else-if="isEditIntent">
                      <input
                        align="right"
                        class="form-control edit"
                        autocomplete="off"
                        :placeholder="tlt('enter_intent')"
                        id="enter_intent_id_edit"
                        v-on:keyup="enterintentid_edit"
                        v-model="current_selected_intent"
                        @keydown="intent_name_check_special_characters($event)"
                        :disabled="(default_retail_intents.includes(current_selected_intent))   && (current_selected_intent === current_selected_intent_highlight) "
                      />
                      <span
                        v-show="intent_already_exists_edit"
                        style="color: red"
                        >{{tlt('intent_page_name_exist_condition')}}.</span>
                    </template>
                    <div v-if="selected_intent_description">
                      <h5>
                        <p class="mt-2 mb-0" style="color: #414141">
                          {{tlt('intent_page_description_label')}}
                        </p>
                      </h5>
                      <div v-if="!isEditIntent" style="padding-left: 20px">
                        <p>{{ selected_intent_description }}</p>
                      </div>
                      <template v-else>
                        <input
                          align="right"
                          class="form-control edit"
                          :placeholder="tlt('add_desc')"
                          id="enter_intent_description_id_edit"
                          v-model="selected_intent_description"
                        />
                      </template>
                    </div>
                  </div>
                  <hr />
                  <div class="col-sm-12 p-0" style="padding-left:15px !important;">
                    <h5>
                      <p class="mt-2 mb-0" style="color: #414141">{{tlt('intent_page_question_label')}}</p>
                    </h5>
                    <!-- <p class="">{{ current_selected_intent }}</p> -->
                    <template v-if="!isEditIntent">
                      <div class="ScrollStyle" style="padding-right:8px !important">
                        <div
                          v-for="(
                            new_question, index
                          ) in new_intent_question_list"
                          :key="index"
                        >
                          <li
                            style="
                              padding-left: 0rem;
                              list-style-position: inside;
                            "
                          >
                            {{ new_intent_question_list[index] }}
                          </li>
                          <!-- <p>{{ selected_intent_questions }}</p> -->
                        </div>
                      </div>
                    </template>

                    <template v-else>
                      <div style="display: block; margin-bottom: 1rem">
                        <label style="float: left !important;margin-top: 5px !important;"
                        >{{tlt('intent_page_question_desc_label')}}</label
                        >
                        <div class="dash-modal card-act"
                          style="text-align: end !important;
                            margin-top: -10px !important;
                            margin-bottom: 6px !important;">
                          <div class="btn-wrap mt-0 py-0 border-top-0" style="padding-right: 15px;">
                            <button
                              id="add_question_button"
                              class="darkblue-btn"
                              style="padding: 5px 10px;"
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
                              {{tlt('save_btn')}}
                            </button>
                          </div>
                        </div>
                        <div class="ScrollStyle" style="padding-right:8px !important">
                          <div
                            v-for="(
                              new_question, index
                            ) in selected_intent_questions"
                            :key="index"
                            class="form-group"
                            style="display:flex;"
                          >
                            <input
                              type="text"
                              v-model.trim="selected_intent_questions[index]"
                              class="form-control edit"
                              :placeholder="tlt('enter_question')"
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
                    <hr v-show="!default_retail_intents.includes(this.current_selected_intent)">
                  </div>
                  <div v-show="is_response || is_endpoint">
                    <div v-show="!isEditIntent">
                      <div class="col-sm-12" v-show="is_response">
                        <h5>
                          <p class="mt-2 mb-0" style="color: #414141">{{tlt('intent_page_save_resp_label')}}</p>
                        </h5>
                        <!-- <div class="row">
                            <div class="col-md-3">Response :</div>
                            <div class="col-md-9">
                              <span v-html="selected_intent_response"></span>
                            </div>
                          </div> -->

                        <strong> {{tlt('intent_page_save_responses_label')}} </strong>:
                        <div>
                          <div class="ScrollStyle" style="padding-right:8px !important">
                            <!-- <span v-html="selected_intent_response"></span> -->
                            <div
                              v-for="(
                                new_response, index
                              ) in selected_intent_response"
                              :key="index"
                              style="display: flex;"
                            >
                              <p>{{index+1}}. </p>
                              <li
                                style="
                                padding-left: 0.5rem;
                                list-style-position: inside;
                                list-style-type: none;
                                "
                                v-html="selected_intent_response[index]"
                              >
                                <!-- {{ selected_intent_response[index] }} -->
                              </li>
                            </div>
                          </div>
                        </div>

                        <p style="margin-top: 16px">
                          <strong> {{tlt('intent_page_source_label')}} </strong>:
                          {{ selected_intent_response_source }}
                        </p>
                        <!-- <br /> -->
                        <p v-if="file_label3 == 'Choose file'">
                          <strong>{{tlt('intent_page_img_url_label')}}</strong> : None
                        </p>
                        <p v-else>
                          <strong>{{tlt('intent_page_img_url_label')}}</strong> : {{ file_label3 }}
                        </p>
                        <!-- <br /> -->
                        <p
                          v-if="
                            selected_intent_response_video == '' ||
                            selected_intent_response_video == []
                          "
                        >
                          <strong>{{tlt('intent_page_video_url_label')}}</strong> : None
                        </p>
                        <div v-else>
                          <strong>{{tlt('intent_page_video_url_label')}}</strong> :{{
                            selected_intent_response_video
                          }}
                        </div>
                      </div>
                      <div class="col-sm-12" v-show="is_endpoint">
                        <h5>
                          <p class="mt-2 mb-0" style="color: #414141">
                            API Endpoints
                          </p>
                        </h5>
                        <p><strong>URL</strong> : {{ url }}</p>
                        <p><strong>API Method</strong> : {{ api_method }}</p>
                        <p>
                          <strong>Request JSON</strong> :
                          {{ show_json_request_data }}
                        </p>
                        <div v-if="editable_values != ''">
                          <strong>Request JSON Parameters</strong> :
                          {{ editable_values }}

                          <div v-if="task_input_values == ''"></div>
                          <div v-else>
                            <strong>Task Input Values</strong> :
                            <table class="table" style="border: 1px solid black">
                              <thead>
                                <tr style="border: 1px">
                                  <td
                                    scope="col"
                                    style="
                                      width: 150px;
                                      text-align: center;
                                      border: 1px solid black;
                                    "
                                  >
                                    Input Value
                                  </td>
                                  <td
                                    v-show="api_method == 'POST'"
                                    scope="col"
                                    style="
                                      text-align: center;
                                      border: 1px solid black;
                                    "
                                  >
                                    Question to be asked by the chatbot
                                  </td>
                                  <td
                                    v-show="api_method == 'GET'"
                                    scope="col"
                                    style="
                                      text-align: center;
                                      border: 1px solid black;
                                    "
                                  >
                                    Selected tags
                                  </td>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="(row, index) in utterances"
                                  :key="index"
                                  id="list-group"
                                  style="border: 1px"
                                >
                                  <td
                                    scope="row"
                                    style="
                                      text-align: center;
                                      border: 1px solid black;
                                    "
                                  >
                                    {{ row.RawSlotName }}
                                  </td>
                                  <td
                                    style="
                                      text-align: center;
                                      border: 1px solid black;
                                    "
                                  >
                                    {{ row.Text }}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div v-if="response_json_editable != ''">
                          <p>
                            <strong>Response Json Editable</strong> :
                            {{ response_json_editable }}
                          </p>
                        </div>
                        <div v-if="enduser_msg_type != null">
                          <p>
                            <strong>End User Message Type</strong> :
                            {{ enduser_msg_type }}
                          </p>
                        </div>
                        <div v-if="show_json_response_data != ''">
                          <p>
                            <strong>Response JSON</strong> :
                            {{ show_json_response_data }}
                          </p>
                        </div>
                        <div v-if="response_key_to_enduser != ''">
                          <p>
                            <strong
                              >Response JSON parameter sent to end user</strong
                            >
                            :
                            {{ response_key_to_enduser }}
                          </p>
                        </div>
                        <div v-if="response_key_edit_message != ''">
                          <p>
                            <strong>Message With Response JSON Parameter</strong>
                            : {{ response_key_edit_message }}
                          </p>
                        </div>
                        <div v-if="end_user_message != ''">
                          <p>
                            <strong>End User Message</strong> :
                            {{ end_user_message }}
                          </p>
                        </div>
                        <div v-if="unsuccessful_message != ''">
                          <p>
                            <strong>Message to user upon failure</strong> :
                            {{ unsuccessful_message }}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12" v-show="isEditIntent && (!default_retail_intents.includes(this.current_selected_intent) || (this.current_selected_intent === 'shipping' || 'messaging_platform' || 'contact_us'))">
                      <div class="modal-head d-flex align-items-center">
                        <!-- <div style="width: 30%"> -->
                        <div v-show="is_response" style="width: 30%">
                          <h5>
                            <p class="mt-2 mb-0" style="color: #414141">
                              {{tlt('intent_page_edit_resp_label')}}
                            </p>
                          </h5>
                        </div>
                        <div v-show="!is_response" style="width: 30%">
                          <h5>
                            <p class="mt-2 mb-0" style="color: #414141">
                              API Endpoint
                            </p>
                          </h5>
                        </div>
                        <!-- </div> -->
                        <!-- <div class="radio" style="margin-left: 40%">
                        <label>
                          <input
                            type="radio"
                            id="radioBtn"
                            @click="editswitching(this)"
                          />
                          <span class="icn"></span>
                          Define Endpoints Here</label
                        >
                      </div> -->
                      </div>
                      <hr />
                      <div v-show="is_response">
                        <div class="form-group">
                          <div class="d-flex">
                            <p>{{tlt('intent_page_edit_resp_with_image')}}:</p>
                            <div class="ml-2">
                              <center>
                                <div class="radio" style="margin-bottom: 3%">
                                  <label>
                                    <input
                                      type="radio"
                                      v-model="edit_image_response"
                                      value="Yes"
                                    />
                                    <span class="icn"></span> {{tlt('intent_edit_img_yes')}}
                                  </label>
                                  <label>
                                    <input
                                      type="radio"
                                      v-model="edit_image_response"
                                      value="No"
                                    />
                                    <span class="icn"></span> {{tlt('intent_edit_img_no')}}
                                  </label>
                                </div>
                              </center>
                            </div>
                          </div>

                          <div
                            class="custom-file"
                            v-show="edit_image_response == 'Yes'"
                          >
                            <input
                              type="file"
                              accept="image/x-png, image/gif, image/jpeg"
                              class="custom-file-input"
                              @change="fileinput3"
                              id="inputGroupFileAddon01"
                            />
                            <label
                              style="font-weight: 400; line-height: 15px"
                              class="custom-file-label form-control edit"
                              for="file"
                              >{{ file_label3 }}</label
                            >
                          </div>
                        </div>
                        <div class="form-group">
                          <div class="d-flex">
                            <p>{{tlt('intent_page_edit_resp_with_video')}}:</p>
                            <div class="ml-2">
                              <center>
                                <div class="radio" style="margin-bottom: 3%">
                                  <label>
                                    <input
                                      type="radio"
                                      id="res_video_type"
                                      v-model="edit_video_response"
                                      value="Yes"
                                    />
                                    <span class="icn" id="res_video_icn"></span>
                                    {{tlt('intent_page_edit_video_yes_option')}}
                                  </label>
                                  <label>
                                    <input
                                      type="radio"
                                      v-model="edit_video_response"
                                      value="No"
                                    />
                                    <span class="icn"></span> {{tlt('intent_edit_video_no')}}
                                  </label>
                                </div>
                              </center>
                            </div>
                          </div>
                          <div
                            v-show="edit_video_response == 'Yes'"
                            style="margin-bottom: 5%"
                          >
                            <input
                              id="res_video_url"
                              type="url"
                              class="form-control edit"
                              :placeholder="tlt('enter_url')"
                              v-model="selected_intent_response_video"
                              @change="embedded_change_edit"
                            />
                          </div>
                        </div>
                        <div style="display: block; margin-bottom: 1rem">
                            <label style="float: left !important;margin-top: 5px !important;"
                              >{{tlt('intent_page_edit_resp_user_by_bot_text')}}</label
                            >
                            <div class="dash-modal card-act" 
                              style="text-align: end !important; 
                                margin-top: -10px !important;
                                margin-bottom: 6px !important;">
                              <div class="btn-wrap mt-0 py-0 border-top-0">
                                <button
                                  id="add_question_button"
                                  class="darkblue-btn"
                                  style="padding: 5px 10px;"
                                  @click="add_to_response_list('add')"
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
                                 {{tlt('save_btn')}}
                                </button>
                              </div>
                            </div>
                            <div class="mt-2 mb-2" style="color: #df7474;"> 
                               <span>* html content/tags are not supported on whatsapp and messenger bot.</span>
                            </div>
                          <div
                            v-for="(
                              new_response, index
                            ) in selected_intent_response"
                            :key="index"
                            class="form-group"
                          >
                            <span
                              v-if="selected_intent_response.length > 1"
                              style="float: right; cursor: pointer; margin-right: 12px; margin-top: 12px"
                              @click="add_to_response_list('remove', index)"
                            >
                              <i style="font-size: 16px" class="fa">&#xf00d;</i>
                            </span>
                            <vue-editor
                              v-model="selected_intent_response[index]"
                              :editorToolbar="customToolbar"
                            ></vue-editor>
                          </div>
                        </div>
                        <div class="form-group">
                          <label>{{tlt('intent_page_edit_select_source')}}</label>
                          <select
                            class="form-control"
                            style="padding:6px 6px 6px 1rem!important"
                            v-model="selected_intent_response_source"
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
                      </div>
                      <!-- <EDIT INTENT ENDPOINT> -->
                      <div v-show="!is_response">
                        <div class="d-flex">
                          <span v-html="point_circle_svg"></span>
                          <p class="ml-1"><b> REQUEST JSON </b></p>
                        </div>
                        <div class="form-group">
                          <label>URL</label>
                          <input
                            type="text"
                            class="form-control edit"
                            v-model="url"
                            id="add_api_url_edit"
                            :placeholder="tlt('enter_url1')"
                          />
                        </div>
                        <div class="form-group d-flex">
                          <label class="pt-1">Method:</label>
                          <div class="radio ml-3">
                            <label>
                              <input
                                type="radio"
                                class="form-control"
                                id="configapi_post"
                                v-model="api_method"
                                value="POST"
                              />
                              <span class="icn" id="configapi_post_icn"></span>
                              POST
                            </label>
                            <label>
                              <input
                                type="radio"
                                v-model="api_method"
                                value="GET"
                              />
                              <span class="icn"></span> GET
                            </label>
                          </div>
                        </div>
                        <div class="form-group">
                          <label>Request JSON</label>
                          <span style="margin-left: 8px">
                            <svg
                              data-tooltip="tooltip"
                              data-placement="bottom"
                              title="Help"
                              data-toggle="modal"
                              data-target="#configapimodal4"
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
                            id="configapi_req_json"
                            :class="'edit form-control ' + json_request_class"
                            :placeholder="tlt('request_json_data')"
                            rows="5"
                            v-model="show_json_request_data"
                          ></textarea>
                        </div>
                        <div class="form-group d-flex">
                          <label class="pt-1">Request JSON Editable:</label>
                          <div class="radio ml-3">
                            <label>
                              <input
                                type="radio"
                                class="form-control"
                                v-model="request_json_editable"
                                value="True"
                                id="configapi_true1"
                              />
                              <span class="icn" id="configapi_true_icn"></span>
                              True
                            </label>
                            <label>
                              <input
                                type="radio"
                                class="form-control"
                                v-model="request_json_editable"
                                value="False"
                              />
                              <span class="icn"></span> False
                            </label>
                          </div>
                        </div>
                        <div
                          class="form-group"
                          v-show="request_json_editable == 'True'"
                        >
                          <label>Request JSON Parameters</label>
                          <textarea
                            id="input_from_user_id"
                            class="form-control edit"
                            v-model="editable_values"
                            placeholder="Mention all the request json parameters here, the values which will be given by the users. Multiple parameters to be separated by ';'"
                            rows="5"
                            v-on:keyup="edit_pushing()"
                          ></textarea>
                          <div
                            class="row"
                            v-if="
                              api_method == 'POST' && show_task_values == true
                            "
                          >
                            <div class="col-md-3">
                              <div class="form-group">Input Value</div>
                            </div>
                            <div class="col-md-9">
                              Question to be asked by the chatbot
                            </div>
                          </div>
                          <div
                            class="row"
                            v-if="api_method == 'GET' && show_task_values == true"
                          >
                            <div class="col-md-3">
                              <div class="form-group">Input Value</div>
                            </div>
                            <div class="col-md-9">Select the tags</div>
                          </div>
                          <div
                            class="row"
                            v-for="(input, index) in task_input_values"
                            :key="index"
                            v-show="request_json_editable == 'True'"
                          >
                            <div class="col-md-3">
                              <div class="form-group">{{ input.key_name }}</div>
                            </div>
                            <div class="col-md-9">
                              <div class="row" v-show="api_method == 'POST'">
                                <div class="col-md-9">
                                  <div class="form-group">
                                    <input
                                      class="form-control edit"
                                      :id="'subject_input_edit' + index"
                                      v-model="
                                        task_input_values[index].input_text
                                      "
                                    />
                                  </div>
                                </div>
                              </div>
                              <div
                                class="form-group"
                                v-show="api_method == 'GET'"
                              >
                                <select
                                  class="form-control edit"
                                  v-model="input.input_text"
                                >
                                  <option value>Select A Value</option>
                                  <option
                                    v-for="(
                                      value, index
                                    ) in post_method_request_list"
                                    :value="value"
                                    :key="index"
                                  >
                                    {{ value }}
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="d-flex">
                          <span v-html="point_circle_svg"></span>
                          <p class="ml-1"><b> RESPONSE JSON </b></p>
                        </div>
                        <div class="form-group d-flex">
                          <label class="pt-1">End User Message Type:</label>
                          <div class="radio ml-3">
                            <label>
                              <input
                                type="radio"
                                v-model="enduser_msg_type"
                                :disabled="isEdit"
                                value="Through_API"
                                id="eu_msg_radio"
                              />
                              <span class="icn" id="eu_thru_api"></span> Through
                              API
                            </label>
                            <label>
                              <input
                                type="radio"
                                v-model="enduser_msg_type"
                                value="Custom"
                              />
                              <span class="icn"></span> Custom
                            </label>
                          </div>
                        </div>
                        <div
                          class="form-group"
                          v-show="enduser_msg_type == 'Through_API'"
                        >
                          <label>Response JSON</label>
                          <span style="margin-left: 8px">
                            <svg
                              data-tooltip="tooltip"
                              data-placement="bottom"
                              title="Help"
                              data-toggle="modal"
                              data-target="#configapimodal2"
                              fill="#273679"
                              xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:cc="http://creativecommons.org/ns#"
                              xmlns:dc="http://purl.org/dc/elements/1.1/"
                              height="24"
                              width="24"
                              version="1.1"
                              @click="show_block('up')"
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
                            id="configapi_res_json"
                            :class="'edit form-control ' + json_response_class"
                            :placeholder="tlt('request_json_data')"
                            rows="5"
                            v-model="show_json_response_data"
                          ></textarea>
                        </div>
                        <div
                          class="form-group"
                          v-show="enduser_msg_type == 'Through_API'"
                        >
                          <label>Response JSON parameter sent to end user</label>
                          <textarea
                            class="form-control edit"
                            v-model="response_key_to_enduser"
                            placeholder="Mention the response json parameter here, the value of which will be sent to the user..."
                            rows="3"
                            id="response_key_json_id"
                          ></textarea>
                        </div>
                        <div
                          class="form-group"
                          v-show="enduser_msg_type == 'Custom'"
                        >
                          <label>Message to end user</label>
                          <input
                            id="configapi_end_user_msg_edit"
                            class="form-control edit"
                            placeholder="Message to end user...type here"
                            v-model="end_user_message"
                          />
                        </div>
                        <div
                          class="form-group"
                          v-show="enduser_msg_type == 'Through_API'"
                        >
                          <label>Response JSON Editable</label>
                          <div class="radio" style="margin-left: 32%">
                            <label>
                              <input
                                type="radio"
                                class="form-control"
                                v-model="response_json_editable"
                                value="True"
                                id="configapi_true2"
                              />
                              <span class="icn" id="configapi_true_icn2"></span>
                              True
                            </label>
                            <label>
                              <input
                                type="radio"
                                class="form-control"
                                v-model="response_json_editable"
                                value="False"
                              />
                              <span class="icn"></span> False
                            </label>
                          </div>
                        </div>
                        <div
                          class="form-group"
                          v-show="
                            response_json_editable == 'True' &&
                            enduser_msg_type == 'Through_API'
                          "
                        >
                          <label>Message With Response JSON Parameter</label>
                          <span style="margin-left: 8px">
                            <svg
                              data-tooltip="tooltip"
                              data-placement="bottom"
                              title="Help"
                              data-toggle="modal"
                              data-target="#configapimodal_json_editable"
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
                            class="form-control edit"
                            v-model="response_key_edit_message"
                            placeholder="Please enter the custom message with response json parameter which will sent to enduser"
                            rows="3"
                            id="msg_reponse_key"
                          ></textarea>
                        </div>
                        <div class="form-group">
                          <label>Message to User upon API failure</label>
                          <textarea
                            class="form-control edit"
                            v-model="unsuccessful_message"
                            placeholder="Message on API failure...type here"
                            rows="3"
                            id="api_failure"
                          ></textarea>
                        </div>
                      </div>
                    </div>
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
                        {{tlt('intent_page_edit_cancel_btn')}}
                      </button>
                      <button
                        type="submit"
                        class="darkblue-btn"
                        id="res_n_int_save"
                        @click="edit_intent()"
                      >
                        {{tlt('save_btn')}}
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
                  {{tlt('intent_page_no_intent_added_text')}}.</strong
                >
              </p>
            </div>
            <div class="pagin-table" style="margin-top: 2%" v-show="intentlist.length > 0">
              <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                  <li class="page-item">
                    <a
                      class="page-link"
                      href="#"
                      @click="isEditIntent ? verify_changes() : page_require(page_no - 1)"
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
                      @click="isEditIntent ? verify_changes() : page_require(pageno)"
                      >...</a
                    >
                    <a
                      v-if="pageno != '...s' && pageno != '...l'"
                      class="page-link"
                      href="#"
                      @click="isEditIntent ? verify_changes() : page_require(pageno)"
                      >{{ pageno }}</a
                    >
                  </li>
                  <li class="page-item">
                    <a
                      class="page-link"
                      href="#"
                      @click="isEditIntent ? verify_changes() : page_require(page_no + 1)"
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
    <!-- Modal -->
    <!-- SAVE NEW INTENT -->
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
              <h3>{{tlt('intent_model_intent_label')}}</h3>
              <button type="button" class="close" data-dismiss="modal">
                <img src="/img/close-icn.png" alt />
              </button>
            </div>
            <div class="form-group">
              <label>{{tlt('intent_model_name_desc_label')}} <span class="pl-1">{{tlt('intent_model_name_desc_text')}}</span></label>
              <input
                type="text"
                v-model.trim="new_intents"
                class="form-control"
                :placeholder="tlt('enter_intent')"
                id="enter_intent_id"
                v-on:keyup="enterintentid()"
                @keydown="intent_name_check_special_characters($event)"
              />
              <span v-show="intent_already_exists" style="color: red"
                >{{tlt('intent_page_intent_name_exist')}}.</span
              >
            </div>
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt />
              </div>
              <h3>{{tlt('intent_model_question_label')}}</h3>
            </div>
            <div style="display: block; margin-bottom: 2px;">
              <label>{{tlt('intent_model_question_desc_label')}}</label>
              <button
                id="add_question_button"
                class="darkblue-btn"
                style="padding: 5px 10px; margin-left: 10%"
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
            </div>
            <div
              v-for="(new_question, index) in add_questions_list"
              :key="index"
              class="form-group"
              style="display:flex;"
            >
              <input
                type="text"
                v-model.trim="add_questions_list[index]"
                class="form-control pl-3"
                :placeholder="tlt('enter_question')"
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
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt />
              </div>
              <h3>{{tlt('intent_model_response_label')}}</h3>
              <div class="radio" style="margin-left: 25%">
                <label>
                  <input type="radio" id="radioBtnn" @click="switching(this)" />
                  <span class="icn"></span>
                  {{tlt('intent_model_define_endpoints_label')}}</label
                >
              </div>
              <!-- </button> -->
            </div>

            <div v-show="view_response_modal">
              <div class="form-group">
                <div class="d-flex">
                  <p>{{tlt('intent_model_response_img_label')}}</p>
                  <div class="ml-2">
                    <center>
                      <div class="radio" style="margin-bottom: 3%">
                        <label>
                          <input
                            type="radio"
                            v-model="image_response"
                            value="Yes"
                          />
                          <span class="icn"></span> {{tlt('intent_model_yes_option')}}
                        </label>
                        <label>
                          <input
                            type="radio"
                            v-model="image_response"
                            value="No"
                          />
                          <span class="icn"></span> {{tlt('intent_model_no_option')}}
                        </label>
                      </div>
                    </center>
                  </div>
                </div>
                <div
                  class="custom-file"
                  v-show="image_response == 'Yes'"
                  style="margin-bottom: 5%"
                >
                  <input
                    type="file"
                    accept="image/x-png, image/gif, image/jpeg"
                    class="custom-file-input"
                    :placeholder="tlt('choose_img')"
                    @change="fileinput2"
                    id="inputGroupFileAddon02"
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
                <div class="d-flex">
                  <p>{{tlt('intent_model_response_video_label')}}</p>
                  <div class="ml-2">
                    <center>
                      <div class="radio" style="margin-bottom: 3%">
                        <label>
                          <input
                            type="radio"
                            id="res_video_type"
                            v-model="video_response"
                            value="Yes"
                          />
                          <span class="icn" id="res_video_icn"></span> {{tlt('intent_model_yes_option')}}
                        </label>
                        <label>
                          <input
                            type="radio"
                            v-model="video_response"
                            value="No"
                          />
                          <span class="icn"></span> {{tlt('intent_model_no_option')}}
                        </label>
                      </div>
                    </center>
                  </div>
                </div>
                <div v-show="video_response == 'Yes'" style="margin-bottom: 5%">
                  <input
                    id="res_video_url"
                    type="url"
                    class="form-control"
                    :placeholder="tlt('enter_url')"
                    v-model="video_link"
                    @change="embedded_change"
                  />
                </div>
              </div>
              <div class="form-group">
                <label>{{tlt('intent_model_response_to_user_by_bot_label')}}</label>
                <button
                  id="add_question_button"
                  class="darkblue-btn"
                  style="padding: 5px 10px; margin-left: 17%"
                  @click="add_to_response_list('add')"
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
                <div class="mt-2 mb-2" style="color: #df7474;"> 
                    <span>* html content/tags are not supported on whatsapp and messenger bot.</span>
                </div>                
                <div
                  v-for="(new_response, index) in multiple_response"
                  :key="index"
                  class="form-group"
                >
                  <span
                    v-if="multiple_response.length > 1"
                    style="float: right; cursor: pointer; margin-right: 12px; margin-top: 12px"
                    @click="add_to_response_list('remove', index)"
                  >
                    <i style="font-size: 16px" class="fa">&#xf00d;</i>
                  </span>
                  <vue-editor
                    v-model="multiple_response[index]"
                    :editorToolbar="customToolbar"
                  ></vue-editor>
                </div>
              </div>
              <div class="form-group">
                <label>{{tlt('intent_model_select_source_label')}}</label>
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
            </div>
            <!-- <NEW INTENT SECTION> -->
            <div v-show="!view_response_modal">
              <div class="d-flex">
                <span v-html="point_circle_svg"></span>
                <p class="ml-1"><b> {{tlt('intent_model_request_json_label')}} </b></p>
              </div>
              <div class="form-group">
                <label>{{tlt('intent_model_url_label')}}</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="save_url"
                  id="add_api_url"
                  :placeholder="tlt('enter_url1')"
                />
              </div>
              <div class="form-group d-flex">
                <label class="pt-1">{{tlt('intent_model_method_label')}}:</label>
                <div class="radio ml-3">
                  <label>
                    <input
                      type="radio"
                      class="form-control"
                      id="configapi_post"
                      v-model="save_api_method"
                      value="POST"
                    />
                    <span class="icn" id="configapi_post_icn"></span> {{tlt('intent_model_post_label')}}
                  </label>
                  <label>
                    <input type="radio" v-model="save_api_method" value="GET" />
                    <span class="icn"></span> {{tlt('intent_model_get_label')}}
                  </label>
                </div>
              </div>
              <div class="form-group">
                <label>{{tlt('intent_model_request_json_small_label')}}</label>
                <span style="margin-left: 8px">
                  <svg
                    data-tooltip="tooltip"
                    data-placement="bottom"
                    title="Help"
                    data-toggle="modal"
                    data-target="#configapimodal4"
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
                  id="configapi_req_json"
                  :class="'form-control ' + json_request_class"
                  placeholder="Request JSON data here..."
                  rows="5"
                  v-model="save_json_request_data"
                ></textarea>
              </div>
              <div class="form-group d-flex">
                <label class="pt-1">{{tlt('intent_model_json_edit_label')}}</label>
                <div class="radio ml-3">
                  <label>
                    <input
                      type="radio"
                      class="form-control"
                      v-model="save_request_json_editable"
                      value="True"
                      id="configapi_true1"
                    />
                    <span class="icn" id="configapi_true_icn"></span> {{tlt('intent_model_json_edit_true_label')}}
                  </label>
                  <label>
                    <input
                      type="radio"
                      class="form-control"
                      v-model="save_request_json_editable"
                      value="False"
                    />
                    <span class="icn"></span> {{tlt('intent_model_json_edit_false_label')}}
                  </label>
                </div>
              </div>
              <div
                class="form-group"
                v-show="save_request_json_editable == 'True'"
              >
                <label>{{tlt('json_parameter_label')}}</label>
                <textarea
                  id="input_from_user_id"
                  class="form-control"
                  v-model="save_editable_values"
                  :placeholder="tlt('multiple_parameter') +';'"
                  rows="5"
                  v-on:keyup="save_pushing()"
                ></textarea>
                <div class="row mt-4" v-if="save_api_method == 'POST' && save_show_task_values == true">
                  <div class="col-md-3">
                    <div class="form-group">Input Value</div>
                  </div>
                  <div class="col-md-9">
                    Question to be asked by the chatbot
                  </div>
                </div>
                <div
                  class="row"
                  v-if="
                    save_api_method == 'GET' && save_show_task_values == true
                  "
                >
                  <div class="col-md-3">
                    <div class="form-group">Input Value</div>
                  </div>
                  <div class="col-md-9">Select the tags</div>
                </div>
                <div
                  class="row"
                  v-for="(input, index) in save_task_input_values"
                  :key="index"
                  v-show="save_request_json_editable == 'True' && save_api_method != null"
                >
                  <div class="col-md-3">
                    <div class="form-group" style="word-wrap: break-word !important;">
                      {{ input.key_name }}
                    </div>
                  </div>
                  <div class="col-md-9">
                    <div class="row" v-show="save_api_method == 'POST'">
                      <div class="col-md-9">
                        <div class="form-group">
                          <input
                            class="form-control"
                            :id="'subject_input' + index"
                            v-model="save_task_input_values[index].input_text"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="form-group" v-show="save_api_method == 'GET'">
                      <select class="form-control" v-model="input.input_text">
                        <option value>Select A Value</option>
                        <option
                          v-for="(value, index) in post_method_request_list"
                          :value="value"
                          :key="index"
                        >
                          {{ value }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <span v-html="point_circle_svg"></span>
                <p class="ml-1"><b> {{tlt('intent_model_response_json_label')}} </b></p>
              </div>
              <div class="form-group d-flex">
                <label class="pt-1">{{tlt('intent_model_end_user_msg_label')}}</label>
                <div class="radio ml-3">
                  <label>
                    <input
                      type="radio"
                      v-model="save_enduser_msg_type"
                      :disabled="isEdit"
                      value="Through_API"
                      id="eu_msg_radio"
                    />
                    <span class="icn" id="eu_thru_api"></span> {{tlt('intent_model_through_api_label')}}
                  </label>
                  <label>
                    <input
                      type="radio"
                      v-model="save_enduser_msg_type"
                      value="Custom"
                    />
                    <span class="icn"></span> {{tlt('intent_model_custom_label')}}
                  </label>
                </div>
              </div>
              <div
                class="form-group"
                v-show="save_enduser_msg_type == 'Through_API'"
              >
                <label>{{tlt('intent_model_response_json_small_label')}}</label>
                <span style="margin-left: 8px">
                  <svg
                    data-tooltip="tooltip"
                    data-placement="bottom"
                    title="Help"
                    data-toggle="modal"
                    data-target="#configapimodal2"
                    fill="#273679"
                    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:cc="http://creativecommons.org/ns#"
                    xmlns:dc="http://purl.org/dc/elements/1.1/"
                    height="24"
                    width="24"
                    version="1.1"
                    @click="show_block('up')"
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
                  id="configapi_res_json"
                  :class="'form-control ' + json_response_class"
                  :placeholder="tlt('request_json_data')"
                  rows="5"
                  v-model="save_json_response_data"
                ></textarea>
              </div>
              <div
                class="form-group"
                v-show="save_enduser_msg_type == 'Through_API'"
              >
                <label>{{tlt('intent_model_resp_json_parameter_label')}}</label>
                <textarea
                  class="form-control"
                  v-model="save_response_key_to_enduser"
                  :placeholder="tlt('json_parameter')"
                  rows="3"
                  id="response_key_json_id"
                ></textarea>
              </div>
              <div
                class="form-group"
                v-show="save_enduser_msg_type == 'Custom'"
              >
                <label>{{tlt('intent_model_msg_end_user_label')}}</label>
                <input
                  id="configapi_end_user_msg"
                  class="form-control"
                  :placeholder="tlt('msg_end_user')"
                  v-model="save_end_user_message"
                />
              </div>
              <div
                class="form-group"
                v-show="save_enduser_msg_type == 'Through_API'"
              >
                <label>{{tlt('intent_model_through_api_json_edit_label')}}</label>
                <div class="radio" style="margin-left: 32%">
                  <label>
                    <input
                      type="radio"
                      class="form-control"
                      v-model="save_response_json_editable"
                      value="True"
                      id="configapi_true2"
                    />
                    <span class="icn" id="configapi_true_icn2"></span> {{tlt('intent_model_json_edit_inside_api_true_label')}}
                  </label>
                  <label>
                    <input
                      type="radio"
                      class="form-control"
                      v-model="save_response_json_editable"
                      value="False"
                    />
                    <span class="icn"></span> {{tlt('intent_model_json_edit_inside_api_false_label')}}
                  </label>
                </div>
              </div>
              <div
                class="form-group"
                v-show="
                  save_response_json_editable == 'True' &&
                  save_enduser_msg_type == 'Through_API'
                "
              >
                <label>{{tlt('intent_model_response_json_parameter_label')}}</label>
                <span style="margin-left: 8px">
                  <svg
                    data-tooltip="tooltip"
                    data-placement="bottom"
                    title="Help"
                    data-toggle="modal"
                    data-target="#configapimodal_json_editable"
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
                  class="form-control"
                  v-model="save_response_key_edit_message"
                  :placeholder="tlt('enter_the_custom_msg')"
                  rows="3"
                  id="msg_reponse_key"
                ></textarea>
              </div>
              <div class="form-group">
                <label>{{tlt('intent_model_msg_to_user_label')}}</label>
                <textarea
                  class="form-control"
                  v-model="save_unsuccessful_message"
                  :placeholder="tlt('msg_api_failure')"
                  rows="3"
                  id="api_failure"
                ></textarea>
              </div>
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
                {{tlt('add_intent_cancel_btn')}}
              </button>
              <button
                type="submit"
                class="darkblue-btn"
                id="res_n_int_save"
                @click="save_intent()"
              >
                {{tlt('add_intent_save_btn')}}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade dash-modal"
      id="configapimodal2"
      tabindex="-1"
      role="dialog"
      aria-labelledby="configapimodaltitle"
      aria-hidden="true"
      data-backdrop="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body" style="width: fit-content">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt />
              </div>
              <h3>Help</h3>
            </div>
            <div>
              <div>
                <h6 class="hclass6">
                  To show the message as is from the API, it can be configured
                  as follows:
                </h6>
                <label>Response JSON</label>
                <textarea
                  disabled
                  id="configapi_req_json"
                  :class="'form-control ' + json_request_class"
                  placeholder="response"
                  rows="5"
                  v-model="response_json_case_1"
                  style="color: black"
                ></textarea>
              </div>
              <br />
              <div class="form-group">
                <label>Response JSON parameter sent to end user</label>
                <textarea
                  disabled
                  class="form-control"
                  rows="1"
                  style="color: black"
                >
                 message</textarea
                >
              </div>
              <h6 class="hclass6">
                So in this case, the value of message key would be
                <span style="font-weight: 450"
                  >'Your appointment has been scheduled'</span
                >
              </h6>
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

    <div
      class="modal fade dash-modal"
      id="configapimodal_json_editable"
      tabindex="-1"
      role="dialog"
      aria-labelledby="configapimodaltitle"
      aria-hidden="true"
      data-backdrop="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body" style="width: fit-content">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt />
              </div>
              <h3>Help</h3>
            </div>
            <div>
              <div>
                <h6 class="hclass6">
                  This example show how we can use the various output parameters
                  from the API to modify the user message
                </h6>
                <label>Response JSON</label>
                <textarea
                  disabled
                  id="configapi_req_json"
                  :class="'form-control ' + json_request_class"
                  placeholder="response"
                  rows="6"
                  v-model="response_json_case_11"
                  style="color: black"
                ></textarea>
              </div>
              <br />
              <div class="form-group">
                <label>Response JSON parameter sent to end user</label>
                <textarea
                  disabled
                  class="form-control"
                  rows="1"
                  style="color: black"
                >
count</textarea
                >
              </div>
              <div class="form-group">
                <label>Message With Response JSON Parameter</label>
                <textarea
                  disabled
                  class="form-control"
                  style="color: black"
                  rows="1"
                >
You have {count} appointments</textarea
                >
              </div>

              <br />
              <h6 class="hclass6">
                <span class="noteclass">Note:-</span> The Response sent to end
                user is
                <span style="font-weight: 450">You have 8 appointments</span>
              </h6>
              <br />
            </div>

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

    <div
      class="modal fade dash-modal"
      id="configapimodal4"
      tabindex="-1"
      role="dialog"
      aria-labelledby="configapimodal4title"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body" style="width: fit-content">
            <div class="modal-head d-flex align-items-center">
              <div class="head-icn">
                <img src="/img/msg-blue.png" alt />
              </div>
              <h3>Help</h3>
            </div>
            <div>
              <h6>Example 1:</h6>
              <h6 class="hclass6">
                Below is the json, where the values for companyid, email and
                role are set from the session. The values for subject and
                description are obtained from the user.
              </h6>
              <div>
                <label>Request JSON</label>
                <textarea
                  disabled
                  id="configapi_req_json"
                  :class="'form-control ' + json_request_class"
                  placeholder="Request JSON data here..."
                  rows="7"
                  v-model="request_json_case_1"
                  style="color: black"
                ></textarea>
              </div>

              <br />
              <div>
                <label>Request JSON Editable</label>
                <br />
                <div class="radio" style="padding-left: 15%">
                  <label>
                    <input disabled type="radio" checked />
                    <span class="icn" id="configapi_true_icn"></span> True
                  </label>
                  <label>
                    <input disabled type="radio" />
                    <span class="icn"></span> False
                  </label>
                </div>
              </div>
              <div>
                <label>Request JSON Parameters</label>
                <input
                  disabled
                  class="form-control"
                  v-model="input_from_user_case_1"
                  style="color: black"
                />
              </div>
            </div>
            <br />
            <br />
            <div>
              <h6>Example 2 :</h6>
              <h6 class="hclass6">
                This example shows how we map the parameters from json that we
                need from users. In the below json, if we need the inputs from
                the user for say parameter "nickname". This has to be mapped as
                "user,info,nickname" in the "Request JSON Parameters" field.
              </h6>
              <div>
                <label>Request JSON</label>
                <textarea
                  disabled
                  id="configapi_req_json"
                  :class="'form-control ' + json_request_class"
                  placeholder="Request JSON data here..."
                  rows="23"
                  v-model="request_json_case_2"
                  style="color: black"
                ></textarea>
              </div>
              <br />
              <div>
                <label>Request JSON Editable</label>
                <br />
                <div class="radio" style="padding-left: 15%">
                  <label>
                    <input type="radio" disabled checked />
                    <span class="icn" id="configapi_true_icn"></span> True
                  </label>
                  <label>
                    <input type="radio" disabled />
                    <span class="icn"></span> False
                  </label>
                </div>
              </div>
              <div>
                <label>Request JSON Parameters</label>
                <input
                  disabled
                  class="form-control"
                  v-model="input_from_user_case_2"
                  style="color: black"
                />
              </div>
            </div>
            <div>
              <br />
              <br />
              <div class="input-group">
                <h6>Example 3 :</h6>
                <h6 class="hclass6">
                  Whenever the request json parameters are set from session or
                  cookies or some source and not from the user input, in such
                  cases check "False" at Request JSON Editable
                </h6>
              </div>

              <div>
                <label>Request JSON</label>
                <textarea
                  disabled
                  id="configapi_req_json"
                  :class="'form-control ' + json_request_class"
                  placeholder="Request JSON data here..."
                  rows="5"
                  v-model="request_json_case_3"
                  style="color: black"
                ></textarea>
              </div>
              <br />
              <div>
                <label>Request JSON Editable</label>
                <br />
                <div class="radio" style="padding-left: 15%">
                  <label>
                    <input type="radio" disabled />
                    <span class="icn" id="configapi_true_icn"></span> True
                  </label>
                  <label>
                    <input type="radio" disabled checked />
                    <span class="icn"></span> False
                  </label>
                </div>
              </div>
              <br />
              <!-- <h6 class="hclass6">
                <span class="noteclass">Note:-</span>Chatbot will take all the json keys from session , cookies, etc.
              </h6>-->
            </div>
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
              <h3>{{tlt('intent_model_upload_file_label')}}</h3>
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
                <p class="mt-2" style="color: #fa0000; font-size: 0.85rem">
                  {{tlt('intent_model_upload_file_desc_note')}}
                </p>
              </div>
              <div class="btn-wrap text-right">
                <a href="#" @click="download_sample_file">
                  {{tlt('intent_model_download_sample_file_label')}}
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
                  {{tlt('intent_page_cancel_btn')}}
                </button>
                <button type="submit" class="darkblue-btn">{{tlt('intent_page_submit_btn')}}</button>
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
import { setTimeout } from "timers";
import Template from "../Template.vue";
import { VueEditor } from "vue2-editor";
import { freeze_portal,show_subscription_expired_swal } from "@/portal/mixins";
import { bus } from "@/portal/main";
import page_guide from "@/portal/mixins/page_guide.js";

export default {
  components: { Template, VueEditor },
  name: "NewIntentsPage",
  mixins: [
    freeze_portal,
    page_guide,
    show_subscription_expired_swal
  ],
  data() {
    return {
      pencil_svg:
        ' <svg xmlns="http://www.w3.org/2000/svg" width="15.546" height="15.461" viewBox="0 0 15.546 15.461"><defs><style>.a{fill:#9e9e9e;}</style></defs><g transform="translate(-747.888 -356.769)"><path class="a" d="M759.416,356.769a2.358,2.358,0,0,1,1.777.662c.534.513,1.072,1.025,1.567,1.575a2.3,2.3,0,0,1-.071,3.325c-2.736,2.76-5.494,5.5-8.238,8.251a1.381,1.381,0,0,1-.758.288c-.719.174-1.429.379-2.144.572-.932.251-1.862.5-2.795.751-.6.158-.989-.213-.832-.807q.689-2.595,1.406-5.182a1.164,1.164,0,0,1,.289-.487q4.091-4.107,8.2-8.2A2.265,2.265,0,0,1,759.416,356.769Zm-1.989,2.956-6.54,6.538,3.025,3.024,6.538-6.537Zm4.023,2.165c.118-.135.225-.269.343-.392a1.134,1.134,0,0,0,0-1.734c-.46-.466-.926-.925-1.388-1.39a1.166,1.166,0,0,0-.861-.368c-.578,0-.881.4-1.214.76Zm-12.084,8.863,3.2-.863-2.337-2.331Z" transform="translate(0)"/><path class="a" d="M813.942,422.6l-.789-.8,3.821-3.819.784.8Z" transform="translate(-59.648 -55.947)"/></g></svg>',
      point_circle_svg:
        '<svg data-v-8cb8d9fe="" data-tooltip="tooltip" data-placement="bottom" title="" data-toggle="modal" data-target="#configapimodal4" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" height="24" width="24" version="1.1" data-original-title="Help"><g data-v-8cb8d9fe="" transform="translate(0 -1028.4)"><path data-v-8cb8d9fe="" d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z" transform="translate(0 1029.4)" fill="#2980b9"></path><path data-v-8cb8d9fe="" d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z" transform="translate(0 1028.4)" fill="#273679"></path></g></svg>',
      spinnerOn: false,
      total_pages: null,
      page_no: 1,
      per_page: 15,
      new_intent_list: [],
      old_intent_name: "",
      old_questions_list: [],
      old_image_name: "",
      old_video_url: "",
      intentlist: [],
      companyname: "",
      companyid: "",
      number_of_rows: null,
      edit: "False",
      add_edit: "false",
      // edit_response: "",
      old_intent_data: [],
      new_intent_data: [],
      is_response: false,
      is_endpoint: false,
      search_name: "",
      show_task_values: false,
      save_show_task_values: false,
      page_array: [],
      pageno: "",
      view_define_api_endpoints: false,
      define_api_endpoints: false,
      view_response_modal: true,
      edit_view_response_modal: true,
      image_response: "No",
      video_response: "No",
      video_link: "",
      embd_link: "",
      embd_link_edit: "",
      file_label: "Choose file",
      file_label2: "Choose file",
      file_label3: "Choose file",
      options: [],
      checked_list: [],
      current_selected_intent: "",
      current_selected_intent_index: 0,
      //this is also used to edit intent response
      selected_intent_response: [""],
      current_selected_intent_highlight:"",
      selected_intent_response_image: "",
      name_file: "",
      temp_file_name: "",
      selected_intent_response_video: "",
      selected_intent_response_source: "",
      selected_intent_questions: [""],
      isEditIntent: false,
      url: "",
      // This Variables are for NEW INTENT
      new_intents: "",
      add_questions_list: [""],
      source: "Web",
      // response: [""],
      multiple_response: [""],
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"]
      ],
      save_url: "",
      save_api_method: null,
      save_json_request_data: "",
      save_request_json_editable: null,
      save_editable_values: "",
      save_task_input_values: [],
      save_enduser_msg_type: "Custom",
      save_json_response_data: "",
      save_response_key_to_enduser: "",
      save_end_user_message: "",
      save_response_json_editable: null,
      save_response_key_edit_message: "",
      save_unsuccessful_message: null,

      isVisibleSearchClear: false,
      api_method: null,
      post_method_request_list: [],
      show_json_request_data: "",
      show_json_response_data: "",
      request_json_editable: null,
      editable_values: "",
      isEdit: false,
      utterances: [],
      enduser_msg_type: null,
      response_key_to_enduser: "",
      end_user_message: null,
      response_json_editable: null,
      response_key_edit_message: "",
      unsuccessful_message: null,
      finalstep: false,
      api_list: [],
      request_json_case_1: `{
          "companyid":"CompanyId",
          "email":"email",
          "role":"role",
          "subject":" ",
          "description":" ",
        }`,

      input_from_user_case_1: "subject;description",
      request_json_case_2: `{
	        "user": {
		      "companyid": 'companyId',
		      "email": 'email',
		      "role": 'role',
		      "info": {
		      	"nickname": ""
		      }
	      },
	      "searchparameter": {
		      "status": "",
		      "orderby": "",
		      "fromdate": "01/01/2018",
		      "count": 10,
		      "searchtext": "",
		      "typeofvisit": "ALL",
		      "sortorder": "appointment",
		      "startindex": "1",
		      "endindex": "10",
		      "todate": "08/06/2018"
	      }

      }`,
      input_from_user_case_2:
        "user,info,nickname;searchparameter,fromdate;searchparameter,todate",
      request_json_case_3: `{ 
          "companyid":"companyid",
          "email":"email",
          "role":"role" 
      }`,
      response_json_case_1: `{
          'message':'Your appointment has been scheduled',
          'username':'Cense',
          'email':'user@cense.ai'
      }`,
      response_json_case_11: `{
          'message':'API executed successfully',
          'count':'8'
          'username':'Cense',
          'email':'user@cense.ai'
      }`,
      task_input_values: [],
      intent_already_exists: false,
      intent_already_exists_edit: false,
      edit_video_response: "No",
      edit_image_response: "No",
      file_content2: "",
      file_content3: "",
      spinnerOnFileDownload: false,
      file_label_csv: "Choose file",
      file_content_csv: "",
      default_retail_intents: [],
      want_status: true,
      intent_core_model_inprogress: false,
      selected_intent_description:'',
      is_search_active: false,
      data_is_emit: "",
      disable_btn_expired: false,
      reg_url: /https:\/\/[(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/i,
      new_intent_question_list : ['']
    };
  },
  created() {
    if (this.$session.get("UserInformation").role == "SuperAdmin") {
      if (this.$session.has("CompanyId")) {
        this.companyid = this.$session.get("CompanyId");
        this.companyname = this.$session.get("CompanyName");
      } else {
        this.companyid = this.$session.get("UserInformation").company_id;
        this.companyname = this.$session.get("UserInformation").company_name;
        toastr.warning(this.tlt('intent_page_select_company_msg'));
      }
    } else {
      this.companyid = this.$session.get("UserInformation").company_id;
      this.companyname = this.$session.get("UserInformation").company_name;
    }
    axios
      .get(api_calls.source_list_url(), {
        headers: {
          Authorization: `Bearer ${this.$session.get("at")}`,
        },
      })
      .then((response) => {
        if(this.api_status_code.DATA_AVAILABLE.MSG_CODE == response.data.message.MSG_CODE){
          this.options = response.data.data;
        }
        else if(this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE == response.data.message.MSG_CODE){
          swal({
              text: "Internal server error",
              type: "error",
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000
            });
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
    axios
      .get(api_calls.get_ner_tags(), {
        params: {
          company_name: this.companyname,
          company_id: this.companyid,
          email: this.$session.get("UserInformation").email,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens,
        },
        headers: {
          Authorization: `Bearer ${this.$session.get("at")}`,
        },
      })
      .then((response) => {
        this.entity_list = response.data.data;
        this.post_method_request_list = response.data.data;
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
    this.load_intent();
    this.check_intent_core_model_status();

    // console.log("Utterances", this.utterances);
  },
  watch: {
    editable_values() {
      if (this.editable_values != "") {
        this.show_task_values = true;
        //  console.log("Here");
      } else {
        this.show_task_values = false;
        //  console.log("Not Here");
      }
    },
    save_editable_values() {
      if (this.save_editable_values != "") {
        this.save_show_task_values = true;
        //  console.log("Here");
      } else {
        this.save_show_task_values = false;
        //  console.log("Not Here");
      }
    },
    search_name() {
      if (this.search_name === "") {
        this.load_intent();
        this.isVisibleSearchClear = false;
      } else if (this.search_name !== "") {
        this.isVisibleSearchClear = true;
      }
    },
    new_intents(val){
      this.new_intents = val.replace(/[^a-zA-Z0-9_ ]/g, "");
    },
    current_selected_intent(val){
      this.current_selected_intent = val.replace(/[^a-zA-Z0-9_ ]/g, "");
    }

  },
  computed:{
    check_select_all_intents_cbx_disabled(){
      if(this.intentlist.length >0){
        var temp = true;
        for(var i=0;i<this.intentlist.length;i++){
          if(!this.default_retail_intents.includes(this.intentlist[i].Intent)){
            temp = false;
          }
        }
        return temp;
      }
    },
  },
  mounted() {
    this.page_guide();
    setTimeout(() => {
      this.freeze_portal();
    }, 1000);
    this.$root.$on("NewIntentsPageDisabled", (data) => {
      if(data===true){
        this.disable_btn_expired = true;
      }
    });
    let bot_templates_data = this.$session.get("BotTemplates");
    for(let i =0; i< bot_templates_data.length; i++) {
      if((bot_templates_data[i].domain === "Retail") && (bot_templates_data[i].intent_data.length > 0)){
        this.default_retail_intents = bot_templates_data[i].intent_data.map((arr) => arr.Intent);
        break;
      }
    }
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
    var vm = this;
    $("#configapimodal4").on("shown.bs.modal", function (e) {
      $("#configapimodal").css("opacity", "-0.5");
    });
    $("#configapimodal4").on("hidden.bs.modal", function (e) {
      $("#configapimodal").css("opacity", "1");
    });
    $('[data-toggle="tooltip"]').tooltip();
    $("#intentmodel").on("hidden.bs.modal", function (e) {
        vm.empty_variable();
    });
    $("#configapimodal2").on("shown.bs.modal", function (e) {
      $("#configapimodal").css("opacity", "-0.5");
    });
    $("#configapimodal2").on("hidden.bs.modal", function (e) {
      $("#configapimodal").css("opacity", "1");
    });
    $("#configapimodal_json_editable").on("shown.bs.modal", function (e) {
      $("#configapimodal").css("opacity", "-0.5");
    });
    $("#configapimodal_json_editable").on("hidden.bs.modal", function (e) {
      $("#configapimodal").css("opacity", "1");
    });
    $('a[data-target="#intentmodel"]').on('click' , function () {
      if(vm.isEditIntent == true){
        vm.verify_changes();
      }else{
        vm.empty_variable();
        $("#intentmodel").modal('show');
      }
    });
    
    this.$root.$on("send_model_status", data =>{
      if (data == true){
        this.check_intent_core_model_status();
      }
    })
    if (this.$route.params.modal_open_switch_tab) {
      $("#intentmodel").modal("show");
      this.$root.$emit("change_sidebar_main_menu", "Training Hub");
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.isEditIntent) {
      this.verify_changes();
    } else {
      next();
    }
  },
  methods: {
     add_variant_open_modal(){
      if(!this.disable_btn_expired){
        $("#intentmodel").modal('show')
      } else {
        this.show_subscription_expired_swal();
      }
    },    
    verify_changes() {
      if(!this.disable_btn_expired){
      Swal({
        title: this.tlt('intent_page_verify_changes_msg'),
        text: this.tlt('verify_changes_alert_msg'),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.tlt('intent_page_verify_changes_save_msg'),
        cancelButtonText: this.tlt('intent_page_verify_changes_cancel_msg'),
      }).then((result) => {
        if (result.value) {
          this.edit_intent();
        }else{
          this.show_intents(this.current_selected_intent_index);
          this.isEditIntent = false;
        }
      });}else{
        this.show_subscription_expired_swal();
      }
    },
    chk_cbx_crsr(intent){
      if (intent == 'all'){
        var temp = "cursor: pointer;";
        if(this.intentlist.length >0){
          temp = "cursor: not-allowed;";
          for(var i=0;i<this.intentlist.length;i++){
            if(!this.default_retail_intents.includes(this.intentlist[i].Intent)){
              temp = "cursor: pointer;"; 
            }
          }
        }
        return temp;
      } else{
        if(this.default_retail_intents.includes(intent)){
          return "cursor: not-allowed";
        }
      }
    },
    switching(element) {
      if (this.view_response_modal == true) {
        this.check();
      } else {
        this.uncheck();
      }
    },
    check() {
      document.getElementById("radioBtnn").checked = true;
      this.view_response_modal = false;
      // console.log(this.view_response_modal);
    },
    uncheck() {
      document.getElementById("radioBtnn").checked = false;
      this.view_response_modal = true;
      // console.log(this.view_response_modal);
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

    show_model_progress(index){
      if(this.intent_core_model_inprogress == true){
         if (index == 'style'){
            return "cursor: not-allowed";
          }
          else if(index == 'title'){
            return this.tlt('train_model_progress_msg');
          }
      }
      else{
        return null;
      }
    },

    // editswitching(element) {
    //   // if (this.edit_view_response_modal == true) {
    //   //   this.echeck();
    //   // } else {
    //   //   this.euncheck();
    //   // }
    // },
    // echeck() {
    //   document.getElementById("radioBtn").checked = true;
    //   this.edit_view_response_modal = false;
    //   //then making null values to set fresh new values
    //   this.url = "";
    //   this.api_method = "";
    //   this.show_json_request_data = "";
    //   this.request_json_editable = "";
    //   this.task_input_values = "";
    //   this.editable_values = "";
    //   this.enduser_msg_type = "";
    //   this.end_user_message = "";
    //   this.response_json_editable = "";
    //   this.show_json_response_data = "";
    //   this.response_key_edit_message = "";
    //   this.response_key_to_enduser = "";
    //   this.unsuccessful_message = "";
    //   // console.log(this.edit_view_response_modal);
    // },
    // euncheck() {
    //   document.getElementById("radioBtn").checked = false;
    //   this.edit_view_response_modal = true;
    //   // making values null
    //   this.quill2.setText("");
    //   this.source = "Web";
    //   this.file_label = "Choose file";
    //   this.image_url = "";
    //   (this.edit_video_response = "No"),video_response
    //   this.file_label2 = "Choose file";
    //   this.file_label3 = "Choose file";
    //   this.file_content = "";
    //   // console.log(this.edit_view_response_modal);
    // },
    train_model() {
      if(!this.disable_btn_expired){
      Swal({
        title: this.tlt('train_model_swal_msg'),
        text: this.tlt('train_model_swal_alert_msg'),
        type: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.tlt('train_model_swal_confirm_msg'),
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
              if (response.data.message.MSG_CODE === 20000151) {
                toastr.success(response.data.message.MSG);
              } else if (response.data.message.MSG_CODE === 20000141) {
                toastr.error(response.data.message.MSG);
              } else {
                // toastr.error(this.tlt('train_model_internal_server_msg'));
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
      });}else{
        this.show_subscription_expired_swal();

      }
    },
    // train_and_test_model() {
    //   Swal({
    //     title: "Are You Sure?",
    //     text: "You want to Train & Test The Model?",
    //     type: "question",
    //     showCancelButton: true,
    //     confirmButtonColor: "#3085d6",
    //     cancelButtonColor: "#d33",
    //     confirmButtonText: "Yes, Confirm!",
    //     allowOutsideClick: false,
    //     allowEscapeKey: false,
    //   }).then((result) => {
    //     if (result.value) {
    //       this.spinnerOn = true;
    //       axios
    //         .post(
    //           api_calls.train_intent_model(),
    //           {
    //             email: this.$session.get("UserInformation").email,
    //             token: this.$session.get("UserInformation").tokens,
    //             company_name: this.company_name,
    //             company_id: this.company_id,
    //             license_key: this.$session.get("UserInformation").license_key,
    //             test_model: true,
    //           },
    //           {
    //             headers: {
    //               Authorization: `Bearer ${this.$session.get("at")}`,
    //             },
    //           }
    //         )
    //         .then((response) => {
    //           this.spinnerOn = false;
    //           if (response.data.MSG_CODE == 4046) {
    //             swal({
    //               title: "Results would be available soon",
    //               text: response.data.MSG,
    //               type: "success",
    //             }).then((result) => {
    //               if (result.value) {
    //                 // $('#file_upload').modal('hide');
    //                 // this.$router.go();
    //                 // this.load_questions_response();
    //               }
    //             });
    //           } else if (response.data.MSG_CODE === 1034) {
    //             swal({
    //               title: "Some Error Occurred",
    //               text: response.data.MSG,
    //               type: "error",
    //             }).then((result) => {
    //               if (result.value) {
    //                 // $('#file_upload').modal('hide');
    //                 // this.$router.go();
    //                 // this.load_questions_response();
    //               }
    //             });
    //           } else {
    //             swal({
    //               title: "Some Error Occurred",
    //               type: "error",
    //             }).then((result) => {
    //               // $('#file_upload').modal('hide');
    //               this.file_label = "Choose file";
    //               document.getElementById("inputGroupFile01").value = "";
    //               this.load_questions_response();
    //             });
    //           }
    //           // $("#file_upload").modal("hide");
    //         })
    //         .catch((e) => {
    //           // console.log(e);
    //           if (
    //             e.response.status === 410 ||
    //             e.response.status === 440 ||
    //             e.response.status === 409
    //           ) {
    //             this.$root.$emit("Session_Expired", e.response.data);
    //           } else {
    //             Swal({
    //               title: "Some Error Occurred",
    //               type: "error",
    //             }).then((result) => {
    //               // $('#file_upload').modal('hide');
    //               this.file_label = "Choose file";
    //               document.getElementById("inputGroupFile01").value = "";
    //               this.load_questions_response();
    //             });
    //           }
    //         });
    //     }
    //   });
    // },

    check_current_intent(index) {
      var return_var = "";
      if (this.intentlist[index].Intent == this.current_selected_intent_highlight) {
        return_var += "current-active-intent";
      }
      if (this.default_retail_intents.includes(this.intentlist[index].Intent)) {
        return_var += " disabled-intent";
      }
      return return_var;
    },
    clear_search_name() {
      this.search_name = "";
    },
    load_intent(current_selected_intent_index) {
      // this.intentlist = [];
      this.is_search_active = false;
      this.search_name = '';
      $("input:checkbox").prop("checked", false);
      this.new_intent_list = [];
      this.checked_list = [];
      this.spinnerOn = true;
      axios
        .post(
          api_calls.intent_question_response(),
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
          if (this.api_status_code.DATA_AVAILABLE_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
            this.number_of_rows = response.data.pagination.total_data;
            this.total_pages = response.data.pagination.total_page;
            this.intentlist = response.data.data;
            if (this.intentlist.length > 0) {
              if (Boolean(current_selected_intent_index)){
                this.show_intents(current_selected_intent_index);
              }else{
                this.show_intents(0);
              }
            }
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
    show_intents(index) {
      this.isEditIntent = false;
      var clone_selected_intent = JSON.parse(JSON.stringify(this.intentlist[index]));
      this.current_selected_intent_index = index;
      this.current_selected_intent = clone_selected_intent.Intent;
      this.current_selected_intent_highlight = clone_selected_intent.Intent;
      this.selected_intent_questions = clone_selected_intent.Questions;
      this.new_intent_question_list = [...new Set(clone_selected_intent.Questions)];
      this.selected_intent_description = clone_selected_intent.IntentDescription;
      this.old_intent_name = this.current_selected_intent;
      this.old_questions_list = this.intentlist[index].Questions;
      this.is_response = false;
      this.is_endpoint = false;
      if (clone_selected_intent.Response != null && clone_selected_intent.Response != "") {
        this.edit_view_response_modal = true;
        this.old_video_url = clone_selected_intent.Response.VideoUrl;
        this.is_response = true;
        this.is_endpoint = false;
        this.selected_intent_response = clone_selected_intent.Response.Response;
        // this.quill2.root.innerHTML = this.intentlist[index].Response.Response;
        this.selected_intent_response_source = clone_selected_intent.Response.Source;
        this.selected_intent_response_image = clone_selected_intent.Response.ImageUrl;
        if (this.selected_intent_response_image != null) {
          this.name_file = this.selected_intent_response_image.split("/");
          this.temp_file_name = this.name_file[this.name_file.length - 1];
          // console.log("splitted");
          this.file_label3 = this.temp_file_name;
          this.old_image_name = this.file_label3;
          this.edit_image_response = "Yes";
        } else {
          this.old_image_name = "";
          this.edit_image_response = "No";
          this.file_label3 = "Choose file";
        }
        this.selected_intent_response_video = clone_selected_intent.Response.VideoUrl;
        if (
          this.selected_intent_response_video != "" ||
          this.selected_intent_response_video.length != 0
        ) {
          this.edit_video_response = "Yes";
        } else {
          this.edit_video_response = "No";
        }
      } else if (clone_selected_intent.APIEndpoint != null && clone_selected_intent.APIEndpoint != "") {
        this.is_response = false;
        this.is_endpoint = true;
        this.edit_view_response_modal = false;
        this.utterances = clone_selected_intent.APIEndpoint.Tasks.Utterances;

        this.api_method = clone_selected_intent.APIEndpoint.METHOD;
        this.editable_values = clone_selected_intent.APIEndpoint.ValuesToEdit;
        this.request_json_editable = clone_selected_intent.APIEndpoint.isEdit;
        this.url = clone_selected_intent.APIEndpoint.URL;
        this.show_json_request_data = clone_selected_intent.APIEndpoint.RequestJson;
        this.show_json_response_data = clone_selected_intent.APIEndpoint.ResponseJson;
        this.enduser_msg_type = clone_selected_intent.APIEndpoint.Msg_type;
        this.end_user_message = clone_selected_intent.APIEndpoint.MessageToEndUser;
        this.response_key_to_enduser = clone_selected_intent.APIEndpoint.ResponseKeyToEndUser;
        this.response_json_editable = clone_selected_intent.APIEndpoint.ResponseKeyEditable;
        this.show_json_response_data = clone_selected_intent.APIEndpoint.ResponseJson;
        this.response_key_edit_message = clone_selected_intent.APIEndpoint.ResponseKeyMessageToEndUser;
        this.unsuccessful_message = clone_selected_intent.APIEndpoint.UnSuccessfulMessage;

        this.task_input_values = [];

        for (var i in this.utterances) {
          this.task_input_values.push({
            key_name: this.utterances[i].RawSlotName,
            input_text: this.utterances[i].Text,
          });
        }
      }
    },
    save_req_json() {
      try {
        JSON.parse(this.save_json_request_data);
      } catch (e) {
        return false;
      }
      return true;
    },
    req_json() {
      try {
        JSON.parse(this.show_json_request_data);
      } catch (e) {
        return false;
      }
      return true;
    },
    save_resp_json() {
      try {
        JSON.parse(this.save_json_response_data);
      } catch (e) {
        return false;
      }
      return true;
    },
    resp_json() {
      try {
        JSON.parse(this.show_json_response_data);
      } catch (e) {
        return false;
      }
      return true;
    },
    save_pushing(){
      if (this.save_api_method === null){
        Swal({
            text: "Please select Method",
            toast: true,
            position: "top-end",
            type: "warning",
            showConfirmButton: false,
            timer: 2500,
          });
        }
      try {
        if (this.save_editable_values != "") {
          let empty_vars = [];
          var csv = this.save_editable_values.split(";");
          //  console.log("this is csv",csv);
          var input_value;
          // this.save_task_input_values = [];

          for (var i in csv) {
            let temp_list = csv[i].split(",");
            //  console.log("this is temp",temp_list);
            if (temp_list[temp_list.length - 1] != "") {
              //  console.log("hereee");

              input_value = temp_list[temp_list.length - 1];
              if (!(this.save_task_input_values.map(key=>{return key.key_name}).includes(input_value))){
                this.save_task_input_values.push({
                key_name: input_value,
                input_text: "",
              });
              }
            }
          }
          var temp = [];
          for (let index = 0; index < this.save_task_input_values.length; index++) {
            if(csv.includes(this.save_task_input_values[index]['key_name'])){
              temp.push(this.save_task_input_values[index]);
            }
          }
          this.save_task_input_values =  temp;
          // for (var i in this.save_task_input_values) {
          //   if (this.save_task_input_values[i].input_text == "") {
          //     empty_vars.push(this.save_task_input_values[i]);
          //   }
          // }
        } else {
          this.save_task_input_values = [];
        }
      } catch (e) {
        // console.log(e);
      }
    },
    edit_pushing() {
      try {
        if (this.editable_values != "") {
          let empty_vars = [];
          var csv = this.editable_values.split(";");
          var input_value;
          // this.task_input_values = [];
          for (var i in csv) {
            let temp_list = csv[i].split(",");
            if (temp_list[temp_list.length - 1] != "") {
              input_value = temp_list[temp_list.length - 1];
              if(!(this.task_input_values.map(key=>{return key.key_name}).includes(input_value))){
                this.task_input_values.push({
                key_name: input_value,
                input_text: "",
              });
              }
            }
          }
          var temp = [];
          for (let index = 0; index < this.task_input_values.length; index++) {
            if(csv.includes(this.task_input_values[index]['key_name'])){
              temp.push(this.task_input_values[index]);
            }
          }
          this.task_input_values =  temp;
          // for (var i in this.task_input_values) {
          //   if (this.task_input_values[i].input_text == "") {
          //     empty_vars.push(this.task_input_values[i]);
          //   }
          // }
        } else {
          this.task_input_values = [];
        }
      } catch (e) {
        // console.log(e);
      }
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
          if ((response.data.message.MSG_CODE == this.api_status_code.INTENT_NAME_NOT_EXISTS_MODELS.MSG_CODE) && (this.new_intents === intent_search_key)) {
            this.intent_already_exists = false;
            document.getElementById("enter_intent_id").style.border =null;
            if(this.new_intents != ""){
              document.getElementById("enter_intent_id").style.border =
              "1px solid #00f000";
            }
          } else if ((response.data.message.MSG_CODE == this.api_status_code.DUPLICATE_INTENT_4011_MODELS.MSG_CODE) && (this.new_intents === intent_search_key)) {
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
    // This is for checking while editing and entering a intent name if it already exists or not
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
          // console.log(this.current_selected_intent);
          if (response.data.message.MSG_CODE == this.api_status_code.INTENT_NAME_NOT_EXISTS_MODELS.MSG_CODE) {
            this.intent_already_exists_edit = false;
            document.getElementById("enter_intent_id_edit").style.border =null;
            if(this.current_selected_intent != ""){
              document.getElementById("enter_intent_id_edit").style.border =
                "1px solid #00f000";
              }
          } else if (response.data.message.MSG_CODE == this.api_status_code.DUPLICATE_INTENT_4011_MODELS.MSG_CODE) {
            if (this.old_intent_name == this.current_selected_intent){
              this.intent_already_exists_edit = false;
              document.getElementById("enter_intent_id_edit").style.border =null;  
              //  console.log("you old only");
            } else {
              //  console.log("you here");
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
    intent_name_check_special_characters(e){
      if (/^[^a-zA-Z0-9_ ]*$/.test(e.key)) {
        e.preventDefault();
      }
    },
    edit_intent() {
      if (this.old_intent_name == this.current_selected_intent) {
        var intent_to_send = null;
      } else {
        // var intent_to_send = this.companyid + "_" + this.old_intent_name;
        var intent_to_send = this.old_intent_name;

      }
      if (this.intent_already_exists_edit) {
        toastr.error(this.tlt('edit_intent_name_exist_msg'));
        window.scrollTo(0, 0);
        return;
      }
      if (this.current_selected_intent == "") {
        // toastr.error("Please enter an Intent name");
        Swal({
          text: this.tlt('edit_intent_enter_name_msg'),
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
              text: this.tlt('edit_intent_question_alert_msg'),
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
      if((this.current_selected_intent != 'shipping' && 
        this.current_selected_intent != 'messaging_platform' &&
        this.current_selected_intent != 'contact_us') && 
        (this.default_retail_intents.includes(this.current_selected_intent)))
      {
        this.spinnerOn = true;
        axios
          .post(
            api_calls.intent_question_response(),
            {
              company_name: this.companyname,
              company_id: this.companyid,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              is_edit: true,
              is_default_intent: true,
              // old_intent_name: intent_to_send,
              intent: this.current_selected_intent,
              subscription: "Platinum",
              question_list: this.selected_intent_questions,
              old_question_list: this.old_questions_list,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            this.spinnerOn = false;
            // this.intents = "";
            // this.question_list = [0];
            if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR_MODELS.MSG_CODE) {
              Swal({
                type: "error",
                text: this.tlt('edit_intent_enter_name_msg'),
                timer: 2500,
              });
              if(this.is_search_active === true){
                  this.search_intent(this.current_selected_intent_index);
                }else{
                  this.load_intent(this.current_selected_intent_index);
                }
            } else if (response.data.message.MSG_CODE == this.api_status_code.SUCCESSFUL_DB_QUERY_MODELS.MSG_CODE) {
              Swal({
                type: "success",
                text: this.tlt('edit_intent_enter_name_msg'),
                allowOutsideClick: false,
                allowEscapeKey: false,
                timer: 2500,
              }).then((result) => {
                if(this.is_search_active === true){
                  this.search_intent(this.current_selected_intent_index);
                }else{
                  this.load_intent(this.current_selected_intent_index);
                }
              });
            } else if (response.data.message.MSG_CODE == this.api_status_code.INTENT_IN_DIALOG_EDITED_SUCCESSFULLY_MODELS.MSG_CODE) {
              Swal({
                type: "info",
                text: this.tlt('edit_intent_enter_name_msg1'),
                allowOutsideClick: false,
                allowEscapeKey: false,
                timer: 7500,
              }).then((result) => {
                if(this.is_search_active === true){
                  this.search_intent(this.current_selected_intent_index);
                }else{
                  this.load_intent(this.current_selected_intent_index);
                }
              });
            } else if (response.data.message.MSG_CODE == this.api_status_code.STATUS_FAILURE_MODELS.MSG_CODE) {
              Swal({
                type: "warning",
                text: this.tlt('edit_intent_some_error_msg1'),
                timer: 2500,
              });
            } 
            // else if (response.data.status == "Error") {
            //   Swal({
            //     type: "error",
            //     text: this.tlt('edit_intent_some_error_msg2'),
            //     timer: 2500,
            //   });
            //   if(this.is_search_active === true){
            //       this.search_intent(this.current_selected_intent_index);
            //   }else{
            //     this.load_intent(this.current_selected_intent_index);
            //   }
            // } 
            else if (
              response.data.message.MSG_CODE === this.api_status_code.UNSUCCESSFUL_DB_QUERY_MODELS.MSG_CODE
            ) {
              Swal({
                type: "error",
                text: this.tlt('edit_intent_some_error_msg3'),
                timer: 2500,
              });
              if(this.is_search_active === true){
                this.search_intent(this.current_selected_intent_index);
              }else{
                this.load_intent(this.current_selected_intent_index);
              }
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
                text: this.tlt('edit_intent_internal_server_msg'),
                timer: 2500,
              });
              if(this.is_search_active === true){
                this.search_intent(this.current_selected_intent_index);
              }else{
                this.load_intent(this.current_selected_intent_index);
              }
              // toastr.error("Internal Server Error");
            }
          });
      }else if(this.is_response === false && this.is_endpoint === false){
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
            old_intent_name:intent_to_send,
            intent: this.current_selected_intent,
            intent_description:this.selected_intent_description,
            question_list: this.selected_intent_questions,
            old_question_list: this.old_questions_list,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          this.spinnerOn = false;
          if (response.data.MSG == "Intent Question Edited Successfully") {
            Swal({
              text: this.tlt('edit_intent_edit_success_msg'),
              type: "success",
              timer: 3500,
              title: this.tlt('edit_intent_success_alert_msg'),
              toast: true,
              position: "top-right"
            });
            if(this.is_search_active === true){
                this.search_intent(this.current_selected_intent_index);
              }else{
                this.load_intent(this.current_selected_intent_index);
              }
          } else if (response.data.Msg == "Used Intent Name Edited Successfully") {
              Swal({
                type: "info",
                text: this.tlt('edit_intent_edited_alert_msg'),
                allowOutsideClick: false,
                allowEscapeKey: false,
                timer: 7500,
              }).then((result) => {
                if(this.is_search_active === true){
                  this.search_intent(this.current_selected_intent_index);
                }else{
                  this.load_intent(this.current_selected_intent_index);
                }
              });
            } else if (response.data.MSG == "Intent Question Not Edited Successfully") {
            Swal({
              type: "error",
              text:
                this.tlt('edit_intent_internal_server_msg1'),
              timer: 2500,
            });
          } else {
            Swal({
              type: "error",
              text:
                this.tlt('edit_intent_internal_server_msg2'),
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
              text:
                this.tlt('edit_intent_internal_server_msg3'),
              timer: 2500,
            });
          }
        });
      }
      else if (this.edit_view_response_modal) {
        if (this.old_image_name == this.file_label3) {
          this.file_label3 = "Choose file";
        }
        for (let i = 0; i < this.selected_intent_response.length; i++) {
          if (
            this.selected_intent_response[i] == "" ||
            this.selected_intent_response[i] == "<p><br></p>"
          ) {
            Swal({
              text: this.tlt('edit_intent_response_alert_msg'),
              toast: true,
              position: "top-end",
              type: "warning",
              showConfirmButton: false,
              timer: 2500,
            });
            return;
          }
        }
        if (this.file_label3 == "Choose file") {
          if (
            this.file_label3 === "Choose file" &&
            this.edit_image_response == "No"
          ) {
            var delete_image;
          }
          // console.log("api call");
          this.spinnerOn = true;
          axios
            .post(
              api_calls.intent_question_response(),
              {
                company_name: this.companyname,
                company_id: this.companyid,
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                is_edit: true,
                is_response: true,
                old_intent_name: intent_to_send,
                intent: this.current_selected_intent,
                subscription: "Platinum",
                question_list: this.selected_intent_questions,
                intent_description:this.selected_intent_description,
                old_question_list: this.old_questions_list,
                response: {
                  file_name: null,
                  video_link:
                    this.edit_video_response == "Yes"
                      ? this.embd_link_edit
                      : [],
                  source: this.selected_intent_response_source,
                  response: this.selected_intent_response,
                },
                old_image_delete:
                  this.file_label3 === "Choose file" &&
                  this.edit_image_response == "No"
                    ? true
                    : false,
                old_image_name: this.old_image_name,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.spinnerOn = false;
              // this.response = "";
              // this.intents = "";
              // this.question_list = [0];
              // var response_api = response.data;
              if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR_MODELS.MSG_CODE) {
                Swal({
                  type: "error",
                  text: this.tlt('edit_intent_some_error_msg4'),
                  timer: 2500,
                });
                if(this.is_search_active === true){
                  this.search_intent(this.current_selected_intent_index);
                }else{
                  this.load_intent(this.current_selected_intent_index);
                }
              } else if (response.data.message.MSG_CODE == this.api_status_code.SUCCESSFUL_DB_QUERY_MODELS.MSG_CODE) {
                Swal({
                  type: "success",
                  text: this.tlt('edit_intent_edit_success_msg1'),
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                  timer: 2500,
                }).then((result) => {
                  if(this.is_search_active === true){
                  this.search_intent(this.current_selected_intent_index);
                }else{
                  this.load_intent(this.current_selected_intent_index);
                }
                });
              } else if (response.data.message.MSG_CODE == this.api_status_code.INTENT_IN_DIALOG_EDITED_SUCCESSFULLY_MODELS.MSG_CODE) {
                Swal({
                  type: "info",
                  text: this.tlt('edit_intent_edited_alert_msg1'),
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                  timer: 7500,
                }).then((result) => {
                  if(this.is_search_active === true){
                  this.search_intent(this.current_selected_intent_index);
                }else{
                  this.load_intent(this.current_selected_intent_index);
                }
                });
            } else if (response.data.message.MSG_CODE == this.api_status_code.STATUS_FAILURE_MODELS.MSG_CODE) {
                Swal({
                  type: "warning",
                  text: this.tlt('edit_intent_some_error_msg5'),
                  timer: 2500,
                });
              } 
              // else if (response.data.status == "Error") {
              //   Swal({
              //     type: "error",
              //     text: this.tlt('edit_intent_some_error_msg6'),
              //     timer: 2500,
              //   });
              //   if(this.is_search_active === true){
              //     this.search_intent(this.current_selected_intent_index);
              //   }else{
              //     this.load_intent(this.current_selected_intent_index);
              //   }
              // }
               else if (response.data.message.MSG_CODE === this.api_status_code.IMG_DUPLICATE_MODELS.MSG_CODE) {
                Swal({
                  type: "error",
                  text: this.tlt('edit_intent_img_exist_msg2'),
                  timer: 2500,
                });
                if(this.is_search_active === true){
                  this.search_intent(this.current_selected_intent_index);
                }else{
                  this.load_intent(this.current_selected_intent_index);
                }
              } else if (
                response.data.message.MSG_CODE === this.api_status_code.UNSUCCESSFUL_DB_QUERY_MODELS.MSG_CODE
              ) {
                Swal({
                  type: "error",
                  text: this.tlt('edit_intent_some_error_msg7'),
                  timer: 2500,
                });
                if(this.is_search_active === true){
                  this.search_intent(this.current_selected_intent_index);
                }else{
                  this.load_intent(this.current_selected_intent_index);
                }
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
                  text: this.tlt('edit_intent_internal_server_msg4'),
                  timer: 2500,
                });
                if(this.is_search_active === true){
                  this.search_intent(this.current_selected_intent_index);
                }else{
                  this.load_intent(this.current_selected_intent_index);
                }
                // toastr.error("Internal Server Error");
              }
            });
        } else {
          this.spinnerOn = true;
          axios
            .post(
              api_calls.intent_question_response(),
              {
                company_name: this.companyname,
                company_id: this.companyid,
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                is_edit: true,
                is_response: true,
                image_edit: true,
                old_intent_name: intent_to_send,
                intent: this.current_selected_intent,
                question_list: this.selected_intent_questions,
                intent_description:this.selected_intent_description,
                subscription: "Platinum",
                old_image_name: this.old_image_name,
                new_image_name: this.file_label3,
                image_blob: this.file_content3,
                old_question_list: this.old_questions_list,
                response: {
                  file_name: this.file_label3,
                  video_link:
                    this.edit_video_response == "Yes"
                      ? this.embd_link_edit
                      : [],
                  source: this.selected_intent_response_source,
                  response: this.selected_intent_response,
                },
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.spinnerOn = false;
              if(this.is_search_active === true){
                  this.search_intent(this.current_selected_intent_index);
                }else{
                  this.load_intent(this.current_selected_intent_index);
                }
              if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR_MODELS.MSG_CODE) {
                Swal({
                  type: "error",
                  text: this.tlt('edit_intent_some_error_msg7'),
                  timer: 2500,
                });
              } else if (response.data.message.MSG_CODE == this.api_status_code.SUCCESSFUL_DB_QUERY_MODELS.MSG_CODE) {
                Swal({
                  type: "success",
                  text: this.tlt('intent_edited_alert_msg'),
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                  timer: 2000,
                }).then((result) => {
                  if(this.is_search_active === true){
                  this.search_intent(this.current_selected_intent_index);
                }else{
                  this.load_intent(this.current_selected_intent_index);
                }
                });
              } else if (response.data.message.MSG_CODE == this.api_status_code.INTENT_IN_DIALOG_EDITED_SUCCESSFULLY_MODELS.MSG_CODE) {
                Swal({
                  type: "info",
                  text: this.tlt('intent_edited_alert_msg1'),
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                  timer: 7500,
                }).then((result) => {
                  if(this.is_search_active === true){
                  this.search_intent(this.current_selected_intent_index);
                }else{
                  this.load_intent(this.current_selected_intent_index);
                }
                });
            } else if (response.data.message.MSG_CODE == this.api_status_code.STATUS_FAILURE_MODELS.MSG_CODE) {
                Swal({
                  type: "warning",
                  text: this.tlt('edit_intent_some_error_msg9'),
                  timer: 2500,
                });
              } 
              // else if (response.data.status == "Error") {
              //   Swal({
              //     type: "error",
              //     text: this.tlt('edit_intent_some_error_msg10'),
              //     timer: 2500,
              //   });
              // } 
              else if (response.data.message.MSG_CODE === this.api_status_code.IMG_DUPLICATE_MODELS.MSG_CODE) {
                Swal({
                  type: "error",
                  text: this.tlt('edit_intent_img_exist_alert_msg'),
                  timer: 2500,
                });
              } else if (
                response.data.message.MSG_CODE === this.api_status_code.UNSUCCESSFUL_DB_QUERY_MODELS.MSG_CODE
              ) {
                Swal({
                  type: "error",
                  text: this.tlt('edit_intent_some_error_alert_msg'),
                  timer: 2500,
                });
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
              this.spinnerOn = false;
              if(this.is_search_active === true){
                  this.search_intent(this.current_selected_intent_index);
                }else{
                  this.load_intent(this.current_selected_intent_index);
                }
              if (
                e.response.status === 410 ||
                e.response.status === 440 ||
                e.response.status === 409
              ) {
                this.$root.$emit("Session_Expired", e.response.data);
              } else {
                Swal({
                  type: "error",
                  text: this.tlt('edit_intent_internal_server_msg5'),
                  timer: 2500,
                });
                // toastr.error("Internal Server Error");
              }
            });
          // this.response = "";
          // this.source = "";
          // this.intents = "";
          // this.file_label2 = "Choose file";
          // this.file_content2 = "";
          // this.video_link = "";
        }
      } else if (!this.edit_view_response_modal) {
        if (
          this.request_json_editable == "True" &&
          this.editable_values != ""
        ) {
          for (var i = 0; i < this.task_input_values.length; i++) {
            //  console.log(this.task_input_values[i]);
            if (this.task_input_values[i].input_text == "") {
              Swal({
                text: this.tlt('all_required_values_msg'),
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
        if (
          this.url == "" ||
          this.api_method == null ||
          this.request_json_editable == null ||
          (this.request_json_editable == "True" && this.editable_values == "")
        ) {
            if (this.api_method == null){
              Swal({
                text: this.tlt('select_method_alert_msg'),
                toast: true,
                position: "top-end",
                type: "warning",
                showConfirmButton: false,
                timer: 2500,
              });
            }else if (this.request_json_editable == null){
              Swal({
                text: this.tlt('select_request_json_alert_msg'),
                toast: true,
                position: "top-end",
                type: "warning",
                showConfirmButton: false,
                timer: 2500,
              });
            }else{
              Swal({
                text: this.tlt('all_required_values_msg1'),
                toast: true,
                position: "top-end",
                type: "warning",
                showConfirmButton: false,
                timer: 2500,
              });
            return;
          }
        } else if (this.req_json() == false) {
          Swal({
            text: this.tlt('request_json_invalid_msg'),
            toast: true,
            position: "top-end",
            type: "warning",
            showConfirmButton: false,
            timer: 2500,
          });
          return;
        } else {
          if (this.request_json_editable == "True" && !this.isEdit) {
            // var csv = this.editable_values.split(";");
            // var input_value;
            // this.task_input_values = [];
            // for (var i in csv) {
            //   let temp_list = csv[i].split(",");
            //   input_value = temp_list[temp_list.length - 1];
            //   this.task_input_values.push({
            //     key_name: input_value,
            //     input_text: "",
            //   });
            // }
          }
          if (this.request_json_editable == "True") {
            // let empty_vars = [];
            // for (var i in this.task_input_values) {
            //   if (this.task_input_values[i].input_text == "") {
            //     empty_vars.push(this.task_input_values[i].input_text);
            //   }
            //   //  console.log(this.task_input_values);
            // }
            // if(empty_vars.length != null) {
            this.finalstep = true;
            // } else {
            //   toastr.error("Please enter all the values.");
            // }
          } else {
            this.finalstep = true;
          }
        }
        if (this.finalstep == true) {
          var existing_intent_list = this.api_list.filter((api) => {
            return api.intent == this.intents;
          });
          var post_method_data, get_method_data;
          post_method_data = {};
          get_method_data = {};
          // if (this.api_method == "POST" && this.task_from == "from_entity") {
          if (this.api_method == "POST") {
            for (var i in this.task_input_values) {
              post_method_data[this.task_input_values[i].key_name] = {
                from_text: true,
                from_entity:
                  this.task_input_values[i].input_text != "" ? true : false,
                entity: this.task_input_values[i].input_text,
                intent: this.current_selected_intent,
                not_intent: null,
              };
            }
          }
          if (this.api_method == "GET") {
            for (var i in this.task_input_values) {
              get_method_data[this.task_input_values[i].key_name] = {
                Entity: this.task_input_values[i].input_text,
                Slot: null,
              };
            }
          }
          if (existing_intent_list.length > 0 && !this.isEdit) {
            Swal({
              text: this.tlt('intent_already_exist_msg'),
              toast: true,
              position: "top-end",
              type: "warning",
              showConfirmButton: false,
              timer: 2500,
            });
          }
          if (this.enduser_msg_type == null) {
            Swal({
              text: this.tlt('end_msg_type_alert_msg'),
              toast: true,
              position: "top-end",
              type: "warning",
              showConfirmButton: false,
              timer: 5000,
            });
          }
          if (this.enduser_msg_type == "Through_API") {
            if (this.resp_json() == false) {
              Swal({
                text: this.tlt('request_json_invalid_msg'),
                toast: true,
                position: "top-end",
                type: "warning",
                showConfirmButton: false,
                timer: 2000,
              });
              return;
            }
            if (this.response_key_to_enduser == "") {
              Swal({
                text: this.tlt('all_required_values_msg2'),
                toast: true,
                position: "top-end",
                type: "warning",
                showConfirmButton: false,
                timer: 2500,
              });
              return;
            }
            if (this.response_json_editable == "True") {
              if (this.response_key_edit_message == "") {
                Swal({
                  text: this.tlt('all_required_values_msg3'),
                  toast: true,
                  position: "top-end",
                  type: "warning",
                  showConfirmButton: false,
                  timer: 2500,
                });
                return;
              }
            }
            this.end_user_message = "";
            // console.log("end_user message null",this.end_user_message);
          }
          if (this.enduser_msg_type == "Custom") {
            this.response_key_to_enduser = "";
            this.response_key_edit_message = "";
            // console.log("response key to end user null",this.response_key_to_enduser);
          }
          if (this.unsuccessful_message == "") {
            Swal({
              text: this.tlt('all_required_values_msg4'),
              toast: true,
              position: "top-end",
              type: "warning",
              showConfirmButton: false,
              timer: 2500,
            });
            return;
          }
          if (
            (this.end_user_message != "" ||
              this.enduser_msg_type == "Through_API") &&
            (this.response_json_editable != null ||
              this.enduser_msg_type == "Custom") &&
            this.enduser_msg_type != null &&
            (this.response_key_to_enduser != "" || 
              this.enduser_msg_type == "Custom") &&
            (this.show_json_response_data != "" ||
              this.enduser_msg_type == "Custom")
          ) {
            if (this.$session.get("UserInformation").subscription == "Silver") {
              Swal({
                type: "error",
                text:
                  this.tlt('upgrade_plan_alert_msg'),
                timer: 3000,
              }).then((result) => {
                if (result.value) {
                  if(this.is_search_active === true){
                  this.search_intent(this.current_selected_intent_index);
                }else{
                  this.load_intent(this.current_selected_intent_index);
                }
                }
              });
            } else {
              this.spinnerOn = true;
              let tasks = {};
              if (
                (this.request_json_editable == "True" &&
                  this.task_input_values.length > 0) ||
                this.request_json_editable == "False"
              ) {
                for (var i in this.task_input_values) {
                  var temp = [];
                  temp.push({
                    Type: "Ask",
                    Text: this.task_input_values[i].input_text,
                  });
                  tasks[this.task_input_values[i].key_name] = temp;
                }
                // console.log("reached here finally");
                axios
                  .post(
                    api_calls.intent_question_response(),
                    {
                      company_name: this.companyname,
                      company_id: this.companyid,
                      email: this.$session.get("UserInformation").email,
                      license_key: this.$session.get("UserInformation")
                        .license_key,
                      token: this.$session.get("UserInformation").tokens,
                      is_edit: true,
                      is_endpoint: true,
                      old_intent_name: intent_to_send,
                      old_question_list: this.old_questions_list,
                      intent:
                        this.current_selected_intent,  
                      question_list: this.selected_intent_questions,
                      intent_description:this.selected_intent_description,
                      url: this.url,
                      requestjson: this.show_json_request_data,
                      api_method: this.api_method,
                      end_user_message: this.end_user_message,
                      msg_type: this.enduser_msg_type,
                      responsekey: this.response_key_to_enduser,
                      api_edit: this.request_json_editable,
                      api_editable_value:
                        this.request_json_editable == "True"
                          ? this.editable_values
                          : "",
                      responsejson:
                        this.enduser_msg_type == "Through_API"
                          ? this.show_json_response_data
                          : "",
                      response_msg_editable: this.response_json_editable,
                      response_msg_editable_value:
                        this.response_json_editable == "True"
                          ? this.response_key_edit_message
                          : "",
                      request_json_key_mapping: get_method_data,
                      slot_mapping_data: post_method_data,
                      unsuccessful_msg: this.unsuccessful_message,
                      license_key: this.$session.get("UserInformation")
                        .license_key,
                      email: this.$session.get("UserInformation").email,
                      token: this.$session.get("UserInformation").tokens,
                      task_details: tasks,
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
                    if(this.is_search_active === true){
                      this.search_intent(this.current_selected_intent_index);
                    }else{
                      this.load_intent(this.current_selected_intent_index);
                    }
                    if (response.data.message.MSG_CODE == this.api_status_code.ADD_CONFIGURING_API_URL_SUCCESS_2008_MODELS.MSG_CODE) {
                      Swal({
                        type: "Success",
                        text: this.tlt('intent_added_alert_msg'),
                        timer: 2000,
                      });
                    } else if (response.data.message.MSG_CODE == this.api_status_code.ADD_CONFIGURING_API_JSON_SUCCESS_2006_MODELS.MSG_CODE) {
                      // setTimeout(() => {
                      //   this.$router.go();
                      // }, 2500);
                      Swal({
                        type: "success",
                        text: this.tlt('added_success_alert_msg'),
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        timer: 2500,
                      }).then((result) => {
                        // this.load_intent();
                      });
                    } else if (response.data.message.MSG_CODE == this.api_status_code.INTENT_IN_DIALOG_EDITED_SUCCESSFULLY_MODELS.MSG_CODE) {
                        Swal({
                          type: "info",
                          text: this.tlt('intent_edited_alert_msg'),
                          allowOutsideClick: false,
                          allowEscapeKey: false,
                          timer: 7500,
                        }).then((result) => {
                          // this.load_intent(this.current_selected_intent_index);
                        });
                    } else if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR_MODELS.MSG_CODE) {
                      Swal({
                        type: "error",
                        text: this.tlt('some_error_alert_msg'),
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        timer: 2500,
                      }).then((result) => {});
                      // this.load_intent();
                    } else if (response.data.message.MSG_CODE == this.api_status_code.ENDPOINT_LIMIT_MODELS.MSG_CODE) {
                      Swal({
                        type: "error",
                        text:
                          this.tlt('upgrade_plan_alert_msg2'),
                        timer: 2500,
                      }).then((result) => {
                        // if (result.value) {
                        //   this.$router.go();
                        // }
                      });
                      // this.load_intent();
                    } else {
                      Swal({
                        type: "error",
                        text: this.tlt('some_error_alert_msg2'),
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        timer: 2500,
                      }).then((result) => {});
                      // this.load_intent();
                    }
                  })
                  .catch((e) => {
                    if(this.is_search_active === true){
                      this.search_intent(this.current_selected_intent_index);
                    }else{
                      this.load_intent(this.current_selected_intent_index);
                    }
                    if (
                      e.response.status === 410 ||
                      e.response.status === 440 ||
                      e.response.status === 409
                    ) {
                      this.$root.$emit("Session_Expired", e.response.data);
                    }
                  });
              }
              // else if (
              //     this.request_json_editable == "False" &&
              //     this.task_input_values.length > 0
              //   )
            }
          } else {
            // toastr.error("Please enter all the required values");
            if (this.response_json_editable == null &&
                this.enduser_msg_type == "Through_API" &&
                this.response_key_to_enduser != "" &&
                this.show_json_response_data != ""){
              Swal({
                text: this.tlt('select_response_alert_msg'),
                toast: true,
                position: "top-end",
                type: "warning",
                showConfirmButton: false,
                timer: 2500,
              });
            } else {
              Swal({
                text: this.tlt('all_required_values_alert_msg'),
                toast: true,
                position: "top-end",
                type: "warning",
                showConfirmButton: false,
                timer: 2500,
              });
            }
          }
        }
      }
    },
    save_intent() {
      // event.preventDefault();
      this.add_edit = "true";
      if (this.intent_already_exists) {
        Swal({
          text: this.tlt('intent_page_name_alert_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      }
      if (this.new_intents == "") {
        Swal({
          text: this.tlt('intent_page_add_name_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
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
              text: this.tlt('intent_page_qs_alert_msg'),
              toast: true,
              position: "top-end",
              type: "warning",
              showConfirmButton: false,
              timer: 2000,
            });
            return;
          }
        }
      }
      if (this.add_edit == "true") {
        if (this.view_response_modal) {
          if (this.image_response == "Yes" && this.file_content2 == "") {
            Swal({
              text: this.tlt('intent_page_img_alert_msg'),
              toast: true,
              position: "top-end",
              type: "warning",
              showConfirmButton: false,
              timer: 2000,
            });
            //  console.log("csdcsdfge image");
          } else if (this.video_response == "Yes" && this.embd_link == "") {
            // toastr.error("Upload a Video link");
            Swal({
              text: this.tlt('intent_page_video_alert_msg'),
              toast: true,
              position: "top-end",
              type: "warning",
              showConfirmButton: false,
              timer: 2000,
            });
            //  console.log("csdcsdfge video");
          }
          for (let i = 0; i < this.multiple_response.length; i++) {
            if (this.multiple_response[i] == "") {
              Swal({
                text: this.tlt('intent_page_response_alert_msg'),
                toast: true,
                position: "top-end",
                type: "warning",
                showConfirmButton: false,
                timer: 2500,
              });
              return;
            }
          }
          if (this.file_label2 == "Choose file") {
            // console.log("api call");
            // this.spinnerOn = true;
            // $("#intentmodel").modal("hide");
            Swal({
              text: this.tlt('intent_page_submit_details_msg'),
              type: "info",
              toast: true,
              showConfirmButton: false,
            });
            axios
              .post(
                api_calls.intent_question_response(),
                {
                  company_name: this.companyname,
                  company_id: this.companyid,
                  email: this.$session.get("UserInformation").email,
                  license_key: this.$session.get("UserInformation").license_key,
                  token: this.$session.get("UserInformation").tokens,
                  is_save: true,
                  is_response: true,
                  // intent: this.companyid + "_" + this.new_intents,
                  intent: this.new_intents,
                  subscription: "Platinum",
                  question_list: this.add_questions_list,
                  response: {
                    file_name: null,
                    video_link:
                      this.video_response == "Yes" ? this.embd_link : [],
                    source: this.source,
                    response: this.multiple_response,
                  },
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.$session.get("at")}`,
                  },
                }
              )
              .then((response) => {
                // this.spinnerOn = false;
                if (response.data.message.MSG_CODE == this.api_status_code.ADDED_SUCCESSFULLY_0002_MODELS.MSG_CODE) {
                  Swal({
                    type: "success",
                    text: this.tlt('intent_page_add_success_msg'),
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    timer: 2500,
                  }).then((result) => {});
                  $("#intentmodel").modal("hide");
                  this.load_intent();
                } else if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR_MODELS.MSG_CODE) {
                  Swal({
                    type: "error",
                    text:
                      this.tlt('intent_page_internal_server_msg1'),
                    timer: 2500,
                  });
                  $("#intentmodel").modal("hide");
                  this.load_intent();
                } else {
                  Swal({
                    title: response.data.message.MSG_CODE,
                    text: response.data.message.MSG,
                    showCancelButton: false,
                    showConfirmButton: false,
                    type: "error",
                    timer: 2500
                  });
                  $("#intentmodel").modal("hide");
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
                } else {
                  $("#intentmodel").modal("hide");
                  Swal({
                    type: "error",
                    text:
                      this.tlt('intent_page_internal_server_msg3'),
                    timer: 2500,
                  });
                  this.load_intent();
                }
              });
          } else {
            // console.log("api call with image ");
            // this.spinnerOn = true;
            // $("#intentmodel").modal("hide");
            Swal({
              text: this.tlt('intent_page_submit_details_msg'),
              type: "info",
              toast: true,
              showConfirmButton: false,
            });
            axios
              .post(
                api_calls.intent_question_response(),
                {
                  company_name: this.companyname,
                  company_id: this.companyid,
                  email: this.$session.get("UserInformation").email,
                  license_key: this.$session.get("UserInformation").license_key,
                  token: this.$session.get("UserInformation").tokens,
                  is_save: true,
                  is_response: true,
                  intent: this.new_intents,
                  question_list: this.add_questions_list,
                  subscription: "Platinum",
                  response: {
                    file_name: this.file_label2,
                    file_data: this.file_content2,
                    video_link:
                      this.video_response == "Yes" ? this.embd_link : [],
                    source: this.source,
                    response: this.multiple_response,
                  },
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.$session.get("at")}`,
                  },
                }
              )
              .then((response) => {
                // this.spinnerOn = false;
                if (response.data.message.MSG_CODE == this.api_status_code.ADDED_SUCCESSFULLY_0002_MODELS.MSG_CODE) {
                  Swal({
                    type: "success",
                    text: this.tlt('intent_page_added_success_msg2'),
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    timer: 2500,
                  }).then((result) => {
                    $("#intentmodel").modal("hide");
                    this.load_intent();
                  });
                } else if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR_MODELS.MSG_CODE) {
                  Swal({
                    type: "error",
                    text:
                      this.tlt('intent_page_internal_server_mag1'),
                    timer: 2500,
                  });
                  $("#intentmodel").modal("hide");
                  this.load_intent();
                } else if (response.data.message.MSG_CODE == this.api_status_code.IMG_DUPLICATE.MSG_CODE) {
                  Swal({
                    type: "error",
                    text:
                      this.tlt('intent_page_image_exist_alert_msg'),
                    timer: 2500,
                  });
                  this.load_intent();
                } else {
                  Swal({
                    title: response.data.message.MSG_CODE,
                    text: response.data.message.MSG,
                    showCancelButton: false,
                    showConfirmButton: false,
                    type: "error",
                    timer: 2500
                  });
                  $("#intentmodel").modal("hide");
                  this.load_intent();
                }
              })
              .catch((e) => {
                // this.spinnerOn = false;
                if (
                  e.response.status === 410 ||
                  e.response.status === 440 ||
                  e.response.status === 409
                ) {
                  this.$root.$emit("Session_Expired", e.response.data);
                } else {
                  $("#intentmodel").modal("hide");
                  Swal({
                    type: "error",
                    text:
                      this.tlt('intent_page_internal_server_mag3'),
                    timer: 2500,
                  });
                  this.load_intent();
                }
              });
          }
        } else if (!this.view_response_modal) {
          if (
            this.save_request_json_editable == "True" &&
            this.save_editable_values != ""
          ) {
            for (var i = 0; i < this.save_task_input_values.length; i++) {
              //  console.log(this.save_task_input_values[i]);
              if (this.save_task_input_values[i].input_text == "") {
                Swal({
                  text: this.tlt('intent_page_all_values_alert_msg'),
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
          // if (this.intent_already_exists) {
          //   toastr.error("An Intent with this name already exists.");
          // }
          if (
            this.save_url == "" ||
            this.save_api_method == null ||
            this.save_request_json_editable == null ||
            (this.save_request_json_editable == "True" &&
              this.save_editable_values == "")
          ) {
            // toastr.error("Please enter all the required values");
            if (this.save_api_method == null){
              Swal({
                text: this.tlt('intent_page_select_method_msg'),
                toast: true,
                position: "top-end",
                type: "warning",
                showConfirmButton: false,
                timer: 2500,
              });
            }else if (this.save_request_json_editable == null){
              Swal({
                text: this.tlt('intent_page_request_json_msg'),
                toast: true,
                position: "top-end",
                type: "warning",
                showConfirmButton: false,
                timer: 2500,
              });
            }else {
              Swal({
                text: this.tlt('intent_page_all_values_alert_msg1'),
                toast: true,
                position: "top-end",
                type: "warning",
                showConfirmButton: false,
                timer: 2500,
              });
            }
          }
          else if (this.save_req_json() == false) {
            Swal({
              text: this.tlt('intent_page_request_json_msg1'),
              toast: true,
              position: "top-end",
              type: "warning",
              showConfirmButton: false,
              timer: 2500,
            });
          } else {
            if (this.save_request_json_editable == "True" && !this.isEdit) {
              // var csv = this.editable_values.split(";");
              // var input_value;
              // this.task_input_values = [];
              // for (var i in csv) {
              //   let temp_list = csv[i].split(",");
              //   input_value = temp_list[temp_list.length - 1];
              //   this.task_input_values.push({
              //     key_name: input_value,
              //     input_text: "",
              //   });
              // }
            }
            if (this.save_request_json_editable == "True") {
              // let empty_vars = [];
              // for (var i in this.task_input_values) {
              //   if (this.task_input_values[i].input_text == "") {
              //     empty_vars.push(this.task_input_values[i]);
              //   }
              //   //  console.log(this.task_input_values);
              // }
              // if (empty_vars.length == 0) {
              this.finalstep = true;
              // } else {
              //   toastr.error("Please enter all the values.");
              // }
            } else {
              this.finalstep = true;
            }
          }
          if (this.finalstep == true) {
            var existing_intent_list = this.api_list.filter((api) => {
              return api.intent == this.intents;
            });
            var post_method_data, get_method_data;
            post_method_data = {};
            get_method_data = {};
            // if (this.api_method == "POST" && this.task_from == "from_entity") {
            if (this.save_api_method == "POST") {
              for (var i in this.save_task_input_values) {
                post_method_data[this.save_task_input_values[i].key_name] = {
                  from_text: true,
                  from_entity:
                    this.save_task_input_values[i].input_text != ""
                      ? true
                      : false,
                  entity: this.save_task_input_values[i].input_text,
                  // intent: this.companyid + "_" + this.new_intents,
                  intent: this.new_intents,
                  not_intent: null,
                };
                //  console.log("post method",post_method_data);
              }
              //  console.log("post method",post_method_data);
            }
            if (this.save_api_method == "GET") {
              for (var i in this.save_task_input_values) {
                get_method_data[this.save_task_input_values[i].key_name] = {
                  Entity: this.save_task_input_values[i].input_text,
                  Slot: null,
                };
                //  console.log("get method",get_method_data);
              }
            }
            if (existing_intent_list.length > 0 && !this.isEdit) {
              Swal({
                text:
                  this.tlt('intent_page_name_exist_alert_msg'),
                toast: true,
                position: "top-end",
                type: "warning",
                showConfirmButton: false,
                timer: 2500,
              });
            }
            if (this.save_enduser_msg_type == null) {
              Swal({
                text: this.tlt('intent_page_msg_type_msg'),
                toast: true,
                position: "top-end",
                type: "warning",
                showConfirmButton: false,
                timer: 2500,
              });
            } else if (
              (this.save_end_user_message != "" ||
                this.save_enduser_msg_type == "Through_API") &&
              (this.save_response_json_editable != null ||
                this.save_enduser_msg_type == "Custom") &&
              this.save_enduser_msg_type != null &&
              (this.save_response_key_to_enduser != "" || 
              this.save_enduser_msg_type == "Custom")&&
              (this.save_json_response_data != "" ||
                this.save_enduser_msg_type == "Custom")
            ) {
              if (this.save_enduser_msg_type == "Through_API") {
                if (this.save_resp_json() == false) {
                  Swal({
                    text: this.tlt('intent_page_request_json_alert_msg'),
                    toast: true,
                    position: "top-end",
                    type: "warning",
                    showConfirmButton: false,
                    timer: 2000,
                  });
                  return;
                }
                if (this.save_response_key_to_enduser == "") {
                  Swal({
                    text: this.tlt('intent_page_all_values_alert_msg1'),
                    toast: true,
                    position: "top-end",
                    type: "warning",
                    showConfirmButton: false,
                    timer: 2500,
                  });
                  return;
                }
                if (this.save_response_json_editable == "True") {
                  if (this.save_response_key_edit_message == "") {
                    Swal({
                      text: this.tlt('intent_page_all_values_alert_msg2'),
                      toast: true,
                      position: "top-end",
                      type: "warning",
                      showConfirmButton: false,
                      timer: 2500,
                    });
                    return;
                  }
                }
                this.save_end_user_message = "";
                // console.log("end_user message null",this.save_end_user_message);
              }
              if (this.save_enduser_msg_type == "Custom") {
                this.save_response_key_to_enduser = "";
                this.save_response_key_edit_message = "";
                // console.log("response key to end user null",this.save_response_key_to_enduser);
              }
              if (this.save_unsuccessful_message == "") {
                Swal({
                  text: this.tlt('intent_page_all_values_alert_msg3'),
                  toast: true,
                  position: "top-end",
                  type: "warning",
                  showConfirmButton: false,
                  timer: 2500,
                });
                return;
              }
              if (
                this.$session.get("UserInformation").subscription == "Silver"
              ) {
                Swal({
                  type: "error",
                  text:
                    this.tlt('intent_page_upgrade_plan_msg'),
                  timer: 3000,
                }).then((result) => {
                  if (result.value) {
                    this.$router.go();
                  }
                });
              } else {
                this.spinnerOn = true;
                let tasks = {};
                if (
                  (this.save_request_json_editable == "True" &&
                    this.save_task_input_values.length > 0) ||
                  this.save_request_json_editable == "False"
                ) {
                  for (var i in this.save_task_input_values) {
                    var temp = [];
                    temp.push({
                      Type: "Ask",
                      Text: this.save_task_input_values[i].input_text,
                    });
                    tasks[this.save_task_input_values[i].key_name] = temp;
                  }
                  // console.log("reached here finally");
                  // console.log(this.new_intents);
                  Swal({
                    text: this.tlt('intent_page_submit_details_msg1'),
                    type: "info",
                    toast: true,
                    showConfirmButton: false,
                  });
                  axios
                    .post(
                      api_calls.intent_question_response(),
                      {
                        company_name: this.companyname,
                        company_id: this.companyid,
                        email: this.$session.get("UserInformation").email,
                        license_key: this.$session.get("UserInformation")
                          .license_key,
                        token: this.$session.get("UserInformation").tokens,
                        is_save: true,
                        is_endpoint: true,
                        // intent: this.companyid + "_" + this.new_intents,
                        intent: this.new_intents,
                        question_list: this.add_questions_list,
                        url: this.save_url,
                        requestjson: this.save_json_request_data,
                        api_method: this.save_api_method,
                        end_user_message: this.save_end_user_message,
                        msg_type: this.save_enduser_msg_type,
                        responsekey: this.save_response_key_to_enduser,
                        api_edit: this.save_request_json_editable,
                        api_editable_value:
                          this.save_request_json_editable == "True"
                            ? this.save_editable_values
                            : "",
                        responsejson:
                          this.save_enduser_msg_type == "Through_API"
                            ? this.save_json_response_data
                            : "",
                        response_msg_editable: this.save_response_json_editable,
                        response_msg_editable_value:
                          this.save_response_json_editable == "True"
                            ? this.save_response_key_edit_message
                            : "",
                        request_json_key_mapping: get_method_data,
                        slot_mapping_data: post_method_data,
                        unsuccessful_msg: this.save_unsuccessful_message,
                        license_key: this.$session.get("UserInformation")
                          .license_key,
                        email: this.$session.get("UserInformation").email,
                        token: this.$session.get("UserInformation").tokens,
                        task_details: tasks,
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
                      if (response.data.message.MSG_CODE == this.api_status_code.ADD_CONFIGURING_API_URL_SUCCESS_2008.MSG_CODE) {
                        Swal({
                          type: "success",
                          text: this.tlt('intent_page_intent_added_msg'),
                          allowOutsideClick: false,
                          allowEscapeKey: false,
                          timer: 2500,
                        }).then((result) => {
                          $("#intentmodel").modal("hide");
                          this.load_intent();
                        });
                      } else if (
                        response.data.message.MSG_CODE ==
                        this.api_status_code.ADD_CONFIGURING_API_POST_METHOD_MODELS.MSG_CODE
                      ) {
                        Swal({
                          type: "success",
                          text:
                            this.tlt('intent_page_post_request_msg'),
                          allowOutsideClick: false,
                          allowEscapeKey: false,
                          timer: 2500,
                        }).then((result) => {
                          $("#intentmodel").modal("hide");
                          this.load_intent();
                        });
                      } else if (response.data.message.MSG_CODE == this.api_status_code.ADD_CONFIGURING_API_JSON_SUCCESS_2006_MODELS.MSG_CODE) {
                        Swal({
                          type: "success",
                          text: this.tlt('intent_page_intent_added_msg1'),
                          allowOutsideClick: false,
                          allowEscapeKey: false,
                          timer: 2500,
                        }).then((result) => {
                          this.load_intent();
                          $("#intentmodel").modal("hide");
                        });
                      } else if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR_MODELS.MSG_CODE) {
                        Swal({
                          type: "error",
                          text:
                            this.tlt('intent_page_internal_server_mag4'),
                          timer: 2500,
                        });
                        this.load_intent();
                        $("#intentmodel").modal("hide");
                      } else if (response.data.message.MSG_CODE == this.api_status_code.ENDPOINT_LIMIT_MODELS.MSG_CODE) {
                        Swal({
                          type: "error",
                          text:
                            this.tlt('intent_page_upgrade_plan_msg1'),
                          timer: 2500,
                        }).then((result) => {
                          this.load_intent();
                          $("#intentmodel").modal("hide");
                        });
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
                }
                // else if (
                //     this.save_request_json_editable == "False" &&
                //     this.save_task_input_values.length > 0
                //   )
              }
            } else {
              if (this.save_response_json_editable == null &&
                  this.save_enduser_msg_type == "Through_API" &&
                  this.save_response_key_to_enduser != "" &&
                  this.save_json_response_data != ""){
                Swal({
                  text: this.tlt('intent_page_response_json_alert_msg'),
                  toast: true,
                  position: "top-end",
                  type: "warning",
                  showConfirmButton: false,
                  timer: 2500,
                });
              }else {
                Swal({
                  text: this.tlt('intent_page_all_values_alert_msg4'),
                  toast: true,
                  position: "top-end",
                  type: "warning",
                  showConfirmButton: false,
                  timer: 2500,
                });
              }
            }
          }
        }
      }
    },
    callsearch() {
      if (event.keyCode === 13) {
        if(this.isEditIntent){
          this.verify_changes()
        }else{
          this.search_intent();
        }
      }
    },
    search_intent(current_selected_intent_index) {
      if (this.search_name != "") {
        $("input:checkbox").prop("checked", false);
        this.new_intent_list = [];
        this.checked_list = [];
        this.spinnerOn = true;
        axios
          .post(
            api_calls.intent_question_response(),
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
                text: this.tlt('intent_page_no_result_msg'),
                toast: true,
                position: "top-end",
                type: "warning",
                showConfirmButton: false,
                timer: 2000,
              });
            } else if (
              response.data.message.MSG_CODE != this.api_status_code.INTERNAL_SERVER_ERROR_MODELS.MSG_CODE &&
              response.data.message.MSG_CODE != this.api_status_code.EMPTY_DATA_MODELS.MSG_CODE
            ) {
              this.intentlist = [];
              this.page_no = 1;
              if (response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE_MODELS.MSG_CODE) {
                this.number_of_rows = response.data.pagination.total_data;
                this.total_pages = response.data.pagination.total_page;
                this.intentlist = response.data.data.ResponseList;
                for (var i = 0; i < this.intentlist.length; i++) {
                  this.intentlist[i].Intent = this.intentlist[i].Intent;
                }
              if (this.intentlist.length > 0) {
                this.is_search_active = true;
                if (Boolean(current_selected_intent_index)){
                  this.show_intents(current_selected_intent_index);
                }else{
                  this.show_intents(0);
                }
              }
                this.setpagination(this.page_no);
              }
            } else if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR_MODELS.MSG_CODE) {
              Swal({
                text: this.tlt('intent_page_internal_server_msg5'),
                toast: true,
                position: "top-end",
                type: "warning",
                showConfirmButton: false,
                timer: 2000,
              });
              this.load_intent();
            } else {
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                type: "error"
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
      } else {
        Swal({
          text: this.tlt('intent_page_search_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    },
    delete_selected() {
      if (this.checked_list.length == 0) {
        Swal({
          type: "warning",
          text: this.tlt('intent_page_no_intent_msg'),
          timer: 2000,
        });
      } else if (this.checked_list.length > 0) {
        this.new_intent_list = [];
        for (var i in this.checked_list) {
          this.new_intent_list.push(
            this.checked_list[i]
          );
        }
        // console.log(this.new_intent_list);
        Swal.fire({
          title: this.tlt('intent_page_swal_alert_msg'),
          text: this.tlt('intent_page_revert_alert_msg'),
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: this.tlt('intent_page_swal_alert_delete_msg'),
        }).then((result) => {
          if (result.value) {
            this.spinnerOn = true;
            axios
              .post(
                api_calls.intent_question_response(),
                {
                  intent_list: this.new_intent_list,
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
                this.new_intent_list = [];
                this.spinnerOn = false;
                if (response.data.message.MSG_CODE == this.api_status_code.INTENTS_DELETED_SUCCESS_MODELS.MSG_CODE) {
                  Swal({
                    type: "success",
                    text: this.tlt('intent_page_swal_alert_delete_msg1'),
                    timer: 2000,
                  }).then((result) => {
                    // if (result.value) {
                    // }
                    // this.checked_list = [];
                    // this.load_intent();
                  });
                  // this.load_intent();
                  if(this.checked_list.length === this.intentlist.length && 
                    this.page_no >1){
                      this.page_no = this.page_no - 1;
                  }
                }else if (response.data.message.MSG_CODE == this.api_status_code.INTENT_USED_IN_DIALOG_DELETED_SUCCESSFULLY_MODELS.MSG_CODE) {
                  Swal({
                    type: "info",
                    text: this.tlt('intent_page_swal_alert_delete_msg2'),
                    timer: 8000,
                  });
                  if(this.checked_list.length === this.intentlist.length && 
                    this.page_no >1){
                      this.page_no = this.page_no - 1;
                  }
                } else if (response.data.message.MSG_CODE == this.api_status_code.NOTHING_TO_DELETE_MODELS.MSG_CODE) {
                  Swal({
                    type: "warning",
                    text: this.tlt('intent_page_any_intent_alert_msg'),
                    timer: 2500,
                  });
                  // this.load_intent();
                } else if (
                  response.data.message.MSG_CODE ==
                  this.api_status_code.INTENT_DELETED_TRAIN_MODEL_MODELS.MSG_CODE
                ) {
                  Swal({
                    type: "info",
                    text:
                      this.tlt('intent_page_trained_imtent_msg'),
                    timer: 3000,
                  });
                  this.new_intent_list = [];
                  if(this.checked_list.length === this.intentlist.length && 
                    this.page_no >1){
                      this.page_no = this.page_no - 1;
                  }
                } else if (
                  response.data.message.MSG_CODE == this.api_status_code.TRAINED_INTENT_AND_INTENT_USED_IN_DIALOG_DELETED_SUCCESSFULLY_MODELS.MSG_CODE
                ) {
                  Swal({
                    type: "info",
                    text:
                      this.tlt('intent_page_trained_intent_msg1'),
                    timer: 10000,
                  });
                  this.new_intent_list = [];
                  if(this.checked_list.length === this.intentlist.length && 
                    this.page_no >1){
                      this.page_no = this.page_no - 1;
                  }
                } else{
                  Swal({
                    title: response.data.message.MSG_CODE,
                    text: response.data.message.MSG,
                    showCancelButton: false,
                    showConfirmButton: false,
                    type: "error",
                    timer: 2500
                  });
                  // this.load_intent();
                }
                this.checked_list = [];
                $("input:checkbox").prop("checked", false);
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
                this.load_intent();
              });
          }
        });
      }
    },
    page_require(page) {
      $("input:checkbox").prop("checked", false);
      this.new_intent_list = [];
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
              api_calls.intent_question_response(),
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
              if(response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE_MODELS.MSG_CODE){
                // for (var i in response.data[0]) {
              //   this.intentlist.push({
              //     intent: response.data[0][i].replace(this.companyid + "_", ""),
              //     email: response.data[1][i],
              //     created: response.data[2][i],
              //   });
              // }
              this.intentlist = response.data.data;
              // for (var i = 0; i < this.intentlist.length; i++) {
              //   this.intentlist[i].Intent = this.intentlist[i].Intent.replace(
              //     `${this.companyid}_`,
              //     ""
              //   );
              // }
              if (this.intentlist.length > 0) {
                this.show_intents(0);
              }
              this.setpagination(this.page_no);
              // console.log("page require is here");
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
          if (page == "...s") {
            page = Math.ceil((1 + page) / 2);
          } else if (page == "...l") {
            page = Math.ceil((this.total_pages + page) / 2);
          } else {
            this.page_no = page;
          }
          this.spinnerOn = true;
          axios
            .post(
              api_calls.intent_question_response(),
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
                text: this.tlt('intent_page_no_result_alert_msg'),
                toast: true,
                position: "top-end",
                type: "warning",
                showConfirmButton: false,
                timer: 2000,
              });
            } else if (
              response.data.message.MSG_CODE != this.api_status_code.INTERNAL_SERVER_ERROR_MODELS.MSG_CODE &&
              response.data.message.MSG_CODE != this.api_status_code.EMPTY_DATA_MODELS.MSG_CODE
            ) {
              this.intentlist = [];
                this.number_of_rows = response.data.pagination.total_data;
                this.total_pages = response.data.pagination.total_page;
                this.intentlist = response.data.data.ResponseList;
                for (var i = 0; i < this.intentlist.length; i++) {
                  this.intentlist[i].Intent = this.intentlist[i].Intent;
                }
                if (this.intentlist.length > 0) {
                  this.is_search_active = true;
                  this.show_intents(0);
                }
                this.setpagination(this.page_no);
            } else if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR_MODELS.MSG_CODE) {
              Swal({
                text: this.tlt('intent_page_internal_server_msg8'),
                toast: true,
                position: "top-end",
                type: "warning",
                showConfirmButton: false,
                timer: 2000,
              });
              this.load_intent();
            } else {
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                type: "error",
                timer: 2500,
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
    selected_intents(Intent) {
      if (Intent == "all") {
        if (event.target.checked) {
          var temp = this.intentlist;
          this.checked_list = temp;
          // console.log(this.checked_list);
          temp = [];
          // temp = this.checked_list.map((arr) => arr.Intent);
          // console.log(temp);
          // console.log()
          temp = this.checked_list.filter((item) => !(this.default_retail_intents.includes(item.Intent)))
          // console.log(this.checked_list.map((arr) => arr.Intent).filter((item) => !(this.default_retail_intents.includes(item.Intent))))
          // console.log(this.checked_list.map((arr) => arr.Intent))
          // console.log(temp);
          this.checked_list = temp.map((item)=>{return item.Intent});
          $("input:checkbox").prop("checked", false);
          for(let i = 0; i < this.checked_list.length; i++){
            $("#intent_checkbox_"+this.checked_list[i]).prop("checked", true);
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
    add_to_response_list(type, index) {
      // console.log(this.selected_intent_response.length);
      if ((type == "add") && (this.multiple_response.length == 10 || this.selected_intent_response.length == 10)){
        Swal({
          text: this.tlt('ten_responses_added_alert_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      }
      if (!this.isEditIntent) {
        if (type == "add") {
          this.multiple_response.unshift("");
        } else if (type == "remove") {
          this.multiple_response.splice(index, 1);
        }
      } else {
        if (type == "add") {
          this.selected_intent_response.unshift("");
        } else if (type == "remove") {
          this.selected_intent_response.splice(index, 1);
        }
      }
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
    change_response_type() {
      if (this.define_api_endpoints == true) {
        this.define_api_endpoints = false;
      }
    },
    fileinput() {
      this.file_label = event.target.files[0].name;
      var file_name = this.companyname + "IntentFile.csv";
      if (this.file_label != file_name) {
        Swal({
          type: "error",
          text:
            this.tlt('intent_download_intent_files_msg'),
          timer: 3000,
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
          text: this.tlt('intent_upload_files_msg'),
          timer: 2500,
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
    fileinput3(event) {
      let files = event.target.files[0];
      this.file_label3 = event.target.files[0].name;
      this.file_type3 = event.target.files[0].type;
      // console.log(files)
      // console.log(event.target.files[0])
      if (this.file_label3 != this.temp_file_name) {
        this.image_edit = true;
      }
      if (this.file_type3 == "image/png") {
        this.createImage3(files, this.file_type);
      } else if (this.file_type3 == "image/jpeg") {
        this.createImage3(files, this.file_type);
      } else {
        Swal({
          type: "error",
          text: this.tlt('intent_upload_files_msg1'),
          timer: 2500,
        });
        this.file_label2 = "Choose file";
      }
    },
    createImage3(file, type) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.file_content3 = e.target.result.split("base64,")[1];
      };
      reader.readAsDataURL(file);
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
    embedded_change_edit() {
      var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      var match = this.selected_intent_response_video.match(regExp);

      if (match && match[2].length == 11) {
        // console.log(match[2]);
      } else {
        return "error";
      }
      this.embd_link_edit = "https://www.youtube.com/embed/" + match[2];
      // console.log(this.embd_link);
    },
    empty_variable() {
      // event.preventDefault();
      // this.response = "";
      this.multiple_response = [""];
      // this.edit_response = "";
      // this.$emit(
      //   "input",
      //    ""
      // );
      this.isEditIntent = false;
      this.save_url = "";
      this.save_api_method = null;
      this.save_json_request_data = "";
      this.save_request_json_editable = null;
      this.save_editable_values = "";
      this.save_task_input_values = [];
      this.save_enduser_msg_type = "Custom";
      this.save_json_response_data = "";
      this.save_response_key_to_enduser = "";
      this.save_end_user_message = "";
      this.save_response_json_editable = null;
      this.save_response_key_edit_message = "";
      this.save_unsuccessful_message = "";

      this.source = "Web";
      this.intents = this.intentlist[0];
      this.new_intents = "";
      this.add_questions_list = [""];

      this.file_label = "Choose file";
      this.image_url = "";
      this.image_response = "No";
      this.video_response = "No";
      (this.video_link = ""), (this.embd_link = "");
      this.file_label2 = "Choose file";
      this.file_label3 = "Choose file";
      this.file_content = "";
      document.getElementById("enter_intent_id").style.border = "";
      document.getElementById("inputGroupFileAddon01").value = "";
      document.getElementById("inputGroupFileAddon02").value = "";
      document.getElementById("radioBtnn").checked = false;
      this.uncheck();
      this.intent_already_exists = false;
      this.intent_already_exists_edit = false;
      // this.current_selected_intent_highlight ="";
    },
    json_request_class() {
      try {
        JSON.parse(this.json_request_data[this.index]);
      } catch (e) {
        return "is-invalid";
      }
      return "is-valid";
    },
    json_response_class() {
      try {
        JSON.parse(this.json_response_data[this.index]);
      } catch (e) {
        return "is-invalid";
      }
      return "is-valid";
    },
    edit_intent_details() {
      // if (this.default_retail_intents.includes(this.current_selected_intent)) {
      //   Swal({
      //     title: "Oops",
      //     text: "This is a Default Intent! It cannot be edited",
      //     type: "warning",
      //     timer: 2000,
      //   });
      //   return false;
      // }
      if (!this.isEditIntent) {
        this.isEditIntent = true;
      } else {
        this.isEditIntent = false;
        // this.load_intent();
      }
      return;
    },
    show_block(value) {
      if (value == "up") {
        this.show_or_block = false;
      } else if (value == "down") {
        this.show_or_block = true;
      }
    },
    file_submit() {
      event.preventDefault();
      if ($("#inputGroupFilecsv").val() == '') {
        Swal.fire({
          title: this.tlt('intent_input_field_msg'),
          text: this.tlt('intent_upload_csv_files_msg'),
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
        is_form_intents: false,
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
            if (response.data.message.MSG_CODE == this.api_status_code.FILE_UPLOAD_MODELS.MSG_CODE) {
              Swal({
                title: this.tlt('intent_upload_files_success_msg'),
                type: "success",
                showConfirmButton: false,
                timer: 2000,
              });
            } else if (response.data.message.MSG_CODE == this.api_status_code.INCORRECT_FILE_FORMAT_MODELS.MSG_CODE) {
            //   Swal({
            //     title: this.tlt('intent_incorrect_file_alert_msg'),
            //     type: "warning",
            //     text:
            // tlt('sample_intent_file_msg'),
            //     // timer: 4000,
            //   });
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                type: "warning",
                timer: 2500
              });
            } else if (response.data.message.MSG_CODE == this.api_status_code.INVALID_FILE_TYPE_MODELS.MSG_CODE) {
              Swal({
                title: this.tlt('intent_file_type_alert_msg'),
                type: "warning",
                text:
            this.tlt('intent_download_files_msg'),
                // timer: 4000,
              });
            } else if(response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR_MODELS.MSG_CODE){
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                type: "error",
                timer: 2500
              })
            }
            else {
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                type: "warning",
                timer: 2500
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
          sample_file: "intent",
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
          if (response.data.message === "Not able to download file") {
            Swal({
              title: this.tlt('intent_some_error_occur_msg'),
              type: "error",
              timer: 2500,
            });
          } else {
            var url = window.URL.createObjectURL(new Blob([response.data]));
            var link = document.createElement("a");
            link.href = url;
            // console.log(this.companyname)
            link.setAttribute("download", this.companyname + "IntentFile.csv");
            document.body.appendChild(link);
            link.click();
          }
        })
        .catch((e) => {
          $("#file_upload").modal("hide");
          this.spinnerOnFileDownload = false;
          Swal({
            title: this.tlt('intent_some_error_occur_msg1'),
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
    },
    fileinput_csv() {
      this.file_label_csv = event.target.files[0].name;
      // var file_name = this.companyname + "IntentFile.csv";
      this.file_content_csv = event.target.files[0];
      // if (this.file_label_csv != file_name) {
      //   Swal({
      //     type: "info",
      //     text:
      //       "Users need to download the Sample Intent CSV File from 'Upload CSV File' model. Changes to this file will be accepted by the system.",
      //     timer: 10000,
      //   });
      //   this.file_label_csv = "Choose file";
      //   document.getElementById("inputGroupFilecsv").value = "";
      // } else {
      //   this.file_content_csv = event.target.files[0];
      // }
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
            is_form_intents: false,
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
          }
          else {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              type: "error",
              timer: 3000
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
    upload_file_open_modal(){
      if(!this.disable_btn_expired){
        $("#file_upload").modal('show')
      } else {
        this.show_subscription_expired_swal();
      }
    },
  },
};
</script>

<style  src="vue-multiselect/dist/vue-multiselect.min.css">
</style>
<style scoped>
.ScrollStyle {
  /* height: 200px; */
  min-height: 0px;
  max-height: 250px;
  overflow-y: auto;
  /* border: 1px solid #e3e2e5; */
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
