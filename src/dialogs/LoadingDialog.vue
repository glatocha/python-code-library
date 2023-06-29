<template>
  <div
    class="bg-black opacity-50 h-full w-full fixed z-40 flex justify-center items-center"
  ></div>
  <div
    class="z-50 p-10 bg-white border-primary-dark border-2 rounded-lg"
    id="loading-container"
  >
    <div class="loading">
      <img src="../assets/briq_anim_T.gif" />
      <h5 :class="textClass" id="loadingText">
        {{ text }}
      </h5>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    textClass: String,
  },
};
</script>

<style>
#loading-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.warning {
  color: rgb(183, 137, 10);
}

.alarm {
  color: red;
}

.info {
  color: theme("colors.primary.dark");
}
</style>
