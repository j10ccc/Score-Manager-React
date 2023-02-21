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
    list: Array<StudentAPI.Student>;
    total: number;
  }>;

  type GetScoreStructureResult = IResponse<{
    list: StudentAPI.ScoreNodeInterface[];
  }>;
}
