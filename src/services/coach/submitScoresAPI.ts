import { request } from "@@/exports";

export function submitScoresAPI(data: CoachAPI.SubmitScoresData) {
  const token = window.localStorage.getItem("token") || "";
  return request<CoachAPI.SubmitScoresResult>("/api/coach/submitScores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    data,
  });
}
