<template>
  <div class="dash-cont">
    <div class="spinner" v-show="spinnerOn"></div>
    <div id="popover_content" class="d-none">
      <select
        class="form-control"
        v-show="word_selected == true"
        v-model="drop_down_select"
        @change="entity_selected(drop_down_select)"
        style="height: 25px; padding-left: 10px; padding-right: 10px"
      >
        <option
          v-for="(word, index2) in word_info"
          :key="index2"
          data-role="tagsinput"
          :value="word"
        >
          {{ word }}
        </option>
      </select>
    </div>
    <div class="container-fluid">
      <div class="card dash-card">
        <div
          class="card-header d-block d-sm-flex flex-wrap justify-content-between"
        >
          <h4 class="mb-sm-0">{{tlt('ner_page_title')}}</h4>
          <div class="card-act d-flex flex-wrap">
            <input
              class="form-control search-bar"
              id="search_bar"
              style="width: 150px !important;"
              :placeholder="tlt('search_here')"
              v-model.trim="search_name"
              @keydown.enter="search_ner_statment"
            />
            <a type="button" v-if="isVisibleSearchClear" class="btn bg-transparent mt-auto mb-auto py-0" @click="clear_search_name" style="margin-left: -40px; z-index: 10;">
              <img src="/img/close-icn.png" alt />
            </a>
            <a
              href="#"
              class="darkblue-btn"
              @click="search_ner_statment"
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
              :class="ner_model_inprogress === true ? 'disabled_btn' : ''"
              id="ner_add_tag_btn"
              @click="add_ner_tag()"
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
              {{tlt('ner_page_add_ner_tag_btn')}}
            </a>
            <a
              id="ner_add_statement_btn"
              href="#"
              class="darkblue-btn"
              :class="ner_model_inprogress === true ? 'disabled_btn' : ''"
              @click="add_ner_statemnent()"
              data-toggle="modal"
              data-target="#statementmodal"
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
              {{tlt('ner_page_add_statement_btn')}}
            </a>
            <a
              id="ner_upload_btn"
              href="#"
              class="darkblue-btn"
              :class="ner_model_inprogress === true ? 'disabled_btn' : ''"
              @click="upload_ner_file()"
              data-toggle="modal"
              data-target="#upload_csv_file"
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
              {{tlt('ner_page_upload_file_btn')}}
            </a>
            <!-- <a
              href="#"
              class="darkblue-btn"
              @click="start_tagging"
              id="start_tagging_id"
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
              Start Tagging
            </a> -->
            <button
              class="darkblue-btn"
              @click="train_ner_model"
              v-show="role == 'Admin' || role == 'SuperAdmin'"
              id="ner_train_model_btn"
              :disabled="ner_model_inprogress == true"
              :style="show_model_progress('style')"
              :title="show_model_progress('title')">
              <i class="fa fa-spinner fa-spin" v-show="ner_model_inprogress"></i>
              {{tlt('ner_page_train_ner_btn')}}</button
            >
            <a
              href="javascript:void(0)"
              class="red-btn"
              :class="ner_model_inprogress === true ? 'disabled_btn' : ''"
              @click="delete_ner_multiple"
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
              {{tlt('ner_page_delete_btn')}}
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
                            @click="selected_statements('all')"
                          />
                          <span class="icn"></span>
                        </label>
                      </div>
                    </th>
                    <th scope="col" style="width: 10%">{{tlt('ner_page_action_th')}}
                      <a>
                        <i
                          class="fa fa-info-circle"
                          aria-hidden="true"
                          title="Start by adding a statement, 
