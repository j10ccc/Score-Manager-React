import { history, useModel } from "@umijs/max";
import { Typography } from "antd";
const { Link } = Typography;

type PropsType = {
  record: StudentAPI.ScoreNodeInterface;
};

const ApplyLink = (props: PropsType) => {
  const { record } = props;
  const { setMyApplyTemp, selectTermInfo } = useModel("student");

  const onClick = () => {
    setMyApplyTemp({
      ...selectTermInfo,
      label: record.label,
      index: record.index,
      top: record.top!,
    });
    history.push("myscores/form");
  };

  return <Link onClick={onClick}>申报</Link>;
};

export default ApplyLink;
