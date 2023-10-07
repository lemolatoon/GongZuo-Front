import React from "react";
import dayjs from "dayjs";
import { ContentKindExt } from "@/lib/contentKind";

export type GongZuoDuration = {
  kind: ContentKindExt;
  startedAt: Date;
  endedAt?: Date;
};

type Props = {
  name: string;
  gongzuoDurations: GongZuoDuration[];
  now: Date;
  className?: string;
};
export const GongZuoTimeline: React.FC<Props> = ({
  name,
  gongzuoDurations,
  now,
  className,
}) => {
  const base = dayjs(now).startOf("day");
  const nowIndex = dayjs(now).diff(base, "minute") / 15;
  return (
    <div className={`w-full flex justify-start ${className}`}>
      <div className="text-lg">{name}: </div>
      <div className="grid grid-cols-96">
        {Array.from({ length: 96 }).map((_, i) => {
          const startSplitTime = base.add(i * 15, "minute").toDate();
          const endSplitTime = base.add((i + 1) * 15, "minute").toDate();
          let isDone = false;
          let isOnGoing = false;
          gongzuoDurations.forEach((duration) => {
            // startedAt <= time < next < endedAt
            const { startedAt, endedAt } = duration;
            if (
              startedAt <= startSplitTime &&
              (endedAt === undefined
                ? endSplitTime <= now
                : endSplitTime <= endedAt)
            ) {
              isDone = true;
            } else if (endedAt === undefined) {
              isOnGoing = true;
            }
          });

          let className =
            "border-black border-t-2 border-b-2 border-dashed border-l-[0.1px] border-r-[0.1px] w-[0.5em]";
          if (isDone) {
            className += " bg-green-300";
          } else if (nowIndex === i && isOnGoing) {
            className += " bg-red-300";
          } else {
            className += " bg-gray-300";
          }
          return <div key={i} className={className} />;
        })}
      </div>
    </div>
  );
};
