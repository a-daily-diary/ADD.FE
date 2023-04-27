import styled from '@emotion/styled';
import Link from 'next/link';
import { useRef, useState } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import type { ReactElement } from 'react';
import SeetingIcon from 'assets/icons/setting.svg';
import Seo from 'components/common/Seo';
import Tab from 'components/common/Tab';
import Layout from 'components/layouts/Layout';
import Empty from 'components/profile/Empty';
import useTabIndicator from 'hooks/useTabIndicator';

const PROFILE_TAB_LIST = [
  { id: 'activities', title: '활동' },
  { id: 'diaries', title: '일기', content: null },
  { id: 'bookmarks', title: '북마크', content: null },
];

const Profile: NextPageWithLayout = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const indicator = useTabIndicator({ tabsRef, activeIndex });

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
      <section>
        <Tab indicator={indicator}>
          {PROFILE_TAB_LIST.map((tab, index) => {
            const { id, title } = tab;
            return (
              <li key={`tab-list-${id}`}>
                <TabButton
                  type="button"
                  ref={(el) => (tabsRef.current[index] = el)}
                  onClick={() => {
                    setActiveIndex(index);
                  }}
                  active={activeIndex === index}
                >
                  {title}
                </TabButton>
              </li>
            );
          })}
        </Tab>
        <article>
          {PROFILE_TAB_LIST[activeIndex].id === 'diaries' &&
            (PROFILE_TAB_LIST[activeIndex].content !== null ? (
              <div>일기</div>
            ) : (
              <Empty text={'일기가 없습니다.'} />
            ))}
          {PROFILE_TAB_LIST[activeIndex].id === 'bookmarks' &&
            (PROFILE_TAB_LIST[activeIndex].content !== null ? (
              <div>북마크</div>
            ) : (
              <Empty text={'북마크가 없습니다.'} />
            ))}
        </article>
      </section>
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
  border-bottom: 12px solid ${({ theme }) => theme.colors.gray_06};
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
  ${({ theme }) => theme.fonts.headline_01};
`;

const ProfileEditLink = styled(Link)`
  padding: 12px 20px;
  border-radius: 120px;
  background: #f4f4f4;
  ${({ theme }) => theme.fonts.caption_01};
`;

const TabButton = styled.button<{ active: boolean }>`
  ${({ theme }) => theme.fonts.headline_04};
`;
