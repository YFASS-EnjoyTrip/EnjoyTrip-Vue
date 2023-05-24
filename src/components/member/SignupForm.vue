<template>
  <div class="container">
    <div class="info-text">회원가입</div>
    <div class="input-container">
      <div class="member-input">
        <span>이메일</span>
        <input
          type="email"
          class="input-box email"
          v-model="emailPrefix"
          @keyup="debouncedCheckEmailDuplicate"
          ref="email"
        />
        <!-- <span class="email-span">@</span> -->
        <select v-model="emailDomain" @change="debouncedCheckEmailDuplicate">
          <option disabled value=""></option>
          <option>@gmail.com</option>
          <option>@naver.com</option>
          <option>@nate.com</option>
        </select>
      </div>
      <span class="check" v-bind:class="{ 'green-text': emailMessage === '사용이 가능한 이메일입니다.' }">
        {{ emailMessage }}
      </span>
      <div class="member-input">
        <span>닉네임</span>
        <input
          class="input-box"
          type="text"
          v-model="nickname"
          @keyup="debouncedCheckNicknameDuplicate"
          ref="nickname"
        />
      </div>
      <span class="check" v-bind:class="{ 'green-text': nicknameMessage === '사용이 가능한 닉네임입니다.' }">
        {{ nicknameMessage }}
      </span>
      <div class="member-input">
        <span>비밀번호</span>
        <input type="password" class="input-box" v-model="password" />
      </div>
      <span class="check password" v-show="password.length > 0 && password.length < 4" ref="password">
        비밀번호는 4자 이상이어야 합니다!
      </span>
      <div class="member-input">
        <span>비밀번호 확인</span>
        <input type="password" class="input-box" v-model="confirmPassword" ref="confirmPassword" />
      </div>
      <span class="check" v-bind:class="{ 'green-text': passwordMessage === '비밀번호가 일치합니다.' }">
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
      emailPrefix: '',
      emailDomain: '',
      nickname: '',
      password: '',
      confirmPassword: '',
      emailMsg: '',
      emailDuplicate: true,
      nicknameDuplicate: true,
    };
  },
  computed: {
    email() {
      return `${this.emailPrefix}${this.emailDomain}`;
    },
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
      return this.confirmPassword.length == 0
        ? ''
        : this.password !== this.confirmPassword
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
      const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

      if (!emailRegex.test(this.email)) {
        this.$toast.error('이메일을 입력해주세요', {
          position: 'top-center',
          timeout: 1500,
        });
        this.$refs.email.focus();
        return;
      }

      if (this.nickname === '') {
        this.$toast.error('닉네임을 입력해주세요', {
          position: 'top-center',
          timeout: 1500,
        });
        this.$refs.nickname.focus();
        return;
      }

      if (this.password === '') {
        this.$toast.error('비밀번호를 입력해주세요', {
          position: 'top-center',
          timeout: 1500,
        });
        this.$refs.password.focus();
        return;
      }

      if (this.confirmPassword === '') {
        this.$toast.error('비밀번호 확인을 입력해주세요', {
          position: 'top-center',
          timeout: 1500,
        });
        this.$refs.confirmPassword.focus();
        return;
      }

      if (this.emailMessage !== '사용이 가능한 이메일입니다.') {
        this.$toast.error('이미 사용중인 이메일입니다.', {
          position: 'top-center',
          timeout: 1500,
        });
        this.$refs.email.focus();
        return;
      }

      if (this.nicknameMessage !== '사용이 가능한 닉네임입니다.') {
        this.$toast.error('이미 사용중인 닉네임입니다.', {
          position: 'top-center',
          timeout: 1500,
        });
        this.$refs.nickname.focus();
        return;
      }

      if (this.passwordMessage !== '비밀번호가 일치합니다.') {
        this.$toast.error('비밀번호가 일치하지 않습니다.', {
          position: 'top-center',
          timeout: 1500,
        });
        this.$refs.confirmPassword.focus();
        return;
      }

      api
        .post('/member/signup', {
          email: this.email,
          password: this.password,
          nickname: this.nickname,
        })
        .then(() => {
          router.push('login');
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
.green-text {
  color: green;
}
.email-input-box {
  border: 3px solid #ffc930;
  border-radius: 8px;
  outline: none;
  font-size: 20px;
  text-indent: 10px;
  font-family: 'CookieRun-Regular';
  color: #757575;

  margin-right: 20px;
  width: 180px;
  height: 40px;
  caret-color: #6e6e6e;
}
.email-span {
  margin-left: -100px;
  margin-right: 10px !important;
}
.email {
  width: 160px !important;
  margin-right: 10px !important;
}
.input-box {
  background-color: #f8e4a7;
  border: none;
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
  background-color: #ffffff;
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
.member-input select {
  width: 130px;
  margin-right: 20px;
  border-radius: 10px;
  background-color: #f8e4a7;
  border: none;

  font-family: 'CookieRun-Regular';
  color: #616161;
  font-size: 1.2rem;
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
