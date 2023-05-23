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
        <div :class="buttonClass" @click="toggleEditMode">{{ editMode ? '완료' : '편집' }}</div>
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
        <div v-if="loading" class="modal">
          <div class="modal-content">
            <img class="gif" src="@/assets/img/gachapon.gif" alt="여행뽑기" />
            <div class="modal-text">
              <span>{{ planInfo.nickName }}</span>
              님 만을 위한
              <br />
              <span>{{ planInfo.title }}</span>
              여행 계획이
              <br />
              만들어지고 있어요!
            </div>
          </div>
        </div>
        <div class="for-scroll">
          <planner-attraction-list
            ref="plannerAttractionList"
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
        <div class="reroll-button" v-show="!editMode" @click="reRollPlanner">
          다시 시도하기
          <span>(남은 횟수 {{ rerollCnt - this.planInfo.rerollCount }}회)</span>
        </div>
        <div v-if="editMode" class="bottom-container">
          <div v-if="!addItemMode">
            <div class="modify-list-item">
              <div class="remove-button" @click="removeItem">삭제</div>
              <div class="change-button" @click="openChangeModal">날짜이동</div>
              <div class="add-button" @click="toggleAddItemMode">여행지 추가</div>
            </div>
          </div>
          <div class="back-button" v-else @click="toggleAddItemMode">
            <span>돌아가기</span>
          </div>
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
    buttonClass() {
      return {
        'modify-button done-button': this.editMode,
        'modify-button edit-button': !this.editMode,
      };
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
      rerollCnt: 5,
      loading: false,
    };
  },

  async mounted() {
    await this.fetchAttractions();
    this.initKakaoMap();
  },

  methods: {
    async fetchAttractions() {
      const response = await api.get(`/planner/list/${this.planId}`);
      const { data } = response;

      if (data.status === 200) {
        this.planInfo = data.result.planInfo;
        console.log(this.planInfo);
        Object.keys(data.result.dayInfo).forEach((key) => {
          this.planDetailInfo.push(data.result.dayInfo[key]);
        });

        this.attractions = this.planDetailInfo;
      }
    },

    async reRollPlanner() {
      if (this.rerollCnt - this.planInfo.rerollCount === 0) {
        alert('기회를 모두 사용하셨습니다!');
      } else {
        const param = {
          planId: this.planInfo.planId,
          sidoCode: this.planInfo.sidoCode,
          startDate: this.planInfo.startDate,
          endDate: this.planInfo.endDate,
        };

        try {
          const response = await api.post(`/planner/reroll`, param);

          if (response.status === 201) {
            // this.loading = true;
            // setTimeout(() => {
            //   this.loading = false;
            //   window.location.reload();
            // }, 4000); // 4초 후에 실행
            window.location.reload();
          } else {
            console.log('서버에 문제가 발생');
          }
        } catch (error) {
          console.log('error');
        }
      }
    },

    removeItem() {
      this.$refs.plannerAttractionList.removeItem();
    },

    openChangeModal() {
      this.$refs.plannerAttractionList.openChangeModal();
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
  width: 90px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-top: 15px;
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  font-family: 'CookieRun-Regular';
  color: #ffffff;
  font-size: 25px;
  caret-color: transparent;
  user-select: none;
}

a {
  text-decoration: none;
  font-family: 'CookieRun-Regular';
  color: #ffffff;
  font-size: 1.2rem;
  margin-top: -5px;
}
.done-button {
  background-color: #69beee;
}
.edit-button {
  background-color: #f24849;
}

.done-button:hover {
  background-color: #3a96cf;
  cursor: pointer;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.3);
}
.done-button:active {
  background-color: #b4dcf3;
  color: #525252;
  transform: scale(0.9);
  transition: 0.2s;
}
.edit-button:hover {
  background-color: #d43333;
  cursor: pointer;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.3);
}
.edit-button:active {
  background-color: #f8a9a9;
  color: #525252;
  transform: scale(0.9);
  transition: 0.2s;
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
.reroll-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 480px;
  height: 55px;
  background-color: #69beee;
  text-align: center;
  margin: auto;
  margin-top: 10px;
  border-radius: 10px;
  font-family: 'CookieRun-Regular';
  color: #ffffff;
  font-size: 25px;
  cursor: pointer;
  caret-color: transparent;
  user-select: none;
  box-shadow: 3px 3px 5px 2px rgba(68, 89, 112, 0.315);
}
.reroll-button span {
  margin-left: 10px;
  font-size: 15px;
  color: #ff5757;
}
.reroll-button:hover {
  box-shadow: inset 3px 3px 5px 2px rgba(68, 89, 112, 0.315);
  transition: 0.2s;
  color: #474747;
  background-color: #ffd446;
}
.reroll-button:active {
  transform: scale(0.9);
  transition: 0.2s;
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
  /* max-height: 550px; */
  overflow: scroll;
  border-radius: 30px;
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
  padding-top: 15px;
  display: flex;
  width: 500px;
  align-items: center; /* 버튼들을 세로 중앙에 배치 */
  margin: auto;
}
.modify-list-item div {
  width: 130px;
  height: 40px;
  text-align: center;
  margin: auto;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  font-family: 'CookieRun-Regular';
  font-size: 20px;
  color: #ffffff;
  padding-top: 10px;
  cursor: pointer;
}
.modify-list-item div:active {
  transform: scale(0.9);
  transition: 0.2s;
}
.remove-button {
  background-color: #969696;
}
.remove-button:hover {
  background-color: #616161;
}
.change-button {
  background-color: #69beee;
}
.change-button:hover,
.add-button:hover {
  background-color: #4294c4;
}
.add-button {
  background-color: #69beee;
}

.back-button {
  margin-top: 30px !important;
  width: 500px;
  height: 50px;
  text-align: center;
  margin: auto;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  font-family: 'CookieRun-Regular';
  font-size: 25px;
  color: #ffffff;
  padding-top: 10px;
  cursor: pointer;
  background-color: #69beee;
}
.back-button:hover {
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
  background-color: #318ec4;
}
.back-button:hover span {
  transform: scale(1.1);
  transition: 0.2s;
}
.back-button:active {
  transform: scale(0.9);
  transition: 0.2s;
}
.back-button span {
  display: flex;
  justify-content: center;
}

.modal {
  /* 모달의 위치를 고정하고 전체 페이지를 덮게 하려면 다음을 사용하세요 */
  position: fixed;
  z-index: 9999; /* 다른 콘텐츠 위에 표시 */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}
.gif {
  width: 500px;
  height: fit-content;
  margin-top: 100px;
  margin-left: 20px;
}
.modal-text {
  font-family: 'CookieRun-Regular';
  color: #383838;
  font-size: 50px;
  text-align: center;
  margin-top: 250px;
  margin: auto;
}
.modal-text span {
  color: #30b2fd;
}
.modal-content {
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  background-color: #ffffff;
  width: 1000px;
  height: 600px;
  border-radius: 60px;
  padding-right: 50px;
  border: 10px solid #fe646f;
}
</style>
