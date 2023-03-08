import { request } from "@@/exports";

export function SubmitRejectReasonsAPI(data: CoachAPI.SubmitRejectReasonsData) {
  return request<CoachAPI.GetRejectReasonsResult>(
    "/api/coach/submitRejectReasons",
    {
      method: "POST",
      data,
    }
  );
}
