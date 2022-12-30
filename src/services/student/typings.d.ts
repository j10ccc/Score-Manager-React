declare namespace StudentAPI {
  interface GetMyCoachesAPIResult {
    code: number;
    msg: string;
    data?: {
      list: Array<{ name: string; id: string }>;
    };
  }
}
