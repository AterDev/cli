import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemRole } from 'src/app/services/admin/system-role/models/system-role.model';
import { SystemRoleService } from 'src/app/services/admin/system-role/system-role.service';
import { SystemRoleUpdateDto } from 'src/app/services/admin/system-role/models/system-role-update-dto.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  
  id!: string;
  isLoading = true;
  isProcessing = false;
  data = {} as SystemRole;
  updateData = {} as SystemRoleUpdateDto;
  formGroup!: FormGroup;
    constructor(
    private service: SystemRoleService,
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
    get nameValue() { return this.formGroup.get('nameValue'); }
    get isSystem() { return this.formGroup.get('isSystem'); }
    get icon() { return this.formGroup.get('icon'); }


  ngOnInit(): void {
    this.getDetail();
    
    // TODO:等待数据加载完成
    // this.isLoading = false;
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
      name: new FormControl(this.data.name, [Validators.maxLength(30)]),
      nameValue: new FormControl(this.data.nameValue, [Validators.maxLength(60)]),
      isSystem: new FormControl(this.data.isSystem, [Validators.maxLength(0)]),
      icon: new FormControl(this.data.icon, [Validators.maxLength(30)]),

    });
  }
  getValidatorMessage(type: string): string {
    switch (type) {
      case 'name':
        return this.name?.errors?.['required'] ? '角色显示名称必填' :
          this.name?.errors?.['minlength'] ? '角色显示名称长度最少位' :
          this.name?.errors?.['maxlength'] ? '角色显示名称长度最多30位' : '';
      case 'nameValue':
        return this.nameValue?.errors?.['required'] ? '角色名，系统标识必填' :
          this.nameValue?.errors?.['minlength'] ? '角色名，系统标识长度最少位' :
          this.nameValue?.errors?.['maxlength'] ? '角色名，系统标识长度最多60位' : '';
      case 'isSystem':
        return this.isSystem?.errors?.['required'] ? '是否系统内置,系统内置不可删除必填' :
          this.isSystem?.errors?.['minlength'] ? '是否系统内置,系统内置不可删除长度最少位' :
          this.isSystem?.errors?.['maxlength'] ? '是否系统内置,系统内置不可删除长度最多0位' : '';
      case 'icon':
        return this.icon?.errors?.['required'] ? '图标必填' :
          this.icon?.errors?.['minlength'] ? '图标长度最少位' :
          this.icon?.errors?.['maxlength'] ? '图标长度最多30位' : '';

      default:
        return '';
    }
  }
  edit(): void {
    if(this.formGroup.valid) {
      this.isProcessing = true;
      this.updateData = this.formGroup.value as SystemRoleUpdateDto;
      this.service.update(this.id, this.updateData)
        .subscribe({
          next: (res) => {
            if(res){
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
