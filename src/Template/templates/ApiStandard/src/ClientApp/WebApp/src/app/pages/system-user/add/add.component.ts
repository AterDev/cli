import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SystemUserService } from 'src/app/services/admin/system-user/system-user.service';
import { SystemUser } from 'src/app/services/admin/system-user/models/system-user.model';
import { SystemUserAddDto } from
'src/app/services/admin/system-user/models/system-user-add-dto.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonFormModules } from 'src/app/app.config';
import { ToKeyValuePipe } from 'src/app/share/pipe/to-key-value.pipe';
import { GenderType } from 'src/app/services/admin/enum/models/gender-type.model';



@Component({
  selector: 'app-add',
  imports: [...CommonFormModules, ToKeyValuePipe],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  GenderType = GenderType;

  formGroup!: FormGroup;
  data = {} as SystemUserAddDto;
  isLoading = true;
  isProcessing = false;
  constructor(
    private service: SystemUserService,
    public snb: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public dlgData: { id: '' }
  ) {

  }

  get userName() { return this.formGroup.get('userName') as FormControl }; 
  get password() { return this.formGroup.get('password') as FormControl }; 
  get realName() { return this.formGroup.get('realName') as FormControl }; 
  get email() { return this.formGroup.get('email') as FormControl }; 
  get phoneNumber() { return this.formGroup.get('phoneNumber') as FormControl }; 
  get avatar() { return this.formGroup.get('avatar') as FormControl }; 
  get sex() { return this.formGroup.get('sex') as FormControl }; 

  ngOnInit(): void {
    this.initForm();
    this.isLoading = false;
  }

  initForm(): void {
    this.formGroup = new FormGroup({
      userName: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      password: new FormControl(null, [Validators.required, Validators.maxLength(60)]),
      realName: new FormControl(null, [Validators.maxLength(30)]),
      email: new FormControl(null, [Validators.maxLength(100)]),
      phoneNumber: new FormControl(null, [Validators.maxLength(20)]),
      avatar: new FormControl(null, [Validators.maxLength(200)]),
      sex: new FormControl(null, []),

    });
  }
  getValidatorMessage(type: string): string {
    switch (type) {
      case 'userName':
        return this.userName?.hasError('required') ? '用户名必填' : 
          this.userName?.hasError('maxlength') ? '用户名长度不超过30位': '';
      case 'password':
        return this.password?.hasError('required') ? '密码必填' : 
          this.password?.hasError('maxlength') ? '密码长度不超过60位': '';
      case 'realName':
        return this.realName?.hasError('required') ? '真实姓名必填' : 
          this.realName?.hasError('maxlength') ? '真实姓名长度不超过30位': '';
      case 'email':
        return this.email?.hasError('required') ? '邮箱必填' : 
          this.email?.hasError('maxlength') ? '邮箱长度不超过100位': '';
      case 'phoneNumber':
        return this.phoneNumber?.hasError('required') ? '手机号必填' : 
          this.phoneNumber?.hasError('maxlength') ? '手机号长度不超过20位': '';
      case 'avatar':
        return this.avatar?.hasError('required') ? '头像 url必填' : 
          this.avatar?.hasError('maxlength') ? '头像 url长度不超过200位': '';
      case 'sex':
        return this.sex?.hasError('required') ? '性别必填' : 
          this.sex?.hasError('maxlength') ? '性别长度不超过位': '';
      
      default:
        return '';
    }
  }

  add(): void {
    if (this.formGroup.valid) {
      this.isProcessing = true;
      const data = this.formGroup.value as SystemUserAddDto;
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

