import styled from '@emotion/styled';
import Link from 'next/link';
import { NoLinkProfileImage } from './ProfileImage';
import { SettingIcon } from 'assets/icons';
import { FullPageLoading } from 'components/common';
import { PAGE_PATH } from 'constants/common';
import { useProfile } from 'hooks/services';

interface ProfileContainerProps {
  username: string;
  isMyProfile?: boolean;
}

export const ProfileContainer = ({
  username,
  isMyProfile = true,
}: ProfileContainerProps) => {
  const { profileData, isLoading } = useProfile(username);

  if (profileData === undefined || isLoading) return <FullPageLoading />;

  return (
    <Container>
      {isMyProfile && (
        <SettingLink href={PAGE_PATH().setting.index}>
          <SettingIcon />
        </SettingLink>
      )}
      <NoLinkProfileImage
        size="lg"
        src={profileData.imgUrl}
        username={profileData.username}
      />
      <UserName>{username}</UserName>
      {isMyProfile && (
        <EditLink href={PAGE_PATH().profile.edit}>프로필 수정</EditLink>
      )}
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 32px 20px;
  border-bottom: 12px solid ${({ theme }) => theme.colors.gray_06};
  background-color: ${({ theme }) => theme.colors.white};
`;

const SettingLink = styled(Link)`
  position: absolute;
  top: 32px;
  right: 20px;
`;

const UserName = styled.h2`
  margin: 8px 0 6px;
  ${({ theme }) => theme.fonts.headline_01};
`;

const EditLink = styled(Link)`
  padding: 12px 20px;
  border-radius: 120px;
  background: ${({ theme }) => theme.colors.bg_02};
  ${({ theme }) => theme.fonts.caption_01};
`;
