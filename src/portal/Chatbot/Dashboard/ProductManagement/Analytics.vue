<template>
  <div class="dash-cont" style="margin-left: 0px; padding: 0px;">
    <div class="container-fluid" style="padding: 0px;">
    <!-- <iframe width="1020" height="800" src="https://datastudio.google.com/embed/reporting/4459fc44-46a9-431e-b601-3a91639557d2/page/1M" frameborder="0" style="border:0" allowfullscreen></iframe> -->
  <div class="dash-card">
    <div class="card-header" style="padding-left: 0px">
      <h1>Google Analytics</h1>
    </div>
  <div id="analytics_page" class="card-body" style="padding: 0px;">
  <template v-if="!isSignedIn" style="height: 600px;">
    <div class="col-sm-12 p-0">
    <h5 style="margin-bottom: 25px;">Please Sign-In to your Google Analytics Account by clicking below button.</h5>
    <a id="auth-button" style="cursor: pointer;"></a>
    <div class="ViewSelector d-flex mb-3" id="view-selector-container"></div>
    </div>
  </template>
  <template v-else>
    <div class="col-sm-12 d-flex p-0">
      <div style="font-size: 20px; font-weight: bold;">Welcome, {{username}}</div>
      <div class="ml-auto">
        <button @click="logout()" class="darkblue-btn" id="signout-button" style="cursor: pointer; font-size: 1rem; padding: 6px 15px;">Sign Out</button>
      </div>
    </div>
    <hr>
    <!-- <div id="view-name"></div> -->
    <div class="col-sm-12 d-flex mt-4 p-0">
      <div class="ViewSelector d-flex mb-3" id="view-selector-container"></div>
      <div class="card-act d-flex ml-auto">
        <div class="form-group mb-0">
          <select
            class="form-control"
            @change="chart_dropdown"
            id="exampleFormControlSelect1"
          >
            <option value="Last 7 days">Last 7 days</option>
            <option value="Last 30 days">Last 30 days</option>
            <option value="Last 3 months">Last 3 months</option>
            <option value="Last 9 months">Last 9 months</option>
            <option value="Last 12 months">Last 12 months</option>
          </select>
        </div>
      </div>
    </div>
    <hr />
    <div
      class="grid-container"
      style="
        display: grid;
        grid-template-columns: auto auto;
        grid-column-gap: 20px;
        grid-row-gap: 20px;
        backgroud-color: #c8c8c8;
      "
    >
      <div class="grid-item">
        <h1 class="Titles-main">Active User Trend</h1>
        <p class="Titles-sub">{{ range }}</p>
        <div id="activeuser-container"></div>
      </div>
      <div class="grid-item">
        <h1 class="Titles-main">Top Devices</h1>
        <p class="Titles-sub">{{ range }}
          <a @click="download_report('usersbydevice')" style="cursor: pointer;">
          <img src="/img/download_file.png" title="Download report" style="width: 4%; margin-left: auto" alt />
        </a></p>
        <div id="device-chart"></div>
      </div>
      <div class="grid-item">
        <h1 class="Titles-main">Traffic Source</h1>
        <p class="Titles-sub">{{ range }}
          <a @click="download_report('usersbysource')" style="cursor: pointer;">
          <img src="/img/download_file.png" title="Download report" style="width: 4%; margin-left: auto" alt />
        </a></p>
        <div id="source-chart"></div>
      </div>
      <div class="grid-item">
        <h1 class="Titles-main">Most viewed Pages</h1>
        <p class="Titles-sub" style="margin-bottom: 25px">{{ range }}
          <a @click="download_report('usersbypageview')" style="cursor: pointer;">
          <img src="/img/download_file.png" title="Download report" style="width: 4%; margin-left: auto" alt />
        </a></p>
        <div id="pageview-container"></div>
      </div>
    </div>
    <div>
        <h1 class="Titles-main">Users by City</h1>
        <p class="Titles-sub">{{ range }}
        <a @click="download_report('usersbycity')" style="cursor: pointer;">
          <img src="/img/download_file.png" title="Download report" style="width: 2%; margin-left: auto" alt />
        </a></p>
        <div id="country-chart"></div>
      </div>
    <!-- <div id="activeuser-container"></div>
    <div id="pageview-container"></div>
    <div id="device-chart"></div>
    <div id="source-chart"></div> -->
    <!-- <div id="country-chart"></div> -->
  </template>
  </div>
  </div>
  </div>
  </div>
</template>
<script>
import swal from 'sweetalert2';
import { freeze_portal } from "@/portal/mixins";

