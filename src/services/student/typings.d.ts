declare namespace StudentAPI {
  interface Student {
    id: number;
    username: string;
    name: string;
  }

  interface GetMyCoachesAPIResult {
    code: number;
    msg: string;
    data?: {
      list: Array<{ name: string; id: string }>;
    };
  }

  interface SubmitAdviceAPIData {
    target: string;
    content: string;
    isAnon: boolean;
  }

  interface SubmitAdviceAPIReasult {
    code: number;
    msg: string;
  }

  interface ScoreNodeInterface {
    /** 中文名 e.g. 基本评定分 */
    label: string;
    /** 节点索引 e.g. v-2-1 */
    index: string;
    /** 父节点特有的子节点嵌套列表 */
    list?: ScoreNodeInterface[];
    /** 申请内容，可以多条 */
    content?: Array<string>;
    /** 分数 */
    value?: number;
    /** 该项分数上限 */
    top?: number;
    /** deprecated: 是否唯一 */
    unique?: boolean;
    /** 申请填写时间 */
    applyTime?: string | null;
  }

  /** e.g. year: 2021, term: 0 */
  interface GetMyScoresAPIData {
    year: number;
    term: number;
  }

  interface GetMyScoresAPIResult {
    code: number;
    msg: string;
    data?: {
      list: Array<ScoreNodeInterface>;
    };
  }

  interface GetOthersScoresAPIData {
    year: number;
    term: number;
    target: string;
  }

  interface GetOthersScoresAPIResult {
    code: number;
    msg: string;
    data?: {
      score: number;
    };
  }

  interface Application {
    guid?: string; // for local store
    term: number;
    year: number;
    label: string; // 中文名
    index: string; // 定位
    top: number;
    value?: number;
    content?: string[];
    target?: string; // 辅导员工号
    // TODO: files
  }

  interface ApplicationRecord extends Application {
    id: string;
    time: string;
    state: "rejected" | "pending" | "approved";
    rejectReason?: string; // 辅导员驳回理由
    complain?: string; // 学生申诉内容
  }

  interface ApplyScoreAPIData {
    name: string;
    value: string;
    content?: string;
    files?: any;
  }

  interface ApplyScoreAPIResult {
    code: number;
    msg: string;
    data?: {
      id: string;
    };
  }

  interface GetMyApplyHistoryAPIResult {
    code: number;
    msg: string;
    data?: {
      list: ApplicationRecord[];
    };
  }
}
