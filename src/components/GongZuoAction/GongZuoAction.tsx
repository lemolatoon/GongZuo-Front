import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Inputs } from "./ConnectedGongZuoAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  form: ReturnType<typeof useForm<Inputs>>;
  onStartGongzuo: SubmitHandler<Inputs>;
  onEndGongzuo: SubmitHandler<Inputs>;
};
export const GongZuoAction: React.FC<Props> = ({
  form,
  onStartGongzuo,
  onEndGongzuo,
}) => {
  const { register, handleSubmit } = form;
  return (
    <div>
      <div>
        <label>
          contentKind: <Input {...register("contentKind")} />
        </label>
      </div>
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
    </div>
  );
};
