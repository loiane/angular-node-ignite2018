import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './app-material.module';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';

@NgModule({
  imports: [CommonModule, AppMaterialModule],
  declarations: [ErrorDialogComponent, ConfirmationDialogComponent],
  entryComponents: [ErrorDialogComponent, ConfirmationDialogComponent],
  exports: [AppMaterialModule, ErrorDialogComponent, ConfirmationDialogComponent]
})
export class SharedModule {}
