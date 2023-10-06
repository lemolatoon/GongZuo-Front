import { useEffect, useState } from "react";
import { useSession } from "./useSession";

type Handler = (errorMessage: string) => void;

export const useLoggedInUser = (handler: Handler) => {
  const { sessionToken, user, setSessionToken } = useSession(handler);

  useEffect(() => {
    if (sessionToken && !user) {
      setSessionToken(sessionToken);
    }
  }, [sessionToken, user, setSessionToken]);

  return {
    user,
    sessionToken,
  };
};
