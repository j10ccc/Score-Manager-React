interface IResponse<T> {
  code: number;
  msg: string;
  data: T;
}

declare namespace CoachAPI {
  interface GetStudentData {
    page?: number;
    size?: number;
    username?: string;
  }

  type GetStudentResult = IResponse<{
    list: Array<
      StudentAPI.Student & { scores: StudentAPI.ScoreNodeInterface[] }
    >;
    total: number;
  }>;

  type GetScoreStructureResult = IResponse<{
    list: StudentAPI.ScoreNodeInterface[];
  }>;

  interface GetScoreData {
    username: string;
  }

  type GetScoreResult = IResponse<{
    scores: StudentAPI.ScoreNodeInterface[];
  }>;
}
