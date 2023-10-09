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
import React from "react";
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

type Props = {
  form: ReturnType<typeof useForm<Inputs>>;
  onSubmit(data: Inputs): void;
  className?: string;
};
const values = ["本業", "アルバイト", "公的助成事業"] as const;
export const GongZuoEditModal: React.FC<Props> = ({
  form,
  onSubmit,
  className,
}) => {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <Form {...form}>
        <form
          className="w-4/5 p-8 border-solid border-2 rounded-xl shadow-md"
          onSubmit={form.handleSubmit(onSubmit)}
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
                  <RadioGroup {...field} className="flex gap-10">
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>作業内容</FormLabel>
                {field.value == ContentKindExt.NOT_WORK ? (
                  <>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>作業内容</FormDescription>
                    <FormMessage />
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </FormItem>
            )}
          />
          <div className="mt-8 flex justify-center gap-[50%]">
            <Button className="bg-blue-500">修正</Button>
            <Button className="bg-red-500">削除</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
