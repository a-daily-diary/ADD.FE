import { useBookmarkDiary, useCancelBookmarkDiary } from '..';
import type { User } from 'next-auth';
import type { MouseEventHandler } from 'react';
import type { DiaryDetail } from 'types/diary';

export const useHandleBookmark = ({
  isBookmark,
  id,
  username,
}: Pick<DiaryDetail, 'id' | 'isBookmark'> & Pick<User, 'username'>) => {
  const { mutate: bookmarkMutate } = useBookmarkDiary({
    diaryId: id,
    username,
  });
  const cancelBookmarkMutation = useCancelBookmarkDiary(id, username);

  const handleBookmark: MouseEventHandler<HTMLButtonElement> = () => {
    if (isBookmark) {
      cancelBookmarkMutation();
    } else {
      bookmarkMutate();
    }
  };

  return handleBookmark;
};
