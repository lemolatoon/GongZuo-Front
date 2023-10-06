import { UsersApi } from "@/apiClient";
import { Button } from "@/components/ui/button";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

export type Input = Parameters<UsersApi["loginPost"]>[0];
type Props = {
  onSubmit: SubmitHandler<Input>;
  form: ReturnType<typeof useForm<Input>>;
};
export const LoginForm: React.FC<Props> = ({ onSubmit, form }) => {
  const { register, handleSubmit } = form;
  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-32 w-1/3 p-20 rounded-xl border"
      >
        <label className="text-3xl font-bold tracking-widest">
          Sign in してください :man_bowing:
        </label>
        <div className="mt-4 text-lg">
          <label>username</label>
          <Input
            className="mt-2 text-lg bg-gray-100"
            {...register("username")}
          />
        </div>
        <div className="mt-4 text-lg">
          <label>password</label>
          <Input
            className="mt-2 text-lg bg-gray-100"
            type="password"
            {...register("password")}
          />
        </div>
        <Button className="mt-4" type="submit" variant="secondary">
          Sign in
        </Button>
      </form>
    </div>
  );
};
