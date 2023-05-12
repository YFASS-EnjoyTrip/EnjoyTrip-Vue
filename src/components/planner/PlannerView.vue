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
export default {
  name: "PlannerView",
  components: {},
  data() {
    return {
      map: null,
    };
  },
  created() {},

  mounted() {
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

  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };

      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);
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
