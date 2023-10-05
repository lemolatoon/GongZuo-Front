import React, { useCallback } from "react";
import { Input, LoginForm } from "./LoginForm";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUserClient } from "@/state/client";
import { useUser } from "@/state/user";
import { errorHandler } from "@/lib/error";

export const ConnectedLoginForm = () => {
  const form = useForm<Input>();

  const { userClient } = useUserClient();
  const { setUser } = useUser();

  const onSubmit: SubmitHandler<Input> = useCallback(
    async ({ username, password }) => {
      try {
        let { sessionToken } = await userClient.loginPost({
          username,
          password,
        });
        let user = await userClient.meGet(sessionToken);
        setUser(sessionToken, user);
      } catch (e: unknown) {
        errorHandler(e, (msg) => console.error(msg));
      }
    },
    [userClient, setUser]
  );
  return <LoginForm form={form} onSubmit={onSubmit} />;
};
