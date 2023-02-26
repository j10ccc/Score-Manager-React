import { Layout, Row, Typography } from "antd";
import React from "react";

interface Props {
  user: StudentAPI.Student & CoachAPI.Coach;
}

const Guide: React.FC<Props> = (props) => {
  const { user } = props;
  return (
    <Layout>
      <Row>
        <Typography.Title level={2}>欢迎！</Typography.Title>
        <Typography.Title level={3}>{user.name}</Typography.Title>
      </Row>
    </Layout>
  );
};

export default Guide;
