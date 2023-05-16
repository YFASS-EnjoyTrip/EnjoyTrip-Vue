<template>
  <div class="container">
    <div class="inner-container">
      <div id="map" class="map"></div>
      <div class="right-container">
        <AttractionSearch></AttractionSearch>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AttractionSearch from "../attraction/AttractionSearch.vue";
export default {
  name: "PlannerView",
  components: { AttractionSearch },
  data() {
    return {
      userId: "사용자1111",
      locationName: "부산",
      map: null,
      attractions: "",
    };
  },
  created() {},

  async mounted() {
    await axios.get("http://localhost:8080/locations").then(({ data }) => {
      this.attractions = data.result;
    });
    this.initKakaoMap();
  },

  methods: {
    initKakaoMap() {
      if (window.kakao && window.kakao.maps) {
        this.initMap();
      } else {
        const script = document.createElement("script");
        /* global kakao */
        script.onload = () => kakao.maps.load(this.initMap);
        script.src =
          "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=02399938b90e8b081af8d7b1d6e4873d";
        document.head.appendChild(script);
      }
    },
    initMap() {
      const container = document.getElementById("map");

      const options = {
        center: new kakao.maps.LatLng(
          this.attractions[0].lat,
          this.attractions[0].lng
        ),
        level: 5,
      };

      this.map = new kakao.maps.Map(container, options);

      const imageSrc =
        "https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/pin_B.png";
      for (var i = 0; i < this.attractions.length; i++) {
        var imageSize = new kakao.maps.Size(50, 50);
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        var latlng = new kakao.maps.LatLng(
          this.attractions[i].lat,
          this.attractions[i].lng
        );

        new kakao.maps.Marker({
          map: this.map,
          position: latlng,
          title: this.attractions[i].title,
          image: markerImage,
        });
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
