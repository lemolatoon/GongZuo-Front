import { UsersApi } from "@/apiClient";
import { Button } from "@/components/ui/Button";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { formStyle, inputStyle, loginMessage, wrapper } from "./loginForm.css";
import { Margin } from "@/styles/mixin";
import { Label } from "@/components/ui/Label";

export type Input = Parameters<UsersApi["loginPost"]>[0];
type Props = {
  onSubmit: SubmitHandler<Input>;
  form: ReturnType<typeof useForm<Input>>;
};
export const LoginForm: React.FC<Props> = ({ onSubmit, form }) => {
  const { register, handleSubmit } = form;
  return (
    <div className={wrapper}>
      <div className={loginMessage}>ログインしてください</div>
      <form onSubmit={handleSubmit(onSubmit)} className={formStyle}>
        <div>
          <Label marginRight={Margin.SPACE_08}>username</Label>
          <input {...register("username")} className={inputStyle} />
        </div>
        <div>
          <Label marginRight={Margin.SPACE_08}>password</Label>
          <input
            type="password"
            {...register("password")}
            className={inputStyle}
          />
        </div>
        <Button variant="secondary" marginTop={Margin.SPACE_08}>
          ログイン
        </Button>
      </form>
    </div>
  );
};
