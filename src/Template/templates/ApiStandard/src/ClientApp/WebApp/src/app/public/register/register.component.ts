import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AgeRange } from 'src/app/services/admin/enum/models/age-range.model';
import { EnglishLevel } from 'src/app/services/admin/enum/models/english-level.model';
import { GenderType } from 'src/app/services/admin/enum/models/gender-type.model';
import { CustomerRegister } from 'src/app/services/admin/models/customer-register.model';
import { CustomerRegisterService } from 'src/app/services/admin//customer-register/customer-register.service';
import { CustomerRegisterAddDto } from 'src/app/services/admin/customer-register/models/customer-register-add-dto.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  GenderType = GenderType;
  AgeRange = AgeRange;
  EnglishLevel = EnglishLevel;
  formGroup!: FormGroup;
  data = {} as CustomerRegister;
  isLoading = true;
  isProcessing = false;
  verifyCode: string | null = null;

  improveMaps = ['听力', '口语', '阅读', '写作'];
  materialMaps = ['偏生活场景类', '偏商务英语类', '雅思托福类'];
  constructor(
    private service: CustomerRegisterService,
    public snb: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.verifyCode = this.route.snapshot.queryParams['code']
    if (!this.verifyCode) {
      this.isLoading = false;
    }
  }

  get name() { return this.formGroup.get('name'); }
  get gender() { return this.formGroup.get('gender'); }
  get ageRange() { return this.formGroup.get('ageRange'); }
  get occupation() { return this.formGroup.get('occupation'); }
  get englishLevel() { return this.formGroup.get('englishLevel'); }
  get learningGoal() { return this.formGroup.get('learningGoal'); }
  get improveAreas() { return this.formGroup.get('improveAreas'); }
  get preferredMaterial() { return this.formGroup.get('preferredMaterial'); }
  get teacherPreference() { return this.formGroup.get('teacherPreference'); }
  get availableTimes() { return this.formGroup.get('availableTimes'); }
  get classSchedule() { return this.formGroup.get('classSchedule'); }
  get phoneNumber() { return this.formGroup.get('phoneNumber'); }
  get weixin() { return this.formGroup.get('weixin'); }

  ngOnInit(): void {
    this.verify();
  }

  verify(): void {
    if (this.verifyCode) {
      this.service.verifyTempCode(this.verifyCode)
        .subscribe({
          next: (res) => {
            if (res) {
              this.initForm();
            } else {
              this.verifyCode = null;
            }
          },
          error: (error) => {
            this.snb.open(error.detail);
            this.verifyCode = null;
            this.isLoading = false;
          },
          complete: () => {
            this.isLoading = false;
          }
        });
    }
  }

  initForm(): void {
    this.formGroup = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      gender: new FormControl(null, [Validators.required]),
      ageRange: new FormControl(null, [Validators.required]),
      occupation: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      englishLevel: new FormControl(null, [Validators.required]),
      learningGoal: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      improveAreas: new FormControl(null, [Validators.required]),
      preferredMaterial: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      teacherPreference: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      availableTimes: new FormControl(null, [Validators.maxLength(300)]),
      classSchedule: new FormControl(null, [Validators.maxLength(300)]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      weixin: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    });
  }
  getValidatorMessage(type: string): string {
    switch (type) {

      case 'name':
        return this.name?.errors?.['required'] ? '姓名必填' :
          this.name?.errors?.['minlength'] ? '姓名长度最少位' :
            this.name?.errors?.['maxlength'] ? '姓名长度最多20位' : '';
      case 'gender':
        return this.gender?.errors?.['required'] ? 'gender必填' :
          this.gender?.errors?.['minlength'] ? 'gender长度最少位' :
            this.gender?.errors?.['maxlength'] ? 'gender长度最多位' : '';
      case 'ageRange':
        return this.ageRange?.errors?.['required'] ? '年龄段必填' :
          this.ageRange?.errors?.['minlength'] ? '年龄段长度最少位' :
            this.ageRange?.errors?.['maxlength'] ? '年龄段长度最多位' : '';
      case 'occupation':
        return this.occupation?.errors?.['required'] ? '职业必填' :
          this.occupation?.errors?.['minlength'] ? '职业长度最少位' :
            this.occupation?.errors?.['maxlength'] ? '职业长度最多50位' : '';
      case 'englishLevel':
        return this.englishLevel?.errors?.['required'] ? '英语水平必填' :
          this.englishLevel?.errors?.['minlength'] ? '英语水平长度最少位' :
            this.englishLevel?.errors?.['maxlength'] ? '英语水平长度最多位' : '';
      case 'learningGoal':
        return this.learningGoal?.errors?.['required'] ? '学习目标必填' :
          this.learningGoal?.errors?.['minlength'] ? '学习目标长度最少位' :
            this.learningGoal?.errors?.['maxlength'] ? '学习目标长度最多100位' : '';
      case 'improveAreas':
        return this.improveAreas?.errors?.['required'] ? '提升部分:听力/口语/阅读/写作必填' :
          this.improveAreas?.errors?.['minlength'] ? '提升部分:听力/口语/阅读/写作长度最少位' :
            this.improveAreas?.errors?.['maxlength'] ? '提升部分:听力/口语/阅读/写作长度最多位' : '';
      case 'preferredMaterial':
        return this.preferredMaterial?.errors?.['required'] ? '教材倾向:生活/商务/雅思托福必填' :
          this.preferredMaterial?.errors?.['minlength'] ? '教材倾向:生活/商务/雅思托福长度最少位' :
            this.preferredMaterial?.errors?.['maxlength'] ? '教材倾向:生活/商务/雅思托福长度最多20位' : '';
      case 'teacherPreference':
        return this.teacherPreference?.errors?.['required'] ? '老师偏好必填' :
          this.teacherPreference?.errors?.['minlength'] ? '老师偏好长度最少位' :
            this.teacherPreference?.errors?.['maxlength'] ? '老师偏好长度最多200位' : '';
      case 'availableTimes':
        return this.availableTimes?.errors?.['required'] ? '试听时间必填' :
          this.availableTimes?.errors?.['minlength'] ? '试听时间长度最少位' :
            this.availableTimes?.errors?.['maxlength'] ? '试听时间长度最多300位' : '';
      case 'classSchedule':
        return this.classSchedule?.errors?.['required'] ? '上课时间段必填' :
          this.classSchedule?.errors?.['minlength'] ? '上课时间段长度最少300位' :
            this.classSchedule?.errors?.['maxlength'] ? '上课时间段长度最多位' : '';
      case 'phoneNumber':
        return this.phoneNumber?.errors?.['required'] ? '联系电话必填' :
          this.phoneNumber?.errors?.['minlength'] ? '联系电话长度最少位' :
            this.phoneNumber?.errors?.['maxlength'] ? '联系电话长度最多20位' : '';
      case 'weixin':
        return this.weixin?.errors?.['required'] ? '微信号/昵称必填' :
          this.weixin?.errors?.['minlength'] ? '微信号/昵称长度最少位' :
            this.weixin?.errors?.['maxlength'] ? '微信号/昵称长度最多100位' : '';
      default:
        return '';
    }
  }

  add(): void {
    if (this.formGroup.valid && this.verifyCode) {
      this.isProcessing = true;
      const data = this.formGroup.value as CustomerRegisterAddDto;
      data.verifyCode = this.verifyCode;
      this.service.add(data)
        .subscribe({
          next: (res) => {
            if (res) {
              this.snb.open('添加成功');
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
}
