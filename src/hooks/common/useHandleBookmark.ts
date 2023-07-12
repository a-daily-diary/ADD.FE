import { useBookmarkDiary, useCancelBookmarkDiary } from '../services';
import type { MouseEventHandler } from 'react';
import type { DiaryDetail } from 'types/diary';

export const useHandleBookmark = ({
  isBookmark,
  id,
}: Pick<DiaryDetail, 'id' | 'isBookmark'>) => {
  const bookmarkMutation = useBookmarkDiary(id);
  const cancelBookmarkMutation = useCancelBookmarkDiary(id);

  const handleBookmark: MouseEventHandler<HTMLButtonElement> = () => {
    if (isBookmark) {
      cancelBookmarkMutation();
    } else {
      bookmarkMutation();
    }
  };

  return handleBookmark;
};
