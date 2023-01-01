import { useModel } from "@umijs/max";
import { PageContainer } from "@ant-design/pro-components";
import ApplicationForm from "./ApplicationForm";
import { Tabs } from "antd";

const ApplicationsPage = () => {
  const { myApplyDrafts } = useModel("student");
  console.log(myApplyDrafts);

  return (
    <PageContainer ghost>
      <Tabs
        defaultActiveKey="1"
        type="card"
        items={myApplyDrafts.map((item) => {
          return {
            label: item.label,
            key: item.guid,
            children: <ApplicationForm key={item.guid} initialData={item} />,
          };
        })}
      />
    </PageContainer>
  );
};

export default ApplicationsPage;
