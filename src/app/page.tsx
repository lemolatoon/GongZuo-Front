"use client";
import { Hi } from "./root.css";
import { ConnectedLoginForm } from "@/components/LoginForm";
import { CookiesProvider } from "react-cookie";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";

const Inner = () => {
  const user = useLoggedInUser();
  return (
    <main>
      <div className={Hi}>Hi!</div>
      <div>Here is user</div>
      <div>{JSON.stringify(user)}</div>
      <ConnectedLoginForm />
    </main>
  );
};

export default function Home() {
  return (
    <CookiesProvider>
      <Inner />
    </CookiesProvider>
  );
}
