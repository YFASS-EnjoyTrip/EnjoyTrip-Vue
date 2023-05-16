<template>
  <div class="container">
    <div class="img-container">
      <img src="../../assets/img/ticket.png" alt="티켓" />
    </div>
    <div class="text-container">
      <div>
        <div class="ticket-top">
          <div class="nickname">
            <span>{{ nickname }} 님의</span>
          </div>
          <div class="ticket-title">
            <span>플래너 티켓</span>
          </div>
        </div>
        <div class="ticket-bottom">
          <div class="location-input">
            <span>지역</span>
            <select
              class="sido-dropdown"
              name="sido"
              id="location"
              v-model="location"
            >
              <option
                v-for="sido in sidos"
                :value="sido.value"
                :key="sido.value"
              >
                {{ sido.text }}
              </option>
            </select>
          </div>
          <div class="date-input">
            <span>일정</span>
            <input class="calendar-pick" type="date" v-model="startDate" />
            <span> ~</span>
            <input class="calendar-pick" type="date" v-model="endDate" />
          </div>
        </div>
      </div>
      <div class="ticket-right">
        <div class="side-title">플래너 티켓</div>
        <div class="info">
          <div>
            <div class="info-title">사용자</div>
            <div class="info-value">{{ nickname }}</div>
          </div>
          <div class="locationInfo">
            <div class="info-title">여행지역</div>
            <div class="info-value">{{ getSelectedText(location) }}</div>
          </div>
          <div class="dateInfo">
            <div class="info-title">일자</div>
            <div class="info-value">{{ startDate }} ~ {{ endDate }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlannerCreate",
  components: {},
  data() {
    return {
      nickname: "지영~!~!!",
      location: "",
      startDate: "",
      endDate: "",
      sidos: [
        { value: "1", text: "서울" },
        { value: "2", text: "인천" },
        { value: "3", text: "대전" },
        { value: "4", text: "대구" },
        { value: "5", text: "광주" },
        { value: "6", text: "부산" },
        { value: "7", text: "울산" },
        { value: "8", text: "세종" },
        { value: "31", text: "경기도" },
        { value: "32", text: "강원도" },
        { value: "33", text: "충청북도" },
        { value: "34", text: "충청남도" },
        { value: "35", text: "경상북도" },
        { value: "36", text: "경상남도" },
        { value: "37", text: "전라북도" },
        { value: "38", text: "전라남도" },
        { value: "39", text: "제주도" },
      ],
    };
  },
  created() {},
  methods: {
    getSelectedText(value) {
      const selectedSido = this.sidos.find((sido) => sido.value === value);
      return selectedSido ? selectedSido.text : "";
    },
  },
};
</script>

<style scoped>
.info-title {
  margin-bottom: 10px;
  font-size: 20px;
  font-family: "CookieRun-Regular";
  color: #ffffff;
}
.info-value {
  margin-bottom: 30px;
  font-size: 15px;
  font-family: "CookieRun-Regular";
  color: #ffffff;
}
.info {
  padding-top: 30px;
  padding-left: 50px;
}
.side-title {
  padding-top: 30px;
  font-size: 30px;
  font-family: "CookieRun-Bold";
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
  font-family: "CookieRun-Regular";
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
  font-family: "CookieRun-Regular";
  color: #757575;

  margin-right: 10px;
  width: 150px;
}
.location-input {
  padding-top: 50px;
  width: 720px;
}

.location-input > span {
  font-family: "CookieRun-Regular";
  color: #757575;
  font-size: 1.5rem;
  margin-right: 20px;
}
.date-input {
  margin-top: 20px;
}
.date-input > span {
  font-family: "CookieRun-Regular";
  color: #757575;
  font-size: 1.5rem;
  margin-right: 20px;
}
.nickname {
  font-family: "CookieRun-Regular";
  color: #fff0c7;
  font-size: 1.8rem;
  padding-top: 40px;
}
.ticket-title {
  font-family: "CookieRun-Black";
  color: #3a3a3a;
  font-size: 3rem;
}
.container {
  width: 1200px;
  height: 800px;
  background-color: rgb(255, 255, 255);
  border-radius: 90px;
  /* box-shadow: 0 2px 4px rgba(73, 73, 73, 0.2); */
}
.img-container {
  display: flex;
  justify-content: center;
  caret-color: transparent;
  user-select: none;
  pointer-events: none;
  width: 1200px;
  margin-top: 50px;
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
</style>
