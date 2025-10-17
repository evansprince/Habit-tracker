import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { Models, ID } from "react-native-appwrite";
import { account } from "./appwrite";

type AuthContextType = {
  isLoadingUser: boolean;
  user: Models.User<Models.Preferences> | null;
  signUp: (email: string, password: string) => Promise<string | null>;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);

  const [isLoadingUser, setIsLoadigUser] = useState<boolean>(true);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const session = await account.get();
      setUser(session as Models.User<Models.Preferences>);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoadigUser(false);
    }
  };

  const signUp = async (email: string, password: string): Promise<string | null> => {
    try {
      await account.create(ID.unique(), email, password);
      await signIn(email, password);
      return null;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return error.message;
      }
      return "An error occurred during sign up.";
    }
  };

  const signIn = async (email: string, password: string): Promise<string | null> => {
    try {
      await account.createEmailPasswordSession(email, password);
      const session = await account.get();
      setUser(session);
      return null;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return error.message;
      }
      return "An error occurred during sign in.";
    }
  };

  const signOut = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <AuthContext.Provider value={{ user, isLoadingUser ,signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
