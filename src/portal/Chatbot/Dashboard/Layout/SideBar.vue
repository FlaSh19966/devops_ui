<template>
  <div
    v-show="$route.name != 'Direct Response Bot'"
    class="sidebar"
    @mouseenter="sidebar_scroll('enter')"
    @mouseleave="sidebar_scroll('leave')"
  >
    <nav class="navbar navbar-expand-md">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav flex-column">
          <!-- <li
            :class="list_class(menu)"
            v-for="(menu, index) in display_list"
            :key="index"
            :id="generateId(menu)"
          >
            <a
              class="nav-link"
              href="javascript: void(0)"
              v-if="menu.sub_menu_list.length == 0"
              @click="sendView(menu.main_menu.name)"
            >
              <span class="icn" v-html="menu.main_menu.svg_html">{{
                menu.main_menu.svg_html
              }}</span>
              <span class="txt">{{ menu.main_menu.name }}</span>
            </a>
            <a
              class="nav-link dropdown-toggle"
              href="#"
              :id="index + 'navbarDropdown'"
              data-toggle="dropdown"
              role="button"
              aria-expanded="false"
              v-if="menu.sub_menu_list.length != 0"
              @click="makeVisible(menu)"
            >
              <span class="icn" v-html="menu.main_menu.svg_html">{{
                menu.main_menu.svg_html
              }}</span>
              <span class="txt">{{ menu.main_menu.name }}</span>
              <i class="fas fa-chevron-down" style="float:right"></i>
            </a>
            <div
              v-bind:id="'div_' + menu.main_menu.name"
              class="dropdown-menu"
              aria-labelledby="navbarDropdown"
              style="width: 100%; position: static"
            >
              <a
                :class="check_active_page(submenu.name)"
                class="dropdown-item"
                :id="trim_submenu_name(submenu.name)"
                href="javascript: void(0)"
                v-for="(submenu, subindex) in menu.sub_menu_list"
                :key="subindex"
                @click="sendView(submenu.name)"
                >{{ submenu.name }}</a
              >
            </div>
          </li> -->
          <li
            :id="generateId(menu)"
            class="nav-item"
            v-for="(menu, index) in display_list"
            :key="index"
            :class="
              menu.main_menu.name === current_active_main_menu
                ? 'active'
                : 'inactive'
            "
          >
            <a
              class="nav-link dropdown-toggle d-flex align-items-center"
              @click="sendView(menu.main_menu.page_path, menu)"
              v-if="menu.sub_menu_list.length == 0"
            >
              <span class="icn" v-html="menu.main_menu.svg_html">{{
                menu.main_menu.svg_html
              }}</span>
              <span class="txt">{{tlt(menu.main_menu.label)}}</span>
            </a>
            <a
              class="nav-link dropdown-toggle d-flex align-items-center"
              data-toggle="collapse"
              :data-target="'#collapse' + index"
              aria-expanded="false"
              aria-controls="collapseExample12"
              @click="change_menu(menu)"
              v-if="menu.sub_menu_list.length != 0"
            >
              <span class="icn" v-html="menu.main_menu.svg_html">{{
                menu.main_menu.svg_html
              }}</span>
              <span class="txt">{{tlt(menu.main_menu.label)}}</span>
              <i class="fas fa-chevron-right" style="float: right"></i>
            </a>
            <div
              class="collapse dropdown-menu"
              :id="'collapse' + index"
              style="width: 100%; position: static"
              v-if="menu.sub_menu_list.length != 0"
            >
              <div
                v-for="(submenu, subindex) in menu.sub_menu_list"
                :key="subindex"
                :class="check_active_page(submenu.page_path)"
                class="dropdown-item"
                @click="sendView(submenu.page_path, menu)"
                :id="trim_submenu_name(submenu.name)"
                style="cursor: pointer; white-space: normal; "
              >
                {{ tlt(submenu.label)}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <!-- <a href="javascript:void(0)" data-switch class="switch">
      <span class="caret"></span>
    </a>-->
  </div>
</template>
<script>
import sidebaritems from "./SideBarItem";
import $ from "jquery";
import { bus } from "../../../main";
import introJs from "./intro.js";
export default {
  data() {
    return {
      title: this.$session.has("UserInformation")
        ? this.$session.get("UserInformation").company_name
        : "",
      display_list: this.$session.has("ChatbotMenu")
        ? this.$session.get("ChatbotMenu")
        : "",
      current_active_main_menu:
        this.$route.name === "Dashboard" ? "Dashboard" : null,
      menu_sub_menu_mapping: {},
    };
  },
  methods: {
    sidebar_scroll(type) {
      if (type == "enter") {
        document.querySelector(".sidebar").style.overflowY = "auto";
      } else if (type == "leave") {
        document.querySelector(".sidebar").style.overflowY = "hidden";
      }
    },
    // Edited by harsh
    makeVisible(menu) {
      let viewId = "div_" + menu.main_menu.name;
      var li = document.getElementById(viewId);
      var main = document.getElementById(this.generateId(menu));
      if (
        li.className == "dropdown-menu" ||
        li.className == "dropdown-menu hide"
      ) {
        // if(!(main.classList.contains("show"))){
        //   // console.log(main);
        //   // main.classList.add("show");
        // }
        $(li).removeClass().addClass("dropdown-menu show");
        // li.classList.remove("show");
        // li.classList.toggle("hide");
      } else if (li.className == "dropdown-menu show") {
        // $(li).removeClass().addClass("dropdown-menu");
        li.classList.remove("show");
        li.classList.toggle("hide");
      } else {
      }
    },
    // Edited by harsh
    generateId(menu) {
      if (menu.main_menu.name == undefined) {
      } else {
        let myStr = menu.main_menu.name.replace(" ", "_");
        myStr = myStr.replace(" ", "_");
        return myStr;
      }
    },
    // Edited by harsh
    sendView(route_path, main_menu_name) {
      if (route_path === "/conference") {
        window.location = `${window.location.origin}/conference`;
      } else if (this.$route.path !== route_path) {
        if(route_path === '/bot/check-bot-response'){
          this.$router.push({
           name:  "Check Bot Response",
           params : {
             reload: true
           }
           });
          return;
        }
        this.$router.push({
          path: route_path,
          props: true,
        });
      }
      this.current_active_main_menu = main_menu_name.main_menu.name;
    },
    check_active_page(page_path) {
      return this.$route.path == page_path ? "current-active-page" : "";
    },
    list_class(menu) {
      if (menu.sub_menu_list.length === 0) {
        if (menu.main_menu.name === this.$route.name) {
          return "nav-item active";
        } else {
          return "nav-item";
        }
      } else if (menu.sub_menu_list.length !== 0) {
        for (var i in menu.sub_menu_list) {
          if (menu.sub_menu_list[i].name === this.$route.name)
            return "nav-item dropdown active";
        }
        return "nav-item dropdown";
      }
    },

    start_intro() {
      var introguide = introJs();
      introguide.setOptions({
        steps: [
          {
            labelDisplay: "WELCOME",
            element: "#top_navbar",
            intro:
              "A quick tour to build and train the bot model which can answer your customers queries in three easy steps.",
            position: "bottom-middle-aligned",
          },
          {
            labelDisplay: "INTENTS",
            element: "#intents",
            intro:
              'Lets create an Intent with Questions & Response. INTENTS can be created as CompanyIntro, CompanyInfo etc. QUESTIONS are queries which user might ask as "What is my product status" or "How can i get my invoice".RESPONSE is what you will reply to customer on their asked queries like "Thank you" or "Visit Again".',
            position: "right",
          },
          // {
          //   labelDisplay: 'QUESTIONS',
          //   element: '#questions',
          //   intro: 'Second, lets create few questions or queries which users might ask the bot.<br> For example, Give a brief introduction about the company',
          //   position: 'right'
          // },
          // {
          //   labelDisplay: 'RESPONSES',
          //   element: '#responses',
          //   intro: 'Third, based on the intent that is identified by the model, you need to add the responses here and click on Train The Model button.',
          //   position: 'right'
          // },
          {
            labelDisplay: "TRAIN & TEST BOT",
            element: "#traintestbot",
            intro:
              "Second, post adding the required intents, questions and responses now is the time to test the bot. <br> Questions which has less prediction confidence will be listed on this page. <br> User need to add more questions and further train and test the bot.",
            position: "right",
          },
          {
            labelDisplay: "CHECK BOT RESPONSE",
            element: "#checkbotresponse",
            intro:
              "Third, once the bot is successfully trained and tested you can check the results in this page.",
            position: "right",
          },
        ],
        nextLabel: "NEXT",
        prevLabel: "Prev",
        hidePrev: true,
        hideNext: true,
        showBullets: false,
        doneLabel: "DONE",
      });
      introguide.start();
    },
    trim_submenu_name(name) {
      name = name.replace(/&/g, "");
      return name.replace(/ /g, "").toLowerCase();
    },
    change_menu(menu) {
      var main = document.getElementById(this.generateId(menu));
      main.click();
    },
    check_section_collapsed(menu) {
      if (menu === this.current_active_main_menu) {
        return "fa-chevron-down";
      } else {
        return "fa-chevron-right";
      }
    },
  },
  created(){
    if(Boolean(this.display_list)){
      this.display_list.filter((val) => {this.menu_sub_menu_mapping[val.main_menu.name] = [], val.sub_menu_list.filter((temp) => this.menu_sub_menu_mapping[val.main_menu.name].push(temp.name))});
    }
  },
  mounted() {
    for (const [key, value] of Object.entries(this.menu_sub_menu_mapping)) {
      for(var each in value){
        if(value[each] === this.$route.name){
          this.current_active_main_menu = key;
        }
      }
    }
    $("[data-switch]").click(function () {
      $(this).parent(".sidebar").toggleClass("slim");
      $(this).parents(".dash-wrap").toggleClass("slim");
    });
    this.$root.$on("show_tour_guide", (data) => {
      if (data && Boolean(this.display_list)) {
        let userInformation = this.$session.get("UserInformation");
        userInformation.show_portal_guide = false;
        this.$session.set("UserInformation", userInformation);
        const x = document.getElementById("Data_Inputs");
        const bot_output = document.getElementById("Bot_Output");
        if (
          x.firstElementChild.lastElementChild.classList.contains(
            "fa-chevron-right"
          )
        ) {
          // $("#1navbarDropdown")[0].click();
          x.firstElementChild.click();
        }
        if (
          bot_output.firstElementChild.lastElementChild.classList.contains(
            "fa-chevron-right"
          )
        ) {
          // $("#2navbarDropdown")[0].click();
          bot_output.firstElementChild.click();
        }
        // console.log(x);
        // console.log(bot_output);
        $("html, body").animate({ scrollTop: 0 }, "fast");
        setTimeout(() => {
          // const y = document.getElementById("div_Data Inputs").className;
          // const bot_output_2 = document.getElementById("div_Bot Output")
          //   .className;
          // if (!y.includes("show")) {
          //   $("#1navbarDropdown")[0].click();
          // }
          // if (!bot_output_2.includes("show")) {
          //   $("#2navbarDropdown")[0].click();
          // }
          this.start_intro();
        }, 100);
      }
    });
    // for(let i =0; i < this.intro_guide_order.length; i++){
    //   document.getElementById(this.intro_guide_order[i].element).setAttribute("data-step", i)
    //   document.getElementById(this.intro_guide_order[i].element).setAttribute("data-intro", this.intro_guide_order[i].intro)

    // }
    // $(".dropdown-toggle").dropdown();
    // $('.dropdown').on('show.bs.dropdown', function () {
    // })
    $(".nav-item a").on("click", function (e) {
      // e.preventDefault();
      // do something...
      // console.log(this);
      $(this).find("i").toggleClass("fa-chevron-right fa-chevron-down");
    });
    this.$root.$on('change_sidebar_main_menu', (data) => {
      this.current_active_main_menu = data;
    });
  },
};
</script>
<style scoped>
.navbar-nav .active > .nav-link:before,
.navbar-nav .nav-link.active:before {
  background: #273679 !important;
}
.sidebar .navbar-nav .show > .nav-link.dropdown-toggle,
.sidebar .navbar-nav .nav-link.show.dropdown-toggle {
  background: rgb(255 255 255 / 10%);
}
.sidebar .navbar-nav .nav-link {
  cursor: pointer;
}
.fa-chevron-right {
  width: 8px;
  height: 8px;
  /* border: solid 2px #9499AE; */
  border-left: 0;
  border-top: 0;
  margin-left: 5px;
  vertical-align: 2px;
  position: absolute;
  right: 20px;
  top: 50%;
  margin-top: -6px;
}
.fa-chevron-down {
  width: 8px;
  height: 8px;
  /* border: solid 2px #9499AE; */
  border-left: 0;
  border-top: 0;
  margin-left: 5px;
  vertical-align: 2px;
  position: absolute;
  right: 20px;
  top: 50%;
  margin-top: -6px;
}
.sidebar .dropdown-toggle::after {
  display: none;
  /* font-family: FontAwesome;
  content: "\f0da";
  display: inline-block;
  padding-left: 0px;
  padding-right: 10px;
  vertical-align: middle; */
}
.sidebar .dropdown-menu .dropdown-item:hover {
  background: #ececec;
}
.current-active-page {
  color: #283877;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.1);
}
.sidebar {
  max-height: 500px;
  overflow-y: hidden;
  overflow-x: hidden;
}
div::-webkit-scrollbar {
  max-height: 20px;
  width: 8px;
  border-radius: 10px;
}

/* Track */
div::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
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

.navbar-nav .nav-link.show,
.navbar-nav .show > .nav-link {
  color: #273679;
}
</style>

<style>
.introjs-helperNumberLayer {
  visibility: hidden !important;
  top: 0 !important;
  left: 0 !important;
}
.introjs-helperLayer {
  background-color: #283877 !important;
}
.introjs-overlay {
  background-color: #ffffff !important;
}
.introjs-tooltip {
  border: 2px solid #283877 !important;
  border-radius: 11px !important;
  background: #fcfdff 0% 0% no-repeat padding-box !important;
  /* min-width: 460px !important; */
  /* max-width: 500px !important; */
}
.introjs-arrow.left {
  background: url(/img/Group3.svg);
}
.introjs-tooltiptext {
  font-family: rubik !important;
  margin-bottom: -1.52rem;
}
.sidebar::-webkit-scrollbar {
  max-height: 20px;
  width: 5px !important;
  border-radius: 10px;
}
.sidebar::-webkit-scrollbar-thumb {
  background: #273679 !important;
  border-radius: 10px;
}
</style>
<style src="./introjs.css">
</style>