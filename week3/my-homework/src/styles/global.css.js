import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./theme.css";

// body 기본 스타일
globalStyle("body", {
  backgroundColor: vars.color.bg,
  color: vars.color.text,
  fontFamily: "'Pretendard', 'Noto Sans KR', sans-serif",
  minHeight: "100dvh",
});

// 버튼 기본 초기화
globalStyle("button", {
  border: "none",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

// ul, ol 리스트 초기화
globalStyle("ul, ol", {
  listStyle: "none",
  padding: 0,
});

// a 태그 초기화
globalStyle("a", {
  textDecoration: "none",
  color: "inherit",
});
