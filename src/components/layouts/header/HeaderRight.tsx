import styled from '@emotion/styled';
import Link from 'next/link';

import MoreIcon from 'assets/icons/more.svg';
import SearchIcon from 'assets/icons/search.svg';

interface HeaderRightProps {
  menu: '더보기' | '검색' | '등록';
  onClick?: () => void;
}

const HeaderRight = ({ menu, onClick }: HeaderRightProps) => {
  return (
    <HeaderRightLayout>
      {menu === '더보기' && (
        <button onClick={onClick}>
          <StyledMoreIcon />
        </button>
      )}
      {menu === '검색' && (
        <Link href="/search">
          <SearchIcon />
        </Link>
      )}
      {menu === '등록' && <TextButton onClick={onClick}>등록</TextButton>}
    </HeaderRightLayout>
  );
};

export default HeaderRight;

const HeaderRightLayout = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const TextButton = styled.button`
  color: ${({ theme }) => theme.colors.gray_ccc};
  ${({ theme }) => theme.fonts.body_05}
`;

const StyledMoreIcon = styled(MoreIcon)`
  width: 24px;
  height: 24px;
`;
