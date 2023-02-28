import { request } from "@umijs/max";

export const submitAdviceAPI = async (data: StudentAPI.SubmitAdviceAPIData) => {
  const token = window.localStorage.getItem("token") || "";
  return request<StudentAPI.SubmitAdviceAPIReasult>(
    "/api/student/submitAdvice",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      data,
    }
  );
};
