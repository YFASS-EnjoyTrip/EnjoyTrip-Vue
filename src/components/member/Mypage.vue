<template>
  <v-app class="main-container">
    <div class="my-container">
      <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn icon class="ma-2" @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-sheet height="450" width="700" class="v-sheet">
        <v-calendar
          class="calendar"
          ref="calendar"
          v-model="value"
          type="month"
          :events="events"
          :event-color="getEventColor"
          color="#F24849"
          event-text-color="#3D3D3D"
          @change="getEvents"
        ></v-calendar>
      </v-sheet>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "MyPage",
  data() {
    return {
      value: "",
      events: [],
      colors: ["#69BEEE", "#49C46F", "#ffbb00", "#ff9090"],
      names: ["PTO", "Travel", "Event", "Birthday", "Conference", "Party"],
    };
  },
  methods: {
    getEvents({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
        });
      }

      this.events = events;
    },
    getEventColor(event) {
      return event.color;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
};
</script>

<style scoped>
.calendar {
  background-color: #ffffff;
  border-radius: 18px;
  padding: 3px;
  box-shadow: 4px 4px 4px rgba(73, 73, 73, 0.2);
}
.main-container {
  max-height: 800px;
  background-color: transparent;
}
.my-container {
  width: 1200px;
  height: 800px;
  background-color: rgb(255, 255, 255);
  border-radius: 90px;
  box-shadow: 0 2px 4px rgba(73, 73, 73, 0.2);
}
</style>
