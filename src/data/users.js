// Default demo users — seeded into localStorage on first load
export const DEMO_USERS = [
  {
    username: "samuel",
    password: "papi01@",
    displayName: "SAMUEL ENIOLA OLALEKAN",
  },
  {
    username: "ayanfe",
    password: "scope021",
    displayName: "AYANFE SCOPE IFEDAYO",
  },
];

// Keys used in localStorage
export const STORAGE_KEYS = {
  USERS: "ct_users",
  CURRENT_USER: "ct_current_user",
  THEME: "theme",
};

/**
 * Seed demo users into localStorage if not already present.
 * Call once at app startup.
 */
export function seedUsers() {
  const existing = localStorage.getItem(STORAGE_KEYS.USERS);
  if (!existing) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEMO_USERS));
  }
}

export function getUsers() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]");
}

export function getCurrentUser() {
  const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return raw ? JSON.parse(raw) : null;
}

export function loginUser(username, password) {
  const users = getUsers();
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    const session = { username: user.username, displayName: user.displayName };
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(session));
    return { success: true, user: session };
  }
  return { success: false, error: "Invalid username or password." };
}

export function registerUser(username, password, displayName) {
  const users = getUsers();
  if (users.find((u) => u.username === username)) {
    return { success: false, error: "Username already taken." };
  }
  const newUser = { username, password, displayName: displayName || username };
  const updated = [...users, newUser];
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updated));
  const session = {
    username: newUser.username,
    displayName: newUser.displayName,
  };
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(session));
  return { success: true, user: session };
}

export function logoutUser() {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}
