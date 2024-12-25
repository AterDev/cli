import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemConfig } from 'src/app/services/admin/system-config/models/system-config.model';
import { SystemConfigService } from 'src/app/services/admin/system-config/system-config.service';
import { SystemConfigUpdateDto } from 'src/app/services/admin/system-config/models/system-config-update-dto.model';
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
  data = {} as SystemConfig;
  updateData = {} as SystemConfigUpdateDto;
  formGroup!: FormGroup;
  constructor(

    private service: SystemConfigService,
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

  get key() { return this.formGroup.get('key'); }
  get value() { return this.formGroup.get('value'); }
  get description() { return this.formGroup.get('description'); }
  get valid() { return this.formGroup.get('valid'); }
  get groupName() { return this.formGroup.get('groupName'); }


  ngOnInit(): void {
    this.getDetail();
    this.initEditor();
  }
  initEditor(): void { }

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
      key: new FormControl(this.data.key, [Validators.maxLength(100)]),
      value: new FormControl(this.data.value, [Validators.maxLength(2000)]),
      description: new FormControl(this.data.description, [Validators.maxLength(500)]),
      valid: new FormControl(this.data.valid, [Validators.maxLength(0)]),
      groupName: new FormControl(this.data.groupName, [Validators.maxLength(60)]),
    });

    if (this.data.isSystem) {
      this.groupName?.disable();
      this.key?.disable();
    }
  }
  getValidatorMessage(type: string): string {
    switch (type) {
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

      default:
        return '';
    }
  }
  edit(): void {
    if (this.formGroup.valid) {
      this.isProcessing = true;
      this.updateData = this.formGroup.value as SystemConfigUpdateDto;
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
