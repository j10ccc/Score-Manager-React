import { request } from "@@/exports";

export function submitApprovesAPI(data: CoachAPI.SubmitApprovesData) {
  const token = window.localStorage.getItem("token") || "";
  return request<CoachAPI.SubmitApprovesResult>("/api/coach/submitApproves", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    data,
  });
}
