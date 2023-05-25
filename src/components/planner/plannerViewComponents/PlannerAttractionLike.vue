<template>
  <div class="planner-attraction-like-container">
    <div class="like-header">
      <span>내가 좋아요한 관광지</span>
    </div>
    <div class="add-item-container">
      <div class="attraction-container" v-for="(attraction, index) in attractions" :key="index">
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
              :src="
                attraction.isLike
                  ? 'https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/heart_fill.png'
                  : 'https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/heart_empty.png'
              "
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
import { apiAuthInstance } from '@/api';

const api = apiAuthInstance();
export default {
  name: 'PlannerAttractionLike',
  data() {
    return {
      attractions: [],
      defaultImage: 'https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/Attraction_default.png',
    };
  },
  props: {
    sidoCode: {
      type: Number,
      require: true,
    },
  },

  async created() {
    try {
      const response = await api.get(`/member/mypage/like?sido=${this.sidoCode}`);
      this.attractions = response.data.result;
      console.log(this.attractions);
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
  },
};
</script>

<style scoped>
.like-header {
  font-family: 'CookieRun-Regular';
  color: #383838;
  font-size: 20px;
  text-align: center;
  padding-top: 10px;
}
.add-item-container {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  overflow: scroll;
  height: 280px;
  margin-left: -25px;
}
.attraction-container {
  margin-left: 20px;
  margin-top: 15px;
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
