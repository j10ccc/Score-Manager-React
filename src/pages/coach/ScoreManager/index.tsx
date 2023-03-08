import {
  ProTable,
  PageContainer,
  ActionType,
} from "@ant-design/pro-components";
import { getStudentScoresAPI } from "@/services/coach/getStudentScoresAPI";
import { useState, useEffect, useRef } from "react";
import type { ProColumns } from "@ant-design/pro-components";
import { Typography, Button, message } from "antd";
import { getScoreStructureAPI } from "@/services/coach/getScoreStructureAPI";
import {
  flattenScoresNodes,
  scoreColumnsTransfer,
  scoreForestTransfer,
} from "@/utils";
import { omit } from "lodash-es";
import ScoreModalForm from "./ScoreModalForm";
import { submitScoresAPI } from "@/services/coach/submitScoresAPI";
const { Link } = Typography;

const ScoreManagerPage = () => {
  const [scoreColumns, setScoreColumns] = useState<ProColumns[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const formStore = useRef<
    StudentAPI.Student & {
      [key: string]: StudentAPI.Score;
    } & { year: string }
  >();
  const actionRef = useRef<ActionType>();

  useEffect(() => {
    getScoreStructureAPI().then((res) => {
      const struct = scoreForestTransfer(res.data.list);
      const tmp = struct.map((node) => scoreColumnsTransfer(node));
      setScoreColumns(
        tmp.map((item) => ({
          ...item,
          hideInSearch: true,
        }))
      );
    });
  }, []);

  const handleInputScore = () => {
    formStore.current = undefined;
    setShowEditor(true);
  };

  const handleUpdateScore = (value: any) => {
    formStore.current = value;
    setShowEditor(true);
  };

  const handleEditFinish = async (e: any) => {
    setShowEditor(false);

    const tmp: any = {
      target: e.username,
      year: parseInt(e.year),
      scores: [],
    };
    Object.entries(omit(e, ["username", "year"])).forEach((item) => {
      tmp.scores.push({ index: item[0], value: item[1] });
    });
    try {
      const res = await submitScoresAPI({ ...tmp });
      if (res.code === 200) {
        message.success("录入成功");
        actionRef.current?.reload();
      } else throw new Error(res.msg);
    } catch (e: any) {
      message.error(e.message || "未知错误");
    }
  };

  const handleEditorClose = () => {
    setShowEditor(false);
  };

  const columns: ProColumns<StudentAPI.Student>[] = [
    {
      title: "姓名",
      dataIndex: "name",
      hideInSearch: true,
      fixed: "left",
      width: 80,
    },
    {
      title: "学号",
      dataIndex: "username",
      fixed: "left",
      width: 120,
    },
    ...scoreColumns,
    {
      title: "操作",
      valueType: "option",
      key: "option",
      fixed: "right",
      width: 60,
      render: (_, record: any) => {
        return <Link onClick={() => handleUpdateScore(record)}>编辑</Link>;
      },
    },
  ];

  return (
    <PageContainer ghost>
      <ProTable<StudentAPI.Student>
        request={async (params) => {
          const res = await getStudentScoresAPI({
            page: params.current,
            size: params.pageSize,
            username: params.username,
          });
          const tmp = res.data.list.map((item) => {
            const flattenList = item.scores
              ? flattenScoresNodes(item.scores)
              : [];
            const newItem: any = omit(item, ["scores"]);
            flattenList.forEach((score) => {
              newItem[score.index] = score.value;
            });
            return newItem;
          });
          return {
            data: tmp,
            success: true,
            total: res.data.total,
          };
        }}
        rowKey="username"
        actionRef={actionRef}
        columns={columns}
        headerTitle="学生信息"
        toolBarRender={() => [
          <Button key="input" type="primary" onClick={handleInputScore}>
            录入成绩
          </Button>,
        ]}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 900 }}
        bordered
      />
      <ScoreModalForm
        isShow={showEditor}
        onFinish={handleEditFinish}
        initialData={formStore.current}
        onHidden={handleEditorClose}
      />
    </PageContainer>
  );
};

export default ScoreManagerPage;
