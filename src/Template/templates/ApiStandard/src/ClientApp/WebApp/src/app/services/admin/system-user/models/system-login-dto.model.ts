/**
 * 登录
 */
export interface SystemLoginDto {
  userName: string;
  password: string;
  /**
   * 验证码
   */
  verifyCode?: string | null;

}
