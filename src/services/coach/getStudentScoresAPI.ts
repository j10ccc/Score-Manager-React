import { request } from "@@/exports";

export function getStudentScoresAPI(data: CoachAPI.GetStudentScoresData) {
  return request<CoachAPI.GetStudentScoresResult>(
    "/api/coach/queryStudentScores",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        ...data,
      },
    }
  );
}
