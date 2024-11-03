import { createApp } from "vue";
import router from "./router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);
app.use(router); // Use the router
app.use(Toast); // Use the Toast plugin
app.mount("#app");
