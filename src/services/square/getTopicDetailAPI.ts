import { request } from "@umijs/max";

export const getTopicDetailAPI = (path: SquareAPI.GetTopicDetailData) => {
  const token = window.localStorage.getItem("token") || "";
  return request<SquareAPI.GetTopicDetailResult>(
    `/api/square/topic/${path.id}`,
    {
      method: "GET",
      headers: {
        Authorization: token,
      },
    }
  );
};
