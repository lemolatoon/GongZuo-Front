import { GongZuoEditModal } from "@/components/GongZuoEditModal/GongZuoEditModal";
import { useErrorMessageHandler } from "@/hooks/useErrorHandler";
import { useQueryGongzuoById } from "@/hooks/useGongZuoById";
import {
  ContentKindExt,
  ContentKindFromNumber,
  ContentKindIntoNumber,
} from "@/lib/contentKind";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { useEditGongzuo } from "@/hooks/useEditGongzuo";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { useInvalidateAllGongzuos } from "@/hooks/useAllGongzuos";

export type Inputs = {
  // `YYYY-MM-DDTHH:mm:ss`
  startedAt: string;
  // `YYYY-MM-DDTHH:mm:ss`
  endedAt: string;
  contentKind: ContentKindExt;
  content: string;
};
type Props = {
  gongzuoId: number;
  className?: string;
};
export const ConnectedGongZuoEditModal: React.FC<Props> = ({
  gongzuoId,
  className,
}) => {
  const { handleErrorMessage } = useErrorMessageHandler();
  const { data } = useQueryGongzuoById(handleErrorMessage, gongzuoId);
  const { user } = useLoggedInUser(handleErrorMessage);
  if (!data || !user) {
    return <Loading />;
  }

  return (
    <Inner
      gongzuoId={gongzuoId}
      userId={user.id}
      data={data}
      className={className}
    />
  );
};

const Loading = () => {
  return <div>Loading...</div>;
};

type InnerProps = {
  data: NonNullable<ReturnType<typeof useQueryGongzuoById>["data"]>;
  gongzuoId: number;
  userId: number;
  className?: string;
};
const Inner: React.FC<InnerProps> = ({
  data,
  gongzuoId,
  userId,
  className,
}) => {
  const form = useForm<Inputs>({
    defaultValues: {
      startedAt: dayjs(data.startedAt).format("YYYY-MM-DDTHH:mm:ss"),
      endedAt: data.endedAt
        ? dayjs(data.endedAt).format("YYYY-MM-DDTHH:mm:ss")
        : undefined,
      contentKind: ContentKindFromNumber(data.contentKind),
      content: data.content,
    },
  });

  const { handleErrorMessage } = useErrorMessageHandler();
  const { editGongzuo } = useEditGongzuo(handleErrorMessage, gongzuoId);
  const onSubmit = useCallback(
    (data: Inputs) => {
      const { startedAt, endedAt, contentKind, content } = data;
      const payload = {
        gongzuoId,
        userId,
        startedAt: dayjs(startedAt).toDate(),
        endedAt: endedAt ? dayjs(endedAt).toDate() : undefined,
        contentKind: ContentKindIntoNumber(contentKind),
        content,
      };
      editGongzuo(payload);
    },
    [editGongzuo, gongzuoId, userId]
  );
  return (
    <GongZuoEditModal form={form} onSubmit={onSubmit} className={className} />
  );
};
