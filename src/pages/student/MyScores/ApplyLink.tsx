import { history, useModel } from "@umijs/max";
import { Typography, Modal } from "antd";
import { ApplyConfirmText } from "@/constants";

const { Link } = Typography;

type PropsType = {
  record: StudentAPI.ScoreNodeInterface;
};

const ApplyLink = (props: PropsType) => {
  const { record } = props;
  const { setMyApplyTemp } = useModel("student");

  const onClick = () => {
    Modal.confirm({
      width: 600,
      title: "申报综测分守则",
      content: ApplyConfirmText,
      okText: "我已阅读并遵守，进入申报页面",
      onOk: () => {
        setMyApplyTemp({
          year: record.year,
          label: record.label,
          index: record.index,
          top: record.top!,
        });
        history.push("myscores/form");
      },
    });
  };

  return (
    <Link onClick={onClick} disabled={record.value !== undefined}>
      申报
    </Link>
  );
};

export default ApplyLink;
