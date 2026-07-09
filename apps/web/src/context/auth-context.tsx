"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

type UserRole = "admin" | "user";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<boolean>;
  logout: () => void;
  getUserById: (id: string) => User | undefined;
}

const AuthContext = createContext<AuthContextType | null>(null);

function loadUsers(): User[] {
  try {
    const data = localStorage.getItem("tc_users");
    if (data) return JSON.parse(data);
  } catch {}
  return [
    {
      id: "admin-1",
      name: "Cinar Sehitoglu",
      email: "cinarsehitoglu@gmail.com",
      role: "admin",
      createdAt: new Date("2024-01-01").toISOString(),
    },
  ];
}

function saveUsers(users: User[]) {
  localStorage.setItem("tc_users", JSON.stringify(users));
}

function loadSession(): User | null {
  try {
    const data = localStorage.getItem("tc_session");
    if (data) return JSON.parse(data);
  } catch {}
  return null;
}

function saveSession(user: User | null) {
  if (user) {
    localStorage.setItem("tc_session", JSON.stringify(user));
  } else {
    localStorage.removeItem("tc_session");
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const u = loadUsers();
    setUsers(u);
    const s = loadSession();
    if (s) {
      const match = u.find((x) => x.id === s.id);
      if (match) setUser(match);
    }
    setReady(true);
  }, []);

  const login = useCallback(async (email: string, _password: string) => {
    const existing = users.find((u) => u.email === email);
    if (existing) {
      setUser(existing);
      saveSession(existing);
      return true;
    }
    return false;
  }, [users]);

  const register = useCallback(async (name: string, email: string, _password: string, phone?: string) => {
    if (users.find((u) => u.email === email)) return false;
    const newUser: User = {
      id: "user-" + Date.now(),
      name,
      email,
      role: "user",
      phone,
      createdAt: new Date().toISOString(),
    };
    const updated = [...users, newUser];
    setUsers(updated);
    saveUsers(updated);
    setUser(newUser);
    saveSession(newUser);
    return true;
  }, [users]);

  const logout = useCallback(() => {
    setUser(null);
    saveSession(null);
  }, []);

  const getUserById = useCallback((id: string) => {
    return users.find((u) => u.id === id);
  }, [users]);

  if (!ready) return null;

  return (
    <AuthContext.Provider value={{ user, users, login, register, logout, getUserById }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
