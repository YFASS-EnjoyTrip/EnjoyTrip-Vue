<template>
  <div class="main-container">
    <div class="inner-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "HotplaceMain",
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
  box-shadow: 5px 5px 10px 2px rgba(102, 128, 150, 0.5);
}
</style>
