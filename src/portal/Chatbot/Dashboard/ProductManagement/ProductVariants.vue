<template>
  <div>
    <div class="products_variants">
      <div class="spinner" id="spinner" v-show="spinnerOn"></div>
      <!-- <div class="container"> -->
      <div class="col-sm-12 my-1">
        <div class="col-sm-12 my-1 d-flex">
          <button
            id="product_variant_add_btn"
            class="darkblue-btn d-block ml-auto"
            type="button"
            data-toggle="modal"
            @click="add_variant_open_modal()"
          >
            {{tlt('product_config_variant_add_btn')}}
          </button>
          <button
            id="product_variant_save_all_btn"
            class="darkblue-btn d-block ml-2"
            @click="save_variants"
            v-if="Boolean(current_active_product) === true"
          >
            {{tlt('product_config_variant_save_all_btn')}}
          </button>
        </div>
      </div>
      <div class="col-sm-12 d-flex">
        <div class="col-sm-4">
          <div
            class="table-box"
            v-if="Boolean(current_active_product) === true"
          >
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      class="text-left"
                      style="
                        font: normal normal normal 16px/22px Roboto;
                        letter-spacing: 0px;
                        color: #414141;
                      "
                    >
                      <span> {{tlt('product_config_variant_name_header')}} </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(product, index) in products_list_data"
                    :key="index"
                    style="cursor: pointer"
                    @click="set_current_product(index)"
                    :class="check_current_product_active(index)"
                  >
                    <td>
                      {{ product.search_parameter }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-sm-8">
          <div
            class="table-responsive px-3"
            v-if="Boolean(current_active_product) === true"
          >
            <div class="px-3 pt-3">
              <!-- <h5>{{ current_active_product.search_parameter }} -->
              <span
                @click="edit_variant_details"
                v-html="pencil_svg"
                class="ml-auto"
                style="cursor: pointer; float: right"
                v-if="!is_edit_variant"
								title="Edit"
              ></span>
              <i
                class="fa fa-times mt-2 pt-1"
                aria-hidden="true"
                style="cursor: pointer; float: right"
                @click="edit_variant_details"
                v-if="is_edit_variant"
								title="Cancel"
              ></i>
              <i
                id="edit_save_btn"
                class="fa fa-check mt-2 pt-1 mr-2"
                aria-hidden="true"
                style="cursor: pointer; float: right"
                @click="edit_variant_save"
                v-if="is_edit_variant"
								title="Save"
              ></i>
              <!-- </h5> -->
            </div>
            <!-- <hr /> -->
            <template v-if="!is_edit_variant">
              <h5>{{ current_active_product.search_parameter }}</h5>
              <div class="card-act d-flex px-3">
                <!-- <input
                type="text"
                v-model.trim="variant_name"
                class="form-control"
                placeholder="Add another name for product"
              /> -->
                <!-- <button
                id="alternate_product_name_add_btn"
                class="darkblue-btn ml-2"
                @click="add_alternate_name"
                v-if="!is_edit_alternate_name"
              >
                ADD
              </button>
              <button
                class="darkblue-btn ml-2"
                @click="save_edit_alternate_name"
                v-if="is_edit_alternate_name"
              >
                EDIT
              </button> -->
              </div>
              <div class="mt-1 py-2">
                <h5>
                  Variant Values for
                  {{ current_active_product.search_parameter }}
                </h5>
                <div style="border-bottom: 1px solid #e3e2e5"></div>
                <div
                  v-for="(
                    variant_name, index
                  ) in current_active_product.search_parameter_values"
                  :key="index"
                  class="py-2 d-flex"
                >
                  <span> {{ variant_name }} </span>
                  <!-- <hr/> -->
                  <!-- <span
                  class="ml-auto c-p edit-delete-span"
                  @click="edit_variant_name(index)"
                >
                  <img
                    :src="
                      require('@/portal/assets/img/edit-pencil-from-xd.svg')
                    "
                    alt="Edit"
                  />
                </span>
                <span
                  class="ml-2 c-p edit-delete-span"
                  @click="delete_alternate_name(index)"
                >
                  <img
                    :src="require('@/portal/assets/img/delete-from-xd.svg')"
                    alt="Delete"
                  />
                </span> -->
                </div>
              </div>
            </template>
            <template v-else>
              <!-- {{editing_variant_data}} -->
              <h5>{{tlt('product_config_variant_edit_label')}}</h5>
              <label for=""><b> {{tlt('product_config_variant_name_label')}}: </b> </label>
              <input
                id="edit_variant_name"
                type="text"
                class="form-control"
                style="height: 40px !important; padding-left: 12px"
                v-model="editing_variant_data.search_parameter"
                v-on:keyup="validate_edit_variant_name"
                required
                :placeholder="tlt('add_variant_name')"
              />
               <span v-show="edit_variant_name_already_exist" style="color: red"
                >{{tlt('product_config_variant_name_condition_text')}}.</span>
							<div class="pt-2 d-flex">
              <label> <b>{{tlt('product_config_variant_values_label')}} </b> </label>
							<i class="fa fa-plus ml-auto pt-2" aria-hidden="true" title="Add More" @click="add_to_variants_edit_list('add')" style="cursor:pointer;"></i>
							</div>
              <div
                v-for="(
                  new_edit_variant, index
                ) in editing_variant_data.search_parameter_values"
                :key="index"
                class="form-group"
                style="display: flex"
              >
                <input
                  type="text"
                  v-model.trim="
                    editing_variant_data.search_parameter_values[index]
                  "
                  v-on:keyup="validate_edit_variant_value"
                  class="form-control edit"
                  :placeholder="tlt('variant_value')"
                  :id="`new_edit_variant_${index}`"
                />
                <span
                  v-if="editing_variant_data.search_parameter_values.length > 1"
                  style="cursor: pointer"
                  class="my-auto ml-2 mr-0"
                  @click="add_to_variants_edit_list('remove', index)"
                >
								
                  <i style="font-size: 16px" class="fa" title="Cancel">&#xf1f8;</i>
                </span>
              </div>
              <div v-show="edit_variant_value_already_exist">
                <span style="color: red">{{tlt('product_config_variant_values_condition_text')}}.</span>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div v-if="products_list_data.length === 0 && !spinnerOn">
        <div class="col-sm-12 d-flex px-0 py-5">
          <h4 class="mx-auto">
            {{tlt('product_config_no_variant_added')}}
          </h4>
        </div>
      </div>
      <!-- </div> -->
      <div id="myModal" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">{{tlt('variant_model_add_variant_header')}}</h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            <form @submit.prevent="add_new_variant_data">
              <div class="modal-body">
                <!-- <p>Some text in the modal.</p> -->
                <div class="form-group">
                  <label for=""> {{tlt('variant_model_name_label')}} </label>
                  <!-- <input
                type="text"
                v-model.trim="new_variant_name"
                class="form-control"
                placeholder="Add Name for Variant"
              /> -->
                  <input
                    id= "variant_name"
                    type="text"
                    class="form-control"
                    style="height: 40px !important; padding-left: 12px"
                    v-on:keyup="validate_variant_name"
                    v-model="new_variant_name"
                    required
                    :placeholder="tlt('add_variant_name')"
                  />
                  <span v-show="variant_name_already_exist" style="color: red"
                >{{tlt('variant_model_variant_name_condition_text')}}.</span>
                </div>
                
                <div class="form-group" style="margin-bottom: 4px">
                  <label> {{tlt('variant_model_add_values_label')}} </label>
                  <!-- <button
                    class="save_node_button"
                    @click="add_variant_values"
                    type="button"
                    style="height: 29px; padding: 0px 10px"
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
							<i class="fa fa-plus ml-auto pt-2" aria-hidden="true" title="Add More" @click="add_variant_values()" style="cursor:pointer;float: right;"></i>
                </div>
                <div
                  style="display: flex; margin-top: 2%"
                  v-for="(variant, index) in new_variant_values"
                  :key="index"
                >
                  <input
                    :id="'variant_value'+index"
                    type="text"
                    class="form-control"
                    style="height: 40px !important; padding-left: 12px"
                    v-model="variant.variant"
                    v-on:keyup="validate_variant_value"
                    required
                    :placeholder="tlt('add_variant_values')"
                  />
                                    
                  <!-- <button
                    class="save_node_button"
                    style="
                      margin-left: 3%;
                      height: 39px;
                      padding: 0px 10px;
                      background: #f23d3d;
                      border: solid 1px #f23d3d;
                    "
                    @click="delete_add_variant(index)"
                    type="button"
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
									 <i v-if="new_variant_values.length > 1" style="font-size: 16px;float:right;cursor:pointer" class="fa my-auto pl-3" title="Cancel" @click="delete_add_variant()">&#xf1f8;</i>
                </div>
                   <div v-show="variant_value_already_exist">
                     <span style="color: red">{{tlt('variant_model_variant_values_condition_text')}}.</span>
                   </div>
              </div>
              <div class="modal-footer">
                <button id = "add_btn" type="submit" class="darkblue-btn">{{tlt('variant_model_add_btn')}}</button>
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                  @click="reset_new_data_values"
                >
                  {{tlt('variant_model_close_btn')}}
                </button>
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
import api_calls from "@/portal/api_calls.js";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { freeze_portal, show_subscription_expired_swal } from "@/portal/mixins";

