const studentRoutes = [
  {
    name: "综测查询",
    path: "/student/myscores",
    component: "./student/MyScores",
    access: "canSeeStudent",
  },
  {
    name: "申报表单",
    path: "/student/myscores/form",
    component: "./student/MyScores/CreateDraft",
    access: "canSeeStudent",
    hideInMenu: true,
  },
  {
    name: "综测申报",
    path: "/student/application",
    access: "canSeeStudent",
    hideInBreadcrumb: true,
    routes: [
      {
        name: "草稿箱",
        path: "drafts",
        component: "./student/Applications",
      },
      {
        name: "申报记录",
        path: "records",
        component: "./student/Applications/MyApplications",
        access: "canSeeStudent",
      },
    ],
  },
  {
    name: "提交建议",
    path: "/student/advice",
    component: "./student/Advice",
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
