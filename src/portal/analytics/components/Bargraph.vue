<template>
<div>
  <div id="barchart">

  </div>
  <!-- <button id="export">  </button> -->
</div>
</template>
<script>
import * as d3 from 'd3-3';
export default {
  name: "BarChart",
  props: {
    xKey: String,
    yKey: String,
    data: Array,
    currency_key: String,
  },
  mounted() {
  const vm = this;
   this.data.sort(function(a, b) {
            return b[vm.yKey] - a[vm.yKey];
      });
  var DATA_COUNT = 900;         
var MAX_LABEL_LENGTH = 30; 
      
var data = [];
data = this.data;
// for (var i = 0; i < DATA_COUNT; i++) {
//     var datum = {};
//     datum.label = stringGen(MAX_LABEL_LENGTH)
//     datum.value = Math.floor(Math.random() * 600);
//     data.push(datum);
// }
console.log(data);
function stringGen(maxLength) {
    var text = "";
    var charset = "abcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < getRandomArbitrary(1, maxLength) ; i++ ) {
        text += charset.charAt(Math.floor(Math.random() * charset.length));
    }                                                

    return text;
}
  
function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}  
 
                   
var margin =  {top: 20, right: 10, bottom: 20, left: 40};
var marginOverview = {top: 30, right: 10, bottom: 20, left: 40};
var selectorHeight = 10;
var width = 900 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom - selectorHeight;
var heightOverview = 80 - marginOverview.top - marginOverview.bottom;
       
// var maxLength = d3.max(data.map(function(d){ return d.label.length}))
// var barWidth = maxLength * 2;
var barWidth = 20 * 2;
var numBars = Math.round(width/barWidth);
var isScrollDisplayed = barWidth * data.length > width;
       

console.log(isScrollDisplayed)
  
var xscale = d3.scale.ordinal()
                .domain(data.slice(0,numBars).map(function (d) { return d[vm.xKey]; }))
                .rangeBands([0, width], .2);

var yscale = d3.scale.linear()
							.domain([0, d3.max(data, function (d) { return d[vm.yKey]; })])
              .range([height, 0]);
  
var xAxis  = d3.svg.axis().scale(xscale).orient("bottom");
var yAxis  = d3.svg.axis().scale(yscale).orient("left")
            .ticks(10, "s");
;
  
var svg = d3.select("#barchart").append("svg")
		.attr("width", width + margin.left + margin.right)
	    	.attr("height", height + margin.top + margin.bottom + selectorHeight);
  
var diagram = 
svg.append("g")
 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
diagram.append("g")
  		 .attr("class", "x axis")
       .attr("transform", "translate(0, " + height + ")")
       .call(xAxis)
       .selectAll(".tick text")
          .attr("y", 0)
          .attr("x", -10)
          .attr("dy", ".35em")
          .attr("transform", "rotate(-70)")
          .style("text-anchor", "end")
  
diagram.append("g")
       .attr("class", "y axis")
       .call(yAxis);
  
var bars = diagram.append("g");
  
bars.selectAll("rect")
            .data(data.slice(0, numBars), function (d) {return d[vm.xKey]; })
            .enter().append("rect")
            .attr("class", "bar-positive")
            .attr("id", function(d, i) {
              return  d[vm.xKey];
            })
            .attr("x", function (d) { return xscale(d[vm.xKey]); })
            .attr("y", function (d) { return yscale(d[vm.yKey]); })
            .attr("width", xscale.rangeBand())
            .attr("height", function (d) { return height - yscale(d[vm.yKey]); });

  
