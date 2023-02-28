import { request } from "@umijs/max";

export const getMyApplyHistoryAPI = () => {
  const token = window.localStorage.getItem("token") || "";
  return request<StudentAPI.GetMyApplyHistoryAPIResult>(
    "/api/student/getMyApplyHistory",
    {
      method: "GET",
      withCredentials: true,
      headers: {
        Authorization: token,
      },
    }
  );
};
