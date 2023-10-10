import React, { useCallback } from "react";
import { Input, LoginForm } from "./LoginForm";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUserClient } from "@/state/client";
import { errorHandler } from "@/lib/error";
import { useSession } from "@/hooks/useSession";
import { useErrorMessageHandler } from "@/hooks/useErrorHandler";
import { useRegisterModal } from "@/state/modal";

export const ConnectedLoginForm = () => {
  const form = useForm<Input>();

  const { userClient } = useUserClient();
  const { handleErrorMessage } = useErrorMessageHandler();
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
        errorHandler(e, handleErrorMessage);
      }
    },
    [userClient, handleErrorMessage, setSessionToken]
  );
  const { open: openRegisterModal } = useRegisterModal((state) => ({
    open: state.open,
  }));
  return (
    <LoginForm
      form={form}
      onSubmit={onSubmit}
      openRegisterModal={openRegisterModal}
    />
  );
};
