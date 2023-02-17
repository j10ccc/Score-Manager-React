// 运行时配置

import { RunTimeLayoutConfig } from "@umijs/max";
import { Space } from "antd";
import { loginWithCookieAPI } from "./services/public";

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
    logo: "https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg",
    menu: {
      locale: false,
    },
    rightRender: (initialState: any) => (
      <Space>
        <div>{initialState.name} </div>
      </Space>
    ),
    // noFound: <>{window.location.replace("/home")}</>,
    // unAccessible: <>{window.location.replace("/login")}</>
  };
};
