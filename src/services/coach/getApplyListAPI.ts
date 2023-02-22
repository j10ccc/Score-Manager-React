import { request } from "@@/exports";

export function getApplyListAPI(params: CoachAPI.GetApplyListData) {
  return request<CoachAPI.GetApplyListResult>("/api/coach/getApplyList", {
    method: "GET",
    params,
  });
}
