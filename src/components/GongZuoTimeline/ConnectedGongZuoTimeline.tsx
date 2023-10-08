import React from "react";
import { GongZuoTimeline } from "./GongZuoTimeline";
import { selectDuration, useQueryAllGonzuos } from "@/hooks/useAllGongzuos";
import { useErrorMessageHandler } from "@/hooks/useErrorHandler";
import { useAsyncNow } from "@/hooks/useAsyncNow";

type Props = {
  name: string;
  userId: number;
  isBottom: boolean;
  className?: string;
};
export const ConnectedGongZuoTimeline: React.FC<Props> = ({
  isBottom,
  name,
  userId,
  className,
}) => {
  const { handleErrorMessage } = useErrorMessageHandler();
  const { data } = useQueryAllGonzuos(
    handleErrorMessage,
    selectDuration(userId)
  );
  const { now, invalidate } = useAsyncNow();
  if (!data) {
    return <div>loading...</div>;
  }
  return (
    <GongZuoTimeline
      className={className}
      isBottom={isBottom}
      name={name}
      gongzuoDurations={data}
      now={now}
    />
  );
};
