<template>
  <div class="pomodoro">
    <div class="timer">{{ formatTime }}</div>
    <button v-if="time > 0" @click="toggleTimer" class="toggle-button small">
      {{ isPaused ? "Start" : "Pause" }}
    </button>
  </div>
</template>

<script lang="ts">
export default {
  name: "Timer",
  data() {
    return {
      time: 1200, // 20 minutes in seconds
      isPaused: true,
      intervalId: null as NodeJS.Timeout | null,
      sound: null as HTMLAudioElement | null,
    };
  },
  computed: {
    formatTime() {
      const minutes = Math.floor(this.time / 60);
      const seconds = this.time % 60;
      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    },
  },
  methods: {
    toggleTimer() {
      if (this.isPaused) {
        this.startTimer();
      } else {
        this.pauseTimer();
      }
    },
    startTimer() {
      this.isPaused = false;
      this.intervalId = null;
      this.intervalId = setInterval(() => {
        if (this.time > 0) {
          this.time--;
        } else {
          this.pauseTimer();
          this.playSound();
        }
      }, 1000);
    },
    pauseTimer() {
      this.isPaused = true;
      clearInterval(this.intervalId);
    },
    playSound() {
      this.sound!.play();
    },
  },
  mounted() {
    this.sound = new Audio("/sounds/ding.mp3");
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
    this.sound!.remove();
  },
};
</script>

<style lang="scss" scoped>
.pomodoro {
  text-align: center;
  .timer {
    font-size: 2rem;
  }
  button {
    margin-bottom: calc($spacer * 2);
  }
}
</style>
