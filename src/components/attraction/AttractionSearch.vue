<template>
  <div>
    <div class="search-container">
      <div class="input-container">
        <select class="sido-dropdown" name="sido" id="location" v-model="sidoOption">
          <option v-for="sido in sidos" :value="sido.value" :key="sido.value">{{ sido.text }}</option>
        </select>
        <select class="gugun-dropdown" name="gugun" id="location" v-model="gugunOption">
          <option v-for="gugun in guguns" :value="gugun.value" :key="gugun.value">{{ gugun.text }}</option>
        </select>
        <input
          class="input-keyword"
          type="text"
          v-model="keyword"
          @keyup.enter="selectAllAttractions"
          placeholder="관광지, 지역"
        />
        <div class="search-button" @click="selectAllAttractions">
          <span>검색</span>
        </div>
      </div>
      <div class="checkbox-outer-container">
        <div class="checkbox-container">
          <input type="checkbox" name="types" id="all" value="all" v-model="allSelected" />
          <label for="all">
            <span>전체</span>
          </label>
          <div v-for="(item, index) in allTypes" :key="index">
            <div>
              <input type="checkbox" name="types" :id="item.code" :value="item.code" v-model="selectedTypes" />
              <label :for="item.code">
                <span>{{ item.name }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="for-scroll" ref="scrollContainer" @scroll="handleScroll">
      <div class="attraction-container" v-for="(attraction, index) in attractions" :key="index">
        <div class="img-heart">
          <img
            class="attractionImg"
            :src="attraction.image || defaultImage"
            :alt="attraction.title"
            @click="goToAttractionDetail(attraction)"
          />
        </div>
        <div class="attraction-info">
          <div class="attraction-title">
            <span>{{ attraction.title }}</span>
          </div>
          <div class="like-heart">
            <img
              class="icon"
              src="https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/heart_fill.png"
              alt="하트"
              @click="clickedLike(attraction, index)"
            />
            <span>{{ attraction.likeCount }}</span>
            <img class="icon" src="../../assets/img/icon/star_fill.png" alt="별" />
            <span>{{ calculateRate(attraction) }}</span>
            <span>({{ attraction.totalCount }})</span>
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
import { apiInstance, apiAuthInstance } from '@/api';

const apiAuth = apiAuthInstance();
const api = apiInstance();

export default {
  name: 'AttractionSearch',
  props: {
    bounds: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      // 23.05.16 기본이미지, 페이지네이션 추가
      defaultImage: 'https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/Attraction_default.png',
      page: 1,
      pageSize: 50,
      //
      keyword: null,
      sidoOption: '0',
      gugunOption: '',
      sidos: [
        { value: '0', text: '전체' },
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
      guguns: [],
      allTypes: [
        { code: '15', name: '행사' },
        { code: ['12', '14', '28'], name: '관광지' },
        { code: '39', name: '맛집' },
        { code: '32', name: '숙소' },
      ],
      selectedTypes: [],
      attractions: [],
    };
  },
  watch: {
    bounds: {
      deep: true,
      handler(newBounds) {
        this.fetchAttractionsWithBounds(newBounds);
      },
    },
    sidoOption(newOption) {
      this.updateGuguns(newOption);
    },
  },
  async created() {
    this.keyword = sessionStorage.getItem('keyword');

    this.updateGuguns(this.sidoOption);
    this.allSelected = true;

    if (this.keyword === null) {
      this.initAttractions();
    } else {
      this.selectAllAttractions();
      sessionStorage.removeItem('keyword');
    }
  },
  computed: {
    allSelected: {
      get: function () {
        return this.allTypes.length === this.selectedTypes.length;
      },
      set: function (e) {
        this.selectedTypes = e ? this.allTypes.map((item) => item.code) : [];
      },
    },
  },
  methods: {
    async updateGuguns(option) {
      if (option == '0') {
        this.guguns = [{ text: '전체', value: '0' }];
        this.gugunOption = this.guguns[0].value;
      } else {
        const response = await api.get(`/locations/search/gugun?sido=${option}`);
        this.guguns = response.data.result;
        this.gugunOption = this.guguns[0].value;
      }
    },

    async initAttractions() {
      const response = await api.get(`/locations?page=${this.page}&pageSize=${this.pageSize}`);
      this.attractions = response.data.result;
      this.$emit('attractions-updated', this.attractions);
    },

    calculateRate(attraction) {
      if (attraction.rate && attraction.totalCount && attraction.totalCount != 0) {
        let rate = attraction.rate / attraction.totalCount;
        return parseFloat(rate.toFixed(1));
      } else {
        return 0;
      }
    },

    async selectAllAttractions() {
      const selectedTypeCodes = this.selectedTypes.filter((code) => !!code).join(',');

      if (this.keyword == null) this.keyword = '';

      this.page = 1; // 검색하면 page 초기화
      const response = await api.get(
        `/locations/search?keyword=${this.keyword}&sido=${this.sidoOption}&gugun=${this.gugunOption}&page=${this.page}&pageSize=${this.pageSize}&contentType=${selectedTypeCodes}`,
      );
      this.attractions = response.data.result;
      this.$emit('attractions-updated', this.attractions);
    },

    // 좋아요 클릭 이벤트
    async clickedLike(attraction, index) {
      try {
        const response = await apiAuth.post(`/locations/${attraction.contentId}/like`);
        if (response.status === 200) {
          this.attractions[index].likeCount = response.data.result;
        } else {
          console.log('좋아요 요청 실패!');
        }
      } catch (error) {
        console.log(error);
      }
    },

    // 스크롤 이벤트 핸들러
    handleScroll() {
      const container = this.$refs.scrollContainer;
      const scrollBottom = container.scrollHeight - container.clientHeight - container.scrollTop;

      // 스크롤이 맨 아래에 도달했을 때 추가 데이터 요청
      if (scrollBottom <= 3) {
        this.fetchAdditionalData();
      }
    },

    async fetchAdditionalData() {
      try {
        this.page++; // 다음 페이지로 이동
        let url = '';
        const selectedTypeCodes = this.selectedTypes.filter((code) => !!code).join(',');

        // 만약 검색중인 상태라면
        if (this.keyword == null) {
          url = `/locations?page=${this.page}&pageSize=${this.pageSize}`;
        } else {
          url = `/locations/search?keyword=${this.keyword}&sido=${this.sidoOption}&gugun=${this.gugunOption}&page=${this.page}&pageSize=${this.pageSize}&contentType=${selectedTypeCodes}`;
        }
        const response = await api.get(url);
        const additionalData = response.data.result;
        this.attractions = [...this.attractions, ...additionalData];
        this.$emit('attractions-updated', this.attractions);
      } catch (error) {
        console.error('Failed to fetch additional data:', error);
      }
    },

    goToAttractionDetail(attraction) {
      sessionStorage.setItem('contentId', attraction.contentId);
      sessionStorage.setItem('contentTitle', attraction.title);
      this.$router.push({
        name: 'attractionDetail',
      });
    },

    // 23.05.24 범위를 기준으로 검색
    async fetchAttractionsWithBounds(bounds) {
      const selectedTypeCodes = this.selectedTypes.filter((code) => !!code).join(',');

      if (Object.keys(bounds).length) {
        const response = await api.get(`/locations/search/bounds?contentType=${selectedTypeCodes}`, {
          params: {
            northEastLat: bounds.northEast.lat,
            northEastLng: bounds.northEast.lng,
            southWestLat: bounds.southWest.lat,
            southWestLng: bounds.southWest.lng,
          },
        });

        this.attractions = response.data.result;
        this.$emit('attractions-updated', this.attractions);
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
  box-shadow: 0 2px 4px rgba(68, 68, 68, 0.5);
  cursor: pointer;
}
.plannerCreate-button:hover {
  background-color: #49c46f;
  box-shadow: inset 4px 0px 4px rgba(68, 68, 68, 0.5);
  transition: 0.5s;
}
.plannerCreate-button:active {
  background-color: #89e7a7;
  transform: scale(0.95);
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
  font-family: 'CookieRun-Regular';
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
  font-family: 'CookieRun-Regular';
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
  font-family: 'CookieRun-Regular';
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
.img-heart {
  width: 140px;
  height: 100px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 2px 4px 5px rgba(85, 85, 85, 0.5);
}
.attractionImg {
  width: 140px;
  height: 100px;
}
.attractionImg:hover {
  transform: scale(1.1);
  filter: brightness(70%);
  transition: 0.2s;
}

.attractionImg:active {
  transform: scale(0.9);
  transition: 0.2s;
}

.search-container {
  margin-top: 30px;
  justify-content: center;
}

input[type='checkbox'] {
  width: 15px;
  height: 15px;
  display: none;
}

input[type='checkbox'] + label {
  cursor: pointer;
  caret-color: transparent;
  user-select: none;
}

input[type='checkbox'] + label > span {
  margin-left: 5px;
  font-size: 15px;
  font-family: 'CookieRun-Regular';
  color: #646464;
}

/* label:before에 체크하기 전 상태 CSS */
input[type='checkbox'] + label:before {
  content: '';
  display: inline-block;
  width: 17px;
  height: 17px;
  border: 2px solid #acacac;
  box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  vertical-align: middle;
  background-color: #ffffff;
}

/* label:before에 체크 된 상태 CSS */
input[type='checkbox']:checked + label:before {
  content: '';
  background-color: #69beee;
  border-color: #69beee;
  background-repeat: no-repeat;
  background-position: 50%;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.4);
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
  border-radius: 8px;
  outline: none;
  font-size: 15px;
  text-indent: 10px;
  font-family: 'CookieRun-Regular';
  color: #757575;

  margin-right: 10px;
  width: 100px;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}

.gugun-dropdown {
  border: 2px solid #c4c4c4;
  border-radius: 8px;
  outline: none;
  font-size: 15px;
  text-indent: 10px;
  font-family: 'CookieRun-Regular';
  color: #757575;

  margin-right: 20px;
  width: 130px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}

.input-keyword {
  border: 2px solid #c4c4c4;
  border-radius: 8px;
  outline: none;
  font-size: 15px;
  text-indent: 10px;
  font-family: 'CookieRun-Regular';
  color: #757575;

  margin-right: 20px;
  width: 130px;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
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
  background-color: #69beee;
  font-family: 'CookieRun-Bold';
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;
  caret-color: transparent;
  user-select: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.search-button:hover {
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: 0.2s;
  color: #d8d8d8;
  background-color: #3795cc;
}
.search-button:active {
  transform: scale(0.9);
  transition: 0.2s;
}

.search-button > span {
  margin-top: 3px;
}

.for-scroll::-webkit-scrollbar {
  width: 10px;
  height: 0;
}

.for-scroll::-webkit-scrollbar-thumb {
  background-color: #a3d1ec;
  border-radius: 5px;
}

.for-scroll::-webkit-scrollbar-thumb:active {
  background-color: #69beee;
  /* 스크롤바 색상 */
}

::-webkit-scrollbar-track {
  background-color: transparent;
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
