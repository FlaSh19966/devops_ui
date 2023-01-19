import DashboardLayout from '@/portal/Chatbot/Dashboard/Layout/DashboardLayout.vue'
// Dashboard pages
import Profile from '@/portal/Chatbot/Dashboard/Profile.vue'
import Payments from '@/portal/Chatbot/Dashboard/Payments.vue'

import Accounts from '@/portal/Chatbot/Dashboard/Accounts.vue'
import ActionForm from '@/portal/Chatbot/Dashboard/ActionForm.vue'
import Developer from '@/portal/Chatbot/Dashboard/Developer.vue'
import DirectResponseBot from '@/portal/Chatbot/Dashboard/DirectresponseBot.vue'
import TrainDialogue from '@/portal/Chatbot/Dashboard/TrainDialogue.vue'
import TrainModel from '@/portal/Chatbot/Dashboard/Train.vue'
import TrainIntent from '@/portal/Chatbot/Dashboard/TrainIntent.vue'
// Edited By Harsh

import Workflow from '@/portal/Chatbot/Dashboard/Workflow.vue'
import DesignBot from '@/portal/Chatbot/Dashboard/BotDesign.vue'
import TestClosedBot from '@/portal/Chatbot/Dashboard/Newtestbot.vue'
import OpenBot from '@/portal/Chatbot/Dashboard/OpenBot.vue'
import BotManager from '@/portal/Chatbot/Dashboard/BotManager.vue'
import Template from '@/portal/Chatbot/Dashboard/Template.vue'
import OpenBotTemplatePreview from '@/portal/Chatbot/Dashboard/OpenBotTemplatePreview.vue'
import FileUploadBI from '@/portal/Chatbot/Dashboard/FileUploadBI.vue'
import Bidashboard from '@/portal/Chatbot/Dashboard/Bidashboard.vue'
import AnalyticsDashboard from '@/portal/Chatbot/Dashboard/AnalyticsDashboard.vue'
import AnalyticsNERTagging from '@/portal/analytics/NERTagging.vue'
import PageLayout from '@/conference/components/PageLayout.vue';
import Unsubscribe from '@/portal/Chatbot/Dashboard/Unsubscribe.vue'
import WhatsappChats from '@/portal/Chatbot/Dashboard/WhatsappChat.vue'
import WhatsappNewpage from '@/portal/Chatbot/Dashboard/WhatsappNewpage.vue'


// Data Inputs
const Intents = () => import('@/portal/Chatbot/Dashboard/Data Inputs/AddIntent.vue')
const Questions = () => import('@/portal/Chatbot/Dashboard/Data Inputs/AddQuestions.vue')
const AddTasks = () => import('@/portal/Chatbot/Dashboard/Data Inputs/AddTasks.vue')
const TrainBot = () => import('@/portal/Chatbot/Dashboard/Data Inputs/Chatscreen.vue')
const DefineEndpoints = () => import('@/portal/Chatbot/Dashboard/Data Inputs/DefineEndpoints.vue')
const NER = () => import('@/portal/Chatbot/Dashboard/Data Inputs/NER.vue')
const TestBot = () => import('@/portal/Chatbot/Dashboard/Data Inputs/ResponseBot.vue')
const Responses = () => import('@/portal/Chatbot/Dashboard/Data Inputs/ResponseIntent.vue')
const TrainTestBot = () => import('@/portal/Chatbot/Dashboard/Data Inputs/TrainTestBot.vue')
const ValidateBotResponse = () => import('@/portal/Chatbot/Dashboard/Data Inputs/ValidateBotResponse.vue')
const NewIntents = () => import('@/portal/Chatbot/Dashboard/Data Inputs/NewIntentPage.vue')

// User Management
const AddRole = () => import('@/portal/Chatbot/Dashboard/User Management/AddRole.vue')
const AddUser = () => import('@/portal/Chatbot/Dashboard/User Management/AddUser.vue')
const CreateChatGroups = () => import('@/portal/Chatbot/Dashboard/User Management/CreateChatGroups.vue')
const Permissions = () => import('@/portal/Chatbot/Dashboard/User Management/Permissions.vue')

// End User Response
const TaskResponses = () => import('@/portal/Chatbot/Dashboard/End User Response/TaskResponses.vue')
const VerifyResponses = () => import('@/portal/Chatbot/Dashboard/End User Response/VerifyResponses.vue')

