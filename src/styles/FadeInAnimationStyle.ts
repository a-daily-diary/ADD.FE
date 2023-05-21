import { css, keyframes } from '@emotion/react';

const FadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const FadeInAnimationStyle = css`
  animation: ${FadeInAnimation} 0.2s ease;
  opacity: 1;
`;

export default FadeInAnimationStyle;
