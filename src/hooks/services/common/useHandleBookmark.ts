import { useBookmarkDiary, useCancelBookmarkDiary } from '..';
import type { MouseEventHandler } from 'react';
import type { DiaryDetail } from 'types/diary';

export const useHandleBookmark = ({
  isBookmark,
  id,
}: Pick<DiaryDetail, 'id' | 'isBookmark'>) => {
  const { mutate: bookmarkMutate } = useBookmarkDiary({ diaryId: id });
  const { mutate: cancelBookmarkMutate } = useCancelBookmarkDiary({
    diaryId: id,
  });

  const handleBookmark: MouseEventHandler<HTMLButtonElement> = () => {
    if (isBookmark) {
      cancelBookmarkMutate();
    } else {
      bookmarkMutate();
    }
  };

  return handleBookmark;
};