if (isScrollDisplayed)
{
  var xOverview = d3.scale.ordinal()
                  .domain(data.map(function (d) { return d[vm.xKey]; }))
                  .rangeBands([0, width], .2);
 var   yOverview = d3.scale.linear().range([heightOverview, 0]);
  yOverview.domain(yscale.domain());

  var subBars = diagram.selectAll('.subBar')
      .data(data)

  subBars.enter().append("rect")
      .classed('subBar', true)
      .attr({
          height: function(d) {
              return heightOverview - yOverview(d[vm.yKey]);
          },
          width: function(d) {
              return xOverview.rangeBand()
          },
          x: function(d) {

              return xOverview(d[vm.xKey]);
          },
          y: function(d) {
              return height + heightOverview + yOverview(d[vm.yKey])
          }
      })

  var displayed = d3.scale.quantize()
              .domain([0, width])
              .range(d3.range(data.length));

  diagram.append("rect")
              .attr("transform", "translate(0, " + (height + margin.bottom) + ")")
              .attr("class", "mover")
              .attr("x", 0)
              .attr("y", 0)
              .attr("height", selectorHeight)
              .attr("width", Math.round(parseFloat(numBars * width)/data.length))
              .attr("pointer-events", "all")
              .attr("cursor", "ew-resize")
              .call(d3.behavior.drag().on("drag", display));
}
function display () {
    var x = parseInt(d3.select(this).attr("x")),
        nx = x + d3.event.dx,
        w = parseInt(d3.select(this).attr("width")),
        f, nf, new_data, rects;

    if ( nx < 0 || nx + w > width ) return;

    d3.select(this).attr("x", nx);

    f = displayed(x);
    nf = displayed(nx);

    if ( f === nf ) return;

    new_data = data.slice(nf, nf + numBars);

    xscale.domain(new_data.map(function (d) { return d[vm.xKey]; }));
    diagram.select(".x.axis").call(xAxis)
    .selectAll(".tick text")
          .attr("y", 0)
          .attr("x", -10)
          .attr("dy", ".35em")
          .attr("transform", "rotate(-70)")
          .style("text-anchor", "end")  

    rects = bars.selectAll("rect")
    .data(new_data, function (d) {return d[vm.xKey]; });

	 	rects.attr("x", function (d) { return xscale(d[vm.xKey]); });

// 	  rects.attr("transform", function(d) { return "translate(" + xscale(d.label) + ",0)"; })

    rects.enter().append("rect")
      .attr("class", "bar-positive")
      .attr("id", function(d, i) {
        return  d[vm.xKey];
      })
      .attr("x", function (d) { return xscale(d[vm.xKey]); })
      .attr("y", function (d) { return yscale(d[vm.yKey]); })
      .attr("width", xscale.rangeBand())
      .attr("height", function (d) { return height - yscale(d[vm.yKey]); });

    rects.exit().remove();
};

var tooltip = d3.select(".card-body").append("div").attr("class", "toolTip");
          d3.selectAll(".bar-positive")
          .on("mouseover", function(d){
            var x = d3.select(this).attr('id'),
              n= vm.data.length,
              yval
              for(let i=0;  i < n; i++ ){
                if(vm.data[i][vm.xKey] === x) {
                  yval = vm.data[i][vm.yKey]
                }
              }
              // console.log(Number.isInteger(yval))
                  tooltip
                  .style("left", event.pageX - 315 + "px")
                  .style("top", event.pageY - 170 + "px")
                  .style("display", "inline-block")
                  // .html((vm.data[x][vm.yKey]) + "<br>"  + (vm.data[x][vm.xKey]));
                  .html( x + "<br>"  +vm.currency_key + ' ' +  ((Number.isInteger(yval))? yval : yval.toFixed(2)));
              })
              .on("mouseout", function(d){
                  tooltip.style("display", "none");
              });
  

  }
}

</script>
<style>
/* .bar {
  fill: steelblue;
  clip-path: url(#clip);
}
  
.subBar { 
  fill: gray;
  opacity: 0.5;
}

.axis path,
.axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}

.brush .extent {
  stroke: #fff;
  fill: steelblue;
  fill-opacity: .25;
  shape-rendering: crispEdges;
}

  rect.mover {
            stroke: red;
            stroke-opacity: .1;
            fill: lightSteelBlue;
            fill-opacity: .5;
        } */
</style>