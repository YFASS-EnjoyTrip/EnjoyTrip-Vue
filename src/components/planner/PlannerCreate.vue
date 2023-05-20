<template>
  <div class="container">
    <div class="plannerCreate-text">{{ this.user.nickname }} 님의 여행가챠 쿠폰이 발급되었습니다</div>
    <div class="img-container">
      <img src="../../assets/img/ticket.png" alt="티켓" />
    </div>
    <div class="text-container">
      <div>
        <div class="ticket-top">
          <div v-if="loading" class="modal">
            <div class="modal-content">
              <img src="@/assets/img/gachapon.gif" alt="여행뽑기" />
            </div>
          </div>
          <div class="nickname">
            <span>{{ this.user.nickname }} 님의</span>
          </div>
          <div class="ticket-title">
            <span>가챠 쿠폰</span>
          </div>
        </div>
        <div class="ticket-bottom">
          <div class="location-input">
            <span>지역</span>
            <select class="sido-dropdown" name="sido" id="location" v-model="location">
              <option v-for="sido in sidos" :value="sido.value" :key="sido.value">
                {{ sido.text }}
              </option>
            </select>
          </div>
          <div class="date-input">
            <span>일정</span>
            <input class="calendar-pick" type="date" :min="todayDate" v-model="startDate" />
            <span>~</span>
            <input class="calendar-pick" type="date" :min="startDate" v-model="endDate" />
          </div>
        </div>
      </div>
      <div class="ticket-right">
        <div class="side-title">-플래너 정보-</div>
        <div class="info">
          <div>
            <div class="info-title">사용자</div>
            <div class="info-value">{{ this.user.nickname }}</div>
          </div>
          <div class="locationInfo">
            <div class="info-title">여행지역</div>
            <div class="info-value">{{ getSelectedText(location) }}</div>
          </div>
          <div class="dateInfo">
            <div class="info-title">일자</div>
            <div class="info-value">시작일 : {{ startDate }}</div>
            <div class="info-value end">종료일 : {{ endDate }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="confirm-container">
      <div class="confirm-text">
        <span>
          쿠폰을 사용하면
          <br />
        </span>
        <span>
          <span>{{ this.user.nickname }}</span>
          님 만의 여행 계획을 만들어 드려요!
        </span>
      </div>
    </div>
    <div class="confirm-button">
      <div class="button cancel">취소</div>
      <div class="button submit" @click="createaPlan">사용</div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { apiAuthInstance } from '@/api/index.js';

const memberStore = 'memberStore';
const api = apiAuthInstance();

export default {
  name: 'PlannerCreate',
  components: {},
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
  },
  data() {
    return {
      loading: false,
      location: '',
      locName: '',
      startDate: '',
      endDate: '',
      todayDate: '',
      sidos: [
        { value: '1', text: '서울' },
        { value: '2', text: '인천' },
        { value: '3', text: '대전' },
        { value: '4', text: '대구' },
        { value: '5', text: '광주' },
        { value: '6', text: '부산' },
        { value: '7', text: '울산' },
        { value: '8', text: '세종' },
        { value: '31', text: '경기도' },
        { value: '32', text: '강원도' },
        { value: '33', text: '충청북도' },
        { value: '34', text: '충청남도' },
        { value: '35', text: '경상북도' },
        { value: '36', text: '경상남도' },
        { value: '37', text: '전라북도' },
        { value: '38', text: '전라남도' },
        { value: '39', text: '제주도' },
      ],
    };
  },
  mounted() {
    this.todayDate = new Date().toISOString().split('T')[0];
  },
  methods: {
    getSelectedText(value) {
      const selectedSido = this.sidos.find((sido) => sido.value === value);
      this.locName = selectedSido ? selectedSido.text : '';
      return this.locName;
    },

    async createaPlan() {
      try {
        const response = await api.post('/planner/create', {
          startDate: this.startDate,
          endDate: this.endDate,
          sidoCode: this.location,
          sidoName: this.locName,
        });

        // 플랜 생성 성공 시
        if (response.status === 201) {
          console.log(response.data.result);

          // 로딩 gif 표시를 위한 데이터 프로퍼티
          this.loading = true;

          setTimeout(() => {
            this.loading = false;

            this.$router.push({
              name: 'plannerView',
              params: { planId: response.data.result },
            });
          }, 3000); // 2초 후에 실행
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.plannerCreate-text {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px;
  font-size: 30px;
  font-family: 'CookieRun-Regular';
  color: #8d8d8d;

  caret-color: transparent;
  user-select: none;
  pointer-events: none;
}
.button {
  width: 120px;
  margin-right: 40px;
  margin-left: 40px;
  height: 35px;
  font-size: 20px;
  font-family: 'CookieRun-Regular';
  color: #ffffff;
  text-align: center;
  padding-top: 5px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(68, 68, 68, 0.5);
}
.cancel {
  background-color: #8f8f8f;
}
.submit {
  background-color: #69beee;
}
.submit:hover {
  background-color: #4ba0d1;
  box-shadow: inset 0 2px 4px rgba(68, 68, 68, 0.5);
}
.submit:active {
  background-color: #9edbfc;
  color: #3a3a3a;
  transition: 0.3s;
}
.cancel:hover {
  box-shadow: inset 0 2px 4px rgba(68, 68, 68, 0.5);
  background-color: #858585;
}
.cancel:active {
  background-color: #c4c4c4;
  color: #3a3a3a;
  transition: 0.3s;
}
.confirm-text > span > span {
  color: #69beee;
}
.confirm-text {
  text-align: center;

  caret-color: transparent;
  user-select: none;
  pointer-events: none;
}
.confirm-text span {
  font-size: 30px;
  font-family: 'CookieRun-Regular';
  color: #8d8d8d;
}
.confirm-container {
  margin-top: 60px;
  display: flex;
  justify-content: center;
}
.confirm-button {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  caret-color: transparent;
  user-select: none;
  cursor: pointer;
}
.info-value + .end {
  margin-top: -20px;
}
.info-title {
  margin-bottom: 10px;
  font-size: 20px;
  font-family: 'CookieRun-Regular';
  color: #ffe8aa;
}

.info-value {
  margin-bottom: 20px;
  font-size: 20px;
  font-family: 'CookieRun-Regular';
  color: #ffffff;
}

.info {
  padding-top: 20px;
  padding-left: 50px;
}

.side-title {
  padding-top: 30px;
  font-size: 30px;
  font-family: 'CookieRun-Bold';
  color: #3a3a3a;
  text-align: center;
}

.calendar-pick {
  border: 2px solid #c4c4c4;
  /* 테두리 스타일 추가 */
  border-radius: 8px;
  /* 테두리 모서리 둥글게 설정 */
  outline: none;
  /* 포커스 시 테두리 제거 */
  font-size: 20px;
  font-family: 'CookieRun-Regular';
  color: #757575;

  text-indent: 5px;
  margin-right: 10px;
  width: 170px;
}

.sido-dropdown {
  border: 2px solid #c4c4c4;
  /* 테두리 스타일 추가 */
  border-radius: 8px;
  /* 테두리 모서리 둥글게 설정 */
  outline: none;
  /* 포커스 시 테두리 제거 */
  font-size: 20px;
  text-indent: 10px;
  font-family: 'CookieRun-Regular';
  color: #757575;

  margin-right: 10px;
  width: 150px;
}

.location-input {
  padding-top: 50px;
  width: 720px;
}

.location-input > span {
  font-family: 'CookieRun-Bold';
  color: #757575;
  font-size: 1.5rem;
  margin-right: 20px;
}

.date-input {
  margin-top: 20px;
}

.date-input > span {
  font-family: 'CookieRun-Bold';
  color: #757575;
  font-size: 1.5rem;
  margin-right: 20px;
}

.nickname {
  font-family: 'CookieRun-Regular';
  color: #fff0c7;
  font-size: 1.8rem;
  padding-top: 40px;
}

.ticket-title {
  font-family: 'CookieRun-Black';
  color: #3a3a3a;
  font-size: 3rem;
}

.container {
  width: 1200px;
  height: 800px;
  background-color: rgb(255, 255, 255);
  border-radius: 90px;
  box-shadow: 5px 5px 10px 2px rgba(102, 128, 150, 0.5);
}

.img-container {
  display: flex;
  justify-content: center;
  caret-color: transparent;
  user-select: none;
  pointer-events: none;
  width: 1200px;
  margin-top: -30px;
}

.text-container {
  display: flex;
  margin-left: 120px;
  margin-top: -440px;
}

.ticket-top {
  width: 700px;
  height: 190px;
  text-align: center;
  caret-color: transparent;
  user-select: none;
  pointer-events: none;
}

.ticket-bottom {
  width: 700px;
  height: 190px;
  text-align: center;
  caret-color: transparent;
  user-select: none;
}

.ticket-right {
  width: 270px;
  height: 380px;
  caret-color: transparent;
  user-select: none;
  pointer-events: none;
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

.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>
