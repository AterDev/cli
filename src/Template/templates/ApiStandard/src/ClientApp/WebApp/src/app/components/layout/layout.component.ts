import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { LoginStateService } from 'src/app/auth/login-state.service';
import { BaseService } from 'src/app/services/admin/base.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isLogin = false;
  isAdmin = false;
  isMobile = false;
  username?: string | null = null;
  constructor(
    private auth: LoginStateService,
    private baseService: BaseService,
    private router: Router
  ) {

    this.isMobile = this.baseService.isMobile;
    // this layout is out of router-outlet, so we need to listen router event and change isLogin status
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isLogin = this.auth.isLogin;
        this.isAdmin = this.auth.isAdmin;
        this.username = this.auth.userName;
      }
    });

  }
  ngOnInit(): void {
    this.isLogin = this.auth.isLogin;
    this.isAdmin = this.auth.isAdmin;
    if (this.isLogin) {
      this.username = this.auth.userName!;
    }
  }

  goToAdmin(): void {
    if (this.isMobile) {
      this.router.navigateByUrl('/mobile');
    } else {
      this.router.navigateByUrl('/admin')

    }
  }
  login(): void {
    this.router.navigateByUrl('/login')
  }

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/index');
    location.reload();
  }
}
