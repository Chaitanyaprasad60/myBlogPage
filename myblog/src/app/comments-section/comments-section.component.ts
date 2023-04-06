import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../core/services/api.service';

@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.scss']
})
export class CommentsSectionComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<boolean>();
  profileForm = new FormGroup({
    comment: new FormControl(''),
    author: new FormControl(''),
  });
  blogId:number = 0;

  comments: { "body": string, "author": string }[] = []

  constructor(private apiService: ApiService,
    private route: ActivatedRoute) {

    if (route.params) {

      route.params.subscribe(routeParams => {
        let blogId = parseInt(routeParams['blogId']);
        if (blogId) {

          this.blogId = blogId;

          this.apiService.getComments(this.blogId).pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
            this.comments = this.comments.concat(data);
          });

        }
      })


     
    }
  }
  ngOnInit(): void {

  }

  postComment() {
    let author = this.profileForm.value.author;
    if (!this.profileForm.value.author || this.profileForm.value.author.trim() == '') {
      author = "Anonymous";
    }

    let latestComment = {
      "body": this.profileForm.value.comment,
      "author": author
    }

    if (!this.profileForm.value.comment || this.profileForm.value.comment.trim() == '') {
      return
    }
    this.comments.unshift(latestComment)

    this.apiService.postComment(latestComment,this.blogId).pipe(takeUntil(this.destroy$)).subscribe((resp) => {
      if (resp.status == "success") {
        this.profileForm.reset()
      }

    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

}
