type InitialStateType = {
  name: string;
  role: "student" | "coach";
  token: "string";
};

export default (initialState: InitialStateType) => {
  const { role } = initialState;

  const isLogin = role === "coach" || role === "student";
  const canSeeStudent = role === "student";
  const canSeeCoach = role === "coach";

  return {
    isLogin,
    canSeeStudent,
    canSeeCoach,
  };
};
