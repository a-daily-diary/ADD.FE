import styled from '@emotion/styled';
import { type PropsWithChildren } from 'react';
import { ProfileContainer } from './ProfileContainer';
import { ProfileTab } from './ProfileTab';
import { SearchIcon } from 'assets/icons';
import { Seo } from 'components/common';
import { ProfileDiarySearchHeader } from 'components/profile/ProfileDiarySearchHeader';
import { useSearchKeyword } from 'hooks/common/useSearchKeyword';
import { theme } from 'styles';

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
  const { isSearchMode, onChange } = useSearchKeyword();

  const navigateToSearchMode = () => {
    onChange('');
  };

  return (
    <>
      <Seo
        title={`${isMyProfile ? '' : `${username} `}프로필 | a daily diary`}
      />
      <ProfileContainer username={username} isMyProfile={isMyProfile} />

      {isSearchMode ? (
        <ProfileDiarySearchHeader />
      ) : (
        <FlexLayout>
          <ProfileTab username={isMyProfile ? undefined : username} />
          {searchable === true && (
            <button type="button" onClick={navigateToSearchMode}>
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
