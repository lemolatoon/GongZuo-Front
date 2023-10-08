import { errorHandler } from "@/lib/error";
import { useUserClient } from "@/state/client";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

type Handler = (msg: string) => void;
const getAllUsersKey = "/user/users";
export const useQueryAllUsers = (handler: Handler) => {
  const { userClient } = useUserClient();

  const fetcher = useCallback(async () => {
    try {
      return await userClient.getAllUsers();
    } catch (e) {
      errorHandler(e, handler);
      return [];
    }
  }, [userClient, handler]);

  const res = useQuery([getAllUsersKey], fetcher);

  return res;
};
