"use client";
import { ConnectedLoginForm } from "@/components/LoginForm";
import { CookiesProvider } from "react-cookie";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { useLogout } from "@/hooks/useSession";
import { Button } from "@/components/ui/button";
import { ConnectedGongZuoAction } from "@/components/GongZuoAction";
import { ConnectedGyomuRadioButton } from "@/components/GyomuRadioButton";

const Inner = () => {
  const { user } = useLoggedInUser();
  const { logout } = useLogout();
  if (user) {
    return (
      <>
        <ConnectedGyomuRadioButton kind="vertical" />
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
