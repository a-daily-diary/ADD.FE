import React from 'react';

import {
  SurveyBadIcon,
  SurveyEngIcon,
  SurveyFunIcon,
  SurveyNiceIcon,
} from 'assets/icons';

import { Button, Seo } from 'components/common';

const MatchingSurvey = () => {
  return (
    <>
      <Seo title="랜덤 매칭 설문 | a daily diary" />
      <section>
        <h1>랜덤 매칭 설문</h1>
        <p>즐거운 통화하셨나요?</p>
        <p>남겨주신 피드백은 상대발에게 전달되지 않습니다.</p>
        <div>
          <button>
            <SurveyNiceIcon />
            친절해요
          </button>
          <button>
            <SurveyEngIcon />
            영어를 잘해요
          </button>
          <button>
            <SurveyFunIcon />
            재밌어요
          </button>
          <button>
            <SurveyBadIcon />
            불쾌해요
          </button>
        </div>
        <p>상대방에대한 피드백을 작성해주세요.</p>
        <p>불쾌해요를 선택하셨다면 이유를 남겨주세요.</p>
        <textarea placeholder="피드백을 남겨주세요." />
        <label>
          <input type="checkbox" />
          <span>이 사람이랑 전화하지 않을래요.</span>
        </label>
        <Button type="button" pattern="box" size="md">
          피드백 작성 완료
        </Button>
      </section>
    </>
  );
};

export default MatchingSurvey;
