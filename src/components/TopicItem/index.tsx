import styles from "./index.module.less";

type PropsType = {
  title: string;
  content: string;
  time: string;
  userRole: "coach" | "student";
};

const TopicItem = (props: PropsType) => {
  const { title, content, time, userRole } = props;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.author}>{userRole}</span>
        <span className={styles.time}>{time}</span>
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>{content}</div>
    </div>
  );
};

export default TopicItem;
