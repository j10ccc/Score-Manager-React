import { request } from "@umijs/max";

export const createTopicAPI = (data: SquareAPI.CreateTopicData) => {
  const token = window.localStorage.getItem("token") || "";
  return request<SquareAPI.CreateTopicResult>("/api/square/topic", {
    method: "POST",
    headers: {
      Authorization: token,
    },
    data,
  });
};
