    
<template>
<div id="multilinechart">

</div>
</template>
<script>
import * as d3 from "d3-3";
export default {
     name: "MultiLineChart",
    // props: {
    //     data:Array,
    //     xKey: String,
    //     yKey: String,
    // },
  mounted() {
  //     var myData = "date	New York	San Francisco	Austin\n\
  //                       20111001	63.4	62.7	72.2\n\
  //                       20111002	58.0	59.9	67.7\n\
  //                       20111003	53.3	59.1	69.4\n\
  //                       20111004	55.7	58.8	68.0\n\
  //                       20111005	64.2	58.7	72.4\n\
  //                       20111006	58.8	57.0	77.0\n\
  //                       20111007	57.9	56.7	82.3\n\
  //                       20111008	61.8	56.8	78.9\n\
  //                       20111009	69.3	56.7	68.8\n\
  //                       20111010	71.2	60.1	68.7\n\
  //                       20111011	68.7	61.1	70.3\n\
  //                       20111012	61.8	61.5	75.3\n\
  //                       20111013	63.0	64.3	76.6\n\
  //                       20111014	66.9	67.1	66.6\n\
  //                       20111015	61.7	64.6	68.0\n\
  //                       20111016	61.8	61.6	70.6\n\
  //                       20111017	62.8	61.1	71.1\n\
  //                       20111018	60.8	59.2	70.0\n\
  //                       20111019	62.1	58.9	61.6\n\
  //                       20111020	65.1	57.2	57.4\n\
  //                       20111021	55.6	56.4	64.3\n\
  //                       20111022	54.4	60.7	72.4\n";
  //   var margin = {
  //       top: 20,
  //       right: 80,
  //       bottom: 30,
  //       left: 50
  //     },
  //     width = 900 - margin.left - margin.right,
  //     height = 500 - margin.top - margin.bottom;

  //   // var parseDate = d3.timeFormat("%d-%b-%y");
  //   var parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S");


  //   var x = d3.scaleTime()
  //     .range([0, width]);

  //   var y = d3.scaleLinear()
  //     .range([height, 0]);

  //   // var color = d3.scaleOrdinal(d3.schemeCategory10);
  //   var color = d3.scaleOrdinal().range(d3.schemeCategory10);

  //   var xAxis = d3.axisBottom()
  //   .scale(x);

  //   var yAxis = d3.axisLeft()
  //   .scale(y);

  //   var line = d3.line()
  //   .curve(d3.curveMonotoneX)
  //   .x(function(d) { return x(d.date); })
  //   .y(function(d) { return y(d.temperature); });



  //   // var line = d3.line()
  //   //     .curve(d3.curveMonotoneX)
  //   //   .x(function(d) {
  //   //     return x(d.date);
  //   //   })
  //   //   .y(function(d) {
  //   //     return y(d.temperature);
  //   //   });
  //   // console.log(line,"line");
  //   // var line = d3.line()
  //   //   .interpolate("basis")
  //   //   .x(function(d) {
  //   //     return x(d.date);
  //   //   })
  //   //   .y(function(d) {
  //   //     return y(d.temperature);
  //   //   });

  //   var svg = d3.select("#multilinechart").append("svg")
  //     .attr("width", width + margin.left + margin.right)
  //     .attr("height", height + margin.top + margin.bottom)
  //     .append("g")
  //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //   var data = d3.tsvParse(myData);
  //   // console.log(data);



  //   color.domain(d3.keys(data[0]).filter(function(key) {
  //     return key !== "date";
  //   }));
  //   // const color = d3.scaleOrdinal()
  //   // .domain(d3.keys(data[0]).filter(function(key) {
  //   //   return key !== "date";
  //   // })).range(d3.quantize(t => d3.interpolateCubehelixDefault  (t * 0.8 + 0.1), data.length).reverse());

  //   data.forEach(function(d) {
  //     d.date = parseDate(d.date);
  //   });

  //   var cities = color.domain().map(function(name) {
  //     return {
  //       name: name,
  //       values: data.map(function(d) {
  //         return {
  //           date: d.date,
  //           temperature: +d[name]
  //         };
  //       })
  //     };
  //   });
  //   // console.log(cities);

  //   x.domain(d3.extent(data, function(d) {
  //     return d.date;
  //   }));

  //   y.domain([
  //     d3.min(cities, function(c) {
  //       return d3.min(c.values, function(v) {
  //         return v.temperature;
  //       });
  //     }),
  //     d3.max(cities, function(c) {
  //       return d3.max(c.values, function(v) {
  //         return v.temperature;
  //       });
  //     })
  //   ]);

  //   var legend = svg.selectAll('g')
  //     .data(cities)
  //     .enter()
  //     .append('g')
  //     .attr('class', 'legend');

  //   legend.append('rect')
  //     .attr('x', width - 20)
  //     .attr('y', function(d, i) {
  //       return i * 20;
  //     })
  //     .attr('width', 10)
  //     .attr('height', 10)
  //     .style('fill', function(d) {
  //       return color(d.name);
  //     });

  //   legend.append('text')
  //     .attr('x', width - 8)
  //     .attr('y', function(d, i) {
  //       return (i * 20) + 9;
  //     })
  //     .text(function(d) {
  //       return d.name;
  //     });

  //   svg.append("g")
  //     .attr("class", "x axis")
  //     .attr("transform", "translate(0," + height + ")")
  //     .call(xAxis);

  //   svg.append("g")
  //     .attr("class", "y axis")
  //     .call(yAxis)
  //     .append("text")
  //     .attr("transform", "rotate(-90)")
  //     .attr("y", 6)
  //     .attr("dy", ".71em")
  //     .style("text-anchor", "end")
  //     .text("Temperature (ºF)");

  //   var city = svg.selectAll(".city")
  //     .data(cities)
  //     .enter().append("g")
  //     .attr("class", "city");

  //   city.append("path")
  //     .attr("class", "line")
  //     .attr("d", function(d) {
  //         console.log((d.values));
  //       return line(d.values);
  //     })
  //     .style("stroke", function(d) {
  //       return color(d.name);
  //     });

  //   city.append("text")
  //     .datum(function(d) {
  //       return {
  //         name: d.name,
  //         value: d.values[d.values.length - 1]
  //       };
  //     })
  //     .attr("transform", function(d) {
  //       return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")";
  //     })
  //     .attr("x", 3)
  //     .attr("dy", ".35em")
  //     .text(function(d) {
  //       return d.name;
  //     });

  //   var mouseG = svg.append("g")
  //     .attr("class", "mouse-over-effects");

  //   mouseG.append("path") // this is the black vertical line to follow mouse
  //     .attr("class", "mouse-line")
  //     .style("stroke", "black")
  //     .style("stroke-width", "1px")
  //     .style("opacity", "0");
      
  //   var lines = document.getElementsByClassName('line');

  //   var mousePerLine = mouseG.selectAll('.mouse-per-line')
  //     .data(cities)
  //     .enter()
  //     .append("g")
  //     .attr("class", "mouse-per-line");

  //   mousePerLine.append("circle")
  //     .attr("r", 7)
  //     .style("stroke", function(d) {
  //       return color(d.name);
  //     })
  //     .style("fill", "none")
  //     .style("stroke-width", "1px")
  //     .style("opacity", "0");

  //   mousePerLine.append("text")
  //     .attr("transform", "translate(10,3)");

  //   mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
  //     .attr('width', width) // can't catch mouse events on a g element
  //     .attr('height', height)
  //     .attr('fill', 'none')
  //     .attr('pointer-events', 'all')
  //     .on('mouseout', function() { // on mouse out hide line, circles and text
  //       d3.select(".mouse-line")
  //         .style("opacity", "0");
  //       d3.selectAll(".mouse-per-line circle")
  //         .style("opacity", "0");
  //       d3.selectAll(".mouse-per-line text")
  //         .style("opacity", "0");
  //     })
  //     .on('mouseover', function() { // on mouse in show line, circles and text
  //       d3.select(".mouse-line")
  //         .style("opacity", "1");
  //       d3.selectAll(".mouse-per-line circle")
  //         .style("opacity", "1");
  //       d3.selectAll(".mouse-per-line text")
  //         .style("opacity", "1");
  //     })
  //     .on('mousemove', function() { // mouse moving over canvas
  //       var mouse = d3.mouse(this);
  //       d3.select(".mouse-line")
  //         .attr("d", function() {
  //           var d = "M" + mouse[0] + "," + height;
  //           d += " " + mouse[0] + "," + 0;
  //           return d;
  //         });

  //       d3.selectAll(".mouse-per-line")
  //         .attr("transform", function(d, i) {
  //           // console.log(width/mouse[0])
  //           var xDate = x.invert(mouse[0]),
  //               bisect = d3.bisector(function(d) { return d.date; }).right;
  //               console.log(d,"data-d")
  //               idx = bisect(d.values, xDate);
            
  //           var beginning = 0,
  //               end = lines[i].getTotalLength(),
  //               target = null;

  //           while (true){
  //             target = Math.floor((beginning + end) / 2);
  //             pos = lines[i].getPointAtLength(target);
  //             if ((target === end || target === beginning) && pos.x !== mouse[0]) {
  //                 break;
  //             }
  //             if (pos.x > mouse[0])      end = target;
  //             else if (pos.x < mouse[0]) beginning = target;
  //             else break; //position found
  //           }
            
  //           d3.select(this).select('text')
  //             .text(y.invert(pos.y).toFixed(2));
              
  //           return "translate(" + mouse[0] + "," + pos.y +")";
  //         });
  //     });


  //   //#region  

    var parseDate = d3.time.format("%b").parse;


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

    var map = api_data.reduce((r, i) => ((r[i.DATENEW] = r[i.DATENEW] || []).push({
      // date : i.DATENEW,
      // sales: i.SALES
      i
    }), r), {});

    var entries = Object.entries(map);
    // console.log(entries);
    // const data = [];
    //   for(let i =0; i < entries.length; i++) {
    //     data.push({
    //       name : entries[i][0],
    //       values: [],
    //     })
    //     for(let j =0 ; j < entries[i][1].length; j++) {
    //       data[i].values.push({
    //         date: entries[i][1][j].date,
    //         sales: entries[i][1][j].sales
    //       })
    //     }
    //   }

    var categories = api_data.reduce((r,i) => (((r[i.CATEGORY] = r[i.CATEGORY] || [] ).push({
      categorie : i.CATEGORY
    }), r)), {} );
    // console.log(categories);
    var category_list = Object.keys(categories); 
    // console.log(category_list);
    var map = api_data.reduce((r, i) => (((r[i.MONTH] = r[i.MONTH] || []).push({
      category: i.CATEGORY,
      values: i.SALES
    }), r)), {});
    // console.log(map);
    var entries = Object.entries(map);
    console.log(entries)

    var second_data = [];
      for(let i =0; i < entries.length; i++) {
        console.log(entries[i][0]);
        second_data.push({
          date : entries[i][0]
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
    console.log("second og data",second_data)
    second_data.forEach(function(d) {
      d.date = (new Date(d.date));
    });
    console.log(second_data); 


     var myData = "date	New York	San Francisco	Austin\n\
20111001	63.4	62.7	72.2\n\
20111002	58.0	59.9	67.7\n\
20111003	53.3	59.1	69.4\n\
20111004	55.7	58.8	68.0\n\
20111005	64.2	58.7	72.4\n\
20111006	58.8	57.0	77.0\n\
20111007	57.9	56.7	82.3\n\
20111008	61.8	56.8	78.9\n\
20111009	69.3	56.7	68.8\n\
20111010	71.2	60.1	68.7\n\
20111011	68.7	61.1	70.3\n\
20111012	61.8	61.5	75.3\n\
20111013	63.0	64.3	76.6\n\
20111014	66.9	67.1	66.6\n\
20111015	61.7	64.6	68.0\n\
20111016	61.8	61.6	70.6\n\
20111017	62.8	61.1	71.1\n\
20111018	60.8	59.2	70.0\n\
20111019	62.1	58.9	61.6\n\
20111020	65.1	57.2	57.4\n\
20111021	55.6	56.4	64.3\n\
20111022	54.4	60.7	72.4\n";

    var margin = {
        top: 20,
        right: 80,
        bottom: 30,
        left: 50
      },
      width = 900 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // var parseDate = d3.time.format("%Y%m%d").parse;

    var x = d3.time.scale()
      .range([0, width]);

    var y = d3.scale.linear()
      .range([height, 0]);

    var color = d3.scale.category10();

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

    var line = d3.svg.line()
      .interpolate("basis")
      .x(function(d) {
        return x(d.date);
      })
      .y(function(d) {
        return y(d.temperature);
      });

    var svg = d3.select("#multilinechart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var data = d3.tsv.parse(myData);

    console.log(d3.tsv.parse(myData),"abcdef");

    data = [];
    data = second_data;

    color.domain(d3.keys(data[0]).filter(function(key) {
      return key !== "date";
    }));

    // data.forEach(function(d) {
    //   console.log(d);
    //   d.date = parseDate(d.date);
    // });

    var cities = color.domain().map(function(name) {
      return {
        name: name,
        values: data.map(function(d) {
          return {
            date: d.date,
            temperature: +d[name]
          };
        })
      };
    });
    console.log(cities)

    x.domain(d3.extent(data, function(d) {
      return d.date;
    }));

    y.domain([
      d3.min(cities, function(c) {
        return d3.min(c.values, function(v) {
          return v.temperature;
        });
      }),
      d3.max(cities, function(c) {
        return d3.max(c.values, function(v) {
          return v.temperature;
        });
      })
    ]);

    var legend = svg.selectAll('g')
      .data(cities)
      .enter()
      .append('g')
      .attr('class', 'legend');

    legend.append('rect')
      .attr('x', width - 20)
      .attr('y', function(d, i) {
        return i * 20;
      })
      .attr('width', 10)
      .attr('height', 10)
      .style('fill', function(d) {
        return color(d.name);
      });

    legend.append('text')
      .attr('x', width - 8)
      .attr('y', function(d, i) {
        return (i * 20) + 9;
      })
      .text(function(d) {
        return d.name;
      });

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Temperature (ºF)");

    var city = svg.selectAll(".city")
      .data(cities)
      .enter().append("g")
      .attr("class", "city");

    city.append("path")
      .attr("class", "line")
      .attr("d", function(d) {
        return line(d.values);
      })
      .style("stroke", function(d) {
        return color(d.name);
      });

    city.append("text")
      .datum(function(d) {
        return {
          name: d.name,
          value: d.values[d.values.length - 1]
        };
      })
      .attr("transform", function(d) {
        return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")";
      })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function(d) {
        return d.name;
      });

    var mouseG = svg.append("g")
      .attr("class", "mouse-over-effects");

    mouseG.append("path") // this is the black vertical line to follow mouse
      .attr("class", "mouse-line")
      .style("stroke", "black")
      .style("stroke-width", "1px")
      .style("opacity", "0");
      
    var lines = document.getElementsByClassName('line');

    var mousePerLine = mouseG.selectAll('.mouse-per-line')
      .data(cities)
      .enter()
      .append("g")
      .attr("class", "mouse-per-line");

    mousePerLine.append("circle")
      .attr("r", 7)
      .style("stroke", function(d) {
        return color(d.name);
      })
      .style("fill", "none")
      .style("stroke-width", "1px")
      .style("opacity", "0");

    mousePerLine.append("text")
      .attr("transform", "translate(10,3)");

    mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
      .attr('width', width) // can't catch mouse events on a g element
      .attr('height', height)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mouseout', function() { // on mouse out hide line, circles and text
        d3.select(".mouse-line")
          .style("opacity", "0");
        d3.selectAll(".mouse-per-line circle")
          .style("opacity", "0");
        d3.selectAll(".mouse-per-line text")
          .style("opacity", "0");
      })
      .on('mouseover', function() { // on mouse in show line, circles and text
        d3.select(".mouse-line")
          .style("opacity", "1");
        d3.selectAll(".mouse-per-line circle")
          .style("opacity", "1");
        d3.selectAll(".mouse-per-line text")
          .style("opacity", "1");
      })
      .on('mousemove', function() { // mouse moving over canvas
        var mouse = d3.mouse(this);
        d3.select(".mouse-line")
          .attr("d", function() {
            var d = "M" + mouse[0] + "," + height;
            d += " " + mouse[0] + "," + 0;
            return d;
          });

        d3.selectAll(".mouse-per-line")
          .attr("transform", function(d, i) {
            // console.log(width/mouse[0])
            var xDate = x.invert(mouse[0]),
                bisect = d3.bisector(function(d) { return d.date; }).right;
              var  idx = bisect(d.values, xDate);
            
            var beginning = 0,
                end = lines[i].getTotalLength(),
                target = null;

            while (true){
              target = Math.floor((beginning + end) / 2);
              var pos = lines[i].getPointAtLength(target);
              if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                  break;
              }
              if (pos.x > mouse[0])      end = target;
              else if (pos.x < mouse[0]) beginning = target;
              else break; //position found
            }
            
            d3.select(this).select('text')
              .text(y.invert(pos.y).toFixed(2));
              
            return "translate(" + mouse[0] + "," + pos.y +")";
          });
      });
      

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
  </style>