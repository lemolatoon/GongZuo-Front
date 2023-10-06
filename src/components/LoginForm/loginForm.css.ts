import { style } from "@vanilla-extract/css";

export const wrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export const loginMessage = style({
  marginTop: "32px",
  fontSize: "64px",
});

export const formStyle = style({
  marginTop: "8px",
});

export const inputStyle = style({
  fontSize: "inherit",
  width: "100%",
});
