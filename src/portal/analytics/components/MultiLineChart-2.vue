<template>
<div>
    <div id="chart"></div>
</div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "MultiLineChart2",
  // props : {

  // // },
  // data : {

  // },
  mounted() {
    //   var data = 
    //     [   
    //         {
    //             name: "USA",
    //             values: [
    //             {date: "20001212", price: "100"},
    //             {date: "20001213", price: "110"},
    //             {date: "20001214", price: "145"},
    //             {date: "20001215", price: "241"},
    //             {date: "20001216", price: "101"},
    //             {date: "20001217", price: "90"},
    //             {date: "20001218", price: "10"},
    //             {date: "20001219", price: "35"},
    //             {date: "20001220", price: "21"},
    //             {date: "20001221", price: "201"}
    //             ]
    //         },
    //         {
    //             name: "Canada",
    //             values: [
    //             {date: "20001212", price: "200"},
    //             {date: "20001213", price: "120"},
    //             {date: "20001214", price: "33"},
    //             {date: "20001215", price: "21"},
    //             {date: "20001216", price: "51"},
    //             {date: "20001217", price: "190"},
    //             {date: "20001218", price: "120"},
    //             {date: "20001219", price: "85"},
    //             {date: "20001220", price: "221"},
    //             {date: "20001221", price: "101"}
    //             ]
    //         },
    //         {
    //             name: "Maxico",
    //             values: [
    //             {date: "20001212", price: "50"},
    //             {date: "20001213", price: "10"},
    //             {date: "20001214", price: "5"},
    //             {date: "20001215", price: "71"},
    //             {date: "20001216", price: "20"},
    //             {date: "20001217", price: "9"},
    //             {date: "20001218", price: "220"},
    //             {date: "20001219", price: "235"},
    //             {date: "20001220", price: "61"},
    //             {date: "20001221", price: "10"}
    //             ]
    //         }
    //     ];

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
            {"SALES":174.17508000000004,"YEAR":"2016","DA-TENEW":"Sun, 03 Apr 2016 00:00:52 GMT","CATEGORY":"capsicum","MONTH":"04"},{"SALES":230.56272727272733,"YEAR":"2016","DATENEW":"Sun, 03 Apr 2016 00:34:19 GMT","CATEGORY":"Olympian Products","MONTH":"04"},{"SALES":96.84614727272728,"YEAR":"2016","DATENEW":"Sun, 03 Apr 2016 00:37:49 GMT","CATEGORY":"Nuts","MONTH":"04"},{"SALES":439.10896545454534,"YEAR":"2016","DATENEW":"Sun, 03 Apr 2016 01:42:18 GMT","CATEGORY":"Tomatoes","MONTH":"04"},{"SALES":512.0569200000001,"YEAR":"2016","DATENEW":"Sun, 03 Apr 2016 02:44:59 GMT","CATEGORY":"Grapes","MONTH":"04"},{"SALES":151.0479,"YEAR":"2016","DATENEW":"Sun, 03 Apr 2016 02:53:00 GMT","CATEGORY":"Pumpkins","MONTH":"04"},{"SALES":43.0,"YEAR":"2016","DATENEW":"Sun, 03 Apr 2016 02:53:00 GMT","CATEGORY":"Cut Veggies","MONTH":"04"},{"SALES":137.80607999999995,"YEAR":"2016","DATENEW":"Sun, 03 Apr 2016 06:09:50 GMT","CATEGORY":"Cucumbers","MONTH":"04"},{"SALES":119.0145,"YEAR":"2016","DATENEW":"Mon, 04 Apr 2016 01:18:00 GMT","CATEGORY":"Chillies","MONTH":"04"},{"SALES":276.1008799999999,"YEAR":"2016","DATENEW":"Mon, 04 Apr 2016 01:46:01 GMT","CATEGORY":"Mushrooms","MONTH":"04"},{"SALES":202.88474000000008,"YEAR":"2016","DATENEW":"Mon, 04 Apr 2016 03:52:08 GMT","CATEGORY":"Melons","MONTH":"04"},{"SALES":131.35276,"YEAR":"2016","DATENEW":"Tue, 05 Apr 2016 01:46:42 GMT","CATEGORY":"Tropical Fruits","MONTH":"04"},{"SALES":90.55818181818181,"YEAR":"2016","DATENEW":"Tue, 05 Apr 2016 04:01:07 GMT","CATEGORY":"Other Fruits","MONTH":"04"},{"SALES":187.63225999999992,"YEAR":"2016","DATENEW":"Tue, 05 Apr 2016 04:49:26 GMT","CATEGORY":"Pears","MONTH":"04"},{"SALES":496.3780800000003,"YEAR":"2016","DATENEW":"Tue, 05 Apr 2016 05:00:29 GMT","CATEGORY":"Onions","MONTH":"04"},{"SALES":20.44174,"YEAR":"2016","DATENEW":"Tue, 05 Apr 2016 22:36:34 GMT","CATEGORY":"Veggies","MONTH":"04"},{"SALES":642.8219400000002,"YEAR":"2016","DATENEW":"Wed, 06 Apr 2016 02:16:13 GMT","CATEGORY":"Potatoes","MONTH":"04"},{"SALES":275.8000000000002,"YEAR":"2016","DATENEW":"Wed, 06 Apr 2016 03:26:52 GMT","CATEGORY":"Avocadoes","MONTH":"04"},{"SALES":39.96,"YEAR":"2016","DATENEW":"Wed, 06 Apr 2016 03:27:58 GMT","CATEGORY":"Groceries-Dry Goods","MONTH":"04"},{"SALES":618.9657799999997,"YEAR":"2016","DATENEW":"Wed, 06 Apr 2016 04:47:53 GMT","CATEGORY":"Stonefruits","MONTH":"04"},{"SALES":348.5120000000002,"YEAR":"2016","DATENEW":"Thu, 07 Apr 2016 02:45:13 GMT","CATEGORY":"Lettuces","MONTH":"04"},{"SALES":293.10000000000025,"YEAR":"2016","DATENEW":"Thu, 07 Apr 2016 03:24:48 GMT","CATEGORY":"Bunch Vegies","MONTH":"04"},{"SALES":227.34999999999985,"YEAR":"2016","DATENEW":"Fri, 08 Apr 2016 01:04:44 GMT","CATEGORY":"Eggs","MONTH":"04"},{"SALES":138.97199999999998,"YEAR":"2016","DATENEW":"Fri, 08 Apr 2016 04:21:54 GMT","CATEGORY":"Herbs","MONTH":"04"},{"SALES":502.37238000000025,"YEAR":"2016","DATENEW":"Sat, 09 Apr 2016 03:34:50 GMT","CATEGORY":"Apples","MONTH":"04"},{"SALES":74.27000000000001,"YEAR":"2016","DATENEW":"Sat, 09 Apr 2016 04:22:37 GMT","CATEGORY":"Berries","MONTH":"04"},{"SALES":2.0,"YEAR":"2016","DATENEW":"Sat, 09 Apr 2016 04:22:37 GMT","CATEGORY":"Cut Fruits","MONTH":"04"}
        ]

    // var map = data.reduce((r, i) => ((r[i.CATEGORY] = r[i.CATEGORY] || []).push(), r), {});
    var map = api_data.reduce((r, i) => ((r[i.CATEGORY] = r[i.CATEGORY] || []).push({
      date : i.DATENEW,
      sales: i.SALES
    }), r), {});
    var entries = Object.entries(map);
    const data = [];
      for(let i =0; i < entries.length; i++) {
        data.push({
          name : entries[i][0],
          values: [],
        })
        for(let j =0 ; j < entries[i][1].length; j++) {
          data[i].values.push({
            date: new Date(entries[i][1][j].date),
            sales: entries[i][1][j].sales
          })
        }
      }

    // var map = data.reduce((r, i) => ((r[i.CATEGORY] = r[i.CATEGORY] || []).push({
    //   name: i.CATEGORY,
    //   values : [{
    //     date : i.DATENEW,
    //     value: i.SALES
    //   }]}), r), {});

