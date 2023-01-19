<template>
  <!-- <svg :width="width" :height="height" ref="svg">
    <g ref="chart">
      <path :d="path" stroke="#273679" stroke-width="2" fill="none" />
    </g>
    <g ref="circle" />
    <g ref="axis" />
  </svg> -->
  <svg width="960" height="500" id="svg"></svg>  
</template>

<script>
import * as d3 from "d3";
import { max, min } from "d3";

export default {
  name: "LineChart",
  props: {
    title: String,
    xKey: String,
    yKey: String,
    data: Array
  },
  // data() {
  //   return {
  //     width: 900,
  //     height: 500,
  //     path: "",
  //     selected: null,
  //     focus: null
  //   };
  // },
  computed: {
    // xSelector(d) {
    //   return d => d[this.xKey];
    // },
    // ySelector(d) {
    //   return d => d[this.yKey];
    // },
    // dataMax() {
    //   return max(this.data, d => {
    //     return d[this.yKey];
    //   });
    // },
    // dataMin() {
    //   return min(this.data, d => {
    //     return d[this.yKey];
    //   });
    // },
  },
  mounted() {
    var vm = this;

    // const xScale = d3
    // //   .scaleLinear()
    // //   .range([0, 400])
    // // //   .domain([0, this.data.length]);
    // // .domain(d3.extent(this.data, function(d){
    // // return (d.CATEGORY)}))
    // .scaleBand()
    // // .ordinal()
    // .range([0, 400])
    // .domain(this.data.map(function(d) { return d[vm.xKey] }));
    //   const xTemp = d3
    // .scaleBand()
    // .range([0, 400]);

    // const yScale = d3
    //   .scaleLinear()
    //   .range([0, 420])
    //   .domain([this.dataMax, 0]);

    // const path = d3
    //   .line()
    //   .x(d => xScale(this.xSelector(d)))
    //   .y(d => yScale(this.ySelector(d)))
    //   .curve(d3.curveLinear);
    // this.path = path(this.data);

    // const margin = { top: 40, left: 40, bottom: 40, right: 0 };
    // const yAxis = d3.axisLeft(yScale);
    // const xAxis = (d3.axisBottom(xScale));
    // // .ticks(this.width / 80).tickSizeOuter(0));

    // const chartWidth = this.width - (margin.left + margin.right);
    // const chartHeight = this.height - (margin.top + margin.bottom);
    // var bisectX = d3.bisector(function(d) {
    //   return d[vm.xKey];
    // }).left;

    // d3.select(this.$refs.chart)
    //   .attr("width", chartWidth)
    //   .attr("height", chartHeight)
    //   .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // d3.select(this.$refs.axis)
    //   .append("g")
    //   .attr("transform", `translate(${margin.left}, ${margin.top})`)
    //   .attr("class", "axis y")
    //   .call(yAxis)
    //   .append("text")
    //     .attr("class", "axis-title")
    //     .attr("transform", "rotate(-90)")
    //     .attr("y", 6)
    //     .attr("dy", ".71em")
    //     .style("text-anchor", "end")
    //     .attr("fill", "#5D6971")
    //     .text(this.yKey);

    // d3.select(this.$refs.axis)
    //   .append("g")
    //   .attr(
    //     "transform",
    //     `translate(${margin.left}, ${chartHeight + margin.top})`
    //   )
    //   .attr("class", "axis x")
    //   .call(xAxis)
    // //   .selectAll("text")  
    // //   .style("text-anchor", "end")
    // //   .attr("dx", "-.8em")
    // //   .attr("dy", "0em")
    // //  .attr("transform", "rotate(-50)");
    // .selectAll(".tick text")
    //   .call(wrap, xScale.bandwidth());

    //   function wrap(text, width) {
    //     console.log(width);
    //     text.each(function() {
    //       var text = d3.select(this),
    //           words = text.text().split(/\s+/).reverse(),
    //           word,
    //           line = [],
    //           lineNumber = 0,
    //           lineHeight = 1.1, // ems
    //           y = text.attr("y"),
    //           dy = parseFloat(text.attr("dy")),
    //           tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    //       while (word = words.pop()) {
    //         line.push(word);
    //         tspan.text(line.join(" "));
    //         if (tspan.node().getComputedTextLength() > width) {
    //           line.pop();
    //           tspan.text(line.join(" "));
    //           line = [word];
    //           tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
    //         }
    //       }
    //     });
    //   }


    // //  const tooltip = this.$refs.chart.append("g");
    // //  const svg = d3.select(this.$refs.chart);

    // //     svg.on("touchmove mousemove", function() {
    // //     const {date, value} = bisect(d3.mouse(this)[0]);

    // //     tooltip
    // //             .attr("transform", `translate(${x(vm.xKey)},${y(vm.yKey)})`)
    // //             .call(callout, `${value.toLocaleString(undefined, {style: "currency", currency: "USD"})}
    // //     ${date.toLocaleString(undefined, {month: "short", day: "numeric", year: "numeric"})}`);
    // //     });

    // //     svg.on("touchend mouseleave", () => tooltip.call(callout, null));
    // // callout = (g, value) => {
    // //     if (!value) return g.style("display", "none");

    // //     g
    // //         .style("display", null)
    // //         .style("pointer-events", "none")
    // //         .style("font", "10px sans-serif");

    // //     const path = g.selectAll("path")
    // //         .data([null])
    // //         .join("path")
    // //         .attr("fill", "white")
    // //         .attr("stroke", "black");

    // //     const text = g.selectAll("text")
    // //         .data([null])
    // //         .join("text")
    // //         .call(text => text
    // //         .selectAll("tspan")
    // //         .data((value + "").split(/\n/))
    // //         .join("tspan")
    // //             .attr("x", 0)
    // //             .attr("y", (d, i) => `${i * 1.1}em`)
    // //             .style("font-weight", (_, i) => i ? null : "bold")
    // //             .text(d => d));

    // //     const {x, y, width: w, height: h} = text.node().getBBox();

    // //     text.attr("transform", `translate(${-w / 2},${15 - y})`);
    // //     path.attr("d", `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`);
    // //     }

    // //     function bisect(){
    // //         const bisect = d3.bisector(d => d.CATEGORY).left;
    // //         return mx => {
    // //             const date = x.invert(mx);
    // //             const index = bisect(data, date, 1);
    // //             const a = data[index - 1];
    // //             const b = data[index];
    // //             return CATEGORY - a.CATEGORY > b.CATEGORY - CATEGORY ? b : a;
    // //         };
    // //     }
            

    // this.focus = d3
    //   .select(this.$refs.chart)
    //   // .append("div").attr("class", "toolTip");
    //   .append("g")
    //   .attr("class", "focus")
    //   .style("display", "none");

    // this.focus
    //   .append("line")
    //   .attr("class", "x-hover-line hover-line")
    //   .attr("y1", 0)
    //   .attr("y2", chartHeight);

    // this.focus
    //   .append("line")
    //   .attr("class", "y-hover-line hover-line")
    //   .attr("x1", chartWidth)
    //   .attr("x2", chartWidth);

    // this.focus.append("circle").attr("r", 7.5);

    // this.focus
    //   .append("text")
    //   .attr("x", 15)
    //   .attr("dy", ".31em");

    // d3.select(this.$refs.chart)
    //   .append("rect")
    //   .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    //   .attr("class", "overlay")
    //   .attr("width", chartWidth)
    //   .attr("height", chartHeight)
    //   .on("mouseover", function() {
    //     vm.focus.style("display", null);
    //      var x = d3.select(this).attr('id');
    //     //  console.log(x);
    //   })
    //   .on("mouseout", function() {
    //     vm.focus.style("display", "none");
    //   })
    //   .on("mousemove", mousemove);
    // function mousemove() {
    //   // alert("Hi")
    //   // var x0 = xScale.invert(d3.mouse(this)[0])
    //   //   // console.log(x0);
    //   //   i = bisectX(vm.data, x0, 1),
    //   //   // i = this.data,
    //   //   d0 = vm.data[i - 1],
    //   //   d1 = vm.data[i],
    //   //   d = x0 - d0[vm.xKey] > d1[vm.xKey] - x0 ? d1 : d0;
    //   // vm.focus.attr(
    //   //   "transform",
    //   //   "translate(" + xScale(d.x) + "," + yScale(d.y) + ")"
    //   // );
    //   // vm.focus.select("text").text(function() {
    //   //   return d[vm.yKey];
    //   // });
    //   // vm.focus.select(".x-hover-line").attr("y2", chartHeight - yScale(d[vm.yKey]));
    //   // vm.focus.select(".y-hover-line").attr("x2", chartWidth + chartWidth);
    //   var xPos = d3.mouse(this)[0];
    //   var domain = xScale.domain(); 
    //   var range = xScale.range();
    //    var rangePoints = d3.range(range[0], range[1], xScale.step())
    // var yPos = domain[d3.bisect(rangePoints, xPos) -1];
    // console.log(xPos,yPos);

    // // vm.focus.attr(
    // //     "transform",
    // //     "translate(" + xScale(vm.xSelector(xPos)) + "," + yScale(vm.ySelector(yPos)) + ")"
    // //   );
    // //  vm.focus.select("text").text(function() {
    // //     return yPos;
    // //   });
    // //   vm.focus.select(".x-hover-line").attr("y2", chartHeight - 10);
    // //   vm.focus.select(".y-hover-line").attr("x2", chartWidth + chartWidth);
    //   // vm.focus
    //   //         .style("left", d3.event.pageX - 40 + "px")
    //   //         .style("top", d3.event.pageY - 70 + "px")
    //   //         .style("display", "inline-block")
    //   //         .html("<p> Hello </p>"+ "<br>");

    // }

    var svg = d3.select("#svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

    var parseTime = d3.timeParse("%M"),
        bisectDate = d3.bisector(function(d) { return d.DATENEW; }).left;

    var x = d3.scaleTime().range([0, width]);
    // var x = d3.scaleBand().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    var line = d3.line()
        .x(function(d) { return x(d.DATENEW); })
        .y(function(d) { return y(d.SALES); });

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // d3.json("data.json", function(error, data) {
        // if (error) throw error;
      var data = 
      // [{"year":"Bob","value":33},{"year":"Robin","value":12},{"year":"Anne","value":41},{"year":"Mark","value":16},{"year":"Joe","value":59},{"year":"Eve","value":38},{"year":"Karen","value":21},{"year":"Kirsty","value":25},{"year":"Chris","value":30},{"year":"Lisa","value":47},{"year":"Tom","value":5},{"year":"Stacy","value":20},{"year":"Charles","value":13},{"year":"Mary","value":29}];
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
        data.forEach(function(d) {
          // d.DATENEW = new Date(d.DATENEW);
          d.DATENEW = new Date(d.DATENEW);
          d.SALES = +d.SALES;
        });
      // console.log(data, x.domain(d3.map(data, function(d) { return d.DATENEW; })),y.domain([d3.min(data, function(d) { return d.SALES; }) / 1.005, d3.max(data, function(d) { return d.SALES; }) * 1.005]));
        x.domain(d3.extent (data, function(d) { return d.DATENEW; }));
        y.domain([d3.min(data, function(d) { return d.SALES; }) / 1.005, d3.max(data, function(d) { return d.SALES; }) * 1.005]);

    //     x.domain(data.map(function(d) { return d.DATENEW }))
    // y.domain([
    //   0,
    //   d3.max(data, function(d) {
    //     return d.SALES;
    //   })
    // ]);

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y).ticks(6).tickFormat(function(d) { return parseInt(d / 1000) + "k"; }))
          .append("text")
            .attr("class", "axis-title")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .attr("fill", "#5D6971")
            .text("Population)");

        g.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);

        var focus = g.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus.append("line")
            .attr("class", "x-hover-line hover-line")
            .attr("y1", 0)
            .attr("y2", height);

        focus.append("line")
            .attr("class", "y-hover-line hover-line")
            .attr("x1", width)
            .attr("x2", width);

        focus.append("circle")
            .attr("r", 7.5);

        focus.append("text")
            .attr("x", 15)
            .attr("dy", ".31em");

        svg.append("rect")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height)
            .on("mouseover", function() { focus.style("display", null); })
            .on("mouseout", function() { focus.style("display", "none"); })
            .on("mousemove", mousemove);

        function mousemove() {
            // console.log(x.invert(d3.mouse(this)))
          // var x0 = x.invert(d3.mouse(this)[1]),
          //     i = bisectDate(data, x0, 1),
          //     d0 = data[i - 1],
          //     d1 = data[i],
          //     d = x0 - d0.DATENEW > d1.DATENEW - x0 ? d1 : d0;
          // focus.attr("transform", "translate(" + x(d.DATENEW) + "," + y(d.SALES) + ")");
          // focus.select("text").text(function() { console.log(d); return d.SALES; });
          // focus.select(".x-hover-line").attr("y2", height - y(d.SALES));
          // focus.select(".y-hover-line").attr("x2", width + width);
        }
    // });
  },
  methods: {
    xPoint(d) {
      const yScale = d3
        .scaleLinear()
        .range([0, 420])
        .domain([0, this.dataMax]);
      return yScale(this.ySelector(d));
    },
    yPoint(d) {
      const xScale = d3
        .scaleLinear()
        .range([0, 400])
        .domain([0, 10]);
      return xScale(this.xSelector(d));
    }
  }
};
</script>

<style>
/* .overlay {
  fill: none;
  pointer-events: all;
}


.focus text {
  font-size: 14px;
}

.tooltip {
  fill: white;
  stroke: #000;
}

.tooltip-date,
.tooltip-likes {
  font-weight: bold;
}
.focus circle {
  fill: #f1f3f3;
  stroke: #6f257f;
  stroke-width: 5px;
}

.hover-line {
  stroke: #6f257f;
  stroke-width: 2px;
  stroke-dasharray: 3, 3;
}
.line {
  fill: none;
  stroke: #6F257F;
  stroke-width: 5px;
}
.toolTip {
  position: absolute;
  display: none;
  min-width: 80px;
  height: auto;
  background: none repeat scroll 0 0 #ffffff;
  border: 1px solid #6F257F;
  padding: 14px;
  text-align: center;
} */
</style>