then select the part of statement you 
wish to tag with your mouse and select 
the respective tag then save it"
                          style="font-size: 16px"
                        >
                        </i>
                      </a>
                    </th>
                    <th scope="col" style="width: 40%">
                      {{tlt('ner_page_statement_th')}}
                    </th>
                    <th scope="col">{{tlt('ner_page_tag_th')}}</th>
                    <th scope="col" style="width: 1%">{{tlt('ner_page_untag_th')}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(statement, index) in statements"
                    :key="index"
                    id="list-group"
                  >
                    <th scope="row">
                      <div class="form-check checkbox checkbox-success">
                        <label class="form-check-label">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            @change="selected_statements(index)"
                          />
                          <span class="icn"></span>
                        </label>
                      </div>
                    </th>
                    <td
                      class="action"
                      style="padding: 10px 0px 10px 5px; text-align: center"
                    >
                      <!-- <i class="fas fa-info-circle"></i> -->
                      <a @click="save_statement(index)">
                      <i
                        v-if='statement.IsTagCompleted == "YES"' 
                        class="fa fa-save fa-lg" 
                        aria-hidden="true"
                        title="Save"
                        style="cursor: pointer; position: relative; top: 2px;">
                      </i>
                      <i
                        v-else
                        class="fa fa-save fa-lg fa-pulse" 
                        aria-hidden="true"
                        title="Save"
                        style="cursor: pointer; position: relative; top: 2px;">
                      </i>
                      </a>
                      <a 
                      href="#" 
                      title="Edit"
                      @click="assign_variable(index)"
                      :class="ner_model_inprogress === true ? 'disabled_btn' : ''"

                      data-toggle="modal"
                      data-target="#editstatementmodal"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15.392"
                          height="15.392"
                          viewBox="0 0 15.392 15.392"
                          data-toggle="modal"
                          data-target="#"
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
                        @click="delete_ner(index)"
                        title="Delete"
                         :class="ner_model_inprogress === true ? 'disabled_btn' : ''"
                        id="single_delete_id"
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
                    <td @mouseup="selected_text(index)">
                      {{ statement.Statement }}
                    </td>
                    <td>
                      <span
                        v-for="(selection, idx) in statements[index]
                          .selected_list"
                        :key="idx"
                      >
                        <!-- <span
                        v-for="(selection, idx) in statement.selected_list"
                        :key="idx"
                      > -->
                        <!-- <span style="width: 100%"
                          >{{ selection.text }},{{ selection.word_type }};</span
                        > -->
                        <span style="width: 100%">
                          <!-- {{ statements[index].selected_list[idx].text }},{{ statements[index].selected_list[idx].word_type }}; -->
                          {{ statements[index].selected_list[idx].text }},{{
                            statements[index].selected_list[idx].word_type
                          }};
                        </span>
                      </span>
                    </td>
                    <td style="cursor: pointer;text-align: center;" @click="remove_tag(index)">
                      <!-- X -->
                      &times;
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- <button
            type="submit"
            class="darkblue-btn"
            @click="submit_ner_model"
            style="padding: 10px 20px; float: right; margin-top: 18px"
            v-show="statements.length > 0"
          >
            Save
          </button> -->
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
        </div>
      </div>
      <div>
        <div class="popoverDiv">
          <select
            class="form-control"
            v-show="word_selected == true"
            v-model="drop_down_select"
            @change="entity_selected(drop_down_select)"
            style="height: 25px; padding-left: 10px; padding-right: 10px"
          >
            <option
              v-for="(word, index2) in word_info"
              :key="index2"
              :value="word"
            >
              {{ word }}&nbsp;
            </option>
          </select>
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
                <h3>{{tlt('ner_model_ner_tag_header')}}</h3>
              </div>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <img src="/img/close-icn.png" alt />
              </button>
              <form @submit="comma_to_list">
                <div class="form-group">
                  <label
                    >{{tlt('ner_model_ner_tag_text')}}</label
                  >
                  <input
                    class="form-control"
                    :placeholder="tlt('enter_entities')"
                    v-model="entities_list_string"
                    id="entity_list_id"
                  />
                </div>
                <label v-if="word_info.length > 0">{{tlt('ner_model_add_tags_label')}}</label>
                <br />
                <div>
                  <div
                    class="bootstrap-tagsinput"
                    v-for="(word, index) in word_info"
                    :key="index"
                    style="margin-bottom: 10px"
                  >
                    <span class="badge">
                      {{ word }}
                      <span
                        data-role="remove"
                        @click="delete_tags(index)"
                      ></span>
                    </span>
                  </div>
                </div>
                <div class="btn-wrap text-right">
                  <button
                    type="button"
                    class="btn btn-link"
                    data-dismiss="modal"
                  >
                    {{tlt('ner_page_add_ner_tag_cancel_btn')}}
                  </button>
                  <button type="submit" class="darkblue-btn" id="save_ner">
                    {{tlt('ner_page_save_btn')}}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade dash-modal"
        id="editstatementmodal"
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
                <h3>{{tlt('ner_model_edit_statement_label')}}</h3>
              </div>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <img src="/img/close-icn.png" alt />
              </button>
              <!-- <form class="upload-form"> -->
                <div class="card-body" style="padding: 0px 10px;">
                  <!-- <h6>
                    Add NER tags first, then add a new statement
                  </h6> -->
                  <br />
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="edit_statement"
                      class="form-control"
                      :placeholder="tlt('enter_statement')"
                    />
                  </div>
                  <div class="btn-wrap text-right">
                    <button
                      type="button"
                      class="btn btn-link"
                      data-dismiss="modal"
                      @click="empty_variable"
                    >
                      {{tlt('ner_page_edit_ner_cancel_btn')}}
                    </button>
                    <button @click="edit_statements" id="edit_btn" class="darkblue-btn">{{tlt('ner_page_edit_submit_btn')}}</button>
                  </div>
                </div>
              <!-- </form> -->
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade dash-modal"
        id="statementmodal"
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
                <h3>{{tlt('ner_model_add_statement_label')}}</h3>
              </div>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <img src="/img/close-icn.png" alt />
              </button>
              <!-- <form class="upload-form"> -->
                <div class="card-body" style="padding: 0px 10px;">
                  <h6>
                    {{tlt('ner_model_add_statement_text')}}
                  </h6>
                  <br />
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="new_statement"
                      class="form-control"
                      :placeholder="tlt('enter_statement')"
                    />
                  </div>
                  <div class="btn-wrap text-right" style="border: none; padding: 0px;">
                    <button
                      type="button"
                      class="btn btn-link"
                      data-dismiss="modal"
                      @click="empty_variable"
                    >
                      {{tlt('ner_page_add_statement_cancel_btn')}}
                    </button>
                    <button @click="add_statement" id="add_statement_btn" class="darkblue-btn">{{tlt('ner_page_add_btn')}}</button>
                  </div>
                </div>
              <!-- </form> -->
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade dash-modal"
        id="upload_csv_file"
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
                <h3>{{tlt('ner_model_upload_file_label')}}</h3>
              </div>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <img src="/img/close-icn.png" alt />
              </button>
              <form class="upload-form" >
                <div class="card-body">
                  <h6>
                    {{tlt('ner_model_upload_file_text')}}
                  </h6>
                  <br />
                  <div class="form-group">
                    <div class="custom-file">
                      <input
                        type="file"
                        accept=".csv"
                        @change="fileinput"
                        class="custom-file-input"
                        id="inputGroupFile01"
                        aria-describedby="inputGroupFileAddon01"
                      />
                      <label
                        style="height: 100%;font-weight: 400; line-height: 15px; padding: 9px"
                        class="custom-file-label form-control"
                        for="file"
                        >{{ file_label }}</label
                      >
                    </div>
                  </div>
                  <div class="btn-wrap text-right">
                    <a href="#" @click="download_sample">
                      {{tlt('ner_model_download_sample_ner_label')}}
                      <i class="fa fa-spinner fa-spin" v-show="spinnerOn"></i>
                    </a>
                    <button
                      type="button"
                      class="btn btn-link"
                      data-dismiss="modal"
                    >
                      {{tlt('ner_page_upload_file_cancel_btn')}}
                    </button>
                    <button type="submit" id="upload_btn" class="darkblue-btn" @click="send_csv">{{tlt('ner_page_file_submit_btn')}}</button>
                  </div>
                  <!-- <button type="submit" class="darkblue-btn">Submit</button> -->
                </div>
              </form>
            </div>
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
import { freeze_portal,show_subscription_expired_swal , close_modal} from "@/portal/mixins";
import swal from 'sweetalert2';

export default {
  name: "NerTrainingPage",
  mixins: [
    freeze_portal,
    show_subscription_expired_swal,
    close_modal
  ],
  data() {
    return {
      sub_entities: {
        start: 0,
        end: 0,
        value: "",
        entity: "",
      },
      page_no: 1,
      per_page: 15,
      total_pages: null,
      page_array: [],
      pageno: "",
      number_of_rows: null,
      drop_down_select: "",
      word_selected: false,
      highlighted_text: "",
      statements: [],
      selected_statement: "",
      statement_array: [],
      master_statements_list: [],
      current_page: 1,
      done_entities: [],
      entities_list: [],
      entities_list_string: "",
      file_label: "Choose file",
      csv_file: "",
      spinnerOn: false,
      word_info: [],
      checked_list: [],
      buffer_word_list: [],
      delete_ner_tags: [],
      role: this.$session.get("UserInformation").role,
      company_name: this.$session.get("UserInformation").company_name,
      notTrainedQuestions: [],
      info_icon: require("@/portal/assets/img/info_icon.svg"),
      new_statement: "",
      edit_statement: "",
      want_status: true,
      ner_model_inprogress: false,
      current_selected: null,
      search_name: "",
      isVisibleSearchClear: false,
      disable_btn_expired:false
    };
  },
  components: {},
  created() {
    this.load_ner_statements();
    // axios
    //   .get(api_calls.get_ner_tag(), {
    //     params: {
    //       companyname: this.$session.get("UserInformation").company_name,
    //       companyid: this.$session.get("UserInformation").company_id,
    //       email: this.$session.get("UserInformation").email,
    //       license_key: this.$session.get("UserInformation").license_key,
    //       token: this.$session.get("UserInformation").tokens,
    //       subscription: this.$session.get("UserInformation").subscription,
    //     },
    //     headers: {
    //       Authorization: `Bearer ${this.$session.get("at")}`,
    //     },
    //   })
    //   .then((response) => {
    //     if (response.data !== null) {
    //       this.word_info = response.data;
    //       this.buffer_word_list = response.data;
    //     }
    //   });
      this.check_ner_model_status();
    // axios
    //   .post(
    //     api_calls.load_tag_url(),
    //     {
    //       companyid: this.$session.get("UserInformation").company_id,
    //       companyname: this.$session.get("UserInformation").company_name,
    //       email: this.$session.get("UserInformation").email,
    //       license_key: this.$session.get("UserInformation").license_key,
    //       token: this.$session.get("UserInformation").tokens,
    //       get_tagged_statements: true,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${this.$session.get("at")}`,
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     if (response.data !== null) {
    //       if (response.data.MSG == "Ner Tag Completed") {
    //         // this.load_statements(response.data.Response);
    //         this.notTrainedQuestions = response.data.Response;
    //       }
    //       // else if (response.data.MSG == "Assign Ner Tag") {
    //       //   this.spinnerOn = false;
    //       // } else if (response.data.MSG == "No Data Available") {
    //       //   this.spinnerOn = false;
    //       // } else if (response.data == "Internal Server Error") {
    //       //   this.spinnerOn = false;
    //       // }
    //     }
    //   })
    //   .catch((e) => {
    //     this.spinnerOn = false;
    //     if (
    //       e.response.status === 410 ||
    //       e.response.status === 440 ||
    //       e.response.status === 409
    //     ) {
    //       this.$root.$emit("Session_Expired", e.response.data);
    //     }
    //   });
  },
  mounted() {
    setTimeout(() => {
      this.freeze_portal();
    }, 1000);
    this.$root.$on("NerTrainingPageDisabled", (data) =>{
      if(data===true){
        this.disable_btn_expired = true;
      }
    })
    $('[data-toggle="popover"]')
      .popover({
        html: true,
        content: $("#popover_content"),
      })
      .on("show.bs.popover", function () {
        $("#popover_content").addClass("d-block");
      })
      .on("shown.bs.popover", function () {})
      .on("hide.bs.popover", function () {
        $("#popover_content").addClass("d-none");
      });
    $("#popover_content").css("zIndex", 9999);
    var vm = this;
    $("#selectall").click(function () {
      if ($(this).is(":checked")) {
        $("input:checkbox").prop("checked", true);
      } else {
        vm.checked_list = [];
        $("input:checkbox").prop("checked", false);
      }
    });
      this.$root.$on("send_model_status", data =>{
      if (data == true){
        this.check_ner_model_status();
      }
    });
   
  },
  watch: {
    search_name() {
      if (this.search_name === "") {
        this.load_ner_statements();
        this.isVisibleSearchClear = false;
      } else if (this.search_name !== "") {
        this.isVisibleSearchClear = true;
      }
    },
    
    

  },
  methods: {
    upload_ner_file(){
      if(!this.disable_btn_expired){
        $("#upload_csv_file").modal('show')
      } else {
        this.show_subscription_expired_swal();
      }
    },
    add_ner_statemnent(){
      if(!this.disable_btn_expired){
        $("#statementmodal").modal('show')
      } else {
        this.show_subscription_expired_swal();
      }
    },
    add_ner_tag(){
      if(!this.disable_btn_expired){
        $("#exampleModalCenter").modal('show')
      } else {
        this.show_subscription_expired_swal();
      }
    },
    load_ner_statements(){
      $("input:checkbox").prop("checked", false);
      this.checked_list = [];
      this.spinnerOn = true;
      axios
        .get(api_calls.get_ner_tag(), {
          params: {
            company_name: this.$session.get("UserInformation").company_name,
            company_id: this.$session.get("UserInformation").company_id,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            subscription: this.$session.get("UserInformation").subscription,
          },
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          },
        })
        .then((response) => {
          this.spinnerOn = false;
          if (this.api_status_code.DATA_AVAILABLE.MSG_CODE == response.data.message.MSG_CODE) {
            this.word_info = response.data.data;
            this.buffer_word_list = response.data.data;
          }
          else if(this.api_status_code.NER_TAGS_NOT_FOUND.MSG_CODE == response.data.message.MSG_CODE){
            swal.fire({
              type:'warning',
              text:'No ner tags found',
              toast:true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2500
            });
            this.word_info = [];
            this.buffer_word_list = [];
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
      this.spinnerOn = true;
      axios
      .post(
        api_calls.load_tag_url(),
        {
          company_id: this.$session.get("UserInformation").company_id,
          company_name: this.$session.get("UserInformation").company_name,
          email: this.$session.get("UserInformation").email,
          license_key: this.$session.get("UserInformation").license_key,
          token: this.$session.get("UserInformation").tokens,
          get_all_ner_statements: true,
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
          if (this.api_status_code.DATA_AVAILABLE.MSG_CODE == response.data.message.MSG_CODE) {
            this.load_statements(response.data.data.response);
            this.number_of_rows = response.data.pagination.total_data;
            this.total_pages = response.data.pagination.total_page;
            this.setpagination(this.page_no);
            this.notTrainedQuestions = response.data.data.response;
          } else if (this.api_status_code.NER_TAG_ASSIGN.MSG_CODE == response.data.message.MSG_CODE) {
            this.spinnerOn = false;
          } else if (this.api_status_code.EMPTY_DATA.MSG_CODE ==  response.data.message.MSG_CODE) {
            this.spinnerOn = false;
          } else if (this.api_status_code.EMPTY_DATA.MSG_CODE == response.data.message.MSG_CODE) {
            this.spinnerOn = false;
            swal.fire({
              type:'warning',
              text:'No Data Available',
              toast:true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2500
            });
            this.master_statements_list = [];
          this.statements = [];
          } else if (this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE == response.data.message.MSG_CODE) {
            swal({
              type: "error",
              title: "Error",
              text: "Internal server error",
              timer: 2500,
            })
          } else {
            this.spinnerOn = false;
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
    },
    empty_variable(){
      this.new_statement = "";
      this.edit_statement = "";
      this.current_selected = null;
      this.entities_list_string = "";
    },
    assign_variable(index){
      this.edit_statement = this.statements[index].Statement;
      this.current_selected = this.statements[index];
    },
    check_ner_model_status(){
    this.model_status = this.$session.get("ModelStatus");
    if (this.model_status == "No Failure"){
    this.ner_model_inprogress = false;
    }
    else if (Boolean(this.model_status.ner_model) === true){
     if(this.model_status.ner_model == "InProgress"){
       this.ner_model_inprogress = true;
     }
     else{
       this.ner_model_inprogress = false;
     }
    }
    else{
      this.ner_model_inprogress = false; 
    }
    },
    show_model_progress(index){
      if(this.ner_model_inprogress == true){
         if (index == 'style'){
            return "cursor: not-allowed";
          }
          else if(index == 'title'){
              return this.tlt('ner_page_training_progress_msg');
          }
      }
      else{
        return null;
      }
    },
    add_statement() {
   
      if (this.new_statement.trim() == "") {
        Swal({
          text: this.tlt('ner_page_enter_statement_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      } else {
        this.spinnerOn = true;
        axios
          .post(api_calls.add_ner_statement(), {
            company_id: this.$session.get("UserInformation").company_id,
            company_name: this.$session.get("UserInformation").company_name,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            new_statement: this.new_statement,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          })
          .then((response) => {
            this.spinnerOn = false;
            if (this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE == response.data.message.MSG_CODE) {
              Swal({
                type: "success",
                text: this.tlt('ner_page_statement_added_msg'),
                timer: 2500,
              }).then((result) => {
     
                this.empty_variable();
                this.load_ner_statements();
                // this.page_require(1);
                // this.$router.go();
                
              });
            } else if (this.api_status_code.ADD_STATEMENT_ERROR.MSG_CODE == response.data.message.MSG_CODE) {
              Swal({
                type: "error",
                text: this.tlt('ner_page_wrong_msg'),
                timer: 2500,
              });
            }else if (response.data.Msg == "Statement already exists") {
              Swal({
                type: "error",
                text: this.tlt('ner_page_statement_already_exists_msg'),
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
            }
          });
          this.close_modal('add_statement_btn')
      }
    },
    edit_statements() {
      if(this.edit_statement == this.current_selected.Statement){
        Swal.fire({
          text: this.tlt('ner_page_modify_statement_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
      }
      else {
        var final_statements_list = [];
        // console.log("statement index before---", this.current_selected);
        var valid_statement = Object.assign({}, this.current_selected);
        var key = valid_statement.key;
        valid_statement.IsTagCompleted = "NO";
        valid_statement.Statement = this.edit_statement;
        valid_statement.Tag = [];
        delete valid_statement.key;
        delete valid_statement.selected_list;
        delete valid_statement.words_list;
        final_statements_list.push({
          [key]: valid_statement,
        });
        this.spinnerOn = true;
        axios
          .post(
            api_calls.tag_sentences_url(),
            {
              company_id: this.$session.get("UserInformation").company_id,
              company_name: this.$session.get("UserInformation").company_name,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              ner_tag_statement: final_statements_list,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            this.spinnerOn = false;
            if (this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE == response.data.message.MSG_CODE) {
              Swal({
                text: this.tlt('ner_page_tag_submit_msg'),
                // toast: true,
                // position: "top-end",
                type: "success",
                showConfirmButton: true,
                timer: 5500,
              });
                this.empty_variable();
                this.load_ner_statements();
                // this.page_require(1);
                // this.$router.go();
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
          console.log("---")
          this.close_modal('edit_btn')
      }
    },
    delete_tags(index) {
      Swal.fire({
        title: this.tlt('ner_page_swal_alert_msg'),
        text: this.tlt('ner_page_swal_revert_msg'),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.tlt('ner_page_swal_delete_msg'),
      }).then((result) => {
        if (result.value) {
          $("#exampleModalCenter").modal("hide");
          this.spinnerOn = true;
          this.delete_ner_tags.push(this.word_info[index]);
          this.word_info.splice(index, 1);
          axios
            .post(
              api_calls.delete_ner_tags(),
              {
                company_id: this.$session.get("UserInformation").company_id,
                company_name: this.$session.get("UserInformation").company_name,
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                tag_name: this.delete_ner_tags,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.spinnerOn = false;
              if (this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE == response.data.message.MSG_CODE) {
                toastr.success(this.tlt('ner_page_tag_removed_msg'));
                // setTimeout(() => {
                  this.delete_ner_tags = [];
                  // this.$router.go();
                  this.load_ner_statements();
                // }, 500);
              } else {
                Swal({
                  title: response.data.message.MSG_CODE,
                  text: response.data.message.MSG,
                  showCancelButton: false,
                  showConfirmButton: false,
                  type: "error"
                })
                toastr.error(this.tlt('ner_page_some_error_msg1'));
                this.delete_ner_tags = [];
              }
            })
            .catch((e) => {
              this.spinnerOn = false;
              toastr.error(this.tlt('ner_page_some_error_msg2'));
              this.delete_ner_tags = [];
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
    start_tagging() {
      this.spinnerOn = true;
      axios
        .post(
          api_calls.load_tag_url(),
          {
            company_id: this.$session.get("UserInformation").company_id,
            company_name: this.$session.get("UserInformation").company_name,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            getTag: false,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          this.spinnerOn = false;
          if (this.api_status_code.NER_TAG_STATUS.MSG_CODE == response.data.message.MSG_CODE) {
            toastr.error(this.tlt('ner_page_tags_alert_msg'));
            this.spinnerOn = false;
          } else if (this.api_status_code.NER_TAG_STATUS.MSG_CODE == response.data.message.MSG_CODE) {
            // setTimeout(() => {
              // this.$router.go();
              this.load_ner_statements();
            // }, 1500);
          } else if (this.api_status_code.EMPTY_DATA.MSG_CODE == response.data.message.MSG_CODE) {
            toastr.error(
              this.tlt('ner_page_tags_alert_msg1')
            );
            this.spinnerOn = false;
          } else if (this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE == response.data.message.MSG_CODE) {
            toastr.error(
              this.tlt('ner_page_tags_alert_msg3')
            );
            this.spinnerOn = false;
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
        if (this.search_name != "") {
          if (page == "...s") {
            this.page_no = Math.ceil((1 + this.page_no) / 2);
          } else if (page == "...l") {
            this.page_no = Math.ceil((this.total_pages + this.page_no) / 2);
          } else {
            this.page_no = page;
          }
          $("input:checkbox").prop("checked", false);
          this.spinnerOn = true;
          this.search_ner_statment_page_change();
        }
        else{
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
              api_calls.load_tag_url(),
              {
                company_id: this.$session.get("UserInformation").company_id,
                company_name: this.$session.get("UserInformation").company_name,
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                get_all_ner_statements: true,
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
              if (response.data !== null) {
                if (this.api_status_code.DATA_AVAILABLE.MSG_CODE == response.data.message.MSG_CODE) {
                  this.statements = [];
                  this.load_statements(response.data.data.response);
                  // this.number_of_rows = response.data.pagecount;
                  // this.total_pages = Math.ceil(this.number_of_rows / this.per_page);
                  this.setpagination(this.page_no);
                } else if (this.api_status_code.NER_TAG_ALL.MSG_CODE == response.data.message.MSG_CODE) {
                  this.statements = [];
                  this.load_statements(response.data.data.response);
                  // this.number_of_rows = response.data.pagecount;
                  // this.total_pages = Math.ceil(this.number_of_rows / this.per_page);
                  this.setpagination(this.page_no);
                  this.notTrainedQuestions = response.data.data.response;
                } else if (this.api_status_code.NER_TAG_ASSIGN.MSG_CODE == response.data.message.MSG_CODE) {
                  this.spinnerOn = false;
                } else if (this.api_status_code.EMPTY_DATA.MSG_CODE == response.data.message.MSG_CODE) {
                  this.spinnerOn = false;
                } else if (response.data == "Internal Server Error") {
                  this.spinnerOn = false;
                }
              }else {
                this.spinnerOn = false;
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
    clear_search_name() {
      this.search_name = "";
      this.page_require(1);
    },
    search_ner_statment() {
      if (this.search_name != ""){
        $("input:checkbox").prop("checked", false);
        this.checked_list = [];
        this.page_no = 1
        this.spinnerOn = true;
        axios
        .post(
          api_calls.load_tag_url(),
          {
            company_id: this.$session.get("UserInformation").company_id,
            company_name: this.$session.get("UserInformation").company_name,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            is_search: true,
            search_term: this.search_name,
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
          if (response.data !== null) {
            if(this.api_status_code.DATA_AVAILABLE.MSG_CODE == response.data.message.MSG_CODE){
              this.load_statements(response.data.data.response);
              // this.number_of_rows = response.data.pagecount;
              this.total_pages = response.data.pagination.total_page;
              this.setpagination(this.page_no);
            }
            else if (this.api_status_code.NER_TAG_ALL.MSG_CODE == response.data.message.MSG_CODE) {
              this.load_statements(response.data.data.response);
              // this.number_of_rows = response.data.pagecount;
              this.total_pages = response.data.pagination.total_page;
              this.setpagination(this.page_no);
            } else if (this.api_status_code.NER_TAG_ASSIGN.MSG_CODE == response.data.message.MSG_CODE) {
              this.spinnerOn = false;
            } else if (this.api_status_code.EMPTY_DATA.MSG_CODE == response.data.message.MSG_CODE) {
                Swal.fire({
                  position:"top-end",
                  text: this.tlt('ner_page_no_ner_msg'),
                  toast: true,
                  type: "warning",
                  showConfirmButton: false,
                  timer: 2500,
                });
              this.statements = [];
              this.total_pages = 1;
              this.setpagination(this.page_no);
              this.spinnerOn = false;
            } else if (this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE == response.data.message.MSG_CODE) {
              this.statements = [];
              this.total_pages = 1;
              this.setpagination(this.page_no);
              this.spinnerOn = false;
              Swal.fire({
                  text: "Internal Server Error",
                  type: "error",
                  showConfirmButton: false,
                  timer: 2500,
                });
            } 
          }else {
            this.spinnerOn = false;
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
      else {
        Swal({
          text: this.tlt('ner_page_search_alert_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;}
    },
    search_ner_statment_page_change() {
      if (this.search_name != ""){
        this.spinnerOn = true;
        axios
        .post(
          api_calls.load_tag_url(),
          {
            company_id: this.$session.get("UserInformation").company_id,
            company_name: this.$session.get("UserInformation").company_name,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            is_search: true,
            search_term: this.search_name,
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
          if (response.data !== null) {
            if (this.api_status_code.NER_TAG_ALL.MSG_CODE == response.data.message.MSG_CODE) {
              this.load_statements(response.data.Response);
              // this.number_of_rows = response.data.pagecount;
              this.total_pages = response.data.pagecount;
              this.setpagination(this.page_no);
            } else if (this.api_status_code.NER_TAG_ASSIGN.MSG_CODE == response.data.message.MSG_CODE) {
              this.spinnerOn = false;
            } else if (this.api_status_code.EMPTY_DATA.MSG_CODE == response.data.message.MSG_CODE) {
              this.statements = [];
              this.total_pages = 1;
              this.setpagination(this.page_no);
              this.spinnerOn = false;
            } else if (this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE == response.data.message.MSG_CODE) {
              this.statements = [];
              this.total_pages = 1;
              this.setpagination(this.page_no);
              this.spinnerOn = false;
            } 
          }else {
            this.spinnerOn = false;
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
      else {
        Swal({
          text: this.tlt('ner_page_search_alert_msg2'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;}
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
    load_statements(statements) {
      this.master_statements_list = [];
      this.statements = [];
      // console.log(this.statements);
      for (var i in statements) {
        var key = Object.keys(statements[i])[0];

        if (statements[i][key].IsTagCompleted != "YES") {
          var key = Object.keys(statements[i])[0];
          
          this.master_statements_list.push(statements[i][key]);

          this.master_statements_list[
            i
          ].words_list = this.master_statements_list[i].Statement.split(" ");

          this.master_statements_list[i].key = key;
        }
        if (statements[i][key].IsTagCompleted != "NO") {
          var key = Object.keys(statements[i])[0];
          this.master_statements_list.push(statements[i][key]);
          this.master_statements_list[
            i
          ].words_list = this.master_statements_list[i].Statement.split(" ");

          let desc = [];
          var values;
          var index;

          for (var a = 0; a < this.master_statements_list[i].Tag.length; a++) {
            if (this.master_statements_list[i].Tag[a] != "O") {
              var check = this.master_statements_list[i].Tag.indexOf(
                this.master_statements_list[i].Tag[a]
              );

              if (this.master_statements_list[i].Tag[a].includes("B-")) {
                // console.log("current", this.master_statements_list[i].Tag[a]);
                // console.log("next", this.master_statements_list[i].Tag[a + 1]);
                if (this.master_statements_list[i].Tag[a + 1] != undefined) {
                  if (
                    check < this.master_statements_list[i].Tag.length - 1 &&
                    this.master_statements_list[i].Tag[a + 1].includes("I-")
                  ) {
                    index = a;
                    // console.log("index", index);
                    values = this.master_statements_list[i].words_list[index];
                  } else {
                    values = null;
                    index = null;
                    index = a;
                    values = this.master_statements_list[i].words_list[index];
                    desc.push({
                      text: values,
                      word_type: this.master_statements_list[i].Tag[a].slice(2),
                    });
                    // //console.log(desc);
                  }
                } else {
                  values = null;
                  index = null;
                  index = a;
                  values = this.master_statements_list[i].words_list[index];
                  desc.push({
                    text: values,
                    word_type: this.master_statements_list[i].Tag[a].slice(2),
                  });
                }
              } else if (this.master_statements_list[i].Tag[a].includes("I-")) {
                var check = this.master_statements_list[i].Tag.indexOf(
                  this.master_statements_list[i].Tag[a]
                );
                index = a;
                if (this.master_statements_list[i].Tag[a + 1] != undefined) {
                  if (
                    this.master_statements_list[i].Tag[a + 1].includes("I-")
                  ) {
                    values =
                      values +
                      " " +
                      this.master_statements_list[i].words_list[index];
                  } else {
                    values =
                      values +
                      " " +
                      this.master_statements_list[i].words_list[index];
                    desc.push({
                      text: values,
                      word_type: this.master_statements_list[i].Tag[a].slice(2),
                    });
                    index = null;
                    values = null;
                  }
                } else {
                  values =
                    values +
                    " " +
                    this.master_statements_list[i].words_list[index];
                  desc.push({
                    text: values,
                    word_type: this.master_statements_list[i].Tag[a].slice(2),
                  });
                  index = null;
                  values = null;
                }
              }
            }
          }
          this.master_statements_list[i]["selected_list"] = desc;

          this.master_statements_list[i].key = key;
        }
      }
      for (let i = 0; i < this.master_statements_list.length; i++) {
        this.statements.push(this.master_statements_list[i]);
      }
      this.spinnerOn = false;
      //console.log(this.master_statements_list , "Mster statements loaded")
      //console.log(this.statements , " statements loaded")
    },
    load_popover(target) {
      $(".popoverDiv").css("display", "block");
      $(".popoverDiv").css("position", "absolute");
      $(".popoverDiv").css("left", target.clientX);
      $(".popoverDiv").css("top", target.clientY+ window.pageYOffset);
    },
    selected_text(index) {
      if (window.getSelection) {
        if (
          window.getSelection().toString() != "" &&
          window.getSelection().toString().split(" ").join("") != ""
        ) {
          this.highlighted_text = window.getSelection().toString().trim();
          this.word_selected = true;
          this.selected_statement = this.statements[index].Statement;
          this.load_popover(event);
        } else {
          this.highlighted_text = "";
          $(".popoverDiv").css("display", "none");
        }
      } else if (document.selection) {
        document.selection.createRange().text;
      }
    },
    update_statements(entity) {
      var words_list = entity.value.split(" ");
      var tags = [];
      for (var i in this.statements) {
        var master_words_list = this.statements[i].Statement.split(" ");
        if (this.statements[i].selected_list == undefined) {
          this.statements[i].selected_list = [];
        }
        if (this.statements[i].Tag.length == 0) {
          for (var j in master_words_list) {
            this.statements[i].Tag.push("");
          }
        }
        if (this.statements[i].Statement == this.selected_statement) {
          this.statements[i].IsTagCompleted = "NO";
          this.statements[i].selected_list.push({
            text: entity.value,
            word_type: entity.entity,
          });
          for (var j in master_words_list) {
            if (words_list.includes(master_words_list[j])) {
              var index = words_list.indexOf(master_words_list[j]);
              if (index == 0) {
                this.statements[i].Tag[j] = "B-" + entity.entity;
              } else {
                this.statements[i].Tag[j] = "I-" + entity.entity;
              }
            } else {
              if (this.statements[i].Tag[j] == "") {
                this.statements[i].Tag[j] = "O";
              }
            }
          }
        }
      }
    },
    entity(value1, value2) {
      for (var i in event.target.parentElement.children) {
        if (event.target.parentElement.children[i].style != undefined) {
          event.target.parentElement.children[i].style.backgroundColor = "";
          event.target.children[0].style.backgroundColor = "";
        }
      }
      if (event.target.style.backgroundColor == "yellow") {
        event.target.style.backgroundColor = "";
      } else {
        event.target.style.backgroundColor = "yellow";
        var flag = false;
        if (this.done_entities.length != 0) {
          for (var i = 0; i < this.done_entities.length; i++) {
            if (this.done_entities[i].value == value1) {
              flag = true;
            }
          }
        }
        if (flag == false) {
          this.word_selected = true;
          this.sub_entities.value = value1;
          this.statement_array = value2;
          var joint = this.statement_array.join();
          var a = joint.lastIndexOf(value1);
          var b = value1.length + a - 2;
          this.sub_entities.start = a;
          this.sub_entities.end = b;
        }
      }
    },
    save_statement(index) {
      if(this.statements[index].Tag.length == 0) {
        Swal({
          text: this.tlt('ner_page_add_tags_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      }else {
        var final_statements_list = [];
        var valid_statement = this.statements[index];
        // console.log("before---", this.statements[index]);
        var key = valid_statement.key;
        valid_statement.IsTagCompleted = "YES";
        delete valid_statement.key;
        delete valid_statement.selected_list;
        delete valid_statement.words_list;
        final_statements_list.push({
          [key]: valid_statement,
        });
        // console.log("singular final",final_statements_list);
        this.spinnerOn = true;
        axios
          .post(
            api_calls.tag_sentences_url(),
            {
              company_id: this.$session.get("UserInformation").company_id,
              company_name: this.$session.get("UserInformation").company_name,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              ner_tag_statement: final_statements_list,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            this.spinnerOn = false;
            if (this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE == response.data.message.MSG_CODE) {
              Swal({
                text: this.tlt('ner_page_tags_submit_msg'),
                // toast: true,
                // position: "top-end",
                type: "success",
                showConfirmButton: true,
                timer: 3500,
              });
              // this.page_require(1);
              this.load_ner_statements();
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
    },
    submit_ner_model() {
      this.spinnerOn = true;
      var final_statements_list = [];
      var valid_list = this.statements.filter((statement) => {
        return statement.IsTagCompleted != "";
      });
      if (valid_list.length == 0) {
        this.spinnerOn = false;
        toastr.error(
          this.tlt('ner_page_submit_alert_msg')
        );
      } else if (valid_list.length < 5 && this.statements.length > 5) {
        this.spinnerOn = false;
        toastr.error(
          this.tlt('ner_page_submit_alert_msg1')
        );
      } else {
        for (var i in valid_list) {
          var key = valid_list[i].key;
          delete valid_list[i].key;
          delete valid_list[i].selected_list;
          delete valid_list[i].words_list;
          final_statements_list.push({
            [key]: valid_list[i],
          });
        }
        // console.log(final_statements_list);
        if (window.getSelection().empty) {
          window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges) {
          window.getSelection().removeAllRanges();
        }
        // axios
        //   .post(
        //     api_calls.tag_sentences_url(),
        //     {
        //       companyid: this.$session.get("UserInformation").company_id,
        //       companyname: this.$session.get("UserInformation").company_name,
        //       email: this.$session.get("UserInformation").email,
        //       license_key: this.$session.get("UserInformation").license_key,
        //       token: this.$session.get("UserInformation").tokens,
        //       ner_tag_statement: final_statements_list,
        //     },
        //     {
        //       headers: {
        //         Authorization: `Bearer ${this.$session.get("at")}`,
        //       },
        //     }
        //   )
        //   .then((response) => {
        //     this.spinnerOn = false;
        //     if (response.data == "Query Executed Successfully") {
        //       toastr.success("All your tags have been submitted successfully.");
        //       setTimeout(() => {
        //         this.$router.go();
        //       }, 2000);
        //     } else if (response.data == "Internal Server Error") {
        //       toastr.error("Internal Server Error");
        //     }
        //     if (window.getSelection().empty) {
        //       window.getSelection().empty();
        //     } else if (window.getSelection().removeAllRanges) {
        //       window.getSelection().removeAllRanges();
        //     }
        //   })
        //   .catch(() => {
        //     this.spinnerOn = false;
        //     toastr.error("Internal Server Error");
        //   });
      }
    },
    remove_tag(index) {
      if(this.statements[index].Tag.length == 0) {
        Swal({
          text: this.tlt('ner_page_no_tags_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      }
      Swal.fire({
        title: this.tlt('ner_page_swal_msg'),
        text: this.tlt('ner_page_untag_statement_msg'),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.tlt('ner_page_swal_delete_msg'),
      }).then((result) => {
        // console.log(result);
        if (result.dismiss) {
          return;
        }
        this.statements[index].IsTagCompleted = "NO";
        this.statements[index].Tag = [];
        this.statements[index].selected_list = [];
        this.$set(this.statements, index, this.statements[index]);

        var final_statements_list = [];
        var valid_statement = this.statements[index];
        var key = valid_statement.key;
        delete valid_statement.key;
        delete valid_statement.selected_list;
        delete valid_statement.words_list;
        final_statements_list.push({
          [key]: valid_statement,
        });
        // console.log("singular final",final_statements_list);
        this.spinnerOn = true;
        axios
          .post(
            api_calls.tag_sentences_url(),
            {
              company_id: this.$session.get("UserInformation").company_id,
              company_name: this.$session.get("UserInformation").company_name,
              email: this.$session.get("UserInformation").email,
              license_key: this.$session.get("UserInformation").license_key,
              token: this.$session.get("UserInformation").tokens,
              ner_tag_statement: final_statements_list,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            this.spinnerOn = false;
            if (this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE == response.data.message.MSG_CODE) {
              Swal({
                text: this.tlt('ner_page_tag_removed_msg'),
                // toast: true,
                // position: "top-end",
                type: "success",
                showConfirmButton: true,
                timer: 3500,
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
      });
    },
    entity_selected(word) {
      if (this.highlighted_text != "") {
        this.sub_entities.value = this.highlighted_text;
      }
      var popover_id =
        event.target.parentElement.parentElement.parentElement.id;
      // this.word_selected = false;
      this.sub_entities.entity = this.drop_down_select;
      this.done_entities.push(this.sub_entities);
      $("#" + popover_id).popover("hide");
      $(".popoverDiv").css("display", "none");
      this.drop_down_select = "";
      this.highlighted_text = "";
      this.update_statements(this.sub_entities);
      this.sub_entities = {};
      if (window.getSelection().empty) {
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges) {
        window.getSelection().removeAllRanges();
      }
    },
    fileinput(e) {
      let files = e.target.files || e.dataTransfer.files;
      //console.log(files)
      if (files[0].size < 1000000) {
        if (
          files[0].name.includes("csv") ||
          files[0].name.includes("txt") ||
          files[0].name.includes("xls") ||
          files[0].type.includes("text")
        ) {
          //console.log(this.file_label)
          this.file_label = files[0].name;
          this.createCSV(files[0]);
          //console.log(this.file_label)
        }
      } else {
        toastr.error(this.tlt('ner_page_file_size_alert'));
      }
      if (!files.length) return;
    },
    createCSV(file, type) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.csv_file = e.target.result.split("base64")[1];
      };
      reader.readAsDataURL(file);
    },
    send_csv() {
      //console.log($("#inputGroupFile01").val())
      event.preventDefault();
      if ($("#inputGroupFile01").val() == '') {
        Swal.fire({
          title: this.tlt('ner_page_input_field_msg'),
          text: this.tlt('ner_page_upload_file_msg'),
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
      }else{
        this.spinnerOn = true;
        //console.log(this.file_label)
        axios
          .post(
            api_calls.upload_ner_file_url(),
            {
              company_name: this.$session.get("UserInformation").company_name,
              company_id: this.$session.get("UserInformation").company_id,
              email: this.$session.get("UserInformation").email,
              token: this.$session.get("UserInformation").tokens,
              license_key: this.$session.get("UserInformation").license_key,
              file_data: this.csv_file,
              file_name: this.file_label,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            this.spinnerOn = false;
            if (this.api_status_code.ERROR_UPLOAD.MSG_CODE == response.data.message.MSG_CODE) {
              toastr.error(this.tlt('ner_page_error_upload_alert'));
              this.file_label = "Choose file";
              this.csv_file = "";
              document.getElementById("inputGroupFile01").value="";
            } else if (this.api_status_code.NER_TAG_STATUS.MSG_CODE == response.data.message.MSG_CODE) {
              toastr.error(
                this.tlt('ner_page_tags_assign_msg')
              );
              this.file_label = "Choose file";
              this.csv_file = "";
              document.getElementById("inputGroupFile01").value="";
            } else if (this.api_status_code.INVALID_HEADING.MSG_CODE == response.data.message.MSG_CODE) {
              toastr.error(this.tlt('ner_page_invalid_header_msg'));
              this.file_label = "Choose file";
              this.csv_file = "";
              document.getElementById("inputGroupFile01").value="";
            } else if (this.api_status_code.FAILED_TO_ADD_TAGS.MSG_CODE == response.data.message.MSG_CODE) {
              // toastr.error("Unknown Tags found! Statements has been uploaded, Please tag the statements manually.")
             Swal({
                text: this.tlt('ner_page_tags_found_alert_msg'),
                type: "error",
                showConfirmButton: true,
                timer: 10000,
              });
              this.file_label = "Choose file";
              this.csv_file = "";
              document.getElementById("inputGroupFile01").value="";
              // setTimeout(() => {
                // this.$router.go();
                this.load_ner_statements();
              // }, 2500); 
            } else if (this.api_status_code.INCORRECT_FILE_FORMAT.MSG_CODE == response.data.message.MSG_CODE) {
              toastr.error(this.tlt('ner_page_file_format_msg'));
              this.file_label = "Choose file";
              this.csv_file = "";
              document.getElementById("inputGroupFile01").value="";
            } else if (this.api_status_code.INVALID_FILE_TYPE.MSG_CODE == response.data.message.MSG_CODE) {
              toastr.error(this.tlt('ner_page_file_type_msg'));
              this.file_label = "Choose file";
              this.csv_file = "";
              document.getElementById("inputGroupFile01").value="";
            } else if (this.api_status_code.FILE_UPLOAD.MSG_CODE == response.data.message.MSG_CODE) {
              toastr.success(this.tlt('ner_page_upload_success_alert_msg'));
             // setTimeout(() => {
                // this.$router.go();
                this.load_ner_statements();
              // }, 2500);
            } else if (this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE == response.data.message.MSG_CODE){
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                type: "info"
              })
            }
            else {
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                type: "error"
              })
            }
            // else if (response.data == "Internal Server Error") {
            //   this.file_label = "Choose file";
            //   this.csv_file = "";
            //   toastr.error(
            //     "Due to some internal server error, we were unable to process this request. Please try later."
            //   );
            // }
            $("#upload_csv_file").modal("hide");
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
          this.close_modal('upload_btn')
        }
    },
    comma_to_list() {
      event.preventDefault();
      if (this.entities_list_string == "") {
        Swal({
          text: this.tlt('ner_page_ner_tag_msg'),
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
      }
      this.entities_list = this.entities_list_string.split(",");
      if (this.entities_list_string != "") {
        $("#exampleModalCenter").modal("hide");
        this.spinnerOn = true;
        axios
          .post(
            api_calls.add_ner_tag(),
            {
              company_name: this.$session.get("UserInformation").company_name,
              company_id: this.$session.get("UserInformation").company_id,
              email: this.$session.get("UserInformation").email,
              token: this.$session.get("UserInformation").tokens,
              license_key: this.$session.get("UserInformation").license_key,
              taglist: this.entities_list,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            }
          )
          .then((response) => {
            this.spinnerOn = false;
            if (this.api_status_code.NER_TAG_ADD.MSG_CODE == response.data.message.MSG_CODE) {
              toastr.success(this.tlt('ner_page_tag_added_alert_msg'));
            } else if(this.api_status_code.UNSUCCESSFUL_DB_QUERY.MSG_CODE == response.data.message.MSG_CODE){
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                type: "error"
              })
            }
            else {
              Swal({
                title: response.data.message.MSG_CODE,
                text: response.data.message.MSG,
                showCancelButton: false,
                showConfirmButton: false,
                type: "error"
              })
            } 
            this.empty_variable();
          })
          .catch((e) => {
            this.spinnerOn = false;
            toastr.error(this.tlt('ner_page_some_error_alert2'));
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
      if (this.delete_ner_tags.length > 0) {
        // axios
        //   .post(api_calls.delete_ner_tags(), {
        //     companyid: this.$session.get("UserInformation").company_id,
        //     companyname: this.$session.get("UserInformation").company_name,
        //     email: this.$session.get("UserInformation").email,
        //     license_key: this.$session.get("UserInformation").license_key,
        //     token: this.$session.get("UserInformation").tokens,
        //     tag_name: this.delete_ner_tags,
        //   })
        //   .then((response) => {
        //     if (response.data.Msg == "Query Executed Successfully") {
        //       toastr.success("Your tag has been removed successfully.");
        //       setTimeout(() => {
        //         this.$router.go();
        //       }, 2500);
        //     }
        //   });
      } else {
        // setTimeout(() => {
          // this.$router.go();
          this.load_ner_statements();
        // }, 2500);
      }
    },
    delete_ner(index) {
      // console.log("statements length",this.statements.length);
      var delete_statement_list = [];
      var valid_list = this.statements.filter((statement) => {
        return statement.Statement == this.statements[index].Statement;
      });
      // console.log(valid_list);
      for (var i in valid_list) {
        var key = valid_list[i].key;
        delete valid_list[i].key;
        delete valid_list[i].selected_list;
        delete valid_list[i].words_list;
        delete_statement_list.push({
          [key]: valid_list[i],
        });
      }
      // console.log(delete_statement_list);
      Swal.fire({
        title: this.tlt('ner_swal_alert_msg'),
        text: this.tlt('ner_swal_revert_msg'),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.tlt('ner_swal_confirm_msg'),
      }).then((result) => {
        if (result.value) {
          this.spinnerOn = true;
          axios
            .post(
              api_calls.delete_ner(),
              {
                company_id: this.$session.get("UserInformation").company_id,
                company_name: this.$session.get("UserInformation").company_name,
                license_key: this.$session.get("UserInformation").license_key,
                email: this.$session.get("UserInformation").email,
                token: this.$session.get("UserInformation").tokens,
                ner_tag_statment: delete_statement_list,
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              }
            )
            .then((response) => {
              this.spinnerOn = false;
              if (this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE == response.data.message.MSG_CODE) {
                // toastr.success("Your NER tag deleted successfully");
                Swal({
                    text: this.tlt('ner_tag_delete_msg'),
                    toast: true,
                    position: "top-end",
                    type: "success",
                    showConfirmButton: false,
                    timer: 5500,
                  });
                if((this.statements.length === 1 && 
                  delete_statement_list.length === 1) &&
                  this.page_no > 1){
                    this.page_no = this.page_no - 1;
                }
                this.clear_fields();
                // setTimeout(() => {
                  // this.$router.go();
                  this.load_ner_statements();
                // }, 1500);
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
      });
    },
    selected_statements(index) {
      if (index == "all") {
        this.checked_list = [];
        var role_length = this.statements.length;
        for (var i = 0; i < role_length; i++) {
          this.checked_list.push(this.statements[i]);
        }
        //console.log(this.checked_list)
      } else {
        if (event.target.checked == true) {
          if (!this.checked_list.includes(index)) {
            this.checked_list.push(this.statements[index]);
          }
        } else if (event.target.checked == false) {
          var selectall = document.querySelector("#selectall");
          if (selectall.checked == true) {
            selectall.checked = false;
          }
          var temp = this.checked_list.filter((role)=> {
            return role !== this.statements[index];
          });
          this.checked_list = temp;
        }
      }
    },
    delete_ner_multiple() {
      // console.log(this.statements,"statements in delete function")
      // console.log(this.master_statements_list,"Master statements in delete function")
      
      var num = this.checked_list.length;
      var multiple_delete_statement_list = [];
      if (this.checked_list.length == 0) {
        Swal.fire({
          title: this.tlt('ner_no_statement_alert_msg'),
          text: "",
          type: "error",
          timer: 2000,
        });
      } else if (this.checked_list.length > 0) {
        let dlt_list=[];
        for (var i in this.checked_list) {
          // var valid_list = this.statements.filter((statement) => {

            
            // return statement.Statement == this.checked_list[i].Statement;
          // });
          
          // console.log(valid_list,"list")
          
          // console.log(valid_list[0],"list")
          var key = this.checked_list[i].key;
          dlt_list.push(key)
          

          multiple_delete_statement_list.push({ [key]: this.checked_list[i] });
     
          
        }
        Swal.fire({
          title: this.tlt('ner_swal_alert_msg2'),
          text: this.tlt('ner_swal_revert_msg2'),
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: this.tlt('ner_swal_confirm_msg2'),
        }).then((result) => {
          if (result.value) {
            this.spinnerOn = true;
            axios
              .post(
                api_calls.delete_ner(),
                {
                  company_id: this.$session.get("UserInformation").company_id,
                  company_name: this.$session.get("UserInformation")
                    .company_name,
                  license_key: this.$session.get("UserInformation").license_key,
                  email: this.$session.get("UserInformation").email,
                  token: this.$session.get("UserInformation").tokens,
                  ner_tag_statment: multiple_delete_statement_list,
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.$session.get("at")}`,
                  },
                }
              )
              .then((response) => {
                this.spinnerOn = false;
                if (this.api_status_code.SUCCESSFUL_DB_QUERY.MSG_CODE == response.data.message.MSG_CODE) {
                  Swal({
                    text: this.tlt('ner_tag_delete_msg2'),
                    toast: true,
                    position: "top-end",
                    type: "success",
                    showConfirmButton: false,
                    timer: 5500,
                  });
                  if(multiple_delete_statement_list.length === this.statements.length && 
                    this.page_no >1){
                      this.page_no = this.page_no - 1;
                  }
                  this.clear_fields();
                  // setTimeout(() => {
                    // this.$router.go();
                    //console.log("RANNNN")
                    this.load_ner_statements();
                  // }, 1500);
                } else {
                  this.clear_fields();
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
        });
      }
    },
    train_ner_model() {
      if(!this.disable_btn_expired){
      if (this.notTrainedQuestions.length > 0) {
        Swal.fire({
          title: this.tlt('ner_setup_translate_msg'),
          text: this.tlt('ner_training_time_msg'),
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: this.tlt('ner_train_entity_model_msg'),
          cancelButtonText: this.tlt('ner_go_back_msg'),
        }).then((result) => {
          if (result.value) {
            // if (this.statements.length > 0) {
            // axios
            //   .post(api_calls.notify_superadmin_url(), {
            //     companyname: this.companyname,
            //     companyid: this.companyid,
            //     notify_type: "NerModel",
            //     email: this.$session.get("UserInformation").email,
            //     token: this.$session.get("UserInformation").tokens,
            //     license_key: this.$session.get("UserInformation").license_key,
            //     subject: "Notification to train the ner model",
            //     body:
            //       this.companyname +
            //       "has requested to train the ner model of entities.",
            //   })
            //   .then((response) => {
            //     alert(response.data.Msg);
            //     if (response.data.Msg == "A mail has been sent to your email") {
            //       toastr.success(
            //         "Your Ner  model is successfully scheduled for further training."
            //       );
            //       this.new_questions = 0;
            //     }
            //   });
            axios
              .post(api_calls.train_ner_models(), {
                company_name: this.$session.get("UserInformation").company_name,
                company_id: this.$session.get("UserInformation").company_id,
                email: this.$session.get("UserInformation").email,
                license_key: this.$session.get("UserInformation").license_key,
                token: this.$session.get("UserInformation").tokens,
                subscription: this.$session.get("UserInformation").subscription,
                company_details: {
                  company_name: this.$session.get("UserInformation")
                    .company_name,
                  company_id: this.$session.get("UserInformation").company_id,
                },
                // epochs: 100,
                // batch_size: 64
              })
              .then((response) => {
                this.want_status = true;
                this.$root.$emit("want_model_status",this.want_status);
                this.check_ner_model_status();
                if (response.data.message.MSG_CODE === 20000111) {
                  toastr.success(response.data.message.MSG);
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
                toastr.error(this.tlt('ner_internal_server_alert2'));
                if (
                  e.response.status === 410 ||
                  e.response.status === 440 ||
                  e.response.status === 409
                ) {
                  this.$root.$emit("Session_Expired", e.response.data);
                }
              });
            // } else {
            //   toastr.error("There are no tags to train. Please add some tags and");
            // }
          }
        });
      } else {
        toastr.error(
          this.tlt('ner_no_tags_train_msg')
        );
      }}else{
        this.show_subscription_expired_swal();
      }
    },
    clear_fields() {
      this.word_info = this.buffer_word_list;
      this.entities_list_string = "";
      this.checked_list = [];
    },
    download_sample() {
      // console.log(this.companyname);
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
          sample_file: "ner",
        },
        headers: {
          Authorization: `Bearer ${this.$session.get("at")}`,
        },
      })
        .then((response) => {
          this.spinnerOn = false;
          if (response.data.message === "Not able to download file") {
            Swal.fire({
              title: this.tlt('ner_download_sample_alert'),
              type: "error",
              timer: 2500,
            });
          } else {
            var url = window.URL.createObjectURL(new Blob([response.data]));
            var link = document.createElement("a");
            link.href = url;
            // console.log(this.companyname)
            link.setAttribute("download", this.company_name + "NerFile.csv");
            document.body.appendChild(link);
            link.click();
          }
        })
        .catch((e) => {
          this.spinnerOn = false;
          Swal.fire({
            title: this.tlt('ner_download_sample_alert2'),
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
  },
};
</script>
<style scoped>
.fa-pulse {
  animation: a 4s infinite steps(8);
}
.arrow-up {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;

  border-bottom: 5px solid black;
}
.popoverDiv {
  display: none;
  width: 200px;
  z-index: 101;
  background-color: #fff;
  border: 3px solid #666;
  padding: 12px 12px 12px 12px;
  border-radius: 0px 0px 0px 0px;
}
.tags-list {
  background-color: #283879;
  color: #fff;
  margin-left: 3%;
  width: auto;
  border-radius: 5px;
  flex: auto;
}
.disabled_btn{
  pointer-events: none;
  opacity: 0.5;

  
}

</style>

</style>
