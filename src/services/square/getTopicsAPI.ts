import { request } from "@umijs/max";

export const getTopicsAPI = (params: SquareAPI.GetTopicsData) => {
  const token = window.localStorage.getItem("token") || "";
  return request<SquareAPI.GetTopicsResult>("/api/square/getTopics", {
    method: "GET",
    headers: {
      Authorization: token,
    },
    params,
  });
};
