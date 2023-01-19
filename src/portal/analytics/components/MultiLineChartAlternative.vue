<template>
<div id="#chart">
<div id="test1">
  <svg></svg>
</div>
</div>
</template>

<script>
import * as d3 from "d3-3";
export default {
  name: "MultiLineChartAlternative",
  props : {
    xKey: String,
    yKey: String,
    apiData: Array,
    dateKey: String
  },
  // data : {

  // },
  mounted() {

      setTimeout(() => {
        resize_of_page();
        resize_of_page();
        resize_of_page();
        resize_of_page();
        resize_of_page();
      }, 400);
      // setTimeout(() => {
      //   resize_of_page();
      // }, 1200);
      // setTimeout(() => {
      //   resize_of_page();
      // }, 1500);
      // setTimeout(() => {
      //   resize_of_page();
      // }, 800);

    // console.log(this.xKey,this.yKey,this.dateKey);
    // console.log(this.apiData);
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

    // var map = api_data.reduce((r, i) => (console.log(r),((r[i.CATEGORY] = r[i.CATEGORY] || []).push({
    //   date : i.DATENEW,
    //   sales: i.SALES
    // }), r)), {});
    // var entries = Object.entries(map);
    // const second_data = [];
    //   for(let i =0; i < entries.length; i++) {
    //     second_data.push({
    //       label : entries[i][0],
    //       data: [],
    //     })
    //     for(let j =0 ; j < entries[i][1].length; j++) {
    //       second_data[i].data.push({
    //         date: entries[i][1][j].date,
    //         sales: entries[i][1][j].sales
    //       })
    //     }
    //   }
    // console.log("second data",second_data)

    // const data = [];
    //   for(let i =0; i < entries.length; i++) {
    //     data.push({
    //       label : entries[i][0],
    //       data: [],
    //     })
    //     for(let j =0 ; j < entries[i][1].length; j++) {
    //       data[i].data.push({
    //         date: new Date(entries[i][1][j].date),
    //         sales: entries[i][1][j].sales
    //       })
    //     }
    //   }
    // var vm =this;
    // console.log(this.apiData);
    var map = this.apiData.reduce((r, i) => ((r[i[this.xKey]] = r[i[this.xKey]] || []).push({
      // date : i["MONTH"]+"/"+"01/"+i["YEAR"],
      date : i[this.dateKey],
      // date : i["MONTH"],
      sales: i[this.yKey]
      // i
    }), r), {});
    var entries = Object.entries(map);
    // console.log(entries);
    const second_data = [];
      for(let i =0; i < entries.length; i++) {
        second_data.push({
          label : entries[i][0],
          data: [],
        })
        for(let j =0 ; j < entries[i][1].length; j++) {
          second_data[i].data.push({
            date: entries[i][1][j].date,
            sales: entries[i][1][j].sales
          })
        }
      }
    // console.log("second data",second_data)

    const data = [];
      for(let i =0; i < entries.length; i++) {
        data.push({
          label : entries[i][0],
          data: [],
        })
        for(let j =0 ; j < entries[i][1].length; j++) {
          data[i].data.push({
            date: new Date(entries[i][1][j].date),
            sales: entries[i][1][j].sales
          })
        }
      }

    // console.log(data[0].data[0].date, "HI",new Date(data[0].data[0].date));
    // console.log("final data",data,"Hi");


    var margin = {top: 30, right: 10, bottom: 50, left: 60},
      chart = d3LineWithLegend()
                .xAxis.label(this.xKey)
                .width(width(margin))
                .height(height(margin))
                .yAxis.label(this.yKey);


  var svg = d3.select('#test1 svg')
      .datum(generateData())

  svg.transition().duration(0)
      .attr('width', width(margin))
      .attr('height', height(margin))
      .call(chart);


  chart.dispatch.on('showTooltip', function(e) {
  var offset = $('#test1').offset(), // { left: 0, top: 0 }
        left = e.pos[0] + offset.left,
        top = e.pos[1] + offset.top,
        // formatter = d3.time.format("%m/%d/%Y")
        formatter = d3.time.format("%a,%b/%d/%y")
        // console.log(e);
    // TODO :  
    var content = '<h3>' + e.series.label + '</h3>' +
                  '<p>' +
                  '<span class="value">[' + e.point.sales.toFixed(2) + ', ' + formatter(e.point.date) + ']</span>' +
                  '</p>';
              

    nvtooltip.show([left, top], content);
  });

  chart.dispatch.on('hideTooltip', function(e) {
    nvtooltip.cleanup();
  });




  $(window).resize(function() {
    resize_of_page();

    });

    function resize_of_page(){
          var margin = chart.margin();
    chart
      .width(width(margin))
      .height(height(margin));

    d3.select('#test1 svg')
      .attr('width', width(margin))
      .attr('height', height(margin))
      .call(chart);
    }


  function width(margin) {
    var w = $(".card-body").width() - 40;

    // return 500;
    return ( (w - margin.left - margin.right - 20) < 0 ) ? margin.left + margin.right + 2 : w;
  }

  function height(margin) {
    // var h = $(".card-body").height() - 20;
    // var h = $(".card-body").height() - 20;
    var h = 700 - 100;

    return ( h - margin.top - margin.bottom - 20 < 0 ) ? 
              margin.top + margin.bottom + 2 : h;

    // return 700
  }


  //data
  function generateData() {
    var sin = [],
        sin2 = [],
        cos = [],
        cos2 = [],
        sin3  = [],
        sin4 = [],
        sin5 = [],
        sin6 = [],
        cos2 = [],
        r1 = Math.random(),
        r2 = Math.random(),
        r3 = Math.random(),
        r4 = Math.random(),
        r5 = Math.random(),
        r6 = Math.random(),
        r7 = Math.random()
        // r4 = Math.random();

    for (var i = 0; i < 100; i++) {
      sin.push([ i, r1 * Math.sin( r2 +  i / (10 * (r4 + .5) ))]);
      cos.push([ i, r2 * Math.cos( r3 + i / (10 * (r3 + .5) ))]);
      sin2.push([ i, r3 * Math.sin( r3 + i / (10 * (r2 + .5) ))]);
      sin3.push([ i, r4 * Math.sin( r4 + i / (10 * (r2 + .5) ))]);
      sin4.push([ i, r5 * Math.sin( r5 + i / (10 * (r2 + .5) ))]);
      sin5.push([ i, r6 * Math.sin( r6 + i / (10 * (r2 + .5) ))]);
      sin6.push([ i, r7 * Math.sin( r7 + i / (10 * (r2 + .5) ))]);
      cos2.push([ i, r4 * Math.cos( r4 + i / (10 * (r1 + .5) ))]);
    }
      // console.log(cos);

    return data;

    // return [
    //   {
    //     data: sin,
    //     label: "Sine Wave"
    //   },
    //   {
    //     data: cos,
    //     label: "Cosine Wave"
    //   },
    //   {
    //     data: sin2,
    //     label: "Sine2 Wave"
    //   },
    //   {
    //     data: cos2,
    //     label: "Cosine2 Wave"
    //   },
    //   {
    //     data: sin3,
    //     label: "Sine3 Wave"
    //   },
    //   {
    //     data: sin4,
    //     label: "Sine4 Wave"
    //   },
    //   {
    //     data: sin5,
    //     label: "Sine5 Wave"
    //   },
    //   {
    //     data: sin6,
    //     label: "Sine6 Wave"
    //   },

    // ];
    // console.log(data)
  }

  function d3Legend() {
      var margin = {top: 5, right: 0, bottom: 5, left: 10},
          width = 400,
          height = 20,
          color = d3.scale.category20().range(),
          dispatch = d3.dispatch('legendClick', 'legendMouseover', 'legendMouseout');


      function chart(selection) {
        selection.each(function(data) {
          // console.log("Function-chart",data);
          /**
          *    Legend curently is setup to automaticaly expand vertically based on a max width.
          *    Should implement legend where EITHER a maxWidth or a maxHeight is defined, then
          *    the other dimension will automatically expand to fit, and anything that exceeds
          *    that will automatically be clipped.
          **/

          var wrap = d3.select(this).selectAll('g.legend').data([data]);
          var gEnter = wrap.enter().append('g').attr('class', 'legend').append('g');


          var g = wrap.select('g')
              .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


          var series = g.selectAll('.series')
              .data(function(d) { return d });
          var seriesEnter = series.enter().append('g').attr('class', 'series')
              .on('click', function(d, i) {
                // dispatch.legendClick(d, i);
              })
              .on('mouseover', function(d, i) {
                dispatch.legendMouseover(d, i);
              })
              .on('mouseout', function(d, i) {
                dispatch.legendMouseout(d, i);
              });
          seriesEnter.append('circle')
              .style('fill', function(d, i){ return d.color || color[i % 10] })
              .style('stroke', function(d, i){ return d.color || color[i % 10] })
              .attr('r', 5);
          seriesEnter.append('text')
              .text(function(d) { return d.label })
              .attr('text-anchor', 'start')
              .attr('dy', '.32em')
              .attr('dx', '8');
          series.classed('disabled', function(d) { return d.disabled });
          series.exit().remove();


          var ypos = 5,
              newxpos = 5,
              maxwidth = 0,
              xpos;
          series
              .attr('transform', function(d, i) {
                var length = d3.select(this).select('text').node().getComputedTextLength() + 28;
                xpos = newxpos;

                //TODO: 1) Make sure dot + text of every series fits horizontally, or clip text to fix
                //      2) Consider making columns in line so dots line up
                //         --all labels same width? or just all in the same column?
                //         --optional, or forced always?
                if (width < margin.left + margin.right + xpos + length) {
                  newxpos = xpos = 5;
                  ypos += 20;
                }

                newxpos += length;
                if (newxpos > maxwidth) maxwidth = newxpos;

                return 'translate(' + xpos + ',' + ypos + ')';
              });

          //position legend as far right as possible within the total width
          g.attr('transform', 'translate(' + (width - margin.right - maxwidth) + ',' + margin.top + ')');

          height = margin.top + margin.bottom + ypos + 15;
        });

        return chart;
      }

      chart.dispatch = dispatch;

      chart.margin = function(_) {
        if (!arguments.length) return margin;
        margin = _;
        return chart;
      };

      chart.width = function(_) {
        if (!arguments.length) return width;
        width = _;
        return chart;
      };

      chart.height = function(_) {
        if (!arguments.length) return height;
        height = _;
        return chart;
      };

      chart.color = function(_) {
        if (!arguments.length) return color;
        color = _;
        return chart;
      };

      return chart;
  }


  function d3Line() {
  var margin = {top: 0, right: 0, bottom: 0, left: 0},
      width = 960,
      height = 500,
      dotRadius = function() { return 2.5 },
      color = d3.scale.category20().range(),
      id = Math.floor(Math.random() * 10000), //Create semi-unique ID incase user doesn't select one
      // x = d3.scale.linear(),
      x = d3.time.scale(),
      y = d3.scale.linear(),
      dispatch = d3.dispatch("pointMouseover", "pointMouseout"),
      x0, y0;


  function chart(selection) {
    selection.each(function(data) {
      var seriesData = data.map(function(d) { return d.data });
      // console.log(data);
      // console.log(seriesData);
      // console.log(domain(d3.extent(d3.merge(seriesData), function(d) {  return d.date } )));
      x0 = x0 || x;
      y0 = y0 || y;

      //TODO: reconsider points {x: #, y: #} instead of [x,y]
      //TODO: data accessors so above won't really matter, but need to decide for internal use

      //add series data to each point for future ease of use
      data = data.map(function(series, i) {
        series.data = series.data.map(function(point) {
          point.series = i;
          return point;
        });
        return series;
      });


      // x   .domain(d3.extent(d3.merge(seriesData), function(d) { return d[0] } ))
      x.domain(d3.extent(d3.merge(seriesData), function(d) {  return d.date } ))
      // x   .domain(d3.extent(api_data, function(d) { return d.DATENEW; }))
        // x.domain(api_data.map((d)=>{
        // return d.DATENEW
        // }))
          .range([0, width - margin.left - margin.right]);

      // y   .domain(d3.extent(d3.merge(seriesData), function(d) { return d[1] } ))
      y.domain(d3.extent(d3.merge(seriesData), function(d) { return d.sales } ))
          .range([height - margin.top - margin.bottom, 0]);

      // var vertices = "";

      var vertices = d3.merge(data.map(function(line, lineIndex) {
            return line.data.map(function(point, pointIndex) {
              var pointKey = line.label + '-' + point[0];
              // console.log(point)
              // return [x(point[0]), y(point[1]), lineIndex, pointIndex]; //adding series index to point because data is being flattened
              return [x(point.date), y(point.sales), lineIndex, pointIndex]; //adding series index to point because data is being flattened
            })
          })
      );
      // console.log("verti",vertices);


      var wrap = d3.select(this).selectAll('g.d3line').data([data]);
      var gEnter = wrap.enter().append('g').attr('class', 'd3line').append('g');

      gEnter.append('g').attr('class', 'lines');
      gEnter.append('g').attr('class', 'point-clips');
      gEnter.append('g').attr('class', 'point-paths');


      var g = wrap.select('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');



      var voronoiClip =  gEnter.append('g').attr('class', 'voronoi-clip')
        .append('clipPath')
          .attr('id', 'voronoi-clip-path-' + id) //this id should probably be set on update, unless ID is always set before render
        .append('rect');
      wrap.select('.voronoi-clip rect')
          .attr('x', -10)
          .attr('y', -10)
          .attr('width', width - margin.left - margin.right + 20)
          .attr('height', height - margin.top - margin.bottom + 20);
      wrap.select('.point-paths')
          .attr('clip-path', 'url(#voronoi-clip-path-' + id + ')');


      //var pointClips = wrap.select('.point-clips').selectAll('clipPath') // **BROWSER BUG** can't reselect camel cased elements
      var pointClips = wrap.select('.point-clips').selectAll('.clip-path')
          .data(vertices);
      pointClips.enter().append('clipPath').attr('class', 'clip-path')
        .append('circle')
          .attr('r', 25);
      pointClips.exit().remove();
      pointClips
          .attr('id', function(d, i) { return 'clip-' + id + '-' + d[2] + '-' + d[3] })
          .attr('transform', function(d) { return 'translate(' + d[0] + ',' + d[1] + ')' });


      var voronoi = d3.geom.voronoi(vertices).map(function(d,i) {
          return { 'data': d, 'series': vertices[i][2], 'point': vertices[i][3] }
      });
      // console.log("voro",voronoi);

      //TODO: Add very small amount of noise to prevent duplicates
      var pointPaths = wrap.select('.point-paths').selectAll('path')
          .data(voronoi);
      pointPaths.enter().append('path')
          .attr('class', function(d,i) { return 'path-' + i; });
      pointPaths.exit().remove();
      pointPaths
          .attr('clip-path', function(d) { return 'url(#clip-' + id + '-' + d.series + '-' + d.point + ')'; })
          .attr('d', function(d) { return 'M' + d.data.join(',') + 'Z'; })
          .on('mouseover', function(d) {
            dispatch.pointMouseover({
              point: data[d.series].data[d.point],
              series: data[d.series],
              // pos: [x(data[d.series].data[d.point][0]) + margin.left, y(data[d.series].data[d.point][1]) + margin.top],
              pos: [x(data[d.series].data[d.point].date) + margin.left, y(data[d.series].data[d.point].sales) + margin.top],
              pointIndex: d.point,
              seriesIndex: d.series
            });
          })
          .on('mouseout', function(d) {
            dispatch.pointMouseout({
              point: d,
              series: data[d.series],
              pointIndex: d.point,
              seriesIndex: d.series
            });
          });


      dispatch.on('pointMouseover.point', function(d) { 
        wrap.select('.line-' + d.seriesIndex + ' .point-' + d.pointIndex)
          .classed('hover', true);
      });

      dispatch.on('pointMouseout.point', function(d) { 
        wrap.select('.line-' + d.seriesIndex + ' .point-' + d.pointIndex)
          .classed('hover', false);
      });



      var lines = wrap.select('.lines').selectAll('.line')
          .data(function(d) { return d }, function(d) { return d.label });
      lines.enter().append('g')
          .style('stroke-opacity', 1e-6)
          .style('fill-opacity', 1e-6);
      d3.transition(lines.exit())
          .style('stroke-opacity', 1e-6)
          .style('fill-opacity', 1e-6)
          .remove();
      lines.attr('class', function(d,i) { return 'line line-' + i })
          .classed('hover', function(d) { return d.hover })
          .style('fill', function(d,i) { return color[i % 10] })
          .style('stroke', function(d,i) { return color[i % 10] })
      d3.transition(lines)
          .style('stroke-opacity', 1)
          .style('fill-opacity', .5);


      var paths = lines.selectAll('path')
          .data(function(d, i) { return [d.data] });
      paths.enter().append('path')
          .attr('d', d3.svg.line()
            // .x(function(d) { return x0(d[0]) })
            // .y(function(d) { return y0(d[1]) })
             .x(function(d) { return x0(d.date) })
            .y(function(d) { return y0(d.sales) })
          );
      paths.exit().remove();
      d3.transition(paths)
          .attr('d', d3.svg.line()
            // .x(function(d) { return x(d[0]) })
            // .y(function(d) { return y(d[1]) })
             .x(function(d) { return x(d.date) })
            .y(function(d) { return y(d.sales) })
          );


      var points = lines.selectAll('circle.point')
          .data(function(d) { return d.data });
      points.enter().append('circle')
          // .attr('cx', function(d) { return x0(d[0]) })
          // .attr('cy', function(d) { return y0(d[1]) });
          .attr('cx', function(d) { return x0(d.date) })
          .attr('cy', function(d) { return y0(d.sales) });
      points.exit().remove();
      points.attr('class', function(d,i) { return 'point point-' + i });
      d3.transition(points)
          // .attr('cx', function(d) { return x(d[0]) })
          // .attr('cy', function(d) { return y(d[1]) })
          .attr('cx', function(d) { return x(d.date) })
          .attr('cy', function(d) { return y(d.sales) })
          .attr('r', dotRadius());

    });

    x0 = x;
    y0 = y;

    return chart;
  }



  chart.dispatch = dispatch;

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.dotRadius = function(_) {
    if (!arguments.length) return dotRadius;
    dotRadius = d3.functor(_);
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = _;
    return chart;
  };

  chart.id = function(_) {
    if (!arguments.length) return id;
    id = _;
    return chart;
  };


  return chart;
}

function d3LineWithLegend() {
  var margin = {top: 30, right: 40, bottom: 40, left: 60},
      width = 960,
      height = 500,
      dotRadius = function() { return 2.5 },
      xAxisLabelText = false,
      yAxisLabelText = false,
      color = d3.scale.category20().range(),
      dispatch = d3.dispatch('showTooltip', 'hideTooltip');

  var 
      x = d3.time.scale(),
  // x = d3.scale.linear(),
      y = d3.scale.linear(),
      xAxis = d3.svg.axis().scale(x).orient('bottom'),
      yAxis = d3.svg.axis().scale(y).orient('left'),
      legend = d3Legend().height(30).color(color),
      lines = d3Line();


  function chart(selection) {
    selection.each(function(data) {
      var series = data.filter(function(d) { return !d.disabled })
            .map(function(d) { return d.data });

      x   .domain(d3.extent(d3.merge(series), function(d) { return d.date } ))
          .range([0, width - margin.left - margin.right]);

      y   .domain(d3.extent(d3.merge(series), function(d) { return d.sales } ))
          .range([height - margin.top - margin.bottom, 0]);

      lines
        .width(width - margin.left - margin.right)
        .height(height - margin.top - margin.bottom)
        .color(data.map(function(d,i) {
          return d.color || color[i % 10];
        }).filter(function(d,i) { return !data[i].disabled }))

      xAxis
        .ticks( width / 100 )
        .tickSize(-(height - margin.top - margin.bottom), 0);
      yAxis
        .ticks( height / 36 )
        .tickSize(-(width - margin.right - margin.left), 0)
         .tickFormat(d3.format("s"))

      var wrap = d3.select(this).selectAll('g.wrap').data([data]);
      var gEnter = wrap.enter().append('g').attr('class', 'wrap d3lineWithLegend').append('g');

      gEnter.append('g').attr('class', 'legendWrap');
      gEnter.append('g').attr('class', 'x axis');
      gEnter.append('g').attr('class', 'y axis');
      gEnter.append('g').attr('class', 'linesWrap');


      legend.dispatch.on('legendClick', function(d, i) { 
        d.disabled = !d.disabled;

        if (!data.filter(function(d) { return !d.disabled }).length) {
          data.forEach(function(d) {
            d.disabled = false;
          });
        }
        // console.log(selection);
        // selection.transition().call(chart)
        // selection.transition()
      });


      legend.dispatch.on('legendMouseover', function(d, i) {
        d.hover = true;
        selection.transition().call(chart)
      });

      legend.dispatch.on('legendMouseout', function(d, i) {
        d.hover = false;
        selection.transition().call(chart)
        // selection.transition().duration(2000).call(chart)
      });


      lines.dispatch.on('pointMouseover.tooltip', function(e) {
        dispatch.showTooltip({
          point: e.point,
          series: e.series,
          pos: [e.pos[0] + margin.left, e.pos[1] + margin.top],
          seriesIndex: e.seriesIndex,
          pointIndex: e.pointIndex
        });
      });

      lines.dispatch.on('pointMouseout.tooltip', function(e) {
        dispatch.hideTooltip(e);
      });




      legend
          .color(color)
          .width(width / 2 - margin.right);

      wrap.select('.legendWrap')
          .datum(data)
          .attr('transform', 'translate(' + (width/2 - margin.left) + ',' + (-legend.height()) +')')
          .call(legend);


      //TODO: maybe margins should be adjusted based on what components are used: axes, axis labels, legend
      // margin.top = legend.height();  //need to re-render to see update
      margin.top = legend.height();  //need to re-render to see update

      var g = wrap.select('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');



      var linesWrap = wrap.select('.linesWrap')
          .datum(data.filter(function(d) { return !d.disabled }));

      d3.transition(linesWrap).call(lines);



      var xAxisLabel = g.select('.x.axis').selectAll('text.axislabel')
          .data([xAxisLabelText || null]);
      xAxisLabel.enter().append('text').attr('class', 'axislabel')
          .attr('text-anchor', 'middle')
          .attr('x', x.range()[1] / 2)
          .attr('y', margin.bottom - 5);
      xAxisLabel.exit().remove();
      xAxisLabel.text(function(d) { return d });

      g.select('.x.axis')
          .attr('transform', 'translate(0,' + y.range()[0] + ')')
          .call(xAxis)
        .selectAll('line.tick')
        .filter(function(d) { return !d })
          .classed('zero', true);


      var yAxisLabel = g.select('.y.axis').selectAll('text.axislabel')
          .data([yAxisLabelText || null]);
      yAxisLabel.enter().append('text').attr('class', 'axislabel')
          .attr('transform', 'rotate(-90)')
          .attr('text-anchor', 'middle')
          .attr('y', 20 - margin.left);
      yAxisLabel.exit().remove();
      yAxisLabel
          .attr('x', -y.range()[0] / 2)
          .text(function(d) { return d });

      g.select('.y.axis')
          .call(yAxis)
        .selectAll('line.tick')
        .filter(function(d) { return !d })
          .classed('zero', true);
    });

    return chart;
  }

  chart.dispatch = dispatch;

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = _;
    return chart;
  };

  chart.dotRadius = function(_) {
    if (!arguments.length) return dotRadius;
    dotRadius = d3.functor(_);
    lines.dotRadius = d3.functor(_);
    return chart;
  };

  //TODO: consider directly exposing both axes
  //chart.xAxis = xAxis;

  //Expose the x-axis' tickFormat method.
  chart.xAxis = {};
  d3.rebind(chart.xAxis, xAxis, 'tickFormat');

  chart.xAxis.label = function(_) {
    if (!arguments.length) return xAxisLabelText;
    xAxisLabelText = _;
    return chart;
  }

  // Expose the y-axis' tickFormat method.
  //chart.yAxis = yAxis;

  chart.yAxis = {};
  d3.rebind(chart.yAxis, yAxis, 'tickFormat');

  chart.yAxis.label = function(_) {
    if (!arguments.length) return yAxisLabelText;
    yAxisLabelText = _;
    return chart;
  }

  return chart;
}
(function($) {

  var nvtooltip = window.nvtooltip = {};

  nvtooltip.show = function(pos, content, gravity, dist) {
    var container = $('<div class="nvtooltip">');

    gravity = gravity || 's';
    dist = dist || 20;

    container
      .html(content)
      .css({left: -1000, top: -1000, opacity: 0})
      .appendTo('body');

    var height = container.height() + parseInt(container.css('padding-top'))  + parseInt(container.css('padding-bottom')),
        width = container.width() + parseInt(container.css('padding-left'))  + parseInt(container.css('padding-right')),
        // windowWidth = $(".card-body").width(),
        // windowHeight = $(".card-body").height(),
         windowWidth = $(window).width(),
        windowHeight = $(window).height(),
        scrollTop = $('body').scrollTop(),  //TODO: also adjust horizontal scroll
        left, top;


    //TODO: implement other gravities
    switch (gravity) {
      case 'e':
      case 'w':
      case 'n':
        left = pos[0] - (width / 2);
        top = pos[1] + dist;
        if (left < 0) left = 5;
        if (left + width > windowWidth) left = windowWidth - width - 5;
        if (scrollTop + windowHeight < top + height) top = pos[1] - height - dist;
        break;
      case 's':
        left = pos[0] - (width / 2);
        top = pos[1] - height - dist;
        if (left < 0) left = 5;
        if (left + width > windowWidth) left = windowWidth - width - 5;
        if (scrollTop > top) top = pos[1] + dist;
        break;
    }

    container
        .css({
          left: left,
          top: top,
          opacity: 1
        });
  };

  nvtooltip.cleanup = function() {
    var tooltips = $('.nvtooltip');

    // remove right away, but delay the show with css
    tooltips.css({
        'transition-delay': '0 !important',
        '-moz-transition-delay': '0 !important',
        '-webkit-transition-delay': '0 !important'
    });

    tooltips.css('opacity',0);

    setTimeout(function() {
      tooltips.remove()
    }, 500);
  };

})(jQuery);

  }
};
</script>

