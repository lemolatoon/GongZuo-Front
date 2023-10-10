import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Inputs } from "./ConnectedRegisterModal";
import React, { HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Modal } from "react-overlays";

const renderBackdrop = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className="fixed z-2 top-0 bottom-0 left-0 right-0 bg-[#000] opacity-50"
    ></div>
  );
};

type Props = {
  form: ReturnType<typeof useForm<Inputs>>;
  className?: string;
  isOpen: boolean;
  close(): void;
  onRegister(data: Inputs): void;
};
export const RegisterModal: React.FC<Props> = ({
  form,
  className,
  isOpen,
  close,
  onRegister,
}) => {
  return (
    <Modal
      className={`fixed z-2 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 ${
        isOpen ? "" : "hidden"
      } ${className}`}
      show={isOpen}
      onHide={close}
      renderBackdrop={renderBackdrop}
    >
      <RegisterModalInner form={form} onRegister={onRegister} close={close} />
    </Modal>
  );
};

type InnerProps = Pick<Props, "form" | "onRegister" | "close">;
export const RegisterModalInner: React.FC<InnerProps> = ({
  form,
  onRegister,
  close,
}) => {
  return (
    <Form {...form}>
      <form
        className="bg-white w-[500px] p-8 border-solid border-2 rounded-xl shadow-md"
        onSubmit={(e) => {
          form.handleSubmit(onRegister)(e);
          close();
        }}
      >
        <FormField
          control={form.control}
          name="registerToken"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Register Token</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>ユーザー登録のためのトークン</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="mt-8 flex justify-center gap-[50%]">
          <Button type="submit">Sign Up</Button>
        </div>
      </form>
    </Form>
  );
};
