import { errorHandler } from "@/lib/error";
import { useUserClient } from "@/state/client";
import { useUserRaw } from "@/state/user";
import { useCallback } from "react";
import { useCookies } from "react-cookie";

type Handler = (errorMessage: string) => void;
const sessionTokenKey = "sessionToken";
export const useSession = (handler: Handler) => {
  const {
    userInfo: { user },
    setUser,
  } = useUserRaw();

  const [cookies, setCookie] = useCookies([sessionTokenKey]);

  const { userClient } = useUserClient();

  const setSessionToken = useCallback(
    async (sessionToken: string) => {
      setCookie(sessionTokenKey, sessionToken);
      try {
        const user = await userClient.meGet(sessionToken);
        setUser(sessionToken, user);
      } catch (e) {
        errorHandler(e, handler);
      }
    },
    [userClient, handler, setCookie, setUser]
  );

  const sessionToken = cookies[sessionTokenKey];

  return {
    sessionToken,
    user,
    setSessionToken,
  };
};
