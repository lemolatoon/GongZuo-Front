import React from "react";
import { TwoRadioGroup } from "../ui/two-radio-group";
import { ContentKindExt } from "@/lib/contentKind";

type Props = {
  kind: "vertical" | "horizontal";
  contentKind: ContentKindExt;
  onChange(v: ContentKindExt): void;
};
export const GyomuRadioButton: React.FC<Props> = ({
  kind,
  onChange,
  contentKind,
}) => {
  return (
    <TwoRadioGroup
      kind={kind}
      value={contentKind}
      onChange={onChange}
      optionOne={ContentKindExt.WORK as const}
      optionOneDisplay={"業務内" as const}
      optionTwo={ContentKindExt.NOT_WORK as const}
      optionTwoDisplay={"業務外" as const}
    />
  );
};
