import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SystemUserService } from 'src/app/services/admin/system-user/system-user.service';
import { SystemUserAddDto } from 'src/app/services/admin/system-user/models/system-user-add-dto.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

import { Sex } from 'src/app/services/admin/enum/models/sex.model';
import { SystemRoleService } from 'src/app/services/admin/system-role/system-role.service';
import { SystemRoleItemDto } from 'src/app/services/admin/system-role/models/system-role-item-dto.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  Sex = Sex;
  formGroup!: FormGroup;
  data = {} as SystemUserAddDto;
  roles: SystemRoleItemDto[] = [];
  isLoading = true;
  isProcessing = false;
  constructor(
    private service: SystemUserService,
    private roleService: SystemRoleService,
    public snb: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    public dialogRef: MatDialogRef<AddComponent>,
    // @Inject(MAT_DIALOG_DATA) public dlgData: { id: '' }
  ) {

  }

  get userName() { return this.formGroup.get('userName'); }
  get password() { return this.formGroup.get('password'); }
  get realName() { return this.formGroup.get('realName'); }
  get email() { return this.formGroup.get('email'); }
  get phoneNumber() { return this.formGroup.get('phoneNumber'); }
  get avatar() { return this.formGroup.get('avatar'); }
  get sex() { return this.formGroup.get('sex'); }
  get roleIds() { return this.formGroup.get('roleIds'); }


  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(): void {
    this.roleService.filter({
      pageIndex: 1,
      pageSize: 99
    }).subscribe({
      next: (res) => {
        if (res.data) {
          this.roles = res.data;
          this.initForm();
          this.isLoading = false;
        }
      },
      error: (error) => {
        this.snb.open(error.detail);
      },
      complete: () => {
      }
    });
  }

  initForm(): void {
    this.formGroup = new FormGroup({
      userName: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      password: new FormControl(null, [Validators.required, Validators.maxLength(60)]),
      realName: new FormControl(null, [Validators.maxLength(30)]),
      email: new FormControl(null, [Validators.maxLength(100)]),
      phoneNumber: new FormControl(null, [Validators.maxLength(20)]),
      avatar: new FormControl(null, [Validators.maxLength(200)]),
      sex: new FormControl(Sex.Male, [Validators.maxLength(0)]),
      roleIds: new FormControl(this.roles[0].id, [Validators.required]),
    });
  }

  getValidatorMessage(type: string): string {
    switch (type) {
      case 'userName':
        return this.userName?.errors?.['required'] ? '用户名必填' :
          this.userName?.errors?.['minlength'] ? '用户名长度最少位' :
            this.userName?.errors?.['maxlength'] ? '用户名长度最多30位' : '';
      case 'password':
        return this.password?.errors?.['required'] ? '密码必填' :
          this.password?.errors?.['minlength'] ? '密码长度最少位' :
            this.password?.errors?.['maxlength'] ? '密码长度最多60位' : '';
      case 'realName':
        return this.realName?.errors?.['required'] ? '真实姓名必填' :
          this.realName?.errors?.['minlength'] ? '真实姓名长度最少位' :
            this.realName?.errors?.['maxlength'] ? '真实姓名长度最多30位' : '';
      case 'email':
        return this.email?.errors?.['required'] ? '邮箱必填' :
          this.email?.errors?.['minlength'] ? '邮箱长度最少位' :
            this.email?.errors?.['maxlength'] ? '邮箱长度最多100位' : '';
      case 'phoneNumber':
        return this.phoneNumber?.errors?.['required'] ? '手机号必填' :
          this.phoneNumber?.errors?.['minlength'] ? '手机号长度最少位' :
            this.phoneNumber?.errors?.['maxlength'] ? '手机号长度最多20位' : '';
      case 'avatar':
        return this.avatar?.errors?.['required'] ? '头像 url必填' :
          this.avatar?.errors?.['minlength'] ? '头像 url长度最少位' :
            this.avatar?.errors?.['maxlength'] ? '头像 url长度最多200位' : '';
      case 'sex':
        return this.sex?.errors?.['required'] ? '性别必填' :
          this.sex?.errors?.['minlength'] ? '性别长度最少位' :
            this.sex?.errors?.['maxlength'] ? '性别长度最多0位' : '';
      case 'roleIds':
        return this.roleIds?.errors?.['required'] ? '角色id必填' :
          this.roleIds?.errors?.['minlength'] ? '角色id长度最少位' :
            this.roleIds?.errors?.['maxlength'] ? '角色id长度最多0位' : '';

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
