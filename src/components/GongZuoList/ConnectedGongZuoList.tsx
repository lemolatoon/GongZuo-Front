import React, { useState } from "react";
import { GongZuoList, GongZuoListType } from "./GongZuoList";
import { useErrorMessageHandler } from "@/hooks/useErrorHandler";
import {
  selectAllGongzuos,
  selectOneUser,
  useQueryAllGonzuos,
} from "@/hooks/useAllGongzuos";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { useGongZuoEditModal } from "@/state/modal";
import { useIndexedUsers } from "@/hooks/useAllUsers";

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
      : selectAllGongzuos;
  const { data: gongzuos } = useQueryAllGonzuos(handleErrorMessage, selector);
  const { getUserById } = useIndexedUsers(handleErrorMessage);
  const { open: openEditModal } = useGongZuoEditModal((state) => ({
    open: state.open,
  }));
  if (!gongzuos || !user || !getUserById) {
    return <div>loading...</div>;
  }
  const joinedGongzuos = gongzuos.flatMap((gongzuo) => {
    const user = getUserById(gongzuo.userId);
    if (!user) {
      console.error(`user ${gongzuo.userId} not found`);
      return [];
    }
    return [{ ...gongzuo, ...user }];
  });
  return (
    <GongZuoList
      className={className}
      listType={listType}
      setListType={setListType}
      joinedGongzuos={joinedGongzuos}
      userId={user.id}
      openEditModal={openEditModal}
    />
  );
};
