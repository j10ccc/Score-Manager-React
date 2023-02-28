import { history, useModel } from "@umijs/max";
import { Typography } from "antd";
const { Link } = Typography;

type PropsType = {
  record: StudentAPI.ScoreNodeInterface;
};

const ApplyLink = (props: PropsType) => {
  const { record } = props;
  const { setMyApplyTemp } = useModel("student");

  const onClick = () => {
    setMyApplyTemp({
      year: record.year,
      label: record.label,
      index: record.index,
      top: record.top!,
    });
    history.push("myscores/form");
  };

  return (
    <Link onClick={onClick} disabled={record.value !== undefined}>
      申报
    </Link>
  );
};

export default ApplyLink;
