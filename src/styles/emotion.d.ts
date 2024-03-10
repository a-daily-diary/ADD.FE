import '@emotion/react';
import type theme from './theme';
import type { SerializedStyles } from '@emotion/react';

type ThemeType = typeof theme;

declare module '@emotion/react' {
  export interface Theme extends ThemeType {
    colors: {
      primary_00: string;
      primary_01: string;
      primary_02: string;
      primary_03: string;
      primary_04: string;
      gray_00: string;
      gray_01: string;
      gray_02: string;
      gray_03: string;
      gray_04: string;
      gray_05: string;
      gray_06: string;
      bg_01: string;
      bg_02: string;
      black_overlay_06: string;
      white: string;
      black: string;
      error: string;
      pink: string;
      red: string;
    };
    fonts: {
      headline_01: SerializedStyles;
      headline_02: SerializedStyles;
      headline_03: SerializedStyles;
      headline_04: SerializedStyles;
      headline_05: SerializedStyles;
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
      caption_03: SerializedStyles;
      navigation: SerializedStyles;
      button_01: SerializedStyles;
      button_02: SerializedStyles;
      button_03: SerializedStyles;
    };
  }
}
