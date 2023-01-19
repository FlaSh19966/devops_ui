<template>
<div>
  <div id="barchart">

  </div>
  <!-- <button id="export">  </button> -->
</div>
</template>

<script>
import * as d3 from 'd3';
import d3_save_pdf from 'd3-save-pdf';
export default {
  name: 'BarChart',
  props: {
    xKey: String,
    yKey: String,
    data: Array,
    currency_key: String,
  },
  mounted() {
    var vm = this;
    this.data.sort(function(a, b) {
            return b[vm.yKey] - a[vm.yKey];
      });
    // console.log(this.data, this.xKey, this.yKey)
  //#region  - Dimensions and Scales
    var margin = {top: 10, right: 110, bottom: 220, left: 90},
        width = 1010 - margin.left - margin.right,
        height = 570 - margin.top - margin.bottom;

      
    var marginOverview = {top: 30, right: 10, bottom: 20, left: 40};
    var heightOverview = 80 - marginOverview.top - marginOverview.bottom;
    var maxLength = d3.max(this.data.map(function(d){ return d[vm.xKey].length}))
    // var maxLength = this.data.length;
    // console.log(maxLength);
    var barWidth = maxLength * 1.1;
    var numBars = Math.round(width/barWidth);
    var isScrollDisplayed = barWidth * this.data.length > width;
    // console.log(maxLength,barWidth,numBars,barWidth*this.data.length,width);


    var x = d3.scaleBand()
              .range([0, width])
              .padding(0.1);
    var y = d3.scaleLinear()
              .range([height, 0]);
  //#endregion
    // console.log(isScrollDisplayed,numBars);

  //#region - Rectangles
    var svg = d3.select("#barchart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

      if(isScrollDisplayed){
        x.domain(this.data.slice(0,numBars).map(function(d) { return d[vm.xKey]; }));
      } else {
        x.domain(this.data.map(function(d) { return d[vm.xKey]; }));
      }
      y.domain([0, d3.max(this.data, function(d) { return d[vm.yKey]; })]);
      if(isScrollDisplayed){
        svg.selectAll(".bar-positive")
          .data(this.data.slice(0, numBars), function (d) {return d[vm.xKey]; })
          .enter().append("rect")
          .attr("class", "bar-positive")
          .attr("id", function(d, i) {
            return  d[vm.xKey]
          })
          .attr("x", function(d) { return x(d[vm.xKey]); })
          .attr("width", x.bandwidth() / 1.19)
          // .attr("y", function(d) { return y(d[vm.yKey]); })
          // .attr("height", function(d) { return height - y(d[vm.yKey]); });
          .attr("y", function(d) { return y(0); })
          .attr("height", function(d) { return height - y(0); });
        var xOverview = d3.scaleBand()
                        .domain(this.data.map(function (d) { return d.label; }))
                        .range([0, width], .2);
        var yOverview = d3.scaleLinear().range([heightOverview, 0]);
        yOverview.domain(y.domain());

        var displayed = d3.scaleQuantize()
                  .domain([0, width])
                  .range(d3.range(this.data.length));
        svg.append("g").append("rect")
                  .attr("transform", "translate(0, " + (height+3 ) + ")")
                  .attr("class", "mover")
                  .attr("x", 0)
                  .attr("y", 0)
                  .attr("rx", 5)
                  .attr("ry", 10)
                  .attr("height", 10)
                  .attr("width",Math.round(parseFloat(numBars * width)/vm.data.length))
                  .attr("pointer-events", "all")
                  .attr("cursor", "ew-resize")
                  .call(d3.drag().on("drag", display));
    svg.selectAll(".bar-positive")
    .transition()
    .duration(800)
    .attr("y", function(d) {return y(d[vm.yKey]); })
    .attr("height", function(d) {return height - y(d[vm.yKey]); })
    .delay(function(d,i){ return(i*100)})

      } else {
        svg.selectAll(".bar-positive")
          .data(this.data)
          .enter().append("rect")
          .attr("class", "bar-positive")
          .attr("id", function(d, i) {
           return  d[vm.xKey];
          })
          .attr("x", function(d) { return x(d[vm.xKey]); })
          .attr("width", x.bandwidth() / 1.19)
          // .attr("y", function(d) { return y(d[vm.yKey]); })
          // .attr("height", function(d) { return height - y(d[vm.yKey]); });
          .attr("y", function(d) { return y(0); })
          .attr("height", function(d) { return height - y(0); });

            svg.selectAll("rect")
            .transition()
            .duration(800)
            .attr("y", function(d) {return y(d[vm.yKey]); })
            .attr("height", function(d) {return height - y(d[vm.yKey]); })
            .delay(function(d,i){ return(i*100)})
      }
  //#endregion

  //#region - Axis
        if(numBars > 9) {
          xaxisforlargevalues();
        } else {
          xaxisforsmallvalues();
        }
        function xaxisforlargevalues() { svg.append("g")
          .attr("id","xaxis")
          .attr("transform", "translate(0," + (height+10) + ")")
          .call(d3.axisBottom(x))
          d3.selectAll("#xaxis text")
          .attr("y", 0)
          .attr("x", -10)
          .attr("dy", ".35em")
          .attr("transform", "rotate(-70)")
          .style("text-anchor", "end")
       
        } 
        // else {
        function xaxisforsmallvalues() {   svg
          .append("g")
          .attr("id","xaxis")
            // .attr("class", "x axis")
          .attr("transform", "translate(0," +(height+10) + ")")
          .call(d3.axisBottom(x))
          d3.selectAll(".tick text")
          .call(wrap, x.bandwidth())
          function wrap(text, width) {
            text.each(function() {
              var text = d3.select(this),
                  words = text.text().split(/\s+/).reverse(),
                  word,
                  line = [],
                  lineNumber = 0,
                  lineHeight = 1.1, // ems
                  y = text.attr("y"),
                  dy = parseFloat(text.attr("dy")),
                  tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
              while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                  line.pop();
                  tspan.text(line.join(" "));
                  line = [word];
                  tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word)
              
                }
              }
            });
          }
        }
        // }

        // add the y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y)
            // .tickFormat(d3.format(".0s")));
            .ticks(10, "s"));

        svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", -60)
        .attr("dy", ".75em")
        .attr("dx", "-5.5em")
        .attr("transform", "rotate(-90)")
        .text(this.yKey);
  //#endregion


  //#region - ToolTip
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
  //#endregion

  //#region - Animation
    // svg.selectAll("rect")
    // .transition()
    // .duration(4800)
    // .attr("y", function(d) { console.log(d);return y(d[vm.yKey]); })
    // .attr("height", function(d) { console.log(d);return height - y(d[vm.yKey]); })
    // .delay(function(d,i){console.log(i) ; return(i*100)})
  //#endregion


   function display () {
     // debugger;
        var xy = parseInt(d3.select(this).attr("x")),
            nx = xy + d3.event.dx,
            w = parseInt(d3.select(this).attr("width")),
            f, nf, new_data, rects;

          // console.log('xy'+xy)
          // console.log('nx'+nx)
          // console.log('w'+w)
          // console.log('widht'+ width)
          
        if ( nx < 0 || nx + w > width) return;

        d3.select(this).attr("x", nx);

        f = displayed(xy);
        nf = displayed(nx);
        // console.log('f'+f)
        // console.log('nf'+nf)

        if ( f === nf ) return;

        new_data = vm.data.slice(nf, nf + numBars);

        x.domain(new_data.map(function (d) { return d[vm.xKey]; }));

        if(numBars > 8 ){
          // xaxisforlargevalues();
          svg.select("#xaxis").call(d3.axisBottom(x))
        .selectAll("#xaxis text")
          .attr("y", 0)
          .attr("x", -10)
          .attr("dy", ".35em")
          .attr("transform", "rotate(-70)")
          .style("text-anchor", "end");
        } else {
          // xaxisforsmallvalues();
           svg.select("#xaxis").call(d3.axisBottom(x))
            d3.selectAll(".tick text")
          .call(wrap, x.bandwidth())
           function wrap(text, width) {
            text.each(function() {
              var text = d3.select(this),
                  words = text.text().split(/\s+/).reverse(),
                  word,
                  line = [],
                  lineNumber = 0,
                  lineHeight = 1.1, // ems
                  y = text.attr("y"),
                  dy = parseFloat(text.attr("dy")),
                  tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
              while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                  line.pop();
                  tspan.text(line.join(" "));
                  line = [word];
                  tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word)
              
                }
              }
            });
          }
        }
        
      // setTimeout(() => {
        
     
        rects = svg.selectAll(".bar-positive")
        .data(new_data, function (d) {return d[vm.xKey]; });
          rects.attr("x", function (d) { return x(d[vm.xKey]); });

    // 	  rects.attr("transform", function(d) { return "translate(" + xscale(d.label) + ",0)"; })

        rects.enter().append("rect")
        .attr("class", "bar-positive")
        .attr("id", function(d, i) {
            return  d[vm.xKey];
          })
        .attr("x", function (d) { return x(d[vm.xKey]); })
        .attr("y", function (d) { return y(d[vm.yKey]); })
        .attr("width", x.bandwidth()/ 1.19)
        .attr("height", function (d) { return height - y(d[vm.yKey]); })
        .on("mouseover", function(d){
              var x = d3.select(this).attr('id'),
              n= vm.data.length,
              yval
              for(let i=0;  i < n; i++ ){
                if(vm.data[i][vm.xKey] === x) {
                  yval = vm.data[i][vm.yKey]
                }
              }
                // console.log(vm.currency_key);
                  tooltip
                  .style("left", event.pageX - 315 + "px")
                  .style("top", event.pageY - 170 + "px")
                  .style("display", "inline-block")
                  // .html((vm.data[x][vm.yKey]) + "<br>"  + (vm.data[x][vm.xKey]));
                  .html( x + "<br>"  + vm.currency_key + ' ' + ((Number.isInteger(yval))? yval : yval.toFixed(2)));
              })
              .on("mouseout", function(d){
                  tooltip.style("display", "none");
              });
        rects.exit().remove();
        //  }, 1000);
    };

    // d3.select('button#export').on('click', function() {
    //   var config = {
    //     filename: 'customFileName',
    //   }
    //   d3_save_pdf.save(d3.select('svg').node(), config);
    //   svg
    //   .append('g')
    //   .append('image')
    //   .attr('xlink:href', 'assets/test.png')
    //   .attr("width", 100)
    //   .attr("height", 100)
    //   .attr("x", (width / 2)  - 50)
    //   .attr("y", (height / 6) * 5);

    // d3_save_pdf.embedRasterImages(svg.node())
    // });

  },
}
</script>

<style>
/* .tick line {
  stroke: #1b139c;
}
 .y.axis path {
        display: none;
    }
    .y.axis .tick line {
        display: none;
    }
  #xaxis path {
        display: none;
    }

    #xaxis .tick line{
        display: none;
    }
.bar-positive {
   fill: #00C7E6;
}

.bar-positive:hover {
  fill: rgb(105, 213, 209);;
}

.svg-container {
  display: inline-block;
  position: relative;
  width: 100%;
  padding-bottom: 1%;
  vertical-align: top;
  overflow: hidden;
}
.toolTip {
  position: absolute;
  display: none;
  min-width: 80px;
  height: auto;
  background: none repeat scroll 0 0 #ffffff;
  border: 1px solid rgba(130, 127, 127, 0.72);
  padding: 14px;
  text-align: center;
  z-index: 1000;
}
.subBar { 
  fill: gray;
  opacity: 0.11;
}
rect.mover {
            stroke: red;
            stroke-opacity: .1;
            fill: #505050;
            fill-opacity: .5;
            border-radius: 45px;
        } */
</style>