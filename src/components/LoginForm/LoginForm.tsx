import { UsersApi } from "@/apiClient";
import { Button } from "@/components/ui/button";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

export type Input = Parameters<UsersApi["login"]>[0];
type Props = {
  onSubmit: SubmitHandler<Input>;
  openRegisterModal(): void;
  form: ReturnType<typeof useForm<Input>>;
};
export const LoginForm: React.FC<Props> = ({
  onSubmit,
  openRegisterModal,
  form,
}) => {
  const { register, handleSubmit } = form;
  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-32 w-2/5 p-10 rounded-xl border"
      >
        <label className="text-xl font-bold tracking-widest">
          Sign in してください :man_bowing:
        </label>
        <div className="mt-4">
          <label>username</label>
          <Input className="mt-2 bg-gray-100" {...register("username")} />
        </div>
        <div className="mt-4">
          <label>password</label>
          <Input
            className="mt-2 bg-gray-100"
            type="password"
            {...register("password")}
          />
        </div>
        <div className="mt-2 flex justify-end text-blue-400 hover:text-blue-300 cursor-pointer">
          <a onClick={openRegisterModal}>ユーザー登録</a>
        </div>
        <Button className="mt-4" type="submit" variant="secondary">
          Sign in
        </Button>
      </form>
    </div>
  );
};
