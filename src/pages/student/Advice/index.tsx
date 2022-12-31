import { getMyCoachesAPI, submitAdviceAPI } from "@/services/student";
import {
  PageContainer,
  ProForm,
  ProFormGroup,
  ProFormSelect,
  ProFormSwitch,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { Form, message } from "antd";

const AdvicePage = () => {
  const [form] = Form.useForm();

  const onFinish = async (formData: {
    target: string;
    content: string;
    isAnon: boolean;
  }) => {
    try {
      const res = await submitAdviceAPI(formData);
      console.log(res);
      message.success("提交成功");
      form.resetFields();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageContainer ghost>
      <ProForm
        style={{ background: "white", padding: "24px" }}
        onFinish={onFinish}
        initialValues={{ isAnon: false }}
        form={form}
      >
        <ProFormGroup title="向辅导员提交建议">
          <ProFormTextArea
            name="content"
            label="建议内容"
            width="lg"
            rules={[{ required: true, message: "请输入建议内容" }]}
          />
        </ProFormGroup>
        <ProFormGroup>
          <ProFormSelect
            name="target"
            label="辅导员姓名"
            request={async () => {
              const res = await await getMyCoachesAPI();
              return (
                res.data?.list.map((item) => ({
                  label: item.name,
                  value: item.id,
                })) || []
              );
            }}
            placeholder="选择辅导员"
            rules={[{ required: true, message: "选择一位辅导员" }]}
          />
          <ProFormSwitch
            name="isAnon"
            label="是否匿名"
            checkedChildren="匿名"
          />
        </ProFormGroup>
      </ProForm>
    </PageContainer>
  );
};

export default AdvicePage;
