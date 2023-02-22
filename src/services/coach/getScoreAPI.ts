import { request } from "@@/exports";

export function getScoreAPI(params: CoachAPI.GetScoreData) {
  return request<CoachAPI.GetScoreResult>("/api/coach/scores/query", {
    method: "GET",
    params,
  });
}
