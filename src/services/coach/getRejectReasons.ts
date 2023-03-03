import { request } from "@@/exports";

export function getRejectReasonsAPI() {
  return request<CoachAPI.GetRejectReasonsResult>(
    "/api/coach/getRejectReasons",
    {
      method: "GET",
    }
  );
}
