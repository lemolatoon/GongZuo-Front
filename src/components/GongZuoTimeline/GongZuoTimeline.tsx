import React from "react";
import dayjs from "dayjs";
import { ContentKindExt } from "@/lib/contentKind";

export type GongZuoDuration = {
  gongzuoId: number;
  kind: ContentKindExt;
  startedAt: Date;
  endedAt?: Date;
};

type Props = {
  name: string;
  isTop: boolean;
  gongzuoDurations: GongZuoDuration[];
  now: Date;
  className?: string;
};
type FifteenMinutesInfo =
  | {
      state: "done" | "ongoing";
      kind: ContentKindExt;
    }
  | {
      state: "not-yet" | "nothing";
      kind: undefined;
    };
export const GongZuoTimeline: React.FC<Props> = ({
  name,
  isTop,
  gongzuoDurations,
  now,
  className,
}) => {
  const base = dayjs(now).startOf("day");
  console.log(gongzuoDurations);
  const fifteenMinutesInfos: FifteenMinutesInfo[] = Array.from({
    length: 96,
  }).map((_, i) => {
    const startSplitTime = base.add(i * 15, "minute").toDate();
    const endSplitTime = base.add((i + 1) * 15, "minute").toDate();
    let state: FifteenMinutesInfo["state"] = "nothing";

    if (now < startSplitTime) {
      state = "not-yet";
      return { state, kind: undefined };
    }

    const info = gongzuoDurations.flatMap((duration) => {
      const { startedAt, endedAt } = duration;

      // 今考えている区間が、フルで作業されている
      // startedAt <= startSplitTime < endSplitTime < endedAt
      const fullyFilled =
        startedAt <= startSplitTime &&
        (endedAt === undefined || endSplitTime <= endedAt);

      // 今考えている区間で作業が開始され、終わっている
      // startSplitTime < startedAt < endedAt < endSplitTime
      const fillingStartAndEnd =
        endedAt !== undefined &&
        startSplitTime < startedAt &&
        endedAt < endSplitTime;

      // 今考えている区間で作業が開始され、終わっていない
      // startSplitTime < startedAt < endSplitTime < endedAt || endedAt === undefined
      const fillingStarted =
        startSplitTime < startedAt &&
        startedAt < endSplitTime &&
        (endedAt === undefined || endSplitTime <= endedAt);

      // 今考えている区間より前で作業が開始され、終わっている
      // startedAt < startsSplitTime < endedAt < endSplitTime
      const fillingEnded =
        endedAt !== undefined &&
        startedAt < startSplitTime &&
        startSplitTime < endedAt &&
        endedAt < endSplitTime;

      // 現在時刻が、今考えている区間の中にあり、作業が終わっていない
      // startSplitTime < now < endSplitTime && endedAt === undefined
      const isOnGoing =
        startSplitTime <= now && now <= endSplitTime && endedAt === undefined;
      console.log(
        startSplitTime <= now,
        now <= endSplitTime,
        endedAt === undefined
      );
      console.log({
        fullyFilled,
        fillingStartAndEnd,
        fillingStarted,
        fillingEnded,
        isOnGoing,
      });
      const isDone =
        fullyFilled || fillingStartAndEnd || fillingStarted || fillingEnded;
      if (isOnGoing) {
        return {
          state: "ongoing",
          kind: duration.kind,
        } as const;
      } else if (isDone) {
        return {
          state: "done",
          kind: duration.kind,
        } as const;
      }

      return [];
    });

    if (info.length === 0) {
      return { state: "nothing", kind: undefined };
    } else {
      console.log(info);
      return info[0];
    }
  });
  console.log(fifteenMinutesInfos);

  return (
    <div className={`w-full flex justify-start ${className}`}>
      <div className="text-lg">{name}: </div>
      <div className="grid grid-cols-97">
        {fifteenMinutesInfos.map((info, i) => {
          let className =
            "border-black border-t-2 border-b-2 border-l-[0.1px] border-timeline w-[0.75em] h-full";
          if (info.state === "done") {
            if (info.kind === ContentKindExt.WORK) {
              className += " bg-green-300";
            } else {
              className += " bg-blue-300";
            }
          } else if (info.state === "ongoing") {
            className += " bg-red-300";
          } else {
            className += " bg-gray-300";
          }

          const TimeDisplayer = ({ i }: { i: number }) => {
            const time =
              i == 96 ? "24:00" : base.add(i * 15, "minute").format("HH:mm");
            return (
              <>
                <div className="absolute h-full">
                  <div className="h-[120%] border-dashed border-l-[0.1px] border-black w-[0.75em]" />
                  <div
                    className="text-center -translate-x-1/2"
                    style={{ fontSize: "1px" }}
                  >
                    {time}
                  </div>
                </div>
              </>
            );
          };
          return (
            <>
              <div className="relative h-full box-content">
                {i % 8 == 0 && <TimeDisplayer i={i} />}
                <div key={i} className={className} />
              </div>
              {i === 95 && (
                <div className="relative h-full box-content">
                  {<TimeDisplayer i={i + 1} />}
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};
