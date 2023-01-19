<template>
  <div>
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <div class="container-fluid p-0" id="entities_page">
      <div class="card dash-card">
        <div
          class="card-header d-block d-sm-flex flex-wrap justify-content-between"
        >
          <h4 class="mb-sm-0">{{tlt('entities_page_title')}}</h4>
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
              @click="isEditEntity ? verify_changes() : search_entity()"
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
              data-target="#entitymodel"
              id="add_entity_btn"
              title="Add new Entity"
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
              {{tlt('entities_add_entity_btn_label')}}
            </a>
            <!-- <a
              href="#"
              class="darkblue-btn"
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
            <button id="train_model_btn" class="darkblue-btn" @click="train_model">
              Train Model
            </button> -->
            <a
              href="javascript:void(0)"
              class="red-btn"
              @click="isEditEntity ? verify_changes() : delete_selected()"
              id="delete_entity_id"
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
              {{tlt('entities_delete_btn')}}
            </a>
          </div>
        </div>
        <div class="card-body" id="page">
          <div class="col-sm-12 d-flex px-0" v-show="Boolean(entity_list.length > 0)">
            <div class="col-sm-4 pl-0" v-show="Boolean(entity_list.length > 0)">
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
                                @change="selected_entities('all')"
                              />
                              <span class="icn"></span>
                            </label>
                          </div>
                        </th>
                        <th scope="col" class="text-left">{{tlt('entities_entity_header')}}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(entites, index) in entity_list"
                        :key="index"
                        :class="check_current_entity(index)"
                      >
                        <th scope="col">
                          <div class="form-check checkbox-success">
                            <label
                              class="form-check-label checkbox checkbox-success" :style="entites.type === 'system'?'cursor: not-allowed':null"
                            >
                              <input
                                class="form-check-input"
                                type="checkbox"
                                :id="'entity_checkbox_'+index"
                                @change="selected_entities(entites.entity)"
                                :disabled="entites.type === 'system'"
                              />
                              <span class="icn" v-if="entites.type === 'system'" style="background:#bbb; border:solid 1px #e5e5e5;"></span>
                              <span class="icn" v-else></span>
                            </label>
                          </div>
                        </th>
                        <td
                          style="cursor: pointer"
                          @click="isEditEntity ? verify_changes() : show_entities(index)"
                          :title="entites.entity"
                        >
                          <template>
                            <p style="margin-bottom: 0">
                              {{ entites.entity }}
                            </p>
                          </template>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="col-sm-8 pr-0" v-show="Boolean(entity_list.length > 0)">
              <div style="border: 1px solid #dbe2e8">
                <div class="col-sm-12">
                  <div style="color: #414141" class="d-flex">
                    <h5><p class="mt-2 mb-0">{{tlt('entities_entity_details_header')}}</p></h5>
                    <span
                      @click="current_selected_type === 'system'? null:edit_entity_details()"
                      v-html="pencil_svg"
                      class="ml-auto mr-0 mt-2"
                      :title="(current_selected_type === 'system')?'System entity can not be edited':null"
                      :style="!(current_selected_type === 'system')?'cursor: pointer':'cursor: not-allowed'"
                    ></span>
                  </div>
                </div>
                <hr />
                <div class="col-sm-12" style="margin-bottom: 1rem">
                  <h5>
                    <p class="mt-2 mb-0" style="color: #414141">
                      {{tlt('entities_entity_name_label')}} 
                    </p>
                  </h5>
                  <label class="pl-1 form-text text-muted" v-if="isEditEntity">{{tlt('entities_entity_name_help_text')}}</label>
                  <div v-if="!isEditEntity" class="ml-3">
                    <p>@{{ current_selected_entity }}</p>
                  </div>
                  <template v-else-if="isEditEntity">
                    <div class="input-box">
                      <input
                        style="padding-left:19px !important;"
                        align="right"
                        class="form-control edit"
                        :placeholder="tlt('entity_name_here')"
                        id="enter_entity_edit_id"
                        maxlength="25"
                        v-on:keyup="enter_entity_edit"
                        v-model.trim="current_selected_entity"
                        @keydown="entity_name_check_special_characters($event)"
                      />
                      <span class="unit">@</span>
                    </div>
                    <span
                      v-show="entity_already_exists_edit"
                      style="color: red;"
                      >{{tlt('entities_entity_name_condition_text')}}.</span>
                  </template>
                </div>
                <hr />
                <div v-if="!isEditEntity">
                  <div class="col-sm-12">
                    <h5 class="heading">{{tlt('entities_validate_type_header')}}</h5>
                    <label class="ml-3">{{current_selected_validation_type}}</label>
                  </div>
                  <div class="col-sm-12 p-0" v-if="this.current_selected_type === 'system'">
                    <h5>
                      <p class="mt-2 mb-0" style="color: #414141">Description</p>
                    </h5>
                    <template>
                      <div class="ScrollStyle ml-3" style="padding-right:8px !important">
                        <p class="mt-2 mb-0" style="color: #414141;">{{current_selected_description}}</p>
                      </div>
                    </template>
                  </div>
                  <div class="col-sm-12 pr-0" v-if="this.current_selected_type === 'pattern'">
                    <h5>
                      <p class="mt-2 mb-0" style="color: #414141">Pattern</p>
                    </h5>
                    <template>
                      <div class="ScrollStyle ml-3" style="padding-right:8px !important">
                        <div
                          v-for="(
                            new_pattern, index
                          ) in current_selected_pattern"
                          :key="index"
                        >
                          <li
                            style="
                              padding-left: 0rem;
                              list-style-position: inside;
                            "
                          >
                            {{ current_selected_pattern[index]['pattern'] }}
                          </li>
                        </div>
                      </div>
                    </template>
                  </div>
                  <div class="col-sm-12 pr-0" v-else-if="this.current_selected_type === 'synonyms'">
                    <h5>
                      <p class="mt-2 mb-0" style="color: #414141">{{tlt('entities_value_label')}}</p>
                    </h5>
                    <template>
                      <div class="ScrollStyle ml-3" style="padding-right:8px !important">
                        <div
                          v-for="(
                            new_value, index
                          ) in current_selected_values"
                          :key="index"
                        >
                          <li
                            style="
                              padding-left: 0rem;
                              list-style-position: inside;
                            "
                          >
                            {{ current_selected_values[index]['value'] }}
                          </li>
                          <!-- <h6> -->
                            <p class="mt-0 mb-0" style="padding-left: 1.38rem;">{{tlt('entities_page_title')}}:</p>
                          <!-- </h6> -->
                          <template>
                            <ol>
                              <div
                                v-for="(
                                  new_sunonyms, index1
                                ) in current_selected_values[index]['synonyms']"
                                :key="index1"
                              >
                                <li
                                  style="
                                    padding-left: 0rem;
                                    list-style-position: inside;
                                  "
                                >
                                  {{ new_sunonyms }}
                                </li>
                              </div>
                            </ol>
                          </template>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
                <div v-else-if="isEditEntity">
                  <div class="col-sm-12">
                    <div class="form-group">
                      <h5 class="d-flex heading">{{tlt('entities_validation_on_edit_label')}}</h5>
                      <label class="switch float-right" style="margin-top: -27px !important;">
                        <input
                          type="checkbox"
                          v-model="current_selected_validation_needed"
                          id="current_selected_validation_needed_id"
                        />
                        <span
                          class="slider round"
                          style="border-radius: 50px;"
                        ></span>
                      </label>
                      <label class="form-text text-muted">
                        {{tlt('entities_validation_on_edit_help_text')}}
                      </label>
                    </div>
                    <div v-if="current_selected_validation_needed" class="form-group">
                      <div class="radio my-auto">
                        <label>
                          <input
                            type="radio"
                            v-model="current_selected_validation_type"
                            value="numeric"
                            id="current_selected_validation_type_numeric_id"
                          />
                          <span class="icn"></span>
                          {{tlt('entities_validation_on_edit_numeric_label')}}
                        </label>
                        <label>
                          <input
                            type="radio"
                            v-model="current_selected_validation_type"
                            value="alphabetical"
                            id="current_selected_validation_type_alphabetical_id"
                          />
                          <span class="icn"></span>
                          {{tlt('entities_validation_on_edit_alphabet_label')}}
                        </label>
                        <label>
                          <input
                            type="radio"
                            v-model="current_selected_validation_type"
                            value="alphanumeric"
                            id="current_selected_validation_type_alphanumeric_id"
                          />
                          <span class="icn"></span>
                          {{tlt('entities_validation_on_edit_alphanumeric_label')}}
                        </label>
                      </div>
                    </div>
                  </div>
                  <!-- <hr /> -->
                  <div class="col-sm-12" v-if="this.current_selected_type === 'pattern'">
                    <div class="mb-3">
                      <button
                        id="add_pattern_button_id"
                        class="darkblue-btn mb-0"
                        style="padding: 5px 10px; float: right !important;"
                        @click="add_to_pattern_list_edit('add')"
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
                      <h5>
                        <p class="mt-2 mb-0" style="color: #414141">Pattern</p>
                      </h5>
                    </div>
                    <template>
                      <div class="ScrollStyle" style="display: block; margin-bottom: 1rem;">
                        <div
                          v-for="(
                            new_pattern, index
                          ) in current_selected_pattern"
                          :key="index"
                          class="form-group"
                          style="display:flex;"
                        >
                          <input
                            type="text"
                            v-model.trim="current_selected_pattern[index]['pattern']"
                            class="form-control edit"
                            :placeholder="tlt('enter_pattern')"
                            :id="`enter_pattern_id_${index}`"
                          />
                          <span
                            v-if="current_selected_pattern.length > 1"
                            style="cursor: pointer"
                            class="my-auto ml-2 mr-0"
                            @click="add_to_pattern_list_edit('remove', index)"
                          >
                            <i style="font-size: 16px" class="fa">&#xf00d;</i>
                          </span>
                        </div>
                      </div>
                    </template>
                  </div>
                  <div class="col-sm-12" v-else-if="this.current_selected_type === 'synonyms'">
                    <div class="card-act">
                      <button
                        id="add_values_button_id_id"
                        class="darkblue-btn mr-0"
                        style="padding: 5px 10px; float:right;"
                        @click="add_to_values_list_edit('add')"
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
                      <h5>
                        <p class="mt-2 mb-0" style="color: #414141">{{tlt('entities_values_on_edit_label')}}</p>
                      </h5>
                    </div>
                    <template>
                      <div class="mt-3 ScrollStyle" style="display: block; margin-bottom: 1rem;">
                        <div
                          v-for="(
                            new_synonyms, index
                          ) in current_selected_values"
                          :key="index"
                          class="custom-button-box pl-3 pt-3 pr-1 mt-0 mb-3"
                          style=""
                        >
                          <label class="mt-0" style="">{{tlt('values_on_edit_value_label')}}:</label>
                          <i
                            v-if="current_selected_values.length > 1"
                            style="
                              cursor: pointer;
                              font-size: 16px;
                              float: right;"
                            class="fa ml-auto mr-1"
                            @click="add_to_values_list_edit('remove', index)"
                          >
                            &#xf1f8;
                          </i>
                          <input
                            type="text"
                            v-model.trim="current_selected_values[index]['value']"
                            class="form-control edit"
                            :placeholder="tlt('enter_value')"
                            :id="`enter_value_id_${index}`"
                            style="width:99.5% !important;"
                          />
                          <div class="mt-2 mb-2">
                            <label style="">{{tlt('values_on_edit_synonyms_label')}}:</label>
                            <a
                              class="darkblue-btn mr-1"
                              style="padding: 5px 10px; float:right;"
                              @click="add_to_synonyms_list_edit('add', index)"
                              id="add_synonyms_button_id"
                            
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
                          </div>
                          <div
                            v-for="(
                              new_sunonyms, index1
                            ) in current_selected_values[index]['synonyms']"
                            :key="index1"
                            class="form-group"
                            style="display:flex;"
                          >
                            <input
                              type="text"
                              v-model.trim="current_selected_values[index]['synonyms'][index1]"
                              class="form-control edit"
                              :placeholder="tlt('enter_synonym')"
                              :id="`enter_synonyms_id_${index}`"
                              style="width:99.5% !important;"
                            />
                            <span
                              v-if="current_selected_values[index]['synonyms'].length > 1"
                              style="cursor: pointer;"
                              class="my-auto ml-2 mr-1"
                              @click="add_to_synonyms_list_edit('remove',index, index1)"
                            >
                              <i style="font-size: 16px" class="fa">&#xf00d;</i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                  <div class="modal-footer">
                    <div class="dash-modal">
                    <div class="btn-wrap text-right mt-0 py-0 border-top-0">
                      <button
                        type="button"
                        class="btn btn-link"
                        data-dismiss="modal"
                        @click="edit_entity_details"
                      >
                        {{tlt('entities_cancel_btn')}}
                      </button>
                      <button
                        type="submit"
                        class="darkblue-btn"
                        id="res_n_int_save"
                        @click="edit_entity()"
                      >
                        {{tlt('entities_save_btn')}}
                      </button>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-show="Boolean(entity_list.length === 0) && !spinnerOn">
            <p class="text-center">
              <strong>
                {{tlt('entities_no_entity_added_text')}}.</strong
              >
            </p>
          </div>
          <div class="pagin-table" style="margin-top: 2%" v-show="Boolean(entity_list.length > 0)">
            <nav aria-label="Page navigation example">
              <ul class="pagination justify-content-center">
                <li class="page-item">
                  <a
                    class="page-link"
                    href="#"
                    @click="isEditEntity ? verify_changes() : page_require(page_no - 1)"
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
                    @click="isEditEntity ? verify_changes() : page_require(pageno)"
                    >...</a
                  >
                  <a
                    v-if="pageno != '...s' && pageno != '...l'"
                    class="page-link"
                    href="#"
                    @click="isEditEntity ? verify_changes() : page_require(pageno)"
                    >{{ pageno }}</a
                  >
                </li>
                <li class="page-item">
                  <a
                    class="page-link"
                    href="#"
                    @click="isEditEntity ? verify_changes() : page_require(page_no + 1)"
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
      id="entitymodel"
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
              <h3>{{tlt('entity_model_add_entity_header')}}</h3>
              <button type="button" class="close" data-dismiss="modal">
                <img src="/img/close-icn.png" alt />
              </button>
            </div>
            <div class="form-group">
              <h5 class="heading">{{tlt('entity_model_entity_name_label')}}</h5>
              <label class="form-text text-muted">
                {{tlt('entity_model_entity_name_text')}}
              </label>
              <div class="input-box">
                <input
                  v-model.trim="save_new_entities"
                  id="enter_entities_name_id"
                  type="text"
                  class="form-control"
                  :placeholder="tlt('entity_name_here')"
                  required
                  maxlength="25"
                  @keyup="search_entities_name()"
                  @keydown="entity_name_check_special_characters($event)"
                  :style="(save_new_entities.length > 0) ? 'padding-left:19px !important;': null"
                >
                <span v-if="save_new_entities.length > 0" class="unit">@</span>
              </div>
              <p v-show="entity_already_exists" 
                style="
                  color: red !important; 
                  margin-bottom:0px !important; 
                  padding-top:8px !important">
               {{tlt('entities_name_already_exist_text')}}
              </p>
            </div>
            <div class="form-group">
              <h5 class="d-flex heading">{{tlt('entity_model_validation_label')}}</h5>
              <label class="switch float-right" style="margin-top: -27px !important;">
                <input
                  type="checkbox"
                  v-model="validation_needed"
                  id="validation_needed_id"
                />
                <span
                  class="slider round"
                  style="border-radius: 50px;"
                ></span>
              </label>
              <label class="form-text text-muted">
                {{tlt('entity_model_validation_text')}}
              </label>
            </div>
            <div v-if="validation_needed" class="form-group">
              <div class="radio my-auto">
                <label>
                  <input
                    type="radio"
                    v-model="validation_type"
                    value="numeric"
                    id="validation_type_numeric_id"
                  />
                  <span class="icn"></span>
                  {{tlt('entity_model_validation_option_numeric_label')}}
                </label>
                <label>
                  <input
                    type="radio"
                    v-model="validation_type"
                    value="alphabetical"
                    id="validation_type_alphabetical_id"
                  />
                  <span class="icn"></span>
                  {{tlt('entity_model_validation_option_alphabet_label')}}
                </label>
                <label>
                  <input
                    type="radio"
                    v-model="validation_type"
                    value="alphanumeric"
                    id="validation_type_alphanumeric_id"
                  />
                  <span class="icn"></span>
                  {{tlt('entity_model_validation_option_alphanumeric_label')}}
                </label>
              </div>
            </div>
            <div class="form-group">
              <h5 class="heading" >{{tlt('entity_model_value_type_label')}}</h5>
              <div class="radio my-auto">
                <label>
                  <input
                    type="radio"
                    v-model="entities_value_type"
                    value="synonyms"
                    id="entities_value_type_synonyms_id"
                  />
                  <span class="icn"></span>
                  {{tlt('entity_model_synonym_option_label')}}
                </label>
                <label>
                  <input
                    type="radio"
                    v-model="entities_value_type"
                    value="pattern"
                    id="entities_value_type_pattern_id"
                  />
                  <span class="icn"></span>
                  {{tlt('entity_model_pattern_option_label')}}
                </label>
              </div>
            </div>
            <div class="form-group" v-if="entities_value_type == 'synonyms'">
              <div class="card-act">
                <button
                  id="add_values_button_id_id"
                  class="darkblue-btn"
                  style="padding: 5px 10px; float:right;"
                  @click="add_to_values_list('add')"
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
                <h5>
                  <p class="mt-2 mb-0" style="color: #414141">{{tlt('entity_model_values_option_label')}}</p>
                </h5>
              </div>
              <template>
                <div class="mt-3 ScrollStyle" style="display: block; margin-bottom: 1rem;">
                  <div
                    v-for="(
                      new_synonyms, index
                    ) in synonyms_value_list"
                    :key="index"
                    class="custom-button-box pl-3 pt-3 pr-1 mt-0 mb-3"
                    style=""
                  >
                    <label class="mt-0" style="">{{tlt('entity_model_value_text')}}:</label>
                    <i
                      v-if="synonyms_value_list.length > 1"
                      style="
                        cursor: pointer;
                        font-size: 16px;
                        float: right;"
                      class="fa ml-auto mr-1"
                      @click="add_to_values_list('remove', index)"
                    >
                      &#xf1f8;
                    </i>
                    <input
                      type="text"
                      v-model.trim="synonyms_value_list[index]['value']"
                      class="form-control edit"
                      :placeholder="tlt('enter_value')"
                      :id="`enter_value_id_${index}`"
                      style="width:99.5% !important;"
                    />
                    <div class="mt-2 mb-2">
                      <label style="">{{tlt('entity_model_synonym_text')}}:</label>
                      <a
                        class="darkblue-btn mr-1"
                        style="padding: 5px 10px; float:right;"
                        @click="add_to_synonyms_list('add', index)"
                        id="add_synonyms_button_id"
                      
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
                    </div>
                    <div
                      v-for="(
                        new_sunonyms, index1
                      ) in synonyms_value_list[index]['synonyms']"
                      :key="index1"
                      class="form-group"
                      style="display:flex;"
                    >
                      <input
                        type="text"
                        v-model.trim="synonyms_value_list[index]['synonyms'][index1]"
                        class="form-control edit"
                        :placeholder="tlt('enter_synonym')"
                        :id="`enter_synonyms_id_${index}`"
                        style="width:99.5% !important;"
                      />
                      <span
                        v-if="synonyms_value_list[index]['synonyms'].length > 1"
                        style="cursor: pointer;"
                        class="my-auto ml-2 mr-1"
                        @click="add_to_synonyms_list('remove',index, index1)"
                      >
                        <i style="font-size: 16px" class="fa">&#xf00d;</i>
                      </span>
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <div class="form-group" v-if="entities_value_type == 'pattern'">
              <div class="mb-3">
                <button
                  id="add_pattern_button_id"
                  class="darkblue-btn mb-0"
                  style="padding: 5px 10px; float: right !important;"
                  @click="add_to_pattern_list('add')"
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
                <h5>
                  <p class="mt-2 mb-0" style="color: #414141">{{tlt('entity_model_pattern_text')}}</p>
                </h5>
              </div>
              <template>
                <div class="ScrollStyle" style="display: block; margin-bottom: 1rem;">
                  <div
                    v-for="(
                      new_pattern, index
                    ) in pattern_list"
                    :key="index"
                    class="form-group"
                    style="display:flex;"
                  >
                    <input
                      type="text"
                      v-model.trim="pattern_list[index]['pattern']"
                      class="form-control edit"
                      :placeholder="tlt('enter_pattern')"
                      :id="`enter_pattern_id_${index}`"
                    />
                    <span
                      v-if="pattern_list.length > 1"
                      style="cursor: pointer"
                      class="my-auto ml-2 mr-0"
                      @click="add_to_pattern_list('remove', index)"
                    >
                      <i style="font-size: 16px" class="fa">&#xf00d;</i>
                    </span>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <div class="modal-footer">
            <div class="btn-wrap text-right mt-0 py-0 border-top-0">
              <button
                type="button"
                class="btn btn-link"
                data-dismiss="modal"
                @click="empty_variable"
              >
                {{tlt('entities_cancel_btn')}}
              </button>
              <button
                type="submit"
                class="darkblue-btn"
                id="res_n_int_save"
                @click="save_entity()"
              >
                {{tlt('entities_save_btn')}}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade dash-modal"
      id="file_upload_id"
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
              <h3>Upload CSV File</h3>
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
            <form @submit.prevent="file_submit">
              <div class="form-group">
                <div class="custom-file">
                  <input
                    type="file"
                    accept=".csv"
                    class="custom-file-input"
                    @change="fileinput_csv"
                    id="inputGroupFilecsv_id"
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
                  * Please Note that only Responses with only Text Response can
                  be added via CSV, API Endpoints and Responses with Image need
                  to be added from the portal.
                </p>
              </div>
              <div class="btn-wrap text-right">
                <a href="#" @click.prevent="download_sample_file">
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
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import api_calls from "@/portal/api_calls";
import Template from '../Template.vue';
import { freeze_portal,show_subscription_expired_swal } from "@/portal/mixins";

