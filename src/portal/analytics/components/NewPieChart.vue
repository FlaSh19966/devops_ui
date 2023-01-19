<template>
  <div :id="`chart${idempotency_key}`">
  <!-- <svg width="700" height="3000" id="svg" /> -->

<svg :id="`newpie${idempotency_key}`">
    <g :id="`canvas${idempotency_key}`">
        <g :id="'art' + idempotency_key" />
        <g :id="'labels' + idempotency_key" /></g>
</svg>
  </div>
</template>

<script>
const d3 = require("d3-3");
export default {
    name: "NewPie",
    props: {
    data: Array,
    xKey: String,
    yKey: String,
    currency_key: String,
    idempotency_key : {
        type: String,
        default: 1
    }
  },
  mounted () {
        var vm = this;
        this.data.sort(function(a, b) {
            return b[vm.yKey] - a[vm.yKey];
         });
        var sum_yval = 0
        for( let i = 0; i < this.data.length; i++) {
            sum_yval = sum_yval +  this.data[i][this.yKey]
        }
        for(let i = 0; i < this.data.length; i++){
            this.data[i].percent = ((this.data[i][this.yKey] / sum_yval) * 100)
        }
        var svg = d3.select(`#newpie${this.idempotency_key}`);
        var canvas = d3.select(`#canvas${this.idempotency_key}`);
        var art = d3.select("#art" + this.idempotency_key);
        var labels = d3.select("#labels" + this.idempotency_key);
       

        // Create the pie layout function.
        // This function will add convenience
        // data to our existing data, like 
        // the start angle and end angle
        // for each data element.
        var jhw_pie = d3.layout.pie()
        jhw_pie.value(function (d, i) {
            // Tells the layout function what
            // property of our data object to
            // use as the value.
            return d[vm.yKey];
        });

        // Store our chart dimensions
        var cDim = {
                height: 300,
                width: 450,
                innerRadius: 0,
                outerRadius: 90,
                labelRadius: 105
            }

        // Set the size of our SVG element
        svg.attr({
            height: cDim.height,
            width: cDim.width
        });

        // This translate property moves the origin of the group's coordinate
        // space to the center of the SVG element, saving us translating every
        // coordinate individually. 
        canvas.attr("transform", "translate(" + (cDim.width / 2.1) + "," + (cDim.width / 3.4) + ")");

        var pied_data = jhw_pie(this.data);

        // The pied_arc function we make here will calculate the path
        // information for each wedge based on the data set. This is 
        // used in the "d" attribute.
        var pied_arc = d3.svg.arc()
                .innerRadius(0)
                .outerRadius(90)
                .padAngle(0.0)
                .cornerRadius(0)

        // This is an ordinal scale that returns 10 predefined colors.
        // It is part of d3 core.
        // var pied_colors = d3.scale.category20();
        // var pied_colors =   d3.scale.ordinal()
        //                     .range(["#00C7E6","#3FBC11", "#EA3379", "#FBB317", "#5d62b5", "#29c3be", "#f1726e",  "#62b58f", "#d0743c","#ca0020","#f4a582","#92c5de","#0571b0", "#d3fe14", "#fec7f8", "#0b7b3e", "#0bf0e9",'#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
        //                     '#FF9AA2', '#FFB7B2', '#FFDAC1', '#B5EAD7', '#63d2a8', "#225a4b", "#e5df73", '#6666FF','#ff0000	','#a2798f','#d7c6cf','#e88758','#b13a15','#6d3656','#fffa90','#a4ffaa','#a6cbff','#8500f9','#b077ba','	#765284','#984b67','#9c624e','#feb8ff','#9be3bd','#775934','#008385','#6a2ca1','#e60e68','#ff6d01','#fee9d3'
        //                     ]);
         var pied_colors =   d3.scale.ordinal()
                            .range(["#FBB317","#FF9750","#3FBC11","#00C7E6","#EA3379","#0165fc","#41fdfe","#24a0ed","#1ac1dd","#7df9ff","#3f00ff","#08ff08","#aeff6e","#56fca2","#45cea2","#06c2ac","#fe6700","#ff3503","#d90166","#be03fd","#ad0afd","#6600ff","#d01c1f","#f1172f","#fff600","#fcd116","#cfff04","#ffc324","#f4c430","#FE7D68","#710193",
            "#0492C2","#9897A9","#632A0D","#9A794E","#151E3D","#59788D","#1E456E","#016064","#48AAAD","#7E7D9C","#303150","#609D9E","#287E9E","#E4A834","#028910",
            "#373737","#6C626D","#584D5B","#4D4C5C"]);

        // Let's start drawing the arcs.
        var enteringArcs = art.selectAll(".wedge"+this.idempotency_key).data(pied_data).enter();
        // debugger;
        enteringArcs.append("path")
            .attr("class", "wedge"+this.idempotency_key)
            .attr("id", function(d, i) {
                return  i;
            })
            // .attr("d", pied_arc)
            .attr("fill", function (d, i) {
                return pied_colors(i);
            })
            .transition()
            .delay(function(d,i) {
            return i *150; })
            .duration(3800)
        	.attrTween('d', function(d) {
		    var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
            return function(t) {
                d.endAngle = i(t); 
                return pied_arc(d)
                }
            })
            .attr("d", pied_arc)
            
            // d3.selectAll("path")
            // .transition()
            // .ease("bounce")
            // .duration(2000)
            // .attrTween("d", tweenPie)
            // .transition()
            // .duration(function(d, i) {
            //         return i * 100;
            //     }).duration(4200)
            //     .attrTween('d', function(d) {   
            //         console.log("heu")
            //     var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
            //     return function(t) {
            //         d.endAngle = i(t);
            //     return pied_arc(d);
            //     }
            // });

        // function tweenPie(b) {
        //     var i = d3.interpolate({startAngle: 1.1*Math.PI, endAngle: 1.1*Math.PI}, b);
        //     return function(t) { return pied_arc(i(t)); };
        // }
        // function tweenPie(b) {
        //     console.log("heylo")
        // var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
        // return function(t) { return pied_arc(i(t)); };
        // }

        // Now we'll draw our label lines, etc.
        var tooltip = 
                d3.select(`#chart${this.idempotency_key}`).append("div").attr("class", "toolTip")

        setTimeout(() => {
            
        var enteringLabels = labels.selectAll(".label").data(pied_data).enter();
        var labelGroups = enteringLabels.append("g").attr("class", "label");
        labelGroups.append("circle").attr({
            x: 0,
            y: 0,
            r: 2,
            fill: "#000",
            transform: function (d, i) {
            var centroid = pied_arc.centroid(d);
                return "translate(" + pied_arc.centroid(d) + ")";
            },
                'class': "label-circle"
        });

        // "When am I ever going to use this?" I said in 
        // 10th grade trig.
        var textLines = labelGroups.append("line").attr({
            x1: function (d, i) {
                // return pied_arc.centroid(d)[0];
                var centroid = pied_arc.centroid(d);
                var midAngle = Math.atan2(centroid[1], centroid[0]);
                var x = Math.cos(midAngle) * cDim.outerRadius;
                return x;
            },
            y1: function (d, i) {
                // return pied_arc.centroid(d)[1];
                var centroid = pied_arc.centroid(d);
                var midAngle = Math.atan2(centroid[1], centroid[0]);
                var y = Math.sin(midAngle) * cDim.outerRadius;
                return y;
            },
            x2: function (d, i) {
                var centroid = pied_arc.centroid(d);
                var midAngle = Math.atan2(centroid[1], centroid[0]);
                var x = Math.cos(midAngle) * cDim.labelRadius;
                return x;
            },
            y2: function (d, i) {
                var centroid = pied_arc.centroid(d);
                var midAngle = Math.atan2(centroid[1], centroid[0]);
            var y = Math.sin(midAngle) * cDim.labelRadius;
                return y;
            },
                'class': "label-line"
        });

        var textLabels = labelGroups.append("text").attr({
            x: function (d, i) {
                var centroid = pied_arc.centroid(d);
                var midAngle = Math.atan2(centroid[1], centroid[0]);
                var x = Math.cos(midAngle) * cDim.labelRadius;
                var sign = (x > 0) ? 1 : -1
                var labelX = x + (5 * sign)
                return labelX;
            },
            y: function (d, i) {
                var centroid = pied_arc.centroid(d);
                var midAngle = Math.atan2(centroid[1], centroid[0]);
                var y = Math.sin(midAngle) * cDim.labelRadius;
                return y;
            },
                'text-anchor': function (d, i) {
                var centroid = pied_arc.centroid(d);
                var midAngle = Math.atan2(centroid[1], centroid[0]);
                var x = Math.cos(midAngle) * cDim.labelRadius;
                return (x > 0) ? "start" : "end";
            },
                'class': 'label-text'
        }).text(function (d) {
            if(d.data[vm.xKey].length > 15){
                return d.data[vm.xKey].substring(0,15)+'... - ' + d.data[vm.yKey]+' - ('+ d.data.percent.toFixed(2)+'%)';
            }
            return `${d.data[vm.xKey]} - ${d.data[vm.yKey]} - (${d.data.percent.toFixed(2)} %) `
        });
        d3.selectAll('.label text').call(show_long_labels);
        function show_long_labels(selection) {
            selection.on('mouseenter', function (d,i) { 
                if(d.data[vm.xKey].length > 15){
                  tooltip
                    .style("left", d3.event.pageX - 40 + "px")
                    .style("top", d3.event.pageY - 70 + "px")
                    .style("display", "inline-block")
                    .html(`${d.data[vm.xKey]} (${d.data.percent.toFixed(2)} %) `);
            }
            });

            selection.on("mouseout", function(d,i) {
                tooltip.style("display", "none"); // hide tooltip for that element
            });

            selection.on("mousemove", function(d) {
                tooltip
                .style("top", d3.event.layerY + 10 + "px") 
                .style("left", d3.event.layerX + 10 + "px"); 
            });
        }


        var alpha = 0.5;
        var spacing = 12;

        function relax() {
            var again = false;
            textLabels.each(function (d, i) {
            var  a = this;
            var   da = d3.select(a);
            var  y1 = da.attr("y");
                textLabels.each(function (d, j) {
                var  b = this;
                    // a & b are the same element and don't collide.
                    if (a == b) return;
                var db = d3.select(b);
                    // a & b are on opposite sides of the chart and
                    // don't collide
                    if (da.attr("text-anchor") != db.attr("text-anchor")) return;
                    // Now let's calculate the distance between
                    // these elements. 
                var  y2 = db.attr("y");
                var   deltaY = y1 - y2;
                    
                    // Our spacing is greater than our specified spacing,
                    // so they don't collide.
                    if (Math.abs(deltaY) > spacing) return;
                    
                    // If the labels collide, we'll push each 
                    // of the two labels up and down a little bit.
                    again = true;
                var  sign = deltaY > 0 ? 1 : -1;
                var  adjust = sign * alpha;
                    da.attr("y",+y1 + adjust);
                    db.attr("y",+y2 - adjust);
                });
            });
            // Adjust our line leaders here
            // so that they follow the labels. 
            if(again) {
            var labelElements = textLabels[0];
                textLines.attr("y2",function(d,i) {
                var  labelForLine = d3.select(labelElements[i]);
                    return labelForLine.attr("y");
                });
                setTimeout(relax,30)
            }

            
            // d3.selectAll(".wedge"+vm.idempotency_key).on("mouseover", function(d) {
            //     var x = d3.select(this).attr('id');
            //     // console.log(x,vm.data[x]);
            //     tooltip
            //         .style("left", d3.event.pageX - 40 + "px")
            //         .style("top", d3.event.pageY - 70 + "px")
            //         .style("display", "inline-block")
            //         .html((vm.data[x][vm.xKey]) + "<br>"  + vm.currency_key + ' ' + ((Number.isInteger(vm.data[x][vm.yKey])) ? (vm.data[x][vm.yKey]) : (vm.data[x][vm.yKey]).toFixed(2)));
            // });

            // d3.selectAll(".wedge"+vm.idempotency_key).on("mouseout", function() {
            //     tooltip.style("display", "none"); // hide tooltip for that element
            // });

            // d3.selectAll(".wedge"+vm.idempotency_key).on("mousemove", function(d) {
            //     tooltip
            //     .style("top", d3.event.layerY + 10 + "px") 
            //     .style("left", d3.event.layerX + 10 + "px"); 
            // });

        }

        relax();
        }, 1400);

    }
}
</script>
<style>
/* .label-text {
    font-size: 12px;
    fill: #393939;
}
.label-line {
    stroke-width: 1;
    stroke: #393939;
}
.label circle {
    display: none;
} */
</style>