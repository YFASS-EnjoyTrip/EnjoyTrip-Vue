<template>
  <div>
    <div class="day-container">1일</div>
    <div class="attraction-list-container">
      <div v-for="(attraction, index) in attractions" :key="index" class="attraction-list">
        <div class="attraction-order">{{index+1}}</div>
        <div class="attraction-img">
          <!-- attracion.imgSrc로 변경 예정 -->
          <img class="attractionImg" src="../../../assets/img/광안대교.jpg" alt="사진" />
        </div>
        <div class="attraction-container">
          <div class="attraction-info">
            <div class="attraction-name">{{ attraction.attractionName }}</div>
            <div class="like-rank-container">
              <img src="../../../assets/img/icon/heart_fill.png" alt="좋아요" />
              <span>{{ attraction.likeCnt }}</span>
              <img src="../../../assets/img/icon/star_fill.png" alt="별점" />
              <span>{{ attraction.rank }}</span>
              <span>{{ attraction.rankCnt }}</span>
            </div>
          </div>
          <div class="attraction-desc">{{ attraction.attractionDesc }}</div>
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
    return {
      attractions: [
        {
          order: 1,
          imgsrc: "",
          attractionName: "광안대교",
          attractionDesc: "상세설명입니다상세설명입니다상세설명상세설명입니다상세설명입니다상세설명입니다상세설명입니다상세설명입니다상세설명입니다입니다상세설명입니다상세설명입니다상세설명입니다상세설명입니다상세설명입니다",
          likeCnt: 10,
          rank: 3.5,
          rankCnt: 30
        }
        // {
        //   order: 1,
        //   imgsrc: "",
        //   attractionName: "광안대교",
        //   attractionDesc: "상세설명입니다",
        //   likeCnt: 10,
        //   rank: 3.5,
        //   rankCnt: 30
        // },
        // {
        //   order: 1,
        //   imgsrc: "",
        //   attractionName: "광안대교",
        //   attractionDesc: "상세설명입니다",
        //   likeCnt: 10,
        //   rank: 3.5,
        //   rankCnt: 30
        // }
      ]
    };
  },
  created() {},
  methods: {}
};
</script>
  
  <style scoped>
  .attraction-list-container{
    display: flex;
    justify-content: center;
  }
.attraction-list {
  background-color: antiquewhite;
  display: flex;
}

img {
  width: 15px;
}

.attractionImg {
  width: 100px;
  height: 70px;
}
.attraction-container{
    width: 400px;
    background-color: #6969697e;
    height: 80px;
    overflow: hidden;
}
.attraction-info {
  display: flex;
}
.attraction-name {
  font-family: "CookieRun-Black";
  font-size: 1.6rem;
  color: #696969;
}
.like-rank-container {
  font-family: "CookieRun-Black";
  font-size: 1rem;
  color: #696969;
  margin-top: 10px;
  margin-left: 10px;
}
.attraction-desc {
  font-family: "CookieRun-Black";
  font-size: 0.8rem;
  color: #696969;
}
</style>
  