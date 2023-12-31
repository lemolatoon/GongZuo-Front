"use client";
import { ConnectedLoginForm } from "@/components/LoginForm";
import { CookiesProvider } from "react-cookie";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { useLogout } from "@/hooks/useSession";
import { Button } from "@/components/ui/button";
import { ConnectedGongZuoAction } from "@/components/GongZuoAction";
import { ConnectedGyomuRadioButton } from "@/components/GyomuRadioButton";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { selectAllGongzuos, useQueryAllGonzuos } from "@/hooks/useAllGongzuos";
import { useErrorMessageHandler } from "@/hooks/useErrorHandler";
import { Toaster } from "@/components/ui/toaster";
import { ConnectedStatusDisplay } from "@/components/StatusDisplay";
import { ConnectedGongZuoTimeline } from "@/components/GongZuoTimeline/ConnectedGongZuoTimeline";
import { selectAllUsers, useQueryAllUsers } from "@/hooks/useAllUsers";
import { ConnectedGongZuoEditModal } from "@/components/GongZuoEditModal";
import { ConnectedTimelineDateAction } from "@/components/TimelineDateAction";
import { ConnectedRegisterModal } from "@/components/RegisterModal";
import { ConnectedGongZuoList } from "@/components/GongZuoList";

const queryClient = new QueryClient();

const Inner = () => {
  const { handleErrorMessage } = useErrorMessageHandler();
  const { user } = useLoggedInUser(handleErrorMessage);
  const { logout } = useLogout();
  const { data } = useQueryAllGonzuos(handleErrorMessage, selectAllGongzuos);
  const { data: users } = useQueryAllUsers(handleErrorMessage, selectAllUsers);
  if (!users) {
    return <div>loading...</div>;
  }
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
          <div className="w-full border-dashed p-1 border-t-2 border-stone-800 mt-8">
            <div className="mt-4 flex justify-center">
              <div className="grid">
                {users.map((user, i) => {
                  return (
                    <ConnectedGongZuoTimeline
                      key={i}
                      isBottom={i === users.length - 1}
                      name={user.username}
                      userId={user.id}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <ConnectedTimelineDateAction className="mt-8 w-[400px]" />
          </div>
          <ConnectedGongZuoEditModal />
          <ConnectedGongZuoList className="mt-8" />
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
        <ConnectedRegisterModal />
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
