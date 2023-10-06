import { useGongzuoClient } from "@/state/client";
import { useSessionToken } from "./useSession";
import { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { errorHandler } from "@/lib/error";

type Handler = (msg: string) => void;

export const allGongzuosKey = "/gongzuo/gongzuos";
export const useQueryAllGonzuos = (handler: Handler) => {
  const { sessionToken } = useSessionToken();
  const { gongzuoClient } = useGongzuoClient();

  const fetcher = useCallback(async () => {
    if (sessionToken) {
      try {
        return await gongzuoClient.getAllGongzuos(sessionToken);
      } catch (e) {
        errorHandler(e, handler);
        return [];
      }
    } else {
      return [];
    }
  }, [sessionToken, gongzuoClient, handler]);

  const result = useQuery([allGongzuosKey, sessionToken], fetcher);
  return result;
};

export const useInvalidateAllGongzuos = () => {
  const queryClient = useQueryClient();
  const { sessionToken } = useSessionToken();

  const invalidate = useCallback(() => {
    console.log("invalidate");
    queryClient.invalidateQueries([allGongzuosKey, sessionToken]);
  }, [queryClient]);

  return {
    invalidate,
  };
};
