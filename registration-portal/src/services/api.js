const API_URL = "http://127.0.0.1:8000";

export const registerUser = async (data) => {
  console.log("Sending:", data);

  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  console.log("Status:", response.status);

  const result = await response.json();

  console.log("Response:", result);

  if (!response.ok) {
    throw new Error(result.detail || "Registration failed");
  }

  return result;
};