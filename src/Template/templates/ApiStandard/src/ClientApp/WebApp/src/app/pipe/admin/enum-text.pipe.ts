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
            case 'AgeRange':
        {
            switch (value)
        {
            case 0: result = '小于18岁'; break;
            case 1: result = '18至25岁之间'; break;
            case 2: result = '26至30岁之间'; break;
            case 3: result = '31至40岁之间'; break;
            case 4: result = '41至50岁之间'; break;
            case 5: result = '51至60岁之间'; break;
            case 6: result = '大于60岁'; break;
            default: '默认'; break;
          }
        }
        break;
      case 'CertificateType':
        {
            switch (value)
        {
            case 0: result = '未领取'; break;
            case 1: result = '纸质'; break;
            case 2: result = '电子'; break;
            case 3: result = '纸质+电子'; break;
            default: '默认'; break;
          }
        }
        break;
      case 'CustomerAccountLevel':
        {
            switch (value)
        {
            case 0: result = '普通'; break;
            default: '默认'; break;
          }
        }
        break;
      case 'CustomerType':
        {
            switch (value)
        {
            case 0: result = '试用'; break;
            case 1: result = '正式'; break;
            default: '默认'; break;
          }
        }
        break;
      case 'EnglishLevel':
        {
            switch (value)
        {
            case 0: result = '零基础或接近零基础'; break;
            case 1: result = '小学水平'; break;
            case 2: result = '初高中水平'; break;
            case 3: result = '大学水平'; break;
            case 4: result = '可正常熟练交流，但想养生提升商务英语'; break;
            default: '默认'; break;
          }
        }
        break;
      case 'FileType':
        {
            switch (value)
        {
            case 0: result = '图片'; break;
            case 1: result = '文本'; break;
            case 2: result = '压缩'; break;
            case 3: result = '文档'; break;
            default: '默认'; break;
          }
        }
        break;
      case 'FollowUpStatus':
        {
            switch (value)
        {
            case 0: result = '待试用'; break;
            case 1: result = '试用后第一次跟进'; break;
            case 2: result = '试用后第二次跟进'; break;
            case 3: result = '试用后第三次跟进'; break;
            case 4: result = '高概率将报课'; break;
            case 5: result = '有报课意愿但后期再考虑'; break;
            case 6: result = '续费用户'; break;
            default: '默认'; break;
          }
        }
        break;
      case 'GenderType':
        {
            switch (value)
        {
            case 0: result = '男性'; break;
            case 1: result = '女性'; break;
            case 2: result = '其他'; break;
            default: '默认'; break;
          }
        }
        break;
      case 'MenuType':
        {
            switch (value)
        {
            case 0: result = '页面'; break;
            case 1: result = '按钮'; break;
            default: '默认'; break;
          }
        }
        break;
      case 'OrderStatus':
        {
            switch (value)
        {
            case 0: result = '未支付'; break;
            case 1: result = '已取消'; break;
            case 2: result = '已支付'; break;
            case 3: result = '已过期'; break;
            default: '默认'; break;
          }
        }
        break;
      case 'PermissionType':
        {
            switch (value)
        {
            case 0: result = '无权限'; break;
            case 1: result = '可读'; break;
            case 2: result = '可审核'; break;
            case 4: result = '仅添加'; break;
            case 16: result = '仅编辑'; break;
            case 21: result = '可读写'; break;
            case 23: result = '读写且可审核'; break;
            default: '默认'; break;
          }
        }
        break;
      case 'ProductType':
        {
            switch (value)
        {
            case 0: result = '商品'; break;
            case 1: result = '服务'; break;
            case 2: result = '会员'; break;
            case 3: result = '高级会员'; break;
            case 4: result = '试用'; break;
            default: '默认'; break;
          }
        }
        break;
      case 'PropertyValueType':
        {
            switch (value)
        {
            case 0: result = '数字'; break;
            case 1: result = '字符串'; break;
            case 2: result = '布尔值'; break;
            case 3: result = '对象'; break;
            case 4: result = '数组'; break;
            default: '默认'; break;
          }
        }
        break;
      case 'UserActionType':
        {
            switch (value)
        {
            case 0: result = '其它'; break;
            case 1: result = '登录'; break;
            case 2: result = '添加'; break;
            case 3: result = '更新'; break;
            case 4: result = '删除'; break;
            case 5: result = '审核'; break;
            case 6: result = '导入'; break;
            case 7: result = '导出'; break;
            default: '默认'; break;
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