import { ProTable, PageContainer } from "@ant-design/pro-components";
import { getStudentAPI } from "@/services/coach/getStudentAPI";
import { useState, useEffect } from "react";
import type { ProColumns } from "@ant-design/pro-components";
import { Typography } from "antd";
import { getScoreStructureAPI } from "@/services/coach/getScoreStructureAPI";
import { scoreColumsTransfer } from "@/utils";
const { Link } = Typography;

const ScoreManagerPage = () => {
  const [scoreColumns, setScoreColumns] = useState<
    StudentAPI.ScoreNodeInterface[]
  >([]);

  useEffect(() => {
    getScoreStructureAPI().then((res) => {
      const tmp = res.data.list.map((node) => scoreColumsTransfer(node));
      setScoreColumns(tmp);
    });
  }, []);

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
      render: (_, record) => {
        return <Link href={`scores/${record.username}`}>查看</Link>;
      },
    },
  ];

  return (
    <PageContainer ghost>
      <ProTable<StudentAPI.Student>
        request={async (params) => {
          const res = await getStudentAPI({
            page: params.current,
            size: params.pageSize,
          });
          return {
            data: res.data.list,
            success: true,
            total: res.data.total,
          };
        }}
        rowIndex="username"
        columns={columns}
        headerTitle="学生信息"
        toolBarRender={() => {}}
        scroll={{ x: 900 }}
        bordered
      />
    </PageContainer>
  );
};

export default ScoreManagerPage;
