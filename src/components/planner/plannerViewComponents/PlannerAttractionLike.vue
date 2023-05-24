<template>
  <div class="planner-attraction-like-container">
    <div class="like-header">
      <span></span>
    </div>
    <div class="attraction-list">
      <div v-for="(attraction, index) in attractions" :key="index" class="attraction-list-item">
        {{ attraction }}
      </div>
    </div>
  </div>
</template>

<script>
import { apiAuthInstance } from '@/api';

const api = apiAuthInstance();
export default {
  name: 'PlannerAttractionLike',
  data() {
    return {
      attractions: [],
    };
  },
  props: {
    sidoCode: {
      type: Number,
      require: true,
    },
  },

  async created() {
    try {
      const response = await api.get(`/member/mypage/like?sido=${this.sidoCode}`);
      this.attractions = response.data.result;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {},
};
</script>

<style scoped></style>
