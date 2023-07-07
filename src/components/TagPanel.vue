<template>
  <div class="py-1 flex flex-row items-center px-0 m-2 bg-background rounded-md flex-wrap">
    <h2
      v-for="tag in tags"
      :key="tag"
      class="p-1 text-primary-light bg-primary m-1 font-bold rounded-xl cursor-pointer"
      @click.prevent="tagSelect(tag)"
    >
      {{ tag }}
    </h2>
  </div>
</template>

<script>
// import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    tags: Array,
  },
  setup() {
    const store = useStore();

    function tagSelect(tag) {
      console.log("tag :>> ", tag);
      store.dispatch("setForcedTagSearch", tag);
    }

    return { tagSelect };
  },
};
</script>

<style></style>
