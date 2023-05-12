<template>
  <div>
    <div class="search">
      <img src="../assets/img/main_logo.png" alt="main_logo" class="logo" />
      <div class="search-container">
        <input
          type="text"
          id="search-input"
          class="search-input"
          placeholder="여행지, 지역을 입력하세요"
          v-model="keyword"
        />
        <img
          src="../assets/img/icon/search_Y.png"
          alt="검색아이콘"
          class="search-icon"
          @click="attractionSearch"
        />
      </div>
    </div>
    <div>
      <img
        src="../assets/img/background_full.png"
        alt="배경"
        class="background"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "AppMain",
  components: {},
  data() {
    return {
      keyword: "",
    };
  },
  created() {},
  methods: {
    attractionSearch() {
      alert(this.keyword);
    },
  },
};
</script>

<style scoped>
.search {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 700px;
}

.logo {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 630px;
  height: 314px;
}

.search-input {
  margin-top: 170px;
  padding-right: 30px;
  width: 700px;
  height: 50px;

  border: 3px solid #fe646f; /* 테두리 스타일 추가 */
  border-radius: 10px; /* 테두리 모서리 둥글게 설정 */
  outline: none; /* 포커스 시 테두리 제거 */
  font-size: 20px; /* 폰트 크기 설정 */
  text-indent: 20px;
  font-family: "CookieRun-Regular";
  color: #69beee;
}

.search-input::placeholder {
  font-family: "CookieRun-Regular";
  color: #b4dff7; /* 플레이스홀더의 색상 변경 */
}

.search-icon {
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  margin-top: 85px;
}

.background {
  position: absolute;
  right: 0;
  top: 0;
  z-index: -1;
  width: fit-content;
}
</style>
