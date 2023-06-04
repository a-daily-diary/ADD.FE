export const API_PATH = {
  users: {
    index: '/users',
    image: '/users/upload-image',
    emailExists: '/users/email-exists',
    usernameExists: '/users/username-exists',
    register: '/users/register',
    login: '/users/login',
  },
  diaries: {
    index: '/diaries',
    image: '/diaries/upload-image',
  },
} as const;
