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

export default ApplicationProgress;
