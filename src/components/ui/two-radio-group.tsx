import React from "react";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Label } from "./label";

type Props<
  T extends string,
  TDisplay extends string,
  U extends string,
  UDisplay extends string
> = {
  kind: "vertical" | "horizontal";
  value: T | U;
  optionOne: T;
  optionOneDisplay: TDisplay;
  optionTwo: U;
  optionTwoDisplay: UDisplay;
  onChange(v: T | U): void;
};
export const TwoRadioGroup = <
  T extends string,
  TDisplay extends string,
  U extends string,
  UDisplay extends string
>({
  kind,
  value,
  optionOne,
  optionOneDisplay,
  optionTwo,
  optionTwoDisplay,
  onChange,
}: Props<T, TDisplay, U, UDisplay>) => {
  const className = kind == "vertical" ? "flex flex-col" : "flex flex-row";
  return (
    <RadioGroup value={value} className={className} onValueChange={onChange}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value={optionOne} />
        <Label htmlFor={optionOne}>{optionOneDisplay}</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value={optionTwo} />
        <Label htmlFor={optionTwo}>{optionTwoDisplay}</Label>
      </div>
    </RadioGroup>
  );
};
