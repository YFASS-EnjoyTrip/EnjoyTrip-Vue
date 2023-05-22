<template>
  <div class="app-main-container">
    <div class="search">
      <img src="../assets/img/main_logo.png" alt="main_logo" class="logo" />
      <div class="search-container">
        <input
          type="text"
          id="search-input"
          class="search-input"
          placeholder="여행지, 지역을 입력하세요"
          v-model="keyword"
          @keyup.enter="attractionSearch()"
        />
        <img src="../assets/img/icon/search_Y.png" alt="검색아이콘" class="search-icon" @click="attractionSearch()" />
      </div>
    </div>
    <img src="../assets/img/background.png" alt="배경" class="background" />
    <img class="car1" src="../assets/img/bus.png" alt="" />
    <img class="car2" src="../assets/img/car_B.png" alt="" />
    <img class="car3" src="../assets/img/car_Y.png" alt="" />
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  components: {},
  data() {
    return {
      keyword: '',
    };
  },
  created() {},
  methods: {
    attractionSearch() {
      sessionStorage.setItem('keyword', this.keyword);
      this.$router.push({
        name: 'attraction',
      });
    },
  },
};
</script>

<style scoped>
.car1 {
  position: fixed;
  width: 100px;
  margin-top: -180px;
  /* margin-left: 300px; */
  width: 10%;
  z-index: -1;
  transform: translateY(-50%);
  animation: moveRight 10s linear infinite;
}
.car2 {
  position: fixed;
  width: 100px;
  margin-top: -170px;
  width: 10%;
  z-index: -1;
  transform: translateY(-50%);
  animation: moveRight 5s linear infinite;
}
.car3 {
  position: fixed;
  width: 100px;
  margin-top: -160px;
  width: 10%;
  z-index: -1;
  transform: translateY(-50%);
  animation: moveRight 7s linear infinite;
}
@keyframes moveRight {
  0% {
    left: 0;
  }
  100% {
    left: calc(100% - 10px); /* 이미지의 가로 크기를 고려하여 오른쪽 끝으로 이동 */
  }
}
.app-main-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}
.search {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow-y: auto;
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 700px;
}

.logo {
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 630px;
  height: 314px;
  pointer-events: none;
}

.search-input {
  padding-right: 30px;
  width: 700px;
  height: 50px;

  border: 3px solid #fe646f; /* 테두리 스타일 추가 */
  border-radius: 10px; /* 테두리 모서리 둥글게 설정 */
  outline: none; /* 포커스 시 테두리 제거 */
  font-size: 20px; /* 폰트 크기 설정 */
  text-indent: 20px;
  font-family: 'CookieRun-Regular';
  color: #69beee;
}

.search-input::placeholder {
  font-family: 'CookieRun-Regular';
  color: #b4dff7; /* 플레이스홀더의 색상 변경 */
}

.search-icon {
  position: absolute;
  right: 30px;
  top: -35%;
  width: 30px;
  margin-top: 35px;
  cursor: pointer;
}
.search-icon:hover {
  transform: scale(1.2);
  transition: 0.2s;
}

.bottom-fix {
  position: relative; /* 부모 요소를 relative로 설정 */
  height: 100vh; /* 컨테이너의 높이를 화면 전체 높이로 설정 */
  overflow: hidden;
}
.background {
  position: fixed; /* 이미지의 위치를 절대적으로 설정 */
  bottom: 0; /* 하단에 위치하도록 설정 */
  left: 0; /* 좌측에 위치하도록 설정 */
  width: 100%; /* 가로 길이를 100%로 설정하여 부모 요소에 맞게 조정 */
  height: auto; /* 세로 길이를 자동으로 조정하여 비율을 유지 */
  z-index: -999;
}
</style>
