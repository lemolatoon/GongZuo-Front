import React, { useCallback } from "react";
import { GyomuGongZuoAction, NotGyomuGongZuoAction } from "./GongZuoAction";
import { useGongzuoClient } from "@/state/client";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import {
  ContentKindExt,
  ContentKindIntoNumber,
  NotWorkContentType,
} from "@/lib/contentKind";
import { SubmitHandler, useForm } from "react-hook-form";
import { errorHandler } from "@/lib/error";
import { selectKind, useGyomu } from "@/state/gyomu";

export type Inputs = {
  content: string;
};

export const ConnectedGongZuoAction = () => {
  const { gongzuoClient } = useGongzuoClient();
  const { user, sessionToken } = useLoggedInUser();
  const contentKind = useGyomu(selectKind);
  const form = useForm<Inputs>({
    defaultValues: {
      content: "",
    },
  });

  const errMsgHandler = console.error;

  const onStartGongzuo: SubmitHandler<Inputs> = useCallback(
    async ({ content }) => {
      try {
        await gongzuoClient.start(sessionToken, {
          contentKind: ContentKindIntoNumber(contentKind),
          content,
        });
      } catch (e: unknown) {
        errorHandler(e, errMsgHandler);
      }
    },
    [errMsgHandler, gongzuoClient, sessionToken, contentKind]
  );

  const onEndGongzuo: SubmitHandler<Inputs> = useCallback(
    async ({ content }) => {
      try {
        console.log("onEndGongzuo(not implemented)");
        // await gongzuoClient.gongzuoEndPost(sessionToken);
      } catch (e: unknown) {
        errorHandler(e, errMsgHandler);
      }
    },
    [errMsgHandler, gongzuoClient, sessionToken, contentKind]
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
