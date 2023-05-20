<template>
  <div>
    <div class="title-container">
      <span>나의 여행계획</span>
    </div>
    <div class="calndar-area">
      <button @click="setToday">TODAY</button>
      <v-calendar is-expanded :attributes='attributes' :from-date="fromDate"> </v-calendar>
    </div>
    <div class="attraction-area">
      <div class="planner-container">
        <div v-for="(planner, index) in planners" :key="index" class="planner-list">
          <div>
            <img class="attractionImg" :src="planner.image || defaultImage" :alt="planner.title"
              @click="goToAttractionDetail(attraction)" />
          </div>
          <div class="attraction-info">
            <div class="planner-title">
              <span>{{ planner.title }}</span>
            </div>
            <div class="planner-date">
              <span>{{ planner.startDate }} - {{ planner.endDate }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VCalendar from 'v-calendar/lib/components/calendar.umd'
export default {
  components: {
    VCalendar,
  },
  methods: {
    setToday() {
      this.fromDate = new Date(); // fromDate을 현재 날짜로 설정
    },

    goToAttractionDetail(attraction) {
      sessionStorage.setItem("contentId", attraction.contentId);
      sessionStorage.setItem("contentTitle", attraction.title);
      this.$router.push({
        name: "attractionDetail",
      });
    },
  },
  data() {
    const todos = [
      {
        description: '부산여행',
        dates: [
          { start: new Date(2023, 4, 14), end: new Date(2023, 4, 18) }
        ],
        color: 'green',
      },
      {
        description: '제주도여행',
        dates: [
          { start: new Date(2023, 4, 15), end: new Date(2023, 4, 20) }
        ],
        color: 'red',
      },
      {
        description: '서울여행',
        dates: [
          { start: new Date(2023, 4, 15), end: new Date(2023, 4, 20) }
        ],
        color: 'blue',
      },
    ];
    return {
      incId: todos.length,
      todos,
      fromDate: new Date(), // 현재 날짜로 초기화된 fromDate
      planners: [
        {
          "planId": 18,
          "title": "서울여행",
          "image": "http://tong.visitkorea.or.kr/cms/resource/50/2844950_image2_1.jpg",
          "startDate": "2023-05-01",
          "endDate": "2023-05-02",
          "viewCount": 0,
          "likeCount": 0
        },
        {
          "planId": 35,
          "title": "충청남도",
          "image": "http://tong.visitkorea.or.kr/cms/resource/08/2766408_image2_1.jpg",
          "startDate": "2023-05-20",
          "endDate": "2023-05-21",
          "viewCount": 0,
          "likeCount": 0
        },
        {
          "planId": 36,
          "title": "충청남도",
          "image": "http://tong.visitkorea.or.kr/cms/resource/15/2839115_image2_1.jpg",
          "startDate": "2023-05-20",
          "endDate": "2023-05-22",
          "viewCount": 0,
          "likeCount": 0
        },
        {
          "planId": 37,
          "title": "부산",
          "image": "http://tong.visitkorea.or.kr/cms/resource/64/2759664_image2_1.jpg",
          "startDate": "2023-05-20",
          "endDate": "2023-05-22",
          "viewCount": 0,
          "likeCount": 0
        },
        {
          "planId": 39,
          "title": "광주",
          "image": "http://tong.visitkorea.or.kr/cms/resource/96/2664896_image2_1.jpg",
          "startDate": "2023-05-20",
          "endDate": "2023-05-21",
          "viewCount": 0,
          "likeCount": 0
        },
        {
          "planId": 41,
          "title": "제주도",
          "image": "http://tong.visitkorea.or.kr/cms/resource/99/2850099_image2_1.JPG",
          "startDate": "2023-05-20",
          "endDate": "2023-05-22",
          "viewCount": 0,
          "likeCount": 0
        },
        {
          "planId": 41,
          "title": "제주도",
          "image": "http://tong.visitkorea.or.kr/cms/resource/99/2850099_image2_1.JPG",
          "startDate": "2023-05-20",
          "endDate": "2023-05-22",
          "viewCount": 0,
          "likeCount": 0
        },
        {
          "planId": 41,
          "title": "제주도",
          "image": "http://tong.visitkorea.or.kr/cms/resource/99/2850099_image2_1.JPG",
          "startDate": "2023-05-20",
          "endDate": "2023-05-22",
          "viewCount": 0,
          "likeCount": 0
        },

      ],
    };
  },
  computed: {
    attributes() {
      return [
        // Attributes for todos
        ...this.todos.map(todo => ({
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
}
</script>

<style scoped>
.attractionImg {
  width: 200px;
  height: 140px;
  border-radius: 10px;
  box-shadow: 2px 4px 5px rgba(85, 85, 85, 0.5);
  /* 그림자 스타일 및 값 설정 */
}
.attractionImg:hover {
  transform: scale(1.1);
  filter: brightness(60%);
  transition: 0.2s;
}

.attractionImg:active {
  transform: scale(0.9);
  transition: 0.2s;
}
.planner-date{
  font-size: 15px;
  font-family: "CookieRun-Regular";
  color: #808080;
}
.planner-title span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 20px;
  font-family: "CookieRun-Bold";
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
  border-radius: 18px
}

.title-container {
  margin-top: 30px;
  margin-left: 40px;
  font-family: "CookieRun-Bold";
  color: #383838;
  font-size: 30px;
  margin-bottom: -30px;
  caret-color: transparent;
  user-select: none;
  pointer-events: none;
}

button {
  background-color: #ffecb9;
  border: 2px solid #FFC930;
  border-radius: 5px;
  margin-left: 450px;
  margin-bottom: 10px;
  cursor: pointer;
  font-family: "CookieRun-Regular";
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
  border: 0px solid #FFC930 !important;
  background-color: #ffe294;
  padding: 10px;
  border-radius: 18px !important;
  font-family: "CookieRun-Regular";
  color: #3b3b3b;
  font-size: 1.2rem;
  box-shadow: 5px 5px 5px 2px rgba(216, 204, 182, 0.5);
}

.calndar-area {
  width: 540px;
  margin-left: 30px;
  margin-top: 30px;
}
</style>