import Guide from "@/components/Guide";
import { PageContainer } from "@ant-design/pro-components";
import { Access, useAccess, useModel } from "@umijs/max";
import { useEffect } from "react";
import { Row, Col } from "antd";
import { homeCover } from "@/constants";
import styles from "./index.less";

type CardPropsType = {
  title: string;
  href: string;
  imgUrl: string;
};

const FuncCard = (props: CardPropsType) => {
  const { title, imgUrl, href } = props;
  return (
    <div className={styles.card}>
      <a href={href} className={styles.link}>
        <img className={styles.img} src={imgUrl} />
      </a>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
};

const HomePage: React.FC = () => {
  const { setName, setRole } = useModel("global");
  const { initialState } = useModel("@@initialState");
  const { user, role } = initialState as any;
  const access = useAccess();

  useEffect(() => {
    setName(user.name);
    setRole(role);
  }, []);
  console.log(initialState);

  return (
    <PageContainer ghost>
      <Guide user={user} />
      <Row gutter={[24, 24]}>
        <Access accessible={access.canSeeCoach}>
          <Col span={12}>
            <FuncCard
              title="学生成绩管理"
              imgUrl={homeCover.coach.scores}
              href="/coach/scores"
            />
          </Col>
        </Access>
        <Access accessible={access.canSeeCoach}>
          <Col span={12}>
            <FuncCard
              title="学生申报管理"
              imgUrl={homeCover.coach.application}
              href="/coach/applications"
            />
          </Col>
        </Access>
        <Access accessible={access.canSeeStudent}>
          <Col span={12}>
            <FuncCard
              title="综测查询"
              imgUrl={homeCover.student.scores}
              href="/student/myscores"
            />
          </Col>
        </Access>
        <Access accessible={access.canSeeStudent}>
          <Col span={12}>
            <FuncCard
              title="综测申报"
              imgUrl={homeCover.student.application}
              href="/student/application/records"
            />
          </Col>
        </Access>
        <Access accessible={access.canSeeStudent}>
          <Col span={12}>
            <FuncCard
              title="提交建议"
              imgUrl={homeCover.student.advice}
              href="/student/advice"
            />
          </Col>
        </Access>
        <Access accessible={access.isLogin}>
          <Col span={12}>
            <FuncCard
              title="话题广场"
              imgUrl={homeCover.square.topic}
              href="/square"
            />
          </Col>
        </Access>
      </Row>
    </PageContainer>
  );
};

export default HomePage;
