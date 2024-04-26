<mat-toolbar>
  <button color="basic" mat-icon-button matTooltip="返回" (click)="back()">
    <mat-icon>arrow_back</mat-icon>
  </button>
</mat-toolbar>
<div *ngIf="!isLoading" class="d-flex p-2">
  <mat-card class="w-100">
    <!-- <mat-card-header>
      <div mat-card-avatar class=""></div>
      <mat-card-title></mat-card-title>
      <mat-card-subtitle></mat-card-subtitle>
    </mat-card-header> -->
    <!-- <img mat-card-image src="" alt=""> -->
    <mat-card-content>
{$Content}
    </mat-card-content>
    <mat-card-actions>
      <!-- <button mat-button></button>
      <button mat-button></button> -->
    </mat-card-actions>
  </mat-card>
</div>
