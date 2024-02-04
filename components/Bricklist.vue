<template>
  <div :class="['bricklist', !collapse ? 'show' : '']">
    <div class="animation-wrapper">
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
  </div>
</template>

<script lang="ts">
export default {
  props: {
    list: {
      type: Array<ListItem>,
      required: true,
    },
    collapse: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
// animation trick without set height for mobile UIs with limit vertical space
// https://keithjgrant.com/posts/2023/04/transitioning-to-height-auto/
@media (max-width: $max-width) and (orientation: portrait) {
  .bricklist {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 2s ease-out;
    max-width: 300px;
    margin: 0 auto;
    &.show {
      grid-template-rows: 1fr;
    }
    .animation-wrapper {
      overflow: hidden;
    }
  }
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  border: $button-border;
  border-radius: $border-radius $border-radius 0 0;
  li.item {
    padding: $spacer;
    background-color: $button-background;
    color: $button-text-color;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:first-child {
      border-radius: $border-radius $border-radius 0 0;
    }
    &:not(:last-child) {
      border-bottom: $button-border;
      border-color: $button-border-color;
    }
  }
}
.addItemBtn {
  width: 100%;
  border: $button-border;
  border-radius: 0 0 $border-radius $border-radius;
  border-top: none;
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
  background: url(/images/Z.svg) no-repeat center center;
  background-size: contain;
  filter: $Z-tetromino-filter;
}
.tetromino.I {
  height: 36px;
  background: url(/images/I.svg) no-repeat center center;
  background-size: contain;
  filter: $I-tetromino-filter;
}
.tetromino.L {
  background: url(/images/L.svg) no-repeat center center;
  background-size: contain;
  filter: $L-tetromino-filter;
}
.tetromino.O {
  background: url(/images/O.svg) no-repeat center center;
  background-size: contain;
  filter: $O-tetromino-filter;
}
.tetromino.T {
  background: url(/images/T.svg) no-repeat center center;
  background-size: contain;
  filter: $T-tetromino-filter;
}
.tetromino.S {
  background: url(/images/S.svg) no-repeat center center;
  background-size: contain;
  filter: $S-tetromino-filter;
}
.tetromino.J {
  background: url(/images/J.svg) no-repeat center center;
  background-size: contain;
  filter: $J-tetromino-filter;
}
</style>
