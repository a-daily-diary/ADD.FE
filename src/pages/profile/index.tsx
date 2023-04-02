import styled from '@emotion/styled';
import Link from 'next/link';
import type { NextPageWithLayout } from 'pages/_app';
import type { ReactElement } from 'react';
import SeetingIcon from 'assets/icons/setting.svg';
import Seo from 'components/common/Seo';
import Layout from 'components/layouts/Layout';

const Profile: NextPageWithLayout = () => {
  return (
    <>
      <UserInfoContainer>
        <SettingLink href={'/setting'}>
          <SeetingIcon />
        </SettingLink>
        <UserProfileImage />
        <UserName>userid1234</UserName>
        <ProfileEditLink href={'/profile/edit'}>프로필 수정</ProfileEditLink>
      </UserInfoContainer>
    </>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Seo title="프로필 | a daily diary" />
      {page}
    </Layout>
  );
};

export default Profile;

const UserInfoContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 32px 20px;
  border-bottom: 12px solid ${({ theme }) => theme.colors.gray_eee};
  background-color: ${({ theme }) => theme.colors.white};
`;

const SettingLink = styled(Link)`
  position: absolute;
  top: 32px;
  right: 20px;
`;

const UserProfileImage = styled.div`
  width: 92px;
  height: 92px;
  border-radius: 50%;
  background-color: #d9d9d9;
`;

const UserName = styled.h2`
  margin: 8px 0 6px;
  font-weight: 700;
  font-size: 24px;
  letter-spacing: -0.02em;
  line-height: 1.4;
`;

const ProfileEditLink = styled(Link)`
  padding: 12px 20px;
  border-radius: 120px;
  background: #f4f4f4;
  font-weight: 500;
  font-size: 12px;
  line-height: 1;
  letter-spacing: -0.02em;
`;
