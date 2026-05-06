import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const container = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});

export const buttonGroup = style({
  display: "flex",
  gap: vars.space.sm,
});

export const select = style({
  appearance: "none",
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.full,
  padding: `${vars.space.sm} ${vars.space.lg}`,
  fontSize: vars.font.size.md,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text,
  cursor: "pointer",
  boxShadow: vars.shadow.sm,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748b' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
  paddingRight: "32px",

  ":disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  ":focus": {
    outline: `2px solid ${vars.color.primary}`,
    outlineOffset: "2px",
  },
});
