<template>
  <div id="svg"></div>
</template>

<script>
import * as d3 from "d3";
export default {
    name: "LineChartAlternative",
    props: {
        data:Array,
        xKey: String,
        yKey: String,
    },
  mounted() {
    var vm = this;
    var tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("z-index", "1000")
      .style("visibility", "hidden")
      .attr("id", "tooltip");

    // Set the dimensions of the canvas / graph
    var margin = { top: 30, right: 20, bottom: 30, left: 50 },
        width = 800 - margin.left - margin.right,
        height = 520 - margin.top - margin.bottom;

    // Parse the date / time
    // var parseDate = d3.time.format("%d-%b-%y").parse;

    // Set the ranges
    var x = d3.scaleBand().range([20, width-40]);
    var y = d3.scaleLinear().range([height, 20]);

    // Define the axes
    var xAxis = d3
      .axisLeft(y)

    var yAxis = d3
    .axisBottom(x)

    // Define the line
    var valueline = d3
      .line()
      .x(function(d) {
        return x(d[vm.xKey]);
      })
      .y(function(d) {
        return y(d[vm.yKey] );
      });

    // Adds the svg canvas
    var svg = d3
      .select("#svg")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", 700 + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + (margin.left +30) + "," + margin.top + ")");

    this.data.forEach(function(d) {
      d[vm.xKey] = d[vm.xKey];
      d[vm.yKey] = +d[vm.yKey];
    });

    // Scale the range of the data
    // x.domain(
    //   d3.extent(this.data, function(d) {
    //     return d[vm.xKey];
    //   })
    // );
    x.domain(this.data.map(function(d) { return d[vm.xKey] }))
    y.domain([
      0,
      d3.max(this.data, function(d) {
        return d[vm.yKey];
      })
    ]);

    // Add the valueline path.
    svg
      .append("path")
      .attr("class", "line-linechart")
      .attr("d", valueline(this.data))
      ;

    // draw the scatterplot
    svg
      .selectAll("dot")
      .data(this.data) 
      .enter()
      .append("circle") 
      .attr("r", 5) 
      .attr("cx", function(d) {
        return x(d[vm.xKey]);
      }) 
      .attr("cy", function(d) {
        return y(d[vm.yKey]);
      }) 
      .on("mouseover", function(d) {
        tooltip.html('<span id="a" style="background: none repeat scroll 0 0 #ffffff;min-width: 80px; height: auto; padding: 14px;position: absolute;text-align: center;border: 1px solid #6F257F;">'+ d[vm.xKey] + '<br>' + d[vm.yKey] + '</span>');
        return tooltip.style("visibility", "visible");
        ;
      })
      .on("mousemove", function() {
        return tooltip
          .style("top", event.pageY - 40 + "px")
          .style("left", event.pageX + 10 + "px");
      })
      .on("mouseout", function() {
        return tooltip.style("visibility", "hidden");
      });

    // Add the Y Axis
    svg
      .append("g") // Add the Y Axis
      .attr("class", "y axis")
    //   .attr("transform", "translate(0," + height + ")")
      .attr("transform", "translate(1,0)")
      .call(xAxis)
     
      .append("text")
      .attr("fill", "#000")
      // .attr("transform", "rotate(-90)")
      .attr("y", 10)
      .attr("x", 74)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text(this.yKey + '/' + this.xKey );
       d3.selectAll(".tick text")
      // .attr("x", "2em")
      .attr('transform', `translate(-10,0)`)

    // Add the X Axis
    svg
      .append("g") // Add the X Axis
      .attr("class", "x axis")
      .attr("transform", "translate(-19 ," + (height) + ")")
      .call(yAxis)
            .selectAll("text")
      .attr("y", 0)
      .attr("x", -10)
      .attr("dy", ".35em")
      .attr("transform", "rotate(-70)")
      .style("text-anchor", "end")
      // d3.selectAll(".tick line")
      // .attr("dx", -10)
      //  d3.selectAll(".tick text")
      // .call(wrap, x.bandwidth());

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
              tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
          }
        });
      }
  }
};
</script>
<style>
.line-linechart {
  fill: none;
  stroke: #273679;
  stroke-width: 1px;
	shape-rendering: crispEdges;
}
</style>
<style scoped>
path { 
	stroke: steelblue;
	stroke-width: 3;
	fill: none;
}



/* .toolTip {
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