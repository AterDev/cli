import { Injectable } from '@angular/core';
import { CustomerInfoBaseService } from './customer-info-base.service';

/**
 * 客户信息
 */
@Injectable({providedIn: 'root' })
export class CustomerInfoService extends CustomerInfoBaseService {
  id: string | null = null;
  name: string | null = null;
}