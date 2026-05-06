import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const container = style({
  display: "flex",
  gap: vars.space.lg,
  padding: vars.space.lg,
  maxWidth: "1200px",
  margin: "0 auto",
  height: "calc(100vh - 80px)",
});

export const rightPanel = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
  flex: 1,
  height: "100%",
  overflow: "hidden",
  alignItems: "center",
});

export const controlsRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});

export const buttonGroup = style({
  display: "flex",
  gap: vars.space.sm,
});
