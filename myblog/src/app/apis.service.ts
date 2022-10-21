import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor(private http: HttpClient) { }

  rootURL = 'http://localhost:3000/backend';

  getComments(id:number) {
    return this.http.get<[]>(this.rootURL + '/getComments/'+id);
  }

  postComment(comment:{}) {
    console.log(comment)
    return this.http.post<[]>(this.rootURL + '/postComment/',{comment});
  }

  addAndGetViews(blogId:number){
    console.log("In service")
    return this.http.post<{"status":string,"message":number}>(this.rootURL + '/addAndGetViews/',{blogId});
  }
}
