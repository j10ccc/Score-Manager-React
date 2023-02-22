import { getScoreStructureAPI } from "@/services/coach/getScoreStructureAPI";
import { ReactNode, useEffect, useState } from "react";
import { ProForm, ProFormText, ProFormGroup } from "@ant-design/pro-components";

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
      <ProFormText
        key={node.index}
        name={node.index}
        label={node.label}
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
      setFormStructure(res.data.list);
    });
  }, []);

  return (
    <ProForm initialValues={initialData} onFinish={onFinish} layout="vertical">
      <ProFormGroup>
        <ProFormText label="学号" name="username" />
        <ProFormText label="姓名" value="j10c" readonly />
      </ProFormGroup>
      {formStructure?.map((item) => {
        return dfs(item);
      })}
    </ProForm>
  );
};

export default ScoresEditor;
