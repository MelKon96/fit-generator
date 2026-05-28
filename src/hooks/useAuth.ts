import { useState } from "react";

export const useAuth = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  return {
    user,
    isLoginOpen,
    onOpenLogin: () => setIsLoginOpen(true),
    onCloseLogin: () => setIsLoginOpen(false),
    onLogin: (email: string) => setUser(email),
    onLogout: () => setUser(null),
  };
};