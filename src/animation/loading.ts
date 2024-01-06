import { keyframes } from '@emotion/react';
import type { Keyframes } from '@emotion/react';

import type { LoadingAnimationKey } from 'types/common';

export const loadingAnimation: Record<LoadingAnimationKey, Keyframes> = {
  loading1: keyframes`
  0% { display: none; }
  20% { display: block; }
  40% { display: block; }
  60% { display: block; }
  80% { display: none; }
  100% { display: none; }
`,
  loading2: keyframes`
  0% { display: none; }
  20% { display: none; }
  40% { display: block; }
  60% { display: block; }
  80% { display: none; }
  100% { display: none; }
`,
  loading3: keyframes`
  0% { display: none; }
  20% { display: none; }
  40% { display: none; }
  60% { display: block; }
  80% { display: none; }
  100% { display: none; }
`,
};
