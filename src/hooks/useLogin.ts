import { useUserClient } from "@/state/client";
import { useSession } from "./useSession";
import { useCallback, useState } from "react";
import { errorHandler } from "@/lib/error";

type Handler = (message: string) => void;
export const useLogin = (handler: Handler) => {
  const { userClient } = useUserClient();
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const login = useCallback(
    async (username: string, password: string) => {
      try {
        let { sessionToken } = await userClient.login({
          username,
          password,
        });
        setSessionToken(sessionToken);
        return sessionToken;
      } catch (e: unknown) {
        errorHandler(e, handler);
        return null;
      }
    },
    [setSessionToken, userClient, handler]
  );

  return {
    login,
    sessionToken,
  };
};
