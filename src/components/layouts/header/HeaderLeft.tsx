import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BackIcon, CloseIcon } from 'assets/icons';
import { SVGVerticalAlignStyle } from 'styles';

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
          <Image
            src="/images/logo/logo_x2.png"
            alt="a daily diary"
            width={90}
            height={24}
            priority
          />
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
