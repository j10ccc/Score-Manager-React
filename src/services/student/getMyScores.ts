import { request } from "@umijs/max";

export const getMyScoresAPI = (data: StudentAPI.GetMyScoresAPIData) => {
  return request<StudentAPI.GetMyScoresAPIResult>("/api/student/getMyScores", {
    method: "GET",
    withCredentials: true,
    params: data,
  });
};
