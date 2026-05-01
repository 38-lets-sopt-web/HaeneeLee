import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

const popUp = keyframes({
  "0%": { transform: "translateY(30%) scale(0.8)", opacity: 0 },
  "60%": { transform: "translateY(-8%) scale(1.05)" },
  "100%": { transform: "translateY(0) scale(1)", opacity: 1 },
});

export const holeWrapper = style({
  aspectRatio: "1 / 1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const hole = style({
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  backgroundColor: vars.color.hole,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color 0.15s ease",
  cursor: "default",
  userSelect: "none",
});

export const holeActive = style({
  backgroundColor: vars.color.holeActive,
  cursor: "pointer",
  animationName: popUp,
  animationDuration: "0.25s",
  animationTimingFunction: "ease-out",
});

export const emoji = style({
  fontSize: "clamp(24px, 5vw, 52px)",
  lineHeight: 1,
  pointerEvents: "none",
});
