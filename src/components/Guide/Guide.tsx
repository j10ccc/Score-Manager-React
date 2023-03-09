import { Link, useAccess, useModel } from "@umijs/max";
import { changePasswordAPI } from "@/services/public/changePasswordAPI";
import { Col, Layout, message, Row, Space, Typography } from "antd";
import React from "react";
import ChangePasswordForm from "../ChangePasswordForm";
import { history } from "@umijs/max";
import { Access } from "@umijs/max";

interface Props {
  user: StudentAPI.Student & CoachAPI.Coach;
}

const Guide: React.FC<Props> = (props) => {
  const { user } = props;
  const { clearSystemStore } = useModel("global");
  const access = useAccess();
  console.log(access.canSeeCoach);

  const handleChangePassword = async (formData: {
    old: string;
    new: string;
    confirm: string;
  }) => {
    if (formData.new !== formData.confirm) {
      message.warning("两次密码输入不一致");
      return false;
    }
    try {
      const res = await changePasswordAPI(formData);
      if (res.code === 200) {
        // handle logout
        clearSystemStore();
        history.push("/login");
        return true;
      } else {
        throw new Error(res.msg);
      }
    } catch (e: any) {
      message.error(`密码修改失败, ${e.message || "未知错误"}`);
      return false;
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="space-between">
        <Col>
          <Space align="baseline">
            <Typography.Title level={2}>欢迎！</Typography.Title>
            <Typography.Title level={3}>{user.name}</Typography.Title>
          </Space>
        </Col>
        <Col span={3}>
          <Space>
            <Access accessible={access.canSeeCoach}>
              <Link to="/coach/myadvice">建议箱</Link>
            </Access>
            <ChangePasswordForm onFinish={handleChangePassword} />
          </Space>
        </Col>
      </Row>
    </Layout>
  );
};

export default Guide;
