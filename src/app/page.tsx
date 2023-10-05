"use client";
import { Hi } from "./root.css";
import { ConnectedLoginForm } from "@/components/LoginForm";
import { CookiesProvider } from "react-cookie";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";

export default function Home() {
  const user = useLoggedInUser();
  return (
    <CookiesProvider>
      <main>
        <div className={Hi}>Hi!</div>
        <div>Here is user</div>
        <div>{JSON.stringify(user)}</div>
        <ConnectedLoginForm />
      </main>
    </CookiesProvider>
  );
}
