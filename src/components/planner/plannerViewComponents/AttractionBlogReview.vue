<template>
  <div>
    <div class="comment-in-container">
      <div class="like-rank"><span>블로그리뷰</span></div>
    </div>
    <div class="comment-container">
      <div class="comment-in-container">
        <div>
          <div
            v-for="(review, index) in reviews"
            :key="index"
            class="comment-content-container"
          >
            <a :href="'//' + review.blogUrl" style="text-decoration: none">
              <div class="comment-nickname">
                {{ review.userNickname }} <span>{{ review.blogName }}</span>
              </div>
              <div class="comment-content">
                {{ review.content }}
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AttractionBlogReview",
  components: {},
  data() {
    return {
      likeCnt: 5,
      rankCnt: 3.5,
      reviews: [
        {
          userNickname: "닉네임1",
          blogName: "지영블로그~~",
          blogUrl: "www.naver.com",
          content:
            "좋아요~~!~!~!!~!!좋아요~~!~!~!!~!!좋아요~~!~!~!!~!!좋아요~~!~!~!!~!!",
        },
        {
          userNickname: "닉네임1",
          blogName: "지영블로그~~",
          blogUrl: "www.naver.com",
          content:
            "좋아요~~!~!~!!~!!좋아요~~!~!~!!~!!좋아요~~!~!~!!~!!좋아요~~!~!~!!~!!",
        },
        {
          userNickname: "닉네임1",
          blogName: "지영블로그~~",
          blogUrl: "www.naver.com",
          content:
            "좋아요~~!~!~!!~!!좋아요~~!~!~!!~!!좋아요~~!~!~!!~!!좋아요~~!~!~!!~!!",
        },
        {
          userNickname: "닉네임1",
          blogName: "지영블로그~~",
          blogUrl: "www.naver.com",
          content:
            "좋아요~~!~!~!!~!!좋아요~~!~!~!!~!!좋아요~~!~!~!!~!!좋아요~~!~!~!!~!!",
        },
      ],
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
.like-rank > span {
  font-family: "CookieRun-Regular";
  color: #353535;
  font-size: 0.8rem;
}
.comment-container {
  height: 175px;
  overflow: scroll;
  scrollbar-width: thin;
}
.comment-container::-webkit-scrollbar {
  width: 0px;
}
.comment-in-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.like-rank {
  margin-top: 5px;
  display: flex;
  padding-bottom: 2px;
}
.rank {
  margin-left: 30px;
}
img {
  margin-right: 10px;
  width: 15px;
}
.cnt {
  font-family: "CookieRun-Regular";
  color: #353535;
  font-size: 0.7rem;
}
.comment-content-container {
  margin-top: 5px;
  width: 230px;
  background-color: #ffffff;
  border: 1px solid #ffc930;
  border-radius: 10px;
}
.comment-nickname {
  margin-left: 10px;
  margin-top: 3px;
  font-family: "CookieRun-Regular";
  color: #aaaaaa;
  font-size: 0.8rem;
}
.comment-nickname > span {
  margin-left: 10px;
  font-size: 0.6rem;
}
.comment-content {
  margin-left: 10px;
  margin-top: 3px;
  font-family: "CookieRun-Regular";
  color: #757575;
  font-size: 0.8rem;
}
</style>
