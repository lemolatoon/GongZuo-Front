import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Inputs } from "./ConnectedGongZuoAction";
import { Button } from "../ui/Button";

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
          contentKind: <input {...register("contentKind")} />
        </label>
      </div>
      <div>
        <label>
          content: <input {...register("content")} />
        </label>
      </div>
      <div>
        <Button variant="primary" onClick={handleSubmit(onStartGongzuo)}>
          start
        </Button>
        <Button variant="secondary" onClick={handleSubmit(onEndGongzuo)}>
          end
        </Button>
      </div>
    </div>
  );
};
