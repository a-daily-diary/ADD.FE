import styled from '@emotion/styled';
import Link from 'next/link';

import MoreIcon from 'assets/icons/more.svg';
import SearchIcon from 'assets/icons/search.svg';
import { SVGVerticalAlignStyle } from 'styles';

interface HeaderRightStyleProps {
  disabled?: boolean;
}

interface HeaderRightProps extends HeaderRightStyleProps {
  type: '더보기' | '검색' | '등록';
  onClick?: () => void;
}

export const HeaderRight = ({ type, onClick, disabled }: HeaderRightProps) => {
  return (
    <>
      {type === '더보기' && (
        <MoreButton type="button" onClick={onClick}>
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
