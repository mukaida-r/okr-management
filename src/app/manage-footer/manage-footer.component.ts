import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ChildOkr } from '../interfaces/child-okr';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { OkrService } from '../services/okr.service';

@Component({
  selector: 'app-manage-footer',
  templateUrl: './manage-footer.component.html',
  styleUrls: ['./manage-footer.component.scss'],
})
export class ManageFooterComponent implements OnInit {
  isChildOkr: boolean;
  isComplete: boolean;
  isChildOkrComplete: boolean;
  isChildOkrCompletes = [];
  childOkr: ChildOkr;
  childOkrs$: Observable<ChildOkr[]> = this.okrService
    .getChildOkrs()
    .pipe(tap(() => (this.loadingService.loading = false)));

  constructor(
    public authService: AuthService,
    public okrService: OkrService,
    public loadingService: LoadingService,
    private router: Router
  ) {
    this.loadingService.loading = true;
  }

  ngOnInit(): void {
    this.childOkrs$.subscribe((childOkrs) => {
      if (childOkrs.length === 0) {
        this.isChildOkr = false;
      } else {
        this.isChildOkr = true;
      }
      childOkrs.map((childOkr) => {
        this.isChildOkrComplete = childOkr.isChildOkrComplete;
        this.isChildOkrCompletes.push(this.isChildOkrComplete);
        this.isChildOkrCompletes.forEach((isChildOkrComplete) => {
          if (isChildOkrComplete === true) {
            this.isChildOkrComplete = true;
          }
        });
        if (childOkr.isChildOkrComplete === true) this.childOkr = childOkr;
      });
    });
  }

  progress() {
    this.router.navigate(['manage/child-okr'], {
      queryParams: { id: this.childOkr.childOkrId },
    });
  }
}
