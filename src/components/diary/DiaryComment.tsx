import styled from '@emotion/styled';
import { isAxiosError } from 'axios';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import type { Comment } from 'types/Comment';
import type { ErrorResponse } from 'types/Response';
import { MoreIcon, ReportIcon, TrashIcon } from 'assets/icons';
import FloatingMenu from 'components/common/FloatingMenu';
import { useClickOutside } from 'hooks';
import { useDeleteComment } from 'hooks/services';
import { timeFormat, dateFormat, errorResponseMessage } from 'utils';

interface DiaryCommentProps {
  diaryComment: Comment;
  diaryId: string;
}

const DiaryComment = ({ diaryComment, diaryId }: DiaryCommentProps) => {
  const { data: session } = useSession();
  const { ref, isVisible, setIsVisible } = useClickOutside();
  const deleteCommentMutation = useDeleteComment(diaryId);

  const { id: commentId, createdAt, comment, commenter } = diaryComment;
  const isCommenter = commenter.id === session?.user.id;

  const handleDeleteComment = () => {
    if (confirm('삭제하시겠습니까?')) {
      try {
        deleteCommentMutation({ diaryId, commentId });
      } catch (error) {
        if (isAxiosError<ErrorResponse>(error)) {
          alert(errorResponseMessage(error.response?.data.message));
        }
      }
    }
  };
  return (
    <>
      <CommentItem>
        <CommentHead>
          <ProfileImageBox>
            <Image
              src={commenter.imgUrl}
              alt={commenter.username}
              width={20}
              height={20}
            />
          </ProfileImageBox>
          <UsernameSpan>{commenter.username}</UsernameSpan>
          <CreatedAtSpan>
            {timeFormat(createdAt) !== null
              ? timeFormat(createdAt)
              : dateFormat(createdAt)}
          </CreatedAtSpan>
          <MoreButton
            type="button"
            ref={ref}
            onClick={() => {
              setIsVisible((state) => !state);
            }}
          >
            <StyledMoreIcon />
          </MoreButton>
        </CommentHead>
        <CommentContent>{comment}</CommentContent>
        {isVisible && (
          <FloatingMenu
            items={
              isCommenter
                ? [
                    {
                      icon: <TrashIcon />,
                      label: '삭제하기',
                      onClick: handleDeleteComment,
                    },
                  ]
                : [
                    {
                      icon: <ReportIcon />,
                      label: '신고하기',
                      onClick: () => {
                        confirm('신고하시겠습니까?');
                      },
                    },
                  ]
            }
          />
        )}
      </CommentItem>
    </>
  );
};

export default DiaryComment;

const CommentItem = styled.li`
  position: relative;
  padding: 12px 20px 16px;

  &:focus-within {
    /* TODO: color constant에 추가하기 */
    background-color: ${({ theme }) => theme.colors.primary_04};
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 20px;
    width: calc(100% - 40px);
    height: 1px;
    background-color: ${({ theme }) => theme.colors.gray_06};
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
  color: ${({ theme }) => theme.colors.gray_00};
  ${({ theme }) => theme.fonts.body_08};
`;

const CreatedAtSpan = styled.span`
  color: ${({ theme }) => theme.colors.gray_02};
  ${({ theme }) => theme.fonts.caption_02};
  text-align: right;
`;

const MoreButton = styled.button`
  position: absolute;
  right: 0;
`;

const StyledMoreIcon = styled(MoreIcon)`
  width: 20px;
  height: 20px;
`;

const CommentContent = styled.p`
  color: ${({ theme }) => theme.colors.gray_00};
  ${({ theme }) => theme.fonts.body_09};
  word-break: keep-all;
  white-space: pre-wrap;
`;