var width = 500;
var height = 300;
var margin = 50;
var duration = 250;

var lineOpacity = "0.25";
var lineOpacityHover = "0.85";
var otherLinesOpacityHover = "0.1";
var lineStroke = "1.5px";
var lineStrokeHover = "2.5px";

var circleOpacity = '0.85';
var circleOpacityOnLineHover = "0.25"
var circleRadius = 3;
var circleRadiusHover = 6;


/* Format Data */
    var parseDate = d3.timeParse("%Y");
	var parseTime = d3.timeParse("%Y"),
		formatDate = d3.timeFormat("%Y-%m-%d"),
        bisectDate = d3.bisector(d => d.date).left
        
// console.log(data);
// data.forEach(function(d) { 
//     // console.log(d,"Hi2")
//   d.values.forEach(function(d) {
//     // console.log(d,"Hi")
//     // d.date = parseDate(d.date);
//     //  d.date = parseTime(d.date);
//     // d.price = +d.price; 
//     d.DATENEW = parseTime(d.DATENEW);
//     d.SALES = +d.SALES;    
//   });
// });

// data.forEach(function(d) {
// 		d.DATENEW = parseTime(d.DATENEW);
// 		return d;
// 	})


  // data.forEach(function(d) { 
  //   d.values.forEach(function(d) {
  //     d.date = parseTime(d.date);
  //     d.sales = +d.sales;    
  //   });
  // });
