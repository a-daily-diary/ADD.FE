import '@emotion/react';
import type theme from './theme';
import type { SerializedStyles } from '@emotion/react';

type ThemeType = typeof theme;

declare module '@emotion/react' {
  export interface Theme extends ThemeType {
    fonts: {
      diary_title: SerializedStyles;
      diary_body: SerializedStyles;
      diary_info: SerializedStyles;
    };
  }
}
