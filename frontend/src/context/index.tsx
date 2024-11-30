"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext<{
  user:
    | {
        name: string;
        email: string;
        image: string;
      }
    | undefined;
  loading: boolean;
}>({
  user: undefined,
  loading: true,
});

export function LoggedInProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<
    | {
        name: string;
        email: string;
        image: string;
      }
    | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    fetch("/api/auth/profile")
      .then(async (res) => {
        const response = await res.json();

        return response as {
          status: string;
          user: {
            name: string;
            email: string;
            picture: string;
          };
        };
      })
      .then(async (res) => {
        if (res.status === "success") {
          setUser({
            name: res.user.name,
            email: res.user.email,
            image: res.user.picture,
          });
          setLoading(false);
        } else {
          setUser(undefined);
          if (location.pathname !== "/") {
            router.push("/");
          }
        }
      });
  }, []);
  return (
    <UserContext.Provider
      value={{
        user,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
