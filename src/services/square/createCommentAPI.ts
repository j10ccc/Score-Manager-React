import { request } from "@umijs/max";

export const createCommentAPI = (data: SquareAPI.CreateCommentData) => {
  return request<SquareAPI.CreateCommentResult>("/api/square/topic/comment", {
    method: "POST",
    data,
  });
};
