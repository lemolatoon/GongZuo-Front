"use client";
import { ConnectedLoginForm } from "@/components/LoginForm";
import { CookiesProvider } from "react-cookie";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { useLogout } from "@/hooks/useSession";
import { Button } from "@/components/ui/button";
import { ConnectedGongZuoAction } from "@/components/GongZuoAction";
import { ConnectedGyomuRadioButton } from "@/components/GyomuRadioButton";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useQueryAllGonzuos } from "@/hooks/useAllGongzuos";

const queryClient = new QueryClient();

const Inner = () => {
  const { user } = useLoggedInUser();
  const { logout } = useLogout();
  const { data } = useQueryAllGonzuos(console.error);
  if (user) {
    return (
      <>
        <ConnectedGyomuRadioButton kind="vertical" />
        <ConnectedGongZuoAction />
        <div>{JSON.stringify(data)}</div>
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
      <QueryClientProvider client={queryClient}>
        <main>
          <Inner />
        </main>
      </QueryClientProvider>
    </CookiesProvider>
  );
}
