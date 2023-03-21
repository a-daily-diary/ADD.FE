import { css } from '@emotion/react';
import styled from '@emotion/styled';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';
import type { LeftProps, RightProps } from 'types/header';

export interface HeaderProps {
  left: LeftProps;
  title?: string;
  right?: RightProps;
  onClick?: () => void;
}

const Header = ({ left, title = '', right, onClick }: HeaderProps) => {
  return (
    <HeaderLayout>
      <HeaderLeft left={left} onClick={onClick} />
      <Title title={title}>{title}</Title>
      <HeaderRight right={right} onClick={onClick} />
    </HeaderLayout>
  );
};

const HeaderLayout = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 54px;
  padding: 0 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_eee};
  background: ${({ theme }) => theme.colors.white};
`;

const Title = styled.strong<{ title: string }>`
  ${({ title }) =>
    title === '회원가입' || title === '비밀번호 찾기'
      ? css`
          flex: none;
          padding: 0 0 0 4px;
        `
      : css`
          position: absolute;
          left: 50%;
          margin: 0 auto;
          transform: translate(-50%);
        `};

  ${({ theme }) => theme.fonts.header};
  font-weight: ${({ title }) => /[0-9]/.test(title) && 700};
`;

export default Header;
