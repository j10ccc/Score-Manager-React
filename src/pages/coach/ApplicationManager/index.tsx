import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Typography, Button, Popconfirm } from "antd";
import RejectForm from "./RejectForm";
import { getApplyListAPI } from "@/services/coach/getApplyListAPI";
import { useState } from "react";
import { submitApprovesAPI } from "@/services/coach/submitApprove";
const { Link } = Typography;

const ApplicationManagerPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: string[]) => {
      setSelectedRowKeys(keys);
    },
  };

  const handleApprove = (targets: StudentAPI.ApplicationRecord["id"][]) => {
    submitApprovesAPI({
      applications: targets.map((item) => ({
        target: item,
        state: "approved",
      })),
    });
  };

  const handleReject = (
    target: StudentAPI.ApplicationRecord["id"],
    reason: string
  ) => {
    // TODO: secondly reject means failed
    submitApprovesAPI({
      applications: [
        {
          target,
          state: "rejected",
          reason,
        },
      ],
    });
  };

  const handleShowDetail = (record: StudentAPI.ApplicationRecord) => {
    console.log(record);
  };

  const columns = [
    { title: "ID", dataIndex: "id", width: 120, fixed: "left" },
    { title: "状态", dataIndex: "state", width: 80 },
    { title: "学号", dataIndex: "username", width: 120 },
    { title: "申报项目", dataIndex: "label", width: 200 },
    { title: "分数", dataIndex: "value", width: 80 },
    {
      title: "理由",
      dataIndex: "content",
      width: 300,
      render: (value: string[]) => {
        // TODO: 处理数据溢出
        return value.join("\n");
      },
    },
    {
      title: "操作",
      fixed: "right",
      valueType: "option",
      render: (_: string, record: StudentAPI.ApplicationRecord) => [
        <>{/** TODO: depend state display */}</>,
        <Popconfirm
          key="approve"
          title="批准申报"
          description="确认批准这条申报?"
          onConfirm={() => handleApprove([record.id])}
        >
          <Link> 批准 </Link>
        </Popconfirm>,
        <RejectForm key="reject" record={record} onReject={handleReject} />,
        <Link key="detail" onClick={() => handleShowDetail(record)}>
          查看
        </Link>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable
        bordered
        scroll={{ x: 900 }}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        columns={columns}
        rowSelection={rowSelection}
        request={async (params: any) => {
          const res = await getApplyListAPI({
            page: params.current,
            size: params.pageSize,
          });
          console.log(res.data.list);

          return {
            data: res.data.list,
            success: true,
            total: res.data.count,
          };
        }}
        toolBarRender={() => {
          return [
            selectedRowKeys.length ? (
              <Button
                type="primary"
                onClick={() => handleApprove(selectedRowKeys)}
              >
                批量批准
              </Button>
            ) : null,
          ];
        }}
      ></ProTable>
    </PageContainer>
  );
};

export default ApplicationManagerPage;
