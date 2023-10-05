import { ContentKind } from "@/apiClient";

export enum ContentKindExt {
  WORK = "work",
  NOT_WORK = "not_work",
}

export const notWorkContent = {
  mainJob: "本業",
  partTimeJob: "アルバイト",
  publicSubsidyProject: "公的助成事業",
} as const;

export type NotWorkContentType = keyof typeof notWorkContent;

export function ContentKindFromNumber(kind: ContentKind): ContentKindExt {
  switch (kind) {
    case ContentKind.NUMBER_0:
      return ContentKindExt.WORK;
    case ContentKind.NUMBER_1:
      return ContentKindExt.NOT_WORK;
    default:
      const exhaustiveCheck: never = kind;
      throw new Error(`Unhandled ContentKind: ${exhaustiveCheck}`);
  }
}

export function ContentKindIntoNumber(kind: ContentKindExt): ContentKind {
  switch (kind) {
    case ContentKindExt.WORK:
      return ContentKind.NUMBER_0;
    case ContentKindExt.NOT_WORK:
      return ContentKind.NUMBER_1;
    default:
      const exhaustiveCheck: never = kind;
      throw new Error(`Unhandled ContentKind: ${exhaustiveCheck}`);
  }
}
