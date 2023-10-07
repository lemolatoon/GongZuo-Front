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
import { GongZuoTimeline } from "@/components/GongZuoTimeline/GongZuoTimeline";
import dayjs from "dayjs";
import { ContentKindExt } from "@/lib/contentKind";

const queryClient = new QueryClient();

const du = (startedAt: string, endedAt?: string) => {
  let startedAtDate = dayjs(startedAt);
  startedAtDate = startedAtDate.add(-9, "hour");

  let endedAtDate = undefined;
  if (endedAt) {
    endedAtDate = dayjs(endedAt);
    endedAtDate = endedAtDate.add(-9, "hour");
  }

  return {
    kind: ContentKindExt.WORK,
    startedAt: startedAtDate.toDate(),
    endedAt: endedAtDate?.toDate(),
  };
};

const Inner = () => {
  const { handleErrorMessage } = useErrorMessageHandler();
  const { user } = useLoggedInUser(handleErrorMessage);
  const { logout } = useLogout();
  const { data } = useQueryAllGonzuos(handleErrorMessage, selectAll);
  const props = {
    name: "lemolatoon",
    gongzuoDurations: [
      ...[
        du("2021-01-01T01:00:00Z", "2021-01-01T02:00:00Z"),
        du("2021-01-01T02:05:00Z", "2021-01-01T05:00:00Z"),
        du("2021-01-01T22:05:00Z"),
      ],
    ],
    now: dayjs("2021-01-01T23:00:00Z").add(-9, "hour").toDate(),
  };
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
          <GongZuoTimeline {...props} />
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
