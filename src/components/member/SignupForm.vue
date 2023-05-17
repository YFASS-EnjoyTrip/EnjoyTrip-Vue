<template>
  <div>
    <h2>Sign Up</h2>

    <label>이메일 </label>
    <input type="email" v-model="email" @keyup="debouncedCheckEmailDuplicate" />
    <p>{{ emailMessage }}</p>

    <label>닉네임 </label>
    <input type="text" v-model="nickname" @keyup="debouncedCheckNicknameDuplicate" />
    <p>{{ nicknameMessage }}</p>

    <label>비밀번호 </label>
    <input type="password" v-model="password" />

    <label>비밀번호 확인</label>
    <input type="password" v-model="confirmPassword" />
    <p>{{ passwordMessage }}</p>

    <button @click="submitForm">회원가입</button>
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
      email: "",
      nickname: "",
      password: "",
      confirmPassword: "",
      gender: "",
      emailDuplicate: true,
      nicknameDuplicate: true,
    };
  },
  computed: {
    emailMessage() {
      return this.emailDuplicate ? "사용이 불가능한 이메일입니다." : "사용이 가능한 이메일입니다.";
    },
    nicknameMessage() {
      return this.nicknameDuplicate
        ? "사용이 불가능한 닉네임입니다."
        : "사용이 가능한 닉네임입니다.";
    },
    passwordMessage() {
      return this.password !== this.confirmPassword && this.confirmPassword.length > 0
        ? "비밀번호가 일치하지 않습니다."
        : "비밀번호가 일치합니다.";
    },
  },
  created() {
    this.debouncedCheckEmailDuplicate = _.debounce(this.checkEmailDuplicate, 500);
    this.debouncedCheckNicknameDuplicate = _.debounce(this.checkNicknameDuplicate, 500);
  },

  methods: {
    checkEmailDuplicate() {
      console.log(this.emailDuplicate);
      api
        .get(`/member/check/${this.email}`)
        .then(({ data }) => {
          // status가 200이면 중복되지 않았으므로 false, 그렇지 않으면 true
          this.emailDuplicate = data.status !== 200;
        })
        .catch((error) => {
          console.log(error);
          if (error.response && error.response.status === 409) {
            // status가 409면 중복되었으므로 true
            this.emailDuplicate = true;
          } else {
            // 그렇지 않으면 중복되지 않았으므로 false
            this.emailDuplicate = false;
          }
        });
      console.log(this.emailDuplicate);
    },

    checkNicknameDuplicate() {
      api
        .get(`/member/check/${this.nickname}`)
        .then(({ data }) => {
          // status가 200이면 중복되지 않았으므로 false, 그렇지 않으면 true
          this.nicknameDuplicate = data.status !== 200;
        })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            // status가 409면 중복되었으므로 true
            this.nicknameDuplicate = true;
          } else {
            // 그렇지 않으면 중복되지 않았으므로 false
            this.nicknameDuplicate = false;
          }
        });
    },

    submitForm() {
      api
        .post("/member/signup", {
          email: this.email,
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

<style scoped></style>
