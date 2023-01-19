<template>
  <div>
    <div id="example-table"></div>
    <table> 

    </table>
  </div>
</template>

<script>
import Tabulator from "tabulator-tables";
export default {
  name: "GroupedTabulatorTable",
  props: {
    data: Array,
    xKey: String,
    yKey: String,
    primary_col: String,
    secondary_col: String,
    currency_key: String,
    heading: String
  },
  mounted() {
    // console.log(this.data);
    // console.log(this.xKey);
    // console.log(this.yKey);
    // console.log(this.primary_col);
    // console.log(this.secondary_col);
    const vm = this;
    var map = this.data.reduce((r, i) => ((r[i[vm.primary_col]] = r[i[vm.primary_col]] || []).push({
        title : i[vm.secondary_col],
        field: i[vm.yKey]
             // i
    }), r), {});
    var entries = Object.entries(map);
    const entries_len = entries.length;
    // console.log(map);
    // console.log(entries);
    // console.log(Object.values(map));
    let x = [];
    for(let i=0; i < entries_len; i++) {
      x.push({
        name: entries[i][0]
        
      })
      for(let j = 0; j < entries[i][1].length; j++){
        var temp = Object.values(entries[i][1][j]);
        var a = temp[0],
            b = temp[1];
            x[i][a] = b;

      }
    }
    // console.log('x',x);
    

    var temp_columns = [
      {
        title: this.secondary_col,
        field: this.primary_col
      },
      {
        title: this.secondary_col,
        
      }
      // {
      //   title: this.secondary_col,
        // field: this.secondary_col
        // columns: [
          // {
          //   title: this.secondary_col,
          //   field: this.secondary_col
          // },
          // {
          //   title: this.secondary_col,
          //   field: this.secondary_col
          // }
        // ]
      //   columns: Object.values(map)
      // }
    ];




    //define data
    var tabledata = [
      {
        id: 1,
        name: "Oli Bob",
        location: "United Kingdom",
        gender: "male",
        rating: 1,
        col: "red",
        dob: "14/04/1984"
      },
      {
        id: 2,
        name: "Mary May",
        location: "Germany",
        gender: "female",
        rating: 2,
        col: "blue",
        dob: "14/05/1982"
      },
      {
        id: 3,
        name: "Christine Lobowski",
        location: "France",
        gender: "female",
        rating: 0,
        col: "green",
        dob: "22/05/1982"
      },
      {
        id: 4,
        name: "Brendon Philips",
        location: "USA",
        gender: "male",
        rating: 1,
        col: "orange",
        dob: "01/08/1980"
      },
      {
        id: 5,
        name: "Margret Marmajuke",
        location: "Canada",
        gender: "female",
        rating: 5,
        col: "yellow",
        dob: "31/01/1999"
      },
      {
        id: 6,
        name: "Frank Harbours",
        location: "Russia",
        gender: "male",
        rating: 4,
        col: "red",
        dob: "12/05/1966"
      },
      {
        id: 7,
        name: "Jamie Newhart",
        location: "India",
        gender: "male",
        rating: 3,
        col: "green",
        dob: "14/05/1985"
      },
      {
        id: 8,
        name: "Gemma Jane",
        location: "China",
        gender: "female",
        rating: 0,
        col: "red",
        dob: "22/05/1982"
      },
      {
        id: 9,
        name: "Emily Sykes",
        location: "South Korea",
        gender: "female",
        rating: 1,
        col: "maroon",
        dob: "11/11/1970"
      },
      {
        id: 10,
        name: "James Newman",
        location: "Japan",
        gender: "male",
        rating: 5,
        col: "red",
        dob: "22/03/1998"
      }
    ];
    // console.log(tabledata);
    var table = new Tabulator("#example-table", {
      layout: "fitColumns",
      data: this.data,
      groupBy: this.primary_col,
      columnHeaderVertAlign: "center", //align header contents to bottom of cell
      // columns: temp_columns  
      autoColumns:true,
      // columns: [
      //   { title: "Name", field: "name", width: 160 },
      //   {
      //     //create column group
      //     title: "Work Info",
      //     columns: [
      //       {
      //         title: "Progress",
      //         field: "progress",
      //         hozAlign: "right",
      //         sorter: "number",
      //         width: 100
      //       },
      //       { title: "Rating", field: "rating", hozAlign: "center", width: 80 },
      //       { title: "Driver", field: "car", hozAlign: "center", width: 80 }
      //     ]
      //   },
      //   {
      //     //create column group
      //     title: "Personal Info",
      //     columns: [
      //       { title: "Gender", field: "gender", width: 90 },
      //       { title: "Favourite Color", field: "col", width: 140 },
      //       {
      //         title: "Date Of Birth",
      //         field: "dob",
      //         hozAlign: "center",
      //         sorter: "date",
      //         width: 130
      //       }
      //     ]
      //   }
      // ]
    });
  }
};
</script>
