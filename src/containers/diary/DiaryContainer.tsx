import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as api from 'api';
import {
  BookmarkOffIcon,
  BookmarkOnIcon,
  CommentIcon,
  HeartOffIcon,
  HeartOnIcon,
} from 'assets/icons';
import ResponsiveImage from 'components/common/ResponsiveImage';
import { dateFormat, timeFormat } from 'utils';

const DiaryContainer = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useQuery(
    ['diary-detail', id],
    async () => await api.getDiaryDetail(id as string),
  );

  if (data === undefined) return <div />;
  if (isLoading) return <div>Loading</div>;

  const {
    title,
    content,
    imgUrl,
    favoriteCount,
    commentCount,
    createdAt,
    author,
    isBookmark,
    isFavorite,
  } = data;

  return (
    <Container>
      <AuthorContainer>
        {author.imgUrl !== null && (
          // TODO
          // 1. 유저 프로필 이미지 클릭 시 해당 프로필로 이동
          // 2. 프로필 이미지 컴포넌트 분리
          <AuthorImageContainer>
            <Image
              src={author.imgUrl}
              alt={author.username}
              width={28}
              height={28}
            />
          </AuthorImageContainer>
        )}
        <UsernameText>{author.username}</UsernameText>
        <CreatedAtText>{dateFormat(createdAt)}</CreatedAtText>
      </AuthorContainer>
      <ContentContainer>
        <Title>{title}</Title>
        {/* NOTE: 잘못된 이미지 데이터로 인해 문제 해결 후 주석 해제 */}
        {/* {imgUrl !== null && (
          <ImageContainer>
            <ResponsiveImage
              src={imgUrl}
              alt={title}
            />
          </ImageContainer>
        )} */}
        <Content>{content}</Content>
        {timeFormat(createdAt) !== null && (
          <TimeContainer>{timeFormat(createdAt)}</TimeContainer>
        )}
      </ContentContainer>
      <IconContainer>
        <IconInnerContainer>
          <IconButton type="button">
            {isFavorite ? <HeartOnIcon /> : <HeartOffIcon />}
            {favoriteCount}
          </IconButton>
          <IconButton type="button">
            <CommentIcon />
            {commentCount}
          </IconButton>
        </IconInnerContainer>
        <button type="button">
          {isBookmark ? <BookmarkOnIcon /> : <BookmarkOffIcon />}
        </button>
      </IconContainer>
    </Container>
  );
};

export default DiaryContainer;

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

const AuthorImageContainer = styled.div`
  overflow: hidden;
  border-radius: 50%;
  width: 28px;
  aspect-ratio: 1;
`;

const UsernameText = styled.span`
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
  ${({ theme }) => theme.fonts.body_06}
  margin-top: 4px;
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
