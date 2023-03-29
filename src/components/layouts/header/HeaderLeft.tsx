import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import BackIcon from 'assets/icons/back.svg';
import CloseIcon from 'assets/icons/close.svg';
import LogoIcon from 'assets/icons/logo.svg';

interface HeaderLeftProps {
  menu: '로고' | '이전' | '닫기';
  onClick?: () => void;
}

const HeaderLeft = ({ menu, onClick }: HeaderLeftProps) => {
  const router = useRouter();

  return (
    <HeaderLeftLayout>
      {menu === '로고' && (
        <LeftButton
          onClick={() => {
            router.reload();
          }}
        >
          <LogoIcon />
        </LeftButton>
      )}
      {menu === '이전' && (
        <LeftButton
          onClick={() => {
            router.back();
          }}
        >
          <BackIcon />
        </LeftButton>
      )}
      {menu === '닫기' && (
        <LeftButton onClick={onClick}>
          <CloseIcon />
        </LeftButton>
      )}
    </HeaderLeftLayout>
  );
};

export default HeaderLeft;

const HeaderLeftLayout = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const LeftButton = styled.button`
  display: flex;
`;
