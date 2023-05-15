<template>
  <div class="container">
    <div class="title-container">
      <div class="user">{{ planInfo.nickName }} 님의</div>
      <div class="location-date">
        <div class="location">
          <span>{{ planInfo.title }}</span
          >여행
        </div>
        <div class="date">{{ planInfo.startDate }} ~ {{ planInfo.endDate }}</div>
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
        <planner-attraction-list :attractions="planDetailInfo"></planner-attraction-list>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import plannerAttractionDetail from "../planner/plannerViewComponents/PlannerAttractionDetail.vue";
import PlannerAttractionList from "./plannerViewComponents/PlannerAttractionList.vue";

export default {
  name: "PlannerView",
  components: {
    plannerAttractionDetail,
    PlannerAttractionList,
  },
  data() {
    return {
      map: null,
      attractions: null,
      planInfo: {
        nickName: "",
        titel: "",
        startDate: "",
        endDate: "",
        viewCount: "",
        likeCount: "",
      },
      planDetailInfo: [],
      planId: 17, // 이거 나중에 동적으로 처리 예정
      jwtToken:
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiZW1haWwiOiJ0ZXN0M0B0ZXN0LmNvbSIsImlhdCI6MTY4NDEzNjU4MywiZXhwIjoxNjg0MjIyOTgzfQ.0juAc5bY--PFAkTayPtDPZWgGYqWbdYlvnFaOaKhb4U",
    };
  },
  async created() {
    await axios
      .get(`http://localhost:8080/planner/list/${this.planId}`, {
        headers: {
          Authorization: `Bearer ${this.jwtToken}`,
        },
      })
      .then(({ data }) => {
        if (data.status === 200) {
          this.planInfo = data.result.planInfo;

          Object.keys(data.result.dayInfo).forEach((key) => {
            this.planDetailInfo.push(data.result.dayInfo[key]);
          });
        }
      });

    this.initKakaoMap();
  },

  async mounted() {},

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
        center: new kakao.maps.LatLng(this.planDetailInfo[0][0].lat, this.planDetailInfo[0][0].lng),
        level: 5,
      };

      this.map = new kakao.maps.Map(container, options);

      let imageSrc = "";
      const imageFood = "https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/pin_Y.png";
      const imageAcom = "https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/pin_B.png";
      const imageLoca = "https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/pin_G.png";

      this.planDetailInfo.forEach((item) => {
        for (let i = 0; i < item.length; i++) {
          const planType = item[i].type;
          var imageSize = new kakao.maps.Size(30, 30);

          if (planType == 39) imageSrc = imageFood;
          else if (planType == 32) imageSrc = imageAcom;
          else imageSrc = imageLoca;

          var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
          var latlng = new kakao.maps.LatLng(item[i].lat, item[i].lng);

          new kakao.maps.Marker({
            map: this.map,
            position: latlng,
            title: item[i].title,
            image: markerImage,
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.title-container {
  margin-left: 100px;
  padding-top: 50px;
  margin-bottom: -60px;
}
.user {
  font-family: "CookieRun-Regular";
  color: #696969;
  font-size: 0.9rem;
}
.location-date {
  display: flex;
}
.location {
  font-family: "CookieRun-Black";
  font-size: 2.5rem;
  color: #696969;
}
.location > span {
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
  border: 1px solid #ffc930;
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
</style>
