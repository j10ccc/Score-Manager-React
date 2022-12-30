const studentRoutes = [
  {
    name: "提交建议",
    path: "/student/advice",
    component: "./student/Advice",
    access: "canSeeStudent",
  },
  {
    name: "综测查询",
    path: "/student/myscores",
    component: "./student/MyScores",
    access: "canSeeStudent",
  },
];

const coachRoutes = [
  {
    name: "录入成绩",
    path: "/coach/access",
    component: "./coach/Access",
    access: "canSeeCoach",
  },
];

export const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    name: "登录",
    path: "/login",
    component: "./public/Login",
    headerRender: false,
    footerRender: false,
    menuRender: false,
    menuHeaderRender: false,
    hideInMenu: true,
  },
  {
    name: "首页",
    path: "/home",
    component: "./public/Home",
    access: "isLogin",
  },
  ...studentRoutes,
  ...coachRoutes,
];
