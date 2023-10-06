import React, { useCallback } from "react";
import { Input, LoginForm } from "./LoginForm";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUserClient } from "@/state/client";
import { errorHandler } from "@/lib/error";
import { useSession } from "@/hooks/useSession";

export const ConnectedLoginForm = () => {
  const form = useForm<Input>();

  const { userClient } = useUserClient();
  const errorMsgHandler = useCallback((msg: string) => console.error(msg), []);
  const { setSessionToken } = useSession(errorHandler);

  const onSubmit: SubmitHandler<Input> = useCallback(
    async ({ username, password }) => {
      try {
        let { sessionToken } = await userClient.login({
          username,
          password,
        });
        setSessionToken(sessionToken);
      } catch (e: unknown) {
        errorHandler(e, errorMsgHandler);
      }
    },
    [userClient, errorMsgHandler, setSessionToken]
  );
  return <LoginForm form={form} onSubmit={onSubmit} />;
};
