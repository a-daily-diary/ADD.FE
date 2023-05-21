import { css } from '@emotion/react';

const EllipsisStyle = css`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

export default EllipsisStyle;
