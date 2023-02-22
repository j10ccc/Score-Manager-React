import { request } from "@@/exports";

export function submitScoresAPI(data: CoachAPI.SubmitScoresData) {
  return request<CoachAPI.SubmitScoresResult>("/api/coach/submitScores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}
