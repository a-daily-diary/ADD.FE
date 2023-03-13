import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import BookmarkIcon from 'assets/icons/bookmark.svg';
import OnBookmarkIcon from 'assets/icons/bookmark_on.svg';
import CommentIcon from 'assets/icons/comment.svg';
import HeartIcon from 'assets/icons/heart.svg';
import OnHeartIcon from 'assets/icons/heart_on.svg';
import ResponsiveImage from 'components/common/ResponsiveImage';
import { DIARY_LIST_MOCK_DATA } from 'mocks/DiaryList';
import { dateFormat, timeFormat } from 'utils/Formatter';

const DiaryDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  // TODO: API 연동하기
  const data = DIARY_LIST_MOCK_DATA[Number(id)];

  if (data === undefined) return <div>Loading...</div>;

  const {
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
  } = data;

  return (
    <section>
      {data !== undefined && (
        <Container>
          <ContentContainer>
            <UpperContainer>
              {authorThumbnailUrl !== null && (
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
            </UpperContainer>
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
      )}
    </section>
  );
};

export default DiaryDetail;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
`;

const ContentContainer = styled.div`
  padding: 18px 20px 20px;
`;

const UpperContainer = styled.div`
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
  font-size: 16px;
  font-weight: 400;
  line-height: 100%;
`;

const CreatedAtText = styled.span`
  color: ${({ theme }) => theme.colors.gray_999};
  font-size: 14px;
  font-weight: 400;
  line-height: 100%;
  letter-spacing: -0.02em;
  text-align: right;
`;

const Title = styled.h3`
  ${({ theme }) => theme.fonts.diary_title}
`;

const ImageContainer = styled.div`
  margin: 12px 0 10px;
`;

const Content = styled.p`
  ${({ theme }) => theme.fonts.diary_content}
  margin-top: 4px;
`;

const TimeContainer = styled.div`
  margin-top: 12px;
  ${({ theme }) => theme.fonts.diary_info}
  color: ${({ theme }) => theme.colors.gray_999};
`;

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
