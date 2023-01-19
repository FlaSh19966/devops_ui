<template>
  <div>
    <div class="dash-cont">
      <div
        class="spinner"
        id="spinner"
        v-show="spinnerOn"
        style="z-index:100"
      ></div>
      <div class="container-fluid">
        <div class="card dash-card">
          <div class="card-header d-block d-sm-flex flex-wrap justify-content-between">
          <h4 class="mb-sm-0">Unanswered Questions</h4>
          </div>
          <div class="card-body" style="padding:0">
            <!-- <div class="table table-box">
              <div class="table-responsive"> -->
              <div v-if="questions.length == 0" class="card questions-card mt-2 mt-2 ml-3 mr-3 text-center d-flex">
                <div>
                No Record Found. Please Go to  <em style="cursor:pointer" @click="$router.push({name: 'Business Analytics'})"> Search </em> to Start  Searching
                </div>
              </div>  
              <div v-for="(question,index) in questions" :key="index" class="card questions-card mt-2 mt-2 ml-3 mr-3">
                <div>
                 <span @click="questions[index].show_mappings = !questions[index].show_mappings" style="cursor:pointer;margin-bottom:0"> {{ question.search_string }} </span>
                  <i
                  style="cursor:pointer;margin-left:auto;float:right;color:#ec2525"
                  class="fa fa-trash"
                  aria-hidden="true"
                  @click="delete_unanswered_question(index)"
                ></i>
                  <!-- {{ question.show_mappings }} -->
                </div>
                <transition name="fade" mode="out-in">
                   <!-- <div class="mt-3"> -->
                  <div class="mt-3" v-show="question.show_mappings">
                    <div class="d-flex">
                    <!-- <button class="btn btn-primary mb-2" @click="tag_question(index)"> Change </button> -->
                      <!-- {{question.entity_suggestion_map}} -->
                      <table style="width:100%;text-align:center">
                        <tr>
                          <td style="padding-left:1rem" class="text-center" v-for="(current_entity,index) in question.entity_suggestion_map" :key="index">
                            {{ current_entity.entity.value }}
                          </td>
                        </tr>
                        <tr>
                          <td v-for="(entity, index) in question.entity_suggestion_map" :key="index">
                            <div v-if="entity.suggestion.type != 'input'">
                              <span v-if="entity.suggestion.type == 'attribute' " v-html="attribute_svg"> </span>
                              <span v-if="entity.suggestion.type == 'value' " v-html="value_svg"> </span>
                              <span v-if="entity.suggestion.type == 'metric' " v-html="metrics_svg"> </span>
                              <span v-if="entity.suggestion.type == 'keyword' " v-html="keyword_svg"> </span>
                                {{entity.entity.value}}
                              
                            </div>
                            <div v-else style="padding-left:1rem" class="text-center">
                              -
                            </div>  
                          </td>
                        </tr>
                      </table>
                      <a
                        @click="tag_question(index)"
                        class="ml-2"
                        style="margin: 0 0 10px;padding: 0 0 10px; cursor:pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15.392"
                          height="15.392"
                          viewBox="0 0 15.392 15.392"
                        >
                          <path
                            id="square-edit-outline"
                            d="M4.71,3A1.7,1.7,0,0,0,3,4.71V16.682a1.71,1.71,0,0,0,1.71,1.71H16.682a1.71,1.71,0,0,0,1.71-1.71V10.7h-1.71v5.986H4.71V4.71H10.7V3H4.71m10.928.855a.591.591,0,0,0-.41.171L14.185,5.061,16.322,7.2l1.043-1.035a.578.578,0,0,0,0-.812L16.04,4.026a.571.571,0,0,0-.4-.171M13.578,5.668l-6.3,6.311v2.138H9.413l6.3-6.311Z"
                            transform="translate(-3 -3)"
                            fill="#9499ae"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </transition>
              </div>

                <!-- <table class="table">
                  <thead>
                    <tr>
                      <th class="text-left" style="width:40%">
                        Unanswered Questions
                      </th>
                      <th>Settings</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(question, index) in questions" :key="index">
                      <td class="text-left">{{ question.search_string }}</td>
                      <td class="text-center">
                        <i
                          class="fa fa-cog"
                          aria-hidden="true"
                          @click="tag_question(index)"
                          style="cursor:pointer"
                        ></i>
                      </td>
                    </tr>
                  </tbody>
                </table> -->
                
              <!-- </div>
            </div> -->
          </div>
        </div>
      </div>
      <div
        id="myModal"
        class="modal fade"
        role="dialog"
        v-if="show_question_modal"
        data-backdrop="static"
        data-keyboard="false"
      >
        <div class="modal-dialog modal-lg">
          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Teach Me Your Language</h4>
              <button type="button" class="close" data-dismiss="modal" @click="close_current_question_modal">
                &times;
              </button>
            </div>
            <div class="modal-body">
              <!-- <div
                v-if="phrase_selected.length > 0"
                style="background-color:#E6E6E6"
              >
                {{ current_unanswered_question_selected.original_string }}
              </div> -->

              <!-- <div class="text-center d-flex" @mouseup="selected_text"> -->
              <div class="text-center">
                <!-- <div v-for="(string, index) in current_tags" :key="index">
                  <span> {{string}} </span>
                </div> -->
                <h4 class="text-center"  @mouseup="selected_text">{{current_unanswered_question_selected.search_string}}</h4>
              </div>
              <!-- <div>
                <p
                  v-for="(entity,
                  index) in current_unanswered_question_selected.entity_suggestion_map"
                  :key="index"
                >
                  {{ entity.entity.value }}
                  ---------------
                  {{ entity.suggestion.type }} ->>
                  {{ entity.suggestion.value }}
                </p>
              </div> -->
              <!-- <div>
                <table>
                  <tr>
                    <td v-for="(phrase, index) in phrase_selected" :key="index">
                      {{ phrase }}
                    </td>
                  </tr>
                </table>

              </div> -->
              <!-- <p style="margin-bottom:0"> This is how your Query was Interpreted: </p>
              <table style="width:100%" class="table">
                <tr>
                  <td class="text-center" v-for="(current_entity,index) in current_unanswered_question_selected.entity_suggestion_map" :key="index">
                  {{ current_entity.entity.value }}
                  </td>
                </tr>
                <tr>
                  <td class="text-center" v-for="(current_entity,index) in current_unanswered_question_selected.entity_suggestion_map" :key="index">
                  <p> {{ current_entity.suggestion.type }} </p>
                  <p> {{ current_entity.suggestion.value }} </p>
                  </td>
                </tr>
                <tr>
                  <td class="text-center" v-for="(current_entity,index) in current_unanswered_question_selected.entity_suggestion_map" :key="index">
                    <i title="Correct" style="cursor:pointer;color:#5aec3f;margin:1rem" class="fa fa-check" aria-hidden="true" @click="add_suggestion(index)"></i>
                    <i title="Wrong" style="cursor:pointer;color:red;margin:1rem" class="fa fa-times" aria-hidden="true" @click="discard_suggestion(index)"></i>
                    <i title="Ignore" style="cursor:pointer;margin:1rem" class="fas fa-minus-circle"></i>
                  </td>
                </tr>
              </table>
              <table style="width:100%" class="table" v-if="corrected_suggestions.length > 0">
                Hello
              </table>
              <div v-if="wrong_phrases != null">
                  <p @mouseup="selected_text"> 
                    {{wrong_phrases}}
                  </p>
              </div> -->
              <p v-if="entity_suggestion_mapping_new.length > 0"> New Mapping :</p>
              <table v-if="entity_suggestion_mapping_new.length > 0" style="border: 1px solid #777474;width:100%;text-align:center;">
                <tr style="border: 1px solid #777474;">
                  <td v-for="(entity, index) in entity_suggestion_mapping_new" :key="index" style="border: 1px solid #777474;">
                    {{entity.entity.value}}
                  </td>
                </tr>
                <tr style="border: 1px solid #777474;">
                  <td style="border: 1px solid #777474;" v-for="(entity, index) in entity_suggestion_mapping_new" :key="index">
                      <span v-if="entity.suggestion[0].type == 'attribute' " v-html="attribute_svg"> </span>
                      <span v-if="entity.suggestion[0].type == 'value' " v-html="value_svg"> </span>
                      <span v-if="entity.suggestion[0].type == 'metric' " v-html="metrics_svg"> </span>
                      <span v-if="entity.suggestion[0].type == 'keyword' " v-html="keyword_svg"> </span>
                    {{entity.suggestion[0].value}}
                    <!-- {{entity.suggestion[0]}} -->
                  </td>
                </tr>

              </table>

              <div v-if="show_change_suggestions" class="mt-2">
                <p>

                  What do you want '{{currrent_suggestion_to_change}}' to mean?
                <span class="italic" style="cursor:pointer" @click="ignore_phrase"> <em> ( Ignore?) </em> </span>
                </p>  
                <div class="d-flex">
                <tag-tag
                  style="width:90%"
                  elementId="search_data"
                  element-id="tags"
                  v-model="search_data"
                  :typeahead="true"
                  typeahead-style="dropdown"
                  :typeahead-always-show="false"
                  :delete-on-backspace="true"
                  :existing-tags="search_result"
                  @change="search"
                  :allow-duplicates="true"
                  :typeahead-hide-discard="false"
                  :add-tags-on-space="false"
                  :only-existing-tags="false"
                  @tags-updated="tag_added"
                ></tag-tag>

                <!-- <button class="btn btn-primary mt-4">
                  Save This Suggestion 
                </button> -->
                <i title="Cancel" style="cursor:pointer;color:red;margin:1rem" class="fa fa-times" aria-hidden="true" @click="discard_suggestion()"></i>
                <i title="Save" v-if="search_data.length > 0" style="cursor:pointer;color:#5aec3f;margin:1rem" class="fa fa-check" aria-hidden="true" @click="add_suggestion()"></i>
              </div>

              </div>

            </div>
            <div class="modal-footer">
              <button 
              type="button" 
              class="btn btn-primary"
              v-if="entity_suggestion_mapping_new.length > 0"
              @click="save_mapping_for_current_question">Save changes</button>
              <button
                type="button"
                class="btn btn-default"
                data-dismiss="modal"
                @click="close_current_question_modal"
              >
                Close
              </button>
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
import VoerroTagsInputSecond from "@/portal/analytics/tags_input/VoerroTagsInput.vue"
import swal from 'sweetalert2';
export default {
  name: "AnalyticsNERTagging",
  components: {
    "tag-tag":VoerroTagsInputSecond,
  },
  data() {
    return {
      spinnerOn: false,
      dataset_name: "Healthcare Data",
      // dataset_name: "Fruithut v2",
      questions: [],
      current_unanswered_question_selected: null,
      show_question_modal: false,
      current_tags: null,
      phrase_selected: [],
      corrected_suggestions: [],
      wrong_phrases: null,
      show_change_suggestions: false,
      currrent_suggestion_to_change: null,
      search_data: [],
      search_result: [],
      callapi : true,
      attribute_svg:
        '<svg xmlns="http://www.w3.org/2000/svg" width="10.4" height="10.8" viewBox="0 0 1240.000000 1280.000000" preserveAspectRatio="xMidYMid meet" id="svgcontent" overflow="visible" x="632.3999999999999" y="652.8"><metadata>Created by potrace 1.15, written by Peter Selinger 2001-2017</metadata><g class="layer" style="pointer-events:all"><title style="pointer-events:inherit">Layer 1</title><g transform="translate(0 1280) scale(0.1 -0.1)" fill="#e91e63" stroke="none" id="svg_1" fill-opacity="1"><path d="M5736,12132C5550,11765 4933,10554 4365,9440C3797,8326 2908,6583 2390,5565C1871,4548 1121,3076 723,2296L0,877L0,779C0,695 2,681 18,676C27,673 253,622 520,561C787,501 1383,365 1845,260C2307,155 2753,53 2837,34C2936,12 3015,0 3062,0L3135,0L3664,1265L4193,2530L6135,2530L8077,2530L8615,1408C8911,790 9184,221 9221,143L9289,2L9327,10C9361,18 11508,485 12150,624L12395,677L12398,776L12401,876L12102,1460C11937,1782 11529,2580 11195,3235C10861,3890 10325,4938 10005,5565C9222,7097 7889,9707 7173,11110C6851,11740 6525,12378 6448,12528L6309,12800L6192,12800L6075,12799L5736,12132zM6530,6120C6746,5644 6925,5249 6927,5243C6931,5233 6767,5230 6126,5230C5683,5230 5320,5234 5320,5238C5320,5242 5343,5297 5371,5360C5399,5423 5572,5817 5757,6235C5941,6653 6097,7004 6102,7014C6112,7033 6113,7032 6125,7009C6132,6996 6314,6596 6530,6120z" id="svg_2" fill="#cccccc"></path></g></g></svg>',
      value_svg:
        '<svg xmlns="http://www.w3.org/2000/svg" width="10.4" height="10.8" viewBox="0 0 1280.000000 1280.000000" preserveAspectRatio="xMidYMid meet" id="svgcontent" overflow="visible" x="652.8" y="652.8"><metadata>Created by potrace 1.15, written by Peter Selinger 2001-2017</metadata><g class="layer" style="pointer-events:all"><title style="pointer-events:inherit">Layer 1</title><g transform="translate(0 1280) scale(0.1 -0.1)" fill="#e91e63" stroke="none" id="svg_1" fill-opacity="1"><path d="M1075,12793C941,12776 765,12720 651,12659C326,12484 110,12197 24,11825C6,11748 5,11658 5,9745C5,7832 6,7742 24,7665C82,7413 186,7223 360,7050C548,6863 763,6752 1028,6706C1110,6692 1329,6690 3055,6690C5169,6690 5065,6687 5255,6747C5694,6886 6016,7258 6094,7718C6108,7799 6110,8030 6110,9745C6110,11471 6108,11690 6094,11772C6048,12037 5937,12254 5750,12440C5582,12609 5412,12705 5160,12772L5075,12795L3090,12796C1998,12797 1092,12795 1075,12793z" id="svg_2" fill="#cccccc"></path><path d="M7735,12785C7342,12724 7003,12481 6829,12138C6758,11996 6721,11878 6700,11717C6694,11666 6690,10977 6690,9745C6690,8513 6694,7824 6700,7773C6771,7235 7147,6827 7680,6713C7761,6696 7868,6695 9745,6695C11622,6695 11729,6696 11810,6713C12060,6767 12272,6881 12444,7054C12629,7242 12744,7472 12785,7740C12807,7882 12807,11608 12785,11750C12756,11944 12700,12089 12593,12252C12438,12490 12187,12675 11919,12750C11736,12801 11797,12800 9735,12799C8246,12798 7797,12795 7735,12785z" id="svg_3" fill="#cccccc"></path><path d="M1070,6099C799,6064 548,5940 356,5746C171,5558 56,5328 15,5060C-7,4918 -7,1192 15,1050C44,856 100,711 207,548C397,257 694,69 1050,15C1192,-7 4918,-7 5060,15C5196,36 5290,64 5407,120C5758,287 5992,582 6086,980C6103,1050 6104,1173 6108,2990C6111,5002 6111,5027 6069,5190C5969,5584 5667,5911 5280,6043C5086,6109 5260,6104 3095,6106C2017,6107 1106,6104 1070,6099z" id="svg_4" fill="#cccccc"></path><path d="M7760,6099C7310,6041 6926,5735 6767,5308C6737,5230 6714,5129 6700,5027C6694,4976 6690,4287 6690,3055C6690,1823 6694,1134 6700,1083C6738,794 6855,553 7054,356C7242,171 7472,56 7740,15C7882,-7 11608,-7 11750,15C12106,69 12403,257 12593,548C12700,711 12756,856 12785,1050C12807,1192 12807,4918 12785,5060C12764,5196 12736,5290 12680,5407C12513,5758 12218,5992 11820,6086C11749,6103 11630,6104 9785,6106C8707,6107 7796,6104 7760,6099z" id="svg_5" fill="#cccccc"></path></g></g></svg>',
      metrics_svg:
        '<svg xmlns="http://www.w3.org/2000/svg" width="10.4" height="10.4" viewBox="0 0 1280.000000 1280.000000" preserveAspectRatio="xMidYMid meet" id="svgcontent" overflow="visible" x="1280" y="1280"><metadata>Created by potrace 1.15, written by Peter Selinger 2001-2017</metadata><g class="layer" style="pointer-events:all"><title style="pointer-events:inherit">Layer 1</title><g transform="translate(0 1280) scale(0.1 -0.1)" fill="#e91e63" stroke="none" id="svg_1" fill-opacity="1"><path d="M5186,12083C5183,12073 5108,11705 5020,11265C4649,9418 4540,8876 4540,8873C4540,8871 4027,8870 3400,8870L2260,8870L2260,8271C2260,7804 2263,7670 2273,7663C2279,7658 2331,7641 2387,7627L2489,7600L3384,7600C4094,7600 4280,7597 4280,7588C4279,7581 4168,7024 4031,6350L3784,5125L3114,5120L2445,5114L2376,5087C2339,5072 2299,5055 2289,5049C2271,5040 2270,5018 2270,4440L2270,3840L2895,3840C3388,3840 3520,3837 3520,3828C3520,3815 3372,3079 3061,1550C2963,1069 2886,672 2890,667C2893,663 3166,661 3496,662L4095,665L4152,805C4220,972 4205,912 4335,1555C4701,3354 4781,3750 4791,3793L4802,3840L5866,3840L6930,3840L6925,3818C6922,3805 6791,3162 6635,2387L6350,980L6350,820L6350,660L6955,660C7288,660 7560,662 7560,664C7560,668 7963,2628 8125,3415C8172,3640 8210,3828 8210,3832C8210,3836 8729,3840 9364,3840L10518,3840L10525,4423C10529,4743 10531,5014 10529,5025C10526,5040 10500,5054 10425,5082L10325,5119L9403,5120C8562,5120 8480,5121 8480,5136C8480,5151 8975,7545 8986,7583C8991,7599 9031,7600 9648,7600L10305,7600L10413,7629C10473,7645 10523,7660 10526,7662C10528,7665 10533,7937 10537,8268L10543,8870L9897,8870C9541,8870 9250,8872 9250,8875C9250,8878 9358,9411 9491,10058C9623,10705 9771,11430 9819,11668L9908,12100L9294,12100L8681,12100L8666,12073C8658,12057 8631,11993 8606,11930C8555,11804 8578,11911 8174,9925C8078,9452 7991,9023 7980,8973C7969,8922 7960,8878 7960,8875C7960,8872 7479,8870 6890,8870C6298,8870 5820,8874 5820,8879C5820,8887 6263,11085 6365,11583C6407,11784 6410,11813 6410,11950L6410,12100L5801,12100C5229,12100 5191,12099 5186,12083zM7700,7595C7700,7592 7585,7036 7445,6359C7305,5683 7190,5127 7190,5125C7190,5122 6711,5120 6125,5120C5539,5120 5060,5123 5060,5126C5060,5129 5173,5685 5310,6362C5448,7038 5560,7594 5560,7596C5560,7598 6042,7600 6630,7600C7219,7600 7700,7598 7700,7595z" id="svg_2" fill="#cccccc"></path></g></g></svg>',
      keyword_svg: '<svg xmlns="http://www.w3.org/2000/svg" width="10.4" height="10.4" viewBox="0 0 1163.000000 1280.000000" preserveAspectRatio="xMidYMid meet" id="svgcontent" overflow="visible" x="1163" y="1280"><metadata>Created by potrace 1.15, written by Peter Selinger 2001-2017</metadata><g class="layer" style="pointer-events:all"><title style="pointer-events:inherit">Layer 1</title><g transform="translate(0 1280) scale(0.1 -0.1)" fill="#e91e63" stroke="none" id="svg_1" fill-opacity="1"><path d="M5295,12794C3131,12724 1438,12393 600,11874C301,11690 103,11463 45,11239C26,11169 6,10966 7,10855C7,10732 25,10706 325,10396C469,10247 1528,9153 2679,7965L4770,5805L4770,3085C4770,1263 4774,344 4780,301C4806,147 4912,37 5065,9C5097,3 5387,1 5801,2L6485,5L6552,38C6632,77 6690,139 6722,219L6745,275L6750,3026L6755,5776L8251,7301C11694,10811 11549,10661 11577,10717C11591,10746 11609,10770 11616,10770C11628,10770 11630,10820 11630,11060L11630,11350L11598,11350C11568,11350 11562,11355 11532,11414C11429,11613 11177,11822 10831,11995C9985,12418 8597,12684 6735,12780C6540,12791 5494,12800 5295,12794z" id="svg_2" fill="#cccccc"></path></g></g></svg>',
      new_entity_mapping_for_current_question: null,
      entity_type_prefix_mapping: {
        keyword: 'kw',
        function: 'function'
      },
      entity_suggestion_mapping_new: [],
      mapped_phrase: '',
      mapped_phrase_index:[],
      current_string_start_index: null,
      current_string_end_index: null,
    };
  },
  mounted() {
    // this.questions = [
    //   {
    //     search_string: "Show me top 10 best performing category by sales",
    //     suggestions: [
    //       {
    //         key: "K3h-0HEB0KWAWkclGFuh",
    //         value: "top N",
    //         type: "keyword",
    //         operation: null,
    //         dataset: null,
    //         column: null,
    //         operation_on: [],
    //         metadata: '{"keyword_type": "general"}',
    //         keyword_type: "general",
    //         company_id: "cense",
    //         input: 10,
    //       },
    //       {
    //         key: "MHh-0HEB0KWAWkclGFuj",
    //         value: "between ... and ...",
    //         type: "keyword",
    //         operation: null,
    //         dataset: null,
    //         column: null,
    //         operation_on: [],
    //         metadata: '{"keyword_type": "comparative"}',
    //         keyword_type: "comparative",
    //         company_id: "cense",
    //       },
    //       {
    //         key: "Lnh-0HEB0KWAWkclGFuj",
    //         value: "by",
    //         type: "keyword",
    //         operation: null,
    //         dataset: null,
    //         column: null,
    //         operation_on: [],
    //         metadata: '{"keyword_type": "general"}',
    //         keyword_type: "general",
    //         company_id: "cense",
    //       },
    //       {
    //         key: "YFAUt3IBjPRsZy_Rx2c3",
    //         value: "JOMAR AUTO SALES INC.",
    //         type: "value",
    //         operation: "filter",
    //         dataset: "Healthcare Data",
    //         column: "Policy Holder",
    //         operation_on: [],
    //         metadata: "",
    //         keyword_type: null,
    //         company_id: "gogyb450",
    //       },
    //     ],
    //   },
    // ];
    // let x = 
    //           [
    //             {
    //               "search_string": "Show me top 10 best Provider by Outstanding Amount",
    //               "suggestions": [
    //                 {
    //                   "key": "K3h-0HEB0KWAWkclGFuh",
    //                   "value": "top N",
    //                   "type": "keyword",
    //                   "operation": null,
    //                   "dataset": null,
    //                   "column": null,
    //                   "operation_on": [],
    //                   "metadata": "{\"keyword_type\": \"general\"}",
    //                   "keyword_type": "general",
    //                   "company_id": "cense",
    //                   "input": 10
    //                 },
    //                 {
    //                   "key": null,
    //                   "value": "best",
    //                   "value_to_display": "best",
    //                   "column": null,
    //                   "company_id": "gogyb450",
    //                   "keyword_type": null,
    //                   "metadata": "",
    //                   "type": "input"
    //                 },
    //                 {
    //                   "key": "CPdIKnQBtbTN89OloqpX",
    //                   "value": "Provider",
    //                   "type": "attribute",
    //                   "operation": "groupby",
    //                   "dataset": "Healthcare Data",
    //                   "column": "Provider",
    //                   "operation_on": [],
    //                   "metadata": "",
    //                   "keyword_type": null,
    //                   "company_id": "gogyb450"
    //                 },
    //                 {
    //                   "key": "Lnh-0HEB0KWAWkclGFuj",
    //                   "value": "by",
    //                   "type": "keyword",
    //                   "operation": null,
    //                   "dataset": null,
    //                   "column": null,
    //                   "operation_on": [],
    //                   "metadata": "{\"keyword_type\": \"general\"}",
    //                   "keyword_type": "general",
    //                   "company_id": "cense"
    //                 },
    //                 {
    //                   "key": "EvdIKnQBtbTN89Oloqqa",
    //                   "value": "Outstanding Amount",
    //                   "type": "metric",
    //                   "operation": "SUM",
    //                   "dataset": "Healthcare Data",
    //                   "column": "OutStanding",
    //                   "operation_on": [],
    //                   "metadata": "",
    //                   "keyword_type": null,
    //                   "company_id": "gogyb450"
    //                 }
    //               ],
    //               "entity_suggestion_map": [
    //                 {
    //                   "entity": {
    //                     "entity": "kw_general",
    //                     "value": "top",
    //                     "start": 8,
    //                     "end": 11
    //                   },
    //                   "suggestion": {
    //                     "key": "K3h-0HEB0KWAWkclGFuh",
    //                     "value": "top N",
    //                     "type": "keyword",
    //                     "operation": null,
    //                     "dataset": null,
    //                     "column": null,
    //                     "operation_on": [],
    //                     "metadata": "{\"keyword_type\": \"general\"}",
    //                     "keyword_type": "general",
    //                     "company_id": "cense",
    //                     "input": 10
    //                   }
    //                 },
    //                 {
    //                   "entity": {
    //                     "entity": "input",
    //                     "value": "10",
    //                     "start": 12,
    //                     "end": 14
    //                   },
    //                   "suggestion": {
    //                     "key": null,
    //                     "value": "10",
    //                     "value_to_display": "10",
    //                     "column": null,
    //                     "company_id": "gogyb450",
    //                     "keyword_type": null,
    //                     "metadata": "",
    //                     "type": "input"
    //                   }
    //                 },
    //                 {
    //                   "entity": {
    //                     "entity": "input",
    //                     "value": "best",
    //                     "start": 15,
    //                     "end": 19
    //                   },
    //                   "suggestion": {
    //                     "key": null,
    //                     "value": "best",
    //                     "value_to_display": "best",
    //                     "column": null,
    //                     "company_id": "gogyb450",
    //                     "keyword_type": null,
    //                     "metadata": "",
    //                     "type": "input"
    //                   }
    //                 },
    //                 {
    //                   "entity": {
    //                     "entity": "attribute",
    //                     "value": "provider",
    //                     "start": 20,
    //                     "end": 28
    //                   },
    //                   "suggestion": {
    //                     "key": "CPdIKnQBtbTN89OloqpX",
    //                     "value": "Provider",
    //                     "type": "attribute",
    //                     "operation": "groupby",
    //                     "dataset": "Healthcare Data",
    //                     "column": "Provider",
    //                     "operation_on": [],
    //                     "metadata": "",
    //                     "keyword_type": null,
    //                     "company_id": "gogyb450"
    //                   }
    //                 },
    //                 {
    //                   "entity": {
    //                     "entity": "kw_general",
    //                     "value": "by",
    //                     "start": 29,
    //                     "end": 31
    //                   },
    //                   "suggestion": {
    //                     "key": "Lnh-0HEB0KWAWkclGFuj",
    //                     "value": "by",
    //                     "type": "keyword",
    //                     "operation": null,
    //                     "dataset": null,
    //                     "column": null,
    //                     "operation_on": [],
    //                     "metadata": "{\"keyword_type\": \"general\"}",
    //                     "keyword_type": "general",
    //                     "company_id": "cense"
    //                   }
    //                 },
    //                 {
    //                   "entity": {
    //                     "entity": "measure",
    //                     "value": "outstanding amount",
    //                     "start": 32,
    //                     "end": 50
    //                   },
    //                   "suggestion": {
    //                     "key": "EvdIKnQBtbTN89Oloqqa",
    //                     "value": "Outstanding Amount",
    //                     "type": "metric",
    //                     "operation": "SUM",
    //                     "dataset": "Healthcare Data",
    //                     "column": "OutStanding",
    //                     "operation_on": [],
    //                     "metadata": "",
    //                     "keyword_type": null,
    //                     "company_id": "gogyb450"
    //                   }
    //                 }
    //               ],
    //               "original_string": "Show me top 10 best Provider by Outstanding Amount"
    //             },
    //             {
    //               "search_string": "Show me top 10 best Provider by sales",
    //               "suggestions": [
    //                 {
    //                   "key": "K3h-0HEB0KWAWkclGFuh",
    //                   "value": "top N",
    //                   "type": "keyword",
    //                   "operation": null,
    //                   "dataset": null,
    //                   "column": null,
    //                   "operation_on": [],
    //                   "metadata": "{\"keyword_type\": \"general\"}",
    //                   "keyword_type": "general",
    //                   "company_id": "cense",
    //                   "input": 10
    //                 },
    //                 {
    //                   "key": null,
    //                   "value": "best",
    //                   "value_to_display": "best",
    //                   "column": null,
    //                   "company_id": "gogyb450",
    //                   "keyword_type": null,
    //                   "metadata": "",
    //                   "type": "input"
    //                 },
    //                 {
    //                   "key": "CPdIKnQBtbTN89OloqpX",
    //                   "value": "Provider",
    //                   "type": "attribute",
    //                   "operation": "groupby",
    //                   "dataset": "Healthcare Data",
    //                   "column": "Provider",
    //                   "operation_on": [],
    //                   "metadata": "",
    //                   "keyword_type": null,
    //                   "company_id": "gogyb450"
    //                 },
    //                 {
    //                   "key": "Lnh-0HEB0KWAWkclGFuj",
    //                   "value": "by",
    //                   "type": "keyword",
    //                   "operation": null,
    //                   "dataset": null,
    //                   "column": null,
    //                   "operation_on": [],
    //                   "metadata": "{\"keyword_type\": \"general\"}",
    //                   "keyword_type": "general",
    //                   "company_id": "cense"
    //                 },
    //                 {
    //                   "key": "gyWfDHIBFAyJL8QrNTx4",
    //                   "value": "SALES",
    //                   "type": "metric",
    //                   "operation": "SUM",
    //                   "dataset": "Fruithut v2",
    //                   "column": "Sales",
    //                   "operation_on": [],
    //                   "metadata": "",
    //                   "keyword_type": null,
    //                   "company_id": "gogyb450"
    //                 }
    //               ],
    //               "entity_suggestion_map": [
    //                 {
    //                   "entity": {
    //                     "entity": "kw_general",
    //                     "value": "top",
    //                     "start": 8,
    //                     "end": 11
    //                   },
    //                   "suggestion": {
    //                     "key": "K3h-0HEB0KWAWkclGFuh",
    //                     "value": "top N",
    //                     "type": "keyword",
    //                     "operation": null,
    //                     "dataset": null,
    //                     "column": null,
    //                     "operation_on": [],
    //                     "metadata": "{\"keyword_type\": \"general\"}",
    //                     "keyword_type": "general",
    //                     "company_id": "cense",
    //                     "input": 10
    //                   }
    //                 },
    //                 {
    //                   "entity": {
    //                     "entity": "input",
    //                     "value": "10",
    //                     "start": 12,
    //                     "end": 14
    //                   },
    //                   "suggestion": {
    //                     "key": null,
    //                     "value": "10",
    //                     "value_to_display": "10",
    //                     "column": null,
    //                     "company_id": "gogyb450",
    //                     "keyword_type": null,
    //                     "metadata": "",
    //                     "type": "input"
    //                   }
    //                 },
    //                 {
    //                   "entity": {
    //                     "entity": "input",
    //                     "value": "best",
    //                     "start": 15,
    //                     "end": 19
    //                   },
    //                   "suggestion": {
    //                     "key": null,
    //                     "value": "best",
    //                     "value_to_display": "best",
    //                     "column": null,
    //                     "company_id": "gogyb450",
    //                     "keyword_type": null,
    //                     "metadata": "",
    //                     "type": "input"
    //                   }
    //                 },
    //                 {
    //                   "entity": {
    //                     "entity": "attribute",
    //                     "value": "provider",
    //                     "start": 20,
    //                     "end": 28
    //                   },
    //                   "suggestion": {
    //                     "key": "CPdIKnQBtbTN89OloqpX",
    //                     "value": "Provider",
    //                     "type": "attribute",
    //                     "operation": "groupby",
    //                     "dataset": "Healthcare Data",
    //                     "column": "Provider",
    //                     "operation_on": [],
    //                     "metadata": "",
    //                     "keyword_type": null,
    //                     "company_id": "gogyb450"
    //                   }
    //                 },
    //                 {
    //                   "entity": {
    //                     "entity": "kw_general",
    //                     "value": "by",
    //                     "start": 29,
    //                     "end": 31
    //                   },
    //                   "suggestion": {
    //                     "key": "Lnh-0HEB0KWAWkclGFuj",
    //                     "value": "by",
    //                     "type": "keyword",
    //                     "operation": null,
    //                     "dataset": null,
    //                     "column": null,
    //                     "operation_on": [],
    //                     "metadata": "{\"keyword_type\": \"general\"}",
    //                     "keyword_type": "general",
    //                     "company_id": "cense"
    //                   }
    //                 },
    //                 {
    //                   "entity": {
    //                     "entity": "measure",
    //                     "value": "sales",
    //                     "start": 32,
    //                     "end": 37
    //                   },
    //                   "suggestion": {
    //                     "key": "gyWfDHIBFAyJL8QrNTx4",
    //                     "value": "SALES",
    //                     "type": "metric",
    //                     "operation": "SUM",
    //                     "dataset": "Fruithut v2",
    //                     "column": "Sales",
    //                     "operation_on": [],
    //                     "metadata": "",
    //                     "keyword_type": null,
    //                     "company_id": "gogyb450"
    //                   }
    //                 }
    //               ]
    //             }
    //           ]


    // for(let i = 0; i<x.length; i++){
    //   x.show_mappings = false;
    // }
    // this.questions = JSON.parse(JSON.stringify(x));
    // console.log(this.questions)
    this.spinnerOn = true;
    axios.get(api_calls.bi_unanswered_searches(),{
      params: {
      email: this.$session.get("UserInformation").email,
      token: this.$session.get("UserInformation").tokens,
      company_name: this.$session.get("UserInformation").company_name,
      company_id: this.$session.get("UserInformation").company_id,
      license_key: this.$session.get("UserInformation").license_key,
      dataset_name: this.dataset_name
      }
    }).then(response => {
      this.spinnerOn = false
      if(response.data.status === "Success"){
        this.questions = response.data.unanswered_searches.map(function(search){
          var o = Object.assign({}, search);
          o.show_mappings = false;
          return o;
        });
      } else{
        Swal.fire({
          text: "Some Error Occurred. Please Try Again.",
          timer:2500,
        })
      }
      console.log(response);

    })
  },
  watch: {
    questions(newVal,oldVal){
      console.log(newVal,oldVal)
    }
  },
  methods: {
    tag_question(index) {
      this.current_unanswered_question_selected = this.questions[index];
      this.current_unanswered_question_selected.entity_suggestion_map = this.questions[index].entity_suggestion_map;
      this.current_unanswered_question_selected.original_string = this.questions[index].search_string;
      this.show_question_modal = true;
      this.current_tags = this.current_unanswered_question_selected.search_string.split(" ")
      // console.log(this.current_tags)
      // console.log(this.current_unanswered_question_selected)
      setTimeout(() => {
        $("#myModal").modal();
      }, 0);
    },
    selected_text() {
      if (window.getSelection && !this.show_change_suggestions) {
        if (window.getSelection().toString().trim() != "") {
          if((window.getSelection().focusOffset - window.getSelection().anchorOffset) < 0 ){
            swal.fire({
              type:'error',
              text:'Please Select Word from Left to Right',
              toast:true,
              showConfirmButton: false,
              timer: 2500
            });
          } else {
            this.current_string_start_index = window.getSelection().anchorOffset;
            this.current_string_end_index =   window.getSelection().focusOffset;
            if(this.check_if_word_already_mapped(window.getSelection().toString().trim())){
              // console.log(window.getSelection().toString());
              // console.log(window.getSelection().toString().trim());
              console.log(this.current_unanswered_question_selected.search_string.indexOf(window.getSelection().toString().trim()))
              console.log(window.getSelection().toString().trim().length);
              this.currrent_suggestion_to_change = window.getSelection().toString().trim();
              // this.current_string_start_index = this.current_unanswered_question_selected.search_string.indexOf(window.getSelection().toString().trim());
              // this.current_string_end_index = this.current_unanswered_question_selected.search_string.indexOf(window.getSelection().toString().trim()) + window.getSelection().toString().trim().length;
              this.new_entity_mapping_for_current_question = {
                entity : {
                  start: window.getSelection().anchorOffset,
                  end: window.getSelection().focusOffset,
                  value: this.currrent_suggestion_to_change
                }
              };
              this.show_change_suggestions = true;
            }
          }
        } else {
          // this.highlighted_text = "";
          // $(".popoverDiv").css("display", "none");
        }
      } else if (document.selection) {
        document.selection.createRange().text;
      }
    },
    close_current_question_modal(){
      this.current_unanswered_question_selected = null;
      this.show_question_modal = false;
      this.search_data = [];
      this.search_result = [];
      this.show_change_suggestions = false;
      this.new_entity_mapping_for_current_question = null;
      this.current_string_start_index = null;
      this.current_string_end_index = null;
      this.entity_suggestion_mapping_new = [];
      this.mapped_phrase_index = [];
    },  
    add_suggestion(){
      // console.log(this.search_data);
      // console.log(this.new_entity_mapping_for_current_question)
      this.new_entity_mapping_for_current_question.suggestion = this.search_data;
      for(let i = 0; i < this.new_entity_mapping_for_current_question.suggestion.length; i++){
        if(this.new_entity_mapping_for_current_question.suggestion[i].type === "keyword"){
          this.new_entity_mapping_for_current_question.entity.entity = this.entity_type_prefix_mapping.keyword +'_'+ this.new_entity_mapping_for_current_question.suggestion[i].keyword_type;
          if(this.new_entity_mapping_for_current_question.suggestion[i].keyword_type === "function"){
            this.new_entity_mapping_for_current_question.entity.entity = this.entity_type_prefix_mapping.function
          }
          break;
        }
      }
      this.mapped_phrase = this.mapped_phrase + ' ' + this.new_entity_mapping_for_current_question.entity.value;
      this.mapped_phrase_index.push({
        start: this.current_string_start_index,
        end: this.current_string_end_index,
      })
      this.entity_suggestion_mapping_new.push(this.new_entity_mapping_for_current_question)
      this.search_data = [];
      this.search_result = [];
      this.show_change_suggestions = false;
      this.new_entity_mapping_for_current_question = null;
      this.current_string_start_index = null;
      this.current_string_end_index = null;
      // console.log('correct',index);
      // console.log(this.current_unanswered_question_selected.entity_suggestion_map[index]);
      // this.corrected_suggestions.push(this.current_unanswered_question_selected.entity_suggestion_map[index]);
    },
    discard_suggestion(index){
      this.search_data = [];
      this.search_result = [];
      this.show_change_suggestions = false;
      this.new_entity_mapping_for_current_question = null;
      this.current_string_start_index = null;
      this.current_string_end_index = null;
      // this.wrong_phrases = (this.wrong_phrases == null ? '' : this.wrong_phrases) + ' ' + this.current_unanswered_question_selected.entity_suggestion_map[index].entity.value;
      // console.log(this.current_unanswered_question_selected.entity_suggestion_map[index].entity.value);
      // console.log('wrong',index);
    },
    search(value) {
      // console.log(value);  
         this.search_result = [];
        axios
          .get(api_calls.bi_search_data(), {
            params: {
              email: this.$session.get("UserInformation").email,
              token: this.$session.get("UserInformation").tokens,
              company_name: this.$session.get("UserInformation").company_name,
              company_id: this.$session.get("UserInformation").company_id,
              // company_name: "cense_bi",
              // company_id: "cense_bi",
              license_key: this.$session.get("UserInformation").license_key,
              q: value,
              dataset_name: this.dataset_name
            }
          })
          .then(response => {
            if (response.data.status == "Success") {
              this.search_result = response.data.suggestions;
              for(let i = 0; i < this.search_result.length; i++){
                if(this.search_result[i].type === "keyword"){
                   if(this.search_result[i].value === "between ... and ..."){
                    this.search_result[i].value_to_display = "between";
                   }
                   else if(this.search_result[i].value === "top N"){
                     this.search_result[i].value_to_display = "top";
                   }
                   else if(this.search_result[i].value === "bottom N"){
                     this.search_result[i].value_to_display = "bottom";
                   }
                   else{
                    this.search_result[i].value_to_display = this.search_result[i].value;
                   }
                }
                else {
                  this.search_result[i].value_to_display = this.search_result[i].value;
                }
              }
            }
          })
          .catch(err => {
            console.log("Error", err);
          });
    },
    tag_added(){
      console.log('added');
      this.callapi = true;
      if( this.search_data.length === 0) {
        this.callapi = false;
      }
      for (let i = 0; i < this.search_data.length; i++) {
        if((this.search_data[i].type != undefined) && (this.search_data[i].type === "keyword")) {
          if(this.search_data[i].keyword_type === "date"){
            if((this.search_data[i].value === "after ...") || (this.search_data[i].value === "before ...")) {
              if((this.search_data[i+1]) && (this.search_data[i+1].key === null)){
                    if((this.check_date_validity(this.search_data[i+1].value,i))){
                    this.add_details_to_object(i+1,i);
                    }
                }
            }
            if(this.search_data[i].value === "between ... and ...") {
              if((this.search_data[i+1]) && (this.search_data[i+1].key === null) ){
                  if((this.check_date_validity(this.search_data[i+1].value,i))){
                  this.add_details_to_object(i+1,i);
                  this.search_data[i+1].value_to_display = this.search_data[i+1].value;
                  }
              }
              if((this.search_data[i+2]) && (this.search_data[i+2].key === null) ){
                  if(this.check_date_validity(this.search_data[i+2].value,i)){
                  this.add_details_to_object(i+2,i);
                  this.search_data[i+2].value_to_display = "and" + " " + this.search_data[i+2].value;
                  }
                }
            }
          }
          if(this.search_data[i].keyword_type === "general") {
              if(this.search_data[i].value === "top N" ||  this.search_data[i].value === "bottom N" ){
                if((this.search_data[i+1]) && (this.search_data[i+1].key === null) ){
                    if(this.check_number_validity(this.search_data[i+1].value,i)){
                    this.search_data[i].input = Number(this.search_data[i+1].value);
                    this.search_data[i].value_to_display = this.search_data[i].value_to_display + " " + this.search_data[i+1].value;
                    this.search_data = this.search_data.slice(0, i+1).concat(this.search_data.slice(i + 2, this.search_data.length));
                    // this.check_duplicate = i + 1;
                    }
                }
              }
          }
          if(this.search_data[i].keyword_type === "comparative") {
            if((this.search_data[i].value === "lesser than") || (this.search_data[i].value === "greater than") || (this.search_data[i].value === "greater than equal to")
              || (this.search_data[i].value === "lesser than equal to") || (this.search_data[i].value === "equal to") || (this.search_data[i].value === "not equal to") ) {
              if((this.search_data[i+1]) && (this.search_data[i+1].key === null) ){
                  this.add_details_to_object(i+1,i);
                  this.search_data[i+1].value_to_display = this.search_data[i+1].value;
              }
            }
            if(this.search_data[i].value === "between ... and ..."){
              if((this.search_data[i+1]) && (this.search_data[i+1].key === null) ){
                this.add_details_to_object(i+1,i);
                this.search_data[i+1].value_to_display = this.search_data[i+1].value;
              }
              if((this.search_data[i+2]) && (this.search_data[i+2].key === null) ){
                  this.add_details_to_object(i+2,i);
                this.search_data[i+2].value_to_display = "and" + " " + this.search_data[i+2].value;
              }
            }
          }
          if(this.search_data[i].keyword_type === "text") {
            if(!this.search_data[i-1]){
              this.text_keywords_validity('attribute',i);
            }
            if(this.search_data[i-1] && this.search_data[i-1].type !== "attribute"){
              this.text_keywords_validity('attribute',i);
            }
            if(this.search_data[i-1] && this.search_data[i+1] && this.search_data[i+1].key === null){
              // if(this.search_data[i+1].key === null){
              if((this.text_keywords_validity('begins_ends_with', i))){
              // if(this.search_data[i+1].value.charAt(this.search_data[i+1].value.length-1) == `'`){
                // if(this.text_keywords_validity('length',i)){
                  this.add_details_to_object(i+1,i);
                  this.search_data[i+1].value = this.remove_quotes_from_string(this.search_data[i+1].value);
                  this.search_data[i+1].value_to_display = this.search_data[i+1].value;
                // this.search_data[i+1].value_to_display = this.search_data[i+1].value;
                // }
                this.text_keywords_validity('length',i+1)
              }
              else {
              // this.error_text_show = true ;
              // this.error_text = "Please End Your word with ' ";
              // this.callapi = false;
              // var x = this.search_data[i+1].value
              // document.getElementById("searchbar").value = x;
              // console.log(x);
              // this.search_data = this.search_data.slice(0, i+1);
              // this.check_duplicate = i + 1;
              // console.log(x);
              // document.getElementById("search_data").previousSibling.value = ""+x+"";
              }
              // }
            }

          }
          if(this.search_data[i].keyword_type === "function") {
              if((this.search_data[i+1]) && (this.search_data[i+1].key === null)){
                 this.add_details_to_object(i+1,i);
              }
          }
        }
      }
      console.log(this.search_data);
    },
    check_date_validity(date,index){
      var x = new  Date(date);
      if((x === "Invalid Date")){
        this.search_data[index+1].value = "";
        this.callapi = false;
        this.search_data = this.search_data.slice(0, index+1);
        this.check_duplicate = index + 1;
        this.error_text_show = true;
        this.error_text = "Please Enter Date in Format: YYYY-MM-DD or DD-MM-YYYY";
        return false;
      } else {
        return true;
      }
    },
    add_details_to_object(to_be_set,to_be_set_from) {
      this.search_data[to_be_set].column = this.search_data[to_be_set_from].column;
      this.search_data[to_be_set].company_id = this.search_data[to_be_set_from].company_id;
      this.search_data[to_be_set].keyword_type = null;
      this.search_data[to_be_set].metadata = "";
      this.search_data[to_be_set].type = "input";
    },
    check_number_validity(number,index){
      if(!(Number.isInteger(Number(number)))) {
        this.search_data[index+1].input = "";
        this.callapi = false;
        this.search_data = this.search_data.slice(0, index+1);
        this.check_duplicate = index + 1;
        this.error_text_show = true;
        this.error_text = "Please Enter a Valid Number";
        // alert("Not Number");
        return false;
      } else {
        // alert("Number");
        return true;
      }
    },
    text_keywords_validity(type,index){
      if(type === 'attribute' ){
        this.error_text_show = true;
        this.error_text = "You should use an attribute before using this kind of keyword";
        this.callapi = false;
        this.search_data = this.search_data.slice(0, index);
        this.check_duplicate = index;
        return false;
      }
      if(type === 'begins_ends_with') {
         if(!(this.search_data[index+1].value.charAt(this.search_data[index+1].value.length-1) == `'` || this.search_data[index+1].value.charAt(this.search_data[index+1].value.length-1) == `"`)){
          this.error_text_show = true ;
          this.error_text = "Please Start and End Your word with Quotes ";
          this.callapi = false;
          // var x = this.search_data[i+1].value
          // document.getElementById("searchbar").value = x;
          // console.log(x);
          this.search_data = this.search_data.slice(0, index+1);
          this.check_duplicate = index+ 1;
          return false
         } else {
           return true;
         }
      }
      if(type === 'length') {
        // console.log('lenght');
        if(this.search_data[index].value.length < 3){
          var x = this.add_quotes_to_string(this.search_data[index].value);
          this.search_data = this.search_data.slice(0, index);
          this.$root.$emit('add_text_to_search_bar', x);
          // console.log(x);
          this.error_text_show = true;
          this.error_text = "Please Search with Atleast 3 Characters for this Keyword";
          this.callapi = false;
          return false;
        } else {
          this.callapi = true;
          return true;
        }
      }
    },
    remove_quotes_from_string(str) {
      return str.substring(1).slice(0,-1);
    },
    show_mappings_of_question(index){
      // console.log('hi',index)
      // console.log('hi',index)
      this.questions[index].show_mappings = true;
    },
    check_if_word_already_mapped(word){
      if(this.mapped_phrase != ''){
        for(let i = 0; i < word.split(' ').length; i +=1) {
          if(this.mapped_phrase.includes(word.split(' ')[i])){
            for(let j = 0; j < this.mapped_phrase_index.length; j+= 1){
              if(((this.mapped_phrase_index[j].start <= this.current_string_start_index) &&( this.current_string_start_index <= this.mapped_phrase_index[j].end))){
                swal.fire({
                type:'error',
                text:'This word has already been mapped. Please select something else',
                toast:true,
                showConfirmButton: false,
                timer: 2500
                });
                return false;
                break;
              }
            }
            return true;
          }
        }
        return true;  
      } else{
        return true;
      }
    },
    ignore_phrase(){
      this.new_entity_mapping_for_current_question.suggestion = [{
        type: 'ignore',
        value:'Ignore'
      }];
      this.mapped_phrase = this.mapped_phrase + ' ' + this.new_entity_mapping_for_current_question.entity.value;
      this.mapped_phrase_index.push({
        start: this.current_string_start_index,
        end: this.current_string_end_index,
      })
      this.entity_suggestion_mapping_new.push(this.new_entity_mapping_for_current_question)
      this.search_data = [];
      this.search_result = [];
      this.show_change_suggestions = false;
      this.new_entity_mapping_for_current_question = null;
      this.current_string_start_index = null;
      this.current_string_end_index = null;
    },
    save_mapping_for_current_question(){
      Swal.fire({
        title: "Are you sure?",
        text: `You want to save this mapping`,
        type: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Confirm!"
      }).then(result => {
        if (result.value) {
          Swal({
            text: 'Please wait while we are submitting your details...',
            type: 'info',
            toast: true,
            showConfirmButton: false,
          });
          // axios.post(api_calls.bi_unanswered_searches(), {
          //   email: this.$session.get("UserInformation").email,
          //   token: this.$session.get("UserInformation").tokens,
          //   company_name: this.$session.get("UserInformation").company_name,
          //   company_id: this.$session.get("UserInformation").company_id,
          //   license_key: this.$session.get("UserInformation").license_key,
          //   dataset_name: this.dataset_name,
          //   search_string: this.current_unanswered_question_selected.search_string,
          //   suggestions: this.entity_suggestion_mapping_new
          // }).then(response => {
          //   if(response.data.status === "Success"){
          //     Swal({
          //       text: 'SUCCESSFULLY RE-MAPPED UNANSWERED QUESTION',
          //       type: 'info',
          //       toast: true,
          //       showConfirmButton: false,
          //     });
          //     setTimeout(() => {
          //       this.$router.go();
          //     }, 1500);
          //   } else {
          //     Swal({
          //       text: 'Some Error Occurred. Please Try Again',
          //       type: 'info',
          //       toast: true,
          //       showConfirmButton: false,
          //     });
          //     setTimeout(() => {
          //       this.$router.go();
          //     }, 1500);
          //   }
          // }).catch(error => {
          //   Swal({
          //     text: 'Some Error Occurred. Please Try Again',
          //     type: 'info',
          //     toast: true,
          //     showConfirmButton: false,
          //   });
          //   setTimeout(() => {
          //     this.$router.go();
          //   }, 1500);
          // })
        }
      })
      console.log(this.entity_suggestion_mapping_new);
    },
    delete_unanswered_question(index){
      Swal.fire({
        title: "Are you sure?",
        text: `You want to delete this question`,
        type: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Confirm!"
      }).then(result => {
        if (result.value) {
          Swal({
            text: 'Please wait while we are submitting your details...',
            type: 'info',
            toast: true,
            showConfirmButton: false,
          });
        }
      })
    }
  },
};
</script>
<style scoped.>
.questions-card{
  padding: 1rem;

/* -webkit-box-shadow:   3px 3px 5px 6px #ccc;   */
  /* -moz-box-shadow:    3px 3px 5px 6px #ccc;  
    box-shadow:         3px 3px 5px 6px #ccc;  */
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.45s ease-in-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>