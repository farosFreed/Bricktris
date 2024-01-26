<template>
  <div class="keypad">
    <button
      class="square-button"
      @click="$emit('handleKeyPress', keyLeftEvent)"
    >
      &#8249;
    </button>
    <button class="circle-button" @click="$emit('handleKeyPress', keyUpEvent)">
      &#8634;
    </button>
    <button
      class="square-button"
      @click="$emit('handleKeyPress', keyRightEvent)"
    >
      &#8250;
    </button>
    <button class="arrow-button" @click="$emit('handleKeyPress', keyDownEvent)">
      &#8595;
    </button>
  </div>
</template>

<script>
export default {
  name: "Keypad",
  data() {
    return {
      keyLeftEvent: new KeyboardEvent("keydown", { key: "ArrowLeft" }),
      keyRightEvent: new KeyboardEvent("keydown", { key: "ArrowRight" }),
      keyDownEvent: new KeyboardEvent("keydown", { key: "ArrowDown" }),
      keyUpEvent: new KeyboardEvent("keydown", { key: "ArrowUp" }),
    };
  },
};
</script>

<style lang="scss" scoped>
$button-size: 50px;
$spacer: 10px;
$border-radius: 5px;
.keypad {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: $spacer;
  margin-bottom: $spacer;
}

button {
  height: $button-size;
  border-radius: $border-radius;
}

.square-button {
  background-color: lightgrey;
}

.circle-button {
  width: $button-size;
  justify-self: center;
  background-color: red;
  border-radius: 50%;
}

.arrow-button {
  grid-column-start: span 3;
  background-color: #ccc;
}
</style>
