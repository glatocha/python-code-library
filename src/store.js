import { createStore } from "vuex";

const Store = createStore({
  state() {
    return {
      user: null, //storing supabase user object - null if not logged in
      isLoginDialogOpen: false, //true when the login dialog is open
      isAddDialogOpen: false, //true when the add edit dialog is open
      isEditDialogOpen: false, //true when the edit dialog is open
      items: null, //store all code snippets
      tags: null, //object with keys - value pair, where the key is the TAG (with # and the value is a list of all items ID with that tag)
      searchResults: [], //array of ID matching the TAG search
      forcedTagSearch: null,
      selectedItem: {
        title: "Select snippet",
        code: "",
      }, //
      refreshRequest: false, //setting this force refresh of the data from supabase
      loadingDialog: {
        isOpen: false,
        textClass: "info",
        text: "loading data...",
      },
    };
  },
  mutations: {
    setUser(state, value) {
      state.user = value;
    },
    openLoginDialog(state) {
      state.isLoginDialogOpen = true;
    },
    openAddDialog(state) {
      state.isAddDialogOpen = true;
    },
    openEditDialog(state) {
      state.isEditDialogOpen = true;
    },
    closeDialog(state) {
      state.isLoginDialogOpen = false;
      state.isAddDialogOpen = false;
      state.isEditDialogOpen = false;
      state.loadingDialog.isOpen = false;
    },
    setItems(state, payload) {
      state.items = payload;
    },
    setTags(state, payload) {
      state.tags = payload;
    },
    setSearchResults(state, payload) {
      state.searchResults = payload;
    },
    setForcedTagSearch(state, payload) {
      state.forcedTagSearch = payload;
    },
    setSelectedItem(state, payload) {
      state.selectedItem = payload;
    },
    forceRefresh(state) {
      state.refreshRequest = true;
    },
    ackRefresh(state) {
      state.refreshRequest = false;
    },
    setLoadingDialog(state, payload) {
      state.loadingDialog = payload;
    },
  },
  actions: {
    setUser(context, value) {
      context.commit("setUser", value);
    },
    openLoginDialog(context) {
      context.commit("openLoginDialog");
    },
    openAddDialog(context) {
      context.commit("openAddDialog");
    },
    openEditDialog(context) {
      context.commit("openEditDialog");
    },
    closeDialog(context) {
      context.commit("closeDialog");
    },
    setItems(context, payload) {
      context.commit("setItems", payload);
    },
    setTags(context, payload) {
      context.commit("setTags", payload);
    },
    setSearchResults(context, payload) {
      context.commit("setSearchResults", payload);
    },
    setForcedTagSearch(context, payload) {
      context.commit("setForcedTagSearch", payload);
    },
    setSelectedItem(context, payload) {
      context.commit("setSelectedItem", payload);
    },
    forceRefresh(context) {
      context.commit("forceRefresh");
    },
    ackRefresh(context) {
      context.commit("ackRefresh");
    },
    setLoadingDialog(context, payload) {
      context.commit("setLoadingDialog", payload);
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    isLoginDialogOpen(state) {
      return state.isLoginDialogOpen;
    },
    isAddDialogOpen(state) {
      return state.isAddDialogOpen;
    },
    isEditDialogOpen(state) {
      return state.isEditDialogOpen;
    },
    items(state) {
      return state.items;
    },
    tags(state) {
      return state.tags;
    },
    forcedTagSearch(state) {
      return state.forcedTagSearch;
    },
    searchResults(state) {
      return state.searchResults;
    },
    selectedItem(state) {
      return state.selectedItem;
    },
    refreshRequest(state) {
      return state.refreshRequest;
    },
    loadingDialog(state) {
      return state.loadingDialog;
    },
  },
});

export default Store;
