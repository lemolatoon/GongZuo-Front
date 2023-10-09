import { Gongzuo } from "@/apiClient";
import { useInvalidateAllGongzuos } from "@/hooks/useAllGongzuos";
import { useSessionToken } from "@/hooks/useSession";
import { errorHandler } from "@/lib/error";
import { useGongzuoClient } from "@/state/client";
import { useCallback } from "react";

type Handler = (msg: string) => void;
export const useEditGongzuo = (handler: Handler) => {
  const { gongzuoClient } = useGongzuoClient();
  const { sessionToken } = useSessionToken();
  const { invalidate } = useInvalidateAllGongzuos();
  type GongzuoPayload = Omit<Gongzuo, "id"> & {
    gongzuoId: Gongzuo["id"];
  };
  const editGongzuo = useCallback(
    async (gongzuo: GongzuoPayload) => {
      try {
        await gongzuoClient.edit(sessionToken, gongzuo);
        invalidate();
      } catch (e) {
        errorHandler(e, handler);
      }
    },
    [gongzuoClient, handler, invalidate, sessionToken]
  );

  return {
    editGongzuo,
  };
};
