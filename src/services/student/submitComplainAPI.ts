import { request } from "@umijs/max";

export const submitComplainAPI = async (
  data: StudentAPI.SubmitComplainData
) => {
  const token = window.localStorage.getItem("token") || "";
  return request<StudentAPI.SubmitComplainResult>(
    "/api/student/submitComplain",
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
