import { request } from "@@/exports";

export function submitApprovesAPI(data: CoachAPI.SubmitApprovesData) {
  return request<CoachAPI.SubmitApprovesResult>("/api/coach/submitApproves", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}