<style>

/********************
 * TOOLTIP CSS
 */

.nvtooltip {
  position: absolute;
  background-color: rgba(255,255,255,1);
  padding: 10px;
  border: 1px solid #ddd;

  font-family: Arial;
  font-size: 13px;

  transition: opacity 500ms linear;
  -moz-transition: opacity 500ms linear;
  -webkit-transition: opacity 500ms linear;

  transition-delay: 500ms;
  -moz-transition-delay: 500ms;
  -webkit-transition-delay: 500ms;

  -moz-box-shadow: 4px 4px 12px rgba(0,0,0,.5);
  -webkit-box-shadow: 4px 4px 12px rgba(0,0,0,.5);
  box-shadow: 4px 4px 12px rgba(0,0,0,.5);

  -moz-border-radius: 15px;
  border-radius : 15px;
  z-index: 1000;
}

.nvtooltip h3 {
  margin: 0;
  padding: 0;
  text-align: center;
}

.nvtooltip p {
  margin: 0;
  padding: 0;
  text-align: center;
}

.nvtooltip span {
  display: inline-block;
  margin: 2px 0;
}





/**********
*  General SVG CSS
*/


/* text {
  font: 12px sans-serif;
} */



/**********
*  Legend
*/

.legend .series {
  cursor: pointer;
}

