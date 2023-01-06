import { request } from "@umijs/max";

export const getMyApplyHistoryAPI = () => {
  return request<StudentAPI.GetMyApplyHistoryAPIResult>(
    "/api/student/getMyApplyHistory",
    {
      method: "GET",
      withCredentials: true,
    }
  );
};
