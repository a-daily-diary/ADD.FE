import { useFavoriteDiary, useCancelFavoriteDiary } from '../services';
import type { MouseEventHandler } from 'react';
import type { DiaryDetail } from 'types/Diary';

export const useHandleFavorite = ({
  isFavorite,
  id,
}: Pick<DiaryDetail, 'id' | 'isFavorite'>) => {
  const favoriteMutation = useFavoriteDiary(id);
  const cancelFavoriteMutation = useCancelFavoriteDiary(id);

  const handleFavorite: MouseEventHandler<HTMLButtonElement> = () => {
    if (isFavorite) {
      cancelFavoriteMutation();
    } else {
      favoriteMutation();
    }
  };

  return handleFavorite;
};
