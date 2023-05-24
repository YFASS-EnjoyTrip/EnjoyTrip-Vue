<template>
  <div>
    <div class="event-img">
      <transition name="bounce">
        <div v-if="show">
          <img src="https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/Event.jpg" alt />
        </div>
      </transition>
    </div>
    <div class="event-title">❤️대전6반이 최고야!❤️</div>
  </div>
</template>

<script>
import confetti from 'canvas-confetti';
export default {
  data() {
    return {
      colors: ['#69beee', '#FFC930', '#49C46F', '#F24849'],
      show: false,
    };
  },
  mounted() {
    this.frame();
    this.show = true;
  },
  methods: {
    frame() {
      const duration = 2000; // 원하는 유지 시간 (밀리초 단위)
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;

        confetti({
          particleCount: 20,
          angle: 60,
          spread: 500,
          origin: { x: 0 },
          colors: this.colors,
        });
        confetti({
          particleCount: 20,
          angle: 120,
          spread: 500,
          origin: { x: 1 },
          colors: this.colors,
        });

        if (elapsed < duration) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    },
  },
};
</script>

<style scoped>
.event-title {
  margin-top: 30px;
  text-align: center;
  font-family: 'CookieRun-Black';
  color: #575757;
  font-size: 70px;
}
.bounce-enter-active {
  animation: bounce-in 0.7s;
}
.bounce-leave-active {
  animation: bounce-in 0.7s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}
.event-img {
  margin-top: 20px;
  text-align: center;
}
img {
  border-radius: 50px;
  width: 800px;
  border: 10px solid #f24849;
}
</style>