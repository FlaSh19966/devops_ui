<template>
  <div id="chart">
  <svg width="700" height="3000" id="svg" />
  </div>
</template>

<script>
const d3 = require("d3");
export default {
  mounted () {
    console.log("Hi");
    // for(let i = 0; i < this.data.length; i++) {
    //   if(Number.isNaN(this.data[i][this.yKey])) {
    //     this.data = this.data.splice(0,this.data[i]);
    //   }
    // }
    // console.log(this.data);
    var svg = d3.select("#svg");
    var width = +svg.attr("width");
    var height = +400;
    var margin = { top: 20, left: 0, bottom: 30, right: 0 };
    var chartWidth = width - (margin.left + margin.right);
    var chartHeight = height - (margin.top + margin.bottom);
    
    // console.log(chartHeight / 2)
    this.chartLayer = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .style("z-index","-1000" );
    this.arc = d3
      .arc()
      .outerRadius(chartHeight / 2)
      .innerRadius(0)
      .padAngle(0.0)
      .cornerRadius(0)
    //   .startAngle( function ( d ) { return isNaN( d.startAngle ) ? 0 : d.startAngle; })
    // .endAngle( function ( d ) { return isNaN( d.endAngle ) ? 0 : d.endAngle; });
    this.pieG = this.chartLayer
      .append("g")
      .attr("transform", `translate(${chartWidth / 4}, ${chartHeight / 2})`);


    svg.append('g').attr('class', 'labelName');
    this.drawChart(this.data,chartHeight);

  },
  props: {
    data: Array,
    xKey: String,
    yKey: String,
  },
  watch: {
    data: function(newData) {
      this.drawChart(newData);
    }
  },
  methods: {
    drawChart: function(data,Height) {
      var vm = this;
      const color = d3.scaleOrdinal()
      // const color = d3.scaleQuantize()
       .domain(data.map(d => d[vm.xKey]))
      //  .range(d3.quantize(t => d3.interpolateSpectral  (t * 0.8 + 0.1), data.length).reverse());
      //  .range(d3.quantize(t => d3.interpolateSpectral  (t * 0.8 + 0.1), data.length).reverse());
         .range(["#5d62b5", "#29c3be", "#f1726e", "#fbc53f", "#62b58f", "#d0743c","#ca0020","#f4a582","#92c5de","#0571b0", "#d3fe14", "#fec7f8", "#0b7b3e", "#0bf0e9",'#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
            '#FF9AA2', '#FFB7B2', '#FFDAC1', '#B5EAD7', '#63d2a8', "#225a4b", "#e5df73", '#6666FF','#ff0000	','#a2798f','#d7c6cf','#e88758','#b13a15','#6d3656','#fffa90','#a4ffaa','#a6cbff','#8500f9','#b077ba','	#765284','#984b67','#9c624e','#feb8ff','#9be3bd','#775934','#008385','#6a2ca1','#e60e68','#ff6d01','#fee9d3'
            ]);

      var arcs = d3
        .pie()
        .sort(null)
        .value(function(d) {
          return d[vm.yKey];
        })(data);
      var block = this.pieG.selectAll(".arc").data(arcs);
      block.select("path").attr("d", this.arc);
      var newBlock = block
        .enter()
        .append("g")
        .attr("id", function(d, i) {
          return  i;
        })
        .classed("arc", true);
        var getAngle = function (d) {
         return (180 / Math.PI * (d.startAngle + d.endAngle) / 2 - 90);
         };

      newBlock
        .append("path")
        .attr("d", this.arc)
        .attr("id", function(d, i) {
          return "arc-" + i;
        })
        .attr("fill", d => color(d.data[vm.xKey]))
        .transition()
        .duration(function(d, i) {
            return i * 100;
          }).duration(1200)
        .attrTween('d', function(d) {
        var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
        return function(t) {
            d.endAngle = i(t);
          return vm.arc(d);
        }
      });

    // d3.select("#svg").selectAll("text").data(data)
    // .enter()
    // .append("text")
    // .attr("text-anchor", "middle")
    // .attr("x", function(d) {
    //   console.log(d.startAngle, arcs(d.startAngle));
    //     var a = d.startAngle + (d.endAngle - d.startAngle)/2 - Math.PI/2;
    //     d.cx = Math.cos(a) * ((Height / 2) - 75);
    //     return d.x = Math.cos(a) * ((Height / 2) - 20);
    // })
    // .attr("y", function(d) {
    //     var a = d.startAngle + (d.endAngle - d.startAngle)/2 - Math.PI/2;
    //     d.cy = Math.sin(a) * ((Height / 2) - 75);
    //     return d.y = Math.sin(a) * ((Height / 2) - 20);
    // })
    // .text(function(d) { return d[vm.yKey]; })
    // .each(function(d) {
    //     var bbox = this.getBBox();
    //     d.sx = d.x - bbox.width/2 - 2;
    //     d.ox = d.x + bbox.width/2 + 2;
    //     d.sy = d.oy = d.y + 5;
    // });

    // var label = 
     var outerArc = d3.arc()
                .outerRadius((Height/2) * 0.9)
                .innerRadius((Height/2) * 0.9);
      d3.select("#svg").select('.labelName').selectAll('text')
      .data(data)
    // newBlock
      .enter().append('text')
      .attr('dy', '.35em')
      .html(function(d) {
          // add "key: value" for given category. Number inside tspan is bolded in stylesheet.
          // console.log(d);
          return d[vm.xKey] + ': <tspan>' + (d[vm.yKey]) + '</tspan>';
      })
      .attr('transform', function(d) {

          // effectively computes the centre of the slice.
          // see https://github.com/d3/d3-shape/blob/master/README.md#arc_centroid
          var pos = outerArc.centroid(d);
          // changes the point to be on left or right depending on where label is.
          console.log(d);
          pos[0] = (Height/2) * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
          // console.log(vm.arc.centroid(d))
          return 'translate(' + pos + ')';
      })
      .style('text-anchor', function(d) {
          // if slice centre is on the left, anchor text to start, otherwise anchor to end
          return (midAngle(d)) < Math.PI ? 'start' : 'end';
      });

      function midAngle(d) { return d.startAngle + (d.endAngle - d.startAngle) / 2; }

      var tooltip = 
        d3.select("#chart").append("div").attr("class", "toolTip")
      newBlock.on("mouseover", function(d) {
         var x = d3.select(this).attr('id');
           tooltip
              .style("left", d3.event.pageX - 40 + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html((vm.data[x][vm.xKey]) + "<br>"  + (vm.data[x][vm.yKey]).toFixed(2));
      });

      newBlock.on("mouseout", function() {
        tooltip.style("display", "none"); // hide tooltip for that element
      });

      newBlock.on("mousemove", function(d) {
        tooltip
          .style("top", d3.event.layerY + 10 + "px") 
          .style("left", d3.event.layerX + 10 + "px"); 
      });

      setTimeout(() => {
        
      
      const g = d3.select("#chart")
            .append('svg');
      const l =  d3.select("#svg").append('g')
            .attr("transform", function(d,i){
            return "translate(20," + (i * 15 + 20) + ")"; // place each legend on the right and bump each one down 15 pixels
          });
      const xl = d3.scaleBand()
        	.range([0, 500])
        	.padding(1)
        	.domain(this.data.map(d => d[vm.xKey]))
        ;
      const legend = l.selectAll('.chart-legend')
        	.data(color.domain())
        	.enter()
        	.append('g')
          .attr('class', 'chart-legend')
          .attr('id', 'legend')
          .attr("dy", 2)
          .attr("dx", 2)
          .attr('transform', (d, i) => `translate(400,` + (i * 19 + 30) +`)`);
          
       legend.append('rect')
        	.attr('width', 13)
        	.attr('height', 12)
        	.style('fill', color)
        ;
        
        legend.append('text')
        	.attr('x', 20)
          .attr('y', 10)
          .style('color', "blue")
          .text(d => d)
        ;

      }, 900);
        
    }
  }
};
</script>
<style>
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
 .chart-legend {
    font-weight: 50 !important;
    font-size: 15px;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    }

  
</style>