    <template>
    <div>
  <!-- <div class="dash-cont"> -->
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <!-- <div class="container-fluid">
      <div class="card dash-card"> -->
        <!-- <div class="card-header d-block d-sm-flex flex-wrap justify-content-between">
          <h4 class="mb-sm-0">Dashboard</h4>
        </div>-->
        <div class="card-body" style="padding:0" id="div-for-image">
          <div class="col-sm-12" style="padding: 0.3rem;">
            <!-- <div id="show_data"></div> -->
            <div class="autocomplete" style="width:100%" data-html2canvas-ignore>
              <!-- <label for="inputGroupFile01" style="padding-right:10px;margin-bottom:2%;margin-top:1%;">Search</label> -->
              <!-- <tags-input
                elementId="search_data"
                element-id="tags"
                placeholder="Search"
                v-model="search_data"
                :typeahead="true"
                typeahead-style="dropdown"
                :typeahead-always-show="false"
                :delete-on-backspace="true"
                :existing-tags="search_result"
                @tag-added="tag_added"
                @tag-removed="tagremoved"
                @change="search"
                :allow-duplicates="false"
                :typeahead-hide-discard="true"
                :add-tags-on-space="false"
              ></tags-input> -->
            <div style="display:flex">
              <div class="dropdown">
                  <button type="button" class="btn btn-primary" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="background-color: #f7f7f7;border-color: #e3e8ec;height:43px;">
                    <!-- Dropleft -->
                    <span v-html="dataset_icon_to_be_showed"></span>
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <!-- <a class="dropdown-item" href="#">Action</a> -->
                      <div v-for="(dataset,index) in datasets" :key="index">
                        <div :id="'dataset_list'+index"  @click="change_dataset(index)" style="text-align:left;cursor: pointer;margin:1% 8%">
                          <ul>
                           <li> {{active_dataset(index)}} </li>
                          </ul>
                        </div>
                      </div>
                  </div>
              </div>
              <tag-tag
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
                <!-- <label style="padding-left:8px;padding-top:10px;font-size: 14px;">
                 NLP Search
                 </label>
                <label class="switch" style="padding-left:3px;margin-top:10px;font-size: 14px;">
                <input type="checkbox"  id="nlp_search" v-model="nlp_search">
                <span class="slider round" style="border-radius: 50px;"></span>
                </label>   -->
            </div>
              <div v-if="error_text_show" style="margin-top: 1%;color: red;font-size: 13px;">
                {{error_text}}
              </div>
            </div>
              <div v-if="show_heading && !show_reports_list">
                <div style="margin-top: 3%;display:flex" >
                <h5 style="margin-bottom:auto;margin-top:auto" id="graph_heading">
                  <!-- <em>  -->
                    {{heading}}
                  <!-- </em>  -->
                </h5>
                <!-- <i class="fas fa-file-csv"></i> -->
                <!-- <img :src="csv_file_icon_path" alt="" aria-hidden="true" data-html2canvas-ignore style="float:right;margin-left:auto;padding-top: 0.5rem;margin-right: 2%;cursor:pointer" title="Save as CSV" @click="convert_to_csv('csv')"> -->
                <!-- <i class="fa fa-file" aria-hidden="true" data-html2canvas-ignore style="float:right;margin-left:auto;padding-top: 0.5rem;margin-right: 2%;cursor:pointer" title="Save as CSV" @click="convert_to_csv('csv')"></i> -->
                <!-- <i class="fa fa-file-excel" aria-hidden="true" data-html2canvas-ignore style="float:right;margin-left:auto;padding-top: 0.5rem;margin-right: 2%;cursor:pointer" title="Save as CSV" @click="convert_to_csv('csv')"></i> -->
                <!-- <i class="fa fa-file-excel" aria-hidden="true" data-html2canvas-ignore style="float:right;padding-top: 0.5rem;margin-right: 2%;cursor:pointer" title="Save as Excel" @click="convert_to_csv('excel')"></i> -->
                <!-- <i class="fa fa-file-image" @click="download_graph_as_image()" data-html2canvas-ignore style="float:right;padding-top: 0.5rem;margin-right: 2%;cursor:pointer" title="Save as Image"></i> -->
                <a class="btn btn-primary" data-toggle="modal" data-target="#reportsModal" @click="fetch_summary" style="margin-left:auto;float:right;color:white;font-size:16px;padding:2px 6px;cursor:pointer" data-html2canvas-ignore> Add to Report </a>
                <a class="btn btn-primary" id="downloadGraphsButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="float:right;color:white;font-size:16px;padding:2px 6px;cursor:pointer;margin-left: 2%" data-html2canvas-ignore> Download</a>
                <div class="dropdown-menu" aria-labelledby="downloadGraphsButton" id="downloadGraphsDDL">
                      <div>
                        <div @click="download_graph_as_image()" style="text-align:left;cursor: pointer;margin:1% 8%">
                          <ul>
                           <li> Save As Image </li>
                          </ul>
                        </div>
                      </div>
                      <div>
                        <div @click="convert_to_csv('csv')" style="text-align:left;cursor: pointer;margin:1% 8%">
                          <ul>
                           <li> Save As CSV </li>
                          </ul>
                        </div>
                      </div>
                       <div>
                        <div @click="convert_to_csv('excel')" style="text-align:left;cursor: pointer;margin:1% 8%">
                          <ul>
                           <li> Save As Excel </li>
                          </ul>
                        </div>
                      </div>
                </div>
                </div>
                <hr style="margin-top:0.65rem">

                <!-- <div style="width:10%;margin-top:2%;cursor: pointer;"  v-if="show_chart_types">
                <div class="btn-group dropright">
                  <button type="button" class="btn btn-primary" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="background-color: #f7f7f7;border-color: #e3e8ec;">
                    <span v-html="new_graphs_icon_default_svg"></span>
                  </button>
                  <div class="dropdown-menu">
                    <span style="margin-left:5%">CHART</span> <hr style="margin:0">
                    <div style="margin:8%" v-for="(chart,index) in chart_types" :key="index">
                      <div  @click="change_graph_type(chart.type)">
                      <span
                        v-html="chart.icon"
                        style="margin-right:1%"
                       >
                      </span>
                        {{chart.name}}
                      </div>
                    </div>
                  </div>
                </div>
              </div> -->
              </div>
              <div v-if="show_heading && show_reports_list"  >
              <div style="margin-top: 3%;display:flex" >
                <h5 style="margin-bottom:auto;margin-top:autp">
                  <!-- <em>  -->
                    Reports
                  <!-- </em>  -->
                </h5>
                  <!-- <a class="btn btn-primary" data-toggle="modal" data-target="#reportsModal" style="float:right;margin-left:auto;color:white;font-size:16px;padding:2px 6px;cursor:pointer"> Add to Report </a> -->
                </div>
                <hr style="margin-top:0.65rem">
              </div>
              <!-- <div style="width:10%;float:right;margin-top:2%;cursor: pointer;"  v-if="show_chart_types">
                <div class="btn-group dropleft">
                  <button type="button" class="btn btn-primary" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="background-color: #f7f7f7;border-color: #e3e8ec;">
                    <span v-html="barchart_icon_svg"></span>
                  </button>
                  <div class="dropdown-menu">
                    <div style="margin:8%" v-for="(chart,index) in chart_types" :key="index">
                      <div  @click="change_graph_type(chart.type)">
                      <span
                        v-html="chart.icon"
                       >
                      </span>
                        {{chart.name}}
                      </div>
                    </div>
                  </div>
                </div>
              </div> -->
              <div style="display:flex" id="chart_div">
              <div style="width:64.11px;margin-top:2%;cursor: pointer;height: 15rem; border: 1px solid #eeee;border-radius: 105px;"  v-if="show_chart_types" id="dropdown_charts" data-html2canvas-ignore>
                <!-- <div class="btn-group dropright" style="margin-top:30%">
                  <button type="button" class="btn btn-primary" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="background-color: #f7f7f7;border-color: #e3e8ec;">
                    <span v-html="new_graphs_icon_default_svg" ></span>
                  </button>
                  <div class="dropdown-menu" >
                    <span style="margin-left:5%">CHART</span> <hr style="margin:0">
                    <div style="margin:8%" v-for="(chart,index) in chart_types" :key="index">
                      <div  @click="change_graph_type(chart.type)">
                      <span
                        v-html="chart.icon"
                        style="margin-right:1%"
                       >
                      </span>
                        {{chart.name}}
                      </div>
                    </div>
                  </div>
                </div> -->
                <div class="dropdown">
                  <div class="btn-group dropright" style="margin-top:30%">
                  <button type="button" class="btn btn-primary" id="graph_changeMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="background-color: #ffffff;border-color: #e3e8ec;height:43px;border:none;width:100%" @click="dropright_event_catcher" >
                     <span v-html="switch_graphs_icon_svg" ></span>
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="chart_types_dropdown">
                    <div class="row" style="margin:2%">
                      <div class="col" v-if="chart_types.length>0" style="margin:2%">
                        <div class="chart_type_div" @click="change_graph_type(chart_types[0].type)"  style="display:grid;text-align:center;">
                            <span
                              v-html="chart_types[0].icon"
                              style="margin: 5%;;text-align:center;"
                            >
                            </span>
                              {{chart_types[0].name}}
                        </div>
                      </div>
                      <div class="col" v-if="chart_types.length>1" style="margin:2%">
                         <div class="chart_type_div" @click="change_graph_type(chart_types[1].type)" style="display:grid;text-align:center;">
                            <span
                              v-html="chart_types[1].icon"
                              style="margin: 5%;;text-align:center;"
                            >
                            </span>
                              {{chart_types[1].name}}
                          </div>
                      </div>
                      <div class="col" v-if="chart_types.length>2" style="margin:2%">
                         <div class="chart_type_div" @click="change_graph_type(chart_types[2].type)" style="display:grid;text-align:center;">
                            <span
                              v-html="chart_types[2].icon"
                              style="margin: 5%;;text-align:center;"
                            >
                            </span>
                              {{chart_types[2].name}}
                          </div>
                      </div>
                      <div class="col" v-if="chart_types.length==3"></div>
                      <div class="w-100"></div>
                      <div class="col" v-if="chart_types.length>3" style="margin:2%">
                         <div class="chart_type_div" @click="change_graph_type(chart_types[3].type)" style="display:grid;text-align:center;">
                            <span
                              v-html="chart_types[3].icon"
                              style="margin: 5%;;text-align:center;"
                            >
                            </span>
                              {{chart_types[3].name}}
                          </div>
                      </div>
                      <div class="col" v-if="chart_types.length>4" style="margin:2%">
                        <div class="chart_type_div" @click="change_graph_type(chart_types[4].type)" style="display:grid;text-align:center;">
                          <span
                            v-html="chart_types[4].icon"
                            style="margin: 5%;text-align:center;"
                          >
                          </span>
                            {{chart_types[4].name}}
                        </div>
                        <!-- {{chart_types}} -->
                      </div>
                      <div class="col" v-if="chart_types.length>3"></div>
                      <!-- <div class="col" v-if="chart_types.length>3"></div> -->
                      <!-- <div class="col">Column</div>
                      <div class="col">Column</div> -->
                    </div>
                    <!-- <div class="row" style="  display: flex;flex-wrap: wrap;">
                      <div class="col" style="border: none !important;width: 50%;margin-bottom:1rem;margin-left: 1rem;" v-for="(chart,index) in chart_types" :key="index">
                        <div  @click="change_graph_type(chart.type)" >
                            <span
                              v-html="chart.icon"
                              style="margin-right:1%"
                            >
                            </span>
                              {{chart.name}}
                          </div>
                      </div>
                    </div> -->
                  </div>
                  </div>
                </div>
                <!-- <div class="dropdown"> -->
                  <!-- <div class="btn-group dropright" style="margin-top:30%">   -->
                  <!-- <button type="button" class="btn btn-primary" style="background-color: #ffffff;border-color: #e3e8ec;height:43px;border:none;width:100%" @click="show_reports_list = !show_reports_list">
                     <span v-html="reports_list_icon_to_be_shown" style="padding-right:0.25rem"></span>
                  </button> -->
                  <!-- <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="reports_dropdown"> -->
                    <!-- <table class="table" style="border-bottom: 1px solid #dbe2e8;margin-top:1%">
                      <tr style="text-align:left">
                        <td>Report Name</td>
                      </tr>
                    </table> -->
                  <!-- </div> -->
                  <!-- </div>
                </div> -->
              </div>


            <div
              class="col-sm-12 report-div"
              v-if="show_linegraph && !show_table && !show_piechart && !show_bargraph"
              style="display:flex"
            >
              <!-- <div class="col-sm-1"></div> -->
              <div class="col-sm-12">
                <!-- <line-chart
                  :data="line_graph_data"
                  :xKey="line_graph_xKey"
                  :yKey="line_graph_yKey"
                /> -->
                <line-chartnew
                :data="line_graph_data"
                :xKey="line_graph_xKey"
                :yKey="line_graph_yKey"/>
                <!-- <line-chart2
                :data="line_graph_data"
                :xKey="line_graph_xKey"
                :yKey="line_graph_yKey"
                /> -->
                <!-- <multi-linechart /> -->
                <!-- <multi-linechart2
                :apiData="multi_line_graph_data"
                xKey="Drug Active Ingredient"
                yKey="Unique Patient Count"
                dateKey="DATENEW"
                /> -->
                <!-- <multi-linechart3 /> -->
              </div>
              <!-- <div class="col-sm-2"></div> -->
            </div>
            <div
              class="col-sm-12 report-div"
              v-if="show_multi_line_graph && !show_linegraph && !show_table && !show_piechart && !show_bargraph"
              style="display:flex"
            >
              <!-- <div class="col-sm-1"></div> -->
              <div class="col-sm-12">
                <!-- <line-chart
                  :data="line_graph_data"
                  :xKey="line_graph_xKey"
                  :yKey="line_graph_yKey"
                /> -->
                <!-- <line-chart2
                :data="line_graph_data"
                :xKey="line_graph_xKey"
                :yKey="line_graph_yKey"
                /> -->
                <!-- <multi-linechart /> -->
                <multi-linechart2
                :apiData="multi_line_graph_data"
                :xKey="multi_line_graph_xKey"
                :yKey="multi_line_graph_yKey"
                :dateKey="multi_line_graph_dateKey"
                />
                <!-- <multi-linechart3 /> -->
              </div>
              <!-- <div class="col-sm-2"></div> -->
            </div>
            <!-- <bar-chart
                v-if="show_bargraph"
                :title="chart_title"
                :xKey="bar_chart_xKey"
                :yKey="bar_chart_yKey"
                :data="barChartData"
            ></bar-chart>-->
            <div
              class="col-sm-11 report-div"
              v-if="show_bargraph && !show_linegraph && !show_table && !show_piechart"
              style="display:flex;margin-top:2%"
            >
              <!-- <div class="col-sm-3"></div> -->
              <!-- <div class="col-sm-8"> -->
                <!-- <bar-chart
                  :xKey="bar_chart_xKey"
                  :yKey="bar_chart_yKey"
                  :data="barChartData"
                  :currency_key="bar_chart_currency_key"
                ></bar-chart> -->
                <bar-chart2
                  :data="barChartData"
                  :xKey="bar_chart_xKey"
                  :yKey="bar_chart_yKey"
                  :currency_key="bar_chart_currency_key"
                />
              <!-- </div>
              <div class="col-sm-2"></div> -->
            </div>

            <div
              class="col-sm-11 report-div"
              v-if="show_scrollable_bargraph && !show_bargraph && !show_linegraph && !show_table && !show_piechart"
              style="display:flex;margin-top:2%"
            >
              <!-- <div class="col-sm-3"></div> -->
              <!-- <div class="col-sm-8"> -->
                <!-- <bar-chart
                  v-if="show_bargraph"
                  :title="chart_title"
                  :xKey="bar_chart_xKey"
                  :yKey="bar_chart_yKey"
                  :data="barChartData"
                ></bar-chart> -->
                <!-- <scrollable-bar/> -->
                <!-- <new-donut/> -->

                  <!-- :data="barChartData"
                  :xKey="bar_chart_xKey"
                  :yKey="bar_chart_yKey" -->
                <!-- /> -->
              <!-- </div>
              <div class="col-sm-2"></div> -->
            </div>


              <div
              class="col-sm-11 report-div"
              v-if=" show_horizontal_bargraph && !show_bargraph && !show_linegraph && !show_table && !show_piechart"
              style="display:flex;margin-top:2%"
            >
                <horizontal-barchart
                  :xKey="horizontal_bar_chart_xKey"
                  :yKey="horizontal_bar_chart_yKey"
                  :data="horizontal_bar_chart_data"
                  :currency_key="horizontal_bar_chart_currency_key"
                ></horizontal-barchart>
                <!-- <horizontal-barchart
                ></horizontal-barchart> -->
            </div>
            <div
              class="col-sm-11 report-div"
              v-if="show_piechart && !show_bargraph && !show_linegraph && !show_table"
              style="display:flex"
            >
              <!-- <div class="col-sm-2"></div> -->
              <div class="col-sm-10">
                <!-- <pie
                  :data="pieChartData"
                  :xKey="pie_chart_xKey"
                  :yKey="pie_chart_yKey"
                  :svgheight="300"
                  :svgwidth="500"
                /> -->
                <new-pie
                  :data="pieChartData"
                  :xKey="pie_chart_xKey"
                  :yKey="pie_chart_yKey"
                  :currency_key="pie_chart_currency_key"
                />
              </div>
              <!-- <div class="col-sm-2"></div> -->
            </div>
             <div
              class="col-sm-11 report-div"
              v-if="show_2d_donut_chart && !show_piechart && !show_bargraph && !show_linegraph && !show_table"
              style="display:flex"
            >
              <!-- <div class="col-sm-2"></div> -->
              <div class="col-sm-10">
                <!-- <pie
                  :data="pieChartData"
                  :xKey="pie_chart_xKey"
                  :yKey="pie_chart_yKey"
                  :svgheight="300"
                  :svgwidth="500"
                /> -->
                <!-- <donut-chart
                  :data="donut_chart_Data"
                  :xKey="donut_chart_xKey"
                  :yKey="donut_chart_yKey"
                /> -->
                <new-donut
                  :data="donut_chart_Data"
                  :xKey="donut_chart_xKey"
                  :yKey="donut_chart_yKey"
                  :currency_key="donut_chart_currency_key"
                  />
              </div>
              <!-- <div class="col-sm-2"></div> -->
            </div>
            <div
              class="col-sm-11 report-div"
              v-if="show_grouped_bar_chart  && !show_2d_donut_chart && !show_piechart && !show_bargraph && !show_linegraph && !show_table"
              style="display:flex"
            >
              <!-- <div class="col-sm-1"></div> -->
              <div class="col-sm-10">
                <!-- <pie
                  :data="pieChartData"
                  :xKey="pie_chart_xKey"
                  :yKey="pie_chart_yKey"
                  :svgheight="300"
                  :svgwidth="500"
                /> -->
                <grouped-bar
                  :data="grouped_bar_chart_data"
                  :xKey="grouped_bar_chart_xKey"
                  :yKey="grouped_bar_chart_yKey"
                  :primary_col  ="grouped_bar_chart_primary_column"
                  :secondary_col="grouped_bar_chart_secondary_column"
                  :currency_key="grouped_bar_chart_currency_key"
                />
              </div>
              <!-- <div class="col-sm-2"></div> -->
            </div>
               <div
              class="col-sm-12 report-div"
              v-if="show_stacked_bar_chart_non_time && !show_stacked_bar_chart && !show_grouped_bar_chart && !show_2d_donut_chart && !show_piechart && !show_bargraph && !show_linegraph && !show_table"
              style="display:flex"
            >
              <!-- <div class="col-sm-1"></div> -->
              <div class="col-sm-12">
                <!-- <pie
                  :data="pieChartData"
                  :xKey="pie_chart_xKey"
                  :yKey="pie_chart_yKey"
                  :svgheight="300"
                  :svgwidth="500"
                /> -->
                <stackedbar-nontime
                  :data="stacked_bar_chart_non_time_data"
                  :xKey="stacked_bar_chart_non_time_xKey"
                  :yKey="stacked_bar_chart_non_time_yKey"
                  :primary_col  ="stacked_bar_chart_non_time_primary_column"
                  :secondary_col="stacked_bar_chart_non_time_secondary_column"
                  :currency_key="stacked_bar_chart_non_time_currency_key"
                />
              </div>
              <!-- <div class="col-sm-2"></div> -->
            </div>
            <div
              class="col-sm-12 report-div"
              v-if="show_stacked_bar_chart  && !show_grouped_bar_chart && !show_2d_donut_chart && !show_piechart && !show_bargraph && !show_linegraph && !show_table"
              style="display:flex"
            >
              <!-- <div class="col-sm-2"></div> -->
              <div class="col-sm-12">
                <!-- <pie
                  :data="pieChartData"
                  :xKey="pie_chart_xKey"
                  :yKey="pie_chart_yKey"
                  :svgheight="300"
                  :svgwidth="500"
                /> -->
                <stacked-bar
                  :data="stacked_bar_chart_data"
                  :xKey="stacked_bar_chart_xKey"
                  :yKey="stacked_bar_chart_yKey"
                  :date_column  ="stacked_bar_chart_dateKey"
                />
              </div>
              <!-- <div class="col-sm-2"></div> -->
            </div>
            <!-- <div style="width:40%;margin-top:5%">  </div> -->
            <transition name="fade" mode="out-in">
            <div
              class="col-sm-11 report-div"
              v-if="show_table && !show_piechart && !show_bargraph && !show_linegraph && !show_bargraph"
              style="display:flex;"
            >
              <!-- <div class="col-sm-3"></div> -->
              <div class="col-sm-12">
                <!-- <b-table
                  responsive
                  sticky-header
                  :striped="true"
                  :bordered="true"
                  hover
                  small
                  stacked="sm"
                  :items="table_data"
                ></b-table> -->
                <tabulator-table
                :data="tabulator_data"
                :xKey="tabulator_xKey"
                :yKey="tabulator_yKey"
                :currency_key="tabulator_currency_key"
                :heading="heading">
                </tabulator-table>
              </div>
              <!-- <div class="col-sm-2"></div> -->
            </div>
            </transition>
            <transition name="fade" mode="out-in">
            <div
              class="col-sm-12 report-div"
              v-if="show_grouped_table && !show_table && !show_piechart && !show_bargraph && !show_linegraph && !show_bargraph"
              style="display:flex;"
            >
              <!-- <div class="col-sm-3"></div> -->
              <div class="col-sm-11">
                <!-- <b-table
                  responsive
                  sticky-header
                  :striped="true"
                  :bordered="true"
                  hover
                  small
                  stacked="sm"
                  :items="table_data"
                ></b-table> -->
                <grouped-tabulator-table
                :data="grouped_tabulator_data"
                :xKey="grouped_tabulator_xKey"
                :yKey="grouped_tabulator_yKey"
                :primary_col  ="grouped_tabulator_primary_column"
                :secondary_col="grouped_tabulator_secondary_column"
                :currency_key="grouped_tabulator_currency_key"
                :heading="heading">
                </grouped-tabulator-table>
              </div>
              <!-- <div class="col-sm-2"></div> -->
            </div>
            </transition>

             <div v-if="show_reports_list" style="width:100%">
              <div class="col-sm-12" style="padding-right:0">
                <table v-if="reports_list.length > 0" class="table" style="border: 1px solid #dbe2e8;margin-top:1%;min-width:50rem">
                      <tr style="text-align:left">
                        <th>Report Name</th>
                        <th style="text-align:center">View</th>
                        <th style="text-align:center"> Download </th>
                        <th style="text-align:center"> Delete </th>
                      </tr>
                       <tr v-for="(report,index) in reports_list "
                          :key="index">
                          <td style="width:80%"> {{report.title}}</td>
                          <td style="text-align:center" v-if="!report.is_report_ready" @click="check_report_status(index)">
                            <span style="cursor:pointer" v-html="refresh_icon_svg"></span>
                          </td>
                          <td style="text-align:center" v-else>
                            <i style="cursor:pointer" class="fa fa-eye" aria-hidden="true" @click="get_report_url(index,'view')"></i>
                            </td>
                          <td style="text-align:center" v-if="!report.is_report_ready" @click="check_report_status(index)">
                            <span v-html="refresh_icon_svg"></span>
                          </td>
                          <td style="text-align:center" v-else>
                            <i style="cursor:pointer" class="fa fa-download" aria-hidden="true" @click="get_report_url(index,'download')"></i>
                          </td>
                          <td style="text-align:center;">
                            <!-- <button
                              class="save_node_button"
                              style="margin-left: 3%;height: 30px;padding-top: 0px;padding-left: 10px;padding-right: 10px;padding-bottom: 0px;background: #F23D3D;border: solid 1px #F23D3D;"
                              @click="delete_report(index)"
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
                            </button> -->
                            <i @click="delete_report(index)" style="cursor:pointer" class="fa fa-trash" aria-hidden="true"></i>
                          </td>
                       </tr>
                </table>
                <table v-else class="table" style="border: 1px solid #dbe2e8;margin-top:1%;min-width:50rem">
                    <tr style="text-align:left">
                        <th style="width:60%">Report Name</th>
                        <th style="text-align:center">View</th>
                        <th style="text-align:center"> Download </th>
                        <th style="text-align:center"> Delete </th>
                    </tr>
                    <tr>
                      <td colspan="4" style="text-align:center;"> <b> No Reports Yet </b></td>
                    </tr>

                </table>
                <!-- <p v-else> No Reports Yet </p> -->
              </div>
            </div>
            </div>

          </div>
          <div class="modal fade" id="reportsModal" role="dialog" aria-labelledby="reportsModalLabel" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog" role="document">
              <div class="modal-content" style="width: 112%;">
                <div class="modal-header">
                  <h5 class="modal-title" id="reportsModalLabel">{{report_modal_title_text}}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="clear_report_modal_values">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form @submit="add_report">
                    <div class="form-group">
                        <input
                        type="text"
                        v-model="report_name"
                        class="form-control"
                        style="height: 40px !important;padding-left:12px;"
                        required
                        placeholder="Report Name"
                        :disabled="report_name_disabled"
                        />
                    </div>
                    <div class="form-group">
                        <textarea class="form-control" id="search_report_comment" v-model="report_comments" rows="4" cols="150" style="padding-left:12px;resize:none;overflow-y:auto;min-height:305px" placeholder="Generating A Summary"></textarea>
                    </div>
                    <div class="form-group">
                      <multiselect
                            :close-on-select="true"
                            :taggable="false"
                            :multiple="false"
                            :options="reports_list"
                            placeholder="Append To Old Report"
                            track-by="id"
                            label="title"
                            v-model="report_append_to_old"
                      ></multiselect>
                    </div>
                  <div style="text-align:center">
                  <button type="submit" class="btn btn-primary">{{report_submit_button_text}}</button>
                  </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="modal fade" id="viewReportModal" v-if="show_reports_list && reports_list.length > 0">
              <div class="modal-dialog modal-lg">
                <div class="modal-content">

                  <!-- Modal Header -->
                  <div class="modal-header">
                    <h4 class="modal-title">Preview of Report:
                       {{reports_list[current_viewed_report].title}}
                        </h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                  </div>

                  <!-- Modal body -->
                  <div class="modal-body">
                  <iframe v-if="reports_list[current_viewed_report].file_url_to_be_displayed" :src="reports_list[current_viewed_report].file_url_to_be_displayed"
                    width="100%" height="600px" />
                  </div>

                </div>
              </div>
            </div>
        </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import Swal from "sweetalert2";
