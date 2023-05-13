<template>
  <div>
    <div class="comment-in-container">
      <div class="like-rank">
        <img src="../../../assets/img/icon/heart_fill.png" alt="좋아요" />
        <div class="cnt">{{ likeCnt }}</div>
        <img
          src="../../../assets/img/icon/star_fill.png"
          alt="별점"
          class="rank"
        />
        <div class="cnt">{{ rankCnt }}</div>
      </div>
    </div>
    <div class="comment-container">
      <div class="comment-in-container">
        <div>
          <div
            v-for="(comment, index) in comments"
            :key="index"
            class="comment-content-container"
          >
            <div class="comment-nickname">
              {{ comment.userNickname }}
            </div>
            <div class="comment-content">
              {{ comment.content }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AttractionComment",
  components: {},
  data() {
    return {
      likeCnt: 5,
      rankCnt: 3.5,
      comments: [
        {
          userNickname: "닉네임1",
          content:
            "좋아요~~!~!~!!~!!좋아요~~!~!~!!~!!좋아요~~!~!~!!~!!좋아요~~!~!~!!~!!",
        },
        {
          userNickname: "닉네임2",
          content: "싫어요~~!~!~!!~!!",
        },
        {
          userNickname: "닉네임3",
          content: "좋아요~~!~!~!!~!!",
        },
        {
          userNickname: "닉네임2",
          content: "싫어요~~!~!~!!~!!",
        },
        {
          userNickname: "닉네임3",
          content: "좋아요~~!~!~!!~!!",
        },
      ],
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
.comment-container {
  height: 180px;
  overflow: scroll;
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
  margin-top: 10px;
  display: flex;
  /* padding-bottom: 2px; */
}
.rank {
  margin-left: 30px;
}
img {
  margin-right: 10px;
  width: 15px;
}
.cnt {
  font-family: "CookieRun-Bold";
  color: #5f5f5f;
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
.comment-content {
  margin-left: 10px;
  margin-top: 3px;
  font-family: "CookieRun-Regular";
  color: #757575;
  font-size: 0.8rem;
}
</style>
