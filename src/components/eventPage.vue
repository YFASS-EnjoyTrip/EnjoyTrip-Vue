<template>
  <div class="container">
    <div class="plannerCreate-text">{{ this.user.nickname }} 님의 쿠폰이 발급되었습니다</div>
    <transition name="bounce">
      <div>
        <div class="img-container">
          <img src="../assets/img/ticket.png" alt="티켓" />
        </div>
        <div class="text-container">
          <div>
            <div class="ticket-top">
              <div v-if="loading" class="modal">
                <div class="modal-content">
                  <img class="gif" :src="gachapon" alt="여행뽑기" />
                  <div class="modal-text">
                    두구두구두구두구두구두구두구두구두구두구두구
                  </div>
                </div>
              </div>
              <div class="nickname">
                <span>{{ this.user.nickname }} 님의</span>
              </div>
              <div class="ticket-title">
                <span>이벤트 쿠폰</span>
              </div>
            </div>
            <div class="ticket-bottom">
              <span>
                대전 6반 화이팅!!
                <br />2학기에 또 만나요~!~!!!~~!!
              </span>
            </div>
          </div>
          <div class="ticket-right">
            <div class="side-title">-❤️❤️❤️-</div>
            <div class="info">
              <div>
                <div class="info-title">이름</div>
                <div class="info-value">{{ this.user.nickname }}</div>
              </div>
              <div class="locationInfo">
                <div class="info-title">지역</div>
                <div class="info-value">대전</div>
              </div>
              <div class="dateInfo">
                <div class="info-title">반</div>
                <div class="info-value">06</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="confirm-container">
      <div class="confirm-text">
        <span>
          <span>{{ this.user.nickname }}</span>
          님 한학기동안 감사했습니다!!!!!
        </span>
      </div>
    </div>
    <div class="confirm-button">
      <div class="button submit" @click="createaPlan">뽑기</div>
    </div>
  </div>
</template>
  <script>
import { mapGetters } from 'vuex';

const memberStore = 'memberStore';

export default {
  name: 'PlannerCreate',
  components: {},
  computed: {
    ...mapGetters(memberStore, ['checkUserInfo']),
    user() {
      return (
        this.checkUserInfo || {
          nickname: '',
          profileImg: '',
          bio: '',
        }
      );
    },
  },
  data() {
    return {
      gachapon: 'https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/IMG_0332.GIF',
      loading: false,
    };
  },
  methods: {
    createaPlan() {
      // 로딩 gif 표시를 위한 데이터 프로퍼티
      this.loading = true;

      setTimeout(() => {
        this.loading = false;

        this.$router.push({
          name: 'eventresult',
        });
      }, 4000); // 4초 후에 실행
    },
  },
};
</script>
  
<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.7s;
}
.bounce-leave-active {
  animation: bounce-in 0.7s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}
.plannerCreate-text {
  text-align: center;
  margin-top: 60px;
  margin-bottom: 10px;
  font-size: 30px;
  font-family: 'CookieRun-Regular';
  color: #494949;
  width: 700px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  background-color: #e6e6e6;
  caret-color: transparent;
  user-select: none;
  pointer-events: none;
  border-radius: 10px;
}
.button {
  width: 200px;
  margin-right: 40px;
  margin-left: 40px;
  height: 60px;
  font-size: 40px;
  font-family: 'CookieRun-Regular';
  color: #ffffff;
  text-align: center;
  padding-top: 5px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(68, 68, 68, 0.5);
}
.cancel {
  background-color: #8f8f8f;
}
.submit {
  background-color: #69beee;
}
.submit:hover {
  background-color: #4ba0d1;
  box-shadow: inset 0 2px 4px rgba(68, 68, 68, 0.5);
}
.submit:active {
  background-color: #9edbfc;
  color: #3a3a3a;
  transition: 0.3s;
}
.cancel:hover {
  box-shadow: inset 0 2px 4px rgba(68, 68, 68, 0.5);
  background-color: #858585;
}
.cancel:active {
  background-color: #c4c4c4;
  color: #3a3a3a;
  transition: 0.3s;
}
.confirm-text > span > span {
  color: #69beee;
}
.confirm-text {
  text-align: center;
  margin-top: -30px;
  caret-color: transparent;
  user-select: none;
  pointer-events: none;
}
.confirm-text span {
  font-size: 50px;
  font-family: 'CookieRun-Regular';
  color: #8d8d8d;
}
.confirm-container {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
.confirm-button {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  caret-color: transparent;
  user-select: none;
  cursor: pointer;
}
.info-value + .end {
  margin-top: -20px;
}
.info-title {
  margin-bottom: 10px;
  font-size: 20px;
  font-family: 'CookieRun-Regular';
  color: #ffe8aa;
}

.info-value {
  margin-bottom: 20px;
  font-size: 20px;
  font-family: 'CookieRun-Regular';
  color: #ffffff;
}

.info {
  padding-top: 20px;
  padding-left: 50px;
}

.side-title {
  padding-top: 30px;
  font-size: 30px;
  font-family: 'CookieRun-Bold';
  color: #292929;
  text-align: center;
}
.nickname {
  font-family: 'CookieRun-Regular';
  color: #fff0c7;
  font-size: 1.5rem;
  padding-top: 32px;
  margin-bottom: -10px;
}

.ticket-title {
  font-family: 'CookieRun-Black';
  color: #3a3a3a;
  font-size: 3rem;
}

.container {
  margin: auto;
  width: 1200px;
  height: 800px;
  border-radius: 90px;
}

.img-container {
  display: flex;
  justify-content: center;
  caret-color: transparent;
  user-select: none;
  pointer-events: none;
  width: 1200px;
  margin-top: -30px;
}

.text-container {
  display: flex;
  margin-left: 120px;
  margin-top: -440px;
}

.ticket-top {
  width: 700px;
  height: 190px;
  text-align: center;
  caret-color: transparent;
  user-select: none;
  pointer-events: none;
}
.ticket-bottom span {
  font-family: 'CookieRun-Bold';
  color: #585858;
  font-size: 40px;
}
.ticket-bottom {
  width: 700px;
  height: 190px;
  text-align: center;
  caret-color: transparent;
  user-select: none;
  margin-top: 40px;
}

.ticket-right {
  width: 270px;
  height: 380px;
  caret-color: transparent;
  user-select: none;
  pointer-events: none;
}

.modal {
  /* 모달의 위치를 고정하고 전체 페이지를 덮게 하려면 다음을 사용하세요 */
  position: fixed;
  z-index: 9999; /* 다른 콘텐츠 위에 표시 */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(255, 255, 255, 0.753); /* Black w/ opacity */
}
.gif {
  width: 600px;
  /* height: fit-content; */
}
.modal-text {
  font-family: 'CookieRun-Regular';
  color: #383838;
  font-size: 40px;
  text-align: center;
  border-radius: 30px;
}
.modal-text span {
  color: #30b2fd;
}
.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1000px;
  border-radius: 60px;
}
</style>
  