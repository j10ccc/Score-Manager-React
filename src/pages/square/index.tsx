import { getTopicsAPI } from "@/services/square/getTopicsAPI";
import { Button, Tag } from "antd";
import { PageContainer, ProList } from "@ant-design/pro-components";
import { Link, history } from "@umijs/max";
import markdownToTxt from "markdown-to-txt";

const TopicSquarePage = () => {
  const handleCreateTopic = () => {
    history.push("/square/create-topic");
  };

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
        pagination={{ pageSize: 10 }}
        request={async (params: any) => {
          const res = await getTopicsAPI({
            page: params.current,
            size: params.pageSize,
          });
          return {
            data: res.data.list,
            success: true,
            total: res.data.count,
          };
        }}
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
            render: (dom) => markdownToTxt(dom as string),
          },
        }}
      />
    </PageContainer>
  );
};

export default TopicSquarePage;
