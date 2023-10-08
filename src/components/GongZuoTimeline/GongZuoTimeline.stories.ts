import type { Meta, StoryObj } from "@storybook/react";

import { GongZuoTimeline } from "./GongZuoTimeline";
import dayjs from "dayjs";
import { ContentKindExt } from "@/lib/contentKind";

const meta: Meta<typeof GongZuoTimeline> = {
  title: "components/GongZuoTimeline",
  component: GongZuoTimeline,
  // ...
};

export default meta;

type Story = StoryObj<typeof GongZuoTimeline>;

const duration = (flag: boolean, startedAt: string, endedAt?: string) => {
  let startedAtDate = dayjs(startedAt);
  startedAtDate = startedAtDate.add(-9, "hour");

  let endedAtDate = undefined;
  if (endedAt) {
    endedAtDate = dayjs(endedAt);
    endedAtDate = endedAtDate.add(-9, "hour");
  }

  return {
    kind: flag ? ContentKindExt.WORK : ContentKindExt.NOT_WORK,
    gongzuoId: 0,
    startedAt: startedAtDate.toDate(),
    endedAt: endedAtDate?.toDate(),
  };
};

const du = (startedAt: string, endedAt?: string) =>
  duration(true, startedAt, endedAt);
const dun = (startedAt: string, endedAt?: string) =>
  duration(false, startedAt, endedAt);

export const NotFinished: Story = {
  args: {
    name: "lemolatoon",
    gongzuoDurations: [
      ...[
        du("2021-01-01T01:00:00Z", "2021-01-01T02:00:00Z"),
        du("2021-01-01T02:05:00Z", "2021-01-01T05:00:00Z"),
        du("2021-01-01T21:05:00Z"),
      ],
    ],
    now: dayjs("2021-01-01T22:11:00Z").add(-9, "hour").toDate(),
  },
};

export const Finished: Story = {
  args: {
    name: "lemolatoon",
    gongzuoDurations: [
      ...[
        du("2021-01-01T01:00:00Z", "2021-01-01T02:00:00Z"),
        du("2021-01-01T02:05:00Z", "2021-01-01T05:00:00Z"),
        du("2021-01-01T21:05:00Z", "2021-01-01T21:44:00Z"),
      ],
    ],
    now: dayjs("2021-01-01T22:11:00Z").add(-9, "hour").toDate(),
  },
};

export const FinishedOutOfGyomu: Story = {
  args: {
    name: "lemolatoon",
    gongzuoDurations: [
      ...[
        dun("2021-01-01T01:00:00Z", "2021-01-01T02:00:00Z"),
        dun("2021-01-01T02:05:00Z", "2021-01-01T05:00:00Z"),
        dun("2021-01-01T21:05:00Z", "2021-01-01T21:44:00Z"),
      ],
    ],
    now: dayjs("2021-01-01T22:11:00Z").add(-9, "hour").toDate(),
  },
};
