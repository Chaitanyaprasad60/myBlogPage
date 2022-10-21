import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ApisService } from '../apis.service';

@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.scss']
})
export class CommentsSectionComponent implements OnInit,OnDestroy {

  destroy$ = new Subject<boolean>();
  profileForm = new FormGroup({
    comment: new FormControl(''),
    author: new FormControl(''),
  });

  comments:{"body":string,"author":string}[] = []

  constructor(private apiService:ApisService) {
    this.apiService.getComments(0).pipe(takeUntil(this.destroy$)).subscribe((data:any[]) => {
      this.comments = this.comments.concat(data);
    });
   }
  
  ngOnInit(): void {
  }

  postComment(){
    let author = this.profileForm.value.author !='' ? this.profileForm.value.author:'Anonymous'
    let latestComment = {
      "body": this.profileForm.value.comment,
      "author": author
    }
    this.comments.push(latestComment)
 
    this.apiService.postComment(latestComment).pipe(takeUntil(this.destroy$)).subscribe((data)=>{
      console.log(data)
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
  
}
