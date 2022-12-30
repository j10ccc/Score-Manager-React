import { request } from "@umijs/max";

export const getMyCoachesAPI = () => {
  return request<StudentAPI.GetMyCoachesAPIResult>(
    "/api/student/getMyCoaches",
    {
      method: "GET",
      withCredentials: true,
    }
  );
};
