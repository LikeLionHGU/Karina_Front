// src/utils/logout.ts
export function logout() {
  localStorage.removeItem("jwt");
  localStorage.removeItem("role");
  localStorage.removeItem("userName");
  window.location.href = "/login";
}
