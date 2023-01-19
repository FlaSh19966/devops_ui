<template>
  <div class="dash-cont">
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <div class="container-fluid">
      <div class="card dash-card">
        <div class="card-header d-block d-sm-flex flex-wrap justify-content-between">
          <h4 class="mb-sm-0">Product List</h4>
          <div class="card-act d-flex flex-wrap">
            <!-- <select
                  class="form-control"
                  v-model="search_by"
                  id="select_created_by"
                  style="max-width:250px"
                >
                  <option value>Search By</option>
                  <option v-for="(user,index) in select_list" :key="index">{{user}}</option>
            </select>-->
            <input
              class="form-control"
              style="max-width:150px"
              v-model="search_name"
              v-on:keyup="callsearch"
            />
            <a href="#" class="darkblue-btn" @click="search_product">
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
              data-toggle="modal"
              data-target="#itemmodel"
              id="add_role_btn"
              @click="make_true"
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
              Add Product
            </a>

            <a href="#" class="darkblue-btn" @click="download_csv" title="Download CSV File">
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

            <a
              href="#"
              class="darkblue-btn"
              data-toggle="modal"
              data-target="#usermodel"
              id="add_role_btn"
              title="Upload CSV File"
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
              title="Delete"
              href="javascript:void(0)"
              class="red-btn"
              @click="delete_multiple_product"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                <path
                  id="trash-can-outline"
                  d="M8.375,3v.778H4V5.333h.875V15.444A1.661,1.661,0,0,0,6.625,17h8.75a1.661,1.661,0,0,0,1.75-1.556V5.333H18V3.778H13.625V3H8.375M6.625,5.333h8.75V15.444H6.625V5.333m1.75,1.556v7h1.75v-7H8.375m3.5,0v7h1.75v-7Z"
                  transform="translate(-4 -3)"
                  fill="#fff"
                />
              </svg>
            </a>
          </div>
        </div>
        <div class="card-body">
          <div v-if="isok" class="table-box">
            <div class="table-responsive" style="min-height: 349px">
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
                            @change="check_list_array('all')"
                          />
                          <span class="icn"></span>
                        </label>
                      </div>
                    </th>
                    <th scope="col" style="width: 10%;">ACTION</th>
                    <th v-for="(col,index) in col_list" :key="index">{{col_list[index]}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(itemname,index1) in item_list" :key="index1">
                    <th scope="col">
                      <div class="form-check checkbox-success">
                        <label class="form-check-label checkbox checkbox-success">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            @change="check_list_array(index1)"
                          />
                          <span class="icn"></span>
                        </label>
                      </div>
                    </th>
                    <td class="action">
                      <a href="#" id="edit_item_id">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15.392"
                          height="15.392"
                          viewBox="0 0 15.392 15.392"
                          data-toggle="modal"
                          style="cursor:pointer"
                          data-target="#itemmodel"
                          @click="edit_item(index1)"
                        >
                          <path
                            id="square-edit-outline"
                            d="M4.71,3A1.7,1.7,0,0,0,3,4.71V16.682a1.71,1.71,0,0,0,1.71,1.71H16.682a1.71,1.71,0,0,0,1.71-1.71V10.7h-1.71v5.986H4.71V4.71H10.7V3H4.71m10.928.855a.591.591,0,0,0-.41.171L14.185,5.061,16.322,7.2l1.043-1.035a.578.578,0,0,0,0-.812L16.04,4.026a.571.571,0,0,0-.4-.171M13.578,5.668l-6.3,6.311v2.138H9.413l6.3-6.311Z"
                            transform="translate(-3 -3)"
                            fill="#9499ae"
                          />
                        </svg>
                      </a>
                      <a href="#" @click="delete_product(index1)" id="single_delete_role_id">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="13.682"
                          height="15.392"
                          viewBox="0 0 13.682 15.392"
                        >
                          <path
                            d="M8.276,3v.855H4v1.71h.855V16.682a1.71,1.71,0,0,0,1.71,1.71h8.551a1.71,1.71,0,0,0,1.71-1.71V5.565h.855V3.855H13.406V3H8.276M6.565,5.565h8.551V16.682H6.565V5.565m1.71,1.71v7.7h1.71v-7.7H8.276m3.42,0v7.7h1.71v-7.7Z"
                            transform="translate(-4 -3)"
                            fill="#f23d3d"
                          />
                        </svg>
                      </a>
                    </td>
                    <td v-for="(col,index3) in col_key" :key="index3">
                      <div
                        v-if="col_key[index3]!='ProductUrl'&&col_key[index3]!='ProductImageUrl'"
                      >{{itemname[col]}}</div>
                      <div v-if="col=='ProductUrl'">
                        <a :href="itemname.ProductUrl">Buy Now</a>
                      </div>
                      <div
                        data-toggle="modal"
                        data-target="#imagemodel"
                        style="cursor:pointer"
                        @click="view(index1)"
                        v-if="col=='ProductImageUrl'"
                      >View Image</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div
            class="modal fade dash-modal"
            id="imagemodel"
            tabindex="-1"
            role="dialog"
            aria-labelledby="usermodeltitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <div class="modal-head d-flex align-items-center">
                    <div class="head-icn">
                      <img src="/img/user-blue.png" alt />
                    </div>
                    <h3>Sample Product Image</h3>
                  </div>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <img src="/img/close-icn.png" alt />
                  </button>
                  <div>
                    <img :src="viewurl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="modal fade dash-modal"
            id="usermodel"
            tabindex="-1"
            role="dialog"
            aria-labelledby="usermodeltitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <div class="modal-head d-flex align-items-center">
                    <div class="head-icn">
                      <img src="/img/user-blue.png" alt />
                    </div>
                    <h3>Add CSV File</h3>
                  </div>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <img src="/img/close-icn.png" alt />
                  </button>
                  <form @submit="add_csvfile">
                    <div
                      class="form-group"
                      style="width:31%;margin-top:10px;margin-left:0px;display:inline-block"
                    >
                      <p class="label1">CSV File</p>
                      <div class="custom-file" style="width:300%;">
                        <input
                          type="file"
                          class="custom-file-input"
                          @change="getFile"
                          aria-describedby="inputGroupFileAddon01"
                        />
                        <label
                          style="font-weight:400;"
                          class="custom-file-label form-control"
                          for="file"
                        >{{this.csvfilename}}</label>
                      </div>
                    </div>
                    <span style="color:#FF0000;"></span>
                    <div class="btn-wrap text-right">
                      <a href="#" @click="download_sample_file">Download Sample CSV File</a>
                      <button type="button" class="btn btn-link" data-dismiss="modal">Cancel</button>
                      <button type="submit" class="darkblue-btn">Save & Close</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div class="pagin-table">
            <nav aria-label="Page navigation example">
              <ul class="pagination justify-content-center">
                <li class="page-item">
                  <a class="page-link" href="#" @click="page_require(page_no-1)">
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
                  :class="'page-item '+pagination_class(pageno)"
                  v-for="pageno in page_array"
                  :key="pageno"
                >
                  <a class="page-link" href="#" @click="page_require(pageno)">{{pageno}}</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#" @click="page_require(page_no+1)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="8.667"
                      height="15.204"
                      viewBox="0 0 8.667 15.204"
                    >
                      <g id="arrow-point-to-right" transform="translate(-97.139 0)">
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

          <div v-if="isok">
            <div
              class="modal fade dash-modal"
              id="itemmodel"
              tabindex="-1"
              role="dialog"
              aria-labelledby="itemmodeltitle"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-body">
                    <div class="modal-head d-flex align-items-center">
                      <div class="head-icn">
                        <img src="/img/user-blue.png" alt />
                      </div>
                      <h3>Add Product</h3>
                    </div>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <img src="/img/close-icn.png" alt />
                    </button>
                    <form @submit="add_item">
                      <div>
                        <label>{{col_list[0]}}</label>
                        <input
                          type="text"
                          v-model="new_product[col_key[0]]"
                          class="form-control"
                          :placeholder="col_list[0]"
                        />
                      </div>
                      <div v-for="index in col_length-1" :key="index">
                        <label>{{col_list[index]}}</label>
                        <input
                          type="text"
                          v-model="new_product[col_key[index]]"
                          class="form-control"
                          :placeholder="col_list[index]"
                        />
                      </div>
                      <span style="color:#FF0000;"></span>
                      <div class="btn-wrap text-right">
                        <button type="button" class="btn btn-link" data-dismiss="modal">Cancel</button>
                        <button type="submit" class="darkblue-btn">Save & Close</button>
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
import Swal from "sweetalert2";
import api_calls from "@/portal/api_calls";
import { Script } from "vm";
import { truncate } from "fs";
export default {
  data() {
    return {
      item_list: [],
      checked_list: [],
      file_label: null,
      add_edit: true,
      delete_list: [],
      travel: [0, 1, 2],
      edit_index: null,
      doc_id: "",
      old_file_name: "",
      product_name: "",
      csvfile: "",
      csvfilename: "Choose CSV File",
      editproductname: false,
      editcsvfile: false,
      page_no: 1,
      per_page: 100,
      total_pages: 0,
      page_array: [],
      number_of_rows: 0,
      new_product: {},
      iseditproductid: false,
      iseditcategoryname: false,
      viewurl: null,
      col_list: [],
      col_length: 0,
      isok: false,
      col_key: [],
      // search_by: '',
      search_name: "",
      select_list: [],
      spinnerOn: false
    };
  },
  created() {
    axios
      .post(api_calls.upload_product_csv(), {
        company_id: this.$session.get("UserInformation").company_id,
        company_name: this.$session.get("UserInformation").company_name,
        license_key: this.$session.get("UserInformation").license_key,
        email: this.$session.get("UserInformation").email,
        token: this.$session.get("UserInformation").tokens,
        isgetcsv: true,
        pageno: this.page_no,
        perpage: this.per_page
      },{
        headers: {
          Authorization: `Bearer ${this.$session.get("at")}`,
        },
      })
      .then(response => {
        if (
          response.data.MSG == "No Products Added Yet" ||
          response.data == "Internal Server Error" ||
          response.data.csvfile.length == 0
        ) {
          this.fordefault();
        } else if (response.data.csvfile.length) {
          this.itemList(response.data);
        }
      });
  },
  mounted() {
    // var vm = this;
    // $("#selectall").click(function() {
    //   if ($(this).is(":checked")) {
    //     // $('div:input').prop('checked',true);
    //     $("input:checkbox").prop("checked", true);
    //     console.log("heeey");
    //   } else {
    //     vm.checked_list = [];
    //     $("input:checkbox").prop("checked", false);
    //     console.log("heeey2");
    //   }
    // });
  },
  // checkAll(ele) {
  //      var checkboxes = document.getElementsByTagName('input');
  //      if (ele.checked) {
  //          for (var i = 0; i < checkboxes.length; i++) {
  //              if (checkboxes[i].type == 'checkbox') {
  //                  checkboxes[i].checked = true;
  //              }
  //          }
  //      } else {
  //          for (var i = 0; i < checkboxes.length; i++) {
  //              console.log(i)
  //              if (checkboxes[i].type == 'checkbox') {
  //                  checkboxes[i].checked = false;
  //              }
  //          }
  //      }
  //  },
  methods: {
    make_true() {
      this.isok = true;
    },
    download_sample_file() {
      let sample_csv_file_url = "";
      window.open(sample_csv_file_url, "_blank");
    },
    fordefault() {
      (this.new_product["CategoryId"] = null),
        (this.new_product["CategoryName"] = ""),
        (this.new_product["ProductId"] = null),
        (this.new_product["ProductName"] = ""),
        (this.new_product["ProductUrl"] = ""),
        (this.new_product["ProductImageUrl"] = ""),
        (this.new_product["Quantity"] = null),
        (this.new_product["UnitPrice"] = null),
        (this.new_product["Weight"] = null),
        this.col_list.push("CATEGORY ID");
      this.col_key.push("CategoryId");
      this.col_list.push("CATEGORY NAME");
      this.col_key.push("CategoryName");
      this.col_list.push("PRODUCT ID");
      this.col_key.push("ProductId");
      this.col_list.push("PRODUCT NAME");
      this.col_key.push("ProductName");
      this.col_list.push("PRODUCT URL");
      this.col_key.push("ProductUrl");
      this.col_list.push("PRODUCT IMAGE URL");
      this.col_key.push("ProductImageUrl");
      this.col_list.push("QUANTITY");
      this.col_key.push("Quantity");
      this.col_list.push("UNIT PRICE");
      this.col_key.push("UnitPrice");
      this.col_list.push("WEIGHT");
      this.col_key.push("Weight");
      this.col_length = 9;
      this.isok = true;
    },
    download_csv() {
      this.spinnerOn = true;
      axios
        .post(api_calls.upload_product_csv(), {
          company_id: this.$session.get("UserInformation").company_id,
          company_name: this.$session.get("UserInformation").company_name,
          license_key: this.$session.get("UserInformation").license_key,
          email: this.$session.get("UserInformation").email,
          token: this.$session.get("UserInformation").tokens,
          isdownload: true
        },{
          headers: {
            Authorization: `Bearer ${this.$session.get("at")}`,
          },
        })
        .then(response => {
          this.spinnerOn = false;
          if (response.data.MSG != "Internal Server Error") {
            setTimeout(() => {
              window.open(response.data.filedownloadurl, "_blank");
            }, 5000);
          } else {
            toastr.error(
              "Try Uploading File/Product",
              "Error Occured While Downloading File"
            );
          }
        });
    },
    search_product() {
      // if(this.search_by!=''){
      if (this.search_name != "") {
        this.spinnerOn = true;
        axios
          .post(api_calls.upload_product_csv(), {
            company_id: this.$session.get("UserInformation").company_id,
            company_name: this.$session.get("UserInformation").company_name,
            license_key: this.$session.get("UserInformation").license_key,
            email: this.$session.get("UserInformation").email,
            token: this.$session.get("UserInformation").tokens,
            issearch: true,
            // searchby: this.search_by,
            key: this.search_name,
            perpage: this.per_page,
            pageno: this.page_no
          },{
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          })
          .then(response => {
            this.spinnerOn = false;
            if (response.data.MSG != "NO PRODUCTS FOUND") {
              this.isok = true;
              this.item_list = [];
              this.checked_list = [];
              this.number_of_rows = response.data.products.length;
              for (var i = 0; i < response.data.products.length; i++) {
                this.item_list.push(response.data.products[i]);
                this.checked_list.push(false);
              }
              console.log(this.item_list);
              this.total_pages = response.data.PageCount;
              this.setpagination(this.page_no);
            } else {
              toastr.error("No Match Found");
              setTimeout(() => {
                this.$router.go();
              }, 2500);
            }
          });
      } else {
        toastr.error("Enter proper data for searching");
      }
      // }else{
      //   toastr.error("Select header for searching");
      // }
    },
    change_id() {
      this.iseditproductid = true;
    },
    view(index) {
      this.viewurl = this.item_list[index]["ProductImageUrl"];
    },
    itemList(message) {
      this.isok = true;
      this.number_of_rows = message.csvfile.length;
      this.total_pages = message.PageCount;
      for (var i = 0; i < message.csvfile.length; i++) {
        this.item_list.push(message.csvfile[i]);
        this.checked_list.push(false);
      }
      for (var i = 0; i < message.fields.length; i++) {
        this.new_product[message.fields[i].replace(" ", "").replace(" ", "")] =
          "";
        this.col_list.push(message.fields[i]);
        if (
          message.fields[i] != "Product Url" &&
          message.fields[i] != "Product Image Url"
        ) {
          this.select_list.push(message.fields[i]);
        }
        this.col_key.push(message.fields[i].replace(" ", "").replace(" ", ""));
      }
      this.col_length = message.fields.length;
      this.setpagination(this.page_no);
    },
    delete_product(index) {
      this.check_list_array(index);
      this.delete_multiple_product();
    },
    delete_multiple_product() {
      var len = this.checked_list.length;
      for (var i = 0; i < len; i++) {
        if (this.checked_list[i]) {
          this.delete_list.push({
            id: this.item_list[i].DocumentId
          });
        }
      }
      if (this.delete_list.length == 0) {
        Swal.fire({
          title:"No product selected!",
          text:"",
          type:"error",
          timer:2000,
        });
      } else if (this.delete_list.length > 0) {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete!!"
        }).then(result => {
          if (result.value) {
            axios
              .post(api_calls.upload_product_csv(), {
                company_id: this.$session.get("UserInformation").company_id,
                company_name: this.$session.get("UserInformation").company_name,
                license_key: this.$session.get("UserInformation").license_key,
                email: this.$session.get("UserInformation").email,
                token: this.$session.get("UserInformation").tokens,
                docids: this.delete_list,
                isdelete: true
              },{
                headers: {
                  Authorization: `Bearer ${this.$session.get("at")}`,
                },
              })
              .then(response => {
                if (response.data.MSG == "Products Deleted Successfully") {
                  Swal.fire({
                    title:"Deleted!",
                    text:"Your products have been deleted.",
                    type:"success",
                    timer:2000,
                  });
                  setTimeout(() => {
                    this.$router.go();
                  }, 2500);
                } else if (response.data.MSG == "Internal Server Error") {
                  Swal.fire({
                    title:"Error!!",
                    text:"Error occured while deleting file",
                    timer:2500,
                  });
                }
              });
          }
        });
      }
    },
    getFile(e) {
      event.preventDefault();
      const file = e.target.files[0];
      var reader = new FileReader();
      this.csvfilename = file.name;
      reader.readAsDataURL(file);
      reader.onload = e => {
        this.csvfile = reader.result;
      };
      this.editcsvfile = true;
    },
    check_list_array(index) {
      if (index == "all") {
        var role_length = this.number_of_rows;
        var checkedboxes = document.querySelectorAll("input[type=checkbox]");
        for (let i = 0; i < role_length; i++) {
          this.checked_list[i] = !this.checked_list[i];
        }
        for (let i = 1; i <= role_length; i++) {
          if (checkedboxes[i].checked == true) {
            checkedboxes[i].checked = false;
          } else {
            checkedboxes[i].checked = true;
          }
        }
      } else {
        this.checked_list[index] = !this.checked_list[index];
      }
      // console.log(role_length,checkedboxes,this.checked_list);
    },
    edit_item(index) {
      this.new_product = {};
      for (let i = 0; i < this.col_length; i++) {
        this.new_product[this.col_key[i]] = this.item_list[index][
          this.col_key[i]
        ];
      }
      this.doc_id = this.item_list[index].DocumentId;
      this.add_edit = false;
    },
    add_csvfile() {
      event.preventDefault();
      if (this.csvfilename == "") {
        toastr.error("Please select csv file");
      } else {
        axios
          .post(api_calls.upload_product_csv(), {
            company_id: this.$session.get("UserInformation").company_id,
            company_name: this.$session.get("UserInformation").company_name,
            license_key: this.$session.get("UserInformation").license_key,
            email: this.$session.get("UserInformation").email,
            token: this.$session.get("UserInformation").tokens,
            csvfilename: this.csvfilename,
            csvfiledata: this.csvfile.split("base64,")[1],
            isupload: true
          },{
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          })
          .then(response => {
            if (response.data == "File Uploaded Successfully") {
              toastr.success("Your file has been uploaded successfully");
              setTimeout(() => {
                this.$router.go();
              }, 1000);
            } else if (response.data.Missing_Values) {
              var msg = "";
              for (let i = 0; i < response.data.Missing_Values.length; i++) {
                msg = msg.concat(response.data.Missing_Values[i], "<br>");
              }
              toastr.error("Missing Values In Above Columns", msg);
              console.log(msg);
            } else {
              toastr.error("Error occured while uploading file");
            }
          });
      }
    },
    add_item() {
      event.preventDefault();
      if (this.add_edit) {
        let isfilled = true;
        let i;
        for (i = 0; i < this.col_length; i++) {
          if (
            this.new_product[this.col_key[i]] == "" ||
            this.new_product[this.col_key[i]] == null
          ) {
            isfilled = false;
          }
        }
        if (isfilled) {
          let x;
          for (i = 0; i < this.col_length; i++) {
            x = this.new_product[this.col_key[i]];
            if (isNaN(Number(x))) {
            } else {
              this.new_product[this.col_key[i]] = Number(
                this.new_product[this.col_key[i]]
              );
            }
          }
          axios
            .post(api_calls.upload_product_csv(), {
              company_id: this.$session.get("UserInformation").company_id,
              company_name: this.$session.get("UserInformation").company_name,
              license_key: this.$session.get("UserInformation").license_key,
              email: this.$session.get("UserInformation").email,
              token: this.$session.get("UserInformation").tokens,
              productdetails: this.new_product,
              isaddproduct: true
            },{
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            })
            .then(response => {
              if (response.data.MSG == "Product Added Successfully") {
                toastr.success("The product has been added successfully");
                setTimeout(() => {
                  this.$router.go();
                }, 1000);
              } else {
                toastr.error("Error occured while adding product");
              }
            });
        } else {
          toastr.error("Please Fill All Fields");
        }
      } else {
        if (true) {
          let x;
          for (let i = 0; i < this.col_length; i++) {
            x = this.new_product[this.col_key[i]];
            // console.log(x);
            if (
              isNaN(Number(x)) ||
              x == true ||
              x == false ||
              x == "" ||
              x == null
            ) {
            } else {
              this.new_product[this.col_key[i]] = Number(
                this.new_product[this.col_key[i]]
              );
            }
          }
          axios
            .post(api_calls.upload_product_csv(), {
              company_id: this.$session.get("UserInformation").company_id,
              company_name: this.$session.get("UserInformation").company_name,
              license_key: this.$session.get("UserInformation").license_key,
              email: this.$session.get("UserInformation").email,
              token: this.$session.get("UserInformation").tokens,
              productdetails: this.new_product,
              docid: this.doc_id,
              iseditproductid: this.iseditproductid,
              isedit: true
            },{
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            })
            .then(response => {
              if (response.data.MSG == "Changes Applied Successfully") {
                toastr.success("The product has been edited successfully");
                setTimeout(() => {
                  this.$router.go();
                }, 1000);
              } else {
                toastr.error("Error occured while editing product");
              }
            });
        }
      }
    },
    clear_fields() {
      this.new_product = {};
      this.editproductid = false;
    },
    pagination_class(index) {
      if (index == this.page_no) {
        return " active";
      } else {
        return "";
      }
    },
    callsearch() {
      if (event.keyCode === 13) {
        this.search_product();
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
        this.page_array.push(this.total_pages);
      } else if (page_no == this.total_pages) {
        this.page_array.push(1);
        for (let i = this.total_pages - 4; i < this.total_pages; i++) {
          this.page_array.push(i + 1);
        }
      } else if (page_no <= 4) {
        for (let i = 0; i < page_no + 3; i++) {
          this.page_array.push(i + 1);
        }
        this.page_array.push(this.total_pages);
      } else if (page_no >= this.total_pages - 4) {
        this.page_array.push(1);
        for (let i = page_no - 3; i < this.total_pages; i++) {
          this.page_array.push(i + 1);
        }
      } else {
        this.page_array.push(1);
        for (let i = page_no - 3; i <= page_no + 3; i++) {
          this.page_array.push(i);
        }
        this.page_array.push(this.total_pages);
      }
    },
    page_require(page) {
      if (page == 0 || page == this.total_pages + 1) {
      } else {
        $("input:checkbox").prop("checked", false);
        this.page_no = page;
        if (this.search_name != "") {
          axios
            .post(api_calls.upload_product_csv(), {
              company_id: this.$session.get("UserInformation").company_id,
              company_name: this.$session.get("UserInformation").company_name,
              license_key: this.$session.get("UserInformation").license_key,
              email: this.$session.get("UserInformation").email,
              token: this.$session.get("UserInformation").tokens,
              issearch: true,
              // searchby: this.search_by,
              key: this.search_name,
              perpage: this.per_page,
              pageno: this.page_no
            },{
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            })
            .then(response => {
              this.item_list = [];
              this.isok = true;
              this.col_list = [];
              this.checked_list = [];
              this.col_key = [];
              this.col_length = 0;
              this.number_of_rows = response.data.products.length;
              for (var i = 0; i < response.data.products.length; i++) {
                this.item_list.push(response.data.products[i]);
                this.checked_list.push(false);
              }
              this.total_pages = response.data.PageCount;
              this.setpagination(this.page_no);
            });
        } else {
          axios
            .post(api_calls.upload_product_csv(), {
              company_id: this.$session.get("UserInformation").company_id,
              company_name: this.$session.get("UserInformation").company_name,
              license_key: this.$session.get("UserInformation").license_key,
              email: this.$session.get("UserInformation").email,
              token: this.$session.get("UserInformation").tokens,
              isgetcsv: true,
              pageno: this.page_no,
              perpage: this.per_page
            },{
              headers: {
                Authorization: `Bearer ${this.$session.get("at")}`,
              },
            })
            .then(response => {
              if (
                response.data.MSG == "No Products Added Yet" ||
                response.data == "Internal Server Error" ||
                response.data.csvfile.length == 0
              ) {
                this.fordefault();
              } else if (response.data.csvfile.length) {
                this.item_list = [];
                this.col_list = [];
                this.col_key = [];
                this.col_length = 0;
                this.itemList(response.data);
              }
            });
        }
      }
    }
  }
};
</script>
 <style  src="vue-multiselect/dist/vue-multiselect.min.css">
</style>
 <style scoped>
.custom-file > input::-webkit-input-placeholder {
  margin-left: 200px;
}

.red-btn svg {
  margin-right: 0;
}
/* .red-btn {
  margin-left: auto;
} */
.darkblue-btn svg {
  margin-right: 0;
}
/* .darkblue-btn,.red-btn{
    height:32px;
 } */
img {
  max-width: 100%;
  max-height: 100%;
}

a {
  color: #999;
}
.current {
  color: red;
}
/* ul {
  padding: 0;
  list-style-type: none;
  margin: 5px 5px;
}
li {
  display: inline;
  margin: 5px 5px;
} */
</style>