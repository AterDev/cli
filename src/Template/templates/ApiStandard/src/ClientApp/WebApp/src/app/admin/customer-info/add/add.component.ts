import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerInfoService } from 'src/app/services/admin/customer-info/customer-info.service';
import { CustomerInfoAddDto } from 'src/app/services/admin/customer-info/models/customer-info-add-dto.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

import { GenderType } from 'src/app/services/admin/enum/models/gender-type.model';
import { CustomerType } from 'src/app/services/admin/enum/models/customer-type.model';
import { SystemUserItemDto } from 'src/app/services/admin/system-user/models/system-user-item-dto.model';
import { SystemUserService } from 'src/app/services/admin/system-user/system-user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  GenderType = GenderType;
  CustomerType = CustomerType;
  formGroup!: FormGroup;
  data = {} as CustomerInfoAddDto;
  consultantList: SystemUserItemDto[] = [];
  isLoading = true;
  isProcessing = false;
  constructor(
    private service: CustomerInfoService,
    private systemSrv: SystemUserService,
    public snb: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    public dialogRef: MatDialogRef<AddComponent>,
  ) {
  }

  get name() { return this.formGroup.get('name'); }
  get customerType() { return this.formGroup.get('customerType'); }
  get genderType() { return this.formGroup.get('genderType'); }
  get remark() { return this.formGroup.get('remark'); }
  get contactInfo() { return this.formGroup.get('contactInfo'); }
  get contactPhone() { return this.formGroup.get('contactPhone'); }
  get contactEmail() { return this.formGroup.get('contactEmail'); }
  get consultantId() { return this.formGroup.get('consultantId'); }
  get source() { return this.formGroup.get('source'); }

  ngOnInit(): void {
    this.getConsultant();
  }
  getConsultant(): void {
    this.systemSrv.filter({
      pageIndex: 1,
      pageSize: 99,
      roleName: 'Consultant'
    })
      .subscribe({
        next: (res) => {
          if (res && res.data) {
            this.consultantList = res.data;
            this.initForm();
          }
        },
        error: (error) => {
          this.snb.open(error.detail);
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }
  initForm(): void {
    this.formGroup = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(40)]),
      customerType: new FormControl(CustomerType.Formal, [Validators.required]),
      genderType: new FormControl(null, [Validators.maxLength(200)]),
      remark: new FormControl(null, [Validators.maxLength(2000)]),
      contactInfo: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      contactPhone: new FormControl(null, [Validators.maxLength(20)]),
      contactEmail: new FormControl(null, [Validators.maxLength(100)]),
      consultantId: new FormControl(null, [Validators.required]),
      source: new FormControl(null, [Validators.maxLength(60)]),

    });
  }
  getValidatorMessage(type: string): string {
    switch (type) {
      case 'name':
        return this.name?.errors?.['required'] ? '真实姓名必填' :
          this.name?.errors?.['minlength'] ? '真实姓名长度最少位' :
            this.name?.errors?.['maxlength'] ? '真实姓名长度最多40位' : '';
      case 'genderType':
        return this.genderType?.errors?.['required'] ? 'GenderType必填' :
          this.genderType?.errors?.['minlength'] ? 'GenderType长度最少位' :
            this.genderType?.errors?.['maxlength'] ? 'GenderType长度最多200位' : '';
      case 'customerType':
        return this.customerType?.errors?.['required'] ? '客户类型必填' :
          this.customerType?.errors?.['minlength'] ? '客户类型长度最少位' :
            this.customerType?.errors?.['maxlength'] ? '客户类型长度最多200位' : '';
      case 'remark':
        return this.remark?.errors?.['required'] ? '说明备注必填' :
          this.remark?.errors?.['minlength'] ? '说明备注长度最少位' :
            this.remark?.errors?.['maxlength'] ? '说明备注长度最多2000位' : '';
      case 'contactInfo':
        return this.contactInfo?.errors?.['required'] ? '联系信息必填' :
          this.contactInfo?.errors?.['minlength'] ? '联系信息长度最少位' :
            this.contactInfo?.errors?.['maxlength'] ? '联系信息长度最多100位' : '';
      case 'contactPhone':
        return this.contactPhone?.errors?.['required'] ? '联系电话必填' :
          this.contactPhone?.errors?.['minlength'] ? '联系电话长度最少位' :
            this.contactPhone?.errors?.['maxlength'] ? '联系电话长度最多20位' : '';
      case 'contactEmail':
        return this.contactEmail?.errors?.['required'] ? '联系邮箱必填' :
          this.contactEmail?.errors?.['minlength'] ? '联系邮箱长度最少位' :
            this.contactEmail?.errors?.['maxlength'] ? '联系邮箱长度最多100位' : '';
      case 'consultantId':
        return this.consultantId?.errors?.['required'] ? '所属顾问必填' : '';
      case 'source':
        return this.source?.errors?.['minlength'] ? '来源长度最少位' :
          this.source?.errors?.['maxlength'] ? '来源长度最多60位' : '';
      default:
        return '';
    }
  }

  add(): void {
    if (this.formGroup.valid) {
      this.isProcessing = true;
      const data = this.formGroup.value as CustomerInfoAddDto;
      this.service.add(data)
        .subscribe({
          next: (res) => {
            if (res) {
              this.snb.open('添加成功');
              this.dialogRef.close(res);
              //this.router.navigate(['../index'], { relativeTo: this.route });
            }
          },
          error: (error) => {
            this.snb.open(error.detail);
            this.isProcessing = false;
          },
          complete: () => {
            this.isProcessing = false;
          }
        });
    } else {
      this.snb.open('表单验证不通过，请检查填写的内容!');
    }
  }

  back(): void {
    this.location.back();
  }
}
