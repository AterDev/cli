import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import { LoginDto } from './models/login-dto.model';
import { SystemUserFilterDto } from './models/system-user-filter-dto.model';
import { SystemUserAddDto } from './models/system-user-add-dto.model';
import { SystemUserUpdateDto } from './models/system-user-update-dto.model';
import { AuthResult } from './models/auth-result.model';
import { SystemUserItemDtoPageList } from './models/system-user-item-dto-page-list.model';
import { SystemUser } from './models/system-user.model';

/**
 * 系统用户
 */
@Injectable({ providedIn: 'root' })
export class SystemUserBaseService extends BaseService {
  /**
   * 登录时，发送邮箱验证码 ✅
   * @param email 
   */
  sendVerifyCode(email: string | null): Observable<any> {
    const _url = `/api/admin/SystemUser/verifyCode?email=${email ?? ''}`;
    return this.request<any>('post', _url);
  }

  /**
   * 获取图形验证码 ✅
   */
  getCaptchaImage(): Observable<any> {
    const _url = `/api/admin/SystemUser/captcha`;
    return this.request<any>('get', _url);
  }

  /**
   * 登录获取Token ✅
   * @param data LoginDto
   */
  login(data: LoginDto): Observable<AuthResult> {
    const _url = `/api/admin/SystemUser/login`;
    return this.request<AuthResult>('put', _url, data);
  }

  /**
   * 退出 ✅
   * @param id string
   */
  logout(id: string): Observable<boolean> {
    const _url = `/api/admin/SystemUser/logout/${id}`;
    return this.request<boolean>('put', _url);
  }

  /**
   * 筛选 ✅
   * @param data SystemUserFilterDto
   */
  filter(data: SystemUserFilterDto): Observable<SystemUserItemDtoPageList> {
    const _url = `/api/admin/SystemUser/filter`;
    return this.request<SystemUserItemDtoPageList>('post', _url, data);
  }

  /**
   * 新增 ✅
   * @param data SystemUserAddDto
   */
  add(data: SystemUserAddDto): Observable<SystemUser> {
    const _url = `/api/admin/SystemUser`;
    return this.request<SystemUser>('post', _url, data);
  }

  /**
   * 更新 ✅
   * @param id 
   * @param data SystemUserUpdateDto
   */
  update(id: string, data: SystemUserUpdateDto): Observable<SystemUser> {
    const _url = `/api/admin/SystemUser/${id}`;
    return this.request<SystemUser>('patch', _url, data);
  }

  /**
   * 详情 ✅
   * @param id 
   */
  getDetail(id: string): Observable<SystemUser> {
    const _url = `/api/admin/SystemUser/${id}`;
    return this.request<SystemUser>('get', _url);
  }

  /**
   * ⚠删除 ✅
   * @param id 
   */
  delete(id: string): Observable<SystemUser> {
    const _url = `/api/admin/SystemUser/${id}`;
    return this.request<SystemUser>('delete', _url);
  }

  /**
   * 修改密码 ✅
   * @param password string
   * @param newPassword string
   */
  changePassword(password: string | null, newPassword: string | null): Observable<boolean> {
    const _url = `/api/admin/SystemUser/changePassword?password=${password ?? ''}&newPassword=${newPassword ?? ''}`;
    return this.request<boolean>('put', _url);
  }

}