export default {
  components: { Template },
  mixins: [freeze_portal,show_subscription_expired_swal],
  name:"entities_component",
  data() {
    return {
      is_at_in_entity:false,
      validation_needed: false,
      validation_type: null,
      current_selected_validation_needed: false,
      current_selected_validation_type: null,
      save_new_entities: '',
      entities_value_type:'synonyms',
      synonyms_value_list: [{
        value:'',
        synonyms:[""]
      }],
      pattern_list:[{
        pattern:''
      }],
      spinnerOn: false,
      checked_list: [],
      entity_already_exists: false,
      entity_already_exists_edit: false,
      pencil_svg:'<svg xmlns="http://www.w3.org/2000/svg" width="15.546" height="15.461" viewBox="0 0 15.546 15.461"><defs><style>.a{fill:#9e9e9e;}</style></defs><g transform="translate(-747.888 -356.769)"><path class="a" d="M759.416,356.769a2.358,2.358,0,0,1,1.777.662c.534.513,1.072,1.025,1.567,1.575a2.3,2.3,0,0,1-.071,3.325c-2.736,2.76-5.494,5.5-8.238,8.251a1.381,1.381,0,0,1-.758.288c-.719.174-1.429.379-2.144.572-.932.251-1.862.5-2.795.751-.6.158-.989-.213-.832-.807q.689-2.595,1.406-5.182a1.164,1.164,0,0,1,.289-.487q4.091-4.107,8.2-8.2A2.265,2.265,0,0,1,759.416,356.769Zm-1.989,2.956-6.54,6.538,3.025,3.024,6.538-6.537Zm4.023,2.165c.118-.135.225-.269.343-.392a1.134,1.134,0,0,0,0-1.734c-.46-.466-.926-.925-1.388-1.39a1.166,1.166,0,0,0-.861-.368c-.578,0-.881.4-1.214.76Zm-12.084,8.863,3.2-.863-2.337-2.331Z" transform="translate(0)"/><path class="a" d="M813.942,422.6l-.789-.8,3.821-3.819.784.8Z" transform="translate(-59.648 -55.947)"/></g></svg>',
      search_name: "",
      isVisibleSearchClear: false,
      file_label_csv: "Choose file",
      spinnerOnFileDownload: false,
      entity_list: [],
      page_no: 1,
      per_page: 15,
      page_array: [],
      total_pages: null,
      number_of_rows: null,
      isEditEntity: false,
      is_search_active:false,
      old_entity_name:'',
      current_selected_entity_highlight:'',
      current_selected_entity:'',
      current_selected_entity_index:0,
      current_selected_type:'',
      current_selected_id: null,
      current_selected_description:'',
      current_selected_values:[{
        value:'',
        synonyms:[""]
      }],
      current_selected_pattern:[{
        pattern:''
      }]
    };
  },
  created(){
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
    this.load_entity();
  },
  mounted(){
    setTimeout(() => {
      this.freeze_portal();
    }, 1000);
    this.$root.$on("entities_componentDisabled", (data) => {
      if(data===true){
        this.show_subscription_expired_swal();
      }
    });
    var vm = this;
    $('a[data-target="#entitymodel"]').on('click' , function () {
      if(vm.isEditEntity == true){
        vm.verify_changes();
      }else{
        vm.empty_variable();
        $("#entitymodel").modal('show');
      }
    });
    $("#selectall").click(function () {
      if ($(this).is(":checked")) {
        // $('div:input').prop('checked',true);
        $("input:checkbox").prop("checked", true);
      } else {
        vm.checked_list = [];
        $("input:checkbox").prop("checked", false);
      }
    });
  },
  watch:{
    current_selected_entity(val){
      this.current_selected_entity = val.replace(/[^a-zA-Z0-9_ ]/g, "");
    },
    save_new_entities(val){
      this.save_new_entities = val.replace(/[^a-zA-Z0-9_ ]/g, "");
    },
    search_name() {
      if (this.search_name === "") {
        this.load_entity();
        this.isVisibleSearchClear = false;
      } else if (this.search_name !== "") {
        this.isVisibleSearchClear = true;
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    if (this.isEditEntity) {
      this.verify_changes();
    } else {
      next();
    }
  },
  methods:{
    verify_changes() {
      Swal({
        title: this.tlt('entity_swal_alert_msg1'),
        text: this.tlt('entity_swal_changes_in_objective_msg'),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.tlt('entity_swal_save_btn'),
        cancelButtonText: this.tlt('entity_swal_cancel_btn'),
      }).then((result) => {
        if (result.value) {
          this.edit_entity();
        }else{
          this.isEditEntity = false;
          this.load_entity();
        }
      });
    },
    // routetoassistantLayout(){
    // this.$router.push({
    //     name: "Conversational Flow",
    //     params:{modal_open_entity_tab: true  }
    //   });
    // },
    check_current_entity(index) {
      var return_var = "";
      if (this.entity_list[index].entity == this.current_selected_entity_highlight) {
        return_var += "current-active-entity";
      }
      return return_var;
    },
    show_entities(index) {
      this.isEditEntity = false;
      this.current_selected_entity_index = index;
      if(this.entity_list[index].entity.substring(0,1) === "@"){
        this.is_at_in_entity = true;
        var len = this.entity_list[index].entity.length;
        this.current_selected_entity = this.entity_list[index].entity.substring(1,len);
        this.old_entity_name = this.entity_list[index].entity.substring(1,len);
      }else{
        this.is_at_in_entity = false;
        this.current_selected_entity = this.entity_list[index].entity;
        this.old_entity_name = this.entity_list[index].entity;
      }
      this.current_selected_id = this.entity_list[index].id;
      this.current_selected_entity_highlight = this.entity_list[index].entity;
      this.current_selected_type = this.entity_list[index].type;
      this.current_selected_validation_needed =  this.entity_list[index].validation_needed;
      this.current_selected_validation_type =  this.entity_list[index].validation_type;
      // this.current_selected_values = this.entity_list[index].values;
      if (this.current_selected_type == 'pattern'){
        this.current_selected_pattern = this.entity_list[index].values;
      }else if(this.current_selected_type == 'system'){
        this.current_selected_description = this.entity_list[index].description;
      }else{
        this.current_selected_values = this.entity_list[index].values;
      }
    },
    load_entity(current_selected_entity_index){
      this.is_search_active = false;
      $("input:checkbox").prop("checked", false);
      this.checked_list = [];
      this.spinnerOn = true;
      axios
        .post(
          api_calls.form_automation_add_entity(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            subscription: this.$session.get("UserInformation").subscription,
            is_get_entity: true,
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
          if(response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE_MODELS.MSG_CODE) {
            this.total_pages = response.data.pagination.total_page
            this.entity_list = response.data.data.entity_names;
            if (this.entity_list.length > 0) {
              if(Boolean(current_selected_entity_index)){
                this.show_entities(current_selected_entity_index);
              }else{
                this.show_entities(0);
              }
            }
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
    },
    clear_search_name() {
      this.search_name = "";
    },
    callsearch() {
      if (event.keyCode === 13) {
        if(this.isEditEntity){
          this.verify_changes()
        }else{
          this.search_entity();
        }
      }
    },
    search_entity(current_selected_entity_index) {
      if (this.search_name != "") {
        $("input:checkbox").prop("checked", false);
        this.checked_list = [];
        this.spinnerOn = true;
        axios
          .post(
            api_calls.form_automation_add_entity(),
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
                text: this.tlt('entity_search_no_result_found_msg'),
                toast: true,
                position: "top-end",
                type: "warning",
                showConfirmButton: false,
                timer: 2000,
              });
              this.load_entity();
            } else if (response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE_MODELS.MSG_CODE) 
            {
              this.entity_list = [];
              this.page_no = 1;
              if (response.data.message.MSG_CODE != this.api_status_code.TOKEN_INVALID_0001_MODELS.MSG_CODE) {
                this.total_pages = response.data.pagination.total_page
                this.entity_list = response.data.data.entities_search;
                if (this.entity_list.length > 0) {
                  this.is_search_active = true;
                  if (Boolean(current_selected_entity_index)){
                    this.show_entities(current_selected_entity_index);
                  }else{
                    this.show_entities(0);
                  }
                }
                this.setpagination(this.page_no);
              }
            }else {
              Swal({
                text: this.tlt('entity_search_internal_server_msg1'),
                toast: true,
                position: "top-end",
                type: "warning",
                showConfirmButton: false,
                timer: 2000,
              });
              this.load_entity();
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
          text: this.tlt('entity_search_data_for_search_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    },
    file_submit(){

    },
    fileinput_csv(){

    },
    download_sample_file(){
      // this.spinnerOnFileDownload = true;
    },

    empty_variable(){
      this.checked_list = [];
      document.getElementById("enter_entities_name_id").style.border = null;
      this.save_new_entities = '',
      this.entities_value_type ='synonyms',
      this.synonyms_value_list = [{
        value:'',
        synonyms:[""]
      }],
      this.pattern_list = [{
        pattern:''
      }],
      this.entity_already_exists_edit =  false;
      this.entity_already_exists =  false;
    },
    download_csv(){

    },
    train_model(){

    },
    delete_selected(){
      if (this.checked_list.length === 0) {
        Swal({
          type: "warning",
          text: this.tlt('entity_no_objective_select_msg'),
          timer: 2000,
        });
      }else if (this.checked_list.length > 0) {
        var delete_entity_list = [];
        for (var i in this.checked_list) {
          delete_entity_list.push(
            this.checked_list[i]
          );
        }
        Swal.fire({
          title: this.tlt('entity_swal_alert_msg2'),
          text: this.tlt('entity_no_revert_msg'),
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: this.tlt('entity_swal_delete_btn'),
        }).then((result) => {
          if (result.value) {
            this.big_spinner = true;
            axios
              .post(
                api_calls.form_automation_add_entity(),
                {      
                  company_name: this.companyname,
                  company_id: this.companyid,
                  email: this.$session.get("UserInformation").email,
                  license_key: this.$session.get("UserInformation").license_key,
                  token: this.$session.get("UserInformation").tokens,
                  is_delete: true,
                  entity: delete_entity_list,
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.$session.get("at")}`,
                  },
                }
              )
              .then((response) => {
                          //console.log(response)

                this.big_spinner = false;
                if (response.data.message.MSG_CODE == this.api_status_code.ENTITIES_DELETED_MODELS.MSG_CODE){
                  swal({
                    text:this.tlt('entity_objective_is_deleted_msg'),
                    type: "success",
                    timer: 3500,
                    title: this.tlt('entity_swal_success_msg'),
                    toast: true,
                    position: "top-right",
                    showConfirmButton: false,
                  });
                  $("input:checkbox").prop("checked", false);
                  if(this.checked_list.length === this.entity_list.length && 
                      this.page_no >1){
                        this.page_no = this.page_no - 1;
                  }
                  this.checked_list = [];
                  this.load_entity();
                }else if (response.data.message.MSG_CODE == this.api_status_code.USED_ENTITIES_DELETED_MODELS.MSG_CODE){
                  swal({
                    text: this.tlt('entity_modify_dialog_node_msg'),
                    type: "success",
                    timer: 7500,
                    title: this.tlt('entity_swal_info_msg'),
                    // toast: true,
                    // position: "top-right",
                    // showConfirmButton: false,
                  });
                  $("input:checkbox").prop("checked", false);
                  if(this.checked_list.length === this.entity_list.length && 
                      this.page_no >1){
                        this.page_no = this.page_no - 1;
                  }
                  this.checked_list = [];
                  this.load_entity();
                }else if (response.data.message.MSG_CODE == this.api_status_code.ENTITY_VALUES_NOT_FOUND_MODELS.MSG_CODE) {
                  Swal({
                    type: "error",
                    text:
                      this.tlt('entity_swal_internal_server_alert_msg'),
                    timer: 3500,
                  });
                }else{
                  swal({
                    text:this.tlt('entity_swal_internal_server_alert_msg'),
                    type: "error",
                    timer: 2000,
                  });
                }
              })
              .catch((e) => {
                this.big_spinner = false;
                toastr.error(this.tlt('some_error_occurred_msg', 'code'));
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
    save_entity(){
      if (this.entity_already_existss){
        Swal({
          text: this.tlt('entities_name_already_exist_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 3500,
        });
        return;
      }
      if (this.save_new_entities === "") {
        Swal({
          text: this.tlt('entities_enter_name_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 3500,
        });
        return;
      }
      if (Boolean(this.validation_needed) && !Boolean(this.validation_type)) {
        Swal({
          text: this.tlt('entities_select_validation_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 4500,
        });
        return;
      }
      if(this.entities_value_type === 'pattern'){
        for (let index = 0; index < this.pattern_list.length; index++) {
          if(this.pattern_list[index]['pattern'] === '' ||
          this.pattern_list[index]['pattern'] === null)
          {
            Swal({
              text: this.tlt('entities_pattern_cannot_be_blank_msg'),
              toast: true,
              position: "top-end",
              type: "warning",
              showConfirmButton: false,
              timer: 3500,
            });
            return;
          }
        }
      }else if(this.entities_value_type === 'synonyms'){
        for (let index = 0; index < this.synonyms_value_list.length; index++) {
          if(this.synonyms_value_list[index]['value'] === '' ||
          this.synonyms_value_list[index]['value'] === null)
          {
            Swal({
              text: this.tlt('entities_value_cannot_be_blank_msg'),
              toast: true,
              position: "top-end",
              type: "warning",
              showConfirmButton: false,
              timer: 3500,
            });
            return;
          }
          for(let j = 0; j < this.synonyms_value_list[index]['synonyms'].length; j++){
            if(this.synonyms_value_list[index]['synonyms'][j] === '' ||
          this.synonyms_value_list[index]['synonyms'][j] === null)
          {
            Swal({
              text: this.tlt('entities_synonyms_cannot_be_blank_msg'),
              toast: true,
              position: "top-end",
              type: "warning",
              showConfirmButton: false,
              timer: 3500,
            });
            return;
          }
          }
        }
      }
      this.big_spinner = true;
      axios
        .post(
          api_calls.form_automation_add_entity(),
          {      
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            is_save: true,
            entity_details:{
              "entity": "@" + this.save_new_entities,
              "type": this.entities_value_type,
              "validation_needed": this.validation_needed,
              "validation_type": this.validation_needed === true ? this.validation_type : null,
              "values": this.entities_value_type == 'pattern'?
                this.pattern_list:this.synonyms_value_list
            }
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
                    //console.log(response)

          this.big_spinner = false;
          if (response.data.message.MSG_CODE == this.api_status_code.ENTITY_DATA_SAVED_MODELS.MSG_CODE){
            swal({
              text:this.tlt('entities_value_saved_msg'),
              type: "success",
              timer: 3500,
              title: this.tlt('entities_swal_success_msg'),
              toast: true,
              position: "top-right",
              showConfirmButton: false,
            });
          $("#entitymodel").modal("hide");
          this.empty_variable();
          this.load_entity();
          }else if(response.data.message.MSG_CODE == this.api_status_code.REGEX_PATTERN_VALIDATION_MODELS.MSG_CODE){
            Swal({
              position:"top-right",
              text: this.tlt('entities_invalid_pattern_msg'),
              type: "warning",
              timer:3000,
              toast: true,
              showConfirmButton:false,
            });
          }
          else{
            swal({
              text:this.tlt('entities_internal_server_msg'),
              type: "error",
              timer: 2000,
            });
          }
        })
        .catch((e) => {
          this.big_spinner = false;
          toastr.error(this.tlt('some_error_occurred_msg', 'code'));
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    edit_entity(){
      if (this.entity_already_exists_edit){
        Swal({
          text: this.tlt('entities_edit_name_already_exist_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 3500,
        });
        return;
      }
      if (this.old_entity_name == this.current_selected_entity) {
        var entity_to_send = null;
      } else {
        var entity_to_send = this.is_at_in_entity == false ? this.old_entity_name : "@" + this.old_entity_name;

      }
      if (this.current_selected_entity === "") {
        Swal({
          text: this.tlt('entities_edit_enter_name_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 3500,
        });
        return;
      }
      if (Boolean(this.current_selected_validation_needed) && !Boolean(this.current_selected_validation_type)) {
        Swal({
          text: this.tlt('entities_edit_select_validation_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 4500,
        });
        return;
      }
      if(this.current_selected_type === 'pattern'){
        for (let index = 0; index < this.current_selected_pattern.length; index++) {
          if(this.current_selected_pattern[index]['pattern'] === '' ||
          this.current_selected_pattern[index]['pattern'] === null)
          {
            Swal({
              text: this.tlt('entities_edit_pattern_cannot_be_blank_msg'),
              toast: true,
              position: "top-end",
              type: "warning",
              showConfirmButton: false,
              timer: 3500,
            });
            return;
          }
        }
      }else if(this.current_selected_type === 'synonyms'){
        for (let index = 0; index < this.current_selected_values.length; index++) {
          if(this.current_selected_values[index]['value'] === '' ||
          this.current_selected_values[index]['value'] === null)
          {
            Swal({
              text: this.tlt('entities_edit_value_cannot_be_blank_msg'),
              toast: true,
              position: "top-end",
              type: "warning",
              showConfirmButton: false,
              timer: 3500,
            });
            return;
          }
          for(let j = 0; j < this.current_selected_values[index]['synonyms'].length; j++){
            if(this.current_selected_values[index]['synonyms'][j] === '' ||
          this.current_selected_values[index]['synonyms'][j] === null)
          {
            Swal({
              text: this.tlt('entities_edit_synonyms_cannot_be_blank_msg'),
              toast: true,
              position: "top-end",
              type: "warning",
              showConfirmButton: false,
              timer: 3500,
            });
            return;
          }
          }
        }
      }
      this.big_spinner = true;
      axios
        .post(
          api_calls.form_automation_add_entity(),
          {      
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            is_edit: true,
            old_entity_name: entity_to_send,
            entity: this.is_at_in_entity == false ? this.current_selected_entity : "@" + this.current_selected_entity,
            edit_entity_detail:{
              "type":this.current_selected_type,
              "id":this.current_selected_id,
              "validation_needed": this.current_selected_validation_needed,
              "validation_type": this.current_selected_validation_needed === true ? this.current_selected_validation_type : null,
              "values":this.current_selected_type == 'pattern'?
                this.current_selected_pattern:this.current_selected_values
              },
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
                    //console.log(response)

          this.big_spinner = false;
          if (response.data.message.MSG_CODE == this.api_status_code.USED_ENTITIES_EDITED_MODELS.MSG_CODE){
            swal({
              text: this.tlt('entities_swal_edited_msg'),
              type: "success",
              timer: 3500,
              title: this.tlt('entities_edit_swal_success_msg1'),
              toast: true,
              position: "top-right",
              showConfirmButton: false,
            });
            // this.empty_variable();
            if(this.is_search_active === true){
              this.search_entity(this.current_selected_entity_index);
            }else{
              this.load_entity(this.current_selected_entity_index);
            }
          }else if (response.data.message.MSG_CODE == this.api_status_code.ENTITIES_EDITED_MODELS.MSG_CODE){
            swal({
              text: this.tlt('entities_edit_modify_in_dialog_node_msg'),
              type: "success",
              timer: 7500,
              title: this.tlt('entities_edit_swal_success_msg2'),
              // toast: true,
              // position: "top-right",
              // showConfirmButton: false,
            });
            // this.empty_variable();
            if(this.is_search_active === true){
                this.search_entity(this.current_selected_entity_index);
              }else{
              this.load_entity(this.current_selected_entity_index);
              }
          }else{
            swal({
              text: this.tlt('entities_edit_internal_server_msg1'),
              type: "error",
              timer: 2000,
            });
          }
        })
        .catch((e) => {
          this.big_spinner = false;
          toastr.error(this.tlt('some_error_occurred_msg', 'code'));
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    search_entities_name(){
      axios
        .post(
          api_calls.form_automation_add_entity(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            subscription: this.$session.get("UserInformation").subscription,
            is_search_entity: true,
            entity: "@" + this.save_new_entities,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
                    //console.log(response)

          if (response.data.message.MSG_CODE == this.api_status_code.NOT_EXISTS_MODELS.MSG_CODE) {
            this.entity_already_exists = false;
            document.getElementById("enter_entities_name_id").style.border =null;
            if(this.save_new_entities != ""){
              document.getElementById("enter_entities_name_id").style.border =
              "1px solid #00f000";
            }
          } else if (response.data.message.MSG_CODE == this.api_status_code.ALREADY_EXISTS_MODELS.MSG_CODE) {
            this.entity_already_exists = true;
            document.getElementById("enter_entities_name_id").style.border =
            "1px solid red";
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
    enter_entity_edit(){
      axios
        .post(
          api_calls.form_automation_add_entity(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            subscription: this.$session.get("UserInformation").subscription,
            is_search_entity: true,
            entity: this.is_at_in_entity == false ? this.current_selected_entity : "@" + this.current_selected_entity,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
                    //console.log(response)

          if (response.data.message.MSG_CODE == this.api_status_code.NOT_EXISTS_MODELS.MSG_CODE) {
            this.entity_already_exists_edit = false;
            document.getElementById("enter_entity_edit_id").style.border =null;
            if(this.current_selected_entity != ""){
              document.getElementById("enter_entity_edit_id").style.border =
              "1px solid #00f000";
            }
          } else if (response.data.message.MSG_CODE == this.api_status_code.ALREADY_EXISTS_MODELS.MSG_CODE) {
            if (this.old_entity_name == this.current_selected_entity){
              this.entity_already_exists_edit = false;
              document.getElementById("enter_entity_edit_id").style.border =null;  
            } else {
              this.entity_already_exists_edit = true;
              document.getElementById("enter_entity_edit_id").style.border =
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
    edit_entity_details(){
      if (!this.isEditEntity) {
        this.isEditEntity = true;
      } else {
        this.isEditEntity = false;
        this.load_entity();
      }
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
              api_calls.form_automation_add_entity(),
              {
                company_name: this.companyname,
                company_id: this.companyid,
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                subscription: this.$session.get("UserInformation").subscription,
                is_get_entity: true,
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
              if(response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE_MODELS.MSG_CODE){
                this.total_pages = response.data.pagination.total_page
                this.entity_list = response.data.data.entity_names;
                if (this.entity_list.length > 0) {
                  this.show_entities(0);
                }
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
              api_calls.form_automation_add_entity(),
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
                        //console.log(response)

              this.spinnerOn = false;
              this.entity_list = [];
              if (response.data.data.entities_search.length) {
                if (response.data.message.MSG_CODE != this.api_status_code.TOKEN_INVALID_0001_MODELS.MSG_CODE) {
              
                  this.total_pages = response.data.pagination.total_page
                  this.entity_list = response.data.data.entities_search;
                  this.setpagination(this.page_no);
                }
              } else if (response.data.message.MSG_CODE == this.api_status_code.EMPTY_DATA_MODELS.MSG_CODE) {
                Swal({
                  type: "warning",
                  text: this.tlt('entities_no_result_found_msg'),
                  timer: 2000,
                });
              } else if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR_MODELS.MSG_CODE) {
                Swal({
                  type: "error",
                  text: this.tlt('entities_internal_server_msg1'),
                  timer: 2000,
                });
                this.load_entity();
              } else {
                Swal({
                  type: "error",
                  text: this.tlt('entities_internal_server_msg2'),
                  timer: 2000,
                });
                this.load_entity();
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
    pagination_class(index) {
      if (index == this.page_no) {
        return " active";
      } else {
        return "";
      }
    },
    entity_name_check_special_characters(e){
      if (/^[^a-zA-Z0-9_ ]*$/.test(e.key)) {
        e.preventDefault();
      }
    },
    add_to_pattern_list(type, index){
      if (type == "add") {
        this.pattern_list.unshift({pattern:''});
      } else if (type == "remove") {
        this.pattern_list.splice(index, 1);
      }
    },
    add_to_pattern_list_edit(type, index){
      if (type == "add") {
        this.current_selected_pattern.unshift({pattern:''});
      } else if (type == "remove") {
        this.current_selected_pattern.splice(index, 1);
      }
    },
    add_to_values_list(type, index){
      if (type == "add") {
        this.synonyms_value_list.unshift({value:'', synonyms: [""]});
      } else if (type == "remove") {
        this.synonyms_value_list.splice(index, 1);
      }
    },
    add_to_values_list_edit(type, index){
      if (type == "add") {
        this.current_selected_values.unshift({value:'', synonyms: [""]});
      } else if (type == "remove") {
        this.current_selected_values.splice(index, 1);
      }
    },
    add_to_synonyms_list(type, index, index1){
      if (type == "add") {
        this.synonyms_value_list[index]['synonyms'].unshift("");
      } else if (type == "remove") {
        this.synonyms_value_list[index]['synonyms'].splice(index1, 1);
      }
    },
    add_to_synonyms_list_edit(type, index, index1){
      if (type == "add") {
        this.current_selected_values[index]['synonyms'].unshift("");
      } else if (type == "remove") {
        this.current_selected_values[index]['synonyms'].splice(index1, 1);
      }
    },
    selected_entities(entity_name) {
      if (entity_name == "all") {
        if (event.target.checked) {
          var temp = []
          temp = this.entity_list.filter((entity)=>{
            return entity.type !='system'
          }).map((item)=>{
            return item.entity
          });
          this.checked_list = temp;
          $("input:checkbox").prop("checked", false);
          for(let i = 0; i < this.checked_list.length; i++){
            $("#entity_checkbox_"+[i]).prop("checked", true);
            $("#selectall").prop("checked", true);
          }
        } else if (!event.target.checked) {
          this.checked_list = [];
        }
      } else {
        if (event.target.checked == true) {
          let val_index = this.checked_list.filter((entites) => {
            return entites.entity_name == entity_name;
          });
          if (val_index.length == 0) {
            this.checked_list.push(entity_name);
          }
        } else if (event.target.checked == false) {
          var selectall = document.querySelector("#selectall");
          if (selectall.checked == true) {
            selectall.checked = false;
          }
          let temp = this.checked_list.filter((entites) => {
            return entites != entity_name;
          });
          this.checked_list = temp;
        }
      }
    },
  }
}
</script>

<style>

</style>
<style scoped>
.modal-lg {
  max-width: 800px !important;
}
.heading {
  color: #414141 !important;
}
.sub_heading {
  font-size: 16px !important;
  font-weight: 500 !important;
}
.ScrollStyle {
  min-height: 0px;
  max-height: 510px;
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
.input-box { 
position: relative !important; 
}
.unit { 
  position: absolute !important; 
  display: block !important; 
  left: 5px !important; 
  top: 8px !important; 
  z-index: 9 !important;
  color: #9499AE !important; 
}
.current-active-entity {
  background: rgba(0, 0, 0, 0.1);
}
#add_pattern_button_id:hover {
  background: #273679;
}
#add_values_button_id:hover{
  background: #273679;
}
#add_synonyms_button_id:hover{
  background: #273679;
}
.edit {
  line-height: 16px;
  padding: 10px 15px;
}
hr {
  margin-top: 0;
}
.custom-button-box {
  border: 0.5px solid #ccc;
}
.table-box tbody tr:hover td,
.table-box tbody tr:hover th {
  background: #ececec;
}
</style>