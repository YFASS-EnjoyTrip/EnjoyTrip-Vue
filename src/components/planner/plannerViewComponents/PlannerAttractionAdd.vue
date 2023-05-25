<template>
  <div>
    <div class="search-container">
      <input
        class="input-keyword"
        type="text"
        v-model="keyword"
        placeholder="검색어를 입력하세요"
        @keyup.enter="handleSearch"
      />
      <div class="search-button" @click="handleSearch">
        <span>검색</span>
      </div>
    </div>
    <div class="add-item-container">
      <div
        class="attraction-container"
        v-for="(attraction, index) in attractions"
        :key="index"
        @click="handleAttractionClick2(attraction)"
      >
        <div class="img-heart">
          <img
            class="attractionImg"
            draggable="false"
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
              :src="'https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/heart_fill.png'"
              alt="하트"
            />
            <span>({{ attraction.likeCount }})</span>
            <img class="icon" src="@/assets/img/icon/star_fill.png" alt="별" />
            <span>{{ calculateRate(attraction) }}</span>
            <span>({{ attraction.totalCount }})</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiInstance } from '@/api/index.js';
import Swal from 'sweetalert2';
const api = apiInstance();

export default {
  name: 'PlannerAttractionAdd',
  components: {},
  data() {
    return {
      attractions: [],
      page: 1,
      pageSize: 50,
      keyword: '',

      defaultImage: 'https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/Attraction_default.png',
      localPlan: [],
    };
  },
  props: {
    sidoCode: {
      type: Number,
      required: true,
    },
  },

  async created() {
    const response = await api.get(
      `/locations/search?sido=${this.sidoCode}&page=${this.page}&pageSize=${this.pageSize}`,
    );
    this.attractions = response.data.result;
  },
  mounted() {},

  methods: {
    calculateRate(attraction) {
      if (attraction.rate && attraction.totalCount && attraction.totalCount != 0) {
        let rate = attraction.rate / attraction.totalCount;
        return parseFloat(rate.toFixed(1));
      } else {
        return 0;
      }
    },
    handleAttractionClick2(attraction) {
      Swal.fire({
        background: '#ffe8a9',
        html: `<img src="https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/capsule_Y.png" style="width:70px" />
        <h2>여행지를 추가하시겠습니까?</h2>`,
        confirmButtonText: '확인',
        confirmButtonColor: '#F24849',
        cancelButtonColor: '#7c7c7c',
        cancelButtonText: '취소',
        showCancelButton: true,
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.$emit('attractionClicked2', attraction);
        }
      });
    },

    async handleSearch() {
      try {
        const response = await api.get(
          `/locations/search?keyword=${this.keyword}&sido=${this.sidoCode}&page=${this.page}&pageSize=${this.pageSize}`,
        );

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
.add-item-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: flex-start;
  margin-top: 10px;
  width: 500px;
}

.search-container {
  display: flex;
  justify-content: center;
}
.input-keyword {
  border: 2px solid #c4c4c4;
  border-radius: 8px;
  outline: none;
  font-size: 15px;
  text-indent: 10px;
  font-family: 'CookieRun-Regular';
  color: #757575;

  margin-top: 10px;
  width: 200px;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}

.search-button {
  display: flex;
  justify-content: center;
  width: 70px;
  height: 30px;

  margin-top: 10px;
  margin-left: 10px;

  border-radius: 5px;
  background-color: #69beee;
  font-family: 'CookieRun-Regular';
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
.attraction-container {
  margin-left: 20px;
  margin-top: 30px;
  margin-right: 20px;
  caret-color: transparent;
  user-select: none;
  cursor: pointer;
  width: 120px;
}
.attractionImg {
  width: 140px;
  height: 100px;
  border-radius: 10px;
  box-shadow: 2px 4px 5px rgba(85, 85, 85, 0.5);
  /* 그림자 스타일 및 값 설정 */
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
  font-family: 'CookieRun-Bold';
  color: #4d4d4d;
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

.icon {
  width: 17px;
  margin-left: 3px;
  margin-right: 2px;
}
</style>
