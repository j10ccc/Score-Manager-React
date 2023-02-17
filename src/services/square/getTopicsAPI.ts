import { request } from "@umijs/max";

export const getTopicsAPI = (params: SquareAPI.GetTopicsData) => {
  return request<SquareAPI.GetTopicsResult>("/api/square/getTopics", {
    method: "GET",
    params,
  });
};
