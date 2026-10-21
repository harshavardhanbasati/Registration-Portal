
const API_URL = import.meta.env.VIT_API_URL;

export const registerUser = async (data) => {
  if (!API_URL) {
    throw new Error("VITE_API_URL is not configured.");
  }

  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const text = await response.text();

  let result;
  try {
    result = JSON.parse(text);
  } catch {
    throw new Error(
      `Invalid server response (HTTP ${response.status}): ${text.slice(0, 200)}`
    );
  }

  if (!response.ok) {
    throw new Error(
      result.detail || result.message || "Registration failed"
    );
  }

  return result;
};
