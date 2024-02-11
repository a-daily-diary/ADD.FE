import { css, keyframes } from '@emotion/react';

const RotationAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const RotationAnimationStyle = css`
  animation: ${RotationAnimation} 1s linear infinite;
`;

export default RotationAnimationStyle;
