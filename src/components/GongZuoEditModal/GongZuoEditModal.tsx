import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Inputs } from "./ConnectedGongZuoEditModal";
import React, { HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ContentKindExt } from "@/lib/contentKind";
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
  onSubmit(data: Inputs): void;
  className?: string;
  isOpen: boolean;
  contentKind: ContentKindExt;
  setContentKind(v: ContentKindExt): void;
  close(): void;
};
const values = ["本業", "アルバイト", "公的助成事業"] as const;
export const GongZuoEditModal: React.FC<Props> = ({
  form,
  onSubmit,
  className,
  isOpen,
  close,
  contentKind,
  setContentKind,
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
      <Form {...form}>
        <form
          className="bg-white w-[500px] p-8 border-solid border-2 rounded-xl shadow-md"
          onSubmit={(e) => {
            form.handleSubmit(onSubmit)(e);
            close();
          }}
        >
          <FormField
            control={form.control}
            name="startedAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>開始時刻</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormDescription>作業の開始時刻</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endedAt"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>終了時刻</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormDescription>作業の終了時刻</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contentKind"
            render={({ field }) => (
              <FormItem className="mt-4 flex justify-center">
                <FormControl>
                  <RadioGroup
                    onValueChange={(v) => {
                      field.onChange(v);
                      setContentKind(v as ContentKindExt);
                    }}
                    defaultValue={field.value}
                    className="flex gap-10"
                  >
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value={ContentKindExt.WORK} />
                      </FormControl>
                      <FormLabel>業務内</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value={ContentKindExt.NOT_WORK} />
                      </FormControl>
                      <FormLabel>業務外</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) =>
              contentKind == ContentKindExt.WORK ? (
                <FormItem>
                  <FormLabel>作業内容</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>作業内容</FormDescription>
                  <FormMessage />
                </FormItem>
              ) : (
                <FormItem>
                  <FormLabel>作業内容</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="作業内容" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {values.map((value) => (
                        <SelectItem key={value} value={value}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>作業内容</FormDescription>
                  <FormMessage />
                </FormItem>
              )
            }
          />
          <div className="mt-8 flex justify-center gap-[50%]">
            <Button className="bg-blue-500">修正</Button>
            <Button className="bg-red-500">削除</Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
