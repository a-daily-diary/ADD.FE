import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import BackIcon from 'assets/icons/back.svg';
import CloseIcon from 'assets/icons/close.svg';
import LogoIcon from 'assets/icons/logo.svg';
import { SVGVerticalAlignStyle } from 'styles/SVGVerticalAlignStyle';

interface HeaderLeftProps {
  type: '로고' | '이전' | '닫기';
  onClick?: () => void;
}

export const HeaderLeft = ({ type, onClick }: HeaderLeftProps) => {
  const router = useRouter();

  return (
    <>
      {type === '로고' && (
        <Button
          type="button"
          onClick={() => {
            router.reload();
          }}
        >
          <LogoIcon />
        </Button>
      )}
      {type === '이전' && (
        <Button
          type="button"
          onClick={() => {
            router.back();
          }}
        >
          <BackIcon />
        </Button>
      )}
      {type === '닫기' && (
        <Button type="button" onClick={onClick}>
          <CloseIcon />
        </Button>
      )}
    </>
  );
};

const Button = styled.button`
  ${SVGVerticalAlignStyle}
`;
