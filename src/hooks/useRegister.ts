import { errorHandler } from "@/lib/error";
import { useUserClient } from "@/state/client";
import { useCallback } from "react";

type Handler = (message: string) => void;
export const useRegister = (handler: Handler) => {
  const { userClient } = useUserClient();
  const register = useCallback(
    async (sessionToken: string, username: string, password: string) => {
      try {
        await userClient.register(sessionToken, { username, password });
      } catch (e) {
        errorHandler(e, handler);
      }
    },
    [handler, userClient]
  );

  return {
    register,
  };
};
