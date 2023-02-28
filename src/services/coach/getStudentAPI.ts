import { request } from "@@/exports";

export function getStudentAPI(data: CoachAPI.GetStudentData) {
  const token = window.localStorage.getItem("token") || "";
  return request<CoachAPI.GetStudentResult>("/api/coach/queryStudent", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    params: {
      ...data,
    },
  });
}
