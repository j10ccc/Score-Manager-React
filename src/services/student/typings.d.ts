declare namespace StudentAPI {
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
    label: string;
    index: string;
    list?: ScoreNodeInterface[];
    content?: Array<string>;
    value?: number;
    top?: number;
    unique?: boolean;
    applyTime?: string | null;
  }

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
