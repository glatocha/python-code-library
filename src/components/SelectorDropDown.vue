<template>
  <select
    @change="selectItem()"
    name="dropDownSelector"
    id="dropDownSelector"
    v-model="selItem"
  >
    <option hidden>Select the snippet</option>
    <option v-for="(item, index) in listOfItems" :key="index" :value="item">
      {{ item.title }}
    </option>
  </select>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const selItem = ref("init value");

    const listOfItems = computed(() => store.getters.items);
    // console.log("list :>> ", listOfItems);

    function selectItem() {
      //   console.log("Select item fired - " + selItem.value);
      store.dispatch("setSelectedItem", selItem.value);
    }

    return { listOfItems, selectItem, selItem };
  },
};
</script>

<style></style>
