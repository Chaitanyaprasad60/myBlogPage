import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ApisService } from '../apis.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit,OnDestroy {
  
  destroy$ = new Subject<boolean>();
  viewCount = 0;
  constructor(private apiService:ApisService) { 
    this.apiService.addAndGetViews(1).pipe(takeUntil(this.destroy$)).subscribe((views:{"status":string,"message":number}) => {
      if(views.status == 'success'){
        this.viewCount = views.message;
      }
      
    });;

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
  

}
