import styled from '@emotion/styled';
import Link from 'next/link';
import type { DiaryDetail } from 'types/diary';
import {
  BookmarkOffIcon,
  BookmarkOnIcon,
  CommentIcon,
  HeartOffIcon,
  HeartOnIcon,
} from 'assets/icons';
import { ResponsiveImage } from 'components/common';
import { ProfileImage } from 'components/profile';
import { PAGE_PATH } from 'constants/common';
import { useHandleFavorite, useHandleBookmark } from 'hooks/services/common';
import { dateFormat, timeFormat } from 'utils';

export const DiaryDetailContainer = ({
  id,
  title,
  content,
  imgUrl,
  favoriteCount,
  commentCount,
  createdAt,
  author,
  isBookmark,
  isFavorite,
}: DiaryDetail) => {
  const handleFavorite = useHandleFavorite({ isFavorite, id });
  const handleBookmark = useHandleBookmark({
    isBookmark,
    id,
    username: author.username,
  });

  return (
    <Container>
      <AuthorContainer>
        <ProfileImage
          size="md"
          src={author.imgUrl}
          username={author.username}
        />
        <UsernameLink href={PAGE_PATH(author.username).profile.username}>
          {author.username}
        </UsernameLink>
        <CreatedAtText>{dateFormat(createdAt)}</CreatedAtText>
      </AuthorContainer>
      <ContentContainer>
        <Title>{title}</Title>
        {imgUrl !== null && (
          <ImageContainer>
            <ResponsiveImage src={imgUrl} alt={title} />
          </ImageContainer>
        )}
        <Content>{content}</Content>
        {timeFormat(createdAt) !== null && (
          <TimeContainer>{timeFormat(createdAt)}</TimeContainer>
        )}
      </ContentContainer>
      <IconContainer>
        <IconInnerContainer>
          <IconButton type="button" onClick={handleFavorite}>
            {isFavorite ? <HeartOnIcon /> : <HeartOffIcon />}
            {favoriteCount}
          </IconButton>
          <IconButton type="button">
            <CommentIcon />
            {commentCount}
          </IconButton>
        </IconInnerContainer>
        <button type="button" onClick={handleBookmark}>
          {isBookmark ? <BookmarkOnIcon /> : <BookmarkOffIcon />}
        </button>
      </IconContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
`;

const ContentContainer = styled.div`
  padding: 6px 20px 20px;
`;

const AuthorContainer = styled.div`
  display: grid;
  grid-template-columns: 28px auto auto;
  gap: 8px;
  align-items: center;
  padding: 18px 20px;
`;

const UsernameLink = styled(Link)`
  color: ${({ theme }) => theme.colors.gray_00};
  ${({ theme }) => theme.fonts.body_05};
`;

const CreatedAtText = styled.span`
  color: ${({ theme }) => theme.colors.gray_02};
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
  margin-top: 4px;
  ${({ theme }) => theme.fonts.body_06}
  white-space: pre-wrap;
`;

const TimeContainer = styled.div`
  margin-top: 12px;
  ${({ theme }) => theme.fonts.caption_02}
  color: ${({ theme }) => theme.colors.gray_02};
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray_06};
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
