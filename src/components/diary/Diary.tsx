import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import BookmarkIcon from 'assets/icons/bookmark.svg';
import OnBookmarkIcon from 'assets/icons/bookmark_on.svg';
import CommentIcon from 'assets/icons/comment.svg';
import HeartIcon from 'assets/icons/heart.svg';
import OnHeartIcon from 'assets/icons/heart_on.svg';
import ResponsiveImage from 'components/common/ResponsiveImage';
import { EllipsisStyle } from 'styles/EllipsisStyle';
import { dateFormat, timeFormat } from 'utils/Formatter';

interface DiaryProps {
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
}

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
  authorUsername,
}: DiaryProps) => {
  // 목데이터의 작성자 아이디 값의 길이가 길어어 20자리까지 자름
  // API 연결 후 삭제할 코드
  const username = authorUsername.slice(0, 20);

  return (
    <Container>
      <ContentContainer>
        <Title>{title}</Title>
        {/* TODO: 현재 목데이터 index와 id 값이 달라 임의로 (id - 1)를 적용하여 해결 */}
        <ContentLink href={`/diary/${id - 1}`}>{content}</ContentLink>
        {imgUrl !== null && (
          <ResponsiveImage
            src={imgUrl}
            alt={title}
            width={320}
            height={160}
            aspectRatio={2 / 1}
          />
        )}
        <DateContainer>
          <span>
            <span>{username}</span>
            <span>・</span>
            <span>{dateFormat(createdAt)}</span>
          </span>
          <span>{timeFormat(createdAt)}</span>
        </DateContainer>
      </ContentContainer>
      <IconContainer>
        <IconInnerContainer>
          <FavoriteButton type="button">
            {isFavorite ? <OnHeartIcon /> : <HeartIcon />}
            {favoriteCount}
          </FavoriteButton>
          {/* TODO: 현재 목데이터 index와 id 값이 달라 임의로 (id - 1)를 적용하여 해결 */}
          <CommentLink
            href={`/diary/${id - 1}?focus=comment`}
            as={`/diary/${id - 1}`}
          >
            <CommentIcon />
            {commentCount}
          </CommentLink>
        </IconInnerContainer>
        <button type="button">
          {isBookmark ? <OnBookmarkIcon /> : <BookmarkIcon />}
        </button>
      </IconContainer>
    </Container>
  );
};

export default Diary;

const Container = styled.li`
  background-color: ${({ theme }) => theme.colors.white};
`;

const ContentContainer = styled.div`
  padding: 20px;
`;

const Title = styled.h3`
  ${({ theme }) => theme.fonts.headline_03}
`;

const ContentLink = styled(Link)`
  ${EllipsisStyle}
  ${({ theme }) => theme.fonts.body_06}
  margin: 4px 0 6px;
  cursor: default;
`;

const DateContainer = styled.div`
  display: flex;
  justify-content: space-between;
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
