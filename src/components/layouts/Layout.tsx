import Navbar from './Navbar';
import type { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import type { ReactNode } from 'react';
interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps): ReactJSXElement => {
  return (
    <>
      <main>{children}</main>
      <Navbar />
    </>
  );
};

export default Layout;
