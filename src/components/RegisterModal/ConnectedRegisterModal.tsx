import { useErrorMessageHandler } from "@/hooks/useErrorHandler";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useRegisterModal } from "@/state/modal";
import { useLogin } from "@/hooks/useLogin";
import { useRegister } from "@/hooks/useRegister";
import { RegisterModal } from "./RegisterModal";

export type Inputs = {
  registerToken: string;
  username: string;
  password: string;
};

type Props = {
  className?: string;
};
export const ConnectedRegisterModal: React.FC<Props> = ({ className }) => {
  const form = useForm<Inputs>();

  const { handleErrorMessage } = useErrorMessageHandler();
  const { login } = useLogin(handleErrorMessage);
  const { register } = useRegister(handleErrorMessage);
  const onRegister = useCallback(
    async (data: Inputs) => {
      const { registerToken, username, password } = data;
      const sessionToken = await login("admin", registerToken);
      if (!sessionToken) {
        handleErrorMessage("registerToken is invalid.");
        return;
      }
      await register(sessionToken, username, password);
    },
    [login, register, handleErrorMessage]
  );

  const { isOpen, close } = useRegisterModal((state) => ({
    close: state.close,
    isOpen: state.isOpen,
  }));

  return (
    <RegisterModal
      form={form}
      className={className}
      isOpen={isOpen}
      onRegister={onRegister}
      close={close}
    />
  );
};
