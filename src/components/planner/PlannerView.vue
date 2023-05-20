<template>
  <div class="container">
    <div class="title-container">
      <div class="user">{{ planInfo.nickName }} 님의</div>
      <div class="location-date">
        <div class="location">
          <span>{{ planInfo.title }}</span>
          여행
        </div>
        <div class="date">{{ planInfo.startDate }} ~ {{ planInfo.endDate }}</div>
        <div class="modify-button" @click="toggleEditMode">
          {{ editMode ? '완료' : '편집' }}
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
        <div v-if="!addItemMode" class="day-container">
          <img
            src="https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/arrow_left.png"
            alt="<"
            @click="
              decreaseSelectedDay();
              renderMap();
            "
          />
          <span>{{ selectedDay }}일</span>
          <img
            src="https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/arrow_right.png"
            alt=">"
            @click="
              increaseSelectedDay();
              renderMap();
            "
          />
        </div>
        <div class="for-scroll">
          <planner-attraction-list
            :attractions="planDetailInfo"
            :selectedDay="selectedDay"
            :editMode="editMode"
            :addItemMode="addItemMode"
            :sidoCode="planInfo.sidoCode"
            @attractionClicked="handleAttractionClick"
            @addAttraction="addAttraction"
            @updatePlan="updatePlan"
          ></planner-attraction-list>
        </div>
        <div v-if="editMode" class="bottom-container">
          <div v-if="!addItemMode">
            <div class="add-list-item" @click="toggleAddItemMode">
              <span>여행지 추가</span>
            </div>
            <div class="modify-list-item">
              <div class="remove-button">삭제</div>
              <div class="change-button">날짜이동</div>
            </div>
          </div>
          <div v-else @click="toggleAddItemMode"><span>돌아가기</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiAuthInstance } from '@/api/index.js';
import { mapGetters } from 'vuex';

const memberStore = 'memberStore';
const api = apiAuthInstance();

import plannerAttractionDetail from './plannerViewComponents/PlannerAttractionDetail.vue';
import PlannerAttractionList from './plannerViewComponents/PlannerAttractionList.vue';

export default {
  name: 'PlannerView',
  components: {
    plannerAttractionDetail,
    PlannerAttractionList,
  },
  computed: {
    ...mapGetters(memberStore, ['checkUserInfo']),
    user() {
      return (
        this.checkUserInfo || {
          nickname: '',
          profileImg: '',
          bio: '',
        }
      );
    },
    selectedDayInfo() {
      return this.planDetailInfo[this.selectedDay - 1];
    },
  },
  props: ['planId'],

  data() {
    return {
      map: null,
      selectedDay: 1,
      attractions: [],
      planInfo: {},
      planDetailInfo: [],
      editMode: false,
      addItemMode: false,
    };
  },

  //   async created() {
  //     await api.get(`http://localhost:8080/planner/list/${this.planId}`).then(({ data }) => {
  //       if (data.status === 200) {
  //         this.planInfo = data.result.planInfo;

  //         Object.keys(data.result.dayInfo).forEach((key) => {
  //           this.planDetailInfo.push(data.result.dayInfo[key]);
  //         });
  //       }
  //     });

  //     this.initKakaoMap();
  //   },

  async mounted() {
    await this.fetchAttractions();
    this.initKakaoMap();
  },

  methods: {
    async fetchAttractions() {
      const response = await api.get(`http://localhost:8080/planner/list/${this.planId}`);
      const { data } = response;

      if (data.status === 200) {
        this.planInfo = data.result.planInfo;

        Object.keys(data.result.dayInfo).forEach((key) => {
          this.planDetailInfo.push(data.result.dayInfo[key]);
        });

        this.attractions = this.planDetailInfo;
      }
    },

    updatePlan(updateAttraction) {
      //   this.planDetailInfo = updateAttraction;

      // updateplan 후 redirect 해도 될거같은데
      // 1. planId, token, planDetatilInfo를 던진다
      try {
        const response = api.put(`/planner/update/${this.planId}`, {
          data: updateAttraction,
        });
        console.log('update 성공', response.status);
      } catch (error) {
        console.log('update 실패', error);
      }

      // 2. 서버가 캐치 업데이트 칠건데... 그전에 order를 서버가 처리한다
    },

    addAttraction() {
      this.toggleAddItemMode();
    },

    toggleEditMode() {
      this.editMode = !this.editMode;
    },

    toggleAddItemMode() {
      this.addItemMode = !this.addItemMode;
    },
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
        const script = document.createElement('script');
        /* global kakao */
        script.onload = () => kakao.maps.load(this.renderMap);
        script.src = '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=6611e5bdfed1654bf775e5e7c8e0625f';
        document.head.appendChild(script);
      }
    },

    handleAttractionClick(attraction) {
      this.$refs.attractionDetail.setAttraction(attraction);
    },

    renderMap() {
      const firstDay = this.planDetailInfo[this.selectedDay - 1];

      this.handleAttractionClick(firstDay[0]);
      const container = document.getElementById('map');
      const options = {
        center: new kakao.maps.LatLng(firstDay[0].lat, firstDay[0].lng),
        level: 5,
      };

      this.map = new kakao.maps.Map(container, options);

      let imageSrc = '';
      const imageFood = 'https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/pin_Y.png';
      const imageAcom = 'https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/pin_B.png';
      const imageLoca = 'https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/pin_G.png';

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
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

a {
  text-decoration: none;
  font-family: 'CookieRun-Regular';
  color: #ffffff;
  font-size: 1.2rem;
  margin-top: -5px;
}

.modify-button:hover {
  background-color: #d43333;
  cursor: pointer;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.3);
}
.modify-button:active {
  background-color: #f8a9a9;
  color: #525252;
}

