import styled from '@emotion/styled';
import Link from 'next/link';
import { ArrowRightThinIcon } from 'assets/icons';
import { PAGE_PATH } from 'constants/common';

const SETTING_MENUS = [
  {
    title: '다크모드',
    /**
     * @TODO 토글 컴포넌트로 변경
     */
    action: <></>,
  },
  {
    title: '비밀번호 재설정',
    action: (
      <Link href={PAGE_PATH.account.resetPassword}>
        <ArrowRightThinIcon />
      </Link>
    ),
  },
  /**
   * @TODO 문의게시판, 로그아웃 링크 연결
   */
  {
    title: '문의게시판',
    action: (
      <Link href="/">
        <ArrowRightThinIcon />
      </Link>
    ),
  },
  {
    title: '로그아웃',
    action: (
      <Link href="/">
        <ArrowRightThinIcon />
      </Link>
    ),
  },
];

export const SettingMenus = () => {
  return (
    <List>
      {SETTING_MENUS.map((menu) => (
        <ListItem key={menu.title}>
          <Title>{menu.title}</Title>
          {menu.action}
        </ListItem>
      ))}
    </List>
  );
};

const List = styled.ul`
  margin-top: 12px;
`;

const ListItem = styled.li`
  width: 100%;
  min-height: 56px;
  padding: 0 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.span`
  ${({ theme }) => theme.fonts.body_05};
`;
