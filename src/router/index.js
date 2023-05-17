import Vue from "vue";
import VueRouter from "vue-router";
import AppMain from "../views/AppMain.vue";

import AttractionMain from "../views/AttractionMain.vue";
import HotplaceMain from "../views/HotplaceMain.vue";
import PlannerMain from "../views/PlannerMain.vue";

import HotplaceList from "../components/hotplace/HotplaceList.vue";
import AttractionList from "../components/attraction/AttractionList.vue";
import PlannerView from "../components/planner/PlannerView.vue";
import plannerModify from "../components/planner/PlannerModify.vue";
import PlannerCreate from "../components/planner/PlannerCreate.vue";
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
    redirect: "/hotplace/list",
    component: HotplaceMain,
    children: [
      {
        path: "list",
        name: "hotplaceList",
        component: HotplaceList,
      },
    ],
  },
  {
    path: "/attraction",
    name: "attraction",
    redirect: "/attraction/list",
    component: AttractionMain,
    children: [
      {
        path: "list",
        name: "attractionList",
        component: AttractionList,
      },
    ],
  },

  // planner 생성 페이지부터 만들거라 redirect view로 설정
  {
    path: "/planner",
    name: "planner",
    redirect: "/planner/view",
    component: PlannerMain,
    children: [
      {
        path: "view",
        name: "plannerView",
        component: PlannerView,
      },
      {
        path: "modify",
        name: "plannerModify",
        component: plannerModify,
      },
      {
        path: "create",
        name: "PlannerCreate",
        component: PlannerCreate,
        props: true,
      },
    ],
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
