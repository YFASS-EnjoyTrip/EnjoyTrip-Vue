<template>
  <div class="cover-container">
    <img class="main-logo" src="../../../assets/img/main_logo.png" alt="">
    <div class="profile-img">
      <img src="../../../assets/img/icon/profile_default.png" alt="">
    </div>
    <div class="nickname">{{ nickname }}</div>
    <div class="bio">
      <span>{{ bio }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nickname: "asdfasdf",
      bio: "한줄소개입니다~~~~~~~~한줄소개입니다~~~~~~~~"
    }

  }
}
</script>

<style scoped>
.bio span {
  font-family: "CookieRun-Regular";
  font-size: 20px;
  color: #707070;
}

.bio {
  overflow: hidden;
  display: flex;
  align-items: center;
  width: 400px;
  height: 120px;
  background-color: #ffffff;
  margin: auto;
  border-radius: 18px;
  margin-top: 30px;
  box-shadow: 4px 4px 4px rgba(255, 162, 162, 0.5);
  text-align: center;
}

.nickname {
  font-family: "CookieRun-Regular";
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
  border: 5px solid #FE646F;
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
  background-color: #fce0e0;
  border-radius: 60px;
  box-shadow: 4px 4px 4px rgba(201, 106, 106, 0.466);
}
</style>