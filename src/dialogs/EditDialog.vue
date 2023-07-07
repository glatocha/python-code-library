<template>
  <div
    class="bg-black opacity-50 h-full w-full fixed z-40 flex justify-center items-center"
    @click="closeDialog"
  ></div>
  <div id="addDialog" class="z-50 p-5 bg-white border-primary-dark border-2 rounded-lg w-9/12">
    <form @submit.prevent="updateItem" class="flex flex-col" autocomplete="off">
      <h1>Edit the name and code</h1>
      <input
        class="border-primary-dark border-2 rounded-md my-2 h-8 px-2"
        type="text"
        id="name"
        title="snippet name"
        placeholder="snippet name"
        v-model="item.title"
      />
      <textarea
        name="itemCode"
        id="itemCode"
        cols="30"
        rows="25"
        class="border-primary-dark border-2 rounded-md my-2 p-2"
        v-model="item.code"
      ></textarea>
      <input
        class="border-primary-dark border-2 rounded-md my-2 h-8 px-2"
        :class="{ notValid: !tagsValid }"
        type="text"
        id="tagsInputElement"
        title="snippet tags"
        ref="tagsInputElement"
        placeholder="snippet tags"
        v-model="item.tags"
      />
      <tag-panel v-if="item.tags" :tags="tagList"></tag-panel>
      <div class="flex flex-row justify-end">
        <button
          class="mx-1 text-white font-bold bg-primary px-3 py-2 rounded-lg hover:bg-primary-light hover:text-text-light focus:outline-primary-dark scale-50 sm:scale-100 transition-scale hover:scale-105 duration-50 ease-in-out"
          type="button"
          @click.prevent="closeDialog"
        >
          Cancel
        </button>
        <button
          class="mx-1 text-white font-bold bg-primary px-3 py-2 rounded-lg hover:bg-primary-light hover:text-text-light focus:outline-primary-dark scale-50 sm:scale-100 transition-scale hover:scale-105 duration-50 ease-in-out"
          type="submit"
        >
          Save changes
        </button>
      </div>
      <h6 class="text-left text-sm">Tags already defined:</h6>
      <all-tags-panel @selected="tagFromPreselect" :tags="tagsList"></all-tags-panel>
    </form>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { supabase } from "../supabase/init";
import TagPanel from "../components/TagPanel.vue";
import AllTagsPanel from "../components/AllTagsPanel.vue";
import validateTags from "../utilities";

export default {
  components: {
    TagPanel,
    AllTagsPanel,
  },
  setup() {
    const store = useStore();
    const item = computed(() => store.getters.selectedItem);
    const tagList = computed(() => item.value?.tags?.replace(/[\s+]/g, "").split(";"));
    const tagsList = computed(() => Object.keys(store.getters.tags));
    const tagsValid = ref(true);
    const tagsInputElement = ref(null);

    async function updateItem() {
      console.log("Trying to update item:" + item.value.title);
      store.dispatch("setLoadingDialog", {
        isOpen: true,
        text: "Updating data...",
        textClass: "info",
      });
      try {
        const { error } = await supabase
          .from("python-snippets")
          .update([
            {
              title: item.value.title,
              code: item.value.code,
              tags: item.value.tags,
            },
          ])
          .eq("id", item.value.id);
        if (error) throw error;
        closeDialog();
        store.dispatch("forceRefresh");
      } catch (error) {
        console.warn("Update error :>> ", error);
        store.dispatch("setLoadingDialog", {
          isOpen: true,
          text: "Update error :" + error.message,
          textClass: "alarm",
        });
        setTimeout(() => {
          store.dispatch("closeDialog");
        }, 5000);
      }
    }

    function closeDialog() {
      store.dispatch("closeDialog");
      store.dispatch("forceRefresh");
    }

    function tagFromPreselect(tag) {
      if (item.value.tags) {
        item.value.tags += `; ${tag}`;
      } else {
        item.value.tags = `${tag}`;
      }
    }

    watch(
      () => item.value.tags,
      (newValue, oldValue) => {
        tagsValid.value = validateTags(newValue);
        tagsInputElement.value.setCustomValidity(
          tagsValid.value ? "" : "Check input, tags start with # and are ; separated"
        );
      }
    );

    return {
      updateItem,
      closeDialog,
      item,
      tagList,
      tagsInputElement,
      tagsValid,
      tagsList,
      tagFromPreselect,
    };
  },
};
</script>

<style scoped>
#addDialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
textarea {
  color: var(--code-color);
  font-family: "Source Code Pro", monospace;
  font-size: 0.7rem;
  line-height: 0.9rem;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.notValid {
  border-color: red;
  outline: 2px solid red;
}
</style>
