import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../core/services/api.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  blogForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService:ApiService,
    private router:Router
  ) {

    //Form builder to build a form 
    this.blogForm = this.fb.group({
      title: '',
      body: ''
    });
   }

  ngOnInit(): void {
  }

  submitForm(){
    this.apiService.createNewBlog(this.blogForm.value).subscribe(resp => {
      if (resp.status == 'success' && resp.response!=undefined && resp.response.blogId!=undefined){
        this.router.navigate(['/home',{"blogId":`${resp.response.blogId}`}])
      }
      else {
        alert("Blog not added")

      }
    })

  }

}
