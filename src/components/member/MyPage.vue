<template>
    <div class="this-main-container">
        <div class="left-container">

        </div>
        <div class="right-container">
            <CalenderView></CalenderView>
        </div>
    </div>
</template>
  
<script>
import { mapState, mapActions } from 'vuex';
const memberStore = 'memberStore';
import CalenderView from "./mypageComponents/CalenderView.vue"
export default {
    name: 'LoginForm',
    components: {CalenderView},
    data() {
        return {
            user: {
                email: null,
                password: null,
            },
        };
    },
    computed: {
        ...mapState(memberStore, ['isLogin', 'isLoginError', 'userInfo']),
    },
    methods: {
        ...mapActions(memberStore, ['userConfirm', 'getUserInfo']),
        async confirm() {
            console.log(this.user);
            await this.userConfirm(this.user);
            let token = sessionStorage.getItem('access-token');
            if (this.isLogin) {
                await this.getUserInfo(token);
                this.$router.push({ name: 'AppMain' });
            }
        },
        movePage() {
            this.$router.push({ name: 'join' });
        },
    },
};
</script>
  
<style scoped>
.left-container {
    width: 600px;
    height: 800px;
    border-radius: 90px 0px 0px 90px;
    background-color: #ffffff;
    box-shadow: 4px 0px 8px rgba(63, 63, 63, 0.3);
}

.right-container {
    width: 600px;
    height: 800px;
    border-radius: 0px 90px 90px 0px;
    box-shadow: 4px 0px 8px rgba(63, 63, 63, 0.3);
}

.this-main-container{
    margin-top: 0px;
    width: 1200px;
    height: 800px;
    background-color: #fff4d7;
    border-radius: 90px;
    box-shadow: 5px 5px 10px 2px rgba(102, 128, 150, 0.5);
    display: flex;
}
</style>
  