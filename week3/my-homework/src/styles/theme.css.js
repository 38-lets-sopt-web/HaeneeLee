import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  color: {
    // 배경
    bg: '#f0f9ff',
    surface: '#ffffff',
    boardBg: '#e0f2fe',

    // 구멍
    hole: '#bae6fd',
    holeActive: '#7dd3fc',

    // 브랜드
    primary: '#0ea5e9',
    primaryLight: '#e0f2fe',

    // 버튼
    btnStart: '#4ade80',
    btnStartHover: '#22c55e',
    btnStop: '#f87171',
    btnStopHover: '#ef4444',
    btnTab: '#e0f2fe',
    btnTabActive: '#0ea5e9',

    // 텍스트
    text: '#0f172a',
    textMuted: '#64748b',
    textSuccess: '#16a34a',
    textDanger: '#dc2626',
    textWhite: '#ffffff',

    // 테두리
    border: '#e2e8f0',
  },

  space: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },

  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    full: '9999px',
  },

  font: {
    size: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '20px',
      xl: '28px',
      xxl: '40px',
    },
    weight: {
      regular: '400',
      medium: '500',
      bold: '700',
    },
  },

  shadow: {
    sm: '0 1px 3px rgba(0,0,0,0.08)',
    md: '0 4px 12px rgba(0,0,0,0.10)',
    lg: '0 8px 24px rgba(0,0,0,0.12)',
  },
});