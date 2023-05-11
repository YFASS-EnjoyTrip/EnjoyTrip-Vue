<template>
  <div id="app">
    <the-header></the-header>
    <router-view></router-view>
  </div>
</template>

<script>
import TheHeader from "../src/components/common/TheHeader.vue";
export default {
  components: {
    TheHeader,
  },
  data() {
    return {
      message: "",
    };
  },
  created() {},
  methods: {},
};
</script>
<style></style>
