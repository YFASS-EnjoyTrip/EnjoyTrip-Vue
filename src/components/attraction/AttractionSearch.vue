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
        <div class="search-button" @click="selectAllAttractions">
          <span>검색</span>
        </div>
      </div>
      <div class="checkbox-outer-container">
        <div class="checkbox-container">
          <input
            type="checkbox"
            name="types"
            id="all"
            value="all"
            v-model="allSelected"
          />
          <label for="all"><span>전체</span></label>
          <div v-for="(item, index) in allTypes" :key="index">
            <div>
              <input
                type="checkbox"
                name="types"
                :id="item.code"
                :value="item.code"
                v-model="selectedTypes"
              />
              <label :for="item.code"
                ><span>{{ item.name }}</span></label
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="for-scroll" ref="scrollContainer" @scroll="handleScroll">
      <div
        class="attraction-container"
        v-for="(attraction, index) in attractions"
        :key="index"
      >
        <div class="img-heart">
          <img
            class="attractionImg"
            :src="attraction.image || defaultImage"
            :alt="attraction.title"
          />
        </div>
        <div class="attraction-info">
          <div class="attraction-title">
            <span>{{ attraction.title }}</span>
          </div>
          <div class="like-heart">
            <img
              class="icon"
              :src="
                attraction.isLike
                  ? 'https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/heart_fill.png'
                  : 'https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/heart_empty.png'
              "
              alt="하트"
            />
            <span>({{ attraction.likeCount }})</span>
            <img
              class="icon"
              src="../../assets/img/icon/star_fill.png"
              alt="별"
            />
            <span>{{ attraction.rank }}</span>
            <span>({{ attraction.rankCnt }})</span>
          </div>
        </div>
      </div>
    </div>
    <router-link :to="{ name: 'PlannerCreate' }">
      <div class="plannerCreate-button">
        <img src="../../assets/img/icon/capsule_R.png" alt="capR" />
        <span>플래너 생성하기</span>
        <img src="../../assets/img/icon/capsule_Y.png" alt="capY" />
      </div>
    </router-link>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AttractionSearch",
  components: {},
  data() {
    return {
      // 23.05.16 기본이미지, 페이지네이션 추가
      defaultImage:
        "https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/Attraction_default.png",
      page: 1,
      pageSize: 100,
      //
      keyword: "",
      sidoOption: "0",
      gugunOption: "",
      sidos: [
        { value: "0", text: "전체" },
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
      allTypes: [
        { code: "15", name: "행사" },
        { code: ["12", "14", "28"], name: "관광지" },
        { code: "39", name: "맛집" },
        { code: "32", name: "숙소" },
      ],
      selectedTypes: [],
      attractions: [],
    };
  },
  watch: {
    sidoOption(newOption) {
      this.updateGuguns(newOption);
    },
  },
  async created() {
    this.updateGuguns(this.sidoOption);
    this.initAttractions();
    this.allSelected = true;
  },
  computed: {
    allSelected: {
      //getter
      get: function () {
        return this.allTypes.length === this.selectedTypes.length;
      },
      //setter allSelected 속성이 변경되었을 때 호출되며, 인자 e는 새로운 allSelected 값
      set: function (e) {
        this.selectedTypes = e ? this.allTypes.map((item) => item.code) : [];
      },
    },
  },
  methods: {
    async updateGuguns(option) {
      if (option == "0") {
        this.guguns = [{ text: "전체", value: "0" }];
        this.gugunOption = this.guguns[0].value;
      } else {
        const response = await axios.get(
          `http://localhost:8080/locations/search/gugun?sido=${option}`
        );
        console.log(response.data.result);
        this.guguns = response.data.result;
        this.gugunOption = this.guguns[0].value;
      }
    },
    async initAttractions() {
      const response = await axios.get(
        `http://localhost:8080/locations?page=${this.page}&pageSize=${this.pageSize}`
      );
      this.attractions = response.data.result;
      this.$emit("attractions-updated", this.attractions);
    },

    async selectAllAttractions() {
      const selectedTypeCodes = this.selectedTypes
        .filter((code) => !!code)
        .join(",");

      console.log(this.keyword);
      const response = await axios.get(
        `http://localhost:8080/locations/search?keyword=${this.keyword}&sido=${this.sidoOption}&gugun=${this.gugunOption}&page=${this.page}&pageSize=${this.pageSize}&contentType=${selectedTypeCodes}`
      );
      this.attractions = response.data.result;
      this.$emit("attractions-updated", this.attractions);
    },

    // 스크롤 이벤트 핸들러
    handleScroll() {
      const container = this.$refs.scrollContainer;
      const scrollBottom =
        container.scrollHeight - container.clientHeight - container.scrollTop;

      // 스크롤이 맨 아래에 도달했을 때 추가 데이터 요청
      if (scrollBottom <= 0) {
        this.fetchAdditionalData();
      }
    },
    async fetchAdditionalData() {
      try {
        this.page++; // 다음 페이지로 이동
        const response = await axios.get(
          `http://localhost:8080/locations?page=${this.page}&pageSize=${this.pageSize}`
        );
        const additionalData = response.data.result;
        this.attractions = [...this.attractions, ...additionalData];
        this.$emit("attractions-updated", this.attractions);
      } catch (error) {
        console.error("Failed to fetch additional data:", error);
      }
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.plannerCreate-button {
  display: flex;
  justify-content: center;
  background-color: #69beee;
  width: 500px;
  margin-top: 20px;
  margin-left: 45px;
  height: 60px;
  border-radius: 15px;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}
.plannerCreate-button:hover {
  background-color: #49c46f;
  transition: 0.5s;
}
.plannerCreate-button:active {
  background-color: #89e7a7;
  transition: 0.5s;
}
.plannerCreate-button:active span {
  color: #4d4d4d;
  transition: 0.5s;
}
.plannerCreate-button:hover img {
  transform: rotate(360deg);
  transition: 0.5s;
}
.plannerCreate-button:hover span {
  transform: scale(1.1);
  transition: 0.5s;
}

.plannerCreate-button img {
  width: 50px;
  height: 50px;
  caret-color: transparent;
  user-select: none;
}

.plannerCreate-button span {
  font-size: 25px;
  /* 폰트 크기 설정 */
  font-family: "CookieRun-Regular";
  color: #ffffff;
  margin: 10px;
  caret-color: transparent;
  user-select: none;
}

.like-heart {
  margin-top: 5px;
  display: flex;
  /* Flexbox 사용 */
  align-items: center;
  /* 수직 정렬: 요소들을 수직 중앙에 정렬 */
}

.like-heart span {
  margin-right: 3px;
  font-size: 13px;
  /* 폰트 크기 설정 */
  font-family: "CookieRun-Regular";
  color: #757575;
}

.attraction-title {
  margin-top: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.attraction-title span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 18px;
  /* 폰트 크기 설정 */
  font-family: "CookieRun-Black";
  color: #4d4d4d;
}

.attraction-container {
  margin-left: 28px;
  margin-top: 30px;
  margin-right: 28px;
  caret-color: transparent;
  user-select: none;
  cursor: pointer;
  width: 140px;
}

.icon {
  width: 17px;
  margin-left: 3px;
  margin-right: 2px;
}

.attractionImg {
  width: 140px;
  height: 100px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  /* 그림자 스타일 및 값 설정 */
}

.search-container {
  margin-top: 30px;
  justify-content: center;
}

input[type="checkbox"] {
  width: 15px;
  height: 15px;
  border: 3px solid #ff9090;
  /* 원하는 스타일로 설정 */

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
  font-size: 15px;
  /* 폰트 크기 설정 */
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
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
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
  border: 2px solid #c4c4c4;
  /* 테두리 스타일 추가 */
  border-radius: 8px;
  /* 테두리 모서리 둥글게 설정 */
  outline: none;
  /* 포커스 시 테두리 제거 */
  font-size: 15px;
  text-indent: 10px;
  font-family: "CookieRun-Regular";
  color: #757575;

  margin-right: 10px;
  width: 100px;
}

.gugun-dropdown {
  border: 2px solid #c4c4c4;
  /* 테두리 스타일 추가 */
  border-radius: 8px;
  /* 테두리 모서리 둥글게 설정 */
  outline: none;
  /* 포커스 시 테두리 제거 */
  font-size: 15px;
  /* 폰트 크기 설정 */
  text-indent: 10px;
  font-family: "CookieRun-Regular";
  color: #757575;

  margin-right: 20px;
  width: 130px;
}

.input-keyword {
  border: 2px solid #c4c4c4;
  /* 테두리 스타일 추가 */
  border-radius: 8px;
  /* 테두리 모서리 둥글게 설정 */
  outline: none;
  /* 포커스 시 테두리 제거 */
  font-size: 15px;
  /* 폰트 크기 설정 */
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
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.search-button:hover {
  transform: scale(1.1);
  transition: 0.2s;
  background-color: #fc6d6d;
}

.search-button > span {
  margin-top: 3px;
}

.for-scroll::-webkit-scrollbar {
  width: 10px;
  height: 0;
}

.for-scroll::-webkit-scrollbar-thumb {
  background-color: #ffb9b9;
  /* 스크롤바 색상 */
  border-radius: 5px;
  /* 스크롤바 모서리의 곡률 */
}

.for-scroll::-webkit-scrollbar-thumb:active {
  background-color: #fc6d6d;
  /* 스크롤바 색상 */
}

::-webkit-scrollbar-track {
  background-color: #ffffff;
  /* 트랙 배경색 */
}

::-webkit-scrollbar-thumb {
  background-color: transparent;
}

.for-scroll {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: flex-start;
  margin-top: 10px;
  height: 600px;
  width: 600px;
  overflow: scroll;
}
</style>
