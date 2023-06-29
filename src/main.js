import { createApp } from "vue";
import App from "./App.vue";
import Store from "./store.js";
import "./index.css";

//importing icons from FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
//import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import {
  faPenToSquare,
  faClipboard,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faPenToSquare, faClipboard, faTrashCan);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(Store)
  .mount("#app");
