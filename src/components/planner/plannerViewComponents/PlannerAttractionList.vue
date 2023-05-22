<template>
  <div>
    <div class="outer-container">
      <div class="attraction-list-container">
        <div v-if="editMode">
          <div v-if="!addItemMode">
            <draggable v-model="localAttractions" class="attraction-list" :move="checkMove" @end="updateAttractions">
              <!-- 드래그 앤 드롭 기능을 적용할 요소들의 내용 -->
              <div
                v-for="(attraction, index) in localAttractions"
                :key="index"
                class="attraction-list-item"
                @click="handleAttractionClick(attraction)"
              >
                <div class="checkbox-container">
                  <input
                    class="checkbox"
                    type="checkbox"
                    name="attractions"
                    id="check"
                    :value="index + 1"
                    v-model="selectedAttractions"
                  />
                </div>
                <label for="check"></label>
                <div class="attraction-order">{{ index + 1 }}</div>
                <div class="attraction-img">
                  <img class="attractionImg" :src="attraction.image || defaultImage" alt="사진" />
                </div>
                <div class="attraction-container">
                  <div class="attraction-info">
                    <div class="attraction-name">
                      {{ attraction.title }}
                      <div class="like-rank-container">
                        <div class="like-rank-inner">
                          <span>
                            <img src="@/assets/img/icon/heart_fill.png" alt="좋아요" />
                            <span>{{ attraction.likeCount }}</span>
                          </span>
                          <span>
                            <img src="@/assets/img/icon/star_fill.png" alt="별점" />
                            <span>{{ calculateRate }}</span>
                            <span>({{ attraction.totalCount }})</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </draggable>
          </div>
          <div v-else>
            <planner-attraction-add
              :sidoCode="sidoCode"
              @attractionClicked2="handleAttractionClick2"
            ></planner-attraction-add>
          </div>
        </div>
        <div v-else>
          <div
            v-for="(attraction, index) in localAttractions"
            :key="index"
            class="attraction-list-item"
            @click="handleAttractionClick(attraction)"
          >
            <div class="attraction-order">{{ index + 1 }}</div>
            <div class="attraction-img">
              <img class="attractionImg" :src="attraction.image || defaultImage" alt="사진" />
            </div>
            <div class="attraction-container">
              <div class="attraction-info">
                <div class="attraction-name">
                  {{ attraction.title }}
                  <div class="like-rank-container">
                    <div class="like-rank-inner">
                      <span>
                        <img src="@/assets/img/icon/heart_fill.png" alt="좋아요" />
                        <span>{{ attraction.likeCount }}</span>
                      </span>
                      <span>
                        <img src="@/assets/img/icon/star_fill.png" alt="별점" />
                        <span>{{ attraction.rate }}</span>
                        <span>({{ attraction.likeCount }})</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 날짜이동 모달 -->
    <div v-if="showChangeModal" class="change-modal">
      <div class="change-modal-content">
        <label for="daySelect">이동할 날짜를 선택해주세요.</label>
        <select class="daySelect" id="daySelect" v-model="targetDay">
          <option disabled value>일차</option>
          <option v-for="day in localPlan.length" :key="day" :value="day">{{ day }}</option>
        </select>
        <div class="modal-container">
          <div class="modal-cancel-button" @click="showChangeModal = false">취소</div>
          <div class="modal-confirm-button" @click="changeItem">확인</div>
        </div>
      </div>
    </div>
    <!---->
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import PlannerAttractionAdd from './PlannerAttractionAdd.vue';

export default {
  name: 'PlannerAttractionList',
  components: {
    draggable,
    PlannerAttractionAdd,
  },
  data() {
    return {
      defaultImage: 'https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/Attraction_default.png',
      localPlan: [],
      localAttractions: [],
      selectedAttractions: [],
      showChangeModal: false,
      targetDay: '',
    };
  },
  props: {
    selectedDay: {
      type: Number,
      required: true,
    },
    attractions: {
      type: Array,
      required: true,
    },
    editMode: {
      type: Boolean,
      required: true,
    },
    addItemMode: {
      type: Boolean,
      required: true,
    },
    sidoCode: {
      type: Number,
      required: true,
    },
  },

  computed: {
    calculateRate() {
      if (this.attraction.rate && this.attraction.totalCount && this.attraction.totalCount != 0) {
        let rate = this.attraction.rate / this.attraction.totalCount;
        return parseFloat(rate.toFixed(1));
      } else {
        return 0;
      }
    },
  },

  watch: {
    editMode() {
      if (this.editMode == false) {
        this.updatePlanner();
      }
    },
    attractions: {
      immediate: true,
      handler() {
        if (this.attractions !== undefined) {
          this.localPlan = this.attractions;
          this.initializeLocalAttractions();
        }
      },
    },
    selectedDay() {
      this.initializeLocalAttractions();
    },
  },

  mounted() {},

  methods: {
    initializeLocalAttractions() {
      this.localAttractions = this.localPlan[this.selectedDay - 1];
    },

    handleAttractionClick(attraction) {
      this.$emit('attractionClicked', attraction);
    },

    handleAttractionClick2(attraction) {
      this.localAttractions = [...this.localAttractions, attraction];
      this.updateAttractions();
      this.$emit('addAttraction');
    },

    checkMove() {
      return true;
    },

    updateAttractions() {
      this.localPlan[this.selectedDay - 1] = this.localAttractions;
    },

    updatePlanner() {
      this.$emit('updatePlan', this.localPlan);
    },

    removeItem() {
      console.log(this.selectedAttractions.length);
      const sortedSelectedAttractions = [...this.selectedAttractions].sort((a, b) => b - a);

      sortedSelectedAttractions.forEach((index) => {
        this.localAttractions.splice(index - 1, 1);
      });
      this.selectedAttractions = [];
      this.updateAttractions();
    },

    openChangeModal() {
      this.showChangeModal = true;
    },

    changeItem() {
      if (this.targetDay === '') {
        alert('유효하지 않은 날짜입니다. 다시 시도해주세요.');
        return;
      }

      const sortedSelectedAttractions = [...this.selectedAttractions].sort((a, b) => b - a);

      sortedSelectedAttractions.forEach((index) => {
        const itemToMove = this.localAttractions.splice(index - 1, 1)[0];
        this.localPlan[this.targetDay - 1].push(itemToMove);
      });

      this.selectedAttractions = [];
      this.updateAttractions();
      this.showChangeModal = false;
      this.targetDay = '';
    },
  },
};
</script>

