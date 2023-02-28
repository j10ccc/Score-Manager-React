import { request } from "@@/exports";

export function getScoreStructureAPI() {
  const token = window.localStorage.getItem("token") || "";
  return request<CoachAPI.GetScoreStructureResult>(
    "/api/coach/scores/structure",
    {
      method: "GET",
      headers: {
        Authorization: token,
      },
    }
  );
}
