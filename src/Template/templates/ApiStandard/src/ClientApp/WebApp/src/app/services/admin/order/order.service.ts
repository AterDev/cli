import { Injectable } from '@angular/core';
import { OrderBaseService } from './order-base.service';

/**
 * 订单
 */
@Injectable({providedIn: 'root' })
export class OrderService extends OrderBaseService {
  id: string | null = null;
  name: string | null = null;
}