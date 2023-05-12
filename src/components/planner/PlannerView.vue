<template>
  <div class="container">
    <div class="title-container">asdf</div>
    <div class="inner-container">
      <div class="left-container">
        <div id="map" class="map"></div>
        <div class="detail-view">asasdfasdf</div>
      </div>
      <div class="right-container"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PlannerView",
  components: {},
  data() {
    return {
      map: null,
      marker: null,
      attractions: null,
    };
  },
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
          "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=6611e5bdfed1654bf775e5e7c8e0625f";
        document.head.appendChild(script);
      }
    },
    initMap() {
      const container = document.getElementById("map");

      const options = {
        center: new kakao.maps.LatLng(this.attractions[0].lat, this.attractions[0].lng),
        level: 5,
      };

      this.map = new kakao.maps.Map(container, options);

      const imageSrc = "https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/pin_B.png";
      for (var i = 0; i < this.attractions.length; i++) {
        var imageSize = new kakao.maps.Size(30, 30);
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        var latlng = new kakao.maps.LatLng(this.attractions[i].lat, this.attractions[i].lng);

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
.title-container {
  width: 1200px;
  height: 130px;
  background-color: rgba(0, 255, 255, 0.137);
}
.inner-container {
  display: flex;
  margin-left: 50px;
}

.map {
  margin-top: 20px;
  width: 530px;
  height: 250px;
  border-radius: 30px;
}

.detail-view {
  margin-top: 30px;
  width: 530px;
  height: 320px;
  border-radius: 30px;
  background-color: antiquewhite;
}

.right-container {
  margin-top: 20px;
  margin-left: 30px;
  width: 540px;
  height: 600px;
  border-radius: 30px;
  background-color: antiquewhite;
}
</style>
