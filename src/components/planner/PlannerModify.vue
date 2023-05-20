<template>
  <div>
    <div class="outer-container">
      <div class="attraction-list-container">
        <draggable v-model="localAttractions" class="attraction-list" :move="checkMove" @end="updateAttractions">
          <div v-for="(attraction, index) in localAttractions" :key="index" class="attraction-list-item">
            <!-- 드래그 앤 드롭 기능을 적용할 요소들의 내용 -->
            <div class="attraction-order">{{ index + 1 }}</div>
            <div class="attraction-img">
              <img class="attractionImg" :src="attraction.image || defaultImage" alt="사진" />
            </div>
            <div class="attraction-container">
              <div class="attraction-info">
                <div class="attraction-name">
                  {{ attraction.title }}
                  <div class="like-rank-container">
                    <div class="like-rank-inner">
                      <span>
                        <img src="@/assets/img/icon/heart_fill.png" alt="좋아요" />
                        <span>{{ attraction.likeCount }}</span>
                      </span>
                      <span>
                        <img src="@/assets/img/icon/star_fill.png" alt="별점" />
                        <span>{{ attraction.rate }}</span>
                        <span>({{ attraction.likeCount }})</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: 'PlannerAttractionList',
  components: {
    draggable,
  },
  data() {
    return {
      defaultImage: 'https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/Attraction_default.png',
      localAttractions: [],
    };
  },
  props: {
    selectedDay: {
      type: Number,
      required: true,
    },
    attractions: {
      type: Array,
      required: true,
    },
  },
  watch: {
    selectedDay() {
      this.initializeLocalAttractions();
    },
  },

  created() {
    this.initializeLocalAttractions();
  },

  methods: {
    initializeLocalAttractions() {
      this.localAttractions = [...this.attractions[this.selectedDay - 1]];
    },

    handleAttractionClick(attraction) {
      this.$emit('attractionClicked', attraction);
    },
    checkMove() {
      return true;
    },
    updateAttractions() {
      //   this.localAttractions = [...this.localAttractions];
      this.$emit('attractionClicked', this.localAttractions);
      console.log(this.localAttractions);
    },
  },
};
</script>

<style scoped>
.outer-container {
  display: flex;
  justify-content: center;
}
.attraction-order {
  font-family: 'CookieRun-Black';
  font-size: 1.1rem;
  color: #fe646f;
  align-items: center;
  margin-top: 1.6em;
  margin-right: 20px;
  margin-left: 20px;
}

.attraction-list {
  /* background-color: rgb(255, 255, 255);
  display: flex;
  width: 500px;
  height: 80px;
  border: 1px solid #69beee;
  border-radius: 17px;
  margin-top: 10px; */
}
.attraction-list-item {
  background-color: rgb(255, 255, 255);
  display: flex;
  width: 500px;
  height: 80px;
  border: 1px solid #69beee;
  border-radius: 17px;
  margin-top: 10px;
}

.attraction-list-item:hover {
  background-color: #fff3f4;
  border: 1px solid #fe646f;
  transition: 0.2s;
  cursor: pointer;
}
.attraction-list:hover .attraction-name {
  color: #fe646f;
  transition: 0.2s;
}

img {
  width: 15px;
  margin-top: 5px;
}

.attractionImg {
  width: 100px;
  height: 70px;
  border-radius: 10px;
}
.attraction-list-container {
  display: flex;
}
.attraction-container {
  width: 330px;
  height: 4.5rem;
  margin-left: 10px;
  margin-top: 5px;
}

.attraction-info {
  display: flex;
  overflow: hidden;
}
.attraction-name {
  font-family: 'CookieRun-Bold';
  font-size: 1.5rem;
  color: #696969;
  white-space: nowrap; /* 줄 바꿈 방지 */
  overflow: hidden; /* 넘친 부분 감추기 */
  text-overflow: ellipsis; /* 생략 부호 표시 */
}

.like-rank-container {
  font-family: 'CookieRun-Bold';
  font-size: 0.9rem;
  color: #8a8a8a;
  height: 30px;
  position: relative;
}

.like-rank-inner {
  display: flex;
  align-items: center;
  margin-top: 5px;
}

.attraction-desc-container {
  height: 50px;
  overflow: scroll;
}
.attraction-desc {
  font-family: 'CookieRun-Regular';
  font-size: 0.8rem;
  color: #696969;
}
::-webkit-scrollbar {
  width: 0;
}
</style>
