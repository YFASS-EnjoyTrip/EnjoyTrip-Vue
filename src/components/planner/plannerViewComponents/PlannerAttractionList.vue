<template>
  <div>
    <div class="outer-container">
      <div class="attraction-list-container">
        <div
          v-for="(attraction, index) in attractions[selectedDay - 1]"
          :key="index"
          class="attraction-list"
          @click="handleAttractionClick(attraction)"
        >
          <div class="attraction-order">{{ index + 1 }}</div>
          <div class="attraction-img">
            <!-- attracion.imgSrc로 변경 예정 -->
            <img class="attractionImg" :src="attraction.image" alt="사진" />
          </div>
          <div class="attraction-container">
            <div class="attraction-info">
              <div class="attraction-name">{{ attraction.title }}</div>
              <div class="like-rank-container">
                <div>
                  <span>
                    <img src="../../../assets/img/icon/heart_fill.png" alt="좋아요" />
                    <span>({{ attraction.likeCount }})</span>
                  </span>
                  <span>
                    <img src="../../../assets/img/icon/star_fill.png" alt="별점" />
                    <span>{{ attraction.rate }}</span>
                    <span>({{ attraction.likeCount }})</span>
                  </span>
                </div>
              </div>
            </div>
            <!-- <div class="attraction-desc-container">
              <div class="attraction-desc">{{ attraction.overView }}</div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlannerAttractionList",
  components: {},
  data() {
    return {};
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

  created() {},

  methods: {
    handleAttractionClick(attraction) {
      this.$emit("attractionClicked", attraction);
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
  font-family: "CookieRun-Black";
  font-size: 1.1rem;
  color: #fe646f;
  align-items: center;
  margin-top: 1.6em;
  margin-right: 20px;
  margin-left: 20px;
}

.attraction-list {
  background-color: rgb(255, 255, 255);
  display: flex;
  width: 500px;
  height: 80px;
  border: 1px solid #69beee;
  border-radius: 17px;
  margin-top: 10px;
}
.attraction-list:hover {
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
  font-family: "CookieRun-Bold";
  font-size: 1.5rem;
  color: #696969;
}
.like-rank-container {
  font-family: "CookieRun-Bold";
  font-size: 0.9rem;
  color: #8a8a8a;
  margin-top: 5px;
  margin-left: 5%;
}
.like-rank-container > span:nth-child(2) {
  margin-left: 10px;
}
.like-rank-container > span > span {
  margin-left: 5px;
}
.attraction-desc-container {
  height: 50px;
  overflow: scroll;
}
.attraction-desc {
  font-family: "CookieRun-Regular";
  font-size: 0.8rem;
  color: #696969;
}
::-webkit-scrollbar {
  width: 0;
}
</style>