// Customer Support
const LiveChat = () => import('@/portal/Chatbot/Dashboard/Customer Support/LiveChat.vue')
const CallRecording = () => import('@/portal/Chatbot/Dashboard/Customer Support/CallRecording.vue')
const SupportSettings = () => import('@/portal/Chatbot/Dashboard/Customer Support/SupportSettings.vue')
const CustomerTicketing = () => import('@/portal/Chatbot/Dashboard/Customer Support/CustomerTicketing.vue')
const SuperAdminTicket = () => import('@/portal/Chatbot/Dashboard/Customer Support/SuperAdminTicketDashboard.vue')
const CompanyDailyReports = () => import('@/portal/Chatbot/Dashboard/Customer Support/CompanyDailyReports.vue')

// Account
const Billing = () => import('@/portal/Chatbot/Dashboard/Account/Billing.vue')

// Apps
const Scheduler = () => import('@/portal/Chatbot/Dashboard/Apps/Scheduler.vue')
const Ecommerce = () => import('@/portal/Chatbot/Dashboard/Apps/Ecommerce.vue')
const Tickets = () => import('@/portal/Chatbot/Dashboard/Apps/Tickets.vue')
const FormBuilder = () => import('@/portal/Chatbot/Dashboard/Apps/FormBuilder.vue')
const PdftoHTML = () => import('@/portal/Chatbot/Dashboard/Apps/PdftoHTML.vue')
const EducationBot = () => import('@/portal/Chatbot/Dashboard/Apps/EducationBot.vue')

// Settings
const Email = () => import('@/portal/Chatbot/Dashboard/Settings/Email.vue')
const Miscellaneous = () => import('@/portal/Chatbot/Dashboard/Settings/Miscellaneous.vue')

const Dashboard = () => import('@/portal/Chatbot/Dashboard/Dashboard.vue')
// const PartnerDashboard = () => import('@/portal/Chatbot/Dashboard/PartnerDashboard.vue')

const Login = () => import('@/portal/Chatbot/Dashboard/Pages/Login.vue')
const ForgotPassword = () => import('@/portal/Chatbot/Dashboard/Pages/ForgotPassword.vue')
const SuperAdminIntermediateScreen = () => import('@/portal/Chatbot/Dashboard/Pages/SuperAdminIntermediateScreen.vue')

// harsh
const ResetPassword = () => import('@/portal/Chatbot/Dashboard/Pages/ResetPassword.vue')
const SetAccountPassword = () => import('@/portal/Chatbot/Dashboard/Pages/SetAccountPassword.vue')
const Register = () => import('@/portal/Chatbot/Dashboard/Pages/Register.vue')

const Blog = () => import('@/portal/Chatbot/Dashboard/Pages/Blog.vue')
const BotConfiguration = () => import('@/portal/Chatbot/Dashboard/BotOutput/BotConfiguration.vue')
const SocialMediaSettings = () => import('@/portal/Chatbot/Dashboard/Integrations/SocialMediaSettings.vue')
const WebFrameworks = () => import('@/portal/Chatbot/Dashboard/Integrations/WebFrameworks.vue')
const MessagingFrameworks = () => import('@/portal/Chatbot/Dashboard/Integrations/MessagingFrameworks.vue')
const SocialMediaLinks = () => import('@/portal/Chatbot/Dashboard/Integrations/SocialMediaLinks.vue')

// Product Management
const ProductConfiguration = () => import('@/portal/Chatbot/Dashboard/ProductManagement/ProductLayout.vue')
const StoreConfiguration = () => import('@/portal/Chatbot/Dashboard/ProductManagement/ProductSettings.vue')
// const ShopifyGuide = () => import('@/portal/Chatbot/Dashboard/Integrations/Components/ShopifyGuide.vue')
const ShopifyGuide = () => import('@/portal/Chatbot/Dashboard/Integrations/Components/ShopifyGuideNew.vue')
const WoocommerceGuide = () => import('@/portal/Chatbot/Dashboard/Integrations/Components/WoocommerceGuide.vue')
const MagentoGuide = () => import('@/portal/Chatbot/Dashboard/Integrations/Components/MagentoGuide.vue')
const BigcommerceGuide = () => import('@/portal/Chatbot/Dashboard/Integrations/Components/BigcommerceGuide.vue')
const ConversationalFlow = () => import('@/portal/Chatbot/Dashboard/ConversationalFlow/FlowLayout.vue')
const IntermediateScreen = () => import('@/portal/Chatbot/Dashboard/Pages/IntermediateScreen.vue')

