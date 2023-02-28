import { request } from "@umijs/max";

export const getMyScoresAPI = (data: StudentAPI.GetMyScoresAPIData) => {
  const token = window.localStorage.getItem("token") || "";
  return request<StudentAPI.GetMyScoresAPIResult>("/api/student/getMyScores", {
    method: "GET",
    withCredentials: true,
    params: data,
    headers: {
      Authorization: token,
    },
  });
};
