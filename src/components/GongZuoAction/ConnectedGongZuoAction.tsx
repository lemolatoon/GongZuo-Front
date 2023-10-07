import React, { useCallback } from "react";
import { GyomuGongZuoAction, NotGyomuGongZuoAction } from "./GongZuoAction";
import { useGongzuoClient } from "@/state/client";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { ContentKindExt } from "@/lib/contentKind";
import { SubmitHandler, useForm } from "react-hook-form";
import { selectKind, useGyomu } from "@/state/gyomu";
import { useEndGongzuo, useStartGongzuo } from "@/hooks/useStartEndGongzuo";
import { useErrorMessageHandler } from "@/hooks/useErrorHandler";
import { selectOngoing, useQueryAllGonzuos } from "@/hooks/useAllGongzuos";

export type Inputs = {
  content: string;
};

export const ConnectedGongZuoAction = () => {
  const { handleErrorMessage } = useErrorMessageHandler();
  const { user } = useLoggedInUser(handleErrorMessage);
  const contentKind = useGyomu(selectKind);
  const form = useForm<Inputs>({
    defaultValues: {
      content: "",
    },
  });

  const { data } = useQueryAllGonzuos(
    handleErrorMessage,
    selectOngoing(user?.id)
  );
  const isOnGoing = data !== undefined;
  const gongzuoId = data?.id;

  const { startGongzuo } = useStartGongzuo(handleErrorMessage);
  const { endGongzuo } = useEndGongzuo(handleErrorMessage);

  const onStartGongzuo: SubmitHandler<Inputs> = useCallback(
    async ({ content }) => {
      if (!content) {
        handleErrorMessage("startGongzuo: 作業内容 is empty");
        return;
      }
      startGongzuo({ contentKind, content });
    },
    [contentKind, startGongzuo, handleErrorMessage]
  );

  const onEndGongzuo: SubmitHandler<Inputs> = useCallback(
    async ({ content }) => {
      if (!gongzuoId) {
        handleErrorMessage("endGongzuo: gongzuoId is fetching...");
        return;
      }
      let maybeContent = content == "" ? undefined : content;
      if (contentKind == ContentKindExt.NOT_WORK) {
        maybeContent = undefined;
      }
      endGongzuo({ gongzuoId, content: maybeContent });
    },
    [handleErrorMessage, endGongzuo, contentKind, gongzuoId]
  );

  if (!user) {
    return <div>ログインしてください</div>;
  }
  switch (contentKind) {
    case ContentKindExt.WORK:
      return (
        <GyomuGongZuoAction
          isOnGoing={isOnGoing}
          form={form}
          onStartGongzuo={onStartGongzuo}
          onEndGongzuo={onEndGongzuo}
        />
      );
    case ContentKindExt.NOT_WORK:
    default:
      return (
        <NotGyomuGongZuoAction
          isOnGoing={isOnGoing}
          form={form}
          onStartGongzuo={onStartGongzuo}
          onEndGongzuo={onEndGongzuo}
        />
      );
  }
};
