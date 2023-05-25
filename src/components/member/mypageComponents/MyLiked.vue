<template>
  <div class="right-container">
    <div class="title-container">
      <span>좋아요 한 여행지</span>
    </div>
    <div class="input-container">
      <select class="sido-dropdown" name="sido" id="location" v-model="sidoOption">
        <option v-for="sido in sidos" :value="sido.value" :key="sido.value">
          {{ sido.text }}
        </option>
      </select>
      <select class="gugun-dropdown" name="gugun" id="location" v-model="gugunOption">
        <option v-for="gugun in guguns" :value="gugun.value" :key="gugun.value">
          {{ gugun.text }}
        </option>
      </select>
      <div class="search-button" @click="searchLikeList">
        <span>검색</span>
      </div>
    </div>
    <div class="attraction-outer-container">
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
            />
            <span>({{ attraction.likeCount }})</span>
            <img class="icon" src="../../../assets/img/icon/star_fill.png" alt="별" />
            <span>{{ calculateRate(attraction) }}</span>
            <span>({{ attraction.totalCount }})</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiAuthInstance } from '@/api';
import axios from 'axios';

const api = apiAuthInstance();
export default {
  components: {},
  data() {
    return {
      // 23.05.16 기본이미지, 페이지네이션 추가
      defaultImage: 'https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/Attraction_default.png',
      page: 1,
      pageSize: 100,
      //
      keyword: '',
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
    try {
      const response = await api.get(`/member/mypage/like?sido=${this.sidoOption}&gugun=${this.gugunOption}`);

      if (response.status === 200) {
        this.attractions = response.data.result;
      }
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    calculateRate(attraction) {
      if (attraction.rate && attraction.totalCount && attraction.totalCount != 0) {
        let rate = attraction.rate / attraction.totalCount;
        return parseFloat(rate.toFixed(1));
      } else {
        return 0;
      }
    },

    async updateGuguns(option) {
      if (option == '0') {
        this.guguns = [{ text: '전체', value: '0' }];
        this.gugunOption = this.guguns[0].value;
      } else {
        const response = await axios.get(`http://localhost:8080/locations/search/gugun?sido=${option}`);
        this.guguns = response.data.result;
        this.gugunOption = this.guguns[0].value;
      }
    },
    goToAttractionDetail(attraction) {
      sessionStorage.setItem('contentId', attraction.contentId);
      sessionStorage.setItem('contentTitle', attraction.title);
      this.$router.push({
        name: 'attractionDetail',
      });
    },

    async searchLikeList() {
      try {
        const response = await api.get(`/member/mypage/like?sido=${this.sidoOption}&gugun=${this.gugunOption}`);

        if (response.status === 200) {
          this.attractions = response.data.result;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
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

.attraction-title span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 18px;
  /* 폰트 크기 설정 */
  font-family: 'CookieRun-Bold';
  color: #4d4d4d;
}

.attraction-title {
  margin-top: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.icon {
  width: 17px;
  margin-left: 3px;
  margin-right: 2px;
}

.attractionImg:hover {
  transform: scale(1.1);
  filter: brightness(60%);
  transition: 0.2s;
}

.attractionImg:active {
  transform: scale(0.9);
  transition: 0.2s;
}

.attractionImg {
  width: 140px;
  height: 100px;
  border-radius: 10px;
  box-shadow: 2px 4px 5px rgba(85, 85, 85, 0.5);
  /* 그림자 스타일 및 값 설정 */
}

.search-button {
  display: flex;
  justify-content: center;
  width: 70px;
  height: 30px;
  border-radius: 5px;
  background-color: #f24849;
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
  background-color: #da4343;
}

.search-button:active {
  transform: scale(0.9);
  transition: 0.2s;
}

.search-button > span {
  margin-top: 3px;
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

.input-container {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}

.attraction-container {
  margin-left: 10px;
  margin-top: 30px;
  margin-right: 10px;
  caret-color: transparent;
  user-select: none;
  cursor: pointer;
  width: 140px;
  height: max-content;
}

.attraction-outer-container {
  width: 490px;
  margin-top: 20px;
  border-radius: 18px;
  overflow: scroll;
  display: flex;
  flex-wrap: wrap;
  margin-left: 50px;
  background-color: #ffffff;
  padding-left: 10px;
  padding-bottom: 30px;
  height: 580px;
}

.attraction-outer-container::-webkit-scrollbar {
  width: 10px;
  height: 0;
}

.attraction-outer-container::-webkit-scrollbar-thumb {
  background-color: #ffb9b9;
  /* 스크롤바 색상 */
  border-radius: 5px;
  /* 스크롤바 모서리의 곡률 */
}

.attraction-outer-container::-webkit-scrollbar-thumb:active {
  background-color: #fc6d6d;
  /* 스크롤바 색상 */
}

.right-container {
  width: 600px;
  height: 800px;
  border-radius: 0px 90px 90px 0px;
  background-color: #ffdede;
}

.title-container {
  margin-top: 30px;
  margin-left: 40px;
  font-family: 'CookieRun-Bold';
  color: #383838;
  font-size: 30px;
  margin-bottom: -30px;
  caret-color: transparent;
  user-select: none;
  pointer-events: none;
}
</style>
