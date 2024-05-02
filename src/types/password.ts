/**
 * Request
 */
export interface PasswordResetLinkRequest {
  email: string;
  redirectUrl: string;
}

export interface PasswordResetRequest {
  email: string;
  tempToken: string;
  password: string;
}

/**
 * Others
 */

export type PasswordFindForm = Omit<PasswordResetLinkRequest, 'redirectUrl'>;

export interface PasswordResetForm {
  password: string;
  passwordCheck: string;
}
