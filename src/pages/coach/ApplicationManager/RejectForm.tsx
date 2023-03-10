import {
  ModalForm,
  ProFormGroup,
  ProFormText,
  ProFormTextArea,
  ProFormInstance,
} from "@ant-design/pro-components";
import { Typography, Checkbox, Col, Row, List, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { getRejectReasonsAPI } from "@/services/coach/getRejectReasons";
import { useRequest } from "@umijs/max";
import { useState, useRef } from "react";
import { SubmitRejectReasonsAPI } from "@/services/coach/submitRejectReasons";
const { Link, Text } = Typography;

type PropsType = {
  onReject: (target: number, reason: string) => void;
  record: StudentAPI.ApplicationRecord;
};

const RejectForm = (props: PropsType) => {
  const { onReject, record } = props;
  const formRef = useRef<ProFormInstance>();
  const isSaveReason = useRef(false);
  const [isReasonStoreOpen, setReasonStoreOpen] = useState(false);

  const handleShowReasonStore = () => {
    setReasonStoreOpen(!isReasonStoreOpen);
  };

  const { data: reasons, run: getRejectReasons } = useRequest(
    getRejectReasonsAPI,
    {
      manual: true,
    }
  );

  const handleDeleteReasons = async (index: number) => {
    const tmp = reasons?.list || [];
    if (tmp) tmp.splice(index, 1);
    const res = await SubmitRejectReasonsAPI({
      reasons: tmp,
    });
    if (res.code === 200) getRejectReasons();
  };

  const handleSelectReason = (reason: string) => {
    console.log(reason);
    formRef.current?.setFieldValue("reason", reason);
  };

  return (
    <ModalForm<{ reason: string }>
      formRef={formRef}
      title="驳回申报"
      trigger={
        <Link type="danger" strong>
          {" "}
          驳回{" "}
        </Link>
      }
      width={isReasonStoreOpen ? 800 : 500}
      initialValues={record}
      onOpenChange={(open) => open && getRejectReasons()}
      onFinish={(value: any) => {
        if (isSaveReason.current)
          SubmitRejectReasonsAPI({
            reasons: [...(reasons?.list || []), value.reason],
          });
        onReject(record.id, value.reason);
        return true;
      }}
    >
      <Row gutter={16}>
        <Col span={isReasonStoreOpen ? 12 : 24}>
          <ProFormGroup>
            <ProFormText label="学号" name="username" readonly />
            <ProFormText label="申请项目" name="label" readonly />
            <ProFormText label="申请分数" name="value" readonly />
          </ProFormGroup>
          <ProFormTextArea
            name="reason"
            label="驳回理由"
            placeholder="填写理由和建议"
            width="xl"
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Link onClick={handleShowReasonStore}>
              {!isReasonStoreOpen ? "打开" : "关闭"}理由库
            </Link>
            <Checkbox
              onChange={(e) => (isSaveReason.current = e.target.checked)}
            >
              保存理由供下次使用
            </Checkbox>
          </div>
        </Col>
        {isReasonStoreOpen && (
          <Col span={12}>
            <Text strong>理由库</Text>
            <List
              dataSource={reasons?.list}
              renderItem={(item, index) => (
                <List.Item>
                  <Space>
                    <Link
                      type="danger"
                      onClick={() => handleDeleteReasons(index)}
                    >
                      <DeleteOutlined />
                    </Link>
                    <Text
                      ellipsis={{ tooltip: true }}
                      style={{ width: "280px" }}
                      onClick={() => handleSelectReason(item)}
                    >
                      {item}
                    </Text>
                  </Space>
                </List.Item>
              )}
            />
          </Col>
        )}
      </Row>
    </ModalForm>
  );
};

export default RejectForm;
