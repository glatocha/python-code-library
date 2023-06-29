<template>
  <div class="bg-opacity-10 bg-white">
    <div class="flex px-5 py-2 items-center justify-between max-w-screen-lg m-auto">
      <img src="../assets/favicon.png" alt="" class="h-7 sm:h-16" @click="forceRefresh" />
      <h1 class="text-white text-md uppercase font-bold sm:text-3xl">PYTHON Code Library</h1>
      <button
        v-if="!user"
        class="hidden sm:block text-text font-bold bg-primary px-3 py-2 rounded-lg hover:bg-primary-light hover:text-text-light focus:outline-primary-dark transition-scale hover:scale-105 duration-50 ease-in-out"
        title="Only for admin functions"
        @click="displayLoginDialog"
      >
        ADMIN
      </button>
      <div v-else class="hidden sm:block">
        <button
          class="text-white font-bold bg-primary mx-1 px-3 py-2 rounded-lg hover:bg-primary-light hover:text-text-light focus:outline-primary-dark transition-scale hover:scale-55 sm:hover:scale-105 duration-50 ease-in-out"
          title="Only for admin functions"
          @click="displayAddDialog"
        >
          ADD
        </button>
        <button
          class="text-white font-bold bg-primary mx-1 px-3 py-2 rounded-lg hover:bg-primary-light hover:text-text-light focus:outline-primary-dark transition-scale hover:scale-55 sm:hover:scale-105 duration-50 ease-in-out"
          title="Only for admin functions"
          @click="logout"
        >
          LOGOUT
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { supabase } from "../supabase/init";

export default {
  setup() {
    const store = useStore();

    const user = computed(() => store.getters.user);

    function displayLoginDialog() {
      store.dispatch("openLoginDialog");
    }
    function displayAddDialog() {
      store.dispatch("openAddDialog");
    }

    async function logout() {
      await supabase.auth.signOut();
    }

    function forceRefresh() {
      store.dispatch("forceRefresh");
    }

    return {
      displayLoginDialog,
      displayAddDialog,
      user,
      logout,
      forceRefresh,
    };
  },
};
</script>

<style scoped></style>
