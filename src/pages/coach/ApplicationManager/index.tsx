import {
  PageContainer,
  ProColumns,
  ProTable,
} from "@ant-design/pro-components";
import { Typography, Button, Popconfirm } from "antd";
import RejectForm from "./RejectForm";
import { getApplyListAPI } from "@/services/coach/getApplyListAPI";
import { useState } from "react";
import { submitApprovesAPI } from "@/services/coach/submitApprove";
const { Link } = Typography;

const ApplicationManagerPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: number[]) => {
      setSelectedRowKeys(keys);
    },
  };

  const handleApprove = (targets: StudentAPI.ApplicationRecord["id"][]) => {
    submitApprovesAPI({
      applications: targets.map((item) => ({
        target: item.toString(),
        state: "approved",
      })),
    });
  };

  const handleWithdraw = (target: StudentAPI.ApplicationRecord["id"]) => {
    submitApprovesAPI({
      applications: [{ target: target.toString(), state: "withdraw" }],
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
          target: target.toString(),
          state: "rejected",
          reason,
        },
      ],
    });
  };

  const handleShowDetail = (record: StudentAPI.ApplicationRecord) => {
    console.log(record);
  };

  const columns: ProColumns<StudentAPI.ApplicationRecord[]> = [
    { title: "ID", dataIndex: "id", width: 80, fixed: "left" },
    { title: "状态", dataIndex: "state", width: 80 },
    { title: "学号", dataIndex: "username", width: 120 },
    { title: "申报项目", dataIndex: "label", width: 300 },
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
        record.state === "pending" || record.state === "complain" ? (
          <Popconfirm
            key="approve"
            title="批准申报"
            description="确认批准这条申报?"
            onConfirm={() => handleApprove([record.id])}
          >
            <Link> 批准 </Link>
          </Popconfirm>
        ) : null,
        <RejectForm key="reject" record={record} onReject={handleReject} />,
        record.state !== "pending" ? (
          <Popconfirm
            key="approve"
            title="撤销申报"
            description="确认撤销这条申报?"
            onConfirm={() => handleWithdraw(record.id)}
          >
            <Link type="danger">撤销</Link>
          </Popconfirm>
        ) : null,
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
