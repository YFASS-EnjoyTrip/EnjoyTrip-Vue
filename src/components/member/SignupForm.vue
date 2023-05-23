<template>
  <div class="container">
    <div class="info-text">회원가입</div>
    <div class="input-container">
      <div class="member-input">
        <span>이메일</span>
        <input type="email" class="input-box" v-model="email" @keyup="debouncedCheckEmailDuplicate" />
      </div>
      <span class="check">{{ emailMessage }}</span>
      <div class="member-input">
        <span>닉네임</span>
        <input class="input-box" type="text" v-model="nickname" @keyup="debouncedCheckNicknameDuplicate" />
      </div>
      <span class="check">{{ nicknameMessage }}</span>
      <div class="member-input">
        <span>비밀번호</span>
        <input type="password" class="input-box" v-model="password" />
      </div>
      <span class="check password" v-show="password.length > 0 && password.length < 4">
        비밀번호는 4자 이상이어야 합니다!
      </span>
      <div class="member-input">
        <span>비밀번호 확인</span>
        <input type="password" class="input-box" v-model="confirmPassword" />
      </div>
      <span class="check" v-show="this.confirmPassword.length > 0">
        {{ passwordMessage }}
      </span>
      <div>
        <button class="submit" @click="submitForm">회원가입</button>
      </div>
    </div>
  </div>
</template>

<script>
import { apiInstance } from '@/api/index.js';
import router from '@/router';
import _ from 'lodash';

const api = apiInstance();

export default {
  name: 'SignupForm',
  components: {},
  data() {
    return {
      email: '',
      nickname: '',
      password: '',
      confirmPassword: '',
      emailMsg: '',
      emailDuplicate: true,
      nicknameDuplicate: true,
    };
  },
  computed: {
    emailMessage() {
      return this.email.length == 0
        ? ''
        : this.emailDuplicate
        ? '이미 사용중인 이메일입니다.'
        : '사용이 가능한 이메일입니다.';
    },
    nicknameMessage() {
      return this.nickname.length == 0
        ? ''
        : this.nicknameDuplicate
        ? '이미 사용중인 닉네임입니다.'
        : '사용이 가능한 닉네임입니다.';
    },
    passwordMessage() {
      return this.password !== this.confirmPassword && this.confirmPassword.length > 0
        ? '비밀번호가 일치하지 않습니다.'
        : '비밀번호가 일치합니다.';
    },
  },
  created() {
    this.debouncedCheckEmailDuplicate = _.debounce(this.checkEmailDuplicate, 500);
    this.debouncedCheckNicknameDuplicate = _.debounce(this.checkNicknameDuplicate, 500);
  },

  methods: {
    checkEmailDuplicate() {
      api
        .get(`/member/check/${this.email}`)
        .then(({ data }) => {
          this.emailDuplicate = data.status !== 200;
        })
        .catch((error) => {
          console.log(error);
          if (error.response && error.response.status === 409) {
            this.emailDuplicate = true;
          } else {
            this.emailDuplicate = false;
          }
        });
    },

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
      // 이메일 형식 검증을 위한 정규 표현식
      const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

      // 이메일 형식이 올바르지 않은 경우
      if (!emailRegex.test(this.email)) {
        alert('올바른 이메일 형식이 아닙니다.');
        return;
      }

      api
        .post('/member/signup', {
          email: this.email,
          password: this.password,
          nickname: this.nickname,
        })
        .then(() => {
          router.push('/login');
        })
        .catch((error) => {
          console.error('Signup failed', error);
        });
    },
  },
};
</script>

<style scoped>
.check {
  margin-left: 30px;
  font-family: 'CookieRun-Regular';
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
  font-family: 'CookieRun-Regular';
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
  background-color: #69beee;
  border: 0;
  border-radius: 10px;
  width: 120px;
  height: 45px;
  font-family: 'CookieRun-Regular';
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
.input-container {
  width: 600px;
  height: 500px;
  background-color: #ffedba;
  margin: auto;
  border-radius: 50px;
  padding-top: 30px;
  box-shadow: 5px 5px 10px 2px rgba(102, 128, 150, 0.5);
}
.info-text {
  margin-top: 40px;
  margin-bottom: 40px;
  font-family: 'CookieRun-Black';
  color: #69beee;
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

  font-family: 'CookieRun-Regular';
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
  /* background-color: rgb(255, 255, 255); */
  border-radius: 90px;
  /* box-shadow: 0 2px 4px rgba(73, 73, 73, 0.2); */
  text-align: center;
}
</style>
