<template>
  <div class="cover-container">
    <img class="main-logo" src="../../../assets/img/main_logo.png" alt="" />
    <div class="profile-img">
      <img :src="this.user.profileImg || this.defaultImg" alt="" draggable="false" />
    </div>
    <div class="nickname">{{ this.user.nickname }}</div>
    <div class="bio">
      <span>{{ this.user.bio }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
const memberStore = 'memberStore';

export default {
  data() {
    return {
      defaultImg: 'https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/profile_default.png',
    };
  },

  computed: {
    ...mapGetters(memberStore, ['checkUserInfo']),
    user() {
      return (
        this.checkUserInfo || {
          nickname: '',
          profileImg: '',
          bio: '',
        }
      );
    },
  },
};
</script>

<style scoped>
.bio span {
  font-family: 'CookieRun-Regular';
  font-size: 20px;
  color: #707070;
  margin: auto;
}

.bio {
  overflow: hidden;
  display: flex;
  align-items: center;
  text-align: center;
  width: 400px;
  height: 120px;
  background-color: #ffffff;
  margin: auto;
  border-radius: 18px;
  margin-top: 30px;
  box-shadow: 4px 4px 4px rgba(255, 162, 162, 0.5);
}

.nickname {
  font-family: 'CookieRun-Regular';
  font-size: 30px;
  color: #707070;
  text-align: center;
  margin-top: 20px;
}

.profile-img {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  overflow: hidden;
  margin: auto;
  margin-top: 30px;
  border: 5px solid #fe646f;
  box-shadow: 4px 4px 4px rgba(255, 162, 162, 0.5);
}

.profile-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.main-logo {
  width: 400px;
  margin-left: 50px;
  margin-top: 50px;
}

.cover-container {
  margin: auto;
  margin-top: 50px;
  width: 500px;
  height: 700px;
  background-color: #e2e2e2;
  border-radius: 60px;
  box-shadow: 4px 4px 4px rgba(138, 138, 138, 0.466);
  caret-color: transparent;
  user-select: none;
  pointer-events: none;
}
</style>
