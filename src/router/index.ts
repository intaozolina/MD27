import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import NamePickerView from "@/views/NamePickerView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "namePicker",
    component: NamePickerView,
  },
  {
    path: "/jokes",
    name: "jokes",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "jokes" */ "../views/JokesView.vue"),
  },
  {
    path: "/jokes/:id",
    name: "jokes/:id",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "jokes/:id" */ "../views/SingleJokeView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
