import { PageContainer } from "@ant-design/pro-components";
import ApplicationForm from "../Applications/ApplicationForm";
import { useModel } from "@umijs/max";
import { Empty } from "antd";

const CreateDraftPage = () => {
  const { myApplyTemp } = useModel("student");
  return (
    <PageContainer ghost>
      {myApplyTemp === undefined ? (
        <Empty />
      ) : (
        <ApplicationForm initialData={myApplyTemp} />
      )}
    </PageContainer>
  );
};

export default CreateDraftPage;
