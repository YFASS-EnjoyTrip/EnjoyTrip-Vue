<template>
  <div>
    <div class="comment-in-container">
      <div class="like-rank">
        <img src="../../assets/img/icon/heart_fill.png" alt="좋아요" />
        <div class="cnt">{{ contentId }}</div>
        <img
          src="../../assets/img/icon/star_fill.png"
          alt="별점"
          class="rank"
        />
        <div class="cnt">3.6</div>
      </div>
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
              <span class="comment-date">{{
                formatDate(comment.createdAt)
              }}</span>
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
import axios from "axios";
import moment from "moment";

export default {
  name: "AttractionReview",
  components: {},
  props: ["contentId"],
  data() {
    return {
      comments: [],
    };
  },
  watch: {
    contentId() {
      this.loadData();
    },
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

.comment-date {
  margin-left: auto;
}
.comment-content {
  margin-left: 10px;
  margin-top: 3px;
  font-family: "CookieRun-Regular";
  color: #757575;
  font-size: 0.8rem;
}
</style>
