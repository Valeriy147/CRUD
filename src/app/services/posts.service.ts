import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, throwError } from 'rxjs';

export interface Post {
  id: number
  img: any
  author: string
  name: string
  date: string
  content: string
  email?: string
}

export interface PostComment {
  id: number
  email: string,
  author: string
  img: any
  date: string
  text: string
  inheritance: number
  post: number
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getSearchPosts(name: String): Observable<Post[]> {
    return this.http.get<Post[]>(`http://localhost:3000/posts?q=${name}`)
      .pipe(
        catchError(error => {
          return throwError(error)
        })
      )
  }
}
