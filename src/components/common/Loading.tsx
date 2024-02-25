import styled from '@emotion/styled';
import { LoadingIcon } from 'assets/icons';
import { Z_INDEX } from 'constants/styles';
import { RotationAnimationStyle, SVGVerticalAlignStyle } from 'styles';

export const Loading = () => {
  return (
    <Container>
      <IconContainer>
        <LoadingIcon />
      </IconContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${Z_INDEX.modal};
  background-color: ${({ theme }) => theme.colors.black_overlay_06};
`;

const IconContainer = styled.div`
  ${SVGVerticalAlignStyle}
  ${RotationAnimationStyle}

  width: fit-content;
  height: fit-content;
`;
