import styled from '@emotion/styled';
import Link from 'next/link';
import type { ForwardedRef } from 'react';
import { MoreIcon, SearchIcon } from 'assets/icons';
import { SVGVerticalAlignStyle } from 'styles';

interface HeaderRightStyleProps {
  disabled?: boolean;
}

interface HeaderRightProps extends HeaderRightStyleProps {
  type: '더보기' | '검색' | '등록';
  buttonRef?: ForwardedRef<HTMLButtonElement>;
  onClick?: () => void;
}

export const HeaderRight = ({
  type,
  buttonRef,
  onClick,
  disabled,
}: HeaderRightProps) => {
  return (
    <>
      {type === '더보기' && (
        <MoreButton type="button" onClick={onClick} ref={buttonRef}>
          <StyledMoreIcon />
        </MoreButton>
      )}
      {type === '검색' && (
        <SearchLink href="/search">
          <SearchIcon />
        </SearchLink>
      )}
      {type === '등록' && (
        <TextButton type="submit" onClick={onClick} disabled={disabled}>
          등록
        </TextButton>
      )}
    </>
  );
};

const MoreButton = styled.button`
  ${SVGVerticalAlignStyle}
`;

const StyledMoreIcon = styled(MoreIcon)`
  width: 24px;
  height: 24px;
`;

const SearchLink = styled(Link)`
  ${SVGVerticalAlignStyle}
`;

const TextButton = styled.button<HeaderRightStyleProps>`
  color: ${({ theme, disabled }) =>
    disabled !== undefined && disabled
      ? theme.colors.gray_04
      : theme.colors.primary_00};
  ${({ theme }) => theme.fonts.body_05}
`;
