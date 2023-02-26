// 运行时配置

import { RunTimeLayoutConfig } from "@umijs/max";
import { loginWithTokenAPI } from "./services/public";
import { history } from "@umijs/max";

/**
 * 初始化用户信息
 * @returns
 */
export async function getInitialState(): Promise<{
  name: string;
  user: StudentAPI.Student | CoachAPI.Coach | undefined;
  role?: "student" | "coach";
}> {
  let user = undefined;
  let role = undefined;
  try {
    const res = await loginWithTokenAPI();
    if (res.code !== 200) throw new Error(res.msg);
    user = res.data.user;
    role = res.data.role;
  } catch (error) {
    console.log(error);
  }

  // FIXME: remove localStorage when login failed
  if (user) window.localStorage.setItem("name", user.name);
  if (role) window.localStorage.setItem("role", role);
  return { name: user?.name || "", user, role };
}

export const layout: RunTimeLayoutConfig = () => {
  return {
    title: "综测成绩管理系统",
    logo: "https://www.svgrepo.com/show/73859/exam-a-plus.svg",
    menu: {
      locale: false,
    },
    logout: (initialState: any) => {
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("role");
      window.localStorage.removeItem("token");
      history.push("/login");
      return initialState;
    },
  };
};
