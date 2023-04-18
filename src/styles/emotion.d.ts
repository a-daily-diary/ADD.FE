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
      sub: string;
      error: string;
      pink: string;
    };
    fonts: {
      headline_01: SerializedStyles;
      headline_02: SerializedStyles;
      headline_03: SerializedStyles;
      body_01: SerializedStyles;
      body_02: SerializedStyles;
      body_03: SerializedStyles;
      body_04: SerializedStyles;
      body_05: SerializedStyles;
      body_06: SerializedStyles;
      body_07: SerializedStyles;
      body_08: SerializedStyles;
      body_09: SerializedStyles;
      caption_01: SerializedStyles;
      caption_02: SerializedStyles;
      navigation: SerializedStyles;
      button_01: SerializedStyles;
      button_02: SerializedStyles;
      button_03: SerializedStyles;
    };
  }
}
