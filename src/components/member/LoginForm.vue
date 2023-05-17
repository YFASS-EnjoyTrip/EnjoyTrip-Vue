<!-- <template>
  <div>
    <h2>Login</h2>

    <label>이메일 </label>
    <input type="email" v-model="email" />

    <label>비밀번호 </label>
    <input type="password" v-model="password" />

    <button @click="submitForm">로그인</button>
  </div>
</template> -->

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
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError", "userInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userConfirm", "getUserInfo"]),
    async confirm() {
      await this.userConfirm(this.user);
      let token = sessionStorage.getItem("access-token");
      // console.log("1. confirm() token >> " + token);
      if (this.isLogin) {
        await this.getUserInfo(token);
        // console.log("4. confirm() userInfo :: ", this.userInfo);
        this.$router.push({ name: "main" });
      }
    },
    movePage() {
      this.$router.push({ name: "join" });
    },
  },
};
</script>

<style scoped></style>
