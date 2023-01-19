<template>
  <canvas id="chart" height="80%"></canvas>
</template>
<script>
import Chart from "chart.js";
import { bus } from "@/portal/main";
export default {
  name: "area-chart",
  data() {
    return {
      myLineChart: null,
      billingLineChart: null,
      currency_sign: ""
    };
  },
  props: {
    data: {
      type: Array,
      default: []
    },
    labels: {
      type: Array,
      default: []
    }
  },
  mounted() {
    if (
      this.$session.get("UserInformation").country_name == "IN" ||
      this.$session.get("country_name") == "IN"
    ) {
      this.currency_sign = "₹";
      // return "Cost: ₹" + Number(tooltipItem.yLabel);
    } else if (
      this.$session.get("UserInformation") != "" ||
      this.$session.get("country_name") != "IN"
    ) {
      this.currency_sign = "$";
      // return "Cost: $" + Number(tooltipItem.yLabel);
    }
    var currency = this.currency_sign;
    var ctx = document.getElementById("chart").getContext("2d");

    /*** Gradient ***/
    var gradient = ctx.createLinearGradient(0, 0, 0, 100);
    gradient.addColorStop(0, "#565973");
    gradient.addColorStop(1, "rgba(255,255,255,1)");
    var data = {
      labels: this.labels,
      datasets: [
        {
          label: "Requests",
          backgroundColor: gradient,
          borderColor: "#565973",
          pointBackgroundColor: "#fff",
          pointHighlightStroke: "#565973",
          borderWidth: 2,
          fill: false,
          data: this.data
        }
      ]
    };
    var options2 = {
      responsive: true,
      datasetStrokeWidth: 3,
      pointDotStrokeWidth: 4,
      legend: {
        display: false
      },
      tooltips: {
        displayColors: false,
        callbacks: {
          label: function(tooltipItem) {
            return "Cost: " + currency + Number(tooltipItem.yLabel);
          }
        }
      },
      scales: {
        yAxes: [
          {
            position: "left",
            scaleLabel: {
              display: true,
              fontSize: 18,
              labelString: "Top-Up Usage"
            },
            ticks: {
              display: true,
              beginAtZero: true,
              callback: function(value, index, values) {
                return currency + value;
              }
            }
          }
        ],
        xAxes: [
          {
            position: "bottom",
            scaleLabel: {
              display: true,
              fontSize: 18,
              //constrain: true,
              labelString: "Days"
            }
          }
        ]
      }
    };

    this.billingLineChart = new Chart(ctx, {
      type: "line",
      data: data,
      options: options2
    });
    bus.$on("Billing chart updated", data => {
      if (data == "True") {
        this.billingLineChart.update();
      }
    });

    var options = {
      responsive: true,
      datasetStrokeWidth: 3,
      pointDotStrokeWidth: 4,
      legend: {
        display: false
      },
      scales: {
        yAxes: [
          {
            position: "left",
            scaleLabel: {
              display: true,
              fontSize: 18,
              labelString: "Cumulative User Request Count"
            },
            ticks: {
              display: true,
              beginAtZero: true,
              stepValue: 5
            }
          }
        ],
        xAxes: [
          {
            position: "bottom",
            scaleLabel: {
              display: true,
              fontSize: 18,
              //constrain: true,
              labelString: "Days"
            }
          }
        ]
      }
    };

    // this.myLineChart = new Chart(ctx, {
    //   type: "line",
    //   data: data,
    //   options: options
    // });
    bus.$on("line chart updated", data => {
      if (data == "True") {
        // this.myLineChart.update();
      }
    });
  }
};
</script>
