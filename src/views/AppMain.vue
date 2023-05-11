<template>
  <div class="main-container">
    <div class="inner-container">
      <h1>메인화면</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppMain",
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
  background-color: rgb(179, 224, 255);
  border-radius: 90px;
}
</style>
