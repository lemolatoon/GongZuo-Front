import { style } from "@vanilla-extract/css";

export const tertiary = style({
  backgroundColor: "#d9d9d9" /* より控えめな色 */,
  color: "#333",
  border: "2px solid #aaa" /* より明るいボーダー */,
  borderRadius: "8px",
  cursor: "pointer",
});

export const secondary = style({
  backgroundColor: "#f5f5dc" /* ベージュ色 */,
  color: "#333",
  border: "2px solid #aaa" /* より明るいボーダー */,
  borderRadius: "8px",
  cursor: "pointer",
});

export const primary = style({
  backgroundColor: "#ffe791" /* シンプルなベージュ色 */,
  color: "#333" /* 中の文字の色を変更 */,
  border: "2px solid #aaa" /* より明るいボーダー */,
  borderRadius: "8px",
  cursor: "pointer",
});
