import Vue from "vue";
import VueRouter from "vue-router";
import AppMain from "../views/AppMain.vue";

import AttractionMain from "../views/AttractionMain.vue";
import HotplaceMain from "../views/HotplaceMain.vue";
import PlannerMain from "../views/PlannerMain.vue";
import MemberMain from "../views/MemberMain.vue";

import HotplaceList from "../components/hotplace/HotplaceList.vue";
import AttractionList from "../components/attraction/AttractionList.vue";
import AttractionDetail from "../components/attraction/AttractionDetail.vue";
import PlannerView from "../components/planner/PlannerView.vue";
import plannerModify from "../components/planner/PlannerModify.vue";
import PlannerCreate from "../components/planner/PlannerCreate.vue";
import LoginForm from "../components/member/LoginForm.vue";
import SignupForm from "../components/member/SignupForm.vue";
import MyPage from "../components/member/MyPage.vue";

import store from "@/store";

const onlyAuthUser = async (to, from, next) => {
  const checkUserInfo = store.getters["memberStore/checkUserInfo"];
  const checkToken = store.getters["memberStore/checkToken"];
  let token = sessionStorage.getItem("access-token");
  // console.log("로그인 처리 전", checkUserInfo, token);

  if (checkUserInfo != null && token) {
    // console.log("토큰 유효성 체크하러 가자!!!!");
    await store.dispatch("memberStore/getUserInfo", token);
  }
  if (!checkToken || checkUserInfo === null) {
    // alert("로그인이 필요한 페이지입니다..");
    // next({ name: "login" });
    router.push({ name: "login" });
  } else {
    // console.log("로그인 했다!!!!!!!!!!!!!.");
    next();
  }
};

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
      {
        path: "detail",
        name: "attractionDetail",
        component: AttractionDetail,
        props: true,
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
        path: "view/:planId",
        name: "plannerView",
        beforeEnter: onlyAuthUser,
        component: PlannerView,
        props: true,
      },
      {
        path: "modify",
        name: "plannerModify",
        beforeEnter: onlyAuthUser,
        component: plannerModify,
      },
      {
        path: "create",
        name: "PlannerCreate",
        beforeEnter: onlyAuthUser,
        component: PlannerCreate,
        props: true,
      },
    ],
  },
  {
    path: "/member",
    name: "member",
    component: MemberMain,
    children: [
      {
        path: "signup",
        name: "signup",
        component: SignupForm,
      },
      {
        path: "login",
        name: "login",
        component: LoginForm,
        props: true,
      },
      {
        path: "mypage",
        name: "mypage",
        component: MyPage,
        props: true,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
