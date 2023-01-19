<template>
  <div class="dash-cont" :style="setup_css">
    <div class="spinner" id="spinner" v-show="big_spinner"></div>
    <div class="container-fluid">
      <div class="card dash-card">
        <div
          class="card-header d-block d-sm-flex flex-wrap justify-content-between"
        >
          <div class="col-sm-12" style="padding-left: 10px;">
            <h4 class="mb-sm-0">{{ tlt("bot_config_page_title") }}</h4>
            <div class="" style="float: right; margin-top: -33px;">
              <div class="dash-modal">
                <div
                  class="btn-wrap card-act text-right mt-0 py-0 border-top-0"
                >
                  <button
                    type="submit"
                    class="darkblue-btn"
                    id="res_n_int_save"
                    data-toggle="modal"
                    title="Click Here for Preview"
                    data-target="#preview_bot_visible"
                  >
                    {{ tlt("bot_config_preview_bot_btn") }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="table-box">
            <div class="table-responsive">
              <div
                class="tab-pane fade active show"
                id="widget_styling"
                role="tabpanel"
                aria-labelledby="widget_styling-tab"
              >
                <div class="col-sm-12 d-flex p-0 mt-2">
                  <div
                    class="col-sm-6"
                    style="border-right: 1px solid rgb(234, 234, 234)"
                  >
                    <h5 class="mb-sm-6">
                      {{ tlt("bot_config_widget_header") }}
                    </h5>
                    <form @submit.prevent="submit_greetings">
                      <div
                        class="form-group"
                        style="margin-bottom: 0.3rem !important;"
                      >
                        <h6 class="label1">
                          {{ tlt("bot_config_widget_subhead") }}
                          <!-- <button
                            type="button"
                            class="save_node_button"
                            style="height: 29px; padding: 0px 10px"
                            @click="add_bot_greetings"
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
                          </button> -->
                        </h6>
                      </div>
                      <div class="custom-box box-animation pt-2 px-2">
                        <div class="d-flex" style="text-align: center">
                          <div class="col-sm-9" style="text-align: center;">
                            {{ tlt("bot_config_widget_msg_label") }}
                          </div>
                          <div
                            class="col-sm-3"
                            style="text-align: end; padding-right: 40px;"
                          >
                            {{ tlt("bot_config_widget_action_label") }}
                          </div>
                        </div>
                        <hr class="greetings-line" />
                        <div v-if="bot_greetings.length > 0" class="">
                          <draggable
                            v-model="bot_greetings"
                            group="people"
                            @start="drag_greetings = true"
                            @end="drag_greetings = false"
                            v-bind="dragOptionsGreetings"
                            handle=".handle"
                          >
                            <transition-group
                              type="transition"
                              :name="!drag_greetings ? 'flip-list' : null"
                              :key="greetings_key"
                            >
                              <div
                                class="form-group"
                                style="display: flex; cursor: pointer; margin: 8px 0 12px;"
                                v-for="greeting in bot_greetings"
                                :key="greeting.id"
                              >
                                <input
                                  type="text"
                                  class="form-control col-sm-9 ml-1 custom-input"
                                  :id="greeting.id"
                                  style="
                                    padding-left: 12px;
                                    font-size: 15px;
                                  "
                                  @click="reset_cursor_position"
                                  v-model="greeting.text"
                                  required
                                  :placeholder="tlt('greeting_text')"
                                  @focusout="greeting_emoji_off(greeting.id)"
                                  @focusin="greeting_emoji_on(greeting.id)"
                                  @focus="reset_cursor_position"
                                />
                                <div>
                                  <emoji-picker
                                    @emoji="append($event, greeting.id)"
                                    :search="search"
                                    style="position: relative; top: 4px; right: 30px;"
                                  >
                                    <div
                                      :id="'emoji_' + greeting.id"
                                      style="opacity:0"
                                      class="emoji-invoker"
                                      slot="emoji-invoker"
                                      slot-scope="{
                                        events: { click: clickEvent }
                                      }"
                                      @click.stop="clickEvent"
                                    >
                                      <svg
                                        height="24"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M0 0h24v24H0z" fill="none" />
                                        <path
                                          d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
                                        />
                                      </svg>
                                    </div>
                                    <div
                                      slot="emoji-picker"
                                      slot-scope="{ emojis, insert, display }"
                                    >
                                      <div
                                        class="emoji-picker"
                                        :style="{
                                          top: display.y + 'px',
                                          left: display.x + 'px'
                                        }"
                                      >
                                        <div class="emoji-picker__search">
                                          <input
                                            type="text"
                                            v-model="search"
                                            :placeholder="tlt('search')"
                                            v-focus
                                          />
                                        </div>
                                        <div>
                                          <div
                                            v-for="(emojiGroup,
                                            category) in emojis"
                                            :key="category"
                                          >
                                            <h5>{{ category }}</h5>
                                            <div class="emojis">
                                              <span
                                                v-for="(emoji,
                                                emojiName) in emojiGroup"
                                                :key="emojiName"
                                                @click="insert(emoji)"
                                                :title="emojiName"
                                                >{{ emoji }}</span
                                              >
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </emoji-picker>
                                </div>
                                <div
                                  class="col-sm-2 p-0 mx-auto my-auto"
                                  style="text-align: end; margin-right: 15px !important;"
                                >
                                  <i
                                    class="fas fa-arrows-alt my-auto pl-0 handle"
                                    style="cursor: pointer"
                                    title="Drag to Change Order"
                                    v-if="bot_greetings.length != 1"
                                  ></i>
                                  <!-- float: right;
                                      margin-right: 1%; -->
                                  <i
                                    style="
                                      font-size: 16px;
                                      cursor: pointer;
                                    "
                                    @click="delete_greeting(greeting.id)"
                                    class="fa ml-auto pl-2"
                                    title="Delete Greeting"
                                    >&#xf1f8;</i
                                  >

                                  <label
                                    title="Visible on Bot"
                                    class="switch col-sm-1 my-auto"
                                    style="margin-left: 8px !important; cursor: pointer; bottom: 2px;"
                                  >
                                    <input
                                      type="checkbox"
                                      :id="greeting.id"
                                      v-model="greeting.visible"
                                      :value="greeting.id"
                                      @change="
                                        check_active_btn_for_greeting(
                                          greeting.id
                                        )
                                      "
                                    />
                                    <span
                                      class="slider round greeting-slider"
                                      style="border-radius: 50px;width: 40px;"
                                    ></span>
                                  </label>
                                </div>
                              </div>
                            </transition-group>
                          </draggable>
                        </div>
                        <hr style="margin: 0px !important;" />
                        <div
                          class="form-group"
                          style="margin-top: 10px; margin-bottom: 10px;"
                        >
                          <p class="label1 mb-0" style="padding-left: 5px;">
                            {{ tlt("bot_config_add_greeting") }}
                            <button
                              type="button"
                              style="
                              cursor: pointer;
                              border: none;
                              background: transparent url('@portal/assets/img/plus.png')
                                0% 0% no-repeat padding-box;
                            "
                              @click="add_bot_greetings"
                            >
                              <img src="/img/black_plus.png" alt="" />
                            </button>
                            <!-- <button
                            type="button"
                            class="save_node_button"
                            style="height: 29px; padding: 0px 10px; float: unset; margin-left: 15px;"
                            @click="add_bot_greetings"
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
                          </button> -->
                          </p>
                          <div
                            class="dash-modal"
                            style="float: right; margin-top: -38px;"
                          >
                            <div
                              class="card-act text-right mt-0 py-0 border-top-0"
                            >
                              <button
                                v-if="file_label !== 'Choose file'"
                                type="submit"
                                class="darkblue-btn"
                                id="widget_title_save"
                              >
                              {{tlt('save_btn')}}
                              </button>
                            </div>
                          </div>
                          <div
                            class="dash-modal"
                            style="float: right; margin-top: -38px;"
                          >
                            <!-- margin-top: -28px; margin-right: 4px; -->
                            <div
                              class="card-act text-right mt-0 py-0 border-top-0"
                            >
                            <button
                                v-if="file_label == 'Choose file'"
                                type="submit"
                                class="darkblue-btn"
                                id="widget_title_save"
                              >
                            {{tlt('save_btn')}}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div> 
                      <div
                        class="form-group"
                        style="margin-top: 1.3rem !important; margin-bottom: 0.3rem !important;"
                      >
                        <h6 class="label1">
                          {{ tlt("bot_config_add_btns") }}
                          <!-- <button
                            type="button"
                            class="save_node_button"
                            style="height: 29px; padding: 0px 10px"
                            @click="add_buttons_for_widget"
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
                          </button> -->
                        </h6>
                      </div>
                      <div
                        class="custom-box box-animation pt-2 px-2"
                        style="padding-right: 0.2rem !important;"
                      >
                        <!-- ScrollStyle buttons-scrollbar -->
                        <draggable
                          class="col-sm-12 pl-3"
                          style="padding-right:0.8rem !important"
                          v-model="widget_buttons_details"
                          group="people-2"
                          @start="drag_buttons = true"
                          @end="drag_buttons = false"
                          v-bind="dragOptionsButtons"
                          handle=".handle"
                        >
                          <transition-group
                            class="row"
                            type="transition"
                            :name="!drag_buttons ? 'flip-list' : null"
                            :key="buttons_key"
                          >
                            <div
                              class="col-sm-6 p-0"
                              v-for="button in widget_buttons_details"
                              :key="button.id"
                            >
                              <div class="mr-2 mb-2 custom-box px-2 pt-2">
                                <div
                                  class="form-group"
                                  style="margin-bottom: 15px;"
                                >
                                  <label>{{
                                    tlt("bot_config_add_btns_title")
                                  }}</label>
                                  <label
                                    title="Visible on Bot"
                                    class="switch col-sm-1"
                                    style="margin-top:0px;float: right; cursor: pointer"
                                  >
                                    <input
                                      type="checkbox"
                                      v-model="button.visible"
                                      id="email_required_id"
                                      @change="
                                        check_one_greeting_enabled(button.id)
                                      "
                                    />
                                    <span
                                      class="slider round"
                                      style="border-radius: 50px; left: -9px;"
                                    ></span>
                                  </label>
                                  <i
                                    style="
                                          font-size: 16px;
                                          float: right;
                                          margin-right: 5%;
                                          cursor: pointer;
                                        "
                                    @click="delete_widget_button(button)"
                                    class="fa ml-auto"
                                    >&#xf1f8;</i
                                  >
                                  <i
                                    class="fas fa-arrows-alt ml-auto pr-1 handle"
                                    style="float: right; cursor: pointer"
                                    v-show="widget_buttons_details.length != 1"
                                    title="Drag to Change Order"
                                  ></i>
                                  <input
                                    type="text"
                                    class="form-control form-text custom-input"
                                    :id="button.id"
                                    name="form-input"
                                    style="
                                          padding-left: 12px;
                                        "
                                    v-model="button.title"
                                    :placeholder="tlt('btn_title')"
                                    required
                                    @click="reset_cursor_position"
                                    @focusout="button_emoji_off(button.id)"
                                    @focusin="button_emoji_on(button.id)"
                                    @focus="reset_cursor_position"
                                  />
                                  <div>
                                    <emoji-picker
                                      @emoji="
                                        append_on_title($event, button.id)
                                      "
                                      :search="search"
                                      style="position: absolute; top: 33px; right: 5px;"
                                    >
                                      <div
                                        :id="'emoji_title_' + button.id"
                                        style="opacity:0"
                                        class="emoji-invoker"
                                        slot="emoji-invoker"
                                        slot-scope="{
                                          events: { click: clickEvent }
                                        }"
                                        @click.stop="clickEvent"
                                      >
                                        <svg
                                          height="24"
                                          viewBox="0 0 24 24"
                                          width="24"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path d="M0 0h24v24H0z" fill="none" />
                                          <path
                                            d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
                                          />
                                        </svg>
                                      </div>
                                      <div
                                        slot="emoji-picker"
                                        slot-scope="{ emojis, insert, display }"
                                      >
                                        <div
                                          class="emoji-picker"
                                          :style="{
                                            top: display.y + 'px',
                                            left: display.x + 'px'
                                          }"
                                        >
                                          <div class="emoji-picker__search">
                                            <input
                                              type="text"
                                              v-model="search"
                                              :placeholder="tlt('search')"
                                              v-focus
                                            />
                                          </div>
                                          <div>
                                            <div
                                              v-for="(emojiGroup,
                                              category) in emojis"
                                              :key="category"
                                            >
                                              <h5>{{ category }}</h5>
                                              <div class="emojis">
                                                <span
                                                  v-for="(emoji,
                                                  emojiName) in emojiGroup"
                                                  :key="emojiName"
                                                  @click="insert(emoji)"
                                                  :title="emojiName"
                                                  >{{ emoji }}</span
                                                >
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </emoji-picker>
                                  </div>
                                </div>
                                <div class="mb-2 form-group">
                                  <label>{{
                                    tlt("bot_config_add_btns_label")
                                  }}</label>
                                  <multiselect
                                    v-model="button.value"
                                    :options="intentlist"
                                    :searchable="true"
                                    :close-on-select="true"
                                    :show-labels="false"
                                    :disabled="button.disabled === true"
                                    open-direction="top"
                                    :max-height="150"
                                  >
                                    <!-- <span>{{ button.intent }}</span> -->
                                  </multiselect>
                                </div>

                                <div class="form-group ml-auto mt-auto mb-auto">
                                  <!-- <button type="button" class="save_node_button" style="margin-left: 3%;height: 39px;padding-top: 0px;padding-left: 10px;padding-right: 10px;padding-bottom: 0px;background: #F23D3D;border: solid 1px #F23D3D;" @click="delete_widget_button(index)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                                    <path
                                    id="trash-can-outline"
                                    d="M8.375,3v.778H4V5.333h.875V15.444A1.661,1.661,0,0,0,6.625,17h8.75a1.661,1.661,0,0,0,1.75-1.556V5.333H18V3.778H13.625V3H8.375M6.625,5.333h8.75V15.444H6.625V5.333m1.75,1.556v7h1.75v-7H8.375m3.5,0v7h1.75v-7Z"
                                    transform="translate(-4 -3)"
                                    fill="#fff"
                                    />
                                </svg>
                              </button> -->
                                </div>
                              </div>
                            </div>
                          </transition-group>
                        </draggable>
                        <hr style="margin: 0px 0px" />
                        <div
                          class="form-group"
                          style="margin-top: 10px; margin-bottom: 10px;"
                        >
                          <p class="label1 mb-0">
                            {{ tlt("bot_config_add_btns_addbtn") }}
                            <button
                              type="button"
                              style="
                                cursor: pointer;
                                border: none;
                                background: transparent url('@portal/assets/img/plus.png')
                                  0% 0% no-repeat padding-box;
                              "
                              @click="add_buttons_for_widget"
                            >
                              <img src="/img/black_plus.png" alt="" />
                            </button>
                            <!-- <button
                              type="button"
                              class="save_node_button"
                              style="height: 29px; padding: 0px 10px; float: unset; margin-left: 15px;"
                              @click="add_buttons_for_widget"
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
                            </button> -->
                          </p>
                          <div class="dash-modal dash-modal-save-btn">
                            <div
                              class="card-act text-right mt-0 py-0 border-top-0"
                            >
                              <button
                                  v-if="file_label == 'Choose file'"
                                  type="submit"
                                  class="darkblue-btn"
                                  id="widget_title_save"
                                  style=" "
                                >
                                {{tlt('save_btn')}}
                              </button>
                            </div>
                          </div>
                          <div class="dash-modal dash-modal-save-btn">
                            <div
                              class="card-act text-right mt-0 py-0 border-top-0"
                            >
                              <button
                                v-if="file_label != 'Choose file'"
                                type="submit"
                                class="darkblue-btn"
                                id="widget_title_save_id"
                                style=""
                              >
                              {{tlt('save_btn')}}
                              </button> 
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="form-group"
                        style="margin-top: 1.3rem !important; margin-bottom: 0.3rem !important;"
                      >
                        <h6 class="label1">
                          {{tlt('confusion_message_heading')}}
                        </h6>
                      </div>
                      <div
                        class="custom-box box-animation pt-2 px-2"
                        style="padding-right: 0.2rem !important;"
                      >
                        <vue-editor
                          v-model="bot_styling.is_confusion_msg.text"
                          :editorToolbar="customToolbar"
                        ></vue-editor>
                        <div class="col-sm-12 pr-2" style="text-align:right">
                          <div
                            class="card-act"
                            style="text-align: end; padding-top: 9px;"
                          >
                            <button
                              type="submit"
                              class="darkblue-btn mt-0"
                              id="widget_title_save_id"
                            >
                             {{tlt('save_btn')}}
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                    <form @submit.prevent="save_language_chatbot">
                      <div class="form-group" style="margin-top: 1.3rem !important; margin-bottom: 0.3rem !important;">
                        <h6 class="label1">
                          {{tlt('chatbot_default_heading')}}
                        </h6>
                      </div> 
                      <div class="custom-box box-animation pt-2 px-2" style="padding-right: 0.2rem !important;">
                          <div class="col-sm-12 pr-2" style="">
                            <div class="form-group" style="">
                              <p class="label1">
                                {{tlt('chatbot_default_lang')}}
                              </p>
                              <div class="form-group mb-0">
                                <multiselect
                                  v-model="language_code"
                                  :options="country_list"
                                  :searchable="true"
                                  :close-on-select="true"
                                  :taggable="false"
                                  :multiple="false"
                                  :placeholder="tlt('Country')"
                                  :max-height="200"
                                  track-by="display_name"
                                  label="display_name"
                                  :allow-empty="false"
                                >
                                </multiselect>
                              </div>
                            </div>
                            <div class="col-sm-12 pr-2" style="text-align:right">
                              <div class="card-act" style="text-align: end; padding-top: 9px;">
                                <button
                                  type="submit"
                                  class="darkblue-btn mt-0"
                                  id="widget_title_save_id"
                                >
                                  {{tlt('save_btn')}}
                                </button>
                              </div>
                            </div>  
                          </div>
                      </div>                                         
                    </form> 
                    <form @submit.prevent="upload_image">
                      <div
                        class="form-group"
                        style="margin-top: 1.3rem !important; margin-bottom: 0.3rem !important;"
                      >
                        <h6 class="label1">
                          {{tlt('widget_icon_heading')}}
                        </h6>
                      </div>
                      <div
                        class="custom-box box-animation pt-2 px-2"
                        style="padding-right: 0.2rem !important;"
                      >
                        <div class="col-sm-12 pr-2" style="">
                            <div class="form-group" style="">
                              <p class="label1">
                                {{tlt('widget_icon_label1')}}
                              </p>
                              <div style="display: flex; margin: 1%">
                                <div class="radio">
                                  <label style="vertical-align: text-top">
                                    <input
                                      type="radio"
                                      value="image"
                                      name="widget_icon_type"
                                      v-model="widget_icon_type"
                                    />
                                    <span class="icn" id="radio"></span>
                                    {{tlt('widget_icon_img_label')}}
                                  </label>
                                </div>
                                <div class="radio" style="margin-left: 2%">
                                  <label style="vertical-align: text-top">
                                    <input
                                      type="radio"
                                      value="none"
                                      name="widget_icon_type"
                                      v-model="widget_icon_type"
                                    />
                                    <span class="icn" id="radio"></span>
                                    {{tlt('widget_icon_default_label')}}
                                  </label>
                                </div>
                              </div>
                              <!-- <div class="radio" style="margin-left: 2%">
                                <label style="vertical-align: text-top">
                                  <input
                                    type="radio"
                                    value="none"
                                    name="widget_icon_type"
                                    v-model="widget_icon_type"
                                  />
                                  <span class="icn" id="radio"></span>
                                  Cense default
                                </label>
                              </div> -->
                            </div>
                            <div class="custom-file">
                              <input
                                type="file"
                                class="custom-file-input custom-input"
                                @change="fileinput4"
                                id="inputWidgetFile01"
                                aria-describedby="inputGroupFileAddon01"
                                :disabled="defaul_widget_icon == true"
                              />
                              <label
                                style="
                                    font-weight: 400;
                                    line-height: 9px;
                                    padding-left: 15px;
                                    overflow: hidden;
                                    white-space: nowrap;
                                  "
                                class="custom-file-label form-control"
                                for="file"
                                id="inputWidgetFileLabel01"
                                >{{ file_label_4 }}</label
                              >
                            </div>
                            <div class="form-group" style="">
                              <p class="label1">
                                {{tlt('widget_icon_label2')}}
                              </p>
                              <div class="custom-file">
                                <input
                                  type="file"
                                  class="custom-file-input custom-input"
                                  @change="fileinput5"
                                  id="inputWidgetFile02"
                                  :disabled="(defaul_widget_icon == true)"
                                  aria-describedby="inputGroupFileAddon01"
                                />
                                <label
                                  style="
                                    font-weight: 400;
                                    line-height: 9px;
                                    padding-left: 15px;
                                    overflow: hidden;
                                    white-space: nowrap;
                                  "
                                class="custom-file-label form-control"
                                for="file"
                                id="inputWidgetFileLabel02"
                                >{{ file_label_5 }}</label
                              >
                            </div>
                          </div>
                          <div
                            class="card-act"
                            style="text-align: end; padding-top: 9px;"
                          >
                            <button
                              type="submit"
                              class="darkblue-btn mt-0"
                              id="widget_title_save_id"
                            >
                              {{tlt('save_btn')}}
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <!-- <hr /> -->
                  <div class="vr"></div>
                  <div class="col-sm-6">
                    <div class="card-act d-flex flex-wrap">
                      <h5 class="col-sm-6 pl-0">
                        {{ tlt("bot_config_bot_style_header") }}
                      </h5>
                      <!-- <a href="#preview_bot_visible" data-toggle="modal"
                        >Preview Bot
                      </a> -->
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
                            <div
                              class="modal-body"
                              style="padding-left:0px !important;padding-right:0px !important;"
                            >
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
                                  ></response-bot>
                                </div>
                              </template>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <form @submit.prevent="upload_image">
                      <!-- Header styling -->
                      <h6 class="label1">
                        {{ tlt("bot_style_header_subhead") }}
                      </h6>
                      <div class="custom-box box-animation pt-2 px-2">
                        <div class="row col-sm-12 p-0 m-0">
                          <div class="col-sm-12 pl-0">
                            <div class="form-group" style="">
                              <p class="label1">
                                {{ tlt("bot_config_bot_style_logo_label") }}
                              </p>
                              <div class="custom-file">
                                <input
                                  type="file"
                                  class="custom-file-input custom-input"
                                  @change="fileinput"
                                  id="inputGroupFile01"
                                  aria-describedby="inputGroupFileAddon01"
                                />
                                <label
                                  style="
                                    font-weight: 400;
                                    line-height: 9px;
                                    padding-left: 15px;
                                    overflow: hidden;
                                    white-space: nowrap;
                                  "
                                  class="custom-file-label form-control"
                                  for="file"
                                  id="miscellaneous-custom-file-input"
                                  >{{ file_label }}</label
                                >
                              </div>
                            </div>
                          </div>
                          <div class="col-sm-6 pl-0">
                            <div class="form-group" style="">
                              <p class="label1">
                                {{ tlt("bot_config_bot_style_bg_color_label") }}
                                <img
                                  title="Reset Value to Default"
                                  :src="reset_icon_path"
                                  alt=""
                                  style="float: right; cursor: pointer"
                                  @click="
                                    reset_to_default('bot_header_background')
                                  "
                                />
                              </p>
                              <input
                                class="form-control custom-input"
                                type="color"
                                id="bot_header_background"
                                v-model.trim="bot_header_background"
                              />
                            </div>
                          </div>
                          <div class="col-sm-6 pl-0">
                            <div class="form-group" style="">
                              <p class="label1">
                                {{
                                  tlt("bot_config_bot_style_head_align_label")
                                }}
                                <img
                                  title="Reset Value to Default"
                                  :src="reset_icon_path"
                                  alt=""
                                  style="float: right; cursor: pointer"
                                  @click="
                                    reset_to_default('bot_header_alignment')
                                  "
                                />
                              </p>
                              <multiselect
                                :close-on-select="true"
                                :taggable="false"
                                :multiple="false"
                                :options="bot_header_alignment_options"
                                :placeholder="tlt('alignment')"
                                v-model="bot_header_alignment"
                                label="name"
                                track_by="value"
                                style="height: 40px"
                              ></multiselect>
                            </div>
                          </div>
                        </div>
                        <hr class="my-0" />
                        <div class="dash-modal">
                          <div class="card-act text-right mt-0 py-0 border-top-0">
                            <button
                              type="submit"
                              class="darkblue-btn"
                            >
                              {{tlt('save_btn')}}
                            </button>
                          </div>
                        </div>
                      </div>
                      <!-- Bot styling -->
                      <h6 class="label1 mt-3">
                        {{ tlt("bot_config_body_style_subhead") }}
                      </h6>
                      <div class="custom-box box-animation pt-2 px-2">
                        <div class="row col-sm-12 p-0 m-0">
                          <div class="col-sm-12 pl-0">
                            <div class="form-group" style="">
                              <p class="label1">
                                {{ tlt("bot_body_style_bg_img_label") }}
                              </p>
                              <div style="display: flex; margin: 1%">
                                <div class="radio">
                                  <label style="vertical-align: text-top">
                                    <input
                                      type="radio"
                                      value="image"
                                      name="bot_background_type"
                                      v-model="bot_background_type"
                                    />
                                    <span class="icn" id="radio"></span>
                                    {{ tlt("bot_body_style_choose_img_label") }}
                                  </label>
                                </div>
                                <div class="radio" style="margin-left: 2%">
                                  <label style="vertical-align: text-top">
                                    <input
                                      type="radio"
                                      value="none"
                                      name="bot_background_type"
                                      v-model="bot_background_type"
                                    />
                                    <span class="icn" id="radio"></span>
                                    {{ tlt("bot_body_style_no_bg_label") }}
                                  </label>
                                </div>
                              </div>

                              <div
                                class="custom-file"
                                v-if="bot_background_type == 'image'"
                              >
                                <input
                                  type="file"
                                  class="custom-file-input custom-input"
                                  @change="fileinput3"
                                  id="inputGroupFile03"
                                  aria-describedby="inputGroupFileAddon03"
                                />
                                <label
                                  style="
                                    font-weight: 400;
                                    line-height: 9px;
                                    padding-left: 15px;
                                  "
                                  class="custom-file-label form-control"
                                  for="file"
                                  id="miscellaneous-custom-file-input"
                                  >{{ file_label_3 }}</label
                                >
                              </div>
                            </div>
                          </div>
                          <div class="col-sm-12 pl-0 my-0">
                            <div class="form-group text-box-margin" style="">
                              <p class="label1">
                                {{ tlt("bot_body_style_icon_label") }}
                              </p>

                              <div class="custom-file">
                                <input
                                  type="file"
                                  class="custom-file-input custom-input"
                                  @change="fileinput2"
                                  id="inputGroupFile02"
                                  aria-describedby="inputGroupFileAddon02"
                                />
                                <label
                                  style="
                                    font-weight: 400;
                                    line-height: 9px;
                                    padding-left: 15px;
                                    overflow: hidden;
                                    white-space: nowrap;
                                  "
                                  class="custom-file-label form-control"
                                  for="file"
                                  id="miscellaneous-custom-file-input"
                                  >{{ file_label_2 }}</label
                                >
                              </div>
                            </div>
                          </div>
                          <div class="col-sm-6 pl-0 my-0">
                            <div class="form-group text-box-margin" style="">
                              <p class="label1">
                                {{
                                  tlt("widget_icon_color_bg")
                                }}
                                <img
                                  title="Reset Value to Default"
                                  :src="reset_icon_path"
                                  alt=""
                                  style="float: right; cursor: pointer"
                                  @click="
                                    reset_to_default('bot_styling.bot_theme')
                                  "
                                />
                              </p>
                              <input
                                class="form-control custom-input"
                                type="color"
                                id="bot_theme"
                                name="bot_theme"
                                v-model.trim="bot_styling.bot_theme"
                              />
                            </div>
                          </div>
                          <div class="col-sm-6 pl-0 my-0">
                            <div class="form-group text-box-margin" style="">
                              <p class="label1">
                                {{ tlt("bot_body_style_user_msg_bg_label") }}
                                <img
                                  title="Reset Value to Default"
                                  :src="reset_icon_path"
                                  alt=""
                                  style="float: right; cursor: pointer"
                                  @click="
                                    reset_to_default(
                                      'bot_styling.user_response_bg_color'
                                    )
                                  "
                                />
                              </p>
                              <input
                                class="form-control custom-input"
                                type="color"
                                id="user_response_bg_color"
                                name="user_response_bg_color"
                                v-model.trim="
                                  bot_styling.user_response_bg_color
                                "
                              />
                            </div>
                          </div>
                          <div class="col-sm-6 pl-0 my-0">
                            <div class="form-group text-box-margin" style="">
                              <p class="label1">
                                {{
                                  tlt("bot_body_style_bot_response_bg_label")
                                }}
                                <img
                                  title="Reset Value to Default"
                                  :src="reset_icon_path"
                                  alt=""
                                  style="float: right; cursor: pointer"
                                  @click="
                                    reset_to_default(
                                      'bot_styling.bot_response_bg_color'
                                    )
                                  "
                                />
                              </p>
                              <input
                                class="form-control custom-input"
                                type="color"
                                id="bot_response_bg_color"
                                name="bot_response_bg_color"
                                v-model.trim="bot_styling.bot_response_bg_color"
                              />
                            </div>
                          </div>
                          <div class="col-sm-6 pl-0 my-0">
                            <div class="form-group text-box-margin" style="">
                              <p class="label1">
                                {{ tlt("bot_body_style_deliver_note_label") }}
                                <img
                                  title="Reset Value to Default"
                                  :src="reset_icon_path"
                                  alt=""
                                  style="float: right; cursor: pointer"
                                  @click="
                                    reset_to_default(
                                      'bot_styling.delivery_note_color'
                                    )
                                  "
                                />
                              </p>
                              <input
                                class="form-control custom-input"
                                type="color"
                                id="delivery_note_color"
                                name="delivery_note_color"
                                v-model.trim="bot_styling.delivery_note_color"
                              />
                            </div>
                          </div>
                          <div
                            class="col-sm-6 form-group pl-0"
                            style="margin-top: 8px; margin-bottom: 12px !important;"
                          >
                            <div class="d-flex" style="margin-top: 5px;">
                              <label class="label1">{{
                                tlt("bot_body_style_p_by_cense_label")
                              }}</label>
                              <label
                                class="switch ml-auto my-0"
                                style="margin-top: 0px; margin-right: 10px;"
                              >
                                <input
                                  type="checkbox"
                                  v-model="bot_styling.is_powered_by_cense"
                                  class=""
                                  id="is_powered_by_cense"
                                  :disabled="is_Premium != 'Premium'"
                                />
                                <span
                                  :style="
                                    is_Premium === 'Premium'
                                      ? 'cursor: pointer;'
                                      : 'cursor: not-allowed;'
                                  "
                                  title="options available only for premium user"
                                  class="slider round"
                                  style="border-radius: 50px; min-width: 38px; width: max-content;"
                                ></span>
                              </label>
                            </div>
                            {{ tlt("bot_body_style_tagline_label") }}
                          </div>
                          <div
                            class="col-sm-6 form-group pl-0"
                            style="margin-top: 1rem !important;"
                          >
                            <div class="d-flex">
                              <label class="mb-0">
                                {{
                                  tlt("bot_body_style_open_by_default_label")
                                }}
                              </label>
                              <label
                                class="switch ml-auto my-0"
                                style="margin-top: 0px; margin-right: 30px;"
                              >
                                <input
                                  type="checkbox"
                                  v-model="bot_styling.bot_open_by_default"
                                  id="bot_open_by_default"
                                />
                                <span
                                  class="slider round"
                                  style="border-radius: 50px; min-width: 38px; width: max-content;"
                                ></span>
                              </label>
                            </div>
                            <!-- <br> -->
                            ({{ tlt("bot_body_style_bot_load_on_page_label") }})
                          </div>
                          <div
                            class="col-sm-6 form-group pl-0"
                            style="margin-top: 1rem !important;"
                          >
                            <div class="d-flex">
                              <label class="mb-0">
                                {{
                                  tlt("bot_body_style_show_on_website_label")
                                }}
                              </label>
                              <label
                                class="switch ml-auto my-0"
                                style="margin-top: 0px; margin-right: 10px;"
                              >
                                <input
                                  type="checkbox"
                                  v-model="bot_styling.bot_shown_on_website"
                                  id="bot_shown_on_website"
                                />
                                <span
                                  class="slider round"
                                  style="border-radius: 50px; min-width: 38px; width: max-content;"
                                ></span>
                              </label>
                            </div>
                            ({{
                              tlt("bot_body_style_bot_shown_on_website_label")
                            }})
                          </div>
                          <div
                            class="col-sm-6 form-group pl-0"
                            style="margin-top: 1rem !important;"
                          >
                            <div class="d-flex">
                              <label class="mb-0">
                                {{
                                  tlt("bot_body_style_show_bot_history_label")
                                }}
                              </label>
                              <label
                                class="switch ml-auto my-0"
                                style="margin-top: 0px; margin-right: 26px;"
                              >
                                <input
                                  type="checkbox"
                                  v-model="bot_styling.show_bot_history"
                                  id="show_bot_history"
                                />
                                <span
                                  class="slider round"
                                  style="border-radius: 50px; min-width: 38px; width: max-content;"
                                ></span>
                              </label>
                            </div>
                            {{ tlt("bot_body_style_chat_history_label") }}
                          </div>
                        </div>
                        <hr class="my-0" />
                        <div class="dash-modal">
                          <div class="card-act text-right mt-0 py-0 border-top-0">
                            <button
                              type="submit"
                              class="darkblue-btn"
                            >
                              {{tlt('save_btn')}}
                            </button>
                          </div>
                        </div>
                      </div>
                      <!-- Widget Font styling -->
                      <h6 class="label1 mb-2 mt-3">
                        {{ tlt("bot_config_font_style_subhead") }}
                      </h6>
                      <div class="custom-box box-animation pt-2 px-2">
                        <div class="form-group mb-0"></div>
                        <div class="d-flex">
                          <div class="row col-sm-12 p-0 m-0">
                            <div class="col-sm-6 pl-0">
                              <div class="form-group" style="">
                                <p class="label1">
                                  {{ tlt("bot_config_font_style_label") }}
                                  <img
                                    title="Reset Value to Default"
                                    :src="reset_icon_path"
                                    alt=""
                                    style="float: right; cursor: pointer"
                                    @click="reset_to_default('bot_font_style')"
                                  />
                                </p>
                                <multiselect
                                  :close-on-select="true"
                                  :taggable="false"
                                  :multiple="false"
                                  :options="bot_font_options"
                                  :placeholder="tlt('font')"
                                  v-model="bot_font_style"
                                  label="name"
                                  track_by="value"
                                  open-direction="top"
                                  :max-height="150"
                                ></multiselect>
                              </div>
                            </div>
                            <div class="col-sm-6 pl-0">
                              <div class="form-group" style="">
                                <p class="label1">
                                  {{ tlt("text_color_btn") }}
                                  <img
                                    title="Reset Value to Default"
                                    :src="reset_icon_path"
                                    alt=""
                                    style="float: right; cursor: pointer"
                                    @click="
                                      reset_to_default('bot_font_color_buttons')
                                    "
                                  />
                                </p>
                                <input
                                  class="form-control custom-input"
                                  type="color"
                                  id="bot_font_color_buttons"
                                  name="bot_font_color_buttons"
                                  v-model.trim="bot_font_color_buttons"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row col-sm-12 p-0 m-0">
                          <div class="col-sm-6 pl-0">
                            <div class="form-group" style="">
                              <p class="label1">
                                {{ tlt("text_color_user_input") }}
                                <img
                                  title="Reset Value to Default"
                                  :src="reset_icon_path"
                                  alt=""
                                  style="float: right; cursor: pointer"
                                  @click="
                                    reset_to_default('bot_font_color_sender')
                                  "
                                />
                              </p>
                              <input
                                class="form-control custom-input"
                                type="color"
                                id="bot_font_color_sender"
                                name="bot_font_color_sender"
                                v-model.trim="bot_font_color_sender"
                              />
                            </div>
                          </div>
                          <div class="col-sm-6 pl-0">
                            <div class="form-group" style="">
                              <p class="label1">
                                {{ tlt("text_color_bot_output") }}
                                <img
                                  title="Reset Value to Default"
                                  :src="reset_icon_path"
                                  alt=""
                                  style="float: right; cursor: pointer"
                                  @click="
                                    reset_to_default('bot_font_color_receiver')
                                  "
                                />
                              </p>
                              <input
                                class="form-control custom-input"
                                type="color"
                                id="bot_font_color_receiver"
                                name="bot_font_color_receiver"
                                v-model.trim="bot_font_color_receiver"
                              />
                            </div>
                          </div>
                        </div>
                        <hr class="my-0" />
                        <div class="dash-modal">
                          <div class="card-act text-right mt-0 py-0 border-top-0">
                            <button
                              type="submit"
                              class="darkblue-btn"
                            >
                              {{tlt('save_btn')}}
                            </button>
                          </div>
                        </div>
                      </div>
                      <!-- Buttons Styling -->
                      <h6 class="label1 mt-3">
                        {{ tlt("bot_config_button_style_subhead") }}
                      </h6>
                      <div class="custom-box box-animation pt-2 px-2">
                        <div class="row col-sm-12 m-0 p-0">
                          <div class="col-sm-12 pl-0">
                            <div class="form-group" style="">
                              <p class="label1">
                                {{ tlt("font_style_alignment_label") }}
                                <img
                                  title="Reset Value to Default"
                                  :src="reset_icon_path"
                                  alt=""
                                  style="float: right; cursor: pointer"
                                  @click="
                                    reset_to_default('bot_buttons_alignment')
                                  "
                                />
                              </p>
                              <multiselect
                                :close-on-select="true"
                                :taggable="false"
                                :multiple="false"
                                :options="bot_buttons_alignment_options"
                                :placeholder="tlt('alignment')"
                                v-model="bot_buttons_alignment"
                                label="name"
                                track_by="value"
                              ></multiselect>
                            </div>
                          </div>
                          <div class="col-sm-6 pl-0">
                            <div class="form-group" style="">
                              <p class="label1">
                                {{ tlt("font_style_color_label") }}
                                <img
                                  title="Reset Value to Default"
                                  :src="reset_icon_path"
                                  alt=""
                                  style="float: right; cursor: pointer"
                                  @click="
                                    reset_to_default('bot_styling.button_theme')
                                  "
                                />
                              </p>
                              <input
                                class="form-control custom-input"
                                type="color"
                                id="button_theme"
                                name="button_theme"
                                v-model.trim="bot_styling.button_theme"
                              />
                            </div>
                          </div>
                          <div class="col-sm-6 pl-0 my-0">
                            <div class="form-group text-box-margin" style="">
                              <p class="label1">
                                {{ tlt("font_style_border_color_label") }}
                                <img
                                  title="Reset Value to Default"
                                  :src="reset_icon_path"
                                  alt=""
                                  style="float: right; cursor: pointer"
                                  @click="
                                    reset_to_default(
                                      'bot_styling.button_border_theme'
                                    )
                                  "
                                />
                              </p>
                              <input
                                class="form-control custom-input"
                                type="color"
                                id="button_border_theme"
                                name="button_border_theme"
                                v-model.trim="bot_styling.button_border_theme"
                              />
                            </div>
                          </div>
                          <div class="col-sm-6 pl-0">
                            <div class="form-group">
                              <p class="label1">
                                {{ tlt("font_style_h_spacing_label") }}
                                <img
                                  title="Reset Value to Default"
                                  :src="reset_icon_path"
                                  alt=""
                                  style="float: right; cursor: pointer"
                                  @click="
                                    reset_to_default(
                                      'bot_styling.horizontal_spacing'
                                    )
                                  "
                                />
                              </p>
                              <input
                                type="number"
                                style="height: 40px; padding-left: 3%"
                                class="form-control custom-input"
                                :placeholder="tlt('spacing_in_percent')"
                                required
                                min="0"
                                max="100"
                                v-model="bot_styling.horizontal_spacing"
                              />
                            </div>
                          </div>
                          <div class="col-sm-6 pl-0">
                            <div class="form-group">
                              <p class="label1">
                                {{ tlt("font_style_v_spacing_label") }}
                                <img
                                  title="Reset Value to Default"
                                  :src="reset_icon_path"
                                  alt=""
                                  style="float: right; cursor: pointer"
                                  @click="
                                    reset_to_default(
                                      'bot_styling.vertical_spacing'
                                    )
                                  "
                                />
                              </p>
                              <input
                                type="number"
                                style="height: 40px; padding-left: 3%"
                                class="form-control custom-input"
                                :placeholder="tlt('spacing_in_percent')"
                                min="0"
                                max="100"
                                required
                                v-model="bot_styling.vertical_spacing"
                              />
                            </div>
                          </div>
                          <hr />
                        </div>
                        <hr class="my-0" />
                        <div class="dash-modal">
                          <div class="card-act text-right mt-0 py-0 border-top-0">
                            <button
                              type="submit"
                              class="darkblue-btn"
                            >
                              {{tlt('save_btn')}}
                            </button>
                          </div>
                        </div>
                      </div>
                      <!-- Bot Position -->
                      <h6 class="label1 mt-3">
                        {{ tlt("bot_config_bot_position_subhead") }}
                      </h6>
                      <div
                        class="custom-box box-animation pt-2 px-2"
                        style="margin-bottom: 20px;"
                      >
                        <!-- <div class="form-group" style=""> -->
                        <!-- <img
                                title="Reset Value to Default"
                                :src="reset_icon_path"
                                alt=""
                                style="float: right; cursor: pointer"
                                @click="reset_to_default('bot_alignment')"
                              /> -->
                        <!-- <multiselect
                              :close-on-select="true"
                              :taggable="false"
                              :multiple="false"
                              :options="bot_alignment_options"
                              placeholder="Select Alignment"
                              v-model="bot_alignment"
                              label="name"
                              track_by="value"
                            ></multiselect> -->
                        <!-- </div> -->
                        <div class="d-flex">
                          <div class="col-sm-6 pl-0">
                            <div class="form-group">
                              <p class="label1">
                                {{ tlt("bot_position_h_pos_from_right_label") }}
                                <img
                                  title="Reset Value to Default"
                                  :src="reset_icon_path"
                                  alt=""
                                  style="float: right; cursor: pointer"
                                  @click="
                                    reset_to_default('bot_horizontal_position')
                                  "
                                />
                              </p>
                              <input
                                type="number"
                                style="height: 40px; padding-left: 3%"
                                class="form-control custom-input"
                                :placeholder="tlt('spacing_in_pixel')"
                                required
                                min="0"
                                max="32"
                                v-model="bot_horizontal_position"
                              />
                            </div>
                          </div>
                          <div class="col-sm-6 pl-0">
                            <div class="form-group">
                              <p class="label1">
                                {{
                                  tlt("bot_position_v_pos_from_bottom_label")
                                }}
                                <img
                                  title="Reset Value to Default"
                                  :src="reset_icon_path"
                                  alt=""
                                  style="float: right; cursor: pointer"
                                  @click="
                                    reset_to_default('bot_vertical_position')
                                  "
                                />
                              </p>
                              <input
                                type="number"
                                style="height: 40px; padding-left: 3%"
                                class="form-control custom-input"
                                :placeholder="tlt('spacing_in_pixel')"
                                min="0"
                                max="150"
                                required
                                v-model="bot_vertical_position"
                              />
                            </div>
                          </div>
                        </div>
                        <hr class="my-0" />
                        <div class="dash-modal">
                          <div class="card-act text-right mt-0 py-0 border-top-0">
                            <button
                              type="submit"
                              class="darkblue-btn"
                            >
                              {{tlt('save_btn')}}
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
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

