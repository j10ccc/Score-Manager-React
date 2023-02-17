import { getTopicsAPI } from "@/services/square/getTopicsAPI";
import { Button, Tag } from "antd";
import { useEffect, useState } from "react";
import { PageContainer, ProList } from "@ant-design/pro-components";
import { Link, history } from "@umijs/max";

const TopicSquarePage = () => {
  const [page] = useState(1);
  const [list, setList] = useState<SquareAPI.Topic[]>([]);

  const getTopics = async () => {
    const res = await getTopicsAPI({ page, size: 10 });
    setList(res.data.list);
  };

  const handleCreateTopic = () => {
    history.push("/square/create-topic");
  };

  useEffect(() => {
    getTopics();
  }, []);

  return (
    <PageContainer ghost>
      <ProList<SquareAPI.Topic>
        toolBarRender={() => {
          return [
            <Button key="creat" type="primary" onClick={handleCreateTopic}>
              创建话题
            </Button>,
          ];
        }}
        itemLayout="vertical"
        headerTitle="话题"
        rowKey="id"
        dataSource={list}
        metas={{
          title: {
            render: (text, record) => (
              <Link to={`topic/${record.id}`}>{text}</Link>
            ),
          },
          description: {
            render: (_, item) => (
              <>
                <Tag>{item.time}</Tag>
                <Tag>{item.userRole}</Tag>
                <Tag>{item.type}</Tag>
              </>
            ),
          },
          content: {
            render: (dom) => dom,
          },
        }}
      />
    </PageContainer>
  );
};

export default TopicSquarePage;
