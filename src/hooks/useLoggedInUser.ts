import { useEffect, useState } from "react";
import { useSession } from "./useSession";

type Handler = (errorMessage: string) => void;
const defaultHandler = (msg: string) => console.error(msg);

export const useLoggedInUser = (handler: Handler = defaultHandler) => {
  const { sessionToken, user, setSessionToken } = useSession(handler);

  useEffect(() => {
    if (sessionToken && !user) {
      setSessionToken(sessionToken);
    }
  }, [sessionToken, user, setSessionToken]);

  return {
    user,
  };
};
