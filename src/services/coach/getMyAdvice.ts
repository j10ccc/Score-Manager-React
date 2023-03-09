import { request } from "@@/exports";

export function getMyAdviceAPI() {
  const token = window.localStorage.getItem("token") || "";
  return request<CoachAPI.GetMyAdviceResult>("/api/coach/advice", {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
}
