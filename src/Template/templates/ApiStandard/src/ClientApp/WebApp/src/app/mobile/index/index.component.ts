import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {

  }

  goTo(path: string) {

    if (path === 'customer') {
      this.router.navigate(['../customer/index', { type: 'formal' }], { relativeTo: this.route });
    } else if (path === 'trial-customer') {
      this.router.navigate(['../customer/index', { type: 'trial' }], { relativeTo: this.route });
    } else {
      this.router.navigate(['../' + path], { relativeTo: this.route });
    }
  }
}
