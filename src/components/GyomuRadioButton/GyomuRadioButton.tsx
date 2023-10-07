import React from "react";
import { TwoRadioGroup } from "../ui/two-radio-group";
import { ContentKindExt } from "@/lib/contentKind";

type Props = {
  kind: "vertical" | "horizontal";
  contentKind: ContentKindExt;
  onChange(v: ContentKindExt): void;
  className?: string;
};
export const GyomuRadioButton: React.FC<Props> = ({
  className,
  kind,
  onChange,
  contentKind,
}) => {
  return (
    <TwoRadioGroup
      kind={kind}
      className={className}
      value={contentKind}
      onChange={onChange}
      optionOne={ContentKindExt.WORK as const}
      optionOneDisplay={"業務内" as const}
      optionTwo={ContentKindExt.NOT_WORK as const}
      optionTwoDisplay={"業務外" as const}
    />
  );
};
