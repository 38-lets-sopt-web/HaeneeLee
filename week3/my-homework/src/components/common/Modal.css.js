import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const slideUp = keyframes({
  from: { transform: "translateY(20px)", opacity: 0 },
  to: { transform: "translateY(0)", opacity: 1 },
});

export const backdrop = style({
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 100,
  animationName: fadeIn,
  animationDuration: "0.2s",
  animationTimingFunction: "ease-out",
});

export const content = style({
  backgroundColor: vars.color.surface,
  borderRadius: vars.radius.lg,
  padding: vars.space.xl,
  boxShadow: vars.shadow.lg,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space.md,
  minWidth: "280px",
  animationName: slideUp,
  animationDuration: "0.25s",
  animationTimingFunction: "ease-out",
});

export const title = style({
  fontSize: vars.font.size.xl,
  fontWeight: vars.font.weight.bold,
  color: vars.color.text,
});

export const scoreText = style({
  fontSize: vars.font.size.lg,
  color: vars.color.textMuted,
});

export const closeButton = style({
  marginTop: vars.space.sm,
  backgroundColor: vars.color.primary,
  color: vars.color.textWhite,
  border: "none",
  borderRadius: vars.radius.full,
  padding: `${vars.space.sm} ${vars.space.xl}`,
  fontSize: vars.font.size.md,
  fontWeight: vars.font.weight.medium,
  cursor: "pointer",
  ":hover": {
    opacity: 0.85,
  },
});
