import { TimelineDateAction } from "@/components/TimelineDateAction/TimelineDateAction";
import { useTimelineNow } from "@/state/timelineNow";
import React from "react";

type Props = { className?: string };
export const ConnectedTimelineDateAction: React.FC<Props> = ({ className }) => {
  const res = useTimelineNow();
  return <TimelineDateAction {...res} className={className} />;
};