.title-container {
  margin-left: 100px;
  padding-top: 50px;
  margin-bottom: -60px;
  cursor: default;
}

.user {
  font-family: 'CookieRun-Regular';
  color: #696969;
  font-size: 0.9rem;
}

.location-date {
  display: flex;
  width: 85%;
}

.location {
  font-family: 'CookieRun-Black';
  font-size: 2.5rem;
  color: #696969;
}

.location > span {
  color: #69beee;
}

.date {
  margin-left: 10px;
  margin-top: 30px;
  font-family: 'CookieRun-Regular';
  color: #696969;
  font-size: 0.9rem;
}

.container {
  width: 1200px;
  height: 800px;
  background-color: rgb(255, 255, 255);
  border-radius: 90px;
  box-shadow: 5px 5px 10px 2px rgba(102, 128, 150, 0.5);
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
  font-family: 'CookieRun-Bold';
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
  height: 420px;
  overflow: scroll;
  border-radius: 30px;
}

.bottom-container {
  width: 530px;
}
.add-list-item {
  background-color: #d6efff;
  justify-content: center;
  display: flex;
  width: 500px;
  height: 60px;
  border: 3px dotted #69beee;
  border-radius: 17px;
  margin-left: auto;
  margin-right: auto;
  transition: background-color 0.3s;
}
.add-list-item:hover {
  background-color: #3d90cc;
  color: white;
  cursor: pointer;
}
.add-list-item span {
  color: #6e6e6e;
  font-family: 'CookieRun-Bold';
  font-size: 20px;
  text-align: center;
  line-height: 60px;
}

.modify-list-item {
  display: flex;
  width: 530px;
  height: 50px;
  align-items: center; /* 버튼들을 세로 중앙에 배치 */
}

.remove-button,
.change-button {
  width: 30%;
  cursor: pointer; /* 버튼 위로 마우스가 이동하면 포인터로 변경 */
  padding: 10px 20px; /* 버튼 내부에 패딩 추가 */
  background-color: #69beee; /* 버튼 배경색 */
  color: #ffffff; /* 버튼 텍스트 색 */

  margin-left: auto;
  margin-right: auto;
  border: none; /* 버튼 테두리 없음 */
  border-radius: 10px; /* 버튼 모서리 둥글게 */
  text-align: center; /* 텍스트 중앙정렬 */
}
</style>
