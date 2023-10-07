"use client";
import { ConnectedLoginForm } from "@/components/LoginForm";
import { CookiesProvider } from "react-cookie";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { useLogout } from "@/hooks/useSession";
import { Button } from "@/components/ui/button";
import { ConnectedGongZuoAction } from "@/components/GongZuoAction";
import { ConnectedGyomuRadioButton } from "@/components/GyomuRadioButton";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { selectAll, useQueryAllGonzuos } from "@/hooks/useAllGongzuos";
import { useErrorMessageHandler } from "@/hooks/useErrorHandler";
import { Toaster } from "@/components/ui/toaster";
import { ConnectedStatusDisplay } from "@/components/StatusDisplay";

const queryClient = new QueryClient();

const Inner = () => {
  const { handleErrorMessage } = useErrorMessageHandler();
  const { user } = useLoggedInUser(handleErrorMessage);
  const { logout } = useLogout();
  const { data } = useQueryAllGonzuos(handleErrorMessage, selectAll);
  if (user) {
    return (
      <>
        <div className="w-full">
          <div className="mt-2 mb-8 grid grid-cols-3">
            <ConnectedGyomuRadioButton kind="vertical" className="ml-2" />
            <ConnectedStatusDisplay className="text-center" />
          </div>
          <div>
            <div className="flex justify-center">
              <div className="w-1/2">
                <ConnectedGongZuoAction />
              </div>
            </div>
          </div>
          <h1>{data?.length}</h1>
          <div>{JSON.stringify(data)}</div>
          <Button variant="secondary" onClick={logout}>
            ログアウト
          </Button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <ConnectedLoginForm />
      </>
    );
  }
};

export default function Home() {
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <main>
          <Inner />
          <Toaster />
        </main>
      </QueryClientProvider>
    </CookiesProvider>
  );
}
