<template>
  <div class="header">
    <nav class="navbar">
      <div class="nav-menu">
        <router-link to="/">
          <li class="nav-item logo">
            <img
              src="../../assets/img/navLogo.png"
              alt="logo"
              class="nav-logo"
            />
          </li>
        </router-link>
        <li class="nav-item hotplace">
          <router-link to="/hotplace">핫플레이스</router-link>
        </li>
        <li class="nav-item attraction-search">
          <router-link to="/attraction">여행지검색</router-link>
        </li>
        <li class="nav-item planner">
          <router-link to="/planner">플래너조회</router-link>
        </li>
      </div>
      <div class="nav-member">
        <li class="login">
          <router-link to="/login">로그인</router-link>
        </li>
        <li class="signup"><router-link to="/signup">회원가입</router-link></li>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "TheHeader",
  components: {},
  data() {
    return {
      message: "",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
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
  justify-content: space-between; /* 아이템 간에 공간을 동일하게 배분 */
  align-items: center; /* 아이템을 수직 가운데로 정렬 */
  width: 1200px;
  /* background-color: antiquewhite; */
}
.nav-member {
  text-align: right;
}
li {
  display: inline-block;
  margin-right: 30px;
  margin-left: 30px;
}

li a {
  text-decoration: none;
  color: #494949;
}
.nav-logo {
  width: 100px;
  vertical-align: middle; /* 추가 */
}
</style>
