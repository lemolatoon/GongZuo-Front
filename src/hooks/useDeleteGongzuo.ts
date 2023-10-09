import { useInvalidateAllGongzuos } from "@/hooks/useAllGongzuos";
import { useSessionToken } from "@/hooks/useSession";
import { errorHandler } from "@/lib/error";
import { useGongzuoClient } from "@/state/client";
import { useCallback } from "react";

type Handler = (msg: string) => void;
export const useDeleteGongzuo = (handler: Handler) => {
  const { gongzuoClient } = useGongzuoClient();
  const { sessionToken } = useSessionToken();
  const { invalidate } = useInvalidateAllGongzuos();
  type GongzuoPayload = {
    gongzuoId: number;
  };
  const deleteGongzuo = useCallback(
    async (gongzuo: GongzuoPayload) => {
      try {
        await gongzuoClient._delete(sessionToken, gongzuo);
        invalidate();
      } catch (e) {
        errorHandler(e, handler);
      }
    },
    [gongzuoClient, handler, invalidate, sessionToken]
  );

  return {
    deleteGongzuo,
  };
};
