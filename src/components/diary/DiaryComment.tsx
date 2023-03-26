import styled from '@emotion/styled';
import Image from 'next/image';
import MoreIcon from 'assets/icons/more.svg';
import { timeFormat, dateFormat } from 'utils/Formatter';

interface CommentProps {
  comment: {
    id: number;
    authorUsername: string;
    authorThumbnailUrl: string;
    content: string;
    createdAt: string;
    modifiedAt: string;
  };
}

const DiaryComment = ({ comment }: CommentProps) => {
  const { authorUsername, authorThumbnailUrl, content, createdAt } = comment;

  return (
    <CommentItem>
      <CommentHead>
        {authorThumbnailUrl !== null && (
          // TODO
          // 1. 유저 프로필 이미지 클릭 시 해당 프로필로 이동
          // 2. 프로필 이미지 컴포넌트 분리
          <ProfileImageBox>
            <Image
              src={authorThumbnailUrl}
              alt={authorUsername}
              width={20}
              height={20}
            />
          </ProfileImageBox>
        )}
        <UsernameSpan>{authorUsername}</UsernameSpan>
        <CreatedAtSpan>
          {timeFormat(createdAt) !== null
            ? timeFormat(createdAt)
            : dateFormat(createdAt)}
        </CreatedAtSpan>
        <MoreButton type="button">
          <MoreIcon />
        </MoreButton>
      </CommentHead>
      <CommentContent>{content}</CommentContent>
    </CommentItem>
  );
};

export default DiaryComment;

const CommentItem = styled.li`
  position: relative;
  padding: 12px 20px 16px;

  &:focus-within {
    /* TODO: color constant에 추가하기 */
    background-color: #f5fdf7;
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 20px;
    width: calc(100% - 40px);
    height: 1px;
    background-color: ${({ theme }) => theme.colors.gray_eee};
  }
`;

const CommentHead = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 8px;
`;

const ProfileImageBox = styled.div`
  overflow: hidden;
  border-radius: 50%;
  width: 20px;
  aspect-ratio: 1;
  background-color: rgba(0, 0, 0, 0.2);
`;

const UsernameSpan = styled.span`
  margin: 0 6px 0 8px;
  color: ${({ theme }) => theme.colors.black};
  font-size: 14px;
  font-weight: 400;
  line-height: 100%;
`;

const CreatedAtSpan = styled.span`
  color: ${({ theme }) => theme.colors.gray_999};
  font-size: 12px;
  font-weight: 400;
  line-height: 100%;
  letter-spacing: -0.02em;
  text-align: right;
`;

const MoreButton = styled.button`
  position: absolute;
  right: 0;
`;

const CommentContent = styled.p`
  color: ${({ theme }) => theme.colors.black};
  font-weight: 400;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: -0.02em;
  word-break: keep-all;
  white-space: pre-wrap;
`;
