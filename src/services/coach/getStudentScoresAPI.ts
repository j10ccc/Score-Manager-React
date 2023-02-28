import { request } from "@@/exports";

export function getStudentScoresAPI(data: CoachAPI.GetStudentScoresData) {
  const token = window.localStorage.getItem("token") || "";
  return request<CoachAPI.GetStudentScoresResult>(
    "/api/coach/queryStudentScores",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      params: {
        ...data,
      },
    }
  );
}
