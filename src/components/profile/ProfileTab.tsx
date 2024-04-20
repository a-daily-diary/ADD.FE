import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface ProfileTabProps {
  tabList: Array<{ id: string; title: string }>;
}

export const ProfileTab = ({ tabList }: ProfileTabProps) => {
  const { pathname } = useRouter();

  return (
    <Tab>
      {tabList.map((tab) => {
        const { id, title } = tab;
        return (
          <li key={`tab-list-${id}`}>
            <TabLink href={id} active={id === pathname}>
              {title}
            </TabLink>
          </li>
        );
      })}
    </Tab>
  );
};

const Tab = styled.ul`
  display: flex;
  padding: 14px 14px 0;
`;

const TabLink = styled(Link)<{ active: boolean }>`
  display: block;
  padding: 10px 1px 8px;
  margin: 0 14px;
  ${({ theme }) => theme.fonts.headline_04};
  border-bottom: 2px solid
    ${({ theme, active }) => (active ? theme.colors.primary_00 : 'transparent')};
`;
