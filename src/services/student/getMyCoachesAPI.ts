import { request } from "@umijs/max";

export const getMyCoachesAPI = () => {
  const token = window.localStorage.getItem("token") || "";
  return request<StudentAPI.GetMyCoachesAPIResult>(
    "/api/student/getMyCoaches",
    {
      method: "GET",
      withCredentials: true,
      headers: {
        Authorization: token,
      },
    }
  );
};
