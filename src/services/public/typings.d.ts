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
      name: string;
    };
  }

  interface LoginAPIWithTokenResult {
    code: number;
    msg: string;
    data: {
      name: string;
      role: "student" | "coach";
    };
  }
}
