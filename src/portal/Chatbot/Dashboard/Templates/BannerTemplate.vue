<template>
  <div class="dash-cont">
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <div class="container-fluid">
      <div class="card dash-card" style="border: 0">
        <div class="card dash-card">
          <div
            class="
              card-header
              d-block d-sm-flex
              flex-wrap
              justify-content-between
            "
          >
            <div class="card-act col-sm-4 p-0 d-flex flex-wrap">
              <input
                class="form-control"
                id="search_bar_id"
                :placeholder="tlt('search_here')"
                style="padding: 0px 15px; height: 36px !important;"
                v-model="search_name"
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
            </div>
            <div class="card-act ml-auto d-flex flex-wrap">
              <button
                id="add_template_btn1"
                href="#"
                class="darkblue-btn"
                v-if="disable_btn_expired"
                title="Add new Banner"
                @click="show_subscription_expired_swal"
              >
                {{tlt('template_banner_add_banner_btn_expire')}}
              </button>
              <a
              v-else
                id="add_template_btn"
                href="#"
                class="darkblue-btn"
                data-target="#bannermodel"
                title="Add new Banner"
              >
                {{tlt('template_banner_add_banner_btn')}}
              </a>
              <a
                href="javascript:void(0)"
                class="red-btn"
                @click="isEditBanner ? verify_changes() : delete_selected()"
                id="delete_intent"
              >
                {{tlt('template_banner_del_btn')}}
              </a>
            </div>
          </div>
          <div class="card-body py-0" id="page">
            <div
              class="col-sm-12 d-flex px-0"
              v-if="banner_template_list.length > 0"
            >
              <div class="col-sm-4 pl-0" style="height: 80vh; overflow-y: auto">
                <div class="table-box">
                  <div class="table-responsive">
                    <table class="table" style="overflow-y: auto">
                      <thead>
                        <th scope="col">
                          <div class="form-check checkbox checkbox-success">
                            <label class="form-check-label">
                              <input
                                class="form-check-input"
                                id="selectall"
                                type="checkbox"
                                @change="selected_banner('all')"
                              />
                              <span class="icn"></span>
                            </label>
                          </div>
                        </th>
                        <th
                          scope="col"
                          class="text-left"
                          style="
                            font: normal normal normal 16px/22px Roboto;
                            letter-spacing: 0px;
                            color: #414141;
                          "
                        >
                          {{tlt('banners_template_header')}}
                        </th>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(banner, index) in banner_template_list"
                          :key="index"
                          :class="check_current_banner_active(index)"
                        >
                          <td scope="col">
                            <div class="form-check checkbox checkbox-success">
                              <label class="form-check-label">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  :id="index"
                                  @change="selected_banner(banner.banner_id)"
                                />
                                <span class="icn"></span>
                              </label>
                            </div>
                          </td>
                          <td
                            style="cursor: pointer"
                            @click="isEditBanner ? verify_changes() : show_banner(index)"
                            :title="banner.banner_name"
                          >
                            <div class="d-flex">
                              <p style="margin-bottom: 0">
                                {{ banner.banner_name }} 
                              </p>
                              <i 
                                v-if="check_enable(index)"
                                class="fas fa-check-circle my-auto ml-auto"
                                style="color:navy !important;"
                                title="Enabled"
                              >
                              </i>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div
                class="col-sm-8 pr-0"
                style="overflow-y: auto"
                v-if="banner_template_list.length > 0"
              >
                <div style="border: 1px solid #dbe2e8">
                  <div class="col-sm-12">
                    <div style="color: #414141; margin-top: 9px !important; margin-bottom: 9px !important;">
                      <h5 class="mb-0 pt-0" style="display:contents !important">
                        <span class="my-2">{{tlt('template_banner_details_header')}}</span>
                      </h5>
                      <div style="float: right !important; margin-top: 2px !important;">
                        <label class="switch" style="margin-right:10px !important;">
                          <input
                            type="checkbox"
                            v-model="current_banner.is_display_banner"
                            @click="is_display_banner_save"
                            id="current_selected_is_display_banner_id"
                          />
                          <span
                            class="slider round"
                            style="border-radius: 50px; width: inherit;"
                          ></span>
                        </label>
                        <a
                          class="ml-auto mt-2 mb-0"
                          href="#preview_bot_visible"
                          title="Click Here for Preview"
                          style="color: rgb(39, 54, 121); font-size: 1.25rem;margin-right: 10px !important;"
                          data-toggle="modal"
                        >
                          {{tlt('template_banner_preview_btn')}}
                        </a>
                        <span
                          @click="edit_banner_details"
                          v-html="pencil_svg"
                          class="ml-auto mr-2 mt-2"
                          style="cursor: pointer"
                        >
                        </span>
                      </div>
                    </div>
                  </div>
                  <hr style="margin-top: 0" />
                  <div class="col-sm-12" style="margin-bottom: 1rem">
                    <h5 class="heading">{{tlt('template_banner_name_label')}}</h5>
                    <div v-if="!isEditBanner" style="padding-left: 20px">
                      <p>{{ current_banner.banner_name }}</p>
                    </div>
                    <div v-else>
                      <input
                        id="edit_banner_name_id"
                        type="text"
                        v-model.trim="current_banner.banner_name"
                        v-on:keyup="validate_edit_banner_name"
                        class="form-control"
                        style="padding: 0.375rem 0.75rem"
                        :placeholder="tlt('template_name_label')"
                      />
                      <span
                        v-show="edit_banner_name_already_exist"
                        style="color: red; display: initial !important"
                        >{{tlt('template_banner_name_condition_check')}}</span
                      >
                    </div>
                  </div>
                  <div class="col-sm-12" style="margin-bottom: 1rem">
                    <h5 class="heading">{{tlt('template_banner_description_label')}}</h5>
                    <div v-if="!isEditBanner" style="padding-left: 20px">
                      <span
                        v-html="current_banner.banner_description"
                      ></span>
                    </div>
                    <div v-else>
                      <vue-editor
                        v-model.trim="current_banner.banner_description"
                        :editorToolbar="customToolbar"
                      ></vue-editor>
                      <!-- :customModules="customModulesForEditor"
                      :editorOptions="editorSettings" -->
                    </div>
                  </div>
                  <div
                    v-if="!isEditBanner"
                    class="col-sm-12"
                    style="margin-bottom: 1rem"
                  >
                    <h5 class="heading">
                      {{tlt('template_image_name_label')}}
                    </h5>
                    <div style="padding-left: 20px">
                      <p>{{ current_banner.banner_img_name }}</p>
                    </div>
                    <h5 class="heading">
                      {{tlt('template_banner_redirect_url_label')}}
                    </h5>
                    <div style="padding-left: 20px">
                      <p>{{ current_banner.banner_img_link }}</p>
                    </div>
                  </div>
                  <div
                    v-else-if="isEditBanner"
                    class="col-sm-12"
                    style="margin-bottom: 1rem"
                  >
                    <h5 class="heading">
                      {{tlt('template_on_edit_add_img_label')}}
                    </h5>
                    <label class="form-text text-muted">{{tlt('template_on_edit_add_img_help_text')}}</label>
                    <div class="custom-file" style="margin-bottom: 1rem">
                      <input
                        type="file"
                        class="custom-file-input"
                        @change="fileinput2"
                        id="inputFile2"
                      />
                      <label
                        style="
                          font-weight: 400;
                          line-height: 10px;
                          padding-left: 15px;
                        "
                        class="custom-file-label form-control"
                        for="file"
                        >{{ edited_file_label }}</label
                      >
                    </div>
                    <div>
                      <h5 class="heading">{{tlt('template_on_edit_redirect_url_label')}}</h5>
                      <label class="form-text text-muted">
                        {{tlt('template_on_edit_redirect_url_help_text')}}
                      </label>
                      <input
                        type="text"
                        v-model.trim="current_banner.banner_img_link"
                        class="form-control"
                        style="padding: 0.375rem 0.75rem"
                        :placeholder="tlt('url_example')"
                      />
                      <span
                        v-show="!validURL_edit && this.current_banner.banner_img_link !=''"
                        style="color: red; display: initial !important"
                        >{{tlt('template_banner_img_condition_check')}}</span
                      >
                    </div>
                  </div>
                  <div
                    class="col-sm-12"
                    v-if="!isEditBanner"
                    style="margin-bottom: 1rem"
                  >
                    <h5 class="heading">
                      {{tlt('template_banner_video_label')}}
                    </h5>
                    <div style="padding-left: 20px">
                      <p>{{ current_banner.banner_video_url }}</p>
                    </div>
                  </div>
                  <div
                    v-else-if="isEditBanner"
                    class="col-sm-12"
                    style="margin-bottom: 1rem"
                  >
                    <h5 class="heading"> 
                      {{tlt('template_on_edit_add_video_label')}}
                    </h5>
                    <label class="pr-3 form-text text-muted">{{tlt('template_on_edit_add_video_help_text')}}</label>
                    <div>
                      <input
                        type="text"
                        v-model.trim="current_banner.banner_video_url"
                        class="form-control"
                        style="padding: 0.375rem 0.75rem"
                        :placeholder="tlt('url_example')"
                      />
                      <span
                        v-show="!validVideoURL_edit && current_banner.banner_video_url !=''"
                        style="color: red; display: initial !important"
                        >{{tlt('template_banner_video_condition_check')}}</span
                      >
                    </div>
                  </div>
                  <div
                    class="col-sm-12"
                    style="margin-bottom: 1rem"
                    v-if="!isEditBanner"
                  >
                    <h5 class="heading">
                      {{tlt('template_banner_date_location_label')}}
                    </h5>
                    <div style="padding-left: 20px">
                      <template>
                        <div
                          class="ScrollStyle"
                          style="padding-right: 8px !important"
                        >
                          <div
                            v-for="(
                              date_location, index
                            ) in current_banner.banner_date_location_list"
                            :key="index"
                          >
                            <li class="sub_heading">{{tlt('banner_edit_date_label')}}:</li>
                            <template>
                              <ol>
                                <div
                                  v-for="(
                                    new_date_time, index1
                                  ) in current_banner.banner_date_location_list[
                                    index
                                  ]['date_time_list']"
                                  :key="index1"
                                >
                                  <li
                                    style="
                                      padding-left: 0rem;
                                      list-style-position: inside;
                                    "
                                  >
                                    {{tlt('banner_edit_start_date_label')}}:
                                    {{
                                      current_banner.banner_date_location_list[
                                        index
                                      ]["date_time_list"][index1].date[0]
                                    }}
                                    - {{tlt('banner_edit_end_date_label')}}:
                                    {{
                                      current_banner.banner_date_location_list[
                                        index
                                      ]["date_time_list"][index1].date[1]
                                    }}
                                  </li>
                                </div>
                              </ol>
                            </template>
                            <li class="sub_heading">{{tlt('banner_edit_location_label')}}:</li>
                            <template>
                              <ol>
                                <div
                                  v-for="(
                                    new_location, index1
                                  ) in current_banner.banner_date_location_list[
                                    index
                                  ]['location_list']"
                                  :key="index1"
                                >
                                  <li
                                    style="
                                      padding-left: 0rem;
                                      list-style-position: inside;
                                    "
                                  >
                                    {{ new_location.location }}
                                  </li>
                                </div>
                              </ol>
                            </template>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                  <div
                    class="col-sm-12"
                    style="margin-bottom: 1rem"
                    v-else-if="isEditBanner"
                  >
                    <div class="form-group">
                      <div
                        class="card-act"
                        style="padding-right: 0px !important"
                      >
                        <button
                          id="add_to_banner_date_time_location_list_id"
                          class="darkblue-btn mr-0"
                          style="padding: 5px 10px; float: right"
                          @click="add_to_current_banner_date_location_list('add')"
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
                        <h5 class="heading">
                          {{tlt('template_on_edit_date_location_label')}}
                        </h5>
                        <label class="pr-3 form-text text-muted">{{tlt('template_on_edit_date_location_help_text')}}</label>
                      </div>
                      <template>
                        <div
                          class="mt-3 p-0"
                          style="display: block; margin-bottom: 1rem"
                        >
                          <div
                            class="custom-button-box pl-3 pt-3 pr-1 mt-0 mb-3"
                            v-for="(
                              date_location, index
                            ) in current_banner.banner_date_location_list"
                            :key="index"
                          >
                            <label class="mt-0 sub_heading"
                              >{{tlt('template_banner_date_location_label')}}:</label
                            >
                            <i
                              style="
                                cursor: pointer;
                                font-size: 16px;
                                float: right;
                              "
                              class="fa ml-auto mr-1"
                              title="Remove"
                              @click="
                                add_to_current_banner_date_location_list(
                                  'remove',
                                  index
                                )
                              "
                            >
                              &#xf1f8;
                            </i>
                            <div>
                              <div class="mt-2 mb-2 card-act">
                                <label style="">{{tlt('template_banner_date_label')}}:</label>
                                <a
                                  class="darkblue-btn mr-1"
                                  style="padding: 5px 10px; float: right"
                                  @click="
                                    add_to_current_banner_date_time_list(
                                      'add',
                                      index
                                    )
                                  "
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
                              <div class="col-sm-12 form-group">
                                <div class="row">
                                  <div
                                    v-for="(
                                      new_date_time, index1
                                    ) in current_banner
                                      .banner_date_location_list[index][
                                      'date_time_list'
                                    ]"
                                    :key="index1"
                                    class="col-sm-6 pb-3"
                                  >
                                    <div class="card">
                                      <div
                                        class="card-body"
                                        style="
                                          padding: 20px 20px !important;
                                          min-height: min-content !important;
                                        "
                                      >
                                        <div class="d-flex">
                                          <section style="overflow: auto !important;">
                                            <date-picker
                                              id="edit_date_picker_id"
                                              v-model="
                                                current_banner
                                                  .banner_date_location_list[
                                                  index
                                                ]['date_time_list'][index1].date
                                              "
                                              type="datetime"
                                              value-type="format"
                                              format="YYYY-MM-DD HH:mm:ss"
                                              :placeholder="tlt('select_date_time')"
                                              range
                                              :show-time-panel="
                                                showTimeRangePanel
                                              "
                                              @close="handleRangeClose"
                                            >
                                              <template v-slot:footer>
                                                <button
                                                  class="mx-btn mx-btn-text"
                                                  @click="toggleTimeRangePanel"
                                                >
                                                  {{
                                                    showTimeRangePanel
                                                      ? "select date"
                                                      : "select time"
                                                  }}
                                                </button>
                                              </template>
                                            </date-picker>
                                          </section>
                                          <span
                                            style="cursor: pointer"
                                            class="my-auto ml-5 mr-0"
                                            title="Remove Date"
                                            @click="
                                              add_to_current_banner_date_time_list(
                                                'remove',
                                                index,
                                                index1
                                              )
                                            "
                                          >
                                            <img src="/img/close.png" alt="" />
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="mt-2 mb-2 card-act">
                                <label style="">{{tlt('template_banner_location_label')}}:</label>
                                <a
                                  class="darkblue-btn mr-1"
                                  style="padding: 5px 10px; float: right"
                                  @click="
                                    add_to_current_banner_location_list(
                                      'add',
                                      index
                                    )
                                  "
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
                              <div class="col-sm-12 form-group">
                                <div class="row">
                                  <div
                                    v-for="(
                                      new_location, index1
                                    ) in current_banner
                                      .banner_date_location_list[index][
                                      'location_list'
                                    ]"
                                    :key="index1"
                                    class="col-sm-6 pb-3"
                                  >
                                    <div class="card">
                                      <div
                                        class="card-body"
                                        style="
                                          padding: 20px 20px !important;
                                          min-height: min-content !important;
                                        "
                                      >
                                        <div class="d-flex">
                                          <input
                                            type="text"
                                            :placeholder="tlt('enter_location')"
                                            class="form-control"
                                            style="
                                              line-height: 16px;
                                              padding: 10px 15px;
                                            "
                                            v-model="
                                              current_banner
                                                .banner_date_location_list[
                                                index
                                              ]['location_list'][index1]
                                                .location
                                            "
                                            v-bind:id="index + '__' + index1"
                                            @focusout="byfocus_out_google_autocomplete_to_edit_location"
                                            @focusin="
                                              byfocus_in_google_autocomplete_to_edit_location(
                                                index + '__' + index1,
                                                index,
                                                index1
                                              )
                                            "
                                          />
                                          <span
                                            style="cursor: pointer"
                                            class="my-auto ml-5 mr-0"
                                            title="Remove Location"
                                            @click="
                                              add_to_current_banner_location_list(
                                                'remove',
                                                index,
                                                index1
                                              )
                                            "
                                          >
                                            <img src="/img/close.png" alt="" />
                                          </span>
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
                    </div>
                  </div>
                  <div
                    v-if="!isEditBanner"
                    class="col-sm-12"
                    style="margin-bottom: 1rem"
                  >
                    <h5 class="heading">
                      {{tlt('template_banner_content_position_label')}}
                    </h5>
                    <div
                      style="padding-left: 20px"
                    >
                      <template>
                        <ol style="padding-left: 15px;">
                          <div  
                            v-for="(position, index) in current_banner.banner_content_position"
                            :key="index"
                          >
                            <li>
                              {{position.name}}
                            </li>
                          </div>
                        </ol>
                      </template>
                    </div>
                  </div>
                  <div 
                    v-else-if="isEditBanner"
                    class="col-sm-12"
                    style="margin-bottom: 1rem"
                  >
                    <h5 class="heading">{{tlt('template_on_edit_content_position_label')}}</h5>
                    <label class="pr-3 form-text text-muted">{{tlt('template_on_edit_content_position_help_text')}}</label>
                    <div
                      class="custom-button-box px-3 pb-0 pt-2 mt-3 mb-3"
                    >
                      <div class="d-flex mb-1" style="text-align: center">
                        <div class="col-sm-4">{{tlt('template_on_edit_index_no_label')}}.</div>
                        <div class="col-sm-4">{{tlt('template_on_edit_name_label')}}</div>
                        <div class="col-sm-4">{{tlt('template_on_edit_action_label')}}</div>
                      </div>
                      <hr style="margin: 10px 0px" />
                      <div class="d-flex col-sm-12 p-0 mb-0">
                        <div class="col-sm-4">
                          <div
                            style="text-align:center !important;"
                            class="mb-4"
                            v-for="(position, index) in current_banner.banner_content_position"
                            :key="index"
                          >
                            {{index}}
                          </div>
                        </div>
                        <div class="col-sm-8">
                          <draggable
                            group="people"
                            v-model="current_banner.banner_content_position"
                            @start="drag_banner_content = true"
                            @end="drag_banner_content = false"
                            v-bind="dragOptionsBanner"
                            handle=".handle"
                          >
                            <transition-group
                              type="transition"
                              :name="!drag_banner_content ? 'flip-list' : null"
                            >
                              <div
                                class="d-flex col-sm-12 p-0 mb-4"
                                v-for="position in current_banner.banner_content_position"
                                :key="position.id"
                              >
                                <div class="col-sm-6 text-center">
                                  {{position.name}}
                                </div>
                                <div class="col-sm-6 text-center">
                                  <i
                                    class="fas fa-arrows-alt handle"
                                    style="cursor: pointer;"
                                    title="Drag to Change Order"
                                  ></i>
                                </div>
                              </div>
                            </transition-group>
                          </draggable>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer" v-if="isEditBanner">
                    <div class="dash-modal">
                      <div class="btn-wrap text-right mt-0 py-0 border-top-0">
                        <button
                          type="button"
                          class="btn btn-link"
                          style="border-radius: 0"
                          data-dismiss="modal"
                          @click="edit_banner_details"
                        >
                          {{tlt('banner_edit_cancel_btn')}}
                        </button>
                        <button
                          type="submit"
                          class="darkblue-btn"
                          id="res_n_int_save"
                          @click="edit_banner()"
                        >
                          {{tlt('banner_edit_save_btn')}}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-12 d-flex px-0 py-5" v-else-if="!spinnerOn">
              <h4 class="mx-auto">
                {{tlt('template_banner_no_banner_added_text')}}
              </h4>
            </div>
            <div
              class="pagin-table"
              style="margin-top: 2%"
              v-show="banner_template_list.length > 0"
            >
              <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                  <li class="page-item">
                    <a
                      class="page-link"
                      href="#"
                      @click="
                        isEditBanner
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
                        isEditBanner ? verify_changes() : page_require(pageno)
                      "
                      >...</a
                    >
                    <a
                      v-if="pageno != '...s' && pageno != '...l'"
                      class="page-link"
                      href="#"
                      @click="
                        isEditBanner ? verify_changes() : page_require(pageno)
                      "
                      >{{ pageno }}</a
                    >
                  </li>
                  <li class="page-item">
                    <a
                      class="page-link"
                      href="#"
                      @click="
                        isEditBanner
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
    </div>
    <div
      id="bannermodel"
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
              <h3>{{tlt('template_model_banner_header')}}</h3>
              <button type="button" class="close" data-dismiss="modal">
                <img src="/img/close-icn.png" alt />
              </button>
            </div>
            <div class="form-group">
              <h5 class="heading">{{tlt('template_model_banner_name_label')}}</h5>
              <input
                id="banner_name_id"
                type="text"
                required
                v-on:keyup="validate_banner_name"
                v-model.trim="banner_name"
                class="form-control"
                :placeholder="tlt('banner_name')"
              />
              <span v-show="banner_name_already_exist" style="color: red"
                >{{tlt('template_model_name_condition_check')}}</span
              >
            </div>
            <div class="form-group">
              <h5 class="heading">{{tlt('template_model_description_label')}}</h5>
              <vue-editor
                v-model.trim="banner_description"
                :editorToolbar="customToolbar"
              ></vue-editor>
              <!-- :customModules="customModulesForEditor"
                :editorOptions="editorSettings" -->
            </div>
            <div class="form-group">
              <h5 class="heading">{{tlt('template_model_add_img_label')}}</h5>
              <label class="form-text text-muted">{{tlt('template_model_add_img_text')}}</label>
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  @change="fileinput1"
                  id="inputFile"
                />
                <label
                  style="
                    font-weight: 400;
                    line-height: 20px;
                    padding-left: 15px;
                  "
                  class="custom-file-label form-control"
                  for="file"
                  >{{ file_label }}</label
                >
              </div>
            </div>
            <div class="form-group">
              <h5 class="heading">{{tlt('template_model_img_redirect_url')}}</h5>
              <label class="form-text text-muted">
                {{tlt('template_model_img_redirect_url_text')}}
              </label>
              <input
                type="text"
                v-model.trim="banner_img_link"
                class="form-control"
                :placeholder="tlt('url_example')"
              />
              <span
                v-show="validURL == false && banner_img_link != ''"
                style="color: red; display: initial !important"
                >{{tlt('template_model_img_condition_check')}}</span
              >
            </div>
            <div class="form-group">
              <h5 class="heading">{{tlt('template_model_add_video_label')}}</h5>
              <label class="pr-3 form-text text-muted">{{tlt('template_model_add_video_help_text')}}</label>
              <input
                type="text"
                v-model.trim="banner_video_url"
                class="form-control"
                :placeholder="tlt('url_example')"
              />
              <span
                v-show="!validVideoURL && banner_video_url !=''"
                style="color: red; display: initial !important"
                >{{tlt('template_model_video_condition_check')}}</span
              >
            </div>
            <div class="form-group">
              <div class="card-act" style="padding-right: 0px !important">
                <button
                  id="add_to_banner_date_time_location_list_id"
                  class="darkblue-btn mr-0"
                  style="padding: 5px 10px; float: right"
                  @click="add_to_banner_date_location_list('add')"
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
                <h5 class="heading">{{tlt('template_model_add_date_location_label')}}</h5>
                <label class="pr-5 form-text text-muted">{{tlt('template_model_add_date_location_text')}}</label>
              </div>
              <template>
                <div
                  class="mt-3 p-0"
                  style="display: block; margin-bottom: 1rem"
                >
                  <div
                    class="custom-button-box pl-3 pt-3 pr-1 mt-0 mb-3"
                    v-for="(date_location, index) in banner_date_location_list"
                    :key="index"
                  >
                    <label class="mt-0 sub_heading">Date and Location:</label>
                    <i
                      style="cursor: pointer; font-size: 16px; float: right"
                      class="fa ml-auto mr-1"
                      title="Remove"
                      @click="add_to_banner_date_location_list('remove', index)"
                    >
                      &#xf1f8;
                    </i>
                    <div>
                      <div class="mt-2 mb-2 card-act">
                        <label style="">Date:</label>
                        <a
                          class="darkblue-btn mr-1"
                          style="padding: 5px 10px; float: right"
                          @click="add_to_date_time_list('add', index)"
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
                      <div class="col-sm-12 form-group">
                        <div class="row">
                          <div
                            v-for="(
                              new_date_time, index1
                            ) in banner_date_location_list[index][
                              'date_time_list'
                            ]"
                            :key="index1"
                            class="col-sm-6 pb-3"
                          >
                            <div class="card">
                              <div
                                class="card-body"
                                style="
                                  padding: 20px 20px !important;
                                  min-height: min-content !important;
                                "
                              >
                                <div class="d-flex">
                                  <section style="overflow: auto !important;">
                                    <date-picker
                                      id="add_date_picker_id"
                                      v-model="
                                        banner_date_location_list[index][
                                          'date_time_list'
                                        ][index1].date
                                      "
                                      type="datetime"
                                      value-type="format"
                                      format="YYYY-MM-DD HH:mm:ss"
                                      :placeholder="tlt('select_date_time')"
                                      range
                                      :show-time-panel="showTimeRangePanel"
                                      @close="handleRangeClose"
                                    >
                                      <template v-slot:footer>
                                        <button
                                          class="mx-btn mx-btn-text"
                                          @click="toggleTimeRangePanel"
                                        >
                                          {{
                                            showTimeRangePanel
                                              ? "select date"
                                              : "select time"
                                          }}
                                        </button>
                                      </template>
                                    </date-picker>
                                  </section>
                                  <span
                                    style="cursor: pointer"
                                    class="my-auto ml-2 mr-0"
                                    title="Remove Date"
                                    @click="
                                      add_to_date_time_list(
                                        'remove',
                                        index,
                                        index1
                                      )
                                    "
                                  >
                                    <img src="/img/close.png" alt="" />
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="mt-2 mb-2 card-act">
                        <label style="">Location:</label>
                        <a
                          class="darkblue-btn mr-1"
                          style="padding: 5px 10px; float: right"
                          @click="add_to_location_list('add', index)"
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
                      <div class="col-sm-12 form-group">
                        <div class="row">
                          <div
                            v-for="(
                              new_location, index1
                            ) in banner_date_location_list[index][
                              'location_list'
                            ]"
                            :key="index1"
                            class="col-sm-6 pb-3"
                          >
                            <div class="card">
                              <div
                                class="card-body"
                                style="
                                  padding: 20px 20px !important;
                                  min-height: min-content !important;
                                "
                              >
                                <div class="d-flex">
                                  <input
                                    type="text"
                                    :placeholder="tlt('enter_location')"
                                    class="form-control"
                                    v-model="
                                      banner_date_location_list[index][
                                        'location_list'
                                      ][index1].location
                                    "
                                    v-bind:id="index + '_' + index1"
                                    @focusout="byfocus_out_google_autocomplete_to_add_location"
                                    @focusin="
                                      byfocus_in_google_autocomplete_to_add_location(
                                        index + '_' + index1,
                                        index,
                                        index1
                                      )
                                    "
                                  />
                                  <span
                                    style="cursor: pointer"
                                    title="Remove Location"
                                    class="my-auto ml-2 mr-0"
                                    @click="
                                      add_to_location_list(
                                        'remove',
                                        index,
                                        index1
                                      )
                                    "
                                  >
                                    <img src="/img/close.png" alt="" />
                                  </span>
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
            </div>
            <div class="form-group">
              <h5 class="heading">{{tlt('template_model_content_position_label')}}</h5>
              <label class="pr-3 form-text text-muted">{{tlt('template_model_content_position_text')}}</label>
              <div
                class="custom-button-box px-3 pb-0 pt-2 mt-3 mb-3"
              >
                <div class="d-flex mb-1" style="text-align: center">
                  <div class="col-sm-4">{{tlt('template_model_index_no')}}</div>
                  <div class="col-sm-4">{{tlt('template_model_name_label')}}</div>
                  <div class="col-sm-4">{{tlt('template_model_action_label')}}</div>
                </div>
                <hr style="margin: 10px 0px" />
                <div class="d-flex col-sm-12 p-0 mb-0">
                  <div class="col-sm-4">
                      <div
                        style="text-align:center !important;"
                        class="mb-4"
                        v-for="(position, index) in banner_content_position"
                        :key="index"
                      >
                        {{index}}
                      </div>
                    </div>
                  <div class="col-sm-8">
                    <draggable
                      group="people"
                      v-model="banner_content_position"
                      @start="drag_banner_content = true"
                      @end="drag_banner_content = false"
                      v-bind="dragOptionsBanner"
                      handle=".handle"
                    >
                      <transition-group
                        type="transition"
                        :name="!drag_banner_content ? 'flip-list' : null"
                      >
                        <div
                          class="form-group d-flex col-sm-12 p-0 mb-4"
                          v-for="position in banner_content_position"
                          :key="position.id"
                        >
                          <div class="col-sm-6 text-center">
                            {{position.name}}
                          </div>
                          <div class="col-sm-6 text-center">
                            <i
                              class="fas fa-arrows-alt handle"
                              style="cursor: pointer;"
                              title="Drag to Change Order"
                            ></i>
                          </div>
                        </div>
                      </transition-group>
                    </draggable>
                  </div>
                </div>
              </div>
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
                {{tlt('banner_model_cancel_btn')}}
              </button>
              <button
                type="submit"
                class="darkblue-btn"
                id="res_n_int_save"
                @click="save_banner()"
              >
                {{tlt('banner_model_save_btn')}}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div
        class="modal modal_outer right_modal fade"
        id="preview_bot_visible"
        role="dialog"
        aria-labelledby="preview_bot_visible"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-body" 
              style="padding-left:0px !important;padding-right:0px !important;">
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                style="padding-right:20px !important;"
              >
                <img src="/img/close-icn.png" alt />
              </button>
              <br />
              <template v-if="load_bot_preview">
                <div style="overflow: hidden">
                  <response-bot
                    v-bind:isPreviewBot="true"
                    v-bind:current_preview_banner_id="current_banner.banner_id"
                  ></response-bot>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
