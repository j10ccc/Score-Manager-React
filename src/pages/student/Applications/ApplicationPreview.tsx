import { Descriptions, Empty, Space, Tag, Timeline } from "antd";
import { StateRenderMap } from "./MyApplications";

type PropsType = {
  record?: StudentAPI.ApplicationRecord;
};

type ProgressType = {
  label: string;
  color?: "red" | "orange" | "green";
};

const ApplicationProgress: {
  [key: string]: ProgressType;
} = {
  start: { label: "提交申报" },
  pending: { label: "等待审批", color: "orange" },
  rejected: { label: "已驳回", color: "red" },
  approved: { label: "已审批", color: "green" },
  complain: { label: "提交申诉" },
  failed: { label: "申报关闭", color: "red" },
};

const ApplicationPreview = (props: PropsType) => {
  const { record } = props;
  const processes: string[] = ["start", "pending"];

  const initialProcesses = () => {
    if (record === undefined) return;
    if (record?.complain !== undefined) {
      processes.push("rejected");
      processes.push("complain");
      processes.push("pending");
      if (record.state === "rejected") processes.push("failed");
      else if (record.state === "approved") processes.push("approved");
    } else {
      if (record.state === "rejected") processes.push("rejected");
      else if (record.state === "approved") processes.push("approved");
    }
  };

  initialProcesses();

  // TODO: dispaly target
  if (record === undefined) return <Empty />;
  else
    return (
      <>
        <Descriptions size="small" bordered column={3} layout="vertical">
          <Descriptions.Item label="申报项目" span={3}>
            <Space>
              {record.label}
              <Tag color={StateRenderMap[record.state].color}>
                {StateRenderMap[record.state].label}
              </Tag>
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="申报ID" span={2}>
            {record.id}
          </Descriptions.Item>
          <Descriptions.Item label="申报时间">
            {new Date(parseInt(record.time)).toLocaleString("zh-CN")}
          </Descriptions.Item>
          <Descriptions.Item label="学年" span={1}>
            {record.year}
          </Descriptions.Item>
          <Descriptions.Item label="学期" span={1}>
            {record.term}
          </Descriptions.Item>
          <Descriptions.Item label="申请分数" span={1}>
            {record.value}
          </Descriptions.Item>
          {record.content !== undefined && record.content.length !== 0 && (
            <Descriptions.Item label="具体内容" span={3}>
              {record.content?.map((item, index) => (
                <li key={index}> {item} </li>
              ))}
            </Descriptions.Item>
          )}
          <Descriptions.Item label="进度">
            <Timeline style={{ paddingTop: "12px" }}>
              {processes.map((item, index) => {
                return (
                  <Timeline.Item
                    key={index}
                    color={ApplicationProgress[item].color}
                  >
                    <Space direction="vertical">
                      {ApplicationProgress[item].label}
                      {item === "rejected" &&
                        `驳回理由: ${record.rejectReason}`}
                      {item === "complain" && `申诉内容: ${record.complain}`}
                    </Space>
                  </Timeline.Item>
                );
              })}
            </Timeline>
          </Descriptions.Item>
        </Descriptions>
      </>
    );
};

export default ApplicationPreview;
