import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import Navbar from './Navbar';
import type { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import type { ReactNode } from 'react';

interface LayoutProps {
  children?: ReactNode;
}

const SHOW_NAVBAR_PAGES = ['/', '/profile'];

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
