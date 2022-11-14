import { fade } from './../../app.animations';
import { Observable } from 'rxjs';
import { Post } from './../../services/posts.service';
import { PostsState } from './../../state/posts.state';
import { GetPosts, GetPostsLength } from './../../state/posts.actions';
import { Select, Store } from '@ngxs/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [fade],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {

  currentPage: number = 1

  @Select(PostsState.getPosts) posts$!: Observable<Post[]>
  @Select(PostsState.getTotalPostsCount) totalCount$!: Observable<number[]>
  @Select(PostsState.getLoadingPosts) loadingPosts$!: Observable<boolean>
  @Select(PostsState.getLoadedPosts) loadedPosts$!: Observable<boolean>

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch([new GetPosts(this.currentPage), new GetPostsLength])
  }

  newPage(page: number) {
    this.currentPage = page
    this.store.dispatch(new GetPosts(this.currentPage))
  }
}
