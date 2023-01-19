<template>
<div>
  <div id="stackedbarnontime" style="display:flex">
      <svg id="StackedBarChartNonTime" width="800" height="650"></svg>
    <div id="legend_div"></div>
  </div>
</div>
</template>

<script>
const d3 = require("d3");
export default {
    name: "StackedBarChartNonTime",
    props: {
        data: Array,
        xKey: String,
        yKey: String,
        primary_col: String,  
        secondary_col: String,
        currency_key: String
    },
  mounted () {
    // console.log(this.currency_key)
    var vm = this;
    var map = this.data.reduce((r, i) => ((r[i[vm.primary_col]] = r[i[vm.primary_col]] || []).push({
        date : i[vm.secondary_col],
        sales: i[vm.yKey]
             // i
    }), r), {});
    var entries = Object.entries(map);
    const second_data = [];
    for(let i =0; i < entries.length; i++) {
            second_data.push({
            State : entries[i][0],
        })
        for(let j =0 ; j < entries[i][1].length; j++) {
            var temp = Object.values(entries[i][1][j]);
            var a = temp[0],
                b = temp[1];
            second_data[i][a] = b;
        }
    }

    var  data = [];
    data = second_data;
    let key_data_temp = [],
    key_data_temp_length = [];
    for(let i = 0; i < data.length; i++){
        key_data_temp.push(d3.keys(data[i]).slice(1))
        key_data_temp_length.push(d3.keys(data[i]).slice(1).length)
    }

    // console.log(key_data_temp);
    // console.log(key_data_temp_length);
    // console.log(Math.max(...key_data_temp_length))
    // console.log(indexOfMax(key_data_temp_length))
    var keys = key_data_temp[indexOfMax(key_data_temp_length)]
    function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
    }
    let key_data_temp_2 = [];
    for(let i =0; i < key_data_temp.length; i++){
        for(let j = 0; j < key_data_temp[i].length; j++){
            key_data_temp_2.push(key_data_temp[i][j])
        }
    }
    // var keys = d3.keys(data[0]).slice(1);
    // console.log(key_data_temp);
    // console.log(key_data_temp_2, "HERRREEE");
    // var xyz = key_data_temp_2.filter((value,index) => key_data_temp_2.indexOf(value) === index);
    var xyz = key_data_temp_2.reduce(function(a,b){
        if(a.indexOf(b) < 0 ) a.push(b);
        return a;
    }, [])
    // console.log(xyz, 'HERE FOR DISTINCT')
    // console.log(data);
    // console.log(keys);
    // var keys = xyz;
    // var keys = ["OPEN", "ARBITRATION", "DENIED", "Dropped"
    // , "PAID", "Paid In Full"]
    //  "Stopped", "To Litigate", "Transfered KH", "DISCHARGED", "STOPPED", "Lien", "SENT TO LITIGATION", "Transferred to KH ", "Paid In Full", 
    // "Do Not Bill", "Transfered", "COLLECT", "DATA ENTRY", "Collect", "Write off"];
    // console.log(keys);
    for(let i= 0; i< data.length; i++){
        for (var j = 0, t = 0; j < keys.length; ++j) {
            t += data[i][keys[j]] = +data[i][keys[j]];
        }
    data[i].total = t;
    }
    var isScrollDisplayed =  false,
    numBars = 25;
    var marginOverview = {top: 30, right: 10, bottom: 20, left: 70};
    var heightOverview = 80 - marginOverview.top - marginOverview.bottom;
    if(entries.length > 25 ) { isScrollDisplayed = true; }
    // console.log(data)


    var svg = d3.select("#StackedBarChartNonTime"),
        margin = {top: 10, right: 0, bottom: 10, left: 30},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // set x scale
    var x = d3.scaleBand()
        .rangeRound([50, (width- (.15 * width ))])
        .paddingInner(0.05)
        .align(0.1);

    // set y scale
    var y = d3.scaleLinear()
        .rangeRound([height-150, 0]);

    // set the colors
    // var z = d3.scaleOrdinal()
    //         .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    
    // var z = d3.scaleOrdinal()
    //         .range(["#5d62b5", "#29c3be", "#f1726e", "#fbc53f", "#62b58f", "#d0743c", "#ff8c00","#ca0020","#f4a582","#d5d5d5","#92c5de","#0571b0","#0519b0"]);

    // var z = d3.scaleOrdinal()
    //         .range(["#FF9750","#3FBC11", "#5d62b5", "#29c3be", "#f1726e", "#fbc53f", "#62b58f", "#d0743c","#ca0020","#f4a582","#92c5de","#0571b0", "#d3fe14", "#fec7f8", "#0b7b3e", "#0bf0e9",'#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    //         '#FF9AA2', '#FFB7B2', '#FFDAC1', '#B5EAD7', '#63d2a8', "#225a4b", "#e5df73", '#6666FF','#ff0000	','#a2798f','#d7c6cf','#e88758','#b13a15','#6d3656','#fffa90','#a4ffaa','#a6cbff','#8500f9','#b077ba','	#765284','#984b67','#9c624e','#feb8ff','#9be3bd','#775934','#008385','#6a2ca1','#e60e68','#ff6d01','#fee9d3'
    //         ]);
    var z = d3.scaleOrdinal()
            .range(["#FBB317","#FF9750","#3FBC11","#00C7E6","#EA3379","#0165fc","#41fdfe","#24a0ed","#1ac1dd","#7df9ff","#3f00ff","#08ff08","#aeff6e","#56fca2","#45cea2","#06c2ac","#fe6700","#ff3503","#d90166","#be03fd","#ad0afd","#6600ff","#d01c1f","#f1172f","#fff600","#fcd116","#cfff04","#ffc324","#f4c430","#FE7D68","#710193",
            "#0492C2","#9897A9","#632A0D","#9A794E","#151E3D","#59788D","#1E456E","#016064","#48AAAD","#7E7D9C","#303150","#609D9E","#287E9E","#E4A834","#028910",
            "#373737","#6C626D","#584D5B","#4D4C5C"]);

    // var z = ["#5d62b5", "#29c3be", "#f1726e", "#fbc53f", "#62b58f", "#d0743c","#ca0020","#f4a582","#92c5de","#0571b0", "#d3fe14", "#fec7f8", "#0b7b3e", "#0bf0e9",'#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    // '#FF9AA2', '#FFB7B2', '#FFDAC1', '#B5EAD7', '#63d2a8', "#225a4b", "#e5df73", '#6666FF','	#ff0000	','#a2798f','#d7c6cf','#e88758','#b13a15','#6d3656','#fffa90','#a4ffaa','#a6cbff','#8500f9','#b077ba','	#765284','#984b67','#9c624e','#feb8ff','#9be3bd','#775934','#008385','#6a2ca1','#e60e68','#ff6d01','#fee9d3'
    // ];

    // var z =  d3.scaleOrdinal()
    //    .domain(data.map(d => d["Outcome"]))
    //    .range(d3.quantize(t => d3.interpolateSpectral  (t * 0.8 + 0.1), data.length).reverse());


    data.sort(function(a, b) { return b.total - a.total; });
    if(isScrollDisplayed) {
        x.domain(data.slice(0,numBars).map(function(d) { return d.State; }));
    } else {
        x.domain(data.map(function(d) { return d.State; }));
    }
    y.domain([0, d3.max(data, function(d) { return d.total; })]).nice();
    z.domain(keys);

    if(isScrollDisplayed) {
        
       var stacks = g.append("g")
        .attr("class", "stacks")
        .selectAll("g")
        .data(d3.stack().keys(keys)(data.slice(0,numBars)))
        .enter().append("g")
        .attr("class", ".bar-positive-stack")
        .attr("fill", function(d) { return z(d.key); })
        .selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("class", ".bar-positive-rect")
        .attr("x", function(d) { return x(d.data.State); })
        .attr("height", function(d) { return (isNaN(y(d[0]) - y(d[1])) ? 0 : (y(d[0]) - y(d[1])) ); })
        .attr("width", x.bandwidth())
        .attr("y", function(d,i) {return i * 100; })
        // .attr("y", function(d) {return y(d[1]); })


        .on("mouseover", function() { tooltip.style("display", null); })
        .on("mouseout", function() { tooltip.style("display", "none"); })
        .on("mousemove", function(d) {
        var xPosition = d3.mouse(this)[0] - 5;
        var yPosition = d3.mouse(this)[1] - 5;
       
        var current_val =  (d[1]-d[0]);
        var data_length = Object.values(d.data).length, groupname;
        for(let i = 0; i < data_length; i++) {
            if(Object.values(d.data)[i] === current_val) {
                  groupname = Object.keys(d.data)[i];
                //   break;
            }
        }
        tooltip
         .style("left", d3.event.pageX - 400 + "px")
              .style("top", d3.event.pageY - 270 + "px")
              .style("display", "inline-block")
              .html( (Number.isInteger((d[1]-d[0])) ? vm.currency_key+(d[1]-d[0]) : vm.currency_key+(d[1]-d[0]).toFixed(2)) + "<br>"  + d.data.State + "<br> <em> <b>" + groupname +"<b></em>" );

        });


        stacks
        .transition()
        .delay((d,i)=> i * 150)
        .duration(800)
        .attr("y", function(d) {return y(d[1]); })


        var xOverview = d3.scaleBand()
                        .domain(data.map(function (d) { return d.label; }))
                        .range([0, width], .2);
        var yOverview = d3.scaleLinear().range([heightOverview, 0]);
        yOverview.domain(y.domain());

        var displayed = d3.scaleQuantize()
                  .domain([0, width])
                  .range(d3.range(data.length));
                   svg.append("g").append("rect")
                  .attr("transform", "translate(55, " + (height - 134) + ")")
                  .attr("class", "mover")
                  .attr("x", 0)
                  .attr("y", 0)
                  .attr("rx",5)
                  .attr("ry",10)
                  .attr("height", 10)
                  .attr("width",Math.round(parseFloat(numBars * width)/data.length))
                  .attr("pointer-events", "all")
                  .attr("cursor", "ew-resize")
                  .call(d3.drag().on("drag", display));

    } else {
     var stacks =  g.append("g")
        .attr("class", "stacks")
        .selectAll("g")
        .data(d3.stack().keys(keys)(data))
        .enter().append("g")
        .attr("class", ".bar-positive-stack")
        .attr("fill", function(d) { return z(d.key); })
        .selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("x", function(d) { return x(d.data.State); })
        // .attr("y", function(d) {return y(d[1]); })
        .attr("y", function(d,i) { return i * 100; })
        .attr("height", function(d) { return (isNaN(y(d[0]) - y(d[1])) ? 0 : (y(d[0]) - y(d[1])) ); })
        .attr("width", x.bandwidth())
        .on("mouseover", function() { tooltip.style("display", null); })
        .on("mouseout", function() { tooltip.style("display", "none"); })
        .on("mousemove", function(d) {
        // console.log(d);
        var xPosition = d3.mouse(this)[0] - 5;
        var yPosition = d3.mouse(this)[1] - 5;
       
        var current_val =  (d[1]-d[0]);
        // console.log(current_val);
        var data_length = Object.values(d.data).length, groupname;
        for(let i = 0; i < data_length; i++) {
            if(Object.values(d.data)[i] === current_val) {
                groupname = Object.keys(d.data)[i];
                break;
            }
        }
        tooltip
         .style("left", d3.event.pageX - 400 + "px")
              .style("top", d3.event.pageY - 270 + "px")
              .style("display", "inline-block")
              .html(  (Number.isInteger((d[1]-d[0])) ? vm.currency_key+(d[1]-d[0]) : vm.currency_key+(d[1]-d[0]).toFixed(2)) + "<br>"  + d.data.State + "<br> <em> <b>" + groupname +"<b></em>" );

        });

        stacks
        .transition()
        .delay((d,i)=> i * 150)
        .duration(800)
        .attr("y", function(d) { 
            // console.log(d[1], y(d[1])); 
            if(isNaN(d[1])){
                return 0;
            } else if(isNaN(y(d[1]))){ 
                return 0;
            } else{
                return y(d[1]); 
            }
            })

    }
    if(this.data.length > 14){
        g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (height-140) + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("y", 0)
        .attr("x", -10)
        .attr("dy", ".35em")
        .attr("transform", "rotate(-70)")
        .style("text-anchor", "end");
          

    } else {
         g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (height-140) + ")")
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

    g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(30,0)")
        .call(d3.axisLeft(y).ticks(null, "s"))
        .append("text")
        .attr("x", 2)
        .attr("y", function(){ return y(y.ticks().pop()) + 0.5;})
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start");

    
    if(keys.length > 10 ){
        var legend_div = d3.select("#legend_div").append("svg").style("width","200%").style("height","250%");
    } else {
        var legend_div = d3.select("#legend_div").append("svg").style("width","200%").style("height","100%");
    }
    var legend_g =  legend_div.append("g").attr("transform", "translate(0,0)");
    var legend = legend_g.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        // .data(keys.slice().reverse())
        .data(keys.slice())
        .enter().append("g")
        // .attr("transform", function(d, i) { return "translate(0,0)"; });
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", 0)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z);

    legend.append("text")
        .attr("x", 25)
        .attr("y", 9.5)
        .attr("class", "legend_text")
        .attr("dy", "0.32em")
        .text(function(d) {
            // return d;
            if(d.length > 25){
                return d.substring(0,25).toUpperCase()+'...';
            } else {
            return d.toUpperCase()
            }
        })
        .style("text-anchor", "start")
    
     d3.selectAll('.legend_text').call(show_long_labels);
        function show_long_labels(selection) {
            selection.on('mouseenter', function (d,i) { 
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
                .style("top", d3.event.layerY + 10 + "px") 
                .style("left", d3.event.layerX + 410 + "px"); 
            });
        }
    // Prep the tooltip bits, initial display is hidden
    var tooltip = 
        d3.select("#stackedbarnontime").append("div").attr("class", "toolTip")

    // d3.selectAll(".tick text")
    //   .on("mouseover", function() {  })
    //     .on("mouseout", function() {  })
    //     .on("mousemove", function(d) { console.log(d); });

    var text_wrap = function() {
        var self = d3.select(this),
            textLength = self.node().getComputedTextLength(),
            text = self.text();
        while (textLength > (50) && text.length > 0) {
            text = text.slice(0, -1);
            self.text(text + '...');
            textLength = self.node().getComputedTextLength();
        }
    };
    
    function display () {
     // debugger;
        var xy = parseInt(d3.select(this).attr("x")),
            nx = xy + d3.event.dx,
            w = parseInt(d3.select(this).attr("width")),
            f, nf, new_data, rects;

        if ( nx < 0 || nx + w > (width*0.9) ) return;

        d3.select(this).attr("x", nx);

        f = displayed(xy);
        nf = displayed(nx);

        if ( f === nf ) return;

        new_data = data.slice(nf, nf + numBars);

        x.domain(new_data.map(function (d) { return d.State; }));

        if(numBars > 8 ){
            svg.select(".axis")
            .call(d3.axisBottom(x))
            .selectAll("text")
          .attr("y", 0)
          .attr("x", -10)
          .attr("dy", ".35em")
          .attr("transform", "rotate(-70)")
          .style("text-anchor", "end");
        } else {
            svg.select(".axis")
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
        
        d3.selectAll(".bar-positive-stack").remove();
        d3.selectAll(".stacks").remove();
        rects = svg.selectAll(".bar-positive-stack")
        .data(new_data, function (d) {return d.label; });
          rects.attr("x", function (d) { return x(d.data.State); });

        // rects
        g.append("g")
        .attr("class", "stacks")
        .selectAll("g")
        .data(d3.stack().keys(keys)(new_data))
        .enter().append("g")
        .attr("class", ".bar-positive-stack")
        .attr("fill", function(d) { return z(d.key); })
        .selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("x", function(d) { return x(d.data.State); })
        .attr("y", function(d) {return y(d[1]); })
        // .attr("height", function(d) { return y(d[0]) - y(d[1]); })
        .attr("height", function(d) { return (isNaN(y(d[0]) - y(d[1])) ? 0 : (y(d[0]) - y(d[1])) ); })
        .attr("width", x.bandwidth())
        .on("mouseover", function() { tooltip.style("display", null); })
        .on("mouseout", function() { tooltip.style("display", "none"); })
        .on("mousemove", function(d) {
        // console.log(d);
        var xPosition = d3.mouse(this)[0] - 5;
        var yPosition = d3.mouse(this)[1] - 5;
       
        var current_val =  (d[1]-d[0]);
        var data_length = Object.values(d.data).length, groupname;
        for(let i = 0; i < data_length; i++) {
            if(Object.values(d.data)[i] === current_val) {
                  groupname = Object.keys(d.data)[i]
                //   break;   
            }
        }
        tooltip
         .style("left", d3.event.pageX - 400 + "px")
              .style("top", d3.event.pageY - 270 + "px")
              .style("display", "inline-block")
              .html( (Number.isInteger((d[1]-d[0])) ? vm.currency_key+(d[1]-d[0]) : vm.currency_key+(d[1]-d[0]).toFixed(2)) +  "<br>"  + d.data.State + "<br> <em> <b>" + groupname +"<b></em>" );

        });
        rects.exit().remove();
    };
  }
}
</script>