import { request } from "@umijs/max";

export async function changePasswordAPI(data: PublicAPI.ChangePasswordData) {
  const token = window.localStorage.getItem("token") || "";
  return request<PublicAPI.ChangePasswordResult>("/api/changePassword", {
    headers: {
      Authorization: token,
    },
    method: "POST",
    data,
  });
}
