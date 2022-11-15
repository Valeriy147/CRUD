import { switchMap, Observable, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddPostComment } from './../../state/posts.actions';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Post, PostComment } from './../../services/posts.service';
import { PostsState } from './../../state/posts.state';
import { GetPostById, GetPostComments } from './../../state/posts.actions';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  id!: number
  private sub: any
  form!: FormGroup
  formComplete!: boolean
  replyId!: number | null
  replyAuthor!: string

  @Select(PostsState.getPostById) post$!: Observable<Post>
  @Select(PostsState.GetFirstLayerComments) firstLayer$!: Observable<PostComment[]>
  @Select(PostsState.GetChildrenComments) children$!: Observable<PostComment[]>
  @Select(PostsState.getLoadedPostComments) loadedPostComments$!: Observable<boolean>
  @Select(PostsState.getLoadingPostComments) loadingPostComments$!: Observable<boolean>
  @Select(PostsState.getErrorAdd) errorAdd$!: Observable<boolean>
  @Select(PostsState.getLoadedAdd) loadedAdd$!: Observable<boolean>


  constructor(
    private store: Store,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    window.scrollTo(pageXOffset, 250)
    this.sub = this.route.params
      .pipe(
        tap(params => this.id = (+params['id'])),
        switchMap(params => (params ? (this.store.dispatch([new GetPostById(+params['id']), new GetPostComments(+params['id'])])) : ''))
      )
      .subscribe()

    this.form = new FormGroup({
      author: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      text: new FormControl('', [Validators.maxLength(1000)]),
    })
  }

  addComment(): void {
    if (this.form.valid) {
      const formData = { ...this.form.value }
      this.store.dispatch(new AddPostComment({ ...formData, img: "assets/noAva.png", date: '15.11.2022', inheritance: this.replyId, post: this.id }))
      this.loadedAdd$.subscribe(result => result ? this.form.reset() : '')
      this.formComplete = true
      this.replyId = null
      this.replyAuthor = ''
    }
  }

  reply(obj: any) {
    this.replyId = obj['id']
    this.replyAuthor = obj['author']
  }

  noReply() {
    this.replyId = null
    this.replyAuthor = ''
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