// import("../ProductManagement/AnalyticsImports/view-selector2.js");
// import("../ProductManagement/AnalyticsImports/date-range-selector.js");
export default {
  name: "AnalyticsPage",
  mixins: [
    freeze_portal,
  ],
  data() {
    return {
      chart_dropdown_value: "7daysAgo",
      range: "Last 7 days",
      newIds: null,
      isSignedIn: false,
      username: "",
      timepass: '',
      usersbycity_download: null,
      usersbydevice_download: null,
      usersbypageview_download: null,
      usersbysource_download: null,
    };
  },
  created() {},
  mounted() {
    setTimeout(() => {
      this.freeze_portal();
    }, 1000);    
    const vm = this;
    // var client_id = "386372534756-ot9ncbarelh6lqefm6sa2jgq9d387von.apps.googleusercontent.com";

    gapi.analytics.ready(function () {
      //   gapi.analytics.auth.authorize(
      //   {
      //   container: "auth-button",
      //   userInfoLabel: "Welcome ",
      //   clientid: client_id,
      // });

      // Step 4: Create the view selector.
     var viewSelector = new gapi.analytics.ViewSelector({
        container: "view-selector-container",
      });

    var check = gapi.analytics.auth.isAuthorized();
    if(check != false){
      var user = gapi.analytics.auth.getUserProfile()
      vm.username = user.name;
      viewSelector.execute();
      vm.isSignedIn = true;
    }else {
      vm.login();
    }
      // Step 5: Create the chart.
      // A method is called while excuting viewSelector for Charts

      var deviceQuery = new gapi.analytics.report.Data({
        query: {
          "start-date": vm.chart_dropdown_value,
          "end-date": "today",
          metrics: "ga:sessions",
          dimensions: "ga:deviceCategory",
        },
      });

      deviceQuery.on("success", function (response) {
        // console.log("deviceQuery", response);
        vm.usersbydevice_download = response;
      });

      var pageviewQuery = new gapi.analytics.report.Data({
        query: {
          "start-date": vm.chart_dropdown_value,
          "end-date": "today",
          metrics:
            "ga:pageviews,ga:timeOnPage",
          sort: "-ga:pageviews",
          dimensions: "ga:pagePath",
          "max-results": 10,
        },
      });

      pageviewQuery.on("success", function (response) {
        // console.log("pageviewQuery", response);
        vm.usersbypageview_download = response;
      });

      var activeusersQuery = new gapi.analytics.report.Data({
        query: {
          "start-date": "90daysAgo",
          "end-date": "today",
          metrics: "ga:users",
          dimensions: "ga:date",
          "max-results": 10,
        },
      });

      activeusersQuery.on("success", function (response) {
        // console.log("activeusersQuery", response);
      });

      var countrycityQuery = new gapi.analytics.report.Data({
        query: {
          "start-date": vm.chart_dropdown_value,
          "end-date": "today",
          metrics: "ga:users",
          dimensions: "ga:country, ga:city",
          sort: "-ga:users"
        },
      });

      countrycityQuery.on("success", function (response) {
        // console.log("countrycityQuery", response);
        vm.usersbycity_download = response;
      });

      var sourceQuery = new gapi.analytics.report.Data({
        query: {
          "start-date": vm.chart_dropdown_value,
          "end-date": "today",
          metrics: "ga:users",
          dimensions: "ga:source",
          sort: "-ga:users",
          "max-results": 10,
        },
      });

      sourceQuery.on("success", function (response) {
        // console.log("sourceQuery", response);
        vm.usersbysource_download = response
      });

      // Step 6: Hook up the components to work together.
      gapi.analytics.auth.on("success", function (response) {
        var user = gapi.analytics.auth.getUserProfile();
        vm.username = user.name;
        viewSelector.execute();
        vm.isSignedIn = true;
      });
      viewSelector.on("change", function (ids) {
        vm.newIds = {
          query: {
            ids: ids,
          },
        };        
        vm.chart_dropdown();

        deviceQuery.set(vm.newIds).execute();
        pageviewQuery.set(vm.newIds).execute();
        // activeusersQuery.set(vm.newIds).execute();
        countrycityQuery.set(vm.newIds).execute();
        sourceQuery.set(vm.newIds).execute();
      });
    });
  },
  methods: {
    download_report(type){
      this.spinnerOn = true;
      var rows = [];
      var filename = "";

      if(type == 'usersbydevice'){
        var data = this.usersbydevice_download;
        var csv = 'DeviceCategory,Session\n';
        filename = "Users by Device category report.csv";
      }else if(type == 'usersbysource'){
        var data = this.usersbysource_download;
        var csv = 'Source,UsersCount\n';
        filename = "Users by Source report.csv";
      }else if(type == 'usersbycity'){
        var data = this.usersbycity_download;
        var csv = 'Country,City,UsersCount\n';  
        filename = "Users by City report.csv";
      }else if(type == 'usersbypageview'){
        var data = this.usersbypageview_download;
        var csv = 'PagePath,PageView,TimeOnPage\n'; 
        filename = "Users by Page view report.csv";
      }
      for(var i in data.rows){
        rows.push(data.rows[i]);
      }
    rows.forEach(function(row) {  
            csv += row.join(',');  
            csv += "\n";  
    });  
     
    var hiddenElement = document.createElement('a');  
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);  
    hiddenElement.target = '_blank';  
    hiddenElement.download = filename;  
    hiddenElement.click();
    this.spinnerOn = false;
    },
    login() {
      var response = new gapi.analytics.auth.authorize(
        {
        container: "auth-button",
        userInfoLabel: "Welcome ",
        clientid: process.env.VUE_APP_G_AUTH,
      });
      // var response = new gapi.analytics.auth.authorize({
      //   serverAuth: {
      //    access_token: temp_access_token
      //   }
      // });
      var render_button = $("#auth-button");
      if(render_button[0].childElementCount == 0){
        swal({
                text:
                  "Refresh the page to access the Analytics",
                type: "info",
                showConfirmButton: true,
                showCancelButton: true,
                cancelButtonColor: "#d33",
              }).then(result => {
                if(result.value){
                  this.$router.go();
                }
              });
      }
      response.on("needsAuthorization", function () {
        this.isSignedIn = false;
      });
      response.on("signIn", function () {
        this.isSignedIn = true;
      });
      response.on("error", function () {
        this.isSignedIn = false;
      });
    },
    logout() {
      var response = gapi.analytics.auth.signOut();
      // console.log(response);
      response.on("signOut", function (response) {
        this.isSignedIn = false;
      });
      this.$router.go();

    },
    chart_dropdown() {
      if (event.target.value == "Last 7 days") {
        this.range = event.target.value;
        this.chart_dropdown_value = "7daysAgo";
      } else if (event.target.value == "Last 30 days") {
        this.range = event.target.value;
        this.chart_dropdown_value = "30daysAgo";
      } else if (event.target.value == "Last 3 months") {
        this.range = event.target.value;
        this.chart_dropdown_value = "90daysAgo";
      } else if (event.target.value == "Last 9 months") {
        this.range = event.target.value;
        this.chart_dropdown_value = "180daysAgo";
      } else if (event.target.value == "Last 12 months") {
        this.range = event.target.value;
        this.chart_dropdown_value = "365daysAgo";
      }
      if (event.target.value == undefined) {
        this.range = "Last 7 days";
      }

      var activeuserChart = new gapi.analytics.googleCharts.DataChart({
        // reportType: 'ga',
        query: {
          "start-date": this.chart_dropdown_value,
          "end-date": "today",
          metrics: "ga:sessions,ga:users",
          dimensions: "ga:date",
        },
        chart: {
          container: "activeuser-container",
          type: "LINE",
          options: { width: "500", height: "450" },
        },
      });
      var pageviewChart = new gapi.analytics.googleCharts.DataChart({
        // reportType: 'ga',
        query: {
          "start-date": this.chart_dropdown_value,
          "end-date": "today",
          metrics: "ga:pageviews,ga:avgTimeOnPage",
          sort: "-ga:pageviews",
          dimensions: "ga:pagePath",
          "max-results": 5,
        },
        chart: {
          container: "pageview-container",
          type: "TABLE",
          options: { width: "540", height: "450" },
        },
      });

      var deviceChart = new gapi.analytics.googleCharts.DataChart({
        query: {
          "start-date": this.chart_dropdown_value,
          "end-date": "today",
          metrics: "ga:users",
          dimensions: "ga:deviceCategory",
        },
        chart: {
          container: "device-chart",
          type: "PIE",
          options: {
            width: "450",
            height: "450",
            pieHole: 0.4,
          },
        },
      });

      var sourceChart = new gapi.analytics.googleCharts.DataChart({
        query: {
          "start-date": this.chart_dropdown_value,
          "end-date": "today",
          metrics: "ga:users, ga:sessions",
          dimensions: "ga:source",
          sort: "-ga:users",
          "max-results": 4,
        },
        chart: {
          container: "source-chart",
          type: "COLUMN",
          options: { width: "500", height: "560" },
        },
      });

      var countrycityChart = new gapi.analytics.googleCharts.DataChart({
        query: {
          "start-date": this.chart_dropdown_value,
          "end-date": "today",
          metrics: "ga:users",
          dimensions: "ga:city",
          sort: "-ga:users",
          "max-results": 10
        },
        chart: {
          container: "country-chart",
          type: "COLUMN",
          options: {
            width: "100%", height: "400",
          // region: "IN",
          // resolution: 'provinces',
          // displayMode: "markers",
        },
        }
      });
      // console.log(this.newIds);
      activeuserChart.set(this.newIds).execute();
      pageviewChart.set(this.newIds).execute();
      deviceChart.set(this.newIds).execute();
      sourceChart.set(this.newIds).execute();
      countrycityChart.set(this.newIds).execute();
    },
  },
};
</script>
<style scoped>
.Titles-main {
  font-size: 1.4em;
}
.Titles-sub {
  margin: 0;
}
</style>