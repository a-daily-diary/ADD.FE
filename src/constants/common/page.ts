export const PAGE_PATH = (id?: string) => {
  return {
    main: '/',

    matching: {
      index: '/matching',
      loading: '/matching/loading',
    },

    diary: {
      index: '/diary',
      detail: `/diary/${id as string}`,
      edit: `/diary/${id as string}/edit`,
      focusComment: `/diary/${id as string}?focus=comment`,
    },

    profile: {
      index: '/profile',
      edit: '/profile/edit',
      username: `/profile/${id as string}`,
    },

    account: {
      index: 'account',
      login: '/account/login',
      register: '/account/register',
      findPassword: '/account/findPassword',
    },

    setting: {
      index: 'setting',
    },
  } as const;
};
