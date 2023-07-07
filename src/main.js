import { createApp } from "vue";
import App from "./App.vue";
import Store from "./store.js";
import "./index.css";
//syntax highlighting highlightjs.org
import "./stackoverflow-dark.css";
import hljs from "highlight.js/lib/core";
import python from "highlight.js/lib/languages/python";
import hljsVuePlugin from "@highlightjs/vue-plugin";

//importing icons from FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
//import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare, faClipboard, faTrashCan, faBroom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faPenToSquare, faClipboard, faTrashCan, faBroom);

//registering highlightjs
hljs.registerLanguage("python", python);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(Store)
  .use(hljsVuePlugin)
  .mount("#app");
