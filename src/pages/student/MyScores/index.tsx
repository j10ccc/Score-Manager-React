import { getMyScoresAPI } from "@/services/student/getMyScores";
import { fillScoreNodeData } from "@/utils";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import type { ProColumns } from "@ant-design/pro-components";
import { Typography } from "antd";
import { useEffect, useState, useRef } from "react";
import TermSelector from "@/components/TermSelector";
import OthersScore from "./OthersScore";
import ApplyLink from "./ApplyLink";
import { getScoreStructureAPI } from "@/services/coach/getScoreStructureAPI";
import fillScoreStructWithScores from "@/utils/fillScoreStructWithScores";
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
      const isBranchNode = record.list !== undefined;
      return (
        <Text code={isBranchNode}>
          {record.value !== undefined ? (
            <>
              <Text type={record.value >= 0 ? "success" : "danger"}>
                {data}
              </Text>
              {record.top! > 0 && <Text type="secondary"> / {record.top}</Text>}
            </>
          ) : (
            <Text type="warning">未申报</Text>
          )}
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
    render: (_, record) => {
      // TODO: check availiable applyTime
      if (record.list === undefined) {
        return <ApplyLink record={record} />;
      }
    },
  },
];

const MyScoresPage = () => {
  const [loading, setLoading] = useState(false);
  const [scores, setScores] = useState<StudentAPI.ScoreNodeInterface[]>();
  const defaultTermInfo = useRef({
    year: new Date().getFullYear(),
  });

  const [selectedTermInfo, setSelectedTermInfo] = useState(
    defaultTermInfo.current
  );

  const getScores = async (year: number) => {
    let list: StudentAPI.ScoreNodeInterface[] = [];
    try {
      setLoading(true);
      const res = await getMyScoresAPI({ year });
      const {
        data: { list: struct },
      } = await getScoreStructureAPI();
      list = fillScoreStructWithScores(struct, res.data?.list || [], year);

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

  const onTermChange = (e: { year: number }) => {
    setSelectedTermInfo(e);
  };

  useEffect(() => {
    getScores(selectedTermInfo.year);
  }, [selectedTermInfo]);

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
          <TermSelector
            key="termSelector"
            onChange={onTermChange}
            defaultValue={defaultTermInfo.current}
          />,
        ]}
        dataSource={scores}
        expandable={{ childrenColumnName: "list" }}
        options={{
          reload: () => getScores(selectedTermInfo.year),
        }}
      />
    </PageContainer>
  );
};

export default MyScoresPage;
