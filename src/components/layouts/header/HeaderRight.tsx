import styled from '@emotion/styled';
import Link from 'next/link';
import type { RightProps } from 'types/header';
import MoreIcon from 'assets/icons/more.svg';
import SearchIcon from 'assets/icons/search.svg';

interface HeaderRightProps {
  right: RightProps | undefined;
  onClick?: () => void;
}

const HeaderRight = ({ right, onClick }: HeaderRightProps) => {
  return (
    <HeaderRightLayout>
      {right === '더보기' ? (
        <button onClick={onClick}>
          <MoreIcon />
        </button>
      ) : right === '검색' ? (
        <Link href="/search">
          <SearchIcon />
        </Link>
      ) : right === '등록' ? (
        <TextButton onClick={onClick}>등록</TextButton>
      ) : null}
    </HeaderRightLayout>
  );
};

const HeaderRightLayout = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const TextButton = styled.button`
  color: ${({ theme }) => theme.colors.gray_ccc};
  ${({ theme }) => theme.fonts.header_button}
`;

export default HeaderRight;
