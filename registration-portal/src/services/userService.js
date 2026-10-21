const API_URL = "https://jsonplaceholder.typicode.com/users";

export const registerUser = async (userData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error(`Registration failed with status ${response.status}`);
  }

  return response.json();
};
