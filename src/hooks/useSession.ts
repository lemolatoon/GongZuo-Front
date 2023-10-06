import { errorHandler } from "@/lib/error";
import { useUserClient } from "@/state/client";
import { useUserRaw } from "@/state/user";
import { useCallback, useState } from "react";
import { useCookies } from "react-cookie";

type Handler<T = string> = (errorMessage: T) => void;
const sessionTokenKey = "sessionToken";

export const useSessionToken = () => {
  const [cookies, setCookie, removeCookie] = useCookies([sessionTokenKey]);

  const sessionToken: string = cookies[sessionTokenKey];
  const setSessionToken = useCallback(
    (sessionToken: string) => {
      setCookie(sessionTokenKey, sessionToken);
    },
    [setCookie]
  );
  const removeSessionToken = useCallback(() => {
    removeCookie(sessionTokenKey);
  }, [removeCookie]);

  return {
    sessionToken,
    setSessionToken,
    removeSessionToken,
  };
};

export const useSession = (handler: Handler) => {
  const {
    userInfo: { user },
    setUser,
  } = useUserRaw();

  const { sessionToken, setSessionToken: justSetSessionToken } =
    useSessionToken();

  const { userClient } = useUserClient();

  const setSessionToken = useCallback(
    async (sessionToken: string) => {
      justSetSessionToken(sessionToken);
      try {
        const user = await userClient.me(sessionToken);
        setUser(sessionToken, user);
      } catch (e) {
        errorHandler(e, handler);
      } finally {
      }
    },
    [userClient, handler, justSetSessionToken, setUser]
  );

  return {
    sessionToken,
    user,
    setSessionToken,
  };
};

export const useLogout = () => {
  const { removeSessionToken } = useSessionToken();
  const { clearUser } = useUserRaw();
  const logout = useCallback(() => {
    clearUser();
    removeSessionToken();
  }, [clearUser, removeSessionToken]);

  return {
    logout,
  };
};

export const useLogoutOnAllDevices = (handler: Handler) => {
  const { userClient } = useUserClient();
  const { sessionToken, removeSessionToken } = useSessionToken();

  const logoutOnAllDevices = useCallback(async () => {
    try {
      await userClient.logout({ sessionToken });
      removeSessionToken();
    } catch (e) {
      errorHandler(e, handler);
    }
  }, [handler, removeSessionToken, sessionToken, userClient]);

  return {
    logoutOnAllDevices,
  };
};
