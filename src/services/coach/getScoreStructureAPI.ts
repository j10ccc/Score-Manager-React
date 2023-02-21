import { request } from "@@/exports";

export function getScoreStructureAPI() {
  return request<CoachAPI.GetScoreStructureResult>(
    "/api/coach/scores/structure",
    {
      method: "GET",
    }
  );
}
