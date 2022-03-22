import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../views/Login.vue";

Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      component: Login,
    },
  ],

  scrollBehavior(to, from, savePosition) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!savePosition) {
          savePosition = {};
        }
        savePosition.behavior = "smooth";
        resolve(savePosition);
      }, 500);
    });
  },
});
export default router;