import axios from "axios";
import swal from "sweetalert2";
import Swal from "sweetalert2";
import api_calls from "@/portal/api_calls";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import draggable from "vuedraggable";
import ResponseBot from "../Data Inputs/ResponseBot";
import { freeze_portal,show_subscription_expired_swal } from "@/portal/mixins";
// import { ImageDrop } from "quill-image-drop-module";
// import ImageResize from "quill-image-resize-module";

export default {
  name: "BannerTemplatePage",
  components: {
    VueEditor,
    DatePicker,
    draggable,
    ResponseBot
  },
  mixins: [freeze_portal,show_subscription_expired_swal],
  data() {
    return {
      // customModulesForEditor: [
      //   { alias: "imageDrop", module: ImageDrop },
      //   { alias: "imageResize", module: ImageResize },
      // ],
      // editorSettings: {
      //   modules: {
      //     imageDrop: true,
      //     imageResize: {},
      //   },
      // },
      page_no: 1,
      drag_banner_content:false,
      per_page: 15,
      total_pages: null,
      number_of_rows: null,
      page_array: [],
      banner_date_location_list: [
        // {
        //   date_time_list: [
        //     {
        //       date: [],
        //     },
        //   ],
        //   location_list: [
        //     {
        //       location: [],
        //     },
        //   ],
        // },
      ],
      showTimeRangePanel: false,
      pencil_svg:
        ' <svg xmlns="http://www.w3.org/2000/svg" width="15.546" height="15.461" viewBox="0 0 15.546 15.461"><defs><style>.a{fill:#9e9e9e;}</style></defs><g transform="translate(-747.888 -356.769)"><path class="a" d="M759.416,356.769a2.358,2.358,0,0,1,1.777.662c.534.513,1.072,1.025,1.567,1.575a2.3,2.3,0,0,1-.071,3.325c-2.736,2.76-5.494,5.5-8.238,8.251a1.381,1.381,0,0,1-.758.288c-.719.174-1.429.379-2.144.572-.932.251-1.862.5-2.795.751-.6.158-.989-.213-.832-.807q.689-2.595,1.406-5.182a1.164,1.164,0,0,1,.289-.487q4.091-4.107,8.2-8.2A2.265,2.265,0,0,1,759.416,356.769Zm-1.989,2.956-6.54,6.538,3.025,3.024,6.538-6.537Zm4.023,2.165c.118-.135.225-.269.343-.392a1.134,1.134,0,0,0,0-1.734c-.46-.466-.926-.925-1.388-1.39a1.166,1.166,0,0,0-.861-.368c-.578,0-.881.4-1.214.76Zm-12.084,8.863,3.2-.863-2.337-2.331Z" transform="translate(0)"/><path class="a" d="M813.942,422.6l-.789-.8,3.821-3.819.784.8Z" transform="translate(-59.648 -55.947)"/></g></svg>',
      spinnerOn: false,
      banner_name: "",
      banner_description: "",
      banner_content_position: [
        {"name":'Description', "id":'banner_description'},
        {"name":'Image', "id":'banner_img_url'},
        {"name":'Video', "id":'banner_video_url'},
      ],
      is_display_banner: false,
      banner_name_already_exist: false,
      isVisibleSearchClear: false,
      image_file: null,
      image_file_2: null,
      banner_img_link: "",
      banner_video_url: "",
      isEditBanner: false,
      edit_banner_name_already_exist: false,
      file_label: "Choose file",
      edited_file_label: "Choose file",
      reg_url:
        /https:\/\/[(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/i,
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
        // ["image", "code-block"],
        // ["video"],
      ],
      current_banner: [],
      banner_old_img_name: "",
      current_banner_old_name: "",
      search_name: "",
      checked_list: [],
      current_banner_index: 0,
      current_selected_banner_highlight: "",
      banner_template_list: [],
      load_bot_preview: false,
      disable_btn_expired : false,
    };
  },
  watch: {
    search_name() {
      if (this.search_name === "") {
        this.load_banners();
        this.isVisibleSearchClear = false;
      } else if (this.search_name !== "") {
        this.isVisibleSearchClear = true;
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
    this.load_banners();
  },
  mounted() {
    // $('.pac-container').remove();
//     const autocomplete = new google.maps.places.Autocomplete(
//       document.getElementById("autocomplete_add")
//     );
    $('a[data-target="#bannermodel"]').on('click' , function () {
      if(vm.isEditBanner == true){
        vm.verify_changes();
      }else{
        vm.empty_variable();
        if (!this.disable_btn_expired) {
          $("#bannermodel").modal('show');
        }
      }
    });
    $("#preview_bot_visible").on("show.bs.modal", () => {
      this.load_bot_preview = true;
    });
    $("#preview_bot_visible").on("hide.bs.modal", () => {
      this.load_bot_preview = false;
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
    setTimeout(() => {
      this.freeze_portal();
    }, 2000);
     this.$root.$on("BannerTemplatePageDisabled", (data) =>{
      if(data===true){
        this.disable_btn_expired = true;
      }
    })
  },
  computed: {
    dragOptionsBanner() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
        scrollSensitivity: 200,
        forceFallback: true,
      };
    },
    validURL() {
      if (this.reg_url.test(this.banner_img_link)) {
        return true;
      } else {
        return false;
      }
    },
    validVideoURL() {
      if (this.reg_url.test(this.banner_video_url)) {
        return true;
      } else {
        return false;
      }
    },
    validURL_edit() {
      if (this.reg_url.test(this.current_banner.banner_img_link)) {
        return true;
      } else {
        return false;
      }
    },
    validVideoURL_edit() {
      if (this.reg_url.test(this.current_banner.banner_video_url)) {
        return true;
      } else {
        return false;
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    if (this.isEditBanner) {
      this.verify_changes();
    } else {
      next();
    }
  },
  methods: {
    clear_search_name() {
      this.search_name = "";
    },
    callsearch() {
      if (event.keyCode === 13) {
        if(this.isEditBanner){
          this.verify_changes()
        }else{
          this.search_banner();
        }
      }
    },
    search_banner(){
      if (this.search_name != "") {
        $("input:checkbox").prop("checked", false);
        this.checked_list = [];
        this.spinnerOn = true;
        axios
          .post(
            api_calls.banner_template(),
            {
              company_name: this.companyname,
              company_id: this.companyid,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              subscription: this.$session.get("UserInformation").subscription,
              is_search: true,
              search_term: this.search_name,
              page_no: 1,
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
              this.number_of_rows = response.data.pagination.total_data == undefined ? 0 : response.data.pagination.total_data;
              this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
              // this.banner_template_list = response.data.BannerData;
              var dict = response.data.data.BannerData;
              this.banner_template_list = [];
              for (var key in dict) {
                if (dict.hasOwnProperty(key)) {
                  this.banner_template_list.push(dict[key]);
                }
              }
              if (this.banner_template_list.length > 0) {
                  this.show_banner(0);
              }
              this.setpagination(this.page_no);
            } else if (this.api_status_code.NO_BANNER_DATA_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
              this.banner_template_list = [];
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
    },
    byfocus_out_google_autocomplete_to_add_location(){
      $('.pac-container').remove();
    },
    byfocus_in_google_autocomplete_to_add_location(index_id, index, index1) {
      setTimeout(() => {
        var input = document.getElementById(index_id);
        const autocomplete = new google.maps.places.Autocomplete(input, {
          fields: ['formatted_address','geometry']
        });
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          $('.pac-container').remove();
          this.banner_date_location_list[index]["location_list"][
            index1
          ].location = place.formatted_address;
          this.banner_date_location_list[index]["location_list"][
            index1
          ].geometry = place.geometry;
        });
      }, 100);
    },
    byfocus_out_google_autocomplete_to_edit_location(){
      $('.pac-container').remove();
    },
    byfocus_in_google_autocomplete_to_edit_location(index_id, index, index1) {
      setTimeout(() => {
        var input = document.getElementById(index_id);
        const autocomplete = new google.maps.places.Autocomplete(input, {
          fields: ['formatted_address','geometry']
        });
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          $('.pac-container').remove();
          this.current_banner.banner_date_location_list[index]["location_list"][
            index1
          ].location = place.formatted_address;
          this.current_banner.banner_date_location_list[index]["location_list"][
            index1
          ].geometry = place.geometry;
        });
      }, 100);
    },
    verify_changes() {
      Swal({
        title: this.tlt('banner_swal_msg'),
        text: this.tlt('banner_swal_changes_discarded_msg'),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.tlt('banner_swal_save_btn'),
        cancelButtonText: this.tlt('banner_swal_cancel_btn'),
      }).then((result) => {
        if (result.value) {
          this.edit_banner();
        } else {
          this.isEditBanner = false;
        }
      });
    },
    edit_banner_details() {
      if (!this.isEditBanner) {
        this.isEditBanner = true;
      } else {
        this.isEditBanner = false;
        this.load_banners(this.current_banner_index);
        this.edit_banner_name_already_exist = false;
      }
    },
    check_enable(index){
      if(this.banner_template_list[index].is_display_banner === true){
        return true;
      }else{
        return false;
      }
    },
    show_banner(index) {
      this.isEditBanner = false;
      this.current_banner_index = index;
      this.current_banner = JSON.parse(JSON.stringify(this.banner_template_list[index]));
      if(this.current_banner.is_display_banner === true){
        $("#current_selected_is_display_banner_id").prop("checked", true);
      }else{
        $("#current_selected_is_display_banner_id").prop("checked", false);
      }
      this.edited_file_label = this.current_banner.banner_img_name;
      this.image_file_2 = this.current_banner.banner_img_name;
      if (this.edited_file_label == "" || this.edited_file_label == null) {
        this.edited_file_label = "Choose file";
      }
      this.banner_old_img_name = this.current_banner.banner_img_name;
      this.current_banner_old_name = this.current_banner.banner_name;
      this.current_selected_banner_highlight = this.current_banner.banner_id;
    },
    load_banners(current_banner_index) {
      $("input:checkbox").prop("checked", false);
      this.checked_list = [];
      this.spinnerOn = true;
      axios
        .post(
          api_calls.banner_template(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            subscription: this.$session.get("UserInformation").subscription,
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
          if (response.data.message.MSG_CODE === this.api_status_code.DATA_AVAILABLE_MODELS.MSG_CODE) {
            this.number_of_rows = response.data.pagination.total_data == undefined ? 0 : response.data.pagination.total_data;
            this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
            // this.banner_template_list = response.data.BannerData;
            var dict = response.data.data.BannerData;
            this.banner_template_list = [];
            for (var key in dict) {
              if (dict.hasOwnProperty(key)) {
                this.banner_template_list.push(dict[key]);
              }
            }
            if (this.banner_template_list.length > 0) {
              if (Boolean(current_banner_index)) {
                this.show_banner(current_banner_index);
              } else {
                this.show_banner(0);
              }
            }
            this.setpagination(this.page_no);
          } else if (response.data.message.MSG_CODE === this.api_status_code.NO_BANNER_DATA_MODELS.MSG_CODE) {
            this.banner_template_list = [];
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
              api_calls.banner_template(),
              {
                company_name: this.companyname,
                company_id: this.companyid,
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                subscription: this.$session.get("UserInformation").subscription,
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
              if (response.data.message.MSG_CODE === this.api_status_code.DATA_AVAILABLE_MODELS.MSG_CODE) {
                this.number_of_rows = response.data.pagination.total_data == undefined ? 0 : response.data.pagination.total_data;
                this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
                // this.banner_template_list = response.data.BannerData;
                var dict = response.data.BannerData;
                this.banner_template_list = [];
                for (var key in dict) {
                  if (dict.hasOwnProperty(key)) {
                    this.banner_template_list.push(dict[key]);
                  }
                }
                if (this.banner_template_list.length > 0) {
                  this.show_banner(0);
                }
                this.setpagination(this.page_no);
              } else if (response.data.message.MSG_CODE === this.api_status_code.NO_BANNER_DATA_MODELS.MSG_CODE) {
                this.banner_template_list = [];
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
              api_calls.banner_template(),
              {
                company_name: this.companyname,
                company_id: this.companyid,
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                subscription: this.$session.get("UserInformation").subscription,
                is_search: true,
                search_term: this.search_name,
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
                this.number_of_rows = response.data.pagination.total_data == undefined ? 0 : response.data.pagination.total_data;
                this.total_pages = response.data.pagination.total_page == undefined ? 0 : response.data.pagination.total_page;
                // this.banner_template_list = response.data.BannerData;
                var dict = response.data.data.BannerData;
                this.banner_template_list = [];
                for (var key in dict) {
                  if (dict.hasOwnProperty(key)) {
                    this.banner_template_list.push(dict[key]);
                  }
                }
                if (this.banner_template_list.length > 0) {
                    this.show_banner(0);
                }
                this.setpagination(this.page_no);
              } else if (this.api_status_code.NO_BANNER_DATA_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
                this.banner_template_list = [];
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
    check_current_banner_active(index) {
      var return_var = "";
      if (
        this.banner_template_list[index].banner_id ==
        this.current_selected_banner_highlight
      ) {
        return_var += "current-active-banner";
      }
      return return_var;
    },
    selected_banner(banner_id) {
      if (banner_id == "all") {
        if (event.target.checked) {
          this.checked_list = this.banner_template_list.map((banner) => {
            return banner.banner_id;
          });
          $("input:checkbox").prop("checked", false);
          for (let i = 0; i < this.checked_list.length; i++) {
            $("#" + [i]).prop("checked", true);
            $("#selectall").prop("checked", true);
          }
        } else if (!event.target.checked) {
          this.checked_list = [];
          $("input:checkbox").prop("checked", false);
        }
      } else {
        if (event.target.checked == true) {
          let val_index = this.checked_list.filter((temp) => {
            return temp.banner_id == banner_id;
          });
          if (val_index.length == 0) {
            this.checked_list.push(banner_id);
          }
        } else if (event.target.checked == false) {
          var selectall = document.querySelector("#selectall");
          if (selectall.checked == true) {
            selectall.checked = false;
          }
          let temp = this.checked_list.filter((id) => {
            return id != banner_id;
          });
          this.checked_list = temp;
        }
      }
    },
    add_to_date_time_list(type, index, index1) {
      if (type == "add") {
        this.banner_date_location_list[index]["date_time_list"].unshift({
          date: [],
        });
      } else if (type == "remove") {
        this.banner_date_location_list[index]["date_time_list"].splice(
          index1,
          1
        );
      }
    },
    add_to_current_banner_date_time_list(type, index, index1) {
      if (type == "add") {
        this.current_banner.banner_date_location_list[index][
          "date_time_list"
        ].unshift({
          date: [],
        });
      } else if (type == "remove") {
        this.current_banner.banner_date_location_list[index][
          "date_time_list"
        ].splice(index1, 1);
      }
    },
    add_to_location_list(type, index, index1) {
      if (type == "add") {
        this.banner_date_location_list[index]["location_list"].unshift({
          location: [],
        });
      } else if (type == "remove") {
        this.banner_date_location_list[index]["location_list"].splice(
          index1,
          1
        );
      }
    },
    add_to_current_banner_location_list(type, index, index1) {
      if (type == "add") {
        this.current_banner.banner_date_location_list[index][
          "location_list"
        ].unshift({
          location: [],
        });
      } else if (type == "remove") {
        this.current_banner.banner_date_location_list[index][
          "location_list"
        ].splice(index1, 1);
      }
    },
    add_to_banner_date_location_list(type, index) {
      if (type == "add") {
        this.banner_date_location_list.unshift({
          date_time_list: [
            {
              date: [],
            },
          ],
          location_list: [
            {
              location: [],
            },
          ],
        });
      } else if (type == "remove") {
        this.banner_date_location_list.splice(index, 1);
      }
    },
    add_to_current_banner_date_location_list(type, index) {
      if (type == "add") {
        this.current_banner.banner_date_location_list.unshift({
          date_time_list: [
            {
              date: [],
            },
          ],
          location_list: [
            {
              location: [],
            },
          ],
        });
      } else if (type == "remove") {
        this.current_banner.banner_date_location_list.splice(index, 1);
      }
    },
    toggleTimeRangePanel() {
      this.showTimeRangePanel = !this.showTimeRangePanel;
    },
    handleRangeClose() {
      this.showTimeRangePanel = false;
    },
    empty_variable() {
      this.banner_name = "";
      this.banner_description = "";
      this.banner_img_link = "";
      this.banner_video_url = "";
      document.getElementById('inputFile').value = "";
      document.getElementById("banner_name_id").style.border = null;
      this.banner_date_location_list = [
        // {
        //   date_time_list: [
        //     {
        //       date: [],
        //     },
        //   ],
        //   location_list: [
        //     {
        //       location: [],
        //     },
        //   ],
        // },
      ];
      this.image_file = null;
      this.image_file_2 = null;
      this.file_label = "Choose file";
      this.edited_file_label = "Choose file";
    },
    delete_selected() {
      if (this.checked_list.length === 0) {
        Swal({
          type: "warning",
          text: this.tlt('banner_no_entity_select_msg'),
          timer: 2000,
        });
      } else if (this.checked_list.length > 0) {
        var delete_banner_list = [];
        for (var i in this.checked_list) {
          delete_banner_list.push(this.checked_list[i]);
        }
        Swal.fire({
          title: this.tlt('banner_swal_alert_msg'),
          text: this.tlt('banner_swal_revert_msg'),
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: this.tlt('banner_swal_delete_alert_msg'),
        }).then((result) => {
          if (result.value) {
            this.spinnerOn = true;
            axios
              .post(
                api_calls.banner_template(),
                {
                  company_name: this.companyname,
                  company_id: this.companyid,
                  email: this.$session.get("UserInformation").email,
                  license_key: this.$session.get("UserInformation").license_key,
                  token: this.$session.get("UserInformation").tokens,
                  subscription:
                    this.$session.get("UserInformation").subscription,
                  is_delete: true,
                  banner_ids_list: delete_banner_list,
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.$session.get("at")}`,
                  },
                }
              )
              .then((response) => {
                this.spinnerOn = false;
                if (response.data.message.MSG_CODE === this.api_status_code.SUCCESSFUL_DB_QUERY_MODELS.MSG_CODE) {
                  Swal({
                    type: "success",
                    text: this.tlt('banner_swal_delete_msg'),
                    timer: 2500,
                  });
                  if (
                    this.checked_list.length ===
                      this.banner_template_list.length &&
                    this.page_no > 1
                  ) {
                    this.page_no = this.page_no - 1;
                  }
                  this.load_banners();
                } else if(response.data.message.MSG_CODE === this.api_status_code.NO_BANNER_DATA_MODELS.MSG_CODE) {
                  Swal({
                    title: response.data.message.MSG_CODE,
                    text: response.data.message.MSG,
                    showCancelButton: false,
                    showConfirmButton: false,
                    type: "error"
                  })
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
                this.spinnerOn = false;
                Swal({
                  type: "error",
                  text: this.tlt('banner_error_occurred_msg2'),
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
          }
        });
      }
    },
    create_UUID() {
      var dt = new Date().getTime();
      var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (dt + Math.random() * 16) % 16 | 0;
          dt = Math.floor(dt / 16);
          return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      );
      return uuid;
    },
    save_banner() {
      if (this.banner_name == "") {
        Swal({
          text: this.tlt('banner_enter_name_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 3500,
        });
        return;
      } 
      if (this.banner_name_already_exist == true) {
        Swal({
          text: this.tlt('banner_already_exist_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 4500,
        });
        return;
      }
      if (this.banner_video_url == "" &&
        this.image_file == null && 
        this.file_label == "Choose file"){
          Swal({
          text: this.tlt('banner_img_video_url_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 5500,
        });
        return;
      }
      if(this.banner_img_link != ""){
        if (this.image_file == null || 
        this.file_label == "Choose file"){
          Swal({
            text: this.tlt('banner_image_first_msg'),
            toast: true,
            position: "top-end",
            type: "warning",
            showConfirmButton: false,
            timer: 5500,
          });
          return;
        }
      }
      if(this.banner_img_link != ""){
        if (this.validURL == false){
          Swal({
            text: this.tlt('banner_valid_img_url_msg'),
            toast: true,
            position: "top-end",
            type: "warning",
            showConfirmButton: false,
            timer: 5500,
          });
          return;
        }
      }
      if(this.banner_video_url != ""){
        if (this.validVideoURL == false){
          Swal({
            text: this.tlt('banner_valid_video_url_msg'),
            toast: true,
            position: "top-end",
            type: "warning",
            showConfirmButton: false,
            timer: 5500,
          });
          return;
        }
      }
      for (let i = 0; i < this.banner_date_location_list.length; i++) {
        var date = this.banner_date_location_list[i]['date_time_list'];
        var location = this.banner_date_location_list[i]['location_list'];
        if(Boolean(date.length) || Boolean(location.length)){
          for (let j = 0; j < date.length; j++) {
            if(!date[j].date.length > 0){
            Swal({
              text: this.tlt('banner_empty_date_msg1'),
              toast: true,
              position: "top-end",
              type: "warning",
              showConfirmButton: false,
              timer: 5500,
            });
            return;
            }else if (date[j].date.includes(null) == true) {
              Swal({
                text: this.tlt('banner_empty_date_msg2'),
                toast: true,
                position: "top-end",
                type: "warning",
                showConfirmButton: false,
                timer: 5500,
              });
              return;
            }
          }
          for (let k = 0; k < location.length; k++) {
            if(!location[k].location.length > 0 ){
            Swal({
              text: this.tlt('banner_empty_location_msg'),
              toast: true,
              position: "top-end",
              type: "warning",
              showConfirmButton: false,
              timer: 5500,
            });
            return;
            }
          }
        }else{
          Swal({
              text: this.tlt('banner_empty_date_location_msg'),
              toast: true,
              position: "top-end",
              type: "warning",
              showConfirmButton: false,
              timer: 5500,
            });
            return;
        }
      }
      var uuid = this.create_UUID();
      Swal({
        text: this.tlt('banner_submit_your_details_msg'),
        type: "info",
        toast: true,
        showConfirmButton: false,
      });
      this.spinnerOn = true;
      axios
        .post(
          api_calls.banner_template(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            subscription: this.$session.get("UserInformation").subscription,
            is_save: true,
            banner_details: {
              banner_id: uuid,
              banner_name: this.banner_name,
              is_display_banner: this.is_display_banner,
              banner_description: this.banner_description,
              banner_content_position: this.banner_content_position,
              banner_img_file:
                this.image_file === null ? null : this.image_file,
              banner_img_name:
                this.file_label == "Choose file" ? null : this.file_label,
              banner_img_link: this.banner_img_link,
              banner_video_url: this.banner_video_url,
              banner_date_location_list: this.banner_date_location_list,
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
          if (response.data.message.MSG_CODE === this.api_status_code.SUCCESSFUL_DB_QUERY_MODELS.MSG_CODE) {
            Swal({
              type: "success",
              text: this.tlt('banner_data_added_msg'),
              timer: 2500,
            }).then((result) => {
              this.empty_variable();
              this.load_banners();
              $("#bannermodel").modal("hide");
            });
          }else if (response.data.message.MSG_CODE === this.api_status_code.IMG_DUPLICATE_MODELS.MSG_CODE) {
            Swal({
              type: "error",
              text: this.tlt('banner_img_already_found_msg'),
              timer: 4500,
            });
            // this.empty_variable();
            // this.load_banners();
          }else if (response.data.message.MSG_CODE === this.api_status_code.BANNER_LOCATION_INVALID_MODELS.MSG_CODE) {
            Swal({
              type: "error",
              text: this.tlt('banner_enter_location_msg'),
              timer: 5500,
            });
            // this.empty_variable();
            // this.load_banners();
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
          this.spinnerOn = false;
          Swal({
            type: "error",
            text: this.tlt('banner_error_occurred_msg1'),
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
    is_display_banner_save(){
      this.current_banner.is_display_banner = !this.current_banner.is_display_banner;
      if(this.current_banner.is_display_banner){
        Swal({
          title: this.tlt('banner_swal_msg2'),
          text: this.tlt('banner_enable_banner_msg'),
          type: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: this.tlt('banner_save_btn1'),
          cancelButtonText: this.tlt('banner_cancel_btn1'),
        }).then((result) => {
          if (result.value) {
            this.edit_banner();
          }else{
            this.current_banner.is_display_banner = !this.current_banner.is_display_banner;
          }
        });
      }else{
        this.edit_banner();
      }
    },
    edit_banner() {
      if (this.current_banner.banner_name == "") {
        Swal({
          text: this.tlt('edit_banner_enter_name_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 3500,
        });
        return;
      } 
      if (this.edit_banner_name_already_exist == true) {
        Swal({
          text: this.tlt('edit_banner_name_already_exist_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 4500,
        });
        return;
      }
      if (this.current_banner.banner_video_url == "" &&
        this.image_file_2 == null && 
        this.edited_file_label == "Choose file"){
          Swal({
          text: this.tlt('edit_banner_img_or_video_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 5500,
        });
        return;
      }
      if(this.current_banner.banner_img_link != ""){
        if (this.image_file_2 == null || 
        this.edited_file_label == "Choose file"){
          Swal({
            text: this.tlt('edit_banner_add_img_first_msg'),
            toast: true,
            position: "top-end",
            type: "warning",
            showConfirmButton: false,
            timer: 5500,
          });
          return;
        }
      }
      if(this.current_banner.banner_img_link != ""){
        if (this.validURL_edit == false){
          Swal({
            text: this.tlt('edit_banner_valid_img_msg'),
            toast: true,
            position: "top-end",
            type: "warning",
            showConfirmButton: false,
            timer: 5500,
          });
          return;
        }
      }
      if(this.current_banner.banner_video_url != ""){
        if (this.validVideoURL_edit == false){
          Swal({
            text: this.tlt('edit_banner_valid_video_msg'),
            toast: true,
            position: "top-end",
            type: "warning",
            showConfirmButton: false,
            timer: 5500,
          });
          return;
        }
      }
      for (let i = 0; i < this.banner_date_location_list.length; i++) {
        var date = this.banner_date_location_list[i]['date_time_list'];
        var location = this.banner_date_location_list[i]['location_list'];
        if(Boolean(date.length) || Boolean(location.length)){
          for (let j = 0; j < date.length; j++) {
            if(!date[j].date.length > 0){
            Swal({
              text: this.tlt('edit_banner_empty_date_msg'),
              toast: true,
              position: "top-end",
              type: "warning",
              showConfirmButton: false,
              timer: 5500,
            });
            return;
            }else if (date[j].date.includes(null) == true) {
              Swal({
                text: this.tlt('edit_banner_empty_date_msg1'),
                toast: true,
                position: "top-end",
                type: "warning",
                showConfirmButton: false,
                timer: 5500,
              });
              return;
            }
          }
          for (let k = 0; k < location.length; k++) {
            if(!location[k].location.length > 0 ){
            Swal({
              text: this.tlt('edit_banner_empty_location_msg'),
              toast: true,
              position: "top-end",
              type: "warning",
              showConfirmButton: false,
              timer: 5500,
            });
            return;
            }
          }
        }else{
          Swal({
              text: this.tlt('edit_banner_empty_date_location_msg'),
              toast: true,
              position: "top-end",
              type: "warning",
              showConfirmButton: false,
              timer: 5500,
            });
            return;
        }
      }
      this.spinnerOn = true;
      axios
        .post(
          api_calls.banner_template(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            subscription: this.$session.get("UserInformation").subscription,
            is_edit: true,
            banner_old_img_name:
              this.banner_old_img_name != this.current_banner.banner_img_name
                ? this.banner_old_img_name
                : null,
            banner_details: {
              banner_id: this.current_banner.banner_id,
              banner_name: this.current_banner.banner_name,
              is_display_banner: this.current_banner.is_display_banner,
              banner_description: this.current_banner.banner_description,
              banner_content_position: this.current_banner.banner_content_position,
              banner_img_url: this.current_banner.banner_img_url,
              banner_img_file:
                this.image_file_2 === null ? null : this.image_file_2,
              banner_img_name:
                this.edited_file_label == "Choose file"
                  ? null
                  : this.edited_file_label,
              banner_img_link: this.current_banner.banner_img_link,
              banner_video_url: this.current_banner.banner_video_url,
              banner_date_location_list:
                this.current_banner.banner_date_location_list,
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
          if (response.data.message.MSG_CODE === this.api_status_code.SUCCESSFUL_DB_QUERY_MODELS.MSG_CODE) {
            Swal({
              type: "success",
              text: this.tlt('edit_banner_data_success_msg'),
              timer: 2500,
            }).then((result) => {
              // this.empty_variable();
              this.load_banners(this.current_banner_index);
            });
          } else if (response.data.message.MSG_CODE === this.api_status_code.IMG_DUPLICATE_MODELS.MSG_CODE) {
            Swal({
              type: "error",
              text: this.tlt('edit_banner_img_already_found_msg'),
              timer: 4500,
            });
            // this.empty_variable();
            this.load_banners(this.current_banner_index);
          }else if (response.data.message.MSG_CODE === this.api_status_code.BANNER_LOCATION_INVALID_MODELS.MSG_CODE) {
            Swal({
              type: "error",
              text: this.tlt('edit_banner_enter_location_msg'),
              timer: 5500,
            });
            // this.empty_variable();
            // this.load_banners(this.current_banner_index);
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
          this.spinnerOn = false;
          Swal({
            type: "error",
            text: this.tlt('edit_banner_error_occurred_msg2'),
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
    validate_banner_name() {
      axios
        .post(
          api_calls.banner_template(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            subscription: this.$session.get("UserInformation").subscription,
            is_exist: true,
            banner_name: this.banner_name,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          if (this.api_status_code.BANNER_NAME_DOESNT_EXISTS_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
            this.banner_name_already_exist = false;
            document.getElementById("banner_name_id").style.border = null;
            if (this.current_banner.banner_name != "") {
              document.getElementById("banner_name_id").style.border =
                "1px solid #00f000";
            }
          } else if (this.api_status_code.BANNER_NAME_EXISTS_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
            this.banner_name_already_exist = true;
            document.getElementById("banner_name_id").style.border =
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
    validate_edit_banner_name() {
      axios
        .post(
          api_calls.banner_template(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            subscription: this.$session.get("UserInformation").subscription,
            is_exist: true,
            banner_name: this.current_banner.banner_name,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          if (this.api_status_code.BANNER_NAME_DOESNT_EXISTS_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
            this.edit_banner_name_already_exist = false;
            document.getElementById("edit_banner_name_id").style.border = null;
            if (this.current_banner.banner_name != "") {
              document.getElementById("edit_banner_name_id").style.border =
                "1px solid #00f000";
            }
          } else if (this.api_status_code.BANNER_NAME_EXISTS_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
            if (
              this.current_banner_old_name == this.current_banner.banner_name
            ) {
              this.edit_banner_name_already_exist = false;
              document.getElementById("edit_banner_name_id").style.border =
                null;
            } else {
              this.edit_banner_name_already_exist = true;
              document.getElementById("edit_banner_name_id").style.border =
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
    fileinput2(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (files[0].type === "image/png" || files[0].type === "image/jpeg") {
        if (!files.length) return;
        // this.old_edited_image_name = this.edited_file_label;
        this.edited_file_label = files[0].name;
        this.createImage2(files[0]);
      } else {
        swal({
          text: this.tlt('edit_banner_select_img_type_msg1'),
          type: "error",
          timer: 2500,
        });
      }
    },
    createImage2(file, type) {
      let reader = new FileReader();

      reader.onload = (e) => {
        this.image_file_2 = e.target.result.split("base64,")[1];
      };
      reader.readAsDataURL(file);
    },
    fileinput1(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (files[0].type === "image/png" || files[0].type === "image/jpeg") {
        if (!files.length) return;
        this.file_label = files[0].name;
        this.createImage(files[0]);
      } else {
        swal({
          text: this.tlt('edit_banner_select_img_type_msg2'),
          type: "error",
          timer: 4500,
        });
      }
    },
    createImage(file, type) {
      let reader = new FileReader();

      reader.onload = (e) => {
        this.image_file = e.target.result.split("base64,")[1];
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>
<style>
.vdpComponent.vdpWithInput > input {
  height: 36px !important;
  width: -webkit-fill-available !important;
  border: none !important;
  font-size: medium !important;
  padding: 5px 10px !important;
}
.mx-input {
  height: 38px !important;
}
#edit_date_picker_id {
  width: 100vh !important;
  max-width: -webkit-fill-available !important;
}
#add_date_picker_id {
  max-width: -webkit-fill-available !important;
}
/* .pac-icon {
  display: none;
} */
.pac-item {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}
.pac-item:hover {
  background-color: #ececec;
}
.pac-item-query {
  font-size: 16px;
}
.pac-container {
  z-index: 10000 !important;
  display: block !important;
}
/* .pac-logo:after {
  display: none !important;
  content: none !important;
} */
</style>
<style scoped>
.modal.right_modal{
  position: fixed;
  z-index: 99999;
}
.modal.right_modal .modal-dialog {
  position: fixed;
  margin: auto;
  /* width: 32%; */
  height: 100%;
  -webkit-transform: translate3d(0%, 0, 0);
      -ms-transform: translate3d(0%, 0, 0);
       -o-transform: translate3d(0%, 0, 0);
          transform: translate3d(0%, 0, 0);
}
@media (min-width: 576px)
{
.right_modal .modal-dialog {
    max-width: 100%;
}
}
.modal.right_modal .modal-content {
  /*overflow-y: auto;
    overflow-x: hidden;*/
    height: 100vh !important;
}

.modal.right_modal .modal-body {
  padding: 15px 15px 30px;
}
.modal.right_modal.fade .modal-dialog {
  right: -50%;
  -webkit-transition: opacity 0.3s linear, right 0.3s ease-out;
     -moz-transition: opacity 0.3s linear, right 0.3s ease-out;
       -o-transition: opacity 0.3s linear, right 0.3s ease-out;
          transition: opacity 0.3s linear, right 0.3s ease-out;
}
.modal.right_modal.fade.show .modal-dialog {
  right: 0;
  box-shadow: 0px 0px 19px 
rgba(0,0,0,.5);
}
.current-active-banner {
  background: rgba(0, 0, 0, 0.1);
}
.table-box tbody tr:hover td,
.table-box tbody tr:hover th {
  background: #ececec;
}
.custom-button-box {
  border: 0.5px solid #ccc;
}
.modal-lg {
  max-width: 900px !important;
}
.heading {
  color: #414141 !important;
}
.sub_heading {
  font-size: 16px !important;
  font-weight: 500 !important;
}
</style>
