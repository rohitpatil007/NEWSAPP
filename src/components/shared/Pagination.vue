<template>
  <div class="pagination-btn">
    <button :disabled="getPage == 1" @click="changePage(-1)">Previous</button>
    <button :disabled="getPage == getMaxPage" @click="changePage(1)">Next</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["changePage"],
  computed: {
    ...mapGetters(["getPage", "getMaxPage"]),
  },
};
</script>

<style lang="scss" scoped>
.pagination-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  padding: 0 10%;
  margin: 20px 0;
  width: 100%;
  button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  }
}
</style>