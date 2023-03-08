import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable,
} from "@ant-design/pro-components";
import { Typography, Button, Popconfirm, message, Tag } from "antd";
import RejectForm from "./RejectForm";
import { getApplyListAPI } from "@/services/coach/getApplyListAPI";
import { useRef, useState } from "react";
import { submitApprovesAPI } from "@/services/coach/submitApprove";
import { ApplicationState } from "@/constants";
const { Link } = Typography;

const ApplicationManagerPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const actionRef = useRef<ActionType>();
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: number[]) => {
      setSelectedRowKeys(keys);
    },
  };

  const handleApprove = async (
    targets: StudentAPI.ApplicationRecord["id"][]
  ) => {
    const res = await submitApprovesAPI({
      applications: targets.map((item) => ({
        target: item.toString(),
        state: "approved",
      })),
    });
    if (res.code === 200) {
      actionRef.current?.reload();
      message.success("批准成功");
    } else {
      message.error("批准失败");
    }
  };

  const handleWithdraw = async (target: StudentAPI.ApplicationRecord["id"]) => {
    const res = await submitApprovesAPI({
      applications: [{ target: target.toString(), state: "withdraw" }],
    });
    if (res.code === 200) {
      message.success("撤销成功");
      actionRef.current?.reload();
      return true;
    } else {
      message.error(`撤销失败 ${res.msg || "未知错误"}`);
      return false;
    }
  };

  const handleReject = async (
    target: StudentAPI.ApplicationRecord["id"],
    reason: string
  ) => {
    // TODO: secondly reject means failed
    const res = await submitApprovesAPI({
      applications: [
        {
          target: target.toString(),
          state: "rejected",
          reason,
        },
      ],
    });
    if (res.code === 200) {
      actionRef.current?.reload();
    } else {
      message.error("驳回失败");
    }
  };

  const handleShowDetail = (record: StudentAPI.ApplicationRecord) => {
    console.log(record);
  };

  const columns: ProColumns<StudentAPI.ApplicationRecord[]> = [
    { title: "ID", dataIndex: "id", width: 80, fixed: "left" },
    {
      title: "状态",
      dataIndex: "state",
      width: 80,
      render: (text: keyof typeof ApplicationState) => {
        return (
          <Tag color={ApplicationState[text].color}>
            {ApplicationState[text].label}
          </Tag>
        );
      },
    },
    { title: "学号", dataIndex: "username", width: 120 },
    {
      title: "学年",
      dataIndex: "year",
      width: 80,
      render: (text: string) => <strong>{text}</strong>,
    },
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
      render: (text: string, record: StudentAPI.ApplicationRecord) => [
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
        record.state === "pending" || record.state === "complain" ? (
          <RejectForm key="reject" record={record} onReject={handleReject} />
        ) : null,
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
        actionRef={actionRef}
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