<script>
import axios from "axios";
import swal from "sweetalert2";
import Swal from "sweetalert2";
import { setTimeout } from "timers";
import api_calls from "@/portal/api_calls";
import Multiselect from "vue-multiselect";
import ResponseBot from "../Data Inputs/ResponseBot";
import draggable from "vuedraggable";
import EmojiPicker from "vue-emoji-picker";
import { VueEditor } from "vue2-editor";

export default {
  name: "BotConfiguration",
  components: {
    Multiselect,
    ResponseBot,
    draggable,
    EmojiPicker,
    VueEditor
  },
  data() {
    return {
      input: "",
      search: "",
      oldCursorPosition: null,
      big_spinner: false,
      bot_greetings: [],
      bot_background_type: "none",
      reset_icon_path: require("@/portal/assets/img/reset_icon.svg"),
      is_Premium: this.$session.get("UserInformation").subscription,
      is_language: this.$session.get("PreferredLanguage"),
      default_bot_styling_value: [
        {
          name: "bot_styling.button_theme",
          value: "#273679"
        },
        {
          name: "bot_styling.bot_theme",
          value: "#273679"
        },
        {
          name: "bot_styling.button_border_theme",
          value: "#273679"
        },
        {
          name: "bot_styling.user_response_bg_color",
          value: "#273679"
        },
        {
          name: "bot_styling.delivery_note_color",
          value: "#273679"
        },
        {
          name: "bot_styling.bot_response_bg_color",
          value: "#ffffff"
        },
        // {
        //   name: "bot_styling.is_powered_by_cense",
        //   value: "true",
        // },
        {
          name: "bot_buttons_alignment",
          value: {
            name: "Center",
            value: "center"
          }
        },
        {
          name: "bot_styling.horizontal_spacing",
          value: "3"
        },
        {
          name: "bot_styling.vertical_spacing",
          value: "5"
        },
        {
          name: "bot_header_background",
          value: "#ffffff"
        },
        {
          name: "bot_header_alignment",
          value: {
            name: "Center",
            value: "center"
          }
        },
        {
          name: "bot_alignment",
          value: {
            name: "Right",
            value: "right"
          }
        },
        {
          name: "bot_horizontal_position",
          value: 30
        },
        {
          name: "bot_vertical_position",
          value: 12
        },
        {
          name: "bot_font_style",
          value: {
            name: "Roboto",
            value: "Roboto"
          }
        },
        {
          name: "bot_font_color_sender",
          value: "#ffffff"
        },
        {
          name: "bot_font_color_receiver",
          value: "#000000"
        },
        {
          name: "bot_font_color_buttons",
          value: "#ffffff"
        }
      ],
      is_bg_image_changed: false,
      bot_header_background: "",
      bot_header_alignment: null,
      bot_font_style: "",
      bot_font_color_sender: "",
      bot_font_color_receiver: "",
      bot_font_color_buttons: "",
      bot_font_options: [
        {
          name: "Arial",
          value: "arial,sans-serif"
        },
        {
          name: "Roboto",
          value: "Roboto"
        },
        {
          name: "Open Sans",
          value: "Open Sans"
        },
        {
          name: "Times New Roman",
          value: "Times New Roman"
        },
        {
          name: "Georgia",
          value: "Georgia"
        },
        {
          name: "Microsoft JhengHei",
          value: "'Microsoft JhengHei', Sans-serif"
        },
        {
          name: "Merriweather",
          value: "'Merriweather', Sans-serif"
        }
      ],
      bot_horizontal_position: 30,
      bot_vertical_position: 12,
      bot_alignment: {
        value: "right",
        name: "Right"
      },
      bot_alignment_options: [
        {
          name: "Left",
          value: "left"
        },
        {
          value: "right",
          name: "Right"
        }
      ],
      bot_header_alignment_options: [
        {
          name: "Center",
          value: "center"
        },
        {
          name: "Left",
          value: "left"
        },
        {
          value: "right",
          name: "Right"
        }
      ],
      bot_buttons_alignment_options: [
        {
          name: "Center",
          value: "center"
        },
        {
          name: "Left",
          value: "flex-start"
        },
        {
          value: "flex-end",
          name: "Right"
        }
      ],
      bot_buttons_alignment: {},
      image_file_2: null,
      image_file_3: null,
      image_file_4: null,
      image_file_5: null,
      widget_buttons_details: [],
      file_label: "Choose file",
      file_label_2: "Choose file",
      file_label_3: "Choose file",
      file_label_4: "Choose file",
      file_label_5: "Choose file",
      bot_styling: {
        bot_theme: "",
        button_border_theme: "",
        user_response_bg_color: "",
        bot_response_bg_color: "",
        delivery_note_color: "",
        button_theme: "",
        horizontal_spacing: "",
        vertical_spacing: "",
        is_powered_by_cense: true,
        bot_open_by_default: false,
        bot_shown_on_website: false,
        show_bot_history: true,
        is_confusion_msg: ""
      },
      intentlist: [],
      companyid: null,
      companyname: null,
      load_bot_preview: false,
      drag_buttons: false,
      drag_greetings: false,
      default_retail_greetings: ["/order_return", "order_return"],
      verify_bot_settings: [],
      verify_check: false,
      greetings_key: 0,
      buttons_key: 0,
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"]
      ],
      widget_icon_type: "none",
      defaul_widget_icon : true,
      language_code:null,
      country_list: [
        {
          display_name: "🇺🇸 English",
          value: "en",
          lang: "english"
        },
        {
          display_name: "🇮🇳 Hindi",
          value: "hi",
          lang : "hindi"
        },
        // {
        //   display_name: "🇪🇸 Spanish",
        //   value: "es",
        //   lang: "spanish"
        // },
        {
          display_name: "🇵🇹 Portuguese",
          value: "pt",
          lang : "portuguese"
        }
      ],
    };
  },
  props: {
    from_setup: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    bot_background_type(newVal, oldVal) {
      if (newVal === "none") {
        this.file_label_3 = "Choose File";
        this.image_file_3 = null;
        this.is_bg_image_changed = true;
        // this.old_image_name_3 = null;
        document.getElementById("inputGroupFile03").value = "";
      }
    },
    widget_icon_type(newVal, oldVal) {
      if (newVal == "none") {
        this.defaul_widget_icon = true;
      } else {
        this.defaul_widget_icon = false;
      }
    }
  },
  created() {
    if (this.$session.get("UserInformation").role == "SuperAdmin") {
      this.companyid = this.$session.get("CompanyId");
      this.companyname = this.$session.get("CompanyName");
    } else {
      this.companyid = this.$session.get("UserInformation").company_id;
      this.companyname = this.$session.get("UserInformation").company_name;
    }
    this.get_intents();
    this.get_widget_settings();
  },
  computed: {
    bot_alignment_text() {
      return this.bot_alignment.name;
    },
    setup_css() {
      if (this.from_setup == true) {
        return {
          "--dash-cont-margin": "0px",
          "--dash-cont-padding": "0px",
          "--container-fluid-margin": "0px",
          "--container-fluid-padding": "0px",
          "--card-border": "none",
          "--card-body-padding": "0px",
          "--card-header-padding": "20px 0px"
        };
      }
    },
    dragOptionsGreetings() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
        scrollSensitivity: 200,
        forceFallback: true
      };
    },
    dragOptionsButtons() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
        scrollSensitivity: 200,
        forceFallback: true
      };
    }
  },
  mounted() {
    $("#preview_bot_visible").on("show.bs.modal", () => {
      this.load_bot_preview = true;
    });
    $("#preview_bot_visible").on("hide.bs.modal", () => {
      this.load_bot_preview = false;
    });
    this.$root.$emit("change_sidebar_main_menu", "Simulate Interaction");
    this.language_code = this.$session.get("UserInformation").chatbot_language
    if(this.language_code != undefined || this.language_code != "" || this.language_code != null){
      this.language_code = this.country_list.find(cl=>{
          return cl.lang == this.language_code;
      })
    }else{
      this.language_code = this.country_list.find(cl=>{
          return 'english' == this.language_code;
      })
    }
  },
  beforeRouteLeave(to, from, next) {
    var check = false;
    if (this.verify_check) {
      if (
        (this.verify_bot_settings.BgImageName == this.file_label_3 ||
          this.verify_bot_settings.BgImageName == "") &&
        this.verify_bot_settings.BotFont.FontColorButtons ==
          this.bot_font_color_buttons &&
        this.verify_bot_settings.BotFont.FontColorReceiver ==
          this.bot_font_color_receiver &&
        this.verify_bot_settings.BotFont.FontColorSender ==
          this.bot_font_color_sender &&
        this.verify_bot_settings.BotFont.FontStyle == this.bot_font_style &&
        this.verify_bot_settings.BotImageName == this.file_label_2 &&
        this.verify_bot_settings.BotOpenByDefault ==
          this.bot_styling.bot_open_by_default &&
        this.verify_bot_settings.BotShownOnWebsite ==
          this.bot_styling.bot_shown_on_website &&
        this.verify_bot_settings.IsPoweredByCense ==
          this.bot_styling.is_powered_by_cense &&
        this.verify_bot_settings.BotStyling.value ==
          this.bot_buttons_alignment.value &&
        this.verify_bot_settings.BotTheme == this.bot_styling.bot_theme &&
        this.verify_bot_settings.UserResponseBgColor ==
          this.bot_styling.user_response_bg_color &&
        this.verify_bot_settings.BotResponseBgColor ==
          this.bot_styling.bot_response_bg_color &&
        this.verify_bot_settings.DeliveryNoteColor ==
          this.bot_styling.delivery_note_color &&
        this.verify_bot_settings.ButtonBorderTheme ==
          this.bot_styling.button_border_theme &&
        this.verify_bot_settings.ButtonStyling.horizontal ==
          this.bot_styling.horizontal_spacing &&
        this.verify_bot_settings.ButtonStyling.vertical ==
          this.bot_styling.vertical_spacing &&
        this.verify_bot_settings.ButtonTheme == this.bot_styling.button_theme &&
        this.verify_bot_settings.HeaderStyling.value ==
          this.bot_header_alignment.value &&
        this.verify_bot_settings.HeaderTheme == this.bot_header_background &&
        this.verify_bot_settings.ImageName == this.file_label &&
        this.verify_bot_settings.WidgetPosition.vertical ==
          this.bot_vertical_position &&
        this.verify_bot_settings.WidgetPosition.horizontal ==
          this.bot_horizontal_position &&
        this.verify_bot_settings.ShowBotHistory ==
          this.bot_styling.show_bot_history &&
        this.verify_bot_settings.confusion_msg.text ==
          this.bot_styling.is_confusion_msg.text
      ) {
        check = false;
      } else {
        check = true;
      }
    }
    if (check) {
      Swal({
        title: this.tlt("swal_are_u_sure_text"),
        text: this.tlt("bot_config_confirm_text"),
        type: this.tlt("alert_warning_text"),
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.tlt("bot_config_swal_save_btn"),
        cancelButtonText: this.tlt("bot_config_swal_cancel_btn")
      }).then(result => {
        if (result.value) {
          this.upload_image();
          this.submit_greetings();
        } else {
          next();
        }
      });
    } else {
      next();
    }
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      }
    }
  },
  methods: {
    greeting_emoji_off(id) {
      $(`#emoji_${id}`).toggleClass("visible_emoji");
    },
    greeting_emoji_on(id) {
      $(`#emoji_${id}`).toggleClass("visible_emoji");
    },
    button_emoji_off(id) {
      $(`#emoji_title_${id}`).toggleClass("visible_emoji_btn_title");
    },
    button_emoji_on(id) {
      $(`#emoji_title_${id}`).toggleClass("visible_emoji_btn_title");
    },
    append(emoji, id) {
      // for (var i = 0; i < this.bot_greetings.length; i++) {
      //   if (this.bot_greetings[i].id === id) {
      //     var cursorPos = $("#" + id).prop("selectionStart");
      //     let v = $("#" + id).val();
      //     var textBefore = v.substring(0, cursorPos);
      //     var textAfter = v.substring(cursorPos, v.length);
      //     this.bot_greetings[i].text = textBefore + emoji + textAfter;
      //   }
      // }
      this.bot_greetings.map(greeting => {
        if (greeting.id === id) {
          var cursorPos = $("#" + id).prop("selectionEnd");

          let v = $("#" + id).val();

          if (this.oldCursorPosition) {
            
            var textBefore = v.substring(0, this.oldCursorPosition);
            var textAfter = v.substring(this.oldCursorPosition, v.length);
          } else {
            
            var textBefore = v.substring(0, cursorPos);
            var textAfter = v.substring(cursorPos, v.length);
          }
          greeting.text = textBefore + emoji + textAfter;
          // const node = document.getElementById(id);
          !this.oldCursorPosition
            ? (this.oldCursorPosition = cursorPos + 2)
            : (this.oldCursorPosition = this.oldCursorPosition + 2);
          
          // node.focus();
          // const textNode = node.firstChild;
          // const caret = cursorPos + 1;
          // const range = document.createRange();
          // range.setStart(textNode, caret);
          // range.setEnd(textNode, caret);
          // const sel = window.getSelection();
          // sel.removeAllRanges();
          // sel.addRange(range);
        }
      });
    },

    reset_cursor_position() {
      this.oldCursorPosition = null;
    },

    append_on_title(emoji, id) {
      // for (var i = 0; i < this.widget_buttons_details.length; i++) {
      //   if (this.widget_buttons_details[i].id === id) {
      //     var cursorPos = $("#" + id).prop("selectionStart");
      //     let v = $("#" + id).val();
      //     var textBefore = v.substring(0, cursorPos);
      //     var textAfter = v.substring(cursorPos, v.length);
      //     this.widget_buttons_details[i].title = textBefore + emoji + textAfter;
      //   }
      // }
      this.widget_buttons_details.map(widget_buttons_detail => {
        if (widget_buttons_detail.id === id) {
          var cursorPos = $("#" + id).prop("selectionEnd");
          let v = $("#" + id).val();
          if (this.oldCursorPosition) {
         
            var textBefore = v.substring(0, this.oldCursorPosition);
            var textAfter = v.substring(this.oldCursorPosition, v.length);
          } else {
          
            var textBefore = v.substring(0, cursorPos);
            var textAfter = v.substring(cursorPos, v.length);
          }
          widget_buttons_detail.title = textBefore + emoji + textAfter;
          // const node = document.getElementById(id);
          !this.oldCursorPosition
            ? (this.oldCursorPosition = cursorPos + 2)
            : (this.oldCursorPosition = this.oldCursorPosition + 2);
    
        }
      });
    },
    get_intents() {
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
            showintent: "True"
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`
            }
          }
        )
        .then((response) => {
          if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
            toastr.error(this.tlt("bot_config_get_intent_error_msg"));
          } else if (Array.isArray(response.data.data) && response.data.data.length > 0) {
            for (var i in response.data.data) {
              this.intentlist.push(response.data.data[i]);
            }
          }else {
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                type: "error"
              })
          }
        })
        .catch(e => {
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          } else {
            toastr.error(this.tlt("bot_config_get_intent_error_msg2"));
          }
        });
    },
    add_bot_greetings() {
      let next_id = this.generateUUID();
      this.bot_greetings.push({
        text: null,
        id: next_id,
        visible: true
      });
    },
    delete_greeting(index) {
      if (
        this.bot_greetings.length === 1 &&
        this.widget_buttons_details.length > 0
      ) {
        swal({
          text: this.tlt("bot_config_delete_msg"),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500
        });
        return;
      }
      let temp_index = null;
      for (let i = 0; i < this.bot_greetings.length; i++) {
        if (this.bot_greetings[i].id == index) {
          temp_index = i;
        }
      }
      this.bot_greetings.splice(temp_index, 1);
    },
    get_widget_settings() {
      this.bot_greetings = [];
      this.big_spinner = true;
      // this.widget_buttons_details = [];
      axios
        .post(
          api_calls.widget_setting_url(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            isShow: true
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`
            }
          }
        )
        .then(response => {
          this.big_spinner = false;
          if(response.data.message.MSG_CODE == this.api_status_code.DATA_AVAILABLE.MSG_CODE){
            this.title = response.data.data.WidgetTitle;
            this.old_widget_title = this.title;
            this.file_label = response.data.data.ImageName;
            this.file_label_2 = response.data.data.BotImageName;
            this.file_label_3 = response.data.data.BgImageName;
            this.image_file_3 = response.data.data.BgImageUrl;
            this.file_label_4 = response.data.data.WidgetIconImageName;
            this.file_label_5 = response.data.data.WidgetIconImageNameOnClose;
            this.bot_styling.bot_theme =
              response.data.data.BotTheme.length < 6
                ? (
                    response.data.data.BotTheme +
                    response.data.data.BotTheme.slice(1, response.data.data.BotTheme.length)
                  ).substr(0, 7)
                : response.data.data.BotTheme;
            if (response.data.data.ButtonBorderTheme != null) {
              this.bot_styling.button_border_theme =
                response.data.data.ButtonBorderTheme.length < 6
                  ? (
                      response.data.data.ButtonBorderTheme +
                      response.data.data.ButtonBorderTheme.slice(
                        1,
                        response.data.data.ButtonBorderTheme.length
                      )
                    ).substr(0, 7)
                  : response.data.data.ButtonBorderTheme;
            } else {
              this.bot_styling.button_border_theme = this.default_bot_styling_value.filter(
                item => item.name === "bot_styling.button_border_theme"
              )[0].value;
            }
            if (response.data.data.UserResponseBgColor != null) {
              this.bot_styling.user_response_bg_color =
                response.data.data.UserResponseBgColor.length < 6
                  ? (
                      response.data.data.UserResponseBgColor +
                      response.data.data.UserResponseBgColor.slice(
                        1,
                        response.data.data.UserResponseBgColor.length
                      )
                    ).substr(0, 7)
                  : response.data.data.UserResponseBgColor;
            } else {
              this.bot_styling.user_response_bg_color = this.default_bot_styling_value.filter(
                item => item.name === "bot_styling.user_response_bg_color"
              )[0].value;
            }
            if (response.data.data.BotResponseBgColor != null) {
              this.bot_styling.bot_response_bg_color =
                response.data.data.BotResponseBgColor.length < 6
                  ? (
                      response.data.data.BotResponseBgColor +
                      response.data.data.BotResponseBgColor.slice(
                        1,
                        response.data.data.BotResponseBgColor.length
                      )
                    ).substr(0, 7)
                  : response.data.data.BotResponseBgColor;
            } else {
              this.bot_styling.bot_response_bg_color = this.default_bot_styling_value.filter(
                item => item.name === "bot_styling.bot_response_bg_color"
              )[0].value;
            }
            if (response.data.data.DeliveryNoteColor != null) {
              this.bot_styling.delivery_note_color =
                response.data.data.DeliveryNoteColor.length < 6
                  ? (
                      response.data.data.DeliveryNoteColor +
                      response.data.data.DeliveryNoteColor.slice(
                        1,
                        response.data.data.DeliveryNoteColor.length
                      )
                    ).substr(0, 7)
                  : response.data.data.DeliveryNoteColor;
            } else {
              this.bot_styling.delivery_note_color = this.default_bot_styling_value.filter(
                item => item.name === "bot_styling.delivery_note_color"
              )[0].value;
            }
            this.bot_styling.button_theme =
              response.data.data.ButtonTheme.length < 6
                ? (
                    response.data.data.ButtonTheme +
                    response.data.data.ButtonTheme.slice(
                      1,
                      response.data.data.ButtonTheme.length
                    )
                  ).substr(0, 7)
                : response.data.data.ButtonTheme;
            if (response.data.data.BotGreetings.length > 0) {
              this.bot_greetings = response.data.data.BotGreetings;
              this.widget_buttons_details = this.bot_greetings[
                this.bot_greetings.length - 1
              ].buttons;
              this.bot_greetings.map((cv, ind, arr) => {
                delete this.bot_greetings[ind].buttons;
                this.bot_greetings[ind].id = this.generateUUID();
                this.bot_greetings[ind].visible =
                  this.bot_greetings[ind].visible !== undefined
                    ? this.bot_greetings[ind].visible
                    : true;
              });
              if (this.widget_buttons_details == undefined) {
                this.widget_buttons_details = [];
              }
              for (let i = 0; i < this.widget_buttons_details.length; i++) {
                this.widget_buttons_details[i].id = this.generateUUID();
                // this.widget_buttons_details[
                //   i
                // ].value = this.widget_buttons_details[i].value.replace(
                //   this.companyid + "_",
                //   ""
                // );
                this.widget_buttons_details[
                  i
                ].value = this.widget_buttons_details[i].value;
                this.widget_buttons_details[
                  i
                ].value = this.widget_buttons_details[i].value.replace("/", "");
              }
            }
            this.bot_font_style = response.data.data.BotFont.FontStyle;
            this.bot_font_color_sender = response.data.data.BotFont.FontColorSender;
            this.bot_font_color_receiver =
              response.data.data.BotFont.FontColorReceiver;
            this.bot_font_color_buttons = response.data.data.BotFont.FontColorButtons;
            if (response.data.data.ButtonStyling) {
              this.bot_styling.horizontal_spacing =
                response.data.data.ButtonStyling.horizontal;
              this.bot_styling.vertical_spacing =
                response.data.data.ButtonStyling.vertical;
            }
            if (response.data.data.WidgetPosition) {
              this.bot_alignment = response.data.data.WidgetPosition.align;
              this.bot_vertical_position = response.data.data.WidgetPosition.vertical;
              this.bot_horizontal_position =
                response.data.data.WidgetPosition.horizontal;
            }
            if (response.data.data.BotStyling) {
              this.bot_buttons_alignment = response.data.data.BotStyling;
            }
            if (response.data.data.HeaderStyling) {
              this.bot_header_alignment = response.data.data.HeaderStyling;
            }
            if (response.data.data.HeaderTheme) {
              this.bot_header_background = response.data.data.HeaderTheme;
            }
            if (this.file_label_3 != "") {
              this.bot_background_type = "image";
            }
            this.old_image_name = this.file_label;
            if (this.file_label == "") {
              this.file_label = "Choose file";
            }
            this.old_image_name_2 = this.file_label_2;
            if (this.file_label_2 == "" || this.file_label_2 == undefined) {
              this.file_label_2 = "Choose file";
            }
            this.old_image_name_3 = this.file_label_3;
            if (this.file_label_3 == "" || this.file_label_3 == undefined) {
              this.file_label_3 = "Choose file";
            }
            this.old_image_name_4 = this.file_label_4;
            if (
              this.file_label_4 == "" ||
              this.file_label_4 == undefined ||
              this.file_label_4 == "Choose File"
            ) {
              this.file_label_4 = "Choose file";
              this.old_image_name_4 = null;
            } else {
              this.widget_icon_type = "image";
              this.defaul_widget_icon = false;
            }
            this.old_image_name_5 = this.file_label_5;
            if (
              this.file_label_5 == "" ||
              this.file_label_5 == undefined ||
              this.file_label_5 == "Choose File"
            ) {
              this.file_label_5 = "Choose file";
              this.old_image_name_5 = null;
            } else {
              this.widget_icon_type = "image";
              this.defaul_widget_icon = false;
            }
            if (
              response.data.data.WidgetIconUrl == null &&
              response.data.data.WidgetIconUrlOnClose == null
            ) {
              this.widget_icon_type = "none";
              this.defaul_widget_icon = true;
            }
            this.bot_styling.bot_open_by_default = response.data.data.BotOpenByDefault;
            this.bot_styling.is_powered_by_cense =
              response.data.data.IsPoweredByCense === undefined
                ? this.bot_styling.is_powered_by_cense
                : response.data.data.IsPoweredByCense;
            this.bot_styling.bot_shown_on_website =
              response.data.data.BotShownOnWebsite == null ||
              response.data.data.BotShownOnWebsite == undefined
                ? true
                : response.data.data.BotShownOnWebsite;
            let chat_params = {
              logo: response.data.data.ImageUrl,
              title: response.data.data.WidgetTitle,
              button_theme: response.data.data.ButtonTheme,
              bot_theme: response.data.data.BotTheme,
              button_border_theme: response.data.data.ButtonBorderTheme,
              user_response_bg_color: response.data.data.UserResponseBgColor,
              bot_response_bg_color: response.data.data.BotResponseBgColor,
              delivery_note_color: response.data.data.DeliveryNoteColor,
              bot_icon: response.data.data.BotImageUrl,
              bot_background_image: response.data.data.BgImageUrl,
              button_horizontal_spacing: response.data.data.ButtonStyling.horizontal,
              button_vertical_spacing: response.data.data.ButtonStyling.vertical,
              button_alignment: response.data.data.BotStyling,
              is_powered_by_cense: response.data.data.IsPoweredByCense
            };
            this.$session.set("ChatBotImageParameters", chat_params);
            this.bot_styling.delivery_note_color =
              response.data.data.DeliveryNoteColor === null
                ? this.bot_styling.delivery_note_color
                : response.data.data.DeliveryNoteColor;
            this.bot_styling.button_border_theme =
              response.data.data.ButtonBorderTheme === null
                ? this.bot_styling.button_border_theme
                : response.data.data.ButtonBorderTheme;
            this.bot_styling.user_response_bg_color =
              response.data.data.UserResponseBgColor === null
                ? this.bot_styling.user_response_bg_color
                : response.data.data.UserResponseBgColor;
            this.bot_styling.bot_response_bg_color =
              response.data.data.BotResponseBgColor === null
                ? this.bot_styling.bot_response_bg_color
                : response.data.data.BotResponseBgColor;
            this.bot_styling.show_bot_history =
              response.data.data.ShowBotHistory === undefined
                ? true
                : response.data.data.ShowBotHistory;
            this.bot_styling.is_confusion_msg =
              response.data.data.confusion_msg === undefined
                ? ""
                : response.data.data.confusion_msg;
            this.verify_bot_settings = response.data.data;
            // this.verify_bot_settings.BotGreetings[this.bot_greetings.length - 1].buttons = this.widget_buttons_details;
            this.verify_check = true;
          }else if (response.data.message.MSG_CODE == this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
          Swal({
            type: "error",
            text: this.tlt('add_role_internal_server_msg'),
            timer:3000,     
          });
          }else if (response.data.message.MSG_CODE == this.api_status_code.EMPTY_DATA.MSG_CODE) {
            // Swal({
            //   type: "error",
            //   text: this.tlt('no_data_text'),
            //   timer:3000,     
            // });  
          }else {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              type: "error"
            })
            }
        })
        .catch(e => {
          this.big_spinner = false;
          this.verify_check = false;
          console.log(e);
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    reset_to_default(value) {
      for (let i = 0; i < this.default_bot_styling_value.length; i++) {
        if (this.default_bot_styling_value[i].name === value) {
          if (value === "bot_styling.button_theme") {
            this.bot_styling.button_theme = this.default_bot_styling_value[
              i
            ].value;
          } else if (value === "bot_styling.bot_theme") {
            this.bot_styling.bot_theme = this.default_bot_styling_value[
              i
            ].value;
          } else if (value === "bot_styling.button_border_theme") {
            this.bot_styling.button_border_theme = this.default_bot_styling_value[
              i
            ].value;
          } else if (value === "bot_styling.user_response_bg_color") {
            this.bot_styling.user_response_bg_color = this.default_bot_styling_value[
              i
            ].value;
          } else if (value === "bot_styling.delivery_note_color") {
            this.bot_styling.delivery_note_color = this.default_bot_styling_value[
              i
            ].value;
          } else if (value === "bot_styling.bot_response_bg_color") {
            this.bot_styling.bot_response_bg_color = this.default_bot_styling_value[
              i
            ].value;
          } else if (value === "bot_styling.horizontal_spacing") {
            this.bot_styling.horizontal_spacing = this.default_bot_styling_value[
              i
            ].value;
          } else if (value === "bot_styling.vertical_spacing") {
            this.bot_styling.vertical_spacing = this.default_bot_styling_value[
              i
            ].value;
          } else {
            this[value] = this.default_bot_styling_value[i].value;
          }
          break;
        }
      }
    },
    add_buttons_for_widget() {
      if (this.bot_greetings.length === 0) {
        swal({
          text: this.tlt("bot_config_zero_btn_msg"),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500
        });
        return;
      }
      let temp_id = this.generateUUID();
      this.widget_buttons_details.push({
        title: null,
        value: this.intentlist[0],
        id: temp_id,
        visible: true
      });
    },
    delete_widget_button(button_det) {
      if (button_det.disabled === true) {
        swal({
          text: this.tlt("bot_config_default_btn"),
          toast: true,
          position: "top-end",
          type: "error",
          showConfirmButton: false,
          timer: 2500
        });
        return;
      } else {
        let temp_index = null;
        for (let i = 0; i < this.widget_buttons_details.length; i++) {
          if (this.widget_buttons_details[i].id == button_det.id) {
            temp_index = i;
          }
        }
        this.widget_buttons_details.splice(temp_index, 1);
      }
    },
    fileinput(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (files[0].size > 2097152) {
        swal({
          text: this.tlt("bot_config_img_size_msg1"),
          toast: true,
          position: "top-end",
          type: "error",
          showConfirmButton: false,
          timer: 10000
        });
        return;
      }
      if (files[0].type === "image/png" || files[0].type === "image/jpeg") {
        if (!files.length) return;
        this.old_image_name = this.file_label;
        this.file_label = files[0].name;
        this.createImage(files[0]);
      } else {
        toastr.error(this.tlt("bot_config_img_type_msg1"));
      }
    },
    fileinput2(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (files[0].size > 2097152) {
        swal({
          text: this.tlt("bot_config_img_size_msg2"),
          toast: true,
          position: "top-end",
          type: "error",
          showConfirmButton: false,
          timer: 10000
        });
        return;
      }
      if (files[0].type === "image/png" || files[0].type === "image/jpeg") {
        if (!files.length) return;
        this.old_image_name_2 = this.file_label_2;
        this.file_label_2 = files[0].name;
        this.createImage2(files[0]);
      } else {
        toastr.error(this.tlt("bot_config_img_type_msg2"));
      }
    },
    fileinput3(e) {

      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      if (files[0].size > 2097152) {
        swal({
          text: this.tlt("bot_config_img_size_msg3"),
          toast: true,
          position: "top-end",
          type: "error",
          showConfirmButton: false,
          timer: 10000
        });
        return;
      }
      if (files[0].type === "image/png" || files[0].type === "image/jpeg") {
        if (!this.is_bg_image_changed) {
          this.old_image_name_3 = this.file_label_3;
        }
        this.file_label_3 = files[0].name;
        this.createImage3(files[0]);
      } else {
        toastr.error(this.tlt("bot_config_img_type_msg3"));
      }
    },
    fileinput4(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      if (files[0].size > 1097152) {
        swal({
          text: "Upload image with size less than 1MB",
          toast: true,
          position: "top-end",
          type: "error",
          showConfirmButton: false,
          timer: 10000
        });
        return;
      }
      if (files[0].type === "image/png" || files[0].type === "image/jpeg") {
        if (!this.is_bg_image_changed) {
          this.old_image_name_4 = this.file_label_4;
        }
        this.file_label_4 = files[0].name;
        this.createImage4(files[0]);
      } else {
        toastr.error("Please Select an Image of type PNG or JPEG");
      }
    },
    fileinput5(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      if (files[0].size > 1097152) {
        swal({
          text: "Upload image with size less than 1MB",
          toast: true,
          position: "top-end",
          type: "error",
          showConfirmButton: false,
          timer: 10000
        });
        return;
      }
      if (files[0].type === "image/png" || files[0].type === "image/jpeg") {
        if (!this.is_bg_image_changed) {
          this.old_image_name_5 = this.file_label_5;
        }
        this.file_label_5 = files[0].name;
        this.createImage5(files[0]);
      } else {
        toastr.error("Please Select an Image of type PNG or JPEG");
      }
    },
    createImage(file, type) {
      let reader = new FileReader();

      reader.onload = e => {
        this.image_file = e.target.result.split("base64,")[1];
      };
      reader.readAsDataURL(file);
    },
    createImage2(file, type) {
      let reader = new FileReader();

      reader.onload = e => {
        this.image_file_2 = e.target.result.split("base64,")[1];
      };
      reader.readAsDataURL(file);
    },
    createImage3(file, type) {
      let reader = new FileReader();

      reader.onload = e => {
        this.image_file_3 = e.target.result.split("base64,")[1];
      };
      reader.readAsDataURL(file);
    },
    createImage4(file, type) {
      let reader = new FileReader();
      reader.onload = e => {
        this.image_file_4 = e.target.result.split("base64,")[1];
      };
      reader.readAsDataURL(file);
    },
    createImage5(file, type) {
      let reader = new FileReader();
      reader.onload = e => {
        this.image_file_5 = e.target.result.split("base64,")[1];
      };
      reader.readAsDataURL(file);
    },
    upload_image() {
      console.log(this.image_file_3)
      if (this.bot_vertical_position > 150) {
        swal({
          text: this.tlt("bot_config_vertical_pos_msg"),
          toast: true,
          position: "top-end",
          type: "error",
          showConfirmButton: false,
          timer: 10000
        });
        return;
      }
      if (this.bot_horizontal_position > 32) {
        swal({
          text: this.tlt("bot_config_horizontal_pos_msg"),
          toast: true,
          position: "top-end",
          type: "error",
          showConfirmButton: false,
          timer: 10000
        });
        return;
      }
      if (this.defaul_widget_icon == true) {
        this.file_label_4 = "Choose file";
        this.image_file_4 = null;
        this.old_image_name_4 = null;
        this.file_label_5 = "Choose file";
        this.image_file_5 = null;
        this.old_image_name_5 = null;
      } else if (
        // document.getElementById("inputWidgetFile01").value == "" ||
        // document.getElementById("inputWidgetFile02").value == ""
        this.file_label_4 == "" || this.file_label_5 == ""
      ) {
        toastr.error("Please Select Both Image");
        return;
      }
      if (this.bot_header_alignment === null) {
        swal({
          text: this.tlt("bot_config_header_align_msg"),
          toast: true,
          position: "top-end",
          type: "error",
          showConfirmButton: false,
          timer: 2500
        });
        return;
      } else if (this.bot_buttons_alignment === null) {
        swal({
          text: this.tlt("bot_config_btn_align_msg"),
          toast: true,
          position: "top-end",
          type: "error",
          showConfirmButton: false,
          timer: 2500
        });
        return;
      } else if (
        this.file_label != this.old_image_name &&
        document.getElementById("inputGroupFile01").value == ""
      ) {
        toastr.error(this.tlt("bot_config_select_img_file_msg1"));
      } else if (
        this.file_label != this.old_image_name &&
        document.getElementById("inputGroupFile01").value == ""
      ) {
        toastr.error(this.tlt("bot_config_select_img_file_msg2"));
      } else if (
        this.file_label != this.old_image_name &&
        document.getElementById("inputGroupFile01").value == ""
      ) {
        toastr.error(this.tlt("bot_config_select_img_file_msg3"));
      } else if(this.image_file_3 === null){
        Swal({
                text: this.tlt('bot_background_img_text'),
                showCancelButton: false,
                showConfirmButton: false,
                toast: true,
                position: "top-end",
                type: "info",
                timer: 2500
              })
      } else{
        this.big_spinner = true;
        axios
          .post(
            api_calls.widget_setting_url(),
            {
              company_name: this.companyname,
              company_id: this.companyid,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              widget_title: this.title,
              isImageEdit:
                this.file_label != this.old_image_name ? true : false,
              isBotImageEdit:
                this.file_label_2 != this.old_image_name_2 ? true : false,
              image_name: this.file_label,
              widget_image: this.image_file,
              old_image_name:
                this.old_image_name == "Choose File"
                  ? null
                  : this.old_image_name,
              isEdit: true,

              bot_image_name: this.file_label_2,
              old_bot_image_name:
                this.old_image_name_2 == "Choose File"
                  ? null
                  : this.old_image_name_2,
              bot_image: this.image_file_2,
              old_bg_image_name:
                this.old_image_name_3 == "Choose File" &&
                !this.is_bg_image_changed
                  ? null
                  : this.old_image_name_3,
              bg_image:
                this.bot_background_type === "none"
                  ? "No_image"
                  : this.image_file_3,
              bg_image_name: this.file_label_3,
              isBgImageEdit:
                this.file_label_3 != this.old_image_name_3 ||
                this.bot_background_type === "none"
                  ? true
                  : false,
              header_theme: this.bot_header_background,
              header_custom_style: this.bot_header_alignment,
              bot_theme: this.bot_styling.bot_theme,
              button_border_theme: this.bot_styling.button_border_theme,
              user_response_bg_color: this.bot_styling.user_response_bg_color,
              bot_response_bg_color: this.bot_styling.bot_response_bg_color,
              delivery_note_color: this.bot_styling.delivery_note_color,
              button_theme: this.bot_styling.button_theme,
              bot_custom_style: this.bot_buttons_alignment,
              bot_font: {
                FontStyle: this.bot_font_style,
                FontColorSender: this.bot_font_color_sender,
                FontColorReceiver: this.bot_font_color_receiver,
                FontColorButtons: this.bot_font_color_buttons
              },
              bot_position: {
                align: this.bot_alignment,
                vertical: this.bot_vertical_position,
                horizontal: this.bot_horizontal_position
              },
              button_custom_style: {
                vertical: this.bot_styling.vertical_spacing,
                horizontal: this.bot_styling.horizontal_spacing
              },
              bot_open_by_default: this.bot_styling.bot_open_by_default,
              bot_shown_on_website: this.bot_styling.bot_shown_on_website,
              is_powered_by_cense: this.bot_styling.is_powered_by_cense,
              show_bot_history: this.bot_styling.show_bot_history,
              widget_icon_image_name:
                this.file_label_4 == "Choose file" ? "" : this.file_label_4,
              widget_icon_image: this.image_file_4,
              old_widget_icon_name:
                this.old_image_name_4 == "Choose file"
                  ? null
                  : this.old_image_name_4,
              isWidgetIconEdit:
                this.file_label_4 != this.old_image_name_4 ? true : false,
              widget_icon_image_name_onclose:
                this.file_label_5 == "Choose file" ? "" : this.file_label_5,
              widget_icon_image_onclose: this.image_file_5,
              old_widget_image_name_onclose:
                this.old_image_name_5 == "Choose file"
                  ? null
                  : this.old_image_name_5,
              isWidgetIconEditOnClose:
                this.file_label_5 != this.old_image_name_5 ? true : false
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`
              }
            }
          )
          .then(response => {
              this.big_spinner = false;
              this.get_widget_settings();
              document.getElementById("inputWidgetFile01").value = "";
              document.getElementById("inputWidgetFile02").value = "";
              if (response.data.message.MSG_CODE == this.api_status_code.IMG_DUPLICATE.MSG_CODE) {
                // toastr.error(
                //   "Image already found. Please upload another image or rename it."
                // );
                swal({
                  text:
                    "Image already found. Please upload another image or rename it.",
                  type: "error",
                  timer: 3000
                });
              } else if (response.data.message.MSG_CODE == this.api_status_code.ADDED_WIDGET_SETTINGS_SUCCESSFULLY_4018.MSG_CODE) {
                swal({
                  text: this.tlt("bot_config_settings_updated_text2"),
                  type: "success",
                  timer: 2500
                });
              } else {
                  Swal({
                    title: response.data.message.MSG_CODE,
                    text: response.data.message.MSG,
                    showCancelButton: false,
                    showConfirmButton: false,
                    type: "error"
                  })
              }
            }
          )
          .catch(e => {
            this.get_widget_settings();
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
    submit_greetings() {
      for (let data = 0; data < this.widget_buttons_details.length; data++) {
        if (this.widget_buttons_details[data].title.length > 20) {
          swal({
            text: this.tlt("bot_config_btn_length_msg"),
            type: "warning",
            showConfirmButton: true,
            timer: 5000
          });
          return;
        }
      }
      var intent_vals = this.widget_buttons_details.filter(
        val => val.value === null || val.title === null
      );
      if (intent_vals.length > 0) {
        swal({
          text: this.tlt("bot_config_select_intent_msg"),
          toast: true,
          position: "top-end",
          type: "error",
          showConfirmButton: false,
          timer: 2500
        });
        return;
      }
      let widget_details = JSON.parse(
        JSON.stringify(this.widget_buttons_details)
      );
      for (let i = 0; i < widget_details.length; i++) {
        // widget_details[i].value =
        //   "/" + this.companyid + "_" + widget_details[i].value;
        widget_details[i].value = "/" + widget_details[i].value;
        // if (this.default_retail_greetings.includes(widget_details[i].value)) {
        //   widget_details[i].value = "/" +  widget_details[i].value;
        // } else {
        //   widget_details[i].value =
        //     "/" + this.companyid + "_" + widget_details[i].value;
        // }
      }
      if (widget_details.length > 0) {
        if (this.bot_greetings.length > 0) {
          for (let i = 0; i < this.bot_greetings.length; i++) {
            delete this.bot_greetings[i].buttons;
          }
          this.bot_greetings[
            this.bot_greetings.length - 1
          ].buttons = widget_details;
        } else {
          this.bot_greetings.push({
            buttons: widget_details
          });
        }
      }
      this.big_spinner = true;
      axios
        .post(
          api_calls.widget_setting_url(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            edit_greetings: true,
            bot_greetings: this.bot_greetings,
            confusion_msg: this.bot_styling.is_confusion_msg
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`
            }
          }
        )
        .then(response => {
          this.big_spinner = false;
          if (response.data.message.MSG_CODE == this.api_status_code.ADDED_WIDGET_SETTINGS_SUCCESSFULLY_4018.MSG_CODE) {
            swal({
              text: this.tlt("bot_config_settings_updated_text2"),
              type: "success",
              timer: 2500
            });
          }else {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              type: "error"
            })
          }
          this.get_widget_settings();
        })
        .catch(e => {
          this.big_spinner = false;
          swal({
            text: this.tlt("bot_config_err_msg_text2"),
            type: "error",
            timer: 2500
          });
          this.get_widget_settings();
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    generateUUID() {
      // Public Domain/MIT
      var d = new Date().getTime(); //Timestamp
      var d2 =
        (performance && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
        c
      ) {
        var r = Math.random() * 16; //random number between 0 and 16
        if (d > 0) {
          //Use timestamp until depleted
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          //Use microseconds since page-load if supported
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      });
    },
    check_active_btn_for_greeting(id) {
      let btn_greetings_status = this.get_btn_greeting_visible_status();
      if (
        btn_greetings_status[0] === true &&
        btn_greetings_status[1] === false
      ) {
        this.one_greeting_swal();
        try {
          this.bot_greetings[
            this.bot_greetings.findIndex(i => i.id === id)
          ].visible = true;
          this.greetings_key += 1;
        } catch (e) {
          console.log(e);
        }
      }
    },
    check_one_greeting_enabled(id) {
      let btn_greetings_status = this.get_btn_greeting_visible_status();
      if (
        btn_greetings_status[0] === true &&
        btn_greetings_status[1] === false
      ) {
        this.one_greeting_swal();
        try {
          this.widget_buttons_details[
            this.widget_buttons_details.findIndex(i => i.id === id)
          ].visible = false;
          this.buttons_key += 1;
        } catch (e) {
          console.log(e);
        }
      }
    },
    get_btn_greeting_visible_status() {
      return [
        this.widget_buttons_details
          .map(item => {
            return item.visible;
          })
          .includes(true),
        this.bot_greetings
          .map(item => {
            return item.visible;
          })
          .includes(true)
      ];
    },
    one_greeting_swal() {
      swal({
        text: this.tlt("bot_config_one_greeting_msg"),
        toast: true,
        position: "top-end",
        type: "error",
        showConfirmButton: false,
        timer: 5500
      });
    },
    save_language_chatbot(){
      if(this.language_code == null){
         swal({
          text: "Please select language",
          type: "warning",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000
        });
        return
      }
      let language = this.language_code.lang;
      let lang_code = this.language_code.value;
      axios.
        post(
          api_calls.portal_language_data(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            token: this.$session.get("UserInformation").tokens,
            license_key: this.$session.get("UserInformation").license_key,
            chatbot_language_code:lang_code,
            chatbot_language: language,
            save_chatbot_language: true,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          if(response.data.message.MSG_CODE == this.api_status_code.LANGUAGE_UPDATED.MSG_CODE){
            swal({
              text: "Bot Language Update Successfully",
              type: "success",
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000
            });
            let userinfo = this.$session.get("UserInformation");
            userinfo["is_set_default_language"] = false;
            userinfo["chatbot_language"] = language;
            userinfo["chatbot_language_code"] = lang_code;
            this.$session.set("UserInformation", userinfo); 
          }else if(response.data.message.MSG_CODE == this.api_status_code.UNSUCCESSFUL_DB_OPERATION.MSG_CODE){
             swal({
              text: "Unable to update Bot Language",
              type: "error",
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000
            });
          }else {
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
    }
  },
};
</script>

<style>
.third-party-logo {
  width: 150px;
  height: 75px;
  object-fit: contain;
}
.form-control.tags-input {
  padding: 5px !important;
}
.tags-input-badge {
  line-height: 1.5 !important;
}
.tags-input-remove:before,
.tags-input-remove:after {
  background: #9799ae !important;
}
</style>

<style scoped>
.dash-modal-save-btn {
  float: right;
  margin-top: -38px;
  margin-right: 5px;
}
.line-in-bot-style {
  margin-bottom: 16px;
  margin-top: 0px !important;
}
.text-box-margin {
  margin: 0 0 10px;
}
.label1 {
  margin-bottom: 5px;
}

.greetings-line {
  margin-top: 0.3rem;
  margin-bottom: 0rem;
}

.greeting-slider:before {
  left: 6px;
}
.form-text {
  font-size: 14px;
}
/* .buttons-scrollbar{
  min-height: 0px !important;
  max-height: 580px !important;
  overflow-y: auto;
  overflow-x: hidden;
}
.ScrollStyle {
  min-height: 0px;
  max-height: 285px;
  overflow-y: auto;
  overflow-x: hidden;
} */

/* .ScrollStyle::-webkit-scrollbar {
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
} */
.multiselect {
  max-height: 32px !important;
  min-height: 32px !important;
}
.custom-input {
  height: 32px !important;
}
.darkblue-btn1 {
  left: 0px !important;
  margin-top: 0px;
  width: 100% !important;
  padding: 9px 8px !important;
  line-height: 10px !important;
}
.darkblue-btn {
  font-size: 13px;
  height: 30px;
  color: #fff;
  background: #273679;
  border: solid 1px #273679;
  padding: 6px 15px;
  font-weight: 400;
  line-height: 16px;
  display: inline-block;
  border-radius: 4px;
  font-weight: bold;
  margin-top: 10px;
}
/* Emoji on Greeting text and button title input */
.emoji-invoker {
  position: relative;
  right: 0px;
  top: 0px;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}
.emoji-invoker:hover {
  transform: scale(1.1);
}
.emoji-invoker > svg {
  fill: #b1c6d0;
}
.emoji-picker {
  position: absolute;
  top: 26px !important;
  left: -216px !important;
  z-index: 1;
  font-family: Montserrat;
  border: 1px solid #ccc;
  width: 15rem;
  height: 9rem;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 1px 1px 8px #c7dbe6;
}
.emoji-picker__search {
  display: flex;
  font-size: 8px;
  margin-left: -8px;
  margin-top: -8px;
}
.emoji-picker__search > input {
  flex: 1;
  border-radius: 10rem;
  font-size: 13px;
  border: 1px solid #ccc;
  padding: 0.2rem 1rem;
  outline: none;
}
.emoji-picker h5 {
  margin-bottom: 0;
  color: #b1b1b1;
  text-transform: uppercase;
  font-size: 0.8rem;
  cursor: default;
}
.emoji-picker .emojis {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.emoji-picker .emojis:after {
  content: "";
  flex: auto;
}
.emoji-picker .emojis span {
  padding: 0.2rem;
  cursor: pointer;
  border-radius: 5px;
}
.emoji-picker .emojis span:hover {
  background: #ececec;
  cursor: pointer;
}
.visible_emoji {
  opacity: 1 !important;
}
.visible_emoji_btn_title {
  opacity: 1 !important;
}
@media (max-width: 1400px) {
  .miscellaneous-custom-file-input {
    padding: 15px 25px 15px 60px;
  }
}
.modal.right_modal {
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
@media (min-width: 576px) {
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
  box-shadow: 0px 0px 19px rgba(0, 0, 0, 0.5);
}
.dash-cont {
  margin-left: var(--dash-cont-margin, 115px);
  padding: var(--dash-cont-padding, 20px 0 1px);
}
.container-fluid {
  padding: var(--container-fluid-padding, 30px 17px 1px);
}
.card {
  border: var(--card-border, 1px solid rgba(0, 0, 0, 0.125));
}
.card-body {
  padding: var(--card-body-padding, 0px 20px 20px);
}
.card-header {
  padding: var(--card-header-padding, 20px 25px);
}
/* .vr {
  border-left: 1px solid #E9E9E9;
  margin-top: 5%;
  margin-bottom: 5%; */
/* } */
.hclass6 {
  font-weight: 100;
}
.darkblue-btn1 {
  margin-left: 3%;
  font-size: 14px;
  color: #fff;
  background: #273679;
  border: solid 1px #273679;
  padding: 9px 18px;
  font-weight: 400;
  line-height: 20px;
  display: inline-block;
  border-radius: 4px;
  cursor: pointer;
  width: 30%;
  text-align: center;
}
.button_disabled {
  border: 2px solid rgb(230, 230, 230);
  background: rgb(247, 248, 251);
}
.button_disabled svg {
  opacity: 0;
}
.button_enabled {
  border: 1px solid rgb(39, 54, 121);
  background: rgb(247, 248, 251);
}
.button_enabled svg {
  opacity: 1;
}
.custom-file > input::-webkit-input-placeholder {
  margin-left: 200px;
}
#select_country_name_misc {
  color: #9499ae;
}
.save_node_button {
  font-size: 14px;
  color: #fff;
  background: #273679;
  border: solid 1px #273679;
  padding: 6px 15px;
  font-weight: 400;
  line-height: 20px;
  /* display: inline-block; */
  border-radius: 4px;
  cursor: pointer;
  float: right;
}
.custom-file {
  min-height: 32px !important;
}
.custom-file-label {
  padding: 10px 25px 10px 15px !important;
}
.custom-file-label::after {
  padding: 0.2rem 0.75rem;
}
/* @media (max-width: 1400px) {
  .custom-file-label {
    padding: 10px 25px 10px 15px !important;
    padding: 0px !important;
  }
} */

.custom-box {
  border: 0.5px solid #ccc;
  padding: 10px !important;
}
.box-animation:hover {
  border: 0.12rem solid !important;
  padding: 10px !important;
  /* box-shadow: -1px 10px 20px -10px #878282 !important; */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
  transition: box-shadow 0.5s ease-in-out !important;
}
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
