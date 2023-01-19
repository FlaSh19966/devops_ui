<template>
  <div id="barchart">

  </div>
</template>
<script>
import * as d3 from 'd3-3';

export default {
  name: 'ScrollableBarChart',
//   props: {
//     xKey: String,
//     yKey: String,
//     data: Array,
//   },
  mounted() {
    // var DATA_COUNT = 90;         
    // var MAX_LABEL_LENGTH = 30; 
        
    // var data = [];
    
    // for (var i = 0; i < DATA_COUNT; i++) {
    //     var datum = {};
    //     datum.label = stringGen(MAX_LABEL_LENGTH)
    //     datum.value = Math.floor(Math.random() * 600);
    //     data.push(datum);
    // }
    data = [
        {
          label: "Roses",
          value: 25
        },
        {
          label: "Tulips",
          value: 22
        },
        {
          label: "Daisies",
          value: 15
        },
        {
          label: "Narcissuses",
          value: 9
        },
        {
          label: "Tul6ips",
          value: 40
        },
        {
          label: "Dai4sies",
          value: 15
        },
        {
          label: "Narciss2uses",
          value: 9
        },
        {
          label: "Narcissus6es",
          value: 9
        },
        {
          label: "Ros5es",
          value: 25
        },
        {
          label: "Tulip4s",
          value: 40
        },
        {
          label: "3Daisies",
          value: 15
        },
        {
          label: "Narcis2suses",
          value: 9
        },
        {
          label: "Narcis1suses",
          value: 9
        },
        {
          label: "Rose11s",
          value: 25
        },
        {
          label: "Tulip21s",
          value: 40
        },
        {
          label: "Daisi44es",
          value: 15
        },
        {
          label: "Narcissuttses",
          value: 9
        },
        {
          label: "Narcissutttttttses",
          value: 9
        },
        {
          label: "Rosetertes",
          value: 25
        },
        {
          label: "Tulertips",
          value: 40
        },
        {
          label: "Daaaisies",
          value: 15
        },
        {
          label: "Narcissuqqqses",
          value: 9
        },
        {
          label: "Narcissussaes",
          value: 9
        },
        {
          label: "Ros233es",
          value: 25
        },
        {
          label: "Tulips212",
          value: 40
        },
        {
          label: "Daisi555es",
          value: 15
        },
        {
          label: "Narcissus555es",
          value: 9
        },
        {
          label: "Narcissu5555ses",
          value: 9
        },
        {
          label: "Daisi55es",
          value: 15
        },
        {
          label: "Narcissusweres",
          value: 9
        },
        {
          label: "Narcissusetrvcs",
          value: 9
        },
        {
          label: "Rose4s",
          value: 25
        },
        {
          label: "Tuli3ps",
          value: 40
        }
      ],
    // function stringGen(maxLength) {
    //     var text = "";
    //     var charset = "abcdefghijklmnopqrstuvwxyz0123456789";

    //     for( var i=0; i < getRandomArbitrary(1, maxLength) ; i++ ) {
    //         text += charset.charAt(Math.floor(Math.random() * charset.length));
    //     }                                                

    //     return text;
    // }
    
    function getRandomArbitrary(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }  
                        
    var margin =  {top: 20, right: 10, bottom: 120, left: 40};
    var marginOverview = {top: 30, right: 10, bottom: 20, left: 40};
    var selectorHeight = 40;
    var width = 800 - margin.left - margin.right;
    var height = 600 - margin.top - margin.bottom - selectorHeight;
    var heightOverview = 80 - marginOverview.top - marginOverview.bottom;
        
    var maxLength = d3.max(data.map(function(d){ console.log(d.label);return d.label.length}))
    var barWidth = maxLength * 2;
    var numBars = Math.round(width/barWidth);
    var isScrollDisplayed = barWidth * data.length > width;
        

    console.log(isScrollDisplayed)
    
    var xscale = d3.scale.ordinal()
                .domain(data.slice(0,numBars).map(function (d) { return d.label; }))
                .rangeBands([0, width], .2);

    var yscale = d3.scale.linear()
                .domain([0, d3.max(data, function (d) { return d.value; })])
                .range([height, 0]);
    
    var xAxis  = d3.svg.axis().scale(xscale).orient("bottom");
    var yAxis  = d3.svg.axis().scale(yscale).orient("left");
    
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
        .selectAll("text")
        .attr("y", 0)
        .attr("x", -10)
        .attr("dy", ".35em")
        .attr("transform", "rotate(-70)")
        .style("text-anchor", "end");
    
    diagram.append("g")
        .attr("class", "y axis")
        .call(yAxis);
    
    var bars = diagram.append("g");
    
    bars.selectAll("rect")
                .data(data.slice(0, numBars), function (d) {return d.label; })
                // .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function (d) { return xscale(d.label); })
                .attr("y", function (d) { return yscale(d.value); })
                .attr("width", xscale.rangeBand())
                .attr("height", function (d) { return height - yscale(d.value); });

    // isScrollDisplayed = false;
    if (isScrollDisplayed)
    {
    var xOverview = d3.scale.ordinal()
                    .domain(data.map(function (d) { return d.label; }))
                    .rangeBands([0, width], .2);
    var yOverview = d3.scale.linear().range([heightOverview, 0]);
    yOverview.domain(yscale.domain());

    // var subBars = diagram.selectAll('.subBar')
    //     .data(data)

    // subBars.enter().append("rect")
    //     .classed('subBar', true)
    //     .attr({
    //         height: function(d) {
    //             return heightOverview - yOverview(d.value);
    //         },
    //         width: function(d) {
    //             return xOverview.rangeBand()
    //         },
    //         x: function(d) {

    //             return xOverview(d.label);
    //         },
    //         y: function(d) {
    //             return height + heightOverview + yOverview(d.value)
    //         }
    //     })

    var displayed = d3.scale.quantize()
                .domain([0, width])
                .range(d3.range(data.length));
    console.log(Math.round(parseFloat(numBars * width)/data.length));
    diagram.append("rect")
                .attr("transform", "translate(0, " + (height ) + ")")
                .attr("class", "mover")
                .attr("x", 0)
                .attr("y", 0)
                .attr("height", 10)
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

        xscale.domain(new_data.map(function (d) { return d.label; }));
        diagram.select(".x.axis").call(xAxis)
        .selectAll("text")
          .attr("y", 0)
          .attr("x", -10)
          .attr("dy", ".35em")
          .attr("transform", "rotate(-70)")
          .style("text-anchor", "end");;

        rects = bars.selectAll("rect")
        .data(new_data, function (d) {return d.label; });

            rects.attr("x", function (d) { return xscale(d.label); });

    // 	  rects.attr("transform", function(d) { return "translate(" + xscale(d.label) + ",0)"; })

        rects.enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return xscale(d.label); })
        .attr("y", function (d) { return yscale(d.value); })
        .attr("width", xscale.rangeBand())
        .attr("height", function (d) { return height - yscale(d.value); });

        rects.exit().remove();
    };
  }
}

</script>
<style>
/* .bar {
  fill: steelblue;
  clip-path: url(#clip);
} */
  
/* .subBar { 
  fill: gray;
  opacity: 0.11;
} */

/* .axis path,
.axis line {
    display: none;
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
} */

/* .brush .extent {
  stroke: #fff;
  fill: steelblue;
  fill-opacity: .25;
  shape-rendering: crispEdges;
} */

  /* rect.mover {
            stroke: red;
            stroke-opacity: .1;
            fill: lightSteelBlue;
            fill-opacity: .5;
        } */
</style>