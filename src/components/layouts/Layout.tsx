import type { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import type { ReactNode } from 'react';
interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps): ReactJSXElement => {
  return <main>{children}</main>;
};

export default Layout;
