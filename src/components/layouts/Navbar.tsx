import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import HomeIcon from 'assets/icons/home.svg';
import MachingIcon from 'assets/icons/matching.svg';
import ProfileIcon from 'assets/icons/profile.svg';
import WriteIcon from 'assets/icons/write.svg';

const NAVIGATION_LIST = [
  {
    label: '홈',
    href: '/',
    icon: <HomeIcon />,
  },
  {
    label: '랜덤매칭',
    href: '/matching',
    icon: <MachingIcon />,
  },
  {
    label: '일기작성',
    href: '/diary',
    icon: <WriteIcon />,
  },
  {
    label: '프로필',
    href: '/profile',
    icon: <ProfileIcon />,
  },
];

const Navbar = () => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <Navigation>
      <NavigationList>
        {NAVIGATION_LIST.map((navigation) => {
          const { label, href, icon } = navigation;
          const isActive = pathname === href;

          return (
            <li key={`navigation-item-${label}`}>
              <NavigationLink href={href}>
                <IconBox isActive={isActive}>{icon}</IconBox>
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
  border-top: 1px solid ${({ theme }) => theme.colors.gray_06};
  background-color: ${({ theme }) => theme.colors.white};
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

const IconBox = styled.div<{ isActive: boolean }>`
  line-height: 0;
  & svg {
    fill: ${({ theme, isActive }) =>
      isActive ? theme.colors.primary_00 : theme.colors.gray_05};
  }
`;

const Label = styled.span<{ isActive: boolean }>`
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary_00 : theme.colors.gray_02};
`;
