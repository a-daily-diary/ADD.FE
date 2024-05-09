import styled from '@emotion/styled';
import Image from 'next/image';

import { useRouter } from 'next/router';
import { DEFAULT_PROFILE_IMAGES } from 'constants/profile';
import { useTimer } from 'hooks/common/useTimer';
import { useProfile } from 'hooks/services';
import { ScreenReaderOnly } from 'styles';

const MatchingUserInfo = () => {
  const { minutes, seconds } = useTimer();

  const router = useRouter();

  const { query } = router;

  const { profileData: matchingUserProfile } = useProfile(
    query.mu as string, // matching username
  );

  return (
    <Container>
      <SubTitle>사용자 프로필</SubTitle>
      {/* FIXME: useProfile의 isLoading으로 스켈레톤 UI로 대체 논의 */}
      <Image
        src={matchingUserProfile?.imgUrl ?? DEFAULT_PROFILE_IMAGES[0].url}
        alt="프로필 사진"
        width={80}
        height={80}
        placeholder="blur"
        blurDataURL={DEFAULT_PROFILE_IMAGES[0].url}
      />
      <strong>{matchingUserProfile?.username}</strong>
      <span>
        {minutes}:{seconds}
      </span>
    </Container>
  );
};

export default MatchingUserInfo;

const SubTitle = styled.h2`
  ${ScreenReaderOnly}
`;

const Container = styled.article`
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
