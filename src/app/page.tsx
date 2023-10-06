"use client";
import { ConnectedLoginForm } from "@/components/LoginForm";
import { CookiesProvider } from "react-cookie";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { useLogout } from "@/hooks/useSession";
import { Button } from "@/components/ui/button";
import { ConnectedGongZuoAction } from "@/components/GongZuoAction/ConnectedGongZuoAction";
import { ConnectedGyomuRadioButton } from "@/components/GyomuRadioButton/ConnectedGyomuRadioButton";

const Inner = () => {
  const { user } = useLoggedInUser();
  const { logout } = useLogout();
  if (user) {
    return (
      <>
        <div>Hi!</div>
        <div className="text-3xl font-bold underline">Here is user</div>
        <div>{JSON.stringify(user)}</div>
        <ConnectedGyomuRadioButton kind="horizontal" />
        <ConnectedGongZuoAction />
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
