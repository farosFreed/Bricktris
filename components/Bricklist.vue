<template>
  <ul>
    <li
      v-for="item in list"
      class="item"
      :key="item.id"
      @click="$emit('toggleModal', item)"
    >
      <img :src="item.image" :alt="item.alt" />
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
  methods: {},
};
</script>

<style lang="scss" scoped>
$spacer: 10px;
$border-radius: 5px;
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
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
</style>
