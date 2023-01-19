<template>
    <div>
        <div id="chart"></div>
    </div>
</template>


<script>
import {donutChart} from "./index.js";
const d3 = require("d3");

export default {
    name: "DonutChart",
    props: {
    data: Array,
    xKey: String,
    yKey: String,
  },
  mounted () {
    //   debugger;
      console.log(this.data,this.xKey,this.yKey)
      var donut = donutChart()
        .width(1060)
        .height(600)
        .cornerRadius(1) // sets how rounded the corners are on each slice
        .padAngle(0.015) // effectively dictates the gap between slices
        .variable(this.yKey)
        .category(this.xKey);

   // d3.tsv('species.tsv', function(error, data) {
       // if (error) throw error;
    var data = 
            [
                    {
                        "Species": "Halobacillus halophilus",
                        "Probability": "0.10069108308662117",
                        "Error": "0.045296463390387814"
                    },
                    {
                        "Species": "Staphylococcus epidermidis",
                        "Probability": "0.04076903848429238",
                        "Error": "0.0096463390387814"
                    },
                    {
                        "Species": "Chromobacterium violaceum",
                        "Probability": "0.10318269548054262",
                        "Error": "0.03390387814"
                    },
                    {
                        "Species": "Pseudomonas TKP",
                        "Probability": "0.05880239155316942",
                        "Error": "0.0045296463390387745"
                    },
                    {
                        "Species": "Bacillus subtilis",
                        "Probability": "0.1908578484310064",
                        "Error": "0.0765387676"
                    },
                    {
                        "Species": "Pseudomonas fluorescens",
                        "Probability": "0.10663641563053275",
                        "Error": "0.0045296463390387676"
                    },
                    {
                        "Species": "Micrococcus luteus",
                        "Probability": "0.04523420524963677",
                        "Error": "0.006463390387814"
                    },
                    {
                        "Species": "Pseudoalteromonas SM9913",
                        "Probability": "0.08033880363132218",
                        "Error": "0.05296463390387814"
                    },
                    {
                        "Species": "Enterococcus faecalis",
                        "Probability": "0.07214855298991701",
                        "Error": "0.0077390387814"
                    },
                    {
                        "Species": "Escherichia coli",
                        "Probability": "0.2014657031774047",
                        "Error": "0.100646339038795"
                    }
            ];  
    
        d3.select('#chart')
            .datum(this.data) // bind data to the div
            .call(donut); // draw chart in div

            
  }
}
</script>
<style>
polyline{
    opacity: .3;
    stroke: black;
    stroke-width: 2px;
    fill: none;
}

/* Make the percentage on the text labels bold*/
.labelName tspan {
    font-style: normal;
    font-weight: 700;
}

/* In biology we generally italicise species names. */
.labelName {
    font-size: 0.9em;
    font-style: italic;
}
</style>