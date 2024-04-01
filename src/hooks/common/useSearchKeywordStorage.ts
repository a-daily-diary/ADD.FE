import { useEffect, useState } from 'react';
import { LOCAL_STORAGE_KEYS } from 'constants/common';

export function useSearchKeywordStorage() {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isLastKeyword, setIsLastKeyword] = useState<boolean>(false);

  const handleSaveSearchKeyword = (value: string) => {
    const keywordValue = value.trim();
    const isValidKeyword = keywordValue.length > 0;

    if (!isValidKeyword) return;

    setKeywords((prevState) => {
      if (prevState.includes(keywordValue)) {
        return prevState;
      }

      if (prevState.length === 8) {
        return [...prevState.slice(1), keywordValue];
      }

      return [...prevState, keywordValue];
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
