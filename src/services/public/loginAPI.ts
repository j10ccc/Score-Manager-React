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

export async function loginWithCookieAPI() {
  return request<PublicAPI.LoginAPIWithCookieResult>("/api/login", {
    method: "GET",
    withCredentials: true,
  });
}
