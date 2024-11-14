import { Component, OnInit } from '@angular/core';
import { SystemRole } from 'src/app/services/admin/system-role/models/system-role.model';
import { SystemRoleService } from 'src/app/services/admin/system-role/system-role.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  id!: string;
  isLoading = true;
  data = {} as SystemRole;
  constructor(
    private service: SystemRoleService,
    private snb: MatSnackBar,
    private route: ActivatedRoute,
    public location: Location,
    private router: Router,
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = id;
    } else {
      // TODO: id为空

    }
  }
  ngOnInit(): void {
    this.getDetail();
  }
  getDetail(): void {
    this.service.getDetail(this.id)
      .subscribe({
        next: (res) => {
          if(res) {
            this.data = res;
              this.isLoading = false;
            }
        },
        error:(error) => {
          this.snb.open(error);
        }
      })
  }
  back(): void {
    this.location.back();
  }

  edit(): void {
    // TODO:编辑逻辑
  }
}
