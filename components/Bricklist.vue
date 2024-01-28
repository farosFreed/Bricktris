<template>
  <div>
    <ul>
      <li
        v-for="item in list"
        class="item"
        :key="item.name"
        @click="$emit('toggleModal', item)"
      >
        <div :class="['tetromino', item.shape]"></div>
        {{ item.name }}
        <button
          class="removeItemBtn"
          @click="
            (e) => {
              e.stopPropagation();
              $emit('removeListItem', item);
            }
          "
        >
          <Icon name="carbon:trash-can" />
        </button>
      </li>
    </ul>
    <button class="addItemBtn primary-btn" @click="$emit('newListItem')">
      <Icon name="carbon:add" /> Add Item
    </button>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    list: {
      type: Array<ListItem>,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  li.item {
    padding: $spacer;
    margin-bottom: $spacer;
    border: $button-border;
    border-radius: $border-radius;
    background-color: $button-background;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.addItemBtn {
  width: 100%;
  border: $button-border;
  border-radius: $border-radius;
  margin-bottom: $spacer;
}
.removeItemBtn {
  border: none;
  background: none;
  padding: 5px 5px 6px 5px;
  border-radius: $border-radius;
  margin: 0;
  cursor: pointer;
  &:hover {
    background: $primary-button-background;
    color: $primary-button-color;
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
.tetromino.S {
  background: url(images/S.svg) no-repeat center center;
  background-size: contain;
  filter: $S-tetromino-filter;
}
.tetromino.J {
  background: url(images/J.svg) no-repeat center center;
  background-size: contain;
  filter: $J-tetromino-filter;
}
</style>
