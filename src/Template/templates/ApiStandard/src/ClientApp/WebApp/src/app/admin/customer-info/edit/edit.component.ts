import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerInfo } from 'src/app/services/admin/customer-info/models/customer-info.model';
import { CustomerInfoService } from 'src/app/services/admin/customer-info/customer-info.service';
import { CustomerInfoUpdateDto } from 'src/app/services/admin/customer-info/models/customer-info-update-dto.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { GenderType } from 'src/app/services/admin/enum/models/gender-type.model';
import { CustomerType } from 'src/app/services/admin/enum/models/customer-type.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  GenderType = GenderType;
  CustomerType = CustomerType;
  id!: string;
  isLoading = true;
  isProcessing = false;
  data = {} as CustomerInfo;
  updateData = {} as CustomerInfoUpdateDto;
  formGroup!: FormGroup;
  constructor(
    private service: CustomerInfoService,
    private snb: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public dlgData: { id: '' }
  ) {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = id;
    } else {
      this.id = dlgData.id;
    }
  }


  get name() { return this.formGroup.get('name'); }
  get customerType() { return this.formGroup.get('customerType'); }
  get genderType() { return this.formGroup.get('genderType'); }
  get remark() { return this.formGroup.get('remark'); }
  get contactInfo() { return this.formGroup.get('contactInfo'); }
  get contactPhone() { return this.formGroup.get('contactPhone'); }
  get contactEmail() { return this.formGroup.get('contactEmail'); }
  get source() { return this.formGroup.get('source'); }


  ngOnInit(): void {
    this.getDetail();
  }

  getDetail(): void {
    this.service.getDetail(this.id)
      .subscribe({
        next: (res) => {
          if (res) {
            this.data = res;
            this.initForm();
            this.isLoading = false;
          }
        },
        error: (error) => {
          this.snb.open(error.detail);
          this.isLoading = false;
        }
      });
  }

  initForm(): void {
    this.formGroup = new FormGroup({
      name: new FormControl(this.data.name, [Validators.maxLength(40)]),
      genderType: new FormControl(this.data.genderType, [Validators.maxLength(200)]),
      customerType: new FormControl(this.data.customerType, [Validators.required]),
      remark: new FormControl(this.data.remark, [Validators.maxLength(2000)]),
      contactInfo: new FormControl(this.data.contactInfo, [Validators.maxLength(100)]),
      contactPhone: new FormControl(this.data.contactPhone, [Validators.maxLength(20)]),
      contactEmail: new FormControl(this.data.contactEmail, [Validators.maxLength(100)]),
      source: new FormControl(this.data.source, [Validators.maxLength(60)]),
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
      case 'source':
        return this.source?.errors?.['minlength'] ? '来源长度最少位' :
          this.source?.errors?.['maxlength'] ? '来源长度最多60位' : '';
      default:
        return '';
    }
  }
  edit(): void {
    if (this.formGroup.valid) {
      this.isProcessing = true;
      this.updateData = this.formGroup.value as CustomerInfoUpdateDto;
      this.service.update(this.id, this.updateData)
        .subscribe({
          next: (res) => {
            if (res) {
              this.snb.open('修改成功');
              this.dialogRef.close(res);
              // this.router.navigate(['../../index'], { relativeTo: this.route });
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
