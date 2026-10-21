const API_URL = (import.meta.env.VITE_API_URL || "")
  .trim()
  .replace(/\/+$/, "");

export const registerUser = async (data) => {
  if (
    !API_URL ||
    ["undefined", "null"].includes(API_URL.toLowerCase())
  ) {
    throw new Error(
      "VITE_API_URL is missing or invalid. Check your Vercel environment variables."
    );
  }

  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const text = await response.text();
  const contentType = response.headers.get("content-type") || "";

  let result = {};

  if (text) {
    if (!contentType.includes("application/json")) {
      throw new Error(
        `Server returned a non-JSON response (HTTP ${response.status}): ${text.slice(0, 200)}`
      );
    }

    try {
      result = JSON.parse(text);
    } catch {
      throw new Error(
        `Invalid JSON response (HTTP ${response.status}).`
      );
    }
  }

  if (!response.ok) {
    throw new Error(
      result.detail ||
        result.message ||
        `Registration failed (HTTP ${response.status}).`
    );
  }

  return result;
};
