import { getScoreStructureAPI } from "@/services/coach/getScoreStructureAPI";
import { ReactNode, useEffect, useState } from "react";
import {
  ProForm,
  ProFormText,
  ProFormDigit,
  ProFormGroup,
} from "@ant-design/pro-components";
import { scoreForestTransfer } from "@/utils";

type PropsType = {
  onFinish: (e: StudentAPI.ScoreNodeInterface[]) => void;
  initialData?: StudentAPI.Student & {
    [key: string]: StudentAPI.Score;
  };
};

const dfs = (node: StudentAPI.ScoreNodeInterface): ReactNode => {
  // TODO: beautify
  if (node.list) {
    return (
      <ProFormGroup key={node.index} title={node.label}>
        {node.list.map((item) => dfs(item))}
      </ProFormGroup>
    );
  } else {
    return (
      <ProFormDigit
        key={node.index}
        name={node.index}
        label={node.label}
        fieldProps={{ precision: 1 }}
        max={node.top! > 0 ? node.top : false}
        placeholder={node.top! > 0 ? `最高分 ${node.top} 分` : undefined}
        width={200}
      />
    );
  }
};

const ScoresEditor = (props: PropsType) => {
  const { initialData, onFinish } = props;

  const [formStructure, setFormStructure] =
    useState<StudentAPI.ScoreNodeInterface[]>();

  useEffect(() => {
    getScoreStructureAPI().then((res) => {
      setFormStructure(scoreForestTransfer(res.data.list));
    });
  }, []);

  return (
    <ProForm initialValues={initialData} onFinish={onFinish} layout="vertical">
      <ProFormGroup>
        <ProFormText
          label="学号"
          name="username"
          rules={[{ required: true, message: "请输入学号" }]}
        />
        <ProFormText label="姓名" value="j10c" readonly />
      </ProFormGroup>
      {formStructure?.map((item) => {
        return dfs(item);
      })}
    </ProForm>
  );
};

export default ScoresEditor;
