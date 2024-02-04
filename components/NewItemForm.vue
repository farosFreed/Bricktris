<template>
  <div>
    <form @submit.prevent="submitForm">
      <label for="name">Name:</label>
      <input
        type="text"
        id="name"
        v-model="name"
        placeholder="what do you want to do?"
      />

      <label for="shape">Tetromino Shape:</label>
      <select id="shape" v-model="shape">
        <option value="Z" selected>random</option>
        <option value="I">I</option>
        <option value="J">J</option>
        <option value="L">L</option>
        <option value="O">O</option>
        <option value="S">S</option>
        <option value="T">T</option>
        <option value="Z">Z</option>
      </select>

      <button class="primary-btn" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "NewItemForm",
  data() {
    return {
      name: "",
      shape: "",
    };
  },
  methods: {
    async submitForm(e) {
      e.preventDefault();
      // handle random
      if (this.shape === "random") {
        const shapes = ["I", "J", "L", "O", "S", "T", "Z"];
        this.shape = shapes[Math.floor(Math.random() * shapes.length)];
      }
      this.$emit("submitForm", {
        name: this.name,
        shape: this.shape,
      });
      // reset form
      this.name = "";
      this.shape = "";
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  gap: $spacer;
  text-align: left;
  label {
    font-weight: bold;
    margin-bottom: calc($spacer/-1.5);
  }
  input,
  select {
    padding: $spacer;
    border-radius: $border-radius;
    font-size: large;
  }
}
</style>
