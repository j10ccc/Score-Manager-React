import { Modal } from "antd";
import ScoresEditor from "@/components/ScoresEditor";

type PropsType = {
  isShow: boolean;
  onHidden: () => void;
  onFinish: (e: StudentAPI.ScoreNodeInterface[]) => void;
  initialData?: StudentAPI.Student & {
    [key: string]: StudentAPI.Score;
  };
};

const ScoreModalForm = (props: PropsType) => {
  const { isShow, initialData, onFinish, onHidden } = props;

  return (
    <Modal open={isShow} footer={null} onCancel={onHidden} width={800}>
      <div style={{ height: "540px", overflowY: "auto" }}>
        <ScoresEditor initialData={initialData} onFinish={onFinish} />
      </div>
    </Modal>
  );
};

export default ScoreModalForm;
