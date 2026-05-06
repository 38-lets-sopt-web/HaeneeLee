import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const panel = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
  width: "200px",
  flexShrink: 0,
});

export const card = style({
  backgroundColor: vars.color.surface,
  borderRadius: vars.radius.md,
  padding: vars.space.md,
  boxShadow: vars.shadow.sm,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space.xs,
});

export const label = style({
  fontSize: vars.font.size.sm,
  color: vars.color.textMuted,
  fontWeight: vars.font.weight.medium,
});

export const value = style({
  fontSize: vars.font.size.xxl,
  fontWeight: vars.font.weight.bold,
  color: vars.color.text,
});

export const statRow = style({
  display: "flex",
  gap: vars.space.sm,
  width: "100%",
});

export const statCard = style({
  flex: 1,
  backgroundColor: vars.color.surface,
  borderRadius: vars.radius.md,
  padding: vars.space.md,
  boxShadow: vars.shadow.sm,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space.xs,
});

export const successLabel = style({
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium,
  color: vars.color.textSuccess,
});

export const failLabel = style({
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium,
  color: vars.color.textDanger,
});

export const statValue = style({
  fontSize: vars.font.size.xl,
  fontWeight: vars.font.weight.bold,
  color: vars.color.text,
});

export const messageCard = style({
  backgroundColor: vars.color.surface,
  borderRadius: vars.radius.md,
  padding: vars.space.md,
  boxShadow: vars.shadow.sm,
  minHeight: "64px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const messageText = style({
  fontSize: vars.font.size.sm,
  color: vars.color.textMuted,
  textAlign: "center",
});
