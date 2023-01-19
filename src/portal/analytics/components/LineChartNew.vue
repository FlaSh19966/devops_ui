<template>
<div id="newlinechart"></div>
</template>

<script>
import * as d3 from "d3-3";
// import { max, min } from "d3";

export default {
  name: "LineChartNew",
  props: {
    xKey: String,
    yKey: String,
    data: Array
  },
  mounted() {
          var data =  [
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
            {"SALES":169.20256000000003,"YEAR":"2016","DATENEW":"Thu, 24 Mar 2016 04:12:32 GMT","CATEGORY":"Pumpkins","MONTH":"03"},{"SALES":307.6499999999997,"YEAR":"2016","DATENEW":"Thu, 24 Mar 2016 04:43:59 GMT","CATEGORY":"Eggs","MONTH":"03"},{"SALES":975.1200545454553,"YEAR":"2016","DATENEW":"Thu, 24 Mar 2016 05:22:50 GMT","CATEGORY":"Other Vegies","MONTH":"03"},{"SALES":112.4447,"YEAR":"2016","DATENEW":"Fri, 25 Mar 2016 01:48:45 GMT","CATEGORY":"Chillies","MONTH":"03"},{"SALES":597.0905363636365,"YEAR":"2016","DATENEW":"Fri, 25 Mar 2016 03:28:03 GMT","CATEGORY":"Citrus","MONTH":"03"},{"SALES":166.812,"YEAR":"2016","DATENEW":"Fri, 25 Mar 2016 03:50:08 GMT","CATEGORY":"carrots","MONTH":"03"},{"SALES":360.92106,"YEAR":"2016","DATENEW":"Fri, 25 Mar 2016 04:41:19 GMT","CATEGORY":"capsicum","MONTH":"03"},{"SALES":57.88363636363637,"YEAR":"2016","DATENEW":"Sat, 26 Mar 2016 22:51:27 GMT","CATEGORY":"Other Fruits","MONTH":"03"},{"SALES":884.4411199999997,"YEAR":"2016","DATENEW":"Sat, 26 Mar 2016 23:37:38 GMT","CATEGORY":"Potatoes","MONTH":"03"},{"SALES":304.92546000000004,"YEAR":"2016","DATENEW":"Sun, 27 Mar 2016 00:25:07 GMT","CATEGORY":"Pears","MONTH":"03"},{"SALES":303.2260000000004,"YEAR":"2016","DATENEW":"Sun, 27 Mar 2016 00:28:50 GMT","CATEGORY":"Bunch Vegies","MONTH":"03"},{"SALES":620.6673999999997,"YEAR":"2016","DATENEW":"Sun, 27 Mar 2016 01:08:03 GMT","CATEGORY":"Tomatoes","MONTH":"03"},{"SALES":629.8516800000004,"YEAR":"2016","DATENEW":"Sun, 27 Mar 2016 01:45:58 GMT","CATEGORY":"Apples","MONTH":"03"},{"SALES":372.82099999999923,"YEAR":"2016","DATENEW":"Sun, 27 Mar 2016 03:38:16 GMT","CATEGORY":"Lettuces","MONTH":"03"},{"SALES":154.485,"YEAR":"2016","DATENEW":"Sun, 27 Mar 2016 23:08:40 GMT","CATEGORY":"Multi buy","MONTH":"03"},{"SALES":387.9157999999999,"YEAR":"2016","DATENEW":"Mon, 28 Mar 2016 02:15:11 GMT","CATEGORY":"Melons","MONTH":"03"},{"SALES":180.2172727272728,"YEAR":"2016","DATENEW":"Mon, 28 Mar 2016 22:59:34 GMT","CATEGORY":"Olympian Products","MONTH":"03"},{"SALES":633.3682436363638,"YEAR":"2016","DATENEW":"Mon, 28 Mar 2016 23:57:28 GMT","CATEGORY":"Onions","MONTH":"03"},{"SALES":854.30096,"YEAR":"2016","DATENEW":"Wed, 30 Mar 2016 03:02:09 GMT","CATEGORY":"Grapes","MONTH":"03"},{"SALES":108.0,"YEAR":"2016","DATENEW":"Wed, 30 Mar 2016 04:15:59 GMT","CATEGORY":"Flowers","MONTH":"03"},{"SALES":87.10741999999999,"YEAR":"2016","DATENEW":"Wed, 30 Mar 2016 21:40:15 GMT","CATEGORY":"Root Vegies","MONTH":"03"},{"SALES":73.7,"YEAR":"2016","DATENEW":"Thu, 31 Mar 2016 00:23:50 GMT","CATEGORY":"Cut Veggies","MONTH":"03"},{"SALES":216.50410000000002,"YEAR":"2016","DATENEW":"Thu, 31 Mar 2016 01:27:43 GMT","CATEGORY":"Asian Vegies","MONTH":"03"},{"SALES":167.87999999999997,"YEAR":"2016","DATENEW":"Thu, 31 Mar 2016 01:59:07 GMT","CATEGORY":"Berries","MONTH":"03"},
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
        ]
        // this.data = data;
        // this.xKey = "DATENEW";
        // this.yKey = "SALES";
      var vm = this;
    var margin = { top: 30, right: 120, bottom: 130, left: 50 },
        width = 960 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom,
        tooltip = { width: 100, height: 100, x: 10, y: -30 };

    var parseDate = d3.time.format("%m/%e/%Y").parse,
        bisectDate = d3.bisector(function(d) { return d[vm.xKey]; }).left,
        formatValue = d3.format(","),
        dateFormatter = d3.time.format("%m/%d/%y");

    var x = d3.time.scale()
            .range([0, width]);

    var y = d3.scale.linear()
            .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(dateFormatter);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format("s"))

    var line = d3.svg.line()
        .x(function(d) { return x(d[vm.xKey]); })
        .y(function(d) { return y(d[vm.yKey]); });

    var svg = d3.select("#newlinechart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        console.log(this.data);
    
    this.data.forEach(function(d) {
            // d[vm.xKey] = (d[vm.xKey]);
            d[vm.xKey] = new Date(d[vm.xKey]);
            d[vm.yKey] = +d[vm.yKey];
        });
        console.log(this.data);

        this.data.sort(function(a, b) {
            return a[vm.xKey] - b[vm.xKey];
        });
        console.log(this.data);
        x.domain([this.data[0][vm.xKey], this.data[this.data.length - 1][vm.xKey]]);
        y.domain(d3.extent(this.data, function(d) { return d[vm.yKey]; }));

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
          .attr("y", 0)
          .attr("x", -10)
          .attr("dy", ".35em")
          .attr("transform", "rotate(-70)")
          .style("text-anchor", "end")

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            // .text("Number of Likes");

        svg.append("path")
            .datum(this.data)
            .attr("class", "line")
            .attr("d", line);

        var focus = svg.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus.append("circle")
            .attr("r", 5);

        focus.append("rect")
            .attr("class", "tooltip")
            .attr("width", 100)
            .attr("height", 50)
            .attr("x", 10)
            .attr("y", -22)
            .attr("rx", 4)
            .attr("ry", 4);

        focus.append("text")
            .attr("class", "tooltip-date")
            .attr("x", 18)
            .attr("y", -2);

        focus.append("text")
            .attr("x", 18)
            .attr("y", 18)
            .text(`${this.xKey}:`);

        focus.append("text")
            .attr("class", "tooltip-likes")
            .attr("x", 60)
            .attr("y", 18);

        svg.append("rect")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height)
            .on("mouseover", function() { focus.style("display", null); })
            .on("mouseout", function() { focus.style("display", "none"); })
            .on("mousemove", mousemove);

        function mousemove() {
            // debugger;
            var x0 = x.invert(d3.mouse(this)[0]),
                i = bisectDate(vm.data, x0, 1)
                console.log(i);
                var d0 = this.data[i - 1]
                var d1 = this.data[i];
                var d = x0 - d0[vm.xKey] > d1[vm.xKey] - x0 ? d1 : d0;
            focus.attr("transform", "translate(" + x(dvm.xKey) + "," + y(d[vm.yKey]) + ")");
            focus.select(".tooltip-date").text(dateFormatter(d[vm.xKey]));
            focus.select(".tooltip-likes").text(formatValue(d[vm.yKey]));
        }
  }
}
</script>
<style>
 .axis path,
    .axis line {
        fill: none;
        stroke: #000;
        shape-rendering: crispEdges;
    }

    /* .x.axis path {
        display: none;
    } */

    .line {
        fill: none;
        stroke: steelblue;
        stroke-width: 1.5px;
    }

    .overlay {
        fill: none;
        pointer-events: all;
    }

    .focus circle {
        fill: steelblue;
    }

    .focus text {
        font-size: 12px;
    }

    .tooltip {
        fill: white;
        stroke: #000;
    }

    .tooltip-date, .tooltip-likes {
        font-weight: bold;
    }

</style>