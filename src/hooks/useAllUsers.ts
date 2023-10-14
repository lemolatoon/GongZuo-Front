import { User } from "@/apiClient";
import { errorHandler } from "@/lib/error";
import { useUserClient } from "@/state/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

type Handler = (msg: string) => void;
type Selector<T> = (users: User[]) => T;
const getAllUsersKey = "/user/users";
export const useQueryAllUsers = <T>(
  handler: Handler,
  selector: Selector<T>
) => {
  const { userClient } = useUserClient();

  const fetcher = useCallback(async () => {
    try {
      return await userClient.getAllUsers();
    } catch (e) {
      errorHandler(e, handler);
      return [];
    }
  }, [userClient, handler]);

  const { data, ...rest } = useQuery([getAllUsersKey], fetcher);

  const selected = useMemo(
    () => (data === undefined ? undefined : selector(data)),
    [data, selector]
  );

  return {
    ...rest,
    data: selected,
  };
};

export const useIndexedUsers = (handler: Handler) => {
  const { data, ...rest } = useQueryAllUsers(handler, selectAll);

  const indexed = useMemo(() => {
    if (data === undefined) {
      return undefined;
    }
    const indexed: { [key: number]: User } = {};
    data.forEach((user) => {
      indexed[user.id] = user;
    });
    return indexed;
  }, [data]);

  const getUserById = useCallback(
    (userId: number) => {
      if (indexed === undefined) {
        return undefined;
      }
      return indexed[userId];
    },
    [indexed]
  );

  if (indexed === undefined) {
    return {
      getUserById: undefined,
    };
  }

  return {
    getUserById,
  };
};

export const useInvalidateAllUsers = () => {
  const queryClient = useQueryClient();

  const invalidate = useCallback(() => {
    queryClient.invalidateQueries([getAllUsersKey]);
  }, [queryClient]);

  return {
    invalidate,
  };
};

const selectAll = (users: User[]) => users;
export { selectAll as selectAllUsers };
