import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import type { LeftProps } from 'types/header';
import BackIcon from 'assets/icons/back.svg';
import CloseIcon from 'assets/icons/close.svg';
import LogoIcon from 'assets/icons/logo.svg';

interface HeaderLeftProps {
  left: LeftProps;
  onClick?: () => void;
}

const HeaderLeft = ({ left, onClick }: HeaderLeftProps) => {
  const router = useRouter();

  return (
    <HeaderLeftLayout>
      {left === '로고' ? (
        <button
          onClick={() => {
            router.reload();
          }}
        >
          <LogoIcon />
        </button>
      ) : left === '이전' ? (
        <button
          onClick={() => {
            router.back();
          }}
        >
          <BackIcon />
        </button>
      ) : left === '닫기' ? (
        <button onClick={onClick}>
          <CloseIcon />
        </button>
      ) : null}
    </HeaderLeftLayout>
  );
};

const HeaderLeftLayout = styled.div`
  display: flex;
  justify-content: flex-start;
  button {
    display: flex;
  }
`;

export default HeaderLeft;
