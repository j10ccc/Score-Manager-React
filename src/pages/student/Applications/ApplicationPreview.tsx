import { ApplicationProgress } from "@/constants";
import { Descriptions, Empty, Space, Tag, Timeline } from "antd";
import { ApplicationState } from "@/constants";

type PropsType = {
  record?: StudentAPI.ApplicationRecord;
};

const ApplicationPreview = (props: PropsType) => {
  const { record } = props;
  const processes: string[] = ["start", "pending"];

  const initialProcesses = () => {
    if (record === undefined) return;
    if (record?.complain !== undefined && record.complain !== "") {
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
        <Descriptions size="small" bordered column={4} layout="vertical">
          <Descriptions.Item label="申报项目" span={4}>
            <Space>
              {record.label}
              <Tag color={ApplicationState[record.state].color}>
                {ApplicationState[record.state].label}
              </Tag>
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="申报ID" span={1}>
            {record.id}
          </Descriptions.Item>
          <Descriptions.Item label="申报时间" span={1}>
            {new Date(record.time).toLocaleString("zh-CN")}
          </Descriptions.Item>
          <Descriptions.Item label="学年" span={1}>
            {record.year}
          </Descriptions.Item>
          <Descriptions.Item label="申请分数" span={1}>
            {record.value}
          </Descriptions.Item>
          {record.content !== undefined && record.content.length !== 0 && (
            <Descriptions.Item label="具体内容" span={4}>
              {record.content?.map((item, index) => (
                <li key={index}> {item} </li>
              ))}
            </Descriptions.Item>
          )}
          <Descriptions.Item label="进度" span={4}>
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
