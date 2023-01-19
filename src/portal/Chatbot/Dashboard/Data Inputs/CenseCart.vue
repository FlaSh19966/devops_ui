<template>
  <div
    id="cart-box"
    class="cart-box"
    style="font-family: Helvetica Neue, Helvetica, Arial, sans-serif"
  >
    <div class="cense-cart-header d-flex">
      <p class="bot-font-style" style="margin-top: 10px;">{{tlt('cart_heading')}}</p>
      <button
        type="button"
        @click="cart_close"
        class="close ml-auto"
        style="padding-bottom: 20px"
      >
      <span>&times;</span>
      </button>
    </div>
    <div
      class="cense-cart-body bot-font-style"
      style="text-align: center"
      v-if="cart_items.length == 0"
    >
      {{tlt('cart_empty_msg')}}
    </div>
    <div class="cense-cart-body" v-else>
      <div
        class="col-sm-12 box-item d-flex mt-3"
        v-for="(product, index) in cart_items"
        :key="index"
      >
        <div class="col-sm-3 p-0 product-image mt-2">
          <img :src="product.img_url" alt="" style="width: 65px; height: 65px" />
        </div>
        <div class="col-sm-9 px-0" style="font-size: 14px">
          <div class="product-title-woocommerce" style="margin-bottom: 10px; width: 100% !important;">
            <div class="d-flex">
              <p class="textMaxLine bot-font-style m-0" :title="product.title">{{ product.title }}</p>
              <span class="delete-cart-item" @click="product.order_qty = 0, update_quantity('manual', index, 0)">
                <svg xmlns="http://www.w3.org/2000/svg" width="13.682" height="15.392" viewBox="0 0 13.682 15.392"><path data-v-0f909d54="" d="M8.276,3v.855H4v1.71h.855V16.682a1.71,1.71,0,0,0,1.71,1.71h8.551a1.71,1.71,0,0,0,1.71-1.71V5.565h.855V3.855H13.406V3H8.276M6.565,5.565h8.551V16.682H6.565V5.565m1.71,1.71v7.7h1.71v-7.7H8.276m3.42,0v7.7h1.71v-7.7Z" transform="translate(-4 -3)" fill="#f23d3d"></path></svg>
              </span>
            </div>
          <p class="textMaxLine bot-font-style m-0" :title="product.variant_title">{{ product.variant_title }}</p>
          </div>
          <div class="bot-font-style mb-1" v-if="product.buy_qty === 2 && product.stock_quantity != null" style="color: red">
            {{tlt('max_limit_label')}} {{product.stock_quantity}}</div>      
          <div
            class="col-sm-12 p-0 d-flex"
            style="position: absolute; height: 31px"
          >
            <div class="col-sm-6 p-0 product-qty-cart mb-1">
              <button
                type="button"
                @click="update_quantity('-', index)"
                class="quantity-btn btn minus"
                style="position: relative;}"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style="height: 15px"
                  viewBox="0 0 18 18"
                >
                  <path d="M4 7h8v2H4z"></path>
                </svg>
              </button>
              <input
                type="number"
                min="1"
                class="quantity-btn bot-font-style"
                style="text-align: center; width: 40%; border-right: 0; border-left: 0; padding:0 1px !important"
                v-model.number="product.order_qty"
                @focusout="update_quantity('manual', index, product.order_qty)"
                name="quantity"
                title="Qty"
              />
              <button
                type="button"
                @click="update_quantity('+', index)"
                class="quantity-btn btn plus"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style="height: 14px"
                  viewBox="0 0 18 18"
                >
                  <path d="M12 7H9V4H7v3H4v2h3v3h2V9h3z"></path>
                </svg>
              </button>
            </div>
            <div
              class="col-sm-6 pt-2 pr-0 product-price item-price bot-font-style"
              style="text-align: right; font-weight: bold"
            >
              {{retail_currency}} {{(parseInt(product.price) * product.order_qty).toLocaleString()}}.00
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="cart_items.length != 0" class="cense-cart-footer">
      <div class="cart-total pt-2 d-flex" style="height: 30%; padding-left: 20px; padding-right: 20px;">
        <p class="bot-font-style">{{tlt('subtotal_label')}}</p>
        <p class="bot-font-style ml-auto" style="font-size: 14px">{{retail_currency}} {{cart_total.toLocaleString()}}.00</p>
      </div>
      <p class="bot-font-style mb-0 px-2">{{tlt('discount_code_text')}}</p>
      <div class="" style="text-align: center; padding-top: 9px; padding-left: 20px; padding-right: 20px;">
        <button
          style="width: 100%"
          type="button"
          class="bot-font-style checkout-btn btn"
          @click="push_to_checkout"
        >
          {{tlt('checkout_label')}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CenseCart",
  data() {
    return {
      empty_cart: false,
      cart_items: [],
      cart_total: "",
      over_qty_warning: false
    };
  },
  props: ["addtoCart", "retail_currency", "retail_framework", "shop_url"],
  watch: {
    addtoCart: {
      immediate: true,
      handler(newValue) {
        var total = 0;
        this.cart_items = [];
        for (var i in newValue) {
          this.cart_items.push(newValue[i]);
          //below logic might be changed
          this.cart_items[i].order_qty == 0
            ? (this.cart_items[i].order_qty = 1)
            : this.cart_items[i].order_qty;
          var j = this.cart_items[i].order_qty;
          total = total + j * this.cart_items[i].price;
        }
        this.cart_total = total;
      },
    },
  },
  created() {
    
  },
  mounted() {
    const vm = this;
  },
  methods: {
    push_to_checkout() {
      if(this.retail_framework === "woocommerce") {
        let temp_str = '';
        for (var i in this.cart_items) {
          var p_id = this.cart_items[i].id;
          var customqty = this.cart_items[i].order_qty;
          while (customqty != 0) {
            temp_str += `${p_id},`;
            customqty -= 1;
          }
        }
        window.open(`${this.shop_url}checkout/?add-to-cart=${temp_str}`);
      } else if(this.retail_framework === "shopify") {
        let temp_str = ''
        for (var i in this.cart_items) {
          var p_id = this.cart_items[i].id;
          var customqty = this.cart_items[i].order_qty;
          temp_str += `${p_id}:${customqty},`
        }
        window.open(`https://${this.shop_url}.myshopify.com/cart/${temp_str}`);
      } else if(this.retail_framework === "magento") {
        let temp_str = ''
        for (var i in this.cart_items) {
          var p_id = this.cart_items[i].id;
          var customqty = this.cart_items[i].order_qty;
          while (customqty != 0) {
              if ((this.cart_items.length - 1) == i && customqty == 1){
                temp_str += `${p_id}`;
              }else{
                temp_str += `${p_id},`;
              }
              customqty -= 1;
            }
        }
        window.open(`${this.shop_url}censeaiinccense/index/save/s_id/${temp_str}`);
      } else if(this.retail_framework === "bigcommerce") {
        // let temp_str = ''
        // for(var i in this.cart_items){
        // add product id 123
          // var temp = this.shop_url + '/cart.php?action=add&sku=' + this.cart_items[i].sku;
          // console.log(temp);
          // $.get(`${this.shop_url}/cart.php?action=add&sku=` + this.cart_items[i].sku, function(data, status){
          //   console.log(data,status);
          // });
          // return $.get("/cart.php?action=add&product_id=" + this.cart_items[i].id)
          // .done(function(data, status, xhr) {
          //   console.log('first item complete with status ' + status);
          // })
          // .then(function() {
          //   // add product id 456
          //   return $.get("/cart.php?action=add&product_id=" + this.cart_items[i].id);
          // })
          // .done(function(data, status, xhr) {
          //   console.log('second item complete with status ' + status);
          // })
          // // chain more async GET requests using .then & .done
          // .fail(function(xhr, status, error) {
          //   console.log('oh noes, error with status ' + status + ' and error: ');
          //   console.error(error);
          //   return xhr.done();
          // })
          // .always(function() {
          //   // go to cart
          //   return window.location = "/cart.php";
          // });
        // }
        // return window.location = "/cart.php";
      }
    },
    update_quantity(func, index, value) {
      if (func == "+") {     
        if (this.cart_items[index].stock_quantity > this.cart_items[index].order_qty){
          this.cart_items[index].buy_qty = 1
          this.cart_items[index].order_qty += 1;
        }
        else if(this.cart_items[index].stock_quantity == null || (this.cart_items[index].stock_quantity === 0 && this.cart_items[index].stock_status === 'instock')){
          this.cart_items[index].order_qty += 1;
        }else {
          this.cart_items[index].buy_qty = 2;
        }
      
      }
      if (func == "-") {
        this.cart_items[index].buy_qty = 1;
        if (this.cart_items[index].order_qty > 0) {
          if ((this.cart_items[index].order_qty > this.cart_items[index].stock_quantity) && this.cart_items[index].stock_quantity != null &&
            (this.cart_items[index].stock_quantity !== 0 && this.cart_items[index].stock_status === 'instock') ){
            this.cart_items[index].order_qty = 1;
          }else{
            this.cart_items[index].order_qty -= 1;
          }
          if (this.cart_items[index].order_qty == 0) {
            this.cart_items.splice(index, 1);
          }
        } else {
          this.cart_items.splice(index, 1);
        }      
      }
      if (func == "manual") {
        var quantity = Math.abs(parseInt(value));
        this.cart_items[index].buy_qty = 1;
        if (quantity){
          if (
            this.cart_items[index].stock_quantity >= quantity || (this.cart_items[index].stock_quantity === 0 && this.cart_items[index].stock_status === 'instock')
            ){
            this.cart_items[index].order_qty = quantity;
          }
          else if(this.cart_items[index].stock_quantity == null){
            this.cart_items[index].order_qty = quantity;
          }
          else{
            this.cart_items[index].buy_qty = 2;
            this.cart_items[index].order_qty = this.cart_items[index].stock_quantity;
          }
        }
      }
      for (var i in this.cart_items) {
        if (this.cart_items[i].order_qty == 0) {
          this.cart_items.splice(i, 1);
        }
      }
      if(!this.over_qty_warning){
        var total = 0;
        for (var i in this.cart_items) {
          var j = this.cart_items[i].order_qty;
          total = total + j * this.cart_items[i].price;
        }
        this.cart_total = total;
        this.cart_communication();
      }
    },
    cart_close() {
      this.$emit("close_cart", false);
    },
    cart_communication() {
      this.$emit("cart_data", this.cart_items);
    },
  },
};
</script>

