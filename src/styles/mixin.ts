import { HTMLAttributes } from "react";

export enum Margin {
  SPACE_02 = "2px",
  SPACE_04 = "4px",
  SPACE_08 = "8px",
  SPACE_16 = "16px",
  SPACE_24 = "24px",
  SPACE_32 = "32px",
}

export enum Padding {
  SPACE_02 = "2px",
  SPACE_04 = "4px",
  SPACE_08 = "8px",
  SPACE_16 = "16px",
  SPACE_24 = "24px",
  SPACE_32 = "32px",
}

export enum FontSize {
  SMALL = "12px",
  MEDIUM = "16px",
  LARGE = "20px",
  XLARGE = "24px",
  XXLARGE = "28px",
}

export enum Color {
  BLACK = "#000000",
  WHITE = "#ffffff",
  GRAY = "#cccccc",
  LIGHT_GRAY = "#eeeeee",
  RED = "#ff0000",
  GREEN = "#00ff00",
  BLUE = "#0000ff",
}

export type MarginProps = {
  margin?: Margin;
  marginTop?: Margin;
  marginBottom?: Margin;
  marginLeft?: Margin;
  marginRight?: Margin;
};

export type PaddingProps = {
  padding?: Padding;
  paddingTop?: Padding;
  paddingBottom?: Padding;
  paddingLeft?: Padding;
  paddingRight?: Padding;
};

export type FontSizeProps = {
  fontSize?: FontSize;
};

export type ColorProps = {
  color?: Color;
};

export type MixinProps = MarginProps &
  PaddingProps &
  FontSizeProps &
  ColorProps;

type RetType = Pick<Required<HTMLAttributes<HTMLDivElement>>, "style">;
export const constructStyle = (props: MixinProps): RetType => {
  return {
    style: props,
  };
};
