import styled from '@emotion/styled';
import Image from 'next/image';
import BookmarkIcon from 'assets/icons/bookmark.svg';
import OnBookmarkIcon from 'assets/icons/bookmark_on.svg';
import CommentIcon from 'assets/icons/comment.svg';
import HeartIcon from 'assets/icons/heart.svg';
import OnHeartIcon from 'assets/icons/heart_on.svg';
import ResponsiveImage from 'components/common/ResponsiveImage';
import { dateFormat, timeFormat } from 'utils/Formatter';

interface DiaryDetailProps {
  id: number;
  title: string;
  content: string;
  imgUrl: string | null;
  commentCount: number;
  favoriteCount: number;
  isFavorite: boolean;
  isBookmark: boolean;
  createdAt: string;
  modifiedAt: string;
  authorUsername: string;
  authorThumbnailUrl: string;
}

const DiaryDetail = ({
  title,
  content,
  imgUrl,
  commentCount,
  favoriteCount,
  isFavorite,
  isBookmark,
  createdAt,
  authorUsername,
  authorThumbnailUrl,
}: DiaryDetailProps) => {
  return (
    <Container>
      <ContentContainer>
        <AuthorContainer>
          {authorThumbnailUrl !== null && (
            // TODO
            // 1. 유저 프로필 이미지 클릭 시 해당 프로필로 이동
            // 2. 프로필 이미지 컴포넌트 분리
            <AuthorImageContainer>
              <Image
                src={authorThumbnailUrl}
                alt={authorUsername}
                width={28}
                height={28}
              />
            </AuthorImageContainer>
          )}
          <UsernameText>{authorUsername.slice(0, 20)}</UsernameText>
          <CreatedAtText>{dateFormat(createdAt)}</CreatedAtText>
        </AuthorContainer>
        <Title>{title}</Title>
        {imgUrl !== null && (
          <ImageContainer>
            <ResponsiveImage
              src={imgUrl}
              alt={title}
              width={320}
              height={160}
              aspectRatio={'auto'}
            />
          </ImageContainer>
        )}
        <Content>{content}</Content>
        {timeFormat(createdAt) !== null && (
          <TimeContainer>{timeFormat(createdAt)}</TimeContainer>
        )}
      </ContentContainer>
      <IconContainer>
        <IconInnerContainer>
          <IconButton type="button">
            {isFavorite ? <OnHeartIcon /> : <HeartIcon />}
            {favoriteCount}
          </IconButton>
          <IconButton type="button">
            <CommentIcon />
            {commentCount}
          </IconButton>
        </IconInnerContainer>
        <button type="button">
          {isBookmark ? <OnBookmarkIcon /> : <BookmarkIcon />}
        </button>
      </IconContainer>
    </Container>
  );
};

export default DiaryDetail;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
`;

const ContentContainer = styled.div`
  padding: 18px 20px 20px;
`;

const AuthorContainer = styled.div`
  display: grid;
  grid-template-columns: 28px auto auto;
  gap: 8px;
  align-items: center;
  margin-bottom: 24px;
`;

const AuthorImageContainer = styled.div`
  overflow: hidden;
  border-radius: 50%;
  width: 28px;
  aspect-ratio: 1;
`;

const UsernameText = styled.span`
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.body_05};
`;

const CreatedAtText = styled.span`
  color: ${({ theme }) => theme.colors.gray_999};
  ${({ theme }) => theme.fonts.body_08};
  text-align: right;
`;

const Title = styled.h3`
  ${({ theme }) => theme.fonts.headline_03}
`;

const ImageContainer = styled.div`
  margin: 12px 0 10px;
`;

const Content = styled.p`
  ${({ theme }) => theme.fonts.body_06}
  margin-top: 4px;
`;

const TimeContainer = styled.div`
  margin-top: 12px;
  ${({ theme }) => theme.fonts.caption_02}
  color: ${({ theme }) => theme.colors.gray_999};
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray_eee};
  ${({ theme }) => theme.fonts.caption_01};
`;

const IconInnerContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
`;
