<template>
  <div
    class="flex flex-col sm:flex-row bg-opacity-70 bg-black w-11/12 max-w-screen-xl text-white m-5 rounded-lg border-primary-dark border-4 self-center overflow-x-hidden"
  >
    <left-panel
      class="hidden sm:flex box-border w-1/3 max-w-5xl flex flex-col"
    ></left-panel>
    <right-panel class="box-border w-full h-full sm:w-2/3"></right-panel>
  </div>
</template>

<script>
import LeftPanel from "./LeftPanel.vue";
import RightPanel from "./RightPanel.vue";
// import SelectorDropDown from "./SelectorDropDown.vue";

export default {
  components: {
    LeftPanel,
    RightPanel,
  },
};
</script>

<style scoped></style>
