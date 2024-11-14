import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/services/admin/base.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  isMobile: boolean = false;
  constructor(
    service: BaseService
  ) {
    this.isMobile = service.isMobile;
  }

  ngOnInit(): void {
  }

}
