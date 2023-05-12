<template>
  <div class="main-container">
    <div class="inner-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "AttractionMain",
  components: {},
  data() {
    return {
      message: "",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
.main-container {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
.inner-container {
  width: 1200px;
  height: 800px;
  background-color: rgb(255, 255, 255);
  border-radius: 90px;
  /*box-shadow: 0 2px 4px rgba(73, 73, 73, 0.2);  그림자 속성 설정 */
}
</style>
