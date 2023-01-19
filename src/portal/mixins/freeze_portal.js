import Swal from "sweetalert2";
export default {
    data () {
      return {
        restriction_list: this.$session.get("RestrictionList"),
        hover_title: "Upgrade your plan",
        swal_text: "You won't be able to do any operations hereby, Please upgrade your plan."
      }
    },
    created() {
        // console.log('Hey from the mixin.', this.restriction_list);
    },
    methods: {
        freeze_portal() {
            const vm = this;
            var check_component = this.$vnode.tag;
            if (this.restriction_list != undefined) {
                if ((check_component.includes("ProductsRankingPage")) && ("ProductsRankingPage" in this.restriction_list.components_name)){
                    vm.$root.$emit("ProductsRankingPageDisabled", true)
                    // full_page_freeze
                    // Swal({
                    //     title: "Subscripton expired",
                    //     text: this.swal_text,
                    //     type: "warning",
                    // });
                    // var x = document.getElementById("products_ranking_radio");
                    // x.style.pointerEvents = "none"
                    // x.style.cursor = "not-allowed";
                    // x.title = this.hover_title;
                }
                if ((check_component.includes("MiscellaneousPage")) && ("MiscellaneousPage" in this.restriction_list.components_name)){
                    vm.$root.$emit("MiscellaneousPageDisabled", true)
                    // Swal({
                    //     title: "Subscripton expired",
                    //     text: this.swal_text,
                    //     type: "warning",
                    // });
                    // var x = document.getElementById("trained_intent_models_radio");
                    // x.style.pointerEvents = "none"
                    // x.style.cursor = "not-allowed";
                    // x.title = this.hover_title;
                }
                if ((check_component.includes("chatscreen")) && ("CheckBotResponsePage" in this.restriction_list.components_name)){
                    vm.$root.$emit("chatscreenDisabled",true)
                    var x = document.getElementById("checkbot_response_train_model_btn");
                    x.disabled = false;
                    if( x != null ){
                        x.style.cursor = "not-allowed";
                        x.title = this.hover_title;
                      }
                }
                if ((check_component.includes("NewIntentsPage")) && ("NewIntentsPage" in this.restriction_list.components_name)){
                    vm.$root.$emit("NewIntentsPageDisabled", true);
                    var x = document.getElementById("add_intent_btn");
                    // x.disabled = true;
                    if( x != null ){
                        x.style.cursor = "not-allowed";
                        x.title = this.hover_title;
                    }      
                    // x.dataset.target = "";
                    var y = document.getElementById("train_model_btn");
                    y.disabled = false;
                    if( y != null ){
                        y.style.cursor = "not-allowed";
                        y.title = this.hover_title;
                    }
                }
                if ((check_component.includes("TrainTestBotPage")) && ("TrainTestBotPage" in this.restriction_list.components_name)){
                    vm.$root.$emit("TrainTestBotPageDisabled",true)
                    var x = document.getElementById("train_and_test_btn");
                    // x.disabled = false;
                    if( x != null ){
                        x.style.cursor = "not-allowed";
                        x.title = this.hover_title;
                    }
                }
                if ((check_component.includes("AlternateProductNamesPage")) && ("AlternateProductNamesPage" in this.restriction_list.components_name)){
                    vm.$root.$emit("AlternateProductNamesPageDisabled", true)
                    var x = document.getElementById("alternate_product_name_add_btn");
                    // x.disabled = false;
                    if( x != null ){
                        x.style.cursor = "not-allowed";
                        x.title = this.hover_title;
                    }
                    var y = document.getElementById("alternate_product_name_save_all_btn");
                    // y.disabled = false;
                    if( y != null ){
                        y.style.cursor = "not-allowed";
                        y.title = this.hover_title;
                    }
                    var z = document.getElementById("alternate_product_name_train_model_btn");
                    // z.disabled = false;
                    if( z != null ){
                        z.style.cursor = "not-allowed";
                        z.title = this.hover_title;
                    } 
                }
                if ((check_component.includes("ProductsCrosssellPage")) && ("ProductsCrosssellPage" in this.restriction_list.components_name)){
                    vm.$root.$emit("ProductsCrosssellPageDisabled", true)
                    var x = document.getElementById("product_crosssell_save_all_btn");
                    x.disabled = false;
                    if( x != null ){
                        x.style.cursor = "not-allowed";
                        x.title = this.hover_title;
                    }
                }
                if ((check_component.includes("ProductsUpsellPage")) && ("ProductsUpsellPage" in this.restriction_list.components_name)){
                    vm.$root.$emit("ProductsUpsellPageDisabled", true)
                    var x = document.getElementById("product_upsell_save_all_btn");
                    x.disabled = false;
                    if( x != null ){
                        x.style.cursor = "not-allowed";
                        x.title = this.hover_title;
                    }
                }
                if ((check_component.includes("EmailTemplatePage")) && ("EmailTemplatePage" in this.restriction_list.components_name)){
                    vm.$root.$emit("EmailTemplatePageDisabled", true)
                    var x = document.getElementById("email_page");
                    x.style.cursor = "not-allowed";
                    x.title = this.hover_title;
                    x.style.pointerEvents = "none";
                    x.style.opacity = "0.2"        
                }
                if ((check_component.includes("ProductSettingsPage")) && ("ProductSettingsPage" in this.restriction_list.components_name)){
                    vm.$root.$emit("ProductSettingsPageDisabled", true)
                    var x = document.getElementById("product_setting_email_save_btn");
                    if( x != null ){
                        x.style.cursor = "not-allowed";
                        x.title = this.hover_title;
                    }
                    var y = document.getElementById("product_setting_email_remove_btn");
                    if( y != null ){
                        y.style.cursor = "not-allowed";
                        y.title = this.hover_title;
                    } 
                    var z = document.getElementById("product_setting_promotional_email_save_btn");
                    if( z != null ){
                        z.style.cursor = "not-allowed";
                        z.title = this.hover_title;
                    }               
                }
                if ((check_component.includes("AnalyticsPage")) && ("AnalyticsPage" in this.restriction_list.components_name)){
                    // full_page_freeze
                    // Swal({
                    //     title: "Subscripton expired",
                    //     text: this.swal_text,
                    //     type: "warning",
                    // });
                    var x = document.getElementById("analytics_page");
                    if( x != null ){
                        x.style.cursor = "not-allowed";
                        x.title = this.hover_title;
                        x.style.pointerEvents = "none";
                    }
                }
                if ((check_component.includes("NerTrainingPage")) && ("NerTrainingPage" in this.restriction_list.components_name)){
                    vm.$root.$emit("NerTrainingPageDisabled", true)
                    var x = document.getElementById("ner_add_tag_btn");
                    x.disabled = true;
                    x.style.cursor = "not-allowed";
                    x.title = this.hover_title; 
                    var y = document.getElementById("ner_add_statement_btn");
                    y.disabled = true;
                    y.style.cursor = "not-allowed";                 
                    y.title = this.hover_title;
                    var z = document.getElementById("ner_upload_btn");
                    // .style.pointerEvents = "none"
                    z.disabled = true;
                    z.style.cursor = "not-allowed";
                    z.title = this.hover_title;
                    var a = document.getElementById("ner_train_model_btn");
                    // a.disabled = true;
                    a.style.cursor = "not-allowed";
                    a.title = this.hover_title;
                }
                if ((check_component.includes("VerifyResponsePage")) && ("VerifyResponsePage" in this.restriction_list.components_name)){
                    vm.$root.$emit("VerifyResponsePageDisabled", true)
                    var x = document.getElementById("verify_response_train_model_btn");
                    // x.disabled = true;
                    if( x != null ){
                        x.style.cursor = "not-allowed";
                        x.title = this.hover_title;
                    }
                    var y = document.getElementById("verify_response_save_btn");
                    // y.disabled = true;
                    if( y != null ){
                        y.style.cursor = "not-allowed";
                        y.title = this.hover_title;
                    } 
                }
                if ((check_component.includes("AddTaskPage")) && ("AddTaskPage" in this.restriction_list.components_name)){
                    vm.$root.$emit("AddTaskPageDisabled", true)
                    var x = document.getElementById("task_add_btn");
                    x.disabled = true;
                    if( x != null ){
                        x.style.cursor = "not-allowed";
                        x.title = this.hover_title;
                    }
                }
                if ((check_component.includes("CustomerFeedbackQuestionsPage")) && ("CustomerFeedbackQuestionsPage" in this.restriction_list.components_name)){
                    vm.$root.$emit("CustomerFeedbackQuestionsPageDisabled", true)
                    var x = document.getElementById("customer_feedback_save_all_btn");
                    // x.disabled = true;
                    if( x != null ){
                        x.style.cursor = "not-allowed";
                        x.title = this.hover_title;
                    } 
                    var y = document.getElementById("customer_feedback_add_btn");
                    // y.disabled = false;
                    if( y != null ){
                        y.style.cursor = "not-allowed";
                        y.title = this.hover_title;
                    } 
                    var z = document.getElementById("customer_feedback_edit_btn");
                    // z.disabled = false;
                    if( z != null ){
                        z.style.cursor = "not-allowed";
                        z.title = this.hover_title;
                    } 
                }
                if ((check_component.includes("ProductVariants")) && ("ProductVariants" in this.restriction_list.components_name)){
                    vm.$root.$emit("VariantsDisabled", true)
                    var x = document.getElementById("product_variant_add_btn");
                    // x.disabled = true;
                    if( x != null ){
                        x.style.cursor = "not-allowed";
                        x.title = this.hover_title;
                    }                    
                    var y = document.getElementById("product_variant_save_all_btn");
                    // y.disabled = true;
                    if( y != null ){
                        y.style.cursor = "not-allowed";
                        y.title = this.hover_title;
                    }
                }  
                if ((check_component.includes("CouponCodes")) && ("CouponCodes" in this.restriction_list.components_name)){
                    var x = document.getElementById("save_coupon_codes_button");
                    if( x != null ){
                        x.style.cursor = "not-allowed";
                        x.title = this.hover_title;
                    }
                    // x.disabled = false;
                    vm.$root.$emit("CouponCodesDisabled", true)
                }
                if ((check_component.includes("SmsTemplatePage")) && ("SmsTemplatePage" in this.restriction_list.components_name)){
                    vm.$root.$emit("SmsTemplatePageDisabled", true)
                    var y = document.getElementById("send_sms_btn1");
                    // y.disabled = true;
                    if( y != null ){
                        y.style.cursor = "not-allowed";
                        y.title = this.hover_title;
                    }
                    var z = document.getElementById("add_template_btn");
                    // z.disabled = false;
                    if( z != null ){
                        z.style.cursor = "not-allowed";
                        z.title = this.hover_title;
                    } 
                }
                if ((check_component.includes("BannerTemplatePage")) && ("BannerTemplatePage" in this.restriction_list.components_name)){
                    vm.$root.$emit("BannerTemplatePageDisabled", true)
                    var x = document.getElementById("add_template_btn");
                    // x.disabled = true;
                    if( x != null ){
                        x.style.cursor = "not-allowed";
                        x.title = this.hover_title;
                    }
                    var y = document.getElementById("add_template_btn1");
                    // x.disabled = true;
                    if( y != null ){
                        y.style.cursor = "not-allowed";
                        y.title = this.hover_title;
                    }                    
                }
                if ((check_component.includes("LiveChatPage")) && ("LiveChatPage" in this.restriction_list.components_name)){
                    vm.$root.$emit("LiveChatPageDisabled", true);   
                }
                if ((check_component.includes("intents_component")) && ("IntentsComponent" in this.restriction_list.components_name)){
                    vm.$root.$emit("intents_componentDisabled", true);
                    var x = document.getElementById("intent_page");
                    x.style.cursor = "not-allowed";
                    x.title = this.hover_title;
                    x.style.pointerEvents = "none";
                    x.style.opacity = "0.2"
                }
                if ((check_component.includes("entities_component")) && ("EntitiesComponent" in this.restriction_list.components_name)){
                    vm.$root.$emit("entities_componentDisabled", true);
                    var x = document.getElementById("entities_page");
                    x.style.cursor = "not-allowed";
                    x.title = this.hover_title;
                    x.style.pointerEvents = "none";
                    x.style.opacity = "0.2"
                }
                if ((check_component.includes("dialog_component")) && ("DialogComponent" in this.restriction_list.components_name)){
                    vm.$root.$emit("dialog_componentDisabled", true);
                    var x = document.getElementById("dialog_page");
                    x.style.cursor = "not-allowed";
                    x.title = this.hover_title;
                    x.style.pointerEvents = "none";
                    x.style.opacity = "0.2"
                }
                if ((check_component.includes("webhook_component")) && ("WebhookComponent" in this.restriction_list.components_name)){
                    vm.$root.$emit("webhook_componentDisabled", true);
                    var x = document.getElementById("webhook_page");
                    x.style.cursor = "not-allowed";
                    x.title = this.hover_title;
                    x.style.pointerEvents = "none";
                    x.style.opacity = "0.2"
                }
            }
        },
        show_subscription_expired_swal(val=false){
            const vm = this;
            Swal({
                type: "warning",
                text: `You are on free trial please, kindly upgrade your plan to use this feature`,
                showCancelButton: true,
                confirmButtonColor:'#3085d6',
                confirmButtonText: 'Subscribe Now',
                cancelButtonText: 'Later',
                cancelButtonColor: '#d33',
              }).then((result) => {
                if (result.value == true)
                {
                    if(val== false){
                    vm.$router.push({name: 'Settings',params:{Subscription:true}});
                    }
                }
                })
        }
    },
}