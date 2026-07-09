"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<boolean>;
  logout: () => void;
  getUserById: (id: string) => Promise<User | undefined>;
  refreshUsers: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

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

  const refreshUsers = useCallback(async () => {
    try {
      const res = await fetch("/api/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch {}
  }, []);

  useEffect(() => {
    const s = loadSession();
    if (s) setUser(s);
    refreshUsers().finally(() => setReady(true));
  }, [refreshUsers]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) return false;
      const u = await res.json();
      setUser(u);
      saveSession(u);
      refreshUsers();
      return true;
    } catch {
      return false;
    }
  }, [refreshUsers]);

  const register = useCallback(async (name: string, email: string, password: string, phone?: string) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone }),
      });
      if (!res.ok) return false;
      const u = await res.json();
      setUser(u);
      saveSession(u);
      refreshUsers();
      return true;
    } catch {
      return false;
    }
  }, [refreshUsers]);

  const logout = useCallback(() => {
    setUser(null);
    saveSession(null);
  }, []);

  const getUserById = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/users/${id}`);
      if (res.ok) return await res.json();
    } catch {}
  }, []);

  if (!ready) return null;

  return (
    <AuthContext.Provider value={{ user, users, login, register, logout, getUserById, refreshUsers }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
