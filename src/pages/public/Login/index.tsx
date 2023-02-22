import { DEFAULT_NAME } from "@/constants";
import { LoginFormPage, ProFormText } from "@ant-design/pro-components";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Tabs, message } from "antd";
import { useState } from "react";
import { loginAPI } from "@/services/public";
import { useModel } from "@umijs/max";

const LoginPage = () => {
  const [loginRole, setLoginRole] = useState<"student" | "coach">("student");
  const placeholderMap = {
    student: ["学号:", "密码: 初始密码 zjut + 学号后六位"],
    coach: ["账号:", "密码:"],
  };
  const [loading, setLoading] = useState(false);
  const { setName, setToken, setRole } = useModel("global");

  const onFinish = async (formData: any) => {
    try {
      setLoading(true);
      const res = await loginAPI({ ...formData, role: loginRole });
      if (res.code === 200) {
        const { name, token } = res.data;
        setName(name);
        setToken(`sms-session=${token};`);
        setRole(loginRole);
        window.location.replace("/home");
      } else {
        message.error(res.msg);
      }
    } catch (error) {
      console.log(error);
      message.error("请求失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ height: "calc(100vh - 48px)" }}>
      <LoginFormPage
        title="登录"
        subTitle={`浙江工业大学 - ${DEFAULT_NAME}`}
        onFinish={onFinish}
      >
        <Tabs
          centered
          activeKey={loginRole}
          onChange={(activeKey: any) => !loading && setLoginRole(activeKey)}
          items={[
            { key: "student", label: "学生" },
            { key: "coach", label: "辅导员" },
          ]}
        />
        <ProFormText
          name="username"
          fieldProps={{
            size: "large",
            prefix: <UserOutlined />,
          }}
          placeholder={placeholderMap[loginRole][0]}
          rules={[{ required: true, message: "请输入账号!" }]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: "large",
            prefix: <LockOutlined />,
          }}
          placeholder={placeholderMap[loginRole][1]}
          rules={[{ required: true, message: "请输入密码！" }]}
        />
      </LoginFormPage>
    </div>
  );
};

export default LoginPage;
