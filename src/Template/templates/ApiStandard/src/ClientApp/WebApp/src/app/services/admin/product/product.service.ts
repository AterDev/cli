import { Injectable } from '@angular/core';
import { ProductBaseService } from './product-base.service';

/**
 * 产品
 */
@Injectable({providedIn: 'root' })
export class ProductService extends ProductBaseService {
  id: string | null = null;
  name: string | null = null;
}