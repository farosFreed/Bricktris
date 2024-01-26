<template>
  <ul>
    <li
      v-for="item in list"
      class="item"
      :key="item.id"
      @click="$emit('toggleModal', item)"
    >
      <div :class="['tetromino', item.shape]"></div>
      {{ item.name }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  li.item {
    padding: $spacer;
    margin-bottom: $spacer;
    border: 1px solid black;
    border-radius: $border-radius;
    background-color: lightgray;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.tetromino {
  width: 24px;
  height: 24px;
}
.tetromino.Z {
  background: url(images/Z.svg) no-repeat center center;
  background-size: contain;
  filter: $Z-tetromino-filter;
}
.tetromino.I {
  height: 36px;
  background: url(images/I.svg) no-repeat center center;
  background-size: contain;
  filter: $I-tetromino-filter;
}
.tetromino.L {
  background: url(images/L.svg) no-repeat center center;
  background-size: contain;
  filter: $L-tetromino-filter;
}
.tetromino.O {
  background: url(images/O.svg) no-repeat center center;
  background-size: contain;
  filter: $O-tetromino-filter;
}
.tetromino.T {
  background: url(images/T.svg) no-repeat center center;
  background-size: contain;
  filter: $T-tetromino-filter;
}
</style>