console.log(data);

/* Scale */
var xScale = d3.scaleTime()
  // .domain(d3.extent(api_data, d => (d.DATENEW)))
  .domain([d3.extent(data[0].values, d => d.date)])
  // .domain(d3.extent(api_data, function(d) { return d.DATENEW; }))
  .range([0, width-margin]);        

  console.log(d3.extent(api_data, d => (d.DATENEW)));
  console.log(d3.extent(data[0].values, d => d.date));

var yScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.sales)])
  .range([height-margin, 0]);

var color = d3.scaleOrdinal(d3.schemeCategory10);

/* Add SVG */
var svg = d3.select("#chart").append("svg")
  .attr("width", (width+margin)+"px")
  .attr("height", (height+margin)+"px")
  .append('g')
  .attr("transform", `translate(${margin}, ${margin})`);


/* Add line into SVG */
var line = d3.line()
  .x(d => xScale(+d.date))
  .y(d => yScale(+d.sales))
  // .curve(d3.curveLinear);;

// console.log(line);

let lines = svg.append('g')
  .attr('class', 'lines');
// console.log(data,"data")
lines.selectAll('.line-group')
  .data(data).enter()
  .append('g')
  .attr('class', 'line-group')  
  .on("mouseover", function(d, i) {
      svg.append("text")
        .attr("class", "title-text")
        .style("fill", color(i))        
        .text(d.name)
        .attr("text-anchor", "middle")
        .attr("x", (width-margin)/2)
        .attr("y", 5);
    })
  .on("mouseout", function(d) {
      svg.select(".title-text").remove();
    })
  .append('path')
  .attr('class', 'line')  
  .attr('d', d => line((d.values)))
  .style('stroke', (d, i) => color(i))
  .style('opacity', lineOpacity)
  .on("mouseover", function(d) {
      d3.selectAll('.line')
					.style('opacity', otherLinesOpacityHover);
      d3.selectAll('.circle')
					.style('opacity', circleOpacityOnLineHover);
      d3.select(this)
        .style('opacity', lineOpacityHover)
        .style("stroke-width", lineStrokeHover)
        .style("cursor", "pointer");
    })
  .on("mouseout", function(d) {
      d3.selectAll(".line")
					.style('opacity', lineOpacity);
      d3.selectAll('.circle')
					.style('opacity', circleOpacity);
      d3.select(this)
        .style("stroke-width", lineStroke)
        .style("cursor", "none");
    });


/* Add circles in the line */
lines.selectAll("circle-group")
  .data(data).enter()
  .append("g")
  .style("fill", (d, i) => color(i))
  .selectAll("circle")
  .data(d => d.values).enter()
  .append("g")
  .attr("class", "circle")  
  .on("mouseover", function(d) {
      d3.select(this)     
        .style("cursor", "pointer")
        .append("text")
        .attr("class", "text")
        .text(`${d.sales}`)
        .attr("x", d => xScale(d.date) + 5)
        .attr("y", d => yScale(d.sales) - 10);
    })
  .on("mouseout", function(d) {
      d3.select(this)
        .style("cursor", "none")  
        .transition()
        .duration(duration)
        .selectAll(".text").remove();
    })
  .append("circle")
  .attr("cx", d => xScale(d.date))
  .attr("cy", d => yScale(d.sales))
  .attr("r", circleRadius)
  .style('opacity', circleOpacity)
  .on("mouseover", function(d) {
        d3.select(this)
          .transition()
          .duration(duration)
          .attr("r", circleRadiusHover);
      })
    .on("mouseout", function(d) {
        d3.select(this) 
          .transition()
          .duration(duration)
          .attr("r", circleRadius);  
      });


/* Add Axis into SVG */
// console.log(d3.axisBottom(yScale));
var xAxis = d3.axisBottom(xScale).ticks(5)
// .tickFormat(d3.timeFormat("%y-%b-%d"))
// .tickValues(data.map(d=>d.DATENEW));
var yAxis = d3.axisLeft(yScale).ticks(6);

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0, ${height-margin})`)
  .call(xAxis)
  ;

svg.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append('text')
  .attr("y", 15)
  .attr("transform", "rotate(-90)")
  .attr("fill", "#000")
  .text("Total values");
  },
}
</script>
<style>
/* svg {
    font-family: Sans-Serif, Arial;
} */
.line {
  stroke-width: 2;
  fill: none;
}

.axis path {
  stroke: black;
}

.text {
  font-size: 12px;
}

.title-text {
  font-size: 12px;
}
</style>