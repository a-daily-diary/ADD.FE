import { ProfileContainer } from './ProfileContainer';
import { ProfileTab } from './ProfileTab';
import type { PropsWithChildren } from 'react';
import { Seo } from 'components/common';

interface ProfileLayoutProps extends PropsWithChildren {
  isMyProfile: boolean;
  username: string;
}

export const ProfileLayout = ({
  children,
  isMyProfile,
  username,
}: ProfileLayoutProps) => {
  return (
    <>
      <Seo
        title={`${isMyProfile ? '' : `${username} `}프로필 | a daily diary`}
      />
      <ProfileContainer username={username} isMyProfile={isMyProfile} />

      <ProfileTab username={isMyProfile ? undefined : username} />
      {children}
    </>
  );
};
