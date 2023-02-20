import '@emotion/react';
import type theme from './theme';
import type { SerializedStyles } from '@emotion/react';

type ThemeType = typeof theme;

declare module '@emotion/react' {
  export interface Theme extends ThemeType {
    colors: {
      white: string;
      gray_eee: string;
      gray_ddd: string;
      gray_ccc: string;
      gray_bbb: string;
      gray_999: string;
      gray_666: string;
      black: string;
      bg_f5fdf7: string;
      bg_fafafa: string;
      bg_f4f4f4: string;
      main: string;
      error: string;
      pink: string;
    };
    fonts: {
      diary_title: SerializedStyles;
      diary_body: SerializedStyles;
      diary_info: SerializedStyles;
      navigation: SerializedStyles;
    };
  }
}
