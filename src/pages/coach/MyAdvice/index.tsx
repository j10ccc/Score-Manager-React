import { getMyAdviceAPI } from "@/services/coach/getMyAdvice";
import { PageContainer, ProList } from "@ant-design/pro-components";
import { useRequest } from "@umijs/max";

const MyAdvice = () => {
  const { data, loading } = useRequest(getMyAdviceAPI);
  console.log(data?.advice);

  return (
    <PageContainer>
      <ProList
        loading={loading}
        headerTitle="我的建议"
        dataSource={data?.advice}
        metas={{
          title: {
            render: (_, record) => {
              if (record.studentName) return record.studentName;
              else return "匿名";
            },
          },
          description: {
            dataIndex: "content",
          },
        }}
      ></ProList>
    </PageContainer>
  );
};

export default MyAdvice;
