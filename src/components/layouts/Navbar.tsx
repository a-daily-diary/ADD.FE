import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  HomeIcon,
  MatchingIcon,
  ProfileIcon,
  WriteDiaryIcon,
} from 'assets/icons';
import { PAGE_PATH } from 'constants/common';
import { Z_INDEX } from 'constants/styles';

const NAVIGATION_LIST = [
  {
    label: '홈',
    href: PAGE_PATH().main,
    icon: <HomeIcon />,
  },
  {
    label: '랜덤매칭',
    href: PAGE_PATH().matching.index,
    icon: <MatchingIcon />,
  },
  {
    label: '일기작성',
    href: PAGE_PATH().diary.index,
    icon: <WriteDiaryIcon width={24} height={24} />,
  },
  {
    label: '프로필',
    href: PAGE_PATH().profile.index,
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
  z-index: ${Z_INDEX.navigation};
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
