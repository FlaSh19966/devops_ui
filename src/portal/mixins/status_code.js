export default {
    data() {
        return {
            // 8 digit codes
            // first 2 digits represents containers
            // 10 - portal
            // 20 - models
            // 30 - core
            // next 5 digits represents message codes in sequence
            // 0(error) / 1(success) - last digit will defined if it was a success message or a error message
            api_status_code: {
                API_STATUS_SUCCESS : 'Success',
                API_STATUS_PARTIAL : 'Partial',
                API_STATUS_FAILURE : 'Failure',
                API_STATUS_ERROR : 'Error',
                INTERNAL_SERVER_ERROR: {
                    'MSG_CODE': 10000000,
                    'MSG': 'Internal Server Error'
                },
                TOKEN_INVALID_0001: {
                    'MSG_CODE': 10000010,
                    'MSG': "token invalid"
                },
                ADDED_UNSUCCESSFULLY_0003: {
                    'MSG_CODE': 10000020,
                    'MSG': "Already exists"
                },
                DOCUMENT_DOESNT_EXIST: {
                    'MSG_CODE': 10000030,
                    'MSG': "The document you are trying to read/edit doesn't exist"
                },
                CLOSED_FORM_BOT_DOESNT_EXIST: {
                    'MSG_CODE': 10000040,
                    'MSG': "NO CLOSED FORM BOT"
                },
                WRONG_BUCKET_CREDS: {
                    'MSG_CODE': 10000050,
                    'MSG': 'WRONG BUCKET CREDENTIALS'
                },
                BUCKET_CREDS_NOT_ADDED: {
                    'MSG_CODE': 10000060,
                    'MSG': 'BUCKET CREDS NOT ADDED'
                },
                DISALLOWED_FILE_EXTENSION: {
                    'MSG_CODE': 10000070,
                    'MSG': 'FILE EXTENSION DISALLOWED'
                },

                REGISTRATION_UNSUCCESSFUL_1013: {
                    'MSG_CODE': 10000080,
                    'MSG': "Registration Unsuccessful"
                },
                DUPLICATE_EMAIL_1015: {
                    'MSG_CODE': 10000090,
                    'MSG': "This email is a duplicate."
                },
                EMAIL_REGISTERED_WITH_OTHER_COMPANY: {
                    'MSG_CODE': 10000100,
                    'MSG': "This email is registered with other company."
                },
                EMAIL_VERIFICATION_UNSUCCESSFUL_1017: {
                    'MSG_CODE': 10000110,
                    'MSG': "Email already verified"
                },
                USER_NOT_APPROVED_1019: {
                    'MSG_CODE': 10000120,
                    'MSG': "User has not been approved yet."
                },
                USER_ALREADY_LOGGED_IN_1021: {
                    'MSG_CODE': 10000130,
                    'MSG': "You are already logged in!"
                },
                EMAIL_NOT_VERIFIED_1023: {
                    'MSG_CODE': 10000140,
                    'MSG': "Email hasn't been verified."
                },
                EMAIL_DOES_NOT_EXIST_1025: {
                    'MSG_CODE': 10000150,
                    'MSG': "Please make sure you have entered a registered email address"
                },
                USER_DOES_NOT_EXIST_1027: {
                    'MSG_CODE': 10000160,
                    'MSG': "User Doesn't Exist"
                },
                PASSWORD_RESET_LINK_EXPIRED_1029: {
                    'MSG_CODE': 10000170,
                    'MSG': "The link you used has expired"
                },
                PASSWORD_INCORRECT_1031: {
                    'MSG_CODE': 10000180,
                    'MSG': "Password Incorrect"
                },
                USER_BLOCKED_1033: {
                    'MSG_CODE': 10000190,
                    'MSG': "User Blocked"
                },

                EMAIL_TEMPLATE_EXISTS_2001: {
                    'MSG_CODE': 10000200,
                    'MSG': ""
                },
                EMAIL_ALREADY_EXISTS_2005: {
                    'MSG_CODE': 10000210,
                    'MSG': "This email already exists!"
                },
                CONFIGURING_API_2011: {
                    'MSG_CODE': 10000220,
                    'MSG': "Already added"
                },
                CONTACT_DOESNT_EXIST: {
                    'MSG_CODE': 10000230,
                    'MSG': "CONTACT DOESN'T EXIST"
                },
                DUPLICATE_SUPPORT_CONTACT: {
                    'MSG_CODE': 10000240,
                    'MSG': "INSERT DUPLICATE CONTACT"
                },

                INVALID_CREDENTIALS_0005: {
                    'MSG_CODE': 10000250,
                    'MSG': 'Invalid Credentials'
                },

                QUESTION_COUNT_ALREADY_EXCEEDED_4005: {
                    'MSG_CODE': 10000260,
                    'MSG': "Question Limit Already Exceeded!"
                },
                QUESTION_COUNT_EXCEEDS_LIMIT_4007: {
                    'MSG_CODE': 10000270,
                    'MSG': "Limit Exceeded! Those questions exceeding the limit will not be recorded. Please upgrade your plans"
                },
                CHAT_AGENT_LIMIT_REACHED: {
                    'MSG_CODE': 10000280,
                    'MSG': "Maximum number of live chat agent already exists. Please upgrade your plans to add more user as support agent"
                },
                SUBSCRIPTION_INVALID_4009: {
                    'MSG_CODE': 10000290,
                    'MSG': "Subscription Type Error!"
                },
                DUPLICATE_INTENT_4011: {
                    'MSG_CODE': 10000300,
                    'MSG': "Intent already exist"
                },
                DUPLICATE_INTENT_PLUS_LIMIT_EXCEEDED_4013: {
                    'MSG_CODE': 10000310,
                    'MSG': "Questions with existing intents and those exceeding your limit have not been added!"
                },
                DUPLICATE_SESSION_TOKEN: {
                    'MSG_CODE': 10000320,
                    'MSG': "Duplicate session token"
                },
                INTENT_DOESNT_EXIST: {
                    'MSG_CODE': 10000330,
                    'MSG': "INTENT DOESN'T EXIST"
                },
                INTENT_EDIT_ALREADY_EXIST: {
                    'MSG_CODE': 10000340,
                    'MSG': "INTENT WITH NEW NAME ALREADY EXISTS"
                },
                INTENT_DELETING_DISABLED: {
                    'MSG_CODE': 10000350,
                    'MSG': "Trained intent deletion is currently disabled!"
                },
                INTENT_DELETED_TRAIN_MODEL: {
                    'MSG_CODE': 10000360,
                    'MSG': "Trained intent has been deleted. Please Train the Model Again to See Reflected Changes"
                },

                UNSUCCESSFUL_DB_QUERY: {
                    'MSG_CODE': 10000370,
                    'MSG': 'Query Executed UnSuccessfully'
                },
                UNSUCCESSFUL_DB_OPERATION: {
                    'MSG_CODE': 10000380,
                    'MSG': 'DB OPERATION UNSUCCESSFUL'
                },
                cense_enquiry_msg: {
                    'MSG_CODE': 10000390,
                    'MSG': 'Sorry i am not getting your question.Do u want to talk with our support team'
                },

                BLOG_DUPLICATE: {
                    'MSG_CODE': 10000400,
                    'MSG': 'Duplicate Blog Name'
                },

                IMG_DUPLICATE: {
                    'MSG_CODE': 10000410,
                    'MSG': 'Duplicate image'
                },


                API_RATE_LIMIT_EXCEEDED: {
                    'MSG_CODE': 10000420,
                    'MSG': 'API LIMIT EXCEEDED'
                },
                USER_EXIST: {
                    'MSG_CODE': 10000430,
                    'MSG': 'USER EXIST'
                },
                UPLOAD_FILE_ERROR: {
                    'MSG_CODE': 10000440,
                    'MSG': 'Error while processing file'
                },

                ADD_STATEMENT_ERROR: {
                    'MSG_CODE': 10000450,
                    'MSG': 'Error while adding statement'
                },

                NER_TAG_STATUS: {
                    'MSG_CODE': 10000460,
                    'MSG': 'Ner Tag InCompleted'
                },

                EMPTY_DATA: {
                    'MSG_CODE': 10000470,
                    'MSG': 'No Data Available'
                },

                WIDGET_NOT_AVAILABLE: {
                    'MSG_CODE': 10000480,
                    'MSG': 'Widget theme unavailable'
                },

                BOT_TOKEN_INVALID: {
                    'MSG_CODE': 10000490,
                    'MSG': 'Token is missing or invalid.Looks like there is no active session, can you please logout and login again.In case the issue still persists,please get in touch with admin'
                },
                DISCOUNT_COUPONS_UPDATED_MODELS : {
                    'MSG_CODE': 20000781,
                    'MSG': "Discount Coupons Updated"
                },
                COUPONS_FOUND_MODELS : {
                    'MSG_CODE': 20000741,
                    'MSG': "Coupons found"
                },
                NO_COUPONS_FOUND_MODELS : {
                    'MSG_CODE': 20000731,
                    'MSG': "No Coupons found"
                },
                ADDING_COUPONS_TO_DB_MODELS : {
                    'MSG_CODE': 20000791,
                    'MSG': "Adding coupons to db"
                },
                CUSTOMER_REVIEW_NOT_AVAILABLE :{
                    'MSG_CODE': 10001450,
                    'MSG': "Customer Review Not Available"
                },
                SOME_ERROR_OCCURRED_MODELS : {
                    'MSG_CODE': 20000640,
                    'MSG': "Some error occurred"
                },
                NO_DISCOUNT_COUPONS_FOUND_MODELS : {
                    'MSG_CODE': 20000650,
                    'MSG': "No Discount Coupons Found"
                },
                DISCOUNT_COUPONS_UPDATE_FAILED_MODELS : {
                    'MSG_CODE': 20000660,
                    'MSG': "Discount Coupons Updating Failed"
                },
                INVALID_LICENSE_KEY: {
                    'MSG_CODE': 10000500,
                    'MSG': 'Invalid license key'
                },

                ENDPOINT_LIMIT: {
                    'MSG_CODE': 10000500,
                    'MSG': 'Endpoint limit exceed'
                },

                STORAGE_LIMIT_EXCEED: {
                    'MSG_CODE': 10000510,
                    'MSG': 'Storage limit exceed'
                },
                INVALID_HEADING: {
                    'MSG_CODE': 10000520,
                    'MSG': 'Invalid Header'
                },
                ERROR_UPLOAD: {
                    'MSG_CODE': 10000530,
                    'MSG': 'Error while uploading'
                },
                NER_DATA_ABSENT: {
                    'MSG_CODE': 10000540,
                    'MSG': 'There is no tagged NER data to train on!'
                },

                NO_PRODUCTS_FOUND: {
                    'MSG_CODE': 10000550,
                    'MSG': 'NO PRODUCTS FOUND'
                },

                PASSWORD_SIMILAR: {
                    'MSG_CODE': 10000560,
                    'MSG': 'Password is Similar'
                },

                RENEW_PASSWORD: {
                    'MSG_CODE': 10000570,
                    'MSG': 'Password should be Renewed'
                },

                APPOINTMENT_REMINDER_FAILED: {
                    'MSG_CODE': 10000580,
                    'MSG': 'Reminder Failed'
                },

                UPDATE_SCHEDULER_SETTINGS: {
                    'MSG_CODE': 10000590,
                    'MSG': 'Please update your scheduler settings'
                },

                LINK_EXPIRED: {
                    'MSG_CODE': 10000600,
                    'MSG': 'Link Expired'
                },

                SCHEDULING_TOKEN_INVALID: {
                    'MSG_CODE': 10000610,
                    'MSG': 'Token Invalid'
                },

                APPOINTMENT_CONFIRMATION_FAILED: {
                    'MSG_CODE': 10000620,
                    'MSG': 'Appointment Confirmation Failed',
                },
                APPOINTMENT_LINK_EXPIRED: {
                    'MSG_CODE': 10000630,
                    'MSG': 'Appointment Link Expired'
                },

                INVALID_OPERATION: {
                    'MSG_CODE': 10000640,
                    'MSG': 'INVALID OPERATION'
                },
                INVALID_JDBC_CONNECTION_STRING: {
                    'MSG_CODE': 10000650,
                    'MSG': 'INVALID JDBC CONNECTION STRING'
                },
                UNABLE_TO_CONNECT_TO_DB: {
                    'MSG_CODE': 10000660,
                    'MSG': 'UNABLE TO CONNECT TO DB'
                },
                USER_ROLE_SET_ALREADY_EXISTS_2002: {
                    'MSG_CODE': 10000670,
                    'MSG': "User Role Exists"
                },
                SUPER_ADMIN_EXISTS_ERROR: {
                    'MSG_CODE': 10000680,
                    'MSG': "Super Admin cannot be added"
                },
                FEEDBACK_ALREADY_EXISTS: {
                    'MSG_CODE': 10000690,
                    'MSG': "Feedback already Exists"
                },
                FEEDBACK_IS_EMPTY: {
                    'MSG_CODE': 10000700,
                    'MSG': "Please enter a feedback message"
                },

                INVALID_COMPANY_AUTH: {
                    'MSG_CODE': 10000710,
                    'MSG': "Company doesn't matches with the jwt claims"
                },
                INVALID_SHOPIFY_API_KEY_AND_TOKEN: {
                    'MSG_CODE': 10000720,
                    'MSG': "Invalid API key or access token"
                },
                SHOP_NOT_FOUND: {
                    'MSG_CODE': 10000730,
                    'MSG': "Shop not found"
                },
                SHOP_NO_PRODUCTS: {
                    'MSG_CODE': 10000740,
                    'MSG': 'Shop has no products'
                },
                CAPTCHA_VERIFICATION_FAILED: {
                    'MSG_CODE': 10000750,
                    'MSG': "Captcha Verification Failed"
                },
                DUPLICATE_COMPANY: {
                    'MSG_CODE': 10000760,
                    'MSG': "Company Already Exists"
                },
                SHOPIFY_STOREFRONT_TOKEN_NOT_ALLOWED: {
                    'MSG_CODE': 10000770,
                    'MSG': 'Shopify Storefront Access Not Provided'
                },
                INVALID_FILE_TYPE: {
                    "MSG_CODE": 10000780,
                    "MSG": "File type not supported"
                },

                INCORRECT_FILE_FORMAT: {
                    "MSG_CODE": 10000790,
                    "MSG": "Incorrect file format"
                },
                FAILED_TO_ADD_TAGS: {
                    "MSG_CODE": 10000800,
                    "MSG": "Unknown Tags found, please check the csv file."
                },
                LICENSE_KEY_INCORRECT: {
                    "MSG_CODE": 10000810,
                    "MSG": "Licence key Incorrect"
                },
                WOOCOMMERCE_INVALID_CONSUMER_SECRET: {
                    "MSG_CODE": 10000820,
                    "MSG": "Invalid consumer secret"
                },
                WOOCOMMERCE_INVALID_CONSUMER_KEY: {
                    "MSG_CODE": 10000830,
                    "MSG": "Invalid consumer key"
                },
                MAGENTO_INVALID_ACCESS_TOKEN: {
                    "MSG_CODE": 10000840,
                    "MSG": "Invalid access token"
                },
                NO_ADD_ONS_FOUND: {
                    "MSG_CODE": 10000850,
                    "MSG": "No add-ons found in database"
                },
                BIGCOMMERCE_INVALID_ACCESS_TOKEN: {
                    "MSG_CODE": 10000860,
                    "MSG": "Invalid access token"
                },
                USER_HAS_BEEN_LOCKED: {
                    "MSG_CODE": 10000870,
                    "MSG": "Your account has been locked due incorrect login attempts"
                },
                REGISTER_AND_LOGIN_SOURCE_DONT_MATCH: {
                    "MSG_CODE": 10000880,
                    "MSG": "Register and login source don't match"
                },
                SSO_SERVER_ERROR: {
                    'MSG_CODE': 10000890,
                    "MSG": "SSO login error"
                },
                FACEBOOK_PAGE_ID_DOESNT_EXISTS: {
                    "MSG_CODE": 10000900,
                    "MSG": "Facebook page id does not exists in db"
                },
                NO_WHATSAPP_TEMPLATE: {
                    'MSG_CODE': 10000920,
                    'MSG': 'No Whatsapp Template in database'
                },
                NO_DEFAULT_WHATSAPP_TEMPLATE: {
                    'MSG_CODE': 10000930,
                    'MSG': 'No Default Whatsapp Template in database'
                },
                PARENT_TEMPLATE_NOT_FOUND: {
                    'MSG_CODE': 10000940,
                    'MSG': 'Parent Template not found in database'
                },
                TEMPLATE_DETAILS_MISSING: {
                    'MSG_CODE': 10000950,
                    'MSG': 'Template details missing in request body'
                },
                SELECTED_TEMPLATE_NOT_FOUND: {
                    'MSG_CODE': 10000960,
                    'MSG': 'Selected template not found in database'
                },
                WHATSAPP_TEMPLATE_NAME_EXISTS: {
                    'MSG_CODE': 10000970,
                    'MSG': 'Whatsapp Template Name Already Exists'
                },
                WHATSAPP_TEMPLATE_VARIABLE_DATA_MISSING: {
                    'MSG_CODE': 10000980,
                    'MSG': 'Whatsapp Template variable data missing'
                },
                NO_CONTACTS_DATA_AVAILABLE: {
                    'MSG_CODE': 10000990,
                    'MSG': 'No contacts data available'
                },
                WHATSAPP_CONTACT_QUERY_ERROR: {
                    'MSG_CODE': 10001000,
                    'MSG': 'Some error occurred'
                },
                INVALID_WHATSAPP_CONTACT: {
                    'MSG_CODE': 10001010,
                    'MSG': 'Invalid whatsapp contact'
                },
                MESSAGE_SENDING_LIMIT_REACHED: {
                    'MSG_CODE': 10001020,
                    'MSG': 'Message Sending Limit Reached'
                },
                WHATSAPP_USER_LIMIT_REACHED: {
                    'MSG_CODE': 10001030,
                    'MSG': 'Tier specific user limit reached'
                },

                MISSING_JSON: {
                    'MSG_CODE': 10001040,
                    'MSG': 'Missing JSON in request'
                },

                MISSING_USERNAME: {
                    'MSG_CODE': 10001050,
                    'MSG': 'Missing username parameter'
                },

                MISSING_PASSWORD: {
                    'MSG_CODE': 10001060,
                    'MSG': 'Missing password parameter'
                },

                BAD_USERNAME_OR_PASSWORD: {
                    'MSG_CODE': 10001070,
                    'MSG': 'Bad username or password'
                },

                NER_TAGS_NOT_FOUND: {
                    'MSG_CODE': 10001080,
                    'MSG': 'No ner tags found'
                },

                QUESTION_EDIT_FAILED: {
                    'MSG_CODE': 10001090,
                    'MSG': 'Failed to edit question pair(s)'
                },

                WHATSAPP_NUMBER_NONE: {
                    'MSG_CODE': 10001100,
                    'MSG': 'whatsapp number cannot be none'
                },

                WHATSAPP_MEDIA_SEND_FAILURE: {
                    'MSG_CODE': 10001110,
                    'MSG': 'Whatsapp media send failure'
                },

                TEXT_IS_NONE: {
                    'MSG_CODE': 10001120,
                    'MSG': 'text field is none'
                },

                MISSING_MEDIA_INFORMATION: {
                    'MSG_CODE': 10001130,
                    'MSG': 'missing media information'
                },

                EMPTY_CONTACT_LIST: {
                    'MSG_CODE': 10001140,
                    'MSG': 'Contacts list is empty'
                },
                FAILED_WHATSAPP_PROFILE_PHOTO_REMOVAL: {
                    'MSG_CODE': 10001150,
                    'MSG': 'Failed to remove whatsapp profile photo'
                },
                PENDING_WHATSAPP_PROFILE_PHOTO_UPDATION: {
                    'MSG_CODE': 10001160,
                    'MSG': 'Cannot update photo yet'
                },
                WHATSAPP_PHOTO_UPDATION_FAILED: {
                    'MSG_CODE': 10001170,
                    'MSG': 'Photo updating unsuccessful'
                },
                MISSING_COUNTRY_INFORMATION: {
                    'MSG_CODE': 10001180,
                    'MSG': 'missing country inforamtion'
                },
                PRICING_INFORMATION_UNAVAILABLE: {
                    'MSG_CODE': 10001190,
                    'MSG': 'Pricing information unavailable'
                },
                WHATSAPP_DETAILS_NOT_FOUND: {
                    'MSG_CODE': 10001200,
                    'MSG': 'whatsapp details not found'
                },
                INCORRECT_INPUT_DATA: {
                    'MSG_CODE': 10001210,
                    'MSG': 'Incorrect input data'
                },
                INSUFFICIENT_WHATSAPP_METRICS_DATA: {
                    'MSG_CODE': 10001220,
                    'MSG': 'Insufficient whatsapp metric data to show'
                },
                VERIFICATION_FAILED: {
                    'MSG_CODE': 10001230,
                    'MSG': 'Verification failed'
                },
                DATA_AVAILABLE: {
                    'MSG_CODE': 10000001,
                    'MSG': 'DATA AVAILABLE'
                },

                INTENT_ADD_0008: {
                    'MSG_CODE': 10000011,
                    'MSG': "Intent have been added successfully"
                },

                ADDED_SUCCESSFULLY_0002: {
                    'MSG_CODE': 10000021,
                    'MSG': "Added Successfully"
                },
                DELETED_SUCCESSFULLY_0004: {
                    'MSG_CODE': 10000031,
                    'MSG': "Deleted Successfully"
                },

                REGISTER_SUBJECT: {
                    'MSG_CODE': 10000041,
                    'MSG': "Email Verification for Cense Assistant"
                },
                FILE_UPLOADED: {
                    'MSG_CODE': 10000051,
                    'MSG': 'file uploaded successfully'
                },

                NEW_COMPANY_REGISTERED_SUCCESS_1000: {
                    'MSG_CODE': 10000061,
                    'MSG': "New company has been registered!"
                },
                NEW_COMPANY_EMAIL_NOTIFICATION_BODY_1002: {
                    'MSG_CODE': 10000071,
                    'MSG': "? company has been registered in our chatbot portal site. Please login in with your credentials to approve the registration of this company."
                },
                NEW_COMPANY_EMAIL_NOTIFICATION_SUBJECT_1004: {
                    'MSG_CODE': 10000081,
                    'MSG': "Accept/Decline approval of your registration with chatbot portal"
                },
                SUPER_ADMIN_NOTIFICATION_1006: {
                    'MSG_CODE': 10000091,
                    'MSG': "Company Train Model Request"
                },
                REGISTRATION_APPROVAL_EMAIL_BODY_1008: {
                    'MSG_CODE': 10000101,
                    'MSG': "Your registration request has been approved by the admin. You can now use the chatbot portal."
                },

                EMAIL_SENT_1010: {
                    'MSG_CODE': 10000111,
                    'MSG': "A mail has been sent to your email"
                },
                REGISTRATION_SUCCESSFUL_1012: {
                    'MSG_CODE': 10000121,
                    'MSG': "Registration Successful"
                },
                EMAIL_VERIFICATION_SUCCESSFUL_1016: {
                    'MSG_CODE': 10000131,
                    'MSG': "Email verification successful"
                },
                PASSWORD_RESET_SUCCESSFUL_1028: {
                    'MSG_CODE': 10000141,
                    'MSG': "Password Reset"
                },
                USER_LOGGED_OUT_1032: {
                    'MSG_CODE': 10000151,
                    'MSG': "sign out"
                },

                EMAIL_TEMPLATE_ADDED_SUCCESSFULLY_2000: {
                    'MSG_CODE': 10000161,
                    'MSG': "template added successfully"
                },
                USER_ROLE_SET_SUCCESSFULLY_2002: {
                    'MSG_CODE': 10000171,
                    'MSG': "User Role Set"
                },
                USER_ROLE_EDITED_SUCCESSFULLY_2002: {
                    'MSG_CODE': 10000181,
                    'MSG': "User Role Edited"
                },
                USER_ROLES_DELETED_SUCCESSFULLY_2002: {
                    'MSG_CODE': 10000191,
                    'MSG': "User Roles Deleted"
                },
                NEW_USER_REGISTERED_SUCCESS_2004: {
                    'MSG_CODE': 10000201,
                    'MSG': "New user added"
                },
                ADD_CONFIGURING_API_JSON_SUCCESS_2006: {
                    'MSG_CODE': 10000211,
                    'MSG': "Json updated"
                },
                ADD_CONFIGURING_API_URL_SUCCESS_2008: {
                    'MSG_CODE': 10000221,
                    'MSG': "Urls added"
                },
                CONTACT_EDIT_SUCCESS: {
                    'MSG_CODE': 10000231,
                    'MSG': "Contact Updated"
                },
                CONTACTS_DELETED_SUCCESS: {
                    'MSG_CODE': 10000241,
                    'MSG': "CONTACTS DELETED"
                },
                SOCIAL_MEDIA_SETTING_ADDED: {
                    'MSG_CODE': 10000251,
                    'MSG': "Social media settings added"
                },
                SOCIAL_MEDIA_SETTING_UPDATED: {
                    'MSG_CODE': 10000261,
                    'MSG': "Social media settings edited"
                },
                SOCIAL_MEDIA_SETTING_DELETED: {
                    'MSG_CODE': 10000271,
                    'MSG': "Social media settings deleted"
                },

                INTENT_ADDED_SUCCESSFULLY_4000: {
                    'MSG_CODE': 10000281,
                    'MSG': "Intent added successfully"
                },

                QUESTION_DELETED_SUCCESSFULLY_4002: {
                    'MSG_CODE': 10000291,
                    'MSG': "Question deleted successfully"
                },
                ACTION_DETAILS_SAVED_SUCCESSFULLY: {
                    'MSG_CODE': 10000301,
                    'MSG': "ACTION ADDED SUCCESSFULLY"
                },

                INTENT_EDIT_SUCCESS_3000: {
                    'MSG_CODE': 10000311,
                    'MSG': "Intent Updated"
                },
                INTENTS_DELETED_SUCCESS: {
                    'MSG_CODE': 10000321,
                    'MSG': "INTENTS DELETED"
                },

                SUCCESSFUL_DB_QUERY: {
                    'MSG_CODE': 10000331,
                    'MSG': 'Query Executed Successfully'
                },

                FORGOT_PASSWORD_SUBJECT: {
                    'MSG_CODE': 10000341,
                    'MSG': 'Forgot Password Link'
                },

                TRAINING_EMAIL: {
                    'MSG_CODE': 10000351,
                    'MSG': 'After successful model training we will send you an email'
                },

                MODEL_TRAINING_EMAIL_SUBJECT: {
                    'MSG_CODE': 10000361,
                    'MSG': 'Completion of model training notification'
                },

                MODEL_TRAINING_EMAIL_BODY: {
                    'MSG_CODE': 10000371,
                    'MSG': 'Your model training has been completed now. You can use this model to recognize intent which has accuracy'
                },

                SESSION_TOKEN_VALID: {
                    'MSG_CODE': 10000381,
                    'MSG': 'Session token valid'
                },
                EMAIL_TEMPLATE_NAME: {
                    'MSG_CODE': 10000391,
                    'MSG': 'Emotion Template'
                },

                EMAIL_TEMPLATE_SUBJECT: {
                    'MSG_CODE': 10000401,
                    'MSG': 'Frustated Client Support'
                },

                EMAIL_TEMPLATE_BODY: {
                    'MSG_CODE': 10000411,
                    'MSG': 'This <<user_name>> user has been frusted with some of queries.please get in touch with them asap'
                },

                EMAIL_SENT_SUCCESSFULLY: {
                    'MSG_CODE': 10000421,
                    'MSG': 'Email sent successfully'
                },
                PARTNER_EMAIL_SUB: {
                    'MSG_CODE': 10000431,
                    'MSG': 'Invitation link for cense chatbot'
                },
                PARTNER_EMAIL_BODY: {
                    'MSG_CODE': 10000441,
                    'MSG': 'Please accept this following link to register with one of the AI chatbot powered by Cense'

                },

                BLOG_MSG: {
                    'MSG_CODE': 10000451,
                    'MSG': 'blog added'
                },

                ADDED_SUPPORT_CONTACTS_SUCCESS_2012: {
                    'MSG_CODE': 10000461,
                    'MSG': 'Contacts added successfully'
                },
                SUPPORT_CONTACTS_EDITED_SUCCESS_4020: {
                    'MSG_CODE': 10000471,
                    'MSG': 'Contact Updated Successfully'
                },
                ADDED_WIDGET_SETTINGS_SUCCESSFULLY_4018: {
                    'MSG_CODE': 10000481,
                    'MSG': 'Widget Settings added successfully'
                },

                BLOG_UPDATED: {

                    'MSG_CODE': 10000491,
                    'MSG': 'blog updated'
                },
                PROFILE_UPDATED: {
                    'MSG_CODE': 10000501,
                    'MSG': 'Profile Updated'
                },
                FILE_UPLOAD: {
                    'MSG_CODE': 10000511,
                    'MSG': 'file uploaded successfully'
                },
                TASK_ADDED_SUCCESSFULLY: {
                    'MSG_CODE': 10000521,
                    'MSG': 'Task Added'
                },
                TASK_EDITED_SUCCESSFULLY: {
                    'MSG_CODE': 10000531,
                    'MSG': 'Task Edit'
                },
                TASKS_DELETED_SUCCESSFULLY: {
                    'MSG_CODE': 10000541,
                    'MSG': 'Task(s) Deleted'
                },
                API_ACCESS_TOKEN_UPDATED_SUCCESSFULLY_0010: {
                    'MSG_CODE': 10000551,
                    'MSG': 'Access Token Updated'
                },
                SESSION_DATA_STORED_SUCCESSFULLY_0008: {
                    'MSG_CODE': 10000561,
                    'MSG': 'Session Data Stored Successfully'
                },
                CALL_MESSAGES_UPDATED: {
                    'MSG_CODE': 10000571,
                    'MSG': 'Call Messages Updated'
                },
                CHAT_FAILURE_SETTINGS_UPDATED: {
                    'MSG_CODE': 10000581,
                    'MSG': 'Setting Updated'
                },

                SUCCESSFUL_TRANSACTION: {
                    'MSG_CODE': 10000591,
                    'MSG': 'Transaction Successful'
                },

                NER_TAG_STATUS: {
                    'MSG_CODE': 10000601,
                    'MSG': 'Ner Tag Completed'

                },

                NER_TAG_ASSIGN: {
                    'MSG_CODE': 10000611,
                    'MSG': 'Assign Ner Tag'
                },

                NER_TAG_ALL: {
                    'MSG_CODE': 10000621,
                    'MSG': 'All Ner Tags'
                },
                VALID_LICENSE_KEY: {
                    'MSG_CODE': 10000631,
                    'MSG': 'Valid license key'
                },

                NER_TAG_ADD: {
                    'MSG_CODE': 10000641,
                    'MSG': 'Ner Tag Added Successfully'
                },

                SUBSCRIPTION_EXIST: {
                    'MSG_CODE': 10000651,
                    'MSG': 'Subscription Available'
                },
                AGENT_RELOADED: {
                    'MSG_CODE': 10000661,
                    'MSG': 'Agent reloaded successfully!'
                },
                EDIT_QUESTION_INTENT: {
                    'MSG_CODE': 10000671,
                    'MSG': 'Question Intent Updated'
                },
                CORE_MODEL_IS_BEING_TRAINED: {
                    'MSG_CODE': 10000681,
                    'MSG': "The model will be trained and the report will be sent to the Admin Email address."
                },
                INTENT_MODEL_BEING_TRAINED: {
                    'MSG_CODE': 10000691,
                    'MSG': "Intent Model Is Being Trained"
                },
                NER_MODEL_IS_BEING_TRAINED: {
                    'MSG_CODE': 10000701,
                    'MSG': "NER Model is being trained"
                },

                ACCOUNT_DETAILS_INSERT: {
                    'MSG_CODE': 10000711,
                    'MSG': 'Account Details Inserted'
                },

                ACCOUNT_DETAILS_UPDATE: {
                    'MSG_CODE': 10000721,
                    'MSG': 'Account Details Updated'
                },

                UPDATE_SCHEDULING_INFO: {
                    'MSG_CODE': 10000731,
                    'MSG': 'Scheduling info updated'
                },

                APPOINTMENT_ADDED: {
                    'MSG_CODE': 10000741,
                    'MSG': 'Appointment Added Successfully'
                },

                APPOINTMENT_EDITED: {
                    'MSG_CODE': 10000751,
                    'MSG': 'Appointment Edited Successfully'
                },

                PHOTO_UPLOAD: {
                    'MSG_CODE': 10000761,
                    'MSG': 'Photo Uploaded Successfully'
                },

                PRODUCT_CSV_UPLOADED: {
                    'MSG_CODE': 10000771,
                    'MSG': 'File Uploaded Successfully'
                },

                PRODUCT_DELETED: {
                    'MSG_CODE': 10000781,
                    'MSG': 'Products Deleted Successfully'
                },
                EDIT_PRODUCT_CSV: {
                    'MSG_CODE': 10000791,
                    'MSG': 'Changes Applied Successfully'
                },

                NO_PRODUCTS_ADDED: {
                    'MSG_CODE': 10000801,
                    'MSG': 'No Products Added Yet'
                },

                PRODUCT_ADDED: {
                    'MSG_CODE': 10000811,
                    'MSG': 'Product Added Successfully'
                },

                USER_DETAILS_SAVED: {
                    'MSG_CODE': 10000821,
                    'MSG': 'Bot User Data Saved Successfully'
                },

                APPOINTMENT_RESCHEDULED: {
                    'MSG_CODE': 10000831,
                    'MSG': 'Appointment Rescheduled Successfully'
                },

                APPOINTMENT_REMINDER_SENT_SUCCESSFULLY: {
                    'MSG_CODE': 10000841,
                    'MSG': 'Reminder Sent Successfully'
                },

                SCHEDULING_LINK_VALIDATED: {
                    'MSG_CODE': 10000851,
                    'MSG': 'Valid Link'
                },

                APPOINTMENT_CONFIRMED: {
                    'MSG_CODE': 10000861,
                    'MSG': 'Appointment Confirmed Successfully'
                },

                VISIT_STATUS_EDITED: {
                    'MSG_CODE': 10000871,
                    'MSG': 'Visit Status Edited'
                },
                DATA_SOURCE_PROCESSED_AND_STORED_IN_ELASTIC_SEARCH: {
                    'MSG_CODE': 10000881,
                    'MSG': 'Data Source Processed And Stored In Elastic Search'
                },
                EDITED_SUCCESSFULLY_0005: {
                    'MSG_CODE': 10000891,
                    'MSG': "Edited Successfully"
                },
                SENDING_EMAIL: {
                    'MSG_CODE': 10000901,
                    'MSG': 'Sending Email'
                },
                SENDING_SMS: {
                    'MSG_CODE': 10000911,
                    'MSG': 'Sending Sms'
                },
                FEEDBACK_ADDED_SUCCESSFULLY_1080: {
                    'MSG_CODE': 10000921,
                    'MSG': 'Feedback sent Successfully'
                },
                SHOPIFY_CREDENTIALS_OK: {
                    'MSG_CODE': 10000931,
                    'MSG': 'Shopify credentials ok'
                },
                WOOCOMMERCE_CREDENTIALS_OK: {
                    'MSG_CODE': 10000941,
                    'MSG': 'Woocommerce credentials ok'
                },
                MAGENTO_CREDENTIALS_OK: {
                    'MSG_CODE': 10000951,
                    'MSG': 'Magento credentials ok'
                },
                BIGCOMMERCE_CREDENTIALS_OK: {
                    'MSG_CODE': 10000961,
                    'MSG': 'Bigcommerce credentials ok'
                },
                TICKET_UPDATED: {
                    'MSG_CODE': 10000971,
                    'MSG': 'Ticket Updated'
                },
                TICKET_CREATED: {
                    'MSG_CODE': 10000981,
                    'MSG': 'Ticket Created'
                },

                DATA_NOT_FOUND: {
                    'MSG_CODE': 10000991,
                    'MSG': 'Data not found'
                },
                WHATSAPP_TEMPLATE_NAME_DOES_NOT_EXISTS: {
                    'MSG_CODE': 10001001,
                    'MSG': 'Whatsapp Template Name does not exists'
                },

                WHATSAPP_CONTACT_ADDED_SUCCESSFULLY: {
                    'MSG_CODE': 10001011,
                    'MSG': 'Whatsapp Contact Added Successfully'
                },

                WHATSAPP_METRICS_DATA_NOT_FOUND: {
                    'MSG_CODE': 10001021,
                    'MSG': 'No whatsapp metrics data available'
                },
                LANGUAGE_UPDATED: {
                    'MSG_CODE': 10001031,
                    'MSG': 'Bot Language Updated'
                },
                
                PARTIAL_DELETED_USER_ROLES: {
                    'MSG_CODE': 10001250,
                    'MSG': 'unsuccessful deletion of all roles'
                },

                HEALTH_CHECK: {
                    'MSG_CODE': 10001041,
                    'MSG': 'health check successful'
                },

                ACCESS_TOKEN_REVOKED: {
                    'MSG_CODE': 10001051,
                    'MSG': 'Access token has been revoked'
                },

                NO_DATA_AVAILABLE: {
                    'MSG_CODE': 10001061,
                    'MSG': 'NO DATA AVAILABLE TO SHOW'
                },

                CONTACTS_NOT_FOUND: {
                    'MSG_CODE': 10001071,
                    'MSG': 'No contacts found'
                },

                WHATSAPP_CONTACT_ALREADY_EXIST: {
                    'MSG_CODE': 10001081,
                    'MSG': 'contact already exists'
                },

                WHATSAPP_MEDIA_SEND_SUCCESSFULLY: {
                    'MSG_CODE': 10001091,
                    'MSG': 'Whatsapp media sent successfully'
                },

                WHATSAPP_TEXT_SEND_SUCCESSFULLY: {
                    'MSG_CODE': 10001101,
                    'MSG': 'Whatsapp message sent successfully'
                },

                SENDING_TEMPLATE: {
                    'MSG_CODE': 10001111,
                    'MSG': 'template is being sent'
                },

                WHATSAPP_PROFILE_PHOTO_REMOVED: {
                    'MSG_CODE': 10001121,
                    'MSG': 'Whatsapp profile photo removed'
                },

                UPDATED_WHATSAPP_PROFILE_PHOTO: {
                    'MSG_CODE': 10001131,
                    'MSG': 'Photo updating successful'
                },

                WHATSAPP_PROFILE_EDIT_SUCCESSFUL: {
                    'MSG_CODE': 10001141,
                    'MSG': 'whatsapp profile edited successfully'
                },
                WHATSAPP_PROFILE_EDIT_UNSUCCESSFUL: {
                    'MSG_CODE': 10001240,
                    'MSG': 'whatsapp profile edit unsuccessful'
                },
                PARTIAL_DELETED_CONTACTS: {
                    'MSG_CODE': 10001270,
                    'MSG': 'unsuccessful deletion of all contacts'
                },
                INVALID_CONTACT_NUMBER: {
                    'MSG_CODE': 10001260,
                    'MSG': 'Invalid contact number'
                },
                PARTIAL_DELETED_USER_ROLES: {
                    'MSG_CODE': 10001250,
                    'MSG': 'unsuccessful deletion of all roles'
                },
                MISSING_SEARCH_KEY: {
                    'MSG_CODE': 10001280,
                    'MSG': 'Search key required'
                },
                NO_EXISTING_TICKET: {
                    'MSG_CODE': 10001151,
                    'MSG': "no existing ticket found"
                },
                NO_SOCIAL_NETWORK_SELECTED: {
                    "MSG_CODE": 10000910,
                    "MSG": "No Social Network Selected"
                },
                APP_SUMO_CODE_INVALID: {
                    'MSG_CODE': 10001300,
                    'MSG': 'invalid code'
                },
                APP_SUMO_CODE_EXPIRED: {
                    'MSG_CODE': 10001310,
                    'MSG': 'expired code'
                },
                APP_SUMO_VALID_CODE: {
                    'MSG_CODE': 10001191,
                    'MSG': 'valid code'
                },
                CONTACT_ADD_SUCCESS: {
                    'MSG_CODE': 10001161,
                    'MSG': 'contact info added'
                },
                STATUS_SUCCESS: {
                    'MSG_CODE': 10001171,
                    'MSG': "Success"
                },
                STATUS_FAILURE: {
                    'MSG_CODE': 10001290,
                    'MSG': 'Failure'
                },
                CALL_INCOMING: {
                    'MSG_CODE': 10001181,
                    'MSG': 'Call incoming!'
                },
                UNSUCCESSFUL_TRANSACTION: {
                    'MSG_CODE': 10001330,
                    "MSG": 'Transaction Unsuccessful'
                },
                LOGIN_SUCCESSFUL: {
                    'MSG_CODE': 10001201,
                    'MSG': 'Login successful'
                },
                SUCCESSFULLY_REFRESHED_ACCESS_TOKEN: {
                    'MSG_CODE': 10001211,
                    'MSG': 'successfully refreshed access token'
                },
                APP_SUMO_CODE_USED: {
                    'MSG_CODE': 10001320,
                    'MSG': 'used code'
                },
                USER_IS_LOCKED: {
                    'MSG_CODE': 10001330,
                    'MSG': "User Is Locked"
                },
                UNSUCCESSFUL_TRANSACTION: {
                    'MSG_CODE': 10001340,
                    "MSG": 'Transaction Unsuccessful'
                },
                SUBSCRIPTION_VERIFICATION_FAILURE: {
                    'MSG_CODE': 10001350,
                    'MSG': 'Error Occurred while verifying subscription'
                },
                ORDER_ID_CREATION_ERROR: {
                    'MSG_CODE': 10001360,
                    'MSG': 'Error Occurred while creating order id'
                },
                SUBSCRIPTION_CREATION_ERROR: {
                    'MSG_CODE': 10001370,
                    'MSG': 'Error Occurred while creating subscription'
                },
                CUSTOMER_CREATION_ERROR: {
                    'MSG_CODE': 10001380,
                    'MSG': 'Error Occurred while creating customer'
                },
                SUBSCRIPTION_CANCELING_ERROR: {
                    'MSG_CODE': 10001390,
                    'MSG': 'Error Occurred while cancelling subscription'
                },
                SUCCESSFULLY_REFRESHED_ACCESS_TOKEN: {
                    'MSG_CODE': 10001211,
                    'MSG': 'successfully refreshed access token'
                },
                SUBSCRIPTION_PLAN_NOT_FOUND: {
                    'MSG_CODE': 10001221,
                    'MSG': 'No Active Subscription plan found'
                },
                SUBSCRIPTION_VERIFICATION_SUCCESS: {
                    'MSG_CODE': 10001231,
                    'MSG': 'Subscription verification success'
                },
                CUSTOMER_ALREADY_EXIST: {
                    'MSG_CODE': 10001241,
                    'MSG': 'Customer already exist error'
                },
                SUBSCRIPTION_CANCEL_SUCCESS: {
                    'MSG_CODE': 10001251,
                    'MSG': 'Subscription cancelled'
                },
                SUBSCRIPTION_GET_ERROR: {
                    'MSG_CODE': 10001400,
                    'MSG': 'Error Occurred while getting subscription details'
                },
                FACEBOOK_ID_NOT_FOUND: {
                    'MSG_CODE': 10001261,
                    'MSG': 'facebook_id not found'
                },
                FACEBOOK_DETAILS_NOT_FOUND: {
                    'MSG_CODE': 10001271,
                    'MSG': 'facebook_details not found'
                },
                OLD_PASSWORD_NOT_MATCH: {
                    'MSG_CODE': 10001500,
                    'MSG': "OLD PASSWORD DOESN'T MATCH"
                },
                NO_MATCH_FOR_CHANNEL: {
                    'MSG_CODE': 10001410,
                    'MSG': "No match for any channel"
                },
                DOMAIN_LIST_SENT: {
                    'MSG_CODE': 10001281,
                    'MSG': 'successfully sent domain list'
                },
                THIRD_PARTY_INTEGRATION_NOT_FOUND: {
                    'MSG_CODE': 10001420,
                    'MSG': "Third party integrations not found"
                },
                NO_CASE_MATCH_FOR_CHANNEL: {
                    'MSG_CODE': 10001430,
                    'MSG': "no case match for channel"
                },
                COMPANY_NOT_FOUND: {
                    'MSG_CODE': 10001440,
                    'MSG': "Company not found"
                },
                BILLING_CHART: {
                    'MSG_CODE': 10001291,
                    'MSG': 'Billing Chart'
                },
                CUSTOMER_REVIEW_AVAILABLE: {
                    'MSG_CODE': 10001301,
                    'MSG': 'Customer Reviews Available'
                },
                IMAGE_RECEIVED_SUCCESSFULLY: {
                    'MSG_CODE': 10001311,
                    'MSG': 'Image Received Successfully'
                },
                SHOW_LIST: {
                    'MSG_CODE': 10001321,
                    'MSG': 'show list'
                },
                IMAGE_NOT_FOUND: {
                    'MSG_CODE': 10001460,
                    'MSG': "Image not found"
                },
                REVIEW_SAVED_SUCCESSFULLY: {
                    'MSG_CODE': 10001331,
                    'MSG': 'Review Saved Successfully'
                },
                REVIEW_NOT_SAVED: {
                    'MSG_CODE': 10001470,
                    'MSG': "Review Not Saved Successfully"
                },
                UPDATING_STORE_DATA: {
                    'MSG_CODE': 10001341,
                    'MSG': 'Updating Store Data'
                },
                COMPANY_LOGO_UPDATED: {
                    'MSG_CODE': 10001351,
                    'MSG': 'Company Logo Uploaded Successfully'
                },
                COMPANY_IMAGE_URL_RECEIVED: {
                    'MSG_CODE': 10001361,
                    'MSG': 'Company Image URL Received Successfully'
                },
                COMPANY_IMAGE_NOT_UPLOADED: {
                    'MSG_CODE': 10001480,
                    'MSG': "Company Image is not  Uploaded"
                },
                EMAIL_NOT_CONFIGURED: {
                    'MSG_CODE': 10001490,
                    'MSG': "EMAIL NOT FOUND OR NOT CONFIGURED"
                },
                COMPANY_ACTION_STATS: {
                    'MSG_CODE': 10001371,
                    'MSG': 'Company action stats fetched successfully'
                },
                COMPANY_ACTION_USERS: {
                    'MSG_CODE': 10001381,
                    'MSG': 'Company action users fetched successfully'
                },
                COMPANY_ACTION_USERS_CONVERSATIONS: {
                    'MSG_CODE': 10001391,
                    'MSG': 'Company action users conversations fetched successfully'
                },
                USERS_PROFILE_INFO: {
                    'MSG_CODE': 10001401,
                    'MSG': 'User profile info fetched successfully'
                },
                DASHBOARD_BOT_DETAILS : {
                    'MSG_CODE': 10001411,
                    'MSG': 'Dashboard bot details fetched successfully'
                },
                MAINTENANCE_CHECK:{
                    'MSG_CODE': 10001421,
                    'MSG': 'Maintenance check response'
                },
                SOME_ERROR_OCCURRED: {
                    'MSG_CODE': 10001510,
                    'MSG': 'Some error occurred'
                },
                COMPANY_ACTION_STATS: {
                    'MSG_CODE': 10001371,
                    'MSG': 'Company action stats fetched successfully'
                },
                COMPANY_ACTION_USERS: {
                    'MSG_CODE': 10001381,
                    'MSG': 'Company action users fetched successfully'
                },
                COMPANY_ACTION_USERS_CONVERSATIONS: {
                    'MSG_CODE': 10001391,
                    'MSG': 'Company action users conversations fetched successfully'
                },
                USERS_PROFILE_INFO: {
                    'MSG_CODE': 10001401,
                    'MSG': 'User profile info fetched successfully'
                },
                DASHBOARD_BOT_DETAILS: {
                    'MSG_CODE': 10001411,
                    'MSG': 'Dashboard bot details fetched successfully'
                },
                MAINTENANCE_CHECK: {
                    'MSG_CODE': 10001421,
                    'MSG': 'Maintenance check response'
                },
                SUCCESSFUL_DB_QUERY_MODELS : {
                    'MSG_CODE': 20000001,
                    'MSG': 'Query Executed Successfully'
                },
                ADDED_SUCCESSFULLY_0002_MODELS : {
                    'MSG_CODE': 20000011,
                    'MSG': "Added Successfully"
                },
                DELETED_SUCCESSFULLY_0004_MODELS : {
                    'MSG_CODE': 20000021,
                    'MSG': "Deleted Successfully"
                },
                INTENT_EDIT_SUCCESS_3000_MODELS : {
                    'MSG_CODE': 20000031,
                    'MSG': "Intent Updated"
                },
                INTENTS_DELETED_SUCCESS_MODELS : {
                    'MSG_CODE': 20000041,
                    'MSG': "INTENTS DELETED"
                },
                FILE_UPLOAD_MODELS : {
                    'MSG_CODE': 20000051,
                    'MSG': 'file uploaded successfully'
                },
                CORE_MODEL_IS_BEING_TRAINED_MODELS : {
                    'MSG_CODE': 20000061,
                    'MSG': "You are about to train the dialogue model and this might take some time. {} runs remaining out of {} allocated for this month."
                },
                CORE_MODEL_IS_BEING_TRAINED_PREMIUM_MODELS : {
                    'MSG_CODE': 20000071,
                    'MSG': "You are about to train the dialogue model and this might take some time."
                },
                INTENT_MODEL_BEING_TRAINED_MODELS : {
                    'MSG_CODE': 20000081,
                    'MSG': "You are about to train the intent model and this might take some time. {} runs remaining out of {} allocated for this month."
                },
                INTENT_MODEL_BEING_TRAINED_PREMIUM_MODELS : {
                    'MSG_CODE': 20000091,
                    'MSG': "You are about to train the intent model and this might take some time."
                },
                NER_MODEL_IS_BEING_TRAINED_MODELS : {
                    'MSG_CODE': 20000101,
                    'MSG': "You are about to train an NER model and this might take some time. {} runs remaining out of {} allocated for this month."
                },
                NER_MODEL_IS_BEING_TRAINED_PREMIUM_MODELS_MODELS : {
                    'MSG_CODE': 20000111,
                    'MSG': "You are about to train an NER model and this might take some time."
                },
                INTENT_AND_NER_MODEL_BEING_TRAINED_MODELS : {
                    'MSG_CODE': 20000121,
                    'MSG': "You are about to train the intent and ner models and this might take some time. {} runs remaining out of {} allocated for this month."
                },
                INTENT_AND_NER_MODEL_BEING_TRAINED_PREMIUM_MODELS : {
                    'MSG_CODE': 20000131,
                    'MSG': "You are about to train the intent and ner models and this might take some time."
                },
                INTENT_AND_CORE_MODEL_BEING_TRAINED_MODELS : {
                    'MSG_CODE': 20000141,
                    'MSG': "You are about to train the intent and dialogue models and this might take some time. {} runs remaining out of {} allocated for this month."
                },
                INTENT_AND_CORE_MODEL_BEING_TRAINED_PREMIUM_MODELS : {
                    'MSG_CODE': 20000151,
                    'MSG': "You are about to train the intent and dialogue models and this might take some time."
                },
                TASK_ADDED_SUCCESSFULLY_MODELS : {
                    'MSG_CODE': 20000161,
                    'MSG': 'Task Added'
                },
                TASK_EDITED_SUCCESSFULLY_MODELS : {
                    'MSG_CODE': 20000171,
                    'MSG': 'Task Edit'
                },
                TASKS_DELETED_SUCCESSFULLY_MODELS : {
                    'MSG_CODE': 20000181,
                    'MSG': 'Task(s) Deleted'
                },
                ADD_CONFIGURING_API_JSON_SUCCESS_2006_MODELS : {
                    'MSG_CODE': 20000191,
                    'MSG': "Json updated"
                },
                ADD_CONFIGURING_API_POST_METHOD_MODELS : {
                    'MSG_CODE': 20000201,
                    'MSG': "Post method api saved successfully"
                },
                ADD_CONFIGURING_API_URL_SUCCESS_2008_MODELS : {
                    'MSG_CODE': 20000211,
                    'MSG': "Urls added"
                },
                TASK_RECEIVED_SUCCESSFULLY_MODELS : {
                    'MSG_CODE': 20000221,
                    'MSG': 'Task Received successfully'
                },
                SUCCESSFULLY_UNSUBSCRIBED_MODELS : {
                    'MSG_CODE': 20000231,
                    'MSG': 'Successfully unsubscribed'
                },
                SENDING_EMAIL_MODELS : {
                    'MSG_CODE': 20000241,
                    'MSG': 'Sending Email'
                },
                SENDING_SMS_MODELS : {
                    'MSG_CODE': 20000251,
                    'MSG': 'Sending Sms'
                },
                FEEDBACK_ADDED_SUCCESSFULLY_1080_MODELS : {
                    'MSG_CODE': 20000261,
                    'MSG': 'Feedback sent Successfully'
                },
                INTENT_DETECTED_SUCCESSFULLY_MODELS : {
                    'MSG_CODE': 20000271,
                    'MSG': 'Intent Detected  Successfully'
                },
                SHOPIFY_PUBLIC_APP_INSTALLED_SUCCESSFULLY_MODELS : {
                    'MSG_CODE': 20000281,
                    'MSG': 'Intent Detected  Successfully'
                },
                SHOPIFY_WEBSITE_CODE_UPDATED_SUCCESSFULLY_MODELS : {
                    'MSG_CODE': 20000291,
                    'MSG': 'Website Code Updated Successfully'
                },
                INTENT_IN_DIALOG_EDITED_SUCCESSFULLY_MODELS : {
                    'MSG_CODE': 20000301,
                    'MSG': 'Intent used in dialog edited successfully'
                },
                BANNER_NAME_DOESNT_EXISTS_MODELS : {
                    'MSG_CODE': 20000311,
                    'MSG': 'Banner name does not exist'
                },
                SMS_TEMPLATE_NAME_DOES_NOT_EXISTS_MODELS : {
                    'MSG_CODE': 20000321,
                    'MSG': 'SMS Template Name does not exists'
                },
                DATA_AVAILABLE_MODELS : {
                    'MSG_CODE': 20000331,
                    'MSG': 'DATA AVAILABLE'
                },
                INTENT_NAME_NOT_EXISTS_MODELS : {
                    'MSG_CODE': 20000341,
                    'MSG': 'Not Exists'
                },
                TRAINED_INTENT_AND_INTENT_USED_IN_DIALOG_DELETED_SUCCESSFULLY_MODELS : {
                    'MSG_CODE': 20000351,
                    'MSG': "Intent(s) used in dialog, deleted successfully. Trained intent has been deleted. Please Train the Model Again to See Reflected Changes"
                },
                INTENT_DELETED_TRAIN_MODEL_MODELS : {
                    'MSG_CODE': 20000361,
                    'MSG': "Trained intent has been deleted. Please Train the Model Again to See Reflected Changes"
                },
                INTENT_USED_IN_DIALOG_DELETED_SUCCESSFULLY_MODELS : {
                    'MSG_CODE': 20000371,
                    'MSG': "Intent(s) used in dialog, deleted successfully. "
                },
                EMAIL_SMS_SENT_MODELS : {
                    'MSG_CODE': 20000381,
                    'MSG': "Email/SMS is being sent"
                },
                INTERNAL_SERVER_ERROR_MODELS : {
                    'MSG_CODE': 20000000,
                    'MSG': 'Internal Server Error'
                },
                EMPTY_DATA_MODELS : {
                    'MSG_CODE': 20000010,
                    'MSG': 'No Data Available'
                },
                UNSUCCESSFUL_DB_QUERY_MODELS : {
                    'MSG_CODE': 20000020,
                    'MSG': 'Query Executed UnSuccessfully'
                },
                UNSUCCESSFUL_DB_OPERATION_MODELS : {
                    'MSG_CODE': 20000030,
                    'MSG': 'DB OPERATION UNSUCCESSFUL'
                },
                ENDPOINT_LIMIT_MODELS : {
                    'MSG_CODE': 20000040,
                    'MSG': 'Endpoint limit exceed'
                },
                DUPLICATE_INTENT_4011_MODELS : {
                    'MSG_CODE': 20000050,
                    'MSG': "Intent already exist"
                },
                TRAINING_LIMIT_EXCEED_MODELS : {
                    'MSG_CODE': 20000060,
                    'MSG': 'You have run out of training runs for this month.'
                },
                NER_TAG_STATUS_MODELS : {
                    'MSG_CODE': 20000070,
                    'MSG': 'Ner Tag InCompleted'
                },
                NER_DATA_ABSENT_MODELS : {
                    'MSG_CODE': 20000080,
                    'MSG': 'There is no tagged NER data to train on!'
                },
                IMG_DUPLICATE_MODELS : {
                    'MSG_CODE': 20000090,
                    'MSG': 'Duplicate image'
                },
                INTENT_DELETING_DISABLED_MODELS : {
                    'MSG_CODE': 20000100,
                    'MSG': "Trained intent deletion is currently disabled!"
                },
                UPGRADE_PLAN_MODELS : {
                    'MSG_CODE': 20000110,
                    'MSG': "Please upgrade your plan"
                },
                INVALID_CREDENTIALS_0005_MODELS : {
                    'MSG_CODE': 20000120,
                    'MSG': 'Invalid Credentials'
                },
                TOKEN_INVALID_0001_MODELS : {
                    'MSG_CODE': 20000130,
                    'MSG': "token invalid"
                },
                ALREADY_SUBSCRIBED_TO_A_BOT_MODELS : {
                    'MSG_CODE':20000140,
                    'MSG':'ALREADY SUBSCRIBED TO A BOT'
                },
                BOT_TOKEN_INVALID_MODELS : {
                    'MSG_CODE': 20000150,
                    'MSG': 'Token is missing or invalid.Looks like there is no active session, can you please logout and login again.In case the issue still persists,please get in touch with admin '
                },
                USER_BLOCKED_1033_MODELS : {
                    'MSG_CODE': 20000160,
                    'MSG': "User Blocked"
                },
                LICENSE_KEY_INCORRECT_MODELS : {
                    "MSG_CODE": 20000170,
                    "MSG": "Licence key Incorrect"
                },
                INTENT_NOT_DETECTED_MODELS : {
                    "MSG_CODE": 20000180,
                    "MSG": "Intent for the question doesn't exists"
                },
                INVALID_FILE_TYPE_MODELS : {
                    "MSG_CODE": 20000190,
                    "MSG": "File type not supported"
                },
                INCORRECT_FILE_FORMAT_MODELS : {
                    "MSG_CODE": 20000200,
                    "MSG": "Incorrect file format"
                },
                SMS_LIMIT_EXCEEDED_MODELS : {
                    'MSG_CODE': 20000210,
                    'MSG': 'SMS limit exceeded'
                },
                NO_WEBHOOK_DATA_MODELS : {
                    'MSG_CODE': 20000220,
                    'MSG': 'No Webhook in database'
                },
                EMAIL_LIMIT_EXCEEDED_MODELS : {
                    'MSG_CODE': 20000230,
                    'MSG': 'Email sending limit exceeded'
                },
                NO_BANNER_DATA_MODELS : {
                    'MSG_CODE': 20000240,
                    'MSG': 'No Banner Template in database'
                },
                BANNER_NAME_EXISTS_MODELS : {
                    'MSG_CODE': 20000250,
                    'MSG': 'Banner name already exists'
                },
                REGEX_PATTERN_VALIDATION_MODELS : {
                    'MSG_CODE': 20000260,
                    'MSG': 'Invalid Regex pattern'
                },
                BANNER_LOCATION_INVALID_MODELS : {
                    'MSG_CODE': 20000270,
                    'MSG': 'please select proper location'
                },
                NO_DEFAULT_SMS_TEMPLATE_MODELS : {
                    'MSG_CODE': 20000280,
                    'MSG': 'No Default SMS Template in database'
                },
                NO_SMS_TEMPLATE_MODELS : {
                    'MSG_CODE': 20000290,
                    'MSG': 'No SMS Template in database'
                },
                SMS_TEMPLATE_NAME_EXISTS_MODELS : {
                    'MSG_CODE': 20000300,
                    'MSG': 'SMS Template Name Already Exists'
                },
                NO_CUSTOMER_DATA_AVAILABLE_MODELS : {
                    'MSG_CODE': 20000310,
                    'MSG': 'No customer data available'
                },
                SMS_TEMPLATE_NOT_FOUND_MODELS : {
                    'MSG_CODE': 20000320,
                    'MSG': 'Selected template not found in db'
                },
                SMS_BODY_FORMATTING_FAILED_MODELS : {
                    'MSG_CODE': 20000330,
                    'MSG': 'Failed to format sms body'
                },
                NO_SLOTS_FOUND_MODELS : {
                    'MSG_CODE': 20000340,
                    'MSG': 'No slots found'
                },
                USER_DOES_NOT_EXIST_1027_MODELS : {
                    'MSG_CODE': 20000350,
                    'MSG': "User Doesn't Exist"
                },
                INVALID_COMPANY_AUTH_MODELS : {
                    'MSG_CODE': 20000360,
                    'MSG': "Company doesn't matches with the jwt claims"
                },
                INVALID_INTENT_LIST_FORMAT_MODELS : {
                    'MSG_CODE': 20000370,
                    'MSG': "Incorrect intent list format"
                },
                MISSING_API_CONFIGURATION_MESSAGE_MODELS : {
                    'MSG_CODE': 20000380,
                    'MSG': 'Please configure the APIs for your intents first!'
                },
                ENTITY_HAS_VALIDATION_MODELS : {
                    'MSG_CODE': 20000391,
                    'MSG': "Entity has validation"
                },
                ENTITY_HAS_NO_VALIDATION_MODELS : {
                    'MSG_CODE': 20000401,
                    'MSG': "Entity has no validation"
                },
                ENTITY_DATA_NOT_SAVED_MODELS : {
                    'MSG_CODE': 20000390,
                    'MSG': 'Entity Data Not Saved Successfully'
                },
                ENTITY_DATA_SAVED_MODELS : {
                    'MSG_CODE': 20000411,
                    'MSG': "Entity Data Saved Successfully"
                },
                ALREADY_EXISTS_MODELS : {
                    'MSG_CODE': 20000421,
                    'MSG': "Already Exists"
                },
                NOT_EXISTS_MODELS : {
                    'MSG_CODE': 20000431,
                    'MSG': "Not Exists"
                },
                USED_ENTITIES_DELETED_MODELS : {
                    'MSG_CODE': 20000441,
                    'MSG': "Used Entities Values Deleted Successfully"
                },
                CANNOT_SEND_EMAIL_FOR_TEMPLATE_MODELS : {
                    'MSG_CODE': 20000400,
                    'MSG': "Cannot send emails for this template type"
                },
                NO_EMAIL_FOUND_MODELS : {
                    'MSG_CODE': 20000410,
                    'MSG': "Found No emails"
                },
                STATUS_SUCCESS_MODELS : {
                    'MSG_CODE': 20000451,
                    'MSG': "Success"
                },
                TEMPLATE_DOES_NOT_EXISTS_MODELS : {
                    'MSG_CODE': 20000440,
                    'MSG': "Template Does not Exists"
                },
                UPGRADE_PLAN_TO_SEND_EMAIL_MODELS : {
                    'MSG_CODE': 20000420,
                    'MSG': "Please upgrade your plan to send emails"
                },
                LIMIT_REACHED_FOR_EMAIL_MODELS : {
                    'MSG_CODE': 20000430,
                    'MSG': "You have reached the Quota allotted for sending emails"
                },
                ENTITIES_DELETED_MODELS : {
                    'MSG_CODE': 20000461,
                    'MSG': "Entities Values Deleted Successfully"
                },
                SYNC_INPROGRESS_MODELS : {
                    'MSG_CODE': 20000471,
                    'MSG': 'Sync Inprogress'
                },
                INTEGRATION_DETAILS_NOT_FOUND_MODELS : {
                    'MSG_CODE': 20000450,
                    'MSG': 'No integrations found'
                },
                ENTITY_VALUES_NOT_FOUND_MODELS : {
                    'MSG_CODE': 20000460,
                    'MSG': 'Entity Values does not Exists'
                },
                TEMPLATE_SYNONYMS_UPDATED_SUCCESSFULLY_MODELS : {
                    'MSG_CODE': 20000481,
                    'MSG': 'Template Synonyms Updated'
                },
                INTENT_MODEL_FILE_NOT_FOUND_MODELS : {
                    'MSG_CODE': 20000470,
                    'MSG': 'Intent Model Files Not Found'
                },
                USED_ENTITIES_EDITED_MODELS : {
                    'MSG_CODE': 20000491,
                    'MSG': 'Used Entities Data Edited Successfully'
                },
                ENTITIES_EDITED_MODELS : {
                    'MSG_CODE': 20000501,
                    'MSG': 'Entities Data Edited Successfully'
                },
                STATUS_FAILURE_MODELS : {
                    'MSG_CODE': 20000480,
                    'MSG': 'Failure'
                },
                REVERT_SUCCESSFUL_MODELS : {
                    'MSG_CODE': 20000521,
                    'MSG': 'Revert Successful'
                },
                CHECK_BALANCE : {
                    'MSG_CODE': 10001431,
                    'MSG': 'Check balance response'
                },
                PRODUCT_DATA_INSERTED_SUCCESSFULLY_MODELS : {
                    'MSG_CODE': 20000541,
                    'MSG': 'product search List and Its values Inserted Successfully'
                },
                MODEL_UPDATED_MODELS : {
                    'MSG_CODE': 20000551,
                    'MSG': 'MODEL UPDATED'
                },
                INTENT_MODEL_UPDATED_MODELS : {
                    'MSG_CODE': 20000561,
                    'MSG': 'Intent Model Updated'
                },
                NER_MODEL_UPDATED_MODELS : {
                    'MSG_CODE': 20000571,
                    'MSG': 'NER Model Updated'
                },
                placeholder_CORE : {
                    'MSG_CODE': 30000000,
                    'MSG': ""
                },
                STATUS_FAILURE_CORE : {
                    'MSG_CODE': 30000010,
                    'MSG': "Failure"
                },
                TOKEN_INVALID_0001_CORE : {
                    'MSG_CODE': 30000020,
                    'MSG': "token invalid"
                },
                ADDED_UNSUCCESSFULLY_0003_CORE : {
                    'MSG_CODE': 30000030,
                    'MSG': "Already exists"
                },
                DOCUMENT_DOESNT_EXIST_CORE : {
                    'MSG_CODE': 30000040,
                    'MSG': "The document you are trying to read/edit doesn't exist"
                },
                CLOSED_FORM_BOT_DOESNT_EXIST_CORE : {
                    'MSG_CODE': 30000050,
                    'MSG': "NO CLOSED FORM BOT"
                },
                WRONG_BUCKET_CREDS_CORE : {
                    'MSG_CODE': 30000060,
                    'MSG': 'WRONG BUCKET CREDENTIALS'
                },
                BUCKET_CREDS_NOT_ADDED_CORE : {
                    'MSG_CODE': 30000070,
                    'MSG': 'BUCKET CREDS NOT ADDED'
                },
                DISALLOWED_FILE_EXTENSION_CORE : {
                    'MSG_CODE': 30000080,
                    'MSG': 'FILE EXTENSION DISALLOWED'
                },
                REGISTRATION_UNSUCCESSFUL_1013_CORE : {
                    'MSG_CODE': 30000090,
                    'MSG': "Registration Unsuccessful"
                },
                DUPLICATE_EMAIL_1015_CORE : {
                    'MSG_CODE': 30000100,
                    'MSG': "This email is a duplicate."
                },
                EMAIL_VERIFICATION_UNSUCCESSFUL_1017_CORE : {
                    'MSG_CODE': 30000110,
                    'MSG': "Email already verified"
                },
                USER_NOT_APPROVED_1019_CORE : {
                    'MSG_CODE': 30000120,
                    'MSG': "User has not been approved yet."
                },
                USER_ALREADY_LOGGED_IN_1021_CORE : {
                    'MSG_CODE': 30000130,
                    'MSG': "You are already logged in!"
                },
                EMAIL_NOT_VERIFIED_1023_CORE : {
                    'MSG_CODE': 30000140,
                    'MSG': "Email hasn't been verified."
                },
                EMAIL_DOES_NOT_EXIST_1025_CORE : {
                    'MSG_CODE': 30000150,
                    'MSG': "Please make sure you have entered a registered email address"
                },
                USER_DOES_NOT_EXIST_1027_CORE : {
                    'MSG_CODE': 30000160,
                    'MSG': "User Doesn't Exist"
                },
                PASSWORD_RESET_LINK_EXPIRED_1029_CORE : {
                    'MSG_CODE': 30000170,
                    'MSG': "The link you used has expired"
                },
                PASSWORD_INCORRECT_1031_CORE : {
                    'MSG_CODE': 30000180,
                    'MSG': "Password Incorrect"
                },
                USER_BLOCKED_1033_CORE : {
                    'MSG_CODE': 30000190,
                    'MSG': "User Blocked"
                },
                EMAIL_TEMPLATE_EXISTS_2001_CORE : {
                    'MSG_CODE': 30000200,
                    'MSG': ""
                },
                EMAIL_ALREADY_EXISTS_2005_CORE : {
                    'MSG_CODE': 30000210,
                    'MSG': "This email already exists!"
                },
                CONFIGURING_API_2011_CORE : {
                    'MSG_CODE': 30000220,
                    'MSG': "Already added"
                },
                CONTACT_DOESNT_EXIST_CORE : {
                    'MSG_CODE': 30000230,
                    'MSG': "CONTACT DOESN'T EXIST"
                },
                DUPLICATE_SUPPORT_CONTACT_CORE : {
                    'MSG_CODE': 30000240,
                    'MSG': "INSERT DUPLICATE CONTACT"
                },
                INVALID_CREDENTIALS_0005_CORE : {
                    'MSG_CODE': 30000250,
                    'MSG': 'Invalid Credentials'
                },
                QUESTION_COUNT_ALREADY_EXCEEDED_4005_CORE : {
                    'MSG_CODE': 30000260,
                    'MSG': "Question Limit Already Exceeded!"
                },
                QUESTION_COUNT_EXCEEDS_LIMIT_4007_CORE : {
                    'MSG_CODE': 30000270,
                    'MSG': "Limit Exceeded! Those questions exceeding the limit will not be recorded. Please upgrade your plans"
                },
                SUBSCRIPTION_INVALID_4009_CORE : {
                    'MSG_CODE': 30000280,
                    'MSG': "Subscription Type Error!"
                },
                DUPLICATE_INTENT_4011_CORE : {
                    'MSG_CODE': 30000290,
                    'MSG': "Intent already exist"
                },
                DUPLICATE_INTENT_PLUS_LIMIT_EXCEEDED_4013_CORE : {
                    'MSG_CODE': 30000300,
                    'MSG': "Questions with existing intents and those exceeding your limit have not been added!"
                },
                DUPLICATE_SESSION_TOKEN_CORE : {
                    'MSG_CODE': 30000310,
                    'MSG': "Duplicate session token"
                },
                INTENT_DOESNT_EXIST_CORE : {
                    'MSG_CODE': 30000320,
                    'MSG': "INTENT DOESN'T EXIST"
                },
                INTENT_EDIT_ALREADY_EXIST_CORE : {
                    'MSG_CODE': 30000330,
                    'MSG': "INTENT WITH NEW NAME ALREADY EXISTS"
                },
                INTENT_DELETING_DISABLED_CORE : {
                    'MSG_CODE': 30000340,
                    'MSG': "Trained intent deletion is currently disabled!"
                },
                UNSUCCESSFUL_DB_QUERY_CORE : {
                    'MSG_CODE': 30000350,
                    'MSG': 'Query Executed UnSuccessfully'
                },
                UNSUCCESSFUL_DB_OPERATION_CORE : {
                    'MSG_CODE': 30000360,
                    'MSG': 'DB OPERATION UNSUCCESSFUL'
                },
                cense_enquiry_msg_CORE : {
                    'MSG_CODE': 30000370,
                    'MSG': 'Sorry i am not getting your question.Do u want to talk with our support team'
                },
                BLOG_DUPLICATE_CORE : {
                    'MSG_CODE': 30000380,
                    'MSG': 'Duplicate Blog Name'
                },
                IMG_DUPLICATE_CORE : {
                    'MSG_CODE': 30000390,
                    'MSG': 'Duplicate image'
                },
                INTERNAL_SERVER_ERROR_CORE : {
                    'MSG_CODE': 30000400,
                    'MSG': 'Internal Server Error'
                },
                API_RATE_LIMIT_EXCEEDED_CORE : {
                    'MSG_CODE': 30000410,
                    'MSG': 'API LIMIT EXCEEDED'
                },
                USER_EXIST_CORE : {
                    'MSG_CODE': 30000420,
                    'MSG': 'USER EXIST'
                },
                UPLOAD_FILE_ERROR_CORE : {
                    'MSG_CODE': 30000430,
                    'MSG': 'Error while processing file'
                },
                NER_TAG_STATUS_CORE : {
                    'MSG_CODE': 30000440,
                    'MSG': 'Ner Tag InCompleted'
                },
                EMPTY_DATA_CORE : {
                    'MSG_CODE': 30000450,
                    'MSG': 'No Data Available'
                },
                WIDGET_NOT_AVAILABLE_CORE : {
                    'MSG_CODE': 30000460,
                    'MSG': 'Widget theme unavailable'
                },
                BOT_TOKEN_INVALID_CORE : {
                    'MSG_CODE': 30000470,
                    'MSG': 'Token is missing or invalid.Looks like there is no active session, can you please logout and login again.In case the issue still persists,please get in touch with admin'
                },
                INVALID_LICENSE_KEY_CORE : {
                    'MSG_CODE': 30000480,
                    'MSG': 'Invalid license key'
                },
                ENDPOINT_LIMIT_CORE : {
                    'MSG_CODE': 30000490,
                    'MSG': 'Endpoint limit exceed'
                },
                TRAINING_LIMIT_EXCEED_CORE : {
                    'MSG_CODE': 30000500,
                    'MSG': 'You have run out of training runs for this month.'
                },
                STORAGE_LIMIT_EXCEED_CORE : {
                    'MSG_CODE': 30000510,
                    'MSG': 'Storage limit exceed'
                },
                INVALID_HEADING_CORE : {
                    'MSG_CODE': 30000520,
                    'MSG': 'Invalid Header'
                },
                ERROR_UPLOAD_CORE : {
                    'MSG_CODE': 30000530,
                    'MSG': 'Error while uploading'
                },
                NER_DATA_ABSENT_CORE : {
                    'MSG_CODE': 30000540,
                    'MSG': 'There is no tagged NER data to train on!'
                },
                INVALID_CONTACT_NUMBER_CORE : {
                    'MSG_CODE': 30000550,
                    'MSG': 'Invalid contact number'
                },
                NO_PRODUCTS_FOUND_CORE : {
                    'MSG_CODE': 30000560,
                    'MSG': 'NO PRODUCTS FOUND'
                },
                PASSWORD_SIMILAR_CORE : {
                    'MSG_CODE': 30000570,
                    'MSG': 'Password is Similar'
                },
                RENEW_PASSWORD_CORE : {
                    'MSG_CODE': 30000580,
                    'MSG': 'Password should be Renewed'
                },
                APPOINTMENT_REMINDER_FAILED_CORE : {
                    'MSG_CODE': 30000590,
                    'MSG': 'Reminder Failed'
                },
                UPDATE_SCHEDULER_SETTINGS_CORE : {
                    'MSG_CODE': 30000600,
                    'MSG': 'Please update your scheduler settings'
                },
                LINK_EXPIRED_CORE : {
                    'MSG_CODE': 30000610,
                    'MSG': 'Link Expired'
                },
                SCHEDULING_TOKEN_INVALID_CORE : {
                    'MSG_CODE': 30000620,
                    'MSG': 'Token Invalid'
                },
                APPOINTMENT_CONFIRMATION_FAILED_CORE : {
                    'MSG_CODE': 30000630,
                    'MSG': 'Appointment Confirmation Failed',
                },
                APPOINTMENT_LINK_EXPIRED_CORE : {
                    'MSG_CODE': 30000640,
                    'MSG': 'Appointment Link Expired'
                },
                INVALID_OPERATION_CORE : {
                    'MSG_CODE': 30000650,
                    'MSG': 'INVALID OPERATION'
                },
                INVALID_JDBC_CONNECTION_STRING_CORE : {
                    'MSG_CODE': 30000660,
                    'MSG': 'INVALID JDBC CONNECTION STRING'
                },
                UNABLE_TO_CONNECT_TO_DB_CORE : {
                    'MSG_CODE': 30000670,
                    'MSG': 'UNABLE TO CONNECT TO DB'
                },
                FEEDBACK_ALREADY_EXISTS_CORE : {
                    'MSG_CODE': 30000680,
                    'MSG': "Feedback already Exists"
                },
                USER_ROLE_SET_ALREADY_EXISTS_2002_CORE : {
                    'MSG_CODE': 30000690,
                    'MSG': "User Role Exists"
                },
                INVALID_COMPANY_AUTH_CORE : {
                    'MSG_CODE': 30000700,
                    'MSG': "Company doesn't matches with the jwt claims"
                },
                MISSING_JSON_CORE : {
                    'MSG_CODE': 30000710,
                    'MSG': "Missing JSON in request"
                },
                MISSING_USERNAME_CORE : {
                    'MSG_CODE': 30000720,
                    'MSG': "Missing username parameter"
                },
                MISSING_PASSWORD_CORE : {
                    'MSG_CODE': 30000730,
                    'MSG': "Missing password parameter"
                },
                DATA_AVAILABLE_CORE: {
                    'MSG_CODE': 30000011,
                    'MSG': 'DATA AVAILABLE'
                },
                STATUS_SUCCESS_CORE: {
                    'MSG_CODE': 30000021,
                    'MSG': "Success"
                },
                INTENT_ADD_0008_CORE: {
                    'MSG_CODE': 30000031,
                    'MSG': "Intent have been added successfully"
                },
                ADDED_SUCCESSFULLY_0002_CORE: {
                    'MSG_CODE': 30000041,
                    'MSG': "Added Successfully"
                },
                DELETED_SUCCESSFULLY_0004_CORE: {
                    'MSG_CODE': 30000051,
                    'MSG': "Deleted Successfully"
                },
                REGISTER_SUBJECT_CORE: {
                    'MSG_CODE': 30000061,
                    'MSG': "Email Verification for chatbot portal"
                },
                FILE_UPLOADED_CORE: {
                    'MSG_CODE': 30000071,
                    'MSG': 'file uploaded successfully'
                },
                NEW_COMPANY_REGISTERED_SUCCESS_1000_CORE: {
                    'MSG_CODE': 30000081,
                    'MSG': "New company has been registered!"
                },
                NEW_COMPANY_EMAIL_NOTIFICATION_BODY_1002_CORE: {
                    'MSG_CODE': 30000091,
                    'MSG': "? company has been registered in our chatbot portal site. Please login in with your credentials to approve the registration of this company."
                },
                NEW_COMPANY_EMAIL_NOTIFICATION_SUBJECT_1004_CORE: {
                    'MSG_CODE': 30000101,
                    'MSG': "Accept/Decline approval of your registration with chatbot portal"
                },
                SUPER_ADMIN_NOTIFICATION_1006_CORE: {
                    'MSG_CODE': 30000111,
                    'MSG': "Company Train Model Request"
                },
                REGISTRATION_APPROVAL_EMAIL_BODY_1008_CORE: {
                    'MSG_CODE': 30000121,
                    'MSG': "Your registration request has been approved by the admin. You can now use the chatbot portal."
                },
                EMAIL_SENT_1010_CORE: {
                    'MSG_CODE': 30000131,
                    'MSG': "A mail has been sent to your email"
                },
                REGISTRATION_SUCCESSFUL_1012_CORE: {
                    'MSG_CODE': 30000141,
                    'MSG': "Registration Successful"
                },
                EMAIL_VERIFICATION_SUCCESSFUL_1016_CORE: {
                    'MSG_CODE': 30000151,
                    'MSG': "Email verification successful"
                },
                PASSWORD_RESET_SUCCESSFUL_1028_CORE: {
                    'MSG_CODE': 30000161,
                    'MSG': "Password Reset"
                },
                USER_LOGGED_OUT_1032_CORE: {
                    'MSG_CODE': 30000171,
                    'MSG': "sign out"
                },
                EMAIL_TEMPLATE_ADDED_SUCCESSFULLY_2000_CORE: {
                    'MSG_CODE': 30000181,
                    'MSG': "template added successfully"
                },
                USER_ROLE_SET_SUCCESSFULLY_2002_CORE: {
                    'MSG_CODE': 30000191,
                    'MSG': "User Role Set"
                },
                USER_ROLE_EDITED_SUCCESSFULLY_2002_CORE: {
                    'MSG_CODE': 30000201,
                    'MSG': "User Role Edited"
                },
                USER_ROLES_DELETED_SUCCESSFULLY_2002_CORE: {
                    'MSG_CODE': 30000211,
                    'MSG': "User Roles Deleted"
                },
                NEW_USER_REGISTERED_SUCCESS_2004_CORE: {
                    'MSG_CODE': 30000221,
                    'MSG': "New user added"
                },
                ADD_CONFIGURING_API_JSON_SUCCESS_2006_CORE: {
                    'MSG_CODE': 30000231,
                    'MSG': "Json updated"
                },
                ADD_CONFIGURING_API_URL_SUCCESS_2008_CORE: {
                    'MSG_CODE': 30000241,
                    'MSG': "Urls added"
                },
                CONTACT_EDIT_SUCCESS_CORE: {
                    'MSG_CODE': 30000251,
                    'MSG': "Contact Updated"
                },
                CONTACTS_DELETED_SUCCESS_CORE: {
                    'MSG_CODE': 30000261,
                    'MSG': "CONTACTS DELETED"
                },
                SOCIAL_MEDIA_SETTING_ADDED_CORE: {
                    'MSG_CODE': 30000271,
                    'MSG': "Social media settings added"
                },
                SOCIAL_MEDIA_SETTING_UPDATED_CORE: {
                    'MSG_CODE': 30000281,
                    'MSG': "Social media settings edited"
                },
                SOCIAL_MEDIA_SETTING_DELETED_CORE: {
                    'MSG_CODE': 30000291,
                    'MSG': "Social media settings deleted"
                },
                INTENT_ADDED_SUCCESSFULLY_4000_CORE: {
                    'MSG_CODE': 30000301,
                    'MSG': "Intent added successfully"
                },
                QUESTION_DELETED_SUCCESSFULLY_4002_CORE: {
                    'MSG_CODE': 30000311,
                    'MSG': "Question deleted successfully"
                },
                ACTION_DETAILS_SAVED_SUCCESSFULLY_CORE: {
                    'MSG_CODE': 30000321,
                    'MSG': "ACTION ADDED SUCCESSFULLY"
                },
                INTENT_EDIT_SUCCESS_3000_CORE: {
                    'MSG_CODE': 30000331,
                    'MSG': "Intent Updated"
                },
                INTENTS_DELETED_SUCCESS_CORE: {
                    'MSG_CODE': 30000341,
                    'MSG': "INTENTS DELETED"
                },
                SUCCESSFUL_DB_QUERY_CORE: {
                    'MSG_CODE': 30000351,
                    'MSG': 'Query Executed Successfully'
                },
                FORGOT_PASSWORD_SUBJECT_CORE: {
                    'MSG_CODE': 30000361,
                    'MSG': 'Forgot Password Link'
                },
                TRAINING_EMAIL_CORE: {
                    'MSG_CODE': 30000371,
                    'MSG': 'After successful model training we will send you an email'
                },
                MODEL_TRAINING_EMAIL_SUBJECT_CORE: {
                    'MSG_CODE': 30000381,
                    'MSG': 'Completion of model training notification'
                },
                MODEL_TRAINING_EMAIL_BODY_CORE: {
                    'MSG_CODE': 30000391,
                    'MSG': 'Your model training has been completed now. You can use this model to recognize intent which has accuracy'
                },
                SESSION_TOKEN_VALID_CORE: {
                    'MSG_CODE': 30000401,
                    'MSG': 'Session token valid'
                },
                EMAIL_TEMPLATE_NAME_CORE: {
                    'MSG_CODE': 30000411,
                    'MSG': 'Emotion Template'
                },
                EMAIL_TEMPLATE_SUBJECT_CORE: {
                    'MSG_CODE': 30000421,
                    'MSG': 'Frustated Client Support'
                },
                EMAIL_TEMPLATE_BODY_CORE: {
                    'MSG_CODE': 30000431,
                    'MSG': 'This <<user_name>> user has been frusted with some of queries.please get in touch with them asap'
                },
                EMAIL_SENT_SUCCESSFULLY_CORE: {
                    'MSG_CODE': 30000441,
                    'MSG': 'Email sent successfully'
                },
                PARTNER_EMAIL_SUB_CORE: {
                    'MSG_CODE': 30000451,
                    'MSG': 'Invitation link for cense chatbot'
                },
                PARTNER_EMAIL_BODY_CORE: {
                    'MSG_CODE': 30000461,
                    'MSG': 'Please accept this following link to register with one of the AI chatbot powered by Cense'
                },
                BLOG_MSG_CORE: {
                    'MSG_CODE': 30000471,
                    'MSG': 'blog added'
                },
                ADDED_SUPPORT_CONTACTS_SUCCESS_2012_CORE: {
                    'MSG_CODE': 30000481,
                    'MSG': 'Contacts added successfully'
                },
                SUPPORT_CONTACTS_EDITED_SUCCESS_4020_CORE: {
                    'MSG_CODE': 30000491,
                    'MSG': 'Contact Updated Successfully'
                },
                ADDED_WIDGET_SETTINGS_SUCCESSFULLY_4018_CORE: {
                    'MSG_CODE': 30000501,
                    'MSG': 'Widget Settings added successfully'
                },
                BLOG_UPDATED_CORE: {
                    'MSG_CODE': 30000511,
                    'MSG': 'blog updated'
                },
                PROFILE_UPDATED_CORE: {
                    'MSG_CODE': 30000521,
                    'MSG': 'Profile Updated'
                },
                FILE_UPLOAD_CORE: {
                    'MSG_CODE': 30000531,
                    'MSG': 'file uploaded successfully'
                },
                TASK_ADDED_SUCCESSFULLY_CORE: {
                    'MSG_CODE': 30000541,
                    'MSG': 'Task Added'
                },
                TASK_EDITED_SUCCESSFULLY_CORE: {
                    'MSG_CODE': 30000551,
                    'MSG': 'Task Edit'
                },
                TASKS_DELETED_SUCCESSFULLY_CORE: {
                    'MSG_CODE': 30000561,
                    'MSG': 'Task(s) Deleted'
                },
                API_ACCESS_TOKEN_UPDATED_SUCCESSFULLY_0010_CORE: {
                    'MSG_CODE': 30000571,
                    'MSG': 'Access Token Updated'
                },
                SESSION_DATA_STORED_SUCCESSFULLY_0008_CORE: {
                    'MSG_CODE': 30000581,
                    'MSG': 'Session Data Stored Successfully'
                },
                CALL_MESSAGES_UPDATED_CORE: {
                    'MSG_CODE': 30000591,
                    'MSG': 'Call Messages Updated'
                },
                CHAT_FAILURE_SETTINGS_UPDATED_CORE: {
                    'MSG_CODE': 30000601,
                    'MSG': 'Setting Updated'
                },
                SUCCESSFUL_TRANSACTION_CORE: {
                    'MSG_CODE': 30000611,
                    'MSG': 'Transaction Successful'
                },
                NER_TAG_STATUS_CORE: {
                    'MSG_CODE': 30000621,
                    'MSG': 'Ner Tag Completed'
                },
                NER_TAG_ASSIGN_CORE: {
                    'MSG_CODE': 30000631,
                    'MSG': 'Assign Ner Tag'
                },
                VALID_LICENSE_KEY_CORE: {
                    'MSG_CODE': 30000641,
                    'MSG': 'Valid license key'
                },
                NER_TAG_ADD_CORE: {
                    'MSG_CODE': 30000651,
                    'MSG': 'Ner Tag Added Successfully'
                },
                SUBSCRIPTION_EXIST_CORE: {
                    'MSG_CODE': 30000661,
                    'MSG': 'Subscription Available'
                },
                AGENT_RELOADED_CORE: {
                    'MSG_CODE': 30000671,
                    'MSG': 'Agent reloaded successfully!'
                },
                EDIT_QUESTION_INTENT_CORE: {
                    'MSG_CODE': 30000681,
                    'MSG': 'Question Intent Updated'
                },
                CORE_MODEL_IS_BEING_TRAINED_CORE: {
                    'MSG_CODE': 30000691,
                    'MSG': "You are about to train the dialogue model and this might take some time. {} runs remaining out of {} allocated for this month."
                },
                INTENT_MODEL_BEING_TRAINED_CORE: {
                    'MSG_CODE': 30000701,
                    'MSG': "You are about to train the intent model and this might take some time. {} runs remaining out of {} allocated for this month."
                },
                NER_MODEL_IS_BEING_TRAINED_CORE: {
                    'MSG_CODE': 30000711,
                    'MSG': "You are about to train an NER model and this might take some time. {} runs remaining out of {} allocated for this month."
                },
                ACCOUNT_DETAILS_INSERT_CORE: {
                    'MSG_CODE': 30000721,
                    'MSG': 'Account Details Inserted'
                },
                ACCOUNT_DETAILS_UPDATE_CORE: {
                    'MSG_CODE': 30000731,
                    'MSG': 'Account Details Updated'
                },
                UPDATE_SCHEDULING_INFO_CORE: {
                    'MSG_CODE': 30000741,
                    'MSG': 'Scheduling info updated'
                },
                APPOINTMENT_ADDED_CORE: {
                    'MSG_CODE': 30000751,
                    'MSG': 'Appointment Added Successfully'
                },
                APPOINTMENT_EDITED_CORE: {
                    'MSG_CODE': 30000761,
                    'MSG': 'Appointment Edited Successfully'
                },
                PHOTO_UPLOAD_CORE: {
                    'MSG_CODE': 30000771,
                    'MSG': 'Photo Uploaded Successfully'
                },
                PRODUCT_CSV_UPLOADED_CORE: {
                    'MSG_CODE': 30000781,
                    'MSG': 'File Uploaded Successfully'
                },
                PRODUCT_DELETED_CORE: {
                    'MSG_CODE': 30000791,
                    'MSG': 'Products Deleted Successfully'
                },
                EDIT_PRODUCT_CSV_CORE: {
                    'MSG_CODE': 30000801,
                    'MSG': 'Changes Applied Successfully'
                },
                NO_PRODUCTS_ADDED_CORE: {
                    'MSG_CODE': 30000811,
                    'MSG': 'No Products Added Yet'
                },
                PRODUCT_ADDED_CORE: {
                    'MSG_CODE': 30000821,
                    'MSG': 'Product Added Successfully'
                },
                USER_DETAILS_SAVED_CORE: {
                    'MSG_CODE': 30000831,
                    'MSG': 'Bot User Data Saved Successfully'
                },
                APPOINTMENT_RESCHEDULED_CORE: {
                    'MSG_CODE': 30000841,
                    'MSG': 'Appointment Rescheduled Successfully'
                },
                APPOINTMENT_REMINDER_SENT_SUCCESSFULLY_CORE: {
                    'MSG_CODE': 30000851,
                    'MSG': 'Reminder Sent Successfully'
                },
                SCHEDULING_LINK_VALIDATED_CORE: {
                    'MSG_CODE': 30000861,
                    'MSG': 'Valid Link'
                },
                APPOINTMENT_CONFIRMED_CORE: {
                    'MSG_CODE': 30000871,
                    'MSG': 'Appointment Confirmed Successfully'
                },
                VISIT_STATUS_EDITED_CORE: {
                    'MSG_CODE': 30000881,
                    'MSG': 'Visit Status Edited'
                },
                DATA_SOURCE_PROCESSED_AND_STORED_IN_ELASTIC_SEARCH_CORE: {
                    'MSG_CODE': 30000891,
                    'MSG': 'Data Source Processed And Stored In Elastic Search'
                },
                EDITED_SUCCESSFULLY_0005_CORE: {
                    'MSG_CODE': 30000901,
                    'MSG': "Edited Successfully"
                },
                FEEDBACK_ADDED_SUCCESSFULLY_1080_CORE: {
                    'MSG_CODE': 30000911,
                    'MSG': 'Feedback sent Successfully'
                },
                ACCESS_TOKEN_GENERATED_CORE: {
                    'MSG_CODE': 30000921,
                    'MSG': 'Access Token Generated'
                },
                ACCESS_TOKEN_REVOKED_CORE: {
                    'MSG_CODE': 30000931,
                    'MSG': 'Access token has been revoked'
                },
                UPDATED_CORE: {
                    'MSG_CODE': 30000941,
                    'MSG': 'Updated'
                },
                CHAT_SAVED_CORE: {
                    'MSG_CODE': 30000951,
                    'MSG': 'chat saved'
                },
                TEMPLATE_SEARCH_RESULT_MODELS: {
                    'MSG_CODE': 20000631,
                    'MSG': "Template Search Successfully"
                },
                NOTHING_TO_DELETE_MODELS: {
                    'MSG_CODE': 20000641,
                    'MSG': "Nothing to delete"
                },
                TEMPLATE_RECEIVED_MODELS : {
                    'MSG_CODE': 20000651,
                    'MSG': "Template Received Successfully"
                },
                ADDING_PRODUCT_TO_DB_MODELS : {
                    'MSG_CODE': 20000661,
                    'MSG': "Adding products to db"
                },
                REPORT_BEING_SENT_MODELS : {
                    'MSG_CODE': 20000671,
                    'MSG': "REPORT IS BEING SENT"
                },
                CELERY_TASK_RUNNING_MODELS : {
                    'MSG_CODE': 20000681,
                    'MSG': "Celery Task Running"
                },
                INVALID_PARAMETER : {
                    'MSG_CODE': 10001570,
                    'MSG': 'No valid parameter passed'
                },
                INVALID_TOKEN_MODELS : {
                    'MSG_CODE': 20000490,
                    'MSG': 'Invalid Token'
                },
                SESSION_EXPIRED_MODELS : {
                    'MSG_CODE': 20000500,
                    'MSG': 'Your Session has expired. Please login again'
                },
                MULTIPLE_LOGIN_MODELS : {
                    'MSG_CODE': 20000510,
                    'MSG': 'You are logged in on another device.'
                },
                INTENT_NOT_SAVED_MODELS : {
                    'MSG_CODE': 20000520,
                    'MSG': 'Intent Not Saved Successfully'
                },
                INTENT_QUESTION_NOT_DELETED_MODELS : {
                    'MSG_CODE': 20000530,
                    'MSG': 'Intent Question not Deleted'
                },
                INTENT_QUESTION_NOT_EDITED_MODELS : {
                    'MSG_CODE': 20000540,
                    'MSG': 'Intent Question Not Edited Successfully'
                },
                SMS_CREDITS_DO_NOT_EXCEEDS_MODELS : {
                    'MSG_CODE': 20000550,
                    'MSG': 'Sms credits do not exceed'
                },
                US_SMS_CREDITS_EXCEEDS_MODELS : {
                    'MSG_CODE': 20000560,
                    'MSG': 'No credits left to send sms'
                },
                NON_US_SMS_CREDITS_EXCEEDS_MODELS : {
                    'MSG_CODE': 20000570,
                    'MSG': 'No credits left for sms to non us'
                },
                ALREADY_NOTIFIED_MODELS : {
                    'MSG_CODE': 20000580,
                    'MSG': 'Already Notified'
                },
                EMPTY_ROOT_NODE_MODELS : {
                    'MSG_CODE': 20000590,
                    'MSG': 'Root Node is Empty'
                },
                NODE_STRUCTURE_NOT_SAVED_MODELS : {
                    'MSG_CODE': 20000600,
                    'MSG': 'Node Structure Not Saved Successfully'
                },
                NODE_STRUCTURE_NOT_EXISTS_MODELS : {
                    'MSG_CODE': 20000610,
                    'MSG': 'Node Structure Does Not Exists'
                },
                WEBHOOK_NOT_SAVED_MODELS : {
                    'MSG_CODE': 20000620,
                    'MSG': 'Webhook Details not Saved Successfully'
                },
                WEBHOOK_DETAILS_NOT_EXISTS_MODELS : {
                    'MSG_CODE': 20000630,
                    'MSG': 'Webhook Details Does not Exists'
                },
                NODE_STRUCTURE_SAVED_MODELS : {
                    'MSG_CODE': 20000691,
                    'MSG': "Node Structure Saved Successfully"
                },
                SAVING_AND_UPDATING_MODEL : {
                    'MSG_CODE': 20000701,
                    'MSG': "saving and updating the model"
                },
                NODE_STRUCTURE_RECEIVED_MODELS : {
                    'MSG_CODE': 20000711,
                    'MSG': "Node structure Received Successfully"
                },
                WEBHOOK_DETAILS_SAVED_MODELS : {
                    'MSG_CODE': 20000721,
                    'MSG': "Webhook Details Saved Successfully"
                },
                NO_COUPONS_FOUND_MODELS : {
                    'MSG_CODE': 20000731,
                    'MSG': "No Coupons found"
                },
                COUPONS_FOUND_MODELS : {
                    'MSG_CODE': 20000741,
                    'MSG': "Coupons found"
                },
                WEBHOOK_DETAILS_RECEIVED_MODELS : {
                    'MSG_CODE': 20000751,
                    'MSG': "Webhook Details Received Successfully"
                },
                SEARCH_WEBHOOK_NOT_FOUND_MODELS : {
                    'MSG_CODE': 20000761,
                    'MSG': "Searched webhook not found"
                },
                MAGENTO_ORDER_NOTIFICATION_MODELS : {
                    'MSG_CODE': 20000581,
                    'MSG': "Updating magento orders data and sending notification"
                },
                DIALOG_INTENT_QUESTION_DELETED_MODELS : {
                    'MSG_CODE': 20000591,
                    'MSG': "Intent Question used in dialog Deleted Successfully"
                },
                INTENT_QUESTION_DELETED_MODELS : {
                    'MSG_CODE': 20000601,
                    'MSG': "Intent Question Deleted Successfully"
                },
                USED_INTENT_QUESTION_EDITED_MODELS : {
                    'MSG_CODE': 20000611,
                    'MSG': "Used Intent Name Edited Successfully"
                },
                INTENT_QUESTION_EDITED_MODELS : {
                    'MSG_CODE': 20000621,
                    'MSG': "Intent Question Edited Successfully"
                },
                SOME_ERROR_OCCURRED_MODELS : {
                    'MSG_CODE': 20000640,
                    'MSG': "Some error occurred"
                },
                NO_DISCOUNT_COUPONS_FOUND_MODELS : {
                    'MSG_CODE': 20000650,
                    'MSG': "No Discount Coupons Found"
                },
                DISCOUNT_COUPONS_UPDATE_FAILED_MODELS : {
                    'MSG_CODE': 20000660,
                    'MSG': "Discount Coupons Updating Failed"
                },
                DISCOUNT_COUPONS_FOUND_MODELS : {
                    'MSG_CODE': 20000771,
                    'MSG': "Discount Coupons Found"
                },
                DISCOUNT_COUPONS_UPDATED_MODELS : {
                    'MSG_CODE': 20000781,
                    'MSG': "Discount Coupons Updated"
                },
                ADDING_COUPONS_TO_DB_MODELS : {
                    'MSG_CODE': 20000791,
                    'MSG': "Adding coupons to db"
                },
                INCOMPLETE_DATA_MODELS : {
                    'MSG_CODE': 20000670,
                    'MSG': "Incomplete Data"
                },
                WHATSAPP_PROFILE_PICTURE_UNDER_RESOLUTION : {
                    'MSG_CODE': 10001580,
                    'MSG': 'Please upload JPG image of resolution greater than 192 pixel * 192 pixel'
                },
                INSUFFICIENT_WHATSAPP_BROADCAST_INFORMATION : {
                    'MSG_CODE': 10001600,
                    'MSG': 'minimum two contacts required to create a broadcast'
                },
                DATA_ALREADY_EXIST :  {
                    'MSG_CODE': 10001610,
                    'MSG': 'DATA_ALREADY_EXIST'
                },
                MISSING_COMPANY_INFORMATION_MODELS : {
                    'MSG_CODE': 20000730,
                    'MSG': 'No Company Information sent!'
                },
                INVALID_BOT_ID_CORE : {
                    'MSG_CODE': 30000750,
                    'MSG': 'Invalid Bot Id'
                },
                WHATSAPP_OPT_OUT_CONTACTS : {
                    'MSG_CODE': 10001620,
                    'MSG': 'All contacts have opted out of getting templates.'
                },

            }
        }
    },
    methods: {
        api_error_checks(response) {
            if (response.data.meta.message != "Success") {
                if (response.data.message.MSG_CODE === this.api_status_code.INTERNAL_SERVER_ERROR.MSG_CODE) {
                    this.$swal
                        .fire({
                            title: response.data.message.MSG,
                            text: response.data.message.MSG_CODE,
                            showCancelButton: false,
                            showConfirmButton: false,
                            type: "error",
                            timer: 2500
                        });
                }
                else {
                    this.$swal
                        .fire({
                            title: response.data.message.MSG,
                            text: response.data.message.MSG_CODE,
                            showCancelButton: false,
                            showConfirmButton: false,
                            type: "error",
                            timer: 2500
                        });
                    return null;
                }
            } else {
                return response;
            }
        }
    }
}
