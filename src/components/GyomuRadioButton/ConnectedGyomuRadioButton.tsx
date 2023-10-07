import React from "react";
import { GyomuRadioButton } from "./GyomuRadioButton";
import { useGyomu } from "@/state/gyomu";
import { ContentKindExt } from "@/lib/contentKind";

type Props = {
  kind: "vertical" | "horizontal";
  className?: string;
};
export const ConnectedGyomuRadioButton: React.FC<Props> = ({
  kind,
  className,
}) => {
  const { contentKind, setGyomu } = useGyomu();
  return (
    <GyomuRadioButton
      className={className}
      kind={kind}
      contentKind={contentKind}
      onChange={setGyomu}
    />
  );
};
