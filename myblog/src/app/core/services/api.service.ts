//All APIS that we call to backend are written here


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blog } from '../models/blog.article';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) { }


    backend = environment.backend;

    getComments(blogId: number) {
        return this.http.post<[]>(this.backend + '/getComments/',{blogId});
    }

    postComment(comment: {}, blogId: number) {
        return this.http.post<{ "status": string, "response": string }>(this.backend + '/postComment/', { "comment": comment, "blogId": blogId });
    }

    addAndGetViews(blogId: number) {
        return this.http.post<{ "status": string, "message": number }>(this.backend + '/addAndGetViews/', { blogId });
    }

    createNewBlog(blog: Blog) {
        return this.http.post<{ "status": string, "response": { "blogId": number, "message": string } }
        >(this.backend + '/createBlog/', { blog })
    }

    getBlog(blogId: number) {
        return this.http.post<{ "status": string, "response": Blog }
        >(this.backend + '/getBlog/', { blogId })
    }

}
