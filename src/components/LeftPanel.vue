<template>
  <div class="p-2 text-left">
    <ul class="overflow-auto h-full">
      <li
        class="border-b cursor-pointer pt-1 mr-1 group"
        v-for="(item, index) in listOfItems"
        :key="index"
        @click="selectItem(item)"
      >
        <span
          class="pl-0 group-hover:pl-2"
          :class="{ searched: searchResults.includes(item.id) }"
          >{{ item.title }}</span
        >
      </li>
    </ul>
    <tag-search-panel />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import TagSearchPanel from "./TagSearchPanel.vue";

export default {
  components: { TagSearchPanel },
  setup() {
    const store = useStore();

    const listOfItems = computed(() => store.getters.items);
    const searchResults = computed(() => store.getters.searchResults);
    console.log("list :>> ", listOfItems);

    function selectItem(item) {
      store.dispatch("setSelectedItem", item);
    }

    return { listOfItems, searchResults, selectItem };
  },
};
</script>

<style>
.searched {
  color: theme("colors.primary.light");
}
</style>