// Payment Handling
const StripePaymentRedirect = () => import('@/portal/Chatbot/Dashboard/StripePaymentHandling/PaymentRedirect.vue')
// const VoiceDashboard = () => import('@/VoiceSystem/Dashboard/VoiceDashboard.vue')
// const MapIntentscreen = () => import('@/VoiceSystem/Dashboard/MapIntentscreen.vue')

// Human Resources
const HrScheduler = () => import('@/portal/Chatbot/Dashboard/HR Management/HrScheduler.vue')
const JobPosition = () => import('@/portal/Chatbot/Dashboard/HR Management/JobPosition.vue')
const Recruitment = () => import('@/portal/Chatbot/Dashboard/HR Management/Recruitment.vue')

// Templates 
const TemplateConfiguration =() => import('@/portal/Chatbot/Dashboard/Templates/TemplateLayout.vue')
const BannerTemplate =() => import('@/portal/Chatbot/Dashboard/Templates/BannerTemplate.vue')
const SmsTemplate =() => import('@/portal/Chatbot/Dashboard/Templates/SmsTemplates.vue')
const EmailTemplate =() => import('@/portal/Chatbot/Dashboard/Templates/EmailTemplates.vue')

//Campaigns
const WhatsappCampaign =() => import('@/portal/Chatbot/Dashboard/Campaigns/WhatsappCampaign.vue')
const WhatsappBroadcast =() => import('@/portal/Chatbot/Dashboard/Campaigns/WhatsappBroadcast.vue')
const SmsCampaign =() => import('@/portal/Chatbot/Dashboard/Campaigns/SmsCampaign.vue')
const EmailCampaign =() => import('@/portal/Chatbot/Dashboard/Campaigns/EmailCampaign.vue')

//renewalpage 
const SubscriptionRenewablePage = () => import('@/portal/Chatbot/Dashboard/Pages/SubscriptionRenewalPage.vue')

