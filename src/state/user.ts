import { User } from "@/apiClient";
import { create } from "zustand";

type UserState = {
  userInfo: {
    sessionToken: string | null;
    user: User | null;
  };
  setUser: (session_token: string, user: User) => void;
  clearUser: () => void;
};

export const useUserRaw = create<UserState>((set) => ({
  userInfo: {
    sessionToken: null,
    user: null,
  },
  setUser: (sessionToken: string, user: User) =>
    set(() => ({ userInfo: { sessionToken, user } })),
  clearUser: () =>
    set(() => ({ userInfo: { sessionToken: null, user: null } })),
}));

export const selectUser = (state: UserState) => state.userInfo.user;
