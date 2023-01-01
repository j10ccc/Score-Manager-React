import { getOthersScoresAPI } from "@/services/student/getOthersScore";
import {
  ModalForm,
  ProFormGroup,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, Descriptions, Empty, message } from "antd";
import { useState } from "react";

type ScoreInfoType = {
  year: number;
  term: number;
  target: string;
  name?: string;
  score?: number;
};

const OthersScore = () => {
  // const [form] = Form.useForm<ScoreInfoType>();

  const yearOptions: Array<{ value: number; label: string }> = [];
  const termOptions: Array<{ value: number; label: string }> = [
    { value: 0, label: "上学期" },
    { value: 1, label: "下学期" },
  ];
  const year = new Date().getFullYear();
  for (let i = 0; i < 4; i++) {
    yearOptions.push({
      value: year - i,
      label: (year - i).toString(),
    });
  }

  const [scoreInfo, setScoreInfo] = useState<ScoreInfoType>();

  const onFinish = async (formData: {
    year: number;
    term: number;
    target: string;
  }) => {
    const { year, term, target } = formData;
    try {
      const res = await getOthersScoresAPI(formData);
      setScoreInfo({ ...res.data, year, term, target });
      message.success("查询成功");
    } catch (error) {
      message.error("查询失败");
      setScoreInfo(undefined);
      console.log(error);
    }
  };

  return (
    <ModalForm<{
      year: number;
      term: number;
      target: string;
    }>
      title="查询他人综测"
      trigger={<Button type="primary">查询他人成绩</Button>}
      onFinish={onFinish}
      initialValues={{ year, term: 0 }}
    >
      <ProFormGroup>
        <ProFormSelect
          name="year"
          label="学年"
          options={yearOptions}
          rules={[{ required: true }]}
        />
        <ProFormSelect
          name="term"
          label="学期"
          options={termOptions}
          rules={[{ required: true }]}
        />
        <ProFormText name="target" label="学号" rules={[{ required: true }]} />
      </ProFormGroup>
      {!scoreInfo ? (
        <Empty description="输入成绩以查询结果" />
      ) : (
        <Descriptions title="目标成绩" column={3}>
          <Descriptions.Item label="学年">{scoreInfo?.year}</Descriptions.Item>
          <Descriptions.Item label="学期" span={2}>
            {scoreInfo?.term === 0 ? "上" : "下"}
          </Descriptions.Item>
          <Descriptions.Item label="学号">
            {scoreInfo?.target}
          </Descriptions.Item>
          <Descriptions.Item label="姓名">{scoreInfo?.name}</Descriptions.Item>
          <Descriptions.Item label="成绩">{scoreInfo?.score}</Descriptions.Item>
        </Descriptions>
      )}
    </ModalForm>
  );
};

export default OthersScore;
