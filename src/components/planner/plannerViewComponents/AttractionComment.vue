<template>
  <div>
    <div class="comment-in-container">
      <div class="like-rank">
        <img src="../../../assets/img/icon/heart_fill.png" alt="좋아요" />
        <div class="cnt">{{ attraction.likeCount }}</div>
        <img src="@/assets/img/icon/star_fill.png" alt="별점" class="rank" />
        <div class="cnt">{{ attraction.rate }}</div>
      </div>
    </div>
    <div class="comment-container">
      <div class="comment-in-container">
        <div>
          <div v-for="(comment, index) in comments" :key="index" class="comment-content-container">
            <div class="comment-nickname">
              {{ comment.nickName }}
              <span class="comment-date">{{ formatDate(comment.createdAt) }}</span>
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
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'AttractionComment',
  components: {},
  props: {
    attraction: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comments: [],
    };
  },
  watch: {
    attraction: {
      immediate: true,
      handler(newValue) {
        this.fetchComments(newValue);
      },
    },
  },

  created() {
    this.fetchComments();
  },

  methods: {
    formatDate(date) {
      return moment(date).format('YY-MM-DD');
    },

    async fetchComments() {
      const contentId = this.attraction.contentId;
      try {
        const { data } = await axios.get(`http://localhost:8080/locations/detail/${contentId}/reviews`);
        this.comments = data.result;
      } catch (error) {
        console.error('Failed to fetch comment:', error);
      }
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
  height: 15px;
}
.cnt {
  font-family: 'CookieRun-Bold';
  color: #5f5f5f;
  font-size: 15px;
  margin-top: -3px;
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
  font-family: 'CookieRun-Regular';
  color: #aaaaaa;
  font-size: 0.8rem;
}

.comment-date {
  margin-left: auto;
}
.comment-content {
  margin-left: 10px;
  margin-top: 3px;
  font-family: 'CookieRun-Regular';
  color: #515151;
  font-size: 15px;
}
</style>
