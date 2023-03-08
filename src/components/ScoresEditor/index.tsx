import { getScoreStructureAPI } from "@/services/coach/getScoreStructureAPI";
import { ReactNode, useEffect, useRef, useState } from "react";
import {
  ProForm,
  ProFormText,
  ProFormDigit,
  ProFormGroup,
  ProFormInstance,
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
        max={node.top! > 0 ? node.top : undefined}
        placeholder={node.top! > 0 ? `最高分 ${node.top} 分` : undefined}
        width={200}
      />
    );
  }
};

const ScoresEditor = (props: PropsType) => {
  const { initialData, onFinish } = props;
  const formRef = useRef<ProFormInstance<typeof initialData>>();

  const [formStructure, setFormStructure] =
    useState<StudentAPI.ScoreNodeInterface[]>();

  useEffect(() => {
    getScoreStructureAPI().then((res) => {
      setFormStructure(scoreForestTransfer(res.data.list));
    });
  }, []);

  useEffect(() => {
    formRef.current?.resetFields();
    formRef.current?.setFieldsValue(initialData);
  }, [initialData]);

  return (
    <ProForm<typeof initialData>
      formRef={formRef}
      onFinish={onFinish}
      layout="vertical"
    >
      <ProFormGroup>
        <ProFormText
          label="学号"
          name="username"
          rules={[{ required: true, message: "请输入学号" }]}
        />
        <ProFormText label="学年" name="year" readonly />
      </ProFormGroup>
      {formStructure?.map((item) => {
        return dfs(item);
      })}
    </ProForm>
  );
};

export default ScoresEditor;
