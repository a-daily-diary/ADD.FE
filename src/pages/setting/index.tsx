import styled from '@emotion/styled';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import type { NextPage } from 'next';
import { ToggleOffIcon, ArrowRightIcon } from 'assets/icons';
import { Seo } from 'components/common';
import { Header, HeaderLeft, HeaderTitle } from 'components/layouts';

const SettingPage: NextPage = () => {
  const handleLogout = () => {
    void signOut();
  };

  const settingsItems = [
    {
      id: 'dark-mode',
      label: '다크모드',
      // FIXME: 임의로 이미지를 넣어두었습니다. 다크모드 개발 시 구현
      icon: <ToggleOffIcon />,
      disabled: true,
    },
    {
      id: 'reset-password',
      label: '비밀번호 재설정',
      icon: <ArrowRightIcon />,
      disabled: true,
    },
    {
      id: 'logout',
      label: '로그아웃',
      icon: <ArrowRightIcon />,
      disabled: false,
      onClick: handleLogout,
    },
  ];

  return (
    <>
      <Seo title={'Settings | a daily diary'} />
      <Header
        left={<HeaderLeft type="이전" />}
        title={<HeaderTitle title="설정" position="center" />}
      />
      <Section>
        <List>
          {settingsItems.map((item) => {
            return (
              <li key={item.id}>
                <ItemButton
                  type="button"
                  disabled={item.disabled}
                  onClick={item.onClick}
                >
                  {item.label}
                  {item.icon}
                </ItemButton>
              </li>
            );
          })}
        </List>
        {/* TODO: 회원탈퇴 API 연동 로직 추가 필요 */}
        <TextButton type="button">회원탈퇴</TextButton>
      </Section>
      <Footer>
        {/* TODO: 약관 상세 페이지 개발 시 이동 로직 추가 필요 */}
        <TermsOfServiceLink href="#">개인정보 처리방침</TermsOfServiceLink>
        <DivisionLine />
        {/* TODO: 약관 상세 페이지 개발 시 이동 로직 추가 필요 */}
        <TermsOfServiceLink href="#">이용약관</TermsOfServiceLink>
        <Caption2Regular>
          Copy right 2023. ADD. All rights reserved.
        </Caption2Regular>
        <Caption2Regular>woosang0430@gmail.com</Caption2Regular>
      </Footer>
    </>
  );
};

export default SettingPage;

const Section = styled.section`
  height: calc(100dvh - 138px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 54px 0 84px;
  padding-top: 12px;
`;

const TextButton = styled.button`
  ${({ theme }) => theme.fonts.body_04};
  color: ${({ theme }) => theme.colors.gray_02};
  text-align: left;
  width: fit-content;
  margin-left: 20px;
  margin-bottom: 20px;
  &:hover {
    color: ${({ theme }) => theme.colors.gray_03};
  }
  &:active {
    color: ${({ theme }) => theme.colors.gray_02};
  }
`;

const List = styled.ul`
  li + li {
    margin-top: 4px;
  }
`;

const ItemButton = styled.button`
  ${({ theme }) => theme.fonts.body_05};
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray_06};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.gray_05};
  }
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    &:hover,
    &:active {
      background-color: inherit;
    }
  }
`;

const DivisionLine = styled.i`
  display: inline-block;
  width: 1px;
  height: 8px;
  margin: 0 6px;
  background-color: ${({ theme }) => theme.colors.gray_05};
`;

const TermsOfServiceLink = styled(Link)`
  ${({ theme }) => theme.fonts.button_01};
  color: ${({ theme }) => theme.colors.gray_02};
  &:hover {
    color: ${({ theme }) => theme.colors.gray_03};
  }
  &:active {
    color: ${({ theme }) => theme.colors.gray_02};
  }
`;

const Caption2Regular = styled.p`
  ${({ theme }) => theme.fonts.caption_02};
  color: ${({ theme }) => theme.colors.gray_03};
  margin-top: 6px;
`;

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 16px 20px;
  background-color: ${({ theme }) => theme.colors.bg_02};
`;
