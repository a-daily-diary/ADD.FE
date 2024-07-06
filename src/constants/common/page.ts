export const PAGE_PATH = {
  main: '/',

  matching: {
    index: '/matching',
    loading: '/matching/loading',
  },

  diary: {
    index: '/diary',
    detail: (id: string) => `/diary/${id}`,
    edit: (id: string) => `/diary/${id}/edit`,
    focusComment: (id: string) => `/diary/${id}?focus=comment`,
  },

  profile: {
    index: '/profile',
    edit: '/profile/edit',
    diaries: '/profile/diaries',
    bookmarks: '/profile/bookmarks',
    username: (username: string) => `/profile/${username}`,
    badges: (username: string) => `/profile/${username}/badges`,
    usernameDiaries: (username: string) => `/profile/${username}/diaries`,
  },

  account: {
    index: '/account',
    login: '/account/login',
    register: '/account/register',
    findPassword: '/account/find-password',
    resetPassword: '/account/reset-password',
  },

  setting: {
    index: '/setting',
  },

  search: {
    index: '/search',
    keyword: (keyword: string) => `/search/${keyword}`,
  },
} as const;

export const WITH_AUTH_PAGE_LIST = [
  PAGE_PATH.main,
  PAGE_PATH.matching.index,
  PAGE_PATH.diary.index,
  PAGE_PATH.profile.index,
  PAGE_PATH.setting.index,
  PAGE_PATH.search.index,
] as readonly string[];
