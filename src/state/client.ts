import { Configuration, GongzuosApi, UsersApi } from "@/apiClient";
import { create } from "zustand";

const config = new Configuration({
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "http://localhost:3001",
});
const gongzuoClient = new GongzuosApi(config);
const userClient = new UsersApi(config);

export const useGongzuoClient = create(() => ({
  gongzuoClient,
}));

export const useUserClient = create(() => ({
  userClient,
}));
