import styled from '@emotion/styled';
import { isAxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import type { Comment } from 'types/comment';
import type { ErrorResponse } from 'types/response';
import { MoreIcon, ReportIcon, TrashIcon } from 'assets/icons';
import { FloatingMenu, Modal } from 'components/common';
import { ProfileImage } from 'components/profile';
import { MODAL_BUTTON, MODAL_MESSAGE } from 'constants/modal';
import { useClickOutside, useModal } from 'hooks/common';
import { useDeleteComment } from 'hooks/services';
import { timeFormat, dateFormat, errorResponseMessage } from 'utils';

interface DiaryCommentProps {
  diaryComment: Comment;
  diaryId: string;
}

export const DiaryComment = ({ diaryComment, diaryId }: DiaryCommentProps) => {
  const { data: session } = useSession();

  const { isVisible: isVisibleDeleteModal, handleModal: handleDeleteModal } =
    useModal();
  const { ref, isVisible, setIsVisible } = useClickOutside();

  const deleteCommentMutation = useDeleteComment(diaryId);

  const { id: commentId, createdAt, comment, commenter } = diaryComment;
  const isCommenter = commenter.id === session?.user.id;

  const handleDeleteComment = () => {
    try {
      deleteCommentMutation({ diaryId, commentId });
    } catch (error) {
      if (isAxiosError<ErrorResponse>(error)) {
        alert(errorResponseMessage(error.response?.data.message));
      }
    }
  };
  return (
    <>
      <CommentItem>
        <CommentHead>
          <ProfileImage
            size="sm"
            src={commenter.imgUrl}
            username={commenter.username}
          />
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
            position="absolute"
            items={
              isCommenter
                ? [
                    {
                      icon: <TrashIcon />,
                      label: '삭제하기',
                      onClick: handleDeleteModal.open,
                    },
                  ]
                : [
                    {
                      icon: <ReportIcon />,
                      label: '신고하기',
                      onClick: () => {
                        confirm('신고하시겠습니까?'); // TODO: 신고하기 기능 추가
                      },
                    },
                  ]
            }
          />
        )}
      </CommentItem>
      <Modal
        isVisible={isVisibleDeleteModal}
        message={MODAL_MESSAGE.delete}
        confirmText={MODAL_BUTTON.delete}
        onClose={handleDeleteModal.close}
        onConfirm={handleDeleteComment}
      />
    </>
  );
};

const CommentItem = styled.li`
  position: relative;
  padding: 12px 20px 16px;

  &:focus-within {
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
