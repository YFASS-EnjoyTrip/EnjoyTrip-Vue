<template>
  <div class="planner-attraction-detail-container">
    <div class="attraction-desc">
      <div>
        <img :src="attraction.image || defaultImage" alt="관광지사진" class="attraction-img" />
      </div>
      <div class="attraction-text">
        <div class="attraction-title">
          {{ attraction.title }}
        </div>
        <div class="attraction-detail">
          {{ attraction.overView }}
        </div>
      </div>
    </div>
    <div class="review-container">
      <div class="attraction-review">
        <div class="comment">
          <div>
            <AttractionComment :attraction="attraction"></AttractionComment>
          </div>
        </div>
        <div class="blog">
          <AttractionBlogReview :attraction="attraction"></AttractionBlogReview>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AttractionComment from '../plannerViewComponents/AttractionComment.vue';
import AttractionBlogReview from '../plannerViewComponents/AttractionBlogReview.vue';

export default {
  name: 'PlannerAttractionDetail',
  components: { AttractionComment, AttractionBlogReview },
  data() {
    return {
      attraction: {},
      defaultImage: 'https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/Attraction_default.png',
    };
  },

  created() {},
  methods: {
    setAttraction(attraction) {
      this.attraction = attraction;
    },
  },
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
  border: 3px solid #888888;
}
.attraction-text {
  margin-left: 20px;
}
.attraction-title {
  font-family: 'CookieRun-Bold';
  color: #4d4d4d;
  font-size: 1.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.attraction-detail {
  margin-top: 5px;
  font-family: 'CookieRun-Regular';
  color: #757575;
  font-size: 0.8rem;
  width: 19.5rem;
  height: 4.5rem;
  background-color: rgba(250, 235, 215, 0);
  overflow: scroll;
}
.attraction-detail::-webkit-scrollbar {
  width: 0;
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
