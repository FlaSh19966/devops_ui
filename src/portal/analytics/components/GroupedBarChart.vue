<template>
<div style="display:flex">
  <div id="grouped_bar_chart" >
  </div>
 <div id="legend_div"></div>

  <!-- <svg width="700" height="3000" id="svg" /> -->

<!-- <svg id="newpie">
    <g id="canvas">
    <g id="art" />
    <g id="labels" /></g>
</svg> -->
</div>
</template>

<script>
const d3 = require("d3-3");
export default {
    name: "GroupedBar",
    props: {
    data: Array,
    xKey: String,
    yKey: String,
    primary_col: String,  
    secondary_col: String,
    currency_key: String

  },
  mounted () {
      var vm = this;
      var margin = {top: 20, right: 150, bottom: 200, left: 40},
            width = 960 - margin.left - margin.right,
            height = 710 - margin.top - margin.bottom;

        var x0 = d3.scale.ordinal()
            .rangeRoundBands([0, width], 0.1);

        var x1 = d3.scale.ordinal();

        var y = d3.scale.linear()
            .range([height-80, 0]);

        var xAxis = d3.svg.axis()
            .scale(x0)
            .tickSize(0)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .tickFormat(d3.format("s"))

        // var color = d3.scale.ordinal()
        //     .range(["#ca0020","#f4a582","#d5d5d5","#92c5de","#0571b0","#0519b0"]);

        // var color = d3.scale.ordinal()
        //     .range(["#5d62b5", "#29c3be", "#f1726e", "#fbc53f", "#62b58f", "#d0743c", "#ff8c00","#ca0020","#f4a582","#d5d5d5","#92c5de","#0571b0","#0519b0"]);

        // var color = d3.scale.ordinal()
        //     .range(["#3FBC11","#FF9750", "#5d62b5", "#29c3be", "#f1726e", "#fbc53f", "#62b58f", "#d0743c","#ca0020","#f4a582","#92c5de","#0571b0", "#d3fe14", "#fec7f8", "#0b7b3e", "#0bf0e9",'#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
        //     '#FF9AA2', '#FFB7B2', '#FFDAC1', '#B5EAD7', '#63d2a8', "#225a4b", "#e5df73", '#6666FF','#ff0000	','#a2798f','#d7c6cf','#e88758','#b13a15','#6d3656','#fffa90','#a4ffaa','#a6cbff','#8500f9','#b077ba','	#765284','#984b67','#9c624e','#feb8ff','#9be3bd','#775934','#008385','#6a2ca1','#e60e68','#ff6d01','#fee9d3'
        // ]);

        var color = d3.scale.ordinal()
            .range(["#FBB317","#FF9750","#3FBC11","#00C7E6","#EA3379","#0165fc","#41fdfe","#24a0ed","#1ac1dd","#7df9ff","#3f00ff","#08ff08","#aeff6e","#56fca2","#45cea2","#06c2ac","#fe6700","#ff3503","#d90166","#be03fd","#ad0afd","#6600ff","#d01c1f","#f1172f","#fff600","#fcd116","#cfff04","#ffc324","#f4c430","#FE7D68","#710193",
            "#0492C2","#9897A9","#632A0D","#9A794E","#151E3D","#59788D","#1E456E","#016064","#48AAAD","#7E7D9C","#303150","#609D9E","#287E9E","#E4A834","#028910",
            "#373737","#6C626D","#584D5B","#4D4C5C"]);
        // var color = d3.scale.category10();

        var svg = d3.select('#grouped_bar_chart').append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
              .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // d3.json("data.json", function(error, data) {

        var data = [
            {
                "categorie": "Student", 
                "values": [
                    {
                        "value": 0, 
                        "rate": "Not at all"
                    }, 
                    {
                        "value": 4, 
                        "rate": "Not very much"
                    }, 
                    {
                        "value": 12, 
                        "rate": "Medium"
                    }, 
                    {
                        "value": 6, 
                        "rate": "Very much"
                    }, 
                    {
                        "value": 0, 
                        "rate": "Tremendously"
                    },
                    {
                        "value": 10, 
                        "rate": "Not so much"
                    }
                ]
            }, 
             {
                "categorie": "Student12345", 
                "values": [
                    {
                        "value": 0, 
                        "rate": "Not at all"
                    }, 
                    {
                        "value": 4, 
                        "rate": "Not very much"
                    }, 
                    {
                        "value": 12, 
                        "rate": "Medium"
                    }, 
                    {
                        "value": 6, 
                        "rate": "Very much"
                    }, 
                    {
                        "value": 0, 
                        "rate": "Tremendously"
                    },
                    {
                        "value": 10, 
                        "rate": "Not so much"
                    }
                ]
            }, 
            {
                "categorie": "Liberal Profession", 
                "values": [
                    {
                        "value": 1, 
                        "rate": "Not at all"
                    }, 
                    {
                        "value": 21, 
                        "rate": "Not very much"
                    }, 
                    {
                        "value": 13, 
                        "rate": "Medium"
                    }, 
                    {
                        "value": 18, 
                        "rate": "Very much"
                    }, 
                    {
                        "value": 6, 
                        "rate": "Tremendously"
                    },
                    {
                        "value": 20, 
                        "rate": "Not so much"
                    }
                ]
            }, 
            {
                "categorie": "Salaried Staff", 
                "values": [
                    {
                        "value": 3, 
                        "rate": "Not at all"
                    }, 
                    {
                        "value": 22, 
                        "rate": "Not very much"
                    }, 
                    {
                        "value": 6, 
                        "rate": "Medium"
                    }, 
                    {
                        "value": 15, 
                        "rate": "Very much"
                    }, 
                    {
                        "value": 3, 
                        "rate": "Tremendously"
                    }
                ]
            }, 
            {
                "categorie": "Employee", 
                "values": [
                    {
                        "value": 12, 
                        "rate": "Not at all"
                    }, 
                    {
                        "value": 7, 
                        "rate": "Not very much"
                    }, 
                    {
                        "value": 18, 
                        "rate": "Medium"
                    }, 
                    {
                        "value": 13, 
                        "rate": "Very much"
                    }, 
                    {
                        "value": 6, 
                        "rate": "Tremendously"
                    }
                ]
            }, 
            {
                "categorie": "Craftsman", 
                "values": [
                    {
                        "value": 6, 
                        "rate": "Not at all"
                    }, 
                    {
                        "value": 15, 
                        "rate": "Not very much"
                    }, 
                    {
                        "value": 9, 
                        "rate": "Medium"
                    }, 
                    {
                        "value": 12, 
                        "rate": "Very much"
                    }, 
                    {
                        "value": 3, 
                        "rate": "Tremendously"
                    }
                ]
            }, 
            {
                "categorie": "Inactive", 
                "values": [
                    {
                        "value": 6, 
                        "rate": "Not at all"
                    }, 
                    {
                        "value": 6, 
                        "rate": "Not very much"
                    }, 
                    {
                        "value": 6, 
                        "rate": "Medium"
                    }, 
                    {
                        "value": 2, 
                        "rate": "Very much"
                    }, 
                    {
                        "value": 3, 
                        "rate": "Tremendously"
                    }
                ]
            }
        ]

        // var sampledata = [{"Drug Name":"HUMIRA","Unique Patient Count":4333,"Outcome":"Impairment/Damage"},{"Drug Name":"HUMIRA","Unique Patient Count":2502,"Outcome":"Hospitalization - Initial or Prolonged"},{"Drug Name":"HUMIRA","Unique Patient Count":369,"Outcome":"Death"},{"Drug Name":"HUMIRA","Unique Patient Count":122,"Outcome":"Disability"},{"Drug Name":"HUMIRA","Unique Patient Count":38,"Outcome":"Life-Threatening"},{"Drug Name":"HUMIRA","Unique Patient Count":4,"Outcome":"Congenital Anomaly"},{"Drug Name":"HUMIRA","Unique Patient Count":2,"Outcome":"Required Intervention to Prevent Permanent"},{"Drug Name":"XARELTO","Unique Patient Count":2580,"Outcome":"Impairment/Damage"},{"Drug Name":"XARELTO","Unique Patient Count":1619,"Outcome":"Hospitalization - Initial or Prolonged"},{"Drug Name":"XARELTO","Unique Patient Count":489,"Outcome":"Death"},{"Drug Name":"XARELTO","Unique Patient Count":43,"Outcome":"Life-Threatening"},{"Drug Name":"XARELTO","Unique Patient Count":27,"Outcome":"Disability"},{"Drug Name":"XARELTO","Unique Patient Count":1,"Outcome":"Congenital Anomaly"},{"Drug Name":"REVLIMID","Unique Patient Count":2165,"Outcome":"Hospitalization - Initial or Prolonged"},{"Drug Name":"REVLIMID","Unique Patient Count":1604,"Outcome":"Impairment/Damage"},{"Drug Name":"REVLIMID","Unique Patient Count":658,"Outcome":"Death"},{"Drug Name":"REVLIMID","Unique Patient Count":25,"Outcome":"Life-Threatening"},{"Drug Name":"REVLIMID","Unique Patient Count":20,"Outcome":"Disability"},{"Drug Name":"REVLIMID","Unique Patient Count":5,"Outcome":"Congenital Anomaly"},{"Drug Name":"ENBREL","Unique Patient Count":2090,"Outcome":"Impairment/Damage"},{"Drug Name":"ENBREL","Unique Patient Count":443,"Outcome":"Hospitalization - Initial or Prolonged"},{"Drug Name":"ENBREL","Unique Patient Count":58,"Outcome":"Disability"},{"Drug Name":"ENBREL","Unique Patient Count":51,"Outcome":"Death"},{"Drug Name":"ENBREL","Unique Patient Count":21,"Outcome":"Life-Threatening"},{"Drug Name":"ENBREL","Unique Patient Count":1,"Outcome":"Required Intervention to Prevent Permanent"}]
        // console.log(this.data);
        var map = this.data.reduce((r, i) => ((r[i[vm.primary_col]] = r[i[vm.primary_col]] || []).push({
            date : i[vm.secondary_col],
            sales: i[vm.yKey]
             // i
        }), r), {});
        var entries = Object.entries(map);
        const second_data = [];
        for(let i =0; i < entries.length; i++) {
            second_data.push({
            categorie : entries[i][0],
            values: [],
            })
            for(let j =0 ; j < entries[i][1].length; j++) {
            second_data[i].values.push({
                rate: entries[i][1][j].date,
                value: entries[i][1][j].sales,
                category: entries[i][0]
            })
            }
        }
        data = [];
        data = second_data;
        // console.log(data);
        var categoriesNames,rateNames       
        var categoriesNamesFull = data.map(function(d) { return d.categorie; });
        // var categoriesNames = data.map(function(d) { return d.categorie; });
        // var rateNames = data[0].values.map(function(d) { return d.rate; });
        // console.log(rateNames,categoriesNames);
        var isScrollDisplayed =  false,
        numBars = 4;
        var marginOverview = {top: 30, right: 10, bottom: 20, left: 70};
        var heightOverview = 80 - marginOverview.top - marginOverview.bottom;
        if(categoriesNamesFull.length > 5 ) { isScrollDisplayed = true; }
        categoriesNames = data.map(function(d) { return d.categorie; });
        rateNames       = data[2].values.map(function(d) { return d.rate; });

        // console.log(rateNames);
        // for(let i = 0; i < data.length; i++){
            
        // }
        let key_data_temp = [],
        key_data_temp_length = [];
        for(let i = 0; i < data.length; i++){
            // console.log(data[i].values.map(function(d) { return d.rate; }))
            // console.log(d3.keys(data[i].values))
            key_data_temp.push(data[i].values.map(function(d) { return d.rate; }))
            key_data_temp_length.push(d3.keys(data[i]).slice(1).length)
        }
        // console.log(key_data_temp);
        let key_data_temp_2 = [];
        for(let i =0; i < key_data_temp.length; i++){
            for(let j = 0; j < key_data_temp[i].length; j++){
                key_data_temp_2.push(key_data_temp[i][j])
            }
        }
        var xyz = key_data_temp_2.reduce(function(a,b){
        if(a.indexOf(b) < 0 ) a.push(b);
        return a;
        }, [])
        // console.log(xyz, 'HERE FOR DISTINCT')
        rateNames = xyz;
        // console.log(isScrollDisplayed);
        if(isScrollDisplayed) {
            // categoriesNames = data.slice(0,numBars).map(function(d) { return d.categorie; });
            // rateNames       = data[0].values.map(function(d) { return d.rate; });
            x0.domain(categoriesNames.slice(0,numBars));
            x1.domain(rateNames).rangeRoundBands([0, x0.rangeBand()]); 
        } else {
            // categoriesNames = data.map(function(d) { return d.categorie; });
            // rateNames = data[0].values.map(function(d) { return d.rate; });
            x0.domain(categoriesNames);
            x1.domain(rateNames).rangeRoundBands([0, x0.rangeBand()]); 
        }
        y.domain([0, d3.max(data, function(categorie) { return d3.max(categorie.values, function(d) { return d.value; }); })]);

        // if(data.length > 2) {
        //     svg.append("g")
        //     .style("font-size", "12px")
        //     .attr("class", "xgrouped")
        //     .style('opacity','0')
        //     .attr("transform", "translate(0," + height + ")")
        //     .call(xAxis)
        //     d3.selectAll("text")
        //     .attr("y", 0)
        //     .attr("x", -10)
        //     .attr("dy", ".35em")
        //     .attr("transform", "rotate(-70)")
        //     .style("text-anchor", "end");  
        // } else {
            svg.append("g")
            .attr("class", "xgrouped")
            .style('opacity','0')
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            d3.selectAll(".tick text")
            .call(wrap, 10)
            function wrap(text, width) {
            text.each(function() {
              var text = d3.select(this),
                  words = text.text().split(/\s+/).reverse(),
                  word,
                  line = [],
                  lineNumber = 0,
                //   lineHeight = 0.6, // ems
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
        // }

        svg.append("g")
        // .attr("transform", "translate(0,30)")
            .attr("class", "y axis")
            .style('opacity','0')
            .call(yAxis)
        // .append("text")
        //     .attr("transform", "rotate(-90)")
        //     .attr("y", 6)
        //     .attr("dy", ".71em")
        //     .style("text-anchor", "end")
        //     .style('font-weight','bold')
        //     .text("Value");

        svg.select('.y').transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style('opacity','1');
        svg.select('.xgrouped').transition().duration(100).delay(function(d,i){ return 1300 + 100 * i; }).style('opacity','1');
        var tooltip = d3.select(".card-body").append("div").attr("class", "toolTip");

        if(isScrollDisplayed) {

            var slice = svg.selectAll(".slice")
                .data(data.slice(0,numBars))
                .enter()
                .append("svg")
                .attr("class","group")
                .append("g")
                .attr("class", "g")
                .attr("id", function(d) { return d.categorie })
                .attr("transform",function(d) { return "translate(" + x0(d.categorie) + ",0)"; })

            slice.selectAll("rect")
                .data(function(d) { return d.values; })
                .enter().append("rect")
                .attr("width", x1.rangeBand())
                .attr("class", ".bar-positive-stack")
                // .attr("id", guidGenerator())
                .attr("x", function(d) {  return x1(d.rate); })
                .style("fill", function(d) { return color(d.rate) })
                .attr("y", function(d) { return y(0); })
                .attr("height", function(d) { return  y(0); })
                // .attr("y", function(d) { return y(d.value); })
                // .attr("height", function(d) { return height - y(d.value); })
                .on("mouseover", function(d) {
                    d3.select(this).style("fill", d3.rgb(color(d.rate)).brighter(1));
                    var x = d3.select(this).attr('id');
                    tooltip
                    .style("left", event.pageX - 315 + "px")
                    .style("top", event.pageY - 170 + "px")
                    .style("display", "inline-block")
                    .html( "<em> <b>" + d.category + " </b> </em> <br>" + d.rate + "<br>" + vm.currency_key + ' ' + ((Number.isInteger(d.value)) ? d.value :  d.value.toFixed(2)));
                })
                .on("mouseout", function(d) {
                    tooltip.style("display", "none");
                    d3.select(this).style("fill", color(d.rate));
                });

            slice.selectAll("rect")
            .transition()
            .delay(function (d) {return Math.random()*1000;})
            .duration(1000)
            .attr("y", function(d) { if(d.value === 0){return 0;} else { return y(d.value);} })
            .attr("height", function(d) {  if(d.value === 0){return 0;} else {return height - y(d.value); }});

            var xOverview = d3.scale.ordinal()
                .domain(data.map(function (d) { return d.label; }))
                .range([0, width], .2);
            var yOverview = d3.scale.linear().range([heightOverview, 0]);
            yOverview.domain(y.domain());

            var displayed = d3.scale.quantize()
                    .domain([0, width])
                    .range(d3.range(data.length));
                    svg.append("g").append("rect")
                    .attr("transform", "translate(5, " + (height+5) + ")")
                    .attr("class", "mover")
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("rx",5)
                    .attr("ry",10)
                    .attr("height", 10)
                    .attr("width",Math.round(parseFloat(numBars * width)/data.length))
                    .attr("pointer-events", "all")
                    .attr("cursor", "ew-resize")
                    .call(d3.behavior.drag().on("drag", display));
        }  else {
                var slice = svg.selectAll(".slice")
                .data(data)
                .enter()
                .append("svg")
                // .attr("")
                .append("g")
                .attr("class", "g")
                .attr("id", function(d) { return d.categorie })
                .attr("transform",function(d) { return "translate(" + x0(d.categorie) + ",0)"; })

            slice.selectAll("rect")
                .data(function(d) { return d.values; })
                .enter().append("rect")
                .attr("width", x1.rangeBand())
                // .attr("id", guidGenerator())
                .attr("x", function(d) { return x1(d.rate); })
                .style("fill", function(d) { return color(d.rate) })
                .attr("y", function(d) { return y(0); })
                .attr("height", function(d) { return y(0); })
                // .attr("y", function(d) { return y(d.value); })
                // .attr("height", function(d) { return height - y(d.value); })
                .on("mouseover", function(d) {
                    d3.select(this).style("fill", d3.rgb(color(d.rate)).brighter(1));
                    var x = d3.select(this).attr('id');
                    // console.log(d)
                    tooltip
                    .style("left", event.pageX - 315 + "px")
                    .style("top", event.pageY - 170 + "px")
                    .style("display", "inline-block")
                    .html( "<em> <b>" + d.category + " </b> </em> <br>" + d.rate + "<br>"+ vm.currency_key + ' '  + ((Number.isInteger(d.value)) ? d.value :  d.value.toFixed(2)));
                    // .html( d.rate + "<br>"  + d.value);
                })
                .on("mouseout", function(d) {
                    tooltip.style("display", "none");
                    d3.select(this).style("fill", color(d.rate));
                });
        }
        slice.selectAll("rect")
            .transition()
            .delay(function (d) {return Math.random()*1000;})
            .duration(1000)
            .attr("y", function(d) { return y(d.value); })
            .attr("height", function(d) { return height - y(d.value); });

        // slice.selectAll("rect")
        // .transition()
        // .delay((d,i)=> i * 150)
        // .duration(800)
        // .attr("y", function(d) {return y(d.value); })
        
        //Legend
        var legend_div = d3.select("#legend_div").append("svg").style("width","200%").style("height","250%");
        var legend_g =  legend_div.append("g").attr("transform", "translate(0,0)");
        // var legend = svg.selectAll(".legend")
        var legend =  legend_g.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            // .data(data[1].values.map(function(d) { return d.rate; }))
            .data(rateNames)
            .enter().append("g")
            // .attr("class", "legend")
            .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
            .style("opacity","1");

        legend.append("rect")
            .attr("x", 0)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", function(d) { return color(d); });

        legend.append("text")
            .attr("x", 25)
            .attr("y", 9)
            .attr("dy", ".35em")
            .attr("class", "legend_text")
            .style("text-anchor", "start")
            .text(function(d) {
                // return d.toUpperCase();
                if(d.length > 25){
                 return d.substring(0,25).toUpperCase()+'...';
                } else {
                 return d.toUpperCase()
                }
            })
        d3.selectAll('.legend_text').call(show_long_labels);
        function show_long_labels(selection) {
            selection.on('mouseenter', function (d,i) { 
            // var tooltip = 
            // d3.select("#stackedbarnontime").append("div").attr("class", "toolTip")
                if(d.length > 25){
                  tooltip
                    .style("left", d3.event.pageX - 400 + "px")
                    .style("top", d3.event.pageY - 290 + "px")
                    .style("display", "inline-block")
                    .html(d.toUpperCase());
            }
            });

            selection.on("mouseout", function(d,i) {
                // d3.selectAll(".toolTip").remove();
                tooltip.style("display", "none"); // hide tooltip for that element
            });

            selection.on("mousemove", function(d) {
                tooltip
                .style("top", d3.event.layerY + 100 + "px") 
                .style("left", d3.event.layerX - 210 + "px"); 
            });
        }

        
        legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");

        // var hoverdata = $("#Student");
        // hoverdata.mouseover (function() {
        //     console.log("Hello")
        //     hoverdata.addClass("background-color")
        // });

    function display () {
     // debugger;
        var xy = parseInt(d3.select(this).attr("x")),
            nx = xy + d3.event.dx,
            w = parseInt(d3.select(this).attr("width")),
            f, nf, new_data, rects;

        if ( nx < 0 || nx + w > width ) return;

        d3.select(this).attr("x", nx);

        f = displayed(xy);
        nf = displayed(nx);

        if ( f === nf ) return;

        new_data = data.slice(nf, nf + numBars);

        x0.domain(new_data.map(function (d) { return d.categorie; }));

        // x0.domain(categoriesNames);
        // x1.domain(rateNames).rangeRoundBands([0, x0.rangeBand()]); 
        // d3.selectAll(".x axis").remove();

        if(numBars > 4 ){
            // svg.append("g")
            //     .style("font", "10px times")
            //     .attr("class", "xgrouped")
            //     .attr("transform", "translate(0," + height + ")")
            svg.selectAll(".xgrouped")
            //  .style("font", "10px times")
            // svg.append("g")
                // .attr("class", "xgrouped")
                // .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .attr("y", 0)
            .attr("x", -10)
            .attr("dy", ".35em")
            .attr("transform", "rotate(-70)")
            .style("text-anchor", "end")         
            } else {
            // svg.append("g")
            // .attr("class", "xgrouped")
            // .attr("transform", "translate(0," + height + ")")
             svg.selectAll(".xgrouped")
            //    svg.append("g")
            // .attr("class", "xgrouped")
            // .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll(".tick text")
            .call(wrap, 10)
            function wrap(text, width) {
            text.each(function() {
              var text = d3.select(this),
                  words = text.text().split(/\s+/).reverse(),
                  word,
                  line = [],
                  lineNumber = 0,
                //   lineHeight = 0.6, // ems
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
        // d3.selectAll(".xgrouped").remove();
        d3.selectAll(".group").remove();
        d3.selectAll(".bar-positive-stack").remove();
        d3.selectAll(".g").remove();
        // rects = svg.selectAll(".bar-positive-stack")
        // .data(new_data, function (d) {return d.label; });
        //   rects.attr("x", function (d) { return x(d.data.State); });

            // rects
            var slice = svg.selectAll(".slice")
                .data(new_data)
                .enter()
                .append("svg")
                .attr("class","group")
                .append("g")
                .attr("class", "g")
                .attr("id", function(d) { return d.categorie })
                .attr("transform",function(d) { return "translate(" + x0(d.categorie) + ",0)"; })

            
            slice.selectAll("rect")
                .data(function(d) { return d.values; })
                .enter().append("rect")
                .attr("width", x1.rangeBand())
                .attr("class", ".bar-positive-stack")
                // .attr("id", guidGenerator())
                .attr("x", function(d) { return x1(d.rate); })
                .style("fill", function(d) { return color(d.rate) })
                // .attr("y", function(d) { return y(0); })
                // .attr("height", function(d) { return height - y(0); })
                .attr("y", function(d) { return y(d.value); })
                .attr("height", function(d) { return height - y(d.value); })
                .on("mouseover", function(d) {
                    // console.log(d);
                    d3.select(this).style("fill", d3.rgb(color(d.rate)).brighter(1));
                    var x = d3.select(this).attr('id');
                    tooltip
                    .style("left", event.pageX - 315 + "px")
                    .style("top", event.pageY - 170 + "px")
                    .style("display", "inline-block")
                    .html( "<em> <b>" + d.category + " </b> </em> <br>" + d.rate + "<br>"+ vm.currency_key + ' '  + ((Number.isInteger(d.value)) ? d.value :  d.value.toFixed(2)));
                    // .html( d.rate + "<br>"  + d.value);
                })
                .on("mouseout", function(d) {
                    tooltip.style("display", "none");
                    d3.select(this).style("fill", color(d.rate));
                });
        // rects.exit   ().remove();
    };

  }
}
</script>
<style>
/* .xgrouped path{
    display: none;
}
.background-color {
    background-color: blue;
} */
</style>