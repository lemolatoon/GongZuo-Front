import React from "react";
import { label } from "./style.css";
import { MixinProps, constructStyle } from "@/styles/mixin";

type Props = {
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLLabelElement> &
  MixinProps;
export const Label: React.FC<Props> = ({ children, ...props }) => {
  return <label className={label}>{children}</label>;
};
