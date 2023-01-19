<template>
  <div class="dash-cont">
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <div class="container-fluid">
      <div class="card dash-card">
        <div class="card-body">
          <div class="col-sm-12" style="padding: 0.3rem">
            <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link pl-5 pr-5 active"
                  id="alternate_product_names-tab"
                  data-toggle="tab"
                  href="#alternate_product_names"
                  role="tab"
                  aria-controls="alternate_product_names"
                  aria-selected="true"
                  @click="view_component_name = 'alternate_product_names'"
                  >{{tlt('alternate_product_name_tab')}}</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link pl-5 pr-5"
                  id="products_upsell-tab"
                  data-toggle="tab"
                  href="#products_upsell"
                  role="tab"
                  aria-controls="products_upsell"
                  aria-selected="false"
                  @click="view_component_name = 'products_upsell'"
                  >{{tlt('products_upsell_tab')}}</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link pl-5 pr-5"
                  id="products_crosssell-tab"
                  data-toggle="tab"
                  href="#products_crosssell"
                  role="tab"
                  aria-controls="products_crosssell"
                  aria-selected="false"
                  @click="view_component_name = 'products_crosssell'"
                  >{{tlt('products_cross_sell_tab')}}</a
                >
              </li>
              <!-- <li class="nav-item">
                <a
                  class="nav-link pl-5 pr-5"
                  id="analytics-tab"
                  data-toggle="tab"
                  href="#analytics"
                  role="tab"
                  aria-controls="analytics"
                  aria-selected="false"
                  @click="view_component_name = 'analytics'"
                  >Analytics</a
                >
              </li> -->
              <li class="nav-item">
                <a
                  class="nav-link pl-5 pr-5"
                  id="products-ranking-tab"
                  data-toggle="tab"
                  href="#products_ranking"
                  role="tab"
                  aria-controls="products_ranking"
                  aria-selected="false"
                  @click="view_component_name = 'products_ranking'"
                  >{{tlt('products_ranking_tab')}}</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link pl-5 pr-5"
                  id="customer-feedback-tab"
                  data-toggle="tab"
                  href="#customer_feedback"
                  role="tab"
                  aria-controls="customer_feedback"
                  aria-selected="false"
                  @click="view_component_name = 'customer_feedback'"
                  >{{tlt('customer_feedback_tab')}}</a
                  >
              </li>
              <!-- <li class="nav-item">
                <a
                  class="nav-link pl-5 pr-5"
                  id="products-variants-tab"
                  data-toggle="tab"
                  href="#products_variants"
                  role="tab"
                  aria-controls="products_variants"
                  aria-selected="false"
                  @click="view_component_name = 'products_variants'"
                  >Products Variants</a
                >
              </li> -->
              <li class="nav-item">
                <a
                  class="nav-link pl-5 pr-5"
                  id="review_rating-tab"
                  data-toggle="tab"
                  href="#review_rating"
                  role="tab"
                  aria-controls="review_rating"
                  aria-selected="false"
                  @click="view_component_name = 'review_rating'"
                  >{{tlt('customer_review_tab')}}</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link pl-5 pr-5"
                  id="coupon_codes-tab"
                  data-toggle="tab"
                  href="#coupon_codes"
                  role="tab"
                  aria-controls="coupon_codes"
                  aria-selected="false"
                  @click="view_component_name = 'coupon_codes'"
                  >{{tlt('product_layout_coupon_codes_tab')}}</a
                >
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active"
                id="alternate_product_names"
                role="tabpanel"
                aria-labelledby="alternate_product_names"
              >
              <template v-if="view_component_name === 'alternate_product_names'">
                <alternate-name/>
              </template>
              </div>
              <div
                class="tab-pane fade"
                id="products_upsell"
                role="tabpanel"
                aria-labelledby="products_upsell"
              >
              <template v-if="view_component_name === 'products_upsell'">
                <product-upsell/>
              </template>
              </div>
              <div
                class="tab-pane fade"
                id="products_crosssell"
                role="tabpanel"
                aria-labelledby="products_crosssell"
              >
              <template v-if="view_component_name === 'products_crosssell'">
                <product-crosssell/>
              </template>
              </div>
              <div
                class="tab-pane fade"
                id="analytics"
                role="tabpanel"
                aria-labelledby="analytics"
              >
              <template v-if="view_component_name === 'analytics'">
                <analytics/>
              </template>
              </div>
              <div
                class="tab-pane fade"
                id="products_ranking"
                role="tabpanel"
                aria-labelledby="products_ranking"
              >
              <template v-if="view_component_name === 'products_ranking'">
                <products-ranking/>
              </template>
              </div>
              <div
                class="tab-pane fade"
                id="customer_feedback"
                role="tabpanel"
                aria-labelledby="customer_feedback"
              >
                <template v-if="view_component_name === 'customer_feedback'">
                  <customer-feedback/>
                </template>
              </div>
              <div
                id="products_variants"
                class="tab-pane fade"
                role="tabpanel"
                aria-labelledby="products_variants"
              >
              <template v-if="view_component_name === 'products_variants'">
                <product-variants/>
              </template>
              </div>
              <div
                id="review_rating"
                class="tab-pane fade"
                role="tabpanel"
                aria-labelledby="review_rating"
              >
              <template v-if="view_component_name === 'review_rating'">
                <review-rating/>
              </template>
              </div>
              <div
                id="coupon_codes"
                class="tab-pane fade"
                role="tabpanel"
                aria-labelledby="coupon_codes"
              >
              <template v-if="view_component_name === 'coupon_codes'">
                <coupon-codes></coupon-codes>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import AlternateProductNames from './AlternateProductNames.vue'
