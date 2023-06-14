import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState, type ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { EditIcon, TrashIcon } from 'assets/icons';
import FloatingMenu from 'components/common/FloatingMenu';
import Seo from 'components/common/Seo';
import { Layout, Header, HeaderLeft, HeaderRight } from 'components/layouts';
import DiaryCommentsContainer from 'containers/diary/DiaryCommentsContainer';
import DiaryContainer from 'containers/diary/DiaryContainer';

const DiaryDetailPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [showFloatingMenu, setShowFloatingMenu] = useState<boolean>(false);

  return (
    <Section>
      <Header>
        <HeaderLeft type="이전" />
        <HeaderRight
          type="더보기"
          onClick={() => {
            setShowFloatingMenu((state) => !state);
          }}
        />
        {showFloatingMenu && (
          <FloatingMenu
            items={[
              {
                icon: <EditIcon />,
                label: '수정하기',
                onClick: async () => await router.push(`/diary`),
              },
              {
                icon: <TrashIcon />,
                label: '삭제하기',
                onClick: () => {
                  alert('삭제하시겠습니까?');
                },
              },
            ]}
          />
        )}
      </Header>
      <DiaryContainer />
      <DiaryCommentsContainer />
    </Section>
  );
};

DiaryDetailPage.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      <Seo title={'a daily diary'} />
      {page}
    </Layout>
  );
};

export default DiaryDetailPage;

const Section = styled.section`
  margin-top: 54px;
`;
