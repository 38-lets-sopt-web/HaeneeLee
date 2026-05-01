import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const board = style({
  backgroundColor: vars.color.boardBg,
  borderRadius: vars.radius.lg,
  padding: vars.space.lg,
  display: "grid",
  gap: vars.space.md,
  aspectRatio: "1 / 1",
  flex: 1,
  minHeight: 0,
  width: "auto",
  maxWidth: "100%",
});
