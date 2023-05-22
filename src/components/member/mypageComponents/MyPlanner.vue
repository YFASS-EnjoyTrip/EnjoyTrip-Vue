<template>
  <div class="right-container">
    <div>
      <div class="title-container">
        <span>나의 여행계획</span>
      </div>
      <div class="calndar-area">
        <button @click="setToday">TODAY</button>
        <v-calendar is-expanded :attributes="attributes" :from-date="fromDate"></v-calendar>
      </div>
      <div class="attraction-area">
        <div class="planner-container">
          <div v-for="(planner, index) in planners" :key="index" class="planner-list">
            <div class="image-container" @mouseover="showDeleteButton(index)" @mouseleave="hideDeleteButton(index)">
              <img
                class="attractionImg"
                :src="planner.image || defaultImage"
                :alt="planner.title"
                @click="goToPlannerDetail(planner)"
              />
              <button class="delete-button" v-if="showDeleteButtons[index]" @click="deletePlan(planner)">
                <font-awesome-icon icon="fa-solid fa-trash" size="xl" />
              </button>
            </div>
            <div class="attraction-info">
              <div class="planner-title">
                <span>{{ planner.title }}</span>
              </div>
              <div class="planner-date">
                <span>{{ planner.startDate }} ~ {{ planner.endDate }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VCalendar from 'v-calendar/lib/components/calendar.umd';
import { apiAuthInstance } from '@/api';

const api = apiAuthInstance();

export default {
  components: {
    VCalendar,
  },
  methods: {
    setToday() {
      this.fromDate = new Date(); // fromDate을 현재 날짜로 설정
    },

    goToPlannerDetail(planner) {
      sessionStorage.setItem('planId', planner.planId);
      sessionStorage.setItem('planTitle', planner.title);
      this.$router.push({
        name: 'plannerView',
        params: { planId: planner.planId },
      });
    },

    showDeleteButton(index) {
      this.$set(this.showDeleteButtons, index, true);
    },
    hideDeleteButton(index) {
      this.$set(this.showDeleteButtons, index, false);
    },

    async deletePlan(planner) {
      try {
        if (window.confirm('삭제하시겠습니까?')) {
          await api.delete(`/planner/${planner.planId}`);
          await this.fetchPlanners();
        }
      } catch (error) {
        console.error('Failed to delete the plan:', error);
      }
    },

    async fetchPlanners() {
      try {
        const response = await api.get('/planner/list');

        if (response.status === 200) {
          this.planners = response.data.result;

          this.todos = this.planners.map((planner, index) => ({
            description: planner.title,
            dates: [{ start: new Date(planner.startDate), end: new Date(planner.endDate) }],
            color: this.colors[index % this.colors.length],
          }));
        } else {
          console.error(`Error: Received status code ${response.status}`);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    },
  },
  data() {
    const todos = [];
    const colors = ['red', 'orange', 'yellow', 'green', 'teal', 'blue', 'indigo', 'purple', 'pink', 'gray'];
    return {
      defaultImage: 'https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/Attraction_default.png',
      incId: todos.length,
      todos,
      colors,
      fromDate: new Date(), // 현재 날짜로 초기화된 fromDate
      planners: [],
      showDeleteButtons: {},
    };
  },
  computed: {
    attributes() {
      return [
        // Attributes for todos
        ...this.todos.map((todo) => ({
          dates: todo.dates,
          bar: {
            color: todo.color,
          },
          popover: {
            label: todo.description,
          },
          customData: todo,
        })),
      ];
    },
  },

  async created() {
    this.fetchPlanners();
  },
};
</script>

<style scoped>
.right-container {
  width: 600px;
  height: 800px;
  border-radius: 0px 90px 90px 0px;
  background-color: #fff4d7;
}

.planner-date {
  font-size: 15px;
  font-family: 'CookieRun-Regular';
  color: #808080;
}

.planner-title span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 20px;
  font-family: 'CookieRun-Bold';
  color: #4d4d4d;
}

.planner-title {
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.planner-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  height: 350px;
  width: 540px;
  overflow: scroll;
  justify-content: center;
}

.planner-container::-webkit-scrollbar {
  width: 10px;
  height: 0;
}

.planner-container::-webkit-scrollbar-thumb {
  background-color: #ffe18e;
  /* 스크롤바 색상 */
  border-radius: 5px;
  /* 스크롤바 모서리의 곡률 */
}

.planner-container::-webkit-scrollbar-thumb:active {
  background-color: #FFC930;
  /* 스크롤바 색상 */
}

::-webkit-scrollbar-track {
  background-color: #fff4d7;
  /* 트랙 배경색 */
}

.planner-list {
  margin-top: 30px;
  caret-color: transparent;
  user-select: none;
  cursor: pointer;
  margin-left: 30px;
  margin-right: 30px;
}

.attraction-area {
  width: 540px;
  height: 350px;
  margin-left: 30px;
  margin-top: 30px;
  /* background-color: #ffffff; */
  border-radius: 18px;
}

.title-container {
  margin-top: 30px;
  margin-left: 40px;
  font-family: 'CookieRun-Bold';
  color: #383838;
  font-size: 30px;
  margin-bottom: -30px;
  caret-color: transparent;
  user-select: none;
  pointer-events: none;
}

button {
  background-color: #ffecb9;
  border: 2px solid #ffc930;
  border-radius: 5px;
  margin-left: 450px;
  margin-bottom: 10px;
  cursor: pointer;
  font-family: 'CookieRun-Regular';
  color: #383838;
  font-size: 1rem;
  box-shadow: 3px 3px 2px 2px rgba(216, 182, 182, 0.5);
}

button:active {
  box-shadow: inset 3px 3px 2px 2px rgba(216, 182, 182, 0.5);
  transform: scale(0.9);
  transition: 0.2s;
}

.vc-container {
  border: 0px solid #ffc930 !important;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 18px !important;
  font-family: 'CookieRun-Regular';
  color: #3b3b3b;
  font-size: 1.2rem;
  box-shadow: 5px 5px 5px 2px rgba(216, 204, 182, 0.5);
}

.calndar-area {
  width: 540px;
  margin-left: 30px;
  margin-top: 30px;
  caret-color: transparent;
  user-select: none;
}
.vc-day-content {
  width: 50px !important;
}
.image-container {
  position: relative;
  width: 200px;
  padding-top: 70%;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 2px 4px 5px rgba(85, 85, 85, 0.5);
}
.image-container > img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.2s ease;
}
.image-container:hover > img {
  width: 110%;
  height: 110%;
}

/* .attractionImg:active {
  transform: scale(0.9);
  transition: 0.2s;
} */

.delete-button {
  position: absolute;
  top: 0;
  right: 0;
  height: 30px;
  width: 30px;
  background-color: transparent;
  color: rgb(255, 255, 255);
  border: none;
  cursor: pointer;
  box-shadow: none;
}
.delete-button:hover {
  color: #ff6464;
  box-shadow: none;
}
</style>
