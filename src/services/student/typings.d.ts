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
}
