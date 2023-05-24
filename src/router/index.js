import Vue from 'vue';
import VueRouter from 'vue-router';
import AppMain from '../views/AppMain.vue';

import AttractionMain from '../views/AttractionMain.vue';
import HotplaceMain from '../views/HotplaceMain.vue';
import PlannerMain from '../views/PlannerMain.vue';
import MemberMain from '../views/MemberMain.vue';

import HotplaceList from '../components/hotplace/HotplaceList.vue';
import AttractionList from '../components/attraction/AttractionList.vue';
import AttractionDetail from '../components/attraction/AttractionDetail.vue';
import PlannerView from '../components/planner/PlannerView.vue';
import plannerModify from '../components/planner/PlannerModify.vue';
import PlannerCreate from '../components/planner/PlannerCreate.vue';
import LoginForm from '../components/member/LoginForm.vue';
import SignupForm from '../components/member/SignupForm.vue';
import MyPage from '../components/member/MyPage.vue';
import MyPlanner from '../components/member/mypageComponents/MyPlanner.vue';
import MyLiked from '../components/member/mypageComponents/MyLiked.vue';
import MyInfo from '../components/member/mypageComponents/MyInfo.vue';
import NotFound from '../components/common/NotFound.vue';

import store from '@/store';
import ToastService from '@/util/ToastService';

const onlyAuthUser = async (to, from, next) => {
  const checkUserInfo = store.getters['memberStore/checkUserInfo'];
  const checkToken = store.getters['memberStore/checkToken'];
  let token = sessionStorage.getItem('access-token');

  if (checkUserInfo != null && token) {
    await store.dispatch('memberStore/getUserInfo', token);
  }
  if (!checkToken || checkUserInfo === null) {
    ToastService.error('로그인이 필요한 서비스입니다', {
      position: 'top-center',
      timeout: 3000,
    });

    router.push({ name: 'login' }).catch((err) => {
      if (err.name !== 'NavigationDuplicated') {
        throw err;
      }
    });
  } else {
    next();
  }
};

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'AppMain',
    component: AppMain,
  },
  {
    path: '/hotplace',
    name: 'hotplace',
    redirect: '/hotplace/list',
    component: HotplaceMain,
    children: [
      {
        path: 'list',
        name: 'hotplaceList',
        component: HotplaceList,
      },
    ],
  },
  {
    path: '/attraction',
    name: 'attraction',
    redirect: '/attraction/list',
    component: AttractionMain,
    children: [
      {
        path: 'list',
        name: 'attractionList',
        component: AttractionList,
      },
      {
        path: 'detail',
        name: 'attractionDetail',
        component: AttractionDetail,
        props: true,
      },
    ],
  },

  // planner 생성 페이지부터 만들거라 redirect view로 설정
  {
    path: '/planner',
    name: 'planner',
    redirect: '/planner/view',
    component: PlannerMain,
    children: [
      {
        path: 'view/:planId',
        name: 'plannerView',
        beforeEnter: onlyAuthUser,
        component: PlannerView,
        props: true,
      },
      {
        path: 'modify',
        name: 'plannerModify',
        beforeEnter: onlyAuthUser,
        component: plannerModify,
      },
      {
        path: 'create',
        name: 'PlannerCreate',
        beforeEnter: onlyAuthUser,
        component: PlannerCreate,
        props: true,
      },
    ],
  },
  {
    path: '/member',
    name: 'member',
    component: MemberMain,
    children: [
      {
        path: 'signup',
        name: 'signup',
        component: SignupForm,
      },
      {
        path: 'login',
        name: 'login',
        component: LoginForm,
        props: true,
      },
      {
        path: 'mypage',
        name: 'mypage',
        component: MyPage,
        props: true,
        redirect: '/member/mypage/myplanner',
        children: [
          {
            path: 'myplanner',
            name: 'myplanner',
            component: MyPlanner,
          },
          {
            path: 'myliked',
            name: 'myliked',
            component: MyLiked,
          },
          {
            path: 'myinfo',
            name: 'myinfo',
            component: MyInfo,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
