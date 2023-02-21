import { request } from "@@/exports";

export function getStudentAPI(data: CoachAPI.GetStudentData) {
  return request<CoachAPI.GetStudentResult>("/api/coach/queryStudent", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      ...data,
    },
  });
}
