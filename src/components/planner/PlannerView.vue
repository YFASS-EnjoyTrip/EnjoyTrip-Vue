<template>
  <div class="container">
    <div class="title-container">
      <div class="user">{{ userId }} 님의</div>
      <div class="location-date">
        <div class="location">
          <span>{{ locationName }}</span>여행
        </div>
        <div class="date">2023.05.04~2023.05.06</div>
        <div class="modify-button">
          <router-link to="/planner/modify">
            <span>편집</span>
          </router-link>
        </div>
      </div>
    </div>
    <div class="inner-container">
      <div class="left-container">
        <div id="map" class="map"></div>
        <div class="detail-view">
          <plannerAttractionDetail></plannerAttractionDetail>
        </div>
      </div>
      <div class="right-container">
        <div class="day-container">
          <img src="../../assets/img/icon/arrow_left.png" alt="<" />
          <span>1일</span>
          <img src="../../assets/img/icon/arrow_right.png" alt=">" />
        </div>
        <div class="for-scroll">
          <PlannerAttractionList></PlannerAttractionList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import plannerAttractionDetail from "../planner/plannerViewComponents/PlannerAttractionDetail.vue";
import PlannerAttractionList from "../planner/plannerViewComponents/PlannerAttractionList.vue";
export default {
  name: "PlannerView",
  components: {
    plannerAttractionDetail,
    PlannerAttractionList,
  },
  data() {
    return {
      userId: "사용자1111",
      locationName: "부산",
      map: null,
      attractions: "",
    };
  },
  created() { },

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
        var imageSize = new kakao.maps.Size(30, 30);
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

.modify-button {
  width: 80px;
  height: 35px;
  background-color: #F24849;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-top: 30px;
  border-radius: 12px;
}

a {
  text-decoration: none;
  font-family: "CookieRun-Regular";
  color: #ffffff;
  font-size: 1.2rem;
  margin-top: -5px;
}

.modify-button:hover {
  background-color: #fd7272;
  transform: scale(1.1);
  transition: 0.2s;
  cursor: pointer;
}

.title-container {
  margin-left: 100px;
  padding-top: 50px;
  margin-bottom: -60px;
  cursor: default;
}

.user {
  font-family: "CookieRun-Regular";
  color: #696969;
  font-size: 0.9rem;
}

.location-date {
  display: flex;
  width: 85%;
}

.location {
  font-family: "CookieRun-Black";
  font-size: 2.5rem;
  color: #696969;
}

.location>span {
  color: #69beee;
}

.date {
  margin-left: 10px;
  margin-top: 30px;
  font-family: "CookieRun-Regular";
  color: #696969;
  font-size: 0.9rem;
}

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
}

.inner-container {
  margin-top: 30px;
  display: flex;
  margin-left: 50px;
}

.map {
  width: 540px;
  height: 260px;
  border-radius: 30px;
}

.detail-view {
  margin-top: 20px;
  width: 540px;
  height: 320px;
  border-radius: 30px;
  background-color: #fffaeb;
  border: 1px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.right-container {
  margin-left: 20px;
  width: 540px;
  height: 600px;
  border-radius: 30px;
  background-color: #e3f5ff;
  /* border: 2px solid #69beee; */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.day-container {
  margin-top: 7px;
  display: flex;
  justify-content: center;
}

.day-container img:hover {
  cursor: pointer;
  transform: scale(1.2);
  transition: 0.2s;
}

.day-container>img {
  margin-top: 10px;
  width: 20px;
  height: 20px;
}

.day-container>span {
  font-family: "CookieRun-Bold";
  color: #525252;
  font-size: 1.7rem;
  padding-right: 10px;
  padding-left: 10px;
}

.for-scroll::-webkit-scrollbar {
  width: 10px;
  height: 0;
}

.for-scroll::-webkit-scrollbar-thumb {
  background-color: #69beee;
  /* 스크롤바 색상 */
  border-radius: 5px;
  /* 스크롤바 모서리의 곡률 */
}

.for-scroll::-webkit-scrollbar-thumb:active {
  background-color: #2e88bd;
  /* 스크롤바 색상 */
}

::-webkit-scrollbar-track {
  background-color: #e3f5ff;
  /* 트랙 배경색 */
}

::-webkit-scrollbar-thumb {

  background-color: transparent;
}

.for-scroll {
  height: 540px;
  overflow: scroll;
  border-radius: 30px;
}
</style>
