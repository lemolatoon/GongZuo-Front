import { useGongzuoClient } from "@/state/client";
import { useCallback } from "react";
import { useSessionToken } from "./useSession";
import { ContentKindExt, ContentKindIntoNumber } from "@/lib/contentKind";
import { errorHandler } from "@/lib/error";
import { useInvalidateAllGongzuos } from "./useAllGongzuos";

type Handler = (msg: string) => void;
type StartPayload = {
  contentKind: ContentKindExt;
  content: string;
};
export const useStartGongzuo = (handler: Handler) => {
  const { gongzuoClient } = useGongzuoClient();
  const { sessionToken } = useSessionToken();
  const { invalidate } = useInvalidateAllGongzuos();
  const startGongzuo = useCallback(
    async ({ contentKind, content }: StartPayload) => {
      try {
        await gongzuoClient.start(sessionToken, {
          contentKind: ContentKindIntoNumber(contentKind),
          content,
        });
        invalidate();
      } catch (e) {
        errorHandler(e, handler);
      }
    },
    [gongzuoClient, sessionToken, handler, invalidate]
  );

  return {
    startGongzuo,
  };
};

type EndPayload = {
  gongzuoId: number;
  content?: string;
};
export const useEndGongzuo = (handler: Handler) => {
  const { gongzuoClient } = useGongzuoClient();
  const { sessionToken } = useSessionToken();
  const { invalidate } = useInvalidateAllGongzuos();
  const endGongzuo = useCallback(
    async ({ gongzuoId, content }: EndPayload) => {
      const payload = content ? { gongzuoId, content } : { gongzuoId };
      try {
        await gongzuoClient.end(sessionToken, payload);
        invalidate();
      } catch (e) {
        errorHandler(e, handler);
      }
    },
    [gongzuoClient, sessionToken, handler, invalidate]
  );

  return {
    endGongzuo,
  };
};
