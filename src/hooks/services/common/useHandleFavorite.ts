import { useFavoriteDiary, useCancelFavoriteDiary } from '..';
import type { MouseEventHandler } from 'react';
import type { DiaryDetail } from 'types/diary';

export const useHandleFavorite = ({
  isFavorite,
  id,
}: Pick<DiaryDetail, 'id' | 'isFavorite'>) => {
  const { mutate: favoriteMutate } = useFavoriteDiary(id);
  const { mutate: cancelFavoriteMutate } = useCancelFavoriteDiary(id);

  const handleFavorite: MouseEventHandler<HTMLButtonElement> = () => {
    if (isFavorite) {
      cancelFavoriteMutate();
    } else {
      favoriteMutate();
    }
  };

  return handleFavorite;
};
