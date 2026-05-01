import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const header = style({
  backgroundColor: vars.color.surface,
  boxShadow: vars.shadow.sm,
  padding: `${vars.space.md} ${vars.space.xl}`,
  display: "flex",
  alignItems: "center",
  gap: vars.space.lg,
});

export const title = style({
  fontSize: vars.font.size.lg,
  fontWeight: vars.font.weight.bold,
  color: vars.color.text,
  whiteSpace: "nowrap",
});

export const nav = style({
  display: "flex",
  gap: vars.space.sm,
});
