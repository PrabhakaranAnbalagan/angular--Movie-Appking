import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarComponent } from './component/star.component';
import { FormsModule } from '@angular/forms';
import { DisplayDurationPipe } from './pipes-Custom/displayDuration.pipe';

@NgModule({
  declarations: [StarComponent, DisplayDurationPipe],
  imports: [CommonModule],
  exports: [StarComponent, CommonModule, FormsModule, DisplayDurationPipe],
})
export class SharedModule {}
