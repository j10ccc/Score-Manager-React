import { request } from "@umijs/max";

export const createTopicAPI = (data: SquareAPI.CreateTopicData) => {
  return request<SquareAPI.CreateTopicResult>("/api/square/topic", {
    method: "POST",
    data,
  });
};
