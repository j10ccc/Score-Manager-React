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
    year: string;
    term: string;
  }

  interface GetMyScoresAPIResult {
    code: number;
    msg: string;
    data?: {
      list: Array<ScoreNodeInterface>;
    };
  }
}
