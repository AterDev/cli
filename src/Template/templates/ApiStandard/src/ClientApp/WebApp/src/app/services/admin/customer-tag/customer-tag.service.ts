import { Injectable } from '@angular/core';
import { CustomerTagBaseService } from './customer-tag-base.service';

/**
 * 用户标签
 */
@Injectable({providedIn: 'root' })
export class CustomerTagService extends CustomerTagBaseService {
  id: string | null = null;
  name: string | null = null;
}