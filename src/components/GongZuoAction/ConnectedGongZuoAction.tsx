import React, { useCallback } from "react";
import { GongZuoAction } from "./GongZuoAction";
import { useGongzuoClient } from "@/state/client";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import {
  ContentKindExt,
  ContentKindIntoNumber,
  NotWorkContentType,
} from "@/lib/contentKind";
import { SubmitHandler, useForm } from "react-hook-form";
import { errorHandler } from "@/lib/error";

export type Inputs =
  | {
      contentKind: ContentKindExt.WORK;
      content: string;
    }
  | {
      contentKind: ContentKindExt.NOT_WORK;
      content: NotWorkContentType;
    };

export const ConnectedGongZuoAction = () => {
  const { gongzuoClient } = useGongzuoClient();
  const { user, sessionToken } = useLoggedInUser();
  const form = useForm<Inputs>({
    defaultValues: {
      contentKind: ContentKindExt.WORK,
      content: "",
    },
  });

  const errMsgHandler = console.error;

  const onStartGongzuo: SubmitHandler<Inputs> = useCallback(
    async ({ content, contentKind }) => {
      try {
        await gongzuoClient.start(sessionToken, {
          contentKind: ContentKindIntoNumber(contentKind),
          content,
        });
      } catch (e: unknown) {
        errorHandler(e, errMsgHandler);
      }
    },
    [errMsgHandler, gongzuoClient, sessionToken]
  );

  const onEndGongzuo: SubmitHandler<Inputs> = useCallback(
    async ({ content, contentKind }) => {
      try {
        console.log("onEndGongzuo(not implemented)");
        // await gongzuoClient.gongzuoEndPost(sessionToken);
      } catch (e: unknown) {
        errorHandler(e, errMsgHandler);
      }
    },
    [errMsgHandler, gongzuoClient, sessionToken]
  );

  if (!user) {
    return <div>ログインしてください</div>;
  }
  return (
    <GongZuoAction
      form={form}
      onStartGongzuo={onStartGongzuo}
      onEndGongzuo={onEndGongzuo}
    />
  );
};
