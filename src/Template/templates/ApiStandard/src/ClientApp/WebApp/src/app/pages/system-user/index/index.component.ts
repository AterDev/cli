﻿import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/share/components/confirm-dialog/confirm-dialog.component';
import { SystemUserService } from 'src/app/services/admin/system-user/system-user.service';
import { SystemUserItemDto } from 'src/app/services/admin/system-user/models/system-user-item-dto.model';
import { SystemUserFilterDto } from 'src/app/services/admin/system-user/models/system-user-filter-dto.model';
import { SystemUserItemDtoPageList } from 'src/app/services/admin/system-user/models/system-user-item-dto-page-list.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { CommonFormModules, CommonListModules } from 'src/app/app.config';
import { TypedCellDefDirective } from 'src/app/share/typed-cell-def.directive';
import { DetailComponent } from '../detail/detail.component';

import { AddComponent } from '../add/add.component';
import { EditComponent } from '../edit/edit.component';
import { EnumTextPipe } from 'src/app/pipe/admin/enum-text.pipe';
import { ToKeyValuePipe } from 'src/app/share/pipe/to-key-value.pipe';

@Component({
  selector: 'app-index',
  imports: [...CommonListModules, ...CommonFormModules, TypedCellDefDirective, ToKeyValuePipe, EnumTextPipe],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  isLoading = true;
  isProcessing = false;
  total = 0;
  data: SystemUserItemDto[] = [];
  columns: string[] = ['userName','realName','email','lastLoginTime','sex','createdTime', 'actions'];
  dataSource!: MatTableDataSource<SystemUserItemDto>;
  dialogRef!: MatDialogRef<{}, any>;
  @ViewChild('myDialog', { static: true }) myTmpl!: TemplateRef<{}>;
  mydialogForm!: FormGroup;
  filter: SystemUserFilterDto;
  pageSizeOption = [12, 20, 50];
  constructor(
    private service: SystemUserService,
    private snb: MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
  ) {

    this.filter = {
      pageIndex: 1,
      pageSize: 12
    };
  }

  ngOnInit(): void {
    forkJoin([this.getListAsync()])
    .subscribe({
      next: ([res]) => {
        if (res) {
          if (res.data) {
            this.data = res.data;
            this.total = res.count;
            this.dataSource = new MatTableDataSource<SystemUserItemDto>(this.data);
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

  getListAsync(): Observable<SystemUserItemDtoPageList> {
    return this.service.filter(this.filter);
  }

  getList(event?: PageEvent): void {
    if(event) {
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
              this.dataSource = new MatTableDataSource<SystemUserItemDto>(this.data);
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

  openDetailDialog(item: SystemUserItemDto): void {
    this.dialogRef = this.dialog.open(DetailComponent, {
      minWidth: '400px',
      maxHeight: '98vh',
      data: { id: item.id }
    });
  }


  openAddDialog(): void {
    this.dialogRef = this.dialog.open(AddComponent, {
      minWidth: '400px',
      maxHeight: '98vh'
    })
      this.dialogRef.afterClosed()
      .subscribe(res => {
        if (res)
          this.getList();
      });
  }
  openEditDialog(item: SystemUserItemDto): void {
    this.dialogRef = this.dialog.open(EditComponent, {
      minWidth: '400px',
      maxHeight: '98vh',
      data: { id: item.id }
    })
      this.dialogRef.afterClosed()
      .subscribe(res => {
        if (res)
          this.getList();
      });
  }
  deleteConfirm(item: SystemUserItemDto): void {
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
  delete(item: SystemUserItemDto): void {
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
        complete: ()=>{
          this.isProcessing = false;
        }
      });
  }

  /**
   * 编辑
   */
  edit(id: string): void {
    this.router.navigate(['../edit/' + id], { relativeTo: this.route });
  }
}

