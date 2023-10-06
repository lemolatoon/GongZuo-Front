import React from "react";
import { primary, secondary, tertiary } from "./style.css";
import { MixinProps, constructStyle } from "@/styles/mixin";

const Variant = {
  Primary: "primary",
  Secondary: "secondary",
  Tertiary: "tertiary",
} as const;

type Variant = (typeof Variant)[keyof typeof Variant];

type Props = {
  variant: Variant;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  MixinProps;
export const Button: React.FC<Props> = ({ variant, children, ...props }) => {
  let className;
  switch (variant) {
    case Variant.Primary:
      className = primary;
      break;
    case Variant.Secondary:
      className = secondary;
      break;
    case Variant.Tertiary:
      className = tertiary;
      break;
    default:
      console.error("invalid variant", variant);
      className = tertiary;
  }
  return <button className={className}>{children}</button>;
};
