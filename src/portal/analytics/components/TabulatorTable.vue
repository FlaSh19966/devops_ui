<template>
  <div>
    <div class="text-right">
      <!-- <button class="btn btn-primary mb-1" id="download-csv">Download As CSV</button> -->
      <!-- <i class="fa fa-file-excel-o"></i>
      <i class="fas fa-file-excel" aria-hidden="true" id="download-csv"></i>-->
    </div>
    <div id="tabulator-table"></div>
  </div>
</template>

<script>
import Tabulator from "tabulator-tables";
const d3 = require("d3-3");

export default {
  name: "TabulatorTable",
  props: {
    data: Array,
    xKey: String,
    yKey: String,
    currency_key: String,
    heading: String,
  },
  data() {
    return {};
  },
  mounted() {
    const vm = this;
    console.log(this.currency_key);
    //define some sample data
    var tabledata = [
      { id: 1, name: "Oli Bob", age: "12", col: "red", dob: "" },
      { id: 2, name: "Mary May", age: "1", col: "blue", dob: "14/05/1982" },
      {
        id: 3,
        name: "Christine Lobowski",
        age: "42",
        col: "green",
        dob: "22/05/1982",
      },
      {
        id: 4,
        name: "Brendon Philips",
        age: "125",
        col: "orange",
        dob: "01/08/1980",
      },
      {
        id: 5,
        name: "Margret Marmajuke",
        age: "16",
        col: "yellow",
        dob: "31/01/1999",
      },
    ];
    var sum_yval = 0;
    for (let i = 0; i < this.data.length; i++) {
      sum_yval = sum_yval + this.data[i][this.yKey];
    }
    for (let i = 0; i < this.data.length; i++) {
      this.data[i].percent = (this.data[i][this.yKey] / sum_yval) * 100;
    }

    // for (let i = 0; i < this.data.length; i++) {
    //   this.data[i][this.yKey] = Number(this.data[i][this.yKey].toFixed(2));
    // }
    let columns = [
      { title: this.xKey, field: this.xKey },
      {
        title: this.yKey,
        field: this.yKey,
        formatter: function (cell, formatterParams, onRendered) {
          //cell - the cell component
          //formatterParams - parameters set for the column
          //onRendered - function to call when the formatter has been rendered
          return vm.currency_key + ' ' + cell.getValue().toFixed(2);
        },
        tooltip(cell) {
          return cell.getData().percent.toFixed(2) == "0.00"
            ? `${cell.getData().percent}`
            : `${cell.getData().percent.toFixed(2)}%`;
        },
      },
    ];
    //create Tabulator on DOM element with id "tabulator-table"
    var table = new Tabulator("#tabulator-table", {
      maxHeight: "500px",
      data: this.data, //assign data to table
      layout: "fitColumns", //fit columns to width of table (optional)
      columns: columns,
      tooltipGenerationMode: "hover",
    });

    //trigger download of data.csv file
    // console.log(this.heading);
    // document
    //   .getElementById("download-csv")
    //   .addEventListener("click", function () {
    //     table.download("csv", `${vm.heading + new Date()}.csv`);
    //   });
  },
};
</script>