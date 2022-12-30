import Guide from "@/components/Guide";
import { PageContainer } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import styles from "./index.less";
import { useEffect } from "react";

const HomePage: React.FC = () => {
  const { setName, setRole } = useModel("global");
  const { initialState } = useModel("@@initialState");
  const { name, role } = initialState as any;

  useEffect(() => {
    setName(name);
    setRole(role);
    console.log(initialState);
  }, []);

  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Guide name={name || ""} />
      </div>
    </PageContainer>
  );
};

export default HomePage;
