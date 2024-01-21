import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { SettingIcon } from 'assets/icons';
import { useProfile } from 'hooks/services';

interface ProfileContainerProps {
  username: string;
}

export const ProfileContainer = ({ username }: ProfileContainerProps) => {
  const { profileData } = useProfile(username);

  if (profileData === undefined) return <div />;

  return (
    <Container>
      <SettingLink href={'/setting'}>
        <SettingIcon />
      </SettingLink>
      <ProfileImage
        src={profileData.imgUrl}
        alt={profileData.username}
        width={92}
        height={92}
        priority
      />
      <UserName>{username}</UserName>
      <EditLink href={'/profile/edit'}>프로필 수정</EditLink>
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

const ProfileImage = styled(Image)`
  border-radius: 50%;
`;

const UserName = styled.h2`
  margin: 8px 0 6px;
  ${({ theme }) => theme.fonts.headline_01};
`;

const EditLink = styled(Link)`
  padding: 12px 20px;
  border-radius: 120px;
  background: #f4f4f4;
  ${({ theme }) => theme.fonts.caption_01};
`;
