<template>
  <div class="bg-opacity-10 bg-white py-1">
    <p class="text-gray-400 text-sm font-bold">
      &copy; <a href="mailto:glatocha@gmail.com">Grzegorz Latocha</a> @2020-2023 - powered by
      <a href="https://supabase.com/" target="blank">Supabase</a>. Utilizing
      <a :class="hljs_class" href="https://highlightjs.org/" target="blank">highlight.js</a>
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
var counter = 0;
const hljs_class = ref("hljs-comment");
const hljs_classes = [
  "hljs-comment",
  "hljs-attr",
  "hljs-attribute",
  "hljs-name",
  "hljs-selector-class",
  "hljs-link",
  "hljs-meta",
  "hljs-literal",
  "hljs-code",
  "hljs-meta",
  "hljs-deletion",
  "hljs-addition",
];
setInterval(() => {
  counter++;
  if (counter > 11) {
    counter = 0;
  }
  hljs_class.value = hljs_classes[counter];
}, 1000);
</script>

<style scoped></style>
