import { User } from "@/apiClient";
import { create } from "zustand";

type UserState = {
  user_info: {
    session_token: string | null;
    user: User | null;
  };
  setUser: (session_token: string, user: User) => void;
};

export const useUser = create<UserState>((set) => ({
  user_info: {
    session_token: null,
    user: null,
  },
  setUser: (session_token: string, user: User) =>
    set(() => ({ user_info: { session_token, user } })),
}));
