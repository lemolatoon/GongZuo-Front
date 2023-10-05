"use client";
import { Hi } from "./root.css";
import { ConnectedLoginForm } from "@/components/LoginForm";
import { CookiesProvider } from "react-cookie";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { useLogout } from "@/hooks/useSession";
import { Button } from "@/components/ui/Button";

const Inner = () => {
  const { user } = useLoggedInUser();
  const { logout } = useLogout();
  if (user) {
    return (
      <>
        <div className={Hi}>Hi!</div>
        <div>Here is user</div>
        <div>{JSON.stringify(user)}</div>
        <Button variant="secondary" onClick={logout}>
          ログアウト
        </Button>
      </>
    );
  } else {
    return <ConnectedLoginForm />;
  }
};

export default function Home() {
  return (
    <CookiesProvider>
      <main>
        <Inner />
      </main>
    </CookiesProvider>
  );
}
