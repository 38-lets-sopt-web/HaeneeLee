import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const tableWrapper = style({
  backgroundColor: vars.color.surface,
  borderRadius: vars.radius.lg,
  boxShadow: vars.shadow.md,
  overflow: "hidden",
});

export const table = style({
  width: "100%",
  borderCollapse: "collapse",
});

export const thead = style({
  backgroundColor: vars.color.boardBg,
});

export const th = style({
  padding: `${vars.space.md} ${vars.space.lg}`,
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.bold,
  color: vars.color.textMuted,
  textAlign: "left",
  borderBottom: `1px solid ${vars.color.border}`,
});

export const tr = style({
  borderBottom: `1px solid ${vars.color.border}`,
  transition: "background-color 0.15s ease",

  ":last-child": {
    borderBottom: "none",
  },
  ":hover": {
    backgroundColor: vars.color.boardBg,
  },
});

export const td = style({
  padding: `${vars.space.md} ${vars.space.lg}`,
  fontSize: vars.font.size.md,
  color: vars.color.text,
});

export const rankCell = style({
  fontWeight: vars.font.weight.bold,
  color: vars.color.textMuted,
  width: "60px",
  textAlign: "center",
});

export const rankTop = style({
  color: vars.color.primary,
  fontSize: vars.font.size.lg,
});

export const scoreCell = style({
  fontWeight: vars.font.weight.bold,
  color: vars.color.text,
});

export const levelBadge = style({
  display: "inline-block",
  backgroundColor: vars.color.primaryLight,
  color: vars.color.primary,
  borderRadius: vars.radius.full,
  padding: `2px ${vars.space.sm}`,
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.bold,
});

export const empty = style({
  padding: vars.space.xxl,
  textAlign: "center",
  color: vars.color.textMuted,
  fontSize: vars.font.size.md,
});
