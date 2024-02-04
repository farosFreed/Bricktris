<template>
  <div class="query-content">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <ul>
        <li v-for="ship in data.ships" :key="ship.id">
          {{ ship.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "DataComponent",
  data() {
    return {
      loading: false,
      error: null,
      data: { ships: [] },
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;

      const query = gql`
        query getShips($limit: Int!) {
          ships(limit: $limit) {
            id
            name
          }
        }
      `;
      const variables = { limit: 5 };
      const { data, error } = await useAsyncQuery(query, variables);

      if (data !== undefined && data !== null) {
        this.data = data;
      } else {
        this.error = error || "Error fetching data";
      }
      this.loading = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.query-content {
  @media (max-width: $max-width) {
    display: none;
  }
}
</style>
