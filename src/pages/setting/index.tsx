import styled from '@emotion/styled';
import type { NextPage } from 'next/types';
import { Seo } from 'components/common';
import { Header, HeaderLeft, HeaderTitle } from 'components/layouts';
import { Footer } from 'components/layouts/footer';
import { SettingMenus } from 'components/setting';

const SettingPage: NextPage = () => {
  return (
    <>
      <Seo title={'설정 | a daily diary'} />
      <Header
        left={<HeaderLeft type="이전" />}
        title={<HeaderTitle title="설정" position="center" />}
      />
      <Section>
        <SettingMenus />
      </Section>
      <Footer />
    </>
  );
};

export default SettingPage;

const Section = styled.section`
  margin-top: 54px;
`;
