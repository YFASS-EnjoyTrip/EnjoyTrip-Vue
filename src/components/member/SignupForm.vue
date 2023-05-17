<template>
  <div class="container">
    <div class="info-text">회원가입</div>
    <div class="input-container">
      <div class="member-input">
        <span>이메일 </span>
        <input
          type="email"
          class="input-box"
          v-model="email"
          @keyup="debouncedChecklDuplicate"
        />
      </div>
      <span class="check" v-show="emailDuplicate"
        >이미 가입된 이메일입니다.</span
      >
      <div class="member-input">
        <span>닉네임 </span>
        <input
          class="input-box"
          type="text"
          v-model="nickname"
          @keyup="debouncedChecklDuplicate"
        />
      </div>
      <span class="check" v-show="nicknameDuplicate"
        >이미 사용중인 닉네임입니다.</span
      >
      <div class="member-input">
        <span>비밀번호 </span>
        <input type="password" class="input-box" v-model="password" />
      </div>
      <span class="check password" v-show="password.length <= 3"
        >비밀번호는 4자 이상이어야 합니다!</span
      >
      <div class="member-input">
        <span>비밀번호 확인</span>
        <input type="password" class="input-box" v-model="confirmPassword" />
      </div>
      <span
        class="check"
        v-show="password !== confirmPassword && confirmPassword.length > 0"
      >
        비밀번호가 일치하지 않습니다
      </span>
      <div>
        <button class="submit" @click="submitForm">회원가입</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignupForm",
  components: {},
  data() {
    return {
      email: "",
      nickname: "",
      message: "",
      emailDuplicate: true,
      nicknameDuplicate: true,
      confirmPassword: "asa",
      password: "12",
    };
  },
  created() {},
  methods: {
    debouncedChecklDuplicate() {},
    submitForm() {},
  },
};
</script>

<style scoped>
.check {
  margin-left: 30px;
  font-family: "CookieRun-Regular";
  font-size: 15px;
  color: #ff7878;
  caret-color: transparent;
  user-select: none;
  pointer-events: none;
}
.password {
  margin-left: 70px;
}
.input-box {
  border: 3px solid #ffc930;
  border-radius: 8px;
  outline: none;
  font-size: 20px;
  text-indent: 10px;
  font-family: "CookieRun-Regular";
  color: #757575;

  margin-right: 20px;
  width: 300px;
  height: 40px;
  caret-color: #6e6e6e;
}

.input-box::placeholder {
  color: #c5c5c5;
}

.submit {
  margin-top: 40px;
  background-color: #f24849;
  border: 0;
  border-radius: 10px;
  width: 120px;
  height: 45px;
  font-family: "CookieRun-Regular";
  color: #ffffff;
  font-size: 24px;

  caret-color: transparent;
  user-select: none;
  cursor: pointer;
}
.submit:hover {
  transform: scale(1.1);
  transition: 0.2s;
}
.submit:active {
  background-color: #f79d9d;
  color: #4b4b4b;
}
.input-container {
  width: 600px;
  height: 500px;
  background-color: #ffedba;
  margin: auto;
  border-radius: 50px;
  padding-top: 30px;
  box-shadow: 0 2px 4px rgba(73, 73, 73, 0.2);
}
.info-text {
  margin-top: 40px;
  margin-bottom: 40px;
  font-family: "CookieRun-Black";
  color: #f24849;
  font-size: 64px;
  caret-color: transparent;
  user-select: none;
  pointer-events: none;
}
.member-input span {
  margin-right: 30px;
  width: 120px;
  text-align: right;
  padding-top: 10px;

  caret-color: transparent;
  user-select: none;
  pointer-events: none;

  font-family: "CookieRun-Regular";
  color: #636363;
  font-size: 20px;
}
.member-input {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.container {
  width: 1200px;
  height: 800px;
  background-color: rgb(255, 255, 255);
  border-radius: 90px;
  box-shadow: 0 2px 4px rgba(73, 73, 73, 0.2);
  text-align: center;
}
</style>
