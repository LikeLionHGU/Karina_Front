// src/utils/token.ts

export function hasToken(): boolean {
  return !!localStorage.getItem("jwt");
}

export function isTokenExpired(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    (error as any).response.status === 401 &&
    (error as any).response.data?.code === "TOKEN_EXPIRED"
  );
}
