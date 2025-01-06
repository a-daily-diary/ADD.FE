export const API_PATH = {
  users: {
    index: '/users',
    image: '/users/upload-image',
    emailExists: '/users/email-exists',
    usernameExists: '/users/username-exists',
    register: '/users/register',
    login: '/users/login',
    passwordResetLink: '/users/password-reset-link',
    password: '/users/password',
    tempTokenValidation: '/users/temp-token-validation',
  },
  diaries: {
    index: '/diaries',
    image: '/diaries/upload-image',
    bookmark: '/diaries/bookmark',
  },
  terms: {
    index: '/terms-agreements',
  },
  activities: {
    index: '/activities',
  },
  badges: {
    index: '/badges',
    users: '/badges/users',
  },
  matchingHistories: {
    index: '/matching-histories',
    recent: '/matching-histories/recent',
    feedback: (id: string) => `/matching-histories/${id}/feedback`,
  },
  blacklist: {
    addToBlackList: (blockedUserId: string) => `/blacklist/${blockedUserId}`,
  },
} as const;
