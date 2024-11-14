import React, { createContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/interfaces/User";

interface UserContextType {
  user: User | null;
  isSignedIn: boolean;
  signIn: (userData: User) => void;
  signOut: () => void;
}

// Create the context with default values
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const isSignedIn = !!user;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser) as User);
    }
  }, []);

  const signIn = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const signOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <UserContext.Provider value={{ user, isSignedIn, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};
