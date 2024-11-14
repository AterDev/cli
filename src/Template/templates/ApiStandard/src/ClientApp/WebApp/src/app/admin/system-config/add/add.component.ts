import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SystemConfigService } from 'src/app/services/admin/system-config/system-config.service';
import { SystemConfig } from 'src/app/services/admin/system-config/models/system-config.model';
import { SystemConfigAddDto } from 'src/app/services/admin/system-config/models/system-config-add-dto.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  formGroup!: FormGroup;
  data = {} as SystemConfigAddDto;
  isLoading = true;
  isProcessing = false;
  constructor(

    private service: SystemConfigService,
    public snb: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    public dialogRef: MatDialogRef<AddComponent>,
    // @Inject(MAT_DIALOG_DATA) public dlgData: { id: '' }
  ) {

  }

  get key() { return this.formGroup.get('key'); }
  get value() { return this.formGroup.get('value'); }
  get description() { return this.formGroup.get('description'); }
  get valid() { return this.formGroup.get('valid'); }
  get groupName() { return this.formGroup.get('groupName'); }


  ngOnInit(): void {
    this.initForm();
    this.initEditor();
    // TODO:获取其他相关数据后设置加载状态
    this.isLoading = false;
  }
  initEditor(): void { }

  initForm(): void {
    this.formGroup = new FormGroup({
      key: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      value: new FormControl(null, [Validators.maxLength(2000)]),
      description: new FormControl(null, [Validators.maxLength(500)]),
      valid: new FormControl(true),
      groupName: new FormControl(null, [Validators.maxLength(60)]),

    });
  }
  getValidatorMessage(type: string): string {
    switch (type) {
      case 'key':
        return this.key?.errors?.['required'] ? 'Key必填' :
          this.key?.errors?.['minlength'] ? 'Key长度最少位' :
            this.key?.errors?.['maxlength'] ? 'Key长度最多100位' : '';
      case 'value':
        return this.value?.errors?.['required'] ? '以json字符串形式存储必填' :
          this.value?.errors?.['minlength'] ? '以json字符串形式存储长度最少位' :
            this.value?.errors?.['maxlength'] ? '以json字符串形式存储长度最多2000位' : '';
      case 'description':
        return this.description?.errors?.['required'] ? 'Description必填' :
          this.description?.errors?.['minlength'] ? 'Description长度最少位' :
            this.description?.errors?.['maxlength'] ? 'Description长度最多500位' : '';
      case 'valid':
        return this.valid?.errors?.['required'] ? 'Valid必填' :
          this.valid?.errors?.['minlength'] ? 'Valid长度最少位' :
            this.valid?.errors?.['maxlength'] ? 'Valid长度最多0位' : '';
      case 'groupName':
        return this.groupName?.errors?.['required'] ? '组必填' :
          this.groupName?.errors?.['minlength'] ? '组长度最少位' :
            this.groupName?.errors?.['maxlength'] ? '组长度最多0位' : '';

      default:
        return '';
    }
  }

  add(): void {
    if (this.formGroup.valid) {
      this.isProcessing = true;
      const data = this.formGroup.value as SystemConfigAddDto;
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
