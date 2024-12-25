/**
 * 登录
 */
export interface LoginDto {
  userName: string;
  password: string;
  /**
   * 验证码
   */
  verifyCode?: string | null;

}
