import { getMyScoresAPI } from "@/services/student/getMyScores";
import { fillScoreNodeData } from "@/utils";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import type { ProColumns } from "@ant-design/pro-components";
import { Typography } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import TermSelectors from "./TermSelectors";
import OthersScore from "./OthersScore";
const { Text } = Typography;

const columns: ProColumns<StudentAPI.ScoreNodeInterface>[] = [
  {
    title: "模块",
    dataIndex: "label",
    width: 240,
  },
  {
    title: "分数",
    dataIndex: "value",
    width: 120,
    align: "center",
    render: (data, record) => {
      const isNode = record.list !== undefined;
      return (
        <Text code={isNode}>
          <Text type={record.value! >= 0 ? "success" : "danger"}>{data}</Text>
          {record.top! > 0 && <Text type="secondary"> / {record.top}</Text>}
        </Text>
      );
    },
  },
  {
    title: "内容",
    dataIndex: "content",
    ellipsis: true,
  },
  {
    title: "操作",
    width: 120,
  },
];

const MyScoresPage = () => {
  const [loading, setLoading] = useState(false);
  const [scores, setScores] = useState<StudentAPI.ScoreNodeInterface[]>();
  const termInfo = useRef({ year: new Date().getFullYear(), term: "0" });

  const getScores = async (year: string, term: string) => {
    let list: StudentAPI.ScoreNodeInterface[] = [];
    try {
      setLoading(true);
      const res = await getMyScoresAPI({ year, term });
      list = res.data?.list || [];
      list.forEach((item) => {
        fillScoreNodeData(item);
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setScores(list);
    return list;
  };

  const setTermInfo = useCallback((year: number, term: string) => {
    termInfo.current.year = year;
    termInfo.current.term = term;
    console.log(termInfo.current);
    getScores(year.toString(), term);
  }, []);

  useEffect(() => {
    getScores(termInfo.current.year.toString(), termInfo.current.term);
  }, []);

  return (
    <PageContainer ghost>
      <ProTable<StudentAPI.ScoreNodeInterface>
        headerTitle="综测表格"
        rowKey="index"
        columns={columns}
        search={false}
        pagination={false}
        loading={loading}
        toolBarRender={() => [
          <OthersScore key="otherScore" />,
          ...TermSelectors(termInfo, setTermInfo),
        ]}
        dataSource={scores}
        expandable={{
          childrenColumnName: "list",
        }}
        options={{
          reload: () =>
            getScores(termInfo.current.year.toString(), termInfo.current.term),
        }}
      />
    </PageContainer>
  );
};

export default MyScoresPage;
