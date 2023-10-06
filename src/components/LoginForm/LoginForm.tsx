import { UsersApi } from "@/apiClient";
import { Button } from "@/components/ui/button";
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
      <div>
        <label>
          username: <input {...register("username")} />
        </label>
      </div>
      <div>
        <label>
          password: <input type="password" {...register("password")} />
        </label>
      </div>
      <Button variant="secondary">ログイン</Button>
    </form>
  );
};
