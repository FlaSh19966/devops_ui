var cense_portal_endpoint = process.env.VUE_APP_CENSE_PORTAL_BASE_URL
var cense_scheduler_endpoint = process.env.VUE_APP_CENSE_SCHEDULER_BASE_URL
var cense_closed_form_endpoint = process.env.VUE_APP_CENSE_CLOSED_FORM_BASE_URL
var cense_models_endpoint = process.env.VUE_APP_CENSE_MODELS_BASE_URL
var cense_core_endpoint = process.env.VUE_APP_CENSE_CORE_BASE_URL

exports.login = function () {
  return cense_portal_endpoint + process.env.VUE_APP_LOGIN_URL
}
exports.validate_login = function () {
  return cense_portal_endpoint + process.env.VUE_APP_VALIDATE_URL
}
exports.forgot_password = function () {
  return cense_portal_endpoint + process.env.VUE_APP_FORGOT_PASSWORD_LINK_URL
}
exports.forgot_password_update = function () {
  return cense_portal_endpoint + process.env.VUE_APP_FORGOT_PASSWORD_UPDATE_URL
}
exports.register = function () {
  return cense_portal_endpoint + process.env.VUE_APP_REGISTER_URL
}
exports.domain_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_DOMAIN_NAME_URL
}
exports.dashboard_chart_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_DASHBOARD_CHART_URL
}
exports.load_question_response_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_LOAD_QUESTION_RESPONSE_URL
}
exports.token_verification_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_TOKEN_VERIFICATION_URL
}
exports.clear_access_token_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_CLEAR_ACCESS_TOKEN
}
exports.refresh_token_url = function() {
  return cense_portal_endpoint + process.env.VUE_APP_REFRESH_TOKEN_URL
}
exports.add_user_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_ADD_USER_URL
}
exports.load_users_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_LOAD_USERS_URL
}
exports.delete_user_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_DELETE_USER_URL
}
exports.main_role_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_MAIN_ROLE_URL
}
exports.get_users_list = function () {
  return cense_portal_endpoint + process.env.VUE_APP_GET_USERS_LIST
}
exports.role_url = function () { // permissions
  return cense_portal_endpoint + process.env.VUE_APP_ROLE_URL
}
exports.role_submit_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_ROLE_SUBMIT_URL
}
exports.get_portalbot_user = function () {
  return cense_portal_endpoint + process.env.VUE_APP_GET_PORTALBOT_USER
}
exports.portal_permissions_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_PORTAL_PERMISSIONS_URL
}
exports.action_usage_stats_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_ACTION_USAGE_STATS_URL
}
exports.action_stats_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_ACTION_STATS_URL
}
exports.conversation_stats_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_CONVERSATION_STATS_URL
}
exports.get_unanswered_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_GET_UNANSWERED_URL
}
exports.add_ticket_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_ADD_TICKET_URL
}
exports.get_ticket_status_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_GET_TICKET_STATUS_URL
}
exports.update_ticket_status_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_UPDATE_TICKET_STATUS_URL
}
exports.delete_ticket_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_DELETE_TICKET_URL
}
exports.cronjob_summary = function () {
  return cense_portal_endpoint + process.env.VUE_APP_CRONJOB_SUMMARY
}
exports.add_intent_url = function () {
  return cense_models_endpoint + process.env.VUE_APP_ADD_INTENT_URL
}
exports.delete_intent_url = function () {
  return cense_models_endpoint + process.env.VUE_APP_DELETE_INTENT_URL
}
exports.upload_file_url = function () {
  return cense_models_endpoint + process.env.VUE_APP_UPLOAD_FILE_URL
}
exports.file_download = function () {
  return cense_portal_endpoint + process.env.VUE_APP_FILE_DOWNLOAD
}
exports.add_response_intent_url = function () {
  return cense_models_endpoint + process.env.VUE_APP_ADD_RESPONSE_INTENT_URL
}
exports.add_question_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_ADD_QUESTION_URL
}
exports.load_question_intent_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_LOAD_QUESTION_INTENT_URL
}
exports.delete_question_intent_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_DELETE_QUESTION_INTENT_URL
}
exports.show_question_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_SHOW_QUESTION_URL
}
exports.source_list_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_SOURCE_LIST_URL
}
exports.submit_intent_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_SUBMIT_INTENT_URL
}
exports.show_intent_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_SHOW_INTENT_URL
}
exports.edit_question_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_EDIT_QUESTION_URL
}
exports.multiple_delete_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_MULTIPLE_DELETE_URL
}
exports.load_admin_questions_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_LOAD_ADMIN_QUESTIONS_URL
}
exports.task_list_url = function () {
  return cense_models_endpoint + process.env.VUE_APP_TASK_LIST_URL
}
exports.train_model_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_TRAIN_MODEL_URL
}
exports.display_referrals_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_DISPLAY_REFERRALS_URL
}
exports.multiple_language_support_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_MULTIPLE_LANGUAGE_SUPPORT_URL
}
exports.widget_setting_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_WIDGET_SETTING
}
exports.notify_superadmin_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_NOTIFY_SUPERADMIN_URL
}
exports.file_download_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_FILE_DOWNLOAD
}
exports.add_support_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_ADD_SUPPORT_NUMBERS
}
exports.load_support_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_LOAD_SUPPORT_NUMBERS
}
exports.get_call_log_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_CALL_LOG_STATUS
}
exports.show_template_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_SHOW_TEMPLATE_URL
}
exports.delete_email_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_DELETE_EMAIL_URL
}
exports.email_send_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_EMAIL_SEND_URL
}
exports.add_config_api_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_CONFIG_API_URL
}
exports.get_list_link = function () {
  return cense_portal_endpoint + process.env.VUE_APP_CONFIGURING_API_LIST
}
exports.show_intents_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_SHOW_INTENT_URL
}
exports.delete_api_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_DELETE_API_URL
}
exports.clients_list_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_CLIENTS_APPROVAL_URL
}
exports.delete_clients_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_CLIENTS_DELETE_URL
}
exports.chat_url = function () {
  return cense_models_endpoint + process.env.VUE_APP_CHAT_SCREEN_URL
}
exports.prompt_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_PROMPT_URL
}
exports.edit_intent_url = function () {
  return cense_models_endpoint + process.env.VUE_APP_EDIT_INTENT_URL
}
exports.notify_superadmin_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_NOTIFY_SUPERADMIN_URL
}
exports.blog_submit_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_BLOG_CREATE_URL
}
exports.show_blogs_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_SHOW_BLOGS_URL
}
exports.blog_update_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_BLOG_UPDATE_URL
}
exports.edit_profile_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_EDIT_PROFILE_URL
}
exports.new_password_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_CHANGE_PASSWORD_URL
}
exports.referrals_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_REFERRALS_URL
}
exports.company_list_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_COMPANY_LIST_URL
}
exports.signout_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_SIGNOUT_URL
}
exports.get_language_support = function () {
  return cense_portal_endpoint + process.env.VUE_APP_GET_LANGUAGE_STATUS
}
exports.twilio_greetings = function () {
  return cense_portal_endpoint + process.env.VUE_APP_TWILIO_GREETINGS
}
exports.sms_settings = function () {
  return cense_portal_endpoint + process.env.VUE_APP_SMS_SETTINGS
}
exports.bot_response_token = function () {
  return cense_core_endpoint + process.env.VUE_APP_BOT_RESPONSE_TOKEN
}
exports.call_support_url = function () {
  return cense_core_endpoint + process.env.VUE_APP_CALL_SUPPORT_URL
}
exports.chatbot_response_cense = function () {
  return cense_core_endpoint + process.env.VUE_APP_CHATBOT_RESPONSE_CENSE
}
exports.payment_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_PAYMENT_URL
}
exports.convert_to_retail = function () {
  return cense_portal_endpoint + process.env.VUE_APP_CONVERT_TO_RETAIL
}
exports.billing_usage_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_BILLING_USAGE_URL
}
exports.piechart_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_PIECHART_URL
}
exports.billing_charge_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_BILLING_CHARGE_URL
}
exports.get_task_list = function () {
  return cense_portal_endpoint + process.env.VUE_APP_GET_TASK_LIST
}
exports.add_edit_bot_role = function () {
  return cense_portal_endpoint + process.env.VUE_APP_ADD_EDIT_BOT_ROLE
}
exports.account_payment_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_ACCOUNT_PAYMENT_URL
}
exports.payment_status_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_PAYMENT_STATUS_URL
}
exports.get_ticket_history = function () {
  return cense_portal_endpoint + process.env.VUE_APP_GET_TICKET_HISTORY
}
exports.chat_user_login_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_CHAT_USER_LOGIN
}
exports.chat_admin_create_group_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_CHAT_ADMIN_CREATE_GROUP
}
exports.chat_user_get_groups_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_CHAT_USER_GET_GROUPS
}
exports.chat_admin_delete_group_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_CHAT_ADMIN_DELETE_GROUP
}
exports.chat_admin_add_member_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_CHAT_ADMIN_ADD_MEMBER
}
exports.chat_admin_get_group_members_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_CHAT_ADMIN_GET_GROUP_MEMBERS
}
exports.chat_admin_remove_member_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_CHAT_ADMIN_REMOVE_GROUP_MEMBERS
}
exports.chat_previous_history = function () {
  return cense_portal_endpoint + process.env.VUE_APP_CHAT_PREVIOUS_HISTORY
}
exports.users_list_sync = function () {
  return cense_portal_endpoint + process.env.VUE_APP_USERS_LIST_SYNC
}
exports.create_peer_peer_chat = function () {
  return cense_portal_endpoint + process.env.VUE_APP_CREATE_PEER_PEER_GROUPS
}
exports.ner_sentences_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_NER_SENTENCES_URL
}
exports.get_license_key = function () {
  return cense_portal_endpoint + process.env.VUE_APP_DOWNLOAD_LICENSE_KEY
}
exports.submit_closed_form_url = function () {
  return cense_closed_form_endpoint + process.env.VUE_APP_SUBMIT_CLOSED_FORM_URL
}
exports.upload_ner_file_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_UPLOAD_NER_FILE_URL
}
exports.all_task_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_ALL_TASKS_URL
}
exports.assign_task_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_ASSIGN_TASK_URL
}
exports.load_tag_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_LOAD_TAG_NER_URL
}
exports.tag_sentences_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_TAG_SENTENCES_URL
}
exports.add_ner_tag = function () {
  return cense_portal_endpoint + process.env.VUE_APP_ADD_NER_TAG
}
exports.get_ner_tag = function () {
  return cense_portal_endpoint + process.env.VUE_APP_GET_NER_TAG
}
exports.delete_ner = function () {
  return cense_portal_endpoint + process.env.VUE_APP_DELETE_NER
}
exports.delete_ner_tags = function () {
  return cense_portal_endpoint + process.env.VUE_APP_DELETE_NER_TAG
}
exports.get_ner_tags = function () {
  return cense_portal_endpoint + process.env.VUE_APP_GET_NER_TAGS
}
exports.add_ner_statement = function () {
  return cense_portal_endpoint + process.env.VUE_APP_ADD_NER_STATEMENT
}
exports.get_company_models = function () {
  return cense_models_endpoint + process.env.VUE_APP_GET_COMPANY_MODELS
}
exports.train_conversation_models = function () {
  return cense_models_endpoint + process.env.VUE_APP_TRAIN_CONVERSATION_MODELS
}
exports.revert_models = function () {
  return cense_core_endpoint + process.env.VUE_APP_REVERT_MODEL
}
exports.billing_invoice = function () {
  return cense_portal_endpoint + process.env.VUE_APP_BILLING_INVOICE
}
exports.bank_details_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_BANK_DETAILS_URL
}
exports.scheduling_settings_url = function () {
  return cense_scheduler_endpoint + process.env.VUE_APP_SCHEDULING_SETTINGS
}
exports.train_intent_model = function () {
  return cense_models_endpoint + process.env.VUE_APP_TRAIN_INTENT_MODEL
}
exports.schedule_url = function () {
  return cense_scheduler_endpoint + process.env.VUE_APP_SCHEDULE_URL
}
exports.schedule_info_url = function () {
  return cense_scheduler_endpoint + process.env.VUE_APP_SCHEDULE_INFO_URL
}
exports.show_schedule_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_SHOW_SCHEDULE
}
exports.schedule_appointment_url = function () {
  return cense_scheduler_endpoint + process.env.VUE_APP_SCHEDULE_APPOINTMENT
}
exports.schedule_edit_delete_url = function () {
  return cense_scheduler_endpoint + process.env.VUE_APP_EDIT_DELETE_SCHEDULE_URL
}
exports.holiday_file_download = function () {
  return cense_portal_endpoint + process.env.VUE_APP_HOLIDAY_FILE_DOWNLOAD
}
exports.upload_question_intent = function () {
  return cense_portal_endpoint + process.env.VUE_APP_UPLOAD_QUESTION_INTENT
}
exports.upload_product_csv = function () {
  return cense_portal_endpoint + process.env.VUE_APP_UPLOAD_PRODUCT_CSV
}
exports.question_response_csv = function () {
  return cense_portal_endpoint + process.env.VUE_APP_QUESTION_RESPONSE_CSV
}
exports.question_intent_csv = function () {
  return cense_portal_endpoint + process.env.VUE_APP_QUESTION_INTENT_CSV
}
exports.general_chat_history = function () {
  return cense_portal_endpoint + process.env.VUE_APP_GENERAL_CHAT_HISTORY
}
exports.get_company_ner_models = function () {
  return cense_models_endpoint + process.env.VUE_APP_GET_COMPANY_NER_MODELS
}
exports.train_ner_models = function () {
  return cense_models_endpoint + process.env.VUE_APP_TRAIN_NER_MODELS
}
exports.train_model = function () {
  return cense_models_endpoint + process.env.VUE_APP_TRAIN_MODEL
}
exports.revert_ner_models = function () {
  return cense_models_endpoint + process.env.VUE_APP_REVERT_NER_MODELS
}
exports.reset_password_update = function () {
  return cense_portal_endpoint + process.env.VUE_APP_RESET_PASSWORD_UPDATE_URL
}
exports.bot_user_data = function () {
  return cense_core_endpoint + process.env.VUE_APP_BOT_USER_DATA
}
exports.chat_group_api = function () {
  return process.env.VUE_APP_LIVE_CHAT_END_POINT + process.env.VUE_APP_CHAT_GROUP_API
}
exports.voice_channel_api = function () {
  return process.env.VUE_APP_LIVE_CHAT_END_POINT + process.env.VUE_APP_VOICE_CHANNEL_API
}
exports.send_closed_form = function () {
  return cense_closed_form_endpoint + process.env.VUE_APP_SEND_CLOSED_FORM
}
exports.closed_form_response_api = function () {
  return cense_closed_form_endpoint + process.env.VUE_APP_CLOSED_FORM_RESPONSE
}
exports.billing_subscription_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_BILLING_SUBSCRIPTION_URL
}
exports.call_recordings_list_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_CALL_RECORDINGS_LIST
}
exports.show_closed_form_url = function () {
  return cense_closed_form_endpoint + process.env.VUE_APP_SHOW_CLOSED_FORM
}
exports.delete_closed_form_url = function () {
  return cense_closed_form_endpoint + process.env.VUE_APP_DELETE_CLOSED_FORM
}
exports.open_form_tasks = function () {
  return cense_models_endpoint + process.env.VUE_APP_OPEN_FORM_TASKS
}
exports.open_bot = function () {
  return cense_portal_endpoint + process.env.VUE_APP_OPEN_BOT
}
exports.open_bot_assignment = function () {
  return cense_portal_endpoint + process.env.VUE_APP_OPEN_BOT_ASSIGNMENT
}
exports.open_bot_pregress = function () {
  return cense_portal_endpoint + process.env.VUE_APP_OPEN_BOT_PROGRESS
}
exports.social_media_settings_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_SOCIAL_MEDIA_SETTINGS
}
exports.schedule_feedback_url = function () {
  return cense_scheduler_endpoint + process.env.VUE_APP_SCHEDULE_FEEDBACK
}
exports.pdf_to_convert_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_PDF_TO_HTML_URL
}
exports.visit_status_info = function () {
  return cense_scheduler_endpoint + process.env.VUE_APP_VISIT_STATUS_INFO
}
exports.reschedule_appointment = function () {
  return cense_scheduler_endpoint + process.env.VUE_APP_RESCHEDULE_APPOINTMENT
}
exports.send_reminder = function () {
  return cense_scheduler_endpoint + process.env.VUE_APP_SEND_REMINDER
}
exports.confirm_appointment = function () {
  return cense_scheduler_endpoint + process.env.VUE_APP_CONFIRM_APPOINTMENT
}
exports.get_closed_form_response = function () {
  return cense_closed_form_endpoint + process.env.VUE_APP_GET_CLOSED_FORM_RESPONSE
}
exports.get_open_bot_template = function () {
  return cense_models_endpoint + process.env.VUE_APP_GET_OPEN_BOT_TEMPLATE
}
exports.post_open_bot_template = function () {
  return cense_portal_endpoint + process.env.VUE_APP_POST_OPEN_BOT_TEMPLATE
}
exports.open_bot_template_subscription = function () {
  return cense_models_endpoint + process.env.VUE_APP_OPEN_BOT_TEMPLATE_SUBSCRIPTION
}
exports.open_bot_template_subscription_api = function () {
  return cense_models_endpoint + process.env.VUE_APP_OPEN_BOT_TEMPLATE_SUBSCRIPTION_API
}
exports.bi_upload_file = function () {
  return cense_portal_endpoint + process.env.VUE_APP_BI_UPLOAD_FILE
}
exports.bi_process_data = function () {
  return cense_portal_endpoint + process.env.VUE_APP_BI_PROCESS_DATA
}
exports.bi_search_data = function () {
  return cense_portal_endpoint + process.env.VUE_APP_BI_SEARCH_DATA
}
exports.bi_temp_search_data = function () {
  return cense_portal_endpoint + process.env.VUE_APP_BI_TEMP_SEARCH_DATA
}
exports.bi_complete_search_data = function () {
  return cense_portal_endpoint + process.env.VUE_APP_BI_COMPLETE_SEARCH_DATA
}
exports.bi_data_sheet_details = function () {
  return cense_portal_endpoint + process.env.VUE_APP_BI_DATA_SHEET_DETAILS
}
exports.bi_complete_search_data_experimental = function () {
  return cense_portal_endpoint + process.env.VUE_APP_BI_COMPLETE_SEARCH_EXPERIMENTAL
}
exports.bi_generate_report = function () {
  return process.env.VUE_APP_LIVE_CHAT_END_POINT + process.env.VUE_APP_BI_GENERATE_REPORT
}
exports.bi_list_reports = function () {
  return process.env.VUE_APP_LIVE_CHAT_END_POINT + process.env.VUE_APP_BI_LIST_REPORTS
}
exports.bi_get_reports_status = function () {
  return process.env.VUE_APP_LIVE_CHAT_END_POINT + process.env.VUE_APP_BI_GET_REPORT_STATUS
}
exports.bi_get_report_url = function () {
  return process.env.VUE_APP_LIVE_CHAT_END_POINT + process.env.VUE_APP_BI_GET_REPORT_URL
}
exports.bi_download_report = function () {
  return process.env.VUE_APP_LIVE_CHAT_END_POINT + process.env.VUE_APP_BI_DOWNLOAD_REPORT
}
exports.bi_search_recent_nlp = function () {
  return cense_portal_endpoint + process.env.VUE_APP_BI_NLP_RECENT_SEARCH
}
exports.bi_delete_report = function () {
  return process.env.VUE_APP_LIVE_CHAT_END_POINT + process.env.VUE_APP_BI_DELETE_REPORT
}
exports.bi_db_integration = function () {
  return cense_portal_endpoint + process.env.VUE_APP_BI_DB_INTEGRATION
}
exports.bi_fetch_report = function () {
  return process.env.VUE_APP_LIVE_CHAT_END_POINT + process.env.VUE_APP_BI_FETCH_SUMMARY
}
exports.use_model = function () {
  return cense_core_endpoint + process.env.VUE_APP_USE_MODEL
}
exports.bi_unanswered_searches = function () {
  return cense_portal_endpoint + process.env.VUE_APP_BI_UNANSWERED_SEARCHES
}
exports.test_intent_model = function () {
  return cense_models_endpoint + process.env.VUE_APP_TEST_INTENT_MODEL
}
exports.support_ticket = function () {
  return cense_portal_endpoint + process.env.VUE_APP_SUPPORT_TICKET
}
exports.get_widget_settings = function () {
  return cense_portal_endpoint + process.env.VUE_APP_WIDGET_SETTING_VALUES
}
exports.dashboard_bot_details_count = function () {
  return cense_portal_endpoint + process.env.VUE_APP_DASHBOARD_BOT_DETAILS
}
exports.chatbot_integration_details = function () {
  return cense_portal_endpoint + process.env.VUE_APP_CHATBOT_INTEGRATION_DETAILS
}
exports.feedback_url = function () {
  return cense_portal_endpoint + process.env.VUE_APP_FEEDBACK_URL
}
exports.intent_question_response = function () {
  return cense_models_endpoint + process.env.VUE_APP_INTENT_QUESTION_RESPONSE
}
exports.maintainence_check_endpoint = function () {
  return cense_portal_endpoint + process.env.VUE_APP_MAINTENANCE_CHECK
}
exports.automation_notification = function () {
  return cense_portal_endpoint + process.env.VUE_APP_AUTOMATION_NOTIFICATION
}
exports.template_synonyms = function () {
  return cense_models_endpoint + process.env.VUE_APP_TEMPLATE_SYNONYMS_API
}
exports.setup_status = function (){
  return cense_portal_endpoint + process.env.VUE_APP_SETUP_STATUS
}
exports.upsell_crosssell = function (){
  return cense_models_endpoint + process.env.VUE_APP_CROSSSELL_UPSELL_PRODUCTS_API
}
exports.template_promotional_email = function (){
  return cense_models_endpoint + process.env.VUE_APP_TEMPLATE_PROMOTIONAL_EMAIL
}
exports.template_promotional_email_campaign = function (){
  return cense_models_endpoint + process.env.VUE_APP_TEMPLATE_PROMOTIONAL_EMAIL_CAMPAIGN
}
exports.template_promotional_sms_campaign = function (){
  return cense_models_endpoint + process.env.VUE_APP_TEMPLATE_PROMOTIONAL_SMS_CAMPAIGN
}
exports.template_promotional_sms = function (){
  return cense_models_endpoint + process.env.VUE_APP_TEMPLATE_PROMOTIONAL_SMS
}
exports.products_report = function (){
  return cense_models_endpoint + process.env.VUE_APP_PRODUCTS_REPORT
}
exports.product_settings = function(){
  return cense_portal_endpoint + process.env.VUE_APP_PRODUCT_SETTINGS
}
exports.send_offer_to_customers = function (){
  return cense_models_endpoint + process.env.VUE_APP_SEND_OFFER_TO_CUSTOMERS
}
exports.outofstockemailnotification = function(){
  return cense_models_endpoint + process.env.VUE_APP_OUT_OF_STOCK_EMAIL_NOTIFICATION
}  
exports.super_admin_login = function(){
  return cense_portal_endpoint + process.env.VUE_APP_SUPER_ADMIN_LOGIN
}
exports.super_admin_logout = function(){
  return cense_portal_endpoint + process.env.VUE_APP_SUPER_ADMIN_LOGOUT
}
exports.super_admin_bot_login = function(){
  return cense_core_endpoint + process.env.VUE_APP_SUPER_ADMIN_BOT_RESPONSE_TOKEN
}
exports.super_admin_bot_logout = function(){
  return cense_core_endpoint + process.env.VUE_APP_SUPER_ADMIN_BOT_LOGOUT
}
exports.customer_feedback_questions = function(){
  return cense_models_endpoint + process.env.VUE_APP_CUSTOMER_FEEDBACK_QUESTIONS
}
exports.add_product_variants = function(){
  return cense_models_endpoint + process.env.VUE_APP_ADD_PRODUCT_VARIANTS
}
exports.faq_pdf_maker = function(){
  return cense_models_endpoint + process.env.VUE_APP_FAQ_PDF_MAKER
}
exports.form_automation_dialog_tree = function(){
  return cense_models_endpoint + process.env.VUE_APP_FORM_AUTOMATION_DIALOG_TREE
}
exports.form_automation_webhook_details = function(){
  return cense_models_endpoint + process.env.VUE_APP_FORM_AUTOMATION_WEBHOOK_DETAILS
}
exports.form_automation_add_entity = function(){
  return cense_models_endpoint + process.env.VUE_APP_FORM_AUTOMATION_ADD_ENTITY
}
exports.form_automation_save_intent_example = function(){
  return cense_models_endpoint + process.env.VUE_APP_FORM_AUTOMATION_SAVE_INTENT
}
exports.upload_company_logo = function(){
  return cense_portal_endpoint + process.env.VUE_APP_UPLOAD_COMPANY_LOGO
}
exports.models_training_status = function(){
  return cense_portal_endpoint + process.env.VUE_APP_SHOW_MODELS_STATUS
}
exports.train_intent_ner_model = function(){
  return cense_models_endpoint + process.env.VUE_APP_TRAIN_INTENT_NER_MODELS
}
exports.form_automation_chatbot_response = function(){
  return cense_core_endpoint + process.env.VUE_APP_FORM_AUTOMATION_CHATBOT_RESPONSE_CENSE
}
exports.razorpay_communcation = function(){
  return cense_portal_endpoint + process.env.VUE_APP_RAZOR_PAY_COMMUNICATION
}
exports.product_review_rating = function(){
  return cense_portal_endpoint + process.env.VUE_APP_PRODUCT_REVIEW_RATING
}
exports.add_widget_code_to_shopify_store = function(){
  return cense_models_endpoint + process.env.VUE_APP_ADD_WIDGET_CODE_TO_SHOPIFY_STORE
}
exports.subscribe_shopify_billing = function(){
  return cense_models_endpoint + process.env.VUE_APP_ADD_SUBSCRIBE_SHOPIFY_BILLING
}
exports.retail_coupon_codes = function(){
  return cense_models_endpoint + process.env.VUE_APP_RETAIL_COUPON_CODES
}
exports.display_landing_products = function () {
  return cense_models_endpoint + process.env.VUE_APP_DISPLAY_LANDING_PRODUCTS
}
exports.banner_template = function (){
  return cense_models_endpoint + process.env.VUE_APP_BANNER_TEMPLATE
}
exports.stripe_payment_gateway = function (){
  return cense_portal_endpoint + process.env.VUE_APP_STRIPE_PAYMENT_GATEWAY
}
exports.check_addons_balance = function (){
  return cense_portal_endpoint + process.env.VUE_APP_CHECK_ADD_ONS_BALANCE
}
exports.unsubscribe_promotional_email = function (){
  return cense_models_endpoint + process.env.VUE_APP_UNSUBSCRIBE_MARKETING_MAIL
}
exports.hr_bot_notify_candidate = function (){
  return cense_models_endpoint + process.env.VUE_APP_HR_BOT_NOTIFY_CANDIDATE
}
exports.unsearchable_prodcts = function (){
  return cense_models_endpoint + process.env.VUE_APP_UNSEARCHABLE_PRODUCTS
}
exports.hr_schedule_appointment = function () {
  return cense_scheduler_endpoint + process.env.VUE_APP_HR_SCHEDULE_APPOINTMENT
}
exports.hr_get_schedule_appointment = function () {
  return cense_scheduler_endpoint + process.env.VUE_APP_HR_GET_SCHEDULE_URL
}
exports.hr_get_schedule_info_url = function () {
  return cense_scheduler_endpoint + process.env.VUE_APP_HR_SCHEDULE_INFO_URL
}
exports.hr_visit_status_info = function () {
  return cense_scheduler_endpoint + process.env.VUE_APP_HR_VISIT_STATUS_INFO
}
exports.hr_reschedule_appointment = function () {
  return cense_scheduler_endpoint + process.env.VUE_APP_HR_RESCHEDULE_APPOINTMENT
}
exports.portal_language_data = function () {
  return cense_portal_endpoint + process.env.VUE_APP_PORTAL_LANGUAGE_DATA
}
exports.hr_requirement_form = function () {
  return cense_scheduler_endpoint + process.env.VUE_APP_HR_REQUIREMENT_FORM
}
exports.whatsapp_chat = function (){
  return cense_portal_endpoint + process.env.VUE_APP_WHATSAPP_CHAT
}
exports.whatsapp_profile = function (){
  return cense_portal_endpoint + process.env.VUE_APP_WHATSAPP_PROFILE
}
exports.initialize_whatsapp_topic = function (){
  return process.env.VUE_APP_LIVE_CHAT_END_POINT + process.env.VUE_APP_WHATSAPP_INITIALIZE_TOPIC
}
exports.hr_position_details = function () {
  return cense_scheduler_endpoint + process.env.VUE_APP_HR_POSITION_DETAILS
}
exports.hr_candidate_details = function () {
  return cense_scheduler_endpoint + process.env.VUE_APP_HR_CANDIDATE_DETAILS
}
exports.whatsapp_template = function () {
  return cense_portal_endpoint + process.env.VUE_APP_WHATSAPP_TEMPLATE
}
exports.whatsapp_broadcasts = function () {
  return cense_portal_endpoint + process.env.VUE_APP_WHATSAPP_BROADCASTS
}
exports.whatsapp_metrics = function () {
  return cense_portal_endpoint + process.env.VUE_APP_WHATSAPP_METRICS
}
exports.whatsapp_import_contacts = function () {
  return cense_portal_endpoint + process.env.VUE_APP_WHATSAPP_IMPORT_CONTACTS
}
