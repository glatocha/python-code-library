<template>
  <div v-if="item" class="flex flex-col">
    <div class="h-12 flex flex-row items-center px-3 m-2 bg-gray-300 rounded-md justify-between">
      <h2 class="hidden sm:block p-1 text-black font-bold">{{ item.title }}</h2>

      <selector-drop-down
        class="sm:hidden overflow-ellipsis w-2/3 flex bg-opacity-70 bg-black flex-1 text-white my-2 rounded-lg border-primary-dark border-4 self-center box-border"
      ></selector-drop-down>

      <div class="text-primary-dark whitespace-nowrap min-w-max">
        <font-awesome-icon
          v-if="user"
          class="cursor-pointer mx-1 h-6 hover:scale-110"
          title="Edit"
          icon="pen-to-square"
          @click="editItem"
        />
        <font-awesome-icon
          v-if="user"
          class="cursor-pointer mx-1 h-6 hover:scale-110"
          title="Delete"
          icon="trash-can"
          @click="deleteItem"
        />
        <font-awesome-icon
          class="cursor-pointer mx-1 h-6 hover:scale-110"
          title="Copy to clipboard"
          icon="clipboard"
          @click="copyToClipboard"
        />
      </div>
    </div>
    <code
      id="code-listing"
      class="h-full bg-gray-300 mx-2 mb-2 p-3 rounded-md box-border text-left"
      v-html="code"
    ></code>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { supabase } from "../supabase/init";
import string2html from "../vba-formating";
import SelectorDropDown from "./SelectorDropDown.vue";

export default {
  components: {
    SelectorDropDown,
  },
  setup() {
    const store = useStore();
    const user = computed(() => store.getters.user);
    const item = computed(() => store.getters.selectedItem);
    const code = computed(() => string2html(item.value.code));

    function copyToClipboard() {
      navigator.clipboard.writeText(item.value.code).then(
        () => console.log("copy successfull"),
        () => console.log("copy failed")
      );
    }

    function editItem() {
      store.dispatch("openEditDialog");
    }

    async function deleteItem() {
      if (confirm("Please confirm deleting the item")) {
        console.log("Trying to delete item:" + item.value.title);
        store.dispatch("setLoadingDialog", {
          isOpen: true,
          text: "Deleting data...",
          textClass: "info",
        });
        try {
          const { error } = await supabase.from("python-snippets").delete().eq("id", item.value.id);
          if (error) throw error;
          store.dispatch("closeDialog");
          store.dispatch("setSelectedItem", {
            title: "Select snippet",
            code: "",
          });
          store.dispatch("forceRefresh");
        } catch (error) {
          console.warn("Update error :>> ", error);
          store.dispatch("setLoadingDialog", {
            isOpen: true,
            text: "Delete error :" + error.message,
            textClass: "alarm",
          });
          setTimeout(() => {
            store.dispatch("closeDialog");
          }, 5000);
        }
      }
    }

    return { user, item, code, copyToClipboard, editItem, deleteItem };
  },
};
</script>

<style scoped>
code {
  color: var(--code-color);
  font-family: "Source Code Pro", monospace;
  font-size: 0.7rem;
  line-height: 0.9rem;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
}

code::selection,
code:deep(::selection) {
  background-color: theme("colors.primary.light");
}

code:deep(.code-keyword) {
  color: var(--code-keyword-color);
  font-weight: 600;
}

code:deep(.code-comment) {
  color: var(--code-comment-color);
}

code:deep(.code-strLiteral) {
  color: var(--code-string-literal);
}
</style>
