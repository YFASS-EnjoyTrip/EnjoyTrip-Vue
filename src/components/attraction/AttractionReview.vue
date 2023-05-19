<template>
  <div>
    <div class="comment-in-container">
      <div class="like-rank">
        <div class="cnt main-title">한줄리뷰</div>
        <img
          class="icon-img"
          src="../../assets/img/icon/heart_fill.png"
          alt="좋아요"
        />
        <div class="cnt">301</div>
        <img
          src="../../assets/img/icon/star_fill.png"
          alt="별점"
          class="icon-img"
        />
        <div class="cnt">3.6</div>
        <div class="cnt">300</div>
      </div>
    </div>
    <div class="nickname">댓글 작성하기</div>
    <div class="write-container">
      <textarea
        class="write-input"
        name
        id
        cols="30"
        rows="5"
        v-model="writeContext"
      ></textarea>
    </div>
    <div class="write-button">
      <span>작성</span>
    </div>
    <div class="comment-container">
      <div class="comment-in-container">
        <div>
          <div class="write-comment"></div>
          <div
            v-for="(comment, index) in comments"
            :key="index"
            class="comment-content-container"
          >
            <div class="comment-nickname">
              {{ comment.nickName }}
              <span class="comment-date">
                {{ formatDate(comment.createdAt) }}
              </span>
            </div>
            <div class="comment-content">{{ comment.content }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "AttractionReview",
  components: {},
  data() {
    return {
      comments: [],
      contentId: "",
      writeContext: "",
    };
  },
  created() {
    this.contentId = sessionStorage.getItem("contentId");
    this.loadData();
  },

  methods: {
    async loadData() {
      try {
        const response = await axios.get(
          `http://localhost:8080/locations/detail/${this.contentId}/reviews`
        );

        this.comments = response.data.result;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    formatDate(date) {
      return moment(date).format("YY-MM-DD");
    },
  },
};
</script>

<style scoped>
::-webkit-scrollbar {
  width: 10px;
  height: 0;
}

::-webkit-scrollbar-thumb {
  background-color: #ffe6a1;
  /* 스크롤바 색상 */
  border-radius: 5px;
  /* 스크롤바 모서리의 곡률 */
}

::-webkit-scrollbar-thumb:active {
  background-color: #ffc930;
  /* 스크롤바 색상 */
}

::-webkit-scrollbar-track {
  background-color: transparent;
  /* 트랙 배경색 */
}
.nickname {
  margin-top: 20px;
  margin-left: 40px;
  font-family: "CookieRun-Regular";
  color: #ffbb00;
  font-size: 20px;
}
.write-button {
  margin-left: 340px;
  text-align: center;
  margin-top: 10px;
  width: 80px;
  height: 35px;
  background-color: #ffc930;
  border-radius: 8px;
  box-shadow: 0px 2px 2px 1px rgba(103, 103, 103, 0.315);
  cursor: pointer;
}
.write-button span {
  font-family: "CookieRun-Regular";
  color: #404040;
  font-size: 20px;
}
.write-button:hover {
  background-color: #ffbe0d;
  box-shadow: inset 0px 2px 2px 1px rgba(103, 103, 103, 0.315);
}
.write-button:active {
  background-color: #ffda75;
  transform: scale(0.9);
  transition: 0.2s;
}
.write-input {
  margin-left: 3px;
  margin-top: 3px;
  padding-left: 10px;
  font-family: "CookieRun-Regular";
  color: #6b6b6b;
  font-size: 20px;
  height: 100px;
  border: 0;
  outline-color: #fe6b8b00;
}
.write-container {
  margin-top: 10px;
  width: 380px;
  height: 110px;
  background-color: #ffffff;
  border: 2px solid #ffc930;
  margin-left: 35px;
  border-radius: 10px;
  box-shadow: 0px 2px 2px 1px rgba(103, 103, 103, 0.315);
}
.main-title {
  padding-right: 10px;
}
.icon-img {
  width: 25px;
}
.comment-container {
  height: 730px;
  overflow-y: scroll;
}
.comment-in-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.like-rank {
  margin-top: 20px;
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
  font-size: 20px;
  margin-right: 10px;
}
.comment-content-container {
  margin-top: 15px;
  width: 380px;
  background-color: #ffffff;
  border: 2px solid #ffc930;
  border-radius: 10px;
  box-shadow: 0px 2px 2px 1px rgba(103, 103, 103, 0.315);
}
.comment-content-container:hover {
  background-color: #fff1c9;
  transition: 0.2s;
}
.comment-nickname {
  margin-left: 10px;
  margin-top: 3px;
  font-family: "CookieRun-Regular";
  color: #aaaaaa;
  font-size: 15px;
  margin-top: 10px;
}

.comment-date {
  margin-left: auto;
}
.comment-content {
  margin-left: 10px;
  margin-top: 3px;
  font-family: "CookieRun-Bold";
  color: #757575;
  font-size: 20px;
  margin-bottom: 10px;
}
</style>
