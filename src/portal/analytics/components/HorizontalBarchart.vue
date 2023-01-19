<template>
    <div id="horizontal_barchart">

    </div>
</template>

<script>
import * as d3 from 'd3';

export default {
    name:"HorizontalBarchart",
    props : {
        xKey: String,
        yKey: String,
        data: Array,
        currency_key: String,
    },
    mounted() {
        var vm = this;
        // chartData.sort(function(a, b){return -a});
        var chartData = JSON.parse(JSON.stringify(this.data))

         chartData.sort(function(a, b) {
            return a[vm.xKey] - b[vm.xKey];
        });

        //dimensions
        var margin = {top: 20, right: 90, bottom: 50, left: 150},
            width = 910 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var y = d3.scaleBand()
                .range([height, 0])
                .padding(0.1);

        var x = d3.scaleLinear()
                .range([0, width]);

        var svg = d3.select("#horizontal_barchart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");


        x.domain([0, d3.max(chartData, function(d){ return d[vm.xKey]; })])
        y.domain(chartData.map(function(d) { return d[vm.yKey]; }));

        svg.selectAll(".bar-positive-horizontal")
            .data(chartData)
            .enter().append("rect")
            .attr("class", "bar-positive-horizontal")
            .attr("id", function(d, i) {
                return  i;
            })
            // .attr("width", function(d) {return x(d[vm.xKey]); } )
            // .attr("y", function(d) { return y(d[vm.yKey]); })
            .attr("width", function(d) {return x(0); } )
            .attr("y", function(d) { return y(0); })
            .attr("height", y.bandwidth()/1.1);

        // add the x Axis
        svg.append("g")
          .attr("id","xaxis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).ticks(10, "s"));

        // add the y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y))

         svg.append("text")
        .attr("transform",
                "translate(" + (width/2) + " ," + (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text(this.xKey);


        var tooltip = d3.select("#horizontal_barchart").append("div").attr("class", "toolTip");
        d3.selectAll(".bar-positive-horizontal")
        .on("mouseover", function(d){
            d3.select(this).style("fill", d3.rgb("#FF9750").brighter(.65));
            var x = d3.select(this).attr('id');
                tooltip
                .style("left", event.pageX - 315 + "px")
                .style("top", event.pageY - 290 + "px")
                .style("display", "inline-block")
                .html((chartData[x][vm.yKey]) + "<br>" + vm.currency_key + ' ' + ((Number.isInteger(chartData[x][vm.xKey])) ? (chartData[x][vm.xKey]) : (chartData[x][vm.xKey]).toFixed(2)));
            })
            .on("mouseout", function(d){
                 d3.select(this).style("fill", ("#FF9750"));
                tooltip.style("display", "none");
            });

        svg.selectAll("rect")
        .transition()
        .duration(800)
        .attr("y", function(d) { return y(d[vm.yKey]); })
        .attr("width", function(d) { return x(d[vm.xKey]); })
        .delay(function(d,i){ return(i*100)})


    },
}
</script>
<style>
    /* .bar-positive-horizontal{
        fill: #FF9750;
    } */
/* .y.axis path {
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
    } */
</style>
