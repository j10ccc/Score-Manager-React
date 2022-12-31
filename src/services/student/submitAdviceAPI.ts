import { request } from "@umijs/max";

export const submitAdviceAPI = async (data: StudentAPI.SubmitAdviceAPIData) => {
  return request<StudentAPI.SubmitAdviceAPIReasult>(
    "/api/student/submitAdvice",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data,
    }
  );
};
