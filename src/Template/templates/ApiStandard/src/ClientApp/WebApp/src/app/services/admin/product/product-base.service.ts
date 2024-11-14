import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import { ProductFilterDto } from './models/product-filter-dto.model';
import { ProductAddDto } from './models/product-add-dto.model';
import { ProductUpdateDto } from './models/product-update-dto.model';
import { ProductItemDtoPageList } from './models/product-item-dto-page-list.model';
import { Product } from './models/product.model';

/**
 * 产品
 */
@Injectable({ providedIn: 'root' })
export class ProductBaseService extends BaseService {
  /**
   * 筛选 ✅
   * @param data ProductFilterDto
   */
  filter(data: ProductFilterDto): Observable<ProductItemDtoPageList> {
    const _url = `/api/admin/Product/filter`;
    return this.request<ProductItemDtoPageList>('post', _url, data);
  }

  /**
   * 新增 ✅
   * @param data ProductAddDto
   */
  add(data: ProductAddDto): Observable<Product> {
    const _url = `/api/admin/Product`;
    return this.request<Product>('post', _url, data);
  }

  /**
   * 更新 ✅
   * @param id 
   * @param data ProductUpdateDto
   */
  update(id: string, data: ProductUpdateDto): Observable<Product> {
    const _url = `/api/admin/Product/${id}`;
    return this.request<Product>('patch', _url, data);
  }

  /**
   * 详情 ✅
   * @param id 
   */
  getDetail(id: string): Observable<Product> {
    const _url = `/api/admin/Product/${id}`;
    return this.request<Product>('get', _url);
  }

  /**
   * 删除 ✅
   * @param id 
   */
  delete(id: string): Observable<Product> {
    const _url = `/api/admin/Product/${id}`;
    return this.request<Product>('delete', _url);
  }

}
