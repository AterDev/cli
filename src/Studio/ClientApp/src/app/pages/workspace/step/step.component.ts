import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { GenStepType } from 'src/app/services/enum/models/gen-step-type.model';
import { GenStepService } from 'src/app/services/gen-step/gen-step.service';
import { GenStepAddDto } from 'src/app/services/gen-step/models/gen-step-add-dto.model';
import { GenStepFilterDto } from 'src/app/services/gen-step/models/gen-step-filter-dto.model';
import { GenStepItemDtoPageList } from 'src/app/services/gen-step/models/gen-step-item-dto-page-list.model';
import { GenStepItemDto } from 'src/app/services/gen-step/models/gen-step-item-dto.model';
import { GenStepUpdateDto } from 'src/app/services/gen-step/models/gen-step-update-dto.model';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrl: './step.component.css'
})
export class StepComponent {
  GenStepType = GenStepType;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  isLoading = true;
  isProcessing = false;
  total = 0;
  data: GenStepItemDto[] = [];
  columns: string[] = ['name', 'description', 'actions'];
  dataSource!: MatTableDataSource<GenStepItemDto>;
  dialogRef!: MatDialogRef<{}, any>;
  @ViewChild('addDialog', { static: true }) addTmpl!: TemplateRef<{}>;
  isEditable = false;
  addForm!: FormGroup;
  addDto: GenStepAddDto | null = null;
  currentItem = {} as GenStepItemDto;
  filter: GenStepFilterDto;
  pageSizeOption = [12, 20, 50];
  constructor(
    private service: GenStepService,
    private snb: MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.filter = {
      pageIndex: 1,
      pageSize: 12,
    };
  }

  get content(): FormControl { return this.addForm.get('content') as FormControl; }
  get path(): FormControl { return this.addForm.get('path') as FormControl; }
  get outputPath(): FormControl { return this.addForm.get('outputPath') as FormControl; }
  get genStepType(): FormControl { return this.addForm.get('genStepType') as FormControl; }

  ngOnInit(): void {
    forkJoin([this.getListAsync()])
      .subscribe({
        next: ([res]) => {
          if (res) {
            if (res.data) {
              this.data = res.data;
              this.total = res.count;
              this.dataSource = new MatTableDataSource<GenStepItemDto>(this.data);
            }
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

  getListAsync(): Observable<GenStepItemDtoPageList> {
    return this.service.filter(this.filter);
  }

  getList(event?: PageEvent): void {
    if (event) {
      this.filter.pageIndex = event.pageIndex + 1;
      this.filter.pageSize = event.pageSize;
    }
    this.service.filter(this.filter)
      .subscribe({
        next: (res) => {
          if (res) {
            if (res.data) {
              this.data = res.data;
              this.total = res.count;
              this.dataSource = new MatTableDataSource<GenStepItemDto>(this.data);
            }
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

  jumpTo(pageNumber: string): void {
    const number = parseInt(pageNumber);
    if (number > 0 && number < this.paginator.getNumberOfPages()) {
      this.filter.pageIndex = number;
      this.getList();
    }
  }

  initForm(): void {
    this.addForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(40)]),
      description: new FormControl(null, [Validators.maxLength(200)])
    });

  }
  openAddDialog(item: GenStepItemDto | null = null, isEditable = false): void {
    this.initForm();
    this.isEditable = isEditable;
    if (this.isEditable && item) {
      this.currentItem = item;
      // TODO:
    }
    this.dialogRef = this.dialog.open(this.addTmpl, {
      minWidth: '400px',
      maxHeight: '98vh'
    })
    this.dialogRef.afterClosed()
      .subscribe(res => {
        if (res)
          this.getList();
      });
  }

  save(): void {
    if (this.addForm.invalid) {
      this.snb.open('请检查输入项');
      return;
    }
    if (this.isEditable) {
      const data = this.addForm.value as GenStepUpdateDto;
      this.service.update(this.currentItem.id, data)
        .subscribe({
          next: (res) => {
            if (res) {
              this.snb.open('更新成功');
              this.dialogRef.close(true);
            } else {
              this.snb.open('更新失败');
            }
          },
          error: (error) => {
            this.snb.open(error.detail);
          },
          complete: () => {
          }
        });
    } else {
      this.addDto = this.addForm.value as GenStepAddDto;
      this.service.add(this.addDto)
        .subscribe({
          next: (res) => {
            if (res) {
              this.snb.open('添加成功');
              this.dialogRef.close(true);
            } else {
              this.snb.open('添加失败');
            }
          },
          error: (error) => {
            this.snb.open(error.detail);
          },
          complete: () => {
          }
        });
    }

  }

  deleteConfirm(item: GenStepItemDto): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
      data: {
        title: '删除',
        content: '是否确定删除?'
      }
    });

    ref.afterClosed().subscribe(res => {
      if (res) {
        this.delete(item);
      }
    });
  }
  delete(item: GenStepItemDto): void {
    this.isProcessing = true;
    this.service.delete(item.id)
      .subscribe({
        next: (res) => {
          if (res) {
            this.data = this.data.filter(_ => _.id !== item.id);
            this.dataSource.data = this.data;
            this.snb.open('删除成功');
          } else {
            this.snb.open('删除失败');
          }
        },
        error: (error) => {
          this.snb.open(error.detail);
        },
        complete: () => {
          this.isProcessing = false;
        }
      });
  }
}
