<template>
  <div class="p-1 flex flex-row items-center m-0 bg-background rounded-md">
    <input
      class="p-1 m-1 rounded-md w-full text-primary font-bold bg-gray-700 focus:outline-none focus:shadow-outline focus:bg-white focus:border-primary"
      type="text"
      placeholder="search for tags.."
      v-model.trim="tagInput"
    />
    <font-awesome-icon
      class="cursor-pointer mx-1 h-6 text-gray-700 hover:scale-110 hover:text-white"
      title="Clear"
      icon="broom"
      @click="tagInput = ''"
    />
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const tagInput = ref();
    const tagsList = computed(() => store.getters.tags);
    const forcedTagSearch = computed(() => store.getters.forcedTagSearch);
    var searched = [];

    watch(forcedTagSearch, (newValue, oldValue) => {
      if (newValue) {
        tagInput.value = newValue;
      }
    });

    watch(tagInput, (newValue, oldValue) => {
      searched = [];
      store.dispatch("setForcedTagSearch", null);
      if (newValue) {
        Object.keys(tagsList.value).forEach((tag) => {
          if (tag.toLowerCase().includes(tagInput.value.toLowerCase())) {
            searched.push(...tagsList.value[tag]);
          }
        });
        // console.log([...new Set(searched)]);
      }
      store.dispatch("setSearchResults", [...new Set(searched)]);
    });

    return { tagInput };
  },
};
</script>

<style></style>
