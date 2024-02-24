import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { LoadingIcon } from 'assets/icons';
import { Z_INDEX } from 'constants/styles';
import { RotationAnimationStyle, SVGVerticalAlignStyle } from 'styles';

export const FullPageLoading = () => {
  return (
    <FullPageContainer>
      <IconContainer>
        <LoadingIcon width={136} height={136} />
      </IconContainer>
    </FullPageContainer>
  );
};

export const Loading = () => {
  return (
    <Container>
      <IconContainer>
        <LoadingIcon width={32} height={32} />
      </IconContainer>
    </Container>
  );
};

const ContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FullPageContainer = styled.div`
  ${ContainerStyle}

  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${Z_INDEX.modal};
  background-color: ${({ theme }) => theme.colors.black_overlay_06};
`;

const Container = styled.div`
  ${ContainerStyle}

  padding: 20px 0;
  background-color: ${({ theme }) => theme.colors.white};
`;

const IconContainer = styled.div`
  ${SVGVerticalAlignStyle}
  ${RotationAnimationStyle}

  width: fit-content;
  height: fit-content;
`;
