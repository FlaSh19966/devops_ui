<template>
  <div id="dialog_page">
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <div
      class="
        card-header
        px-0
        d-block d-sm-flex
        flex-wrap
        justify-content-between
      "
    >
      <div class="card-act d-flex flex-wrap" style="width: 100%">
        <button
          id="add_node_btn"
          class="darkblue-btn"
          data-toggle="modal"
          @click="change_root"
          data-target="#addnodemodal"
        >
          {{tlt('add_node_btn_label')}}
        </button>
        <!-- <button id="add_child_node_btn" class="darkblue-btn" @click="testFunction">Add Child Node</button> -->
        <!-- <button id="add_folder_btn" class="darkblue-btn">Add Folder</button> -->
        <button
          id="try_bot_btn"
          class="ml-auto darkblue-btn"
          data-toggle="modal"
          @click="visible_try_bot()"
        >
          {{tlt('try_bot_btn_label')}}
        </button>
      </div>
    </div>
    <div class="d-flex px-0">
      <div class="card-body px-0">
        <vue-tree-list
          @click="onClick"
          @delete-node="onDel"
          @add-node="onAddNode"
          @drop-before="dropBefore"
          @drop-after="dropAfter"
          @drop="drop"
          :model="data"
          default-tree-node-name=""
          default-leaf-node-name=""
          v-bind:default-expanded="false"
        >
          <template v-slot:leafNameDisplay="slotProps">
            <span>
              {{ slotProps.model.name }}
            </span>
            <br />
            <span class="muted" v-if="!new_child_node"
              >{{ slotProps.model.responses.length }} Responses</span
            >
          </template>
          <!-- <template v-slot:treeNodeIcon="slotProps">
          <span class="icon">
            {{ (slotProps.model.children && slotProps.model.children.length > 0 && !slotProps.expanded) ?
            '' : '' }}</span>
        </template> -->
          <!-- <span class="icon" title="Add Node" slot="addTreeNodeIcon">📂</span> -->
          <!-- <span class="icon" slot="addLeafNodeIcon">＋</span> -->
          <!-- <span class="icon" slot="editNodeIcon">📃</span> -->
          <!-- <span class="icon" slot="delNodeIcon">✂️</span> -->
          <span class="icon" slot="leafNodeIcon"></span>
          <span class="icon" slot="treeNodeIcon"></span>
        </vue-tree-list>
        <br />
        <!-- <Following part is for testing, do not remove> -->
        <!-- <button @click="testNewTree">Get new tree</button>
        <pre>
        {{ newTree }}
      </pre
        >  -->
      </div>
      <div
        class="px-0"
        id="try_bot_response"
        style="margin-right: -19px !important; margin-top: -28px !important"
      >
        <template v-if="load_bot_preview" style="overflow: hidden">
          <response-bot style="padding: 0px" :isDialogBot="true"></response-bot>
        </template>
      </div>
    </div>
    <div
      class="modal fade"
      id="addnodemodal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div class="form-group" style="width: 150px">
              <h5>{{tlt('dialog_flow_node_name_header')}}</h5>
              <input
                type="text"
                v-model.trim="node_name"
                class="form-control input-tag"
                :placeholder="tlt('node_name')"
                style="
                  padding: 0.375rem 0.5rem !important;
                  margin-left: 1rem !important;
                "
              />
            </div>
            <button
              v-if="new_child_node"
              @click="onDel(child_node)"
              type="button"
              class="close"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <button
              v-else
              type="button"
              @click="close_addnodemodal"
              class="close"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group" style="margin-top: 1rem !important">
              <h5>{{tlt('dialog_flow_assistant_recognizes_header')}}</h5>
              <div class="row d-flex" style="margin-left: 1rem !important">
                <div
                  class="d-flex pb-2"
                  v-for="(trigger, index) in triggers"
                  :key="index"
                >
                  <!-- class="form-control input-tag" -->
                  <div v-if="!is_root" class="mr-2 my-auto">
                    <!-- <multiselect
                      id="trigger_filter_by_id"
                      :close-on-select="true"
                      :options="triggers_filter_by_options"
                      placeholder="Filter by"
                      v-model="trigger.trigger_type"
                      :allow-empty="false"
                      :show-labels="false"
                      @input="change_trigger_value(trigger.trigger_type, index)"
                    >
                    </multiselect> -->
                    <div>
                      <select
                        class="custom-select"
                        aria-label="Filter by"
                        id="trigger_filter_by_id"
                        style="
                          width: 120px;
                          height: 40px;
                          padding-left: 14px;
                          padding-bottom: 4px;
                        "
                        :placeholder="tlt('filter_by')"
                        v-model="trigger.trigger_type"
                        @input="
                          change_trigger_value(trigger.trigger_type, index)
                        "
                      >
                        <option value="" disabled selected>{{tlt('filter_by_label')}}</option>
                        <option value="intent">{{tlt('objective_label')}}</option>
                        <option value="entity">{{tlt('entity_label')}}</option>
                      </select>
                    </div>
                  </div>
                  <div
                    class="mr-2 my-auto"
                    v-if="
                      (!is_root && Boolean(trigger.trigger_type)) || is_root
                    "
                  >
                    <multiselect
                      v-model="trigger.trigger_value"
                      :options="
                        is_root === true
                          ? trigger_options_intent
                          : trigger.trigger_type === 'intent'
                          ? trigger_options_intent
                          : trigger_options_entity
                      "
                      :placeholder="
                        is_root === true
                          ? tlt('search_objective')
                          : trigger.trigger_type === 'intent'
                          ? tlt('search_objective')
                          : tlt('search_entity')
                      "
                      :close-on-select="true"
                      :clear-on-select="false"
                      :preserve-search="true"
                      :show-labels="false"
                      :allow-empty="false"
                      open-direction="bottom"
                      :searchable="true"
                      :loading="is_loading"
                      @input="
                        change_trigger_type(
                          trigger.trigger_type,
                          trigger.trigger_value,
                          index
                        )
                      "
                      @search-change="
                        search_intent_entity(trigger.trigger_type, $event)
                      "
                      style="height: 30px; padding: 0px"
                      id="res_n_int_source"
                    >
                      <!-- <option
                          v-for="(option, index) in trigger_options"
                          :key="index"
                          :value="option"
                        >
                          {{ option }}
                        </option> -->
                      <span slot="noOptions"></span>
                      <span slot="noResult">{{tlt('no_condition_text')}}</span>
                    </multiselect>
                  </div>
                  <div
                    class="mr-2 my-auto"
                    v-if="
                      !is_root &&
                      Boolean(trigger.trigger_type === 'entity') &&
                      Boolean(trigger.trigger_value)
                    "
                    :style="
                      is_entity_type_sys_pattern(trigger.trigger_value) === true
                        ? 'cursor: not-allowed'
                        : null
                    "
                    :title="
                      is_entity_type_sys_pattern(trigger.trigger_value) === true
                        ? 'Entity selected is of type pattern or system entity, hence further option(s) cannot be selected.'
                        : null
                    "
                  >
                    <multiselect
                      id="trigger_operand_id"
                      :close-on-select="true"
                      :options="entity_operand_options"
                      :placeholder="tlt('operator')"
                      v-model="trigger.operand"
                      :allow-empty="false"
                      :show-labels="false"
                      @input="
                        change_trigger_entity_value(trigger.operand, index)
                      "
                      :disabled="
                        is_entity_type_sys_pattern(trigger.trigger_value) ===
                        true
                      "
                    >
                    </multiselect>
                  </div>
                  <div
                    class="mr-2 my-auto"
                    v-if="
                      !is_root &&
                      Boolean(trigger.trigger_type === 'entity') &&
                      Boolean(trigger.trigger_value) &&
                      Boolean(trigger.operand === 'is')
                    "
                  >
                    <!-- <p style="margin:0px !important" 
                        v-if="is_entity_type_sys_pattern(trigger.trigger_value)">
                        (Entity selected is of type pattern or system entity,<br> hence further option(s) cannot be selected.)
                      </p> -->
                    <multiselect
                      id="trigger_entity_value_id"
                      :close-on-select="true"
                      :options="entity_value_options(trigger.trigger_value)"
                      :placeholder="tlt('entity_value')"
                      v-model="trigger.entity_value"
                      :allow-empty="false"
                      :show-labels="false"
                      @input="
                        set_trigger_entity_value(trigger.entity_value, index)
                      "
                    >
                    </multiselect>
                  </div>
                  <span
                    v-if="triggers.length > 1"
                    style="cursor: pointer"
                    class="my-auto mr-2 ml-0 close"
                    @click="add_to_triggers_list('remove', index)"
                  >
                    &times;
                  </span>
                  <span
                    v-if="triggers.length > 1"
                    class="my-auto mr-2 ml-0"
                    style="font-size: 17px"
                    >&&
                  </span>
                </div>
                <button
                  v-if="!is_root"
                  id="add_trigger_btn"
                  class="mr-2 my-auto"
                  style="
                    cursor: pointer;
                    border: none;
                    height: 30px;
                    background: transparent url('@portal/assets/img/plus.png')
                      0% 0% no-repeat padding-box;
                    margin-top: 5px !important;
                  "
                  @click="add_to_triggers_list('add')"
                >
                  <img src="/img/black_plus.png" alt="" />
                </button>
              </div>
            </div>
            <hr />
            <div class="form-group d-flex">
              <h5 class="mr-2 p-0">{{tlt('dialog_flow_slots_header')}}</h5>
              <p class="text-muted p-0 mb-0" style="margin-top: 3px !important">
                {{tlt('dialog_flow_slots_help_text')}}
              </p>
              <div
                v-show="slots.length > 0 && is_slot"
                class="ml-auto card-act"
              >
                <button
                  type="button"
                  data-toggle="modal"
                  data-target="#manage_handler_id"
                  class="darkblue-btn"
                >
                  {{tlt('manage_handler_btn')}}
                </button>
              </div>
              <label
                class="switch my-auto ml-2"
                :class="Boolean(slots.length > 0) ? '' : 'ml-auto'"
              >
                <input type="checkbox" v-model="is_slot" id="slots_required" />
                <span class="slider round" style="border-radius: 50px"></span>
              </label>
            </div>
            <div v-if="is_slot" class="form-group custom-box">
              <div v-show="slots.length > 0">
                <!-- <hr style="margin: 10px 0px" /> -->
                <div class="d-flex mb-1" style="text-align: center">
                  <div class="col-sm-4">{{tlt('slots_check_for_entity_label')}}</div>
                  <div class="col-sm-4">{{tlt('slots_save_it_as_label')}}</div>
                  <div class="col-sm-3">{{tlt('slots_if_not_present_label')}}</div>
                  <div class="col-sm-1">{{tlt('slots_action_label')}}</div>
                </div>
                <hr style="margin: 10px 0px !important" />
                <draggable
                  v-model="slots"
                  group="people"
                  @start="drag_slots = true"
                  @end="drag_slots = false"
                  v-bind="dragOptionsSlots"
                  handle=".handle"
                >
                  <transition-group
                    type="transition"
                    :name="!drag_slots ? 'flip-list' : null"
                  >
                    <div
                      class="col-sm-12 p-0 d-flex form-group"
                      v-for="(slot, index) in slots"
                      :key="slot.id"
                    >
                      <div class="col-sm-4 p-0">
                        <div>
                          <!-- <select
                          class="form-control input-tag"
                          v-model="slot.check_for"
                          style="width: 100%; padding: 0.375rem 0.5rem"
                          placeholder="Select response"
                          @click="set_slot_entity_variable(index, slot.check_for)"
                          id="res_n_int_source"
                        > -->
                          <multiselect
                            v-model="slot.check_for"
                            :options="
                              updated_entity_list_after_removing_used_entity_in_slot(
                                entity_list,
                                slots
                              )
                            "
                            :close-on-select="true"
                            :clear-on-select="false"
                            :preserve-search="true"
                            :show-labels="false"
                            :allow-empty="false"
                            :placeholder="tlt('search_entity')"
                            open-direction="bottom"
                            :searchable="true"
                            :loading="is_loading"
                            @search-change="search_entity"
                            @input="
                              set_slot_entity_variable(index, slot.check_for)
                            "
                            style="height: 30px; padding: 0px"
                            id="res_n_int_source"
                          >
                            <!-- <option
                            v-for="(option, index) in temp_entities"
                            :key="index"
                            :value="option"
                          >
                            {{ option }}
                          </option> -->
                            <span slot="noOptions"></span>
                            <span slot="noResult">No Entites found.</span>
                          </multiselect>
                        </div>
                        <!-- <div v-else>Add some Entities first</div> -->
                      </div>
                      <div class="col-sm-4">
                        <input
                          class="form-control input-tag"
                          style="width: 100%; padding: 0.375rem 0.5rem"
                          :placeholder="tlt('enter_variable')"
                          type="text"
                          disabled
                          v-model="slot.slot"
                        />
                      </div>
                      <div class="col-sm-3 p-0" style="text-align: center">
                        <input
                          id="checkfocus"
                          class="form-control input-tag"
                          style="width: 100%; padding: 0.375rem 0.5rem"
                          :placeholder="tlt('response_id')"
                          type="text"
                          @focusout="
                            add_slot_to_assistant_response(
                              'text',
                              index,
                              slot.check_for,
                              slot.slot,
                              slot.responses
                            )
                          "
                          @focusin="
                            remove_slot_to_assistant_response(index, slot.slot)
                          "
                          v-model="slot.responses"
                          :disabled="true"
                        />
                        <!-- :disabled="slot.responses.length > 1" -->
                      </div>
                      <div class="col-sm-1 pr-0">
                        <div class="col-sm-12 d-flex p-0">
                          <div
                            class="col-sm-4 px-auto"
                            style="padding-top: 8px"
                          >
                            <span
                              style="
                                float: right;
                                cursor: pointer;
                                font-size: 14px;
                              "
                              class="muted"
                            >
                              <a
                                data-toggle="modal"
                                href="#slotmodal"
                                @click="
                                  on_open_slots_modal(
                                    slot.slot,
                                    index,
                                    slot.check_for
                                  )
                                "
                              >
                                <i
                                  title="Customize Slot"
                                  class="fas fa-cog"
                                ></i>
                              </a>
                            </span>
                          </div>
                          <div
                            class="col-sm-4 px-auto"
                            style="padding-top: 10px"
                          >
                            <i
                              class="fas fa-arrows-alt handle"
                              style="cursor: pointer; float: right !important"
                              title="Drag to Change Order"
                              v-if="slots.length != 1"
                            ></i>
                          </div>
                          <div
                            class="col-sm-4 px-auto"
                            style="padding-top: 6px"
                          >
                            <span
                              style="float: right; cursor: pointer"
                              @click="
                                add_to_slots_list(
                                  'remove',
                                  index,
                                  slot.responses
                                )
                              "
                              class="close"
                              title="Delete Slot"
                            >
                              &times;
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </transition-group>
                </draggable>
                <!-- <hr /> -->
              </div>
              <div class="d-flex">
                <div class="d-flex">
                  <p
                    class="sub_heading"
                    style="margin-top: 6px; margin-bottom: 5px"
                  >
                    {{tlt('sms_model_msg_label')}}
                  </p>
                  <button
                    style="
                      cursor: pointer;
                      border: none;
                      background: transparent url('@portal/assets/img/plus.png')
                        0% 0% no-repeat padding-box;
                    "
                    @click="add_to_slots_list('add')"
                  >
                    <img src="/img/black_plus.png" alt="" />
                  </button>
                </div>
              </div>
            </div>
            <hr />
            <div class="form-group d-flex">
              <h5 class="mr-2 p-0">{{tlt('webhook_header')}}</h5>
              <p class="text-muted p-0 mb-0" style="margin-top: 3px !important">
                {{tlt('webhook_help_text')}}
              </p>
              <label class="switch ml-auto my-auto">
                <input
                  type="checkbox"
                  v-model="is_webhook"
                  id="webhook_required"
                />
                <span class="slider round" style="border-radius: 50px"></span>
              </label>
            </div>
            <div style="color: red" v-if="is_webhook && !is_webhook_details">
              {{tlt('set_webhook_help_text')}}
            </div>
            <!-- <hr style="margin: 10px 0px" /> -->
            <div
              v-if="is_webhook && is_webhook_details"
              class="form-group custom-box"
            >
              <div class="d-flex">
                <p
                  class="ml-0 sub_heading"
                  style="margin-top: 6px; margin-bottom: 0px; margin-left: 10px"
                >
                  {{tlt('select_webhook_label')}} :
                </p>
                <div class="col-sm-3 ml-2 p-0">
                
                  <multiselect
                    v-model="webhook_id"
                    :options="webhook_list.map((webhook) => webhook.id)"
                    :custom-label="
                      (webhook) =>
                        webhook_list.find((x) => x.id == webhook).name
                    "
                    :close-on-select="true"
                    :clear-on-select="false"
                    :preserve-search="true"
                    :show-labels="false"
                    :allow-empty="false"
                    :placeholder="tlt('search_webhook')"
                    open-direction="bottom"
                    :searchable="true"
                    :loading="is_loading"
                    @search-change="search_webhook"
                    @input="set_webhook_return_variable(webhook_id)"
                    style="height: 30px; padding: 0px"
                    id="res_n_int_source"
                  >
                    <!-- @input="set_slot_entity_variable(index, slot.check_for)" -->
                    <!-- <option
                  v-for="(option, index) in temp_entities"
                  :key="index"
                  :value="option"
                >
                  {{ option }}
                </option> -->
                    <span slot="noOptions"></span>
                    <span slot="noResult">{{tlt('no_webhook_found_text')}}</span>
                  </multiselect>
               
                </div>
                <p
                  class="ml-2 sub_heading"
                  style="margin-top: 8px; margin-bottom: 0px; margin-left: 10px"
                >
                  {{tlt('webhook_return_variable_label')}} :
                </p>
                <div class="col-sm-3 p-0 ml-2" style="text-align: center">
                  <input
                    id="webhook_variable_id"
                    class="form-control input-tag"
                    style="width: 100%; padding: 0.375rem 0.5rem"
                    :placeholder="tlt('enter_variable_eg')"
                    type="text"
                    v-model="webhook_variable"
                    :style="
                      webhook_variable.length > 0
                        ? 'padding-left:19px !important;'
                        : 'padding: 0.375rem 0.5rem !important'
                    "
                  />
                  <span v-if="webhook_variable.length > 0" class="unit">$</span>
                </div>
                <span
                  style="margin-left: 0px; color: #0645ad"
                  class="my-auto ml-2"
                >
                  <i
                    class="fa fa-info-circle"
                    aria-hidden="true"
                    style="font-size: 16px"
                    title="To avoid overide always use unique webhook return variable"
                  >
                  </i>
                </span>
              </div>
              <div
                :class="
                  Boolean(webhook_mapping.length > 0)
                    ? 'custom-button-box px-3 py-2 pt-0 mt-3 mb-3'
                    : ''
                "
              >
                <div v-show="webhook_mapping.length > 0">
                  <!-- <hr style="margin: 10px 0px" /> -->
                  <div
                    v-if="is_webhook"
                    class="d-flex mb-1"
                    style="text-align: center"
                  >
                    <div class="col-sm-6">{{tlt('add_parameter_key_label')}}</div>
                    <div class="col-sm-6">{{tlt('add_parameter_value_label')}}</div>
                  </div>
                  <hr style="margin: 10px 0px !important" />
                  <div v-if="is_webhook">
                    <div
                      class="col-sm-12 p-0 d-flex form-group"
                      v-for="(params, index) in webhook_mapping"
                      :key="index"
                    >
                      <div class="col-sm-6 pr-2 p-0">
                        <input
                          class="form-control input-tag"
                          style="width: 100%; padding: 0.375rem 0.5rem"
                          :placeholder="tlt('enter_name')"
                          type="text"
                          v-model="params.key"
                        />
                      </div>
                      <div class="col-sm-6 pl-2 p-0 d-flex">
                        <input
                          class="form-control input-tag"
                          style="width: 100%; padding: 0.375rem 0.5rem"
                          :placeholder="tlt('enter_value_eg')"
                          type="text"
                          v-model="params.value"
                        />
                        <span
                          style="cursor: pointer"
                          @click="add_to_webhook_mapping('remove', index)"
                          class="close ml-2 my-auto"
                          title="Delete Parameter"
                        >
                          &times;
                        </span>
                      </div>
                    </div>
                    <!-- <div>
                    <div class="d-flex">
                    <h5>Return Variable : </h5>
                    <h5 class="pl-1">{{webhook_variable}}</h5>
                    <div class="ml-auto" style="padding-right: 15px;">
                    <span
                      style="float: right; cursor: pointer; font-size: 14px"
                      class="muted"
                    >
                      <a
                        data-toggle="modal"
                        href="#webhookmodal"
                        @click="
                          on_open_webhook_modal(webhook_variable)
                        "
                      >
                        <i title="Customize Webhook Response" class="fas fa-cog"></i>
                      </a>
                    </span>
                  </div>
                    </div>
                  </div> -->
                    <!-- <hr style="margin: 10px 0px" /> -->
                  </div>
                </div>
                <div class="mt-2 d-flex">
                  <p
                    class="sub_heading"
                    style="margin-top: 3px; margin-bottom: 5px"
                  >
                    {{tlt('add_parameter_btn_label')}}
                  </p>
                  <button
                    style="
                      cursor: pointer;
                      border: none;
                      background: transparent url('@portal/assets/img/plus.png')
                        0% 0% no-repeat padding-box;
                      height: 29px;
                      margin-left: 10px;
                    "
                    @click="add_to_webhook_mapping('add')"
                  >
                    <img src="/img/black_plus.png" alt="" />
                  </button>
                </div>
              </div>
            </div>
            <hr />
            <div class="form-group d-flex">
              <h5 class="mr-2 p-0">{{tlt('notification_header')}}</h5>
              <p class="text-muted p-0 mb-0" style="margin-top: 3px !important">
                {{tlt('notification_help_text')}}
              </p>
              <label
                class="switch ml-auto"
                style="margin-top: 4px; margin-bottom: 0px"
              >
                <input
                  type="checkbox"
                  v-model="is_notification"
                  id="notifications_required"
                />
                <span class="slider round" style="border-radius: 50px"></span>
              </label>
            </div>
            <div v-if="is_notification">
              <!-- <hr style="margin: 10px 0px" /> -->
              <div class="custom-box">
                <!-- <hr style="margin: 10px 0px" /> -->
                <div class="d-flex mb-1" style="text-align: center">
                  <div class="col-sm-3">{{tlt('notification_type_label')}}</div>
                  <div class="col-sm-3">
                    {{tlt('variable_name_label')}}
                    <span
                      style="margin-left: 12px; color: #0645ad"
                      class="my-auto"
                    >
                      <i
                        class="fa fa-info-circle"
                        aria-hidden="true"
                        style="font-size: 16px"
                        title="the value here should be the value of 'Save it as' of any slots used to capture email/sms. Example $email_id."
                      >
                      </i>
                    </span>
                  </div>
                  <div class="col-sm-3">{{tlt('check_for_template_label')}}</div>
                  <div class="col-sm-2">{{tlt('response_id_label')}}</div>
                </div>
                <hr style="margin: 10px 0px !important" />
                <div class="col-sm-12 p-0 d-flex form-group">
                  <div class="col-sm-3 p-0">
                    <div>
                      <multiselect
                        v-model="notifications.notify[0].type"
                        :options="notifications_notify_type_list"
                        :close-on-select="true"
                        :clear-on-select="false"
                        :preserve-search="true"
                        :show-labels="false"
                        :allow-empty="false"
                        :placeholder="tlt('notification_type')"
                        open-direction="bottom"
                        :searchable="true"
                        style="height: 30px; padding: 0px"
                        id="notifications_notify_type_id"
                      >
                      </multiselect>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div>
                      <multiselect
                        :close-on-select="true"
                        v-model="notifications.notify[0].slot"
                        :options="insert_slot_variable_options"
                        :placeholder="tlt('select_option')"
                        :show-labels="false"
                        :clear-on-select="false"
                        open-direction="top"
                        :max-height="120"
                        :searchable="true"
                        :allow-empty="false"
                        :preserve-search="true"
                        @open="add_to_insert_slot_variable_options"
                        @tag="addTag"
                        :taggable="true"
                        tag-position="top"
                        tag-placeholder="Add this as new value"
                      >
                        <span slot="noResult">{{tlt('no_variable_found_text')}}</span>
                      </multiselect>
                    </div>
                    <!-- <input
                      class="form-control input-tag"
                      style="width: 100%; padding: 0.375rem 0.5rem"
                      placeholder="Enter variable e.g.$email_id"
                      type="text"
                      v-model="notifications.notify[0].slot"
                    /> -->
                  </div>
                  <div class="col-sm-3 p-0">
                    <div>
                      <multiselect
                        v-model="notifications.notify[0].template_name"
                        :options="
                          notifications_notify_template_list.map((name) => {
                            return name.template_name;
                          })
                        "
                        :close-on-select="true"
                        :clear-on-select="false"
                        :preserve-search="true"
                        :show-labels="false"
                        :allow-empty="false"
                        :placeholder="tlt('search_template_name')"
                        open-direction="bottom"
                        :searchable="true"
                        :loading="is_loading"
                        @search-change="search_template_name"
                        @input="
                          set_notifications_notify_template_id(
                            notifications.notify[0].template_name
                          )
                        "
                        style="height: 30px; padding: 0px"
                        id="notifications_notify_template_id"
                      >
                        <!-- <span slot="noOptions"></span> -->
                        <span slot="noResult">No Template found.</span>
                      </multiselect>
                    </div>
                  </div>
                  <div class="col-sm-2" style="text-align: center">
                    <input
                      id="notifications_responses_id"
                      class="form-control input-tag"
                      style="width: 100%; padding: 0.375rem 0.5rem"
                      :placeholder="tlt('response_id')"
                      type="text"
                      v-model="notifications.responses"
                      :disabled="true"
                    />
                  </div>
                  <div class="col-sm-1 pr-0">
                    <div class="col-sm-12 d-flex p-0">
                      <div
                        class="col-sm-12 p-0 px-auto"
                        style="padding-top: 8px !important"
                      >
                        <span
                          style="float: right; cursor: pointer; font-size: 14px"
                          class="muted"
                        >
                          <a
                            data-toggle="modal"
                            href="#notificationmodal"
                            @click="on_open_notification_modal()"
                          >
                            <i
                              title="Customize Notification"
                              class="fas fa-cog"
                            ></i>
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <hr /> -->
              </div>
            </div>
            <hr />
            <div class="form-group">
                <div class="mt-1 mb-1 d-flex"> 
                 <h5 style="margin-top: 6px; margin-bottom: 5px">
                {{tlt('assistant_response_header')}}
                </h5>
                <span class="ml-3 mt-2"  style="color: #df7474;">* html content/tags are not supported on whatsapp and messenger bot.</span>
              </div>
              <div
                v-for="(new_response, index) in filtered_assistant_response"
                :key="index"
                class="form-group"
              >
                <div v-if="new_response.type == 'text'" class="custom-box">
                  <span
                    style="float: right; cursor: pointer; font-size: 14px"
                    @click="add_to_assistant_response_list('remove', new_response.id)"
                    class="btn btn-light"
                    title="Remove Response"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </span>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    class="btn btn-light"
                    :disabled="index === filtered_assistant_response.length-1"
                    :style="index === filtered_assistant_response.length-1 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        filtered_assistant_response[index+1].id,
                        'filter_assistance'
                      )
                    "
                    title="Move down"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    :disabled="index === 0"
                    :style="index === 0 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        filtered_assistant_response[index-1].id,
                        'filter_assistance'
                      )
                    "
                    class="btn btn-light"
                    title="Move Up"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#273679" class="bi bi-chevron-up" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                  </button>
                  <p class="sub_heading">
                    {{tlt('assist_resp_text_response_header')}} : {{ new_response.id }}
                  </p>
                  <div>
                    <div
                      v-for="(response, num) in new_response.values"
                      :key="num"
                      class="form-group"
                    >
                      <div class="d-flex">
                        <input
                          class="form-control input-tag"
                          :placeholder="tlt('response_text')"
                          style="width: 100%; padding: 0.375rem 0.5rem"
                          type="text"
                          v-model="new_response.values[num]"
                          :id="
                            'assistance_response_' +
                            new_response.id +
                            '_' +
                            num
                          "
                          @focusout="
                            insert_variable_block_off(new_response.id, num)
                          "
                          @focusin="
                            insert_variable_block_on(new_response.id, num)
                          "
                        />
                        <div
                          style="opacity: 0"
                          :id="
                            'insert_variable_block' +
                            new_response.id +
                            '_' +
                            num
                          "
                        >
                          <a
                            @click="
                              set_assistance_response_index(
                                new_response.id,
                                num
                              )
                            "
                            class="example fa-stack fa-1x"
                            id="insert_variable_button"
                            type="button"
                            data-toggle="modal"
                            data-target="#insert_variable_modal"
                            style="margin-top: 20px !important"
                          >
                            <i
                              class="fas fa-circle fa-stack-2x"
                              style="color: #dbe2e8"
                              :id="
                                'insert_variable_circle_' +
                                new_response.id +
                                '_' +
                                num
                              "
                            >
                            </i>
                            <span
                              class="fa fa-stack-1x"
                              style="color: white"
                              @mouseover="
                                circle_mouseover(new_response.id, num)
                              "
                              @mouseout="
                                circle_mouseout(new_response.id, num)
                              "
                            >
                              <span style="font-size: 14px; display: block">
                                {...}
                              </span>
                            </span>
                          </a>
                        </div>
                        <!-- v-on:keyup.enter="
                            add_to_assistant_response_text_list('add', new_response.id)
                          " -->
                        <span
                          style="margin-left: 12px; color: #0645ad"
                          class="my-auto"
                          v-if="
                            check_slot_value_use_in_response(
                              new_response.values[num]
                            )
                          "
                        >
                          <i
                            class="fa fa-info-circle"
                            aria-hidden="true"
                            style="font-size: 16px"
                            title="You have used {} in the response, which is used to access slot value, i.e it would add the value gathered by slot if enabled in previous or current node. (example: Email: {$email_id} would print Email: test@mail.com)."
                          >
                          </i>
                        </span>
                        <span
                          v-if="new_response.values.length > 1"
                          title="Remove Text Response"
                          class="close my-auto"
                          style="cursor: pointer; margin-left: 12px"
                          @click="
                            add_to_assistant_response_text_list(
                              'remove',
                              new_response.id,
                              num
                            )
                          "
                        >
                          &times;
                        </span>
                      </div>
                    </div>
                    <div class="d-flex">
                      <p style="margin-top: 6px; margin-bottom: 5px">
                        {{tlt('assist_resp_add_value_btn')}}
                      </p>
                      <button
                        style="
                          cursor: pointer;
                          border: none;
                          background: transparent
                            url('@portal/assets/img/plus.png') 0% 0% no-repeat
                            padding-box;
                        "
                        @click="
                          add_to_assistant_response_text_list('add', new_response.id)
                        "
                      >
                        <img src="/img/black_plus.png" alt="" />
                      </button>
                    </div>
                    <div class="response-variations">
                      <span
                        >Response variations are set to
                        <strong>{{ new_response.variation }}</strong
                        >.</span
                      >
                      Set to
                      <a
                        @click="
                          select_response_variation(index, 'sequential')
                        "
                        v-show="new_response.variation != 'sequential'"
                        href="javascript:void(0);"
                        class="response-variation"
                      >
                        sequential
                      </a>
                      <span v-show="new_response.variation != 'sequential'"
                        >|</span
                      >
                      <a
                        @click="select_response_variation(index, 'multiline')"
                        v-show="new_response.variation != 'multiline'"
                        href="javascript:void(0);"
                        class="variation-multiline"
                      >
                        multiline
                      </a>
                      <span
                        v-show="
                          new_response.variation != 'random' &&
                          new_response.variation != 'multiline'
                        "
                        >|</span
                      >
                      <a
                        @click="select_response_variation(index, 'random')"
                        v-show="new_response.variation != 'random'"
                        href="javascript:void(0);"
                        class="variation-random"
                      >
                        random
                      </a>
                    </div>
                  </div>
                </div>
                <div v-if="new_response.type == 'image'" class="custom-box">
                  <span
                    style="float: right; cursor: pointer; font-size: 14px"
                    @click="add_to_assistant_response_list('remove', new_response.id)"
                    class="btn btn-light"
                    title="Remove Response"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </span>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    class="btn btn-light"
                    :disabled="index === filtered_assistant_response.length-1"
                    :style="index === filtered_assistant_response.length-1 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        filtered_assistant_response[index+1].id,
                        'filter_assistance'
                      )
                    "
                    title="Move down"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    :disabled="index === 0"
                    :style="index === 0 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        filtered_assistant_response[index-1].id,
                        'filter_assistance'
                      )
                    "
                    class="btn btn-light"
                    title="Move Up"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#273679" class="bi bi-chevron-up" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                  </button>
                  <p class="sub_heading">
                    {{tlt('assist_resp_img_response_header')}} : {{ new_response.id }}
                  </p>
                  <!-- <p>Enter Name (Optional)</p>
                      <input class="form-control input-tag" type="text" v-model="new_response.image_name"> -->
                  <!-- <p class="mb-0">Image source :</p> -->
                  <div>
                    <input
                      class="form-control input-tag"
                      style="width: 100%; padding: 0.375rem 0.5rem"
                      :placeholder="tlt('add_img_url')"
                      type="text"
                      v-model="new_response.source"
                    />
                    <p
                      v-show="
                        check_image_url(new_response.source) == false &&
                        Boolean(new_response.source)
                      "
                      style="
                        color: red !important;
                        margin-bottom: 0px !important;
                        padding-top: 8px !important;
                      "
                    >
                      {{tlt('assist_resp_card_response_image_condition_text')}}
                    </p>
                  </div>
                </div>
                <div v-if="new_response.type == 'video'" class="custom-box">
                  <span
                    style="float: right; cursor: pointer; font-size: 14px"
                    @click="add_to_assistant_response_list('remove', new_response.id)"
                    class="btn btn-light"
                    title="Remove Response"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </span>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    class="btn btn-light"
                    :disabled="index === filtered_assistant_response.length-1"
                    :style="index === filtered_assistant_response.length-1 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        filtered_assistant_response[index+1].id,
                        'filter_assistance'
                      )
                    "
                    title="Move down"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    :disabled="index === 0"
                    :style="index === 0 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        filtered_assistant_response[index-1].id,
                        'filter_assistance'
                      )
                    "
                    class="btn btn-light"
                    title="Move Up"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#273679" class="bi bi-chevron-up" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                  </button>
                  <p class="sub_heading">
                    {{tlt('assist_resp_video_response_header')}} : {{ new_response.id }}
                  </p>
                  <div>
                    <input
                      class="form-control input-tag"
                      style="width: 100%; padding: 0.375rem 0.5rem"
                      :placeholder="tlt('add_video_url')"
                      type="text"
                      v-model.trim="new_response.source"
                    />
                    <p
                      v-show="
                        check_video_url(new_response.source) === false &&
                        Boolean(new_response.source)
                      "
                      style="
                        color: red !important;
                        margin-bottom: 0px !important;
                        padding-top: 8px !important;
                      "
                    >
                      {{tlt('card_response_video_condition_text')}}
                    </p>
                  </div>
                </div>
                <div v-if="new_response.type == 'choices'" class="custom-box">
                  <span
                    style="float: right; cursor: pointer; font-size: 14px"
                    @click="add_to_assistant_response_list('remove', new_response.id)"
                    class="btn btn-light"
                    title="Remove Response"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </span>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    class="btn btn-light"
                    :disabled="index === filtered_assistant_response.length-1"
                    :style="index === filtered_assistant_response.length-1 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        filtered_assistant_response[index+1].id,
                        'filter_assistance'
                      )
                    "
                    title="Move down"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    :disabled="index === 0"
                    :style="index === 0 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        filtered_assistant_response[index-1].id,
                        'filter_assistance'
                      )
                    "
                    class="btn btn-light"
                    title="Move Up"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#273679" class="bi bi-chevron-up" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                  </button>
                  <p class="sub_heading">
                    {{tlt('assist_resp_choice_response_header')}} : {{ new_response.id }}
                  </p>
                  <div>
                    <template>
                      <div style="display: block; margin-bottom: 1rem">
                        <div
                          v-for="(response, num) in new_response.choices"
                          :key="num"
                          class="d-flex mb-2"
                        >
                          <div class="input-group" style="display: block">
                            <div class="d-flex">
                              <input
                                type="text"
                                v-model.trim="response.title"
                                class="form-control input-tag"
                                :placeholder="tlt('enter_title')"
                                maxlength="50"
                                style="
                                  width: 100% !important;
                                  padding: 0.375rem 0.5rem;
                                  border-radius: 5px 0px 0px 5px !important;
                                "
                              />
                              <input
                                type="text"
                                v-model.trim="response.payload"
                                @input="check_first_char"
                                class="form-control input-tag intent-list-field"
                                :placeholder="
                                  change_btn_value_placeholder(response.type)
                                "
                                style="
                                  width: 100% !important;
                                  padding: 0.375rem 0.5rem;
                                  border-radius: 0px !important;
                                "
                                list = "select-intent-choice"
                                name="intent-choice"
                              />
                              <datalist id="select-intent-choice" v-if="response.type == 'postback' && show_intent_list"
                               style=""
                              >
                                <option
                                  v-for="(
                                    option, index
                                  ) in intent_list_choice_card"
                                  :key="index"
                                  :value="option"
                                >
                                  {{ option }}
                                </option>
                              </datalist>
                              <div class="input-group-append">
                                <select
                                  class="form-control"
                                  v-model="response.type"
                                  style="
                                    width: 100px !important;
                                    height: 38px;
                                    padding: 0px !important;
                                  "
                                  id="button_type_list_id"
                                >
                                  <option
                                    v-for="(
                                      option, index
                                    ) in button_type_list"
                                    :key="index"
                                    :value="option.value"
                                  >
                                    {{ option.name }}
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <span
                            style="cursor: pointer; float: right"
                            class="close my-auto mr-0 ml-2"
                            title="Remove Choice Response"
                            v-if="new_response.choices.length > 1"
                            @click="
                              add_to_assistant_response_choice_list(
                                'remove',
                                new_response.id,
                                num
                              )
                            "
                          >
                            &times;</span
                          >
                        </div>
                      </div>
                    </template>
                    <div class="d-flex">
                      <p style="margin-top: 6px; margin-bottom: 5px">
                        {{tlt('assist_resp_add_choice_btn')}}
                      </p>
                      <button
                        style="
                          cursor: pointer;
                          border: none;
                          background: transparent
                            url('@portal/assets/img/plus.png') 0% 0% no-repeat
                            padding-box;
                        "
                        @click="
                          add_to_assistant_response_choice_list(
                            'add',
                            new_response.id
                          )
                        "
                      >
                        <img src="/img/black_plus.png" alt="" />
                      </button>
                    </div>
                  </div>
                </div>
                <div v-if="new_response.type == 'card'" class="custom-box">
                  <span
                    style="float: right; cursor: pointer; font-size: 14px"
                    @click="add_to_assistant_response_list('remove', new_response.id)"
                    class="btn btn-light"
                    title="Remove Response"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </span>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    class="btn btn-light"
                    :disabled="index === filtered_assistant_response.length-1"
                    :style="index === filtered_assistant_response.length-1 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        filtered_assistant_response[index+1].id,
                        'filter_assistance'
                      )
                    "
                    title="Move down"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    :disabled="index === 0"
                    :style="index === 0 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        filtered_assistant_response[index-1].id,
                        'filter_assistance'
                      )
                    "
                    class="btn btn-light"
                    title="Move Up"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#273679" class="bi bi-chevron-up" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                  </button>
                  <p class="sub_heading">
                    {{tlt('assist_resp_card_response_header')}} : {{ new_response.id }}
                  </p>
                  <div>
                    <template>
                      <div class="row">
                        <div
                          v-for="(response, num) in new_response.card_list"
                          :key="num"
                          class="col-sm-4 pb-3"
                        >
                          <div class="card">
                            <div class="card-body">
                              <p
                                class="sub_heading_carousel"
                                style="color: dimgray; margin-bottom: 5px"
                              >
                                {{tlt('assist_resp_card_response_card_label')}} : {{ num + 1 }}
                              </p>
                              <span
                                style="
                                  cursor: pointer;
                                  float: right;
                                  margin-top: -29px;
                                "
                                class="close ml-auto mr-0"
                                title="Remove Card Response"
                                v-if="new_response.card_list.length > 1"
                                @click="
                                  add_to_assistant_response_carousel_card_list(
                                    'remove',
                                    new_response.id,
                                    num
                                  )
                                "
                              >
                                &times;</span
                              >
                              <div>
                                <div class="d-sm-flex justify-content-start">
                                  <h6
                                    class="label_header"
                                    style="margin-top: 0"
                                  >
                                    {{tlt('assist_resp_card_response_file_type_label')}}:
                                  </h6>
                                  <div class="radio my-auto radio-label">
                                    <label style="font-size: 13px">
                                      <input
                                        type="radio"
                                        v-model="response.is_image"
                                        :value="true"
                                        id="carousel_img"
                                      />
                                      <span
                                        class="icn"
                                        id="filter_portal_user_radio"
                                      ></span>
                                      {{tlt('assist_resp_card_response_image_label')}}
                                    </label>
                                    <label style="font-size: 13px">
                                      <input
                                        type="radio"
                                        v-model="response.is_image"
                                        :value="false"
                                        id="carousel_video"
                                      />
                                      <span class="icn"></span> {{tlt('assist_resp_card_response_video_label')}}
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div v-if="response.is_image">
                                <input
                                  class="form-control input-tag"
                                  style="
                                    width: 100%;
                                    padding: 0.375rem 0.5rem;
                                  "
                                  :placeholder="tlt('img_url')"
                                  type="text"
                                  v-model="response.image"
                                />
                                <p
                                  v-show="
                                    check_image_url(response.image) ===
                                      false && Boolean(response.image)
                                  "
                                  style="
                                    color: red !important;
                                    margin-bottom: 0px !important;
                                    padding-top: 8px !important;
                                  "
                                >
                                  {{tlt('assist_resp_card_response_image_condition_text')}}
                                </p>
                              </div>
                              <div v-else>
                                <input
                                  type="text"
                                  v-model.trim="response.video"
                                  class="form-control input-tag"
                                  :placeholder="tlt('video_url')"
                                  style="
                                    width: 100% !important;
                                    padding: 0.375rem 0.5rem;
                                  "
                                />
                                <p
                                  v-show="
                                    check_video_url(response.video) ===
                                      false && Boolean(response.video)
                                  "
                                  style="
                                    color: red !important;
                                    margin-bottom: 0px !important;
                                    padding-top: 8px !important;
                                  "
                                >
                                  {{tlt('card_response_video_condition_text')}}
                                </p>
                              </div>
                              <label class="label_header">{{tlt('assist_resp_card_response_title_label')}}</label>
                              <input
                                type="text"
                                v-model.trim="response.title"
                                class="form-control input-tag"
                                :placeholder="tlt('enter_title')"
                                style="
                                  width: 100% !important;
                                  padding: 0.375rem 0.5rem;
                                "
                              />
                              <label class="label_header">{{tlt('assist_resp_card_response_desc_label')}}</label>
                              <textarea
                                type="text"
                                v-model.trim="response.text"
                                class="form-control input-tag textarea-style"
                                rows="3"
                                cols="20"
                                :placeholder="tlt('enter_description')"
                                style="resize: none"
                              ></textarea>
                              <div>
                                <p class="label_header">{{tlt('assist_resp_card_response_button_label')}}</p>
                                <div class="ScrollStyle">
                                  <div
                                    v-for="(
                                      button, btn_num
                                    ) in response.buttons"
                                    :key="btn_num"
                                    class="mb-2"
                                  >
                                    <div class="d-flex">
                                      <div
                                        class="input-group"
                                        style="display: block"
                                      >
                                        <div class="d-flex">
                                          <input
                                            type="text"
                                            v-model.trim="button.title"
                                            class="form-control input-tag"
                                            :placeholder="tlt('enter_title')"
                                            maxlength="50"
                                            style="
                                              width: 100% !important;
                                              padding: 0.375rem 0.5rem;
                                              border-radius: 5px 0px 0px 5px !important;
                                            "
                                          />
                                          <input
                                            type="text"
                                            v-model.trim="button.value"
                                            @input="check_first_char"
                                            class="form-control input-tag intent-list-field"
                                            :placeholder="
                                              change_btn_value_placeholder(
                                                button.type
                                              )
                                            "
                                            style="
                                              width: 100% !important;
                                              padding: 0.375rem 0.5rem;
                                              border-radius: 0px !important;
                                            "
                                            list = "select-intent-choice"
                                            name="intent-choice"
                                          />
                                          <datalist id="select-intent-choice" v-if="button.type == 'postback' && show_intent_list"
                                            style=""
                                            >
                                              <option
                                                v-for="(
                                                  option, index
                                                ) in intent_list_choice_card"
                                                :key="index"
                                                :value="option"
                                              >
                                                {{ option }}
                                              </option>
                                          </datalist>
                                          <div class="input-group-append">
                                            <select
                                              class="form-control"
                                              v-model="button.type"
                                              style="
                                                width: 20px !important;
                                                height: 38px;
                                                padding: 0px !important;
                                              "
                                              id="button_type_list_id"
                                            >
                                              <option
                                                v-for="(
                                                  option, index
                                                ) in button_type_list"
                                                :key="index"
                                                :value="option.value"
                                              >
                                                {{ option.name }}
                                              </option>
                                            </select>
                                          </div>
                                        </div>
                                      </div>
                                      <span
                                        style="
                                          cursor: pointer;
                                          float: right;
                                          margin-top: 8px;
                                        "
                                        class="close mx-1"
                                        title="Remove Button Response"
                                        v-if="response.buttons.length > 1"
                                        @click="
                                          add_to_assistant_response_carousel_card_button_list(
                                            'remove',
                                            new_response.id,
                                            num,
                                            btn_num
                                          )
                                        "
                                      >
                                        &times;</span
                                      >
                                    </div>
                                  </div>
                                </div>
                                <div class="d-flex">
                                  <p
                                    style="
                                      margin-top: 6px;
                                      margin-bottom: 5px;
                                    "
                                  >
                                    {{tlt('assist_resp_card_response_add_btn_label')}}
                                  </p>
                                  <button
                                    style="
                                      cursor: pointer;
                                      border: none;
                                      background: transparent
                                        url('@portal/assets/img/plus.png') 0%
                                        0% no-repeat padding-box;
                                    "
                                    @click="
                                      add_to_assistant_response_carousel_card_button_list(
                                        'add',
                                        new_response.id,
                                        num
                                      )
                                    "
                                  >
                                    <img src="/img/black_plus.png" alt="" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                    <div class="d-flex">
                      <p style="margin-top: 6px; margin-bottom: 5px">
                        {{tlt('assist_resp_card_response_add_card_label')}}
                      </p>
                      <button
                        style="
                          cursor: pointer;
                          border: none;
                          background: transparent
                            url('@portal/assets/img/plus.png') 0% 0% no-repeat
                            padding-box;
                        "
                        @click="
                          add_to_assistant_response_carousel_card_list(
                            'add',
                            new_response.id
                          )
                        "
                      >
                        <img src="/img/black_plus.png" alt="" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div style="margin-left: 1rem !important" class="d-flex">
                <p class="sub_heading my-0">{{tlt('response_type_first_label')}} :</p>
                <select
                  class="form-control input-tag"
                  v-model="selected_response_type"
                  style="
                    width: 100px;
                    height: 25px;
                    margin-left: 10px;
                    padding: 0px;
                  "
                  id="res_n_int_source"
                >
                  <option
                    v-for="(option, index) in assistant_response_type"
                    :key="index"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
                <!-- </div> -->
                <!-- <div class="d-flex"> -->
                <p class="sub_heading my-0" style="margin-left: 20px">
                  {{tlt('assist_resp_add_response_btn')}}
                </p>
                <button
                  style="
                    cursor: pointer;
                    border: none;
                    background: transparent url('@portal/assets/img/plus.png')
                      0% 0% no-repeat padding-box;
                  "
                  @click="add_to_assistant_response_list('add')"
                >
                  <img src="/img/black_plus.png" alt="" />
                </button>
              </div>
            </div>
            <hr />
            <div class="form-group">
              <div class="d-flex">
                <h5 class="mr-2 p-0">{{tlt('dialog_flow_assist_should_label')}}</h5>
                <p
                  class="text-muted p-0 mb-0"
                  style="margin-top: 3px !important"
                >
                  {{tlt('dialog_flow_assist_should_help_text')}}
                </p>
              </div>
              <div class="d-flex" style="margin-left: 1rem !important">
                <select
                  class="form-control input-tag"
                  v-model="save_then_assistant_should"
                  @click="set_next_step()"
                  style="width: 120px; height: 30px; padding: 0px"
                  id="res_n_int_source"
                >
                  <option value="" disabled selected>{{tlt('select_option_label')}}</option>
                  <option
                    v-for="(option, index) in then_assistant_should"
                    :key="index"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
                <select
                  class="form-control input-tag"
                  v-if="save_then_assistant_should == 'jump_to'"
                  v-model="jump_to_node_id"
                  @click="set_next_step()"
                  style="
                    width: 120px;
                    height: 30px;
                    margin-left: 10px;
                    padding: 0px;
                  "
                  id="res_n_int_source"
                >
                  <option value="" disabled selected>{{tlt('select_node_label')}}</option>
                  <option
                    v-for="(option, index) in updated_node_list"
                    :key="index"
                    :value="option.id"
                  >
                    {{ option.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="card-act modal-footer">
            <!-- These conditions for saving node defines that we are adding child node/editing a node OR adding a new root node -->
            <button
              v-if="is_show_edit"
              type="button"
              @click="editNode"
              class="darkblue-btn"
              id="save_changes_btn"
            >
              {{tlt('save_changes_main_btn')}}
            </button>
            <button v-else type="button" @click="addNode" class="darkblue-btn" id="save_changes_btn">
              {{tlt('Save_btn_label')}}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="slotmodal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="slotmodal"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 style="font-style: regular" class="modal-title">
              {{tlt('slots_config_slot_header')}} {{ edit_slot_index }}
            </h5>
            <button
              type="button"
              @click="on_close_slots_modal()"
              class="close"
              data-dismiss="modal"
              aria-hidden="true"
            >
              ×
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <h5 style="margin-top: 6px; margin-bottom: 5px">
                {{tlt('slots_assistant_response_header')}}
              </h5>
              <div
                v-for="(
                  new_response, index
                ) in unfilled_slot_assistant_response"
                :key="index"
                class="form-group"
              >
                <div v-if="new_response.type == 'text'" class="custom-box">
                  <span
                    style="float: right; cursor: pointer; font-size: 14px"
                    @click="
                      remove_slot_to_assistant_response(
                        new_response.id,
                        new_response.recognizes,
                        'slotmodal'
                      )
                    "
                    class="btn btn-light"
                    title="Remove Response"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </span>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    class="btn btn-light"
                    :disabled="index === unfilled_slot_assistant_response.length-1"
                    :style="index === unfilled_slot_assistant_response.length-1 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        unfilled_slot_assistant_response[index+1].id,
                        'slot_modal'
                      )
                    "
                    title="Move down"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    :disabled="index === 0"
                    :style="index === 0 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        unfilled_slot_assistant_response[index-1].id,
                        'slot_modal'
                      )
                    "
                    class="btn btn-light"
                    title="Move Up"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#273679" class="bi bi-chevron-up" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                  </button>
                  <p class="sub_heading">
                    {{tlt('sots_text_response_header')}} : {{ new_response.id }}
                  </p>
                  <div>
                    <div
                      v-for="(response, num) in new_response.values"
                      :key="num"
                      class="form-group"
                    >
                      <div class="d-flex">
                        <input
                          class="form-control input-tag"
                          :placeholder="tlt('response_text')"
                          style="width: 100%; padding: 0.375rem 0.5rem"
                          type="text"
                          v-model="new_response.values[num]"
                          :id="
                            'assistance_response_' + new_response.id + '_' + num
                          "
                          @focusout="
                            insert_variable_block_off(new_response.id, num)
                          "
                          @focusin="
                            insert_variable_block_on(new_response.id, num)
                          "
                          v-on:keyup.enter="
                            add_to_assistant_response_text_list(
                              'add',
                              new_response.id
                            )
                          "
                        />
                        <div
                          style="opacity: 0"
                          :id="
                            'insert_variable_block' +
                            new_response.id +
                            '_' +
                            num
                          "
                        >
                          <a
                            @click="
                              set_assistance_response_index(
                                new_response.id,
                                num
                              )
                            "
                            class="example fa-stack fa-1x"
                            id="insert_variable_button"
                            type="button"
                            data-toggle="modal"
                            data-target="#insert_variable_modal"
                            style="margin-top: 20px !important"
                          >
                            <i
                              class="fas fa-circle fa-stack-2x"
                              style="color: #dbe2e8"
                              :id="
                                'insert_variable_circle_' +
                                new_response.id +
                                '_' +
                                num
                              "
                            >
                            </i>
                            <span
                              class="fa fa-stack-1x"
                              style="color: white"
                              @mouseover="
                                circle_mouseover(new_response.id, num)
                              "
                              @mouseout="circle_mouseout(new_response.id, num)"
                            >
                              <span style="font-size: 14px; display: block">
                                {...}
                              </span>
                            </span>
                          </a>
                        </div>
                        <span
                          style="margin-left: 12px; color: #0645ad"
                          class="my-auto"
                          v-if="
                            check_slot_value_use_in_response(
                              new_response.values[num]
                            )
                          "
                        >
                          <i
                            class="fa fa-info-circle"
                            aria-hidden="true"
                            style="font-size: 16px"
                            title="You have used {} in the response, which is used to access slot value, i.e it would add the value gathered by slot if enabled in previous or current node. (example: Email: {$email_id} would print Email: test@mail.com)."
                          >
                          </i>
                        </span>
                        <span
                          v-if="new_response.values.length > 1"
                          title="Remove Text Response"
                          class="close my-auto"
                          style="cursor: pointer; margin-left: 12px"
                          @click="
                            add_to_assistant_response_text_list(
                              'remove',
                              new_response.id,
                              num
                            )
                          "
                        >
                          &times;
                        </span>
                      </div>
                    </div>
                    <div class="d-flex">
                      <p style="margin-top: 6px; margin-bottom: 5px">
                        {{tlt('slots_add_value_btn')}}
                      </p>
                      <button
                        style="
                          cursor: pointer;
                          border: none;
                          background: transparent
                            url('@portal/assets/img/plus.png') 0% 0% no-repeat
                            padding-box;
                        "
                        @click="
                          add_to_assistant_response_text_list(
                            'add',
                            new_response.id
                          )
                        "
                      >
                        <img src="/img/black_plus.png" alt="" />
                      </button>
                    </div>
                    <div class="response-variations">
                      <span
                        >{{tlt('response_variation_text1')}}
                        <strong>{{ new_response.variation }}</strong
                        >.</span
                      >
                      {{tlt('response_variation_text2')}}
                      <a
                        @click="
                          select_response_variation(
                            new_response.id,
                            'sequential'
                          )
                        "
                        v-show="new_response.variation != 'sequential'"
                        href="javascript:void(0);"
                        class="response-variation"
                      >
                        {{tlt('response_variation_text3')}}
                      </a>
                      <span v-show="new_response.variation != 'sequential'">
                        |
                      </span>
                      <a
                        @click="
                          select_response_variation(
                            new_response.id,
                            'multiline'
                          )
                        "
                        v-show="new_response.variation != 'multiline'"
                        href="javascript:void(0);"
                        class="variation-multiline"
                      >
                        {{tlt('response_variation_text4')}}
                      </a>
                      <span
                        v-show="
                          new_response.variation != 'random' &&
                          new_response.variation != 'multiline'
                        "
                      >
                        |
                      </span>
                      <a
                        @click="
                          select_response_variation(new_response.id, 'random')
                        "
                        v-show="new_response.variation != 'random'"
                        href="javascript:void(0);"
                        class="variation-random"
                      >
                        {{tlt('response_variation_text5')}}
                      </a>
                    </div>
                  </div>
                </div>
                <div v-if="new_response.type == 'image'" class="custom-box">
                  <span
                    style="float: right; cursor: pointer; font-size: 14px"
                    @click="
                      remove_slot_to_assistant_response(
                        new_response.id,
                        new_response.recognizes,
                        'slotmodal'
                      )
                    "
                    class="btn btn-light"
                    title="Remove Response"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </span>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    class="btn btn-light"
                    :disabled="index === unfilled_slot_assistant_response.length-1"
                    :style="index === unfilled_slot_assistant_response.length-1 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        unfilled_slot_assistant_response[index+1].id,
                        'slot_modal'
                      )
                    "
                    title="Move down"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    :disabled="index === 0"
                    :style="index === 0 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        unfilled_slot_assistant_response[index-1].id,
                        'slot_modal'
                      )
                    "
                    class="btn btn-light"
                    title="Move Up"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#273679" class="bi bi-chevron-up" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                  </button>
                  <p class="sub_heading">Image Response : {{ new_response.id }}</p>
                  <div>
                    <input
                      class="form-control input-tag"
                      style="width: 100%; padding: 0.375rem 0.5rem"
                      :placeholder="tlt('add_img_url')"
                      type="text"
                      v-model="new_response.source"
                    />
                    <p
                      v-show="
                        check_image_url(new_response.source) == false &&
                        Boolean(new_response.source)
                      "
                      style="
                        color: red !important;
                        margin-bottom: 0px !important;
                        padding-top: 8px !important;
                      "
                    >
                      {{tlt('slots_img_condition_text')}}
                    </p>
                  </div>
                </div>
                <div v-if="new_response.type == 'video'" class="custom-box">
                  <span
                    style="float: right; cursor: pointer; font-size: 14px"
                    @click="
                      remove_slot_to_assistant_response(
                        new_response.id,
                        new_response.recognizes,
                        'slotmodal'
                      )
                    "
                    class="btn btn-light"
                    title="Remove Response"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </span>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    class="btn btn-light"
                    :disabled="index === unfilled_slot_assistant_response.length-1"
                    :style="index === unfilled_slot_assistant_response.length-1 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        unfilled_slot_assistant_response[index+1].id,
                        'slot_modal'
                      )
                    "
                    title="Move down"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    :disabled="index === 0"
                    :style="index === 0 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        unfilled_slot_assistant_response[index-1].id,
                        'slot_modal'
                      )
                    "
                    class="btn btn-light"
                    title="Move Up"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#273679" class="bi bi-chevron-up" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                  </button>
                  <p class="sub_heading">
                    {{tlt('sots_video_response_header')}} : {{ new_response.id }}
                  </p>
                  <div>
                    <input
                      class="form-control input-tag"
                      style="width: 100%; padding: 0.375rem 0.5rem"
                      :placeholder="tlt('add_video_url')"
                      type="text"
                      v-model.trim="new_response.source"
                    />
                    <p
                      v-show="
                        check_video_url(new_response.source) === false &&
                        Boolean(new_response.source)
                      "
                      style="
                        color: red !important;
                        margin-bottom: 0px !important;
                        padding-top: 8px !important;
                      "
                    >
                      {{tlt('slots_video_condition_text')}}
                    </p>
                  </div>
                </div>
                <div v-if="new_response.type == 'choices'" class="custom-box">
                  <span
                    style="float: right; cursor: pointer; font-size: 14px"
                    @click="
                      remove_slot_to_assistant_response(
                        new_response.id,
                        new_response.recognizes,
                        'slotmodal'
                      )
                    "
                    class="btn btn-light"
                    title="Remove Response"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </span>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    class="btn btn-light"
                    :disabled="index === unfilled_slot_assistant_response.length-1"
                    :style="index === unfilled_slot_assistant_response.length-1 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        unfilled_slot_assistant_response[index+1].id,
                        'slot_modal'
                      )
                    "
                    title="Move down"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    :disabled="index === 0"
                    :style="index === 0 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        unfilled_slot_assistant_response[index-1].id,
                        'slot_modal'
                      )
                    "
                    class="btn btn-light"
                    title="Move Up"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#273679" class="bi bi-chevron-up" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                  </button>
                  <p class="sub_heading">
                    {{tlt('sots_choice_response_header')}} : {{ new_response.id }}
                  </p>
                  <div>
                    <template>
                      <div style="display: block; margin-bottom: 1rem">
                        <div
                          v-for="(response, num) in new_response.choices"
                          :key="num"
                          class="d-flex mb-2"
                        >
                          <div class="input-group" style="display: block">
                            <div class="d-flex">
                              <input
                                type="text"
                                v-model.trim="response.title"
                                class="form-control input-tag"
                                :placeholder="tlt('enter_title')"
                                maxlength="50"
                                style="
                                  width: 100% !important;
                                  padding: 0.375rem 0.5rem;
                                  border-radius: 5px 0px 0px 5px !important;
                                "
                              />
                              <input
                                type="text"
                                v-model.trim="response.payload"
                                class="form-control input-tag"
                                :placeholder="
                                  change_btn_value_placeholder(response.type)
                                "
                                style="
                                  width: 100% !important;
                                  padding: 0.375rem 0.5rem;
                                  border-radius: 0px !important;
                                "
                              />
                              <div class="input-group-append">
                                <select
                                  class="form-control"
                                  v-model="response.type"
                                  style="
                                    width: 100px !important;
                                    height: 38px;
                                    padding: 0px !important;
                                  "
                                  id="button_type_list_id"
                                >
                                  <option
                                    v-for="(option, index) in button_type_list"
                                    :key="index"
                                    :value="option.value"
                                  >
                                    {{ option.name }}
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <span
                            style="cursor: pointer; float: right"
                            class="close my-auto mr-0 ml-2"
                            title="Remove Choice Response"
                            v-if="new_response.choices.length > 1"
                            @click="
                              add_to_assistant_response_choice_list(
                                'remove',
                                new_response.id,
                                num
                              )
                            "
                          >
                            &times;</span
                          >
                        </div>
                      </div>
                    </template>
                    <div class="d-flex">
                      <p style="margin-top: 6px; margin-bottom: 5px">
                        {{tlt('sots_add_choice_btn')}}
                      </p>
                      <button
                        style="
                          cursor: pointer;
                          border: none;
                          background: transparent
                            url('@portal/assets/img/plus.png') 0% 0% no-repeat
                            padding-box;
                        "
                        @click="
                          add_to_assistant_response_choice_list(
                            'add',
                            new_response.id
                          )
                        "
                      >
                        <img src="/img/black_plus.png" alt="" />
                      </button>
                    </div>
                  </div>
                </div>
                <div v-if="new_response.type == 'card'" class="custom-box">
                  <span
                    style="float: right; cursor: pointer; font-size: 14px"
                    @click="
                      remove_slot_to_assistant_response(
                        new_response.id,
                        new_response.recognizes,
                        'slotmodal'
                      )
                    "
                    class="btn btn-light"
                    title="Remove Response"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </span>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    class="btn btn-light"
                    :disabled="index === unfilled_slot_assistant_response.length-1"
                    :style="index === unfilled_slot_assistant_response.length-1 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        unfilled_slot_assistant_response[index+1].id,
                        'slot_modal'
                      )
                    "
                    title="Move down"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    :disabled="index === 0"
                    :style="index === 0 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        unfilled_slot_assistant_response[index-1].id,
                        'slot_modal'
                      )
                    "
                    class="btn btn-light"
                    title="Move Up"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#273679" class="bi bi-chevron-up" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                  </button>
                  <p class="sub_heading">
                    {{tlt('sots_card_response_header')}} : {{ new_response.id }}
                  </p>
                  <div>
                    <template>
                      <div class="row">
                        <div
                          v-for="(response, num) in new_response.card_list"
                          :key="num"
                          class="col-sm-4 pb-3"
                        >
                          <div class="card">
                            <div class="card-body">
                              <p
                                class="sub_heading_carousel"
                                style="color: dimgray; margin-bottom: 5px"
                              >
                                {{tlt('card_response_card_label')}} : {{ num + 1 }}
                              </p>
                              <span
                                style="
                                  cursor: pointer;
                                  float: right;
                                  margin-top: -29px;
                                "
                                class="close ml-auto mr-0"
                                title="Remove Card Response"
                                v-if="new_response.card_list.length > 1"
                                @click="
                                  add_to_assistant_response_carousel_card_list(
                                    'remove',
                                    new_response.id,
                                    num
                                  )
                                "
                              >
                                &times;</span
                              >
                              <div>
                                <div class="d-sm-flex justify-content-start">
                                  <h6
                                    class="label_header"
                                    style="margin-top: 0"
                                  >
                                    {{tlt('card_response_file_type_label')}}:
                                  </h6>
                                  <div class="radio my-auto radio-label">
                                    <label style="font-size: 13px">
                                      <input
                                        type="radio"
                                        v-model="response.is_image"
                                        :value="true"
                                        id="carousel_img"
                                      />
                                      <span
                                        class="icn"
                                        id="filter_portal_user_radio"
                                      ></span>
                                      {{tlt('card_response_image_label')}}
                                    </label>
                                    <label style="font-size: 13px">
                                      <input
                                        type="radio"
                                        v-model="response.is_image"
                                        :value="false"
                                        id="carousel_video"
                                      />
                                      <span class="icn"></span> {{tlt('card_response_video_label')}}
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div v-if="response.is_image">
                                <input
                                  class="form-control input-tag"
                                  style="width: 100%; padding: 0.375rem 0.5rem"
                                  :placeholder="tlt('img_url')"
                                  type="text"
                                  v-model="response.image"
                                />
                                <p
                                  v-show="
                                    check_image_url(response.image) === false &&
                                    Boolean(response.image)
                                  "
                                  style="
                                    color: red !important;
                                    margin-bottom: 0px !important;
                                    padding-top: 8px !important;
                                  "
                                >
                                 {{tlt('card_response_image_condition_text')}}
                                </p>
                              </div>
                              <div v-else>
                                <input
                                  type="text"
                                  v-model.trim="response.video"
                                  class="form-control input-tag"
                                  :placeholder="tlt('video_url')"
                                  style="
                                    width: 100% !important;
                                    padding: 0.375rem 0.5rem;
                                  "
                                />
                                <p
                                  v-show="
                                    check_video_url(response.video) === false &&
                                    Boolean(response.video)
                                  "
                                  style="
                                    color: red !important;
                                    margin-bottom: 0px !important;
                                    padding-top: 8px !important;
                                  "
                                >
                                  {{tlt('card_response_video_condition_text')}}
                                </p>
                              </div>
                              <label class="label_header">{{tlt('card_response_title_label')}}</label>
                              <input
                                type="text"
                                v-model.trim="response.title"
                                class="form-control input-tag"
                                :placeholder="tlt('enter_title')"
                                style="
                                  width: 100% !important;
                                  padding: 0.375rem 0.5rem;
                                "
                              />
                              <label class="label_header">{{tlt('card_response_desc_label')}}</label>
                              <textarea
                                type="text"
                                v-model.trim="response.text"
                                class="form-control input-tag textarea-style"
                                rows="3"
                                cols="20"
                                :placeholder="tlt('enter_description')"
                                style="resize: none"
                              ></textarea>
                              <div>
                                <p class="label_header">{{tlt('card_response_button_label')}}</p>
                                <!-- <div class="custom-button-box px-3 py-2 pt-0 mt-3 mb-3"> -->
                                <div class="ScrollStyle">
                                  <div
                                    v-for="(
                                      button, btn_num
                                    ) in response.buttons"
                                    :key="btn_num"
                                    class="mb-2"
                                  >
                                    <div class="d-flex">
                                      <div
                                        class="input-group"
                                        style="display: block"
                                      >
                                        <div class="d-flex">
                                          <input
                                            type="text"
                                            v-model.trim="button.title"
                                            class="form-control input-tag"
                                            :placeholder="tlt('enter_title')"
                                            maxlength="50"
                                            style="
                                              width: 100% !important;
                                              padding: 0.375rem 0.5rem;
                                              border-radius: 5px 0px 0px 5px !important;
                                            "
                                          />
                                          <input
                                            type="text"
                                            v-model.trim="button.value"
                                            class="form-control input-tag"
                                            :placeholder="
                                              change_btn_value_placeholder(
                                                button.type
                                              )
                                            "
                                            style="
                                              width: 100% !important;
                                              padding: 0.375rem 0.5rem;
                                              border-radius: 0px !important;
                                            "
                                          />
                                          <div class="input-group-append">
                                            <select
                                              class="form-control"
                                              v-model="button.type"
                                              style="
                                                width: 20px !important;
                                                height: 38px;
                                                padding: 0px !important;
                                              "
                                              id="button_type_list_id"
                                            >
                                              <option
                                                v-for="(
                                                  option, index
                                                ) in button_type_list"
                                                :key="index"
                                                :value="option.value"
                                              >
                                                {{ option.name }}
                                              </option>
                                            </select>
                                          </div>
                                        </div>
                                      </div>
                                      <span
                                        style="
                                          cursor: pointer;
                                          float: right;
                                          margin-top: 8px;
                                        "
                                        class="close mx-1"
                                        title="Remove Button Response"
                                        v-if="response.buttons.length > 1"
                                        @click="
                                          add_to_assistant_response_carousel_card_button_list(
                                            'remove',
                                            new_response.id,
                                            num,
                                            btn_num
                                          )
                                        "
                                      >
                                        &times;</span
                                      >
                                    </div>
                                  </div>
                                </div>
                                <div class="d-flex">
                                  <p
                                    style="margin-top: 6px; margin-bottom: 5px"
                                  >
                                    {{tlt('card_response_add_btn_label')}}
                                  </p>
                                  <button
                                    style="
                                      cursor: pointer;
                                      border: none;
                                      background: transparent
                                        url('@portal/assets/img/plus.png') 0% 0%
                                        no-repeat padding-box;
                                    "
                                    @click="
                                      add_to_assistant_response_carousel_card_button_list(
                                        'add',
                                        new_response.id,
                                        num
                                      )
                                    "
                                  >
                                    <img src="/img/black_plus.png" alt="" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                    <div class="d-flex">
                      <p style="margin-top: 6px; margin-bottom: 5px">
                        {{tlt('card_response_add_card_label')}}
                      </p>
                      <button
                        style="
                          cursor: pointer;
                          border: none;
                          background: transparent
                            url('@portal/assets/img/plus.png') 0% 0% no-repeat
                            padding-box;
                        "
                        @click="
                          add_to_assistant_response_carousel_card_list(
                            'add',
                            new_response.id
                          )
                        "
                      >
                        <img src="/img/black_plus.png" alt="" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex" style="margin-left: 1rem !important">
                <p class="sub_heading">{{tlt('slots_response_type_first_label')}} :</p>
                <select
                  class="form-control input-tag"
                  v-model="selected_response_type"
                  style="
                    width: 100px;
                    height: 25px;
                    margin-left: 10px;
                    padding: 0px;
                  "
                  id="res_n_int_source"
                >
                  <option
                    v-for="(option, index) in assistant_response_type"
                    :key="index"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
                <p class="sub_heading" style="margin-left: 20px">
                  {{tlt('slots_add_response_btn')}}
                </p>
                <button
                  style="
                    margin-top: -14px;
                    cursor: pointer;
                    border: none;
                    background: transparent url('@portal/assets/img/plus.png')
                      0% 0% no-repeat padding-box;
                  "
                  @click="
                    add_slot_to_assistant_response(
                      'Addbtn',
                      'unused',
                      edit_slot_check_for,
                      edit_slot_slot_variable,
                      null,
                      'unfilled_slot'
                    )
                  "
                >
                  <img src="/img/black_plus.png" alt="" />
                </button>
              </div>
            </div>
            <div v-if="is_validation_entity" class="form-group">
              <hr />
              <h5 style="margin-top: 6px; margin-bottom: 5px">
                {{tlt('assist_validate_response_header')}}
              </h5>
              <div
                v-for="(
                  new_response, index
                ) in validation_slot_assistant_response"
                :key="index"
                class="form-group"
              >
                <div v-if="new_response.type == 'text'" class="custom-box">
                  <span
                    style="float: right; cursor: pointer; font-size: 14px"
                    @click="
                      remove_slot_to_assistant_response(
                        new_response.id,
                        new_response.recognizes,
                        'slotmodal'
                      )
                    "
                    class="btn btn-light"
                    title="Remove Response"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </span>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    class="btn btn-light"
                    :disabled="index === validation_slot_assistant_response.length-1"
                    :style="index === validation_slot_assistant_response.length-1 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        validation_slot_assistant_response[index+1].id,
                        'slot_modal'
                      )
                    "
                    title="Move down"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    :disabled="index === 0"
                    :style="index === 0 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        validation_slot_assistant_response[index-1].id,
                        'slot_modal'
                      )
                    "
                    class="btn btn-light"
                    title="Move Up"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#273679" class="bi bi-chevron-up" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                  </button>
                  <p class="sub_heading">
                    {{tlt('assist_validate_text_response_header')}} : {{ new_response.id }}
                  </p>
                  <div>
                    <div
                      v-for="(response, num) in new_response.values"
                      :key="num"
                      class="form-group"
                    >
                      <div class="d-flex">
                        <input
                          class="form-control input-tag"
                          :placeholder="tlt('response_text')"
                          style="width: 100%; padding: 0.375rem 0.5rem"
                          type="text"
                          v-model="new_response.values[num]"
                          :id="
                            'assistance_response_' + new_response.id + '_' + num
                          "
                          @focusout="
                            insert_variable_block_off(new_response.id, num)
                          "
                          @focusin="
                            insert_variable_block_on(new_response.id, num)
                          "
                          v-on:keyup.enter="
                            add_to_assistant_response_text_list(
                              'add',
                              new_response.id
                            )
                          "
                        />
                        <div
                          style="opacity: 0"
                          :id="
                            'insert_variable_block' +
                            new_response.id +
                            '_' +
                            num
                          "
                        >
                          <a
                            @click="
                              set_assistance_response_index(
                                new_response.id,
                                num
                              )
                            "
                            class="example fa-stack fa-1x"
                            id="insert_variable_button"
                            type="button"
                            data-toggle="modal"
                            data-target="#insert_variable_modal"
                            style="margin-top: 20px !important"
                          >
                            <i
                              class="fas fa-circle fa-stack-2x"
                              style="color: #dbe2e8"
                              :id="
                                'insert_variable_circle_' +
                                new_response.id +
                                '_' +
                                num
                              "
                            >
                            </i>
                            <span
                              class="fa fa-stack-1x"
                              style="color: white"
                              @mouseover="
                                circle_mouseover(new_response.id, num)
                              "
                              @mouseout="circle_mouseout(new_response.id, num)"
                            >
                              <span style="font-size: 14px; display: block">
                                {...}
                              </span>
                            </span>
                          </a>
                        </div>
                        <span
                          style="margin-left: 12px; color: #0645ad"
                          class="my-auto"
                          v-if="
                            check_slot_value_use_in_response(
                              new_response.values[num]
                            )
                          "
                        >
                          <i
                            class="fa fa-info-circle"
                            aria-hidden="true"
                            style="font-size: 16px"
                            title="You have used {} in the response, which is used to access slot value, i.e it would add the value gathered by slot if enabled in previous or current node. (example: Email: {$email_id} would print Email: test@mail.com)."
                          >
                          </i>
                        </span>
                        <span
                          v-if="new_response.values.length > 1"
                          title="Remove Text Response"
                          class="close my-auto"
                          style="cursor: pointer; margin-left: 12px"
                          @click="
                            add_to_assistant_response_text_list(
                              'remove',
                              new_response.id,
                              num
                            )
                          "
                        >
                          &times;
                        </span>
                      </div>
                    </div>
                    <div class="d-flex">
                      <p style="margin-top: 6px; margin-bottom: 5px">
                        {{tlt('assist_validate_response_header')}}
                      </p>
                      <button
                        style="
                          cursor: pointer;
                          border: none;
                          background: transparent
                            url('@portal/assets/img/plus.png') 0% 0% no-repeat
                            padding-box;
                        "
                        @click="
                          add_to_assistant_response_text_list(
                            'add',
                            new_response.id
                          )
                        "
                      >
                        <img src="/img/black_plus.png" alt="" />
                      </button>
                    </div>
                    <div class="response-variations">
                      <span
                        >{{tlt('response_variation_text1')}}
                        <strong>{{ new_response.variation }}</strong
                        >.</span
                      >
                      {{tlt('response_variation_text2')}}
                      <a
                        @click="
                          select_response_variation(
                            new_response.id,
                            'sequential'
                          )
                        "
                        v-show="new_response.variation != 'sequential'"
                        href="javascript:void(0);"
                        class="response-variation"
                      >
                        {{tlt('response_variation_text3')}}
                      </a>
                      <span v-show="new_response.variation != 'sequential'">
                        |
                      </span>
                      <a
                        @click="
                          select_response_variation(
                            new_response.id,
                            'multiline'
                          )
                        "
                        v-show="new_response.variation != 'multiline'"
                        href="javascript:void(0);"
                        class="variation-multiline"
                      >
                        {{tlt('response_variation_text4')}}
                      </a>
                      <span
                        v-show="
                          new_response.variation != 'random' &&
                          new_response.variation != 'multiline'
                        "
                      >
                        |
                      </span>
                      <a
                        @click="
                          select_response_variation(new_response.id, 'random')
                        "
                        v-show="new_response.variation != 'random'"
                        href="javascript:void(0);"
                        class="variation-random"
                      >
                        {{tlt('response_variation_text5')}}
                      </a>
                    </div>
                  </div>
                </div>
                <div v-if="new_response.type == 'image'" class="custom-box">
                  <span
                    style="float: right; cursor: pointer; font-size: 14px"
                    @click="
                      remove_slot_to_assistant_response(
                        new_response.id,
                        new_response.recognizes,
                        'slotmodal'
                      )
                    "
                    class="btn btn-light"
                    title="Remove Response"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </span>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    class="btn btn-light"
                    :disabled="index === validation_slot_assistant_response.length-1"
                    :style="index === validation_slot_assistant_response.length-1 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        validation_slot_assistant_response[index+1].id,
                        'slot_modal'
                      )
                    "
                    title="Move down"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    :disabled="index === 0"
                    :style="index === 0 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        validation_slot_assistant_response[index-1].id,
                        'slot_modal'
                      )
                    "
                    class="btn btn-light"
                    title="Move Up"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#273679" class="bi bi-chevron-up" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                  </button>
                  <p class="sub_heading">Image Response : {{ new_response.id }}</p>
                  <div>
                    <input
                      class="form-control input-tag"
                      style="width: 100%; padding: 0.375rem 0.5rem"
                      :placeholder="tlt('add_img_url')"
                      type="text"
                      v-model="new_response.source"
                    />
                    <p
                      v-show="
                        check_image_url(new_response.source) == false &&
                        Boolean(new_response.source)
                      "
                      style="
                        color: red !important;
                        margin-bottom: 0px !important;
                        padding-top: 8px !important;
                      "
                    >
                      {{tlt('assist_validate_image_condition_text')}}
                    </p>
                  </div>
                </div>
                <div v-if="new_response.type == 'video'" class="custom-box">
                  <span
                    style="float: right; cursor: pointer; font-size: 14px"
                    @click="
                      remove_slot_to_assistant_response(
                        new_response.id,
                        new_response.recognizes,
                        'slotmodal'
                      )
                    "
                    class="btn btn-light"
                    title="Remove Response"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </span>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    class="btn btn-light"
                    :disabled="index === validation_slot_assistant_response.length-1"
                    :style="index === validation_slot_assistant_response.length-1 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        validation_slot_assistant_response[index+1].id,
                        'slot_modal'
                      )
                    "
                    title="Move down"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    :disabled="index === 0"
                    :style="index === 0 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        validation_slot_assistant_response[index-1].id,
                        'slot_modal'
                      )
                    "
                    class="btn btn-light"
                    title="Move Up"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#273679" class="bi bi-chevron-up" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                  </button>
                  <p class="sub_heading">
                    {{tlt('assist_validate_video_response_header')}} : {{ new_response.id }}
                  </p>
                  <div>
                    <input
                      class="form-control input-tag"
                      style="width: 100%; padding: 0.375rem 0.5rem"
                      :placeholder="tlt('add_video_url')"
                      type="text"
                      v-model.trim="new_response.source"
                    />
                    <p
                      v-show="
                        check_video_url(new_response.source) === false &&
                        Boolean(new_response.source)
                      "
                      style="
                        color: red !important;
                        margin-bottom: 0px !important;
                        padding-top: 8px !important;
                      "
                    >
                      {{tlt('assist_validate_video_condition_text')}}
                    </p>
                  </div>
                </div>
                <div v-if="new_response.type == 'choices'" class="custom-box">
                  <span
                    style="float: right; cursor: pointer; font-size: 14px"
                    @click="
                      remove_slot_to_assistant_response(
                        new_response.id,
                        new_response.recognizes,
                        'slotmodal'
                      )
                    "
                    class="btn btn-light"
                    title="Remove Response"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </span>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    class="btn btn-light"
                    :disabled="index === validation_slot_assistant_response.length-1"
                    :style="index === validation_slot_assistant_response.length-1 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        validation_slot_assistant_response[index+1].id,
                        'slot_modal'
                      )
                    "
                    title="Move down"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    :disabled="index === 0"
                    :style="index === 0 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        validation_slot_assistant_response[index-1].id,
                        'slot_modal'
                      )
                    "
                    class="btn btn-light"
                    title="Move Up"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#273679" class="bi bi-chevron-up" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                  </button>
                  <p class="sub_heading">
                    {{tlt('assist_validate_choice_response_header')}} : {{ new_response.id }}
                  </p>
                  <div>
                    <template>
                      <div style="display: block; margin-bottom: 1rem">
                        <div
                          v-for="(response, num) in new_response.choices"
                          :key="num"
                          class="d-flex mb-2"
                        >
                          <div class="input-group" style="display: block">
                            <div class="d-flex">
                              <input
                                type="text"
                                v-model.trim="response.title"
                                class="form-control input-tag"
                                :placeholder="tlt('enter_title')"
                                maxlength="50"
                                style="
                                  width: 100% !important;
                                  padding: 0.375rem 0.5rem;
                                  border-radius: 5px 0px 0px 5px !important;
                                "
                              />
                              <input
                                type="text"
                                v-model.trim="response.payload"
                                class="form-control input-tag"
                                :placeholder="
                                  change_btn_value_placeholder(response.type)
                                "
                                style="
                                  width: 100% !important;
                                  padding: 0.375rem 0.5rem;
                                  border-radius: 0px !important;
                                "
                              />
                              <div class="input-group-append">
                                <select
                                  class="form-control"
                                  v-model="response.type"
                                  style="
                                    width: 100px !important;
                                    height: 38px;
                                    padding: 0px !important;
                                  "
                                  id="button_type_list_id"
                                >
                                  <option
                                    v-for="(option, index) in button_type_list"
                                    :key="index"
                                    :value="option.value"
                                  >
                                    {{ option.name }}
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <span
                            style="cursor: pointer; float: right"
                            class="close my-auto mr-0 ml-2"
                            title="Remove Choice Response"
                            v-if="new_response.choices.length > 1"
                            @click="
                              add_to_assistant_response_choice_list(
                                'remove',
                                new_response.id,
                                num
                              )
                            "
                          >
                            &times;</span
                          >
                        </div>
                      </div>
                    </template>
                    <div class="d-flex">
                      <p style="margin-top: 6px; margin-bottom: 5px">
                        {{tlt('assist_validate_add_choice_btn')}}
                      </p>
                      <button
                        style="
                          cursor: pointer;
                          border: none;
                          background: transparent
                            url('@portal/assets/img/plus.png') 0% 0% no-repeat
                            padding-box;
                        "
                        @click="
                          add_to_assistant_response_choice_list(
                            'add',
                            new_response.id
                          )
                        "
                      >
                        <img src="/img/black_plus.png" alt="" />
                      </button>
                    </div>
                  </div>
                </div>
                <div v-if="new_response.type == 'card'" class="custom-box">
                  <span
                    style="float: right; cursor: pointer; font-size: 14px"
                    @click="
                      remove_slot_to_assistant_response(
                        new_response.id,
                        new_response.recognizes,
                        'slotmodal'
                      )
                    "
                    class="btn btn-light"
                    title="Remove Response"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </span>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    class="btn btn-light"
                    :disabled="index === validation_slot_assistant_response.length-1"
                    :style="index === validation_slot_assistant_response.length-1 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        validation_slot_assistant_response[index+1].id,
                        'slot_modal'
                      )
                    "
                    title="Move down"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    :disabled="index === 0"
                    :style="index === 0 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        validation_slot_assistant_response[index-1].id,
                        'slot_modal'
                      )
                    "
                    class="btn btn-light"
                    title="Move Up"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#273679" class="bi bi-chevron-up" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                  </button>
                  <p class="sub_heading">
                    {{tlt('assist_validate_card_response_header')}} : {{ new_response.id }}
                  </p>
                  <div>
                    <template>
                      <div class="row">
                        <div
                          v-for="(response, num) in new_response.card_list"
                          :key="num"
                          class="col-sm-4 pb-3"
                        >
                          <div class="card">
                            <div class="card-body">
                              <p
                                class="sub_heading_carousel"
                                style="color: dimgray; margin-bottom: 5px"
                              >
                                {{tlt('assist_validate_card_response_card_label')}} : {{ num + 1 }}
                              </p>
                              <span
                                style="
                                  cursor: pointer;
                                  float: right;
                                  margin-top: -29px;
                                "
                                class="close ml-auto mr-0"
                                title="Remove Card Response"
                                v-if="new_response.card_list.length > 1"
                                @click="
                                  add_to_assistant_response_carousel_card_list(
                                    'remove',
                                    new_response.id,
                                    num
                                  )
                                "
                              >
                                &times;</span
                              >
                              <div>
                                <div class="d-sm-flex justify-content-start">
                                  <h6
                                    class="label_header"
                                    style="margin-top: 0"
                                  >
                                    {{tlt('assist_validate_card_response_file_type_label')}}:
                                  </h6>
                                  <div class="radio my-auto radio-label">
                                    <label style="font-size: 13px">
                                      <input
                                        type="radio"
                                        v-model="response.is_image"
                                        :value="true"
                                        id="carousel_img"
                                      />
                                      <span
                                        class="icn"
                                        id="filter_portal_user_radio"
                                      ></span>
                                      {{tlt('assist_validate_card_response_image_label')}}
                                    </label>
                                    <label style="font-size: 13px">
                                      <input
                                        type="radio"
                                        v-model="response.is_image"
                                        :value="false"
                                        id="carousel_video"
                                      />
                                      <span class="icn"></span> {{tlt('assist_validate_card_response_video_label')}}
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div v-if="response.is_image">
                                <input
                                  class="form-control input-tag"
                                  style="width: 100%; padding: 0.375rem 0.5rem"
                                  :placeholder="tlt('img_url')"
                                  type="text"
                                  v-model="response.image"
                                />
                                <p
                                  v-show="
                                    check_image_url(response.image) === false &&
                                    Boolean(response.image)
                                  "
                                  style="
                                    color: red !important;
                                    margin-bottom: 0px !important;
                                    padding-top: 8px !important;
                                  "
                                >
                                  {{tlt('assist_validate_response_image_condition_text')}}
                                </p>
                              </div>
                              <div v-else>
                                <input
                                  type="text"
                                  v-model.trim="response.video"
                                  class="form-control input-tag"
                                  :placeholder="tlt('video_url')"
                                  style="
                                    width: 100% !important;
                                    padding: 0.375rem 0.5rem;
                                  "
                                />
                                <p
                                  v-show="
                                    check_video_url(response.video) === false &&
                                    Boolean(response.video)
                                  "
                                  style="
                                    color: red !important;
                                    margin-bottom: 0px !important;
                                    padding-top: 8px !important;
                                  "
                                >
                                  {{tlt('assist_validate_card_response_video_condition_text')}}
                                </p>
                              </div>
                              <label class="label_header">{{tlt('assist_validate_card_response_title_label')}}</label>
                              <input
                                type="text"
                                v-model.trim="response.title"
                                class="form-control input-tag"
                                :placeholder="tlt('enter_title')"
                                style="
                                  width: 100% !important;
                                  padding: 0.375rem 0.5rem;
                                "
                              />
                              <label class="label_header">{{tlt('assist_validate_card_response_desc_label')}}</label>
                              <textarea
                                type="text"
                                v-model.trim="response.text"
                                class="form-control input-tag textarea-style"
                                rows="3"
                                cols="20"
                                :placeholder="tlt('enter_description')"
                                style="resize: none"
                              ></textarea>
                              <div>
                                <p class="label_header">{{tlt('assist_validate_card_response_button_label')}}</p>
                                <!-- <div class="custom-button-box px-3 py-2 pt-0 mt-3 mb-3"> -->
                                <div class="ScrollStyle">
                                  <div
                                    v-for="(
                                      button, btn_num
                                    ) in response.buttons"
                                    :key="btn_num"
                                    class="mb-2"
                                  >
                                    <div class="d-flex">
                                      <div
                                        class="input-group"
                                        style="display: block"
                                      >
                                        <div class="d-flex">
                                          <input
                                            type="text"
                                            v-model.trim="button.title"
                                            class="form-control input-tag"
                                            :placeholder="tlt('enter_title')"
                                            maxlength="50"
                                            style="
                                              width: 100% !important;
                                              padding: 0.375rem 0.5rem;
                                              border-radius: 5px 0px 0px 5px !important;
                                            "
                                          />
                                          <input
                                            type="text"
                                            v-model.trim="button.value"
                                            class="form-control input-tag"
                                            :placeholder="
                                              change_btn_value_placeholder(
                                                button.type
                                              )
                                            "
                                            style="
                                              width: 100% !important;
                                              padding: 0.375rem 0.5rem;
                                              border-radius: 0px !important;
                                            "
                                          />
                                          <div class="input-group-append">
                                            <select
                                              class="form-control"
                                              v-model="button.type"
                                              style="
                                                width: 20px !important;
                                                height: 38px;
                                                padding: 0px !important;
                                              "
                                              id="button_type_list_id"
                                            >
                                              <option
                                                v-for="(
                                                  option, index
                                                ) in button_type_list"
                                                :key="index"
                                                :value="option.value"
                                              >
                                                {{ option.name }}
                                              </option>
                                            </select>
                                          </div>
                                        </div>
                                      </div>
                                      <span
                                        style="
                                          cursor: pointer;
                                          float: right;
                                          margin-top: 8px;
                                        "
                                        class="close mx-1"
                                        title="Remove Button Response"
                                        v-if="response.buttons.length > 1"
                                        @click="
                                          add_to_assistant_response_carousel_card_button_list(
                                            'remove',
                                            new_response.id,
                                            num,
                                            btn_num
                                          )
                                        "
                                      >
                                        &times;</span
                                      >
                                    </div>
                                  </div>
                                </div>
                                <div class="d-flex">
                                  <p
                                    style="margin-top: 6px; margin-bottom: 5px"
                                  >
                                    {{tlt('assist_validate_card_response_add_btn_label')}}
                                  </p>
                                  <button
                                    style="
                                      cursor: pointer;
                                      border: none;
                                      background: transparent
                                        url('@portal/assets/img/plus.png') 0% 0%
                                        no-repeat padding-box;
                                    "
                                    @click="
                                      add_to_assistant_response_carousel_card_button_list(
                                        'add',
                                        new_response.id,
                                        num
                                      )
                                    "
                                  >
                                    <img src="/img/black_plus.png" alt="" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                    <div class="d-flex">
                      <p style="margin-top: 6px; margin-bottom: 5px">
                        {{tlt('assist_validate_card_response_add_card_label')}}
                      </p>
                      <button
                        style="
                          cursor: pointer;
                          border: none;
                          background: transparent
                            url('@portal/assets/img/plus.png') 0% 0% no-repeat
                            padding-box;
                        "
                        @click="
                          add_to_assistant_response_carousel_card_list(
                            'add',
                            new_response.id
                          )
                        "
                      >
                        <img src="/img/black_plus.png" alt="" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex" style="margin-left: 1rem !important">
                <p class="sub_heading">{{tlt('assist_validate_response_type_first_label')}} :</p>
                <select
                  class="form-control input-tag"
                  v-model="selected_response_type"
                  style="
                    width: 100px;
                    height: 25px;
                    margin-left: 10px;
                    padding: 0px;
                  "
                  id="res_n_int_source"
                >
                  <option
                    v-for="(option, index) in assistant_response_type"
                    :key="index"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
                <p class="sub_heading" style="margin-left: 20px">
                  {{tlt('assist_validate_add_response_btn')}}
                </p>
                <button
                  style="
                    margin-top: -14px;
                    cursor: pointer;
                    border: none;
                    background: transparent url('@portal/assets/img/plus.png')
                      0% 0% no-repeat padding-box;
                  "
                  @click="
                    add_slot_to_assistant_response(
                      'Addbtn',
                      'unused',
                      edit_slot_check_for,
                      edit_slot_slot_variable,
                      null,
                      'validation_response'
                    )
                  "
                >
                  <img src="/img/black_plus.png" alt="" />
                </button>
              </div>
            </div>
          </div>
          <!-- <div class="modal-footer">
            <a href="#" data-dismiss="modal" class="btn">Close</a>
            <a href="#" class="btn btn-primary">Save changes</a>
          </div> -->
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="webhookmodal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="webhookmodal"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 style="font-style: regular" class="modal-title">
              Configure Webhook Response for : {{ webhook_variable }}
            </h5>
            <button
              type="button"
              @click="on_close_webhook_modal()"
              class="close"
              data-dismiss="modal"
              aria-hidden="true"
            >
              ×
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <h5 style="margin-top: 6px; margin-bottom: 5px">
                {{tlt('slots_assistant_response_header')}}
              </h5>
              <div
                v-for="(new_response, index) in webhook_assistant_response"
                :key="index"
                class="form-group"
              >
                <div v-if="new_response.type == 'text'" class="custom-box">
                  <span
                    style="float: right; cursor: pointer; font-size: 14px"
                    @click="
                      webhook_to_assistant_response(
                        'remove',
                        webhook_variable,
                        new_response.id
                      )
                    "
                    class="btn btn-light"
                    title="Remove Response"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </span>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    class="btn btn-light"
                    :disabled="index === webhook_assistant_response.length-1"
                    :style="index === webhook_assistant_response.length-1 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        webhook_assistant_response[index+1].id,
                        'webhook_modal'
                      )
                    "
                    title="Move down"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    :disabled="index === 0"
                    :style="index === 0 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        webhook_assistant_response[index-1].id,
                        'webhook_modal'
                      )
                    "
                    class="btn btn-light"
                    title="Move Up"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#273679" class="bi bi-chevron-up" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                  </button>
                  <p class="sub_heading">
                    {{tlt('sots_text_response_header')}} : {{ new_response.id }}
                  </p>
                  <div>
                    <div
                      v-for="(response, num) in new_response.values"
                      :key="num"
                      class="form-group"
                    >
                      <div class="d-flex">
                        <input
                          class="form-control input-tag"
                          :placeholder="tlt('response_text')"
                          style="width: 100%; padding: 0.375rem 0.5rem"
                          type="text"
                          v-model="new_response.values[num]"
                          :id="
                            'assistance_response_' + new_response.id + '_' + num
                          "
                          @focusout="
                            insert_variable_block_off(new_response.id, num)
                          "
                          @focusin="
                            insert_variable_block_on(new_response.id, num)
                          "
                        />
                        <div
                          style="opacity: 0"
                          :id="
                            'insert_variable_block' +
                            new_response.id +
                            '_' +
                            num
                          "
                        >
                          <a
                            @click="
                              set_assistance_response_index(
                                new_response.id,
                                num
                              )
                            "
                            class="example fa-stack fa-1x"
                            id="insert_variable_button"
                            type="button"
                            data-toggle="modal"
                            data-target="#insert_variable_modal"
                            style="margin-top: 20px !important"
                          >
                            <i
                              class="fas fa-circle fa-stack-2x"
                              style="color: #dbe2e8"
                              :id="
                                'insert_variable_circle_' +
                                new_response.id +
                                '_' +
                                num
                              "
                            >
                            </i>
                            <span
                              class="fa fa-stack-1x"
                              style="color: white"
                              @mouseover="
                                circle_mouseover(new_response.id, num)
                              "
                              @mouseout="circle_mouseout(new_response.id, num)"
                            >
                              <span style="font-size: 14px; display: block">
                                {...}
                              </span>
                            </span>
                          </a>
                        </div>
                        <!-- v-on:keyup.enter="
                            add_to_assistant_response_text_list(
                              'add',new_response.id)" 
                              -->
                        <span
                          style="margin-left: 12px; color: #0645ad"
                          class="my-auto"
                          v-if="
                            check_slot_value_use_in_response(
                              new_response.values[num]
                            )
                          "
                        >
                          <i
                            class="fa fa-info-circle"
                            aria-hidden="true"
                            style="font-size: 16px"
                            title="You have used {} in the response, which is used to access slot value, i.e it would add the value gathered by slot if enabled in previous or current node. (example: Email: {$email_id} would print Email: test@mail.com)."
                          >
                          </i>
                        </span>
                        <span
                          v-if="new_response.values.length > 1"
                          title="Remove Text Response"
                          class="close my-auto"
                          style="cursor: pointer; margin-left: 12px"
                          @click="
                            add_to_assistant_response_text_list(
                              'remove',
                              new_response.id,
                              num
                            )
                          "
                        >
                          &times;
                        </span>
                      </div>
                    </div>
                    <div class="d-flex">
                      <p style="margin-top: 6px; margin-bottom: 5px">
                        {{tlt('slots_add_value_btn')}}
                      </p>
                      <button
                        style="
                          cursor: pointer;
                          border: none;
                          background: transparent
                            url('@portal/assets/img/plus.png') 0% 0% no-repeat
                            padding-box;
                        "
                        @click="
                          add_to_assistant_response_text_list(
                            'add',
                            new_response.id
                          )
                        "
                      >
                        <img src="/img/black_plus.png" alt="" />
                      </button>
                    </div>
                    <div class="response-variations">
                      <span
                        >{{tlt('response_variation_text1')}}
                        <strong>{{ new_response.variation }}</strong
                        >.</span
                      >
                      {{tlt('response_variation_text2')}}
                      <a
                        @click="
                          select_response_variation(
                            new_response.id,
                            'sequential'
                          )
                        "
                        v-show="new_response.variation != 'sequential'"
                        href="javascript:void(0);"
                        class="response-variation"
                        >{{tlt('response_variation_text3')}}</a
                      >
                      <span v-show="new_response.variation != 'sequential'">
                        |
                      </span>
                      <a
                        @click="
                          select_response_variation(
                            new_response.id,
                            'multiline'
                          )
                        "
                        v-show="new_response.variation != 'multiline'"
                        href="javascript:void(0);"
                        class="variation-multiline"
                        >{{tlt('response_variation_text4')}}</a
                      >
                      <span
                        v-show="
                          new_response.variation != 'random' &&
                          new_response.variation != 'multiline'
                        "
                      >
                        |
                      </span>
                      <a
                        @click="
                          select_response_variation(new_response.id, 'random')
                        "
                        v-show="new_response.variation != 'random'"
                        href="javascript:void(0);"
                        class="variation-random"
                        >{{tlt('response_variation_text5')}}</a
                      >
                    </div>
                  </div>
                </div>
                <div v-if="new_response.type == 'image'" class="custom-box">
                  <span
                    style="float: right; cursor: pointer; font-size: 14px"
                    @click="
                      webhook_to_assistant_response(
                        'remove',
                        webhook_variable,
                        new_response.id
                      )
                    "
                    class="btn btn-light"
                    title="Remove Response"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </span>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    class="btn btn-light"
                    :disabled="index === webhook_assistant_response.length-1"
                    :style="index === webhook_assistant_response.length-1 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        webhook_assistant_response[index+1].id,
                        'webhook_modal'
                      )
                    "
                    title="Move down"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    :disabled="index === 0"
                    :style="index === 0 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        webhook_assistant_response[index-1].id,
                        'webhook_modal'
                      )
                    "
                    class="btn btn-light"
                    title="Move Up"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#273679" class="bi bi-chevron-up" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                  </button>
                  <p class="sub_heading">{{tlt('sots_img_response_header')}} :</p>
                  <div>
                    <input
                      class="form-control input-tag"
                      style="width: 100%; padding: 0.375rem 0.5rem"
                      :placeholder="tlt('add_img_url')"
                      type="text"
                      v-model="new_response.source"
                    />
                    <p
                      v-show="
                        check_image_url(new_response.source) == false &&
                        Boolean(new_response.source)
                      "
                      style="
                        color: red !important;
                        margin-bottom: 0px !important;
                        padding-top: 8px !important;
                      "
                    >
                      {{tlt('slots_img_condition_text')}}
                    </p>
                  </div>
                </div>
                <div v-if="new_response.type == 'video'" class="custom-box">
                  <span
                    style="float: right; cursor: pointer; font-size: 14px"
                    @click="
                      webhook_to_assistant_response(
                        'remove',
                        webhook_variable,
                        new_response.id
                      )
                    "
                    class="btn btn-light"
                    title="Remove Response"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </span>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    class="btn btn-light"
                    :disabled="index === webhook_assistant_response.length-1"
                    :style="index === webhook_assistant_response.length-1 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        webhook_assistant_response[index+1].id,
                        'webhook_modal'
                      )
                    "
                    title="Move down"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    :disabled="index === 0"
                    :style="index === 0 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        webhook_assistant_response[index-1].id,
                        'webhook_modal'
                      )
                    "
                    class="btn btn-light"
                    title="Move Up"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#273679" class="bi bi-chevron-up" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                  </button>
                  <p class="sub_heading">
                    {{tlt('sots_video_response_header')}} : {{ new_response.id }}
                  </p>
                  <div>
                    <input
                      class="form-control input-tag"
                      style="width: 100%; padding: 0.375rem 0.5rem"
                      :placeholder="tlt('add_video_url')"
                      type="text"
                      v-model.trim="new_response.source"
                    />
                    <p
                      v-show="
                        check_video_url(new_response.source) === false &&
                        Boolean(new_response.source)
                      "
                      style="
                        color: red !important;
                        margin-bottom: 0px !important;
                        padding-top: 8px !important;
                      "
                    >
                      {{tlt('slots_video_condition_text')}}
                    </p>
                  </div>
                </div>
                <div v-if="new_response.type == 'choices'" class="custom-box">
                  <span
                    style="float: right; cursor: pointer; font-size: 14px"
                    @click="
                      webhook_to_assistant_response(
                        'remove',
                        webhook_variable,
                        new_response.id
                      )
                    "
                    class="btn btn-light"
                    title="Remove Response"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </span>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    class="btn btn-light"
                    :disabled="index === webhook_assistant_response.length-1"
                    :style="index === webhook_assistant_response.length-1 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        webhook_assistant_response[index+1].id,
                        'webhook_modal'
                      )
                    "
                    title="Move down"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    :disabled="index === 0"
                    :style="index === 0 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        webhook_assistant_response[index-1].id,
                        'webhook_modal'
                      )
                    "
                    class="btn btn-light"
                    title="Move Up"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#273679" class="bi bi-chevron-up" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                  </button>
                  <p class="sub_heading">
                    {{tlt('sots_choice_response_header')}} : {{ new_response.id }}
                  </p>
                  <div>
                    <template>
                      <div style="display: block; margin-bottom: 1rem">
                        <div
                          v-for="(response, num) in new_response.choices"
                          :key="num"
                          class="d-flex mb-2"
                        >
                          <div class="input-group" style="display: block">
                            <div class="d-flex">
                              <input
                                type="text"
                                v-model.trim="response.title"
                                class="form-control input-tag"
                                :placeholder="tlt('enter_title')"
                                maxlength="50"
                                style="
                                  width: 100% !important;
                                  padding: 0.375rem 0.5rem;
                                  border-radius: 5px 0px 0px 5px !important;
                                "
                              />
                              <input
                                type="text"
                                v-model.trim="response.payload"
                                class="form-control input-tag"
                                :placeholder="
                                  change_btn_value_placeholder(response.type)
                                "
                                style="
                                  width: 100% !important;
                                  padding: 0.375rem 0.5rem;
                                  border-radius: 0px !important;
                                "
                              />
                              <div class="input-group-append">
                                <select
                                  class="form-control"
                                  v-model="response.type"
                                  style="
                                    width: 100px !important;
                                    height: 38px;
                                    padding: 0px !important;
                                  "
                                  id="button_type_list_id"
                                >
                                  <option
                                    v-for="(option, index) in button_type_list"
                                    :key="index"
                                    :value="option.value"
                                  >
                                    {{ option.name }}
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <span
                            style="cursor: pointer; float: right"
                            class="close my-auto mr-0 ml-2"
                            title="Remove Choice Response"
                            v-if="new_response.choices.length > 1"
                            @click="
                              add_to_assistant_response_choice_list(
                                'remove',
                                new_response.id,
                                num
                              )
                            "
                          >
                            &times;</span
                          >
                        </div>
                      </div>
                    </template>
                    <div class="d-flex">
                      <p style="margin-top: 6px; margin-bottom: 5px">
                        {{tlt('sots_add_choice_btn')}}
                      </p>
                      <button
                        style="
                          cursor: pointer;
                          border: none;
                          background: transparent
                            url('@portal/assets/img/plus.png') 0% 0% no-repeat
                            padding-box;
                        "
                        @click="
                          add_to_assistant_response_choice_list(
                            'add',
                            new_response.id
                          )
                        "
                      >
                        <img src="/img/black_plus.png" alt="" />
                      </button>
                    </div>
                  </div>
                </div>
                <div v-if="new_response.type == 'card'" class="custom-box">
                  <span
                    style="float: right; cursor: pointer; font-size: 14px"
                    @click="
                      webhook_to_assistant_response(
                        'remove',
                        webhook_variable,
                        new_response.id
                      )
                    "
                    class="btn btn-light"
                    title="Remove Response"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </span>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    class="btn btn-light"
                    :disabled="index === webhook_assistant_response.length-1"
                    :style="index === webhook_assistant_response.length-1 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        webhook_assistant_response[index+1].id,
                        'webhook_modal'
                      )
                    "
                    title="Move down"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    :disabled="index === 0"
                    :style="index === 0 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        webhook_assistant_response[index-1].id,
                        'webhook_modal'
                      )
                    "
                    class="btn btn-light"
                    title="Move Up"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#273679" class="bi bi-chevron-up" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                  </button>
                  <p class="sub_heading">
                    {{tlt('sots_card_response_header')}} : {{ new_response.id }}
                  </p>
                  <div>
                    <template>
                      <div class="row">
                        <div
                          v-for="(response, num) in new_response.card_list"
                          :key="num"
                          class="col-sm-4 pb-3"
                        >
                          <div class="card">
                            <div class="card-body">
                              <p
                                class="sub_heading_carousel"
                                style="color: dimgray; margin-bottom: 5px"
                              >
                                {{tlt('card_response_card_label')}} : {{ num + 1 }}
                              </p>
                              <span
                                style="
                                  cursor: pointer;
                                  float: right;
                                  margin-top: -29px;
                                "
                                class="close ml-auto mr-0"
                                title="Remove Card Response"
                                v-if="new_response.card_list.length > 1"
                                @click="
                                  add_to_assistant_response_carousel_card_list(
                                    'remove',
                                    new_response.id,
                                    num
                                  )
                                "
                              >
                                &times;</span
                              >
                              <div>
                                <div class="d-sm-flex justify-content-start">
                                  <h6
                                    class="label_header"
                                    style="margin-top: 0"
                                  >
                                    {{tlt('card_response_file_type_label')}}:
                                  </h6>
                                  <div class="radio my-auto radio-label">
                                    <label style="font-size: 13px">
                                      <input
                                        type="radio"
                                        v-model="response.is_image"
                                        :value="true"
                                        id="carousel_img"
                                      />
                                      <span
                                        class="icn"
                                        id="filter_portal_user_radio"
                                      ></span>
                                      {{tlt('card_response_image_label')}}
                                    </label>
                                    <label style="font-size: 13px">
                                      <input
                                        type="radio"
                                        v-model="response.is_image"
                                        :value="false"
                                        id="carousel_video"
                                      />
                                      <span class="icn"></span> {{tlt('card_response_video_label')}}
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div v-if="response.is_image">
                                <input
                                  class="form-control input-tag"
                                  style="width: 100%; padding: 0.375rem 0.5rem"
                                  :placeholder="tlt('img_url')"
                                  type="text"
                                  v-model="response.image"
                                />
                                <p
                                  v-show="
                                    check_image_url(response.image) === false &&
                                    Boolean(response.image)
                                  "
                                  style="
                                    color: red !important;
                                    margin-bottom: 0px !important;
                                    padding-top: 8px !important;
                                  "
                                >
                                  {{tlt('card_response_image_condition_text')}}
                                </p>
                              </div>
                              <div v-else>
                                <input
                                  type="text"
                                  v-model.trim="response.video"
                                  class="form-control input-tag"
                                  :placeholder="tlt('video_url')"
                                  style="
                                    width: 100% !important;
                                    padding: 0.375rem 0.5rem;
                                  "
                                />
                                <p
                                  v-show="
                                    check_video_url(response.video) === false &&
                                    Boolean(response.video)
                                  "
                                  style="
                                    color: red !important;
                                    margin-bottom: 0px !important;
                                    padding-top: 8px !important;
                                  "
                                >
                                  {{tlt('card_response_video_condition_text')}}
                                </p>
                              </div>
                              <label class="label_header">{{tlt('card_response_title_label')}}</label>
                              <input
                                type="text"
                                v-model.trim="response.title"
                                class="form-control input-tag"
                                :placeholder="tlt('enter_title')"
                                style="
                                  width: 100% !important;
                                  padding: 0.375rem 0.5rem;
                                "
                              />
                              <label class="label_header">{{tlt('card_response_desc_label')}}</label>
                              <textarea
                                type="text"
                                v-model.trim="response.text"
                                class="form-control input-tag textarea-style"
                                rows="3"
                                cols="20"
                                :placeholder="tlt('enter_description')"
                                style="resize: none"
                              ></textarea>
                              <div>
                                <p class="label_header">{{tlt('card_response_button_label')}}</p>
                                <!-- <div class="custom-button-box px-3 py-2 pt-0 mt-3 mb-3"> -->
                                <div class="ScrollStyle">
                                  <div
                                    v-for="(
                                      button, btn_num
                                    ) in response.buttons"
                                    :key="btn_num"
                                    class="mb-2"
                                  >
                                    <div class="d-flex">
                                      <div
                                        class="input-group"
                                        style="display: block"
                                      >
                                        <div class="d-flex">
                                          <input
                                            type="text"
                                            v-model.trim="button.title"
                                            class="form-control input-tag"
                                            :placeholder="tlt('enter_title')"
                                            maxlength="50"
                                            style="
                                              width: 100% !important;
                                              padding: 0.375rem 0.5rem;
                                              border-radius: 5px 0px 0px 5px !important;
                                            "
                                          />
                                          <input
                                            type="text"
                                            v-model.trim="button.value"
                                            class="form-control input-tag"
                                            :placeholder="
                                              change_btn_value_placeholder(
                                                button.type
                                              )
                                            "
                                            style="
                                              width: 100% !important;
                                              padding: 0.375rem 0.5rem;
                                              border-radius: 0px !important;
                                            "
                                          />
                                          <div class="input-group-append">
                                            <select
                                              class="form-control"
                                              v-model="button.type"
                                              style="
                                                width: 20px !important;
                                                height: 38px;
                                                padding: 0px !important;
                                              "
                                              id="button_type_list_id"
                                            >
                                              <option
                                                v-for="(
                                                  option, index
                                                ) in button_type_list"
                                                :key="index"
                                                :value="option.value"
                                              >
                                                {{ option.name }}
                                              </option>
                                            </select>
                                          </div>
                                        </div>
                                      </div>
                                      <span
                                        style="
                                          cursor: pointer;
                                          float: right;
                                          margin-top: 8px;
                                        "
                                        class="close mx-1"
                                        title="Remove Button Response"
                                        v-if="response.buttons.length > 1"
                                        @click="
                                          add_to_assistant_response_carousel_card_button_list(
                                            'remove',
                                            new_response.id,
                                            num,
                                            btn_num
                                          )
                                        "
                                      >
                                        &times;</span
                                      >
                                    </div>
                                  </div>
                                </div>
                                <div class="d-flex">
                                  <p
                                    style="margin-top: 6px; margin-bottom: 5px"
                                  >
                                    {{tlt('card_response_add_btn_label')}}
                                  </p>
                                  <button
                                    style="
                                      cursor: pointer;
                                      border: none;
                                      background: transparent
                                        url('@portal/assets/img/plus.png') 0% 0%
                                        no-repeat padding-box;
                                    "
                                    @click="
                                      add_to_assistant_response_carousel_card_button_list(
                                        'add',
                                        new_response.id,
                                        num
                                      )
                                    "
                                  >
                                    <img src="/img/black_plus.png" alt="" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                    <div class="d-flex">
                      <p style="margin-top: 6px; margin-bottom: 5px">
                        {{tlt('card_response_add_card_label')}}
                      </p>
                      <button
                        style="
                          cursor: pointer;
                          border: none;
                          background: transparent
                            url('@portal/assets/img/plus.png') 0% 0% no-repeat
                            padding-box;
                        "
                        @click="
                          add_to_assistant_response_carousel_card_list(
                            'add',
                            new_response.id
                          )
                        "
                      >
                        <img src="/img/black_plus.png" alt="" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex" style="margin-left: 1rem !important">
                <p class="sub_heading">{{tlt('assist_validate_response_type_first_label')}} :</p>
                <select
                  class="form-control input-tag"
                  v-model="selected_response_type"
                  style="
                    width: 100px;
                    height: 25px;
                    margin-left: 10px;
                    padding: 0px;
                  "
                  id="res_n_int_source"
                >
                  <option
                    v-for="(option, index) in assistant_response_type"
                    :key="index"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
                <!-- </div> -->
                <!-- <div class="d-flex"> -->
                <p class="sub_heading" style="margin-left: 20px">
                  {{tlt('assist_validate_add_response_btn')}}
                </p>
                <button
                  style="
                    margin-top: -14px;
                    cursor: pointer;
                    border: none;
                    background: transparent url('@portal/assets/img/plus.png')
                      0% 0% no-repeat padding-box;
                  "
                  @click="
                    webhook_to_assistant_response('add', webhook_variable)
                  "
                >
                  <img src="/img/black_plus.png" alt="" />
                </button>
              </div>
            </div>
          </div>
          <!-- <div class="modal-footer">
            <a href="#" data-dismiss="modal" class="btn">Close</a>
            <a href="#" class="btn btn-primary">Save changes</a>
          </div> -->
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="manage_handler_id"
      tabindex="-1"
      role="dialog"
      aria-labelledby="manage_handler_id"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div>
              <h5 style="font-style: regular" class="modal-title">
                {{tlt('manage_handlers_header')}}
              </h5>
              <p class="m-0">
                {{tlt('manage_handlers_help_text')}}
              </p>
            </div>
            <button
              type="button"
              @click="on_close_manage_handlers()"
              class="close"
              data-dismiss="modal"
              aria-hidden="true"
            >
              ×
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <!-- <h5>If answer to any prompt is not found and</h5> -->
              <div
                v-for="(handler, ind) in manage_handlers"
                :key="ind"
                class="custom-box-head px-3 py-3 mt-3 mb-3"
              >
                <div>
                  <span
                    style="float: right; cursor: pointer; font-size: 14px"
                    @click="add_remove_to_manage_handler_list('remove', ind)"
                    class="close"
                    title="Delete Handler"
                  >
                    {{tlt('manage_handlers_delete_btn')}}
                    <!-- <i style="font-size: 16px" class="fa">&#xf00d;</i> -->
                  </span>
                  <h5>{{tlt('handler_header')}}: {{ ind }}</h5>
                </div>
                <div>
                  <div class="form-group">
                    <h5>{{tlt('manage_handlers_assistant_recognize_header')}}</h5>
                    <div
                      class="row d-flex"
                      style="margin-left: 1rem !important"
                    >
                      <div
                        class="d-flex pb-2"
                        v-for="(trigger, index) in handler.triggers"
                        :key="index"
                      >
                        <div class="mr-2 my-auto">
                          <div>
                            <select
                              class="custom-select"
                              aria-label="Filter by"
                              id="trigger_filter_by_id"
                              style="
                                width: 120px;
                                height: 40px;
                                padding-left: 14px;
                                padding-bottom: 4px;
                              "
                              :placeholder="tlt('filter_by')"
                              v-model="trigger.trigger_type"
                              @input="
                                manage_handlers_change_trigger_value(
                                  trigger.trigger_type,
                                  index,
                                  ind
                                )
                              "
                            >
                              <option value="" disabled selected>
                                {{tlt('filter_by_label')}}
                              </option>
                              <option value="intent">{{tlt('objective_label')}}</option>
                              <option value="entity">{{tlt('entity_label')}}</option>
                            </select>
                          </div>
                        </div>
                        <div
                          class="mr-2 my-auto"
                          v-if="Boolean(trigger.trigger_type)"
                        >
                          <multiselect
                            v-model="trigger.trigger_value"
                            :options="
                              trigger.trigger_type === 'intent'
                                ? trigger_options_intent
                                : trigger_options_entity
                            "
                            :placeholder="
                              trigger.trigger_type === 'intent'
                                ? tlt('search_objective')
                                : tlt('search_entity')
                            "
                            :close-on-select="true"
                            :clear-on-select="false"
                            :preserve-search="true"
                            :show-labels="false"
                            :allow-empty="false"
                            open-direction="bottom"
                            :searchable="true"
                            :loading="is_loading"
                            @input="
                              manage_handlers_change_trigger_type(
                                trigger.trigger_type,
                                trigger.trigger_value,
                                index,
                                ind
                              )
                            "
                            @search-change="
                              search_intent_entity(trigger.trigger_type, $event)
                            "
                            style="height: 30px; padding: 0px"
                            id="res_n_int_source"
                          >
                            <span slot="noOptions"></span>
                            <span slot="noResult">No Condition found.</span>
                          </multiselect>
                        </div>
                        <div
                          class="mr-2 my-auto"
                          v-if="
                            Boolean(trigger.trigger_type === 'entity') &&
                            Boolean(trigger.trigger_value)
                          "
                          :style="
                            is_entity_type_sys_pattern(
                              trigger.trigger_value
                            ) === true
                              ? 'cursor: not-allowed'
                              : null
                          "
                          :title="
                            is_entity_type_sys_pattern(
                              trigger.trigger_value
                            ) === true
                              ? 'Entity selected is of type pattern or system entity, hence further option(s) cannot be selected.'
                              : null
                          "
                        >
                          <multiselect
                            id="trigger_operand_id"
                            :close-on-select="true"
                            :options="entity_operand_options"
                            :placeholder="tlt('operator')"
                            v-model="trigger.operand"
                            :allow-empty="false"
                            :show-labels="false"
                            @input="
                              manage_handlers_change_trigger_entity_value(
                                trigger.operand,
                                index,
                                ind
                              )
                            "
                            :disabled="
                              is_entity_type_sys_pattern(
                                trigger.trigger_value
                              ) === true
                            "
                          >
                          </multiselect>
                        </div>
                        <div
                          class="mr-2 my-auto"
                          v-if="
                            Boolean(trigger.trigger_type === 'entity') &&
                            Boolean(trigger.trigger_value) &&
                            Boolean(trigger.operand === 'is')
                          "
                        >
                          <multiselect
                            id="trigger_entity_value_id"
                            :close-on-select="true"
                            :options="
                              entity_value_options(trigger.trigger_value)
                            "
                            :placeholder="tlt('entity_value')"
                            v-model="trigger.entity_value"
                            :allow-empty="false"
                            :show-labels="false"
                            @input="
                              manage_handlers_set_trigger_entity_value(
                                trigger.entity_value,
                                index,
                                ind
                              )
                            "
                          >
                          </multiselect>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <h5 style="margin-top: 6px; margin-bottom: 5px">
                     {{tlt('manage_handlers_assist_resp_label')}}
                    </h5>
                    <div
                      v-for="(new_response, index) in handler.responses"
                      :key="index"
                      class="form-group"
                    >
                      <div
                        v-if="new_response.type == 'text'"
                        class="custom-box"
                      >
                        <span
                          style="float: right; cursor: pointer; font-size: 14px"
                          @click="
                            manage_handlers_add_to_assistant_response_list(
                              'remove',
                              ind,
                              index
                            )
                          "
                          class="btn btn-light"
                          title="Remove Response"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                          </svg>
                        </span>
                        <button
                          style="float: right; cursor: pointer; font-size: 14px"
                          class="btn btn-light"
                          :disabled="index === handler.responses.length-1"
                          :style="index === handler.responses.length-1 ?'cursor: not-allowed':''"
                          @click="
                            manage_handlers_interchange_position_assistant_response(
                              new_response.id,
                              handler.responses[index+1].id,
                              ind
                            )
                          "
                          title="Move down"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                          </svg>
                        </button>
                        <button
                          style="float: right; cursor: pointer; font-size: 14px"
                          :disabled="index === 0"
                          :style="index === 0 ?'cursor: not-allowed':''"
                          @click="
                            manage_handlers_interchange_position_assistant_response(
                              new_response.id,
                              handler.responses[index-1].id,
                              ind
                            )
                          "
                          class="btn btn-light"
                          title="Move Up"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#273679" class="bi bi-chevron-up" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                          </svg>
                        </button>
                        <p class="sub_heading">
                          <!-- Text Response : {{ new_response.id }} -->
                          {{tlt('manage_handlers_text_response_header')}}
                        </p>
                        <div>
                          <div
                            v-for="(response, num) in new_response.values"
                            :key="num"
                            class="form-group"
                          >
                            <div class="d-flex">
                              <input
                                class="form-control input-tag"
                                :placeholder="tlt('response_text')"
                                style="width: 100%; padding: 0.375rem 0.5rem"
                                type="text"
                                v-model="new_response.values[num]"
                                :id="
                                  'manage_handlers_assistance_response_' +
                                  new_response.id +
                                  '_' +
                                  num
                                "
                                @focusout="
                                  manage_handlers_insert_variable_block_off(
                                    new_response.id,
                                    num
                                  )
                                "
                                @focusin="
                                  manage_handlers_insert_variable_block_on(
                                    new_response.id,
                                    num
                                  )
                                "
                                v-on:keyup.enter="
                                  manage_handler_add_to_assistant_response_text_list(
                                    'add',
                                    new_response.id,
                                    ind
                                  )
                                "
                              />
                              <div
                                style="opacity: 0"
                                :id="
                                  'manage_handlers_insert_variable_block' +
                                  new_response.id +
                                  '_' +
                                  num
                                "
                              >
                                <a
                                  @click="
                                    manage_handlers_set_assistance_response_index(
                                      new_response.id,
                                      num,
                                      ind
                                    )
                                  "
                                  class="example fa-stack fa-1x"
                                  id="manage_handlers_insert_variable_button"
                                  type="button"
                                  data-toggle="modal"
                                  data-target="#manage_handlers_insert_variable_modal"
                                  style="margin-top: 20px !important"
                                >
                                  <i
                                    class="fas fa-circle fa-stack-2x"
                                    style="color: #dbe2e8"
                                    :id="
                                      'manage_handlers_insert_variable_circle_' +
                                      new_response.id +
                                      '_' +
                                      num
                                    "
                                  >
                                  </i>
                                  <span
                                    class="fa fa-stack-1x"
                                    style="color: white"
                                    @mouseover="
                                      manage_handlers_circle_mouseover(
                                        new_response.id,
                                        num
                                      )
                                    "
                                    @mouseout="
                                      manage_handlers_circle_mouseout(
                                        new_response.id,
                                        num
                                      )
                                    "
                                  >
                                    <span
                                      style="font-size: 14px; display: block"
                                    >
                                      {...}
                                    </span>
                                  </span>
                                </a>
                              </div>
                              <span
                                style="margin-left: 12px; color: #0645ad"
                                class="my-auto"
                                v-if="
                                  check_slot_value_use_in_response(
                                    new_response.values[num]
                                  )
                                "
                              >
                                <i
                                  class="fa fa-info-circle"
                                  aria-hidden="true"
                                  style="font-size: 16px"
                                  title="You have used {} in the response, which is used to access slot value, i.e it would add the value gathered by slot if enabled in previous or current node. (example: Email: {$email_id} would print Email: test@mail.com)."
                                >
                                </i>
                              </span>
                              <span
                                v-if="new_response.values.length > 1"
                                title="Remove Text Response"
                                class="close my-auto"
                                style="cursor: pointer; margin-left: 12px"
                                @click="
                                  manage_handler_add_to_assistant_response_text_list(
                                    'remove',
                                    new_response.id,
                                    ind,
                                    num
                                  )
                                "
                              >
                                &times;
                              </span>
                            </div>
                          </div>
                          <div class="d-flex">
                            <p style="margin-top: 6px; margin-bottom: 5px">
                              {{tlt('manage_handlers_add_value_btn')}}
                            </p>
                            <button
                              style="
                                cursor: pointer;
                                border: none;
                                background: transparent
                                  url('@portal/assets/img/plus.png') 0% 0%
                                  no-repeat padding-box;
                              "
                              @click="
                                manage_handler_add_to_assistant_response_text_list(
                                  'add',
                                  new_response.id,
                                  ind
                                )
                              "
                            >
                              <img src="/img/black_plus.png" alt="" />
                            </button>
                          </div>
                          <div class="response-variations">
                            <span
                              >{{tlt('response_variation_text1')}}
                              <strong>{{ new_response.variation }}</strong
                              >.</span
                            >
                            {{tlt('response_variation_text2')}}
                            <a
                              @click="
                                manage_handlers_select_response_variation(
                                  new_response.id,
                                  'sequential',
                                  ind
                                )
                              "
                              v-show="new_response.variation != 'sequential'"
                              href="javascript:void(0);"
                              class="response-variation"
                            >
                              {{tlt('response_variation_text3')}}
                            </a>
                            <span
                              v-show="new_response.variation != 'sequential'"
                            >
                              |
                            </span>
                            <a
                              @click="
                                manage_handlers_select_response_variation(
                                  new_response.id,
                                  'multiline',
                                  ind
                                )
                              "
                              v-show="new_response.variation != 'multiline'"
                              href="javascript:void(0);"
                              class="variation-multiline"
                            >
                              {{tlt('response_variation_text4')}}
                            </a>
                            <span
                              v-show="
                                new_response.variation != 'random' &&
                                new_response.variation != 'multiline'
                              "
                            >
                              |
                            </span>
                            <a
                              @click="
                                manage_handlers_select_response_variation(
                                  new_response.id,
                                  'random',
                                  ind
                                )
                              "
                              v-show="new_response.variation != 'random'"
                              href="javascript:void(0);"
                              class="variation-random"
                            >
                              {{tlt('response_variation_text5')}}
                            </a>
                          </div>
                        </div>
                      </div>
                      <div
                        v-if="new_response.type == 'image'"
                        class="custom-box"
                      >
                        <span
                          style="float: right; cursor: pointer; font-size: 14px"
                          @click="
                            manage_handlers_add_to_assistant_response_list(
                              'remove',
                              ind,
                              index
                            )
                          "
                          class="btn btn-light"
                          title="Remove Response"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                          </svg>
                        </span>
                        <button
                          style="float: right; cursor: pointer; font-size: 14px"
                          class="btn btn-light"
                          :disabled="index === handler.responses.length-1"
                          :style="index === handler.responses.length-1 ?'cursor: not-allowed':''"
                          @click="
                            manage_handlers_interchange_position_assistant_response(
                              new_response.id,
                              handler.responses[index+1].id,
                              ind
                            )
                          "
                          title="Move down"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                          </svg>
                        </button>
                        <button
                          style="float: right; cursor: pointer; font-size: 14px"
                          :disabled="index === 0"
                          :style="index === 0 ?'cursor: not-allowed':''"
                          @click="
                            manage_handlers_interchange_position_assistant_response(
                              new_response.id,
                              handler.responses[index-1].id,
                              ind
                            )
                          "
                          class="btn btn-light"
                          title="Move Up"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#273679" class="bi bi-chevron-up" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                          </svg>
                        </button>
                        <p class="sub_heading">
                          <!-- Image Response : {{ new_response.id }} -->
                          {{tlt('manage_handlers_img_response_header')}}
                        </p>
                        <div>
                          <input
                            class="form-control input-tag"
                            style="width: 100%; padding: 0.375rem 0.5rem"
                            :placeholder="tlt('add_img_url')"
                            type="text"
                            v-model="new_response.source"
                          />
                          <p
                            v-show="
                              check_image_url(new_response.source) == false &&
                              Boolean(new_response.source)
                            "
                            style="
                              color: red !important;
                              margin-bottom: 0px !important;
                              padding-top: 8px !important;
                            "
                          >
                            {{tlt('manage_handlers_image_condition_text')}}
                          </p>
                        </div>
                      </div>
                      <div
                        v-if="new_response.type == 'video'"
                        class="custom-box"
                      >
                        <span
                          style="float: right; cursor: pointer; font-size: 14px"
                          @click="
                            manage_handlers_add_to_assistant_response_list(
                              'remove',
                              ind,
                              index
                            )
                          "
                          class="btn btn-light"
                          title="Remove Response"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                          </svg>
                        </span>
                        <button
                          style="float: right; cursor: pointer; font-size: 14px"
                          class="btn btn-light"
                          :disabled="index === handler.responses.length-1"
                          :style="index === handler.responses.length-1 ?'cursor: not-allowed':''"
                          @click="
                            manage_handlers_interchange_position_assistant_response(
                              new_response.id,
                              handler.responses[index+1].id,
                              ind
                            )
                          "
                          title="Move down"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                          </svg>
                        </button>
                        <button
                          style="float: right; cursor: pointer; font-size: 14px"
                          :disabled="index === 0"
                          :style="index === 0 ?'cursor: not-allowed':''"
                          @click="
                            manage_handlers_interchange_position_assistant_response(
                              new_response.id,
                              handler.responses[index-1].id,
                              ind
                            )
                          "
                          class="btn btn-light"
                          title="Move Up"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#273679" class="bi bi-chevron-up" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                          </svg>
                        </button>
                        <p class="sub_heading">
                          <!-- Video Response : {{ new_response.id }} -->
                          {{tlt('manage_handlers_video_response_header')}}
                        </p>
                        <div>
                          <input
                            class="form-control input-tag"
                            style="width: 100%; padding: 0.375rem 0.5rem"
                            :placeholder="tlt('add_video_url')"
                            type="text"
                            v-model.trim="new_response.source"
                          />
                          <p
                            v-show="
                              check_video_url(new_response.source) === false &&
                              Boolean(new_response.source)
                            "
                            style="
                              color: red !important;
                              margin-bottom: 0px !important;
                              padding-top: 8px !important;
                            "
                          >
                            {{tlt('manage_handlers_video_condition_text')}}
                          </p>
                        </div>
                      </div>
                      <div
                        v-if="new_response.type == 'choices'"
                        class="custom-box"
                      >
                        <span
                          style="float: right; cursor: pointer; font-size: 14px"
                          @click="
                            manage_handlers_add_to_assistant_response_list(
                              'remove',
                              ind,
                              index
                            )
                          "
                          class="btn btn-light"
                          title="Remove Response"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                          </svg>
                        </span>
                        <button
                          style="float: right; cursor: pointer; font-size: 14px"
                          class="btn btn-light"
                          :disabled="index === handler.responses.length-1"
                          :style="index === handler.responses.length-1 ?'cursor: not-allowed':''"
                          @click="
                            manage_handlers_interchange_position_assistant_response(
                              new_response.id,
                              handler.responses[index+1].id,
                              ind
                            )
                          "
                          title="Move down"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                          </svg>
                        </button>
                        <button
                          style="float: right; cursor: pointer; font-size: 14px"
                          :disabled="index === 0"
                          :style="index === 0 ?'cursor: not-allowed':''"
                          @click="
                            manage_handlers_interchange_position_assistant_response(
                              new_response.id,
                              handler.responses[index-1].id,
                              ind
                            )
                          "
                          class="btn btn-light"
                          title="Move Up"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#273679" class="bi bi-chevron-up" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                          </svg>
                        </button>
                        <p class="sub_heading">
                          <!-- Choice Response : {{ new_response.id }} -->
                          {{tlt('manage_handlers_choice_response_header')}}
                        </p>
                        <div>
                          <template>
                            <div style="display: block; margin-bottom: 1rem">
                              <div
                                v-for="(response, num) in new_response.choices"
                                :key="num"
                                class="d-flex mb-2"
                              >
                                <div class="input-group" style="display: block">
                                  <div class="d-flex">
                                    <input
                                      type="text"
                                      v-model.trim="response.title"
                                      class="form-control input-tag"
                                      :placeholder="tlt('enter_title')"
                                      maxlength="50"
                                      style="
                                        width: 100% !important;
                                        padding: 0.375rem 0.5rem;
                                        border-radius: 5px 0px 0px 5px !important;
                                      "
                                    />
                                    <input
                                      type="text"
                                      v-model.trim="response.payload"
                                      class="form-control input-tag"
                                      :placeholder="
                                        change_btn_value_placeholder(
                                          response.type
                                        )
                                      "
                                      style="
                                        width: 100% !important;
                                        padding: 0.375rem 0.5rem;
                                        border-radius: 0px !important;
                                      "
                                    />
                                    <div class="input-group-append">
                                      <select
                                        class="form-control"
                                        v-model="response.type"
                                        style="
                                          width: 100px !important;
                                          height: 38px;
                                          padding: 0px !important;
                                        "
                                        id="button_type_list_id"
                                      >
                                        <option
                                          v-for="(
                                            option, index
                                          ) in button_type_list"
                                          :key="index"
                                          :value="option.value"
                                        >
                                          {{ option.name }}
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                                <span
                                  style="cursor: pointer; float: right"
                                  class="close my-auto mr-0 ml-2"
                                  title="Remove Choice Response"
                                  v-if="new_response.choices.length > 1"
                                  @click="
                                    manage_handlers_add_to_assistant_response_choice_list(
                                      'remove',
                                      new_response.id,
                                      ind,
                                      num
                                    )
                                  "
                                >
                                  &times;</span
                                >
                              </div>
                            </div>
                          </template>
                          <div class="d-flex">
                            <p style="margin-top: 6px; margin-bottom: 5px">
                              {{tlt('manage_handlers_add_choice_btn')}}
                            </p>
                            <button
                              style="
                                cursor: pointer;
                                border: none;
                                background: transparent
                                  url('@portal/assets/img/plus.png') 0% 0%
                                  no-repeat padding-box;
                              "
                              @click="
                                manage_handlers_add_to_assistant_response_choice_list(
                                  'add',
                                  new_response.id,
                                  ind
                                )
                              "
                            >
                              <img src="/img/black_plus.png" alt="" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div
                        v-if="new_response.type == 'card'"
                        class="custom-box"
                      >
                        <span
                          style="float: right; cursor: pointer; font-size: 14px"
                          @click="
                            manage_handlers_add_to_assistant_response_list(
                              'remove',
                              ind,
                              index
                            )
                          "
                          class="btn btn-light"
                          title="Remove Response"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                          </svg>
                        </span>
                        <button
                          style="float: right; cursor: pointer; font-size: 14px"
                          class="btn btn-light"
                          :disabled="index === handler.responses.length-1"
                          :style="index === handler.responses.length-1 ?'cursor: not-allowed':''"
                          @click="
                            manage_handlers_interchange_position_assistant_response(
                              new_response.id,
                              handler.responses[index+1].id,
                              ind
                            )
                          "
                          title="Move down"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                          </svg>
                        </button>
                        <button
                          style="float: right; cursor: pointer; font-size: 14px"
                          :disabled="index === 0"
                          :style="index === 0 ?'cursor: not-allowed':''"
                          @click="
                            manage_handlers_interchange_position_assistant_response(
                              new_response.id,
                              handler.responses[index-1].id,
                              ind
                            )
                          "
                          class="btn btn-light"
                          title="Move Up"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#273679" class="bi bi-chevron-up" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                          </svg>
                        </button>
                        <p class="sub_heading">
                          <!-- Card Response : {{ new_response.id }} -->
                          {{tlt('manage_handlers_card_response_header')}}
                        </p>
                        <div>
                          <template>
                            <div class="row">
                              <div
                                v-for="(
                                  response, num
                                ) in new_response.card_list"
                                :key="num"
                                class="col-sm-4 pb-3"
                              >
                                <div class="card">
                                  <div class="card-body">
                                    <p
                                      class="sub_heading_carousel"
                                      style="color: dimgray; margin-bottom: 5px"
                                    >
                                      {{tlt('manage_handlers_card_response_card_label')}}: {{ num + 1 }}
                                    </p>
                                    <span
                                      style="
                                        cursor: pointer;
                                        float: right;
                                        margin-top: -29px;
                                      "
                                      class="close ml-auto mr-0"
                                      title="Remove Card Response"
                                      v-if="new_response.card_list.length > 1"
                                      @click="
                                        manage_handlers_add_to_assistant_response_carousel_card_list(
                                          'remove',
                                          new_response.id,
                                          ind,
                                          num
                                        )
                                      "
                                    >
                                      &times;</span
                                    >
                                    <div>
                                      <div
                                        class="d-sm-flex justify-content-start"
                                      >
                                        <h6
                                          class="label_header"
                                          style="margin-top: 0"
                                        >
                                          {{tlt('manage_handlers_card_response_file_type_label')}}
                                        </h6>
                                        <div class="radio my-auto radio-label">
                                          <label style="font-size: 13px">
                                            <input
                                              type="radio"
                                              v-model="response.is_image"
                                              :value="true"
                                              id="carousel_img"
                                            />
                                            <span
                                              class="icn"
                                              id="filter_portal_user_radio"
                                            ></span>
                                            {{tlt('manage_handlers_card_response_image_label')}}
                                          </label>
                                          <label style="font-size: 13px">
                                            <input
                                              type="radio"
                                              v-model="response.is_image"
                                              :value="false"
                                              id="carousel_video"
                                            />
                                            <span class="icn"></span> {{tlt('manage_handlers_card_response_video_label')}}
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div v-if="response.is_image">
                                      <input
                                        class="form-control input-tag"
                                        style="
                                          width: 100%;
                                          padding: 0.375rem 0.5rem;
                                        "
                                        :placeholder="tlt('img_url')"
                                        type="text"
                                        v-model="response.image"
                                      />
                                      <p
                                        v-show="
                                          check_image_url(response.image) ===
                                            false && Boolean(response.image)
                                        "
                                        style="
                                          color: red !important;
                                          margin-bottom: 0px !important;
                                          padding-top: 8px !important;
                                        "
                                      >
                                        {{tlt('card_response_image_condition_text')}}
                                      </p>
                                    </div>
                                    <div v-else>
                                      <input
                                        type="text"
                                        v-model.trim="response.video"
                                        class="form-control input-tag"
                                        :placeholder="tlt('video_url')"
                                        style="
                                          width: 100% !important;
                                          padding: 0.375rem 0.5rem;
                                        "
                                      />
                                      <p
                                        v-show="
                                          check_video_url(response.video) ===
                                            false && Boolean(response.video)
                                        "
                                        style="
                                          color: red !important;
                                          margin-bottom: 0px !important;
                                          padding-top: 8px !important;
                                        "
                                      >
                                        {{tlt('handler_card_response_video_condition_text')}}
                                      </p>
                                    </div>
                                    <label class="label_header">{{tlt('manage_handlers_card_response_title_label')}}</label>
                                    <input
                                      type="text"
                                      v-model.trim="response.title"
                                      class="form-control input-tag"
                                      :placeholder="tlt('enter_title')"
                                      style="
                                        width: 100% !important;
                                        padding: 0.375rem 0.5rem;
                                      "
                                    />
                                    <label class="label_header"
                                      >{{tlt('manage_handlers_card_response_desc_label')}}</label
                                    >
                                    <textarea
                                      type="text"
                                      v-model.trim="response.text"
                                      class="
                                        form-control
                                        input-tag
                                        textarea-style
                                      "
                                      rows="3"
                                      cols="20"
                                      :placeholder="tlt('enter_description')"
                                      style="resize: none"
                                    ></textarea>
                                    <div>
                                      <p class="label_header">{{tlt('manage_handlers_card_response_button_label')}}</p>
                                      <!-- <div class="custom-button-box px-3 py-2 pt-0 mt-3 mb-3"> -->
                                      <div class="ScrollStyle">
                                        <div
                                          v-for="(
                                            button, btn_num
                                          ) in response.buttons"
                                          :key="btn_num"
                                          class="mb-2"
                                        >
                                          <div class="d-flex">
                                            <div
                                              class="input-group"
                                              style="display: block"
                                            >
                                              <div class="d-flex">
                                                <input
                                                  type="text"
                                                  v-model.trim="button.title"
                                                  class="form-control input-tag"
                                                  :placeholder="tlt('enter_title')"
                                                  maxlength="50"
                                                  style="
                                                    width: 100% !important;
                                                    padding: 0.375rem 0.5rem;
                                                    border-radius: 5px 0px 0px
                                                      5px !important;
                                                  "
                                                />
                                                <input
                                                  type="text"
                                                  v-model.trim="button.value"
                                                  class="form-control input-tag"
                                                  :placeholder="
                                                    change_btn_value_placeholder(
                                                      button.type
                                                    )
                                                  "
                                                  style="
                                                    width: 100% !important;
                                                    padding: 0.375rem 0.5rem;
                                                    border-radius: 0px !important;
                                                  "
                                                />
                                                <div class="input-group-append">
                                                  <select
                                                    class="form-control"
                                                    v-model="button.type"
                                                    style="
                                                      width: 20px !important;
                                                      height: 38px;
                                                      padding: 0px !important;
                                                    "
                                                    id="button_type_list_id"
                                                  >
                                                    <option
                                                      v-for="(
                                                        option, index
                                                      ) in button_type_list"
                                                      :key="index"
                                                      :value="option.value"
                                                    >
                                                      {{ option.name }}
                                                    </option>
                                                  </select>
                                                </div>
                                              </div>
                                            </div>
                                            <span
                                              style="
                                                cursor: pointer;
                                                float: right;
                                                margin-top: 8px;
                                              "
                                              class="close mx-1"
                                              title="Remove Button Response"
                                              v-if="response.buttons.length > 1"
                                              @click="
                                                manage_handlers_add_to_assistant_response_carousel_card_button_list(
                                                  'remove',
                                                  new_response.id,
                                                  ind,
                                                  num,
                                                  btn_num
                                                )
                                              "
                                            >
                                              &times;</span
                                            >
                                          </div>
                                        </div>
                                        <!-- add btn -->
                                      </div>
                                      <div class="d-flex">
                                        <p
                                          style="
                                            margin-top: 6px;
                                            margin-bottom: 5px;
                                          "
                                        >
                                          {{tlt('manage_handlers_card_response_add_btn_label')}}
                                        </p>
                                        <button
                                          style="
                                            cursor: pointer;
                                            border: none;
                                            background: transparent
                                              url('@portal/assets/img/plus.png')
                                              0% 0% no-repeat padding-box;
                                          "
                                          @click="
                                            manage_handlers_add_to_assistant_response_carousel_card_button_list(
                                              'add',
                                              new_response.id,
                                              ind,
                                              num
                                            )
                                          "
                                        >
                                          <img
                                            src="/img/black_plus.png"
                                            alt=""
                                          />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </template>
                          <div class="d-flex">
                            <p style="margin-top: 6px; margin-bottom: 5px">
                              {{tlt('manage_handlers_card_response_add_card_label')}}
                            </p>
                            <button
                              style="
                                cursor: pointer;
                                border: none;
                                background: transparent
                                  url('@portal/assets/img/plus.png') 0% 0%
                                  no-repeat padding-box;
                              "
                              @click="
                                manage_handlers_add_to_assistant_response_carousel_card_list(
                                  'add',
                                  new_response.id,
                                  ind
                                )
                              "
                            >
                              <img src="/img/black_plus.png" alt="" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex" style="margin-left: 1rem !important">
                      <p class="sub_heading">{{tlt('manage_handlers_response_type_first_label')}} :</p>
                      <select
                        class="form-control input-tag"
                        v-model="selected_response_type"
                        style="
                          width: 100px;
                          height: 25px;
                          margin-left: 10px;
                          padding: 0px;
                        "
                        id="res_n_int_source"
                      >
                        <option
                          v-for="(option, index) in assistant_response_type"
                          :key="index"
                          :value="option"
                        >
                          {{ option }}
                        </option>
                      </select>
                      <!-- </div> -->
                      <!-- <div class="d-flex"> -->
                      <p class="sub_heading" style="margin-left: 20px">
                        {{tlt('manage_handlers_add_response_btn')}}
                      </p>
                      <button
                        style="
                          margin-top: -14px;
                          cursor: pointer;
                          border: none;
                          background: transparent
                            url('@portal/assets/img/plus.png') 0% 0% no-repeat
                            padding-box;
                        "
                        @click="
                          manage_handlers_add_to_assistant_response_list(
                            'add',
                            ind
                          )
                        "
                      >
                        <img src="/img/black_plus.png" alt="" />
                      </button>
                    </div>
                  </div>
                  <div class="form-group">
                    <h5>{{tlt('manage_handlers_assist_should_label')}}</h5>
                    <div class="d-flex" style="margin-left: 1rem !important">
                      <select
                        class="form-control input-tag"
                        style="width: 120px; height: 30px; padding: 0px"
                        id="res_n_int_source"
                        disabled
                      >
                        <option value="skip_all_slots" disabled selected>
                          Skip all slots
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <p
                  class="sub_heading"
                  style="margin-top: 6px; margin-bottom: 5px"
                >
                  {{tlt('manage_handlers_add_handler_btn')}}
                </p>
                <button
                  :disabled="!Boolean(manage_handlers.length === 0)"
                  class=""
                  :style="
                    !Boolean(manage_handlers.length === 0)
                      ? 'cursor: not-allowed;'
                      : 'cursor: pointer;'
                  "
                  style="
                    border: none;
                    background: transparent url('@portal/assets/img/plus.png')
                      0% 0% no-repeat padding-box;
                  "
                  @click="add_remove_to_manage_handler_list('add')"
                >
                  <img src="/img/black_plus.png" alt="" />
                </button>
              </div>
            </div>
          </div>
          <!-- <div class="modal-footer">
            <a href="#" data-dismiss="modal" class="btn">Close</a>
            <a href="#" class="btn btn-primary">Save changes</a>
          </div> -->
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="notificationmodal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="notificationmodal"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 style="font-style: regular" class="modal-title">
              {{tlt('config_notification_header')}}
            </h5>
            <button
              type="button"
              @click="on_close_notification_modal()"
              class="close"
              data-dismiss="modal"
              aria-hidden="true"
            >
              ×
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <h5 style="margin-top: 6px; margin-bottom: 5px">
                {{tlt('config_notification_when_success_label')}}
              </h5>
              <div
                v-for="(
                  new_response, index
                ) in notification_successful_assistant_response"
                :key="index"
                class="form-group"
              >
                <div v-if="new_response.type == 'text'" class="custom-box">
                  <span
                    style="float: right; cursor: pointer; font-size: 14px"
                    @click="
                      remove_notification_to_assistant_response(
                        new_response.id,
                        new_response.recognizes
                      )
                    "
                    class="btn btn-light"
                    title="Remove Response"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </span>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    class="btn btn-light"
                    :disabled="index === notification_successful_assistant_response.length-1"
                    :style="index === notification_successful_assistant_response.length-1 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        notification_successful_assistant_response[index+1].id,
                        'notification_modal'
                      )
                    "
                    title="Move down"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    :disabled="index === 0"
                    :style="index === 0 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        notification_successful_assistant_response[index-1].id,
                        'notification_modal'
                      )
                    "
                    class="btn btn-light"
                    title="Move Up"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#273679" class="bi bi-chevron-up" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                  </button>
                  <p class="sub_heading">
                    {{tlt('config_success_text_response_header')}} : {{ new_response.id }}
                  </p>
                  <div>
                    <div
                      v-for="(response, num) in new_response.values"
                      :key="num"
                      class="form-group"
                    >
                      <div class="d-flex">
                        <input
                          class="form-control input-tag"
                          :placeholder="tlt('response_text')"
                          style="width: 100%; padding: 0.375rem 0.5rem"
                          type="text"
                          v-model="new_response.values[num]"
                          :id="
                            'assistance_response_' + new_response.id + '_' + num
                          "
                          @focusout="
                            insert_variable_block_off(new_response.id, num)
                          "
                          @focusin="
                            insert_variable_block_on(new_response.id, num)
                          "
                          v-on:keyup.enter="
                            add_to_assistant_response_text_list(
                              'add',
                              new_response.id
                            )
                          "
                        />
                        <div
                          style="opacity: 0"
                          :id="
                            'insert_variable_block' +
                            new_response.id +
                            '_' +
                            num
                          "
                        >
                          <a
                            @click="
                              set_assistance_response_index(
                                new_response.id,
                                num
                              )
                            "
                            class="example fa-stack fa-1x"
                            id="insert_variable_button"
                            type="button"
                            data-toggle="modal"
                            data-target="#insert_variable_modal"
                            style="margin-top: 20px !important"
                          >
                            <i
                              class="fas fa-circle fa-stack-2x"
                              style="color: #dbe2e8"
                              :id="
                                'insert_variable_circle_' +
                                new_response.id +
                                '_' +
                                num
                              "
                            >
                            </i>
                            <span
                              class="fa fa-stack-1x"
                              style="color: white"
                              @mouseover="
                                circle_mouseover(new_response.id, num)
                              "
                              @mouseout="circle_mouseout(new_response.id, num)"
                            >
                              <span style="font-size: 14px; display: block">
                                {...}
                              </span>
                            </span>
                          </a>
                        </div>
                        <span
                          style="margin-left: 12px; color: #0645ad"
                          class="my-auto"
                          v-if="
                            check_slot_value_use_in_response(
                              new_response.values[num]
                            )
                          "
                        >
                          <i
                            class="fa fa-info-circle"
                            aria-hidden="true"
                            style="font-size: 16px"
                            title="You have used {} in the response, which is used to access slot value, i.e it would add the value gathered by slot if enabled in previous or current node. (example: Email: {$email_id} would print Email: test@mail.com)."
                          >
                          </i>
                        </span>
                        <span
                          v-if="new_response.values.length > 1"
                          title="Remove Text Response"
                          class="close my-auto"
                          style="cursor: pointer; margin-left: 12px"
                          @click="
                            add_to_assistant_response_text_list(
                              'remove',
                              new_response.id,
                              num
                            )
                          "
                        >
                          &times;
                        </span>
                      </div>
                    </div>
                    <div class="d-flex">
                      <p style="margin-top: 6px; margin-bottom: 5px">
                        {{tlt('config_success_add_value_btn')}}
                      </p>
                      <button
                        style="
                          cursor: pointer;
                          border: none;
                          background: transparent
                            url('@portal/assets/img/plus.png') 0% 0% no-repeat
                            padding-box;
                        "
                        @click="
                          add_to_assistant_response_text_list(
                            'add',
                            new_response.id
                          )
                        "
                      >
                        <img src="/img/black_plus.png" alt="" />
                      </button>
                    </div>
                    <div class="response-variations">
                      <span
                        >{{tlt('response_variation_text1')}}
                        <strong>{{ new_response.variation }}</strong
                        >.</span
                      >
                      {{tlt('response_variation_text2')}}
                      <a
                        @click="
                          select_response_variation(
                            new_response.id,
                            'sequential'
                          )
                        "
                        v-show="new_response.variation != 'sequential'"
                        href="javascript:void(0);"
                        class="response-variation"
                      >
                        {{tlt('response_variation_text3')}}
                      </a>
                      <span v-show="new_response.variation != 'sequential'">
                        |
                      </span>
                      <a
                        @click="
                          select_response_variation(
                            new_response.id,
                            'multiline'
                          )
                        "
                        v-show="new_response.variation != 'multiline'"
                        href="javascript:void(0);"
                        class="variation-multiline"
                      >
                        {{tlt('response_variation_text4')}}
                      </a>
                      <span
                        v-show="
                          new_response.variation != 'random' &&
                          new_response.variation != 'multiline'
                        "
                      >
                        |
                      </span>
                      <a
                        @click="
                          select_response_variation(new_response.id, 'random')
                        "
                        v-show="new_response.variation != 'random'"
                        href="javascript:void(0);"
                        class="variation-random"
                      >
                        {{tlt('response_variation_text5')}}
                      </a>
                    </div>
                  </div>
                </div>
                <div v-if="new_response.type == 'image'" class="custom-box">
                  <span
                    style="float: right; cursor: pointer; font-size: 14px"
                    @click="
                      remove_notification_to_assistant_response(
                        new_response.id,
                        new_response.recognizes
                      )
                    "
                    class="btn btn-light"
                    title="Remove Response"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </span>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    class="btn btn-light"
                    :disabled="index === notification_successful_assistant_response.length-1"
                    :style="index === notification_successful_assistant_response.length-1 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        notification_successful_assistant_response[index+1].id,
                        'notification_modal'
                      )
                    "
                    title="Move down"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    :disabled="index === 0"
                    :style="index === 0 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        notification_successful_assistant_response[index-1].id,
                        'notification_modal'
                      )
                    "
                    class="btn btn-light"
                    title="Move Up"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#273679" class="bi bi-chevron-up" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                  </button>
                  <p class="sub_heading">
                    {{tlt('config_success_img_response_header')}} : {{ new_response.id }}
                  </p>
                  <div>
                    <input
                      class="form-control input-tag"
                      style="width: 100%; padding: 0.375rem 0.5rem"
                      :placeholder="tlt('add_img_url')"
                      type="text"
                      v-model="new_response.source"
                    />
                    <p
                      v-show="
                        check_image_url(new_response.source) == false &&
                        Boolean(new_response.source)
                      "
                      style="
                        color: red !important;
                        margin-bottom: 0px !important;
                        padding-top: 8px !important;
                      "
                    >
                      {{tlt('img_url_condition')}}
                    </p>
                  </div>
                </div>
                <div v-if="new_response.type == 'video'" class="custom-box">
                  <span
                    style="float: right; cursor: pointer; font-size: 14px"
                    @click="
                      remove_notification_to_assistant_response(
                        new_response.id,
                        new_response.recognizes
                      )
                    "
                    class="btn btn-light"
                    title="Remove Response"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </span>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    class="btn btn-light"
                    :disabled="index === notification_successful_assistant_response.length-1"
                    :style="index === notification_successful_assistant_response.length-1 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        notification_successful_assistant_response[index+1].id,
                        'notification_modal'
                      )
                    "
                    title="Move down"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    :disabled="index === 0"
                    :style="index === 0 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        notification_successful_assistant_response[index-1].id,
                        'notification_modal'
                      )
                    "
                    class="btn btn-light"
                    title="Move Up"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#273679" class="bi bi-chevron-up" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                  </button>
                  <p class="sub_heading">
                    {{tlt('config_success_video_response_header')}} : {{ new_response.id }}
                  </p>
                  <div>
                    <input
                      class="form-control input-tag"
                      style="width: 100%; padding: 0.375rem 0.5rem"
                      :placeholder="tlt('add_video_url')"
                      type="text"
                      v-model.trim="new_response.source"
                    />
                    <p
                      v-show="
                        check_video_url(new_response.source) === false &&
                        Boolean(new_response.source)
                      "
                      style="
                        color: red !important;
                        margin-bottom: 0px !important;
                        padding-top: 8px !important;
                      "
                    >
                      {{tlt('valid_video_url')}}
                    </p>
                  </div>
                </div>
                <div v-if="new_response.type == 'choices'" class="custom-box">
                  <span
                    style="float: right; cursor: pointer; font-size: 14px"
                    @click="
                      remove_notification_to_assistant_response(
                        new_response.id,
                        new_response.recognizes
                      )
                    "
                    class="btn btn-light"
                    title="Remove Response"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </span>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    class="btn btn-light"
                    :disabled="index === notification_successful_assistant_response.length-1"
                    :style="index === notification_successful_assistant_response.length-1 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        notification_successful_assistant_response[index+1].id,
                        'notification_modal'
                      )
                    "
                    title="Move down"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    :disabled="index === 0"
                    :style="index === 0 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        notification_successful_assistant_response[index-1].id,
                        'notification_modal'
                      )
                    "
                    class="btn btn-light"
                    title="Move Up"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#273679" class="bi bi-chevron-up" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                  </button>
                  <p class="sub_heading">
                    {{tlt('config_success_choice_response_header')}} : {{ new_response.id }}
                  </p>
                  <div>
                    <template>
                      <div style="display: block; margin-bottom: 1rem">
                        <div
                          v-for="(response, num) in new_response.choices"
                          :key="num"
                          class="d-flex mb-2"
                        >
                          <div class="input-group" style="display: block">
                            <div class="d-flex">
                              <input
                                type="text"
                                v-model.trim="response.title"
                                class="form-control input-tag"
                                :placeholder="tlt('enter_title')"
                                maxlength="50"
                                style="
                                  width: 100% !important;
                                  padding: 0.375rem 0.5rem;
                                  border-radius: 5px 0px 0px 5px !important;
                                "
                              />
                              <input
                                type="text"
                                v-model.trim="response.payload"
                                class="form-control input-tag"
                                :placeholder="
                                  change_btn_value_placeholder(response.type)
                                "
                                style="
                                  width: 100% !important;
                                  padding: 0.375rem 0.5rem;
                                  border-radius: 0px !important;
                                "
                              />
                              <div class="input-group-append">
                                <select
                                  class="form-control"
                                  v-model="response.type"
                                  style="
                                    width: 100px !important;
                                    height: 38px;
                                    padding: 0px !important;
                                  "
                                  id="button_type_list_id"
                                >
                                  <option
                                    v-for="(option, index) in button_type_list"
                                    :key="index"
                                    :value="option.value"
                                  >
                                    {{ option.name }}
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <span
                            style="cursor: pointer; float: right"
                            class="close my-auto mr-0 ml-2"
                            title="Remove Choice Response"
                            v-if="new_response.choices.length > 1"
                            @click="
                              add_to_assistant_response_choice_list(
                                'remove',
                                new_response.id,
                                num
                              )
                            "
                          >
                            &times;</span
                          >
                        </div>
                      </div>
                    </template>
                    <div class="d-flex">
                      <p style="margin-top: 6px; margin-bottom: 5px">
                        {{tlt('config_success_add_choice_btn')}}
                      </p>
                      <button
                        style="
                          cursor: pointer;
                          border: none;
                          background: transparent
                            url('@portal/assets/img/plus.png') 0% 0% no-repeat
                            padding-box;
                        "
                        @click="
                          add_to_assistant_response_choice_list(
                            'add',
                            new_response.id
                          )
                        "
                      >
                        <img src="/img/black_plus.png" alt="" />
                      </button>
                    </div>
                  </div>
                </div>
                <div v-if="new_response.type == 'card'" class="custom-box">
                  <span
                    style="float: right; cursor: pointer; font-size: 14px"
                    @click="
                      remove_notification_to_assistant_response(
                        new_response.id,
                        new_response.recognizes
                      )
                    "
                    class="btn btn-light"
                    title="Remove Response"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </span>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    class="btn btn-light"
                    :disabled="index === notification_successful_assistant_response.length-1"
                    :style="index === notification_successful_assistant_response.length-1 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        notification_successful_assistant_response[index+1].id,
                        'notification_modal'
                      )
                    "
                    title="Move down"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    :disabled="index === 0"
                    :style="index === 0 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        notification_successful_assistant_response[index-1].id,
                        'notification_modal'
                      )
                    "
                    class="btn btn-light"
                    title="Move Up"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#273679" class="bi bi-chevron-up" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                  </button>
                  <p class="sub_heading">
                    {{tlt('config_success_card_response_header')}} : {{ new_response.id }}
                  </p>
                  <div>
                    <template>
                      <div class="row">
                        <div
                          v-for="(response, num) in new_response.card_list"
                          :key="num"
                          class="col-sm-4 pb-3"
                        >
                          <div class="card">
                            <div class="card-body">
                              <p
                                class="sub_heading_carousel"
                                style="color: dimgray; margin-bottom: 5px"
                              >
                                {{tlt('config_success_card_response_card_label')}} : {{ num + 1 }}
                              </p>
                              <span
                                style="
                                  cursor: pointer;
                                  float: right;
                                  margin-top: -29px;
                                "
                                class="close ml-auto mr-0"
                                title="Remove Card Response"
                                v-if="new_response.card_list.length > 1"
                                @click="
                                  add_to_assistant_response_carousel_card_list(
                                    'remove',
                                    new_response.id,
                                    num
                                  )
                                "
                              >
                                &times;</span
                              >
                              <div>
                                <div class="d-sm-flex justify-content-start">
                                  <h6
                                    class="label_header"
                                    style="margin-top: 0"
                                  >
                                    {{tlt('config_success_card_response_file_type_label')}}:
                                  </h6>
                                  <div class="radio my-auto radio-label">
                                    <label style="font-size: 13px">
                                      <input
                                        type="radio"
                                        v-model="response.is_image"
                                        :value="true"
                                        id="carousel_img"
                                      />
                                      <span
                                        class="icn"
                                        id="filter_portal_user_radio"
                                      ></span>
                                      {{tlt('config_success_card_response_image_label')}}
                                    </label>
                                    <label style="font-size: 13px">
                                      <input
                                        type="radio"
                                        v-model="response.is_image"
                                        :value="false"
                                        id="carousel_video"
                                      />
                                      <span class="icn"></span> {{tlt('config_success_card_response_video_label')}}
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div v-if="response.is_image">
                                <input
                                  class="form-control input-tag"
                                  style="width: 100%; padding: 0.375rem 0.5rem"
                                  :placeholder="tlt('img_url')"
                                  type="text"
                                  v-model="response.image"
                                />
                                <p
                                  v-show="
                                    check_image_url(response.image) === false &&
                                    Boolean(response.image)
                                  "
                                  style="
                                    color: red !important;
                                    margin-bottom: 0px !important;
                                    padding-top: 8px !important;
                                  "
                                >
                                  {{tlt('img_url_condition')}}
                                </p>
                              </div>
                              <div v-else>
                                <input
                                  type="text"
                                  v-model.trim="response.video"
                                  class="form-control input-tag"
                                  :placeholder="tlt('video_url')"
                                  style="
                                    width: 100% !important;
                                    padding: 0.375rem 0.5rem;
                                  "
                                />
                                <p
                                  v-show="
                                    check_video_url(response.video) === false &&
                                    Boolean(response.video)
                                  "
                                  style="
                                    color: red !important;
                                    margin-bottom: 0px !important;
                                    padding-top: 8px !important;
                                  "
                                >
                                  {{tlt('valid_video_url')}}
                                </p>
                              </div>
                              <label class="label_header">{{tlt('config_success_card_response_title_label')}}</label>
                              <input
                                type="text"
                                v-model.trim="response.title"
                                class="form-control input-tag"
                                :placeholder="tlt('enter_title')"
                                style="
                                  width: 100% !important;
                                  padding: 0.375rem 0.5rem;
                                "
                              />
                              <label class="label_header">{{tlt('config_success_card_response_desc_label')}}</label>
                              <textarea
                                type="text"
                                v-model.trim="response.text"
                                class="form-control input-tag textarea-style"
                                rows="3"
                                cols="20"
                                :placeholder="tlt('enter_description')"
                                style="resize: none"
                              ></textarea>
                              <div>
                                <p class="label_header">{{tlt('config_success_card_response_button_label')}}</p>
                                <!-- <div class="custom-button-box px-3 py-2 pt-0 mt-3 mb-3"> -->
                                <div class="ScrollStyle">
                                  <div
                                    v-for="(
                                      button, btn_num
                                    ) in response.buttons"
                                    :key="btn_num"
                                    class="mb-2"
                                  >
                                    <div class="d-flex">
                                      <div
                                        class="input-group"
                                        style="display: block"
                                      >
                                        <div class="d-flex">
                                          <input
                                            type="text"
                                            v-model.trim="button.title"
                                            class="form-control input-tag"
                                            :placeholder="tlt('enter_title')"
                                            maxlength="50"
                                            style="
                                              width: 100% !important;
                                              padding: 0.375rem 0.5rem;
                                              border-radius: 5px 0px 0px 5px !important;
                                            "
                                          />
                                          <input
                                            type="text"
                                            v-model.trim="button.value"
                                            class="form-control input-tag"
                                            :placeholder="
                                              change_btn_value_placeholder(
                                                button.type
                                              )
                                            "
                                            style="
                                              width: 100% !important;
                                              padding: 0.375rem 0.5rem;
                                              border-radius: 0px !important;
                                            "
                                          />
                                          <div class="input-group-append">
                                            <select
                                              class="form-control"
                                              v-model="button.type"
                                              style="
                                                width: 20px !important;
                                                height: 38px;
                                                padding: 0px !important;
                                              "
                                              id="button_type_list_id"
                                            >
                                              <option
                                                v-for="(
                                                  option, index
                                                ) in button_type_list"
                                                :key="index"
                                                :value="option.value"
                                              >
                                                {{ option.name }}
                                              </option>
                                            </select>
                                          </div>
                                        </div>
                                      </div>
                                      <span
                                        style="
                                          cursor: pointer;
                                          float: right;
                                          margin-top: 8px;
                                        "
                                        class="close mx-1"
                                        title="Remove Button Response"
                                        v-if="response.buttons.length > 1"
                                        @click="
                                          add_to_assistant_response_carousel_card_button_list(
                                            'remove',
                                            new_response.id,
                                            num,
                                            btn_num
                                          )
                                        "
                                      >
                                        &times;</span
                                      >
                                    </div>
                                  </div>
                                </div>
                                <div class="d-flex">
                                  <p
                                    style="margin-top: 6px; margin-bottom: 5px"
                                  >
                                    {{tlt('config_success_card_response_add_btn_label')}}
                                  </p>
                                  <button
                                    style="
                                      cursor: pointer;
                                      border: none;
                                      background: transparent
                                        url('@portal/assets/img/plus.png') 0% 0%
                                        no-repeat padding-box;
                                    "
                                    @click="
                                      add_to_assistant_response_carousel_card_button_list(
                                        'add',
                                        new_response.id,
                                        num
                                      )
                                    "
                                  >
                                    <img src="/img/black_plus.png" alt="" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                    <div class="d-flex">
                      <p style="margin-top: 6px; margin-bottom: 5px">
                        {{tlt('config_success_card_response_add_card_label')}}
                      </p>
                      <button
                        style="
                          cursor: pointer;
                          border: none;
                          background: transparent
                            url('@portal/assets/img/plus.png') 0% 0% no-repeat
                            padding-box;
                        "
                        @click="
                          add_to_assistant_response_carousel_card_list(
                            'add',
                            new_response.id
                          )
                        "
                      >
                        <img src="/img/black_plus.png" alt="" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex" style="margin-left: 1rem !important">
                <p class="sub_heading">{{tlt('config_success_response_type_first_label')}}:</p>
                <select
                  class="form-control input-tag"
                  v-model="selected_response_type"
                  style="
                    width: 100px;
                    height: 25px;
                    margin-left: 10px;
                    padding: 0px;
                  "
                  id="res_n_int_source"
                >
                  <option
                    v-for="(option, index) in assistant_response_type"
                    :key="index"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
                <!-- </div> -->
                <!-- <div class="d-flex"> -->
                <p class="sub_heading" style="margin-left: 20px">
                  {{tlt('config_success_add_response_btn')}}
                </p>
                <button
                  style="
                    margin-top: -14px;
                    cursor: pointer;
                    border: none;
                    background: transparent url('@portal/assets/img/plus.png')
                      0% 0% no-repeat padding-box;
                  "
                  @click="
                    add_notification_successful_to_assistant_response(
                      'successful'
                    )
                  "
                >
                  <img src="/img/black_plus.png" alt="" />
                </button>
              </div>
            </div>
            <hr />
            <div class="form-group">
              <h5 style="margin-top: 6px; margin-bottom: 5px">
                {{tlt('config_notification_when_unsuccess_label')}}
              </h5>
              <div
                v-for="(
                  new_response, index
                ) in notification_unsuccessful_assistant_response"
                :key="index"
                class="form-group"
              >
                <div v-if="new_response.type == 'text'" class="custom-box">
                  <span
                    style="float: right; cursor: pointer; font-size: 14px"
                    @click="
                      remove_notification_to_assistant_response(
                        new_response.id,
                        new_response.recognizes
                      )
                    "
                    class="btn btn-light"
                    title="Remove Response"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </span>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    class="btn btn-light"
                    :disabled="index === notification_unsuccessful_assistant_response.length-1"
                    :style="index === notification_unsuccessful_assistant_response.length-1 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        notification_unsuccessful_assistant_response[index+1].id,
                        'notification_modal'
                      )
                    "
                    title="Move down"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    :disabled="index === 0"
                    :style="index === 0 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        notification_unsuccessful_assistant_response[index-1].id,
                        'notification_modal'
                      )
                    "
                    class="btn btn-light"
                    title="Move Up"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#273679" class="bi bi-chevron-up" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                  </button>
                  <p class="sub_heading">
                    {{tlt('config_unsuccess_text_response_header')}} : {{ new_response.id }}
                  </p>
                  <div>
                    <div
                      v-for="(response, num) in new_response.values"
                      :key="num"
                      class="form-group"
                    >
                      <div class="d-flex">
                        <input
                          class="form-control input-tag"
                          :placeholder="tlt('response_text')"
                          style="width: 100%; padding: 0.375rem 0.5rem"
                          type="text"
                          v-model="new_response.values[num]"
                          :id="
                            'assistance_response_' + new_response.id + '_' + num
                          "
                          @focusout="
                            insert_variable_block_off(new_response.id, num)
                          "
                          @focusin="
                            insert_variable_block_on(new_response.id, num)
                          "
                          v-on:keyup.enter="
                            add_to_assistant_response_text_list(
                              'add',
                              new_response.id
                            )
                          "
                        />
                        <div
                          style="opacity: 0"
                          :id="
                            'insert_variable_block' +
                            new_response.id +
                            '_' +
                            num
                          "
                        >
                          <a
                            @click="
                              set_assistance_response_index(
                                new_response.id,
                                num
                              )
                            "
                            class="example fa-stack fa-1x"
                            id="insert_variable_button"
                            type="button"
                            data-toggle="modal"
                            data-target="#insert_variable_modal"
                            style="margin-top: 20px !important"
                          >
                            <i
                              class="fas fa-circle fa-stack-2x"
                              style="color: #dbe2e8"
                              :id="
                                'insert_variable_circle_' +
                                new_response.id +
                                '_' +
                                num
                              "
                            >
                            </i>
                            <span
                              class="fa fa-stack-1x"
                              style="color: white"
                              @mouseover="
                                circle_mouseover(new_response.id, num)
                              "
                              @mouseout="circle_mouseout(new_response.id, num)"
                            >
                              <span style="font-size: 14px; display: block">
                                {...}
                              </span>
                            </span>
                          </a>
                        </div>
                        <span
                          style="margin-left: 12px; color: #0645ad"
                          class="my-auto"
                          v-if="
                            check_slot_value_use_in_response(
                              new_response.values[num]
                            )
                          "
                        >
                          <i
                            class="fa fa-info-circle"
                            aria-hidden="true"
                            style="font-size: 16px"
                            title="You have used {} in the response, which is used to access slot value, i.e it would add the value gathered by slot if enabled in previous or current node. (example: Email: {$email_id} would print Email: test@mail.com)."
                          >
                          </i>
                        </span>
                        <span
                          v-if="new_response.values.length > 1"
                          title="Remove Text Response"
                          class="close my-auto"
                          style="cursor: pointer; margin-left: 12px"
                          @click="
                            add_to_assistant_response_text_list(
                              'remove',
                              new_response.id,
                              num
                            )
                          "
                        >
                          &times;
                        </span>
                      </div>
                    </div>
                    <div class="d-flex">
                      <p style="margin-top: 6px; margin-bottom: 5px">
                        {{tlt('config_unsuccess_add_value_btn')}}
                      </p>
                      <button
                        style="
                          cursor: pointer;
                          border: none;
                          background: transparent
                            url('@portal/assets/img/plus.png') 0% 0% no-repeat
                            padding-box;
                        "
                        @click="
                          add_to_assistant_response_text_list(
                            'add',
                            new_response.id
                          )
                        "
                      >
                        <img src="/img/black_plus.png" alt="" />
                      </button>
                    </div>
                    <div class="response-variations">
                      <span
                        >{{tlt('response_variation_text1')}}
                        <strong>{{ new_response.variation }}</strong
                        >.</span
                      >
                      {{tlt('response_variation_text2')}}
                      <a
                        @click="
                          select_response_variation(
                            new_response.id,
                            'sequential'
                          )
                        "
                        v-show="new_response.variation != 'sequential'"
                        href="javascript:void(0);"
                        class="response-variation"
                      >
                        {{tlt('response_variation_text3')}}
                      </a>
                      <span v-show="new_response.variation != 'sequential'">
                        |
                      </span>
                      <a
                        @click="
                          select_response_variation(
                            new_response.id,
                            'multiline'
                          )
                        "
                        v-show="new_response.variation != 'multiline'"
                        href="javascript:void(0);"
                        class="variation-multiline"
                      >
                        {{tlt('response_variation_text4')}}
                      </a>
                      <span
                        v-show="
                          new_response.variation != 'random' &&
                          new_response.variation != 'multiline'
                        "
                      >
                        |
                      </span>
                      <a
                        @click="
                          select_response_variation(new_response.id, 'random')
                        "
                        v-show="new_response.variation != 'random'"
                        href="javascript:void(0);"
                        class="variation-random"
                      >
                        {{tlt('response_variation_text5')}}
                      </a>
                    </div>
                  </div>
                </div>
                <div v-if="new_response.type == 'image'" class="custom-box">
                  <span
                    style="float: right; cursor: pointer; font-size: 14px"
                    @click="
                      remove_notification_to_assistant_response(
                        new_response.id,
                        new_response.recognizes
                      )
                    "
                    class="btn btn-light"
                    title="Remove Response"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </span>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    class="btn btn-light"
                    :disabled="index === notification_unsuccessful_assistant_response.length-1"
                    :style="index === notification_unsuccessful_assistant_response.length-1 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        notification_unsuccessful_assistant_response[index+1].id,
                        'notification_modal'
                      )
                    "
                    title="Move down"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    :disabled="index === 0"
                    :style="index === 0 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        notification_unsuccessful_assistant_response[index-1].id,
                        'notification_modal'
                      )
                    "
                    class="btn btn-light"
                    title="Move Up"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#273679" class="bi bi-chevron-up" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                  </button>
                  <p class="sub_heading">{{tlt('config_unsuccess_img_response_header')}} :</p>
                  <div>
                    <input
                      class="form-control input-tag"
                      style="width: 100%; padding: 0.375rem 0.5rem"
                      :placeholder="tlt('add_img_url')"
                      type="text"
                      v-model="new_response.source"
                    />
                    <p
                      v-show="
                        check_image_url(new_response.source) == false &&
                        Boolean(new_response.source)
                      "
                      style="
                        color: red !important;
                        margin-bottom: 0px !important;
                        padding-top: 8px !important;
                      "
                    >
                      {{tlt('img_url_condition')}}
                    </p>
                  </div>
                </div>
                <div v-if="new_response.type == 'video'" class="custom-box">
                  <span
                    style="float: right; cursor: pointer; font-size: 14px"
                    @click="
                      remove_notification_to_assistant_response(
                        new_response.id,
                        new_response.recognizes
                      )
                    "
                    class="btn btn-light"
                    title="Remove Response"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </span>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    class="btn btn-light"
                    :disabled="index === notification_unsuccessful_assistant_response.length-1"
                    :style="index === notification_unsuccessful_assistant_response.length-1 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        notification_unsuccessful_assistant_response[index+1].id,
                        'notification_modal'
                      )
                    "
                    title="Move down"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    :disabled="index === 0"
                    :style="index === 0 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        notification_unsuccessful_assistant_response[index-1].id,
                        'notification_modal'
                      )
                    "
                    class="btn btn-light"
                    title="Move Up"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#273679" class="bi bi-chevron-up" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                  </button>
                  <p class="sub_heading">
                    {{tlt('video_response_label')}} : {{ new_response.id }}
                  </p>
                  <div>
                    <input
                      class="form-control input-tag"
                      style="width: 100%; padding: 0.375rem 0.5rem"
                      :placeholder="tlt('add_video_url')"
                      type="text"
                      v-model.trim="new_response.source"
                    />
                    <p
                      v-show="
                        check_video_url(new_response.source) === false &&
                        Boolean(new_response.source)
                      "
                      style="
                        color: red !important;
                        margin-bottom: 0px !important;
                        padding-top: 8px !important;
                      "
                    >
                      {{tlt('valid_video_url')}}
                    </p>
                  </div>
                </div>
                <div v-if="new_response.type == 'choices'" class="custom-box">
                  <span
                    style="float: right; cursor: pointer; font-size: 14px"
                    @click="
                      remove_notification_to_assistant_response(
                        new_response.id,
                        new_response.recognizes
                      )
                    "
                    class="btn btn-light"
                    title="Remove Response"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </span>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    class="btn btn-light"
                    :disabled="index === notification_unsuccessful_assistant_response.length-1"
                    :style="index === notification_unsuccessful_assistant_response.length-1 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        notification_unsuccessful_assistant_response[index+1].id,
                        'notification_modal'
                      )
                    "
                    title="Move down"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    :disabled="index === 0"
                    :style="index === 0 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        notification_unsuccessful_assistant_response[index-1].id,
                        'notification_modal'
                      )
                    "
                    class="btn btn-light"
                    title="Move Up"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#273679" class="bi bi-chevron-up" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                  </button>
                  <p class="sub_heading">
                    {{tlt('config_unsuccess_choice_response_header')}} : {{ new_response.id }}
                  </p>
                  <div>
                    <template>
                      <div style="display: block; margin-bottom: 1rem">
                        <div
                          v-for="(response, num) in new_response.choices"
                          :key="num"
                          class="d-flex mb-2"
                        >
                          <div class="input-group" style="display: block">
                            <div class="d-flex">
                              <input
                                type="text"
                                v-model.trim="response.title"
                                class="form-control input-tag"
                                :placeholder="tlt('enter_title')"
                                maxlength="50"
                                style="
                                  width: 100% !important;
                                  padding: 0.375rem 0.5rem;
                                  border-radius: 5px 0px 0px 5px !important;
                                "
                              />
                              <input
                                type="text"
                                v-model.trim="response.payload"
                                class="form-control input-tag"
                                :placeholder="
                                  change_btn_value_placeholder(response.type)
                                "
                                style="
                                  width: 100% !important;
                                  padding: 0.375rem 0.5rem;
                                  border-radius: 0px !important;
                                "
                              />
                              <div class="input-group-append">
                                <select
                                  class="form-control"
                                  v-model="response.type"
                                  style="
                                    width: 100px !important;
                                    height: 38px;
                                    padding: 0px !important;
                                  "
                                  id="button_type_list_id"
                                >
                                  <option
                                    v-for="(option, index) in button_type_list"
                                    :key="index"
                                    :value="option.value"
                                  >
                                    {{ option.name }}
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <span
                            style="cursor: pointer; float: right"
                            class="close my-auto mr-0 ml-2"
                            title="Remove Choice Response"
                            v-if="new_response.choices.length > 1"
                            @click="
                              add_to_assistant_response_choice_list(
                                'remove',
                                new_response.id,
                                num
                              )
                            "
                          >
                            &times;</span
                          >
                        </div>
                      </div>
                    </template>
                    <div class="d-flex">
                      <p style="margin-top: 6px; margin-bottom: 5px">
                        {{tlt('config_unsuccess_add_choice_btn')}}
                      </p>
                      <button
                        style="
                          cursor: pointer;
                          border: none;
                          background: transparent
                            url('@portal/assets/img/plus.png') 0% 0% no-repeat
                            padding-box;
                        "
                        @click="
                          add_to_assistant_response_choice_list(
                            'add',
                            new_response.id
                          )
                        "
                      >
                        <img src="/img/black_plus.png" alt="" />
                      </button>
                    </div>
                  </div>
                </div>
                <div v-if="new_response.type == 'card'" class="custom-box">
                  <span
                    style="float: right; cursor: pointer; font-size: 14px"
                    @click="
                      remove_notification_to_assistant_response(
                        new_response.id,
                        new_response.recognizes
                      )
                    "
                    class="btn btn-light"
                    title="Remove Response"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </span>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    class="btn btn-light"
                    :disabled="index === notification_unsuccessful_assistant_response.length-1"
                    :style="index === notification_unsuccessful_assistant_response.length-1 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        notification_unsuccessful_assistant_response[index+1].id,
                        'notification_modal'
                      )
                    "
                    title="Move down"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                  <button
                    style="float: right; cursor: pointer; font-size: 14px"
                    :disabled="index === 0"
                    :style="index === 0 ?'cursor: not-allowed':''"
                    @click="
                      interchange_position_assistant_response(
                        new_response.id,
                        notification_unsuccessful_assistant_response[index-1].id,
                        'notification_modal'
                      )
                    "
                    class="btn btn-light"
                    title="Move Up"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#273679" class="bi bi-chevron-up" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                  </button>
                  <p class="sub_heading">
                    {{tlt('config_unsuccess_card_response_header')}} : {{ new_response.id }}
                  </p>
                  <div>
                    <template>
                      <div class="row">
                        <div
                          v-for="(response, num) in new_response.card_list"
                          :key="num"
                          class="col-sm-4 pb-3"
                        >
                          <div class="card">
                            <div class="card-body">
                              <p
                                class="sub_heading_carousel"
                                style="color: dimgray; margin-bottom: 5px"
                              >
                                {{tlt('config_unsuccess_card_response_card_label')}} : {{ num + 1 }}
                              </p>
                              <span
                                style="
                                  cursor: pointer;
                                  float: right;
                                  margin-top: -29px;
                                "
                                class="close ml-auto mr-0"
                                title="Remove Card Response"
                                v-if="new_response.card_list.length > 1"
                                @click="
                                  add_to_assistant_response_carousel_card_list(
                                    'remove',
                                    new_response.id,
                                    num
                                  )
                                "
                              >
                                &times;</span
                              >
                              <div>
                                <div class="d-sm-flex justify-content-start">
                                  <h6
                                    class="label_header"
                                    style="margin-top: 0"
                                  >
                                    {{tlt('config_unsuccess_card_response_file_type_label')}}:
                                  </h6>
                                  <div class="radio my-auto radio-label">
                                    <label style="font-size: 13px">
                                      <input
                                        type="radio"
                                        v-model="response.is_image"
                                        :value="true"
                                        id="carousel_img"
                                      />
                                      <span
                                        class="icn"
                                        id="filter_portal_user_radio"
                                      ></span>
                                      {{tlt('config_unsuccess_card_response_image_label')}}
                                    </label>
                                    <label style="font-size: 13px">
                                      <input
                                        type="radio"
                                        v-model="response.is_image"
                                        :value="false"
                                        id="carousel_video"
                                      />
                                      <span class="icn"></span> {{tlt('config_unsuccess_card_response_video_label')}}
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div v-if="response.is_image">
                                <input
                                  class="form-control input-tag"
                                  style="width: 100%; padding: 0.375rem 0.5rem"
                                  :placeholder="tlt('img_url')"
                                  type="text"
                                  v-model="response.image"
                                />
                                <p
                                  v-show="
                                    check_image_url(response.image) === false &&
                                    Boolean(response.image)
                                  "
                                  style="
                                    color: red !important;
                                    margin-bottom: 0px !important;
                                    padding-top: 8px !important;
                                  "
                                >
                                  {{tlt('card_response_image_condition_text')}}
                                </p>
                              </div>
                              <div v-else>
                                <input
                                  type="text"
                                  v-model.trim="response.video"
                                  class="form-control input-tag"
                                  :placeholder="tlt('video_url')"
                                  style="
                                    width: 100% !important;
                                    padding: 0.375rem 0.5rem;
                                  "
                                />
                                <p
                                  v-show="
                                    check_video_url(response.video) === false &&
                                    Boolean(response.video)
                                  "
                                  style="
                                    color: red !important;
                                    margin-bottom: 0px !important;
                                    padding-top: 8px !important;
                                  "
                                >
                                  {{tlt('card_response_video_condition_text')}}
                                </p>
                              </div>
                              <label class="label_header">{{tlt('config_unsuccess_card_response_title_label')}}</label>
                              <input
                                type="text"
                                v-model.trim="response.title"
                                class="form-control input-tag"
                                :placeholder="tlt('enter_title')"
                                style="
                                  width: 100% !important;
                                  padding: 0.375rem 0.5rem;
                                "
                              />
                              <label class="label_header">{{tlt('config_unsuccess_card_response_desc_label')}}</label>
                              <textarea
                                type="text"
                                v-model.trim="response.text"
                                class="form-control input-tag textarea-style"
                                rows="3"
                                cols="20"
                                :placeholder="tlt('enter_description')"
                                style="resize: none"
                              ></textarea>
                              <div>
                                <p class="label_header">{{tlt('config_unsuccess_card_response_button_label')}}</p>
                                <!-- <div class="custom-button-box px-3 py-2 pt-0 mt-3 mb-3"> -->
                                <div class="ScrollStyle">
                                  <div
                                    v-for="(
                                      button, btn_num
                                    ) in response.buttons"
                                    :key="btn_num"
                                    class="mb-2"
                                  >
                                    <div class="d-flex">
                                      <div
                                        class="input-group"
                                        style="display: block"
                                      >
                                        <div class="d-flex">
                                          <input
                                            type="text"
                                            v-model.trim="button.title"
                                            class="form-control input-tag"
                                            :placeholder="tlt('enter_title')"
                                            maxlength="50"
                                            style="
                                              width: 100% !important;
                                              padding: 0.375rem 0.5rem;
                                              border-radius: 5px 0px 0px 5px !important;
                                            "
                                          />
                                          <input
                                            type="text"
                                            v-model.trim="button.value"
                                            class="form-control input-tag"
                                            :placeholder="
                                              change_btn_value_placeholder(
                                                button.type
                                              )
                                            "
                                            style="
                                              width: 100% !important;
                                              padding: 0.375rem 0.5rem;
                                              border-radius: 0px !important;
                                            "
                                          />
                                          <div class="input-group-append">
                                            <select
                                              class="form-control"
                                              v-model="button.type"
                                              style="
                                                width: 20px !important;
                                                height: 38px;
                                                padding: 0px !important;
                                              "
                                              id="button_type_list_id"
                                            >
                                              <option
                                                v-for="(
                                                  option, index
                                                ) in button_type_list"
                                                :key="index"
                                                :value="option.value"
                                              >
                                                {{ option.name }}
                                              </option>
                                            </select>
                                          </div>
                                        </div>
                                      </div>
                                      <span
                                        style="
                                          cursor: pointer;
                                          float: right;
                                          margin-top: 8px;
                                        "
                                        class="close mx-1"
                                        title="Remove Button Response"
                                        v-if="response.buttons.length > 1"
                                        @click="
                                          add_to_assistant_response_carousel_card_button_list(
                                            'remove',
                                            new_response.id,
                                            num,
                                            btn_num
                                          )
                                        "
                                      >
                                        &times;</span
                                      >
                                    </div>
                                  </div>
                                </div>
                                <div class="d-flex">
                                  <p
                                    style="margin-top: 6px; margin-bottom: 5px"
                                  >
                                    {{tlt('config_unsuccess_card_response_add_btn_label')}}
                                  </p>
                                  <button
                                    style="
                                      cursor: pointer;
                                      border: none;
                                      background: transparent
                                        url('@portal/assets/img/plus.png') 0% 0%
                                        no-repeat padding-box;
                                    "
                                    @click="
                                      add_to_assistant_response_carousel_card_button_list(
                                        'add',
                                        new_response.id,
                                        num
                                      )
                                    "
                                  >
                                    <img src="/img/black_plus.png" alt="" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                    <div class="d-flex">
                      <p style="margin-top: 6px; margin-bottom: 5px">
                        {{tlt('config_unsuccess_card_response_add_card_label')}}
                      </p>
                      <button
                        style="
                          cursor: pointer;
                          border: none;
                          background: transparent
                            url('@portal/assets/img/plus.png') 0% 0% no-repeat
                            padding-box;
                        "
                        @click="
                          add_to_assistant_response_carousel_card_list(
                            'add',
                            new_response.id
                          )
                        "
                      >
                        <img src="/img/black_plus.png" alt="" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex" style="margin-left: 1rem !important">
                <p class="sub_heading">{{tlt('config_unsuccess_response_type_first_label')}} :</p>
                <select
                  class="form-control input-tag"
                  v-model="selected_response_type"
                  style="
                    width: 100px;
                    height: 25px;
                    margin-left: 10px;
                    padding: 0px;
                  "
                  id="res_n_int_source"
                >
                  <option
                    v-for="(option, index) in assistant_response_type"
                    :key="index"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
                <!-- </div> -->
                <!-- <div class="d-flex"> -->
                <p class="sub_heading" style="margin-left: 20px">
                  {{tlt('config_unsuccess_add_response_btn')}}
                </p>
                <button
                  style="
                    margin-top: -14px;
                    cursor: pointer;
                    border: none;
                    background: transparent url('@portal/assets/img/plus.png')
                      0% 0% no-repeat padding-box;
                  "
                  @click="
                    add_notification_successful_to_assistant_response(
                      'unsuccessful'
                    )
                  "
                >
                  <img src="/img/black_plus.png" alt="" />
                </button>
              </div>
            </div>
          </div>
          <!-- <div class="modal-footer">
            <a href="#" data-dismiss="modal" class="btn">Close</a>
            <a href="#" class="btn btn-primary">Save changes</a>
          </div> -->
        </div>
      </div>
    </div>
    <div
      class="modal"
      id="insert_variable_modal"
      aria-labelledby="insert_variable_modal"
    >
      <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
        <div class="modal-content" style="box-shadow: none !important">
          <div class="modal-body">
            <div>
              <multiselect
                id="insert_variable_id"
                :close-on-select="false"
                :options="insert_slot_variable_options"
                :placeholder="tlt('select_variable')"
                :show-labels="false"
                open-direction="top"
                :max-height="120"
                @open="add_to_insert_slot_variable_options"
                @input="insert_slot_variable_to_assistance_response($event)"
              >
              </multiselect>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal"
      id="manage_handlers_insert_variable_modal"
      aria-labelledby="manage_handlers_insert_variable_modal"
    >
      <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
        <div class="modal-content" style="box-shadow: none !important">
          <div class="modal-body">
            <div>
              <multiselect
                id="manage_handlers_insert_variable_id"
                :close-on-select="false"
                :options="insert_slot_variable_options"
                :placeholder="tlt('select_variable')"
                :show-labels="false"
                open-direction="top"
                :max-height="120"
                @open="add_to_insert_slot_variable_options"
                @input="
                  manage_handlers_insert_slot_variable_to_assistance_response(
                    $event
                  )
                "
              >
              </multiselect>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Tree, TreeNode } from "vue-tree-list";
