<template>
  <div class="planner-attraction-detail-container">
    <div class="attraction-desc">
      <div>
        <img
          src="../../../assets/img/광안대교.jpg"
          alt="관광지사진"
          class="attraction-img"
        />
      </div>
      <div class="attraction-text">
        <div class="attraction-title">
          {{ attractionName }}
        </div>
        <div class="attraction-detail">
          {{ attractionDetail }}
        </div>
      </div>
    </div>
    <div class="review-container">
      <div class="attraction-review">
        <div class="comment">
          <div>
            <AttractionComment></AttractionComment>
          </div>
        </div>
        <div class="blog">
          <AttractionBlogReview></AttractionBlogReview>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AttractionComment from "../plannerViewComponents/AttractionComment.vue";
import AttractionBlogReview from "../plannerViewComponents/AttractionBlogReview.vue";
export default {
  name: "PlannerAttractionDetail",
  components: { AttractionComment, AttractionBlogReview },
  data() {
    return {
      attractionName: "광안대교",
      attractionDetail:
        "상세설명입니다상세설명입니다상세설명입니다상세설명입니다상세설명입니다상세설명입니다상세설명입니다상세설명입니다",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
.attraction-desc {
  display: flex;
  margin-top: 20px;
  margin-left: 30px;
}
.attraction-img {
  width: 160px;
  height: 100px;
  border-radius: 10px;
  /* border: 1px solid #ffc930; */
}
.attraction-text {
  margin-left: 20px;
}
.attraction-title {
  font-family: "CookieRun-Regular";
  color: #4d4d4d;
  font-size: 1.5rem;
}
.attraction-detail {
  margin-top: 5px;
  font-family: "CookieRun-Regular";
  color: #757575;
  font-size: 0.8rem;
  width: 19.5rem;
  height: 4rem;
  background-color: rgba(250, 235, 215, 0);
  overflow: hidden;
}
.review-container {
  display: flex;
  justify-content: center;
}
.attraction-review {
  width: 500px;
  height: 180px;
  display: flex;
}
.comment {
  width: 250px;
  height: 180px;
}
.blog {
  width: 250px;
  height: 180px;
}
</style>
