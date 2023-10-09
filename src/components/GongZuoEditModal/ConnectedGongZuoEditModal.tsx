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
import { useGongZuoEditModal } from "@/state/modal";

export type Inputs = {
  // `YYYY-MM-DDTHH:mm:ss`
  startedAt: string;
  // `YYYY-MM-DDTHH:mm:ss`
  endedAt: string;
  contentKind: ContentKindExt;
  content: string;
};
type Props = {
  className?: string;
};
export const ConnectedGongZuoEditModal: React.FC<Props> = ({ className }) => {
  const { handleErrorMessage } = useErrorMessageHandler();
  const gongzuoId = useGongZuoEditModal((state) => state.gongzuoId);
  const { data } = useQueryGongzuoById(handleErrorMessage, gongzuoId);
  const { user } = useLoggedInUser(handleErrorMessage);
  if (gongzuoId == null) {
    return null;
  }
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
  gongzuoId: number | null;
  userId: number;
  className?: string;
};
const Inner: React.FC<InnerProps> = ({
  data,
  userId,
  className,
  gongzuoId,
}) => {
  const defaultContentKind = ContentKindFromNumber(data.contentKind);
  const form = useForm<Inputs>({
    defaultValues: {
      startedAt: dayjs(data.startedAt).format("YYYY-MM-DDTHH:mm:ss"),
      endedAt: data.endedAt
        ? dayjs(data.endedAt).format("YYYY-MM-DDTHH:mm:ss")
        : undefined,
      contentKind: defaultContentKind,
      content: data.content,
    },
  });
  const [contentKind, setContentKind] =
    React.useState<ContentKindExt>(defaultContentKind);

  const { handleErrorMessage } = useErrorMessageHandler();
  const { editGongzuo } = useEditGongzuo(handleErrorMessage);
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
      if (editGongzuo && gongzuoId) {
        editGongzuo({ ...payload, gongzuoId });
      }
    },
    [editGongzuo, gongzuoId, userId]
  );

  const { close } = useGongZuoEditModal((state) => ({ close: state.close }));

  return (
    <GongZuoEditModal
      contentKind={contentKind}
      setContentKind={setContentKind}
      isOpen={gongzuoId != null}
      close={close}
      form={form}
      onSubmit={onSubmit}
      className={className}
    />
  );
};