<style scoped>
.delete-cart-item {
  margin-left: auto !important;
  cursor: pointer;
}
.delete-cart-item svg :hover {
  color: #f23d3d !important;
  fill: #f23d3d !important;
}
.product-title-woocommerce {
  display: inline-block;
  box-sizing: border-box;
  white-space: pre-line;
  word-wrap: break-word;
}
.product-title-woocommerce .textMaxLine {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.close {
  font: 400 35px Arial;
  cursor:pointer !important
}
.close:hover {
  transform: scale(1.2);
  color: #4c4c4c !important;
}
.checkout-btn {
  background-color: var(--bot-button-background);
  cursor: pointer !important;
  border-color: var(--bot-button-border) !important;
  /* color: #fff; */
  color: var(--bot-font-color-buttons) !important;
}
.checkout-btn:disabled {
  background-color: var(--bot-button-background);
  letter-spacing: 0.3px;
  font-size: 16px;
  border: 0;
  opacity: 1;
}
.checkout-btn:hover {
  background-color: var(--bot-button-background);
  border-color: var(--bot-button-border) !important;
}
.plus {
  border-radius: 0px 3px 3px 0px;
  border: 1px solid #767676;
  border-left: 0px;
}
.minus {
  border-radius: 3px 0px 0px 3px;
  border: 1px solid #767676;
  border-right: 0px;
}
.plus,
.minus {
  width: 25%;
  background-color: #ffffff;
  cursor: pointer;
  padding: 0;
}
.product-qty-cart{
  display: inline-flex !important;
}
.quantity-btn {
  height: 100%;
  font-size: 18px;
  border: 1px solid #767676;
  vertical-align: bottom;
  box-shadow: none;
}
.quantity-btn:focus {
  outline: -webkit-focus-ring-color auto 1px;
  box-shadow: none;
}
.cense-cart-header {
  height: 10%;
  padding: 10px 17px;
  font-size: 18px;
  color: #767676;
  font-weight: normal;
}
.cense-cart-body {
  font-size: 14px;
  line-height: 1.2;
  padding: 15px;
  color: #4c4c4c;
  font-weight: normal;
  min-height: 0%;
  height: 70%;
  overflow-x: auto;
}
.cense-cart-footer {
  min-height: 20%;
  height: 20%;
  font-size: 11px;
  color: #4c4c4c;
  justify-content: space-between;
  text-align: center;
}
.cart-box {
  top: 0;
  width: 76%;
  margin-left: 24%;
  height: 100%;
  background-color: #fff;
  border-radius: 5px;
  -webkit-box-shadow: -5px 0 5px rgba(0, 0, 0, 0.1);
  box-shadow: -5px 0 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  position: absolute;
  z-index: 2147483647;
  display: block !important;
}
.box-item {
  width: 100%;
  height: 100px;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 3px;
  padding: 0 0.5em;
  margin-top: 0.3em;
  -webkit-animation: 200ms flipIn forwards;
  animation: 200ms flipIn forwards;
}
@keyframes flipIn {
  from {     
    -webkit-transform: rotatex(90deg) translatey(-50%);
    transform: rotatex(90deg) translatey(-50%);
    margin-bottom: -65px;
    opacity: 0; 
  }
  to {     
    -webkit-transform: none;
    transform: none;
    opacity: 1; }
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>