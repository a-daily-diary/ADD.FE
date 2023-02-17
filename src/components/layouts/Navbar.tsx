import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NAVIGATION_LIST = [
  {
    label: '홈',
    href: '/',
  },
  {
    label: '랜덤매칭',
    href: '/matching',
  },
  {
    label: '일기작성',
    href: '/write',
  },
  {
    label: '프로필',
    href: '/profile',
  },
];

const Navbar = () => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <Navigation>
      <NavigationList>
        {NAVIGATION_LIST.map((navigation) => {
          const { label, href } = navigation;
          const isActive = pathname.match(href) !== null;

          return (
            <li key={`navigation-item-${label}`}>
              <NavigationLink href={href}>
                <EmptyIcon isActive={isActive} />
                <Label isActive={isActive}>{label}</Label>
              </NavigationLink>
            </li>
          );
        })}
      </NavigationList>
    </Navigation>
  );
};

export default Navbar;

const Navigation = styled.nav`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.gray_eee};
`;

const NavigationList = styled.ul`
  display: flex;
  justify-content: space-around;
`;

const NavigationLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px;
  ${({ theme }) => theme.fonts.navigation}
`;

// 아이콘 svg 적용 전, 아이콘 위치 잡기 위해 EmptyIcon 적용
const EmptyIcon = styled.div<{ isActive: boolean }>`
  width: 24px;
  height: 24px;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.main : theme.colors.gray_999};
`;

const Label = styled.span<{ isActive: boolean }>`
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.main : theme.colors.gray_999};
`;
