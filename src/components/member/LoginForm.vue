<template>
  <div class="main-container">
    <div>
      <img
        class="main-logo"
        src="../../assets/img/main_logo.png"
        alt="로고이미지"
      />
    </div>
    <div class="input-container">
      <div>
        <input class="input-box" type="text" v-model="user.email" placeholder="이메일" />
      </div>
      <div>
        <input class="input-box" type="password" v-model="user.password" placeholder="비밀번호" />
      </div>
    </div>
    <div class="button-container">
      <div class="button login" @click="confirm">로그인</div>
      <div class="button findPwd">비밀번호 찾기</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
const memberStore = "memberStore";

export default {
  name: "LoginForm",
  components: {},
  data() {
    return {
      user: {
        email: null,
        password: null,
      }
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError", "userInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userConfirm", "getUserInfo"]),
    async confirm() {
      console.log(this.user);
      await this.userConfirm(this.user);
      let token = sessionStorage.getItem("access-token");
      if (this.isLogin) {
        await this.getUserInfo(token);
        this.$router.push({ name: "main" });
      }
    },
    movePage() {
      this.$router.push({ name: "join" });
    },
  },
};
</script>

<style scoped>
.main-container {
  display: block;
  text-align: center;
}
.button-container {
  width: fit-content;
  margin: auto;
  margin-top: 50px;
}
.button {
  text-align: center;
  background-color: #69beee;
  font-family: "CookieRun-Regular";
  color: #ffffff;
  font-size: 20px;
  width: 170px;
  height: 40px;

  caret-color: transparent;
  user-select: none;
  cursor: pointer;

  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.findPwd {
  background-color: #a0a0a0;
}
.findPwd:hover {
  transform: scale(1.1);
  background-color: #797979;
  transition: 0.2s;
}
.findPwd:active {
  background-color: #aaaaaa;
  color: #424242;
}
.login:hover {
  transform: scale(1.1);
  background-color: #24a9f7;
  transition: 0.2s;
}
.login:active {
  background-color: #9dd8fa;
  color: #424242;
}
.input-box {
  border: 3px solid #69beee;
  border-radius: 8px;
  outline: none;
  font-size: 25px;
  font-family: "CookieRun-Regular";
  color: #757575;
  text-indent: 20px;
  margin-right: 20px;
  width: 400px;
  height: 40px;
  caret-color: #6e6e6e;
  margin-bottom: 30px;
}

.input-box::placeholder {
  color: #b0e1fd;
}
.input-container {
  text-align: center;
  margin-top: 30px;
}
.main-logo {
  margin-top: 20px;
  width: 600px;
  caret-color: transparent;
  user-select: none;
  pointer-events: none;
}
</style>
