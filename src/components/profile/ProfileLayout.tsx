import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { type PropsWithChildren } from 'react';
import { ProfileContainer } from './ProfileContainer';
import { ProfileTab } from './ProfileTab';
import { SearchIcon } from 'assets/icons';
import { Seo } from 'components/common';
import { SearchHeader2 } from 'components/search/SearchHeader2';
import { PAGE_QUERY_PARAM } from 'constants/common';
import { theme } from 'styles';
import { convertPathname, getQueryParams } from 'utils';

interface ProfileLayoutProps extends PropsWithChildren {
  isMyProfile: boolean;
  username: string;
  searchable?: boolean;
}

export const ProfileLayout = ({
  children,
  isMyProfile,
  username,
  searchable,
}: ProfileLayoutProps) => {
  const router = useRouter();

  const searchMode = Object.keys(router.query).includes(
    PAGE_QUERY_PARAM.search,
  );
  const pathname = convertPathname(router.pathname, router.query);

  return (
    <>
      <Seo
        title={`${isMyProfile ? '' : `${username} `}프로필 | a daily diary`}
      />
      <ProfileContainer username={username} isMyProfile={isMyProfile} />

      {searchMode ? (
        <SearchHeader2
          from={pathname}
          to={(search) => `${pathname}?${PAGE_QUERY_PARAM.search}=${search}`}
          initialValue={getQueryParams(router.query.search)[0]}
        />
      ) : (
        <FlexLayout>
          <ProfileTab username={isMyProfile ? undefined : username} />
          {searchable === true && (
            <button
              type="button"
              onClick={() => {
                void router.push(`${pathname}?${PAGE_QUERY_PARAM.search}=`);
              }}
            >
              <SearchIcon
                width={24}
                height={24}
                stroke={theme.colors.gray_00}
              />
            </button>
          )}
        </FlexLayout>
      )}

      {children}
    </>
  );
};

const FlexLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px 0;
`;
