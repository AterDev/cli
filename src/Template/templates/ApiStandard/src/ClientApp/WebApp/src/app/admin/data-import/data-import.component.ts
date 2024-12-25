import { splitNsName } from '@angular/compiler';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { DataImportService } from 'src/app/services/admin/data-import/data-import.service';

@Component({
  selector: 'app-data-import',
  templateUrl: './data-import.component.html',
  styleUrl: './data-import.component.css'
})
export class DataImportComponent {
  isLoading = true;
  isProcessing = false;
  results: string[] = [];
  constructor(
    private snb: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private service: DataImportService
  ) { }

  ngOnInit() {
  }

  getData(): void { }

  importTrial(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx';
    input.multiple = false;
    input.addEventListener('change', (event) => {
      const files = (event.target as HTMLInputElement).files;
      const formData = new FormData();
      if (files && files.length > 0) {
        if (files[0].size > 1024 * 1000 * 10) {
          this.snb.open("文件大小不能超过10MB: " + files[0].name);
          return;
        }
        formData.append('file', files[0]);
        this.isProcessing = true;
        this.service.importTrialData(formData)
          .subscribe({
            next: (res) => {
              if (res) {
                this.results = res.split('\r\n');
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
      }
    });
    input.click();
  }

  importOrder(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx';
    input.multiple = false;
    input.addEventListener('change', (event) => {
      const files = (event.target as HTMLInputElement).files;
      const formData = new FormData();
      if (files && files.length > 0) {
        if (files[0].size > 1024 * 1000 * 10) {
          this.snb.open("文件大小不能超过10MB: " + files[0].name);
          return;
        }
        formData.append('file', files[0]);
        this.isProcessing = true;
        this.service.importFormalData(formData)
          .subscribe({
            next: (res) => {
              if (res) {
                this.results = res.split('\r\n');
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
      }
    });
    input.click();
  }
}
