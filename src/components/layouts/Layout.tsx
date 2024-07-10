import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import Navbar from './Navbar';
import type { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import type { ReactNode } from 'react';
import { PAGE_PATH } from 'constants/common';

interface LayoutProps {
  children?: ReactNode;
}

const SHOW_NAVBAR_PAGES = [
  PAGE_PATH.main,
  PAGE_PATH.profile.index,
  PAGE_PATH.profile.diaries,
  PAGE_PATH.profile.bookmarks,
  '/profile/[username]',
  '/profile/[username]/diaries',
];

const Layout = ({ children }: LayoutProps): ReactJSXElement => {
  const { pathname } = useRouter();
  const showNavbar = SHOW_NAVBAR_PAGES.includes(pathname);

  return (
    <Main showNavbar={showNavbar}>
      {children}
      {showNavbar && <Navbar />}
    </Main>
  );
};

export default Layout;

const Main = styled.main<{ showNavbar: boolean }>`
  ${({ showNavbar }) => showNavbar && 'margin-bottom: 63px;'};
`;
