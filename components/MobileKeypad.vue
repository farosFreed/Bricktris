<template>
  <div class="keypad" :style="{ width: width + 'px' }">
    <button
      class="square-button"
      aria-label="move piece left"
      @click="$emit('handleKeyPress', keyLeftEvent)"
    >
      <Icon name="carbon:arrow-left" />
    </button>
    <button
      class="circle-button"
      aria-label="rotate piece"
      @click="$emit('handleKeyPress', keyUpEvent)"
    >
      <Icon name="carbon:rotate-360" />
    </button>
    <button
      class="square-button"
      aria-label="rotate piece"
      @click="$emit('handleKeyPress', keyRightEvent)"
    >
      <Icon name="carbon:arrow-right" />
    </button>
    <button
      class="arrow-button"
      aria-label="move piece right"
      @click="$emit('handleKeyPress', keyDownEvent)"
    >
      <Icon name="carbon:arrow-down" />
    </button>
  </div>
</template>

<script lang="ts">
export default {
  name: "MobileKeypad",
  props: {
    width: {
      type: Number,
    },
  },
  data() {
    return {
      keyLeftEvent: null as KeyboardEvent | null,
      keyRightEvent: null as KeyboardEvent | null,
      keyDownEvent: null as KeyboardEvent | null,
      keyUpEvent: null as KeyboardEvent | null,
    };
  },
  mounted() {
    this.keyLeftEvent = new KeyboardEvent("keydown", { key: "ArrowLeft" });
    this.keyRightEvent = new KeyboardEvent("keydown", { key: "ArrowRight" });
    this.keyDownEvent = new KeyboardEvent("keydown", { key: "ArrowDown" });
    this.keyUpEvent = new KeyboardEvent("keydown", { key: "ArrowUp" });
  },
};
</script>

<style lang="scss" scoped>
$button-size: 40px;
.keypad {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: $spacer;
  margin: $spacer auto;
}

button {
  height: $button-size;
  border: $button-border;
  border-radius: $border-radius;
}

.square-button {
  background-color: $button-background;
}

.circle-button {
  width: $button-size;
  justify-self: center;
  background-color: darken($button-background, 10%);
  border-radius: 50%;
}

.arrow-button {
  grid-column-start: span 3;
  background-color: $button-background;
}
</style>
