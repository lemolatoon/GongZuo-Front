"use client";
import { Hi } from "./root.css";
import { useUser } from "@/state/user";
import { ConnectedLoginForm } from "@/components/LoginForm";

export default function Home() {
  const { user } = useUser((state) => state.user_info);
  return (
    <main>
      <div className={Hi}>Hi!</div>
      <div>Here is user</div>
      <div>{JSON.stringify(user)}</div>
      <ConnectedLoginForm />
    </main>
  );
}
