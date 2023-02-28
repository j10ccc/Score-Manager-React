interface IResponse<T> {
  code: number;
  msg: string;
  data: T;
}

declare namespace CoachAPI {
  interface Coach {
    id: number;
    username: string; // 工号
    name: string;
  }

  interface GetStudentScoresData {
    page?: number;
    size?: number;
    username?: string;
  }

  type GetStudentScoresResult = IResponse<{
    list: Array<
      StudentAPI.Student & { scores: StudentAPI.ScoreNodeInterface[] }
    >;
    total: number;
  }>;

  type GetScoreStructureResult = IResponse<{
    list: StudentAPI.Score[];
  }>;

  interface GetScoreData {
    username: string;
  }

  type GetScoreResult = IResponse<{
    scores: StudentAPI.ScoreNodeInterface[];
  }>;

  type GetApplyListData = {
    page: number;
    size: number;
  };

  type GetApplyListResult = IResponse<{
    count: number;
    list: StudentAPI.ApplicationRecord[];
  }>;

  interface SubmitScoresData {
    target: string; // 学生学号
    scores: StudentAPI.Score[];
  }

  type SubmitScoresResult = IResponse<{
    data: null;
  }>;

  interface SubmitApprovesData {
    applications: Array<{
      target: string; // 审批id
      reason?: string; // 理由
      state: StudentAPI.ApplicationState | "withdraw"; // 审批状态
    }>;
  }

  type SubmitApprovesResult = IResponse<{
    data: null;
  }>;

  interface GetStudentData {
    username: string;
  }

  type GetStudentResult = IResponse<{
    student: {
      id: number;
      username: string;
      major: string;
    };
  }>;
}
