import { useSessionToken } from "@/hooks/useSession";
import { errorHandler } from "@/lib/error";
import { useGongzuoClient } from "@/state/client";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

type Handler = (msg: string) => void;
const gongzuoByIdKey = "/gongzuos/:gongzuoId";
export const useQueryGongzuoById = (handler: Handler, gongzuoId: number) => {
  const { gongzuoClient } = useGongzuoClient();
  const { sessionToken } = useSessionToken();
  const fetcher = useCallback(async () => {
    try {
      const gongzuo = await gongzuoClient.getGongzuoById(
        gongzuoId,
        sessionToken
      );
      return gongzuo;
    } catch (e) {
      errorHandler(e, handler);
      return null;
    }
  }, [handler, gongzuoClient, gongzuoId, sessionToken]);

  const res = useQuery([gongzuoByIdKey, gongzuoId, sessionToken], fetcher);

  return res;
};
