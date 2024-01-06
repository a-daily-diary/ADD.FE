import styled from '@emotion/styled';
import Image from 'next/image';
import React from 'react';

import type { NextPage } from 'next';

import { ScreenReaderOnly } from 'styles';

const MatchingUserInfo: NextPage = () => {
  return (
    <MatchingUserInfoWrapper className="top-area">
      <SubTitle>사용자 프로필</SubTitle>
      <Image
        src="http://add.bucket.s3.amazonaws.com/default/dd_blue.PNG"
        alt="프로필 사진"
        width={80}
        height={80}
        placeholder="blur"
        blurDataURL="http://add.bucket.s3.amazonaws.com/default/dd_blue.PNG"
      />
      <strong>username</strong>
      <span>04:23</span>
    </MatchingUserInfoWrapper>
  );
};

export default MatchingUserInfo;

const SubTitle = styled.h2`
  ${ScreenReaderOnly}
`;

const MatchingUserInfoWrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 48px;
  strong {
    ${({ theme }) => theme.fonts.headline_02}
    margin-top: 4px;
  }
  span {
    ${({ theme }) => theme.fonts.body_05}
    margin-top: 6px;
  }
`;
