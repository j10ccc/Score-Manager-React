import { getTopicDetailAPI } from "@/services/square/getTopicDetailAPI";
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormTextArea,
  ProList,
} from "@ant-design/pro-components";
import { useParams, useRequest } from "@umijs/max";
import { Viewer } from "@bytemd/react";
import { useEffect } from "react";
import { Divider, Space, Typography, message } from "antd";
import { createCommentAPI } from "@/services/square/createCommentAPI";
const { Text } = Typography;

const TopicPage = () => {
  const { id = "" } = useParams();

  const { data, run } = useRequest(getTopicDetailAPI, {
    manual: true,
  });

  const onFinish = async (value: any) => {
    try {
      const { code } = await createCommentAPI({
        target: id,
        content: value.content,
      });
      if (code === 200) {
        run({ id });
      } else {
        message.error("评论失败");
      }
    } catch {
      message.error("网络错误");
    }
  };

  useEffect(() => {
    run({ id });
  }, []);

  return (
    <PageContainer>
      <Space direction="vertical" style={{ width: "100%" }}>
        <ProCard title={data?.topic.title} extra={data?.topic.time}>
          <Viewer value={data?.topic.content || ""} />
        </ProCard>
        <ProCard title="发布留言">
          <ProForm onFinish={onFinish}>
            <ProFormTextArea
              name="content"
              placeholder="请输入留言，字数在30字以内"
            />
          </ProForm>
        </ProCard>
        <ProList
          headerTitle={`全部留言 (${data?.topic.commentList?.length || 0}条)`}
          itemLayout="vertical"
          dataSource={data?.topic.commentList}
          metas={{
            description: {
              render: (_, record) => (
                <>
                  <Text>{record.userRole}</Text>
                  <Divider type="vertical" />
                  <Text>{record.time}</Text>
                </>
              ),
            },
            content: {
              render: (text) => text,
            },
          }}
        />
      </Space>
    </PageContainer>
  );
};

export default TopicPage;
