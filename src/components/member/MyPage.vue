<template>
    <div>
        <div class="bookmark-area">
            <div>
                <router-link to="myplanner">
                    <font-awesome-icon class="bookmark-icon1" icon="fa-solid fa-bookmark" size="2xl" />
                </router-link>
            </div>
            <div>
                <router-link to="myliked">
                    <font-awesome-icon class="bookmark-icon2" icon="fa-solid fa-bookmark" size="2xl" />
                </router-link>
            </div>
            <div>
                <router-link to="myinfo">
                    <font-awesome-icon class="bookmark-icon3" icon="fa-solid fa-bookmark" size="2xl" />
                </router-link>
            </div>
        </div>
        <div class="this-main-container">
            <div class="left-container">
                <mypageCover></mypageCover>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>
  
<script>
import mypageCover from "./mypageComponents/mypageCover.vue"
import { mapState, mapActions } from 'vuex';
const memberStore = 'memberStore';
export default {
    components: {
        mypageCover
    },
    name: 'LoginForm',
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
.bookmark-icon1 {
    color: #FFC930;
    rotate: 270deg;
    transform: scale(1.7);
}

.bookmark-icon1:hover {
    color: #daa000;
}

.bookmark-icon2 {
    color: #FE646F;
    rotate: 270deg;
    transform: scale(1.7);
}

.bookmark-icon2:hover {
    color: #df212e;
}

.bookmark-icon3 {
    color: #69BEEE;
    rotate: 270deg;
    transform: scale(1.7);
}

.bookmark-icon3:hover {
    color: #2399dd;
}

.bookmark-area div {
    margin-top: 20px;
    margin-left: 15px;
}

.bookmark-area {
    position: absolute;
    width: 100px;
    height: 200px;
    margin-left: 1200px;
    margin-top: 80px;
}

.left-container {
    width: 600px;
    height: 800px;
    border-radius: 90px 0px 0px 90px;
    background-color: #ffffff;
    box-shadow: 4px 0px 8px rgba(63, 63, 63, 0.3);
    z-index: 1;
}



.this-main-container {
    margin-top: 0px;
    width: 1200px;
    height: 800px;
    background-color: #afafaf;
    border-radius: 90px;
    box-shadow: 5px 5px 10px 2px rgba(102, 128, 150, 0.5);
    display: flex;
}
</style>
  