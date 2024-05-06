// 该文件自动生成，会被覆盖更新
import { Injectable, NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumText'
})
@Injectable({ providedIn: 'root' })
export class EnumTextPipe implements PipeTransform {
  transform(value: unknown, type: string): string {
    let result = '';
    switch (type) {
      case 'CacheType':
        {
          switch (value) {
            case 0: result = 'Redis'; break;
            case 1: result = 'Memory'; break;
            default: result = '默认'; break;
          }
        }
        break;
      case 'ControllerType':
        {
          switch (value) {
            case 0: result = '用户端'; break;
            case 1: result = '管理端'; break;
            case 2: result = '用户端和管理端'; break;
            default: result = '默认'; break;
          }
        }
        break;
      case 'DBType':
        {
          switch (value) {
            case 0: result = 'PostgreSQL'; break;
            case 1: result = 'SQLServer'; break;
            case 2: result = 'SQLite'; break;
            default: result = '默认'; break;
          }
        }
        break;
      case 'FrontType':
        {
          switch (value) {
            case 1: result = 'Angular'; break;
            case 2: result = 'Blazor'; break;
            default: result = '默认'; break;
          }
        }
        break;

      default:
        break;
    }
    return result;
  }
}


@NgModule({
  declarations: [EnumTextPipe], exports: [EnumTextPipe]
})
export class EnumTextPipeModule { }