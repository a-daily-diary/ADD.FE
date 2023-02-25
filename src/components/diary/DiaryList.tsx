import styled from '@emotion/styled';
import BookmarkIcon from 'assets/icons/bookmark.svg';
import CommentIcon from 'assets/icons/comment.svg';
import HeartIcon from 'assets/icons/heart.svg';
import NextImage from 'components/common/NextImage';
import { DIARY_LIST_MOCK_DATA } from 'mocks/DiaryList';

const DiaryList = () => {
  return (
    <section>
      <ul>
        {DIARY_LIST_MOCK_DATA.map((diary) => {
          const {
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
          } = diary;
          return (
            <li key={`diary-list-${id}`}>
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
                    <HeartIcon />
                    {favoriteCount}
                  </IconButton>
                  <IconButton type="button">
                    <CommentIcon />
                    {commentCount}
                  </IconButton>
                </IconInnerContainer>
                <button type="button">
                  <BookmarkIcon />
                </button>
              </IconContainer>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default DiaryList;

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