const routes = [
  {
    path: '/',
    redirect: '/bot/login',
    component: Login
  },
  {
    path: '*',
    redirect: '/bot/login',
    component: Login
  },
  {
    path: '/bot/login',
    name: 'Login',
    components: { default: Login }
  },
  {
    path: '/bot/register',
    name: 'Register',
    components: { default: Register }
  },
  {
    path: '/bot/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  // harsh
  {
    path: '/bot/reset-password',
    name: 'ResetPassword',
    component: ResetPassword
  },
  {
    path: '/bot/set-account-password',
    name: 'SetAccountPassword',
    component: SetAccountPassword
  },
  {
    path: '/bot/intermediate-screen',
    name: 'IntermediateScreen',
    component: IntermediateScreen
  },
  {
    path: '/bot/super-admin',
    name: 'SuperAdminIntermediateScreen',
    component: SuperAdminIntermediateScreen,
    props: {
      header: true,
      content: true
    },
  },
  //
  {
    path: '/bot',
    component: DashboardLayout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        components: { default: Dashboard }
      },
      {
        path: 'questions',
        name: 'Questions',
        components: { default: Questions }
      },
      {
        path: 'chatscreen',
        name: 'Train Bot',
        components: { default: TrainBot }
      },
      {
        path: 'bot-response',
        name: 'Test Bot',
        components: { default: TestBot }
      },
      {
        path: 'intents',
        name: 'Intents',
        components: { default: NewIntents }
      },
      {
        path: 'new-intents',
        name: 'NewIntents',
        components: { default: NewIntents }
      },
      {
        path: 'action-form',
        name: 'Action Form',
        components: { default: ActionForm }
      },
      {
        path: 'email',
        name: 'Configure Email',
        components: { default: Email }
      },
      {
        path: 'define-api-endpoints',
        name: 'Define API Endpoints',
        components: { default: DefineEndpoints }
      },
      {
        path: 'blog',
        name: 'Blog',
        components: { default: Blog }
      },
      {
        path: 'live-chat',
        name: 'Live Chat',
        components: { default: LiveChat }
      },
      {
        path: 'verify-responses',
        name: 'Verify Bot Response',
        components: { default: VerifyResponses }
      },
      {
        path: 'add-user',
        name: 'Users',
        components: { default: AddUser }
      },
      {
        path: 'add-account',
        name: 'Add Account',
        components: { default: Accounts }
      },
      {
        path: 'add-role',
        name: 'Roles',
        components: { default: AddRole }
      },
      {
        path: 'miscellaneous-settings',
        name: 'Settings',
        components: { default: Miscellaneous }
      },
      {
        path: 'bot-configuration',
        name: 'Bot Configuration',
        components: { default: BotConfiguration }
      },
      {
        path: 'social-media-settings',
        name: 'Social Media Settings',
        components: { default: SocialMediaSettings }
      },
      {
        path: 'web-frameworks',
        name: 'Web Frameworks',
        components: { default: WebFrameworks }
      },
      {
        path: 'messaging-frameworks',
        name: 'Messaging Frameworks',
        components: { default: MessagingFrameworks }
      },
      {
        path: 'social-media-links',
        name: 'Social Media Links',
        components: { default: SocialMediaLinks }
      },
      {
        path: 'permissions',
        name: 'Permissions',
        components: { default: Permissions }
      },
      {
        path: 'task-responses',
        name: 'Saved Chats',
        components: { default: TaskResponses }
      },
      {
        path: 'tasks',
        name: 'Tasks',
        components: { default: AddTasks }
      },
      {
        path: 'profile',
        name: 'Profile',
        components: { default: Profile }
      },
      {
        path: 'payments',
        name: 'Payments',
        components: { default: Payments }
      },
      {
        path: 'tickets',
        name: 'Tickets',
        components: { default: Tickets }
      },
      {
        path: 'billing',
        name: 'Billing',
        components: { default: Billing }
      },
      {
        path: 'create-chat-groups',
        name: 'Chat Group',
        components: { default: CreateChatGroups }
      },
      {
        path: 'ner-training',
        name: 'NER Training',
        components: { default: NER }
      },
      {
        path: 'developer',
        name: 'Developer',
        components: { default: Developer }
      },
      {
        path: 'directresponsebot',
        name: 'Direct Response Bot',
        components: { default: DirectResponseBot }
      },
      {
        path: 'responses',
        name: 'Responses',
        components: { default: Responses }
      },
      {
        path: 'train-test-bot',
        name: 'Train & Test Bot',
        components: { default: TrainTestBot }
      },
      {
        path: 'check-bot-response',
        name: 'Check Bot Response',
        components: { default: ValidateBotResponse }
      },
      {
        path: 'traindialogue',
        name: 'Train Dialogue Model',
        components: { default: TrainDialogue }
      },
      {
        path: 'train',
        name: 'Train Model',
        components: { default: TrainModel }
      },
      {
        path: 'trainintent',
        name: 'Train Intent Model',
        components: { default: TrainIntent }
      },
      {
        path: 'scheduling',
        name: 'Scheduler',
        components: { default: Scheduler }
      },
      {
        path: 'interview-scheduler',
        name: 'Interview Scheduler',
        components: { default: HrScheduler }
      },
      {
        path: 'job-position',
        name: 'Job Position',
        components: { default: JobPosition }
      },
      {
        path: 'recruitment',
        name: 'Recruitment',
        components: { default: Recruitment }
      },
      {
        path: 'ecommerce',
        name: 'Ecommerce',
        components: { default: Ecommerce }
      },
      {
        path: 'workflow',
        name: 'Workflow',
        components: { default: Workflow }
      },
      {
        path: 'template',
        name: 'Template',
        components: { default: Template }
      },
      {
        path: 'openbot',
        name: 'OpenBot',
        components: { default: OpenBot }
      },
      {
        path: 'designbot',
        name: 'Design Bots',
        components: { default: DesignBot }
      },
      {
        path: 'test-closed-bot',
        name: 'Test Closed Bot',
        components: { default: TestClosedBot }
      },
      {
        path: 'open-bot-template-preview',
        name: 'Open Bot Template Preview',
        components: { default: OpenBotTemplatePreview }
      },
      {
        path: 'fileuploadbi',
        name: 'Business Analytics Config',
        components: { default: FileUploadBI }
      },
      {
        path: 'bidashboard',
        name: 'Business Analytics Dashboard',
        components: { default: Bidashboard }
      },
      {
        path: 'BusinessAnalytics',
        name: 'Business Analytics',
        components: { default: AnalyticsDashboard }
      },
      {
        path: 'analytics-ner-tagging',
        name: 'Analytics NER Tagging',
        components: { default: AnalyticsNERTagging }
      },
      {
        path: 'recorded-calls',
        name: 'Recorded Calls',
        components: { default: CallRecording }
      },
      {
        path: 'customer-ticketing',
        name: 'Customer Ticketing',
        components: { default: CustomerTicketing }
      },
      {
        path: 'Company-daily-reports',
        name: 'Company Daily Reports',
        components: { default: CompanyDailyReports }
      },
      {
        path: 'form-builder',
        name: 'Form Builder',
        components: { default: FormBuilder }
      },
      {
        path: 'bot-manager',
        name: 'Bot Manager',
        components: { default: BotManager }
      },
      // {
      //   path: 'support-settings',
      //   name: 'Settings',
      //   components: { default: SupportSettings }
      // },
      {
        path: 'pdf-html',
        name: 'PDF to HTML',
        components: { default: PdftoHTML }
      },
      {
        path: 'education-bot',
        name: 'Education Bot',
        components: { default: EducationBot }
      },
      {
        path: 'product-configuration',
        name: 'Product Configuration',
        components: { default: ProductConfiguration }
      },
      {
        path: 'store-configuration',
        name: 'Store Configuration',
        components: { default: StoreConfiguration }
      },
      {
        path: 'conversational-flow',
        name: 'Conversational Flow',
        components: { default: ConversationalFlow }
      },
      {
        path: 'superadmin-ticket',
        name: 'SuperAdmin Ticket',
        components: { default: SuperAdminTicket }
      },
      {
        path: 'template-layout',
        name: 'Template Configuration',
        components: { default: TemplateConfiguration }
      },
      {
        path: 'email-campaign',
        name: 'Email Campaign',
        components: { default: EmailCampaign }
      },
      {
        path: 'sms-campaign',
        name: 'SMS Campaign',
        components: { default: SmsCampaign }
      },
      {
        path: 'whatsapp-campaign',
        name: 'Whatsapp Campaign',
        components: { default: WhatsappCampaign }
      },
      {
        path: 'whatsapp-broadcast',
        name: 'Whatsapp Broadcast',
        components: { default: WhatsappBroadcast }
      },
      {
        path: 'email-templates',
        name: 'Email Templates',
        components: { default: EmailTemplate }
      },
      {
        path: 'banner-templates',
        name: 'Banner Templates',
        components: { default: BannerTemplate }
      },
      {
        path: 'sms-templates',
        name: 'SMS Templates',
        components: { default: SmsTemplate }
      },
      {
        path :'subscription-renewal',
        name : 'Subscription Renewal',
        components: {default: SubscriptionRenewablePage}
      },
      {
        path :'whatsappchatnewpage',
        name : 'WhatsApp Chat',
        component : WhatsappChats
      },
      {
        path :'whatsappchat',
        name : 'WhatsApp Chat NewPage',
        component :WhatsappNewpage
      }

    ]
  },
  {
    path: '/shopifyhelp',
    name: 'shopifyhelp',
    components: { default: ShopifyGuide }
  },
  {
    path: '/payment-redirect',
    name: 'paymentredirect',
    components: { default: StripePaymentRedirect }
  },
  {
    path: '/woocommercehelp',
    name: 'woocommercehelp',
    components: { default: WoocommerceGuide }
  },
  {
    path: '/magentohelp',
    name: 'magentohelp',
    components: { default: MagentoGuide }
  },
  {
    path: '/bigcommercehelp',
    name: 'bigcommercehelp',
    components: { default: BigcommerceGuide } 
  },
  {
    path: '/conference',
    redirect: '/conference/video-call',
  },
  {
    path: '/conference',
    component: PageLayout,
    children: [{
      path: 'invite-to-call',
      name: 'Invitation',
      component: () => import(/* webpackChunkName: "invitation" */ '@/conference/components/Invitation.vue'),
    },
    {
      path: 'video-call',
      name: 'Video-Call',
      component: () => import(/* webpackChunkName: "video-calling" */ '@/conference/components/VideoCallPageLayout.vue'),
    },
    {
      path: 'add-users',
      name: 'Add-Users',
      component: () => import(/* webpackChunkName: "add-users" */ '@/conference/components/AddUsers.vue'),
    },
    {
      path: 'chat',
      name: 'chat',
      component: () => import(/* webpackChunkName: "chat" */ '@/conference/components/ChatPageLayout.vue'),
    }
  
  ],
  },
  {
    path: '/unsubscribe',
    name: 'Unsubscribe',
    component: Unsubscribe
  }
]

export default routes
