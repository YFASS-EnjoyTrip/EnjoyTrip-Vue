<template>
  <div>
    <div class="comment-in-container">
      <div class="like-rank">
        <div class="cnt main-title">한줄리뷰</div>
        <img class="icon-img" src="../../assets/img/icon/heart_fill.png" alt="좋아요" />
        <div class="cnt">{{ attraction.likeCount }}</div>
        <img src="../../assets/img/icon/star_fill.png" alt="별점" class="icon-img" />
        <div class="cnt">{{ calculateRate }}</div>
        <div class="cnt">({{ attraction.totalCount }})</div>
      </div>
    </div>
    <div class="nickname">
      댓글 작성하기
      <div class="rating">
        <span v-for="index in 5" :key="index" @click="setRating(index)">
          <img
            :src="
              index <= rating ? require('@/assets/img/icon/star_fill.png') : require('@/assets/img/icon/star_empty.png')
            "
            class="icon"
            alt="star"
          />
        </span>
      </div>
    </div>
    <div class="write-container">
      <textarea
        class="write-input"
        name
        id
        cols="30"
        rows="5"
        v-model="writeContext"
        :disabled="hasWrittenComment"
      ></textarea>
    </div>
    <div class="write-button" @click="submitComment()">
      <span>작성</span>
    </div>
    <div class="comment-container">
      <div class="comment-in-container">
        <div>
          <div v-for="(comment, index) in comments" :key="index" class="comment-content-container">
            <div class="comment-nickname">
              {{ comment.nickName }}
              <span class="comment-date">{{ formatDate(comment.createdAt) }}</span>
              <img
                v-for="index in parseInt(comment.rate)"
                :key="index"
                :src="require('@/assets/img/icon/star_fill.png')"
                class="icon2"
                alt="star"
              />
              <div class="delete-button" v-if="comment.memberId == memberId" @click="deleteComment(comment)">삭제</div>
            </div>
            <div class="comment-content">{{ comment.content }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiInstance, apiAuthInstance } from '@/api';
import { mapGetters } from 'vuex';
import moment from 'moment';

const api = apiInstance();
const apiAuth = apiAuthInstance();

export default {
  name: 'AttractionReview',
  components: {},
  data() {
    return {
      rating: 3,
      comments: [],
      memberId: '',
      contentId: '',
      writeContext: '',
      localAttraction: '',
    };
  },

  props: {
    attraction: {
      type: Object,
      require: true,
    },
  },

  computed: {
    ...mapGetters('memberStore', ['checkIsLogin', 'checkUserInfo']),

    calculateRate() {
      if (this.localAttraction.rate && this.localAttraction.totalCount && this.localAttraction.totalCount != 0) {
        let rate = this.localAttraction.rate / this.localAttraction.totalCount;
        return parseFloat(rate.toFixed(1));
      } else {
        return 0;
      }
    },

    hasWrittenComment() {
      return this.comments.some((comment) => comment.memberId == this.memberId);
    },
  },

  created() {
    this.contentId = sessionStorage.getItem('contentId');
    if (this.checkUserInfo && this.checkIsLogin) {
      this.memberId = this.checkUserInfo.memberId;
    }
    this.localAttraction = this.attraction;
    this.loadData();
  },

  methods: {
    async loadData() {
      try {
        const response = await api.get(`/locations/detail/${this.contentId}/reviews`);

        this.comments = response.data.result;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    formatDate(date) {
      return moment(date).format('YY-MM-DD');
    },

    setRating(rating) {
      this.rating = rating;
    },

    submitComment() {
      if (this.memberId === '') {
        this.$toast.error('로그인이 필요한 서비스입니다!', {
          timeout: 3000,
          position: 'bottom-center',
        });
      } else {
        const commentData = {
          contentId: this.attraction.contentId,
          rate: this.rating,
          content: this.writeContext,
        };

        apiAuth
          .post('/locations/detail/reviews', commentData)
          .then((response) => {
            if (response.status === 201) {
              this.localAttraction.rate += this.rating;
              this.localAttraction.totalCount += 1;

              this.writeContext = '';
              this.rating = 3;

              this.loadData();
            } else {
              console.log('댓글 작성 실패');
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },

    deleteComment(comment) {
      if (window.confirm('댓글을 삭제하시겠습니까?')) {
        apiAuth
          .delete(
            `/locations/detail/reviews?contentId=${comment.contentId}&reviewId=${comment.reviewId}&rate=${comment.rate}`,
          )
          .then((response) => {
            if (response.status === 200) {
              this.loadData();
            } else {
              console.log('댓글 삭제 실패');
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
  },
};
</script>

<style scoped>
.delete-button {
  margin-left: auto;
  margin-right: 20px;
  cursor: pointer;
  color: #e76666;
}
.rating {
  display: flex;
  margin-top: 3px;
  margin-left: 20px;
}

.icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.comment-rate {
}
.icon2 {
  width: 15px;
  height: 15px;
}
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
  display: flex;
  margin-top: 20px;
  margin-left: 40px;
  font-family: 'CookieRun-Regular';
  color: #636363;
  font-size: 20px;
  caret-color: transparent;
  user-select: none;
}
.write-button {
  margin-left: 330px;
  text-align: center;
  margin-top: 10px;
  width: 80px;
  height: 35px;
  background-color: #ffc930;
  border-radius: 8px;
  box-shadow: 0px 2px 2px 1px rgba(103, 103, 103, 0.315);
  cursor: pointer;
  caret-color: transparent;
  user-select: none;
}
.write-button span {
  font-family: 'CookieRun-Regular';
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
  font-family: 'CookieRun-Regular';
  color: #6b6b6b;
  font-size: 20px;
  height: 100px;
  border: 0;
  width: 370px;
}
.write-input:focus {
  border: none;
}
.write-container {
  margin-top: 10px;
  width: 380px;
  height: 110px;
  background-color: #ffffff;
  border: 2px solid #ffc930;
  margin-left: 30px;
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
  caret-color: transparent;
  user-select: none;
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
  font-family: 'CookieRun-Bold';
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
  display: flex;
  margin-left: 10px;
  margin-top: 3px;
  font-family: 'CookieRun-Regular';
  color: #aaaaaa;
  font-size: 15px;
  margin-top: 10px;
}

.comment-date {
  margin-left: 20px;
  margin-right: 10px;
}
.comment-content {
  margin-left: 10px;
  margin-top: 3px;
  font-family: 'CookieRun-Regular';
  color: #3b3b3b;
  font-size: 20px;
  margin-bottom: 10px;
}
</style>
