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

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
}
li.item {
  padding: 10px;
  margin: 10px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: lightgray;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
