<template>
  <canvas
    height="80%"
    id="canvas1"
  ></canvas>
</template>

<script>
import { bus } from "@/portal/main";
import Chart from "chart.js";
export default {
  name: "request-chart",
  data () {
    return {
      BarChart: null
    };
  },
  props: {
    Successful: {
      type: Array,
      default: []
    },
    Unsuccessful: {
      type: Array,
      default: []
    },
    Total: {
      type: Array,
      default: []
    },
    labels: {
      type: Array,
      default: []
    },
    scaleLabel: {
      type: String,
      default: 'Last 7 days'
    },
    scaleLabelY: {
      type: String,
      default: 'Total Requests Count'
    },
    labelSuccessfulResponse: {
      type: String,
      default: 'Successful Response'
    },
    labelTotalRequests: {
      type: String,
      default: 'Total Requests'
    },
    labelUnsuccessfulResponse: {
      type: String,
      default: 'Unsuccessful Response'
    }
  },
  watch: {
    Successful (newVal) {
      this.BarChart.config.data.datasets[0].data = newVal;
      this.BarChart.update();
    },
    Total (newVal) {
      this.BarChart.config.data.datasets[1].data = newVal;
      this.BarChart.update();
    },
    Unsuccessful (newVal) {
      this.BarChart.config.data.datasets[2].data = newVal;
      this.BarChart.update();
    },
    labels (newVal) {
      this.BarChart.config.data.labels = newVal;
      this.BarChart.update();
    },
    scaleLabel (newVal) {
      this.BarChart.options.scales.xAxes[0].scaleLabel.labelString = newVal;
      this.BarChart.update();
    },
    scaleLabelY (newVal) {
      this.BarChart.options.scales.yAxes[0].scaleLabel.labelString = newVal;
      this.BarChart.update();
    },
    labelSuccessfulResponse (newVal) {
      this.BarChart.data.datasets[0].label = newVal;
      this.BarChart.update();
    },
    labelTotalRequests (newVal) {
      this.BarChart.data.datasets[1].label = newVal;
      this.BarChart.update();
    },
    labelUnsuccessfulResponse (newVal) {
      this.BarChart.data.datasets[2].label = newVal;
      this.BarChart.update();
    }
  },
  mounted () {
    var chartColors = {
      red: "rgb(255, 99, 132)",
      orange: "rgb(255, 159, 64)",
      yellow: "rgb(255, 216, 62)",
      green: "rgb(83, 185, 99)",
      blue: "rgb(29, 170, 225)",
      purple: "rgb(153, 102, 255)",
      grey: "rgb(231,233,237)"
    };

    Chart.helpers.drawRoundedTopRectangle = function (
      ctx,
      x,
      y,
      width,
      height,
      radius
    ) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height);
      ctx.lineTo(x, y + height);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    };
    Chart.defaults.global.legend.labels.boxWidth = 20;
    Chart.elements.RoundedTopRectangle = Chart.elements.Rectangle.extend({
      draw: function () {
        var ctx = this._chart.ctx;
        var vm = this._view;
        var left, right, top, bottom, signX, signY, borderSkipped;
        var borderWidth = vm.borderWidth;

        if (!vm.horizontal) {
          left = vm.x - vm.width / 3;
          right = vm.x + vm.width / 3;
          top = vm.y;
          bottom = vm.base;
          signX = 1;
          signY = bottom > top ? 1 : -1;
          borderSkipped = vm.borderSkipped || "bottom";
        } else {
          left = vm.base;
          right = vm.x;
          top = vm.y - vm.height / 4;
          bottom = vm.y + vm.height / 4;
          signX = right > left ? 1 : -1;
          signY = 1;
          borderSkipped = vm.borderSkipped || "left";
        }

        if (borderWidth) {
          var barSize = Math.max(
            Math.abs(left - right),
            Math.abs(top - bottom)
          );
          borderWidth = borderWidth > barSize ? barSize : borderWidth;
          var halfStroke = borderWidth / 4;
          var borderLeft =
            left + (borderSkipped !== "left" ? halfStroke * signX : 0);
          var borderRight =
            right + (borderSkipped !== "right" ? -halfStroke * signX : 0);
          var borderTop =
            top + (borderSkipped !== "top" ? halfStroke * signY : 0);
          var borderBottom =
            bottom + (borderSkipped !== "bottom" ? -halfStroke * signY : 0);
          if (borderLeft !== borderRight) {
            top = borderTop;
            bottom = borderBottom;
          }
          if (borderTop !== borderBottom) {
            left = borderLeft;
            right = borderRight;
          }
        }

        var barWidth = Math.abs(left - right);
        var roundness = this._chart.config.options.barRoundness || 0.8;
        var radius = barWidth * roundness * 0.5;

        var prevTop = top;

        top = prevTop + radius;
        var barRadius = top - prevTop;
        ctx.beginPath();
        ctx.fillStyle = vm.backgroundColor;
        ctx.strokeStyle = vm.borderColor;
        ctx.lineWidth = borderWidth;

        Chart.helpers.drawRoundedTopRectangle(
          ctx,
          left,
          top - barRadius + 1,
          barWidth,
          bottom - prevTop,
          barRadius
        );

        ctx.fill();
        if (borderWidth) {
          ctx.stroke();
        }

        top = prevTop;
      }
    });
    Chart.defaults.roundedBar = Chart.helpers.clone(Chart.defaults.bar);

    Chart.controllers.roundedBar = Chart.controllers.bar.extend({
      dataElementType: Chart.elements.RoundedTopRectangle
    });
    var ctx = document.getElementById("canvas1").getContext("2d");
    this.BarChart = new Chart(ctx, {
      type: "roundedBar",
      data: {
        labels: this.labels,
        datasets: [
          {
            label: this.labelSuccessfulResponse,
            backgroundColor: chartColors.blue,
            data: []
          },
          {
            label: this.labelTotalRequests,
            backgroundColor: chartColors.green,
            data: []
          },
          {
            label: this.labelUnsuccessfulResponse,
            backgroundColor: chartColors.yellow,
            data: []
          }
        ]
      },
      options: {
        responsive: true,
        barRoundness: 1,
        title: {
          display: false
        },
        scales: {
          yAxes: [
            {
              position: "left",
              scaleLabel: {
                display: true,
                fontSize: 18,
                labelString: this.scaleLabelY
              },
              ticks: {
                display: true,
                beginAtZero: true,
                precision: 0
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
                labelString: this.scaleLabel
              }
            }
          ]
        }
      }
    });
    // bus.$on("chart is updated", (data1, data2, data3, data4, data5, data6) => {
    //   if (data1 == "True") {
    //     this.BarChart.config.data.datasets[1].data = data3;
    //     this.BarChart.config.data.datasets[2].data = data4;
    //   }
    // });
  }
};
</script>

