<template>
  <body>
    <div style="display: none">
      <input
        id="pac-input"
        class="controls"
        type="text"
        placeholder="Enter a location"
      />
    </div>
    <div id="map"></div>
    <div id="infowindow-content">
      <span id="place-name" class="title"></span>
      <br />
      <strong>Place ID:</strong>
      <span id="place-id"></span>
      <br />
      <span id="place-address"></span>
    </div>
  </body>
</template>

<script>
import Countries from "@/portal/components/Countries";
export default {
  name: "google-maps",
  data() {
    return {
      placesMap: null,
      placeIdLocal: null,
    };
  },
  props: {
    placeId: String,
    latlng: Object,
  },
  watch: {
    placeId(newVal) {
      if (String(newVal).trim() != "" && newVal != this.placeIdLocal) {
        this.placeIdLocal = newVal;
        this.update_map(newVal);
      }
    },
  },
  beforeCreate() {
    let maps = document.createElement("script");
    maps.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_MAP_CREDS}&libraries=places&callback=initMap`;
    maps.async = true;
    maps.defer = true;
    document.head.append(maps);
  },
  mounted() {
    var vm = this;
    window.initMap = () => {
      let countryCode =
        this.$session.get("country_name") ||
        this.$session.get("UserInformation").country_name;
      let filteredCountryName = Countries.filter((country) => {
        return country.code == countryCode;
      });
      let countryName = filteredCountryName[0].name;

      vm.placesMap = new google.maps.Map(document.getElementById("map"), {
        center: {
          lat: Number(filteredCountryName[0].latlng[0]),
          lng: Number(filteredCountryName[0].latlng[1]),
        },
        zoom: 5,
      });

      var input = document.getElementById("pac-input");

      var autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.bindTo("bounds", vm.placesMap);

      // Specify just the place data fields that you need.
      autocomplete.setFields(["place_id", "geometry", "name"]);

      vm.placesMap.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      var infowindow = new google.maps.InfoWindow();
      var infowindowContent = document.getElementById("infowindow-content");
      infowindow.setContent(infowindowContent);

      var marker = new google.maps.Marker({ map: vm.placesMap });

      marker.addListener("click", function () {
        infowindow.open(vm.placesMap, marker);
      });

      const request = {
        query: countryName,
        fields: ["name", "geometry"],
      };

      autocomplete.addListener("place_changed", function () {
        infowindow.close();

        var place = autocomplete.getPlace();

        if (!place.geometry) {
          return;
        }

        if (place.geometry.viewport) {
          vm.placesMap.fitBounds(place.geometry.viewport);
        } else {
          vm.placesMap.setCenter(place.geometry.location);
          vm.placesMap.setZoom(17);
        }

        // Set the position of the marker using the place ID and location.
        marker.setPlace({
          placeId: place.place_id,
          location: place.geometry.location,
        });

        marker.setVisible(true);

        infowindowContent.children["place-name"].textContent = place.name;
        infowindowContent.children["place-id"].textContent = place.place_id;
        infowindowContent.children["place-address"].textContent =
          place.formatted_address;
        infowindow.open(vm.placesMap, marker);
        vm.$emit("place_id_updated", {
          placeId: place.place_id,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      });
    };
  },
  methods: {
    update_map(placeId) {
      var vm = this;
      const request = {
        placeId: placeId,
        fields: ["name", "formatted_address", "place_id", "geometry"],
      };
      // const infowindow = new google.maps.InfoWindow();
      // const service = new google.maps.places.PlacesService(vm.placesMap);
      // service.getDetails(request, (place, status) => {
      //   if (status === google.maps.places.PlacesServiceStatus.OK) {
      //     const marker = new google.maps.Marker({
      //       map: this.placesMap,
      //       position: place.geometry.location,
      //     });
      //     google.maps.event.addListener(marker, "click", function () {
      //       infowindow.setContent(
      //         "<div><strong>" +
      //           place.name +
      //           "</strong><br>" +
      //           "Place ID: " +
      //           place.place_id +
      //           "</div>"
      //       );

      //       infowindow.open(vm.placesMap, this);
      //     });

      //     vm.placesMap.setCenter(place.geometry.location);
      //   }
      // });
      const marker = new google.maps.Marker({
        map: this.placesMap,
        position: { lat: this.latlng.lat, lng: this.latlng.lng },
      });
      vm.placesMap.setCenter({ lat: this.latlng.lat, lng: this.latlng.lng });
    },
  },
};
</script>

<style scoped>
#map {
  height: 100%;
}
/* Optional: Makes the sample page fill the window. */
html,
body {
  height: 50vh;
  margin: 0;
  padding: 0;
}
.controls {
  background-color: #fff;
  border-radius: 2px;
  border: 1px solid transparent;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  font-family: Roboto;
  font-size: 15px;
  font-weight: 300;
  height: 29px;
  margin-left: 17px;
  margin-top: 10px;
  outline: none;
  padding: 0 11px 0 13px;
  text-overflow: ellipsis;
  width: 400px;
}

.controls:focus {
  border-color: #4d90fe;
}
.title {
  font-weight: bold;
}
#infowindow-content {
  display: none;
}
#map #infowindow-content {
  display: inline;
}
</style>