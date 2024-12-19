export interface LoginResult {
  id: string;
  /**
   * 用户名
   */
  username: string;
  roles: string[];
  /**
   * token
   */
  token: string;

}