.legend circle {
  stroke-width: 2px;
}

.legend .disabled circle {
  fill-opacity: 0;
}



/**********
*  Axes
*/

.axis path {
  fill: none;
  stroke: #000;
  stroke-opacity: .75;
  shape-rendering: crispEdges;
}

.axis path.domain {
  stroke-opacity: .75;
}

.axis line {
  fill: none;
  stroke: #000;
  stroke-opacity: .25;
  shape-rendering: crispEdges;
}

.axis line.zero {
  stroke-opacity: .75;
}



/**********
*  Line chart
*/

.point-paths path {
  /*
  fill: #eee;
  stroke: #aaa;
  */
  stroke-opacity: 0;
  fill-opacity: 0;
}


.lines path {
  fill: none;
  stroke-width: 1.5px;
  stroke-linecap: round;

  transition: stroke-width 250ms linear;
  -moz-transition: stroke-width 250ms linear;
  -webkit-transition: stroke-width 250ms linear;

  transition-delay: 250ms;
  -moz-transition-delay: 250ms;
  -webkit-transition-delay: 250ms;
}

.line.hover path {
  stroke-width: 6px;
}

.lines .point {
  transition: stroke-width 250ms linear;
  -moz-transition: stroke-width 250ms linear;
  -webkit-transition: stroke-width 250ms linear;
}

.lines .point.hover {
  stroke-width: 20px;
  stroke-opacity: .5;
}

</style>