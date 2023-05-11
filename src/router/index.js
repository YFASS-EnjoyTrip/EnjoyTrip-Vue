import Vue from "vue";
import VueRouter from "vue-router";
import AppMain from "../views/AppMain.vue";
import HotplaceList from "../components/hotplace/HotplaceList.vue";
import AttractionList from "../components/attraction/AttractionList.vue";
import LoginForm from "../components/member/LoginForm.vue";
import SignupForm from "../components/member/SignupForm.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "AppMain",
    component: AppMain,
  },
  {
    path: "/hotplace",
    name: "hotplace",
    component: HotplaceList,
  },
  {
    path: "/attraction",
    name: "attraction",
    component: AttractionList,
  },
  {
    path: "/login",
    name: "login",
    component: LoginForm,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupForm,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
