import { Injectable } from '@angular/core';
import { FolderBaseService } from './folder-base.service';

/**
 * 文件夹
 */
@Injectable({providedIn: 'root' })
export class FolderService extends FolderBaseService {
  id: string | null = null;
  name: string | null = null;
}