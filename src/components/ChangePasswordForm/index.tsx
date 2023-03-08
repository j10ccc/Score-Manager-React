import { ModalForm, ProFormText } from "@ant-design/pro-components";
import { Typography } from "antd";

type PropsType = {
  onFinish: (formData: any) => Promise<boolean>;
};

const ChangePasswordForm = (props: PropsType) => {
  const { onFinish } = props;
  return (
    <ModalForm
      title="修改密码"
      width={400}
      onFinish={onFinish}
      trigger={<Typography.Link>修改密码</Typography.Link>}
    >
      <ProFormText name="old" label="旧密码" required />
      <ProFormText.Password name="new" label="新密码" required />
      <ProFormText.Password name="confirm" label="确认新密码" required />
    </ModalForm>
  );
};

export default ChangePasswordForm;
