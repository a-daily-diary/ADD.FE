import styled from '@emotion/styled';
import Image from 'next/image';

import { useTimer } from 'hooks/common/useTimer';
import { ScreenReaderOnly } from 'styles';

interface MatchingUserInfoProps {
  username: string;
  thumbnailUrl: string;
}

const MatchingUserInfo = ({
  username,
  thumbnailUrl,
}: MatchingUserInfoProps) => {
  const { minutes, seconds } = useTimer();

  return (
    <Container>
      <SubTitle>사용자 프로필</SubTitle>
      <Image
        src={thumbnailUrl}
        alt="프로필 사진"
        width={80}
        height={80}
        placeholder="blur"
        blurDataURL={thumbnailUrl}
      />
      <strong>{username}</strong>
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
