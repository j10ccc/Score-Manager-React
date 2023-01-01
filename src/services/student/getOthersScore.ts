import { request } from "@umijs/max";

export const getOthersScoresAPI = (data: StudentAPI.GetOthersScoresAPIData) => {
  return request<StudentAPI.GetOthersScoresAPIResult>(
    "/api/student/queryOthersScore",
    {
      method: "GET",
      params: data,
    }
  );
};
