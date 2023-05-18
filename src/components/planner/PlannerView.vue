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
          <plannerAttractionDetail ref="attractionDetail"></plannerAttractionDetail>
        </div>
      </div>
      <div class="right-container">
        <div class="day-container">
          <img
            src="https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/arrow_left.png"
            alt="<"
            @click="
              decreaseSelectedDay();
              renderMap();
            " />
          <span>{{ selectedDay }}일</span>
          <img
            src="https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/arrow_right.png"
            alt=">"
            @click="
              increaseSelectedDay();
              renderMap();
            " />
        </div>
        <div class="for-scroll">
          <planner-attraction-list
            :attractions="planDetailInfo"
            :selectedDay="selectedDay"
            @attractionClicked="handleAttractionClick"></planner-attraction-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiAuthInstance } from "@/api/index.js";
import { mapGetters } from "vuex";

const memberStore = "memberStore";
const api = apiAuthInstance();

import plannerAttractionDetail from "./plannerViewComponents/PlannerAttractionDetail.vue";
import PlannerAttractionList from "./plannerViewComponents/PlannerAttractionList.vue";

export default {
  name: "PlannerView",
  components: {
    plannerAttractionDetail,
    PlannerAttractionList,
  },
  computed: {
    ...mapGetters(memberStore, ["checkUserInfo"]),
    user() {
      return (
        this.checkUserInfo || {
          nickname: "",
          profileImg: "",
          bio: "",
        }
      );
    },
    selectedDayInfo() {
      return this.planDetailInfo[this.selectedDay - 1];
    },
  },
  props: ["planId"],

  data() {
    return {
      map: null,
      selectedDay: 1,
      attractions: [],
      planInfo: {},
      planDetailInfo: [],
    };
  },

  async created() {
    console.log(this.planId);
    await api.get(`http://localhost:8080/planner/list/${this.planId}`).then(({ data }) => {
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
    decreaseSelectedDay() {
      if (this.selectedDay > 1) {
        this.selectedDay--;
      }
    },

    increaseSelectedDay() {
      if (this.selectedDay < this.planDetailInfo.length) {
        this.selectedDay++;
      }
    },

    initKakaoMap() {
      if (window.kakao && window.kakao.maps) {
        this.renderMap();
      } else {
        const script = document.createElement("script");
        /* global kakao */
        script.onload = () => kakao.maps.load(this.renderMap);
        script.src =
          "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=6611e5bdfed1654bf775e5e7c8e0625f";
        document.head.appendChild(script);
      }
    },

    handleAttractionClick(attraction) {
      this.$refs.attractionDetail.setAttraction(attraction);
    },

    renderMap() {
      const firstDay = this.planDetailInfo[this.selectedDay - 1];

      this.handleAttractionClick(firstDay[0]);
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(firstDay[0].lat, firstDay[0].lng),
        level: 5,
      };

      this.map = new kakao.maps.Map(container, options);

      let imageSrc = "";
      const imageFood = "https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/pin_Y.png";
      const imageAcom = "https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/pin_B.png";
      const imageLoca = "https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/pin_G.png";

      for (let i = 0; i < firstDay.length; i++) {
        const planType = firstDay[i].type;
        var imageSize = new kakao.maps.Size(45, 45);

        if (planType == 39) imageSrc = imageFood;
        else if (planType == 32) imageSrc = imageAcom;
        else imageSrc = imageLoca;

        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        var latlng = new kakao.maps.LatLng(firstDay[i].lat, firstDay[i].lng);

        new kakao.maps.Marker({
          map: this.map,
          position: latlng,
          title: firstDay[i].title,
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
  background-color: #f24849;
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
  box-shadow: 0 2px 4px rgba(73, 73, 73, 0.2);
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

.day-container > img {
  margin-top: 10px;
  width: 20px;
  height: 20px;
}

.day-container > span {
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
