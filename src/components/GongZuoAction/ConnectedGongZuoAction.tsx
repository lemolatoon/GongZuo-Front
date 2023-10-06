import React, { useCallback } from "react";
import { GyomuGongZuoAction, NotGyomuGongZuoAction } from "./GongZuoAction";
import { useGongzuoClient } from "@/state/client";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { ContentKindExt } from "@/lib/contentKind";
import { SubmitHandler, useForm } from "react-hook-form";
import { errorHandler } from "@/lib/error";
import { selectKind, useGyomu } from "@/state/gyomu";
import { useEndGongzuo, useStartGongzuo } from "@/hooks/useStartEndGongzuo";
import { useErrorMessageHandler } from "@/hooks/useErrorHandler";

export type Inputs = {
  content: string;
};

export const ConnectedGongZuoAction = () => {
  const { handleErrorMessage } = useErrorMessageHandler();
  const { gongzuoClient } = useGongzuoClient();
  const { user, sessionToken } = useLoggedInUser(handleErrorMessage);
  const contentKind = useGyomu(selectKind);
  const form = useForm<Inputs>({
    defaultValues: {
      content: "",
    },
  });

  const { startGongzuo } = useStartGongzuo(handleErrorMessage);
  const { endGongzuo } = useEndGongzuo(handleErrorMessage);

  const onStartGongzuo: SubmitHandler<Inputs> = useCallback(
    async ({ content }) => {
      startGongzuo({ contentKind, content });
    },
    [contentKind, startGongzuo]
  );

  const onEndGongzuo: SubmitHandler<Inputs> = useCallback(
    async ({ content }) => {
      try {
        const maybeContent = content == "" ? undefined : content;
        handleErrorMessage("endGongzuo: not implemented yet");
        // endGongzuo({ gongzuoId, content });
      } catch (e: unknown) {
        errorHandler(e, handleErrorMessage);
      }
    },
    [handleErrorMessage, gongzuoClient, sessionToken, contentKind]
  );

  if (!user) {
    return <div>ログインしてください</div>;
  }
  switch (contentKind) {
    case ContentKindExt.WORK:
      return (
        <GyomuGongZuoAction
          form={form}
          onStartGongzuo={onStartGongzuo}
          onEndGongzuo={onEndGongzuo}
        />
      );
    case ContentKindExt.NOT_WORK:
    default:
      return (
        <NotGyomuGongZuoAction
          form={form}
          onStartGongzuo={onStartGongzuo}
          onEndGongzuo={onEndGongzuo}
        />
      );
  }
};
