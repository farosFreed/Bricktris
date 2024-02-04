<template>
  <div class="modal" :class="{ hidden: !show }">
    <div class="modal-content">
      <button
        class="close-button"
        aria-label="close modal"
        @click="$emit('closeModal')"
      >
        <Icon name="carbon:close-outline" />
      </button>
      <h2 v-if="title">{{ title }}</h2>
      <slot>
        <p>{{ text }}</p>
        <!-- todo add timer -->
        <button class="primary-btn" @click="completeTask">
          <Icon name="carbon:checkmark" /> Complete Task
        </button>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      required: true,
    },
    shape: {
      type: String,
      required: true,
    },
  },
  methods: {
    completeTask() {
      // spawn shape if there is one
      if (this.shape) {
        this.$emit("spawnTetromino", this.shape);
      }
      this.$emit("closeModal");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 100;
  &.hidden {
    display: none;
  }
  .modal-content {
    position: absolute;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    width: 80vw;
    max-width: $max-width;
    .close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      color: $button-border-color;
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
    }
  }
}
</style>
