import { request } from "@umijs/max";

export const getTopicDetailAPI = (path: SquareAPI.GetTopicDetailData) => {
  return request<SquareAPI.GetTopicDetailResult>(
    `/api/square/topic/${path.id}`,
    {
      method: "GET",
    }
  );
};
