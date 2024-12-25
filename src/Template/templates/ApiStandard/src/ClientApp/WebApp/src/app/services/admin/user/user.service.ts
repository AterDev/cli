import { Injectable } from '@angular/core';
import { UserBaseService } from './user-base.service';

/**
 * 用户账户
 */
@Injectable({providedIn: 'root' })
export class UserService extends UserBaseService {
  id: string | null = null;
  name: string | null = null;
}