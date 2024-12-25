import { Injectable } from '@angular/core';
import { CustomerRegisterBaseService } from './customer-register-base.service';

/**
 * 客户登记
 */
@Injectable({providedIn: 'root' })
export class CustomerRegisterService extends CustomerRegisterBaseService {
  id: string | null = null;
  name: string | null = null;
}