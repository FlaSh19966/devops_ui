<template>
  <div :style="cssProps">
    <div
      class="card-header d-block d-sm-flex flex-wrap justify-content-between"
    ></div>
    <div
      :class="{
        'card-body d-block d-flex': $route.name != 'Direct Response Bot',
        'card-body': $route.name == 'Direct Response Bot',
      }"
    >
      <div style="width: 25%" v-if="isTextToBot && !isPreviewBot && !isDialogBot">
        {{tlt('bot_response_text')}}
      </div>
      <div class="chat-master ml-auto" id="app">
        <div
          class="chat-wrap"
          :style="chat_bot_background_image"
          style="margin: 0 auto; z-index: 0; min-width: 450px"
        >
          <div class="chat-head">
            <div
              class="media"
            >
              <img
                :src="chat_widget.logo"
                :style="chat_widget.style"
                class="rounded"
                alt="..."
                style="max-width: 100%"
              />
            </div>
          </div>
          <div
            style="position: absolute; z-index: 1000; top: 80%; left: 93%;cursor:pointer"
            class="bounce"
            @click="animate_chat_body_scroll(1, 50)"
          >
            <img src="/img/down-arrow.png" v-if="to_scroll" />
          </div>
          <div
            id="portal_chat_body_id"
            class="chat-body"
            @scroll="scroll_down"
          >
            <div v-if="live_chat_on" class="live-agent-window fadeInDown">
              <div class="d-flex">
                <img src="@/portal/assets/img/user-blue.png" alt="">
                <span class="bot-font-style" v-if="support_agent_info" style="margin-top: 14px;">Agent {{support_agent_info.first_name}} is online</span>
                <span class="bot-font-style" v-else style="margin-top: 14px;">Connecting to our Support Agent ...</span>
              </div>
            </div>
            <div
              class="chat-inner"
              v-for="(single, item) in chat"
              :key="item"
              :id="'chat' + item"
            >
              <div class="typewriter" v-if="single.popup != null">
                <span
                  class="chat"
                  style="
                    color: black;
                    font-size: 14px;
                    font-weight: bold;
                    border: 0px;
                  "
                  v-html="popup_msg"
                ></span>
              </div>
              <div
                class="chat-row receiver"
                v-if="Boolean(single.url) && single.receiving == false"
              >
                <span class="chat" style="width: max-content">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#273679"
                      d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"
                    />
                    <path d="M0 0h24v24H0z" fill="none" />
                  </svg>
                  <a
                    href="#"
                    @click="download_file(single.url, single.file_name)"
                    target="_blank"
                  >
                    <span>
                      {{ single.file_name }}
                      &nbsp;
                    </span>
                    <i class="fa fa-download" aria-hidden="true"></i>
                  </a>
                </span>
              </div>
              <div
                v-if="single.is_leaf_note == 'leaf'"
                style="float: right; margin-bottom: 10px; margin-left: 30px"
                class="chat-row prompt"
              >
                <span
                  class="chat"
                  style="
                    background: #273679;
                    font-size: 14px;
                    word-break: break-word;
                  "
                  >{{ single.bot_response }}</span
                >
              </div>
              <div v-if="single.flavor_text != null">
                <span>{{ single.flavor_text }}</span>
              </div>

              <div class="chat-row prompt-title" v-if="single.title != null">
                <div class="chat">{{ single.title }}</div>
              </div>
              <template v-if="single.is_leaf_note == false">
                <div
                  class="chat-row prompt"
                  @click="click_prompt(prompt)"
                  v-for="(prompt, index) in single.bot_response"
                  :key="index"
                >
                  <div
                    @click="show_popup"
                    style="cursor: pointer"
                    :value="single.level"
                    class="chat"
                  >
                    {{ prompt }}
                  </div>
                </div>
              </template>
              <template v-if="single.is_leaf_note == true">
                <video-viewer
                  :responses="single.bot_response"
                  :show="show"
                  :demourlbind="demourlbind"
                  :demourl="demourl"
                  :reviewsurlbind="reviewsurlbind"
                  :reviewsurl="reviewsurl"
                  @sub_leaf_node_call="sub_leaf_node_call"
                ></video-viewer>
              </template>
              <div
                class="buy-products d-flex"
                style="overflow: auto hidden"
                @mousewheel="scroll_div"
                v-if="single.isproduct"
              >
                <div
                  class="image-container"
                  v-for="(product, index) in single.elements.products"
                  :key="index"
                >
                  <img :src="product['Product Image Url']" class="image-box" />
                  <p>{{ product["Product Name"] }}</p>
                  <p>{{ product["UnitPrice"] }}</p>
                  <p
                    class="buy-now"
                    @click="
                      generate_payment(
                        product['UnitPrice'],
                        product['Product Name']
                      )
                    "
                  >
                    Buy Now
                  </p>
                </div>
              </div>
              <div
                :class="Boolean(single.products_list.length > 1)?'d-flex':''"
                v-if="single.new_products && show_custom_cart"
              >
                <button 
                  class="btn mr-2 product_scroll_btn"
                  style="border-radius:35px 0px 0px 35px !important"
                  @click="scroll_div_left(item)"
                  v-if="Boolean(single.products_list.length > 1)"
                >
                  <span class="product_scroll_btn_icon">
                    <svg 
                      style="height: 22px !important;width: 22px !important;"
                      xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                    </svg>
                  </span>
                </button>
                <div
                  class="buy-products d-flex"
                  :id="'buy_product_id_' + item"
                  style="overflow: auto hidden; height: auto;"
                  @mousewheel="scroll_div1(item)"
                >
                  <div
                    class="image-container-woocommerce"
                    v-for="(product, index) in single.products_list"
                    :key="index"
                    :style="Boolean(single.products_list.length > 1)? '':'margin-left:8% !important'"
                  > <a :href="product.permalink" target="_blank">
                    <img v-if="product.img_url != null" :src="product.img_url" class="image-box-woocommerce" alt="Product Image" />
                    <img v-else src="/img/blank_product_img.png" class="image-box-woocommerce" alt="Product Image" />
                    </a>
                    <div class="product-title-woocommerce">
                    <p class="textMaxLine bot-font-style m-0" :title="product.title">{{ product.title }}
                    </p>
                    <p class="product-variant-title bot-font-style" v-if="product.variant_title" :title="product.variant_title">{{ product.variant_title }}</p>
                    </div>
                    <div class="d-flex" style="justify-content: center;">
                    <p class="product-price-woocommerce bot-font-style">{{retail_shop_currency}} {{parseInt(product.price).toLocaleString()}}.00</p>
                    <p v-if="product.price != product.regular_price && (product.regular_price != '' && product.regular_price != null)" class="product-price-woocommerce bot-font-style"
                      style="font-size: 10px;
                            text-decoration: line-through;
                            padding-left: 5px;
                            padding-top: 2px;
                            opacity: 1;">
                      {{retail_shop_currency}} {{parseInt(product.regular_price).toLocaleString()}}.00</p>
                    </div>
                    <div class="bot-font-style" v-if="product.order_qty === 2  && product.stock_quantity != null" style="color: red; font-size: 12px;">
                      Maximum limit {{available_qty(product.stock_quantity, product.id)}}
                    </div>
                    <div v-if="Boolean(custom_product_button_key.length)" class="product-variation" style="position: relative;" >
                      <div v-for="(product_button, index) in custom_product_button_key"
                        :key="index">
                        <select class="select-product-variation bot-font-style" 
                          v-model="product.variant_title" 
                          @change="update_variation(item, index, product.variant_title)"
                          :disabled="product_button.on_value == product[product_button.on_key]"
                          :style="product_button.on_value == product[product_button.on_key] ? 'background: #dddddd; cursor: not-allowed;' : ''"
                        >
                          <option v-for="(variation, var_index) in product.variations"
                          :key="var_index"
                          :value="variation.variant_title">{{variation.variant_title}}</option>
                        </select>
                        <svg class="select-icon" data-element="option.selectIcon" viewBox="0 0 24 24"><path d="M21 5.176l-9.086 9.353L3 5.176.686 7.647 12 19.382 23.314 7.647 21 5.176z"></path></svg>
                      </div>
                    </div>
                    <div v-else class="product-variation" style="position: relative;" >
                      <select class="select-product-variation bot-font-style" 
                        v-model="product.variant_title" 
                        @change="update_variation(item, index, product.variant_title)" 
                        :disabled="!product.variations || product.variations.length <= 1"
                        :style="!product.variations || product.variations.length <= 1 ? 'background: #dddddd; cursor: not-allowed;' : ''"
                      >
                        <option v-for="(variation, var_index) in product.variations"
                        :key="var_index"
                        :value="variation.variant_title">{{variation.variant_title}}</option>
                      </select>
                      <svg class="select-icon" data-element="option.selectIcon" viewBox="0 0 24 24"><path d="M21 5.176l-9.086 9.353L3 5.176.686 7.647 12 19.382 23.314 7.647 21 5.176z"></path></svg>
                    </div>
                    <div v-if="Boolean(custom_product_button_key.length)">
                      <div class="product-qty" v-for="(product_button, index) in custom_product_button_key"
                        :key="index">
                        <button
                          type="button"
                          class="quantity-btn minus"
                          :disabled="product_button.on_value == product[product_button.on_key]"
                          :style="product_button.on_value == product[product_button.on_key] ? 'background: #dddddd; cursor: not-allowed;' : ''"
                          @click="update_quantity('-', item, index,product)"
                        >
                        <span>-</span>
                        </button>
                        <input
                          type="number"
                          min="1"
                          class="bot-font-style quantity-btn"
                          style="
                            text-align: center; 
                            width: 45px; 
                            border-right: 0; 
                            border-left: 0;
                            background-color: #ffffff;"
                          v-model.number="product.buy_qty"
                          :style="product_button.on_value == product[product_button.on_key] ? 'background: #dddddd; cursor: not-allowed;' : ''"
                          @focusout="update_quantity('manual', item, index, product)"
                          :disabled="product_button.on_value == product[product_button.on_key]"
                          name="quantity"
                          title="Qty"
                        />
                        <button
                          type="button"
                          class="quantity-btn plus"
                          @click="update_quantity('+', item, index,product)"
                          :disabled="product_button.on_value == product[product_button.on_key]"
                          :style="product_button.on_value == product[product_button.on_key] ? 'background: #dddddd; cursor: not-allowed;' : ''"
                        >
                        <span>+</span>
                        </button>
                      </div>
                    </div>
                    <div v-else class="product-qty">
                      <button
                        type="button"
                        class="quantity-btn minus"
                        @click="update_quantity('-', item, index,product)"
                      >
                      <span>-</span>
                      </button>
                      <input
                        type="number"
                        min="1"
                        class="bot-font-style quantity-btn"
                        style="
                          text-align: center; 
                          width: 45px; 
                          border-right: 0; 
                          border-left: 0;
                          background-color: #ffffff;"
                        v-model.number="product.buy_qty"
                        @focusout="update_quantity('manual', item, index, product)"
                        name="quantity"
                        title="Qty"
                      />
                      <button
                        type="button"
                        class="quantity-btn plus"
                        @click="update_quantity('+', item, index,product)"
                      >
                      <span>+</span>
                      </button>
                    </div>
                    <div v-if="Boolean(custom_product_button_key.length)">
                      <div v-for="(product_button, index) in custom_product_button_key"
                        :key="index">
                        <a v-if="product_button.function == 'permalink' && product_button.on_value == product[product_button.on_key]" 
                          :href="product.permalink" target="_blank">
                        <button 
                          class="btn add-to-cart"
                          style="
                            font-size: 13px;
                            width: 100% !important;"
                        >
                          {{product_button.name}}
                        </button>
                        </a>
                        <button 
                          class="btn add-to-cart"
                          v-else-if="product.stock_status != 'outofstock'"
                          style="
                            font-size: 13px;
                            width: 100% !important;"
                          @click="
                            addproduct(product)
                          "
                        >
                          ADD TO CART
                        </button>
                        <button
                          v-else
                          class="btn add-to-cart"
                          style="
                            font-size: 13px;
                            cursor: not-allowed;
                            width: 100% !important;"
                          disabled
                        >
                          OUT OF STOCK
                        </button>
                      </div>
                    </div>
                    <button
                      class="btn add-to-cart"
                      id="addtocart"
                      v-else-if="product.stock_status != 'outofstock'"
                      style="font-size: 13px;"
                      @click="
                        addproduct(product)
                      "
                    >
                      ADD TO CART
                    </button>
                    <button
                      v-else
                      class="btn add-to-cart"
                      style="font-size: 13px;
                      cursor: not-allowed;"
                      disabled
                    >
                      OUT OF STOCK
                    </button>
                  </div>
                </div>
                <button 
                  style="border-radius:0px 35px 35px 0px !important;"
                  class="btn ml-2 product_scroll_btn"
                  @click="scroll_div_right(item)"
                  v-if="Boolean(single.products_list.length > 1)"
                >
                  <span class="product_scroll_btn_icon">
                    <svg 
                      style="height: 22px !important;width: 22px !important;"
                      xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </span>
                </button>
              </div>
              <div
                class="buy-products d-flex"
                style="overflow: auto hidden; height: auto"
                @mousewheel="scroll_div"
                v-else-if="Boolean(single.is_products_list)"
                id="products_list_div"
              >
                <div
                  :id="`product_${product_item.id}_`+item"
                  v-for="(product_item, index) in single.products_list"
                  :key="index"
                  class="m-3"
                  style="min-width: 200px"
                ></div>
              </div>
              <div class="chat-row receiver" v-if="single.product_out_of_stock">
                <div class="d-flex" style="position: relative;">
                    <div class="bot-img" :style="bot_img_icon"></div>
                    <div
                      class="chat bot-font-receiver"
                    >
                    Some products you searched for are out of stock, if you want to be notified via email when they are back in stock,
                  <a
                href="#"
                style="cursor: pointer;"
                @click="add_to_out_of_stock_list(single.product_out_of_stock_list)"
                data-toggle="modal"
                data-target="#notifyemail"
              >
                click here
              </a>            
                    </div>
                  </div>
              </div>
              <div class="chat-row receiver" v-if="single.show_banner_img_url">
                <div class="d-flex" style="position: relative;">
                  <div v-if="single.show_bot_img" class="bot-img" :style="bot_img_icon"></div>
                  <br />
                  <a 
                    style="width: -webkit-fill-available !important;" 
                    :href="single.banner_img_link ? single.banner_img_link: 'javascript:void(0);'"
                    :target="single.banner_img_link ? '_blank' : ''"
                  >
                    <img
                      :src="single.banner_img_url"
                      :class="(Boolean(single.show_bot_img) == true)?'banner_img_url_id':'banner_img_url_only_id'"
                    />
                  </a>
                </div>
                  <div class="chat-his" v-if="single.time != null">
                  <span class="time" style="color: #000">{{ single.time }}</span>
                </div>
              </div>
              <div class="chat-row receiver" v-if="single.show_banner_description">
                <div class="d-flex" style="position: relative">
                  <div v-if="single.show_bot_img" class="bot-img" :style="bot_img_icon"></div>
                  <div
                    class="chat bot-font-receiver"
                    :style="(Boolean(single.show_bot_img) == true) ? '' : 'margin-left: 8% !important;'"
                    v-html="single.banner_description"
                  >
                    {{ single.banner_description }}
                  </div>
                </div>
                  <div class="chat-his" v-if="single.time != null">
                  <span class="time" style="color: #000">{{ single.time }}</span>
                </div>
              </div>
              <div class="chat-row receiver" v-if="single.show_banner_video_url">
                <div class="d-flex" style="position: relative;">
                  <div v-if="single.show_bot_img" class="bot-img" :style="bot_img_icon"></div>
                  <br />
                  <div
                    class="plyr__video-embed"
                    id="player"
                  >
                    <iframe
                      :src="single.banner_video_url"
                      allowfullscreen
                      allowtransparency
                      allow="autoplay"
                      :class="(Boolean(single.show_bot_img) == true )?'banner_video_url_id':'banner_video_url_only_id'"
                    ></iframe>
                  </div>
                </div>
                  <div class="chat-his" v-if="single.time != null">
                  <span class="time" style="color: #000">{{ single.time }}</span>
                </div>
              </div>
              <div class="chat-row receiver" v-if="single.is_review_rating_product">
                <div class="d-flex" style="position: relative">
                  <div class="bot-img" :style="bot_img_icon"></div>
                  <div 
                    class="p-3 my-3 chat"
                  >
                    <div class="col-sm-12 d-flex p-0">
                      <div class="col-sm-8 p-0">
                        <div class="bot-font-receiver" style="width: 100% !important;">
                          <label style="text-align: justify !important;" ><strong><b> {{single.not_reviewed_product_details.name}}</b></strong></label>
                          <div
                            style="
                              width: 100% !important;
                              text-align: justify !important;"
                          >
                            {{single.review_message_first}}
                          </div>
                          <div
                            style="
                              width: 100% !important;
                              text-align: justify !important;"
                          >
                            {{single.review_message_second}}
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-4 pl-2 pr-0">
                        <div style="text-align: end !important;contain: content !important;">
                          <img :src="single.product_review_img_url" class="img-fluid" />
                        </div>
                      </div>
                    </div>
                    <div class="card p-3 my-2">
                      <div 
                        class="card-body p-0 bot-font-receiver" 
                        style="min-height: 10vh !important;"
                      >
                        <form @submit.prevent="submit_review_rating(item)">
                          <div class="d-flex flex-wrap">
                            <label class="mr-4 my-auto"><strong><b>Rating:</b></strong></label>
                            <star-rating 
                              v-model="single.product_rating"
                              v-bind:star-size="17"
                              :showRating= false
                            >
                            </star-rating>
                          </div>
                          <br/>
                          <label><strong><b>Review:</b></strong></label>
                          <textarea
                            required
                            rows="3"
                            v-model.trim="single.product_review"
                            class="form-control" 
                            type="text"
                            style="border: 1px solid #ced4da;
                              border-radius: .25rem; fon-size: 16px;
                              padding: 5px !important; resize: none !important"
                          />
                          <hr>
                          <div class="card-act btn-wrap d-block d-flex flex-wrap buttons-parent buttons-alignment mt-1">
                            <button 
                              class="btn custom-buttons mt-3"
                              style="text-align: center !important;"  
                              type="submit"
                            >
                            <strong>Submit Your Review</strong> 
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="chat-his" v-if="single.time != null">
                  <span class="time" style="color: #000">{{ single.time }}</span>
                </div>
              </div>
              <div class="chat-row receiver" v-if="single.show_messaging_platforms">
                <div v-if="single.show_messaging_platforms" class="d-flex" style="justify-content: center">
                  <div  class="px-2" v-for="(plt,plt_index) in single.messaging_platforms_data" :key="plt_index">
                    <div v-if="Boolean(plt.TELEGRAM) === true">
                      <span @click="open_messaging_framework_integration(plt.TELEGRAM)">
                      <img :src="require('@/portal/assets/img/Webp.net-resizeimage_5.png')" alt="Telegram" class="image-box-msg-frmw" style="cursor:pointer;background: inherit;">
                      </span>
                    </div>
                    <div v-if="Boolean(plt.WHATSAPP) === true">
                      <span @click="open_messaging_framework_integration(plt.WHATSAPP)">
                      <img :src="require('@/portal/assets/img/whatsapp-logo-png-2290.png')" alt="WhatsApp" class="image-box-msg-frmw" style="cursor:pointer;background: inherit;">
                      </span>
                    </div>
                    <div v-if="Boolean(plt.FACEBOOK) === true">
                      <span @click="open_messaging_framework_integration(plt.FACEBOOK)">
                      <img :src="require('@/portal/assets/img/logo-256.png')" alt="Facebook" class="image-box-msg-frmw" style="cursor:pointer;background: inherit;">
                      </span>
                    </div>
                    <div v-if="Boolean(plt.INSTAGRAM) === true">
                      <span @click="open_messaging_framework_integration(plt.INSTAGRAM)">
                      <img :src="require('@/portal/assets/img/instagram_bot_logo.png')" alt="Instagram" class="image-box-msg-frmw" style="cursor:pointer;background: inherit;">
                      </span>
                    </div>
                  </div>
                </div>
                <div class="chat-his" v-if="single.time != null">
                  <span class="time" style="color: #000">{{ single.time }}</span>
                </div>
              </div>
              <div
                v-if="single.carousel_card_list"
                :id="'carousel_card' + item"
                class="carousel_card" data-ride="carousel"
                style="position: relative !important;"
              >
                <div :class="Boolean(single.carousel_card_list.length>1)?'d-flex':''"
                  :style="Boolean(single.carousel_card_list.length===1)? 'width:66%':''"
                >
                  <a class="carousel_scroll_btn1 ml-1" @click="scroll_card_left(item)" type="button"
                    v-if="single.carousel_card_list.length > 1"
                    :id="'carousel_scroll_btn1_' + item"
                    style="display: none;"
                  >
                    <svg 
                        style="transform: rotateY(180deg) !important"
                        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right product_scroll_btn_icon1" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </a>
                  <div 
                    :id="'carousel_cards_id_'+item"
                    style="overflow:hidden;" class="cards_carsol d-flex"
                  > 
                    <div 
                    v-for="(carousel, index) in single.carousel_card_list"
                    :key="index"
                    class="carousel_cards"
                    >
                      <div class="carousel_card_single">
                        <div v-if="carousel.image">
                          <img :src =carousel.image  alt="carousel Image">
                        </div>
                        <div v-if="carousel.video">
                            <iframe
                              :src="carousel.video"
                              allowfullscreen
                              allowtransparency
                              allow="autoplay"
                            ></iframe>
                        </div>
                        <div class="carousel_card_single_content">
                          <h4 v-if="carousel.title">{{carousel.title}}</h4>
                          <div class="carousel_card_single_para">
                            <div v-if="carousel.text">
                              <p>{{carousel.text}}</p>
                            </div>
                          </div>
                          <div>
                            <div v-for="(bttn,indx) in carousel.buttons" :key="indx" class="carousel_card_button">
                              <div v-if="Boolean(bttn.title) && Boolean(bttn.value)">
                                <a
                                  type="button"
                                  @click="custom_button_click(bttn, item)"
                                  :disabled="input_disabled"
                                  :key="index"
                                >
                                  {{bttn.title}}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>  
                    </div>
                  </div>
                  <a class="carousel_scroll_btn2 ml-1" @click="scroll_card_right(item)" type="button"
                    v-if="single.carousel_card_list.length > 1"
                    :id="'carousel_scroll_btn2_' + item"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right product_scroll_btn_icon1" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                  </a>
                </div>
              </div>
              <template v-if="single.conversation_only">
                <div
                  v-if="single.sending"
                  class="chat-row sender"
                >
                  <div class="chat bot-font-sender">{{ single.sent }}
                    <!-- <div class="chat-his" v-if="single.time != null">
                      <span class="time" style="color: #000">{{
                        single.time
                      }}</span>
                    <span class="del-note delivered">Sent</span>
                  </div> -->
                  </div>
                </div>
                <div
                  v-if="single.receiving"
                  class="chat-row receiver"
                  :class="{ 'pr-0': single.fetch_shopify_details }"
                >
                  <div class="d-flex" style="position: relative;">
                    <div v-if="!(Boolean(single.received) == false &&
                        (Boolean(single.image) == true ||
                        Boolean(single.custom_buttons) == true ||
                        Boolean(single.videos) == true))"
                        class="bot-img" :style="bot_img_icon">
                    </div>
                    <div
                      v-if="Boolean(single.received) == true"
                      class="chat bot-font-receiver"
                    >
                      <div v-html="single.received"></div>
                      <div class="chat-his" v-if="single.time != null">
                          <span class="time">{{ single.time }}</span>
                      </div>
                    </div>
                  </div>
                  <template
                    v-if="
                      single.fetch_shopify_details &&
                      !retail_is_token_valid(item, single.is_refund)
                    "
                  >
                    <form
                      id="shopify_login_form"
                      enctype="multipart/form-data"
                      @submit.prevent="
                        retail_create_customer_token(item, single.is_refund)
                      "
                      v-if="retail_order_retreival_only_email_required || (retail_web_framework != 'shopify' && retail_web_framework != 'woocommerce' 
                      && retail_web_framework != 'magento' && retail_web_framework != 'bigcommerce')"
                    >
                      <div class="form-group">
                        <input
                          :placeholder="retail_order_retreival_only_email_required ? 'Enter your Email or Phone number' : 'Enter your Email'" 
                          name="email"
                          class="form-control"
                          id="email"
                          v-model="single.customer_email_id"
                          required
                          type="text"
                          @focus="retail_form_focus(item)"
                        />
                      </div>
                      <div class="form-group" v-if="!retail_order_retreival_only_email_required">
                        <input
                          placeholder="Enter your Password"
                          name="password"
                          class="form-control"
                          id="password"
                          v-model="single.customer_password"
                          required
                          type="password"
                          @focus="retail_form_focus(item)"
                        />
                      </div>
                      <button type="submit" class="btn btn-primary dynamic-button">
                        {{shopify_login_button_text}}
                      </button>
                    </form>
                    <div v-else class="bot-font-receiver">
                      {{change_chat_text_to_login_redirect(item)}}
                    </div>
                  </template>
                  <div
                    v-if="single.refund_orders_list"
                    style="
                      background: #ffffff;
                      text-align: center;
                      margin: 10px 0px;
                      padding: 10px;
                    "
                  >
                    <div
                      v-if="!single.refund_order_view_details.line_items"
                      style="display: grid"
                    >
                    <div>

                    </div>
                    <div
                        class="d-flex bot-font-receiver"
                      >
                        <p style="font-weight:600; margin: 0;"
                          >Order#</p>
                        <p style="font-weight:600; margin: 0;">Order Date</p>
                        <p style="font-weight:600; margin: 0;">Order Status</p>
                        <p
                          v-if="retail_web_framework != 'shopify'" 
                          style="font-weight:600; margin: 0;">Notes</p>
                      </div>
                      <div
                        v-for="(order, orderIndex) in single.refund_orders_list"
                        :key="orderIndex"
                        class="d-flex bot-font-receiver"
                      >
                        <a
                          class="bot-font-receiver"
                          href="javascript:void(0)"
                          @click="
                            view_order_details(
                              item,
                              orderIndex,
                              order.line_items,
                              order.refunds,
                            )
                          "
                          >{{ order.name }}</a
                        >
                        <a
                          class="bot-font-receiver"
                          href="javascript:void(0)"
                          @click="
                            view_order_details(
                              item,
                              orderIndex,
                              order.line_items,
                              order.refunds,
                            )
                          "
                          >{{ order.created_at }}</a>
                        <!-- <a 
                          href="javascript:void(0)"
                          @click="
                            view_order_details(
                              item,
                              orderIndex,
                              order.line_items,
                              order.refunds,
                            )
                          "
                        >{{ order.processed_date }}</a> -->
                        <a
                          class="bot-font-receiver"
                          href="javascript:void(0)"
                          @click="
                            view_order_details(
                              item,
                              orderIndex,
                              order.line_items,
                              order.refunds,
                            )
                          "
                        >{{ order.fulfillment_status }}</a>
                        <a
                          class="bot-font-receiver"
                          v-if="retail_web_framework != 'shopify'" 
                          href="#"
                          @click="order_notes_data = order.order_notes; selected_order_name = order.name"
                          data-toggle="modal"
                          data-target="#ordernotesmodel"
                          title="View Notes"
                        >View Notes</a>
                      </div>
                    </div>
                    <div v-else-if="single.refund_order_view_details.line_items">
                      <div class="mb-3 text-left">
                        <a
                          href="javascript:void(0)"
                          @click="refresh_or_remove_order_details(item, 'remove')"
                          >&lt;&lt; Back to Orders</a
                        >
                        <a href="javascript:void(0)" class="ml-2">{{
                          single.refund_order_view_details.name
                        }}</a>
                      </div>
                      <div>
                        <p class="bot-font-receiver w-auto text-left">
                          To Return, follow these steps: 
                          <ol>
                            <li>
                              Select the checkbox for the items to be returned
                            </li>
                            <li>
                              Update the quantity
                            </li>
                            <li>
                              Click on Proceed button
                            </li>
                          </ol>
                        </p>
                      </div>
                      <div
                        v-for="(
                          lineItem, lineItemIndex
                        ) in single.refund_order_view_details.line_items"
                        :key="lineItemIndex"
                        class="mb-0"
                      >
                        <div class="col-sm-12 bot-font-receiver p-0 px-2" style="display: inline-flex !important;">
                          <div class="col-sm-1 p-0 pl-2">
                            <input
                              :title="((lineItem.qty_available_for_refund) <= 0) ?'No product quantity available for refund':null"
                              type="checkbox"
                              v-model="single.refund_selected_items"
                              :value="retail_web_framework == 'magento' ? lineItem.product_id : lineItem.id"
                              :style="((lineItem.qty_available_for_refund) <= 0) ?'cursor: not-allowed !important':null"
                              style="margin-left: 2%; margin-top: 1%;"
                              :disabled="(lineItem.qty_available_for_refund) <= 0"
                            />
                          </div>
                          <div class="col-sm-5 p-0 pl-2">
                            <p style="width: 100% !important;text-align: center !important;">
                              {{ lineItem.name }}
                            </p>
                          </div>
                          <div class="col-sm-3 p-0 pl-2" style="flex: content !important;">
                            <p style="width: 100% !important; text-align: center !important;">
                              {{ single.refund_order_view_details.presentment_currency }}
                              {{ lineItem.price }}
                            </p>
                          </div>
                          <div class="col-sm-3 p-0 pl-2" style="flex: content !important;">
                            <div class="">
                              <template>
                                <div class="input-group margin-bottom">
                                  <vue-numeric-input
                                    :title="((lineItem.qty_available_for_refund) <= 0) ?'No product quantity available for refund':null"
                                    id="return_increment_numeric_input"
                                    style="width: fit-content !important;"  
                                    v-model.number="lineItem.selected_quantity" 
                                    :min="1"  
                                    :max="lineItem.qty_available_for_refund" 
                                    :step="1"
                                    controls-type="updown"
                                    :disabled="(lineItem.qty_available_for_refund) <= 0"
                                    :style="((lineItem.qty_available_for_refund) <= 0) ?'cursor: not-allowed !important':null"
                                  >
                                    <span class="input-group-addon addon-inline input-source-observer">days</span>
                                  </vue-numeric-input>
                                </div>
                              </template>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-12 p-0 px-2 d-flex"> 
                        <div class="col-sm-5 p-0 bot-font-receiver">
                          <label class="bot-font-receiver text-left">
                            Reason for Return*
                            <br>
                          <sup v-if="show_shopify_reason_for_refund_error" style="color:red;top: -.25em !important;">
                            ( This cannot be empty!! )
                          </sup>
                          </label>
                        </div>
                        <div class="col-sm-7 p-0">
                          <div class="form-group bot-font-receiver">
                            <multiselect
                              v-model="single.shopify_reason_for_refund_list"
                              id="shopify_reason_for_refund_id"
                              :options="shopify_reason_for_refund_option"
                              :searchable="true"
                              :close-on-select="true"
                              :show-labels="false"
                              @input="refresh_or_remove_order_details(item)"
                              placeholder="Select Reason"
                              :max-height="100"
                            >
                            </multiselect>
                          </div>
                          <div class="bot-font-receiver" v-if="single.shopify_reason_for_refund_list === 'Others'">
                            <textarea
                              class="form-control"
                              style="border: 1px solid #ced4da;
                              border-radius: .25rem; fon-size: 16px;
                              padding: 5px !important; resize: none !important"
                              rows="3"
                              v-model.trim="single.shopify_reason_for_refund"
                              id="product_refund_txt_area"
                            />
                          </div>
                      </div>
                      </div>
                      <div
                        class="d-block d-flex flex-wrap buttons-parent buttons-alignment mt-1"
                      >
                        <button
                          :title="((single.refund_selected_items.length) <= 0) ?'Select the checkbox for the items to be returned':null"
                          class="btn custom-buttons bot-font-buttons"
                          :disabled="(single.refund_selected_items.length) <= 0"
                          :style="((single.refund_selected_items.length) <= 0) ?'cursor: not-allowed !important':null"
                          style="font-size: 16px !important;"
                          @click="
                            submit_refund_request(
                              single.refund_order_view_details, item
                            )
                          "
                        >
                          Proceed
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    class="bot-font-receiver"
                    v-if="single.show_all_orders_list"
                    style="
                      background: #ffffff;
                      text-align: center;
                      margin: 10px 0px;
                      padding: 10px;;
                    "
                  >
                  <div
                    class="d-flex"
                  >
                    <p style="font-weight:600; margin: 0;">Order#</p>
                    <p style="font-weight:600; margin: 0;">Order Date</p>
                    <p style="font-weight:600; margin: 0;">Order Status</p>
                    <p
                      v-if="retail_web_framework != 'shopify'" 
                      style="font-weight:600; margin: 0;">Notes</p>
                  </div>
                  <div
                        v-for="(order, orderIndex) in single.all_orders_list"
                        :key="orderIndex"
                        class="d-flex"
                      >
                        <a
                          class="bot-font-receiver"
                          :href="order.status_url"
                          target="_blank"
                        >{{ order.name }}</a
                        >
                        <a 
                          class="bot-font-receiver"
                          :href="order.status_url"
                          target="_blank"
                        >{{ order.processed_date }}</a>
                        <a 
                          class="bot-font-receiver"
                          :href="order.status_url"
                          target="_blank"
                        >{{ order.fulfillment_status }}</a>
                        <a
                          class="bot-font-receiver"
                          v-if="retail_web_framework != 'shopify'" 
                          href="#"
                          @click="order_notes_data = order.order_notes; selected_order_name = order.name"
                          data-toggle="modal"
                          data-target="#ordernotesmodel"
                          title="View Notes"
                        >View Notes</a>
                      </div>
                  </div>
                  <div v-else>
                    <!-- {{no_orders_to_be_shown(item)}} -->
                  </div>
                  <template v-if="Boolean(single.image)">
                    <div class="d-flex" style="position: relative;">
                      <div v-if="(Boolean(single.received) == false &&
                        Boolean(single.image) == true)" class="bot-img" :style="bot_img_icon"></div>
                      <br />
                      <img
                        :class="!(Boolean(single.received) == false &&
                        Boolean(single.image) == true)? 'img_only_id':'img_id'"
                        :src="single.image"
                      />
                    </div>
                  </template>
                  <div v-if="single.show_buttons && single.support_buttons">
                    <button
                      class="btn custom-buttons"
                      @click="call_support('Yes')"
                    >
                      Yes
                    </button>
                    <button
                      class="btn custom-buttons"
                      @click="call_support('No')"
                    >
                      No
                    </button>
                  </div>
                  <div
                    v-if="single.custom_buttons"
                  >
                    <div :class="(Boolean(single.received) == false &&
                          Boolean(single.custom_buttons) == true)?'d-flex':null" style="align-items: center; position: relative;">
                      <div v-if="(Boolean(single.received) == false &&
                        Boolean(single.custom_buttons) == true)" class="bot-img" :style="bot_img_icon">
                      </div>
                      <div
                        class="d-block d-flex flex-wrap buttons-parent buttons-alignment mt-1"
                        :style="(Boolean(single.received) == false &&
                        Boolean(single.custom_buttons) == true)?'width: -webkit-fill-available !important;': null"
                      >
                        <button
                          :style="(Boolean(single.received) == false &&
                          Boolean(single.custom_buttons) == true)?'margin-top:1% !important; margin-bottom:2% !important': null"
                          class="btn custom-buttons"
                          @click="custom_button_click(button, item)"
                          v-for="(button, index) in single.buttons_list"
                          :disabled="input_disabled"
                          :key="index"
                        >
                          {{ button.title }}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div v-if="single.show_text_area">
                    <textarea
                      class="form-control"
                      placeholder="Enter text here"
                      :id="'textarea' + item"
                      style="padding-left: 2%"
                      :disabled="single.disabled"
                    >
                    </textarea>
                  </div>
                  <div
                    v-if="Boolean(single.is_order_status)"
                    class="chat"
                    style="margin-left: 33px; margin-top: 10px"
                    v-html="single.order_status"
                  ></div>
                  <div v-if="Boolean(single.offers)" class="d-flex" style="position: relative;">
                    <div class="bot-img" :style="bot_img_icon"></div>
                    <div
                      class="chat bot-font-receiver"
                      style="margin-top: 10px; position: relative;"
                    >
                      <span
                        v-for="(offer, offerIndex) in single.offers"
                        :key="offerIndex"
                      >
                      <span><strong style="padding-right:0.25rem">{{offerIndex+1}}:</strong></span>
                      <span v-if="offer.offer != null" v-html="offer.offer +'<br>' " style="margin-bottom: 1rem"></span>
                      </span>
                      <div class="chat-his" v-if="single.time != null">
                          <span class="time">{{ single.time }}</span>
                      </div>
                    </div>
                  </div>
                  <!-- Apply logic here -->
                  <div v-if="single.is_multiselect">
                    <multiselect
                      :close-on-select="false"
                      :taggable="true"
                      :multiple="true"
                      :options="single.multiselect_values"
                      :placeholder="single.placeholder"
                      track-by="value"
                      :group-select="true"
                      label="title"
                      v-model="single.value_mapping"
                      @input="adddropdownvalue"
                      :disabled="single.disabled"
                    ></multiselect>
                  </div>
                  <table
                    v-if="single.is_table"
                    style="
                      margin-left: 2%;
                      margin-top: 2%;
                      font-size: 14px;
                      font-weight: 300;
                      background-color: #fff;
                    "
                    class="table"
                  >
                    <tr>
                      <th
                        v-for="(head, index1) in single.col_list"
                        :key="index1"
                      >
                        {{ head }}
                      </th>
                    </tr>
                    <tr
                      v-for="(value, index2) in single.table_value"
                      :key="index2"
                    >
                      <td
                        v-for="(head, index3) in single.col_list"
                        :key="index3"
                      >
                        {{ value[head] }}
                      </td>
                    </tr>
                  </table>
                  <template v-if="Boolean(single.videos)">
                    <div class="d-flex" style="position: relative;">
                      <div v-if="(Boolean(single.received) == false &&
                        Boolean(single.videos) == true)" class="bot-img" :style="bot_img_icon"></div>
                      <br />
                      <div
                        class="plyr__video-embed"
                        id="player"
                        style="ma"
                      >
                        <iframe
                          :src="single.videos"
                          allowfullscreen
                          allowtransparency
                          allow="autoplay"
                          :class="!(Boolean(single.received) == false &&
                            Boolean(single.videos) == true)? 'video_url_only_id':'video_url_id'"
                        ></iframe>
                      </div>
                    </div>
                  </template>
                  <div
                    class="d-flex bot-font-receiver"
                    style="margin-top: 5px"
                    v-if="single.ask_feedback"
                  >
                    <div class="bot-img" :style="bot_img_icon"></div>
                    <div class="chat">
                      Was this answer helpful?
                      <a style="margin-left:1rem; margin-right:1rem;" href="#" 
                        @click="add_bot_unanswered_question(item, true)" >
                        <strong>Yes</strong>
                      </a>
                      <a href="#" @click="add_bot_unanswered_question(item, false)">
                        <strong>No</strong>
                      </a>
                      <!-- <img
                        :src="thumbs_up_icon"
                        @click="add_bot_unanswered_question(item, true)"
                      />
                      <img
                        :src="thumbs_down_icon"
                        @click="add_bot_unanswered_question(item, false)"
                      /> -->
                    </div>
                  </div>
                </div>
              </template>
            </div>
              <cense-cart 
                :addtoCart="addtoCartdata"
                :retail_currency="retail_shop_currency"
                :retail_framework="retail_web_framework"
                :shop_url="(retail_web_framework === 'shopify') ? shopify_retail_shop_name: shop_url"
                @close_cart="closecart"
                @cart_data="cart_communication"
                v-if="is_cense_cart && !input_disabled"/>
            <div id="cartDiv"></div>
          </div>
          <div class="col-sm-12 d-flex px-0" style="overflow: hidden;">
            <div id="custom-cart" v-if="show_custom_cart" class="col-sm-2 px-1" style="margin-top: 6px;">
            <div
            id="cense-cart-btn"
            type="button" class="btn cense-cart-btn"
            @click="is_cense_cart = !is_cense_cart"
            >
            <div id="cart-qty-num" 
                class="cart-qty-num bot-font-buttons"
                v-if="total_products_qty.toLocaleString() < 100"
                >{{parseInt(total_products_qty).toLocaleString()}}
            </div>
            <div id="cart-qty-num" 
                class="cart-qty-num bot-font-buttons"
                style="margin-bottom: 20px; margin-left: -2px; margin-right: -1px;"
                v-else>
                  {{99}}<sup style="font-size: 85%; top: -0.25em;">+</sup> 
            </div>
              <span
              id="cart-img" 
              v-html="cart_icon_svg"
              style="height: 20px; width: 20px;">
              </span>
            </div>
            </div>
            <div
              :class="custom_greetings_buttom_alignment(show_custom_cart)"
              v-if="Boolean(chat[greeting_buttons_position]) && Boolean(chat[greeting_buttons_position].greeting_button)"
            >
              <div
                class="d-block d-flex flex-wrap buttons-alignment"
                v-if="Boolean(chat[greeting_buttons_position]) && Boolean(chat[greeting_buttons_position].greeting_button === true)"
              >
                <button
                  :disabled="input_disabled"
                  :style="input_disabled ? 'cursor: not-allowed' : null"
                  style = "
                    margin-top: 2.5% !important; 
                    margin-left: 2.5% !important;"
                  class="btn custom-buttons bot-font-buttons"
                  @click="custom_button_click(button, greeting_buttons_position)"
                  v-for="(button, index) in chat[greeting_buttons_position].buttons_list"
                  :key="index"
                >
                  {{ button.title }}
                </button>
              </div>
            </div>
          </div>
          <div class="chat-footer">
            <div
              class="typing-indicator"
              :class="{
                'd-block': is_typing_indicator_on,
                'd-none': !is_typing_indicator_on,
              }"
            >
              <p style="font-size: 13px; font-weight: 300" v-show="is_agent_typing">
                Support Agent is typing
              </p>
              <p
                style="font-size: 13px; font-weight: 300; margin-left: 5%"
                v-show="!is_agent_typing"
              >
                typing
              </p>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div class="chat-txt">
            <div class="input-group mb-0">
              <input
                type="text"
                class="form-control"
                style="border-radius: 0;"
                v-model="to_send"
                @keyup.enter="send_message"
                :disabled="input_disabled"
                :placeholder="Boolean(is_retail_bot === true)? 'Search products or type your message here ...': 'Type your message here ...'"
              />
          <div class="pr-2 pl-2" title="Stop chat" style="background-color: #fff;" v-if="live_chat_on">
            <a href="javascript:void(0)" @click="disconnect_support_chat" id="stop-chat-button"
            ><i class="fas fa-ban pt-2" style="font-size: 22px;"></i></a>
          </div>
              <div class="input-group-append">
                <button
                  class="btn voice-button"
                  type="button"
                  @click="voice_communication"
                  :disabled="input_disabled"
                >
                  <i class="fa fa-microphone" id="microphone"></i>
                </button>
              </div>
              <div class="input-group-append">
                <button
                  class="btn"
                  type="button"
                  id="send_btn"
                  @click="send_message"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="send_button"
                    style="fill: #8a8a8a63"
                    width="40"
                    height="25"
                    viewBox="0 0 24 24"
                  >
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="chat-cense-footer">
            <span 
              v-show="this.chat_widget.is_powered_by_cense"
              class="powered-by">
              {{tlt('powered_by_label')}} &nbsp;
              <a href="https://cense.ai" target="_blank"
                title="click here to visit"
                class="open_cense_website"><img src="/img/cense_image.png" style="height: 20px"/></a>
            </span>
          </div>
        </div>
      </div>
      <div
      id="notifyemail"
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
              <h3>Out of Stock products</h3>
              <button type="button" class="close" data-dismiss="modal">
                <img src="/img/close-icn.png" alt />
              </button>
            </div>
            <div>
              <div
                class="p-0"
                style="overflow-y: auto"
              >
              <label>Please check the products regarding which you want notification</label>
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
                                  @change="selected_product('all')"
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
                              border-left: 0;
                            "
                          >
                            Select All
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(product, index) in product_out_of_stock_list"
                          :key="index"
                          :class="check_current_product_active(index)"
                        >
                          <th scope="col">
                            <div class="form-check checkbox checkbox-success">
                              <label class="form-check-label">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  :id="'product_checkbox_'+product.product_id"
                                  @change="
                                    selected_product(product)
                                  "
                                />
                                <span class="icn"></span>
                              </label>
                            </div>
                          </th>
                          <td
                           @click="show_product(index)"
                            :title="product.product_title"
                          >
                            <template>
                              <p style="margin-bottom: 0">
                                {{ product.product_title }} {{product.variant_title}}
                              </p>
                            </template>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <hr>
                <div class="form-group">
              <input
                type="text"
                class="form-control"
                style="border: 1px solid #ced4da;
                border-radius: .25rem; fon-size: 16px;"
                v-model="customer_email"
                placeholder="Enter Your Email Id"
              />
            </div>
            <div style="text-align: center;">
            <button
                type="submit"
                class="darkblue-btn"
                id="notify_email_btn"
                @click="submit_out_of_stock_products()"
              >
                Notify me
            </button>
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      id="ordernotesmodel"
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
              <h3>Notes for Order No. {{selected_order_name}}</h3>
              <button type="button" class="close" data-dismiss="modal">
                <img src="/img/close-icn.png" alt />
              </button>
            </div>
            <div v-if="order_notes_data.length > 0">
            <div v-for="(note ,index) in order_notes_data"
            :key="index">
              <ul style="list-style-type: disc;">
                <li v-if="note.date_created && note.note"><p> <strong>{{note.date_created}}</strong>  : {{note.note}}</p></li>
              </ul>
            </div>
            </div>
            <div v-else>
              <p>No updates</p>
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
import api_calls from "@/portal/api_calls";
import fingerprint from "@/portal/components/fingerprint";
import { bus } from "@/portal/main";
import { setTimeout } from "timers";
import Multiselect from "vue-multiselect";
import VideoViewer from "@/portal/components/Response Bot/VideoViewer.vue";
import debounce from "vue-debounce/dist/debounce.min.js";
// import { Socket } from "phoenix-socket";
import { Socket, Presence } from "phoenix";
import StarRating from "vue-star-rating";
import {
  voicerecorder,
  start_voice_communication,
  foreignxchange_custom,
  generate_time,
} from "@/portal/mixins";
import moment from "moment";
import swal from "sweetalert2";
import CenseCart from "./CenseCart.vue";
import VueNumericInput from "vue-numeric-input";
import sound from "@/portal/assets/audio/mixkit-add-to-cart.wav";
import "@/portal/assets/js/shopify.min.js";
export default {
  name: "response-bot",
  components: {
    Multiselect,
    VideoViewer,
    StarRating,
    CenseCart,
    VueNumericInput,
  },
  mixins: [
    voicerecorder,
    start_voice_communication,
    foreignxchange_custom,
    generate_time,
  ],
  data() {
    return {
      companyid: this.$session.get("UserInformation").company_id,
      companyname: this.$session.get("UserInformation").company_name,
      popup_msg:
        "You can type 'Restart'”  at </br>any  time to get back</br> to the Main Menu",
      refreshed_or_closed: true,
      qus_ans: "answers",
      to_send: "",
      cense_enquiry: false,
      is_agent_typing: false,
      user_name: "",
      show: false,
      chat: [],
      fingerprint: null,
      bot_response_token_value: this.$session.get("BotToken"),
      level: 0,
      recognition: null,
      json_data: {
        create_appointment:
          '{"User": {"Physician": {"ID": "DT000000000000000237"},"UserName":"ac","ID":"US000000000000000138","Account": {"ID": "CO00023"},"Token": "Z1rSGGm0XpMWjt3giAErPPWZ84TQN9FsFMBLsU+/LAu6yualMg6EP2bsrwZjLPwm3j4DpPcGc5LcIp3NjgfUsA==","Specialty": {"ID": "PG000000000000000141", "Name": "AC", "Code": "AC"},"Domain": "gogreenbills.com"},"Appointment": {"Date": "08/30/2018", "IsJSONNote": 0, "Patient": {"CaseID": ""}}}',
        visits_finalized:
          '{"User": {"Physician": {"ID": "DT000000000000011886"},"UserName": "ch","ID": "US000000000000000143","Account":{"ID":"CO00023"},"Token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiYXZkaHV0IiwiZXhwIjoxNTI5NDgyNjYzfQ.v1c0HbuWuZXXpJfDrXVc1HPVuffbnGcLqkpg0zm6AoQ","Specialty": {"ID": "PG000000000000000142","Code": "ch"},"Domain": "greenyourbills.com"},"SearchParameters": {"Status": "","OrderBy": "","FromDate": "01/01/2018","Count": "10","SearchText": "","TypeOfVisit": "ALL","SortOrder": "appointment","StartIndex": "1","EndIndex": "10","ToDate": "08/06/2018"}}',
        appointments_count:
          '{"User": {"Physician": {"ID": "DT000000000000011886"},"UserName": "ch","ID": "US000000000000000143","Account":{"ID":"CO00023"},"Token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiYXZkaHV0IiwiZXhwIjoxNTI5NDgyNjYzfQ.v1c0HbuWuZXXpJfDrXVc1HPVuffbnGcLqkpg0zm6AoQ","Specialty": {"ID": "PG000000000000000142","Code": "ch"},"Domain": "greenyourbills.com"},"SearchParameters": {"Status": "","OrderBy": "","FromDate": "01/01/2018","Count": "10","SearchText": "","TypeOfVisit": "ALL","SortOrder": "appointment","StartIndex": "1","EndIndex": "10","ToDate": "08/06/2018"}}',
        create_ticket:
          '{"AccountName":null,"CallbackPhone":"","CompanyID":"CO00023","Description":"De","DomainName":null,"EmailCC":"abhay.w@codearray.tech","EmailDefault":"manish.y@codearray.tech","Priority":"3","PriorityID":0,"RaisedBy":"lawuser","Status":0,"StatusCode":null,"StatusText":null,"SType":"WP","Subject":"De","SubType":"SAMD-P","TicketID":0,"TicketNumber":null,"Type":0,"TypeText":"Website Problem","listFiles1":["chq1.pdf"]}',
        get_report: '{"companyId": "CO00023"}',
      },
      stop: true,
      demourlbind: false,
      reviewsurlbind: false,
      reviewsurl: "https://www.youtube.com/embed/paAeW86eQZ4",
      demourl: [
        "https://www.youtube.com/embed/videoseries?KcrJm9UxW3s&index=13&list=PL_jXlih8dgkTE8CrPpiWcA9KxQeKHZAnt&t=0s",
        "https://www.youtube.com/embed/videoseries?qzS2qINI6IM&list=PL_jXlih8dgkRu5ddGXAGqZ4uLLkoJzCj8&index=2",
      ],
      chat_widget: {
        logo: "",
        title: "",
        style: "",
        bot_theme: "",
        button_border_theme: "#273679",
        user_response_bg_color: "#273679",
        bot_response_bg_color: "#ffffff",
        delivery_note_color: "#273679",
        button_theme: "",
        button_alignment: "",
        bot_icon: "",
        bot_background_image: "",
        button_horizontal_spacing: "3",
        button_vertical_spacing: "5",
        header_background: "",
        bot_font_style: "",
        bot_font_color_sender: "",
        bot_font_color_receiver: "",
        bot_font_color_buttons: "",
        is_powered_by_cense: true,
      },
      selected_date: "",
      selected_time: "",
      reason_of_visit: "",
      patient_name: "",
      visitor_number: "",
      full_time_slots: [],
      time_slots: [],
      TODAY_DATE: "",
      channel: null,
      chat_socket: null,
      voice_socket: null,
      live_chat_on: false,
      live_chat_token: null,
      chat_group_name: null,
      to_scroll: false,
      form_payload: null,
      phone_number_validity: /[0-9]{10,11}$/,
      url_match_regex: /^https?:\/\/.*[\\\/].+\.[(pdf|csv|xlsx)]{2,4}/,
      currencyexchange_list: null,
      selected_indication: [],
      welcome_message_not_yet_received: true,
      res: {},
      is_typing_indicator_on: false,
      thumbs_up_icon: require("@/portal/assets/img/Group 7.svg"),
      thumbs_down_icon: require("@/portal/assets/img/Group 6.svg"),
      shopify_ui: null,
      shopify_customer_id: null,
      // refund_order_view_details: {},
      // refund_selected_items: [],
      shopify_retail_shop_name: null,
      shop_url: null,
      is_retail_bot: false,
      shopify_reason_for_refund: null,
      show_shopify_reason_for_refund_error: false,
      support_channel: null,
      is_support_agent_present: false,
      support_agent_info: null,
      retail_order_retreival_only_email_required: false,
      retail_shop_currency: null,
      product_list: [],
      product_out_of_stock_list: [],
      checked_list: [],
      current_product: "",
      customer_email: "",
      reg_email:
        /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/,
      scrollPosition: 0,
      visible_custom_greetings_buttom: false,
      review_message_first: "",
      review_message_second: "",
      review_response_message: "",
      display_products_on_landing: false,
      retail_web_framework: "",
      is_cense_cart: false,
      show_custom_cart: false,
      addtoCartdata: [],
      total_products_qty: 0,
      over_qty_warning: false,
      contact_help_email: null,
      shopify_reason_for_refund_list: null,
      shopify_reason_for_refund_option: [
        "Ordered by mistake",
        "Ordered wrong product",
        "Order not Received",
        "No longer needed",
        "Better price available",
        "Received damaged products",
        "Others",
      ],
      order_notes_data: [],
      selected_order_name: "",
      is_woocommerce_order: false,
      visitors_current_location: null,
      is_display_banner_on_landing: false,
      visitors_current_location_url: `https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.VUE_APP_CURRENT_LOCATION_TOKEN}`,
      greeting_buttons_position: null,
      // custom_product_button_key: [{'name': 'customize it', 'function':'route', 'on_key': 'product_type', 'on_value':'custom'}],
      custom_product_button_key: [],
    };
  },
  props: {
    isPreviewBot: Boolean,
    isDialogBot: Boolean,
    current_preview_banner_id: String,
    isTextToBot: {
      type: Boolean,
      default: true,
    },
    isCalledFromSetup: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    cart_button_alignment() {
      if (this.is_retail_bot) {
        return "col-sm-2 px-0";
      } else {
        return null;
      }
    },
    input_disabled() {
      return this.refreshed_or_closed || this.welcome_message_not_yet_received;
    },
    cssProps() {
      let botAttributes = {
        head_color: this.chat_widget.header_background,
      };
      return {
        "--bot-head-color": botAttributes.head_color,
        "--bot-sender-color": this.chat_widget.bot_theme,
        "--bot-button-color": this.chat_widget.bot_theme,
        "--bot-link-color": this.chat_widget.bot_theme,
        "--bot-button-border": this.chat_widget.button_border_theme,
        "--user-response-bg-color": this.chat_widget.user_response_bg_color,
        "--bot-response-bg-color": this.chat_widget.bot_response_bg_color,
        "--delivery-note-color": this.chat_widget.delivery_note_color,
        "--bot-button-background": this.chat_widget.button_theme,
        "--bot-buttons-alignment": this.chat_widget.button_alignment.value,
        "--bot-buttons-vertical-spacing": `${this.chat_widget.button_vertical_spacing}%`,
        "--bot-buttons-horizontal-spacing": `${this.chat_widget.button_horizontal_spacing}%`,
        "--bot-font-style": this.chat_widget.bot_font_style.value,
        "--bot-font-color-sender": this.chat_widget.bot_font_color_sender,
        "--bot-font-color-receiver": this.chat_widget.bot_font_color_receiver,
        "--bot-font-color-buttons": this.chat_widget.bot_font_color_buttons,
      };
    },
    bot_img_icon() {
      return {
        "background-image": `url(${this.chat_widget.bot_icon})`,
      };
    },
    chat_bot_background_image() {
      return {
        "background-image": `url(${this.chat_widget.bot_background_image})`,
      };
    },
    shopify_login_button_text() {
      if (this.retail_order_retreival_only_email_required) {
        return "Go";
      }
      return "Login";
    },
    cart_icon_svg() {
      return `<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="18.000000pt" height="18.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="${this.chat_widget.bot_font_color_buttons}" stroke="none"><path d="M81 5002 c-100 -50 -106 -186 -12 -249 33 -23 39 -23 317 -23 l284 0 5 -22 c3 -13 172 -745 375 -1628 279 -1209 376 -1612 392 -1636 47 -69 -72 -64 1599 -64 1367 0 1514 2 1545 16 37 18 68 62 79 111 9 45 -24 117 -67 143 -33 20 -45 20 -1475 20 -1364 0 -1442 1 -1447 18 -12 37 -106 454 -106 468 0 12 206 14 1503 14 1472 0 1503 0 1534 20 18 10 39 33 48 50 26 50 468 2030 461 2068 -7 44 -39 86 -80 106 -31 15 -208 16 -2014 16 l-1980 0 -27 118 c-73 319 -94 395 -117 419 -49 53 -51 53 -430 53 -316 0 -357 -2 -387 -18z m4702 -869 c2 -5 -81 -381 -184 -838 -104 -456 -188 -831 -189 -833 0 -1 -656 -1 -1457 0 l-1458 3 -192 830 c-105 457 -192 833 -192 838 -1 9 3667 9 3672 0z"/><path d="M2038 1165 c-190 -48 -356 -216 -398 -400 -15 -64 -15 -186 0 -250 31 -137 151 -290 277 -354 173 -87 387 -78 538 23 219 146 306 407 216 647 -55 144 -181 268 -326 320 -78 27 -227 34 -307 14z m217 -295 c48 -19 104 -71 129 -121 111 -223 -147 -449 -354 -310 -176 118 -130 382 78 437 45 12 105 9 147 -6z"/><path d="M3806 1164 c-133 -32 -278 -146 -343 -270 -113 -213 -75 -462 97 -634 213 -213 542 -214 754 -4 35 35 78 88 95 118 38 66 71 190 71 266 0 76 -33 200 -71 266 -17 30 -60 83 -95 118 -134 133 -323 185 -508 140z m195 -288 c48 -8 112 -56 146 -108 25 -38 28 -52 28 -128 0 -76 -3 -90 -27 -127 -51 -78 -118 -115 -209 -115 -109 0 -203 69 -233 173 -20 65 -20 73 0 138 16 56 69 123 117 147 32 17 104 33 127 29 8 -2 31 -6 51 -9z"/></g></svg>`;
    },
  },
  watch: {
    scrollPosition() {
      if (this.scrollPosition > 150) {
        this.visible_custom_greetings_buttom = true;
      } else if (this.scrollPosition < 150) {
        this.visible_custom_greetings_buttom = false;
      }
    },
    to_send() {
      this.button_fill();
    },
    chat() {
      this.scroll_down();
    },
  },
  beforeCreated() {
    let route_params = this.$route.params;
    if (route_params.reload === true) {
      this.$router.go();
    }
  },
  beforeDestroy() {
    if (this.live_chat_on) this.disconnect_support_chat();
  },
  created() {
    this.load_widget_settings();
    let bot_templates_data = this.$session.get("BotTemplates");
    for (let i = 0; i < bot_templates_data.length; i++) {
      if (
        bot_templates_data[i].domain === "Retail" &&
        bot_templates_data[i].subscribed === true
      ) {
        this.is_retail_bot = true;
        break;
      }
    }
    if (this.$session.has("BotResponse_Conversation")) {
      // this.chat = this.$session.get("BotResponse_Conversation");
    }
    // if (!this.$session.has("ChatBotImageParameters")) {
    // } else {
    //   this.chat_widget = this.$session.get("ChatBotImageParameters");
    //   this.chat_widget.style = "margin-top: 5px;height:30px;width:auto;margin-left: auto;margin-right: 0;";
    // }
    if (!this.isPreviewBot) {
      if (!this.$session.has("BotToken")) {
        axios
          .post(api_calls.bot_response_token(), {
            license_key: this.$session.get("UserInformation").license_key,
            username: this.$session.get("UserInformation").email,
          })
          .then((response) => {
            if (this.api_status_code.STATUS_SUCCESS_CORE.MSG_CODE === response.data.message.MSG_CODE){
              this.$session.set("BotToken", response.data.data);
              this.bot_response_token_value = response.data.data;
              this.refresh_chatbot();
            }
          });
      } else {
        this.bot_response_token_value = this.$session.get("BotToken");
        this.refresh_chatbot();
      }
    }
    var d = new Date();
    axios
      .post(api_calls.bot_user_data(), {
        license_key: this.$session.get("UserInformation").license_key,
        tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
        datetime: d.toISOString(),
        token: this.bot_response_token_value,
        username: this.$session.get("UserInformation").email,
        source: "Web",
        token: this.bot_response_token_value,
        role: this.$session.get("UserInformation").role,
      })
      .then((response) => {});
  },
  beforeDestroy() {
    this.$forceUpdate();
  },
  mounted() {
    var vm = this;
    document.addEventListener(
      "scroll",
      function (ev) {
        if (ev.target.id === "portal_chat_body_id") {
          vm.scrollPosition = ev.target["scrollTop"];
        }
      },
      true
    );
    // let recaptchaScript = document.createElement('script')
    // recaptchaScript.setAttribute('src', 'https://sdks.shopifycdn.com/buy-button/latest/buybutton.js')
    // document.head.appendChild(recaptchaScript)
    // const plugin = document.createElement("script");
    // plugin.setAttribute(
    //   "src",
    //   "https://sdks.shopifycdn.com/buy-button/latest/buybutton.js"
    // );
    // plugin.async = true;
    // document.head.appendChild(plugin);
    this.show = false;
    if (this.$route.name == "Train the Bot") {
      $(".chat-wrap").css("right", "auto");
    }
    if (this.$route.name == "Direct Response Bot") {
      $(".chat-wrap").css("marginTop", "5%");
    }
    window.SpeechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition;
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    document.addEventListener("click", someListener);

    function someListener(event) {
      let element = event.target;
      if (
        (element.tagName == "I" || element.tagName == "A") &&
        element.classList.contains("fa-clipboard")
      ) {
        var msg = element.getAttribute("data-copy-content");
        var temp = document.createElement("textarea");
        var tempMsg = document.createTextNode(msg);
        temp.appendChild(tempMsg);

        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        document.body.removeChild(temp);
      }
    }
    this.$root.$emit("change_sidebar_main_menu", "Simulate Interaction");

    //To hide cense cart if clicked outside
    document.onclick = function (e) {
      if (e.target.closest("#cart-box") || e.target.closest("#custom-cart")) {
      } else {
        vm.is_cense_cart = false;
      }
    };
  },
  methods: {
    load_widget_settings() {
      axios
        .post(
          api_calls.get_widget_settings(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
            isShow: true,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          if(this.api_status_code.DATA_AVAILABLE.MSG_CODE === response.data.message.MSG_CODE) {
            this.chat_widget.title = response.data.data.WidgetTitle;
            this.chat_widget.logo = response.data.data.ImageUrl;
            this.chat_widget.button_theme = response.data.data.ButtonTheme;
            this.chat_widget.button_border_theme =
              response.data.data.ButtonBorderTheme === null
                ? this.chat_widget.button_border_theme
                : response.data.data.ButtonBorderTheme;
            this.chat_widget.user_response_bg_color =
              response.data.data.UserResponseBgColor === null
                ? this.chat_widget.user_response_bg_color
                : response.data.data.UserResponseBgColor;
            this.chat_widget.bot_response_bg_color =
              response.data.data.BotResponseBgColor === null
                ? this.chat_widget.bot_response_bg_color
                : response.data.BotResponseBgColor;
            this.chat_widget.delivery_note_color =
              response.data.data.DeliveryNoteColor === null
                ? this.chat_widget.delivery_note_color
                : response.data.data.DeliveryNoteColor;
            this.chat_widget.bot_font_style = response.data.data.BotFont.FontStyle;
            this.chat_widget.bot_font_color_sender =
              response.data.data.BotFont.FontColorSender;
            this.chat_widget.bot_font_color_receiver =
              response.data.data.BotFont.FontColorReceiver;
            this.chat_widget.bot_font_color_buttons =
              response.data.data.BotFont.FontColorButtons;
            this.chat_widget.bot_theme = response.data.BotTheme;
            this.chat_widget.is_powered_by_cense =
              response.data.data.IsPoweredByCense === undefined
                ? this.chat_widget.is_powered_by_cense
                : response.data.data.IsPoweredByCense;
            this.chat_widget.button_alignment = response.data.data.BotStyling;
            this.chat_widget.bot_icon = response.data.data.BotImageUrl;
            this.chat_widget.button_vertical_spacing =
              response.data.data.ButtonStyling.vertical;
            this.chat_widget.button_horizontal_spacing =
              response.data.data.ButtonStyling.horizontal;
            this.chat_widget.bot_background_image = response.data.data.BgImageUrl;
            this.chat_widget.header_background = response.data.data.HeaderTheme;
            if (response.data.data.BotGreetings.data.responses.length > 0) {
              let is_visible_greetings =
                response.data.data.BotGreetings.data.responses.map((item) => {
                  return item.visible !== undefined ? item.visible : true;
                });
              if (is_visible_greetings.includes(true)) {
                this.greeting_buttons_position =
                  response.data.data.BotGreetings.data.responses.length - 1;
                if (
                  Boolean(
                    response.data.data.BotGreetings.data.responses[
                      this.greeting_buttons_position
                    ]["buttons"]
                  )
                ) {
                  var visible_buttons =
                    response.data.data.BotGreetings.data.responses[
                      this.greeting_buttons_position
                    ]["buttons"];
                  visible_buttons = visible_buttons.filter((button) => {
                    return button["visible"] === true;
                  });
                  response.data.data.BotGreetings.data.responses[
                    this.greeting_buttons_position
                  ]["buttons"] = visible_buttons;
                }
                const visible_greetings_map = is_visible_greetings.reduce(
                  (acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
                  new Map()
                );
                let splice_index = [];
                if (
                  visible_greetings_map.get(true) !==
                  response.data.data.BotGreetings.data.responses.length
                ) {
                  if (
                    response.data.data.BotGreetings.data.responses[
                      this.greeting_buttons_position
                    ].visible === false
                  ) {
                    try {
                      for (
                        let i =
                          response.data.data.BotGreetings.data.responses.length - 1;
                        i >= 0;
                        i--
                      ) {
                        if (
                          response.data.data.BotGreetings.data.responses[i].visible ===
                          false
                        ) {
                          response.data.data.BotGreetings.data.responses[
                            i - 1 < 0 ? i : i - 1
                          ]["buttons"] = visible_buttons;
                          this.greeting_buttons_position =
                            this.greeting_buttons_position - 1 < 0
                              ? this.greeting_buttons_position
                              : this.greeting_buttons_position - 1;
                          splice_index.push(i);
                        }
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  } else {
                    for (
                      let i =
                        response.data.data.BotGreetings.data.responses.length - 1;
                      i >= 0;
                      i--
                    ) {
                      if (
                        response.data.data.BotGreetings.data.responses[i].visible ===
                        false
                      ) {
                        this.greeting_buttons_position =
                          this.greeting_buttons_position - 1 < 0
                            ? this.greeting_buttons_position
                            : this.greeting_buttons_position - 1;
                        splice_index.push(i);
                      }
                    }
                  }
                  for (let index = 0; index < splice_index.length; index++) {
                    response.data.data.BotGreetings.data.responses.splice(
                      splice_index[index],
                      1
                    );
                  }
                }
                this.push_msg(
                  response.data.data.BotGreetings,
                  response.data.data.BotGreetings.data.responses
                );
              }
            } else {
              if (this.is_retail_bot) {
                this.load_chatbot_integration_details();
              }
            }
            if (this.chat_widget.button_alignment === undefined) {
              this.chat_widget.button_alignment = "flex-end";
            }
            if (this.chat_widget.bot_icon === undefined) {
              this.chat_widget.bot_icon = "/img/Bot_img.png";
            }
            this.$session.set("ChatBotImageParameters", this.chat_widget);
            let styling_value = response.data.data.HeaderStyling.value;
            let temp_string = "";
            if (styling_value === "left") {
              temp_string = "margin-left: 0;margin-right: auto;";
            } else if (styling_value === "right") {
              temp_string = "margin-left: auto;margin-right: 0;";
            } else if (styling_value === "center") {
              temp_string = "margin-left: auto;margin-right: auto;";
            } else {
              temp_string = "margin-left: auto;margin-right: auto;";
            }
            this.chat_widget.style =
              "margin-top: 5px;height:30px;width:auto;max-width:100% !important;" +
              temp_string;
          }
        })
        .catch((e) => {
          if (this.is_retail_bot) {
            this.load_chatbot_integration_details();
          }
          console.log(e.response.data);
          if (e.response) {
            if (
              e.response.status === 410 ||
              e.response.status === 440 ||
              e.response.status === 409
            ) {
              this.$root.$emit("Session_Expired", e.response.data);
            }
          } else {
            this.chat_widget.logo = "/img/cense_image.png";
            this.chat_widget.style =
              "margin-top: 5px;height:30px;width:60px;margin-left: auto;margin-right: auto;";
            this.chat_widget.bot_icon = "/img/Bot_img.png";
            this.chat_widget.button_vertical_spacing = "5";
            this.chat_widget.button_horizontal_spacing = "3";
            this.chat_widget.bot_background_image = "";
            this.chat_widget.header_background = "#ffffff";
            this.chat_widget.button_theme = "#1daae1";
            this.chat_widget.bot_theme = "#273679";
            this.chat_widget.button_border_theme = "#273679";
            this.chat_widget.user_response_bg_color = "#273679";
            this.chat_widget.bot_response_bg_color = "#ffffff";
            this.chat_widget.delivery_note_color = "#273679";
            this.chat_widget.bot_font_style = "Roboto";
            this.chat_widget.bot_font_color_sender = "#ffffff";
            this.chat_widget.bot_font_color_receiver = "#000000";
            this.chat_widget.bot_font_color_buttons = "#ffffff";
            this.$session.set("ChatBotImageParameters", this.chat_widget);
          }
        });
    },
    load_chatbot_integration_details() {
      axios
        .post(
          api_calls.chatbot_integration_details(),
          {
            is_get: true,
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.$session.get("UserInformation").tokens,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          if (response.data.message.MSG_CODE === this.api_status_code.DATA_AVAILABLE.MSG_CODE) {
            this.chatbot_integration_details_response(response);
          } 
          else if (this.api_status_code.EMPTY_DATA.MSG_CODE == response.data.message.MSG_CODE) {

          }
          else {
            Swal({
              title: response.data.message.MSG_CODE,
              text: response.data.message.MSG,
              showCancelButton: false,
              showConfirmButton: false,
              toast: true,
              position: "top-end",
              type: "error"
            })
          }
        })
        .catch((e) => {
          // this.shopify_retail_shop_name = "earthon";
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
            setTimeout(() => {
              axios
                .post(
                  api_calls.chatbot_integration_details(),
                  {
                    is_get: true,
                    company_name: this.companyname,
                    company_id: this.companyid,
                    email: this.$session.get("UserInformation").email,
                    license_key:
                      this.$session.get("UserInformation").license_key,
                    token: this.$session.get("UserInformation").tokens,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${this.$session.get("at")}`,
                    },
                  }
                )
                .then((response) => {
                  if (response.data.message.MSG_CODE === this.api_status_code.DATA_AVAILABLE.MSG_CODE) {
                    this.chatbot_integration_details_response(response);
                  } else if (this.api_status_code.EMPTY_DATA.MSG_CODE == response.data.message.MSG_CODE) {

                  } else {
                    Swal({
                      title: response.data.message.MSG_CODE,
                      text: response.data.message.MSG,
                      showCancelButton: false,
                      showConfirmButton: false,
                      toast: true,
                      position: "top-end",
                      type: "error"
                    })
                  }
                });
            }, 1000);
          }
        });
    },
    chatbot_integration_details_response(response) {
      this.retail_web_framework = response.data.data.retail_web_framework;
      var webframework =
        response.data.data[this.retail_web_framework + "_details"];
      this.show_custom_cart = this.retail_web_framework != null ? true : false;
      if (webframework !== null && webframework !== {}) {
        this.retail_shop_currency = webframework.base_currency.value || "USD";
        this.retail_order_retreival_only_email_required =
          webframework.order_retrieval_only_email_required || false;
        this.contact_help_email = webframework.contact_help_email;
        this.review_response_message = webframework.review_response_message;
        this.review_message_first = webframework.review_message_first;
        this.review_message_second = webframework.review_message_second;
        this.display_products_on_landing =
          webframework.display_products_on_landing;
        this.is_display_banner_on_landing =
          webframework.is_display_banner_on_landing;
        if (this.retail_web_framework == "shopify") {
          this.shopify_retail_shop_name = webframework.shopify_shop_name;
          this.custom_product_button_key =
            webframework.custom_product_button_key == undefined || null
              ? []
              : webframework.custom_product_button_key;
        } else {
          this.shop_url = webframework[this.retail_web_framework + "_shop_url"];
        }
      }
      // setTimeout(() => {
      if (!this.isPreviewBot) {
        this.get_visitors_current_location();
      } else if (Boolean(this.current_preview_banner_id)) {
        this.preview_banner();
      }
      // }, 3000);
    },
    update_variation(chat_id, product_index, title) {
      for (var i in this.chat[chat_id].products_list[product_index]
        .variations) {
        if (
          this.chat[chat_id].products_list[product_index].variations[i]
            .variant_title == title
        ) {
          this.chat[chat_id].products_list[product_index].img_url =
            this.chat[chat_id].products_list[product_index].variations[
              i
            ].img_url;
          if(this.retail_web_framework == 'bigcommerce') {
            this.chat[chat_id].products_list[product_index].sku =
              this.chat[chat_id].products_list[product_index].variations[i].sku;
          }
          this.chat[chat_id].products_list[product_index].id =
            this.chat[chat_id].products_list[product_index].variations[i].id;
          this.chat[chat_id].products_list[product_index].permalink =
            this.chat[chat_id].products_list[product_index].variations[
              i
            ].permalink;
          this.chat[chat_id].products_list[product_index].price =
            this.chat[chat_id].products_list[product_index].variations[i].price;
          this.chat[chat_id].products_list[product_index].regular_price =
            this.chat[chat_id].products_list[product_index].variations[
              i
            ].regular_price;
          this.chat[chat_id].products_list[product_index].stock_quantity =
            this.chat[chat_id].products_list[product_index].variations[
              i
            ].stock_quantity;
          this.chat[chat_id].products_list[product_index].stock_status =
            this.chat[chat_id].products_list[product_index].variations[
              i
            ].stock_status;
          this.chat[chat_id].products_list[product_index].variant_title =
            this.chat[chat_id].products_list[product_index].variations[
              i
            ].variant_title;
        }
      }
      // const found = this.chat[chat_id].products_list[product_index].variations.some(el => el.variant_title == "Default");
      // if (!found) this.chat[chat_id].products_list[product_index].variations.push(default_values);
    },
    custom_greetings_buttom_alignment(show_custom_cart) {
      if (show_custom_cart) {
        return "col-sm-10 px-0";
      } else {
        return "col-sm-12 px-0";
      }
    },
    get_visitors_current_location() {
      if (this.is_display_banner_on_landing === true) {
        let cutoff = new Date();
        var date_time = moment
          .utc(cutoff, ["YYYY-MM-DD HH:mm:ss"])
          .format("YYYY-MM-DD HH:mm:ss");
        var vm = this;
        $.getJSON(vm.visitors_current_location_url, function (data) {
          if (data) {
            vm.visitors_current_location = {
              ip_address: data.ip_address,
              city: data.city,
              city_geoname_id: data.city_geoname_id,
              region: data.region,
              region_iso_code: data.region_iso_code,
              region_geoname_id: data.region_geoname_id,
              postal_code: data.postal_code,
              country: data.country,
              country_code: data.country_code,
              country_geoname_id: data.country_geoname_id,
              country_is_eu: data.country_is_eu,
              continent: data.continent,
              continent_code: data.continent_code,
              continent_geoname_id: data.continent_geoname_id,
              longitude: data.longitude,
              latitude: data.latitude,
              security: data.security,
              date_time: date_time,
            };
            vm.is_display_banner();
          } else {
            vm.is_display_products();
          }
        }).error(function () {
          vm.is_display_products();
        });
      } else {
        this.is_display_products();
      }
    },
    preview_banner() {
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
            is_preview_banner: true,
            banner_id: this.current_preview_banner_id,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          if (response.data.message.MSG_CODE === this.api_status_code.DATA_AVAILABLE_MODELS.MSG_CODE) {
            if (Boolean(response.data.data.responses.length > 0)) {
              this.response_handling(response.data);
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
    is_display_banner() {
      axios
        .get(api_calls.banner_template(), {
          params: {
            license_key: this.$session.get("UserInformation").license_key,
            username: this.$session.get("UserInformation").email,
            email: this.$session.get("UserInformation").email,
            token: this.bot_response_token_value,
            is_display_banner: true,
            visitors_current_location: this.visitors_current_location,
          },
        })
        .then((response) => {
          if (response.data.message.MSG_CODE === this.api_status_code.DATA_AVAILABLE_MODELS.MSG_CODE) {
            if (Boolean(response.data.data.responses.length > 0)) {
              this.response_handling(response.data);
            }
          }
          this.is_display_products();
        })
        .catch((e) => {
          this.is_display_products();
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    is_display_products() {
      if (this.display_products_on_landing === true) {
        axios
          .post(api_calls.display_landing_products(), {
            license_key: this.$session.get("UserInformation").license_key,
            token: this.bot_response_token_value,
            username: this.$session.get("UserInformation").email,
            source: "Web",
          })
          .then((response) => {
            if(response.data.message.MSG_CODE === this.api_status_code.DATA_AVAILABLE_MODELS.MSG_CODE) {
              var products_count =
              response.data.data.responses[0].products.products_list.length;
              if (products_count > 0) {
                this.response_handling(response.data);
              }
              this.is_review_rating();
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
            this.is_review_rating();
            if (
              e.response.status === 410 ||
              e.response.status === 440 ||
              e.response.status === 409
            ) {
              this.$root.$emit("Session_Expired", e.response.data);
            }
          });
      } else {
        this.is_review_rating();
      }
    },
    is_review_rating() {
      if (
        Boolean(this.$session.get("shopify_customer_id")) ||
        Boolean(this.$session.get("shopify_customer_token"))
      ) {
        let stringified_customer_payload = JSON.stringify({
          customerId: this.$session.get("shopify_customer_id"),
          email: this.$session.get("shopify_customer_token"),
        });
        axios
          .post(api_calls.chatbot_response_cense(), {
            license_key: this.$session.get("UserInformation").license_key,
            token: this.bot_response_token_value,
            username: this.$session.get("UserInformation").email,
            source: "Web",
            chat: `/retrieve_customer_orders${stringified_customer_payload}`,
            role: this.$session.get("UserInformation").role,
            refreshed_or_closed: false,
          })
          .then((response) => {
            if (Boolean(response.data.responses[0].custom)) {
              if (
                Boolean(
                  response.data.responses[0].custom.orders_list.length > 0
                )
              ) {
                this.call_review_rating(
                  response.data.responses[0].custom.orders_list
                );
              }
            }
          });
      }
    },
    call_review_rating(data) {
      var fulfilled_orders = data.filter((fulfilled_order) => {
        return fulfilled_order.fulfillment_status === "fulfilled";
      });
      var sorted_fulfilled_orders = fulfilled_orders.map((item) => {
        return item.line_items.map((product) => {
          return product;
        });
      });
      axios
        .post(
          api_calls.product_review_rating(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.bot_response_token_value,
            username: this.$session.get("UserInformation").email,
            web_framework: this.retail_web_framework,
            is_get_reviewed_product_id: true,
            review_rating_customer_id: this.$session.get("shopify_customer_id"),
            review_rating_customer_email: this.$session.get(
              "shopify_customer_token"
            ),
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
          if (this.api_status_code.DATA_AVAILABLE.MSG_CODE === response.data.message.MSG_CODE) {
            if (response.data.data.is_review === true) {
              var reviewed_product_details = [];
              var not_reviewed_product_details = [];
              var reviewed_product_id_list = response.data.data.product_id_list;
              for (let i = 0; i < sorted_fulfilled_orders.length; i++) {
                for (let j = 0; j < sorted_fulfilled_orders[i].length; j++) {
                  if (
                    reviewed_product_id_list.includes(
                      sorted_fulfilled_orders[i][j].product_id
                    )
                  ) {
                    reviewed_product_details.push(sorted_fulfilled_orders[i][j]);
                  } else {
                    not_reviewed_product_details.push(
                      sorted_fulfilled_orders[i][j]
                    );
                  }
                }
              }
              if (
                not_reviewed_product_details.length > 0 &&
                Boolean(this.review_message_first) === true &&
                Boolean(this.review_message_second) === true &&
                Boolean(this.review_response_message) === true
              ) {
                axios
                  .post(
                    api_calls.product_review_rating(),
                    {
                      company_name: this.companyname,
                      company_id: this.companyid,
                      email: this.$session.get("UserInformation").email,
                      license_key:
                        this.$session.get("UserInformation").license_key,
                      token: this.bot_response_token_value,
                      username: this.$session.get("UserInformation").email,
                      web_framework: this.retail_web_framework,
                      is_get_product_image: true,
                      product_id: not_reviewed_product_details[0].product_id,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${this.$session.get("at")}`,
                      },
                    }
                  )
                  .then((response) => {
                    if (response.data.message.MSG_CODE === this.api_status_code.IMAGE_RECEIVED_SUCCESSFULLY.MSG_CODE) {
                      var product_review_img_url = response.data.data.image_src;
                      var msg = {
                        is_review_rating_product: true,
                        not_reviewed_product_details:
                          not_reviewed_product_details[0],
                        review_message_first: this.review_message_first,
                        review_message_second: this.review_message_second,
                        product_review_img_url: product_review_img_url,
                        product_rating: null,
                        product_review: "",
                        time: this.generate_time(),
                      };
                      this.chat.push(msg);
                      this.update_scrollbar("upto_end", "response");
                    } else if(response.data.message.MSG_CODE === this.api_status_code.IMAGE_NOT_FOUND.MSG_CODE) {
                      console.log(response.data.message.MSG);
                    }
                  });
              }
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
          toastr.error("Some Error Occurred.");
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    submit_review_rating(index) {
      if (Boolean(this.chat[index].product_rating) === false) {
        swal({
          text: "Please give rating",
          toast: true,
          showCancelButton: false,
          showConfirmButton: false,
          type: "warning",
          position: "top-end",
          timer: 5000,
        });
        return;
      }
      if (Boolean(this.chat[index].product_review) === false) {
        swal({
          text: "Please write review",
          toast: true,
          showCancelButton: false,
          showConfirmButton: false,
          type: "warning",
          position: "top-end",
          timer: 5000,
        });
        return;
      }
      var product_details = {
        product_id: this.chat[index].not_reviewed_product_details.product_id,
        name: this.chat[index].not_reviewed_product_details.name,
        image_src: this.chat[index].product_review_img_url,
        price: this.chat[index].not_reviewed_product_details.price,
        quantity: this.chat[index].not_reviewed_product_details.quantity,
        variant_id: this.chat[index].not_reviewed_product_details.variant_id,
      };
      if (this.retail_web_framework == "magento") {
        product_details.variant_id =
          this.chat[index].not_reviewed_product_details.sku;
      }
      axios
        .post(
          api_calls.product_review_rating(),
          {
            company_name: this.companyname,
            company_id: this.companyid,
            email: this.$session.get("UserInformation").email,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.bot_response_token_value,
            username: this.$session.get("UserInformation").email,
            is_save_review_rating: true,
            review_rating_customer_id: this.$session.get("shopify_customer_id"),
            review_rating_customer_email: this.$session.get(
              "shopify_customer_token"
            ),
            product_rating: this.chat[index].product_rating,
            product_review: this.chat[index].product_review,
            product_details: product_details,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then((response) => {
            if (response.data.message.MSG_CODE === this.api_status_code.REVIEW_SAVED_SUCCESSFULLY.MSG_CODE) {
              this.chat[index].is_review_rating_product = false;
              var msg = {
                received: this.review_response_message,
                conversation_only: true,
                receiving: true,
                time: this.generate_time(),
              };
              this.chat.push(msg);
              this.update_scrollbar("upto_end", "response");
              swal({
                text: this.review_response_message,
                toast: true,
                showCancelButton: false,
                showConfirmButton: false,
                type: "success",
                position: "top-end",
                timer: 5000,
              });
            } else if (response.data.message.MSG_CODE === this.api_status_code.REVIEW_NOT_SAVED.MSG_CODE) {
              swal({
                text: "Some Error Occurred.",
                toast: true,
                showCancelButton: false,
                showConfirmButton: false,
                type: "error",
                position: "top-end",
                timer: 5000,
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
          if (
            e.response.status === 410 ||
            e.response.status === 440 ||
            e.response.status === 409
          ) {
            this.$root.$emit("Session_Expired", e.response.data);
          }
        });
    },
    closecart(close_cart) {
      this.is_cense_cart = close_cart;
    },
    cart_communication(cart_data) {
      this.addtoCartdata = [];
      this.total_products_qty = 0;
      for (var i in cart_data) {
        this.addtoCartdata.push(cart_data[i]);
      }
      for (var j in this.addtoCartdata) {
        this.total_products_qty =
          this.total_products_qty + this.addtoCartdata[j].order_qty;
      }
    },
    update_quantity(func, chat_id, index, product) {
      var vm = this;
      this.over_qty_warning = false;
      var buy = parseInt(this.chat[chat_id].products_list[index].buy_qty);
      var order = this.chat[chat_id].products_list[index].order_qty;
      var stock = this.chat[chat_id].products_list[index].stock_quantity;
      if (this.retail_web_framework === "bigcommerce") {
        if (
          this.chat[chat_id].products_list[index].stock_status === "instock" &&
          this.chat[chat_id].products_list[index].stock_quantity === 0
        ) {
          stock = null;
        }
      }
      if (this.addtoCartdata.length !== 0 && stock != null) {
        for (var i in this.addtoCartdata) {
          if (this.addtoCartdata[i].id == product.id) {
            let cart_order_qty = this.addtoCartdata[i].order_qty;
            stock = stock - cart_order_qty;
          }
        }
      }
      var total = buy + order;
      if (func === "+") {
        this.chat[chat_id].products_list[index].order_qty = 1;
        if (total <= stock || (stock == null && !isNaN(total))) {
          this.chat[chat_id].products_list[index].buy_qty += 1;
          vm.$set(vm.chat, chat_id, vm.chat[chat_id]);
        } else {
          this.chat[chat_id].products_list[index].order_qty = 2;
          if (stock === 0) {
            this.chat[chat_id].products_list[index].buy_qty = 1;
          } else {
            this.chat[chat_id].products_list[index].buy_qty = stock;
          }
        }
      }
      if (func === "-") {
        if (buy > 1 && !isNaN(total)) {
          this.chat[chat_id].products_list[index].order_qty = 1;
          this.chat[chat_id].products_list[index].buy_qty -= 1;
          vm.$set(vm.chat, chat_id, vm.chat[chat_id]);
        } else {
          this.chat[chat_id].products_list[index].buy_qty = 1;
          this.chat[chat_id].products_list[index].order_qty = 1;
        }
      }
      if (func === "manual") {
        var quantity = Math.abs(parseInt(product.buy_qty));
        if (!isNaN(quantity)) {
          this.chat[chat_id].products_list[index].order_qty = 1;
          if (quantity) {
            if (quantity <= stock || stock == null) {
              this.chat[chat_id].products_list[index].buy_qty = quantity;
            } else {
              this.chat[chat_id].products_list[index].order_qty = 2;
              if (stock === 0) {
                this.chat[chat_id].products_list[index].buy_qty = 1;
              } else {
                this.chat[chat_id].products_list[index].buy_qty = stock;
              }
            }
            vm.$set(vm.chat, chat_id, vm.chat[chat_id]);
          }
        } else if (isNaN(total)) {
          this.chat[chat_id].products_list[index].buy_qty = 1;
          this.chat[chat_id].products_list[index].order_qty = 1;
          vm.$set(vm.chat, chat_id, vm.chat[chat_id]);
        }
      }
    },
    addproduct(product) {
      this.total_products_qty = 0;
      this.over_qty_warning = false;
      var audio = new Audio(sound);
      audio.play();
      var cart = $("#cense-cart-btn");
      var cart_qty = $("#cart-qty-num");
      var cart_img = $("#cart-img");
      if (this.addtoCartdata.length != 0 && product.buy_qty !== "") {
        var check = false;
        for (var i in this.addtoCartdata) {
          if (this.addtoCartdata[i].id == product.id) {
            check = true;
            var buy = product.buy_qty + this.addtoCartdata[i].order_qty;
            if (
              product.stock_quantity > this.addtoCartdata[i].order_qty &&
              buy <= product.stock_quantity
            ) {
              this.addtoCartdata[i].order_qty = buy;
              product.order_qty = 1;
              setTimeout(function () {
                cart_qty.addClass("cart-qty");
                cart_img.addClass("cart-img");
                cart.addClass("shake");
                setTimeout(function () {
                  cart_qty.removeClass("cart-qty");
                  cart_img.removeClass("cart-img");
                  cart.removeClass("shake");
                }, 500);
              }, 0);
            } else if (
              product.stock_quantity == null ||
              (product.stock_quantity == 0 &&
                product.stock_status === "instock")
            ) {
              this.addtoCartdata[i].order_qty = buy;
              product.order_qty = 1;
              setTimeout(function () {
                cart_qty.addClass("cart-qty");
                cart_img.addClass("cart-img");
                cart.addClass("shake");
                setTimeout(function () {
                  cart_qty.removeClass("cart-qty");
                  cart_img.removeClass("cart-img");
                  cart.removeClass("shake");
                }, 500);
              }, 0);
            } else {
              product.order_qty = 2;
              let res =
                product.stock_quantity - this.addtoCartdata[i].order_qty;
              product.buy_qty = res === 0 ? 1 : res;
              this.over_qty_warning = true;
            }
          }
        }
        if (
          check != true &&
          (product.buy_qty <= product.stock_quantity ||
            product.stock_quantity == null ||
            (product.stock_quantity == 0 && product.stock_status === "instock"))
        ) {
          this.addtoCartdata.push({
            id: product.id,
            img_url: product.img_url,
            price: product.price,
            stock_quantity: product.stock_quantity,
            order_qty: product.buy_qty,
            sku: this.retail_web_framework == 'bigcommerce' ? product.sku : '',
            buy_qty: 1,
            variant_title: product.variant_title,
            stock_status: product.stock_status,
            title: product.title,
          });
          setTimeout(function () {
            cart_qty.addClass("cart-qty");
            cart_img.addClass("cart-img");
            cart.addClass("shake");
            setTimeout(function () {
              cart_qty.removeClass("cart-qty");
              cart_img.removeClass("cart-img");
              cart.removeClass("shake");
            }, 500);
          }, 0);
        } else if (check != true && product.buy_qty > product.stock_quantity) {
          this.over_qty_warning = true;
        }
      } else if (
        (product.buy_qty <= product.stock_quantity && product.buy_qty !== "") ||
        product.stock_quantity == null ||
        (product.stock_quantity == 0 && product.stock_status === "instock")
      ) {
        this.addtoCartdata.push({
          id: product.id,
          img_url: product.img_url,
          price: product.price,
          stock_quantity: product.stock_quantity,
          order_qty: product.buy_qty,
          sku: this.retail_web_framework == 'bigcommerce' ? product.sku : '',
          buy_qty: 1,
          variant_title: product.variant_title,
          stock_status: product.stock_status,
          title: product.title,
        });
        setTimeout(function () {
          cart_qty.addClass("cart-qty");
          cart_img.addClass("cart-img");
          cart.addClass("shake");
          setTimeout(function () {
            cart_qty.removeClass("cart-qty");
            cart_img.removeClass("cart-img");
            cart.removeClass("shake");
          }, 500);
        }, 0);
      } else {
        this.over_qty_warning = true;
      }
      for (var j in this.addtoCartdata) {
        this.total_products_qty =
          this.total_products_qty + this.addtoCartdata[j].order_qty;
      }
    },
    selected_product(value) {
      if (event.target.checked) {
        if (value == "all") {
          this.checked_list = [];
          for (var i in this.product_out_of_stock_list) {
            this.checked_list.push(this.product_out_of_stock_list[i]);
          }
          $("input:checkbox").prop("checked", false);
          for (let i = 0; i < this.checked_list.length; i++) {
            $(
              "#product_checkbox_" +
                this.product_out_of_stock_list[i].product_id
            ).prop("checked", true);
            $("#selectall").prop("checked", true);
          }
        } else {
          this.checked_list.push(value);
        }
      } else if (!event.target.checked) {
        if (value != "all") {
          var selectall = document.querySelector("#selectall");
          if (selectall.checked) {
            selectall.checked = false;
          }
          var temp = this.checked_list.filter((product_id) => {
            return product_id != value;
          });
          this.checked_list = temp;
        } else {
          $("input:checkbox").prop("checked", false);
          for (let i = 0; i < this.checked_list.length; i++) {
            $(
              "#product_checkbox_" +
                this.product_out_of_stock_list[i].product_id
            ).prop("checked", false);
            $("#selectall").prop("checked", false);
          }
          this.checked_list = [];
        }
      }
    },
    check_current_product_active(index) {
      if (Boolean(this.product_out_of_stock_list[index]) === true) {
        return this.product_out_of_stock_list[index].product_id ===
          this.current_product.product_id
          ? "current-active-template"
          : null;
      }
    },
    show_product(index) {
      this.current_product = this.product_out_of_stock_list[index];
    },
    add_to_out_of_stock_list(items) {
      this.product_out_of_stock_list = items;
      this.checked_list = [];
      $("input:checkbox").prop("checked", false);
    },
    submit_out_of_stock_products() {
      if (this.checked_list.length == 0) {
        swal({
          text: "Please select some products",
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      } else if (
        this.customer_email == "" ||
        !this.reg_email.test(this.customer_email)
      ) {
        swal({
          text: "Please enter a valid email address",
          toast: true,
          position: "top-end",
          type: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      }
      swal({
        text: "Please wait while we are submitting your details...",
        type: "info",
        toast: true,
        showConfirmButton: false,
      });
      $("#notifyemail").modal("hide");
      this.spinnerOn = true;
      axios
        .post(
          api_calls.outofstockemailnotification(),
          {
            company_id: this.companyid,
            company_name: this.companyname,
            license_key: this.$session.get("UserInformation").license_key,
            email: this.customer_email,
            product_list: this.checked_list,
            token: this.bot_response_token_value,
            username: this.$session.get("UserInformation").email,
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
            swal({
              type: "success",
              text: "You'll be notified through email when the products get back in stock",
              timer: 2500,
            }).then((result) => {
              this.customer_email = "";
              this.checked_list = [];
              $("input:checkbox").prop("checked", false);
            });
          } else {
            console.log(response.data.message.MSG);
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
    refresh_chatbot(type) {
      this.refreshed_or_closed = true;
      axios
        .post(api_calls.chatbot_response_cense(), {
          license_key: this.$session.get("UserInformation").license_key,
          token: this.bot_response_token_value,
          username: this.$session.get("UserInformation").email,
          source: "Web",
          chat: "",
          data: "",
          role: this.$session.get("UserInformation").role,
          refreshed_or_closed: this.refreshed_or_closed,
        })
        .then((resp) => {
          this.refreshed_or_closed = false;
          let welcome_msg_companies = [
            "CustomerHappiness95185",
            "3x5ive99534",
            "Foreignxchange17491",
            "360_technology",
          ];
          if (type == "support") {
            this.chat.push({
              receiving: true,
              received: "Is there anything else I can help you with?",
              conversation_only: true,
              time: this.generate_time(),
            });
          }
          if (welcome_msg_companies.includes(this.companyid)) {
            axios
              .post(api_calls.chatbot_response_cense(), {
                chat: "/welcome_message",
                token: this.bot_response_token_value,
                username: this.$session.get("UserInformation").email,
                source: "Web",
                license_key: this.$session.get("UserInformation").license_key,
                data: "",
                role: this.$session.get("UserInformation").role,
                refreshed_or_closed: false,
              })
              .then((response) => {
                this.push_msg(response, response.data.responses);
              });
          } else {
            this.welcome_message_not_yet_received = false;
          }
        });
    },
    download_file(url, file_name) {
      event.preventDefault();
      var link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file_name);
      document.body.appendChild(link);
      link.click();
    },
    scroll_div() {
      var doc = document.querySelector(".buy-products");
      if (event.deltaX > event.deltaY) {
        doc.scrollLeft += 10;
      } else if (event.deltaX < event.deltaY) {
        doc.scrollLeft -= 10;
      }
    },
    scroll_div1(item) {
      var doc = document.querySelector(`#buy_product_id_${item}`);
      if (event.deltaX > event.deltaY) {
        doc.scrollLeft += 10;
      } else if (event.deltaX < event.deltaY) {
        doc.scrollLeft -= 10;
      }
    },
    scroll_div_right(item) {
      var doc = document.querySelector(`#buy_product_id_${item}`);
      doc.scrollLeft += 100;
    },
    scroll_div_left(item) {
      var doc = document.querySelector(`#buy_product_id_${item}`);
      doc.scrollLeft -= 100;
    },
    call_support(type) {
      if (type == "Yes") {
        axios
          .post(api_calls.chatbot_response_cense(), {
            license_key: this.$session.get("UserInformation").license_key,
            token: this.bot_response_token_value,
            username: this.$session.get("UserInformation").email,
            source: "Web",
            chat: "/call_support",
            token: this.bot_response_token_value,
            role: this.$session.get("UserInformation").role,
            refreshed_or_closed: this.refreshed_or_closed,
          })
          .then((resp) => {
            this.chat.push({
              conversation_only: true,
              receiving: true,
              received: resp.data.responses[0].text,
              time: this.generate_time(),
            });
            // this.$session.set("BotResponse_Conversation", this.chat);
            this.update_scrollbar("upto_end", "response");
          });
      } else if (type == "No") {
        this.chat.push(this.chat[0]);
        this.chat.push(this.chat[1]);
        this.update_scrollbar("upto_end", "response");
        // this.refresh_chatbot("support");
      }
    },
    parse(string) {
      return string.replace(/{{.*?}}/g, (match) => {
        var today = new Date();
        var dd = today.getDate();

        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) {
          dd = "0" + dd;
        }

        if (mm < 10) {
          mm = "0" + mm;
        }
        today = dd + "-" + mm + "-" + yyyy;
        var expression = match.slice(2, -2);
        this.$data[expression] = today;
        return this.$data[expression];
      });
    },
    show_popup() {
      this.show = false;
      this.stop = false;
    },
    sub_leaf_node_call(divclick) {
      // var divclick = event.target.innerText
      if (divclick == "Watch Demo Video") {
        this.demourlbind = true;
        this.reviewsurlbind = false;
      } else if (divclick == "User Reviews/Testimonials") {
        this.reviewsurlbind = true;
        this.demourlbind = false;
      }
      if (
        divclick == "Watch Demo Video" ||
        divclick == "User Reviews/Testimonials"
      ) {
        this.show = !this.show;
        this.update_scrollbar();
        setTimeout(() => {
          this.is_typing_indicator_on = false;
        }, 1000);
      } else if (divclick == "Buy Tutorial") {
        this.cense_enquiry = true;
        axios
          .post(api_calls.chatbot_response_cense(), {
            username: this.$session.get("UserInformation").email,
            token: this.bot_response_token_value,
            chat: "/personal_details",
            source: "Web",
            license_key: this.$session.get("UserInformation").license_key,
            role: this.$session.get("UserInformation").role,
            refreshed_or_closed: "",
          })
          .then((response) => {
            var msg = {
              received: response.data.responses[0].text,
              conversation_only: true,
              receiving: true,
              time: this.generate_time(),
            };
            this.chat.push(msg);
            this.update_scrollbar();
            setTimeout(() => {
              this.is_typing_indicator_on = false;
            }, 1000);
            // this.$session.set("BotResponse_Conversation", this.chat);
          });
      }
    },
    ticket_number() {
      let random_num = Math.floor(1000000 + Math.random() * 9000000);
      let company = this.companyname.slice(0, 1).toUpperCase();
      return `${company}_${random_num}`;
    },
    remove_custom_button(index){
      var vm = this;
      if (
        vm.chat[index] &&
        vm.chat[index].removable == true
      ) {
        document
          .querySelector("#chat" + index)
          .classList.add("--delete");
        setTimeout(() => {
          vm.chat.splice(index, 1);
        }, 850);
      }
    },
    custom_button_click(button, index){
      if(Boolean(button.type) && Boolean(button.type === 'web_url')){
        this.remove_custom_button(index);
        window.open(button.value, "_blank");
      }else{
        this.send_message('is_button', button, index);
      }
    },
    send_message(type, message, to_be_displayed) {
      event.preventDefault();
      if (this.selected_indication[0] != undefined) {
        if (type == "is_button") {
          this.to_send = message.value + JSON.stringify(this.res);
        } else {
          type = "is_prompt";
          to_be_displayed = this.to_send;
          this.to_send =
            this.selected_indication[0].value.split("{")[0] +
            JSON.stringify(this.res);
        }
      }
      if (type == "is_button") {
        if (
          message.value == "isdisabled" &&
          this.companyid == "clinicaltrials81352" &&
          message.title == "No"
        ) {
        } else if (message.value === "/live_chat") {
          this.start_live_chat();
        } else {
          var vm = this;
          function send_msg(toSend, customDisplayMsg) {
            vm.is_typing_indicator_on = true;
            vm.update_scrollbar("upto_end", "sender");
            setTimeout(() => {
              vm.chat.push({
                sent: customDisplayMsg
                  ? `${message.title} ${customDisplayMsg}`
                  : message.title,
                sending: true,
                time: vm.generate_time(),
                conversation_only: true,
                delivered: true,
                dropdown: "",
              });
            }, 850);
            vm.remove_custom_button(to_be_displayed);
            if (
              vm.chat[to_be_displayed - 1] &&
              vm.chat[to_be_displayed - 1].is_multiselect &&
              (message.title == "Approve" ||
                message.title == "Reject" ||
                message.title == "Comment and Return")
            ) {
              vm.chat[to_be_displayed - 1].disabled = true;
            }
            axios
              .post(api_calls.chatbot_response_cense(), {
                chat: toSend,
                token: vm.bot_response_token_value,
                username: vm.$session.get("UserInformation").email,
                source: "Web",
                license_key: vm.$session.get("UserInformation").license_key,
                role: vm.$session.get("UserInformation").role,
                refreshed_or_closed: vm.refreshed_or_closed,
              })
              .then((response) => {
                vm.response_handling(response);
              });
            vm.selected_indication = [];
            vm.to_send = "";
          }

          if (this.companyid == "360_technology") {
            if (
              this.chat[to_be_displayed - 1] &&
              this.chat[to_be_displayed - 1].value_mapping
            ) {
              let valueMappingData = JSON.parse(
                JSON.stringify(this.chat[to_be_displayed - 1].value_mapping)
              );
              this.adddropdownvalue(valueMappingData).then(() => {
                this.to_send = message.value + JSON.stringify(this.res);
                if (this.chat[to_be_displayed - 1].value_mapping) {
                  if (valueMappingData.length === 0) {
                    send_msg(message.value);
                  } else {
                    send_msg(
                      this.to_send,
                      `for ${this.selected_indication
                        .map((obj) => {
                          return obj.title;
                        })
                        .toString()}`
                    );
                  }
                }
              });
            } else if (message.value.split("{").length > 1) {
              let customDisplayMsg = Object.values(
                JSON.parse(`{${message.value.split("{")[1]}`)
              )[0];
              send_msg(message.value, `for ${customDisplayMsg}`);
            } else if (
              this.chat[to_be_displayed - 1] &&
              this.chat[to_be_displayed - 1].show_text_area
            ) {
              send_msg(message.value);
              this.chat[to_be_displayed - 1].disabled = true;
            } else {
              send_msg(message.value);
            }
          } else {
            send_msg(message.value);
          }
        }
      } else if (type == "is_prompt") {
        this.is_typing_indicator_on = true;
        this.chat.push({
          sent: to_be_displayed,
          sending: true,
          time: this.generate_time(),
          conversation_only: true,
          delivered: true,
        });
        this.update_scrollbar("upto_end", "sender");
        axios
          .post(api_calls.chatbot_response_cense(), {
            // host: this.user_data.host,
            role: this.$session.get("UserInformation").role,
            license_key: this.$session.get("UserInformation").license_key,
            token: this.bot_response_token_value,
            username: this.$session.get("UserInformation").email,
            source: "Web",
            chat: this.to_send,
          })
          .then((response) => {
            this.response_handling(response);
            this.ex1();
          });
      } else if (this.to_send == "Restart" || this.to_send == "restart") {
        axios
          .post(api_calls.prompt_url(), {
            uid: "cense", // this.fingerprint
            company_id: this.$session.get("UserInformation").company_id,
            license_key: this.$session.get("UserInformation").license_key,
            chat: "",
          })
          .then((response) => {
            this.chat.push(response.data);
            this.update_scrollbar("upto_end", "response");
            // this.$session.set("BotResponse_Conversation", this.chat);
            this.level = response.data.level;
          })
          .catch((e) => {});
      } else if (this.cense_enquiry == true && Boolean(this.to_send)) {
        this.is_typing_indicator_on = true;
        var send_msg = {
          sent: this.to_send,
          conversation_only: true,
          sending: true,
          time: this.generate_time(),
        };
        this.chat.push(send_msg);
        // this.$session.set("BotResponse_Conversation", this.chat);
        this.update_scrollbar("upto_end");
        axios
          .post(api_calls.chatbot_response_cense(), {
            username: this.$session.get("UserInformation").email,
            token: this.bot_response_token_value,
            chat: "/personal_details",
            source: "Web",
            company_id: "CO00023",
            data: "",
            role: this.$session.get("UserInformation").role,
            refreshed_or_closed: "",
            license_key: this.$session.get("UserInformation").license_key,
          })
          .then((response) => {
            var msg = {
              received: response.data.responses[0].text,
              conversation_only: true,
              receiving: true,
              time: this.generate_time(),
            };
            this.chat.push(msg);
            // this.$session.set("BotResponse_Conversation", this.chat);
            this.refreshed_or_closed = false;
            this.update_scrollbar("upto_end", "response");
          })
          .catch((e) => {
            this.is_typing_indicator_on = false;
          });
      } else if (this.live_chat_on) {
        // LIVE CHAT ON CUSTOMER MESSAGES
        if (Boolean(this.to_send)) {
          if (Boolean(this.user_name) === false) {
            this.channel.push("new_name", { name: this.to_send });
            this.user_name = this.to_send;
            this.update_scrollbar("upto_end", "response");
          } else {
            this.channel.push("new_name", { name: this.user_name });
            this.channel.push("new_chat_message", { message: this.to_send });
            this.update_scrollbar("upto_end", "response");
          }
          this.chat.push({
            sent: this.to_send,
            sending: true,
            conversation_only: true,
            time: this.generate_time(),
          });
          // this.$session.set("BotResponse_Conversation", this.chat);
          this.update_scrollbar("upto_end", "sender");
        }
      } else if (Boolean(this.to_send) && this.cense_enquiry != true) {
        this.chat.push({
          conversation_only: true,
          sending: true,
          sent: this.to_send,
          time: this.generate_time(),
        });
        // this.$session.set("BotResponse_Conversation", this.chat);
        this.update_scrollbar("upto_end", "sender");
        axios
          .post(api_calls.chatbot_response_cense(), {
            license_key: this.$session.get("UserInformation").license_key,
            token: this.bot_response_token_value,
            username: this.$session.get("UserInformation").email,
            source: "Web",
            chat: this.to_send,
            token: this.bot_response_token_value,
            role: this.$session.get("UserInformation").role,
            refreshed_or_closed: this.refreshed_or_closed,
          })
          .then((response) => {
            this.response_handling(response);
          })
          .catch((e) => {
            this.update_scrollbar("upto_end", "response");
          });
      }
      this.to_send = "";
    },
    initiate_support_chat() {
      this.chat.push({
        receiving: true,
        received: "Sorry I am not getting your question",
        conversation_only: true,
      });
      this.chat.push({
        receiving: true,
        received: "Would you like to talk with support team?",
        conversation_only: true,
        show_buttons: true,
        support_buttons: true,
        time: this.generate_time(),
      });
      this.update_scrollbar("upto_end", "response");
    },
    disconnect_support_chat() {
      this.channel.push("stopped_chat", {
        name: this.user_name,
        message: " has ended the conversation.",
      });
      this.channel.leave();
      this.live_chat_token = null;
      this.chat_group_name = null;
      this.support_agent_info = null;
      this.user_name = "";
      this.chat_socket.disconnect();
      this.live_chat_on = false;
    },
    generate_payment(price, name) {
      var vm = this;
      var options = {
        key: "rzp_test_SnDTaPnncfliDt",
        amount: price * 100,
        company_id: this.$session.get("UserInformation").company_id,
        company_name: this.$session.get("UserInformation").company_name,
        name: "Cense AI",
        currency: "INR",
        description: "Instill Intelligence",
        image: "/img/cense_image.png", // COMPANY LOGO
        handler: function (response) {
          var contact = $('#contact[type="tel"]').value;
          var email = $('#email[type="email"]').value;
          vm.paymentid = response.razorpay_payment_id;

          if (transfer_account != null) {
            vm.transfer_payment(transfer_account, price * 100, "INR", name);
          }
        },
        prefill: {
          name: "", // pass customer name
          email: "", // customer email
          contact: "", // customer phone no.
        },
        notes: {
          address: "address", // customer address
        },
        theme: {
          color: "#283777", // screen color
        },
      };
      var rzp1 = new Razorpay(options);
      rzp1.open();
      event.preventDefault();
    },
    chat_response_error() {
      this.chat.push({
        conversation_only: true,
        receiving: true,
        received: "Sorry I'm not getting your question",
        time: this.generate_time(),
      });
      // this.$session.set("BotResponse_Conversation", this.chat);
      this.update_scrollbar("upto_end", "response");
    },
    send_request_json(message) {
      axios
        .post(api_calls.chatbot_response_cense(), {
          license_key: this.$session.get("UserInformation").license_key,
          token: this.bot_response_token_value,
          username: this.$session.get("UserInformation").email,
          token: this.bot_response_token_value,
          role: this.$session.get("UserInformation").role,
          refreshed_or_closed: this.refreshed_or_closed,
          chat: "",
          source: "Web",
          data: this.json_data[message.responses[0].intent],
        })
        .then((resp) => {
          this.chat.push({
            conversation_only: true,
            receiving: true,
            received:
              resp.data.responses.length == 0
                ? "Sorry I'm not getting your question"
                : resp.data.responses[0].text,
            time: this.generate_time(),
            image:
              resp.data.responses[0].img == ""
                ? null
                : resp.data.responses[0].img,
          });
          // this.$session.set("BotResponse_Conversation", this.chat);
          this.update_scrollbar("upto_end", "response");
        });
    },
    response_handling(response, type) {
      var i = 0;
      var delay = 50;
      var vm = this;
      vm.is_typing_indicator_on = true;
      setTimeout(() => {
        handle_response();
      }, delay);
      function handle_response() {
        setTimeout(() => {
          vm.is_typing_indicator_on = false;
          if (response.data == null || response.data.responses.length == 0) {
            vm.chat_response_error();
          } else if (Boolean(response.data.responses[i].request_json) == true) {
            if (response.data.responses[i].text != null) {
              vm.chat.push({
                conversation_only: true,
                receiving: true,
                received: response.data.responses[i].text,
                time: vm.generate_time(),
                image: response.data.responses[i].img,
                video: response.data.responses[i].video,
              });
              // vm.$session.set("BotResponse_Conversation", vm.chat);
              vm.update_scrollbar("upto_end", "response");
            }
            if (response.data.responses[i].intent == "gogyb450_create_ticket") {
              var name = `${vm.$session.get("UserInformation").first_name} ${
                vm.$session.get("UserInformation").last_name
              }`;
              var payload = {
                username: name,
                company_name: vm.companyname,
                company_id: vm.companyid,
                user_role: vm.$session.get("UserInformation").role,
                email: vm.$session.get("UserInformation").email,
                license_key: vm.$session.get("UserInformation").license_key,
                token: vm.$session.get("UserInformation").tokens,
                ticket_issue: "",
                ticket_number: vm.ticket_number(),
                description: "",
                file_content: null,
                file_name: null,
                isEdit: false,
              };
              payload = JSON.stringify(payload);
              axios
                .post(api_calls.chatbot_response_cense(), {
                  license_key: vm.$session.get("UserInformation").license_key,
                  token: vm.bot_response_token_value,
                  username: vm.$session.get("UserInformation").email,
                  token: vm.bot_response_token_value,
                  role: vm.$session.get("UserInformation").role,
                  refreshed_or_closed: vm.refreshed_or_closed,
                  chat: "",
                  source: "Web",
                  data: payload,
                })
                .then((resp) => {
                  vm.chat.push({
                    conversation_only: true,
                    receiving: true,
                    received:
                      resp.data.responses.length == 0
                        ? "Sorry I'm not getting your question"
                        : resp.data.responses[i].text,
                    time: vm.generate_time(),
                    image: resp.data.responses[i].img,
                    video: resp.data.responses[i].video || null,
                  });
                  // vm.$session.set("BotResponse_Conversation", vm.chat);
                  vm.new_update_response(i);
                });
            } else if (
              response.data.responses[i].intent == "create_appointment"
            ) {
              let today_date = new Date();
              axios
                .post(api_calls.schedule_appointment_url(), {
                  company_name: vm.companyname,
                  company_id: vm.companyid,
                  Date:
                    today_date.getFullYear() +
                    "-" +
                    (today_date.getMonth() < 9
                      ? "0" + (today_date.getMonth() + 1)
                      : today_date.getMonth() + 1) +
                    "-" +
                    today_date.getDate(), // Month object document it
                  // Date: start_time,
                })
                .then((response) => {
                  // console.log(response.data);
                  // this.time_slots = this.full_time_slots;
                  // if (response.data.Slot != undefined) {
                  //   if (response.data.Slot.length > 0) {
                  //     let index;
                  //     for (var i in response.data.Slot) {
                  //       index = this.time_slots.indexOf(response.data.Slot[i]);
                  //       if (index != -1) {
                  //         this.time_slots.splice(index, 1);
                  //       }
                  //     }
                  //   } else {
                  //   }
                  // }
                })
                .catch((e) => {
                  console.log(e);
                });
            } else {
              vm.send_request_json(response.data);
            }
          } else if (
            response.data.responses[i].intent == "re_order_products_action"
          ) {
            // vm.send_retail_customer_id();
            let msg = {
              conversation_only: true,
              time:
                i == response.data.responses.length - 1
                  ? vm.generate_time()
                  : null,
              ask_feedback: Boolean(response.data.responses[i].ask_feedback),
            };
            msg.receiving = true;
            msg.fetch_shopify_details = true;
            msg.is_refund = false;
            msg.return_shopify_email = true;
            msg.received =
              "Please login with your credentials for better experience :)";
            msg.metadata = {
              entity: response.data.responses[i].entity,
              text: response.data.responses[i].text,
            };
            vm.chat.push(msg);
            // vm.send_retail_customer_id(null,false,response.data.responses[i]);
          } else if (
            response.data.responses[i].intent == "support_subscription_data"
          ) {
            // vm.send_retail_customer_id();
            vm.support_subscription_data();
          } else if (response.data.responses[i].intent == "product_by_date") {
            vm.is_typing_indicator_on = true;
            let cutoff = new Date();
            var current_date_time = moment(cutoff).format(
              "YYYY-MM-DD HH:mm:ss"
            );

            let form_payload = JSON.stringify({
              usr_msg: response.data.responses[i].usr_msg,
              current_user_date: current_date_time,
            });

            axios
              .post(api_calls.chatbot_response_cense(), {
                license_key: vm.$session.get("UserInformation").license_key,
                token: vm.bot_response_token_value,
                username: vm.$session.get("UserInformation").email,
                token: vm.bot_response_token_value,
                role: vm.$session.get("UserInformation").role,
                refreshed_or_closed: vm.refreshed_or_closed,
                chat: `/product_by_date${form_payload}`,
                source: "Web",
              })
              .then((response) => {
                vm.response_handling(response);
              });
          } else if (
            Boolean(response.data.responses[i].return_intent) == true
          ) {
            this.is_typing_indicator_on = true;
            axios
              .post(api_calls.chatbot_response_cense(), {
                license_key: vm.$session.get("UserInformation").license_key,
                token: vm.bot_response_token_value,
                username: vm.$session.get("UserInformation").email,
                token: vm.bot_response_token_value,
                role: vm.$session.get("UserInformation").role,
                refreshed_or_closed: vm.refreshed_or_closed,
                chat: "/" + response.data.responses[i].intent,
                source: "Web",
              })
              .then((response) => {
                vm.handle_response(response);
              });
          } else if (
            vm.companyid == "3x5ive99534" &&
            response.data.responses[i].intent != undefined &&
            response.data.responses[i].intent == "confusion"
          ) {
            vm.confusion_message("/need_help");
          } else if (
            response.data.responses[i].buttons != undefined &&
            response.data.responses[i].buttons.length > 0
          ) {
            vm.load_buttons(response.data.responses[i], i, type);
          } else if (
            Boolean(response.data.responses[i].custom) &&
            response.data.responses[i].custom.type
          ) {
            // CHange  the condition here
            if (
              response.data.responses[i].custom.type != undefined &&
              response.data.responses[i].custom.type == "multiselect_dropdown"
            ) {
              vm.multiselect_load(response.data.responses[i], i);
            } else if (
              response.data.responses[i].custom.type != undefined &&
              response.data.responses[i].custom.type == "table"
            ) {
              vm.load_table(response.data.responses[i], i);
            } else if (
              response.data.responses[i].custom.type != undefined &&
              response.data.responses[i].custom.type == "retail"
            ) {
              vm.display_products_chat(response.data.responses[i], i, type);
            } else if (response.data.responses[i].custom.show_text_area) {
              vm.load_text_area(response.data.responses[i], i);
            } else if (response.data.responses[i].custom.buttons != undefined) {
              vm.load_buttons(response.data.responses[i].custom, i, type);
            }
          } else if (
            Boolean(response.data.responses[i].messaging_platforms) &&
            response.data.responses[i].messaging_platforms.length > 0
          ) {
            var msg = {
              // conversation_only: true,
              time:
                i == response.data.responses.length - 1
                  ? vm.generate_time()
                  : null,
              ask_feedback: Boolean(response.data.responses[i].ask_feedback),
              show_messaging_platforms: true,
              messaging_platforms_data:
                response.data.responses[i].messaging_platforms,
            };
            vm.chat.push(msg);
          } else if (Boolean(response.data.responses[i].is_preview_banner)) {
            vm.display_banner(response.data.responses, i);
          } else if (Boolean(response.data.responses[i].is_display_banner)) {
            vm.display_banner(response.data.responses, i);
          } else {
            var msg = {
              conversation_only: true,
              time:
                i == response.data.responses.length - 1
                  ? vm.generate_time()
                  : null,
              ask_feedback: Boolean(response.data.responses[i].ask_feedback),
            };
            if (response.data.responses.length == 0) {
              msg.received = "Sorry we are not getting your question.";
              msg.receiving = true;
            } else if (
              response.data.responses[i].template === "utter_default"
            ) {
              msg.receiving = true;
              msg.received = response.data.responses[i].message
                .split("{email}")
                .join(vm.contact_help_email);
              vm.chat.push(msg);
            } else if (
              response.data.responses[i].text != undefined &&
              vm.url_match_regex.test(response.data.responses[i].text)
            ) {
              vm.display_file_chat(response.data.responses[i].text);
            } else if (
              response.data.responses[i].get_company_details === "True" &&
              response.data.responses[i].intent === "cense_support_ticket"
            ) {
              let c_id = vm.return_document_cookies("company_id");
              let c_name = vm.return_document_cookies("company_name");
              let c_email = vm.return_document_cookies("company_email");
              axios
                .post(api_calls.chatbot_response_cense(), {
                  license_key: vm.$session.get("UserInformation").license_key,
                  token: vm.bot_response_token_value,
                  username: vm.$session.get("UserInformation").email,
                  token: vm.bot_response_token_value,
                  role: vm.$session.get("UserInformation").role,
                  refreshed_or_closed: vm.refreshed_or_closed,
                  chat: JSON.stringify({
                    company_id: c_id,
                    company_name: c_name,
                    email: c_email,
                  }),
                  source: "Web",
                })
                .then((response) => {
                  vm.response_handling(response);
                });
            } else if (
              response.data.responses[i].text != undefined &&
              !response.data.responses[i].text.includes(
                "Download your manifest here"
              )
            ) {
              msg.received = response.data.responses[i].text;
              msg.receiving = true;
              msg.image = response.data.responses[i].img;
              msg.image = response.data.responses[i].image;
              msg.videos = response.data.responses[i].video || false;
              msg.order_status = response.data.responses[i].order_status;
              msg.is_order_status =
                response.data.responses[i].is_order_status || false;
              msg.offers = response.data.responses[i].offers || false;
              msg.fetch_shopify_details =
                response.data.responses[i].fetch_shopify_details || false;
              msg.order_items = response.data.responses[i].order_items;
              msg.shopify_fetch_customer_id_for_offers =
                response.data.responses[i]
                  .shopify_fetch_customer_id_for_offers || false;
              if (msg.offers.length < 1) {
                msg.offers = false;
                msg.received =
                  response.data.responses[i].text;
              }
              // Sorry we do not hav any offers currently, please check back later.";
              vm.chat.push(msg);
              vm.new_update_response(i);
            } else if (response.data.responses[i].intent == "chat_support") {
              vm.start_live_chat();
            } else if (
              response.data.responses[i].text != undefined &&
              (response.data.responses[i].text.includes(
                "Download your manifest here"
              ) ||
                response.data.responses[i].text.includes(/.pdf/))
            ) {
              vm.display_file_chat(response.data.responses[i]);
            } else if (
              Boolean(response.data.responses[i].products) &&
              (response.data.responses[i].products.length > 0 ||
                Object.keys(response.data.responses[i].products).length)
            ) {
              vm.display_products_chat(response.data.responses[i], i, type);
            } else if (response.data.responses[i].is_refund == "True") {
              vm.load_refunds(response.data.responses[i]);
            } else if (
              response.data.responses[i].shopify_fetch_customer_id === true
            ) {
              vm.retail_check_customer_logged_in();
            } else if (response.data.responses[i].image != undefined) {
              msg.image = response.data.responses[i].image;
              msg.receiving = true;
              vm.chat.push(msg);
              vm.new_update_response(i);
            } else if (response.data.responses[i].video != undefined) {
              msg.videos = response.data.responses[i].video || false;
              msg.receiving = true;
              vm.chat.push(msg);
              vm.new_update_response(i);
            } else if (
              response.data.responses[i].card != undefined &&
              response.data.responses[i].card.length !== 0
            ) {
              msg.carousel_card_list = response.data.responses[i].card;
              vm.chat.push(msg);
              vm.new_update_response(i);
            }
          }
          if (i < response.data.responses.length - 1) {
            i += 1;
            vm.is_typing_indicator_on = true;
            delay = 500;
            handle_response();
          }
        }, delay);
      }
    },
    display_banner(response, i) {
      var vm = this;
      var position_1 = response[i].banner_content_position[0]["id"];
      var position_2 = response[i].banner_content_position[1]["id"];
      var position_3 = response[i].banner_content_position[2]["id"];
      var is_data_position_1 = response[i][position_1];
      var is_data_position_2 = response[i][position_2];
      var is_data_position_3 = response[i][position_3];
      if (Boolean(is_data_position_1)) {
        var msg = {
          conversation_only: true,
          time:
            i == response.length - 1 &&
            !(Boolean(is_data_position_2) || Boolean(is_data_position_3))
              ? vm.generate_time()
              : null,
          ask_feedback: Boolean(response[i].ask_feedback),
          banner_img_link: response[i].banner_img_link,
        };
        msg.show_bot_img = true;
        msg["show_" + position_1] = true;
        msg[position_1] = is_data_position_1;
        vm.chat.push(msg);
        vm.new_update_response(i);
        if (Boolean(is_data_position_2)) {
          var msg = {
            conversation_only: true,
            time:
              i == response.length - 1 && !Boolean(is_data_position_3)
                ? vm.generate_time()
                : null,
            ask_feedback: Boolean(response[i].ask_feedback),
            banner_img_link: response[i].banner_img_link,
          };
          msg.show_bot_img = false;
          msg["show_" + position_2] = true;
          msg[position_2] = is_data_position_2;
          vm.chat.push(msg);
          vm.new_update_response(i);
        }
        if (Boolean(is_data_position_3)) {
          var msg = {
            conversation_only: true,
            time: i == response.length - 1 ? vm.generate_time() : null,
            ask_feedback: Boolean(response[i].ask_feedback),
            banner_img_link: response[i].banner_img_link,
          };
          msg.show_bot_img = false;
          msg["show_" + position_3] = true;
          msg[position_3] = is_data_position_3;
          vm.chat.push(msg);
          vm.new_update_response(i);
        }
      } else if (Boolean(is_data_position_2)) {
        var msg = {
          conversation_only: true,
          time:
            i == response.length - 1 && !Boolean(is_data_position_3)
              ? vm.generate_time()
              : null,
          ask_feedback: Boolean(response[i].ask_feedback),
          banner_img_link: response[i].banner_img_link,
        };
        msg.show_bot_img = true;
        msg["show_" + position_2] = true;
        msg[position_2] = is_data_position_2;
        vm.chat.push(msg);
        vm.new_update_response(i);
        if (Boolean(is_data_position_3)) {
          var msg = {
            conversation_only: true,
            time: i == response.length - 1 ? vm.generate_time() : null,
            ask_feedback: Boolean(response[i].ask_feedback),
            banner_img_link: response[i].banner_img_link,
          };
          msg.show_bot_img = false;
          msg["show_" + position_3] = true;
          msg[position_3] = is_data_position_3;
          vm.chat.push(msg);
          vm.new_update_response(i);
        }
      } else if (Boolean(is_data_position_3)) {
        var msg = {
          conversation_only: true,
          time: i == response.length - 1 ? vm.generate_time() : null,
          ask_feedback: Boolean(response[i].ask_feedback),
          banner_img_link: response[i].banner_img_link,
        };
        msg.show_bot_img = true;
        msg["show_" + position_3] = true;
        msg[position_3] = is_data_position_3;
        vm.chat.push(msg);
        vm.new_update_response(i);
      }
    },
    push_msg(responses, response) {
      var index = 0;
      var vm = this;
      var delay = 50;
      for (let i = 0; i < response.length; i++) {
        setTimeout(() => {
          var msg = response[i];
          vm.is_typing_indicator_on = true;
          vm.is_typing_indicator_on = false;
          if (
            responses.data.responses[i].buttons != undefined &&
            Boolean(responses.data.responses[i].buttons.length > 0)
          ) {
            vm.load_buttons(
              responses.data.responses[i],
              "is_button",
              "welcome_message",
              true
            );
          } else {
            vm.chat.push({
              conversation_only: true,
              receiving: true,
              received: msg.text,
              offers: msg.offers || false,
              time: i == response.length - 1 ? vm.generate_time() : undefined,
            });
          }
          if (this.greeting_buttons_position == i) {
            if (vm.is_retail_bot) vm.load_chatbot_integration_details();
          }
        }, i * 1050);
        $(".time").last().css("display", "none");
        setTimeout(() => {
          $(".time").last().css("display", "block");
          if (i < response.length - 1) {
          } else {
            vm.welcome_message_not_yet_received = false;
          }
        }, 500);
      }
      setTimeout(() => {
        vm.demo_retail_question();
      }, delay);
    },
    confusion_message(msg_string) {
      axios
        .post(api_calls.chatbot_response_cense(), {
          chat: msg_string,
          token: this.bot_response_token_value,
          username: this.$session.get("UserInformation").email,
          source: "Web",
          license_key: this.$session.get("UserInformation").license_key,
          data: "",
          role: this.$session.get("UserInformation").role,
          refreshed_or_closed: false,
        })
        .then((response) => {
          this.response_handling(response);
        });
    },
    display_products_chat(message, index, type) {
      var msg = {
        conversation_only: true,
        time: this.generate_time(),
      };
      if (message.products.is_products_list) {
        msg.is_products_list = message.products.is_products_list;
        msg.products_list = message.products.products_list;
        if (message.products.products_list.length === 0) {
          msg.received = "Sorry, we could not find what you searched for";
          msg.receiving = true;
        }
        if (Boolean(message.products.text) === true) {
          msg.received = message.products.text;
          msg.receiving = true;
        }
        this.product_out_of_stock_list = [];

        if (this.retail_web_framework == "shopify") {
          msg.products_list.forEach((product) => {
            for (let i = 0; i < product.variations.length; i++) {
              this.product_list.push({
                product_id: product.variations[i].id,
                product_title: product.title,
                variant_title: product.variations[i].variant_title,
                variant_id: product.variations[i].id,
                stock_status: product.variations[i].stock_status || "instock",
                back_in_stock: false,
                productImage:
                  product.variations[i].img_url == null
                    ? product.img_url
                    : product.variations[i].img_url,
                onlineStoreURL: product.variations[i].permalink,
              });
            }
          });
        } else if (this.retail_web_framework == "woocommerce") {
          msg.products_list.forEach((product) => {
            if (product.variations && product.variations.length > 0) {
              for (let i = 0; i < product.variations.length; i++) {
                this.product_list.push({
                  product_id: product.id,
                  product_title: product.title,
                  variant_title: product.variations[i].variant_title,
                  variant_id: product.variations[i].id,
                  stock_status: product.variations[i].stock_status || "instock",
                  back_in_stock: false,
                  productImage:
                    product.variations[i].img_url == null
                      ? product.img_url
                      : product.variations[i].img_url,
                  onlineStoreURL: product.permalink,
                });
              }
            } else {
              this.product_list.push({
                product_id: product.id,
                product_title: product.title,
                variant_title: null,
                variant_id: null,
                stock_status: product.stock_status || "instock",
                back_in_stock: false,
                productImage: product.img_url,
                onlineStoreURL: product.permalink,
              });
            }
          });
        } else if (this.retail_web_framework == "magento") {
          msg.products_list.forEach((product) => {
            if (product.variations && product.variations.length > 0) {
              for (let i = 0; i < product.variations.length; i++) {
                this.product_list.push({
                  product_id: product.id,
                  product_title: product.title,
                  variant_title: product.variations[i].variant_title,
                  variant_id: product.variations[i].id,
                  stock_status: product.stock_status || "instock",
                  back_in_stock: false,
                  productImage:
                    product.variations[i].img_url == null
                      ? product.img_url
                      : product.variations[i].img_url,
                  onlineStoreURL: product.variations[i].permalink,
                });
              }
            } else {
              this.product_list.push({
                product_id: product.id,
                product_title: product.title,
                variant_title: null,
                variant_id: null,
                stock_status: product.stock_status || "instock",
                back_in_stock: false,
                productImage: product.img_url,
                onlineStoreURL: product.permalink,
              });
            }
          });
        } else if (this.retail_web_framework == "bigcommerce") {
          msg.products_list.forEach((product) => {
            if (product.variations && product.variations.length > 0) {
              for (let i = 0; i < product.variations.length; i++) {
                this.product_list.push({
                  product_id: product.id,
                  product_title: product.title,
                  variant_title: product.variations[i].variant_title,
                  variant_id: product.variations[i].id,
                  stock_status: product.stock_status || "instock",
                  back_in_stock: false,
                  productImage:
                    product.variations[i].img_url == null
                      ? product.img_url
                      : product.variations[i].img_url,
                  onlineStoreURL: product.variations[i].permalink,
                });
              }
            } else {
              this.product_list.push({
                product_id: product.id,
                product_title: product.title,
                variant_title: null,
                variant_id: null,
                stock_status: product.stock_status || "instock",
                back_in_stock: false,
                productImage: product.img_url,
                onlineStoreURL: product.permalink,
              });
            }
          });
        }
        for (var i in msg.products_list) {
          msg.products_list[i].buy_qty = 1;
          msg.products_list[i].order_qty = 1;
          if (
            msg.products_list[i].variations &&
            msg.products_list[i].variations.length > 0
          ) {
            msg.products_list[i].id = msg.products_list[i].variations[0].id;
            msg.products_list[i].img_url =
              msg.products_list[i].variations[0].img_url === null
                ? msg.products_list[i].img_url
                : msg.products_list[i].variations[0].img_url;
            msg.products_list[i].permalink =
              msg.products_list[i].variations[0].permalink;
            msg.products_list[i].variant_title =
              msg.products_list[i].variations[0].variant_title;
            msg.products_list[i].stock_quantity =
              msg.products_list[i].variations[0].stock_quantity;
            msg.products_list[i].stock_status =
              msg.products_list[i].variations[0].stock_status;
            msg.products_list[i].price =
              msg.products_list[i].variations[0].price;
            msg.products_list[i].regular_price =
              msg.products_list[i].variations[0].regular_price;
          }
        }
        msg.new_products = true;
        this.show_custom_cart = true;
        var newlist = this.product_list.filter(
          (product) => product["stock_status"] === "outofstock"
        );

        msg.product_out_of_stock_list = newlist;
        if (
          msg.product_out_of_stock_list.length > 0 &&
          !this.display_products_on_landing
        ) {
          msg.product_out_of_stock = true;
        }
        this.display_products_on_landing = false;
        if (type === "display_success_toastr") {
          setTimeout(() => {
            swal({
              text: "Testing Completed Successfully! Please Proceed to the next step.",
              toast: true,
              showCancelButton: false,
              showConfirmButton: false,
              type: "success",
              timer: 5000,
              timerProgressBar: true,
            });
          }, 1200);
        }
      } else if (message.products.length) {
        msg.isproduct = true;
        msg.elements = message;
      }
      this.chat.push(msg);
      // this.$session.set("BotResponse_Conversation", this.chat);
      this.new_update_response(index);
      this.product_list = [];
    },
    display_file_chat(message) {
      var msg = {
        conversation_only: true,
        time: this.generate_time(),
      };
      let temp = message.split("Download your manifest here ");
      let url = message.match(this.url_match_regex)[0];
      msg.url = message.includes("Download your manifest here ")
        ? temp[1]
        : url;
      msg.receiving = false;
      msg.file_name = url
        .split(/^.*[\\\/]/)[1]
        .split("/")
        .pop()
        .split("?")[0];
      this.chat.push(msg);
      // this.$session.set("BotResponse_Conversation", this.chat);
      this.update_scrollbar("upto_end", "response");
    },
    generate_order_details(order) {},
    async adddropdownvalue(value) {
      this.selected_indication = value;
      if (value.length > 0) {
        this.to_send = "";
        this.res = {};
        for (let i = 0; i < this.selected_indication.length; i++) {
          let parsedJson = JSON.parse(
            `{${this.selected_indication[i].value.split("{")[1]}`
          );
          if (i == 0) {
            this.to_send = this.selected_indication[i].title;
          } else {
            this.to_send =
              this.to_send + ", " + this.selected_indication[i].title;
          }
          if (this.res[Object.keys(parsedJson)[0].toString()] == undefined) {
            this.res[Object.keys(parsedJson)[0].toString()] =
              Object.values(parsedJson)[0].toString();
          } else {
            this.res[Object.keys(parsedJson)[0].toString()] =
              this.res[Object.keys(parsedJson)[0].toString()] +
              "," +
              Object.values(parsedJson)[0].toString();
          }
        }
        this.button_fill();
      } else {
        this.to_send = "";
        this.res = {};
      }
      this.button_fill();
    },
    button_fill() {
      if (this.to_send == "") {
        document.querySelector("#send_button").classList.remove("filled");
      } else if (this.to_send != "") {
        if (this.live_chat_on) {
          this.channel.push("started_typing");
          this.stop_typing(this);
        }
        document.querySelector("#send_button").classList.add("filled");
      }
    },
    stop_typing: debounce(function (vm) {
      vm.channel.push("stopped_typing");
    }, 1000),
    scroll_down() {
      if (
        document.querySelector(".chat-body").scrollHeight -
          document.querySelector(".chat-body").scrollTop <=
        document.querySelector(".chat-body").clientHeight
      ) {
        this.to_scroll = false;
      } else {
        this.to_scroll = true;
      }
    },
    load_buttons(message, index, type, greeting_button) {
      if (type === "display_success_toastr") {
        swal({
          text: "Some error occurred while testing.",
          toast: true,
          showCancelButton: false,
          showConfirmButton: false,
          type: "error",
          timer: 5000,
        });
        var msg = {
          conversation_only: true,
          time: this.generate_time(),
          ask_feedback: false,
          received:
            "Some error occurred while testing. Please try by refreshing the browser! If the issue persists, please contact system admin.",
          receiving: true,
        };
        this.chat.push(msg);
        return;
      }
      var msg = {
        conversation_only: true,
        buttons_list: [],
        button_prefix: message.prefix,
        receiving: true,
        received: message.text,
        time: null,
        removable: type == "welcome_message" ? false : true,
      };
      if (Boolean(greeting_button)) {
        msg.greeting_button = false;
      } else {
        msg.custom_buttons = false;
      }
      if (message.buttons.length == 3) {
        if (
          message.buttons[0].title == "Exchange Rate" &&
          message.buttons[1].title == "Track My Parcel" &&
          message.buttons[2].title == "Call Helpdesk"
        ) {
          msg.removable = false;
        }
      }
      for (var i in message.buttons) {
        if (msg.button_prefix != null) {
          msg.buttons_list.push({
            title: message.buttons[i].title,
            value: msg.button_prefix + message.buttons[i].value,
            type: Boolean(message.buttons[i].type) ? message.buttons[i].type : '',
          });
        } else {
          msg.buttons_list.push({
            title: message.buttons[i].title,
            value: message.buttons[i].value,
            type: message.buttons[i].type,
          });
        }
        if (
          msg.buttons_list[i].title == "No" &&
          message.text != "Can I help you with anything else?" &&
          this.companyid == "clinicaltrials81352"
        ) {
          msg.buttons_list[i].value = "isdisabled";
        }
      }
      var chatIndex = this.chat.push(msg);
      if (index == "is_button" || index == 0) {
        setTimeout(() => {
          if (
            $(".chat-body").children().last().height() /
              $(".chat-body").height() <
            0.5
          ) {
            this.animate_chat_body_scroll(1, 1500);
          } else {
            this.animate_chat_body_scroll(50, 1500, true);
          }
        }, 1000);
      } else {
        this.scroll_down();
      }
      if (Boolean(greeting_button)) {
        this.chat[chatIndex - 1].greeting_button = true;
      } else {
        this.chat[chatIndex - 1].custom_buttons = true;
      }
      // this.$session.set("BotResponse_Conversation", this.chat);
      setTimeout(() => {
        this.chat[chatIndex - 1].time = this.generate_time();
      }, 500);
    },
    multiselect_load(message, index) {
      var msg = {
        conversation_only: true,
        multiselect_values: message.custom.values,
        placeholder: message.custom.placeholder,
        is_multiselect: true,
        value_mapping: [],
        receiving: true,
        received: message.text,
        disabled: false,
        time: this.generate_time(),
      };
      this.chat.push(msg);
    },
    load_table(message, index) {
      let msg = {
        conversation_only: true,
        col_list: Object.keys(message.custom.values[0]),
        table_value: message.custom.values,
        receiving: true,
        received: message.text,
        is_table: true,
        time: this.generate_time(),
      };

      setTimeout(() => {
        this.chat.push(msg);
        if (index == 0) {
          setTimeout(() => {
            if (
              $(".chat-body").children().last().height() /
                $(".chat-body").height() <
              0.5
            ) {
              this.animate_chat_body_scroll(1, 1500);
            } else {
              this.animate_chat_body_scroll(0.7, 1500);
            }
          }, 1000);
        } else {
          this.animate_chat_body_scroll(100, 1500, true);
          this.scroll_down();
        }
      }, 2500);
    },
    load_text_area(message, index) {
      let msg = {
        conversation_only: true,
        receiving: true,
        received: message.text,
        show_text_area: true,
        disabled: false,
        time: this.generate_time(),
      };

      setTimeout(() => {
        this.chat.push(msg);
        if (index == 0) {
          setTimeout(() => {
            if (
              $(".chat-body").children().last().height() /
                $(".chat-body").height() <
              0.5
            ) {
              this.animate_chat_body_scroll(1, 1500);
            } else {
              this.animate_chat_body_scroll(0.7, 1500);
            }
          }, 1000);
        } else {
          this.animate_chat_body_scroll(100, 1500, true);

          this.scroll_down();
        }
      }, 2500);
    },
    start_live_chat() {
      // this.chat_socket = new Socket(
      //   process.env.VUE_APP_LIVE_CHAT_WEBSOCKET_ENDPOINT,
      //   {
      //     params: {
      //       username: this.$session.get("UserInformation").email,
      //       token: this.$session.get("UserInformation").tokens,
      //       role: this.$session.get("UserInformation").role
      //     },
      //   }
      // );
      axios.get(api_calls.chat_group_api()).then((response) => {
      this.chat_group_name = response.data.chat_group_name;
      this.live_chat_token = response.data.token;
      this.chat_socket = new Socket(
        process.env.VUE_APP_LIVE_CHAT_WEBSOCKET_ENDPOINT,
        {
          params: {
            company: this.company_name,
            token: this.live_chat_token
          },
        }
      );
      this.chat_socket.connect();
      this.support_channel = this.chat_socket.channel(
        "companies:" + this.$session.get("UserInformation").company_id
      );
      this.support_channel.join();
      const vm = this;
      this.support_channel.push("customer_wants_presence");
      this.support_channel.on("customer_gets_presence", (res) => {
        if (Boolean(res[vm.companyid]) === true) {
          var company_presence = res[vm.companyid]["metas"];
          // console.log(company_presence);
          let self_user_index = company_presence
            .map(function (e) {
              return e.user_info.username;
            })
            .indexOf(vm.$session.get("UserInformation").email);
          if (self_user_index !== -1) {
            company_presence.splice(self_user_index, 1);
          }
          let present_role_list = [];
          company_presence.filter((each) =>
            present_role_list.push(each.user_info.role)
          );
          let unique_role_list = present_role_list.filter(
            (x, i, a) => a.indexOf(x) == i
          );
          if (unique_role_list.includes("support agent")) {
            vm.is_support_agent_present = true;
          } else {
            vm.is_support_agent_present = false;
          }
        } else {
          vm.is_support_agent_present = false;
        }
        vm.connect_support_agent();
        // console.log(res)
      });
      });
    },
    connect_support_agent() {
      var vm = this;
      this.support_channel.leave();
      this.chat_socket.disconnect();
      this.chat_socket = null;
      if (this.is_support_agent_present === true) {
        var msg = {};
        msg.receiving = true;
        msg.received =
          "I am connecting you to one of our support agents. Please wait for a while.";
        msg.conversation_only = true;
        msg.time = this.generate_time();
        this.update_scrollbar("upto_end", "response");
        this.chat.push(msg);
        this.chat.push({
          receiving: true,
          received: "What's your name?",
          conversation_only: true,
          time: this.generate_time(),
        });
        this.new_update_response(0);
        this.scroll_down();
        axios.get(api_calls.chat_group_api()).then((response) => {
          this.chat_group_name = response.data.chat_group_name;
          this.live_chat_token = response.data.token;
          this.live_chat_on = true;
          this.chat_socket = new Socket(
            process.env.VUE_APP_LIVE_CHAT_WEBSOCKET_ENDPOINT,
            {
              params: {
                company: this.$session.get("UserInformation").company_id,
                chat_group_name: this.chat_group_name,
                token: this.live_chat_token,
              },
            }
          );
          this.chat_socket.connect();
          this.channel = this.chat_socket.channel(
            "customers_groups:" + this.chat_group_name
          );
          this.channel.join();
          this.channel.push("customer_needs_support_agent");

          setInterval(function () {
            vm.channel.push("customer_needs_support_agent");
          }, 2000);
          setInterval(function () {
            vm.channel.push("customer_group_self_presence");
          }, 2000);
          this.channel.on("customer_group_self_presence", (res) => {
            // console.log("CUSTOMER GROUP PRESENCE", res);
            var meta = res.metas;
            for (var i in meta) {
              if (!meta[i].user_info.is_customer) {
                this.support_agent_info = meta[i].user_info;
              }
            }
          });
          this.channel.on("new_chat_message", (res) => {
            if (res.sender != "customer") {
              this.chat.push({
                receiving: true,
                received: res.message,
                time: this.generate_time(),
                conversation_only: true,
              });
              setTimeout(() => {
                this.scroll_down();
                if (
                  $(".chat-body").children().last().height() /
                    $(".chat-body").height() <
                  0.5
                ) {
                  this.animate_chat_body_scroll(1, 1500);
                } else if (
                  $(".receiver").last().parent().height() /
                    $(".chat-body").height() >
                    0.5 &&
                  $(".receiver").last().parent().height() /
                    $(".chat-body").height() <
                    0.6
                ) {
                  this.animate_chat_body_scroll(0.9, 1500);
                } else {
                  this.animate_chat_body_scroll(0.75, 1500);
                }
              }, 1000);
              if (
                $(".chat-body").height() -
                  $(".chat-body").prop("scrollHeight") !=
                0
              ) {
                this.scroll_down();
              }
            }
          });
          this.channel.on("stopped_chat", (res) => {
            this.chat.push({
              conversation_only: true,
              receiving: true,
              received: "Support agent " + res.message,
              time: this.generate_time(),
            });
            this.live_chat_on = false;
            this.support_agent_info = null;
            this.channel.leave();
            this.live_chat_token = null;
            this.chat_group_name = null;
            this.user_name = "";
            this.chat_socket.disconnect();
            this.update_scrollbar("upto_end", "response");
          });
          this.channel.on("started_typing", (res) => {
            this.is_agent_typing = true;
            this.is_typing_indicator_on = true;
          });
          this.channel.on("stopped_typing", (res) => {
            this.is_agent_typing = false;
            this.is_typing_indicator_on = false;
          });
        });
      } else {
        this.support_subscription_data();
      }
    },
    update_scrollbar(type, msgType, iswelcome, delay_value) {
      var scroll_delay = iswelcome == "is_welcome" ? delay_value : 2000;
      this.is_typing_indicator_on = true;
      if (msgType == "response") {
        setTimeout(() => {
          this.is_typing_indicator_on = false;
        }, scroll_delay);
      } else if (msgType == "sender") {
        this.animate_chat_body_scroll(1, 750);
      }
      if (msgType == "response") {
        if (type == "upto_end") {
          setTimeout(() => {
            if (
              $(".chat-body").prop("scrollTop") <
              $(".chat-body").prop("scrollHeight")
            ) {
              if (
                $(".receiver").last().parent().height() /
                  $(".chat-body").height() >
                0.5
              ) {
                this.animate_chat_body_scroll(0.75, 1500);
                this.scroll_down();
              }
            } else if (
              $(".receiver").last().parent().height() /
                $(".chat-body").height() <
              0.5
            ) {
              this.animate_chat_body_scroll(1, scroll_delay);
            }
          }, scroll_delay);
        } else {
          setTimeout(() => {
            document.querySelector(".chat-body").scrollTop =
              document.querySelector(".chat-body").scrollHeight -
              document.querySelector(".chat-body").lastChild.scrollHeight;
          }, 1000);
        }
      }
    },
    new_update_response(index) {
      if (index == 0) {
        setTimeout(() => {
          this.scroll_down();
          if (
            $(".chat-body").children().last().height() /
              $(".chat-body").height() <
            0.5
          ) {
            this.animate_chat_body_scroll(1, 1500);
          } else if (
            $(".receiver").last().parent().height() / $(".chat-body").height() >
              0.5 &&
            $(".receiver").last().parent().height() / $(".chat-body").height() <
              0.6
          ) {
            this.animate_chat_body_scroll(1, 1500);
          } else {
            this.animate_chat_body_scroll(1, 1500);
          }
        }, 1000);
      }
      if (
        $(".chat-body").height() - $(".chat-body").prop("scrollHeight") !=
        0
      ) {
        this.scroll_down();
      }
      if (
        $(".chat-body").height() - $(".chat-body").prop("scrollHeight") ===
        0
      ) {
        this.to_scroll = false;
      }
    },
    animate_chat_body_scroll(scale, delay, offset) {
      if (Boolean(offset)) {
        $(".chat-body").animate(
          {
            scrollTop: $(".chat-body").prop("scrollTop") + scale,
          },
          delay
        );
      } else {
        $(".chat-body").animate(
          {
            scrollTop: scale * $(".chat-body").prop("scrollHeight"),
          },
          delay
        );
      }
    },
    add_bot_unanswered_question(index, method) {
      axios
        .put(
          api_calls.get_unanswered_url(),
          {
            license_key: this.$session.get("UserInformation").license_key,
            token: this.bot_response_token_value,
            bot_answer: this.chat[index].received,
            user_query: this.chat[index - 1].sent,
            feedback: method ? "like" : "dislike",
            username: this.$session.get("UserInformation").email,
            company_id: this.$session.get("UserInformation").company_id,
            company_name: this.$session.get("UserInformation").company_name,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$session.get("at")}`,
            },
          }
        )
        .then(() => {
          this.chat[index].ask_feedback = false;
        })
        .catch(() => {});
    },
    load_refunds() {
      let msg = {
        conversation_only: true,
        is_refund: true,
        receiving: true,
        received: this.retail_order_retreival_only_email_required
          ? "Please enter email to fetch your orders."
          : "Please login to fetch your recent orders",
        time: this.generate_time(),
      };

      setTimeout(() => {
        let latestChatIndex = this.chat.push(msg);
        latestChatIndex -= 1;
        this.chat[latestChatIndex].fetch_shopify_details = true;
        this.scroll_down();
      }, 1000);
    },
    view_order_details(chatIndex, orderIndex, orderLineItems, orderRefunds) {
      this.chat[chatIndex].refund_selected_items = [];
      this.chat[chatIndex].shopify_reason_for_refund_list = null;
      this.chat[chatIndex].shopify_reason_for_refund = null;
      this.chat[chatIndex].refund_order_view_details = Object(
        this.chat[chatIndex].refund_orders_list[orderIndex]
      );
      this.chat[chatIndex].refund_order_view_details.line_items =
        orderLineItems.map((lineItem) => {
          let lineItemNode = lineItem;
          lineItemNode.selected_quantity =
            this.retail_web_framework == "magento"
              ? lineItem.qty_ordered
              : lineItem.quantity;
          lineItemNode.already_refunded_qty =
            this.retail_web_framework == "magento" ? lineItem.qty_refunded : 0;
          lineItemNode.qty_available_for_refund =
            this.retail_web_framework == "magento"
              ? lineItem.qty_ordered
              : lineItem.quantity;
          lineItemNode.product_id = lineItem.product_id;
          lineItemNode.variant_id =
            this.retail_web_framework == "magento"
              ? lineItem.sku
              : lineItem.variant_id;
          return lineItemNode;
        });
      if (Boolean(orderRefunds) === true) {
        orderRefunds = orderRefunds.map((lineItem) => {
          return lineItem.refund_line_items[0];
        });
        var AlreadyRefundedQty = [];
        orderRefunds.reduce(function (res, value) {
          if (!res[value.line_item_id]) {
            res[value.line_item_id] = {
              line_item_id: value.line_item_id,
              quantity: 0,
            };
            AlreadyRefundedQty.push(res[value.line_item_id]);
          }
          res[value.line_item_id].quantity += value.quantity;
          return res;
        }, {});
        let temp = this.chat[chatIndex].refund_order_view_details.line_items;
        this.chat[chatIndex].refund_order_view_details.line_items = temp.map(
          (lineItem) => {
            let lineItemNode = lineItem;
            for (var i in AlreadyRefundedQty) {
              if (lineItem.id == AlreadyRefundedQty[i].line_item_id) {
                lineItemNode.already_refunded_qty =
                  AlreadyRefundedQty[i]["quantity"];
                lineItemNode.qty_available_for_refund =
                  lineItem.quantity - AlreadyRefundedQty[i]["quantity"];
                lineItemNode.selected_quantity =
                  lineItem.quantity - AlreadyRefundedQty[i]["quantity"];
                lineItemNode.product_id = lineItem.product_id;
                lineItemNode.variant_id =
                  this.retail_web_framework == "magento"
                    ? lineItem.sku
                    : lineItem.variant_id;
              }
            }
            return lineItemNode;
          }
        );
      }
      this.$set(this.chat, chatIndex, this.chat[chatIndex]);
    },
    refresh_or_remove_order_details(chatIndex, val) {
      if (val == "remove") {
        this.chat[chatIndex].refund_order_view_details = {};
      }
      this.$set(this.chat, chatIndex, this.chat[chatIndex]);
    },
    load_customer_orders(ordersData, index, order_type) {
      // this.chat[index].received = `Order ${orderName}`;
      this.is_typing_indicator_on = true;
      if (order_type === "refund") {
        this.chat[index].received = "Fetching your orders ...";
        this.chat[index].refund_orders_list = ordersData.map((order) => {
          let orderObject = order;
          orderObject.created_at =
            this.retail_web_framework === "bigcommerce"
              ? moment(orderObject.created_at).format("Do MMM YYYY")
              : moment(orderObject.created_at, ["YYYY-MM-DDTh:m:sZ"]).format(
                  "Do MMM YYYY"
                );
          orderObject.name =
            this.retail_web_framework == "shopify"
              ? orderObject.name
              : orderObject.id;
          orderObject.processedAt = moment(orderObject.created_at, [
            "YYYY-MM-DDThh:mm:ssZ",
          ]).format("Do MMM YYYY");
          // cur_node.fulfillmentStatus = cur_node.fulfillment_status;
          orderObject.fulfillment_status =
            Boolean(orderObject.fulfillment_status) === true
              ? orderObject.fulfillment_status
              : "Unfulfilled";
          // Set only first character to uppercase while remaining characters set to lowercase
          orderObject.fulfillment_status =
          orderObject.fulfillment_status.charAt(0).toUpperCase() +
          orderObject.fulfillment_status.slice(1).toLowerCase();
          if(this.retail_web_framework != "shopify") {
            for (let i = 0; i < orderObject.order_notes.length; i++){
              if(orderObject.order_notes[i].date_created != undefined){
              orderObject.order_notes[i].date_created = this.retail_web_framework === "bigcommerce"? moment(orderObject.order_notes[i].date_created).format("YYYY-MM-DDThh:mm:ssZ")
              : moment(orderObject.order_notes[i].date_created, ["YYYY-MM-DDThh:mm:ssZ",]).format("Do MMM YYYY HH:mm a");
             }
            }
          }
          return orderObject;
        });
        if (this.chat[index].refund_orders_list.length === 0) {
          this.chat[index].received = "There are no orders to be displayed";
        } else {
          this.chat[index].received =
            "Select the order that you wish to return";
        }
        // this.refund_order_view_details = {};
        this.chat[index].refund_order_view_details = {};
        this.chat[index].refund_selected_items = [];
        this.chat[index].shopify_reason_for_refund_list = null;
        this.chat[index].shopify_reason_for_refund = null;
        this.chat[index].conversation_only = false;
        this.chat[index].conversation_only = true;
      } else if (order_type === "all_orders") {
        let orders_data = ordersData,
          complete_orders_data = [];
        for (let i = 0; i < orders_data.length; i++) {
          var cur_node = orders_data[i];
          cur_node.processedAt =
            this.retail_web_framework === "bigcommerce"
              ? moment(orders_data[i].created_at).format("Do MMM YYYY")
              : moment(orders_data[i].created_at, ["YYYY-MM-DDTh:m:sZ"]).format(
                  "Do MMM YYYY"
                );
          // cur_node.fulfillmentStatus = cur_node.fulfillment_status;
          cur_node.fulfillment_status =
            Boolean(cur_node.fulfillment_status) === true
              ? cur_node.fulfillment_status
              : "Unfulfilled";
          // // Set only first character to uppercase while remaining characters set to lowercase
          cur_node.fulfillment_status =
            cur_node.fulfillment_status.charAt(0).toUpperCase() +
            cur_node.fulfillment_status.slice(1).toLowerCase();
          if(this.retail_web_framework != "shopify") {
            for (let i = 0; i < cur_node.order_notes.length; i++){
              if(cur_node.order_notes[i].date_created != undefined){
                orderObject.order_notes[i].date_created = this.retail_web_framework === "bigcommerce"? moment(orderObject.order_notes[i].date_created).format("YYYY-MM-DDThh:mm:ssZ")
                : moment(orderObject.order_notes[i].date_created, ["YYYY-MM-DDThh:mm:ssZ",]).format("Do MMM YYYY HH:mm a");
              }
            }  
          }
          complete_orders_data.push({
            name:
              this.retail_web_framework == "shopify"
                ? cur_node.name
                : cur_node.id,
            processed_date: cur_node.processedAt,
            fulfillment_status: cur_node.fulfillment_status,
            status_url: cur_node.order_status_url,
            order_notes:
              this.retail_web_framework == "shopify"
                ? null
                : cur_node.order_notes,
          });
        }
        this.chat[index].show_all_orders_list = true;
        this.chat[index].all_orders_list = complete_orders_data;
        if (this.chat[index].all_orders_list.length === 0) {
          this.chat[index].received = "There are no orders to be displayed";
          this.chat[index].show_all_orders_list = false;
        } else {
          this.chat[index].received = "Please Find Below Your Latest Orders:";
        }
        this.chat[index].recent_orders_list = complete_orders_data;
        setTimeout(() => {
          this.chat[index].conversation_only = true;
        }, 500);
      }
      this.is_typing_indicator_on = false;
    },
    submit_refund_request(refund_order_view_details, index) {
      if (this.chat[index].shopify_reason_for_refund_list === null) {
        this.show_shopify_reason_for_refund_error = true;
        return;
      }
      if (this.chat[index].shopify_reason_for_refund_list === "Others") {
        if (
          this.chat[index].shopify_reason_for_refund === null ||
          this.chat[index].shopify_reason_for_refund === ""
        ) {
          this.show_shopify_reason_for_refund_error = true;
          return;
        }
      } else {
        this.chat[index].shopify_reason_for_refund =
          this.chat[index].shopify_reason_for_refund_list;
      }
      // else {
      this.show_shopify_reason_for_refund_error = false;
      let items_to_refund = refund_order_view_details.line_items.filter(
        (lineItem) => {
          if (this.retail_web_framework == "magento") {
            return this.chat[index].refund_selected_items.includes(
              lineItem.product_id
            );
          } else {
            return this.chat[index].refund_selected_items.includes(lineItem.id);
          }
        }
      );
      for (let i = 0; i < items_to_refund.length; i++) {
        if (
          items_to_refund[i].selected_quantity === null ||
          Boolean(items_to_refund[i].selected_quantity) === false
        ) {
          swal({
            text: "Please enter the product quantity in numeric only",
            toast: true,
            position: "top-end",
            type: "warning",
            showConfirmButton: false,
            timer: 5000,
          });
          return;
        }
      }
      let refund_payload_string = JSON.stringify({
        orderId: refund_order_view_details.id,
        order_name: refund_order_view_details.name,
        customer_id: this.shopify_customer_id,
        fulfillment_status: refund_order_view_details.fulfillment_status,
        payment_status: refund_order_view_details.payment_status,
        currency: this.retail_shop_currency,
        lineItems: items_to_refund.map((item) => {
          return {
            line_item_id:
              this.retail_web_framework == "magento"
                ? item.product_id
                : item.id,
            quantity: item.selected_quantity,
            product_id: item.product_id,
            variant_id: item.variant_id,
          };
        }),
        refundReason: this.chat[index].shopify_reason_for_refund,
      });
      let refund_intent = `/process_refund_request${refund_payload_string}`;
      let refund_object = {
        type: "postback",
        title: "Proceed",
        value: refund_intent,
      };
      // console.log(refund_intent);
      this.custom_button_click(refund_object);
      this.chat[index].refund_order_view_details = {};
      this.chat[index].refund_selected_items = [];
      this.chat[index].shopify_reason_for_refund_list = null;
      this.chat[index].shopify_reason_for_refund = null;
      this.chat.splice(index, 1);
      // }
    },
    retail_form_focus(index) {
      if (
        this.chat[index].received ===
        "We are sorry, your credentials are invalid. Please try again :)"
      ) {
        this.chat[index].received =
          "Please login with your credentials for better experience :)";
      }
    },
    retail_create_customer_token(index, isRefund) {
      this.is_typing_indicator_on = true;
      isRefund = isRefund || false;
      if (this.chat[index].return_shopify_email === true && !isRefund) {
        this.send_retail_customer_id(index, true);
        return;
      }
      let shop_endpoint = this.shopify_retail_shop_name + ".myshopify.com";
      let queryString = $("#shopify_login_form").serializeArray();
      let form_payload = {};
      form_payload["shopify_is_only_email"] =
        this.retail_order_retreival_only_email_required;
      form_payload["email"] = this.chat[index].customer_email_id;
      form_payload["password"] = this.chat[index].customer_password;
      form_payload = JSON.stringify(form_payload);
      axios
        .post(api_calls.chatbot_response_cense(), {
          license_key: this.$session.get("UserInformation").license_key,
          token: this.bot_response_token_value,
          username: this.$session.get("UserInformation").email,
          source: "Web",
          chat: `/shopify_create_customer_token${form_payload}`,
          token: this.bot_response_token_value,
          role: this.$session.get("UserInformation").role,
          refreshed_or_closed: this.refreshed_or_closed,
        })
        .then(({ data }) => {
          if (data.responses[0].token_type === "customer_token") {
            if (Boolean(data.responses[0].Data)) {
              if (this.retail_web_framework == "shopify") {
                let customerToken = data.responses[0].Data.accessToken;
                let tokenExpiry = data.responses[0].Data.expiresAt;
                this.$session.set("shopify_customer_token", customerToken);
                this.$session.set("shopify_customer_token_expiry", tokenExpiry);
                this.retail_fetch_orders(
                  customerToken,
                  index,
                  isRefund,
                  "shopify_customer_token"
                );
              } else if (this.retail_web_framework == "woocommerce") {
                let customerToken =
                  data.responses[0].customer_data.customer_email;
                let tokenExpiry = data.responses[0].Data.expiresAt;
                let customerId = data.responses[0].customer_data.customer_id;
                this.shopify_customer_id = customerId;
                this.$session.set("shopify_customer_token", customerToken);
                this.$session.set("shopify_customer_token_expiry", tokenExpiry);
                this.$session.set("shopify_customer_id", customerId);
                this.retail_fetch_orders(
                  customerToken,
                  index,
                  isRefund,
                  "shopify_customer_token"
                );
              } else if (this.retail_web_framework == "magento") {
                let customerToken =
                  data.responses[0].customer_data.customer_email;
                let tokenExpiry = data.responses[0].Data.expiresAt;
                let customerId = data.responses[0].customer_data.customer_id;
                this.shopify_customer_id = customerId;
                this.$session.set("shopify_customer_token", customerToken);
                this.$session.set("shopify_customer_token_expiry", tokenExpiry);
                this.$session.set("shopify_customer_id", customerId);
                this.retail_fetch_orders(
                  customerToken,
                  index,
                  isRefund,
                  "shopify_customer_token"
                );
              } else if (this.retail_web_framework == "bigcommerce") {
                let customerToken =
                  data.responses[0].customer_data.customer_email;
                let tokenExpiry = data.responses[0].Data.expiresAt;
                let customerId = data.responses[0].customer_data.customer_id;
                this.shopify_customer_id = customerId;
                this.$session.set("shopify_customer_token", customerToken);
                this.$session.set("shopify_customer_token_expiry", tokenExpiry);
                this.$session.set("shopify_customer_id", customerId);
                this.retail_fetch_orders(
                  customerToken,
                  index,
                  isRefund,
                  "shopify_customer_token"
                );
              }
            } else {
              this.chat[index].received =
                "We are sorry, your credentials are invalid. Please try again :)";
              this.is_typing_indicator_on = false;
            }
          } else if (data.responses[0].token_type === "customer_id") {
            if (this.retail_web_framework == "shopify") {
              let customerId = data.responses[0].customer_id;
              let customerEmail = data.responses[0].customer_email;
              this.shopify_customer_id = customerId;
              this.$session.set("shopify_customer_id", customerId);
              this.$session.set("shopify_customer_token", customerEmail);
              this.retail_fetch_orders(
                customerId,
                index,
                isRefund,
                "shopify_customer_id"
              );
            } else if (this.retail_web_framework == "woocommerce") {
              let customerId = data.responses[0].customer_id;
              let customerEmail = data.responses[0].customer_email;
              this.$session.set("shopify_customer_id", customerId);
              this.$session.set("shopify_customer_token", customerEmail);
              this.retail_fetch_orders(
                customerId,
                index,
                isRefund,
                "shopify_customer_id"
              );
            } else if (this.retail_web_framework == "magento") {
              let customerId = data.responses[0].customer_id;
              let customerEmail = data.responses[0].customer_email;
              this.$session.set("shopify_customer_id", customerId);
              this.$session.set("shopify_customer_token", customerEmail);
              this.retail_fetch_orders(
                customerId,
                index,
                isRefund,
                "shopify_customer_id"
              );
            } else if (this.retail_web_framework == "bigcommerce") {
              let customerId = data.responses[0].customer_id;
              let customerEmail = data.responses[0].customer_email;
              this.$session.set("shopify_customer_id", customerId);
              this.$session.set("shopify_customer_token", customerEmail);
              this.retail_fetch_orders(
                customerId,
                index,
                isRefund,
                "shopify_customer_id"
              );
            }
            // }
            else {
              this.chat[index].received =
                "We are sorry, could not find any records with this email. Please try again :)";
              this.is_typing_indicator_on = false;
            }
          } else {
            this.chat[index].received =
              "We are sorry, your credentials are invalid. Please try again :)";
            this.is_typing_indicator_on = false;
          }
          // this.chat.splice(index, 1);
        });
    },
    retail_fetch_customer_id(customerAccessToken, index, token_type) {
      let shop_endpoint = this.shopify_retail_shop_name + ".myshopify.com";
      this.is_typing_indicator_on = true;
      if (!Boolean(this.chat[index].refund_orders_list)) {
        if (token_type === "shopify_customer_token") {
          let stringified_customer_payload = JSON.stringify({
            customer_access_token: customerAccessToken, //shopify access token == email for woocommerce
          });
          axios
            .post(api_calls.chatbot_response_cense(), {
              license_key: this.$session.get("UserInformation").license_key,
              token: this.bot_response_token_value,
              username: this.$session.get("UserInformation").email,
              source: "Web",
              chat: `/shopify_get_customer_id_and_orders${stringified_customer_payload}`,
              token: this.bot_response_token_value,
              role: this.$session.get("UserInformation").role,
              refreshed_or_closed: this.refreshed_or_closed,
            })
            .then(({ data }) => {
              if (Boolean(data.responses[0].custom)) {
                this.load_customer_orders(
                  data.responses[0].custom.orders_list,
                  index,
                  "refund"
                );
              } else {
                this.chat[index].received =
                  "Some Error Occurred. Please Try Again";
                this.is_typing_indicator_on = false;
              }
            });
        } else if (token_type == "shopify_customer_id") {
          let stringified_customer_payload = JSON.stringify({
            customerId: this.shopify_customer_id,
          });
          this.chat[index].received = "Fetching your order details ...";
          axios
            .post(api_calls.chatbot_response_cense(), {
              license_key: this.$session.get("UserInformation").license_key,
              token: this.bot_response_token_value,
              username: this.$session.get("UserInformation").email,
              source: "Web",
              chat: `/retrieve_customer_orders${stringified_customer_payload}`,
              token: this.bot_response_token_value,
              role: this.$session.get("UserInformation").role,
              refreshed_or_closed: this.refreshed_or_closed,
            })
            .then((response) => {
              this.load_customer_orders(
                response.data.responses[0].custom.orders_list,
                index,
                "refund"
              );
            })
            .catch((e) => {
              this.is_typing_indicator_on = false;
              console.log(e);
              this.update_scrollbar("upto_end", "response");
            });
        }
      }
    },
    retail_fetch_orders(customerAccessToken, index, isRefund, token_type) {
      this.is_typing_indicator_on = true;
      isRefund = isRefund || false;
      this.chat[index].conversation_only = false;
      let shop_endpoint = this.shopify_retail_shop_name + ".myshopify.com";
      if (token_type === "shopify_customer_token") {
        let stringified_customer_payload = JSON.stringify({
          customer_access_token: customerAccessToken,
        });
        axios
          .post(api_calls.chatbot_response_cense(), {
            license_key: this.$session.get("UserInformation").license_key,
            token: this.bot_response_token_value,
            username: this.$session.get("UserInformation").email,
            source: "Web",
            chat: `/shopify_get_customer_orders${stringified_customer_payload}`,
            token: this.bot_response_token_value,
            role: this.$session.get("UserInformation").role,
            refreshed_or_closed: this.refreshed_or_closed,
          })
          .then(({ data }) => {
            this.is_typing_indicator_on = false;
            try {
              let customerId = atob(data.responses[0].data.customer.id);
              this.shopify_customer_id = customerId.slice(
                customerId.lastIndexOf("/") + 1
              );
              this.$session.set(
                "shopify_customer_id",
                this.shopify_customer_id
              );
            } catch (e) {}

            if (this.retail_web_framework == "shopify") {
              let ordersData = data.responses[0].data.customer.orders.edges;
              if (typeof index == "number" && ordersData.length > 0) {
                if (isRefund) {
                  this.retail_fetch_customer_id(
                    customerAccessToken,
                    index,
                    "shopify_customer_token"
                  );
                } else {
                  this.is_typing_indicator_on = false;
                  let orders_data =
                      data.responses[0].data.customer.orders.edges,
                    complete_orders_data = [];
                  for (let i = 0; i < orders_data.length; i++) {
                    var cur_node = orders_data[i].node;
                    cur_node.processedAt = moment(cur_node.processedAt, [
                      "YYYY-MM-DDThh:mm:ssZ",
                    ]).format("Do MMM YYYY");
                    cur_node.fulfillmentStatus =
                      cur_node.fulfillmentStatus.replace("_", " ");
                    // Set only first character to uppercase while remaining characters set to lowercase
                    cur_node.fulfillmentStatus =
                      cur_node.fulfillmentStatus.charAt(0).toUpperCase() +
                      cur_node.fulfillmentStatus.slice(1).toLowerCase();
                    complete_orders_data.push({
                      name: cur_node.name,
                      processed_date: cur_node.processedAt,
                      fulfillment_status: cur_node.fulfillmentStatus,
                      status_url: cur_node.statusUrl,
                    });
                  }
                  this.chat[index].show_all_orders_list = true;
                  this.chat[index].all_orders_list = complete_orders_data;
                  this.chat[index].received =
                    "Please Find Below Your Latest Orders:";

                  this.chat[index].recent_orders_list =
                    data.responses[0].data.customer.orders.edges;
                }
              }
              setTimeout(() => {
                this.chat[index].conversation_only = true;
              }, 500);
            } else if (this.retail_web_framework == "woocommerce") {
              if (isRefund) {
                this.load_customer_orders(
                  data.responses[0].data.customer.orders,
                  index,
                  isRefund ? "refund" : "all_orders"
                );
              } else {
                this.is_typing_indicator_on = false;
                let orders_data = data.responses[0].data.customer.orders,
                  complete_orders_data = [];
                for (let i = 0; i < orders_data.length; i++) {
                  var cur_node = orders_data[i];
                  cur_node.processedAt = moment(cur_node.created_at, [
                    "YYYY-MM-DDThh:mm:ssZ",
                  ]).format("Do MMM YYYY");
                  cur_node.fulfillment_status =
                    Boolean(cur_node.fulfillment_status) === true
                      ? cur_node.fulfillment_status
                      : "Unfulfilled";
                  // Set only first character to uppercase while remaining characters set to lowercase
                  cur_node.fulfillment_status =
                    cur_node.fulfillment_status.charAt(0).toUpperCase() +
                    cur_node.fulfillment_status.slice(1).toLowerCase();
                  for (let i = 0; i < cur_node.order_notes.length; i++) {
                    cur_node.order_notes[i].date_created = moment(
                      cur_node.order_notes[i].date_created,
                      ["YYYY-MM-DDThh:mm:ssZ"]
                    ).format("Do MMM YYYY HH:mm a");
                  }
                  complete_orders_data.push({
                    name: cur_node.id,
                    processed_date: cur_node.processedAt,
                    fulfillment_status: cur_node.fulfillment_status,
                    status_url: cur_node.order_status_url,
                    order_notes: cur_node.order_notes,
                  });
                }
                this.chat[index].show_all_orders_list = true;
                this.chat[index].all_orders_list = complete_orders_data;
                this.chat[index].received =
                  "Please Find Below Your Latest Orders:";
                this.chat[index].show_all_orders_list = true;
                this.chat[index].recent_orders_list = complete_orders_data;
              }
              setTimeout(() => {
                this.chat[index].conversation_only = true;
              }, 500);
            } else if (this.retail_web_framework == "magento") {
              if (isRefund) {
                this.load_customer_orders(
                  data.responses[0].data.customer.orders,
                  index,
                  isRefund ? "refund" : "all_orders"
                );
              } else {
                this.is_typing_indicator_on = false;
                let orders_data = data.responses[0].data.customer.orders,
                  complete_orders_data = [];
                for (let i = 0; i < orders_data.length; i++) {
                  var cur_node = orders_data[i];
                  cur_node.processedAt = moment(cur_node.created_at, [
                    "YYYY-MM-DDThh:mm:ssZ",
                  ]).format("Do MMM YYYY");
                  cur_node.fulfillment_status =
                    Boolean(cur_node.fulfillment_status) === true
                      ? cur_node.fulfillment_status
                      : "Unfulfilled";
                  // Set only first character to uppercase while remaining characters set to lowercase
                  cur_node.fulfillment_status =
                    cur_node.fulfillment_status.charAt(0).toUpperCase() +
                    cur_node.fulfillment_status.slice(1).toLowerCase();
                  for (let i = 0; i < cur_node.order_notes.length; i++) {
                    cur_node.order_notes[i].date_created = moment(
                      cur_node.order_notes[i].date_created,
                      ["YYYY-MM-DDThh:mm:ssZ"]
                    ).format("Do MMM YYYY HH:mm a");
                  }
                  complete_orders_data.push({
                    name: cur_node.id,
                    processed_date: cur_node.processedAt,
                    fulfillment_status: cur_node.fulfillment_status,
                    status_url: cur_node.order_status_url,
                    order_notes: cur_node.order_notes,
                  });
                }
                this.chat[index].show_all_orders_list = true;
                this.chat[index].all_orders_list = complete_orders_data;
                this.chat[index].received =
                  "Please Find Below Your Latest Orders:";
                this.chat[index].show_all_orders_list = true;
                this.chat[index].recent_orders_list = complete_orders_data;
              }
              setTimeout(() => {
                this.chat[index].conversation_only = true;
              }, 500);
            } else if (this.retail_web_framework == "bigcommerce") {
              if (isRefund) {
                this.load_customer_orders(
                  data.responses[0].data.customer.orders,
                  index,
                  isRefund ? "refund" : "all_orders"
                );
              } else {
                this.is_typing_indicator_on = false;
                let orders_data = data.responses[0].data.customer.orders,
                  complete_orders_data = [];
                for (let i = 0; i < orders_data.length; i++) {
                  var cur_node = orders_data[i];
                  cur_node.processedAt = moment(cur_node.created_at).format(
                    "Do MMM YYYY"
                  );
                  cur_node.fulfillment_status =
                    Boolean(cur_node.fulfillment_status) === true
                      ? cur_node.fulfillment_status
                      : "Unfulfilled";
                  // Set only first character to uppercase while remaining characters set to lowercase
                  cur_node.fulfillment_status =
                    cur_node.fulfillment_status.charAt(0).toUpperCase() +
                    cur_node.fulfillment_status.slice(1).toLowerCase();
                  for (let i = 0; i < cur_node.order_notes.length; i++) {
                    cur_node.order_notes[i].date_created = moment(
                      cur_node.order_notes[i].date_created
                    ).format("Do MMM YYYY HH:mm a");
                  }
                  complete_orders_data.push({
                    name: cur_node.id,
                    processed_date: cur_node.processedAt,
                    fulfillment_status: cur_node.fulfillment_status,
                    status_url: cur_node.order_status_url,
                    order_notes: cur_node.order_notes,
                  });
                }
                this.chat[index].show_all_orders_list = true;
                this.chat[index].all_orders_list = complete_orders_data;
                this.chat[index].received =
                  "Please Find Below Your Latest Orders:";
                this.chat[index].show_all_orders_list = true;
                this.chat[index].recent_orders_list = complete_orders_data;
              }
              setTimeout(() => {
                this.chat[index].conversation_only = true;
              }, 500);
            }
          });
      } else if (token_type === "shopify_customer_id") {
        if (Boolean(this.shopify_customer_id) === false) {
          this.shopify_customer_id = this.$session.get("shopify_customer_id");
        }
        var shopify_customer_email = this.$session.get(
          "shopify_customer_token"
        );
        let stringified_customer_payload = JSON.stringify({
          customerId: this.shopify_customer_id,
          email: shopify_customer_email,
        });
        this.chat[index].received = "Fetching your order details ...";
        axios
          .post(api_calls.chatbot_response_cense(), {
            license_key: this.$session.get("UserInformation").license_key,
            token: this.bot_response_token_value,
            username: this.$session.get("UserInformation").email,
            source: "Web",
            chat: `/retrieve_customer_orders${stringified_customer_payload}`,
            token: this.bot_response_token_value,
            role: this.$session.get("UserInformation").role,
            refreshed_or_closed: this.refreshed_or_closed,
          })
          .then((response) => {
            if (
              response.data.responses[0].custom.orders_list.length == 0 &&
              this.retail_order_retreival_only_email_required
            ) {
              this.is_typing_indicator_on = false;
              this.chat[index].conversation_only = true;
              this.chat[index].received =
                "There are no orders to be displayed for the given Email or Phone number";
              this.shopify_customer_id = null;
            } else {
              this.load_customer_orders(
                response.data.responses[0].custom.orders_list,
                index,
                isRefund ? "refund" : "all_orders"
              );
            }
          })
          .catch((e) => {
            this.is_typing_indicator_on = false;
            console.log(e);
            this.update_scrollbar("upto_end", "response");
          });
      }
    },
    retail_is_token_valid(index, isRefund) {
      isRefund = isRefund || false;
      if (this.retail_web_framework == "shopify") {
        if (
          (this.chat[index].fetch_shopify_details &&
            !Boolean(this.chat[index].is_refund) &&
            !Boolean(this.chat[index].recent_orders_list)) ||
          (this.chat[index].fetch_shopify_details &&
            Boolean(this.chat[index].is_refund) &&
            !Boolean(this.chat[index].refund_orders_list)) ||
          (this.chat[index].fetch_shopify_details &&
            Boolean(this.chat[index].return_shopify_email))
        ) {
          if (this.retail_order_retreival_only_email_required) {
            if (Boolean(this.shopify_customer_id)) {
              let customerToken = this.$session.get("shopify_customer_token");
              if (this.chat[index].is_refund) {
                this.retail_fetch_customer_id(
                  customerToken,
                  index,
                  "shopify_customer_id"
                );
              } else if (this.chat[index].return_shopify_email) {
                this.send_retail_customer_id(index, false);
              } else {
                this.retail_fetch_orders(
                  customerToken,
                  index,
                  isRefund,
                  "shopify_customer_id"
                );
              }
              return true;
            }
            return false;
          } else {
            let shopify_store_cid = this.get_shopify_store_window_customer_id();
            if (Boolean(shopify_store_cid) === false) {
              return false;
            } else {
              if (
                shopify_store_cid === null ||
                shopify_store_cid == undefined ||
                shopify_store_cid == ""
              ) {
                return false;
              } else {
                this.shopify_customer_id = shopify_store_cid;
              }
              let customerToken = this.$session.get("shopify_customer_token");
              if (this.chat[index].is_refund) {
                this.retail_fetch_customer_id(
                  customerToken,
                  index,
                  "shopify_customer_id"
                );
              } else if (this.chat[index].return_shopify_email) {
                this.send_retail_customer_id(index, false);
              } else {
                this.retail_fetch_orders(
                  customerToken,
                  index,
                  isRefund,
                  "shopify_customer_id"
                );
              }
              return true;
            }
          }
        } else {
          return true;
        }
      } else if (this.retail_web_framework == "woocommerce") {
        if (
          (this.chat[index].fetch_shopify_details &&
            !Boolean(this.chat[index].is_refund) &&
            !Boolean(this.chat[index].recent_orders_list)) ||
          (this.chat[index].fetch_shopify_details &&
            Boolean(this.chat[index].is_refund) &&
            !Boolean(this.chat[index].refund_orders_list)) ||
          (this.chat[index].fetch_shopify_details &&
            Boolean(this.chat[index].return_shopify_email))
        ) {
          if (this.retail_order_retreival_only_email_required) {
            this.shopify_customer_id = this.$session.get("shopify_customer_id");
            if (Boolean(this.shopify_customer_id)) {
              let customerToken = this.$session.get("shopify_customer_id");
              this.retail_fetch_orders(
                customerToken,
                index,
                isRefund,
                "shopify_customer_id"
              );
              return true;
            } else {
              return false;
            }
          } else {
            let woocommerce_store_login_detail =
              this.get_woocommerce_store_window_customer_email();
            if (Boolean(woocommerce_store_login_detail) == false) {
              return false;
            } else {
              this.$session.set(
                "shopify_customer_id",
                woocommerce_store_login_detail[0]
              );
              this.$session.set(
                "shopify_customer_token",
                woocommerce_store_login_detail[1]
              );
              if (this.chat[index].is_refund) {
                this.retail_fetch_customer_id(
                  woocommerce_store_login_detail[0],
                  index,
                  "shopify_customer_id"
                );
              } else {
                this.retail_fetch_orders(
                  woocommerce_store_login_detail[0],
                  index,
                  isRefund,
                  "shopify_customer_id"
                );
              }
              return true;
            }
          }
        } else {
          return true;
        }
      } else if (this.retail_web_framework == "magento") {
        if (
          (this.chat[index].fetch_shopify_details &&
            !Boolean(this.chat[index].is_refund) &&
            !Boolean(this.chat[index].recent_orders_list)) ||
          (this.chat[index].fetch_shopify_details &&
            Boolean(this.chat[index].is_refund) &&
            !Boolean(this.chat[index].refund_orders_list)) ||
          (this.chat[index].fetch_shopify_details &&
            Boolean(this.chat[index].return_shopify_email))
        ) {
          if (this.retail_order_retreival_only_email_required) {
            this.shopify_customer_id = this.$session.get("shopify_customer_id");
            if (Boolean(this.shopify_customer_id)) {
              let customerToken = this.$session.get("shopify_customer_id");
              this.retail_fetch_orders(
                customerToken,
                index,
                isRefund,
                "shopify_customer_id"
              );
              return true;
            } else {
              return false;
            }
          } else {
            let magento_store_login_detail =
              this.get_magento_store_window_customer_email();
            if (Boolean(magento_store_login_detail) == false) {
              return false;
            } else {
              this.$session.set(
                "shopify_customer_id",
                magento_store_login_detail[0]
              );
              this.$session.set(
                "shopify_customer_token",
                magento_store_login_detail[1]
              );
              if (this.chat[index].is_refund) {
                this.retail_fetch_customer_id(
                  magento_store_login_detail[0],
                  index,
                  "shopify_customer_id"
                );
              } else {
                this.retail_fetch_orders(
                  magento_store_login_detail[0],
                  index,
                  isRefund,
                  "shopify_customer_id"
                );
              }
              return true;
            }
          }
        } else {
          return true;
        }
      } else if (this.retail_web_framework == "bigcommerce") {
        if (
          (this.chat[index].fetch_shopify_details &&
            !Boolean(this.chat[index].is_refund) &&
            !Boolean(this.chat[index].recent_orders_list)) ||
          (this.chat[index].fetch_shopify_details &&
            Boolean(this.chat[index].is_refund) &&
            !Boolean(this.chat[index].refund_orders_list)) ||
          (this.chat[index].fetch_shopify_details &&
            Boolean(this.chat[index].return_shopify_email))
        ) {
          if (this.retail_order_retreival_only_email_required) {
            this.shopify_customer_id = this.$session.get("shopify_customer_id");
            if (Boolean(this.shopify_customer_id)) {
              let customerToken = this.$session.get("shopify_customer_id");
              this.retail_fetch_orders(
                customerToken,
                index,
                isRefund,
                "shopify_customer_id"
              );
              return true;
            } else {
              return false;
            }
          } else {
            let bigcommerce_store_login_detail =
              this.get_bigcommerce_store_window_customer_email();
            if (Boolean(bigcommerce_store_login_detail) == false) {
              return false;
            } else {
              this.$session.set(
                "shopify_customer_id",
                bigcommerce_store_login_detail[0]
              );
              this.$session.set(
                "shopify_customer_token",
                bigcommerce_store_login_detail[1]
              );
              if (this.chat[index].is_refund) {
                this.retail_fetch_customer_id(
                  bigcommerce_store_login_detail[0],
                  index,
                  "shopify_customer_id"
                );
              } else {
                this.retail_fetch_orders(
                  bigcommerce_store_login_detail[0],
                  index,
                  isRefund,
                  "shopify_customer_id"
                );
              }
              return true;
            }
          }
        } else {
          return true;
        }
      }
    },
    demo_retail_question() {
      if (this.is_retail_bot && this.isCalledFromSetup) {
        axios
          .post(
            api_calls.template_synonyms(),
            {
              company_id: this.companyid,
              company_name: this.companyname,
              is_get_product_list: true,
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
              let product_names_list = response.data.data.product_names_list;
              let item =
                product_names_list[
                  Math.floor(Math.random() * product_names_list.length)
                ];
              this.to_send = `Please show me ${item}`;
              swal({
                text: "Testing of Bot in Progress, Searching for a product from your Store!",
                toast: true,
                showCancelButton: false,
                showConfirmButton: false,
                type: "info",
                timer: 5000,
              });
              setTimeout(() => {
                // $("#send_btn").click()
                this.chat.push({
                  conversation_only: true,
                  sending: true,
                  sent: this.to_send,
                  time: this.generate_time(),
                });
                // this.$session.set("BotResponse_Conversation", this.chat);
                this.update_scrollbar("upto_end", "sender");
                axios
                  .post(api_calls.chatbot_response_cense(), {
                    chat: this.to_send,
                    token: this.bot_response_token_value,
                    username: this.$session.get("UserInformation").email,
                    source: "Web",
                    license_key:
                      this.$session.get("UserInformation").license_key,
                    role: this.$session.get("UserInformation").role,
                    refreshed_or_closed: this.refreshed_or_closed,
                  })
                  .then((response) => {
                    this.response_handling(response, "display_success_toastr");
                  });
                this.to_send = "";
              }, 3200);
            } else if(response.data.message.MSG_CODE === this.api_status_code.INTEGRATION_DETAILS_NOT_FOUND_MODELS.MSG_CODE) {
              swal({
                text: response.data.message.MSG,
                toast: true,
                showCancelButton: false,
                showConfirmButton: false,
                type: "info",
                timer: 5000,
              });
            }
          })
          .catch((e) => {
            this.spinnerOn = false;
            var msg = {
              conversation_only: true,
              time: this.generate_time(),
              ask_feedback: false,
              received:
                "Some error occurred while testing. Please try by refreshing the browser! If the issue persists, please contact system admin.",
              receiving: true,
            };
            this.chat.push(msg);
          });
      }
    },
    retail_check_customer_logged_in() {
      let customer_data = {
        is_customer_logged_in: false,
        customer_id: null,
      };
      if (Boolean(this.shopify_customer_id)) {
        customer_data.is_customer_logged_in = true;
        customer_data.customer_id = this.shopify_customer_id;
      }
      let stringified_customer_payload = JSON.stringify({
        customer_data,
      });
      this.is_typing_indicator_on = true;
      axios
        .post(api_calls.chatbot_response_cense(), {
          license_key: this.$session.get("UserInformation").license_key,
          token: this.bot_response_token_value,
          username: this.$session.get("UserInformation").email,
          source: "Web",
          chat: `/shopify_retreive_customer_specific_offers${stringified_customer_payload}`,
          token: this.bot_response_token_value,
          role: this.$session.get("UserInformation").role,
          refreshed_or_closed: this.refreshed_or_closed,
        })
        .then((response) => {
          this.response_handling(response, null);
        })
        .catch((e) => {
          console.log(e);
          this.update_scrollbar("upto_end", "response");
        });
    },
    send_retail_customer_id(index, is_login, metadata) {
      if (is_login === true) {
        let queryString = $("#shopify_login_form").serializeArray();
        let form_payload = {};
        form_payload["shopify_is_only_email"] =
          this.retail_order_retreival_only_email_required;
        form_payload["text"] = this.chat[index].metadata.text;
        form_payload["entity"] = this.chat[index].metadata.entity;
        for (var i in queryString) {
          form_payload[queryString[i].name] =
            this.chat[index].customer_email_id;
        }
        form_payload = JSON.stringify(form_payload);
        axios
          .post(api_calls.chatbot_response_cense(), {
            license_key: this.$session.get("UserInformation").license_key,
            token: this.bot_response_token_value,
            username: this.$session.get("UserInformation").email,
            source: "Web",
            chat: `/re_order_products_action${form_payload}`,
            token: this.bot_response_token_value,
            role: this.$session.get("UserInformation").role,
            refreshed_or_closed: this.refreshed_or_closed,
          })
          .then((response) => {
            this.chat[index].received = "";
            this.chat[index].fetch_shopify_details = false;
            this.chat.splice(index, 1);
            this.response_handling(response);
          })
          .catch((err) => {
            console.log("Error :>> ", err);
          });
      } else {
        // let form_payload = {
        //   email:'ashish.i@codearray.tech',
        //   password: "",
        //   shopify_is_only_email: false,
        //   text: this.chat[index].metadata.text,
        //   entity : this.chat[index].metadata.entity
        // };
        // form_payload = JSON.stringify(form_payload);
        // axios
        //   .post(api_calls.chatbot_response_cense(), {
        //     license_key: this.$session.get("UserInformation").license_key,
        //     token: this.bot_response_token_value,
        //     username: this.$session.get("UserInformation").email,
        //     source: "Web",
        //     chat: `/re_order_products_action${form_payload}`,
        //     token: this.bot_response_token_value,
        //     role: this.$session.get("UserInformation").role,
        //     refreshed_or_closed: this.refreshed_or_closed,
        //   })
        //   .then((response) => {
        //     console.log(response.data);
        //     console.log(this);
        //     this.response_handling(response)
        //   })
        //   .catch((err) => {
        //     console.log("Error :>> ", err);
        //   });
      }
    },
    open_messaging_framework_integration(url) {
      var link = document.createElement("a");
      link.href = url;
      // link.setAttribute("download", file_name);
      link.setAttribute("target", "_blank");
      document.body.appendChild(link);
      link.click();
      link.remove();
    },
    support_subscription_data() {
      axios
        .post(api_calls.chatbot_response_cense(), {
          license_key: this.$session.get("UserInformation").license_key,
          token: this.bot_response_token_value,
          username: this.$session.get("UserInformation").email,
          token: this.bot_response_token_value,
          role: this.$session.get("UserInformation").role,
          refreshed_or_closed: this.refreshed_or_closed,
          chat: "/support_subscription_data",
          source: "Web",
        })
        .then((response) => {
          this.response_handling(response);
        });
    },
    check_no_products() {
      let products_div = document.getElementById("products_list_div");
      let display_none_count = 0;
      for (let i = 0; i < products_div.children.length; i++) {
        if (products_div.children[i].style.display === "none") {
          display_none_count += 1;
        }
      }
      if (display_none_count === products_div.children.length) {
        var msg = {
          conversation_only: true,
          time: this.generate_time(),
          received:
            "Sorry, we could not find any products. Please try rephrasing to search a different product!",
          receiving: true,
        };
        this.chat.push(msg);
      }
    },
    get_magento_store_window_customer_email() {
      try {
        let curr = JSON.parse(this.user_data.magento_customer_data);
        if (Boolean(curr.id) == true && Boolean(curr.email) == true) {
          var customer = [curr.id, curr.email];
          return customer;
        }
      } catch (e) {}
      return null;
    },
    get_woocommerce_store_window_customer_email() {
      try {
        let curr = this.user_data.woo_current_user;
        if (curr.ID !== 0 && curr.allcaps.customer == true) {
          var customer = [curr.data.ID, curr.data.user_email];
          return customer;
        }
      } catch (e) {}
      return null;
    },
    get_bigcommerce_store_window_customer_email() {
      // Remaining not implemented
      try {
        let curr = JSON.parse(this.user_data.bigcommerce_customer_data);
        if (Boolean(curr.id) == true && Boolean(curr.email) == true) {
          var customer = [curr.id, curr.email];
          return customer;
        }
      } catch (e) {}
      return null;
    },
    get_shopify_store_window_customer_id() {
      try {
        let curr = window.ShopifyAnalytics.meta.page.customerId;
        if (curr !== undefined && curr !== null && curr !== "") {
          return curr;
        }
      } catch (e) {}
      try {
        let curr = window.meta.page.customerId;
        if (curr !== undefined && curr !== null && curr !== "") {
          return curr;
        }
      } catch (e) {}
      try {
        let curr = _st.cid;
        if (curr !== undefined && curr !== null && curr !== "") {
          return curr;
        }
      } catch (e) {}
      return null;
    },
    no_orders_to_be_shown(index) {
      this.chat[index].received = "It seems you have no orders right now!";
    },
    change_chat_text_to_login_redirect(index) {
      this.chat[index].received =
        '<p style="width:auto;margin-bottom:0;"> Please login on the store by clicking <a title="This feature is only available on the store website."class="bot-response-style" style="cursor: not-allowed;" href="javascript: void(0)"> here </a></p>';
    },
    return_document_cookies(name) {
      let cookie = {};
      document.cookie.split(";").forEach(function (el) {
        let [k, v] = el.split("=");
        cookie[k.trim()] = v;
      });
      return cookie[name];
    },
    available_qty(stock_qty, id) {
      if (this.addtoCartdata.length != 0) {
        for (var i in this.addtoCartdata) {
          if (this.addtoCartdata[i].id === id) {
            let res = stock_qty - this.addtoCartdata[i].order_qty;
            return res == 0 ? "reached" : res;
          }
        }
        return stock_qty;
      } else {
        return stock_qty;
      }
    },
    scroll_card_right(item) {
      var doc = document.querySelector(`#carousel_cards_id_${item}`);
      doc.scrollLeft += 250;
      var maxScrollLeft = doc.scrollWidth - doc.clientWidth;
      maxScrollLeft = maxScrollLeft - 230;
      let second_bttn = document.querySelector(`#carousel_scroll_btn2_${item}`);
      let first_bttn = document.querySelector(`#carousel_scroll_btn1_${item}`);
      first_bttn.style.display = "block";
      if (doc.scrollLeft >= maxScrollLeft) {
        second_bttn.style.display = "none";
      }
    },
    scroll_card_left(item) {
      var doc = document.querySelector(`#carousel_cards_id_${item}`);
      doc.scrollLeft -= 250;
      let first_bttn = document.querySelector(`#carousel_scroll_btn1_${item}`);
      let second_bttn = document.querySelector(`#carousel_scroll_btn2_${item}`);
      second_bttn.style.display = "block";
      if (doc.scrollLeft <= 250) {
        first_bttn.style.display = "none";
      }
    },
  },
};
</script>
<style>
.bot-font-sender {
  font-family: var(--bot-font-style) !important;
  color: var(--bot-font-color-sender) !important;
}
.bot-font-receiver {
  font-family: var(--bot-font-style) !important;
  color: var(--bot-font-color-receiver) !important;
  background: var(--bot-response-bg-color) !important;
}

a.bot-response-style,
a.bot-response-style:hover,
a.bot-response-style:focus {
  text-decoration: underline !important;
  font-weight: 500;
}
.bot-font-buttons {
  font-family: var(--bot-font-style) !important;
  color: var(--bot-font-color-buttons) !important;
}
.open_cense_website:hover {
  cursor: pointer;
}
.bot-font-style {
  font-family: var(--bot-font-style) !important;
}
.product-variant-title {
  font-size: 18px;
  color: #666;
  font-weight: 400;
  text-align: center;
  margin-top: 0px !important;
  margin-bottom: 0px !important;
}
.dynamic-button {
  background-color: var(--bot-button-background) !important;
  border-color: var(--bot-button-border) !important;
  color: var(--bot-font-color-buttons) !important;
}
.add-to-cart {
  background-color: var(--bot-button-background);
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 12px 40px;
  letter-spacing: 0.3px;
  border-radius: 3px;
  border-color: var(--bot-button-border) !important;
  font-size: 15px;
  font-family: var(--bot-font-style) !important;
  color: var(--bot-font-color-buttons) !important;
  font: 400 13.3333px Arial;
  color: #fff;
}
.add-to-cart:hover {
  background-color: var(--bot-button-background) !important;
}
.add-to-cart:active {
  background-color: var(--bot-button-background) !important;
  border-color: var(--bot-button-border) !important;
}
.product-price-woocommerce {
  font-size: 12px;
  font-weight: bold;
  color: #4a4a4a;
  margin-bottom: 6px !important;
  /* font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; */
}
.cart-qty-num {
  font-size: 15px;
  margin-bottom: 17px;
  margin-left: -2px;
  display: inline-block;
  vertical-align: middle;
  height: 29px;
  border-radius: 50%;
  color: #fff;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.cense-cart-btn {
  height: 40px;
  background-color: var(--bot-button-background);
  border-color: var(--bot-button-border) !important;
  border-radius: 3px;
  padding: 0px 10px;
}
.product_scroll_btn {
  margin-top: 2.3% !important;
  margin-bottom: 3% !important;
  height: 170px !important;
  width: 22px !important;
  background-color: var(--bot-button-background) !important;
  border-color: var(--bot-button-border) !important;
  /* border-radius: 3px !important;  */
  padding: 0px 0px !important;
  color: var(--bot-font-color-buttons) !important;
  opacity: 1 !important;
}
.product_scroll_btn:hover {
  opacity: 0.8 !important;
}
.product_scroll_btn:focus,
.product_scroll_btn:active:focus {
  outline: none !important;
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
}
.product_scroll_btn_icon {
  margin-top: 77px !important;
  color: var(--bot-font-color-buttons) !important;
}
.shopify-buy-cart-wrapper.shopify-buy-frame.shopify-buy-frame--cart.is-initialized {
  position: fixed;
  right: 0;
  transition: all 250ms cubic-bezier(0.165, 0.84, 0.44, 1);
  display: none !important;
}
.shopify-buy-cart-wrapper.shopify-buy-frame.shopify-buy-frame--cart.is-initialized.is-active {
  position: absolute;
  transition: translateX(0);
  display: block !important;
}
.shopify-buy-frame--cart {
  display: none !important;
}
.shopify-buy__btn {
  font-size: 12px !important;
  padding: 12px 10px !important;
}

.order-elem {
  background: #ffffff;
}

.order-elem img {
  width: 30%;
  height: 30%;
  object-fit: contain;
}

.order-elem .order-title,
.order-elem .order-price {
  font-size: 14px;
}

.order-elem .order-quantity {
  font-size: 12px;
}

.chat-row.receiver .chat a {
  color: var(--bot-link-color) !important;
}
.bot-img {
  /* background-image: url(/img/Bot_img.png); */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 23px;
  height: 23px;
  position: absolute;
  bottom: 0;
  border-radius: 100%;
}
.vue-star-rating-rating-text {
  display: none !important;
}
.vue-star-rating-pointer .vue-star-rating-star {
  margin-right: 10px !important;
  margin-bottom: 4px !important;
}
</style>
<style scoped>
.chat-cense-footer {
  color: #999b9a;
  border-radius: 0 0 15px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  width: 100%;
  font-size: .75rem;
  line-height: 1.25rem;
  opacity: .9;
  text-decoration: none;
}
.sender .chat {
  background: var(--user-response-bg-color) !important;
}
.live-agent-window {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 50px;
  background-color: white;
  -webkit-animation-duration: 3s;
  animation-duration: 3s;
}
@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
}
.del-note {
  color: var(--delivery-note-color) !important;
}
.chat-his > .time {
  color: var(--delivery-note-color) !important;
}
.img_only_id {
  margin-top: 4% !important;
  margin-left: 8% !important;
  max-width: calc(100% - 36px) !important;
}
.img_id {
  margin-top: 4% !important;
  margin-left: 8% !important;
  max-width: calc(100% - 36px) !important;
}
.banner_img_url_only_id {
  margin-top: 4% !important;
  margin-left: 8% !important;
  max-width: calc(100% - 31px) !important;
}
.banner_img_url_id {
  margin-top: 4% !important;
  margin-left: 30px !important;
  max-width: calc(100% - 12px) !important;
}
.video_url_id {
  margin-top: 4% !important;
  width: 10.25cm !important;
  margin-left: 2% !important;
  max-width: calc(100% - 6px) !important;
}
.video_url_only_id {
  margin-top: 4% !important;
  width: 10.25cm !important;
  margin-left: 8% !important;
  max-width: calc(100% - 23px) !important;
}
.banner_video_url_only_id {
  margin-top: 4% !important;
  width: 10.25cm !important;
  margin-left: 8% !important;
  max-width: calc(100% - 23px) !important;
}
.banner_video_url_id {
  margin-top: 4% !important;
  width: 10.25cm !important;
  margin-left: 2% !important;
  max-width: calc(100% - 6px) !important;
}
.product-variation {
  border: 1px solid #d3dbe2;
  border-radius: 3px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
  background: #fff;
  overflow: hidden;
  vertical-align: bottom;
}
.select-product-variation {
  padding: 7px 10px;
  font-weight: 400 !important;
  font-size: 13.3333px !important;
  padding-right: 32px;
  border: 0;
  width: 100%;
  background: transparent;
  -webkit-appearance: none;
}
.select-icon {
  cursor: pointer;
  display: block;
  fill: #798c9c;
  position: absolute;
  right: 10px;
  top: 50%;
  margin-top: -6px;
  pointer-events: none;
  width: 12px;
  height: 12px;
}
#return_increment_numeric_input :focus-visible {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25) !important;
  outline: none !important;
}
.receiver > .d-flex {
  align-items: center;
}
#send_button.filled {
  fill: var(--bot-button-color) !important;
}
.table td,
.table th {
  padding: 0.5rem !important;
}
.stop-chat {
  width: 100%;
}
.chat-footer > a {
  color: #283879 !important;
}
.buy-now {
  font-weight: 800;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  margin-top: -5%;
}
.chat-inner.--delete {
  -webkit-animation: fadein 0.9s linear;
  -moz-animation: fadein 0.9s linear;
  animation: fadein 0.9s linear;
}
@keyframes fadein {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@-webkit-keyframes fadein {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@-moz-keyframes fadein {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.image-box-woocommerce {
  width: 170px;
  height: 170px;
  margin-top: 6%;
  margin-bottom: 6%;
}
.product-title-woocommerce {
  font-size: 18px;
  line-height: 1.2;
  color: #4a4a4a;
  margin-bottom: 0px !important;
  font-weight: 700;
  /* font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; */
  /* display: inline-block; */
  box-sizing: border-box;
  white-space: pre-line;
  word-wrap: break-word;
}
.product-title-woocommerce .textMaxLine {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-size: 16px;
  height: 40px;
}
.product-title-woocommerce .product-variant-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1 !important;
  overflow: hidden;
  font-size: 16px;
  height: 20px;
}
.plus {
  border-radius: 0px 3px 3px 0px;
  /* border: 1px solid #767676; */
  border-left: 0px;
}
.minus {
  border-radius: 3px 0px 0px 3px;
  /* border: 1px solid #767676; */
  border-right: 0px;
}
.plus,
.minus {
  width: 26px;
  cursor: pointer;
  padding: 0;
}
.product-qty {
  display: inline-flex !important;
  margin-top: 10px !important;
}
.quantity-btn {
  height: 30px;
  font-size: 16px;
  border: 1px solid #d3dbe2;
  vertical-align: bottom;
  background: white;
}
.quantity-btn:focus {
  outline: -webkit-focus-ring-color auto 1px !important;
}
.image-box {
  height: 90px;
  width: 100px;
  margin-top: 6%;
}
.image-box-msg-frmw {
  /* height: 55px;
  width: 50px; */
  margin-top: 10%;
  display: block;
  max-width: 100px;
  max-height: 65px;
  width: auto;
  height: auto;
}
.buy-products {
  height: 180px;
}
.image-container-woocommerce {
  /* background: #fff; */
  /* border: #fff 1px solid; */
  text-align: center;
  border-radius: 5px 5px 5px 5px;
  margin-right: 3% !important;
  width: 50% !important;
  /* overflow: hidden; */
  border: none;
  height: auto;
  display: block;
}
.image-container {
  background: #fff;
  border: #fff 1px solid;
  border-radius: 5px 5px 5px 5px;
  margin-left: 5%;
  height: 180px;
}
.image-container > p {
  font-size: 10px;
  text-align: center;
}
.chat-row.sender .chat,
.chat-row.receiver .chat {
  font-weight: 450;
}
.chat-row.sender .chat {
  filter: drop-shadow(0 1px 2px rgba(0,0,0,.1));
  background: #6bac1b;
  border-radius: 12px 12px 0 12px;
  border: 0.3px solid #d9d9d9;
  color: #fff;
  display: inline-block;
  font-size: 14px;
  line-height: 1.5;
  padding: 12px 12px 20px 12px;
  text-align: left;
  word-break: break-word;
  max-width: 17rem;
  min-width: 9rem;
}
.chat-body {
  overflow-y: auto;
}
.chat-body .chat-row.receiver p,
.chat-body .chat-row.receiver a {
  width: 50%;
}
.chat-body .chat-row.receiver a {
  color: var(--bot-button-background) !important;
  font-weight: 400;
}
.chat-row.receiver .chat {
  background-color: var(--bot-response-bg-color) !important;
  color: #000;
  width: fit-content;
  margin-left: 30px;
  filter: drop-shadow(0 1px 2px rgba(0,0,0,.1));
  padding: 12px 12px 18px 12px;
  line-height: 1.5;
  max-width: 19rem;
  min-width: 9rem;
  text-align: left;
  word-break: break-word;
  border-radius: 12px 12px 12px 0;
  border: 0.3px solid #d9d9d9;
  font-size: 14px;
}
button.custom-buttons {
  background: var(--bot-button-background);
  min-width: 100px;
  font-family: var(--bot-font-style) !important;
  color: var(--bot-font-color-buttons) !important;
  border-color: var(--bot-button-border) !important;
  /* font-size: 13px;
  border-radius: 50px;
  padding: 0.375rem 0.75rem !important; */
  font-size: 14px;
  padding: 6px 6px;
  border-radius: 8px;
  line-height: 22px;
  margin-top: var(--bot-buttons-horizontal-spacing);
  margin-left: var(--bot-buttons-vertical-spacing);
}
button.custom-buttons[disabled] {
  opacity: 1;
}
.buttons-alignment {
  justify-content: var(--bot-buttons-alignment);
}
button.custom-buttons.retailigence {
  border-radius: 10px !important;
  background: #9d2924 !important;
}
button.custom-buttons.retailigence:hover {
  background: #9d2924bf !important;
}
div::-webkit-scrollbar {
  max-height: 20px;
  width: 6px;
  height: 4px;
  border-radius: 10px;
}
.bounce {
  animation: bounce 4s infinite;
}
.fa.fa-microphone {
  color: #8a8a8a63;
  font-size: 24px;
}
.fas.fa-video {
  color: #8a8a8a63;
  font-size: 18px;
}
.fa.fa-microphone :hover {
  color: red;
}

#stop-chat-button {
  color: red;
}
/* #stop-chat-button :hover{ 
  color: red;
  animation: none;
} */
/* #stop-chat-button {
  animation-name: flicker;
  animation-duration: 0.7s;
  animation-iteration-count: infinite;

  -webkit-animation-name: flicker;
  -webkit-animation-duration: 0.7s;
  -webkit-animation-iteration-count: infinite;
} */

#microphone.voice-on {
  animation-name: flicker;
  animation-duration: 0.7s;
  animation-iteration-count: infinite;

  -webkit-animation-name: flicker;
  -webkit-animation-duration: 0.7s;
  -webkit-animation-iteration-count: infinite;
}
/* Track */
div::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
.toast-message {
  margin-top: 1000px;
}
/* Handle */
div::-webkit-scrollbar-thumb {
  background: #7d7d7d;
  border-radius: 10px;
}

/* Handle on hover */
div::-webkit-scrollbar-thumb:hover {
  background: #555;
  border-radius: 10px;
}
.toast-container {
  margin-left: 800px;
}
.typewriter span {
  color: #fff;
  font-family: monospace;
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: 0.15em solid orange; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: 0.15em; /* Adjust as needed */
  animation: typing 3.5s steps(30, end), blink-caret 0.5s step-end infinite;
}

/* Harsh */
.chat-head .media .media-body p {
  font-weight: bold;
}
.prompt .chat {
  background: #fff;
}
p {
  font-family: Arial, Helvetica, sans-serif;
}

.chat-footer p {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Noto Color Emoji";
}

.btn:focus,
.btn:active:focus {
  outline: none !important;
  box-shadow: none;
  -webkit-box-shadow: none;
}

/**/
#product_refund_txt_area:focus {
  outline: none;
  box-shadow: none;
  border-color: #53b9d0 !important;
  color: #9499c2 !important;
}
.form-control {
  line-height: 20px;
  font-size: 13px;
  color: #494d69;
  border-radius: 10px;
  border: none;
  height: auto;
  font-weight: 300;
}

#shopify_login_form {
  margin-left: 30px;
  margin-top: 10px;
}

#shopify_login_form .form-control {
  padding: 10px 0 10px 15px;
}

.chat-txt input {
  border-top-left-radius: 0;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}
.country,
.country2 {
  margin-left: 2%;
  height: 20px;
}
.chat-wrap {
  min-width: 320px;
  max-width: 320px;
}
.chat-body {
  max-height: 300px;
  min-height: 60vh;
}

.receiver .chat {
  font-size: 14px !important;
  font-weight: 300 !important;
}

.chat-act1 {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1111;
}

.chat-act1 a {
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #273679 url(/public/img/ForeignExchange/ui-15.png) center / cover
    no-repeat;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}
.chat-act1.active a img {
  width: 100%;
}
.chat-act1 a.active {
  -webkit-animation-delay: 0;
  -webkit-animation-duration: 0.5s;
  /* -webkit-animation-name: rotation-rl; */
  -webkit-animation-fill-mode: forwards;
  -moz-animation-delay: 0;
  -moz-animation-duration: 0.5s;
  /* -moz-animation-name: rotation-rl; */
  -moz-animation-fill-mode: forwards;
  animation-delay: 0;
  animation-duration: 0.5s;
  /* animation-name: rotation-rl; */
  animation-fill-mode: forwards;
}
.chat-act1 a.inactive {
  -webkit-animation-delay: 0;
  -webkit-animation-duration: 0.5s;
  /* -webkit-animation-name: rotation-lr; */
  -webkit-animation-fill-mode: forwards;
  -moz-animation-delay: 0;
  -moz-animation-duration: 0.5s;
  /* -moz-animation-name: rotation-lr; */
  -moz-animation-fill-mode: forwards;
  animation-delay: 0;
  animation-duration: 0.5s;
  /* animation-name: rotation-lr; */
  animation-fill-mode: forwards;
}
@media (max-width: 991px) {
  .chat-act1 {
    bottom: 15px;
    right: 15px;
  }
  .chat-act1 a {
    width: 50px;
    height: 50px;
  }
}

/* The typing effect */
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: orange;
  }
}

@keyframes flicker {
  from {
    color: red;
  }
  to {
    color: #8a8a8a63;
  }
}
@-webkit-keyframes flicker {
  from {
    color: red;
  }
  to {
    color: #8a8a8a63;
  }
}
@-moz-keyframes flicker {
  from {
    color: red;
  }
  to {
    color: #8a8a8a63;
  }
}
@-o-keyframes flicker {
  from {
    color: red;
  }
  to {
    color: #8a8a8a63;
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-180%);
  }
  60% {
    transform: translateY(-90%);
  }
}
@-webkit-keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    -webkit-transform: translateY(0);
  }
  40% {
    -webkit-transform: translateY(-200%);
  }
  60% {
    -webkit-transform: translateY(-100%);
  }
}
@-moz-keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    -moz-transform: translateY(0);
  }
  40% {
    -moz-transform: translateY(-200%);
  }
  60% {
    -moz-transform: translateY(-100%);
  }
}
@-o-keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    -o-transform: translateY(0);
  }
  40% {
    -o-transform: translateY(-200%);
  }
  60% {
    -o-transform: translateY(-100%);
  }
}
.cart-img {
  height: 25px !important;
  width: 25px !important;
}
/* .cart-qty {
  font-size: 22px;
} */
.shake {
  /* width: 90%; */
  /* height: 60%; */
  /* padding-top: 4px; */
  animation: shakeCart 0.4s ease-in-out forwards;
}
@keyframes shakeCart {
  25% {
    transform: translateX(6px);
  }
  50% {
    transform: translateX(-4px);
  }
  75% {
    transform: translateX(2px);
  }
  100% {
    transform: translateX(0);
  }
}
.carousel_card {
  width: 100% !important;
}
.carousel_cards {
  min-width: 55% !important;
  margin-left: 30px !important;
  height: auto !important;
  margin-bottom: 0.8rem !important;
}
.cards_carsol {
  scroll-behavior: smooth !important;
}
.carousel_card_single {
  height: auto !important;
  min-width: 55% !important;
  border-radius: 0.25rem !important;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  background-color: #f0f2f5 !important;
  border-radius: 1.3rem !important;
}
.carousel_card_single_content {
  padding: 0.6em 0.6em 0.2em 0.6em !important;
}
.carousel_card_single_para {
  padding-bottom: 0.4em !important;
}
.carousel_card_single img {
  width: 100% !important;
  height: 10em !important;
  background-position: center center !important;
  background-size: cover !important;
  border-top-left-radius: 1.6em !important ;
  border-top-right-radius: 1.6em !important;
  display: block !important;
}
.carousel_card_single iframe {
  width: 100% !important;
  height: 10em !important;
  background-position: center center !important;
  background-size: cover !important;
  border-top-left-radius: 1.6em !important ;
  border-top-right-radius: 1.6em !important;
  display: block !important;
}
.carousel_card_single p {
  font-family: var(--bot-font-style) !important;
  width: 100% !important;
  font-size: 0.8805rem !important;
  font-weight: 300 !important;
  line-height: 1em !important;
  text-align: initial !important;
  color: #4a4a4a !important;
  margin-bottom: 0.3em !important;
}
.carousel_card_single h4 {
  font-family: var(--bot-font-style) !important;
  color: rgba(0, 0, 0, 1) !important;
  font-weight: 700 !important;
  font-size: 0.95rem !important;
  margin-bottom: 0.3em !important;
}
.carousel_card_single a {
  width: 95% !important;
  font-family: var(--bot-font-style) !important;
  margin-bottom: 0.3em !important;
  border-radius: 8px !important;
  font-size: 14px !important;
  text-align: center !important;
  color: rgba(0, 0, 0, 1) !important;
  background: #e4e6eb !important;
  border: 1px solid #e4e6eb !important;
  padding: 6px 15px !important;
  font-weight: 550 !important;
  line-height: 1.9vh !important;
  display: inline-block !important;
  border-radius: 4px !important;
  cursor: pointer !important;
}
.carousel_card_button {
  text-align: center !important;
}
.carousel_card_single a:hover {
  opacity: 0.8 !important;
  background: #c8cbce !important;
}
.carousel_card_single a:active {
  transform: translateY(1px) !important;
  background: #a5cff1 !important;
}
.carousel_scroll_btn1 {
  position: absolute !important;
  cursor: pointer !important;
  top: 9em !important;
  border-radius: 30%;
  background: #e4e6eb !important;
  border: 1px solid #e4e6eb !important;
  padding: 0.2em !important;
}
.carousel_scroll_btn1:hover {
  opacity: 0.8 !important;
  background: #c8cbce !important;
}
.carousel_scroll_btn1:active {
  transform: translateY(3px) !important;
}
.carousel_scroll_btn2 {
  position: absolute !important;
  cursor: pointer !important;
  top: 9em !important;
  right: 0vh !important;
  border-radius: 30% !important;
  background: #e4e6eb !important;
  border: 1px solid #e4e6eb !important;
  padding: 0.2em !important;
}
.carousel_scroll_btn2:hover {
  opacity: 0.8 !important;
  background: #c8cbce !important;
}
.carousel_scroll_btn2:active {
  transform: translateY(3px) !important;
}
</style>