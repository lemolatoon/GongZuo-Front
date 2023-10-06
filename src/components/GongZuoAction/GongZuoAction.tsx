import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Inputs } from "./ConnectedGongZuoAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";

type Props = {
  form: ReturnType<typeof useForm<Inputs>>;
  onStartGongzuo: SubmitHandler<Inputs>;
  onEndGongzuo: SubmitHandler<Inputs>;
};
export const GyomuGongZuoAction: React.FC<Props> = ({
  form,
  onStartGongzuo,
  onEndGongzuo,
}) => {
  const { register, handleSubmit } = form;
  return (
    <form>
      <div>
        <label>
          content: <Input {...register("content")} />
        </label>
      </div>
      <div>
        <Button onClick={handleSubmit(onStartGongzuo)}>start</Button>
        <Button variant="secondary" onClick={handleSubmit(onEndGongzuo)}>
          end
        </Button>
      </div>
    </form>
  );
};

const values = ["本業", "アルバイト", "公的助成事業"] as const;
export const NotGyomuGongZuoAction: React.FC<Props> = ({
  form,
  onStartGongzuo,
  onEndGongzuo,
}) => {
  return (
    <>
      <Form {...form}>
        <form className="w-2/3 space-y-6">
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
          <div>
            <Button type="submit" onClick={form.handleSubmit(onStartGongzuo)}>
              start
            </Button>
            <Button
              type="submit"
              variant="secondary"
              onClick={form.handleSubmit(onEndGongzuo)}
            >
              end
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
