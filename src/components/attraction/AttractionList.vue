<template>
  <div class="container">
    <div class="inner-container">
      <div id="map" class="map"></div>
      <div class="right-container">
        <AttractionSearch @attractions-updated="updateAttractions"></AttractionSearch>
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

  async created() {
    this.loadKakaoMap();
  },

  mounted() {},

  methods: {
    loadKakaoMap() {
      if (window.kakao && window.kakao.maps) {
        this.initKakaoMap();
      } else {
        const script = document.createElement("script");
        /* global kakao */
        script.onload = () => kakao.maps.load(this.initKakaoMap);
        script.src =
          "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=6611e5bdfed1654bf775e5e7c8e0625f";
        document.head.appendChild(script);
      }
    },

    initKakaoMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(this.attractions[0].lat, this.attractions[0].lng),
        level: 7,
      };

      this.map = new kakao.maps.Map(container, options);
      const imageSrc = "https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/pin_B.png";

      for (let i = 0; i < this.attractions.length; i++) {
        const imageSize = new kakao.maps.Size(50, 50);
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        const latlng = new kakao.maps.LatLng(this.attractions[i].lat, this.attractions[i].lng);
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
      this.updateExistingMarkers();
      this.addNewMarkers();
      this.loadKakaoMap();
    },

    updateExistingMarkers() {
      for (let i = 0; i < this.markers.length; i++) {
        const attraction = this.attractions[i];
        const latlng = new kakao.maps.LatLng(attraction.lat, attraction.lng);
        this.markers[i].setPosition(latlng);
      }
    },

    addNewMarkers() {
      const imageSrc = "https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/pin_B.png";

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
  /*box-shadow: 0 2px 4px rgba(73, 73, 73, 0.2);  그림자 속성 설정 */
}
.inner-container {
  display: flex;
}

.map {
  width: 600px;
  height: 800px;
  border-radius: 90px 0px 0px 90px;
}

.right-container {
  width: 600px;
  height: 800px;
  border-radius: 0px 90px 90px 90px;
  background-color: #ffffff;
  /* border: 2px solid #69beee; */
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); */
}
</style>
