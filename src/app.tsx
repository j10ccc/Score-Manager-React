// 运行时配置

import { RunTimeLayoutConfig } from "@umijs/max";
import { loginWithCookieAPI } from "./services/public";
import { history } from "@umijs/max";

/**
 * 初始化用户信息
 * @returns
 */
export async function getInitialState(): Promise<{
  name?: string;
  role?: "student" | "coach";
}> {
  let name = undefined;
  let role = undefined;
  try {
    const res = await loginWithCookieAPI();
    if (res.code !== 200) throw new Error(res.msg);
    name = res.data.name;
    role = res.data.role;
  } catch (error) {
    console.log(error);
  }

  // FIXME: remove localStorage when login failed
  if (name) window.localStorage.setItem("name", name);
  if (role) window.localStorage.setItem("role", role);
  return { name, role };
}

export const layout: RunTimeLayoutConfig = () => {
  return {
    title: "综测成绩管理系统",
    // logo: "https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg",
    logo: "https://www.svgrepo.com/show/73859/exam-a-plus.svg",
    menu: {
      locale: false,
    },
    logout: (initialState: any) => {
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("role");
      document.cookie = "sms-session=";
      history.push("/login");
      return initialState;
    },
    // rightRender: (initialState: any) => (),
  };
};
