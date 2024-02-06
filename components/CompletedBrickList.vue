<template>
  <div>
    <h3>Completed Tasks</h3>
    <ul v-if="itemList.length">
      <li
        v-for="item in itemList"
        :key="item"
        :style="{ textDecoration: 'line-through' }"
      >
        {{ item }}
      </li>
    </ul>
    <span v-if="!itemList.length" class="task-counter"
      >No completed tasks yet</span
    >
    <span v-if="itemList.length" class="task-counter"
      >{{ itemList.length }} tasks completed</span
    >
  </div>
</template>

<script>
export default {
  props: {
    itemList: {
      type: Array[String],
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
ul {
  text-align: left;
  color: $mid-bluegrey;
  max-height: 150px;
  overflow: scroll;
  padding: $spacer 0;
  margin: 0;
  border: 1px solid $mid-bluegrey;
  border-left: 0;
  border-right: 0;
}
.task-counter {
  color: $mid-bluegrey;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  display: block;
  text-align: center;
}
</style>
