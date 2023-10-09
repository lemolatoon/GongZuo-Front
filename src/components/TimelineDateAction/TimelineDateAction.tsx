import { Button } from "@/components/ui/button";
import { TimelineNowState } from "@/state/timelineNow";
import dayjs from "dayjs";
import React from "react";

type Props = { className?: string } & TimelineNowState;
export const TimelineDateAction: React.FC<Props> = ({
  className,
  now,
  nextDay,
  previousDay,
  reset,
}) => {
  return (
    <div className={className}>
      <div className="grid grid-cols-3">
        <Button variant="default" onClick={previousDay}>
          前日
        </Button>
        <div
          className="leading-[40px] flex justify-center bg-slate-200"
          onClick={reset}
        >
          {dayjs(now).format("YYYY/MM/DD")}
        </div>
        <Button variant="default" onClick={nextDay}>
          翌日
        </Button>
      </div>
      <div className="mt-4 flex justify-center">
        <Button variant="destructive" onClick={reset}>
          リセット
        </Button>
      </div>
    </div>
  );
};
