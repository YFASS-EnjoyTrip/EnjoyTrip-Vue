<template>
  <div class="container">
    <div class="inner-container">
      <div id="map" class="map"></div>
      <div class="right-container">
        <AttractionSearch
          @attractions-updated="updateAttractions"
        ></AttractionSearch>
      </div>
    </div>
  </div>
</template>

<script>
import AttractionSearch from "../attraction/AttractionSearch.vue";
export default {
  name: "PlannerView",
  components: { AttractionSearch },
  data() {
    return {
      map: null,
      attractions: [],
      markers: [],
    };
  },

  created() {},

  mounted() {},

  methods: {
    loadKakaoMap() {
      if (window.kakao && window.kakao.maps) {
        this.initKakaoMap();
      } else {
        const script = document.createElement("script");
        /* global kakao */
        script.onload = () =>
          kakao.maps.load(() => {
            this.initKakaoMap();
          });
        script.src =
          "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=6611e5bdfed1654bf775e5e7c8e0625f";
        document.head.appendChild(script);
      }
    },

    initKakaoMap() {
      const container = document.getElementById("map");
      const options = {
        center:
          this.attractions.length > 0
            ? new kakao.maps.LatLng(
                this.attractions[0].lat,
                this.attractions[0].lng
              )
            : new kakao.maps.LatLng(37.5665, 126.978), // Default location
        level: 7,
      };

      this.map = new kakao.maps.Map(container, options);
      const imageSrc =
        "https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/pin_B.png";

      for (let i = 0; i < this.attractions.length; i++) {
        const imageSize = new kakao.maps.Size(50, 50);
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        const latlng = new kakao.maps.LatLng(
          this.attractions[i].lat,
          this.attractions[i].lng
        );
        const marker = new kakao.maps.Marker({
          map: this.map,
          position: latlng,
          title: this.attractions[i].title,
          image: markerImage,
        });
        this.markers.push(marker);
      }
    },

    async updateAttractions(attractions) {
      this.attractions = attractions;
      this.loadKakaoMap();
      this.updateExistingMarkers();
      this.addNewMarkers();
    },

    updateExistingMarkers() {
      const length = Math.min(this.attractions.length, this.markers.length);

      for (let i = 0; i < length; i++) {
        const attraction = this.attractions[i];
        // attraction이 유효하고 lat, lng 속성을 가지고 있는지 확인
        if (attraction && attraction.lat && attraction.lng) {
          const latlng = new kakao.maps.LatLng(attraction.lat, attraction.lng);
          this.markers[i].setPosition(latlng);
        } else {
          console.warn(
            `Attraction at index ${i} is missing lat/lng properties.`
          );
        }
      }
    },

    addNewMarkers() {
      const imageSrc =
        "https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/pin_B.png";

      for (let i = this.markers.length; i < this.attractions.length; i++) {
        const attraction = this.attractions[i];
        const latlng = new kakao.maps.LatLng(attraction.lat, attraction.lng);
        const imageSize = new kakao.maps.Size(50, 50);
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        const marker = new kakao.maps.Marker({
          map: this.map,
          position: latlng,
          title: attraction.title,
          image: markerImage,
        });

        this.markers.push(marker);
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 1200px;
  height: 800px;
  background-color: rgb(255, 255, 255);
  border-radius: 90px;
  box-shadow: 5px 5px 10px 2px rgba(102, 128, 150, 0.5);
}
.inner-container {
  display: flex;
}

.map {
  width: 600px;
  height: 800px;
  border-radius: 90px 0px 0px 90px;
  box-shadow: 4px 0px 8px rgba(63, 63, 63, 0.5);
}

.right-container {
  width: 600px;
  height: 800px;
  border-radius: 0px 90px 90px 0px;
  background-color: #fff4d7;
  /* border: 2px solid #69beee; */
}
</style>
