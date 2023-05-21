<template>
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
              :src="
              attraction.isLike
                ? 'https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/heart_fill.png'
                : 'https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/heart_empty.png'
            "
              alt="하트"
            />
            <span>({{ attraction.likeCount }})</span>
            <img class="icon" src="@/assets/img/icon/star_fill.png" alt="별" />
            <span>{{ attraction.rank }}</span>
            <span>({{ attraction.rankCnt }})</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { apiInstance } from '@/api/index.js';

const api = apiInstance();

export default {
  name: 'PlannerAttractionAdd',
  components: {},
  data() {
    return {
      attractions: [],
      page: 1,
      pageSize: 50,
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
    handleAttractionClick2(attraction) {
      if (window.confirm('플래너에 추가하시겠습니까?')) {
        this.$emit('attractionClicked2', attraction);
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
