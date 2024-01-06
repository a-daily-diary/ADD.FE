import Image from 'next/image';

import React from 'react';
import type { NextPage } from 'next';

import { MicrophoneOffIcon, EndCallIcon } from 'assets/icons';
import { Seo } from 'components/common';

const MatchingPlaying: NextPage = () => {
  return (
    <>
      <Seo title="랜덤 매칭 | a daily diary" />
      <section>
        <h1>랜덤 매칭</h1>
        <article className="top-area">
          <h2>사용자 프로필</h2>
          <Image
            src="http://add.bucket.s3.amazonaws.com/default/dd_blue.PNG"
            alt="프로필 사진"
            width={80}
            height={80}
            placeholder="blur"
            blurDataURL="http://add.bucket.s3.amazonaws.com/default/dd_blue.PNG"
          />
          <strong>username</strong>
          <span>timer</span>
        </article>
        <article className="middle-area">
          <h2>추천 대화</h2>
          <div className="card">
            <p>추천하는 대화 주제</p>
            <strong>Hobby</strong>
            <span>취미</span>
            <div />
            <p>What is your hobby</p>
            <p>취미가 무엇인가요?</p>
          </div>
          <button type="button">다음 질문</button>
        </article>
        <article className="bottom-area">
          <h2>통화 제어</h2>
          <button type="button">
            <MicrophoneOffIcon />
            <span>마이크 off</span>
          </button>
          <button type="button">
            <EndCallIcon />
            <span>통화 종료</span>
          </button>
        </article>
      </section>
    </>
  );
};

export default MatchingPlaying;
