import { useEffect, useState } from 'react';
import { LOCAL_STORAGE_KEYS } from 'constants/common';

export function useSearchKeywordStorage() {
  const [keywordList, setKeywordList] = useState<string[]>([]);

  const handleSaveSearchKeyword = (value: string) => {
    const keywordValue = value.trim();
    const isValidKeyword = keywordValue.length > 0;

    if (!isValidKeyword) return;

    setKeywordList((prevState) => {
      if (prevState.includes(keywordValue)) {
        return prevState;
      }
      if (prevState.length === 8) {
        return [...prevState.slice(1), keywordValue];
      }
      return [...prevState, keywordValue];
    });
  };

  // TODO: 필요 시 주석 해제
  // const handleDeleteSearchKeyword = (value: string) => {
  //   setKeywordList((prevState) => prevState.filter((key) => key !== value));
  // };

  // const handleDeleteAllSearchKeyword = () => {
  //   localStorage.removeItem(LOCAL_STORAGE_KEYS.searchKeyword);
  //   setKeywordList([]);
  // };

  useEffect(() => {
    if (keywordList.length > 0) {
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.searchKeyword,
        JSON.stringify(keywordList),
      );
    }
  }, [keywordList]);

  useEffect(() => {
    const localStorageKeyword =
      localStorage.getItem(LOCAL_STORAGE_KEYS.searchKeyword) ?? '[]';

    if (localStorageKeyword !== 'undefined') {
      setKeywordList(JSON.parse(localStorageKeyword) as string[]);
    }
  }, []);

  return {
    keywordList,
    handleSaveSearchKeyword,
    // handleDeleteSearchKeyword,
    // handleDeleteAllSearchKeyword,
  };
}