<style scoped>
.modal-container {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
.modal-container div {
  margin: 10px;
  font-family: 'CookieRun-Regular';
  font-size: 20px;
  width: 70px;
  height: 30px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  cursor: pointer;
}
.modal-container div:hover {
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.4);
}
.modal-container div:active {
  transform: scale(0.9);
  transition: 0.2s;
}
.modal-confirm-button {
  background-color: #49c46f;
  color: #ffffff;
}
.modal-cancel-button {
  background-color: #fe646f;
  color: #fff3f4;
}
.daySelect {
  margin-top: 15px;
  border: 2px solid #c4c4c4;
  border-radius: 8px;
  outline: none;
  font-size: 20px;
  text-indent: 10px;
  font-family: 'CookieRun-Regular';
  color: #aaaaaa;
  text-align: center;
  margin-right: 10px;
  width: 100px;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}
.change-modal {
  display: flex;
  position: absolute;
  margin-top: -200px;
  margin-left: 70px;
  width: 400px;
  height: 100px;
  background-color: #555555dc;
  padding-top: 20px;
  padding-bottom: 50px;
  border-radius: 20px;

  font-family: 'CookieRun-Regular';
  font-size: 25px;
  color: #ffffff;
  text-align: center;
}

.checkbox {
  width: 20px;
}
.checkbox-container {
  display: flex;
  justify-content: center;
  margin-left: 20px;
  margin-right: -10px;
}

.outer-container {
  height: 480px;
  display: flex;
  justify-content: center;
}

.attraction-order {
  font-family: 'CookieRun-Black';
  font-size: 1.1rem;
  color: #fe646f;
  align-items: center;
  margin-top: 1.3em;
  margin-right: 20px;
  margin-left: 2em;
}

.attraction-list {
  /* background-color: rgb(255, 255, 255);
    display: flex;
    width: 500px;
    height: 80px;
    border: 1px solid #69beee;
    border-radius: 17px;
    margin-top: 10px; */
}

.attraction-list-item {
  background-color: rgb(255, 255, 255);
  display: flex;
  width: 500px;
  height: 70px;
  border: 1px solid #69beee;
  border-radius: 17px;
  margin-top: 10px;
}

.attraction-list-item:hover {
  background-color: #fff3f4;
  border: 1px solid #fe646f;
  transition: 0.2s;
  cursor: pointer;
}

.attraction-list-item:hover .attraction-name {
  color: #fe646f;
  transition: 0.2s;
}

img {
  width: 15px;
  margin-top: 5px;
}

.attractionImg {
  width: 100px;
  height: 90%;
  border-radius: 10px;
}

.attraction-list-container {
  display: flex;
}

.attraction-container {
  width: 330px;
  height: 4.5rem;
  margin-left: 10px;
  margin-top: 5px;
}

.attraction-info {
  display: flex;
  overflow: hidden;
}

.attraction-name {
  font-family: 'CookieRun-Bold';
  font-size: 1.5rem;
  color: #696969;
  white-space: nowrap;
  /* 줄 바꿈 방지 */
  overflow: hidden;
  /* 넘친 부분 감추기 */
  text-overflow: ellipsis;
  /* 생략 부호 표시 */
}

.like-rank-container {
  font-family: 'CookieRun-Bold';
  font-size: 0.9rem;
  color: #8a8a8a;
  height: 30px;
  position: relative;
}

.like-rank-inner {
  display: flex;
  align-items: center;
  margin-top: 5px;
}

.attraction-desc-container {
  height: 50px;
  overflow: scroll;
}

.attraction-desc {
  font-family: 'CookieRun-Regular';
  font-size: 0.8rem;
  color: #696969;
}

::-webkit-scrollbar {
  width: 0;
}
</style>
