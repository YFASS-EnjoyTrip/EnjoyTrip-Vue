<template>
  <div>
    
  </div>
</template>
  
  <script>
import axios from "axios";
export default {
  name: "AttractionDetail",
  components: {},
  data() {
    return {
      contentId: "",
      attractionInfo: ""
    };
  },
  created() {
  },
  async mounted() {
    this.contentId = this.$route.params.contentId;
    const response = await axios.get(
      `http://localhost:8080/locations/detail?contentId=${this.contentId}`
    );
    console.log(response);
    this.attractionInfo = response.data.result;
  },

  methods: {}
};
</script>
  
  <style scoped></style>
  