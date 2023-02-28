import { request } from "@@/exports";

export function getScoreAPI(params: CoachAPI.GetScoreData) {
  const token = window.localStorage.getItem("token") || "";
  return request<CoachAPI.GetScoreResult>("/api/coach/scores/query", {
    method: "GET",
    params,
    headers: {
      Authorization: token,
    },
  });
}
