import styled from '@emotion/styled';

import Image from 'next/image';
import type { NextPage } from 'next';

import type { LoadingAnimationKey } from 'types/common';
import { loadingAnimation } from 'animation';
import { Button } from 'components/common';

const MatchingLoading: NextPage = () => {
  return (
    <Section>
      <h1>랜덤 매칭 중입니다.</h1>
      <ImageWrapper>
        <Circle size={220} opacity={0.2} animationKey="loading3" />
        <Circle size={180} opacity={0.4} animationKey="loading2" />
        <Circle size={140} opacity={1} animationKey="loading1" />
        <Image
          src={'/images/matching/matching.png'}
          alt="매칭 대기 중"
          width={240}
          height={120}
          placeholder="blur"
          blurDataURL={'/images/matching/matching.png'}
        />
      </ImageWrapper>
      <Button type="button" pattern="round" size="xl">
        랜덤매칭 취소
      </Button>
    </Section>
  );
};

export default MatchingLoading;

const Section = styled.section`
  text-align: center;
  h1 {
    ${({ theme }) => theme.fonts.headline_02}
    margin: 100px 0 128px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  margin-bottom: 124px;
`;

const Circle = styled.div<{
  size: number;
  opacity: number;
  animationKey: LoadingAnimationKey;
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: -1;
  transform: translate(-50%, -50%);
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  opacity: ${(props) => props.opacity};
  border: 2px solid #aef4ae;
  border-radius: 100%;
  animation: ${(props) => loadingAnimation[props.animationKey]} 2s ease infinite;
`;
