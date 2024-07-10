import { PAGE_PATH } from 'constants/common';

export const MY_PROFILE_TAB_LIST = [
  { id: PAGE_PATH.profile.index, title: '활동' },
  { id: PAGE_PATH.profile.diaries, title: '일기' },
  { id: PAGE_PATH.profile.bookmarks, title: '북마크' },
];

export const YOUR_PROFILE_TAB_LIST = (username: string) => {
  return [
    { id: PAGE_PATH.profile.username(username), title: '활동' },
    { id: PAGE_PATH.profile.usernameDiaries(username), title: '일기' },
  ];
};
