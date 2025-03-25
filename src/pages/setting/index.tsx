import styled from '@emotion/styled';
import type { NextPage } from 'next/types';
import { Seo } from 'components/common';
import { Header, HeaderLeft, HeaderTitle } from 'components/layouts';
import { Footer } from 'components/layouts/footer';
import { SettingMenus } from 'components/setting';
import { HEADER_HEIGHT, FOOTER_HEIGHT } from 'constants/styles';

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
        <WithdrawButton>회원탈퇴</WithdrawButton>
      </Section>
      <Footer />
    </>
  );
};

export default SettingPage;

const Section = styled.section`
  padding-top: ${HEADER_HEIGHT};
  padding-bottom: ${FOOTER_HEIGHT};
  height: 100vh;

  position: relative;
`;

const WithdrawButton = styled.button`
  ${({ theme }) => theme.fonts.body_05};
  color: ${({ theme }) => theme.colors.gray_02};
  padding: 20px;

  position: absolute;
  bottom: ${FOOTER_HEIGHT};
`;
