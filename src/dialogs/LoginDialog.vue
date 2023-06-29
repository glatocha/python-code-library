<template>
  <div
    class="bg-black opacity-50 h-full w-full fixed z-40 flex justify-center items-center"
    @click="closeDialog"
  ></div>
  <div id="loginDialog" class="z-50 p-5 bg-white border-primary-dark border-2 rounded-lg">
    <form @submit.prevent="login" class="flex flex-col">
      <label for="password">Provide Admin password:</label>
      <input
        class="border-primary-dark border-2 rounded-md my-2 h-8 px-2"
        type="password"
        id="password"
        v-model="password"
      />
      <div class="flex flex-row justify-between">
        <button
          class="w-1/2 mx-1 text-white font-bold bg-primary px-3 py-2 rounded-lg hover:bg-primary-light hover:text-text-light focus:outline-primary-dark scale-50 sm:scale-100 transition-scale hover:scale-105 duration-50 ease-in-out"
          type="button"
          @click.prevent="closeDialog"
        >
          Cancel
        </button>
        <button
          class="w-1/2 mx-1 text-white font-bold bg-primary px-3 py-2 rounded-lg hover:bg-primary-light hover:text-text-light focus:outline-primary-dark scale-50 sm:scale-100 transition-scale hover:scale-105 duration-50 ease-in-out"
          type="submit"
        >
          Login
        </button>
      </div>
      <p v-if="errorMsg" class="text-red-500 mt-2 text-sm">{{ errorMsg }}</p>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { supabase } from "../supabase/init";

export default {
  setup() {
    const store = useStore();
    const password = ref("");
    const errorMsg = ref(null);

    // function login() {
    //   console.log(
    //     "Try to login with supabase as user Admin and pass:" + password.value
    //   );
    // }
    // Login function
    const login = async () => {
      try {
        const { error } = await supabase.auth.signIn({
          email: "supabase-admin@glatocha.com",
          password: password.value,
        });
        if (error) throw error;
        console.log("Signin done");
        store.dispatch("closeDialog");
      } catch (error) {
        console.log(`Error: ${error.message}`);
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorMsg.value = null;
        }, 2000);
      }
    };

    function closeDialog() {
      store.dispatch("closeDialog");
    }

    return { login, closeDialog, password, errorMsg };
  },
};
</script>

<style scoped>
#loginDialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
