import { useEffect, useState } from 'react';
import { LOCAL_STORAGE_KEYS } from 'constants/common';
import { VALID_VALUE } from 'constants/validation';

export function useSearchKeywordStorage() {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isLastKeyword, setIsLastKeyword] = useState<boolean>(false);

  const handleSaveSearchKeyword = (keyword: string) => {
    const isValidKeyword = keyword.length > 0;

    if (!isValidKeyword) return;

    setKeywords((prevState) => {
      if (prevState.includes(keyword)) {
        return prevState;
      }

      if (prevState.length === VALID_VALUE.searchKeywordsMaxLength) {
        return [...prevState.slice(1), keyword];
      }

      return [...prevState, keyword];
    });
  };

  const handleDeleteSearchKeyword = (value: string) => {
    setKeywords((prevState) => {
      const result = prevState.filter((key) => key !== value);

      if (result.length === 0) {
        setIsLastKeyword(true);
      }

      return result;
    });
  };

  const handleDeleteAllSearchKeyword = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.searchKeyword);
    setKeywords([]);
  };

  useEffect(() => {
    if (isLastKeyword && keywords.length === 0) {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.searchKeyword);
      setIsLastKeyword(false);
    }
  }, [isLastKeyword]);

  useEffect(() => {
    if (keywords.length > 0) {
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.searchKeyword,
        JSON.stringify(keywords),
      );
    }
  }, [keywords]);

  useEffect(() => {
    const localStorageKeyword =
      localStorage.getItem(LOCAL_STORAGE_KEYS.searchKeyword) ?? '[]';

    if (localStorageKeyword !== 'undefined') {
      setKeywords(JSON.parse(localStorageKeyword) as string[]);
    }
  }, []);

  return {
    keywords,
    handleSaveSearchKeyword,
    handleDeleteSearchKeyword,
    handleDeleteAllSearchKeyword,
  };
}
