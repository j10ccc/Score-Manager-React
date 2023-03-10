import { useModel } from "@umijs/max";
import { PageContainer } from "@ant-design/pro-components";
import ApplicationForm from "./ApplicationForm";
import { Empty, Tabs } from "antd";

const ApplicationsPage = () => {
  const { myApplyDrafts } = useModel("student");

  return (
    <PageContainer ghost>
      {myApplyDrafts.length === 0 ? (
        <Empty />
      ) : (
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
      )}
    </PageContainer>
  );
};

export default ApplicationsPage;