import ProductsUpSell from './ProductsUpSell.vue'
import ProductsCrossSell from './ProductsCrossSell.vue'
import Analytics from './Analytics.vue'
import ProductsRanking from './ProductsRanking.vue'
import CustomerFeedback from './CustomerFeedbackQuestions.vue'
import ProductVariants from './ProductVariants.vue'
import ReviewRating from './ReviewRating.vue'
import CouponCodes from './CouponCodes.vue'
import { bus } from "@/portal/main";

export default {
  name: "ProductLayout",
  components: {
    "alternate-name": AlternateProductNames,
    "product-upsell": ProductsUpSell,
    "product-crosssell": ProductsCrossSell,
    "analytics": Analytics,
    "products-ranking": ProductsRanking,
    "analytics": Analytics,
    "customer-feedback": CustomerFeedback,
    "product-variants": ProductVariants,
    "review-rating": ReviewRating,
    "coupon-codes": CouponCodes
  },
  data() {
    return {
      spinnerOn: false,
      view_component_name: "alternate_product_names",
    };
  },
  watch: {
      view_component_name(newVal) {
        this.$session.set("CurrentActiveTabForHelp", newVal)
      }
    },
  mounted(){
    this.$session.set("CurrentActiveTabForHelp", this.view_component_name)
      bus.$on("CurrentActiveTab", (data) => {
        if(data === this.$route.fullPath) {
          return this.view_component_name;
          // bus.$emit("CurrrentActiveTabResponse", this.view_component_name)
        }
      });
    if (this.$route.params.modal_open_switch_tab === true) {
      // this.view_component_name = "user_responses";
      // $("#user_responses-tab").click();
      $("#product_setting-tab").click();
      this.view_component_name = "product_setting";
    }
  }
  // beforeRouteLeave(to, from, next) {
  //   console.log("Leaving route");
  //   const answer = window.confirm(
  //     "Do you really want to leave? you have unsaved changes!"
  //   );
  //   if (answer) {
  //     next();
  //   } else {
  //     next(false);
  //   }
  // },
};
</script>

<style scoped>
</style>