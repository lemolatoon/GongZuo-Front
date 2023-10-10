import { errorHandler } from "@/lib/error";
import { useUserClient } from "@/state/client";
import { useCallback } from "react";
import { useInvalidateAllUsers } from "./useAllUsers";

type Handler = (message: string) => void;
export const useRegister = (handler: Handler) => {
  const { userClient } = useUserClient();
  const { invalidate } = useInvalidateAllUsers();
  const register = useCallback(
    async (sessionToken: string, username: string, password: string) => {
      try {
        await userClient.register(sessionToken, { username, password });
        invalidate();
      } catch (e) {
        errorHandler(e, handler);
      }
    },
    [handler, invalidate, userClient]
  );

  return {
    register,
  };
};
