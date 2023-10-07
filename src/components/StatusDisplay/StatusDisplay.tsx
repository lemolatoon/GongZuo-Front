import React from "react";

export enum Status {
  LOADING = "読み込み中",
  DOING_GYOMU = "業務作業中",
  DOING_NOT_GYOMU = "業務外作業中",
  DOING_NOTHING = "作業外",
}

type Props = {
  status: Status;
  className?: string;
};

export const StatusDisplay: React.FC<Props> = ({ status, className }) => {
  return <div className={`${className} text-lg`}>Status: {status}</div>;
};
