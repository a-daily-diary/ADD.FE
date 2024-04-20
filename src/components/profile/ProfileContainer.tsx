import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { NoLinkProfileImage } from './ProfileImage';
import { ArrowRightIcon, SettingIcon } from 'assets/icons';
import { FullPageLoading } from 'components/common';
import { PAGE_PATH } from 'constants/common';
import { useBadges, useProfile } from 'hooks/services';
import { SVGVerticalAlignStyle } from 'styles';

interface ProfileContainerProps {
  username: string;
  isMyProfile?: boolean;
}

export const ProfileContainer = ({
  username,
  isMyProfile = true,
}: ProfileContainerProps) => {
  const { profileData } = useProfile(username);
  const { badgesData } = useBadges({ username, onlyPinned: true });

  if (profileData === undefined || badgesData === undefined)
    return <FullPageLoading />;

  return (
    <Container>
      {isMyProfile && (
        <SettingLink href={PAGE_PATH.setting.index}>
          <SettingIcon />
        </SettingLink>
      )}
      <NoLinkProfileImage
        size="lg"
        src={profileData.imgUrl}
        username={profileData.username}
      />
      <UserName>{username}</UserName>
      <BadgesContainer>
        {badgesData.slice(0, 8).map((badge) => {
          const { id, imgUrl, description } = badge;
          return (
            <Image
              key={id}
              src={imgUrl}
              alt={description}
              width={30}
              height={30}
              priority
            />
          );
        })}
        <BadgeLink href={PAGE_PATH.profile.badges(username)}>
          <ArrowRightIcon />
        </BadgeLink>
      </BadgesContainer>
      {isMyProfile && (
        <EditLink href={PAGE_PATH.profile.edit}>프로필 수정</EditLink>
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
  margin: 6px 0 4px;
  ${({ theme }) => theme.fonts.headline_01};
`;

const BadgesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const BadgeLink = styled(Link)`
  ${SVGVerticalAlignStyle}
`;

const EditLink = styled(Link)`
  margin-top: 16px;
  padding: 12px 20px;
  border-radius: 120px;
  background: ${({ theme }) => theme.colors.bg_02};
  ${({ theme }) => theme.fonts.caption_01};
`;