import {
  VueTreeList,
  Tree,
  TreeNode,
} from "../../../../../public/js/vue-tree-list.umd.min.js";
import axios from "axios";
import api_calls from "@/portal/api_calls";
import Swal from "sweetalert2";
import { VueEditor } from "vue2-editor";
import Multiselect from "vue-multiselect";
import ResponseBot from "../Data Inputs/ResponseBot";
import draggable from "vuedraggable";
import { freeze_portal, show_subscription_expired_swal , close_modal } from "@/portal/mixins";
export default {
  components: {
    VueTreeList,
    VueEditor,
    Multiselect,
    ResponseBot,
    draggable,
  },
  name: "dialog_component",
  mixins: [freeze_portal, show_subscription_expired_swal , close_modal],
  data() {
    return {
      selected_entity:"",
      updated_node_list: "",
      spinnerOn: false,
      button_type_list: [
        { value: "postback", name: "Postback" },
        { value: "web_url", name: "URL" },
      ],
      assistance_response_id: 0,
      assistance_response__val_index: 0,
      manage_handlers_ind: 0,
      manage_handlers_assistance_response_id: 0,
      manage_handlers_assistance_response__val_index: 0,
      slot_variable: [],
      filtered_assistant_response:[],
      reg_url:
        /https:\/\/[(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/i,
      reg_image:
        /(https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg|.jpeg|.gif)(\?[^\s[",><]*)?/,
      newTree: {},
      nodes_list: [],
      data: new Tree([]),
      load_bot_preview: false,
      drag_slots: false,
      // test_response_tree: [
      //   {
      //     id: 1623669014307,
      //     is_leaf: false,
      //     editNodeDisabled: true,
      //     name: "Hello",
      //     next_step: {
      //       behavior: "wait_for_reply",
      //       node_id: null,
      //       selector: "wait_for_user_input",
      //     },
      //     pid: 0,
      //     responses: [
      //       {
      //         condition: false,
      //         id: 0,
      //         recognizes: null,
      //         type: "text",
      //         values: ["Heyya"],
      //         variation: "random",
      //       },
      //       {
      //         condition: false,
      //         id: 1,
      //         recognizes: null,
      //         type: "text",
      //         values: ["Heyya2"],
      //         variation: "random",
      //       },
      //     ],
      //     slot_setting: false,
      //     slots: [],
      //     triggers: [
      //       {
      //         trigger_type: "intent",
      //         trigger_value: "intent",
      //       },
      //     ],
      //     webhook_id: null,
      //     webhook_integration: false,
      //     webhook_mapping: null,
      //     webhook_return_variable: null,
      //     children: [
      //       {
      //         id: 1623670999878,
      //         is_leaf: false,
      //         editNodeDisabled: true,
      //         name: "Hello child",
      //         next_step: {
      //           behavior: "wait_for_reply",
      //           node_id: null,
      //           selector: "wait_for_user_input",
      //         },
      //         pid: 1623669014307,
      //         responses: [
      //           {
      //             condition: false,
      //             id: 0,
      //             recognizes: null,
      //             type: "text",
      //             values: ["child", "node"],
      //             variation: "sequential",
      //           },
      //         ],
      //         slot_setting: false,
      //         slots: [],
      //         triggers: [
      //           {
      //             trigger_type: "intent",
      //             trigger_value: "intent",
      //           },
      //         ],
      //         webhook_id: null,
      //         webhook_integration: false,
      //         webhook_mapping: null,
      //         webhook_return_variable: null,
      //       },
      //       {
      //         id: 1623731025414,
      //         is_leaf: false,
      //         editNodeDisabled: true,
      //         name: "child_2",
      //         next_step: {
      //           behavior: "wait_for_reply",
      //           node_id: null,
      //           selector: "wait_for_user_input",
      //         },
      //         node_name: "basic_child_2",
      //         node_type: "basic",
      //         pid: 1623669014307,
      //         responses: [
      //           {
      //             condition: false,
      //             id: 0,
      //             recognizes: null,
      //             type: "text",
      //             values: ["child", "text response"],
      //             variation: "random",
      //           },
      //           {
      //             condition: false,
      //             id: 1,
      //             recognizes: null,
      //             source: "googl.com",
      //             type: "image",
      //             variation: "random",
      //           },
      //         ],
      //         slot_setting: false,
      //         slots: [],
      //         triggers: [
      //           {
      //             trigger_type: "intent",
      //             trigger_value: "intent",
      //           },
      //         ],
      //         webhook_id: null,
      //         webhook_integration: false,
      //         webhook_mapping: null,
      //         webhook_return_variable: null,
      //       },
      //     ],
      //   },
      //   {
      //     id: 1623670882130,
      //     is_leaf: false,
      //     editNodeDisabled: true,
      //     name: "World",
      //     next_step: {
      //       behavior: "wait_for_reply",
      //       node_id: null,
      //       selector: "wait_for_user_input",
      //     },
      //     node_name: "basic_World",
      //     node_type: "basic",
      //     pid: 0,
      //     responses: [
      //       {
      //         condition: false,
      //         id: "0",
      //         recognizes: null,
      //         type: "text",
      //         values: ["text"],
      //         variation: "random",
      //       },
      //       {
      //         condition: false,
      //         id: "1",
      //         recognizes: null,
      //         type: "text",
      //         values: ["resp"],
      //         variation: "random",
      //       },
      //     ],
      //     slot_setting: false,
      //     slots: [],
      //     triggers: [
      //       {
      //         trigger_type: "intent",
      //         trigger_value: "intent",
      //       },
      //     ],
      //     webhook_id: null,
      //     webhook_integration: false,
      //     webhook_mapping: null,
      //     webhook_return_variable: null,
      //   },
      //   {
      //     id: 1623671218996,
      //     is_leaf: false,
      //     editNodeDisabled: true,
      //     name: "Test node3",
      //     next_step: {
      //       behavior: "wait_for_reply",
      //       node_id: null,
      //       selector: "wait_for_user_input",
      //     },
      //     pid: 0,
      //     responses: [
      //       {
      //         condition: "unfilled",
      //         id: "0",
      //         recognizes: "$webhook_result",
      //         type: "text",
      //         values: ["webhook_variabble response"],
      //         variation: "random",
      //       },
      //     ],
      //     slot_setting: false,
      //     slots: [],
      //     triggers: [
      //       {
      //         trigger_type: "Intent",
      //         trigger_value: "Intent",
      //       },
      //     ],
      //     webhook_id: "1",
      //     webhook_integration: true,
      //     webhook_mapping: [
      //       {
      //         key: "name",
      //         value: "value",
      //       },
      //     ],
      //     webhook_return_variable: "$webhook_result",
      //     children: [
      //       {
      //         id: 1623730827206,
      //         is_leaf: false,
      //         editNodeDisabled: true,
      //         name: "test child node",
      //         next_step: {
      //           behavior: "wait_for_reply",
      //           node_id: null,
      //           selector: "wait_for_user_input",
      //         },
      //         node_name: "basic_test child node",
      //         node_type: "basic",
      //         pid: 1623671218996,
      //         responses: [
      //           {
      //             condition: false,
      //             id: 0,
      //             recognizes: null,
      //             type: "text",
      //             values: ["hello"],
      //             variation: "sequential",
      //           },
      //           {
      //             condition: false,
      //             id: 1,
      //             recognizes: null,
      //             type: "text",
      //             values: ["text", "response"],
      //             variation: "random",
      //           },
      //         ],
      //         slot_setting: false,
      //         slots: [],
      //         triggers: [
      //           {
      //             trigger_type: "Intent",
      //             trigger_value: "Intent",
      //           },
      //         ],
      //         webhook_id: "1",
      //         webhook_integration: true,
      //         webhook_mapping: [
      //           {
      //             key: "name",
      //             value: "$value",
      //           },
      //         ],
      //         webhook_return_variable: "$webhook_result",
      //       },
      //     ],
      //   },
      // ],
      new_child_node: false,
      child_node: {},
      node_id: "",
      node_name: "",
      node_type: "",
      is_root: false,
      assistant_response: [],
      assistant_response_type: ["text", "image", "video", "choices", "card"],
      selected_response_type: "text",
      response_variation: ["sequential"],
      triggers_filter_by_options: ["intent", "entity"],
      insert_slot_variable_options: [],
      entity_operand_options: ["is", "any"],
      triggers: [
        {
          trigger_type: "",
          trigger_value: "",
        },
      ],
      then_assistant_should: ["wait_for_reply", "jump_to"],
      save_then_assistant_should: "",
      next_step: {},
      jump_to_node_id: "",
      is_slot: false,
      is_webhook: false,
      is_notification: false,
      webhook_id: null,
      webhook_list: [],
      is_webhook_details: false,
      webhook_mapping: [],
      webhook_variable: "",
      webhook_assistant_response: [],
      slots: [],
      is_validation_entity: false,
      unfilled_slot_assistant_response: [],
      validation_slot_assistant_response: [],
      notification_successful_assistant_response: [],
      notification_unsuccessful_assistant_response: [],
      edit_slot_index: "",
      edit_slot_check_for: "",
      edit_slot_slot_variable: "",
      manage_handlers: [],
      notifications: {
        notify: [
          {
            type: "",
            slot: "",
            template_id: "",
            template_name: "",
          },
        ],
        responses: [],
      },
      notifications_notify_type_list: ["email"],
      notifications_notify_template_list: [
        // {
        //   "email": "<p>New Year Offers of 50% discount on all grocery products!!!</p>",
        //   "sms": null,
        //   "template_id": "435312bc-d427-497a-aece-b8b92a482e20",
        //   "template_name": "New Year Offers"
        // },
        // {
        //   "email": "<p>Sale of 50 % on diwali</p>",
        //   "sms": null,
        //   "template_id": "e766e795-9b3a-4ad8-8ea3-59d69edf0267",
        //   "template_name": "Diwali Template"
        // },
        // {
        //   "email": "<p>Hello Customers!</p><p>Christmas may be weeks ago but we are encouraging customers to shop early this year for timely delivery. COVID-19 will cause surge in online shopping, which means that there could be unexpected shipping delays with carriers. Go visit our store now: https://earthonstore.com/ </p>",
        //   "sms": null,
        //   "subject": "Offers",
        //   "template_id": "0bb0ceb3-fd30-413e-8f37-b0bc59bb00e7",
        //   "template_name": "Christmas"
        // }
      ],
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
      ],
      // entity_list: ["entity1","entity2"],
      entity_list: [],
      // trigger_options: ["INtent1","Intent2","Intent3"],
      trigger_options: [],
      trigger_options_intent: [],
      trigger_options_entity: [],
      intent_list_choice_card : [],
      trigger_options_entity_values: [],
      is_show_edit: false,
      is_loading: false,
      show_intent_list : false,
    };
  },
  watch: {},
  computed: {
    dragOptionsSlots() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
        scrollSensitivity: 200,
        forceFallback: true,
      };
    },
    // placeholder() {
    //   if (this.triggers.length > 1){
    //     this.trigger_options = [];
    //     return "Type to search Entity"
    //   }else{
    //     return "Type to search objective"
    //   }
    // }
  },
  mounted() {
    setTimeout(() => {
      this.freeze_portal();
    }, 1000);
    this.$root.$on("dialog_componentDisabled", (data) => {
      if (data === true) {
        this.show_subscription_expired_swal();
      }
    });
    // $("#try_bot_btn").click(function () {
    //   alert('clicked!');
    // });
    var vm = this;
    $("#insert_variable_modal").on("hidden.bs.modal", function (e) {
      var id = vm.assistance_response_id;
      var num = vm.assistance_response__val_index;
      $(`#assistance_response_${id}_${num}`).focus();
    });
    $("#manage_handlers_insert_variable_modal").on(
      "hidden.bs.modal",
      function (e) {
        var id = vm.manage_handlers_assistance_response_id;
        var num = vm.manage_handlers_assistance_response__val_index;
        $(`#manage_handlers_assistance_response_${id}_${num}`).focus();
      }
    );
    window.onclick = function (e) {
      if (
        e.target.closest("#try_bot_response") ||
        e.target.closest("#try_bot_btn")
      ) {
      } else {
        vm.load_bot_preview = false;
      }
    };
    // GET SAVED DIALOG TREE
    this.load_saved_dialog_tree();
    // CHECKING WEBHOOK DETAILS
    this.load_webhook();
    this.load_intent();
    this.load_entity();
    this.load_templates();
    // this.data = new Tree(this.test_response_tree)
    // this.get_nodes_list(this.data);
  },
  methods: {
    filter_asistance_response(){
      this.filtered_assistant_response = [];
      for (var i in this.assistant_response) {
        if (this.assistant_response[i].condition != 'unfilled_slot' &&
            this.assistant_response[i].condition != '!successful' &&
            this.assistant_response[i].condition != '!unsuccessful' &&
            this.assistant_response[i].condition != 'validation_response'
        ) {
          this.filtered_assistant_response.push(this.assistant_response[i])
        }
      }
    },
    interchange_position_assistant_response(id1, id2, type){
      for (var i = 0; i < this.assistant_response.length; i++) {
        if(this.assistant_response[i].id === id1){
          var temp1 = i;
        }
        if(this.assistant_response[i].id === id2){
          var temp2 = i;
        }
      }
      const tmp = this.assistant_response[temp1];
      this.assistant_response[temp1] = this.assistant_response[temp2];
      this.assistant_response[temp2] = tmp;
      if(type === 'notification_modal'){
        this.on_open_notification_modal();
      }else if(type === 'slot_modal'){
        this.on_open_slots_modal(
          this.edit_slot_slot_variable,
          this.edit_slot_index,
          this.edit_slot_check_for
        );
      }else if(type === 'filter_assistance'){
        this.filter_asistance_response();
      }else if(type === 'webhook_modal'){
        this.on_open_webhook_modal();
      }
    },
    manage_handlers_interchange_position_assistant_response(id1, id2, ind){
      for (var i = 0; i < this.manage_handlers[ind].responses.length; i++) {
        if(this.manage_handlers[ind].responses[i].id === id1){
          var temp1 = i;
        }
        if(this.manage_handlers[ind].responses[i].id === id2){
          var temp2 = i;
        }
      }
      const tmp = this.manage_handlers[ind].responses[temp1];
      this.manage_handlers[ind].responses[temp1] = this.manage_handlers[ind].responses[temp2];
      this.manage_handlers[ind].responses[temp2] = tmp;
      var vm = this;
      vm.$set(vm.manage_handlers, ind, vm.manage_handlers[ind]);
    },
    change_btn_value_placeholder(type) {
      if (type === "postback") {
        return "Enter value";
      } else if (type === "url") {
        return "Enter URL";
      }
    },
    updated_entity_list_after_removing_used_entity_in_slot(
      entity_list,
      slot_list
    ) {
      const toRemove = slot_list.map((slot) => {
        return slot.check_for;
      });
      const difference = entity_list.filter((x) => !toRemove.includes(x));
      return difference;
    },
    load_slot_variable() {
      axios
        .post(
          api_calls.form_automation_dialog_tree(),
          {
            company_id: this.$session.get("UserInformation").company_id,
            company_name: this.$session.get("UserInformation").company_name,
            is_get_slot_variable: true,
            node_id: this.node_id.toString(),
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          if (this.api_status_code.DATA_AVAILABLE_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
            this.slot_variable = response.data.data.slots_list;
          } else if(this.api_status_code.NO_SLOTS_FOUND_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              type: "error"
            })
          }else {
            Swal({
              text: tlt('dialog_flow_load_slot_internal_server_msg'),
              toast: true,
              position: "top-end",
              type: "error",
              showConfirmButton: false,
              timer: 5000,
            });
          }
          this.add_to_insert_slot_variable_options();
        })
        .catch((e) => {
          this.add_to_insert_slot_variable_options();
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    circle_mouseover(id, num) {
      $(`#insert_variable_circle_${id}_${num}`).toggleClass(
        "insert_variable_circle"
      );
    },
    circle_mouseout(id, num) {
      $(`#insert_variable_circle_${id}_${num}`).toggleClass(
        "insert_variable_circle"
      );
    },
    manage_handlers_circle_mouseover(id, num) {
      $(`#manage_handlers_insert_variable_circle_${id}_${num}`).toggleClass(
        "insert_variable_circle"
      );
    },
    manage_handlers_circle_mouseout(id, num) {
      $(`#manage_handlers_insert_variable_circle_${id}_${num}`).toggleClass(
        "insert_variable_circle"
      );
    },
    insert_variable_block_off(id, num) {
      $(`#insert_variable_block${id}_${num}`).toggleClass(
        "insert_variable_block"
      );
    },
    insert_variable_block_on(id, num) {
      $(`#insert_variable_block${id}_${num}`).toggleClass(
        "insert_variable_block"
      );
    },
    manage_handlers_insert_variable_block_off(id, num) {
      $(`#manage_handlers_insert_variable_block${id}_${num}`).toggleClass(
        "insert_variable_block"
      );
    },
    manage_handlers_insert_variable_block_on(id, num) {
      $(`#manage_handlers_insert_variable_block${id}_${num}`).toggleClass(
        "insert_variable_block"
      );
    },
    set_assistance_response_index(id, num) {
      $(`#assistance_response_${id}_${num}`).focus();
      this.assistance_response_id = id;
      this.assistance_response__val_index = num;
      this.add_to_insert_slot_variable_options();
    },
    manage_handlers_set_assistance_response_index(id, num, ind) {
      $(`#manage_handlers_assistance_response_${id}_${num}`).focus();
      this.manage_handlers_ind = ind;
      this.manage_handlers_assistance_response_id = id;
      this.manage_handlers_assistance_response__val_index = num;
      this.add_to_insert_slot_variable_options();
    },
    addTag(newTag) {
      this.notifications.notify[0].slot = newTag;
    },
    add_to_insert_slot_variable_options() {
      const temp1 = [];
      const temp = this.slots
        .map((slot) => {
          return slot.slot;
        })
        .filter((item) => {
          return item != "";
        });
      if (Boolean(this.webhook_variable)) {
        temp1.push("$" + this.webhook_variable);
      }
      function mergeNoDuplicates(...arrays) {
        let mergedArray = [];
        arrays.forEach((array) => {
          mergedArray = [...mergedArray, ...array];
        });
        return [...new Set([...mergedArray])];
      }
      this.insert_slot_variable_options = mergeNoDuplicates(
        temp,
        temp1,
        this.slot_variable
      );
    },
    insert_slot_variable_to_assistance_response(variable) {
      var id = this.assistance_response_id;
      var num = this.assistance_response__val_index;
      $(`#assistance_response_${id}_${num}`).focus();
      var vm = this;
      var cursorPos = $(`#assistance_response_${id}_${num}`).prop(
        "selectionStart"
      );
      var v = $(`#assistance_response_${id}_${num}`).val();
      var textBefore = v.substring(0, cursorPos);
      var textAfter = v.substring(cursorPos, v.length);
      // $('#assistance_response_'+ id + '_' + num).val( textBefore+ am +textAfter );
      this.assistant_response[id].values[num] =
        textBefore + "{" + variable + "}" + textAfter;
      vm.$set(vm.assistant_response, id, vm.assistant_response[id]);
    },
    manage_handlers_insert_slot_variable_to_assistance_response(variable) {
      var ind = this.manage_handlers_ind;
      var id = this.manage_handlers_assistance_response_id;
      var num = this.manage_handlers_assistance_response__val_index;
      $(`#manage_handlers_assistance_response_${id}_${num}`).focus();
      var vm = this;
      var cursorPos = $(
        `#manage_handlers_assistance_response_${id}_${num}`
      ).prop("selectionStart");
      var v = $(`#manage_handlers_assistance_response_${id}_${num}`).val();
      var textBefore = v.substring(0, cursorPos);
      var textAfter = v.substring(cursorPos, v.length);
      // $('#manage_handlers_assistance_response_'+ id + '_' + num).val( textBefore+ am +textAfter );
      this.manage_handlers[ind].responses[id].values[num] =
        textBefore + "{" + variable + "}" + textAfter;
      vm.$set(vm.manage_handlers, ind, vm.manage_handlers[ind]);
    },
    add_remove_to_manage_handler_list(func, ind) {
      if (func === "add") {
        this.manage_handlers.push({
          id: Date.now(),
          node_type: "event_handler",
          name: "",
          triggers: [
            {
              trigger_type: "",
              trigger_value: "",
            },
          ],
          responses: [],
          parent_node: this.node_id,
          previous_node: "",
          next_step: {
            behavior: "skip_all_slots",
            selector: null,
            node_id: null,
          },
          event_name: "generic",
        });
      } else if (func === "remove") {
        this.manage_handlers.splice(ind, 1);
      }
    },
    set_webhook_return_variable(webhook_id) {
      console.log(webhook_id , "--")
      this.webhook_variable = this.webhook_list
        .filter((id) => {
          return id.id == webhook_id;
        })[0]
        .name.replace(/\s+/g, "_");
    },
    load_saved_dialog_tree() {
      this.spinnerOn = true;
      axios
        .post(
          api_calls.form_automation_dialog_tree(),
          {
            company_id: this.$session.get("UserInformation").company_id,
            company_name: this.$session.get("UserInformation").company_name,
            is_get: true,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          this.spinnerOn = false;
          if (this.api_status_code.NODE_STRUCTURE_RECEIVED_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
            this.data = new Tree(response.data.data.node_structure[0].nodestructure);
            this.get_nodes_list(this.data);
          } else if (this.api_status_code.NODE_STRUCTURE_NOT_EXISTS_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
            Swal({
              title: this.tlt('dialog_flow_create_dialog_tree_msg'),
              text: this.tlt('dialog_flow_adding_nodes_msg'),
              type: "info",
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 5000,
            });
          } else {
            Swal({
              text: this.tlt('dialog_flow_load_saved_internal_server_msg'),
              toast: true,
              position: "top-end",
              type: "error",
              showConfirmButton: false,
              timer: 5000,
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
          }
        });
    },
    load_webhook() {
      this.spinnerOn = true;
      axios
        .post(
          api_calls.form_automation_webhook_details(),
          {
            company_id: this.$session.get("UserInformation").company_id,
            company_name: this.$session.get("UserInformation").company_name,
            is_get: true,
            page_no: 1,
            per_page: 40,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          this.spinnerOn = false;
          this.webhook_list = [];
          if (this.api_status_code.WEBHOOK_DETAILS_RECEIVED_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
            this.is_webhook_details = true;
            for (var i in response.data.data.webhook[0].webhook) {
              this.webhook_list.push(response.data.data.webhook[0].webhook[i]);
              console.log(this.webhook_list )
            }
          } else if (this.api_status_code.WEBHOOK_DETAILS_NOT_EXISTS_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
            this.is_webhook_details = false;
            this.webhook_id = null;
          } else {
            Swal({
              type: "error",
              toast: true,
              position: "top-end",
              text: tlt('dialog_flow_load_webhook_internal_server_msg'),
              timer: 2000,
            });
          }
        })
        .catch((e) => {
          console.log(e);
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
    load_intent() {
      this.spinnerOn = true;
      axios
        .post(
          api_calls.form_automation_save_intent_example(),
          {
            is_get: true,
            company_id: this.$session.get("UserInformation").company_id,
            company_name: this.$session.get("UserInformation").company_name,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            page_no: 1,
            per_page: 40,
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
            this.trigger_options_intent = [];
            this.intent_list_choice_card = [];
            for (var i = 0; i < response.data.data.data.length; i++) {
              this.trigger_options_intent.push(response.data.data.data[i].Intent);
              this.intent_list_choice_card.push(`/${response.data.data.data[i].Intent}`);
            }
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
    load_entity() {
      this.spinnerOn = true;
      axios
        .post(
          api_calls.form_automation_add_entity(),
          {
            company_id: this.$session.get("UserInformation").company_id,
            company_name: this.$session.get("UserInformation").company_name,
            license_key: this.$session.get("UserInformation").license_key,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            subscription: this.$session.get("UserInformation").subscription,
            is_get_entity: true,
            page_no: 1,
            per_page: 40,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          this.spinnerOn = false;
          if (this.api_status_code.DATA_AVAILABLE_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
            this.entity_list = [];
            this.trigger_options_entity_values = [];
            this.trigger_options_entity = [];
            for (var i = 0; i < response.data.data.entity_names.length; i++) {
              this.entity_list.push(response.data.data.entity_names[i].entity);
              this.trigger_options_entity_values.push(
                response.data.data.entity_names[i]
              );
              this.trigger_options_entity.push(
                response.data.data.entity_names[i].entity
              );
            }
          } else if (this.api_status_code.EMPTY_DATA_MODELS.MSG_CODE == response.data.message.MSG_CODE) {
            Swal({
              text: tlt('dialog_flow_add_some_entities_msg'),
              toast: true,
              position: "top-end",
              type: "warning",
              showConfirmButton: false,
              timer: 5000,
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
          }
        });
    },
    load_templates() {
      this.spinnerOn = true;
      axios
        .post(
          api_calls.template_promotional_email(),
          {
            company_id: this.$session.get("UserInformation").company_id,
            company_name: this.$session.get("UserInformation").company_name,
            is_get: true,
            is_notification: true,
            page_no: 1,
            per_page: 40,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          this.spinnerOn = false;
          if(this.api_status_code.STATUS_SUCCESS_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
            this.notifications_notify_template_list = response.data.data;
          } else if(this.api_status_code.UNSUCCESSFUL_DB_OPERATION_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
              this.notifications_notify_template_list = [];
              return;
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
    check_slot_value_use_in_response(response) {
      if (Boolean(response.includes("{"))) {
        return true;
      } else {
        return false;
      }
    },
    visible_try_bot() {
      this.load_bot_preview = !this.load_bot_preview;
    },
    is_entity_type_sys_pattern(trigger_value) {
      let a = this.trigger_options_entity_values.filter((item) => {
          return item.entity == trigger_value;
        });
        this.selected_entity = trigger_value
        if(a.length > 0){

        
      if (
        this.trigger_options_entity_values.filter((item) => {
          return item.entity == trigger_value;
        })[0].type === "pattern" ||
        this.trigger_options_entity_values.filter((item) => {
          return item.entity == trigger_value;
        })[0].type === "system"
      ) {
        return true;
      } else {
        return false;
      }
    }
    return false
    },
    entity_value_options(trigger_value) {
      let a = this.trigger_options_entity_values.filter((item) => {
          return item.entity == trigger_value;
        });
      var temp = [];
      if(a.length>0){

    
      temp = this.trigger_options_entity_values
        .filter((item) => {
          return item.entity == trigger_value;
        })[0]
        .values.map((val) => {
          return val.value;
        });
      }
      return temp;
    },
    check_image_url(url) {
      if (this.reg_image.test(url) === true) {
        return true;
      } else {
        return false;
      }
    },
    check_video_url(url) {
      if (this.reg_url.test(url) === true) {
        return true;
      } else {
        return false;
      }
    },
    search_webhook(query) {
      if (query != "") {
        axios
          .post(
            api_calls.form_automation_webhook_details(),
            {
              company_id: this.companyid,
              company_name: this.companyname,
              license_key: this.$session.get("UserInformation").license_key,
              email: this.$session.get("UserInformation").email,
              token: this.$session.get("UserInformation").tokens,
              subscription: "Platinum",
              is_search: true,
              search_term: this.search_name,
              per_page: 40,
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
            if (this.api_status_code.WEBHOOK_DETAILS_RECEIVED_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
              this.webhook_list = [];
              this.is_webhook_details = true;
              for (var i in response.data.data.webhook[0].webhook) {
                this.webhook_list.push(response.data.data.webhook[0].webhook[i]);
                console.log(this.webhook_list )
              }
            } else if (this.api_status_code.SEARCH_WEBHOOK_NOT_FOUND_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
              Swal({
                type: "warning",
                text: this.tlt('dialog_flow_webhook_not_found_msg'),
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
              });
            } else {
              Swal({
                text: this.tlt('dialog_flow_search_webhook_internal_server'),
                toast: true,
                position: "top-end",
                type: "warning",
                showConfirmButton: false,
                timer: 2000,
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
    },
    search_intent_entity(trigger_type, query) {
      // if(query == ""){
      //   this.trigger_options_intent = [];
      //   this.trigger_options_entity = [];
      // }
      if (this.is_root || trigger_type === "intent") {
        if (query != "") {
          this.is_loading = true;
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
                search_key: query,
                page_no: 1,
                per_page: 40,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.spinnerOn = false;
              if (this.api_status_code.EMPTY_DATA_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
                // toastr.error("No Results Found");
                Swal({
                  text: this.tlt('dialog_flow_no_result_found_msg'),
                  toast: true,
                  position: "top-end",
                  type: "warning",
                  showConfirmButton: false,
                  timer: 5000,
                });
              } else if (
                this.api_status_code.DATA_AVAILABLE_MODELS.MSG_CODE === response.data.message.MSG_CODE
              ) {
                this.trigger_options_intent = [];
                this.intent_list_choice_card = [];
                  for (var i = 0; i < response.data.data.ResponseList.length; i++) {
                    this.trigger_options_intent.push(
                      response.data.data.ResponseList[i].Intent
                    );
                    this.intent_list_choice_card.push(
                      response.data.data.ResponseList[i].Intent
                    );
                  }
              } else {
                // toastr.error("Intrnal Server Error");
                Swal({
                  text: this.tlt('dialog_flow_internal_server_msg1'),
                  toast: true,
                  position: "top-end",
                  type: "error",
                  showConfirmButton: false,
                  timer: 5000,
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
          this.is_loading = false;
        } else {
          this.load_intent();
        }
      } else if (trigger_type === "entity") {
        if (query != "") {
          this.is_loading = true;
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
                search_key: query,
                page_no: 1,
                per_page: 40,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.spinnerOn = false;
              if (this.api_status_code.DATA_AVAILABLE_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
                this.trigger_options_entity = [];
                this.trigger_options_entity_values = [];
                for (var i = 0; i < response.data.data.entities_search.length; i++) {
                  this.trigger_options_entity_values.push(
                    response.data.data.entities_search[i]
                  );
                  this.trigger_options_entity.push(
                    response.data.entities_search[i].entity
                  );
                }
              } else if (this.api_status_code.EMPTY_DATA_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
                Swal({
                  text: this.tlt('dialog_flow_no_result_found_msg1'),
                  toast: true,
                  position: "top-end",
                  type: "warning",
                  showConfirmButton: false,
                  timer: 5000,
                });
              } else {
                // toastr.error("Intrnal Server Error");
                Swal({
                  text: this.tlt('dialog_flow_internal_server_msg3'),
                  toast: true,
                  position: "top-end",
                  type: "error",
                  showConfirmButton: false,
                  timer: 5000,
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
          this.is_loading = false;
        } else {
          this.load_entity();
        }
      }
    },

    search_entity(query) {
      if (query != "") {
        this.is_loading = true;
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
              search_key: query,
              page_no: 1,
              per_page: 40,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            this.spinnerOn = false;
            if (this.api_status_code.DATA_AVAILABLE_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
              this.entity_list = [];
              for (var i = 0; i < response.data.data.entities_search.length; i++) {
                this.entity_list.push(response.data.data.entities_search[i].entity);
              }
            } else if (this.api_status_code.EMPTY_DATA_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
              Swal({
                text: this.tlt('dialog_flow_no_result_found_msg2'),
                toast: true,
                position: "top-end",
                type: "warning",
                showConfirmButton: false,
                timer: 5000,
              });
            } else {
              // toastr.error("Intrnal Server Error");
              Swal({
                text: this.tlt('dialog_flow_internal_server_msg4'),
                toast: true,
                position: "top-end",
                type: "error",
                showConfirmButton: false,
                timer: 5000,
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
        this.is_loading = false;
      } else {
        this.load_entity();
      }
    },
    search_for_entity_has_validation(query) {
      if (query != "") {
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
              is_validation_entity: true,
              entity: query,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            this.spinnerOn = false;
            if (this.api_status_code.ENTITY_HAS_VALIDATION_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
              this.is_validation_entity = true;
            } else if (this.api_status_code.ENTITY_HAS_NO_VALIDATION.MSG_CODE === response.data.message.MSG_CODE) {
              this.is_validation_entity = false;
            } else {
              this.is_validation_entity = false;
            }
          })
          .catch((e) => {
            this.is_validation_entity = false;
            if (
              e.response.status === 410 ||
              e.response.status === 440 ||
              e.response.status === 409
            ) {
              this.$root.$emit("Session_Expired", e.response.data);
            }
          });
      } else {
        this.is_validation_entity = false;
      }
    },
    search_template_name(query) {
      if (query != "") {
        this.is_loading = true;
        axios
          .post(
            api_calls.template_promotional_email(),
            {
              company_id: this.$session.get("UserInformation").company_id,
              company_name: this.$session.get("UserInformation").company_name,
              license_key: this.$session.get("UserInformation").license_key,
              email: this.$session.get("UserInformation").email,
              token: this.$session.get("UserInformation").tokens,
              subscription: "Platinum",
              is_search: true,
              is_notification: true,
              search_key: query,
              page_no: 1,
              per_page: 40,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            this.spinnerOn = false;
            if (this.api_status_code.TEMPLATE_DOES_NOT_EXISTS_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
              Swal({
                text: this.tlt('dialog_flow_no_result_found_msg3'),
                toast: true,
                position: "top-end",
                type: "warning",
                showConfirmButton: false,
                timer: 5000,
              });
            } else if (this.api_status_code.TEMPLATE_SEARCH_RESULT_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
              this.notifications_notify_template_list = [];
              for (var i = 0; i < response.data.data.template_search.length; i++) {
                this.notifications_notify_template_list.push(
                  response.data.data.template_search[i]
                );
              }
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
        this.is_loading = false;
      } else {
        this.load_templates();
      }
    },
    manage_handlers_arrange_ids_function(ind) {
      if (this.manage_handlers[ind].responses != []) {
        for (var i in this.manage_handlers[ind].responses) {
          this.manage_handlers[ind].responses[i].id = i.toString();
        }
      }
    },
    arrange_ids_function() {
      //For responses rewrite ids
      if (this.assistant_response != []) {
        for (var i in this.assistant_response) {
          this.assistant_response[i].id = i.toString();
        }
      }
      //For slots rewrite ids
      if (this.slots != []) {
        for (var i in this.slots) {
          this.slots[i].responses = [];
          var temp = this.slots[i].slot;
          for (var j in this.assistant_response) {
            if (this.assistant_response[j].recognizes == temp) {
              this.slots[i].responses.push(this.assistant_response[j].id);
            }
          }
        }
      }
      //For notification rewrite ids
      if (this.notifications.responses != []) {
        this.notifications.responses = [];
        for (var j in this.assistant_response) {
          if (
            this.assistant_response[j].recognizes == "successful" ||
            this.assistant_response[j].recognizes == "unsuccessful"
          ) {
            this.notifications.responses.push(this.assistant_response[j].id);
          }
        }
      }
    },
    // arrange_ids_function_for_notification(){
    //   //For responses rewrite ids
    //   if (this.assistant_response != []) {
    //     for (var i in this.assistant_response) {
    //       this.assistant_response[i].id = i.toString();
    //     }
    //   }
    //   //For notification rewrite ids
    //   if (this.notifications.responses != []) {
    //       this.notifications.responses = [];
    //       for (var j in this.assistant_response) {
    //         if (this.assistant_response[j].recognizes == "successful" ||
    //           this.assistant_response[j].recognizes == "unsuccessful") {
    //             this.notifications.responses.push(this.assistant_response[j].id);
    //         }
    //       }
    //   }
    // },
    get_nodes_list(oldNode) {
      if (oldNode.children && oldNode.children.length > 0) {
        for (var i = 0, len = oldNode.children.length; i < len; i++) {
          oldNode.children[i].is_root = true;
          this.nodes_list.push([
            {
              id: oldNode.children[i].id,
              name: oldNode.children[i].name,
            },
          ]);
          this.add_children_node_name(oldNode.children[i], i);
        }
      }
    },
    add_children_node_name(childNode, indx) {
      if (childNode.children && childNode.children.length > 0) {
        for (var i = 0, len = childNode.children.length; i < len; i++) {
          childNode.children[i].is_root = false;
          this.nodes_list[indx].splice(indx, 0, {
            id: childNode.children[i].id,
            name: childNode.children[i].name,
          });
          this.add_children_node_name(childNode.children[i], indx);
        }
      }
    },
    drop(node, src, target) {
      // console.log(node, src, target);
      this.pushNewTree();
    },
    dropAfter(node, src, target) {
      // console.log(node, src, target);
      this.pushNewTree();
    },
    dropBefore(node, src, target) {
      // console.log(node, src, target);
      this.pushNewTree();
    },
    close_addnodemodal() {
      Swal.fire({
        title: this.tlt('dialog_flow_alert_msg'),
        text: this.tlt('dialog_flow_node_changes_msg'),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.tlt('dialog_flow_save_btn'),
        cancelButtonText: this.tlt('dialog_flow_discard_btn'),
      }).then((result) => {
        if (result.value) {
          if (this.is_show_edit) {
            this.editNode();
          } else {
            this.addNode();
          }
        } else if (result.dismiss === "cancel") {
          $("#addnodemodal").modal("hide");
          this.empty_variable();
        }
      });
    },
    onDel(node) {
      if (this.new_child_node) {
        Swal.fire({
          title: this.tlt('dialog_flow_alert_msg'),
          text: this.tlt('dialog_flow_node_changes_msg'),
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: this.tlt('dialog_flow_del_save_btn'),
          cancelButtonText: this.tlt('dialog_flow_del_discard_btn'),
        }).then((result) => {
          if (result.value) {
            if (this.is_show_edit) {
              this.editNode();
            } else {
              this.addNode();
            }
          } else if (result.dismiss === "cancel") {
            $("#addnodemodal").modal("hide");
            var new_nodes = this.nodes_list.filter(
              (select) => select.id !== node.id
            );
            this.nodes_list = new_nodes;
            this.new_child_node = false;
            node.remove();
            this.empty_variable();
          }
        });
      } else {
        Swal.fire({
          title: this.tlt('dialog_flow_alert_msg'),
          text: this.tlt('dialog_flow_no_revert_msg'),
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: this.tlt('dialog_flow_delete_btn'),
        }).then((result) => {
          if (result.value) {
            var new_nodes = this.nodes_list.filter(
              (select) => select.id !== node.id
            );
            this.nodes_list = new_nodes;
            node.remove();
            var vm = this;
            _dfs(vm.data);
            function _dfs(oldNode) {
              if (oldNode.children && oldNode.children.length > 0) {
                for (var i = 0, len = oldNode.children.length; i < len; i++) {
                  if (node.id == oldNode.children[i].next_step.node_id) {
                    oldNode.children[i].next_step.behavior = "wait_for_reply";
                    oldNode.children[i].next_step.node_id = null;
                    oldNode.children[i].next_step.selector =
                      "wait_for_user_input";
                  }
                  _dfs(oldNode.children[i]);
                }
              }
            }
            this.pushNewTree("deletenode");
            this.empty_variable();
          }
        });
      }
      // this.empty_variable();
    },
    onAddNode(params) {
      this.child_node = params;
      this.empty_variable();
      this.is_show_edit = true;
      this.new_child_node = true;
      // Node id is important, check how we are adding childnode in editNode()
      this.node_id = params.id;
      this.node_name = params.name;
      $("#addnodemodal").modal("show");
    },
    change_root() {
      this.is_root = true;
    },
    onClick(params) {
      var new_obj = JSON.parse(
        JSON.stringify({
          triggers: params.triggers,
          assistant_response: params.responses,
          slots: params.slots != null ? params.slots : [],
          notifications:
            params.notifications != null
              ? params.notifications
              : {
                  notify: [
                    {
                      type: "",
                      slot: "",
                      template_id: "",
                      template_name: "",
                    },
                  ],
                  responses: [],
                },
          manage_handlers:
            params.manage_handlers != null ? params.manage_handlers : [],
          webhook_mapping:
            params.webhook_mapping == null ? [] : params.webhook_mapping,
          node_id: params.id,
          node_name: params.name,
          is_root: params.is_root,
          is_slot: params.slot_setting,
          is_notification: params.notification_enabled,
          next_step: params.next_step,
          save_then_assistant_should: params.next_step.behavior,
          jump_to_node_id: params.next_step.node_id,
          is_webhook: params.webhook_integration,
          // webhook_id: this.is_webhook == true ? params.webhook_id : null,
          // webhook_variable:this.webhook_id != null ? params.webhook_return_variable : "",
        })
      );
      // new_obj = JSON.parse(JSON.stringify(new_obj));
      this.empty_variable();
      this.is_show_edit = true;
      this.node_id = new_obj.node_id;
      this.node_name = new_obj.node_name;
      this.is_root = new_obj.is_root;
      this.assistant_response = new_obj.assistant_response;
      // this.triggers = Object.assign(params.triggers);
      this.triggers = new_obj.triggers;
      this.slots = new_obj.slots;
      this.is_slot = new_obj.is_slot;
      this.is_notification = new_obj.is_notification;
      this.notifications = new_obj.notifications;
      this.manage_handlers = new_obj.manage_handlers;
      this.next_step = new_obj.next_step;
      this.save_then_assistant_should = new_obj.save_then_assistant_should;
      this.jump_to_node_id =
        new_obj.jump_to_node_id === null ? "" : new_obj.jump_to_node_id;
      this.is_webhook = new_obj.is_webhook;
      (this.webhook_id = this.is_webhook == true ? params.webhook_id : null),
        (this.webhook_variable =
          this.webhook_id != null ? params.webhook_return_variable : ""),
        (this.webhook_mapping = new_obj.webhook_mapping);
      // This condition is to check if root node is selected then don't let it add more than one trigger
      // if (this.is_root) {
      //   document.getElementById("add_trigger_btn").style.display = "none";
      // } else {
      //   document.getElementById("add_trigger_btn").style.display = "block";
      //   this.is_root = false;
      // }
      
      setTimeout(()=>{
        let found = this.trigger_options_entity_values.some((entity)=>{
            return entity.entity === this.selected_entity
        })
        // console.log(this.selected_entity ,"--selcted entity", this.triggers[0].entity_value , "--entity value" , found)
        // console.log(Boolean(this.selected_entity , "boool"))
        if(this.selected_entity !== "" && !found ){
            // console.log("show swal")
          //   Swal({
          //   text: `The  entity - ${this.selected_entity}  in selected node has been deleted from the entities list.Please make sure it is added in the entities list to avoid the unexpected behavior.`,
          //   type: "warning",
          //   showConfirmButton: true,
          //   timer:5000,
          // });
            Swal.fire({
            title: "Are you sure?",
            text: `The  entity - ${this.selected_entity}  in selected node has been deleted from the entities list.Please make sure it is added in the entities list to avoid the unexpected behavior.`,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Continue!!",
          }).then((result) => {
            if (result.value) {
              this.load_slot_variable();
              this.filter_asistance_response();
              this.remove_current_node_jump_name(this.nodes_list, this.node_name);
              $("#addnodemodal").modal("show");
            }
          });
        }else{
            this.load_slot_variable();
            this.filter_asistance_response();
            this.remove_current_node_jump_name(this.nodes_list, this.node_name);
            $("#addnodemodal").modal("show");
          }
        this.selected_entity = ""
      },100)
    },
    delete_asistance_response_by_id(id) {
      for (var i in this.assistant_response) {
        if (id === this.assistant_response[i].id) {
          this.assistant_response.splice(i, 1);
        }
      }
    },
    editNode() {
      if (this.node_name == "") {
        Swal({
          text: this.tlt('edit_node_enter_name_msg'),
          type: "warning",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
        });
        return;
      }
      if (this.triggers.length < 1) {
        Swal({
          text: this.tlt('edit_node_add_one_condition_msg'),
          type: "warning",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
        });
        return;
      } else if (this.triggers.length > 0) {
        for (let i = 0; i < this.triggers.length; i++) {
          if (
            this.triggers[i].trigger_value === "" ||
            this.triggers[i].trigger_value === null
          ) {
            Swal({
              text: this.tlt('edit_node_condition_cannot_blank_msg1'),
              toast: true,
              type: "warning",
              position: "top-end",
              showConfirmButton: false,
              timer: 5000,
            });
            return;
          }
          if (this.triggers[i].trigger_type === "entity") {
            if (
              this.triggers[i].operand === "" ||
              this.triggers[i].operand === null
            ) {
              Swal({
                text: this.tlt('edit_node_condition_cannot_blank_msg2'),
                toast: true,
                type: "warning",
                position: "top-end",
                showConfirmButton: false,
                timer: 5000,
              });
              return;
            }
            if (this.triggers[i].operand === "is") {
              if (
                this.triggers[i].entity_value === "" ||
                this.triggers[i].entity_value === null
              ) {
                Swal({
                  text: this.tlt('edit_node_condition_cannot_blank_msg3'),
                  toast: true,
                  type: "warning",
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 5000,
                });
                return;
              }
            }
          }
        }
      }
      if (this.is_slot && this.slots.length == 0) {
        Swal({
          text: this.tlt('edit_node_add_one_slot_msg'),
          type: "warning",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
        });
        return;
      }
      if (this.is_slot && this.slots.length > 0) {
        for (let l = 0; l < this.slots.length; l++) {
          const slot = this.slots[l];
          if (!Boolean(slot.slot)) {
            Swal({
              text: this.tlt('edit_node_entity_for_slot_msg'),
              type: "warning",
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 5000,
            });
            return;
          }
          if (!Boolean(slot.responses.length)) {
            Swal({
              text: this.tlt('edit_node_response_to_slot_msg'),
              type: "warning",
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 5000,
            });
            return;
          }
        }
      }
      if (!this.is_slot && this.slots.length > 0) {
        for (let l = 0; l < this.slots.length; l++) {
          const slot = this.slots[l];
          for (i in slot.responses) {
            this.delete_asistance_response_by_id(slot.responses[i]);
          }
        }
        this.arrange_ids_function();
        this.slots = [];
      }
      if (this.manage_handlers.length > 0 && this.is_slot) {
        for (let ind = 0; ind < this.manage_handlers.length; ind++) {
          const handler = this.manage_handlers[ind];
          if (handler.triggers.length < 1) {
            Swal({
              text: this.tlt('edit_node_condition_for_manage_handler_msg'),
              type: "warning",
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 5000,
            });
            return;
          } else if (handler.triggers.length > 0) {
            for (let i = 0; i < handler.triggers.length; i++) {
              if (
                handler.triggers[i].trigger_value === "" ||
                handler.triggers[i].trigger_value === null
              ) {
                Swal({
                  text: this.tlt('edit_node_cannot_blank_in_handler_msg1'),
                  toast: true,
                  type: "warning",
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 5000,
                });
                return;
              }
              if (handler.triggers[i].trigger_type === "entity") {
                if (
                  handler.triggers[i].operand === "" ||
                  handler.triggers[i].operand === null
                ) {
                  Swal({
                    text: this.tlt('edit_node_cannot_blank_in_handler_msg2'),
                    toast: true,
                    type: "warning",
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 5000,
                  });
                  return;
                }
                if (handler.triggers[i].operand === "is") {
                  if (
                    handler.triggers[i].entity_value === "" ||
                    handler.triggers[i].entity_value === null
                  ) {
                    Swal({
                      text: this.tlt('edit_node_cannot_blank_in_handler_msg3'),
                      toast: true,
                      type: "warning",
                      position: "top-end",
                      showConfirmButton: false,
                      timer: 5000,
                    });
                    return;
                  }
                }
              }
            }
          }
          if (handler.responses.length < 1) {
            Swal({
              text: this.tlt('edit_node_one_resp_handler_msg'),
              type: "warning",
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 5000,
            });
            return;
          } else if (handler.responses.length > 0) {
            for (let i = 0; i < handler.responses.length; i++) {
              if (handler.responses[i].type === "text") {
                for (let j = 0; j < handler.responses[i].values.length; j++) {
                  if (Boolean(handler.responses[i].values[j]) === false) {
                    Swal({
                      text: this.tlt('edit_node_text_resp_in_handler_msg'),
                      type: "warning",
                      toast: true,
                      position: "top-end",
                      showConfirmButton: false,
                      timer: 5000,
                    });
                    return;
                  }
                }
              } else if (handler.responses[i].type === "image") {
                if (Boolean(handler.responses[i].source) === false) {
                  Swal({
                    text: this.tlt('edit_node_img_resp_in_handler_msg'),
                    type: "warning",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 5000,
                  });
                  return;
                }
                if (
                  this.reg_image.test(handler.responses[i].source) === false
                ) {
                  Swal({
                    text: this.tlt('edit_node_valid_img_url_in_handler_msg'),
                    type: "warning",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 8000,
                  });
                  return;
                }
              } else if (handler.responses[i].type === "video") {
                if (Boolean(handler.responses[i].source) === false) {
                  Swal({
                    text: this.tlt('edit_node_video_resp_in_handler_msg'),
                    type: "warning",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 5000,
                  });
                  return;
                }
                if (this.reg_url.test(handler.responses[i].source) === false) {
                  Swal({
                    text: this.tlt('edit_node_valid_video_url_in_handler_msg'),
                    type: "warning",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 8000,
                  });
                  return;
                }
              } else if (handler.responses[i].type === "choices") {
                for (let j = 0; j < handler.responses[i].choices.length; j++) {
                  if (
                    Boolean(handler.responses[i].choices[j].title) === false ||
                    Boolean(handler.responses[i].choices[j].payload) === false
                  ) {
                    Swal({
                      text: this.tlt('edit_node_choice_resp_in_handler_msg'),
                      type: "warning",
                      toast: true,
                      position: "top-end",
                      showConfirmButton: false,
                      timer: 5000,
                    });
                    return;
                  }
                }
              } else if (handler.responses[i].type === "card") {
                for (
                  let j = 0;
                  j < handler.responses[i].card_list.length;
                  j++
                ) {
                  const carousel = handler.responses[i].card_list[j];
                  if (carousel.is_image === true) {
                    handler.responses[i].card_list[j].video = "";
                  } else {
                    handler.responses[i].card_list[j].image = "";
                  }
                  let button_has_value = false;
                  for (let k = 0; k < carousel.buttons.length; k++) {
                    if (
                      carousel.buttons[k].title != "" ||
                      carousel.buttons[k].value != ""
                    ) {
                      button_has_value = true;
                    }
                  }
                  if (
                    carousel.title === "" &&
                    carousel.text === "" &&
                    carousel.image === "" &&
                    carousel.video === "" &&
                    button_has_value === false
                  ) {
                    Swal({
                      text: this.tlt('edit_node_card_filled_for_handler_msg'),
                      type: "warning",
                      toast: true,
                      position: "top-end",
                      showConfirmButton: false,
                      timer: 5000,
                    });
                    return;
                  }
                  if (
                    carousel.image != "" &&
                    this.reg_image.test(carousel.image) === false
                  ) {
                    Swal({
                      text: this.tlt('edit_node_card_valid_img_url_in_handler_msg'),
                      type: "warning",
                      toast: true,
                      position: "top-end",
                      showConfirmButton: false,
                      timer: 8000,
                    });
                    return;
                  }
                  if (
                    carousel.video != "" &&
                    this.reg_url.test(carousel.video) === false
                  ) {
                    Swal({
                      text: this.tlt('edit_node_card_valid_video_url_in_handler_msg'),
                      type: "warning",
                      toast: true,
                      position: "top-end",
                      showConfirmButton: false,
                      timer: 8000,
                    });
                    return;
                  }
                  for (let d = 0; d < carousel.buttons.length; d++) {
                    if (
                      (carousel.buttons[d].title != "" &&
                        carousel.buttons[d].value == "") ||
                      (carousel.buttons[d].title == "" &&
                        carousel.buttons[d].value != "")
                    ) {
                      Swal({
                        text: this.tlt('edit_node_card_valid_img_url_in_handler_msg'),
                        type: "warning",
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 5000,
                      });
                      return;
                    }
                  }
                }
              }
            }
          }
        }
      }
      if (!this.is_webhook_details) {
        this.is_webhook = false;
        this.webhook_mapping = {};
      }
      if (this.is_webhook) {
        if (!Boolean(this.webhook_id)) {
          Swal({
            text: this.tlt('edit_node_webhook_name_msg'),
            type: "warning",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 5000,
          });
          return;
        }
        if (!Boolean(this.webhook_variable)) {
          Swal({
            text: this.tlt('edit_node_webhook_return_variable_msg'),
            type: "warning",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 8000,
          });
          return;
        }
        if (!Boolean(this.webhook_mapping.length)) {
          // Swal({
          //   text: "Atleast add one webhook parameter",
          //   type: "warning",
          //   toast: true,
          //   position: "top-end",
          //   showConfirmButton: false,
          //   timer: 8000,
          // });
          // return;
        } else {
          for (let index = 0; index < this.webhook_mapping.length; index++) {
            if (
              !Boolean(this.webhook_mapping[index].key) ||
              !Boolean(this.webhook_mapping[index].value)
            ) {
              Swal({
                text: this.tlt('edit_node_webhook_para_empty_msg1'),
                type: "warning",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 8000,
              });
              return;
            }
          }
        }
      }
      if (this.is_notification) {
        if (
          this.notifications.notify[0].type == "" ||
          this.notifications.notify[0].type == null
        ) {
          Swal({
            text: this.tlt('edit_node_webhook_para_empty_msg2'),
            type: "warning",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 5000,
          });
          return;
        }
        if (
          this.notifications.notify[0].slot == "" ||
          this.notifications.notify[0].slot == null
        ) {
          Swal({
            text: this.tlt('edit_node_webhook_notification_type_msg'),
            type: "warning",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 5000,
          });
          return;
        }
        if (
          this.notifications.notify[0].template_name == "" ||
          this.notifications.notify[0].template_name == null
        ) {
          Swal({
            text: this.tlt('edit_node_webhook_template_name_msg'),
            type: "warning",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 5000,
          });
          return;
        }
        if (this.notifications.responses.length < 1) {
          Swal({
            text: this.tlt('edit_node_webhook_notification_for_bot_cases_msg'),
            type: "warning",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 8000,
          });
          return;
        } else {
          let check_notification_successful_response = false;
          let check_notification_unsuccessful_response = false;
          for (let l = 0; l < this.notifications.responses.length; l++) {
            const notification_response_id = this.notifications.responses[l];
            if (
              this.assistant_response[notification_response_id].condition ===
              "!successful"
            ) {
              check_notification_successful_response = true;
            }
            if (
              this.assistant_response[notification_response_id].condition ===
              "!unsuccessful"
            ) {
              check_notification_unsuccessful_response = true;
            }
          }
          if (!Boolean(check_notification_successful_response)) {
            Swal({
              text: this.tlt('edit_node_webhook_notification_successful_msg'),
              type: "warning",
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 8000,
            });
            return;
          } else if (!Boolean(check_notification_unsuccessful_response)) {
            Swal({
              text: this.tlt('edit_node_webhook_notification_unsuccessful_msg'),
              type: "warning",
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 8000,
            });
            return;
          }
        }
      } else {
        for (i in this.notifications.responses) {
          this.delete_asistance_response_by_id(this.notifications.responses[i]);
        }
        this.arrange_ids_function();
        this.notifications = {
          notify: [
            {
              type: "",
              slot: "",
              template_id: "",
              template_name: "",
            },
          ],
          responses: [],
        };
      }
      if (this.assistant_response.length < 1) {
        Swal({
          text: this.tlt('edit_node_webhook_one_resp_to_node_msg'),
          type: "warning",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
        });
        return;
      } else if (this.assistant_response.length > 0) {
        for (let i = 0; i < this.assistant_response.length; i++) {
          if (this.assistant_response[i].type === "text") {
            for (let j = 0; j < this.assistant_response[i].values.length; j++) {
              if (Boolean(this.assistant_response[i].values[j]) === false) {
                Swal({
                  text: this.tlt('edit_node_webhook_text_response_msg'),
                  type: "warning",
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 5000,
                });
                return;
              }
            }
          } else if (this.assistant_response[i].type === "image") {
            if (Boolean(this.assistant_response[i].source) === false) {
              Swal({
                text: this.tlt('edit_node_webhook_img_response_msg'),
                type: "warning",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 5000,
              });
              return;
            }
            if (
              this.reg_image.test(this.assistant_response[i].source) === false
            ) {
              Swal({
                text: this.tlt('edit_node_webhook_valid_img_url_msg'),
                type: "warning",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 8000,
              });
              return;
            }
          } else if (this.assistant_response[i].type === "video") {
            if (Boolean(this.assistant_response[i].source) === false) {
              Swal({
                text: this.tlt('edit_node_webhook_video_response_msg'),
                type: "warning",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 5000,
              });
              return;
            }
            if (
              this.reg_url.test(this.assistant_response[i].source) === false
            ) {
              Swal({
                text: this.tlt('edit_node_webhook_valid_video_url_msg'),
                type: "warning",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 8000,
              });
              return;
            }
          } else if (this.assistant_response[i].type === "choices") {
            for (
              let j = 0;
              j < this.assistant_response[i].choices.length;
              j++
            ) {
              if (
                Boolean(this.assistant_response[i].choices[j].title) ===
                  false ||
                Boolean(this.assistant_response[i].choices[j].payload) === false
              ) {
                Swal({
                  text: this.tlt('edit_node_webhook_choice_response_msg'),
                  type: "warning",
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 5000,
                });
                return;
              }
            }
          } else if (this.assistant_response[i].type === "card") {
            for (
              let j = 0;
              j < this.assistant_response[i].card_list.length;
              j++
            ) {
              const carousel = this.assistant_response[i].card_list[j];
              if (carousel.is_image === true) {
                this.assistant_response[i].card_list[j].video = "";
              } else {
                this.assistant_response[i].card_list[j].image = "";
              }
              let button_has_value = false;
              for (let k = 0; k < carousel.buttons.length; k++) {
                if (
                  carousel.buttons[k].title != "" ||
                  carousel.buttons[k].value != ""
                ) {
                  button_has_value = true;
                }
              }
              if (
                carousel.title === "" &&
                carousel.text === "" &&
                carousel.image === "" &&
                carousel.video === "" &&
                button_has_value === false
              ) {
                Swal({
                  text: this.tlt('edit_node_webhook_filled_for_handler_msg'),
                  type: "warning",
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 5000,
                });
                return;
              }
              if (
                carousel.image != "" &&
                this.reg_image.test(carousel.image) === false
              ) {
                Swal({
                  text: this.tlt('edit_node_webhook_valid_img_url_handler_msg'),
                  type: "warning",
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 8000,
                });
                return;
              }
              if (
                carousel.video != "" &&
                this.reg_url.test(carousel.video) === false
              ) {
                Swal({
                  text: this.tlt('edit_node_webhook_valid_video_url_handler_msg1'),
                  type: "warning",
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 8000,
                });
                return;
              }
              for (let d = 0; d < carousel.buttons.length; d++) {
                if (
                  (carousel.buttons[d].title != "" &&
                    carousel.buttons[d].value == "") ||
                  (carousel.buttons[d].title == "" &&
                    carousel.buttons[d].value != "")
                ) {
                  Swal({
                    text: this.tlt('edit_node_webhook_valid_img_url_handler_msg1'),
                    type: "warning",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 5000,
                  });
                  return;
                }
              }
            }
          }
        }
      }
      if (!this.next_step.behavior) {
        Swal({
          text: this.tlt('dialog_flow_webhook_next_step_msg'),
          type: "warning",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
        });
        return;
      }
      if (
        this.save_then_assistant_should == "jump_to" &&
        this.jump_to_node_id == ""
      ) {
        Swal({
          text: this.tlt('dialog_flow_webhook_next_id_msg'),
          type: "warning",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
        });
        return;
      }
      if (this.is_slot && this.slots.length != 0) {
        this.node_type = "form";
      } else {
        this.node_type = "basic";
      }
      var vm = this;
      _dfs(vm.data);
      function _dfs(oldNode) {
        if (oldNode.children && oldNode.children.length > 0) {
          for (var i = 0, len = oldNode.children.length; i < len; i++) {
            if (vm.node_id == oldNode.children[i].id) {
              oldNode.children[i].name = vm.node_name;
              oldNode.children[i].node_name = vm.node_type + "_" + vm.node_name;
              oldNode.children[i].node_type = vm.node_type;
              oldNode.children[i].is_root = vm.is_root ? true : false;
              oldNode.children[i].responses = vm.assistant_response;
              oldNode.children[i].slot_setting = vm.is_slot;
              (oldNode.children[i].notification_enabled = vm.is_notification),
                (oldNode.children[i].slots = vm.is_slot ? vm.slots : null),
                (oldNode.children[i].notifications = vm.is_notification
                  ? vm.notifications
                  : null),
                (oldNode.children[i].manage_handlers =
                  vm.manage_handlers.length > 0 && vm.is_slot
                    ? vm.manage_handlers
                    : null),
                (oldNode.children[i].triggers = vm.triggers);
              oldNode.children[i].next_step = vm.next_step;
              oldNode.children[i].webhook_id = vm.is_webhook
                ? vm.webhook_id
                : null;
              oldNode.children[i].webhook_integration = vm.is_webhook;
              oldNode.children[i].webhook_mapping = vm.is_webhook
                ? vm.webhook_mapping
                : null;
              oldNode.children[i].webhook_return_variable = vm.is_webhook
                ? vm.webhook_variable
                : null;
              oldNode.children[i].editNodeDisabled = true;
            }
            _dfs(oldNode.children[i]);
          }
        }
      }
      if (vm.new_child_node) {
        vm.nodes_list.push([
          {
            id: vm.node_id,
            name: vm.node_name,
          },
        ]);
      }
      if (vm.new_child_node) {
        vm.pushNewTree("childnode");
      } else {
        vm.pushNewTree("editnode");
      }
      vm.new_child_node = false;
      vm.is_show_edit = false;
      vm.empty_variable();
      // document.getElementById("add_trigger_btn").style.display = "block";
      $("#addnodemodal").modal("hide");
    },
    addNode() {
      if (this.node_name == "") {
        Swal({
          text: this.tlt('add_node_enter_name_msg'),
          type: "warning",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
        });
        return;
      }
      if (this.triggers.length < 1) {
        Swal({
          text: this.tlt('add_node_add_one_condition_msg'),
          type: "warning",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
        });
        return;
      } else if (this.triggers.length > 0) {
        for (let i = 0; i < this.triggers.length; i++) {
          if (
            this.triggers[i].trigger_value === "" ||
            this.triggers[i].trigger_value === null
          ) {
            Swal({
              text: this.tlt('add_node_condition_cannot_blank_msg1'),
              toast: true,
              type: "warning",
              position: "top-end",
              showConfirmButton: false,
              timer: 5000,
            });
            return;
          }
          if (this.triggers[i].trigger_type === "entity") {
            if (
              this.triggers[i].operand === "" ||
              this.triggers[i].operand === null
            ) {
              Swal({
                text: this.tlt('add_node_condition_cannot_blank_msg2'),
                toast: true,
                type: "warning",
                position: "top-end",
                showConfirmButton: false,
                timer: 5000,
              });
              return;
            }
            if (this.triggers[i].operand === "is") {
              if (
                this.triggers[i].entity_value === "" ||
                this.triggers[i].entity_value === null
              ) {
                Swal({
                  text: this.tlt('add_node_condition_cannot_blank_msg3'),
                  toast: true,
                  type: "warning",
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 5000,
                });
                return;
              }
            }
          }
        }
      }
      if (this.is_slot && this.slots.length == 0) {
        Swal({
          text: this.tlt('add_node_add_one_slot_msg'),
          type: "warning",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
        });
        return;
      }
      if (this.is_slot && this.slots.length > 0) {
        for (let l = 0; l < this.slots.length; l++) {
          const slot = this.slots[l];
          if (!Boolean(slot.slot)) {
            Swal({
              text: this.tlt('add_node_entity_for_slot_msg'),
              type: "warning",
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 5000,
            });
            return;
          }
          if (!Boolean(slot.responses.length)) {
            Swal({
              text: this.tlt('add_node_response_to_slot_msg'),
              type: "warning",
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 5000,
            });
            return;
          }
        }
      }
      if (!this.is_slot && this.slots.length > 0) {
        for (let l = 0; l < this.slots.length; l++) {
          const slot = this.slots[l];
          for (i in slot.responses) {
            this.delete_asistance_response_by_id(slot.responses[i]);
          }
        }
        this.arrange_ids_function();
        this.slots = [];
      }
      if (this.manage_handlers.length > 0 && this.is_slot) {
        for (let ind = 0; ind < this.manage_handlers.length; ind++) {
          const handler = this.manage_handlers[ind];
          if (handler.triggers.length < 1) {
            Swal({
              text: this.tlt('add_node_condition_for_manage_handler_msg'),
              type: "warning",
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 5000,
            });
            return;
          } else if (handler.triggers.length > 0) {
            for (let i = 0; i < handler.triggers.length; i++) {
              if (
                handler.triggers[i].trigger_value === "" ||
                handler.triggers[i].trigger_value === null
              ) {
                Swal({
                  text: this.tlt('add_node_cannot_blank_in_handler_msg1'),
                  toast: true,
                  type: "warning",
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 5000,
                });
                return;
              }
              if (handler.triggers[i].trigger_type === "entity") {
                if (
                  handler.triggers[i].operand === "" ||
                  handler.triggers[i].operand === null
                ) {
                  Swal({
                    text: this.tlt('add_node_cannot_blank_in_handler_msg2'),
                    toast: true,
                    type: "warning",
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 5000,
                  });
                  return;
                }
                if (handler.triggers[i].operand === "is") {
                  if (
                    handler.triggers[i].entity_value === "" ||
                    handler.triggers[i].entity_value === null
                  ) {
                    Swal({
                      text: this.tlt('add_node_cannot_blank_in_handler_msg3'),
                      toast: true,
                      type: "warning",
                      position: "top-end",
                      showConfirmButton: false,
                      timer: 5000,
                    });
                    return;
                  }
                }
              }
            }
          }
          if (handler.responses.length < 1) {
            Swal({
              text: this.tlt('add_node_one_resp_handler_msg'),
              type: "warning",
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 5000,
            });
            return;
          } else if (handler.responses.length > 0) {
            for (let i = 0; i < handler.responses.length; i++) {
              if (handler.responses[i].type === "text") {
                for (let j = 0; j < handler.responses[i].values.length; j++) {
                  if (Boolean(handler.responses[i].values[j]) === false) {
                    Swal({
                      text: this.tlt('add_node_text_resp_in_handler_msg'),
                      type: "warning",
                      toast: true,
                      position: "top-end",
                      showConfirmButton: false,
                      timer: 5000,
                    });
                    return;
                  }
                }
              } else if (handler.responses[i].type === "image") {
                if (Boolean(handler.responses[i].source) === false) {
                  Swal({
                    text: this.tlt('add_node_img_resp_in_handler_msg'),
                    type: "warning",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 5000,
                  });
                  return;
                }
                if (
                  this.reg_image.test(handler.responses[i].source) === false
                ) {
                  Swal({
                    text: this.tlt('add_node_valid_img_url_in_handler_msg'),
                    type: "warning",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 8000,
                  });
                  return;
                }
              } else if (handler.responses[i].type === "video") {
                if (Boolean(handler.responses[i].source) === false) {
                  Swal({
                    text: this.tlt('add_node_video_resp_in_handler_msg'),
                    type: "warning",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 5000,
                  });
                  return;
                }
                if (this.reg_url.test(handler.responses[i].source) === false) {
                  Swal({
                    text: this.tlt('add_node_valid_video_url_in_handler_msg'),
                    type: "warning",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 8000,
                  });
                  return;
                }
              } else if (handler.responses[i].type === "choices") {
                for (let j = 0; j < handler.responses[i].choices.length; j++) {
                  if (
                    Boolean(handler.responses[i].choices[j].title) === false ||
                    Boolean(handler.responses[i].choices[j].payload) === false
                  ) {
                    Swal({
                      text: this.tlt('add_node_choice_resp_in_handler_msg'),
                      type: "warning",
                      toast: true,
                      position: "top-end",
                      showConfirmButton: false,
                      timer: 5000,
                    });
                    return;
                  }
                }
              } else if (handler.responses[i].type === "card") {
                for (
                  let j = 0;
                  j < handler.responses[i].card_list.length;
                  j++
                ) {
                  const carousel = handler.responses[i].card_list[j];
                  if (carousel.is_image === true) {
                    handler.responses[i].card_list[j].video = "";
                  } else {
                    handler.responses[i].card_list[j].image = "";
                  }
                  let button_has_value = false;
                  for (let k = 0; k < carousel.buttons.length; k++) {
                    if (
                      carousel.buttons[k].title != "" ||
                      carousel.buttons[k].value != ""
                    ) {
                      button_has_value = true;
                    }
                  }
                  if (
                    carousel.title === "" &&
                    carousel.text === "" &&
                    carousel.image === "" &&
                    carousel.video === "" &&
                    button_has_value === false
                  ) {
                    Swal({
                      text: this.tlt('add_node_card_filled_for_handler_msg'),
                      type: "warning",
                      toast: true,
                      position: "top-end",
                      showConfirmButton: false,
                      timer: 5000,
                    });
                    return;
                  }
                  if (
                    carousel.image != "" &&
                    this.reg_image.test(carousel.image) === false
                  ) {
                    Swal({
                      text: this.tlt('add_node_card_valid_img_url_in_handler_msg'),
                      type: "warning",
                      toast: true,
                      position: "top-end",
                      showConfirmButton: false,
                      timer: 8000,
                    });
                    return;
                  }
                  if (
                    carousel.video != "" &&
                    this.reg_url.test(carousel.video) === false
                  ) {
                    Swal({
                      text: this.tlt('add_node_card_valid_video_url_in_handler_msg'),
                      type: "warning",
                      toast: true,
                      position: "top-end",
                      showConfirmButton: false,
                      timer: 8000,
                    });
                    return;
                  }
                  for (let d = 0; d < carousel.buttons.length; d++) {
                    if (
                      (carousel.buttons[d].title != "" &&
                        carousel.buttons[d].value == "") ||
                      (carousel.buttons[d].title == "" &&
                        carousel.buttons[d].value != "")
                    ) {
                      Swal({
                        text: this.tlt('add_node_card_valid_img_url_in_handler_msg'),
                        type: "warning",
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 5000,
                      });
                      return;
                    }
                  }
                }
              }
            }
          }
        }
      }
      if (!this.is_webhook_details) {
        this.is_webhook = false;
        this.webhook_mapping = [];
      }
      if (this.is_webhook) {
        if (!Boolean(this.webhook_id)) {
          Swal({
            text: this.tlt('add_node_webhook_name_msg'),
            type: "warning",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 5000,
          });
          return;
        }
        if (!Boolean(this.webhook_variable)) {
          Swal({
            text: this.tlt('add_node_webhook_return_variable_msg'),
            type: "warning",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 8000,
          });
          return;
        }
        if (!Boolean(this.webhook_mapping.length)) {
          // Swal({
          //   text: "Atleast add one webhook parameter",
          //   type: "warning",
          //   toast: true,
          //   position: "top-end",
          //   showConfirmButton: false,
          //   timer: 8000,
          // });
          // return;
        } else {
          for (let index = 0; index < this.webhook_mapping.length; index++) {
            if (
              !Boolean(this.webhook_mapping[index].key) ||
              !Boolean(this.webhook_mapping[index].value)
            ) {
              Swal({
                text: this.tlt('add_node_webhook_para_empty_msg1'),
                type: "warning",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 8000,
              });
              return;
            }
          }
        }
      }
      if (this.is_notification) {
        if (
          this.notifications.notify[0].type == "" ||
          this.notifications.notify[0].type == null
        ) {
          Swal({
            text: this.tlt('add_node_webhook_notification_type_msg'),
            type: "warning",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 5000,
          });
          return;
        }
        if (
          this.notifications.notify[0].slot == "" ||
          this.notifications.notify[0].slot == null
        ) {
          Swal({
            text: this.tlt('add_node_webhook_enter_name_msg'),
            type: "warning",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 5000,
          });
          return;
        }
        if (
          this.notifications.notify[0].template_name == "" ||
          this.notifications.notify[0].template_name == null
        ) {
          Swal({
            text: this.tlt('add_node_webhook_template_name_msg'),
            type: "warning",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 5000,
          });
          return;
        }
        if (this.notifications.responses.length < 1) {
          Swal({
            text: this.tlt('add_node_webhook_notification_for_bot_cases_msg'),
            type: "warning",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 8000,
          });
          return;
        } else {
          let check_notification_successful_response = false;
          let check_notification_unsuccessful_response = false;
          for (let l = 0; l < this.notifications.responses.length; l++) {
            const notification_response_id = this.notifications.responses[l];
            if (
              this.assistant_response[notification_response_id].condition ===
              "!successful"
            ) {
              check_notification_successful_response = true;
            }
            if (
              this.assistant_response[notification_response_id].condition ===
              "!unsuccessful"
            ) {
              check_notification_unsuccessful_response = true;
            }
          }
          if (!Boolean(check_notification_successful_response)) {
            Swal({
              text: this.tlt('add_node_webhook_notification_successful_msg'),
              type: "warning",
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 8000,
            });
            return;
          } else if (!Boolean(check_notification_unsuccessful_response)) {
            Swal({
              text: this.tlt('add_node_webhook_notification_unsuccessful_msg'),
              type: "warning",
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 8000,
            });
            return;
          }
        }
      } else {
        for (i in this.notifications.responses) {
          this.delete_asistance_response_by_id(this.notifications.responses[i]);
        }
        this.arrange_ids_function();
        this.notifications = {
          notify: [
            {
              type: "",
              slot: "",
              template_id: "",
              template_name: "",
            },
          ],
          responses: [],
        };
      }
      if (this.assistant_response.length < 1) {
        Swal({
          text: this.tlt('add_node_webhook_one_resp_to_node_msg'),
          type: "warning",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
        });
        return;
      } else if (this.assistant_response.length > 0) {
        for (let i = 0; i < this.assistant_response.length; i++) {
          if (this.assistant_response[i].type === "text") {
            for (let j = 0; j < this.assistant_response[i].values.length; j++) {
              if (Boolean(this.assistant_response[i].values[j]) === false) {
                Swal({
                  text: this.tlt('add_node_webhook_text_response_msg'),
                  type: "warning",
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 5000,
                });
                return;
              }
            }
          } else if (this.assistant_response[i].type === "image") {
            if (Boolean(this.assistant_response[i].source) === false) {
              Swal({
                text: this.tlt('add_node_webhook_img_response_msg'),
                type: "warning",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 5000,
              });
              return;
            }
            if (
              this.reg_image.test(this.assistant_response[i].source) === false
            ) {
              Swal({
                text: this.tlt('add_node_webhook_valid_img_url_msg'),
                type: "warning",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 8000,
              });
              return;
            }
          } else if (this.assistant_response[i].type === "video") {
            if (Boolean(this.assistant_response[i].source) === false) {
              Swal({
                text: this.tlt('add_node_webhook_video_response_msg'),
                type: "warning",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 5000,
              });
              return;
            }
            if (
              this.reg_url.test(this.assistant_response[i].source) === false
            ) {
              Swal({
                text: this.tlt('add_node_webhook_valid_video_url_msg'),
                type: "warning",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 8000,
              });
              return;
            }
          } else if (this.assistant_response[i].type === "choices") {
            for (
              let j = 0;
              j < this.assistant_response[i].choices.length;
              j++
            ) {
              if (
                Boolean(this.assistant_response[i].choices[j].title) ===
                  false ||
                Boolean(this.assistant_response[i].choices[j].payload) === false
              ) {
                Swal({
                  text: this.tlt('add_node_webhook_choice_response_msg'),
                  type: "warning",
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 5000,
                });
                return;
              }
            }
          } else if (this.assistant_response[i].type === "card") {
            for (
              let j = 0;
              j < this.assistant_response[i].card_list.length;
              j++
            ) {
              const carousel = this.assistant_response[i].card_list[j];
              if (carousel.is_image === true) {
                this.assistant_response[i].card_list[j].video = "";
              } else {
                this.assistant_response[i].card_list[j].image = "";
              }
              let button_has_value = false;
              for (let k = 0; k < carousel.buttons.length; k++) {
                if (
                  carousel.buttons[k].title != "" ||
                  carousel.buttons[k].value != ""
                ) {
                  button_has_value = true;
                }
              }
              if (
                carousel.title === "" &&
                carousel.text === "" &&
                carousel.image === "" &&
                carousel.video === "" &&
                button_has_value === false
              ) {
                Swal({
                  text: this.tlt('add_node_webhook_filled_for_handler_msg'),
                  type: "warning",
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 5000,
                });
                return;
              }
              if (
                carousel.image != "" &&
                this.reg_image.test(carousel.image) === false
              ) {
                Swal({
                  text: this.tlt('add_node_webhook_valid_img_url_handler_msg'),
                  type: "warning",
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 8000,
                });
                return;
              }
              if (
                carousel.video != "" &&
                this.reg_url.test(carousel.video) === false
              ) {
                Swal({
                  text: this.tlt('add_node_webhook_valid_video_url_handler_msg1'),
                  type: "warning",
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 8000,
                });
                return;
              }
              for (let d = 0; d < carousel.buttons.length; d++) {
                if (
                  (carousel.buttons[d].title != "" &&
                    carousel.buttons[d].value == "") ||
                  (carousel.buttons[d].title == "" &&
                    carousel.buttons[d].value != "")
                ) {
                  Swal({
                    text: this.tlt('add_node_webhook_valid_img_url_handler_msg1'),
                    type: "warning",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 5000,
                  });
                  return;
                }
              }
            }
          }
        }
      }
      if (!this.next_step.behavior) {
        Swal({
          text: this.tlt('dialog_flow_webhook_next_step_msg1'),
          type: "warning",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
        });
        return;
      }
      if (
        this.save_then_assistant_should == "jump_to" &&
        this.jump_to_node_id == ""
      ) {
        Swal({
          text: this.tlt('dialog_flow_webhook_next_id_msg1'),
          type: "warning",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
        });
        return;
      }
      if (this.is_slot && this.slots.length != 0) {
        this.node_type = "form";
      } else {
        this.node_type = "basic";
      }
      var new_triggers = this.triggers;
      var new_assistant_response = this.assistant_response;
      var new_slots = this.slots;
      var webhook_mapping = this.webhook_mapping;
      var manage_handlers = this.manage_handlers;
      var new_next_step = this.next_step;
      var node = new TreeNode({
        name: this.node_name,
        node_name: this.node_type + "_" + this.node_name,
        node_type: this.node_type,
        is_leaf: false,
        is_root: true,
        triggers: new_triggers,
        responses: new_assistant_response,
        slot_setting: this.is_slot,
        notification_enabled: this.is_notification,
        slots: this.is_slot ? new_slots : null,
        notifications: this.is_notification ? this.notifications : null,
        next_step: new_next_step,
        webhook_integration: this.is_webhook,
        webhook_id: this.is_webhook ? this.webhook_id : null,
        webhook_return_variable: this.is_webhook ? this.webhook_variable : "",
        webhook_mapping: this.is_webhook ? webhook_mapping : null,
        editNodeDisabled: true,
        manage_handlers:
          manage_handlers.length > 0 && this.is_slot ? manage_handlers : null,
        // addTreeNodeDisabled: true,
        // addLeafNodeDisabled: true
      });
      if (!this.data.children) this.data.children = [];
      this.data.addChildren(node);
      this.nodes_list.push([
        {
          id: node.id,
          name: node.name,
        },
      ]);
      this.pushNewTree("addnode");
      this.empty_variable();
      // document.getElementById("add_trigger_btn").style.display = "block";
      $("#addnodemodal").modal("hide");
    },
    empty_variable() {
      this.node_id = "";
      this.node_name = "";
      this.node_type = "";
      this.is_root = false;
      this.is_slot = false;
      this.is_notification = false;
      this.is_webhook = false;
      this.webhook_id = null;
      this.webhook_variable = "";
      this.webhook_mapping = [];
      this.triggers = [
        {
          trigger_type: "",
          trigger_value: "",
        },
      ];
      this.assistant_response = [];
      this.filtered_assistant_response = [];
      this.slots = [];
      this.manage_handlers = [];
      (this.notifications = {
        notify: [
          {
            type: "",
            slot: "",
            template_id: "",
            template_name: "",
          },
        ],
        responses: [],
      }),
        (this.next_step = {});
      this.save_then_assistant_should = "";
      this.jump_to_node_id = "";
      this.is_show_edit = false;
      this.updated_node_list = [];
      // document.getElementById("add_trigger_btn").style.display = "block";
    },
    pushNewTree(from) {
      var vm = this;
      function _dfs(oldNode) {
        var newNode = {};
        for (var k in oldNode) {
          if (k !== "children" && k !== "parent") {
            newNode[k] = oldNode[k];
          }
        }
        if (oldNode.children && oldNode.children.length > 0) {
          newNode.children = [];
          for (var i = 0, len = oldNode.children.length; i < len; i++) {
            newNode.children.push(_dfs(oldNode.children[i]));
          }
        } else {
          newNode.children = [];
        }
        return newNode;
      }
      vm.newTree = _dfs(vm.data);
      axios
        .post(
          api_calls.form_automation_dialog_tree(),
          {
            company_id: vm.$session.get("UserInformation").company_id,
            company_name: vm.$session.get("UserInformation").company_name,
            is_save: true,
            node_structure: vm.newTree,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          $("#addnodemodal").modal("hide");
          if (this.api_status_code.NODE_STRUCTURE_SAVED_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
            if (from == "addnode") {
              Swal({
                type: "success",
                text: this.tlt('dialog_flow_node_added_msg'),
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 5000,
              });
            } else if (from == "childnode") {
              Swal({
                type: "success",
                text: this.tlt('dialog_flow_child_node_added_msg'),
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 5000,
              });
            } else if (from == "editnode") {
              Swal({
                type: "success",
                text: this.tlt('dialog_flow_node_edited_msg'),
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 5000,
              });
            } else if (from == "deletenode") {
              Swal({
                type: "success",
                text: this.tlt('dialog_flow_node_deleted_msg'),
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 5000,
              });
            } else {
              Swal({
                type: "success",
                text: this.tlt('dialog_flow_dialog_updated_msg'),
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 5000,
              });
            }
          } else if (this.api_status_code.NODE_STRUCTURE_NOT_SAVED_MODELS.MSG_CODE === response.data.message.MSG_CODE) {
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
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
        this.close_modal('save_changes_btn');
    },

    testNewTree() {
      var vm = this;
      function _dfs(oldNode) {
        var newNode = {};
        for (var k in oldNode) {
          if (k !== "children" && k !== "parent") {
            newNode[k] = oldNode[k];
          }
        }
        if (oldNode.children && oldNode.children.length > 0) {
          newNode.children = [];
          for (var i = 0, len = oldNode.children.length; i < len; i++) {
            newNode.children.push(_dfs(oldNode.children[i]));
          }
        }
        return newNode;
      }
      vm.newTree = _dfs(vm.data);
    },
    remove_current_node_jump_name(arr, value) {
      let update_list = false;
      for (let i = 0, len = arr.length; i < len; i++) {
        const found = arr[i].some((val) => val.name === value);
        if (found == true) {
          this.updated_node_list = arr[i].filter((item) => item.name !== value);
          update_list = true;
          break;
        }
      }
      if (update_list === false) {
        this.updated_node_list = [];
      }
    },

    set_next_step() {
      this.next_step = {
        behavior: this.save_then_assistant_should,
        node_id:
          this.save_then_assistant_should == "jump_to"
            ? this.jump_to_node_id.toString()
            : null,
        selector:
          this.save_then_assistant_should == "jump_to"
            ? "respond"
            : "wait_for_user_input",
      };
    },
    add_to_triggers_list(func, index) {
      if (func == "add") {
        this.triggers.push({
          trigger_type: "",
          trigger_value: "",
        });
      } else if (func == "remove") {
        this.triggers.splice(index, 1);
      }
      // if (this.is_root && this.triggers.length > 0) {
      //   document.getElementById("add_trigger_btn").style.display = "none";
      // }
    },
    manage_handlers_change_trigger_value(type, index, ind) {
      if (type === "intent") {
        this.manage_handlers[ind].triggers[index].trigger_value = "";
        delete this.manage_handlers[ind].triggers[index].operand;
        delete this.manage_handlers[ind].triggers[index].entity_value;
      } else if (type === "entity") {
        this.manage_handlers[ind].triggers[index].trigger_value = "";
        this.manage_handlers[ind].triggers[index].operand = "";
        this.manage_handlers[ind].triggers[index].entity_value = "";
      }
    },
    change_trigger_value(type, index) {
      if (type === "intent") {
        this.triggers[index].trigger_value = "";
        delete this.triggers[index].operand;
        delete this.triggers[index].entity_value;
      } else if (type === "entity") {
        this.triggers[index].trigger_value = "";
        this.triggers[index].operand = "";
        this.triggers[index].entity_value = "";
      }
    },
    manage_handlers_change_trigger_type(type, value, index, ind) {
      if (type === "intent") {
        this.manage_handlers[ind].name = "#" + value;
        delete this.manage_handlers[ind].triggers[index].operand;
        delete this.manage_handlers[ind].triggers[index].entity_value;
      } else if (type === "entity") {
        if (value.substring(0, 1) === "@") {
          this.manage_handlers[ind].name =
            "#" + value.substring(1, value.length);
        } else {
          this.manage_handlers[ind].name = "#" + value;
        }
        if (this.is_entity_type_sys_pattern(value)) {
          this.manage_handlers[ind].triggers[index].operand = "any";
          this.manage_handlers[ind].triggers[index].entity_value = "";
        } else {
          this.manage_handlers[ind].triggers[index].operand = "";
          this.manage_handlers[ind].triggers[index].entity_value = "";
        }
      }
    },
    change_trigger_type(type, value, index) {
      // @click="change_trigger_type(trigger.trigger_value, index)"
      // Here add detection of whether the value selected is intent or entity
      // if (Boolean(value.entity)) {
      //   this.triggers[index].trigger_type = "entity";
      // } else {
      //   this.triggers[index].trigger_type = "intent";
      // }
      if (this.is_root) {
        this.triggers[index].trigger_type = "intent";
      }
      if (type === "intent") {
        delete this.triggers[index].operand;
        delete this.triggers[index].entity_value;
      } else if (type === "entity") {
        if (this.is_entity_type_sys_pattern(value)) {
          this.triggers[index].operand = "any";
          this.triggers[index].entity_value = "";
        } else {
          this.triggers[index].operand = "";
          this.triggers[index].entity_value = "";
        }
      }
    },
    manage_handlers_change_trigger_entity_value(operand, index, ind) {
      var vm = this;
      vm.$set(
        vm.manage_handlers[ind].triggers,
        index,
        vm.manage_handlers[ind].triggers[index]
      );
      this.manage_handlers[ind].triggers[index].entity_value = "";
    },
    change_trigger_entity_value(operand, index) {
      var vm = this;
      vm.$set(vm.triggers, index, vm.triggers[index]);
      this.triggers[index].entity_value = "";
    },
    manage_handlers_set_trigger_entity_value(entity_value, index, ind) {
      var vm = this;
      vm.$set(
        vm.manage_handlers[ind].triggers,
        index,
        vm.manage_handlers[ind].triggers[index]
      );
    },
    set_trigger_entity_value(entity_value, index) {
      var vm = this;
      vm.$set(vm.triggers, index, vm.triggers[index]);
    },
    add_to_webhook_mapping(func, index) {
      if (func == "add") {
        this.webhook_mapping.push({
          key: "",
          value: "",
        });
      } else if (func == "remove") {
        this.webhook_mapping.splice(index, 1);
      }
    },
    // set_slot_setting(index, check_for, slot) {
    //   this.edit_slot_index = index;
    //   this.edit_slot_check_for = check_for;
    //   this.edit_slot_slot_variable = slot;
    // },
    set_slot_variable_in_assistance_response(id, slot) {
      for (let index = 0; index < this.assistant_response.length; index++) {
        if (this.assistant_response[index].id === id) {
          this.assistant_response[index].recognizes = slot;
        }
      }
    },
    set_slot_entity_variable(index, entity) {
      entity = entity.slice(1);
      this.slots[index].slot = "$" + entity;
      for (let i = 0; i < this.slots[index].responses.length; i++) {
        const id = this.slots[index].responses[i];
        const slot = this.slots[index].slot;
        this.set_slot_variable_in_assistance_response(id, slot);
      }
    },
    set_notifications_notify_template_id(template_name) {
      this.notifications.notify[0].template_id =
        this.notifications_notify_template_list
          .filter((name) => {
            return name.template_name === template_name;
          })
          .map((id) => {
            return id.template_id;
          })[0];
    },
    on_open_webhook_modal(variable) {
      this.webhook_assistant_response = [];
      for (var i in this.assistant_response) {
        if (this.assistant_response[i].recognizes == variable) {
          this.webhook_assistant_response.push(this.assistant_response[i]);
        }
      }
    },
    on_close_webhook_modal() {
      this.webhook_assistant_response = [];
    },

    on_open_slots_modal(slot, index, check_for) {
      this.edit_slot_index = index;
      this.edit_slot_check_for = check_for;
      this.edit_slot_slot_variable = slot;
      this.unfilled_slot_assistant_response = [];
      this.validation_slot_assistant_response = [];
      for (var i in this.assistant_response) {
        if (
          this.assistant_response[i].recognizes == slot &&
          this.assistant_response[i].condition === "unfilled_slot"
        ) {
          this.unfilled_slot_assistant_response.push(
            this.assistant_response[i]
          );
        }
        if (
          this.assistant_response[i].recognizes == slot &&
          this.assistant_response[i].condition === "validation_response"
        ) {
          this.validation_slot_assistant_response.push(
            this.assistant_response[i]
          );
        }
      }
      this.search_for_entity_has_validation(check_for);
    },
    on_close_slots_modal() {
      this.unfilled_slot_assistant_response = [];
      this.validation_slot_assistant_response = [];
      this.is_validation_entity = false;
      this.edit_slot_index = "";
      this.edit_slot_check_for = "";
      this.edit_slot_slot_variable = "";
    },
    on_open_notification_modal() {
      this.notification_successful_assistant_response = [];
      this.notification_unsuccessful_assistant_response = [];
      for (var i in this.assistant_response) {
        if (this.assistant_response[i].recognizes == "successful") {
          this.notification_successful_assistant_response.push(
            this.assistant_response[i]
          );
        }
      }
      for (var i in this.assistant_response) {
        if (this.assistant_response[i].recognizes == "unsuccessful") {
          this.notification_unsuccessful_assistant_response.push(
            this.assistant_response[i]
          );
        }
      }
    },
    on_close_manage_handlers() {},
    on_close_notification_modal() {
      this.notification_successful_assistant_response = [];
      this.notification_unsuccessful_assistant_response = [];
    },
    webhook_to_assistant_response(func, webhook, index) {
      if (func == "remove") {
        index = this.assistant_response.findIndex((x) => x.id == index);
        for (var i in this.assistant_response) {
          if (
            this.assistant_response[i].id == index &&
            this.assistant_response[i].recognizes == webhook
          ) {
            // this.slots[this.edit_slot_index].responses.splice(this.assistant_response[i].id, 1);
            this.assistant_response.splice(index, 1);
          }
        }
      }
      if (func == "add" && this.selected_response_type == "text") {
        this.assistant_response.push({
          id: this.assistant_response.length,
          type: this.selected_response_type,
          condition: "unfilled",
          recognizes: webhook,
          variation: "random",
          values: [""],
        });
      } else if (func == "add" && this.selected_response_type == "image") {
        this.assistant_response.push({
          id: this.assistant_response.length.toString(),
          type: "image",
          condition: "unfilled",
          recognizes: webhook,
          variation: "random",
          source: "",
        });
      } else if (func == "add" && this.selected_response_type == "video") {
        this.assistant_response.push({
          id: this.assistant_response.length.toString(),
          type: "video",
          condition: "unfilled",
          recognizes: webhook,
          variation: "random",
          source: "",
        });
      } else if (func == "add" && this.selected_response_type == "choices") {
        this.assistant_response.push({
          id: this.assistant_response.length.toString(),
          type: "choices",
          condition: "unfilled",
          recognizes: webhook,
          variation: "random",
          title: "",
          description: "",
          choices: [
            {
              type: "postback",
              title: "",
              payload: "",
            },
          ],
        });
      } else if (func == "add" && this.selected_response_type == "card") {
        this.assistant_response.push({
          id: this.assistant_response.length.toString(),
          type: "card",
          condition: "unfilled",
          recognizes: webhook,
          variation: "random",
          title: "",
          description: "",
          card_list: [
            {
              image: "",
              is_image: true,
              video: "",
              title: "",
              text: "",
              buttons: [
                {
                  type: "postback",
                  title: "",
                  value: "",
                },
              ],
            },
          ],
        });
      }
      this.arrange_ids_function();
      this.on_open_webhook_modal(webhook);
    },
    remove_notification_to_assistant_response(index, recognizes) {
      index = this.assistant_response.findIndex((x) => x.id == index);
      for (var i in this.assistant_response) {
        if (
          this.assistant_response[i].id == index &&
          this.assistant_response[i].recognizes == recognizes
        ) {
          this.assistant_response.splice(index, 1);
        }
      }
      this.on_open_notification_modal();
      this.arrange_ids_function();
    },
    manage_handlers_add_to_assistant_response_list(func, ind, index) {
      if (func == "add" && this.selected_response_type == "text") {
        this.manage_handlers[ind].responses.push({
          id: this.manage_handlers[ind].responses.length.toString(),
          type: this.selected_response_type,
          condition: false,
          recognizes: null,
          variation: "random",
          values: [""],
        });
      } else if (func == "add" && this.selected_response_type == "image") {
        this.manage_handlers[ind].responses.push({
          id: this.manage_handlers[ind].responses.length.toString(),
          type: this.selected_response_type,
          condition: false,
          recognizes: null,
          variation: "random",
          source: "",
        });
      } else if (func == "add" && this.selected_response_type == "video") {
        this.manage_handlers[ind].responses.push({
          id: this.manage_handlers[ind].responses.length.toString(),
          type: this.selected_response_type,
          condition: false,
          recognizes: null,
          variation: "random",
          source: "",
        });
      } else if (func == "add" && this.selected_response_type == "choices") {
        this.manage_handlers[ind].responses.push({
          id: this.manage_handlers[ind].responses.length.toString(),
          type: this.selected_response_type,
          condition: false,
          recognizes: null,
          variation: "random",
          title: "",
          description: "",
          choices: [
            {
              type: "postback",
              title: "",
              payload: "",
            },
          ],
        });
      } else if (func == "add" && this.selected_response_type == "card") {
        this.manage_handlers[ind].responses.push({
          id: this.manage_handlers[ind].responses.length.toString(),
          type: this.selected_response_type,
          condition: false,
          recognizes: null,
          variation: "random",
          title: "",
          description: "",
          card_list: [
            {
              image: "",
              is_image: true,
              video: "",
              title: "",
              text: "",
              buttons: [
                {
                  type: "postback",
                  title: "",
                  value: "",
                },
              ],
            },
          ],
        });
      } else if (func == "remove") {
        this.manage_handlers[ind].responses.splice(index, 1);
        this.manage_handlers_arrange_ids_function(ind);
      }
    },
    add_notification_successful_to_assistant_response(type) {
      if (
        this.notifications.notify[0].type == "" ||
        this.notifications.notify[0].type == null
      ) {
        Swal({
          text: this.tlt('dialog_flow_notification_type_msg'),
          type: "warning",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
        });
        return;
      }
      if (
        this.notifications.notify[0].slot == "" ||
        this.notifications.notify[0].slot == null
      ) {
        Swal({
          text: this.tlt('dialog_flow_variable_name_msg'),
          type: "warning",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
        });
        return;
      }
      if (
        this.notifications.notify[0].template_name == "" ||
        this.notifications.notify[0].template_name == null
      ) {
        Swal({
          text: this.tlt('dialog_flow_template_name_msg'),
          type: "warning",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
        });
        return;
      }
      if (this.selected_response_type == "text") {
        this.assistant_response.push({
          id: this.assistant_response.length.toString(),
          type: "text",
          condition: "!" + type,
          recognizes: type,
          variation: "random",
          values: [""],
        });
      } else if (this.selected_response_type == "image") {
        this.assistant_response.push({
          id: this.assistant_response.length.toString(),
          type: "image",
          condition: "!" + type,
          recognizes: type,
          variation: "random",
          source: "",
        });
      } else if (this.selected_response_type == "video") {
        this.assistant_response.push({
          id: this.assistant_response.length.toString(),
          type: "video",
          condition: "!" + type,
          recognizes: type,
          variation: "random",
          source: "",
        });
      } else if (this.selected_response_type == "choices") {
        this.assistant_response.push({
          id: this.assistant_response.length.toString(),
          type: "choices",
          condition: "!" + type,
          recognizes: type,
          variation: "random",
          title: "",
          description: "",
          choices: [
            {
              type: "postback",
              title: "",
              payload: "",
            },
          ],
        });
      } else if (this.selected_response_type == "card") {
        this.assistant_response.push({
          id: this.assistant_response.length.toString(),
          type: "card",
          condition: "!" + type,
          recognizes: type,
          variation: "random",
          title: "",
          description: "",
          card_list: [
            {
              image: "",
              is_image: true,
              video: "",
              title: "",
              text: "",
              buttons: [
                {
                  type: "postback",
                  title: "",
                  value: "",
                },
              ],
            },
          ],
        });
      }
      this.notifications.responses.push(
        (this.assistant_response.length - 1).toString()
      );
      this.on_open_notification_modal();
    },
    remove_slot_to_assistant_response(index, slot, from) {
      if (from == "slotmodal") {
        index = this.assistant_response.findIndex((x) => x.id == index);
        for (var i in this.assistant_response) {
          if (
            this.assistant_response[i].id == index &&
            this.assistant_response[i].recognizes == slot
          ) {
            // this.slots[this.edit_slot_index].responses.splice(this.assistant_response[i].id, 1);
            this.assistant_response.splice(index, 1);
          }
        }
        this.on_open_slots_modal(
          slot,
          this.edit_slot_index,
          this.edit_slot_check_for
        );
      } else {
        var id = index;
        for (var i in this.assistant_response) {
          if (
            this.assistant_response[i].id == id &&
            this.assistant_response[i].recognizes == slot
          ) {
            // this.slots[index].responses.splice(this.assistant_response[i].id, 1);
            this.assistant_response.splice(this.assistant_response[i], 1);
          }
        }
      }
      this.arrange_ids_function();
    },
    add_slot_to_assistant_response(
      from,
      index,
      check_for,
      slot,
      response,
      condition_type
    ) {
      if (slot == "" || slot == null) {
        Swal({
          text: this.tlt('dialog_flow_add_entity_first_msg'),
          type: "warning",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
        });
        return;
      }
      if (from == "text") {
        this.assistant_response.push({
          id: this.assistant_response.length.toString(),
          type: "text",
          condition: "unfilled_slot",
          recognizes: slot,
          variation: "random",
          values: [response],
        });
        // document.getElementById("checkfocus").disabled = true;
        this.slots[index].responses = [];
        this.slots[index].responses.push(
          (this.assistant_response.length - 1).toString()
        );
        this.on_open_slots_modal(
          this.edit_slot_slot_variable,
          this.edit_slot_index,
          this.edit_slot_check_for
        );
      }
      if (from == "Addbtn") {
        if (this.selected_response_type == "text") {
          this.assistant_response.push({
            id: this.assistant_response.length.toString(),
            type: "text",
            condition: condition_type,
            recognizes: slot,
            variation: "random",
            values: [""],
          });
        } else if (this.selected_response_type == "image") {
          this.assistant_response.push({
            id: this.assistant_response.length.toString(),
            type: "image",
            condition: condition_type,
            recognizes: slot,
            variation: "random",
            source: "",
          });
        } else if (this.selected_response_type == "video") {
          this.assistant_response.push({
            id: this.assistant_response.length.toString(),
            type: "video",
            condition: condition_type,
            recognizes: slot,
            variation: "random",
            source: "",
          });
        } else if (this.selected_response_type == "choices") {
          this.assistant_response.push({
            id: this.assistant_response.length.toString(),
            type: "choices",
            condition: condition_type,
            recognizes: slot,
            variation: "random",
            title: "",
            description: "",
            choices: [
              {
                type: "postback",
                title: "",
                payload: "",
              },
            ],
          });
        } else if (this.selected_response_type == "card") {
          this.assistant_response.push({
            id: this.assistant_response.length.toString(),
            type: "card",
            condition: condition_type,
            recognizes: slot,
            variation: "random",
            title: "",
            description: "",
            card_list: [
              {
                image: "",
                is_image: true,
                video: "",
                title: "",
                text: "",
                buttons: [
                  {
                    type: "postback",
                    title: "",
                    value: "",
                  },
                ],
              },
            ],
          });
        }
        this.slots[this.edit_slot_index].responses.push(
          (this.assistant_response.length - 1).toString()
        );
        this.on_open_slots_modal(
          this.edit_slot_slot_variable,
          this.edit_slot_index,
          this.edit_slot_check_for
        );
      }
    },
    add_to_slots_list(func, index, response_id) {
      if (func == "add") {
        this.slots.push({
          id: this.slots.length.toString(),
          check_for: "",
          slot: "",
          responses: [],
        });
      } else if (func == "remove") {
        this.slots.splice(index, 1);
        for (var i in response_id) {
          for (var j in this.assistant_response) {
            if (response_id[i] == this.assistant_response[j].id) {
              this.assistant_response.splice(j, 1);
            }
          }
        }
        this.arrange_ids_function();
        if (this.slots != []) {
          for (var i in this.slots) {
            this.slots[i].id = i.toString();
          }
        }
      }
    },
    manage_handlers_select_response_variation(index, variation, ind) {
      this.manage_handlers[ind].responses[index].variation = variation;
    },
    select_response_variation(index, variation) {
      this.assistant_response[index].variation = variation;
    },
    manage_handler_add_to_assistant_response_text_list(func, id, ind, num) {
      var index = this.manage_handlers[ind].responses.findIndex((x) => x.id == id);
      if (func == "add") {
        this.manage_handlers[ind].responses[index].values.push("");
      } else if (func == "remove") {
        this.manage_handlers[ind].responses[index].values.splice(num, 1);
      }
    },
    add_to_assistant_response_text_list(func, id, num) {
      var index = this.assistant_response.findIndex((x) => x.id == id);
      if (func == "add") {
        this.assistant_response[index].values.push("");
      } else if (func == "remove") {
        this.assistant_response[index].values.splice(num, 1);
      }
      this.filter_asistance_response();
    },
    manage_handlers_add_to_assistant_response_choice_list(
      func,
      id,
      ind,
      num
    ) {
      var index = this.manage_handlers[ind].responses.findIndex((x) => x.id == id);
      if (func == "add") {
        this.manage_handlers[ind].responses[index].choices.push({
          type: "postback",
          title: "",
          payload: "",
        });
      } else if (func == "remove") {
        this.manage_handlers[ind].responses[index].choices.splice(num, 1);
      }
    },
    manage_handlers_add_to_assistant_response_carousel_card_button_list(
      func,
      id,
      ind,
      num,
      btn_num
    ) {
      var index = this.manage_handlers[ind].responses.findIndex((x) => x.id == id);
      if (func == "add") {
        this.manage_handlers[ind].responses[index].card_list[num].buttons.push({
          type: "postback",
          title: "",
          value: "",
        });
      } else if (func == "remove") {
        this.manage_handlers[ind].responses[index].card_list[
          num
        ].buttons.splice(btn_num, 1);
      }
    },
    manage_handlers_add_to_assistant_response_carousel_card_list(
      func,
      id,
      ind,
      num
    ) {
      var index = this.manage_handlers[ind].responses.findIndex((x) => x.id == id);
      if (func == "add") {
        this.manage_handlers[ind].responses[index].card_list.push({
          image: "",
          is_image: true,
          video: "",
          title: "",
          text: "",
          buttons: [
            {
              type: "postback",
              title: "",
              value: "",
            },
          ],
        });
      } else if (func == "remove") {
        this.manage_handlers[ind].responses[index].card_list.splice(num, 1);
      }
    },
    add_to_assistant_response_choice_list(func, id, num) {
      var index = this.assistant_response.findIndex((x) => x.id == id);
      if (func == "add") {
        this.assistant_response[index].choices.push({
          type: "postback",
          title: "",
          payload: "",
        });
      } else if (func == "remove") {
        this.assistant_response[index].choices.splice(num, 1);
      }
    },
    add_to_assistant_response_carousel_card_button_list(
      func,
      id,
      num,
      btn_num
    ) {
      var index = this.assistant_response.findIndex((x) => x.id == id);
      if (func == "add") {
        this.assistant_response[index].card_list[num].buttons.push({
          type: "postback",
          title: "",
          value: "",
        });
      } else if (func == "remove") {
        this.assistant_response[index].card_list[num].buttons.splice(
          btn_num,
          1
        );
      }
    },
    add_to_assistant_response_carousel_card_list(func, id, num) {
      var index = this.assistant_response.findIndex((x) => x.id == id);
      if (func == "add") {
        this.assistant_response[index].card_list.push({
          image: "",
          is_image: true,
          video: "",
          title: "",
          text: "",
          buttons: [
            {
              type: "postback",
              title: "",
              value: "",
            },
          ],
        });
      } else if (func == "remove") {
        this.assistant_response[index].card_list.splice(num, 1);
      }
    },
    add_to_assistant_response_list(func, id) {
      var index = this.assistant_response.findIndex((x) => x.id == id);
      if (func == "add" && this.selected_response_type == "text") {
        this.assistant_response.push({
          id: this.assistant_response.length.toString(),
          type: this.selected_response_type,
          condition: false,
          recognizes: null,
          variation: "random",
          values: [""],
        });
      } else if (func == "add" && this.selected_response_type == "image") {
        this.assistant_response.push({
          id: this.assistant_response.length.toString(),
          type: this.selected_response_type,
          condition: false,
          recognizes: null,
          variation: "random",
          source: "",
        });
      } else if (func == "add" && this.selected_response_type == "video") {
        this.assistant_response.push({
          id: this.assistant_response.length.toString(),
          type: this.selected_response_type,
          condition: false,
          recognizes: null,
          variation: "random",
          source: "",
        });
      } else if (func == "add" && this.selected_response_type == "card") {
        this.assistant_response.push({
          id: this.assistant_response.length.toString(),
          type: this.selected_response_type,
          condition: false,
          recognizes: null,
          variation: "random",
          card_list: [
            {
              image: "",
              is_image: true,
              video: "",
              title: "",
              text: "",
              buttons: [
                {
                  type: "postback",
                  title: "",
                  value: "",
                },
              ],
            },
          ],
        });
      } else if (func == "add" && this.selected_response_type == "choices") {
        this.assistant_response.push({
          id: this.assistant_response.length.toString(),
          type: this.selected_response_type,
          condition: false,
          recognizes: null,
          variation: "random",
          title: "",
          description: "",
          choices: [
            {
              type: "postback",
              title: "",
              payload: "",
            },
          ],
        });
      } else if (func == "remove") {
        this.assistant_response.splice(index, 1);
        this.arrange_ids_function();
      }
      this.filter_asistance_response();
    },
    check_first_char(e){
      let val = e.target.value;
      this.show_intent_list = false;
      if(val.length == 1){
        if (val == '/'){
          this.show_intent_list = true;
        }
      }else{
        this.show_intent_list = false;
      }
    }
  },
};
</script>
<style lang="scss" rel="stylesheet/less">
.multiselect .multiselect__tags {
  min-height: 40px !important;
  max-height: 40px !important;
}
.multiselect__tags {
  padding: 6px 40px 0 8px;
}
.multiselect {
  min-height: 40px !important;
  max-height: 40px !important;
}
.multiselect__single {
  overflow: hidden;
  white-space: nowrap;
  padding-right: 5px !important;
}
.vtl-node-main {
  border: 0.5px solid #a5a5a5;
  opacity: 1;
  border-radius: 3px;
  padding: 0 !important;
  width: 350px;
}
.vtl-node-main .vtl-caret {
  margin-left: 0px !important;
  padding-left: 6px !important;
}
.vtl-node-content {
  width: 230px !important;
  padding: 8px 0px 8px 16px;
  margin-left: 8px;
  border-left: 0.5px solid #a5a5a5;
}
.vtl-node-main .vtl-operation * {
  padding-right: 3px !important;
}
.vtl-border {
  margin-top: 0px !important;
  height: 10px !important;
}
.vtl-up {
  margin-top: 0px !important;
}
.vtl-bottom {
  height: 0px !important;
  margin-top: 0px !important;
}
.vtl {
  .vtl-drag-disabled {
    background-color: #d0cfcf;
    &:hover {
      background-color: #d0cfcf;
    }
  }
  .vtl-disabled {
    background-color: #d0cfcf;
  }
}
</style>
<style lang="scss" rel="stylesheet/less" scoped>
.input-group-append {
  margin-left: 0px !important;
}
hr {
  margin-top: 2rem !important;
  margin-bottom: 2rem !important;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.textarea-style {
  width: 100% !important;
  padding: 0.375rem 0.5rem !important;
  height: 75px !important;
  line-height: 20px !important;
}
.ScrollStyle {
  min-height: 0px;
  max-height: 92px;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  /* border: 1px solid #e3e2e5; */
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
  // background: #27397b;
  background: #828187;
  border-radius: 10px;
}
.ScrollStyle::-webkit-scrollbar-thumb:hover {
  // background: #19295f;
  background: #6c6c74;
  border-radius: 10px;
}
.dash-card .card-body {
  padding: 15px !important;
  // min-height: 0vh !important;
  min-height: 152px !important;
}
.label_header {
  font-weight: 500 !important;
  font-size: 14px !important;
  margin-top: 0.5rem;
  margin-bottom: 0rem;
}
.radio-label {
  margin-left: 0.5rem;
  font-size: 10px !important;
}
.sub_heading_carousel {
  font-size: 16px !important;
  font-weight: 500 !important;
  color: #212529 !important;
  margin-bottom: 5px;
}
.form-control {
  color: #545864 !important;
}
.modal-content {
  border: 0.12rem solid !important;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
  // transition: box-shadow 0.5s ease-in-out !important;
}
a:hover {
  color: #192765;
}
a {
  color: #273679;
}
.custom-select {
  background: none !important;
  background-image: linear-gradient(45deg, transparent 50%, #999 60%),
    linear-gradient(135deg, #999 40%, transparent 50%) !important;
  background-position: calc(100% - 19px) 15px, calc(100% - 13px) 15px, 100% 0 !important;
  background-size: 6px 6px, 6px 6px !important;
  background-repeat: no-repeat !important;
  -webkit-appearance: none;
  -moz-appearance: none;
}
.unit {
  position: absolute !important;
  display: block !important;
  left: 12px !important;
  top: 9px !important;
  z-index: 9 !important;
  color: #545864 !important;
  font-size: 14px !important;
}
.choice-label {
  font-size: 14px !important;
}
.response-variations {
  font-size: 14px !important;
}
.sub_heading {
  font-size: 16px !important;
  font-weight: 500 !important;
}
.modal-xl {
  max-width: 1140px;
}
.modal-lg {
  max-width: 1000px;
}
.custom-button-box {
  border: 0.5px solid #ccc;
}
.custom-box {
  margin-left: 1rem !important;
  transition-duration: 0.3s;
  transition-property: box-shadow, transform;
  border: 2px solid !important;
  padding: 1rem !important;
}
.custom-box:hover,
.custom-box:focus,
.custom-box:active {
  box-shadow: 1px 10px 10px -10px rgba(0, 0, 24, 0.5);
}
.custom-box-head {
  border: 2px solid !important;
  padding: 10px !important;
  transition-duration: 0.3s;
  transition-property: box-shadow, transform;
}
.custom-box-head:hover,
.custom-box-head:focus,
.custom-box-head:active {
  box-shadow: 1px 10px 10px -10px rgba(0, 0, 24, 0.5);
}
.modal {
  overflow-y: auto;
}
h6 {
  text-align: left;
  font: normal 16px/18px Fira Sans;
  letter-spacing: 0px;
  color: #1d1d1d;
  opacity: 1;
}
p {
  font-size: 14px;
}
.input-tag {
  top: 248px;
  left: 508px;
  width: 405px;
  height: 38px;
  // border: 1px solid #dbe2e8;
  border-radius: 5px;
  opacity: 1;
  font-size: 14px;
  padding: 10px 15px 10px 20px;
}
.icon {
  &:hover {
    cursor: pointer;
  }
}

.muted {
  color: gray;
  font-size: 80%;
}

.add_response_button {
  font-size: 14px;
  color: rgb(10, 10, 10);
  background: #fff;
  border: 1px solid #dbe2e8;
  padding-left: 7px;
  padding-right: 7px;
  font-weight: 400;
  line-height: 20px;
  /* display: inline-block; */
  border-radius: 5px;
  cursor: pointer;
  float: right;
}
.multiselect .multiselect__tags {
  min-height: unset !important;
  line-height: 1 !important;
}
.example {
  margin-left: -110px !important;
  cursor: pointer !important;
  height: 0px !important;
  z-index: 100;
}
.insert_variable_circle {
  color: blue !important;
}
.insert_variable_block {
  opacity: 1 !important;
}
.intent-list-field::-webkit-calendar-picker-indicator {
  display:none !important;
}
</style>