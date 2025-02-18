import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MY_PROFILE_TAB_LIST, YOUR_PROFILE_TAB_LIST } from 'constants/profile';

interface ProfileTabProps {
  username?: string;
}

export const ProfileTab = ({ username }: ProfileTabProps) => {
  const { pathname } = useRouter();

  const isMyProfile = username === undefined;
  const tabList = isMyProfile
    ? MY_PROFILE_TAB_LIST
    : YOUR_PROFILE_TAB_LIST(username);
  const convertPathname = isMyProfile
    ? pathname
    : pathname.replace('[username]', username);

  return (
    <TabList>
      {tabList.map((tab) => {
        const { id, title } = tab;
        return (
          <Tab key={`tab-list-${id}`} active={id === convertPathname}>
            <Link href={id}>{title}</Link>
          </Tab>
        );
      })}
    </TabList>
  );
};

const TabList = styled.ul`
  display: flex;
`;

const Tab = styled.li<{ active: boolean }>`
  padding: 10px 1px 8px;
  margin: 0 14px;
  ${({ theme }) => theme.fonts.headline_04};
  border-bottom: 2px solid
    ${({ theme, active }) => (active ? theme.colors.primary_00 : 'transparent')};
`;
