import { UsersApi } from "@/apiClient";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export type Input = Parameters<UsersApi["loginPost"]>[0];
type Props = {
  onSubmit: SubmitHandler<Input>;
  form: ReturnType<typeof useForm<Input>>;
};
export const LoginForm: React.FC<Props> = ({ onSubmit, form }) => {
  const { register, handleSubmit } = form;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        username: <input {...register("username")} />
      </label>
      <label>
        password: <input type="password" {...register("password")} />
      </label>
      <button>ログイン</button>
    </form>
  );
};
