<template>
  <div id="StackedBarChart">
  </div>
</template>

<script>
const d3 = require("d3-3");
export default {
    name: "StackedBarChart",
    props: {
        data: Array,
        xKey: String,
        yKey: String,
        date_column: String,  
        // secondary_col: String,
    },
  mounted () {
    var vm = this;
    var margin = {top: 60, right: 160, bottom: 65, left: 30};

    var width = 960 - margin.left - margin.right,
        height = 750 - margin.top - margin.bottom;

    var svg = d3.select("#StackedBarChart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    /* Data in strings like it would be if imported from a csv */
    var api_data = 
    [
            {"SALES":1340.450419999999,"YEAR":"2016","DATENEW":"Thu, 17 Mar 2016 10:18:47 GMT","CATEGORY":"Stonefruits","MONTH":"03"},
            {"SALES":170.90194000000005,"YEAR":"2016","DATENEW":"Thu, 17 Mar 2016 11:53:12 GMT","CATEGORY":"Cucumbers","MONTH":"03"},
            {"SALES":74.79999999999998,"YEAR":"2016","DATENEW":"Fri, 18 Mar 2016 12:13:55 GMT","CATEGORY":"Sri Lankan Groceries","MONTH":"03"},
            {"SALES":62.93936000000001,"YEAR":"2016","DATENEW":"Sat, 19 Mar 2016 19:42:10 GMT","CATEGORY":"Veggies","MONTH":"03"},
            {"SALES":218.4778800000001,"YEAR":"2016","DATENEW":"Sun, 20 Mar 2016 17:12:06 GMT","CATEGORY":"Mushrooms","MONTH":"03"},
            {"SALES":262.5995236363638,"YEAR":"2016","DATENEW":"Sun, 20 Mar 2016 17:34:22 GMT","CATEGORY":"Tropical Fruits","MONTH":"03"},
            {"SALES":69.59320000000001,"YEAR":"2016","DATENEW":"Sun, 20 Mar 2016 19:02:15 GMT","CATEGORY":"Cabbages","MONTH":"03"},
            {"SALES":671.8349600000005,"YEAR":"2016","DATENEW":"Wed, 23 Mar 2016 01:04:06 GMT","CATEGORY":"Bananas","MONTH":"03"},
            {"SALES":116.20128545454547,"YEAR":"2016","DATENEW":"Wed, 23 Mar 2016 01:35:13 GMT","CATEGORY":"Nuts","MONTH":"03"},
            {"SALES":295.2000000000002,"YEAR":"2016","DATENEW":"Wed, 23 Mar 2016 04:31:17 GMT","CATEGORY":"Avocadoes","MONTH":"03"},
            {"SALES":47.5,"YEAR":"2016","DATENEW":"Thu, 24 Mar 2016 03:13:07 GMT","CATEGORY":"Herbs","MONTH":"03"},
            {"SALES":169.20256000000003,"YEAR":"2016","DATENEW":"Thu, 24 Mar 2016 04:12:32 GMT","CATEGORY":"Pumpkins","MONTH":"03"},
            {"SALES":307.6499999999997,"YEAR":"2016","DATENEW":"Thu, 24 Mar 2016 04:43:59 GMT","CATEGORY":"Eggs","MONTH":"03"},
            {"SALES":975.1200545454553,"YEAR":"2016","DATENEW":"Thu, 24 Mar 2016 05:22:50 GMT","CATEGORY":"Other Vegies","MONTH":"03"},{"SALES":112.4447,"YEAR":"2016","DATENEW":"Fri, 25 Mar 2016 01:48:45 GMT","CATEGORY":"Chillies","MONTH":"03"},{"SALES":597.0905363636365,"YEAR":"2016","DATENEW":"Fri, 25 Mar 2016 03:28:03 GMT","CATEGORY":"Citrus","MONTH":"03"},{"SALES":166.812,"YEAR":"2016","DATENEW":"Fri, 25 Mar 2016 03:50:08 GMT","CATEGORY":"carrots","MONTH":"03"},{"SALES":360.92106,"YEAR":"2016","DATENEW":"Fri, 25 Mar 2016 04:41:19 GMT","CATEGORY":"capsicum","MONTH":"03"},{"SALES":57.88363636363637,"YEAR":"2016","DATENEW":"Sat, 26 Mar 2016 22:51:27 GMT","CATEGORY":"Other Fruits","MONTH":"03"},{"SALES":884.4411199999997,"YEAR":"2016","DATENEW":"Sat, 26 Mar 2016 23:37:38 GMT","CATEGORY":"Potatoes","MONTH":"03"},{"SALES":304.92546000000004,"YEAR":"2016","DATENEW":"Sun, 27 Mar 2016 00:25:07 GMT","CATEGORY":"Pears","MONTH":"03"},{"SALES":303.2260000000004,"YEAR":"2016","DATENEW":"Sun, 27 Mar 2016 00:28:50 GMT","CATEGORY":"Bunch Vegies","MONTH":"03"},{"SALES":620.6673999999997,"YEAR":"2016","DATENEW":"Sun, 27 Mar 2016 01:08:03 GMT","CATEGORY":"Tomatoes","MONTH":"03"},{"SALES":629.8516800000004,"YEAR":"2016","DATENEW":"Sun, 27 Mar 2016 01:45:58 GMT","CATEGORY":"Apples","MONTH":"03"},{"SALES":372.82099999999923,"YEAR":"2016","DATENEW":"Sun, 27 Mar 2016 03:38:16 GMT","CATEGORY":"Lettuces","MONTH":"03"},{"SALES":154.485,"YEAR":"2016","DATENEW":"Sun, 27 Mar 2016 23:08:40 GMT","CATEGORY":"Multi buy","MONTH":"03"},{"SALES":387.9157999999999,"YEAR":"2016","DATENEW":"Mon, 28 Mar 2016 02:15:11 GMT","CATEGORY":"Melons","MONTH":"03"},{"SALES":180.2172727272728,"YEAR":"2016","DATENEW":"Mon, 28 Mar 2016 22:59:34 GMT","CATEGORY":"Olympian Products","MONTH":"03"},{"SALES":633.3682436363638,"YEAR":"2016","DATENEW":"Mon, 28 Mar 2016 23:57:28 GMT","CATEGORY":"Onions","MONTH":"03"},{"SALES":854.30096,"YEAR":"2016","DATENEW":"Wed, 30 Mar 2016 03:02:09 GMT","CATEGORY":"Grapes","MONTH":"03"},{"SALES":108.0,"YEAR":"2016","DATENEW":"Wed, 30 Mar 2016 04:15:59 GMT","CATEGORY":"Flowers","MONTH":"03"},{"SALES":87.10741999999999,"YEAR":"2016","DATENEW":"Wed, 30 Mar 2016 21:40:15 GMT","CATEGORY":"Root Vegies","MONTH":"03"},{"SALES":73.7,"YEAR":"2016","DATENEW":"Thu, 31 Mar 2016 00:23:50 GMT","CATEGORY":"Cut Veggies","MONTH":"03"},{"SALES":216.50410000000002,"YEAR":"2016","DATENEW":"Thu, 31 Mar 2016 01:27:43 GMT","CATEGORY":"Asian Vegies","MONTH":"03"},{"SALES":167.87999999999997,"YEAR":"2016","DATENEW":"Thu, 31 Mar 2016 01:59:07 GMT","CATEGORY":"Berries","MONTH":"03"},
            {"SALES":602.2259454545458,"YEAR":"2016","DATENEW":"Fri, 01 Apr 2016 00:26:23 GMT","CATEGORY":"Citrus","MONTH":"04"},
            {"SALES":964.0527800000008,"YEAR":"2016","DATENEW":"Fri, 01 Apr 2016 00:41:01 GMT","CATEGORY":"Other Vegies","MONTH":"04"},
            {"SALES":107.87999999999998,"YEAR":"2016","DATENEW":"Fri, 01 Apr 2016 04:50:24 GMT","CATEGORY":"Cabbages","MONTH":"04"},
            {"SALES":86.5556,"YEAR":"2016","DATENEW":"Fri, 01 Apr 2016 04:50:24 GMT","CATEGORY":"Root Vegies","MONTH":"04"},
            {"SALES":675.9299000000002,"YEAR":"2016","DATENEW":"Fri, 01 Apr 2016 04:55:24 GMT","CATEGORY":"Bananas","MONTH":"04"},
            {"SALES":197.20808000000005,"YEAR":"2016","DATENEW":"Fri, 01 Apr 2016 08:06:26 GMT","CATEGORY":"Asian Vegies","MONTH":"04"},
            {"SALES":108.0,"YEAR":"2016","DATENEW":"Fri, 01 Apr 2016 21:52:12 GMT","CATEGORY":"Flowers","MONTH":"04"},
            {"SALES":15.200000000000003,"YEAR":"2016","DATENEW":"Sat, 02 Apr 2016 00:22:14 GMT","CATEGORY":"Sri Lankan Groceries","MONTH":"04"},
            {"SALES":118.63200000000009,"YEAR":"2016","DATENEW":"Sat, 02 Apr 2016 00:22:14 GMT","CATEGORY":"carrots","MONTH":"04"},
            {"SALES":129.0,"YEAR":"2016","DATENEW":"Sun, 03 Apr 2016 00:00:52 GMT","CATEGORY":"Multi buy","MONTH":"04"},
            {"SALES":174.17508000000004,"YEAR":"2016","DATENEW":"Sun, 03 Apr 2016 00:00:52 GMT","CATEGORY":"capsicum","MONTH":"04"},{"SALES":230.56272727272733,"YEAR":"2016","DATENEW":"Sun, 03 Apr 2016 00:34:19 GMT","CATEGORY":"Olympian Products","MONTH":"04"},{"SALES":96.84614727272728,"YEAR":"2016","DATENEW":"Sun, 03 Apr 2016 00:37:49 GMT","CATEGORY":"Nuts","MONTH":"04"},{"SALES":439.10896545454534,"YEAR":"2016","DATENEW":"Sun, 03 Apr 2016 01:42:18 GMT","CATEGORY":"Tomatoes","MONTH":"04"},{"SALES":512.0569200000001,"YEAR":"2016","DATENEW":"Sun, 03 Apr 2016 02:44:59 GMT","CATEGORY":"Grapes","MONTH":"04"},{"SALES":151.0479,"YEAR":"2016","DATENEW":"Sun, 03 Apr 2016 02:53:00 GMT","CATEGORY":"Pumpkins","MONTH":"04"},{"SALES":43.0,"YEAR":"2016","DATENEW":"Sun, 03 Apr 2016 02:53:00 GMT","CATEGORY":"Cut Veggies","MONTH":"04"},{"SALES":137.80607999999995,"YEAR":"2016","DATENEW":"Sun, 03 Apr 2016 06:09:50 GMT","CATEGORY":"Cucumbers","MONTH":"04"},{"SALES":119.0145,"YEAR":"2016","DATENEW":"Mon, 04 Apr 2016 01:18:00 GMT","CATEGORY":"Chillies","MONTH":"04"},{"SALES":276.1008799999999,"YEAR":"2016","DATENEW":"Mon, 04 Apr 2016 01:46:01 GMT","CATEGORY":"Mushrooms","MONTH":"04"},{"SALES":202.88474000000008,"YEAR":"2016","DATENEW":"Mon, 04 Apr 2016 03:52:08 GMT","CATEGORY":"Melons","MONTH":"04"},{"SALES":131.35276,"YEAR":"2016","DATENEW":"Tue, 05 Apr 2016 01:46:42 GMT","CATEGORY":"Tropical Fruits","MONTH":"04"},{"SALES":90.55818181818181,"YEAR":"2016","DATENEW":"Tue, 05 Apr 2016 04:01:07 GMT","CATEGORY":"Other Fruits","MONTH":"04"},{"SALES":187.63225999999992,"YEAR":"2016","DATENEW":"Tue, 05 Apr 2016 04:49:26 GMT","CATEGORY":"Pears","MONTH":"04"},{"SALES":496.3780800000003,"YEAR":"2016","DATENEW":"Tue, 05 Apr 2016 05:00:29 GMT","CATEGORY":"Onions","MONTH":"04"},{"SALES":20.44174,"YEAR":"2016","DATENEW":"Tue, 05 Apr 2016 22:36:34 GMT","CATEGORY":"Veggies","MONTH":"04"},{"SALES":642.8219400000002,"YEAR":"2016","DATENEW":"Wed, 06 Apr 2016 02:16:13 GMT","CATEGORY":"Potatoes","MONTH":"04"},{"SALES":275.8000000000002,"YEAR":"2016","DATENEW":"Wed, 06 Apr 2016 03:26:52 GMT","CATEGORY":"Avocadoes","MONTH":"04"},{"SALES":39.96,"YEAR":"2016","DATENEW":"Wed, 06 Apr 2016 03:27:58 GMT","CATEGORY":"Groceries-Dry Goods","MONTH":"04"},{"SALES":618.9657799999997,"YEAR":"2016","DATENEW":"Wed, 06 Apr 2016 04:47:53 GMT","CATEGORY":"Stonefruits","MONTH":"04"},{"SALES":348.5120000000002,"YEAR":"2016","DATENEW":"Thu, 07 Apr 2016 02:45:13 GMT","CATEGORY":"Lettuces","MONTH":"04"},{"SALES":293.10000000000025,"YEAR":"2016","DATENEW":"Thu, 07 Apr 2016 03:24:48 GMT","CATEGORY":"Bunch Vegies","MONTH":"04"},{"SALES":227.34999999999985,"YEAR":"2016","DATENEW":"Fri, 08 Apr 2016 01:04:44 GMT","CATEGORY":"Eggs","MONTH":"04"},{"SALES":138.97199999999998,"YEAR":"2016","DATENEW":"Fri, 08 Apr 2016 04:21:54 GMT","CATEGORY":"Herbs","MONTH":"04"},{"SALES":502.37238000000025,"YEAR":"2016","DATENEW":"Sat, 09 Apr 2016 03:34:50 GMT","CATEGORY":"Apples","MONTH":"04"},{"SALES":74.27000000000001,"YEAR":"2016","DATENEW":"Sat, 09 Apr 2016 04:22:37 GMT","CATEGORY":"Berries","MONTH":"04"},{"SALES":2.0,"YEAR":"2016","DATENEW":"Sat, 09 Apr 2016 04:22:37 GMT","CATEGORY":"Cut Fruits","MONTH":"04"}
    ];

    var data_form = api_data
    var categories = api_data.reduce((r,i) => (((r[i.CATEGORY] = r[i.CATEGORY] || [] ).push({
      categorie : i.CATEGORY
    }), r)), {} );
    console.log(categories);
    var category_list = Object.keys(categories); 
    console.log(category_list);
    var map = api_data.reduce((r, i) => (((r[i.MONTH] = r[i.MONTH] || []).push({
      category: i.CATEGORY,
      values: i.SALES
    }), r)), {});
    console.log(map);
    var entries = Object.entries(map);
    console.log(entries)

    var second_data = [];
      for(let i =0; i < entries.length; i++) {
        second_data.push({
          label : entries[i][0],
          // data: [],
        })
        for(let j =0 ; j < entries[i][1].length; j++) {
          var x = Object.values(entries[i][1][j]);
          var a = x[0],
            b = x[1];
          second_data[i][a] = b;
            // second_data.concat({
          //   [a] : b
          //   // date: entries[i][1][j].date,
          //   // sales: entries[i][1][j].sales
          //   // entries[i][1][j].CATEGORY : entries[i][1][j].CATEGORY
          // })
        }
      }
    // console.log("second og data",second_data)
   
   
   
    console.log(this.data);
    console.log(this.date_column);
    var categories = this.data.reduce((r,i) => (((r[i[vm.xKey]] = r[i[vm.xKey]] || [] ).push({
      categorie : i[vm.xKey]
    }), r)), {} );
    console.log(categories);
    var category_list = Object.keys(categories); 
    console.log(category_list);
    var map = this.data.reduce((r, i) => (((r[i[vm.date_column]] = r[i[vm.date_column]] || []).push({
      category: i[vm.xKey],
      values: i[vm.yKey]
    }), r)), {});
    // console.log(map);S
    var entries = Object.entries(map);
    // console.log(entries)
     var second_data = [];
      for(let i =0; i < entries.length; i++) {
        second_data.push({
          label : entries[i][0],
        })
        for(let j =0 ; j < entries[i][1].length; j++) {
          var x = Object.values(entries[i][1][j]);
          var a = x[0],
            b = x[1];
          second_data[i][a] = b;
        }
      }
    console.log("second data",second_data)



    var data = [
    { year: "2006", redDelicious: "10", mcintosh: "15", oranges: "9", pears: "6" },
    { year: "2007", redDelicious: "12", mcintosh: "18", oranges: "9", pears: "4" },
    { year: "2008", redDelicious: "05", mcintosh: "20", oranges: "8", pears: "2" },
    { year: "2009", redDelicious: "01", mcintosh: "15", oranges: "5", pears: "4" },
    { year: "2010", redDelicious: "02", mcintosh: "10", oranges: "4", pears: "2" },
    { year: "2011", redDelicious: "03", mcintosh: "12", oranges: "6", pears: "3" },
    { year: "2012", redDelicious: "04", mcintosh: "15", oranges: "8", pears: "1" },
    { year: "2013", redDelicious: "06", mcintosh: "11", oranges: "9", pears: "4" },
    { year: "2014", redDelicious: "10", mcintosh: "13", oranges: "9", pears: "5" },
    { year: "2015", redDelicious: "16", mcintosh: "19", oranges: "6", pears: "9" },
    { year: "2016", redDelicious: "19", mcintosh: "17", oranges: "5", pears: "7" },
    ];
    data = [];
    data = second_data;
    // if()

    var parse = d3.time.format("%m").parse;


    // Transpose the data into layers
    var dataset = d3.layout.stack()(Object.keys(categories).map(function(fruit) {
    return data.map(function(d) {
        return {x: parse(d.label), y: +d[fruit]};
    });
    }));
    // console.log(dataset);
    for(let i = 0; i < dataset.length; i++) {
      for(let j = 0; j < dataset[i].length; j++){
        var x = Object.values(dataset[i][j]);

        if(Number.isNaN(x[1])) {
          dataset[i] = dataset[i].splice(0,dataset[i][j]);
        }
        if(Number.isNaN(x[2])) {
          dataset[i] = dataset[i].splice(0,dataset[i][j]);
        }
        // console.log(dataset[i]);
      }
    }
    // console.log(dataset);
    // Set x, y and colors
    var x = d3.scale.ordinal()
    .domain(dataset[0].map(function(d) { return d.x; }))
    .rangeRoundBands([10, width-10], 0.1);

    var y = d3.scale.linear()
    .domain([0, d3.max(dataset, function(d) {  return d3.max(d, function(d) { return d.y0 + d.y; });  })])
    .range([height-200, 0]);

    var colors = ["#3957ff", "#d3fe14", "#c9080a", "#fec7f8", "#0b7b3e", "#0bf0e9", "#c203c8", "#fd9b39", "#888593", "#906407", "#98ba7f", "#fe6794", "#10b0ff", "#ac7bff", "#fee7c0", "#964c63", "#1da49c", "#0ad811", "#bbd9fd", "#fe6cfe", "#297192", "#d1a09c", "#78579e", "#81ffad", "#739400", "#ca6949", "#d9bf01", "#646a58", "#d5097e", "#bb73a9", "#ccf6e9", "#9cb4b6", "#b6a7d4", "#9e8c62", "#6e83c8", "#01af64", "#a71afd", "#cfe589", "#d4ccd1", "#fd4109", "#bf8f0e", "#2f786e", "#4ed1a5", "#d8bb7d", "#a54509", "#6a9276", "#a4777a", "#fc12c9", "#606f15", "#3cc4d9", "#f31c4e", "#73616f", "#f097c6", "#fc8772", "#92a6fe", "#875b44", "#699ab3", "#94bc19", "#7d5bf0", "#d24dfe", "#c85b74", "#68ff57", "#b62347", "#994b91", "#646b8c", "#977ab4", "#d694fd", "#c4d5b5", "#fdc4bd", "#1cae05", "#7bd972", "#e9700a", "#d08f5d", "#8bb9e1", "#fde945", "#a29d98", "#1682fb", "#9ad9e0", "#d6cafe", "#8d8328", "#b091a7", "#647579", "#1f8d11", "#e7eafd", "#b9660b", "#a4a644", "#fec24c", "#b1168c", "#188cc1", "#7ab297", "#4468ae", "#c949a6", "#d48295", "#eb6dc2", "#d5b0cb", "#ff9ffb", "#fdb082", "#af4d44", "#a759c4", "#a9e03a", "#0d906b", "#9ee3bd", "#5b8846", "#0d8995", "#f25c58", "#70ae4f", "#847f74", "#9094bb", "#ffe2f1", "#a67149", "#936c8e", "#d04907", "#c3b8a6", "#cef8c4", "#7a9293", "#fda2ab", "#2ef6c5", "#807242", "#cb94cc", "#b6bdd0", "#b5c75d", "#fde189", "#b7ff80", "#fa2d8e", "#839a5f", "#28c2b5", "#e5e9e1", "#bc79d8", "#7ed8fe", "#9f20c3", "#4f7a5b", "#f511fd", "#09c959", "#bcd0ce", "#8685fd", "#98fcff", "#afbff9", "#6d69b4", "#5f99fd", "#aaa87e", "#b59dfb", "#5d809d", "#d9a742", "#ac5c86", "#9468d5", "#a4a2b2", "#b1376e", "#d43f3d", "#05a9d1", "#c38375", "#24b58e", "#6eabaf", "#66bf7f", "#92cbbb", "#ddb1ee", "#1be895", "#c7ecf9", "#a6baa6", "#8045cd", "#5f70f1", "#a9d796", "#ce62cb", "#0e954d", "#a97d2f", "#fcb8d3", "#9bfee3", "#4e8d84", "#fc6d3f", "#7b9fd4", "#8c6165", "#72805e", "#d53762", "#f00a1b", "#de5c97", "#8ea28b", "#fccd95", "#ba9c57", "#b79a82", "#7c5a82", "#7d7ca4", "#958ad6", "#cd8126", "#bdb0b7", "#10e0f8", "#dccc69", "#d6de0f", "#616d3d", "#985a25", "#30c7fd", "#0aeb65", "#e3cdb4", "#bd1bee", "#ad665d", "#d77070", "#8ea5b8", "#5b5ad0", "#76655e", "#598100", "#86757e", "#5ea068", "#a590b8", "#c1a707", "#85c0cd", "#e2cde9", "#dcd79c", "#d8a882", "#b256f9", "#b13323", "#519b3b", "#dd80de", "#f1884b", "#74b2fe", "#a0acd2", "#d199b0", "#f68392", "#8ccaa0", "#64d6cb", "#e0f86a", "#42707a", "#75671b", "#796e87", "#6d8075", "#9b8a8d", "#f04c71", "#61bd29", "#bcc18f", "#fecd0f", "#1e7ac9", "#927261", "#dc27cf", "#979605", "#ec9c88", "#8c48a3", "#676769", "#546e64", "#8f63a2", "#b35b2d", "#7b8ca2", "#b87188", "#4a9bda", "#eb7dab", "#f6a602", "#cab3fe", "#ddb8bb", "#107959", "#885973", "#5e858e", "#b15bad", "#e107a7", "#2f9dad", "#4b9e83", "#b992dc", "#6bb0cb", "#bdb363", "#ccd6e4", "#a3ee94", "#9ef718", "#fbe1d9", "#a428a5", "#93514c", "#487434", "#e8f1b6", "#d00938", "#fb50e1", "#fa85e1", "#7cd40a", "#f1ade1", "#b1485d", "#7f76d6", "#d186b3", "#90c25e", "#b8c813", "#a8c9de", "#7d30fe", "#815f2d", "#737f3b", "#c84486", "#946cfe", "#e55432", "#a88674", "#c17a47", "#b98b91", "#fc4bb3", "#da7f5f", "#df920b", "#b7bbba", "#99e6d9", "#a36170", "#c742d8", "#947f9d", "#a37d93", "#889072", "#9b924c", "#23b4bc", "#e6a25f", "#86df9c", "#a7da6c", "#3fee03", "#eec9d8", "#aafdcb", "#7b9139", "#92979c", "#72788a", "#994cff", "#c85956", "#7baa1a", "#de72fe", "#c7bad8", "#85ebfe", "#6e6089", "#9b4d31", "#297a1d", "#9052c0", "#5c75a5", "#698eba", "#d46222", "#6da095", "#b483bb", "#04d183", "#9bcdfe", "#2ffe8c", "#9d4279", "#c909aa", "#826cae", "#77787c", "#a96fb7", "#858f87", "#fd3b40", "#7fab7b", "#9e9edd", "#bba3be", "#f8b96c", "#7be553", "#c0e1ce", "#516e88", "#be0e5f", "#757c09", "#4b8d5f", "#38b448", "#df8780", "#ebb3a0", "#ced759", "#f0ed7c", "#e0eef1", "#0969d2", "#756446", "#488ea8", "#888450", "#61979c", "#a37ad6", "#b48a54", "#8193e5", "#dd6d89", "#8aa29d", "#c679fe", "#a4ac12", "#75bbb3", "#6ae2c1", "#c4fda7", "#606877", "#b2409d", "#5874c7", "#bf492c", "#4b88cd", "#e14ec0", "#b39da2", "#fb8300", "#d1b845", "#c2d083", "#c3caef", "#967500", "#c56399", "#ed5a05", "#aadff6", "#6685f4", "#1da16f", "#f28bff", "#c9c9bf", "#c7e2a9", "#5bfce4", "#e0e0bf", "#e8e2e8", "#ddf2d8", "#9108f8", "#932dd2", "#c03500", "#aa3fbc", "#547c79", "#9f6045", "#04897b", "#966f32", "#d83212", "#039f27", "#df4280", "#ef206e", "#0095f7", "#a5890d", "#9a8f7f", "#bc839e", "#88a23b", "#e55aed", "#51af9e", "#5eaf82", "#9e91fa", "#f76c79", "#99a869", "#d2957d", "#a2aca6", "#e3959e", "#adaefc", "#5bd14e", "#df9ceb", "#fe8fb1", "#87ca80", "#fc986d", "#2ad3d9", "#e8a8bb", "#a7c79c", "#a5c7cc", "#7befb7", "#b7e2e0", "#85f57b", "#f5d95b", "#dbdbff", "#fddcff", "#6e56bb", "#226fa8", "#5b659c", "#58a10f", "#e46c52", "#62abe2", "#c4aa77", "#b60e74", "#087983", "#a95703", "#2a6efb", "#427d92", ];
    var colors = ["#96caff", "#faff16", "#fda899", "#13fcbb", "#f7fef7", "#eba6ff", "#bcca83", "#57e502", "#feaf23", "#c6c0cb", "#38f1fd", "#9ccfbe", "#f9feae", "#a6fe8e", "#bfcd03", "#ebd3b6", "#fec0df", "#c2eefc", "#cac2fc", "#bcfcd6", "#f4e5ff", "#f9dc56", "#80da93", "#ebb678", "#b1fb27", "#30dfc8", "#8dd0df", "#1ff479", "#cedbd8", "#d2e6b8", "#85feea", "#97db5c", "#deb7b7", "#cad5ef", "#d0eb6d", "#fe9fe1", "#bdc7ad", "#fcdadf", "#d9bae2", "#dac05a", "#ecda91", "#fef5d0", "#ffa4bc", "#43d9fd", "#d2fcf5", "#b1c7d0", "#e6f0fb", "#83e5bd", "#b2e598", "#fdfb73", "#73fd58", "#a6cfa2", "#a1e3e1", "#e4e21c", "#8ef8b0", "#e2c30e", "#fdc7ff", "#cefeb9", "#0be597", "#d4c491", "#fdc5b5", "#e4fdde", "#d5ccc7", "#acdaf8", "#e4c9da", "#fdc664", "#badfc5", "#bbd15f", "#fdf1f7", "#b4c3ed", "#93e8fd", "#ddd9e3", "#e5e5d7", "#98e116", "#e0d0fb", "#fccd95", "#aafdfe", "#5cd9de", "#deba9d", "#dce994", "#d6b2fb", "#c5bedd", "#bec4c3", "#feab79", "#82ea7f", "#fed7f3", "#8affd2", "#d6fc50", "#e8aed9", "#f7b7c2", "#2bf4e5", "#ffad53", "#11ff13", "#d3fe94", "#c2e530", "#aef161", "#fee5d4", "#a3d378", "#dad351", "#fec328", "#a4e3b3", "#a9efd9", "#feeb8a", "#85d4cd", "#e0b4c9", "#55e358", "#bddbe1", "#48ffa0", "#d6eee1", "#fee3b0", "#ff99fd", "#3fe0b0", "#84d7fe", "#7be9d3", "#1bf3cd", "#d4d4af", "#d6d278", "#70fffe", "#aac8e1", "#ffb0fe", "#b5ccbf", "#c6ccd5", "#ccd9c5", "#feee3e", "#cdc0ab", "#58e182", "#e9b8f8", "#f7bc97", "#b4e275", "#bee8e1", "#e1e3ff", "#ebebb2", "#8fd4af", "#c0d3a2", "#e7c67d", "#6ceba9", "#d8cde4", "#eacdc6", "#d4eef1", "#e7e8e9", "#7deaec", "#88f31d", "#c0efbe", "#75d8be", "#a0d1d3", "#fdacd4", "#09f64f", "#c4dc8c", "#d0d1fc", "#ecccf1", "#f7d517", "#d0dde8", "#e7dadc", "#78fe8b", "#e6e373", "#cde5fd", "#b1fead", "#e7fec5", "#e9fdfd", "#b9c3d9", "#cebec1", "#eab3a4", "#edb84a", "#8aea52", "#bad5fd", "#a7ddea", "#f9c9d5", "#f2deec", "#fbf4e7", "#b3d8cf", "#feb9ed", "#96e89d", "#d5d99c", "#efd16f", "#ecfb92", "#d0bbd2", "#89d97b", "#cdc47c", "#acd345", "#21e0f4", "#9ed693", "#9adfcd", "#ccdc4c", "#e3e3c2", "#d8f003", "#e7f158", "#b8fff2", "#cdb9e9", "#faa8ae", "#cac75c", "#d7d119", "#eccb48", "#bbd7ea", "#a0f3c1", "#cbeaa6", "#c5f4e0", "#ede9f5", "#b8bffd", "#97cced", "#70dba6", "#72dbf2", "#e6bddd", "#ddc2fe", "#b8ddb0", "#e7d29e", "#c7ec8c", "#d1edce", "#c8fb75", "#f9ffe8", "#e9abeb", "#b5d1b3", "#feb6af", "#ffba6e", "#92f772", "#e8f4cb", "#ffeda8", "#e5ff77", "#f6f8fe", "#c4c699", "#c5ca3f", "#e9bb29", "#19e2dc", "#d9bfb4", "#c6cabf", "#e6c091", "#bcd0d0", "#d5cbd3", "#aae346", "#d0d2d3", "#f1c7ab", "#72ef95", "#cdda6f", "#d9d5c0", "#a2eb81", "#72f3cc", "#91efe6", "#fed284", "#a6edf6", "#4bfee0", "#9bfb4f", "#c1f3f6", "#e0f9ab", "#d4ffd2", "#fffac1", "#a9c5fd", "#f0acc4", "#7adf34", "#a8d516", "#86dade", "#6cdfd7", "#a7d5b9", "#b4d899", "#f1c0bf", "#a9e8c7", "#e6e04c", "#fcd4bf", "#67feb6", "#ddfeee", "#f5af92", "#a7cddc", "#c7cae9", "#e1c2c9", "#06f6a4", "#64f36c", "#ffd056", "#e9d3ea", "#94f595", "#eadbcc", "#acf2b2", "#a2fde0", "#f5e5c6", "#f7eb67", "#f1e9e6", "#e2efdb", "#fbfd52", "#aacac8", "#6fdf6e", "#23e83d", "#d6c33e", "#edbb66", "#96d8f1", "#d9c9a7", "#30ef8c", "#66ed41", "#eabeed", "#c3dbce", "#d6d6e9", "#f8c6ee", "#d5d9d1", "#96f0cc", "#c7ef56", "#8ef6ff", "#aff0e8", "#b7f593", "#dee7e0", "#bdff5c", "#eff01a", "#d7f0fe", "#bdfdc3", "#f0ef9c", "#d3fe14", "#bec0ea", "#c6c2be", "#eab1b3", ]
    var colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
      '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
    var letters = '0123456789ABCDEF';
    var cols = [];
    var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
        cols.push(color);
      }
      // console.log(cols);
    // colors = cols;
    // var colors = ["#013448", "#031e16", "#05346f", "#02c928", "#092b68", "#0e4771", "#011285", "#091dc9", "#0e7684", "#0cfcac", "#02ab3c", "#05cd85", "#097b94", "#0136c9", "#042fe1", "#02a5ac", "#0e5deb", "#03fc45", "#052f57", "#05c91e", "#0f41ae", "#005663", "#00c66d", "#0ca82a", "#002e8b", "#049d6a", "#0c1d46", "#0ef2ea", "#096013", "#02d497", "#0bbb16", "#0b8b01", "#088bc4", "#090247", "#05624f", "#061c66", "#05b968", "#0d6a89", "#038b3d", "#0b057b", "#0ba32e", "#082e5d", "#004bd1", "#0ed558", "#09a215", "#05d8ab", "#09cb4a", "#024316", "#0c935d", "#0ebb42", "#0da6ae", "#0bb6c3", "#03320f", "#084893", "#024a28", "#05f2b2", "#0397e3", "#0c8cf4", "#0a1b06", "#07d121", "#028092", "#0a663e", "#0a29d9", "#0258c5", "#0470ce", "#0ded14", "#037193", "#082f48", "#02439a", "#0a422a", "#035fcc", "#0eaf8a", "#0cd721", "#0776db", "#02daf4", "#063d82", "#012b40", "#011162", "#01adf7", "#0e16e3", "#06ae5a", "#00a5be", "#01327c", "#077cf4", "#022a9c", "#08bf10", "#01914f", "#064429", "#01f968", "#082d33", "#0a668b", "#01485d", "#064e82", "#003bb4", "#0cc4c5", "#0362e4", "#06e29b", "#0b8b84", "#0340e6", "#00c908"]
    // // var colors = d3.scale.linear()
    // //     .domain([1, 20])
    // //     .range(['#d73027', '#1a9850'])
    // //     .interpolate(d3.interpolateHcl);
    // //   var colors = ["#08a202", "#0a8a3e", "#0ba886", "#09aeb6", "#09975a", "#06411b", "#0ea243", "#08c55c", "#06c80c", "#0962cf", "#0aac20", "#0cccc3", "#03d0ca", "#021ab0", "#0020d4", "#0dee07", "#0eb758", "#058c58", "#0391db", "#0ed6b1", "#0bcdd8", "#023769", "#03e6e5", "#0d1b75", "#059c98", "#09eb39", "#075a93", "#0bfca2", "#06801d", "#01be10", "#0c53ce", "#0e2d90", "#0e057b", "#02f8a0", "#0b7802", "#0c5436", "#08638a", "#0e5325", "#0738a2", "#09922a", "#0d2793", "#0bf405", "#0f3238", "#0bb1fb", "#049022", "#0afac2", "#038ccb", "#01af0a", "#026827", "#0e915e", "#063f32", "#075a98", "#0618b2", "#07d89c", "#011966", "#0022a8", "#02488b", "#04031f", "#0e4f2d", "#0595ca", "#042fea", "#09caa4", "#0040d2", "#09dbc9", "#080499", "#0b911e", "#051852", "#028a29", "#067e0d", "#0ad81a", "#008fb7", "#078bfd", "#062455", "#0a8e54", "#076360", "#0e61eb", "#07c699", "#096b57", "#0d1ac1", "#0202e0", "#0a0825", "#0bab38", "#0e9f30", "#03fcec", "#026f9a", "#034bd8", "#031d82", "#002a11", "#02e307", "#057047", "#053396", "#0593a0", "#000509", "#0757d1", "#02f7eb", "#0608a8", "#09cd6a", "#0e1d5f", "#0f0e11", "#08e436", "#0812c9", "#044aa5", "#05af71", "#011811", "#0e09c8", "#02aa05", "#086da5", "#082b8b", "#00f463", "#05db3a", "#0e55ef", "#0b535a", "#045fdc", "#01bb7c", "#039576", "#062eb7", "#033768", "#085a17", "#0e4506", "#04611a", "#02580e", "#0f2a24", "#0f24d5", "#01ab07", "#037300", "#01fb16", "#078817", "#01d51a", "#0cb2de", "#016dad", "#0df757", "#02a568", "#0da5a9", "#0ef05a", "#020e74", "#0e72fb", "#0af349", "#01dddd", "#00a719", "#070d37", "#0731df", "#0ba5db", "#0441a7", "#0c8866", "#0895bd", "#0193ed", "#0e6968", "#016e7b", "#0810c4", "#0a53b5", "#01aa98", "#0d33ce", "#0d4d35", "#07e754", "#0e8ce9", "#057279", "#047d7f", "#0db862", "#018c86", "#0780c0", "#0b3e00", "#08f172", "#0aa602", "#099527", "#0a1cfc", "#0188ff", "#0aaeb2", "#03c0f1", "#02fc63", "#061adf", "#0ab19d", "#026a22", "#0b3f70", "#0bbd23", "#06988d", "#0b161e", "#0dca32", "#02fb8c", "#065309", "#0b2360", "#07d50c", "#0b5318", "#0259a7", "#04652b", "#0913f4", "#0db5aa", "#0a9585", "#0d0565", "#00f93b", "#0a9337", "#092971", "#075446", "#07548f", "#034ddd", "#0d01e0", "#0e6dc0", "#026d30", "#08de8e", "#0a4d6f", "#038380"]

    // var colors = d3.scale.category10();
    // console.log(colors);
    var monthly_total = d3.nest()
    .key(function(d){return parse(d.label)})
    .rollup(function(leaves){
      return d3.sum(leaves, function(d) {return d3.sum(d3.values(d))});
    })
    .entries(second_data);
    // console.log(monthly_total);

    // Define and draw axes
    var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(5)
    .tickSize(-width, 0, 0)
    .tickFormat(d3.format("s"));

    var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(d3.time.format("%b"));

    svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

    svg.append("g")
    .attr("id", "x_axis_stacked")
    .attr("class", "x axis stacked")
    .attr("transform", "translate(0," + (height-190) + ")")
    .call(xAxis);


    // Create groups for each series, rects for each segment 
    var groups = svg.selectAll("g.cost")
    .data(dataset)
    .enter().append("g")
    .attr("class", "cost")
    .style("fill", function(d, i) { return colors[i]; });
    console.log(groups);
    var rect = groups.selectAll("rect")
    .data(function(d) { console.log(d);  return d; })
    .enter()
    .append("rect")
    .attr("id", function(d, i) {
          // console.log(d);
          return  i+d.y0+d.y;
      })
    .attr("x", function(d) { return x(d.x); })
    .attr("y", function(d) { return y(d.y0 + d.y); })
    .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
    .attr("width", x.rangeBand())
    .on("mouseover", function() { tooltip.style("display", "block"); })
    .on("mouseout", function() { tooltip.style("display", "none"); })
    .on("mousemove", function(d) {
        var x = d3.select(this).attr('id');
        // console.log(d);
        var xPosition = d3.mouse(this)[0] - 15;
        var yPosition = d3.mouse(this)[1] - 25;
        tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
        tooltip.select("text").text((d.y).toFixed(2));
    });

    var columns = svg.append("g")
    .selectAll("text").data(monthly_total)
    .enter().append("text")
    .attr("id", function(d, i) {
          return  i;
      })
    .attr("x", function(d){
      return x(d.key) + x.rangeBand()/2
    })
    .attr("y", function (d) {
      return y((d.values));
    })
    .attr("dy", "0.01em")
    .attr('style', 'font-size:13px')
    .text( function (d){
      return d3.format("s")(Math.round(d.values));
    })
    .style({fill: 'black', "text-anchor": "middle"})
    // .on("mouseover", function() { tooltip.style("display", "block"); })
    // .on("mouseout", function() { tooltip.style("display", "none"); })
    // .on("mousemove", function(d) {
    //     console.log(d);
    //     var x = d3.select(this).attr('id');
    //     console.log(category_list[x]);
    //     console.log(x);
    //     // var xPosition = d3.mouse(this)[0] - 15;
    //     // var yPosition = d3.mouse(this)[1] - 25;
    //     // tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
    //     // tooltip.select("text").text((d.y).toFixed(2));
    // });



    // Draw legend
    var legend = svg.selectAll(".legend")
    .data(colors)
    .enter().append("g")
    .attr("class", "legend")
    // .attr("transform", function(d, i) { if(i < category_list.length) {  return "translate(30," + i * 19 + ")";} });
    .attr("transform", function(d, i) { 
      // while(i < )
      // console  .log(i);
      if(i < category_list.length) {  
        return "translate(30," + i * 20 + ")";
        } 
      });
    
    legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", function(d, i) {if(i < category_list.length) { return colors[i];} });
    
    legend.append("text")
    .attr("x", width + 5)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "start")
    .text(function(d, j) { 
        // for(let i =0; i < category_list.length; i++) {
        // switch (i) {
        // case 0: return "Anjou pears";
        // case 1: return "Naval oranges";
        // case 2: return "McIntosh apples";
        // case 3: return "Red Delicious apples";
        // }
        if(j < category_list.length){
        return category_list[j]
        }
               // }
    });


    // Prep the tooltip bits, initial display is hidden
    var tooltip = svg.append("g")
    .attr("class", "toolTip")
    .style("display", "none");
        
    tooltip.append("rect")
    .attr("width", 30)
    .attr("height", 20)
    .attr("fill", "white")
    .style("opacity", 0);

    tooltip.append("text")
    .attr("x", 15)
    .attr("dy", "1.2em")
    .style("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("font-weight", "bold");

  }

}
</script>
<style>
#x_axis_stacked path{
  display: none;
}
</style>