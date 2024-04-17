/**
 * Request
 */
export interface PasswordResetLinkRequest {
  email: string;
  redirectUrl: string;
}

/**
 * Others
 */

export type PasswordFindForm = Omit<PasswordResetLinkRequest, 'redirectUrl'>;

export interface PasswordResetForm {
  password: string;
  passwordCheck: string;
}
