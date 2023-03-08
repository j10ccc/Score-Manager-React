declare namespace PublicAPI {
  interface LoginAPIData {
    role: "student" | "coach";
    username: string;
    password: string;
  }

  interface LoginAPIResult {
    code: number;
    msg: string;
    data: {
      token: string;
      user: StudentAPI.Student | CoachAPI.Coach;
    };
  }

  interface LoginAPIWithTokenResult {
    code: number;
    msg: string;
    data: {
      user: StudentAPI.Student | CoachAPI.Coach;
      role: "student" | "coach";
    };
  }

  interface ChangePasswordData {
    old: string;
    new: string;
  }

  interface ChangePasswordResult {
    code: number;
    msg: string;
  }
}
