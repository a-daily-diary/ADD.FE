import Navbar from './Navbar';
import type { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import type { ReactNode } from 'react';
import Header from 'components/layouts/header/Header';
interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps): ReactJSXElement => {
  return (
    <>
      <Header left="로고" right="검색" />
      <main>{children}</main>
      <Navbar />
    </>
  );
};

export default Layout;
