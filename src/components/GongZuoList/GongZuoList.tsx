import React from "react";
import { TwoRadioGroup } from "../ui/two-radio-group";
import { Gongzuo, User } from "@/apiClient";
import { ContentKindExt, ContentKindFromNumber } from "@/lib/contentKind";
import { Button } from "../ui/button";
import dayjs from "dayjs";

export enum GongZuoListType {
  ALL = "all",
  MINE = "mine",
}
type Props = {
  className?: string;
  listType: GongZuoListType;
  joinedGongzuos: (Gongzuo & User)[];
  userId: number;
  setListType(type: GongZuoListType): void;
  openEditModal(gongzuoId: number): void;
};
export const GongZuoList: React.FC<Props> = ({
  className,
  listType,
  joinedGongzuos,
  userId,
  setListType,
  openEditModal,
}) => {
  return (
    <div className={`flex w-full justify-center ${className}`}>
      <div className="w-4/5 flex flex-col justify-start">
        <TwoRadioGroup
          className="flex justify-center"
          kind={"horizontal"}
          value={listType}
          optionOne={GongZuoListType.ALL}
          optionOneDisplay={"全員"}
          optionTwo={GongZuoListType.MINE}
          optionTwoDisplay={"自分のみ"}
          onChange={setListType}
        />
        <div className="w-full flex justify-center">
          <div className="w-full mt-8 border-2 border-black">
            {joinedGongzuos.map((gongzuo) => {
              const {
                id: gongzuoId,
                userId: gongzuoUserId,
                username,
                contentKind,
                content,
                startedAt,
                endedAt,
              } = gongzuo;
              let kind = "業務内";
              switch (ContentKindFromNumber(contentKind)) {
                case ContentKindExt.WORK:
                  kind = "業務内";
                  break;
                case ContentKindExt.NOT_WORK:
                  kind = "業務外";
                  break;
              }
              return (
                <div key={gongzuoId} className="grid grid-cols-5">
                  <div className="flex flex-col items-center justify-center">
                    {username}
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    {kind}
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    {content}
                  </div>
                  <div className="text-center">
                    {dayjs(startedAt).format("YYYY/MM/DD HH:mm:ss")}{" "}
                    <div className="text-center">~</div>
                    {endedAt
                      ? dayjs(endedAt).format("YYYY/MM/DD HH:mm:ss")
                      : "進行中"}
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <Button
                      disabled={userId !== gongzuoUserId}
                      onClick={() => openEditModal(gongzuoId)}
                    >
                      編集
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
