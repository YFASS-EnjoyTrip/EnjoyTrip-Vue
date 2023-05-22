<template>
  <div class="header">
    <nav class="navbar">
      <div class="nav-menu">
        <router-link to="/">
          <li class="nav-item logo">
            <img src="../../assets/img/navLogo.png" alt="logo" class="nav-logo" />
          </li>
        </router-link>
        <li class="nav-item attraction-search">
          <router-link to="/attraction">
            <div class="hover-effect">
              <span class="nav-item-title">여행지검색</span>
              <img class="nav-item-img" src="../../assets/img/icon/capsule_R.png" alt="이미지" />
            </div>
          </router-link>
        </li>
        <li class="nav-item attraction-search">
          <router-link to="/planner/create">
            <div class="hover-effect">
              <span class="nav-item-title">플래너생성</span>
              <img class="nav-item-img" src="../../assets/img/icon/capsule_B.png" alt="이미지" />
            </div>
          </router-link>
        </li>
      </div>
      <div class="nav-member">
        <li v-if="isLogin" class="mypage">
          <span class="profile-container">
            <img class="mypage-img" src="../../assets/img/Attraction_default.png" alt="이미지" />
          </span>
          <span class="nav-item-title nickname">{{ nickname }} 님</span>
        </li>
        <li v-if="!isLogin" class="login">
          <router-link to="/member/login">
            <div class="hover-effect">
              <span class="nav-item-title">로그인</span>
              <img class="nav-item-img member" src="../../assets/img/icon/coin.png" alt="이미지" />
            </div>
          </router-link>
        </li>
        <li v-if="isLogin" class="nav-item planner">
          <router-link to="/member/mypage">
            <div class="hover-effect">
              <span class="nav-item-title" style="margin-top: 5px">마이페이지</span>
              <img class="nav-item-img" src="../../assets/img/icon/capsule_G.png" alt="이미지" />
            </div>
          </router-link>
        </li>
        <li v-if="!isLogin" class="signup">
          <router-link to="/member/signup">
            <div class="hover-effect">
              <span class="nav-item-title">회원가입</span>
              <img class="nav-item-img member" src="../../assets/img/icon/heart_fill.png" alt="이미지" />
            </div>
          </router-link>
        </li>
        <li v-if="isLogin" class="signup">
          <router-link to="/member/signup">
            <div class="hover-effect" style="margin-top: 10px">
              <span class="nav-item-title">로그아웃</span>
              <img class="nav-item-img member" src="../../assets/img/icon/heart_fill.png" alt="이미지" />
            </div>
          </router-link>
        </li>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'TheHeader',
  components: {},
  data() {
    return {
      isLogin: null,
      nickname: '',
      profile: '',
    };
  },
  computed: {
    ...mapGetters('memberStore', ['checkUserInfo', 'checkIsLogin']),
  },
  created() {
    this.isLogin = this.checkIsLogin;
    this.nickname = this.checkUserInfo.nickname;
    this.profile = this.checkUserInfo.profile;
    console.log(typeof this.isLogin);
  },
  methods: {},
};
</script>

<style scoped>
.nickname {
  margin-left: 10px;
  color: #464646;
}
.mypage {
  display: flex;
  align-items: center;
}
.hover-effect {
  position: relative;
  display: inline-flex;
  height: 30px;
}
.member {
  margin-left: -10px;
}
.hover-effect img {
  position: absolute;
  margin-top: -10px;
  top: 100%;
  /* 이미지를 초기에 아래로 위치시킵니다. */
  transition: top 0.3s ease;
  left: 30%;
  /* 이미지가 왼쪽에 정렬되도록 설정합니다. */
  width: 40px;
  /* 이미지를 부모 요소에 맞게 확장합니다. */
  visibility: hidden;
}

.hover-effect:hover img {
  top: 10%;
  /* 이미지를 위로 올리면서 나타나도록 설정합니다. */
  visibility: visible;
}

.hover-effect span {
  bottom: 0; /* 아래쪽으로 정렬될 수 있도록 설정합니다. */
  transition: transform 0.3s ease, opacity 0.1s ease; /* transform 속성에 대한 트랜지션을 추가합니다. */
}

.hover-effect:hover span {
  transform: translateY(100%); /* span 요소를 아래로 이동시킵니다. */
  opacity: 0;
}

* {
  font-family: CookieRun-Regular;
}

.header {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.navbar {
  display: flex;
  justify-content: space-between;
  /* 아이템 간에 공간을 동일하게 배분 */
  align-items: center;
  /* 아이템을 수직 가운데로 정렬 */
  width: 1200px;
  /* background-color: antiquewhite; */
}
.profile-container {
  padding-top: 10px;
  justify-content: flex;
}
.mypage-img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid #69beee;
}
.nav-member {
  display: flex;
  align-items: center;
  text-align: right;
}

li {
  display: inline-block;
  margin-right: 30px;
  margin-left: 30px;
  caret-color: transparent;
  user-select: none;
}

li a {
  text-decoration: none;
  color: #494949;
}

.nav-logo {
  width: 100px;
  vertical-align: middle;
  /* 추가 */
}
</style>
