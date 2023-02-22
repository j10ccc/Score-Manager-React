import {
  ModalForm,
  ProFormGroup,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { Typography } from "antd";
const { Link } = Typography;

type PropsType = {
  onReject: (target: string, reason: string) => void;
  record: StudentAPI.ApplicationRecord;
};

const RejectForm = (props: PropsType) => {
  const { onReject, record } = props;
  // TODO: 理由库

  return (
    <ModalForm<{ reason: string }>
      title="驳回申报"
      trigger={<Link> 驳回 </Link>}
      width={500}
      bordered
      onFinish={(value: any) => {
        onReject(record.id, value.reason);
        return true;
      }}
    >
      <ProFormGroup layout="vertical">
        <ProFormText label="学号" value={record.username} readonly />
        <ProFormText label="申请项目" value={record.label} readonly />
        <ProFormText label="申请分数" value={record.value} readonly />
      </ProFormGroup>
      <ProFormGroup>
        <ProFormTextArea
          name="reason"
          label="驳回理由"
          placeholder="填写理由和建议"
          width="xl"
        />
      </ProFormGroup>
    </ModalForm>
  );
};

export default RejectForm;
