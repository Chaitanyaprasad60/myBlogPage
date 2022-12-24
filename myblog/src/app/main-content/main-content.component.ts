import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../core/services/api.service';


@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<boolean>();
  viewCount = 0;
  blogString = "Hi hello \n jai \n dkjhd  \t dsajfh";
  blogView: FormGroup;
  title = '';
  body: string = '';


  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {

 

    this.blogView = this.fb.group({
      title: '',
      body: [{value:'',disabled:"true"}]
    });

    if (route.params) {

      route.params.subscribe(routeParams => {
        let blogId = parseInt(routeParams['blogId']);
        if (blogId) {


          this.apiService.addAndGetViews(blogId).pipe(takeUntil(this.destroy$)).subscribe((views) => {

            if (views.status == 'success') {
              this.viewCount = views.message;
            }
            else {
              //Add snackbar message or pop up 
            }

          });

          this.apiService.getBlog(blogId).pipe(takeUntil(this.destroy$)).subscribe((blogData) => {
            if (blogData.status == "success"){
              this.title = blogData.response.title;
              this.body = blogData.response.body;
              this.blogView.patchValue({
                body:blogData.response.body
              }) 

            }
            else{
              alert(blogData.response)

            }
            
          })


        }
      })

     


    }


  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  share(){
    alert("Happy that you felt this is worth Sharing. This Feature will be released in next Blog. For now copy the link from your browser")
  }


}
