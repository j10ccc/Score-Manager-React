import { request } from "@umijs/max";

export async function loginAPI(data: PublicAPI.LoginAPIData) {
  return request<PublicAPI.LoginAPIResult>("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}

export async function loginWithTokenAPI() {
  const token = window.localStorage.getItem("token") || "";
  return request<PublicAPI.LoginAPIWithTokenResult>("/api/login", {
    headers: {
      Authorization: token,
    },
    method: "GET",
  });
}
