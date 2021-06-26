import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OkrAchievementRoutingModule } from './child-okr-achievement-routing.module';
import { OkrAchievementComponent } from './child-okr-achievement/child-okr-achievement.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [OkrAchievementComponent],
  imports: [
    CommonModule,
    OkrAchievementRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
})
export class OkrAchievementModule {}
