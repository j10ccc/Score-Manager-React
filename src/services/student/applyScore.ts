import { request } from "@umijs/max";

export const applyScoreAPI = (data: StudentAPI.ApplyScoreAPIData) => {
  return request<StudentAPI.ApplyScoreAPIResult>("/api/student/applyScore", {
    method: "POST",
    headers: { "Content-Type": "multipart/form-data" },
    data,
    withCredentials: true,
  });
};
