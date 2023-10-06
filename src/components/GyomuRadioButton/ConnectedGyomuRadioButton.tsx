import React from "react";
import { GyomuRadioButton } from "./GyomuRadioButton";
import { useGyomu } from "@/state/gyomu";
import { ContentKindExt } from "@/lib/contentKind";

type Props = {
  kind: "vertical" | "horizontal";
};
export const ConnectedGyomuRadioButton: React.FC<Props> = ({ kind }) => {
  const { contentKind, setGyomu } = useGyomu();
  return (
    <GyomuRadioButton
      kind={kind}
      contentKind={contentKind}
      onChange={setGyomu}
    />
  );
};
