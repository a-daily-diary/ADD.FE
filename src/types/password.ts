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
