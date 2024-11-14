import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemUser } from 'src/app/services/admin/system-user/models/system-user.model';
import { SystemUserService } from 'src/app/services/admin/system-user/system-user.service';
import { SystemUserUpdateDto } from 'src/app/services/admin/system-user/models/system-user-update-dto.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Sex } from 'src/app/services/admin/enum/models/sex.model';
import { SystemRoleService } from 'src/app/services/admin/system-role/system-role.service';
import { SystemRoleItemDto } from 'src/app/services/admin/system-role/models/system-role-item-dto.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  Sex = Sex;
  id!: string;
  isLoading = true;
  isProcessing = false;
  data = {} as SystemUser;
  roles: SystemRoleItemDto[] = [];
  updateData = {} as SystemUserUpdateDto;
  formGroup!: FormGroup;
  constructor(
    private service: SystemUserService,
    private roleService: SystemRoleService,
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
          } else {
            this.snb.open('');
          }
        },
        error: (error) => {
          this.snb.open(error.detail);
          this.isLoading = false;
        }
      });
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

    let roleIds: string[] = [];
    if (this.data.systemRoles) {
      roleIds = this.data.systemRoles.map(r => r.id);
    }

    this.formGroup = new FormGroup({
      userName: new FormControl(this.data.userName, [Validators.required, Validators.maxLength(30)]),
      password: new FormControl(null, [Validators.maxLength(60)]),
      realName: new FormControl(this.data.realName, [Validators.maxLength(30)]),
      email: new FormControl(this.data.email, [Validators.maxLength(100)]),
      phoneNumber: new FormControl(this.data.phoneNumber, [Validators.maxLength(20)]),
      avatar: new FormControl(this.data.avatar, [Validators.maxLength(200)]),
      sex: new FormControl(this.data.gender, [Validators.maxLength(0)]),
      roleIds: new FormControl(roleIds, [Validators.required]),

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
        return this.email?.errors?.['required'] ? 'Email必填' :
          this.email?.errors?.['minlength'] ? 'Email长度最少位' :
            this.email?.errors?.['maxlength'] ? 'Email长度最多100位' : '';
      case 'phoneNumber':
        return this.phoneNumber?.errors?.['required'] ? 'PhoneNumber必填' :
          this.phoneNumber?.errors?.['minlength'] ? 'PhoneNumber长度最少位' :
            this.phoneNumber?.errors?.['maxlength'] ? 'PhoneNumber长度最多20位' : '';
      case 'avatar':
        return this.avatar?.errors?.['required'] ? '头像url必填' :
          this.avatar?.errors?.['minlength'] ? '头像url长度最少位' :
            this.avatar?.errors?.['maxlength'] ? '头像url长度最多200位' : '';
      case 'sex':
        return this.sex?.errors?.['required'] ? '性别必填' :
          this.sex?.errors?.['minlength'] ? '性别长度最少位' :
            this.sex?.errors?.['maxlength'] ? '性别长度最多0位' : '';

      default:
        return '';
    }
  }
  edit(): void {
    if (this.formGroup.valid) {
      this.isProcessing = true;
      this.updateData = this.formGroup.value as SystemUserUpdateDto;
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
