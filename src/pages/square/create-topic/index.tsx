import {
  PageContainer,
  ProForm,
  ProFormText,
  ProFormSelect,
  ProFormGroup,
} from "@ant-design/pro-components";
import { useState } from "react";
import "github-markdown-css";
import "bytemd/dist/index.css";
import TopicEditorMd from "@/components/TopicEditorMd";
import { Form, message } from "antd";
import { createTopicAPI } from "@/services/square/createTopicAPI";
import useSystem from "@/models/global";

type FormDataType = {
  title: string;
  content: string;
  type: "question" | "declare";
};

const CreateTopicPage = () => {
  const [content, setContent] = useState("");
  const { role } = useSystem();

  const handleSubmit = async (formData: FormDataType) => {
    if (role) {
      try {
        const res = await createTopicAPI({ ...formData, userRole: role });
        const { code, msg } = res;
        if (code === 200) {
          message.success("创建成功");
          history.back();
        } else {
          throw new Error(msg);
        }
      } catch (error: any) {
        message.error("创建失败");
        console.log(error);
      }
    }
  };

  return (
    <PageContainer>
      <ProForm<FormDataType> layout="vertical" onFinish={handleSubmit}>
        <ProFormGroup>
          <ProFormText name="title" width="md" label="话题标题" required />
          <ProFormSelect
            name="type"
            width="md"
            label="发帖类型"
            valueEnum={{
              question: "提问贴",
              declare: "公告贴",
            }}
            required
          />
        </ProFormGroup>
        <Form.Item name="content" shouldUpdate>
          <TopicEditorMd value={content} onChange={setContent} />
        </Form.Item>
      </ProForm>
    </PageContainer>
  );
};

export default CreateTopicPage;
