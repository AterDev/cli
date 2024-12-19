import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/share/components/confirm-dialog/confirm-dialog.component';
import { SystemUserService } from 'src/app/services/admin/system-user/system-user.service';
import { SystemUserDetailDto } from 'src/app/services/admin/system-user/models/system-user-detail-dto.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, forkJoin } from 'rxjs';
import { Location } from '@angular/common';
import { CommonListModules } from 'src/app/app.config';

@Component({
  selector: 'app-detail',
  imports: [...CommonListModules],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class IndexComponent implements OnInit {
  isLoading = true;
  data = {} as SystemUserDetailDto;
  isProcessing = false;
  id: string = '';
  constructor(
    private service: SystemUserService,
    private snb: MatSnackBar,
    private route: ActivatedRoute,
    public location: Location,
    private router: Router,
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = id;
    } else {
    }
  }

  ngOnInit(): void {
    this.getDetail();
  }

  getDetail(): void {
    this.service.getDetail(this.id)
      .subscribe({
        next: (res) => {
          if (res) {
            this.data = res;
            this.isLoading = false;
          }
        },
        error: (error) => {
          this.snb.open(error);
        }
      })
  }
  back(): void {
    this.location.back();
  }

  edit(): void {
  }
}