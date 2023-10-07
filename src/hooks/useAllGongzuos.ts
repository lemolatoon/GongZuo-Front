import { useGongzuoClient } from "@/state/client";
import { useSessionToken } from "./useSession";
import { useCallback, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { errorHandler } from "@/lib/error";
import { Gongzuo } from "@/apiClient";
import { Status } from "@/components/StatusDisplay/StatusDisplay";
import { ContentKindExt, ContentKindFromNumber } from "@/lib/contentKind";

type Handler = (msg: string) => void;
type Selector<T> = (gongzuos: Gongzuo[]) => T;

export const allGongzuosKey = "/gongzuo/gongzuos";
export const useQueryAllGonzuos = <T>(
  handler: Handler,
  selector: Selector<T>
) => {
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

  const { data, ...rest } = useQuery([allGongzuosKey, sessionToken], fetcher);

  const selected = useMemo(
    () => (data === undefined ? undefined : selector(data)),
    [data, selector]
  );
  return {
    ...rest,
    data: selected,
  };
};

export const useInvalidateAllGongzuos = () => {
  const queryClient = useQueryClient();
  const { sessionToken } = useSessionToken();

  const invalidate = useCallback(() => {
    console.log("invalidate");
    queryClient.invalidateQueries([allGongzuosKey, sessionToken]);
  }, [queryClient, sessionToken]);

  return {
    invalidate,
  };
};

const selectAll = (gongzuos: Gongzuo[]) => gongzuos;
const selectOngoing = (userId: number | undefined) => {
  const now = new Date();
  return (gongzuos: Gongzuo[]) => {
    if (userId === undefined) {
      return undefined;
    }
    const filtered = gongzuos.filter(
      (gongzuo) =>
        gongzuo.userId === userId &&
        gongzuo.startedAt <= now &&
        (gongzuo.endedAt === undefined || gongzuo.endedAt >= now)
    );

    return filtered.length === 0 ? undefined : filtered[0];
  };
};

const selectStatus = (userId: number) => (gongzuos: Gongzuo[]) => {
  const onGoing = selectOngoing(userId)(gongzuos);
  if (onGoing === undefined) {
    return Status.DOING_NOTHING;
  }

  if (onGoing.endedAt !== undefined) {
    return Status.DOING_NOTHING;
  }

  const kind = ContentKindFromNumber(onGoing.contentKind);
  if (kind === ContentKindExt.WORK) {
    return Status.DOING_GYOMU;
  } else if (kind === ContentKindExt.NOT_WORK) {
    return Status.DOING_NOT_GYOMU;
  }

  return Status.LOADING;
};

export { selectAll, selectOngoing, selectStatus };
