import type { NextPage } from 'next/types';
import { Seo } from 'components/common';
import { Header, HeaderLeft, HeaderTitle } from 'components/layouts';

const SettingPage: NextPage = () => {
  return (
    <>
      <Seo title={'설정 | a daily diary'} />
      <Header
        left={<HeaderLeft type="이전" />}
        title={<HeaderTitle title="설정" position="center" />}
      />
    </>
  );
};

export default SettingPage;
