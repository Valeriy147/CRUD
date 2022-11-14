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

  getPosts(currentPage: number, pageSize: number): Observable<Post[]> {
    return this.http.get<Post[]>(`http://localhost:3000/posts?_page=${currentPage}&_limit=${pageSize}`)
      .pipe(
        catchError(error => {
          return throwError(error)
        })
      )
  }

  getPostsLength(): Observable<Post[]> {
    return this.http.get<Post[]>(`http://localhost:3000/posts`)
      .pipe(
        catchError(error => {
          return throwError(error)
        })
      )
  }

  getById(id: Number): Observable<Post> {
    return this.http.get<Post>(`http://localhost:3000/posts/${id}`)
      .pipe(
        catchError(error => {
          return throwError(error)
        })
      )
  }

  getPostComments(id: Number): Observable<PostComment[]> {
    return this.http.get<PostComment[]>(`http://localhost:3000/postComments?post=${id}`)
      .pipe(
        catchError(error => {
          return throwError(error)
        })
      )
  }

  addComment(comment: Comment): Observable<PostComment> {
    return this.http.post<PostComment>("http://localhost:3000/postComments", { ...comment })
      .pipe(
        catchError(error => {
          console.warn("Send comment error :", error.message)
          return throwError(error)
        })
      )
  }
}
