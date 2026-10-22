const USERS_KEY = "northstar-demo-users";
const HASH_ITERATIONS = 210_000;

function getPasswordCrypto() {
  if (!window.crypto?.subtle) {
    throw new Error("Secure password storage is unavailable in this browser.");
  }
  return window.crypto;
}

async function hashPassword(password, salt) {
  const webCrypto = getPasswordCrypto();
  const key = await webCrypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await webCrypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: HASH_ITERATIONS, hash: "SHA-256" },
    key,
    256,
  );
  return Array.from(new Uint8Array(bits), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function readUsers() {
  let serializedUsers;
  try {
    serializedUsers = window.localStorage.getItem(USERS_KEY);
  } catch {
    throw new Error("Browser storage is unavailable. Check your browser settings and try again.");
  }
  if (!serializedUsers) return [];

  try {
    const users = JSON.parse(serializedUsers);
    if (!Array.isArray(users)) {
      throw new Error("Stored accounts are invalid. Clear this demo's browser storage and try again.");
    }
    return users;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(
        "Stored accounts could not be read. Clear this demo's browser storage and try again.",
        { cause: error },
      );
    }
    throw error;
  }
}

function persistUsers(users) {
  try {
    window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    throw new Error("Your account could not be saved. Check browser storage settings and try again.");
  }
}

export async function registerUser({ name, email, password }) {
  const normalizedEmail = email.trim().toLowerCase();
  const users = readUsers();

  if (users.some((user) => user.email === normalizedEmail)) {
    throw new Error("An account with this email already exists. Sign in instead.");
  }

  const webCrypto = getPasswordCrypto();
  const salt = webCrypto.getRandomValues(new Uint8Array(16));
  const passwordHash = await hashPassword(password, salt);
  const user = {
    id: webCrypto.randomUUID(),
    name,
    email: normalizedEmail,
    salt: Array.from(salt),
    passwordHash,
  };
  persistUsers([...users, user]);
  return { id: user.id, name: user.name, email: user.email };
}

export async function loginUser({ email, password }) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = readUsers().find((storedUser) => storedUser.email === normalizedEmail);

  if (!user || !Array.isArray(user.salt) || typeof user.passwordHash !== "string") {
    throw new Error("Email or password is incorrect.");
  }

  const candidateHash = await hashPassword(password, new Uint8Array(user.salt));
  if (candidateHash !== user.passwordHash) {
    throw new Error("Email or password is incorrect.");
  }

  return { id: user.id, name: user.name, email: user.email };
}
