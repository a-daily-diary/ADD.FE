import styled from '@emotion/styled';
import BookmarkIcon from 'assets/icons/bookmark.svg';
import OnBookmarkIcon from 'assets/icons/bookmark_on.svg';
import CommentIcon from 'assets/icons/comment.svg';
import HeartIcon from 'assets/icons/heart.svg';
import OnHeartIcon from 'assets/icons/heart_on.svg';
import NextImage from 'components/common/NextImage';

interface DiaryProps {
  id: number;
  title: string;
  content: string;
  imgUrl: string;
  commentCount: number;
  favoriteCount: number;
  isFavorite: boolean;
  isBookmark: boolean;
  createdAt: string;
  modifiedAt: string;
  author: string;
}

const Diary = ({
  title,
  content,
  imgUrl,
  commentCount,
  favoriteCount,
  isFavorite,
  isBookmark,
  createdAt,
  modifiedAt,
  author,
}: DiaryProps) => {
  return (
    <li>
      <h2>{title}</h2>
      <p>{content}</p>
      {imgUrl?.length > 0 && (
        <NextImage
          src={imgUrl}
          alt={title}
          width={320}
          height={160}
          aspectRatio={2 / 1}
        />
      )}
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
    </li>
  );
};

export default Diary;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray_eee};
  ${({ theme }) => theme.fonts.diary_icon};
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
