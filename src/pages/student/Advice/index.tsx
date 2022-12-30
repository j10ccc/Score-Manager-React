import { getMyCoachesAPI } from "@/services/student";
import { PageContainer } from "@ant-design/pro-components";
import { useEffect, useState } from "react";

const AdvicePage = () => {
  const [, setLoading] = useState(false);
  const [coaches, setCoaches] = useState<Array<{ name: string; id: string }>>(
    []
  );

  useEffect(() => {
    const getCoaches = async () => {
      try {
        setLoading(true);
        const res = await getMyCoachesAPI();
        setCoaches(res.data?.list || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getCoaches();
  }, []);

  return (
    <PageContainer ghost>
      <>
        {coaches.map((item) => (
          <ul key={item.name}>
            <li>{item.id}</li>
            <li>{item.name}</li>
          </ul>
        ))}
      </>
    </PageContainer>
  );
};

export default AdvicePage;
