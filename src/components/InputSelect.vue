<template>
  <select  @change="handleSelect">
    <option v-for="item in list" :key="item.name" :value="item.value" :selected="item.name == 'India'">
      {{ item.name }}
    </option>
  </select>
</template>

<script>
export default {
  props: ["list","select", "handleSelect"],
};
</script>