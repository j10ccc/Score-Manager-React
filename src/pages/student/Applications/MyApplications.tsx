import { getMyApplyHistoryAPI } from "@/services/student";
import {
  PageContainer,
  ProColumns,
  ProTable,
} from "@ant-design/pro-components";
import { Drawer, Space, Tag } from "antd";
import { ReactNode, useRef, useState } from "react";
import ApplicationPreview from "./ApplicationPreview";

export const StateRenderMap = {
  pending: { label: "申请中", color: "orange" },
  rejected: { label: "已驳回", color: "red" },
  approved: { label: "已审批", color: "green" },
};

const MyApplicationsPage = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [previewData, setPreviewData] =
    useState<StudentAPI.ApplicationRecord>();

  const handleShowPreview = (data: StudentAPI.ApplicationRecord) => {
    setOpenDrawer(true);
    setPreviewData(data);
  };

  const columns = useRef<ProColumns<StudentAPI.ApplicationRecord>[]>([
    {
      title: "申请项目",
      dataIndex: "label",
    },
    {
      title: "学期",
      dataIndex: "term",
    },
    {
      title: "学年",
      dataIndex: "year",
    },
    {
      title: "分数",
      align: "center",
      dataIndex: "value",
    },
    {
      title: "状态",
      dataIndex: "state",
      // @ts-ignore
      render: (text: "pending" | "rejected" | "approved") => (
        <Tag color={StateRenderMap[text].color}>
          {StateRenderMap[text].label}
        </Tag>
      ),
    },
    {
      title: "操作",
      render: (_, record) => {
        const actions: ReactNode[] = [];
        actions.push();
        return (
          <Space>
            <a onClick={() => handleShowPreview(record)}>查看</a>
            {record.state === "rejected" && <a>申诉</a>}
          </Space>
        );
      },
    },
  ]);

  const getMyApplyHistory = async () => {
    let list: StudentAPI.ApplicationRecord[] = [];
    try {
      const res = await getMyApplyHistoryAPI();
      list = res.data?.list || [];
      // TODO: setMyApplyRecords
    } catch (error) {
      console.log(error);
    }
    return list;
  };

  return (
    <PageContainer ghost>
      <ProTable<StudentAPI.ApplicationRecord>
        headerTitle="所有申请"
        columns={columns.current}
        request={async () => {
          return {
            data: await getMyApplyHistory(),
          };
        }}
      />
      <Drawer
        title="申请详情"
        placement="right"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        width={500}
      >
        <ApplicationPreview record={previewData} />
      </Drawer>
    </PageContainer>
  );
};

export default MyApplicationsPage;
