import React from "react";
import { Status, StatusDisplay } from "./StatusDisplay";
import { selectStatus, useQueryAllGonzuos } from "@/hooks/useAllGongzuos";
import { useErrorMessageHandler } from "@/hooks/useErrorHandler";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";

type Props = {
  className?: string;
};
export const ConnectedStatusDisplay: React.FC<Props> = ({ className }) => {
  const { handleErrorMessage } = useErrorMessageHandler();
  const { user } = useLoggedInUser(handleErrorMessage);

  if (!user) {
    return <StatusDisplay className={className} status={Status.LOADING} />;
  }
  return <Inner className={className} userId={user.id} />;
};

type InnerProps = {
  userId: number;
  className?: string;
};
const Inner = ({ userId, className }: InnerProps) => {
  const { handleErrorMessage } = useErrorMessageHandler();
  const { data } = useQueryAllGonzuos(handleErrorMessage, selectStatus(userId));
  return (
    <>
      <StatusDisplay className={className} status={data ?? Status.LOADING} />
    </>
  );
};
