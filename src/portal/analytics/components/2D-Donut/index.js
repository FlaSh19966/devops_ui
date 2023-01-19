import { values } from "d3";

const d3 = require("d3");

export {
    donutChart
}


function donutChart() {
    // var vm = thi
    var width,
        height,
        margin = {top: 160, right: 10, bottom: 10, left: 30},
        // colour = d3.scaleOrdinal(d3.schemeCategory10), // colour scheme
        variable, // value in data that will dictate proportions on chart
        category, // compare data by
        padAngle, // effectively dictates the gap between slices
        floatFormat = d3.format('.4r'),
        cornerRadius, // sets how rounded the corners are on each slice
        percentFormat = d3.format(',.2%');

    //      const colour = d3.scaleOrdinal()
        //  .domain(this.data.map(d => d[vm.xKey]))
        //  .range(d3.quantize(t => d3.interpolateSpectral  (t * 0.8 + 0.1), 20).reverse());

    function chart(selection){
        // console.log(selection);
        
        selection.each(function(data) {
            const colour = d3.scaleOrdinal()
            .domain(data.map( d => d[variable]))
            .range(d3.quantize(t => d3.interpolateSpectral  (t * 0.8 + 0.1), data.length).reverse());
            // generate chart

            // ===========================================================================================
            // Set up constructors for making donut. See https://github.com/d3/d3-shape/blob/master/README.md
            var radius = Math.min(width, height) / 2.6;

            // creates a new pie generator
            var pie = d3.pie()
                .value(function(d) {return d[variable]; })
                // .value(function(d) { console.log(d,variable);return floatFormat(d[variable]); })
                .sort(null);

            // contructs and arc generator. This will be used for the donut. The difference between outer and inner
            // radius will dictate the thickness of the donut
            // console.log(radius)
            var arc = d3.arc()
                .outerRadius(radius * 0.7)
                .innerRadius(radius * 0.4)
                .cornerRadius(cornerRadius)
                .padAngle(padAngle);

            // this arc is used for aligning the text labels
            var outerArc = d3.arc()
                .outerRadius(radius * 2)
                .innerRadius(radius * 0.2);
            var outerArctext = d3.arc()
                .outerRadius(radius * 2)
                .innerRadius(radius * 0.2);
            // ===========================================================================================

            // ===========================================================================================
            // append the svg object to the selection
            var svg = selection.append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
              .append('g')
                .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
            // ===========================================================================================

            // ===========================================================================================
            // g elements to keep elements within svg modular
            svg.append('g').attr('class', 'slices');
            svg.append('g').attr('class', 'labelName');
           var linesss=  svg.append('g').attr('class', 'lines');
           svg.append('g').attr('class', 'labels');
            // ===========================================================================================

            // ===========================================================================================
            // add and colour the donut slices
            var path = svg.select('.slices')
                .datum(data).selectAll('path')
                .data(pie)
              .enter().append('path')
                .attr('fill', function(d) { return colour(d.data[category]); })
                .attr('d', arc);
            // ===========================================================================================

            // ===========================================================================================
            // add text labels
            var label = svg.select('.labelName').selectAll('text')
                .data(pie)
                .enter().append('text')
                .attr('dy', '.25em')
                // .attr('dy', function(d,i){ return (i * 15.34 +10) } )
                // .attr('x', '.25em')
                // .attr('y', '.25em')
                .html(function(d) {
                    // add "key: value" for given category. Number inside tspan is bolded in stylesheet.
                    return d.data[category] + ': <tspan>' + (d.data[variable]).toFixed(2) + '</tspan>';
                })
                .attr('transform', function(d) {

                    // effectively computes the centre of the slice.
                    // see https://github.com/d3/d3-shape/blob/master/README.md#arc_centroid
                    var pos = outerArc.centroid(d);

                    // changes the point to be on left or right depending on where label is.
                    pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
                    // return 'translate(' + pos + ')' + "rotate(" + getAngle(d) + ")";;
                    return 'translate(' + pos + ')';
                })
                .style('text-anchor', function(d) {
                    // if slice centre is on the left, anchor text to start, otherwise anchor to end
                    return (midAngle(d)) < Math.PI ? 'start' : 'end';
                });
            // ===========================================================================================
            var getAngle = function (d) {
                return (180 / Math.PI * (d.startAngle + d.endAngle) / 2 - 90);
            };
            // ===========================================================================================
            // add lines connecting labels to slice. A polyline creates straight lines connecting several points
            var polyline = svg.select('.lines')
                .selectAll('polyline')
                .data(pie)
                .enter().append('polyline')
                .attr('y', function(d,i){ return (i * 15.34 +10) } )
                .attr('points', function(d) {
                            
                        // see label transform function for explanations of these three lines.
                        var pos = outerArc.centroid(d);
                        pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
                        return [arc.centroid(d), outerArc.centroid(d), pos]
                    });
            

            // ===========================================================================================
            // var labels = d3.select("#labels");
            // var enteringLabels = labels.selectAll(".label").data(pie).enter();
            // var labelGroups = enteringLabels.append("g").attr("class", "label");
            // labelGroups.append("circle").attr({
            //     x: 0,
            //     y: 0,
            //     r: 2,
            //     fill: "#000",
            //     transform: function (d, i) {
            //     var centroid = pie.centroid(d);
            //         return "translate(" + pie.centroid(d) + ")";
            //     },
            //         'class': "label-circle"
            // });
        
            // // "When am I ever going to use this?" I said in 
            // // 10th grade trig.
            // var textLines = labelGroups.append("line").attr({
            //     x1: function (d, i) {
            //         // return pied_arc.centroid(d)[0];
            //         var centroid = pie.centroid(d);
            //         var midAngle = Math.atan2(centroid[1], centroid[0]);
            //         var x = Math.cos(midAngle) * cDim.outerRadius;
            //         return x;
            //     },
            //     y1: function (d, i) {
            //         // return pied_arc.centroid(d)[1];
            //         var centroid = pie.centroid(d);
            //         var midAngle = Math.atan2(centroid[1], centroid[0]);
            //         var y = Math.sin(midAngle) * cDim.outerRadius;
            //         return y;
            //     },
            //     x2: function (d, i) {
            //         var centroid = pie.centroid(d);
            //         var midAngle = Math.atan2(centroid[1], centroid[0]);
            //         var x = Math.cos(midAngle) * cDim.labelRadius;
            //         return x;
            //     },
            //     y2: function (d, i) {
            //         var centroid = pie.centroid(d);
            //         var midAngle = Math.atan2(centroid[1], centroid[0]);
            //     var y = Math.sin(midAngle) * cDim.labelRadius;
            //         return y;
            //     },
            //         'class': "label-line"
            // });
        
            // var textLabels = labelGroups.append("text").attr({
            //     x: function (d, i) {
            //         var centroid = pied_arc.centroid(d);
            //         var midAngle = Math.atan2(centroid[1], centroid[0]);
            //         var x = Math.cos(midAngle) * cDim.labelRadius;
            //         var sign = (x > 0) ? 1 : -1
            //         var labelX = x + (5 * sign)
            //         return labelX;
            //     },
            //     y: function (d, i) {
            //         var centroid = pied_arc.centroid(d);
            //         var midAngle = Math.atan2(centroid[1], centroid[0]);
            //         var y = Math.sin(midAngle) * (radius * 0.7);
            //         return y;
            //     },
            //         'text-anchor': function (d, i) {
            //         var centroid = pied_arc.centroid(d);
            //         var midAngle = Math.atan2(centroid[1], centroid[0]);
            //         var x = Math.cos(midAngle) * (radius * 0.5)
            //         return (x > 0) ? "start" : "end";
            //     },
            //         'class': 'label-text'
            // }).text(function (d) {
            //     return d
            // });
        
            // ===========================================================================================
            // add tooltip to mouse events on slices and labels
            d3.selectAll('.labelName text, .slices path').call(toolTip);
            // ===========================================================================================
                // d3.select(".labelName")
            // ===========================================================================================
            // Functions

            // calculates the angle for the middle of a slice
            function midAngle(d) { return d.startAngle + (d.endAngle - d.startAngle) / 2; }

            // function that creates and adds the tool tip to a selected element
            function toolTip(selection) {

                // add tooltip (svg circle element) when mouse enters label or slice
                selection.on('mouseenter', function (data) {

                    svg.append('text')
                        .attr('class', 'toolCircle')
                        .attr('dy', -15) // hard-coded. can adjust this to adjust text vertical alignment in tooltip
                        .html(toolTipHTML(data)) // add text to the circle.
                        .style('font-size', '.9em')
                        .style('text-anchor', 'middle'); // centres text in tooltip

                    svg.append('circle')
                        .attr('class', 'toolCircle')
                        .attr('r', radius * 0.25) // radius of tooltip circle
                        .style('fill', colour(data.data[category])) // colour based on category mouse is over
                        .style('fill-opacity', 0.35);

                });

                // remove the tooltip when mouse leaves the slice/label
                selection.on('mouseout', function () {
                    d3.selectAll('.toolCircle').remove();
                });
            }

            // function to create the HTML string for the tool tip. Loops through each key in data object
            // and returns the html string key: value
            function toolTipHTML(data) {

                var tip = '',
                    i   = 0;

                for (var key in data.data) {
                    // console.log(key,data)
                    // if value is a number, format it as a percentage
                    var value =  data.data[key];

                    // leave off 'dy' attr for first tspan so the 'dy' attr on text element works. The 'dy' attr on
                    // tspan effectively imitates a line break.
                    if (i === 0) tip += '<tspan x="0">' + key + ': ' + value + '</tspan>';
                    else tip += '<tspan x="0" dy="1.2em">' + key + ': ' + value + '</tspan>';
                    i++;
                }

                return tip;
            }
            // ===========================================================================================

        });
    }

    // getter and setter functions. See Mike Bostocks post "Towards Reusable Charts" for a tutorial on how this works.
    chart.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        return chart;
    };

    chart.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        return chart;
    };

    chart.margin = function(value) {
        if (!arguments.length) return margin;
        margin = value;
        return chart;
    };

    // chart.radius = function(value) {
    //     if (!arguments.length) return radius;
    //     radius = value;
    //     return chart;
    // };
    chart.radius = function(value) {
        if (!arguments.length) return radius;
        radius = value;
        return chart;
    };

    chart.padAngle = function(value) {
        if (!arguments.length) return padAngle;
        padAngle = value;
        return chart;
    };

    chart.cornerRadius = function(value) {
        if (!arguments.length) return cornerRadius;
        cornerRadius = value;
        return chart;
    };

    chart.colour = function(value) {
        if (!arguments.length) return colour;
        colour = value;
        return chart;
    };

    chart.variable = function(value) {
        // console.log(value,"var");
        if (!arguments.length) return variable;
        variable = value;
        return chart;
    };

    chart.category = function(value) {
        // console.log(value,"cate");
        if (!arguments.length) return category;
        category = value;
        return chart;
    };

    return chart;
}