export default {
  name: "ProductVariants",
  mixins: [freeze_portal, show_subscription_expired_swal],
  data() {
    return {
      spinnerOn: false,
      products_list_data: [],
      company_id: this.$session.get("UserInformation").company_id,
      company_name: this.$session.get("UserInformation").company_name,
      current_active_product: null,
      new_variant_name: null,
      variant_name_already_exist: false,
      variant_value_already_exist: false,
      edit_variant_name_already_exist: false,
      edit_variant_value_already_exist: false,
      new_variant_values: [
        {
          variant: null,
        },
      ],
      variant_name: null,
      pencil_svg:
        ' <svg xmlns="http://www.w3.org/2000/svg" width="15.546" height="15.461" viewBox="0 0 15.546 15.461"><defs><style>.a{fill:#9e9e9e;}</style></defs><g transform="translate(-747.888 -356.769)"><path class="a" d="M759.416,356.769a2.358,2.358,0,0,1,1.777.662c.534.513,1.072,1.025,1.567,1.575a2.3,2.3,0,0,1-.071,3.325c-2.736,2.76-5.494,5.5-8.238,8.251a1.381,1.381,0,0,1-.758.288c-.719.174-1.429.379-2.144.572-.932.251-1.862.5-2.795.751-.6.158-.989-.213-.832-.807q.689-2.595,1.406-5.182a1.164,1.164,0,0,1,.289-.487q4.091-4.107,8.2-8.2A2.265,2.265,0,0,1,759.416,356.769Zm-1.989,2.956-6.54,6.538,3.025,3.024,6.538-6.537Zm4.023,2.165c.118-.135.225-.269.343-.392a1.134,1.134,0,0,0,0-1.734c-.46-.466-.926-.925-1.388-1.39a1.166,1.166,0,0,0-.861-.368c-.578,0-.881.4-1.214.76Zm-12.084,8.863,3.2-.863-2.337-2.331Z" transform="translate(0)"/><path class="a" d="M813.942,422.6l-.789-.8,3.821-3.819.784.8Z" transform="translate(-59.648 -55.947)"/></g></svg>',
      is_edit_variant: false,
      editing_variant_data: null,
      current_active_product_index: 0,
      disable_btn_expired: false,
    };
  },
  watch: {
    new_variant_values(){
      this.validate_variant_value();
    },
  },
  mounted() {
    this.get_variants_data();
    setTimeout(() => {
      this.freeze_portal();
    }, 3000);
    this.$root.$on("VariantsDisabled", (data) =>{
      if(data===true){
        this.disable_btn_expired = true;
      }
    })
  },
  methods: {
    get_variants_data() {
      this.spinnerOn = true;
      axios
        .post(
          api_calls.add_product_variants(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            is_get: true,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then(({ data }) => {
          this.spinnerOn = false;
          // console.log(data);
          // if(data.product_variant.length === 0){
          // this.get_all_products_data();
          // } else {
          this.products_list_data =
            data.product_variant[0].product_variant_data;
          this.current_active_product = this.products_list_data[0];
          // }
        });
    },
    get_all_products_data() {
      this.spinnerOn = true;
      axios
        .post(
          api_calls.template_synonyms(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            is_get_product_list: true,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then(({ data }) => {
          this.spinnerOn = false;
          if (data.status === "Success") {
            let product_names_list = data.product_names_list;
            for (let i = 0, l = product_names_list.length; i < l; i++) {
              this.products_list_data.push({
                search_parameter: product_names_list[i],
                search_parameter_values: [],
              });
            }
            this.current_active_product = this.products_list_data[0];
            // console.log(this.products_list_data);
            // if (this.product_names_list.length > 0) {
            //   this.current_product_name = this.product_names_list[0];
            // }
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
    add_variants() {},
    save_variants() {
      if(!this.disable_btn_expired){
      this.spinnerOn = true;
      axios
        .post(
          api_calls.add_product_variants(),
          {
            company_id: this.company_id,
            company_name: this.company_name,
            product_variant: this.products_list_data,
            is_add: true,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then(({ data }) => {
          this.spinnerOn = false;
          if (
            data.MSG ===
            "product search List and Its values Inserted Successfully"
          ) {
            swal({
              type: "success",
              text: "Your variants data has been saved successfully.",
              timer: 3000,
            });
          } else {
            swal({
              type: "error",
              text: "Some error occurred. Please try again.",
              timer: 3000,
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
      }else {
        this.show_subscription_expired_swal();
      }
    },
    check_current_product_active(index) {
			 if (Boolean(this.current_active_product) === true) {
        return this.current_active_product.search_parameter ===
          this.products_list_data[index].search_parameter
          ? "current-active-product"
          : null;
      }
		},
    delete_add_variant(index) {
      if (this.new_variant_values.length > 1) {
        this.new_variant_values.splice(index, 1);
      }
    },
    add_variant_values() {
      this.new_variant_values.push({
        variant:null,
        });
    },
    validate_variant_name(){
      let v = document.getElementById('variant_name').value;
      let count = 0;
      for (let i =0; i < this.products_list_data.length; i++){
        if(v == this.products_list_data[i].search_parameter){
          count+=1;
          break;
        }
      }
      if (count > 0){
        this.variant_name_already_exist = true;
        document.getElementById("variant_name").style.border ="1px solid red";
      }
      else{
        this.variant_name_already_exist = false;
        document.getElementById("variant_name").style.border ="1px solid #00f000";
      }
    },
    validate_variant_value(){
      let cur_val = this.new_variant_values.map(item => item.variant);
      let uniq = [...new Set(cur_val)];
      if (cur_val.length != uniq.length){
        document.getElementById("add_btn").disabled = true;
        this.variant_value_already_exist = true;

      }
      else{
        document.getElementById("add_btn").disabled = false;
        this.variant_value_already_exist = false;
      }
    },
    validate_edit_variant_name(){
      let v = document.getElementById('edit_variant_name').value;
      let count = 0;
      for (let i =0; i < this.products_list_data.length; i++){
        if(v == this.products_list_data[i].search_parameter){
          count+=1;
          break;
        }
      }
      if (count > 0){
        this.edit_variant_name_already_exist = true;
        document.getElementById("edit_variant_name").style.border ="1px solid red";
      }
      else{
        this.edit_variant_name_already_exist = false;
        document.getElementById("edit_variant_name").style.border ="1px solid #00f000";
      }
    },
    validate_edit_variant_value(){
      let cur_val = this.editing_variant_data.search_parameter_values;
      let uniq = [...new Set(cur_val)];
      if (cur_val.length != uniq.length){
        document.getElementById("edit_save_btn").style.pointerEvents = "none";
        this.edit_variant_value_already_exist = true;

      }
      else{
        document.getElementById("edit_save_btn").style.pointerEvents = "all";
        this.edit_variant_value_already_exist = false;
      }
    },

    add_new_variant_data() {
      if (this.variant_name_already_exist == false){     
      this.products_list_data.unshift({
      search_parameter: this.new_variant_name,
      search_parameter_values: this.new_variant_values.map((x) => x.variant),
      });
      $("#myModal").modal("hide");
      this.new_variant_name = null;
      this.new_variant_values= [
        {
          variant: null,
        },
      ];
      document.getElementById("variant_name").style.border ="solid 1px #DBE2E8"; 
      this.current_active_product = this.products_list_data[0];
      }
    },
    edit_variant_details() {
      this.is_edit_variant = !this.is_edit_variant;
      if (this.is_edit_variant) {
        this.editing_variant_data = JSON.parse(
          JSON.stringify(this.current_active_product)
        );
        return;
      }
      this.editing_variant_data = null;
      this.edit_variant_name_already_exist = false;
      this.edit_variant_value_already_exist = false;
    },
    set_current_product(index) {
      this.current_active_product = this.products_list_data[index];
      this.current_active_product_index = index;
    },
    edit_variant_save() {
      if (this.edit_variant_name_already_exist == false && Boolean(this.editing_variant_data.search_parameter) == true){
      this.products_list_data[
        this.current_active_product_index
      ].search_parameter_values = this.editing_variant_data.search_parameter_values.filter((item) => Boolean(item));
      this.products_list_data[
        this.current_active_product_index
      ].search_parameter = this.editing_variant_data.search_parameter;
      this.is_edit_variant = false;
      this.current_active_product = this.products_list_data[0];
      }
    },
    reset_new_data_values() {
      this.new_variant_name = null;
      this.new_variant_values = [
        {
          variant: null,
        },
      ];
      this.variant_name_already_exist = false;
      document.getElementById("variant_name").style.border ="solid 1px #DBE2E8";
    },
		add_to_variants_edit_list(type,index){
			if (type == "add") {
				this.editing_variant_data.search_parameter_values.unshift("");
        } else if (type == "remove") {
          this.editing_variant_data.search_parameter_values.splice(index, 1);
          this.validate_edit_variant_value();
        }
		},
    add_variant_open_modal(){
      if(!this.disable_btn_expired){
        $("#myModal").modal('show')
      } else {
        this.show_subscription_expired_swal();
      }
    }
  },
};
</script>

<style scoped>
.darkblue-btn {
  font-size: 14px !important;
  padding: 6px 15px !important;
}
.edit {
  line-height: 16px;
  padding: 10px 15px;
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
.current-active-product {
  background: rgba(0, 0, 0, 0.1);
}
.table-box tbody tr:hover td,
.table-box tbody tr:hover th {
  background: #ececec;
}
.table th {
  border-top: none;
}
.table-responsive {
  height: 100vh;
  overflow-y: auto;
  border: 1px solid #e3e2e5;
}
.table-responsive thead th {
  top: 0;
  position: sticky;
}
.table-responsive::-webkit-scrollbar {
  max-height: 10px;
  width: 7px;
  height: 7px;
  border-radius: 10px;
  overflow-x: hidden;
}
.table-responsive::-webkit-scrollbar {
  max-height: 10px;
  width: 7px;
  height: 7px;
  border-radius: 10px;
  overflow-x: hidden;
}
.table-responsive::-webkit-scrollbar-track {
  background: #ffffff;
  border-radius: 10px;
}
.table-responsive::-webkit-scrollbar-thumb {
  background: #27397b;
  border-radius: 10px;
}
.table-responsive::-webkit-scrollbar-thumb:hover {
  background: #19295f;
  border-radius: 10px;
}
</style>