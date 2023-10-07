import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Inputs } from "./ConnectedGongZuoAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Label } from "../ui/label";

type Props = {
  isOnGoing: boolean;
  form: ReturnType<typeof useForm<Inputs>>;
  onStartGongzuo: SubmitHandler<Inputs>;
  onEndGongzuo: SubmitHandler<Inputs>;
};
export const GyomuGongZuoAction: React.FC<Props> = ({
  isOnGoing,
  form,
  onStartGongzuo,
  onEndGongzuo,
}) => {
  const { register, handleSubmit } = form;
  return (
    <form className="w-full">
      <div className="w-full">
        <Label className="w-full">
          作業内容 <Input className="mt-1 w-full" {...register("content")} />
        </Label>
      </div>
      <div className="mt-8 flex justify-center">
        {isOnGoing ? (
          <Button
            type="submit"
            variant="secondary"
            onClick={form.handleSubmit(onEndGongzuo)}
          >
            作業終了
          </Button>
        ) : (
          <Button type="submit" onClick={form.handleSubmit(onStartGongzuo)}>
            作業開始
          </Button>
        )}
      </div>
    </form>
  );
};

const values = ["本業", "アルバイト", "公的助成事業"] as const;
export const NotGyomuGongZuoAction: React.FC<Props> = ({
  isOnGoing,
  form,
  onStartGongzuo,
  onEndGongzuo,
}) => {
  return (
    <>
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
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
              </FormItem>
            )}
          />
          <div className="mt-8 flex justify-center">
            {isOnGoing ? (
              <Button
                type="submit"
                variant="secondary"
                onClick={form.handleSubmit(onEndGongzuo)}
              >
                作業終了
              </Button>
            ) : (
              <Button type="submit" onClick={form.handleSubmit(onStartGongzuo)}>
                作業開始
              </Button>
            )}
          </div>
        </form>
      </Form>
    </>
  );
};
