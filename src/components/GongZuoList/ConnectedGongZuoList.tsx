import React, { useState } from "react";
import { GongZuoList, GongZuoListType } from "./GongZuoList";
import { useErrorMessageHandler } from "@/hooks/useErrorHandler";
import {
  selectAll,
  selectOneUser,
  useQueryAllGonzuos,
} from "@/hooks/useAllGongzuos";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { useGongZuoEditModal } from "@/state/modal";

type Props = {
  className?: string;
};
export const ConnectedGongZuoList: React.FC<Props> = ({ className }) => {
  const [listType, setListType] = useState<GongZuoListType>(
    GongZuoListType.ALL
  );

  const { handleErrorMessage } = useErrorMessageHandler();
  const { user } = useLoggedInUser(handleErrorMessage);
  const selector =
    user && listType === GongZuoListType.MINE
      ? selectOneUser(user.id)
      : selectAll;
  const { data: gongzuos } = useQueryAllGonzuos(handleErrorMessage, selector);
  const { open: openEditModal } = useGongZuoEditModal((state) => ({
    open: state.open,
  }));
  if (!gongzuos || !user) {
    return <div>loading...</div>;
  }
  return (
    <GongZuoList
      className={className}
      listType={listType}
      setListType={setListType}
      gongzuos={gongzuos}
      userId={user.id}
      openEditModal={openEditModal}
    />
  );
};
