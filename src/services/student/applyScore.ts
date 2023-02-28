import { request } from "@umijs/max";

export const applyScoreAPI = (data: StudentAPI.ApplyScoreAPIData) => {
  const token = window.localStorage.getItem("token") || "";
  return request<StudentAPI.ApplyScoreAPIResult>("/api/student/applyScore", {
    method: "POST",
    headers: { Authorization: token },
    data,
    withCredentials: true,
  });
};
