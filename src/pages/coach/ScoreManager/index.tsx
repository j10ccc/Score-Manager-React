import { ProTable, PageContainer } from "@ant-design/pro-components";
import { getStudentAPI } from "@/services/coach/getStudentAPI";
import { useState, useEffect, useRef } from "react";
import type { ProColumns } from "@ant-design/pro-components";
import { Typography, Button } from "antd";
import { getScoreStructureAPI } from "@/services/coach/getScoreStructureAPI";
import { flattenScoresNodes, scoreColumsTransfer } from "@/utils";
import { omit } from "lodash-es";
import ScoreModalForm from "./ScoreModalForm";
const { Link } = Typography;

const ScoreManagerPage = () => {
  const [scoreColumns, setScoreColumns] = useState<
    StudentAPI.ScoreNodeInterface[]
  >([]);
  const [showEditor, setShowEditor] = useState(false);
  const formStore = useRef<
    StudentAPI.Student & {
      [key: string]: StudentAPI.Score;
    }
  >();

  useEffect(() => {
    getScoreStructureAPI().then((res) => {
      const tmp = res.data.list.map((node) => scoreColumsTransfer(node));
      setScoreColumns(tmp);
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

  const handleEditFinish = (e: any) => {
    setShowEditor(false);
    console.log(e);
  };

  const handleEditorClose = () => {
    setShowEditor(false);
  };

  const columns: ProColumns<StudentAPI.Student>[] = [
    {
      title: "姓名",
      dataIndex: "name",
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
      render: (_: string, record: any) => {
        return <Link onClick={() => handleUpdateScore(record)}>编辑</Link>;
      },
    },
  ];

  return (
    <PageContainer ghost>
      <ProTable<StudentAPI.Student>
        request={async (params: any) => {
          const res = await getStudentAPI({
            page: params.current,
            size: params.pageSize,
          });
          const tmp = res.data.list.map((item) => {
            const flattenList = flattenScoresNodes(item.scores);
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
        rowIndex="username"
        columns={columns}
        headerTitle="学生信息"
        toolBarRender={() => [
          <Button key="input" type="primary" onClick={handleInputScore}>
            录入成绩
          </Button>,
        ]}
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
