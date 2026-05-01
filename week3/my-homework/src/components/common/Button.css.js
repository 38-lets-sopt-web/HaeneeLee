import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../../styles/theme.css";

export const button = recipe({
  base: {
    borderRadius: vars.radius.full,
    padding: `${vars.space.sm} ${vars.space.md}`,
    fontSize: vars.font.size.sm,
    fontWeight: vars.font.weight.medium,
    cursor: "pointer",
    transition: "background-color 0.15s ease, opacity 0.15s ease",
    border: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",

    ":disabled": {
      opacity: 0.45,
      cursor: "not-allowed",
    },
  },

  variants: {
    variant: {
      primary: {
        backgroundColor: vars.color.btnStart,
        color: vars.color.textWhite,
        ":hover": {
          backgroundColor: vars.color.btnStartHover,
        },
        ":disabled": {
          backgroundColor: vars.color.btnStart,
        },
      },
      danger: {
        backgroundColor: vars.color.btnStop,
        color: vars.color.textWhite,
        ":hover": {
          backgroundColor: vars.color.btnStopHover,
        },
        ":disabled": {
          backgroundColor: vars.color.btnStop,
        },
      },
      tab: {
        backgroundColor: vars.color.btnTab,
        color: vars.color.primary,
        ":hover": {
          backgroundColor: vars.color.primaryLight,
        },
      },
      "tab-active": {
        backgroundColor: vars.color.btnTabActive,
        color: vars.color.textWhite,
      },
    },
  },

  defaultVariants: {
    variant: "primary",
  },
});
