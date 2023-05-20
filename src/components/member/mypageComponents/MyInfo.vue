<template>
  <div class="right-container">
    <div class="title-container">
      <span>정보 수정하기</span>
    </div>
    <div class="profile-img">
      <img src="../../../assets/img/icon/profile_default.png" alt="">
    </div>
    <div class="modify-img">
      <span>사진 수정하기</span>
      <font-awesome-icon class="modify-icon" icon="fa-pen-to-square" size="xl" />
    </div>
    
    <div class="modify-bio">
      <input type="text" v-model="modifyBio" :placeholder="bio">
      <font-awesome-icon class="modify-icon" icon="fa-pen-to-square" size="xl" />
    </div>
    <div class="input-container">
      <div class="member-input">
        <span>닉네임 </span>
        <input class="input-box" type="text" v-model="nickname" @keyup="debouncedCheckNicknameDuplicate" />
      </div>
      <span class="check">{{ nicknameMessage }}</span>
      <div class="member-input">
        <span>비밀번호 </span>
        <input type="password" class="input-box" v-model="password" />
      </div>
      <span class="check password" v-show="password.length <= 3">비밀번호는 4자 이상이어야 합니다!</span>
      <div class="member-input">
        <span>비밀번호 확인</span>
        <input type="password" class="input-box" v-model="confirmPassword" />
      </div>
      <span class="check">
        {{ passwordMessage }}
      </span>
      <div>
        <button class="submit" @click="submitForm">정보 수정</button>
      </div>
    </div>
  </div>
</template>

<script>
import { apiInstance } from "@/api/index.js";
import router from "@/router";
import _ from "lodash";

const api = apiInstance();

export default {
  name: "SignupForm",
  components: {},
  data() {
    return {
      nickname: "",
      password: "",
      confirmPassword: "",
      nicknameDuplicate: true,
      bio:"기존 한줄 상태 입니다",
      modifyBio:"",
    };
  },
  computed: {
    nicknameMessage() {
      return this.nickname.length == 0
        ? ""
        : this.nicknameDuplicate
          ? "이미 사용중인 닉네임입니다."
          : "사용이 가능한 닉네임입니다.";
    },
    passwordMessage() {
      return this.password !== this.confirmPassword &&
        this.confirmPassword.length > 0
        ? "비밀번호가 일치하지 않습니다."
        : "비밀번호가 일치합니다.";
    },
  },
  created() {
    this.debouncedCheckNicknameDuplicate = _.debounce(
      this.checkNicknameDuplicate,
      500
    );
  },

  methods: {

    checkNicknameDuplicate() {
      api
        .get(`/member/check/${this.nickname}`)
        .then(({ data }) => {
          this.nicknameDuplicate = data.status !== 200;
        })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            this.nicknameDuplicate = true;
          } else {
            this.nicknameDuplicate = false;
          }
        });
    },

    submitForm() {
      api
        .post("/member/signup", {
          password: this.password,
          nickname: this.nickname,
        })
        .then(() => {
          router.push("/login");
        })
        .catch((error) => {
          console.error("Signup failed", error);
        });
    },
  },
};
</script>

<style scoped>

.modify-icon{
  color: #686868;
  margin-left: 10px;
}
.modify-icon:hover{
  color: #383838;
  cursor: pointer;
  transform: scale(1.2);
  transition: 0.2s;
}
.modify-bio input{
    border: 3px solid #69beee;
  border-radius: 8px;
  outline: none;
  font-size: 20px;
  text-indent: 10px;
  font-family: "CookieRun-Regular";
  color: #757575;
  width: 300px;
  height: 40px;
  caret-color: #6e6e6e;
}
.modify-bio{
  margin-top: 20px;
  text-align: center;
}
.modify-img{
  margin-top: 10px;
  font-family: "CookieRun-Regular";
  font-size: 15px;
  color: #707070;
  margin-left: 250px;
}
.profile-img {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  overflow: hidden;
  margin: auto;
  margin-top: 50px;
  border: 5px solid #69beee;
  box-shadow: 4px 4px 4px rgba(116, 116, 116, 0.5);
}

.profile-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.submit {
  margin: 190px;
  margin-top: 30px;
  background-color: #69beee;
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
  box-shadow: 4px 4px 4px rgba(116, 116, 116, 0.5);
}

.submit:hover {
  background-color: #49c46f;
  transition: 0.2s;
}

.submit:active {
  background-color: #94e0ac;
  color: #4b4b4b;
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

.check {
  margin-left: 30px;
  font-family: "CookieRun-Regular";
  font-size: 15px;
  color: #ff7878;
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

.input-container {
  margin-top: 20px;
  margin-left: 50px;
  width: 500px;
  height: 360px;
  background-color: #ffedba;
  border-radius: 50px;
  padding-top: 30px;
  box-shadow: 5px 5px 10px 2px rgba(102, 128, 150, 0.5);
}

.icon {
  width: 15px;
}

.right-container {
  width: 600px;
  height: 800px;
  border-radius: 0px 90px 90px 0px;
  background-color: #CBE6F6;
}

.title-container {
  margin-top: 30px;
  margin-left: 40px;
  font-family: "CookieRun-Bold";
  color: #383838;
  font-size: 30px;
  margin-bottom: -30px;
  caret-color: transparent;
  user-select: none;
  pointer-events: none;
}
</style>