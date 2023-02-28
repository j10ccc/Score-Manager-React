import { request } from "@@/exports";

export function getApplyListAPI(params: CoachAPI.GetApplyListData) {
  const token = window.localStorage.getItem("token") || "";
  return request<CoachAPI.GetApplyListResult>("/api/coach/getApplyList", {
    method: "GET",
    params,
    headers: {
      Authorization: token,
    },
  });
}
