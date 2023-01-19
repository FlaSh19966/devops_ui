<template>
  <div class="dash-cont">
    <div class="spinner" id="spinner" v-show="spinnerOn"></div>
    <div class="container-fluid">
      <div class="card dash-card">
        <!-- <div class="card-header d-block d-sm-flex flex-wrap justify-content-between">
          <h4 class="mb-sm-0">Dashboard</h4>
        </div>-->
        <div class="card-body">
          <div class="col-sm-12" style="padding: 0.3rem;">
            <ul
              class="nav nav-tabs mb-3"
              id="myTab"
              role="tablist"
              @mouseenter="scrolled"
              @mouseleave="scroll_enable"
            >
              <li class="nav-item">
                <a
                  class="nav-link pl-5 pr-5 active"
                  id="search-tab"
                  data-toggle="tab"
                  href="#search"
                  role="tab"
                  aria-controls="search"
                  @click="view_component_name='search'"
                >Search</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link pl-5 pr-5"
                  id="reports-tab"
                  data-toggle="tab"
                  href="#reports"
                  role="tab"
                  aria-controls="reports"
                  @click="view_component_name='reports'"
                >Reports</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link pl-5 pr-5"
                  id="config-tab"
                  data-toggle="tab"
                  href="#config"
                  role="tab"
                  aria-controls="config"
                  aria-selected="false"
                  @click="view_component_name='config'"
                >Config</a>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade active show"
                id="search"
                role="tabpanel"
                aria-labelledby="search-tab"
              >
                <!-- <template v-if="view_component_name==='search'"> -->
                <bi-dashboard v-show="view_component_name==='search'" />
                <!-- </template> -->
              </div>
              <div class="tab-pane fade" id="reports" role="tabpanel" aria-labelledby="reports-tab">
                <template v-if="view_component_name==='reports'">
                <transition name="fade" mode="out-in">
                <analytics-report v-show="view_component_name === 'reports'" />
                </transition>
                </template>
              </div>
              <div class="tab-pane fade" id="config" role="tabpanel" aria-labelledby="config-tab">
                <!-- <template v-if="view_component_name==='config'"> -->
                <file-upload v-show="view_component_name==='config'" />
                <!-- </template> -->
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BiDashboard from "./Bidashboard.vue";
import AnalyticsConfigV2 from "@/portal/analytics/AnalyticsConfigV2.vue";
import AnalyticsReportsTab from "@/portal/analytics/AnalyticsReportsTab.vue";
import { BIconSearch } from "bootstrap-vue";

export default {
  name: 'AnalyticsDashboardLayout',
  components: {
    BiDashboard,
    "file-upload": AnalyticsConfigV2,
    "analytics-report": AnalyticsReportsTab,
  },
  data() {
    return {
      spinnerOn: false,
      view_component_name: "search",
      keys: { 37: 1, 38: 1, 39: 1, 40: 1 },
      wheelOpt: null,
      wheelEvent: null,
      tabs_sequence: ['search', 'reports', 'config' ]
    };
  },
  created() {
    //  this.view_component_name = 'search';
    //  console.log($("#search-tab"));
    // $("#search-tab").click();
  },
  mounted() {
    // Scroll Between Tabs with scrollbar
    const vm = this;
    var supportsPassive = false;
    try {
      window.addEventListener(
        "test",
        null,
        Object.defineProperty({}, "passive", {
          get: function () {
            supportsPassive = true;
          },
        })
      );
    } catch (e) {}

    this.wheelOpt = supportsPassive ? { passive: false } : false;
    this.wheelEvent =
      "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

    document
      .getElementById("myTab")
      .addEventListener("wheel", function (event) {
        if (event.deltaY > 0) {
          let current_tab_index = vm.tabs_sequence.indexOf(vm.view_component_name);
          if(!(current_tab_index + 1 > vm.tabs_sequence.length -1)){
            vm.view_component_name = vm.tabs_sequence[current_tab_index + 1];
            $("#"+vm.view_component_name+"-tab").click();

          }
        } else if (event.deltaY < 0) {
          let current_tab_index = vm.tabs_sequence.indexOf(vm.view_component_name);
          // console.log(current_tab_index-1);
          if(current_tab_index-1 >= 0){
            vm.view_component_name = vm.tabs_sequence[current_tab_index - 1];
            $("#"+vm.view_component_name+"-tab").click();
          }
          // if (vm.view_component_name === "config") {
          //   vm.view_component_name = "search";
          //   $("#search-tab").click();
          // }
        }
      });
  },
  methods: {
    scrolled() {
      this.disableScroll();
    },
    scroll_enable() {
      this.enableScroll();
    },
    preventDefault(e) {
      e.preventDefault();
    },
    preventDefaultForScrollKeys(e) {
      const vm = this;
      if (vm.keys[e.keyCode]) {
        this.preventDefault(e);
        return false;
      }
    },
    disableScroll() {
      const vm = this;
      window.addEventListener("DOMMouseScroll", vm.preventDefault, false); // older FF
      window.addEventListener(vm.wheelEvent, vm.preventDefault, vm.wheelOpt); // modern desktop
      window.addEventListener("touchmove", vm.preventDefault, vm.wheelOpt); // mobile
      window.addEventListener("keydown", vm.preventDefaultForScrollKeys, false);
    },
    enableScroll() {
      const vm = this;
      window.removeEventListener("DOMMouseScroll", vm.preventDefault, false);
      window.removeEventListener(vm.wheelEvent, vm.preventDefault, vm.wheelOpt);
      window.removeEventListener("touchmove", vm.preventDefault, vm.wheelOpt);
      window.removeEventListener(
        "keydown",
        vm.preventDefaultForScrollKeys,
        false
      );
    },
  },
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.45s ease-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>