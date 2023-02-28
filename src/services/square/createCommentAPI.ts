import { request } from "@umijs/max";

export const createCommentAPI = (data: SquareAPI.CreateCommentData) => {
  const token = window.localStorage.getItem("token") || "";
  return request<SquareAPI.CreateCommentResult>("/api/square/topic/comment", {
    method: "POST",
    headers: {
      Authorization: token,
    },
    data,
  });
};
