<template>
  <div>
    <div class="search-container">
      <div class="input-container">
        <select
          class="sido-dropdown"
          name="sido"
          id="location"
          v-model="sidoOption"
        >
          <option v-for="sido in sidos" :value="sido.value" :key="sido.value">
            {{ sido.text }}
          </option>
        </select>
        <select
          class="gugun-dropdown"
          name="gugun"
          id="location"
          v-model="gugunOption"
        >
          <option
            v-for="gugun in guguns"
            :value="gugun.value"
            :key="gugun.value"
          >
            {{ gugun.text }}
          </option>
        </select>
        <input
          class="input-keyword"
          type="text"
          v-model="keyword"
          placeholder="관광지, 지역"
        />
        <div class="search-button"><span>검색</span></div>
      </div>
      <div class="checkbox-outer-container">
        <div class="checkbox-container">
          <div>
            <input type="checkbox" name="types" id="fes" value="festival" />
            <label for="fes"><span>행사</span></label>
          </div>
          <div>
            <input type="checkbox" name="types" id="att" value="attraction" />
            <label for="att"><span>관광지</span></label>
          </div>
          <div>
            <input type="checkbox" name="types" id="res" value="restaurant" />
            <label for="res"><span>맛집</span></label>
          </div>
          <div>
            <input
              type="checkbox"
              name="types"
              id="acc"
              value="accommodation"
            />
            <label for="acc">숙소</label>
          </div>
        </div>
      </div>
    </div>
    <div class="for-scroll">asdf</div>
    <div class="plannerCreate-button"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AttractionSearch",
  components: {},
  data() {
    return {
      keyword: "",
      sidoOption: "1",
      gugunOption: "",
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
      guguns: [],
    };
  },
  watch: {
    sidoOption(newOption) {
      this.updateGuguns(newOption);
    },
  },
  async created() {
    this.updateGuguns(this.sidoOption);
  },
  methods: {
    async updateGuguns(option) {
      let response = await axios.get(
        `http://localhost:8080/locations/search/gugun?sido=${option}`
      );
      this.guguns = response.data.result;
      this.gugunOption = this.guguns[0].value;
    },
  },
};
</script>

<style scoped>
.search-container {
  margin-top: 30px;
  justify-content: center;
}
input[type="checkbox"] {
  width: 15px;
  height: 15px;
  border: 3px solid #ff9090; /* 원하는 스타일로 설정 */
  display: none;
}
input[type="checkbox"] + label {
  cursor: pointer;
  caret-color: transparent;
  user-select: none;
}

input[type="checkbox"] + label > span {
  /* vertical-align: middle; */
  margin-left: 5px;
  font-size: 15px; /* 폰트 크기 설정 */
  font-family: "CookieRun-Regular";
  color: #f24849;
}

/* label:before에 체크하기 전 상태 CSS */
input[type="checkbox"] + label:before {
  content: "";
  display: inline-block;
  width: 17px;
  height: 17px;
  border: 2px solid #acacac;
  border-radius: 4px;
  vertical-align: middle;
}

/* label:before에 체크 된 상태 CSS */
input[type="checkbox"]:checked + label:before {
  content: "";
  background-color: #f24849;
  border-color: #f24849;
  background-repeat: no-repeat;
  background-position: 50%;
}

.checkbox-outer-container {
  display: flex;
  justify-content: center;
}
.checkbox-container {
  margin-top: 10px;
  width: 60%;
  display: flex;
  justify-content: space-between;
}
.input-container {
  display: flex;
  justify-content: center;
}
.sido-dropdown {
  border: 2px solid #c4c4c4; /* 테두리 스타일 추가 */
  border-radius: 8px; /* 테두리 모서리 둥글게 설정 */
  outline: none; /* 포커스 시 테두리 제거 */
  font-size: 15px; /* 폰트 크기 설정 */
  text-indent: 10px;
  font-family: "CookieRun-Regular";
  color: #757575;

  margin-right: 10px;
  width: 100px;
}
.gugun-dropdown {
  border: 2px solid #c4c4c4; /* 테두리 스타일 추가 */
  border-radius: 8px; /* 테두리 모서리 둥글게 설정 */
  outline: none; /* 포커스 시 테두리 제거 */
  font-size: 15px; /* 폰트 크기 설정 */
  text-indent: 10px;
  font-family: "CookieRun-Regular";
  color: #757575;

  margin-right: 20px;
  width: 130px;
}
.input-keyword {
  border: 2px solid #c4c4c4; /* 테두리 스타일 추가 */
  border-radius: 8px; /* 테두리 모서리 둥글게 설정 */
  outline: none; /* 포커스 시 테두리 제거 */
  font-size: 15px; /* 폰트 크기 설정 */
  text-indent: 10px;
  font-family: "CookieRun-Regular";
  color: #757575;

  margin-right: 20px;
  width: 130px;
}

.input-keyword::placeholder {
  color: #c5c5c5;
}

.search-button {
  display: flex;
  justify-content: center;
  width: 70px;
  height: 30px;
  border-radius: 5px;
  background-color: #f24849;
  font-family: "CookieRun-Bold";
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;
  caret-color: transparent;
  user-select: none;
}
.search-button > span {
  margin-top: 3px;
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
  background-color: #69bdee59;
}
</style>
