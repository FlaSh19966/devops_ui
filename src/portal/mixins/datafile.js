export default{

computed: {
    
    help_modal_data(){
     return [
        {
            name: 'NewIntentPage',
            page_path: '/bot/intents',
            data:{
                calldata:   `<div class="modal-header">\
                                <div class="modal-head d-flex align-items-center">\
                                    <div class="head-icn">\
                                        <img src="/img/msg-blue.png" alt />\
                                    </div>\
                                    <h3>${this.tlt('intent_help')}</h3>\
                                </div>\
                            </div>\
                            <div class="modal-body">\
                                <div>\
                                    <img src="https://storage.cense.ai/codearray/portal_ui_guide/intenthelp.png" style="max-width: 775px; height: 390px;" alt="simple text" />\
                                </div>\
                                    <hr>\
                                <div style="text-align: justify;">\
                                    <b>${this.tlt('intent_search')}</b>\
                                    <ol>\
                                        <li>${this.tlt('intent_search_first')}\
                                        ${this.tlt('intent_search_second')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('intent_add')}</b>\
                                    <ol>\
                                        <li>${this.tlt('intent_add_first')}\</li>\
                                        <li>${this.tlt('intent_add_second')}\</li>\
                                        ${this.tlt('intent_add_third')}\</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('intent_upload')}</b>\
                                    <ol>\
                                        <li>${this.tlt('intent_upload_first')}</li>\
                                        <li>${this.tlt('intent_upload_second')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('intent_download')}</b>\
                                    <ol>\
                                        <li>${this.tlt('intent_download_first')}\
                                        ${this.tlt('intent_download_second')}</li>\
                                        <li>${this.tlt('intent_download_third')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('intent_train_model')}</b>\
                                    <ol>\
                                        <li>${this.tlt('intent_train_model_first')}</li>\
                                        ${this.tlt('intent_train_model_second')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('intent_delete')}</b>\
                                    <ol>\
                                        <li>${this.tlt('intent_delete_first')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('intent_edit')}</b>\
                                    <ol>\
                                        <li>${this.tlt('intent_edit_first')}</li>\
                                        <li>${this.tlt('intent_edit_second')}</li>\
                                    </ol>\
                                </div>\
                            </div>`
            }, 
        },
        {
            name: 'Dashboard',
            page_path: '/bot/dashboard',
            data:{
                calldata:`<div class="modal-header">\
                                <div class="modal-head d-flex align-items-center">\
                                    <div class="head-icn">\
                                        <img src="/img/msg-blue.png" alt />\
                                    </div>\
                                    <h3>${this.tlt('dashboard_help')}</h3>\
                                </div>\
                            </div>\
                            <div class="modal-body">\
                                <div>\
                                    <img src="https://storage.cense.ai/codearray/portal_ui_guide/dashboardhelp.png" style="max-width: 765px; height: 340px;" alt="simple text" />\
                                </div>\
                                    <hr>\
                                <div style="text-align: justify;">\
                                    <b>${this.tlt('name_of_customer_who_login')}</b>\
                                    <ol>\
                                        <li>${this.tlt('name_of_person_shown_in_welcome')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('sidebar_menu')}</b>\
                                    <ol>\
                                        <li>${this.tlt('users_can_navigate_menu_and_submenu')}</li>\
                                        <li>${this.tlt('clicking_on_submenu_redirected')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('noti')}</b>\
                                    <ol>\
                                        <li>${this.tlt('noti_latest_updates')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('person_logged_in_details')}</b>\
                                    <ol>\
                                        <li>${this.tlt('user_profile_details_available')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('quick_link')}</b>\
                                    <ol>\
                                        <li>${this.tlt('quick_lines_first')} \
                                           ${this.tlt('quick_lines_second')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('chatbot_req_res')}</b>\
                                    <ol>\
                                        <li>${this.tlt('chatbot_req_res_first')}\
                                            ${this.tlt('chatbot_req_res_second')}</li>\
                                    </ol>\
                                </div>\
                            </div>`
            },             
        },
        {
            name: "Entities",
            page_path: "/bot/entities",
            data:{
                calldata:'<div class="modal-header">\
                                <div class="modal-head d-flex align-items-center">\
                                    <div class="head-icn">\
                                        <img src="/img/msg-blue.png" alt />\
                                    </div>\
                                    <h3>Entities Help</h3>\
                                </div>\
                            </div>\
                            <div class="modal-body">\
                                <div>\
                                    <img src="https://storage.cense.ai/codearray/portal_ui_guide/entitieshelp.png" style="max-width: 745px; height: 325px;" alt="simple text" />\
                                </div>\
                                    <hr>\
                                <div style="text-align: justify;">\
                                    <b>1. Search :</b>\
                                    <ol>\
                                        <li>On clicking, the user can search for a particular entity.</li>\
                                    </ol>\
                                    <hr>\
                                    <b>2. Add Entity :</b>\
                                    <ol>\
                                        <li>It will redirect to Demo assistant page => Entities =>\
                                        then you have to create your entity.</li>\
                                        <li>After creating, you have to add all the required field which you want and then\
                                        save it by clicking on save button.</li>\
                                    </ol>\
                                    <hr>\
                                    <b>3. Delete :</b>\
                                    <ol>\
                                        <li>The selected entity name and its value will get deleted depends on the single or multiple selection.</li>\
                                    </ol>\
                                    <hr>\
                                    <b>4. Edit :</b>\
                                    <ol>\
                                    <li>On clicking,You can edit all the details which are listed in the section\
                                    and then to reflect those changes, you have to click on Save button</li>\
                                    </ol>\
                                </div>\
                            </div>'
            }
        },
        {
            name: "NER Training",
            page_path: "/bot/ner-training",
            data:{
                calldata:`<div class="modal-header">\
                                <div class="modal-head d-flex align-items-center">\
                                    <div class="head-icn">\
                                        <img src="/img/msg-blue.png" alt />\
                                    </div>\
                                    <h3>${this.tlt('ner_help')}</h3>\
                                </div>\
                            </div>\
                            <div class="modal-body">\
                                <div>\
                                    <img src="https://storage.cense.ai/codearray/portal_ui_guide/NER_model_help.png" style="max-width: 750px; height: 375px;" alt="simple text" />\
                                </div>\
                                    <hr>\
                                <div style="text-align: justify;">\
                                    <b>${this.tlt('ner_search')}</b>\
                                    <ol>\
                                        <li>${this.tlt('ner_search_first')}</li>\
                                        ${this.tlt('ner_search_second')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('ner_add_tag')}</b>\
                                    <ol>\
                                        <li>${this.tlt('ner_add_tag_first')}\
                                       ${this.tlt('ner_add_tag_second')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('ner_add_search')}</b>\
                                    <ol>\
                                        <li>${this.tlt('ner_add_search_first')}\</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('ner_upload')}</b>\
                                    <ol>\
                                        <li>${this.tlt('ner_upload_first')}\</li>\
                                        <li>${this.tlt('ner_upload_second')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('ner_train')}</b>\
                                    <ol>\
                                        <li>${this.tlt('ner_train_first')}\</li>\
                                        ${this.tlt('ner_train_second')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('ner_delete')}</b>\
                                    <ol>\
                                        <li>${this.tlt('ner_delete_first')}\</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('ner_save')}</b>\
                                    <ol>\
                                        <li>${this.tlt('ner_save_first')}</li>\
                                    </ol>\
                                    <b>${this.tlt('ner_edit')}</b>\
                                    <ol>\
                                        <li>${this.tlt('ner_edit_first')}\
                                        ${this.tlt('ner_edit_second')}</li>\
                                    </ol>\
                                </div>\
                            </div>`
            },
        },
        {
            name: "Train & Test Bot",
            page_path: "/bot/train-test-bot",
            data:{
                calldata:`<div class="modal-header">\
                                <div class="modal-head d-flex align-items-center">\
                                    <div class="head-icn">\
                                        <img src="/img/msg-blue.png" alt />\
                                    </div>\
                                    <h3>${this.tlt('iph')}</h3>\
                                </div>\
                            </div>\
                            <div class="modal-body">\
                                <div>\
                                    <img src="https://storage.cense.ai/codearray/portal_ui_guide/improvepredict_help.png" style="max-width: 775px; height: 290px;" alt="simple text" />\
                                </div>\
                                    <hr>\
                                <div style="text-align: justify;">\
                                    <b> ${this.tlt('nhp_success')}</b>\
                                    <ol>\
                                        <li>${this.tlt('nhp_success_first')}\
                                        ${this.tlt('nhp_success_second')}</li>\
                                        <li>${this.tlt('nhp_success_third')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b> ${this.tlt('nhp_failure')}</b>\
                                    <ol>\
                                        <li>${this.tlt('nhp_failure_first')}\
                                       ${this.tlt('nhp_failure_second')}</li>\
                                        <li>${this.tlt('nhp_failure_third')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('nhp_train_test')}</b>\
                                    <ol>\
                                        <li>${this.tlt('nhp_train_test_first')}\
                                        ${this.tlt('nhp_train_test_second')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('nhp_add_button')}</b>\
                                    <ol>\
                                        <li>${this.tlt('nhp_add_button_first')}\
                                        ${this.tlt('nhp_add_button_second')}</li>\
                                    </ol>\
                                </div>\
                            </div>`
            },
        },
        {
            name: "Verify Bot Response",
            page_path: "/bot/verify-responses",
            data:{
                calldata:`<div class="modal-header">\
                                <div class="modal-head d-flex align-items-center">\
                                    <div class="head-icn">\
                                        <img src="/img/msg-blue.png" alt />\
                                    </div>\
                                    <h3>${this.tlt('vrh')}</h3>\
                                </div>\
                            </div>\
                            <div class="modal-body">\
                                <div>\
                                    <img src="https://storage.cense.ai/codearray/portal_ui_guide/verify-responsehelp.png" style="max-width: 770px; height: 290px;" alt="simple text" />\
                                </div>\
                                    <hr>\
                                <div style="text-align: justify;">\
                                    <b> ${this.tlt('vrh_unans_que')}</b>\
                                    <ol>\
                                        <li>${this.tlt('vrh_unans_que_first')}\
                                        ${this.tlt('vrh_unans_que_second')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b> ${this.tlt('vrh_user_res')}</b>\
                                    <ol>\
                                        <li>${this.tlt('vrh_user_res_first')}\
                                        ${this.tlt('vrh_user_res_second')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('vrh_search')}</b>\
                                    <ol>\
                                        <li>${this.tlt('vrh_search_first')}\
                                        ${this.tlt('vrh_search_second')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('vrh_train_model')}</b>\
                                    <ol>\
                                        <li>${this.tlt('vrh_train_model_first')}\
                                        ${this.tlt('vrh_train_model_second')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('vrh_save')}</b>\
                                    <ol>\
                                        <li>${this.tlt('vrh_save_first')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('vrh_delete')}</b>\
                                    <ol>\
                                        <li>${this.tlt('vrh_delete_first')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('vrh_edit')}</b>\
                                    <ol>\
                                        <li>${this.tlt('vrh_edit_first')}\
                                        ${this.tlt('vrh_edit_second')}</li>\
                                    </ol>\
                                </div>\
                            </div>`
            },
        },
        {
            name: "Settings",
            page_path: "/bot/store-configuration",
            data:{
                calldata:`<div class="modal-header">\
                                <div class="modal-head d-flex align-items-center">\
                                    <div class="head-icn">\
                                        <img src="/img/msg-blue.png" alt />\
                                    </div>\
                                    <h3>${this.tlt('sch')}</h3>\
                                </div>\
                            </div>\
                            <div class="modal-body">\
                                <div>\
                                    <img src="https://storage.cense.ai/codearray/portal_ui_guide/settinghelp.png" style="max-width: 770px; height: 400px;" alt="simple text" />\
                                    <img src="https://storage.cense.ai/codearray/portal_ui_guide/store_settinghelp2.png" style="max-width: 770px; height: 400px;" alt="simple text" />\
                                </div>\
                                    <hr>\
                                <div style="text-align: justify;">\
                                    <b>${this.tlt('csh_limit_upsell')}</b>\
                                    <ol>\
                                        <li>${this.tlt('csh_limit_upsell_first')}\
                                       ${this.tlt('csh_limit_upsell_second')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('csh_limit_crosssell')}</b>\
                                    <ol>\
                                        <li>${this.tlt('csh_limit_crosssell_first')}\
                                        ${this.tlt('csh_limit_crosssell_second')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('csh_inv_level_noti')}</b>\
                                    <ol>\
                                        <li>${this.tlt('csh_inv_level_noti_first')}\
                                        ${this.tlt('csh_inv_level_noti_second')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('csh_allow_guest_users')}</b>\
                                    <ol>\
                                        <li>${this.tlt('csh_allow_guest_users_first')}\
                                        ${this.tlt('csh_allow_guest_users_second')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('csh_shop_base_curr')} </b>\
                                    <ol>\
                                        <li>${this.tlt('csh_shop_base_curr_first')}\
                                        ${this.tlt('csh_shop_base_curr_second')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('csh_feedback_freq')}</b>\
                                    <ol>\
                                        <li>${this.tlt('csh_feedback_freq_first')}\
                                        ${this.tlt('csh_feedback_freq_second')} "<b>${this.tlt('csh_feedback_freq_third')}</b>" ${this.tlt('csh_feedback_freq_fourth')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('csh_rr')}</b>\
                                    <ol>\
                                        <li>${this.tlt('csh_rr_first')}\
                                       ${this.tlt('csh_rr_second')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('csh_display_landing')}</b>\
                                    <ol>\
                                        <li>${this.tlt('csh_display_landing_first')}\
                                        ${this.tlt('csh_display_landing_second')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('csh_contact_email')}</b>\
                                    <ol>\
                                        <li>${this.tlt('csh_contact_email_first')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('csh_contact')}</b>\
                                    <ol>\
                                        <li>${this.tlt('csh_contact_first')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('csh_save')}</b>\
                                    <ol>\
                                        <li>${this.tlt('csh_save_first')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('csh_mail_config')}</b>\
                                    <ol>\
                                        <li>${this.tlt('csh_mail_config_first')}</li>\
                                        ${this.tlt('csh_mail_config_second')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('csh_remove')}</b>\
                                    <ol>\
                                        <li>${this.tlt('csh_remove_first')}</li>\
                                    </ol>\
                                </div>\
                            </div>`
            },
        },
        {
            name: "Product Configuration",
            page_path: "/bot/product-configuration",
            is_multiple_tabs: true,
            data:{
                calldata: "this is product configuration." 
            },
        },
        {
            name: "alternate_product_names",
            page_path: "/bot/product-configuration",
            data: {
                calldata:`<div class="modal-header">\
                            <div class="modal-head d-flex align-items-center">\
                                <div class="head-icn">\
                                    <img src="/img/msg-blue.png" alt />\
                                </div>\
                                <h3>${this.tlt('apn')}</h3>\
                            </div>\
                        </div>\
                        <div class="modal-body">\
                            <div>\
                                <img src="https://storage.cense.ai/codearray/portal_ui_guide/alter_pname_help.png" style="max-width: 770px; height: 365px;" alt="simple text" />\
                            </div>\
                                <hr>\
                            <div style="text-align: justify;">\
                                <b>${this.tlt('apn_sync')}</b>\
                                <ol>\
                                    <li>${this.tlt('apn_sync_first')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('apn_train_model')}</b>\
                                <ol>\
                                    <li>${this.tlt('apn_train_model_first')}\
                                    ${this.tlt('apn_train_model_second')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('apn_save_all')}</b>\
                                <ol>\
                                    <li>${this.tlt('apn_save_all_first')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('apn_add')}</b>\
                                <ol>\
                                    <li>${this.tlt('apn_add_first')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('apn_edit')}</b>\
                                <ol>\
                                    <li>${this.tlt('apn_edit_first')}\
                                  ${this.tlt('apn_edit_second')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('apn_dlt')}</b>\
                                <ol>\
                                    <li>${this.tlt('apn_dlt_first')}</li>\
                                </ol>\
                            </div>\
                        </div>`
            },
        },
        {
            name: "products_upsell",
            page_path: "/bot/product-configuration",
            data: {
                calldata:`<div class="modal-header">\
                            <div class="modal-head d-flex align-items-center">\
                                <div class="head-icn">\
                                    <img src="/img/msg-blue.png" alt />\
                                </div>\
                                <h3>${this.tlt('puh')}</h3>\
                            </div>\
                        </div>\
                        <div class="modal-body">\
                            <div>\
                                <img src="https://storage.cense.ai/codearray/portal_ui_guide/product_upsell_help.png" style="max-width: 750px; height: 320px;" alt="simple text" />\
                            </div>\
                                <hr>\
                            <div style="text-align: justify;">\
                                <b>${this.tlt('product_name')}</b>\
                                <ol>\
                                    <li>${this.tlt('product_name_first')}\
                                    ${this.tlt('puh_product_name_second')}</li>\
                                </ol>\
                                <b>${this.tlt('save_all')}</b>\
                                <ol>\
                                    <li>${this.tlt('save_all_first')}</li>\
                                </ol>\
                            </div>\
                        </div>`
            },
        },
        {
            name: "products_crosssell",
            page_path: "/bot/product-configuration",
            data: {
                calldata:`<div class="modal-header">\
                            <div class="modal-head d-flex align-items-center">\
                                <div class="head-icn">\
                                    <img src="/img/msg-blue.png" alt />\
                                </div>\
                                <h3>${this.tlt('pcs')}</h3>\
                            </div>\
                        </div>\
                        <div class="modal-body">\
                            <div>\
                                <img src="https://storage.cense.ai/codearray/portal_ui_guide/product_cross-sell.png" style="max-width: 750px; height: 320px;" alt="simple text" />\
                            </div>\
                                <hr>\
                            <div style="text-align: justify;">\
                                <b>${this.tlt('product_name')}</b>\
                                <ol>\
                                    <li>${this.tlt('product_name_first')}\
                                    ${this.tlt('pcs_product_name_second')}</li>\
                                </ol>\
                                <b>${this.tlt('save_all')}</b>\
                                <ol>\
                                    <li>${this.tlt('save_all_first')}</li>\
                                </ol>\
                            </div>\
                        </div>`
            },
        },
        {
            name: "message_templates",
            page_path: "/bot/product-configuration",
            data: {
                calldata:`<div class="modal-header">\
                            <div class="modal-head d-flex align-items-center">\
                                <div class="head-icn">\
                                    <img src="/img/msg-blue.png" alt />\
                                </div>\
                                <h3>${this.tlt('mailers_help')}</h3>\
                            </div>\
                        </div>\
                        <div class="modal-body">\
                            <div>\
                                <img src="https://storage.cense.ai/codearray/portal_ui_guide/Mailer_help.png" style="max-width: 750px;" alt="simple text" />\
                            </div>\
                                <hr>\
                            <div style="text-align: justify;">\
                                <b>${this.tlt('mailers_help_sendEmail')}</b>\
                                <ol>\
                                    <li>${this.tlt('mailers_help_sendEmail_first')}\
                                   ${this.tlt('mailers_help_sendEmail_second')}</li>\
                                </ol>\
                                <b>${this.tlt('mailers_help_addTemplate')}</b>\
                                <ol>\
                                    <li>${this.tlt('mailers_help_addTemplate_first')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('mailers_help_delete')}</b>\
                                <ol>\
                                    <li>${this.tlt('mailers_help_delete_first')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('mailers_help_delete')}</b>\
                                <ol>\
                                    <li>${this.tlt('mailers_help_delete_first')}\
                                    ${this.tlt('mailers_help_delete_second')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('mailers_help_edit')}</b>\
                                <ol>\
                                    <li>${this.tlt('mailers_help_edit_first')}\
                                   ${this.tlt('mailers_help_edit_second')}</li>\
                                </ol>\
                            </div>\
                        </div>`
            },
        },
        {
            name: "analytics",
            page_path: "/bot/product-configuration",
            data: {
                calldata:`<div class="modal-header">\
                            <div class="modal-head d-flex align-items-center">\
                                <div class="head-icn">\
                                    <img src="/img/msg-blue.png" alt />\
                                </div>\
                                <h3>${this.tlt('analytics_help')}</h3>\
                            </div>\
                        </div>\
                        <div class="modal-body">\
                            <div>\
                                <img src="https://storage.cense.ai/codearray/portal_ui_guide/analytics_help.jpg" style="max-width: 750px; height: 330px;" alt="simple text" />\
                            </div>\
                                <hr>\
                            <div style="text-align: justify;">\
                                <b>${this.tlt('analytics_help_google')}</b>\
                                <ol>\
                                    <li>${this.tlt('analytics_help_google_first')}\
                                    ${this.tlt('analytics_help_google_second')}</li>\
                                </ol>\
                            </div>\
                        </div>`
            },
        },
        {
            name: "products_ranking",
            page_path: "/bot/product-configuration",
            data: {
                calldata:`<div class="modal-header">\
                            <div class="modal-head d-flex align-items-center">\
                                <div class="head-icn">\
                                    <img src="/img/msg-blue.png" alt />\
                                </div>\
                                <h3>${this.tlt('product_ranking_help')}</h3>\
                            </div>\
                        </div>\
                        <div class="modal-body">\
                            <div>\
                                <img src="https://storage.cense.ai/codearray/portal_ui_guide/product_ranking.png" style="max-width: 750px; height: 330px;" alt="simple text" />\
                            </div>\
                                <hr>\
                            <div style="text-align: justify;">\
                                <b>${this.tlt('product_ranking_help_most_sealable')}</b>\
                                <ol>\
                                    <li>${this.tlt('product_ranking_help_most_sealable_first')}\
                                    ${this.tlt('product_ranking_help_sealable_second')}</li>\
                                </ol>\
                                <hr>\
                                <b> ${this.tlt('product_ranking_help_least_sealable')}</b>\
                                <ol>\
                                    <li>${this.tlt('product_ranking_help_least_sealable_first')}\
                                    ${this.tlt('product_ranking_help_sealable_second')}</li>\
                                </ol>\
                                <hr>\
                                <b> ${this.tlt('product_ranking_help_unsold_prod')}</b>\
                                <ol>\
                                    <li>${this.tlt('product_ranking_help_unsold_prod_first')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('product_ranking_help_dropdown')}</b>\
                                <ol>\
                                    <li>${this.tlt('product_ranking_help_dropdown_first')}\
                                    ${this.tlt('product_ranking_help_dropdown_second')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('product_ranking_help_download_csv_report')}</b>\
                                <ol>\
                                    <li>${this.tlt('product_ranking_help_download_csv_report_first')} \
                                    ${this.tlt('product_ranking_help_download_csv_report_first')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('product_ranking_help_send_report')}</b>\
                                <ol>\
                                    <li>${this.tlt('product_ranking_help_send_report_first')}</li>\
                                </ol>\
                            </div>\
                        </div>`
            },
        },
        {
            name: "customer_feedback",
            page_path: "/bot/product-configuration",
            data: {
                calldata:`<div class="modal-header">\
                            <div class="modal-head d-flex align-items-center">\
                                <div class="head-icn">\
                                    <img src="/img/msg-blue.png" alt />\
                                </div>\
                                <h3>${this.tlt('cstmr_feedback_help')}</h3>\
                            </div>\
                        </div>\
                        <div class="modal-body">\
                            <div>\
                                <img src="https://storage.cense.ai/codearray/portal_ui_guide/customer_feedback.png" style="max-width: 750px;" alt="simple text" />\
                            </div>\
                                <hr>\
                            <div style="text-align: justify;">\
                                <b>${this.tlt('cstmr_feedback_help_add')}</b>\
                                <ol>\
                                    <li>${this.tlt('cstmr_feedback_help_add_first')}\
                                    ${this.tlt('cstmr_feedback_help_add_second')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('cstmr_feedback_help_save')}</b>\
                                <ol>\
                                    <li>${this.tlt('cstmr_feedback_help_save_first')}</li>\
                                </ol>\
                            </div>\
                        </div>`
            },
        },
        {
            name: "products_variants",
            page_path: "/bot/product-configuration",
            data: {
                calldata:`<div class="modal-header">\
                            <div class="modal-head d-flex align-items-center">\
                                <div class="head-icn">\
                                    <img src="/img/msg-blue.png" alt />\
                                </div>\
                                <h3>${this.tlt('products_variant_help')}</h3>\
                            </div>\
                        </div>\
                        <div class="modal-body">\
                            <div>\
                                <img src="https://storage.cense.ai/codearray/portal_ui_guide/product_variant.png" style="max-width: 750px; height: 330px;" alt="simple text" />\
                            </div>\
                                <hr>\
                            <div style="text-align: justify;">\
                                <b>${this.tlt('products_variant_help_add')}</b>\
                                <ol>\
                                    <li>${this.tlt('products_variant_help_add_first')}\
                                  ${this.tlt('products_variant_help_add_second')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('products_variant_help_edit')}</b>\
                                <ol>\
                                    <li>${this.tlt('products_variant_help_edit_first')}\
                                 ${this.tlt('products_variant_help_edit_second')}</li>\
                                </ol>\
                            </div>\
                        </div>`
            },
        },
        {
            name: "review_rating",
            page_path: "/bot/product-configuration",
            data: {
                calldata:`<div class="modal-header">\
                            <div class="modal-head d-flex align-items-center">\
                                <div class="head-icn">\
                                    <img src="/img/msg-blue.png" alt />\
                                </div>\
                                <h3>${this.tlt('customer_review_help')}</h3>\
                            </div>\
                        </div>\
                        <div class="modal-body">\
                            <div>\
                                <img src="https://storage.cense.ai/codearray/portal_ui_guide/customer_review.png" style="max-width: 750px; height: 330px;" alt="simple text" />\
                            </div>\
                                <hr>\
                            <div style="text-align: justify;">\
                                <b>${this.tlt('customer_review_help_filter_customer')}</b>\
                                <ol>\
                                    <li>${this.tlt('customer_review_help_filter_customer_first')}\
                                    ${this.tlt('customer_review_help_filter_customer_second')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('customer_review_help_filter_product')}</b>\
                                <ol>\
                                    <li>${this.tlt('customer_review_help_filter_product_first')}\
                                   ${this.tlt('customer_review_help_filter_product_second')}</li>\
                                </ol>\
                            </div>\
                        </div>`
            },
        },
        {
            name: "banner_template",
            page_path: "/bot/banner-templates",
            data: {
                calldata:`<div class="modal-header">\
                            <div class="modal-head d-flex align-items-center">\
                                <div class="head-icn">\
                                    <img src="/img/msg-blue.png" alt />\
                                </div>\
                                <h3>${this.tlt('banner_template_help')}</h3>\
                            </div>\
                        </div>\
                        <div class="modal-body">\
                            <div>\
                                <img src="https://storage.cense.ai/codearray/portal_ui_guide/banner_template_help.png" style="max-width: 775px;" alt="simple text" />\
                            </div>\
                                <hr>\
                            <div style="text-align: justify;">\
                                <b>${this.tlt('banner_template_help_search')}</b>\
                                <ol>\
                                    <li>${this.tlt('banner_template_help_search_first')}\
                                    ${this.tlt('banner_template_help_search_second')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('banner_template_help_addBanner')}</b>\
                                <ol>\
                                    <li>${this.tlt('banner_template_help_addBanner_first')}\
                                    ${this.tlt('banner_template_help_addBanner_second')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('banner_template_help_delete')}</b>\
                                <ol>\
                                    <li>${this.tlt('banner_template_help_delete_first')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('banner_template_help_display')}</b>\
                                <ol>\
                                    <li>${this.tlt('banner_template_help_display_first')}\
                                    ${this.tlt('banner_template_help_display_second')}\
                                    ${this.tlt('banner_template_help_display_third')}\
                                   ${this.tlt('banner_template_help_display_fourth')}\
                                   ${this.tlt('banner_template_help_display_fifth')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('banner_template_help_preview')}</b>\
                                <ol>\
                                    <li>${this.tlt('banner_template_help_preview_first')}\
                                   ${this.tlt('banner_template_help_preview_second')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('banner_template_help_edit')}</b>\
                                <ol>\
                                    <li>${this.tlt('banner_template_help_edit_first')}</li>\
                                    <li>${this.tlt('banner_template_help_edit_second')}</li>\
                                </ol>\
                            </div>\
                        </div>`
            },
        },
        {
            name: "whatsapp_template",
            page_path: "/bot/whatsapp-templates",
            data: {
                calldata:`<div class="modal-header">\
                            <div class="modal-head d-flex align-items-center">\
                                <div class="head-icn">\
                                    <img src="/img/msg-blue.png" alt />\
                                </div>\
                                <h3>${this.tlt('whatsapp_template_help')}</h3>\
                            </div>\
                        </div>\
                        <div class="modal-body">\
                            <div>\
                                <img src="/img/whatsapp_template.png" style="max-width: 775px;" alt="simple text" />\
                            </div>\
                                <hr>\
                            <div style="text-align: justify;">\
                                <b>${this.tlt('whatsapp_template_help_custom_template')}</b>\
                                <ol>\
                                    <li>${this.tlt('whatsapp_template_help_custom_template_first')}</li>\
                                     ${this.tlt('whatsapp_template_help_custom_template_second')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('whatsapp_template_help_publish_template')}</b>\
                                <ol>\
                                    <li>${this.tlt('whatsapp_template_help_publish_template_first')}</li>\
                                   ${this.tlt('whatsapp_template_help_publish_template_second')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('whatsapp_template_help_add_template')}</b>\
                                <ol>\
                                    <li>${this.tlt('whatsapp_template_help_add_template_first')}</li>\
                                     ${this.tlt('whatsapp_template_help_add_template_second')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('whatsapp_template_help_delete')}</b>\
                                <ol>\
                                    <li>${this.tlt('whatsapp_template_help_delete_first')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('whatsapp_template_help_edit')}</b>\
                                <ol>\
                                    <li>${this.tlt('whatsapp_template_help_edit_first')}</li>\
                                </ol>\
                                
                            </div>\
                        </div>`
            },
        },
        {
            name: "message_templates",
            page_path: "/bot/sms-templates",
            data: {
                calldata:`<div class="modal-header">\
                            <div class="modal-head d-flex align-items-center">\
                                <div class="head-icn">\
                                    <img src="/img/msg-blue.png" alt />\
                                </div>\
                                <h3>${this.tlt('sms_template')}</h3>\
                            </div>\
                        </div>\
                        <div class="modal-body">\
                            <div>\
                                <img src="/img/sms_template.png" style="max-width: 775px;" alt="simple text" />\
                            </div>\
                                <hr>\
                            <div style="text-align: justify;">\
                                <b>${this.tlt('sms_template_check_balance')}</b>\
                                <ol>\
                                    <li>${this.tlt('sms_template_check_balance_first')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('sms_template_send_sms')}</b>\
                                <ol>\
                                    <li>${this.tlt('sms_template_send_sms_first')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('sms_template_add_sms')}</b>\
                                <ol>\
                                    <li>${this.tlt('sms_template_add_sms_first')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('sms_template_delete')}</b>\
                                <ol>\
                                    <li>${this.tlt('sms_template_delete_first')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('sms_template_preview')}</b>\
                                <ol>\
                                    <li>${this.tlt('sms_template_preview_first')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('sms_template_edit')}</b>\
                                <ol>\
                                    <li>${this.tlt('sms_template_edit_first')}</li>\
                                </ol>\
                                <hr>\
                            </div>\
                        </div>`
            },
        },
        {
            name: "email_templates",
            page_path: "/bot/email-templates",
            data: {
                calldata:`<div class="modal-header">\
                            <div class="modal-head d-flex align-items-center">\
                                <div class="head-icn">\
                                    <img src="/img/msg-blue.png" alt />\
                                </div>\
                                <h3>${this.tlt('Email Template Help')}</h3>\
                            </div>\
                        </div>\
                        <div class="modal-body">\
                            <div>\
                                <img src="/img/email_template.png" style="max-width: 775px;" alt="simple text" />\
                            </div>\
                                <hr>\
                            <div style="text-align: justify;">\
                                <b>${this.tlt('email_template_send')}</b>\
                                <ol>\
                                    <li>${this.tlt('email_template_send_first')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('email_template_add_template')}</b>\
                                <ol>\
                                    <li>${this.tlt('email_template_add_template_first')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('email_template_delete')}</b>\
                                <ol>\
                                    <li>${this.tlt('email_template_delete_first')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('email_template_preview')}</b>\
                                <ol>\
                                    <li>${this.tlt('email_template_preview_first')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('email_template_edit')}</b>\
                                <ol>\
                                    <li>${this.tlt('email_template_edit_first')}</li>\
                                </ol>\
                                

                            </div>\
                        </div>`
            },
        },
        {
            name: "coupon_codes",
            page_path: "/bot/product-configuration",
            data: {
                calldata:`<div class="modal-header">\
                            <div class="modal-head d-flex align-items-center">\
                                <div class="head-icn">\
                                    <img src="/img/msg-blue.png" alt />\
                                </div>\
                                <h3>${this.tlt('cc_help')}</h3>\
                            </div>\
                        </div>\
                        <div class="modal-body">\
                            <div>\
                                <img src="https://storage.cense.ai/codearray/portal_ui_guide/coupon_codes.png" style="max-width: 750px; height: 330px;" alt="simple text" />\
                            </div>\
                                <hr>\
                            <div style="text-align: justify;">\
                                <b>${this.tlt('cc_help_help')}</b>\
                                <ol>\
                                    <li>${this.tlt('cc_help_help_first')}\
                                    ${this.tlt('cc_help_help_second')}\
                                    ${this.tlt('cc_help_help_third')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('cc_help_saveAll')}</b>\
                                <ol>\
                                    <li>${this.tlt('cc_help_saveAll_first')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('cc_help_visibeOnBot')}</b>\
                                <ol>\
                                    <li>${this.tlt('cc_help_visibeOnBot_first')}</li>\
                                </ol>\
                            </div>\
                        </div>`
            },
        },
        {
            name: "Bot Configuration",
            page_path: "/bot/bot-configuration",
            data:{
                calldata:`<div class="modal-header">\
                                <div class="modal-head d-flex align-items-center">\
                                    <div class="head-icn">\
                                        <img src="/img/msg-blue.png" alt />\
                                    </div>\
                                    <h3>${this.tlt('bot_config_help')}</h3>\
                                </div>\
                            </div>\
                            <div class="modal-body">\
                                <div>\
                                    <img src="https://storage.cense.ai/codearray/portal_ui_guide/botconfighelp.png" style="max-width: 750px; height: 400px;" alt="simple text" />\
                                    <img src="https://storage.cense.ai/codearray/portal_ui_guide/botconfig2help.png" style="max-width: 750px; height: 400px;" alt="simple text" />\
                                <\div>\
                                    <hr>\
                                <div style="text-align: justify;">\
                                    <b>${this.tlt('bot_config_help_widget')}</b>\
                                    <ol>\
                                        <li>${this.tlt('bot_config_help_widget_first')}</li>\
                                        <li>${this.tlt('bot_config_help_widget_second')}\
                                        ${this.tlt('bot_config_help_widget_third')}</li>\
                                        <li>${this.tlt('bot_config_help_widget_fourth')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('bot_config_help_button')}</b>\
                                    <ol>\
                                        <li>${this.tlt('bot_config_help_button_first')}\
                                        ${this.tlt('bot_config_help_button_second')}\
                                        ${this.tlt('bot_config_help_button_third')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('bot_config_help_botStyling')}</b>\
                                    <ol>\
                                        <li>${this.tlt('bot_config_help_botStyling_first')}</li>\
                                        <li>${this.tlt('bot_config_help_botStyling_second')}</li>\
                                        <li>${this.tlt('bot_config_help_botStyling_third')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('bot_config_help_save')}</b>\
                                    <ol>\
                                        <li>${this.tlt('bot_config_help_save_first')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('bot_config_help_previewBot')}</b>\
                                    <ol>\
                                        <li>${this.tlt('bot_config_help_previewBot_first')}</li>\
                                        <li>${this.tlt('bot_config_help_previewBot_second')}</li>\
                                    </ol>\
                                </div>\
                            </div>`
            }
        },
        {
            name: "Check Bot Response",
            page_path: "/bot/check-bot-response",
            data: "this is for intent",
            is_multiple_tabs: true
        },
        {
            name: "bot_response",
            page_path: "/bot/check-bot-response",
            data: {
                calldata:`<div class="modal-header">\
                            <div class="modal-head d-flex align-items-center">\
                                <div class="head-icn">\
                                    <img src="/img/msg-blue.png" alt />\
                                </div>\
                                <h3>${this.tlt('bot_res_help')}</h3>\
                            </div>\
                        </div>\
                        <div class="modal-body">\
                            <div>\
                                <img src="https://storage.cense.ai/codearray/portal_ui_guide/bot_response.jpg" style="max-width: 745px;" alt="simple text" />\
                            </div>\
                                <hr>\
                            <div style="text-align: justify;">\
                                <b>${this.tlt('bot_res_help_description')}</b>\
                                <ol>\
                                    <li>${this.tlt('bot_res_help_description_first')}\
                                    ${this.tlt('bot_res_help_description_second')}</li>\
                                    <li>${this.tlt('bot_res_help_description_third')}\
                                    ${this.tlt('bot_res_help_description_fourth')}</li>\
                                </ol>\
                            </div>\
                        </div>`
            },
        },
        {
            name: "bot_intent",
            page_path: "/bot/check-bot-response",
            data: {
                calldata:`<div class="modal-header">\
                            <div class="modal-head d-flex align-items-center">\
                                <div class="head-icn">\
                                    <img src="/img/msg-blue.png" alt />\
                                </div>\
                                <h3>${this.tlt('bot_intent_help')}</h3>\
                            </div>\
                        </div>\
                        <div class="modal-body">\
                            <div>\
                                <img src="https://storage.cense.ai/codearray/portal_ui_guide/bot_intent.jpg" style="max-width: 750px;" alt="simple text" />\
                            </div>\
                                <hr>\
                            <div style="text-align: justify;">\
                                <b>${this.tlt('bot_intent_help_description')}</b>\
                                <ol>\
                                    <li>${this.tlt('bot_intent_help_description_first')}\
                                    ${this.tlt('bot_intent_help_description_second')}\
                                    ${this.tlt('bot_intent_help_description_third')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('bot_intent_help_train_model')}</b>\
                                <ol>\
                                    <li>${this.tlt('bot_intent_help_train_model_first')}\
                                    ${this.tlt('bot_intent_help_train_model_second')}</li>\
                                </ol>\
                            </div>\
                        </div>`
            },
        },
        {
            name: "setup-assistant",
            page_path: "/bot/conversational-flow",
            data: "this is for intent",
            is_multiple_tabs: true
        },
        {
            name: "intents_component",
            page_path: "/bot/conversational-flow",
            data:{
                calldata:`<div class="modal-header">\
                <div class="modal-head d-flex align-items-center">\
                    <div class="head-icn">\
                        <img src="/img/msg-blue.png" alt />\
                    </div>\
                    <h3>${this.tlt('cf_objectives_help')}</h3>\
                </div>\
            </div>\
            <div class="modal-body">\
                <div>\
                    <img src="/img/conversational_objectives.png" style="max-width: 775px; height: 390px;" alt="simple text" />\
                </div>\
                    <hr>\
                <div style="text-align: justify;">\
                    <b>${this.tlt('cf_objectives_help_search')}</b>\
                    <ol>\
                        <li>${this.tlt('cf_objectives_help_search_first')}</li>\
                    </ol>\
                    <hr>\
                    <b>${this.tlt('cf_objectives_help_add_obj')}</b>\
                    <ol>\
                        <li>${this.tlt('cf_objectives_help_add_obj_first')}</li>\
                    </ol>\
                    <hr>\
                    <b>${this.tlt('cf_objectives_help_upload_file')}
                    </b>\
                    <ol>\
                        <li>${this.tlt('cf_objectives_help_upload_file_first')}</li>\
                        <li>${this.tlt('cf_objectives_help_upload_file_second')}</li>\
                    </ol>\
                    <hr>\
                    <b>${this.tlt('cf_objectives_help_download_csvfile')}
                    </b>\
                    <ol>\
                        <li>${this.tlt('cf_objectives_help_download_csvfile_first')}</li>\ ${this.tlt('cf_objectives_help_download_csvfile_second')}</li>\
                        <li>${this.tlt('cf_objectives_help_download_csvfile_third')}
                        </li>
                    </ol>\
                    <hr>\
                    <b>${this.tlt('cf_objectives_help_train_model')}
                    </b>\
                    <ol>\
                        <li>${this.tlt('cf_objectives_help_train_model_first')} </li>\ ${this.tlt('cf_objectives_help_train_model_second')}</li>\
                    </ol>\
                    <hr>\
                    <b>${this.tlt('cf_objectives_help_delete')}</b>\
                    <ol>\
                        <li>${this.tlt('cf_objectives_help_delete_first')}</li>\
                    </ol>\
                    <hr>\
                    <b>${this.tlt('cf_objectives_help_edit')}</b>\
                    <ol>\
                        <li>${this.tlt('cf_objectives_help_edit_first')}</li>\
                        <li>${this.tlt('cf_objectives_help_edit_second')}</li>\
                    </ol>\
                </div>\
            </div>`,           
            } 
        },
        {
            name: "entities_component",
            page_path: "/bot/conversational-flow",
            data: {
                calldata:`<div class="modal-header">\
                <div class="modal-head d-flex align-items-center">\
                    <div class="head-icn">\
                        <img src="/img/msg-blue.png" alt />\
                    </div>\
                    <h3>${this.tlt('cf_entities_help')}</h3>\
                </div>\
            </div>\
            <div class="modal-body">\
                <div>\
                    <img src="/img/conversational_flow_entities.png" style="max-width: 775px; height: 390px;" alt="simple text" />\
                </div>\
                    <hr>\
                <div style="text-align: justify;">\
                    <b>${this.tlt('cf_entities_help_search')}</b>\
                    <ol>\
                        <li>${this.tlt('cf_entities_help_search_first')}</li>\
                    </ol>\
                    <hr>\
                    <b>${this.tlt('cf_entities_help_add_entity')}</b>\
                    <ol>\
                        <li>${this.tlt('cf_entities_help_add_entity_first')}</li>\
                    </ol>\
                    <hr>\
                
                    <b>${this.tlt('cf_entities_help_delete')}</b>\
                    <ol>\
                        <li>${this.tlt('cf_entities_help_delete_first')}</li>\
                    </ol>\
                    <hr>\
                    <b>${this.tlt('cf_entities_help_edit')}</b>\
                    <ol>\
                        <li>${this.tlt('cf_entities_help_edit_first')}</li>\
                        <li>${this.tlt('cf_entities_help_edit_second')}</li>\
                    </ol>\
                </div>\
            </div>`,          
            }
        },
        {
            name: "dialog_component",
            page_path: "/bot/conversational-flow",
            data: {
                calldata:`<div class="modal-header">\
                <div class="modal-head d-flex align-items-center">\
                    <div class="head-icn">\
                        <img src="/img/msg-blue.png" alt />\
                    </div>\
                    <h3>${this.tlt('cf_dialogs_help')}</h3>\
                </div>\
            </div>\
            <div class="modal-body">\
                <div>\
                    <img src="/img/conversational_flow_dialogs.png" style="max-width: 775px; height: 390px;" alt="simple text" />\
                </div>\
                    <hr>\
                <div style="text-align: justify;">\
                    <b>${this.tlt('cf_dialogs_help_add_node')}</b>\
                    <ol>\
                        <li>${this.tlt('cf_dialogs_help_add_node_first')} </li>\ ${this.tlt('cf_dialogs_help_add_node_second')}</li>\
                    </ol>\
                    <hr>\
                    <b>${this.tlt('cf_dialogs_help_try_bot')}</b>\
                    <ol>\
                        <li>${this.tlt('cf_dialogs_help_try_bot_first')}</li>\
                    </ol>\
                    <hr>\

                </div>\
            </div>`,                 
            }
        },
        {
            name: "webhook_component",
            page_path: "/bot/conversational-flow",
            data: {
                calldata:`<div class="modal-header">\
                <div class="modal-head d-flex align-items-center">\
                    <div class="head-icn">\
                        <img src="/img/msg-blue.png" alt />\
                    </div>\
                    <h3>${this.tlt('cf_webhook_help')}</h3>\
                </div>\
            </div>\
            <div class="modal-body">\
                <div>\
                    <img src="/img/conversational_flow_webhooks.png" style="max-width: 775px; height: 390px;" alt="simple text" />\
                </div>\
                    <hr>\
                <div style="text-align: justify;">\
                    <b>${this.tlt('cf_webhook_help_search')}</b>\
                    <ol>\
                        <li>${this.tlt('cf_webhook_help_search_first')}</li>\
                    </ol>\
                    <hr>\
                    <b>${this.tlt('cf_webhook_help_add_webhook')}</b>\
                    <ol>\
                        <li>${this.tlt('cf_webhook_help_add_webhook_first')}</li>\
                    </ol>\
                    <hr>\
                
                    <b>${this.tlt('cf_webhook_help_delete')}</b>\
                    <ol>\
                        <li>${this.tlt('cf_webhook_help_delete_first')}</li>\
                    </ol>\
                    <hr>\
                    <b>${this.tlt('cf_webhook_help_edit')}</b>\
                    <ol>\
                        <li>${this.tlt('cf_webhook_help_edit_first')}</li>\
                        <li>${this.tlt('cf_webhook_help_edit_second')}</li>\
                    </ol>\
                </div>\
            </div>`,                  
            }
        },
        {
            name: "email_templates",
            page_path: "/bot/conversational-flow",
            data: {
                calldata:`<div class="modal-header">\
                <div class="modal-head d-flex align-items-center">\
                    <div class="head-icn">\
                        <img src="/img/msg-blue.png" alt />\
                    </div>\
                    <h3>${this.tlt('cf_noti_template_help')}</h3>\
                </div>\
            </div>\
            <div class="modal-body">\
                <div>\
                    <img src="/img/conversational_flow_notification_templates.png" style="max-width: 775px; height: 390px;" alt="simple text" />\
                </div>\
                    <hr>\
                <div style="text-align: justify;">\
                    <b>${this.tlt('cf_noti_template_help_add_template')}</b>\
                    <ol>\
                        <li>${this.tlt('cf_noti_template_help_add_template_first')} </li>\  ${this.tlt('cf_noti_template_help_add_template_second')}</li>\
                    </ol>\
                    <hr>\
                    <b>${this.tlt('cf_noti_template_help_delete')}</b>\
                    <ol>\
                        <li>${this.tlt('cf_noti_template_help_delete_first')}</li>\
                    </ol>\
                    <hr>\
                    <b>${this.tlt('cf_noti_template_help_preview')}</b>\
                    <ol>\
                    <li>${this.tlt('cf_noti_template_help_preview_first')}</li>\
                    </ol>\
                    <hr>\
                    <b>${this.tlt('cf_noti_template_help_edit')}</b>\
                    <ol>\
                        <li>${this.tlt('cf_noti_template_help_edit_first')}</li>\
                        <li>${this.tlt('cf_noti_template_help_edit_second')}</li>\
                    </ol>\
                    
                </div>\
            </div>`,                   
            }
        },
        {
            name: "Saved Chats",
            page_path: "/bot/task-responses",
            data:{
                calldata:`<div class="modal-header">\
                                <div class="modal-head d-flex align-items-center">\
                                    <div class="head-icn">\
                                        <img src="/img/msg-blue.png" alt />\
                                    </div>\
                                    <h3>${this.tlt('chat_history_help')}</h3>\
                                </div>\
                            </div>\
                            <div class="modal-body">\
                                <div>\
                                    <img src="https://storage.cense.ai/codearray/portal_ui_guide/chat_history_help.png" style="max-width: 755px; height: 300px;" alt="simple text" />\
                                </div>\
                                    <hr>\
                                <div style="text-align: justify;">\
                                    <b>${this.tlt('chat_history_help_portal_user')}</b>\
                                    <ol>\
                                        <li>${this.tlt('chat_history_help_user_first')}</li>\
                                        <li>${this.tlt('chat_history_help_user_second')}\
                                        ${this.tlt('chat_history_help_user_third')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('chat_history_help_bot_user')}</b>\
                                    <ol>\
                                    <li>${this.tlt('chat_history_help_user_first')}</li>\
                                    <li>${this.tlt('chat_history_help_user_second')}\
                                    ${this.tlt('chat_history_help_user_third')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('chat_history_help_view_chat_history')}</b>\
                                    <ol>\
                                        <li>${this.tlt('chat_history_help_view_chat_history_first')}\
                                        ${this.tlt('chat_history_help_view_chat_history_second')}</li>\
                                    </ol>\
                                </div>\
                            </div>\
                         </div>`
            },
        },
        {
            name: "Roles",
            page_path: "/bot/add-role",
            data:{
                calldata:`<div class="modal-header">\
                                <div class="modal-head d-flex align-items-center">\
                                    <div class="head-icn">\
                                        <img src="/img/msg-blue.png" alt />\
                                    </div>\
                                    <h3>${this.tlt('role_list_help')}</h3>\
                                </div>\
                            </div>\
                            <div class="modal-body">\
                                <div>\
                                    <img src="https://storage.cense.ai/codearray/portal_ui_guide/Rolelist_help.png" style="max-width: 765px;" alt="simple text" />\
                                </div>\
                                    <hr>\
                                <div style="text-align: justify;">\
                                    <b>${this.tlt('role_list_help_search')}</b>\
                                    <ol>\
                                        <li>${this.tlt('role_list_help_search_first')}\
                                        ${this.tlt('role_list_help_search_second')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('role_list_help_add_role')}</b>\
                                    <ol>\
                                        <li>${this.tlt('role_list_help_add_role_first')}\
                                        ${this.tlt('role_list_help_add_role_second')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('role_list_help_delete')}</b>\
                                    <ol>\
                                        <li>${this.tlt('role_list_help_delete_first')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('role_list_help_edit')}</b>\
                                    <ol>\
                                        <li>${this.tlt('role_list_help_edit_first')}\
                                        ${this.tlt('role_list_help_edit_second')}</li>\
                                    </ol>\
                                </div>\
                            </div>
                         </div>`
            },
        },
        {
            name: "Users",
            page_path: "/bot/add-user",
            data:{
                calldata:`<div class="modal-header">\
                                <div class="modal-head d-flex align-items-center">\
                                    <div class="head-icn">\
                                        <img src="/img/msg-blue.png" alt />\
                                    </div>\
                                    <h3>${this.tlt('user_list_help')}</h3>\
                                </div>\
                            </div>\
                            <div class="modal-body">\
                                <div>\
                                    <img src="https://storage.cense.ai/codearray/portal_ui_guide/Userlist_help.png" style="max-width: 762px; height: 315px;" alt="simple text" />\
                                </div>\
                                    <hr>\
                                <div style="text-align: justify;">\
                                    <b>${this.tlt('user_list_help_search')}</b>\
                                    <ol>\
                                        <li>${this.tlt('user_list_help_search_first')}\
                                        ${this.tlt('user_list_help_search_second')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('user_list_help_add_user')}</b>\
                                    <ol>\
                                        <li>${this.tlt('user_list_help_add_user_first')}\
                                        ${this.tlt('user_list_help_add_user_second')}</li>\
                                    </ol>\
                                    <hr>\
                                    <b>${this.tlt('user_list_help_delete')}</b>\
                                    <ol>\
                                        <li>${this.tlt('user_list_help_delete_first')}</li>\
                                    </ol>\
                                </div>\
                            </div>\
                        </div>`
            },
        },
        {
            name: "Permissions",
            page_path: "/bot/permissions",
            data:{
                calldata:`<div class="modal-header">\
                                <div class="modal-head d-flex align-items-center">\
                                    <div class="head-icn">\
                                        <img src="/img/msg-blue.png" alt />\
                                    </div>\
                                    <h3>${this.tlt('permission_help')}</h3>\
                                </div>\
                            </div>\
                            <div class="modal-body">\
                                <div>\
                                    <img src="https://storage.cense.ai/codearray/portal_ui_guide/permission_help.png" style="max-width: 750px; height: 280px;" alt="simple text" />\
                                </div>\
                                    <hr>\
                                <div style="text-align: justify;">\
                                    <b> ${this.tlt('permission_help_desc')}</b>\
                                    <ol>\
                                        <li>${this.tlt('permission_help_desc_first')}\
                                        ${this.tlt('permission_help_desc_second')}</li>\
                                    </ol>\
                                    <b>${this.tlt('permission_help_edit')}</b>\
                                    <ol>\
                                        <li>${this.tlt('permission_help_edit_first')}\
                                        ${this.tlt('permission_help_edit_second')}\
                                        ${this.tlt('permission_help_edit_third')}</li>\
                                    </ol>\
                                </div>\
                            </div>`
            }
        },
        {
            name: "Settings",
            page_path: "/bot/miscellaneous-settings",
            data: "this is for intent",
            is_multiple_tabs: true
        },
        {
            name: "others",
            page_path: "/bot/miscellaneous-settings",
            data:{
                calldata:`<div class="modal-header">\
                            <div class="modal-head d-flex align-items-center">\
                                <div class="head-icn">\
                                    <img src="/img/msg-blue.png" alt />\
                                </div>\
                                <h3>${this.tlt('general_help')}</h3>\
                            </div>\
                        </div>\
                        <div class="modal-body">\
                            <div>\
                                <img src="https://storage.cense.ai/codearray/portal_ui_guide/general_help.png" style="max-width: 750px;" alt="simple text" />\
                            </div>\
                                <hr>\
                            <div style="text-align: justify;">\
                                <b>${this.tlt('general_help_download_bot_sdk')}</b>\
                                <ol>\
                                    <li>${this.tlt('general_help_download_bot_sdk_first')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('general_help_upload_logo')}</b>\
                                <ol>\
                                    <li>${this.tlt('general_help_upload_logo_first')}\
                                   ${this.tlt('general_help_upload_logo_second')}</li>\
                                </ol>\
                            </div>\
                        </div>`
            }
        },
        {
            name: "integrations",
            page_path: "/bot/miscellaneous-settings",
            data:{
                calldata:`<div class="modal-header">\
                            <div class="modal-head d-flex align-items-center">\
                                <div class="head-icn">\
                                    <img src="/img/msg-blue.png" alt />\
                                </div>\
                                <h3>${this.tlt('integration_help')}</h3>\
                            </div>\
                        </div>\
                        <div class="modal-body">\
                            <div>\
                                <img src="/img/cf_integration.png" style="max-width: 715px;" alt="simple text" />\
                            </div>\
                                <hr>\
                            <div style="text-align: justify;">\
                                <b>${this.tlt('integration_help_bot_code')}</b>\
                                <ol>\
                                    <li>${this.tlt('integration_help_bot_code_first')} </li>\
                                    ${this.tlt('integration_help_bot_code_second')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('integration_help_wf')}</b>\
                                <ol>\
                                    <li>${this.tlt('integration_help_wf_first')} </li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('integration_help_switch')}</b>\
                                <ol>\
                                    <li>${this.tlt('integration_help_switch_first')} </li>\
                                </ol>\
                                <hr>\
                                
                                <b>${this.tlt('integration_help_msgf')}</b>\
                                <ol>\
                                    <li>${this.tlt('integration_help_msgf_first')} </li>\
                                </ol>\
                            </div>\
                        </div>`
            }
        },
        {
            name: "models",
            page_path: "/bot/miscellaneous-settings",
            data:{
                calldata:`<div class="modal-header">\
                            <div class="modal-head d-flex align-items-center">\
                                <div class="head-icn">\
                                    <img src="/img/msg-blue.png" alt />\
                                </div>\
                                <h3>${this.tlt('models_help')}</h3>\
                            </div>\
                        </div>\
                        <div class="modal-body">\
                            <div>\
                                <img src="https://storage.cense.ai/codearray/portal_ui_guide/Models_help.png" style="max-width: 750px;" alt="simple text" />\
                            </div>\
                                <hr>\
                            <div style="text-align: justify;">\
                                <b> ${this.tlt('models_help_desc')}</b>\
                                <ol>\
                                    <li>${this.tlt('models_help_desc_first')} \
                                    ${this.tlt('models_help_desc_second')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('models_help_trained_intent_model')}</b>\
                                <ol>\
                                    <li>${this.tlt('models_help_trained_intent_model_first')}\
                                    ${this.tlt('models_help_trained_intent_model_second')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('models_help_trained_dialog_model')}</b>\
                                <ol>\
                                    <li>${this.tlt('models_help_trained_dialog_model_first')}\
                                   ${this.tlt('models_help_trained_dialog_model_second')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('models_help_trained_NER_model')}</b>\
                                <ol>\
                                    <li>${this.tlt('models_help_trained_NER_model_first')}</li>\
                                </ol>\
                            </div>\
                        </div>`
            }
        },
        {
            name: "accounts",
            page_path: "/bot/miscellaneous-settings",
            data:{
                calldata:`<div class="modal-header">\
                            <div class="modal-head d-flex align-items-center">\
                                <div class="head-icn">\
                                    <img src="/img/msg-blue.png" alt />\
                                </div>\
                                <h3>${this.tlt('acc_help')}</h3>\
                            </div>\
                        </div>\
                        <div class="modal-body">\
                            <div>\
                                <img src="https://storage.cense.ai/codearray/portal_ui_guide/account.jpg" style="max-width: 750px;" alt="simple text" />\
                                <img src="https://storage.cense.ai/codearray/portal_ui_guide/account2_help.png" style="max-width: 750px;" alt="simple text" />\
                            </div>\
                                <hr>\
                            <div style="text-align: justify;">\
                                <b>${this.tlt('acc_help_desc')}</b>\
                                <ol>\
                                    <li>${this.tlt('acc_help_desc_first')}\
                                    ${this.tlt('acc_help_desc_second')}</li>\
                                </ol>\
                                <hr>\
                                <b>${this.tlt('acc_help_sub_to_plan')}</b>\
                                <ol>\
                                <li>${this.tlt('acc_help_sub_to_plan_first')}</li>\
                                </ol>\
                            </div>\
                        </div>`
            }
        },
        {
            name: "suggestions",
            page_path: "/bot/miscellaneous-settings",
            data:{
                calldata:`<div class="modal-header">\
                            <div class="modal-head d-flex align-items-center">\
                                <div class="head-icn">\
                                    <img src="/img/msg-blue.png" alt />\
                                </div>\
                                <h3>${this.tlt('sugg_help')}</h3>\
                            </div>\
                        </div>\
                        <div class="modal-body">\
                            <div>\
                                <img src="https://storage.cense.ai/codearray/portal_ui_guide/suggestion_help.png" style="max-width: 750px; height: 330px;" alt="simple text" />\
                            </div>\
                                <hr>\
                            <div style="text-align: justify;">\
                                <b>${this.tlt('sugg_help_desc')}</b>\
                                <ol>\
                                    <li>${this.tlt('sugg_help_desc_first')}\
                                    ${this.tlt('sugg_help_desc_first')}</li>\
                                </ol>\
                            </div>\
                        </div>`
            }
        },
        {
            name: "socialmedia",
            page_path: "/bot/miscellaneous-settings",
            data:{
                calldata:`<div class="modal-header">\
                <div class="modal-head d-flex align-items-center">\
                    <div class="head-icn">\
                        <img src="/img/msg-blue.png" alt />\
                    </div>\
                    <h3>${this.tlt('social_media_help')}</h3>\
                </div>\
            </div>\
            <div class="modal-body">\
                <div>\
                    <img src="/img/cf_socialmedia.png" style="max-width: 750px; height: 330px;" alt="simple text" />\
                </div>\
                    <hr>\
                <div style="text-align: justify;">\
                    <b>${this.tlt('social_media_help_links')}</b>\
                    <ol>\
                        <li>${this.tlt('social_media_help_links_first')}</li>\
                    </ol>\
                    <hr>\
                    <b>${this.tlt('social_media_help_settings')}</b>\
                    <ol>\
                        <li>${this.tlt('social_media_help_settings_first')}</li>\
                    </ol>\
                    <hr>\
                    <b>${this.tlt('social_media_help_google')}</b>\
                    <ol>\
                        <li>${this.tlt('social_media_help_google_first')}</li>\
                    </ol>\
                    <hr>\
                </div>\
            </div>`
            }
        },
        {
            name: "support-help",
            data:{
                calldata:`<div class="modal-header">\
                            <div class="modal-head d-flex align-items-center">\
                                <div class="head-icn">\
                                    <img src="/img/msg-blue.png" alt />\
                                </div>\
                                <h3>${this.tlt('help')}</h3>\
                            </div>\
                        </div>\
                        <div class="modal-body">\
                            <div style="text-align: justify;">\
                                <h6>${this.tlt('help_mail_contact')} <a href = "mailto: support@cense.ai">support@cense.ai</a></h6>\
                            </div>\
                        </div>`
            }
        },
    ]
    }
}
}
// export default routes