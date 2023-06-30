import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import type { DiaryDetail } from 'types/Diary';
import {
  BookmarkOffIcon,
  BookmarkOnIcon,
  CommentIcon,
  HeartOnIcon,
  HeartOffIcon,
} from 'assets/icons';
import ResponsiveImage from 'components/common/ResponsiveImage';
import { useHandleFavorite, useHandleBookmark } from 'hooks/common';
import { EllipsisStyle } from 'styles';
import { dateFormat, timeFormat } from 'utils';

const Diary = ({
  id,
  title,
  content,
  imgUrl,
  commentCount,
  favoriteCount,
  isFavorite,
  isBookmark,
  createdAt,
  author,
}: DiaryDetail) => {
  const handleFavorite = useHandleFavorite({ isFavorite, id });
  const handleBookmark = useHandleBookmark({ isBookmark, id });

  return (
    <Container>
      <ContentContainer>
        <Title>{title}</Title>
        <ContentLink href={`/diary/${id}`}>{content}</ContentLink>
        {imgUrl !== null && (
          <ResponsiveImage src={imgUrl} alt={title} aspectRatio={2 / 1} />
        )}
        <DateContainer>
          <span>
            <span>{author.username}</span>
            <span>・</span>
            <span>{dateFormat(createdAt)}</span>
          </span>
          <span>{timeFormat(createdAt)}</span>
        </DateContainer>
      </ContentContainer>
      <IconContainer>
        <IconInnerContainer>
          <FavoriteButton type="button" onClick={handleFavorite}>
            {isFavorite ? <HeartOnIcon /> : <HeartOffIcon />}
            {favoriteCount}
          </FavoriteButton>
          <CommentLink href={`/diary/${id}?focus=comment`} as={`/diary/${id}`}>
            <CommentIcon />
            {commentCount}
          </CommentLink>
        </IconInnerContainer>
        <button type="button" onClick={handleBookmark}>
          {isBookmark ? <BookmarkOnIcon /> : <BookmarkOffIcon />}
        </button>
      </IconContainer>
    </Container>
  );
};

export default Diary;

const Container = styled.li`
  background-color: ${({ theme }) => theme.colors.white};
`;

const ContentContainer = styled.article`
  padding: 20px;
`;

const Title = styled.h2`
  ${({ theme }) => theme.fonts.headline_03}
`;

const ContentLink = styled(Link)`
  ${EllipsisStyle}
  ${({ theme }) => theme.fonts.body_06}
  margin: 4px 0 6px;
  white-space: pre-wrap;
  cursor: default;
`;

const DateContainer = styled.div`
  display: flex;
  justify-content: space-between;
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

const IconParentsStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const FavoriteButton = styled.button`
  ${IconParentsStyle}
`;

const CommentLink = styled(Link)`
  ${IconParentsStyle}
`;