import api_calls from "@/portal/api_calls";
import Multiselect from "vue-multiselect";
// import VoerroTagsInput from "@voerro/vue-tagsinput";
import "@/portal/analytics/tags_input/style.css";
import "@/portal/analytics/components/style.css";
// import VueTagsInput from "@johmun/vue-tags-input";
// import * as d3 from "d3";
import BarChart from "@/portal/analytics/components/Bargraph.vue";
import BarChart2 from "@/portal/analytics/components/Barchart.vue";
import Pie from "@/portal/analytics/components/Piechart.vue";
import LineChart from "@/portal/analytics/components/Linechart.vue";
import LineChart2 from "@/portal/analytics/components/LineChartAlternative.vue";
import MultiLineChart from "@/portal/analytics/components/MultiLineChart.vue";
import MultiLineChartAlternative from "@/portal/analytics/components/MultiLineChartAlternative.vue";
import MultiLineChart2 from "@/portal/analytics/components/MultiLineChart-2.vue";
import HorizontalBarchart from "@/portal/analytics/components/HorizontalBarchart.vue";
import LineChartNew from "@/portal/analytics/components/LineChartNew.vue";
import NewPie from "@/portal/analytics/components/NewPieChart.vue"
import NewDonut from "@/portal/analytics/components/NewDonut.vue"
import DonutChart from "@/portal/analytics/components/2D-Donut/DonutChart.vue"
import GroupedBar from "@/portal/analytics/components/GroupedBarChart.vue"
import StackedBarChart from "@/portal/analytics/components/StackedBarChart.vue"
import StackedBarChartNonTime from "@/portal/analytics/components/StackedBarchartNonTime.vue"
import ScrollableBarChart from "@/portal/analytics/components/ScrollableBarChart.vue"
import TabulatorTable from "@/portal/analytics/components/TabulatorTable.vue"
import GroupedTabulatorTable from "@/portal/analytics/components/GroupedTabulatorTable.vue"
import { BootstrapVue, IconsPlugin, BTable } from "bootstrap-vue";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VoerroTagsInputSecond from "@/portal/analytics/tags_input/VoerroTagsInput.vue"
import moment from "moment";
import country_iso_codes from "@/portal/analytics/country_iso_codes.json";
import domtoimage from 'dom-to-image';
import html2canvas from 'html2canvas';
// import "tabulator-tables/dist/css/tabulator.css";
import "tabulator-tables/dist/css/tabulator_modern.min.css"
import XLSX from 'xlsx';
export default {
  name: "BiDashboard",
  components: {
    Multiselect,
    // "tags-input": VoerroTagsInput,
    "bar-chart": BarChart,
    pie: Pie,
    "line-chart": LineChart,
    "line-chart2": LineChart2,
    "bar-chart2": BarChart2,
    "b-table": BTable,
    "tag-tag":VoerroTagsInputSecond,
    "multi-linechart": MultiLineChart,
    "multi-linechart2": MultiLineChartAlternative,
    "multi-linechart3": MultiLineChart2,
    "horizontal-barchart": HorizontalBarchart,
    "line-chartnew":LineChartNew,
    "new-pie": NewPie,
    "donut-chart":DonutChart,
    "grouped-bar":GroupedBar,
    "stacked-bar": StackedBarChart,
    "scrollable-bar": ScrollableBarChart,
    "stackedbar-nontime": StackedBarChartNonTime,
    "new-donut": NewDonut,
    "tabulator-table": TabulatorTable,
    "grouped-tabulator-table": GroupedTabulatorTable
  },
  data() {
    return {
      show_loader: false,
      spinnerOn: false,
      columns: [],
      metrics: [],
      file_label: "Choose file",
      is_file_uploaded: true,
      newcolumns: [],
      iscolumnsnamechanged: false,
      object_name: "",
      metricsdata: "",
      ismetricssaved: false,
      search_data: [],
      search_result: [],
      barChartData: [],
      search_saved_data: "",
      chart_title: "My Chart",
      bar_graph_xKey: "",
      bar_graph_yKey: "",
      dataset_name: null,
      show_bargraph: false,
      show_piechart: false,
      show_linegraph: false,
      pieChartData: [],
      pie_chart_xKey: "",
      pie_chart_yKey: "",
      line_graph_data: [],
      line_graph_xKey: "",
      line_graph_yKey: "",
      bar_chart_data: [],
      bar_chart_xKey: "",
      bar_chart_yKey: "",
      show_table: false,
      table_data: [],
      error_text: "",
      error_text_show: false,
      check_duplicate: 0,
      callapi : true,
      show_heading: false,
      heading: "",
      multi_line_graph_data : [],
      show_multi_line_graph : false,
      multi_line_graph_xKey :"Drug Active Ingredient",
      multi_line_graph_yKey :"Unique Patient Count",
      multi_line_graph_dateKey:"DATENEW",
      show_horizontal_bargraph: false,
      horizontal_bar_chart_data: [],
      horizontal_bar_chart_xKey: "",
      horizontal_bar_chart_yKey: "",
      donut_chart_Data: [],
      donut_chart_xKey: "",
      donut_chart_yKey: "",
      tabulator_data: [],
      tabulator_xKey: "",
      tabulator_yKey: "",
      show_2d_donut_chart: false,
      grouped_bar_chart_data: [],
      grouped_bar_chart_xKey: "",
      grouped_bar_chart_yKey: "",
      show_grouped_bar_chart: false,
      grouped_bar_chart_primary_column :"",
      grouped_bar_chart_secondary_column :"",
      show_stacked_bar_chart: false,
      stacked_bar_chart_data: [],
      stacked_bar_chart_xKey: "",
      stacked_bar_chart_yKey: "",
      stacked_bar_chart_dateKey: "",
      show_scrollable_bargraph: false,
      show_stacked_bar_chart_non_time:false,
      stacked_bar_chart_non_time_data :[] ,
      stacked_bar_chart_non_time_xKey : "" ,
      stacked_bar_chart_non_time_yKey : "" ,
      stacked_bar_chart_non_time_primary_column   : "",
      stacked_bar_chart_non_time_secondary_column : "",
      nlp_search: true,
      chart_types: [],
      chart_types_to_be_displayed: [],
      show_chart_types:false,
      search_icon_svg: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 1235.000000 1280.000000" preserveAspectRatio="xMidYMid meet" id="svgcontent" overflow="visible" x="1235" y="1280"><metadata>Created by potrace 1.15, written by Peter Selinger 2001-2017</metadata><g class="layer" style="pointer-events:all"><title style="pointer-events:inherit">Layer 1</title><g transform="translate(0 1280) scale(0.1 -0.1)" fill="#e91e63" stroke="none" id="svg_1" fill-opacity="1"><path d="M4165,12794C3568,12750 3097,12627 2605,12385C2309,12239 2037,12063 1800,11861C1663,11745 1236,11344 1113,11216C578,10659 214,9946 71,9175C-6,8758 -17,8296 40,7870C205,6632 909,5522 1970,4827C2184,4687 2471,4537 2705,4442C3606,4077 4624,4037 5530,4331C5865,4440 6189,4595 6481,4785L6577,4848L7376,4036C11014,342 11250,104 11301,73C11392,19 11435,7 11545,7C11639,6 11650,9 11720,42C11798,78 11807,85 12071,331C12247,494 12268,517 12299,578C12373,723 12362,902 12272,1038C12256,1061 11310,2028 10169,3187C9028,4345 7988,5403 7857,5536L7618,5779L7687,5857C8070,6293 8368,6854 8526,7433C8733,8197 8712,9031 8468,9790C8108,10910 7307,11841 6255,12360C5798,12585 5352,12716 4830,12776C4710,12790 4269,12802 4165,12794zM4287,11560C4942,11506 5529,11285 6044,10899C6862,10284 7359,9362 7408,8370C7446,7600 7230,6883 6780,6282C6642,6097 6552,6011 6377,5895C5951,5614 5473,5441 4966,5385C4707,5356 4323,5369 4055,5415C2724,5645 1632,6692 1335,8024C1276,8292 1266,8388 1266,8735C1266,9017 1269,9072 1288,9197C1378,9770 1586,10264 1918,10688C2045,10851 2091,10898 2205,10979C2806,11409 3559,11619 4287,11560z" id="svg_2" fill="#999999"></path></g></g></svg>',
      donut_2d_icon_svg: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><path d="M256,0C114.833,0,0,114.844,0,256s114.833,256,256,256c68.375,0,132.667-26.625,181.021-74.979C485.375,388.667,512,324.385,512,256C512,114.844,397.167,0,256,0z M266.667,21.573c120.917,5.438,218.313,102.844,223.771,223.76H383.563c-5.146-62.083-54.813-111.75-116.896-116.896V21.573z M362.667,256c0,28.5-11.104,55.281-31.25,75.427c-20.146,20.146-46.938,31.24-75.417,31.24c-58.813,0-106.667-47.854-106.667-106.667S197.188,149.333,256,149.333S362.667,197.188,362.667,256z M256,490.667C126.604,490.667,21.333,385.396,21.333,256c0-125.796,99.57-228.492,224-234.126V128.54C179.734,133.99,128,189.017,128,256c0,70.583,57.417,128,128,128c30.602,0,59.522-10.737,82.592-30.314l75.436,75.427C370.708,468.738,315.102,490.667,256,490.667z M429.313,414.229l-75.583-75.563c17.289-20.358,27.139-45.395,29.34-72h107.108C487.717,321.786,466.555,373.523,429.313,414.229z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>',
      barchart_icon_svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="24" height="24"  viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g>	<g><path d="M501.333,469.333h-10.667V32c0-5.896-4.771-10.667-10.667-10.667H373.333c-5.896,0-10.667,4.771-10.667,10.667v437.333H320V138.667c0-5.896-4.771-10.667-10.667-10.667H202.667c-5.896,0-10.667,4.771-10.667,10.667v330.667h-42.667v-224c0-5.896-4.771-10.667-10.667-10.667H32c-5.896,0-10.667,4.771-10.667,10.667v224H10.667C4.771,469.333,0,474.104,0,480c0,5.896,4.771,10.667,10.667,10.667h490.667c5.896,0,10.667-4.771,10.667-10.667C512,474.104,507.229,469.333,501.333,469.333zM128,469.333H42.667V256H128V469.333z M298.667,469.333h-85.333v-320h85.333V469.333z M469.333,469.333H384V42.667h85.333    V469.333z"/>	</g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>',
      pie_2d_icon_svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="24" height="24"  viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g>	<g><path d="M256,0C114.844,0,0,114.844,0,256s114.844,256,256,256s256-114.844,256-256S397.156,0,256,0z M266.667,21.874c120.868,5.473,217.987,102.591,223.46,223.46h-223.46V21.874z M256,490.667C126.604,490.667,21.333,385.396,21.333,256c0-125.796,99.57-228.492,224-234.126V256c0,2.833,1.125,5.542,3.125,7.542l165.497,165.497C372.212,467.178,316.866,490.667,256,490.667z M429.039,413.956L281.75,266.667h208.376C487.561,323.31,464.922,374.681,429.039,413.956z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>',
      line_chart_icon_svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="24" height="24" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><g><path d="M501.333,448H64V10.667C64,4.771,59.229,0,53.333,0c-5.896,0-10.667,4.771-10.667,10.667V448h-32C4.771,448,0,452.771,0,458.667s4.771,10.667,10.667,10.667h32v32c0,5.896,4.771,10.667,10.667,10.667C59.229,512,64,507.229,64,501.333v-32h437.333c5.896,0,10.667-4.771,10.667-10.667S507.229,448,501.333,448z"/><path d="M110.938,403.198c1.917,1.438,4.167,2.135,6.396,2.135c3.229,0,6.438-1.469,8.542-4.271l45.987-61.323c3.013,0.943,6.152,1.594,9.471,1.594c3.319,0,6.458-0.651,9.471-1.594l45.987,61.323c2.042,2.719,5.208,4.271,8.542,4.271c0.563,0,1.146-0.042,1.708-0.135c3.917-0.635,7.167-3.396,8.417-7.156l54.475-163.436c4.109-0.078,8.038-0.897,11.633-2.391l75.829,84.254c2.063,2.281,4.958,3.531,7.938,3.531c0.917,0,1.854-0.125,2.771-0.365c3.896-1.052,6.854-4.188,7.667-8.125l47.204-226.612c15.595-2.129,27.691-15.395,27.691-31.565c0-17.646-14.354-32-32-32s-32,14.354-32,32c0,11.559,6.219,21.615,15.428,27.238l-42.908,205.98l-61.85-68.723c2.466-4.534,3.996-9.648,3.996-15.163c0-17.646-14.354-32-32-32c-17.646,0-32,14.354-32,32c0,10.219,4.904,19.23,12.383,25.092l-48.07,144.22l-33.691-44.94c3.387-5.076,5.379-11.159,5.379-17.706c0-17.646-14.354-32-32-32c-17.646,0-32,14.354-32,32c0,6.547,1.991,12.629,5.378,17.704l-45.919,61.233C105.271,392.979,106.229,399.667,110.938,403.198z M458.667,42.667c5.875,0,10.667,4.781,10.667,10.667c0,5.885-4.792,10.667-10.667,10.667c-0.415,0-0.768-0.19-1.172-0.237c-0.329-0.103-0.587-0.327-0.932-0.398     c-0.357-0.074-0.701,0.033-1.057-0.004C451.194,61.993,448,58.096,448,53.333C448,47.448,452.792,42.667,458.667,42.667z      M309.333,192c5.875,0,10.667,4.781,10.667,10.667c0,2.895-1.178,5.505-3.055,7.428c-0.191,0.151-0.428,0.197-0.612,0.363     c-0.072,0.064-0.095,0.156-0.164,0.221c-1.863,1.591-4.202,2.654-6.836,2.654c-1.047,0-1.996-0.315-2.953-0.598     c-0.126-0.047-0.21-0.151-0.339-0.194c-0.316-0.104-0.635-0.042-0.954-0.116c-3.764-1.647-6.421-5.389-6.421-9.759     C298.667,196.781,303.458,192,309.333,192z M181.333,298.667c5.875,0,10.667,4.781,10.667,10.667     c0,3.066-1.337,5.785-3.414,7.732c-0.345,0.203-0.738,0.262-1.065,0.508c-0.197,0.148-0.288,0.37-0.471,0.529c-1.678,1.099-3.568,1.898-5.716,1.898c-2.15,0-4.039-0.798-5.717-1.898c-0.184-0.158-0.273-0.382-0.47-0.529c-0.324-0.242-0.714-0.299-1.055-0.5c-2.082-1.947-3.424-4.669-3.424-7.74C170.667,303.448,175.458,298.667,181.333,298.667z"/></g></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>',
      multi_line_chart_icon_svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="24" height="24" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g>	<g><path d="M501.333,448h-10.667V32c0-4.042-2.281-7.729-5.896-9.542c-3.594-1.771-7.938-1.406-11.167,1.01l-81.271,60.948l-80.417-20.094c-2.75-0.698-5.635-0.26-8.073,1.198l-106.667,64c-1.177,0.708-2.219,1.646-3.042,2.75l-60.802,81.063H64V10.667C64,4.771,59.229,0,53.333,0c-5.896,0-10.667,4.771-10.667,10.667V448h-32C4.771,448,0,452.771,0,458.667s4.771,10.667,10.667,10.667h32v32c0,5.896,4.771,10.667,10.667,10.667C59.229,512,64,507.229,64,501.333v-32h437.333c5.896,0,10.667-4.771,10.667-10.667S507.229,448,501.333,448z M469.333,448H64v-6.25l76.021-76.021l56.729,37.813c3.417,2.271,7.844,2.396,11.406,0.271l104.135-62.479h82.375c2.583,0,5.083-0.938,7.021-2.635l67.646-59.19V448zM469.333,251.159L390.656,320h-81.323c-1.938,0-3.833,0.521-5.49,1.521l-100.875,60.531l-58.385-38.927c-4.219-2.813-9.854-2.26-13.458,1.333L64,411.583V337.26l75.49-37.74l59.802,19.927c4.198,1.406,8.771,0.073,11.573-3.281L313.24,193.302l78.844,19.708c2.427,0.615,5.083,0.323,7.354-0.802l69.896-34.948V251.159z M469.333,153.406l-75.906,37.958l-81.51-20.375c-3.917-1.021-8.146,0.375-10.781,3.51l-102,122.417l-57.094-19.031c-2.688-0.917-5.594-0.708-8.146,0.573L64,313.406v-78.74h74.667c3.354,0,6.521-1.583,8.531-4.271l62.75-83.656l101.083-60.656l81.052,20.26c3.125,0.802,6.417,0.115,8.979-1.813l68.271-51.198V153.406z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>',
      grouped_bar_chart_icon_svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" width="22" height="22" style="width:20%;height:20%;background-size:initial;background-repeat-y:initial;background-repeat-x:initial;background-position-y:initial;background-position-x:initial;background-origin:initial;background-image:initial;background-color:rgb(241, 242, 243);background-clip:initial;background-attachment:initial;animation-play-state:paused"><g class="ldl-scale" style="transform-origin:50% 50%;transform:rotate(0deg) scale(0.8, 0.8);animation-play-state:paused"><path fill="#333" d="M16.4 95H5V80h11.4v15zm14-90H18.9v90h11.4V5zm19 43.2H38V95h11.4V48.2zm2.5-22.4V95H62V25.8H51.9zM81.1 95H69.6V66.1H81V95zM95 37.2H83.6V95H95V37.2z" style="fill:rgb(21, 33, 43);animation-play-state:paused"/><metadata xmlns:d="https://loading.io/stock/" style="animation-play-state:paused"><d:name style="animation-play-state:paused">grouped bar chart</d:name><d:tags style="animation-play-state:paused">grouped bar chart,column chart,rectangle,square,statistics,dashboard,visualization,visualize</d:tags><d:license style="animation-play-state:paused">by</d:license><d:slug style="animation-play-state:paused">fhmk4i</d:slug></metadata></g><!-- generated by https://loading.io/ --></svg>',
      horizontal_bar_chart_icon_svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 384" width="24" height="24"><path d="m352 272h-320v-24h256c17.648438 0 32-14.351562 32-32v-48c0-17.648438-14.351562-32-32-32h-256v-24h192c17.648438 0 32-14.351562 32-32v-48c0-17.648438-14.351562-32-32-32h-208c-8.832031 0-16 7.167969-16 16v352c0 8.832031 7.167969 16 16 16h336c17.648438 0 32-14.351562 32-32v-48c0-17.648438-14.351562-32-32-32zm-64-104v48h-256v-48zm-64-88h-192v-48h192zm128 272h-320v-48h320zm0 0"/></svg>',
      stacked_bar_chart_icon_svg: '<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" width="24" height="24" style="background-size:initial;background-repeat-y:initial;background-repeat-x:initial;background-position-y:initial;background-position-x:initial;background-origin:initial;background-image:initial;background-color:rgb(255, 255, 255);background-clip:initial;background-attachment:initial;animation-play-state:paused"><g class="ldl-scale" style="transform-origin:50% 50%;transform:rotate(0deg) scale(0.8, 0.8);animation-play-state:paused"><path fill="#333" d="M22 95H5V80h17v15zm0-41H5v22h17V54zm25 5H29v36h18V59zm0-30H29v26h18V29zm24 56H53v10h18V85zm-18-4h18V5H53v76zm25-6v20h17V75H78zm0-31v27h17V44H78z" style="fill:rgb(51, 51, 51);animation-play-state:paused"/><metadata xmlns:d="https://loading.io/stock/" style="animation-play-state:paused"><d:name style="animation-play-state:paused">stacked bar chart</d:name><d:tags style="animation-play-state:paused">stacked bar chart,column chart,rectangle,square,statistics,dashboard,visualization,visualize</d:tags><d:license style="animation-play-state:paused">by</d:license><d:slug style="animation-play-state:paused">m1hpvs</d:slug></metadata></g></svg>',
      dataset_icon_svg :'<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 18.055v2.458c0 1.925-4.655 3.487-10 3.487-5.344 0-10-1.562-10-3.487v-2.458c2.418 1.738 7.005 2.256 10 2.256 3.006 0 7.588-.523 10-2.256zm-10-3.409c-3.006 0-7.588-.523-10-2.256v2.434c0 1.926 4.656 3.487 10 3.487 5.345 0 10-1.562 10-3.487v-2.434c-2.418 1.738-7.005 2.256-10 2.256zm0-14.646c-5.344 0-10 1.562-10 3.488s4.656 3.487 10 3.487c5.345 0 10-1.562 10-3.487 0-1.926-4.655-3.488-10-3.488zm0 8.975c-3.006 0-7.588-.523-10-2.256v2.44c0 1.926 4.656 3.487 10 3.487 5.345 0 10-1.562 10-3.487v-2.44c-2.418 1.738-7.005 2.256-10 2.256z"/></svg>',
      dataset_selected_icon_svg:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="24" height="24" viewBox="0 0 91.07 91.07" style="enable-background:new 0 0 91.07 91.07;" xml:space="preserve"><g><g><path d="M89.459,48.179l-6.656-6.655c-1.031-1.031-2.43-1.611-3.889-1.611s-2.857,0.58-3.891,1.611l-5.33,5.331V34.322 c0-0.316-0.066-0.627-0.131-0.939C68.238,39.96,53.22,45.146,34.847,45.146c-18.374,0-33.392-5.186-34.717-11.764    C0.067,33.696,0,34.006,0,34.322v16.279c0,6.578,13.702,11.983,31.264,12.639c0.268,0.625,0.647,1.213,1.157,1.723l4.685,4.684    c-0.748,0.019-1.499,0.029-2.259,0.029c-18.374,0-33.392-5.188-34.717-11.764C0.067,58.222,0,58.535,0,58.851v16.278 c0,7.021,15.602,12.707,34.847,12.707c6.877,0,13.283-0.729,18.685-1.981c0.867,0.541,1.867,0.846,2.906,0.846    c1.459,0,2.857-0.578,3.889-1.611l2.281-2.279c4.114-1.975,6.685-4.401,7.041-7.043l19.811-19.811    C91.607,53.81,91.607,50.328,89.459,48.179z M56.009,81.003L35.881,60.876l6.656-6.656l13.472,13.471l22.476-22.476l6.656,6.656    L56.009,81.003z"/><path d="M34.848,39.072c19.244,0,34.846-5.688,34.846-12.707V15.938c0-7.02-15.602-12.705-34.846-12.705    c-19.245,0-34.847,5.686-34.847,12.705v10.426C0.001,33.385,15.603,39.072,34.848,39.072z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>',
      current_graph_data: [{
        data: [],
        xKey: "",
        yKey: "",
        dateKey:"",
        date_time_column:"",
        primary_column: "",
        secondary_column: "",
      }],
      datasets:[],
      dataset_icon_to_be_showed:'',
      new_donut_2d_icon_svg:'<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" width="26.585" height="26.585" viewBox="0 0 26.585 26.585"><g id="prefix__Group_96" data-name="Group 96" transform="translate(-395.258 -473.274)"><path id="prefix__Path_180" d="M2378.22 886.647c.827.182 1.666.321 2.479.554a12.943 12.943 0 0 1 4.733 2.538 1.067 1.067 0 0 1 .112.117l-4.753 4.739c-.128-.085-.329-.216-.528-.349a5.386 5.386 0 0 0-2.169-.831c-.183-.029-.385-.023-.383-.323.011-2.115.008-4.229.01-6.344a.67.67 0 0 1 .017-.1z" data-name="Path 180" transform="translate(-1968.275 -413.373)" style="fill:#fbb317"/><path id="prefix__Path_181" d="M2247.422 886.647c0 2.092-.008 4.184 0 6.276 0 .3-.1.443-.4.475a4.547 4.547 0 0 0-2.417 1 .379.379 0 0 1-.61-.035q-2.094-2.122-4.209-4.221c-.173-.172-.176-.288.014-.443a13.471 13.471 0 0 1 6.527-2.921c.247-.039.493-.089.74-.135z" data-name="Path 181" transform="translate(-1839.754 -413.373)" style="fill:#3fbc11"/><path id="prefix__Path_182" d="M2175.485 969.792a13.245 13.245 0 0 1-.008-17.5 2.768 2.768 0 0 1 .225.183c1.423 1.422 2.84 2.849 4.269 4.265a.363.363 0 0 1 .052.57 6.43 6.43 0 0 0 .01 7.487c.125.179.189.3 0 .491-1.479 1.463-2.946 2.938-4.417 4.409a1.251 1.251 0 0 1-.131.095z" data-name="Path 182" transform="translate(-1776.921 -474.49)" style="fill:#00c7e6"/><path id="prefix__Path_183" d="M2241.684 966.315a6.542 6.542 0 0 0 9.205-9.124l-.024-.031 4.776-4.69.006.006a13.293 13.293 0 0 1-18.845 18.678z" data-name="Path 183" transform="translate(-1837.087 -474.655)" style="fill:#ea3379"/></g></svg>',
      new_pie_2d_icon_svg:'<svg xmlns="http://www.w3.org/2000/svg" width="24.331" height="24.566" viewBox="0 0 24.331 24.566">    <g id="prefix__Group_95" data-name="Group 95" transform="translate(-487.061 -422.257)">        <path id="prefix__Path_176" d="M1321.25 1238.29a13.009 13.009 0 0 1-1.252 3.13c-.153.272-.245.386-.579.172q-4.562-2.921-9.156-5.792a.676.676 0 0 1-.34-.789q.657-4.436 1.3-8.873a14.025 14.025 0 0 0 .24-1.729c.012-.584.343-.468.668-.4a11.617 11.617 0 0 1 5.445 2.7 11.74 11.74 0 0 1 3.9 6.948 3.142 3.142 0 0 0 .092.415v2.49a7.786 7.786 0 0 1-.322 1.73" data-name="Path 176" transform="translate(-810.181 -801.403)" style="fill:#00c7e6"/>        <path id="prefix__Path_177" d="M1211.014 1221.374a.646.646 0 0 1 .309.735q-.791 5.24-1.53 10.488c-.053.38-.147.529-.554.585q-5.39.736-10.771 1.534c-.331.049-.339-.184-.468-.328a24.336 24.336 0 0 1 .132-3.092c.166-.067-.027.153-.006.035a11.77 11.77 0 0 1 9.057-9.684 8.159 8.159 0 0 1 1.115-.273z" data-name="Path 177" transform="translate(-710.939 -799.117)" style="fill:#ea3379"/>        <path id="prefix__Path_178" d="M1258.867 1346.719h-1.139l-.232-.036-1.026-.164a11.7 11.7 0 0 1-4.167-1.505c-.263-.151-.278-.276-.116-.527q2.987-4.628 5.95-9.271c.145-.227.239-.257.472-.109q4.622 2.942 9.261 5.858c.309.194.306.346.112.618a11.629 11.629 0 0 1-7.856 4.94l-1.029.16z" data-name="Path 178" transform="translate(-758.901 -899.896)" style="fill:#3fbc11"/>        <path id="prefix__Path_179" d="M1210.95 1332.21l-4.531 7.067c-.508.793-1.029 1.578-1.515 2.384-.206.341-.371.358-.687.126a11.758 11.758 0 0 1-4.777-7.536c-.067-.356 0-.5.346-.484a12.484 12.484 0 0 0 2.275-.317 17.227 17.227 0 0 0 2.416-.283c.7-.209 1.4-.134 2.1-.313.61-.157 1.332-.113 1.958-.244s1.284-.2 1.915-.351a4.245 4.245 0 0 1 .5-.049z" data-name="Path 179" transform="translate(-712.195 -897.41)" style="fill:#fbb317"/>    </g></svg>',
      new_bar_chart_icon_svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24.018" height="21.938" viewBox="0 0 24.018 21.938"><defs><style>.prefix__cls-1a{fill:#00c7e6}</style></defs><g id="prefix__Group_80" data-name="Group 80" transform="translate(-119.897 -229.618)">        <path id="prefix__Path_90" d="M409.152 229.648V251.222c0 .335 0 .335-.336.334h-2.636c-.08 0-.159-.007-.261-.011v-1-1.895-13.9-4.876c0-.146 0-.255.2-.254.968.007 1.935.006 2.9.008a1.089 1.089 0 0 1 .133.02z" class="prefix__cls-1a" data-name="Path 90" transform="translate(-265.237)"/>        <path id="prefix__Path_91" d="M337.471 316.854h-.518c-.805 0-1.61-.007-2.416 0-.21 0-.284-.048-.283-.272q.015-3.6.011-7.2 0-3.278-.006-6.556v-2.795h3.212z" class="prefix__cls-1a" data-name="Path 91" transform="translate(-198.781 -65.302)"/>        <path id="prefix__Path_92" d="M194.943 349.62h-3.194v-14.231h3.194z" class="prefix__cls-1a" data-name="Path 92" transform="translate(-66.631 -98.085)"/>        <path id="prefix__Path_93" d="M263.1 388.326v-11.217h3.22v.269q0 5.333.005 10.666c0 .235-.072.287-.291.284-.879-.01-1.757 0-2.636 0z" class="prefix__cls-1a" data-name="Path 93" transform="translate(-132.798 -136.774)"/>        <path id="prefix__Path_94" d="M123.116 440.917h-1.476c-.5 0-1 .007-1.5.022-.179.005-.243-.048-.242-.236q.009-3.328 0-6.655c0-.064.011-.128.018-.2h3.2z" class="prefix__cls-1a" data-name="Path 94" transform="translate(0 -189.386)"/>    </g></svg>',
      new_horizontal_bar_chart_icon_svg: '<svg xmlns="http://www.w3.org/2000/svg" width="20.309" height="22.235" viewBox="0 0 20.309 22.235">    <defs>        <style>            .prefix__cls-1b{fill:#ff9750}        </style>    </defs>    <g id="prefix__Group_82" data-name="Group 82" transform="rotate(90 184.912 65.015)">        <path id="prefix__Path_90" d="M408.912 229.646v19.968c0 .31 0 .31-.311.31h-2.441c-.074 0-.147-.006-.242-.01v-.926-1.754-12.865-4.514c0-.135 0-.237.182-.235.9.007 1.792.005 2.688.007a1.012 1.012 0 0 1 .124.019z" class="prefix__cls-1b" data-name="Path 90" transform="translate(-266.78)"/>        <path id="prefix__Path_91" d="M337.232 315.605h-.479c-.745 0-1.491-.007-2.236 0-.195 0-.263-.045-.262-.252q.014-3.331.01-6.663 0-3.035-.006-6.069v-2.588h2.974z" class="prefix__cls-1b" data-name="Path 91" transform="translate(-199.937 -65.682)"/>        <path id="prefix__Path_92" d="M194.706 348.563h-2.957v-13.174h2.957z" class="prefix__cls-1b" data-name="Path 92" transform="translate(-67.019 -98.656)"/>        <path id="prefix__Path_93" d="M263.1 387.493v-10.384h2.981V387.232c0 .217-.067.266-.27.263-.813-.01-1.627 0-2.441 0z" class="prefix__cls-1b" data-name="Path 93" transform="translate(-133.571 -137.57)"/>        <path id="prefix__Path_94" d="M122.877 440.392h-1.367c-.463 0-.926.006-1.389.02-.166.005-.225-.045-.224-.218q.008-3.08 0-6.161c0-.059.01-.119.017-.189h2.959z" class="prefix__cls-1b" data-name="Path 94" transform="translate(0 -190.488)"/>    </g></svg>',
      new_multiline_chart_icon_svg: '<svg xmlns="http://www.w3.org/2000/svg" width="27.22" height="24.871" viewBox="0 0 27.22 24.871">    <g id="prefix__Group_84" data-name="Group 84" transform="translate(-395.364 -421.696)">        <path id="prefix__Path_121" d="M628.506 1040.622q-6.648 0-13.3.006c-.251 0-.312-.056-.312-.306q.011-12.128 0-24.255c0-.245.052-.321.31-.309.464.023.931.017 1.4 0 .2-.006.249.052.248.246-.008 1.483 0 2.967 0 4.451q0 8.961-.007 17.923c0 .27.066.337.342.337q12.295-.012 24.589-.013c.272 0 .36.059.344.335a12.376 12.376 0 0 0 0 1.314c.011.227-.057.275-.282.275q-6.668-.01-13.332-.004z" data-name="Path 121" transform="translate(-219.534 -594.061)" style="fill:#ff9750"/>        <path id="prefix__Path_122" d="M666.133 1036.358l-3.157 6.352c-.077-.071-.046-.153-.046-.223v-3.813a.937.937 0 0 1 .1-.436c.8-1.607 1.6-3.214 2.393-4.827.121-.246.192-.261.387-.063 1.228 1.252 2.472 2.489 3.7 3.74.167.17.255.172.423 0 1.085-1.108 2.186-2.2 3.273-3.308a.329.329 0 0 1 .463-.079c1 .516 2 1.013 3 1.517.38.191.379.191.576-.2 1.178-2.371 2.361-4.741 3.529-7.117.125-.255.227-.274.467-.151 1.249.643 2.506 1.272 3.764 1.9a.366.366 0 0 1 .248.39c-.018.528-.005 1.057-.006 1.586 0 .328 0 .329-.308.176-.949-.476-1.9-.945-2.842-1.435-.233-.121-.325-.1-.448.144-1.181 2.4-2.383 4.8-3.562 7.2-.142.29-.254.293-.511.16-1.167-.6-2.348-1.181-3.515-1.783a.348.348 0 0 0-.489.086c-1.2 1.222-2.415 2.43-3.615 3.653-.179.182-.273.212-.469.01-1.039-1.069-2.1-2.119-3.144-3.178a2.723 2.723 0 0 1-.211-.301z" data-name="Path 122" transform="translate(-264.628 -605.249)" style="fill:#00c7e6"/>        <path id="prefix__Path_123" d="M685.332 1225.625c-.4-.2-.747-.37-1.1-.545-.784-.395-1.571-.785-2.349-1.191a.31.31 0 0 0-.438.072c-1.158 1.18-2.33 2.345-3.487 3.526a.324.324 0 0 1-.46.068c-1.113-.572-2.237-1.121-3.35-1.695a.343.343 0 0 0-.485.073c-1.15 1.173-2.315 2.331-3.467 3.5a.323.323 0 0 1-.458.075c-1.157-.6-2.328-1.166-3.483-1.766a.63.63 0 0 0-.663-.006c-.838.44-1.688.856-2.585 1.307v-2.1c0-.108.093-.121.162-.155.865-.437 1.732-.869 2.593-1.312a.352.352 0 0 1 .363.03c1.08.547 2.165 1.086 3.242 1.64a.312.312 0 0 0 .437-.077c1.151-1.172 2.315-2.331 3.466-3.5a.34.34 0 0 1 .483-.087c1.12.581 2.253 1.136 3.375 1.712a.311.311 0 0 0 .438-.071c1.158-1.18 2.33-2.346 3.487-3.526a.324.324 0 0 1 .459-.069c1.194.613 2.4 1.212 3.6 1.808a.345.345 0 0 1 .225.369c-.014.619-.005 1.24-.005 1.92z" data-name="Path 123" transform="translate(-264.71 -787.6)" style="fill:#f5697a"/>    </g></svg>',
      new_stacked_bar_chart_icon_svg: '<svg xmlns="http://www.w3.org/2000/svg" width="41.281" height="27.359" viewBox="0 0 41.281 27.359">    <defs>        <style>            .prefix__cls-1stck{fill:#3fbc11}.prefix__cls-2stck{fill:#ff9750}        </style>    </defs>    <g id="prefix__Group_90" data-name="Group 90" transform="translate(-35.161 -224.046)">        <path id="prefix__Path_184" d="M242.49 247.144h-5.4v-23.1h5.4z" class="prefix__cls-1stck" data-name="Path 184" transform="translate(-181.147)"/>        <path id="prefix__Path_185" d="M328.508 383.9h5.408v10.9h-5.408z" class="prefix__cls-2stck" data-name="Path 185" transform="translate(-263.155 -143.401)"/>        <path id="prefix__Path_186" d="M334.054 302.914h-5.4v-7.865h5.4z" class="prefix__cls-1stck" data-name="Path 186" transform="translate(-263.289 -63.695)"/>        <path id="prefix__Path_187" d="M386.619 347.495v-8.172h5.094v8.172z" class="prefix__cls-1stck" data-name="Path 187" transform="translate(-315.285 -103.412)"/>        <path id="prefix__Path_188" d="M186.069 369.052v6.642h-5.116v-6.642z" class="prefix__cls-1stck" data-name="Path 188" transform="translate(-130.787 -130.081)"/>        <path id="prefix__Path_189" d="M386.674 431.066h5.1v6.034h-5.1z" class="prefix__cls-2stck" data-name="Path 189" transform="translate(-315.334 -185.713)"/>        <path id="prefix__Path_190" d="M35.161 383.9h5.408v10.9h-5.408z" class="prefix__cls-2stck" data-name="Path 190" transform="translate(0 -143.401)"/>        <path id="prefix__Path_191" d="M40.706 302.914h-5.4v-7.865h5.4z" class="prefix__cls-1stck" data-name="Path 191" transform="translate(-.134 -63.695)"/>        <path id="prefix__Path_192" d="M93.272 347.495v-8.172h5.094v8.172z" class="prefix__cls-1stck" data-name="Path 192" transform="translate(-52.13 -103.412)"/>        <path id="prefix__Path_193" d="M93.327 431.066h5.1v6.034h-5.1z" class="prefix__cls-2stck" data-name="Path 193" transform="translate(-52.179 -185.713)"/>        <path id="prefix__Path_194" d="M180.926 445.907h5.1v4.516h-5.1z" class="prefix__cls-2stck" data-name="Path 194" transform="translate(-130.762 -199.026)"/>        <path id="prefix__Path_195" d="M242.481 463.769h-5.414v-2.994h5.414z" class="prefix__cls-2stck" data-name="Path 195" transform="translate(-181.125 -212.364)"/>    </g></svg>',
      new_grouped_bar_chart_icon_svg : '<svg xmlns="http://www.w3.org/2000/svg" width="37.067" height="21.94" viewBox="0 0 37.067 21.94">    <defs>        <style>            .prefix__cls-1grpd{fill:#ff9750}.prefix__cls-2grpd{fill:#3fbc11}        </style>    </defs>    <g id="prefix__Group_91" data-name="Group 91" transform="translate(-480.593 -316.984)">        <path id="prefix__Path_95" d="M66 716.621c0-2.179.014-4.357 0-6.536 0-.337.074-.451.432-.444q1.718.036 3.438 0c.347-.007.438.09.437.437q-.016 10.484-.007 20.969c0 .176.007.352.011.529h-4.235v-14.419c0-.157.061-.329-.068-.47-.008-.018-.008-.042-.008-.066z" class="prefix__cls-1grpd" data-name="Path 95" transform="translate(447.351 -392.657)"/>        <path id="prefix__Path_96" d="M-59.964 744.357a.692.692 0 0 0 .056-.44c0-2.581.007-5.162-.005-7.742 0-.314.082-.4.4-.4 1.145.019 2.291.021 3.437 0 .345-.007.436.087.435.434q-.016 9.517-.007 19.035c0 .164.006.327.01.491h-4.25v-10.832c0-.145.053-.3-.069-.432q-.006-.056-.007-.114z" class="prefix__cls-1grpd" data-name="Path 96" transform="translate(563.787 -416.816)"/>        <path id="prefix__Path_97" d="M-310.991 801.293l.015-7.971c0-.113.006-.227 0-.34-.011-.176.058-.246.24-.245q1.908.007 3.816 0c.177 0 .257.057.241.239-.008.1 0 .2 0 .3v14.621c0 .164.006.327.009.491h-4.245v-6.593c0-.144.054-.3-.066-.432q-.008-.032-.01-.07z" class="prefix__cls-1grpd" data-name="Path 97" transform="translate(795.832 -469.47)"/>        <path id="prefix__Path_98" d="M14 801.8v14.959H9.749q0-3.53.009-7.061c0-2.5.007-5.01-.007-7.514 0-.321.092-.4.4-.391 1.28.018 2.564.007 3.849.007z" class="prefix__cls-2grpd" data-name="Path 98" transform="translate(499.349 -477.84)"/>        <path id="prefix__Path_99" d="M-111.8 849.017v.118q0 5.632-.007 11.263h-4.235q0-5.441.009-10.882c0-.588-.074-.512.53-.512 1.236-.004 2.47.007 3.703.013z" class="prefix__cls-2grpd" data-name="Path 99" transform="translate(615.621 -521.476)"/>        <path id="prefix__Path_100" d="M-362.924 905.668v.075q0 3.512-.006 7.025l-4.247-.005c0-2.227.014-4.453 0-6.68 0-.35.094-.439.437-.433 1.275.023 2.545.015 3.816.018z" class="prefix__cls-2grpd" data-name="Path 100" transform="translate(847.765 -573.844)"/>        <path id="prefix__Path_101" d="M-185.076 914.372c0-.377.011-.755 0-1.132 0-.2.033-.3.265-.3 1.258.01 2.515.012 3.773 0 .315 0 .26.193.26.375v5.735c0 .151.007.3.011.453h-4.31q.003-2.562.001-5.131z" class="prefix__cls-1grpd" data-name="Path 101" transform="translate(679.438 -580.587)"/>        <path id="prefix__Path_102" d="M-238.106 931.2v5.137h-4.293c0-1.281 0-2.563.013-3.844 0-.412-.178-.955.069-1.2.263-.262.809-.075 1.231-.081.995-.012 1.986-.012 2.98-.012z" class="prefix__cls-2grpd" data-name="Path 102" transform="translate(732.468 -597.417)"/>    </g></svg>',
      new_line_chart_icon_svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24.586" height="23.14" viewBox="0 0 24.586 23.14">    <g id="prefix__Group_94" data-name="Group 94" transform="translate(-573.994 -364.096)">        <path id="prefix__Path_119" d="M952.647 907.179v-23.14h1.395v21.562c0 .155.04.2.2.2q7.246-.007 14.493 0h7.938v1.385z" data-name="Path 119" transform="translate(-378.653 -519.943)" style="fill:#ff9750"/>        <path id="prefix__Path_120" d="M1028.21 1075.859a1 1 0 0 1-.2-.949.981.981 0 0 1 1.185-.649.971.971 0 0 1 .7 1.138.955.955 0 0 1-1.105.764.23.23 0 0 0-.224.091l-4.914 4.909-3.067 3.062a1.111 1.111 0 0 1-.133.1 1.021 1.021 0 0 1 .206.92.954.954 0 0 1-.363.52.974.974 0 0 1-1.222-.051 1.017 1.017 0 0 1-.134-1.354c-.255-.249-.521-.5-.781-.762q-1.894-1.888-3.784-3.78a.21.21 0 0 0-.239-.06 1.3 1.3 0 0 1-.422.037.253.253 0 0 0-.229.075q-2.275 2.278-4.556 4.55a.165.165 0 0 0-.041.212.96.96 0 0 1-.382 1.17.977.977 0 0 1-1.342-1.362.968.968 0 0 1 1.177-.366.134.134 0 0 0 .174-.024q2.275-2.278 4.553-4.553c.007-.007.011-.017 0 0a3.594 3.594 0 0 1-.184-.579.938.938 0 0 1 .545-.964.979.979 0 0 1 1.1.175.95.95 0 0 1 .223 1.073.186.186 0 0 0 .047.249q2.233 2.222 4.459 4.452c.1.1.186.162.33.111a.3.3 0 0 1 .182-.01c.184.063.289-.036.407-.154q3.944-3.945 7.894-7.884a1.3 1.3 0 0 1 .14-.107z" data-name="Path 120" transform="translate(-431.339 -704.286)" style="fill:#3fbc11"/>    </g></svg>',
      new_graphs_icon_default_svg: '<svg xmlns="http://www.w3.org/2000/svg" width="38.111" height="34.024" viewBox="0 0 38.111 34.024"><defs><style>.prefix__cls-2{fill:#6b6b6b !important }</style></defs><g id="prefix__Group_78" data-name="Group 78" style="opacity:.5"><path id="prefix__Path_12" d="M1003.883 305.417h3.548c.2 0 .2 0 .2.2v1.455c0 .2 0 .2.2.2.5 0 1-.005 1.5 0 .14 0 .18-.044.179-.181v-4.237-.115c-.011-.108.039-.141.143-.14h3.458c.151 0 .143.084.143.185v4.179a1.259 1.259 0 0 1 0 .144c-.015.127.039.167.164.165.5-.005 1 0 1.5 0 .214 0 .215 0 .215-.212v-6.831-.3c0-.1.031-.13.125-.13h3.473c.122 0 .143.056.143.158V307.065c0 .2 0 .205.209.205.495 0 .99-.005 1.484 0 .149 0 .185-.05.185-.191q-.006-3.213 0-6.427v-3.472c0-.2 0-.2.195-.2h3.386c.118 0 .153.03.153.153v9.929c0 .212 0 .212.215.212h1.47c.2 0 .205 0 .205-.206V297.8v-3.43c0-.189 0-.19.194-.19h3.372c.14 0 .179.043.179.18q-.005 3.876 0 7.752V307.105c-.006.123.036.173.164.168.216-.008.432 0 .648 0 .093 0 .129.03.127.125v.706c0 .09-.025.129-.122.129H1003.7c-.216 0-.432-.006-.648 0-.085 0-.121-.031-.12-.119v-.734c0-.091.05-.1.12-.1h.677c.121 0 .158-.044.157-.16v-1.5z" class="prefix__cls-2" data-name="Path 12" transform="translate(-1002.931 -284.206)"/><path id="prefix__Path_13" d="M1095.358-51.768l-.211 6.514-.04.014-1.136-1.747c-.041.06-.072.1-.1.143a21.777 21.777 0 0 1-3.748 4.725 23.245 23.245 0 0 1-3.487 2.732 24.837 24.837 0 0 1-5.656 2.691c-.782.259-1.58.476-2.382.667-.835.2-1.678.371-2.526.5-.863.129-1.736.19-2.6.279a.416.416 0 0 1-.16-.015c.34-.06.681-.117 1.021-.182a29.529 29.529 0 0 0 4.061-1.079 25.857 25.857 0 0 0 6.715-3.442 21.586 21.586 0 0 0 3.464-3.093 19.446 19.446 0 0 0 3.3-5.027c.014-.031.027-.062.038-.093 0-.007 0-.018-.009-.046l-2.109-.146-.012-.047z" class="prefix__cls-2" data-name="Path 13" transform="translate(-1071.281 51.768)"/></g></svg>',
      new_graphs_icon_types_shown_svg:'<svg xmlns="http://www.w3.org/2000/svg" width="38.111" height="34.024" viewBox="0 0 38.111 34.024"><defs><style>.prefix__cls_icon{fill:#00008b !important}</style></defs><g id="prefix__Group_79" data-name="Group 79" transform="translate(-286.282 -352.055)"><path id="prefix__Path_12" d="M1003.883 305.417h3.548c.2 0 .2 0 .2.2v1.455c0 .2 0 .2.2.2.5 0 1-.005 1.5 0 .14 0 .18-.044.179-.181v-4.237-.115c-.011-.108.039-.141.143-.14h3.458c.151 0 .143.084.143.185v4.179a1.259 1.259 0 0 1 0 .144c-.015.127.039.167.164.165.5-.005 1 0 1.5 0 .214 0 .215 0 .215-.212v-6.831-.3c0-.1.031-.13.125-.13h3.473c.122 0 .143.056.143.158V307.065c0 .2 0 .205.209.205.495 0 .99-.005 1.484 0 .149 0 .185-.05.185-.191q-.006-3.213 0-6.427v-3.472c0-.2 0-.2.195-.2h3.386c.118 0 .153.03.153.153v9.929c0 .212 0 .212.215.212h1.47c.2 0 .205 0 .205-.206V297.8v-3.43c0-.189 0-.19.194-.19h3.372c.14 0 .179.043.179.18q-.005 3.876 0 7.752V307.105c-.006.123.036.173.164.168.216-.008.432 0 .648 0 .093 0 .129.03.127.125v.706c0 .09-.025.129-.122.129H1003.7c-.216 0-.432-.006-.648 0-.085 0-.121-.031-.12-.119v-.734c0-.091.05-.1.12-.1h.677c.121 0 .158-.044.157-.16v-1.5z" class="prefix__cls_icon" data-name="Path 12" transform="translate(-716.648 67.85)"/><path id="prefix__Path_13" d="M1095.358-51.768l-.211 6.514-.04.014-1.136-1.747c-.041.06-.072.1-.1.143a21.777 21.777 0 0 1-3.748 4.725 23.245 23.245 0 0 1-3.487 2.732 24.837 24.837 0 0 1-5.656 2.691c-.782.259-1.58.476-2.382.667-.835.2-1.678.371-2.526.5-.863.129-1.736.19-2.6.279a.416.416 0 0 1-.16-.015c.34-.06.681-.117 1.021-.182a29.529 29.529 0 0 0 4.061-1.079 25.857 25.857 0 0 0 6.715-3.442 21.586 21.586 0 0 0 3.464-3.093 19.446 19.446 0 0 0 3.3-5.027c.014-.031.027-.062.038-.093 0-.007 0-.018-.009-.046l-2.109-.146-.012-.047z" class="prefix__cls_icon" data-name="Path 13" transform="translate(-784.998 403.823)"/></g></svg>',
      change_graph_type_dropdown_shown: false,
      switch_graphs_icon_svg: '',
      report_name: '',
      report_comments:'',
      graphs_styling: '<style>.label-text{font-size:12px;fill:#393939}.label-line{stroke-width:1;stroke:#393939}.label circle{display:none}.tick line{stroke:#1b139c}.y.axis path{display:none}.y.axis .tick line{display:none}#xaxis path{display:none}#xaxis .tick line{display:none}.bar-positive{fill:#00c7e6}.bar-positive:hover{fill:#69d5d1}.svg-container{display:inline-block;position:relative;width:100%;padding-bottom:1%;vertical-align:top;overflow:hidden}.toolTip{position:absolute;display:none;min-width:80px;height:auto;background:none repeat scroll 0 0 #fff;border:1px solid rgba(130,127,127,.72);padding:14px;text-align:center;z-index:1000}.subBar{fill:gray;opacity:.11}rect.mover{stroke:red;stroke-opacity:.1;fill:#505050;fill-opacity:.5;border-radius:45px}.bar-positive-horizontal{fill:#ff9750}.xgrouped path{display:none}.axis line,.axis path{display:none;fill:none;stroke:#000;shape-rendering:crispEdges}#legend_div{overflow-y:auto;height:220px;width:235px;overflow-x:hidden;margin-left:-11%}#legend_div::-webkit-scrollbar{max-height:10px;width:7px;height:7px;border-radius:10px;overflow-x:hidden}#legend_div::-webkit-scrollbar{max-height:10px;width:7px;height:7px;border-radius:10px;overflow-x:hidden}#legend_div::-webkit-scrollbar-track{background:#f1f1f1;border-radius:10px}#legend_div::-webkit-scrollbar-thumb{background:#c1c1c1;border-radius:10px}#legend_div::-webkit-scrollbar-thumb:hover{background:#555;border-radius:10px}</style>',
      show_reports_div: false,
      current_graph_type: '',
      show_reports_list: false,
      reports_list: [],
      current_viewed_report: null,
      report_append_to_old: null,
      refresh_icon_svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="18.23px" height="18.23px" viewBox="0 0 500.23 500.23" style="enable-background:new 0 0 187.23 487.23;" xml:space="preserve"><g>	<g>		<path d="M55.323,203.641c15.664,0,29.813-9.405,35.872-23.854c25.017-59.604,83.842-101.61,152.42-101.61    c37.797,0,72.449,12.955,100.23,34.442l-21.775,3.371c-7.438,1.153-13.224,7.054-14.232,14.512    c-1.01,7.454,3.008,14.686,9.867,17.768l119.746,53.872c5.249,2.357,11.33,1.904,16.168-1.205    c4.83-3.114,7.764-8.458,7.796-14.208l0.621-131.943c0.042-7.506-4.851-14.144-12.024-16.332    c-7.185-2.188-14.947,0.589-19.104,6.837l-16.505,24.805C370.398,26.778,310.1,0,243.615,0C142.806,0,56.133,61.562,19.167,149.06    c-5.134,12.128-3.84,26.015,3.429,36.987C29.865,197.023,42.152,203.641,55.323,203.641z"/>		<path d="M464.635,301.184c-7.27-10.977-19.558-17.594-32.728-17.594c-15.664,0-29.813,9.405-35.872,23.854    c-25.018,59.604-83.843,101.61-152.42,101.61c-37.798,0-72.45-12.955-100.232-34.442l21.776-3.369    c7.437-1.153,13.223-7.055,14.233-14.514c1.009-7.453-3.008-14.686-9.867-17.768L49.779,285.089    c-5.25-2.356-11.33-1.905-16.169,1.205c-4.829,3.114-7.764,8.458-7.795,14.207l-0.622,131.943    c-0.042,7.506,4.85,14.144,12.024,16.332c7.185,2.188,14.948-0.59,19.104-6.839l16.505-24.805    c44.004,43.32,104.303,70.098,170.788,70.098c100.811,0,187.481-61.561,224.446-149.059    C473.197,326.043,471.903,312.157,464.635,301.184z"/>	</g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>',
      reports_list_icon_svg_default:'<svg xmlns="http://www.w3.org/2000/svg" width="20.918" height="28.618" viewBox="0 0 20.918 28.618">    <defs>        <style>            .prefix__cls-1{fill:#b4b4b4}        </style>    </defs>    <g id="prefix__Group_90" data-name="Group 90" transform="translate(-202.341 -281.69)">        <path id="prefix__Path_116" d="M202.341 295.96v-13.262c0-.934.076-1.008 1.02-1.008h18.912c.894 0 .985.088.985.981v26.648c0 .889-.083.984-.989.985q-9.518.007-19.035 0c-.765 0-.891-.135-.892-.9q-.003-6.721-.001-13.444zm1.018-13.214v.757q0 12.522-.015 25.043c0 .639.186.775.793.773 5.79-.023 11.58-.014 17.371-.014h.684v-26.559z" class="prefix__cls-1" data-name="Path 116"/>        <path id="prefix__Path_117" d="M327.7 427.111c0 1.329-.015 2.658.009 3.987.008.459-.155.618-.6.6-.735-.024-1.472-.017-2.208 0-.384.007-.547-.132-.545-.537q.018-4.11 0-8.219c0-.376.147-.5.509-.492.777.017 1.554.022 2.331 0 .424-.013.514.184.51.556-.016 1.365-.006 2.735-.006 4.105z" class="prefix__cls-1" data-name="Path 117" transform="translate(-107.025 -123.467)"/>        <path id="prefix__Path_118" d="M260.472 433.7c.02.279.045.46.045.64 0 2.186-.009 4.372.011 6.558 0 .493-.133.7-.656.675-.734-.037-1.471-.018-2.206-.008-.338 0-.465-.132-.464-.475.01-2.309 0-4.617.021-6.926 0-.156.2-.44.316-.444.961-.037 1.914-.02 2.933-.02z" class="prefix__cls-1" data-name="Path 118" transform="translate(-48.124 -133.336)"/>        <path id="prefix__Path_119" d="M231.456 379.4l-4.588 5.079-.763-.639c.4-.457.771-.884 1.148-1.3 1.252-1.4 2.516-2.79 3.752-4.2.3-.339.485-.216.762-.005 1.251.948 2.516 1.878 3.821 2.849l5.112-5.918.761.671-5.7 6.632z" class="prefix__cls-1" data-name="Path 119" transform="translate(-20.845 -82.073)"/>        <path id="prefix__Path_120" d="M294.085 453.608c0 .776-.017 1.553.008 2.329.013.411-.111.6-.546.589-.755-.021-1.512-.018-2.267 0-.37.007-.51-.148-.508-.509.008-1.593.005-3.187 0-4.78 0-.309.088-.5.455-.488.8.019 1.593.015 2.39 0 .34-.005.474.131.469.471-.01.795-.001 1.592-.001 2.388z" class="prefix__cls-1" data-name="Path 120" transform="translate(-77.569 -148.291)"/>        <path id="prefix__Path_121" d="M226.705 466.5c0 .511-.012 1.022 0 1.532.012.356-.113.531-.489.526-.8-.01-1.594-.007-2.391 0-.337 0-.474-.142-.47-.48.011-1.042.013-2.084 0-3.126 0-.381.162-.491.519-.483q1.164.026 2.329 0c.371-.009.515.129.5.5-.013.508-.003 1.02.002 1.531z" class="prefix__cls-1" data-name="Path 121" transform="translate(-18.438 -160.33)"/>        <path id="prefix__Path_122" d="M226.85 369.642h3.807c.355 0 .7.049.711.482s-.324.527-.681.527h-7.736c-.34 0-.694-.046-.7-.5-.008-.5.368-.512.733-.512z" class="prefix__cls-1" data-name="Path 122" transform="translate(-17.463 -77.149)"/>        <path id="prefix__Path_123" d="M226.85 338.892h3.807c.355 0 .7.049.711.482s-.324.527-.681.527h-7.736c-.34 0-.694-.046-.7-.5-.008-.5.368-.512.733-.512z" class="prefix__cls-1" data-name="Path 123" transform="translate(-17.463 -50.175)"/>        <path id="prefix__Path_124" d="M282.025 338.892h3.807c.355 0 .7.049.711.482s-.323.527-.681.527h-7.736c-.34 0-.695-.046-.7-.5-.008-.5.368-.512.733-.512z" class="prefix__cls-1" data-name="Path 124" transform="translate(-65.861 -50.175)"/>        <path id="prefix__Path_125" d="M226.85 308.142h3.807c.355 0 .7.049.711.482s-.324.527-.681.527h-7.736c-.34 0-.694-.046-.7-.5-.008-.5.368-.512.733-.512z" class="prefix__cls-1" data-name="Path 125" transform="translate(-17.463 -23.202)"/>        <path id="prefix__Path_126" d="M282.025 308.142h3.807c.355 0 .7.049.711.482s-.323.527-.681.527h-7.736c-.34 0-.695-.046-.7-.5-.008-.5.368-.512.733-.512z" class="prefix__cls-1" data-name="Path 126" transform="translate(-65.861 -23.202)"/>    </g></svg>',
      reports_list_icon_svg_shown:'<svg xmlns="http://www.w3.org/2000/svg" width="20.918" height="28.618" viewBox="0 0 20.918 28.618">    <defs>        <style>            .prefix__cls-1{fill:#00008b}        </style>    </defs>    <g id="prefix__Group_90" data-name="Group 90" transform="translate(-202.341 -281.69)">        <path id="prefix__Path_116" d="M202.341 295.96v-13.262c0-.934.076-1.008 1.02-1.008h18.912c.894 0 .985.088.985.981v26.648c0 .889-.083.984-.989.985q-9.518.007-19.035 0c-.765 0-.891-.135-.892-.9q-.003-6.721-.001-13.444zm1.018-13.214v.757q0 12.522-.015 25.043c0 .639.186.775.793.773 5.79-.023 11.58-.014 17.371-.014h.684v-26.559z" class="prefix__cls-1" data-name="Path 116"/>        <path id="prefix__Path_117" d="M327.7 427.111c0 1.329-.015 2.658.009 3.987.008.459-.155.618-.6.6-.735-.024-1.472-.017-2.208 0-.384.007-.547-.132-.545-.537q.018-4.11 0-8.219c0-.376.147-.5.509-.492.777.017 1.554.022 2.331 0 .424-.013.514.184.51.556-.016 1.365-.006 2.735-.006 4.105z" class="prefix__cls-1" data-name="Path 117" transform="translate(-107.025 -123.467)"/>        <path id="prefix__Path_118" d="M260.472 433.7c.02.279.045.46.045.64 0 2.186-.009 4.372.011 6.558 0 .493-.133.7-.656.675-.734-.037-1.471-.018-2.206-.008-.338 0-.465-.132-.464-.475.01-2.309 0-4.617.021-6.926 0-.156.2-.44.316-.444.961-.037 1.914-.02 2.933-.02z" class="prefix__cls-1" data-name="Path 118" transform="translate(-48.124 -133.336)"/>        <path id="prefix__Path_119" d="M231.456 379.4l-4.588 5.079-.763-.639c.4-.457.771-.884 1.148-1.3 1.252-1.4 2.516-2.79 3.752-4.2.3-.339.485-.216.762-.005 1.251.948 2.516 1.878 3.821 2.849l5.112-5.918.761.671-5.7 6.632z" class="prefix__cls-1" data-name="Path 119" transform="translate(-20.845 -82.073)"/>        <path id="prefix__Path_120" d="M294.085 453.608c0 .776-.017 1.553.008 2.329.013.411-.111.6-.546.589-.755-.021-1.512-.018-2.267 0-.37.007-.51-.148-.508-.509.008-1.593.005-3.187 0-4.78 0-.309.088-.5.455-.488.8.019 1.593.015 2.39 0 .34-.005.474.131.469.471-.01.795-.001 1.592-.001 2.388z" class="prefix__cls-1" data-name="Path 120" transform="translate(-77.569 -148.291)"/>        <path id="prefix__Path_121" d="M226.705 466.5c0 .511-.012 1.022 0 1.532.012.356-.113.531-.489.526-.8-.01-1.594-.007-2.391 0-.337 0-.474-.142-.47-.48.011-1.042.013-2.084 0-3.126 0-.381.162-.491.519-.483q1.164.026 2.329 0c.371-.009.515.129.5.5-.013.508-.003 1.02.002 1.531z" class="prefix__cls-1" data-name="Path 121" transform="translate(-18.438 -160.33)"/>        <path id="prefix__Path_122" d="M226.85 369.642h3.807c.355 0 .7.049.711.482s-.324.527-.681.527h-7.736c-.34 0-.694-.046-.7-.5-.008-.5.368-.512.733-.512z" class="prefix__cls-1" data-name="Path 122" transform="translate(-17.463 -77.149)"/>        <path id="prefix__Path_123" d="M226.85 338.892h3.807c.355 0 .7.049.711.482s-.324.527-.681.527h-7.736c-.34 0-.694-.046-.7-.5-.008-.5.368-.512.733-.512z" class="prefix__cls-1" data-name="Path 123" transform="translate(-17.463 -50.175)"/>        <path id="prefix__Path_124" d="M282.025 338.892h3.807c.355 0 .7.049.711.482s-.323.527-.681.527h-7.736c-.34 0-.695-.046-.7-.5-.008-.5.368-.512.733-.512z" class="prefix__cls-1" data-name="Path 124" transform="translate(-65.861 -50.175)"/>        <path id="prefix__Path_125" d="M226.85 308.142h3.807c.355 0 .7.049.711.482s-.324.527-.681.527h-7.736c-.34 0-.694-.046-.7-.5-.008-.5.368-.512.733-.512z" class="prefix__cls-1" data-name="Path 125" transform="translate(-17.463 -23.202)"/>        <path id="prefix__Path_126" d="M282.025 308.142h3.807c.355 0 .7.049.711.482s-.323.527-.681.527h-7.736c-.34 0-.695-.046-.7-.5-.008-.5.368-.512.733-.512z" class="prefix__cls-1" data-name="Path 126" transform="translate(-65.861 -23.202)"/>    </g></svg>',
      reports_list_icon_to_be_shown: '',
      report_name_disabled: false,
      report_modal_title_text: 'Add to Report',
      report_submit_button_text: 'Add to Report',
      all_dataset_column_details: [],
      current_dataset_column_details: [],
      current_dataset_currency_details:[],
      current_currency_value: ' ',
      bar_chart_currency_key: ' ',
      horizontal_bar_chart_currency_key: '',
      pie_chart_currency_key: '',
      donut_chart_currency_key: '',
      stacked_bar_chart_non_time_currency_key: ' ',
      tabulator_currency_key: ' ',
      grouped_bar_chart_currency_key: ' ',
      graph_recommendations_for_reports_summary: {},
      start_promise_reports_modal: true,
      show_grouped_table: false,
      grouped_tabulator_data: [],
      grouped_tabulator_xKey: '',
      grouped_tabulator_yKey: '',
      grouped_tabulator_currency_key: ' ',
      grouped_tabulator_primary_column: '',
      grouped_tabulator_secondary_column: '',
      csv_file_icon_path: require('@/portal/assets/img/csv-file.svg'),
      };
  },
  mounted() {
    // Initialization of speech recognition variables to use speech to text.
      window.SpeechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition
      window.AudioContext = window.AudioContext || window.webkitAudioContext
      navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia

    // Initially Graphs Icon will be the default icon, if switching graph dropdown is shown, then the icon will be changed.
      this.switch_graphs_icon_svg = this.new_graphs_icon_default_svg;


      // this.show_bargraph = true;
      // this.barChartData = [{"Drug Name":"HUMIRA","Unique Patient Count":7370},{"Drug Name":"XARELTO","Unique Patient Count":4759},{"Drug Name":"REVLIMID","Unique Patient Count":4477},{"Drug Name":"ENBREL","Unique Patient Count":2664},{"Drug Name":"ELIQUIS","Unique Patient Count":2018},{"Drug Name":"OPSUMIT","Unique Patient Count":1943},{"Drug Name":"PREVACID","Unique Patient Count":1936},{"Drug Name":"NIVOLUMAB","Unique Patient Count":1870},{"Drug Name":"COSENTYX","Unique Patient Count":1831},{"Drug Name":"GILENYA","Unique Patient Count":1616}];
      // this.bar_chart_xKey = "Drug Name";
      // this.bar_chart_yKey = "Unique Patient Count";
      // this.chart_types = [];
      // //   this.chart_types_to_be_displayed = [];
      // this.show_heading = true;
      // this.chart_types_to_be_displayed.push("bar","pie_2d","donut_2d","horizontal_bar");
      // this.push_chart_types();
      // this.current_graph_data.data = this.barChartData;
      // this.current_graph_data.xKey = this.bar_chart_xKey;
      // this.current_graph_data.yKey = this.bar_chart_yKey;


      //   this.stacked_bar_chart_non_time_data             = [{"Outcome":"Impairment/Damage","Drug Name":"HUMIRA","Unique Patient Count":4333},{"Outcome":"Hospitalization - Initial or Prolonged","Drug Name":"HUMIRA","Unique Patient Count":2502},{"Outcome":"Death","Drug Name":"HUMIRA","Unique Patient Count":369},{"Outcome":"Disability","Drug Name":"HUMIRA","Unique Patient Count":122},{"Outcome":"Life-Threatening","Drug Name":"HUMIRA","Unique Patient Count":38},{"Outcome":"Congenital Anomaly","Drug Name":"HUMIRA","Unique Patient Count":4},{"Outcome":"Required Intervention to Prevent Permanent","Drug Name":"HUMIRA","Unique Patient Count":2},{"Outcome":"Impairment/Damage","Drug Name":"XARELTO","Unique Patient Count":2580},{"Outcome":"Hospitalization - Initial or Prolonged","Drug Name":"XARELTO","Unique Patient Count":1619},{"Outcome":"Death","Drug Name":"XARELTO","Unique Patient Count":489},{"Outcome":"Life-Threatening","Drug Name":"XARELTO","Unique Patient Count":43},{"Outcome":"Disability","Drug Name":"XARELTO","Unique Patient Count":27},{"Outcome":"Congenital Anomaly","Drug Name":"XARELTO","Unique Patient Count":1},{"Outcome":"Hospitalization - Initial or Prolonged","Drug Name":"REVLIMID","Unique Patient Count":2165},{"Outcome":"Impairment/Damage","Drug Name":"REVLIMID","Unique Patient Count":1604},{"Outcome":"Death","Drug Name":"REVLIMID","Unique Patient Count":658},{"Outcome":"Life-Threatening","Drug Name":"REVLIMID","Unique Patient Count":25},{"Outcome":"Disability","Drug Name":"REVLIMID","Unique Patient Count":20},{"Outcome":"Congenital Anomaly","Drug Name":"REVLIMID","Unique Patient Count":5},{"Outcome":"Impairment/Damage","Drug Name":"ENBREL","Unique Patient Count":2090},{"Outcome":"Hospitalization - Initial or Prolonged","Drug Name":"ENBREL","Unique Patient Count":443},{"Outcome":"Disability","Drug Name":"ENBREL","Unique Patient Count":58},{"Outcome":"Death","Drug Name":"ENBREL","Unique Patient Count":51},{"Outcome":"Life-Threatening","Drug Name":"ENBREL","Unique Patient Count":21},{"Outcome":"Required Intervention to Prevent Permanent","Drug Name":"ENBREL","Unique Patient Count":1},{"Outcome":"Impairment/Damage","Drug Name":"PREVACID","Unique Patient Count":1803},{"Outcome":"Death","Drug Name":"PREVACID","Unique Patient Count":79},{"Outcome":"Hospitalization - Initial or Prolonged","Drug Name":"PREVACID","Unique Patient Count":54},{"Outcome":"Impairment/Damage","Drug Name":"TAXOTERE","Unique Patient Count":1558},{"Outcome":"Hospitalization - Initial or Prolonged","Drug Name":"TAXOTERE","Unique Patient Count":9},{"Outcome":"Disability","Drug Name":"TAXOTERE","Unique Patient Count":3},{"Outcome":"Impairment/Damage","Drug Name":"ELIQUIS","Unique Patient Count":1311},{"Outcome":"Hospitalization - Initial or Prolonged","Drug Name":"ELIQUIS","Unique Patient Count":412},{"Outcome":"Death","Drug Name":"ELIQUIS","Unique Patient Count":249},{"Outcome":"Life-Threatening","Drug Name":"ELIQUIS","Unique Patient Count":33},{"Outcome":"Disability","Drug Name":"ELIQUIS","Unique Patient Count":13},{"Outcome":"Hospitalization - Initial or Prolonged","Drug Name":"OPSUMIT","Unique Patient Count":1291},{"Outcome":"Impairment/Damage","Drug Name":"OPSUMIT","Unique Patient Count":350},{"Outcome":"Death","Drug Name":"OPSUMIT","Unique Patient Count":250},{"Outcome":"Disability","Drug Name":"OPSUMIT","Unique Patient Count":32},{"Outcome":"Life-Threatening","Drug Name":"OPSUMIT","Unique Patient Count":17},{"Outcome":"Congenital Anomaly","Drug Name":"OPSUMIT","Unique Patient Count":3},{"Outcome":"Impairment/Damage","Drug Name":"GILENYA","Unique Patient Count":1255},{"Outcome":"Hospitalization - Initial or Prolonged","Drug Name":"GILENYA","Unique Patient Count":283},{"Outcome":"Disability","Drug Name":"GILENYA","Unique Patient Count":33},{"Outcome":"Death","Drug Name":"GILENYA","Unique Patient Count":24},{"Outcome":"Life-Threatening","Drug Name":"GILENYA","Unique Patient Count":19},{"Outcome":"Congenital Anomaly","Drug Name":"GILENYA","Unique Patient Count":2},{"Outcome":"Impairment/Damage","Drug Name":"COSENTYX","Unique Patient Count":1253},{"Outcome":"Hospitalization - Initial or Prolonged","Drug Name":"COSENTYX","Unique Patient Count":466},{"Outcome":"Death","Drug Name":"COSENTYX","Unique Patient Count":53},{"Outcome":"Life-Threatening","Drug Name":"COSENTYX","Unique Patient Count":31},{"Outcome":"Disability","Drug Name":"COSENTYX","Unique Patient Count":27},{"Outcome":"Congenital Anomaly","Drug Name":"COSENTYX","Unique Patient Count":1},{"Outcome":"Impairment/Damage","Drug Name":"NIVOLUMAB","Unique Patient Count":938},{"Outcome":"Hospitalization - Initial or Prolonged","Drug Name":"NIVOLUMAB","Unique Patient Count":677},{"Outcome":"Death","Drug Name":"NIVOLUMAB","Unique Patient Count":183},{"Outcome":"Life-Threatening","Drug Name":"NIVOLUMAB","Unique Patient Count":59},{"Outcome":"Disability","Drug Name":"NIVOLUMAB","Unique Patient Count":13},{"Outcome":"Impairment/Damage","Drug Name":"OPDIVO","Unique Patient Count":869},{"Outcome":"Hospitalization - Initial or Prolonged","Drug Name":"OPDIVO","Unique Patient Count":304},{"Outcome":"Death","Drug Name":"OPDIVO","Unique Patient Count":293},{"Outcome":"Life-Threatening","Drug Name":"OPDIVO","Unique Patient Count":28},{"Outcome":"Disability","Drug Name":"OPDIVO","Unique Patient Count":18},{"Outcome":"Impairment/Damage","Drug Name":"ABATACEPT","Unique Patient Count":840},{"Outcome":"Hospitalization - Initial or Prolonged","Drug Name":"ABATACEPT","Unique Patient Count":294},{"Outcome":"Death","Drug Name":"ABATACEPT","Unique Patient Count":41},{"Outcome":"Life-Threatening","Drug Name":"ABATACEPT","Unique Patient Count":26},{"Outcome":"Disability","Drug Name":"ABATACEPT","Unique Patient Count":25},{"Outcome":"Impairment/Damage","Drug Name":"ORENCIA","Unique Patient Count":819},{"Outcome":"Hospitalization - Initial or Prolonged","Drug Name":"ORENCIA","Unique Patient Count":146},{"Outcome":"Death","Drug Name":"ORENCIA","Unique Patient Count":30},{"Outcome":"Disability","Drug Name":"ORENCIA","Unique Patient Count":27},{"Outcome":"Life-Threatening","Drug Name":"ORENCIA","Unique Patient Count":9},{"Outcome":"Impairment/Damage","Drug Name":"NEXIUM","Unique Patient Count":809},{"Outcome":"Death","Drug Name":"NEXIUM","Unique Patient Count":56},{"Outcome":"Hospitalization - Initial or Prolonged","Drug Name":"NEXIUM","Unique Patient Count":34},{"Outcome":"Disability","Drug Name":"NEXIUM","Unique Patient Count":2},{"Outcome":"Impairment/Damage","Drug Name":"ENTRESTO","Unique Patient Count":798},{"Outcome":"Hospitalization - Initial or Prolonged","Drug Name":"ENTRESTO","Unique Patient Count":429},{"Outcome":"Death","Drug Name":"ENTRESTO","Unique Patient Count":289},{"Outcome":"Life-Threatening","Drug Name":"ENTRESTO","Unique Patient Count":35},{"Outcome":"Disability","Drug Name":"ENTRESTO","Unique Patient Count":14},{"Outcome":"Congenital Anomaly","Drug Name":"ENTRESTO","Unique Patient Count":1},{"Outcome":"Impairment/Damage","Drug Name":"METHOTREXATE.","Unique Patient Count":786},{"Outcome":"Hospitalization - Initial or Prolonged","Drug Name":"METHOTREXATE.","Unique Patient Count":339},{"Outcome":"Death","Drug Name":"METHOTREXATE.","Unique Patient Count":63},{"Outcome":"Life-Threatening","Drug Name":"METHOTREXATE.","Unique Patient Count":45},{"Outcome":"Disability","Drug Name":"METHOTREXATE.","Unique Patient Count":25},{"Outcome":"Congenital Anomaly","Drug Name":"METHOTREXATE.","Unique Patient Count":2},{"Outcome":"Required Intervention to Prevent Permanent","Drug Name":"METHOTREXATE.","Unique Patient Count":1},{"Outcome":"Impairment/Damage","Drug Name":"XOLAIR","Unique Patient Count":774},{"Outcome":"Hospitalization - Initial or Prolonged","Drug Name":"XOLAIR","Unique Patient Count":324},{"Outcome":"Death","Drug Name":"XOLAIR","Unique Patient Count":28},{"Outcome":"Life-Threatening","Drug Name":"XOLAIR","Unique Patient Count":22},{"Outcome":"Disability","Drug Name":"XOLAIR","Unique Patient Count":14},{"Outcome":"Congenital Anomaly","Drug Name":"XOLAIR","Unique Patient Count":2},{"Outcome":"Hospitalization - Initial or Prolonged","Drug Name":"PRADAXA","Unique Patient Count":761},{"Outcome":"Impairment/Damage","Drug Name":"PRADAXA","Unique Patient Count":176},{"Outcome":"Death","Drug Name":"PRADAXA","Unique Patient Count":123},{"Outcome":"Life-Threatening","Drug Name":"PRADAXA","Unique Patient Count":32},{"Outcome":"Disability","Drug Name":"PRADAXA","Unique Patient Count":11},{"Outcome":"Impairment/Damage","Drug Name":"LYRICA","Unique Patient Count":759},{"Outcome":"Hospitalization - Initial or Prolonged","Drug Name":"LYRICA","Unique Patient Count":359},{"Outcome":"Disability","Drug Name":"LYRICA","Unique Patient Count":36},{"Outcome":"Death","Drug Name":"LYRICA","Unique Patient Count":21},{"Outcome":"Life-Threatening","Drug Name":"LYRICA","Unique Patient Count":19}];
      //   this.stacked_bar_chart_non_time_xKey             = "Outcome";
      //   this.stacked_bar_chart_non_time_yKey             = "Unique Patient Count";
      //   this.stacked_bar_chart_non_time_primary_column   = "Drug Name";
      //   this.stacked_bar_chart_non_time_secondary_column = "Outcome";
      //   this.show_stacked_bar_chart_non_time = true;
      //   // if(response.data.graph_recommendations.heading.text) {
      //     this.show_heading = true;
      //     // this.heading = response.data.graph_recommendations.heading.text;
      //   // }
      // // }
      //   var map = this.stacked_bar_chart_non_time_data.reduce((r, i) => ((r[i[this.stacked_bar_chart_non_time_primary_column]] = r[i[this.stacked_bar_chart_non_time_primary_column]] || []).push({
      //       // date : i[this.stacked_bar_chart_non_time_secondary_column],
      //       // sales: i[this.stacked_bar_chart_non_time_yKey]
      //           i
      //   }), r), {});
      //   var entries = Object.entries(map);
      //   this.chart_types = [];
      //   this.chart_types_to_be_displayed = [];
      //   if(entries.length > 20){
      //     this.chart_types_to_be_displayed.push("stacked_bar_non_time");
      //   } else {
      //     this.chart_types_to_be_displayed.push("grouped_bar","stacked_bar_non_time");
      //   }
      //   this.push_chart_types();
      //   this.current_graph_data.data              = this.stacked_bar_chart_non_time_data            ;
      //   this.current_graph_data.xKey              = this.stacked_bar_chart_non_time_xKey            ;
      //   this.current_graph_data.yKey              = this.stacked_bar_chart_non_time_yKey            ;
      //   this.current_graph_data.primary_column    = this.stacked_bar_chart_non_time_primary_column  ;
      //   this.current_graph_data.secondary_column  = this.stacked_bar_chart_non_time_secondary_column;

      // this.multi_line_graph_xKey = "Drug Active Ingredient";
      // this.multi_line_graph_yKey =  "Unique Patient Count";
      // this.multi_line_graph_dateKey = "DATENEW";

      // this.show_multi_line_graph = true;
      // console.log(this.multi_line_graph_data);
      // this.multi_line_graph_data = [
      //   {"MONTH":"04","YEAR":"2018","DrugActiveIngredient":"AMBRISENTAN","UniquePatientCount":1,"ReportDate":"Thu, 12 Apr 2018 00:00:00 GMT"},
      //   {"MONTH":"09","YEAR":"2018","DrugActiveIngredient":"APIXABAN","UniquePatientCount":1,"ReportDate":"Wed, 12 Sep 2018 00:00:00 GMT"},
      //   {"MONTH":"09","YEAR":"2018","DrugActiveIngredient":"RIVAROXABAN","UniquePatientCount":1,"ReportDate":"Tue, 18 Sep 2018 00:00:00 GMT"},
      //   {"MONTH":"10","YEAR":"2018","DrugActiveIngredient":"APIXABAN","UniquePatientCount":1,"ReportDate":"Tue, 02 Oct 2018 00:00:00 GMT"},
      //   {"MONTH":"10","YEAR":"2018","DrugActiveIngredient":"LENALIDOMIDE","UniquePatientCount":1,"ReportDate":"Fri, 12 Oct 2018 00:00:00 GMT"},
      //   {"MONTH":"10","YEAR":"2018","DrugActiveIngredient":"RIVAROXABAN","UniquePatientCount":3,"ReportDate":"Fri, 12 Oct 2018 00:00:00 GMT"},
      //   {"MONTH":"11","YEAR":"2018","DrugActiveIngredient":"RIVAROXABAN","UniquePatientCount":2,"ReportDate":"Tue, 20 Nov 2018 00:00:00 GMT"},
      //   {"MONTH":"12","YEAR":"2018","DrugActiveIngredient":"APIXABAN","UniquePatientCount":2,"ReportDate":"Tue, 18 Dec 2018 00:00:00 GMT"},
      //   {"MONTH":"12","YEAR":"2018","DrugActiveIngredient":"RIVAROXABAN","UniquePatientCount":1,"ReportDate":"Wed, 26 Dec 2018 00:00:00 GMT"},{"MONTH":"01","YEAR":"2019","DrugActiveIngredient":"SACUBITRIL\\VALSARTAN","UniquePatientCount":1,"ReportDate":"Thu, 03 Jan 2019 00:00:00 GMT"},{"MONTH":"01","YEAR":"2019","DrugActiveIngredient":"RIVAROXABAN","UniquePatientCount":3,"ReportDate":"Thu, 24 Jan 2019 00:00:00 GMT"},{"MONTH":"01","YEAR":"2019","DrugActiveIngredient":"SECUKINUMAB","UniquePatientCount":1,"ReportDate":"Tue, 29 Jan 2019 00:00:00 GMT"},{"MONTH":"02","YEAR":"2019","DrugActiveIngredient":"APIXABAN","UniquePatientCount":5,"ReportDate":"Fri, 15 Feb 2019 00:00:00 GMT"},{"MONTH":"02","YEAR":"2019","DrugActiveIngredient":"METHOTREXATE","UniquePatientCount":1,"ReportDate":"Thu, 21 Feb 2019 00:00:00 GMT"},{"MONTH":"02","YEAR":"2019","DrugActiveIngredient":"FINGOLIMOD HYDROCHLORIDE","UniquePatientCount":1,"ReportDate":"Mon, 25 Feb 2019 00:00:00 GMT"},{"MONTH":"02","YEAR":"2019","DrugActiveIngredient":"RIVAROXABAN","UniquePatientCount":3,"ReportDate":"Tue, 26 Feb 2019 00:00:00 GMT"},{"MONTH":"02","YEAR":"2019","DrugActiveIngredient":"NIVOLUMAB","UniquePatientCount":2,"ReportDate":"Wed, 27 Feb 2019 00:00:00 GMT"},{"MONTH":"02","YEAR":"2019","DrugActiveIngredient":"ETANERCEPT","UniquePatientCount":1,"ReportDate":"Wed, 27 Feb 2019 00:00:00 GMT"},{"MONTH":"02","YEAR":"2019","DrugActiveIngredient":"LENALIDOMIDE","UniquePatientCount":1,"ReportDate":"Wed, 27 Feb 2019 00:00:00 GMT"},{"MONTH":"02","YEAR":"2019","DrugActiveIngredient":"ADALIMUMAB","UniquePatientCount":4,"ReportDate":"Wed, 27 Feb 2019 00:00:00 GMT"},{"MONTH":"02","YEAR":"2019","DrugActiveIngredient":"TOFACITINIB CITRATE","UniquePatientCount":2,"ReportDate":"Thu, 28 Feb 2019 00:00:00 GMT"},{"MONTH":"02","YEAR":"2019","DrugActiveIngredient":"SECUKINUMAB","UniquePatientCount":1,"ReportDate":"Thu, 28 Feb 2019 00:00:00 GMT"},{"MONTH":"02","YEAR":"2019","DrugActiveIngredient":"INFLIXIMAB","UniquePatientCount":2,"ReportDate":"Thu, 28 Feb 2019 00:00:00 GMT"},{"MONTH":"02","YEAR":"2019","DrugActiveIngredient":"AMBRISENTAN","UniquePatientCount":9,"ReportDate":"Thu, 28 Feb 2019 00:00:00 GMT"},{"MONTH":"03","YEAR":"2019","DrugActiveIngredient":"TOFACITINIB CITRATE","UniquePatientCount":29,"ReportDate":"Fri, 01 Mar 2019 00:00:00 GMT"},{"MONTH":"03","YEAR":"2019","DrugActiveIngredient":"SACUBITRIL\\VALSARTAN","UniquePatientCount":5,"ReportDate":"Fri, 01 Mar 2019 00:00:00 GMT"},{"MONTH":"03","YEAR":"2019","DrugActiveIngredient":"ABATACEPT","UniquePatientCount":10,"ReportDate":"Fri, 01 Mar 2019 00:00:00 GMT"},{"MONTH":"03","YEAR":"2019","DrugActiveIngredient":"AMBRISENTAN","UniquePatientCount":18,"ReportDate":"Wed, 06 Mar 2019 00:00:00 GMT"},{"MONTH":"03","YEAR":"2019","DrugActiveIngredient":"RIVAROXABAN","UniquePatientCount":10,"ReportDate":"Wed, 06 Mar 2019 00:00:00 GMT"},{"MONTH":"03","YEAR":"2019","DrugActiveIngredient":"DABIGATRAN ETEXILATE MESYLATE","UniquePatientCount":1,"ReportDate":"Wed, 06 Mar 2019 00:00:00 GMT"},{"MONTH":"03","YEAR":"2019","DrugActiveIngredient":"METHOTREXATE","UniquePatientCount":6,"ReportDate":"Thu, 07 Mar 2019 00:00:00 GMT"},{"MONTH":"03","YEAR":"2019","DrugActiveIngredient":"INFLIXIMAB","UniquePatientCount":3,"ReportDate":"Tue, 12 Mar 2019 00:00:00 GMT"},{"MONTH":"03","YEAR":"2019","DrugActiveIngredient":"MACITENTAN","UniquePatientCount":11,"ReportDate":"Tue, 12 Mar 2019 00:00:00 GMT"},{"MONTH":"03","YEAR":"2019","DrugActiveIngredient":"APIXABAN","UniquePatientCount":27,"ReportDate":"Wed, 13 Mar 2019 00:00:00 GMT"},{"MONTH":"03","YEAR":"2019","DrugActiveIngredient":"ADALIMUMAB","UniquePatientCount":149,"ReportDate":"Wed, 13 Mar 2019 00:00:00 GMT"},{"MONTH":"03","YEAR":"2019","DrugActiveIngredient":"LANSOPRAZOLE","UniquePatientCount":2,"ReportDate":"Thu, 14 Mar 2019 00:00:00 GMT"},{"MONTH":"03","YEAR":"2019","DrugActiveIngredient":"SECUKINUMAB","UniquePatientCount":16,"ReportDate":"Mon, 18 Mar 2019 00:00:00 GMT"},{"MONTH":"03","YEAR":"2019","DrugActiveIngredient":"LENALIDOMIDE","UniquePatientCount":4,"ReportDate":"Mon, 18 Mar 2019 00:00:00 GMT"},{"MONTH":"03","YEAR":"2019","DrugActiveIngredient":"FINGOLIMOD HYDROCHLORIDE","UniquePatientCount":1,"ReportDate":"Thu, 21 Mar 2019 00:00:00 GMT"},{"MONTH":"03","YEAR":"2019","DrugActiveIngredient":"ETANERCEPT","UniquePatientCount":52,"ReportDate":"Fri, 22 Mar 2019 00:00:00 GMT"},{"MONTH":"03","YEAR":"2019","DrugActiveIngredient":"PREGABALIN","UniquePatientCount":3,"ReportDate":"Sun, 24 Mar 2019 00:00:00 GMT"},{"MONTH":"03","YEAR":"2019","DrugActiveIngredient":"NIVOLUMAB","UniquePatientCount":11,"ReportDate":"Mon, 25 Mar 2019 00:00:00 GMT"},{"MONTH":"03","YEAR":"2019","DrugActiveIngredient":"IBRUTINIB","UniquePatientCount":4,"ReportDate":"Thu, 28 Mar 2019 00:00:00 GMT"},{"MONTH":"03","YEAR":"2019","DrugActiveIngredient":"DOCETAXEL","UniquePatientCount":17,"ReportDate":"Fri, 29 Mar 2019 00:00:00 GMT"},{"MONTH":"04","YEAR":"2019","DrugActiveIngredient":"ABATACEPT","UniquePatientCount":580,"ReportDate":"Mon, 01 Apr 2019 00:00:00 GMT"},{"MONTH":"04","YEAR":"2019","DrugActiveIngredient":"ADALIMUMAB","UniquePatientCount":2378,"ReportDate":"Wed, 03 Apr 2019 00:00:00 GMT"},{"MONTH":"04","YEAR":"2019","DrugActiveIngredient":"SACUBITRIL\\VALSARTAN","UniquePatientCount":527,"ReportDate":"Thu, 04 Apr 2019 00:00:00 GMT"},{"MONTH":"04","YEAR":"2019","DrugActiveIngredient":"DOCETAXEL","UniquePatientCount":634,"ReportDate":"Fri, 05 Apr 2019 00:00:00 GMT"},{"MONTH":"04","YEAR":"2019","DrugActiveIngredient":"AMBRISENTAN","UniquePatientCount":523,"ReportDate":"Fri, 05 Apr 2019 00:00:00 GMT"},{"MONTH":"04","YEAR":"2019","DrugActiveIngredient":"ETANERCEPT","UniquePatientCount":714,"ReportDate":"Wed, 10 Apr 2019 00:00:00 GMT"},{"MONTH":"04","YEAR":"2019","DrugActiveIngredient":"TOFACITINIB CITRATE","UniquePatientCount":522,"ReportDate":"Thu, 11 Apr 2019 00:00:00 GMT"},{"MONTH":"04","YEAR":"2019","DrugActiveIngredient":"RIVAROXABAN","UniquePatientCount":3884,"ReportDate":"Sun, 14 Apr 2019 00:00:00 GMT"},{"MONTH":"04","YEAR":"2019","DrugActiveIngredient":"MACITENTAN","UniquePatientCount":555,"ReportDate":"Mon, 15 Apr 2019 00:00:00 GMT"},{"MONTH":"04","YEAR":"2019","DrugActiveIngredient":"METHOTREXATE","UniquePatientCount":852,"ReportDate":"Tue, 16 Apr 2019 00:00:00 GMT"},{"MONTH":"04","YEAR":"2019","DrugActiveIngredient":"PREGABALIN","UniquePatientCount":281,"ReportDate":"Tue, 16 Apr 2019 00:00:00 GMT"},{"MONTH":"04","YEAR":"2019","DrugActiveIngredient":"FINGOLIMOD HYDROCHLORIDE","UniquePatientCount":455,"ReportDate":"Tue, 16 Apr 2019 00:00:00 GMT"},{"MONTH":"04","YEAR":"2019","DrugActiveIngredient":"SECUKINUMAB","UniquePatientCount":587,"ReportDate":"Wed, 17 Apr 2019 00:00:00 GMT"},{"MONTH":"04","YEAR":"2019","DrugActiveIngredient":"IBRUTINIB","UniquePatientCount":377,"ReportDate":"Thu, 18 Apr 2019 00:00:00 GMT"},{"MONTH":"04","YEAR":"2019","DrugActiveIngredient":"DABIGATRAN ETEXILATE MESYLATE","UniquePatientCount":399,"ReportDate":"Mon, 22 Apr 2019 00:00:00 GMT"},{"MONTH":"04","YEAR":"2019","DrugActiveIngredient":"LENALIDOMIDE","UniquePatientCount":1513,"ReportDate":"Mon, 22 Apr 2019 00:00:00 GMT"},{"MONTH":"04","YEAR":"2019","DrugActiveIngredient":"INFLIXIMAB","UniquePatientCount":371,"ReportDate":"Wed, 24 Apr 2019 00:00:00 GMT"},{"MONTH":"04","YEAR":"2019","DrugActiveIngredient":"NIVOLUMAB","UniquePatientCount":956,"ReportDate":"Wed, 24 Apr 2019 00:00:00 GMT"},{"MONTH":"04","YEAR":"2019","DrugActiveIngredient":"LANSOPRAZOLE","UniquePatientCount":1102,"ReportDate":"Thu, 25 Apr 2019 00:00:00 GMT"},{"MONTH":"04","YEAR":"2019","DrugActiveIngredient":"APIXABAN","UniquePatientCount":923,"ReportDate":"Fri, 26 Apr 2019 00:00:00 GMT"},{"MONTH":"05","YEAR":"2019","DrugActiveIngredient":"DOCETAXEL","UniquePatientCount":858,"ReportDate":"Wed, 01 May 2019 00:00:00 GMT"},{"MONTH":"05","YEAR":"2019","DrugActiveIngredient":"MACITENTAN","UniquePatientCount":663,"ReportDate":"Wed, 01 May 2019 00:00:00 GMT"},{"MONTH":"05","YEAR":"2019","DrugActiveIngredient":"ABATACEPT","UniquePatientCount":710,"ReportDate":"Thu, 02 May 2019 00:00:00 GMT"},{"MONTH":"05","YEAR":"2019","DrugActiveIngredient":"ADALIMUMAB","UniquePatientCount":2442,"ReportDate":"Fri, 03 May 2019 00:00:00 GMT"},{"MONTH":"05","YEAR":"2019","DrugActiveIngredient":"TOFACITINIB CITRATE","UniquePatientCount":528,"ReportDate":"Mon, 06 May 2019 00:00:00 GMT"},{"MONTH":"05","YEAR":"2019","DrugActiveIngredient":"DABIGATRAN ETEXILATE MESYLATE","UniquePatientCount":381,"ReportDate":"Tue, 07 May 2019 00:00:00 GMT"},{"MONTH":"05","YEAR":"2019","DrugActiveIngredient":"APIXABAN","UniquePatientCount":804,"ReportDate":"Thu, 09 May 2019 00:00:00 GMT"},{"MONTH":"05","YEAR":"2019","DrugActiveIngredient":"NIVOLUMAB","UniquePatientCount":1207,"ReportDate":"Thu, 09 May 2019 00:00:00 GMT"},{"MONTH":"05","YEAR":"2019","DrugActiveIngredient":"SACUBITRIL\\VALSARTAN","UniquePatientCount":586,"ReportDate":"Thu, 09 May 2019 00:00:00 GMT"},{"MONTH":"05","YEAR":"2019","DrugActiveIngredient":"LANSOPRAZOLE","UniquePatientCount":793,"ReportDate":"Fri, 10 May 2019 00:00:00 GMT"},{"MONTH":"05","YEAR":"2019","DrugActiveIngredient":"SECUKINUMAB","UniquePatientCount":605,"ReportDate":"Mon, 13 May 2019 00:00:00 GMT"},{"MONTH":"05","YEAR":"2019","DrugActiveIngredient":"IBRUTINIB","UniquePatientCount":501,"ReportDate":"Mon, 13 May 2019 00:00:00 GMT"},{"MONTH":"05","YEAR":"2019","DrugActiveIngredient":"ETANERCEPT","UniquePatientCount":759,"ReportDate":"Tue, 14 May 2019 00:00:00 GMT"},{"MONTH":"05","YEAR":"2019","DrugActiveIngredient":"AMBRISENTAN","UniquePatientCount":521,"ReportDate":"Thu, 16 May 2019 00:00:00 GMT"},{"MONTH":"05","YEAR":"2019","DrugActiveIngredient":"FINGOLIMOD HYDROCHLORIDE","UniquePatientCount":578,"ReportDate":"Thu, 16 May 2019 00:00:00 GMT"},{"MONTH":"05","YEAR":"2019","DrugActiveIngredient":"METHOTREXATE","UniquePatientCount":468,"ReportDate":"Tue, 21 May 2019 00:00:00 GMT"},{"MONTH":"05","YEAR":"2019","DrugActiveIngredient":"INFLIXIMAB","UniquePatientCount":449,"ReportDate":"Wed, 22 May 2019 00:00:00 GMT"},{"MONTH":"05","YEAR":"2019","DrugActiveIngredient":"PREGABALIN","UniquePatientCount":466,"ReportDate":"Thu, 23 May 2019 00:00:00 GMT"},{"MONTH":"05","YEAR":"2019","DrugActiveIngredient":"LENALIDOMIDE","UniquePatientCount":1495,"ReportDate":"Fri, 24 May 2019 00:00:00 GMT"},{"MONTH":"05","YEAR":"2019","DrugActiveIngredient":"RIVAROXABAN","UniquePatientCount":528,"ReportDate":"Sat, 25 May 2019 00:00:00 GMT"},{"MONTH":"06","YEAR":"2019","DrugActiveIngredient":"TOFACITINIB CITRATE","UniquePatientCount":510,"ReportDate":"Tue, 04 Jun 2019 00:00:00 GMT"},{"MONTH":"06","YEAR":"2019","DrugActiveIngredient":"DABIGATRAN ETEXILATE MESYLATE","UniquePatientCount":506,"ReportDate":"Wed, 05 Jun 2019 00:00:00 GMT"},{"MONTH":"06","YEAR":"2019","DrugActiveIngredient":"LENALIDOMIDE","UniquePatientCount":1504,"ReportDate":"Thu, 06 Jun 2019 00:00:00 GMT"},{"MONTH":"06","YEAR":"2019","DrugActiveIngredient":"RIVAROXABAN","UniquePatientCount":408,"ReportDate":"Fri, 07 Jun 2019 00:00:00 GMT"},{"MONTH":"06","YEAR":"2019","DrugActiveIngredient":"ADALIMUMAB","UniquePatientCount":2583,"ReportDate":"Fri, 07 Jun 2019 00:00:00 GMT"},{"MONTH":"06","YEAR":"2019","DrugActiveIngredient":"ABATACEPT","UniquePatientCount":965,"ReportDate":"Mon, 10 Jun 2019 00:00:00 GMT"},{"MONTH":"06","YEAR":"2019","DrugActiveIngredient":"MACITENTAN","UniquePatientCount":720,"ReportDate":"Mon, 10 Jun 2019 00:00:00 GMT"},{"MONTH":"06","YEAR":"2019","DrugActiveIngredient":"SECUKINUMAB","UniquePatientCount":686,"ReportDate":"Tue, 11 Jun 2019 00:00:00 GMT"},{"MONTH":"06","YEAR":"2019","DrugActiveIngredient":"PREGABALIN","UniquePatientCount":547,"ReportDate":"Tue, 11 Jun 2019 00:00:00 GMT"},{"MONTH":"06","YEAR":"2019","DrugActiveIngredient":"APIXABAN","UniquePatientCount":996,"ReportDate":"Tue, 11 Jun 2019 00:00:00 GMT"},{"MONTH":"06","YEAR":"2019","DrugActiveIngredient":"INFLIXIMAB","UniquePatientCount":530,"ReportDate":"Wed, 12 Jun 2019 00:00:00 GMT"},{"MONTH":"06","YEAR":"2019","DrugActiveIngredient":"NIVOLUMAB","UniquePatientCount":1241,"ReportDate":"Fri, 14 Jun 2019 00:00:00 GMT"},{"MONTH":"06","YEAR":"2019","DrugActiveIngredient":"FINGOLIMOD HYDROCHLORIDE","UniquePatientCount":612,"ReportDate":"Fri, 14 Jun 2019 00:00:00 GMT"},{"MONTH":"06","YEAR":"2019","DrugActiveIngredient":"METHOTREXATE","UniquePatientCount":655,"ReportDate":"Mon, 17 Jun 2019 00:00:00 GMT"},{"MONTH":"06","YEAR":"2019","DrugActiveIngredient":"SACUBITRIL\\VALSARTAN","UniquePatientCount":588,"ReportDate":"Tue, 18 Jun 2019 00:00:00 GMT"},{"MONTH":"06","YEAR":"2019","DrugActiveIngredient":"ETANERCEPT","UniquePatientCount":1390,"ReportDate":"Tue, 18 Jun 2019 00:00:00 GMT"},{"MONTH":"06","YEAR":"2019","DrugActiveIngredient":"AMBRISENTAN","UniquePatientCount":465,"ReportDate":"Tue, 18 Jun 2019 00:00:00 GMT"},{"MONTH":"06","YEAR":"2019","DrugActiveIngredient":"LANSOPRAZOLE","UniquePatientCount":298,"ReportDate":"Thu, 20 Jun 2019 00:00:00 GMT"},{"MONTH":"06","YEAR":"2019","DrugActiveIngredient":"DOCETAXEL","UniquePatientCount":611,"ReportDate":"Mon, 24 Jun 2019 00:00:00 GMT"},{"MONTH":"06","YEAR":"2019","DrugActiveIngredient":"IBRUTINIB","UniquePatientCount":392,"ReportDate":"Fri, 28 Jun 2019 00:00:00 GMT"},{"MONTH":"07","YEAR":"2019","DrugActiveIngredient":"DABIGATRAN ETEXILATE MESYLATE","UniquePatientCount":1,"ReportDate":"Mon, 01 Jul 2019 00:00:00 GMT"},{"MONTH":"07","YEAR":"2019","DrugActiveIngredient":"ETANERCEPT","UniquePatientCount":1,"ReportDate":"Mon, 01 Jul 2019 00:00:00 GMT"}]
      // this.multi_line_graph_xKey = "DrugActiveIngredient";
      // this.multi_line_graph_yKey =  "UniquePatientCount";
      // this.multi_line_graph_dateKey = "ReportDate";
      // this.show_multi_line_graph = true;
      // console.log(this.multi_line_graph_data);
      // this.line_graph_data = [{"Sales":3.71956,"NAME":"Peaches Yellow"},{"Sales":4.72,"NAME":"Garlic loose"},{"Sales":0.835,"NAME":"Eggplant"},{"Sales":1.0128,"NAME":"Carrots "},{"Sales":5.9569600000000005,"NAME":"Nectarine Yellow"},{"Sales":1.81818181818182,"NAME":"Longans "},{"Sales":4.4532,"NAME":"Watermelon seedless"}];

    // this.line_graph_xKey = "NAME";
    // this.line_graph_yKey = "Sales";
    // this.donut_chart_Data = [{"Sales":3.71956,"NAME":"Peaches Yellow"},{"Sales":4.72,"NAME":"Garlic loose"},{"Sales":0.835,"NAME":"Eggplant"},{"Sales":1.0128,"NAME":"Carrots "},{"Sales":5.9569600000000005,"NAME":"Nectarine Yellow"},{"Sales":1.81818181818182,"NAME":"Longans "},{"Sales":4.4532,"NAME":"Watermelon seedless"}];
    // this.donut_chart_xKey = "NAME";
    // this.donut_chart_yKey = "Sales";
    // this.show_2d_donut_chart = true;
    // this.show_piechart = true;
    // this.barChartData = [{"Sales":3.71956,"NAME":"Peaches Yellow"},{"Sales":4.72,"NAME":"Garlic loose"},{"Sales":0.835,"NAME":"Eggplant"},{"Sales":1.0128,"NAME":"Carrots "},{"Sales":5.9569600000000005,"NAME":"Nectarine Yellow"},{"Sales":1.81818181818182,"NAME":"Longans "},{"Sales":4.4532,"NAME":"Watermelon seedless"}];
    // this.bar_chart_xKey = "NAME";
    // this.bar_chart_yKey = "Sales";
    // setTimeout(() => {
    //   this.show_bargraph = true;
    // }, 2000);
    // axios
    //   .post(api_calls.bi_temp_search_data(), {
    //     email: this.$session.get("UserInformation").email,
    //     token: this.$session.get("UserInformation").tokens,
    //     company_name: this.$session.get("UserInformation").company_name,
    //     company_id: this.$session.get("UserInformation").company_id,
    //     license_key: this.$session.get("UserInformation").license_key,
    //     q: "Count Death Drug Name United States"
    //   })
    //   .then(response => {
    // console.log(response);
    // this.show_bargraph = true;
    //       this.barChartData = response.data.data;
    //       this.bar_graph_xKey = response.data.graph_metadata.x.toString();
    //       this.bar_graph_yKey = response.data.graph_metadata.y;
    // });

    // this.chart_types.push({
    //   type: "Bar",
    //   icon: this.barchart_icon_svg
    // });
    // var arr = ["bar","pie_2d","donut_2d","horizontal_bar","stacked_bar_time","grouped_bar","line","multi_line"]
    // this.push_chart_types(arr);

    // this.stacked_bar_chart_non_time_data             = [{"Outcome":"Impairment/Damage","Unique Patient Count":42343,"Age Group":"Adult (18 to 64)"},{"Outcome":"Impairment/Damage","Unique Patient Count":25688,"Age Group":"Neonate (0 to 1)"},{"Outcome":"Impairment/Damage","Unique Patient Count":25359,"Age Group":"Elderly (more than 65)"},{"Outcome":"Impairment/Damage","Unique Patient Count":1952,"Age Group":"Child (6 to 13)"},{"Outcome":"Impairment/Damage","Unique Patient Count":1280,"Age Group":"Adolescent (14 to 17)"},{"Outcome":"Impairment/Damage","Unique Patient Count":867,"Age Group":"Infant (1 to 5)"},{"Outcome":"Hospitalization - Initial or Prolonged","Unique Patient Count":23561,"Age Group":"Adult (18 to 64)"},{"Outcome":"Hospitalization - Initial or Prolonged","Unique Patient Count":21378,"Age Group":"Elderly (more than 65)"},{"Outcome":"Hospitalization - Initial or Prolonged","Unique Patient Count":12353,"Age Group":"Neonate (0 to 1)"},{"Outcome":"Hospitalization - Initial or Prolonged","Unique Patient Count":1257,"Age Group":"Child (6 to 13)"},{"Outcome":"Hospitalization - Initial or Prolonged","Unique Patient Count":967,"Age Group":"Adolescent (14 to 17)"},{"Outcome":"Hospitalization - Initial or Prolonged","Unique Patient Count":554,"Age Group":"Infant (1 to 5)"},{"Outcome":"Death","Unique Patient Count":6370,"Age Group":"Elderly (more than 65)"},{"Outcome":"Death","Unique Patient Count":4906,"Age Group":"Neonate (0 to 1)"},{"Outcome":"Death","Unique Patient Count":4891,"Age Group":"Adult (18 to 64)"},{"Outcome":"Death","Unique Patient Count":221,"Age Group":"Child (6 to 13)"},{"Outcome":"Death","Unique Patient Count":114,"Age Group":"Adolescent (14 to 17)"},{"Outcome":"Death","Unique Patient Count":110,"Age Group":"Infant (1 to 5)"},{"Outcome":"Life-Threatening","Unique Patient Count":2231,"Age Group":"Adult (18 to 64)"},{"Outcome":"Life-Threatening","Unique Patient Count":1751,"Age Group":"Elderly (more than 65)"},{"Outcome":"Life-Threatening","Unique Patient Count":401,"Age Group":"Neonate (0 to 1)"},{"Outcome":"Life-Threatening","Unique Patient Count":136,"Age Group":"Child (6 to 13)"},{"Outcome":"Life-Threatening","Unique Patient Count":116,"Age Group":"Adolescent (14 to 17)"},{"Outcome":"Life-Threatening","Unique Patient Count":77,"Age Group":"Infant (1 to 5)"},{"Outcome":"Disability","Unique Patient Count":1608,"Age Group":"Adult (18 to 64)"},{"Outcome":"Disability","Unique Patient Count":852,"Age Group":"Elderly (more than 65)"},{"Outcome":"Disability","Unique Patient Count":413,"Age Group":"Neonate (0 to 1)"},{"Outcome":"Disability","Unique Patient Count":45,"Age Group":"Child (6 to 13)"},{"Outcome":"Disability","Unique Patient Count":43,"Age Group":"Adolescent (14 to 17)"},{"Outcome":"Disability","Unique Patient Count":23,"Age Group":"Infant (1 to 5)"}]
    // this.stacked_bar_chart_non_time_xKey             = "Outcome";
    // this.stacked_bar_chart_non_time_yKey             = "Unique Patient Count";
    // this.stacked_bar_chart_non_time_primary_column   = "Outcome";
    // this.stacked_bar_chart_non_time_secondary_column = "Age Group";
    // this.show_stacked_bar_chart_non_time = true;

    // this.grouped_bar_chart_data = [{"Unique Patient Count":3655,"Drug Name":"HUMIRA","Age Group":"Adult (18 to 64)"},{"Unique Patient Count":1968,"Drug Name":"HUMIRA","Age Group":"Neonate (0 to 1)"},{"Unique Patient Count":1605,"Drug Name":"HUMIRA","Age Group":"Elderly (more than 65)"},{"Unique Patient Count":90,"Drug Name":"HUMIRA","Age Group":"Adolescent (14 to 17)"},{"Unique Patient Count":45,"Drug Name":"HUMIRA","Age Group":"Child (6 to 13)"},{"Unique Patient Count":7,"Drug Name":"HUMIRA","Age Group":"Infant (1 to 5)"},{"Unique Patient Count":3338,"Drug Name":"XARELTO","Age Group":"Neonate (0 to 1)"},{"Unique Patient Count":975,"Drug Name":"XARELTO","Age Group":"Elderly (more than 65)"},{"Unique Patient Count":440,"Drug Name":"XARELTO","Age Group":"Adult (18 to 64)"},{"Unique Patient Count":4,"Drug Name":"XARELTO","Age Group":"Child (6 to 13)"},{"Unique Patient Count":2,"Drug Name":"XARELTO","Age Group":"Adolescent (14 to 17)"},{"Unique Patient Count":1974,"Drug Name":"REVLIMID","Age Group":"Elderly (more than 65)"},{"Unique Patient Count":1845,"Drug Name":"REVLIMID","Age Group":"Neonate (0 to 1)"},{"Unique Patient Count":650,"Drug Name":"REVLIMID","Age Group":"Adult (18 to 64)"},{"Unique Patient Count":7,"Drug Name":"REVLIMID","Age Group":"Child (6 to 13)"},{"Unique Patient Count":1,"Drug Name":"REVLIMID","Age Group":"Infant (1 to 5)"},{"Unique Patient Count":1768,"Drug Name":"PREVACID","Age Group":"Neonate (0 to 1)"},{"Unique Patient Count":137,"Drug Name":"PREVACID","Age Group":"Adult (18 to 64)"},{"Unique Patient Count":31,"Drug Name":"PREVACID","Age Group":"Elderly (more than 65)"},{"Unique Patient Count":1458,"Drug Name":"ENBREL","Age Group":"Adult (18 to 64)"},{"Unique Patient Count":772,"Drug Name":"ENBREL","Age Group":"Elderly (more than 65)"},{"Unique Patient Count":402,"Drug Name":"ENBREL","Age Group":"Neonate (0 to 1)"},{"Unique Patient Count":18,"Drug Name":"ENBREL","Age Group":"Adolescent (14 to 17)"},{"Unique Patient Count":12,"Drug Name":"ENBREL","Age Group":"Child (6 to 13)"},{"Unique Patient Count":2,"Drug Name":"ENBREL","Age Group":"Infant (1 to 5)"}];
    // this.grouped_bar_chart_yKey = "Unique Patient Count";
    // this.grouped_bar_chart_primary_column = "Drug Name";
    // this.grouped_bar_chart_secondary_column = "Age Group";
    // this.show_grouped_bar_chart = true;

    // $('#dropdown_charts').on('show.bs.dropdown', function () {
    //     alert('Come on lets show the dropdown!!');
    // });



    // Initializing the dataset and reports list icons;
    this.reports_list_icon_to_be_shown = this.reports_list_icon_svg_default;
    this.dataset_icon_to_be_showed = this.dataset_icon_svg;
    this.spinnerOn = true;
      axios
      .get(api_calls.bi_data_sheet_details(), {
        params : {
          email: this.$session.get("UserInformation").email,
          token: this.$session.get("UserInformation").tokens,
          company_name: this.$session.get("UserInformation").company_name,
          company_id: this.$session.get("UserInformation").company_id,
          license_key: this.$session.get("UserInformation").license_key,
          // dataset_name: "Fruithut v1",
          // dataset_name: "Drug Trial Data",
        }
      }).then(response => {
        for(let i = 0; i < response.data.data_sources.length; i++) {
          this.datasets.push(response.data.data_sources[i].data_name);
          this.all_dataset_column_details.push({
            'dataset_name': response.data.data_sources[i].data_name,
            'column_details': response.data.data_sources[i].worksheet_details.column_details
          })
        }
        this.spinnerOn = false;

      })
      .catch(err => {
        // console.log(err);
        toastr.error("Some Error Occurred, please try again");
      });
      this.$root.$on('nlp_search', (data) => {
        if (data === true) {
          this.nlp_search = true;
        }
        if (data === false) {
          this.nlp_search = false;
        }
      });

      this.get_reports_list();
  },
  methods: {
    tag_added() {
      if(this.nlp_search == true && this.search_data.length > 0) {
      var search_data2 = this.search_data[0].value;
      }
      if(this.search_data.length == 0 && !this.nlp_search ) {
        this.dataset_name = null;
      }
      this.show_reports_list = false;
      this.search_result = [];
      if((this.search_data.length > 0) || (this.nlp_search === true)){
        if(this.nlp_search === true && this.dataset_name === null){
          // console.log("Heywenfkucnwek");
          // break;
          // toastr.error("Please select Data Set Before Searching");
          document.getElementById('searchbar').value = '';
           Swal({
                type: "error",
                text: "Please select Data Set Before Searching",
                showConfirmButton: true,
                timer: 2500,
            }).then(result => {
              this.search_data = [];
            });
        } else {
      // console.log("Hi",this.search_data.length);
      this.show_bargraph = false;
      this.show_linegraph = false;
      this.show_piechart = false;
      this.show_table = false;
      this.show_multi_line_graph = false,
      this.show_heading = false;
      this.show_2d_donut_chart = false;
      this.show_grouped_bar_chart = false;
      this.show_stacked_bar_chart = false;
      this.show_horizontal_bargraph = false;
      this.show_stacked_bar_chart_non_time = false;
      this.hide_all_graphs();
      this.clear_all_graphs_data();
      this.heading = "";
      // this.dataset_name = "";
      this.callapi = true;
      this.chart_types = [];
      var search_data = document.getElementById("search_data").previousSibling.value;
      // console.log(this.search_data);
      var search_data_length = this.search_data.length;
      if( this.search_data.length === 0) {
        this.callapi = false;
      }
      for (let i = 0; i < this.search_data.length; i++) {
        if ((this.search_data[i].type != undefined) && (this.search_data[i].type === "metric")) {
          this.dataset_name = this.search_data[i].dataset;
        }
        if(this.search_data[i].dataset){
          this.dataset_name = this.search_data[i].dataset;
        }
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
                    this.check_duplicate = i + 1;
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
      this.show_piechart = false;
      this.barChartData = [];
      this.bar_graph_xKey = "";
      this.bar_graph_yKey = "";
      this.line_graph_data = [];
      this.line_graph_xKey = "";
      this.line_graph_yKey = "";
      this.pieChartData = [];
      this.pie_chart_xKey = "";
      this.pie_chart_yKey = "";
      this.table_data = [];
      this.multi_line_graph_data = [];
      this.multi_line_graph_xKey = "";
      this.multi_line_graph_yKey = "";
      this.multi_line_graph_dateKey = "";
      this.horizontal_bar_chart_data = [];
      this.horizontal_bar_chart_xKey = "";
      this.horizontal_bar_chart_yKey = "";
      this.donut_chart_Data = [];
      this.donut_chart_xKey = "";
      this.donut_chart_yKey = "";
      this.stacked_bar_chart_data = [];
      this.stacked_bar_chart_xKey = "";
      this.stacked_bar_chart_yKey = "";
      this.stacked_bar_chart_dateKey = "";
      this.chart_types_to_be_displayed = [];
      this.show_chart_types = false;
      this.current_graph_data = [];
      this.stacked_bar_chart_non_time_data = [];
      this.stacked_bar_chart_non_time_xKey = "";
      this.stacked_bar_chart_non_time_yKey = "";
      this.stacked_bar_chart_non_time_primary_column = "";
      this.stacked_bar_chart_non_time_secondary_column = "";
      this.clear_all_graphs_data();
      if(this.callapi == true){
      // this.error_text_show = false;
      // this.error_text = "";
      this.spinnerOn = true;
      axios
        // .post(api_calls.bi_complete_search_data_experimental(), {
        .post(api_calls.bi_complete_search_data(), {
        // .post(api_calls.bi_temp_search_data(), {
          email: this.$session.get("UserInformation").email,
          token: this.$session.get("UserInformation").tokens,
          company_name: this.$session.get("UserInformation").company_name,
          company_id: this.$session.get("UserInformation").company_id,
          // company_name: 'cense_bi',
          // company_id:'cense_bi',
          license_key: this.$session.get("UserInformation").license_key,
          q: search_data2,
          suggestions: this.search_data,
          dataset_name: this.dataset_name,
          nlp_search: this.nlp_search,
        })
        .then(response => {
          this.hide_all_graphs();
          this.clear_all_graphs_data();
            // this.show_bargraph = false;
            //   this.show_linegraph = false;
            //   this.show_piechart = false;
            //   this.show_table = false;
            //   this.show_multi_line_graph = false,
            //   this.show_heading = false;
            //   this.show_2d_donut_chart = false;
            //   this.show_grouped_bar_chart = false;
            //   this.show_stacked_bar_chart = false,
              this.spinnerOn = false
            // console.log("response",response);
            // console.log("response-data",response.data);
            // console.log("response-data-status",response.status);
            // console.log("response-data-data",response.data);
          if(response.data === "token invalid") {
            Swal({
              type: "error",
              text:
                "You are logged in another device. Kindly sign out and sign in again to continue",
              allowOutsideClick: false,
              timer:3000,
            }).then(result => {
              if (result.value) {
                setTimeout(() => {
                  this.$session.destroy();
                  this.$router.go("/bot/login");
                }, 500);
              }
            });
          }
          if (response.data.status === "Success") {
            // console.log("response-success");

            if (response.data.data != null) {

              // this.show_bargraph = false;
              // this.show_linegraph = false;
              // this.show_piechart = false;
              // this.show_table = false;
              // this.show_multi_line_graph = false,
              // this.show_heading = false;
              // this.show_2d_donut_chart = false;
              // this.show_grouped_bar_chart = false;
              // this.spinnerOn = false
              if(response.data.view_explanation.date_time_grouping[0]){
                // if (response.data.graph_metadata.recommended_graph_type === "bar") {
                  // this.stacked_bar_chart_data = response.data.data;
                  // this.stacked_bar_chart_xKey = response.data.graph_recommendations.graph_metadata.x;
                  // this.stacked_bar_chart_yKey = response.data.graph_recommendations.graph_metadata.y;
                  // this.stacked_bar_chart_dateKey = response.data.view_explanation.date_time_grouping[0].month_column;
                  // // this.stacked_bar_chart_dateKey = response.data.view_explanation.date_time_grouping[0].date_time_column;
                  // this.show_stacked_bar_chart = true;
                  // if(response.data.graph_recommendations.heading.text) {
                  //   this.show_heading = true;
                  //   this.heading = response.data.graph_recommendations.heading.text;
                  // }
                  this.chart_types = [];
                  this.chart_types_to_be_displayed = [];
                  this.chart_types_to_be_displayed.push("multi_line");
                  // this.chart_types_to_be_displayed.push("stacked_bar_time","multi_line");
                  this.push_chart_types();
                  this.current_graph_type = this.chart_types_to_be_displayed[0];
                  this.current_graph_data.data = response.data.data;
                  this.current_graph_data.xKey = response.data.graph_recommendations.graph_metadata.x;
                  this.current_graph_data.yKey = response.data.graph_recommendations.graph_metadata.y;
                  this.current_graph_data.dateKey = response.data.view_explanation.date_time_grouping[0].month_column;
                  this.current_graph_data.date_time_column = response.data.view_explanation.date_time_grouping[0].date_time_column;
                  this.graph_recommendations_for_reports_summary = response.data.graph_recommendations;
                // }
                // if (response.data.graph_metadata.recommended_graph_type === "line") {
                  // console.log(resp)
                  this.multi_line_graph_data = response.data.data;
                  this.multi_line_graph_xKey = response.data.graph_recommendations.graph_metadata.x;
                  this.multi_line_graph_yKey = response.data.graph_recommendations.graph_metadata.y;
                  this.multi_line_graph_dateKey = response.data.view_explanation.date_time_grouping[0].date_time_column;
                  this.show_multi_line_graph = true;
                  if(response.data.graph_recommendations.heading.text) {
                    this.show_heading = true;
                    this.heading = response.data.graph_recommendations.heading.text;
                  }
                // }
              } else if(response.data.view_explanation.grouping.on.length > 1){
                // if (response.data.graph_metadata.recommended_graph_type === "bar") {
                // this.grouped_bar_chart_data = response.data.data;
                // this.grouped_bar_chart_xKey = response.data.graph_recommendations.graph_metadata.x;
                // this.grouped_bar_chart_yKey = response.data.graph_recommendations.graph_metadata.y;
                // this.grouped_bar_chart_primary_column   = response.data.view_explanation.grouping.on[0];
                // this.grouped_bar_chart_secondary_column = response.data.view_explanation.grouping.on[1];
                // this.show_grouped_bar_chart = true;
                // if(response.data.graph_recommendations.heading.text) {
                //   this.show_heading = true;
                //   this.heading = response.data.graph_recommendations.heading.text;
                // }
                // }
                // if (response.data.graph_metadata.recommended_graph_type === "bar") {
                this.current_currency_value = this.check_currency_column_in_graph(response.data.graph_recommendations.graph_metadata.y)

                this.stacked_bar_chart_non_time_data             = response.data.data;
                this.stacked_bar_chart_non_time_xKey             = response.data.graph_recommendations.graph_metadata.x;
                this.stacked_bar_chart_non_time_yKey             = response.data.graph_recommendations.graph_metadata.y;
                this.stacked_bar_chart_non_time_primary_column   = response.data.view_explanation.grouping.on[0];
                this.stacked_bar_chart_non_time_secondary_column = response.data.view_explanation.grouping.on[1];
                this.stacked_bar_chart_non_time_currency_key =  this.current_currency_value;
                this.show_stacked_bar_chart_non_time = true;
                if(response.data.graph_recommendations.heading.text) {
                  this.show_heading = true;
                  this.heading = response.data.graph_recommendations.heading.text;
                }
                // }
                var map = this.stacked_bar_chart_non_time_data.reduce((r, i) => ((r[i[this.stacked_bar_chart_non_time_primary_column]] = r[i[this.stacked_bar_chart_non_time_primary_column]] || []).push({
                        i
                }), r), {});
                var entries = Object.entries(map),
                entries_len = entries.length,
                add_grouped = true;
                // console.log(entries,"entrieeeesss");
                for(let i = 0; i < entries_len; i++){
                  // console.log(entries[i][1]);
                  if(entries[i][1].length > 25){
                    add_grouped = false;
                    break;
                  }
                }
                this.chart_types = [];
                this.chart_types_to_be_displayed = [];
                // if(entries.length > 20){
                //   this.chart_types_to_be_displayed.push("stacked_bar_non_time");
                // } else {
                //   this.chart_types_to_be_displayed.push("grouped_bar","stacked_bar_non_time");
                // }
                // console.log(add_grouped)
                if(!add_grouped){
                  this.chart_types_to_be_displayed.push("stacked_bar_non_time","grouped_table");
                } else {
                  this.chart_types_to_be_displayed.push("grouped_bar","stacked_bar_non_time","grouped_table");
                }
                this.push_chart_types();
                this.current_graph_type = this.chart_types_to_be_displayed[0];
                this.current_graph_data.data = response.data.data;
                this.current_graph_data.xKey = response.data.graph_recommendations.graph_metadata.x;
                this.current_graph_data.yKey = response.data.graph_recommendations.graph_metadata.y;
                this.current_graph_data.primary_column    = response.data.view_explanation.grouping.on[0];
                this.current_graph_data.secondary_column  = response.data.view_explanation.grouping.on[1];
                this.graph_recommendations_for_reports_summary = response.data.graph_recommendations;
              } else {
              this.current_currency_value = this.check_currency_column_in_graph(response.data.graph_recommendations.graph_metadata.y)

              // if (response.data.graph_metadata.recommended_graph_type === "bar") {
              // this.show_bargraph = true;
              // this.barChartData = response.data.data;
              // this.bar_chart_xKey = response.data.graph_recommendations.graph_metadata.x;
              // this.bar_chart_yKey = response.data.graph_recommendations.graph_metadata.y;
              // this.bar_chart_currency_key = this.current_currency_value;
              // if(response.data.graph_recommendations.heading.text) {
              //   this.show_heading = true;
              //   this.heading = response.data.graph_recommendations.heading.text;
              // }
              this.chart_types = [];
              if(response.data.data.length > 20) {
                this.show_table = true;
                this.tabulator_data = response.data.data;
                this.tabulator_xKey = response.data.graph_recommendations.graph_metadata.x;
                this.tabulator_yKey = response.data.graph_recommendations.graph_metadata.y;
                this.tabulator_currency_key = this.current_currency_value;
                // this.show_bargraph = true;
                // this.barChartData = response.data.data;
                // this.bar_chart_xKey = response.data.graph_recommendations.graph_metadata.x;
                // this.bar_chart_yKey = response.data.graph_recommendations.graph_metadata.y;
                // this.bar_chart_currency_key = this.current_currency_value;
                if(response.data.graph_recommendations.heading.text) {
                  this.show_heading = true;
                  this.heading = response.data.graph_recommendations.heading.text;
                }
                this.chart_types_to_be_displayed = [];
                this.chart_types_to_be_displayed.push("bar","table");
                this.current_graph_type = this.chart_types_to_be_displayed[1];
              } else {
                this.show_bargraph = true;
                this.barChartData = response.data.data;
                this.bar_chart_xKey = response.data.graph_recommendations.graph_metadata.x;
                this.bar_chart_yKey = response.data.graph_recommendations.graph_metadata.y;
                this.bar_chart_currency_key = this.current_currency_value;
                if(response.data.graph_recommendations.heading.text) {
                  this.show_heading = true;
                  this.heading = response.data.graph_recommendations.heading.text;
                }
                this.chart_types_to_be_displayed = [];
                this.chart_types_to_be_displayed.push("bar","pie_2d","donut_2d","horizontal_bar","table");
                // this.chart_types_to_be_displayed.push("bar","pie_2d","donut_2d","horizontal_bar");
                this.current_graph_type = this.chart_types_to_be_displayed[0];
              }
              this.push_chart_types();
              this.current_graph_data.data = response.data.data;
              this.current_graph_data.xKey = response.data.graph_recommendations.graph_metadata.x;
              this.current_graph_data.yKey = response.data.graph_recommendations.graph_metadata.y;
              this.current_graph_data.primary_column   = null;
              this.current_graph_data.secondary_column = null;
              this.graph_recommendations_for_reports_summary = response.data.graph_recommendations;
              // }
               // if (response.data.graph_metadata.recommended_graph_type === "bar") {
              // this.horizontal_bar_chart_data = response.data.data;
              // this.horizontal_bar_chart_xKey = response.data.graph_recommendations.graph_metadata.y;
              // this.horizontal_bar_chart_yKey = response.data.graph_recommendations.graph_metadata.x;
              // this.show_horizontal_bargraph = true;
              // if(response.data.graph_recommendations.heading.text) {
              //   this.show_heading = true;
              //   this.heading = response.data.graph_recommendations.heading.text;
              // }
              // }
              // if (response.data.graph_metadata.recommended_graph_type === "pie") {
              // this.pieChartData = response.data.data;
              // // ((response.data.graph_metadata.x.length > 1) ? this.pie_chart_xKey = response.data.graph_metadata.x[1].toString() : this.pie_chart_xKey = response.data.graph_metadata.x.toString());
              // this.pie_chart_xKey = response.data.graph_recommendations.graph_metadata.x;
              // this.pie_chart_yKey = response.data.graph_recommendations.graph_metadata.y;
              // this.show_piechart = true;
              // if(response.data.graph_recommendations.heading.text) {
              //   this.show_heading = true;
              //   this.heading = response.data.graph_recommendations.heading.text;
              // }
              // console.log("Pie",this.pieChartData)

              // }
              // if (response.data.graph_metadata.recommended_graph_type === "line") {


              //  console.log(response.data.data);
              // this.show_linegraph = true;
              // this.line_graph_data = response.data.data;
              // // this.line_graph_xKey = response.data.graph_metadata.x.toString();
              // this.line_graph_xKey = response.data.graph_recommendations.graph_metadata.x;
              // this.line_graph_yKey = response.data.graph_recommendations.graph_metadata.y;
              //  if(response.data.graph_recommendations.heading.text) {
              //   this.show_heading = true;
              //   this.heading = response.data.graph_recommendations.heading.text;
              // }
              // }
              // if (response.data.graph_metadata.recommended_graph_type === "table") {
              // this.show_table = true;
              // this.table_data = response.data.data;
              // }

              // if (response.data.graph_metadata.recommended_graph_type === "donut_chart") {
              // this.donut_chart_Data = response.data.data;
              // this.donut_chart_xKey = response.data.graph_recommendations.graph_metadata.x;
              // this.donut_chart_yKey = response.data.graph_recommendations.graph_metadata.y;
              // this.show_2d_donut_chart = true;
              //   if(response.data.graph_recommendations.heading.text) {
              //     this.show_heading = true;
              //     this.heading = response.data.graph_recommendations.heading.text;
              //   }
              // }
              }
            }
          }
        });
        }
      }
      } else {
        this.check_duplicate -= 1;
      }
    },
    search(value) {
      if(this.nlp_search === true) {
        // this.tag_added();
        if(this.nlp_search === true && this.dataset_name === null){
          // console.log("HSDXSAX");
          // $("#searchbar").val('');
          // ;
           Swal({
                type: "error",
                title:"Data Set Not Selected",
                text: "This can done by the icon on the left of search bar",
                showConfirmButton: true,
                timer:3000,
            }).then(result => {
              this.$root.$emit("clear_analytics_search_bar", true);
            });
        }
        axios.post(api_calls.bi_search_recent_nlp(),{
          email: this.$session.get("UserInformation").email,
          token: this.$session.get("UserInformation").tokens,
          company_name: this.$session.get("UserInformation").company_name,
          company_id: this.$session.get("UserInformation").company_id,
          license_key: this.$session.get("UserInformation").license_key,
          nlp_search: true,
          q: value,
          dataset_name:this.dataset_name,
        }).then(response => {
          if(response.data.suggestions.length > 0){
            var sugg =[];
            for(let i = 0; i < response.data.suggestions.length; i++){
              sugg.push({
                key : this.generateUUID(),
                value : response.data.suggestions[i],
                type : 'recent',
                value_to_display: response.data.suggestions[i],
              })
            }
            this.search_result = sugg;
          }
        })

      } else {
      var call_search_api = true;
      this.error_text_show = false;
      this.error_text = "";
      if (value == "" && value == null) {
      } else {
        if( this.search_data.length > 0 && ((this.search_data[this.search_data.length-1].value === "top N" && !this.search_data[this.search_data.length-1].input) ||  (this.search_data[this.search_data.length-1].value === "bottom N" && !this.search_data[this.search_data.length-1].input ) )){
        // } else if (  this.search_data.length > 0 && (this.search_data[this.search_data.length-1].value === "begins with" && !this.search_data[this.search_data.length-1].input )){
        } else if (  this.search_data.length > 0 && (this.search_data[this.search_data.length-1].type === "keyword" && this.search_data[this.search_data.length-1].keyword_type ==="text" && !this.search_data[this.search_data.length-1].input )){
          // console.log(value, "hi", value.charAt(0) );
          if(value.charAt(0) == `'` || value.charAt(0) == `"` ){
          } else {
            this.error_text_show = true ;
            this.error_text = "Please Start and End Your word with quotes ";
            call_search_api = false
          }
        } else if(call_search_api == true) {
          this.error_text_show = false;
          this.error_text = "";
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
        }
      }
      }
    },
    add_details_to_object(to_be_set,to_be_set_from) {
      this.search_data[to_be_set].column = this.search_data[to_be_set_from].column;
      this.search_data[to_be_set].company_id = this.search_data[to_be_set_from].company_id;
      this.search_data[to_be_set].keyword_type = null;
      this.search_data[to_be_set].metadata = "";
      this.search_data[to_be_set].type = "input";
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
    remove_quotes_from_string(str) {
      return str.substring(1).slice(0,-1);
    },
    add_quotes_to_string(str) {
      return `'${str}'`;
    },
    clear_all_graphs_data(){
      // this.show_chart_types = false;
      this.barChartData = [];
      this.bar_graph_xKey = "";
      this.bar_graph_yKey = "";
      this.line_graph_data = [];
      this.line_graph_xKey = "";
      this.line_graph_yKey = "";
      this.pieChartData = [];
      this.pie_chart_xKey = "";
      this.pie_chart_yKey = "";
      this.table_data = [];
      this.multi_line_graph_data = [];
      this.multi_line_graph_xKey = "";
      this.multi_line_graph_yKey = "";
      this.multi_line_graph_dateKey = "";
      this.donut_chart_Data = [];
      this.donut_chart_xKey = "";
      this.donut_chart_yKey = "";
      this.stacked_bar_chart_data = [];
      this.stacked_bar_chart_xKey = "";
      this.stacked_bar_chart_yKey = "";
      this.stacked_bar_chart_dateKey = "";
      this.horizontal_bar_chart_data = [];
      this.horizontal_bar_chart_xKey = "";
      this.horizontal_bar_chart_yKey = "";
      this.stacked_bar_chart_non_time_data  = [];
      this.stacked_bar_chart_non_time_xKey   = "";
      this.stacked_bar_chart_non_time_yKey    = "";
      this.stacked_bar_chart_non_time_primary_column = "";
      this.stacked_bar_chart_non_time_secondary_column = "";
      this.tabulator_data = [];
      this.tabulator_xKey = "";
      this.tabulator_yKey = "";
      this.grouped_tabulator_data = [];
      this.grouped_tabulator_xKey = "";
      this.grouped_tabulator_yKey = "";
    },
    hide_all_graphs(){
      // this.show_reports_list = false;
      this.show_bargraph = false;
      this.show_piechart = false;
      this.show_linegraph = false;
      this.show_multi_line_graph = false;
      this.show_2d_donut_chart = false;
      this.show_grouped_bar_chart = false;
      this.show_stacked_bar_chart = false;
      this.show_horizontal_bargraph = false;
      this.show_stacked_bar_chart_non_time = false;
      this.show_table = false;
      this.show_grouped_table = false;
    },
    change_graph_type(type){
      if(this.show_reports_list){
        this.show_reports_list = !this.show_reports_list;
      }
      this.current_graph_type = type;
      if(type === "bar"){
        this.hide_all_graphs();
        this.clear_all_graphs_data();
        this.barChartData = this.current_graph_data.data;
        this.bar_chart_xKey = this.current_graph_data.xKey;
        this.bar_chart_yKey = this.current_graph_data.yKey;
        this.bar_chart_currency_key = this.current_currency_value;
        this.current_graph_data.primary_column   = null;
        this.current_graph_data.secondary_column = null;
        this.show_bargraph = true;
      }
      if(type === "pie_2d"){
        this.hide_all_graphs();
        this.clear_all_graphs_data();
        this.pieChartData = this.current_graph_data.data;
        this.pie_chart_xKey = this.current_graph_data.xKey;
        this.pie_chart_yKey = this.current_graph_data.yKey;
        this.pie_chart_currency_key = this.current_currency_value;
        this.current_graph_data.primary_column   = null;
        this.current_graph_data.secondary_column = null;
        this.show_piechart = true;
      }
      if(type === "donut_2d") {
        this.hide_all_graphs();
        this.clear_all_graphs_data();
        this.donut_chart_Data = this.current_graph_data.data;
        this.donut_chart_xKey = this.current_graph_data.xKey;
        this.donut_chart_yKey = this.current_graph_data.yKey;
        this.donut_chart_currency_key = this.current_currency_value;
        this.current_graph_data.primary_column   = null;
        this.current_graph_data.secondary_column = null;
        this.show_2d_donut_chart = true;
      }
      if(type === "horizontal_bar"){
        this.hide_all_graphs();
        this.clear_all_graphs_data();
        this.horizontal_bar_chart_data = this.current_graph_data.data;
        this.horizontal_bar_chart_xKey = this.current_graph_data.yKey;
        this.horizontal_bar_chart_yKey = this.current_graph_data.xKey;
        this.horizontal_bar_chart_currency_key = this.current_currency_value;
        this.current_graph_data.primary_column = null;
        this.current_graph_data.secondary_column = null;
        this.show_horizontal_bargraph = true;
      }
      if(type === "stacked_bar_time"){
        this.hide_all_graphs();
        this.clear_all_graphs_data();
        this.stacked_bar_chart_data = this.current_graph_data.data;
        this.stacked_bar_chart_xKey = this.current_graph_data.xKey;
        this.stacked_bar_chart_yKey = this.current_graph_data.yKey;
        this.stacked_bar_chart_dateKey = this.current_graph_data.dateKey;
        this.show_stacked_bar_chart = true;
      }
      if(type === "grouped_bar"){
        this.hide_all_graphs();
        this.clear_all_graphs_data();
        this.grouped_bar_chart_data = this.current_graph_data.data;
        this.grouped_bar_chart_xKey = this.current_graph_data.xKey;
        this.grouped_bar_chart_yKey = this.current_graph_data.yKey;
        this.grouped_bar_chart_primary_column = this.current_graph_data.primary_column;
        this.grouped_bar_chart_secondary_column = this.current_graph_data.secondary_column;
        this.grouped_bar_chart_currency_key = this.current_currency_value;
        this.show_grouped_bar_chart = true;
      }
      if(type === "multi_line") {
        this.hide_all_graphs();
        this.clear_all_graphs_data();
        this.multi_line_graph_data = this.current_graph_data.data;
        this.multi_line_graph_xKey = this.current_graph_data.xKey;
        this.multi_line_graph_yKey = this.current_graph_data.yKey;
        this.multi_line_graph_dateKey = this.current_graph_data.date_time_column;
        this.show_multi_line_graph = true;
      }
      if(type === "stacked_bar_non_time"){
        this.hide_all_graphs();
        this.clear_all_graphs_data();
        this.stacked_bar_chart_non_time_data = this.current_graph_data.data;
        this.stacked_bar_chart_non_time_xKey = this.current_graph_data.xKey;
        this.stacked_bar_chart_non_time_yKey = this.current_graph_data.yKey;
        this.stacked_bar_chart_non_time_primary_column = this.current_graph_data.primary_column;
        this.stacked_bar_chart_non_time_secondary_column = this.current_graph_data.secondary_column;
        this.stacked_bar_chart_non_time_currency_key = this.current_currency_value;
        this.show_stacked_bar_chart_non_time = true;
      }
      if(type === "table"){
        this.hide_all_graphs();
        this.clear_all_graphs_data();
        this.tabulator_data = this.current_graph_data.data;
        this.tabulator_xKey = this.current_graph_data.xKey;
        this.tabulator_yKey = this.current_graph_data.yKey;
        this.tabulator_currency_key = this.current_currency_value;
        this.current_graph_data.primary_column = null;
        this.current_graph_data.secondary_column = null;
        this.show_table = true;
      }
      if(type === "grouped_table"){
        this.hide_all_graphs();
        this.clear_all_graphs_data();
        this.grouped_tabulator_data = this.current_graph_data.data;
        this.grouped_tabulator_xKey = this.current_graph_data.xKey;
        this.grouped_tabulator_yKey = this.current_graph_data.yKey;
        this.grouped_tabulator_primary_column = this.current_graph_data.primary_column;
        this.grouped_tabulator_secondary_column = this.current_graph_data.secondary_column;
        this.grouped_tabulator_currency_key = this.current_currency_value;
        this.show_grouped_table = true;
      }
    },
    push_chart_types(){
      this.chart_types = [];
      // console.log("bhelo",this.chart_types_to_be_displayed)
      var arr_length = this.chart_types_to_be_displayed.length;
      this.chart_types = [];
      for(let i = 0; i<arr_length; i++){
        if(this.chart_types_to_be_displayed[i] === "bar") {
          this.chart_types.push({
            type: "bar",
            name: "Bar",
            // icon: this.barchart_icon_svg,
            icon: this.new_bar_chart_icon_svg,
          });
        }
        if(this.chart_types_to_be_displayed[i] === "pie_2d") {
          this.chart_types.push({
            type: "pie_2d",
            name: "Pie",
            // icon: this.pie_2d_icon_svg
            icon: this.new_pie_2d_icon_svg
          });
        }
        if(this.chart_types_to_be_displayed[i] === "donut_2d") {
          this.chart_types.push({
            type: "donut_2d",
            name: "Donut",
            // icon: this.donut_2d_icon_svg
            icon: this.new_donut_2d_icon_svg
          });
        }
        if(this.chart_types_to_be_displayed[i] === "horizontal_bar") {
           this.chart_types.push({
            type: "horizontal_bar",
            name: "Horizontal Bar",
            // icon: this.horizontal_bar_chart_icon_svg
            icon: this.new_horizontal_bar_chart_icon_svg
           });
        }
        if(this.chart_types_to_be_displayed[i] === "stacked_bar_time") {
           this.chart_types.push({
            type: "stacked_bar_time",
            name: "Stacked",
            // icon: this.stacked_bar_chart_icon_svg
            icon: this.new_stacked_bar_chart_icon_svg
           });
        }
        if(this.chart_types_to_be_displayed[i] === "grouped_bar") {
           this.chart_types.push({
            type: "grouped_bar",
            name: "Grouped",
            // icon: this.grouped_bar_chart_icon_svg
            icon: this.new_grouped_bar_chart_icon_svg
           });
        }
        if(this.chart_types_to_be_displayed[i] === "line") {
          this.chart_types.push({
            type: "line",
            name: "Line",
            // icon: this.line_chart_icon_svg
            icon: this.new_line_chart_icon_svg
           });
        }
        if(this.chart_types_to_be_displayed[i] === "multi_line") {
           this.chart_types.push({
            type: "multi_line",
            name: "Multi Line",
            // icon: this.multi_line_chart_icon_svg
            icon: this.new_multiline_chart_icon_svg
           });
        }
        if(this.chart_types_to_be_displayed[i] === "stacked_bar_non_time") {
           this.chart_types.push({
            type: "stacked_bar_non_time",
            name: "Stacked",
            // icon: this.stacked_bar_chart_icon_svg
            icon: this.new_stacked_bar_chart_icon_svg
           });
        }
        if(this.chart_types_to_be_displayed[i] === "table"){
          this.chart_types.push({
            type: "table",
            name: "Table",
            icon: this.new_stacked_bar_chart_icon_svg
          });
        }
        if(this.chart_types_to_be_displayed[i] === "grouped_table"){
          this.chart_types.push({
            type: "grouped_table",
            name: " Table",
            icon: this.new_stacked_bar_chart_icon_svg
          });
        }
      }
      this.show_chart_types = true;
      // this.dropright_event_catcher();
      // console.log(this.show_chart_types);
    },
    change_dataset(index){
      this.dataset_name = this.datasets[index];
      this.$root.$emit('dataset_selected', true);
    },
    dropright_event_catcher(){
      // console.log("Hedujweifc");
      // $(document).ready(function() {
      var vm = this;
      $('.dropright').on('show.bs.dropdown', function(){
        // $('#graph_changeMenuButton').addClass('bgcolor');
        $('#chart_types_dropdown').addClass('leftmargin');
        vm.switch_graphs_icon_svg = vm.new_graphs_icon_types_shown_svg;
      });
      $('.dropright').on('hide.bs.dropdown', function(){
        // $('#graph_changeMenuButton').removeClass('bgcolor');
        $('#chart_types_dropdown').removeClass('leftmargin');
        vm.switch_graphs_icon_svg = vm.new_graphs_icon_default_svg;
      });

      // });
    },
    add_report(){
      event.preventDefault();
      Swal.fire({
        title: "Are you sure?",
        text: `You want to ${this.report_submit_button_text}?`,
        type: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Confirm!"
      }).then(result => {
      if (result.value) {
        var payload = $(".report-div")[0].innerHTML;
        if(this.report_append_to_old === null){
          var parent_id = null;
          var isedit = false;
        } else {
          parent_id = this.report_append_to_old.id;
          isedit = true;
        }
        Swal({
          text: 'Please wait while we are submitting your details...',
          type: 'info',
          toast: true,
          showConfirmButton: false,
          timer: 2000,
        });
        axios
          .post(api_calls.bi_generate_report(), {
            report_name: this.report_name,
            report_comments: this.report_comments,
            chart_payload: payload,
            is_edit: isedit,
            css: this.graphs_styling,
            email: this.$session.get("UserInformation").email,
            token: this.$session.get("UserInformation").tokens,
            company_name: this.$session.get("UserInformation").company_name,
            company_id: this.$session.get("UserInformation").company_id,
            chart_title: this.heading,
            parent_id: parent_id
          })
          .then(response => {
            if(response.data.status === "Ok" && response.data.msg === "Report is being created now"){
              Swal({
                text: 'Your Report is being created now, please check in the reports section to know the status of the report',
                type: 'success',
                toast: true,
                showConfirmButton: false,
                timer: 3000
              });
              setTimeout(() => {
                this.show_reports_div = true;
                $('#reportsModal').modal('hide');
                this.clear_report_modal_values();
                this.get_reports_list();
              }, 1500);
            } else if(response.data.status === "Error" && !response.data.is_name_unique) {
              Swal({
                text: 'A Report With that Name Already Exists. Choose Another',
                type: 'error',
                toast: true,
                showConfirmButton: false,
                timer: 2500,
              });
            } else {
              Swal({
                text: 'Some Error Occurred. Please Try Again',
                type: 'error',
                toast: true,
                showConfirmButton: false,
                timer: 2500
              });
              setTimeout(() => {
                $('#reportsModal').modal('hide');
                this.clear_report_modal_values();
              }, 1000);
            }
          })
          .catch(error => {
            Swal({
                text: 'Some Error Occurred. Please Try Again',
                type: 'error',
                toast: true,
                showConfirmButton: false,
                timer: 2500
              });
              setTimeout(() => {
                $('#reportsModal').modal('hide');
                this.clear_report_modal_values();
              }, 1000);
          })
        }
      });

    },
    clear_report_modal_values(){
      this.report_name = '';
      this.report_comments = '';
      this.report_append_to_old = null;
      // $("search_report_comment").attr('placeholder', '');

    },
    download_pdf(url, file_name){
      // var link = document.createElement("a");
      // link.href = url;
      // link.setAttribute("download", file_name);
      // link.setAttribute("target", "_blank");
      // document.body.appendChild(link);
      // link.click();
      // link.remove();
      const instance = axios.create({
      baseURL: 'http://localhost:8080/',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      });

      instance({
        url: 'https://drive.google.com/file/d/1QWkHNFd0m1vhYJMheOjsJiawSQTYYFDM/preview?usp=sharing',
        method: 'GET',
        responseType: 'blob',
        baseURL: '',
      }).then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement('a');
          fileLink.href = fileURL;
          fileLink.setAttribute('download', 'file.pdf');
          document.body.appendChild(fileLink);
          fileLink.click();
      });

    },
    view_report_iframe(index){
      this.current_viewed_report = index;
      $('#viewReportModal').modal('show');
    },
    active_dataset(index) {
      if(this.datasets[index] === this.dataset_name){
        // $("#dataset_list"+index).addClass("current_dataset");
        return this.datasets[index]
      }
      else {
        return this.datasets[index]
      }
    },
    check_report_status(index){
      this.spinnerOn = true;
      axios
        .post(api_calls.bi_get_reports_status(), {
          id: this.reports_list[index].id,
          email: this.$session.get("UserInformation").email,
          token: this.$session.get("UserInformation").tokens,
          company_name: this.$session.get("UserInformation").company_name,
          company_id: this.$session.get("UserInformation").company_id,
        })
      .then(response => {
        this.spinnerOn = false;
        if(response.data.msg.is_report_ready === true) {
          this.reports_list[index].is_report_ready = true;
          this.reports_list[index].file_url = response.data.msg.file_url;
        }
        // console.log(response);
      })
      .catch(err => {
        toastr.error("Some error occurred retreiving the status of this document, please try again");
      })
    },
    get_report_url(index,action) {
      if(action === 'download'){
        this.spinnerOn = true;
        axios
        .post(api_calls.bi_download_report(),{
          file_name: this.reports_list[index].file_url,
          email: this.$session.get("UserInformation").email,
          token: this.$session.get("UserInformation").tokens,
          company_name: this.$session.get("UserInformation").company_name,
          company_id: this.$session.get("UserInformation").company_id,
        },
        {
          responseType:'blob'
        }
        ).then(resp => {
          this.spinnerOn = false;
          // if(resp.data.status === 'ok'){
            const url = window.URL.createObjectURL(new Blob([resp.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', this.reports_list[index].title+'.pdf');
            document.body.appendChild(link);
            link.click();
          // } else {
            // Swal.fire({
            //   title: 'Some Error Occurred',
            //   text: 'The List of Reports is not available now. Please Try Again Later',
            //   type: 'error',
            //   showConfirmButton: true,
            //   timer:3000
            // })
          // }
        })
      }
      else if(action === 'view') {
        this.spinnerOn = true;
        axios
        .post(api_calls.bi_get_report_url(), {
          file_name: this.reports_list[index].file_url,
          email: this.$session.get("UserInformation").email,
          token: this.$session.get("UserInformation").tokens,
          company_name: this.$session.get("UserInformation").company_name,
          company_id: this.$session.get("UserInformation").company_id,
        })
        .then(response => {
          this.spinnerOn = false;
          this.reports_list[index].file_url_to_be_displayed = response.data.msg.url;
          this.current_viewed_report = index;
          $('#viewReportModal').modal('show');
        })
      }
    },
    get_reports_list(){
      this.spinnerOn = true;
      axios
      .get(api_calls.bi_list_reports(), {
        params:{
          per_page: 10,
          page_no:1,
          email: this.$session.get("UserInformation").email,
          token: this.$session.get("UserInformation").tokens,
          company_name: this.$session.get("UserInformation").company_name,
          company_id: this.$session.get("UserInformation").company_id,
        }
      })
      .then(response => {
        this.spinnerOn = false;
        if(response.data.status === "Ok"){
          this.reports_list = response.data.msg.reports;
          this.current_viewed_report = 0;
        } else {
          Swal.fire({
            title: 'Some Error Occurred',
            text: 'The List of Reports is not available now. Please Try Again Later',
            type: 'error',
            showConfirmButton: true,
            timer: 2500,
          }).then(result => {
            setTimeout(() => {
              this.show_reports_list = false;
            }, 200);
          });
        }
        // console.log(response);
      })
      .catch(err => {
        this.spinnerOn = false;
        Swal.fire({
          title: 'Some Error Occurred',
          text: 'The List of Reports is not available now. Please Try Again Later',
          type: 'error',
          showConfirmButton: true,
          timer:2500,
          }).then(result => {
          setTimeout(() => {
            this.show_reports_list = false;
          }, 200);
          });
      })
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
    set_current_dataset_currency_columns(){
      // console.log(this.current_dataset_column_details);
      for(let [key, value] of Object.entries(this.current_dataset_column_details)) {
        // console.log(key, value.currency_format)
        if((value.currency_format != "None" || value.currency_format != null  )&& value.currency_format != undefined ){
          this.current_dataset_currency_details.push({
            column: key,
            currency: value.currency_format
          })
        }
      }
      for (let i = 0; i < this.current_dataset_currency_details.length; i++){
        for(let j = 0; j < country_iso_codes.length; j++){
          if(country_iso_codes[j].Code === this.current_dataset_currency_details[i].currency){
            this.current_dataset_currency_details[i].symbol = country_iso_codes[j].Symbol;
            break;
          }
        }
      }
      // console.log(this.current_dataset_currency_details)
    },
    check_currency_column_in_graph(yVal){
      var symbol = ' ';
      for(let i = 0; i < this.current_dataset_currency_details.length; i++){
        if(yVal === this.current_dataset_currency_details[i].column){
          symbol = this.current_dataset_currency_details[i].symbol
          break
        }
      }
      return symbol;
    },
    delete_report(index) {
      Swal.fire({
        title: "Are you sure?",
        text: `You want to Delete the Report: ${this.reports_list[index].title}?`,
        type: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Confirm!"
      }).then(result => {
      if (result.value) {
        // Swal({
        //   text: 'Please wait while we are processing your request...',
        //   type: 'info',
        //   toast: true,
        //   showConfirmButton: false,
        // });
        this.spinnerOn = true;
        axios
        .post(api_calls.bi_delete_report(), {
            email: this.$session.get("UserInformation").email,
            token: this.$session.get("UserInformation").tokens,
            company_name: this.$session.get("UserInformation").company_name,
            company_id: this.$session.get("UserInformation").company_id,
            report_name: this.reports_list[index].title,
            id: this.reports_list[index].id
        }).then(response => {
          this.spinnerOn = false;
          if(response.data.msg === "Record deleted successfully" && response.data.status ==="Ok"){
            this.get_reports_list()
            Swal({
                text: 'Your Report is Deleted Successfully',
                type: 'success',
                toast: true,
                showConfirmButton: false,
                timer: 2000
              });
          } else{
            this.spinnerOn = false;
            Swal({
                text: 'Some Error Occurred. Please Try Again',
                type: 'error',
                toast: true,
                showConfirmButton: false,
                timer: 2500
              });
          }

        }).catch(error => {
          this.spinnerOn = false;
          Swal({
                text: 'Some Error Occurred. Please Try Again',
                type: 'error',
                toast: true,
                showConfirmButton: false,
                timer: 2500
              });
        })
      }
      });
    },
    fetch_summary(){
      // console.log(this.current_graph_data)
      $("search_report_comment").attr('placeholder', 'Generating A Summary');
      // this.report_comments = "";
        let phrases = [
            ".........",
        ];
      // console.log(this.start_promise_reports_modal);
      if(this.start_promise_reports_modal){
        $("search_report_comment").attr('placeholder', 'Generating A Summary');
        this.printPhrases(phrases, $('#search_report_comment'));
        this.start_promise_reports_modal = false;
      }
      axios.post(api_calls.bi_fetch_report(),{
        email: this.$session.get("UserInformation").email,
        token: this.$session.get("UserInformation").tokens,
        company_name: this.$session.get("UserInformation").company_name,
        company_id: this.$session.get("UserInformation").company_id,
        data: JSON.stringify(this.current_graph_data.data),
        xKey: this.current_graph_data.xKey,
        yKey: this.current_graph_data.yKey,
        primary_column: this.current_graph_data.primary_column,
        secondary_column: this.current_graph_data.secondary_column,
        graph_recommendations: this.graph_recommendations_for_reports_summary,
        graph_type: this.current_graph_type
      })
      .then(response => {
        if(response.data.status === "Ok"){
          setTimeout(() => {
            this.report_comments = response.data.msg;
          }, 1500);
        } else{

        }
        // else {
        //   toastr.error("Some error occurred in getting summary of the current graph")
        // }
        // console.log(response);
      })
    },
    printPhrases(phrases, el) {
      const vm = this;
      // For each phrase
      // wait for phrase to be typed
      // before start typing next
      phrases.reduce(
          (promise, phrase) => promise.then(_ => vm.printPhrase(phrase, el)),
          Promise.resolve()
      );
      // this.start_promise_reports_modal = true;
      // console.log(this.start_promise_reports_modal);
    },
    printPhrase(phrase, el) {
      const vm = this;
      return new Promise(resolve => {
        // Clear placeholder before typing next phrase
        vm.clearPlaceholder(el);
        let letters = phrase.split('');
        // For each letter in phrase
        letters.reduce(
            (promise, letter, index) => promise.then(_ => {
                // Resolve promise when all letters are typed
                if (index === letters.length - 1) {
                    // Delay before start next phrase "typing"
                    setTimeout(resolve, 1000);
                    let phrases = [
                        "..........",
                    ];
                    $("search_report_comment").attr('placeholder', 'Generating A Summary');
                    this.printPhrases(phrases, $('#search_report_comment'));
                }
                return vm.addToPlaceholder(letter, el);
            }),
            Promise.resolve()
        );
        // this.start_promise_reports_modal = true;
      });
    },
    clearPlaceholder(el) {
      el.attr("placeholder", "Generating A Summary");
    },
    addToPlaceholder(toAdd, el) {
      el.attr('placeholder', el.attr('placeholder') + toAdd);
      // Delay between symbols "typing"
      return new Promise(resolve => setTimeout(resolve, 100));
    },
    download_graph_as_image(){
      this.spinnerOn = true;
      const vm = this;
      $("#downloadGraphsDDL").removeClass("show")
      document.getElementById('graph_heading').style.marginLeft = 'auto';
      document.getElementById('graph_heading').style.marginRight = 'auto';
      document.getElementById('graph_heading').style.marginTop = 0;
      var container = document.getElementById('div-for-image'); // Div to Download
			html2canvas(container).then(function(canvas) {
        var link = document.createElement("a");
        document.body.appendChild(link);
        link.download = vm.heading;
        link.href = canvas.toDataURL("image/png");
        link.target = '_blank';
        link.click();
        vm.spinnerOn = false;
        
      });
      document.getElementById('graph_heading').style.marginTop = 'auto';
      document.getElementById('graph_heading').style.marginLeft =  '0';
      document.getElementById('graph_heading').style.marginRight = '0';
    },
    convert_to_csv(file_type) {
      this.spinnerOn = true;
      var data = this.current_graph_data.data;
      for(let i = 0; i < data.length; i++){
        if(data[i].Share){
          delete data[i].Share;
        }
        if(data[i].percent){
          delete data[i].percent;
        }
      }
      let fileName;
      ((file_type == 'csv') ? fileName = `${this.heading}.csv` : fileName = `${this.heading}.xlsx`)
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, '');
      XLSX.writeFile(wb, fileName);
      this.spinnerOn = false;
    },



  },
  watch : {
    nlp_search(newVal,oldVal){
      this.search_data = [];
      this.hide_all_graphs();
      this.clear_all_graphs_data();
      this.show_chart_types = false;
      this.show_heading = false;
      if(newVal === false){
        this.dataset_icon_to_be_showed = this.dataset_icon_svg;
        this.dataset_name = null;
      }
    },
    dataset_name(newVal,oldVal) {
      for(let j= 0; j < this.all_dataset_column_details.length; j++){
          if(this.all_dataset_column_details[j].dataset_name === newVal){
            this.current_dataset_column_details = this.all_dataset_column_details[j].column_details;
            this.set_current_dataset_currency_columns();
            break;
          }
      }
      for(let i = 0; i < this.datasets.length; i++ ){
        if(this.datasets[i] === newVal) {
          $("#dataset_list"+i).addClass('current_dataset');
        }
        if(this.datasets[i] === oldVal) {
          $("#dataset_list"+i).removeClass('current_dataset')
        }
      }
      // if(newVal !== oldVal){
      //   if(this.search_data.length > 1){
      //     this.hide_all_graphs();
      //     this.clear_all_graphs_data();
      //     this.heading = "";
      //     this.show_chart_types = false;
      //     this.search_result = [];
      //     this.show_heading = false;
      //     this.search_data = [];
      //   }
      // }
      if(newVal !== null){
        this.dataset_icon_to_be_showed = this.dataset_selected_icon_svg;
      } else {
        this.dataset_icon_to_be_showed = this.dataset_icon_svg;
      }
    },
    show_reports_list(newVal,oldVal) {
      if(newVal){
        this.reports_list_icon_to_be_shown = this.reports_list_icon_svg_shown;
        this.hide_all_graphs();
        this.reports_list = [];
        this.get_reports_list();
        // this.spinnerOn =  true;
        // axios
        //   .get(api_calls.bi_list_reports(), {
        //     params:{
        //       per_page: 10,
        //       page_no:1,
        //       email: this.$session.get("UserInformation").email,
        //       token: this.$session.get("UserInformation").tokens,
        //       company_name: this.$session.get("UserInformation").company_name,
        //       company_id: this.$session.get("UserInformation").company_id,
        //     }
        //   })
        //   .then(response => {
        //     this.spinnerOn = false;
        //     if(response.data.status === "Ok"){
        //       this.reports_list = response.data.msg.reports;
        //       this.current_viewed_report = 0;
        //     } else {
        //       Swal.fire({
        //         title: 'Some Error Occurred',
        //         text: 'The List of Reports is not available now. Please Try Again Later',
        //         type: 'error',
        //         showConfirmButton: true,
        //       }).then(result => {
        //         setTimeout(() => {
        //           this.show_reports_list = false;
        //         }, 200);
        //       });
        //     }
        //     // console.log(response);
        //   })
        //   .catch(err => {
        //     this.spinnerOn = false;
        //      Swal.fire({
        //       title: 'Some Error Occurred',
        //       text: 'The List of Reports is not available now. Please Try Again Later',
        //       type: 'error',
        //       showConfirmButton: true,
        //       }).then(result => {
        //       setTimeout(() => {
        //         this.show_reports_list = false;
        //       }, 200);
        //       });
        //   })

      } else if(oldVal){
        this.reports_list_icon_to_be_shown = this.reports_list_icon_svg_default ;
        this.change_graph_type(this.current_graph_type);
      }
    },
    report_append_to_old(newVal,oldVal) {
      if (newVal != null){
        this.report_name_disabled = true;
        this.report_name = newVal.title;
        this.report_modal_title_text = `Append to Report - ${newVal.title}`;
        this.report_submit_button_text = 'Append to Report';
      } else {
        this.report_name_disabled = false;
        this.report_name = '';
        this.report_modal_title_text = 'Add to Report';
        this.report_submit_button_text = 'Add to Report';

      }
    }
  }
};
</script>
<style scoped>
@media (min-width: 576px) {
  .col-sm-6 {
    -ms-flex: 0 0 50%;
    flex: 0 0 50%;
    max-width: 100%;
  }
}
btn-primary.focus, .btn-primary:focus {
    box-shadow: 0 0 0 0.2rem rgb(255, 255, 255,0);
}
#chart_types_dropdown {
    width: 300px !important;
}
#reports_dropdown {
  min-width: 800px !important;
  min-height: 250px !important;
}
.bgcolor {
  background-color: darkblue !important;
  margin-left: 10px !important;
}
.leftmargin {
  margin-left: 10px;
}
.chart_type_div:hover {
  box-shadow: 2px 2px 6px 6px #d4c1c185;
}
.current_dataset {
  color: #2196f3
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 2.45s ease-in-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
<style>
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
<style lang="css">
/* style the background and the text color of the input ... */
.vue-tags-input {
  background: #324652;
}

.vue-tags-input .ti-new-tag-input {
  background: transparent;
  color: #b7c4c9;
}

.vue-tags-input .ti-input {
  padding: 4px 10px;
  transition: border-bottom 200ms ease;
}

/* we cange the border color if the user focuses the input */
.vue-tags-input.ti-focus .ti-input {
  border: 1px solid #ebde6e;
}

/* some stylings for the autocomplete layer */
.vue-tags-input .ti-autocomplete {
  background: #283944;
  border: 1px solid #8b9396;
  border-top: none;
}

/* the selected item in the autocomplete layer, should be highlighted */
.vue-tags-input .ti-item.ti-selected-item {
  background: #ebde6e;
  color: #283944;
}

/* style the placeholders color across all browser */
.vue-tags-input ::-webkit-input-placeholder {
  color: #a4b1b6;
}

.vue-tags-input ::-moz-placeholder {
  color: #a4b1b6;
}

.vue-tags-input :-ms-input-placeholder {
  color: #a4b1b6;
}

.vue-tags-input :-moz-placeholder {
  color: #a4b1b6;
}

/* default styles for all the tags */
.vue-tags-input .ti-tag {
  position: relative;
  background: #ebde6e;
  color: #283944;
}

/* we defined a custom css class in the data model, now we are using it to style the tag */
.vue-tags-input .ti-tag.custom-class {
  background: transparent;
  border: 1px solid #ebde6e;
  color: #ebde6e;
  margin-right: 4px;
  border-radius: 0px;
  font-size: 13px;
}

/* the styles if a tag is invalid */
.vue-tags-input .ti-tag.ti-invalid {
  background-color: #e88a74;
}

/* if the user input is invalid, the input color should be red */
.vue-tags-input .ti-new-tag-input.ti-invalid {
  color: #e88a74;
}

/* if a tag or the user input is a duplicate, it should be crossed out */
.vue-tags-input .ti-duplicate span,
.vue-tags-input .ti-new-tag-input.ti-duplicate {
  text-decoration: line-through;
}

/* if the user presses backspace, the complete tag should be crossed out, to mark it for deletion */
.vue-tags-input .ti-tag:after {
  transition: transform 0.2s;
  position: absolute;
  content: "";
  height: 2px;
  width: 108%;
  left: -4%;
  top: calc(50% - 1px);
  background-color: #000;
  transform: scaleX(0);
}

.vue-tags-input .ti-deletion-mark:after {
  transform: scaleX(1);
}
</style>
