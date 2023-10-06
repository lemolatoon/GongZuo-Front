import { Gongzuo } from "@/apiClient";
import React from "react";

type Props = {
  gongzuos: Record<string, Gongzuo[]>;
};
export const GongZuoView: React.FC<Props> = ({ gongzuos }) => {
  return <div>JSON.stringify(gongzuos)</div>;
};
